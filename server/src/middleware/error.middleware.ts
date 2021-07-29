import { Response, NextFunction, Request } from "express";
import multer from "multer";
import { ErrorResponse } from "../utills/errorResponse";
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ErrorResponse | undefined;

  console.log(err);

  const { message, statusCode } = err;

  error = new ErrorResponse(statusCode, message);

  if (err.code === 11000) {
    error = new ErrorResponse(400, "Email already exist");
  }

  if (err instanceof multer.MulterError) {
    error = new ErrorResponse(400, "Invalid image Field");
  } else if (err) {
    error = new ErrorResponse(400, err);

  }

  res.status(error?.statusCode || 500).json({
    success: false,
    message: error?.message || "Something went wrong",
  });
};
