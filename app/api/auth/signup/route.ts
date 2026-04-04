import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import UserModel from "@/models/User";
import CompanyModel from "@/models/Company";

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, companyName } = await request.json();

    // Validation
    if (!email || !password || !name || !companyName) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Create company first
    const company = await CompanyModel.create({
      name: companyName,
      subscriptionPlan: "Basic",
      projectLimit: 5,
    });

    // Create user - password will be hashed by the model's pre-save hook
    const user = await UserModel.create({
      email,
      name,
      password, // Don't hash here - let the model do it
      role: "Admin",
      companyId: company._id,
    });

    // Update company with owner
    await CompanyModel.findByIdAndUpdate(company._id, { owner: user._id });

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully",
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          companyId: company._id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "An error occurred during signup",
      },
      { status: 500 }
    );
  }
}
