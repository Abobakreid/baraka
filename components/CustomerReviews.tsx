import GlobalHead from "./GlobalHead";

import { CustomerReviewsData } from "@/constants";
import Image from "next/image";
import Carousels from "./Carousels";
import { CarouselItem } from "./ui/carousel";
import { ReviewCardProps } from "@/types";

const CustomerReviews = () => {
  return (
    <section className="container mx-auto px-4">
      <GlobalHead headText="آراء عملائنا" />
      <Carousels
        dir="ltr"
        previousClassName="left-5 2xl:-left-2"
        nextClassName="right-5 2xl:-right-2"
      >
        {CustomerReviewsData.map((card, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-8">
            <ReviewCard card={card} />
          </CarouselItem>
        ))}
      </Carousels>
    </section>
  );
};

export default CustomerReviews;

export const ReviewCard = ({ card }: ReviewCardProps) => {
  return (
    <div className="flex flex-col gap-3 justify-center py-6 px-2 min-h-[240px] h-[240px]">
      <div className="flex gap-3 justify-center items-center">
        <div className="flex flex-col items-end">
          <h2 className="text-lg">{card.name}</h2>
          <p className="text-[#4CAF4F]">{card.modification}</p>
        </div>
        <Image
          src={card.image}
          alt="image"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
      <p className="text-[#1E1F24] text-center">{card.review}</p>
    </div>
  );
};
