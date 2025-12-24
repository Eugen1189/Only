# Quick Start Guide

## 🚀 Push to GitHub & Deploy to Vercel

### Step 1: Initialize Git and Push to GitHub

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: EonAI high-end interface with video support"

# Add remote repository
git remote add origin https://github.com/Eugen1189/Only.git

# Set main branch and push
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

#### Option A: Automatic (Recommended)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New Project"**
4. Import repository: **`Eugen1189/Only`**
5. Click **"Deploy"** (settings are auto-detected)

#### Option B: Via CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## ✅ What's Included

- ✅ `vercel.json` - Vercel configuration
- ✅ `.gitignore` - Git ignore rules
- ✅ `DEPLOY.md` - Detailed deployment guide
- ✅ All components ready for production

## 📝 Notes

- Video file (`public/assets/brain-video.mp4`) is optional
- If video is missing, CSS fallback will show automatically
- Project is optimized for Vercel deployment

## 🔗 Links

- **GitHub:** https://github.com/Eugen1189/Only.git
- **Vercel Dashboard:** https://vercel.com/dashboard

