import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/food-view");
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // stop the app if DB connection fails
  }
};

export default connectDB;
