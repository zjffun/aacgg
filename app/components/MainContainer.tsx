"use client";

import { Box, Container } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MainNavigation from "./MainNavigation";
import { ToastComp } from "./Toast";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const hideNavigationPathname = ["/recommend"];

  const hideNavigation = hideNavigationPathname.includes(pathname);

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ padding: 0 }}>
        <Box sx={{ pb: hideNavigation ? 0 : 7 }}>
          {children}
          {!hideNavigation && <MainNavigation />}
        </Box>
      </Container>
      <ToastComp />
    </ThemeProvider>
  );
}
