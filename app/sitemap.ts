// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eleveai.fr";
  const now = new Date();

  const u = (path: string) => `${baseUrl}${path}`;

  // ✅ Pages statiques indexables (vitrine + pages piliers)
  // ⚠️ On ne met PAS /auth (technique), ni /tchat (zone interactive)
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: u("/"), lastModified: now, changeFrequency: "daily", priority: 1.0 },

    // Pages piliers (business / conversion)
    { url: u("/tarifs"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: u("/offre-pilote"), lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: u("/formation"), lastModified: now, changeFrequency: "monthly", priority: 0.65 },

    // Pages piliers (produit / usage)
    { url: u("/espace-profs"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: u("/espace-eleves"), lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: u("/espace-parents"), lastModified: now, changeFrequency: "weekly", priority: 0.75 },

    // Établissements / équipes
    { url: u("/direction"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: u("/espace-administration"), lastModified: now, changeFrequency: "weekly", priority: 0.55 },
    { url: u("/espace-vie-scolaire"), lastModified: now, changeFrequency: "weekly", priority: 0.55 },
    { url: u("/espace-personnels"), lastModified: now, changeFrequency: "weekly", priority: 0.55 },

    // Contenu indexable (ressources)
    { url: u("/ressources"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: u("/prompts"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: u("/le-bon-prompt"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },

    // Blog (hub)
    { url: u("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.85 },

    // Institution / confiance
    { url: u("/qui-suis-je"), lastModified: now, changeFrequency: "monthly", priority: 0.55 },
    { url: u("/faq"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: u("/contact"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },

    // Divers (vitrine)
    { url: u("/partenaires"), lastModified: now, changeFrequency: "monthly", priority: 0.45 },
    { url: u("/sponsors"), lastModified: now, changeFrequency: "monthly", priority: 0.35 },
    { url: u("/concours-ia"), lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: u("/defis-ia-pere-noel"), lastModified: now, changeFrequency: "yearly", priority: 0.25 },

    // Légal
    { url: u("/mentions-legales"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/politique-confidentialite"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/cgu"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  // ✅ Articles de blog (automatique)
  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: u(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}

