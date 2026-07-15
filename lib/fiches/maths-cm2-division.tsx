// ─── Fiche de cours : la division (CM2) ─────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/division.bank.ts (notionId division).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE la division posée
// (canvas calcul_pose du coach : dividende, diviseur, quotient, reste).
//
// Micro-compétences couvertes (les 6 de la banque) :
// - division_sens               → definition (partage / groupement), exemple « Partager » (12 ÷ 3), usages
// - division_lien_multiplication→ propriété « Le lien avec la table », exemple « Grâce à la table » (48 ÷ 6), méthode
// - division_posee              → figure (37 ÷ 5 posée), propriété « Dividende, diviseur… », exemple « Poser » (37 ÷ 5), piège reste
// - division_reste              → propriété « Le reste », exemple « Le reste » (37 ÷ 5 → 7 reste 2), piège
// - division_probleme           → exemple « Un problème » (54 ÷ 6), usages
// - division_defi               → défi dessiné (38 samoussas ÷ 5 → 7 reste 3)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// La division posée DESSINÉE par le moteur du coach (potence) : dividende,
// diviseur, quotient et reste, comme dans les exercices.
function divisionPosee(
  dividende: string,
  diviseur: string,
  quotient: string,
  reste: string,
  title: string
) {
  return (
    <CanvasRenderer
      figure={{
        kind: "calcul_pose",
        operation: "division",
        numbers: [dividende, diviseur],
        division: { dividende, diviseur, quotient, reste },
        title,
        display: { showResult: true },
      }}
    />
  );
}

const div37 = divisionPosee("37", "5", "7", "2", "37 ÷ 5");
const div48 = divisionPosee("48", "6", "8", "0", "48 ÷ 6");
const div54 = divisionPosee("54", "6", "9", "0", "54 ÷ 6");

const pieges = [
  "Croire qu'une division tombe toujours juste : souvent il reste quelque chose (37 ÷ 5 = 7, reste 2).",
  "Donner un reste plus grand ou égal au diviseur : le reste est TOUJOURS plus petit que le diviseur.",
  "Oublier de vérifier : quotient × diviseur + reste doit redonner le dividende (7 × 5 + 2 = 37).",
];

const aRetenir = [
  "Diviser, c'est partager en parts égales, ou faire des groupes égaux.",
  "Une division peut laisser un reste, toujours plus petit que le diviseur.",
  "Pour vérifier : quotient × diviseur + reste = dividende.",
];

