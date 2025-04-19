"use client"

import { useParams } from "next/navigation"
import { Container, Typography, Box, Button, Divider } from "@mui/material"
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
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pt: 2 }}>

      <Container maxWidth="lg">
        {/* Breadcrumb and Actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Button component={Link} href="/roadmap" startIcon={<ArrowBackIcon />} sx={{ color: "text.secondary" }}>
            All Roadmaps
          </Button>

          <RoadmapActions />
        </Box>

        {/* Title and Description */}
        <RoadmapHeader title={roadmapData.title} description={roadmapData.description} />

        <Divider sx={{ my: 4 }} />

        {/* Roadmap Content */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
            Learning Path
          </Typography>

          {roadmapData.children && roadmapData.children.length > 0 ? (
            <TopicTree topics={roadmapData.children} />
          ) : (
            <Typography variant="body1" color="text.secondary">
              This roadmap doesn&apos;t have any topics yet.
            </Typography>

          )}
        </Box>
      </Container>
    </Box>
  )
}
