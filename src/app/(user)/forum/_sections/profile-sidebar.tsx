"use client"
import { Avatar, Box, Button, Card, CardContent, Divider, Typography } from "@mui/material"
import { AddCircleOutline } from "@mui/icons-material"

export default function ProfileSidebar() {
    return (
        <Card
            sx={{
                bgcolor: "#f5f5f5",
                height: { xs: "400px", md: "100%" }, // Fixed 400px on mobile, 100% on desktop
                p: { xs: 1, md: 5 }, // Reduced padding on mobile, full padding on desktop
                overflow: { xs: "auto", md: "visible" }, // Scroll on mobile, no scroll on desktop
            }}
        >
            <CardContent
                sx={{
                    p: { xs: 1, md: 5 }, // Reduced padding on mobile, full padding on desktop
                }}
            >
                <Box
                    sx={{
                        bgcolor: "primary.secondary",
                        p: { xs: 1, md: 2 }, // Reduced padding on mobile
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        height: { xs: "auto", md: "auto" }, // Auto height to fit content
                        overflow: { xs: "auto", md: "visible" }, // Scroll on mobile if needed
                    }}
                >
                    <Avatar
                        src="/placeholder.svg?height=80&width=80"
                        alt="Nguyễn Văn A"
                        sx={{
                            width: { xs: 50, md: 80 }, // Smaller on mobile
                            height: { xs: 50, md: 80 },
                            mb: { xs: 0.5, md: 1 },
                        }}
                    />
                    <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{
                            fontSize: { xs: "0.875rem", md: "1.25rem" }, // Smaller on mobile
                        }}
                    >
                        Nguyễn Văn A
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                        sx={{
                            fontSize: { xs: "0.75rem", md: "1rem" }, // Smaller on mobile
                        }}
                    >
                        Quận 4, Hồ Chí Minh City
                    </Typography>

                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<AddCircleOutline />}
                        sx={{
                            textTransform: "none",
                            borderColor: "#e0e0e0",
                            color: "text.secondary",
                            bgcolor: "white",
                            my: { xs: 0.5, md: 1 },
                            width: "100%",
                            justifyContent: "flex-start",
                            fontSize: { xs: "0.625rem", md: "0.875rem" }, // Smaller on mobile
                            p: { xs: 0.5, md: 1 }, // Reduced padding on mobile
                        }}
                    >
                        Kinh nghiệm
                    </Button>
                </Box>

                <Divider sx={{ my: { xs: 0.5, md: 2 } }} /> {/* Reduced spacing on mobile */}

                <Box
                    sx={{
                        p: { xs: 1, md: 2 }, // Reduced padding on mobile
                    }}
                >
                    <Typography
                        variant="body2"
                        fontWeight="medium"
                        gutterBottom
                        sx={{
                            fontSize: { xs: "0.75rem", md: "1rem" }, // Smaller on mobile
                        }}
                    >
                        Kết nối
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            fontSize: { xs: "0.625rem", md: "0.875rem" }, // Smaller on mobile
                            height: { xs: "auto", md: "auto" }, // Auto height
                        }}
                    >
                        Mở rộng mạng lưới của bạn
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}