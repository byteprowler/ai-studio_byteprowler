import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { GitBranch } from "lucide-react";
import { roadmapItems, type RoadmapPhase } from "../../lib/roadmap";
import RoadmapItem from "../ui/RoadmapItem";

const phaseOrder: RoadmapPhase[] = ["Previous Logs", "Current Runtime", "Next Protocol"];

const phaseArcLabels: Record<RoadmapPhase, string> = {
  "Previous Logs": "Previous Logs / Previous Arcs",
  "Current Runtime": "Current Runtime / Current Arc",
  "Next Protocol": "Next Protocol / Next Arc",
};

const roadmapGroups = phaseOrder
  .map((phase) => ({
    phase,
    items: roadmapItems.filter((item) => item.phase === phase),
  }))
  .filter((group) => group.items.length > 0);

export default function Roadmap() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="roadmap" className="py-12 md:py-24 border-t border-neon-lime/5 scroll-mt-28">
      <div className="flex items-center gap-2 mb-8 font-mono text-xs text-gray-400">
        <span className="text-neon-lime font-mono">[03]</span>
        <span className="tracking-widest font-semibold uppercase">BUILD_LOG // TRAINING_ARC_REGISTRY</span>
        <div className="grow h-px bg-neon-lime/10"></div>
        <span className="text-[10px] text-neon-lime/40 uppercase">CURRENT_ARC_ACTIVE</span>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-1.5 border-b border-white/5 pb-6">
          <div className="flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-neon-lime" aria-hidden="true" />
            <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase font-sans tracking-tight">
              Build Log
            </h3>
              <span lang="ja" className="font-mono text-sm font-bold text-neon-lime/80">修行記録</span>
          </div>
          <p className="text-sm font-mono text-gray-400 uppercase">
            {"// CURRENT_ARC: Frontend Architecture -> Fullstack Expansion. Professional build history with a subtle training-arc registry."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {roadmapGroups.map((group, groupIndex) => (
            <div
              key={group.phase}
              className="rounded-sm border border-white/5 bg-black/35 p-4 sm:p-5"
            >
              <div className="mb-5 flex flex-col gap-2 border-b border-white/5 pb-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-[10px] font-black uppercase tracking-widest text-neon-lime">
                  {`[ ${phaseArcLabels[group.phase].toUpperCase().replace(/\s+|\//g, "_")} ]`}
                </span>
                <span className="w-fit rounded-sm border border-white/10 bg-white/3 px-2 py-1 font-mono text-[10px] font-black uppercase tracking-wider text-gray-400">
                  {`${group.items.length} LOG${group.items.length === 1 ? "" : "S"}`}
                </span>
              </div>

              <div className="relative md:pl-8">
                <div className="absolute left-1 top-2 hidden h-[calc(100%-1rem)] w-px bg-linear-to-b from-neon-lime/5 via-neon-lime/20 to-neon-blue/5 md:block" />
                <div className="grid grid-cols-1 gap-4">
                  {group.items.map((item, itemIndex) => {
                    const sequence = groupIndex * 10 + itemIndex;

                    return (
                      <motion.div
                        key={item.id}
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{
                          duration: shouldReduceMotion ? 0.01 : 0.28,
                          delay: shouldReduceMotion ? 0 : sequence * 0.02,
                        }}
                      >
                        <RoadmapItem item={item} index={sequence} />
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
