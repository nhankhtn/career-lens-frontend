"use client";

import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import PostItem from "./post-item";
import { usePostContext } from "@/contexts/forum/post-context";
import { Post } from "@/types/post";
import { SocketClient } from "@/api/forum/socket";
import useAppSnackbar from "@/hooks/use-app-snackbar";
import { useAuth } from "@/contexts/auth/firebase-context";
import { Typography } from "@mui/material";

interface PostListProps {
    tab: "default" | "followed" | "my-posts"; // Định nghĩa các tab
}

export default function PostList({ tab }: PostListProps) {
    const { getPostsApi, getFollowedPostsApi } = usePostContext();
    const { user } = useAuth();
    const { showSnackbarError } = useAppSnackbar();
    const [posts, setPosts] = useState<Post[]>([]);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const limit = 10;

    const loadPosts = async () => {
        if (!hasMore) return;

        let response;
        if (tab === "followed") {
            // Lấy bài viết của người mà người dùng đang theo dõi
            response = await getFollowedPostsApi.call({ offset, limit });
        } else if (tab === "my-posts" && user) {
            // Lấy bài viết của người dùng hiện tại
            response = await getPostsApi.call({ offset, limit, user_id: user.id });
        } else {
            // Tab "Đề xuất" (mặc định): Lấy tất cả bài viết
            response = await getPostsApi.call({ offset, limit });
        }

        if (response.data) {
            const newPosts = response.data.data || [];
            setPosts((prev) => [...prev, ...newPosts]);
            setOffset(offset + limit);
            setHasMore(newPosts.length === limit);
        } else {
            showSnackbarError(`Không thể tải bài viết: ${response.error}`);
        }
    };

    useEffect(() => {
        // Reset danh sách bài viết khi chuyển tab
        setPosts([]);
        setOffset(0);
        setHasMore(true);
        loadPosts();
    }, [tab]);

    useEffect(() => {
        // Lắng nghe bài viết mới từ Socket.IO
        SocketClient.on("newPost", (newPost: Post) => {
            if (tab === "default") {
                // Chỉ thêm bài viết mới vào tab "Đề xuất"
                setPosts((prev) => [newPost, ...prev]);
            } else if (tab === "followed") {
                // Kiểm tra xem bài viết mới có thuộc người mà người dùng đang theo dõi không
                // (Logic này cần backend hỗ trợ, tạm thời bỏ qua)
            } else if (tab === "my-posts" && user && newPost.user_id?.id === user.id) {
                // Thêm bài viết mới vào tab "Bài viết đã đăng" nếu là của người dùng
                setPosts((prev) => [newPost, ...prev]);
            }
        });

        return () => {
            SocketClient.disconnect();
        };
    }, [tab, user]);

    return (
        <Box>
            {posts.length > 0 ? (
                <>
                    {posts.map((post) => (
                        <PostItem key={post.id} post={post} />
                    ))}
                    {hasMore && (
                        <Button onClick={loadPosts} variant="outlined" sx={{ mt: 2 }}>
                            Tải thêm
                        </Button>
                    )}
                </>
            ) : (
                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    Chưa có bài viết nào.
                </Typography>
            )}
        </Box>
    );
}