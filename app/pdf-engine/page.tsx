import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { FileText, Download, Printer, Settings } from "lucide-react";

export default function PDFEnginePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <header className="bg-black text-white py-24 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="inline-block px-4 py-2 bg-[#FFDE59] text-black font-black uppercase text-sm mb-4 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              Digital Artifact Generator
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 underline decoration-[#FFDE59]">
              PDF Engine
            </h1>
            <p className="text-xl md:text-2xl font-bold border-l-4 border-white pl-6 max-w-3xl">
              Professional, boardroom-ready documents generated instantly. No
              more corrupted templates or messy spreadsheets.
            </p>
          </div>
        </header>

        <section className="py-24 max-w-7xl mx-auto px-4 md:px-6 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-12">
              <section className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-6 mb-8 group">
                  <div className="bg-black text-white p-4 group-hover:bg-[#FFDE59] group-hover:text-black transition-colors border-2 border-black">
                    <Download size={40} />
                  </div>
                  <h3 className="text-3xl font-black uppercase">Instant Export</h3>
                </div>
                <p className="text-lg font-bold text-gray-800 leading-relaxed border-l-4 border-black pl-6">
                  One click produces industrial-grade measurement sheets, bills,
                  and summaries in high-resolution PDF format.
                </p>
              </section>

              <section className="border-4 border-black p-10 bg-[#FFDE59] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-6 mb-8 group">
                  <div className="bg-black text-white p-4 group-hover:bg-white group-hover:text-black transition-colors border-2 border-black">
                    <Settings size={40} />
                  </div>
                  <h3 className="text-3xl font-black uppercase text-black">
                    Branding
                  </h3>
                </div>
                <p className="text-lg font-bold text-black leading-relaxed border-l-4 border-black pl-6">
                  Include your company logo, official colors, and signatures
                  directly on every document generated.
                </p>
              </section>
            </div>

            <div className="flex flex-col justify-center items-center bg-[#f0f0f0] border-4 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] group">
              <FileText
                size={220}
                className="text-black group-hover:scale-110 transition-transform"
              />
              <div className="mt-8 px-8 py-3 bg-white border-2 border-black font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
                READY TO PRINT
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
