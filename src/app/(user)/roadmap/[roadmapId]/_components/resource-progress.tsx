"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ToggleButtonGroup, ToggleButton, Box } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"

type ProgressStatus = "not-started" | "in-progress" | "completed"

interface ResourceProgressProps {
  resourceId: string
  topicId: string
}

export default function ResourceProgress({ resourceId, topicId }: ResourceProgressProps) {
  const [progress, setProgress] = useState<ProgressStatus>("not-started")

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${topicId}-${resourceId}`)
    if (savedProgress) {
      setProgress(savedProgress as ProgressStatus)
    }
  }, [resourceId, topicId])

  // Save progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem(`progress-${topicId}-${resourceId}`, progress)
  }, [progress, resourceId, topicId])

  const handleProgressChange = (event: React.MouseEvent<HTMLElement>, newStatus: ProgressStatus | null) => {
    if (newStatus !== null) {
      setProgress(newStatus)
    }
  }

  // Use the same color for all states (primary color)
  return (
    <ToggleButtonGroup value={progress} exclusive onChange={handleProgressChange} size="small" sx={{ height: 28 }}>
      <ToggleButton
        value="not-started"
        sx={{
          px: 1,
          py: 0.5,
          fontSize: "0.75rem",
          "&.Mui-selected": { bgcolor: "primary.light", color: "primary.dark" },
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
          "&.Mui-selected": { bgcolor: "primary.light", color: "primary.dark" },
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
          "&.Mui-selected": { bgcolor: "primary.light", color: "primary.dark" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CheckCircleIcon fontSize="small" sx={{ mr: 0.5 }} />
          Completed
        </Box>
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
