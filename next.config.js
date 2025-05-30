/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "uploadthing.com",
      "lh3.googleusercontent.com",
      "c3jlueq2wv.ufs.sh", // 👈 Add this line for UploadThing images
    ],
  },
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;
