"use client";

import { Box, Stack, useTheme } from "@mui/material";
import TopNav from "./_components/top-nav";
import { HEIGHT_HEADER_ADMIN } from "@/constants";
import { Container } from "@mui/material"

const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  return (
    <Stack>
      <TopNav />


      <Box
        component='main'
        sx={{
          width: {
            sm: `100%`,
          },
          height: "100vh",
          mt: `${HEIGHT_HEADER_ADMIN}px`,
          transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          backgroundColor: "background.default",
          overflow: "auto",
          px: { xs: 2, md: 8 },
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            px: { xs: 2, md: 4 }, // Padding ngang responsive

          }}
        >
          {children}
        </Container>
      </Box>

    </Stack>
  );
};

export default Layout;
