/**
 * Query Optimization Utilities
 * Helpers for optimized database queries with caching
 */

import connectDB from "./mongodb";
import Project from "@/models/Project";
import SupportTicket from "@/models/SupportTicket";
import UserModel from "@/models/User";
import {
  getCachedDocument,
  getCachedDocumentList,
  cacheDocument,
  cacheDocumentList,
  invalidateDocumentCache,
  invalidateDocumentListCache,
} from "./cache-utils";

/**
 * Optimized project queries
 */
export const ProjectQueries = {
  /**
   * Get project by ID with caching
   */
  async getById(projectId: string) {
    // Check cache first
    let project = getCachedDocument("project", projectId);
    if (project) return project;

    // If not cached, fetch from DB
    await connectDB();
    project = await Project.findById(projectId).lean();

    if (project) {
      cacheDocument("project", projectId, project, 10 * 60 * 1000); // 10 minutes
    }

    return project;
  },

  /**
   * Get projects by company with caching
   */
  async getByCompany(
    companyId: string,
    filters: { status?: string; limit?: number; skip?: number } = {}
  ) {
    const cacheKey = { companyId, ...filters };
    let projects = getCachedDocumentList("projects-list", cacheKey);

    if (projects) return projects;

    await connectDB();
    const query = Project.find({ companyId });

    if (filters.status) {
      query.where("status").equals(filters.status);
    }

    projects = await query
      .sort({ createdAt: -1 })
      .skip(filters.skip || 0)
      .limit(filters.limit || 20)
      .lean();

    cacheDocumentList("projects-list", cacheKey, projects, 10 * 60 * 1000);
    return projects;
  },

  /**
   * Create project and invalidate cache
   */
  async create(data: any) {
    await connectDB();
    const project = await Project.create(data);

    // Invalidate company's project list cache
    invalidateDocumentListCache("projects-list");

    return project;
  },

  /**
   * Update project and invalidate cache
   */
  async update(projectId: string, data: any) {
    await connectDB();
    const project = await Project.findByIdAndUpdate(projectId, data, {
      new: true,
    }).lean();

    // Invalidate specific project and lists
    invalidateDocumentCache("project", projectId);
    invalidateDocumentListCache("projects-list");

    return project;
  },

  /**
   * Delete project and invalidate cache
   */
  async delete(projectId: string) {
    await connectDB();
    await Project.findByIdAndDelete(projectId);

    // Invalidate caches
    invalidateDocumentCache("project", projectId);
    invalidateDocumentListCache("projects-list");
  },

  /**
   * Get projects count by company
   */
  async countByCompany(companyId: string) {
    await connectDB();
    return await Project.countDocuments({ companyId });
  },
};

/**
 * Optimized user queries
 */
export const UserQueries = {
  /**
   * Get user by ID with caching
   */
  async getById(userId: string, includePassword = false) {
    let user = getCachedDocument("user", userId);
    if (user && !includePassword) return user;

    await connectDB();
    const query = UserModel.findById(userId);
    if (includePassword) {
      query.select("+password");
    }
    user = await query.lean();

    if (user && !includePassword) {
      cacheDocument("user", userId, user, 15 * 60 * 1000); // 15 minutes
    }

    return user;
  },

  /**
   * Get user by email (bypass cache for security)
   */
  async getByEmail(email: string, includePassword = false) {
    await connectDB();
    const query = UserModel.findOne({ email: email.toLowerCase() });
    if (includePassword) {
      query.select("+password");
    }
    return await query.lean();
  },

  /**
   * Get users by company with caching
   */
  async getByCompany(companyId: string, filters: { role?: string } = {}) {
    const cacheKey = { companyId, ...filters };
    let users = getCachedDocumentList("users-list", cacheKey);

    if (users) return users;

    await connectDB();
    const query = UserModel.find({ companyId });

    if (filters.role) {
      query.where("role").equals(filters.role);
    }

    users = await query.sort({ createdAt: -1 }).lean();

    cacheDocumentList("users-list", cacheKey, users, 15 * 60 * 1000);
    return users;
  },

  /**
   * Create user and invalidate cache
   */
  async create(data: any) {
    await connectDB();
    const user = await UserModel.create(data);

    // Invalidate users list
    invalidateDocumentListCache("users-list");

    return user;
  },

  /**
   * Update user and invalidate cache
   */
  async update(userId: string, data: any) {
    await connectDB();
    const user = await UserModel.findByIdAndUpdate(userId, data, {
      new: true,
    }).lean();

    // Invalidate caches
    invalidateDocumentCache("user", userId);
    invalidateDocumentListCache("users-list");

    return user;
  },

  /**
   * Get users count by company
   */
  async countByCompany(companyId: string) {
    await connectDB();
    return await UserModel.countDocuments({ companyId });
  },
};

