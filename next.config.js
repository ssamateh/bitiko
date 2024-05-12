/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "temblgsolbwuvlibxmje.supabase.co",
      },
      {
        hostname: "akiesu-images.s3.amazonaws.com",
      },
      {
        hostname: "storage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;
