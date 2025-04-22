"use client";

import { useCallback, useMemo, useState } from "react";
import { Typography, IconButton, Tooltip, Box } from "@mui/material";
import { Stack } from "@mui/material";
import { FilterList as FilterIcon } from "@mui/icons-material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip as ChartTooltip,
} from "chart.js";
import { topPositionsData } from "@/types/dashboard/mock-data";
import RowStack from "@/components/row-stack";
import { warning } from "@/theme/colors";
import { StatisticFilter } from "./filter-config";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip);

interface TopPositionsProps {
  filter: StatisticFilter;
}

export default function TopPositions({ filter }: TopPositionsProps) {
  const [highlightedIndex, setHighlightedIndex] = useState<number | null>(null);

  const handleBarHover = useCallback((index: number | null) => {
    setHighlightedIndex(index);
  }, []);

  // Filter data based on filters (in a real app, this would fetch from API)
  const filteredData = useMemo(() => {
    // This is a mock implementation - in a real app, you would filter the data based on the filters
    return topPositionsData;
  }, []);

  const chartData = useMemo(() => {
    return {
      labels: filteredData.map((item) => item.position),
      datasets: [
        {
          data: filteredData.map((item) => item.count),
          backgroundColor: filteredData.map((_, index) =>
            index === highlightedIndex ? warning.main : warning.light,
          ),
          borderColor: warning.main,
          borderWidth: 1,
          borderRadius: 4,
          barThickness: 30,
        },
      ],
    };
  }, [filteredData, highlightedIndex]);

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: (context: any) => `${context.parsed.y} vị trí`,
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: true,
            drawBorder: false,
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
      onHover: (_: any, elements: any[]) => {
        if (elements && elements.length) {
          handleBarHover(elements[0].index);
        } else {
          handleBarHover(null);
        }
      },
    };
  }, [handleBarHover]);

  return (
    <Stack>
      <RowStack justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="medium">
          5 vị trí vị trí có nhu cầu cao nhất
        </Typography>
        <RowStack>
          <Tooltip title="Tất cả">
            <Typography
              variant="body2"
              color="primary"
              sx={{ cursor: "pointer", textDecoration: "underline", mr: 1 }}
            >
              Tất cả
            </Typography>
          </Tooltip>
          {/* <Tooltip title="Bộ lọc">
            <IconButton size="small">
              <FilterIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
        </RowStack>
      </RowStack>

      <Box sx={{ height: 300 }}>
        <Bar data={chartData} options={chartOptions} />
      </Box>
    </Stack>
  );
}
