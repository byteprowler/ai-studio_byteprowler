import React, { useCallback, useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { motion, useReducedMotion } from "motion/react";
import BootSequence from "../components/ui/BootSequence";
import CustomCursor from "../components/ui/CustomCursor";
import "../styles/globals.css";

const BOOT_SESSION_KEY = "byteprowler_boot_sequence_seen";
const BOOT_COMPLETE_EVENT = "byteprowler:boot-complete";

export default function App({ Component, pageProps, router }: AppProps) {
  const shouldReduceMotion = useReducedMotion();
  const isHomePage = router.pathname === "/";
  const [isBootComplete, setIsBootComplete] = useState(!isHomePage);
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

    const revealTimer = window.setTimeout(() => {
      if (!isHomePage) {
        setIsBootComplete(true);
        return;
      }

      try {
        setIsBootComplete(window.sessionStorage.getItem(BOOT_SESSION_KEY) === "true");
      } catch {
        setIsBootComplete(true);
      }
    }, 0);

    return () => window.clearTimeout(revealTimer);
  }, [isHomePage]);

  const handleBootComplete = useCallback(({ userInitiated }: { userInitiated: boolean }) => {
    setIsBootComplete(true);

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(BOOT_COMPLETE_EVENT, { detail: { userInitiated } }));
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {isHomePage && !isBootComplete && <BootSequence onComplete={handleBootComplete} />}
      <CustomCursor />

      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0.94 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.24, ease: "easeOut" }}
        className={`min-h-screen bg-obsidian text-gray-100 selection:bg-neon-lime selection:text-black font-sans relative antialiased overflow-x-hidden ${
          isHomePage && !isBootComplete ? "pointer-events-none" : "pointer-events-auto"
        }`}
        aria-hidden={isHomePage && !isBootComplete ? true : undefined}
      >
        <div className="absolute inset-0 terminal-grid pointer-events-none z-0" />
        <div className="absolute inset-0 terminal-dots pointer-events-none z-0" />
        <div className="scanline-overlay" />

        <div className="relative z-10 w-full min-h-screen flex flex-col justify-between">
          <Component {...pageProps} />
        </div>
      </motion.div>
    </QueryClientProvider>
  );
}