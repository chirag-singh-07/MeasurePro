# Deployment Guide

## Prerequisites

Before deploying MeasurePro, ensure you have:

1. MongoDB database (local or MongoDB Atlas)
2. Node.js 18+ installed
3. npm or yarn package manager
4. Stripe account (for payment processing)

## Environment Variables

Create a `.env.local` file with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/measurepro
# For MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/measurepro

# NextAuth Configuration
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=generate-a-secure-random-string-here

# Stripe Keys (Get from https://dashboard.stripe.com/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_publishable_key
STRIPE_SECRET_KEY=sk_live_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### Generating NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

## Local Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   ```
   http://localhost:3000
   ```

## Production Deployment

### Option 1: Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

1. **Push code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/measurepro.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project settings

3. **Add Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add all variables from `.env.local`
   - Make sure to add them for Production, Preview, and Development

4. **Deploy**
   - Vercel will automatically deploy on every push to main branch
   - First deployment URL: `https://your-project.vercel.app`

5. **Custom Domain** (Optional)
   - Go to Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Initialize project**
   ```bash
   railway init
   ```

4. **Add MongoDB**
   ```bash
   railway add mongodb
   ```

5. **Set environment variables**
   ```bash
   railway variables set NEXTAUTH_URL=https://your-app.railway.app
   railway variables set NEXTAUTH_SECRET=your-secret
   # Add other variables...
   ```

6. **Deploy**
   ```bash
   railway up
   ```

### Option 3: DigitalOcean App Platform

