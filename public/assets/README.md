# Video Assets

## Adding Your AI Video

Place your AI-themed video file here as `brain-video.mp4`

### Quick Setup

**Option 1: Download sample video automatically**
```bash
node scripts/download-video.js
```

**Option 2: Manual download**
1. Download a video from [Pexels](https://www.pexels.com/videos/) or [Pixabay](https://pixabay.com/videos/)
2. Search for: "abstract", "neural network", "brain", "ai", "technology"
3. Save as `brain-video.mp4` in this folder

**Option 3: Use fallback**
- If no video is found, the interface will show a beautiful animated CSS sphere
- The fallback includes animated gradients, particles, and shimmer effects

### Recommended Specifications:
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1080x1080 or higher (square aspect ratio preferred)
- **Duration**: 2-5 seconds (seamless loop)
- **File Size**: < 5MB recommended for web
- **Content**: AI-themed 3D animation (brain, neural network, or abstract AI visualization)

### Current Implementation

The video component will:
1. Try to load `/assets/brain-video.mp4` (local file)
2. Fall back to a public video source if local file not found
3. Show animated CSS sphere with particles if all videos fail
