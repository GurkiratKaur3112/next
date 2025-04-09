"use client";
import React from "react";
import { Button } from "../ui/moving-border";
import { NavbarDemo } from "./Navbar";
import Text from "./text";
import { BackgroundBeams } from "../ui/bg-beams";
import { Meteors } from "../ui/meteors";
import { HoverEffect } from "../ui/card-hover-effect";

function LandingPage() {
  return (
    <>
      <div className="w-full flex flex-col gap-12 md:gap-20 pt-[80px]">
        <NavbarDemo />

        {/* Hero */}
        <section className="min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
          <BackgroundBeams />
          <div className="flex flex-col justify-center items-center gap-8 container -translate-y-24">
            <div className="container">
              <Text />
            </div>

            <div className="max-w-3xl h-auto text-xs sm:text-base text-center relative">
              We're building the ultimate platform that blends the depth of DSA with the precision of CP ratings, guiding you to the right questions at the right time.
            </div>

            <div className="flex justify-center items-center mt-6">
              <Button
                borderRadius="1.2rem"
                className="text-sm bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
              >
                Explore Now
              </Button>
            </div>
          </div>
        </section>

        {/* USP Section (Previously Meteors section) */}
        <section className="py-8 flex items-center justify-center">
  <div className="w-full">
    <div className="relative w-full max-w-5xl mx-auto min-h-[400px]">
      <div className="absolute inset-0 h-full w-full scale-100 -translate-y-16 transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
      
      <div className="relative flex h-full flex-col items-start justify-end rounded-2xl border border-gray-800 bg-gray-900 px-8 py-12 shadow-xl">
        <h1 className="relative z-50 mb-2 text-5xl font-extrabold text-white">Why Choose Us?</h1>
        <h2 className="relative z-50 mb-4 text-2xl font-bold text-white">
          Your Personalized Placement Companion
        </h2>

        <p className="relative z-50 mb-6 text-lg font-medium text-slate-400">
          We combine the best of DSA and Competitive Programming into a single platform built for your growth.
          Get handpicked questions based on your level, track your real-time progress, and prepare strategically for placements.
          No more scattered prep — just smart, structured, and stress-free learning.
        </p>

        <Meteors number={20} />
      </div>
    </div>
  </div>

  
</section>

{/* Card Hover Effect Section */}
<section className="w-full py-20">
  <div className="max-w-5xl mx-auto px-8">
    <h2 className="text-3xl font-bold text-center mb-12 text-white">
      Key Platform Features
    </h2>
    <HoverEffect items={[
      {
        title: "Personalized Learning Path",
        description: "Get a customized roadmap based on your current skill level and goals",
        link: "#learning-path"
      },
      {
        title: "DSA Mastery",
        description: "Comprehensive coverage of all essential data structures and algorithms",
        link: "#dsa-mastery"
      },
      {
        title: "CP Rating Integration",
        description: "Track your competitive programming progress alongside DSA",
        link: "#cp-rating"
      },
      {
        title: "Interview Preparation",
        description: "Practice with real interview questions from top companies",
        link: "#interview-prep"
      },
      {
        title: "Progress Tracking",
        description: "Detailed analytics to monitor your improvement over time",
        link: "#progress-tracking"
      },
      {
        title: "Community Support",
        description: "Learn from and compete with peers in a supportive environment",
        link: "#community"
      }
    ]} />
  </div>
</section>

<section className="w-full bg-gray-900 px-8 py-24 shadow-xl text-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            🎯 Our Goal: Helping You Crack Coding Interviews Without Getting Lost
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-800 p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-white transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">📚</span>
              <h3 className="text-xl font-semibold">Structured Learning</h3>
            </div>
            <p>
              Clear, concise explanations of core DSA concepts with practical examples to reinforce your understanding.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-white transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">📈</span>
              <h3 className="text-xl font-semibold">Measurable Progress</h3>
            </div>
            <p>Track your improvement with problem-solving metrics and gradually increasing difficulty challenges.</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-white transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">💼</span>
              <h3 className="text-xl font-semibold">Interview Readiness</h3>
            </div>
            <p>
              Practice with real interview questions from top tech companies and develop confidence in your solutions.
            </p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg shadow-lg border-2 border-transparent hover:border-white transition-all duration-300">
            <div className="flex items-center mb-4">
              <span className="text-4xl mr-3">🧭</span>
              <h3 className="text-xl font-semibold">Guided Roadmap</h3>
            </div>
            <p>
              Follow our carefully designed learning path from fundamentals to advanced techniques for optimal
              preparation.
            </p>
          </div>
        </div>
      </div>
    </section>


      </div>
    </>
  );
}

export default LandingPage;

