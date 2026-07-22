// app/sitemap.ts

import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";
import { NIVEAUX, motsDeLaClasse } from "@/lib/dico";

const BASE_URL = "https://eleveai.fr";

const u = (path: string) => `${BASE_URL}${path}`;

// 15-16/07 : l'accueil devient « Le Journal d'EleveAI » (manchette eleveai.fr,
// carrousel piloté par la régie, catalogue Supabase, abonnement) — et les
// défis du jour passent à la semaine « Les baleines sont là ! ».
// 18/07 : la Une respire (pastilles « aujourd'hui », fil recentré, agenda) et
// la famille des MACHINES « dans ta main » est au complet : cyclone, usine à
// sucre, fromagerie — chacune avec ses défis intégrés.
const LASTMOD_HOME    = new Date("2026-07-18");
const LASTMOD_JOURNAL = new Date("2026-07-16");
const LASTMOD_MACHINES = new Date("2026-07-18");
const LASTMOD_EXPLORER = new Date("2026-07-02");
const LASTMOD_CORE    = new Date("2026-06-25");
const LASTMOD_CAHIERS = new Date("2026-06-29");
const LASTMOD_DICTEE  = new Date("2026-07-01");
const LASTMOD_974     = new Date("2026-07-02");
const LASTMOD_JEUX    = new Date("2026-07-05");
const LASTMOD_FICHES  = new Date("2026-07-11");
// 12/07 : les 16 fiches IA refaites « en blocs » (fiche + flashcards + composeur)
const LASTMOD_FICHES_IA = new Date("2026-07-12");
const LASTMOD_AUDIENCES = new Date("2026-07-05");
const LASTMOD_LEGAL   = new Date("2026-02-18");

const MATHS_CLASSES    = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere-spe", "terminale-spe"];
const FRANCAIS_CLASSES = ["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e"];
const ENGLISH_NIVEAUX  = ["a1", "a2", "b1", "b2"];
const IA_NIVEAUX       = ["a1", "a2", "b1", "b2", "c1"];
const ESPAGNOL_NIVEAUX = ["a1", "a2", "b1", "b2"];
const ECONOMIE_NIVEAUX = ["eco-decouverte", "eco-college", "eco-lycee"];

// Rubriques Géographie - Voyage disponibles par niveau
const ENGLISH_RUBRIQUES: Record<string, string[]> = {
  a1: ["sports", "science", "economie-gestion", "geographie-voyage"],
  a2: ["sports", "science", "economie-gestion", "geographie-voyage"],
  b1: ["sports", "science", "economie-gestion", "geographie-voyage"],
  b2: ["sports", "science", "economie-gestion", "geographie-voyage"],
};

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastMod?: Date;
};

