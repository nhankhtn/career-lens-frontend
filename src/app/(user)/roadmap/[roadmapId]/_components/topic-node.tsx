"use client"

import type React from "react"

import { useState } from "react"
import {
  Box,
  Typography,
  Collapse,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Link as MuiLink,
  Tooltip,
} from "@mui/material"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import SchoolIcon from "@mui/icons-material/School"
import ArticleIcon from "@mui/icons-material/Article"
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import BuildIcon from "@mui/icons-material/Build"
import PersonIcon from "@mui/icons-material/Person"
import LinkIcon from "@mui/icons-material/Link"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import type { Topic, Resource } from "../../_data/roadmap-details"
import ResourceProgress from "./resource-progress"
import { priority } from "@/theme/colors"

interface TopicNodeProps {
  topic: Topic
  level: number
  expanded: boolean
  onToggle: () => void
}

// Update the TopicNode component to properly handle recursive rendering of children
export default function TopicNode({ topic, level, expanded, onToggle }: TopicNodeProps) {
  const [resourcesExpanded, setResourcesExpanded] = useState(false)
  const [childrenExpanded, setChildrenExpanded] = useState<Record<string, boolean>>({})
  const hasChildren = topic.children && topic.children.length > 0
  const hasResources = topic.resources && topic.resources.length > 0

  const handleResourcesToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setResourcesExpanded(!resourcesExpanded)
  }

  const handleChildToggle = (childId: string) => {
    setChildrenExpanded((prev) => ({
      ...prev,
      [childId]: !prev[childId],
    }))
  }

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "course":
        return <SchoolIcon fontSize="small" color="primary" />
      case "article":
        return <ArticleIcon fontSize="small" color="secondary" />
      case "video":
        return <VideoLibraryIcon fontSize="small" color="error" />
      case "book":
        return <MenuBookIcon fontSize="small" color="success" />
      case "project":
        return <BuildIcon fontSize="small" color="warning" />
      case "interview":
        return <PersonIcon fontSize="small" color="info" />
      case "resource":
        return <LinkIcon fontSize="small" color="primary" />
      default:
        return <MoreHorizIcon fontSize="small" color="action" />
    }
  }

  // Render priority indicator based on priority value (1-3)
  const renderPriorityIndicator = () => {
    // Priority 1 is highest (green), 2 is medium (purple), 3 is lowest (gray)
    let priorityIcon
    let priorityColor
    let priorityBgColor
    let priorityText

    switch (topic.priority) {
      case 1:
        priorityIcon = <CheckCircleIcon fontSize="small" />
        priorityColor = priority.high.main
        priorityBgColor = priority.high.light
        priorityText = "High Priority"
        break
      case 2:
        priorityIcon = <CheckCircleIcon fontSize="small" />
        priorityColor = priority.medium.main
        priorityBgColor = priority.medium.light
        priorityText = "Medium Priority"
        break
      case 3:
      default:
        priorityIcon = <CheckCircleIcon fontSize="small" />
        priorityColor = priority.low.main
        priorityBgColor = priority.low.light
        priorityText = "Low Priority"
        break
    }

    return (
      <Tooltip title={priorityText}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: priorityColor,
            bgcolor: priorityBgColor,
            borderRadius: "50%",
            width: 24,
            height: 24,
          }}
        >
          {priorityIcon}
        </Box>
      </Tooltip>
    )
  }

  // Sort children by order
  const sortedChildren = topic.children ? [...topic.children].sort((a, b) => a.order - b.order) : []

  return (
    <Box>
      {/* Topic Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          p: 2,
          bgcolor: level === 0 ? "background.default" : "background.paper",
          borderLeft:
            level > 0
              ? `4px solid ${
                  level === 1 ? "primary.main" : level === 2 ? "secondary.main" : level === 3 ? "info.main" : "divider"
                }`
              : "none",
          pl: level > 0 ? 2 + level * 0.5 : 2,
          cursor: hasChildren ? "pointer" : "default",
          "&:hover": {
            bgcolor: level === 0 ? "action.hover" : "background.default",
          },
        }}
        onClick={hasChildren ? onToggle : undefined}
      >
        {hasChildren && (
          <IconButton
            size="small"
            sx={{ mr: 1, transform: expanded ? "rotate(90deg)" : "rotate(0deg)" }}
            onClick={(e) => {
              e.stopPropagation()
              onToggle()
            }}
          >
            <ChevronRightIcon />
          </IconButton>
        )}

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant={level === 0 ? "h6" : "subtitle1"}
              sx={{
                fontWeight: level === 0 ? 600 : 500,
                fontSize: level === 0 ? "1.125rem" : level === 1 ? "1rem" : level === 2 ? "0.95rem" : "0.9rem",
              }}
            >
              {topic.title}
            </Typography>

            {/* Display order number */}
            <Tooltip title={`Order: ${topic.order}`}>
              <Chip
                label={`#${topic.order}`}
                size="small"
                sx={{
                  ml: 1,
                  height: 20,
                  fontSize: "0.7rem",
                  bgcolor: "info.light",
                  color: "info.dark",
                  fontWeight: 500,
                  border: 1,
                  borderColor: "info.main",
                }}
              />
            </Tooltip>
          </Box>

          {topic.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                display: level > 2 ? "none" : "block",
              }}
            >
              {topic.description}
            </Typography>
          )}
        </Box>

        {hasResources && (
          <Chip
            label={`${topic.resources.length} resource${topic.resources.length > 1 ? "s" : ""}`}
            size="small"
            sx={{ mr: 1 }}
            onClick={handleResourcesToggle}
          />
        )}

        {/* Display priority indicator on the right side */}
        {renderPriorityIndicator()}
      </Box>

      {/* Resources Collapse */}
      {hasResources && (
        <Collapse in={resourcesExpanded}>
          <Box sx={{ px: 2, py: 1, bgcolor: "background.default" }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Learning Resources
            </Typography>

            <List dense disablePadding>
              {topic.resources.map((resource: Resource) => (
                <ListItem
                  key={resource.id}
                  sx={{
                    px: 2,
                    py: 1,
                    mb: 1,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                  secondaryAction={<ResourceProgress resourceId={resource.id} topicId={topic.id} />}
                >
                  <Box sx={{ mr: 1.5, display: "flex", alignItems: "center" }}>{getResourceIcon(resource.type)}</Box>
                  <ListItemText
                    primary={
                      <MuiLink
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ textDecoration: "none" }}
                      >
                        {resource.title}
                      </MuiLink>
                    }
                    secondary={
                      <Chip
                        label={resource.type}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.7rem",
                          mt: 0.5,
                        }}
                      />
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Divider />
        </Collapse>
      )}

      {/* Children Collapse */}
      {hasChildren && (
        <Collapse in={expanded}>
          <Box sx={{ py: level === 0 ? 1 : 0 }}>
            {sortedChildren.map((child) => (
              <TopicNode
                key={child.id}
                topic={child}
                level={level + 1}
                expanded={!!childrenExpanded[child.id]}
                onToggle={() => handleChildToggle(child.id)}
              />
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  )
}
