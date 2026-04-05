import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Brain, Zap, Ruler, ShieldCheck } from "lucide-react";

export default function EstimationAIPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <header className="bg-black text-white py-24 border-b-4 border-black relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 blur-3xl w-96 h-96 bg-[#FFDE59] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="inline-block px-4 py-2 bg-[#FFDE59] text-black font-black uppercase text-sm mb-6 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Next-Gen Precision
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">
              Estimation AI
            </h1>
            <p className="text-xl md:text-2xl font-bold border-l-4 border-[#FFDE59] pl-6 max-w-3xl">
              Artificial intelligence tuned for construction measurement and
              billing workflows.
            </p>
          </div>
        </header>

        <section className="py-24 max-w-7xl mx-auto px-4 md:px-6 space-y-24 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-black uppercase border-b-4 border-black inline-block pb-1">
                Smarter Calculations
              </h2>
              <p className="text-xl font-bold text-gray-800 leading-relaxed border-l-4 border-black pl-6">
                Our AI engine automatically calculates material volumes, costs,
                and tax implications based on project-specific blueprints and
                logic.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="border-4 border-black p-6 bg-[#f0f0f0] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <Zap className="mb-4 text-black" size={32} />
                  <h4 className="font-black uppercase mb-2">90% Faster</h4>
                  <p className="text-sm font-bold opacity-75 text-black">
                    Faster than manual sheet entry.
                  </p>
                </div>
                <div className="border-4 border-black p-6 bg-[#FFDE59] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <ShieldCheck className="mb-4 text-black" size={32} />
                  <h4 className="font-black uppercase mb-2">Zero Errors</h4>
                  <p className="text-sm font-bold opacity-75 text-black">
                    No formula mistakes or oversights.
                  </p>
                </div>
              </div>
            </div>
            <div className="border-4 border-black p-10 bg-black text-white shadow-[16px_16px_0px_0px_rgba(255,222,89,1)] flex flex-col justify-center items-center h-full min-h-[300px]">
              <Brain size={120} className="text-[#FFDE59] animate-pulse" />
              <p className="mt-8 font-black uppercase text-2xl tracking-widest text-[#FFDE59]">
                SYSTEM OPERATIONAL
              </p>
              <p className="font-bold opacity-50 mt-2">v2.0 Neural Engine</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
