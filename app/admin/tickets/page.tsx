"use client";

import { useEffect, useState } from "react";
import { 
  LifeBuoy, 
  Search, 
  Filter, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  MessageSquare, 
  User, 
  Building2,
  RefreshCcw,
  ArrowRight
} from "lucide-react";
import { useAuthSession } from "@/lib/use-auth-session";

export default function AdminTicketsPage() {
  const { data: session } = useAuthSession();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [response, setResponse] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const resp = await fetch("/api/admin/tickets");
      const data = await resp.json();
      if (resp.ok) {
        setTickets(data.tickets);
      }
    } catch (err) {
      console.error("Failed to fetch support stream:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateTicketStatus = async (id: string, status: string) => {
    try {
      const resp = await fetch("/api/admin/tickets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      if (resp.ok) {
        fetchTickets();
        if (selectedTicket?._id === id) {
          setSelectedTicket({ ...selectedTicket, status });
        }
      }
    } catch (err) {
      console.error("Status sync failure:", err);
    }
  };

  const submitResponse = async () => {
    if (!response.trim() || !selectedTicket) return;
    setSubmitting(true);
    try {
      const resp = await fetch("/api/admin/tickets", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedTicket._id, responseMessage: response })
      });
      if (resp.ok) {
        setResponse("");
        fetchTickets();
        // Refresh selected ticket local state
        const updatedResp = await fetch("/api/admin/tickets");
        const updatedData = await updatedResp.json();
        const updatedTicket = updatedData.tickets.find((t: any) => t._id === selectedTicket._id);
        setSelectedTicket(updatedTicket);
      }
    } catch (err) {
      console.error("Response injection failure:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredTickets = tickets.filter(t => 
    t.title?.toLowerCase().includes(search.toLowerCase()) ||
    t.createdBy?.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.companyId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="bg-white border-2 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse flex flex-col items-center gap-4">
          <RefreshCcw className="w-10 h-10 animate-spin text-black" />
          <p className="text-sm font-black uppercase italic tracking-tighter">Synchronizing Support Streams...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-8 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
         <div className="flex items-center gap-6">
            <div className="bg-[#FFDE59] p-4 text-black border-2 border-black rotate-[-2deg]">
               <LifeBuoy className="w-8 h-8" />
            </div>
            <div>
               <h2 className="text-3xl font-black uppercase tracking-tighter italic">Support Protocols</h2>
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Real-time Issue Management Node</p>
            </div>
         </div>
         
         <div className="relative w-full lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by subject, user or entity..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-gray-50 text-black border-2 border-black p-4 pl-12 font-bold text-xs uppercase focus:outline-none focus:bg-[#FFDE59] transition-all italic"
            />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tickets List */}
        <div className="lg:col-span-1 space-y-4">
          {filteredTickets.map((ticket) => (
            <div 
              key={ticket._id}
              onClick={() => setSelectedTicket(ticket)}
              className={`bg-white border-2 border-black p-6 cursor-pointer hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all relative overflow-hidden group ${selectedTicket?._id === ticket._id ? 'shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gray-50' : ''}`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-2 py-1 text-[8px] font-black uppercase border border-black ${
                  ticket.status === 'open' ? 'bg-[#FFDE59]' : 
                  ticket.status === 'resolved' ? 'bg-emerald-400' : 'bg-gray-100'
                }`}>
                  {ticket.status}
                </span>
                <span className="text-[9px] font-bold text-gray-400">{new Date(ticket.createdAt).toLocaleDateString()}</span>
              </div>
              <h3 className="font-black text-sm uppercase italic tracking-tighter mb-2 group-hover:text-amber-500">{ticket.title}</h3>
              <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase italic">
                <User className="w-3 h-3" /> {ticket.createdBy?.name}
              </div>
            </div>
          ))}
          {!filteredTickets.length && (
            <div className="p-10 border-2 border-black border-dashed text-center text-gray-400 font-bold uppercase text-xs">
              No active nodes found
            </div>
          )}
        </div>

        {/* Ticket Detail & Management */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full min-h-[600px]">
              <div className="p-8 border-b-2 border-black bg-gray-50 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter mb-1">{selectedTicket.title}</h2>
                  <div className="flex items-center gap-4 text-[10px] font-black text-gray-400 tracking-widest uppercase">
                    <span className="flex items-center gap-1"><Building2 className="w-3 h-3" /> {selectedTicket.companyId?.name}</span>
                    <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-500" /> ID: {selectedTicket._id.slice(-8)}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                   <select 
                     value={selectedTicket.status}
                     onChange={(e) => updateTicketStatus(selectedTicket._id, e.target.value)}
                     className="bg-black text-white px-4 py-2 border-2 border-black font-black text-[10px] uppercase cursor-pointer hover:bg-[#FFDE59] hover:text-black transition-all"
                   >
                     <option value="open">Open</option>
                     <option value="in-progress">In-Progress</option>
                     <option value="resolved">Resolved</option>
                     <option value="closed">Closed</option>
                   </select>
                </div>
              </div>

              <div className="p-8 flex-1 overflow-y-auto space-y-8">
                <div className="bg-gray-50 p-6 border-2 border-black border-dashed relative">
                   <div className="absolute top-0 right-0 p-2 text-[8px] font-black text-gray-300 uppercase tracking-widest">Protocol Entry</div>
                   <p className="font-bold text-sm leading-relaxed text-gray-700 italic">"{selectedTicket.description}"</p>
                </div>

                {/* Responses Stream */}
                <div className="space-y-6">
                   <h4 className="text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2">
                     <MessageSquare className="w-3 h-3" /> Response Stream
                   </h4>
                   <div className="space-y-4">
                     {selectedTicket.responses?.map((res: any, idx: number) => (
                       <div key={idx} className={`p-4 border-2 border-black ${res.senderName.includes('Admin') ? 'bg-black text-white ml-10' : 'bg-white mr-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'}`}>
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-[9px] font-bold uppercase opacity-60 italic">{res.senderName}</span>
                             <span className="text-[8px] font-bold opacity-40">{new Date(res.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="text-xs font-bold leading-relaxed">{res.message}</p>
                       </div>
                     ))}
                     {!selectedTicket.responses?.length && (
                       <p className="text-center text-[10px] font-black text-gray-300 uppercase italic">Protocols empty. Waiting for administrator injection...</p>
                     )}
                   </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="p-6 border-t-2 border-black bg-white">
                <div className="relative group">
                  <textarea 
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Enter command response / technical resolution..."
                    className="w-full bg-gray-50 border-2 border-black p-4 pr-12 font-bold text-sm focus:outline-none focus:bg-[#FFDE59]/5 min-h-[100px] transition-all resize-none italic"
                  />
                  <button 
                    onClick={submitResponse}
                    disabled={submitting || !response.trim()}
                    className="absolute bottom-4 right-4 p-3 bg-black text-white border-2 border-black hover:bg-[#FFDE59] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-30 disabled:pointer-events-none"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[600px] border-2 border-black border-dashed flex flex-col items-center justify-center p-20 text-center bg-gray-50/50">
               <AlertCircle className="w-20 h-20 text-gray-200 mb-6" />
               <h3 className="text-xl font-black uppercase italic tracking-tighter text-gray-300">Awaiting Node Selection</h3>
               <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest mt-2 max-w-[300px]">Select a protocol protocol from the stream to begin resolution sequence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
