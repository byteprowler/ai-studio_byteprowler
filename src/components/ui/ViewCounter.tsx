import React, { useState, useEffect, useRef } from "react";
import { Eye } from "lucide-react";

/**
 * ViewCounter Component
 * Standard stats display that handles persistent tracking of sessions securely.
 * Automatically buffers multiple loads during React developments, increments precisely once
 * per visitor session using client-side sessionStorage, and aligns with the hacker prompt direction.
 */
export default function ViewCounter() {
  const [views, setViews] = useState<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const networkFired = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined" || networkFired.current) return;
    networkFired.current = true;

    // sessionStorage acts as a session boundary to protect database from duplicate tallies
    const isSessionTallied = sessionStorage.getItem("byteprowler_sync_view_tallied");

    const syncCounter = async () => {
      try {
        const method = isSessionTallied ? "GET" : "POST";
        const response = await fetch("/api/view", {
          method,
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("HTTP response link terminal error");
        }

        const data = await response.json();
        
        if (typeof data.count === "number") {
          setViews(data.count);
          if (!isSessionTallied) {
            sessionStorage.setItem("byteprowler_sync_view_tallied", "true");
          }
        } else {
          throw new Error("Stream integrity error: count missing from data object");
        }
      } catch (error) {
        console.error("ViewCounter synchronization failed:", error);
        setHasError(true);
      }
    };

    syncCounter();
  }, []);

  // Format with leading zeros for that genuine early systems/terminal look
  const padViews = views !== null ? String(views).padStart(6, "0") : "------";

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 border border-neon-lime/15 bg-black/60 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-sm font-mono text-[10px] sm:text-[11px] uppercase select-none transition-all duration-300 neon-border-lime">
      <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neon-lime animate-pulse shrink-0" />
      <span className="text-gray-400 font-bold tracking-widest text-[10px] sm:text-[10px] max-[440px]:hidden">VIEWS:</span>
      {hasError ? (
        <span className="text-red-500 font-black tracking-wider text-[10px] sm:text-[11px] bg-red-950/20 px-1 rounded-sm">
          LINK_ERR
        </span>
      ) : views === null ? (
        <span className="text-neon-lime/40 animate-pulse font-bold tracking-widest text-[10px] sm:text-[11px]">
          CONNECTING...
        </span>
      ) : (
        <span className="text-neon-lime font-black tracking-wider neon-glow-lime text-[10px] sm:text-[11px]">
          {padViews}
        </span>
      )}
    </div>
  );
}
