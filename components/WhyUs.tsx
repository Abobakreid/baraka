import React from "react";
import GlobalHead from "./GlobalHead";
import { whyUsCards } from "@/constants";
import Image from "next/image";
import { WhyUsCardProps } from "@/types";
import Carousels from "./Carousels";
import { CarouselItem } from "./ui/carousel";

const WhyUs = () => {
  return (
    <section className="container mx-auto p-4">
      <GlobalHead headText="لماذا نحن؟" />
      <Carousels
        dir="ltr"
        previousClassName="max-sm:hidden  sm:-left-9 lg:hidden"
        nextClassName="max-sm:hidden  sm:-right-9  lg:hidden"
        containerStyle="sm:px-6 lg:px-0"
      >
        {whyUsCards.map((card, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 px-4">
            <WhyUsCard key={index} cardData={card} />
          </CarouselItem>
        ))}
      </Carousels>
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
