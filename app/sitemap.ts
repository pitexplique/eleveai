import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";

const BASE_URL = "https://eleveai.fr";
const u = (path: string) => `${BASE_URL}${path}`;

const LASTMOD_HOME = new Date("2026-04-26");
const LASTMOD_CORE = new Date("2026-04-26");
const LASTMOD_LEGAL = new Date("2026-02-18");

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastMod?: Date;
};

const ROUTES: RouteConfig[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly", lastMod: LASTMOD_HOME },
  { path: "/accueil", priority: 0.95, changeFrequency: "weekly", lastMod: LASTMOD_HOME },

  { path: "/optimiseur", priority: 0.95, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/calcul-rapide", priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/coach-maths-ia", priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/parcours", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  { path: "/espace-profs", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/espace-eleves", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/espace-parents", priority: 0.75, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/espace-ecoles", priority: 0.75, changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  { path: "/espace-entreprise", priority: 0.85, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/tarifs", priority: 0.85, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/contact", priority: 0.8, changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  { path: "/blog", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/qui-sommes-nous", priority: 0.7, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/pourquoi-eleveai", priority: 0.7, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq", priority: 0.65, changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  { path: "/tutor-v4", priority: 0.65, changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
  { path: "/politique-confidentialite", priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
  { path: "/cgu", priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: u(route.path),
    lastModified: route.lastMod ?? LASTMOD_CORE,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const posts = getAllBlogPosts() ?? [];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: u(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date) : LASTMOD_CORE,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}