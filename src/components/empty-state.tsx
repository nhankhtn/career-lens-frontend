import React from "react";
import { Typography, Stack, Box, Paper, StackProps } from "@mui/material";
import { neutral } from "@/theme/colors";
import LazyLottie from "./lazy-lottie";

interface EmptyStateListProps extends StackProps {
  width: number;
  height: number;
  title?: string;
  isMobile?: boolean;
}

function EmptyStateList({
  width,
  height,
  title,
  isMobile,
  ...stackProps
}: EmptyStateListProps) {
  return (
    <Stack alignItems={"center"} justifyContent={"center"} {...stackProps}>
      <LazyLottie
        path='/assets/lottie/empty-state.json'
        width={width}
        height={height}
      />
      {!isMobile ? (
        <Paper
          sx={{
            backgroundColor: "neutral.800",
            borderRadius: "16px",
            display: "flex",
            gap: 0.25,
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 16px",
            border: `1px solid secondary.dark`,
            width: "100%",
          }}
          elevation={12}
        >
          <Typography
            variant='subtitle1'
            color={neutral[100]}
            textAlign={"center"}
            sx={{ whiteSpace: "pre-line" }}
          >
            {title}
          </Typography>
        </Paper>
      ) : (
        <Typography
          variant='caption_400'
          color={"text.secondary"}
          textAlign={"center"}
          sx={{ whiteSpace: "pre-line" }}
        >
          {title}
        </Typography>
      )}
    </Stack>
  );
}

export default EmptyStateList;
