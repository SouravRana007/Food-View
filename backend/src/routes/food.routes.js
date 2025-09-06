import { Router } from "express";
import { createFood } from "../controllers/food.controller.js";
import { authFoodPartnerMiddleware } from "../middlewares/auth.middleware.js";
import multer, { memoryStorage } from "multer";

const upload = multer({
  storage: memoryStorage(),
});

const router = Router();
// Post /api/food/  protected[] only foodpartner can add food items
router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);

export default router;
