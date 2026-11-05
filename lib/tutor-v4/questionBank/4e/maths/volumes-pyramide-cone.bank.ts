// VOLUME D'UNE PYRAMIDE ET D'UN CÔNE (05/11/2026).
//
// Trou du programme de cycle 4 (BO 2020, p. 135) : aucune question ni en 4e ni
// en 3e. Le même jeu de gabarits sert les deux classes (`fabriquerPyramideCone`) ;
// la 3e y ajoute la réduction par une section (voir 3e/maths/volumes-pyramide-cone.bank.ts).
//
// ⛔ Règles du collège : ★1-★2 phrase courte, sans prénom ni contexte ; contexte
// à partir de ★3. Division écrite « ÷ ». Résultats exacts : aucun arrondi demandé.
// ⚠️ Pour le correcteur : les mesures sont TOUJOURS écrites dans le même ordre
// (base avant hauteur) ; il relit le texte dans cet ordre et refait le calcul.

import type { TutorBankItemV4, Solide3DCanvasData } from "@/lib/tutor-v4/types";

const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const net = (n: number) => String(Math.round(n * 1000) / 1000);
export function frVol(n: number): string {
  const [e, d] = net(n).split(".");
  const ent = e.length > 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : e;
  return d ? `${ent},${d}` : ent;
}

function avecUnite(x: number, u: string): string[] {
  const f = frVol(x);
  const l = [`${f} ${u}`];
  if (f.includes(" ")) l.push(`${f.replace(/ /g, "")} ${u}`, f);
  if (/[²³]/.test(u)) l.push(`${f} ${u.replace("²", "2").replace("³", "3")}`);
  if (u === "L") l.push(`${f} litres`);
  return [...new Set(l)];
}

/** Valeur exacte « aπ » : le coefficient seul n'est jamais accepté (décision du 03/10). */
function piAttendus(c: number, u: string): string[] {
  const a = net(c);
  const formes = [`${a}π`, `${a} × π`, `${a} * π`];
  return [
    `${frVol(c)}π ${u}³`,
    ...formes,
    ...[...formes, `${a} pi`].flatMap((f) => [`${f} ${u}³`, `${f} ${u}3`]),
  ].filter((x, i, t) => t.indexOf(x) === i);
}

function qcm(juste: string, faux: string[]) {
  const d = [...new Set(faux)].filter((x) => x !== juste).slice(0, 3);
  return melange([juste, ...d]);
}

const figure = (p: Omit<Solide3DCanvasData, "kind">): Solide3DCanvasData => ({ kind: "solide_3d", ...p });
const figPyramide = (hauteur: number, u: string, base: string) =>
  figure({ solide: "pyramide", dimensions: { hauteur }, labels: { hauteur: `${hauteur} ${u}`, aireBase: base }, highlight: { base: true, hauteur: true }, display: { showLabels: true } });
const figCone = (rayon: number, hauteur: number, u: string) =>
  figure({ solide: "cone", dimensions: { rayon, hauteur }, labels: { rayon: `${rayon} ${u}`, hauteur: `${hauteur} ${u}`, aireBase: "base" }, highlight: { base: false, hauteur: true }, display: { showLabels: true } });

const UNITES = ["cm", "cm", "dm", "m", "mm"] as const;
const DEF_P = "Définition : le volume d’une pyramide est égal à l’aire de sa base × sa hauteur ÷ 3.";
const DEF_C = "Définition : le volume d’un cône de révolution est égal à π × rayon² × hauteur ÷ 3.";

/** Un couple (aire ou carré du côté, hauteur) dont le produit se divise par 3. */
const hauteurDivisible = (facteur: number, min = 3, max = 15) => {
  const l: number[] = [];
  for (let h = min; h <= max; h++) if ((facteur * h) % 3 === 0) l.push(h);
  return un(l);
};

/* ───────────────────────── objets des énoncés à partir de ★3 ───────────────────────── */

type ObjP = { o: string; c: [number, number]; h: [number, number]; u: string };
const OBJETS_PYRAMIDE: ObjP[] = [
  { o: "une bougie en forme de pyramide", c: [4, 9], h: [6, 15], u: "cm" },
  { o: "un presse-papier en verre, en forme de pyramide", c: [5, 9], h: [3, 9], u: "cm" },
  { o: "le toit pyramidal d’un kiosque", c: [3, 8], h: [2, 6], u: "m" },
  { o: "une tente en forme de pyramide", c: [2, 5], h: [2, 3], u: "m" },
  { o: "un tas de sel en forme de pyramide", c: [6, 15], h: [3, 9], u: "m" },
  { o: "un chocolat en forme de pyramide", c: [2, 4], h: [3, 6], u: "cm" },
  { o: "une lampe de chevet en forme de pyramide", c: [10, 20], h: [15, 30], u: "cm" },
  { o: "la pointe d’un obélisque", c: [1, 3], h: [3, 6], u: "m" },
  { o: "un trophée en forme de pyramide", c: [6, 12], h: [9, 21], u: "cm" },
  { o: "une serre de jardin en forme de pyramide", c: [2, 6], h: [3, 6], u: "m" },
  { o: "une boîte à bijoux en forme de pyramide", c: [6, 12], h: [6, 12], u: "cm" },
  { o: "un savon en forme de pyramide", c: [5, 8], h: [3, 9], u: "cm" },
];
type ObjC = { o: string; r: [number, number]; h: [number, number]; u: string };
const OBJETS_CONE: ObjC[] = [
  { o: "un cornet de glace", r: [2, 4], h: [9, 15], u: "cm" },
  { o: "un cône de chantier", r: [10, 20], h: [30, 60], u: "cm" },
  { o: "un chapeau de fête", r: [6, 10], h: [15, 24], u: "cm" },
  { o: "un entonnoir de cuisine", r: [4, 9], h: [6, 15], u: "cm" },
  { o: "un tas de sable conique", r: [2, 6], h: [1, 3], u: "m" },
  { o: "un tipi", r: [2, 3], h: [3, 6], u: "m" },
  { o: "un verre à pied conique", r: [3, 5], h: [6, 12], u: "cm" },
  { o: "un silo au fond conique", r: [1, 3], h: [2, 6], u: "m" },
  { o: "un petit volcan en argile", r: [8, 15], h: [9, 18], u: "cm" },
  { o: "le toit conique d’une tour", r: [2, 5], h: [3, 6], u: "m" },
  { o: "une pointe de crayon", r: [2, 4], h: [6, 12], u: "mm" },
  { o: "un sablier (une de ses moitiés)", r: [3, 5], h: [6, 9], u: "cm" },
];

