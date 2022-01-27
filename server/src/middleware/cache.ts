import { NextFunction, Request, Response } from "express";
//import { redis } from "../config/redis";
import response from "../utils/response";


// export const cache = (req: Request, res: Response, next: NextFunction) => {
//   const key = req.query.city?.toString();
//   redis.get(key, (err: any, data: any) => {
//     if (data !== null) {
//       response(res, 200, true, JSON.parse(data));
//     } else {
//       next();
//     }
//   });
// };
