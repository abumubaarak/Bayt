 import { Model, Schema, Document, model } from "mongoose";



interface IMessage {
  tenent_id: string;
  owner_id: string;
  property_id:string
  message: string;
  sentAt: any;
}

interface IMessageDocument extends IMessage, Document {}


const MessageSchema:Schema = new Schema({
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
      message: {
        type: String,
        required: ["Message is require", true],
      },
      sentAt: {
        type: Date,
        default: Date.now,
      },
})

export const Message: Model<IMessageDocument> = model<IMessageDocument>(
    "message",
    MessageSchema
  );
  