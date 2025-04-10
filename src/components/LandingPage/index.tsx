"use client";
import React from "react";
import { Button } from "../ui/moving-border";
import { NavbarDemo } from "./Navbar";
import Text from "./text";
import { BackgroundBeams } from "../ui/bg-beams";
import { Meteors } from "../ui/meteors";
import { HoverEffect } from "../ui/card-hover-effect";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";

function LandingPage() {
  return (
    <>
      <div className="w-full flex flex-col gap-12 md:gap-20 pt-[80px]">
        <NavbarDemo />

        {/* Hero */}
        <section className="min-h-screen flex items-center justify-center overflow-hidden">
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
                className="text-sm bg-black text-white border-slate-800"
              >
                Explore Now
              </Button>
            </div>
          </div>
        </section>

        {/* USP Section */}
        <section className="py-8 flex flex-col items-start w-full px-8">
          <h1 className="text-5xl font-extrabold text-white mb-40 w-full max-w-5xl mx-auto text-center ">
            Why Choose Us for the Placement Journey !!!
          </h1>
          
          <div className="w-full">
            <div className="relative w-full max-w-7xl mx-auto min-h-[400px]">
              <div className="absolute inset-0 h-full w-full scale-100 -translate-y-16 transform rounded-full bg-red-500 bg-gradient-to-r from-blue-500 to-teal-500 blur-3xl" />
              
              <div className="relative flex h-full flex-col items-start justify-center rounded-2xl border border-gray-800 bg-gray-900 px-12 py-16 shadow-xl">
                <h2 className="relative z-50 mb-6 text-3xl font-bold text-white">
                  Your Personalized Placement Companion
                </h2>

                <p className="relative z-50 text-xl font-medium text-slate-400">
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
        <section className="w-full py-20 min-h-[80vh]">
          <div className="max-w-5xl mx-auto px-8">
          <h1 className="text-5xl font-extrabold text-white mb-30 w-full max-w-5xl mx-auto text-center ">
            Key Features 
          </h1>
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

        {/* Animated Testimonials Section */}
        <section className="w-full py-20 min-h-[80vh]">
          <div className="max-w-5xl mx-auto px-8">
          <h1 className="text-5xl font-extrabold text-white mb-30 w-full max-w-5xl mx-auto text-center ">
            Meet Our Mentors
          </h1>
            <AnimatedTestimonials testimonials={[
              {
                quote: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
                name: "Sarah Chen",
                designation: "Product Manager at TechFlow",
                src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                quote: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
                name: "Michael Rodriguez",
                designation: "CTO at InnovateSphere",
                src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                quote: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
                name: "Emily Watson",
                designation: "Operations Director at CloudScale",
                src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                quote: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
                name: "James Kim",
                designation: "Engineering Lead at DataPro",
                src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              },
              {
                quote: "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
                name: "Lisa Thompson",
                designation: "VP of Technology at FutureNet",
                src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            ]} />
          </div>
        </section>

        {/* Infinite Moving Cards Section */}
        <section className="w-full py-20">
          <div className="min-h-[80vh] rounded-md flex flex-col antialiased bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default LandingPage;

const testimonials = [
  {
    quote: "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness ...",
    name: "Charles Dickens",
    title: "A Tale of Two Cities",
  },
  {
    quote: "To be, or not to be, that is the question...",
    name: "William Shakespeare",
    title: "Hamlet",
  },
  {
    quote: "All that we see or seem is but a dream within a dream.",
    name: "Edgar Allan Poe",
    title: "A Dream Within a Dream",
  },
  {
    quote: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
    name: "Jane Austen",
    title: "Pride and Prejudice",
  },
  {
    quote: "Call me Ishmael. Some years ago—never mind how long precisely...",
    name: "Herman Melville",
    title: "Moby-Dick",
  },
];
