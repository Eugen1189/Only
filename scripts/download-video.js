// Script to download a sample AI-themed video
// Run with: node scripts/download-video.js

const https = require('https');
const fs = require('fs');
const path = require('path');

const videoUrl = 'https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_30fps.mp4';
const outputPath = path.join(__dirname, '../public/assets/brain-video.mp4');

// Ensure directory exists
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log('Downloading AI video...');
const file = fs.createWriteStream(outputPath);

https.get(videoUrl, (response) => {
  if (response.statusCode === 200) {
    response.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log('✅ Video downloaded successfully to:', outputPath);
      console.log('File size:', (fs.statSync(outputPath).size / 1024 / 1024).toFixed(2), 'MB');
    });
  } else {
    console.error('❌ Failed to download video. Status:', response.statusCode);
    fs.unlinkSync(outputPath);
  }
}).on('error', (err) => {
  console.error('❌ Error downloading video:', err.message);
  fs.unlinkSync(outputPath);
});

