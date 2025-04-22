export const paths = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
  },
  onboarding: "/onboarding",
  dashboard: "/dashboard",
  profile: {
    detail: "/profile/:username",
  },
  career: {
    index: "/careers",
    detail: "/careers/:careerId",
  },
  forum: "/forum",
  roadmap: "/roadmap",

  admin: {
    dashboard: "/admin/dashboard",
    company: "/admin/company",
    career: "/admin/career",
    user: "/admin/user",
    roadmap: {
      index: "/admin/roadmap",
      detail: "/admin/roadmap/[roadmapId]",
      create: "/admin/roadmap/create",
    },
  },
};
