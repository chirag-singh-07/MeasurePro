import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import {
  TrendingUp,
  FolderKanban,
  IndianRupee,
  Calendar,
  Plus,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { DashboardWelcome } from "@/components/dashboard-welcome";

async function getDashboardData(companyId: string) {
  await connectDB();

  const projects = await Project.find({ companyId })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  const allProjects = await Project.find({ companyId }).lean();
  const activeProjects = allProjects.filter((p) => p.status === "Active");

  const totalRevenue = allProjects.reduce(
    (sum, p) => sum + (p.totalAmount || 0),
    0,
  );

  // Calculate monthly revenue (current month)
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const monthlyProjects = allProjects.filter(
    (p) => new Date(p.createdAt) >= monthStart,
  );
  const monthlyRevenue = monthlyProjects.reduce(
    (sum, p) => sum + (p.totalAmount || 0),
    0,
  );

  return {
    totalProjects: allProjects.length,
    activeProjects: activeProjects.length,
    totalRevenue,
    monthlyRevenue,
    recentProjects: projects.map((p) => ({
      id: p._id.toString(),
      name: p.name,
      clientName: p.clientName,
      status: p.status,
      totalAmount: p.totalAmount,
      date: p.date.toISOString(),
    })),
  };
}

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const data = await getDashboardData(session.user.companyId);

  const stats = [
    {
      name: "Total Projects",
      value: data.totalProjects,
      icon: FolderKanban,
      color: "bg-[#FFDE59]",
    },
    {
      name: "Active Sites",
      value: data.activeProjects,
      icon: TrendingUp,
      color: "bg-[#98FB98]",
    },
    {
      name: "Total Revenue",
      value: `₹${data.totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "bg-[#87CEEB]",
    },
    {
      name: "Monthly Revenue",
      value: `₹${data.monthlyRevenue.toLocaleString("en-IN")}`,
      icon: Calendar,
      color: "bg-[#FFA07A]",
    },
  ];

  return (
    <div className="space-y-8 p-8 bg-[#f0f0f0] min-h-screen font-sans text-black">
      <DashboardWelcome name={session.user.name || "Builder"} />

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className={`${stat.color} border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-black uppercase tracking-wider mb-2">
                  {stat.name}
                </p>
                <p className="text-4xl font-black">{stat.value}</p>
              </div>
              <div className="bg-black p-3 text-white border-2 border-black">
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
        <div className="p-6 border-b-4 border-black flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="bg-black text-white p-2">
              <FolderKanban className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-black uppercase tracking-tight">
              Recent Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm font-black uppercase bg-[#FFDE59] px-4 py-2 border-2 border-black hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all"
          >
            View All <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        {data.recentProjects.length === 0 ? (
          <div className="p-16 text-center bg-gray-50">
            <div className="inline-block bg-gray-200 p-6 rounded-full border-4 border-gray-300 mb-6">
              <FolderKanban className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-black uppercase mb-2">
              No projects yet
            </h3>
            <p className="text-gray-600 mb-8 font-bold max-w-sm mx-auto">
              Ready to start building? Create your first project to track
              measurements and billing.
            </p>
            <Link
              href="/projects/new"
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-black uppercase border-2 border-black hover:bg-white hover:text-black hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              <Plus className="w-5 h-5" /> Create Project
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-black text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-black uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black bg-white">
                {data.recentProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-[#f0f0f0] transition-colors group"
                  >
                    <td className="px-6 py-4 font-bold border-r-2 border-gray-100">
                      <Link
                        href={`/projects/${project.id}`}
                        className="hover:underline decoration-2 underline-offset-4 decoration-black"
                      >
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 font-medium border-r-2 border-gray-100">
                      {project.clientName}
                    </td>
                    <td className="px-6 py-4 border-r-2 border-gray-100">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-black uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                          project.status === "Active"
                            ? "bg-[#98FB98]"
                            : project.status === "Completed"
                              ? "bg-[#87CEEB]"
                              : "bg-gray-200"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-black border-r-2 border-gray-100">
                      ₹{project.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-500 border-r-2 border-gray-100">
                      {new Date(project.date).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/projects/${project.id}`}
                        className="inline-flex items-center justify-center p-2 border-2 border-black hover:bg-black hover:text-white transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
