import { Box, Typography } from "@mui/material"
import TopicCard from "./topic-card"
import type { TopicWithResources } from "../../_data/roadmap-details"

interface TopicsListProps {
  topics: TopicWithResources[]
}

export default function TopicsList({ topics }: TopicsListProps) {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
        Learning Path
      </Typography>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
        {topics.map((topic, index) => (
          <TopicCard key={index} topic={topic} index={index + 1} />
        ))}
      </Box>
    </Box>
  )
}
