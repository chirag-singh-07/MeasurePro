"use client";

import { useAuthSession } from "@/lib/use-auth-session";
import { ITicket } from "@/models/Ticket";
import {
  Plus,
  Search,
  Filter,
  MessageSquare,
  AlertCircle,
  LifeBuoy,
  Send,
  ShieldAlert,
  Clock,
  RefreshCcw,
} from "lucide-react";

import { useState, useEffect } from "react";

export default function SupportPage() {
  const { data: session } = useAuthSession();
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "general-inquiry",
  });
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [formError, setFormError] = useState("");

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterStatus !== "all") params.append("status", filterStatus);
      if (filterPriority !== "all") params.append("priority", filterPriority);

      const response = await fetch(`/api/support/tickets?${params}`);
      const data = await response.json();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error("Error fetching protocols:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchTickets();
    }
  }, [session, filterStatus, filterPriority]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.title.trim() || !formData.description.trim()) {
      setFormError("Protocol data incomplete: title/description required");
      return;
    }

    try {
      const response = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          category: "general-inquiry",
        });
        setShowForm(false);
        fetchTickets();
      } else {
        const error = await response.json();
        setFormError(error.error || "Failed to transmit protocol");
      }
    } catch (error) {
      console.error("Transmission error:", error);
      setFormError("Protocol Transmission Failure");
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center gap-6">
          <div className="bg-[#FFDE59] p-4 text-black border-2 border-black rotate-[-2deg]">
            <LifeBuoy className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tighter italic">
              Help & Support Node
            </h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">
              Ecosystem-wide technical assistance
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 font-black uppercase text-xs border-2 border-black hover:bg-[#FFDE59] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 group"
        >
          <Plus
            className={`w-5 h-5 transition-transform ${showForm ? "rotate-45" : ""}`}
          />
          {showForm ? "Close Portal" : "Initialize Support Protocol"}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 items-start">
        {/* Main Content (Tickets or Form) */}
        <div className="xl:col-span-2 space-y-8">
          {showForm && (
            <div className="bg-white border-2 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Send className="w-24 h-24 rotate-12" />
              </div>

              <div className="flex items-center gap-3 mb-8">
                <ShieldAlert className="w-6 h-6 text-amber-500" />
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                  Support Injection
                </h2>
              </div>

              {formError && (
                <div className="mb-8 p-4 bg-rose-50 border-2 border-black text-rose-600 font-bold uppercase text-[10px] tracking-widest animate-shake">
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">
                    Protocol Title
                  </label>
                  <input
                    type="text"
                    placeholder="SUMMARY OF YOUR ISSUE..."
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full bg-gray-50 border-2 border-black p-4 font-bold text-sm uppercase focus:outline-none focus:bg-[#FFDE59]/10 transition-all italic"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">
                    Issue Parameters (Description)
                  </label>
                  <textarea
                    placeholder="DETAIL THE PROTOCOL FAILURE OR REQUEST..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full bg-gray-50 border-2 border-black p-4 font-bold text-sm uppercase focus:outline-none focus:bg-[#FFDE59]/10 transition-all italic min-h-[200px] resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">
                      Severity / Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) =>
                        setFormData({ ...formData, priority: e.target.value })
                      }
                      className="w-full bg-white border-2 border-black p-4 font-black text-xs uppercase focus:outline-none hover:bg-gray-50 transition-all cursor-pointer"
                    >
                      <option value="low">Low Impact</option>
                      <option value="medium">Medium Priority</option>
                      <option value="high">High Severity</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 pl-1">
                      Category Node
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full bg-white border-2 border-black p-4 font-black text-xs uppercase focus:outline-none hover:bg-gray-50 transition-all cursor-pointer"
                    >
                      <option value="general-inquiry">General Inquiry</option>
                      <option value="bug">Bug Protocol</option>
                      <option value="feature-request">Expansion Request</option>
                      <option value="billing">Financial Node</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-black text-white px-8 py-5 font-black uppercase text-xs border-2 border-black hover:bg-[#FFDE59] hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 text-center"
                  >
                    Transmit Support Node
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-5 border-2 border-black font-black uppercase text-xs hover:bg-white transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tickets List */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-2 border-b-2 border-black border-dashed">
              <h2 className="text-xl font-black uppercase italic tracking-tighter">
                Active Protocols
              </h2>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                Instance Volume: {tickets.length}
              </p>
            </div>

            {loading ? (
              <div className="bg-white border-2 border-black p-20 flex flex-col items-center gap-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                <RefreshCcw className="w-12 h-12 animate-spin text-black" />
                <p className="font-black uppercase text-[10px] tracking-widest text-gray-400">
                  Syncing support stream...
                </p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="bg-white border-2 border-black p-20 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <MessageSquare className="w-32 h-32 rotate-[-15deg]" />
                </div>
                <div className="max-w-md mx-auto">
                  <AlertCircle className="w-16 h-16 text-gray-200 mx-auto mb-6" />
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                    Support Stream Empty
                  </h3>
                  <p className="text-gray-400 font-bold mt-2 uppercase text-[10px] tracking-widest mb-10 leading-loose">
                    No active support requests found within the current
                    ecosystem context.
                  </p>
                  {!showForm && (
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-black uppercase text-xs border-2 border-black hover:bg-[#FFDE59] hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                    >
                      <Plus className="w-4 h-4" />
                      Initialize Protocol
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tickets.map((ticket) => (
                  <div
                    key={String(ticket._id)}
                    className="bg-white border-2 border-black p-6 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all group cursor-pointer relative flex flex-col justify-between"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gray-50 -rotate-45 translate-x-8 -translate-y-8 group-hover:bg-[#FFDE59] transition-colors"></div>

                    <div>
                      <div className="flex items-start justify-between gap-4 mb-6 relative">
                        <div className="flex-1">
                          <span className="bg-gray-100 px-2 py-1 text-[8px] font-black uppercase border border-black mb-2 inline-block tracking-widest">
                            {ticket.category.replace("-", " ")}
                          </span>
                          <h3 className="font-black text-lg uppercase italic tracking-tighter group-hover:text-amber-500 transition-colors truncate pr-4">
                            {ticket.subject}
                          </h3>
                        </div>
                        <div className="flex flex-col gap-2 items-end">
                          <div
                            className={`px-2 py-0.5 border border-black text-[9px] font-black uppercase italic rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                              ticket.status === "Open"
                                ? "bg-[#FFDE59]"
                                : ticket.status === "Resolved"
                                  ? "bg-emerald-400"
                                  : "bg-gray-50"
                            }`}
                          >
                            {ticket.status}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t-2 border-gray-50 mt-4 h-12">
                      <div className="flex items-center gap-4 text-[9px] font-black uppercase text-gray-400 tracking-widest">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />{" "}
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {(ticket as any).responses?.length || 0} Response
                          {(ticket as any).responses?.length !== 1 ? "s" : ""}
                        </span>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ${ticket.priority === "High" ? "bg-rose-500 animate-pulse" : "bg-emerald-500"}`}
                        title={`Priority: ${ticket.priority}`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Info/Filters */}
        <div className="space-y-8">
          {/* Filters */}
          <div className="bg-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3 mb-8">
              <Filter className="w-5 h-5 text-gray-500" />
              <h3 className="font-black uppercase italic tracking-tighter">
                Scanner Filter
              </h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 pl-1">
                  Protocol Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-black p-3 font-black text-[10px] uppercase cursor-pointer hover:bg-white transition-all"
                >
                  <option value="all">Total Status</option>
                  <option value="open">Open Portal</option>
                  <option value="in-progress">Syncing</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 pl-1">
                  Severity Class
                </label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full bg-gray-50 border-2 border-black p-3 font-black text-[10px] uppercase cursor-pointer hover:bg-white transition-all"
                >
                  <option value="all">Total Priorities</option>
                  <option value="low">Low Priority</option>
                  <option value="medium">Standard</option>
                  <option value="high">Critical</option>
                </select>
              </div>
            </div>
          </div>

          {/* Support Status */}
          <div className="bg-black text-white border-2 border-black p-8 shadow-[6px_6px_0px_0px_rgba(255,222,89,1)]">
            <div className="flex gap-4 items-start mb-6">
              <ShieldAlert className="w-8 h-8 text-[#FFDE59]" />
              <div>
                <h4 className="font-black uppercase italic tracking-tighter text-amber-400">
                  Core Advisory
                </h4>
                <p className="text-[9px] font-bold text-gray-400 mt-1 leading-relaxed uppercase tracking-widest">
                  All support protocols are monitored by Core Super-Admins.
                  Typical resolution sequence: 12-24h within standard windows.
                </p>
              </div>
            </div>
            <div className="pt-6 border-t border-gray-800 flex justify-between items-center text-[10px] font-black uppercase tracking-widest italic">
              <span>Global Status</span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>{" "}
                Optimal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
