"use client"

import type React from "react"
import type { SelectChangeEvent } from "@mui/material"

import { useCallback, useState } from "react"
import {
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material"
import RowStack from "../../../../components/row-stack"

interface DashboardFiltersProps {
    onFilterChange: (filters: {
        fromDate: string
        toDate: string
        region: string
    }) => void
}

export default function DashboardFilters({ onFilterChange }: DashboardFiltersProps) {
    const [fromDate, setFromDate] = useState("2023-01-01")
    const [toDate, setToDate] = useState("2023-12-31")
    const [region, setRegion] = useState("all")

    const handleFilterChange = useCallback(() => {
        onFilterChange({
            fromDate,
            toDate,
            region,
        })
    }, [fromDate, toDate, region, onFilterChange])

    const handleFromDateChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setFromDate(event.target.value)
            setTimeout(() => {
                handleFilterChange()
            }, 0)
        },
        [handleFilterChange],
    )

    const handleToDateChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setToDate(event.target.value)
            setTimeout(() => {
                handleFilterChange()
            }, 0)
        },
        [handleFilterChange],
    )

    const handleRegionChange = useCallback(
        (event: SelectChangeEvent) => {
            setRegion(event.target.value)
            setTimeout(() => {
                handleFilterChange()
            }, 0)
        },
        [handleFilterChange],
    )

    return (
        <RowStack spacing={1} justifyContent="flex-end">
            <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel id="region-label">Khu vực</InputLabel>
                <Select
                    labelId="region-label"
                    id="region-select"
                    value={region}
                    label="Khu vực"
                    onChange={handleRegionChange}
                >
                    <MenuItem value="all">Tất cả</MenuItem>
                    <MenuItem value="north">Miền Bắc</MenuItem>
                    <MenuItem value="central">Miền Trung</MenuItem>
                    <MenuItem value="south">Miền Nam</MenuItem>
                </Select>
            </FormControl>

            <TextField
                id="from-date"
                label="Từ ngày"
                type="date"
                value={fromDate}
                onChange={handleFromDateChange}
                size="small"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{
                    width: 150,
                    
                }}
            />


            <TextField
                id="to-date"
                label="Đến ngày"
                type="date"
                value={toDate}
                onChange={handleToDateChange}
                size="small"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                sx={{ width: 150 }}
            />
        </RowStack>
    )
}
