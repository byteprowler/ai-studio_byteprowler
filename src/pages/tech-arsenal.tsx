import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Cpu, Database, Search, Terminal, X } from "lucide-react";
import Layout from "../components/layout/Layout";
import SEO from "../components/seo/SEO";
import { techCategories, techStack, type TechCategoryId, type TechItem } from "../lib/content/techStack";

const statusClasses: Record<TechItem["status"], string> = {
  CORE: "border-neon-lime/30 bg-neon-lime/10 text-neon-lime",
  ACTIVE: "border-neon-blue/30 bg-neon-blue/10 text-neon-blue",
  LEARNING: "border-neon-purple/30 bg-neon-purple/10 text-neon-purple",
};

function categoryLabel(category: TechItem["category"]) {
  return techCategories.find((item) => item.id === category)?.label ?? category;
}

function experienceLabel(experience = 0) {
  return experience === 1 ? "1 YEAR" : `${experience} YEARS`;
}

export default function TechArsenalPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<TechCategoryId>("ALL");
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const filteredTech = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return techStack.filter((tech) => {
      const matchesCategory = activeCategory === "ALL" || tech.category === activeCategory;
      const searchableText = [tech.name, tech.description, tech.category, tech.status].join(" ").toLowerCase();
      return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery));
    });
  }, [activeCategory, query]);

  useEffect(() => {
    if (!selectedTech) return;

    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedTech(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedTech]);

  return (
    <>
      <SEO
        title="Tech Arsenal | Byteprowler"
        description="Search the full Byteprowler technology arsenal, including frontend systems, frameworks, backend tools, scripting, and development workflow." 
        url="PASTE_CANONICAL_URL_HERE/tech-arsenal"
        image="/og-byteprowler.png"
      />

      <Layout>
        <section className="py-10 md:py-16" aria-labelledby="arsenal-title">
          <div className="mb-8 border-b border-white/5 pb-6">
            <Link
              href="/#tech"
              className="mb-6 inline-flex min-h-10 items-center gap-2 rounded-sm border border-white/10 bg-black/45 px-3 py-2 font-mono text-[11px] font-black uppercase tracking-widest text-neon-lime transition hover:border-neon-lime/40 hover:bg-neon-lime/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              BACK_TO_STACK_PREVIEW
            </Link>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gray-400">
                <Terminal className="h-4 w-4 text-neon-lime" aria-hidden="true" />
                <span className="font-black text-neon-lime">TECH_ARSENAL // FULL_SYSTEM_ACCESS</span>
              </div>
              <h1 id="arsenal-title" className="text-3xl font-black uppercase leading-tight text-white sm:text-5xl">
                Full Tech Arsenal
              </h1>
              <p className="max-w-3xl text-sm leading-relaxed text-gray-300 sm:text-base">
                Searchable registry of the systems, frameworks, and tools currently shaping Byteprowler builds.
              </p>
            </div>
          </div>

          <div className="mb-8 border border-neon-blue/15 bg-black/55 p-4">
            <label htmlFor="tech-search" className="mb-2 block font-mono text-[11px] font-black uppercase tracking-widest text-neon-blue">
              QUERY_SYSTEMS
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neon-blue" aria-hidden="true" />
              <input
                id="tech-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search technologies, categories, or status..."
                className="min-h-11 w-full rounded-sm border border-white/10 bg-black/70 py-2 pl-10 pr-3 font-mono text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-neon-lime focus:ring-2 focus:ring-neon-lime/30"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Technology categories">
              {techCategories.map((category) => {
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category.id)}
                    className={`min-h-10 rounded-sm border px-3 py-2 font-mono text-[10.5px] font-black uppercase tracking-widest transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian ${isActive ? "border-neon-lime bg-neon-lime text-black" : "border-white/10 bg-black/50 text-gray-300 hover:border-neon-blue/40 hover:text-neon-blue"}`}
                  >
                    {category.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-gray-400" aria-live="polite">
            <span>{filteredTech.length} NODES MATCHED</span>
            <span className="text-neon-lime">STATUS: ONLINE</span>
          </div>

          {filteredTech.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filteredTech.map((tech) => {
                  const nodeId = `NODE_${String(techStack.indexOf(tech) + 100).padStart(3, "0")}`;
                  return (
                    <motion.button
                      layout
                      key={tech.name}
                      type="button"
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
                      transition={{ duration: shouldReduceMotion ? 0.01 : 0.22 }}
                      onClick={() => setSelectedTech(tech)}
                      className="group min-h-56 rounded-sm border border-white/10 bg-[#0b0c10]/80 p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-neon-lime/45 hover:bg-black hover:shadow-glow-lime/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian motion-reduce:transform-none"
                      aria-label={`Open details for ${tech.name}`}
                    >
                      <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                        <span className="flex items-center gap-2 text-neon-blue"><Cpu className="h-3.5 w-3.5" aria-hidden="true" />{categoryLabel(tech.category)}</span>
                        <span>{nodeId}</span>
                      </div>
                      <div className="flex items-start justify-between gap-3 pt-5">
                        <h2 className="text-xl font-black uppercase tracking-tight text-white transition group-hover:text-neon-lime">{tech.name}</h2>
                        <span className={`rounded-sm border px-2 py-1 font-mono text-[10px] font-black tracking-widest ${statusClasses[tech.status]}`}>{tech.status}</span>
                      </div>
                      <p className="mt-3 min-h-12 text-sm leading-relaxed text-gray-400">{tech.description}</p>
                      <div className="mt-5 flex items-end justify-between gap-4 font-mono text-[10px] uppercase tracking-widest text-gray-400">
                        <span>EXPERIENCE: {experienceLabel(tech.experience)}</span>
                        <span className="flex gap-1" aria-label={`${tech.experience ?? 0} out of 5 experience level`}>
                          {Array.from({ length: 5 }, (_, index) => <span key={index} className={`h-2 w-3 rounded-xs ${index < (tech.experience ?? 0) ? "bg-neon-lime" : "bg-white/10"}`} aria-hidden="true" />)}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="border border-white/10 bg-black/50 p-6 font-mono text-sm font-bold uppercase text-gray-300">
              NO_SYSTEMS_MATCH_QUERY
            </div>
          )}
        </section>
      </Layout>

      <AnimatePresence>
        {selectedTech && (
          <motion.div
            className="fixed inset-0 z-70 flex items-end justify-center bg-black/75 p-4 backdrop-blur-sm sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) setSelectedTech(null);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="tech-detail-title"
              className="w-full max-w-xl rounded-sm border border-neon-lime/30 bg-[#080a0d] p-5 shadow-glow-lime/10 sm:p-7"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="font-mono text-[11px] font-black uppercase tracking-widest text-neon-lime">NODE_DETAIL // {String(techStack.indexOf(selectedTech) + 100).padStart(3, "0")}</p>
                  <h2 id="tech-detail-title" className="mt-2 text-2xl font-black uppercase text-white">{selectedTech.name}</h2>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={() => setSelectedTech(null)}
                  aria-label="Close technology details"
                  className="rounded-sm border border-white/10 p-2 text-gray-300 transition hover:border-neon-lime/50 hover:text-neon-lime focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-lime"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="grid gap-4 py-5 sm:grid-cols-2">
                <div><span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">CATEGORY</span><p className="mt-1 font-mono text-sm font-bold text-neon-blue">{categoryLabel(selectedTech.category)}</p></div>
                <div><span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">STATUS </span><p className={`mt-1 inline-block rounded-sm border px-2 py-1 font-mono text-xs font-black ${statusClasses[selectedTech.status]}`}>{selectedTech.status}</p></div>
                <div className="sm:col-span-2"><span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">DESCRIPTION</span><p className="mt-1 text-sm leading-relaxed text-gray-200">{selectedTech.description ?? "No description available."}</p></div>
                <div><span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">PROJECTS_USED</span><p className="mt-1 flex items-center gap-2 font-mono text-sm font-bold text-white"><Database className="h-4 w-4 text-neon-lime" aria-hidden="true" />{selectedTech.projectsUsed ?? 0}</p></div>
                <div><span className="font-mono text-[11px] uppercase tracking-widest text-gray-500">EXPERIENCE_LEVEL</span><p className="mt-1 font-mono text-sm font-bold text-white">{experienceLabel(selectedTech.experience)} / 5</p></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
