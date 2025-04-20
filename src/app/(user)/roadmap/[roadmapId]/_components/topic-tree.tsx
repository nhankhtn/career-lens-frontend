"use client"

import { useState } from "react"
import { Box, Paper } from "@mui/material"
import TopicNode from "./topic-node"

// Update the interface to match the API data structure
interface TopicResource {
  title: string
  type: string
  url: string
  platform?: string
  free?: boolean
  duration?: string
}

interface Topic {
  id: string
  title: string
  description?: string
  level?: number
  priority?: number
  resources?: TopicResource[]
  order?: number
  parent_id?: string | null
  children?: Topic[]
}

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

  // Sort topics by order within the same level and parent_id
  const sortedTopics = [...topics].sort((a, b) => {
    // If order is not defined, default to 1
    const orderA = a.order || 1
    const orderB = b.order || 1
    return orderA - orderB
  })

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
