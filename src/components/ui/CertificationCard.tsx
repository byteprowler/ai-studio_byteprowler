import React from "react";
import Image from "next/image";
import { CheckCircle2, ShieldAlert, ArrowUpRight, HelpCircle, FileText } from "lucide-react";
import { Certification } from "../../lib/certificate";

interface CertificationCardProps {
    cert: Certification;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ cert }) => {
    const isVerified = cert.status === "VERIFIED" || cert.status === "COMPLETED";
    const certificateHref = cert.credentialUrl || cert.certificateFile || cert.certificateImage;
    const certificateLabel = cert.credentialUrl ? "VIEW CREDENTIAL" : "VIEW CERTIFICATE";
    const categoryKey = cert.category.toUpperCase();

    const categoryColors: Record<string, string> = {
        FRONTEND: "text-neon-lime border-neon-lime/25 bg-neon-lime/5",
        BACKEND: "text-neon-purple border-neon-purple/25 bg-neon-purple/5",
        TOOLS: "text-neon-blue border-neon-blue/25 bg-neon-blue/5",
        DESIGN: "text-neon-green border-neon-green/25 bg-neon-green/5"
    };
    const categoryClass = categoryColors[categoryKey] ?? "text-gray-300 border-white/10 bg-white/5";

    return (
        <div
            className="border border-white/5 bg-[#0b0c10]/70 p-5 rounded-sm flex flex-col justify-between h-auto hover:border-neon-lime/30 hover:bg-black/80 transition-all duration-300 group shadow-md hover:shadow-glow-lime/5 relative select-none transform hover:-translate-y-1 motion-reduce:transform-none motion-reduce:hover:translate-y-0"
        >
            {/* Visual cybernetic accent decoration line */}
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-white/5 to-transparent"></div>

            <div>
                {/* Header telemetry and metadata bar */}
                <div className="flex justify-between items-center text-[11px] font-mono text-gray-300 border-b border-white/5 pb-3 mb-4">
                    <span className={`px-2 py-0.5 rounded-xs border uppercase tracking-wider ${categoryClass}`}>
                        {cert.category}
                    </span>
                    <span className="text-gray-300 tracking-widest">CERT_NODE</span>
                </div>

                {cert.certificateImage && (
                    <a
                        href={cert.certificateImage}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        aria-label={`View ${cert.title} certificate preview`}
                        className="mb-4 block overflow-hidden rounded-sm border border-white/5 bg-black/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                    >
                        <Image
                            src={cert.certificateImage}
                            alt={`${cert.title} certificate preview`}
                            width={640}
                            height={360}
                            className="h-32 w-full object-cover opacity-75 grayscale transition duration-300 group-hover:opacity-90 group-hover:grayscale-0"
                        />
                    </a>
                )}

                {/* Certificate title heading */}
                <h4 className="text-base font-black text-white uppercase tracking-tight line-clamp-2 leading-snug group-hover:text-neon-lime transition-all duration-300 font-sans">
                    {cert.title}
                </h4>

                {/* Issuer and timestamp parameters */}
                <div className="flex items-center gap-2 mt-2 font-mono text-[11px] text-gray-300">
                    <span className="text-gray-300">AUTHORITY:</span>
                    <span className="font-bold text-white uppercase">{cert.issuer}</span>
                    <span className="text-gray-300">{`// ${cert.issuedAt}`}</span>
                </div>

                {/* Short specification logs */}
                {cert.description && (
                    <p className="text-sm text-gray-300 leading-relaxed font-sans mt-3 border-l-2 border-white/5 pl-3">
                        {cert.description}
                    </p>
                )}

                {/* Credential skill targets */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                    {cert.skills.map((skill) => (
                        <span
                            key={skill}
                            className="text-[10.5px] font-mono text-gray-300 border border-white/5 bg-white/5 px-2 py-0.5 rounded-xs uppercase tracking-wider"
                        >
                            # {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer controls & badge verify indicator */}
            <div className="border-t border-white/5 pt-4 mt-6 flex flex-wrap justify-between items-center gap-3 bg-transparent">
                {/* Verification indicator */}
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                    {isVerified ? (
                        <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-neon-green animate-pulse" aria-hidden="true" />
                            <span className="text-neon-green font-black tracking-widest bg-neon-green/5 border border-neon-green/15 px-1.5 py-0.5 rounded-xs">
                                {cert.status === "COMPLETED" ? "COMPLETED" : "VERIFIED_STABLE"}
                            </span>
                        </>
                    ) : (
                        <>
                            <ShieldAlert className="w-3.5 h-3.5 text-neon-purple animate-pulse" aria-hidden="true" />
                            <span className="text-neon-purple font-black tracking-widest bg-neon-purple/5 border border-neon-purple/15 px-1.5 py-0.5 rounded-xs">
                                PENDING_DECRYPT
                            </span>
                        </>
                    )}
                </div>

                {/* Public platform URLs and local files both open in a new tab. */}
                {certificateHref && isVerified ? (
                    <a
                        href={certificateHref}
                        target="_blank"
                        referrerPolicy="no-referrer"
                        rel="noopener noreferrer"
                        aria-label={`${cert.credentialUrl ? "View credential" : "View certificate"} for ${cert.title}`}
                        className="min-h-10 text-[11px] font-mono font-bold text-neon-lime hover:text-white flex items-center gap-1 group/link transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian rounded-sm px-1"
                    >
                        {cert.certificateFile ? (
                            <FileText className="w-3 h-3 text-neon-lime group-hover/link:text-white transition-colors duration-200" aria-hidden="true" />
                        ) : null}
                        <span>{certificateLabel}</span>
                        <ArrowUpRight className="w-3 h-3 text-neon-lime group-hover/link:text-white transition-colors duration-200" />
                    </a>
                ) : (
                    <div className="text-[10.5px] font-mono font-bold text-gray-300 flex items-center gap-1 select-none" title="Credential pending">
                        <HelpCircle className="w-3 h-3" aria-hidden="true" />
                        <span>CREDENTIAL PENDING</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CertificationCard;
