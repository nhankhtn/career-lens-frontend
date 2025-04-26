"use client";

import { Box, Stack, useTheme } from "@mui/material";
import TopNav from "./_components/top-nav";
import { HEIGHT_HEADER_ADMIN } from "@/constants";
import { Container } from "@mui/material";
import { useAuth } from "@/contexts/auth/firebase-context";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDialog } from "@/hooks/use-dialog";
import RequiredOnboardingDialog from "./_components/required-onboarding-dialog";
import { UserProvider } from "@/contexts/user/user-context";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const dialogRequireOnboarding = useDialog();

  // useEffect(() => {
  //   if (user?.email && !user.onboarding_completed) {
  //     dialogRequireOnboarding.handleOpen();
  //   }
  // }, [user]);
  return (
    <UserProvider>
      <Stack>
        <TopNav />

        <Box
          component="main"
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
      <RequiredOnboardingDialog
        open={dialogRequireOnboarding.open}
        onClose={dialogRequireOnboarding.handleClose}
      />
    </UserProvider>
  );
};

export default Layout;
