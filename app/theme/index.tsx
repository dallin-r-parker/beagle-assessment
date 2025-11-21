
"use client";

import { CssBaseline } from "@mui/material";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";

// bring in Inter font
export const inter = Inter({
  weight: ["200", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const beagleTheme = createTheme({
  typography: {
    allVariants: {
      color: "#211F33",
    },
    fontFamily: inter.style.fontFamily,
  },
  cssVariables: true,
});

export function StyledRoot({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={beagleTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
