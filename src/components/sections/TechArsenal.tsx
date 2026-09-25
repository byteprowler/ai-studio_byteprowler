import React from "react";
import Link from "next/link";
import { ArrowUpRight, Cpu, Globe } from "lucide-react";
import { techStack } from "../../lib/content/techStack";

export default function TechArsenal() {
    const previewTech = techStack.filter((tech) => tech.status !== "LEARNING").slice(0, 8);

    return (
        <section id="tech" className="py-12 md:py-24 border-t border-neon-lime/5 scroll-mt-20">

            {/* Section Indicator HUD Header */}
            <div className="flex items-center gap-2 mb-8 font-mono text-xs text-gray-400">
                <span className="text-neon-lime font-mono">[03]</span>
                <span className="tracking-widest font-semibold uppercase">TECH_ARSENAL_MODULE</span>
                <div className="grow h-px bg-neon-lime/10"></div>
                <span className="text-[10px] text-neon-lime/40 uppercase">STACK_COMPILED</span>
            </div>

            <div className="flex flex-col gap-6">

                {/* Terminal Section Header and Filters */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-6">
                    <div className="flex flex-col gap-1.5">
                        <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase font-sans tracking-tight">
                            Core Stack & Tools
                        </h3>
                        <p className="text-sm font-mono text-gray-400">
                            [SYSTEM_CHECK] The active stack powering current Byteprowler builds.
                        </p>
                    </div>
                    <Link href="/tech-arsenal" className="terminal-button inline-flex items-center gap-2 border-neon-lime/40 bg-neon-lime text-black hover:bg-[#bbf000]">
                        ACCESS FULL ARSENAL
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>

                {/* Tech Grid output */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {previewTech.map((tech, index) => (
                            <div
                                key={tech.name}
                                className="border border-white/5 bg-[#0b0c10]/70 p-4 rounded-sm flex flex-col justify-between h-32 transition-all duration-300 group hover:-translate-y-0.5 hover:border-neon-lime/30 hover:bg-black select-none"
                            >
                                {/* Header indicators */}
                                <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 border-b border-white/5 pb-2">
                                    <span className="flex items-center gap-1">
                                        <Cpu className="w-3 h-3 text-neon-lime animate-pulse" aria-hidden="true" />
                                        {tech.category}
                                    </span>
                                    <span>NODE_{100 + index}</span>
                                </div>

                                {/* Tech Name Label */}
                                <span className="text-lg font-bold text-white font-sans uppercase tracking-tight group-hover:text-neon-lime transition-all duration-300 pt-2">
                                    {tech.name}
                                </span>

                                {/* Dynamic Status Badging */}
                                <div className="flex justify-between items-center font-mono text-[10px] mt-2">
                                    <span className="text-gray-400 tracking-wider">SEC_LEVEL</span>
                                        <span className={`font-black tracking-widest px-1.5 py-0.5 rounded-xs ${tech.status === "CORE" ? "bg-neon-lime/10 text-neon-lime border border-neon-lime/20" : "bg-neon-blue/10 text-neon-blue border border-neon-blue/20"}`}>
                                        [{tech.status}]
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Legend block display */}
                <div className="border border-white/5 bg-black/30 p-4 rounded-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 font-mono text-[10px] text-gray-400">
                    <div className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-neon-lime animate-pulse" />
                        <span>ALL STACK MODULES COMPILED TO BYTEPROWLER INTERFACE V1.0.4.</span>
                    </div>

                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-lime"></span>
                            CORE = PRODUCTION DEPTH
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue"></span>
                            ACTIVE = DEPLOYMENT FLUENT
                        </span>
                        <span className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-neon-purple"></span>
                            LEARNING = GROWTH VECTORS
                        </span>
                    </div>
                </div>

            </div>

        </section>
    );
}
