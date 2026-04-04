"use client";

import Link from "next/link";
import { Construction } from "lucide-react";

export function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-[#f0f0f0]">
      <div className="bg-[#FFDE59] p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full animate-in zoom-in duration-300 transform hover:-rotate-1 transition-transform">
        <div className="bg-black text-white p-4 w-fit mx-auto mb-6 border-2 border-black rotate-3">
          <Construction className="w-12 h-12" />
        </div>
        <h1 className="text-4xl font-black uppercase mb-4 tracking-tighter">
          {title}
        </h1>
        <div className="h-2 w-full bg-black mb-6 pattern-diagonal-lines-sm"></div>
        <p className="font-bold text-gray-800 mb-8 uppercase tracking-wide border-l-4 border-black pl-4 text-left bg-white/50 p-2">
          This module is currently under construction by our engineering team.
        </p>
        <Link
          href="/dashboard"
          className="inline-block w-full bg-black text-white py-4 font-black uppercase border-2 border-black hover:bg-white hover:text-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
