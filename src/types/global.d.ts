import { User } from "../modules/users/domain/User.entity";

declare global {
  namespace Express {
    interface Request {
      user: Partial<User>;
    }
  }
}
export {};
