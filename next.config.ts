import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "http", hostname: "localhost" },
      // WordPress (à retirer une fois la migration terminée)
      { protocol: "https", hostname: "admin.leforage.fr" },
      // Prismic
      { protocol: "https", hostname: "images.prismic.io" },
      { protocol: "https", hostname: "le-forage.cdn.prismic.io" },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
