import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // Ajoutez "localhost" aux domaines autorisés pour les images
  },
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
