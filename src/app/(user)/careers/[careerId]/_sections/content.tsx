'use client';

import { Box, Button, Chip, Divider, Grid, Stack, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths'; // Đảm bảo file paths.ts có key learningPath.detail

const CareerDetailContent = () => {
  const router = useRouter();

  const handleGotoPath = (id: string) => {
    
    
  };

  const stages = [
    {
      id: 'stage-1',
      title: 'Giai đoạn 1: Cơ bản',
      time: '1 tháng',
      items: [
        'Học Excel nâng cao và Google Sheets',
        'Học cú pháp SQL cơ bản với SELECT, WHERE, JOIN',
        'Thực hành phân tích dữ liệu với file CSV đơn giản',
      ],
    },
    {
      id: 'stage-2',
      title: 'Giai đoạn 2: Trung cấp',
      time: '1 tháng',
      items: [
        'Học Power BI hoặc Tableau để tạo dashboard',
        'Học Python + Pandas để xử lý dữ liệu lớn',
        'Thực hành với dataset Kaggle.',
      ],
    },
    {
      id: 'stage-3',
      title: 'Giai đoạn 3: Làm thực tế',
      time: '1 tháng',
      items: [
        'Xây báo cáo phân tích chi phí cho doanh nghiệp giả định.',
        'Trình bày kết quả cho người không chuyên IT.',
        'Chuẩn bị portfolio phân tích dữ liệu cá nhân.',
      ],
    },
  ];

  return (
    <Stack spacing={4} px={4} py={6}>
      <Typography variant="h5" fontWeight="bold">
        Chuyên viên phân tích dữ liệu (Data Analyst)
      </Typography>

      <Typography color="text.secondary">
        Thu thập, xử lý và phân tích dữ liệu từ nhiều nguồn khác nhau. Tạo báo cáo định kỳ bằng Excel, Power BI, hoặc Google Data Studio. Làm việc cùng các phòng ban để hiểu nhu cầu dữ liệu và đề xuất giải pháp. Tối ưu quy trình phân tích và trình bày dữ liệu trực quan.
      </Typography>

      <Divider />

      <Typography fontWeight="bold">Kỹ năng cần có:</Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {['Excel', 'SQL', 'Python', 'PowerBI', 'Tableau', 'Phân tích dữ liệu'].map((skill) => (
          <Chip key={skill} label={skill} sx={{ bgcolor: '#EEF2FF', color: '#4F46E5', fontWeight: 500 }} />
        ))}
      </Stack>

      <Typography fontWeight="bold">Lộ trình học tập</Typography>
      <Stack spacing={2}>
        {stages.map((stage) => (
          <Box
            key={stage.id}
            onClick={() => handleGotoPath(stage.id)}
            sx={{
              border: '1px solid #E0E7FF',
              borderRadius: 2,
              p: 2,
              cursor: 'pointer',
              backgroundColor: 'white',
              '&:hover': {
                borderColor: '#6366F1',
                backgroundColor: '#F9FAFF',
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Box>
                <Typography fontWeight="bold">{stage.title}</Typography>
                <ul style={{ margin: 0, paddingLeft: 16 }}>
                  {stage.items.map((item, index) => (
                    <li key={index}>
                      <Typography variant="body2">{item}</Typography>
                    </li>
                  ))}
                </ul>
              </Box>
              <Chip label={stage.time} size="small" sx={{ bgcolor: '#F5F3FF', color: '#7C3AED', fontWeight: 500 }} />
            </Stack>
          </Box>
        ))}
      </Stack>

      <Typography fontWeight="bold">Cơ hội nghề nghiệp:</Typography>
      <Grid container spacing={2}>
        {[
          {
            company: 'Viettel',
            title: 'Chuyên viên phân tích dữ liệu (Data Analyst)',
            salary: '15 - 18 triệu',
          },
          {
            company: 'VNG',
            title: 'Chuyên viên phân tích dữ liệu (Data Analyst)',
            salary: '17 - 20 triệu',
          },
        ].map((job, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Box
              border="1px solid #E0E7FF"
              borderRadius={2}
              p={2}
              bgcolor="white"
              sx={{ transition: '0.2s', '&:hover': { borderColor: '#6366F1' } }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Typography fontWeight="bold">{job.company}</Typography>
                <Chip label="Fulltime" size="small" sx={{ bgcolor: '#F3E8FF', color: '#9333EA' }} />
              </Stack>
              <Typography variant="body2" mt={1} mb={1}>{job.title}</Typography>
              <Typography variant="caption" color="text.secondary">Mức lương: {job.salary}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Stack direction="row" justifyContent="space-between" mt={4}>
        <Button
          startIcon={<FavoriteBorderIcon />}
          variant="outlined"
          sx={{
            textTransform: 'none',
            borderColor: '#6366F1',
            color: '#6366F1',
            '&:hover': { borderColor: '#4F46E5', backgroundColor: '#EEF2FF' },
          }}
        >
          Thêm vào yêu thích
        </Button>

        <Button
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          sx={{
            backgroundColor: '#6366F1',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#4F46E5' },
          }}
        >
          Bắt đầu học
        </Button>
      </Stack>
    </Stack>
  );
};

export default CareerDetailContent;
