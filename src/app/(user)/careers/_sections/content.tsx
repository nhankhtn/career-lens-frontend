'use client';

import {
  Box,
  Button,
  Chip,
  Fade,
  Grid,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { paths } from '@/paths'; // ✅ import paths

const CareerContent = () => {
  const router = useRouter();

  const allSkills = ['HTML', 'Python', 'C#', 'Figma', 'JavaScript', 'SQL'];
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['HTML', 'Python', 'C#', 'Figma']);
  const [loading, setLoading] = useState(false);
  const [showCareers, setShowCareers] = useState(false);

  const handleAddSkill = (e: any) => {
    const newSkill = e.target.value;
    if (newSkill && !selectedSkills.includes(newSkill)) {
      setSelectedSkills([...selectedSkills, newSkill]);
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSelectedSkills(selectedSkills.filter((skill) => skill !== skillToRemove));
  };

  const handleAnalyze = () => {
    setLoading(true);
    setShowCareers(false);
    setTimeout(() => {
      setLoading(false);
      setShowCareers(true);
    }, 1500);
  };

  const handleSeeDetail = (careerId: string) => {
    const path = paths.career.detail.replace(':careerId', careerId);
    router.push(path);
  };

  return (
    <Stack spacing={6} py={4}>
      <Typography
        variant={"h5"}
        component="h1"
        fontWeight="bold"
        sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" } }}
      >Phân tích nghề</Typography>

      <Paper
        sx={{
          borderRadius: 3,
          p: 4,
          backgroundColor: 'white',
          border: '1px solid #D6D9FF',
          boxShadow: 3,
          '&:hover': { boxShadow: 6, borderColor: '#6366F1' },
        }}
      >
        {/* Phần form */}
        <Typography variant="h6" fontWeight="bold" mb={3}>Thông tin cơ bản</Typography>
        <Stack direction="row" spacing={1} alignItems="center" mb={3}>
          <Typography fontWeight="bold">Tải lên CV</Typography>
          <Typography color="text.secondary">(tùy chọn)</Typography>
          <IconButton color="primary" size="small"><CloudUploadIcon /></IconButton>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="flex-start" mb={2}>
          <Stack spacing={1} flex={1}>
            <Typography fontWeight="bold">Kỹ năng hiện có</Typography>
            <Select
              displayEmpty
              value=""
              onChange={handleAddSkill}
              renderValue={() => 'Kỹ năng'}
              fullWidth
            >
              {allSkills.map((skill) => (
                <MenuItem key={skill} value={skill}>{skill}</MenuItem>
              ))}
            </Select>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {selectedSkills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  sx={{ backgroundColor: '#6366F1', color: 'white' }}
                />
              ))}
            </Stack>
          </Stack>

          <Stack spacing={1} flex={1}>
            <Typography variant="body2" color="text.secondary" mt={2}>
              <u>Ban chưa biết mình có kỹ năng gì ?</u>
            </Typography>
            <Button variant="outlined" fullWidth>
              ⮐ Làm bài trắc nghiệm tự đánh giá
            </Button>
          </Stack>
        </Stack>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={2}>
          <Stack spacing={2} flex={1}>
            <TextField select label="Kinh nghiệm làm việc" defaultValue="Sinh viên năm 3" fullWidth>
              <MenuItem value="Sinh viên năm 1">Sinh viên năm 1</MenuItem>
              <MenuItem value="Sinh viên năm 2">Sinh viên năm 2</MenuItem>
              <MenuItem value="Sinh viên năm 3">Sinh viên năm 3</MenuItem>
              <MenuItem value="Đã đi làm">Đã đi làm</MenuItem>
            </TextField>
            <TextField select label="Làm việc với lĩnh vực" defaultValue="Dữ liệu" fullWidth>
              <MenuItem value="Dữ liệu">Dữ liệu</MenuItem>
              <MenuItem value="Thiết kế">Thiết kế</MenuItem>
              <MenuItem value="Phần mềm">Phần mềm</MenuItem>
            </TextField>
          </Stack>

          <Stack spacing={2} flex={1}>
            <TextField select label="Chuyên ngành học tập" defaultValue="Kỹ thuật phần mềm" fullWidth>
              <MenuItem value="Kỹ thuật phần mềm">Kỹ thuật phần mềm</MenuItem>
              <MenuItem value="Thiết kế đồ họa">Thiết kế đồ họa</MenuItem>
              <MenuItem value="Khoa học dữ liệu">Khoa học dữ liệu</MenuItem>
            </TextField>
            <TextField select label="Mức lương mong muốn" defaultValue="7 - 8 triệu" fullWidth>
              <MenuItem value="5 - 6 triệu">5 - 6 triệu</MenuItem>
              <MenuItem value="7 - 8 triệu">7 - 8 triệu</MenuItem>
              <MenuItem value="9 - 10 triệu">9 - 10 triệu</MenuItem>
            </TextField>
          </Stack>
        </Stack>

        <Box display="flex" justifyContent="flex-end" mt={5}>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={handleAnalyze}
            sx={{ backgroundColor: '#6366F1', textTransform: 'none', fontWeight: 'bold' }}
          >
            Phân tích nghề nghiệp
          </Button>
        </Box>
      </Paper>

      {/* Loading */}
      {loading && (
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mt: 4 }}>
          🔄 Đang phân tích nghề nghiệp phù hợp...
        </Typography>
      )}

      {/* Danh sách nghề nghiệp */}
      <Fade in={showCareers} timeout={600}>
        <Stack spacing={2}>
          <Typography variant="h6" fontWeight="bold">Nghề nghiệp phù hợp</Typography>
          <Grid container spacing={2}>
            {[1, 2, 3, 4].map((_, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    borderRadius: 3,
                    p: 2,
                    backgroundColor: 'white',
                    border: '1px solid #D6D9FF',
                    transition: 'transform 0.2s, boxShadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 6,
                      borderColor: '#6366F1',
                    },
                  }}
                >
                  <Typography fontWeight="bold">Chuyên viên phân tích dữ liệu (Data Analyst)</Typography>
                  <Typography variant="body2" mt={1}>
                    <strong>Mô tả ngắn:</strong> Chịu trách nhiệm thu thập, xử lý và phản ánh dữ liệu
                  </Typography>
                  <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                    <Typography variant="body2" fontWeight="bold" mr={1}>Kỹ năng cần có:</Typography>
                    {["Figma", "AdobeXD", "Excel", "Python"].map((tag) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </Stack>
                  <Typography variant="body2" mt={1}>
                    <strong>Lộ trình học tập:</strong> 3 giai đoạn từ cơ bản đến dự án thực tế
                  </Typography>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" mt={2}>
                    <Button
                      startIcon={<FavoriteBorderIcon />}
                      variant="text"
                      sx={{ color: '#6366F1', fontWeight: 'bold' }}
                    >
                      Thêm vào ưu thích
                    </Button>
                    <Button
                      variant="contained"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => router.push(paths.career.detail.replace(':careerId', 'data-analyst'))}
                      sx={{
                        backgroundColor: '#6366F1',
                        fontWeight: 'bold',
                        '&:hover': { backgroundColor: '#4F46E5' },
                      }}
                    >
                      Xem chi tiết hơn
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Fade>
    </Stack>
  );
};

export default CareerContent;
