"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

interface UrlPaginationProps {
  totalPages: number;
}

export function UrlPagination({ totalPages }: UrlPaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12 py-4">
      <Link
        href={createPageURL(currentPage - 1)}
        className={`p-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFDE59] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 ${
          currentPage <= 1 ? "pointer-events-none opacity-30 shadow-none translate-x-1 translate-y-1" : ""
        }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </Link>

      <div className="flex items-center gap-2">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <div key={`dots-${index}`} className="px-2">
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </div>
          ) : (
            <Link
              key={`page-${page}`}
              href={createPageURL(page)}
              className={`min-w-[44px] h-11 flex items-center justify-center px-4 font-black text-xs uppercase border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 ${
                currentPage === page 
                ? 'bg-black text-white' 
                : 'bg-white hover:bg-[#FFDE59]'
              }`}
            >
              {page}
            </Link>
          )
        ))}
      </div>

      <Link
        href={createPageURL(currentPage + 1)}
        className={`p-2 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFDE59] transition-all active:shadow-none active:translate-x-1 active:translate-y-1 ${
          currentPage >= totalPages ? "pointer-events-none opacity-30 shadow-none translate-x-1 translate-y-1" : ""
        }`}
      >
        <ChevronRight className="w-5 h-5" />
      </Link>
    </div>
  );
}
