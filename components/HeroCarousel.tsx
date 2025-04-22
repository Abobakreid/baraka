import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { slides } from "@/constants";
import Image from "next/image";
const HeroCarousel = () => {
  return (
    <Carousel
      dir="ltr"
      className="h-[500px] xl:min-h-[700px] xl:h-[700px] w-[100%]"
    >
      <CarouselContent className="size-full">
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="flex size-full">
            <div className=" relative size-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover fixed"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-2" />
      <CarouselNext className="right-2" />
    </Carousel>
  );
};

export default HeroCarousel;
