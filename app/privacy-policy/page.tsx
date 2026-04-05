import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-black text-white py-20 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">Privacy Policy</h1>
            <p className="text-xl md:text-2xl font-bold border-l-4 border-white pl-6">Protecting your project data is our priority.</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
              <section className="border-4 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-black uppercase mb-6">Information Collection</h2>
                <p className="font-bold text-gray-800 leading-relaxed mb-6">
                  We collect personal information that you voluntarily provide to us when you register on our Service, express an interest in obtaining information about us or our products, or when you participate in activities on the Service.
                </p>
                <div className="bg-[#f0f0f0] border-2 border-black p-6 font-bold">
                  <p className="uppercase text-xs font-black mb-2 opacity-50">Collected Data Points:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Name and Contact Data</li>
                    <li>Credentials and Account Info</li>
                    <li>Project and Measurement Data</li>
                    <li>Payment Information</li>
                  </ul>
                </div>
              </section>

              <section className="border-4 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-black uppercase mb-6">How We Use Your Info</h2>
                <p className="font-bold text-gray-800 leading-relaxed">
                  We use personal information collected via our Service for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
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
