import AllWorks from "@/components/AllWorks";
import CustomerReviews from "@/components/CustomerReviews";
import LastWorks from "@/components/LastWorks";
import OverlaySection from "@/components/OverlaySection";
import Services from "@/components/Services";
import VideoSection from "@/components/VideoSection";
import { getWorksData } from "@/server/actions/work.actions";
import { OurWorkSearchParams } from "@/types";

const baseUrl = "https://baraka-carcare.com";
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<OurWorkSearchParams>;
}) {
  const page = Number((await searchParams).page) || 1;
  const limit = Number((await searchParams).limit) || 6;

  // Fetch filtered data
  const { data, total, totalPages, currentPage } = await getWorksData({
    page,
    limit,
  });

  // Validate page
  if (page < 1 || page > totalPages || page !== currentPage) {
    return {
      title: "الصفحة غير موجودة | بركة اوتو كير",
      description:
        "لم نجد الصفحة المطلوبة. تصفح خدماتنا الأخرى لدى بركة اوتو كير!",
      robots: "noindex",
      alternates: {
        canonical: `${baseUrl}/our-works`,
      },
    };
  }

  // Build query string for canonical URL
  const query = new URLSearchParams();
  query.set("page", page.toString());

  // Dynamic title
  const title = `خدمات صيانة السيارات - الصفحة ${page} | بركة اوتو كير`;

  // Dynamic description
  const description = `استكشف خدمات صيانة السيارات عالية الجودة من بركة اوتو كير، مع ${total} خدمة متاحة، الصفحة ${page} من ${totalPages}.`;

  // Dynamic keywords
  const keywords = [
    "بركة اوتو كير",
    "خدمات صيانة",
    "صيانة سيارات",
    "فحص سيارات",
    ...data.map((service) => service.title || "").filter(Boolean),
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
      canonical: `${baseUrl}/our-works?${query.toString()}`,
      ...(page > 1 && {
        prev: `${baseUrl}/our-works?${new URLSearchParams({
          page: (page - 1).toString(),
        }).toString()}`,
      }),
      ...(page < totalPages && {
        next: `${baseUrl}/our-works?${new URLSearchParams({
          page: (page + 1).toString(),
        }).toString()}`,
      }),
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/our-works?${query.toString()}`,
      siteName: "Baraka Auto Care",
      images: [
        {
          url: `${baseUrl}/hero/hero-1.png`, // Replace with real image
          width: 1200,
          height: 630,
          alt: "خدمات صيانة بركة اوتو كير",
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
  searchParams: Promise<OurWorkSearchParams>;
}) => {
  const page = Number((await searchParams).page) || 1;
  const limit = Number((await searchParams).limit) || 6;
  const res = await getWorksData({
    page,
    limit,
  });

  return (
    <main>
      <VideoSection
        title="اعمالنا"
        description="نقدم مجموعة من أعمالنا التي تعكس إبداعنا وجودة خدماتنا. هنا نعرض لكم بعض المشاريع التي قمنا بتنفيذها باحترافية، والتي ساهمت في تحقيق أهداف عملائنا.     "
        videoSrc="/video.mp4"
        contact={false}
      />
      <LastWorks />
      <AllWorks
        data={res.data}
        page={page}
        limit={limit}
        totalPages={res.totalPages}
      />
      <CustomerReviews />
      <Services />
      <OverlaySection
        text="أحدث أعمالنا بجودة واحترافية"
        image={"/overlays/overlay-4.png"}
      />
    </main>
  );
};

export default page;