const ROUTES: RouteConfig[] = [
  // ── ACCUEIL ────────────────────────────────────────────────────────────────
  { path: "/", priority: 1.0, changeFrequency: "daily", lastMod: LASTMOD_HOME },

  // ── EXPLORER (catalogue de toutes les actions) ─────────────────────────────
  { path: "/explorer",        priority: 0.9,  changeFrequency: "weekly", lastMod: LASTMOD_EXPLORER },

  // ── OUTILS ÉLÈVES ──────────────────────────────────────────────────────────
  { path: "/coach-brevet",    priority: 1.0,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-bac-spe",   priority: 1.0,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/english-maths",  priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/maths",    priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/francais", priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/ia",       priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/espagnol", priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/coach-ia/economie", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/parcours-english-maths",  priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/parcours",          priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/parcours-francais", priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/parcours-espagnol", priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/parcours-ia",       priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/eval-pix-ia",       priority: 0.9,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ── FICHES DE COURS ────────────────────────────────────────────────────────
  { path: "/fiches-cours",      priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/maths", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  // Fiches maths — refaites « en blocs » le 11/07, + les fiches 6e créées
  // le 12/07 (une par banque du coach) : fiche + flashcards + composeur.
  { path: "/fiches-cours/maths/6e/entier-nombre",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/decimal-nombre",            priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/fraction-nombre",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/pourcentage-nombre",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/prop-proportionnalite",    priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/6e/entier-calcul-mental",       priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/entier-calcul-pose",         priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/aire-longueur",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/aire-perimetre",          priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/aire-surface",               priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/volume-solide",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/angle-mesure",              priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/triangle-figure",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/quadrilatere-figure",       priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/sym-axiale",            priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/stat-donnee",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/proba-experience",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/6e/algo-programmation",       priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/maths/cm2/nombre-entier",      priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/calcul",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/duree",              priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/pourcentage",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/masse",              priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/contenance",         priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/longueur",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/tableau",            priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/graphique",          priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/reperage",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/nombre-decimal",     priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/fraction",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/multiplication",     priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/division",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/proportionnalite",   priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/perimetre",          priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/aire",               priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/symetrie",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/angle",              priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/solide",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/suite",              priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/probleme",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/algorithmique",      priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/algebre",            priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/droite",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/figure-plane",       priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/echelle",            priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/cm2/probabilite",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/relatif-nombre",      priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/litteral-calcul",     priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/prop-proportionnalite", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/stat-statistique",     priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/proba-experience",     priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/angle-mesure",         priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/triangle-figure",      priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/sym-centrale",         priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/aire-surface",         priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/volume-solide",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/algo-programmation",   priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/pourcentages",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/fraction-nombre",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/pythagore-theoreme",           priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/trigo-cosinus",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/stat-statistique",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/proba-experience",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/3e/thales-theoreme",              priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/premiere-spe/derivation",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/ia",   priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/livre", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/ia/fondements/definir-l-ia", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/fondements/apprentissage-automatique", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/fondements/modeles-apprentissage", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/fondements/grands-modeles-de-langage", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/fondements/algorithmes-de-recommandation", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/fondements/ia-incarnee-robotique", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/usages/familles-de-taches", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/usages/utiliser-ia-generative", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/usages/evaluer-l-information", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/usages/services-de-recommandation", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/usages/ia-dans-une-organisation", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/enjeux/empreinte-environnementale", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/enjeux/gouvernance", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/enjeux/ethique-et-transparence", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/enjeux/emploi-et-formation", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },
  { path: "/fiches-cours/ia/enjeux/enjeux-culturels-societaux", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_IA },

  { path: "/dictee-du-jour",  priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_DICTEE },
  { path: "/calcul-rapide",   priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/english-maths",   priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  // Semaine « Les baleines sont là ! » depuis le 16/07 (remplace le foot).
  { path: "/defis-du-jour",   priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_JOURNAL },

  // ── DICO (vocabulaire & gestes — prépa éval nationale) ─────────────────────
  { path: "/dico",            priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/dico/maths/6e",   priority: 0.8,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/dico/francais/6e",priority: 0.8,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ── CAHIERS DE VACANCES (PDF imprimables) ──────────────────────────────────
  { path: "/cahier-vacances",             priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-cp",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-ce1", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-ce2", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-cm1", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-cm2", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-6e",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-5e",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-4e",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-3e",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-2nde", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-premiere", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-la-terminale", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/vers-le-bac-plus-1", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },
  { path: "/cahier-vacances/aider-mon-enfant", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CAHIERS },

  { path: "/concours-logo",   priority: 0.6,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/podcast-maths",   priority: 0.85, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/concours-general",priority: 0.8,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/concours-ia",     priority: 0.7,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/le-bon-prompt",   priority: 0.7,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/grand-oral",      priority: 0.7,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ── LA COMMUNAUTÉ DU JOURNAL (courrier des lecteurs, honneurs, contributions)
  // Pages publiques mises en avant par la Une depuis la refonte journal.
  { path: "/votre-avis",      priority: 0.6,  changeFrequency: "weekly", lastMod: LASTMOD_JOURNAL },
  { path: "/remerciements",   priority: 0.6,  changeFrequency: "weekly", lastMod: LASTMOD_JOURNAL },
  { path: "/besoin-de-vous",  priority: 0.6,  changeFrequency: "weekly", lastMod: LASTMOD_JOURNAL },

  // ── MATHS RÉEL · 974 ───────────────────────────────────────────────────────
  { path: "/maths-974",       priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_974 },
  // LES MACHINES « DANS TA MAIN » — la famille de simulateurs de l'île, avec
  // leurs défis intégrés (18/07). Le cyclone montera encore en priorité à la
  // saison cyclonique (novembre).
  { path: "/simulateur-cyclone", priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_MACHINES },
  { path: "/simulateur-sucre", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_MACHINES },
  { path: "/simulateur-fromage", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_MACHINES },
  // Le barrage de Takamaka (19/07) — l'eau de l'île fait la lumière.
  { path: "/simulateur-barrage", priority: 0.85, changeFrequency: "weekly", lastMod: new Date("2026-07-19") },
  // Le volcan (19/07) — la Fournaise qui fabrique l'île.
  { path: "/simulateur-volcan", priority: 0.85, changeFrequency: "weekly", lastMod: new Date("2026-07-19") },
  // Le lagon de l'Ermitage (20/07) — la muraille vivante qui fait la plage.
  { path: "/simulateur-lagon", priority: 0.85, changeFrequency: "weekly", lastMod: new Date("2026-07-20") },
  // La machine des epsilons (20/07) — le coefficient k, la suite géométrique :
  // « activer des epsilons peut engendrer des infinis ».
  { path: "/simulateur-epsilon", priority: 0.85, changeFrequency: "weekly", lastMod: new Date("2026-07-20") },
  // La courbe en cloche (21/07) — de la binomiale (les coefficients de Pascal)
  // à la loi normale : le théorème de De Moivre-Laplace dans un curseur.
  { path: "/loi-normale", priority: 0.85, changeFrequency: "weekly", lastMod: new Date("2026-07-21") },
  // L'exponentielle en miroir (22/07) — la montée (e^x) et la descente (courbe
  // de l'oubli d'Ebbinghaus) : deux courbes nées d'un dessin au stylo.
  { path: "/exponentielle", priority: 0.85, changeFrequency: "weekly", lastMod: new Date("2026-07-22") },
  // La loi de la performance (22/07) — le neurone du dessin de Mbappé : ADN →
  // variables x → coefficients → réseau → performance. « Faut-il améliorer ses
  // défauts ou ses qualités ? »
  { path: "/loi-performance", priority: 0.85, changeFrequency: "weekly", lastMod: new Date("2026-07-22") },
  // Le but qui sort de la moyenne (22/07) — la loi de Pareto : la queue lourde
  // où naissent les records, opposée à la cloche de la loi normale.
  { path: "/loi-pareto", priority: 0.85, changeFrequency: "weekly", lastMod: new Date("2026-07-22") },
  { path: "/picto-maths",     priority: 0.8,  changeFrequency: "monthly", lastMod: LASTMOD_974 },
  { path: "/carte",           priority: 0.8,  changeFrequency: "monthly", lastMod: LASTMOD_974 },
  { path: "/cahier-vacances/maths", priority: 0.85, changeFrequency: "monthly", lastMod: LASTMOD_974 },

  // ── JEU « QUI SUIS-JE ? » (32 cartes à imprimer, toutes matières) ──────────
  // Le hub ; les paquets par classe sont générés automatiquement (voir
  // jeuxCartesRoutes) → chaque nouvelle classe apparaît toute seule ici.
  { path: "/qui-suis-je-a-imprimer",            priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },

  // ── CARTES DÉFIS « Le corps & l’esprit » (révision + sport, à imprimer) ───
  { path: "/cahier-vacances-cartes",                   priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },
  { path: "/cahier-vacances-cartes/vers-la-premiere",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },
  { path: "/cahier-vacances-cartes/vers-la-6e",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },
  { path: "/cahier-vacances-cartes/vers-le-cm2",       priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },
  { path: "/cahier-vacances-cartes/vers-la-5e",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },
  { path: "/cahier-vacances-cartes/vers-la-4e",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },
  { path: "/cahier-vacances-cartes/vers-la-3e",        priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_JEUX },

  // ── ESPACES / AUDIENCES ────────────────────────────────────────────────────
  // Pages d'audience = portes du header et de l'accueil (destinations principales).
  { path: "/parents",         priority: 0.9,  changeFrequency: "monthly", lastMod: LASTMOD_AUDIENCES },
  { path: "/enseignants",     priority: 0.9,  changeFrequency: "monthly", lastMod: LASTMOD_AUDIENCES },
  { path: "/francais-de-l-etranger", priority: 0.9, changeFrequency: "weekly", lastMod: new Date("2026-07-10") },

  // ── PROGRAMME PAR CLASSE (moteur SEO n°2 : les compétences des banques
  //    exposées en texte, façon pages « skills » d'IXL) ──────────────────────
  ...["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere-spe", "terminale-spe"].map((c) => (
    { path: `/programme/${c}`, priority: 0.9, changeFrequency: "monthly" as const, lastMod: new Date("2026-07-11") }
  )),
  { path: "/espace-ecoles",   priority: 0.95, changeFrequency: "monthly", lastMod: LASTMOD_AUDIENCES },
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
  // 20/07 : les pages de la PHILOSOPHIE qui manquaient au sitemap (audit
  // Frédéric « qu'il n'oublie pas notre philosophie ») — la charte d'usage de
  // l'IA (la confiance), les tarifs justes (gratuit pour l'élève, jamais la
  // famille), le pilote gratuit, la presse et les partenaires (l'institution).
  { path: "/charte",            priority: 0.7,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/pourquoi-nos-tarifs-sont-justes", priority: 0.65, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/offre-pilote",      priority: 0.7,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/presse",            priority: 0.6,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/partenaires",       priority: 0.6,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/entreprises",       priority: 0.6,  changeFrequency: "monthly", lastMod: new Date("2026-07-22") },

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
  // English — une entrée par niveau
  ...ENGLISH_NIVEAUX.map((niveau) => ({
    path: `/coach-ia/english-maths?niveau=${niveau}`,
    priority: 0.9,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
  // English — une entrée par niveau + rubrique
  ...ENGLISH_NIVEAUX.flatMap((niveau) =>
    (ENGLISH_RUBRIQUES[niveau] ?? []).map((rubrique) => ({
      path: `/coach-ia/english-maths?niveau=${niveau}&rubrique=${rubrique}`,
      priority: 0.85,
      changeFrequency: "weekly" as const,
      lastMod: LASTMOD_CORE,
    }))
  ),
  // Parcours English — par niveau
  ...ENGLISH_NIVEAUX.map((niveau) => ({
    path: `/parcours-english-maths?niveau=${niveau}`,
    priority: 0.85,
    changeFrequency: "weekly" as const,
    lastMod: LASTMOD_CORE,
  })),
  // Coach IA — par niveau
  ...IA_NIVEAUX.map((niveau) => ({
    path: `/coach-ia/ia?classe=${niveau}`,
    priority: 0.9,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
  // Parcours IA — par niveau
  ...IA_NIVEAUX.map((niveau) => ({
    path: `/parcours-ia?niveau=${niveau}`,
    priority: 0.85,
    changeFrequency: "weekly" as const,
    lastMod: LASTMOD_CORE,
  })),
  // Maths — par classe
  ...MATHS_CLASSES.map((classe) => ({
    path: `/coach-ia/maths?classe=${classe}`,
    priority: classe === "terminale-spe" ? 0.85 : 0.9,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
  // Français — par classe
  ...FRANCAIS_CLASSES.map((classe) => ({
    path: `/coach-ia/francais?classe=${classe}`,
    priority: 0.9,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
  // Espagnol — par niveau
  ...ESPAGNOL_NIVEAUX.map((niveau) => ({
    path: `/coach-ia/espagnol?classe=${niveau}`,
    priority: 0.85,
    changeFrequency: "daily" as const,
    lastMod: LASTMOD_CORE,
  })),
  // Économie — par niveau
  ...ECONOMIE_NIVEAUX.map((classe) => ({
    path: `/coach-ia/economie?classe=${classe}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
    lastMod: LASTMOD_CORE,
  })),
];

// Jeu « Qui suis-je ? » — un paquet par classe, généré depuis les classes qui ont
// du contenu (GS-CP → Terminale au fur et à mesure). Toute nouvelle classe s'ajoute
// ici automatiquement, sans toucher ce fichier.
const jeuxCartesRoutes: RouteConfig[] = NIVEAUX.filter(
  (n) => motsDeLaClasse(n.slug).length > 0
).map((n) => ({
  path: `/qui-suis-je-a-imprimer/${n.slug}`,
  priority: 0.85,
  changeFrequency: "weekly" as const,
  lastMod: LASTMOD_JEUX,
}));

// Vidéos YouTube publiées (chaîne EleveAI), rattachées à la fiche de leur notion
// pour un sitemap vidéo Google (SEO). Miroir léger de notion_ressources : on
// ajoute une ligne par vidéo publiée (clé = chemin de la fiche).
const VIDEOS_FICHES: Record<
  string,
  { id: string; title: string; description: string }[]
> = {
  // La machine du barrage porte ses DEUX vidéos : l'épisode « en vrai » et le
  // film d'animation du principe (20/07) — le schéma animé, sans son, à lire.
  "/simulateur-barrage": [
    {
      id: "oyjfPzC4sKY",
      title: "Le barrage de Takamaka : l'eau qui allume l'île — EleveAI",
      description:
        "L'eau tombe de 500 m dans les gorges de Takamaka et éclaire 48 000 familles — puis ressort intacte vers la rivière. Les maths du barrage, en vrai, à La Réunion.",
    },
    {
      id: "yHCtKaj8TPw",
      title:
        "Film d'animation - Le barrage de Takamaka : l'eau tombe, l'île s'allume (schéma animé)",
      description:
        "Le principe du barrage animé étape par étape : la vanne, la conduite forcée, la turbine, le générateur, les lignes à haute tension — et le défi : 8 × 5 × 500 = 20 000 kW.",
    },
  ],
  "/fiches-cours/maths/6e/entier-calcul-pose": [
    {
      id: "Y3gFecuyBTQ",
      title: "Le calcul posé — Maths 6e — EleveAI",
      description:
        "Poser et calculer une addition, une soustraction, une multiplication et une division, pas à pas et sans calculatrice (6e).",
    },
  ],
  "/fiches-cours/maths/6e/entier-nombre": [
    {
      id: "8DFgt3TCoH8",
      title: "Les nombres entiers — Maths 6e — EleveAI",
      description:
        "Lire, écrire, comparer, décomposer et encadrer les nombres entiers, avec le tableau de numération et la droite graduée (6e).",
    },
  ],
  "/fiches-cours/maths/6e/decimal-nombre": [
    {
      id: "hiFUDrIMZrU",
      title: "Les nombres décimaux — Maths 6e — EleveAI",
      description:
        "Lire, comparer et calculer avec les nombres décimaux : le tableau de numération prolongé après la virgule et l'addition posée virgule sous virgule (6e).",
    },
  ],
  "/fiches-cours/maths/6e/fraction-nombre": [
    {
      id: "KT6rurM3Q3E",
      title: "Les fractions — Maths 6e — EleveAI",
      description:
        "Lire, représenter, comparer une fraction et calculer la fraction d'une quantité : disque, barres et comparaison dessinés pas à pas (6e).",
    },
  ],
  "/fiches-cours/maths/6e/prop-proportionnalite": [
    {
      id: "a2zNZzxuo4M",
      title: "La proportionnalité — Maths 6e — EleveAI",
      description:
        "Reconnaître une situation proportionnelle, le coefficient et le passage par l'unité, avec le tableau de proportionnalité dessiné pas à pas (6e).",
    },
  ],
  "/fiches-cours/maths/6e/pourcentage-nombre": [
    {
      id: "pAPkXW4EDsU",
      title: "Les pourcentages — Maths 6e — EleveAI",
      description:
        "Comprendre un pourcentage comme une fraction sur 100, calculer le pourcentage d'une quantité et passer de fraction à décimal à pourcentage, montré pas à pas (6e).",
    },
  ],
  "/fiches-cours/maths/6e/entier-calcul-mental": [
    {
      id: "fi-Xs0v2FoY",
      title: "Le calcul mental — Maths 6e — EleveAI",
      description:
        "Calculer de tête sans calculatrice : passer par la dizaine, arrondir puis corriger, multiplier par 5, la table à l'envers — montré pas à pas sur la droite graduée (6e).",
    },
  ],
  "/fiches-cours/maths/6e/aire-longueur": [
    {
      id: "rRCG7MQtq3I",
      title: "Les longueurs — Maths 6e — EleveAI",
      description:
        "Mesurer avec une règle graduée, convertir avec le tableau des unités (km au mm) et comparer deux longueurs dans la même unité, pas à pas (6e).",
    },
  ],
  "/fiches-cours/maths/6e/aire-perimetre": [
    {
      id: "1CYtvWeV3RM",
      title: "Les périmètres — Maths 6e — EleveAI",
      description:
        "Le périmètre = la longueur du tour : carré (4 × c), rectangle (2 × (L + l)) et figure quelconque, tracés et calculés pas à pas (6e).",
    },
  ],
  "/fiches-cours/maths/6e/aire-surface": [
    {
      id: "8ouss9DNzN0",
      title: "Les aires — Maths 6e — EleveAI",
      description:
        "L'aire = la surface : compter les carreaux, rectangle L × l, carré c × c et figure en L découpée, remplis carreau par carreau (6e).",
    },
  ],
  "/fiches-cours/maths/6e/volume-solide": [
    {
      id: "owc59Ln0k8s",
      title: "Les volumes — Maths 6e — EleveAI",
      description:
        "Le volume = la place dans l'espace : le cube unité (1 cm³), compter les cubes couche par couche et remplir une boîte (L × l × h), en vraies images 3D (6e).",
    },
  ],
  "/fiches-cours/maths/6e/angle-mesure": [
    {
      id: "46FnrLZLWZo",
      title: "Les angles — Maths 6e — EleveAI",
      description:
        "Un angle = un sommet et deux côtés : la famille aigu, droit, obtus, plat, et la mesure au rapporteur montrée pas à pas (6e).",
    },
  ],
  "/fiches-cours/maths/6e/triangle-figure": [
    {
      id: "MLrzaU8B0Og",
      title: "Les triangles — Maths 6e — EleveAI",
      description:
        "Nommer le triangle ABC, reconnaître sa nature (côtés et angles), la règle des 180° et l'inégalité triangulaire, dessinés pas à pas (6e).",
    },
  ],
};

export default function sitemap(): MetadataRoute.Sitemap {
  // Routes statiques
  const staticRoutes = [...ROUTES, ...coachRoutes, ...jeuxCartesRoutes].map((route) => {
    const videos = VIDEOS_FICHES[route.path];
    return {
      url: u(route.path),
      lastModified: route.lastMod ?? LASTMOD_CORE,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      ...(videos
        ? {
            videos: videos.map((v) => ({
              title: v.title,
              thumbnail_loc: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
              description: v.description,
              player_loc: `https://www.youtube.com/embed/${v.id}`,
            })),
          }
        : {}),
    };
  });

  // Articles de blog (générés dynamiquement depuis blogPosts.ts)
  const blogRoutes = getAllBlogPosts().map((post) => ({
    url: u(`/blog/${post.slug}`),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticRoutes, ...blogRoutes];
}
