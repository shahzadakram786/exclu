"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="text-2xl font-bold">©</span>
          <span className="text-xl font-bold">exclu</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="#" className="text-sm font-medium hover:text-black">
            Pricing
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-black">
            FAQs
          </Link>
          <Link href="#" className="text-sm font-medium hover:text-black">
            Testimonials
          </Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <Button variant="outline" className="rounded-full px-5">
            login
          </Button>
          <Button className="bg-black text-white rounded-full px-5 hover:bg-black/90" >
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 border-t">
          <Link href="#" className="block text-sm font-medium">
            Pricing
          </Link>
          <Link href="#" className="block text-sm font-medium">
            FAQs
          </Link>
          <Link href="#" className="block text-sm font-medium">
            Testimonials
          </Link>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" className="rounded-full w-full">
              login
            </Button>
            <Button className="bg-black text-white rounded-full w-full hover:bg-black/90">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
