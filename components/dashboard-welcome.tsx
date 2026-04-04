"use client";

import { useToast } from "@/components/ui/toast-context";
import { useEffect, useRef } from "react";

export function DashboardWelcome({ name }: { name: string }) {
  const { toast } = useToast();
  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      // Small delay to let the page load animation finish slightly
      setTimeout(() => {
        toast({
          title: `Welcome back, ${name.split(" ")[0]}!`,
          description: "Let's build something great today.",
          type: "info",
          duration: 4000,
        });
      }, 500);
      mounted.current = true;
    }
  }, [name, toast]);

  return (
    <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden group hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="relative z-10">
        <h1 className="text-5xl font-black uppercase tracking-tighter mb-2 leading-[0.9]">
          Hello,
          <br />
          {name.split(" ")[0]}.
        </h1>
        <p className="font-bold text-gray-600 border-l-4 border-black pl-4">
          Overview of your construction projects & billing.
        </p>
      </div>

      <div className="relative z-10 flex gap-4">
        <div className="bg-[#FFDE59] border-4 border-black p-4 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 hover:rotate-0 transition-transform cursor-default">
          Build
        </div>
        <div className="bg-[#98FB98] border-4 border-black p-4 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-2 hover:rotate-0 transition-transform cursor-default">
          Measure
        </div>
        <div className="bg-[#87CEEB] border-4 border-black p-4 font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-2 hover:rotate-0 transition-transform cursor-default">
          Bill
        </div>
      </div>
    </div>
  );
}
