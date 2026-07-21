// ─── Fiche de cours : droites, segments et demi-droites (CM2) ───────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/droites.bank.ts (notionId droite).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec le canvas
// droites du coach (droite/segment/demi-droite, // et angle droit) — comme dans
// les exercices.
//
// Micro-compétences couvertes (les 5 de la banque) :
// - droite_reconnaitre     → definition, figure (droite (d) + A, B), exemple segment
// - droite_parallele       → propriété « parallèles », exemple 2 droites //
// - droite_perpendiculaire → propriété « perpendiculaires », exemple angle droit + équerre
// - droite_tracer          → propriété « tracer à la règle »
// - droite_defi            → défi dessiné 974 (repérer // et ⊥ sur une figure)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type Ligne = {
  id: string;
  type: "droite" | "segment" | "demi_droite";
  from: { x: number; y: number };
  to: { x: number; y: number };
  label?: string;
  color?: string;
  dashed?: boolean;
};
type Pt = { x: number; y: number; label?: string; color?: string; highlight?: boolean };

function droites(opts: {
  lines: Ligne[];
  points?: Pt[];
  intersections?: Pt[];
  markers?: {
    parallels?: { lineA: string; lineB: string; color?: string; markCount?: 1 | 2 }[];
    rightAngles?: { x: number; y: number; lineA: string; lineB: string; size?: number; color?: string }[];
  };
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "droites",
        size: { width: 340, height: 240 },
        grid: { show: true, rows: 6, cols: 8 },
        lines: opts.lines,
        points: opts.points ?? [],
        intersections: opts.intersections ?? [],
        markers: opts.markers,
        display: {
          showGrid: true,
          showLabels: true,
          showPoints: true,
          showIntersections: true,
          showRightAngleMarkers: true,
          showParallelMarkers: true,
        },
      }}
    />
  );
}

const BLEU = "#2563eb";
const VERT = "#16a34a";
const ROUGE = "#ef4444";
const VIOLET = "#8b5cf6";

const pieges = [
  "Confondre droite et segment : une droite se prolonge sans fin (flèches aux deux bouts), un segment s'arrête à deux extrémités.",
  "Croire que deux droites qui ne se coupent pas sur le dessin sont forcément parallèles : il faut qu'elles gardent le même écart partout.",
  "Dire « perpendiculaires » sans vérifier l'angle droit : on le contrôle avec l'équerre (le petit carré rouge).",
];

const aRetenir = [
  "Une droite est sans fin ; un segment a deux extrémités ; une demi-droite a un seul bout.",
  "Deux droites parallèles gardent le même écart et ne se coupent jamais.",
  "Deux droites perpendiculaires se coupent en formant un angle droit (l'équerre).",
];

