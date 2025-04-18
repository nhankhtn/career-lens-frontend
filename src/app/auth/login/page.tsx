import { GuestGuard } from "@/guards/guest-guard";
import AuthLoginContent from "./_sections/content";

export default function RegisterPage() {
  return (
    <GuestGuard>
      <AuthLoginContent />
    </GuestGuard>
  );
}
