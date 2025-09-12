import axios from "axios";
import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function FoodPartnerRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    contactName: "",
    phone: "",
    email: "",
    password: "",
    address: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(
      "http://localhost:3000/api/auth/food-partner/register",
      formData,
      {
        withCredentials: true,
      }
    );
    navigate("/create-food");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-xl">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-2">Partner sign up</h2>
        <p className="text-center text-gray-400 mb-6">
          Grow your business with our platform.
        </p>

        {/* Switch Links */}
        <div className="text-center mb-6 text-sm">
          Switch:{" "}
          <Link to="/user/register" className="text-blue-400 hover:underline">
            User
          </Link>{" "}
          ·{" "}
          <Link
            to="/food-partner/register"
            className="text-blue-400 hover:underline"
          >
            Food partner
          </Link>
        </div>

        {/* Form Fields */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Business Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Contact Name"
            value={formData.conatactName}
            onChange={(e) =>
              setFormData({ ...formData, contactName: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Create password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-400">
            Full address helps customers find you faster.
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
          >
            Create Partner Account
          </button>
        </form>

        {/* Sign in Link */}
        <p className="mt-6 text-center text-sm text-gray-400">
          Already a partner?{" "}
          <Link
            to="/food-partner/login"
            className="text-blue-400 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
