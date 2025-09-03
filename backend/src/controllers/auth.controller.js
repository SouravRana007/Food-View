import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      fullName,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign(
      {
        id: user._id,
      },
      "317f41167f3f65451dd5d4ed73273c0f"
    );
    res.cookie("token", token);
    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};
