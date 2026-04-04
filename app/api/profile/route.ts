import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import UserModel from "@/models/User";
import CompanyModel from "@/models/Company";

export async function GET(request: NextRequest) {
  try {
    // Try to get user ID from cookies or headers
    const cookies = request.cookies;
    const authToken = cookies.get("auth-token")?.value;

    console.log("[Profile API] Checking auth token:", authToken ? "✓ Present" : "✗ Missing");

    if (!authToken) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    // Find user by ID (without populate to avoid schema registration issues)
    const dbUser = await UserModel.findById(authToken).lean();

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Manually fetch company to avoid populate schema issues
    let companyName = "";
    let companyId = "";
    let subscriptionPlan = "Basic";
    
    if (dbUser.companyId) {
      try {
        const company = await CompanyModel.findById(dbUser.companyId).lean();
        if (company) {
          companyName = company.name;
          companyId = company._id?.toString() || "";
          subscriptionPlan = (company.subscriptionPlan as string) || "Basic";
        }
      } catch (err) {
        // Failed to fetch company
        // Continue without company info
      }
    }

    const enrichedUser = {
      id: dbUser._id?.toString() ?? "",
      email: dbUser.email ?? "",
      name: dbUser.name ?? "",
      role: dbUser.role as string,
      companyId: companyId,
      companyName: companyName,
      subscriptionPlan: subscriptionPlan,
    };

    console.log("[Profile API] ✓ Returning user data:", { 
      id: enrichedUser.id, 
      email: enrichedUser.email,
      name: enrichedUser.name 
    });

    return NextResponse.json({ user: enrichedUser });
  } catch (error) {
    console.error("[Profile API] ✗ Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}
