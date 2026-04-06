"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Ruler, ArrowRight, ChevronDown, User } from "lucide-react";
import { useAuthSession } from "@/lib/use-auth-session";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, isPending } = useAuthSession();

  const navItems = [
    { name: "Features", href: "/features" },
    { name: "Estimation AI", href: "/estimation-ai" },
    { name: "PDF Engine", href: "/pdf-engine" },
    { name: "API Access", href: "/api-access" },
    { name: "Pricing", href: "/pricing" },
  ];

  const getDashboardPath = () => {
    if (!session?.user) return "/auth/signin";
    const role = session.user.role;
    return (role === "Admin" || role === "SuperAdmin") ? "/admin" : "/dashboard";
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-4 border-black bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex h-24 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-black text-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-none group-hover:translate-x-[2px] group-hover:translate-y-[2px] transition-all">
              <Ruler className="h-8 w-8" />
            </div>
            <span className="text-3xl font-black tracking-tighter uppercase text-black">
              MeasurePro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-8 text-sm font-black uppercase items-center text-black">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:underline underline-offset-8 decoration-4 decoration-[#FFDE59] transition-all"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-6">
            {!isPending && session?.user ? (
               <>
                 <Link
                   href={getDashboardPath()}
                   className="bg-[#FFDE59] text-black px-8 py-3.5 font-black uppercase border-2 border-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] flex items-center gap-2"
                 >
                   <User className="w-4 h-4" /> Go to Dashboard
                 </Link>
               </>
            ) : (
               <>
                 <Link
                   href="/auth/signin"
                   className="text-sm font-black uppercase hover:text-gray-600 transition-colors text-black"
                 >
                   Log in
                 </Link>
                 <Link
                   href="/auth/signup"
                   className="bg-black text-white px-8 py-3.5 font-black uppercase border-2 border-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFDE59] hover:text-black hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px]"
                 >
                   Get Started
                 </Link>
               </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden border-4 border-black p-3 bg-[#FFDE59] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            {mobileMenuOpen ? (
              <X className="h-8 w-8 text-black" />
            ) : (
              <Menu className="h-8 w-8 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Menu Sheet */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-4 border-black bg-white fixed inset-0 top-24 z-50 overflow-y-auto">
            <div className="px-4 py-10 space-y-6">
              {/* Mobile Navigation Items */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-xl md:text-2xl font-black uppercase py-5 px-6 border-4 border-black hover:bg-[#f0f0f0] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-2 active:translate-y-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

              <div className="grid grid-cols-2 gap-4 pt-4">
                {!isPending && session?.user ? (
                   <>
                     <Link
                       href={getDashboardPath()}
                       className="block col-span-2 text-xl font-black uppercase py-5 px-6 border-4 border-black bg-[#FFDE59] flex justify-center items-center gap-3 text-center transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-2 active:translate-y-2"
                       onClick={() => setMobileMenuOpen(false)}
                     >
                       <User className="w-5 h-5" /> Dashboard
                     </Link>
                   </>
                ) : (
                   <>
                     <Link
                       href="/auth/signin"
                       className="block text-xl font-black uppercase py-5 px-6 border-4 border-black text-center hover:bg-gray-100 transition-all text-black"
                       onClick={() => setMobileMenuOpen(false)}
                     >
                       Log in
                     </Link>
                     <Link
                       href="/auth/signup"
                       className="block text-xl font-black uppercase py-5 px-6 border-4 border-black bg-black text-white text-center hover:bg-[#FFDE59] hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                       onClick={() => setMobileMenuOpen(false)}
                     >
                       Join
                     </Link>
                   </>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

