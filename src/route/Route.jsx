import { Container, Typography, useTheme } from "@mui/material";
import React from "react";
import Header from "../components/Header";
import StyledBox from "../components/StyledBox";
import MapPage from "./../pages/HomePage/MapPage";

const Route = () => {
  const theme = useTheme();
  return (
    <div>
      <Header />
      {/* <Container>
        <Typography variant="h1" color={theme.palette.neutral.main}>
          route page
        </Typography>
      </Container> */}
      <MapPage />
      {/* <StyledBox /> */}
    </div>
  );
};

export default Route;
