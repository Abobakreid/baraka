import {} from "@/constants";
import React from "react";
import { FilterCard } from "./PaginationProductSide";
import { oilsAbout } from "@/constants/oilsData";

const SimilarProducts = () => {
  return (
    <section className="container mx-auto p-4">
      <h2 className="text-3xl font-medium py-5">منتجات مشابهه</h2>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
        {oilsAbout.map((card, index) => (
          <FilterCard key={index} card={card} />
        ))}
      </div>
    </section>
  );
};

export default SimilarProducts;
