import { NextFunction, Request, Response } from "express";
import response from "../utils/response";

const Redis = require("ioredis");

const redis = new Redis();

export const cache = (req: Request, res: Response, next: NextFunction) => {
  const key = req.query.city?.toString();
  redis.get(key, (err: any, data: any) => {
    if (data !== null) {
      response(res, 200, true, JSON.parse(data));
    } else {
      next();
    }
  });
};
