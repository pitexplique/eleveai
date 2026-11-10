// lib/tutor-v4/questionBank/ce1/maths/reperage.bank.ts
//
// Le repérage dans l'espace du CE1, écrit à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) :
//   — connaître et utiliser le vocabulaire des positions relatives : à gauche,
//     à droite, sur, sous, entre, devant, derrière, au-dessus, en dessous,
//     près, loin ;
//   — situer des personnes ou des objets les uns par rapport aux autres, ou
//     par rapport à d'autres repères ;
//   — construire et utiliser des représentations d'un espace familier — le
//     plan de l'école, du quartier — pour localiser et communiquer ;
//   — construire des assemblages de cubes et de pavés à partir d'un modèle en
//     trois dimensions ou d'une photo ;
//   — produire une suite d'instructions qui code un déplacement. Au CE1, elles
//     peuvent aller jusqu'à QUINZE instructions, dont quatre virages.
//
// ⚠️ Le quadrillage n'apparaît au CE1 que sous le robot, sur son tapis. Les
// quatre micro-compétences de quadrillage de ce fichier sont donc un usage de
// classe autant qu'un objectif du programme — c'est signalé dans microSkills.ts
// et Frédéric tranchera.
//
// LE PIÈGE DE LA NOTION : la gauche et la droite dépendent de CELUI QUI
// REGARDE. La gauche de l'élève assis en face n'est pas la mienne. Et sur un
// plan, on regarde d'en haut : la droite du plan est la droite de celui qui
// avance vers le haut de la feuille.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { CanvasFigure, DifficultyLevel, ReperageCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { cap, entre, etapes, gab, melange, prenom, qcm, qcmN, un } from "./geo-outils-ce1";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return melangeEnPlace([...items]);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function reperage(data: Omit<ReperageCanvasData, "kind">): ReperageCanvasData {
  return { kind: "reperage", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** « de le bureau » → « du bureau », « à le bureau » → « au bureau ». */
const du = (l: string) => (l.startsWith("le ") ? "du " + l.slice(3) : "de " + l);
const au = (l: string) => (l.startsWith("le ") ? "au " + l.slice(3) : "à " + l);

const anciens: TutorBankItemV4[] = [
  /* =========================================================
     CE1_ESPACE_POSITIONS — le vocabulaire des positions
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_espace_positions_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_espace_positions",
    difficulty: 2,
    theme: "neutral",
    text: "Le cahier est posé sur la table, et la trousse est posée sur le cahier. Où est le cahier par rapport à la trousse ?",
    format: "qcm",
    choices: ["sous la trousse", "sur la trousse", "à côté de la trousse", "devant la trousse"],
    expected: ["sous la trousse"],
    comparator: "mcq_exact",
    hint: "Si la trousse est dessus, le cahier est…",
    explanation: exp(
      "Les mots de position se disent toujours par rapport à quelque chose.",
      "On choisit l'objet de référence, puis on dit où se trouve l'autre.",
      "La trousse est sur le cahier ; vu depuis la trousse, le cahier est donc en dessous. « Sur » et « sous » disent la même chose dans les deux sens.",
      "Le cahier est sous la trousse.",
    ),
    tags: ["ce1", "reperage", "positions", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_espace_positions_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_espace_positions",
    difficulty: 3,
    theme: "neutral",
    hint: "Retourne la phrase : le mot change de sens.",
    tags: ["ce1", "reperage", "positions", "template"],
    generate: () => {
      const cas = randomChoice([
        { dit: "au-dessus de", inverse: "en dessous de" },
        { dit: "devant", inverse: "derrière" },
        { dit: "à gauche de", inverse: "à droite de" },
        { dit: "sur", inverse: "sous" },
      ]);
      const [a, b] = shuffle(["le ballon", "la boite", "le sac", "le livre"]).slice(0, 2);
      return {
        text: `${a.charAt(0).toUpperCase()}${a.slice(1)} est ${cas.dit} ${b}. Où est ${b} par rapport à ${a} ?`,
        format: "qcm",
        choices: makeChoices(`${cas.inverse} ${a}`, [
          `${cas.dit} ${a}`,
          `à côté de ${a}`,
          `loin de ${a}`,
          `entre ${a} et le mur`,
        ]),
        expected: [`${cas.inverse} ${a}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une position se dit toujours par rapport à un objet de référence : si on change de référence, le mot change.",
          "On repart de la phrase donnée et on la retourne.",
          `${a.charAt(0).toUpperCase()}${a.slice(1)} est ${cas.dit} ${b} : vu depuis ${b}, c'est donc l'inverse, ${cas.inverse} ${a}.`,
          `${b.charAt(0).toUpperCase()}${b.slice(1)} est ${cas.inverse} ${a}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ESPACE_SITUER — se situer et situer les autres
     LE piège : la gauche de celui qui est en face.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_espace_situer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_espace_situer",
    difficulty: 4,
    theme: "neutral",
    text: "Tu es assis en face de Malia. Elle lève sa main droite. De ton côté, tu la vois de quel côté ?",
    format: "qcm",
    choices: [
      "à ta gauche",
      "à ta droite",
      "devant toi, ni à gauche ni à droite",
      "on ne peut pas savoir",
    ],
    expected: ["à ta gauche"],
    comparator: "mcq_exact",
    hint: "Mets-toi à sa place, tourné dans l'autre sens.",
    explanation: exp(
      "La gauche et la droite dépendent de celui qui regarde.",
      "On se met par la pensée à la place de l'autre personne, tourné comme elle.",
      "Malia est tournée vers toi : sa droite est du côté de ta gauche. C'est pour cela qu'on se trompe si souvent quand on est en face de quelqu'un.",
      "Tu la vois à ta gauche.",
    ),
    tags: ["ce1", "reperage", "situer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_espace_situer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_espace_situer",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les places une à une.",
    tags: ["ce1", "reperage", "situer", "template"],
    generate: () => {
      const eleves = shuffle(["Malia", "Kevin", "Naïla", "Ryan", "Élia"]).slice(0, 5);
      const i = randomInt(1, 3);
      const cible = randomChoice(["à gauche", "à droite"] as const);
      const bonne = cible === "à gauche" ? eleves[i - 1] : eleves[i + 1];
      return {
        text: `Sur un banc, de gauche à droite, sont assis : ${eleves.join(", ")}. Qui est juste ${cible} de ${eleves[i]} ?`,
        format: "qcm",
        choices: makeChoices(bonne, eleves.filter((e) => e !== bonne)),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur une file, chacun a un voisin de gauche et un voisin de droite.",
          "On lit la liste dans l'ordre donné, de gauche à droite.",
          `${eleves[i]} est à la place ${i + 1}. Juste ${cible} de ${eleves[i]}, on trouve ${bonne}.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ESPACE_REPRESENTATION — le plan d'un lieu connu
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_espace_representation_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_espace_representation",
    difficulty: 3,
    theme: "neutral",
    text: "Sur le plan de l'école, d'où regarde-t-on les bâtiments ?",
    format: "qcm",
    choices: [
      "d'en haut, comme un oiseau",
      "de côté, comme sur une photo",
      "de l'intérieur d'une salle",
      "de la porte d'entrée",
    ],
    expected: ["d'en haut, comme un oiseau"],
    comparator: "mcq_exact",
    hint: "Un plan montre les pièces comme des cases posées côte à côte.",
    explanation: exp(
      "Un plan est une représentation vue du dessus.",
      "On imagine qu'on a enlevé le toit et qu'on regarde depuis le ciel.",
      "C'est pour cela qu'on voit la cour, les salles et les couloirs les uns à côté des autres, sans jamais voir les murs de face.",
      "On regarde d'en haut, comme un oiseau.",
    ),
    tags: ["ce1", "reperage", "plan", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_espace_representation_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_espace_representation",
    difficulty: 4,
    theme: "reunion",
    hint: "Suis le trajet sur le plan, étape par étape.",
    tags: ["ce1", "reperage", "plan", "reunion", "template"],
    generate: () => {
      const lieux = shuffle([
        "la cantine",
        "la bibliothèque",
        "le bureau de la directrice",
        "la cour",
        "la salle de sport",
      ]);
      const depart = lieux[0];
      const etape = lieux[1];
      const arrivee = lieux[2];
      return {
        text: `Sur le plan de l'école, Kevin part ${du(depart)}. Il passe devant ${etape}, puis s'arrête ${au(arrivee)}. Où finit-il son trajet ?`,
        format: "qcm",
        choices: makeChoices(arrivee, [depart, etape, lieux[3], lieux[4]]),
        expected: [arrivee],
        comparator: "mcq_exact",
        explanation: exp(
          "Un plan sert à décrire un trajet : on suit les étapes dans l'ordre.",
          "On repère le point de départ, puis on avance d'étape en étape.",
          `Kevin part ${du(depart)}, passe devant ${etape} sans s'arrêter, et termine ${au(arrivee)}.`,
          `Il finit ${au(arrivee)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_ESPACE_ASSEMBLAGES — construire avec des cubes
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_espace_assemblages_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_espace_assemblages",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une photo d'un assemblage de cubes, pourquoi faut-il faire attention en comptant les cubes ?",
    format: "qcm",
    choices: [
      "parce que certains cubes sont cachés derrière ou dessous",
      "parce que les cubes changent de taille sur la photo",
      "parce qu'on ne voit jamais les cubes du dessus",
      "il n'y a pas de piège, on compte ce qu'on voit",
    ],
    expected: ["parce que certains cubes sont cachés derrière ou dessous"],
    comparator: "mcq_exact",
    hint: "Un cube posé au-dessus d'un autre cache celui du dessous.",
    explanation: exp(
      "Une photo ne montre qu'un côté de l'assemblage : le reste est caché.",
      "On compte les cubes visibles, puis on cherche ceux qui doivent être là pour porter les autres.",
      "Un cube posé en hauteur repose forcément sur un autre, même si on ne le voit pas. Compter seulement ce qu'on voit donne toujours un nombre trop petit.",
      "Parce que certains cubes sont cachés derrière ou dessous.",
    ),
    tags: ["ce1", "reperage", "assemblages", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_espace_assemblages_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_espace_assemblages",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte étage par étage.",
    tags: ["ce1", "reperage", "assemblages", "template"],
    generate: () => {
      const base = randomInt(2, 5);
      const etages = randomInt(2, 3);
      const total = base * etages;
      return {
        text: `On empile des cubes : chaque étage est fait de ${base} cubes, et la tour compte ${etages} étages. Combien de cubes en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un assemblage se compte par morceaux réguliers : ici, étage par étage.",
          "On compte les cubes d'un étage, puis on répète autant de fois qu'il y a d'étages.",
          `${base} × ${etages} = ${total}. Les cubes des étages du bas sont cachés par ceux du dessus, mais ils comptent quand même.`,
          `Il y a ${total} cubes.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_REPERAGE_CASES_NOEUDS — le quadrillage
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_reperage_cases_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_reperage_cases_noeuds",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un quadrillage, quelle est la différence entre une case et un nœud ?",
    format: "qcm",
    choices: [
      "la case est une surface, le nœud est un point où deux traits se croisent",
      "la case est un point, le nœud est une surface",
      "il n'y a aucune différence",
      "le nœud est une case coloriée",
    ],
    expected: ["la case est une surface, le nœud est un point où deux traits se croisent"],
    comparator: "mcq_exact",
    hint: "On colorie une case ; on marque un nœud d'une croix.",
    explanation: exp(
      "Sur un quadrillage, la case est le petit carré ; le nœud est le point où deux traits se croisent.",
      "On regarde si on parle d'une surface qu'on peut colorier ou d'un point qu'on peut marquer.",
      "On colorie une case, on pose un pion dedans. Un nœud, lui, se marque d'une croix : c'est un coin de case.",
      "La case est une surface, le nœud est un point où deux traits se croisent.",
    ),
    tags: ["ce1", "reperage", "quadrillage", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_reperage_cases_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_reperage_cases_noeuds",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les cases d'une ligne, puis les lignes.",
    tags: ["ce1", "reperage", "quadrillage", "template"],
    generate: () => {
      const lignes = randomInt(3, 8);
      const colonnes = randomInt(3, 8);
      const total = lignes * colonnes;
      return {
        text: `Un quadrillage a ${lignes} lignes et ${colonnes} colonnes. Combien de cases en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un quadrillage est fait de cases rangées en lignes et en colonnes.",
          "On compte les cases d'une ligne, puis on répète autant de fois qu'il y a de lignes.",
          `${lignes} × ${colonnes} = ${total}.`,
          `Il y a ${total} cases.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_REPERAGE_COORDONNEES — dire où est une case
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_reperage_coordonnees_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_reperage_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Pour dire où se trouve une case sur un quadrillage, que faut-il donner ?",
    format: "qcm",
    choices: [
      "la colonne et la ligne",
      "seulement la colonne",
      "seulement la ligne",
      "la couleur de la case",
    ],
    expected: ["la colonne et la ligne"],
    comparator: "mcq_exact",
    hint: "Une seule information ne suffit pas à retrouver la case.",
    explanation: exp(
      "Une case se repère par deux informations : sa colonne et sa ligne.",
      "On lit d'abord la colonne, puis la ligne, toujours dans le même ordre.",
      "Avec la colonne seule, on connaît toute une bande de cases, pas une seule. Il faut croiser les deux renseignements pour tomber sur la bonne case.",
      "Il faut donner la colonne et la ligne.",
    ),
    tags: ["ce1", "reperage", "coordonnees", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_reperage_coordonnees_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_reperage_coordonnees",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis d'abord la colonne, puis la ligne.",
    tags: ["ce1", "reperage", "coordonnees", "template", "canvas"],
    generate: () => {
      const x = randomInt(1, 5);
      const y = randomInt(1, 5);
      const bonne = `colonne ${x}, ligne ${y}`;
      return {
        text: "Où se trouve le point marqué sur ce quadrillage ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          `colonne ${y}, ligne ${x}`,
          `colonne ${x + 1}, ligne ${y}`,
          `colonne ${x}, ligne ${y + 1}`,
          `colonne ${x + 1}, ligne ${y + 1}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un point se repère sur un quadrillage par sa colonne et sa ligne.",
          "On lit d'abord en avançant vers la droite, puis en montant.",
          `Le point est dans la colonne ${x} et sur la ligne ${y}. En inversant les deux nombres, on désigne une autre case.`,
          `Il est en ${bonne}.`,
        ),
        canvas: reperage({
          grid: { rows: 6, cols: 6 },
          points: [{ x, y, label: "?", color: "#ef4444" }],
        }),
      };
    },
  },

  /* =========================================================
     CE1_REPERAGE_DEPLACEMENT — décrire un déplacement
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_reperage_deplacement_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_reperage_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "Un pion avance de 3 cases vers la droite, puis de 2 cases vers la gauche. De combien de cases a-t-il avancé vers la droite en tout ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Les deux déplacements vont dans des sens contraires.",
    explanation: exp(
      "Deux déplacements de sens contraires se compensent en partie.",
      "On avance d'abord, on recule ensuite, et on regarde où l'on est arrivé.",
      "3 cases à droite, puis 2 à gauche : il en reste 3 - 2 = 1 vers la droite.",
      "Il a avancé de 1 case vers la droite.",
    ),
    tags: ["ce1", "reperage", "deplacement", "piege"],
  },
  {
    kind: "template",
    id: "ce1_reperage_deplacement_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_reperage_deplacement",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais les déplacements l'un après l'autre.",
    tags: ["ce1", "reperage", "deplacement", "template"],
    generate: () => {
      const depart = randomInt(1, 3);
      const droite = randomInt(1, 4);
      const gauche = randomInt(0, droite);
      const arrivee = depart + droite - gauche;
      return {
        text: `Un pion est dans la colonne ${depart}. Il avance de ${droite} cases vers la droite, puis recule de ${gauche} case${gauche > 1 ? "s" : ""}. Dans quelle colonne est-il arrivé ?`,
        format: "short",
        expected: [String(arrivee)],
        comparator: "number_equal",
        explanation: exp(
          "On suit un déplacement étape par étape, dans l'ordre donné.",
          "On avance d'abord, puis on recule, en comptant les cases une à une.",
          `${depart} + ${droite} = ${depart + droite}, puis ${depart + droite} - ${gauche} = ${arrivee}.`,
          `Il est arrivé dans la colonne ${arrivee}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_REPERAGE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_reperage_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_reperage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un pion fait le tour d'un carré de cases : 3 cases à droite, 3 en haut, 3 à gauche, 3 en bas. Où se retrouve-t-il ?",
    format: "qcm",
    choices: [
      "à son point de départ",
      "3 cases plus loin à droite",
      "3 cases plus haut",
      "au centre du carré",
    ],
    expected: ["à son point de départ"],
    comparator: "mcq_exact",
    hint: "Chaque déplacement est annulé par un autre.",
    explanation: exp(
      "Deux déplacements égaux et de sens contraires ramènent au point de départ.",
      "On suit le trajet case par case, ou on regroupe les déplacements opposés.",
      "Les 3 cases à droite sont annulées par les 3 à gauche ; les 3 en haut par les 3 en bas. Le pion revient exactement où il était.",
      "Il se retrouve à son point de départ.",
    ),
    tags: ["ce1", "reperage", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_reperage_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "reperage",
    microId: "ce1_reperage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Regroupe les déplacements qui vont dans le même sens.",
    tags: ["ce1", "reperage", "defi", "template"],
    generate: () => {
      const d1 = randomInt(2, 5);
      const g = randomInt(1, 4);
      const d2 = randomInt(1, 4);
      const total = d1 - g + d2;
      return {
        text: `Un pion avance de ${d1} cases à droite, recule de ${g} case${g > 1 ? "s" : ""}, puis avance encore de ${d2} case${d2 > 1 ? "s" : ""} à droite. De combien de cases s'est-il déplacé vers la droite en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Des déplacements de sens contraires se compensent : on peut les regrouper avant de calculer.",
          "On additionne ce qui va vers la droite, puis on enlève ce qui va vers la gauche.",
          `Vers la droite : ${d1} + ${d2} = ${d1 + d2}. Vers la gauche : ${g}. En tout : ${d1 + d2} - ${g} = ${total}.`,
          `Il s'est déplacé de ${total} cases vers la droite.`,
        ),
      };
    },
  },
];

/* ═════════════════════════════════════════════════════════════════════════
   GABARITS DU 10/11/2026 — robustesse et dessins (assemblages, quadrillage).
   Mesuré ce jour-là : 2 à 5 squelettes pour ces cinq micros, 15 à 18
   répétitions sur 20. Les trois micros d'espace (positions, situer,
   représentation) passaient déjà : leurs gabarits sont gardés tels quels.
   Ici, le dessin porte la question : la tour de cubes à compter, le quadrillage
   avec ses lettres et ses nombres, le chemin fléché de Pic.
   ═════════════════════════════════════════════════════════════════════════ */

const NR = "reperage";
const g = (micro: string, id: string, d: DifficultyLevel, hint: string, gen: Parameters<typeof gab>[5]) => gab(NR, micro, id, d, hint, gen);
const COLS = ["A", "B", "C", "D", "E", "F", "G"];
const HEROS = ["Pic", "Nina", "Téo", "Zoé", "Ravi"];
const il = (h: string) => (h === "Nina" || h === "Zoé" ? "elle" : "il");
/** « aller au trésor », « aller à la clé ». */
const TRESORS = ["au trésor", "à la clé", "au gâteau", "à la pomme", "au ballon", "à l'étoile", "au panier de letchis", "à la cabane"];
const AMBIANCE = ["", "C'est le jeu du robot.", "C'est la course au trésor.", "Direction le goûter !", "On joue sur le tapis de la classe.", "Pic cherche des graines."];

/* ─────────────── ce1_espace_assemblages ─────────────── */
const RA = "ce1_espace_assemblages";

/** Une rangée de colonnes de cubes, toutes visibles : hauteurs 1 à 4. */
function rangee(hauteurs: number[]): CanvasFigure {
  const cubes: { x: number; y: number; z: number }[] = [];
  hauteurs.forEach((h, x) => {
    for (let z = 0; z < h; z++) cubes.push({ x, y: 0, z });
  });
  return { kind: "solide_3d", solide: "assemblage_cubes", cubes, display: { showLabels: false, showDimensions: false } } as CanvasFigure;
}

function compterCubes() {
  const n = entre(2, 4);
  const h = Array.from({ length: n }, () => entre(1, 4));
  const total = h.reduce((a, b) => a + b, 0);
  const p = prenom();
  const debut = un([`${p} a construit cet escalier de cubes.`, `${p} empile des cubes pour faire un château.`, `Voici la tour de cubes de ${p}.`, `Pic a posé ces cubes en bois.`, `${p} construit un mur avec des cubes.`, `Au jardin d'enfants, ${p} a fait cette construction.`]);
  return {
    text: `${debut} ${un(["Combien de cubes a-t-il fallu ?", "Combien de cubes en tout ?", "Compte les cubes.", "Il y a combien de cubes ?"])}`,
    ...qcmN(total, [total - 1, total + 1, n, Math.max(...h) * n]),
    canvas: rangee(h),
    explanation: etapes("on compte colonne par colonne, de bas en haut.", `${h.join(" + ")} = ${total}.`, `Il y a ${total} cubes.`),
  };
}

function cubesAAjouter() {
  const n = entre(2, 4);
  const haut = entre(2, 4);
  const h = Array.from({ length: n }, () => entre(1, haut));
  if (h.every((x) => x === haut)) h[0] = haut - 1;
  const manque = h.reduce((a, b) => a + (haut - b), 0);
  return {
    text: `${un([`${prenom()} veut que toutes les colonnes aient ${haut} cubes.`, `Pour finir son mur, ${prenom()} veut ${haut} cubes dans chaque colonne.`, `Le maçon veut un mur de ${haut} cubes de haut partout.`])} ${un(["Combien de cubes faut-il ajouter ?", "Combien de cubes manque-t-il ?"])}`,
    ...qcmN(manque, [manque + 1, manque - 1, haut * n, h.reduce((a, b) => a + b, 0)]),
    canvas: rangee(h),
    explanation: etapes(`on regarde ce qui manque dans chaque colonne pour arriver à ${haut}.`, h.map((x) => haut - x).join(" + ") + ` = ${manque}.`, `Il faut ajouter ${manque} cubes.`),
  };
}

/* ─────────────── ce1_reperage_cases_noeuds ─────────────── */
const RC = "ce1_reperage_cases_noeuds";

function caseOuNoeud() {
  const surNoeud = Math.random() < 0.5;
  const x = entre(1, 4) + (surNoeud ? 0 : 0.5);
  const y = entre(1, 3) + (surNoeud ? 0 : 0.5);
  const h = un(HEROS);
  const juste = surNoeud ? "sur un nœud" : "dans une case";
  return {
    text: `${un([`${h} est sur le quadrillage.`, `Voici ${h} sur le quadrillage.`, `${h} joue sur le quadrillage.`])} ${un([`Est-${il(h)} sur un nœud ou dans une case ?`, `Où est ${h} : sur un nœud ou dans une case ?`])}`,
    ...qcm(juste, [surNoeud ? "dans une case" : "sur un nœud", "sur un trait, entre deux nœuds"]),
    canvas: { kind: "reperage", grid: { rows: 4, cols: 5 }, points: [{ x, y, label: h, color: "#ef4444" }], display: { showCoordinates: false, showAxes: false } } as CanvasFigure,
    explanation: etapes("un nœud est un point où deux traits se croisent ; une case est un petit carré.", surNoeud ? "Le point rouge est là où deux traits se croisent." : "Le point rouge est au milieu d'un petit carré.", `${h} est ${juste}.`),
  };
}

function compterCases() {
  const rows = entre(2, 4);
  const cols = entre(3, 5);
  const cas = un(["toutes", "coloriees"] as const);
  const k = entre(2, Math.min(7, rows * cols - 1));
  const cells = melange(Array.from({ length: rows * cols }, (_, i) => [Math.floor(i / cols), i % cols] as [number, number])).slice(0, k);
  const juste = cas === "toutes" ? rows * cols : k;
  const p = prenom();
  return {
    text: cas === "toutes"
      ? `${un([`${p} dessine un quadrillage.`, `Voici le tapis de jeu de ${p}.`, `La maîtresse a tracé ce quadrillage.`])} ${un(["Combien de cases y a-t-il ?", "Compte toutes les cases.", "Combien de petits carrés en tout ?"])}`
      : `${un([`${p} a colorié des cases.`, `Pic a peint des cases en bleu.`, `${p} joue à la bataille navale.`])} ${un(["Combien de cases sont coloriées ?", "Compte les cases coloriées."])}`,
    ...qcmN(juste, cas === "toutes" ? [(rows + 1) * (cols + 1), rows + cols, juste + 1, juste - 1] : [k + 1, k - 1, rows * cols - k]),
    canvas: { kind: "figure_libre", size: { cellSize: 30, padding: 10 }, grid: { rows, cols, filledCells: cas === "toutes" ? [] : cells }, display: { showGrid: true, showFilled: true } } as CanvasFigure,
    explanation: etapes("une case est un petit carré du quadrillage.", cas === "toutes" ? `${rows} rangées de ${cols} cases.` : `On compte les cases coloriées, une par une.`, `Il y a ${juste} cases.`),
  };
}

/* ─────────────── ce1_reperage_coordonnees ─────────────── */
const RD = "ce1_reperage_coordonnees";

/** Un quadrillage : colonnes A, B, C…, lignes 1, 2, 3… ; quelques personnages sur des nœuds. */
function carte(nb: number) {
  const cols = 5;
  const rows = 4;
  const pris = new Set<string>();
  const persos = melange([...HEROS]).slice(0, nb).map((label) => {
    let x = 0;
    let y = 0;
    // Deux personnages jamais voisins sur une même ligne : leurs noms se chevauchaient.
    do {
      x = entre(0, cols);
      y = entre(1, rows);
    } while ([...pris].some((c) => {
      const [a, b] = c.split(",").map(Number);
      return (b === y && Math.abs(a - x) < 2) || (a === x && Math.abs(b - y) < 1);
    }));
    pris.add(`${x},${y}`);
    return { x, y, label };
  });
  const canvas = { kind: "reperage", grid: { rows, cols, xLabels: COLS.slice(0, cols + 1), yLabels: ["", "1", "2", "3", "4"] }, points: persos.map((q) => ({ ...q, color: "#ef4444" })), display: { showAxes: false } } as CanvasFigure;
  return { persos, canvas };
}
const nomCase = (x: number, y: number) => `colonne ${COLS[x]}, ligne ${y}`;

function ouEst(ctx: boolean) {
  const { persos, canvas } = carte(ctx ? 3 : 2);
  const c = un(persos);
  const faux = [nomCase(Math.min(c.x + 1, 5), c.y), nomCase(Math.max(c.x - 1, 0), c.y), nomCase(c.x, c.y === 4 ? 3 : c.y + 1), ...persos.filter((q) => q !== c).map((q) => nomCase(q.x, q.y))];
  const debut = ctx ? un(["On joue à cache-cache sur le quadrillage.", "Voici le plan du parc.", "La troupe se cache dans le jardin.", "Voici la carte du trésor."]) : un(["Regarde le quadrillage.", ""]);
  return {
    text: `${debut} ${un([`Où est ${c.label} ?`, `Où se trouve ${c.label} ?`, `Donne la place de ${c.label}.`])}`.trim(),
    ...qcm(nomCase(c.x, c.y), faux),
    canvas,
    explanation: etapes("on descend jusqu'à la lettre de la colonne, puis on va à gauche jusqu'au nombre de la ligne.", `${c.label} est sur la colonne ${COLS[c.x]} et la ligne ${c.y}.`, `${nomCase(c.x, c.y)}.`),
  };
}

function quiEst() {
  const { persos, canvas } = carte(3);
  const c = un(persos);
  return {
    text: `${un(["Regarde le quadrillage.", "Voici le plan de la cour.", "La troupe joue au parc."])} ${un([`Qui est en ${nomCase(c.x, c.y)} ?`, `Qui se trouve en ${nomCase(c.x, c.y)} ?`])}`,
    ...qcm(c.label, [...persos.filter((q) => q !== c).map((q) => q.label), un(HEROS.filter((h) => !persos.some((q) => q.label === h)))]),
    canvas,
    explanation: etapes("on trouve la colonne, puis la ligne, et on regarde qui est au croisement.", `Au croisement de ${COLS[c.x]} et ${c.y}, il y a ${c.label}.`, `C'est ${c.label}.`),
  };
}

function lireNombres() {
  const x = entre(1, 5);
  const y = entre(1, 4);
  const xy = (a: number, b: number) => `colonne ${a}, ligne ${b}`;
  const h = un(HEROS);
  return {
    text: `${un([`${h} est sur le quadrillage.`, `Où est ${h} ?`, `On cherche ${h}.`])} ${un(["Donne sa colonne, puis sa ligne.", "Lis la colonne en bas, puis la ligne à gauche.", "Quelle est sa place ?"])}`,
    ...qcm(xy(x, y), [x !== y ? xy(y, x) : xy(x + 1, y), xy(x + 1, y), xy(x, y + 1), xy(x - 1, y)].filter((v) => v !== xy(x, y))),
    canvas: { kind: "reperage", grid: { rows: 5, cols: 6 }, points: [{ x, y, label: h, color: "#ef4444" }], display: { showAxes: false } } as CanvasFigure,
    explanation: etapes("on lit d'abord la colonne (en bas), puis la ligne (à gauche).", `Colonne ${x}, ligne ${y}. Attention : « colonne ${y}, ligne ${x} » est une autre place.`, `${xy(x, y)}.`),
  };
}

/* ─────────────── ce1_reperage_deplacement ─────────────── */
const RM = "ce1_reperage_deplacement";
type Pas = { direction: "haut" | "bas" | "gauche" | "droite"; count: number };
const FLECHE: Record<Pas["direction"], string> = { haut: "en haut", bas: "en bas", gauche: "à gauche", droite: "à droite" };
const phrase = (p: Pas) => `${p.count} case${p.count > 1 ? "s" : ""} ${FLECHE[p.direction]}`;
/** « 1 case en bas, 2 cases à gauche, puis 1 case en haut » : un seul « puis », la phrase reste courte. */
const suite = (pas: Pas[]) => (pas.length < 2 ? pas.map(phrase).join("") : `${pas.slice(0, -1).map(phrase).join(", ")}, puis ${phrase(pas[pas.length - 1])}`);

/** Un chemin qui reste dans le quadrillage 6 × 5. */
function chemin(nb: number) {
  for (;;) {
    let x = entre(0, 6);
    let y = entre(0, 5);
    const depart = { x, y };
    const pas: Pas[] = [];
    let ok = true;
    let derniere = "";
    for (let k = 0; k < nb; k++) {
      const dir = un((["haut", "bas", "gauche", "droite"] as const).filter((d) => d !== derniere && !(derniere === "haut" && d === "bas") && !(derniere === "bas" && d === "haut") && !(derniere === "gauche" && d === "droite") && !(derniere === "droite" && d === "gauche")));
      const c = entre(1, 3);
      x += dir === "droite" ? c : dir === "gauche" ? -c : 0;
      y += dir === "haut" ? c : dir === "bas" ? -c : 0;
      if (x < 0 || x > 6 || y < 0 || y > 5) ok = false;
      pas.push({ direction: dir, count: c });
      derniere = dir;
    }
    if (ok && (x !== depart.x || y !== depart.y)) return { depart, pas, arrivee: { x, y } };
  }
}
const place = (x: number, y: number) => `colonne ${x}, ligne ${y}`;

function ouArrive(nb: number, dessine: boolean) {
  const { depart, pas, arrivee } = chemin(nb);
  const h = un(HEROS);
  const faux = [place(arrivee.y, arrivee.x), place(arrivee.x + 1, arrivee.y), place(arrivee.x, arrivee.y + 1), place(arrivee.x - 1, arrivee.y), place(arrivee.x, Math.max(0, arrivee.y - 1))].filter((v) => v !== place(arrivee.x, arrivee.y));
  return {
    text: `${un(AMBIANCE)} ${h} est en ${place(depart.x, depart.y)}. ${dessine ? un(["Suis les flèches.", "Suis le chemin fléché.", "Les flèches montrent son chemin."]) : `${cap(il(h))} va : ${suite(pas)}.`} ${un([`Où arrive ${h} ?`, "Quelle est la place d'arrivée ?", "Où finit le chemin ?"])}`.trim(),
    ...qcm(place(arrivee.x, arrivee.y), faux),
    canvas: { kind: "reperage", grid: { rows: 5, cols: 6 }, path: dessine ? { start: { ...depart, label: h }, steps: pas, showArrows: true } : undefined, points: dessine ? [] : [{ ...depart, label: h, color: "#ef4444" }], target: dessine ? { ...arrivee, label: "?", hidden: false } : undefined, display: { showAxes: false } } as CanvasFigure,
    explanation: etapes("on fait les déplacements un par un, dans l'ordre.", pas.map(phrase).join(", puis ") + ".", `On arrive en ${place(arrivee.x, arrivee.y)}.`),
  };
}

function quelChemin() {
  const { depart, pas, arrivee } = chemin(2);
  const h = un(HEROS);
  const t = un(TRESORS);
  const juste = pas.map(phrase).join(", puis ");
  const inverse = (d: Pas["direction"]) => (d === "haut" ? "bas" : d === "bas" ? "haut" : d === "gauche" ? "droite" : "gauche");
  const faux = [
    pas.map((p) => phrase({ ...p, direction: inverse(p.direction) })).join(", puis "),
    pas.map((p, k) => phrase({ ...p, count: p.count + (k === 0 ? 1 : 0) })).join(", puis "),
    [phrase({ direction: pas[0].direction, count: pas[1].count }), phrase({ direction: pas[1].direction, count: pas[0].count })].join(", puis "),
  ];
  return {
    text: `${un(AMBIANCE)} ${h} veut aller ${t} (★). ${un([`Quel chemin doit-${il(h)} suivre ?`, "Quel est le bon chemin ?", "Comment y aller ?"])}`.trim(),
    ...qcm(juste, faux),
    canvas: { kind: "reperage", grid: { rows: 5, cols: 6 }, points: [{ ...depart, label: h, color: "#ef4444" }, { ...arrivee, label: "★", color: "#f59e0b" }], display: { showAxes: false } } as CanvasFigure,
    explanation: etapes("on compte les cases d'abord dans un sens, puis dans l'autre.", `Il faut : ${juste}.`, `Le bon chemin : ${juste}.`),
  };
}

/* ─────────────── ce1_reperage_defi ─────────────── */
const RF = "ce1_reperage_defi";

function plusCourt() {
  let a = { x: 0, y: 0 };
  let b = { x: 0, y: 0 };
  do {
    a = { x: entre(0, 6), y: entre(0, 5) };
    b = { x: entre(0, 6), y: entre(0, 5) };
  } while (a.x === b.x || a.y === b.y || Math.abs(a.x - b.x) + Math.abs(a.y - b.y) < 4);
  const n = Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
  const h = un(HEROS);
  const t = un(TRESORS);
  return {
    text: `${un(["Défi !", "Pic lance un défi.", `${prenom()} lance un défi.`])} ${h} veut aller ${t} (★), sans passer en biais. ${un(["Combien de cases au minimum ?", "Quel est le plus petit nombre de cases ?"])}`,
    ...qcmN(n, [n + 1, n + 2, Math.abs(a.x - b.x), Math.abs(a.y - b.y), n - 1]),
    canvas: { kind: "reperage", grid: { rows: 5, cols: 6 }, points: [{ ...a, label: h, color: "#ef4444" }, { ...b, label: "★", color: "#f59e0b" }], display: { showAxes: false } } as CanvasFigure,
    explanation: etapes("on compte les cases à faire de côté, puis celles en haut ou en bas.", `${Math.abs(a.x - b.x)} de côté + ${Math.abs(a.y - b.y)} en hauteur = ${n}.`, `${n} cases au minimum.`),
  };
}

/* ─────────────── la banque ─────────────── */
const nouveaux: TutorBankItemV4[] = [
  g(RA, "ce1_espace_assemblages_tpl_1", 4, "Compte colonne par colonne, de bas en haut.", () => (Math.random() < 0.6 ? compterCubes() : cubesAAjouter())),
  g(RA, "ce1_espace_assemblages_tpl_2", 4, "Regarde ce qui manque dans chaque colonne.", () => (Math.random() < 0.5 ? cubesAAjouter() : compterCubes())),

  g(RC, "ce1_reperage_cases_tpl_1", 3, "Une case est un petit carré ; un nœud, un croisement de traits.", () => compterCases()),
  g(RC, "ce1_reperage_cases_tpl_2", 3, "Un nœud est là où deux traits se croisent.", () => caseOuNoeud()),

  g(RD, "ce1_reperage_coordonnees_tpl_1", 4, "Lis d'abord la colonne, puis la ligne.", () => (Math.random() < 0.5 ? lireNombres() : quiEst())),
  g(RD, "ce1_reperage_coordonnees_tpl_2", 3, "Descends jusqu'à la lettre, puis va à gauche jusqu'au nombre.", () => ouEst(Math.random() < 0.5)),

  g(RM, "ce1_reperage_deplacement_tpl_1", 4, "Fais les déplacements l'un après l'autre.", () => (Math.random() < 0.5 ? ouArrive(3, false) : quelChemin())),
  g(RM, "ce1_reperage_deplacement_tpl_2", 3, "Suis les flèches, case par case.", () => ouArrive(2, true)),
  g(RM, "ce1_reperage_deplacement_tpl_3", 3, "Compte les cases de côté, puis en hauteur.", () => quelChemin()),

  g(RF, "ce1_reperage_defi_tpl_1", 5, "Fais les déplacements l'un après l'autre.", () => (Math.random() < 0.5 ? ouArrive(4, false) : plusCourt())),
];

const REMPLACES = new Set(nouveaux.map((i) => i.id).concat(["ce1_espace_assemblages_tpl_1", "ce1_reperage_cases_tpl_1", "ce1_reperage_coordonnees_tpl_1", "ce1_reperage_deplacement_tpl_1", "ce1_reperage_defi_tpl_1"]));
export const reperageBank: TutorBankItemV4[] = [...anciens.filter((i) => !REMPLACES.has(i.id)), ...nouveaux];
