import Image from "next/image";
import Link from "./Link";

import { footerLinks } from "@/constants";
import { Mail, MapPin, Phone } from "lucide-react";
import Map from "./Map";
const Footer = () => {
  return (
    <footer>
      <div className="container mx-auto px-4 gap-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 border-b-[1px] border-solid border-[#414248] py-16 xl:py-20">
        <div className="flex flex-col gap-1.5 place-content-center place-items-center col-span-3">
          <Image
            src={"/logo/logo.svg"}
            alt="logo"
            width={100}
            height={100}
            className="object-contain"
            loading="lazy"
          />
          <Image
            src={"/logo/name.svg"}
            alt="logo"
            width={100}
            height={100}
            className="object-contain"
            loading="lazy"
          />
        </div>
        <div className="flex flex-row gap-10 gap-x-24 col-span-5">
          {footerLinks.map((footer, index) => (
            <div key={index} className="flex flex-col gap-5">
              <h2 className="text-2xl border-b-[1px] border-solid border-primary w-fit font-medium">
                {footer.head}
              </h2>
              <div className="flex flex-col gap-2">
                {footer.links &&
                  footer.links.map((link, index) => (
                    <Link
                      key={index}
                      href={`${link.route}`}
                      className="text-xl text-[#414248] hover:border-b transition-all"
                    >
                      {link.label}
                    </Link>
                  ))}
              </div>
            </div>
          ))}

          <div className="flex flex-col gap-5">
            <h2 className="text-2xl border-b-[1px] border-solid border-primary w-fit font-medium">
              تواصل معنا
            </h2>
            <div className="flex flex-col gap-5">
              <div className="flex gap-2">
                <Mail fill="#414248" className="text-white" />
                <h2 className="text-xl text-[#414248]">info@gmail.com</h2>
              </div>
              <div className="flex gap-2 text-[#414248]">
                <Phone fill="#414248" className="text-white" />
                <h2 className="text-xl">012345678912</h2>
              </div>
              <div className="flex gap-2">
                <MapPin fill="#414248" className="text-white" />
                <h2 className="text-xl text-[#414248]">
                  العنوان: الفيوم سنورس أبو عيطة
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden h-[300px] col-span-4 max-lg:w-full">
          <Map />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
