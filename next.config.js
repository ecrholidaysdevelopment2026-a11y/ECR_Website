/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  logging: {
    // hide noisy warnings from Turbopack & baseline-browser-mapping
    warnings: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.1.86",
        port: "3000",
        pathname: "/storage/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/storage/**",
      },
    ],
  },
};

module.exports = nextConfig;
