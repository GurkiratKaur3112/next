"use client";
import React from "react";
import { Button } from "../ui/moving-border";
import { Spotlight } from "../ui/spotlight-new";
import { NavbarDemo } from "./Navbar";
import Text from "./text";


function LandingPage() {
  return (
    <>
    <div className="w-full flex flex-col gap-12 md:gap-24 pt-[80px]" >
      <NavbarDemo />

    {/* Hero */}
    <section className="min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      
      <div className="flex flex-col justify-center items-center gap-8 container -translate-y-40">
       <div className="container">
         <Text />
       </div>

       <div className="max-w-3xl h-auto text-xs sm:text-base text-center relative">
         We’re building the ultimate platform that blends the depth of DSA with the precision of CP ratings, guiding you to the right questions at the right time.
       </div>

       <div className="flex justify-center items-center mt-8">
        <Button
         borderRadius="1.2rem"
         className="text-sm bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
        Explore Now
        </Button>
       </div>
       </div>
        <Spotlight/>
    </section>

      
      </div>
    </>
  )
}

export default LandingPage;