import React from "react";

export default function FoodPartnerProfile() {
  const business = {
    name: "Business Name",
    address: "123 Street, City",
    totalMeals: 43,
    customerServe: "15K",
    videos: Array(9).fill("video"), // dummy video data
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Profile Card */}
      <div className="bg-gray-900 rounded-xl shadow-md p-4 mb-6">
        <div className="flex items-center gap-4">
          {/* Business Logo */}
          <div className="w-20 h-20 bg-green-600 rounded-full"></div>

          {/* Business Info */}
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-bold">{business.name}</h2>
            <p className="text-gray-400">{business.address}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-around mt-4 border-t border-gray-700 pt-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Total Meals</p>
            <p className="text-lg font-bold">{business.totalMeals}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Customers Served</p>
            <p className="text-lg font-bold">{business.customerServe}</p>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-3 gap-2">
        {business.videos.map((video, idx) => (
          <div
            key={idx}
            className="bg-gray-800 text-white flex justify-center items-center h-28 rounded-md"
          >
            {video}
          </div>
        ))}
      </div>
    </div>
  );
}
