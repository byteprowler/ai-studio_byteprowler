import React from "react";
import { motion } from "motion/react";
import {
    AlertTriangle,
    ArrowUpRight,
    Briefcase,
    Check,
    Handshake,
    Mail,
    ShieldCheck,
    Terminal,
} from "lucide-react";

interface SupportCardProps {
    onContactScroll: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export default function SupportCard({ onContactScroll }: SupportCardProps) {
    const recruitmentSectors = [
        { sector: "FRONTEND_ENGINE", status: "READY", details: "React, Next.js, Tailwind UI" },
        { sector: "PORTFOLIO_REVAMPS", status: "READY", details: "Personal brands, dashboards, responsive UI" },
        { sector: "CONTRACTS_FREELANCE", status: "READY", details: "Landing pages, MVP interfaces, UI polish" },
    ];

    const channelStatuses = [
        { label: "WORK_CHANNEL", value: "ACTIVE", tone: "text-neon-green border-neon-green/20 bg-neon-green/5" },
        { label: "SUPPORT_CHANNEL", value: "OFFLINE", tone: "text-neon-purple border-neon-purple/20 bg-neon-purple/5" },
        { label: "PAYMENT_UPLINK", value: "COMMENTED_OUT", tone: "text-neon-blue border-neon-blue/20 bg-neon-blue/5" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-stretch">
            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
                className="md:col-span-7 border border-white/5 bg-[#0b0c10]/70 p-6 rounded-sm flex flex-col justify-between hover:border-neon-lime/25 hover:bg-black/75 transition-all duration-300 relative group"
            >
                <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent" />

                <div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 border-b border-white/5 pb-3 mb-4 select-none">
                        <span className="px-2 py-0.5 rounded-xs border border-neon-lime/20 bg-neon-lime/5 text-neon-lime uppercase tracking-wider font-bold">
                            SYS_COLLAB_NODE_01
                        </span>
                        <span className="text-gray-500 tracking-widest">{"// WORK_GATE"}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3 select-none">
                        <Briefcase className="w-5 h-5 text-neon-lime" />
                        <h4 className="text-base font-black text-white uppercase tracking-tight font-sans">
                            Work Collaboration Portal
                        </h4>
                    </div>

                    <p className="text-xs text-gray-400 font-sans leading-relaxed mb-6 border-l-2 border-white/10 pl-3">
                        Byteprowler is open for frontend builds, portfolio revamps, UI polish, and small product interfaces. The active channel is work-focused: start a project, hire, collaborate, or request a build review.
                    </p>

                    <div className="flex flex-col gap-2 font-mono text-[10.5px] mb-6">
                        <span className="text-[10px] text-gray-400 font-extrabold uppercase border-b border-white/5 pb-1 mb-1 tracking-widest block">
                            SUPPORTED_DEPLOYMENT_FIELDS:
                        </span>
                        {recruitmentSectors.map((role) => (
                            <div key={role.sector} className="flex justify-between items-center gap-4 py-1 border-b border-white/5 group/row hover:border-white/10 transition-colors">
                                <div className="flex flex-col text-left">
                                    <span className="text-white font-bold group-hover/row:text-neon-lime duration-200">{role.sector}</span>
                                    <span className="text-[10px] text-gray-400 uppercase">{role.details}</span>
                                </div>
                                <span className="text-[10px] text-neon-green font-bold bg-neon-green/5 border border-neon-green/20 px-1.5 py-1 rounded-xs flex items-center gap-1 leading-none select-none">
                                    <Check className="w-2.5 h-2.5" /> {role.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={onContactScroll}
                        className="flex-grow py-2.5 px-4 font-mono text-[10.5px] font-black uppercase rounded-xs border border-transparent bg-neon-lime/90 hover:bg-neon-lime text-black shadow-glow-lime/10 hover:shadow-glow-lime/20 cursor-pointer flex items-center justify-center gap-1.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                    >
                        <Handshake className="w-4 h-4" />
                        <span>START_A_PROJECT</span>
                    </button>

                    <a
                        href="mailto:joshuaexcellency1@gmail.com"
                        className="py-2.5 px-4 font-mono text-[10.5px] font-black uppercase rounded-xs border border-white/10 hover:border-neon-lime bg-white/5 hover:bg-black text-white hover:text-neon-lime flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                    >
                        <Mail className="w-3.5 h-3.5" />
                        <span>CONTACT_ME</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.06 }}
                className="md:col-span-5 border border-white/5 bg-[#0b0c10]/70 p-6 rounded-sm flex flex-col justify-between hover:border-neon-purple/25 hover:bg-black/75 transition-all duration-300 relative group"
            >
                <div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-400 border-b border-white/5 pb-3 mb-4 select-none">
                        <span className="px-2 py-0.5 rounded-xs border border-neon-purple/20 bg-neon-purple/5 text-neon-purple uppercase tracking-wider font-bold">
                            SYS_PAYMENT_GATE
                        </span>
                        <span className="text-gray-500 tracking-widest">{"// OFFLINE"}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-3 select-none">
                        <Terminal className="w-5 h-5 text-neon-purple" />
                        <h4 className="text-base font-black text-white uppercase tracking-tight font-sans">
                            Open Channels
                        </h4>
                    </div>

                    <p className="text-xs text-gray-400 font-sans leading-relaxed mb-5 border-l-2 border-white/10 pl-3">
                        Payment support is intentionally disabled while the project stays focused on hiring, collaboration, and production-ready portfolio work.
                    </p>

                    <div className="flex flex-col gap-2 font-mono">
                        {channelStatuses.map((item) => (
                            <div key={item.label} className="flex items-center justify-between gap-3 border-b border-white/5 py-2 text-[10px]">
                                <span className="font-bold uppercase tracking-wider text-gray-400">{item.label}</span>
                                <span className={`rounded-sm border px-2 py-1 font-black uppercase tracking-wider ${item.tone}`}>
                                    {item.value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 rounded-sm border border-neon-purple/15 bg-neon-purple/5 p-3 font-mono text-[11px] leading-relaxed text-gray-400">
                    <div className="mb-1 flex items-center gap-1.5 font-black uppercase tracking-wider text-neon-purple">
                        <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                        Payment integration parked
                    </div>
                    <p>
                        Flutterwave and sponsor links are commented out until the payment route, compliance copy, and live configuration are ready.
                    </p>
                    {/* Re-enable later: add the Flutterwave payment URL/button here after production payment setup is complete. */}
                    {/* Example future state: <a href={flutterwavePaymentUrl}>SUPPORT_BYTEPROWLER</a> */}
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-white/5 pt-3 font-mono text-[10px] uppercase tracking-wider text-gray-400">
                    <ShieldCheck className="h-4 w-4 text-neon-green" aria-hidden="true" />
                    No payment details are collected on this interface.
                </div>
            </motion.div>
        </div>
    );
}
