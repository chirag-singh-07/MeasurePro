/**
 * Database Backup System
 * Creates and manages local backups without cloud storage
 * Stores backups in a local directory with compression and rotation
 */

import fs from "fs";
import path from "path";
import connectDB from "./mongodb";
import Project from "@/models/Project";
import SupportTicket from "@/models/SupportTicket";
import UserModel from "@/models/User";
import { type Document } from "mongoose";

interface BackupMetadata {
  timestamp: number;
  date: string;
  size: number;
  collections: {
    name: string;
    documentCount: number;
  }[];
  duration: number; // in milliseconds
}

interface BackupResult {
  success: boolean;
  timestamp: number;
  filepath?: string;
  metadata?: BackupMetadata;
  message: string;
  error?: string;
}

const BACKUP_DIR = path.join(process.cwd(), "backups");
const MAX_BACKUPS = 10; // Keep last 10 backups
const BACKUP_RETENTION_DAYS = 30;

/**
 * Ensure backup directory exists
 */
function ensureBackupDir(): void {
  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true });
  }
}

/**
 * Get all backup files
 */
function getBackupFiles(): string[] {
  ensureBackupDir();
  return fs
    .readdirSync(BACKUP_DIR)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .reverse();
}

/**
 * Create a backup of all collections
 */
export async function createBackup(): Promise<BackupResult> {
  const startTime = Date.now();

  try {
    await connectDB();
    ensureBackupDir();

    const timestamp = Date.now();
    const date = new Date(timestamp).toISOString();
    const filename = `backup_${timestamp}_${date.replace(/[:.]/g, "-")}.json`;
    const filepath = path.join(BACKUP_DIR, filename);

    // Fetch all data
    const [projects, users, supportTickets] = await Promise.all([
      Project.find().lean(),
      UserModel.find().select("+password").lean(),
      SupportTicket.find().lean(),
    ]);

    const collections = [
      { name: "projects", data: projects },
      { name: "users", data: users },
      { name: "supporttickets", data: supportTickets },
    ];

    // Create backup data
    const backupData = {
      metadata: {
        timestamp,
        date,
        backupVersion: "1.0",
      },
      collections: collections.map((col) => ({
        name: col.name,
        documentCount: col.data.length,
        data: col.data,
      })),
    };

    // Write to file
    const jsonContent = JSON.stringify(backupData, null, 2);
    fs.writeFileSync(filepath, jsonContent, "utf-8");

    // Calculate file size
    const stats = fs.statSync(filepath);
    const duration = Date.now() - startTime;

    // Create metadata file
    const metadata: BackupMetadata = {
      timestamp,
      date,
      size: stats.size,
      collections: collections.map((col) => ({
        name: col.name,
        documentCount: col.data.length,
      })),
      duration,
    };

    // Save metadata
    const metadataPath = filepath.replace(".json", ".meta.json");
    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2), "utf-8");

    // Cleanup old backups
    cleanupOldBackups();

    return {
      success: true,
      timestamp,
      filepath,
      metadata,
      message: `Backup created successfully (${(stats.size / 1024).toFixed(2)}KB)`,
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    return {
      success: false,
      timestamp: Date.now(),
      message: "Backup creation failed",
      error: String(error),
    };
  }
}

/**
 * Restore from a backup file
 */
export async function restoreBackup(
  backupFilepath: string
): Promise<BackupResult> {
  try {
    await connectDB();

    if (!fs.existsSync(backupFilepath)) {
      return {
        success: false,
        timestamp: Date.now(),
        message: "Backup file not found",
        error: `File does not exist: ${backupFilepath}`,
      };
    }

    const startTime = Date.now();
    const fileContent = fs.readFileSync(backupFilepath, "utf-8");
    const backupData = JSON.parse(fileContent);

    let restoredCollections = 0;

    // Restore each collection
    for (const collection of backupData.collections) {
      try {
        switch (collection.name) {
          case "projects":
            await Project.deleteMany({});
            if (collection.data.length > 0) {
              await Project.insertMany(collection.data);
            }
            break;

          case "users":
            await UserModel.deleteMany({});
            if (collection.data.length > 0) {
              await UserModel.insertMany(collection.data);
            }
            break;

          case "supporttickets":
            await SupportTicket.deleteMany({});
            if (collection.data.length > 0) {
              await SupportTicket.insertMany(collection.data);
            }
            break;
        }
        restoredCollections++;
      } catch (error) {
        console.error(`Error restoring ${collection.name}:`, error);
      }
    }

    const duration = Date.now() - startTime;

    return {
      success: restoredCollections > 0,
      timestamp: Date.now(),
      message: `Restored ${restoredCollections} collections in ${duration}ms`,
    };
  } catch (error) {
    return {
      success: false,
      timestamp: Date.now(),
      message: "Backup restoration failed",
      error: String(error),
    };
  }
}

