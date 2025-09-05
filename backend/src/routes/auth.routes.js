import express from "express";
import {
  Login,
  loginFoodPartner,
  Logout,
  logoutFoodPartner,
  Register,
  registerFoodPartner,
} from "../controllers/auth.controller.js";

const router = express.Router();

// user auth routes
router.post("/user/register", Register);
router.post("/user/login", Login);
router.post("/user/logout", Logout);

//food auth  partners routes
router.post("/food-partner/register", registerFoodPartner);
router.post("/food-partner/login", loginFoodPartner);
router.post("/food-partner/logout", logoutFoodPartner);

export default router;
