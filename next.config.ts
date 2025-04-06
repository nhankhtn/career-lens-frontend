import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true, // Đảm bảo rằng các URL kết thúc bằng dấu "/"
  output: "export", // Xuất ứng dụng Next.js dưới dạng tĩnh
  distDir: "out", // Thay đổi thư mục đầu ra của Next.js
};

export default nextConfig;
