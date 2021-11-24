import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middleware/async";
import { ErrorResponse } from "../../utils/errorResponse";
import response from "../../utils/response";
import { Message } from "./messageModel";

export const getUserMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const message = await Message.find().where("tenant_id", req.user);

    if (!message) {
      return next(new ErrorResponse(400, "Not found"));
    }
    response(res, 200, true, message);
  }
);

export const getOwnerMessage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.user._id;

    const message = await Message.find().where("owner_id", userId);

    if (!message) {
      return next(new ErrorResponse(400, "Not found"));
    }
    response(res, 200, true, message);
  }
);
