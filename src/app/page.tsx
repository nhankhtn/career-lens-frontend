"use client";

import { paths } from "@/paths";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push(paths.dashboard);
  }, [router]);

  return null;
}
