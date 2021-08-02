import { asyncHandler } from "../../middleware/async";
import express, { Request, Response, NextFunction, request } from "express";
import { Property } from "./propertyModel";
import { Multer } from "multer";

export const createProperty = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    
    let files: any = [];
    
    let imagePath: String[]=[]

    files = req.files;

    files?.map((value: any, index: number) => {
      const path = value.path.replace(/\\/g, "/");
      imagePath.push(path);
    });
        
    let data = JSON.parse(req.body.data)

    data.images = imagePath    
    
    const property = await Property.create(data);

    res.status(201).json({
      success: true,
      data: property,
    });
  }
);

