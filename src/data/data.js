import { TbSettingsCog } from "react-icons/tb";
import { IoMailOpen, IoLayers } from "react-icons/io5";
import { 
  HiHome
} from 'react-icons/hi2';
import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaQuoteLeft,
  FaBitcoin,
  FaEthereum,
  FaAccessibleIcon, 
  FaLaptop 
} from "react-icons/fa";
import {IoMdColorPalette, IoMdSearch} from 'react-icons/io'
import {
  SiNextdotjs,
  SiFramer,
  SiPython,
  SiDjango,
  SiTailwindcss,
  SiSqlite,
  SiSolana,
  SiTether,
  SiPinetwork
} from "react-icons/si";
import { AiOutlineMobile } from "react-icons/ai";
import { BiLogoTypescript } from "react-icons/bi";
import { BsBank, BsLaptop, BsTools } from "react-icons/bs";
import { FaGitAlt, FaRegCircleUser } from "react-icons/fa6";
import {
  RxPencil2,
  RxDesktop,
  RxReader,
  RxRocket,
  RxArrowTopRight,
  RxGlobe,
  RxHome,
  RxGear,
  RxLaptop,
} from "react-icons/rx";


export const display = [
  {
    id: 1,
    slug: "tech-gamer-network",
    title: "TGN",
    url: "/tgn.png",
    link: "https://tgn-two.vercel.app/",
    sourceCode: "https://github.com/byteprowler/univelcityproject",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description:
      "A tech blog and community platform for gamers, featuring articles, reviews, and discussions on the latest gaming trends.",
    color: "#F13024",
  },
  {
    id: 2,
    slug: "de-clothing",
    title: "De-Clothing",
    url: "/de-clothing.png",
    link: "https://de-clothing.vercel.app",
    sourceCode: "https://github.com/byteprowler/DE-Clothing",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description:
      "An e-commerce platform for clothing and accessories, offering a wide range of products with a user-friendly shopping experience.",
    color: "#FACC15",
  },
  {
    id: 3,
    slug: "jl-powertools",
    title: "J&L Powertools",
    url: "/j&lpowertools.png",
    link: "https://www.jlpowertools.biz",
    sourceCode: "https://github.com/byteprowler/jlpowertools",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description:
      "A business website showcasing products and services, built with responsive UI, strong structure, and SEO-friendly pages.",
    color: "#22C55E",
  },
  {
    id: 4,
    slug: "byteprowler-portfolio",
    title: "Portfolio",
    url: "/byteprowler.png",
    link: "https://byteprowler.vercel.app",
    sourceCode: "https://github.com/byteprowler/bytepr0wler",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description:
      "A personal portfolio website showcasing projects and skills, designed to attract clients and recruiters.",
    color: "#A855F7",
  },
  {
    id: 5,
    slug: "mentorled-landing",
    title: "Landing Page",
    url: "/blank.jpg",
    link: "https://mentorled-landing-nine.vercel.app/",
    sourceCode: "https://github.com/byteprowler/mentorled-landing",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description:
      "A landing page focused on clear sections, strong layout, and conversion-friendly structure.",
    color: "#38BDF8",
  },
  {
    id: 6,
    slug: "mentorled-admin",
    title: "Admin Interface",
    url: "/blank.jpg",
    link: "https://mentorled-admin.vercel.app/",
    sourceCode: "https://github.com/byteprowler/mentorled-admin",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "An admin dashboard UI for managing products, users, and content.",
    color: "#F59E0B",
  },
  {
    id: 7,
    slug: "mentorled-multi-step-form",
    title: "Multi-Step Form",
    url: "/blank.jpg",
    link: "https://mentorled-form.vercel.app/",
    sourceCode: "https://github.com/byteprowler/mentorled-form",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description:
      "A multi-step form for collecting user information with smooth steps and a user-friendly flow.",
    color: "#F13024",
  },
  {
    id: 8,
    slug: "mentorled-product-showcase",
    title: "Product Showcase",
    url: "/blank.jpg",
    link: "https://mentorled-product.vercel.app/",
    sourceCode: "https://github.com/byteprowler/mentorled-product",
    techStack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description:
      "A product showcase page with structured sections, product details, visuals, and a clean layout.",
    color: "#10B981",
  },
];

// Fix invalid colors (your previous ones were not valid hex)
export const COLORS_TOP = ["#F13024", "#111827", "#0EA5E9", "#F15090"];

