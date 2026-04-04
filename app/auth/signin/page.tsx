import Link from "next/link";
import { Ruler } from "lucide-react";
import { Suspense } from "react";
import { SignInForm } from "./signin-form";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FFDE59] font-sans text-black selection:bg-black selection:text-white">
      {/* Left Side - Visuals */}
      <div className="hidden md:flex w-1/2 flex-col justify-between p-12 border-r-4 border-black bg-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        ></div>

        <div className="relative z-10 w-full h-full flex flex-col justify-between">
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <div className="bg-black text-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all">
              <Ruler className="h-8 w-8" />
            </div>
            <span className="text-3xl font-black uppercase tracking-tight">
              MeasurePro
            </span>
          </Link>

          <div className="space-y-6">
            <h2 className="text-5xl font-black uppercase leading-[0.9]">
              Welcome
              <br />
              Back,
              <br />
              Builder.
            </h2>
            <div className="h-4 w-24 bg-black"></div>
            <p className="text-xl font-bold max-w-sm">
              Your projects are exactly where you left them. <br />
              Safe, secure, and ready to bill.
            </p>
          </div>

          <div className="flex gap-4 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all">
            <span className="text-xl font-black uppercase border-b-4 border-black">
              500+ Active Sites
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-8 sm:px-16 py-12 relative bg-[#FFDE59]">
        <Suspense fallback={<div className="w-full max-w-md mx-auto h-96 bg-white border-4 border-black" />}>
          <SignInForm />
        </Suspense>
      </div>
    </div>
  );
}
