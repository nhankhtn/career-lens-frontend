"use client";

import {
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useRouter } from "next/navigation";
import { paths } from "@/paths"; // Đảm bảo file paths.ts có key learningPath.detail
import useCareerDetailSearch from "./use-career-detail-search";
import CareerDetailInfo from "./career-detail-info";
import LoadingState from "@/components/loading-state";
import CustomBreadcrumbs from "@/components/custom-breadcrumbs";

const CareerDetailContent = () => {
  const router = useRouter();
  const { getCareersByIdApi, career } = useCareerDetailSearch();

  const handleGotoPath = (id: string) => {};

  if (getCareersByIdApi.loading) {
    return <LoadingState />;
  }
  if (!career) {
    return (
      <Typography color="text.secondary">Không tìm thấy thông tin</Typography>
    );
  }

  return (
    <Stack px={4} py={6} gap={3}>
      <CustomBreadcrumbs
        data={[
          {
            label: "Phân tích nghề",
            link: paths.career.index,
          },
          {
            label: career.name,
          },
        ]}
      />
      <Stack spacing={4}>
        <CareerDetailInfo career={career} />

        <Typography fontWeight="bold">Lộ trình học tập</Typography>
        <Stack spacing={2}>
          {career.topics.map((topic) => (
            <Box
              key={topic.id}
              onClick={() => handleGotoPath(topic.id)}
              sx={{
                border: "1px solid #E0E7FF",
                borderRadius: 2,
                p: 2,
                cursor: "pointer",
                backgroundColor: "white",
                "&:hover": {
                  borderColor: "#6366F1",
                  backgroundColor: "#F9FAFF",
                },
              }}
            >
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
              >
                <Box>
                  <Typography fontWeight="bold">{topic.title}</Typography>
                  <ul style={{ margin: 0, paddingLeft: 16 }}>
                    {/* {topic.items.map((item, index) => (
                      <li key={index}>
                        <Typography variant="body2">{item}</Typography>
                      </li>
                    ))} */}
                  </ul>
                </Box>
                <Chip
                  label={1}
                  size="small"
                  sx={{ bgcolor: "#F5F3FF", color: "#7C3AED", fontWeight: 500 }}
                />
              </Stack>
            </Box>
          ))}
        </Stack>

        <Typography fontWeight="bold">Cơ hội nghề nghiệp:</Typography>
        <Grid container spacing={2}>
          {[
            {
              company: "Viettel",
              title: "Chuyên viên phân tích dữ liệu (Data Analyst)",
              salary: "15 - 18 triệu",
            },
            {
              company: "VNG",
              title: "Chuyên viên phân tích dữ liệu (Data Analyst)",
              salary: "17 - 20 triệu",
            },
          ].map((job, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                border="1px solid #E0E7FF"
                borderRadius={2}
                p={2}
                bgcolor="white"
                sx={{
                  transition: "0.2s",
                  "&:hover": { borderColor: "#6366F1" },
                }}
              >
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight="bold">{job.company}</Typography>
                  <Chip
                    label="Fulltime"
                    size="small"
                    sx={{ bgcolor: "#F3E8FF", color: "#9333EA" }}
                  />
                </Stack>
                <Typography variant="body2" mt={1} mb={1}>
                  {job.title}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Mức lương: {job.salary}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Stack direction="row" justifyContent="space-between" mt={4}>
          <Button
            startIcon={<FavoriteBorderIcon />}
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: "#6366F1",
              color: "#6366F1",
              "&:hover": { borderColor: "#4F46E5", backgroundColor: "#EEF2FF" },
            }}
          >
            Thêm vào yêu thích
          </Button>

          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#6366F1",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#4F46E5" },
            }}
          >
            Bắt đầu học
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CareerDetailContent;
