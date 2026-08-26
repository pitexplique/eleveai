// app/sitemap.ts

import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blogPosts";
import { NIVEAUX, motsDeLaClasse } from "@/lib/dico";
import { cgvEnVigueur } from "@/lib/legal/editeur";
import { PDF_DISPONIBLES } from "@/lib/fiches/pdf-disponibles";

// ⚠️ AVEC LE www : `eleveai.fr` répond 308 vers `www.eleveai.fr`. Sans lui,
// les 270 lignes de ce fichier désignaient des adresses qui redirigent.
const BASE_URL = "https://www.eleveai.fr";

const u = (path: string) => `${BASE_URL}${path}`;

// 15-16/07 : l'accueil devient « Le Journal d'EleveAI » (manchette eleveai.fr,
// carrousel piloté par la régie, catalogue Supabase, abonnement) — et les
// défis du jour passent à la semaine « Les baleines sont là ! ».
// 18/07 : la Une respire (pastilles « aujourd'hui », fil recentré, agenda) et
// la famille des MACHINES « dans ta main » est au complet : cyclone, usine à
// sucre, fromagerie — chacune avec ses défis intégrés.
// Le Journal change TOUS LES JOURS (nouvelle Une, défi, dictée, article « un peu
// de maths »). On ne fige donc plus la home à une date : elle prend la date de
// (re)génération du sitemap — c'est-à-dire du dernier déploiement — pour porter
// honnêtement le signal « quotidien » vers Google, au lieu d'un lastmod périmé.
const LASTMOD_HOME    = new Date();
const LASTMOD_JOURNAL = new Date("2026-07-23");
const LASTMOD_MACHINES = new Date("2026-07-18");
const LASTMOD_EXPLORER = new Date("2026-07-02");
const LASTMOD_CORE    = new Date("2026-06-25");
const LASTMOD_CAHIERS = new Date("2026-06-29");
const LASTMOD_974     = new Date("2026-07-02");
const LASTMOD_JEUX    = new Date("2026-07-05");
const LASTMOD_FICHES  = new Date("2026-07-11");
// 12/07 : les 16 fiches IA refaites « en blocs » (fiche + flashcards + composeur)
const LASTMOD_FICHES_IA = new Date("2026-07-12");
// Le français entre dans les fiches de cours (première fiche : la grammaire du CM2).
const LASTMOD_FICHES_FR = new Date("2026-08-25");
// 23/08 : les fiches deviennent de vrais PDF, fabriques par Chrome depuis la page.
const LASTMOD_FICHES_PDF = new Date("2026-08-23");
// 25/07 : lancement des kits de survie lycée (Première spé maths en premier)
const LASTMOD_KIT = new Date("2026-07-28");
const LASTMOD_AUDIENCES = new Date("2026-07-05");
/* Les pages reprises le 21/08 : tarifs refaits (trois portes, offre famille,
   balisage FAQ) et la connexion sortie du `noindex`. Une date propre plutôt
   qu'un décalage de `LASTMOD_CORE`, qui aurait annoncé à tort une modification
   sur la quarantaine de pages qui la partagent. */
const LASTMOD_SEO_AOUT = new Date("2026-08-21");
/* ⭐ LA GRILLE TARIFAIRE A CHANGÉ LE 22/08 — et un `lastmod` qui ne bouge pas
   après un vrai changement de contenu est précisément ce qui retarde le
   recrawl. Google et Bing s'en servent pour décider s'ils reviennent : laisser
   /tarifs au 21/08 revenait à leur dire « rien de neuf » le lendemain du jour
   où tous les prix du site ont changé.
   ⚠️ UNE DATE À PART, et pas un décalage de `LASTMOD_SEO_AOUT` : celui-ci
   couvre aussi des pages que la grille n'a pas touchées, et les faire bouger
   toutes annoncerait des modifications qui n'ont pas eu lieu. La règle de ce
   fichier depuis juin : une date par vague de modifications réelle.
   ⛔ CETTE DATE SE MET À JOUR AVEC LA GRILLE, JAMAIS SEULE. Si `lib/tarifs.ts`
   bouge et pas elle, les huit pages ci-dessous mentent aux moteurs pendant des
   semaines — c'est exactement ce qui était arrivé à la SERP en juin, qui a
   annoncé « 4,90 €/mois » longtemps après la page. */
