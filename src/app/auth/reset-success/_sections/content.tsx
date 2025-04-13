"use client";

import {
  Box,
  Button,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ResetSuccessPage = () => {
  const router = useRouter();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      flexDirection="column"
      bgcolor="#F9FAFB"
    >
      <img
        src="/success-illustration.png"
        alt="Đặt lại mật khẩu thành công"
        width={280}
        height={280}
      />

      <Typography variant="h5" fontWeight="bold" mt={3} textAlign="center">
        Mật khẩu đã được đặt lại thành công
      </Typography>

      <Typography variant="body2" mt={1} mb={4} color="text.secondary" textAlign="center">
        Bạn có thể sử dụng mật khẩu mới để đăng nhập vào tài khoản của mình.
      </Typography>

      <Button
        variant="contained"
        sx={{
          px: 5,
          py: 1.5,
          borderRadius: "12px",
          textTransform: "none",
          fontWeight: 600,
          backgroundColor: "#6366F1",
          "&:hover": {
            backgroundColor: "#4F46E5",
          },
        }}
        onClick={() => router.push("/auth/login")}
      >
        Đăng nhập
      </Button>
    </Box>
  );
};

export default ResetSuccessPage;
