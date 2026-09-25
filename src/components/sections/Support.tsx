import React from "react";
import { HeartHandshake } from "lucide-react";
import SupportCard from "../ui/SupportCard";

export default function Support() {
    const handleContactScroll = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        e.preventDefault();
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="support" className="py-12 md:py-24 border-t border-neon-lime/5 scroll-mt-20">

            {/* HUD Header Bar Navigation HUD */}
            <div className="flex items-center gap-2 mb-8 font-mono text-xs text-gray-400">
                <span className="text-neon-lime font-mono">[08]</span>
                <span className="tracking-widest font-semibold uppercase">WORK_AND_COLLABORATION_CHANNELS</span>
                <div className="flex-grow h-[1px] bg-neon-lime/10"></div>
                <span className="text-[10px] text-neon-purple/70 uppercase">DECODE_CONNECTED</span>
            </div>

            <div className="flex flex-col gap-8">

                {/* Title metadata block */}
                <div className="flex flex-col gap-1.5 border-b border-white/5 pb-6 select-none">
                    <div className="flex items-center gap-2">
                        <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase font-sans tracking-tight">
                            Work With Me
                        </h3>
                    </div>
                    <p className="text-sm font-mono text-gray-400 uppercase">
                        {"// sys_channel: /work.catalyst active. payment uplink commented out."}
                    </p>
                </div>

                {/* Dynamic Interactive Cards Content */}
                <SupportCard onContactScroll={handleContactScroll} />

                {/* Informative micro note footer */}
                <div className="border border-white/5 bg-black/40 p-4 rounded-sm flex items-start gap-3 mt-2">
                    <div className="p-2 bg-neon-purple/10 border border-neon-purple/30 rounded-xs text-neon-purple select-none">
                        <HeartHandshake className="w-5 h-5 flex-shrink-0" />
                    </div>
                    <div className="flex flex-col font-mono text-[10.5px] leading-relaxed text-gray-400 text-left">
                        <span className="text-white font-bold uppercase tracking-wider select-none">
                            CHANNEL PRIVACY & PAYMENT STATUS
                        </span>
                        <span className="mt-0.5 font-mono text-[11px] leading-relaxed text-gray-400">
                            Work inquiries are routed through contact and email only. Payment support is offline until the future Flutterwave route is reviewed, configured, and intentionally re-enabled.
                        </span>
                    </div>
                </div>

            </div>

        </section>
    );
}
