// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";

const BASE_URL = "https://eleveai.fr";
const u = (path: string) => `${BASE_URL}${path}`;

// ✅ Mets à jour ces dates quand tu modifies réellement la vitrine
const LASTMOD_HOME = new Date("2025-12-30");
const LASTMOD_CORE = new Date("2025-12-30");
const LASTMOD_LEGAL = new Date("2025-12-28");
const LASTMOD_TOOLS = new Date("2025-12-30"); // générateurs (si tu les gardes dans le sitemap)

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

    // ✅ Atelier-IA (page explicative vitrine)
    { url: u("/atelier-IA"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.95 },
    { url: u("/atelier-IA/vision"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.75 },
    { url: u("/atelier-IA/programme"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.75 },
    { url: u("/atelier-IA/charte"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.7 },

    // ✅ Blog hub
    { url: u("/blog"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.85 },

    // ✅ Business / confiance
    { url: u("/tarifs"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.9 },
    // ⚠️ Garde uniquement si ces pages existent réellement
    { url: u("/pourquoi-nos-tarifs-sont-justes"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.75 },
    { url: u("/offre-pilote"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.65 },
    { url: u("/formation"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.6 },

    // ✅ Confiance / institution
    { url: u("/faq"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.6 },
    { url: u("/qui-sommes-nous"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.55 },
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

    // =========================
    // 2) Outils / générateurs
    // =========================
    // ✅ on les garde dans le sitemap, mais priorité plus basse que les pages vitrine
    { url: u("/espace-profs"), lastModified: LASTMOD_TOOLS, changeFrequency: "weekly", priority: 0.65 },
    { url: u("/espace-eleves"), lastModified: LASTMOD_TOOLS, changeFrequency: "weekly", priority: 0.65 },
    { url: u("/espace-parents"), lastModified: LASTMOD_TOOLS, changeFrequency: "weekly", priority: 0.6 },

    // ✅ NOUVEAU : générateur Atelier-IA (outil)
    { url: u("/espace-atelier-ia"), lastModified: LASTMOD_TOOLS, changeFrequency: "weekly", priority: 0.6 },

    // ⚠️ Espace établissement (garde uniquement si ces pages existent)
    { url: u("/espace-administration"), lastModified: LASTMOD_TOOLS, changeFrequency: "monthly", priority: 0.5 },
    { url: u("/espace-vie-scolaire"), lastModified: LASTMOD_TOOLS, changeFrequency: "monthly", priority: 0.5 },
    { url: u("/espace-personnels"), lastModified: LASTMOD_TOOLS, changeFrequency: "monthly", priority: 0.5 },
  ];

  // =========================
  // 3) Blog posts dynamiques
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



