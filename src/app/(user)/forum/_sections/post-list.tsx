"use client"
import { Box } from "@mui/material"
import PostItem from "./post-item"

// Sample post data
const posts = [
    {
        id: 1,
        author: {
            name: "Nhân Duy",
            avatar: "",
            initial: "N",
        },
        date: "Mar 25, 2023",
        content: `Xin chào cả nhà,
Mình là Nhân, hiện đang làm việc trong lĩnh vực IT. Mình tham gia diễn đàn với mong muốn được học hỏi, chia sẻ và trao đổi những kỹ năng nghề nghiệp hữu ích cùng mọi người.
Mình đặc biệt quan tâm đến các chủ đề như: kỹ năng mềm, kỹ năng quản lý, kỹ năng công nghệ, kỹ năng thuyết trình, v.v.
Rất mong được kết nối với các anh/chị/em để cùng nhau học hỏi và phát triển
Ai cũng có điều hay để chia sẻ - mong được nghe câu chuyện và kinh nghiệm của các bạn`,
        likes: 20,
        comments: 3,
        shares: 1,
    },
    {
        id: 2,
        author: {
            name: "Nguyễn Văn Huy",
            avatar: "",
            initial: "H",
        },
        date: "Apr 25, 2023",
        content: `Xin chào cả nhà,

Mình là Nguyễn Văn Huy, 27 tuổi, hiện đang làm nhân viên phân tích dữ liệu tại TP.HCM. Mình tham gia diễn đàn này vì muốn trao đổi thêm các kỹ năng nghề nghiệp, đặc biệt là về kỹ năng giao tiếp, quản lý thời gian và phát triển tư duy phản biện.
Ngoài công việc, mình rất thích đọc sách và học thêm về kỹ năng mềm.
Mong được làm quen và học hỏi kinh nghiệm từ anh chị em trong diễn đàn. Ai cũng nghĩ data khó? Thì kết nối giao lưu nhé!`,
        likes: 20,
        comments: 3,
        shares: 1,
    },
    {
        id: 3,
        author: {
            name: "Minh Quân",
            avatar: "",
            initial: "Q",
        },
        date: "May 10, 2023",
        content: `Mình là Minh Quân, mới đi làm được gần 1 năm. Trong thời gian thực tập, mình từng gửi email cảm ơn khách hàng nhưng... quên thay tên, vẫn để "Kính gửi Anh Nam" dù người nhận là "Chị Hằng" 😳
Sau lần đó mình đã tạo cho mình một checklist:
- Kiểm tra kỹ tên và chức danh người nhận
- Đọc lại ít nhất 1 lần trước khi gửi
- Viết đầu đề rõ ràng, đúng trọng tâm
- Mọi người có checklist nào hay hơn không? Và ai từng đính "email fail" thì kể cho vui nhé!`,
        likes: 20,
        comments: 3,
        shares: 1,
    },
    {
        id: 4,
        author: {
            name: "Lập Lưu",
            avatar: "",
            initial: "L",
        },
        date: "Oct 5, 2023",
        content: `Xin chào cả nhà,
Mình là Lập, hiện đang làm việc trong lĩnh vực IT. Mình tham gia diễn đàn với mong muốn được học hỏi, chia sẻ và trao đổi những kỹ năng nghề nghiệp hữu ích cùng mọi người.
Mình đặc biệt quan tâm đến các chủ đề như: kỹ năng mềm, kỹ năng quản lý, kỹ năng công nghệ, kỹ năng thuyết trình, v.v.
Rất mong được kết nối với các anh/chị/em để cùng nhau học hỏi và phát triển
Ai cũng có điều hay để chia sẻ - mong được nghe câu chuyện và kinh nghiệm của các bạn`,
        likes: 20,
        comments: 3,
        shares: 1,
    },
    {
        id: 5,
        author: {
            name: "Bùi Thị Trà",
            avatar: "",
            initial: "T",
        },
        date: "Nov 15, 2023",
        content: `Xin chào cả nhà,
Mình là Trà, hiện đang làm việc trong lĩnh vực IT. Mình tham gia diễn đàn với mong muốn được học hỏi, chia sẻ và trao đổi những kỹ năng nghề nghiệp hữu ích cùng mọi người.
Mình đặc biệt quan tâm đến các chủ đề như: kỹ năng mềm, kỹ năng quản lý, kỹ năng công nghệ, kỹ năng thuyết trình, v.v.
Rất mong được kết nối với các anh/chị/em để cùng nhau học hỏi và phát triển
Ai cũng có điều hay để chia sẻ - mong được nghe câu chuyện và kinh nghiệm của các bạn`,
        likes: 20,
        comments: 3,
        shares: 1,
    },
    {
        id: 6,
        author: {
            name: "Michael",
            avatar: "",
            initial: "M",
        },
        date: "Dec 20, 2023",
        content: `"In mollit dolore voluptate laborum excepteur" #hashtag1 #hashtag2`,
        image: "",
        likes: 20,
        comments: 3,
        shares: 1,
    },
]

export default function PostList() {
    return (
        <Box>
            {posts.map((post) => (
                <PostItem key={post.id} post={post} />
            ))}
        </Box>
    )
}
