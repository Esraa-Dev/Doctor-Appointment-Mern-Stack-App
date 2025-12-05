import { ApiError } from "../utils/ApiError";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }
  console.error("Unexpected Error:", err);
  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error" });
};
