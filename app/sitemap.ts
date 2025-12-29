// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";

const BASE_URL = "https://eleveai.fr";
const u = (path: string) => `${BASE_URL}${path}`;

// ✅ Mets à jour ces dates quand tu modifies réellement la vitrine
const LASTMOD_HOME = new Date("2025-12-28");
const LASTMOD_CORE = new Date("2025-12-28");
const LASTMOD_LEGAL = new Date("2025-12-28");

export default function sitemap(): MetadataRoute.Sitemap {
  // =========================
  // 1) Routes vitrines / core
  // =========================
  const staticRoutes: MetadataRoute.Sitemap = [
    // Home + page pilier
    { url: u("/"), lastModified: LASTMOD_HOME, changeFrequency: "weekly", priority: 1.0 },
    { url: u("/atelier-ia"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.95 },

    // Blog hub
    { url: u("/blog"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.85 },

    // Business / confiance
    { url: u("/tarifs"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.9 },
    {
      url: u("/pourquoi-nos-tarifs-sont-justes"),
      lastModified: LASTMOD_CORE,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    { url: u("/offre-pilote"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.85 },
    { url: u("/formation"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.65 },

    // Espaces publics (pages vitrines, pas les dashboards privés)
    { url: u("/espace-profs"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.8 },
    { url: u("/espace-eleves"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.8 },
    { url: u("/espace-parents"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.75 },

    // Établissement / équipes
    { url: u("/espace-administration"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.55 },
    { url: u("/espace-vie-scolaire"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.55 },
    { url: u("/espace-personnels"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.55 },

    // Contenus vitrines
    { url: u("/ressources"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.7 },
    { url: u("/prompts"), lastModified: LASTMOD_CORE, changeFrequency: "weekly", priority: 0.7 },
    { url: u("/le-bon-prompt"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.6 },

    // Institution / confiance
    { url: u("/qui-sommes-nous"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.55 },
    { url: u("/presse"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.55 },
    { url: u("/faq"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.6 },
    { url: u("/contact"), lastModified: LASTMOD_CORE, changeFrequency: "yearly", priority: 0.5 },

    // Divers
    { url: u("/partenaires"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.45 },
    { url: u("/sponsors"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.35 },
    { url: u("/concours-ia"), lastModified: LASTMOD_CORE, changeFrequency: "monthly", priority: 0.4 },

    // Légal
    { url: u("/mentions-legales"), lastModified: LASTMOD_LEGAL, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/politique-confidentialite"), lastModified: LASTMOD_LEGAL, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/cgu"), lastModified: LASTMOD_LEGAL, changeFrequency: "yearly", priority: 0.2 },
  ];

  // =========================
  // 2) Blog posts dynamiques
  // =========================
  const posts = getAllBlogPosts();

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    // post.date doit être ISO (YYYY-MM-DD) idéalement
    const lastMod = post.date ? new Date(post.date) : LASTMOD_CORE;

    return {
      url: u(`/blog/${post.slug}`),
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.6,
    };
  });

  // =========================
  // 3) Retour final
  // =========================
  return [...staticRoutes, ...blogRoutes];
}


