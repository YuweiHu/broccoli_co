"use client";
import { createTheme } from "@mui/material/styles";
import { Fira_Code } from "next/font/google";

const firaCode = Fira_Code({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const theme = createTheme({
  typography: {
    fontFamily: firaCode.style.fontFamily,
    h3: {
      fontFamily: firaCode.style.fontFamily,
    },
    h6: {
      fontFamily: firaCode.style.fontFamily,
    },
    subtitle1: {
      fontFamily: firaCode.style.fontFamily,
    },
    body1: {
      fontFamily: firaCode.style.fontFamily,
    },
    body2: {
      fontFamily: firaCode.style.fontFamily,
    },
    button: {
      fontFamily: firaCode.style.fontFamily,
    },
  },
  palette: {
    mode: "light",
    primary: {
      main: "#000000",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
  },
});

export default theme;
