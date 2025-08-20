import { Upload } from "lucide-react";
import React from "react";

const StepsOne = () => {
  const steps = [
    {
      title: "Import your content",
      description:
        "All your content in an easy-to-manage library, simplifying organization and updates",
    },
    {
      title: "Connect your Drive",
      description: "Add your content from Google",
    },
    {
      title: "Gain your time",
      description: "Let your team manage your library",
    },
  ];
  const steps1 = [
    {
      title: "set your price",
      description:
        "Choose how much your content costs, how long it's available",
    },
    {
      title: "Sell to your fans",
      description: "Share your links directly across all your social meddia with just one click ",
    },
    {
      title: "Add your links to your bio",
      description: "Make your content easily accessible right from your bio",
    },
  ];

  return (
    <section className="min-h-screen bg-[#000000] text-white flex">
      <div className="w-1/2 flex items-center justify-center p-6">
        <video
          src="/videos/vid2.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="max-w-lg w-full rounded-lg shadow-lg"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center p-6">
        <div className="relative flex flex-col gap-8 max-w-md">
          <h2 className="text-4xl font-semibold leading-snug">
            Monetize and centralize your content
          </h2>
          <p className="text-gray-400 text-lg">
            All your content in an easy-to-manage library, simplifying
            organization and updates
          </p>
          <div className="absolute left-[18px] top-64 bottom-3 w-[4px] bg-[#83D2F533]" />
          <div className="flex flex-col space-y-10 mt-6">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4 relative">
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center shadow-lg">
                    <Upload size={20} strokeWidth={2} color="white" />
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-lg">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsOne;

