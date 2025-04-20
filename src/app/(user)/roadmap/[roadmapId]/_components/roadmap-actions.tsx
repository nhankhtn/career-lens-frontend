"use client"

import type React from "react"

import { Box, Button, IconButton, Menu, MenuItem, Snackbar, Alert } from "@mui/material"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import DownloadIcon from "@mui/icons-material/Download"
import ShareIcon from "@mui/icons-material/Share"
import { useState } from "react"
import { useParams } from "next/navigation"

export default function RoadmapActions() {
  const params = useParams()
  const roadmapId = params.roadmapId as string

  const [bookmarked, setBookmarked] = useState(false)
  const [shareAnchorEl, setShareAnchorEl] = useState<null | HTMLElement>(null)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  })

  // Handle bookmark toggle
  const handleBookmarkToggle = () => {
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
        message: "Roadmap added to bookmarks",
        severity: "success",
      })
    } else {
      // Remove from bookmarks
      const index = bookmarks.indexOf(roadmapId)
      if (index > -1) {
        bookmarks.splice(index, 1)
      }
      setSnackbar({
        open: true,
        message: "Roadmap removed from bookmarks",
        severity: "info",
      })
    }

    localStorage.setItem("roadmap-bookmarks", JSON.stringify(bookmarks))
  }

  // Handle schedule learning time
  const handleScheduleLearning = () => {
    // Open calendar or scheduling interface
    setSnackbar({
      open: true,
      message: "Learning time scheduled",
      severity: "success",
    })
  }

  // Handle download
  const handleDownload = () => {
    // Download roadmap as PDF or other format
    setSnackbar({
      open: true,
      message: "Downloading roadmap...",
      severity: "info",
    })

    // Simulate download delay
    setTimeout(() => {
      setSnackbar({
        open: true,
        message: "Roadmap downloaded successfully",
        severity: "success",
      })
    }, 2000)
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
          message: "Link copied to clipboard",
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
          Schedule Learning Time
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
          Download
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
          Share
        </Button>

        <Menu anchorEl={shareAnchorEl} open={Boolean(shareAnchorEl)} onClose={handleShareClose}>
          <MenuItem onClick={() => handleShare("twitter")}>Twitter</MenuItem>
          <MenuItem onClick={() => handleShare("facebook")}>Facebook</MenuItem>
          <MenuItem onClick={() => handleShare("linkedin")}>LinkedIn</MenuItem>
          <MenuItem onClick={() => handleShare("copy")}>Copy Link</MenuItem>
        </Menu>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
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
