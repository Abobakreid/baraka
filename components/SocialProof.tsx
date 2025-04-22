import Image from "next/image";
import React from "react";
import GlobalHead from "./GlobalHead";
import { cn } from "@/lib/utils";
import { SocialProofProps } from "@/types";

const SocialProof = ({
  text,
  proofCard,
  className,
  cardClassName,
}: SocialProofProps) => {
  return (
    <section className="container mx-auto p-4 mt-16">
      <GlobalHead headText={text} className="xl:bottom-0" />
      <div
        className={cn(
          `grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-3 ${className}`
        )}
      >
        {proofCard.map((proof, index) => (
          <div
            key={index}
            className={cn(
              `flex gap-2 items-center justify-end ${cardClassName}`
            )}
          >
            <h2 className="text-2xl font-extrabold ">{proof.text}</h2>
            <Image
              src={proof.image}
              alt="logoMark"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
