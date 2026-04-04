"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Ruler, ArrowRight } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = ["Features", "How it Works", "Testimonials", "Pricing"];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-2 border-black bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-black text-white p-2 border-2 border-black">
              <Ruler className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              MeasurePro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8 text-base font-bold items-center">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="hover:underline underline-offset-4 decoration-2"
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-base font-bold hover:underline"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="bg-black text-white px-6 py-2.5 font-bold border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu Sheet */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-black bg-white">
            <div className="px-4 py-6 space-y-4">
              {/* Mobile Navigation Items */}
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block text-lg font-bold py-3 px-4 border-2 border-black hover:bg-gray-100 transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}

              {/* Mobile Auth Links */}
              <Link
                href="/auth/signin"
                className="block text-lg font-bold py-3 px-4 border-2 border-black hover:bg-gray-100 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Log in
              </Link>

              {/* Get Started Button for Mobile */}
              <Link
                href="/auth/signup"
                className="w-full bg-black text-white px-6 py-3 font-bold text-lg border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 flex items-center justify-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get Started <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
