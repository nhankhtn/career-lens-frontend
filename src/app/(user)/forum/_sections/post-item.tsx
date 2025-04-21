// components/PostItem.tsx
"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import {
  ThumbUp,
  ChatBubbleOutline,
  Save,
  Visibility,
} from "@mui/icons-material"; // Thêm Visibility
import { blue } from "@mui/material/colors";

interface PostAuthor {
  name: string;
  avatar: string;
  initial: string;
}

interface PostProps {
  post: {
    id: number;
    author: PostAuthor;
    date: string;
    content: string;
    image?: string;
    likes: number;
    comments: number;
    saves: number;
  };
}

export default function PostItem({ post }: any) {
  const { author, date, content, image, likes, comments, saves } = post;

  // Function to render content with hashtags as links
  const renderContent = (text: string) => {
    if (!text.includes("#")) return text;

    const parts = text.split(/(#\w+)/g);
    return parts.map((part, index) => {
      if (part.startsWith("#")) {
        return (
          <Link
            key={index}
            href="#"
            sx={{ color: blue[500], textDecoration: "none" }}
          >
            {part}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Box sx={{ display: "flex", gap: 1, mb: 1 }}>
          {author.avatar ? (
            <Avatar src={author.avatar} alt={author.name} />
          ) : (
            <Avatar sx={{ bgcolor: blue[500] }}>{author.initial}</Avatar>
          )}

          <Box>
            <Typography variant="subtitle1" fontWeight="medium">
              {author.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {date} •{" "}
              <Visibility
                sx={{ fontSize: 14, verticalAlign: "middle", mr: 0.5 }}
              />{" "}
              {/* Thay con mắt bằng Visibility icon */}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body1"
          sx={{
            whiteSpace: "pre-line",
            mb: 2,
          }}
        >
          {renderContent(content)}
        </Typography>

        {image && (
          <Box sx={{ mt: 1, mb: 2 }}>
            <Box
              component="img"
              src={image || "/placeholder.svg"}
              alt="Post image"
              sx={{
                width: "100%",
                borderRadius: "8px",
                maxHeight: "300px",
                objectFit: "cover",
              }}
            />
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "text.secondary",
            mb: 1,
          }}
        >
          <Typography variant="body2">{likes > 0 ? likes : ""}</Typography>
          <Typography variant="body2">
            {comments > 0 ? `${comments} bình luận` : ""}{" "}
            {comments > 0 && saves > 0 ? "• " : ""}
            {saves > 0 ? `${saves} chia sẻ` : ""}
          </Typography>
        </Box>

        <Divider />

        <Stack
          direction="row"
          spacing={1}
          justifyContent="space-between"
          sx={{ pt: 1 }}
        >
          <Button
            startIcon={<ThumbUp />}
            sx={{
              textTransform: "none",
              color: "text.secondary",
              flex: 1,
            }}
            aria-label={`Like post, ${likes} likes`}
          >
            {likes > 0 ? likes : "Thích"}
          </Button>
          <Button
            startIcon={<ChatBubbleOutline />}
            sx={{
              textTransform: "none",
              color: "text.secondary",
              flex: 1,
            }}
            aria-label={`Comment on post, ${comments} comments`}
          >
            {comments > 0 ? comments : "Bình luận"}
          </Button>
          <Button
            startIcon={<Save />}
            sx={{
              textTransform: "none",
              color: "text.secondary",
              flex: 1,
            }}
            aria-label={`Save post, ${saves} saves`}
          >
            {saves > 0 ? saves : "Lưu"}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
