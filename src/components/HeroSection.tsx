"use client";
import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { Button } from "./ui/moving-border";


function HeroSection() {
  return (
    <div className="h-auto md:h-[40rem] w-full rounded-md flex flex-col items-center justify-center relative overflow-hidden mx-auto py-10 md:py-0" >

      <div className="max-w-2xl mx-auto p-4">
        <h1 className="relative z-10 text-lg md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-teal-700 text-center font-sans font-bold">
          Your DSA Prep Buddy
        </h1>
        <p></p>
        <p className="text-white max-w-lg mx-auto my-2 text-lg text-center relative z-10">
          One place for all your coding questions, notes, and progress tracking — made for students, by students.
        </p>
        <div className="flex justify-center items-center">
      <Button
        borderRadius="1.75rem"
        className="bg-white dark:bg-black text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        Explore Now
      </Button>
    </div>



      </div>
      <BackgroundBeams />

    </div>
  )
}

export default HeroSection;