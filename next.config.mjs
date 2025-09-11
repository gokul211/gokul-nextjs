

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'placehold.co','files-accl.zohoexternal.com'], // Add 'placehold.co' if you're still using placeholder images
  },
};

export default nextConfig; // Changed from module.exports = nextConfig;