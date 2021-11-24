import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { User } from "../components/users/userModel";
import { ErrorResponse } from "../utils/errorResponse";
import { asyncHandler } from "./async";

export const ownerProtectedRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }
    if (!token) {
      return next(
        new ErrorResponse(
          403,
          "Authentication is required to authorize this route"
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

export const protectedRoute = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
      if (!token) {
        return next(
          new ErrorResponse(
            403,
            "Authentication is required to authorize this route"
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
            "Authentication is required to authrozie this route"
          )
        );
      }
    } else {
      if (req.isAuthenticated()) {
        return next();
      }
    }
  }
);
