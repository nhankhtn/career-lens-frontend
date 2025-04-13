"use client";

import { paths } from "@/paths";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push(paths.dashboard);
  }, [router]);

  return <Stack>Hello word!</Stack>;
}
