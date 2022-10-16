/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = withPWA({
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [
      "maps.gstatic.com",
      "lh3.googleusercontent.com",
      "cdn.buymeacoffee.com",
    ],
  },
});

module.exports = nextConfig;
