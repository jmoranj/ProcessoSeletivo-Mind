import { User } from "../types/user";
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface CustomRequest extends Request {
  token: JwtPayload | string;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, 'your_jwt_secret');

    (req as CustomRequest).token = decoded;

    next();
  } catch (err) {
    console.log(err)
    res.status(401).send('Please authenticate');
  }
};