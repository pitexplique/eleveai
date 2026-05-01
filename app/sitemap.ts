import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";

const BASE_URL = "https://eleveai.fr";
const u = (path: string) => `${BASE_URL}${path}`;

const LASTMOD_HOME = new Date("2026-05-01");
const LASTMOD_CORE = new Date("2026-05-01");
const LASTMOD_LEGAL = new Date("2026-02-18");

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastMod?: Date;
};

const ROUTES: RouteConfig[] = [
  // ACCUEIL
  { path: "/", priority: 1.0, changeFrequency: "daily", lastMod: LASTMOD_HOME },
  { path: "/accueil", priority: 1.0, changeFrequency: "daily", lastMod: LASTMOD_HOME },

  // CŒUR ELEVEAI — STYLE IXL
  { path: "/lecon-du-jour", priority: 1.0, changeFrequency: "daily", lastMod: LASTMOD_CORE },
  { path: "/calcul-rapide", priority: 0.95, changeFrequency: "daily", lastMod: LASTMOD_CORE },
  { path: "/evaluation-nationale", priority: 0.95, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/coach-maths-ia", priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/tutor-v4", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // VALERIA / PROFS
  { path: "/optimiseur", priority: 0.95, changeFrequency: "weekly", lastMod: LASTMOD_CORE },


  // PARCOURS / SUIVI
  { path: "/parcours", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // INSTITUTIONNEL
  { path: "/contact", priority: 0.7, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/qui-sommes-nous", priority: 0.55, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/pourquoi-eleveai", priority: 0.55, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq", priority: 0.5, changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  // BLOG
  { path: "/blog", priority: 0.6, changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ENTREPRISE
  { path: "/espace-entreprise", priority: 0.45, changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  // LEGAL
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
    priority: 0.55,
  }));

  return [...staticRoutes, ...blogRoutes];
}