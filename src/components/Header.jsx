import { AppBar, Toolbar, Typography, useTheme } from "@mui/material";
import React from "react";

const Header = () => {
  const theme = useTheme();
  return (
    <AppBar color={"primary"} style={{ height: "60px", padding: "0px" }}>
      <Toolbar>
        <Typography variant="h6">Mikiko</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
