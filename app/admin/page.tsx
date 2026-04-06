"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Building2, 
  FolderKanban, 
  Receipt, 
  Database, 
  ArrowUpRight,
  TrendingUp,
  Activity,
  UserPlus
} from "lucide-react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from "recharts";

const COLORS = ["#000000", "#FFDE59", "#3B82F6", "#10B981", "#F43F5E"];

export default function AdminOverview() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        const resData = await response.json();
        if (response.ok) {
          setData(resData);
        }
      } catch (err) {
        console.error("Failed to fetch superadmin stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  if (loading) {
     return (
        <div className="flex items-center justify-center min-h-[50vh]">
           <div className="bg-white border-2 border-black p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-6">
              <div className="w-16 h-16 border-4 border-black border-t-[#FFDE59] rounded-full animate-spin"></div>
              <p className="text-xl font-bold uppercase italic tracking-tighter">Syncing Core Metrics...</p>
           </div>
        </div>
     );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      {/* Platform Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-black pb-6">
         <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter italic">Global Pulse</h2>
            <div className="text-gray-500 font-bold uppercase mt-1 flex items-center gap-2 text-xs">
               <span className={`w-2.5 h-2.5 inline-block bg-green-500 border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]`} />
               Node Status: {data?.dbStatus} • Platform-Wide Control
            </div>
         </div>
         <div className="flex items-center gap-2 bg-[#FFDE59] px-4 py-1.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-[10px] uppercase">
            <TrendingUp className="w-4 h-4" /> Realtime Analytics Active
         </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {/* Total Users */}
         <div className="bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-black text-white border-2 border-black group-hover:bg-[#FFDE59] group-hover:text-black transition-colors">
                     <Users className="w-6 h-6" />
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-green-600" />
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-black">Ecosystem Users</p>
               <h3 className="text-4xl font-black italic tracking-tighter">{data?.summary?.totalUsers}</h3>
               <div className="mt-4 text-[10px] font-black bg-emerald-100 border border-black px-2 py-0.5 w-fit uppercase">
                  +12 New Logins
               </div>
            </div>
         </div>

         {/* Total Companies */}
         <div className="bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-black text-white border-2 border-black group-hover:bg-[#3B82F6] transition-colors">
                     <Building2 className="w-6 h-6" />
                  </div>
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-black">Corporate Entities</p>
               <h3 className="text-4xl font-black italic tracking-tighter">{data?.summary?.totalCompanies}</h3>
               <p className="mt-4 text-[10px] font-bold uppercase text-gray-500 italic">Active Licenses</p>
            </div>
         </div>

         {/* Total Projects */}
         <div className="bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-black text-white border-2 border-black group-hover:bg-[#10B981] transition-colors">
                     <FolderKanban className="w-6 h-6" />
                  </div>
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-black">System Projects</p>
               <h3 className="text-4xl font-black italic tracking-tighter">{data?.summary?.totalProjects}</h3>
               <p className="mt-4 text-[10px] font-bold uppercase text-gray-500 italic">Global Distribution</p>
            </div>
         </div>

         {/* Total Bills */}
         <div className="bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group relative overflow-hidden">
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-black text-white border-2 border-black group-hover:bg-[#F43F5E] transition-colors">
                     <Receipt className="w-6 h-6" />
                  </div>
               </div>
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1 group-hover:text-black">Invoices Issued</p>
               <h3 className="text-4xl font-black italic tracking-tighter">{data?.summary?.totalBills}</h3>
               <p className="mt-4 text-[10px] font-bold uppercase text-gray-500 italic uppercase">Privacy Enabled</p>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* System Load Distribution */}
         <div className="bg-white border-2 border-black p-10 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-12">
               <div>
                  <h3 className="text-2xl font-black uppercase tracking-tighter border-l-4 border-black pl-4">Resource distribution</h3>
                  <p className="text-[10px] font-black uppercase text-gray-400 mt-1 italic">Cross-Company Sync Load</p>
               </div>
            </div>

            <div className="h-[350px] w-full flex items-center justify-center relative">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie
                        data={data?.projectDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="#000"
                        strokeWidth={2}
                      >
                         {data?.projectDistribution?.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                         ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: 'none', color: '#fff' }}
                        itemStyle={{ color: '#FFDE59', textTransform: 'uppercase', fontStyle: 'italic', fontWeight: '900' }}
                      />
                   </PieChart>
                </ResponsiveContainer>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <p className="text-4xl font-black italic tracking-tighter uppercase">{data?.summary?.totalProjects}</p>
                  <p className="text-[9px] font-black uppercase bg-black text-white px-2 py-0.5">CORE SYNC</p>
                </div>
            </div>
         </div>

         {/* Recent System Activity */}
         <div className="bg-black text-white p-10 shadow-[10px_10px_0px_0px_rgba(255,222,89,1)]">
            <div className="flex items-center justify-between mb-10">
               <h3 className="text-2xl font-black uppercase tracking-tighter border-l-4 border-[#FFDE59] pl-4">Portal Onboarding</h3>
               <UserPlus className="w-6 h-6 text-[#FFDE59]" />
            </div>
            
            <div className="space-y-4">
               {data?.recentOnboarding?.map((user: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-4 border-2 border-white/20 hover:border-[#FFDE59] transition-all hover:bg-white/5">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black border-2 border-[#FFDE59] rotate-[-2deg]">
                           {user.name?.[0]}
                        </div>
                        <div>
                           <p className="font-black uppercase text-xs tracking-widest">{user.name}</p>
                           <p className="text-[9px] font-bold text-gray-500 uppercase italic">{user.companyId?.name || "Independent"} • {user.role}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-xs font-black text-[#FFDE59] italic">{new Date(user.createdAt).toLocaleDateString("en-IN", { day: '2-digit', month: 'short' })}</p>
                     </div>
                  </div>
               ))}
            </div>

            <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between opacity-50">
               <span className="text-[9px] font-black uppercase italic tracking-widest">Protocol v1.0.4 Alpha</span>
               <div className="flex items-center gap-1.5 text-[9px] font-black uppercase">
                  <div className="w-1 h-1 bg-green-500 animate-ping rounded-full" /> Live Feed
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
