export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Register {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  phoneNumber: string;
}

export interface Verify2FA {
  verificationCode: string;
  tempToken: string;
}

export interface LoginResponse {
  message: string;
  tempToken: string;
}
export interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  phoneNumber: string;
  roles: string[];
  isActive: boolean;
  twoFactorEnabled: boolean;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  userId: string;
}
