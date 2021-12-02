import { Document, Model, model, Schema } from "mongoose";

interface IPayment {
  checkoutID: string;
  tenantID: string;
  ownerID: string;
  propertyID: string;
  amount: string;
  status: string;
  paidOn: any;
}

interface IPaymentDocument extends IPayment, Document {}

const PaymentSchema: Schema = new Schema({
  checkoutID: {
    type: String,
  },
  tenantID: {
    type: String,
    required: ["Tenant Id is require", true],
  },
  ownerID: {
    type: String,
    required: ["Owner Id is require", true],
  },
  propertyID: {
    type: String,
    required: ["property ID is require", true],
  },
  amount: {
    type: String,
    required: ["Amount is require", true],
  },
  status: {
    type: String,
    required: ["Status is require", true],
  },
  paidOn: {
    type: Date,
    default: Date.now,
  },
});

export const Payment: Model<IPaymentDocument> = model<IPaymentDocument>(
  "payments",
  PaymentSchema
);
