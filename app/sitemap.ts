// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";

const BASE_URL = "https://eleveai.fr";
const u = (path: string) => `${BASE_URL}${path}`;

// ✅ Mets à jour ces dates quand tu modifies réellement la vitrine
const LASTMOD_HOME = new Date("2026-01-04");
const LASTMOD_CORE = new Date("2026-01-04");
const LASTMOD_LEGAL = new Date("2025-12-28");

export default function sitemap(): MetadataRoute.Sitemap {
  // =========================
  // 1) Routes vitrines / core
  // =========================
  const staticRoutes: MetadataRoute.Sitemap = [
    // ✅ Page principale publique
    { url: u("/accueil"), lastModified: LASTMOD_HOME, changeFrequency: "weekly", priority: 1.0 },

    // ✅ Pages SEO (public)
    { url: u("/profs"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.92 },
    { url: u("/eleves"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.92 },
    { url: u("/parents"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.9 },

    // ✅ Atelier-IA (vitrine)
    { url: u("/atelier-IA"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.95 },
    { url: u("/atelier-IA/vision"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.75 },
    { url: u("/atelier-IA/programme"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.75 },

    // ✅ Charte : garde UNE route “officielle” si possible
    // (si tu conserves /atelier-IA/charte, ok)
    { url: u("/atelier-IA/charte"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.7 },

    // ✅ NOUVEAU : page marque (très SEO)
    { url: u("/pourquoi-eleveai"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.85 },

    // ✅ Blog hub
    { url: u("/blog"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.85 },

    // ✅ Business / confiance (conversion)
    { url: u("/tarifs"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.9 },
    { url: u("/pourquoi-nos-tarifs-sont-justes"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.75 },
    { url: u("/offre-pilote"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.65 },
    { url: u("/formation"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.6 },

    // ✅ Confiance / institution
    { url: u("/faq"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.7 },

    // ✅ NOUVEAU : les 3 FAQ dédiées (profs/parents/établissements)
    { url: u("/faq-professeurs"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.65 },
    { url: u("/faq-parents"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.65 },
    { url: u("/faq-administration"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.65 },

    { url: u("/qui-sommes-nous"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.65 },
    { url: u("/presse"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.5 },
    { url: u("/contact"), lastModified: LASTMOD_CORE, changeFrequency: "yearly", priority: 0.5 },

    // ✅ Divers vitrine (garde uniquement si ça existe)
    { url: u("/partenaires"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.45 },
    { url: u("/sponsors"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.35 },
    { url: u("/concours-ia"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.4 },

    // ✅ Légal
    { url: u("/mentions-legales"), lastModified: LASTMOD_LEGAL, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/politique-confidentialite"), lastModified: LASTMOD_LEGAL, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/cgu"), lastModified: LASTMOD_LEGAL, changeFrequency: "yearly", priority: 0.2 },
  ];

  // =========================
  // 2) Blog posts dynamiques
  // =========================
  const posts = getAllBlogPosts();

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const lastMod = post.date ? new Date(post.date) : LASTMOD_CORE;

    return {
      url: u(`/blog/${post.slug}`),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  return [...staticRoutes, ...blogRoutes];
}
