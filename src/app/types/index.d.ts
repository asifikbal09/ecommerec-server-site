import { JwtPayload } from "jsonwebtoken";
import { IUserPayload } from "../modules/user/user.interface";

declare global {
  namespace Express {
    interface Request {
      user: IUserPayload | JwtPayload ;
    }
  }
}