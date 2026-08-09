// lib/tutor-v4/questionBank/ce2/maths/droites-angles.bank.ts
//
// Les droites, les angles droits et les codages du CE2, écrits à la main. Six
// micro-compétences qui passaient par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : reconnaître et tracer des
// alignements, des droites et des segments ; reconnaître et tracer un angle
// droit à l'équerre ; UTILISER les codages — le petit carré de l'angle droit et
// les traits des segments de même longueur ; repérer deux côtés perpendiculaires
// dans une figure.
// ⛔ Pas de parallèles au cycle 2, pas de mesure d'angle en degrés : le
// rapporteur arrive au cycle 3. Ici l'équerre décide, ou le codage l'affirme.
//
// LE PIÈGE DE LA NOTION : croire ses yeux. Trois points qui semblent alignés ne
// le sont pas forcément, et un coin qui a l'air droit ne l'est pas forcément.
// C'est la règle qu'on pose, c'est l'équerre qu'on présente — l'œil ne tranche
// rien. Et son revers, tout aussi coûteux : quand le CODAGE est là, il n'y a
// plus rien à vérifier. Le petit carré AFFIRME que l'angle est droit ; le
// mesurer à nouveau, c'est n'avoir pas compris ce qu'est un codage.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type {
  DroitesCanvasData,
  QuadrilatereCanvasData,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

// La bonne réponse est mise de côté, trois pièges distincts sont tirés ensuite,
// puis on mélange. L'écrire autrement a rendu des questions impossibles à
// réussir dans 79 banques : voir scripts/verifier-generateurs.mjs.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function droites(data: Omit<DroitesCanvasData, "kind">): DroitesCanvasData {
  return {
    kind: "droites",
    size: { width: 340, height: 240 },
    display: {
      showGrid: false,
      showLabels: true,
      showPoints: true,
      showRightAngleMarkers: true,
    },
    ...data,
  };
}

