import { DetailsProps } from "@/types";
import { Flame, Share2, Star } from "lucide-react";
import Image from "next/image";
const Details = ({ product }: DetailsProps) => {
  const grayStar = 5 - product.rate;
  const goldStar = 5 - grayStar;
  return (
    <section className="container mx-auto p-4 md:mt-16">
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="col-span-4 relative h-[460px] overflow-hidden">
          <Image
            src={product.image}
            alt="oil image"
            fill
            className="object-contain"
          />
        </div>
        <div className="col-span-8 max-w-[650px] flex flex-col gap-5">
          <h2 className="text-2xl font-semibold">{product.title}</h2>
          <div className="flex gap-5">
            <div className="flex gap-2">
              <Image
                src={"/sent.png"}
                alt="sent Image"
                width={20}
                height={20}
                className="object-contain"
              />
              <p className="flex gap-1">
                المتبقى <span className="text-primary">{product.remain}</span>
                وحدة
              </p>
            </div>
            <div className="flex gap-2 item-center ">
              <Flame className="text-primary" />
              <p className="flex gap-1">
                تم شراءه <span className="text-primary">{product.sold}</span>مرة
              </p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <div className="flex ">
              {Array.from({ length: goldStar }).map((star, index) => (
                <Star key={index} fill="#FFC107" stroke="0" />
              ))}
              {Array.from({ length: grayStar }).map((star, index) => (
                <Star key={index} fill="#D8D9E0" stroke="0" />
              ))}
              <p>(10) تقييمات</p>
            </div>
            <div className="flex gap-2 item-center ">
              <Share2 strokeWidth={1} />
              <p>مشاركة المنتج</p>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            <p className="text-lg text-[#414248]">{product.description}</p>
          </div>
          <div className="flex gap-5 items-center">
            <span className="text-primary">عرض المزيد</span>
          </div>
          <div className="flex gap-5 items-center border-[1px] border-solid border-[#D8D9E0] px-2 py-1 rounded-md">
            <Image
              src={"/award.svg"}
              alt="award Image"
              width={30}
              height={30}
              className="object-contain"
            />
            <p className="text-lg"> ضمان لمدة عام ضد عيوب الصناعة</p>
          </div>
          <div className="flex gap-1 items-center text-xl font-medium">
            <span>{product.price}</span>
            <p>جنية مصري</p>
          </div>
        </div>
      </div>
      <MainDetails product={product} />
    </section>
  );
};

export default Details;

export const MainDetails = ({ product }: DetailsProps) => {
  return (
    <div className="mt-8">
      <span className="px-4 py-2 bg-primary text-white inline-block text-lg">
        تفاصيل المنتج
      </span>
      <div className="border-[1px] border-solid border-[#E7E8EC] border-t-primary px-4 text-lg">
        <div className="grid grid-cols-12 p-2">
          <div className="col-span-4">
            <p className="text-[#414248]">العلامة التجارية</p>
          </div>
          <div className="col-span-8">
            <p className="text-[#1E1F24]">{product.title}</p>
          </div>
        </div>
        <div className="grid grid-cols-12 bg-[#EFF0F3] p-2">
          <div className="col-span-4">
            <p className="text-[#414248]">نوع المنتج </p>
          </div>
          <div className="col-span-8">
            <p className="text-[#1E1F24]">{product.productType} </p>
          </div>
        </div>
        <div className="grid grid-cols-12 p-2">
          <div className="col-span-4">
            <p className="text-[#414248]"> اللزوجة</p>
          </div>
          <div className="col-span-8">
            <p className="text-[#1E1F24]">{product.Viscosity}</p>
          </div>
        </div>
        <div className="grid grid-cols-12 bg-[#EFF0F3] p-2">
          <div className="col-span-4">
            <p className="text-[#414248]"> التوافق</p>
          </div>
          <div className="col-span-8">
            <p className="text-[#1E1F24]">{product.Compatibility}</p>
          </div>
        </div>
        <div className="grid grid-cols-12 p-2">
          <div className="col-span-4">
            <p className="text-[#414248]"> المزايا</p>
          </div>
          <div className="col-span-8">
            <p className="text-[#1E1F24]">{product.Advantages}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
