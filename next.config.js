/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "temblgsolbwuvlibxmje.supabase.co",
      },
      {
        hostname: "akiesu-images.s3.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
