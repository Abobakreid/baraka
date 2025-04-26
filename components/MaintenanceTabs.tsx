import { navbarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import GlobalHead from "./GlobalHead";
import Link from "./Link";
import MainSection from "./MainSection";
import Carousels from "./Carousels";
import { CarouselItem } from "./ui/carousel";
const MaintenanceTabs = ({ searchText }: { searchText: string }) => {
  const decodedSearchText = decodeURIComponent(searchText);
  return (
    <section className="container mx-auto p-4">
      <GlobalHead headText={"صيانة السيارات"} imageClassName="!bottom-1" />
      <Carousels
        previousClassName="max-sm:hidden sm:-left-9  md:-left-10   lg:hidden z-10"
        nextClassName="max-sm:hidden sm:-right-9 md:-right-10  lg:hidden z-10"
        dir="ltr"
        className="py-0 xl:flex-row-reverse"
        carouselStyle={"border-b-[2px] border-solid border-primary mb-2"}
        containerStyle={"sm:px-6 md:px-8"}
      >
        {navbarLinks[1].subLinks &&
          navbarLinks[1].subLinks.map((item, index) => (
            <CarouselItem
              key={index}
              className="basis-1/3 md:basis-1/2 lg:basis-1/5"
            >
              <Link
                href={`${item.route}`}
                className={cn(
                  "py-2 flex  justify-center text-sm md:text-xl text-center",
                  {
                    "bg-primary text-white": decodedSearchText === item.label,
                    "max-sm:text-[12px]": item.label === "سمكره ودهان",
                  }
                )}
              >
                ال{item.label}
              </Link>
            </CarouselItem>
          ))}
      </Carousels>

      <MainSection />
    </section>
  );
};

export default MaintenanceTabs;
