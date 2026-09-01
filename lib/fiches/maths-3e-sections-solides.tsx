// ─── Fiche de cours : les sections planes de solides (3e) ──────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/sections_solides.bank.ts, notionId sections_solides).
//
// ⭐ UNE NOTION QUI N'EXISTE QU'EN 3e. Contrairement à Thalès (repris de la 4e)
// ou aux équations (six micros sur sept déjà vues), les sections planes sont
// entièrement nouvelles : aucune classe antérieure n'a de micro qui les
// mentionne. C'est, avec l'homothétie, l'un des deux vrais apports de l'année
// en géométrie.
//
// ⭐⭐ CETTE FICHE A DEMANDÉ DE RÉPARER LE CANVAS `section_solide`, qui était
// INUTILISABLE dans une fiche. Tout y est en coordonnées absolues calées sur
// 340 px de large : à 222 px, garder 340 rend les libellés à 7,8 px (plancher
// 11), et demander 222 fait SORTIR le dessin — le viewBox rétrécit, le dessin
// non. C'est le piège de `solide_3d` en août : réduire ROGNE.
// 👉 Corrigé par un décalage du groupe (`width / 2 − 170`), qui recentre les
// quatre solides sans toucher une coordonnée — et qui vaut exactement ZÉRO à la
// largeur par défaut, donc sans rien déplacer dans les 40 questions du coach.
//
// ⭐⭐ ET IL A FALLU UN SECOND CORRECTIF : SÉPARER LES BULLES DE LA SECTION.
// `showPlane` portait les deux — la zone orange (le cœur du dessin) et les
// bulles « plan » et « section ». Or celles-ci sont posées à des x absolus
// (62 et 278) dans des boites de 92 px : à elles seules, elles réclament plus
// de 184 px de large EN PLUS du solide. Aucune carte de fiche ne les loge, et
// les éteindre avec `showPlane` aurait emporté la section orange. D'où le
// drapeau `showCallouts`, à `true` par défaut pour ne rien déplacer au coach.
//
// ⭐ PUIS UNE DÉCISION, ET C'EST ELLE QUI DÉBLOQUE TOUT : AUCUN TEXTE DANS LE
// SVG. Titre, nom de la section, bulles, mini-légende — tout est éteint, et
// c'est la légende HTML sous le dessin qui dit ce qu'on regarde. Elle est en
// 12 px de PAGE, pas de SVG : elle ne rétrécit jamais.
// 👉 Le dessin devient alors libre d'échelle. On serre le cadre à 170 × 210 et
// on le laisse s'AGRANDIR jusqu'à la largeur du bloc, au lieu de le rétrécir.
//
// ⛔ AU PASSAGE, `showSectionName` : le canvas écrit « Section : disque » au
// dessus du dessin. C'est ce qui avait rendu 24 questions de 3e inutiles le
// 31/08. Ici il est éteint pour une raison de lisibilité, mais dans une fiche
// on POURRAIT le vouloir — c'est la légende qui joue ce rôle.
//
// ⭐ LES MICROS ONT ÉTÉ LUES AVANT D'ÉCRIRE, et les six sont couvertes :
//   section_reconnaitre       → une section est une figure PLANE, à 2 dimensions
//   section_pave_cube         → parallèle à une face : rectangle (carré au cube)
//   section_cylindre          → parallèle à la base : disque ; contenant l'axe :
//                               rectangle. « Toute section est un disque » est faux
//   section_cone_pyramide     → parallèle à la base : réduction de la base
//   section_calculer_longueur → la diagonale d'une section 6 × 8, par Pythagore
//                               (et non 6 + 8 = 14, l'erreur testée par la banque)
//   section_defi              → défis
//
// ⚠️ CHEVAUCHEMENT SIGNALÉ, NON TRAITÉ : la micro `volume_section` de la notion
// `volume_geometrie_espace` s'intitule « Comprendre une section de solide » et
// recouvre `section_reconnaitre`. Deux notions enseignent la même chose. C'est
// un arbitrage de découpage, pas une correction de fiche.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

