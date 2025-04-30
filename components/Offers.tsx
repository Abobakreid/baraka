import { cn, getDiscountedPrice } from "@/lib/utils";
import { OfferCardProps, Product } from "@/types";
import Image from "next/image";
import Carousels from "./Carousels";
import Discount from "./Discount";
import GlobalHead from "./GlobalHead";
import { CarouselItem } from "./ui/carousel";
import Link from "./Link";

const Offers = ({ products }: { products: Product[] }) => {
  return (
    <section className="container mx-auto p-4 md:px-8 mt-16">
      <GlobalHead headText=" عروض بركة اوتو كير" imageClassName="xl:bottom-0" />
      <Carousels
        dir="ltr"
        previousClassName="max-sm:hidden sm:-left-9 md:-left-10"
        nextClassName="max-sm:hidden sm:-right-9 md:-right-10"
        containerStyle="sm:px-6 lg:px-0"
      >
        {products.map((card, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 px-4"
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
  const DiscountedPrice = getDiscountedPrice(
    card.price,
    card.discountPercentage
  );
  return (
    <div className="flex flex-col gap-3 justify-center text-right whyus-card-shadow rounded-md py-6 px-2">
      <div className="relative h-64 w-full">
        <Image
          src={card.image_url}
          alt="image"
          fill
          className="object-contain"
        />
        <Discount value={`${card.discountPercentage}%`} />
        {card.sold_out && (
          <div className="bg-[#FEEDEE] py-2 absolute bottom-0 w-full text-center">
            نفذت الكمية
          </div>
        )}
      </div>
      <h3 className="text-[#4CAF4F]">
        <Link href={card.brand ? `/oil-details/${card.id}` : "/auto-parts"}>
          {card.brand ? "الزيوت" : "قطع الغيار"}
        </Link>
      </h3>
      <h2>{card.title}</h2>
      <div className="flex gap-1.5 justify-end">
        <span className="text-sm xl:text-xl font-semibold text-primary">
          LE {DiscountedPrice}
        </span>
        <span className={cn("line-through text-sm xl:text-xl text-[#80828D]")}>
          LE {card.price}
        </span>
      </div>
    </div>
  );
};
