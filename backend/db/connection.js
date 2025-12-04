import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connected successfully");
  } catch (err) {
    console.log("Database connection error:", err);
    process.exit(1);
  }
};
