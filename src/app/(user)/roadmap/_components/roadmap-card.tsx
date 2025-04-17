import { Card, CardContent, Typography, Box, IconButton } from "@mui/material"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import Link from "next/link"

interface RoadmapCardProps {
  id: string
  title: string
  description: string
}

export default function RoadmapCard({ id, title, description }: RoadmapCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: "background.paper",
        transition: "all 0.2s",
        "&:hover": {
          bgcolor: "background.default",
          transform: "translateY(-4px)",
        },
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, color: "text.primary" }}>
            <Link href={`/roadmap/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
              {title}
            </Link>
          </Typography>
          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <BookmarkBorderIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            href={`/roadmap/${id}`}
            style={{
              textDecoration: "none",
              color: "primary.main",
              fontSize: "0.875rem",
              fontWeight: 500,
            }}
          >
            View Roadmap →
          </Link>
        </Box>
      </CardContent>
    </Card>
  )
}
