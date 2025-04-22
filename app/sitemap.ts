import { navbarLinks } from "@/constants";
import { oilsAbout } from "@/constants/oilsData";
import { slugify } from "@/lib/utils";

export async function generateSitemaps() {
  try {
    const articles = oilsAbout.length;

    const totalUrls = articles;

    if (totalUrls <= 50000) {
      return [{ id: 0 }];
    }

    const sitemapCount = Math.ceil(totalUrls / 50000);
    return Array.from({ length: sitemapCount }, (_, i) => ({ id: i }));
  } catch (error) {
    console.error("Error in generateSitemaps:", error);
    return [{ id: 0 }];
  }
}

export default async function sitemap({ id }: { id: number }) {
  const baseUrl = "https://yourdomain.com";

  const staticPages = [
    {
      url: `${baseUrl}`,
      lastmod: new Date().toISOString(),
      changefreq: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/auto-parts`,
      lastmod: "2025-03-01",
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/car-inspection`,
      lastmod: "2025-03-01",
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/car-oils`,
      lastmod: "2025-03-01",
      changefreq: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/our-works`,
      lastmod: "2025-03-01",
      changefreq: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const oilsPages = oilsAbout.map((oil) => ({
      url: `${baseUrl}/oil-details/${oil.id}`,
      lastmod: oil.updatedAt || new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.7,
    }));

    const maintenancePages = navbarLinks[1].subLinks!.map((page) => ({
      url: `${baseUrl}/car-maintenance/${slugify(page.label)}`,
      lastmod: page.updatedAt || new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.7,
    }));

    const allPages = [...staticPages, ...oilsPages, ...maintenancePages];
    const start = id * 50000;
    const end = start + 50000;
    return allPages.slice(start, end);
  } catch (error) {
    console.error("Error in sitemap generation:", error);
    return staticPages;
  }
}
