import { Box, Button, IconButton } from "@mui/material"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import DownloadIcon from "@mui/icons-material/Download"
import ShareIcon from "@mui/icons-material/Share"

export default function RoadmapActions() {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <IconButton sx={{ color: "#64748b" }}>
        <BookmarkBorderIcon />
      </IconButton>

      <Button
        startIcon={<CalendarTodayIcon />}
        variant="outlined"
        sx={{
          color: "#64748b",
          borderColor: "#cbd5e1",
          "&:hover": {
            borderColor: "#94a3b8",
            bgcolor: "rgba(203, 213, 225, 0.1)",
          },
        }}
      >
        Schedule Learning Time
      </Button>

      <Button
        startIcon={<DownloadIcon />}
        variant="contained"
        sx={{
          bgcolor: "#eab308",
          color: "#000",
          "&:hover": {
            bgcolor: "#ca8a04",
          },
        }}
      >
        Download
      </Button>

      <Button
        startIcon={<ShareIcon />}
        variant="outlined"
        sx={{
          color: "#64748b",
          borderColor: "#cbd5e1",
          "&:hover": {
            borderColor: "#94a3b8",
            bgcolor: "rgba(203, 213, 225, 0.1)",
          },
        }}
      >
        Share
      </Button>
    </Box>
  )
}
