"use client"

import { Card, CardContent, Typography, Box, IconButton, useMediaQuery, useTheme } from "@mui/material"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import Link from "next/link"

interface RoadmapCardProps {
  id: string
  title: string
  description: string
}

export default function RoadmapCard({ id, title, description }: RoadmapCardProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

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
      <CardContent sx={{ p: isMobile ? 2 : 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            component="h3"
            sx={{
              fontWeight: 600,
              color: "text.primary",
              fontSize: isMobile ? "1rem" : "1.125rem",
            }}
          >
            <Link href={`/roadmap/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
              {title}
            </Link>
          </Typography>
          <IconButton size="small" sx={{ color: "text.secondary" }}>
            <BookmarkBorderIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            display: isMobile ? "-webkit-box" : "block",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            fontSize: isMobile ? "0.8125rem" : "0.875rem",
          }}
        >
          {description}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            href={`/roadmap/${id}`}
            style={{
              textDecoration: "none",
              color: "primary.main",
              fontSize: isMobile ? "0.8125rem" : "0.875rem",
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