const tirerPlage = (p: [number, number]) => entre(p[0], p[1]);

/* ───────────────────────── les gabarits ───────────────────────── */

export function fabriquerPyramideCone(niveau: "4e" | "3e"): TutorBankItemV4[] {
  const pref = niveau === "3e" ? "3e_" : "";
  const tpl = (
    micro: "volume_pyramide" | "volume_cone",
    n: number,
    difficulty: number,
    hint: string,
    generate: () => any,
  ): TutorBankItemV4 =>
    ({
      kind: "template",
      id: `${pref}${micro}_tpl_${n}`,
      niveau,
      matiere: "maths",
      notionId: "volume_solide",
      microId: micro,
      difficulty,
      theme: "neutral",
      hint,
      tags: ["volume", micro === "volume_cone" ? "cone" : "pyramide", "template"],
      generate,
    }) as TutorBankItemV4;

  const HINT_P = "Aire de la base × hauteur, puis on divise par 3.";
  const HINT_C = "π × rayon × rayon × hauteur, puis on divise par 3.";

  return [
    /* ===== VOLUME_PYRAMIDE ===== */

    // ★1 : aire de la base et hauteur données.
    tpl("volume_pyramide", 1, 1, HINT_P, () => {
      const u = un(UNITES);
      const A = entre(4, 40) * (Math.random() < 0.5 ? 3 : 1);
      const h = hauteurDivisible(A, 2, 15);
      const V = (A * h) / 3;
      const a2 = `${A} ${u}²`;
      const l = `${h} ${u}`;
      const text = un([
        `Une pyramide a une base d’aire ${a2} et une hauteur de ${l}. Quel est son volume ?`,
        `Calcule le volume d’une pyramide : aire de la base ${a2}, hauteur ${l}.`,
        `Aire de la base : ${a2}. Hauteur : ${l}. Quel est le volume de cette pyramide ?`,
        `Quel est le volume d’une pyramide de base ${a2} et de hauteur ${l} ?`,
        `Pyramide : base de ${a2}, hauteur de ${l}. Calcule son volume.`,
        `La base d’une pyramide mesure ${a2} et sa hauteur ${l}. Donne son volume.`,
        `Donne le volume de cette pyramide : sa base a pour aire ${a2} et sa hauteur vaut ${l}.`,
        `Une pyramide de base ${a2} a une hauteur de ${l}. Calcule son volume.`,
        `Pour cette pyramide, l’aire de la base est ${a2} et la hauteur est ${l}. Quel est le volume ?`,
        `Trouve le volume d’une pyramide dont la base fait ${a2} et la hauteur ${l}.`,
        `Base : ${a2}. Hauteur : ${l}. Calcule le volume de la pyramide.`,
        `Combien vaut le volume d’une pyramide de ${a2} de base et de ${l} de hauteur ?`,
      ]);
      return {
        text,
        format: "short",
        expected: avecUnite(V, `${u}³`),
        comparator: "number_equal",
        canvas: figPyramide(h, u, a2),
        explanation:
          `${DEF_P}\n\nMéthode : on multiplie l’aire de la base par la hauteur, puis on divise par 3.\n\n` +
          `Calcul : ${A} × ${h} = ${frVol(A * h)}, puis ${frVol(A * h)} ÷ 3 = ${frVol(V)}.\n\nConclusion : le volume est ${frVol(V)} ${u}³.`,
      };
    }),

    // ★1 : reconnaître le bon calcul.
    tpl("volume_pyramide", 2, 1, HINT_P, () => {
      const u = un(UNITES);
      const A = entre(5, 60);
      const h = entre(3, 20);
      const juste = `${A} × ${h} ÷ 3`;
      const text = un([
        `Une pyramide a une base de ${A} ${u}² et une hauteur de ${h} ${u}. Quel calcul donne son volume ?`,
        `Quel calcul donne le volume d’une pyramide de base ${A} ${u}² et de hauteur ${h} ${u} ?`,
        `Base : ${A} ${u}². Hauteur : ${h} ${u}. Quel calcul donne le volume de la pyramide ?`,
        `Pour une pyramide de base ${A} ${u}² et de hauteur ${h} ${u}, quel calcul faut-il faire ?`,
        `Choisis le bon calcul du volume : pyramide de base ${A} ${u}², hauteur ${h} ${u}.`,
        `Parmi ces calculs, lequel donne le volume d’une pyramide de base ${A} ${u}² et de hauteur ${h} ${u} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: qcm(juste, [`${A} × ${h}`, `${A} × ${h} ÷ 2`, `${A} + ${h} ÷ 3`, `${A} × 3 ÷ ${h}`]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation:
          `${DEF_P}\n\nMéthode : on garde le produit aire × hauteur, sans oublier le ÷ 3 (sinon c’est le volume d’un prisme).\n\n` +
          `Calcul : ${juste}.\n\nConclusion : le bon calcul est ${juste}.`,
      };
    }),

    // ★2 : base carrée.
    tpl("volume_pyramide", 3, 2, "Commence par l’aire de la base : côté × côté.", () => {
      const u = un(UNITES);
      const c = entre(2, 12);
      const h = hauteurDivisible(c * c, 3, 18);
      const V = (c * c * h) / 3;
      const text = un([
        `Une pyramide a une base carrée de côté ${c} ${u} et une hauteur de ${h} ${u}. Quel est son volume ?`,
        `Calcule le volume d’une pyramide à base carrée : côté ${c} ${u}, hauteur ${h} ${u}.`,
        `Base carrée de ${c} ${u} de côté, hauteur de ${h} ${u} : quel est le volume de la pyramide ?`,
        `La base d’une pyramide est un carré de ${c} ${u} de côté. Sa hauteur est ${h} ${u}. Donne son volume.`,
        `Quel est le volume d’une pyramide dont la base est un carré de côté ${c} ${u} et la hauteur ${h} ${u} ?`,
        `Côté du carré de base : ${c} ${u}. Hauteur de la pyramide : ${h} ${u}. Calcule le volume.`,
        `Trouve le volume d’une pyramide de base carrée (côté ${c} ${u}) et de hauteur ${h} ${u}.`,
        `Pyramide à base carrée, côté ${c} ${u}, hauteur ${h} ${u}. Combien vaut son volume ?`,
      ]);
      return {
        text,
        format: "short",
        expected: avecUnite(V, `${u}³`),
        comparator: "number_equal",
        canvas: figPyramide(h, u, `côté ${c} ${u}`),
        explanation:
          `${DEF_P}\n\nMéthode : la base est un carré, son aire est côté × côté.\n\n` +
          `Calcul : ${c} × ${c} = ${c * c}, puis ${c * c} × ${h} ÷ 3 = ${frVol(V)}.\n\nConclusion : le volume est ${frVol(V)} ${u}³.`,
      };
    }),

    // ★2 : base rectangulaire.
    tpl("volume_pyramide", 4, 2, "Commence par l’aire de la base : longueur × largeur.", () => {
      const u = un(UNITES);
      const L = entre(4, 12);
      const l = entre(2, L - 1);
      const h = hauteurDivisible(L * l, 3, 18);
      const V = (L * l * h) / 3;
      const text = un([
        `Une pyramide a une base rectangulaire de ${L} ${u} sur ${l} ${u} et une hauteur de ${h} ${u}. Quel est son volume ?`,
        `Calcule le volume d’une pyramide : base rectangle de ${L} ${u} sur ${l} ${u}, hauteur ${h} ${u}.`,
        `La base d’une pyramide est un rectangle de ${L} ${u} sur ${l} ${u}. Sa hauteur est ${h} ${u}. Donne son volume.`,
        `Quel est le volume d’une pyramide de base ${L} ${u} × ${l} ${u} et de hauteur ${h} ${u} ?`,
        `Base : rectangle de ${L} ${u} sur ${l} ${u}. Hauteur : ${h} ${u}. Calcule le volume de la pyramide.`,
        `Trouve le volume d’une pyramide à base rectangulaire (${L} ${u} sur ${l} ${u}), de hauteur ${h} ${u}.`,
      ]);
      return {
        text,
        format: "short",
        expected: avecUnite(V, `${u}³`),
        comparator: "number_equal",
        canvas: figPyramide(h, u, `${L} ${u} × ${l} ${u}`),
        explanation:
          `${DEF_P}\n\nMéthode : la base est un rectangle, son aire est longueur × largeur.\n\n` +
          `Calcul : ${L} × ${l} = ${L * l}, puis ${L * l} × ${h} ÷ 3 = ${frVol(V)}.\n\nConclusion : le volume est ${frVol(V)} ${u}³.`,
      };
    }),

    // ★2 : le tiers du prisme.
    tpl("volume_pyramide", 5, 2, "Une pyramide remplit le tiers d’un prisme de même base et de même hauteur.", () => {
      const u = un(UNITES);
      const pyr = entre(5, 60);
      const pri = pyr * 3;
      const versPyr = Math.random() < 0.6;
      const text = versPyr
        ? un([
            `Un prisme et une pyramide ont la même base et la même hauteur. Le prisme a un volume de ${pri} ${u}³. Quel est le volume de la pyramide ?`,
            `Même base, même hauteur : le prisme fait ${pri} ${u}³. Combien fait la pyramide ?`,
            `Un prisme de ${pri} ${u}³ et une pyramide ont la même base et la même hauteur. Donne le volume de la pyramide.`,
            `Prisme : ${pri} ${u}³. Pyramide de même base et de même hauteur : quel volume ?`,
          ])
        : un([
            `Une pyramide et un prisme ont la même base et la même hauteur. La pyramide a un volume de ${pyr} ${u}³. Quel est le volume du prisme ?`,
            `Même base, même hauteur : la pyramide fait ${pyr} ${u}³. Combien fait le prisme ?`,
            `Une pyramide de ${pyr} ${u}³ et un prisme ont la même base et la même hauteur. Donne le volume du prisme.`,
            `Pyramide : ${pyr} ${u}³. Prisme de même base et de même hauteur : quel volume ?`,
          ]);
      const rep = versPyr ? pyr : pri;
      return {
        text,
        format: "short",
        expected: avecUnite(rep, `${u}³`),
        comparator: "number_equal",
        explanation:
          `Définition : à base et hauteur égales, le volume de la pyramide est le tiers de celui du prisme.\n\n` +
          `Méthode : ${versPyr ? "on divise le volume du prisme par 3" : "on multiplie le volume de la pyramide par 3"}.\n\n` +
          `Calcul : ${versPyr ? `${pri} ÷ 3 = ${pyr}` : `${pyr} × 3 = ${pri}`}.\n\nConclusion : le volume est ${rep} ${u}³.`,
      };
    }),

    // ★3 : contexte, base carrée.
    tpl("volume_pyramide", 6, 3, "Aire du carré de base × hauteur ÷ 3.", () => {
      const O = un(OBJETS_PYRAMIDE);
      const c = tirerPlage(O.c);
      const u = O.u;
      const candidats: number[] = [];
      for (let h = O.h[0]; h <= O.h[1]; h++) if ((c * c * h) % 3 === 0) candidats.push(h);
      const h = candidats.length ? un(candidats) : O.h[0] * 3;
      const V = (c * c * h) / 3;
      const objet = O.o;
      const dObjet = /^une? /.test(objet) ? `d’${objet}` : objet.startsWith("la ") ? `de ${objet}` : `du ${objet.slice(3)}`;
      const text = un([
        `${cap(objet)} a une base carrée de ${c} ${u} de côté et une hauteur de ${h} ${u}. Quel est son volume ?`,
        `On modélise ${objet} : base carrée de côté ${c} ${u}, hauteur ${h} ${u}. Calcule son volume.`,
        `Quel est le volume ${dObjet}, de base carrée de côté ${c} ${u} et de hauteur ${h} ${u} ?`,
        `La base ${dObjet} est un carré de ${c} ${u} de côté et sa hauteur vaut ${h} ${u}. Quel volume occupe cet objet ?`,
      ]);
      return {
        text,
        format: "short",
        expected: avecUnite(V, `${u}³`),
        comparator: "number_equal",
        canvas: figPyramide(h, u, `côté ${c} ${u}`),
        explanation:
          `${DEF_P}\n\nMéthode : on calcule l’aire du carré, on multiplie par la hauteur, on divise par 3.\n\n` +
          `Calcul : ${c} × ${c} = ${c * c}, puis ${c * c} × ${h} ÷ 3 = ${frVol(V)}.\n\nConclusion : le volume est ${frVol(V)} ${u}³.`,
      };
    }),

    // ★3 : base triangulaire.
    tpl("volume_pyramide", 7, 3, "Aire du triangle : base × hauteur du triangle ÷ 2. Puis × hauteur de la pyramide ÷ 3.", () => {
      const u = un(["cm", "cm", "dm", "m"]);
      const b = 2 * entre(2, 9);
      const t = entre(2, 12);
      const A = (b * t) / 2;
      const h = hauteurDivisible(A, 3, 18);
      const V = (A * h) / 3;
      const objet = un(["Un dé à quatre faces", "Un berlingot", "Un tétraèdre en bois", "Une pyramide en carton", "Une pièce de puzzle 3D", "Un sachet de thé pyramidal"]);
      const text = un([
        `${objet} a la forme d’une pyramide à base triangulaire. Le triangle de base a un côté de ${b} ${u} et une hauteur relative à ce côté de ${t} ${u}. La hauteur de la pyramide est ${h} ${u}. Quel est son volume ?`,
        `${objet} est une pyramide dont la base est un triangle (côté ${b} ${u}, hauteur relative ${t} ${u}). La pyramide mesure ${h} ${u} de haut. Calcule son volume.`,
      ]);
      return {
        text,
        format: "short",
        expected: avecUnite(V, `${u}³`),
        comparator: "number_equal",
        canvas: { ...figPyramide(h, u, "base triangulaire"), baseTriangulaire: true },
        explanation:
          `${DEF_P}\n\nMéthode : on calcule d’abord l’aire du triangle de base.\n\n` +
          `Calcul : ${b} × ${t} ÷ 2 = ${A}, puis ${A} × ${h} ÷ 3 = ${frVol(V)}.\n\nConclusion : le volume est ${frVol(V)} ${u}³.`,
      };
    }),

    // ★3 : combien de pyramides pour remplir le prisme.
    tpl("volume_pyramide", 8, 3, "Une pyramide remplit le tiers d’un prisme de même base et de même hauteur.", () => {
      const k = entre(1, 4);
      const u = un(["cm", "dm"]);
      const A = entre(10, 80);
      const h = entre(3, 12);
      const hP = h * k;
      const n = 3 * k;
      const objet = un(["un moule à gâteau", "un bac à sable", "un récipient", "un aquarium", "une boîte", "un pot"]);
      const verseur = un(["un verre doseur en forme de pyramide", "un gobelet pyramidal", "une pelle-pyramide de jeu", "un moule pyramidal"]);
      const text = un([
        `On remplit ${objet} en forme de prisme avec ${verseur}. Ils ont la même base de ${A} ${u}². La pyramide mesure ${h} ${u} de haut et le prisme ${hP} ${u}. Combien de fois faut-il verser ?`,
        `${cap(objet)} est un prisme de base ${A} ${u}² : pour le remplir, on utilise ${verseur} de même base. La pyramide a une hauteur de ${h} ${u} et le prisme de ${hP} ${u}. Combien de versements faut-il ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `Définition : à base égale, le volume du prisme est aire × hauteur, celui de la pyramide aire × hauteur ÷ 3.\n\n` +
          `Méthode : on divise le volume du prisme par celui de la pyramide.\n\n` +
          `Calcul : ${A} × ${hP} = ${A * hP} et ${A} × ${h} ÷ 3 = ${frVol((A * h) / 3)}, puis ${A * hP} ÷ ${frVol((A * h) / 3)} = ${n}.\n\nConclusion : il faut verser ${n} fois.`,
      };
    }),

    // ★4 : retrouver la hauteur.
    tpl("volume_pyramide", 9, 4, "V = aire × h ÷ 3, donc h = 3 × V ÷ aire.", () => {
      const u = un(["cm", "dm", "m"]);
      const A = entre(4, 30);
      const h = entre(3, 15);
      const V3 = A * h;
      if (V3 % 3 !== 0) {
        const A2 = A * 3;
        const V = h * A;
        return retrouver(A2, h, V, u);
      }
      return retrouver(A, h, V3 / 3, u);
    }),

    // ★4 : maison = pavé + toit en pyramide.
    tpl("volume_pyramide", 10, 4, "Volume du pavé + volume de la pyramide.", () => {
      const c = entre(3, 9);
      const H = entre(2, 6);
      const h = hauteurDivisible(c * c, 2, 6);
      const u = "m";
      const Vp = c * c * H;
      const Vt = (c * c * h) / 3;
      const objet = un(["Une maison", "Un chalet", "Un kiosque", "Un abri de jardin", "Une tour de guet", "Un pigeonnier"]);
      const text = un([
        `${objet} est formé d’un pavé à base carrée de ${c} ${u} de côté et de ${H} ${u} de haut, surmonté d’un toit en pyramide de ${h} ${u} de haut, de même base. Quel est son volume total ?`,
        `${objet} : une partie basse en pavé (base carrée de côté ${c} ${u}, hauteur ${H} ${u}), un toit en pyramide de même base (hauteur ${h} ${u}). Calcule le volume total.`,
      ]);
      return {
        text: objet.startsWith("Une") ? text.replace("est formé d’", "est formée d’") : text,
        format: "short",
        expected: avecUnite(Vp + Vt, "m³"),
        comparator: "number_equal",
        explanation:
          `Définition : le volume d’un solide composé est la somme des volumes de ses parties.\n\n` +
          `Méthode : on ajoute le volume du pavé et celui de la pyramide.\n\n` +
          `Calcul : ${c} × ${c} × ${H} = ${Vp} et ${c} × ${c} × ${h} ÷ 3 = ${Vt}, puis ${Vp} + ${Vt} = ${Vp + Vt}.\n\nConclusion : le volume total est ${Vp + Vt} m³.`,
      };
    }),

    // ★4 : effet d'un changement de dimension.
    tpl("volume_pyramide", 11, 4, "Le côté de la base compte deux fois dans le calcul, la hauteur une seule fois.", () => {
      const u = un(["cm", "dm", "m"]);
      const V = entre(4, 50);
      const cas = un([
        { t: "On double sa hauteur sans changer sa base.", k: 2, m: "la hauteur compte une fois : le volume est multiplié par 2" },
        { t: "On triple sa hauteur sans changer sa base.", k: 3, m: "la hauteur compte une fois : le volume est multiplié par 3" },
        { t: "On double le côté de sa base carrée sans changer sa hauteur.", k: 4, m: "le côté compte deux fois (côté × côté) : le volume est multiplié par 2 × 2 = 4" },
        { t: "On triple le côté de sa base carrée sans changer sa hauteur.", k: 9, m: "le côté compte deux fois (côté × côté) : le volume est multiplié par 3 × 3 = 9" },
      ]);
      const debut = un([
        `Une pyramide à base carrée a un volume de ${V} ${u}³.`,
        `Le volume d’une pyramide à base carrée est ${V} ${u}³.`,
        `On part d’une pyramide à base carrée de ${V} ${u}³.`,
      ]);
      const fin = un(["Quel est le nouveau volume ?", "Que vaut maintenant son volume ?", "Combien vaut son volume maintenant ?"]);
      return {
        text: `${debut} ${cas.t} ${fin}`,
        format: "short",
        expected: avecUnite(V * cas.k, `${u}³`),
        comparator: "number_equal",
        explanation:
          `${DEF_P}\n\nMéthode : ${cas.m}.\n\nCalcul : ${V} × ${cas.k} = ${V * cas.k}.\n\nConclusion : le nouveau volume est ${V * cas.k} ${u}³.`,
      };
    }),

    /* ===== VOLUME_CONE ===== */

    // ★1 : rayon et hauteur, valeur exacte.
    tpl("volume_cone", 1, 1, HINT_C, () => {
      const u = un(UNITES);
      const r = entre(2, 12);
      const h = hauteurDivisible(r * r, 3, 18);
      const a = (r * r * h) / 3;
      const debut = un([
        `Un cône a un rayon de ${r} ${u} et une hauteur de ${h} ${u}.`,
        `Rayon : ${r} ${u}. Hauteur : ${h} ${u}.`,
        `Voici un cône de rayon ${r} ${u} et de hauteur ${h} ${u}.`,
        `Le rayon de la base d’un cône est ${r} ${u} et sa hauteur est ${h} ${u}.`,
        `Cône : rayon ${r} ${u}, hauteur ${h} ${u}.`,
        `La base d’un cône a pour rayon ${r} ${u}. Sa hauteur vaut ${h} ${u}.`,
      ]);
      const fin = un([
        "Calcule son volume, sous la forme aπ.",
        "Quel est son volume ? Écris-le sous la forme aπ.",
        "Donne la valeur exacte du volume, sous la forme aπ.",
        "Écris le volume sous la forme aπ.",
      ]);
      return {
        text: `${debut} ${fin}`,
        format: "short",
        expected: piAttendus(a, u),
        comparator: "exact_text",
        canvas: figCone(r, h, u),
        explanation:
          `${DEF_C}\n\nMéthode : on calcule rayon × rayon × hauteur, on divise par 3 et on garde π.\n\n` +
          `Calcul : ${r} × ${r} × ${h} = ${r * r * h}, puis ${r * r * h} ÷ 3 = ${frVol(a)}.\n\nConclusion : le volume est ${frVol(a)}π ${u}³.`,
      };
    }),

    // ★1 : le bon calcul.
    tpl("volume_cone", 2, 1, HINT_C, () => {
      const u = un(UNITES);
      const r = entre(2, 12);
      const h = entre(3, 20);
      const juste = `π × ${r} × ${r} × ${h} ÷ 3`;
      const text = un([
        `Un cône a un rayon de ${r} ${u} et une hauteur de ${h} ${u}. Quel calcul donne son volume ?`,
        `Quel calcul donne le volume d’un cône de rayon ${r} ${u} et de hauteur ${h} ${u} ?`,
        `Rayon : ${r} ${u}. Hauteur : ${h} ${u}. Quel calcul donne le volume du cône ?`,
        `Choisis le bon calcul du volume : cône de rayon ${r} ${u}, hauteur ${h} ${u}.`,
        `Parmi ces calculs, lequel donne le volume d’un cône de rayon ${r} ${u} et de hauteur ${h} ${u} ?`,
        `Pour un cône de rayon ${r} ${u} et de hauteur ${h} ${u}, quel calcul faut-il faire ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: qcm(juste, [`π × ${r} × ${r} × ${h}`, `π × ${r} × ${h} ÷ 3`, `2 × π × ${r} × ${h} ÷ 3`, `π × ${r} × ${r} × ${h} ÷ 2`]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation:
          `${DEF_C}\n\nMéthode : le rayon est multiplié par lui-même, et on n’oublie pas le ÷ 3 (sinon c’est le volume d’un cylindre).\n\n` +
          `Calcul : ${juste}.\n\nConclusion : le bon calcul est ${juste}.`,
      };
    }),

    // ★2 : diamètre donné.
    tpl("volume_cone", 3, 2, "Le rayon est la moitié du diamètre.", () => {
      const u = un(UNITES);
      const r = entre(2, 10);
      const d = 2 * r;
      const h = hauteurDivisible(r * r, 3, 18);
      const a = (r * r * h) / 3;
      const debut = un([
        `Un cône a une base de diamètre ${d} ${u} et une hauteur de ${h} ${u}.`,
        `Diamètre de la base : ${d} ${u}. Hauteur : ${h} ${u}.`,
        `La base d’un cône mesure ${d} ${u} de diamètre. Sa hauteur vaut ${h} ${u}.`,
        `Cône : diamètre ${d} ${u}, hauteur ${h} ${u}.`,
      ]);
      const fin = un([
        "Calcule son volume, sous la forme aπ.",
        "Quel est son volume ? Écris-le sous la forme aπ.",
        "Donne la valeur exacte du volume, sous la forme aπ.",
        "Écris le volume sous la forme aπ.",
      ]);
      return {
        text: `${debut} ${fin}`,
        format: "short",
        expected: piAttendus(a, u),
        comparator: "exact_text",
        canvas: figCone(r, h, u),
        explanation:
          `${DEF_C}\n\nMéthode : on prend d’abord le rayon, ${d} ÷ 2 = ${r}.\n\n` +
          `Calcul : ${r} × ${r} × ${h} ÷ 3 = ${frVol(a)}.\n\nConclusion : le volume est ${frVol(a)}π ${u}³.`,
      };
    }),

    // ★2 : avec π ≈ 3,14.
    tpl("volume_cone", 4, 2, "Remplace π par 3,14 à la fin du calcul.", () => {
      const u = un(UNITES);
      const r = entre(1, 10);
      const h = hauteurDivisible(r * r, 3, 15);
      const a = (r * r * h) / 3;
      const V = Math.round(a * 314) / 100;
      const debut = un([
        `Un cône a un rayon de ${r} ${u} et une hauteur de ${h} ${u}.`,
        `Rayon : ${r} ${u}. Hauteur : ${h} ${u}.`,
        `Voici un cône de rayon ${r} ${u} et de hauteur ${h} ${u}.`,
        `Cône : rayon ${r} ${u}, hauteur ${h} ${u}.`,
      ]);
      const fin = un([
        "Calcule son volume en prenant π ≈ 3,14.",
        "Avec π ≈ 3,14, quel est son volume ?",
        "Prends π ≈ 3,14 et donne son volume.",
      ]);
      return {
        text: `${debut} ${fin}`,
        format: "short",
        expected: avecUnite(V, `${u}³`),
        comparator: "number_equal",
        canvas: figCone(r, h, u),
        explanation:
          `${DEF_C}\n\nMéthode : on calcule rayon × rayon × hauteur ÷ 3, puis on multiplie par 3,14.\n\n` +
          `Calcul : ${r} × ${r} × ${h} ÷ 3 = ${frVol(a)}, puis ${frVol(a)} × 3,14 = ${frVol(V)}.\n\nConclusion : le volume est ${frVol(V)} ${u}³.`,
      };
    }),

    // ★2 : le tiers du cylindre.
    tpl("volume_cone", 5, 2, "Un cône remplit le tiers d’un cylindre de même base et de même hauteur.", () => {
      const u = un(UNITES);
      const c = entre(5, 60);
      const cy = c * 3;
      const versCone = Math.random() < 0.6;
      const text = versCone
        ? un([
            `Un cylindre et un cône ont la même base et la même hauteur. Le cylindre a un volume de ${cy} ${u}³. Quel est le volume du cône ?`,
            `Même base, même hauteur : le cylindre fait ${cy} ${u}³. Combien fait le cône ?`,
            `Un cylindre de ${cy} ${u}³ et un cône ont la même base et la même hauteur. Donne le volume du cône.`,
            `Cylindre : ${cy} ${u}³. Cône de même base et de même hauteur : quel volume ?`,
          ])
        : un([
            `Un cône et un cylindre ont la même base et la même hauteur. Le cône a un volume de ${c} ${u}³. Quel est le volume du cylindre ?`,
            `Même base, même hauteur : le cône fait ${c} ${u}³. Combien fait le cylindre ?`,
            `Un cône de ${c} ${u}³ et un cylindre ont la même base et la même hauteur. Donne le volume du cylindre.`,
            `Cône : ${c} ${u}³. Cylindre de même base et de même hauteur : quel volume ?`,
          ]);
      const rep = versCone ? c : cy;
      return {
        text,
        format: "short",
        expected: avecUnite(rep, `${u}³`),
        comparator: "number_equal",
        explanation:
          `Définition : à base et hauteur égales, le volume du cône est le tiers de celui du cylindre.\n\n` +
          `Méthode : ${versCone ? "on divise le volume du cylindre par 3" : "on multiplie le volume du cône par 3"}.\n\n` +
          `Calcul : ${versCone ? `${cy} ÷ 3 = ${c}` : `${c} × 3 = ${cy}`}.\n\nConclusion : le volume est ${rep} ${u}³.`,
      };
    }),

    // ★3 : contexte, valeur exacte.
    tpl("volume_cone", 6, 3, HINT_C, () => {
      const O = un(OBJETS_CONE);
      const r = tirerPlage(O.r);
      const u = O.u;
      const cand: number[] = [];
      for (let h = O.h[0]; h <= O.h[1]; h++) if ((r * r * h) % 3 === 0) cand.push(h);
      const h = cand.length ? un(cand) : O.h[0] * 3;
      const a = (r * r * h) / 3;
      const objet = O.o;
      const dObjet = /^une? /.test(objet) ? `d’${objet}` : `du ${objet.slice(3)}`;
      const text = un([
        `On modélise ${objet} par un cône de rayon ${r} ${u} et de hauteur ${h} ${u}. Quel est son volume, sous la forme aπ ?`,
        `${cap(objet)} a la forme d’un cône : rayon ${r} ${u}, hauteur ${h} ${u}. Donne son volume exact, sous la forme aπ.`,
        `Quel est le volume ${dObjet}, de rayon ${r} ${u} et de hauteur ${h} ${u} ? Écris-le sous la forme aπ.`,
      ]);
      return {
        text,
        format: "short",
        expected: piAttendus(a, u),
        comparator: "exact_text",
        canvas: figCone(r, h, u),
        explanation:
          `${DEF_C}\n\nMéthode : on calcule rayon × rayon × hauteur, on divise par 3 et on garde π.\n\n` +
          `Calcul : ${r} × ${r} × ${h} ÷ 3 = ${frVol(a)}.\n\nConclusion : le volume est ${frVol(a)}π ${u}³.`,
      };
    }),

    // ★3 : contenance en litres (1 dm³ = 1 L).
    tpl("volume_cone", 7, 3, "1 dm³ = 1 L.", () => {
      const r = entre(2, 6);
      const h = hauteurDivisible(r * r, 3, 12);
      const a = (r * r * h) / 3;
      const V = Math.round(a * 314) / 100;
      const objet = un(["Un entonnoir industriel", "Un seau conique", "Une trémie de jardin", "Un bac à compost conique", "Une cuve conique", "Un réservoir conique"]);
      const text = un([
        `${objet} a un rayon de ${r} dm et une hauteur de ${h} dm. Combien de litres peut-il contenir ? Prends π ≈ 3,14.`,
        `${objet} : rayon ${r} dm, hauteur ${h} dm. Avec π ≈ 3,14, quelle est sa contenance en litres ?`,
      ]);
      return {
        text: objet.startsWith("Une") ? text.replace("peut-il", "peut-elle") : text,
        format: "short",
        expected: avecUnite(V, "L"),
        comparator: "number_equal",
        canvas: figCone(r, h, "dm"),
        explanation:
          `${DEF_C}\n\nMéthode : on calcule le volume en dm³, et 1 dm³ = 1 L.\n\n` +
          `Calcul : ${r} × ${r} × ${h} ÷ 3 = ${frVol(a)}, puis ${frVol(a)} × 3,14 = ${frVol(V)}.\n\nConclusion : la contenance est ${frVol(V)} L.`,
      };
    }),

    // ★3 : combien de cônes pour remplir un cylindre.
    tpl("volume_cone", 8, 3, "Un cône remplit le tiers d’un cylindre de même base et de même hauteur.", () => {
      const k = entre(1, 4);
      const r = entre(2, 8);
      const h = entre(3, 12);
      const hC = h * k;
      const n = 3 * k;
      const contenant = un(["un verre cylindrique", "un pot cylindrique", "une casserole cylindrique", "un seau cylindrique", "un moule cylindrique", "une boîte cylindrique"]);
      const dose = un(["un verre doseur conique", "un cornet", "une dose conique", "un petit entonnoir bouché"]);
      const text = un([
        `On remplit ${contenant} avec ${dose}. Les deux ont le même rayon, ${r} cm. Le cône mesure ${h} cm de haut et le cylindre ${hC} cm. Combien de fois faut-il verser ?`,
        `Pour remplir ${contenant}, on utilise ${dose} de même rayon (${r} cm). Le cône a une hauteur de ${h} cm et le cylindre de ${hC} cm. Combien de versements faut-il ?`,
      ]);
      const aCyl = r * r * hC;
      return {
        text,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          `Définition : le cylindre a pour volume π × r² × h, le cône π × r² × h ÷ 3.\n\n` +
          `Méthode : on divise le volume du cylindre par celui du cône.\n\n` +
          `Calcul : ${aCyl}π ÷ (${r * r * h}π ÷ 3) = ${n}.\n\nConclusion : il faut verser ${n} fois.`,
      };
    }),

    // ★4 : retrouver la hauteur.
    tpl("volume_cone", 9, 4, "V = π × r² × h ÷ 3, donc h = 3 × V ÷ (π × r²).", () => {
      const u = un(["cm", "dm", "m"]);
      const r = entre(2, 9);
      const h = hauteurDivisible(r * r, 3, 18);
      const a = (r * r * h) / 3;
      const text = un([
        `Un cône a un volume de ${frVol(a)}π ${u}³ et un rayon de ${r} ${u}. Quelle est sa hauteur ?`,
        `Volume d’un cône : ${frVol(a)}π ${u}³. Rayon : ${r} ${u}. Calcule sa hauteur.`,
        `Le volume d’un cône vaut ${frVol(a)}π ${u}³ et sa base a pour rayon ${r} ${u}. Trouve sa hauteur.`,
        `Quelle hauteur a un cône de volume ${frVol(a)}π ${u}³ et de rayon ${r} ${u} ?`,
        `On sait qu’un cône fait ${frVol(a)}π ${u}³, avec un rayon de ${r} ${u}. Donne sa hauteur.`,
        `Un cône de ${frVol(a)}π ${u}³ a pour rayon ${r} ${u}. Combien mesure sa hauteur ?`,
      ]);
      return {
        text,
        format: "short",
        expected: avecUnite(h, u),
        comparator: "number_equal",
        explanation:
          `${DEF_C}\n\nMéthode : on multiplie le volume par 3, puis on divise par r².\n\n` +
          `Calcul : ${frVol(a)} × 3 = ${frVol(a * 3)}, puis ${frVol(a * 3)} ÷ ${r * r} = ${h}.\n\nConclusion : la hauteur est ${h} ${u}.`,
      };
    }),

    // ★4 : cylindre + cône.
    tpl("volume_cone", 10, 4, "Volume du cylindre + volume du cône.", () => {
      const r = entre(2, 6);
      const H = entre(4, 15);
      const h = hauteurDivisible(r * r, 3, 12);
      const Vc = r * r * H;
      const Vk = (r * r * h) / 3;
      const objet = un([["Une fusée", "formée"], ["Une tour", "formée"], ["Un crayon géant", "formé"], ["Un phare en maquette", "formé"], ["Un silo", "formé"], ["Une bouteille décorative", "formée"]]);
      const text = un([
        `${objet[0]} est ${objet[1]} d’un cylindre de rayon ${r} cm et de hauteur ${H} cm, surmonté d’un cône de même rayon et de hauteur ${h} cm. Quel est son volume total, sous la forme aπ ?`,
        `${objet[0]} : un cylindre (rayon ${r} cm, hauteur ${H} cm) et, au-dessus, un cône de même rayon (hauteur ${h} cm). Donne le volume total sous la forme aπ.`,
      ]);
      return {
        text,
        format: "short",
        expected: piAttendus(Vc + Vk, "cm"),
        comparator: "exact_text",
        explanation:
          `Définition : le volume d’un solide composé est la somme des volumes de ses parties.\n\n` +
          `Méthode : on ajoute le volume du cylindre et celui du cône.\n\n` +
          `Calcul : ${r} × ${r} × ${H} = ${Vc} et ${r} × ${r} × ${h} ÷ 3 = ${Vk}, puis ${Vc} + ${Vk} = ${Vc + Vk}.\n\nConclusion : le volume total est ${frVol(Vc + Vk)}π cm³.`,
      };
    }),

    // ★4 : effet d'un changement de dimension.
    tpl("volume_cone", 11, 4, "Le rayon compte deux fois dans le calcul, la hauteur une seule fois.", () => {
      const u = un(["cm", "dm", "m"]);
      const V = entre(4, 50);
      const cas = un([
        { t: "On double sa hauteur sans changer son rayon.", k: 2, m: "la hauteur compte une fois : le volume est multiplié par 2" },
        { t: "On triple sa hauteur sans changer son rayon.", k: 3, m: "la hauteur compte une fois : le volume est multiplié par 3" },
        { t: "On double son rayon sans changer sa hauteur.", k: 4, m: "le rayon compte deux fois (r × r) : le volume est multiplié par 2 × 2 = 4" },
        { t: "On triple son rayon sans changer sa hauteur.", k: 9, m: "le rayon compte deux fois (r × r) : le volume est multiplié par 3 × 3 = 9" },
      ]);
      const debut = un([`Un cône a un volume de ${V} ${u}³.`, `Le volume d’un cône est ${V} ${u}³.`, `On part d’un cône de ${V} ${u}³.`]);
      const fin = un(["Quel est le nouveau volume ?", "Que vaut maintenant son volume ?", "Combien vaut son volume maintenant ?"]);
      return {
        text: `${debut} ${cas.t} ${fin}`,
        format: "short",
        expected: avecUnite(V * cas.k, `${u}³`),
        comparator: "number_equal",
        explanation:
          `${DEF_C}\n\nMéthode : ${cas.m}.\n\nCalcul : ${V} × ${cas.k} = ${V * cas.k}.\n\nConclusion : le nouveau volume est ${V * cas.k} ${u}³.`,
      };
    }),
  ];

  function retrouver(A: number, h: number, V: number, u: string) {
    const text = un([
      `Une pyramide a un volume de ${V} ${u}³ et une base de ${A} ${u}². Quelle est sa hauteur ?`,
      `Volume d’une pyramide : ${V} ${u}³. Aire de sa base : ${A} ${u}². Calcule sa hauteur.`,
      `Le volume d’une pyramide vaut ${V} ${u}³ et l’aire de sa base ${A} ${u}². Trouve sa hauteur.`,
      `Quelle hauteur a une pyramide de ${V} ${u}³, dont la base mesure ${A} ${u}² ?`,
      `On sait qu’une pyramide fait ${V} ${u}³ avec une base de ${A} ${u}². Donne sa hauteur.`,
      `Une pyramide de ${V} ${u}³ a pour base ${A} ${u}². Combien mesure sa hauteur ?`,
    ]);
    return {
      text,
      format: "short",
      expected: avecUnite(h, u),
      comparator: "number_equal",
      explanation:
        `${DEF_P}\n\nMéthode : on multiplie le volume par 3, puis on divise par l’aire de la base.\n\n` +
        `Calcul : ${V} × 3 = ${V * 3}, puis ${V * 3} ÷ ${A} = ${h}.\n\nConclusion : la hauteur est ${h} ${u}.`,
    };
  }
}

export const volumesPyramideConeBank = fabriquerPyramideCone("4e");
