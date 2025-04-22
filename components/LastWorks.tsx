import { cn, GetWorkColors } from "@/lib/utils";
import { WorkCardProps } from "@/types";
import Image from "next/image";
import GlobalHead from "./GlobalHead";
import { workCardsData } from "@/constants/ourWorkData";

const LastWorks = () => {
  return (
    <section className="container mx-auto px-4 my-10">
      <GlobalHead headText="مشاريعنا الاخيرة" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4">
        <div className="col-span-6">
          <WorkCard
            card={workCardsData[0]}
            ImageClassName="mb-4 md:h-[300px]"
          />
        </div>
        <div className="flex flex-col gap-8 col-span-6">
          <WorkCard
            ContainerClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
            card={workCardsData[1]}
          />
          <WorkCard
            ContainerClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
            card={workCardsData[2]}
          />
        </div>
      </div>
    </section>
  );
};

export default LastWorks;

export const WorkCard = ({
  card,
  ImageClassName,
  ContainerClassName,
}: WorkCardProps) => {
  return (
    <div className={cn(`${ContainerClassName}`)}>
      <div
        className={cn(
          `relative h-[170px] overflow-hidden rounded-2xl ${ImageClassName}`
        )}
      >
        <Image
          src={card.image}
          alt="project Image"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl font-medium text-[#1E1F24]">{card.title}</h2>
        <p className="text-[#414248]">{card.description}</p>
        <div className="flex gap-2 items-center">
          {card.whatWeDid.map((item, index) => {
            const colors = GetWorkColors(item.colors);
            return (
              <span
                key={index}
                style={{
                  color: colors.textColor,
                  backgroundColor: colors.bgColor,
                }}
                className={cn(`rounded-2xl px-2 py-1 inline-block`)}
              >
                {item.text}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};
