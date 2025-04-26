import { Box, Card, CardContent, Typography, Grid } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

interface CareerAnalyticsProps {
  careerHistory?: {
    salary_prediction: {
      min_salary: number;
      max_salary: number;
      avg_salary: number;
      trend: string;
      confidence: number;
    };
    job_postings_prediction: {
      trend: string;
      total_openings: number;
      confidence: number;
      average_openings_per_posting: number;
    };
  };
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
};

// Mock data for salary trends
const mockSalaryData = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
  min: [15000000, 15500000, 16000000, 16500000, 17000000, 17500000],
  avg: [18000000, 18500000, 19000000, 19500000, 20000000, 20500000],
  max: [22000000, 22500000, 23000000, 23500000, 24000000, 24500000],
};

// Mock data for job openings
const mockJobData = {
  labels: ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6"],
  openings: [120, 150, 180, 200, 220, 250],
};

// Mock career history data
const mockCareerHistory = {
  salary_prediction: {
    min_salary: 15000000,
    max_salary: 25000000,
    avg_salary: 20000000,
    trend: "up",
    confidence: 0.85,
  },
  job_postings_prediction: {
    trend: "up",
    total_openings: 250,
    confidence: 0.75,
    average_openings_per_posting: 2.5,
  },
};

export function CareerAnalytics({ careerHistory }: CareerAnalyticsProps) {
  const data = careerHistory || mockCareerHistory;
  const { salary_prediction, job_postings_prediction } = data;

  // Dữ liệu cho biểu đồ lương
  const salaryChartData = {
    labels: mockSalaryData.labels,
    datasets: [
      {
        label: "Lương tối thiểu",
        data: mockSalaryData.min,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
      {
        label: "Lương trung bình",
        data: mockSalaryData.avg,
        borderColor: "rgb(255, 159, 64)",
        tension: 0.1,
      },
      {
        label: "Lương tối đa",
        data: mockSalaryData.max,
        borderColor: "rgb(255, 99, 132)",
        tension: 0.1,
      },
    ],
  };

  // Dữ liệu cho biểu đồ việc làm
  const jobChartData = {
    labels: mockJobData.labels,
    datasets: [
      {
        label: "Số lượng việc làm",
        data: mockJobData.openings,
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            if (context.dataset.label === "Số lượng việc làm") {
              return context.dataset.label + ": " + context.raw;
            }
            return context.dataset.label + ": " + formatCurrency(context.raw);
          },
        },
      },
    },
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={3}>
        {/* Biểu đồ lương */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Dự đoán mức lương
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line options={chartOptions} data={salaryChartData} />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Mức lương dự kiến:{" "}
                  {formatCurrency(salary_prediction.min_salary)} -{" "}
                  {formatCurrency(salary_prediction.max_salary)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mức lương trung bình:{" "}
                  {formatCurrency(salary_prediction.avg_salary)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Xu hướng: {salary_prediction.trend === "up" ? "Tăng" : "Giảm"}{" "}
                  (Độ tin cậy: {(salary_prediction.confidence * 100).toFixed(1)}
                  %)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Biểu đồ việc làm */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Dự đoán cơ hội việc làm
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line options={chartOptions} data={jobChartData} />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Tổng số vị trí tuyển dụng:{" "}
                  {job_postings_prediction.total_openings}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Số lượng trung bình mỗi vị trí:{" "}
                  {job_postings_prediction.average_openings_per_posting}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Xu hướng:{" "}
                  {job_postings_prediction.trend === "up" ? "Tăng" : "Giảm"} (Độ
                  tin cậy:{" "}
                  {(job_postings_prediction.confidence * 100).toFixed(1)}%)
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
