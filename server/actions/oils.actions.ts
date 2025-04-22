import { maxPrice } from "@/constants";
import { oilsAbout } from "@/constants/oilsData";
import { cache } from "@/lib/cache";

export const productById = cache(
  async (id: string) => {
    return oilsAbout.find((item) => item.id === id);
  },
  [`oil-${crypto.randomUUID()}`],
  {
    revalidate: 60,
  }
);

export const products = cache(
  async () => {
    return oilsAbout;
  },
  [`oil-${crypto.randomUUID()}`],
  {
    revalidate: 60,
  }
);

export const getFilteredData = cache(
  async (data: {
    search: string;
    brand: string;
    priceMin: number;
    priceMax: number;
    page: number;
    limit: number;
  }) => {
    let filtered = oilsAbout;

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
  },
  [`oils-${crypto.randomUUID()}`],
  {
    revalidate: 60,
  }
);
