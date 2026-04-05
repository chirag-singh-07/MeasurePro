import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-black text-white py-20 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">About Us</h1>
            <p className="text-xl md:text-2xl font-bold border-l-4 border-white pl-6">Simplifying Project Measurement and Management</p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-12">
              {/* Mission */}
              <section className="border-4 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-black uppercase mb-6">Our Mission</h2>
                <p className="text-gray-800 font-bold leading-relaxed text-lg">
                  At MeasurePro, we empower teams to manage construction, engineering, and design projects with precision and ease. Our mission is to transform how professionals measure, track, and optimize their projects through intelligent software solutions that save time and reduce errors.
                </p>
              </section>

              {/* Values */}
              <section className="border-4 border-black p-8 bg-[#FFDE59] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-black uppercase mb-6 text-black">Our Core Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-black">
                  <div>
                    <h3 className="text-xl font-black mb-2 uppercase">Precision</h3>
                    <p className="font-bold">Accuracy matters. Our tools ensure your measurements are always reliable.</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2 uppercase">Simplicity</h3>
                    <p className="font-bold">Intuitive interfaces that any professional can master in minutes.</p>
                  </div>
                </div>
              </section>
            </div>

            <div className="space-y-12">
              {/* Story */}
              <section className="border-4 border-black p-8 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <h2 className="text-3xl font-black uppercase mb-6">Our Story</h2>
                <p className="text-gray-800 font-bold leading-relaxed mb-6">
                  MeasurePro was founded to eliminate the inefficiencies that plague traditional project management. Having worked with dozens of construction firms, we realized professionals were spending countless hours on manual work.
                </p>
                <p className="text-gray-800 font-bold leading-relaxed">
                  Today, MeasurePro serves teams across multiple industries, helping them focus on what matters most: delivering excellent results.
                </p>
              </section>

              {/* Stats */}
              <section className="border-4 border-black p-8 bg-black text-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <p className="text-5xl font-black mb-2">500+</p>
                    <p className="text-sm font-black uppercase">Active Teams</p>
                  </div>
                  <div className="text-center">
                    <p className="text-5xl font-black mb-2">50K+</p>
                    <p className="text-sm font-black uppercase">Projects</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