function quadrilatere(data: Omit<QuadrilatereCanvasData, "kind">): QuadrilatereCanvasData {
  return { kind: "quadrilatere", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/* ─── Trois points : vraiment alignés, ou seulement à l'œil ──────────────────
   Sur la version alignée, B tombe exactement sur la droite (AC) : la pente vaut
   −0,5 tout rond. Sur l'autre, B est décalé de trois pixels — invisible à
   l'œil, net dès qu'on pose la règle. C'est toute la leçon. */

const POINTS_ALIGNES = { A: { x: 40, y: 180 }, B: { x: 160, y: 120 }, C: { x: 280, y: 60 } };
const POINTS_PRESQUE = { A: { x: 40, y: 180 }, B: { x: 150, y: 120 }, C: { x: 280, y: 55 } };

function troisPoints(alignes: boolean): DroitesCanvasData {
  const p = alignes ? POINTS_ALIGNES : POINTS_PRESQUE;
  return droites({
    lines: [],
    points: [
      { x: p.A.x, y: p.A.y, label: "A" },
      { x: p.B.x, y: p.B.y, label: "B" },
      { x: p.C.x, y: p.C.y, label: "C" },
    ],
  });
}

/** Deux droites qui se coupent : perpendiculaires, ou franchement pas. */
function deuxDroites(perpendiculaires: boolean, codage: boolean): DroitesCanvasData {
  // Direction (4, 3) puis sa perpendiculaire (−3, 4) : l'angle est droit au
  // pixel près, et rien n'est aligné sur le bord de la feuille.
  const centre = { x: 170, y: 120 };
  const d1 = {
    from: { x: centre.x - 120, y: centre.y - 90 },
    to: { x: centre.x + 120, y: centre.y + 90 },
  };
  const d2 = perpendiculaires
    ? { from: { x: centre.x + 60, y: centre.y - 80 }, to: { x: centre.x - 60, y: centre.y + 80 } }
    : { from: { x: centre.x + 110, y: centre.y - 60 }, to: { x: centre.x - 110, y: centre.y + 20 } };

  return droites({
    lines: [
      { id: "d1", type: "droite", from: d1.from, to: d1.to, label: "(d1)" },
      { id: "d2", type: "droite", from: d2.from, to: d2.to, label: "(d2)" },
    ],
    intersections: perpendiculaires ? [{ x: centre.x, y: centre.y, highlight: true }] : [],
    markers:
      perpendiculaires && codage
        ? { rightAngles: [{ x: centre.x, y: centre.y, lineA: "d1", lineB: "d2" }] }
        : undefined,
  });
}

function rectangleCode(): QuadrilatereCanvasData {
  return quadrilatere({
    points: {
      A: { x: 55, y: 60 },
      B: { x: 245, y: 60 },
      C: { x: 245, y: 170 },
      D: { x: 55, y: 170 },
    },
    display: { showPoints: true, showLabels: true, showSides: false },
    marks: {
      rightAnglesAt: ["A", "B", "C", "D"],
      equalSides: [["AB", "CD"], ["BC", "DA"]],
    },
  });
}

export const droitesAnglesBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_DROITE_ALIGNEMENT — alignements, droites, segments
     Le piège de l'œil est ici.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_droite_alignement_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_alignement",
    difficulty: 1,
    theme: "neutral",
    text: "Comment vérifie-t-on que trois points sont alignés ?",
    format: "qcm",
    choices: [
      "on pose la règle et on regarde si elle touche les trois points",
      "on regarde bien de loin",
      "on les compte",
      "on mesure la distance entre eux",
    ],
    expected: ["on pose la règle et on regarde si elle touche les trois points"],
    comparator: "mcq_exact",
    hint: "L'œil se trompe. Un instrument, non.",
    explanation: exp(
      "Trois points sont alignés quand une même droite les traverse tous les trois.",
      "On pose le bord de la règle sur deux des points, puis on regarde le troisième.",
      "Si la règle touche aussi le troisième point, ils sont alignés. Si un tout petit espace apparaît, ils ne le sont pas — même si à l'œil, cela ne se voyait pas.",
      "On pose la règle.",
    ),
    tags: ["ce2", "droites_angles", "alignement", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_droite_alignement_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_alignement",
    difficulty: 4,
    theme: "neutral",
    text: "Ces trois points ont l'air alignés. Léa pose sa règle sur A et C : elle voit un petit espace au niveau de B. Que faut-il conclure ?",
    format: "qcm",
    choices: [
      "les trois points ne sont pas alignés",
      "ils sont alignés, l'espace ne compte pas",
      "il faut regarder de plus loin",
      "on ne peut pas savoir",
    ],
    expected: ["les trois points ne sont pas alignés"],
    comparator: "mcq_exact",
    hint: "La règle a tranché. L'œil n'a pas son mot à dire.",
    explanation: exp(
      "Trois points sont alignés seulement si une même droite les traverse tous les trois.",
      "On pose la règle sur deux points et on observe le troisième.",
      "B n'est pas sur la droite qui passe par A et C : il s'en écarte d'un cheveu. Ce n'est pas « presque aligné » — en géométrie, presque aligné veut dire pas aligné.",
      "Les trois points ne sont pas alignés.",
    ),
    tags: ["ce2", "droites_angles", "alignement", "piege", "qcm", "canvas"],
    canvas: troisPoints(false),
  },
  {
    kind: "fixed",
    id: "ce2_droite_alignement_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_alignement",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la différence entre un segment et une droite ?",
    format: "qcm",
    choices: [
      "le segment a deux extrémités, la droite continue sans fin",
      "le segment est courbe, la droite est droite",
      "le segment est plus court à dessiner",
      "il n'y a aucune différence",
    ],
    expected: ["le segment a deux extrémités, la droite continue sans fin"],
    comparator: "mcq_exact",
    hint: "Peux-tu dessiner une droite EN ENTIER sur ta feuille ?",
    explanation: exp(
      "Un segment est limité par deux extrémités ; une droite se prolonge sans fin des deux côtés.",
      "On regarde si le trait s'arrête à des points précis ou s'il déborde de la feuille.",
      "Le segment [AB] va de A à B et s'arrête là. La droite (AB) passe par A et B mais continue au-delà : on n'en dessine qu'un morceau, faute de place. La demi-droite, elle, s'arrête d'un seul côté.",
      "Le segment a deux extrémités, la droite n'en a aucune.",
    ),
    tags: ["ce2", "droites_angles", "alignement", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_droite_alignement_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_alignement",
    difficulty: 3,
    theme: "neutral",
    hint: "Pose la règle sur deux points et regarde le troisième.",
    tags: ["ce2", "droites_angles", "alignement", "template", "canvas"],
    generate: () => {
      const alignes = randomChoice([true, false]);
      const bonne = alignes
        ? "oui, la règle touche les trois"
        : "non, un point est légèrement à côté";
      return {
        text: "En posant la règle sur A et C, ces trois points sont-ils alignés ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          "oui, la règle touche les trois",
          "non, un point est légèrement à côté",
          "non, ils sont trop éloignés",
          "on ne peut pas le savoir avec une règle",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Trois points sont alignés quand une même droite les traverse tous les trois.",
          "On pose la règle sur deux points, puis on observe le troisième.",
          alignes
            ? "La règle posée sur A et C passe exactement par B : les trois points sont alignés."
            : "La règle posée sur A et C laisse un petit espace au niveau de B : il n'est pas sur la droite. Presque aligné veut dire pas aligné.",
          bonne.charAt(0).toUpperCase() + bonne.slice(1) + ".",
        ),
        canvas: troisPoints(alignes),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_droite_alignement_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_alignement",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les extrémités : deux, une, ou aucune.",
    tags: ["ce2", "droites_angles", "alignement", "template"],
    generate: () => {
      const cas = randomChoice([
        { nom: "un segment", desc: "un trait limité par deux extrémités", extremites: "deux extrémités" },
        { nom: "une demi-droite", desc: "un trait qui part d'un point et continue sans fin d'un seul côté", extremites: "une seule extrémité" },
        { nom: "une droite", desc: "un trait qui continue sans fin des deux côtés", extremites: "aucune extrémité" },
      ] as const);
      return {
        text: `Comment appelle-t-on ${cas.desc} ?`,
        format: "qcm",
        choices: makeChoices(cas.nom, [
          "un segment",
          "une demi-droite",
          "une droite",
          "un cercle",
        ]),
        expected: [cas.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "Un segment a deux extrémités, une demi-droite une seule, une droite aucune.",
          "On compte les bouts du trait : là où il s'arrête pour de bon.",
          `Ici le trait a ${cas.extremites} : c'est ${cas.nom}.`,
          `C'est ${cas.nom}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ANGLE_DROIT — reconnaître et tracer à l'équerre
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_angle_droit_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Comment vérifie-t-on qu'un angle est droit ?",
    format: "qcm",
    choices: [
      "on présente le coin de l'équerre dans l'angle",
      "on le mesure avec la règle graduée",
      "on regarde s'il est joli",
      "on le compare au coin de la gomme",
    ],
    expected: ["on présente le coin de l'équerre dans l'angle"],
    comparator: "mcq_exact",
    hint: "L'équerre porte elle-même un angle droit : c'est son étalon.",
    explanation: exp(
      "L'équerre porte un angle droit qui sert de modèle.",
      "On glisse le coin de l'équerre dans l'angle à vérifier, en faisant coïncider les deux bords.",
      "Si l'angle remplit exactement le coin de l'équerre, sans jour ni dépassement, il est droit. La règle graduée mesure des longueurs, pas des angles.",
      "On présente le coin de l'équerre.",
    ),
    tags: ["ce2", "droites_angles", "angle_droit", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_angle_droit_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit",
    difficulty: 4,
    theme: "neutral",
    text: "Ces deux droites sont penchées, aucune n'est horizontale. L'équerre montre qu'elles forment un angle droit. Est-ce vraiment un angle droit ?",
    format: "qcm",
    choices: [
      "oui, un angle droit peut être penché",
      "non, un angle droit doit avoir un trait horizontal",
      "non, il faut que les droites soient droites sur la feuille",
      "on ne peut pas savoir",
    ],
    expected: ["oui, un angle droit peut être penché"],
    comparator: "mcq_exact",
    hint: "Tourne la feuille : l'angle change-t-il ?",
    explanation: exp(
      "Un angle droit est un angle qui remplit exactement le coin de l'équerre, quelle que soit son orientation.",
      "On présente l'équerre en la tournant comme il faut, sans exiger que les traits soient horizontaux.",
      "L'équerre remplit l'angle : il est droit. En tournant la feuille, les deux droites se retrouveraient l'une horizontale, l'autre verticale — sans que l'angle ait bougé.",
      "Oui, c'est bien un angle droit.",
    ),
    tags: ["ce2", "droites_angles", "angle_droit", "piege", "qcm", "canvas"],
    canvas: deuxDroites(true, true),
  },
  {
    kind: "fixed",
    id: "ce2_angle_droit_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d'angles droits y a-t-il dans un rectangle ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Vérifie les quatre coins avec l'équerre.",
    explanation: exp(
      "Un rectangle a quatre angles droits : c'est ce qui le définit.",
      "On présente l'équerre dans chacun des quatre coins.",
      "Les quatre coins remplissent exactement l'équerre. C'est vrai aussi pour le carré, qui est un rectangle avec en plus quatre côtés égaux.",
      "Il y en a 4.",
    ),
    tags: ["ce2", "droites_angles", "angle_droit", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_angle_droit_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit",
    difficulty: 3,
    theme: "neutral",
    hint: "Présente le coin de l'équerre : remplit-il l'angle exactement ?",
    tags: ["ce2", "droites_angles", "angle_droit", "template", "canvas"],
    generate: () => {
      const droit = randomChoice([true, false]);
      const bonne = droit
        ? "oui, l'équerre remplit exactement l'angle"
        : "non, l'angle ne remplit pas l'équerre";
      return {
        text: "Ces deux droites forment-elles un angle droit ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          "oui, l'équerre remplit exactement l'angle",
          "non, l'angle ne remplit pas l'équerre",
          "non, elles sont trop penchées",
          "oui, parce qu'elles se croisent",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un angle est droit quand il remplit exactement le coin de l'équerre, même s'il est penché.",
          "On présente l'équerre au point de croisement, sans se soucier de l'inclinaison.",
          droit
            ? "L'équerre se loge exactement dans l'angle : les deux droites sont perpendiculaires."
            : "L'angle est trop ouvert pour l'équerre : elle ne s'y loge pas. Ce n'est pas un angle droit. Se croiser ne suffit pas.",
          bonne.charAt(0).toUpperCase() + bonne.slice(1) + ".",
        ),
        canvas: deuxDroites(droit, false),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_angle_droit_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche l'objet dont le coin est bien carré.",
    tags: ["ce2", "droites_angles", "angle_droit", "template"],
    generate: () => {
      const objets = [
        { nom: "le coin d'une feuille de cahier", droit: true },
        { nom: "le coin d'une porte", droit: true },
        { nom: "le coin d'une table rectangulaire", droit: true },
        { nom: "la pointe d'un crayon taillé", droit: false },
        { nom: "la pointe d'une part de tarte", droit: false },
        { nom: "le bord d'une assiette ronde", droit: false },
      ] as const;
      const o = randomChoice(objets);
      const bonne = o.droit ? "oui" : "non";
      return {
        text: `${o.nom.charAt(0).toUpperCase() + o.nom.slice(1)} forme-t-il un angle droit ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "oui",
          "non",
          "seulement si on le tourne",
          "on ne peut pas le vérifier",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un angle droit remplit exactement le coin de l'équerre.",
          "On imagine qu'on pose l'équerre sur l'objet.",
          o.droit
            ? `${o.nom.charAt(0).toUpperCase() + o.nom.slice(1)} remplit le coin de l'équerre : c'est un angle droit.`
            : `${o.nom.charAt(0).toUpperCase() + o.nom.slice(1)} est bien trop pointu, ou n'a pas de coin du tout : ce n'est pas un angle droit.`,
          `Réponse : ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_ANGLE_DROIT_CODAGE — lire le petit carré
     Le codage AFFIRME. Il n'y a plus rien à vérifier.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_angle_droit_codage_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit_codage",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une figure, que veut dire le petit carré dessiné dans un coin ?",
    format: "qcm",
    choices: [
      "cet angle est droit",
      "cet angle est à mesurer",
      "ce coin est important",
      "ce coin est un carré",
    ],
    expected: ["cet angle est droit"],
    comparator: "mcq_exact",
    hint: "C'est un message écrit par celui qui a fait le dessin.",
    explanation: exp(
      "Le codage est un message : il dit ce qui est vrai sur la figure sans qu'on ait à le mesurer.",
      "On lit les codages avant de commencer, comme on lit une consigne.",
      "Le petit carré dans un coin annonce que cet angle est droit. Ce n'est pas une question, c'est une information donnée.",
      "Il veut dire que cet angle est droit.",
    ),
    tags: ["ce2", "droites_angles", "codage", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_angle_droit_codage_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit_codage",
    difficulty: 4,
    theme: "neutral",
    text: "Un angle porte déjà le petit carré du codage. Faut-il quand même le vérifier à l'équerre ?",
    format: "qcm",
    choices: [
      "non, le codage l'affirme déjà",
      "oui, toujours",
      "oui, si la figure est penchée",
      "seulement si l'angle a l'air bizarre",
    ],
    expected: ["non, le codage l'affirme déjà"],
    comparator: "mcq_exact",
    hint: "Le codage n'est pas une question posée : c'est une réponse donnée.",
    explanation: exp(
      "Un codage affirme une propriété de la figure : il n'y a rien à vérifier derrière.",
      "On lit le codage et on l'utilise comme une information sûre.",
      "Le petit carré dit que l'angle EST droit. Le dessin n'est peut-être pas parfait, mais le codage, lui, est exact — c'est justement à cela qu'il sert.",
      "Non, le codage suffit.",
    ),
    tags: ["ce2", "droites_angles", "codage", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_angle_droit_codage_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit_codage",
    difficulty: 3,
    theme: "neutral",
    text: "Sur cette figure, combien d'angles droits sont codés ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Compte les petits carrés dessinés dans les coins.",
    explanation: exp(
      "Chaque petit carré dessiné dans un coin code un angle droit.",
      "On fait le tour de la figure en comptant les petits carrés.",
      "Les quatre coins portent chacun un petit carré : quatre angles droits sont codés. Cette figure est donc un rectangle.",
      "Il y en a 4.",
    ),
    tags: ["ce2", "droites_angles", "codage", "canvas"],
    canvas: rectangleCode(),
  },
  {
    kind: "template",
    id: "ce2_angle_droit_codage_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit_codage",
    difficulty: 3,
    theme: "neutral",
    hint: "Le codage dit ce qui est vrai : il n'y a rien à mesurer.",
    tags: ["ce2", "droites_angles", "codage", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          figure: "un rectangle",
          nb: 4,
          pourquoi: "les quatre coins d'un rectangle sont droits",
        },
        {
          figure: "un carré",
          nb: 4,
          pourquoi: "les quatre coins d'un carré sont droits",
        },
        {
          figure: "un triangle rectangle",
          nb: 1,
          pourquoi: "un triangle ne peut avoir qu'un seul angle droit",
        },
        {
          figure: "un losange sans angle droit",
          nb: 0,
          pourquoi: "le losange n'impose rien à ses angles",
        },
      ] as const);
      return {
        text: `Sur le dessin de ${cas.figure}, combien de petits carrés d'angle droit doit-on trouver ?`,
        format: "short",
        expected: [String(cas.nb)],
        comparator: "number_equal",
        explanation: exp(
          "Chaque petit carré code un angle droit : on en dessine autant que la figure en possède.",
          "On compte les angles droits de la figure, puis on code chacun d'eux.",
          `Pour ${cas.figure}, ${cas.pourquoi} : il faut ${cas.nb} petit${cas.nb > 1 ? "s" : ""} carré${cas.nb > 1 ? "s" : ""}.`,
          `Il en faut ${cas.nb}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_angle_droit_codage_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_angle_droit_codage",
    difficulty: 4,
    theme: "neutral",
    hint: "Que t'apprend le codage, exactement ?",
    tags: ["ce2", "droites_angles", "codage", "piege", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          question: "Un petit carré est dessiné au sommet B d'un triangle. Que sait-on ?",
          bonne: "l'angle en B est droit",
          pieges: [
            "le triangle est un carré",
            "le côté BC mesure la même chose que AB",
            "il faut mesurer l'angle en B",
          ],
        },
        {
          question: "Aucun petit carré n'est dessiné sur une figure. Que sait-on de ses angles ?",
          bonne: "rien n'est affirmé : aucun angle droit n'est annoncé",
          pieges: [
            "tous ses angles sont droits",
            "aucun de ses angles n'existe",
            "la figure est forcément un cercle",
          ],
        },
        {
          question: "Deux petits carrés sont dessinés sur un quadrilatère. Que sait-on ?",
          bonne: "deux de ses angles sont droits",
          pieges: [
            "ses quatre angles sont droits",
            "c'est forcément un carré",
            "ses côtés sont tous égaux",
          ],
        },
      ] as const);
      return {
        text: cas.question,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.pieges),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un codage affirme exactement ce qu'il montre — ni plus, ni moins.",
          "On lit ce que dit le codage, et on se garde d'en déduire davantage.",
          `Ici, on sait seulement que ${cas.bonne}. Tout le reste demanderait d'autres codages ou d'autres informations.`,
          `On sait que ${cas.bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_SEGMENTS_CODAGE — les traits des longueurs égales
     Deux côtés sont égaux quand ils portent le MÊME nombre
     de traits, pas dès qu'ils en portent.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_segments_codage_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_segments_codage",
    difficulty: 2,
    theme: "neutral",
    text: "Deux côtés d'une figure portent chacun un petit trait. Que veut dire ce codage ?",
    format: "qcm",
    choices: [
      "ces deux côtés ont la même longueur",
      "ces deux côtés sont droits",
      "ces deux côtés forment un angle droit",
      "ces deux côtés sont à mesurer",
    ],
    expected: ["ces deux côtés ont la même longueur"],
    comparator: "mcq_exact",
    hint: "C'est un message sur les LONGUEURS.",
    explanation: exp(
      "Les petits traits sur les côtés codent l'égalité des longueurs.",
      "On regroupe les côtés qui portent le même codage.",
      "Deux côtés marqués du même trait ont la même longueur, même si le dessin les fait paraître différents. Le petit carré, lui, parle des angles ; ce codage-ci parle des côtés.",
      "Ces deux côtés ont la même longueur.",
    ),
    tags: ["ce2", "droites_angles", "segments_codage", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_segments_codage_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_segments_codage",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un quadrilatère, deux côtés portent UN trait et les deux autres portent DEUX traits. Les quatre côtés sont-ils égaux ?",
    format: "qcm",
    choices: [
      "non, ils sont égaux deux par deux",
      "oui, tous les quatre",
      "non, aucun n'est égal à un autre",
      "on ne peut pas savoir",
    ],
    expected: ["non, ils sont égaux deux par deux"],
    comparator: "mcq_exact",
    hint: "Un trait et deux traits, est-ce le même message ?",
    explanation: exp(
      "Deux côtés sont égaux quand ils portent le MÊME nombre de traits.",
      "On range les côtés par codage : ceux à un trait ensemble, ceux à deux traits ensemble.",
      "Les deux côtés à un trait sont égaux entre eux, et les deux côtés à deux traits sont égaux entre eux — mais les deux groupes n'ont pas la même longueur. C'est exactement le codage d'un rectangle.",
      "Non : ils sont égaux deux par deux.",
    ),
    tags: ["ce2", "droites_angles", "segments_codage", "piege", "qcm", "canvas"],
    canvas: rectangleCode(),
  },
  {
    kind: "fixed",
    id: "ce2_segments_codage_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_segments_codage",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une figure, le côté AB mesure 6 cm. Le côté CD porte le même codage que AB. Combien mesure CD ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Même codage veut dire même longueur.",
    explanation: exp(
      "Deux côtés portant le même codage ont la même longueur.",
      "On lit la longueur connue et on la reporte sur l'autre côté.",
      "AB mesure 6 cm et CD porte le même codage : CD mesure donc 6 cm. Pas besoin de sortir la règle.",
      "CD mesure 6 cm.",
    ),
    tags: ["ce2", "droites_angles", "segments_codage"],
  },
  {
    kind: "template",
    id: "ce2_segments_codage_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_segments_codage",
    difficulty: 3,
    theme: "neutral",
    hint: "Même codage, même longueur.",
    tags: ["ce2", "droites_angles", "segments_codage", "template"],
    generate: () => {
      const mesure = randomInt(3, 14);
      const paire = randomChoice([
        { connu: "AB", cherche: "CD" },
        { connu: "BC", cherche: "DA" },
        { connu: "AD", cherche: "BC" },
      ]);
      return {
        text: `Sur une figure, ${paire.connu} mesure ${mesure} cm et ${paire.cherche} porte le même codage. Combien mesure ${paire.cherche} ?`,
        format: "short",
        expected: [String(mesure)],
        comparator: "number_equal",
        explanation: exp(
          "Deux côtés portant le même codage ont la même longueur.",
          "On reporte la longueur connue sur le côté qui porte le même marquage.",
          `${paire.connu} mesure ${mesure} cm, donc ${paire.cherche} aussi : ${mesure} cm. Le codage remplace la mesure.`,
          `${paire.cherche} mesure ${mesure} cm.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_segments_codage_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_segments_codage",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien de groupes de côtés le codage forme-t-il ?",
    tags: ["ce2", "droites_angles", "segments_codage", "piege", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          desc: "les quatre côtés portent un seul et même trait",
          bonne: "les quatre côtés sont égaux",
          pourquoi: "un seul codage pour les quatre : ils forment un seul groupe",
        },
        {
          desc: "deux côtés portent un trait, les deux autres en portent deux",
          bonne: "les côtés sont égaux deux par deux",
          pourquoi: "deux codages différents : deux groupes de deux",
        },
        {
          desc: "aucun côté ne porte de trait",
          bonne: "rien n'est affirmé sur les longueurs",
          pourquoi: "sans codage, rien n'est annoncé — il faudrait mesurer",
        },
      ] as const);
      return {
        text: `Sur un quadrilatère, ${cas.desc}. Que sait-on des longueurs ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "les quatre côtés sont égaux",
          "les côtés sont égaux deux par deux",
          "rien n'est affirmé sur les longueurs",
          "tous les côtés sont différents",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux côtés sont égaux quand ils portent le même nombre de traits ; des codages différents annoncent des longueurs différentes.",
          "On range les côtés par codage et on compte les groupes.",
          `Ici, ${cas.pourquoi}.`,
          `On sait que ${cas.bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_DROITE_PERPENDICULAIRE — dans une figure
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_droite_perpendiculaire_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_perpendiculaire",
    difficulty: 2,
    theme: "neutral",
    text: "Deux droites sont perpendiculaires quand...",
    format: "qcm",
    choices: [
      "elles se coupent en formant un angle droit",
      "elles ne se rencontrent jamais",
      "elles ont la même longueur",
      "elles sont toutes les deux horizontales",
    ],
    expected: ["elles se coupent en formant un angle droit"],
    comparator: "mcq_exact",
    hint: "Perpendiculaire, c'est l'angle droit entre deux traits.",
    explanation: exp(
      "Deux droites perpendiculaires se croisent en formant un angle droit.",
      "On cherche le point de croisement, puis on y présente l'équerre.",
      "Il faut les deux : qu'elles se coupent, ET que l'angle soit droit. Deux droites qui se croisent de travers ne sont pas perpendiculaires.",
      "Elles se coupent en formant un angle droit.",
    ),
    tags: ["ce2", "droites_angles", "perpendiculaire", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_droite_perpendiculaire_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_perpendiculaire",
    difficulty: 4,
    theme: "neutral",
    text: "Dans le rectangle ABCD, les côtés AB et CD sont-ils perpendiculaires ?",
    format: "qcm",
    choices: [
      "non, ils se font face et ne se rencontrent pas",
      "oui, comme tous les côtés d'un rectangle",
      "oui, ils forment un angle droit",
      "on ne peut pas savoir",
    ],
    expected: ["non, ils se font face et ne se rencontrent pas"],
    comparator: "mcq_exact",
    hint: "Regarde où sont AB et CD : se touchent-ils quelque part ?",
    explanation: exp(
      "Deux droites perpendiculaires doivent se couper : sans croisement, il n'y a pas d'angle.",
      "On repère les deux côtés sur la figure et on regarde s'ils se rejoignent.",
      "AB et CD sont les deux côtés opposés du rectangle : ils se font face et ne se touchent jamais. Ce sont AB et BC, qui se rejoignent au sommet B, qui sont perpendiculaires.",
      "Non, AB et CD ne sont pas perpendiculaires.",
    ),
    tags: ["ce2", "droites_angles", "perpendiculaire", "piege", "qcm", "canvas"],
    canvas: rectangleCode(),
  },
  {
    kind: "fixed",
    id: "ce2_droite_perpendiculaire_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_perpendiculaire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le rectangle ABCD, quel côté est perpendiculaire à AB ?",
    format: "qcm",
    choices: ["BC", "CD", "aucun", "les trois autres"],
    expected: ["BC"],
    comparator: "mcq_exact",
    hint: "Cherche le côté qui rejoint AB en un sommet.",
    explanation: exp(
      "Deux côtés d'une figure sont perpendiculaires s'ils se rejoignent en formant un angle droit.",
      "On cherche les côtés qui partagent un sommet avec AB.",
      "AB rejoint BC au sommet B, et l'angle y est droit : AB et BC sont perpendiculaires. CD, lui, se trouve en face de AB et ne le touche pas.",
      "C'est BC.",
    ),
    tags: ["ce2", "droites_angles", "perpendiculaire", "qcm", "canvas"],
    canvas: rectangleCode(),
  },
  {
    kind: "template",
    id: "ce2_droite_perpendiculaire_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_perpendiculaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux côtés perpendiculaires se rejoignent en un sommet.",
    tags: ["ce2", "droites_angles", "perpendiculaire", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        { cote: "AB", voisin: "BC", oppose: "CD" },
        { cote: "BC", voisin: "CD", oppose: "AD" },
        { cote: "CD", voisin: "AD", oppose: "AB" },
        { cote: "AD", voisin: "AB", oppose: "BC" },
      ]);
      return {
        text: `Dans le rectangle ABCD, quel côté est perpendiculaire à ${cas.cote} ?`,
        format: "qcm",
        choices: makeChoices(cas.voisin, [
          cas.oppose,
          cas.cote,
          "aucun côté",
          "les trois autres",
        ]),
        expected: [cas.voisin],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux côtés sont perpendiculaires s'ils se rejoignent en formant un angle droit.",
          "On cherche le côté qui partage un sommet avec celui de la question.",
          `${cas.cote} rejoint ${cas.voisin} en un sommet du rectangle, et l'angle y est droit. ${cas.oppose} se trouve en face : il ne touche jamais ${cas.cote}.`,
          `C'est ${cas.voisin}.`,
        ),
        canvas: rectangleCode(),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_droite_perpendiculaire_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_perpendiculaire",
    difficulty: 4,
    theme: "neutral",
    hint: "Il faut les DEUX : qu'elles se coupent, et que l'angle soit droit.",
    tags: ["ce2", "droites_angles", "perpendiculaire", "template", "canvas"],
    generate: () => {
      const droit = randomChoice([true, false]);
      const bonne = droit
        ? "oui, elles se coupent en formant un angle droit"
        : "non, elles se coupent mais l'angle n'est pas droit";
      return {
        text: "Ces deux droites sont-elles perpendiculaires ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          "oui, elles se coupent en formant un angle droit",
          "non, elles se coupent mais l'angle n'est pas droit",
          "non, elles ne se coupent pas",
          "oui, parce qu'elles sont penchées pareil",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux droites sont perpendiculaires si elles se coupent ET si l'angle du croisement est droit.",
          "On vérifie les deux conditions dans l'ordre : le croisement, puis l'équerre.",
          droit
            ? "Elles se croisent, et l'équerre se loge exactement dans l'angle : elles sont perpendiculaires."
            : "Elles se croisent bien, mais l'équerre ne se loge pas dans l'angle : se couper ne suffit pas.",
          bonne.charAt(0).toUpperCase() + bonne.slice(1) + ".",
        ),
        canvas: deuxDroites(droit, false),
      };
    },
  },

  /* =========================================================
     CE2_DROITE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_droite_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un quadrilatère porte quatre petits carrés d'angle droit, et ses quatre côtés portent tous le MÊME trait. Quelle figure est-ce ?",
    format: "qcm",
    choices: ["un carré", "un rectangle", "un losange", "un triangle rectangle"],
    expected: ["un carré"],
    comparator: "mcq_exact",
    hint: "Lis les deux codages l'un après l'autre : les angles, puis les côtés.",
    explanation: exp(
      "Les codages se lisent ensemble : chacun apporte une information, et on les cumule.",
      "On traduit le premier codage, puis le second, et on cherche la figure qui satisfait les deux.",
      "Quatre petits carrés : les quatre angles sont droits. Le même trait sur les quatre côtés : les quatre côtés sont égaux. Une figure qui a les deux, c'est un carré. Un rectangle n'aurait pas les quatre côtés au même codage.",
      "C'est un carré.",
    ),
    tags: ["ce2", "droites_angles", "defi", "codage", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_droite_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois élèves regardent trois points. Léa dit « ils ont l'air alignés ». Kevin pose sa règle et voit un espace au niveau du point du milieu. Malia dit « alors ils ne le sont pas ». Qui a tranché ?",
    format: "qcm",
    choices: [
      "Kevin, parce qu'il a utilisé un instrument",
      "Léa, parce qu'elle a bien regardé",
      "Malia, parce qu'elle a conclu",
      "personne, il faut mesurer",
    ],
    expected: ["Kevin, parce qu'il a utilisé un instrument"],
    comparator: "mcq_exact",
    hint: "Qui a apporté une preuve, et pas seulement une impression ?",
    explanation: exp(
      "En géométrie, une impression ne prouve rien : c'est l'instrument qui tranche.",
      "On repère qui a apporté une observation vérifiable.",
      "Léa a donné une impression, Malia a tiré la conclusion — mais c'est Kevin qui a apporté la preuve, en posant la règle. Sans son geste, personne ne pouvait savoir.",
      "C'est Kevin qui a tranché.",
    ),
    tags: ["ce2", "droites_angles", "defi", "alignement", "qcm", "canvas"],
    canvas: troisPoints(false),
  },
  {
    kind: "template",
    id: "ce2_droite_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Traduis chaque codage, puis cherche la figure qui a les deux.",
    tags: ["ce2", "droites_angles", "defi", "codage", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          codage: "quatre petits carrés d'angle droit, et les quatre côtés au même trait",
          bonne: "un carré",
        },
        {
          codage: "quatre petits carrés d'angle droit, et les côtés égaux deux par deux",
          bonne: "un rectangle",
        },
        {
          codage: "aucun petit carré, et les quatre côtés au même trait",
          bonne: "un losange",
        },
        {
          codage: "un seul petit carré, sur une figure à trois côtés",
          bonne: "un triangle rectangle",
        },
      ] as const);
      return {
        text: `Une figure porte ${cas.codage}. Laquelle est-ce ?`,
        format: "qcm",
        choices: makeChoices(cas.bonne, [
          "un carré",
          "un rectangle",
          "un losange",
          "un triangle rectangle",
        ]),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Les codages se cumulent : les petits carrés parlent des angles, les traits parlent des longueurs.",
          "On traduit chaque codage séparément, puis on cherche la figure qui satisfait les deux.",
          `Le codage annonce ${cas.codage} : la seule figure qui répond aux deux conditions est ${cas.bonne}.`,
          `C'est ${cas.bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_droite_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "droites_angles",
    microId: "ce2_droite_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le codage donne une longueur sans qu'on ait à mesurer.",
    tags: ["ce2", "droites_angles", "defi", "codage", "template"],
    generate: () => {
      const longueur = randomInt(5, 15);
      const largeur = randomInt(2, 4);
      const tour = 2 * (longueur + largeur);
      return {
        text: `Dans un rectangle, deux côtés opposés portent un trait et mesurent ${longueur} cm ; les deux autres portent deux traits et mesurent ${largeur} cm. Quelle est la longueur du tour de la figure, en cm ?`,
        format: "short",
        expected: [String(tour)],
        comparator: "number_equal",
        explanation: exp(
          "Le codage donne les quatre longueurs sans qu'on ait besoin de mesurer : deux côtés à un trait, deux côtés à deux traits.",
          "On additionne les quatre côtés, en se servant du codage pour connaître ceux qui ne sont pas notés.",
          `Deux côtés font ${longueur} cm et deux côtés font ${largeur} cm : ${longueur} + ${longueur} + ${largeur} + ${largeur} = ${tour}.`,
          `Le tour mesure ${tour} cm.`,
        ),
      };
    },
  },
];
