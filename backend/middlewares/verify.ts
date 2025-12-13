import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { DecodedUser } from "../types/index.d";
import User from "../models/UserSchema";
import { ApiError } from "../utils/ApiError";
import { AsyncHandler } from "../utils/AsyncHandler";
import { UserRole } from "../constants";

export const verifyToken = AsyncHandler(
  async (req: Request, _res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError("Not authenticated", 401);
    }

    if (!process.env.ACCESS_TOKEN_SECRET) {
      throw new Error(
        "ACCESS_TOKEN_SECRET is missing in environment variables"
      );
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET
      ) as DecodedUser;
      const user = await User.findById(decoded._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        throw new ApiError("User not found", 401);
      }
      req.user = decoded;
      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        throw new ApiError(error?.message || "Token expired", 401);
      }
      throw new ApiError(error?.message || "Invalid access token", 401);
    }
  }
);

export const verifyPermission = (roles: UserRole[] = []) => {
  return AsyncHandler(
    async (req: Request, _res: Response, next: NextFunction) => {
      const user = req.user?._id;
      if (!user) {
        throw new ApiError("Not authenticated", 401);
      }
      if (roles.includes(req.user?.role as UserRole)) {
        next(); //allowed
      } else {
        throw new ApiError("You are not allowed to perform this action", 403);
      }
    }
  );
};
