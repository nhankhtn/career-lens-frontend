import { useAuth } from "@/contexts/auth/firebase-context";
import { Stack } from "@mui/material";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  if (user?.role !== "admin") {
    return <Stack>Forbidden</Stack>;
  }

  return <>{children}</>;
};

export default AdminGuard;
