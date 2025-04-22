"use client";

import { useMemo } from "react";
import { Typography, Link, Box, Stack } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from "chart.js";
import { topCompaniesData } from "@/types/dashboard/mock-data";
import RowStack from "@/components/row-stack";
import { blue, error, success } from "@/theme/colors";
import { StatisticFilter } from "./filter-config";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface TopCompaniesProps {
  filter: StatisticFilter;
}

export default function TopCompanies({ filter }: TopCompaniesProps) {
  const filteredData = useMemo(() => {
    return topCompaniesData; // Giả lập: dùng toàn bộ data không lọc
  }, []);

  const chartData: ChartData<"bar"> = useMemo(
    () => ({
      labels: filteredData.map((item) => item.company),
      datasets: [
        {
          label: "Số bài đăng trong 1 tháng",
          data: filteredData.map((item) => item.junior),
          backgroundColor: blue.main,
        },
        {
          label: "Lương trung bình",
          data: filteredData.map((item) => item.middle),
          backgroundColor: error.main,
        },
        {
          label: "Lương tối đa",
          data: filteredData.map((item) => item.senior),
          backgroundColor: success.main,
        },
      ],
    }),
    [filteredData],
  );

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top" as const,
          align: "end" as const,
          labels: {
            boxWidth: 12,
            usePointStyle: true,
            pointStyle: "circle" as const,
          },
        },
        tooltip: {
          mode: "index" as const,
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
          },
          ticks: {
            precision: 0,
          },
        },
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
        },
      },
    }),
    [],
  );

  return (
    <Stack>
      <RowStack justifyContent="space-between" mb={2}>
        <Typography variant="h6" fontWeight="medium">
          Top 5 công ty trong ngành IT
        </Typography>
        <Link href="#" underline="hover" color="primary" sx={{ fontSize: 14 }}>
          Tất cả
        </Link>
      </RowStack>
      <Box sx={{ height: 300 }}>
        <Bar data={chartData} options={chartOptions as ChartOptions<"bar">} />
      </Box>
    </Stack>
  );
}
