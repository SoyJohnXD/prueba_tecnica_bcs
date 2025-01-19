import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../users/schemas/user.schema';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { Verify2FADto } from '../dto/verify-2fa.dto';

interface JwtPayload {
  sub: string;
  email: string;
  roles?: string[];
  type?: string;
  service?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { email, password, ...rest } = registerDto;

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { documentNumber: rest.documentNumber }],
    });

    if (existingUser) {
      throw new BadRequestException('El usuario ya existe');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
      ...rest,
      twoFactorEnabled: true,
    });

    await newUser.save();

    return {
      message: 'Usuario registrado exitosamente',
      userId: newUser._id,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel
      .findOne({ email: loginDto.email })
      .select('+password +loginAttempts +lockUntil');

    if (user?.lockUntil && user.lockUntil > new Date()) {
      throw new UnauthorizedException('Cuenta bloqueada temporalmente');
    }

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      if (user) {
        user.loginAttempts += 1;
        if (user.loginAttempts >= 5) {
          user.lockUntil = new Date(Date.now() + 15 * 60 * 1000);
        }
        await user.save();
      }
      throw new UnauthorizedException('Credenciales inválidas');
    }

    user.loginAttempts = 0;
    user.lockUntil = undefined;

    const verificationCode = this.generateVerificationCode();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    user.verificationCodes = [
      {
        code: verificationCode,
        expiresAt,
      },
    ];

    await user.save();

    // Simulación de envío de código por correo
    console.log(
      `Código de verificación para ${user.email}: ${verificationCode}`,
    );

    const tempToken = this.jwtService.sign(
      {
        sub: user._id,
        email: user.email,
        type: 'temporary',
      },
      { expiresIn: '5m' },
    );

    return {
      message: 'Código de verificación enviado',
      tempToken,
    };
  }

  async verify2FA(verify2FADto: Verify2FADto) {
    const decodedToken = this.jwtService.verify(verify2FADto.tempToken);
    if (decodedToken.type !== 'temporary') {
      throw new UnauthorizedException('Token inválido');
    }

    const user = await this.userModel
      .findById(decodedToken.sub)
      .select('+verificationCodes');

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const validCode = user.verificationCodes?.find(
      (vc) =>
        vc.code === verify2FADto.verificationCode && vc.expiresAt > new Date(),
    );

    if (!validCode) {
      throw new UnauthorizedException('Código inválido o expirado');
    }

    user.verificationCodes = [];
    user.lastLogin = new Date();
    await user.save();

    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
      roles: user.roles,
    });

    return {
      access_token: token,
      user: this.sanitizeUser(user),
    };
  }

  async verifyServiceToken(token: string, serviceId: string): Promise<any> {
    try {
      if (serviceId !== 'bank-service') {
        throw new UnauthorizedException('Servicio no autorizado');
      }

      const payload = this.jwtService.verify(token) as JwtPayload;

      if (payload.type === 'temporary') {
        throw new UnauthorizedException(
          'Token temporal no válido para el servicio bancario',
        );
      }

      const user = await this.userModel.findById(payload.sub);
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Usuario no válido o inactivo');
      }

      return {
        userId: user._id,
        email: user.email,
        documentType: user.documentType,
        documentNumber: user.documentNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }

  async getUserInfo(userId: string, serviceId: string): Promise<any> {
    try {
      if (serviceId !== 'bank-service') {
        throw new UnauthorizedException('Servicio no autorizado');
      }

      const user = await this.userModel.findById(userId);
      if (!user) {
        throw new BadRequestException('Usuario no encontrado');
      }

      if (!user.isActive) {
        throw new UnauthorizedException('Usuario inactivo');
      }

      return {
        userId: user._id,
        email: user.email,
        documentType: user.documentType,
        documentNumber: user.documentNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        isActive: user.isActive,
      };
    } catch (error) {
      if (
        error instanceof BadRequestException ||
        error instanceof UnauthorizedException
      ) {
        throw error;
      }
      throw new BadRequestException('Error al obtener información del usuario');
    }
  }

  private generateVerificationCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  private sanitizeUser(user: UserDocument) {
    const sanitized = user.toObject();
    delete sanitized.password;
    delete sanitized.verificationCodes;
    return sanitized;
  }
}
