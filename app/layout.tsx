import type { Metadata } from "next";
// import { Cairo, Noto_Sans_Arabic, Tajawal } from "next/font/google";
import "./globals.css";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GlobalContext from "@/context/GlobalContext";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import localFont from "next/font/local";

const theSansArabic = localFont({
  src: [
    {
      path: "../public/fonts/Bahij_plain.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/Bahij_SemiBold.ttf",
      weight: "600",
      style: "semibold",
    },
    {
      path: "../public/fonts/Bahij_bold.ttf",
      weight: "700",
      style: "bold",
    },
  ],
  variable: "--font-the-sans-arabic",
});

// const cairoFont = Cairo({
//   weight: ["200", "300", "300", "400", "500", "700", "900"],
//   preload: true,
// });

// const tajawalFont = Tajawal({
//   weight: ["200", "300", "300", "400", "500", "700", "900"],
//   preload: true,
// });

// const NotoFont = Noto_Sans_Arabic({
//   weight: ["200", "300", "400", "500", "700"],
//   preload: true,
// });

// todo: edit url

const baseUrl = "https://baraka-carcare.com";

export const metadata: Metadata = {
  // SEO: Title and Description
  title: {
    default: "Baraka - صيانة وفحص السيارات وتغيير الزيوت",
    template: "%s | Baraka", // For child pages, e.g., "تغيير زيت Shell Helix | Baraka"
  },
  description:
    "Baraka تقدم خدمات فحص وصيانة السيارات، تغيير الزيوت، وإصلاحات بجودة عالية. تسوق زيوت Shell Helix واستمتع بخدمات موثوقة بأسعار تنافسية.",

  // SEO: Keywords
  keywords: [
    "Baraka",
    "فحص سيارات",
    "صيانة سيارات",
    "تغيير زيوت",
    "زيوت محرك",
    "Shell Helix",
    "إصلاح سيارات",
    "خدمات سيارات",
    "زيوت سيارات",
  ],

  // Favicon and Icons
  icons: {
    icon: "/logo/logo.svg",
    apple: "/logo/logo.svg", // Optional: For Apple devices
    shortcut: "/logo/logo.svg", // Optional: For older browsers
  },

  // Canonical URL for the site
  alternates: {
    canonical: baseUrl,
  },

  // Open Graph for social media (Facebook, WhatsApp, etc.)
  openGraph: {
    title: "Baraka - خدمات فحص وصيانة السيارات",
    description:
      "فحص السيارات، تغيير الزيوت، وإصلاحات موثوقة مع Baraka. اكتشف خدماتنا وزيوت Shell Helix بأفضل الأسعار.",
    url: baseUrl,
    siteName: "Baraka",
    images: [
      {
        url: `${baseUrl}/logo/logo.svg`, // Replace with your Open Graph image
        width: 1200,
        height: 630,
        alt: "Baraka - خدمات صيانة السيارات",
      },
    ],
    locale: "ar_AR",
    type: "website",
  },

  // Twitter Card for Twitter/X sharing
  twitter: {
    card: "summary_large_image",
    title: "Baraka - فحص وصيانة السيارات",
    description:
      "Baraka تقدم فحص السيارات، تغيير الزيوت بزيوت Shell Helix، وإصلاحات بجودة عالية. احجز خدمتك الآن!",
    images: [`${baseUrl}/logo/og-image.jpg`], // Same as Open Graph image
  },

  // Robots: Allow indexing
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body className={` ${theSansArabic.className}`}>
        <GlobalContext>
          <Topbar bottom={false} />
          <Navbar />
          <NuqsAdapter>{children}</NuqsAdapter>
          <Footer />
          <Topbar bottom={true} />
        </GlobalContext>
      </body>
    </html>
  );
}
