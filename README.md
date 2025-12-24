# LegalMind Hero Section

High-end, cinematic interface built with Next.js, TypeScript, Tailwind CSS, and Framer Motion. Features real 3D video backgrounds and premium glassmorphism effects.

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Inter Font** - Premium typography
- **Lucide React** - Modern icons

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Features

- **Real 3D Video Background** - High-end video loop instead of CSS simulation
- **Orbital UI** - Floating buttons around central sphere
- **Premium Glassmorphism** - High-quality glass effects with noise texture
- **Inter Font** - Premium typography for professional look
- **Smooth Animations** - Framer Motion powered transitions
- **Responsive Design** - Mobile-first with desktop fallback
- **Automatic Fallback** - CSS sphere shows if video fails to load

## Customization

### Colors

To change the color scheme, update the Tailwind classes in `components/HeroSection.tsx`:
- Replace `purple-*` and `blue-*` with your brand colors
- Example: `from-green-500 to-orange-500` for green/orange theme

### Adding Your Video

The interface uses a real video file for the central sphere. To add your video:

1. **Create or obtain a video file:**
   - Format: MP4 (H.264 codec recommended)
   - Resolution: 1080x1080 or higher (square aspect ratio)
   - Duration: Short loop (2-5 seconds works best)
   - Content: 3D rendered brain/sphere animation

2. **Place the video file:**
   ```
   public/assets/brain-video.mp4
   ```

3. **Update the video path** in `components/SoftInterface.tsx` if needed:
   ```tsx
   src="/assets/brain-video.mp4"
   ```

4. **Fallback:** If the video fails to load, a beautiful CSS sphere will automatically appear.

### Video Creation Tips

- Use **Cinema 4D + Redshift** or **Blender** for professional results
- Export as MP4 with H.264 codec for best compatibility
- Keep file size reasonable (< 5MB recommended)
- Ensure seamless loop (first and last frames match)
- Use high contrast and vibrant colors for best visual impact

## Project Structure

```
.
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── HeroSection.tsx    # Desktop version
│   └── SoftInterface.tsx  # Mobile version with soft design
├── public/
│   └── assets/
│       └── brain-video.mp4 # Your video file goes here
├── package.json
└── tailwind.config.ts
```

## Components

- **SoftInterface** - Main mobile interface with soft indigo gradient, aurora effects, and frosted glass buttons
- **HeroSection** - Desktop version with CSS sphere and gradient backgrounds

## Deployment

### GitHub Repository

Repository: [https://github.com/Eugen1189/Only.git](https://github.com/Eugen1189/Only.git)

To push your code to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add remote repository
git remote add origin https://github.com/Eugen1189/Only.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: LegalMind interface"

# Push to main branch
git push -u origin main
```

### Deploy to Vercel

This project is configured for automatic deployment on Vercel.

#### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository: `Eugen1189/Only`
4. Vercel will automatically detect Next.js and configure the project
5. Click "Deploy"

#### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Deploy
vercel

# For production deployment
vercel --prod
```

#### Vercel Configuration

The project includes `vercel.json` with optimal settings:
- Framework: Next.js (auto-detected)
- Build command: `npm run build`
- Install command: `npm install`
- Region: `iad1` (US East)

#### Environment Variables

If you need to add environment variables:
1. Go to your project settings on Vercel
2. Navigate to "Environment Variables"
3. Add your variables (e.g., API keys, secrets)

#### Custom Domain

To add a custom domain:
1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### Build Verification

Before deploying, verify the build works locally:

```bash
npm run build
npm start
```

Visit `http://localhost:3000` to test the production build.

