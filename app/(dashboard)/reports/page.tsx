"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from "recharts";
import Link from "next/link";
import { 
  TrendingUp, 
  Users, 
  FolderKanban, 
  FileText, 
  IndianRupee, 
  PieChart as PieIcon, 
  ArrowUpRight,
  Trophy,
  ArrowRight,
  MapPin
} from "lucide-react";

const COLORS = ["#000000", "#FFDE59", "#87CEEB", "#98FB98", "#FF6B6B"];

export default function ReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("Last 6 months");

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/reports/stats?range=${encodeURIComponent(timeRange)}`);
      const resData = await response.json();
      if (response.ok) {
        setData(resData);
      }
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
         <div className="bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse">
            <h2 className="text-2xl font-black uppercase">Analyzing Data...</h2>
         </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Header */}
      <div>
        <h1 className="text-5xl font-black uppercase tracking-tighter">Business Intelligence</h1>
        <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4" /> Live Performance Analytics & Growth Tracking
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFDE59] transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-black text-white p-3 border-2 border-black group-hover:bg-white group-hover:text-black">
               <IndianRupee className="w-6 h-6" />
            </div>
            <ArrowUpRight className="text-green-600 w-6 h-6" />
          </div>
          <p className="text-xs font-black uppercase text-gray-500 group-hover:text-black">Total Revenue</p>
          <h3 className="text-3xl font-black mt-1 tracking-tight">₹{data?.summary?.totalRevenueValue.toLocaleString("en-IN")}</h3>
        </div>

        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#87CEEB] transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-black text-white p-3 border-2 border-black group-hover:bg-white group-hover:text-black">
               <FolderKanban className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 border-2 border-black group-hover:bg-white group-hover:text-black">ACTIVE</span>
          </div>
          <p className="text-xs font-black uppercase text-gray-500 group-hover:text-black">Projects</p>
          <h3 className="text-3xl font-black mt-1 tracking-tight">{data?.summary?.totalProjects} UNITS</h3>
        </div>

        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#98FB98] transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-black text-white p-3 border-2 border-black group-hover:bg-white group-hover:text-black">
               <FileText className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase bg-black text-white px-2 py-0.5 border-2 border-black group-hover:bg-white group-hover:text-black">BILLS</span>
          </div>
          <p className="text-xs font-black uppercase text-gray-500 group-hover:text-black">Invoices Issued</p>
          <h3 className="text-3xl font-black mt-1 tracking-tight">{data?.summary?.totalBills} RECORDS</h3>
        </div>

        <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-black group transition-all">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-[#FFDE59] text-black p-3 border-2 border-black">
               <Users className="w-6 h-6" />
            </div>
            <span className="bg-[#FF6B6B] text-white text-[10px] font-black px-2 py-1 border-2 border-black">VIP</span>
          </div>
          <p className="text-xs font-black uppercase text-gray-400 group-hover:text-gray-300">Market Reach</p>
          <h3 className="text-3xl font-black mt-1 tracking-tight text-black group-hover:text-white uppercase">{data?.topClients?.[0]?.name?.split(" ")[0] || "Global"}</h3>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {/* Premium Area Chart Section */}
         <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] lg:col-span-2 overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 gap-4">
               <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter border-l-8 border-black pl-4">Revenue Trends</h3>
                  <p className="text-xs font-bold text-gray-400 mt-1 uppercase">Visualizing your earnings through the {timeRange}</p>
               </div>
               
               <div className="flex bg-gray-100 border-2 border-black p-1">
                  {["Last 6 months", "Last 3 months", "Last 30 days", "Last 7 days"].map(range => (
                     <button 
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-4 py-2 text-[10px] font-black uppercase transition-all ${timeRange === range ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(255,222,89,1)]' : 'hover:bg-white text-gray-500'}`}
                     >
                        {range}
                     </button>
                  ))}
               </div>
            </div>

            <div className="h-[450px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data?.monthlyRevenue} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                     <defs>
                        <linearGradient id="colorRevenueHighlight" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#000" stopOpacity={0.8}/>
                           <stop offset="95%" stopColor="#FFDE59" stopOpacity={0.1}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                     <XAxis 
                        dataKey="name" 
                        stroke="#000" 
                        fontSize={12} 
                        fontWeight="bold"
                        tickLine={false} 
                        axisLine={false} 
                        tick={{ dy: 10 }}
                     />
                     <YAxis 
                        stroke="#000" 
                        fontSize={12} 
                        fontWeight="bold"
                        tickLine={false} 
                        axisLine={false} 
                        tickFormatter={(value) => `₹${value >= 1000 ? (value/1000).toFixed(0) + 'k' : value}`}
                     />
                     <Tooltip 
                        content={({ active, payload, label }) => {
                           if (active && payload && payload.length) {
                              return (
                                 <div className="bg-black text-white p-4 border-2 border-white shadow-[4px_4px_0px_0px_rgba(255,222,89,1)]">
                                    <p className="text-[10px] font-black text-gray-400 uppercase mb-2">{label}</p>
                                    <div className="flex items-center justify-between gap-8">
                                       <div className="flex items-center gap-2">
                                          <div className="w-2 h-2 bg-[#FFDE59]"></div>
                                          <span className="text-xs font-black uppercase tracking-widest text-[#FFDE59]">Monthly Revenue</span>
                                       </div>
                                       <span className="text-sm font-black">₹{payload[0].value?.toLocaleString("en-IN")}</span>
                                    </div>
                                 </div>
                              );
                           }
                           return null;
                        }}
                     />
                     <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#000" 
                        strokeWidth={6}
                        fillOpacity={1} 
                        fill="url(#colorRevenueHighlight)" 
                        activeDot={{ r: 10, fill: '#000', stroke: '#FFDE59', strokeWidth: 4 }}
                        animationDuration={2000}
                     />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>

         {/* Premium Operational Status Donut */}
         <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(255,222,89,1)] transition-all flex flex-col items-center">
            <div className="flex items-center justify-between mb-8 w-full">
               <h3 className="text-2xl font-black uppercase tracking-tighter border-l-8 border-black pl-4">Operational Status</h3>
               <div className="bg-black text-white p-2 border-2 border-black">
                  <PieIcon className="w-5 h-5 font-black" />
               </div>
            </div>

            <div className="relative h-[300px] w-full flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={data?.projectDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={8}
                        dataKey="value"
                        stroke="#000"
                        strokeWidth={4}
                     >
                        {data?.projectDistribution?.map((entry: any, index: number) => (
                           <Cell 
                             key={`cell-${index}`} 
                             fill={entry.name === 'Active' ? '#FFDE59' : entry.name === 'Completed' ? '#a3e635' : '#e5e7eb'} 
                           />
                        ))}
                     </Pie>
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#000', border: 'none', color: '#fff' }}
                        itemStyle={{ color: '#FFDE59', textTransform: 'uppercase', fontWeight: 'bold' }}
                     />
                  </PieChart>
               </ResponsiveContainer>
               
               {/* Center Total Display */}
               <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-[10px] font-black uppercase text-gray-400">Total Throughput</span>
                  <span className="text-5xl font-black tracking-tighter">{data?.summary?.totalProjects}</span>
                  <span className="text-[10px] font-black uppercase text-gray-400">Projects</span>
               </div>
            </div>

            {/* Status Breakdown Indicators */}
            <div className="grid grid-cols-3 gap-4 w-full mt-6">
               {data?.projectDistribution?.map((status: any, index: number) => (
                  <div key={index} className="bg-gray-50 border-2 border-black p-3 hover:bg-white hover:translate-y-[-2px] transition-all">
                     <p className="text-[9px] font-black uppercase text-gray-400 mb-1">{status.name}</p>
                     <div className="flex items-center justify-between">
                        <span className="text-xl font-black">{status.value}</span>
                        <div className={`w-3 h-3 border-2 border-black ${status.name === 'Active' ? 'bg-[#FFDE59]' : status.name === 'Completed' ? 'bg-[#a3e635]' : 'bg-gray-300'}`}></div>
                     </div>
                  </div>
               ))}
            </div>
         </div>

         {/* Premium Top Client Leaderboard */}
         <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(152,251,152,1)] transition-all hover:bg-gray-50/50 group">
            <div className="flex items-center justify-between mb-10">
               <div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter border-l-8 border-black pl-4">Top Client Leaderboard</h3>
                  <p className="text-xs font-bold text-gray-400 mt-1 uppercase">Ranking your most valuable business partnerships</p>
               </div>
               <div className="bg-black text-white p-3 border-2 border-black group-hover:bg-[#FFDE59] group-hover:text-black transition-colors">
                  <Users className="w-6 h-6" />
               </div>
            </div>

            <div className="space-y-6">
               {data?.topClients?.map((client: any, index: number) => (
                  <div key={index} className="space-y-2 animate-in slide-in-from-left duration-500" style={{ animationDelay: `${index * 150}ms` }}>
                     <div className="flex justify-between items-end">
                        <div className="flex items-center gap-3">
                           <div className={`w-10 h-10 flex items-center justify-center font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${index === 0 ? 'bg-[#FFDE59]' : index === 1 ? 'bg-[#87CEEB]' : 'bg-[#98FB98]'}`}>
                              {index === 0 ? <Trophy className="w-5 h-5" /> : index + 1}
                           </div>
                           <span className="font-black uppercase text-sm group-hover:text-black transition-colors flex items-center gap-2">
                              {client.name}
                              {index === 0 && <span className="text-[10px] bg-black text-white px-2 py-0.5 rounded-full">ELITE CLIENT</span>}
                           </span>
                        </div>
                        <span className="font-black text-xs text-gray-500 uppercase">
                           TOTAL BILLING: <span className="text-black">₹{client.revenue.toLocaleString("en-IN")}</span>
                        </span>
                     </div>
                     
                     <div className="h-10 w-full bg-gray-100 border-2 border-black relative overflow-hidden group/bar transition-all hover:translate-x-1">
                        <div 
                           className={`h-full border-r-2 border-black transition-all duration-1000 ease-out flex items-center justify-end pr-4 ${index === 0 ? 'bg-gradient-to-r from-[#FFDE59] to-[#FF6B6B]' : index === 1 ? 'bg-gradient-to-r from-[#87CEEB] to-[#0a84ff]' : 'bg-gradient-to-r from-[#98FB98] to-[#00af87]'}`}
                           style={{ width: `${(client.revenue / data.topClients[0].revenue) * 100}%` }}
                        >
                           <span className="text-[10px] font-black text-black/50 group-hover/bar:text-black transition-colors">
                              {((client.revenue / data?.summary?.totalRevenueValue) * 100).toFixed(1)}% OF TOTAL
                           </span>
                        </div>
                     </div>
                  </div>
               ))}

               {/* Empty state within section */}
               {!data?.topClients?.length && (
                  <div className="py-20 text-center border-4 border-dashed border-black/10">
                     <Users className="w-12 h-12 mx-auto mb-4 text-gray-200" />
                     <p className="font-black text-gray-300 uppercase">Awaiting Client Data</p>
                  </div>
               )}
            </div>

            <div className="mt-10 pt-6 border-t-2 border-black flex justify-between items-center bg-gray-50 p-4">
               <div className="text-xs font-black uppercase text-gray-400">Target Milestone</div>
               <div className="text-sm font-black uppercase">₹{(data?.topClients?.[0]?.revenue * 1.5 || 0).toLocaleString("en-IN")} GROWTH PROJECTION</div>
            </div>
         </div>
      </div>

      {/* Strategic Insights & Productivity Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
         <div className="bg-black text-white p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(255,222,89,1)] flex flex-col justify-between">
            <div>
               <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-[#FFDE59]">Productivity Index</h3>
               <p className="text-gray-400 font-bold text-xs uppercase mb-10">Average project revenue per successful export</p>
            </div>
            <div>
               <p className="text-5xl font-black tracking-tighter">₹{data?.summary?.averageBillValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
               <div className="flex items-center gap-2 mt-2 text-[#98FB98]">
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase">Exceeding Market Average</span>
               </div>
            </div>
         </div>

         <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(135,206,235,1)] xl:col-span-2">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-2xl font-black uppercase tracking-tighter border-l-8 border-black pl-4">Top Growth Locations</h3>
               <MapPin className="w-6 h-6" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {data?.topLocations?.map((loc: any, idx: number) => (
                  <div key={idx} className="border-2 border-black p-4 bg-gray-50 flex items-center justify-between">
                     <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase">Region</p>
                        <p className="font-black uppercase truncate max-w-[120px]">{loc.name || "UNSPECIFIED"}</p>
                     </div>
                     <span className="bg-black text-white px-2 py-1 text-xs font-black">{loc.count} PROJ</span>
                  </div>
               ))}
               {!data?.topLocations?.length && <p className="col-span-3 text-center py-4 font-bold text-gray-400 uppercase flex items-center justify-center gap-2">No location data available <ArrowRight className="w-4 h-4" /></p>}
            </div>
         </div>
      </div>

      {/* Recent Billing Activity Table */}
      <div className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
         <div className="flex items-center justify-between mb-10">
            <div>
               <h3 className="text-3xl font-black uppercase tracking-tighter border-l-8 border-black pl-4">Recent Billing Activity</h3>
               <p className="text-xs font-bold text-gray-400 mt-1 uppercase">Audit trail of the last 5 invoices generated</p>
            </div>
            <Link href="/bills" className="bg-black text-white px-6 py-2 font-black uppercase text-xs border-2 border-black hover:bg-white hover:text-black transition-all">VIEW ALL</Link>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b-4 border-black bg-gray-50">
                     <th className="p-4 text-[10px] font-black uppercase">Document #</th>
                     <th className="p-4 text-[10px] font-black uppercase">Project / Client</th>
                     <th className="p-4 text-[10px] font-black uppercase">Export Date</th>
                     <th className="p-4 text-[10px] font-black uppercase text-right">Value</th>
                  </tr>
               </thead>
               <tbody className="divide-y-2 divide-gray-100 uppercase">
                  {data?.recentBills?.map((bill: any, idx: number) => (
                     <tr key={idx} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-black text-sm">{bill.billNumber}</td>
                        <td className="p-4">
                           <p className="font-black text-xs">{bill.projectName}</p>
                           <p className="text-[10px] font-bold text-gray-400">{bill.clientName}</p>
                        </td>
                        <td className="p-4 font-bold text-xs text-gray-500">
                           {new Date(bill.billDate).toLocaleDateString("en-IN", { day: '2-digit', month: 'short' })}
                        </td>
                        <td className="p-4 text-right font-black">₹{bill.totalAmount.toLocaleString("en-IN")}</td>
                     </tr>
                  ))}
                  {!data?.recentBills?.length && (
                     <tr>
                        <td colSpan={4} className="p-10 text-center font-bold text-gray-300 uppercase">No recent activity detected</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
