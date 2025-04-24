"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ToggleButtonGroup, ToggleButton, Box, useMediaQuery, useTheme } from "@mui/material"
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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress-${topicId}-${resourceId}`)
    if (savedProgress) {
      setProgress(savedProgress as ProgressStatus)
    }
  }, [resourceId, topicId])

  useEffect(() => {
    localStorage.setItem(`progress-${topicId}-${resourceId}`, progress)
  }, [progress, resourceId, topicId])

  const handleProgressChange = (event: React.MouseEvent<HTMLElement>, newStatus: ProgressStatus | null) => {
    if (newStatus !== null) {
      setProgress(newStatus)
    }
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <ToggleButtonGroup
        value={progress}
        exclusive
        onChange={handleProgressChange}
        size="small"
        sx={{
          height: 32,
          flexWrap: { xs: "wrap", sm: "nowrap" },
          "& .MuiToggleButton-root": {
            flexGrow: { xs: 1, sm: 0 },
            whiteSpace: "nowrap",
            fontSize: "0.75rem",
          },
        }}
      >
        <ToggleButton
          value="not-started"
          sx={{
            px: 1,
            py: 0.5,
            "&.Mui-selected": { bgcolor: "primary.light", color: "primary.dark" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <RadioButtonUncheckedIcon fontSize="small" />
            {!isMobile && <Box ml={0.5}>Không trạng thái</Box>}
          </Box>
        </ToggleButton>

        <ToggleButton
          value="in-progress"
          sx={{
            px: 1,
            py: 0.5,
            "&.Mui-selected": { bgcolor: "primary.light", color: "primary.dark" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <AccessTimeIcon fontSize="small" />
            {!isMobile && <Box ml={0.5}>Đang tiến hành</Box>}
          </Box>
        </ToggleButton>

        <ToggleButton
          value="completed"
          sx={{
            px: 1,
            py: 0.5,
            "&.Mui-selected": { bgcolor: "primary.light", color: "primary.dark" },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CheckCircleIcon fontSize="small" />
            {!isMobile && <Box ml={0.5}>Hoàn thành</Box>}
          </Box>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  )
}
