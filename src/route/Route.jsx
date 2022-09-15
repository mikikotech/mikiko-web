import React from "react";
import { BrowserRouter, Routes, Route as Router } from "react-router-dom";
import Header from "../components/Header";
import DetailPage from "../pages/HomePage/DetailPage";
import ErrorPage from "../pages/HomePage/ErrorPage";
import MainPage from "../pages/HomePage/MainPage";

const Route = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Router path="/" element={<MainPage />} />
        <Router path="/detail/:devId" element={<DetailPage />} />
        <Router path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Route;
