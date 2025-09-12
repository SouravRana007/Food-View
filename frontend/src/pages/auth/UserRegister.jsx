import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    // handle registration logic here
    await axios.post("http://localhost:3000/api/auth/user/register", formData, {
      withCredentials: true,
    });
    navigate("/");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-2">User Register</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-4">
          Create your account to get started
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

        {/* Registration Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={(e) =>
              setFormData({ ...formData, fullName: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
          >
            Create Account
          </button>
        </form>

        {/* Already Have Account Link */}
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/user/login" className="text-blue-500 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
