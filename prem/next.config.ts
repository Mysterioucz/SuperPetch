import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    // Enable standalone output for Docker
    output: "standalone",

    // Environment variables
    env: {
        NEXT_PUBLIC_API_URL:
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
        NEXT_PUBLIC_WS_URL:
            process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3000",
    },

    // Image optimization
    images: {
        domains: ["localhost", "minio", "s3.amazonaws.com"],
        formats: ["image/avif", "image/webp"],
    },

    // Headers for security
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "X-XSS-Protection",
                        value: "1; mode=block",
                    },
                ],
            },
        ];
    },

    // Rewrites for API proxy
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/v1/:path*`,
            },
        ];
    },
};

export default nextConfig;
