export interface User {
  id: string;
  photo_url: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

export interface UserOnboarding {
  position: string;
}
