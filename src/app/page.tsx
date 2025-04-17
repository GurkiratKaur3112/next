import { main } from "framer-motion/client";
import HeroSection from "../components/LandingPage";
import { NavbarDemo } from "../components/LandingPage/Navbar"; // Corrected import
import LandingPage from "../components/LandingPage";
import Dashboard from "../components/Dashboard";


export default function Home() {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased bg-grid-white/[0.02]">
    {/* <LandingPage/> */}
      <Dashboard/>
      
    </main>
  );
}
