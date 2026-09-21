import type { MetadataRoute } from "next";
import { services } from "@/lib/data";

const base = "https://fjhj-one.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${base}/formations`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/financement`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/equipe`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const sectorRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: `${base}/formations/${service.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const trainingRoutes: MetadataRoute.Sitemap = services.flatMap((service) =>
    service.trainings.map((training) => ({
      url: `${base}/formations/${service.slug}/${training.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  );

  return [...staticRoutes, ...sectorRoutes, ...trainingRoutes];
}
