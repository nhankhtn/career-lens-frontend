"use client"

import type React from "react"

import { Box, Button, IconButton, Menu, MenuItem, Snackbar, Alert } from "@mui/material"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import DownloadIcon from "@mui/icons-material/Download"
import ShareIcon from "@mui/icons-material/Share"
import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { useUserContext } from "@/contexts/user/user-context"
import { UserTopicStatus } from "@/types/user"

export default function RoadmapActions() {
  const params = useParams()
  const roadmapId = params.roadmapId as string
  const { getTopicProgress, updateTopicProgress, removeTopicProgress, isAuthenticated } = useUserContext()

  const [bookmarked, setBookmarked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })

  // Use a ref to track if we've already loaded from localStorage
  const loadedFromLocalStorage = useRef(false)

  // Check if the roadmap is bookmarked
  useEffect(() => {
    // Get from API if available
    const topicProgress = getTopicProgress(roadmapId)

    if (topicProgress) {
      setBookmarked(true)
    }
    // Only load from localStorage once to prevent infinite loops
    else if (!loadedFromLocalStorage.current) {
      loadedFromLocalStorage.current = true
      // Fallback to localStorage if API data is not available yet
      const savedBookmarks = JSON.parse(localStorage.getItem("roadmap-bookmarks") || "[]")
      setBookmarked(savedBookmarks.includes(roadmapId))
    }
  }, [roadmapId, getTopicProgress])

  // Handle bookmark toggle
  const handleBookmarkToggle = async () => {
    if (isLoading) return

    setIsLoading(true)
    try {
      // Update local state immediately for better UX
      setBookmarked(!bookmarked)

      // Save bookmark state to localStorage
      const bookmarks = JSON.parse(localStorage.getItem("roadmap-bookmarks") || "[]")

      if (!bookmarked) {
        // Add to bookmarks
        if (!bookmarks.includes(roadmapId)) {
          bookmarks.push(roadmapId)
        }
        setSnackbar({
          open: true,
          message: "Lộ trình đã được lưu",
          severity: "success",
        })

        // If user is logged in, update on the server
        if (isAuthenticated) {
          await updateTopicProgress(roadmapId, UserTopicStatus.NOT_STARTED)
        }
      } else {
        // Remove from bookmarks
        const index = bookmarks.indexOf(roadmapId)
        if (index > -1) {
          bookmarks.splice(index, 1)
        }
        setSnackbar({
          open: true,
          message: "Lộ trình đã bị gỡ",
          severity: "info",
        })

        // If user is logged in, update on the server
        if (isAuthenticated) {
          await removeTopicProgress(roadmapId)
        }
      }

      localStorage.setItem("roadmap-bookmarks", JSON.stringify(bookmarks))
    } catch (error) {
      console.error("Error toggling bookmark:", error)
      // Revert to previous state on error
      setBookmarked(!bookmarked)
      setSnackbar({
        open: true,
        message: "Lỗi cập nhật tình trạng roadmap",
        severity: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Handle schedule learning time
  const handleScheduleLearning = () => {
    // Open calendar or scheduling interface
    setSnackbar({
      open: true,
      message: "Chức năng đang được phát triển",
      severity: "info",
    })
  }

  // Handle download
  const handleDownload = () => {
    // Download roadmap as PDF or other format
    setSnackbar({
      open: true,
      message: "Chức năng đang được phát triển",
      severity: "info",
    })

    // Simulate download delay
    // setTimeout(() => {
    //   setSnackbar({
    //     open: true,
    //     message: "Roadmap downloaded successfully",
    //     severity: "success",
    //   })
    // }, 2000)
  }

  // Handle share menu
  const handleShareClick = (event: React.MouseEvent<HTMLElement>) => {
    setShareAnchorEl(event.currentTarget)
  }

  const handleShareClose = () => {
    setShareAnchorEl(null)
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    let shareUrl = ""

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=Check out this roadmap!`
        break
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
      case "copy":
        navigator.clipboard.writeText(url)
        setSnackbar({
          open: true,
          message: "Sao chép đường dẫn thành công",
          severity: "success",
        })
        handleShareClose()
        return
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank")
    }

    handleShareClose()
  }

  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    })
  }

  return (
    <>
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton
          sx={{ color: bookmarked ? "primary.main" : "text.secondary" }}
          onClick={handleBookmarkToggle}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
          disabled={isLoading}
        >
          {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon />}
        </IconButton>

        <Button
          startIcon={<CalendarTodayIcon />}
          variant="outlined"
          onClick={handleScheduleLearning}
          sx={{
            color: "text.secondary",
            borderColor: "divider",
            "&:hover": {
              borderColor: "text.secondary",
              bgcolor: "action.hover",
            },
          }}
        >
          Lên lịch học
        </Button>

        <Button
          startIcon={<DownloadIcon />}
          variant="contained"
          onClick={handleDownload}
          sx={{
            bgcolor: "warning.main",
            color: "text.primary",
            "&:hover": {
              bgcolor: "warning.dark",
            },
          }}
        >
          Tải xuống
        </Button>

        <Button
          startIcon={<ShareIcon />}
          variant="outlined"
          onClick={handleShareClick}
          sx={{
            color: "text.secondary",
            borderColor: "divider",
            "&:hover": {
              borderColor: "text.secondary",
              bgcolor: "action.hover",
            },
          }}
        >
          Chia sẻ
        </Button>

        <Menu anchorEl={shareAnchorEl} open={Boolean(shareAnchorEl)} onClose={handleShareClose}>
          <MenuItem onClick={() => handleShare("twitter")}>Twitter</MenuItem>
          <MenuItem onClick={() => handleShare("facebook")}>Facebook</MenuItem>
          <MenuItem onClick={() => handleShare("linkedin")}>LinkedIn</MenuItem>
          <MenuItem onClick={() => handleShare("copy")}>Sao chép liên kết</MenuItem>
        </Menu>
      </Box>

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
