import { Router } from "express";
import { authUserMiddleware } from "../middlewares/auth.middleware.js";
import { getFoodPartnerById } from "../controllers/food-partner.controller.js";

const router = Router();

router.get("/:id", authUserMiddleware, getFoodPartnerById);

export default router;
