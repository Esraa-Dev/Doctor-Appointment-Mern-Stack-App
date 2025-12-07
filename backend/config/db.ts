import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

export const connectDb = async () => {
  try {
    if (!process.env.MONGODB_URL) {
      throw new ApiError("MONGODB_URL is missing in environment variables", 500);
    }

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
