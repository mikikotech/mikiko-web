import { Box, styled } from "@mui/material";
import React from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  height: "200px",
  width: "200px",
  backgroundColor: theme.status.danger,
}));

export default StyledBox;
