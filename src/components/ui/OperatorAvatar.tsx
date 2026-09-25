import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface OperatorAvatarProps {
  imageSrc?: string;
  label?: string;
  status?: string;
  className?: string;
}

export default function OperatorAvatar({
  imageSrc = "/avatar/operator-avatar-placeholder.png",
  label = "OPERATOR_AVATAR",
  status = "ARC_ACTIVE",
  className = "",
}: OperatorAvatarProps) {
  const [failedImageSrc, setFailedImageSrc] = useState<string | null>(null);
  const [activationCount, setActivationCount] = useState(0);
  const [showHiddenLog, setShowHiddenLog] = useState(false);
  const [phaseActive, setPhaseActive] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const imageFailed = failedImageSrc === imageSrc;


  useEffect(() => {
    if (!showHiddenLog) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setShowHiddenLog(false);
    }, 5200);

    return () => window.clearTimeout(timeout);
  }, [showHiddenLog]);

  const handleActivate = () => {
    setActivationCount((currentCount) => {
      const nextCount = currentCount + 1;
      if (nextCount >= 5) {
        setShowHiddenLog(true);
        if (!shouldReduceMotion) {
          setPhaseActive(true);
          window.setTimeout(() => setPhaseActive(false), 820);
        }
        return 0;
      }
      return nextCount;
    });
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleActivate}
        aria-label="Byteprowler operator avatar. Activate five times to unlock hidden log."
        className={`operator-avatar ${phaseActive ? "operator-avatar--phase" : ""} group relative min-h-44 w-full max-w-[15rem] overflow-hidden rounded-sm border border-neon-blue/25 bg-[#06070b]/90 p-3 text-left font-mono shadow-sm transition duration-300 hover:border-neon-lime/35 hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian`}
      >
        <div className="absolute inset-0 bg-linear-to-br from-neon-blue/7 via-transparent to-neon-lime/7" aria-hidden="true" />
        <div className="operator-avatar__ghost" aria-hidden="true" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-neon-lime/20" aria-hidden="true" />
        <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-neon-lime shadow-[0_0_12px_rgba(197,255,0,0.45)]" aria-hidden="true" />

        <div className="relative flex items-center gap-3">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-sm border border-neon-lime/25 bg-black/80">
            {!imageFailed ? (
              <Image
                src={imageSrc}
                alt="Byteprowler operator avatar"
                width={128}
                height={128}
                onError={() => setFailedImageSrc(imageSrc)}
                className="h-full w-full object-cover opacity-90 grayscale-[25%]"
              />
            ) : (
              <svg viewBox="0 0 120 120" role="img" aria-label="Fallback Byteprowler operator badge" className="h-full w-full">
                <rect width="120" height="120" fill="#050507" />
                <path d="M24 30 60 12l36 18v42L60 108 24 72Z" fill="#0b0c10" stroke="rgba(197,255,0,.55)" strokeWidth="2" />
                <path d="M60 27c17 0 30 13 30 30v6c0 17-13 30-30 30S30 80 30 63v-6c0-17 13-30 30-30Z" fill="#11131a" />
                <path d="M36 57h48l-7 14H43Z" fill="rgba(0,243,255,.18)" stroke="rgba(0,243,255,.75)" strokeWidth="2" />
                <path d="M60 28v64" stroke="rgba(197,255,0,.25)" strokeWidth="2" />
                <path d="M24 78h72" stroke="rgba(197,255,0,.28)" strokeWidth="1" />
              </svg>
            )}
            <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-transparent via-white/6 to-transparent opacity-40" aria-hidden="true" />
            <div className="operator-avatar__scanline pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,0.05)_0px,rgba(255,255,255,0.05)_1px,transparent_1px,transparent_5px)] opacity-30" aria-hidden="true" />
          </div>

          <div className="relative min-w-0 flex-1">
            <span className="block text-[10px] font-black uppercase tracking-widest text-neon-blue">
              {label}
            </span>
            <span className="mt-1 block text-xs font-bold uppercase tracking-wider text-white">
              BYTEPROWLER NODE
            </span>
            <span className="mt-2 inline-flex rounded-sm border border-neon-lime/20 bg-neon-lime/10 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-neon-lime">
              {status}
            </span>
            <span className="mt-2 block text-[10px] leading-relaxed text-gray-300">
              MASKED_UI_SIGNAL // BYTEPROWLER
            </span>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {showHiddenLog && (
          <motion.div
            role="status"
            aria-live="polite"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -4 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.18 }}
            className="w-full max-w-[15rem] rounded-sm border border-neon-lime/20 bg-black/85 px-3 py-2 font-mono text-[10px] font-bold uppercase leading-relaxed text-neon-lime"
          >
            HIDDEN_ARC_UNLOCKED: The operator does not follow the matrix.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}