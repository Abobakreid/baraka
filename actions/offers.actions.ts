import { createClient } from "@/utils/supabase/server";

export const getOffers = async () => {
  try {
    const supabase = await createClient();
    const { data: products } = await supabase
      .from("products")
      .select("*")
      .gt("discountPercentage", 0);
    const { data: oils } = await supabase
      .from("oils")
      .select("*")
      .gt("discountPercentage", 0);

    const allProducts = [...(products || []), ...(oils || [])];

    return {
      data: allProducts,
    };
  } catch (error) {
    console.error("Error fetching filtered parts:", error);
    return {
      data: [],
    };
  }
};
