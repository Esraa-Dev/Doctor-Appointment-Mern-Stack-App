import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  AccessTokenExpire,
  RefreshTokenExpire,
  UserRole,
} from "../constants.js";
import Joi from "joi";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
  phone: string;
  role: UserRole;
  isEmailVerified: boolean;
  verifyOtp?: string;
  verifyOtpExpireAt?: Date;
  resetPasswordOtp?: string;
  resetPasswordOtpExpireAt?: Date;
  refreshToken?: string;
  isActive: boolean;
  isPasswordValid(password: string): Promise<boolean>;
  generateOtp(type: string): string;
  generateAccessToken(): string;
  generateRefreshToken(): string;
}

const UserSchema: Schema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "data:image/jpeg;base64,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",
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
      default: UserRole.PATIENT,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    verifyOtp: {
      type: String,
    },
    verifyOtpExpireAt: {
      type: Date,
    },
    resetPasswordOtp: {
      type: String,
    },
    resetPasswordOtpExpireAt: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { discriminatorKey: "role", timestamps: true }
);

UserSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.isPasswordValid = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateOtp = function (type = "verification") {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  if (type === "verification") {
    this.verifyOtp = otp;
    this.verifyOtpExpireAt = new Date(Date.now() + 10 * 60 * 1000);
  } else if (type === "reset") {
    this.resetPasswordOtp = otp;
    this.resetPasswordOtpExpireAt = new Date(Date.now() + 10 * 60 * 1000);
  }

  return otp;
};

UserSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, role: this.role },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: AccessTokenExpire }
  );
};

UserSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: RefreshTokenExpire }
  );
};

export const registerValidation = Joi.object({
  firstName: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
  }),
  lastName: Joi.string().min(3).max(50).required().messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters",
  }),
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Passwords must match",
    "string.empty": "Confirm password is required",
  }),
  phone: Joi.string()
    .pattern(/^[0-9+]+$/)
    .min(10)
    .max(15)
    .required()
    .messages({
      "string.pattern.base": "Phone must contain only numbers and +",
      "string.empty": "Phone is required",
    }),
  role: Joi.string()
    .valid(...Object.values(UserRole))
    .optional(),
});

export const loginValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

export const forgotPasswordValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
});

export const verifyResetOtpValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  resetPasswordOtp: Joi.string()
    .length(6)
    .pattern(/^\d+$/)
    .required()
    .messages({
      "string.empty": "OTP is required",
      "string.length": "OTP must be 6 digits",
      "string.pattern.base": "OTP must contain only numbers",
    }),
});

export const resetPasswordValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.only": "Passwords must match",
    "string.empty": "Confirm password is required",
  }),
});

export const resendOtpValidation = Joi.object({
  email: Joi.string().email().required().messages({
    "string.empty": "Email is required",
    "string.email": "Invalid email format",
  }),
  type: Joi.string()
    .valid("reset-password", "email-verification")
    .required()
    .messages({
      "any.only": "Type must be either reset-password or email-verification",
    }),
});

export const User = mongoose.model<IUser>("User", UserSchema);

export default User;