/**
 * Optimized ticket queries
 */
export const TicketQueries = {
  /**
   * Get ticket by ID with caching
   */
  async getById(ticketId: string) {
    let ticket = getCachedDocument("ticket", ticketId);
    if (ticket) return ticket;

    await connectDB();
    ticket = await SupportTicket.findById(ticketId)
      .populate("createdBy", "email name")
      .populate("assignedTo", "email name")
      .lean();

    if (ticket) {
      cacheDocument("ticket", ticketId, ticket, 10 * 60 * 1000); // 10 minutes
    }

    return ticket;
  },

  /**
   * Get tickets by company with caching and filters
   */
  async getByCompany(
    companyId: string,
    filters: {
      status?: string;
      priority?: string;
      category?: string;
      limit?: number;
      skip?: number;
    } = {}
  ) {
    const cacheKey = { companyId, ...filters };
    let tickets = getCachedDocumentList("ticket", cacheKey);

    if (tickets) return tickets;

    await connectDB();
    const query = SupportTicket.find({ companyId });

    if (filters.status) query.where("status").equals(filters.status);
    if (filters.priority) query.where("priority").equals(filters.priority);
    if (filters.category) query.where("category").equals(filters.category);

    tickets = await query
      .sort({ createdAt: -1 })
      .skip(filters.skip || 0)
      .limit(filters.limit || 20)
      .populate("createdBy", "email name")
      .lean();

    cacheDocumentList("ticket", cacheKey, tickets, 10 * 60 * 1000);
    return tickets;
  },

  /**
   * Create ticket and invalidate cache
   */
  async create(data: any) {
    await connectDB();
    const ticket = await SupportTicket.create(data);

    // Invalidate tickets list
    invalidateDocumentListCache("ticket");

    return ticket;
  },

  /**
   * Update ticket and invalidate cache
   */
  async update(ticketId: string, data: any) {
    await connectDB();
    const ticket = await SupportTicket.findByIdAndUpdate(ticketId, data, {
      new: true,
    }).lean();

    // Invalidate caches
    invalidateDocumentCache("ticket", ticketId);
    invalidateDocumentListCache("ticket");

    return ticket;
  },

  /**
   * Get tickets count by company
   */
  async countByCompany(
    companyId: string,
    filters: { status?: string } = {}
  ) {
    await connectDB();
    const query = SupportTicket.countDocuments({ companyId });

    if (filters.status) {
      query.where("status").equals(filters.status);
    }

    return await query;
  },
};

/**
 * Batch operations for efficiency
 */
export const BatchQueries = {
  /**
   * Get multiple documents in a single query
   */
  async getMultipleProjects(projectIds: string[]) {
    await connectDB();
    return await Project.find({ _id: { $in: projectIds } }).lean();
  },

  /**
   * Get multiple users in a single query
   */
  async getMultipleUsers(userIds: string[]) {
    await connectDB();
    return await UserModel.find({ _id: { $in: userIds } }).lean();
  },

  /**
   * Get company-wide statistics
   */
  async getCompanyStats(companyId: string) {
    await connectDB();

    const [projectCount, userCount, ticketCount] = await Promise.all([
      Project.countDocuments({ companyId }),
      UserModel.countDocuments({ companyId }),
      SupportTicket.countDocuments({ companyId }),
    ]);

    return {
      projects: projectCount,
      users: userCount,
      tickets: ticketCount,
      totalItems: projectCount + userCount + ticketCount,
    };
  },
};
