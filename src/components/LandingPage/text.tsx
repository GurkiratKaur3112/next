"use client";
import React from "react";
import { TextGenerateEffect } from "../ui/text-effect";
import { Alexandria } from 'next/font/google';



type Props = {};

export const alexandria = Alexandria({
    subsets: ['latin'],
    weight: ['400', '500', '700'], // pick the weights you need
  });
  

const words = `Level-Up your Problem-Solving Tailored to your Skill`;

const Text = (props: Props) => {
  return <TextGenerateEffect words={words} className={`${alexandria.className} font-medium`}/>;
};

export default Text;