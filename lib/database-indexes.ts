/**
 * Database Indexing and Schema Optimization
 * Ensures all collections have proper indexes for optimal query performance
 */

import connectDB from "./mongodb";
import Project from "@/models/Project";
import SupportTicket from "@/models/SupportTicket";
import UserModel from "@/models/User";
import { type Document } from "mongoose";

interface IndexInfo {
  collection: string;
  indexes: string[];
  status: "success" | "error";
  message?: string;
}

/**
 * Create all necessary indexes for optimal database performance
 */
export async function createDatabaseIndexes(): Promise<IndexInfo[]> {
  try {
    await connectDB();

    const results: IndexInfo[] = [];

    // Project indexes
    try {
      await Project.collection.createIndex({ companyId: 1, createdAt: -1 });
      await Project.collection.createIndex({ companyId: 1, status: 1 });
      await Project.collection.createIndex({ createdBy: 1 });
      await Project.collection.createIndex({ clientName: 1 });
      await Project.collection.createIndex({ date: 1 });

      results.push({
        collection: "projects",
        indexes: [
          "companyId + createdAt",
          "companyId + status",
          "createdBy",
          "clientName",
          "date",
        ],
        status: "success",
        message: "Project indexes created successfully",
      });
    } catch (error) {
      results.push({
        collection: "projects",
        indexes: [],
        status: "error",
        message: `Failed to create project indexes: ${error}`,
      });
    }

    // User indexes
    try {
      await UserModel.collection.createIndex({ email: 1 }, { unique: true });
      await UserModel.collection.createIndex({ companyId: 1 });
      await UserModel.collection.createIndex({ role: 1 });

      results.push({
        collection: "users",
        indexes: ["email (unique)", "companyId", "role"],
        status: "success",
        message: "User indexes created successfully",
      });
    } catch (error) {
      results.push({
        collection: "users",
        indexes: [],
        status: "error",
        message: `Failed to create user indexes: ${error}`,
      });
    }

    // SupportTicket indexes
    try {
      await SupportTicket.collection.createIndex({
        companyId: 1,
        createdAt: -1,
      });
      await SupportTicket.collection.createIndex({ companyId: 1, status: 1 });
      await SupportTicket.collection.createIndex({
        createdBy: 1,
        companyId: 1,
      });
      await SupportTicket.collection.createIndex({ priority: 1 });

      results.push({
        collection: "supporttickets",
        indexes: [
          "companyId + createdAt",
          "companyId + status",
          "createdBy + companyId",
          "priority",
        ],
        status: "success",
        message: "Support ticket indexes created successfully",
      });
    } catch (error) {
      results.push({
        collection: "supporttickets",
        indexes: [],
        status: "error",
        message: `Failed to create support ticket indexes: ${error}`,
      });
    }

    return results;
  } catch (error) {
    return [
      {
        collection: "database",
        indexes: [],
        status: "error",
        message: `Database connection failed: ${error}`,
      },
    ];
  }
}

/**
 * Get index information for all collections
 */
export async function getIndexInfo(): Promise<IndexInfo[]> {
  try {
    await connectDB();

    const results: IndexInfo[] = [];

    // Get Project indexes
    try {
      const projectIndexes = await Project.collection.getIndexes();
      results.push({
        collection: "projects",
        indexes: Object.keys(projectIndexes),
        status: "success",
      });
    } catch (error) {
      results.push({
        collection: "projects",
        indexes: [],
        status: "error",
        message: `Failed to fetch project indexes: ${error}`,
      });
    }

    // Get User indexes
    try {
      const userIndexes = await UserModel.collection.getIndexes();
      results.push({
        collection: "users",
        indexes: Object.keys(userIndexes),
        status: "success",
      });
    } catch (error) {
      results.push({
        collection: "users",
        indexes: [],
        status: "error",
        message: `Failed to fetch user indexes: ${error}`,
      });
    }

    // Get SupportTicket indexes
    try {
      const ticketIndexes = await SupportTicket.collection.getIndexes();
      results.push({
        collection: "supporttickets",
        indexes: Object.keys(ticketIndexes),
        status: "success",
      });
    } catch (error) {
      results.push({
        collection: "supporttickets",
        indexes: [],
        status: "error",
        message: `Failed to fetch support ticket indexes: ${error}`,
      });
    }

    return results;
  } catch (error) {
    return [
      {
        collection: "database",
        indexes: [],
        status: "error",
        message: `Database connection failed: ${error}`,
      },
    ];
  }
}

/**
 * Drop all indexes except the default _id index
 */
export async function dropAllIndexes(): Promise<IndexInfo[]> {
  try {
    await connectDB();

    const results: IndexInfo[] = [];

    // Drop Project indexes
    try {
      await Project.collection.dropIndexes();
      results.push({
        collection: "projects",
        indexes: [],
        status: "success",
        message: "All project indexes dropped",
      });
    } catch (error) {
      results.push({
        collection: "projects",
        indexes: [],
        status: "error",
        message: `Failed to drop project indexes: ${error}`,
      });
    }

    // Drop User indexes
    try {
      await UserModel.collection.dropIndexes();
      results.push({
        collection: "users",
        indexes: [],
        status: "success",
        message: "All user indexes dropped",
      });
    } catch (error) {
      results.push({
        collection: "users",
        indexes: [],
        status: "error",
        message: `Failed to drop user indexes: ${error}`,
      });
    }

    // Drop SupportTicket indexes
    try {
      await SupportTicket.collection.dropIndexes();
      results.push({
        collection: "supporttickets",
        indexes: [],
        status: "success",
        message: "All support ticket indexes dropped",
      });
    } catch (error) {
      results.push({
        collection: "supporttickets",
        indexes: [],
        status: "error",
        message: `Failed to drop support ticket indexes: ${error}`,
      });
    }

    return results;
  } catch (error) {
    return [
      {
        collection: "database",
        indexes: [],
        status: "error",
        message: `Database connection failed: ${error}`,
      },
    ];
  }
}

/**
 * Get collection statistics
 */
export async function getCollectionStats(): Promise<
  Record<
    string,
    {
      count: number;
      size: number;
      avgDocumentSize: number;
      indexes: number;
    }
  >
> {
  try {
    await connectDB();

    const stats: Record<
      string,
      { count: number; size: number; avgDocumentSize: number; indexes: number }
    > = {};

    // Get stats for each collection
    const collections = [
      { name: "projects", model: Project },
      { name: "users", model: UserModel },
      { name: "supporttickets", model: SupportTicket },
    ];

    for (const { name, model } of collections) {
      try {
        const count = await model.countDocuments();
        const stats_obj = await model.collection.stats();

        stats[name] = {
          count,
          size: stats_obj.size || 0,
          avgDocumentSize: stats_obj.avgObjSize || 0,
          indexes: Object.keys(await model.collection.getIndexes()).length,
        };
      } catch (error) {
        console.error(`Failed to get stats for ${name}:`, error);
      }
    }

    return stats;
  } catch (error) {
    console.error("Failed to get collection stats:", error);
    return {};
  }
}
