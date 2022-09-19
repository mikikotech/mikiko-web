import React from "react";
import { BrowserRouter, Routes, Route as Router } from "react-router-dom";
import Header from "../components/Header";
import LoginPage from "../pages/AuthPage/LoginPage";
import RegisterPage from "../pages/AuthPage/RegisterPage";

const AuthRoute = () => {
  return (
    <Routes>
      <Router path="/login" element={<LoginPage />} />
      <Router path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AuthRoute;
