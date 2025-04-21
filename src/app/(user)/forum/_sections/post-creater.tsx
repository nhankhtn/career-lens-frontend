"use client"
import { Avatar, Box, Button, Divider, InputBase, Stack } from "@mui/material"
import { InsertPhoto, Event, Article } from "@mui/icons-material"

export default function PostCreator() {
  return (
    <Box>
      <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
        <Avatar src="/placeholder.svg?height=40&width=40" alt="User" sx={{ width: 60, height: 60 }} />
        <InputBase
          fullWidth
          placeholder="Hãy viết những thắc mắc của bạn..."
          sx={{
            p: 1,
            border: "1px solid #e0e0e0",
            borderRadius: 30,
            pl: 2,
          }}
        />
      </Box>

      <Divider />

      <Stack direction="row" spacing={1} justifyContent="space-between" sx={{ pt: 1 }}>
        <Button startIcon={<InsertPhoto color="primary" />} sx={{ textTransform: "none" }}>
          Ảnh
        </Button>
        <Button startIcon={<Event sx={{ color: "orange" }} />} sx={{ textTransform: "none" }}>
          Sự kiện
        </Button>
        <Button startIcon={<Article sx={{ color: "red" }} />} sx={{ textTransform: "none" }}>
          Viết bài
        </Button>
      </Stack>
    </Box>
  )
}
