import { workCardsData } from "@/constants/ourWorkData";
import { cache } from "@/lib/cache";

export const getWorksData = cache(
  async (data: { page: number; limit: number }) => {
    const filtered = workCardsData;

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
  [`works-${crypto.randomUUID()}`],
  {
    revalidate: 60,
  }
);
