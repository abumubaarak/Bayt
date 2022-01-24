import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { redis } from "../../config/redis";
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
        const path = value.location.replace(/\\/g, "/");
        imagePath.push(path);
      });

      let data = JSON.parse(req.body.data);

      data.images = imagePath;
      data.owner_id = req.body.user._id;

      delete req.body.user;

      const propertyData={...data,isActive:true}
      const property = await Property.create(propertyData);

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
    const property = await Property.find({
      city: { $regex: city, $options: "i" },
    });

    if (!property) {
      return next(new ErrorResponse(400, `No Property Found in ${city}`));
    }
    redis.set(city, JSON.stringify(property), "EX", 3600);
    response(res, 200, true, property);
    
  }
);

// @desc   Get owner property
// @route  GET /api/v1/properties/owner
// @access Private
export const getOwnerProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const property = await Property.find({})
      .where("owner_id")
      .equals(req.body.user._id);

    if (!property) {
      return next(new ErrorResponse(400, `No Property Found`));
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
