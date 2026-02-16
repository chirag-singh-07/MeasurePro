# MeasurePro - Construction & Industrial Measurement SaaS

A production-ready SaaS platform for construction and industrial measurement and billing management.

## 🚀 Features

- **Multi-tenant Architecture**: Each company has isolated data
- **Role-based Access Control**: Admin, Manager, and Worker roles
- **Project Management**: Create and manage construction projects
- **Dynamic Measurement Tables**: Excel-like inline editing for measurements
- **Auto-calculations**: Automatic calculation of totals, GST, and final amounts
- **PDF Generation**: Professional invoice generation
- **Subscription Management**: Multiple pricing tiers with Stripe integration
- **Premium UI**: Modern black & white industrial design

## 📋 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js v5
- **Payments**: Stripe
- **Icons**: Lucide React
- **PDF**: @react-pdf/renderer

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cal-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/measurepro
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Stripe (Test Mode)
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

4. **Run MongoDB**
   
   Make sure MongoDB is running on your system:
   ```bash
   # Using MongoDB locally
   mongod
   
   # Or use MongoDB Atlas (cloud)
   # Update MONGODB_URI with your Atlas connection string
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
cal-system/
├── app/
│   ├── (dashboard)/          # Dashboard routes (protected)
│   │   ├── projects/         # Projects module
│   │   └── settings/         # Settings page
│   ├── api/                  # API routes
│   │   ├── auth/             # Authentication endpoints
│   │   └── projects/         # Project CRUD endpoints
│   ├── auth/                 # Auth pages (signin/signup)
│   ├── dashboard/            # Dashboard layout & page
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── lib/
│   └── mongodb.ts            # Database connection
├── models/                   # Mongoose models
│   ├── Company.ts
│   ├── User.ts
│   ├── Project.ts
│   ├── Section.ts
│   └── Item.ts
├── types/
│   └── next-auth.d.ts        # NextAuth type definitions
├── auth.ts                   # NextAuth configuration
├── middleware.ts             # Route protection
└── .env.local                # Environment variables
```

## 🗄️ Database Schema

### Collections

1. **Company**
   - name
   - subscriptionPlan (Basic/Pro/Enterprise)
   - projectLimit
   - stripeCustomerId

2. **User**
   - email
   - password (hashed)
   - name
   - role (Admin/Manager/Worker)
   - companyId (reference)

3. **Project**
   - name
   - clientName
   - date
   - location
   - notes
   - companyId (reference)
   - createdBy (reference)
   - gstPercentage
   - totalAmount
   - status (Active/Completed/Draft)

4. **Section**
   - title
   - projectId (reference)
   - totalAmount
   - order

5. **Item**
   - sectionId (reference)
   - description
   - uom (Unit of Measurement)
   - size
   - qty
   - rate
   - amount (auto-calculated)
   - order

## 🔐 Authentication

The app uses NextAuth.js v5 with credentials provider:

1. **Sign Up**: Creates a new company and admin user
2. **Sign In**: Email and password authentication
3. **Protected Routes**: Middleware ensures only authenticated users can access dashboard
4. **Role-based Access**: Different permissions for Admin, Manager, and Worker roles

## 💳 Subscription Plans

- **Basic** (Free): 5 projects, basic features
- **Pro** (₹999/mo): 50 projects, advanced features, PDF export
- **Enterprise** (₹2999/mo): Unlimited projects, all features, custom branding

## 📊 Core Features

### Project Management
- Create projects with client details
- Track project status (Active/Completed/Draft)
- View project history and analytics

### Measurement & Billing
- Add multiple sections per project
- Dynamic item rows with inline editing
- Auto-calculation of:
  - Total Qty = Size × Qty
  - Amount = Total Qty × Rate
  - Section Total = Sum of all items
  - Grand Total = Sum of all sections
  - GST Amount = Grand Total × GST%
  - Final Total = Grand Total + GST

### Dashboard
- Overview cards showing key metrics
- Recent projects list
- Revenue tracking (total and monthly)

## 🎨 UI/UX

- **Premium Industrial Design**: Clean black & white theme
- **Responsive**: Works on all devices
- **Smooth Animations**: Card hover effects, transitions
- **Modern Typography**: Inter font family
- **Custom Scrollbar**: Styled scrollbars
- **Focus States**: Accessible keyboard navigation

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Railway
- Render
- AWS
- DigitalOcean

## 📝 API Routes

### Authentication
- `POST /api/auth/signup` - Register new company and user
- `POST /api/auth/signin` - Sign in user
- `POST /api/auth/signout` - Sign out user

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get project details with sections and items
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

## 🔧 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For support, email support@measurepro.com or create an issue in the repository.

---

Built with ❤️ using Next.js and TypeScript
