"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Box, Typography, Chip, Link as MuiLink, ToggleButtonGroup, ToggleButton } from "@mui/material"
import SchoolIcon from "@mui/icons-material/School"
import YouTubeIcon from "@mui/icons-material/YouTube"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import type { Resource } from "../../_data/roadmap-details"

interface ResourceItemProps {
  resource: Resource
  topicTitle: string
}

type ProgressStatus = "not-started" | "in-progress" | "completed"

export default function ResourceItem({ resource, topicTitle }: ResourceItemProps) {
  const [progress, setProgress] = useState<ProgressStatus>("not-started")

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${topicTitle}-${resource.id}`)
    if (savedProgress) {
      setProgress(savedProgress as ProgressStatus)
    }
  }, [resource.id, topicTitle])

  // Save progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(`progress-${topicTitle}-${resource.id}`, progress)
  }, [progress, resource.id, topicTitle])

  const handleProgressChange = (event: React.MouseEvent<HTMLElement>, newStatus: ProgressStatus | null) => {
    if (newStatus !== null) {
      setProgress(newStatus)
    }
  }

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "youtube":
        return <YouTubeIcon fontSize="small" sx={{ color: "#FF0000" }} />
      case "coursera":
      case "udemy":
        return <SchoolIcon fontSize="small" sx={{ color: "#0056D2" }} />
      default:
        return <MenuBookIcon fontSize="small" sx={{ color: "#4CAF50" }} />
    }
  }

  return (
    <Box
      sx={{
        mb: 2,
        p: 1.5,
        borderRadius: 1,
        bgcolor: "#f8fafc",
        border: "1px solid #e2e8f0",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "flex-start", mb: 1 }}>
        <Box sx={{ mr: 1, mt: 0.5 }}>{getResourceIcon(resource.platform)}</Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
            <MuiLink href={resource.url} target="_blank" rel="noopener noreferrer" sx={{ textDecoration: "none" }}>
              {resource.title}
            </MuiLink>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
            <Chip label={resource.platform} size="small" sx={{ mr: 1, height: 20, fontSize: "0.75rem" }} />
            {resource.free && (
              <Chip
                label="Free"
                size="small"
                sx={{
                  mr: 1,
                  height: 20,
                  fontSize: "0.75rem",
                  bgcolor: "#dcfce7",
                  color: "#166534",
                }}
              />
            )}
            {resource.duration && (
              <Typography variant="caption" color="text.secondary">
                {resource.duration}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        <ToggleButtonGroup value={progress} exclusive onChange={handleProgressChange} size="small" sx={{ height: 28 }}>
          <ToggleButton
            value="not-started"
            sx={{
              px: 1,
              py: 0.5,
              fontSize: "0.75rem",
              "&.Mui-selected": { bgcolor: "#f1f5f9", color: "#64748b" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <RadioButtonUncheckedIcon fontSize="small" sx={{ mr: 0.5 }} />
              Not Started
            </Box>
          </ToggleButton>
          <ToggleButton
            value="in-progress"
            sx={{
              px: 1,
              py: 0.5,
              fontSize: "0.75rem",
              "&.Mui-selected": { bgcolor: "#eff6ff", color: "#1e40af" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
              In Progress
            </Box>
          </ToggleButton>
          <ToggleButton
            value="completed"
            sx={{
              px: 1,
              py: 0.5,
              fontSize: "0.75rem",
              "&.Mui-selected": { bgcolor: "#dcfce7", color: "#166534" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
              Completed
            </Box>
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  )
}
