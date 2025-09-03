import express from "express";
import { Register } from "../controllers/auth.controller.js";

const router = express.Router();
router.post("/user/register", Register);

export default router;
