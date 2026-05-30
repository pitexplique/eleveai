// app/sitemap.ts

import type { MetadataRoute } from "next";

const BASE_URL = "https://eleveai.fr";

const u = (path: string) => `${BASE_URL}${path}`;

const LASTMOD_HOME = new Date("2026-05-30");
const LASTMOD_CORE = new Date("2026-05-30");
const LASTMOD_LEGAL = new Date("2026-02-18");

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastMod?: Date;
};

const ROUTES: RouteConfig[] = [
  // ACCUEIL
  {
    path: "/",
    priority: 1.0,
    changeFrequency: "daily",
    lastMod: LASTMOD_HOME,
  },
  {
    path: "/accueil",
    priority: 1.0,
    changeFrequency: "daily",
    lastMod: LASTMOD_HOME,
  },

  // CŒUR ELEVEAI
  {
    path: "/lecon-du-jour",
    priority: 1.0,
    changeFrequency: "daily",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/calcul-rapide",
    priority: 1.0,
    changeFrequency: "daily",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/defis-du-jour",
    priority: 0.95,
    changeFrequency: "daily",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/coach-maths-ia",
    priority: 0.95,
    changeFrequency: "daily",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/parcours",
    priority: 0.9,
    changeFrequency: "daily",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/tutor-v4",
    priority: 0.85,
    changeFrequency: "weekly",
    lastMod: LASTMOD_CORE,
  },
    {
    path: "/english-maths",
    priority: 1.0,
    changeFrequency: "daily",
    lastMod: LASTMOD_CORE,
  },

  // CONCOURS GÉNÉRAL DES COLLÈGES
  {
    path: "/concours-general",
    priority: 0.95,
    changeFrequency: "weekly",
    lastMod: LASTMOD_CORE,
  },

  // SPRINT BREVET
  {
    path: "/coach-brevet",
    priority: 1.0,
    changeFrequency: "daily",
    lastMod: LASTMOD_CORE,
  },

  // AUTH & DASHBOARD ÉLÈVE
  {
    path: "/auth/signin-eleve",
    priority: 0.8,
    changeFrequency: "monthly",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/dashboard-eleve",
    priority: 0.7,
    changeFrequency: "weekly",
    lastMod: LASTMOD_CORE,
  },

  // INSTITUTIONNEL
  {
    path: "/pourquoi-eleveai",
    priority: 0.7,
    changeFrequency: "monthly",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/qui-sommes-nous",
    priority: 0.65,
    changeFrequency: "monthly",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/faq",
    priority: 0.6,
    changeFrequency: "monthly",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/faq/faq-professeurs",
    priority: 0.55,
    changeFrequency: "monthly",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/faq/faq-parents",
    priority: 0.55,
    changeFrequency: "monthly",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/faq/faq-administration",
    priority: 0.55,
    changeFrequency: "monthly",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/faq/faq-tarifs",
    priority: 0.5,
    changeFrequency: "monthly",
    lastMod: LASTMOD_CORE,
  },
  {
    path: "/contact",
    priority: 0.6,
    changeFrequency: "monthly",
    lastMod: LASTMOD_CORE,
  },

  // LÉGAL
  {
    path: "/mentions-legales",
    priority: 0.3,
    changeFrequency: "yearly",
    lastMod: LASTMOD_LEGAL,
  },
  {
    path: "/politique-confidentialite",
    priority: 0.3,
    changeFrequency: "yearly",
    lastMod: LASTMOD_LEGAL,
  },
  {
    path: "/cgu",
    priority: 0.3,
    changeFrequency: "yearly",
    lastMod: LASTMOD_LEGAL,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: u(route.path),
    lastModified: route.lastMod ?? LASTMOD_CORE,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}