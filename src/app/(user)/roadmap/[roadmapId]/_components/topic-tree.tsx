"use client"

import { useState } from "react"
import { Box, Paper } from "@mui/material"
import type { Topic } from "../../_data/roadmap-details"
import TopicNode from "./topic-node"

interface TopicTreeProps {
  topics: Topic[]
}

export default function TopicTree({ topics }: TopicTreeProps) {
  const [expandedTopics, setExpandedTopics] = useState<Record<string, boolean>>({})

  const handleToggleTopic = (topicId: string) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }))
  }

  // Sort topics by order
  const sortedTopics = [...topics].sort((a, b) => a.order - b.order)

  return (
    <Box sx={{ mb: 4 }}>
      {sortedTopics.map((topic) => (
        <Paper
          key={topic.id}
          sx={{
            mb: 3,
            borderRadius: 2,
            overflow: "hidden",
            boxShadow: 1,
          }}
        >
          <TopicNode
            topic={topic}
            level={0}
            expanded={!!expandedTopics[topic.id]}
            onToggle={() => handleToggleTopic(topic.id)}
          />
        </Paper>
      ))}
    </Box>
  )
}
