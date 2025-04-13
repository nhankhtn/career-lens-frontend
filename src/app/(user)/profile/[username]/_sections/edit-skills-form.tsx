"use client";

import { useState } from "react";
import { Box, Button, TextField, Stack } from "@mui/material";
import useFunction from "@/hooks/use-function";

const submitSkillsApi = async (payload: { skill: string; duration: string }[]) => {
    return new Promise((resolve) => setTimeout(() => resolve(payload), 500));
};

interface EditSkillsFormProps {
    onClose: () => void;
    initialSkills: { skill: string; duration: string }[];
    onSubmit: (skills: { skill: string; duration: string }[]) => void;
}

const EditSkillsForm = ({ onClose, initialSkills, onSubmit }: EditSkillsFormProps) => {
    const [skills, setSkills] = useState(initialSkills);

    const { call, loading } = useFunction(submitSkillsApi, {
        successMessage: "Cập nhật kỹ năng thành công!",
        onSuccess: ({ payload }: { payload: { skill: string; duration: string }[] }) => {
            onSubmit(payload);
            onClose();
        },
        onError: (error) => {
            console.error("Lỗi khi cập nhật kỹ năng:", error);
        },
    });

    const handleSkillChange = (index: number, field: "skill" | "duration", value: string) => {
        const updatedSkills = [...skills];
        updatedSkills[index][field] = value;
        setSkills(updatedSkills);
    };

    const handleSubmit = () => {
        call(skills);
    };

    return (
        <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
            <Stack spacing={2}>
                {skills.map((skill, index) => (
                    <Stack key={index} spacing={1}>
                        <TextField
                            label={`Kỹ năng ${index + 1}`}
                            value={skill.skill}
                            onChange={(e) => handleSkillChange(index, "skill", e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label={`Thời gian ${index + 1}`}
                            value={skill.duration}
                            onChange={(e) => handleSkillChange(index, "duration", e.target.value)}
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

export default EditSkillsForm;