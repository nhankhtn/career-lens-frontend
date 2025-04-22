"use client"

import { useState, useEffect } from "react"
import { Box, Tooltip, IconButton } from "@mui/material"
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

  const handleProgressChange = (newStatus: ProgressStatus) => {
    setProgress(newStatus)
  }

  // Define the status configurations
  const statusConfig = {
    "not-started": {
      icon: <RadioButtonUncheckedIcon fontSize="small" />,
      label: "Chưa học",
      color: "text.secondary",
      bgColor: "transparent",
      borderColor: "divider",
    },
    "in-progress": {
      icon: <AccessTimeIcon fontSize="small" />,
      label: "Đang học",
      color: "warning.main",
      bgColor: "warning.light",
      borderColor: "warning.main",
    },
    completed: {
      icon: <CheckCircleIcon fontSize="small" />,
      label: "Hoàn thành",
      color: "success.main",
      bgColor: "success.light",
      borderColor: "success.main",
    },
  }

  const currentStatus = statusConfig[progress]

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      {Object.entries(statusConfig).map(([status, config]) => (
        <Tooltip key={status} title={config.label}>
          <IconButton
            size="small"
            onClick={() => handleProgressChange(status as ProgressStatus)}
            sx={{
              color: status === progress ? config.color : "text.disabled",
              bgcolor: status === progress ? config.bgColor : "transparent",
              border: "1px solid",
              borderColor: status === progress ? config.borderColor : "transparent",
              p: 0.5,
              "&:hover": {
                bgcolor: config.bgColor,
                opacity: 0.8,
              },
            }}
          >
            {config.icon}
          </IconButton>
        </Tooltip>
      ))}

      <Box
        component="span"
        sx={{
          fontSize: "0.75rem",
          fontWeight: 500,
          color: currentStatus.color,
          ml: 0.5,
        }}
      >
        {currentStatus.label}
      </Box>
    </Box>
  )
}
