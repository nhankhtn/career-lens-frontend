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
import RowStack from "@/components/row-stack";
import { blue, error, success } from "@/theme/colors";
import { CompanyJobStats } from "@/api/job-postings";
import EmptyState from "@/components/empty-state";

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
  data: CompanyJobStats[];
}

export default function TopCompanies({ data }: TopCompaniesProps) {
  const chartData: ChartData<"bar"> = useMemo(
    () => ({
      labels: data.map((item) => item.name),
      datasets: [
        {
          label: "Số bài đăng trong 1 tháng",
          data: data.map((item) => item.job_count),
          backgroundColor: blue.main,
        },
        {
          label: "Lương trung bình",
          data: data.map((item) => item.average_salary),
          backgroundColor: error.main,
        },
        {
          label: "Số lượng IT trung bình",
          data: data.map((item) => item.average_it_count),
          backgroundColor: success.main,
        },
      ],
    }),
    [data],
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
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        sx={{ height: 300 }}
      >
        {data.length === 0 ? (
          <EmptyState
            width={300}
            height={200}
            title="Hiện chưa có số liệu thống kê"
          />
        ) : (
          <Bar data={chartData} options={chartOptions as ChartOptions<"bar">} />
        )}
      </Stack>
    </Stack>
  );
}
