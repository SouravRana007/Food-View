import { Router } from "express";
import {
  createFood,
  getFoodItem,
  likeFoodItem,
} from "../controllers/food.controller.js";
import {
  authFoodPartnerMiddleware,
  authUserMiddleware,
} from "../middlewares/auth.middleware.js";
import multer, { memoryStorage } from "multer";

const upload = multer({
  storage: memoryStorage(),
});

const router = Router();
// Post /api/food/  protected[] only foodpartner can add food items
router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);
router.get("/", authUserMiddleware, getFoodItem);
router.get("/food-partner/:id", authUserMiddleware);

router.post("/like", authUserMiddleware, likeFoodItem);
router.post("/save", authUserMiddleware saveFoodItem)

export default router;
