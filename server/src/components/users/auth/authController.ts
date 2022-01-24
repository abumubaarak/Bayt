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

export const getLandlord = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new ErrorResponse(400, "Invalid user credentials"));
    }
    response(res, 200, true, user);
  }
);

export const getUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    response(res, 200, true, req.body.user);
  }
);

export const updateProfile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.user) {

      if (req.body.firstname || req.body.lastname || req.body.bio) {
        const user = await User.findByIdAndUpdate(req.body.user._id, req.body);
        response(res, 200, true, user);
      } else {
        return next(new ErrorResponse(400, "User profile data is required"));
      }
    }
  }
);

export const logout = (req: Request, res: Response, next: NextFunction) => {
  req.logOut();
  res.clearCookie("token");
  res.status(200).clearCookie("connect.sid", {
    path: "/",
  });
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }

    // The response should indicate that the user is no longer authenticated.
    return res.send({ authenticated: req.isAuthenticated() });
  });
};

const sendTokenWithResponse = (user: any, res: Response, message?: string) => {
  const { _id } = user;
  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    id: _id,
    access_token: token,
  });
  return;
};
