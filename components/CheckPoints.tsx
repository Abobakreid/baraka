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
        <div className="grid grid-cols-3 md:grid-cols-2 gap-1 col-span-1 max-sm:order-2">
          {checkPoints.map((point, index) => (
            <div key={index} className="flex gap-2 items-center ">
              <div className="p-2 bg-[#feddee] rounded-full">
                <Image
                  src={point.image}
                  alt="point image"
                  width={30}
                  height={30}
                  className="object-contain"
                />
              </div>
              <h2 className="font-medium text-lg">{point.title}</h2>
            </div>
          ))}
        </div>
        <div className="relative size-full inset-0 min-h-72 col-span-2 py-5 max-sm:order-1">
          <Image
            src="/inspection/inspection-car.png"
            alt="car image"
            fill
            className="object-cover md:object-cover"
          />
          <Image
            src="/inspection/carPoints.svg"
            alt="point Image"
            width={40}
            height={40}
            className="absolute size-8 right-10 bottom-20"
          />
          <Image
            src="/inspection/carPoints.svg"
            alt="point Image"
            width={40}
            height={40}
            className="absolute size-8 right-36 bottom-36"
          />
          <Image
            src="/inspection/carPoints.svg"
            alt="point Image"
            width={40}
            height={40}
            className="absolute size-8 right-[300px] bottom-44"
          />
          <Image
            src="/inspection/carPoints.svg"
            alt="point Image"
            width={40}
            height={40}
            className="absolute size-8 right-[420px] bottom-36"
          />
        </div>
      </div>
    </section>
  );
};

export default CheckPoints;
