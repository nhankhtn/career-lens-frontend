"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  Stack,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { paths } from "@/paths";

const AuthForgotPasswordContent = () => {
  return (
    <Box display='flex' minHeight='100vh'>
      {/* Bên trái: Form */}
      <Stack
        flex={1}
        px={6}
        py={8}
        alignItems='center'
        justifyContent='center'
        bgcolor='white'
      >
        <Image
          src='/images/logo.png'
          alt='CareerLens Logo'
          width={140}
          height={40}
        />

        <Typography variant='h5' fontWeight='bold' mt={4}>
          Quên mật khẩu?
        </Typography>

        <Typography
          variant='body2'
          mt={1}
          color='text.secondary'
          textAlign='center'
        >
          Vui lòng nhập email để nhận liên kết khôi phục mật khẩu
        </Typography>

        <Box mt={5} width='100%' maxWidth={320}>
          <Typography variant='body2' fontWeight='bold' mb={1}>
            Địa chỉ email
          </Typography>
          <TextField
            type='email'
            placeholder='example.email@gmail.com'
            fullWidth
            variant='outlined'
            sx={{ borderRadius: "12px" }}
          />

          <Button
            variant='contained'
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#6366F1",
              "&:hover": {
                backgroundColor: "#4F46E5",
              },
            }}
          >
            Gửi liên kết đặt lại mật khẩu
          </Button>
        </Box>

        <Typography variant='body2' mt={3}>
          Nhớ lại mật khẩu rồi?{" "}
          <MuiLink
            component={Link}
            href={paths.auth.login}
            underline='hover'
            color='primary'
          >
            Đăng nhập
          </MuiLink>
        </Typography>
      </Stack>

      {/* Bên phải: Hình minh hoạ */}
      <Box
        flex={1}
        bgcolor='#F9FAFB'
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
        textAlign='center'
      >
        <Typography variant='h5' fontWeight='bold' mb={1}>
          Khôi phục tài khoản
        </Typography>
        <Typography variant='body2' mb={3} color='text.secondary'>
          Chúng tôi vừa gửi một liên kết để bạn đặt lại mật khẩu 👀
        </Typography>
        <img
          src='/images/login-illustration.png'
          alt='Hình minh hoạ đặt lại mật khẩu'
          width={300}
          height={300}
        />
      </Box>
    </Box>
  );
};

export default AuthForgotPasswordContent;
