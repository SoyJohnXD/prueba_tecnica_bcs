export enum ENTITY_STATUS {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}

export enum ACCOUNT {
  MIN_ACCOUNT_NUMBER = 100000,
  MAX_ACCOUNT_NUMBER = 999999,
  DEFAULT_BALANCE = 0,
}
export enum TRANSACTION_TYPES {
  DEPOSIT = 'DEPOSIT',
  WITHDRAWAL = 'WITHDRAWAL',
  PURCHASE = 'PURCHASE',
  INVESTMENT = 'INVESTMENT',
  RETURN = 'RETURN',
}

export const ACCOUNT_CONFIG = {
  ROUNDING_TYPES: {
    NEAREST_500: 'NEAREST_500',
    NEAREST_1000: 'NEAREST_1000',
    NEAREST_5000: 'NEAREST_5000',
    FIXED_AMOUNT: 'FIXED_AMOUNT',
  },
  INVESTMENT_TRIGGERS: {
    ON_AMOUNT: 'ON_AMOUNT',
    ON_SCHEDULE: 'ON_SCHEDULE',
  },
  RISK_PROFILES: {
    CONSERVATIVE: 'CONSERVATIVE',
    MODERATE: 'MODERATE',
    AGGRESSIVE: 'AGGRESSIVE',
  },
  DEFAULT_VALUES: {
    ROUNDING_ENABLED: false,
    ROUNDING_TYPE: 'NEAREST_500',
    ROUNDING_AMOUNT: 500,
    MAX_ROUNDING_AMOUNT: 5000,
    MIN_ACCOUNT_BALANCE: 50000,
    RISK_PROFILE: 'CONSERVATIVE',
    INVESTMENT_THRESHOLD: 1000,
    EXPECTED_RETURNS: {
      CONSERVATIVE: { MIN: 2, MAX: 4 },
      MODERATE: { MIN: 4, MAX: 8 },
      AGGRESSIVE: { MIN: 8, MAX: 12 },
    },
  },
};

export const SAVINGS_GOAL = {
  STATUS: {
    IN_PROGRESS: 'IN_PROGRESS',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
  },
  PROJECTION: {
    ON_TRACK: 'ON_TRACK',
    DELAYED: 'DELAYED',
    AHEAD: 'AHEAD',
  },
  CATEGORIES: {
    TRAVEL: 'TRAVEL',
    EDUCATION: 'EDUCATION',
    HOUSING: 'HOUSING',
    VEHICLE: 'VEHICLE',
    EMERGENCY: 'EMERGENCY',
    OTHER: 'OTHER',
  },
};

export enum INVESTMENT_STATUS {
  ACTIVE = 'ACTIVE',
  WITHDRAWN = 'WITHDRAWN',
}
export const INVESTMENT = {
  DEFAULT_VALUES: {
    LOCK_PERIOD_DAYS: 30,
    INITIAL_RETURN: 0,
  },
};

export const ERROR_MESSAGES = {
  ACCOUNT: {
    NOT_FOUND: 'Cuenta no encontrada',
    INSUFFICIENT_FUNDS: 'Saldo insuficiente para realizar la operación',
    MINIMUM_BALANCE: 'La transacción excede el saldo mínimo permitido',
    INVALID_TRANSACTION: 'Tipo de transacción no válido',
  },
  GOAL: {
    NOT_FOUND: 'Meta no encontrada',
    INVALID_DEADLINE: 'La fecha límite debe ser futura',
    INVALID_AMOUNT: 'El monto objetivo debe ser mayor a cero',
    CATEGORY_REQUIRED: 'La categoría es requerida',
  },
  INVESTMENT: {
    NOT_FOUND: 'Inversión no encontrada',
    ALREADY_WITHDRAWN: 'La inversión ya fue retirada',
  },
};

export const VALIDATION = {
  MIN_AMOUNTS: {
    TRANSACTION: 1000,
    GOAL: 50000,
    INVESTMENT: 10000,
  },
  MAX_AMOUNTS: {
    TRANSACTION: 100000000,
    GOAL: 1000000000,
  },
  DATE_FORMATS: {
    DEFAULT: 'YYYY-MM-DD',
    TIMESTAMP: 'YYYY-MM-DD HH:mm:ss',
  },
};
