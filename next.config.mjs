/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "encrypted-tbn0.gstatic.com",
      "placehold.co",
      "files-accl.zohoexternal.com",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gramentheme.com",
      },
      {
        protocol: "https",
        hostname: "bombon.rs", // ✅ Added your candy site
      },
    ],
  },
};

export default nextConfig;
