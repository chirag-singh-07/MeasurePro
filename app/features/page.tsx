import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Ruler,
  FileText,
  ChartBar,
  ShieldCheck,
  Hammer,
  Check,
} from "lucide-react";

export default function FeaturesPage() {
  const features = [
    {
      icon: Ruler,
      title: "Dynamic Measurements",
      desc: "Industrial-grade measurement tools with auto-calculations.",
    },
    {
      icon: FileText,
      title: "PDF Reports",
      desc: "Generate professional measurement sheets and invoices.",
    },
    {
      icon: ChartBar,
      title: "Project Analytics",
      desc: "Real-time tracking of project completion and costs.",
    },
    {
      icon: ShieldCheck,
      title: "Data Security",
      desc: "Enterprise-level encryption for all your project data.",
    },
    {
      icon: Hammer,
      title: "Multi-Tenant",
      desc: "Isolated data for multiple teams and projects.",
    },
    {
      icon: Check,
      title: "GST Ready",
      desc: "Compliant with tax standards and easy exporting.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <header className="bg-black text-white py-24 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6">
              Powerful Features
            </h1>
            <p className="text-xl md:text-2xl font-bold border-l-4 border-[#FFDE59] pl-6 max-w-3xl">
              Everything you need to manage modern construction projects with
              digital precision.
            </p>
          </div>
        </header>

        <section className="py-24 max-w-7xl mx-auto px-4 md:px-6 pb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <div
                key={i}
                className="border-4 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all group"
              >
                <div className="bg-black text-white p-4 w-fit border-2 border-black mb-6 group-hover:bg-[#FFDE59] group-hover:text-black transition-colors">
                  <f.icon size={32} />
                </div>
                <h3 className="text-2xl font-black uppercase mb-4">{f.title}</h3>
                <p className="font-bold text-gray-800 leading-relaxed border-l-4 border-black pl-4">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
