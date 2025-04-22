import React from "react";
import GlobalHead from "./GlobalHead";
import { servicesCards } from "@/constants";
import Image from "next/image";
import { ServiceCardProps } from "@/types";

const Services = () => {
  return (
    <section className="container mx-auto p-4 mt-16">
      <GlobalHead headText="خدماتنا" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {servicesCards.map((service, index) => (
          <ServiceCard key={index} serviceData={service} />
        ))}
      </div>
    </section>
  );
};

export default Services;

export const ServiceCard = ({ serviceData }: ServiceCardProps) => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center ">
      <div className="relative h-60 w-full rounded-md overflow-hidden">
        <Image
          src={serviceData.image}
          alt="image"
          fill
          className="object-cover"
          loading="lazy"
        />
      </div>
      <h3 className="font-medium text-2xl">{serviceData.head}</h3>
    </div>
  );
};
