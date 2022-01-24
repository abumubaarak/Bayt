import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";
import { asyncHandler } from "../../middleware/async";
import { ErrorResponse } from "../../utils/errorResponse";
import response from "../../utils/response";
import { Property } from "../property/propertyModel";
import { Payment } from "./paymentModel";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? " ", {
  apiVersion: "2020-08-27",
});
export const checkout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { propertyId } = req.body;
    const property = await Property.findById(propertyId);

    const { email, _id: userID } = req.body.user;

    if (!property) {
      return next(new ErrorResponse(400, "Property not found"));
    }

    const {
      name,
      cost,
      address,
      propertyType,
      _id: propertyID,
      owner_id,
      images: imageUrl,
    } = property;

  console.log(cost)
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            
            unit_amount: cost,
            
            product_data: {
              name: propertyType,
              description: `Payment for ${name} at ${address}`,
              images: [imageUrl[0]],
            },
            
           },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        property_id: String(propertyID),
        user_id: String(userID),
        recipient: String(owner_id),
      },
      customer_email: email,
      success_url: "http://localhost:3000/paymentsuccess",
      cancel_url: "http://localhost:3000/paymentfailure",
    });

    response(res, 200, true, { id: session.id });
  }
);

export const successfulPayment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);

    const {
      data: {
        object: {
          id,
          metadata: { property_id, user_id, recipient },
          amount_total,
          payment_status,
        },
      },
    } = req.body;

    await Payment.create(
      {
        tenantID: user_id,
        propertyID: property_id,
        ownerID: recipient,
        status: payment_status,
        amount: amount_total,
        checkoutID: id,
      },
      async () => {
        await Property.findOneAndUpdate(
          { _id: property_id },
          { isActive: false }
        );
      }
    );
  }
);

export const getUserPayments = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let payments;
    const { email, _id: userID, role } = req.body.user;

    if (role === "owner") {
      payments = await Payment.find({ ownerID: userID }).sort({ paidOn: -1 });
    } else {
      payments = await Payment.find({ tenantID: userID }).sort({
        paidOn: -1,
      });
    }

    if (!payments) {
      return next(new ErrorResponse(400, "No property Found"));
    }

    response(res, 200, true, payments);
  }
);

export const getSinglePayment = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return next(new ErrorResponse(400, "No property Found"));
    }

    response(res, 200, true, payment);
  }
);
