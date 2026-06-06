// app/sitemap.ts

import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";

const BASE_URL = "https://eleveai.fr";

const u = (path: string) => `${BASE_URL}${path}`;

const LASTMOD_HOME = new Date("2026-06-01");
const LASTMOD_CORE = new Date("2026-06-01");
const LASTMOD_LEGAL = new Date("2026-02-18");
const MATHS_CLASSES = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "terminale-spe"];
const FRANCAIS_CLASSES = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e"];
const ENGLISH_NIVEAUX = ["a1", "a2", "b1", "b2"];

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastMod?: Date;
};

const ROUTES: RouteConfig[] = [
  // ── ACCUEIL ────────────────────────────────────────────────────────────────
  { path: "/",       priority: 1.0, changeFrequency: "daily", lastMod: LASTMOD_HOME },
  { path: "/accueil", priority: 1.0, changeFrequency: "daily", lastMod: LASTMOD_HOME },

  // ── OUTILS ÉLÈVES ──────────────────────────────────────────────────────────
  { path: "/coach-brevet",    priority: 1.0,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-bac-spe",   priority: 1.0,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/english-maths",  priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/maths",    priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/francais", priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/parcours-english-maths",  priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/parcours",          priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/calcul-rapide",   priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/english-maths",   priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/defis-du-jour",   priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/lecon-du-jour",   priority: 0.85, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/concours-general",priority: 0.8,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ── ESPACES ────────────────────────────────────────────────────────────────
  { path: "/espace-ecoles",   priority: 0.95, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/espace-eleves",   priority: 0.85, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/espace-parents",  priority: 0.8,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/espace-profs",    priority: 0.8,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  // ── AUTH (public) ──────────────────────────────────────────────────────────
  { path: "/auth/signin-eleve", priority: 0.8, changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  // ── INSTITUTIONNEL ─────────────────────────────────────────────────────────
  { path: "/pourquoi-eleveai",  priority: 0.75, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/qui-sommes-nous",   priority: 0.7,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/tarifs",            priority: 0.7,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/contact",           priority: 0.65, changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  // ── BLOG INDEX ─────────────────────────────────────────────────────────────
  { path: "/blog", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ── FAQ ────────────────────────────────────────────────────────────────────
  { path: "/faq",                   priority: 0.6,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq/faq-professeurs",   priority: 0.55, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq/faq-parents",       priority: 0.55, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq/faq-administration",priority: 0.5,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq/faq-tarifs",        priority: 0.5,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  // ── LÉGAL ──────────────────────────────────────────────────────────────────
  { path: "/mentions-legales",           priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
  { path: "/politique-confidentialite",  priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
  { path: "/cgu",                        priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
];

const coachRoutes: RouteConfig[] = [
  ...ENGLISH_NIVEAUX.map((niveau) => ({
    path: `/coach-ia/english-maths?niveau=${niveau}`,
    priority: 0.9,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
  ...MATHS_CLASSES.map((classe) => ({
    path: `/coach-ia/maths?classe=${classe}`,
    priority: classe === "terminale-spe" ? 0.85 : 0.9,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
  ...FRANCAIS_CLASSES.map((classe) => ({
    path: `/coach-ia/francais?classe=${classe}`,
    priority: 0.9,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Routes statiques
  const staticRoutes = [...ROUTES, ...coachRoutes].map((route) => ({
    url: u(route.path),
    lastModified: route.lastMod ?? LASTMOD_CORE,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  // Articles de blog (générés dynamiquement depuis blogPosts.ts)
  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: u(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...blogRoutes];
}
