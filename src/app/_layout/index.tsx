"use client";

import LoadingState from "@/components/loading-state";
import { useAuth } from "@/contexts/auth/firebase-context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { viVN } from "@mui/x-date-pickers/locales";
import { vi } from "date-fns/locale/vi";
import { useCallback, useEffect, useState } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, signInAnonymously } = useAuth();
  const [loading, setLoading] = useState(true);

  const check = useCallback(async () => {
    if (!user?.id) {
      try {
        await signInAnonymously();
        setLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    }
  }, [signInAnonymously, user]);
  // Only check on mount, this allows us to redirect the user manually when auth state changes
  useEffect(
    () => {
      check();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  if (loading) {
    <LoadingState />;
  }

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={vi}
      localeText={
        viVN.components.MuiLocalizationProvider.defaultProps.localeText
      }
    >
      {children}
    </LocalizationProvider>
  );
}
