// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://eleveai.fr";
  const u = (path: string) => `${baseUrl}${path}`;

  const now = new Date();
  const staticLastMod = new Date("2025-12-27"); // <= change quand tu modifies beaucoup la vitrine

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: u("/"), lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: u("/blog"), lastModified: now, changeFrequency: "daily", priority: 0.85 },

    // pages business / confiance
    { url: u("/tarifs"), lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.9 },
    { url: u("/offre-pilote"), lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.85 },
    { url: u("/formation"), lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.65 },

    // espaces publics
    { url: u("/espace-profs"), lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.8 },
    { url: u("/espace-eleves"), lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.8 },
    { url: u("/espace-parents"), lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.75 },

    // établissement
    { url: u("/espace-administration"), lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.55 },
    { url: u("/espace-vie-scolaire"), lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.55 },
    { url: u("/espace-personnels"), lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.55 },

    // contenus
    { url: u("/ressources"), lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.7 },
    { url: u("/prompts"), lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.7 },
    { url: u("/le-bon-prompt"), lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.6 },

    // institution
    { url: u("/qui-suis-je"), lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.55 },
    { url: u("/faq"), lastModified: staticLastMod, changeFrequency: "weekly", priority: 0.6 },
    { url: u("/contact"), lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.5 },

    // divers
    { url: u("/partenaires"), lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.45 },
    { url: u("/sponsors"), lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.35 },
    { url: u("/concours-ia"), lastModified: staticLastMod, changeFrequency: "monthly", priority: 0.4 },

    // légal
    { url: u("/mentions-legales"), lastModified: staticLastMod, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/politique-confidentialite"), lastModified: staticLastMod, changeFrequency: "yearly", priority: 0.2 },
    { url: u("/cgu"), lastModified: staticLastMod, changeFrequency: "yearly", priority: 0.2 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: u(`/blog/${post.slug}`),
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes];
}

