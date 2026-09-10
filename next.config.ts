import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "http://127.0.0.1:8000/login",
      },
      {
        source: "/dashboard",
        destination: "http://127.0.0.1:8000/dashboard",
      },
      {
        source: "/logout",
        destination: "http://127.0.0.1:8000/logout",
      },
      {
        source: "/admin",
        destination: "http://127.0.0.1:8000/admin",
      },
      {
        source: "/admin/:path*",
        destination: "http://127.0.0.1:8000/admin/:path*",
      },
    ];
  },
};

export default nextConfig;