/**
 * Un solide et le plan qui le coupe.
 *
 * ⛔⛔ AUCUN TEXTE DANS LE SVG, ET C'EST LA DÉCISION QUI REND CE CANVAS
 * UTILISABLE. Ses textes sont écrits en 11, 12 et 13 px dans un repère de
 * 340 : dès que le cadre rétrécit, ils passent sous le plancher de 11 px.
 * Mesuré dans une carte de fiche : 8,0 px. Et ils ne peuvent pas être
 * agrandis, parce que les bulles « plan » et « section » occupent à elles
 * seules 184 px de large et ne tiennent pas dans une carte.
 * 👉 On les éteint TOUS — titre, nom de la section, bulles, mini-légende — et
 * c'est la légende HTML sous le dessin qui dit ce qu'on regarde. Elle est en
 * 12 px de page, pas de SVG : elle ne rétrécit jamais.
 * ⭐ Le dessin devient alors libre d'échelle, et le cadre peut être serré.
 * ⛔ MAIS PAS AUTANT QU'ON CROIT, ET LE CALCUL LE DIT. Chaque solide a son
 * emprise dans le repère d'origine : cylindre [98 ; 242], pyramide [78 ; 270],
 * pavé [82 ; 282] — et le décalage recentre sur 170, pas sur le milieu du
 * solide. Après translation, le pavé occupe [w/2 − 88 ; w/2 + 112] : il faut
 * donc w/2 + 112 ≤ w, soit w ≥ 224. Un cadre de 170 le faisait sortir des DEUX
 * côtés, ce que la mesure a montré et que l'œil aurait laissé passer.
 * 👉 230, la plus petite largeur qui tient les cinq solides.
 */
const section = (
  solide: "cube" | "pave_droit" | "cylindre" | "cone" | "pyramide",
  coupe: "parallele_face" | "parallele_base" | "parallele_axe",
) => (
  <CanvasRenderer
    figure={
      {
        kind: "section_solide",
        solide,
        section: coupe,
        size: { width: 230, height: 215 },
        display: {
          showPlane: true,
          showLabels: false,
          showSectionName: false,
          showCallouts: false,
          showMiniLegend: false,
        },
      } as never
    }
  />
);

const tableau = (data: Record<string, unknown>, compact = false) => (
  <CanvasRenderer
    figure={{ kind: "tableau_donnees", display: { compact }, ...data } as never}
  />
);

