"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  FileText,
  Download,
  Trash2,
  Calendar,
  User,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import { useToast } from "@/components/ui/toast-context";
import { Pagination } from "@/components/ui/pagination";

interface Bill {
  _id: string;
  billNumber: string;
  projectName: string;
  clientName: string;
  billDate: string;
  totalAmount: number;
  itemsCount: number;
  status: string;
}

export default function BillsPage() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    fetchBills(currentPage, searchQuery);
  }, [currentPage]);

  const fetchBills = async (page = 1, query = "") => {
    setLoading(true);
    try {
      const response = await fetch(`/api/bills?q=${encodeURIComponent(query)}&page=${page}`);
      const data = await response.json();
      if (response.ok) {
        setBills(data.bills || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalItems(data.pagination?.totalItems || 0);
      } else {
        toast({ title: "Error", description: data.error, type: "error" });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch bills history",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBills(1, searchQuery);
  };

  const totalRevenueOnPage = bills.reduce((sum, b) => sum + b.totalAmount, 0);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter italic">
            Billing History
          </h1>
          <p className="text-gray-500 font-bold mt-1 uppercase text-[10px] tracking-widest">
            Protocol cache: Track all generated invoice instances
          </p>
        </div>

        <div className="flex items-center gap-4 bg-white border-2 border-black p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="px-6 py-2 border-r-2 border-black">
            <p className="text-[9px] font-black uppercase text-gray-400 tracking-tighter">
              Total Instances
            </p>
            <p className="text-2xl font-black italic tracking-tighter">{totalItems}</p>
          </div>
          <div className="px-6 py-2">
            <p className="text-[9px] font-black uppercase text-gray-400 tracking-tighter">
              Page Volume
            </p>
            <p className="text-2xl font-black text-emerald-600 italic tracking-tighter">
              ₹{totalRevenueOnPage.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="flex gap-4">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
          <input
            type="text"
            placeholder="Search by Bill #, Project or Client Name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border-2 border-black font-bold uppercase text-xs focus:outline-none focus:bg-[#FFDE59] placeholder:text-gray-300 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all italic"
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white px-10 py-4 font-black uppercase text-xs border-2 border-black hover:bg-[#FFDE59] hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
        >
          Execute Scanner
        </button>
      </form>

      {/* Bills Table/Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-72 bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse"
            ></div>
          ))}
        </div>
      ) : bills.length === 0 ? (
        <div className="bg-white border-2 border-black p-24 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-gray-50 border-2 border-black p-6 w-fit mx-auto rotate-3 mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <FileText className="w-16 h-16 text-gray-200" />
          </div>
          <h3 className="text-2xl font-black uppercase italic tracking-tighter">No Protocols Identified</h3>
          <p className="text-gray-400 font-bold mt-2 uppercase text-xs tracking-widest">
            Your invoice history will manifest after project finalization
          </p>
          <Link
            href="/projects"
            className="inline-block mt-10 bg-black text-white px-10 py-4 font-black uppercase text-xs border-2 border-black hover:bg-[#FFDE59] hover:text-black transition-all hover:shadow-[6px_6px_0px_0px_rgba(255,222,89,1)] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            Go to Projects Module
          </Link>
        </div>
      ) : (
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {bills.map((bill) => (
              <Link
                key={bill._id}
                href={`/bills/${bill._id}`}
                className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(255,222,89,1)] hover:bg-[#FFDE59]/5 hover:-translate-x-1 hover:-translate-y-1 transition-all group relative overflow-hidden flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-black text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest border border-black shadow-[2px_2px_0px_0px_rgba(255,222,89,1)]">
                      {bill.billNumber}
                    </span>
                    <div className="text-right">
                       <p className="font-black text-[9px] text-gray-400 uppercase tracking-tighter">Timestamp</p>
                       <p className="font-bold text-[10px] uppercase">
                        {new Date(bill.billDate).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-black uppercase italic tracking-tighter mb-6 group-hover:text-amber-500 transition-colors truncate">
                    {bill.projectName}
                  </h3>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 border border-black group-hover:bg-black group-hover:text-white transition-all">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <p className="font-bold text-[10px] uppercase truncate text-gray-600">
                        {bill.clientName}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 border border-black group-hover:bg-black group-hover:text-white transition-all">
                        <Briefcase className="w-3.5 h-3.5" />
                      </div>
                      <p className="font-bold text-[10px] uppercase text-gray-600">
                        {bill.itemsCount} Positions Detected
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t-2 border-gray-50 mt-auto">
                    <div className="flex items-center justify-between">
                       <div>
                         <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Protocol Value</p>
                         <p className="text-2xl font-black italic tracking-tighter">
                          ₹{bill.totalAmount.toLocaleString("en-IN")}
                        </p>
                       </div>
                       <div className={`p-2 border-2 border-black rotate-3 font-black text-[9px] uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${bill.status === 'Sent' ? 'bg-emerald-400' : 'bg-[#FFDE59]'}`}>
                          {bill.status}
                       </div>
                    </div>
                </div>
              </Link>
            ))}
          </div>

          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
