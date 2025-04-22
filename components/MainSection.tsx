import { MainSectionLists } from "@/constants";
import { cn } from "@/lib/utils";
import { MainSectionListProps } from "@/types";
import Image from "next/image";
import React from "react";

const MainSection = () => {
  return (
    <section className="container mx-auto p-4">
      <h1 className="text-lg font-semibold text-center tracking-wide">
        السمكرة والدهان من أهم العمليات التي تحافظ على الشكل الجمالي للسيارة
        وتضمن حمايتها من العوامل البيئية.
      </h1>
      <MainSectionList listItem={MainSectionLists[0]} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
        <div className="relative rounded-2xl overflow-hidden h-[300px]">
          <Image
            src={"/maintenance/main-3.png"}
            alt="image"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative rounded-2xl overflow-hidden  h-[300px]">
          <Image
            src={"/maintenance/main-2.png"}
            alt="image"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <MainSectionList listItem={MainSectionLists[1]} className="list-disc" />
      <div className="grid grid-cols-1 my-10">
        <div className="relative rounded-2xl overflow-hidden h-[300px]">
          <Image
            src={"/maintenance/main-1.png"}
            alt="image"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
      <MainSectionList listItem={MainSectionLists[2]} className="list-disc" />
    </section>
  );
};

export default MainSection;

export const MainSectionList = ({
  className,
  listItem,
}: MainSectionListProps) => {
  return (
    <div className="">
      <h2 className="text-2xl font-semibold">{listItem.title}</h2>
      <ul className={cn(`${className} `)}>
        {listItem.list.map((item, index) => (
          <li key={index} className="text-[#414248] text-xl">
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
