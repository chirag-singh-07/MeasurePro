# Database Improvements & Optimization Guide

## Overview

This document describes the comprehensive database optimization system implemented for MeasurePro, including caching, indexing, backup management, and query optimization - all without requiring cloud platforms.

## Features

### 1. **In-Memory Caching System** (`lib/cache.ts`)

A lightweight, production-ready caching system with:

- **TTL Support**: Set expiration times for cached data
- **Auto Cleanup**: Automatic removal of expired entries every 30 seconds
- **Pattern Matching**: Delete cache keys matching regex patterns
- **Statistics**: Track cache hits, misses, and memory usage
- **Memory Management**: Estimates memory usage of cached data

#### Usage Example:
```typescript
import cache from '@/lib/cache';

// Set value
cache.set('user:123', userData, 5 * 60 * 1000); // 5 minute TTL

// Get value
const data = cache.get('user:123');

// Check if exists
if (cache.has('user:123')) { ... }

// Get statistics
const stats = cache.getStats();
// { hits: 100, misses: 20, size: 5, entries: 150 }
```

### 2. **Database Indexing** (`lib/database-indexes.ts`)

Optimized indexes for all collections:

#### Project Collection
- `companyId + createdAt` - Fast sorting by company and date
- `companyId + status` - Filter projects by status
- `createdBy` - Find projects by creator
- `clientName` - Search by client
- `date` - Sort by project date

#### User Collection
- `email` (unique) - Fast user lookup
- `companyId` - Company user lists
- `role` - Filter by role

#### Support Ticket Collection
- `companyId + createdAt` - Fast ticket listing
- `companyId + status` - Filter by status
- `createdBy + companyId` - User's tickets
- `priority` - Priority filtering

#### Functions:
```typescript
import { createDatabaseIndexes, getIndexInfo, getCollectionStats } from '@/lib/database-indexes';

// Create all indexes
const results = await createDatabaseIndexes();

// Get current indexes
const indexes = await getIndexInfo();

// Get collection stats
const stats = await getCollectionStats();
// { projects: { count: 50, size: 524288, avgDocumentSize: 1024, indexes: 4 }, ... }
```

### 3. **Backup System** (`lib/database-backup.ts`)

Local file-based backup management with automatic rotation:

**Features:**
- Complete data snapshots (projects, users, tickets)
- Metadata tracking for each backup
- Automatic cleanup (keep last 10, older than 30 days)
- Restore from any backup point
- File-based storage (no cloud dependency)

**Backup Directory:** `./backups/`

#### Functions:
```typescript
import { createBackup, restoreBackup, listBackups, getBackupStats } from '@/lib/database-backup';

// Create backup
const result = await createBackup();
// Creates: backup_1712282400000_2024-04-05T10-30-00-000Z.json
// And: backup_1712282400000_2024-04-05T10-30-00-000Z.meta.json

// List all backups
const backups = listBackups();
// [{ filename, timestamp, date, size, metadata }, ...]

// Get backup statistics
const stats = getBackupStats();
// { totalBackups: 3, oldestBackup: '2024-04-04T...', newestBackup: '2024-04-05T...', totalSize: 1024000 }

// Restore from backup
const restoreResult = await restoreBackup('/path/to/backup.json');

// Delete a backup
const deleteResult = deleteBackup('/path/to/backup.json');
```

### 4. **Cache Utilities** (`lib/cache-utils.ts`)

High-level cache management for queries:

**Prefixes:**
- `user` - User documents
- `project` - Project documents
- `ticket` - Support tickets
- `company` - Company data
- `projects-list` - Query results for projects
- `users-list` - Query results for users

#### Functions:
```typescript
import {
  cacheDocument,
  getCachedDocument,
  cacheDocumentList,
  getCachedDocumentList,
  invalidateDocumentCache,
  invalidateDocumentListCache,
  getCacheStats,
  getHealthReport,
} from '@/lib/cache-utils';

// Cache single document
cacheDocument('user', '123', userData);
const cached = getCachedDocument('user', '123');

// Cache query results
cacheDocumentList('projects-list', { companyId: '456' }, projectsArray);
const cachedList = getCachedDocumentList('projects-list', { companyId: '456' });

// Invalidate
invalidateDocumentCache('user', '123');
invalidateDocumentListCache('projects-list');

// Health check
const health = getHealthReport();
// { status: 'healthy' | 'warning' | 'critical', hitRate: 78.5, memoryMb: 25, ... }
```

