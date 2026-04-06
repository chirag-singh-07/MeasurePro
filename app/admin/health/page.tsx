"use client";

import { Activity, Server, Database, Cpu, Zap, ShieldCheck, Heart, AlertTriangle, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function AdminHealthPage() {
  const [metrics, setMetrics] = useState({
    cpu: 12,
    ram: 45,
    disk: 28,
    latency: 14,
    uptime: "99.99%"
  });

  // Mock real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        cpu: Math.floor(Math.random() * 5) + 10,
        latency: Math.floor(Math.random() * 8) + 12
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { name: "CPU Utilization", value: `${metrics.cpu}%`, icon: Cpu, color: "text-blue-500" },
    { name: "RAM Protocol", value: `${metrics.ram}%`, icon: Database, color: "text-purple-500" },
    { name: "Disk Space", value: `${metrics.disk}%`, icon: Server, color: "text-emerald-500" },
    { name: "Global Latency", value: `${metrics.latency}ms`, icon: Zap, color: "text-amber-500" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-8 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
         <div className="flex items-center gap-6">
            <div className="bg-[#FFDE59] p-4 text-black border-2 border-black rotate-[-2deg]">
               <Activity className="w-8 h-8" />
            </div>
            <div>
               <h2 className="text-3xl font-black uppercase tracking-tighter italic">System Health Node</h2>
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Real-time Core Infrastructure Diagnostics</p>
            </div>
         </div>
         <div className="flex items-center gap-4 bg-black text-white px-6 py-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Heart className="w-5 h-5 text-rose-500 animate-pulse" />
            <span className="text-xs font-black uppercase tracking-widest italic">Core Status: Stable</span>
         </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
         {stats.map((stat, idx) => (
            <div key={idx} className="bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all group">
               <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 bg-gray-50 border-2 border-black group-hover:bg-black group-hover:text-white transition-all`}>
                     <stat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic">Metric node</span>
               </div>
               <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-1">{stat.name}</h3>
               <p className="text-4xl font-black italic tracking-tighter">{stat.value}</p>
            </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Active Processes */}
         <div className="lg:col-span-2 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="p-6 border-b-2 border-black bg-gray-50 flex justify-between items-center">
               <h3 className="font-black uppercase italic tracking-tighter text-sm flex items-center gap-2">
                  <Server className="w-4 h-4" /> Active Protocol Threads
               </h3>
               <span className="text-[9px] font-black uppercase bg-emerald-100 text-emerald-700 px-3 py-1 border border-black">84 Active</span>
            </div>
            <div className="p-0">
               {[
                 { name: "Auth Protocol Alpha", load: 12, status: "stable" },
                 { name: "Database Sync Node", load: 24, status: "syncing" },
                 { name: "API Gateway Core", load: 8, status: "idle" },
                 { name: "Image Processing Bot", load: 0, status: "stopped" },
                 { name: "Billing Engine Beta", load: 45, status: "high-load" },
               ].map((proc, i) => (
                 <div key={i} className="flex items-center justify-between p-6 border-b-2 border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                       <div className={`w-2 h-2 rounded-full ${proc.status === 'stable' ? 'bg-emerald-500' : proc.status === 'high-load' ? 'bg-amber-500 animate-pulse' : 'bg-gray-300'}`}></div>
                       <p className="font-black text-xs uppercase tracking-tight italic">{proc.name}</p>
                    </div>
                    <div className="flex items-center gap-10">
                       <div className="w-32 bg-gray-100 h-2 border border-black overflow-hidden hidden md:block">
                          <div className="bg-black h-full" style={{ width: `${proc.load}%` }}></div>
                       </div>
                       <span className="text-[10px] font-black uppercase text-gray-400 w-12 text-right">{proc.load}%</span>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         {/* Alerts / Security Notifications */}
         <div className="bg-black text-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(255,222,89,1)] p-8">
            <div className="flex items-center gap-3 mb-8">
               <ShieldCheck className="w-8 h-8 text-[#FFDE59]" />
               <h3 className="text-xl font-black uppercase italic tracking-tighter text-[#FFDE59]">Security Vector</h3>
            </div>
            <div className="space-y-6">
               <div className="flex gap-4 group">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                     <p className="text-[9px] font-black uppercase tracking-widest text-[#FFDE59] mb-1">Warning: Node 04</p>
                     <p className="text-[11px] font-bold leading-relaxed opacity-80 uppercase italic text-gray-300">Unauthorized SSH attempt blocked from IP: 192.168.1.1. Vector isolated.</p>
                  </div>
               </div>
               <div className="flex gap-4 group">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div>
                     <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mb-1">Patch Deployed</p>
                     <p className="text-[11px] font-bold leading-relaxed opacity-80 uppercase italic text-gray-300">Auth module kernel updated successfully. All nodes synchronized to V2.4.</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
