export type ResumeStatus = "READY" | "DRAFT" | "ARCHIVED";

export interface ResumeProfile {
  id: string;
  label: string;
  roleTags: string[];
  focusAreas: string[];
  bestFor: string;
  file: string;
  description: string;
  status: ResumeStatus;
}

// Place resume PDF files inside:
// public/resumes/
// Example: public/resumes/frontend-resume.pdf
// Then the public URL is: /resumes/frontend-resume.pdf
export const resumeProfiles: ResumeProfile[] = [
  {
    id: "frontend",
    label: "Frontend Developer",
    roleTags: ["frontend", "ui", "react", "nextjs", "tailwind", "web"],
    focusAreas: ["Responsive UI", "React", "Next.js", "Tailwind CSS", "UI implementation", "Responsive design"],
    bestFor:
      "Frontend roles focused on UI implementation, responsive layouts, accessibility, and modern web interfaces.",
    file: "/resumes/frontend-resume.pdf",
    description: "Best match for frontend developer opportunities.",
    status: "READY",
  },
  {
    id: "react-next",
    label: "React / Next.js Developer",
    roleTags: ["react", "nextjs", "frontend", "typescript", "architecture"],
    focusAreas: ["React", "Next.js", "TypeScript", "Frontend architecture", "API integration", "Component systems"],
    bestFor:
      "React and Next.js roles that need component architecture, app routing, API integration, and production UI polish.",
    file: "/resumes/react-next-resume.pdf",
    description: "Best match for React, Next.js, and TypeScript-heavy roles.",
    status: "READY",
  },
  {
    id: "fullstack-junior",
    label: "Junior Fullstack / Backend-Learning",
    roleTags: ["fullstack", "backend", "api", "growth", "frontend", "junior"],
    focusAreas: ["API integration", "Backend learning/growth", "React", "Next.js", "Fullstack systems"],
    bestFor:
      "Junior fullstack or frontend-plus roles where backend learning, APIs, and systems growth matter.",
    file: "/resumes/fullstack-junior-resume.pdf",
    description: "Best match for frontend-to-fullstack growth opportunities.",
    status: "READY",
  },
  {
    id: "technical-writing",
    label: "Technical Writer / API Documentation",
    roleTags: ["documentation", "technical-writing", "api", "docs", "developer-experience"],
    focusAreas: ["Documentation", "API integration", "Developer experience", "Component systems"],
    bestFor:
      "Documentation, API writing, and developer-experience roles that need clear technical communication.",
    file: "/resumes/technical-writing-resume.pdf",
    description: "Best match for technical writing and API documentation opportunities.",
    status: "READY",
  },
  {
    id: "react-email",
    label: "React Email / Email Template Developer",
    roleTags: ["email", "react-email", "templates", "frontend", "responsive"],
    focusAreas: ["Email templates", "Responsive design", "UI implementation", "Component systems"],
    bestFor:
      "Email template and React Email roles focused on reliable responsive messaging interfaces.",
    file: "/resumes/react-email-resume.pdf",
    description: "Best match for React Email and production email template work.",
    status: "READY",
  },
];

export const defaultResumeProfile =
  resumeProfiles.find((profile) => profile.id === "frontend") ?? resumeProfiles[0];
