"use client"

import { Container, Typography, Box, Paper, CssBaseline } from "@mui/material"
import { roleBasedRoadmaps, ownBasedRoadmaps } from "../_data/roadmaps"
import RoadmapGrid from "../_components/roadmap-grid"


export default function RoadmapContent() {
  return (
    <>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "#f8fafc" }}>

        <Container maxWidth="lg" sx={{ py: 8 }}>
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h2"
              component="h1"
              fontWeight="bold"
              // sx={{
              //   mb: 3,
              //   background: "linear-gradient(to right, #9c27b0, #673ab7)",
              //   WebkitBackgroundClip: "text",
              //   WebkitTextFillColor: "transparent",
              // }}
            >
              Lộ trình phát triển
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "800px", mx: "auto" }}>
            Lộ trình phát triển là một dự án nhằm xây dựng các lộ trình học tập, hướng dẫn và nội dung giáo dục khác giúp các lập trình viên lựa chọn con đường phát triển phù hợp và định hướng quá trình học tập của mình.
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
                bgcolor: "#e2e8f0",
              }}
            >
              <Typography variant="subtitle2">Lộ trình của bạn</Typography>
            </Paper>

            <RoadmapGrid roadmaps={ownBasedRoadmaps} type="own" />
          </Box>

          <Box sx={{ mb: 8 }}>
            <Paper
              sx={{
                display: "inline-block",
                borderRadius: "24px",
                px: 2,
                py: 1,
                mb: 4,
                bgcolor: "#e2e8f0",
              }}
            >
              <Typography variant="subtitle2">Lộ trình khác</Typography>
            </Paper>

            <RoadmapGrid roadmaps={roleBasedRoadmaps} type="role" />
          </Box>
        </Container>
      </Box>
    </>
  )
}
