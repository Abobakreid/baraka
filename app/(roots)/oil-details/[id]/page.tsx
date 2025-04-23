import Details from "@/components/Details";
import OverlaySection from "@/components/OverlaySection";
import Services from "@/components/Services";
import SimilarProducts from "@/components/SimilarProducts";
import { productById, products } from "@/server/actions/oils.actions";

export async function generateStaticParams() {
  const res = await products();
  return res.map((product) => ({
    id: product.id.toString(),
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
  const discount = product.discountPercentage
    ? parseFloat(product.discountPercentage) / 100
    : 0;
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
        product.discountPercentage ? product.discountPercentage : 0
      }). ${product.description}`,
      url: `${baseUrl}/oil-details/${id}`,
      images: [
        {
          url: `${baseUrl}/oil-details/${product.image}`,
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
      images: [`${baseUrl}/oil-details/${product.image}`],
    },
    robots: "index, follow",
    metadataBase: new URL(baseUrl),
  };
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id || "1";
  const product = await productById(id);

  return (
    <main>
      <Details product={product!} />
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
