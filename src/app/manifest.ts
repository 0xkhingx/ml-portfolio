import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "0xkhingx",
    short_name: "0xkhingx",
    description: "ML engineer building models — and the products around them.",
    start_url: "/",
    display: "standalone",
    background_color: "#121110",
    theme_color: "#121110",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
