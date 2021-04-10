import { Response, NextFunction, Request } from "express";
import { ErrorResponse } from "../utills/errorResponse";
export const errorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error: ErrorResponse | undefined;

  const { message, statusCode } = err;

  error = new ErrorResponse(statusCode, message);

  if (err.code === 11000) {
    error = new ErrorResponse(400, "Duplicate field value entered");
  }

  res.status(error?.statusCode || 500).json({
    success: false,
    message: error?.message || "Something went wrong",
  });
};
