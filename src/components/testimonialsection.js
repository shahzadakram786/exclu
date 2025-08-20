import React from 'react'

const TestimonialsSection = () => {
  return (
 <section id="testimonials" className="min-h-screen  pt-30 space-y-10 bg-[#000000]">
  <div className="flex  items-center w-full  justify-between">

    <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <video
          src="/videos/vid2.mp4" 
          autoPlay
          loop
          muted
          playsInline
          className="max-w-md w-full rounded-lg"
        />
      </div>
      <div className="flex justify-center items-center w-full">
      <h2 className="text-3xl font-semibold">What People Say</h2>
 
      </div>
  </div>
  <div className="flex  items-center w-full  justify-between">
 <div className="flex justify-center items-center w-full">
      <h2 className="text-3xl font-semibold">What People Say</h2>
 
      </div>
    <div className="w-full md:w-1/2 mt-10 md:mt-0 flex justify-center">
        <video
          src="/videos/vid3.mov" 
          autoPlay
          loop
          muted
          playsInline
          className="max-w-70  rounded-lg"
        />
      </div>
     
  </div>
      </section>
      
  )
}

export default TestimonialsSection
