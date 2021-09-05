import { NextFunction, Response, Request } from "express";
import { asyncHandler } from "../../middleware/async";
import { ErrorResponse } from "../../utils/errorResponse";
import response from "../../utils/response";
import { User } from "../users/userModel";
import { Tenent } from "./tenentModel";

export const createTenent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user) {
      const user = await User.findById(req.user);

      if (!user) {
        return next(new ErrorResponse(400, "Invalid user credentials"));
      }

      const tenent = await Tenent.create({
        tenent_id: req.user,
        ...req.body,
      });

      response(res, 200, true, tenent);
    } else {
      return next(new ErrorResponse(400, "Invalid user credentials"));
    }
  }
);

// @desc   Search for tenent message
// @route  PUT /api/v1/tenents?propertyId
// @access Private
export const checkTenent = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tenent = await Tenent.findOne({
      property_id: req.query.propertyId?.toString(),
    }).where({ tenent_id: req.user });

    if (!tenent) {
      return next(new ErrorResponse(400, "Not found"));
    }
    response(res, 200, true);
  }
);