export const aboutData = [
  {
    title: "skills",
    info: [
      {
        title: "Frontend Developer",
        icons: [
          // keep yours as-is
        ],
      },
      {
        title: "Backend (Django Fundamentals)",
        icons: [
          // keep yours as-is
        ],
      },
      {
        title: "Version Control",
        icons: [
          // keep yours as-is
        ],
      },
    ],
  },
  {
    title: "experience",
    info: [
      {
        title: "Frontend Developer (Freelance) — Backend-aware (Django/JWT)",
        stage: "2024 - current",
      },
    ],
  },
  {
    title: "credentials",
    info: [
      {
        title: "Mobile Engineer - Samford Dc Phone Hub",
        stage: "2023",
      },
      {
        title: "Full-stack Web Development - Univelcity, Yaba, Lagos",
        stage: "2024",
      },
      {
        title: "Junior Frontend Engineer - Mentorled, Lagos",
        stage: "2025",
      },
    ],
  },
];

export const wallets = [
    {
      name: "Bitcoin",
      icon: <FaBitcoin className="text-orange-500" />, 
      networks: [{ network: "Mainnet", address: "bc1qy3nmk8uauha969qk953g2z9teqcxktl7aqk95z" }],
    },
    {
      name: "Ethereum",
      icon: <FaEthereum className="text-purple-500" />, 
      networks: [
        { network: "ERC-20", address: "0x679BAd07Ea83253D25373f69963cf61f458800cb" },
        { network: "BEP-20", address: "0x1f5424b0f838e3fbb61edeba5fd0f39b8c5eae46" },
      ],
    },
    {
      name: "Pi Network",
      icon: <SiPinetwork className="text-yellow-500" />, 
      networks: [{ network: "Pi Network", address: "MDFNWH6ZFJVHJDLBMNOUT35X4EEKQVJAO3ZDL4NL7VQJLC4PJOQFWAAAAABC4YPK734CE" }],
    },
    {
      name: "Solana",
      icon: <SiSolana className="text-purple-500" />, 
      networks: [{ network: "SOL", address: "9H3WYyqTtryoP49hW52cpJE7PArtEk4Uz4SSt6wcW2pk" }],
    },
    {
      name: "USDT",
      icon: <SiTether className="text-green-600" />, 
      networks: [{ network: "BEP-20", address: "0x1f5424b0f838e3fbb61edeba5fd0f39b8c5eae46" }],
    },
];


export const banks = [
  {
    name: "Guaranty Trust Bank",
    icon: <BsBank className="text-blue-500" />,
    NUBAN: "1015207029",
    accountName: "Ogo Joshua Agama",
  },
  {
    name: "Kuda MFB",
    icon: <BsBank className="text-purple-800" />,
    NUBAN: "2078636332",
    accountName: "Ogo Joshua Agama",
  },
  {
    name: "Globus Bank",
    icon: <BsBank className="text-green-500" />,
    NUBAN: "3994834344",
    accountName: "Ogo Joshua Agama",
  },
];


export const botNav = [
  { name: 'Home', path: '/', icon: <HiHome />, title: "Home", ariaLabel: 'Home' },
  { name: 'About', path: '/about', icon: <FaRegCircleUser />, title: "About", ariaLabel: 'About' },
  { name: 'Projects', path: '/projects', icon: <IoLayers />, title: "Projects", ariaLabel: 'Projects' },
  { name: 'Services', path: '/services', title: "Services", icon: <TbSettingsCog />, ariaLabel: 'Services' },
  { name: 'Testimonials', path: '/testimonials', icon: <FaQuoteLeft />, title: "Testimonials", ariaLabel: 'Testimonial' },
  { name: 'Contact', path: '/contact', icon: <IoMailOpen />, title: "Contact", ariaLabel: 'Contact' },
];

export const testimonials = [
  {
    id: 1,
    image: "/micode.jpg",
    name: "Miracle King",
    position: "Backend Tutor",
    message: "Awaiting Response.",
    rating: 5,
    date: "2023-01-15",
  },
  {
    id: 2,
    image: "/t-avt-2.png",
    name: "Coderite",
    position: "Frontend Tutor",
    message: "Awaiting Response.",
    rating: 4,
    date: "2023-02-10",
  },
  {
    id: 3,
    image: "/byteprowler.jpeg",
    name: "ByteProwler",
    position: "Myself",
    message:
    "Byte once said, 'Good things take time. Don’t feel pressured by peers chasing quick money through fraud. Stay focused, stay consistent, and success will come.",
    rating: 5,
    date: "2023-03-05",
  },
  {
    id: 4,
    image: "/t-avt-2.png",
    name: "Charles Chibuzo Igweze",
    position: "Backend Classmate",
    message: "Awaiting Response.",
    rating: 4,
    date: "2025-05-31",
  },
];

