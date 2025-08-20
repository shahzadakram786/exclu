"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FaqsSection = () => {
  const faqs = [
    {
      question: "What is Exclu?",
      answer:
        "Exclu is an all-in-one monetization platform that empowers creators to sell content directly to their audience — without platform fees. Whether you’re an influencer, model, coach, or artist, Exclu gives you full control, instant payouts, and a custom storefront.",
    },
    {
      question: "Why should I choose Exclu over other platforms?",
      answer:
        "Unlike traditional platforms that take up to 20% of your earnings and delay payments for weeks, Exclu charges 0% on creator earnings, pays out instantly, and supports custom domains, affiliate tools, and link-in-bio sales. It’s built for freedom, speed, and profitability.",
    },
    {
      question: "Is Exclu really free to use?",
      answer:
        "Yes — signing up and using Exclu is completely free. We only take a small fee from customer transactions or offer premium tools for power users who want more advanced features.",
    },
    {
      question: "How do I upload and sell my content?",
      answer:
        "It’s simple. Just drag and drop your videos, photos, ebooks, music, or any digital file onto your dashboard. Then set your price, publish the link, and start earning.",
    },
    {
      question: "How do payouts work?",
      answer:
        "You get paid instantly after every sale. Connect your Stripe, PayPal, or bank account and cash out with just one click — no delays, no thresholds.",
    },
    {
      question: "Is Exclu safe for my accounts and audience?",
      answer:
        "Absolutely. Exclu uses secure payment processors, encrypted storage, and never asks for your social media login. Your audience stays yours, and your data is protected 24/7.",
    },
  ];

  return (
    <section
      id="faqs"
      className="flex flex-col items-center bg-black text-white px-4 py-10"
    >
      <Accordion type="single" collapsible className="w-full max-w-3xl space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-700">
            <AccordionTrigger className="text-xl font-medium flex justify-between items-center">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className= "  text-lg text-gray-300">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FaqsSection;
