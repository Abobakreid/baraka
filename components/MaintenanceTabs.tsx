import { navbarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import GlobalHead from "./GlobalHead";
import Link from "./Link";
import MainSection from "./MainSection";
import Carousels from "./Carousels";
import { CarouselItem } from "./ui/carousel";
const MaintenanceTabs = ({ searchText }: { searchText: string }) => {
  console.log(searchText, "searchText");
  const decodedSearchText = decodeURIComponent(searchText);
  return (
    <section className="container mx-auto p-4 ">
      <GlobalHead headText={"صيانة السيارات"} />
      <div className=" border-b-[2px] border-solid border-primary">
        <Carousels
          previousClassName="left-0  md:-left-5  flex lg:hidden z-10"
          nextClassName="right-0 md:-right-5 flex lg:hidden z-10"
          dir="ltr"
          className="py-0 xl:flex-row-reverse"
        >
          {navbarLinks[1].subLinks &&
            navbarLinks[1].subLinks.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/5">
                <Link
                  href={`${item.route}`}
                  className={cn("py-2 flex justify-center text-lg", {
                    "bg-primary text-white": decodedSearchText === item.label,
                  })}
                >
                  ال{item.label}
                </Link>
              </CarouselItem>
            ))}
        </Carousels>
      </div>

      {decodedSearchText === "ميكانيكا" && <MainSection />}
      {decodedSearchText === "كهرباء" && <MainSection />}
      {decodedSearchText === "عفشة" && <MainSection />}
      {decodedSearchText === "سمكره ودهان" && <MainSection />}
      {decodedSearchText === "كاوتش" && <MainSection />}
    </section>
  );
};

export default MaintenanceTabs;
