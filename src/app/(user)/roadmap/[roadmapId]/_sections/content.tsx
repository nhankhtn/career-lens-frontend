"use client"

import { useParams } from "next/navigation"
import { Container, Typography, Box, Button, Divider, useMediaQuery, useTheme } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Link from "next/link"
import { getRoadmapData } from "../../_data/roadmap-details"
import RoadmapHeader from "../_components/roadmap-header"
import RoadmapActions from "../_components/roadmap-actions"
import TopicTree from "../_components/topic-tree"

export default function RoadmapDetailContent() {
  const params = useParams()
  const roadmapId = params.roadmapId as string
  const roadmapData = getRoadmapData(roadmapId)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  if (!roadmapData) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4">Roadmap not found</Typography>
        <Button component={Link} href="/roadmap" startIcon={<ArrowBackIcon />} sx={{ mt: 2 }}>
          Back to Roadmaps
        </Button>
      </Container>
    )
  }

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pt: isMobile ? 1 : 2 }}>

      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Breadcrumb and Actions */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? 2 : 0,
            justifyContent: "space-between",
            alignItems: isMobile ? "flex-start" : "center",
            mb: isMobile ? 3 : 4,
          }}
        >
          <Button
            component={Link}
            href="/roadmap"
            startIcon={<ArrowBackIcon />}
            sx={{
              color: "text.secondary",
              fontSize: isMobile ? "0.8125rem" : "0.875rem",
            }}
          >
            All Roadmaps
          </Button>

          <RoadmapActions />
        </Box>

        {/* Title and Description */}
        <RoadmapHeader title={roadmapData.title} description={roadmapData.description} />

        <Divider sx={{ my: { xs: 3, sm: 4 } }} />

        {/* Roadmap Content */}
        <Box sx={{ mb: { xs: 4, sm: 6 } }}>
          <Typography
            variant="h5"
            sx={{ mb: { xs: 3, sm: 4 }, fontWeight: "bold", fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
          >
            Learning Path
          </Typography>

          {roadmapData.children && roadmapData.children.length > 0 ? (
            <TopicTree topics={roadmapData.children} />
          ) : (
            <Typography variant="body1" color="text.secondary">
              This roadmap doesn't have any topics yet.
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  )
}
