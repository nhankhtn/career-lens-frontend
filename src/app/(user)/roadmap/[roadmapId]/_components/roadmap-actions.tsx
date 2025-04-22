"use client"

import type React from "react"

import {
  Box, Button, IconButton, Menu, MenuItem, Snackbar, Alert, useMediaQuery,
  useTheme,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import BookmarkIcon from "@mui/icons-material/Bookmark"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import DownloadIcon from "@mui/icons-material/Download"
import ShareIcon from "@mui/icons-material/Share"
import { useState } from "react"
import { useParams } from "next/navigation"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth"

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

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      {isMobile ? (
        <>
          <IconButton onClick={handleOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <BookmarkBorderIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Lưu lộ trình" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <CalendarMonthIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Lên lịch học" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <DownloadIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Tải xuống" />
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <ShareIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Chia sẻ" />
            </MenuItem>
          </Menu>
        </>
      ) : (
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
            <MenuItem onClick={() => handleShare("copy")}>Copy Link</MenuItem>
          </Menu>
        </Box>
      )}
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
