"use client"

import { Box, Button, IconButton, useMediaQuery, useTheme } from "@mui/material"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import DownloadIcon from "@mui/icons-material/Download"
import ShareIcon from "@mui/icons-material/Share"

export default function RoadmapActions() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  if (isMobile) {
    return (
      <Box sx={{ display: "flex", gap: 1, width: "100%", justifyContent: "space-between" }}>
        <IconButton sx={{ color: "text.secondary" }}>
          <BookmarkBorderIcon />
        </IconButton>

        <Button
          startIcon={<DownloadIcon />}
          variant="contained"
          size="small"
          sx={{
            bgcolor: "warning.main",
            color: "text.primary",
            "&:hover": {
              bgcolor: "warning.dark",
            },
            flex: 1,
            maxWidth: "45%",
          }}
        >
          Download
        </Button>

        <Button
          startIcon={<ShareIcon />}
          variant="outlined"
          size="small"
          sx={{
            color: "text.secondary",
            borderColor: "divider",
            "&:hover": {
              borderColor: "text.secondary",
              bgcolor: "action.hover",
            },
            flex: 1,
            maxWidth: "45%",
          }}
        >
          Share
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <IconButton sx={{ color: "text.secondary" }}>
        <BookmarkBorderIcon />
      </IconButton>

      <Button
        startIcon={<CalendarTodayIcon />}
        variant="outlined"
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
    </Box>
  )
}
