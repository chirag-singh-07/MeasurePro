"use client";

import { Server, Globe, Database, Network, HardDrive, Cpu, Terminal, Zap, ShieldCheck, Layers } from "lucide-react";

export default function AdminInfraPage() {
  const regions = [
    { name: "US-EAST-01", status: "Operational", load: "12%", latency: "12ms", icon: Globe },
    { name: "EU-CENT-01", status: "Operational", load: "45%", latency: "148ms", icon: Globe },
    { name: "AP-SOUTH-01", status: "Degraded", load: "89%", latency: "342ms", icon: Globe },
    { name: "BR-SA-01", status: "Idle", load: "4%", latency: "210ms", icon: Globe },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white border-2 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Layers className="w-32 h-32 rotate-12" />
         </div>
         <div className="flex items-center gap-8 relative z-10">
            <div className="bg-black p-5 text-[#FFDE59] border-2 border-black rotate-[-3deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
               <Server className="w-10 h-10" />
            </div>
            <div>
               <h1 className="text-4xl font-black uppercase tracking-tighter italic">Infra Node</h1>
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Multi-Regional Kernel Infrastructure Management</p>
            </div>
         </div>
         <div className="flex gap-4 relative z-10">
            <div className="bg-emerald-50 border-2 border-black px-8 py-3 flex flex-col justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
               <p className="text-[9px] font-black uppercase text-gray-400 tracking-widest">Active Clusters</p>
               <p className="text-2xl font-black italic tracking-tighter">14 Nodes</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
         {/* Regional Distribution */}
         <div className="bg-white border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <div className="p-8 border-b-2 border-black bg-gray-50 flex items-center justify-between">
               <h3 className="font-black uppercase italic tracking-tighter text-sm flex items-center gap-3">
                  <Globe className="w-5 h-5" /> Global Regional Topology
               </h3>
               <button className="text-[9px] font-black uppercase bg-black text-[#FFDE59] px-4 py-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFDE59] hover:text-black transition-all">
                  Re-initialize Mesh
               </button>
            </div>
            <div className="p-0">
               {regions.map((reg, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-8 border-b-2 border-gray-50 last:border-0 hover:bg-gray-50 group transition-colors">
                     <div className="flex items-center gap-6 mb-4 md:mb-0">
                        <div className="p-3 bg-white border-2 border-black group-hover:bg-black group-hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                           <reg.icon className="w-5 h-5" />
                        </div>
                        <div>
                           <h4 className="font-black uppercase italic tracking-tighter text-sm">{reg.name}</h4>
                           <span className={`text-[9px] font-black uppercase tracking-widest ${reg.status === 'Operational' ? 'text-emerald-500' : 'text-rose-500'}`}>{reg.status}</span>
                        </div>
                     </div>
                     <div className="flex gap-12 items-center w-full md:w-auto justify-between md:justify-end">
                        <div className="text-right">
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Throughput</p>
                           <p className="text-lg font-black italic tracking-tighter">{reg.load}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1 italic">Latent Link</p>
                           <p className="text-lg font-black italic tracking-tighter">{reg.latency}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Resources / DB Status */}
         <div className="space-y-10">
            <div className="bg-black text-white border-2 border-black shadow-[10px_10px_0px_0px_rgba(255,222,89,1)] p-10">
               <div className="flex items-center gap-4 mb-10">
                  <Database className="w-8 h-8 text-[#FFDE59]" />
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter text-[#FFDE59]">Kernel Database Node</h3>
               </div>
               <div className="space-y-8">
                  <div className="flex justify-between items-center bg-gray-900 border-2 border-gray-800 p-6">
                     <div>
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#FFDE59] italic mb-1">Mongoose Protocol</p>
                        <p className="text-xl font-black tracking-tight italic uppercase">Production Cluster</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Status</p>
                        <p className="text-emerald-400 font-black uppercase text-xs italic tracking-widest">Master-Active</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="p-6 bg-gray-900 border-2 border-gray-800 flex flex-col items-center">
                        <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest mb-2">Memory Node</p>
                        <p className="text-2xl font-black italic tracking-tighter">4.2 GB</p>
                     </div>
                     <div className="p-6 bg-gray-900 border-2 border-gray-800 flex flex-col items-center">
                        <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest mb-2">Storage Node</p>
                        <p className="text-2xl font-black italic tracking-tighter">18.4 TB</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Hardware Diagnostic */}
            <div className="bg-white border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] p-10">
               <h3 className="text-lg font-black uppercase italic tracking-tighter mb-8 flex items-center gap-3">
                  <HardDrive className="w-5 h-5" /> Hardware Diagnostic Node
               </h3>
               <div className="space-y-6">
                  {[
                    { label: "Core Processing Load", val: 84, color: "bg-amber-500" },
                    { label: "System Kernel Cache", val: 32, color: "bg-emerald-500" },
                    { label: "Virtual Protocol Units", val: 92, color: "bg-rose-500" },
                  ].map((sys, i) => (
                    <div key={i} className="space-y-2">
                       <div className="flex justify-between text-[9px] font-black uppercase tracking-widest italic">
                          <span>{sys.label}</span>
                          <span>{sys.val}%</span>
                       </div>
                       <div className="w-full bg-gray-50 border-2 border-black h-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                          <div className={`h-full border-r-2 border-black ${sys.color}`} style={{ width: `${sys.val}%` }}></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
