import mongoose, { Schema } from "mongoose";
const foodPartnerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const foodPartnerModel = mongoose.model(
  "foodpartner",
  foodPartnerSchema
);
