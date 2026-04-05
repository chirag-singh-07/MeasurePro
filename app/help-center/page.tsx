import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Search, HelpCircle, Mail, MessageSquare, Play, Package } from "lucide-react";
import Link from "next/link";

export default function HelpCenterPage() {
  const commonQuestions = [
    { name: "How to set up your account?", icon: Package },
    { name: "Billing and Subscription", icon: Package },
    { name: "Managing Team Members", icon: Package },
    { name: "Exporting PDFs", icon: Package },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pb-40">
        <header className="bg-black text-white py-24 border-b-4 border-black relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 bg-[#FFDE59] w-[400px] h-[400px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10 text-center">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8">Help Center</h1>
            <div className="relative max-w-2xl mx-auto">
              <input 
                type="text" 
                placeholder="How can we help today?" 
                className="w-full px-8 py-6 text-xl border-4 border-black font-black uppercase focus:bg-[#FFDE59] focus:outline-none placeholder:text-gray-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black"
              />
              <Search className="absolute right-8 top-1/2 -translate-y-1/2 text-black" size={32} />
            </div>
          </div>
        </header>

        <section className="py-24 max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Category Cards */}
            <Link href="/faq" className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all group">
              <div className="bg-black text-white p-4 w-fit border-2 border-black mb-8 group-hover:bg-[#FFDE59] group-hover:text-black">
                <HelpCircle size={40} />
              </div>
              <h3 className="text-3xl font-black uppercase mb-4 text-black">FAQs</h3>
              <p className="font-bold text-gray-800 border-l-4 border-black pl-6">Quick answers to common questions.</p>
            </Link>

            <Link href="#" className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all group">
              <div className="bg-black text-white p-4 w-fit border-2 border-black mb-8 group-hover:bg-[#FFDE59] group-hover:text-black">
                <Play size={40} />
              </div>
              <h3 className="text-3xl font-black uppercase mb-4 text-black">Tutorials</h3>
              <p className="font-bold text-gray-800 border-l-4 border-black pl-6">Step-by-step video guides.</p>
            </Link>

            <Link href="/contact-us" className="border-4 border-black p-10 bg-[#FFDE59] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all group">
              <div className="bg-black text-white p-4 w-fit border-2 border-black mb-8 group-hover:bg-white group-hover:text-black">
                <Mail size={40} />
              </div>
              <h3 className="text-3xl font-black uppercase mb-4 text-black">Support</h3>
              <p className="font-bold text-black border-l-4 border-black pl-6">In-depth technical assistance.</p>
            </Link>
          </div>
        </section>

        {/* Contact Strip */}
        <section className="bg-black text-white py-16">
          <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-8">
            <h2 className="text-4xl font-black uppercase">Still need help?</h2>
            <div className="flex gap-6">
              <Link href="/contact-us" className="bg-[#FFDE59] text-black px-10 py-5 text-xl font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_white] hover:shadow-none transition-all">
                Submit a Ticket
              </Link>
              <button className="bg-white text-black px-10 py-5 text-xl font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_#FFDE59] hover:shadow-none transition-all">
                Live Chat
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
