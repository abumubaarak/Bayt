import { Document, Model, model, Schema } from "mongoose";
import { User } from "../users/userModel";
import { Property } from "../property/propertyModel";

interface ITenent {
  tenant_id: string;
  owner_id: any;
  property_id: any;
  request: string;
  sentAt: any;
}

interface ITenentDocument extends ITenent, Document {}

const TenentSchema: Schema = new Schema({
  tenant_id: {
    type: String,
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  property_id: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  request: {
    type: String,
    required: ["Message request is require", true],
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export const Tenent: Model<ITenentDocument> = model<ITenentDocument>(
  "tenent",
  TenentSchema
);
