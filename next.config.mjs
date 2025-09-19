

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ['encrypted-tbn0.gstatic.com', 'placehold.co','files-accl.zohoexternal.com'], // Add 'placehold.co' if you're still using placeholder images
//   },
// };

// export default nextConfig; // Changed from module.exports = nextConfig;


// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gramentheme.com",
      },
    ],
  },
};

export default nextConfig;
