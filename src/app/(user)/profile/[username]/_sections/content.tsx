// profile/[username]/_sections/content.tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  IconButton,
  Tab,
  Tabs,
  Typography,
  Badge,
  Stack,
} from "@mui/material";
import {
  Edit,
  Email,
  LocationOn,
  Message,
  Share,
  Phone,
  Visibility,
  Star,
  Search,
} from "@mui/icons-material";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import RowStack from "@/components/row-stack";
import Grid from "@mui/material/Grid";
import { BarChart } from "@mui/x-charts/BarChart";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";

// Import hooks
import { useDialog } from "@/hooks/use-dialog";

// Import form components
import EditIntroductionForm from "@/app/(user)/profile/[username]/_sections/edit-introduction-form";
import EditCoursesForm from "@/app/(user)/profile/[username]/_sections/edit-courses-form";
import EditSkillsForm from "@/app/(user)/profile/[username]/_sections/edit-skills-form";
import EditCertificationsForm from "@/app/(user)/profile/[username]/_sections/edit-certifications-form";

const ProfileContent = () => {
  const [tabValue, setTabValue] = useState(0);

  // Sử dụng useDialog cho từng form
  const introductionDialog = useDialog();
  const coursesDialog = useDialog();
  const skillsDialog = useDialog();
  const certificationsDialog = useDialog();

  // Dữ liệu ban đầu
  const [introduction, setIntroduction] = useState(
    "Tôi đang là sinh viên năm 3 tại trường đại học Công Nghệ Thông Tin ĐHQG TPHCM..."
  );
  const [courses, setCourses] = useState([
    { title: "UX UI Designer", description: "Lộ trình đã trở thành một ux ui designer chuyên nghiệp..." },
    { title: "Backend Developer", description: "Lộ trình đã trở thành một backend developer chuyên nghiệp..." },
    { title: "Data Analyst", description: "Lộ trình đã trở thành một data analyst chuyên nghiệp..." },
  ]);
  const [skills, setSkills] = useState([
    { skill: "MySQL", duration: "4 thang" },
    { skill: "Python", duration: "3 thang" },
    { skill: "C++", duration: "4 thang" },
    { skill: "User Interface Design", duration: "1 thang" },
  ]);
  const [certifications, setCertifications] = useState([
    { cert: "IELTS 9.0", color: "yellow" },
    { cert: "JLPT N1", color: "red" },
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Hàm xử lý submit từ các form
  const handleIntroductionSubmit = (newIntroduction: string) => {
    setIntroduction(newIntroduction);
  };

  const handleCoursesSubmit = (newCourses: { title: string; description: string }[]) => {
    setCourses(newCourses);
  };

  const handleSkillsSubmit = (newSkills: { skill: string; duration: string }[]) => {
    setSkills(newSkills);
  };

  const handleCertificationsSubmit = (newCertifications: { cert: string; color: string }[]) => {
    setCertifications(newCertifications);
  };

  return (
    <Stack sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left sidebar - Profile info */}
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <Stack alignItems="center" spacing={2}>
                    <Avatar
                      sx={{ width: 120, height: 120, border: 4, borderColor: "white" }}
                    >
                      <Image
                        src="/placeholder.svg?height=120&width=120"
                        alt="Profile picture"
                        width={120}
                        height={120}
                        style={{ borderRadius: "50%", objectFit: "cover" }}
                      />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold">
                      Nhân Duy
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Sinh viên năm 3
                    </Typography>
                    <RowStack spacing={1}>
                      <IconButton color="primary">
                        <Message sx={{ fontSize: 20 }} />
                      </IconButton>
                      <IconButton color="primary">
                        <Phone sx={{ fontSize: 20 }} />
                      </IconButton>
                      <IconButton color="primary">
                        <Share sx={{ fontSize: 20 }} />
                      </IconButton>
                      <IconButton color="primary">
                        <Typography fontWeight="bold">···</Typography>
                      </IconButton>
                    </RowStack>
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Stack spacing={2}>
                    <RowStack spacing={2}>
                      <Box sx={{ p: 1, bgcolor: "primary.light", borderRadius: "50%" }}>
                        <Phone sx={{ fontSize: 18, color: "primary.main" }} />
                      </Box>
                      <Typography variant="body2">(123) 456-7890</Typography>
                    </RowStack>
                    <RowStack spacing={2}>
                      <Box sx={{ p: 1, bgcolor: "primary.light", borderRadius: "50%" }}>
                        <Email sx={{ fontSize: 18, color: "primary.main" }} />
                      </Box>
                      <Typography variant="body2">nhanduy@gm.com</Typography>
                    </RowStack>
                    <RowStack spacing={2}>
                      <Box sx={{ p: 1, bgcolor: "primary.light", borderRadius: "50%" }}>
                        <LocationOn sx={{ fontSize: 18, color: "primary.main" }} />
                      </Box>
                      <Stack>
                        <Typography variant="body2">99 Washington Ave.</Typography>
                        <Typography variant="body2">Manchester, Kentucky 99</Typography>
                      </Stack>
                    </RowStack>
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="medium" mb={2}>
                    Tài khoản mạng xã hội
                  </Typography>
                  <Stack spacing={2}>
                    <RowStack justifyContent="space-between">
                      <RowStack spacing={2}>
                        <FacebookIcon sx={{ color: "primary.main", fontSize: 20 }} />
                        <Typography>Ngô Nguyễn Duy Nhân</Typography>
                      </RowStack>
                      <Typography color="text.secondary">›</Typography>
                    </RowStack>
                    <RowStack justifyContent="space-between">
                      <RowStack spacing={2}>
                        <LinkedInIcon sx={{ color: "primary.main", fontSize: 20 }} />
                        <Typography>awish</Typography>
                      </RowStack>
                      <Typography color="text.secondary">›</Typography>
                    </RowStack>
                  </Stack>
                </CardContent>
              </Card>

              <Button
                variant="contained"
                startIcon={<Edit sx={{ fontSize: 16 }} />}
                fullWidth
              >
                Edit profile
              </Button>
            </Stack>
          </Grid>

          {/* Right content - Analytics and details */}
          <Grid item xs={12} md={8}>
            <Stack spacing={4}>
              {/* Analytics section */}
              <Card>
                <CardContent>
                  <RowStack justifyContent="space-between" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                      Phân tích tuần qua
                    </Typography>
                  </RowStack>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <Typography color="text.secondary">
                        Lượt xem profile
                      </Typography>
                      <RowStack sx={{ height: 80 }} spacing={0.5}>
                        <BarChart
                          series={[{ data: [60, 40, 50, 30, 70] }]}
                          height={80}
                          xAxis={[{ data: ["w1", "w2", "w3", "w4", "w5"], scaleType: "band" }]}
                          margin={{ top: 10, bottom: 20, left: 0, right: 0 }}
                        />
                      </RowStack>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                      <RowStack spacing={2} justifyContent="space-around">
                        <Stack alignItems="center" spacing={1}>
                          <Visibility sx={{ fontSize: 24, color: "primary.main" }} />
                          <Typography fontWeight="bold">200 người xem</Typography>
                        </Stack>
                        <Stack alignItems="center" spacing={1}>
                          <Star sx={{ fontSize: 24, color: "primary.main" }} />
                          <Typography fontWeight="bold">100 sao</Typography>
                        </Stack>
                        <Stack alignItems="center" spacing={1}>
                          <Search sx={{ fontSize: 24, color: "primary.main" }} />
                          <Typography fontWeight="bold">70 tìm kiếm</Typography>
                        </Stack>
                      </RowStack>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Introduction section */}
              <Card>
                <CardContent>
                  <RowStack justifyContent="space-between" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                      Giới thiệu
                    </Typography>
                    <IconButton onClick={() => introductionDialog.handleOpen()}>
                      <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                  </RowStack>
                  {introductionDialog.open ? (
                    <EditIntroductionForm
                      onClose={introductionDialog.handleClose}
                      initialValue={introduction}
                      onSubmit={handleIntroductionSubmit}
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      {introduction}
                    </Typography>
                  )}
                </CardContent>
              </Card>

              {/* Courses section */}
              <Card>
                <CardContent>
                  <RowStack justifyContent="space-between" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                      Các lộ trình đang theo học
                    </Typography>
                    <IconButton onClick={() => coursesDialog.handleOpen()}>
                      <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                  </RowStack>
                  {coursesDialog.open ? (
                    <EditCoursesForm
                      onClose={coursesDialog.handleClose}
                      initialCourses={courses}
                      onSubmit={handleCoursesSubmit}
                    />
                  ) : (
                    <Stack spacing={3}>
                      {courses.map((course, index) => (
                        <RowStack key={index} spacing={2}>
                          <Box sx={{ width: 48, height: 48, bgcolor: "primary.light", borderRadius: 1 }} />
                          <Stack>
                            <Typography fontWeight="bold">{course.title}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {course.description}
                            </Typography>
                            <Typography variant="body2" color="primary">
                              See more
                            </Typography>
                          </Stack>
                        </RowStack>
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </Card>

              {/* Skills section */}
              <Card>
                <CardContent>
                  <RowStack justifyContent="space-between" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                      Skill
                    </Typography>
                    <IconButton onClick={() => skillsDialog.handleOpen()}>
                      <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                  </RowStack>
                  <Tabs value={tabValue} onChange={handleTabChange}>
                    <Tab label="All" value={0} />
                    <Tab label="Industry knowledge" value={1} />
                    <Tab label="Tools & Technologies" value={2} />
                  </Tabs>
                  {skillsDialog.open ? (
                    <EditSkillsForm
                      onClose={skillsDialog.handleClose}
                      initialSkills={skills}
                      onSubmit={handleSkillsSubmit}
                    />
                  ) : (
                    <>
                      {tabValue === 0 && (
                        <Stack spacing={2} mt={2}>
                          {skills.map((item, index) => (
                            <RowStack key={index} justifyContent="space-between">
                              <RowStack spacing={1}>
                                <VerifiedIcon sx={{ color: "primary.main" }} />
                                <Typography>{item.skill}</Typography>
                              </RowStack>
                              <Typography color="success.main">{item.duration}</Typography>
                            </RowStack>
                          ))}
                        </Stack>
                      )}
                      {tabValue === 1 && (
                        <Stack spacing={2} mt={2}>
                          <Typography>Industry knowledge content goes here...</Typography>
                        </Stack>
                      )}
                      {tabValue === 2 && (
                        <Stack spacing={2} mt={2}>
                          <Typography>Tools & Technologies content goes here...</Typography>
                        </Stack>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Certifications section */}
              <Card>
                <CardContent>
                  <RowStack justifyContent="space-between" mb={2}>
                    <Typography variant="h6" fontWeight="bold">
                      Các chứng chỉ đạt được
                    </Typography>
                    <IconButton onClick={() => certificationsDialog.handleOpen()}>
                      <Edit sx={{ fontSize: 16 }} />
                    </IconButton>
                  </RowStack>
                  {certificationsDialog.open ? (
                    <EditCertificationsForm
                      onClose={certificationsDialog.handleClose}
                      initialCertifications={certifications}
                      onSubmit={handleCertificationsSubmit}
                    />
                  ) : (
                    <Stack spacing={2}>
                      {certifications.map((item, index) => (
                        <RowStack key={index} spacing={2}>
                          <WorkspacePremiumIcon sx={{ color: `${item.color}.main`, fontSize: 24 }} />
                          <Typography>{item.cert}</Typography>
                        </RowStack>
                      ))}
                    </Stack>
                  )}
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "grey.900", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <RowStack spacing={2}>
                <Box sx={{ width: 32, height: 32, bgcolor: "primary.main", borderRadius: 1 }} />
                <Typography variant="h6" fontWeight="bold">
                  LOGO
                </Typography>
              </RowStack>
            </Grid>
            {["Product", "Resources", "Company"].map((section, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Typography variant="subtitle1" fontWeight="bold" mb={2}>
                  {section}
                </Typography>
                <Stack spacing={1}>
                  {["All Jobs", "Companies", "Candidates"].map((item, i) => (
                    <Typography key={i} variant="body2" color="grey.400">
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </Grid>
            ))}
            <Grid item xs={12}>
              <RowStack spacing={2}>
                <Stack>
                  <Typography variant="subtitle1" fontWeight="bold">
                    Subscribe to our newsletter
                  </Typography>
                  <Typography variant="body2" color="grey.400">
                    For product announcements and exclusive insights
                  </Typography>
                </Stack>
                <RowStack spacing={1}>
                  <input
                    type="email"
                    placeholder="Input your email"
                    style={{ padding: 8, borderRadius: 4, background: "#1F2937", color: "white" }}
                  />
                  <Button variant="contained">Subscribe</Button>
                </RowStack>
              </RowStack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Stack>
  );
};

export default ProfileContent;