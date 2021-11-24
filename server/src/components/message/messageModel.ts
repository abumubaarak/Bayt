import { Document, Model, model, Schema } from "mongoose";

interface IMessage {
  tenant_id: string;
  owner_id: string;
  property_id: string;
  message: string;
  sentAt: any;
}

interface IMessageDocument extends IMessage, Document {}

const MessageSchema: Schema = new Schema({
  tenant_id: {
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
  message: {
    type: String,
    required: ["Message is require", true],
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export const Message: Model<IMessageDocument> = model<IMessageDocument>(
  "message",
  MessageSchema
);
