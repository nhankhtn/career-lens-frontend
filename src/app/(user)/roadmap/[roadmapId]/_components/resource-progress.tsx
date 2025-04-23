"use client"

import { useState, useEffect } from "react"
import { Box, Tooltip, IconButton, Snackbar, Alert } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import { useUserContext } from "@/contexts/user/user-context"
import { UserTopicStatus } from "@/types/user"
import { useTopicContext } from "@/contexts/topic/topic-context"
import { useParams } from "next/navigation"

interface ResourceProgressProps {
  resourceId: string
  topicId: string
}

export default function ResourceProgress({ resourceId, topicId }: ResourceProgressProps) {
  const params = useParams()
  const roadmapId = params.roadmapId as string

  const { getTopicProgress, updateTopicProgress, user } = useUserContext()
  const { getTopicByIdApi } = useTopicContext()

  const [progress, setProgress] = useState<UserTopicStatus>(UserTopicStatus.NOT_STARTED)
  const [isLoading, setIsLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })

  // Load progress from API or localStorage as fallback
  useEffect(() => {
    const topicProgress = getTopicProgress(topicId)

    if (topicProgress) {
      setProgress(topicProgress.status)
    } else {
      // Fallback to localStorage if API data is not available yet
      const savedProgress = localStorage.getItem(`progress-${topicId}-${resourceId}`)
      if (savedProgress && Object.values(UserTopicStatus).includes(savedProgress as UserTopicStatus)) {
        setProgress(savedProgress as UserTopicStatus)
      }
    }
  }, [topicId, resourceId, getTopicProgress])

  // Handle progress change
  const handleProgressChange = async (newStatus: UserTopicStatus) => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Update local state immediately for better UX
      setProgress(newStatus)

      // Save to localStorage as fallback
      localStorage.setItem(`progress-${topicId}-${resourceId}`, newStatus)

      // If user is logged in, update on the server
      if (user) {
        // First, check if the parent roadmap is bookmarked
        const parentProgress = getTopicProgress(roadmapId)

        // If parent is not bookmarked, bookmark it first
        if (!parentProgress) {
          await updateTopicProgress(roadmapId, UserTopicStatus.NOT_STARTED)

          // Show notification that parent was bookmarked
          setSnackbar({
            open: true,
            message: "Roadmap has been automatically bookmarked",
            severity: "info",
          })
        }

        // Then update the current topic progress
        await updateTopicProgress(topicId, newStatus)

        // Show success notification
        setSnackbar({
          open: true,
          message: `Progress updated to ${getStatusLabel(newStatus)}`,
          severity: "success",
        })
      }
    } catch (error) {
      console.error("Error updating progress:", error)
      // Revert to previous state on error
      const topicProgress = getTopicProgress(topicId)
      if (topicProgress) {
        setProgress(topicProgress.status)
      }

      // Show error notification
      setSnackbar({
        open: true,
        message: "Failed to update progress",
        severity: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to get status label
  const getStatusLabel = (status: UserTopicStatus): string => {
    switch (status) {
      case UserTopicStatus.NOT_STARTED:
        return "Chưa học"
      case UserTopicStatus.IN_PROGRESS:
        return "Đang học"
      case UserTopicStatus.COMPLETED:
        return "Hoàn thành"
      default:
        return "Unknown"
    }
  }

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }

  // Define the status configurations
  const statusConfig = {
    [UserTopicStatus.NOT_STARTED]: {
      icon: <RadioButtonUncheckedIcon fontSize="small" />,
      label: "Chưa học",
      color: "text.secondary",
      bgColor: "transparent",
      borderColor: "divider",
    },
    [UserTopicStatus.IN_PROGRESS]: {
      icon: <AccessTimeIcon fontSize="small" />,
      label: "Đang học",
      color: "warning.main",
      bgColor: "warning.light",
      borderColor: "warning.main",
    },
    [UserTopicStatus.COMPLETED]: {
      icon: <CheckCircleIcon fontSize="small" />,
      label: "Hoàn thành",
      color: "success.main",
      bgColor: "success.light",
      borderColor: "success.main",
    },
  }

  const currentStatus = statusConfig[progress]

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        {Object.entries(statusConfig).map(([status, config]) => (
          <Tooltip key={status} title={config.label}>
            <IconButton
              size="small"
              onClick={() => handleProgressChange(status as UserTopicStatus)}
              disabled={isLoading}
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

      {/* Notification Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}
