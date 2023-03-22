import jwt, { JwtPayload } from "jsonwebtoken";

import { DataStoredInToken, TokenData } from "../dtos";
import { User } from "../entities";

export const generateToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = {
    id: user.id,
  };
  const secretKey: string = process.env.SECRET_KEY || "secret";
  const expiresIn: number = 60 * 60;

  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, secretKey, {
      expiresIn,
    }),
  };
};

export const verifyToken = (
  token: string,
  secrect: string
): DataStoredInToken => {
  return jwt.verify(token, secrect) as DataStoredInToken;
};
