"use client";

import {
  Button,
  Chip,
  Paper,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { paths } from "@/paths";
import { CareerList } from "@/types/career";
import { useRouter } from "next/navigation";
import RowStack from "@/components/row-stack";
import DevelopmentTooltip from "@/components/development-tooltip";

const CareerItem = ({ career }: { career: CareerList }) => {
  const router = useRouter();
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  );

  const maxVisibleSkills = isMobile ? 2 : 3;

  return (
    <Paper
      elevation={3}
      sx={{
        height: "100%",
        borderRadius: 3,
        p: 2,
        backgroundColor: "white",
        border: "1px solid #D6D9FF",
        transition: "transform 0.2s, boxShadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
          borderColor: "#6366F1",
        },
      }}
    >
      <Stack height={"100%"}>
        <Stack flex={1}>
          <RowStack justifyContent={"space-between"}>
            <Typography fontWeight="bold">{career.name}</Typography>
            <Chip label={`Mức độ phù hợp: ${career.skill_match_percentage}%`} />
          </RowStack>
          <Typography
            variant="body2"
            mt={1}
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              WebkitLineClamp: 2,
              textOverflow: "ellipsis",
            }}
          >
            <strong>Mô tả ngắn:</strong> {career.description}
          </Typography>
          <Stack direction="row" spacing={1} mt={1}>
            <Typography variant="body2" fontWeight="bold" mr={1}>
              Kỹ năng cần có:
            </Typography>
            {career.skills.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Chưa có kỹ năng nào
              </Typography>
            )}
            {career.skills.slice(0, maxVisibleSkills).map(({ name, id }) => (
              <Chip key={id} label={name} size="small" />
            ))}{" "}
            {career.skills.length > maxVisibleSkills && (
              <Chip
                label={`+${career.skills.length - maxVisibleSkills}`}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ flexShrink: 0 }}
              />
            )}
          </Stack>
          {career.topic_count ? (
            <Typography variant="body2" mt={1}>
              <strong>Lộ trình học tập:</strong> {career.topic_count} giai đoạn
              từ cơ bản đến dự án thực tế
            </Typography>
          ) : (
            <Typography variant="body2" mt={1}>
              <strong>Lộ trình học tập:</strong> Chưa có lộ trình nào
            </Typography>
          )}
        </Stack>
        <RowStack justifyContent="flex-end" mt={2}>
          {/* <DevelopmentTooltip>
            <Button
              startIcon={<FavoriteBorderIcon />}
              variant="text"
              sx={{ color: "#6366F1", fontWeight: "bold" }}
            >
              Thêm vào ưu thích
            </Button>
          </DevelopmentTooltip> */}
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={() =>
              router.push(paths.career.detail.replace(":careerId", career.id))
            }
            sx={{
              backgroundColor: "#6366F1",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#4F46E5" },
            }}
          >
            Xem chi tiết hơn
          </Button>
        </RowStack>
      </Stack>
    </Paper>
  );
};

export default CareerItem;
