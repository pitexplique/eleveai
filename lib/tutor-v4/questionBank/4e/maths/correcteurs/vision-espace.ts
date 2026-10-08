import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE vision-espace.bank.ts (notion vision_espace, 08/10/2026).
// Le correcteur a SA PROPRE connaissance des sept solides du BO (faces, arêtes,
// sommets, bases, vues, patrons, sections) et SA PROPRE table « objet → solide »
// (une boîte de conserve est un cylindre…). Il retrouve le solide dans le TEXTE
// (son nom, ou l'objet) ou dans le DESSIN (`solide_3d`, `section_solide`), refait
// le raisonnement, et vérifie qu'AUCUN leurre n'est aussi juste — un cube EST un
// pavé droit, un pavé droit EST un prisme droit, un carré EST un rectangle et un
// losange. Vide = juste.

type Q = TutorGeneratedQuestionV4;
type S = "cube" | "pave_droit" | "prisme" | "cylindre" | "cone" | "boule" | "pyramide";

const NOM: Record<S, string> = {
  cube: "un cube", pave_droit: "un pavé droit", prisme: "un prisme droit", cylindre: "un cylindre",
  cone: "un cône", boule: "une boule", pyramide: "une pyramide",
};
const PAR_NOM = Object.fromEntries(Object.entries(NOM).map(([k, v]) => [v, k as S])) as Record<string, S>;

/** Les noms qui conviennent AUSSI à un solide (inclusions : cube ⊂ pavé ⊂ prisme droit). */
const NOMS_JUSTES: Record<S, string[]> = {
  cube: ["un cube", "un pavé droit", "un prisme droit"],
  pave_droit: ["un pavé droit", "un prisme droit"],
  prisme: ["un prisme droit"],
  cylindre: ["un cylindre"],
  cone: ["un cône"],
  boule: ["une boule"],
  pyramide: ["une pyramide"],
};

/** Ce qui distingue les solides (pour les intrus). */
const PROPS: Record<S, { courbe: boolean; pointe: boolean; deuxBases: boolean }> = {
  cube: { courbe: false, pointe: false, deuxBases: true },
  pave_droit: { courbe: false, pointe: false, deuxBases: true },
  prisme: { courbe: false, pointe: false, deuxBases: true },
  cylindre: { courbe: true, pointe: false, deuxBases: true },
  cone: { courbe: true, pointe: true, deuxBases: false },
  boule: { courbe: true, pointe: false, deuxBases: false },
  pyramide: { courbe: false, pointe: true, deuxBases: false },
};

/** Les objets du quotidien et le solide qui les modélise — table du correcteur. */
/** Des débuts de MOTS (« brique » ne doit pas se lire dans « fabriquer »). */
const mots = (...m: string[]) => new RegExp(`(?<!\\p{L})(?:${m.join("|")})`, "u");
const OBJETS: [RegExp, S][] = [
  [mots("triangulaire", "tente", "toit à deux pentes", "prisme"), "prisme"],
  [mots("pyramid", "Khéops"), "pyramide"],
  [mots("cubique", "dé(?!\\p{L})", "dé à jouer", "morceau de sucre", "cube"), "cube"],
  [mots("boîte à chaussures", "brique", "livre", "boîte d'allumettes", "matelas", "paquet de céréales", "cake", "plaquette de beurre", "bloc de pâte d'amande", "pavé"), "pave_droit"],
  [mots("boîte de conserve", "bougie", "boîte de camembert", "pile électrique", "rouleau", "concombre", "saucisson", "bûche", "baguette", "cylindr"), "cylindre"],
  [mots("cornet", "chapeau de fête", "toit pointu d'une tour ronde", "tipi", "cône"), "cone"],
  [mots("ballon", "boule", "bille", "globe", "letchi", "orange"), "boule"],
];
function solideDeLObjet(o: string): S | null {
  return OBJETS.find(([re]) => re.test(o))?.[1] ?? null;
}
/** Le solide dont parle le texte : son nom s'il est écrit, sinon l'objet. */
function solideDuTexte(t: string): S | null {
  const noms = [...t.matchAll(/un cube|un pavé droit|un prisme droit|un cylindre|un cône|une boule|une pyramide/g)].map((m) => PAR_NOM[m[0]]);
  if (new Set(noms).size === 1) return noms[0];
  return solideDeLObjet(t);
}

