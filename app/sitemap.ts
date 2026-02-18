import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";

// 🔵 Version canonique (sans www si ton domaine principal est eleveai.fr)
const BASE_URL = "https://eleveai.fr";
const u = (path: string) => `${BASE_URL}${path}`;

// Dates
const LASTMOD_HOME = new Date("2026-02-18");
const LASTMOD_CORE = new Date("2026-02-18");
const LASTMOD_LEGAL = new Date("2026-02-18");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [

    /* ==============================
       🔵 PAGES STRATÉGIQUES MAJEURES
    ============================== */

    {
      url: u("/"),
      lastModified: LASTMOD_HOME,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    {
      url: u("/accueil"),
      lastModified: LASTMOD_HOME,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: u("/optimiseur"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: u("/espace-entreprise"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "monthly",
      priority: 0.9,
    },

    {
      url: u("/contact"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    {
      url: u("/tarifs"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    /* ==============================
       🟢 ÉDUCATION
    ============================== */

    {
      url: u("/espace-profs"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "weekly",
      priority: 0.85,
    },

    {
      url: u("/espace-eleves"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: u("/espace-parents"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "monthly",
      priority: 0.75,
    },

    {
      url: u("/espace-ecoles"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "monthly",
      priority: 0.75,
    },

    {
      url: u("/atelier-IA"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "monthly",
      priority: 0.75,
    },

    /* ==============================
       🟡 CONTENU & AUTORITÉ
    ============================== */

    {
      url: u("/blog"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "weekly",
      priority: 0.8,
    },

    {
      url: u("/qui-sommes-nous"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: u("/pourquoi-eleveai"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: u("/faq"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "monthly",
      priority: 0.6,
    },

    /* ==============================
       ⚖️ LÉGAL
    ============================== */

    {
      url: u("/mentions-legales"),
      lastModified: LASTMOD_LEGAL,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: u("/politique-confidentialite"),
      lastModified: LASTMOD_LEGAL,
      changeFrequency: "yearly",
      priority: 0.3,
    },

    {
      url: u("/cgu"),
      lastModified: LASTMOD_LEGAL,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /* ==============================
     📰 ARTICLES BLOG DYNAMIQUES
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


