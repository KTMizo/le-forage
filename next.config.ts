import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost", "admin.leforage.fr"],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  // Retirez experimental.optimizeCss car il cause des problèmes
  /* experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  }, */
};

export default nextConfig;
