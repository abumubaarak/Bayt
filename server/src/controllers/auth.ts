import express, { Request, Response, NextFunction } from "express";
import { User, Iuser } from "../model/User";
import { asyncHandler } from "../middleware/async";

export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: Iuser = await User.create(req.body);

    res.status(201).json({
      status: true,
      data: user,
    });
  }
);
