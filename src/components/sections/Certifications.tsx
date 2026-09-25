import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { certifications } from "../../lib/certificate";
import CertificationCard from "../ui/CertificationCard";

export default function Certifications() {
    const shouldReduceMotion = useReducedMotion();

    return (
        <section id="certifications" className="py-12 md:py-24 border-t border-neon-lime/5 scroll-mt-20">

            {/* HUD Header Bar Navigation HUD */}
            <div className="flex items-center gap-2 mb-8 font-mono text-xs text-gray-400">
                <span className="text-neon-lime font-mono">[05]</span>
                <span className="tracking-widest font-semibold uppercase">VERIFIED_CREDENTIAL_REPORTS</span>
                <div className="grow h-px bg-neon-lime/10"></div>
                <span className="text-[10px] text-neon-lime/40 uppercase">CERT_VERIFIED</span>
            </div>

            <div className="flex flex-col gap-8">

                {/* Title metadata block */}
                <div className="flex flex-col gap-1.5 border-b border-white/5 pb-6">
                    <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight uppercase font-sans tracking-tight">
                        Verified Credentials
                    </h3>
              <span lang="ja" className="font-mono text-sm font-bold text-neon-green/80">認定記録</span>
                    <p className="text-sm font-mono text-gray-400 uppercase">
                        {"// sys_report: /certifications.log loaded. Displaying certified capability matrices."}
                    </p>
                </div>

                {/* Credentials Grid Listing */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert) => (
                        <motion.div
                            key={cert.id}
                            initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: shouldReduceMotion ? 0.01 : 0.4 }}
                        >
                            <CertificationCard cert={cert} />
                        </motion.div>
                    ))}
                </div>

                {/* Security disclaimer footer */}
                <div className="border border-white/5 bg-black/40 p-4 rounded-sm flex items-start gap-3 mt-4">
                    <div className="p-2 bg-neon-green/10 border border-neon-green/30 rounded-xs text-neon-green">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col font-mono text-[10.5px] leading-relaxed text-gray-400">
                        <span className="text-white font-bold uppercase tracking-wider">
                            PUBLIC DEPLOYMENT TRUST PROTOCOL
                        </span>
                        <span className="mt-0.5 font-mono text-[11px] leading-relaxed text-gray-400">
                            Certificate records link to public files or credential pages when available. Private identifiers stay out of
                            the interface, and verification details can be requested directly through the contact flow.
                        </span>
                    </div>
                </div>

            </div>

        </section>
    );
}
