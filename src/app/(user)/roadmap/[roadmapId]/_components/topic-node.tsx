"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  Button,
  CircularProgress,
} from "@mui/material"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ResourceProgress from "./resource-progress"
import { priority } from "@/theme/colors"
import type { Topic } from "@/types/topic"
import { getResourceIcon } from "@/utils/icon-helper"

interface TopicNodeProps {
  topic: Topic
  level: number
  expanded: boolean
  onToggle: () => void
  fetchChildren?: (parentId: string) => Promise<Topic[]>
}

export default function TopicNode({ topic, level, expanded, onToggle, fetchChildren }: TopicNodeProps) {
  const [childTopics, setChildTopics] = useState<Topic[]>([])
  const [loadingChildren, setLoadingChildren] = useState(false)
  const [hasChildrenToFetch, setHasChildrenToFetch] = useState(true)
  const [resourcesExpanded, setResourcesExpanded] = useState(false)
  const [childrenExpanded, setChildrenExpanded] = useState<Record<string, boolean>>({})
  const [showFullDescription, setShowFullDescription] = useState(false)

  // Ensure resources is always an array
  const resources = topic.resources || []
  const hasResources = resources.length > 0

  // Check if we need to fetch children when expanded changes
  useEffect(() => {
    const fetchChildTopicsIfNeeded = async () => {
      // Only fetch if expanded, we have a fetchChildren function, and we haven't fetched yet
      if (expanded && fetchChildren && hasChildrenToFetch && childTopics.length === 0) {
        setLoadingChildren(true)
        try {
          const fetchedChildren = await fetchChildren(topic.id)

          // Filter to only include direct children of this topic
          const directChildren = fetchedChildren.filter((child) => child.parent_id === topic.id)

          setChildTopics(directChildren)

          // If we got no children, mark that we don't need to fetch again
          if (directChildren.length === 0) {
            setHasChildrenToFetch(false)
          }
        } catch (error) {
          console.error("Error fetching child topics:", error)
          setHasChildrenToFetch(false)
        } finally {
          setLoadingChildren(false)
        }
      }
    }

    fetchChildTopicsIfNeeded()
  }, [expanded, fetchChildren, topic.id, hasChildrenToFetch, childTopics.length])

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

  const handleDescriptionToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowFullDescription(!showFullDescription)
  }

  // Truncate description to approximately one line (around 100 characters)
  const truncateDescription = (text: string, maxLength = 100) => {
    if (!text) return ""
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  // Render priority indicator based on priority value (1-3)
  const renderPriorityIndicator = () => {
    // If priority is null or undefined, don't show the indicator
    if (topic.priority === null || topic.priority === undefined) {
      return null
    }

    let priorityColor
    let priorityBgColor
    let priorityText

    switch (topic.priority) {
      case 1:
        priorityColor = priority.high.main
        priorityBgColor = priority.high.light
        priorityText = "Personal Recommendation / Opinion"
        break
      case 2:
        priorityColor = priority.medium.main
        priorityBgColor = priority.medium.light
        priorityText = "Alternative Option / Pick this or purple"
        break
      case 3:
      default:
        priorityColor = priority.low.main
        priorityBgColor = priority.low.light
        priorityText = "Order not strict / Learn anytime"
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
          <CheckCircleIcon fontSize="small" />
        </Box>
      </Tooltip>
    )
  }

  // Sort children by order
  const sortedChildren =
    childTopics.length > 0
      ? [...childTopics].sort((a, b) => {
          // If order is not defined, default to 1
          const orderA = a.order || 1
          const orderB = b.order || 1
          return orderA - orderB
        })
      : []

  // Determine if we should show the arrow icon
  // Only show if we have children or if we haven't determined yet (hasChildrenToFetch is true)
  const hasChildren = topic.order !== null && topic.order !== undefined

  // Only show progress for topics with order
  const showProgress = topic.order !== null && topic.order !== undefined

  return (
    <Box>
      {/* Topic Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start", // Changed from center to flex-start to align items at the top
          p: 2,
          bgcolor: level === 0 ? "background.default" : "background.paper",
          borderLeft:
            level > 0
              ? `4px solid ${
                  level === 1 ? "primary.main" : level === 2 ? "secondary.main" : level === 3 ? "info.main" : "divider"
                }`
              : "none",
          pl: level > 0 ? 2 + level * 1.5 : 2, // Increased indentation for child topics
          cursor: "pointer", // Make all topics clickable
          "&:hover": {
            bgcolor: level === 0 ? "action.hover" : "background.default",
          },
        }}
        onClick={onToggle} // Make all topics clickable
      >
        {/* Always show arrow for all topics */}
        {hasChildren ? (
          <IconButton
            size="small"
            sx={{
              mr: 1,
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease-in-out",
              border: "1px solid",
              borderColor: "divider",
              bgcolor: "background.paper",
              "&:hover": {
                bgcolor: "primary.light",
                color: "primary.contrastText",
              },
              mt: 0.5, // Added margin top to align with the first line of text
            }}
            onClick={(e) => {
              e.stopPropagation()
              onToggle()
            }}
          >
            {loadingChildren ? <CircularProgress size={16} /> : <ChevronRightIcon />}
          </IconButton>
        ) : (
          <Box sx={{ width: 32, mr: 1 }} /> // Empty space for alignment when no arrow
        )}

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
              <Typography
                variant={level === 0 ? "h6" : "subtitle1"}
                sx={{
                  fontWeight: level === 0 ? 600 : 500,
                  fontSize: level === 0 ? "1.125rem" : level === 1 ? "1rem" : level === 2 ? "0.95rem" : "0.9rem",
                }}
              >
                {topic.title}
              </Typography>

              {/* Display order number only if order is not null */}
              {topic.order !== null && topic.order !== undefined && (
                <Tooltip title={`Order: ${topic.order}`}>
                  <Chip
                    label={`Bài ${topic.order}`}
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
              )}
            </Box>

            {/* Topic Progress Component - Only for topics with order */}
            {showProgress && (
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }} onClick={(e) => e.stopPropagation()}>
                <ResourceProgress resourceId={`topic-${topic.id}`} topicId={topic.id} />
              </Box>
            )}
          </Box>

          {topic.description && (
            <Box sx={{ mt: 0.5 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  display: level > 2 && !showFullDescription ? "none" : "block",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {showFullDescription ? topic.description : truncateDescription(topic.description)}
              </Typography>
              {topic.description.length > 100 && (
                <Button
                  size="small"
                  onClick={handleDescriptionToggle}
                  sx={{ mt: 0.5, p: 0, minWidth: "auto", textTransform: "none", color: "primary.main" }}
                >
                  {showFullDescription ? "Xem ít" : "Xem thêm"}
                </Button>
              )}
            </Box>
          )}

          {/* Footer section with resources and priority indicator */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1, justifyContent: "space-between" }}>
            {/* Resources chip */}
            <Box>
              {hasResources && (
                <Chip
                  label={`${resources.length} resource${resources.length > 1 ? "s" : ""}`}
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={handleResourcesToggle}
                />
              )}
            </Box>

            {/* Priority indicator */}
            {renderPriorityIndicator()}
          </Box>
        </Box>
      </Box>

      {/* Resources Collapse - Now appears directly under the topic node */}
      {hasResources && (
        <Collapse in={resourcesExpanded}>
          <Box sx={{ px: 2, py: 1, bgcolor: "background.default" }}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Tài nguyên học tập
            </Typography>

            <List dense disablePadding>
              {resources.map((resource, index) => (
                <ListItem
                  key={`${topic.id}-resource-${index}`}
                  sx={{
                    px: 2,
                    py: 1,
                    mb: 1,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Box sx={{ mr: 1.5, display: "flex", alignItems: "center" }}>{getResourceIcon(resource.type)}</Box>
                  <ListItemText
                    primary={
                      <MuiLink
                        href={resource.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ textDecoration: "none" }}
                      >
                        {resource.title || "Untitled Resource"}
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
      <Collapse in={expanded}>
        <Box sx={{ pl: 4 }}>
          {loadingChildren ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            sortedChildren.map((child) => (
              <TopicNode
                key={child.id}
                topic={child}
                level={level + 1}
                expanded={!!childrenExpanded[child.id]}
                onToggle={() => handleChildToggle(child.id)}
                fetchChildren={fetchChildren}
              />
            ))
          )}
        </Box>
      </Collapse>
    </Box>
  )
}
