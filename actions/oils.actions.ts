"use server";

import { maxPrice } from "@/constants";
import { createClient } from "@/utils/supabase/server";

export const getFilteredOils = async (data: {
  search: string;
  brand: string;
  priceMin: number;
  priceMax: number;
  page: number;
  limit: number;
}) => {
  try {
    const supabase = await createClient();
    const { data: products } = await supabase.from("oils").select();
    let filtered = products;
    if (!filtered) {
      return {
        data: [],
        total: 0,
        totalPages: 0,
        currentPage: data.page,
      };
    }
    if (data.search) {
      const searchLower = data.search.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
      );
    }
    if (data.brand) {
      filtered = filtered.filter(
        (product) => product.brand.toLowerCase() === data.brand.toLowerCase()
      );
    }
    if (data.priceMin > 0 || data.priceMax < maxPrice) {
      filtered = filtered.filter((product) => {
        const price = parseFloat(product.price);
        return price >= data.priceMin && price <= data.priceMax;
      });
    }

    // Pagination
    if (data.limit === 0) {
      const total = filtered.length;
      return {
        data: filtered,
        total,
        totalPages: 0,
        currentPage: data.page,
      };
    }
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
    console.log("Error fetching filtered oils:", error);
    return {
      data: [],
      total: 0,
      totalPages: 0,
      currentPage: data.page,
    };
  }
};

export const relatedProducts = async (brand: string) => {
  try {
    const supabase = await createClient();
    const { data: products } = await supabase
      .from("oils")
      .select("*")
      .eq("brand", brand)
      .range(0, 4);
    return products && products;
  } catch (error) {
    console.error("Error fetching oils:", error);
    return [];
  }
};

export const allProducts = async () => {
  try {
    const supabase = await createClient();
    const { data: products } = await supabase.from("oils").select();
    return products && products;
  } catch (error) {
    console.error("Error fetching oils:", error);
    return [];
  }
};

export const filterProductsOptions = async () => {
  try {
    const supabase = await createClient();
    const { data: products } = await supabase.from("oils").select();
    const brandData = products && products.map((product) => product.brand);
    brandData?.unshift("الكل");
    const brands = new Set(brandData);
    const filteredBrands = Array.from(brands);
    return filteredBrands;
  } catch (error) {
    console.error("Error fetching oils:", error);
    return [];
  }
};

export const productById = async (id: string) => {
  try {
    const supabase = await createClient();
    const { data: product } = await supabase
      .from("oils")
      .select("*")
      .eq("id", id);
    return product && product[0];
  } catch (error) {
    console.error("Error fetching oil by ID:", error);
    return null;
  }
};
