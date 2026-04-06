"use client";

import { useAuthSession } from "@/lib/use-auth-session";
import { signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  ShieldCheck, 
  Database, 
  LogOut, 
  ChevronRight,
  Menu,
  X,
  Server,
  Activity,
  LifeBuoy
} from "lucide-react";
import { Loading } from "@/components/loading";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useAuthSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (!isPending) {
      if (session === null) {
        router.push("/auth/signin");
      } else if (session?.user) {
        const role = session.user.role;
        if (role !== "SuperAdmin" && role !== "Admin") {
          router.replace("/dashboard");
        }
      }
    }
  }, [isPending, session, router]);

  if (isPending) {
    return <Loading text="Verifying Admin Access..." fullScreen />;
  }

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/admin" },
    { name: "User Management", icon: Users, href: "/admin/users" },
    { name: "Support Protocol", icon: LifeBuoy, href: "/admin/tickets" },
    { name: "System Health", icon: Activity, href: "/admin/health" },
    { name: "Infrastructure", icon: Server, href: "/admin/infra" },
    { name: "Security Logs", icon: ShieldCheck, href: "/admin/logs" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex text-black font-sans selection:bg-[#FFDE59]">
      {/* Admin Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white border-r-2 border-black transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8 border-b-2 border-black bg-black text-white">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-[#FFDE59]" />
              <h1 className="text-2xl font-bold uppercase tracking-tight italic">MeasurePro <span className="text-gray-400">CORE</span></h1>
            </div>
            <div className="mt-2 text-[10px] font-black uppercase text-[#FFDE59] tracking-widest opacity-80">Super-Admin Module Active</div>
          </div>

          <nav className="flex-1 p-4 space-y-2 mt-4">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center justify-between p-4 font-bold text-sm transition-all border-2 border-transparent ${isActive ? 'bg-black text-white border-black' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5" />
                    {item.name}
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 text-[#FFDE59]" />}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t-2 border-black bg-gray-50/50">
             <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-black flex items-center justify-center font-bold text-white border-2 border-black">
                   {session?.user?.name?.[0] || 'A'}
                </div>
                <div className="overflow-hidden">
                   <p className="text-sm font-bold truncate lowercase">{session?.user?.name}</p>
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-0.5">Admin Profile</p>
                </div>
             </div>
             <button 
               onClick={() => signOut().then(() => (window.location.href = "/auth/signin"))}
               className="w-full flex items-center justify-center gap-3 bg-white border-2 border-black p-3 font-bold text-xs uppercase hover:bg-red-500 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
             >
                <LogOut className="w-4 h-4" /> Terminate Session
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 transition-all">
        {/* Admin Header */}
        <header className="h-20 bg-white border-b-2 border-black flex items-center justify-between px-10 sticky top-0 z-40">
           <div className="flex items-center gap-10">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFDE59]"
              >
                 {isSidebarOpen ? <X /> : <Menu />}
              </button>
              
              <div className="hidden md:flex items-center gap-4">
                 <div className="flex items-center gap-2 bg-gray-50 border-2 border-black px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Database className="w-4 h-4 text-green-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Protocol Verified</span>
                 </div>
                 <div className="flex items-center gap-2 bg-gray-50 border-2 border-black px-4 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Activity className="w-4 h-4 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Stable Node</span>
                 </div>
              </div>
           </div>

           <div className="flex items-center gap-6 font-black uppercase text-[10px] tracking-[0.2em]">
              <div className="bg-black text-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 Control Active
              </div>
           </div>
        </header>

        <div className="p-8 lg:p-12 relative h-[calc(100vh-80px)] overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-black border-t-[#FFDE59] rounded-full animate-spin"></div>
      <p className="text-xs font-black uppercase tracking-widest">Verifying Protocol...</p>
    </div>
  );
}
