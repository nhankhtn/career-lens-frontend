import { GuestGuard } from "@/guards/guest-guard";
import AuthLoginContent from "./_sections/content";
import { Suspense } from "react";
import LoadingState from "@/components/loading-state";

export default function RegisterPage() {
  return (
    <GuestGuard>
      <Suspense fallback={<LoadingState />}>
        <AuthLoginContent />
      </Suspense>
    </GuestGuard>
  );
}
