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
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black font-sans selection:bg-black selection:text-white">
      <Navbar />

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
                    &quot;{t.quote}&quot;
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

        {/* Dashboard Preview Section */}
        <section className="w-full py-24 bg-white border-b-4 border-black relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2 space-y-8">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
                  A Dashboard Built <br /> for <span className="bg-[#FFDE59] px-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black">Builders</span>
                </h2>
                <ul className="space-y-6">
                  {[
                    "Real-time cost tracking and budgeting",
                    "Automated GST and tax calculations",
                    "One-click multi-project reporting",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-xl font-bold italic">
                      <div className="h-4 w-4 bg-black rotate-45 border-2 border-black"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="lg:w-1/2 relative">
                {/* Simulated Dashboard UI */}
                <div className="border-4 border-black bg-white p-6 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] group hover:shadow-none hover:translate-x-4 hover:translate-y-4 transition-all">
                  <div className="flex items-center justify-between mb-8 pb-4 border-b-4 border-black">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 border-2 border-black"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 border-2 border-black"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 border-2 border-black"></div>
                     </div>
                     <span className="font-black text-xs uppercase tracking-widest opacity-50">PRO DASHBOARD V2</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="border-4 border-black p-4 bg-[#FFDE59]">
                        <p className="text-xs font-black uppercase opacity-60">Total Revenue</p>
                        <p className="text-2xl font-black italic">₹12.4M</p>
                     </div>
                     <div className="border-4 border-black p-4 bg-black text-white">
                        <p className="text-xs font-black uppercase opacity-60">Accuracy</p>
                        <p className="text-2xl font-black italic">99.98%</p>
                     </div>
                  </div>
                  <div className="space-y-4">
                     {[1, 2, 3].map(i => (
                       <div key={i} className="h-12 w-full border-2 border-black bg-[#f0f0f0] flex items-center justify-between px-4">
                          <div className="flex gap-4">
                            <div className="w-8 h-4 bg-black"></div>
                            <div className="w-16 h-4 bg-gray-300"></div>
                          </div>
                          <div className="w-12 h-4 bg-green-400"></div>
                       </div>
                     ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Section */}
        <section className="w-full py-24 bg-[#f0f0f0] border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-4 border-black shadow-[16px_16px_0px_0px_rgba(255,222,89,1)]">
                <div className="p-12 border-b-4 md:border-b-0 md:border-r-4 border-black space-y-8 bg-white opacity-60">
                   <h3 className="text-3xl font-black uppercase text-gray-400">The Old Path</h3>
                   <ul className="space-y-6 font-bold text-gray-500 italic">
                      <li>⚠️ Broken Excel Formulas</li>
                      <li>⚠️ Lost Paper Receipts</li>
                      <li>⚠️ Billing Errors & Disputes</li>
                      <li>⚠️ Manual Data Entry (Hours)</li>
                   </ul>
                </div>
                <div className="p-12 space-y-8 bg-white">
                   <h3 className="text-3xl font-black uppercase text-black">The MeasurePro Way</h3>
                   <ul className="space-y-6 font-bold text-black border-l-4 border-[#FFDE59] pl-6">
                      <li>🚀 Guaranteed Math Accuracy</li>
                      <li>🚀 Cloud-Based Source of Truth</li>
                      <li>🚀 Professional Instant PDFs</li>
                      <li>🚀 Automated Sync (Seconds)</li>
                   </ul>
                </div>
             </div>
          </div>
        </section>

        {/* Integration Ecosystem */}
        <section className="w-full py-24 bg-white border-b-4 border-black relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="text-center mb-16">
                 <h2 className="text-5xl font-black uppercase tracking-tight">Sync With Your Stack</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                 {["Slack", "Excel", "Zapier", "Tally", "ERP.io", "Notion"].map((tool, i) => (
                   <div key={i} className="group border-4 border-black p-8 bg-[#f0f0f0] hover:bg-black hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2 flex items-center justify-center font-black uppercase text-xl">
                      {tool}
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Global Statistics Section */}
        <section className="w-full py-24 bg-black text-white border-b-4 border-black">
           <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
                 {[
                   { label: "Measurements Tracked", value: "12M+" },
                   { label: "Total Projects", value: "50,000+" },
                   { label: "Math Errors Prevented", value: "∞" },
                   { label: "System Uptime", value: "99.99%" }
                 ].map((stat, i) => (
                   <div key={i} className="space-y-4">
                      <p className="text-6xl font-black italic text-[#FFDE59] tracking-tighter">{stat.value}</p>
                      <p className="text-sm font-black uppercase tracking-widest opacity-60">{stat.label}</p>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Security & Trust Section */}
        <section className="w-full py-24 bg-white border-b-4 border-black">
           <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                 <div className="lg:w-1/2">
                    <h2 className="text-5xl font-black uppercase leading-none mb-8">
                       Enterprise <br /> <span className="bg-black text-white px-4">Grade Security</span>
                    </h2>
                    <p className="text-xl font-bold text-gray-800 leading-relaxed border-l-8 border-black pl-8">
                       Your project data is protected by the same encryption standards used by global financial institutions. 256-bit AES at rest and TLS 1.3 in transit.
                    </p>
                 </div>
                 <div className="lg:w-1/2 grid grid-cols-2 gap-8 w-full">
                    {[
                      "SSO Enabled",
                      "SOC2 Type II",
                      "GDPR Compliant",
                      "ISO 27001"
                    ].map((badge, i) => (
                      <div key={i} className="border-4 border-black p-8 bg-[#f0f0f0] text-center font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all cursor-default">
                         {badge}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Mobile On-Site Section */}
        <section className="w-full py-24 bg-[#FFDE59] border-b-4 border-black relative overflow-hidden">
           <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex flex-col lg:flex-row items-center gap-16">
                 <div className="lg:w-1/2 relative space-y-8 order-2 lg:order-1">
                    <div className="border-8 border-black rounded-[40px] bg-black p-4 w-[300px] h-[600px] mx-auto shadow-[12px_12px_0px_0px_rgba(255,255,255,1)]">
                       <div className="bg-white rounded-[32px] h-full w-full p-6 flex flex-col items-center justify-center space-y-8">
                          <div className="w-12 h-2 bg-gray-200 rounded-full mb-8"></div>
                          <div className="h-4 w-32 bg-black"></div>
                          <div className="h-4 w-40 bg-gray-100"></div>
                          <div className="grid grid-cols-2 gap-4 w-full pt-8">
                             <div className="h-16 border-4 border-black bg-[#f0f0f0]"></div>
                             <div className="h-16 border-4 border-black bg-[#FFDE59]"></div>
                             <div className="h-16 border-4 border-black bg-black"></div>
                             <div className="h-16 border-4 border-black bg-[#f0f0f0]"></div>
                          </div>
                          <div className="mt-auto h-2 w-24 bg-gray-200 rounded-full"></div>
                       </div>
                    </div>
                 </div>
                 <div className="lg:w-1/2 space-y-8 order-1 lg:order-2">
                    <h2 className="text-5xl md:text-7xl font-black uppercase leading-none text-black">
                       Built for <br /> <span className="underline">On-Site</span> Action
                    </h2>
                    <p className="text-xl font-bold text-black opacity-80 leading-relaxed border-l-8 border-black pl-8">
                       Stop carrying bulky laptops to the field. MeasurePro is fully responsive and optimized for touch, making on-site measurements and validation faster than ever.
                    </p>
                 </div>
              </div>
           </div>
        </section>

        {/* Developer API Preview */}
        <section className="w-full py-24 bg-white border-b-4 border-black">
           <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div className="space-y-8">
                    <h2 className="text-5xl font-black uppercase">Developer Focused</h2>
                    <p className="text-xl font-bold text-gray-700 leading-relaxed border-l-8 border-[#FFDE59] pl-8 italic">
                       Extend MeasurePro with our powerful REST API. Seamlessly sync project data into your custom ERPs, BI tools, or internal dashboards.
                    </p>
                    <Link href="/docs" className="inline-block bg-black text-white px-8 py-4 font-black uppercase border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFDE59] hover:text-black hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                       Read API Documentation
                    </Link>
                 </div>
                 <div className="bg-[#111] p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-x-auto text-green-400 font-mono text-sm leading-relaxed">
                    <div className="flex gap-2 mb-4 border-b-2 border-[#333] pb-4">
                       <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                       <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
                       <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                    </div>
{`// POST /v1/measurements
{
  "project_id": "PRJ-902",
  "data": {
    "length": 15.4,
    "breadth": 22.1,
    "unit": "ft"
  },
  "tags": ["foundation", "block-a"]
}`}
                 </div>
              </div>
           </div>
        </section>

        {/* Eco-Impact Section */}
        <section className="w-full py-24 bg-black text-white border-b-4 border-black">
           <div className="max-w-7xl mx-auto px-4 md:px-6 text-center space-y-8">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">
                 Save Trees, <br /> Not Just <span className="text-[#FFDE59]">Money</span>
              </h2>
              <p className="text-xl font-bold max-w-2xl mx-auto opacity-70">
                 Digital billing isn't just faster; it's sustainable. By eliminating paper measurement sheets, our users have saved over <span className="text-green-400">4,200 metric tonnes</span> of paper waste this year alone.
              </p>
              <div className="flex items-center justify-center gap-12 pt-8 flex-wrap">
                 {[
                   { label: "Water Saved", val: "1.2M Gallons" },
                   { label: "Paperless Sheets", val: "450k+" },
                   { label: "Carbon Offset", val: "12,000kg" }
                 ].map((stat, i) => (
                    <div key={i} className="border-2 border-[#333] p-6 bg-[#0a0a0a]">
                       <p className="text-2xl font-black italic text-green-400 uppercase tracking-tighter mb-2">{stat.val}</p>
                       <p className="text-xs font-black opacity-50 uppercase tracking-widest">{stat.label}</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Shipping Logbook */}
        <section className="w-full py-24 bg-white border-b-4 border-black">
           <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
                 <div className="lg:w-1/3">
                    <h2 className="text-5xl font-black uppercase leading-none mb-8">Always <br /> Shipping</h2>
                    <p className="text-lg font-bold text-gray-800 leading-relaxed italic border-l-4 border-black pl-6">
                       We're obsessed with your workflow. New improvements, performance patches, and features are deployed every single Tuesday.
                    </p>
                 </div>
                 <div className="lg:w-2/3 space-y-6 w-full">
                    {[
                      { date: "Yesterday", change: "Added Bulk CSV Upload for larger projects", tag: "NEW" },
                      { date: "Last Week", change: "Improved AI estimation accuracy by 14%", tag: "OPTIMIZATION" },
                      { date: "2 Weeks Ago", change: "New role-based permissions for enterprise users", tag: "SECURITY" }
                    ].map((item, i) => (
                       <div key={i} className="border-4 border-black p-6 bg-[#f0f0f0] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
                          <div>
                             <p className="text-xs font-black uppercase opacity-50 mb-1">{item.date}</p>
                             <h4 className="font-bold text-lg">{item.change}</h4>
                          </div>
                          <span className="bg-black text-white text-[10px] font-black px-2 py-1 uppercase">{item.tag}</span>
                       </div>
                    ))}
                 </div>
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
      <Footer />
    </div>
  );
}
