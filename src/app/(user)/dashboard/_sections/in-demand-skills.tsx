"use client";

import type React from "react";

import { useMemo } from "react";
import { Typography, Link, Paper, Box } from "@mui/material";
import { inDemandSkillsData } from "@/types/dashboard/mock-data";
import RowStack from "@/components/row-stack";
import { CustomTable } from "@/components/custom-table";
import { getSkillTableConfig } from "./get-table-config";
import usePagination from "@/hooks/use-pagination";
import CustomPagination from "@/components/custom-pagination";

interface InDemandSkillsProps {
  filters: { fromDate: string; toDate: string; region: string };
}

export default function InDemandSkills({ filters }: InDemandSkillsProps) {
  const pagination = usePagination({
    count: inDemandSkillsData.length,
    initialRowsPerPage: 5,
  });

  const filteredData = useMemo(() => {
    return inDemandSkillsData;
  }, []);

  const visibleRows = useMemo(
    () =>
      filteredData.slice(
        pagination.page * pagination.rowsPerPage,
        pagination.page * pagination.rowsPerPage + pagination.rowsPerPage
      ),
    [filteredData, pagination.page, pagination.rowsPerPage]
  );

  return (
    <Paper elevation={1} sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Box p={2}>
        <RowStack justifyContent='space-between' mb={2}>
          <Typography variant='h6' fontWeight='medium'>
            Những kỹ năng cứng hàng đầu đang được yêu cầu
          </Typography>
          <Link
            href='#'
            underline='hover'
            color='primary'
            sx={{ fontSize: 14 }}
          >
            Tất cả
          </Link>
        </RowStack>
      </Box>

      <CustomTable
        rows={visibleRows}
        configs={getSkillTableConfig()}
        pagination={pagination}
      />
    </Paper>
  );
}
