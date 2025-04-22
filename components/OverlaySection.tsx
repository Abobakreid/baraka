import Image from "next/image";
import ContactUs from "./ContactUs";

const OverlaySection = ({ text, image }: { text: string; image: string }) => {
  return (
    <section className="h-64 relative mt-10">
      <div className="relative size-full z-10">
        <Image
          src={image}
          alt="overlay Image"
          fill
          className="object-cover brightness-50"
          loading="lazy"
        />
      </div>
      <div className="absolute inset-0 z-50 flex flex-col gap-3 justify-center items-center">
        <h2 className="text-[clamp(1.6rem,2cqw,6rem)] xl:text-5xl text-white">
          {text}
        </h2>
        <ContactUs />
      </div>
    </section>
  );
};

export default OverlaySection;
