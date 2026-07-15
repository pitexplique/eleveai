// ─── Fiche de cours : la multiplication (CM2) ───────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/multiplication.bank.ts (notionId multiplication).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE la multiplication
// posée (canvas calcul_pose du coach, virgule/rangs alignés) plutôt que raconter.
//
// Micro-compétences couvertes (les 6 de la banque) :
// - multiplication_table         → definition (groupes égaux), propriété « Les tables », exemple « La table » (6×7), entraînement 1
// - multiplication_mental        → propriété « Calculer de tête », méthode, exemple « De tête » (24×5), entraînement 2
// - multiplication_posee         → figure (247×4 posée), propriété « Poser », exemple « Poser » (247×4) + « Le zéro » (306×5), piège retenue, entraînement 3
// - multiplication_puissance_dix → propriété « × 10, 100, 1000 », exemple « Par 100 » (56×100), entraînement 4
// - multiplication_probleme      → usages, exemple « Un problème » (6 boîtes × 8)
// - multiplication_defi          → défi dessiné (marché : 4×12 + 3×8 = 72)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// La multiplication posée DESSINÉE par le moteur du coach : le même calcul en
// colonnes que dans les exercices (chiffres alignés sur leur rang).
const posee247 = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["247", "4"],
      result: "988",
      display: { showResult: true },
    }}
  />
);
const posee123 = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["123", "3"],
      result: "369",
      display: { showResult: true },
    }}
  />
);
const posee306 = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["306", "5"],
      result: "1530",
      display: { showResult: true },
    }}
  />
);

const pieges = [
  "Oublier une retenue : si on ne la reporte pas dans la colonne suivante, tout le résultat devient faux.",
  "Supprimer le zéro d'un nombre comme 306 : le zéro garde sa place (306 × 5 = 1530, pas 153).",
  "Se tromper d'opération : « 8 boîtes de 6 crayons » se multiplie (8 × 6), on n'additionne pas 8 + 6.",
];

const aRetenir = [
  "Multiplier, c'est additionner plusieurs fois le même nombre : 4 boîtes de 6, c'est 6 + 6 + 6 + 6 = 4 × 6.",
  "Pour poser : on aligne les chiffres sur leur rang et on n'oublie pas les retenues.",
  "Multiplier un entier par 10, 100 ou 1000 : on ajoute 1, 2 ou 3 zéros à droite.",
];

