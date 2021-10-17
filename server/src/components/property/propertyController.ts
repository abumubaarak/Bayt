import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { asyncHandler } from "../../middleware/async";
import { ErrorResponse } from "../../utils/errorResponse";
import response from "../../utils/response";
import { Property } from "./propertyModel";

export const createProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      let files: any = [];

      let imagePath: String[] = [];

      files = req.files;

      files?.map((value: any, index: number) => {
        const path = value.path.replace(/\\/g, "/");
        imagePath.push(path);
      });

      let data = JSON.parse(req.body.data);

      data.images = imagePath;
      data.owner_id = req.body.user._id;

      delete req.body.user;

      const property = await Property.create(data);

      res.status(201).json({
        success: true,
        data: property,
      });
    } else {
      response(res, 400, false, undefined, "Property data is required");
    }
  }
);

// @desc   property search
// @route  GET /api/v1/properties?city=:value
// @access Public
export const searchProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let city = req.query.city?.toString();

    const property = await Property.find({ city });

    if (!property) {
      return next(new ErrorResponse(400, `No Property Found in ${city}`));
    }
    response(res, 200, true, property);
  }
);

// @desc   Single Property
// @route  GET /api/v1/properties/:id
// @access Public
export const getSingleProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (Types.ObjectId(req.params.id)) {
      const property = await Property.findById(req.params.id);

      if (!property) {
        return next(
          new ErrorResponse(404, `Property not found with id ${req.params.id}`)
        );
      }
      response(res, 200, true, property);
    }
  }
);