### 5. **Query Optimizer** (`lib/query-optimizer.ts`)

Pre-built optimized query functions with automatic caching:

#### ProjectQueries
```typescript
import { ProjectQueries } from '@/lib/query-optimizer';

// Get by ID (cached 10 minutes)
const project = await ProjectQueries.getById(projectId);

// Get by company with filters (cached 10 minutes)
const projects = await ProjectQueries.getByCompany(companyId, {
  status: 'Active',
  limit: 20,
  skip: 0
});

// CRUD operations (auto-invalidates cache)
await ProjectQueries.create(newProject);
await ProjectQueries.update(projectId, updates);
await ProjectQueries.delete(projectId);
```

#### UserQueries
```typescript
import { UserQueries } from '@/lib/query-optimizer';

// Similar interface to ProjectQueries
const user = await UserQueries.getById(userId);
const users = await UserQueries.getByCompany(companyId, { role: 'Admin' });
```

#### TicketQueries
```typescript
import { TicketQueries } from '@/lib/query-optimizer';

// Get with auto-population
const ticket = await TicketQueries.getById(ticketId);

// Get with filters
const tickets = await TicketQueries.getByCompany(companyId, {
  status: 'open',
  priority: 'high'
});
```

#### BatchQueries
```typescript
import { BatchQueries } from '@/lib/query-optimizer';

// Efficient batch operations
const projects = await BatchQueries.getMultipleProjects(projectIds);
const users = await BatchQueries.getMultipleUsers(userIds);

// Company statistics
const stats = await BatchQueries.getCompanyStats(companyId);
// { projects: 10, users: 5, tickets: 20, totalItems: 35 }
```

### 6. **Database Management API** (`app/api/admin/db-management/route.ts`)

REST endpoints for database operations:

#### POST Operations
```bash
# Create indexes
POST /api/admin/db-management
{ "action": "create-indexes" }

# Create backup
POST /api/admin/db-management
{ "action": "create-backup" }

# Restore backup
POST /api/admin/db-management
{ "action": "restore-backup", "backupPath": "/path/to/backup.json" }

# Delete backup
POST /api/admin/db-management
{ "action": "delete-backup", "backupPath": "/path/to/backup.json" }

# Clear cache
POST /api/admin/db-management
{ "action": "clear-cache" }

# Reset cache stats
POST /api/admin/db-management
{ "action": "reset-cache-stats" }
```

#### GET Operations
```bash
# Get cache statistics
GET /api/admin/db-management?q=cache-stats

# Get health report
GET /api/admin/db-management?q=health

# Get backup directory
GET /api/admin/db-management?q=backup-dir

# Get all statistics
GET /api/admin/db-management?q=all-stats
```

## Cache Strategy

### TTL Defaults
- Users: 15 minutes
- Projects: 10 minutes
- Tickets: 10 minutes
- Lists: 10-15 minutes

### Automatic Invalidation
Cache is automatically invalidated on:
- Create operations
- Update operations
- Delete operations

### Hit Rate Optimization
Target: >80% cache hit rate

Monitor with: `/api/admin/db-management?q=cache-stats`

## Backup Strategy

### Automatic Rotation
- **Keep:** Last 10 backups
- **Expire:** Backups older than 30 days
- **Cleanup:** Automatic on each new backup

### Manual Backups
```typescript
import { createBackup } from '@/lib/database-backup';

// Schedule with cron or background job
const backup = await createBackup();
```

### Backup Contents
- All projects with sections and items
- All users (with passwords hashed)
- All support tickets with responses

## Performance Benchmarks

### Expected Cache Performance
- **Hit Rate:** 70-85%
- **Average Key Lookup:** <1ms
- **Memory Per 1000 Entries:** ~5-10 MB
- **Cleanup Overhead:** <50ms every 30 seconds

