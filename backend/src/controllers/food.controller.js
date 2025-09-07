import { foodItemModel } from "../models/food.model.js";
import { uploadFile } from "../services/storage.service.js";
import { v4 as uuid } from "uuid";

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
