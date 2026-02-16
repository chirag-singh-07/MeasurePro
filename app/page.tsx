import Link from "next/link";
import {
  ArrowRight,
  Check,
  Hammer,
  Ruler,
  FileText,
  ChartBar,
  ShieldCheck,
  Star,
  Menu,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black font-sans selection:bg-black selection:text-white">
      {/* Navigation - Neo-Brutalist */}
      <header className="sticky top-0 z-50 w-full border-b-2 border-black bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6 flex h-20 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white p-2 border-2 border-black">
              <Ruler className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              MeasurePro
            </span>
          </div>

          <nav className="hidden md:flex gap-8 text-base font-bold items-center">
            {["Features", "How it Works", "Testimonials", "Pricing"].map(
              (item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:underline underline-offset-4 decoration-2"
                >
                  {item}
                </Link>
              ),
            )}
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/signin"
              className="text-base font-bold hover:underline hidden sm:block"
            >
              Log in
            </Link>
            <Link
              href="/auth/signup"
              className="bg-black text-white px-6 py-2.5 font-bold border-2 border-black hover:bg-white hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
            >
              Get Started
            </Link>
            <button className="md:hidden border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 border-b-2 border-black bg-[#f0f0f0] relative overflow-hidden">
          {/* Grid Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          ></div>

          <div className="w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-8 text-center max-w-4xl mx-auto">
              <div className="inline-block border-2 border-black bg-white px-4 py-2 text-sm font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                NEW: AI-POWERED ESTIMATION V2.0
              </div>

              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                Precision Measurement <br className="hidden md:block" /> for
                Modern Construction
              </h1>

              <p className="mx-auto max-w-2xl text-lg md:text-xl font-medium text-gray-800 leading-relaxed border-l-4 border-black pl-6 text-left md:text-center md:border-l-0 md:pl-0">
                Streamline your billing, generate flawless measurement sheets,
                and manage projects with industrial-grade precision.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 pt-8 w-full justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center h-16 px-8 text-xl font-bold bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"
                >
                  Start Free Trial <ArrowRight className="ml-3 h-6 w-6" />
                </Link>
                <Link
                  href="#demo"
                  className="inline-flex items-center justify-center h-16 px-8 text-xl font-bold bg-white text-black border-2 border-black hover:bg-gray-100 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"
                >
                  Watch Demo
                </Link>
              </div>

              <div className="pt-16 w-full">
                <p className="text-sm font-black uppercase tracking-widest mb-6 underline decoration-2 underline-offset-4">
                  Trusted by 500+ Top Builders
                </p>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-100">
                  <div className="flex items-center gap-2 text-xl font-black">
                    <Hammer className="h-6 w-6" /> BUILDCORP
                  </div>
                  <div className="flex items-center gap-2 text-xl font-black">
                    <Ruler className="h-6 w-6" /> PRECISE
                  </div>
                  <div className="flex items-center gap-2 text-xl font-black">
                    <ShieldCheck className="h-6 w-6" /> SECURE
                  </div>
                  <div className="flex items-center gap-2 text-xl font-black">
                    <ChartBar className="h-6 w-6" /> MEGAINFRA
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Neo-Brutalist Cards */}
        <section
          id="features"
          className="w-full py-24 border-b-2 border-black bg-white"
        >
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
                Everything you need to scale
              </h2>
              <div className="h-2 w-24 bg-black mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Ruler,
                  title: "Dynamic Measurements",
                  desc: "Inline editable tables that feel like Excel but work like a database. Auto-calculations included.",
                },
                {
                  icon: FileText,
                  title: "Professional Invoicing",
                  desc: "Generate beautiful PDF invoices and measurement sheets instantly. Customizable branding.",
                },
                {
                  icon: ChartBar,
                  title: "Project Analytics",
                  desc: "Real-time dashboard to track project status, revenue, and completion rates.",
                },
                {
                  icon: ShieldCheck,
                  title: "Role-Based Access",
                  desc: "Granular permissions for Admins, Managers, and Workers. Secure data control.",
                },
                {
                  icon: Hammer,
                  title: "Multi-Tenant",
                  desc: "Built for scalability. Whether you handle 5 projects or 500, data is isolated.",
                },
                {
                  icon: Check,
                  title: "Compliance Ready",
                  desc: "GST calculations built-in. Export data easily for accounting and audits.",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-black text-white border-2 border-black">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-800 font-medium leading-relaxed border-l-2 border-black pl-4">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section
          id="how-it-works"
          className="w-full py-24 border-b-2 border-black bg-[#FFDE59]"
        >
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
                How It Works
              </h2>
              <div className="h-2 w-24 bg-black mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              {[
                {
                  step: "01",
                  title: "Create Project",
                  desc: "Set up your project details, client info, and assign team members.",
                },
                {
                  step: "02",
                  title: "Add Measurements",
                  desc: "Input logical measurements. The system auto-calculates totals and GST.",
                },
                {
                  step: "03",
                  title: "Generate Bill",
                  desc: "Export professional PDF invoices and sheets with one click.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center relative"
                >
                  <div className="w-20 h-20 bg-white border-4 border-black flex items-center justify-center text-3xl font-black mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] z-10">
                    {item.step}
                  </div>
                  <h3 className="text-2xl font-black mb-3 uppercase">
                    {item.title}
                  </h3>
                  <p className="text-gray-900 font-bold max-w-xs border-2 border-black bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="w-full py-24 border-b-2 border-black bg-white"
        >
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
                Loved by Builders
              </h2>
              <div className="h-2 w-24 bg-black mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "MeasurePro has cut our billing time by 80%. The auto-calculations are a life saver.",
                  author: "Rajesh Kumar",
                  role: "Project Manager, RK Constructions",
                },
                {
                  quote:
                    "The PDF export feature is exactly what we needed for client submissions. Professional and fast.",
                  author: "Sarah Jenkins",
                  role: "Director, Urban Spaces",
                },
                {
                  quote:
                    "Finally a tool that understands construction measurements. No more broken Excel formulas.",
                  author: "Amit Patel",
                  role: "Civil Engineer",
                },
              ].map((t, i) => (
                <div
                  key={i}
                  className="bg-white border-2 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-5 w-5 fill-black text-black" />
                    ))}
                  </div>
                  <p className="text-lg font-bold italic mb-6 leading-relaxed">
                    "{t.quote}"
                  </p>
                  <div className="flex items-center gap-4 border-t-2 border-black pt-6">
                    <div className="h-10 w-10 bg-black text-white flex items-center justify-center font-bold border-2 border-black">
                      {t.author[0]}
                    </div>
                    <div>
                      <div className="font-black uppercase">{t.author}</div>
                      <div className="text-sm font-semibold text-gray-600">
                        {t.role}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section
          id="pricing"
          className="w-full py-24 border-b-2 border-black bg-[#f0f0f0]"
        >
          <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-5xl font-black uppercase mb-4">
                Transparent Pricing
              </h2>
              <div className="h-2 w-24 bg-black mx-auto"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
              {[
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
                  price: "₹2999",
                  sub: "per month",
                  feats: [
                    "Unlimited Projects",
                    "Dedicated Support",
                    "Custom Integration",
                    "SLA Agreement",
                  ],
                },
              ].map((plan, i) => (
                <div
                  key={i}
                  className={`flex flex-col border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${plan.popular ? "scale-105 z-10 ring-4 ring-black ring-offset-4 ring-offset-[#f0f0f0]" : ""}`}
                >
                  {plan.popular && (
                    <div className="bg-black text-white text-xs font-black px-4 py-1 text-center uppercase tracking-widest mb-4 border-2 border-black -mx-6 -mt-6">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-2xl font-black uppercase">{plan.name}</h3>
                  <p className="text-sm font-bold text-gray-600 mb-4">
                    {plan.sub}
                  </p>
                  <div className="text-5xl font-black mb-6">{plan.price}</div>

                  <ul className="space-y-4 text-sm font-bold mb-8 flex-1">
                    {plan.feats.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-black border-2 border-black p-0.5" />{" "}
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={
                      plan.name === "Enterprise" ? "/contact" : "/auth/signup"
                    }
                    className={`w-full py-4 text-center font-bold border-2 border-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] ${plan.popular ? "bg-black text-white hover:bg-white hover:text-black" : "bg-white hover:bg-black hover:text-white"}`}
                  >
                    {plan.name === "Enterprise"
                      ? "Contact Sales"
                      : "Get Started"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-24 bg-black text-white border-b-2 border-black">
          <div className="w-full max-w-4xl mx-auto px-4 md:px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">
              Ready to transform your workflow?
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center h-16 px-10 text-xl font-bold bg-white text-black border-2 border-white hover:bg-black hover:text-white transition-all shadow-[6px_6px_0px_0px_#888] active:shadow-none active:translate-x-[6px] active:translate-y-[6px]"
              >
                Start Your Free Trial
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-white">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-black text-2xl uppercase">
                <div className="bg-black text-white p-1">
                  <Ruler className="h-6 w-6" />
                </div>
                MeasurePro
              </div>
              <p className="font-bold text-sm leading-relaxed max-w-xs">
                The #1 choice for construction measurement and billing. Rugged,
                reliable, and fast.
              </p>
            </div>

            {["Product", "Company", "Resources"].map((col, i) => (
              <div key={i}>
                <h4 className="font-black mb-6 text-sm uppercase tracking-wider border-b-2 border-black inline-block pb-1">
                  {col}
                </h4>
                <ul className="space-y-3 text-sm font-bold text-gray-600">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="hover:text-black hover:underline decoration-2 underline-offset-4"
                      >
                        {col} Link {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t-2 border-black pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-gray-500">
            <p>© 2024 MeasurePro Inc. All rights reserved.</p>
            <div className="flex gap-8">
              <Link href="#" className="hover:text-black hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-black hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
