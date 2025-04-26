import React from "react";
import GlobalHead from "./GlobalHead";
import { servicesCards } from "@/constants";
import Image from "next/image";
import { ServiceCardProps } from "@/types";
import Link from "./Link";
import { CarouselItem } from "./ui/carousel";
import Carousels from "./Carousels";

const Services = () => {
  return (
    <section className="container mx-auto p-4">
      <GlobalHead headText="خدماتنا" imageClassName="!bottom-[1px]" />
      <Carousels
        dir="ltr"
        previousClassName="max-sm:hidden sm:-left-9 lg:hidden"
        nextClassName="max-sm:hidden sm:-right-9  lg:hidden"
        containerStyle="sm:px-6 lg:px-0"
      >
        {servicesCards.map((service, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4 px-4">
            <ServiceCard serviceData={service} />
          </CarouselItem>
        ))}
      </Carousels>
    </section>
  );
};

export default Services;

export const ServiceCard = ({ serviceData }: ServiceCardProps) => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center ">
      <Link
        href={serviceData.route}
        className="relative h-60 w-full rounded-md overflow-hidden"
      >
        <Image
          src={serviceData.image}
          alt="image"
          fill
          className="object-cover hover:scale-125 transition-transform ease-in-out"
          loading="lazy"
        />
      </Link>
      <h3 className="font-medium text-2xl">{serviceData.head}</h3>
    </div>
  );
};
