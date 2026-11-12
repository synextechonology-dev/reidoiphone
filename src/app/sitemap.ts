import type { MetadataRoute } from "next";
import { aparelhos, temPagina } from "@/content/aparelhos";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return [
    { url: site.url, lastModified: agora, changeFrequency: "weekly", priority: 1 },
    ...aparelhos.filter(temPagina).map((a) => ({
      url: `${site.url}/iphone/${a.slug}`,
      lastModified: agora,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/privacidade`, lastModified: agora, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/cookies`, lastModified: agora, changeFrequency: "yearly", priority: 0.2 },
  ];
}