/* Les figures planes et leurs inclusions : un carré est un rectangle et un losange. */
type F = "carré" | "rectangle" | "disque" | "triangle" | "losange" | "trapèze";
function figure(c: string): F | null {
  const m = c.match(/carré|rectangle|disque|triangle|losange|trapèze/);
  return (m?.[0] as F) ?? null;
}
const FIGURES_JUSTES: Record<F, F[]> = {
  carré: ["carré", "rectangle", "losange"],
  rectangle: ["rectangle"],
  disque: ["disque"],
  triangle: ["triangle"],
  losange: ["losange"],
  trapèze: ["trapèze"],
};

const dessin = (q: Q) => ((q.canvas as any)?.solide as S | undefined) ?? null;

/* ───────────────────────── vision_reconnaitre ───────────────────────── */

/** Le dessin montre un solide : son nom (et pas de nom plus général parmi les leurres). */
function corrigerNommer(q: Q): string[] {
  const s = dessin(q);
  if (!s) return ["pas de solide dessiné"];
  const p = q.expected[0] === NOM[s] ? [] : [`le dessin montre ${NOM[s]}, attendu « ${q.expected[0]} »`];
  if (Object.values(NOM).some((n) => q.text.includes(n))) p.push("le texte nomme le solide");
  return [...p, ...qcmUnique(q, (c) => NOMS_JUSTES[s].includes(c))];
}

/** La description (« six faces carrées… ») désigne un solide. */
function solideDecrit(t: string): S | null {
  if (/aucune arête|même distance du centre/.test(t)) return "boule";
  if (/deux disques|deux bases en forme de disque/.test(t)) return "cylindre";
  if (/disque/.test(t) && /pointe/.test(t)) return "cone";
  if (/triangulaires?/.test(t) && /rectangulaires|rectangles/.test(t)) return "prisme";
  if (/base (polygonale|carrée)/.test(t) && /triangulaires/.test(t)) return "pyramide";
  if (/six faces/.test(t) && /pas toutes des carrés|ne sont pas des carrés/.test(t)) return "pave_droit";
  if (/six faces/.test(t) && /carré/.test(t)) return "cube";
  return null;
}
function corrigerSignature(q: Q): string[] {
  const s = solideDecrit(q.text);
  if (!s) return ["description illisible"];
  return [...(q.expected[0] === NOM[s] ? [] : [`la description est celle ${NOM[s].replace(/^un/, "d'un").replace(/^une/, "d'une")}`]), ...qcmUnique(q, (c) => NOMS_JUSTES[s].includes(c))];
}

/** La forme des bases, de la base ou des faces latérales. */
const PARTIES: Record<S, { bases?: F; latérales?: F; faces?: F }> = {
  cube: { faces: "carré", bases: "carré", latérales: "carré" },
  pave_droit: { faces: "rectangle" },
  prisme: { bases: "triangle", latérales: "rectangle" },
  cylindre: { bases: "disque" },
  cone: { bases: "disque" },
  boule: {},
  pyramide: { bases: "carré", latérales: "triangle" }, // à base carrée dans tous les énoncés
};
function corrigerBases(q: Q): string[] {
  const s = solideDuTexte(q.text);
  if (!s) return ["solide introuvable"];
  if (s === "pyramide" && !/base carrée/.test(q.text)) return ["pyramide sans base précisée"];
  const partie = /faces latérales/.test(q.text) ? "latérales" : /(ses|sa) bases?/.test(q.text) ? "bases" : /ses faces/.test(q.text) ? "faces" : null;
  const f = partie ? PARTIES[s][partie] : undefined;
  if (!f) return [`partie « ${partie} » inconnue pour ${NOM[s]}`];
  const juste = (c: string) => figure(c) != null && FIGURES_JUSTES[f].includes(figure(c)!);
  return [...(figure(q.expected[0]) === f ? [] : [`${partie} ${de(NOM[s])} : ${f}, pas « ${q.expected[0]} »`]), ...qcmUnique(q, juste)];
}
const de = (n: string) => n.replace(/^un /, "d'un ").replace(/^une /, "d'une ");

/* ───────────────────────── vision_vues ───────────────────────── */

/** Vues d'un solide POSÉ normalement (debout sur sa base). */
const VUES: Record<S, { dessus: F; face: F }> = {
  cube: { dessus: "carré", face: "carré" },
  pave_droit: { dessus: "rectangle", face: "rectangle" },
  prisme: { dessus: "rectangle", face: "triangle" },
  cylindre: { dessus: "disque", face: "rectangle" },
  cone: { dessus: "disque", face: "triangle" },
  boule: { dessus: "disque", face: "disque" },
  pyramide: { dessus: "carré", face: "triangle" },
};
function corrigerVue(q: Q): string[] {
  const s = solideDuTexte(q.text);
  if (!s) return ["solide introuvable"];
  const dessus = /de dessus|à la verticale|au-dessus/.test(q.text);
  const face = /de face/.test(q.text);
  if (dessus === face) return ["direction de la vue illisible"];
  const f = VUES[s][dessus ? "dessus" : "face"];
  const p = figure(q.expected[0]) === f ? [] : [`vue ${dessus ? "de dessus" : "de face"} ${de(NOM[s])} : ${f}, pas « ${q.expected[0]} »`];
  if (dessin(q) && dessin(q) !== s) p.push(`le dessin montre ${dessin(q)} au lieu de ${s}`);
  return [...p, ...qcmUnique(q, (c) => figure(c) != null && FIGURES_JUSTES[f].includes(figure(c)!))];
}

