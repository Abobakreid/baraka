import { autoPartsAbout } from "@/constants/autoPartsData";
import { cache } from "@/lib/cache";

export const getFilteredParts = cache(
  async (data: {
    search: string;
    category: string;
    page: number;
    limit: number;
  }) => {
    let filtered = autoPartsAbout;

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
          product.cardType.toLowerCase() === data.category.toLowerCase()
      );
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
  [`parts-${crypto.randomUUID()}`],
  {
    revalidate: 60,
  }
);
