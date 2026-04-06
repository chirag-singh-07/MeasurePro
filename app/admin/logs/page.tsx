"use client";

import { ShieldCheck, Search, Filter, AlertCircle, RefreshCcw, Lock, Globe, Terminal, ShieldAlert, CheckCircle2, MoreHorizontal } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchLogs = async () => {
    try {
      const resp = await fetch(`/api/admin/logs?search=${search}`);
      const data = await resp.json();
      if (resp.ok) {
        setLogs(data.logs);
      }
    } catch (err) {
      console.error("Failed to fetch system logs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [search]);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative group overflow-hidden">
         <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Lock className="w-32 h-32 rotate-12" />
         </div>
         <div className="flex items-center gap-6 relative z-10">
            <div className="bg-[#FFDE59] p-4 text-black border-2 border-black rotate-[-2deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
               <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
               <h1 className="text-3xl font-black uppercase tracking-tighter italic">Security Log Node</h1>
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Immutable Ecosystem Transaction Audit History</p>
            </div>
         </div>
         <button onClick={fetchLogs} className="flex items-center gap-3 bg-black text-white px-8 py-4 font-black uppercase text-xs border-2 border-black hover:bg-emerald-500 hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">
            <RefreshCcw className="w-5 h-5" /> Flush Protocol Cache
         </button>
      </div>

      {/* Main Grid View */}
      <div className="bg-white border-2 border-black shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
         <div className="p-8 border-b-2 border-black bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative w-full max-w-md">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="Search log protocols..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full pl-12 pr-4 py-3 border-2 border-black font-black uppercase text-[10px] italic focus:outline-none focus:bg-[#FFDE59]/10"
               />
            </div>
            <div className="flex gap-4">
               <button className="flex items-center gap-2 px-6 py-3 border-2 border-black font-black uppercase text-[10px] italic hover:bg-gray-100"><Filter className="w-4 h-4" /> Scanner Filter</button>
               <button className="flex items-center gap-2 px-6 py-3 border-2 border-black font-black uppercase text-[10px] italic bg-black text-white hover:bg-[#FFDE59] hover:text-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Export Audit</button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-gray-100 border-b-2 border-black">
                     <th className="p-6 text-[9px] font-black uppercase tracking-[0.2em] pl-10">Timestamp Node</th>
                     <th className="p-6 text-[9px] font-black uppercase tracking-[0.2em]">Audit Event Protocol</th>
                     <th className="p-6 text-[9px] font-black uppercase tracking-[0.2em]">Source Vector (IP)</th>
                     <th className="p-6 text-[9px] font-black uppercase tracking-[0.2em]">Status</th>
                     <th className="p-6 text-[9px] font-black uppercase tracking-[0.2em] text-right pr-10">Severity Class</th>
                  </tr>
               </thead>
               <tbody className="divide-y-2 divide-gray-100">
                  {logs.length > 0 ? (
                     logs.map((log) => (
                     <tr key={log._id} className="hover:bg-gray-50 transition-colors group">
                        <td className="p-6 pl-10 font-bold text-[10px] uppercase text-gray-500 italic">{new Date(log.createdAt).toLocaleString()}</td>
                        <td className="p-6">
                           <div className="flex items-center gap-3">
                              <Terminal className="w-4 h-4 text-gray-400 group-hover:text-black transition-colors" />
                              <span className="font-black text-xs uppercase tracking-tight italic">{log.event}</span>
                           </div>
                        </td>
                        <td className="p-6">
                           <div className="flex items-center gap-2 text-[10px] font-black uppercase italic text-gray-600">
                              <Globe className="w-3.5 h-3.5" /> {log.ipAddress}
                           </div>
                        </td>
                        <td className="p-6">
                           <div className={`inline-flex items-center gap-2 px-3 py-1.5 border-2 border-black rotate-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black uppercase text-[8px] italic ${
                             log.status === 'success' ? 'bg-emerald-400' : log.status === 'blocked' ? 'bg-rose-500 text-white' : 'bg-[#FFDE59]'
                           }`}>
                              {log.status === 'success' && <CheckCircle2 className="w-3 h-3" />}
                              {log.status === 'blocked' && <ShieldAlert className="w-3 h-3" />}
                              {log.status}
                           </div>
                        </td>
                        <td className="p-6 text-right pr-10">
                           <span className={`text-[10px] font-black uppercase tracking-widest ${
                             log.severity === 'high' || log.severity === 'critical'? 'text-rose-500' : log.severity === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                           }`}>
                              {log.severity.toUpperCase()}
                           </span>
                        </td>
                     </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-10 text-center font-bold text-gray-400 uppercase text-xs">No active protocols detected.</td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>

         <div className="p-8 border-t-2 border-black bg-gray-50 flex items-center justify-between">
             <div className="flex items-center gap-4 text-[9px] font-black uppercase text-gray-400 tracking-widest italic">
                <RefreshCcw className="w-4 h-4" /> Live Protocol Stream Active
             </div>
             <div className="flex gap-4">
                <button className="w-8 h-8 flex items-center justify-center border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFDE59] transition-all"><MoreHorizontal className="w-4 h-4" /></button>
             </div>
         </div>
      </div>

      <div className="p-10 bg-black text-white border-2 border-black shadow-[10px_10px_0px_0px_rgba(255,222,89,1)]">
         <div className="flex gap-6 items-start">
            <ShieldAlert className="w-12 h-12 text-[#FFDE59] shrink-0" />
            <div className="space-y-4">
               <h4 className="text-xl font-black uppercase italic tracking-tighter text-[#FFDE59]">Core Directive Alpha</h4>
               <p className="font-bold text-[11px] leading-relaxed uppercase tracking-[0.1em] opacity-80 max-w-4xl">
                  Security log nodes are immutable and encrypted at rest. Any unauthorized attempt to flush the audit trail or modify previous entries will trigger an ecosystem-wide lockdown Protocol 00. Transaction signatures are verified via multi-level kernel nodes.
               </p>
               <div className="pt-4 flex gap-8">
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                     <span className="text-[9px] font-black uppercase text-gray-400">Encryption Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                     <span className="text-[9px] font-black uppercase text-gray-400">Nodes Synchronized</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
