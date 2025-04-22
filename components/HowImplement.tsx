import { howImplementData } from "@/constants";
import Carousels from "./Carousels";
import GlobalHead from "./GlobalHead";
import { CarouselItem } from "./ui/carousel";
import { ImplementCardProps } from "@/types";

const HowImplement = () => {
  return (
    <section className="container mx-auto p-4 mt-16 flex flex-col items-center gap-5">
      <GlobalHead headText="كيفية التنفيذ" className="xl:bottom-0" />
      <Carousels
        dir="ltr"
        previousClassName="left-0 flex lg:hidden"
        nextClassName="right-0 flex lg:hidden"
      >
        {howImplementData.map((card, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 px-3">
            <ImplementCard card={card} />
          </CarouselItem>
        ))}
      </Carousels>
    </section>
  );
};

export default HowImplement;

export const ImplementCard = ({ card }: ImplementCardProps) => {
  return (
    <div className="py-6 rounded-md whyus-card-shadow flex flex-col items-center gap-6 px-2 min-h-60 h-60">
      <span className="text-lg inline-block font-semibold bg-[#feddee] p-2 px-4 rounded-full text-[#AB2128]">
        {card.num}
      </span>
      <h2 className="text-lg font-semibold">{card.title}</h2>
      <p className="text-xl text-[#43444A] text-center">{card.des}</p>
    </div>
  );
};
