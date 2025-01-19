export interface AuthenticatedUser {
  isValid: boolean;
  user: {
    userId: string;
    email: string;
    documentType: string;
    documentNumber: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
  };
}

export interface RequestWithUser extends Request {
  user?: AuthenticatedUser;
}