export const serviceData = [
  {
    title: "Website Design and Development",
    description: "Modern, responsive websites tailored to your brand and goals.",
    details:
      "I design and build responsive websites, deploy them, and optimize for speed, SEO structure, and clean UX—so your site looks sharp and performs well.",
    bullets: ["Responsive UI", "SEO-ready structure", "Fast performance", "Deployment support"],
    icon: <RxGlobe />,
  },
  {
    title: "UI/UX Design",
    description: "Clean, intuitive UI with strong UX decisions.",
    details:
      "I design interfaces that feel simple and premium—clear layouts, strong hierarchy, and user flows that reduce friction and increase conversions.",
    bullets: ["Wireframes & flows", "Modern layouts", "UX improvements", "Design-to-dev handoff"],
    icon: <IoMdColorPalette />,
  },
  {
    title: "Web App Development",
    description: "Product-ready web apps with real functionality.",
    details:
      "I build full-stack web apps using Next.js + Tailwind on the frontend and Django on the backend—REST APIs, JWT auth, migrations, and clean data flow.",
    bullets: ["Next.js + Tailwind", "Django REST APIs", "JWT authentication", "Scalable structure"],
    icon: <RxDesktop />,
  },
  {
    title: "Copywriting",
    description: "Clear, persuasive copy that matches your brand.",
    details:
      "I write product and website copy that communicates your value fast—headlines, sections, CTAs, and messaging that feels human and converts.",
    bullets: ["Homepage copy", "Landing page sections", "Product descriptions", "Clear CTAs"],
    icon: <RxReader />,
  },
  {
    title: "SEO Optimization",
    description: "Improve visibility with practical SEO fixes.",
    details:
      "I optimize SEO basics properly—metadata, structure, performance, and content alignment—so your site becomes easier to discover and rank.",
    bullets: ["Meta/OG setup", "Technical SEO checks", "Keyword structure", "On-page improvements"],
    icon: <IoMdSearch />,
  },
  {
    title: "Performance Optimization",
    description: "Speed + smoother experience across devices.",
    details:
      "I improve load time and responsiveness by fixing heavy assets, layout shifts, unnecessary renders, and ensuring efficient frontend structure.",
    bullets: ["Lighthouse improvements", "Image optimization", "Reduce layout shift", "Better rendering"],
    icon: <RxRocket />,
  },
  {
    title: "Responsive Design",
    description: "Pixel-clean layouts on mobile, tablet, and desktop.",
    details:
      "I ensure your UI adapts perfectly across screen sizes with proper spacing, typography, and layout rules—no broken sections on mobile.",
    bullets: ["Mobile-first approach", "Tablet optimization", "Consistent spacing", "Cross-device testing"],
    icon: <AiOutlineMobile />,
  },
  {
    title: "Landing Page Design",
    description: "High-converting landing pages for campaigns.",
    details:
      "I build landing pages designed to convert—clear message, strong sections, fast load, and clean CTA flow that helps users take action.",
    bullets: ["Conversion-focused layout", "CTA optimization", "Fast load speed", "Clean sections"],
    icon: <RxHome />,
  },
  {
    title: "HTML/CSS Development",
    description: "Accurate UI builds from designs.",
    details:
      "I convert designs into clean, responsive UI with Tailwind/CSS—structured layout, reusable components, and smooth interactions.",
    bullets: ["Design to UI build", "Tailwind/CSS", "Reusable components", "Responsive layouts"],
    icon: <RxPencil2 />,
  },
  {
    title: "JavaScript Development",
    description: "Interactive UI and frontend logic.",
    details:
      "I add real functionality—state management, API integration, dynamic UI behavior, form validation, and smooth user interactions.",
    bullets: ["API integration", "State & data flow", "Form validation", "Interactive UI"],
    icon: <RxGear />,
  },
  {
    title: "Website Maintenance",
    description: "Reliable updates, fixes, and improvements.",
    details:
      "I maintain and improve existing sites/apps—bug fixes, new sections, performance cleanup, and feature updates without breaking things.",
    bullets: ["Bug fixing", "Updates & improvements", "Performance tuning", "Ongoing support"],
    icon: <BsTools />,
  },
  {
    title: "Accessibility Optimization",
    description: "Make your site usable for everyone.",
    details:
      "I improve accessibility by fixing contrast, keyboard navigation, semantic structure, and ARIA usage—so your product works for more users.",
    bullets: ["Keyboard navigation", "Better semantics", "Contrast fixes", "ARIA improvements"],
    icon: <FaAccessibleIcon />,
  },
  {
    title: "Freelance",
    description: "Flexible full-stack support for your project.",
    details:
      "Need a developer who can handle both frontend and backend? I can join to ship features, fix issues, and deliver clean, production-ready work.",
    bullets: ["Short/long-term work", "Clear communication", "Reliable delivery", "Full-stack support"],
    icon: <RxLaptop />,
  },
];