import {} from "@/constants";
import { FilterCard } from "./PaginationProductSide";
import { Product } from "@/types";

const SimilarProducts = ({ related }: { related: Product[] }) => {
  return (
    <section className="container mx-auto p-4">
      <h2 className="text-3xl font-medium py-5">منتجات مشابهه</h2>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
        {related.map((card, index) => (
          <FilterCard key={index} card={card} />
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
