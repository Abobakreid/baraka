"use client";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navbarLinks } from "../constants/index";
import ContactUs from "./ContactUs";
import Link from "./Link";
import MobileNavbar from "./MobileNavbar";
import { NavNavigationMenu } from "./NavigationMenu";

const Navbar = () => {
  const pathname = usePathname();
  console.log(pathname, "pathname");
  return (
    <section className="border-b-[1px] border-solid border-[#E7E8EC]">
      <header className="container mx-auto px-3 flex flex-row justify-between py-4 items-center">
        <div className="flex gap-1">
          <Image
            src={"/logo/name.svg"}
            alt="logo"
            width={90}
            height={65}
            className="object-contain w-14 xl:w-20"
          />
          <Image
            src={"/logo/logo.svg"}
            alt="logo"
            width={35}
            height={35}
            className="object-contain w-9 xl:w-14"
          />
        </div>
        <nav className="gap-6 hidden xl:flex">
          {navbarLinks.map((link, index) => {
            const isActive =
              pathname === link.route || pathname.startsWith(`${link.route}/`);
            if (
              link.route === "/car-maintenance" ||
              pathname.startsWith(`car-maintenance/`)
            ) {
              return (
                <NavNavigationMenu
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
                  className={cn(
                    "font-medium flex hover:bg-accent hover:text-accent-foreground rounded-sm p-2 transition-all",
                    {
                      "text-[#80191E]": isActive,
                    }
                  )}
                >
                  {link.label}
                  {link.subLinks && <ChevronDown />}
                </Link>
              );
            }
          })}
        </nav>
        <div className="hidden xl:flex">
          <ContactUs />
        </div>
        <div className="flex xl:hidden">
          <MobileNavbar />
        </div>
      </header>
    </section>
  );
};

export default Navbar;
