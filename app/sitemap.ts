import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";

const BASE_URL = "https://eleveai.fr";
const u = (path: string) => `${BASE_URL}${path}`;

const LASTMOD_HOME = new Date("2026-02-18");
const LASTMOD_CORE = new Date("2026-02-18");
const LASTMOD_LEGAL = new Date("2026-02-18");

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastMod?: Date;
};

/* ==============================
   🧠 CONFIG CENTRALISÉE
============================== */

const ROUTES: RouteConfig[] = [
  // 🔵 MAJEUR
  { path: "/", priority: 1.0, changeFrequency: "weekly", lastMod: LASTMOD_HOME },
  { path: "/accueil", priority: 0.95, changeFrequency: "weekly", lastMod: LASTMOD_HOME },
  { path: "/optimiseur", priority: 0.95, changeFrequency: "weekly" },

  // 🟢 BUSINESS
  { path: "/espace-entreprise", priority: 0.9, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.85, changeFrequency: "monthly" },
  { path: "/tarifs", priority: 0.85, changeFrequency: "monthly" },

  // 🟢 ÉDUCATION
  { path: "/espace-profs", priority: 0.85, changeFrequency: "weekly" },
  { path: "/espace-eleves", priority: 0.8, changeFrequency: "weekly" },
  { path: "/espace-parents", priority: 0.75, changeFrequency: "monthly" },
  { path: "/espace-ecoles", priority: 0.75, changeFrequency: "monthly" },
  { path: "/atelier-IA", priority: 0.75, changeFrequency: "monthly" },

  // 🔥 PRODUIT (important pour SEO)
  { path: "/defis", priority: 0.85, changeFrequency: "weekly" },

  // ⚠️ à garder seulement si public
  { path: "/tutor-v4", priority: 0.7, changeFrequency: "weekly" },

  // 🟡 CONTENU
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/qui-sommes-nous", priority: 0.7, changeFrequency: "monthly" },
  { path: "/pourquoi-eleveai", priority: 0.7, changeFrequency: "monthly" },
  { path: "/faq", priority: 0.6, changeFrequency: "monthly" },

  // ⚖️ LÉGAL
  { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
  { path: "/politique-confidentialite", priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
  { path: "/cgu", priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
];

/* ==============================
   🚀 SITEMAP
============================== */

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: u(route.path),
    lastModified: route.lastMod ?? LASTMOD_CORE,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  /* ==============================
     📰 BLOG DYNAMIQUE
  ============================== */

  const posts = getAllBlogPosts() ?? [];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: u(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date) : LASTMOD_CORE,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}

