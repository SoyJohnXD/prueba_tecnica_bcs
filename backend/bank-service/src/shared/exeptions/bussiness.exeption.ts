import { BaseException } from './base.exception';

export class NotFoundException extends BaseException {
  constructor(resource: string) {
    super(`${resource} no encontrado`, 404, 'RESOURCE_NOT_FOUND');
  }
}

export class InsufficientFundsException extends BaseException {
  constructor() {
    super(
      'Saldo insuficiente para realizar la operación',
      400,
      'INSUFFICIENT_FUNDS',
    );
  }
}

export class MinimumBalanceException extends BaseException {
  constructor() {
    super(
      'La transacción excede el saldo mínimo permitido',
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
