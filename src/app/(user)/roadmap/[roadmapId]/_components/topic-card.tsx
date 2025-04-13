"use client"

import { useState } from "react"
import { Card, CardContent, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import type { TopicWithResources } from "../../_data/roadmap-details"
import ResourceItem from "./resource-item"

interface TopicCardProps {
  topic: TopicWithResources
  index: number
}

export default function TopicCard({ topic, index }: TopicCardProps) {
  const [expanded, setExpanded] = useState(false)

  const handleAccordionChange = () => {
    setExpanded(!expanded)
  }

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent sx={{ p: 0 }}>
        <Box
          sx={{
            p: 2,
            borderBottom: expanded ? "1px solid #e2e8f0" : "none",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              bgcolor: "#3f51b5",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              fontSize: "0.875rem",
            }}
          >
            {index}
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 500, flex: 1 }}>
            {topic.title}
          </Typography>
        </Box>

        <Accordion
          expanded={expanded}
          onChange={handleAccordionChange}
          disableGutters
          elevation={0}
          sx={{
            "&:before": {
              display: "none",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              px: 2,
              py: 0,
              minHeight: 48,
              "&.Mui-expanded": {
                minHeight: 48,
              },
              "& .MuiAccordionSummary-content": {
                margin: 0,
                "&.Mui-expanded": {
                  margin: 0,
                },
              },
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {expanded ? "Hide resources" : "Show recommended resources"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2, py: 1 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {topic.description}
              </Typography>
            </Box>

            {topic.resources.map((resource, idx) => (
              <ResourceItem key={idx} resource={resource} topicTitle={topic.title} />
            ))}
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  )
}
