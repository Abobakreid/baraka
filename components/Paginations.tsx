"use client";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "./Link";
import { PaginationsProps } from "@/types";
const Paginations = ({ total_pages, page, limit, link }: PaginationsProps) => {
  const searchParams = useSearchParams();

  const createPageLink = (pageNum: number) => {
    const params = new URLSearchParams(searchParams.toString());
    console.log(searchParams, "qparams");
    console.log(searchParams.toString(), "qparams");
    params.set("page", pageNum.toString());
    params.set("limit", limit.toString());
    return `${link}?${params.toString()}`;
  };
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = limit;
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
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
          <Link
            href={createPageLink(page - 1)}
            className={cn("flex gap-1.5 items-center", {
              "pointer-events-none opacity-50": page === 1,
            })}
          >
            <ChevronLeft />
            السابق
          </Link>
        </PaginationItem>
        <div className="flex">
          <div className="flex gap-2">
            {getPageNumbers().map((pageNum) => {
              const isActive = pageNum === page;
              return (
                <PaginationItem key={pageNum}>
                  <Link
                    href={createPageLink(pageNum)}
                    className={cn("px-2.5", {
                      "border-[1px] border-solid border-[oklch(0.551 0.027 264.364)] hover:bg-[oklch(0.551 0.027 264.364)] rounded-sm px- py-0":
                        isActive,
                    })}
                  >
                    {pageNum}
                  </Link>
                </PaginationItem>
              );
            })}
          </div>

          {total_pages > 5 && page < total_pages - 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
        </div>
        <PaginationItem>
          <Link
            href={createPageLink(page + 1)}
            className={cn("flex gap-1.5 items-center", {
              "pointer-events-none opacity-50": page === total_pages,
            })}
          >
            التالي
            <ChevronRight />
          </Link>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default Paginations;
