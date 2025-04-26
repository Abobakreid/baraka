import { cn } from "@/lib/utils";
import { GlobalHeadProps } from "@/types";
import Image from "next/image";
import React from "react";

const GlobalHead = ({
  headText,
  description,
  imageClassName,
}: GlobalHeadProps) => {
  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <div className="text-center w-fit relative">
        <h2 className="text-[clamp(1.6rem,2cqw,3rem)] text-[#1E1F24] font-semibold">
          {headText}
        </h2>
        <Image
          src="/head.svg"
          alt="image"
          width={100}
          height={40}
          className={cn(
            `inline-block absolute -right-7 bottom-0  xl:bottom-2 ${imageClassName}`
          )}
        />
      </div>
      {description && (
        <p className="text-xl text-[#475467] text-center">{description}</p>
      )}
    </div>
  );
};

export default GlobalHead;
