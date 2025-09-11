import { foodItemModel } from "../models/food.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuid } from "uuid";
import { likeModel } from "../models/likes.model.js";
import { saveModel } from "../models/save.model.js";
export const createFood = async (req, res) => {
  try {
    // Upload file to ImageKit
    const fileUploadResult = await uploadFile(req.file.buffer, uuid());

    const { name, description } = req.body;

    const foodItem = await foodItemModel.create({
      name,
      description,
      video: fileUploadResult.url,
      foodPartner: req.foodPartner._id,
    });

    return res.status(201).json({
      message: "Food item created successfully",
      food: foodItem,
    });
  } catch (error) {
    console.error("Error creating food item:", error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

export const getFoodItem = async (req, res) => {
  try {
    const foodItems = await foodItemModel.find({});
    res.status(200).json({
      message: "Food Items fetched successfully",
      foodItems,
    });
  } catch (error) {
    console.error("Error fetching food items:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch food items",
      error: error.message,
    });
  }
};

export const likeFoodItem = async (req, res) => {
  const { foodId } = req.body;
  const { user } = req.user._id;
  const isFoodLiked = await likeModel.findOne({ user: user._id, food: foodId });
  if (isFoodLiked) {
    await likeFoodItem.deleteOne({ user: user._id, food: foodId });
    await foodItemModel.findByIdAndUpdate(foodId, { $inc: { likeCount: -1 } });
    return res.status(200).json({
      message: "Food item unliked",
    });
  }
  const like = await likeModel.create({ user: user._id, food: foodId });
  await foodItemModel.findByIdAndUpdate(foodId, { $inc: { likeCount: 1 } });
  return res.status(201).json({
    message: "Food item liked",
    like,
  });
};

export const saveFoodItem = async (req, res) => {
  const { foodId } = req.body;
  const { user } = req.user._id;
  const isFoodSaved = await saveModel.findOne({ user: user._id, food: foodId });
  if (isFoodSaved) {
    await saveModel.deleteOne({ user: user._id, food: foodId });
    return res.status(200).json({
      message: "Food item unsaved",
    });
  }
  const save = await saveModel.create({ user: user._id, food: foodId });
  return res.status(201).json({
    message: "Food item saved",
    save,
  });
};
