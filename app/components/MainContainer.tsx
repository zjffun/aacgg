"use client";

import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainNavigation from "./MainNavigation";
import { ToastComp } from "./Toast";

const theme = createTheme({
  typography: {
    subtitle1: {
      fontWeight: "500",
      fontSize: "1rem",
      lineHeight: 1.25,
    },
    subtitle2: {
      fontWeight: "400",
      fontSize: "1rem",
      ineHeight: 1.25,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ padding: 0 }}>
        <Box sx={{ pb: 7 }}>
          {children}
          <MainNavigation></MainNavigation>
        </Box>
      </Container>
      <ToastComp></ToastComp>
    </ThemeProvider>
  );
}
