/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile react-speech-recognition to handle regenerator-runtime
  transpilePackages: ['react-speech-recognition'],
};

module.exports = nextConfig;

