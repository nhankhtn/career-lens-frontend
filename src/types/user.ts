export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
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
    other?: string;
  };
  created_at?: string;
  updated_at?: string;
  skills: string[];
  onboarding_completed: boolean;
}

export interface UserOnboarding {
  user_id: string;
  full_name: string;
  date_of_birth: string;
  gender: "male" | "female" | "other" | null;
  education_level: string | null;
  major: string | null;
  school: string | null;
  current_goal: string | null;
  skills_have: string[];
  experience?: {
    job_title: string;
    field: string;
    years: number;
  }[];
  career_orientation_result: string | null;
  created_at?: string;
  updated_at?: string;
}
