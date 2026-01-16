// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";

const BASE_URL = "https://eleveai.fr";
const u = (path: string) => `${BASE_URL}${path}`;

const LASTMOD_HOME = new Date("2026-01-04");
const LASTMOD_CORE = new Date("2026-01-04");
const LASTMOD_LEGAL = new Date("2026-01-04");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    // ✅ racine du site
    {
      url: u("/accueil"),
      lastModified: LASTMOD_HOME,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ✅ page accueil (si tu la gardes indexable)
    {
      url: u("/accueil"),
      lastModified: LASTMOD_HOME,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    { url: u("/profs"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.92 },
    { url: u("/eleves"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.92 },
    { url: u("/parents"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.9 },

    { url: u("/atelier-IA"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.95 },
    { url: u("/atelier-IA/vision"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.75 },
    { url: u("/atelier-IA/programme"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.75 },
    { url: u("/atelier-IA/charte"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.4 },

    { url: u("/pourquoi-eleveai"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.85 },
    { url: u("/qui-sommes-nous"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.75 },
    { url: u("/charte"), lastModified: LASTMOD_LEGAL, changeFrequency: "monthly", priority: 0.85 },

    { url: u("/faq"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.7 },
    { url: u("/faq-professeurs"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.65 },
    { url: u("/faq-parents"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.65 },
    { url: u("/faq-administration"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.65 },

    { url: u("/tarifs"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.9 },
    { url: u("/pourquoi-nos-tarifs-sont-justes"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.75 },
    { url: u("/offre-pilote"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.65 },
    { url: u("/formation"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.6 },

    { url: u("/blog"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.85 },
    { url: u("/presse"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.5 },
    { url: u("/contact"), lastModified: LASTMOD_CORE, changeFrequency: "yearly", priority: 0.5 },
    { url: u("/concours-ia"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.4 },

    { url: u("/mentions-legales"), lastModified: LASTMOD_LEGAL, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/politique-confidentialite"), lastModified: LASTMOD_LEGAL, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/cgu"), lastModified: LASTMOD_LEGAL, changeFrequency: "yearly", priority: 0.2 },
  ];

  const posts = getAllBlogPosts() ?? [];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: u(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date) : LASTMOD_CORE,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}

