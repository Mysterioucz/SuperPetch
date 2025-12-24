import Link from "next/link";
import AboutHero from "./components/AboutHero";
import AboutMission from "./components/AboutMission";
import AboutValues from "./components/AboutValues";
import AboutStory from "./components/AboutStory";
import AboutStats from "./components/AboutStats";
import AboutTeam from "./components/AboutTeam";
import AboutCTA from "./components/AboutCTA";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutStory />
        <AboutStats />
        <AboutTeam />
        <AboutCTA />
      </div>
    </div>
  );
}
