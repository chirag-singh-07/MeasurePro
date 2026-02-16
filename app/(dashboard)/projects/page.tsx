import { auth } from "@/auth";
import { redirect } from "next/navigation";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Link from "next/link";
import { Plus, Search, Filter } from "lucide-react";

async function getProjects(companyId: string) {
  await connectDB();

  const projects = await Project.find({ companyId })
    .sort({ createdAt: -1 })
    .lean();

  return projects.map((p) => ({
    id: p._id.toString(),
    name: p.name,
    clientName: p.clientName,
    status: p.status,
    totalAmount: p.totalAmount,
    date: p.date.toISOString(),
    location: p.location,
  }));
}

export default async function ProjectsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  const projects = await getProjects(session.user.companyId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-600 mt-1">
            Manage all your construction projects
          </p>
        </div>
        <Link
          href="/projects/new"
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-semibold border-2 border-black hover:bg-white hover:text-black transition-all"
        >
          <Plus className="w-5 h-5" />
          New Project
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-3 border-2 border-black font-semibold hover:bg-black hover:text-white transition-all">
          <Filter className="w-5 h-5" />
          Filter
        </button>
      </div>

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="bg-white border-2 border-black p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">
              Create your first project to start tracking measurements and
              billing
            </p>
            <Link
              href="/projects/new"
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 font-semibold border-2 border-black hover:bg-white hover:text-black transition-all"
            >
              <Plus className="w-5 h-5" />
              Create First Project
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="bg-white border-2 border-black p-6 card-hover group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-1 group-hover:underline">
                    {project.name}
                  </h3>
                  <p className="text-sm text-gray-600">{project.clientName}</p>
                </div>
                <span
                  className={`px-3 py-1 text-xs font-semibold ${
                    project.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : project.status === "Completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold">{project.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-semibold">
                    {new Date(project.date).toLocaleDateString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t-2 border-gray-100">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-bold text-lg">
                    ₹{project.totalAmount.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
