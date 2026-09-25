import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { profile } from "../../lib/profile";

const BOOT_SESSION_KEY = "byteprowler_boot_sequence_seen";

const bootLines = [
  { prefix: "~/BYTEPROWLER", text: "npx byteprowler --profile", tone: "command" },
  { prefix: "OK", text: "loading profile modules... ok", tone: "success" },
  { prefix: "OK", text: "syncing operator identity... ok", tone: "success" },
  { prefix: "OK", text: "mounting project logs... ok", tone: "success" },
  { prefix: "OK", text: "initializing training arc registry... ok", tone: "success" },
  { prefix: "INFO", text: `PRWLR_SYS: Booting kernel ${profile.systemVersion}...`, tone: "info" },
  { prefix: "OK", text: "SECURE_UPLINK: Est. TLS handshakes verified.", tone: "success" },
  { prefix: "OK", text: "MODULE_LOAD: React 19.x & Tailwind CSS v4... OK", tone: "success" },
  { prefix: "OK", text: "MODULE_LOAD: Motion 12.x hardware rendering... OK", tone: "success" },
  { prefix: "INFO", text: "DECRYPTING: Operator credentials decrypting loop...", tone: "info" },
  { prefix: "OK", text: "IDENTITY_LOAD: Operator profile loaded.", tone: "success" },
  { prefix: "WARN", text: "SYS_STATUS: Hypervisor active. Welcome back operator.", tone: "warn" },
  { prefix: "OK", text: "ready...", tone: "success" },
] as const;

interface BootSequenceCompleteEvent {
  userInitiated: boolean;
}

interface BootSequenceProps {
  enabled?: boolean;
  onComplete?: (event: BootSequenceCompleteEvent) => void;
}

function getToneClass(tone: (typeof bootLines)[number]["tone"]) {
  if (tone === "command") return "text-neon-blue";
  if (tone === "info") return "text-neon-blue";
  if (tone === "warn") return "text-neon-lime";
  return "text-neon-green";
}

export default function BootSequence({ enabled = true, onComplete }: BootSequenceProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [lineCount, setLineCount] = useState(0);

  const completeBoot = useCallback((userInitiated = false) => {
    try {
      window.sessionStorage.setItem(BOOT_SESSION_KEY, "true");
    } catch {
      // If sessionStorage is unavailable, never block the portfolio.
    }
    setIsVisible(false);
    onComplete?.({ userInitiated });
  }, [onComplete]);

  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    try {
      if (window.sessionStorage.getItem(BOOT_SESSION_KEY) === "true") {
        return;
      }
    } catch {
      return;
    }

    let lineInterval: number | undefined;
    let completeTimeout: number | undefined;

    const startTimeout = window.setTimeout(() => {
      setIsVisible(true);

      if (shouldReduceMotion) {
        setLineCount(bootLines.length);
        completeTimeout = window.setTimeout(() => completeBoot(false), 850);
        return;
      }

      let index = 0;
      lineInterval = window.setInterval(() => {
        index += 1;
        setLineCount(Math.min(index, bootLines.length));

        if (index >= bootLines.length) {
          if (lineInterval) {
            window.clearInterval(lineInterval);
          }
          completeTimeout = window.setTimeout(() => completeBoot(false), 720);
        }
      }, 265);
    }, 0);

    return () => {
      window.clearTimeout(startTimeout);
      if (lineInterval) {
        window.clearInterval(lineInterval);
      }
      if (completeTimeout) {
        window.clearTimeout(completeTimeout);
      }
    };
  }, [completeBoot, enabled, shouldReduceMotion]);

  const visibleLines = bootLines.slice(0, lineCount);
  const isReady = lineCount >= bootLines.length;

  return (
    <AnimatePresence>
      {enabled && isVisible && (
        <motion.div
          aria-label="Byteprowler boot sequence loading"
          initial={shouldReduceMotion ? false : { opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: shouldReduceMotion ? 0.01 : 0.24 }}
          className="fixed inset-0 z-[120] flex min-h-screen items-center justify-center bg-obsidian px-4 py-6 text-gray-100"
        >
          <div className="absolute inset-0 terminal-grid opacity-60" aria-hidden="true" />
          <div className="relative w-full max-w-2xl rounded-sm border border-neon-lime/25 bg-black/90 p-4 font-mono shadow-[0_0_28px_rgba(197,255,0,0.08)] sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/75" />
                <span className="h-2.5 w-2.5 rounded-full bg-neon-lime/75" />
                <span className="h-2.5 w-2.5 rounded-full bg-neon-blue/75" />
              </div>
              <span className="min-w-0 break-words text-right text-[11px] font-black uppercase tracking-widest text-neon-lime">
                ~/BYTEPROWLER
              </span>
            </div>

            <div className="space-y-2 text-xs leading-relaxed text-gray-200 sm:text-sm">
              <div className="min-h-[19rem] space-y-1.5 overflow-hidden sm:min-h-[20rem]" aria-hidden="true">
                {visibleLines.map((line) => (
                  <p key={line.text} className="flex gap-2 break-words">
                    <span className={`shrink-0 font-black ${getToneClass(line.tone)}`}>
                      {line.tone === "command" ? ">" : `[${line.prefix}]`}
                    </span>
                    <span>{line.tone === "command" ? `${line.prefix} $ ${line.text}` : line.text}</span>
                  </p>
                ))}
              </div>
              <p className="sr-only" role="status" aria-live="polite">
                {isReady ? "Byteprowler portfolio ready." : "Byteprowler portfolio booting."}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-[11px] uppercase tracking-wider text-gray-300">
                STATUS: {isReady ? "READY" : "BOOTING"}
              </span>
              <button
                type="button"
                onClick={() => completeBoot(true)}
                className="min-h-11 rounded-sm border border-neon-lime/30 bg-neon-lime/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-neon-lime transition hover:border-neon-lime hover:bg-neon-lime hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
              >
                Skip Boot
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
