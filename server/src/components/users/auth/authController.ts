import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../middleware/async";
import { ErrorResponse } from "../../../utils/errorResponse";
import response from "../../../utils/response";
import { Iuser, User } from "../userModel";

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

export const getMe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const user = await User.findById(req.user);

      if (!user) {
        return next(new ErrorResponse(400, "Invalid user credentials"));
      }
      response(res, 200, true, user);
    }
  }
);

export const getLandlord = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
     const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorResponse(400, "Invalid user credentials"));
    }
    response(res, 200, true, user);
  }
);
export const updateProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      let user = await User.findById(req.user);

      if (!user) {
        return next(new ErrorResponse(400, "Invalid user credentials"));
      }

      if (req.body.firstname || req.body.lastname || req.body.bio) {
        user = await User.findByIdAndUpdate(req.user, req.body);
        response(res, 200, true, user);
      } else {
        return next(new ErrorResponse(400, "User profile data is required"));
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
