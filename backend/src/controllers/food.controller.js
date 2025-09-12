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
  try {
    const { foodId } = req.body;
    const userId = req.user._id;

    const food = await foodItemModel.findById(foodId);
    if (!food) return res.status(404).json({ message: "Food not found" });

    const isFoodLiked = await likeModel.findOne({ user: userId, food: foodId });

    if (isFoodLiked) {
      await likeModel.deleteOne({ user: userId, food: foodId });
      food.likeCount = Math.max(0, (food.likeCount || 0) - 1);
      await food.save();
      return res.status(200).json({
        message: "Food item unliked",
        isLiked: false,
        likeCount: food.likeCount,
      });
    }

    await likeModel.create({ user: userId, food: foodId });
    food.likeCount = (food.likeCount || 0) + 1;
    await food.save();

    res.status(201).json({
      message: "Food item liked",
      isLiked: true,
      likeCount: food.likeCount,
    });
  } catch (error) {
    console.error("Error in likeFoodItem:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const saveFoodItem = async (req, res) => {
  try {
    const { foodId } = req.body;
    const userId = req.user._id;

    const food = await foodItemModel.findById(foodId);
    if (!food) return res.status(404).json({ message: "Food not found" });

    const existingSave = await saveModel.findOne({
      user: userId,
      food: foodId,
    });

    if (existingSave) {
      await saveModel.deleteOne({ user: userId, food: foodId });
      food.savesCount = Math.max(0, (food.savesCount || 0) - 1);
      await food.save();

      return res.status(200).json({
        message: "Food item unsaved",
        isSaved: false,
        savesCount: food.savesCount,
      });
    }

    await saveModel.create({ user: userId, food: foodId });
    food.savesCount = (food.savesCount || 0) + 1;
    await food.save();

    res.status(201).json({
      message: "Food item saved",
      isSaved: true,
      savesCount: food.savesCount,
    });
  } catch (error) {
    console.error("Error in saveFoodItem:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getSavedFoodItem = async (req, res) => {
  try {
    // Find all saved items for this user
    const savedItems = await saveModel
      .find({ user: req.user._id })
      .populate("food") // get full food data
      .sort({ createdAt: -1 });

    // Return data in same format frontend expects
    const foodItems = savedItems.map((item) => ({
      _id: item.food._id,
      video: item.food.video,
      description: item.food.description,
      likeCount: item.food.likeCount || 0,
      savesCount: item.food.savesCount || 0,
      commentsCount: item.food.commentsCount || 0,
      foodPartner: item.food.foodPartner,
    }));

    return res.status(200).json({ savedFood: foodItems }); // plural matches frontend
  } catch (error) {
    console.error("Error fetching saved food:", error);
    return res.status(500).json({ message: "Failed to fetch saved videos" });
  }
};