1. **Create account** at [digitalocean.com](https://digitalocean.com)

2. **Create new app**
   - Click "Create" → "Apps"
   - Connect your GitHub repository
   - Select branch (main)

3. **Configure build settings**
   - Build Command: `npm run build`
   - Run Command: `npm start`

4. **Add environment variables**
   - Add all variables from `.env.local`

5. **Deploy**
   - Click "Create Resources"
   - Wait for deployment to complete

### Option 4: AWS (Advanced)

1. **Set up EC2 instance**
   - Launch Ubuntu 22.04 LTS instance
   - Configure security groups (ports 80, 443, 22)

2. **SSH into instance**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Node.js**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

4. **Install MongoDB**
   ```bash
   wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   sudo systemctl start mongod
   sudo systemctl enable mongod
   ```

5. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/measurepro.git
   cd measurepro
   ```

6. **Install dependencies**
   ```bash
   npm install
   ```

7. **Create .env.local**
   ```bash
   nano .env.local
   # Add your environment variables
   ```

8. **Build application**
   ```bash
   npm run build
   ```

9. **Install PM2**
   ```bash
   sudo npm install -g pm2
   ```

10. **Start application**
    ```bash
    pm2 start npm --name "measurepro" -- start
    pm2 save
    pm2 startup
    ```

11. **Set up Nginx reverse proxy**
    ```bash
    sudo apt-get install nginx
    sudo nano /etc/nginx/sites-available/measurepro
    ```

    Add configuration:
    ```nginx
    server {
        listen 80;
        server_name yourdomain.com;

        location / {
            proxy_pass http://localhost:3000;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    }
    ```

    Enable site:
    ```bash
    sudo ln -s /etc/nginx/sites-available/measurepro /etc/nginx/sites-enabled/
    sudo nginx -t
    sudo systemctl restart nginx
    ```

12. **Set up SSL with Let's Encrypt**
    ```bash
    sudo apt-get install certbot python3-certbot-nginx
    sudo certbot --nginx -d yourdomain.com
    ```

## MongoDB Setup

### Option 1: MongoDB Atlas (Cloud)

1. **Create account** at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)

2. **Create cluster**
   - Choose free tier (M0)
   - Select region closest to your users
   - Click "Create Cluster"

3. **Create database user**
   - Go to Database Access
   - Add new database user
   - Save username and password

4. **Whitelist IP**
   - Go to Network Access
   - Add IP Address
   - For development: Add 0.0.0.0/0 (allow from anywhere)
   - For production: Add your server IP

5. **Get connection string**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy connection string
   - Replace `<password>` with your password
   - Replace `<dbname>` with `measurepro`

6. **Update .env.local**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/measurepro?retryWrites=true&w=majority
   ```

### Option 2: Local MongoDB

1. **Install MongoDB**
   - Download from [mongodb.com/download-center/community](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB**
   ```bash
   # macOS
   brew services start mongodb-community

   # Linux
   sudo systemctl start mongod

   # Windows
   net start MongoDB
   ```

3. **Update .env.local**
   ```env
   MONGODB_URI=mongodb://localhost:27017/measurepro
   ```

## Stripe Setup

1. **Create Stripe account** at [stripe.com](https://stripe.com)

2. **Get API keys**
   - Go to Developers → API keys
   - Copy Publishable key and Secret key

3. **Set up webhook** (for production)
   - Go to Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
   - Copy webhook signing secret

4. **Update environment variables**
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
   STRIPE_SECRET_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test user login
- [ ] Create a test project
- [ ] Add sections and items
- [ ] Verify calculations are correct
- [ ] Test PDF generation
- [ ] Check mobile responsiveness
- [ ] Verify all environment variables are set
- [ ] Set up monitoring (e.g., Sentry)
- [ ] Configure backups for MongoDB
- [ ] Set up SSL certificate
- [ ] Configure custom domain
- [ ] Test Stripe payment flow
- [ ] Set up error logging
- [ ] Configure email notifications (if applicable)

## Monitoring & Maintenance

### Vercel

- Built-in analytics and monitoring
- View logs in dashboard
- Set up alerts for errors

### Self-hosted

1. **Install monitoring tools**
   ```bash
   # PM2 monitoring
   pm2 monit

   # System monitoring
   sudo apt-get install htop
   ```

2. **Set up logging**
   ```bash
   # View PM2 logs
   pm2 logs measurepro

   # View Nginx logs
   sudo tail -f /var/log/nginx/access.log
   sudo tail -f /var/log/nginx/error.log
   ```

3. **Database backups**
   ```bash
   # Create backup script
   nano backup.sh
   ```

   ```bash
   #!/bin/bash
   DATE=$(date +%Y%m%d_%H%M%S)
   mongodump --db measurepro --out /backups/measurepro_$DATE
   # Delete backups older than 30 days
   find /backups -type d -mtime +30 -exec rm -rf {} +
   ```

   ```bash
   chmod +x backup.sh
   # Add to crontab (daily at 2 AM)
   crontab -e
   0 2 * * * /path/to/backup.sh
   ```

## Troubleshooting

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Database Connection Issues

- Check MongoDB is running
- Verify connection string in .env.local
- Check network access/firewall rules
- Ensure database user has correct permissions

### Authentication Issues

- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

### Stripe Issues

- Verify API keys are correct
- Check webhook endpoint is accessible
- Ensure webhook secret matches

## Scaling

### Database

- Use MongoDB Atlas with auto-scaling
- Enable sharding for large datasets
- Add read replicas for high traffic

### Application

- Use Vercel's edge network (automatic)
- Or set up load balancer with multiple instances
- Enable caching (Redis/Memcached)

### CDN

- Use Vercel's built-in CDN
- Or configure Cloudflare for static assets

## Security Best Practices

1. **Environment Variables**
   - Never commit .env.local to git
   - Use different keys for dev/staging/production
   - Rotate secrets regularly

2. **Database**
   - Use strong passwords
   - Enable authentication
   - Restrict network access
   - Regular backups

3. **Application**
   - Keep dependencies updated
   - Use HTTPS only
   - Implement rate limiting
   - Enable CORS properly

4. **Monitoring**
   - Set up error tracking (Sentry)
   - Monitor for suspicious activity
   - Regular security audits

---

For support, contact: support@measurepro.com
