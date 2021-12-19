import { Document, Model, model, Schema } from "mongoose";

interface IMessage {
  tenant_id: any;
  owner_id: any;
  property_id: any;
  message: string;
  sentAt: any;
}

interface IMessageDocument extends IMessage, Document {}

const MessageSchema: Schema = new Schema({
  tenant_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
