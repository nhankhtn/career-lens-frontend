"use client"

import { type ReactNode, useCallback, useState } from "react"
import { Typography, IconButton, Tooltip, CircularProgress } from "@mui/material"
import { Stack } from "@mui/material"
import { Refresh as RefreshIcon, MoreVert as MoreVertIcon } from "@mui/icons-material"
import RowStack from "@/components/row-stack"

interface ChartContainerProps {
  title: string
  children: ReactNode
  isLoading?: boolean
  onRefresh?: () => void
  actionComponent?: ReactNode
  height?: number | string
}

export default function ChartContainer({
  title,
  children,
  isLoading = false,
  onRefresh,
  actionComponent,
  height = 300,
}: ChartContainerProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = useCallback(() => {
    if (onRefresh) {
      setIsRefreshing(true)
      Promise.resolve(onRefresh()).finally(() => {
        setTimeout(() => setIsRefreshing(false), 500)
      })
    }
  }, [onRefresh])

  return (
    <Stack sx={{ height: "100%" }}>
      <RowStack justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight="medium">
          {title}
        </Typography>
        <RowStack alignItems="center">
          {actionComponent}

          {onRefresh && (
            <Tooltip title="Làm mới">
              <IconButton size="small" onClick={handleRefresh} disabled={isRefreshing}>
                {isRefreshing ? <CircularProgress size={18} /> : <RefreshIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Thêm tùy chọn">
            <IconButton size="small">
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </RowStack>
      </RowStack>

      <Stack
        sx={{
          position: "relative",
          height,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? <CircularProgress /> : children}
      </Stack>
    </Stack>
  )
}
