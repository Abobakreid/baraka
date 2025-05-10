import { getOffers } from "@/actions/offers.actions";
import HeroCarousel from "@/components/HeroCarousel";
import HeroHeader from "@/components/HeroHeader";
import Offers from "@/components/Offers";
import OverlaySection from "@/components/OverlaySection";
import Services from "@/components/Services";
import WhyUs from "@/components/WhyUs";
import { baseUrl } from "@/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  // SEO: Title and Description
  title: "Baraka - فحص وصيانة السيارات وتغيير الزيوت",
  description:
    "بركة اوتو كير وجهتك الأولى لفحص وصيانة السيارات، تغيير الزيوت، وقطع الغيار الأصلية. احجز خدمتك الآن واستمتع براحة البال على الطريق.",

  // SEO: Keywords
  keywords: [
    "بركة اوتو كير",
    "فحص سيارات",
    "صيانة سيارات",
    "تغيير زيوت",
    "قطع غيار سيارات",
    "زيوت محرك",
    "Shell Helix",
    "خدمات سيارات",
    "إصلاح سيارات",
  ],

  // Favicon and Icons (consistent with layout)
  icons: {
    icon: "/logo/logo.svg",
    apple: "/logo/logo.svg",
    shortcut: "/logo/logo.svg",
  },

  // Canonical URL for the home page
  alternates: {
    canonical: baseUrl,
  },

  // Open Graph for social media
  openGraph: {
    title: "Baraka Auto Care - وجهتك لصيانة السيارات",
    description:
      "احجز خدمتك مع بركة اوتو كير لفحص السيارات، صيانة، تغيير زيوت Shell Helix، وقطع غيار أصلية بأسعار مميزة.",
    url: baseUrl,
    siteName: "Baraka Auto Care",
    images: [
      {
        url: `${baseUrl}/hero/hero-1.png`, // Replace with your hero image
        width: 1200,
        height: 630,
        alt: "بركة اوتو كير - خدمات فحص وصيانة السيارات",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },

  // Twitter Card for Twitter/X
  twitter: {
    card: "summary_large_image",
    title: "Baraka Auto Care - فحص وصيانة السيارات",
    description:
      "بركة اوتو كير تقدم فحص وصيانة السيارات، تغيير الزيوت، وقطع غيار أصلية. احجز الآن!",
    images: [`${baseUrl}/hero/hero-1.png`],
  },

  // Robots: Optimize for indexing
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Base URL for relative URLs
  metadataBase: new URL(baseUrl),
};

export default async function Home() {
  const res = await getOffers();
  return (
    <main>
      <HeroCarousel />
      <HeroHeader />
      <WhyUs />
      <Services />
      {res.data.length > 0 && <Offers products={res.data} />}
      <OverlaySection
        text="صيانة سيارتك بسهولة وأمان"
        image="/overlays/overlay-1.png"
      />
    </main>
  );
}
