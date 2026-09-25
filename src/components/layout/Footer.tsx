import { useState } from "react";
import { profile } from "@/lib/profile";
import { siteSettings } from "@/lib/content/siteSettings";
import ResumeProtocol from "@/components/ui/ResumeProtocol";

export default function Footer() {
  const [isResumeProtocolOpen, setIsResumeProtocolOpen] = useState(false);

  return (
    <footer className="w-full max-w-7xl mx-auto px-4 md:px-8 py-5 border-t border-neon-lime/10 text-xs font-mono text-gray-300">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-neon-lime font-black tracking-widest uppercase">BYTEPROWLER</span>
          <span className="uppercase">
            {`Built by ${profile.realName} // ${siteSettings.businessName}`}
          </span>
          <span>{`\u00A9 ${new Date().getFullYear()} ${siteSettings.footerText}`}</span>
          <span
            dir="rtl"
            aria-label="Blessed be YHWH"
            title="Blessed be YHWH"
            className="w-fit text-[12px]"
          >
            {"\u05d1\u05e8\u05d5\u05da \u05d9\u05d4\u05d5\u05d4"}
          </span>
        </div>

        <nav aria-label="Footer links" className="flex flex-wrap items-center gap-2 sm:justify-end">
          {siteSettings.footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label === "EMAIL" ? undefined : "_blank"}
              rel={link.label === "EMAIL" ? undefined : "noopener noreferrer"}
              onClick={(event) => {
                if (link.label === "RESUME") {
                  event.preventDefault();
                  setIsResumeProtocolOpen(true);
                }
              }}
              className="rounded-sm border border-white/5 bg-white/3 px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-300 transition hover:border-neon-lime/25 hover:text-neon-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <ResumeProtocol
        isOpen={isResumeProtocolOpen}
        onClose={() => setIsResumeProtocolOpen(false)}
        source="footer"
        fallbackResumeUrl={siteSettings.resumeUrl}
      />

      {/* Place the real resume file at public/resumes/ when ready. */}
    </footer>
  );
}
