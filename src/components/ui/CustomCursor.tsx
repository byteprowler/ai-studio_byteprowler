import React, { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type CursorMode = "default" | "interactive" | "text";

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return !!target.closest("a, button, select, summary, [role='button'], [data-cursor='interactive']");
}

function isTextTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return !!target.closest("input, textarea, [contenteditable='true']");
}

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [position, setPosition] = useState({ x: -24, y: -24 });
  const [mode, setMode] = useState<CursorMode>("default");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const detectTimer = window.setTimeout(() => {
      const canHover = window.matchMedia("(hover: hover)").matches;
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      setEnabled(canHover && hasFinePointer);
    }, 0);

    return () => window.clearTimeout(detectTimer);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handlePointerMove = (event: PointerEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });

      if (isTextTarget(event.target)) {
        setMode("text");
        return;
      }

      setMode(isInteractiveTarget(event.target) ? "interactive" : "default");
    };

    const handlePointerLeave = () => {
      setPosition({ x: -24, y: -24 });
      setMode("default");
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, [enabled]);

  if (!enabled || mode === "text") return null;

  return (
    <div
      aria-hidden="true"
      className={`byteprowler-cursor ${mode === "interactive" ? "byteprowler-cursor--interactive" : ""} ${
        shouldReduceMotion ? "byteprowler-cursor--reduced" : ""
      }`}
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    />
  );
}
