import { defineConfig } from "vite";
import type { UserConfig as VitestUserConfigInterface } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      includeAssets: [
        "/logo-32x32.webp",
        "/logo-192x192.png",
        "/logo-180x180.webp",
        "/favicon.ico",
      ],
      manifest: {
        name: "Gestion des adhésions",
        short_name: "AppAdhesion",
        description:
          "Application permettant la gestion des adhésions de la Maison Citoyenne (v1.0.1)",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
  test: vitestConfig.test,
  resolve: {
    alias: {
      "@/": path.join(__dirname, "src/"),
    },
  },
});
