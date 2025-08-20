
import FaqsSection from "@/components/faqssection"
import HeroSection from "@/components/herosection"
import Navbar from "@/components/navbar"
import PricingSection from "@/components/pricingsection"
import TestimonialsSection from "@/components/testimonialsection"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#000000] z-50">
      <div className="sticky top-0 w-full z-50">
         <Navbar />
      </div>
      <div className="p-8">
      <HeroSection />
     <TestimonialsSection />
      <PricingSection />
      <FaqsSection />
      </div>
      
    </div>
  )
}
