// lib/tutor-v4/questionBank/4e/maths/triangles.bank.ts
//
// ⭐ NOTION OUVERTE LE 28/08/2026 : `triangle_figure`. Elle ferme SIX puces du BO
// d'un coup — somme des angles, hauteurs et médiatrices, inégalité
// triangulaire, CAS D'ÉGALITÉ, triangles semblables, protocole de construction.
//
// ⭐ ET C'EST UN SEUL OBJET PARCE QUE LE PROGRAMME LE DIT : sa puce « Triangle »
// porte les cinq premiers points en sous-puces d'une même ligne. La notion suit
// le BO, elle ne le redécoupe pas.
//
// ⭐⭐ LES CAS D'ÉGALITÉ SONT LA PUCE QUE L'EXTRACTION AUTOMATIQUE DU PDF
// PERDAIT, dans les DEUX fichiers testés le 27/08 — seule une capture d'écran
// l'a rendue lisible. Elle est bien au programme du cycle 4, et la compétence
// 4e-D-geometrie-12 le confirme en demandant de la relier à la construction.
//
// ⭐ TROIS MICROS RÉACTIVENT LA 5e avec ses identifiants exacts
// (`triangle_inegalite`, `triangle_somme_angle`, `triangle_construire`), et la
// troisième est ÉTENDUE : le BO de 4e ne demande plus de construire mais
// d'ÉCRIRE UN PROTOCOLE. Une construction ne se rend pas en QCM ; un protocole
// s'écrit, se lit et se compare — c'est lui qu'on interroge.
//
// ⭐ LE CANVAS `triangle` PORTE LA NOTION, et ses champs tombent juste :
//   · `marks.equalSides` et `marks.equalAngles` → le CODAGE des égalités, qui
//     est exactement la donnée d'un cas d'égalité ;
//   · `height` → la hauteur tracée en pointillés AVEC sa marque d'angle droit,
//     y compris quand son pied tombe hors du segment ;
//   · `angleLabels` et `sideLabels` → la somme des angles et l'inégalité.
// ⚠️ C'est un canvas à POINTS FIXES : il tient dans la zone large du coach, il
// rognerait dans une carte de fiche.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS
// PARTICULIÈRES : l'énoncé des trois cas d'égalité, et le contre-exemple du
// triangle plat où l'inégalité devient une égalité.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { TriangleCanvasData } from "@/lib/tutor-v4/types_canvas";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/**
 * Un triangle quelconque, assez ouvert pour que les marques restent lisibles.
 *
 * ⭐⭐ LA LARGEUR EST 240, ET C'EST MESURÉ, PAS CHOISI. `TriangleCanvas` enferme
 * son SVG dans un `max-w-[240px]` : le dessin ne dépasse JAMAIS 240 px, ni dans
 * le coach, ni dans une fiche. Or le `viewBox` vaut `size`, donc un viewBox de
 * 320 se rendait à l'échelle 0,75 — et l'étiquette « hauteur », écrite en 13,
 * s'affichait à 9,8 px, SOUS LE PLANCHER DE 11 px.
 * 👉 En posant le viewBox à 240, l'échelle vaut 1 et les libellés sortent à
 * leur taille nominale : 13, 15, 16 et 18 px. Les points ont été divisés par
 * 0,75, donc la FIGURE est identique — seuls les textes ont grandi.
 * ⚠️ Corollaire à ne pas oublier : ce canvas n'a pas de « zone large du coach ».
 * Ce qui est illisible ici l'est partout.
 */
function triangle(data: Partial<TriangleCanvasData> = {}): TriangleCanvasData {
  return {
    kind: "triangle",
    points: { A: { x: 30, y: 150 }, B: { x: 210, y: 150 }, C: { x: 112, y: 38 } },
    display: { showPoints: true, showLabels: true, showSides: true },
    size: { width: 240, height: 180 },
    ...data,
  } as TriangleCanvasData;
}

