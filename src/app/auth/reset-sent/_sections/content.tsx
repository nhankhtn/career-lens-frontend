'use client';

import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

const AuthResetSentContent = () => {
  return (
    <Box display="flex" minHeight="100vh">
      {/* Bên trái - Thông báo đã gửi email */}
      <Box
        flex={1}
        px={6}
        py={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        bgcolor="white"
        textAlign="center"
      >
        <Image src="/logo.png" alt="CareerLens Logo" width={140} height={40} />

        <Typography variant="h5" fontWeight="bold" mt={4}>
          Liên kết đặt lại mật khẩu đã được gửi
        </Typography>

        <Typography variant="body2" mt={2} color="text.secondary">
          Vui lòng kiểm tra email của bạn để đặt lại mật khẩu. Nếu không thấy, hãy kiểm tra thư mục spam.
        </Typography>

        <Button
          component={Link}
          href="/auth/login"
          variant="contained"
          sx={{
            mt: 4,
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
          Quay lại trang đăng nhập
        </Button>
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
          Kiểm tra hộp thư của bạn
        </Typography>
        <Typography variant="body2" mb={3} color="text.secondary">
          Chúng tôi vừa gửi liên kết để bạn tạo mật khẩu mới 📩
        </Typography>
        <Image
          src="/email-sent-illustration.png"
          alt="Email Sent Illustration"
          width={300}
          height={300}
        />
      </Box>
    </Box>
  );
};

export default AuthResetSentContent;
