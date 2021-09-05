import { asyncHandler } from "./async";
import { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/errorResponse";
import { verify, VerifyOptions } from "jsonwebtoken";
import { User } from "../components/users/userModel";

export const protectedRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return next(
        new ErrorResponse(
          403,
          "Authentication is required to authroze this route"
        )
      );
    }

    try {
      const decode: any = verify(token, process.env.JWT_SECRET!);

      req.body.user = await User.findById(decode.id);

      next();
    } catch (err) {
      return next(
        new ErrorResponse(
          403,
          "Authentication is required to authroze this route"
        )
      );
    }
  }
);

export const sessionProtectedRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
      return next();
    }
    return next(new ErrorResponse(401, "Access denied"));
  }
);
