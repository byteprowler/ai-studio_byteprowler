export interface ProfileContent {
  brandName: string;
  realName: string;
  role: string;
  classTag: string;
  tagline: string;
  shortBio: string;
  detailedBio: string;
  location: string;
  status: string;
  availabilityStatus: string;
  responseMode: string;
  resumeUrl: string;
  avatarImage: string;
  bootStartedAt: string;
  developerStartYear: string;
  currentArc: string;
  systemVersion: string;
  systemStatus: string;
}

export const profile: ProfileContent = {
  brandName: "BYTEPROWLER",
  realName: "Joshua Ogo",
  role: "Frontend Developer",
  classTag: "FRONTEND // FULLSTACK GROWTH",
  tagline: "> FRONTEND DEVELOPER // SYSTEMS UI",
  shortBio: "Frontend developer crafting fast, clean, responsive web interfaces with React, Next.js, Tailwind CSS, and TypeScript.",
  detailedBio:
    "Frontend developer crafting fast, clean, and responsive web interfaces with React, Next.js, Tailwind CSS, and TypeScript. I focus on accessible interaction patterns, polished motion, and frontend architecture that can grow into fullstack systems.",
  location: "Remote / UK_SECTOR_01",
  status: "AVAILABLE_FOR_COLLABORATION",
  availabilityStatus: "OPEN_TO_FRONTEND_AND_FULLSTACK",
  responseMode: "async_loop",
  resumeUrl: "/resumes/frontend-resume.pdf",
  avatarImage: "/avatar/operator-avatar-placeholder.png",
  bootStartedAt: "2024-01-01",
  developerStartYear: "2024",
  currentArc: "Frontend Systems -> Fullstack Expansion",
  systemVersion: "v1.0.4",
  systemStatus: "ONLINE_GRID",
};
