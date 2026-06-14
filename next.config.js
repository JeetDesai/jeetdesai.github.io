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

  // SEO & sitemap
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/index.html',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600' },
        ],
      },
    ];
  },

  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/.git/**',
          '**/.next/**',
          '**/node_modules/**',
          '**/playwright-report/**',
          '**/test-results/**',
        ],
      };
    }

    return config;
  },
};

module.exports = nextConfig;
