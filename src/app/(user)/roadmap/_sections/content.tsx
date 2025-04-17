"use client"

import { Container, Typography, Box, Paper, CssBaseline } from "@mui/material"
import { getAllRoadmaps } from "../_data/roadmap-details"
import RoadmapGrid from "../_components/roadmap-grid"

export default function RoadmapContent() {
  const roadmaps = getAllRoadmaps()

  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              // sx={{
              //   mb: 3,
              //   background: "linear-gradient(to right, primary.dark, primary.main)",
              //   WebkitBackgroundClip: "text",
              //   WebkitTextFillColor: "transparent",
              // }}
            >
              Lộ trình phát triển
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "800px", mx: "auto" }}>
            Lộ trình phát triển là một dự án cộng đồng nhằm xây dựng các lộ trình, hướng dẫn và nội dung học tập khác để hỗ trợ lập trình viên lựa chọn con đường phù hợp và định hướng quá trình học tập của mình.
            </Typography>
          </Box>

          <Box sx={{ mb: 8 }}>
            <Paper
              sx={{
                display: "inline-block",
                borderRadius: "24px",
                px: 2,
                py: 1,
                mb: 4,
                bgcolor: "background.paper",
              }}
            >
              {/* <Typography variant="subtitle2">Role-based Roadmaps</Typography> */}
            </Paper>

            <RoadmapGrid roadmaps={roadmaps} />
          </Box>
        </Container>
      </Box>
    </>
  )
}
