"use client"

import type React from "react"

import { useCallback, useMemo, useState } from "react"
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Link,
  IconButton,
  Paper,
  Box,
} from "@mui/material"
import { Stack } from "@mui/material"
import { MoreVert as MoreVertIcon } from "@mui/icons-material"
import { inDemandSkillsData } from "@/types/dashboard/mock-data"
import RowStack from "@/components/row-stack"

interface InDemandSkillsProps {
  filters: { fromDate: string; toDate: string; region: string }
}

export default function InDemandSkills({ filters }: InDemandSkillsProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }, [])

  const filteredData = useMemo(() => {
    console.log("Applying filters to in-demand skills:", filters)
    return inDemandSkillsData
  }, [filters])

  const visibleRows = useMemo(
    () => filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [filteredData, page, rowsPerPage],
  )

  return (
    <Paper elevation={1} sx={{ borderRadius: 2, overflow: "hidden" }}>
      <Box p={2}>
        <RowStack justifyContent="space-between" mb={2}>
          <Typography variant="h6" fontWeight="medium">
            Những kỹ năng cứng hàng đầu đang được yêu cầu
          </Typography>
          <Link href="#" underline="hover" color="primary" sx={{ fontSize: 14 }}>
            Tất cả
          </Link>
        </RowStack>
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>Kỹ năng</TableCell>
              <TableCell align="right">Tần suất trong tuyển dụng</TableCell>
              <TableCell align="right">Tần suất trong ứng viên</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.skill}
                </TableCell>
                <TableCell align="right">{row.demandPercentage}</TableCell>
                <TableCell align="right">{row.supplyPercentage}</TableCell>
                <TableCell align="right">
                  <IconButton size="small">
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ px: 2, pb: 1 }}
      />
    </Paper>
  )
}
