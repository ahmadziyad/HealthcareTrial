# Vercel Deployment Guide

This guide will help you deploy your React application to Vercel.

## Prerequisites

- A Vercel account (sign up at https://vercel.com)
- Your project pushed to a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect Your Repository**
   - Go to https://vercel.com/dashboard
   - Click "New Project"
   - Import your Git repository
   - Select the repository containing this project

2. **Configure Build Settings**
   - Vercel will automatically detect this is a Vite project
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `dist` (auto-detected)
   - Install Command: `npm install` (auto-detected)

3. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - You'll get a live URL once deployment completes

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Project Root**
   ```bash
   vercel
   ```
   - Follow the prompts to configure your project
   - Vercel will deploy and provide you with URLs

### Option 3: Deploy via Git Integration

1. **Push to Git**
   ```bash
   git add .
   git commit -m "Add Vercel deployment configuration"
   git push origin main
   ```

2. **Auto-Deploy**
   - Once connected, Vercel automatically deploys on every push to main branch
   - Preview deployments are created for pull requests

## Environment Variables

If your app uses environment variables:

1. **In Vercel Dashboard**
   - Go to Project Settings → Environment Variables
   - Add your variables (e.g., `VITE_API_URL`)

2. **Via CLI**
   ```bash
   vercel env add VITE_API_URL
   ```

## Custom Domain (Optional)

1. **In Vercel Dashboard**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Build Optimization

Your project is already optimized for production with:
- ✅ Vite build optimization
- ✅ TypeScript compilation
- ✅ Tailwind CSS purging
- ✅ SPA routing configuration

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Ensure TypeScript types are correct
- Verify all imports are valid

### 404 on Routes
- The `vercel.json` file handles SPA routing
- All routes redirect to `index.html` for client-side routing

### Slow Build Times
- Consider using `npm ci` instead of `npm install` in build
- Check for unnecessary dependencies

## Monitoring

- View deployment logs in Vercel dashboard
- Monitor performance with Vercel Analytics
- Set up error tracking if needed

## Next Steps

After deployment:
1. Test all routes and functionality
2. Set up custom domain if needed
3. Configure environment variables
4. Set up monitoring and analytics
5. Consider setting up preview deployments for staging