export type NavSection = {
  id: string;
  label: string;
  href: string;
  active?: boolean;
  status?: string;
};

/** Scroll-spy ready nav config: global section links return to homepage anchors from any route. */
export const NAV_SECTIONS: NavSection[] = [
  { id: "00", label: "INDEX", href: "/", active: false, status: "SYSTEM" },
  { id: "01", label: "HOME", href: "/#home", active: true, status: "ONLINE" },
  { id: "02", label: "ABOUT", href: "/#about", active: true, status: "ONLINE" },
  { id: "03", label: "BUILD LOG", href: "/#roadmap", active: true, status: "ONLINE" },
  { id: "04", label: "TECH STACK", href: "/#tech", active: true, status: "ONLINE" },
  { id: "05", label: "PROJECTS", href: "/#projects", active: true, status: "ONLINE" },
  { id: "06", label: "CERTIFICATIONS", href: "/#certifications", active: true, status: "ONLINE" },
  { id: "07", label: "ANIMEFEED", href: "/#anime", active: true, status: "ONLINE" },
  { id: "08", label: "CONTACT", href: "/#contact", active: true, status: "ONLINE" },
  // Payment/support routes are intentionally hidden until Flutterwave is ready.
  // { id: "09", label: "SUPPORT", href: "/#support", active: true, status: "OFFLINE" },
];