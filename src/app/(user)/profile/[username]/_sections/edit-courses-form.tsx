// components/EditCoursesForm.tsx
"use client";

import { useState } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";
import  useFunction  from "@/hooks/use-function";

const submitCoursesApi = async (payload: any): Promise<{ title: string; description: string }[]> => {
    return new Promise((resolve) => setTimeout(() => resolve(payload), 500));
};

interface EditCoursesFormProps {
    onClose: () => void;
    initialCourses: { title: string; description: string }[];
    onSubmit: (courses: { title: string; description: string }[]) => void;
}

const EditCoursesForm = ({ onClose, initialCourses, onSubmit }: EditCoursesFormProps) => {
    const [courses, setCourses] = useState(initialCourses);

    const { call, loading } = useFunction(submitCoursesApi, {
        successMessage: "Cập nhật lộ trình thành công!",
        onSuccess: ({ result }: { result: { title: string; description: string }[] }) => {
            onSubmit(result);
            onClose();
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật lộ trình:", error);
        },
    });

    const handleCourseChange = (index: number, field: keyof typeof initialCourses[0], value: string) => {
        const updatedCourses = [...courses];
        updatedCourses[index][field] = value;
        setCourses(updatedCourses);
    };

    const handleSubmit = () => {
        call(courses);
    };

    return (
        <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
            <Stack spacing={2}>
                {courses.map((course, index) => (
                    <Stack key={index} spacing={1}>
                        <TextField
                            label={`Tiêu đề lộ trình ${index + 1}`}
                            value={course.title}
                            onChange={(e) => handleCourseChange(index, "title", e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label={`Mô tả lộ trình ${index + 1}`}
                            value={course.description}
                            onChange={(e) => handleCourseChange(index, "description", e.target.value)}
                            fullWidth
                        />
                    </Stack>
                ))}
                <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Đang lưu..." : "Xác nhận"}
                </Button>
            </Stack>
        </Box>
    );
};

export default EditCoursesForm;