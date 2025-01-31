import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Ajout de la règle pour les SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
