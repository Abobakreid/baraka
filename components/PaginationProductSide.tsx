import { cn, getDiscountedPrice } from "@/lib/utils";
import { FilterCardProps, PaginationProductSideProps } from "@/types";
import Image from "next/image";
import Discount from "./Discount";
import FilterForm from "./FilterForm";
import Link from "./Link";
import Paginations from "./Paginations";
import { ScrollArea } from "./ui/scroll-area";

export const dynamic = "force";
const PaginationProductSide = ({
  priceFiltering,
  data,
  page,
  limit,
  filterOptions,
  totalPages,
}: PaginationProductSideProps) => {
  return (
    <section className="container mx-auto p-4">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 max-md:gap-x-0 lg:gap-4 mt-3 w-full md:pt-10">
        <FilterForm
          priceFiltering={priceFiltering}
          filterOptions={filterOptions}
        />
        <ScrollArea
          className={cn(
            "grid grid-cols-1 max-md:col-span-12 xl:col-span-9 gap-6  h-[900px]",
            {
              "max-sm:h-[600px] h-[600px]": data.length <= 3,
              "max-sm:h-[350px]": data.length <= 2,
              "max-sm:h-[600px]": data.length <= 4 && data.length > 2,
            }
          )}
          dir="rtl"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 w-full gap-6">
            {data.map((card, index) => (
              <FilterCard key={index} card={card} />
            ))}
          </div>
        </ScrollArea>
      </div>
      {limit !== 0 && (
        <Paginations page={page} limit={limit} total_pages={totalPages} />
      )}
    </section>
  );
};

export default PaginationProductSide;

export const FilterCard = ({ card }: FilterCardProps) => {
  const DiscountedPrice = getDiscountedPrice(
    card.price,
    card.discountPercentage
  );
  return (
    <>
      {card.Viscosity ? (
        <Link
          href={`/oil-details/${card.id}`}
          className="flex flex-col max-sm:gap-1 gap-2 justify-center text-right rounded-md py-4 sm:py-6 px-2 border-[1px] border-solid border-[#E7E8EC]"
        >
          <div className="relative max-md:h-32 h-64 w-full">
            <Image
              src={card.image_url}
              alt="image"
              fill
              className="object-contain"
            />
            {/* {card.is_new && (
              <Discount value="جديد" className={"md:left-10 md:-top-1"} />
            )} */}
            {card.discountPercentage && (
              <Discount value={`${card.discountPercentage}%`} />
            )}
            {card.quantity === 0 && (
              <div className="bg-[#FEEDEE] py-2 absolute bottom-0 w-full text-center">
                نفذت الكمية
              </div>
            )}
          </div>
          <h3 className="text-[#4CAF4F] text-lg flex">{card.brand}</h3>
          <h2 className="text-lg text-[#1E1F24] font-medium">{card.title}</h2>
          <div className="flex gap-1.5">
            {card.discountPercentage && !isNaN(DiscountedPrice) ? (
              <>
                <span className="text-sm xl:text-xl font-semibold text-primary">
                  LE {DiscountedPrice}
                </span>
                <span
                  className={cn(
                    "line-through text-sm xl:text-xl text-[#80828D]"
                  )}
                >
                  LE {card.price}
                </span>
              </>
            ) : (
              <span className="text-sm xl:text-xl font-semibold text-primary">
                LE {card.price}
              </span>
            )}
          </div>
        </Link>
      ) : (
        <div className="flex flex-col max-sm:gap-1 gap-2 justify-center text-right rounded-md py-4 sm:py-6 px-2 border-[1px] border-solid border-[#E7E8EC]">
          <div className="relative max-md:h-32 h-64 w-full">
            <Image
              src={card.image_url}
              alt="image"
              fill
              className="object-contain"
            />
            {/* {card.is_new && (
              <Discount value="جديد" className={"md:left-10 md:-top-1"} />
            )} */}
            {card.discountPercentage > 0 && (
              <Discount value={`${card.discountPercentage}%`} />
            )}
            {card.quantity === 0 && (
              <div className="bg-[#FEEDEE] py-2 absolute bottom-0 w-full text-center">
                نفذت الكمية
              </div>
            )}
          </div>
          <h3 className="text-[#4CAF4F] text-lg flex">{card.category}</h3>
          <h2 className="text-lg text-[#1E1F24] font-medium">{card.title}</h2>
          <div className="flex gap-1.5">
            {card.discountPercentage && !isNaN(DiscountedPrice) ? (
              <>
                <span className="text-sm xl:text-xl font-semibold text-primary">
                  LE {DiscountedPrice}
                </span>
                <span
                  className={cn(
                    "line-through text-sm xl:text-xl text-[#80828D]"
                  )}
                >
                  LE {card.price}
                </span>
              </>
            ) : (
              <span className="text-sm xl:text-xl font-semibold text-primary">
                LE {card.price}
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};
