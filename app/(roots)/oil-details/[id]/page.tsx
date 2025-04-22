import Details from "@/components/Details";
import OverlaySection from "@/components/OverlaySection";
import Services from "@/components/Services";
import SimilarProducts from "@/components/SimilarProducts";
import { oilsAbout } from "@/constants/oilsData";
import { productById } from "@/server/actions/oils.actions";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return oilsAbout
    .filter((product) => product.id != null)
    .map((product) => ({
      id: String(product.id),
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await productById(id);

  if (!product) {
    return {
      title: "المنتج غير موجود | متجر الزيوت",
      description: "لم نجد المنتج المطلوب. تصفح منتجاتنا الأخرى!",
      robots: "noindex",
    };
  }
  const price = parseFloat(product.price);
  const discount = parseFloat(product.discountPercentage) / 100;
  const discountedPrice = price * (1 - discount);
  // todo: edit url
  const baseUrl = "https://your-site.com";

  return {
    title: `${product.title} - ${product.brand.toUpperCase()} | متجر الزيوت`,
    description: `اشتري ${product.title} (${
      product.Viscosity
    }) بسعر ${discountedPrice.toLocaleString()} ل.س بعد خصم ${
      product.discountPercentage
    }. ${product.description}`,
    keywords: [
      product.title,
      product.brand,
      product.Viscosity,
      product.productType,
      product.Compatibility,
      "زيت محرك",
      "زيوت سيارات",
      "Shell Helix",
    ],
    alternates: {
      canonical: `${baseUrl}/oil-details/${id}`,
    },
    openGraph: {
      title: `${product.title} - ${product.brand.toUpperCase()}`,
      description: `زيت ${
        product.title
      } بسعر ${discountedPrice.toLocaleString()} ل.س (خصم ${
        product.discountPercentage
      }). ${product.description}`,
      url: `${baseUrl}/oil-details/${id}`,
      type: "product",
      images: [
        {
          url: `${baseUrl}${product.image}`,
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} - ${product.brand.toUpperCase()}`,
      description: `زيت ${
        product.title
      } بسعر ${discountedPrice.toLocaleString()} ل.س. ${product.description}`,
      images: [`${baseUrl}${product.image}`],
    },
    robots: "index, follow",
    metadataBase: new URL(baseUrl),
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id || "11s5a4s5sas2as5a1s51a";
  const product = await productById(id);
  if (!product) {
    notFound();
  }
  return (
    <main>
      <Details product={product} />
      <SimilarProducts />
      <Services />
      <OverlaySection
        text="حافظ على محرك سيارتك بأفضل الزيوت"
        image={"/overlays/overlay-3.png"}
      />
    </main>
  );
};

export default page;
