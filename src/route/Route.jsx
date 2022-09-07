import { Container, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import Header from "../components/Header";
import MapPage from "./../pages/HomePage/MapPage";

const Route = () => {
  const theme = useTheme();

  return (
    <div>
      <Header />
      <MapPage />
    </div>
  );
};

export default Route;
