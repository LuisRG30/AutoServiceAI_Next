/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.pravatar.cc", "images.unsplash.com", "res.cloudinary.com"],
  },
  // rewrites: () => {
  //   return [
  //     {
  //       source: '/api/:slug*',
  //       destination: `${process.env.NEXT_PUBLIC_FILES_URL}/:slug*`,
  //     },
  //   ];
  // }
};

module.exports = nextConfig;
