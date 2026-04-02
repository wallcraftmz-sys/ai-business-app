import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Business App",
    short_name: "AI Business",
    description: "AI-инструмент для генерации текстов для бизнеса",
    start_url: "/",
    display: "standalone",
    background_color: "#0d111b",
    theme_color: "#0d111b",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}