import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: "Free",
      sub: "Forever free",
      feats: ["5 Active Projects", "Basic Analytics", "PDF Export"],
    },
    {
      name: "Pro",
      price: "₹999",
      sub: "per month",
      feats: [
        "50 Active Projects",
        "Advanced Analytics",
        "Custom Branding",
        "Priority Support",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: "₹2,999",
      sub: "per month",
      feats: [
        "Unlimited Projects",
        "Dedicated Support",
        "Custom Integration",
        "SLA Agreement",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white pb-40">
        <header className="bg-black text-white py-24 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-6 underline decoration-[#FFDE59]">
              Pricing
            </h1>
            <p className="text-xl md:text-2xl font-bold border-l-4 border-white pl-6 max-w-3xl">
              Transparent, industrial-grade plans built for professionals and
              large organizations.
            </p>
          </div>
        </header>

        <section className="py-24 max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 pt-12 items-start">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`flex flex-col border-4 border-black bg-white p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none ${
                  plan.popular
                    ? "ring-4 ring-black ring-offset-8 ring-offset-white scale-105 z-10"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="bg-[#FFDE59] text-black text-xs font-black px-4 py-2 text-center uppercase tracking-widest mb-6 border-2 border-black -mx-10 -mt-10 self-center">
                    Most Popular
                  </div>
                )}
                <h3 className="text-3xl font-black uppercase mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm font-bold text-gray-500 mb-8 uppercase tracking-widest">
                  {plan.sub}
                </p>
                <div className="text-6xl font-black mb-10">{plan.price}</div>

                <ul className="space-y-6 text-base font-bold mb-12 flex-1">
                  {plan.feats.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-4">
                      <Check
                        className="p-1 bg-black text-white border-2 border-black shrink-0"
                        size={24}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/auth/signup"
                  className={`w-full py-5 text-center text-xl font-black uppercase border-2 border-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] ${
                    plan.popular
                      ? "bg-black text-white hover:bg-white hover:text-black"
                      : "bg-white hover:bg-black hover:text-white"
                  }`}
                >
                  {plan.name === "Enterprise" ? "Contact Support" : "Start Free Trial"}
                </Link>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
