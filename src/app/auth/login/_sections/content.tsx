"use client";

import { useAuth } from "@/contexts/auth/firebase-context";
import { Button, Stack } from "@mui/material";

const AuthLoginContent = () => {
  const { signInWithGoogle } = useAuth();

  const handleClick = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <Stack m={5}>
      <Button onClick={handleClick}>Login</Button>
    </Stack>
  );
};

export default AuthLoginContent;
