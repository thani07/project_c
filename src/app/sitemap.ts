import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

const routes = ["", "/menu", "/services", "/gallery", "/about", "/contact", "/privacy", "/terms", "/credits"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${siteConfig.url}${r}` }));
}
