export interface DecodedUser {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: DecodedUser;
    }
  }
}
