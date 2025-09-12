import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FoodPartnerLogin() {
  const navigate = useNavigate();
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:3000/api/auth/food-partner/login",
      { email, password },
      { withCredentials: true }
    );
    navigate("/create-food");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-2">
          Food Partner Login
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6">
          Manage your business with ease
        </p>
        {/* Switch Links */}
        <div className="flex justify-center items-center mb-6 text-sm">
          <span className="text-gray-500 dark:text-gray-400 mr-2">Switch:</span>
          <Link
            to="/user/register"
            className="text-blue-500 hover:underline mr-2 font-medium"
          >
            User
          </Link>
          <span className="text-gray-400">·</span>
          <Link
            to="/food-partner/register"
            className="text-blue-500 hover:underline ml-2 font-medium"
          >
            Food Partner
          </Link>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Business Email"
            valuye={email}
            onChange={(e) => SetEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          New partner?{" "}
          <Link
            to="/food-partner/register"
            className="text-blue-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
