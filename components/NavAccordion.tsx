"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "./Link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { NavAccordionProps } from "@/types";

const NavAccordion = ({ subLinks, active, handelClose }: NavAccordionProps) => {
  const pathname = usePathname();
  const name = pathname && pathname.split("/").slice(-1);
  return (
    <Accordion type="single" defaultValue="item-6" collapsible>
      <AccordionItem value="item-6">
        <AccordionTrigger
          className={cn("p-0 font-semibold cursor-pointers", {
            "text-[#80191E]": active,
          })}
        >
          صيانة السيارات
        </AccordionTrigger>
        <AccordionContent className="flex flex-col pb-0 ">
          {subLinks.map((link, index) => {
            const isActive = name && decodeURIComponent(name[0]) === link.label;
            return (
              <Link
                key={index}
                href={link.route}
                onClick={() => handelClose && handelClose()}
                className={cn(
                  "flex w-full font-semibold py-1.5 hover:py-3 transition-all",
                  {
                    "text-[#80191E]": isActive,
                  }
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NavAccordion;
