"use client"

import { useCallback, useMemo, useState } from "react"
import { Container, Typography, Box, useMediaQuery, useTheme } from "@mui/material"
import { Stack } from "@mui/material"
import RecruitmentHeatmap from "./recruitment-heatmap"
import TopPositions from "./top-positions"
import TopCompanies from "./top-companies"
import ExperienceLevelChart from "./experience-level-chart"
import InDemandSkills from "./in-demand-skills"
import DashboardFilters from "@/app/(user)/dashboard/_components/filter-time-region"
import { neutral } from "@/theme/colors"
import RowStack from "@/components/row-stack"

export default function DashboardContent() {
  const pageTitle = useMemo(() => "Xu hướng tuyển dụng IT", [])
  const [filters, setFilters] = useState({
    fromDate: "2023-01-01",
    toDate: "2023-12-31",
    region: "all",
  })
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"))

  const handleFilterChange = useCallback((newFilters: { fromDate: string; toDate: string; region: string }) => {
    console.log("Filters changed:", newFilters)
    setFilters(newFilters)
  }, [])

  return (
    <Stack sx={{ bgcolor: neutral[50], minHeight: "100vh", pb: 4 }}>
      <Container maxWidth="lg" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        <RowStack
          justifyContent="space-between"
          sx={{
            my: { xs: 2, sm: 3 },
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "flex-start" : "center",
            gap: isMobile ? 2 : 0,
          }}
        >
          <Typography
            variant={isMobile ? "h4" : "h3"}
            component="h1"
            fontWeight="bold"
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.25rem" } }}
          >
            {pageTitle}
          </Typography>
          <DashboardFilters onFilterChange={handleFilterChange} />
        </RowStack>

        {/* Heatmap Section - Full Width */}
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 2,
            p: { xs: 2, sm: 3 },
            mb: { xs: 2, sm: 3 },
            boxShadow: `0 1px 3px ${neutral[300]}`,
            overflowX: "auto",
          }}
        >
          <Typography variant="h6" fontWeight="medium" sx={{ mb: 2 }}>
            Tin tuyển dụng IT
          </Typography>
          <RecruitmentHeatmap />
        </Box>

        {/* Top Positions and Top Companies - First Row, Full Width */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, sm: 3 },
            mb: { xs: 2, sm: 3 },
            width: "100%",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              p: { xs: 2, sm: 3 },
              flex: 1,
              boxShadow: `0 1px 3px ${neutral[300]}`,
              width: "100%",
            }}
          >
            <TopPositions filters={filters} />
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              p: { xs: 2, sm: 3 },
              flex: 1,
              boxShadow: `0 1px 3px ${neutral[300]}`,
              width: "100%",
            }}
          >
            <TopCompanies filters={filters} />
          </Box>
        </Box>

        {/* Experience Level and In-Demand Skills - Second Row */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 2, sm: 3 },
            width: "100%",
          }}
        >
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              p: { xs: 2, sm: 3 },
              flex: 5,
              boxShadow: `0 1px 3px ${neutral[300]}`,
              width: "100%",
            }}
          >
            <ExperienceLevelChart filters={filters} />
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 2,
              p: { xs: 2, sm: 3 },
              flex: 7,
              boxShadow: `0 1px 3px ${neutral[300]}`,
              width: "100%",
            }}
          >
            <InDemandSkills filters={filters} />
          </Box>
        </Box>
      </Container>
    </Stack>
  )
}
