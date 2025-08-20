import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
  {
    text: "Zero platform fees and instant payments? Yes please! Exclu is way ahead of the curve. I even connected my custom domain and it made my brand look super professional. Highly recommend it to any serious creator",
    name: "Mia L.",
    platform: "Instagram",
    image: "/img1.avif",
  },
  {
    text: "I've tried a bunch of other creator platforms, and Exclu is a breath of fresh air. No hidden fees, instant payouts, and I keep 100% of my earnings? Yes, please. Uploading my art was super easy, and my fans love the custom storefront",
    name: "Jasmine R.",
    platform: "Threads",
    image: "/img2.avif",
  },
  {
    text: "I've tried a bunch of other creator platforms, and Exclu is a breath of fresh air. No hidden fees, instant payouts, and I keep 100% of my earnings? Yes, please. Uploading my art was super easy, and my fans love the custom storefront",
     name: "Amira S.",
    platform: "Instagram",
    image: "/img3.avif",
  },
]

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      className=" pt-30 space-y-10 bg-black flex flex-col items-center justify-center"
    >
      <h1 className="text-4xl font-bold leading-tight text-center text-white">
        What other creators are <br /> saying....
      </h1>

      <Carousel className="w-full max-w-lg mx-auto">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="bg-[#222222] min-h-70 text-white rounded-2xl shadow-lg">
                  <CardContent className="flex items-center justify-center gap-4 p-6">
                    <div className="w-30 h-30  flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full  rounded-md object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between">
                      <p className="text-base leading-relaxed mb-4">
                        {testimonial.text}
                      </p>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-gray-400">{testimonial.platform}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default TestimonialsSection
