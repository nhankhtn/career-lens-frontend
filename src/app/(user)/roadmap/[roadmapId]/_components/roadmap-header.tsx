import { Box, Typography } from "@mui/material"

interface RoadmapHeaderProps {
  title: string
  description: string
}

export default function RoadmapHeader({ title, description }: RoadmapHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h3" component="h1" fontWeight="bold" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {description}
      </Typography>
    </Box>
  )
}
