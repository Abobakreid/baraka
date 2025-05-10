"use client";
import { cn } from "@/lib/utils";
import { SocialProofProps } from "@/types";
import Image from "next/image";
import GlobalHead from "./GlobalHead";

const SocialProof = ({
  text,
  proofCard,
  className,
  cardClassName,
}: SocialProofProps) => {
  const handleClick = (text: string) => {
    const options = Array.from(
      document.querySelectorAll(".options")
    ) as HTMLElement[];
    const selectedOption = options.find(
      (option) => option.textContent?.trim() === text
    );
    if (selectedOption) {
      selectedOption.click();
    }
  };
  return (
    <section className="container mx-auto p-4 md:mt-16">
      <GlobalHead headText={text} imageClassName="xl:bottom-0" />
      <div
        className={cn(
          `grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 place-items-center ${className}`
        )}
      >
        {proofCard.map((proof, index) => (
          <div
            key={index}
            className={cn(
              `flex gap-2 items-center justify-end max-md:w-36 cursor-pointer hover:bg-slate-100 p-1 rounded-md ${cardClassName}`
            )}
            onClick={() => handleClick(proof.text)}
          >
            <h2 className="text-xl md:text-2xl font-extrabold ">
              {proof.text}
            </h2>
            <Image
              src={proof.image}
              alt="logoMark"
              width={45}
              height={45}
              className="object-contain max-md:w-6 max-md:h-6"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialProof;
