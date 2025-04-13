'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const AuthLoginContent = () => {
  return (
    <Box display="flex" minHeight="100vh">
      {/* Bên trái - Form đăng nhập */}
      <Box
        flex={1}
        px={6}
        py={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgcolor="white"
      >
        <Image src="/logo.png" alt="Logo CareerLens" width={140} height={40} />

        <Typography variant="h5" fontWeight="bold" mt={4}>
          Chào mừng bạn quay lại
        </Typography>

        <Typography variant="body2" mt={1} color="text.secondary" textAlign="center">
          Vui lòng nhập thông tin để đăng nhập vào tài khoản của bạn.
        </Typography>

        {/* Form */}
        <Box mt={5} width="100%" maxWidth={320}>
          <Typography variant="body2" fontWeight="bold" mb={1}>
            Email
          </Typography>
          <TextField
            type="email"
            placeholder="example.email@gmail.com"
            fullWidth
            variant="outlined"
            sx={{ borderRadius: '12px' }}
          />

          <Typography variant="body2" fontWeight="bold" mt={3} mb={1}>
            Mật khẩu
          </Typography>
          <TextField
            type="password"
            placeholder="Nhập mật khẩu của bạn"
            fullWidth
            variant="outlined"
            sx={{ borderRadius: '12px' }}
          />

          <Box textAlign="right" mt={1}>
            <MuiLink component={Link} href="/auth/forgot-password" underline="hover" color="primary">
              Quên mật khẩu?
            </MuiLink>
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 600,
              backgroundColor: '#6366F1',
              '&:hover': {
                backgroundColor: '#4F46E5',
              },
            }}
          >
            Đăng nhập
          </Button>
        </Box>

        {/* Chuyển sang đăng ký */}
        <Typography variant="body2" mt={3}>
          Chưa có tài khoản?{' '}
          <MuiLink component={Link} href="/auth/register" underline="hover" color="primary">
            Đăng ký ngay
          </MuiLink>
        </Typography>
      </Box>

      {/* Bên phải - Hình minh hoạ */}
      <Box
        flex={1}
        bgcolor="#F9FAFB"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        textAlign="center"
      >
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Rất vui được gặp lại bạn!
        </Typography>
        <Typography variant="body2" mb={3} color="text.secondary">
          Chúng tôi luôn sẵn sàng đồng hành cùng bạn 👋🏼
        </Typography>
        <img
          src="/login-illustration.png"
          alt="Minh hoạ đăng nhập"
          width={300}
          height={300}
        />
      </Box>
    </Box>
  );
};

export default AuthLoginContent;
