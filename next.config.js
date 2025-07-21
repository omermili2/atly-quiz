/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Enable modern image formats
    formats: ['image/webp', 'image/avif'],
    
    // Allow external image domains
    domains: [
      'i.pravatar.cc',
      'img.icons8.com',
      'images.unsplash.com',
    ],
    
    // Configure image sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Enable optimized loading
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Cache optimization
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Optimize bundle
  webpack: (config, { dev, isServer }) => {
    // Optimize image loading in development
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig; 