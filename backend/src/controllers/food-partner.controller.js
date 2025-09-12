import { foodPartnerModel } from "../models/foodpartner.model.js";
import { foodItemModel } from "../models/food.model.js";
export const getFoodPartnerById = async (req, res) => {
  const foodPartnerId = req.params.id;
  try {
    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodItemModel.find({
      foodPartner: foodPartnerId,
    });

    if (!foodPartner) {
      return res.status(404).json({ message: "Food Partner Not Found" });
    }
    return res.status(200).json({
      message: "Food Partner Found",
      foodPartner: {
        ...foodPartner.toObject(),
        foodItems: foodItemsByFoodPartner,
      },
    });
  } catch (error) {
    console.error("Error in getFoodPartnerById:", error);
    return res.status(500).json({ message: "Server Error", error });
  }
};
