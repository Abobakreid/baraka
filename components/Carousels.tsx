import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { cn } from "@/lib/utils";
import { CarouselsProps } from "@/types";

const Carousels = ({
  children,
  previousClassName,
  nextClassName,
  dir,
  className,
}: CarouselsProps) => {
  return (
    <Carousel dir={dir}>
      <CarouselContent className={cn(`size-full py-5 ${className}`)}>
        {children}
      </CarouselContent>
      <CarouselPrevious className={previousClassName} />
      <CarouselNext className={nextClassName} />
    </Carousel>
  );
};

export default Carousels;
