"use client";

import { useAuth } from "@/contexts/auth/firebase-context";
import OnboardingContent from "./_sections/content";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { paths } from "@/paths";
import LoadingState from "@/components/loading-state";
import { useMainContext } from "@/contexts/main/main-context";

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { getSkillsApi } = useMainContext();

  useEffect(() => {
    getSkillsApi.call();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user?.email && user.onboarding_completed) {
      router.push(paths.dashboard);
    }
  }, [user, router]);

  return !user?.email ? <LoadingState /> : <OnboardingContent />;
}