export const trianglesBank: TutorBankItemV4[] = [
  /* =========================================================================
     TRIANGLE_INEGALITE — réactivation 5e, énoncés de 4e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_triangle_inegalite_tpl_1_constructible",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_inegalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare le plus grand côté à la somme des deux autres.",
    tags: ["triangle", "inegalite", "qcm", "template"],
    generate: () => {
      const possible = Math.random() < 0.5;
      const a = randomInt(3, 9);
      const b = randomInt(4, 10);
      const c = possible ? randomInt(Math.abs(a - b) + 1, a + b - 1) : a + b + randomInt(1, 4);
      const correct = possible ? "oui, il est constructible" : "non, il est impossible";
      return {
        text: `Peut-on construire un triangle de côtés ${a} cm, ${b} cm et ${c} cm ?`,
        format: "qcm",
        choices: shuffle(["oui, il est constructible", "non, il est impossible"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans un triangle, la longueur du plus grand côté est TOUJOURS inférieure à la somme des deux autres.\n\n" +
          "Méthode : on repère le plus grand côté, puis on additionne les deux autres.\n\n" +
          (possible
            ? `Calcul : le plus grand vaut ${Math.max(a, b, c)}, et les deux autres font ${a + b + c - Math.max(a, b, c)}. Or ${Math.max(a, b, c)} < ${a + b + c - Math.max(a, b, c)}.\n\n`
            : `Calcul : le plus grand vaut ${c}, et les deux autres font ${a + b}. Or ${c} > ${a + b} : le chemin par le sommet serait plus court que le côté direct.\n\n`) +
          `Conclusion : ⭐ c'est la même idée que « le chemin le plus court est la ligne droite » — passer par un troisième point rallonge toujours.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_triangle_inegalite_tpl_2_troisieme_cote",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_inegalite",
    difficulty: 4,
    theme: "neutral",
    hint: "Le troisième côté est encadré par la différence et la somme.",
    tags: ["triangle", "inegalite", "encadrer", "qcm", "template", "canvas"],
    generate: () => {
      const a = randomInt(4, 9);
      const b = randomInt(a + 1, a + 6);
      const correct = `entre ${b - a} et ${a + b} cm`;
      return {
        text: `Un triangle a deux côtés de ${a} cm et ${b} cm. Entre quelles valeurs se situe le troisième ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `entre 0 et ${a + b} cm`,
          `entre ${a} et ${b} cm`,
          `entre ${b - a} et ${b} cm`,
          `entre ${a + b} et ${a * b} cm`,
          `n'importe quelle valeur`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'inégalité triangulaire encadre le troisième côté par les DEUX bouts.\n\n" +
          "Méthode : il doit être plus petit que la somme, et plus grand que la différence.\n\n" +
          `Calcul : ${a} + ${b} = ${a + b} pour la borne haute, et ${b} − ${a} = ${b - a} pour la borne basse.\n\n` +
          `Conclusion : ⚠️ oublier la borne BASSE est l'erreur fréquente — un côté de 1 cm avec ${a} et ${b} ne referme pas le triangle.`,
        canvas: triangle({
          sideLabels: { AB: `${b} cm`, CA: `${a} cm`, BC: "?" },
        }),
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : le triangle PLAT, où l'inégalité devient une
    // égalité. C'est le cas limite, et il ne se génère pas — il se retient.
    kind: "fixed",
    id: "4e_triangle_inegalite_fixed_plat",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_inegalite",
    difficulty: 3,
    theme: "neutral",
    text: "Que se passe-t-il si un côté vaut exactement la somme des deux autres, par exemple 3 cm, 5 cm et 8 cm ?",
    format: "qcm",
    choices: [
      "les trois points sont alignés : le triangle est plat",
      "le triangle est rectangle",
      "le triangle est isocèle",
      "le triangle est normal, juste très allongé",
    ],
    expected: ["les trois points sont alignés : le triangle est plat"],
    comparator: "mcq_exact",
    hint: "Que reste-t-il quand le chemin par le sommet ne rallonge plus ?",
    explanation:
      "Définition : un triangle existe quand le plus grand côté est STRICTEMENT inférieur à la somme des deux autres.\n\n" +
      "Méthode : on regarde le cas d'égalité, qui est la frontière.\n\n" +
      "Calcul : 3 + 5 = 8, exactement. Le chemin par le troisième sommet ne rallonge donc plus rien.\n\n" +
      "Conclusion : ⭐ les trois points sont alignés — c'est le cas limite, appelé triangle plat, et ce n'est plus vraiment un triangle. L'inégalité est STRICTE.",
    tags: ["triangle", "inegalite", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     TRIANGLE_SOMME_ANGLE — réactivation, et l'outil de la démonstration
  ========================================================================= */
  {
    kind: "template",
    id: "4e_triangle_somme_angle_tpl_1_manquant",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 2,
    theme: "neutral",
    hint: "Les trois angles font 180° en tout.",
    tags: ["triangle", "angle", "template", "canvas"],
    generate: () => {
      const a = randomInt(25, 80);
      const b = randomInt(25, 170 - a);
      const c = 180 - a - b;
      return {
        text: `Dans un triangle, deux angles mesurent ${a}° et ${b}°. Combien mesure le troisième ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          "Définition : la somme des trois angles d'un triangle vaut toujours 180°.\n\n" +
          "Méthode : on additionne les deux angles connus, puis on retire de 180.\n\n" +
          `Calcul : ${a} + ${b} = ${a + b}, et 180 − ${a + b} = ${c}°.\n\n` +
          `Conclusion : ⭐ cette propriété se DÉMONTRE avec les angles alternes internes — on trace la parallèle à un côté passant par le sommet opposé.`,
        canvas: triangle({
          display: { showPoints: true, showLabels: true, showSides: false, showAngles: true },
          angleLabels: { A: `${a}°`, B: `${b}°`, C: "?" },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_triangle_somme_angle_tpl_2_impossible",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les trois : que doit valoir le total ?",
    tags: ["triangle", "angle", "piege", "qcm", "template"],
    generate: () => {
      const juste = Math.random() < 0.5;
      const a = randomInt(30, 70);
      const b = randomInt(30, 70);
      const c = juste ? 180 - a - b : 180 - a - b + randomChoice([-15, -10, 10, 20]);
      const correct = juste ? "oui, ce triangle peut exister" : "non, c'est impossible";
      return {
        text: `Un élève annonce un triangle dont les angles mesurent ${a}°, ${b}° et ${c}°. Est-ce possible ?`,
        format: "qcm",
        choices: shuffle(["oui, ce triangle peut exister", "non, c'est impossible"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la somme des angles d'un triangle vaut exactement 180°, jamais plus, jamais moins.\n\n" +
          "Méthode : on additionne les trois et on compare à 180.\n\n" +
          `Calcul : ${a} + ${b} + ${c} = ${a + b + c}°.\n\n` +
          (juste
            ? "Conclusion : la somme tombe juste, le triangle peut exister.\n"
            : `Conclusion : la somme fait ${a + b + c}° au lieu de 180 — aucun triangle ne peut avoir ces angles. ⭐ Ce contrôle vaut avant tout calcul.`),
      };
    },
  },

  /* =========================================================================
     TRIANGLE_DROITES — hauteurs et médiatrices, avec le canvas qui les trace
  ========================================================================= */
  {
    kind: "template",
    id: "4e_triangle_droites_tpl_1_hauteur",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_droites",
    difficulty: 3,
    theme: "neutral",
    hint: "Une hauteur part d'un sommet et tombe PERPENDICULAIREMENT sur le côté opposé.",
    tags: ["triangle", "hauteur", "qcm", "template", "canvas"],
    generate: () => {
      const sommet = randomChoice(["A", "B", "C"] as const);
      const oppose = sommet === "A" ? "[BC]" : sommet === "B" ? "[AC]" : "[AB]";
      const correct = `du sommet ${sommet}, perpendiculairement à ${oppose}`;
      return {
        text: `Dans le triangle ABC, où passe la hauteur issue de ${sommet} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `du sommet ${sommet}, jusqu'au milieu de ${oppose}`,
          `du milieu de ${oppose}, perpendiculairement à ${oppose}`,
          `du sommet ${sommet}, jusqu'au sommet le plus proche`,
          `parallèlement à ${oppose}`,
          `du sommet ${sommet}, en partageant l'angle en deux`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la hauteur issue d'un sommet est la droite qui passe par ce sommet et qui est PERPENDICULAIRE au côté opposé.\n\n" +
          "Méthode : deux conditions, et il faut les deux — passer par le sommet, et faire un angle droit avec le côté opposé.\n\n" +
          `Calcul : la hauteur issue de ${sommet} coupe donc ${oppose} à angle droit.\n\n` +
          `Conclusion : ⚠️ à ne pas confondre avec la MÉDIANE, qui va au milieu du côté opposé, ni avec la MÉDIATRICE, qui est perpendiculaire au côté mais passe par son milieu — pas par le sommet.`,
        canvas: triangle({
          height: { fromVertex: sommet, label: "hauteur", baseLabel: oppose },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_triangle_droites_tpl_2_distinguer",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_droites",
    difficulty: 4,
    theme: "neutral",
    hint: "Chacune se définit par DEUX conditions : par où elle passe, et comment.",
    tags: ["triangle", "hauteur", "mediatrice", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          nom: "la hauteur issue de A",
          def: "passe par A et coupe [BC] à angle droit",
          faux: [
            "passe par le milieu de [BC] et coupe [BC] à angle droit",
            "passe par A et par le milieu de [BC]",
            "partage l'angle en A en deux angles égaux",
          ],
        },
        {
          nom: "la médiatrice de [BC]",
          def: "passe par le milieu de [BC] et coupe [BC] à angle droit",
          faux: [
            "passe par A et coupe [BC] à angle droit",
            "passe par A et par le milieu de [BC]",
            "est parallèle à [BC]",
          ],
        },
        {
          nom: "la médiane issue de A",
          def: "passe par A et par le milieu de [BC]",
          faux: [
            "passe par A et coupe [BC] à angle droit",
            "passe par le milieu de [BC] et coupe [BC] à angle droit",
            "partage le triangle en deux triangles semblables",
          ],
        },
      ]);
      return {
        text: `Dans le triangle ABC, qu'est-ce que ${cas.nom} ?`,
        format: "qcm",
        choices: makeChoices(cas.def, [
          ...cas.faux,
          "coupe le triangle en deux parts de même aire",
          "passe par les trois sommets",
        ]),
        expected: [cas.def],
        comparator: "mcq_exact",
        explanation:
          "Définition : chacune de ces droites se définit par DEUX conditions, et c'est en oubliant l'une des deux qu'on les confond.\n\n" +
          "Méthode : on se demande par où elle PASSE, puis COMMENT elle coupe.\n\n" +
          `Calcul : ${cas.nom} ${cas.def}.\n\n` +
          "Conclusion : ⭐ la hauteur part d'un SOMMET, la médiatrice part d'un MILIEU. Les deux sont perpendiculaires au côté, et c'est ce qu'elles ont en commun qui les fait confondre.",
      };
    },
  },

  /* =========================================================================
     TRIANGLE_EGALITE — ⭐⭐ la puce que l'extraction PDF perdait
  ========================================================================= */
  {
    // ⭐ VALEUR PARTICULIÈRE : l'énoncé des trois cas. C'est la connaissance du
    // chapitre, et elle se retient — elle ne se génère pas.
    kind: "fixed",
    id: "4e_triangle_egalite_fixed_trois_cas",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_egalite",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de données suffisent à garantir que deux triangles sont égaux ?",
    format: "qcm",
    choices: [
      "trois, bien choisies",
      "deux suffisent toujours",
      "il en faut six : trois côtés et trois angles",
      "trois angles suffisent",
    ],
    expected: ["trois, bien choisies"],
    comparator: "mcq_exact",
    hint: "Combien de mesures faut-il pour construire un triangle ?",
    explanation:
      "Définition : deux triangles sont ÉGAUX quand ils sont superposables — mêmes côtés, mêmes angles.\n\n" +
      "Méthode : il suffit de trois données BIEN CHOISIES, et il y a exactement trois cas.\n\n" +
      "Calcul : les trois côtés ; deux côtés et l'angle ENTRE eux ; un côté et les deux angles qui le touchent.\n\n" +
      "Conclusion : ⚠️ trois ANGLES ne suffisent PAS — ils donnent des triangles de même forme mais de tailles différentes. Ceux-là sont SEMBLABLES, pas égaux.",
    tags: ["triangle", "egalite", "valeur_particuliere", "qcm"],
  },
  {
    kind: "template",
    id: "4e_triangle_egalite_tpl_1_reconnaitre_cas",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_egalite",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde ce qui est donné : des côtés, des angles, ou un mélange.",
    tags: ["triangle", "egalite", "qcm", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        {
          donnees: "les trois côtés deux à deux égaux",
          nom: "les trois côtés",
          suffit: true,
        },
        {
          donnees: "deux côtés égaux et l'angle compris entre eux",
          nom: "deux côtés et l'angle entre eux",
          suffit: true,
        },
        {
          donnees: "un côté égal et les deux angles qui le touchent",
          nom: "un côté et ses deux angles",
          suffit: true,
        },
        {
          donnees: "les trois angles deux à deux égaux",
          nom: "les trois angles",
          suffit: false,
        },
      ]);
      const correct = cas.suffit
        ? "oui : c'est un cas d'égalité"
        : "non : ils sont seulement semblables";
      return {
        text: `Deux triangles ont ${cas.donnees}. Sont-ils forcément égaux ?`,
        format: "qcm",
        choices: shuffle([
          "oui : c'est un cas d'égalité",
          "non : ils sont seulement semblables",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux triangles sont égaux quand ils sont superposables. Trois cas le garantissent — les trois côtés, deux côtés et l'angle entre eux, un côté et ses deux angles.\n\n" +
          `Méthode : on regarde si les données sont l'un de ces trois cas.\n\n` +
          `Calcul : ici on donne ${cas.nom}.\n\n` +
          (cas.suffit
            ? "Conclusion : c'est bien un cas d'égalité, les deux triangles sont superposables."
            : "Conclusion : ⚠️ trois angles fixent la FORME mais pas la TAILLE. Les triangles sont semblables — l'un est un agrandissement de l'autre."),
        canvas: triangle({
          marks: cas.suffit
            ? { equalSides: [["AB", "CA"] as ["AB", "CA"]], equalAngles: [["B", "C"] as ["B", "C"]] }
            : { equalAngles: [["A", "B"] as ["A", "B"]] },
          display: { showPoints: true, showLabels: true, showSides: true, showAngles: true },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "4e_triangle_egalite_tpl_2_deduire",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_egalite",
    difficulty: 5,
    theme: "neutral",
    hint: "Si les triangles sont égaux, TOUTES leurs mesures se correspondent.",
    tags: ["triangle", "egalite", "deduire", "template"],
    generate: () => {
      const cote = randomInt(4, 12);
      const angle = randomInt(30, 80);
      return {
        text: `Les triangles ABC et DEF sont égaux. Dans ABC, le côté [AB] mesure ${cote} cm et l'angle en A mesure ${angle}°. Combien mesure le côté [DE] ?`,
        format: "short",
        expected: [String(cote)],
        comparator: "number_equal",
        explanation:
          "Définition : deux triangles égaux sont superposables — chaque côté correspond à un côté, chaque angle à un angle.\n\n" +
          "Méthode : on suit l'ORDRE des lettres. Dans « ABC égal à DEF », A correspond à D, B à E, C à F.\n\n" +
          `Calcul : [AB] correspond donc à [DE], et [DE] mesure ${cote} cm. De même, l'angle en D mesure ${angle}°.\n\n` +
          "Conclusion : ⭐ c'est tout l'intérêt des cas d'égalité — trois données suffisent à en déduire les six.",
      };
    },
  },

  /* =========================================================================
     TRIANGLE_CONSTRUIRE — le PROTOCOLE, pas la construction
  ========================================================================= */
  {
    kind: "template",
    id: "4e_triangle_construire_tpl_1_protocole",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Par quoi commence-t-on toujours ? Par ce qu'on peut tracer sans rien chercher.",
    tags: ["triangle", "construire", "protocole", "qcm", "template"],
    generate: () => {
      const a = randomInt(5, 9);
      const b = randomInt(4, 8);
      const c = randomInt(Math.abs(a - b) + 1, a + b - 1);
      const correct = `tracer [AB] de ${a} cm`;
      return {
        text: `On veut construire un triangle ABC avec AB = ${a} cm, AC = ${b} cm et BC = ${c} cm. Par quoi commence le protocole ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `tracer les trois côtés en même temps`,
          `placer le point C d'abord`,
          `mesurer les angles`,
          `tracer un cercle de ${b} cm de rayon`,
          `vérifier que les angles font 180°`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un protocole de construction est une suite d'instructions qu'une autre personne doit pouvoir suivre sans rien deviner.\n\n" +
          "Méthode : on commence par ce qui se trace SANS RIEN CHERCHER — un segment de longueur donnée.\n\n" +
          `Calcul : on trace [AB] de ${a} cm. Puis on trace le cercle de centre A et de rayon ${b} cm, celui de centre B et de rayon ${c} cm : le point C est à leur intersection.\n\n` +
          `Conclusion : ⭐ ce protocole donne TOUJOURS le même triangle, parce que les trois côtés sont un cas d'égalité. C'est le lien que le BO demande entre construction et cas d'égalité.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_triangle_construire_tpl_2_donnees_suffisantes",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 5,
    theme: "neutral",
    hint: "Un protocole qui laisse le choix ne décrit pas UN triangle.",
    tags: ["triangle", "construire", "egalite", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { d: "les trois côtés", unique: true },
        { d: "deux côtés et l'angle entre eux", unique: true },
        { d: "un côté et les deux angles qui le touchent", unique: true },
        { d: "les trois angles", unique: false },
        { d: "un seul côté et un seul angle", unique: false },
      ]);
      const correct = cas.unique
        ? "oui : le triangle obtenu est toujours le même"
        : "non : plusieurs triangles différents conviennent";
      return {
        text: `On donne ${cas.d}. Cela suffit-il à construire UN SEUL triangle possible ?`,
        format: "qcm",
        choices: shuffle([
          "oui : le triangle obtenu est toujours le même",
          "non : plusieurs triangles différents conviennent",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les cas d'égalité disent exactement quelles données déterminent un triangle sans ambiguïté.\n\n" +
          "Méthode : on se demande si deux personnes suivant le protocole obtiendraient forcément le même triangle.\n\n" +
          `Calcul : ${cas.d} ${cas.unique ? "est l'un des trois cas d'égalité" : "ne fait partie d'aucun des trois cas"}.\n\n` +
          (cas.unique
            ? "Conclusion : ⭐ construire et démontrer sont donc le même savoir vu des deux côtés — c'est ce que le BO demande de relier."
            : "Conclusion : ⚠️ le protocole laisserait le choix, donc il ne décrit pas UN triangle. Avec trois angles, on obtient une infinité de tailles."),
      };
    },
  },

  /* =========================================================================
     TRIANGLE_SEMBLABLE — la forme sans la taille
  ========================================================================= */
  {
    kind: "template",
    id: "4e_triangle_semblable_tpl_1_reconnaitre",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_semblable",
    difficulty: 4,
    theme: "neutral",
    hint: "Semblables : même forme, taille éventuellement différente.",
    tags: ["triangle", "semblable", "qcm", "template"],
    generate: () => {
      const k = randomChoice([2, 3, 1.5]);
      const a = randomInt(3, 6);
      const b = randomInt(4, 8);
      const c = randomInt(Math.abs(a - b) + 1, a + b - 1);
      const correct = "ils sont semblables, mais pas égaux";
      return {
        text: `Un triangle a pour côtés ${a}, ${b} et ${c} cm. Un second a pour côtés ${a * k}, ${b * k} et ${c * k} cm. Que peut-on dire ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "ils sont égaux",
          "ils n'ont aucun rapport",
          "ils sont égaux, à l'unité près",
          "ils ont les mêmes côtés",
          "le second n'est pas un triangle",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux triangles sont SEMBLABLES quand leurs angles sont deux à deux égaux — autrement dit quand l'un est un agrandissement de l'autre.\n\n" +
          `Méthode : on cherche si tous les côtés ont été multipliés par un MÊME nombre.\n\n` +
          `Calcul : ici chaque côté a été multiplié par ${String(k).replace(".", ",")}, donc les deux triangles ont la même forme.\n\n` +
          "Conclusion : ⚠️ ÉGAUX veut dire superposables ; SEMBLABLES veut dire de même forme. Deux triangles égaux sont semblables, l'inverse est faux.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_triangle_semblable_tpl_2_cote_manquant",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_semblable",
    difficulty: 5,
    theme: "neutral",
    hint: "Trouve d'abord le rapport d'agrandissement.",
    tags: ["triangle", "semblable", "calculer", "template", "canvas"],
    generate: () => {
      const k = randomInt(2, 4);
      const a = randomInt(3, 7);
      const b = randomInt(4, 9);
      return {
        text: `Deux triangles sont semblables. Dans le petit, un côté mesure ${a} cm ; le côté correspondant du grand mesure ${a * k} cm. Un autre côté du petit mesure ${b} cm : combien mesure son correspondant dans le grand ?`,
        format: "short",
        expected: [String(b * k)],
        comparator: "number_equal",
        explanation:
          "Définition : dans deux triangles semblables, tous les côtés sont multipliés par le MÊME rapport.\n\n" +
          "Méthode : on trouve le rapport avec le couple de côtés connu, puis on l'applique.\n\n" +
          `Calcul : ${a * k} ÷ ${a} = ${k}, donc le rapport vaut ${k}. Et ${b} × ${k} = ${b * k} cm.\n\n` +
          `Conclusion : ⭐ c'est exactement l'agrandissement de rapport ${k} — le lien que le BO demande entre la proportionnalité et les configurations géométriques.`,
        canvas: triangle({
          sideLabels: { AB: `${a} cm`, CA: `${b} cm`, BC: "" },
        }),
      };
    },
  },

  /* =========================================================================
     TRIANGLE_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_triangle_defi_tpl_1_egaux_ou_semblables",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Les angles fixent la forme, les côtés fixent la taille.",
    tags: ["triangle", "defi", "egalite", "semblable", "qcm", "template"],
    generate: () => {
      const a = randomInt(35, 70);
      const b = randomInt(40, 175 - a - 20);
      const cote = randomInt(4, 9);
      const memeCote = Math.random() < 0.5;
      const correct = memeCote
        ? "égaux : un côté et ses deux angles suffisent"
        : "semblables seulement : la taille n'est pas fixée";
      return {
        text: `Deux triangles ont chacun un angle de ${a}° et un angle de ${b}°. ${memeCote ? `De plus, le côté entre ces deux angles mesure ${cote} cm dans les deux.` : "Rien n'est dit sur leurs côtés."} Que peut-on affirmer ?`,
        format: "qcm",
        choices: shuffle([
          "égaux : un côté et ses deux angles suffisent",
          "semblables seulement : la taille n'est pas fixée",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les angles fixent la FORME, un côté fixe la TAILLE.\n\n" +
          `Méthode : avec deux angles, le troisième se déduit — ${a} + ${b} = ${a + b}, donc le dernier vaut ${180 - a - b}°. Les formes sont donc identiques dans les deux cas.\n\n` +
          (memeCote
            ? `Calcul : le côté commun de ${cote} cm fixe en plus la taille, et c'est le cas « un côté et les deux angles qui le touchent ».\n\nConclusion : les triangles sont ÉGAUX.`
            : "Calcul : sans aucune longueur, rien ne fixe la taille.\n\nConclusion : ⚠️ ils sont SEMBLABLES, et cela ne suffit pas à les dire égaux — l'un peut être dix fois plus grand."),
      };
    },
  },
  {
    kind: "template",
    id: "4e_triangle_defi_tpl_2_impossible",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux contrôles à faire : les angles, et les côtés.",
    tags: ["triangle", "defi", "controle", "qcm", "template"],
    generate: () => {
      const type = randomChoice(["angles", "cotes", "juste"]);
      const a = randomInt(40, 70);
      const b = randomInt(40, 70);
      const c1 = randomInt(4, 7);
      const c2 = randomInt(5, 8);
      let texte: string;
      let correct: string;
      if (type === "angles") {
        texte = `un triangle dont les angles mesurent ${a}°, ${b}° et ${180 - a - b + 20}°`;
        correct = "impossible : la somme des angles ne fait pas 180°";
      } else if (type === "cotes") {
        texte = `un triangle de côtés ${c1} cm, ${c2} cm et ${c1 + c2 + 2} cm`;
        correct = "impossible : un côté dépasse la somme des deux autres";
      } else {
        texte = `un triangle de côtés ${c1} cm, ${c2} cm et ${c1 + c2 - 1} cm`;
        correct = "possible";
      }
      return {
        text: `Un élève décrit ${texte}. Qu'en penses-tu ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          "possible",
          "impossible : la somme des angles ne fait pas 180°",
          "impossible : un côté dépasse la somme des deux autres",
          "impossible : un triangle ne peut pas avoir deux angles égaux",
          "on ne peut pas savoir sans le dessiner",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux contrôles indépendants existent — la somme des angles vaut 180°, et le plus grand côté est inférieur à la somme des deux autres.\n\n" +
          "Méthode : on applique celui qui correspond aux données fournies.\n\n" +
          (type === "angles"
            ? `Calcul : ${a} + ${b} + ${180 - a - b + 20} = 200°, au lieu de 180.\n\n`
            : type === "cotes"
              ? `Calcul : ${c1 + c2 + 2} > ${c1} + ${c2} = ${c1 + c2}.\n\n`
              : `Calcul : ${c1 + c2 - 1} < ${c1 + c2}, et la somme des angles n'est pas en cause.\n\n`) +
          "Conclusion : ⭐ ces deux contrôles se font AVANT toute construction, et ils coûtent quelques secondes.",
      };
    },
  },
  {
    kind: "template",
    id: "4e_triangle_defi_tpl_3_demontrer",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Quelle propriété permet de conclure à partir de CES données-là ?",
    tags: ["triangle", "defi", "demontrer", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        {
          donnees: "les trois côtés de deux triangles sont deux à deux égaux",
          outil: "le cas d'égalité « les trois côtés »",
        },
        {
          donnees: "deux angles d'un triangle mesurent 50° et 60°",
          outil: "la somme des angles d'un triangle",
        },
        {
          donnees: "les trois angles de deux triangles sont deux à deux égaux",
          outil: "la définition des triangles semblables",
        },
        {
          donnees: "un côté mesure 12 cm et les deux autres 5 cm et 6 cm",
          outil: "l'inégalité triangulaire",
        },
      ]);
      return {
        text: `On sait que ${cas.donnees}. Quelle propriété permet de conclure ?`,
        format: "qcm",
        choices: makeChoices(cas.outil, [
          "le cas d'égalité « les trois côtés »",
          "la somme des angles d'un triangle",
          "la définition des triangles semblables",
          "l'inégalité triangulaire",
          "le théorème de Pythagore",
        ]),
        expected: [cas.outil],
        comparator: "mcq_exact",
        explanation:
          "Définition : démontrer, c'est choisir la propriété qui s'applique AUX DONNÉES qu'on a.\n\n" +
          "Méthode : on regarde ce qui est donné — des côtés, des angles, ou les deux — avant de chercher une propriété.\n\n" +
          `Calcul : ici, ${cas.donnees} appelle ${cas.outil}.\n\n` +
          "Conclusion : ⭐ c'est le geste de la démonstration, et il ne s'apprend qu'en le répétant : les données commandent l'outil, jamais l'inverse.",
      };
    },
  },
];
