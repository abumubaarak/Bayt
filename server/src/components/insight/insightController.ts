import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { asyncHandler } from "../../middleware/async";
import { Payment } from "../payment/paymentModel";
import { Property } from "../property/propertyModel";
import { Tenent } from "../tenent/tenentModel";

export const getInsight = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (Types.ObjectId(req.body.user._id)) {
      const owner_id = req.body.user._id;

      const active = [
        {
          $match: { isActive: true, owner_id },
        },
        {
          $group: {
            _id: "$isActive",
            activeListing: { $sum: 1 },
          },
        },
      ];
      const occupied = [
        {
          $match: { isActive: false, owner_id },
        },
        {
          $group: {
            _id: "$isActive",
            occupied: { $sum: 1 },
          },
        },
      ];

      const payment = await Payment.aggregate([
        {
          $match: { ownerID: owner_id },
        },
        {
          $group: {
            _id: null,
            revenue: { $sum: "$amount" },
          },
        },
      ]);

      const propertyAgg = await Property.aggregate().facet({
        active,
        occupied,
      });

      const properties = await Property.find(
        { owner_id },
        "name city cost postedOn avaliableBedroom images"
      )
        .sort({ postedOn: -1 })
        .limit(4);

      const tenant = await Tenent.find({ owner_id }).populate(
        "owner_id",
        "firstname lastname"
      );

      const paymentOverview = await Payment.find(
        { ownerID: owner_id, status: "paid" },
        "amount -_id"
      );

      let amounts: number[] = [];

      paymentOverview.map((i: any) => {
        amounts.push(i.amount);
      });
      const emptyPayment = [{ id: 0, revenue: 0 }];
      const paymentObj = payment.length === 0 ? emptyPayment : payment;

 
      res.status(200).json({
        success: true,
        data: {
          stats: [...paymentObj, ...propertyAgg],
          properties,
          revenue: amounts,
          tenantRequest: tenant,
        },
      });
    }
  }
);