export const ficheDivisionCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "division",
  titre: "La division",
  accroche:
    "Diviser, c'est partager en parts égales : 12 billes pour 3 enfants, ça fait 4 chacun. Parfois il reste quelque chose. On apprend à poser une division et à lire le reste.",
  identite: [
    { label: "Mots clés", valeur: "Dividende, diviseur, quotient, reste" },
    { label: "Le secret", valeur: "Partager en parts égales (ou faire des groupes)" },
    { label: "Outil", valeur: "Les tables de multiplication + la division posée" },
  ],
  definition: {
    texte:
      "Diviser, c'est partager une quantité en parts égales, ou chercher combien de fois un nombre entre dans un autre. Dans 37 ÷ 5, on cherche combien de fois 5 entre dans 37. Le nombre partagé (37) est le dividende, celui qui partage (5) est le diviseur, le résultat (7) est le quotient, et ce qui reste (2) est le reste.",
  },
  figure: {
    schema: div37,
    legende: "37 ÷ 5 : 5 entre 7 fois dans 37 (5 × 7 = 35), et il reste 2.",
  },
  proprietes: [
    {
      titre: "Le lien avec la table",
      texte: "Diviser, c'est l'inverse de multiplier : 48 ÷ 6 = 8 car 6 × 8 = 48.",
    },
    {
      titre: "Dividende, diviseur, quotient, reste",
      texte: "On partage le dividende par le diviseur : on obtient le quotient et parfois un reste.",
    },
    {
      titre: "Le reste",
      texte: "Le reste est ce qui n'a pas pu être partagé. Il est toujours plus petit que le diviseur.",
    },
    {
      titre: "La vérification",
      texte: "quotient × diviseur + reste = dividende. Ex. : 7 × 5 + 2 = 37.",
    },
  ],
  reel: {
    texte:
      "À La Réunion, on divise tous les jours : partager 12 letchis entre 4 amis (3 chacun), ranger 38 samoussas par barquettes de 5, savoir combien d'équipes de 6 on peut faire avec 54 élèves. Le reste, c'est ce qu'il faut encore gérer.",
  },
  historique: {
    texte:
      "Le signe « ÷ » (appelé obélus) a été utilisé pour la première fois par le mathématicien suisse Johann Rahn en 1659. Le petit point du haut et celui du bas rappellent une fraction : diviser et faire une fraction, c'est la même idée.",
  },
  methode: [
    { titre: "Je pense partage ou groupes", texte: "« partager en … », « par groupes de … » → c'est une division." },
    { titre: "J'utilise mes tables", texte: "Je cherche combien de fois le diviseur entre dans le dividende." },
    { titre: "Je regarde le reste", texte: "Ce qui reste doit être plus petit que le diviseur, sinon je peux encore diviser." },
  ],
  usages: [
    { titre: "Partager", detail: "12 letchis pour 4 amis : 12 ÷ 4 = 3 chacun." },
    { titre: "Faire des groupes", detail: "54 élèves par équipes de 6 : 54 ÷ 6 = 9 équipes." },
    { titre: "Lire le reste", detail: "38 samoussas par 5 : 7 barquettes pleines, il reste 3." },
  ],
  exemples: [
    {
      titre: "Partager (le sens)",
      donnees: "On partage 12 billes entre 3 enfants, à parts égales.",
      question: "Combien de billes chacun ?",
      solution:
        "On partage 12 en 3 parts égales : 12 ÷ 3 = 4. Chaque enfant reçoit 4 billes.",
    },
    {
      titre: "Grâce à la table",
      donnees: "On calcule 48 ÷ 6.",
      question: "Combien font 48 ÷ 6 ?",
      schema: div48,
      solution:
        "Diviser, c'est l'inverse de multiplier. On cherche dans la table de 6 : 6 × 8 = 48, donc 48 ÷ 6 = 8 (reste 0).",
    },
    {
      titre: "Poser avec un reste",
      donnees: "On calcule 37 ÷ 5.",
      question: "Quel est le quotient et le reste ?",
      schema: div37,
      solution:
        "On cherche le plus grand multiple de 5 sans dépasser 37 : 5 × 7 = 35. Le quotient est 7, et il reste 37 − 35 = 2.",
    },
    {
      titre: "Un problème",
      donnees: "On range 54 élèves en équipes de 6.",
      question: "Combien d'équipes complètes ?",
      schema: div54,
      solution:
        "On cherche combien de groupes de 6 dans 54 : 54 ÷ 6 = 9. On peut faire 9 équipes complètes (reste 0).",
    },
    {
      titre: "Le défi 974",
      donnees: "On range 38 samoussas en barquettes de 5.",
      question: "Combien de barquettes pleines, et combien en reste-t-il ?",
      solution:
        "38 ÷ 5 : 5 × 7 = 35, donc 7 barquettes pleines, et il reste 38 − 35 = 3 samoussas. On vérifie : 7 × 5 + 3 = 38.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule 48 ÷ 6 en t'aidant de la table de 6.",
      correction:
        "6 × 8 = 48, donc 48 ÷ 6 = 8 (reste 0). Diviser, c'est l'inverse de multiplier.",
    },
    {
      question: "Dans la division de 37 par 5, donne le quotient et le reste.",
      correction:
        "5 × 7 = 35 et 5 × 8 = 40 (trop grand). Le quotient est 7, le reste est 37 − 35 = 2.",
    },
    {
      question: "Le reste d'une division par 5 peut-il être égal à 6 ?",
      correction:
        "Non : le reste est toujours plus petit que le diviseur. Par 5, le reste va de 0 à 4.",
    },
    {
      question: "On range 38 samoussas par barquettes de 5. Combien de barquettes pleines, et le reste ?",
      correction:
        "38 ÷ 5 = 7, reste 3 : 7 barquettes pleines et 3 samoussas en trop. Vérif : 7 × 5 + 3 = 38.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesDivisionCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Division - CM2",
    section: {
      type: "objectif",
      phrase: "Partager en parts égales et lire le reste",
      sousPhrase:
        "Diviser, c'est partager (12 billes pour 3 = 4 chacun) ou faire des groupes égaux. Parfois il reste quelque chose.",
      encadre: {
        titre: "L'idée",
        texte: "Dividende ÷ diviseur = quotient, et parfois un reste.",
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
          "Partager 12 letchis entre 4 amis, ranger 38 samoussas par 5, faire des équipes de 6 avec 54 élèves.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le signe « ÷ » a été utilisé pour la première fois en 1659. Ses deux points rappellent une fraction.",
      },
    },
  },
  {
    titre: "Le vocabulaire",
    badge: "4 mots clés",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Dividende", texte: "Le nombre qu'on partage. Dans 37 ÷ 5, c'est 37." },
        { titre: "Diviseur", texte: "Le nombre qui partage. Dans 37 ÷ 5, c'est 5." },
        { titre: "Quotient & reste", texte: "Le résultat (7) et ce qui reste (2)." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheDivisionCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Grâce à la table",
    section: {
      type: "exemple",
      enonce: "On calcule 48 ÷ 6.",
      question: "Combien font 48 ÷ 6 ?",
      correction: "Diviser, c'est l'inverse de multiplier : 6 × 8 = 48, donc 48 ÷ 6 = 8.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Avec un reste",
    section: {
      type: "exemple",
      enonce: "On calcule 37 ÷ 5.",
      question: "Quel est le quotient et le reste ?",
      correction: "5 × 7 = 35, sans dépasser 37. Quotient 7, reste 37 − 35 = 2.",
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
      enonce: "On range 38 samoussas en barquettes de 5.",
      question: "Combien de barquettes pleines, et combien en reste-t-il ?",
      indice: "Cherche le plus grand multiple de 5 sans dépasser 38 : 5 × 7 = 35.",
      correction: "38 ÷ 5 = 7, reste 3 : 7 barquettes pleines et 3 samoussas. Vérif : 7 × 5 + 3 = 38.",
    },
  },
];
