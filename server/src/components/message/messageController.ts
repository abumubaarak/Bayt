import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middleware/async";
import { ErrorResponse } from "../../utils/errorResponse";
import response from "../../utils/response";
import { Message } from "./messageModel";

export const getMessages = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body.user;
    if (user.role === "owner") {
      const message = await Message.find()
        .where("owner_id", user._id)
        .populate("property_id tenant_id");
      if (!message) {
        return next(new ErrorResponse(400, "Not found"));
      }
      response(res, 200, true, message);
    } else {
      const message = await Message.find()
        .where("tenant_id", user._id)
        .populate("owner_id property_id");
      if (!message) {
        return next(new ErrorResponse(400, "Not found"));
      }
      response(res, 200, true, message);
    }
  }
);
