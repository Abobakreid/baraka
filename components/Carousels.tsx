"use client";
import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { cn } from "@/lib/utils";
import { CarouselsProps } from "@/types";
import Autoplay from "embla-carousel-autoplay";

const Carousels = ({
  children,
  previousClassName,
  nextClassName,
  dir,
  className,
  carouselStyle,
  containerStyle,
}: CarouselsProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [carouselApi, setCarouselApi] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();
    carouselApi.on("select", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState);
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    if (carouselApi) {
      carouselApi.scrollTo(index);
    }
  };
  return (
    <div className={cn(`relative w-full ${containerStyle}`)}>
      <Carousel
        dir={dir}
        setApi={setCarouselApi}
        plugins={[
          Autoplay({
            delay: 6000, // Time between slides (in milliseconds)
          }),
        ]}
        opts={{
          align: "start", // Align slides to the start for predictable scrolling
          loop: true, // Enable looping for continuous navigation
          slidesToScroll: 1, // Scroll by one card when arrows are clicked
        }}
        className={cn(`${carouselStyle}`)}
      >
        <CarouselContent className={cn(`size-full py-5 ${className}`)}>
          {children}
        </CarouselContent>
        <CarouselPrevious className={previousClassName} />
        <CarouselNext className={nextClassName} />
      </Carousel>
      <div className="flex sm:hidden justify-center space-x-2">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={cn(
              "w-3 h-3 rounded-full transition-colors",
              currentIndex === index ? "bg-primary" : "bg-gray-300"
            )}
            aria-label={`الانتقال إلى الشريحة ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousels;
