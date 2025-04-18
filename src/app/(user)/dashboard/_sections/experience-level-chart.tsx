"use client"

import { useMemo } from "react"
import { Box, Typography } from "@mui/material"
import { Stack } from "@mui/material"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { experienceLevelData } from "@/types/dashboard/mock-data"
import { purple, error, success, info, warning } from "@/theme/colors"

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend)

interface ExperienceLevelChartProps {
  filters: { fromDate: string; toDate: string; region: string }
}

export default function ExperienceLevelChart({ filters }: ExperienceLevelChartProps) {
  // Filter data based on filters (in a real app, this would fetch from API)
  const filteredData = useMemo(() => {
    // This is a mock implementation - in a real app, you would filter the data based on the filters
    return experienceLevelData
  }, [])

  const chartData = useMemo(() => {
    return {
      labels: filteredData.map((item) => item.label),
      datasets: [
        {
          data: filteredData.map((item) => item.value),
          backgroundColor: [purple.main, error.main, info.main, warning.main, success.main],
          borderColor: [purple.dark, error.dark, info.dark, warning.dark, success.dark],
          borderWidth: 1,
        },
      ],
    }
  }, [filteredData])

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom" as const,
          labels: {
            boxWidth: 12,
            padding: 20,
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || ""
              const value = context.parsed || 0
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0)
              const percentage = Math.round((value / total) * 100)
              return `${label}: ${percentage}%`
            },
          },
        },
      },
      cutout: "60%",
    }
  }, [])

  return (
    <Stack>
      <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
        Tin tuyển dụng theo cấp độ kinh nghiệm
      </Typography>

      <Box sx={{ height: 300, position: "relative" }}>
        <Doughnut data={chartData} options={chartOptions} />
      </Box>
    </Stack>
  )
}
