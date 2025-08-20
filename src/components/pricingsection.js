"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { CircleCheck } from "lucide-react";

const PricingSection = () => {
  const [isPaid, setIsPaid] = useState(false);

  const freeFeatures = [
    "Create and share payment links",
    "Add up to 5 pieces of content",
    "Accept payment via popular methods",
    "Basic analytics",
    "Customize your profile and bio link",
    "0% platform fees (only pay transaction fees)",
  ];

  const proFeatures = [
    "Create and share payment links",
    "Unlimited content upload",
    "Accept payment via popular methods",
    "30 days free trial",
    "Customize your profile and bio link",
    "No Transaction fee is paid",
  ];

  return (
    <section
      id="pricing"
      className=" flex flex-col items-center justify-center bg-black text-white "
    >
      <h2 className="text-4xl font-bold mb-8">Pricing</h2>
      <div className="bg-neutral-900 w-full flex flex-col p-10 items-center justify-center">

      <div className="flex items-center gap-4 mb-10">
        <span className={!isPaid ? "font-semibold" : "text-gray-400"}>Free</span>
        <Switch checked={isPaid} onCheckedChange={setIsPaid} />
        <span className={isPaid ? "font-semibold" : "text-gray-400"}>Paid</span>
      </div>

      {!isPaid && (
        <Card className="bg-neutral-800 text-white p-6 w-full max-w-md rounded-2xl shadow-lg">
          <CardContent className="space-y-4">
          <div className="flex justify-between">
            <h3 className="text-2xl font-bold">Free Plan</h3>
            <p className="text-3xl font-bold">0 $</p>            
          </div>
            <p className="text-lg font-bold">Perfect to get started</p>
            <ul className="space-y-2 text-gray-300">
              {freeFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <CircleCheck className="w-5 h-5 text-gray-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="w-full">Get started for free</Button>
          </CardContent>
        </Card>
      )}

      {isPaid && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
          <Card className="bg-neutral-800 text-white p-6 rounded-2xl shadow-lg">
            <CardContent className="space-y-4">
          <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Pro Plan</h3>
              <p className="text-3xl font-bold">39 $</p>
              </div>
               <p className="text-lg font-bold">Perfect to get started</p>
              <ul className="space-y-2 text-gray-300">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CircleCheck className="w-5 h-5 text-gray-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Get started for Monthly</Button>
            </CardContent>
          </Card>

          <Card className="bg-neutral-800 text-white p-6 rounded-2xl shadow-lg">
            <CardContent className="space-y-4">
             
          <div className="flex justify-between">
                <h3 className="text-2xl font-bold">Lifetime Plan</h3>
              <p className="text-3xl font-bold">390 $</p>
              </div>
               <p className="text-lg font-bold">Perfect to get started</p>
              <ul className="space-y-2 text-gray-300">
                {proFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CircleCheck className="w-5 h-5 text-gray-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Get started for Lifetime</Button>
            </CardContent>
          </Card>
        </div>
      )}

      </div>

    </section>
  );
};

export default PricingSection;
