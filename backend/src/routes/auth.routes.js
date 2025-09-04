import express from "express";
import { Login, Logout, Register } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/user/register", Register);
router.post("/user/login", Login);
router.post("/user/logout", Logout);

export default router;
