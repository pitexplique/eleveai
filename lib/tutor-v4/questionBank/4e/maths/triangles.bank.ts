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
//
// ⛔⛔ 03/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré : 2 à 8
// squelettes d'énoncé par micro, 13 à 18 répétitions sur une série de 20. Chaque
// gabarit compose désormais une SITUATION (voile, pignon, fanion, équerre,
// charpente, régate, refuges, ciel d'été, terrain de football…) × un NOM de
// triangle (ABC, KLM, RST…, que le canvas reprend par `labels`) × une TOURNURE.
// Mesure : scripts/mesurer-squelettes-coach.ts 4e triangle_figure.
// La Réunion reste UN décor parmi vingt.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type {
  TriangleCanvasData,
  TriangleCanvasPointLabel,
  TriangleCanvasSideLabel,
} from "@/lib/tutor-v4/types_canvas";

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

/** 4.5 → « 4,5 ». L'élève lit des nombres français. */
function fr(n: number): string {
  return String(Math.round(n * 100) / 100).replace(".", ",");
}

/** « = » si le quotient tombe juste au centième, « ≈ » sinon. */
const egal = (q: number) => (Math.abs(q * 100 - Math.round(q * 100)) < 1e-9 ? "=" : "≈");

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

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

/* ---------------------------------------------------------------------------
   LES NOMS DE TRIANGLES. Le canvas garde ses clés A, B, C (ses points fixes) et
   AFFICHE les lettres du nom par `labels` : la figure et le texte disent les
   mêmes lettres. Pas de « O » : il sert au centre du cercle circonscrit.
--------------------------------------------------------------------------- */
type K = TriangleCanvasPointLabel;
type Tri = { n: string; A: string; B: string; C: string };

const NOMS = [
  "ABC", "DEF", "EFG", "GHK", "IJK", "KLM", "LMN", "MNP",
  "PQR", "RST", "STU", "UVW", "XYZ", "BCD", "JKL", "RSU",
] as const;

function tri(eviter = ""): Tri {
  const libres = NOMS.filter((n) => ![...n].some((l) => eviter.includes(l)));
  const n = randomChoice(libres);
  return { n, A: n[0], B: n[1], C: n[2] };
}
/** Deux triangles sans lettre commune : ABC et DEF, KLM et RST… */
function deuxTri(): [Tri, Tri] {
  const t1 = tri();
  return [t1, tri(t1.n)];
}
const lettres = (t: Tri) => ({ A: t.A, B: t.B, C: t.C });
/** Les deux sommets autres que k, dans l'ordre du nom. */
function autres(k: K): [K, K] {
  return k === "A" ? ["B", "C"] : k === "B" ? ["A", "C"] : ["A", "B"];
}
function parSommet(entrees: [K, string][]): Partial<Record<K, string>> {
  const o: Partial<Record<K, string>> = {};
  for (const [k, v] of entrees) o[k] = v;
  return o;
}

/* ---------------------------------------------------------------------------
   LES DÉCORS : un objet réel qui EST un triangle (« § » = son nom).
--------------------------------------------------------------------------- */
const DECORS = [
  "Une voile de bateau a la forme du triangle §.",
  "Le pignon d'une maison dessine le triangle §.",
  "Trois villages reliés par des routes droites forment le triangle §.",
  "Un fanion de supporter a la forme du triangle §.",
  "Une équerre en bois a la forme du triangle §.",
  "Un panneau « danger » a la forme du triangle §.",
  "Trois piquets plantés dans un jardin forment le triangle §.",
  "Vue de profil, une rampe de skate dessine le triangle §.",
  "Trois bouées d'une régate forment le triangle §.",
  "Le cadre d'un vélo dessine le triangle §.",
  "La charpente d'un toit forme le triangle §.",
  "Sur une carte de randonnée, trois refuges forment le triangle §.",
  "Vue de face, une tente canadienne dessine le triangle §.",
  "Dans le ciel d'été, trois étoiles brillantes forment le triangle §.",
  "Sur une carte de La Réunion, trois sommets forment le triangle §.",
  "Vu de côté, un pupitre de musicien dessine le triangle §.",
  "Sur un terrain de football, le ballon et les deux poteaux forment le triangle §.",
  "Le logo d'un club de randonnée est le triangle §.",
  "Vue de dessus, une part de fromage a la forme du triangle §.",
  "Dans un jeu vidéo, un décor est dessiné par le triangle §.",
] as const;
const decor = (t: Tri) => randomChoice(DECORS).replace("§", t.n);

/* ---------------------------------------------------------------------------
   LES PROJETS : ce qu'on veut fabriquer, avec une unité et un facteur qui
   rendent les longueurs plausibles (un fanion de 30 cm, pas de 3 km).
--------------------------------------------------------------------------- */
const PROJETS = [
  { but: "coudre une voile de bateau", u: "m", f: 1 },
  { but: "tendre une corde entre trois piquets du jardin", u: "m", f: 1 },
  { but: "relier trois villages par des routes droites", u: "km", f: 1 },
  { but: "découper un fanion en tissu", u: "cm", f: 5 },
  { but: "fabriquer une équerre en bois", u: "cm", f: 5 },
  { but: "souder le cadre d'un vélo", u: "cm", f: 10 },
  { but: "assembler la charpente d'un abri", u: "m", f: 1 },
  { but: "tracer un parcours de régate entre trois bouées", u: "km", f: 1 },
  { but: "dessiner le logo d'un club sur une affiche", u: "cm", f: 5 },
  { but: "découper une part de gâteau à bords droits", u: "cm", f: 2 },
  { but: "clôturer un enclos à moutons", u: "m", f: 5 },
  { but: "relier trois refuges par des sentiers en ligne droite", u: "km", f: 1 },
  { but: "poser une étagère d'angle en verre", u: "cm", f: 5 },
  { but: "tracer un terrain de jeu dans la cour", u: "m", f: 1 },
  { but: "fabriquer un panneau « danger »", u: "cm", f: 10 },
] as const;

/* ---------------------------------------------------------------------------
   LES PAIRES : deux objets triangulaires que l'on compare (§ et ¤ = les noms).
--------------------------------------------------------------------------- */
const PAIRES = [
  { s: "Deux voiles de bateau ont la forme des triangles § et ¤.", u: "m", f: 1 },
  { s: "Deux fanions découpés dans un même tissu sont les triangles § et ¤.", u: "cm", f: 5 },
  { s: "Deux équerres d'une trousse ont la forme des triangles § et ¤.", u: "cm", f: 2 },
  { s: "Deux pièces d'un puzzle sont les triangles § et ¤.", u: "cm", f: 1 },
  { s: "Deux panneaux de signalisation dessinent les triangles § et ¤.", u: "cm", f: 10 },
  { s: "Les deux pignons d'un chalet forment les triangles § et ¤.", u: "m", f: 1 },
  { s: "Deux tuiles d'une mosaïque sont les triangles § et ¤.", u: "cm", f: 1 },
  { s: "Les deux ailes d'un avion en papier dessinent les triangles § et ¤.", u: "cm", f: 2 },
  { s: "Deux plaques de métal découpées au laser sont les triangles § et ¤.", u: "cm", f: 5 },
  { s: "Deux supports d'étagère ont la forme des triangles § et ¤.", u: "cm", f: 3 },
  { s: "Deux faces d'une pyramide en carton sont les triangles § et ¤.", u: "cm", f: 2 },
  { s: "Deux parts de tarte à bords droits ont la forme des triangles § et ¤.", u: "cm", f: 2 },
  { s: "Deux carreaux d'un vitrail sont les triangles § et ¤.", u: "cm", f: 2 },
  { s: "Sur une carte, deux zones de pêche ont la forme des triangles § et ¤.", u: "km", f: 1 },
  { s: "Sur une feuille, on a tracé les triangles § et ¤.", u: "cm", f: 1 },
] as const;
const paire = (t1: Tri, t2: Tri) => {
  const p = randomChoice(PAIRES);
  return { ...p, s: p.s.replace("§", t1.n).replace("¤", t2.n) };
};

