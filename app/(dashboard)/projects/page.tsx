import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";
import { UrlPagination } from "@/components/ui/url-pagination";

async function getProjects(companyId: string, page = 1) {
  await connectDB();
  const limit = 9;
  const skip = (page - 1) * limit;

  const total = await Project.countDocuments({ companyId });
  const projects = await Project.find({ companyId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    projects: projects.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      clientName: p.clientName,
      status: p.status,
      totalAmount: p.totalAmount,
      date: p.date.toISOString(),
      location: p.location,
    })),
    totalPages: Math.ceil(total / limit)
  };
}

export default async function ProjectsPage({ searchParams }: { searchParams: { page?: string } }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const currentPage = Number(searchParams?.page) || 1;
  const { projects, totalPages } = await getProjects(session.user.companyId ?? "", currentPage);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter uppercase">Projects Node</h1>
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-widest mt-1">
            Global Infrastructure Management
          </p>
        </div>
        <Link
          href="/projects/new"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-black uppercase text-xs border-2 border-black hover:bg-[#FFDE59] hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          <Plus className="w-4 h-4" />
          Create Protocol
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-3 border-2 border-black focus:outline-none focus:bg-gray-50 font-bold text-xs uppercase"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border-2 border-black font-black uppercase text-xs hover:bg-[#FFDE59] transition-all italic">
          <Filter className="w-4 h-4" />
          Scanner Filter
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="bg-white border-2 border-black p-16 text-center shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-50 border-2 border-black flex items-center justify-center mx-auto mb-6 rotate-[-3deg] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Plus className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-black italic tracking-tighter uppercase mb-2">No Active Protocols</h3>
            <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-8">
              Ecosystem-wide project cache is currently empty
            </p>
            <Link
              href="/projects/new"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-black uppercase text-xs border-2 border-black hover:bg-[#FFDE59] hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              <Plus className="w-4 h-4" />
              Initialize Project
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="bg-white border-2 border-black p-6 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-1 hover:-translate-y-1 transition-all group relative overflow-hidden"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1 pr-4">
                    <h3 className="text-lg font-black uppercase italic tracking-tighter mb-1 group-hover:text-amber-500">
                      {project.name}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{project.clientName}</p>
                  </div>
                  <span
                    className={`px-3 py-1 text-[9px] font-black uppercase border-2 border-black border-2 border-black rotate-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                      project.status === "Active"
                        ? "bg-emerald-400 text-black"
                        : project.status === "Completed"
                          ? "bg-blue-400 text-black"
                          : "bg-gray-200 text-black"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                <div className="space-y-3 text-[10px] font-bold uppercase tracking-widest">
                  <div className="flex justify-between items-center text-gray-500">
                    <span>Target Location:</span>
                    <span className="text-black italic">{project.location}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-500">
                    <span>Protocol Date:</span>
                    <span className="text-black">
                      {new Date(project.date).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric'})}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t-2 border-gray-50 mt-2">
                    <span className="text-gray-400 tracking-[0.2em]">Total Value:</span>
                    <span className="text-xl font-black italic tracking-tighter text-black">
                      ₹{project.totalAmount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <UrlPagination totalPages={totalPages} />
        </>
      )}
    </div>
  );
}
