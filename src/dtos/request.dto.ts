import { Request } from "express";

import { User } from "../entities";

export interface DataStoredInToken {
  id: string;
}

export interface RequestWithUser extends Request {
  user?: User;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}
