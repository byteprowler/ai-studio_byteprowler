import React from "react";
import SEO from "../components/seo/SEO";
import Layout from "../components/layout/Layout";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Roadmap from "../components/sections/Roadmap";
import TechArsenal from "../components/sections/TechArsenal";
import Projects from "../components/sections/Projects";
import Certifications from "../components/sections/Certifications";
import AnimeFeed from "../components/sections/AnimeFeed";
import SignalLogs from "../components/sections/SignalLogs";
import Contact from "../components/sections/Contact";

export default function Home() {
  return (
    <>
      <SEO
        title="ByteProwler | Frontend Developer Portfolio"
        description="Byteprowler is a hacker-inspired developer portfolio showcasing frontend projects, certifications, build logs, and web interface work."
        url="PASTE_CANONICAL_URL_HERE"
        image="/og-byteprowler.png"
      />

      <Layout>
        <Hero />
        <About />
        <Roadmap />
        <TechArsenal />
        <Projects />
        <Certifications />
        <AnimeFeed />
        <SignalLogs />
        <Contact />
      </Layout>
    </>
  );
}