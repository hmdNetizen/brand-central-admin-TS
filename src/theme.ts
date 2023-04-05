import React from "react";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";

const dark = "#171717";
const red = "#FF385C";
const green = "#28C52B";
const blue = "#22358e";
const lightBlue = "#6a77b3";
const yellow = "#F8920F";
const grey = "#5c5c5c";
const darkerGrey = "#262626";
const lighterGrey = "#0404061A";
const lightGrey = "#d8d8d8";
const lightGreen = "#e8f9f1";
const lightRed = "#FEF8F7";
const orange = "#ff5c56";

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    btn: true;
  }
}

declare module "@mui/material/styles" {
  interface CommonColors {
    dark: string;
    red: string;
    green: string;
    blue: string;
    lightBlue: string;
    yellow: string;
    grey: string;
    darkerGrey: string;
    lighterGrey: string;
    lightGrey: string;
    lightGreen: string;
    lightRed: string;
    orange: string;
  }
}

interface ExtendedTypographyOptions extends TypographyOptions {
  btn: React.CSSProperties;
}

export const theme = createTheme({
  palette: {
    common: {
      dark,
      grey,
      yellow,
      lightBlue,
      darkerGrey,
      lightGrey,
      lighterGrey,
      lightGreen,
      lightRed,
      orange,
    },
    primary: {
      main: dark,
    },
    secondary: {
      main: blue,
    },
    error: {
      main: red,
    },
    success: {
      main: green,
    },
    info: {
      main: orange,
    },
    warning: {
      main: yellow,
    },
  },
  typography: {
    fontFamily: ["Open Sans", "Roboto", "Nunito", "sans-serif"].join(", "),
    fontSize: 10,
    htmlFontSize: 10,
    h1: {
      fontSize: "3.5rem",
      color: dark,
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.5rem",
      color: dark,
      fontWeight: 600,
    },
    h3: {
      fontSize: "2.25rem",
      fontWeight: 500,
    },
    h4: {
      fontSize: "1.85rem",
      fontWeight: 500,
    },
    h5: {
      fontSize: "1.5rem",
      fontWeight: 500,
    },

    body1: {
      fontSize: "1.6rem",
      fontWeight: 500,
      lineHeight: 1.7,
      color: dark,
    },
    body2: {
      fontSize: "1.4rem",
      fontWeight: 500,
      lineHeight: 1.85,
    },
    btn: {
      textTransform: "none",
      borderRadius: 10,
    },

    input: {
      width: "100%",
      border: "1px solid",
      borderRadius: ".5rem",
      padding: "1rem",
      fontSize: "1.6rem",
      color: dark,
      fontWeight: 600,

      "&:focus": {
        outline: "none",
      },

      "&::placeholder": {
        color: grey,
        fontWeight: 500,
      },
    },
  } as ExtendedTypographyOptions,
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1200,
      xl: 1536,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "-1px 0px 10px -2px rgba(0,0,0,0.15)",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: false,
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          top: "-.9rem",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        barColorPrimary: {
          backgroundColor: blue,
        },
      },
    },

    MuiTablePagination: {
      styleOverrides: {
        menuItem: {
          fontSize: ".85rem",
        },
      },
    },
  },
} as ThemeOptions);
