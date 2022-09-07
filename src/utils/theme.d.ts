import {
  Palette,
  PaletteOptions,
} from "./../../node_modules/@mui/material/styles/createPalette.d";
import {
  ThemeOptions,
  PaletteColor,
  PaletteColorOptions,
} from "@mui/material/styles";
import React from "react";

declare module "@mui/material/styles" {
  interface Theme {
    status: {
      danger: string;
    };
  }

  interface ThemeOptions {
    status: {
      danger: React.CSSProperties["color"];
    };
  }

  interface Palette {
    neutral?: PaletteColor;
  }

  interface PaletteOptions {
    neutral?: PaletteColorOptions;
  }
}
