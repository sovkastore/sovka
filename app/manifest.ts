import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sovka",
    short_name: "Sovka",
    description: "Your store, ready to share.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F4F8",
    theme_color: "#5A31F4",
    icons: [],
  };
}
