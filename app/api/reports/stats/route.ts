import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import Bill from "@/models/Bill";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const range = searchParams.get("range") || "Last 6 months";
    
    const companyId = (session.user as any).companyId;
    await connectDB();

    // 1. Project stats
    const projectStats = await Project.aggregate([
      { $match: { companyId: new (require('mongoose')).Types.ObjectId(companyId) } },
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    // 2. Revenue stats (from Bills)
    const totalRevenue = await Bill.aggregate([
      { $match: { companyId: new (require('mongoose')).Types.ObjectId(companyId) } },
      { $group: { _id: null, total: { $sum: "$totalAmount" }, count: { $sum: 1 } } }
    ]);

    // 3. Revenue over Time (Based on range)
    let startDate = new Date();
    let groupBy: any = { month: { $month: "$billDate" }, year: { $year: "$billDate" } };
    let sortBy: any = { "_id.year": 1, "_id.month": 1 };

    if (range === "Last 7 days") {
      startDate.setDate(startDate.getDate() - 7);
      groupBy = { day: { $dayOfMonth: "$billDate" }, month: { $month: "$billDate" } };
      sortBy = { "_id.month": 1, "_id.day": 1 };
    } else if (range === "Last 30 days") {
      startDate.setDate(startDate.getDate() - 30);
      groupBy = { day: { $dayOfMonth: "$billDate" }, month: { $month: "$billDate" } };
      sortBy = { "_id.month": 1, "_id.day": 1 };
    } else if (range === "Last 3 months") {
      startDate.setMonth(startDate.getMonth() - 3);
    } else {
      startDate.setMonth(startDate.getMonth() - 6);
    }
    
    const timeSeriesRevenue = await Bill.aggregate([
      { 
        $match: { 
          companyId: new (require('mongoose')).Types.ObjectId(companyId),
          billDate: { $gte: startDate }
        } 
      },
      {
        $group: {
          _id: groupBy,
          revenue: { $sum: "$totalAmount" }
        }
      },
      { $sort: sortBy }
    ]);

    // 4. Top Clients by Revenue
    const topClients = await Bill.aggregate([
      { $match: { companyId: new (require('mongoose')).Types.ObjectId(companyId) } },
      {
        $group: {
          _id: "$clientName",
          total: { $sum: "$totalAmount" }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 5 }
    ]);

    // 5. Recent Activity (Last 5 bills)
    const recentBills = await Bill.find({ companyId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('billNumber projectName clientName totalAmount billDate')
      .lean();

    // 6. Top Locations (from Projects)
    const topLocations = await Project.aggregate([
       { $match: { companyId: new (require('mongoose')).Types.ObjectId(companyId) } },
       { $group: { _id: "$location", count: { $sum: 1 } } },
       { $sort: { count: -1 } },
       { $limit: 3 }
    ]);

    // Format data for charts
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedTimeSeries = timeSeriesRevenue.map(m => ({
      name: range.includes("days") 
        ? `${m._id.day} ${months[m._id.month - 1]}`
        : `${months[m._id.month - 1]}`,
      revenue: m.revenue
    }));

    return NextResponse.json({
      summary: {
        totalProjects: projectStats.reduce((acc, curr) => acc + curr.count, 0),
        totalBills: totalRevenue[0]?.count || 0,
        totalRevenueValue: totalRevenue[0]?.total || 0,
        averageBillValue: (totalRevenue[0]?.total / totalRevenue[0]?.count) || 0,
      },
      projectDistribution: projectStats.map(s => ({ name: s._id, value: s.count })),
      monthlyRevenue: formattedTimeSeries,
      topClients: topClients.map(c => ({ name: c._id, revenue: c.total })),
      recentBills,
      topLocations: topLocations.map(l => ({ name: l._id, count: l.count }))
    });
  } catch (error: any) {
    console.error("Get reports error:", error);
    return NextResponse.json(
      { error: "An error occurred while generating reports" },
      { status: 500 },
    );
  }
}
