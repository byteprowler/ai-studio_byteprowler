export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issuedAt: string;
  category: string;
  status: "VERIFIED" | "COMPLETED" | "PENDING";
  credentialUrl?: string;
  certificateFile?: string;
  certificateImage?: string;
  description?: string;
  skills: string[];
}

// Place certificate PDFs in public/certificates/.
// Example: public/certificates/apprenticeship-certificate.pdf
// Public PDF URLs should start with /certificates/.
// Preview images can continue to live in public/webp/.
export const certifications: Certification[] = [
  {
    id: "CERT-081-PRWLR",
    title: "Frontend Web Developer",
    issuer: "Univelcity",
    issuedAt: "2024",
    category: "FRONTEND",
    status: "COMPLETED",
    certificateFile: "/certificates/frontend_certificate_by_univelcity.pdf",
    certificateImage: "/webp/frontend_certificate_by_univelcity.webp",
    description: "In-depth specialization covering React Server Components, hydration protocols, low-overhead state routing pipelines, and static generation caching dynamics.",
    skills: ["React Server Components", "Next.js App Router", "Dynamic Caching", "SSR Engines"],
  },
  {
    id: "CERT-092-PRWLR",
    title: "Junior Frontend Engineer",
    issuer: "MentorLed",
    issuedAt: "2025",
    category: "FRONTEND",
    status: "COMPLETED",
    certificateFile: "/certificates/junior_frontend_mentorled.pdf",
    certificateImage: "/webp/junior_frontend_mentorled.webp",
    description: "Certification in layouts, semantic accessibility models, touch-target thresholds, fluid layouts, and cross-browser screen compatibility ratios.",
    skills: ["HTML5 Semantic Node", "CSS Grid & Flexbox", "WAI-ARIA Guidelines", "Responsive Viewports"],
  },
  {
    id: "CERT-103-PRWLR",
    title: "Backend Web Developer",
    issuer: "Univelcity",
    issuedAt: "2024",
    category: "BACKEND",
    status: "VERIFIED",
    certificateFile: "/certificates/backend_certificate_by_univelcity.pdf",
    certificateImage: "/webp/backend_certificate_by_univelcity.webp",
    description: "Covers SQL transactions, table modeling, index policies, row-level safety rules, server auth setups, and API proxy routes.",
    skills: ["SQL Data Modeling", "Supabase Row Safety", "API Design", "PostgreSQL Indexes"],
  },
];
