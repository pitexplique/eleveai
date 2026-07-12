// ─── Fiche de cours : les fractions (6e) ────────────────────────────────────────
// Fiche « découverte » : lire, représenter, comparer une fraction — PAS
// d'addition de fractions (c'est la fiche 5e fractions-addition qui s'en
// charge). Contenu calé sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/fractions.bank.ts.
//
// Couverture des micro-compétences de la banque :
// - fraction_lire_ecrire  → definition, identite, methode (Repérer), usages
//   (carte 1), exemple 1, entrainement 1, aRetenir 1
// - fraction_representer → proprietes (parts égales), methode (Dessiner),
//   usages (carte 2), pieges 3, entrainement 2
// - fraction_quantite    → formule, methode (Calculer), usages (carte 3),
//   exemple 2, entrainement 3
// - fraction_decimal     → proprietes (écriture décimale), entrainement 4
// - fraction_comparer    → proprietes (comparer), pieges 2, entrainement 4
// - fraction_defi        → proprietes (fractions égales), aRetenir 3,
//   entrainement 2 (équivalence 2/4 = 1/2)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Confondre le numérateur (en haut) et le dénominateur (en bas) : 3/4 et 4/3, ce n'est pas pareil.",
  "Croire que 1/5 est plus grand que 1/3 parce que 5 est plus grand que 3. C'est le contraire : plus on partage, plus les parts sont petites.",
  "Écrire une fraction alors que les parts ne sont pas égales. Sans parts égales, pas de fraction.",
];

const aRetenir = [
  "Le numérateur (en haut) compte les parts prises, le dénominateur (en bas) compte les parts du partage.",
  "Une fraction n'a de sens que si le tout est partagé en parts égales.",
  "Deux fractions différentes peuvent représenter la même quantité : 2/4 = 1/2.",
];

const schemaBarre = (
  <svg
    viewBox="0 0 320 150"
    className="h-auto w-full"
    role="img"
    aria-label="Barre partagée en 4 parts égales, 3 parts coloriées : la fraction 3/4"
  >
    {[0, 1, 2, 3].map((i) => (
      <rect
        key={i}
        x={20 + i * 70}
        y={40}
        width={70}
        height={50}
        fill={i < 3 ? "rgba(14,165,233,0.35)" : "rgba(148,163,184,0.12)"}
        stroke="#0ea5e9"
        strokeWidth="4"
      />
    ))}
    <text x="160" y="26" fill="#0f172a" fontSize="16" fontWeight="800" textAnchor="middle">
      3 parts prises sur 4
    </text>
    <text x="160" y="125" fill="#334155" fontSize="18" fontWeight="800" textAnchor="middle">
      3/4 de la barre
    </text>
  </svg>
);

