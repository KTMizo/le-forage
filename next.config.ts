import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "localhost",
      "admin.leforage.fr", // Ajout du domaine de production WordPress
    ],
  },
  webpack(config) {
    // Configuration SVG
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  // Ajout des optimisations pour résoudre les erreurs de préchargement
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  // Amélioration de la gestion des styles
  optimizeFonts: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;
