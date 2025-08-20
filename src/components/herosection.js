"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import StepsOne from "./stepone";
import StepsTwo from "./steptwo";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="  bg-black  text-white"
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
         <div className="w-full md:w-1/2 flex flex-col gap-2">
        <h1 className="text-5xl font-bold leading-tight">
          Your Link,<br />Your Business
        </h1>
        <div className="flex items-center  bg-[#4b4b4b] rounded-lg h-15  w-full ">
          <Input
            type="text"
            placeholder="exclu.at/you"
            className="border-none text-lg h-full text-white  focus-visible:ring-0"
          />
          <Button className="bg-white text-black h-full  hover:bg-gray-200">
            Start for free
          </Button>
        </div>
      </div>
      <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <video
          src="/videos/v1.mp4" 
          autoPlay
          loop
          muted
          playsInline
          className="max-w-md w-full rounded-lg"
        />
      </div>
      </div>
     
      <StepsOne/>
      <StepsTwo/>
    </section>
  );
};

export default HeroSection;
