// ─── Fiche de cours : additionner des fractions (5e) ───────────────────────────
// Fiche « en blocs » : toute la matière de la page vit ici, la page et les
// flashcards ne font que la rendre. Contenu repris de l'ancienne page écrite
// à la main, enrichi des blocs Définition et Propriétés (format canonique
// réclamé par les profs).

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Additionner les dénominateurs entre eux : on ne le fait jamais.",
  "Oublier de mettre au même dénominateur avant d'additionner.",
  "Oublier de simplifier le résultat à la fin.",
];

const aRetenir = [
  "Au même dénominateur : a/d + b/d = (a + b)/d.",
  "Dénominateurs différents : on les rend égaux d'abord.",
  "On n'additionne jamais les dénominateurs entre eux.",
];

const bars = [
  { label: "1/2", filled: 3 },
  { label: "1/3", filled: 2 },
  { label: "5/6", filled: 5 },
];

const schemaBarres = (
  <svg
    viewBox="0 0 320 170"
    className="h-auto w-full"
    role="img"
    aria-label="Barres de fractions montrant 1/2 plus 1/3 égale 5/6"
  >
    {bars.map((bar, row) => (
      <g key={bar.label}>
        <text
          x="52"
          y={43 + row * 50}
          fill="#0f172a"
          fontSize="16"
          fontWeight="800"
          textAnchor="end"
        >
          {bar.label}
        </text>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <rect
            key={i}
            x={72 + i * 36}
            y={20 + row * 50}
            width={36}
            height={30}
            fill={i < bar.filled ? "#fb7185" : "#ffffff"}
            stroke="#cbd5e1"
            strokeWidth={1.5}
          />
        ))}
      </g>
    ))}
  </svg>
);

