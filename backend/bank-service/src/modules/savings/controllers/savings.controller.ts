import { Controller, Get, Post, Patch, Body, Param, Req } from '@nestjs/common';
import { SavingsService } from '../services/savings.service';
import { CreateGoalDto } from '../dtos/create-goal.dto';
import { UpdateGoalDto } from '../dtos/update-goal.dto';
import { Types } from 'mongoose';
import { RequestWithUser } from 'src/shared/auth/interfaces/auth.interface';

@Controller('savings')
export class SavingsController {
  constructor(private readonly savingsService: SavingsService) {}

  @Post('goals')
  async createGoal(
    @Req() request: RequestWithUser,
    @Body() createGoalDto: CreateGoalDto,
  ) {
    const { user } = request.user;
    return this.savingsService.createGoal(user.userId, createGoalDto);
  }

  @Get('goals')
  async getMyGoals(@Req() request: RequestWithUser) {
    const { user } = request.user;
    return this.savingsService.getUserGoals(user.userId);
  }

  @Get('goals/:id')
  async getGoal(@Param('id') id: string, @Req() request: RequestWithUser) {
    const { user } = request.user;
    return this.savingsService.getGoalById(id, user.userId);
  }

  @Patch('goals/:id')
  async updateGoal(
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
    @Req() request: RequestWithUser,
  ) {
    const { user } = request.user;
    return this.savingsService.updateGoal(id, user.userId, updateGoalDto);
  }

  @Post('goals/:id/direct-contribution')
  async makeDirectContribution(
    @Param('id') id: string,
    @Body() contributionData: { amount: number; description: string },
    @Req() request: RequestWithUser,
  ) {
    const { user } = request.user;
    await this.savingsService.processDirectContribution(
      new Types.ObjectId(id),
      contributionData.amount,
      user.userId,
      contributionData.description,
    );
    return this.savingsService.getGoalById(id, user.userId);
  }
}
