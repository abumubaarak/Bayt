import express, { Request, Response, NextFunction } from "express";
import { User, Iuser } from "../userModel";
import { asyncHandler } from "../../../middleware/async";
import { ErrorResponse } from "../../../utils/errorResponse";
import response from "../../../utils/response";
import { Console } from "node:console";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: Iuser = await User.create(req.body);

    sendTokenWithResponse(user, res, "Account Successfully created");
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorResponse(400, `Email and password is require`));
    }

    const user = await User.findOne({ email }, "password");

    if (!user) {
      return next(new ErrorResponse(400, "Invalid user credentials"));
    }

    const isMatch = await user.validatePassword(password);

    if (!isMatch) {
      return next(new ErrorResponse(400, "Invalid user credentials"));
    }

    sendTokenWithResponse(user, res, "Login Successful");
  }
);

export const middle = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getMe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.session)
    if (req.user) {
      const user = await User.findById(req.user);
       response(res, 200, true, user);

      if (!user) {
        return next(new ErrorResponse(400, "Invalid user credentials"));
      }
    }
  }
);

export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    req.logout();
  }
);

const sendTokenWithResponse = (user: any, res: Response, message?: string) => {
  const token = user.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + <any>process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (message) {
    res.status(200).cookie("token", token, options).json({
      success: true,
      message,
    });
    return;
  }
  res.status(200).cookie("token", token, options).json({
    success: true,
  });
};
