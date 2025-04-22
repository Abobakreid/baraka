import CTA from "@/components/CTA";
import PaginationProductSide from "@/components/PaginationProductSide";
import OverlaySection from "@/components/OverlaySection";
import Services from "@/components/Services";
import SocialProof from "@/components/SocialProof";
import {
  autoPartsSocialProof,
  filterAutoPartsOptions,
} from "@/constants/autoPartsData";
import { getFilteredParts } from "@/server/actions/parts.actions";
import { AutoPartsSearchParams } from "@/types";

const baseUrl = "https://baraka-carcare.com";
// Generate metadata
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<AutoPartsSearchParams>;
}) {
  const page = Number((await searchParams).page) || 1;
  const limit = Number((await searchParams).limit) || 6;
  const search = (await searchParams).search || "";
  const category = (await searchParams).category || "";

  // Fetch filtered data
  const { data, total, totalPages, currentPage } = await getFilteredParts({
    search,
    category,
    page,
    limit,
  });

  // Validate page
  if (page < 1 || page > totalPages || page !== currentPage) {
    return {
      title: "الصفحة غير موجودة | بركة اوتو كير",
      description:
        "لم نجد الصفحة المطلوبة. تصفح قطع الغيار الأخرى لدى بركة اوتو كير!",
      robots: "noindex",
      alternates: {
        canonical: `${baseUrl}/out-parts`,
      },
    };
  }

  // Build query string for canonical URL
  const query = new URLSearchParams();
  if (search) query.set("search", search);
  if (category) query.set("category", category);
  query.set("page", page.toString());

  // Dynamic title
  let title = "قطع غيار السيارات";
  if (category) title = `قطع غيار ${category}`;
  if (search) title += ` - "${search}"`;
  title += ` - الصفحة ${page} | بركة اوتو كير`;

  // Dynamic description
  let description = `تسوق قطع غيار عالية الجودة من بركة اوتو كير. `;
  if (search) description = `ابحث عن "${search}" في قطع غيار بركة اوتو كير. `;
  if (category) description += `تصفح قطع ${category} `;
  description += `مع ${total} منتج متاح، الصفحة ${page} من ${totalPages}.`;

  // Dynamic keywords
  const keywords = [
    "بركة اوتو كير",
    "قطع غيار",
    "قطع سيارات",
    category || "",
    search || "",
    "فرامل",
    "فلاتر",
    ...data.map((part) => part.title || "").filter(Boolean),
  ].filter(Boolean);

  return {
    title,
    description,
    keywords,
    icons: {
      icon: "/logo/logo.svg",
      apple: "/logo/apple-touch-icon.png",
      shortcut: "/logo/favicon.ico",
    },
    alternates: {
      canonical: `${baseUrl}/out-parts?${query.toString()}`,
      ...(page > 1 && {
        prev: `${baseUrl}/out-parts?${new URLSearchParams({
          ...Object.fromEntries(query),
          page: (page - 1).toString(),
        }).toString()}`,
      }),
      ...(page < totalPages && {
        next: `${baseUrl}/out-parts?${new URLSearchParams({
          ...Object.fromEntries(query),
          page: (page + 1).toString(),
        }).toString()}`,
      }),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/out-parts?${query.toString()}`,
      siteName: "Baraka Auto Care",
      images: [
        {
          url: `${baseUrl}/hero/hero-1.png`, // Replace with real image
          width: 1200,
          height: 630,
          alt: "قطع غيار بركة اوتو كير",
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
  searchParams: Promise<AutoPartsSearchParams>;
}) => {
  const page = Number((await searchParams).page) || 1;
  const limit = Number((await searchParams).limit) || 6;
  const search = (await searchParams).search || "";
  const category = (await searchParams).category || "";
  const data = {
    search,
    category,
    page,
    limit,
  };
  const filteredData = await getFilteredParts(data);
  return (
    <main>
      <SocialProof
        text={"قطع غيار السيارات"}
        proofCard={autoPartsSocialProof}
        className="flex justify-center gap-24 "
        cardClassName="flex-row-reverse"
      />
      <PaginationProductSide
        price={false}
        data={filteredData.data}
        filterOptions={filterAutoPartsOptions}
        page={page}
        limit={limit}
        totalPages={filteredData.totalPages}
        link={`/auto-parts`}
      />
      <CTA
        title="هناك منتجات اخري غير معروضة,تواصل معنا للحصول علي المزيد من التفاصيل
          الاسعار سارية [1/5/2025]"
      />
      <Services />
      <OverlaySection
        text="أضمن قطع غيار أصلية لسيارتك"
        image={"/overlays/overlay-5.png"}
      />
    </main>
  );
};

export default page;
