import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { client } from "./mongodb";
import { headers, cookies } from "next/headers";
import connectDB from "./mongodb";
import UserModel from "@/models/User";
import CompanyModel from "@/models/Company";

export const authInstance = betterAuth({
  database: mongodbAdapter(client.db()),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "Worker",
      },
      companyId: {
        type: "string",
        required: false,
      },
    },
  },
});

/** Shape of the enriched user returned by auth() */
export interface EnrichedUser {
  id: string;
  email: string;
  name: string;
  image?: string | null;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  companyId: string;
  companyName: string;
}

export interface EnrichedSession {
  user: EnrichedUser;
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
    createdAt: Date;
    updatedAt: Date;
    ipAddress?: string | null;
    userAgent?: string | null;
  };
}

export async function auth(): Promise<EnrichedSession | null> {
  try {
    // Read auth-token cookie (server-side)
    const cookieStore = await cookies();
    const authToken = cookieStore.get("auth-token")?.value;

    if (!authToken) {
      return null;
    }

    // Connect and fetch user by ID (without populate to avoid schema registration issues)
    await connectDB();
    const dbUser = await UserModel.findById(authToken).lean();

    if (!dbUser) {
      return null;
    }

    // Manually fetch company to avoid populate schema issues
    let companyName = "";
    let companyId = "";
    
    if (dbUser.companyId) {
      try {
        const company = await CompanyModel.findById(dbUser.companyId).lean();
        if (company) {
          companyName = company.name;
          companyId = company._id?.toString() || "";
        }
      } catch (err) {
        // Failed to fetch company
        // Continue without company info
      }
    }

    // Return enriched session
    const enrichedSession: EnrichedSession = {
      user: {
        id: dbUser._id?.toString() ?? "",
        email: dbUser.email ?? "",
        name: dbUser.name ?? "",
        image: null,
        emailVerified: true,
        createdAt: dbUser.createdAt ?? new Date(),
        updatedAt: dbUser.updatedAt ?? new Date(),
        role: dbUser.role as string,
        companyId: companyId,
        companyName: companyName,
      },
      session: {
        id: authToken,
        userId: dbUser._id?.toString() ?? "",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        token: authToken,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };

    return enrichedSession;
  } catch (error) {
    return null;
  }
}

// Re-export the type for use elsewhere
export type AuthSession = Awaited<ReturnType<typeof auth>>;

