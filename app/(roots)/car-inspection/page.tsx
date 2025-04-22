import VideoSection from "@/components/VideoSection";
import CheckPoints from "@/components/CheckPoints";
import HowImplement from "@/components/HowImplement";
import OverlaySection from "@/components/OverlaySection";
import Services from "@/components/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "فحص السيارات - جودة وموثوقية مضمونة",
  description:
    "فحص شامل للسيارات بواسطة فنيين متخصصين باستخدام أحدث الأجهزة للكشف عن الأعطال المخفية وضمان جودة عالية تلبي توقعات العملاء.",
  keywords: [
    "فحص السيارات",
    "صيانة سيارات",
    "فحص شامل",
    "سلامة السيارة",
    "موثوقية",
    "حجز موعد فحص",
  ],
  openGraph: {
    title: "فحص السيارات - جودة وموثوقية مضمونة",
    description:
      "نقدم فحصاً دقيقاً لسيارتك باستخدام أحدث التقنيات لضمان سلامتك وراحتك.",
    url: "https://yourwebsite.com/car-inspection", // Replace with your actual URL
    type: "website",
    images: [
      {
        url: "https://yourwebsite.com/inspection/inspection-1.png", // Replace with actual image URL
        width: 800,
        height: 600,
        alt: "فحص السيارات",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "فحص السيارات - جودة وموثوقية مضمونة",
    description: "فحص شامل لسيارتك مع تقرير مفصل لضمان السلامة والجودة.",
    images: ["https://yourwebsite.com/inspection/inspection-1.png"], // Replace with actual image URL
  },
};

const page = () => {
  return (
    <main>
      <VideoSection
        title="فحص السيارات"
        description="يتم تنفيذ الفحص بواسطة فنيين متخصصين باستخدام أحدث الأجهزة للكشف عن الأعطال المخفية. في حالة اكتشاف أي مشكلات، يتم إصلاح ها أو الإبلاغ عنها لضمان تقديم سيارات عالية الجودة تلبي توقعات العملاء "
        videoSrc="/video.mp4"
        contact={true}
      />
      <CheckPoints />
      <HowImplement />
      <Services />
      <OverlaySection
        text="فحص سيارتك بدقة واحترافي"
        image={"/overlays/overlay-2.png"}
      />
    </main>
  );
};

export default page;
