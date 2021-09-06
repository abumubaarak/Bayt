import { NextFunction, Response, Request } from "express";
import { asyncHandler } from "../../middleware/async";
import { ErrorResponse } from "../../utils/errorResponse";
import response from "../../utils/response";
import { User } from "../users/userModel";

// @desc   Add property to wishlist
// @route  PUT /api/v1/wishlists
// @access Private
export const addToWishlist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
    const user = await User.findByIdAndUpdate(req.user, {
      $push: { wishlist: req.body.propertyId },
    });

    if (!user) {
      return next(new ErrorResponse(400, "Item not found"));
    }

    response(res, 201, true, "Added to wishlist");
  }
);

// @desc   Remove property to wishlist
// @route  DELETE /api/v1/wishlists/:id
// @access Private
export const removeWishlist = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findByIdAndUpdate(req.user, {
      $pull: { wishlist: req.params.id },
    });

    if (!user) {
      return next(new ErrorResponse(400, "Item not found"));
    }

    response(res, 204, true, "Item remove from wishlist");
  }
);
