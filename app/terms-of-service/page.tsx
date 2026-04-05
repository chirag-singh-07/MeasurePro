import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function TermsOfServicePage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-black text-white py-20 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">Terms of Service</h1>
            <p className="text-xl md:text-2xl font-bold border-l-4 border-white pl-6">Understanding our commitment to your success.</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <section className="border-4 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-black uppercase mb-6">1. Usage Rights</h2>
                <p className="font-bold text-gray-800 leading-relaxed mb-6">
                  By accessing and using MeasurePro, you agree to comply with and be bound by these terms. We grant you a non-exclusive, non-transferable, revocable license to access and use our Service strictly in accordance with these terms.
                </p>
              </section>

              <section className="border-4 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-black uppercase mb-6">2. Data Ownership</h2>
                <p className="font-bold text-gray-800 leading-relaxed">
                  You retain all ownership rights to the data you upload or create within MeasurePro. We do not claim any intellectual property rights over your project data.
                </p>
              </section>
            </div>

            <div className="lg:col-span-4 h-fit sticky top-32">
              <div className="border-4 border-black p-8 bg-[#FFDE59] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-xl font-black uppercase mb-4">Last Updated</h3>
                <p className="font-black text-3xl">APRIL 5, 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
