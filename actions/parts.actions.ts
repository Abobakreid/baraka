"use server";
import { createClient } from "@/utils/supabase/server";

export const getFilteredParts = async (data: {
  search: string;
  category: string;
  page: number;
  limit: number;
}) => {
  try {
    const supabase = await createClient();
    const { data: products } = await supabase.from("products").select();
    let filtered = products;

    if (!filtered) {
      return {
        data: [],
        total: 0,
        totalPages: 0,
        currentPage: data.page,
      };
    }

    // Apply filters
    if (data.search) {
      const searchLower = data.search.toLowerCase();
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchLower)
      );
    }

    if (data.category) {
      filtered = filtered.filter(
        (product) =>
          product.category.toLowerCase() === data.category.toLowerCase()
      );
    }

    if (data.limit === 0) {
      const total = filtered.length;
      return {
        data: filtered,
        total,
        totalPages: 0,
        currentPage: data.page,
      };
    }

    // Pagination
    const total = filtered.length;
    const totalPages = Math.ceil(total / data.limit);
    const startIndex = (data.page - 1) * data.limit;
    const endIndex = startIndex + data.limit;
    const paginatedData = filtered.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total,
      totalPages,
      currentPage: data.page,
    };
  } catch (error) {
    console.error("Error fetching filtered parts:", error);
    return {
      data: [],
      total: 0,
      totalPages: 0,
      currentPage: data.page,
    };
  }
};

export const filterProductsOptions = async () => {
  try {
    const supabase = await createClient();
    const { data: products } = await supabase.from("products").select();
    const categoryData =
      products && products.map((product) => product.category);
    categoryData?.unshift("الكل");
    const brands = new Set(categoryData);
    const filteredBrands = Array.from(brands);
    return filteredBrands;
  } catch (error) {
    console.error("Error fetching oils:", error);
    return [];
  }
};
