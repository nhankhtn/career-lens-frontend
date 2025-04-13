"use client"
import { Avatar, Box, Button, Card, CardContent, Divider, Typography } from "@mui/material"
import { AddCircleOutline } from "@mui/icons-material"

export default function ProfileSidebar() {
    return (
        <Card sx={{ bgcolor: "#f5f5f5", height: "100%" }}>
            <CardContent sx={{ p: 5}}>
                <Box
                    sx={{
                        bgcolor: "#f5f5f5",
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <Avatar src="/placeholder.svg?height=80&width=80" alt="Nguyễn Văn A" sx={{ width: 80, height: 80, mb: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                        Nguyễn Văn A
                    </Typography>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
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
                            my: 1,
                            width: "100%",
                            justifyContent: "flex-start",
                        }}
                    >
                        Kinh nghiệm
                    </Button>
                </Box>

                <Divider />

                <Box sx={{ p: 2 }}>
                    <Typography variant="body2" fontWeight="medium" gutterBottom>
                        Kết nối
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Mở rộng mạng lưới của bạn
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}