export const ficheDroiteCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "droite",
  titre: "Droites, segments et demi-droites",
  accroche:
    "Une droite est une ligne parfaitement droite qui ne s'arrête jamais. Si on la coupe à deux endroits, on obtient un segment ; à un seul, une demi-droite. Deux droites peuvent être parallèles (jamais se couper) ou perpendiculaires (angle droit).",
  identite: [
    { label: "Mots clés", valeur: "Droite, segment, demi-droite, parallèle, perpendiculaire, sécantes" },
    { label: "Le secret", valeur: "Droite = sans fin ; segment = deux extrémités" },
    { label: "Outil", valeur: "La règle (pour tracer) et l'équerre (pour l'angle droit)" },
  ],
  definition: {
    texte:
      "Une droite est une ligne droite qui se prolonge sans fin des deux côtés (flèches). Un segment est la partie de droite limitée par deux extrémités, notée [AB]. Une demi-droite part d'un point et continue sans fin d'un seul côté.",
  },
  figure: {
    schema: droites({
      lines: [
        { id: "d", type: "droite", from: { x: 70, y: 170 }, to: { x: 270, y: 70 }, label: "(d)", color: BLEU },
      ],
      points: [
        { x: 120, y: 145, label: "A", color: ROUGE },
        { x: 220, y: 95, label: "B", color: ROUGE },
      ],
    }),
    legende: "La droite (d) passe par A et B ; elle continue sans fin dans les deux sens (flèches).",
  },
  proprietes: [
    {
      titre: "Droite, segment, demi-droite",
      texte: "Droite : sans fin (2 flèches). Segment [AB] : deux extrémités. Demi-droite : un seul bout.",
    },
    {
      titre: "Droites parallèles",
      texte: "Elles gardent le même écart partout et ne se coupent jamais. On les note (d1) // (d2).",
    },
    {
      titre: "Droites perpendiculaires",
      texte: "Elles se coupent en formant un angle droit. On le vérifie avec l'équerre (le petit carré).",
    },
    {
      titre: "Droites sécantes",
      texte: "Deux droites qui se coupent en un point sont sécantes (perpendiculaires si l'angle est droit).",
    },
  ],
  reel: {
    texte:
      "À La Réunion, on voit des droites partout : les rails du train d'autrefois, les lignes blanches d'un terrain de foot à Saint-Pierre, les bords d'une règle, les carreaux du cahier (parallèles et perpendiculaires !), ou une route toute droite dans les champs de canne.",
  },
  historique: {
    texte:
      "Il y a plus de 2000 ans, à Alexandrie, un savant nommé Euclide a écrit le premier grand livre de géométrie. Il y explique ce qu'est une droite, un segment, un angle droit… On étudie encore ses idées aujourd'hui : c'est le « papa » de la géométrie.",
  },
  methode: [
    { titre: "Je repère les bouts", texte: "Des flèches (droite), deux points (segment), un seul (demi-droite) ?" },
    { titre: "Je trace à la règle", texte: "Je pose la règle et je relie proprement les deux points." },
    { titre: "Je vérifie l'angle", texte: "Pour un angle droit, je pose l'équerre au point de croisement." },
  ],
  usages: [
    { titre: "Reconnaître", detail: "Distinguer droite, segment et demi-droite." },
    { titre: "Vérifier", detail: "Dire si deux droites sont parallèles ou perpendiculaires." },
    { titre: "Tracer", detail: "Utiliser la règle et l'équerre pour construire une figure." },
  ],
  exemples: [
    {
      titre: "Droite ou segment ?",
      donnees: "On observe la figure [AB].",
      question: "Est-ce une droite ou un segment ?",
      schema: droites({
        lines: [
          { id: "AB", type: "segment", from: { x: 80, y: 150 }, to: { x: 260, y: 90 }, label: "[AB]", color: VERT },
        ],
        points: [
          { x: 80, y: 150, label: "A", color: ROUGE, highlight: true },
          { x: 260, y: 90, label: "B", color: ROUGE, highlight: true },
        ],
      }),
      solution: "La ligne s'arrête à deux extrémités A et B (pas de flèches) : c'est un segment, noté [AB].",
    },
    {
      titre: "Sont-elles parallèles ?",
      donnees: "On observe deux droites (d1) et (d2).",
      question: "Sont-elles parallèles ?",
      schema: droites({
        lines: [
          { id: "d1", type: "droite", from: { x: 55, y: 90 }, to: { x: 285, y: 90 }, label: "(d1)", color: BLEU },
          { id: "d2", type: "droite", from: { x: 55, y: 155 }, to: { x: 285, y: 155 }, label: "(d2)", color: BLEU },
        ],
        markers: { parallels: [{ lineA: "d1", lineB: "d2", color: VIOLET, markCount: 1 }] },
      }),
      solution: "Elles gardent le même écart partout et ne se couperont jamais : oui, elles sont parallèles.",
    },
    {
      titre: "Sont-elles perpendiculaires ?",
      donnees: "On observe deux droites qui se croisent.",
      question: "Forment-elles un angle droit ?",
      schema: droites({
        lines: [
          { id: "h", type: "droite", from: { x: 55, y: 120 }, to: { x: 285, y: 120 }, label: "(d1)", color: BLEU },
          { id: "v", type: "droite", from: { x: 170, y: 40 }, to: { x: 170, y: 200 }, label: "(d2)", color: BLEU },
        ],
        intersections: [{ x: 170, y: 120, color: "#f97316" }],
        markers: { rightAngles: [{ x: 170, y: 120, lineA: "h", lineB: "v", size: 20, color: ROUGE }] },
      }),
      solution: "Le petit carré rouge montre l'angle droit : oui, les deux droites sont perpendiculaires.",
    },
    {
      titre: "Le défi 974",
      donnees: "Sur le quadrillage du cahier, on trace deux droites.",
      question: "La droite horizontale et la verticale : parallèles ou perpendiculaires ?",
      schema: droites({
        lines: [
          { id: "hh", type: "droite", from: { x: 40, y: 150 }, to: { x: 300, y: 150 }, label: "(h)", color: VERT },
          { id: "vv", type: "droite", from: { x: 150, y: 40 }, to: { x: 150, y: 210 }, label: "(v)", color: BLEU },
        ],
        intersections: [{ x: 150, y: 150, color: "#f97316" }],
        markers: { rightAngles: [{ x: 150, y: 150, lineA: "hh", lineB: "vv", size: 20, color: ROUGE }] },
      }),
      solution:
        "Elles se coupent en formant un angle droit (le carré rouge) : elles sont perpendiculaires. C'est le cas des lignes du cahier !",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Quelle est la différence entre une droite et un segment ?",
      correction: "La droite se prolonge sans fin (flèches aux deux bouts) ; le segment s'arrête à deux extrémités.",
    },
    {
      question: "Deux droites se coupent en formant un angle droit. Comment les appelle-t-on ?",
      correction: "Perpendiculaires. On vérifie l'angle droit avec l'équerre.",
    },
    {
      question: "Deux droites gardent le même écart et ne se coupent jamais. Comment les appelle-t-on ?",
      correction: "Parallèles. On note (d1) // (d2).",
    },
    {
      question: "Avec quel instrument vérifie-t-on qu'un angle est droit ?",
      correction: "L'équerre : on la pose au point de croisement des deux droites.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesDroiteCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Droites - CM2",
    section: {
      type: "objectif",
      phrase: "Reconnaître droite, segment, demi-droite ; parallèles et perpendiculaires",
      sousPhrase:
        "Une droite est sans fin, un segment a deux bouts. Deux droites peuvent être parallèles ou perpendiculaires.",
      encadre: {
        titre: "L'idée",
        texte: "Je regarde les bouts (flèches ou extrémités) et l'angle de croisement (l'équerre).",
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
          "Les lignes d'un terrain de foot, les bords d'une règle, les carreaux du cahier, une route toute droite dans les champs de canne.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Il y a plus de 2000 ans, Euclide a écrit le premier grand livre de géométrie. C'est le « papa » des droites et des angles.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheDroiteCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Parallèles",
    section: {
      type: "exemple",
      enonce: "Deux droites (d1) et (d2) gardent le même écart partout.",
      question: "Sont-elles parallèles ?",
      correction: "Oui : elles ne se couperont jamais. On note (d1) // (d2).",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Perpendiculaires",
    section: {
      type: "exemple",
      enonce: "Deux droites se croisent en formant un angle droit.",
      question: "Comment les appelle-t-on ?",
      correction: "Perpendiculaires : le petit carré (l'équerre) marque l'angle droit.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "Sur le quadrillage du cahier, une droite horizontale croise une droite verticale.",
      question: "Parallèles ou perpendiculaires ?",
      indice: "Regarde l'angle au point de croisement.",
      correction: "Elles forment un angle droit : elles sont perpendiculaires (comme les carreaux du cahier).",
    },
  },
];
