import { Document, Model, model, Schema } from "mongoose";
import slugify from "slugify";

export interface IProperty extends Document {
  name: string;
  city: string;
  address: string;
  propertySize: number;
  avaliableBedroom: number;
  roomSize: number;
  isActive: boolean;
  avaliableBathroom: number;
  propertyType: string;
  rules: string[];
  amenities: string[];
  cost: number;
  description: string;
  images: string[];
  owner_id: string;
  postedOn: any;
  slug: string;
}

const PropertyScheme: Schema = new Schema({
  name: {
    type: String,
    unique: true,
    required: ["Property name is required", true],
  },

  city: {
    type: String,
    required: ["Property city is required", true],
  },
  address: {
    type: String,
    required: ["Property address is required", true],
  },
  propertySize: {
    type: Number,
    required: ["Property size is required", true],
  },
  avaliableBedroom: {
    type: Number,
    required: ["Total Bedroom value is required", true],
  },
  roomSize: {
    type: Number,
    required: ["Room Size is required", true],
  },
  isActive: Boolean,
  avaliableBathroom: {
    type: Number,
    required: ["Total bedroom count is required", true],
  },
  propertyType: {
    type: String,
    max: 1,
    required: ["Property type is required", true],
    enum: ["Room", "Apartment", "Duplex", "Loft"],
  },
  rules: {
    type: [String],
    required: ["Property rules is required", true],
    enum: ["cat", "family", "zeropet"],
  },
  amenities: {
    type: [String],
    required: ["Property amenities is required", true],
    enum: [
      "wifi",
      "lift",
      "dryer",
      "gym",
      "furnished",
      "garden",
      "fire",
      "washing_machine",
      "parking",
      "cctv",
      "storage",
      "air",
    ],
  },
  cost: {
    type: Number,
    required: ["Property Cost is required", true],
  },
  description: {
    type: String,
    required: ["Property description is required", true],
  },
  images: {
    type: [String],
    required: ["Property image is required", true],
  },
  postedOn: {
    type: Date,
    default: Date.now,
  },
  owner_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  slug: String,
});

PropertyScheme.pre<IProperty>("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
export const Property: Model<IProperty> = model<IProperty>(
  "Property",
  PropertyScheme
);
