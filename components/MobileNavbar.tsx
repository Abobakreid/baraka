"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navbarLinks } from "@/constants";
import { ChevronDown, Menu } from "lucide-react";
import Image from "next/image";
import Link from "./Link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import NavAccordion from "./NavAccordion";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";
const MobileNavbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>();
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Menu size={24} className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] py-6" side="left">
        <SheetHeader className="flex flex-row justify-between items-center">
          <div className="flex gap-1">
            <Image
              src={"/logo/name.svg"}
              alt="logo"
              width={90}
              height={60}
              className="object-contain w-14 xl:w-20"
            />
            <Image
              src={"/logo/logo.svg"}
              alt="logo"
              width={35}
              height={35}
              className="object-contain w-10 xl:w-14"
            />
          </div>
          <XIcon
            size={22}
            className="cursor-pointer"
            onClick={() => setOpen(false)}
          />
        </SheetHeader>

        <SheetTitle className="hidden">Navigation Menu</SheetTitle>
        <div className="flex px-4">
          <nav className="gap-2 flex flex-col w-full">
            {navbarLinks.map((link, index) => {
              const isActive =
                pathname === link.route ||
                pathname.startsWith(`${link.route}/`);
              if (
                link.route === "/car-maintenance" ||
                pathname.startsWith(`car-maintenance/`)
              ) {
                return (
                  <NavAccordion
                    active={isActive}
                    key={index}
                    subLinks={link.subLinks!}
                  />
                );
              } else {
                return (
                  <Link
                    key={index}
                    href={link.route}
                    className={cn("font-medium flex", {
                      "text-[#80191E]": isActive,
                    })}
                  >
                    {link.label}
                    {link.subLinks && <ChevronDown />}
                  </Link>
                );
              }
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
