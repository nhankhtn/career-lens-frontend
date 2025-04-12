"use client"

import { useMemo } from "react"
import { Box, Typography, useTheme } from "@mui/material"
import { Stack } from "@mui/material"
import RowStack from "@/components/row-stack"
import { recruitmentData } from "@/types/dashboard/mock-data"
import { blue, neutral } from "@/theme/colors"

export default function RecruitmentHeatmap() {
  const theme = useTheme()

  const months = useMemo(() => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], [])

  const weeks = useMemo(() => ["1st week", "2nd week", "3rd week", "4th week"], [])

  // Function to get color based on value
  const getColorIntensity = (value: number) => {
    if (value < 2000) return neutral[200]
    if (value < 10000) return blue.light
    return blue.dark
  }

  const renderLegend = useMemo(() => {
    return (
      <RowStack justifyContent="flex-end" gap={2} mb={2}>
        <RowStack>
          <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: neutral[200], mr: 0.5 }} />
          <Typography variant="caption">Dưới 1,999</Typography>
        </RowStack>
        <RowStack>
          <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: blue.light, mr: 0.5 }} />
          <Typography variant="caption">Từ 2,000 đến 9,999</Typography>
        </RowStack>
        <RowStack>
          <Box sx={{ width: 12, height: 12, borderRadius: "50%", bgcolor: blue.dark, mr: 0.5 }} />
          <Typography variant="caption">10,000+</Typography>
        </RowStack>
      </RowStack>
    )
  }, [])

  return (
    <Stack>
      {renderLegend}
      <Box sx={{ display: "grid", gridTemplateColumns: "auto repeat(12, 1fr)", gap: 1 }}>
        {/* Empty cell for top-left corner */}
        <Box></Box>

        {/* Month headers */}
        {months.map((month) => (
          <Typography key={month} variant="caption" align="center" sx={{ fontWeight: "medium" }}>
            {month}
          </Typography>
        ))}

        {/* Week rows with data cells */}
        {weeks.map((week, weekIndex) => (
          <>
            <Typography
              key={week}
              variant="caption"
              sx={{
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
                pr: 1,
              }}
            >
              {week}
            </Typography>

            {months.map((month, monthIndex) => {
              const value = recruitmentData[weekIndex]?.[monthIndex] || 0
              return (
                <Box
                  key={`${week}-${month}`}
                  sx={{
                    height: 40,
                    borderRadius: 1,
                    bgcolor: getColorIntensity(value),
                    transition: "all 0.2s",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: 1,
                    },
                  }}
                />
              )
            })}
          </>
        ))}
      </Box>
    </Stack>
  )
}
