import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables from the root .env.local or .env
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

async function seedSuperAdmin() {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    console.error("CRITICAL ERROR: MONGODB_URI is not defined in .env.local");
    process.exit(1);
  }

  try {
    console.log("Connecting to Database node...");
    await mongoose.connect(MONGODB_URI);
    console.log("Database connection established.");

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection is not fully initialized.");
    }

    // 1. Ensure 'System Admin' Company Exists
    let systemCompany = await db
      .collection("companies")
      .findOne({ name: "GLOBAL_SYSTEM_ADMIN" });

    if (!systemCompany) {
      console.log("Generating Global Admin Partition...");
      const result = await db.collection("companies").insertOne({
        name: "GLOBAL_SYSTEM_ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      systemCompany = { _id: result.insertedId } as any;
    }

    if (!systemCompany) {
      throw new Error("Failed to resolve system company partition.");
    }

    const adminEmail = "superadmin@gmail.com";
    const adminPassword = "SuperAdmin123"; // You can change this
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // 2. Check if SuperAdmin already exists
    const existingUser = await db
      .collection("users")
      .findOne({ email: adminEmail });

    if (existingUser) {
      console.log(
        "SuperAdmin account already exists. Updating existing profile...",
      );
      await db.collection("users").updateOne(
        { _id: existingUser._id },
        {
          $set: {
            role: "SuperAdmin",
            updatedAt: new Date(),
          },
        },
      );
    } else {
      console.log("Constructing New SuperAdmin Profile...");
      await db.collection("users").insertOne({
        name: "MeasurePro Master",
        email: adminEmail,
        password: hashedPassword,
        role: "SuperAdmin",
        companyId: systemCompany._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    console.log("\n==============================================");
    console.log("🛡️  PROTOCOL COMPLETE: SuperAdmin Account Ready");
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    console.log("==============================================\n");

    process.exit(0);
  } catch (error) {
    console.error("CRITICAL SYSTEM FAILURE DURING SEEDING:", error);
    process.exit(1);
  }
}

seedSuperAdmin();
