import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import Company from "@/models/Company";

export async function POST(request: NextRequest) {
  try {
    const { companyName, name, email, password } = await request.json();

    // Validation
    if (!companyName || !name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 400 },
      );
    }

    // Create company
    const company = await Company.create({
      name: companyName,
      subscriptionPlan: "Basic",
      projectLimit: 5,
    });

    // Create admin user
    const user = await User.create({
      email,
      password,
      name,
      role: "Admin",
      companyId: company._id,
    });

    return NextResponse.json(
      {
        message: "Account created successfully",
        userId: user._id,
        companyId: company._id,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "An error occurred during signup" },
      { status: 500 },
    );
  }
}
