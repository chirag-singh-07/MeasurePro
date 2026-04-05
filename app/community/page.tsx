import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Users, Layout, Map, MessageCircle, Heart, Star } from "lucide-react";
import Link from "next/link";

export default function CommunityPage() {
  const forumTopics = [
    { title: "Best practices for residential measurement", posts: 45, votes: 12 },
    { title: "Custom PDF templates share", posts: 128, votes: 94 },
    { title: "API Integration showcase - ERP Connect", posts: 32, votes: 8 },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pb-40">
        <header className="bg-black text-white py-24 border-b-4 border-black text-center box-border">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter mb-6 scale-y-110">Community</h1>
            <p className="text-xl md:text-3xl font-black uppercase text-[#FFDE59] tracking-widest mt-8 flex items-center justify-center gap-4">
              <Users size={32} /> Built by Professionals
            </p>
          </div>
        </header>

        <section className="py-24 max-w-7xl mx-auto px-4 md:px-6 space-y-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Forum */}
            <div className="border-4 border-black p-10 bg-white shadow-[16px_16px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black uppercase mb-8 border-b-4 border-black inline-block pb-1">Discussion</h2>
              <div className="space-y-6">
                {forumTopics.map((topic, i) => (
                  <div key={i} className="p-6 border-4 border-black bg-[#f0f0f0] group hover:bg-black hover:text-white transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_white]">
                    <h4 className="font-black text-lg mb-2 uppercase">{topic.title}</h4>
                    <div className="flex gap-6 text-sm font-black uppercase opacity-60">
                      <span className="flex items-center gap-1"><MessageCircle size={16} /> {topic.posts} posts</span>
                      <span className="flex items-center gap-1"><Heart size={16} /> {topic.votes} votes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Showcase */}
            <div className="border-4 border-black p-10 bg-[#FFDE59] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] text-black">
              <h2 className="text-4xl font-black uppercase mb-8 border-b-4 border-black inline-block pb-1">Showcase</h2>
              <p className="font-bold text-lg mb-8 leading-relaxed border-l-4 border-black pl-6">
                See what other teams are building with MeasurePro. From custom dashboards and integration logic to shared templates.
              </p>
              <button className="w-full bg-black text-white py-5 text-xl font-black uppercase border-2 border-black shadow-[6px_6px_0px_0px_white] hover:bg-white hover:text-black transition-all active:shadow-none active:translate-x-1 active:translate-y-1">
                Explore Showcase
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