export const ficheSectionsSolides3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "sections-solides",
  titre: "Les sections planes de solides",
  accroche:
    "Couper un solide et regarder la tranche : voilà tout le chapitre. La difficulté n'est pas le calcul, elle est de VOIR — une section est une figure plate, à deux dimensions, obtenue d'un objet qui en a trois. Et sa forme ne dépend pas seulement du solide : elle dépend surtout de la façon dont on le coupe.",
  identite: [
    { label: "Prérequis", valeur: "Solides usuels, perspective cavalière, Pythagore" },
    { label: "L'idée clé", valeur: "La coupe décide de la forme, pas le solide seul" },
    { label: "Outil", valeur: "Se représenter le plan qui traverse" },
  ],
  definition: {
    texte:
      "Faire une section plane d'un solide, c'est le couper par un plan et regarder la figure obtenue. Cette figure est toujours PLANE : elle n'a que deux dimensions, alors que le solide en a trois. Sa forme dépend à la fois du solide et de l'orientation du plan de coupe — un même cylindre donne un disque ou un rectangle selon la façon dont on le tranche.",
  },
  figure: {
    schema: legende(
      section("cylindre", "parallele_base"),
      "la tranche est PLATE : c'est une figure à deux dimensions",
    ),
    legende:
      "Le plan orange coupe le cylindre parallèlement à sa base. La section obtenue est un disque.",
  },
  proprietes: [
    {
      titre: "Une section est toujours une figure plane",
      texte:
        "C'est le point de départ, et il se perd vite. Le solide a trois dimensions, la section n'en a que deux : c'est une figure de géométrie plane, comme celles qu'on trace au compas. On peut donc lui appliquer tout ce qu'on sait des rectangles, des disques et des triangles.",
      micros: ["section_reconnaitre"],
      schema: legende(
        section("cube", "parallele_face"),
        "trois dimensions coupées, deux dimensions obtenues",
      ),
    },
    {
      titre: "La coupe décide autant que le solide",
      texte:
        "Un même solide donne des sections très différentes selon l'orientation du plan. C'est pourquoi la question n'est jamais « quelle est la section d'un cylindre » mais toujours « coupé COMMENT ». Dire qu'une section de cylindre est un disque est faux si la coupe contient l'axe.",
      micros: ["section_reconnaitre", "section_cylindre"],
      schema: tableau({
        headers: ["le cylindre coupé", "la section"],
        rows: [
          { values: ["parallèlement à la base", "un disque"] },
          { values: ["selon un plan contenant l'axe", "un rectangle"] },
        ],
        caption: "même solide, deux formes",
      }),
    },
    {
      titre: "Pavé ou cube coupé parallèlement à une face",
      texte:
        "La section est un RECTANGLE, identique à la face à laquelle le plan est parallèle. Dans un cube, toutes les faces sont des carrés : la section est donc un carré. Croire qu'une section de pavé est toujours un triangle est une erreur classique.",
      micros: ["section_pave_cube"],
      schema: legende(
        section("pave_droit", "parallele_face"),
        "un rectangle, de mêmes dimensions que la face",
      ),
    },
    {
      titre: "Cylindre coupé parallèlement à la base",
      texte:
        "La section est un DISQUE, exactement de même rayon que la base. C'est le cas le plus simple : le plan glisse le long du cylindre sans jamais changer la forme obtenue, seulement sa hauteur.",
      micros: ["section_cylindre"],
      schema: legende(
        section("cylindre", "parallele_base"),
        "un disque, de même rayon que la base",
      ),
    },
    {
      titre: "Cylindre coupé selon un plan contenant l'axe",
      texte:
        "Ici la section est un RECTANGLE. Sa largeur vaut le diamètre du cylindre, sa hauteur celle du cylindre. C'est la coupe qu'on obtient en tranchant une boite de conserve verticalement, en passant par le milieu.",
      micros: ["section_cylindre"],
      schema: legende(
        section("cylindre", "parallele_axe"),
        "un rectangle : diamètre sur hauteur",
      ),
    },
    {
      titre: "Cône ou pyramide coupés parallèlement à la base",
      texte:
        "La section est une RÉDUCTION de la base : un disque plus petit pour le cône, un polygone semblable pour la pyramide. C'est une homothétie de centre le sommet — la même notion que dans le chapitre des transformations.",
      micros: ["section_cone_pyramide"],
      schema: legende(
        section("cone", "parallele_base"),
        "un disque plus petit : une réduction de la base",
      ),
    },
    {
      titre: "La pyramide donne un polygone semblable",
      texte:
        "Coupée parallèlement à sa base, une pyramide donne un polygone de même forme que la base, mais plus petit. Si la base est un carré, la section est un carré ; si c'est un triangle, la section est un triangle.",
      micros: ["section_cone_pyramide"],
      schema: legende(
        section("pyramide", "parallele_base"),
        "même forme que la base, taille réduite",
      ),
    },
    {
      titre: "Dans la section, on calcule à plat",
      texte:
        "Une fois la section identifiée, on oublie le solide : c'est une figure plane ordinaire. Pour trouver la diagonale d'une section rectangulaire de 6 cm sur 8 cm, on applique Pythagore — et l'on trouve 10 cm, PAS 6 + 8 = 14.",
      micros: ["section_calculer_longueur"],
      schema: tableau({
        headers: ["calcul", "résultat"],
        rows: [
          { values: ["6 + 8", "14 — FAUX"] },
          { values: ["√(6² + 8²) = √100", "10 cm"] },
        ],
        highlight: { row: 1 },
        caption: "une diagonale se calcule, elle ne s'additionne pas",
      }),
    },
  ],
  reel: {
    texte:
      "La section plane est le geste de la coupe technique. Un plan d'architecte montre une maison coupée verticalement ; une IRM produit des centaines de sections du corps, chacune plate ; un géologue lit une falaise comme la section d'un terrain. Et plus simplement : trancher un saucisson droit donne un disque, en biais un ovale — le même objet, deux formes, selon l'angle du couteau.",
  },
  historique: {
    texte:
      "Les sections du cône ont fasciné les Grecs bien avant d'être utiles : vers 200 avant notre ère, Apollonius de Perga montre qu'en inclinant le plan de coupe on obtient un cercle, une ellipse, une parabole ou une hyperbole. Ces courbes semblaient purement théoriques. Dix-huit siècles plus tard, Kepler découvre que les planètes décrivent des ellipses : les sections coniques décrivaient le ciel sans que personne l'ait soupçonné.",
  },
  formule: {
    contexte: "Les sections à connaitre",
    expression: "$\\text{solide} + \\text{orientation du plan} \\rightarrow \\text{la forme}$",
    legende:
      "Pavé ou cube parallèlement à une face : rectangle (carré au cube). Cylindre parallèlement à la base : disque ; selon l'axe : rectangle. Cône ou pyramide parallèlement à la base : une réduction de la base.",
    schema: tableau(
      {
        headers: ["solide", "coupe", "section"],
        rows: [
          { values: ["pavé", "// face", "rectangle"] },
          { values: ["cube", "// face", "carré"] },
          { values: ["cylindre", "// base", "disque"] },
          { values: ["cylindre", "axe", "rectangle"] },
          { values: ["cône", "// base", "disque réduit"] },
        ],
        highlight: { col: 2 },
      },
      true,
    ),
  },
  methode: [
    {
      titre: "Repérer l'orientation du plan",
      texte:
        "Avant de nommer quoi que ce soit, on regarde COMMENT le plan traverse : parallèlement à une face, parallèlement à la base, ou en passant par l'axe. C'est cette orientation qui décide de la forme.",
      micros: ["section_reconnaitre"],
    },
    {
      titre: "Nommer la forme obtenue",
      texte:
        "On applique la règle du solide concerné. Un doute se lève en imaginant le plan qui glisse : la forme change-t-elle ? Si non, c'est que la coupe est parallèle à une face ou à la base.",
      micros: ["section_pave_cube", "section_cylindre", "section_cone_pyramide"],
      schema: legende(
        section("cylindre", "parallele_axe"),
        "le plan passe par l'axe : rectangle",
      ),
    },
    {
      titre: "Dessiner la section à plat",
      texte:
        "On la redessine SÉPARÉMENT du solide, en vraie grandeur, avec ses dimensions. C'est ce dessin-là qui sert au calcul — pas la perspective, où les longueurs sont déformées.",
      micros: ["section_calculer_longueur"],
    },
    {
      titre: "Calculer dans le plan",
      texte:
        "Une fois à plat, on emploie les outils de géométrie plane : Pythagore pour une diagonale, la formule de l'aire du rectangle ou du disque. Le solide n'intervient plus.",
      micros: ["section_calculer_longueur"],
    },
  ],
  usages: [
    {
      titre: "On demande la forme de la section",
      detail:
        "On identifie le solide ET l'orientation du plan, puis on applique la règle correspondante.",
      micros: ["section_pave_cube", "section_cylindre"],
    },
    {
      titre: "On demande une longueur dans la section",
      detail:
        "On redessine la section à plat avec ses dimensions, puis on calcule comme en géométrie plane.",
      micros: ["section_calculer_longueur"],
    },
    {
      titre: "On demande une aire",
      detail:
        "Même geste : la section est un rectangle, un carré ou un disque — on emploie sa formule d'aire habituelle.",
      micros: ["section_calculer_longueur"],
    },
  ],
  exemples: [
    {
      titre: "Un cube coupé parallèlement à une face",
      donnees: "Un cube d'arête 5 cm, coupé par un plan parallèle à l'une de ses faces.",
      question: "Quelle est la forme de la section, et ses dimensions ?",
      solution:
        "La section est identique à la face à laquelle le plan est parallèle. Les faces d'un cube sont des carrés de 5 cm de côté : la section est donc un carré de 5 cm de côté, quelle que soit la hauteur de la coupe.",
      micros: ["section_pave_cube"],
      schema: legende(
        section("cube", "parallele_face"),
        "un carré de 5 cm de côté",
      ),
    },
    {
      titre: "Un cylindre, deux coupes",
      donnees:
        "Un cylindre de rayon 3 cm et de hauteur 10 cm. On le coupe d'abord parallèlement à sa base, puis selon un plan contenant son axe.",
      question: "Quelles sont les deux sections ?",
      solution:
        "Parallèlement à la base : un disque de rayon 3 cm, comme la base. Selon un plan contenant l'axe : un rectangle de 6 cm de large (le diamètre) et 10 cm de haut. Le même solide donne deux formes différentes — c'est la coupe qui décide.",
      micros: ["section_cylindre"],
      schema: legende(
        section("cylindre", "parallele_axe"),
        "la seconde coupe : un rectangle de 6 sur 10",
      ),
    },
    {
      titre: "La diagonale d'une section",
      donnees: "La section d'un pavé est un rectangle de 6 cm sur 8 cm.",
      question: "Combien mesure sa diagonale ?",
      solution:
        "La section est une figure plane : on y applique Pythagore. La diagonale d vérifie d² = 6² + 8² = 36 + 64 = 100, donc d = 10 cm. Ce n'est PAS 6 + 8 = 14 : une diagonale est toujours plus courte que la somme des deux côtés.",
      micros: ["section_calculer_longueur"],
    },
    {
      titre: "Un cône coupé parallèlement à sa base",
      donnees: "Un cône de rayon 6 cm, coupé à mi-hauteur par un plan parallèle à sa base.",
      question: "Quelle est la section ?",
      solution:
        "C'est un disque, réduction de la base. La coupe étant à mi-hauteur, le rapport de réduction est 1/2 : le disque obtenu a pour rayon 3 cm. C'est une homothétie de centre le sommet du cône.",
      micros: ["section_cone_pyramide"],
      schema: legende(
        section("cone", "parallele_base"),
        "un disque réduit de moitié",
      ),
    },
  ],
  pieges: [
    "Croire qu'une section de cylindre est toujours un disque : coupé selon son axe, il donne un rectangle.",
    "Croire qu'une section de pavé est toujours un triangle : parallèlement à une face, c'est un rectangle.",
    "Oublier que la section est PLANE : elle n'a que deux dimensions, et se calcule comme une figure plate.",
    "Additionner les côtés pour trouver une diagonale : 6 et 8 donnent 10 par Pythagore, jamais 14.",
    "Calculer sur la perspective : les longueurs y sont déformées. On redessine la section à plat d'abord.",
    "Répondre « quelle est la section de ce solide » sans regarder l'orientation du plan : la question n'a pas de réponse sans elle.",
  ],
  aRetenir: [
    "Une section plane est une figure à DEUX dimensions, obtenue d'un solide qui en a trois.",
    "Sa forme dépend du solide ET de l'orientation du plan de coupe.",
    "Pavé ou cube parallèlement à une face : un rectangle, un carré pour le cube.",
    "Cylindre parallèlement à la base : un disque ; selon un plan contenant l'axe : un rectangle.",
    "Cône ou pyramide parallèlement à la base : une réduction de la base.",
    "On redessine la section à plat avant de calculer, et on y applique Pythagore ou les formules d'aire.",
  ],
  entrainement: [
    {
      question: "Une section plane est-elle un objet à deux ou à trois dimensions ?",
      correction:
        "À deux. Le solide en a trois, mais la figure obtenue par la coupe est plate : c'est une figure de géométrie plane.",
      micros: ["section_reconnaitre"],
    },
    {
      question: "Quelle est la section d'un cube par un plan parallèle à une face ?",
      correction:
        "Un carré, identique à cette face. Les faces d'un cube étant toutes des carrés, la section l'est aussi.",
      micros: ["section_pave_cube"],
    },
    {
      question:
        "Un élève dit : « Toute section d'un cylindre est un disque. » A-t-il raison ?",
      correction:
        "Non. C'est vrai pour une coupe parallèle à la base, mais un plan contenant l'axe donne un RECTANGLE, de largeur le diamètre et de hauteur celle du cylindre.",
      micros: ["section_cylindre"],
    },
    {
      question:
        "Quelle est la section d'une pyramide par un plan parallèle à sa base ?",
      correction:
        "Un polygone semblable à la base, mais plus petit : c'est une réduction de la base, par une homothétie de centre le sommet.",
      micros: ["section_cone_pyramide"],
    },
    {
      question:
        "Dans une section rectangulaire de 6 cm sur 8 cm, combien mesure la diagonale ?",
      correction:
        "On applique Pythagore : d² = 6² + 8² = 100, donc d = 10 cm. Additionner les côtés donnerait 14, ce qui est faux.",
      micros: ["section_calculer_longueur"],
    },
    {
      question:
        "Pourquoi la section d'un pavé droit par un plan parallèle à une face est-elle un rectangle ?",
      correction:
        "Parce que le plan coupe les quatre faces latérales perpendiculaires, en suivant exactement la forme de la face à laquelle il est parallèle. La section reproduit donc cette face.",
      micros: ["section_pave_cube"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",
};

export const slidesSectionsSolides3e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Sections planes - 3e",
    section: {
      type: "objectif",
      phrase: "Couper, et regarder la tranche",
      sousPhrase:
        "La difficulté n'est pas de calculer, elle est de voir. Une section est une figure PLATE, obtenue d'un objet qui a trois dimensions.",
      encadre: {
        titre: "La question à se poser",
        texte:
          "Jamais « quelle est la section de ce solide », mais toujours « coupé COMMENT ». L'orientation du plan décide autant que le solide.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "C'est le geste de la coupe technique : un plan d'architecte montre une maison tranchée verticalement, une IRM produit des centaines de sections du corps. Et un saucisson coupé droit donne un disque, en biais un ovale.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Vers 200 avant notre ère, Apollonius montre qu'en inclinant le plan qui coupe un cône on obtient un cercle, une ellipse, une parabole ou une hyperbole. Dix-huit siècles plus tard, Kepler découvre que les planètes suivent des ellipses.",
      },
    },
  },
  {
    titre: "Les sections à connaitre",
    badge: "Le tableau",
    section: {
      type: "etapes",
      etapes: [
        "Pavé ou cube, parallèlement à une face : un rectangle — un carré pour le cube.",
        "Cylindre, parallèlement à la base : un disque de même rayon.",
        "Cylindre, selon un plan contenant l'axe : un rectangle, diamètre sur hauteur.",
        "Cône ou pyramide, parallèlement à la base : une réduction de la base.",
      ],
    },
  },
  {
    titre: "Le piège du calcul",
    badge: "À ne pas rater",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on écrit",
        contenu:
          "Dans un rectangle de 6 sur 8, la diagonale vaut 6 plus 8, soit 14.",
      },
      droite: {
        variante: "info",
        titre: "Ce qui est vrai",
        contenu:
          "La section est une figure plane : on y applique Pythagore. 6 au carré plus 8 au carré font 100, donc la diagonale vaut 10. Elle est toujours plus courte que la somme des côtés.",
      },
    },
  },
];