/** Trois côtés entiers qui ferment un triangle (base 3 à 9). */
function troisCotes(): [number, number, number] {
  const a = randomInt(4, 9);
  const b = randomInt(3, 8);
  const c = randomInt(Math.abs(a - b) + 1, a + b - 1);
  return [a, b, c];
}
/** Trois angles entiers de somme 180°. */
function troisAngles(): [number, number, number] {
  const a = randomInt(30, 80);
  const b = randomInt(30, 150 - a);
  return [a, b, 180 - a - b];
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
      const t = tri();
      const p = randomChoice(PROJETS);
      const possible = Math.random() < 0.5;
      const a0 = randomInt(3, 9);
      const b0 = randomInt(4, 10);
      const c0 = possible ? randomInt(Math.abs(a0 - b0) + 1, a0 + b0 - 1) : a0 + b0 + randomInt(1, 4);
      const [x, y, z] = shuffle([a0 * p.f, b0 * p.f, c0 * p.f]);
      const u = p.u;
      const max = Math.max(x, y, z);
      const reste = x + y + z - max;
      const correct = possible ? "oui, il est constructible" : "non, il est impossible";
      const text = randomChoice([
        `Pour ${p.but}, on prévoit un triangle ${t.n} de côtés ${x} ${u}, ${y} ${u} et ${z} ${u}. Ce triangle peut-il exister ?`,
        `On veut ${p.but} avec un triangle ${t.n} tel que ${t.A}${t.B} = ${x} ${u}, ${t.B}${t.C} = ${y} ${u} et ${t.A}${t.C} = ${z} ${u}. Est-ce possible ?`,
        `Un élève veut ${p.but}. Il prévoit le triangle ${t.n} avec des côtés de ${x} ${u}, ${y} ${u} et ${z} ${u}. Peut-il le construire ?`,
        `Peut-on construire un triangle ${t.n} de côtés ${x} ${u}, ${y} ${u} et ${z} ${u} ? C'est le projet d'un élève qui veut ${p.but}.`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(["oui, il est constructible", "non, il est impossible"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : dans un triangle, la longueur du plus grand côté est TOUJOURS inférieure à la somme des deux autres.\n\n" +
          "Méthode : on repère le plus grand côté, puis on additionne les deux autres.\n\n" +
          (possible
            ? `Calcul : le plus grand vaut ${max} ${u}, et les deux autres font ${reste} ${u}. Or ${max} < ${reste}.\n\n`
            : `Calcul : le plus grand vaut ${max} ${u}, et les deux autres font ${reste} ${u}. Or ${max} > ${reste} : le chemin par le sommet serait plus court que le côté direct.\n\n`) +
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
      const t = tri();
      const p = randomChoice(PROJETS);
      const u = p.u;
      const a0 = randomInt(4, 9);
      const b0 = randomInt(a0 + 1, a0 + 6);
      const a = a0 * p.f;
      const b = b0 * p.f;
      const correct = `entre ${b - a} et ${a + b} ${u}`;
      const text = randomChoice([
        `Dans le triangle ${t.n}, ${t.A}${t.B} = ${b} ${u} et ${t.A}${t.C} = ${a} ${u}. Entre quelles valeurs se situe la longueur ${t.B}${t.C} ?`,
        `Pour ${p.but}, on a déjà fixé deux côtés du triangle ${t.n} : ${t.A}${t.B} = ${b} ${u} et ${t.A}${t.C} = ${a} ${u}. Entre quelles valeurs peut se situer ${t.B}${t.C} ?`,
        `On veut ${p.but}. Le triangle ${t.n} a déjà deux côtés : ${t.A}${t.C} = ${a} ${u} et ${t.A}${t.B} = ${b} ${u}. Quelles longueurs sont possibles pour ${t.B}${t.C} ?`,
        `Encadre la longueur ${t.B}${t.C} du triangle ${t.n}, sachant que ${t.A}${t.B} = ${b} ${u} et ${t.A}${t.C} = ${a} ${u}.`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `entre 0 et ${a + b} ${u}`,
          `entre ${a} et ${b} ${u}`,
          `entre ${b - a} et ${b} ${u}`,
          `entre ${a + b} et ${a * b} ${u}`,
          `n'importe quelle valeur`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : l'inégalité triangulaire encadre le troisième côté par les DEUX bouts.\n\n" +
          "Méthode : il doit être plus petit que la somme, et plus grand que la différence.\n\n" +
          `Calcul : ${a} + ${b} = ${a + b} pour la borne haute, et ${b} − ${a} = ${b - a} pour la borne basse.\n\n` +
          `Conclusion : ⚠️ oublier la borne BASSE est l'erreur fréquente — un côté ${t.B}${t.C} de 1 ${u} avec ${a} ${u} et ${b} ${u} ne referme pas le triangle.`,
        canvas: triangle({
          labels: lettres(t),
          sideLabels: { AB: `${b} ${u}`, CA: `${a} ${u}`, BC: "?" },
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
      const t = tri();
      const d = decor(t);
      const [k1, k2, k3] = shuffle<K>(["A", "B", "C"]);
      const [P1, P2, P3] = [t[k1], t[k2], t[k3]];
      const a = randomInt(25, 80);
      const b = randomInt(25, 170 - a);
      const c = 180 - a - b;
      const text = randomChoice([
        `${d} L'angle en ${P1} mesure ${a}° et l'angle en ${P2} mesure ${b}°. Combien mesure l'angle en ${P3} ?`,
        `${d} On a mesuré deux de ses angles : ${a}° en ${P1} et ${b}° en ${P2}. Quelle est la mesure de l'angle en ${P3} ?`,
        `${d} Calcule la mesure de l'angle en ${P3}, sachant que les angles en ${P1} et en ${P2} mesurent ${a}° et ${b}°.`,
        `${d} Que vaut l'angle en ${P3} si l'angle en ${P1} vaut ${a}° et l'angle en ${P2} vaut ${b}° ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation:
          "Définition : la somme des trois angles d'un triangle vaut toujours 180°.\n\n" +
          "Méthode : on additionne les deux angles connus, puis on retire de 180.\n\n" +
          `Calcul : ${a} + ${b} = ${a + b}, et 180 − ${a + b} = ${c}. L'angle en ${P3} mesure ${c}°.\n\n` +
          `Conclusion : ⭐ cette propriété se DÉMONTRE avec les angles alternes internes — on trace la parallèle à un côté passant par le sommet opposé.`,
        canvas: triangle({
          labels: lettres(t),
          display: { showPoints: true, showLabels: true, showSides: false, showAngles: true },
          angleLabels: parSommet([
            [k1, `${a}°`],
            [k2, `${b}°`],
            [k3, "?"],
          ]),
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
      const t = tri();
      const d = decor(t);
      const juste = Math.random() < 0.5;
      const a = randomInt(30, 70);
      const b = randomInt(30, 70);
      const c = juste ? 180 - a - b : 180 - a - b + randomChoice([-15, -10, 10, 20]);
      const correct = juste ? "oui, ce triangle peut exister" : "non, c'est impossible";
      const mesures = `${a}° en ${t.A}, ${b}° en ${t.B} et ${c}° en ${t.C}`;
      const text = randomChoice([
        `${d} Un élève annonce des angles de ${mesures}. Est-ce possible ?`,
        `Un élève annonce un triangle ${t.n} dont les angles mesurent ${a}°, ${b}° et ${c}°. Est-ce possible ?`,
        `${d} Sur un schéma, on lit des angles de ${mesures}. Ces mesures peuvent-elles être justes ?`,
        `${d} Une camarade affirme que ses angles mesurent ${a}°, ${b}° et ${c}°. A-t-elle pu mesurer juste ?`,
      ]);
      return {
        text,
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
    hint: "Une hauteur passe par un sommet et est PERPENDICULAIRE à la droite qui porte le côté opposé.",
    tags: ["triangle", "hauteur", "qcm", "template", "canvas"],
    generate: () => {
      const t = tri();
      const k = randomChoice<K>(["A", "B", "C"]);
      const [k1, k2] = autres(k);
      const S = t[k];
      // ⚠️ La hauteur est perpendiculaire à la DROITE (XY) : dans un triangle
      // obtus, elle ne coupe pas le SEGMENT [XY] (relecture du 03/10).
      const oppose = `[${t[k1]}${t[k2]}]`;
      const droite = `(${t[k1]}${t[k2]})`;
      const correct = `du sommet ${S}, perpendiculairement à la droite ${droite}`;
      const text = randomChoice([
        `Dans le triangle ${t.n}, où passe la hauteur issue de ${S} ?`,
        `${decor(t)} On trace la hauteur issue de ${S}. Comment est-elle placée ?`,
        `${decor(t)} Quelle phrase décrit la hauteur relative au côté ${oppose} ?`,
        `Dans le triangle ${t.n}, on veut tracer la hauteur issue du sommet ${S}. Laquelle de ces phrases la décrit ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          `du sommet ${S}, jusqu'au milieu de ${oppose}`,
          `du milieu de ${oppose}, perpendiculairement à la droite ${droite}`,
          `du sommet ${S}, jusqu'au sommet le plus proche`,
          `du sommet ${S}, parallèlement à la droite ${droite}`,
          `du sommet ${S}, en partageant l'angle en deux`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : la hauteur issue d'un sommet est la droite qui passe par ce sommet et qui est PERPENDICULAIRE à la droite qui porte le côté opposé.\n\n" +
          "Méthode : deux conditions, et il faut les deux — passer par le sommet, et faire un angle droit avec la droite qui porte le côté opposé.\n\n" +
          `Calcul : dans le triangle ${t.n}, la hauteur issue de ${S} (aussi appelée hauteur relative à ${oppose}) est donc perpendiculaire à la droite ${droite}. Si le triangle a un angle obtus, son pied tombe hors du segment ${oppose} : on prolonge le côté.\n\n` +
          `Conclusion : ⚠️ à ne pas confondre avec la MÉDIANE, qui va au milieu du côté opposé, ni avec la MÉDIATRICE, qui est perpendiculaire au côté en son milieu — elle ne passe pas forcément par le sommet.`,
        canvas: triangle({
          labels: lettres(t),
          height: { fromVertex: k, label: "hauteur", baseLabel: droite },
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
      const t = tri();
      const k = randomChoice<K>(["A", "B", "C"]);
      const [k1, k2] = autres(k);
      const S = t[k];
      const o = `[${t[k1]}${t[k2]}]`;
      const d = `(${t[k1]}${t[k2]})`;
      // ⚠️ Hauteur : perpendiculaire à la DROITE (XY), pas au segment (triangle
      // obtus). Médiatrice : perpendiculaire au segment EN SON MILIEU.
      const hauteur = `passe par ${S} et est perpendiculaire à la droite ${d}`;
      const mediatrice = `passe par le milieu de ${o} et est perpendiculaire à ${o}`;
      const mediane = `passe par ${S} et par le milieu de ${o}`;
      const cas = randomChoice([
        {
          nom: `la hauteur issue de ${S}`,
          def: hauteur,
          faux: [mediatrice, mediane, `partage l'angle en ${S} en deux angles égaux`],
        },
        {
          nom: `la médiatrice de ${o}`,
          def: mediatrice,
          faux: [hauteur, mediane, `est parallèle à ${o}`],
        },
        {
          nom: `la médiane issue de ${S}`,
          def: mediane,
          faux: [hauteur, mediatrice, `partage l'angle en ${S} en deux angles égaux`],
        },
      ]);
      const text = randomChoice([
        `Dans le triangle ${t.n}, qu'est-ce que ${cas.nom} ?`,
        `${decor(t)} Quelle phrase définit ${cas.nom} ?`,
        `On trace ${cas.nom} dans le triangle ${t.n}. Que sait-on de cette droite ?`,
        `Parmi ces phrases, laquelle décrit ${cas.nom} dans le triangle ${t.n} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.def, [
          ...cas.faux,
          `est parallèle à ${o}`,
          "passe par les trois sommets",
        ]),
        expected: [cas.def],
        comparator: "mcq_exact",
        explanation:
          "Définition : chacune de ces droites se définit par DEUX conditions, et c'est en oubliant l'une des deux qu'on les confond.\n\n" +
          "Méthode : on se demande par où elle PASSE, puis COMMENT elle coupe.\n\n" +
          `Calcul : dans le triangle ${t.n}, ${cas.nom} ${cas.def}.\n\n` +
          "Conclusion : ⭐ la hauteur part d'un SOMMET, la médiatrice part d'un MILIEU. Les deux sont perpendiculaires à la droite qui porte le côté, et c'est ce qu'elles ont en commun qui les fait confondre.",
      };
    },
  },
  {
    // ⭐ 03/10/2026 : la MÉDIATRICE au travail. Un point de la médiatrice est à
    // égale distance des deux extrémités ; le point commun des trois médiatrices
    // est le centre du cercle circonscrit. Le décor dit à quoi ça sert : placer
    // une antenne, un arroseur, une sono à égale distance de trois lieux.
    kind: "template",
    id: "4e_triangle_droites_tpl_3_mediatrice_distance",
    niveau: "4e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_droites",
    difficulty: 4,
    theme: "neutral",
    hint: "Un point de la médiatrice d'un segment est à la même distance de ses deux extrémités.",
    tags: ["triangle", "mediatrice", "cercle_circonscrit", "template"],
    generate: () => {
      const t = tri();
      const lieu = randomChoice([
        { lieux: "villages", objet: "une antenne relais", u: "km", min: 3, max: 12 },
        { lieux: "maisons d'un hameau", objet: "un lampadaire", u: "m", min: 15, max: 60 },
        { lieux: "massifs de fleurs", objet: "un arroseur automatique", u: "m", min: 4, max: 12 },
        { lieux: "bouées d'une régate", objet: "le bateau du jury", u: "m", min: 200, max: 600 },
        { lieux: "écoles", objet: "une cantine centrale", u: "km", min: 2, max: 9 },
        { lieux: "fermes", objet: "un château d'eau", u: "km", min: 2, max: 8 },
        { lieux: "stands d'une fête", objet: "une sono", u: "m", min: 10, max: 40 },
        { lieux: "ruches", objet: "un abreuvoir", u: "m", min: 5, max: 20 },
        { lieux: "plots d'un échauffement", objet: "l'entraîneur", u: "m", min: 5, max: 15 },
        { lieux: "tentes d'un camp scout", objet: "un point d'eau", u: "m", min: 10, max: 30 },
        { lieux: "îlots d'un lagon", objet: "un poste de secours", u: "m", min: 100, max: 400 },
        { lieux: "quartiers d'une ville", objet: "une salle de sport", u: "km", min: 1, max: 5 },
      ]);
      const d = randomInt(lieu.min, lieu.max);
      const u = lieu.u;
      const [kP, kQ] = shuffle<K>(["A", "B", "C"]);
      const P = t[kP];
      const Q = t[kQ];
      const seg = kP < kQ ? `[${P}${Q}]` : `[${Q}${P}]`;
      const forme = randomInt(0, 3);
      const text =
        forme === 0
          ? `Le point O est sur la médiatrice du segment ${seg}, et O${P} = ${d} ${u}. Combien mesure O${Q} ?`
          : forme === 1
            ? `O est le centre du cercle circonscrit au triangle ${t.n}, et O${P} = ${d} ${u}. Combien mesure O${Q} ?`
            : forme === 2
              ? `Les points ${t.A}, ${t.B} et ${t.C} sont trois ${lieu.lieux}. On place ${lieu.objet} au point O où se coupent les médiatrices du triangle ${t.n}, à ${d} ${u} de ${P}. Quelle est la distance O${Q} ?`
              : `On veut placer ${lieu.objet} au point O, à égale distance de trois ${lieu.lieux} ${t.A}, ${t.B} et ${t.C}. On trouve O${P} = ${d} ${u}. Combien vaut O${Q} ?`;
      return {
        text,
        format: "short",
        expected: [String(d)],
        comparator: "number_equal",
        explanation:
          "Définition : un point de la médiatrice d'un segment est à la même distance de ses deux extrémités. Les trois médiatrices d'un triangle se coupent en un point O, centre du cercle qui passe par les trois sommets : le cercle circonscrit.\n\n" +
          (forme === 0
            ? `Méthode : O est sur la médiatrice de ${seg}, donc O est à égale distance de ${P} et de ${Q}.\n\n`
            : `Méthode : O est sur les trois médiatrices du triangle ${t.n}, donc O${t.A} = O${t.B} = O${t.C}.\n\n`) +
          `Calcul : O${Q} = O${P} = ${d} ${u}.\n\n` +
          "Conclusion : ⭐ c'est ainsi qu'on trouve le point à égale distance de trois lieux : on trace deux médiatrices, la troisième passe par leur point commun.",
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
      const [t1, t2] = deuxTri();
      const pr = paire(t1, t2);
      const u = pr.u;
      const [x0, y0, z0] = troisCotes();
      const [x, y, z] = [x0 * pr.f, y0 * pr.f, z0 * pr.f];
      const [al, be, ga] = troisAngles();
      const { A, B, C } = t1;
      const { A: D, B: E, C: F } = t2;
      const cas = randomChoice([
        {
          data: `${A}${B} = ${D}${E} = ${x} ${u}, ${B}${C} = ${E}${F} = ${y} ${u} et ${A}${C} = ${D}${F} = ${z} ${u}`,
          nom: "les trois côtés",
          suffit: true,
          canvas: { sideLabels: { AB: `${x} ${u}`, BC: `${y} ${u}`, CA: `${z} ${u}` } },
        },
        {
          data: `${A}${B} = ${D}${E} = ${x} ${u}, ${A}${C} = ${D}${F} = ${z} ${u}, et les angles en ${A} et en ${D} mesurent tous deux ${al}°`,
          nom: `deux côtés et l'angle compris entre eux (en ${A} et en ${D})`,
          suffit: true,
          canvas: {
            sideLabels: { AB: `${x} ${u}`, CA: `${z} ${u}` },
            angleLabels: { A: `${al}°` },
          },
        },
        {
          data: `${B}${C} = ${E}${F} = ${y} ${u}, les angles en ${B} et en ${E} mesurent ${be}°, et les angles en ${C} et en ${F} mesurent ${ga}°`,
          nom: `un côté et les deux angles qui le touchent ([${B}${C}] avec les angles en ${B} et en ${C})`,
          suffit: true,
          canvas: {
            sideLabels: { BC: `${y} ${u}` },
            angleLabels: { B: `${be}°`, C: `${ga}°` },
          },
        },
        {
          data: `les angles mesurent ${al}° en ${A} et en ${D}, ${be}° en ${B} et en ${E}, ${ga}° en ${C} et en ${F}`,
          nom: "les trois angles, et aucune longueur",
          suffit: false,
          canvas: {
            sideLabels: {} as Partial<Record<TriangleCanvasSideLabel, string>>,
            angleLabels: { A: `${al}°`, B: `${be}°`, C: `${ga}°` },
          },
        },
      ]);
      const correct = cas.suffit
        ? "oui : c'est un cas d'égalité"
        : "non : ils sont seulement semblables";
      const text = randomChoice([
        `${pr.s} On sait que ${cas.data}. Ces triangles sont-ils forcément égaux ?`,
        `${pr.s} ${cap(cas.data)}. Peut-on affirmer que les triangles ${t1.n} et ${t2.n} sont égaux ?`,
        `Les triangles ${t1.n} et ${t2.n} vérifient : ${cas.data}. Sont-ils forcément superposables ?`,
        `${pr.s} Avec ${cas.data}, ces deux triangles sont-ils égaux à coup sûr ?`,
      ]);
      return {
        text,
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
          `Calcul : ici on donne ${cas.nom} : ${cas.data}.\n\n` +
          (cas.suffit
            ? `Conclusion : c'est bien un cas d'égalité, les triangles ${t1.n} et ${t2.n} sont superposables.`
            : `Conclusion : ⚠️ trois angles fixent la FORME mais pas la TAILLE. Les triangles ${t1.n} et ${t2.n} sont semblables — l'un peut être un agrandissement de l'autre.`),
        canvas: triangle({
          labels: lettres(t1),
          ...cas.canvas,
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
      const [t1, t2] = deuxTri();
      const pr = paire(t1, t2);
      const u = pr.u;
      const [x0, y0] = troisCotes();
      const cote = x0 * pr.f;
      const autreCote = y0 * pr.f;
      const angle = randomInt(30, 80);
      // Le côté et l'angle donnés dans le premier triangle, et leurs correspondants.
      const cotes: [K, K][] = [["A", "B"], ["B", "C"], ["A", "C"]];
      const [c1, c2] = shuffle(cotes);
      const kAng = randomChoice<K>(["A", "B", "C"]);
      const s1 = `${t1[c1[0]]}${t1[c1[1]]}`;
      const s2 = `${t1[c2[0]]}${t1[c2[1]]}`;
      const s1b = `${t2[c1[0]]}${t2[c1[1]]}`;
      const s2b = `${t2[c2[0]]}${t2[c2[1]]}`;
      const demande = randomChoice(["cote", "autre", "angle"] as const);
      const question =
        demande === "cote"
          ? `[${s1b}]`
          : demande === "autre"
            ? `[${s2b}]`
            : `l'angle en ${t2[kAng]}`;
      const reponse = demande === "cote" ? cote : demande === "autre" ? autreCote : angle;
      const unite = demande === "angle" ? "°" : ` ${u}`;
      const donnees = `[${s1}] mesure ${cote} ${u}, [${s2}] mesure ${autreCote} ${u} et l'angle en ${t1[kAng]} mesure ${angle}°`;
      const ordre = `${t1.A} correspond à ${t2.A}, ${t1.B} à ${t2.B}, ${t1.C} à ${t2.C}`;
      const text = randomChoice([
        `Les triangles ${t1.n} et ${t2.n} sont égaux. Dans ${t1.n}, ${donnees}. Combien mesure ${question} ?`,
        `${pr.s} Ces triangles sont égaux (${ordre}). Dans ${t1.n}, ${donnees}. Que mesure ${question} ?`,
        `${pr.s} Ces triangles sont superposables, dans l'ordre des lettres. On sait que, dans ${t1.n}, ${donnees}. Donne la mesure de ${question}.`,
        `Dans le triangle ${t1.n}, ${donnees}. Le triangle ${t2.n} lui est égal (${ordre}). Quelle est la mesure de ${question} ?`,
      ]);
      const source =
        demande === "cote" ? `[${s1}]` : demande === "autre" ? `[${s2}]` : `l'angle en ${t1[kAng]}`;
      return {
        text,
        format: "short",
        expected: [String(reponse)],
        comparator: "number_equal",
        explanation:
          "Définition : deux triangles égaux sont superposables — chaque côté correspond à un côté, chaque angle à un angle.\n\n" +
          `Méthode : on suit l'ORDRE des lettres. Dans « ${t1.n} égal à ${t2.n} », ${ordre}.\n\n` +
          `Calcul : ${question} correspond à ${source}, qui mesure ${reponse}${unite}. Donc ${question} mesure ${reponse}${unite}.\n\n` +
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
      const t = tri();
      const { A, B, C } = t;
      const ctx = randomChoice([
        "Pour dessiner le patron d'une voile",
        "Pour reproduire un logo à la règle et au compas",
        "Pour tracer le gabarit d'une tuile",
        "Pour préparer un pochoir de peinture",
        "Pour dessiner une pièce de patchwork",
        "Pour la notice de montage d'une étagère",
        "Pour dessiner le plan d'un jardin à l'échelle",
        "Pour tailler une pièce de bois",
        "Dans un programme de construction envoyé à un camarade",
        "Pour dessiner un carreau de vitrail",
        "Pour la maquette d'un toit",
        "Pour découper un fanion",
        "Dans un exercice de dessin technique",
        "Pour reproduire un panneau « danger » au tableau",
      ]);
      const [a, b, c] = troisCotes();
      const al = randomInt(30, 80);
      const be = randomInt(30, 140 - al);
      const etape = randomInt(0, 3);
      let text: string;
      let correct: string;
      let faux: string[];
      let calcul: string;
      if (etape === 0) {
        text = `${ctx}, on veut construire le triangle ${t.n} avec ${A}${B} = ${a} cm, ${A}${C} = ${b} cm et ${B}${C} = ${c} cm. Par quoi commence le protocole ?`;
        correct = `tracer [${A}${B}] de ${a} cm`;
        faux = [
          "tracer les trois côtés en même temps",
          `placer le point ${C} d'abord`,
          "mesurer les angles",
          `tracer un cercle de ${b} cm de rayon`,
          "vérifier que les angles font 180°",
        ];
        calcul = `on trace [${A}${B}] de ${a} cm. Puis on trace le cercle de centre ${A} et de rayon ${b} cm, celui de centre ${B} et de rayon ${c} cm : le point ${C} est à leur intersection.`;
      } else if (etape === 1) {
        text = `${ctx}, on veut construire le triangle ${t.n} avec ${A}${B} = ${a} cm, ${A}${C} = ${b} cm et ${B}${C} = ${c} cm. On a déjà tracé [${A}${B}]. Comment place-t-on ${C} ?`;
        correct = `avec le cercle de centre ${A} et de rayon ${b} cm et le cercle de centre ${B} et de rayon ${c} cm`;
        faux = [
          `avec le cercle de centre ${A} et de rayon ${c} cm et le cercle de centre ${B} et de rayon ${b} cm`,
          `au milieu de [${A}${B}]`,
          `sur la médiatrice de [${A}${B}], à ${b} cm du milieu`,
          `avec un seul cercle, de centre ${A} et de rayon ${a} cm`,
          `en traçant un angle de 60° en ${A}`,
        ];
        calcul = `${C} est à ${b} cm de ${A} : il est sur le cercle de centre ${A} et de rayon ${b} cm. Il est à ${c} cm de ${B} : il est sur le cercle de centre ${B} et de rayon ${c} cm. ${C} est à l'intersection des deux cercles.`;
      } else if (etape === 2) {
        text = `${ctx}, on veut construire le triangle ${t.n} avec ${A}${B} = ${a} cm, ${A}${C} = ${b} cm et un angle de ${al}° en ${A}. On a tracé [${A}${B}]. Quelle est l'étape suivante ?`;
        correct = `tracer au rapporteur une demi-droite d'origine ${A} qui fait ${al}° avec [${A}${B}]`;
        faux = [
          `tracer au rapporteur une demi-droite d'origine ${B} qui fait ${al}° avec [${A}${B}]`,
          `tracer le cercle de centre ${B} et de rayon ${b} cm`,
          `tracer la hauteur issue de ${A}`,
          `placer ${C} au milieu de [${A}${B}]`,
          `mesurer [${B}${C}]`,
        ];
        calcul = `l'angle de ${al}° est en ${A}, entre [${A}${B}] et [${A}${C}] : on le trace au rapporteur depuis ${A}, puis on place ${C} sur cette demi-droite, à ${b} cm de ${A}.`;
      } else {
        text = `${ctx}, on veut construire le triangle ${t.n} avec ${A}${B} = ${a} cm, un angle de ${al}° en ${A} et un angle de ${be}° en ${B}. On a tracé [${A}${B}]. Comment obtient-on ${C} ?`;
        correct = `on trace un angle de ${al}° en ${A} et un angle de ${be}° en ${B} : ${C} est là où leurs côtés se coupent`;
        faux = [
          `on trace un angle de ${be}° en ${A} et un angle de ${al}° en ${B} : ${C} est là où leurs côtés se coupent`,
          `on trace un cercle de centre ${A} et de rayon ${a} cm`,
          `on place ${C} sur la médiatrice de [${A}${B}]`,
          `on mesure [${A}${C}] à la règle`,
          `on trace la hauteur issue de ${A}`,
        ];
        calcul = `on trace au rapporteur l'angle de ${al}° en ${A} et l'angle de ${be}° en ${B}, du même côté de [${A}${B}] ; ${C} est le point commun des deux demi-droites.`;
      }
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, faux),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un protocole de construction est une suite d'instructions qu'une autre personne doit pouvoir suivre sans rien deviner.\n\n" +
          "Méthode : on commence par ce qui se trace SANS RIEN CHERCHER — un segment de longueur donnée — puis chaque donnée restante place le troisième sommet.\n\n" +
          `Calcul : ${calcul}\n\n` +
          `Conclusion : ⭐ ce protocole donne TOUJOURS le même triangle ${t.n}, parce que ses données sont un cas d'égalité. C'est le lien que le BO demande entre construction et cas d'égalité.`,
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
      const t = tri();
      const { A, B, C } = t;
      const obj = randomChoice([
        "fanions", "équerres", "pièces de puzzle", "tuiles", "voiles de bateau",
        "panneaux « danger »", "carreaux de vitrail", "supports d'étagère",
        "parts de tarte", "plaques de métal", "étiquettes", "pièces de patchwork",
        "cales de porte", "logos autocollants",
      ]);
      const [a, b, c] = troisCotes();
      const [al, be, ga] = troisAngles();
      const cas = randomChoice([
        { d: `${A}${B} = ${a} cm, ${B}${C} = ${b} cm et ${A}${C} = ${c} cm`, nom: "les trois côtés", unique: true },
        { d: `${A}${B} = ${a} cm, ${A}${C} = ${b} cm et un angle de ${al}° en ${A}`, nom: "deux côtés et l'angle entre eux", unique: true },
        { d: `${A}${B} = ${a} cm, un angle de ${al}° en ${A} et un angle de ${be}° en ${B}`, nom: "un côté et les deux angles qui le touchent", unique: true },
        { d: `des angles de ${al}° en ${A}, ${be}° en ${B} et ${ga}° en ${C}`, nom: "les trois angles, sans aucune longueur", unique: false },
        { d: `${A}${B} = ${a} cm et un angle de ${al}° en ${A}`, nom: "un seul côté et un seul angle", unique: false },
        { d: `${A}${B} = ${a} cm et ${A}${C} = ${b} cm`, nom: "deux côtés sans l'angle entre eux", unique: false },
      ]);
      const correct = cas.unique
        ? "oui : le triangle obtenu est toujours le même"
        : "non : plusieurs triangles différents conviennent";
      const text = randomChoice([
        `Un atelier veut fabriquer des ${obj} identiques, en forme de triangle ${t.n}. Il donne seulement : ${cas.d}. Cela suffit-il à obtenir UN SEUL triangle possible ?`,
        `On donne, pour le triangle ${t.n} : ${cas.d}. Cela suffit-il à construire UN SEUL triangle possible ?`,
        `Pour découper des ${obj} identiques, un artisan note : triangle ${t.n}, ${cas.d}. Deux personnes qui suivent ces données obtiennent-elles forcément le même triangle ?`,
        `Le protocole de construction du triangle ${t.n} ne donne que : ${cas.d}. Décrit-il un seul triangle ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([
          "oui : le triangle obtenu est toujours le même",
          "non : plusieurs triangles différents conviennent",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les cas d'égalité disent exactement quelles données déterminent un triangle sans ambiguïté — les trois côtés ; deux côtés et l'angle entre eux ; un côté et les deux angles qui le touchent.\n\n" +
          "Méthode : on se demande si deux personnes suivant le protocole obtiendraient forcément le même triangle.\n\n" +
          `Calcul : ${cas.d}, c'est ${cas.nom} : ${cas.unique ? "l'un des trois cas d'égalité" : "aucun des trois cas d'égalité"}.\n\n` +
          (cas.unique
            ? "Conclusion : ⭐ construire et démontrer sont donc le même savoir vu des deux côtés — c'est ce que le BO demande de relier."
            : "Conclusion : ⚠️ le protocole laisserait le choix, donc il ne décrit pas UN triangle : on peut en tracer plusieurs, différents, qui respectent ces données."),
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
    hint: "Semblables : même forme, taille éventuellement différente. Cherche UN MÊME multiplicateur.",
    tags: ["triangle", "semblable", "qcm", "template"],
    generate: () => {
      const [t1, t2] = deuxTri();
      // ⛔ Relecture du 03/10 : l'énoncé ne doit JAMAIS affirmer
      // « agrandissement » — la réponse peut être « non ». Le décor dit ce qu'on
      // a VOULU agrandir ; les côtés disent si c'est réussi. Les mêmes
      // tournures servent aux deux cas, pour que la phrase ne trahisse rien.
      const ctx = randomChoice([
        { p: "un logo de carte de visite", ks: [2, 3, 4] },
        { p: "une photo", ks: [2, 3, 1.5] },
        { p: "le dessin d'une voile", ks: [2, 3, 4] },
        { p: "une petite équerre", ks: [2, 1.5, 3] },
        { p: "une pièce de tangram", ks: [2, 3] },
        { p: "un panneau d'un circuit de jouets", ks: [10] },
        { p: "une part de pizza", ks: [1.5, 2] },
        { p: "le patron d'un fanion", ks: [2, 3, 4] },
        { p: "une figure vue sur un téléphone", ks: [3, 4, 5] },
        { p: "un triangle tracé sur une feuille", ks: [5, 10] },
        { p: "un motif de papier peint", ks: [4, 5, 10] },
        { p: "la maquette d'un pignon", ks: [2] },
      ]);
      const k = randomChoice(ctx.ks);
      let a = randomInt(3, 6);
      const b = randomInt(4, 8);
      const c = randomInt(Math.abs(a - b) + 1, a + b - 1);
      if (a === b && b === c) a = a - 1;
      const semblables = Math.random() < 0.6;
      const ajout = randomInt(1, 4);
      const [a2, b2, c2] = semblables ? [a * k, b * k, c * k] : [a + ajout, b + ajout, c + ajout];
      const ok = "ils sont semblables, mais pas égaux";
      const pasOk = "ils ne sont pas semblables : les côtés n'ont pas été multipliés par un même nombre";
      const correct = semblables ? ok : pasOk;
      // Pour l'explication du cas « pas semblables » : deux côtés de longueurs
      // DIFFÉRENTES, sinon leurs deux quotients seraient égaux.
      const [u1, v1, u2, v2] = a !== c ? [a, a2, c, c2] : [a, a2, b, b2];
      const c1s = `${fr(a)} cm, ${fr(b)} cm et ${fr(c)} cm`;
      const c2s = `${fr(a2)} cm, ${fr(b2)} cm et ${fr(c2)} cm`;
      const text = randomChoice([
        `Une élève a voulu agrandir ${ctx.p}. Le triangle ${t1.n} de départ a pour côtés ${c1s} ; le triangle ${t2.n} qu'elle a obtenu a pour côtés ${c2s}. Que peut-on dire ?`,
        `Le triangle ${t1.n} a pour côtés ${c1s}. Le triangle ${t2.n} a pour côtés ${c2s}. Que peut-on dire de ces deux triangles ?`,
        `On se demande si le triangle ${t2.n} (${c2s}) est un agrandissement du triangle ${t1.n} (${c1s}), relevé sur ${ctx.p}. Que peut-on dire ?`,
        `Deux triangles découpés dans du carton : ${t1.n}, de côtés ${c1s}, et ${t2.n}, de côtés ${c2s}. Sont-ils semblables ?`,
        `Un élève essaie de reproduire en plus grand ${ctx.p} : à partir du triangle ${t1.n} (${c1s}), il trace le triangle ${t2.n} (${c2s}). Quelle conclusion est juste ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(correct, [
          ok,
          pasOk,
          "ils sont égaux",
          "ils sont égaux, à l'unité près",
          "ils ont les mêmes côtés",
          `le triangle ${t2.n} n'est pas un triangle`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux triangles sont SEMBLABLES quand leurs angles sont deux à deux égaux — autrement dit quand l'un est un agrandissement de l'autre : tous les côtés sont multipliés par un MÊME nombre.\n\n" +
          `Méthode : on cherche si chaque côté de ${t1.n} a été multiplié par le même nombre.\n\n` +
          (semblables
            ? `Calcul : ${fr(a)} × ${fr(k)} = ${fr(a2)}, ${fr(b)} × ${fr(k)} = ${fr(b2)} et ${fr(c)} × ${fr(k)} = ${fr(c2)} : chaque côté a été multiplié par ${fr(k)}, donc les deux triangles ont la même forme.\n\n` +
              "Conclusion : ⚠️ ÉGAUX veut dire superposables ; SEMBLABLES veut dire de même forme. Deux triangles égaux sont semblables, l'inverse est faux."
            : `Calcul : chaque côté a augmenté de ${ajout} cm (${fr(u1)} → ${fr(v1)}, ${fr(u2)} → ${fr(v2)}). Mais ${fr(v1)} ÷ ${fr(u1)} ${egal(v1 / u1)} ${fr(v1 / u1)} et ${fr(v2)} ÷ ${fr(u2)} ${egal(v2 / u2)} ${fr(v2 / u2)} : pas le même multiplicateur.\n\n` +
              "Conclusion : ⚠️ AJOUTER la même longueur n'est pas AGRANDIR : la forme change. Ces triangles ne sont pas semblables."),
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
      const [t1, t2] = deuxTri();
      const ctx = randomChoice([
        // ⚠️ Écrits pour suivre « sur » : « sur une carte de visite », « sur une affiche ».
        { p: "une carte de visite", g: "une affiche" },
        { p: "une photo", g: "son agrandissement" },
        { p: "un cahier", g: "le tableau" },
        { p: "une petite équerre", g: "une grande équerre" },
        { p: "un tangram de poche", g: "un grand tangram de cour" },
        { p: "le patron d'un fanion", g: "un grand fanion de stade" },
        { p: "l'écran d'un téléphone", g: "une tablette" },
        { p: "une maquette de charpente", g: "le plan agrandi de la charpente" },
        { p: "un échantillon de papier peint", g: "une fresque" },
        { p: "un pochoir de poche", g: "un grand pochoir de mur" },
      ]);
      const k = randomInt(2, 4);
      const a = randomInt(3, 7);
      let b = randomInt(4, 9);
      if (b === a) b = a + 1;
      // t1 = le petit, t2 = le grand ; [AB] et [AC] du petit correspondent à
      // [A'B'] et [A'C'] du grand, dans l'ordre des lettres.
      const pAB = `${t1.A}${t1.B}`;
      const pAC = `${t1.A}${t1.C}`;
      const gAB = `${t2.A}${t2.B}`;
      const gAC = `${t2.A}${t2.C}`;
      const reduction = Math.random() < 0.4;
      const reponse = reduction ? b : b * k;
      const intro = `Le triangle ${t2.n} est un agrandissement du triangle ${t1.n} (${t1.A} correspond à ${t2.A}, ${t1.B} à ${t2.B}, ${t1.C} à ${t2.C}).`;
      const text = reduction
        ? randomChoice([
            `${intro} On sait que ${pAB} = ${a} cm, ${gAB} = ${a * k} cm et ${gAC} = ${b * k} cm. Combien mesure ${pAC} ?`,
            `Les triangles ${t1.n}, sur ${ctx.p}, et ${t2.n}, sur ${ctx.g}, sont semblables. ${pAB} = ${a} cm et ${gAB} = ${a * k} cm. Sachant que ${gAC} = ${b * k} cm, calcule ${pAC}.`,
            `Sur ${ctx.g}, on voit le triangle ${t2.n}, avec ${gAB} = ${a * k} cm et ${gAC} = ${b * k} cm. Sur ${ctx.p}, le triangle semblable ${t1.n} a ${pAB} = ${a} cm. Que mesure ${pAC} ?`,
          ])
        : randomChoice([
            `${intro} On sait que ${pAB} = ${a} cm, ${gAB} = ${a * k} cm et ${pAC} = ${b} cm. Combien mesure ${gAC} ?`,
            `Les triangles ${t1.n}, sur ${ctx.p}, et ${t2.n}, sur ${ctx.g}, sont semblables. ${pAB} = ${a} cm et ${gAB} = ${a * k} cm. Sachant que ${pAC} = ${b} cm, calcule ${gAC}.`,
            `Sur ${ctx.p}, le triangle ${t1.n} a ${pAB} = ${a} cm et ${pAC} = ${b} cm. Sur ${ctx.g}, le triangle semblable ${t2.n} a ${gAB} = ${a * k} cm. Que mesure ${gAC} ?`,
          ]);
      return {
        text,
        format: "short",
        expected: [String(reponse)],
        comparator: "number_equal",
        explanation:
          "Définition : dans deux triangles semblables, tous les côtés sont multipliés par le MÊME rapport.\n\n" +
          "Méthode : on trouve le rapport avec le couple de côtés connu, puis on l'applique.\n\n" +
          (reduction
            ? `Calcul : ${a * k} ÷ ${a} = ${k}, donc le rapport d'agrandissement vaut ${k}. On revient au petit en divisant : ${b * k} ÷ ${k} = ${b} cm.\n\n`
            : `Calcul : ${a * k} ÷ ${a} = ${k}, donc le rapport vaut ${k}. Et ${b} × ${k} = ${b * k} cm.\n\n`) +
          `Conclusion : ⭐ c'est exactement l'agrandissement de rapport ${k} — le lien que le BO demande entre la proportionnalité et les configurations géométriques.`,
        canvas: triangle({
          labels: lettres(t1),
          sideLabels: { AB: `${a} cm`, CA: reduction ? "?" : `${b} cm`, BC: "" },
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
      const [t1, t2] = deuxTri();
      const pr = paire(t1, t2);
      const a = randomInt(35, 70);
      const b = randomInt(40, 175 - a - 20);
      const cote = randomInt(4, 9) * pr.f;
      const memeCote = Math.random() < 0.5;
      const correct = memeCote
        ? "égaux : un côté et ses deux angles suffisent"
        : "semblables seulement : la taille n'est pas fixée";
      const angles = `les angles en ${t1.A} et en ${t2.A} mesurent ${a}°, les angles en ${t1.B} et en ${t2.B} mesurent ${b}°`;
      const suite = memeCote
        ? `De plus, ${t1.A}${t1.B} = ${t2.A}${t2.B} = ${cote} ${pr.u}.`
        : "Rien n'est dit sur leurs côtés.";
      const text = randomChoice([
        `${pr.s} On sait que ${angles}. ${suite} Que peut-on affirmer ?`,
        `Dans les triangles ${t1.n} et ${t2.n}, ${angles}. ${suite} Ces triangles sont-ils égaux, ou seulement semblables ?`,
        `${pr.s} ${cap(angles)}. ${suite} Quelle conclusion est juste ?`,
      ]);
      return {
        text,
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
            ? `Calcul : le côté [${t1.A}${t1.B}] de ${cote} ${pr.u}, égal à [${t2.A}${t2.B}], est celui qui touche les deux angles connus : c'est le cas « un côté et les deux angles qui le touchent ».\n\nConclusion : les triangles ${t1.n} et ${t2.n} sont ÉGAUX.`
            : `Calcul : sans aucune longueur, rien ne fixe la taille.\n\nConclusion : ⚠️ les triangles ${t1.n} et ${t2.n} sont SEMBLABLES, et cela ne suffit pas à les dire égaux — l'un peut être dix fois plus grand.`),
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
      const t = tri();
      const type = randomChoice(["angles", "cotes", "juste_cotes", "juste_angles"] as const);
      const p = randomChoice(PROJETS);
      const u = p.u;
      const a = randomInt(40, 70);
      const b = randomInt(40, 70);
      const ecart = randomChoice([-20, -10, 10, 20, 30]);
      const cAng = type === "angles" ? 180 - a - b + ecart : 180 - a - b;
      const c1 = randomInt(4, 7) * p.f;
      const c2 = randomInt(5, 8) * p.f;
      const grand = type === "cotes" ? c1 + c2 + randomInt(1, 3) * p.f : c1 + c2 - p.f;
      let data: string;
      let correct: string;
      if (type === "angles" || type === "juste_angles") {
        data = `des angles de ${a}° en ${t.A}, ${b}° en ${t.B} et ${cAng}° en ${t.C}`;
        correct = type === "angles" ? "impossible : la somme des angles ne fait pas 180°" : "possible";
      } else {
        const [x, y, z] = shuffle([c1, c2, grand]);
        data = `${t.A}${t.B} = ${x} ${u}, ${t.B}${t.C} = ${y} ${u} et ${t.A}${t.C} = ${z} ${u}`;
        correct = type === "cotes" ? "impossible : un côté dépasse la somme des deux autres" : "possible";
      }
      const surAngles = type === "angles" || type === "juste_angles";
      const intro = surAngles ? decor(t) : `Pour ${p.but}, un élève a prévu le triangle ${t.n}.`;
      const text = randomChoice([
        `${intro} ${surAngles ? "Un élève annonce" : "Il annonce"} ${data}. Qu'en penses-tu ?`,
        `${intro} D'après ${surAngles ? "la fiche d'un élève" : "sa fiche"} : ${data}. Ces mesures sont-elles possibles ?`,
        `Un élève décrit le triangle ${t.n} : ${data}. Qu'en penses-tu ?`,
        `${intro} On lit sur un schéma : ${data}. Ces mesures tiennent-elles ?`,
      ]);
      return {
        text,
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
            ? `Calcul : ${a} + ${b} + ${cAng} = ${a + b + cAng}°, au lieu de 180.\n\n`
            : type === "juste_angles"
              ? `Calcul : ${a} + ${b} + ${cAng} = 180°, la somme tombe juste.\n\n`
              : type === "cotes"
                ? `Calcul : le plus grand côté vaut ${grand} ${u}, et ${grand} > ${c1} + ${c2} = ${c1 + c2}.\n\n`
                : `Calcul : le plus grand côté vaut ${grand} ${u}, et ${grand} < ${c1} + ${c2} = ${c1 + c2} : le triangle se referme.\n\n`) +
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
      const [t1, t2] = deuxTri();
      const { A, B, C } = t1;
      const { A: D, B: E, C: F } = t2;
      const [x, y, z] = troisCotes();
      const [al, be, ga] = troisAngles();
      const s1 = randomInt(3, 6);
      const s2 = randomInt(3, 6);
      const L = s1 + s2 + randomInt(1, 4);
      const CCC = "le cas d'égalité « les trois côtés »";
      const CAC = "le cas d'égalité « deux côtés et l'angle compris »";
      const SOMME = "la somme des angles d'un triangle";
      const SEMB = "la définition des triangles semblables";
      const INEG = "l'inégalité triangulaire";
      const cas = randomChoice([
        {
          donnees: `${A}${B} = ${D}${E} = ${x} cm, ${B}${C} = ${E}${F} = ${y} cm et ${A}${C} = ${D}${F} = ${z} cm`,
          but: `que les triangles ${t1.n} et ${t2.n} sont égaux`,
          outil: CCC,
        },
        {
          donnees: `${A}${B} = ${D}${E} = ${x} cm, ${A}${C} = ${D}${F} = ${z} cm et les angles en ${A} et en ${D} mesurent ${al}°`,
          but: `que les triangles ${t1.n} et ${t2.n} sont égaux`,
          outil: CAC,
        },
        {
          donnees: `dans le triangle ${t1.n}, l'angle en ${A} mesure ${al}° et l'angle en ${B} mesure ${be}°`,
          but: `que l'angle en ${C} mesure ${ga}°`,
          outil: SOMME,
        },
        {
          donnees: `les triangles ${t1.n} et ${t2.n} ont des angles de ${al}°, ${be}° et ${ga}° (en ${A} et ${D}, en ${B} et ${E}, en ${C} et ${F})`,
          but: `que ${t2.n} est un agrandissement ou une réduction de ${t1.n}`,
          outil: SEMB,
        },
        {
          donnees: `le triangle ${t1.n} annoncé par un élève a ${A}${B} = ${L} cm, ${A}${C} = ${s1} cm et ${B}${C} = ${s2} cm`,
          but: "que ce triangle n'existe pas",
          outil: INEG,
        },
      ]);
      const text = randomChoice([
        `On sait que ${cas.donnees}. Quelle propriété permet de conclure ${cas.but} ?`,
        `Données : ${cas.donnees}. Pour démontrer ${cas.but}, quel outil faut-il citer ?`,
        `On veut prouver ${cas.but}. On sait que ${cas.donnees}. Sur quelle propriété s'appuie la démonstration ?`,
        `${cap(cas.donnees)}. Quelle propriété faut-il utiliser pour justifier ${cas.but} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(cas.outil, [CCC, CAC, SOMME, SEMB, INEG, "le théorème de Pythagore"]),
        expected: [cas.outil],
        comparator: "mcq_exact",
        explanation:
          "Définition : démontrer, c'est choisir la propriété qui s'applique AUX DONNÉES qu'on a.\n\n" +
          "Méthode : on regarde ce qui est donné — des côtés, des angles, ou les deux — avant de chercher une propriété.\n\n" +
          `Calcul : ici, ${cas.donnees} ; pour conclure ${cas.but}, on utilise ${cas.outil}.\n\n` +
          "Conclusion : ⭐ c'est le geste de la démonstration, et il ne s'apprend qu'en le répétant : les données commandent l'outil, jamais l'inverse.",
      };
    },
  },
];
