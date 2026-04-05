"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Book,
  Code,
  Terminal,
  Zap,
  Search,
  ChevronRight,
  Clipboard,
  Info,
  Server,
  Layers,
} from "lucide-react";
import Link from "next/link";

export default function DocumentationPage() {
  const [activeSection, setActiveSection] = useState("Introduction");

  const sections = [
    {
      title: "Getting Started",
      items: ["Introduction", "Quick Start Guide", "Installation"],
    },
    {
      title: "Core Concepts",
      items: ["Measurements", "Projects", "Calculations", "Exports"],
    },
    {
      title: "API Reference",
      items: ["Authentication", "Endpoints", "Webhooks", "Rate Limits"],
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "Introduction":
        return (
          <div className="space-y-12">
            <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black uppercase mb-6 flex items-center gap-4">
                <Info size={40} className="text-blue-600" /> Introduction
              </h2>
              <p className="text-lg font-bold text-gray-800 leading-relaxed mb-8">
                Welcome to the MeasurePro documentation. MeasurePro provides a
                comprehensive suite of tools and APIs designed to automate
                construction measurement workflows, bill generation, and project
                tracking.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <button
                  onClick={() => setActiveSection("Quick Start Guide")}
                  className="border-4 border-black p-8 bg-[#FFDE59] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-left group"
                >
                  <Zap className="mb-4 text-black group-hover:scale-110 transition-transform" size={40} />
                  <h4 className="font-black uppercase mb-2 text-xl text-black">Get Started</h4>
                  <p className="font-bold text-sm text-black opacity-70">
                    Go from zero to your first measurement in 5 minutes.
                  </p>
                </button>
                <button
                  onClick={() => setActiveSection("Endpoints")}
                  className="border-4 border-black p-8 bg-[#f0f0f0] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all text-left group"
                >
                  <Terminal className="mb-4 text-black group-hover:scale-110 transition-transform" size={40} />
                  <h4 className="font-black uppercase mb-2 text-xl text-black">API Reference</h4>
                  <p className="font-bold text-sm text-black opacity-70">
                    Deep dive into our high-performance REST and GraphQL APIs.
                  </p>
                </button>
              </div>
            </div>

            <div className="border-4 border-black p-10 bg-black text-white shadow-[12px_12px_0px_0px_rgba(255,222,89,1)]">
              <h3 className="text-2xl font-black uppercase mb-4">Core Philosophy</h3>
              <p className="font-bold opacity-80 text-lg leading-relaxed border-l-4 border-[#FFDE59] pl-6">
                We believe that construction software should be as robust as the
                structures you build. Our platform is engineered for absolute
                precision, high concurrency, and seamless integration.
              </p>
            </div>
          </div>
        );
      case "Quick Start Guide":
        return (
          <div className="space-y-12">
            <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black uppercase mb-6 flex items-center gap-4">
                <Zap size={40} className="text-[#FFDE59]" /> Quick Start
              </h2>
              <div className="space-y-8">
                <div className="border-l-8 border-black pl-8 space-y-4">
                  <h4 className="text-xl font-black uppercase">1. Create an Account</h4>
                  <p className="font-bold text-gray-600">
                    Sign up at <Link href="/auth/signup" className="underline text-black font-black">measurepro.com/signup</Link> to get your organization ID.
                  </p>
                </div>
                <div className="border-l-8 border-black pl-8 space-y-4">
                  <h4 className="text-xl font-black uppercase">2. Generate an API Key</h4>
                  <p className="font-bold text-gray-600">
                    Navigate to Settings {">"} API Keys and generate a secret key for your first project.
                  </p>
                </div>
                <div className="border-l-8 border-[#FFDE59] pl-8 space-y-4 bg-gray-50 py-4">
                  <h4 className="text-xl font-black uppercase italic">Important Note</h4>
                  <p className="font-bold text-gray-800">
                    Never expose your secret keys in client-side code. Use our SDK or environment variables.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="border-4 border-black p-10 bg-black text-white shadow-[12px_12px_0px_0px_rgba(0,128,0,1)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black uppercase">Verification Request</h3>
                <Clipboard size={20} className="cursor-pointer hover:text-[#FFDE59]" />
              </div>
              <pre className="bg-[#111] p-6 border-2 border-[#333] font-mono text-sm overflow-x-auto text-green-400">
{`curl -X GET "https://api.measurepro.com/v1/auth/verify" \\
     -H "Authorization: Bearer YOUR_SECRET_KEY" \\
     -H "X-Organization-ID: ORG_123"`}
              </pre>
            </div>
          </div>
        );
      case "Endpoints":
        return (
          <div className="space-y-12">
             <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black uppercase mb-6 flex items-center gap-4">
                <Server size={40} className="text-black" /> API Endpoints
              </h2>
              <div className="space-y-6">
                <div className="p-6 border-4 border-black bg-[#f0f0f0] group">
                   <div className="flex items-center gap-4 mb-4">
                      <span className="bg-green-600 text-white px-3 py-1 font-black text-xs uppercase border-2 border-black">GET</span>
                      <code className="font-black text-lg">/v1/projects</code>
                   </div>
                   <p className="font-bold text-gray-600">List all projects within your organization with status filters.</p>
                </div>
                <div className="p-6 border-4 border-black bg-[#f0f0f0] group">
                   <div className="flex items-center gap-4 mb-4">
                      <span className="bg-blue-600 text-white px-3 py-1 font-black text-xs uppercase border-2 border-black">POST</span>
                      <code className="font-black text-lg">/v1/measurements</code>
                   </div>
                   <p className="font-bold text-gray-600">Create a new measurement entry for a specific project node.</p>
                </div>
                <div className="p-6 border-4 border-black bg-black text-white group">
                   <div className="flex items-center gap-4 mb-4">
                      <span className="bg-red-600 text-white px-3 py-1 font-black text-xs uppercase border-2 border-black">DELETE</span>
                      <code className="font-black text-lg">/v1/projects/:id</code>
                   </div>
                   <p className="font-bold opacity-70">Archive a project. Note: This action is soft-delete by default.</p>
                </div>
              </div>
            </div>
          </div>
        );
      case "Measurements":
        return (
          <div className="space-y-12">
            <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black uppercase mb-6 flex items-center gap-4">
                <Layers size={40} className="text-purple-600" /> Measurements
              </h2>
              <p className="text-lg font-bold text-gray-800 leading-relaxed mb-8">
                Measurements are the atomic units of MeasurePro. Every billable item or physical quantity is tracked as a measurement node.
              </p>
              <div className="space-y-8">
                <div className="bg-[#f0f0f0] p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  <h4 className="font-black uppercase mb-4 text-xl">Data Schema</h4>
                  <ul className="space-y-4 font-bold">
                    <li className="flex justify-between border-b-2 border-black pb-2">
                       <span>id</span>
                       <span className="italic opacity-60">UUID</span>
                    </li>
                    <li className="flex justify-between border-b-2 border-black pb-2">
                       <span>quantity</span>
                       <span className="italic opacity-60">Float</span>
                    </li>
                    <li className="flex justify-between border-b-2 border-black pb-2">
                       <span>unit</span>
                       <span className="italic opacity-60">sq.ft | cum | running_mt</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case "Installation":
        return (
          <div className="space-y-12">
            <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black uppercase mb-6 flex items-center gap-4">
                <Code size={40} className="text-green-600" /> Installation
              </h2>
              <div className="space-y-8">
                <div>
                   <h4 className="font-black uppercase mb-4">Official SDKs</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border-4 border-black bg-[#f0f0f0]">
                         <p className="font-black">Node.js</p>
                         <code className="text-sm">npm install @measurepro/sdk</code>
                      </div>
                      <div className="p-4 border-4 border-black bg-[#f0f0f0]">
                         <p className="font-black">Python</p>
                         <code className="text-sm">pip install measurepro</code>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        );
      case "Calculations":
        return (
          <div className="space-y-12">
            <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black uppercase mb-6 flex items-center gap-4">
                <Zap size={40} className="text-orange-500" /> Calculations
              </h2>
              <p className="font-bold text-gray-700 leading-relaxed mb-8">
                Our calculation engine uses a high-precision floating point system (IEEE 754) to ensure that your billings are accurate to the millimeter.
              </p>
              <div className="bg-black text-white p-8 border-4 border-black">
                <h4 className="font-black uppercase mb-4 text-[#FFDE59]">Calculation Logic</h4>
                <ul className="space-y-4 font-mono text-sm">
                   <li>Total = Σ(Quantity × Rate)</li>
                   <li>Waste = Total × (Waste_Factor / 100)</li>
                   <li>Final = Total + Waste</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case "Exports":
        return (
          <div className="space-y-12">
            <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black uppercase mb-6 flex items-center gap-4">
                <Clipboard size={40} className="text-blue-500" /> Exports
              </h2>
              <p className="font-bold text-gray-700 mb-8">
                Generate boardroom-ready reports in multiple formats.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                 {["PDF", "Excel", "JSON"].map(format => (
                   <div key={format} className="border-4 border-black p-6 text-center font-black uppercase bg-[#f0f0f0] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {format}
                   </div>
                 ))}
              </div>
            </div>
          </div>
        );
      case "Authentication":
        return (
          <div className="space-y-12">
            <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black uppercase mb-6 flex items-center gap-4">
                <Server size={40} className="text-red-600" /> Authentication
              </h2>
              <p className="font-bold text-gray-700 mb-8">
                All API requests must be authenticated using a Bearer Token in the Authorization header.
              </p>
              <div className="bg-gray-50 border-l-8 border-black p-6 font-mono text-sm overflow-x-auto">
                 Authorization: Bearer mpro_live_83kdj2...
              </div>
            </div>
          </div>
        );
      case "Webhooks":
        return (
          <div className="space-y-12">
            <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black uppercase mb-6 flex items-center gap-4">
                <Zap size={40} className="text-yellow-600" /> Webhooks
              </h2>
              <p className="font-bold text-gray-700 mb-6">
                Subscribe to real-time events like <code className="bg-gray-200 px-2">measurement.created</code> or <code className="bg-gray-200 px-2">project.completed</code>.
              </p>
            </div>
          </div>
        );
      case "Rate Limits":
        return (
          <div className="space-y-12">
            <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
              <h2 className="text-4xl font-black uppercase mb-6 flex items-center gap-4">
                <Terminal size={40} className="text-gray-600" /> Rate Limits
              </h2>
              <div className="p-6 border-4 border-black bg-[#FFDE59]">
                 <p className="font-black text-2xl uppercase">1,000 requests / minute</p>
                 <p className="font-bold mt-2">Standard tier limit for all organizations.</p>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="border-4 border-black p-10 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-4xl font-black uppercase mb-6">Coming Soon</h2>
            <p className="text-lg font-bold text-gray-800">
              This section of the documentation is currently being refined to ensure maximum precision.
            </p>
          </div>
        );
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <header className="bg-black text-white py-24 border-b-4 border-black">
          <div className="max-w-7xl mx-auto px-4 md:px-6">
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">
              Documentation
            </h1>
            <p className="text-xl md:text-2xl font-bold border-l-4 border-[#FFDE59] pl-6 max-w-3xl">
              Everything you need to build and scale with MeasurePro.
            </p>
          </div>
        </header>

        <section className="py-20 max-w-7xl mx-auto px-4 md:px-6 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Sidebar */}
            <aside className="lg:col-span-3 space-y-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="w-full px-4 py-4 border-4 border-black font-bold focus:bg-[#FFDE59] focus:outline-none placeholder:text-gray-400 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black"
                />
                <Search
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
                  size={24}
                />
              </div>

              <div className="space-y-10">
                {sections.map((section, i) => (
                  <div key={i}>
                    <h3 className="font-black uppercase text-sm tracking-widest mb-6 border-b-4 border-black pb-1 text-black">
                      {section.title}
                    </h3>
                    <ul className="space-y-2 text-black">
                      {section.items.map((item, j) => (
                        <li key={j}>
                          <button
                            onClick={() => setActiveSection(item)}
                            className={`w-full text-left font-black py-2 px-4 border-2 border-transparent transition-all flex items-center justify-between group ${
                              activeSection === item
                                ? "bg-black text-white border-black shadow-[4px_4px_0px_0px_rgba(255,222,89,1)]"
                                : "hover:border-black hover:bg-gray-50"
                            }`}
                          >
                            <span className="uppercase text-sm tracking-tight">{item}</span>
                            <ChevronRight
                              size={16}
                              className={
                                activeSection === item
                                  ? "text-[#FFDE59]"
                                  : "opacity-0 group-hover:opacity-100"
                              }
                            />
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </aside>

            {/* Content Area */}
            <div className="lg:col-span-9">
              {renderContent()}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