export const ficheMultiplicationCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "multiplication",
  titre: "La multiplication",
  accroche:
    "Multiplier, c'est compter vite des groupes égaux : 6 boîtes de 8 crayons, c'est 6 × 8 = 48. On apprend les tables, le calcul de tête et la multiplication posée.",
  identite: [
    { label: "Mots clés", valeur: "Facteur, produit, table, retenue, rang" },
    { label: "Le secret", valeur: "Des groupes égaux comptés d'un coup" },
    { label: "Outil", valeur: "Les tables + la multiplication posée en colonnes" },
  ],
  definition: {
    texte:
      "Multiplier, c'est additionner plusieurs fois le même nombre. 4 × 6 veut dire « 4 groupes de 6 », donc 6 + 6 + 6 + 6 = 24. Les deux nombres qu'on multiplie sont les facteurs, et le résultat s'appelle le produit.",
  },
  figure: {
    schema: posee247,
    legende: "247 × 4 posé en colonnes : on multiplie chiffre par chiffre, avec les retenues.",
  },
  proprietes: [
    {
      titre: "Les tables",
      texte: "Bien connaître ses tables (jusqu'à 9 × 9) permet de calculer vite et juste.",
    },
    {
      titre: "On peut changer l'ordre",
      texte: "8 × 5 donne le même résultat que 5 × 8 : on choisit la table la plus facile.",
    },
    {
      titre: "Poser en colonnes",
      texte: "On aligne les chiffres sur leur rang (unités, dizaines, centaines) et on reporte les retenues.",
    },
    {
      titre: "× 10, × 100, × 1000",
      texte: "Pour un nombre entier, on ajoute 1, 2 ou 3 zéros à droite : 56 × 100 = 5600.",
    },
  ],
  reel: {
    texte:
      "La multiplication sert tous les jours à La Réunion : 6 barquettes de 8 samoussas, 4 paniers de 12 mangues au marché de Saint-Pierre, le prix de 3 places de cinéma à 9 €. À chaque fois, des groupes égaux.",
  },
  historique: {
    texte:
      "Le signe « × » a été inventé par un mathématicien anglais, William Oughtred, en 1631. Avant, on écrivait les multiplications avec des mots ou d'autres symboles.",
  },
  methode: [
    { titre: "Je cherche des groupes égaux", texte: "« … de … », « chacun » → c'est une multiplication." },
    { titre: "Je calcule (tête ou posé)", texte: "Petits nombres : de tête. Grands nombres : je pose en colonnes." },
    { titre: "Je vérifie", texte: "J'estime l'ordre de grandeur : 247 × 4 est proche de 250 × 4 = 1000." },
  ],
  usages: [
    { titre: "Compter des groupes", detail: "6 boîtes de 8 crayons : 6 × 8 = 48 crayons." },
    { titre: "Calculer un prix", detail: "3 places à 9 € : 3 × 9 = 27 €." },
    { titre: "Changer d'unité", detail: "Combien de centimes dans 4 € ? 4 × 100 = 400 centimes." },
  ],
  exemples: [
    {
      titre: "La table",
      donnees: "On veut 6 × 7.",
      question: "Combien font 6 × 7 ?",
      solution:
        "On utilise la table de 6 (ou de 7) : 6 × 7 = 42. C'est un produit à connaître par cœur.",
    },
    {
      titre: "De tête (× 5)",
      donnees: "On veut 24 × 5.",
      question: "Comment calculer 24 × 5 rapidement ?",
      solution:
        "Multiplier par 5, c'est multiplier par 10 puis prendre la moitié : 24 × 10 = 240, la moitié de 240 est 120. Donc 24 × 5 = 120.",
    },
    {
      titre: "Poser la multiplication",
      donnees: "On calcule 247 × 4.",
      question: "Combien font 247 × 4 ?",
      schema: posee247,
      solution:
        "On multiplie 4 par chaque chiffre, des unités vers les centaines, en reportant les retenues : 247 × 4 = 988.",
    },
    {
      titre: "Le zéro garde sa place",
      donnees: "On calcule 306 × 5.",
      question: "Combien font 306 × 5 ?",
      schema: posee306,
      solution:
        "Le 0 des dizaines compte : 5 × 0 = 0, on écrit 0 à sa place. 306 × 5 = 1530 (surtout pas 153).",
    },
    {
      titre: "Par 100",
      donnees: "On calcule 56 × 100.",
      question: "Combien font 56 × 100 ?",
      solution:
        "Pour un nombre entier, multiplier par 100 revient à ajouter deux zéros à droite : 56 × 100 = 5600.",
    },
    {
      titre: "Un problème",
      donnees: "Il y a 6 boîtes avec 8 crayons dans chaque boîte.",
      question: "Combien de crayons au total ?",
      schema: posee123,
      solution:
        "Les boîtes ont toutes le même nombre de crayons : on multiplie. 6 × 8 = 48 crayons au total.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule 8 × 7, puis complète : 9 × ? = 63.",
      correction:
        "8 × 7 = 56 (table de 8). Pour 9 × ? = 63, on cherche dans la table de 9 : 9 × 7 = 63, donc le nombre manquant est 7.",
    },
    {
      question: "Calcule 24 × 5 de tête.",
      correction:
        "×5 = ×10 puis la moitié. 24 × 10 = 240, la moitié de 240 est 120. Donc 24 × 5 = 120.",
    },
    {
      question: "Pose et calcule 247 × 4.",
      correction:
        "On multiplie 4 par 7, 4, 2 en reportant les retenues : 247 × 4 = 988.",
    },
    {
      question: "Calcule 56 × 100.",
      correction:
        "Multiplier un entier par 100, c'est ajouter deux zéros à droite : 56 × 100 = 5600.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesMultiplicationCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Multiplication - CM2",
    section: {
      type: "objectif",
      phrase: "Multiplier : tables, calcul de tête et calcul posé",
      sousPhrase:
        "Multiplier, c'est compter vite des groupes égaux. 4 × 6, c'est 4 groupes de 6 : 6 + 6 + 6 + 6 = 24.",
      encadre: {
        titre: "L'idée",
        texte: "Les deux nombres sont les facteurs, le résultat est le produit.",
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
          "6 barquettes de 8 samoussas, 4 paniers de 12 mangues, 3 places de cinéma à 9 € : partout des groupes égaux.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le signe « × » a été inventé par l'Anglais William Oughtred en 1631.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheMultiplicationCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Calculer de tête",
    badge: "Des astuces",
    section: {
      type: "cartes",
      cartes: [
        { titre: "× 2", texte: "On double : 18 × 2 = 36." },
        { titre: "× 5", texte: "× 10 puis la moitié : 24 × 5 = 120." },
        { titre: "× 9", texte: "× 10 puis on enlève le nombre : 17 × 9 = 170 − 17 = 153." },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Poser",
    section: {
      type: "exemple",
      enonce: "On calcule 247 × 4.",
      question: "Combien font 247 × 4 ?",
      correction: "On multiplie 4 par chaque chiffre en reportant les retenues : 247 × 4 = 988.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Par 100",
    section: {
      type: "exemple",
      enonce: "On calcule 56 × 100.",
      question: "Combien font 56 × 100 ?",
      correction: "Pour un entier, ×100 revient à ajouter deux zéros à droite : 56 × 100 = 5600.",
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
      enonce: "Au marché, une famille achète 4 paniers de 12 mangues et 3 paniers de 8 letchis.",
      question: "Combien de fruits en tout ?",
      indice: "Calcule chaque groupe, puis additionne : (4 × 12) et (3 × 8).",
      correction: "4 × 12 = 48 mangues et 3 × 8 = 24 letchis. En tout : 48 + 24 = 72 fruits.",
    },
  },
];