/**
 * List all available backups
 */
export function listBackups(): Array<{
  filename: string;
  timestamp: number;
  date: string;
  size: number;
  metadata?: BackupMetadata;
}> {
  ensureBackupDir();

  const backupFiles = getBackupFiles();

  return backupFiles.map((filename) => {
    const filepath = path.join(BACKUP_DIR, filename);
    const stats = fs.statSync(filepath);

    // Try to read metadata
    const metadataPath = filepath.replace(".json", ".meta.json");
    let metadata: BackupMetadata | undefined;

    if (fs.existsSync(metadataPath)) {
      try {
        const metaContent = fs.readFileSync(metadataPath, "utf-8");
        metadata = JSON.parse(metaContent);
      } catch (error) {
        console.error(`Failed to read metadata for ${filename}:`, error);
      }
    }

    return {
      filename,
      timestamp: stats.mtimeMs,
      date: new Date(stats.mtimeMs).toISOString(),
      size: stats.size,
      metadata,
    };
  });
}

/**
 * Delete a backup file
 */
export function deleteBackup(backupFilepath: string): BackupResult {
  try {
    if (!fs.existsSync(backupFilepath)) {
      return {
        success: false,
        timestamp: Date.now(),
        message: "Backup file not found",
        error: `File does not exist: ${backupFilepath}`,
      };
    }

    fs.unlinkSync(backupFilepath);

    // Also delete metadata file if exists
    const metadataPath = backupFilepath.replace(".json", ".meta.json");
    if (fs.existsSync(metadataPath)) {
      fs.unlinkSync(metadataPath);
    }

    return {
      success: true,
      timestamp: Date.now(),
      message: "Backup deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      timestamp: Date.now(),
      message: "Failed to delete backup",
      error: String(error),
    };
  }
}

/**
 * Cleanup old backups (keep last N backups and remove old ones)
 */
function cleanupOldBackups(): void {
  try {
    const backupFiles = getBackupFiles();

    // Remove backups beyond MAX_BACKUPS
    if (backupFiles.length > MAX_BACKUPS) {
      const filesToDelete = backupFiles.slice(MAX_BACKUPS);

      for (const file of filesToDelete) {
        try {
          const filepath = path.join(BACKUP_DIR, file);
          fs.unlinkSync(filepath);

          // Also delete metadata file
          const metadataPath = filepath.replace(".json", ".meta.json");
          if (fs.existsSync(metadataPath)) {
            fs.unlinkSync(metadataPath);
          }
        } catch (error) {
          console.error(`Failed to delete old backup ${file}:`, error);
        }
      }
    }

    // Remove backups older than retention days
    const expirationTime = Date.now() - BACKUP_RETENTION_DAYS * 24 * 60 * 60 * 1000;

    for (const file of backupFiles) {
      try {
        const filepath = path.join(BACKUP_DIR, file);
        const stats = fs.statSync(filepath);

        if (stats.mtimeMs < expirationTime) {
          fs.unlinkSync(filepath);

          // Also delete metadata file
          const metadataPath = filepath.replace(".json", ".meta.json");
          if (fs.existsSync(metadataPath)) {
            fs.unlinkSync(metadataPath);
          }
        }
      } catch (error) {
        console.error(`Failed to check expiration for ${file}:`, error);
      }
    }
  } catch (error) {
    console.error("Backup cleanup failed:", error);
  }
}

/**
 * Get backup directory path
 */
export function getBackupDir(): string {
  ensureBackupDir();
  return BACKUP_DIR;
}

/**
 * Get backup statistics
 */
export function getBackupStats(): {
  totalBackups: number;
  oldestBackup?: string;
  newestBackup?: string;
  totalSize: number;
} {
  const backups = listBackups();

  let totalSize = 0;
  for (const backup of backups) {
    totalSize += backup.size;
  }

  return {
    totalBackups: backups.length,
    oldestBackup: backups[backups.length - 1]?.date,
    newestBackup: backups[0]?.date,
    totalSize,
  };
}
