"use client"

import { useState } from "react"
import { Box, Paper } from "@mui/material"
import TopicNode from "./topic-node"
import { TopicApi } from "@/api/topic"
import type { Topic } from "@/types/topic"

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

  // Function to fetch child topics for a parent topic
  const fetchChildTopics = async (parentId: string): Promise<Topic[]> => {
    try {
      // Call the API directly to get the topic details
      const response = await TopicApi.getTopicById(parentId)

      // Return the child topics from the API response
      return response.childs || []
    } catch (error) {
      console.error("Error fetching child topics:", error)
      return []
    }
  }

  // Sort topics by order
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
            fetchChildren={fetchChildTopics}
          />
        </Paper>
      ))}
    </Box>
  )
}
