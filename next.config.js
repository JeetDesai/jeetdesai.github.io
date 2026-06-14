/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static site generation - no server required
  output: 'export',
  
  // Image optimization for static export
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
  },

  // Trailing slashes for better static hosting
  trailingSlash: true,

  // Strict mode for development
  reactStrictMode: true,

  // Environment variables
  env: {
    SITE_TITLE: 'Jeet Desai - AI-Augmented Software Architect',
    SITE_DESCRIPTION: 'Building intelligent systems that automate, scale & drive business impact.',
  },

  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/.git/**',
          '**/.next/**',
          '**/node_modules/**',
          '**/playwright-report/**',
          '**/test-results/**',
          '**/coverage/**',
          '**/tmp/**',
        ],
      };
    }

    return config;
  },
};

module.exports = nextConfig;
