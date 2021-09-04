import  { Document, Model, model, Schema } from "mongoose";
import  { genSalt, hash, compare } from "bcryptjs";
import  { sign, verify } from "jsonwebtoken";

export interface Iuser {
  firstname: string;
  lastname: string;
  email: string;
  bio: string;
  role: string;
  password: string;
  provider: string;
  socialID: string;
}

interface IUserDocument extends Iuser, Document {
  validatePassword(userpassword: string): Promise<boolean>;
  getJwtToken(): string;
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
  bio:{
    type: String,
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
  provider: {
    type:String
  },
  socialID: {
    type:String,
  }
});

UserSchema.pre<IUserDocument>("save", async function (next) {

   if (!this.socialID) {
    const salt: string = await genSalt(10);
    this.password = await hash(this.password, salt); 
   } else {
    // this.password.
  }
});

UserSchema.methods.validatePassword = async function (userpassword: string) {
  return await compare(userpassword, (this as any).password);
};

UserSchema.methods.getJwtToken = function () {
  return sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRE!,
  });
};

export const User: Model<IUserDocument> = model<IUserDocument>(
  "User",
  UserSchema
);
