/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  logging: {
    warnings: false,
  },

  images: {
    qualities: [75, 90, 100],
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
