import { Model, Schema, Document, model } from "mongoose";

interface ITenent {
  tenent_id: string;
  owner_id: string;
  property_id:string
  request: string;
  sentAt: any;
}

interface ITenentDocument extends ITenent, Document {}

const TenentSchema: Schema = new Schema({
  tenent_id: {
    type: String,
  },
  owner_id: {
    type: String,
    required: ["Owner Id is require", true],
  },
  property_id: {
    type: String,
    required: ["Property Id is require", true],
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
