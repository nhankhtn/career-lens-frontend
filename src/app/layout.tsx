import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { theme } from "@/theme";
import "@/theme/global.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider } from "@/contexts/auth/firebase-context";
import { SnackbarProvider } from "./_components/snackbar-provider";
import Layout from "./_layout";
import { MainProvider } from "@/contexts/main/main-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Career Lens",
  description:
    "Nền tảng hỗ trợ định hướng nghề nghiệp và cá nhân hoá lộ trình học tập",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <AppRouterCacheProvider options={{ key: "css" }}>
          <CssBaseline />
          <SnackbarProvider>
            <ThemeProvider theme={theme}>
              <AuthProvider>
                <MainProvider>
                  <Layout>{children}</Layout>
                </MainProvider>
              </AuthProvider>
            </ThemeProvider>
          </SnackbarProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
