import { NextFunction } from "express";
import mongoose, { Document, Model, model, Schema } from "mongoose";
import bcryptjs, { genSalt, hash } from "bcryptjs";

export interface Iuser extends Document {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  firstname: {
    type: String,
    required: ["Firstname is require", true],
  },
  lastname: {
    type: String,
    required: ["Lastname is require", true],
  },
  email: {
    type: String,
    unique: [true, "Email already exist"],
    required: ["Email is require", true],
  },
  role: {
    type: String,
    enum: ["owner", "tenant"],
    default: "tenant",
  },
  password: {
    type: String,
    required: [true, "Password is require"],
    minlenght: 6,
    select: false,
  },
});

UserSchema.pre<Iuser>("save", async function (next) {
  const salt: string = await genSalt(10);
  this.password = await hash(this.password, salt);
});

export const User: Model<Iuser> = model("User", UserSchema);
