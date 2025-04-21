"use client"

import { Box, Button, Container, Divider, Typography, CircularProgress, Alert } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Link from "next/link"
import RoadmapHeader from "../_components/roadmap-header"
import RoadmapActions from "../_components/roadmap-actions"
import TopicTree from "../_components/topic-tree"
// import PartnerBanner from "../_components/partner-banner"
import useRoadmapDetail from "./use-roadmap-detail-search"
import { useEffect, useState } from "react"
import type { Topic } from "@/types/topic"

export default function RoadmapDetailContent() {
  const { topic, childTopics, loading, error } = useRoadmapDetail()
  const [rootTopics, setRootTopics] = useState<Topic[]>([])

  // Process child topics to get only the root topics (direct children of the roadmap)
  useEffect(() => {
    if (!topic || !childTopics || childTopics.length === 0) {
      setRootTopics([])
      return
    }

    // Get only the direct children of the roadmap
    const directChildren = childTopics.filter((child) => child.parent_id === topic.id)
    setRootTopics(directChildren)
  }, [topic, childTopics])

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          Error loading roadmap: {error.message || "Unknown error"}
        </Alert>
        <Button component={Link} href="/roadmap" startIcon={<ArrowBackIcon />}>
          Back to Roadmaps
        </Button>
      </Container>
    )
  }

  if (!topic) {
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
      {/* <PartnerBanner title={topic.title} /> */}

      <Container maxWidth="lg">
        {/* Breadcrumb and Actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Button component={Link} href="/roadmap" startIcon={<ArrowBackIcon />} sx={{ color: "text.secondary" }}>
            All Roadmaps
          </Button>

          <RoadmapActions />
        </Box>

        {/* Title and Description */}
        <RoadmapHeader title={topic.title} description={topic.description || ""} />

        <Divider sx={{ my: 4 }} />

        {/* Roadmap Content */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: "bold" }}>
            Learning Path
          </Typography>

          {rootTopics.length > 0 ? (
            <TopicTree topics={rootTopics} />
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