export const ficheFractions6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "fractions",
  titre: "Les fractions",
  accroche:
    "Une fraction sert à dire « une partie d'un tout » : 3/4 d'une pizza, la moitié d'un gâteau. En 6e, on apprend à lire une fraction, à la représenter par un dessin, à la comparer et à calculer la fraction d'une quantité.",
  identite: [
    { label: "Prérequis", valeur: "La division, le partage en parts égales" },
    { label: "Mots clés", valeur: "Numérateur (en haut), dénominateur (en bas)" },
    { label: "Outils", valeur: "Dessins : barres, disques, grilles" },
  ],
  definition: {
    texte:
      "Une fraction représente une ou plusieurs parts d'un tout partagé en parts égales. Elle s'écrit avec deux nombres : le numérateur, en haut, indique le nombre de parts prises ; le dénominateur, en bas, indique le nombre total de parts égales. Exemple : 3/5, c'est 3 parts prises sur 5 parts égales.",
  },
  proprietes: [
    {
      titre: "Des parts égales, toujours",
      texte:
        "Une fraction n'a de sens que si le tout est partagé en parts égales. Si les parts n'ont pas la même taille, on ne peut pas écrire de fraction.",
    },
    {
      titre: "Comparer deux fractions",
      texte:
        "Même dénominateur : la plus grande fraction est celle qui a le plus grand numérateur (3/5 > 1/5). Même numérateur : plus le dénominateur est grand, plus la fraction est petite (1/3 > 1/5).",
    },
    {
      titre: "Des fractions égales",
      texte:
        "Deux fractions différentes peuvent représenter la même quantité : 2/4 et 1/2, c'est la même part du tout. On dit qu'elles sont égales (ou équivalentes).",
    },
    {
      titre: "Fraction et écriture décimale",
      texte:
        "Certaines fractions simples ont une écriture décimale à connaître : 1/2 = 0,5 ; 1/4 = 0,25 ; 3/4 = 0,75 ; 1/5 = 0,2. C'est très pratique pour comparer.",
    },
  ],
  reel: {
    texte:
      "Les fractions sont partout dans la vie de tous les jours. On partage une pizza en 8 parts et on en mange 3, donc 3/8. Une recette demande 1/2 litre de lait ou 3/4 d'un paquet de farine. Et quand on dit « trois quarts d'heure », on parle de 3/4 d'une heure, soit 45 minutes.",
  },
  historique: {
    texte:
      "Les fractions sont très anciennes : vers 1550 avant J.-C., les Égyptiens les utilisaient déjà sur le papyrus de Rhind pour partager du pain ou des récoltes, presque toujours avec des fractions à numérateur 1, comme 1/2 ou 1/3. Le mot « fraction » vient du latin fractio, qui veut dire « casser en morceaux », et l'écriture avec la barre s'est répandue en Europe au Moyen Âge.",
  },
  formule: {
    contexte: "Prendre une fraction d'une quantité",
    expression: "3/4 de 12 = (12 ÷ 4) × 3 = 9",
    legende: "On divise par le dénominateur, puis on multiplie par le numérateur.",
    schema: schemaBarre,
  },
  methode: [
    {
      titre: "Repérer",
      texte:
        "On lit les deux nombres : le numérateur en haut donne les parts prises, le dénominateur en bas donne le nombre total de parts égales.",
    },
    {
      titre: "Dessiner",
      texte:
        "On représente la fraction : une barre, un disque ou une grille partagés en autant de parts égales que le dénominateur, et on colorie autant de parts que le numérateur.",
    },
    {
      titre: "Calculer",
      texte:
        "Pour prendre une fraction d'une quantité : on divise la quantité par le dénominateur (une part), puis on multiplie par le numérateur.",
    },
  ],
  usages: [
    {
      titre: "Lire et écrire une fraction",
      detail:
        "On traduit une situation de partage : 3 parts prises sur 5 parts égales s'écrit 3/5. Et dans l'autre sens, 2/8 se lit « 2 parts sur 8 ».",
    },
    {
      titre: "Représenter une fraction",
      detail:
        "On dessine : pour 4/6, la figure doit avoir 6 parts égales (le dénominateur) et on en colorie 4 (le numérateur).",
    },
    {
      titre: "Comprendre la fraction comme une quantité",
      detail:
        "Une fraction, c'est aussi un nombre : la moitié de 10 c'est 5, le quart de 20 c'est 5, les 3/4 de 12 c'est 9.",
    },
  ],
  exemples: [
    {
      titre: "Lire et écrire une fraction",
      donnees: "Un gâteau est partagé en 6 parts égales. On en prend 5.",
      question: "Quelle fraction du gâteau a-t-on prise ?",
      solution:
        "Le gâteau est partagé en 6 parts égales : le dénominateur est 6. On prend 5 parts : le numérateur est 5. On a donc pris 5/6 du gâteau.",
    },
    {
      titre: "Calculer une fraction d'une quantité",
      donnees: "Une boîte contient 15 billes. On en donne les 2/3.",
      question: "Combien de billes donne-t-on ?",
      solution:
        "On divise d'abord par le dénominateur : 15 ÷ 3 = 5, donc une part vaut 5 billes. Puis on multiplie par le numérateur : 2 × 5 = 10. On donne 10 billes.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Une pizza est partagée en 8 parts égales. Tu en manges 3. Quelle fraction de la pizza as-tu mangée ?",
      correction:
        "Le tout est partagé en 8 parts égales : le dénominateur est 8. Tu manges 3 parts : le numérateur est 3. Tu as donc mangé 3/8 de la pizza.",
    },
    {
      question:
        "Une figure est partagée en 4 parts égales. Combien de parts faut-il colorier pour représenter 2/4 ? Quelle autre fraction représente la même quantité ?",
      correction:
        "Le numérateur de 2/4 est 2 : il faut colorier 2 parts sur les 4. Or 2 parts sur 4, c'est la moitié de la figure : 2/4 = 1/2. Les deux fractions représentent la même quantité.",
    },
    {
      question: "Les 3/4 de 12, c'est combien ?",
      correction:
        "On divise par le dénominateur : 12 ÷ 4 = 3, donc un quart de 12 vaut 3. On multiplie par le numérateur : 3 × 3 = 9. Les 3/4 de 12, c'est 9.",
    },
    {
      question: "Compare 2/3 et 3/4 : laquelle est la plus grande ?",
      correction:
        "On passe par l'écriture décimale : 3/4 = 0,75 et 2/3 vaut environ 0,67. Comme 0,75 est plus grand que 0,67, la plus grande fraction est 3/4.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesFractions6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fractions - 6e",
    section: {
      type: "objectif",
      phrase: "Dire « une partie d'un tout » avec un nombre",
      sousPhrase:
        "Une fraction représente des parts prises dans un tout partagé en parts égales.",
      encadre: {
        titre: "L'idée",
        texte: "3/4, c'est 3 parts prises sur 4 parts égales.",
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
          "Partager une pizza en 8 et en manger 3 (3/8), mesurer 1/2 litre de lait pour une recette, compter trois quarts d'heure (45 minutes).",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Vers 1550 avant J.-C., les Égyptiens utilisaient déjà des fractions comme 1/2 ou 1/3 pour partager du pain. Le mot « fraction » vient du latin fractio : « casser en morceaux ».",
      },
    },
  },
  {
    titre: "Les deux nombres",
    badge: "Vocabulaire",
    section: {
      type: "objectif",
      phrase: "3/5 = 3 parts prises sur 5 parts égales",
      sousPhrase:
        "Le numérateur (en haut) compte les parts prises. Le dénominateur (en bas) compte les parts du partage.",
      encadre: {
        titre: "Attention",
        texte: "Une fraction n'a de sens que si les parts sont égales.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheFractions6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheFractions6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Lire une fraction",
    section: {
      type: "exemple",
      enonce: "Un gâteau est partagé en 6 parts égales. On en prend 5.",
      question: "Quelle fraction du gâteau a-t-on prise ?",
      correction: "6 parts égales au total, 5 parts prises : on a pris 5/6 du gâteau.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Fraction d'une quantité",
    section: {
      type: "exemple",
      enonce: "Une boîte contient 15 billes. On en donne les 2/3.",
      question: "Combien de billes donne-t-on ?",
      correction: "Une part : 15 ÷ 3 = 5. Puis 2 × 5 = 10. On donne 10 billes.",
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
      enonce: "Une boîte contient 12 biscuits. Léa en mange 1/3.",
      question: "Combien de biscuits mange-t-elle ?",
      indice: "Divise 12 par le dénominateur.",
      correction: "Une part : 12 ÷ 3 = 4. Léa mange 4 biscuits.",
    },
  },
];
