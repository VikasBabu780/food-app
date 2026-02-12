import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      id?: Types.ObjectId;
    }
  }
}

export {};
