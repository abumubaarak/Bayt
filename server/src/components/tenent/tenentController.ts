import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../middleware/async";
import { ErrorResponse } from "../../utils/errorResponse";
import response from "../../utils/response";
import { Conversation } from "../conversation/conversationModel";
import { Message } from "../message/messageModel";
import { User } from "../users/userModel";
import { Tenent } from "./tenentModel";

// @desc   Create Tenant
// @route  POST /api/v1/tenents
// @access Private
export const createTenent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      let user = await User.findById(req.user);

      if (!user) {
        return next(new ErrorResponse(400, "Invalid user credentials"));
      }

      const tenent = await Tenent.create({
        tenant_id: req.user,
        ...req.body,
      });

      user = await User.findByIdAndUpdate(req.user, {
        $push: { request: req.body.property_id },
      });

      response(res, 200, true, tenent);
    } else {
      return next(new ErrorResponse(400, "Invalid user credentials"));
    }
  }
);

// @desc   Search for tenent message
// @route  GET /api/v1/tenents/:propertyId
// @access Private
export const searchSingleTenent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenent = await Tenent.findOne({
      property_id: req.params.id?.toString(),
    }).where({ tenant_id: req.user });

    if (!tenent) {
      return next(new ErrorResponse(400, "Not found"));
    }
    response(res, 200, true);
  }
);

// @desc   Get pending tenents
// @route  GET /api/v1/tenents/
// @access Private
export const getTenent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.body.user._id;
    const tenent = await Tenent.find({ owner_id: userId });

    if (!tenent) {
      return next(new ErrorResponse(400, "Not found"));
    }
    response(res, 200, true, tenent);
  }
);

// @desc   Decline tenent request
// @route  DELETE /api/v1/tenents/:id
// @access Private
export const declineTenentRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenent = await Tenent.findById(req.params.id.toString());

    if (!tenent) {
      return next(new ErrorResponse(400, "Not found"));
    }
    const user = await User.findByIdAndUpdate(req.user, {
      $pull: { request: req.params.id.toString() },
    });
    tenent.remove();

    response(res, 204, true, {});
  }
);

// @desc   Accept tenent request
// @route  PUT /api/v1/tenents/:id
// @access Private
export const acceptTenentRequest = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenent = await Tenent.findById(req.params.id.toString());

    if (!tenent) {
      return next(new ErrorResponse(400, "Not found"));
    }

    await Message.create(
      {
        tenant_id: tenent.tenant_id,
        owner_id: tenent.owner_id,
        property_id: tenent.property_id,
        message: tenent.request,
      },
      async (err, doc) => {
        await Conversation.create({
          tenant_id: doc.tenant_id,
          owner_id: doc.owner_id,
          message: doc.message,
          messageId: doc._id,
          sender: doc.tenant_id,
        });
      }
    );

    tenent.remove();

    response(res, 201, true, {});
  }
);
