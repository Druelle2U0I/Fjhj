import type { MetadataRoute } from "next";
import { services, siteUrl } from "@/lib/data";

const base = siteUrl;

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
      url: `${base}/centre`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
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
    ...["mentions-legales", "confidentialite", "cgv", "accessibilite"].map(
      (path) => ({
        url: `${base}/${path}`,
        lastModified: now,
        changeFrequency: "yearly" as const,
        priority: 0.2,
      }),
    ),
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