/** Les vues possibles de chaque solide, dans TOUTES ses positions : [dessus, face, côté].
 *  « R » = rectangle qui n'est pas un carré, « C » = carré. */
const ORIENTATIONS: Record<S, string[][]> = {
  cube: [["C", "C", "C"]],
  pave_droit: [["C", "R", "R"], ["R", "C", "R"], ["R", "R", "C"], ["R", "R", "R"]],
  prisme: [["T", "R", "R"], ["R", "T", "R"], ["R", "R", "T"], ["T", "C", "C"], ["C", "T", "R"], ["R", "T", "C"]],
  cylindre: [["D", "R", "R"], ["D", "C", "C"], ["R", "D", "R"], ["R", "R", "D"], ["C", "D", "C"], ["C", "C", "D"]],
  cone: [["D", "T", "T"]],
  boule: [["D", "D", "D"]],
  pyramide: [["C", "T", "T"]],
};
/** Ce que l'énoncé dit d'une vue, et ce que cela autorise. */
function vueLue(s: string): string[] | null {
  if (/rectangle qui n'est pas un carré/.test(s)) return ["R"];
  if (/rectangle/.test(s)) return ["R", "C"];
  if (/carré/.test(s)) return ["C"];
  if (/disque/.test(s)) return ["D"];
  if (/triangle/.test(s)) return ["T"];
  return null;
}
function corrigerDeviner(q: Q): string[] {
  const t = q.text;
  const lire = (re: RegExp) => {
    const m = t.match(re);
    return m ? vueLue(m[1]) : undefined;
  };
  const FIG = "(un (?:rectangle qui n'est pas un carré|carré|disque|triangle|rectangle))";
  // « un disque de dessus » d'abord : dans « un disque de dessus, un rectangle de face », la
  // figure qui SUIT « de dessus, » est celle de la vue de face.
  const dessus = lire(new RegExp(`${FIG} de dessus`)) ?? lire(new RegExp(`(?:de dessus,? (?:c'est )?|dessus : |vu de dessus donne )${FIG}`));
  const face = lire(new RegExp(`${FIG} de face`)) ?? lire(new RegExp(`(?:de face,? (?:c'est )?|face : |vu de face )${FIG}`));
  const cote = lire(new RegExp(`${FIG} de côté`)) ?? lire(new RegExp(`(?:de côté,? (?:c'est )?|côté : |vu de côté )${FIG}`));
  if (!dessus || !face) return ["vues illisibles"];
  const possibles = (Object.keys(ORIENTATIONS) as S[]).filter((s) =>
    ORIENTATIONS[s].some(([d, f, c]) => dessus.includes(d) && face.includes(f) && (!cote || cote.includes(c)))
  );
  if (possibles.length !== 1) return [`les vues données conviennent à ${possibles.length} solides : ${possibles.join(", ")}`];
  const s = possibles[0];
  return [...(q.expected[0] === NOM[s] ? [] : [`ces vues sont celles ${de(NOM[s])}`]), ...qcmUnique(q, (c) => NOMS_JUSTES[s].includes(c))];
}

/* ───────────────────────── vision_representation ───────────────────────── */

/** Le patron : chaque face une fois. Six carrés sont aussi six rectangles. */
const PATRONS: Record<S, string[]> = {
  cube: ["6 carrés", "6 rectangles"],
  pave_droit: ["6 rectangles"],
  prisme: ["2 triangles et 3 rectangles"],
  cylindre: ["2 disques et un rectangle"],
  cone: ["1 disque et une portion de disque"],
  boule: [],
  pyramide: ["1 carré et 4 triangles"],
};
function corrigerPatron(q: Q): string[] {
  const s = solideDuTexte(q.text);
  if (!s) return ["solide introuvable"];
  const p = PATRONS[s].includes(q.expected[0]) ? [] : [`patron ${de(NOM[s])} : ${PATRONS[s][0]}, pas « ${q.expected[0]} »`];
  if (dessin(q) !== s) p.push(`le dessin montre ${dessin(q)} au lieu de ${s}`);
  return [...p, ...qcmUnique(q, (c) => PATRONS[s].includes(c))];
}

/** Les règles de la perspective cavalière (ce qui est de front, ce qui fuit). */
function corrigerPerspective(q: Q): string[] {
  const t = q.text;
  if (!/cub|dé|sucre/.test(t)) return ["le solide dessiné n'est pas un cube"];
  const justes =
    /cachées|qu'on ne voit pas/.test(t) ? ["en pointillés"]
    : /parallèles/.test(t) ? ["elles restent parallèles sur le dessin"]
    : /fuit/.test(t) ? ["comme un angle non droit", "comme un parallélogramme"]
    : /de front/.test(t) ? ["en vraie grandeur", "comme un carré"]
    : null;
  if (!justes) return ["question de perspective inconnue"];
  return [...(justes.includes(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} », juste : ${justes.join(" / ")}`]), ...qcmUnique(q, (c) => justes.includes(c))];
}

/* ───────────────────────── vision_section ───────────────────────── */

type Coupe = "base" | "face" | "axe" | "pointe" | "sommets";
/** Ce que donne chaque coupe, solide par solide (null : la coupe n'existe pas ou ne donne pas une figure usuelle). */
function section(s: S, c: Coupe): F[] {
  const T: Record<S, Partial<Record<Coupe, F[]>>> = {
    cube: { base: ["carré"], face: ["carré"], sommets: ["triangle", "rectangle"] },
    // Un pavé droit qui n'est pas un cube : ses faces sont des rectangles (pas des carrés).
    pave_droit: { base: ["rectangle"], face: ["rectangle"], sommets: ["triangle", "rectangle"] },
    prisme: { base: ["triangle"], face: ["rectangle"] },
    cylindre: { base: ["disque"], axe: ["rectangle"] },
    cone: { base: ["disque"], pointe: ["triangle"], axe: [] },
    boule: {},
    pyramide: { base: ["carré"], pointe: ["triangle"], sommets: ["triangle"], axe: ["triangle", "trapèze"] },
  };
  return T[s][c] ?? [];
}
const COUPE: [RegExp, Coupe][] = [
  [/parallèle à la base|parallèlement à sa base|parallèle à sa base/, "base"],
  [/parallèle à une face|parallèlement à une de ses faces|parallèle à une de ses faces/, "face"],
  [/parallèle à l'axe|parallèlement à son axe|parallèle à son axe/, "axe"],
  [/par la pointe/, "pointe"],
  [/trois sommets/, "sommets"],
];
const coupeDe = (s: string) => COUPE.find(([re]) => re.test(s))?.[1] ?? null;
/** Le solide coupé : celui du dessin, sinon celui du texte. */
function solideCoupe(q: Q): S | null {
  return dessin(q) ?? solideDuTexte(q.text);
}

function corrigerSectionForme(q: Q): string[] {
  const s = solideCoupe(q);
  const c = coupeDe(q.text);
  if (!s || !c) return ["solide ou coupe illisible"];
  const t = solideDuTexte(q.text);
  if (t && t !== s) return [`le texte parle ${de(NOM[t])}, le dessin montre ${NOM[s]}`];
  const f = section(s, c);
  if (!f.length) return [`la coupe « ${c} » ${de(NOM[s])} ne donne pas de figure usuelle`];
  // Pour le pavé, la section est « un rectangle » (elle peut être carrée si la base l'est : on ne propose pas « un carré »).
  const juste = (x: string) => figure(x) != null && f.some((g) => FIGURES_JUSTES[g].includes(figure(x)!));
  return [...(juste(q.expected[0]) ? [] : [`coupe ${c} ${de(NOM[s])} : ${f.join(" ou ")}, pas « ${q.expected[0]} »`]), ...qcmUnique(q, juste)];
}

function corrigerQuelleCoupe(q: Q): string[] {
  const s = solideDuTexte(q.text);
  const forme = figure(q.text.replace(/carrée|triangulaire/g, ""));
  if (!s || !forme) return ["solide ou forme illisible"];
  const juste = (x: string) => {
    const c = coupeDe(x);
    return !!c && section(s, c).some((g) => FIGURES_JUSTES[g].includes(forme));
  };
  return [...(juste(q.expected[0]) ? [] : [`« ${q.expected[0]} » ne donne pas ${forme} sur ${NOM[s]}`]), ...qcmUnique(q, juste)];
}

/* ───────────────────────── vision_defi ───────────────────────── */

/** L'intrus : SEUL à différer des trois autres, et personne d'autre ne l'est. */
function corrigerIntrus(q: Q): string[] {
  const elems = q.choices ?? [];
  const sols = elems.map((e) => (PAR_NOM[e] ?? solideDeLObjet(e)) as S | null);
  if (sols.some((s) => !s)) return [`élément inconnu du correcteur : ${elems.filter((_, i) => !sols[i]).join(", ")}`];
  const seul = (i: number) => {
    const autres = sols.filter((_, j) => j !== i) as S[];
    const si = sols[i] as S;
    const parProp = (["courbe", "pointe", "deuxBases"] as const).some(
      (k) => autres.every((a) => PROPS[a][k] === PROPS[autres[0]][k]) && PROPS[si][k] !== PROPS[autres[0]][k]
    );
    const parSolide = autres.every((a) => a === autres[0]) && si !== autres[0];
    return parProp || parSolide;
  };
  const intrus = elems.filter((_, i) => seul(i));
  if (intrus.length !== 1) return [`${intrus.length} intrus possibles : ${intrus.join(" | ")}`];
  if (!elems.every((e) => q.text.includes(e))) return ["la liste du texte n'est pas celle des propositions"];
  return q.expected[0] === intrus[0] ? [] : [`l'intrus est « ${intrus[0]} », pas « ${q.expected[0]} »`];
}

/** Faces, arêtes, sommets : la formule d'Euler (F + S − A = 2) le confirme. */
const COMPTES: Record<string, Record<string, number>> = {
  cube: { faces: 6, arêtes: 12, sommets: 8 },
  pave_droit: { faces: 6, arêtes: 12, sommets: 8 },
  prisme: { faces: 5, arêtes: 9, sommets: 6, "faces rectangulaires": 3, "faces triangulaires": 2 },
  pyramide: { faces: 5, arêtes: 8, sommets: 5, "faces triangulaires": 4, "faces carrées": 1 },
};
function corrigerCompter(q: Q): string[] {
  const s = solideDuTexte(q.text);
  if (!s || !COMPTES[s]) return ["solide à compter introuvable"];
  if (s === "pyramide" && !/base carrée/.test(q.text)) return ["pyramide sans base précisée"];
  if (s === "prisme" && !/triangulaire/.test(q.text)) return ["prisme sans base précisée"];
  const t = q.text;
  const quoi = /faces rectangulaires/.test(t) ? "faces rectangulaires"
    : /faces triangulaires/.test(t) ? "faces triangulaires"
    : /couleur|faces?\b/.test(t) && !/arête|sommet/.test(t) ? "faces"
    : /arête|ruban/.test(t) ? "arêtes"
    : /sommet|perle/.test(t) ? "sommets"
    : null;
  if (!quoi) return ["ce qu'on compte est illisible"];
  const n = COMPTES[s][quoi];
  const { faces: F, arêtes: A, sommets: Sm } = COMPTES[s];
  const p = F + Sm - A === 2 ? [] : [`table fausse pour ${s} (Euler)`];
  if (Number(q.expected[0]) !== n) p.push(`${NOM[s]} a ${n} ${quoi}, attendu « ${q.expected[0]} »`);
  if (dessin(q) !== s) p.push(`le dessin montre ${dessin(q)} au lieu de ${s}`);
  return p;
}

function corrigerModeliser(q: Q): string[] {
  const s = solideDeLObjet(q.text.replace(/un solide usuel/, ""));
  if (!s) return ["objet inconnu du correcteur"];
  return [...(q.expected[0] === NOM[s] ? [] : [`l'objet se modélise par ${NOM[s]}`]), ...qcmUnique(q, (c) => NOMS_JUSTES[s].includes(c))];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "4e_vision_reconnaitre_tpl_1_nommer": corrigerNommer,
  "4e_vision_reconnaitre_tpl_2_signature": corrigerSignature,
  "4e_vision_reconnaitre_tpl_3_bases": corrigerBases,
  "4e_vision_vues_tpl_1_forme": corrigerVue,
  "4e_vision_vues_tpl_2_deviner": corrigerDeviner,
  "4e_vision_representation_tpl_1_patron": corrigerPatron,
  "4e_vision_representation_tpl_2_perspective": corrigerPerspective,
  "4e_vision_section_tpl_1_forme": corrigerSectionForme,
  "4e_vision_section_tpl_2_quelle_coupe": corrigerQuelleCoupe,
  "4e_vision_defi_tpl_1_intrus": corrigerIntrus,
  "4e_vision_defi_tpl_2_compter": corrigerCompter,
  "4e_vision_defi_tpl_3_situation": corrigerModeliser,
});
