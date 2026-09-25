import React, { useCallback, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import BootSequence from "../components/ui/BootSequence";
import CustomCursor from "../components/ui/CustomCursor";
import "../styles/globals.css";

const BOOT_SESSION_KEY = "byteprowler_boot_sequence_seen";
const BOOT_COMPLETE_EVENT = "byteprowler:boot-complete";

export default function App({ Component, pageProps, router }: AppProps) {
  const shouldReduceMotion = useReducedMotion();
  const isHomePage = router.pathname === "/";

  // System initialization gate:
  // On home page: start as not complete if session hasn't seen it yet,
  // preventing ANY premature render or flash of homepage content.
  const [isBootComplete, setIsBootComplete] = useState<boolean>(() => {
    if (typeof window === "undefined") {
      return !isHomePage;
    }
    if (!isHomePage) return true;
    try {
      return window.sessionStorage.getItem(BOOT_SESSION_KEY) === "true";
    } catch {
      return true;
    }
  });

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncTimer = window.setTimeout(() => {
      if (!isHomePage) {
        setIsBootComplete(true);
        return;
      }

      try {
        if (window.sessionStorage.getItem(BOOT_SESSION_KEY) === "true") {
          setIsBootComplete(true);
        }
      } catch {
        setIsBootComplete(true);
      }
    }, 0);

    return () => window.clearTimeout(syncTimer);
  }, [isHomePage]);

  const handleBootComplete = useCallback(({ userInitiated }: { userInitiated: boolean }) => {
    setIsBootComplete(true);

    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.setItem(BOOT_SESSION_KEY, "true");
      } catch {
        // sessionStorage might be restricted
      }
      window.dispatchEvent(new CustomEvent(BOOT_COMPLETE_EVENT, { detail: { userInitiated } }));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {isHomePage && !isBootComplete ? (
          <BootSequence key="boot-sequence-overlay" onComplete={handleBootComplete} />
        ) : (
          <motion.div
            key="app-main-content"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, ease: "easeOut" }}
            className="min-h-screen bg-obsidian text-gray-100 selection:bg-neon-lime selection:text-black font-sans relative antialiased overflow-x-hidden"
          >
            <div className="absolute inset-0 terminal-grid pointer-events-none z-0" />
            <div className="absolute inset-0 terminal-dots pointer-events-none z-0" />
            <div className="scanline-overlay" />

            <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
              <Component {...pageProps} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
}