### Index Performance
- **Project Lookup by ID:** <5ms (with index)
- **List by Company:** <20ms (with compound index)
- **Count by Status:** <10ms (with index)

### Backup Performance
- **Backup Creation Time:** ~500ms-2s (depends on data)
- **Restore Time:** ~1-3s (depends on data)
- **File Compression:** No compression (raw JSON)

## Monitoring

### Health Report
```typescript
import { getHealthReport } from '@/lib/cache-utils';

const health = getHealthReport();
/*
{
  status: 'healthy' | 'warning' | 'critical',
  hitRate: 78.5,
  memoryMb: 25.3,
  entries: 1250,
  recommendations: [...]
}
*/
```

### Metrics to Monitor
1. **Cache Hit Rate** - Target >80%
2. **Memory Usage** - Alert >100 MB
3. **Entry Count** - Alert >10,000
4. **Backup Size** - Track growth
5. **Query Response Time** - Track improvements

## Best Practices

### 1. Use Query Optimizer
```typescript
// ❌ Don't do this
const projects = await Project.find({ companyId });

// ✅ Do this instead
const projects = await ProjectQueries.getByCompany(companyId);
```

### 2. Batch Related Queries
```typescript
// ❌ Multiple roundtrips
const users = await UserQueries.getByCompany(companyId);
const projects = await ProjectQueries.getByCompany(companyId);

// ✅ Use batch query
const stats = await BatchQueries.getCompanyStats(companyId);
```

### 3. Cache List Results
```typescript
// Cache query results with filters
const filters = { status: 'Active', priority: 'high' };
cacheDocumentList('tickets', filters, results);
```

### 4. Regular Backups
- Create daily backups (schedule with cron)
- Keep at least 2 weeks of backups
- Test restore monthly

### 5. Monitor Memory
```typescript
// Check monthly
const stats = getCacheStats();
if (stats.memoryUsage.mb > 50) {
  console.warn('Cache using significant memory');
}
```

## Troubleshooting

### Low Cache Hit Rate
1. Check TTL values - may be too short
2. Verify cache key patterns are consistent
3. Check if invalidation is too aggressive

### High Memory Usage
1. Reduce TTL for less-accessed keys
2. Increase cleanup frequency
3. Clear cache during off-hours

### Slow Queries
1. Verify indexes are created: `GET /api/admin/db-management?q=all-stats`
2. Check if collection has enough indexes
3. Use batch queries for multiple operations

### Backup Issues
1. Check disk space: `df -h ./backups`
2. Verify file permissions
3. Monitor backup directory size

## Scaling

### For Large Datasets (100,000+ documents)
1. Increase cache TTL for read-heavy operations
2. Implement query pagination
3. Archive old data regularly
4. Consider adding read replicas

### Multiple Server Instances
⚠️ Current caching is in-memory (per-instance)

For distributed caching:
1. Implement Redis integration
2. Use distributed backup storage
3. Configure cache synchronization

## Security Considerations

1. **Backup Security**
   - Store backups with restricted permissions
   - Encrypt sensitive data before backup
   - Regularly verify backup integrity

2. **Cache Security**
   - Sensitive data expires quickly (5-10 minutes)
   - Passwords never cached
   - Use authorization checks before cache access

3. **API Security**
   - Restrict DB management API to admins
   - Log all backup operations
   - Monitor unusual cache access patterns

## Maintenance Schedule

### Daily
- Monitor cache hit rate
- Check for errors in logs

### Weekly
- Review cache statistics
- Verify backup creation

### Monthly
- Test backup restoration
- Analyze performance metrics
- Review index efficiency

### Quarterly
- Optimize slow queries
- Archive old data
- Update backup strategy if needed

## Future Enhancements

1. **Distributed Cache** - Redis integration for multi-instance setups
2. **Compression** - Gzip backup files
3. **Incremental Backups** - Only changed documents
4. **Analytics Dashboard** - Cache and query metrics UI
5. **Auto-Tuning** - Automatic TTL optimization based on usage patterns
6. **Cloud Storage** - Optional S3/Azure backup sync
