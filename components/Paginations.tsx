/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { PaginationsProps } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQueryState } from "nuqs";
import { Button } from "./ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
const Paginations = ({ total_pages, limit }: PaginationsProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(searchParams.toString());
  const [limitParams, setLimitParams] = useQueryState("limit", {
    defaultValue: `${limit}`,
  });
  const [pageParams, setPageParams] = useQueryState("page", {
    defaultValue: "1",
  });

  const updatePage = (pageNum: number) => {
    setLimitParams(`${limit}`);
    setPageParams(pageNum.toString());
    if (pathname === "/our-works") {
      const ele = document.getElementById("allworks");
      const elementPosition =
        ele && ele.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = (elementPosition && elementPosition - 100) || 0;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      window.scrollTo({ top: 50, behavior: "smooth" });
    }
  };

  useEffect(() => {
    router.refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageParams, router, params.get("page")]);

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = limit;
    let startPage = Math.max(
      1,
      Number(pageParams) - Math.floor(maxPagesToShow / 2)
    );
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > total_pages) {
      endPage = total_pages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Pagination dir="ltr" className="w-full py-5">
      <PaginationContent className="w-full flex flex-row justify-between">
        <PaginationItem>
          <Button
            onClick={() =>
              Number(pageParams) > 1 && updatePage(Number(pageParams) - 1)
            }
            className={cn(
              "flex gap-1.5 items-center cursor-pointer bg-white text-black hover:bg-white",
              {
                "pointer-events-none opacity-50": Number(pageParams) === 1,
              }
            )}
          >
            <ChevronLeft />
            السابق
          </Button>
        </PaginationItem>
        <div className="flex">
          <div className="flex gap-2">
            {getPageNumbers().map((pageNum) => {
              const isActive = pageNum === Number(pageParams);
              return (
                <PaginationItem key={pageNum}>
                  <Button
                    onClick={() => updatePage(pageNum)}
                    className={cn(
                      "px-3 bg-white text-black hover:bg-white cursor-pointer",
                      {
                        "border-[1px] py-0 border-solid border-[oklch(0.551 0.027 264.364)] hover:bg-[oklch(0.551 0.027 264.364)] rounded-sm px- py-0":
                          isActive,
                      }
                    )}
                  >
                    {pageNum}
                  </Button>
                </PaginationItem>
              );
            })}
          </div>

          {total_pages > 5 && Number(pageParams) < total_pages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        </div>
        <PaginationItem>
          <Button
            onClick={() =>
              Number(pageParams) < total_pages &&
              updatePage(Number(pageParams) + 1)
            }
            className={cn(
              "flex gap-1.5 items-center cursor-pointer bg-white text-black hover:bg-white",
              {
                "pointer-events-none opacity-50":
                  Number(pageParams) === total_pages,
              }
            )}
          >
            التالي
            <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
