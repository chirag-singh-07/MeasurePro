import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  createDatabaseIndexes,
  getIndexInfo,
  getCollectionStats,
} from "@/lib/database-indexes";
import {
  createBackup,
  restoreBackup,
  listBackups,
  deleteBackup,
  getBackupStats,
  getBackupDir,
} from "@/lib/database-backup";
import {
  getCacheStats,
  clearAllCache,
  resetCacheStats,
  getHealthReport,
} from "@/lib/cache-utils";

/**
 * Database maintenance and optimization endpoints
 * POST /api/admin/db-management - Perform database operations
 * GET /api/admin/db-management - Get database stats
 */

export async function POST(request: NextRequest) {
  try {
    // Only allow authenticated users
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin (optional - adjust based on your role system)
    // if (session.user.role !== 'Admin') {
    //   return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    // }

    const { action, backupPath } = await request.json();

    switch (action) {
      case "create-indexes":
        const indexResults = await createDatabaseIndexes();
        return NextResponse.json({
          success: true,
          action: "create-indexes",
          results: indexResults,
        });

      case "get-indexes":
        const indexes = await getIndexInfo();
        return NextResponse.json({
          success: true,
          action: "get-indexes",
          indexes,
        });

      case "get-stats":
        const stats = await getCollectionStats();
        return NextResponse.json({
          success: true,
          action: "get-stats",
          stats,
        });

      case "create-backup":
        const backupResult = await createBackup();
        return NextResponse.json({
          ...backupResult,
          action: "create-backup",
        });

      case "list-backups":
        const backups = listBackups();
        const backupStats = getBackupStats();
        return NextResponse.json({
          success: true,
          action: "list-backups",
          backups,
          stats: backupStats,
        });

      case "restore-backup":
        if (!backupPath) {
          return NextResponse.json(
            { error: "Backup path is required" },
            { status: 400 }
          );
        }
        const restoreResult = await restoreBackup(backupPath);
        return NextResponse.json({
          ...restoreResult,
          action: "restore-backup",
        });

      case "delete-backup":
        if (!backupPath) {
          return NextResponse.json(
            { error: "Backup path is required" },
            { status: 400 }
          );
        }
        const deleteResult = deleteBackup(backupPath);
        return NextResponse.json({
          ...deleteResult,
          action: "delete-backup",
        });

      case "clear-cache":
        clearAllCache();
        return NextResponse.json({
          success: true,
          action: "clear-cache",
          message: "Cache cleared successfully",
        });

      case "reset-cache-stats":
        resetCacheStats();
        return NextResponse.json({
          success: true,
          action: "reset-cache-stats",
          message: "Cache statistics reset",
        });

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Database management error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Only allow authenticated users
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    switch (query) {
      case "cache-stats":
        const cacheStats = getCacheStats();
        return NextResponse.json({
          success: true,
          query: "cache-stats",
          data: cacheStats,
        });

      case "health":
        const health = getHealthReport();
        return NextResponse.json({
          success: true,
          query: "health",
          data: health,
        });

      case "backup-dir":
        const backupDir = getBackupDir();
        return NextResponse.json({
          success: true,
          query: "backup-dir",
          data: { path: backupDir },
        });

      case "all-stats":
        const allStats = {
          cache: getCacheStats(),
          backups: getBackupStats(),
          health: getHealthReport(),
        };
        return NextResponse.json({
          success: true,
          query: "all-stats",
          data: allStats,
        });

      default:
        return NextResponse.json(
          { error: "Invalid query parameter" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Database query error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
