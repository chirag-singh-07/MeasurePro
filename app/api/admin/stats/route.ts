import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Project from "@/models/Project";
import Bill from "@/models/Bill";
import Company from "@/models/Company";
import mongoose from "mongoose";

export async function GET() {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    const isSuper = role === "SuperAdmin";
    const isAdmin = role === "Admin";

    if (!session || (!isSuper && !isAdmin)) {
      return NextResponse.json(
        { error: "Unauthorized access detected." },
        { status: 403 },
      );
    }

    const companyId = (session.user as any).companyId;
    await connectDB();

    // Stats Query Configuration (Filter if localized admin)
    const companyFilter = isSuper
      ? {}
      : { companyId: new mongoose.Types.ObjectId(companyId) };

    const companyCountFilter = isSuper
      ? {}
      : { _id: new mongoose.Types.ObjectId(companyId) };

    // System-wide or Company-wide counts
    const [userCount, projectCount, billCount, companyCount] = await Promise.all([
      User.countDocuments(companyFilter),
      Project.countDocuments(companyFilter),
      Bill.countDocuments(companyFilter),
      Company.countDocuments(companyCountFilter),
    ]);

    // Active project distribution (counts only)
    const projectStatusDistribution = await Project.aggregate([
      { $match: companyFilter },
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    // System Health Insight (Recent User Onboarding)
    const recentUsers = await User.find(companyFilter)
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name email role companyId createdAt")
      .populate("companyId", "name")
      .lean();

    return NextResponse.json({
      summary: {
        totalUsers: userCount,
        totalCompanies: companyCount,
        totalProjects: projectCount,
        totalBills: billCount,
      },
      projectDistribution: projectStatusDistribution.map((s) => ({
        name: s._id,
        value: s.count,
      })),
      recentOnboarding: recentUsers,
      dbStatus:
        mongoose.connection.readyState === 1 ? "Healthy" : "Check Connection",
    });
  } catch (error: any) {
    console.error("SuperAdmin stats error:", error);
    return NextResponse.json(
      { error: "System failure in SuperAdmin node" },
      { status: 500 },
    );
  }
}
