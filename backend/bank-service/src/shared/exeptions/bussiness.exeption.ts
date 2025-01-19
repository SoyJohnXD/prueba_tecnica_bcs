import { ERROR_MESSAGES } from '../constants/app.constants';
import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(resource: string) {
    super(`${resource} no encontrado`, 404, 'RESOURCE_NOT_FOUND');
  }
}

export class InsufficientFundsException extends BaseException {
  constructor() {
    super(ERROR_MESSAGES.ACCOUNT.INSUFFICIENT_FUNDS, 400, 'INSUFFICIENT_FUNDS');
  }
}

export class MinimumBalanceException extends BaseException {
  constructor() {
    super(
      ERROR_MESSAGES.ACCOUNT.MINIMUM_BALANCE,
      400,
      'MINIMUM_BALANCE_REQUIRED',
    );
  }
}

export class InvalidTransactionException extends BaseException {
  constructor(message: string) {
    super(message, 400, 'INVALID_TRANSACTION');
  }
}
