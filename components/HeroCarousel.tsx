"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { slides } from "@/constants";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
const HeroCarousel = () => {
  return (
    <Carousel
      dir="ltr"
      className="h-[450px] xl:min-h-[628px] xl:h-[628px] w-[100%]"
      plugins={[
        Autoplay({
          delay: 3000, // Time between slides (in milliseconds)
        }),
      ]}
    >
      <CarouselContent className="size-full">
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="flex size-full">
            <div className=" relative size-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-center md:object-cover fixed"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2 bg-slate-50/80 text-[#475467]/50" />
      <CarouselNext className="right-2 bg-slate-50/80 text-[#475467]/50" />
    </Carousel>
  );
};

export default HeroCarousel;
