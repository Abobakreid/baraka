import CTA from "@/components/CTA";
import OverlaySection from "@/components/OverlaySection";
import PaginationProductSide from "@/components/PaginationProductSide";
import Services from "@/components/Services";
import SocialProof from "@/components/SocialProof";
import { maxPrice } from "@/constants";
import { filterOilsOptions, oilsSocialProof } from "@/constants/oilsData";
import { getFilteredData } from "@/server/actions/oils.actions";
import { OilsSearchParams } from "../../../types/index";

// todo: edit url
const baseUrl = "https://baraka-carcare.com";
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<OilsSearchParams>;
}) {
  const page = Number((await searchParams).page) || 1;
  const limit = Number((await searchParams).limit) || 6;
  const search = (await searchParams).search || "";
  const brand = (await searchParams).brand || "";
  const range = (await searchParams).priceRange || `0,${maxPrice}`;

  const priceRange = !Array.isArray(range)
    ? range.split(",").map(Number)
    : [0, 1000];
  const priceMin = priceRange[0];
  const priceMax = priceRange[1];

  const searchData = { search, brand, priceMin, priceMax, page, limit };

  // Fetch filtered data
  const { data, total, totalPages, currentPage } = await getFilteredData(
    searchData
  );

  // Validate page
  if (page < 1 || page > totalPages || page !== currentPage) {
    return {
      title: "الصفحة غير موجودة | بركة اوتو كير",
      description:
        "لم نجد الصفحة المطلوبة. تصفح زيوتنا الأخرى لدى بركة اوتو كير!",
      robots: "noindex",
      alternates: {
        canonical: `${baseUrl}/car-oils`,
      },
    };
  }

  // Build query string for canonical URL
  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (brand) query.set("brand", brand);
  if (priceMin > 0) query.set("priceMin", priceMin.toString());
  if (priceMax < maxPrice) query.set("priceMax", priceMax.toString());
  query.set("page", page.toString());

  // Dynamic title
  let title = "زيوت محركات السيارات";
  if (brand) title = `زيوت ${brand.charAt(0).toUpperCase() + brand.slice(1)}`;
  if (search) title += ` - "${search}"`;
  title += ` - الصفحة ${page} | بركة اوتو كير`;

  // Dynamic description
  let description = `تسوق زيوت محركات عالية الجودة من بركة اوتو كير. `;
  if (search)
    description = `ابحث عن "${search}" في زيوت محركات بركة اوتو كير. `;
  if (brand)
    description += `تصفح زيوت ${
      brand.charAt(0).toUpperCase() + brand.slice(1)
    } `;
  if (priceMin > 0 || priceMax < maxPrice) {
    description += `بأسعار من ${priceMin.toLocaleString()} إلى ${
      priceMax === Infinity ? "غير محدود" : priceMax.toLocaleString()
    } ل.س `;
  }
  description += `مع ${total} منتج متاح، الصفحة ${page} من ${totalPages}.`;

  // Dynamic keywords
  const keywords = [
    "بركة اوتو كير",
    "زيوت محرك",
    "زيوت سيارات",
    "تغيير زيوت",
    brand || "",
    search || "",
    "زيوت بنزين",
    "زيوت ديزل",
    // Add dynamic product titles if available
    ...data.map((product) => product.title || "").filter(Boolean),
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    icons: {
      icon: "/logo/logo.svg",
      apple: "/logo/logo.svg",
      shortcut: "/logo/logo.svg",
    },
    alternates: {
      canonical: `${baseUrl}/car-oils?${query.toString()}`,
      ...(page > 1 && {
        prev: `${baseUrl}/car-oils?${new URLSearchParams({
          ...Object.fromEntries(query),
          page: (page - 1).toString(),
        }).toString()}`,
      }),
      ...(page < totalPages && {
        next: `${baseUrl}/car-oils?${new URLSearchParams({
          ...Object.fromEntries(query),
          page: (page + 1).toString(),
        }).toString()}`,
      }),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/car-oils?${query.toString()}`,
      siteName: "Baraka Auto Care",
      images: [
        {
          url: `${baseUrl}/hero/hero-1.png`, // Replace with real image
          width: 1200,
          height: 630,
          alt: "زيوت محركات بركة اوتو كير",
        },
      ],
      locale: "ar_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${baseUrl}/hero/hero-1.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
    metadataBase: new URL(baseUrl),
  };
}

const page = async ({
  searchParams,
}: {
  searchParams: Promise<OilsSearchParams>;
}) => {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams.page) || 1;
  const limit = Number(resolvedParams.limit) || 6;
  const search = resolvedParams.search || "";
  const brand = resolvedParams.brand || "";
  const range = resolvedParams.priceRange || "";

  const priceRange =
    !Array.isArray(range) || range !== ""
      ? range.split(",").map(Number)
      : [0, 1000];
  const priceMin = priceRange[0];
  const priceMax = priceRange[1];

  const data = { search, brand, priceMin, priceMax, page, limit };
  console.log(data, "data before pass");
  const FilterData = await getFilteredData(data);

  return (
    <main>
      <SocialProof text={"الزيوت"} proofCard={oilsSocialProof} />
      <PaginationProductSide
        price={true}
        data={FilterData.data}
        filterOptions={filterOilsOptions}
        page={page}
        limit={limit}
        link={`/car-oils`}
        totalPages={FilterData.totalPages!}
      />
      <CTA
        title="هناك منتجات اخري غير معروضة,تواصل معنا للحصول علي المزيد من التفاصيل
          الاسعار سارية [1/5/2025]"
      />
      <Services />
      <OverlaySection
        text="استخدم أفضل الزيوت للحفاظ على أداء محرك سيارتك."
        image={"/overlays/overlay-3.png"}
      />
    </main>
  );
};

export default page;