export const ficheFractionsAddition5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "fraction-nombre",
  titre: "Additionner des fractions",
  accroche:
    "Pour additionner deux fractions, il faut d'abord les mettre au même dénominateur, puis additionner les numérateurs.",
  identite: [
    { label: "Prérequis", valeur: "Multiples, tables de multiplication" },
    { label: "Formule clé", valeur: "a/d + b/d = (a + b)/d" },
    { label: "Astuce", valeur: "Même dénominateur d'abord" },
  ],
  definition: {
    texte:
      "Additionner deux fractions, c'est ajouter des parts d'un même tout. On ne peut le faire directement que si les parts ont la même taille, c'est-à-dire si les deux fractions ont le même dénominateur : on additionne alors les numérateurs et on garde le dénominateur.",
  },
  proprietes: [
    {
      titre: "Même dénominateur",
      texte:
        "Si les deux fractions ont le même dénominateur, on additionne les numérateurs et on garde le dénominateur : a/d + b/d = (a + b)/d.",
    },
    {
      titre: "Dénominateurs différents",
      texte:
        "Si les dénominateurs sont différents, on réécrit d'abord les fractions avec un dénominateur commun (un multiple commun), puis on additionne les numérateurs.",
    },
    {
      titre: "Additionner un entier et une fraction",
      texte:
        "Un nombre entier s'écrit comme une fraction : n = n/1. On le met au même dénominateur que l'autre fraction, par exemple 2 + 1/3 = 6/3 + 1/3 = 7/3.",
    },
  ],
  reel: {
    texte:
      "Les fractions servent à partager (parts de pizza ou de gâteau), à cuisiner (1/2 litre, 1/4 de tablette), à mesurer des durées (un quart d'heure), et même en musique pour les rythmes (la noire, la croche...).",
  },
  historique: {
    texte:
      "Les fractions sont très anciennes : les Égyptiens, il y a près de 4000 ans, utilisaient surtout des fractions « unitaires » comme 1/2, 1/3 ou 1/4. La barre de fraction nous vient des mathématiciens arabes et indiens du Moyen Âge.",
  },
  formule: {
    contexte: "Au même dénominateur",
    expression: "a/d + b/d = (a + b)/d",
    legende: "Exemple : 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
    schema: schemaBarres,
  },
  methode: [
    {
      titre: "Même dénominateur",
      texte:
        "On cherche un dénominateur commun, souvent un multiple commun aux deux dénominateurs.",
    },
    {
      titre: "Transformer",
      texte:
        "On réécrit chaque fraction avec ce dénominateur commun (en multipliant en haut et en bas).",
    },
    {
      titre: "Additionner",
      texte:
        "On additionne les numérateurs, on garde le dénominateur, puis on simplifie si possible.",
    },
  ],
  usages: [
    {
      titre: "Additionner",
      detail:
        "Au même dénominateur, on additionne les numérateurs et on garde le dénominateur.",
    },
    {
      titre: "Soustraire",
      detail:
        "Même principe : au même dénominateur, on soustrait les numérateurs.",
    },
    {
      titre: "Simplifier",
      detail: "À la fin, on simplifie la fraction obtenue si c'est possible.",
    },
  ],
  exemples: [
    {
      titre: "Même dénominateur",
      donnees: "On calcule 1/4 + 2/4.",
      question: "Quel est le résultat ?",
      solution:
        "Les dénominateurs sont déjà égaux : on additionne les numérateurs. 1/4 + 2/4 = 3/4.",
    },
    {
      titre: "Dénominateurs différents",
      donnees: "On calcule 1/2 + 1/3.",
      question: "Quel est le résultat ?",
      solution:
        "On met au même dénominateur (6) : 1/2 = 3/6 et 1/3 = 2/6. Donc 1/2 + 1/3 = 3/6 + 2/6 = 5/6.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule 2/7 + 3/7.",
      correction: "Même dénominateur : 2/7 + 3/7 = 5/7.",
    },
    {
      question: "Calcule 1/2 + 1/4.",
      correction: "1/2 = 2/4, donc 1/2 + 1/4 = 2/4 + 1/4 = 3/4.",
    },
    {
      question: "Calcule 2/3 + 1/6.",
      correction: "2/3 = 4/6, donc 2/3 + 1/6 = 4/6 + 1/6 = 5/6.",
    },
    {
      question: "Pourquoi ne peut-on pas additionner 1/2 et 1/3 directement ?",
      correction:
        "Parce que les parts ne sont pas de la même taille. Il faut d'abord les mettre au même dénominateur (sur 6) : 3/6 + 2/6 = 5/6.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesFractionsAddition5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fractions - 5e",
    section: {
      type: "objectif",
      phrase: "Additionner deux fractions",
      sousPhrase:
        "On les met au même dénominateur, puis on additionne les numérateurs.",
      encadre: {
        titre: "L'idée",
        texte: "On ne peut additionner que des parts de même taille.",
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
          "Partager (parts de pizza), cuisiner (1/2 litre, 1/4 de tablette), mesurer le temps (un quart d'heure), les rythmes en musique.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Il y a 4000 ans, les Égyptiens utilisaient surtout des fractions « unitaires » (1/2, 1/3, 1/4). La barre de fraction vient des savants arabes et indiens.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheFractionsAddition5e.methode.map((m) => ({
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
      phrase: "a/d + b/d = (a + b)/d",
      sousPhrase:
        "Au même dénominateur, on additionne les numérateurs et on garde le dénominateur.",
      encadre: {
        titre: "Interdit",
        texte: "On n'additionne jamais les dénominateurs entre eux.",
      },
    },
  },
  {
    titre: "Selon le calcul",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheFractionsAddition5e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Même dénominateur",
    section: {
      type: "exemple",
      enonce: "On calcule 1/4 + 2/4.",
      question: "Quel est le résultat ?",
      correction: "Dénominateurs déjà égaux : 1/4 + 2/4 = 3/4.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Dénominateurs différents",
    section: {
      type: "exemple",
      enonce: "On calcule 1/2 + 1/3.",
      question: "Quel est le résultat ?",
      correction: "Au même dénominateur (6) : 3/6 + 2/6 = 5/6.",
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
      enonce: "Calcule 2/3 + 1/6.",
      indice: "Mets d'abord 2/3 au dénominateur 6.",
      correction: "2/3 = 4/6, donc 4/6 + 1/6 = 5/6.",
    },
  },
];
