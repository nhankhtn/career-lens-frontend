"use client";

import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
  Link as MuiLink,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { paths } from "@/paths";
import { useAuth } from "@/contexts/auth/firebase-context";
import useFunction from "@/hooks/use-function";
import { useRouter } from "next/navigation";
import { User } from "@/types/user";

const AuthRegisterContent = () => {
  const { signInWithGoogle } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const signInWithGoogleHelper = useFunction(signInWithGoogle, {
    onSuccess: ({ result }: { result: User | null }) => {
      if (!result?.onboarding_completed) {
        router.push(paths.onboarding);
        return;
      }
      router.push(paths.dashboard);
    },
  });

  return (
    <Box display="flex" minHeight="100vh">
      {/* Bên trái - Form Đăng ký */}
      <Stack
        flex={1}
        px={6}
        py={8}
        alignItems="center"
        justifyContent="center"
        bgcolor="white"
        spacing={3}
      >
        <Image
          src="/images/logo.png"
          alt="Logo CareerLens"
          width={140}
          height={40}
        />

        <Box textAlign="center">
          <Typography variant="h5" fontWeight="bold">
            Tạo tài khoản mới
          </Typography>
          <Typography variant="body2" mt={1} color="text.secondary">
            Bằng cách đăng ký, bạn đồng ý với{" "}
            <MuiLink href="#" underline="hover">
              Điều khoản
            </MuiLink>{" "}
            và{" "}
            <MuiLink href="#" underline="hover">
              Chính sách quyền riêng tư
            </MuiLink>
            .
          </Typography>
        </Box>

        <Stack spacing={1.5} width="100%" maxWidth={320}>
          <Button
            variant="outlined"
            startIcon={
              <Image
                src="/icons/google-icon.svg"
                alt="Google"
                width={20}
                height={20}
              />
            }
            sx={{
              backgroundColor: "#FFECEC",
              color: "#c72b32",
              borderColor: "#f5c2c7",
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#fddede",
              },
            }}
            onClick={signInWithGoogleHelper.call}
          >
            Đăng ký bằng Google
          </Button>

          <Button
            variant="outlined"
            startIcon={
              <Image
                src="/icons/facebook-icon.svg"
                alt="Facebook"
                width={20}
                height={20}
              />
            }
            sx={{
              backgroundColor: "#EEF2FF",
              color: "#3b5998",
              borderColor: "#c7d2fe",
              textTransform: "none",
              borderRadius: "12px",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#e0e7ff",
              },
            }}
          >
            Đăng ký bằng Facebook
          </Button>
        </Stack>

        <Box width="100%" maxWidth={320}>
          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" color="text.secondary">
              HOẶC ĐĂNG KÝ BẰNG EMAIL
            </Typography>
          </Divider>
        </Box>

        <Stack spacing={2} width="100%" maxWidth={320}>
          {[
            {
              label: "Tên người dùng",
              placeholder: "Nhập tên người dùng",
              type: "text",
            },
            {
              label: "Email",
              placeholder: "example.email@gmail.com",
              type: "email",
            },
          ].map(({ label, placeholder, type }) => (
            <TextField
              key={label}
              label={label}
              placeholder={placeholder}
              type={type}
              fullWidth
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  backgroundColor: "#F9FAFB",
                  "&.Mui-focused fieldset": {
                    borderColor: "#6366F1",
                    boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.2)",
                  },
                },
              }}
            />
          ))}

          {/* Mật khẩu */}
          <TextField
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            placeholder="Ít nhất 8 ký tự"
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#F9FAFB",
                "&.Mui-focused fieldset": {
                  borderColor: "#6366F1",
                  boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.2)",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Xác nhận mật khẩu */}
          <TextField
            label="Xác nhận mật khẩu"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Nhập lại mật khẩu"
            fullWidth
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#F9FAFB",
                "&.Mui-focused fieldset": {
                  borderColor: "#6366F1",
                  boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.2)",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
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
            Đăng ký
          </Button>
        </Stack>

        <Typography variant="body2" mt={3}>
          Đã có tài khoản?{" "}
          <MuiLink component={Link} href={paths.auth.login} underline="hover">
            Đăng nhập
          </MuiLink>
        </Typography>
      </Stack>

      {/* Bên phải - Minh họa */}
      <Stack
        flex={1}
        bgcolor="#F9FAFB"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <Typography variant="h5" fontWeight="bold">
          Chào mừng đến với CareerLens
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hãy bắt đầu hành trình nghề nghiệp của bạn 👋🏼
        </Typography>
        <Image
          src="/images/welcome-illustration.png"
          alt="Minh họa đăng ký"
          width={300}
          height={300}
          suppressHydrationWarning
        />
      </Stack>
    </Box>
  );
};

export default AuthRegisterContent;
