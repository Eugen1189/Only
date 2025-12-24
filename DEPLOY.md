# Deployment Guide

## Quick Start

### 1. Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: EonAI high-end interface"

# Add remote repository
git remote add origin https://github.com/Eugen1189/Only.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

#### Method A: Via Vercel Dashboard (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click **"Add New..."** → **"Project"**
4. Select repository: **`Eugen1189/Only`**
5. Vercel will auto-detect Next.js settings
6. Click **"Deploy"**

That's it! Your site will be live in ~2 minutes.

#### Method B: Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Deploy to production
vercel --prod
```

## Configuration

### Vercel Settings

The project includes `vercel.json` with:
- Framework: Next.js 14
- Build command: `npm run build`
- Output directory: `.next` (auto-detected)
- Node version: Latest LTS (auto-detected)

### Environment Variables

If needed, add in Vercel Dashboard:
1. Project Settings → Environment Variables
2. Add variables (e.g., `NEXT_PUBLIC_API_URL`)

### Custom Domain

1. Project Settings → Domains
2. Add your domain
3. Configure DNS as instructed

## Post-Deployment

### Verify Deployment

1. Check build logs in Vercel dashboard
2. Visit your deployment URL
3. Test on mobile and desktop
4. Verify video loads (if added)

### Troubleshooting

**Build fails:**
- Check Node.js version (should be 18+)
- Verify all dependencies in `package.json`
- Check build logs for errors

**Video not loading:**
- Ensure video file is in `public/assets/`
- Check file size (< 5MB recommended)
- Verify video format (MP4, H.264)

**Styling issues:**
- Clear Vercel cache
- Rebuild project
- Check Tailwind CSS configuration

## Continuous Deployment

Vercel automatically deploys:
- Every push to `main` branch → Production
- Every push to other branches → Preview deployment

## Performance

- **Build time:** ~2-3 minutes
- **Cold start:** < 1 second
- **Page load:** < 2 seconds (with video)
- **Lighthouse score:** 90+ (expected)

## Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- GitHub Repo: [github.com/Eugen1189/Only](https://github.com/Eugen1189/Only)

