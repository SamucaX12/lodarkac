/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.postimg.cc', 'i.pinimg.com', 'tse1.mm.bing.net', 'cdn.discordapp.com', 'images-ext-1.discordapp.net', 'i.postimg.cc'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;
