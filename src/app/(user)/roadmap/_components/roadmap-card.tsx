import { Card, CardContent, Typography, Box, IconButton, Chip } from "@mui/material"
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder"
import Link from "next/link"

interface RoadmapCardProps {
  title: string
  href: string
  isNew?: boolean
}

export default function RoadmapCard({ title, href, isNew }: RoadmapCardProps) {
  return (
    <Card
      sx={{
        height: "100%",
        bgcolor: "white",
        transition: "all 0.2s",
        "&:hover": {
          bgcolor: "#f1f5f9",
        },
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <Box>
            <Typography variant="subtitle1" component="h3" sx={{ fontWeight: 500, color: "#1e293b" }}>
              <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
                {title}
              </Link>
            </Typography>
            {isNew && (
              <Chip
                size="small"
                label={
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        bgcolor: "#a855f7",
                        mr: 0.5,
                      }}
                    />
                    New
                  </Box>
                }
                sx={{
                  mt: 0.5,
                  bgcolor: "#f3e8ff",
                  color: "#9333ea",
                  height: 20,
                  "& .MuiChip-label": {
                    px: 1,
                  },
                }}
              />
            )}
          </Box>
          <IconButton size="small" sx={{ color: "#64748b" }}>
            <BookmarkBorderIcon fontSize="small" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  )
}
