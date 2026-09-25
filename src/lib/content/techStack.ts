export type TechCategoryId = "ALL" | "CORE" | "FRAMEWORKS" | "STYLING" | "SCRIPTING" | "BACKEND" | "TOOLS";
export type TechStatus = "CORE" | "ACTIVE" | "LEARNING";

export interface TechCategory {
  id: TechCategoryId;
  label: string;
}

export interface TechItem {
  name: string;
  category: Exclude<TechCategoryId, "ALL">;
  status: TechStatus;
  level?: string;
  description?: string;
  experience?: number;
  projectsUsed?: number;
  icon?: string;
}

export const techCategories: TechCategory[] = [
  { id: "ALL", label: "ALL_SYSTEMS" },
  { id: "CORE", label: "FRONTEND_CORE" },
  { id: "FRAMEWORKS", label: "FRAMEWORKS" },
  { id: "STYLING", label: "STYLING_AND_MOTION" },
  { id: "SCRIPTING", label: "SCRIPTING" },
  { id: "BACKEND", label: "BACKEND_AND_DATA" },
  { id: "TOOLS", label: "DEVELOPMENT_TOOLS" },
];

export const techStack: TechItem[] = [
  { name: "HTML5", category: "CORE", status: "CORE", description: "Semantic structure for accessible, resilient interfaces.", experience: 3, projectsUsed: 18 },
  { name: "CSS3", category: "CORE", status: "CORE", description: "Responsive layout, visual systems, and browser-native interaction.", experience: 3, projectsUsed: 18 },
  { name: "JavaScript", category: "CORE", status: "CORE", description: "The runtime language behind interactive frontend systems.", experience: 3, projectsUsed: 18 },
  { name: "TypeScript", category: "CORE", status: "CORE", description: "Typed application code for safer, more maintainable builds.", experience: 3, projectsUsed: 14 },
  { name: "React", category: "FRAMEWORKS", status: "CORE", description: "Component architecture for expressive, reusable interfaces.", experience: 3, projectsUsed: 15 },
  { name: "Next.js", category: "FRAMEWORKS", status: "ACTIVE", description: "Fullstack React delivery with routing, APIs, and SEO primitives.", experience: 3, projectsUsed: 10 },
  { name: "Vue", category: "FRAMEWORKS", status: "ACTIVE", description: "Progressive framework experience for flexible UI delivery.", experience: 1, projectsUsed: 2 },
  { name: "Angular", category: "FRAMEWORKS", status: "LEARNING", description: "Structured frontend framework currently in the learning queue.", experience: 1, projectsUsed: 1 },
  { name: "Nuxt", category: "FRAMEWORKS", status: "LEARNING", description: "Vue meta-framework exploration for production patterns.", experience: 1, projectsUsed: 1 },
  { name: "Tailwind CSS", category: "STYLING", status: "CORE", description: "Utility-first styling system for consistent responsive interfaces.", experience: 3, projectsUsed: 14 },
  { name: "motion.dev", category: "STYLING", status: "ACTIVE", description: "Focused motion and transition systems that reinforce interaction.", experience: 2, projectsUsed: 8 },
  { name: "Vite", category: "STYLING", status: "ACTIVE", description: "Fast development tooling for lean frontend experiments.", experience: 1, projectsUsed: 5 },
  { name: "Node.js", category: "BACKEND", status: "LEARNING", description: "JavaScript runtime for APIs, automation, and server tooling.", experience: 2, projectsUsed: 5 },
  { name: "Python", category: "BACKEND", status: "LEARNING", description: "General-purpose scripting and backend language in active study.", experience: 1, projectsUsed: 2 },
  { name: "Django", category: "BACKEND", status: "LEARNING", description: "Python web framework explored for structured backend systems.", experience: 1, projectsUsed: 1 },
  { name: "SQL", category: "BACKEND", status: "ACTIVE", description: "Relational querying and data modeling for application backends.", experience: 2, projectsUsed: 5 },
  { name: "Supabase", category: "BACKEND", status: "LEARNING", description: "Hosted database and authentication services for rapid products.", experience: 1, projectsUsed: 3 },
  { name: "Bash Scripting", category: "SCRIPTING", status: "LEARNING", description: "Command-line automation for local development workflows.", experience: 1, projectsUsed: 4 },
  { name: "Git", category: "TOOLS", status: "CORE", description: "Version control for deliberate, traceable software delivery.", experience: 3, projectsUsed: 18 },
  { name: "GitHub", category: "TOOLS", status: "CORE", description: "Collaboration, code hosting, and deployment workflow hub.", experience: 3, projectsUsed: 18 },
  { name: "Figma", category: "TOOLS", status: "LEARNING", description: "Interface planning and visual collaboration tool.", experience: 1, projectsUsed: 6 },
];