const LASTMOD_TARIFS = new Date("2026-08-22");
const LASTMOD_LEGAL   = new Date("2026-02-18");

// Les classes du site vivent dans `/programme/<classe>` (plus bas) : c'est là
// que chaque niveau a du TEXTE à lire. Les six listes de niveaux qui servaient
// à fabriquer les adresses à « ? » du coach sont parties avec elles — le
// pourquoi est écrit juste après la liste des routes.

type RouteConfig = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  lastMod?: Date;
};

const ROUTES: RouteConfig[] = [
  // ── ACCUEIL ────────────────────────────────────────────────────────────────
  // ⚠️ `/accueil` ET NON `/` : la racine répond 308 vers /accueil. Déclarer `/`
  // revenait à donner aux moteurs une adresse de redirection en page la plus
  // prioritaire du site — et à contredire la canonique, qui dit /accueil.
  { path: "/accueil", priority: 1.0, changeFrequency: "daily", lastMod: LASTMOD_HOME },

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

  // ── KITS DE SURVIE (lycée) ─────────────────────────────────────────────────
  { path: "/guide-de-survie",                priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/maths-premiere", priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/maths-seconde",  priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/maths-terminale", priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/maths-troisieme", priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/maths-quatrieme", priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/maths-cinquieme", priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/maths-sixieme",   priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/maths-cm2",       priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/maths-cm1",       priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/francais-cm1",    priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/francais-cm2",    priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/francais-6e",     priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/francais-5e",     priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/francais-4e",     priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/francais-3e",     priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/anglais-a1",      priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/anglais-a2",      priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/anglais-b1",      priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },
  { path: "/guide-de-survie/anglais-b2",      priority: 0.9, changeFrequency: "weekly", lastMod: LASTMOD_KIT },

  // ── FICHES DE COURS ────────────────────────────────────────────────────────
  { path: "/fiches-cours",      priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  { path: "/fiches-cours/maths", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/francais", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/cm2/grammaire-orthographe", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/cm2/phrase-complexe", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/cm2/grammaire-complements", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/cm2/grammaire-phrase", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/cm2/conjugaison-temps-simples", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/cm2/conjugaison-formes", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/cm2/conjugaison-recit", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/cm2/conjugaison-participe", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/6e/grammaire-complements", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/6e/grammaire-groupe-nominal", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/6e/grammaire-pronoms", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/6e/phrase-complexe", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/6e/grammaire-accords", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/6e/conjugaison-formes", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/6e/conjugaison-temps-composes", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/6e/conjugaison-modes", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/6e/conjugaison-valeurs", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  // ⭐ LA 5e OUVRE EN FRANÇAIS (24/08/2026). Elle est la seule classe déjà
  // passée au programme du 5 mars 2026 : ses trois fiches portent l'année
  // scolaire dans leur titre, parce que la requête tapée à la rentrée est
  // « français 5e 2026-2027 » et que les sites qui nous devancent l'écrivent.
  { path: "/fiches-cours/francais/5e/grammaire-phrase", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/5e/grammaire-fonctions", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/5e/grammaire-groupe-nominal", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/5e/grammaire-reprises", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/5e/orthographe-accords", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/5e/orthographe-participe", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/5e/conjugaison-temps", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/5e/discours-paroles-rapportees", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  // ⭐ LA 4e (25/08/2026). Ses trois fiches étaient en ligne et routées depuis
  // plusieurs jours sans être déclarées ici : aucune n'était donc soumise à
  // l'indexation. Elles suivent la 5e, même programme du 5 mars 2026.
  { path: "/fiches-cours/francais/4e/grammaire-phrase", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/4e/phrase-complexe", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
  { path: "/fiches-cours/francais/4e/orthographe-participe", priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES_FR },
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
  { path: "/fiches-cours/maths/5e/relatif-operation",   priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
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
  { path: "/fiches-cours/maths/5e/fraction-calcul",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/parallelogramme",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/divisibilite",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/algo-construire",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/prop-ratio-pourcentage",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/5e/grandeur-conversion",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/pythagore-theoreme",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/thales-theoreme",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/trigo-cosinus",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/quadrilatere-parallelogramme",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/sym-transformation",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
  { path: "/fiches-cours/maths/4e/stat-statistique",  priority: 0.85, changeFrequency: "weekly", lastMod: LASTMOD_FICHES },
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

  { path: "/dictee-du-jour",  priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_HOME },
  // Les rituels de langue (25/07) — « 5 mots par jour » A1→B2, répétition espacée.
  { path: "/anglais-du-jour",  priority: 0.9,  changeFrequency: "daily",  lastMod: new Date("2026-07-25") },
  { path: "/espagnol-du-jour", priority: 0.9,  changeFrequency: "daily",  lastMod: new Date("2026-07-25") },
  { path: "/calcul-rapide",   priority: 0.95, changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  { path: "/english-maths",   priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_CORE },
  // Semaine « Les baleines sont là ! » depuis le 16/07 (remplace le foot).
  { path: "/defis-du-jour",   priority: 0.9,  changeFrequency: "daily",  lastMod: LASTMOD_HOME },

  // ── ÉVALUATIONS NATIONALES COLLÈGE ─────────────────────────────────────────
  // ⚠️ AJOUTÉES LE 14/08, LIVRÉES DÉBUT AOÛT. Six pages en ligne depuis le 08,
  // dont aucune n'était déclarée : le hub et les quatre épreuves blanches se
  // sont retrouvés invisibles pendant toute la semaine où l'on mesurait
  // justement pourquoi les moteurs ne connaissent que cinq pages du site.
  // Priorité haute jusqu'à la rentrée — c'est en septembre qu'on les cherche.
  //
  // ⛔ /evaluation-nationale-college/ma-classe RESTE DEHORS : elle porte un
  // `noindex`. C'est la vue du professeur sur sa classe, pas une page publique.
  { path: "/evaluation-nationale-college",             priority: 0.9, changeFrequency: "weekly", lastMod: new Date("2026-08-11") },
  { path: "/evaluation-nationale-college/6e-maths",    priority: 0.9, changeFrequency: "weekly", lastMod: new Date("2026-08-11") },
  { path: "/evaluation-nationale-college/6e-francais", priority: 0.9, changeFrequency: "weekly", lastMod: new Date("2026-08-08") },
  { path: "/evaluation-nationale-college/4e-maths",    priority: 0.9, changeFrequency: "weekly", lastMod: new Date("2026-08-08") },
  { path: "/evaluation-nationale-college/4e-francais", priority: 0.9, changeFrequency: "weekly", lastMod: new Date("2026-08-08") },
  // ── ÉVALUATIONS NATIONALES GRATUIT EN PDF IMPRIMABLE (21/08) ───────────────
  //
  // ⚠️ LA FORMULE EST DE FRÉDÉRIC, et elle ne peut pas vivre dans le XML :
  // un sitemap ne porte que des URL, jamais de titre ni de description. Elle
  // est donc portée par le <title> de chaque sujet — c'est lui que Google
  // affiche — et reprise en tête de section ici pour qu'on retrouve
  // l'intention en relisant le fichier.
  // ⭐ CE SONT DES PAGES À PART, ET C'EST TOUT L'INTÉRÊT. « évaluation nationale
  // 6e maths » cherche à comprendre ; « évaluation nationale 6e à imprimer »,
  // « sujet PDF », « annales » cherchent une feuille. Deux intentions, deux
  // pages — c'est exactement d'où vient le trafic des cahiers de vacances, dont
  // tout passe par « à imprimer » et « PDF gratuit ».
  // LES QUATRE Y SONT depuis le 21/08 — deux niveaux, deux matières, comme les
  // épreuves à l'écran juste au-dessus.
  { path: "/evaluation-nationale-college/6e-maths/a-imprimer",    priority: 0.9, changeFrequency: "weekly", lastMod: new Date("2026-08-21") },
  { path: "/evaluation-nationale-college/6e-francais/a-imprimer", priority: 0.9, changeFrequency: "weekly", lastMod: new Date("2026-08-21") },
  { path: "/evaluation-nationale-college/4e-maths/a-imprimer",    priority: 0.9, changeFrequency: "weekly", lastMod: new Date("2026-08-21") },
  { path: "/evaluation-nationale-college/4e-francais/a-imprimer", priority: 0.9, changeFrequency: "weekly", lastMod: new Date("2026-08-21") },

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
  { path: "/concours-avenir", priority: 0.9,  changeFrequency: "weekly", lastMod: LASTMOD_CORE },
  // /concours-ia, /le-bon-prompt et /grand-oral sont des REDIRECTIONS
  // (nettoyage SERP du 25/07) : un sitemap ne liste que de vraies pages.

  // ── LA COMMUNAUTÉ DU JOURNAL (courrier des lecteurs, honneurs, contributions)
  // Pages publiques mises en avant par la Une depuis la refonte journal.
  { path: "/votre-avis",      priority: 0.6,  changeFrequency: "weekly", lastMod: LASTMOD_JOURNAL },
  { path: "/remerciements",   priority: 0.6,  changeFrequency: "weekly", lastMod: LASTMOD_JOURNAL },
  { path: "/besoin-de-vous",  priority: 0.6,  changeFrequency: "weekly", lastMod: LASTMOD_JOURNAL },

  // ── MATHS RÉEL · 974 + LES MACHINES « DANS TA MAIN » ───────────────────────
  // HIÉRARCHIE (décision 24/07) : ces pages sont des PORTES D'ENTRÉE, pas la
  // destination. Le coach (0.95) entraîne, les parcours (0.95) testent — eux
  // restent au-dessus. Les simulateurs/histoires « un peu de maths » sont donc
  // volontairement à 0.8 : ils amènent le lecteur, qui doit ensuite aller au
  // coach. (Le cyclone remontera à la saison cyclonique — novembre.)
  // Le hub de TOUTES les machines (24/07) — la porte principale de la famille,
  // au-dessus des machines individuelles (0.8).
  { path: "/simulateurs",     priority: 0.85, changeFrequency: "weekly", lastMod: new Date("2026-07-24") },
  { path: "/maths-974",       priority: 0.8,  changeFrequency: "weekly", lastMod: LASTMOD_974 },
  { path: "/simulateur-cyclone", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_MACHINES },
  { path: "/simulateur-sucre", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_MACHINES },
  { path: "/simulateur-fromage", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_MACHINES },
  // Le barrage de Takamaka (19/07) — l'eau de l'île fait la lumière.
  { path: "/simulateur-barrage", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-19") },
  // Le volcan (19/07) — la Fournaise qui fabrique l'île.
  { path: "/simulateur-volcan", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-19") },
  // Le lagon de l'Ermitage (20/07) — la muraille vivante qui fait la plage.
  { path: "/simulateur-lagon", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-20") },
  // La salle de sport dans ta main (24/07) — l'effort en watts → joules → kcal,
  // le rendement musculaire de 25 %, puis l'assiette qui répare le muscle.
  { path: "/simulateur-energie", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-24") },
  // L'hôtel dans ta main (05/08) — le métier d'hôtelier en pourcentages :
  // taux d'occupation, recette, RevPAR, point mort. Née à Terre-Sainte.
  { path: "/simulateur-hotel", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-08-05") },
  // La machine des epsilons (20/07) — le coefficient k, la suite géométrique :
  // « activer des epsilons peut engendrer des infinis ».
  { path: "/simulateur-epsilon", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-20") },
  // La courbe en cloche (21/07) — de la binomiale (les coefficients de Pascal)
  // à la loi normale : le théorème de De Moivre-Laplace dans un curseur.
  { path: "/loi-normale", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-21") },
  // L'exponentielle en miroir (22/07) — la montée (e^x) et la descente (courbe
  // de l'oubli d'Ebbinghaus) : deux courbes nées d'un dessin au stylo.
  { path: "/exponentielle", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-22") },
  // La loi de la performance (22/07) — le neurone du dessin de Mbappé : ADN →
  // variables x → coefficients → réseau → performance. « Faut-il améliorer ses
  // défauts ou ses qualités ? »
  { path: "/loi-performance", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-22") },
  // Le but qui sort de la moyenne (22/07) — la loi de Pareto : la queue lourde
  // où naissent les records, opposée à la cloche de la loi normale.
  { path: "/loi-pareto", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-22") },
  // La Diagonale des Fous (23/07) — l'équation différentielle du coureur : la
  // réserve se vide au carré de l'effort et avec la pente (méthode d'Euler).
  { path: "/diagonale-des-fous", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-23") },
  // L'aiguille de Kakeya (25/07) — Hong Wang, médaille Fields 2026 : le problème de
  // Kakeya (demi-tour économe, π/2 → π/4 → π/8 → 0) et son tableau décodé.
  { path: "/aiguille-de-kakeya", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-25") },
  // La vitrine ANGLAISE de l'aiguille (28/07) — même machine, texte anglais :
  // vise le trafic mondial « Kakeya needle », première d'une famille /en/simulators/*.
  { path: "/en/simulators/kakeya-needle", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-28") },
  // ⚠️ 14/08 — LA FAMILLE ANGLAISE ANNONCÉE CI-DESSUS N'AVAIT QUE SON PREMIER
  // MEMBRE DÉCLARÉ. Le hub /en/simulators et la deuxième machine existaient
  // depuis le 10/08 sans qu'aucun moteur en entende parler.
  { path: "/en/simulators", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-08-10") },
  { path: "/en/simulators/round-bubbles", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-08-10") },
  // Pourquoi les bulles sont rondes (10/08) — l'isopérimétrie : le moins de
  // peau possible autour du plus de volume. Avec sa fiche à imprimer.
  { path: "/pourquoi-les-bulles-sont-rondes", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-08-10") },
  { path: "/pourquoi-les-bulles-sont-rondes/fiche", priority: 0.75, changeFrequency: "weekly", lastMod: new Date("2026-08-10") },
  // Le corail du lagon (10/08) — la même idée prise par l'autre bout : la
  // surface maximale pour un volume donné, l'inverse de la bulle.
  { path: "/corail-du-lagon", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-08-10") },
  // La dimension du volcan (26/07) — box-counting sur le rempart de la
  // Fournaise : la rugosité en un nombre (d ≈ 1,25), l'idée de la médaille.
  { path: "/dimension-du-volcan", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-07-26") },
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
  { path: "/espace-profs",     priority: 0.9,  changeFrequency: "monthly", lastMod: LASTMOD_TARIFS },
  // ⚠️ Entrée au sitemap le 12/08 — ce qui a OBLIGÉ à retirer le `noindex` de
  // la page. Annoncer une adresse à Google et lui interdire de l'indexer dans
  // la même journée, c'est se signaler une erreur à soi-même dans la Search
  // Console. Elle était en noindex parce qu'elle est en essai ; elle est
  // maintenant assumée comme une porte, avec un titre qui se cherche.
  { path: "/photo-cours",      priority: 0.8,  changeFrequency: "monthly", lastMod: new Date("2026-08-12") },
  { path: "/francais-de-l-etranger", priority: 0.9, changeFrequency: "weekly", lastMod: new Date("2026-07-10") },

  // ── PROGRAMME PAR CLASSE (moteur SEO n°2 : les compétences des banques
  //    exposées en texte, façon pages « skills » d'IXL) ──────────────────────
  ...["cp", "ce1", "ce2", "cm1", "cm2", "6e", "5e", "4e", "3e", "seconde", "premiere-spe", "terminale-spe"].map((c) => (
    { path: `/programme/${c}`, priority: 0.9, changeFrequency: "monthly" as const, lastMod: new Date("2026-07-11") }
  )),
  { path: "/espace-ecoles",   priority: 0.95, changeFrequency: "monthly", lastMod: LASTMOD_TARIFS },
  { path: "/espace-eleves",   priority: 0.85, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/espace-parents",  priority: 0.8,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },

  // ── AUTH (public) ──────────────────────────────────────────────────────────
  // ⚠️ 21/08 : c'est `/auth/signin` qui est déclarée, pas `/auth/signin-eleve`.
  // Cette dernière ne contient qu'un `redirect()` vers la première — le site
  // annonçait donc à Google une adresse qui n'affiche rien, et qui menait de
  // surcroît à une page alors en `noindex`. Une redirection ne se met pas au
  // sitemap : on y met sa destination.
  { path: "/auth/signin", priority: 0.8, changeFrequency: "monthly", lastMod: LASTMOD_SEO_AOUT },

  // ── INSTITUTIONNEL ─────────────────────────────────────────────────────────
  { path: "/pourquoi-eleveai",  priority: 0.75, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/qui-sommes-nous",   priority: 0.7,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  // 0,7 → 0,85 le 21/08 : la page est devenue une destination de l'en-tête et
  // porte désormais les trois offres. Elle n'est plus une annexe.
  { path: "/tarifs",            priority: 0.85, changeFrequency: "monthly", lastMod: LASTMOD_TARIFS },
  // ⭐ 22/08 — LA FORMATION CRPE ENTRE AU SITEMAP, le statut URSSAF étant réglé.
  // `weekly` et non `monthly` : les inscriptions se jouent avant le 3 octobre et
  // le nombre de places bouge. Priorité 0,8, au niveau de /tarifs et non des
  // pages institutionnelles : c'est une offre datée, pas une page de présentation.
  // ⚠️ Elle vise une requête locale et étroite — « préparation CRPE Réunion »,
  // « maths CRPE Saint-Pierre ». Ne pas espérer du volume : ce qui compte est
  // qu'un candidat de l'île qui cherche exactement ça la trouve.
  { path: "/formation-crpe",    priority: 0.8,  changeFrequency: "weekly",  lastMod: LASTMOD_SEO_AOUT },
  { path: "/contact",           priority: 0.65, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  // 20/07 : les pages de la PHILOSOPHIE qui manquaient au sitemap (audit
  // Frédéric « qu'il n'oublie pas notre philosophie ») — la charte d'usage de
  // l'IA (la confiance), les tarifs justes (gratuit pour l'élève, jamais la
  // famille), le pilote gratuit, la presse et les partenaires (l'institution).
  { path: "/charte",            priority: 0.7,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/pourquoi-nos-tarifs-sont-justes", priority: 0.65, changeFrequency: "monthly", lastMod: LASTMOD_TARIFS },
  { path: "/offre-pilote",      priority: 0.7,  changeFrequency: "monthly", lastMod: LASTMOD_TARIFS },
  { path: "/presse",            priority: 0.6,  changeFrequency: "monthly", lastMod: LASTMOD_TARIFS },
  { path: "/partenaires",       priority: 0.6,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/entreprises",       priority: 0.6,  changeFrequency: "monthly", lastMod: new Date("2026-07-22") },
  // 11/08 : les 50 places de la bêta 2026-2027. Priorité haute pour la rentrée,
  // puis elle retombera d'elle-même quand les places seront prises.
  { path: "/devenir-beta-testeur", priority: 0.8, changeFrequency: "weekly", lastMod: new Date("2026-08-11") },

  // ── BLOG INDEX ─────────────────────────────────────────────────────────────
  { path: "/blog", priority: 0.8, changeFrequency: "weekly", lastMod: LASTMOD_CORE },

  // ── FAQ ────────────────────────────────────────────────────────────────────
  { path: "/faq",                   priority: 0.6,  changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq/faq-professeurs",   priority: 0.55, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq/faq-parents",       priority: 0.55, changeFrequency: "monthly", lastMod: LASTMOD_CORE },
  { path: "/faq/faq-administration",priority: 0.5,  changeFrequency: "monthly", lastMod: LASTMOD_TARIFS },
  { path: "/faq/faq-tarifs",        priority: 0.7,  changeFrequency: "monthly", lastMod: LASTMOD_TARIFS },

  // ── LÉGAL ──────────────────────────────────────────────────────────────────
  { path: "/mentions-legales",           priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
  { path: "/politique-confidentialite",  priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
  { path: "/cgu",                        priority: 0.3, changeFrequency: "yearly", lastMod: LASTMOD_LEGAL },
  /* Les CGV n'entrent au sitemap que le jour où elles engagent : tant que rien
     ne se vend, la page se déclare elle-même en `noindex` (voir app/cgv). */
  ...(cgvEnVigueur
    ? [{ path: "/cgv", priority: 0.3, changeFrequency: "yearly" as const, lastMod: LASTMOD_LEGAL }]
    : []),
];

// ⛔ LES 62 ADRESSES À « ? » SONT PARTIES (10/08/2026).
//
// On déclarait ici une ligne par classe et par niveau — `/coach-ia/maths?classe=cp`,
// `/parcours-ia?niveau=b1`, `/coach-ia/english-maths?niveau=a1&rubrique=sports`…
// Vue de Google, chacune était un DOUBLON de la page nue : le coach est rendu
// côté client, le paramètre ne change pas une ligne de ce que le robot lit, et
// la page elle-même déclare sa canonique sans paramètre (`/coach-ia/maths`).
// On envoyait donc 62 adresses en disant, dans le même souffle, qu'aucune ne
// compte. C'est exactement ce que la Search Console range en « URL envoyée non
// sélectionnée comme canonique » — du bruit qu'on avait écrit nous-mêmes.
//
// ⭐ CE QUI COUVRE VRAIMENT LE BESOIN : les pages `/programme/<classe>`, une par
// classe du CP à la Terminale, avec les compétences EN TEXTE. Un moteur peut les
// lire ; elles renvoient au coach. Le travail par classe se fait là, pas ici.
//
// ⚠️ Les adresses continuent de MARCHER — un lien partagé, un favori, le
// bouton d'une carte : rien n'est cassé. On cesse seulement de les déclarer.
// Les 9 pages nues (`/coach-ia/maths`, `/parcours-ia`, …) restent dans ROUTES.

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
  // La salle de sport porte son Short (24/07) : l'effort et les protéines.
  "/simulateur-energie": [
    {
      id: "XdBT05f9_F0",
      title:
        "1 minute à fond = même pas un carré de chocolat ?! — l'effort et les protéines, La Réunion",
      description:
        "250 watts pendant une minute sur le rameur : 15 000 joules, soit 3,6 kcal — même pas un sixième de carré de chocolat. Le rendement musculaire de 25 % explique pourquoi le corps brûle 4 fois plus, et pourquoi tu as chaud. Puis la récup : les protéines de l'assiette.",
    },
  ],
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
  const staticRoutes = [...ROUTES, ...jeuxCartesRoutes].map((route) => {
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

  // ⭐ LES PDF DES FICHES (23/08/2026) — et Google les indexe comme des
  // documents à part entière, pas comme une pièce jointe de la page.
  //
  // C'est la moitié de l'intérêt d'avoir fabriqué de vrais fichiers plutôt que
  // de laisser une boîte d'impression : chaque fiche gagne une SECONDE entrée
  // possible dans les résultats, et le nom du fichier est lui-même indexé —
  // « fractions-6e-cours-exercices-corriges.pdf ».
  //
  // ⚠️ LA LISTE SE GÉNÈRE, ELLE NE S'ÉCRIT PAS. `PDF_DISPONIBLES` est réécrit
  // par scripts/build-fiches-pdf.ts, qui relit public/fiches/. Un PDF fabriqué
  // entre donc au sitemap sans que personne ait à y penser — et un PDF supprimé
  // en sort, ce qui évite le précédent de /photo-cours (une adresse au sitemap
  // que le site demandait aux moteurs d'ignorer).
  // ⚠️ Priorité plus basse que la page : le PDF est une COMMODITÉ, la page est
  // la ressource. S'ils se concurrencent, c'est la page qu'on veut voir sortir.
  const pdfRoutes = [...PDF_DISPONIBLES].map((f) => ({
    url: u(`/fiches/${f}`),
    lastModified: LASTMOD_FICHES_PDF,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...blogRoutes, ...pdfRoutes];
}
