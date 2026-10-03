import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [{ source: "/work/bisi-bele", destination: "/work/rowdy-momo", permanent: true }];
  },
};

export default nextConfig;
