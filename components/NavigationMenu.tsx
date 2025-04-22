"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import Link from "./Link";
import { NavAccordionProps } from "@/types";

export const NavNavigationMenu = ({ subLinks, active }: NavAccordionProps) => {
  const params = useParams();
  return (
    <NavigationMenu dir="rtl">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger
            className={cn("font-medium text-md px-0", {
              "text-[#80191E]": active,
            })}
          >
            صيانة السيارات
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col pb-0 min-w-40">
            {subLinks.map((link, index) => {
              const isActive =
                params &&
                decodeURIComponent(params.type as string) === link.label;
              return (
                <Link
                  key={index}
                  href={`${link.route}`}
                  className={cn("flex w-full font-semibold py-1.5", {
                    "text-[#80191E]": isActive,
                  })}
                >
                  {link.label}
                </Link>
              );
            })}
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
