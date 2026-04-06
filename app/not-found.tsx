import { ArrowRight, HelpCircle, MoveLeft, ShieldAlert } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 font-sans text-black">
      <div className="relative z-10 w-full max-w-xl text-center">
        {/* Stylized Icon */}
        <div className="mb-10 flex justify-center">
          <div className="w-24 h-24 bg-[#FFDE59] border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center rotate-[-3deg]">
            <ShieldAlert className="w-12 h-12" />
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white border-2 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-8xl font-black italic tracking-tighter mb-4">
            404
          </h1>
          <h2 className="text-2xl font-black uppercase tracking-tight mb-6">
            Protocol Interrupted
          </h2>
          <p className="text-gray-500 font-bold uppercase text-xs max-w-xs mx-auto mb-10 leading-loose tracking-widest">
            The requested resource has been purged or moved outside the current
            system context.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 bg-black text-white font-black uppercase text-xs py-4 px-8 border-2 border-black hover:bg-[#FFDE59] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 group"
            >
              <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Return Home
            </Link>
            <Link
              href="/help-center"
              className="flex items-center justify-center gap-2 bg-white text-black font-black uppercase text-xs py-4 px-8 border-2 border-black hover:bg-gray-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <HelpCircle className="w-4 h-4" />
              Support
            </Link>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">
          <Link
            href="/status"
            className="hover:text-black transition-colors flex items-center gap-2 italic"
          >
            Node Status <ArrowRight className="w-3 h-3 text-green-500" />
          </Link>
          <p>© 2026 MeasurePro Alpha Node</p>
        </div>
      </div>
    </div>
  );
}
