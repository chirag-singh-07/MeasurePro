import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Company from "@/models/Company";

// GET all users (System-wide)
export async function GET() {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    const isSuper = role === "SuperAdmin";
    const isAdmin = role === "Admin";

    if (!session || (!isSuper && !isAdmin)) {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 },
      );
    }

    const companyId = (session.user as any).companyId;
    await connectDB();

    const query = isSuper
      ? {}
      : { companyId: new (require("mongoose").Types.ObjectId)(companyId) };

    const users = await User.find(query)
      .populate("companyId", "name")
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json(users);
  } catch (error: any) {
    console.error("Admin Users GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}

// PATCH update user (system role adjustment)
export async function PATCH(request: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== "SuperAdmin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 },
      );
    }

    const { userId, role } = await request.json();
    if (!userId || !role) {
      return NextResponse.json(
        { error: "UserId and Role are required" },
        { status: 400 },
      );
    }

    // Role safety check
    const allowedRoles = ["SuperAdmin", "Admin", "Manager", "Worker"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json(
        { error: "Invalid role specified" },
        { status: 400 },
      );
    }

    await connectDB();

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role },
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "User protocol updated successfully",
      user: updatedUser,
    });
  } catch (error: any) {
    console.error("Admin Users PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }
}

// DELETE user (System wipe)
export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session || (session.user as any).role !== "SuperAdmin") {
      return NextResponse.json(
        { error: "Unauthorized access" },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    await connectDB();

    // Ensure we don't delete the last SuperAdmin (optional safety)
    const superAdminCount = await User.countDocuments({ role: "SuperAdmin" });
    const targetUser = await User.findById(userId);
    if (targetUser?.role === "SuperAdmin" && superAdminCount <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the final SuperAdmin access point" },
        { status: 400 },
      );
    }

    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      message: "User session terminated and data purged",
    });
  } catch (error: any) {
    console.error("Admin Users DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to purge user" },
      { status: 500 },
    );
  }
}
