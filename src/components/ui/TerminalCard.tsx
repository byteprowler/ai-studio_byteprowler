import React from "react";
import { Terminal } from "lucide-react";

interface TerminalCardProps {
    children: React.ReactNode;
    title: string;
    command?: string;
    accentColor?: "lime" | "blue" | "purple" | "green";
    className?: string;
}

export default function TerminalCard({
    children,
    title,
    command,
    accentColor = "lime",
    className = "",
}: TerminalCardProps) {
    // Map our tailwind theme highlights based on the selected terminal accent
    const borderColors = {
        lime: "border-neon-lime/15 neon-border-lime hover:border-neon-lime/50",
        blue: "border-neon-blue/15 hover:border-neon-blue/50 shadow-glow-blue/5 hover:shadow-glow-blue/15",
        purple: "border-neon-purple/15 hover:border-neon-purple/50 shadow-glow-purple/5 hover:shadow-glow-purple/15",
        green: "border-neon-green/15 hover:border-neon-green/50 hover:shadow-glow-lime/15"
    };

    const titleColors = {
        lime: "text-neon-lime",
        blue: "text-neon-blue",
        purple: "text-neon-purple",
        green: "text-neon-green"
    };

    return (
        <div
            className={`border bg-black/70 backdrop-blur-sm rounded-sm p-4 w-full flex flex-col font-sans transition-all duration-300 group hover:scale-[1.01] ${borderColors[accentColor]} ${className}`}
        >
            {/* Dynamic Terminal Window Header */}
            <div className="flex justify-between items-center border-b border-white/5 pb-2.5 mb-4 select-none">
                <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60 group-hover:bg-red-500 transition-colors duration-300"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60 group-hover:bg-yellow-500 transition-colors duration-300"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60 group-hover:bg-green-500 transition-colors duration-300"></span>
                </div>
                <div className="text-[11px] text-gray-300 font-mono flex items-center gap-1">
                    <Terminal className="w-3 h-3 text-gray-300" />
                    <span className="tracking-wider uppercase">{title}</span>
                </div>
            </div>

            {/* Terminal input/command prompt decorator */}
            {command && (
                <div className="font-mono text-sm text-gray-300 mb-3 flex items-center gap-1.5 border-b border-white/5 pb-2">
                    <span className="text-neon-lime font-bold">prwlr@guest:~$</span>
                    <span className={`font-semibold ${titleColors[accentColor]}`}>{command}</span>
                    <span className="animate-pulse font-mono font-black">_</span>
                </div>
            )}

            {/* Primary Inner Content of the Card */}
            <div className="grow font-sans text-gray-200 text-sm leading-relaxed">
                {children}
            </div>
        </div>
    );
}
