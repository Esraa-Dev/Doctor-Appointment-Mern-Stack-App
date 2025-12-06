import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { DecodedUser } from "../types/index.d";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is missing in environment variables");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedUser;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
