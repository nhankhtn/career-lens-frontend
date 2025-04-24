"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack,
  useTheme,
  alpha,
  Grid,
  Divider,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import { keyframes } from "@mui/system";
import { getNavConfig } from "./(user)/_components/get-nav-config";
import { paths } from "@/paths";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export default function NotFound() {
  const router = useRouter();
  const theme = useTheme();
  const [countdown, setCountdown] = useState(10);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (countdown <= 0) {
      setIsRedirecting(true);
      router.push(paths.dashboard);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, router]);

  const popularPages = useMemo(getNavConfig, []);

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 0,
            opacity: 0.03,
            backgroundImage: `repeating-linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.main} 10px, transparent 10px, transparent 20px)`,
          }}
        />

        <Grid container spacing={4} position="relative" zIndex={1}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h1"
              fontWeight="bold"
              color="primary"
              sx={{ fontSize: { xs: "4rem", md: "6rem" }, lineHeight: 1.1 }}
            >
              404
            </Typography>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Trang không tìm thấy
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di
              chuyển. Vui lòng kiểm tra lại URL hoặc quay lại trang chủ.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ mt: 3, mb: 4 }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                onClick={router.back}
                size="large"
                fullWidth={false}
              >
                Quay lại
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<HomeIcon />}
                onClick={() => router.push(paths.dashboard)}
                size="large"
                fullWidth={false}
              >
                Về trang chủ
              </Button>
            </Stack>

            {/* Countdown */}
            <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
              <CircularProgress
                variant="determinate"
                value={(countdown / 10) * 100}
                size={36}
                thickness={4}
                color="primary"
              />
              <Typography variant="body2" color="text.secondary">
                {isRedirecting
                  ? "Đang chuyển hướng về trang chủ..."
                  : `Tự động chuyển hướng sau ${countdown} giây`}
              </Typography>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: { xs: 200, md: 300 },
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {/* Animated illustration */}
              <Box
                sx={{
                  animation: `${float} 3s infinite ease-in-out`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <SentimentDissatisfiedIcon
                  sx={{
                    fontSize: { xs: 100, md: 160 },
                    color: alpha(theme.palette.primary.main, 0.7),
                    mb: 2,
                  }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    animation: `${pulse} 2s infinite ease-in-out`,
                    color: alpha(theme.palette.primary.main, 0.9),
                  }}
                >
                  Không tìm thấy trang
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
              Các trang phổ biến:
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              sx={{
                "& > *": {
                  mb: 1,
                },
              }}
            >
              {popularPages.map((page, index) => (
                <Button
                  key={index}
                  variant="outlined"
                  size="small"
                  onClick={() => router.push(page.href)}
                  sx={{
                    borderRadius: 2,
                    borderColor: alpha(theme.palette.primary.main, 0.3),
                    "&:hover": {
                      borderColor: theme.palette.primary.main,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                    },
                  }}
                >
                  {page.title}
                </Button>
              ))}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Paper
              variant="outlined"
              sx={{
                p: 3,
                mt: 2,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.info.main, 0.05),
                borderColor: alpha(theme.palette.info.main, 0.2),
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <SearchIcon color="info" />
                <Box>
                  <Typography variant="subtitle2">
                    Không tìm thấy điều bạn cần?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Thử tìm kiếm hoặc duyệt qua các danh mục trên trang chủ để
                    tìm nội dung bạn quan tâm.
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
