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
  useMediaQuery,
  useTheme,
} from "@mui/material"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked"
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord"
import type { Topic, Resource } from "../../_data/roadmap-details"
import ResourceProgress from "./resource-progress"
import { priority } from "@/theme/colors"
import { getResourceIcon } from "@/utils/icon-helper"

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
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

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

  // Render priority indicator based on priority value (1-3)
  const renderPriorityIndicator = () => {
    // Priority 1 is highest (green), 2 is medium (purple), 3 is lowest (gray)
    let priorityIcon
    let priorityColor
    let priorityBgColor
    let priorityText

    switch (topic.priority) {
      case 1:
        priorityIcon = <CheckCircleIcon fontSize={isMobile ? "small" : "small"} />
        priorityColor = priority.high.main
        priorityBgColor = priority.high.light
        priorityText = "High Priority"
        break
      case 2:
        priorityIcon = <RadioButtonCheckedIcon fontSize={isMobile ? "small" : "small"} />
        priorityColor = priority.medium.main
        priorityBgColor = priority.medium.light
        priorityText = "Medium Priority"
        break
      case 3:
      default:
        priorityIcon = <FiberManualRecordIcon fontSize={isMobile ? "small" : "small"} />
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
            width: isMobile ? 20 : 24,
            height: isMobile ? 20 : 24,
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
          p: isMobile ? 1.5 : 2,
          bgcolor: level === 0 ? "background.default" : "background.paper",
          borderLeft:
            level > 0
              ? `4px solid ${
                  level === 1 ? "primary.main" : level === 2 ? "secondary.main" : level === 3 ? "info.main" : "divider"
                }`
              : "none",
          pl: level > 0 ? (isMobile ? 1.5 : 2) + level * (isMobile ? 0.3 : 0.5) : isMobile ? 1.5 : 2,
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
            sx={{
              mr: isMobile ? 0.5 : 1,
              transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
              padding: isMobile ? 0.5 : 1,
            }}
            onClick={(e) => {
              e.stopPropagation()
              onToggle()
            }}
          >
            <ChevronRightIcon fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        )}

        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", flexWrap: isMobile ? "wrap" : "nowrap" }}>
            <Typography
              variant={level === 0 ? (isMobile ? "subtitle1" : "h6") : isMobile ? "body2" : "subtitle1"}
              sx={{
                fontWeight: level === 0 ? 600 : 500,
                fontSize: isMobile
                  ? level === 0
                    ? "1rem"
                    : level === 1
                      ? "0.9rem"
                      : level === 2
                        ? "0.85rem"
                        : "0.8rem"
                  : level === 0
                    ? "1.125rem"
                    : level === 1
                      ? "1rem"
                      : level === 2
                        ? "0.95rem"
                        : "0.9rem",
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
                  height: isMobile ? 16 : 20,
                  fontSize: isMobile ? "0.6rem" : "0.7rem",
                  bgcolor: "info.light",
                  color: "info.dark",
                  fontWeight: 500,
                  border: 1,
                  borderColor: "info.main",
                }}
              />
            </Tooltip>
          </Box>

          {topic.description && !isMobile && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                mt: 0.5,
                display: level > 2 ? "none" : "block",
                fontSize: isMobile ? "0.75rem" : "0.875rem",
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
            sx={{
              mr: 1,
              height: isMobile ? 24 : 32,
              fontSize: isMobile ? "0.7rem" : "0.75rem",
            }}
            onClick={handleResourcesToggle}
          />
        )}

        {/* Display priority indicator on the right side */}
        {renderPriorityIndicator()}
      </Box>

      {/* Resources Collapse */}
      {hasResources && (
        <Collapse in={resourcesExpanded}>
          <Box sx={{ px: isMobile ? 1.5 : 2, py: isMobile ? 0.5 : 1, bgcolor: "background.default" }}>
            <Typography
              variant="subtitle2"
              sx={{ mb: isMobile ? 0.5 : 1, fontWeight: 600, fontSize: isMobile ? "0.8rem" : "0.875rem" }}
            >
              Learning Resources
            </Typography>

            <List dense disablePadding>
              {topic.resources.map((resource: Resource) => (
                <ListItem
                  key={resource.id}
                  sx={{
                    px: isMobile ? 1.5 : 2,
                    py: isMobile ? 0.5 : 1,
                    mb: isMobile ? 0.5 : 1,
                    bgcolor: "background.paper",
                    borderRadius: 1,
                    border: "1px solid",
                    borderColor: "divider",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                  }}
                  secondaryAction={isMobile ? null : <ResourceProgress resourceId={resource.id} topicId={topic.id} />}
                >
                  <Box
                    sx={{
                      mr: isMobile ? 0 : 1.5,
                      mb: isMobile ? 0.5 : 0,
                      display: "flex",
                      alignItems: "center",
                      width: isMobile ? "100%" : "auto",
                    }}
                  >
                    <Box sx={{ mr: 1, display: "flex", alignItems: "center" }}>{getResourceIcon(resource.type)}</Box>
                    <ListItemText
                      primary={
                        <MuiLink
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          sx={{
                            textDecoration: "none",
                            fontSize: isMobile ? "0.8rem" : "0.875rem",
                            display: "block",
                            mb: isMobile ? 0.5 : 0,
                          }}
                        >
                          {resource.title}
                        </MuiLink>
                      }
                      secondary={
                        <Chip
                          label={resource.type}
                          size="small"
                          sx={{
                            height: isMobile ? 16 : 20,
                            fontSize: isMobile ? "0.6rem" : "0.7rem",
                            mt: 0.5,
                          }}
                        />
                      }
                    />
                  </Box>

                  {isMobile && (
                    <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end", mt: 1 }}>
                      <ResourceProgress resourceId={resource.id} topicId={topic.id} />
                    </Box>
                  )}
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
          <Box sx={{ py: level === 0 ? (isMobile ? 0.5 : 1) : 0 }}>
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
