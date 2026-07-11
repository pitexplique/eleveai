// ─── Fiche de cours : le théorème de Thalès (3e) ───────────────────────────────
// Fiche « en blocs » : toute la matière de la page vit ici, la page et les
// flashcards ne font que la rendre. Contenu repris de l'ancienne page écrite
// à la main, enrichi des blocs Définition et Propriétés (format canonique
// réclamé par les profs).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Écrire les longueurs dans le désordre : il faut respecter l'ordre des sommets (A, puis B, puis C).",
  "Appliquer Thalès alors que les droites ne sont pas parallèles.",
  "Oublier que A est le sommet commun aux deux droites sécantes.",
];

const aRetenir = [
  "Thalès donne des rapports égaux quand deux parallèles coupent deux sécantes.",
  "On trouve la longueur manquante par produit en croix.",
  "La réciproque sert à prouver que deux droites sont parallèles.",
];

const schemaThales = (
  <svg
    viewBox="0 0 320 200"
    className="h-auto w-full"
    role="img"
    aria-label="Triangle ABC avec la droite (MN) parallèle à (BC)"
  >
    <path d="M160 28 L40 168" stroke="#94a3b8" strokeWidth="4" fill="none" />
    <path d="M160 28 L280 168" stroke="#94a3b8" strokeWidth="4" fill="none" />
    <path d="M40 168 L280 168" stroke="#6366f1" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M106 89 L214 89" stroke="#6366f1" strokeWidth="5" fill="none" strokeLinecap="round" />
    <path d="M157 84 l6 9" stroke="#6366f1" strokeWidth="3" fill="none" />
    <path d="M157 163 l6 9" stroke="#6366f1" strokeWidth="3" fill="none" />
    <text x="160" y="20" fill="#0f172a" fontSize="15" fontWeight="800" textAnchor="middle">A</text>
    <text x="30" y="182" fill="#0f172a" fontSize="15" fontWeight="800" textAnchor="middle">B</text>
    <text x="290" y="182" fill="#0f172a" fontSize="15" fontWeight="800" textAnchor="middle">C</text>
    <text x="92" y="86" fill="#4338ca" fontSize="15" fontWeight="800" textAnchor="end">M</text>
    <text x="226" y="86" fill="#4338ca" fontSize="15" fontWeight="800">N</text>
  </svg>
);

