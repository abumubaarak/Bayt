import { Document, Model, model, Schema } from "mongoose";

interface IConversation {
  tenant_id: string;
  owner_id: string;
  message: string;
  messageId: string;
  sender:string
  sentAt: any;
}

interface IConversationDocument extends IConversation, Document {}

const ConversationSchema: Schema = new Schema({
  tenant_id: {
    type: String,
  },
  owner_id: {
    type: String,
    required: ["Owner Id is require", true],
  },
  message: {
    type: String,
    required: ["Message is require", true],
  },
  sender: {
    type: String,
    required: ["Sender is require", true],
  },
  messageId: {
    type: String,
    required: ["MessageId is require", true],
  },
  sentAt: {
    type: Date,
    default: Date.now,
  },
});

export const Conversation: Model<IConversationDocument> =
  model<IConversationDocument>("conversation", ConversationSchema);
