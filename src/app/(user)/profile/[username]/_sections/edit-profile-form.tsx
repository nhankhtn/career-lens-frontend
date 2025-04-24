"use client";

import { useState } from "react";
import { Box, Button, TextField, Stack, Typography } from "@mui/material";
import useFunction from "@/hooks/use-function";
import UsersApi from "@/api/users";
import useAppSnackbar from "@/hooks/use-app-snackbar";

interface User {
    id: string;
    name: string;
    email: string;
    phone?: string;
    photo_url?: string;
    role: string;
    year?: number;
    school?: string;
    address?: string;
    bio?: string;
    quote?: string;
    social_media?: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
    };
    skills: string[];
    onboarding_completed: boolean;
    created_at: Date;
    updated_at: Date;
}

interface EditProfileFormProps {
    onClose: () => void;
    initialProfile: Partial<User>;
    onSubmit: (profile: Partial<User>) => void;
}

const EditProfileForm = ({ onClose, initialProfile, onSubmit }: EditProfileFormProps) => {
    const { showSnackbarSuccess, showSnackbarError } = useAppSnackbar();
    const [profile, setProfile] = useState<Partial<User>>(initialProfile);

    const updateProfileApi = useFunction(UsersApi.updateProfile, {
        successMessage: "Cập nhật hồ sơ thành công!",
        onSuccess: ({ result }) => {
            onSubmit(result);
            onClose();
        },
        onError: (error) => {
            showSnackbarError(`Cập nhật hồ sơ thất bại: ${error}`);
        },
    });

    const handleChange = (field: keyof User, value: string | number) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleSocialMediaChange = (
        platform: keyof NonNullable<User["social_media"]>,
        value: string
    ) => {
        setProfile((prev) => ({
            ...prev,
            social_media: {
                ...prev.social_media,
                [platform]: value,
            },
        }));
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async () => {
        // Validate required fields
        if (!profile.name?.trim()) {
            showSnackbarError("Tên là bắt buộc");
            return;
        }
        if (!profile.email?.trim()) {
            showSnackbarError("Email là bắt buộc");
            return;
        }
        if (!validateEmail(profile.email)) {
            showSnackbarError("Email không hợp lệ");
            return;
        }

        // Confirm before submitting
        const confirmSubmit = window.confirm("Bạn có chắc muốn cập nhật hồ sơ?");
        if (!confirmSubmit) return;

        // Build sanitized payload
        const sanitizedProfile: Partial<User> = {};
        if (profile.name) sanitizedProfile.name = profile.name;
        if (profile.email) sanitizedProfile.email = profile.email;
        if (profile.phone) sanitizedProfile.phone = profile.phone;
        if (profile.photo_url) sanitizedProfile.photo_url = profile.photo_url;
        if (profile.address) sanitizedProfile.address = profile.address;
        if (profile.year !== undefined && profile.year !== null) sanitizedProfile.year = profile.year;
        if (profile.school) sanitizedProfile.school = profile.school;
        if (profile.bio) sanitizedProfile.bio = profile.bio;
        if (profile.quote) sanitizedProfile.quote = profile.quote;
        if (profile.social_media) {
            const socialMedia: User["social_media"] = {};
            if (profile.social_media.facebook) socialMedia.facebook = profile.social_media.facebook;
            if (profile.social_media.instagram) socialMedia.instagram = profile.social_media.instagram;
            if (profile.social_media.linkedin) socialMedia.linkedin = profile.social_media.linkedin;
            if (Object.keys(socialMedia).length > 0) sanitizedProfile.social_media = socialMedia;
        }

        await updateProfileApi.call(sanitizedProfile);
    };

    return (
        <Box sx={{ p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
            <Typography variant="h6" gutterBottom>
                Chỉnh sửa hồ sơ
            </Typography>
            <Stack spacing={2}>
                <TextField
                    label="Tên"
                    value={profile.name || ""}
                    onChange={(e) => handleChange("name", e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Email"
                    value={profile.email || ""}
                    onChange={(e) => handleChange("email", e.target.value)}
                    fullWidth
                    required
                />
                <TextField
                    label="Số điện thoại"
                    value={profile.phone || ""}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    fullWidth
                />
                <TextField
                    label="URL ảnh đại diện"
                    value={profile.photo_url || ""}
                    onChange={(e) => handleChange("photo_url", e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Địa chỉ"
                    value={profile.address || ""}
                    onChange={(e) => handleChange("address", e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Năm học"
                    type="number"
                    value={profile.year || ""}
                    onChange={(e) => handleChange("year", Number(e.target.value))}
                    fullWidth
                />
                <TextField
                    label="Trường học"
                    value={profile.school || ""}
                    onChange={(e) => handleChange("school", e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Tiểu sử"
                    value={profile.bio || ""}
                    onChange={(e) => handleChange("bio", e.target.value)}
                    fullWidth
                    multiline
                    rows={3}
                />
                <TextField
                    label="Trích dẫn"
                    value={profile.quote || ""}
                    onChange={(e) => handleChange("quote", e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Facebook"
                    value={profile.social_media?.facebook || ""}
                    onChange={(e) => handleSocialMediaChange("facebook", e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Instagram"
                    value={profile.social_media?.instagram || ""}
                    onChange={(e) => handleSocialMediaChange("instagram", e.target.value)}
                    fullWidth
                />
                <TextField
                    label="LinkedIn"
                    value={profile.social_media?.linkedin || ""}
                    onChange={(e) => handleSocialMediaChange("linkedin", e.target.value)}
                    fullWidth
                />
                <Stack direction="row" spacing={2}>
                    <Button
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={updateProfileApi.loading}
                    >
                        {updateProfileApi.loading ? "Đang lưu..." : "Xác nhận"}
                    </Button>
                    <Button variant="outlined" onClick={onClose}>
                        Hủy
                    </Button>
                </Stack>
            </Stack>
        </Box>
    );
};

export default EditProfileForm;