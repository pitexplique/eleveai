// ─── Fiche de cours : le calcul posé (6e) ──────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/calcul-pose.bank.ts (notionId entier_calcul_pose).
//
// Micro-compétences couvertes :
// - entier_addition_posee        → usages (poser une addition), exemple 1, entraînement 1
// - entier_soustraction_posee    → usages (poser une soustraction), entraînement 2
// - entier_multiplication_posee  → usages (poser une multiplication), entraînement 3
// - entier_division_posee        → usages (poser une division), exemple 2, entraînement 4
// - entier_calcul_verifier       → propriété « vérifier », méthode réflexe 3, pièges
// - entier_calcul_pose_defi      → bloc réel (choisir la bonne opération), entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Oublier une retenue : tout le reste du calcul devient faux.",
  "Mal aligner les chiffres : on additionne des unités avec des dizaines.",
  "Dans une division, garder un reste plus grand que le diviseur.",
];

const aRetenir = [
  "On aligne toujours les chiffres de même rang : unités sous unités.",
  "On calcule colonne par colonne, en reportant les retenues.",
  "On vérifie : opération inverse, ou dividende = diviseur × quotient + reste.",
];

export const ficheCalculPose6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "entier-calcul-pose",
  titre: "Le calcul posé",
  accroche:
    "Poser un calcul, c'est l'écrire en colonnes pour ne rien oublier. Addition, soustraction, multiplication, division : avec un bon alignement et les retenues, on calcule de grands nombres sans calculatrice.",
  identite: [
    { label: "Prérequis", valeur: "Tables d'addition et de multiplication, rangs des chiffres" },
    { label: "Mots clés", valeur: "Colonne, rang, retenue, quotient, reste" },
    { label: "Outil", valeur: "Papier à carreaux et crayon (un chiffre par carreau)" },
  ],
  definition: {
    texte:
      "Poser une opération, c'est écrire les nombres l'un sous l'autre, en colonnes, en alignant les chiffres de même rang : les unités sous les unités, les dizaines sous les dizaines, les centaines sous les centaines. On calcule ensuite colonne par colonne, en commençant par les unités.",
  },
  proprietes: [
    {
      titre: "L'alignement des rangs",
      texte:
        "Chaque chiffre a une valeur selon sa position : unités, dizaines, centaines. On ne peut additionner ou soustraire que des chiffres de même rang. Un mauvais alignement fausse tout le calcul.",
    },
    {
      titre: "Les retenues",
      texte:
        "Quand une colonne dépasse 9, on écrit le chiffre des unités et on reporte une retenue dans la colonne suivante. En soustraction, si le chiffre du haut est trop petit, on emprunte une dizaine.",
    },
    {
      titre: "La division euclidienne",
      texte:
        "Diviser, c'est chercher combien de fois le diviseur entre dans le dividende. On obtient un quotient et un reste, avec toujours : dividende = diviseur × quotient + reste, et le reste plus petit que le diviseur.",
    },
    {
      titre: "La vérification",
      texte:
        "Un calcul se contrôle toujours : on estime un ordre de grandeur avant, puis on utilise l'opération inverse après. L'addition vérifie la soustraction, la multiplication vérifie la division.",
    },
  ],
  reel: {
    texte:
      "Le calcul posé sert dès qu'il n'y a pas de calculatrice : additionner des prix au marché, rendre la monnaie, partager des cartes entre amis, prévoir le nombre de stylos pour des sacs identiques. Et devant un problème, la première question est toujours la même : regrouper, enlever, répéter ou partager ? C'est elle qui choisit l'opération.",
  },
  historique: {
    texte:
      "Vers 820, à Bagdad, le savant Al-Khwarizmi écrit un livre qui explique comment calculer pas à pas avec les chiffres indo-arabes. Son nom a donné le mot « algorithme » : une suite d'étapes à suivre dans l'ordre. Les techniques en colonnes que tu utilises sont arrivées en Europe au Moyen Âge grâce à ses écrits.",
  },
  methode: [
    {
      titre: "Aligner",
      texte:
        "On écrit les nombres l'un sous l'autre en alignant les chiffres de même rang : unités sous unités, dizaines sous dizaines.",
    },
    {
      titre: "Calculer rang par rang",
      texte:
        "On commence par la colonne des unités, puis les dizaines, puis les centaines, sans oublier de reporter les retenues.",
    },
    {
      titre: "Vérifier",
      texte:
        "On compare avec un ordre de grandeur, ou on refait le calcul avec l'opération inverse. On ne valide jamais un résultat sans contrôle.",
    },
  ],
  usages: [
    {
      titre: "Poser une addition",
      detail:
        "On aligne les rangs, on additionne colonne par colonne. Si une colonne dépasse 9, on reporte une retenue dans la colonne suivante.",
    },
    {
      titre: "Poser une soustraction",
      detail:
        "On met le plus grand nombre en haut. Si le chiffre du haut est trop petit, on emprunte une dizaine. On vérifie avec une addition.",
    },
    {
      titre: "Poser une multiplication",
      detail:
        "On multiplie chaque chiffre du nombre du haut par le chiffre du bas, de droite à gauche, en reportant les retenues.",
    },
    {
      titre: "Poser une division",
      detail:
        "On cherche combien de fois le diviseur entre dans le dividende. Le reste doit rester plus petit que le diviseur.",
    },
  ],
  exemples: [
    {
      titre: "Une addition avec retenue",
      donnees: "On pose 475 + 286 en colonnes, unités sous unités.",
      question: "Calculer 475 + 286.",
      solution:
        "Unités : 5 + 6 = 11, j'écris 1 et je retiens 1. Dizaines : 7 + 8 + 1 = 16, j'écris 6 et je retiens 1. Centaines : 4 + 2 + 1 = 7. Résultat : 761. Vérification : c'est proche de 480 + 290 = 770, c'est cohérent.",
    },
    {
      titre: "Une division euclidienne",
      donnees: "On veut diviser 37 par 5.",
      question: "Trouver le quotient et le reste de 37 ÷ 5.",
      solution:
        "Je cherche le multiple de 5 le plus proche de 37 sans le dépasser : 5 × 7 = 35. Le quotient est 7 et le reste est 37 − 35 = 2. Le reste 2 est bien plus petit que 5. Vérification : 5 × 7 + 2 = 37.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Pose et calcule : 348 + 275.",
      correction:
        "Unités : 8 + 5 = 13, j'écris 3, retenue 1. Dizaines : 4 + 7 + 1 = 12, j'écris 2, retenue 1. Centaines : 3 + 2 + 1 = 6. Résultat : 623.",
    },
    {
      question: "Pose et calcule : 632 − 458.",
      correction:
        "Unités : 2 − 8 impossible, j'emprunte : 12 − 8 = 4. Dizaines : 3 − (5 + 1) impossible, j'emprunte : 13 − 6 = 7. Centaines : 6 − (4 + 1) = 1. Résultat : 174. Vérification : 174 + 458 = 632.",
    },
    {
      question: "Pose et calcule : 267 × 4.",
      correction:
        "7 × 4 = 28, j'écris 8, retenue 2. 6 × 4 = 24, plus 2 = 26, j'écris 6, retenue 2. 2 × 4 = 8, plus 2 = 10. Résultat : 1 068.",
    },
    {
      question:
        "On partage 58 billes entre 7 enfants. Combien de billes reçoit chaque enfant, et combien en reste-t-il ?",
      correction:
        "Partager, c'est diviser : je pose 58 ÷ 7. Le multiple de 7 le plus proche de 58 sans le dépasser est 7 × 8 = 56. Chaque enfant reçoit 8 billes et il reste 58 − 56 = 2 billes. Vérification : 7 × 8 + 2 = 58, et le reste 2 est plus petit que 7.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesCalculPose6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calcul posé - 6e",
    section: {
      type: "objectif",
      phrase: "Calculer de grands nombres sans calculatrice",
      sousPhrase:
        "Poser un calcul, c'est l'écrire en colonnes pour calculer rang par rang, sans rien oublier.",
      encadre: {
        titre: "L'idée",
        texte: "Un bon alignement + les retenues = un résultat juste.",
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
          "Additionner des prix, rendre la monnaie, partager des cartes, prévoir des quantités : dès qu'il n'y a pas de calculatrice.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Vers 820, à Bagdad, Al-Khwarizmi explique le calcul pas à pas. Son nom a donné le mot « algorithme ».",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheCalculPose6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Les 4 opérations",
    badge: "Poser en colonnes",
    section: {
      type: "cartes",
      cartes: ficheCalculPose6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Addition avec retenue",
    section: {
      type: "exemple",
      enonce: "On pose 475 + 286 en colonnes.",
      question: "Calculer 475 + 286.",
      correction:
        "5 + 6 = 11 : j'écris 1, retenue 1. 7 + 8 + 1 = 16 : j'écris 6, retenue 1. 4 + 2 + 1 = 7. Résultat : 761.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Division euclidienne",
    section: {
      type: "exemple",
      enonce: "On veut diviser 37 par 5.",
      question: "Trouver le quotient et le reste.",
      correction:
        "5 × 7 = 35, donc quotient 7 et reste 2. Vérification : 5 × 7 + 2 = 37, et 2 est plus petit que 5.",
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
      enonce: "On partage 58 billes entre 7 enfants.",
      question: "Combien de billes chacun, et combien en reste-t-il ?",
      indice: "Partager, c'est diviser : cherche le multiple de 7 le plus proche de 58.",
      correction:
        "58 ÷ 7 : 7 × 8 = 56, donc 8 billes chacun et il reste 2. Vérification : 7 × 8 + 2 = 58.",
    },
  },
];
