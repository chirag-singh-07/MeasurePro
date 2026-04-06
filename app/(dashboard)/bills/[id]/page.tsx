"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, 
  Download, 
  Trash2, 
  Calendar, 
  User, 
  Briefcase, 
  MapPin,
  CheckCircle2,
  Printer
} from "lucide-react";
import { useToast } from "@/components/ui/toast-context";
import { pdf } from "@react-pdf/renderer";
import { ProjectPDF } from "@/components/project-pdf";

interface Bill {
  _id: string;
  billNumber: string;
  projectId: string;
  projectName: string;
  clientName: string;
  billDate: string;
  sections: any[];
  subtotal: number;
  gstAmount: number;
  totalAmount: number;
  itemsCount: number;
  status: string;
  createdAt: string;
}

export default function BillDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const billId = params.id as string;
  
  const [bill, setBill] = useState<Bill | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchBill();
  }, [billId]);

  const fetchBill = async () => {
    try {
      const response = await fetch(`/api/bills/${billId}`);
      const data = await response.json();
      if (response.ok) {
        setBill(data.bill);
      } else {
        toast({ title: "Error", description: data.error, type: "error" });
      }
    } catch (err) {
      toast({ title: "Error", description: "Failed to load bill details", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const deleteBill = async () => {
    if (!confirm("Are you sure you want to delete this bill from history? This action cannot be undone.")) return;
    
    setDeleting(true);
    try {
      const response = await fetch(`/api/bills/${billId}`, { method: "DELETE" });
      if (response.ok) {
        toast({ title: "Deleted", description: "Bill removed from history", type: "success" });
        router.push("/bills");
      } else {
        toast({ title: "Error", description: "Failed to delete bill", type: "error" });
      }
    } catch (err) {
      toast({ title: "Error", description: "An error occurred", type: "error" });
    } finally {
      setDeleting(false);
    }
  };

  const reExportPDF = async () => {
    if (!bill) return;

    toast({ title: "Preparing PDF", description: "Regenerating bill document...", type: "info" });

    try {
      // Find the project gst percentage correctly (it's stored in bill metadata indirectly via totalAmount or we can deduce it)
      // Since we don't have project location stored in bill, we'll use a placeholder or just NA
      const dummyProject = {
        name: bill.projectName,
        clientName: bill.clientName,
        date: bill.billDate,
        location: "Historical Record",
        gstPercentage: (bill.gstAmount / bill.subtotal) * 100 || 0
      };

      const doc = (
        <ProjectPDF 
          project={dummyProject} 
          sections={bill.sections} 
          billDate={bill.billDate} 
        />
      );

      const asBlob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(asBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${bill.billNumber}_${bill.projectName.replace(/\s+/g, "_")}.pdf`;
      link.click();
      URL.revokeObjectURL(url);

      toast({ title: "Success", description: "PDF downloaded successfully", type: "success" });
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to generate PDF", type: "error" });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f0f0f0]">
        <div className="bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse">
           <h2 className="text-xl font-black uppercase">Loading Bill Details...</h2>
        </div>
      </div>
    );
  }

  if (!bill) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-8 bg-red-50 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black uppercase text-red-600">Bill Not Found</h2>
        <p className="mt-2 font-bold">The requested billing record could not be located.</p>
        <Link href="/bills" className="inline-block mt-6 bg-black text-white px-6 py-3 font-black uppercase border-2 border-black hover:bg-white hover:text-black transition-all">
          Back to History
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <Link href="/bills" className="inline-flex items-center gap-2 text-sm font-black uppercase hover:underline mb-4 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Billing History
          </Link>
          <div className="flex items-center gap-4">
             <h1 className="text-4xl font-black uppercase tracking-tighter">{bill.billNumber}</h1>
             <span className="bg-green-100 text-green-700 border-2 border-green-700 px-3 py-1 font-black text-xs uppercase flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> {bill.status}
             </span>
          </div>
          <p className="text-xl font-bold mt-1 text-gray-600 uppercase">{bill.projectName}</p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={reExportPDF}
            className="flex items-center gap-2 bg-[#FFDE59] text-black px-8 py-4 font-black uppercase border-4 border-black hover:bg-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px]"
          >
            <Printer className="w-5 h-5" /> RE-EXPORT PDF
          </button>
          <button 
            onClick={deleteBill}
            disabled={deleting}
            className="flex items-center gap-2 bg-white text-red-600 px-6 py-4 font-black uppercase border-4 border-black hover:bg-red-600 hover:text-white transition-all hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] disabled:opacity-50"
          >
            <Trash2 className="w-5 h-5" /> {deleting ? "Deleting..." : "Delete Record"}
          </button>
        </div>
      </div>

      {/* Bill Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Client Name</p>
            <div className="flex items-center gap-2">
               <User className="w-4 h-4 text-blue-600" />
               <p className="font-black truncate uppercase">{bill.clientName}</p>
            </div>
         </div>
         <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Bill Date</p>
            <div className="flex items-center gap-2">
               <Calendar className="w-4 h-4 text-purple-600" />
               <p className="font-black uppercase">{new Date(bill.billDate).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}</p>
            </div>
         </div>
         <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Total Amount</p>
            <p className="font-black text-xl text-green-600 tracking-tight">₹{bill.totalAmount.toLocaleString("en-IN")}</p>
         </div>
         <div className="bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Items Billed</p>
            <div className="flex items-center gap-2">
               <Briefcase className="w-4 h-4 text-orange-600" />
               <p className="font-black uppercase">{bill.itemsCount} POSITIONS</p>
            </div>
         </div>
      </div>

      {/* Items Detailed View */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black uppercase tracking-tighter border-l-8 border-black pl-4">Billed Items Details</h2>
        
        {bill.sections.map((section, sIdx) => (
          <div key={sIdx} className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="bg-[#f0f0f0] p-4 border-b-4 border-black flex justify-between items-center">
              <h3 className="font-black uppercase text-lg">{section.title}</h3>
              <p className="font-black bg-black text-white px-3 py-1 text-sm tracking-tighter">SUBTOTAL: ₹{section.totalAmount.toLocaleString("en-IN")}</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-[#f9f9f9] border-b-2 border-black">
                  <tr>
                    <th className="p-3 text-[10px] font-black uppercase w-12 text-center">#</th>
                    <th className="p-3 text-[10px] font-black uppercase min-w-[200px]">Description</th>
                    <th className="p-3 text-[10px] font-black uppercase text-center">UOM</th>
                    <th className="p-3 text-[10px] font-black uppercase text-right">Size</th>
                    <th className="p-3 text-[10px] font-black uppercase text-right">Qty</th>
                    <th className="p-3 text-[10px] font-black uppercase text-right">Rate</th>
                    <th className="p-3 text-[10px] font-black uppercase text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-gray-100">
                  {section.items.map((item: any, iIdx: number) => (
                    <tr key={iIdx} className="hover:bg-blue-50/30 transition-colors">
                      <td className="p-3 text-center font-bold text-gray-400 border-r-2 border-gray-100">{iIdx + 1}</td>
                      <td className="p-3 border-r-2 border-gray-100 font-medium">{item.description}</td>
                      <td className="p-3 text-center border-r-2 border-gray-100 font-bold">{item.uom}</td>
                      <td className="p-3 text-right border-r-2 border-gray-100 font-mono text-sm">{item.size}</td>
                      <td className="p-3 text-right border-r-2 border-gray-100 font-mono text-sm">{item.qty}</td>
                      <td className="p-3 text-right border-r-2 border-gray-100 font-mono text-sm">₹{item.rate.toLocaleString("en-IN")}</td>
                      <td className="p-3 text-right font-black font-mono">₹{item.amount.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Recap */}
      <div className="bg-black text-white p-8 border-4 border-black shadow-[12px_12px_0px_0px_rgba(255,222,89,1)] flex flex-col md:flex-row justify-between items-end gap-10 lg:gap-20">
         <div className="space-y-4 flex-1">
            <h3 className="text-3xl font-black uppercase border-b-4 border-white/20 pb-4">Historical Summary</h3>
            <div className="flex justify-between items-center text-gray-400 font-bold uppercase tracking-widest text-sm">
               <span>Net Worth of Items</span>
               <span className="text-white font-black">₹{bill.subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center text-gray-400 font-bold uppercase tracking-widest text-sm">
               <span>GST Inclusion (Historical)</span>
               <span className="text-white font-black">₹{bill.gstAmount.toLocaleString("en-IN")}</span>
            </div>
         </div>
         <div className="text-right flex-shrink-0">
            <p className="text-[#FFDE59] font-black uppercase text-sm tracking-[0.2em] mb-2">Grand Total Paid/Billed</p>
            <p className="text-6xl lg:text-7xl font-black tracking-tighter">₹{bill.totalAmount.toLocaleString("en-IN")}</p>
         </div>
      </div>
    </div>
  );
}
