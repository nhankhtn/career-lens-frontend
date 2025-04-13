"use client"

import type React from "react"

import { useParams } from "next/navigation"
import { Container, Typography, Box, Button, Tabs, Tab, Divider } from "@mui/material"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import Link from "next/link"
import { useState } from "react"
import { getRoadmapData } from "../../_data/roadmap-details"
import RoadmapHeader from "../_components/roadmap-header"
import RoadmapFAQ from "../_components/roadmap-faq"
import RoadmapActions from "../_components/roadmap-actions"
import TopicsList from "../_components/topics-list"
import ProjectsList from "../_components/projects-list"

export default function RoadmapDetailContent() {
  const params = useParams()
  const roadmapId = params.roadmapId as string
  const roadmapData = getRoadmapData(roadmapId)

  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

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
    <Box sx={{ bgcolor: "#f8fafc", minHeight: "100vh", pt: 2 }}>

      <Container maxWidth="lg">
        {/* Breadcrumb and Actions */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
          <Button component={Link} href="/roadmap" startIcon={<ArrowBackIcon />} sx={{ color: "#64748b" }}>
            All Roadmaps
          </Button>

          <RoadmapActions />
        </Box>

        {/* Title and Description */}
        <RoadmapHeader title={roadmapData.title} description={roadmapData.description} />

        {/* Tabs */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#000",
              },
              "& .Mui-selected": {
                color: "#000 !important",
                fontWeight: "bold",
              },
              "& .MuiTab-root": {
                color: "#64748b",
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: "medium",
                px: 3,
              },
            }}
          >
            <Tab label="Roadmap" />
            <Tab label="Projects" />
          </Tabs>
          <Divider />
        </Box>

        {/* Tab Content */}
        <Box sx={{ mb: 4 }}>
          {tabValue === 0 && (
            <Box>
              <RoadmapFAQ title={roadmapData.title} faq={roadmapData.faq} />
              <TopicsList topics={roadmapData.topicsWithResources} />
            </Box>
          )}

          {tabValue === 1 && <ProjectsList title={roadmapData.title} projects={roadmapData.projects} />}
        </Box>
      </Container>
    </Box>
  )
}
