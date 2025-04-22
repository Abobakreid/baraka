import React from "react";
import GlobalHead from "./GlobalHead";
import { whyUsCards } from "@/constants";
import Image from "next/image";
import { WhyUsCardProps } from "@/types";

const WhyUs = () => {
  return (
    <section className="container mx-auto p-4">
      <GlobalHead headText="لماذا نحن؟" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {whyUsCards.map((card, index) => (
          <WhyUsCard key={index} cardData={card} />
        ))}
      </div>
    </section>
  );
};

export default WhyUs;

export const WhyUsCard = ({ cardData }: WhyUsCardProps) => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center whyus-card-shadow rounded-md py-10 text-[#1E1F24] px-5 min-h-72">
      <Image
        src={cardData.image}
        alt="image"
        width={40}
        height={50}
        className="object-contain"
      />
      <h3 className="font-semibold text-2xl">{cardData.head}</h3>
      <p className="text-[#43444A] text-xl text-center">{cardData.paragraph}</p>
    </div>
  );
};
