import React, { useState, useEffect } from "react";
import AppWrapper from "./pages/_app";
import IndexPage from "./pages/index";
import ProjectDetail from "./pages/projects/[slug]";

export default function App() {
  const [currentPath, setCurrentPath] = useState(() =>
    typeof window === "undefined" ? "/" : window.location.pathname
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Handler to detect popstate/browser back actions
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", handleLocationChange);

    // Intercept legacy SPA pushState links so this compatibility wrapper stays in sync.
    const originalPushState = window.history.pushState;
    window.history.pushState = function (...args) {
      originalPushState.apply(this, args);
      handleLocationChange();
    };

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.history.pushState = originalPushState;
    };
  }, []);

  const handleBackToHome = () => {
    if (typeof window !== "undefined") {
      window.history.pushState({}, "", "/");
    }
  };

  // Inspect path parameters
  const isProjectDetail = currentPath.startsWith("/projects/");
  const matchedSlug = isProjectDetail ? currentPath.replace("/projects/", "") : undefined;

  return (
    <AppWrapper
      Component={isProjectDetail ? ProjectDetail : IndexPage}
      pageProps={isProjectDetail ? { slug: matchedSlug, onBack: handleBackToHome } : {}}
    />
  );
}
