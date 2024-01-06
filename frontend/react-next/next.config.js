const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  // disable: process.env.NODE_ENV === "development",
  disable: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
};

module.exports = withPWA(nextConfig);
