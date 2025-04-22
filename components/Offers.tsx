import { offerCards } from "@/constants";
import Image from "next/image";
import Carousels from "./Carousels";
import Discount from "./Discount";
import GlobalHead from "./GlobalHead";
import { CarouselItem } from "./ui/carousel";
import { OfferCardProps } from "@/types";

const Offers = () => {
  return (
    <section className="container mx-auto p-4 mt-16">
      <GlobalHead headText=" عروض بركة اوتو كير" className="xl:bottom-0" />
      <Carousels
        dir="ltr"
        previousClassName="left-0 2xl:-left-10"
        nextClassName="right-0 2xl:-right-10"
      >
        {offerCards.map((card, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-3"
          >
            <OfferCard card={card} />
          </CarouselItem>
        ))}
        {offerCards.map((card, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3  xl:basis-1/4 px-3"
          >
            <OfferCard card={card} />
          </CarouselItem>
        ))}
      </Carousels>
    </section>
  );
};

export default Offers;

export const OfferCard = ({ card }: OfferCardProps) => {
  return (
    <div className="flex flex-col gap-3 justify-center text-right offer-card-shadow rounded-md py-6 px-2">
      <div className="relative h-64 w-full">
        <Image src={card.image} alt="image" fill className="object-contain" />
        {card.isNew ? (
          <Discount value="جديد" newItem={card.isNew} />
        ) : (
          <Discount value={card.discountPercentage} newItem={card.isNew} />
        )}
        {card.sold && (
          <div className="bg-[#FEEDEE] py-2 absolute bottom-0 w-full text-center">
            نفذت الكمية
          </div>
        )}
      </div>
      <h3 className="text-[#4CAF4F]">قطع الغيار</h3>
      <h2>Sailun - 185/65/14 ATREZZO ECO HR</h2>
      <div className="flex gap-1.5 justify-end">
        <span className="line-through text-md text-[#80828D]">LE 2,382.00</span>
        <span className="text-xl font-semibold text-primary">LE 2,382.00</span>
      </div>
    </div>
  );
};
