import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const BRAND_ENGLISH = "BYTEPROWLER";
const BRAND_KATAKANA = "\u30d0\u30a4\u30c8\u30d7\u30ed\u30a6\u30e9\u30fc";
const GLITCH_DURATION_MS = 1000;
const SWITCH_INTERVAL_MS = 15000;

export default function GlitchBrandTitle() {
  const shouldReduceMotion = useReducedMotion();
  const [isGlitchActive, setIsGlitchActive] = useState(false);
  const [isKatakanaPhase, setIsKatakanaPhase] = useState(false);
  const glitchTimeoutRef = useRef<number | null>(null);
  const loopIntervalRef = useRef<number | null>(null);

  const triggerGlitch = useCallback(() => {
    if (shouldReduceMotion) return;

    setIsKatakanaPhase((currentPhase) => !currentPhase);
    setIsGlitchActive(true);

    if (glitchTimeoutRef.current) {
      window.clearTimeout(glitchTimeoutRef.current);
    }

    glitchTimeoutRef.current = window.setTimeout(() => {
      setIsGlitchActive(false);
      glitchTimeoutRef.current = null;
    }, GLITCH_DURATION_MS);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    loopIntervalRef.current = window.setInterval(triggerGlitch, SWITCH_INTERVAL_MS);

    return () => {
      if (loopIntervalRef.current) window.clearInterval(loopIntervalRef.current);
      if (glitchTimeoutRef.current) window.clearTimeout(glitchTimeoutRef.current);
    };
  }, [shouldReduceMotion, triggerGlitch]);

  const overlayText = isKatakanaPhase ? BRAND_KATAKANA : BRAND_ENGLISH;
  const overlayLang = isKatakanaPhase ? "ja" : "en";

  return (
    <motion.h1
      aria-label="Byteprowler"
      initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: "easeOut" }}
      onMouseEnter={triggerGlitch}
      className={`glitch-brand-title text-5xl sm:text-7xl lg:text-8xl font-black font-sans leading-none tracking-tight uppercase text-neon-lime neon-glow-lime ${
        isGlitchActive ? "glitch-brand-title--active" : ""
      } ${isKatakanaPhase ? "glitch-brand-title--katakana" : ""}`}
    >
      <span aria-hidden="true" className="glitch-brand-title__stage">
        <span className="glitch-brand-title__base">{BRAND_ENGLISH}</span>
        <span lang={overlayLang} className="glitch-brand-title__layer glitch-brand-title__layer--red">{overlayText}</span>
        <span lang={overlayLang} className="glitch-brand-title__layer glitch-brand-title__layer--cyan">{overlayText}</span>
        <span lang={overlayLang} className="glitch-brand-title__layer glitch-brand-title__slice glitch-brand-title__slice--top">{overlayText}</span>
        <span lang={overlayLang} className="glitch-brand-title__layer glitch-brand-title__slice glitch-brand-title__slice--mid">{overlayText}</span>
        <span lang={overlayLang} className="glitch-brand-title__layer glitch-brand-title__slice glitch-brand-title__slice--low">{overlayText}</span>
        <span className="glitch-brand-title__scanline" />
      </span>
    </motion.h1>
  );
}