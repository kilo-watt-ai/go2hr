import type { MetadataRoute } from "next";
import { SITE_URL, LOCATIONS } from "@/lib/constants";
import { consultants, blogPosts } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/how-it-works/businesses",
    "/how-it-works/consultants",
    "/find-a-consultant",
    "/pricing",
    "/about",
    "/resources",
    "/contact",
    "/signup/business",
    "/signup/consultant",
    "/login",
    "/privacy",
    "/terms",
  ];

  const consultantPages = consultants.map((c) => `/consultants/${c.slug}`);
  const blogPages = blogPosts.map((p) => `/resources/${p.slug}`);
  const locationPages = LOCATIONS.map((l) => `/hr-consultants/${l.slug}`);

  const allPages = [
    ...staticPages,
    ...consultantPages,
    ...blogPages,
    ...locationPages,
  ];

  return allPages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : path.includes("/resources/") ? "monthly" : "monthly",
    priority: path === "" ? 1 : path === "/find-a-consultant" ? 0.9 : 0.7,
  }));
}
