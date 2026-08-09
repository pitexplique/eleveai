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

import type { ReperageCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
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

export const reperageBank: TutorBankItemV4[] = [
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
        text: `Sur le plan de l'école, Kevin part de ${depart}, passe devant ${etape}, puis s'arrête à ${arrivee}. Où finit-il son trajet ?`,
        format: "qcm",
        choices: makeChoices(arrivee, [depart, etape, lieux[3], lieux[4]]),
        expected: [arrivee],
        comparator: "mcq_exact",
        explanation: exp(
          "Un plan sert à décrire un trajet : on suit les étapes dans l'ordre.",
          "On repère le point de départ, puis on avance d'étape en étape.",
          `Kevin part de ${depart}, passe devant ${etape} sans s'arrêter, et termine à ${arrivee}.`,
          `Il finit à ${arrivee}.`,
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
