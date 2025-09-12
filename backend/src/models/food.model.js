import mongoose, { Schema } from "mongoose";

const foodItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    foodPartner: {
      type: Schema.Types.ObjectId,
      ref: "foodpartner",
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    savesCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const foodItemModel = mongoose.model("fooditem", foodItemSchema);
