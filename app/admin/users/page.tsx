"use client";

import { useEffect, useState } from "react";
import { 
  Users, 
  Search, 
  ShieldAlert, 
  UserPlus, 
  ChevronDown, 
  Trash2, 
  ShieldCheck, 
  UserCog,
  RefreshCcw,
  CheckCircle2,
  XCircle,
  Building2
} from "lucide-react";

import { Pagination } from "@/components/ui/pagination";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/admin/users");
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      }
    } catch (err) {
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId: string, newRole: string) => {
    setActionLoading(userId);
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole })
      });
      if (response.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error("Failed to update role:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to permanently delete this user? This action cannot be undone.")) return;
    
    setActionLoading(userId);
    try {
      const response = await fetch(`/api/admin/users?id=${userId}`, {
        method: "DELETE"
      });
      if (response.ok) {
        fetchUsers();
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Failed to delete user");
      }
    } catch (err) {
      console.error("Delete failure:", err);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.companyId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
     return (
        <div className="flex items-center justify-center min-h-[50vh]">
           <div className="bg-white border-2 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-pulse flex flex-col items-center gap-4">
              <RefreshCcw className="w-10 h-10 animate-spin text-black" />
              <p className="text-sm font-bold uppercase italic tracking-tighter">Syncing User Protocols...</p>
           </div>
        </div>
     );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Search & Actions Header */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white p-8 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
         <div className="flex items-center gap-6">
            <div className="bg-[#FFDE59] p-4 text-black border-2 border-black rotate-[-2deg]">
               <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
               <h2 className="text-3xl font-black uppercase tracking-tighter italic">User Management</h2>
               <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mt-1">Platform-Wide Access Control</p>
            </div>
         </div>
         
         <div className="relative w-full lg:w-[400px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name, email, or entity..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              className="w-full bg-gray-50 text-black border-2 border-black p-4 pl-12 font-bold text-xs uppercase focus:outline-none focus:bg-[#FFDE59] transition-all italic"
            />
         </div>
      </div>

      {/* Users Card */}
      <div className="bg-white border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-gray-50 border-b-2 border-black">
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest pl-10">Profile</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest">Entity</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest">Protocol</th>
                     <th className="p-6 text-[10px] font-black uppercase tracking-widest text-right pr-10">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y-2 divide-gray-100">
                  {currentUsers.map((user, idx) => (
                     <tr key={user._id} className={`group hover:bg-gray-50/50 transition-colors ${actionLoading === user._id ? 'opacity-50 grayscale pointer-events-none animate-pulse' : ''}`}>
                        <td className="p-6 pl-10">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-black flex items-center justify-center text-white border-2 border-black font-black italic shadow-[3px_3px_0px_0px_rgba(255,222,89,1)]">
                                 {user.name?.[0]}
                              </div>
                              <div>
                                 <p className="font-black text-sm uppercase tracking-tight">{user.name}</p>
                                 <p className="text-[10px] font-bold text-gray-400 mt-0.5 lowercase tracking-tighter">{user.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-6">
                           <div className="flex items-center gap-2 font-black text-[11px] uppercase text-gray-600">
                              <Building2 className="w-4 h-4 text-gray-400" />
                              {user.companyId?.name || "Independent"}
                           </div>
                        </td>
                        <td className="p-6">
                           <div className="relative inline-block w-full max-w-[200px]">
                              <select 
                                value={user.role}
                                onChange={(e) => updateRole(user._id, e.target.value)}
                                className={`w-full appearance-none bg-white border-2 border-black p-3 pr-10 font-black text-[11px] uppercase focus:outline-none cursor-pointer hover:bg-[#FFDE59] transition-all ${user.role === 'SuperAdmin' ? 'bg-black text-white' : ''}`}
                              >
                                 <option value="SuperAdmin">SuperAdmin Access</option>
                                 <option value="Admin">Admin (Company)</option>
                                 <option value="Manager">Manager Access</option>
                                 <option value="Worker">Worker Access</option>
                              </select>
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                 <ChevronDown className="w-4 h-4" />
                              </div>
                           </div>
                        </td>
                        <td className="p-6 text-right pr-10">
                           <div className="flex items-center justify-end gap-3">
                              <div className="mr-2">
                                 {user.role === 'SuperAdmin' ? (
                                    <div className="flex items-center gap-1 text-[9px] font-black bg-black text-[#FFDE59] px-3 py-1.5 border-2 border-black">
                                       <ShieldCheck className="w-3 h-3" /> PROTECTED
                                    </div>
                                 ) : (
                                    <div className="flex items-center gap-1 text-[9px] font-black bg-[#98FB98] text-black px-3 py-1.5 border-2 border-black">
                                       <CheckCircle2 className="w-3 h-3" /> ACTIVE
                                    </div>
                                 )}
                              </div>
                              <button 
                                onClick={() => deleteUser(user._id)}
                                className="p-2.5 bg-white border-2 border-black text-black hover:bg-rose-500 hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                                title="Delete User"
                                disabled={user.role === 'SuperAdmin'}
                              >
                                 <Trash2 className="w-5 h-5" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         {!filteredUsers.length && (
            <div className="p-20 text-center flex flex-col items-center gap-6">
               <UserCog className="w-16 h-16 text-gray-200" />
               <p className="font-black text-gray-300 uppercase tracking-widest text-sm italic">No matching protocols identified within the ecosystem.</p>
               <button onClick={() => setSearch("")} className="bg-black text-white px-8 py-3 font-black uppercase text-xs border-2 border-black hover:bg-[#FFDE59] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Clear scanner</button>
            </div>
         )}
      </div>

      {/* Pagination Footer */}
      {filteredUsers.length > 0 && (
         <div className="flex justify-between items-center bg-white border-2 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-[10px] font-black uppercase text-gray-400 pl-4 tracking-widest">
               Showing {Math.min(filteredUsers.length, (currentPage - 1) * itemsPerPage + 1)}-{Math.min(filteredUsers.length, currentPage * itemsPerPage)} of {filteredUsers.length} entries
            </div>
            <Pagination 
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={setCurrentPage}
            />
         </div>
      )}

      {/* Footer Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-50 border-2 border-black p-8 italic shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
         <div className="flex items-center gap-4">
            <RefreshCcw className="w-5 h-5 text-emerald-500" />
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Live Sync Frequency: Aggregated realtime nodes</p>
         </div>
         <div className="text-right">
            <span className="text-[10px] font-black uppercase text-rose-500">Caution: System terminations are non-reversible</span>
         </div>
      </div>
    </div>
  );
}
