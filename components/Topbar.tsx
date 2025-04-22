import { topbarSocial } from "@/constants";
import React from "react";
import Image from "next/image";
import Link from "./Link";
import { cn } from "@/lib/utils";

const Topbar = ({ bottom }: { bottom: boolean }) => {
  return (
    <section
      className={cn("py-4", {
        "bg-gradient-to-tl bg-topbar-gradient py-3": !bottom,
      })}
      dir="ltr"
    >
      <div
        className={cn("container mx-auto px-3 flex flex-row justify-center", {
          " justify-between": !bottom,
        })}
      >
        <div className="flex flex-row gap-3">
          {topbarSocial.map((social, index) => (
            <Link key={index} href={social.route} className="flex">
              <Image
                src={social.image}
                alt={social.name}
                width={25}
                height={25}
                className={cn("object-contain max-sm:w-6 max-sm:h-6 ", {
                  invert: bottom,
                })}
              />
            </Link>
          ))}
        </div>
        {!bottom && <h2 className="text-white">تابعنا من هنا</h2>}
      </div>
    </section>
  );
};

export default Topbar;
