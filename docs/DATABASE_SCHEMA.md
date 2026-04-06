# Database Schema Documentation

## Overview

MeasurePro uses MongoDB as its database with Mongoose ODM. The schema is designed for multi-tenancy, where each company's data is isolated using the `companyId` field.

## Collections

### 1. Company

Stores information about each company (tenant) in the system.

```typescript
{
  _id: ObjectId,
  name: String,                    // Company name
  subscriptionPlan: String,        // 'Basic' | 'Pro' | 'Enterprise'
  stripeCustomerId: String,        // Stripe customer ID (optional)
  projectLimit: Number,            // Max number of projects allowed
  logo: String,                    // Company logo URL (optional)
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `_id` (default)

**Plan Limits:**
- Basic: 5 projects
- Pro: 50 projects
- Enterprise: Unlimited

---

### 2. User

Stores user accounts with role-based access control.

```typescript
{
  _id: ObjectId,
  email: String,                   // Unique, lowercase
  password: String,                // Bcrypt hashed (select: false)
  name: String,
  role: String,                    // 'Admin' | 'Manager' | 'Worker'
  companyId: ObjectId,             // Reference to Company
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `_id` (default)
- `email` (unique)

**Roles:**
- **Admin**: Full access to all company data, can manage users
- **Manager**: Can create and edit projects
- **Worker**: Read-only access to projects

**Password Handling:**
- Passwords are hashed using bcrypt with salt rounds of 10
- Pre-save hook automatically hashes password before storing
- `comparePassword` method for authentication

---

### 3. Project

Main project entity containing project details and metadata.

```typescript
{
  _id: ObjectId,
  name: String,                    // Project name
  clientName: String,              // Client/customer name
  date: Date,                      // Project date
  location: String,                // Project location
  notes: String,                   // Additional notes (optional)
  companyId: ObjectId,             // Reference to Company (multi-tenant)
  createdBy: ObjectId,             // Reference to User
  gstPercentage: Number,           // GST percentage (0-100)
  status: String,                  // 'Active' | 'Completed' | 'Draft'
  totalAmount: Number,             // Final total including GST
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `_id` (default)
- `companyId, createdAt` (compound index for fast queries)

**Calculations:**
- `totalAmount` = (Sum of all section totals) + GST

---

### 4. Section

Sections within a project for organizing measurement items.

```typescript
{
  _id: ObjectId,
  title: String,                   // Section title/name
  projectId: ObjectId,             // Reference to Project
  totalAmount: Number,             // Sum of all items in section
  order: Number,                   // Display order
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `_id` (default)
- `projectId, order` (compound index)

**Example:**
- "R-1240A Pump Dismantle Works"
- "Foundation Work"
- "Electrical Installation"

---

### 5. Item

Individual measurement items within a section.

```typescript
{
  _id: ObjectId,
  sectionId: ObjectId,             // Reference to Section
  description: String,             // Item description
  uom: String,                     // Unit of Measurement
  size: Number,                    // Size/dimension
  qty: Number,                     // Quantity
  rate: Number,                    // Rate per unit
  amount: Number,                  // Auto-calculated total
  order: Number,                   // Display order
  createdAt: Date,
  updatedAt: Date
}
```

**Indexes:**
- `_id` (default)
- `sectionId, order` (compound index)

**Auto-calculation:**
- `amount` = (size × qty) × rate
- Calculated in pre-save hook

**UOM Options:**
- Nos (Numbers)
- Sqm (Square meters)
- Cum (Cubic meters)
- Rmt (Running meters)
- Kg (Kilograms)
- Ton (Tons)
- Ltr (Liters)
- Sqft (Square feet)
- Cft (Cubic feet)

---

## Relationships

```
Company (1) ──┬──> (N) User
              │
              └──> (N) Project ──> (N) Section ──> (N) Item
```

### Relationship Details

1. **Company → User**: One-to-Many
   - One company can have multiple users
   - Each user belongs to one company

2. **Company → Project**: One-to-Many
   - One company can have multiple projects
   - Each project belongs to one company

3. **Project → Section**: One-to-Many
   - One project can have multiple sections
   - Each section belongs to one project

4. **Section → Item**: One-to-Many
   - One section can have multiple items
   - Each item belongs to one section

---

## Data Flow

### Creating a New Project

1. User creates project with basic details
2. Project document is created with `companyId`
3. User adds sections to the project
4. User adds items to each section
5. Items auto-calculate their `amount`
6. Sections auto-calculate their `totalAmount`
7. Project updates its `totalAmount` with GST

### Calculation Hierarchy

```
Item Amount = (Size × Qty) × Rate
    ↓
Section Total = Σ(Item Amounts)
    ↓
Subtotal = Σ(Section Totals)
    ↓
GST Amount = Subtotal × (GST% / 100)
    ↓
Final Total = Subtotal + GST Amount
```

---

## Multi-tenancy Implementation

All data queries are scoped by `companyId` to ensure data isolation:

```typescript
// Example: Get all projects for a company
const projects = await Project.find({ companyId: session.user.companyId });

// Example: Get specific project (with company check)
const project = await Project.findOne({
  _id: projectId,
  companyId: session.user.companyId
});
```

**Security:**
- Middleware ensures user is authenticated
- API routes verify `companyId` matches session
- No cross-company data access possible

---

## Cascade Deletion

When deleting a project, all related data is removed:

```
Delete Project
    ↓
Delete all Sections (where projectId = project._id)
    ↓
Delete all Items (where sectionId in deleted sections)
```

This ensures no orphaned data remains in the database.

---

## Indexes for Performance

### Compound Indexes

1. **Project**: `{ companyId: 1, createdAt: -1 }`
   - Fast retrieval of company's projects sorted by date

2. **Section**: `{ projectId: 1, order: 1 }`
   - Fast retrieval of project sections in order

3. **Item**: `{ sectionId: 1, order: 1 }`
   - Fast retrieval of section items in order

### Unique Indexes

1. **User**: `{ email: 1 }` (unique)
   - Prevents duplicate email addresses

---

## Sample Data

### Company
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "ABC Construction Ltd.",
  "subscriptionPlan": "Pro",
  "projectLimit": 50,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### User
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "email": "admin@abc.com",
  "name": "John Doe",
  "role": "Admin",
  "companyId": "507f1f77bcf86cd799439011",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Project
```json
{
  "_id": "507f1f77bcf86cd799439013",
  "name": "Building Construction Phase 1",
  "clientName": "XYZ Corporation",
  "date": "2024-02-01T00:00:00.000Z",
  "location": "Mumbai, Maharashtra",
  "notes": "High priority project",
  "companyId": "507f1f77bcf86cd799439011",
  "createdBy": "507f1f77bcf86cd799439012",
  "gstPercentage": 18,
  "status": "Active",
  "totalAmount": 590000,
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z"
}
```

### Section
```json
{
  "_id": "507f1f77bcf86cd799439014",
  "title": "R-1240A Pump Dismantle Works",
  "projectId": "507f1f77bcf86cd799439013",
  "totalAmount": 500000,
  "order": 0,
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z"
}
```

### Item
```json
{
  "_id": "507f1f77bcf86cd799439015",
  "sectionId": "507f1f77bcf86cd799439014",
  "description": "Dismantling of pump assembly",
  "uom": "Nos",
  "size": 2,
  "qty": 5,
  "rate": 50000,
  "amount": 500000,
  "order": 0,
  "createdAt": "2024-01-15T00:00:00.000Z",
  "updatedAt": "2024-01-15T00:00:00.000Z"
}
```

---

## Migration Guide

If you need to migrate from another system:

1. **Export data** from your current system
2. **Transform data** to match the schema above
3. **Create Company** first
4. **Create Users** with the company reference
5. **Import Projects** with company and user references
6. **Import Sections** with project references
7. **Import Items** with section references

---

## Backup Strategy

Recommended backup approach:

1. **Daily backups** of entire database
2. **Incremental backups** every 6 hours
3. **Retention**: Keep 30 days of backups
4. **Test restores** monthly

For MongoDB Atlas, use automated backups with point-in-time recovery.

---

## Performance Considerations

1. **Pagination**: Implement pagination for large project lists
2. **Lazy Loading**: Load sections and items on demand
3. **Caching**: Cache frequently accessed company data
4. **Aggregation**: Use MongoDB aggregation for complex reports
5. **Connection Pooling**: Reuse database connections in Next.js

---

## Future Enhancements

Potential schema additions:

1. **Attachments**: Store file references for project documents
2. **Comments**: Add commenting system for collaboration
3. **Audit Log**: Track all changes for compliance
4. **Templates**: Save project templates for reuse
5. **Notifications**: Store user notifications
6. **Reports**: Pre-computed report data for analytics
