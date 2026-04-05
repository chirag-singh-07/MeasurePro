import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { CheckCircle, AlertTriangle, XCircle, Clock, Zap } from "lucide-react";

export default function StatusPage() {
  const components = [
    { name: "Core API Engine", status: "Operational", color: "bg-green-500" },
    { name: "Estimation AI v2.0", status: "Operational", color: "bg-green-500" },
    { name: "PDF Export Node 01", status: "Degraded", color: "bg-yellow-500" },
    { name: "User Auth Service", status: "Operational", color: "bg-green-500" },
  ];

  const history = [
    { date: "April 4, 2026", event: "Standard Database Maintenance", duration: "12m" },
    { date: "March 28, 2026", event: "Resolved PDF Generation latency", duration: "45m" },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <header className="bg-black text-white py-24 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">System Status</h1>
            <div className="flex items-center gap-4 bg-green-500 text-black px-6 py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] w-fit mt-8">
              <CheckCircle size={32} />
              <span className="font-black uppercase text-2xl">All systems operational</span>
            </div>
          </div>
        </header>

        <section className="py-24 max-w-7xl mx-auto px-4 md:px-6 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-12">
              <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black inline-block pb-1">Services</h2>
                <div className="space-y-6">
                  {components.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-6 border-4 border-black bg-[#f0f0f0] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <span className="font-black uppercase text-black">{c.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-black text-xs uppercase opacity-60 text-black">{c.status}</span>
                        <div className={`h-4 w-4 rounded-full ${c.color} border-2 border-black animate-pulse`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-12">
              <div className="border-4 border-black p-10 bg-[#FFDE59] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-black">
                <h2 className="text-3xl font-black uppercase mb-8 border-b-4 border-black inline-block pb-1">Uptime History</h2>
                <div className="space-y-6">
                  {history.map((h, i) => (
                    <div key={i} className="flex flex-col border-4 border-black p-6 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group hover:bg-black hover:text-white transition-all">
                      <span className="font-black uppercase text-sm opacity-50 group-hover:opacity-100">{h.date}</span>
                      <p className="font-black text-lg mt-2 uppercase">{h.event}</p>
                      <span className="mt-4 font-black text-xs bg-black text-white p-2 self-start border-2 border-black group-hover:bg-[#FFDE59] group-hover:text-black">{h.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
