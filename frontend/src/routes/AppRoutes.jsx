import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import FoodPartnerRegister from "../pages/auth/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/auth/FoodPartnerLogin";
import Home from "../pages/general/Home";
import CreateFood from "../foodPartner/CreateFood";
import FoodPartnerProfile from "../foodPartner/FoodPartnerProfile";
import Saved from "../pages/general/Saved";
const AppRoutes = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/user/login" element={<UserLogin />} />
          <Route
            path="/food-partner/register"
            element={<FoodPartnerRegister />}
          />
          <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-food" element={<CreateFood />} />
          <Route path="/food-partner/:id" element={<FoodPartnerProfile />} />
          <Route path="/saved" element={<Saved />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRoutes;
