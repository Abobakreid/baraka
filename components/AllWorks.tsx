import { AllWorksProps } from "@/types";
import GlobalHead from "./GlobalHead";
import { WorkCard } from "./LastWorks";
import Paginations from "./Paginations";

const AllWorks = ({ page, limit, data, totalPages }: AllWorksProps) => {
  return (
    <section className="container mx-auto px-4" id="allworks">
      <GlobalHead headText="جميع اعمالنا" imageClassName="!bottom-0" />
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-6 gap-4">
        {data.map((card, index) => (
          <WorkCard key={index} card={card} ImageClassName="mb-3 h-[240px]" />
        ))}
      </div>
      <Paginations limit={limit} page={page} total_pages={totalPages} />
    </section>
  );
};

export default AllWorks;
