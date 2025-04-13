'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  Link as MuiLink,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const AuthResetPasswordContent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Box display="flex" minHeight="100vh">
      {/* Bên trái - Form Đặt lại mật khẩu */}
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

        <Typography variant="h5" fontWeight="bold" mt={4} textAlign="center">
          Tạo mật khẩu mới
        </Typography>

        <Typography variant="body2" mt={1} textAlign="center" color="text.secondary">
          Nhập mật khẩu mới cho tài khoản của bạn
        </Typography>

        <Box mt={5} width="100%" maxWidth={320}>
          <Typography variant="body2" fontWeight="bold" mb={1}>
            Mật khẩu mới
          </Typography>
          <TextField
            type={showPassword ? 'text' : 'password'}
            placeholder="Ít nhất 8 ký tự"
            fullWidth
            variant="outlined"
            sx={{ borderRadius: '12px', mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Typography variant="body2" fontWeight="bold" mb={1}>
            Xác nhận mật khẩu
          </Typography>
          <TextField
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Nhập lại mật khẩu"
            fullWidth
            variant="outlined"
            sx={{ borderRadius: '12px' }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

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
            Đặt lại mật khẩu
          </Button>
        </Box>

        <Typography variant="body2" mt={3}>
          Quay về{' '}
          <MuiLink component={Link} href="/auth/login" underline="hover">
            Đăng nhập
          </MuiLink>
        </Typography>
      </Box>

      {/* Bên phải - Minh họa */}
      <Box
        flex={1}
        bgcolor="#F9FAFB"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Bảo mật là ưu tiên hàng đầu
        </Typography>
        <Typography variant="body2" mb={3} color="text.secondary">
          Hãy chắc chắn rằng bạn chọn một mật khẩu mạnh và dễ nhớ 💡
        </Typography>
        <Image
          src="/login-illustration.png"
          alt="Reset Password Illustration"
          width={300}
          height={300}
          suppressHydrationWarning
        />
      </Box>
    </Box>
  );
};

export default AuthResetPasswordContent;
