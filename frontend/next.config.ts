import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript:{
    ignoreBuildErrors: true,
  }, reactStrictMode: true,
  images: {
    domains: [],
  },
  env: {
    API_URL: process.env.API_URL,
  },
};

export default nextConfig;
