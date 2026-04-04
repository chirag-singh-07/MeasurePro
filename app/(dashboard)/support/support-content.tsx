"use client";

import { useState, useEffect } from "react";
import { useAuthSession } from "@/lib/use-auth-session";
import { Plus, Search, Filter, MessageSquare, AlertCircle } from "lucide-react";

interface Ticket {
  id: string;
  title: string;
  status: string;
  priority: string;
  category: string;
  responseCount: number;
  createdAt: string;
  createdBy: any;
}

export default function SupportPage() {
  const { data: session } = useAuthSession();
  const [tickets, setTickets] = useState<Ticket[]>([]);
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

  // Fetch tickets
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filterStatus !== "all") params.append("status", filterStatus);
      if (filterPriority !== "all") params.append("priority", filterPriority);

      const response = await fetch(`/api/support/tickets?${params}`, {
        credentials: "include",
      });
      const data = await response.json();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchTickets();
    }
  }, [session, filterStatus, filterPriority]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!formData.title.trim() || !formData.description.trim()) {
      setFormError("Please fill in all required fields");
      return;
    }

    try {
      const response = await fetch("/api/support/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Support ticket created successfully!");
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
        setFormError(error.error || "Failed to create ticket");
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      setFormError("Error creating ticket");
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      open: "bg-blue-50 border-blue-200 text-blue-900",
      "in-progress": "bg-yellow-50 border-yellow-200 text-yellow-900",
      resolved: "bg-green-50 border-green-200 text-green-900",
      closed: "bg-gray-50 border-gray-200 text-gray-900",
    };
    return colors[status] || "bg-gray-50 border-gray-200 text-gray-900";
  };

  const getPriorityBadgeColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "bg-green-50 border-green-300 text-green-900",
      medium: "bg-yellow-50 border-yellow-300 text-yellow-900",
      high: "bg-red-50 border-red-300 text-red-900",
    };
    return colors[priority] || "bg-gray-50 border-gray-300 text-gray-900";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold">Help & Support</h1>
          <p className="text-gray-600 mt-2">
            Create and track your support requests
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-semibold border-2 border-black hover:bg-white hover:text-black transition-all"
        >
          <Plus className="w-5 h-5" />
          New Ticket
        </button>
      </div>

      {/* Create Ticket Form */}
      {showForm && (
        <div className="bg-white border-2 border-black p-6">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5" />
            <h2 className="text-2xl font-bold">Create Support Ticket</h2>
          </div>

          {formError && (
            <div className="mb-4 p-3 border-l-4 border-red-500 bg-red-50 text-red-900">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-semibold mb-2">
                Title <span className="text-red-600">*</span>
              </label>
              <input
                id="title"
                type="text"
                placeholder="Brief description of your issue"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-semibold mb-2">
                Description <span className="text-red-600">*</span>
              </label>
              <textarea
                id="description"
                placeholder="Detailed description of your issue"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                rows={5}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="priority" className="block text-sm font-semibold mb-2">
                  Priority
                </label>
                <select
                  id="priority"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-semibold mb-2">
                  Category
                </label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="bug">Bug Report</option>
                  <option value="feature-request">Feature Request</option>
                  <option value="billing">Billing</option>
                </select>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 font-semibold border-2 border-black hover:bg-white hover:text-black transition-all"
              >
                Create Ticket
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 font-semibold border-2 border-black hover:bg-black hover:text-white transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white border-2 border-black p-4">
        <div className="flex items-center gap-3 mb-4">
          <Filter className="w-5 h-5" />
          <h3 className="font-semibold">Filters</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="filter-status" className="block text-sm font-semibold mb-2">
              Status
            </label>
            <select
              id="filter-status"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div>
            <label htmlFor="filter-priority" className="block text-sm font-semibold mb-2">
              Priority
            </label>
            <select
              id="filter-priority"
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-4 py-2 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Tickets</h2>

        {loading ? (
          <div className="bg-white border-2 border-black p-8 text-center">
            <p className="text-gray-600 font-semibold">Loading tickets...</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="bg-white border-2 border-black p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">No support tickets</h3>
              <p className="text-gray-600 mb-6">
                You haven't created any support tickets yet. Create one to get help from our team.
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-semibold border-2 border-black hover:bg-white hover:text-black transition-all"
              >
                <Plus className="w-5 h-5" />
                Create First Ticket
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white border-2 border-black p-5 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{ticket.title}</h3>
                    <p className="text-sm text-gray-600">
                      {ticket.category.replace("-", " ").toUpperCase()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`px-3 py-1 border-2 border-black text-sm font-semibold ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status}
                    </span>
                    <span
                      className={`px-3 py-1 border-2 border-black text-sm font-semibold ${getPriorityBadgeColor(
                        ticket.priority
                      )}`}
                    >
                      {ticket.priority.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t-2 border-black">
                  <div className="flex gap-4 text-sm font-semibold text-gray-700">
                    <span>
                      Created: {new Date(ticket.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {ticket.responseCount} response{ticket.responseCount !== 1 ? "s" : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
