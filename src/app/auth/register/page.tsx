import { Suspense } from "react";
import AuthRegisterContent from "./_sections/content";
import LoadingState from "@/components/loading-state";
import { GuestGuard } from "@/guards/guest-guard";

export default function RegisterPage() {
  return (
    <GuestGuard>
      <Suspense fallback={<LoadingState />}>
        <AuthRegisterContent />
      </Suspense>
    </GuestGuard>
  );
}
