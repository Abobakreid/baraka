import React from "react";
import GlobalHead from "./GlobalHead";
import Image from "next/image";
import { checkPoints } from "@/constants";

const CheckPoints = () => {
  return (
    <section className="container mx-auto p-4 mt-16 flex flex-col items-center gap-5">
      <GlobalHead
        headText="نقاط الفحص"
        description="كن واثقاً بأننا نهتم بكل التفاصيل أثناء إجراء فحص شامل لسيارتك. يعمل فريقنا على مراجعة جميع جوانب مركبتك بدقة، لضمان أعلى مستويات السلامة والموثوقية."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 w-full py-5 justify-center">
        <div className="grid grid-cols-3 md:grid-cols-2 gap-2 max-sm:gap-y-5 col-span-1 max-sm:order-2 mt-5">
          {checkPoints.map((point, index) => (
            <div
              key={index}
              className="flex gap-2 items-center point-shadow border-[1px] border-solid border-[#FEEDEE] rounded-md md:w-44 md:h-16 pr-3"
            >
              <div className="p-2 bg-[#feddee] rounded-full">
                <Image
                  src={point.image}
                  alt="point image"
                  width={30}
                  height={20}
                  className="object-contain"
                />
              </div>
              <h2 className="font-medium text-lg">{point.title}</h2>
            </div>
          ))}
        </div>
        <div className="relative size-full inset-0 min-h-52 max-sm:h-52 h-72 col-span-2 py-5 max-sm:order-1 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/inspection/inspection-car.png"
              alt="car image"
              fill
              className="object-contain md:object-cover"
            />
          </div>
          <div className="absolute inset-0">
            <Image
              src="/inspection/carPoints.svg"
              alt="point Image"
              width={40}
              height={40}
              className="absolute size-4 md:size-6 lg:size-8 right-8 bottom-16 sm:right-20 sm:bottom-24  md:right-0 md:bottom-24 lg:right-10 lg:bottom-20"
            />
            <Image
              src="/inspection/carPoints.svg"
              alt="point Image"
              width={40}
              height={40}
              className="absolute size-4 md:size-6 lg:size-8 right-20 bottom-24 sm:right-30 sm:bottom-36 md:right-14 md:bottom-36 lg:right-36"
            />
            <Image
              src="/inspection/carPoints.svg"
              alt="point Image"
              width={40}
              height={40}
              className="absolute size-4 md:size-6 lg:size-8 right-30 bottom-28 sm:right-52 sm:bottom-40 md:right-[135px] md:bottom-[150px] lg:right-[300px] lg:bottom-44"
            />
            <Image
              src="/inspection/carPoints.svg"
              alt="point Image"
              width={40}
              height={40}
              className="absolute size-4 md:size-6 lg:size-8  right-40 bottom-24 sm:right-64 sm:bottom-36 md:right-52 md:bottom-36 lg:right-[400px] lg:bottom-36"
            />

            <Image
              src="/inspection/carPoints.svg"
              alt="point Image"
              width={40}
              height={40}
              className="absolute size-4 md:size-6 lg:size-8 left-28 bottom-22 sm:left-48 sm:bottom-30 md:left-30 md:bottom-28 lg:left-64 lg:bottom-24"
            />
            <Image
              src="/inspection/carPoints.svg"
              alt="point Image"
              width={40}
              height={40}
              className="absolute size-4 md:size-6 lg:size-8 left-12 bottom-16 sm:left-24 sm:bottom-24 md:left-8 md:bottom-22 lg:left-24 lg:bottom-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckPoints;
