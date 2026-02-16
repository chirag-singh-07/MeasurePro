import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import { TrendingUp, FolderKanban, DollarSign, Calendar } from "lucide-react";
import Link from "next/link";

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
      color: "bg-blue-50 border-blue-500 text-blue-700",
    },
    {
      name: "Active Projects",
      value: data.activeProjects,
      icon: TrendingUp,
      color: "bg-green-50 border-green-500 text-green-700",
    },
    {
      name: "Total Revenue",
      value: `₹${data.totalRevenue.toLocaleString("en-IN")}`,
      icon: DollarSign,
      color: "bg-purple-50 border-purple-500 text-purple-700",
    },
    {
      name: "Monthly Revenue",
      value: `₹${data.monthlyRevenue.toLocaleString("en-IN")}`,
      icon: Calendar,
      color: "bg-orange-50 border-orange-500 text-orange-700",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {session.user.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your projects today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className={`${stat.color} border-2 p-6 card-hover`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold opacity-80">{stat.name}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <stat.icon className="w-12 h-12 opacity-50" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white border-2 border-black">
        <div className="p-6 border-b-2 border-black flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Projects</h2>
          <Link
            href="/projects"
            className="text-sm font-semibold hover:underline"
          >
            View All
          </Link>
        </div>

        {data.recentProjects.length === 0 ? (
          <div className="p-12 text-center">
            <FolderKanban className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first project
            </p>
            <Link
              href="/projects/new"
              className="inline-block bg-black text-white px-6 py-3 font-semibold border-2 border-black hover:bg-white hover:text-black transition-all"
            >
              Create Project
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-black">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Project Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-gray-200">
                {data.recentProjects.map((project) => (
                  <tr
                    key={project.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link
                        href={`/projects/${project.id}`}
                        className="font-semibold hover:underline"
                      >
                        {project.name}
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {project.clientName}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-semibold ${
                          project.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : project.status === "Completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {project.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      ₹{project.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(project.date).toLocaleDateString("en-IN")}
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
