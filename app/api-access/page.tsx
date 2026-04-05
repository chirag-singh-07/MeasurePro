import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Key, Code, Terminal, ExternalLink } from "lucide-react";

export default function APIAccessPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <header className="bg-black text-white py-24 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 underline decoration-[#FFDE59]">
              API Access
            </h1>
            <p className="text-xl md:text-2xl font-bold border-l-4 border-white pl-6 max-w-3xl">
              Integrate MeasurePro's calculation engine and project data directly
              into your existing ERP, CRM, or custom tools.
            </p>
          </div>
        </header>

        <section className="py-24 max-w-7xl mx-auto px-4 md:px-6 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <section className="border-4 border-black p-10 bg-[#FFDE59] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-6 mb-8 group">
                  <div className="bg-black text-white p-4 group-hover:bg-white group-hover:text-black transition-colors border-2 border-black">
                    <Key size={40} />
                  </div>
                  <h3 className="text-3xl font-black uppercase text-black">
                    Secure Keys
                  </h3>
                </div>
                <p className="text-lg font-bold text-black leading-relaxed border-l-4 border-black pl-6">
                  Generate project-level or company-level API keys with granular
                  permissions and automatic rotation support.
                </p>
              </section>

              <section className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-6 mb-8 group">
                  <div className="bg-black text-white p-4 group-hover:bg-[#FFDE59] group-hover:text-black transition-colors border-2 border-black">
                    <Code size={40} />
                  </div>
                  <h3 className="text-3xl font-black uppercase">REST Endpoints</h3>
                </div>
                <p className="text-lg font-bold text-gray-800 leading-relaxed border-l-4 border-black pl-6">
                  Full CRUD access to your measurements, bills, and user
                  permissions via our high-performance GraphQL and REST API.
                </p>
              </section>
            </div>

            <div className="bg-[#f0f0f0] border-4 border-black p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center space-y-12">
              <Terminal
                size={160}
                className="text-black group-hover:scale-110 transition-transform"
              />
              <a
                href="/docs"
                className="bg-black text-white px-10 py-5 text-xl font-bold uppercase tracking-widest flex items-center gap-3 border-2 border-black hover:bg-white hover:text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] transition-all"
              >
                Documentation <ExternalLink />
              </a>
              <div className="text-xs font-black uppercase opacity-40">
                v1.2.0 API Version Active
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