export const ficheThales3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "thales",
  titre: "Le théorème de Thalès",
  accroche:
    "Quand deux droites parallèles coupent deux droites sécantes, le théorème de Thalès donne des rapports de longueurs égaux. Il sert à calculer une longueur ou à prouver un parallélisme.",
  identite: [
    { label: "Prérequis", valeur: "Droites parallèles, produit en croix" },
    { label: "Formule clé", valeur: "AM / AB = AN / AC = MN / BC" },
    { label: "Outil", valeur: "Calculatrice, règle" },
  ],
  definition: {
    texte:
      "Soient deux droites sécantes en A, la première portant les points A, M, B et la seconde les points A, N, C. Si les droites (MN) et (BC) sont parallèles, alors les longueurs des triangles AMN et ABC sont proportionnelles : AM / AB = AN / AC = MN / BC.",
  },
  proprietes: [
    {
      titre: "Le théorème (sens direct)",
      texte:
        "Si (MN) est parallèle à (BC), alors AM / AB = AN / AC = MN / BC. Il sert à calculer une longueur manquante par produit en croix.",
    },
    {
      titre: "La réciproque",
      texte:
        "Si AM / AB = AN / AC et si les points A, M, B et A, N, C sont alignés dans le même ordre, alors (MN) est parallèle à (BC). Elle sert à prouver un parallélisme.",
    },
    {
      titre: "La contraposée",
      texte:
        "Si AM / AB et AN / AC ne sont pas égaux, alors (MN) et (BC) ne sont pas parallèles. Elle sert à prouver que deux droites ne sont pas parallèles.",
    },
  ],
  reel: {
    texte:
      "Thalès permet de mesurer des hauteurs ou des distances impossibles à atteindre : la hauteur d'un arbre ou d'un immeuble grâce à son ombre, la largeur d'une rivière... Il est aussi à la base des agrandissements et réductions (plans, maquettes, échelles).",
  },
  historique: {
    texte:
      "Thalès de Milet (vers 600 avant J.-C.) était un savant grec, considéré comme l'un des « sept sages » de la Grèce. La légende raconte qu'il a mesuré la hauteur de la grande pyramide d'Égypte en comparant son ombre à celle d'un bâton.",
  },
  formule: {
    contexte: "Si (MN) est parallèle à (BC)",
    expression: "AM / AB = AN / AC = MN / BC",
    legende: "A est le sommet commun aux deux droites.",
    schema: schemaThales,
  },
  methode: [
    {
      titre: "Repérer",
      texte:
        "On vérifie la configuration : deux droites sécantes en A et deux droites parallèles.",
    },
    {
      titre: "Écrire",
      texte:
        "On écrit l'égalité des rapports en respectant l'ordre des sommets : AM / AB = AN / AC = MN / BC.",
    },
    {
      titre: "Calculer",
      texte:
        "On garde les deux rapports utiles, puis on calcule la longueur manquante par produit en croix.",
    },
  ],
  usages: [
    {
      titre: "Calculer une longueur",
      detail:
        "On écrit les rapports égaux, puis on utilise le produit en croix pour trouver la longueur manquante.",
    },
    {
      titre: "Vérifier le parallélisme",
      detail:
        "Réciproque : si les rapports sont égaux (et les points dans le même ordre), les droites sont parallèles.",
    },
    {
      titre: "Agrandir ou réduire",
      detail:
        "Thalès traduit un agrandissement : toutes les longueurs sont multipliées par le même rapport.",
    },
  ],
  exemples: [
    {
      titre: "Calculer une longueur",
      donnees: "(MN) est parallèle à (BC). AM = 2 cm, AB = 8 cm et AC = 12 cm.",
      question: "Calculer AN.",
      solution:
        "D'après Thalès : AM / AB = AN / AC, donc AN = AC × AM / AB = 12 × 2 / 8 = 3 cm.",
    },
    {
      titre: "Calculer le grand côté",
      donnees: "(MN) est parallèle à (BC). AM = 3 cm, AB = 9 cm et MN = 4 cm.",
      question: "Calculer BC.",
      solution:
        "AM / AB = MN / BC, donc BC = MN × AB / AM = 4 × 9 / 3 = 12 cm.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "(MN) est parallèle à (BC). AM = 2 cm, AB = 8 cm, AC = 12 cm. Calcule AN.",
      correction: "AM / AB = AN / AC, donc AN = 12 × 2 / 8 = 3 cm.",
    },
    {
      question:
        "(MN) est parallèle à (BC). AM = 4 cm, AB = 10 cm, MN = 6 cm. Calcule BC.",
      correction: "AM / AB = MN / BC, donc BC = 6 × 10 / 4 = 15 cm.",
    },
    {
      question:
        "Dans un triangle, M est sur [AB] et N sur [AC] avec AM / AB = 2/5 et AN / AC = 2/5. Que peut-on en déduire ?",
      correction:
        "Les deux rapports sont égaux et les points sont dans le même ordre : d'après la réciproque de Thalès, (MN) est parallèle à (BC).",
    },
    {
      question:
        "Pourquoi faut-il que les droites soient parallèles pour appliquer le théorème de Thalès ?",
      correction:
        "Le théorème ne donne des rapports égaux que si les droites sont parallèles. Sans ce parallélisme, l'égalité des rapports est fausse.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",
};

export const slidesThales3e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Thalès - 3e",
    section: {
      type: "objectif",
      phrase: "Calculer une longueur avec le théorème de Thalès",
      sousPhrase:
        "Deux parallèles coupant deux sécantes donnent des rapports de longueurs égaux.",
      encadre: {
        titre: "L'idée",
        texte: "Des triangles emboîtés ont des côtés proportionnels.",
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
          "Mesurer la hauteur d'un arbre par son ombre, la largeur d'une rivière, les agrandissements et réductions (plans, maquettes, échelles).",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Thalès de Milet (vers 600 av. J.-C.) aurait mesuré la hauteur de la grande pyramide en comparant son ombre à celle d'un bâton.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheThales3e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "La formule",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "AM / AB = AN / AC = MN / BC",
      sousPhrase: "A est le sommet commun aux deux droites sécantes.",
      encadre: {
        titre: "Condition",
        texte: "(MN) doit être parallèle à (BC).",
      },
    },
  },
  {
    titre: "Selon l'inconnue",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheThales3e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Calculer une longueur",
    section: {
      type: "exemple",
      enonce: "(MN) // (BC). AM = 2 cm, AB = 8 cm, AC = 12 cm.",
      question: "Calculer AN.",
      correction: "AM / AB = AN / AC, donc AN = 12 x 2 / 8 = 3 cm.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Calculer le grand côté",
    section: {
      type: "exemple",
      enonce: "(MN) // (BC). AM = 3 cm, AB = 9 cm, MN = 4 cm.",
      question: "Calculer BC.",
      correction: "AM / AB = MN / BC, donc BC = 4 x 9 / 3 = 12 cm.",
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
      enonce: "(MN) // (BC). AM = 4 cm, AB = 10 cm, MN = 6 cm.",
      question: "Calcule BC.",
      indice: "AM / AB = MN / BC, puis produit en croix.",
      correction: "BC = 6 x 10 / 4 = 15 cm.",
    },
  },
];
