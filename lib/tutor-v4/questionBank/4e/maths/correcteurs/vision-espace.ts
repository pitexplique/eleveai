import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { cotesVraies, estPatronCylindre, estPatronPave, estPatronPrisme, longueurInconnue, panneauxDe, unSeulVrai } from "@/lib/tutor-v4/questionBank/patrons-outils";
import { OPPOSEE, plier, sePlieEnCube, type Cases } from "@/lib/tutor-v4/questionBank/4e/maths/vision-espace-outils";

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


/* ═════════════════════ 15/11/2026 — LES GABARITS NEUFS ═════════════════════
   Ils relisent le DESSIN (solide, cubes, pointillés, patron) et le texte. */

const nombreAttendu = (q: Q, x: number) => (Number(String(q.expected[0]).split(" ")[0].replace(",", ".")) === x ? [] : [`attendu « ${q.expected[0]} », juste ${x}`]);
const triDessin = (q: Q) => (q.canvas as any)?.baseTriangulaire === true;

/** Faces, arêtes, sommets du solide DESSINÉ (pyramide : base à 4 côtés, ou triangulaire). */
function comptesDessin(q: Q): Record<string, number> | null {
  const s = dessin(q);
  if (s === "pyramide") return triDessin(q) ? { faces: 4, arêtes: 6, sommets: 4 } : { faces: 5, arêtes: 8, sommets: 5 };
  return s ? COMPTES[s] ?? null : null;
}
function corrigerCompterDessin(q: Q): string[] {
  const n = comptesDessin(q);
  if (!n) return ["solide dessiné sans faces planes à compter"];
  if (Object.values(NOM).some((x) => q.text.includes(x))) return ["le texte nomme le solide"];
  const t = q.text;
  const quoi = /arête|baguette|tige|fil/.test(t) ? "arêtes" : /sommet|perle|lanterne|épingle|boulon/.test(t) ? "sommets" : /face|couleur|tissu|gommette|plaque/.test(t) ? "faces" : null;
  if (!quoi) return ["ce qu'on compte est illisible"];
  return nombreAttendu(q, n[quoi]);
}

/** La forme d'une base du solide dessiné. */
function corrigerBaseDessin(q: Q): string[] {
  const s = dessin(q);
  const f: F | null = s === "cylindre" || s === "cone" ? "disque" : s === "prisme" ? "triangle" : s === "cube" ? "carré" : s === "pyramide" && triDessin(q) ? "triangle" : null;
  if (!f) return [`base du dessin (${s}) non déterminée`];
  return [...(figure(q.expected[0]) === f ? [] : [`base : ${f}, pas « ${q.expected[0]} »`]), ...qcmUnique(q, (c) => figure(c) != null && FIGURES_JUSTES[f].includes(figure(c)!))];
}

/** Bases, faces latérales, faces d'une forme donnée, sur le solide dessiné. */
function corrigerPartiesDessin(q: Q): string[] {
  const s = dessin(q);
  const tri = triDessin(q);
  const t = q.text;
  const quoi = /faces latérales/.test(t) ? "lat" : /faces triangulaires/.test(t) ? "tri" : /faces rectangulaires/.test(t) ? "rect" : /faces carrées/.test(t) ? "car" : /bases/.test(t) ? "bases" : null;
  if (!s || !quoi) return ["solide ou partie illisible"];
  const T: Partial<Record<S, Partial<Record<string, number>>>> = {
    prisme: { lat: 3, tri: 2, rect: 3, bases: 2 },
    pyramide: tri ? { lat: 3, tri: 4, bases: 1 } : { lat: 4, tri: 4, bases: 1 },
    cylindre: { bases: 2 },
    cone: { bases: 1 },
    cube: { car: 6, rect: 6 },
    pave_droit: { rect: 6 },
  };
  const n = T[s]?.[quoi];
  if (n == null) return [`« ${quoi} » non défini pour ${s}`];
  return nombreAttendu(q, n);
}

/** L'inclusion cube ⊂ pavé ⊂ prisme droit, dans les deux sens. */
function corrigerInclusion(q: Q): string[] {
  const t = q.text;
  const oui = /cube.*est-il un pavé|cube est un pavé|cubique, est-il un pavé|pavé droit est-il un prisme|pavé droit est un prisme|pavé droit, est-elle un prisme/.test(t);
  const non = /pavé droit est-il toujours un cube|pavé droit, est-elle un cube|Tout pavé droit est-il un cube|prisme droit est-il toujours un pavé|prisme droit, est-elle un pavé|Tout prisme droit est-il un pavé/.test(t);
  if (oui === non) return ["question d'inclusion illisible"];
  const juste = (c: string) => (oui ? c.startsWith("oui :") : c.startsWith("non :")) && !/seulement|n'a que|n'a pas|toujours des bases|une pointe/.test(c);
  return qcmUnique(q, juste);
}

/* ─── vues d'assemblages : on refait les vues à partir des CUBES dessinés ─── */
const cubesDe = (q: Q) => (((q.canvas as any)?.cubes ?? []) as { x: number; y: number; z: number }[]);
const vuesDe = (q: Q) => {
  const c = cubesDe(q);
  const n = (f: (k: { x: number; y: number; z: number }) => string) => new Set(c.map(f)).size;
  return { dessus: n((k) => `${k.x},${k.y}`), face: n((k) => `${k.x},${k.z}`), cote: n((k) => `${k.y},${k.z}`), total: c.length };
};
const vueDemandee = (t: string) => (/[Dd]e dessus|d'en haut/.test(t) ? "dessus" : /de face/.test(t) ? "face" : /de côté/.test(t) ? "cote" : null);
function corrigerVueCubes(q: Q): string[] {
  if (!cubesDe(q).length) return ["pas d'assemblage dessiné"];
  const v = vueDemandee(q.text);
  if (!v) return ["vue demandée illisible"];
  return nombreAttendu(q, vuesDe(q)[v]);
}
/** ★1 : toutes les colonnes ont la même hauteur (aucun dessus caché). */
function corrigerDessusPlat(q: Q): string[] {
  const c = cubesDe(q);
  const h = new Map<string, number>();
  c.forEach((k) => h.set(`${k.x},${k.y}`, Math.max(h.get(`${k.x},${k.y}`) ?? 0, k.z + 1)));
  if (new Set(h.values()).size !== 1) return ["colonnes de hauteurs différentes : un dessus peut être caché"];
  return corrigerVueCubes(q);
}
/** Les dimensions du pavé de cubes : celles du texte = celles du dessin. */
function dimsTexte(t: string) {
  const m = t.match(/[Ll]ongueur (\d+), largeur (\d+), hauteur (\d+)/) ?? t.match(/(\d+) de long, (\d+) de large, (\d+) de haut/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}
function dimsCubes(q: Q) {
  const c = cubesDe(q);
  const L = new Set(c.map((k) => k.x)).size, l = new Set(c.map((k) => k.y)).size, h = new Set(c.map((k) => k.z)).size;
  return c.length === L * l * h ? [L, l, h] : null;
}
function corrigerQuelleVue(q: Q): string[] {
  const d = dimsTexte(q.text);
  const dc = dimsCubes(q);
  if (!d || !dc || d.join() !== dc.join()) return [`dimensions du texte ${d} ≠ du dessin ${dc}`];
  const n = Number(q.text.match(/(\d+) carreaux/)?.[1]);
  const [L, l, h] = d;
  const V: [string, number][] = [["la vue de dessus", L * l], ["la vue de face", L * h], ["la vue de côté", l * h]];
  if (new Set(V.map((x) => x[1])).size !== 3) return ["deux vues ont le même nombre de carreaux"];
  const juste = V.find((x) => x[1] === n)?.[0] ?? "aucune des trois";
  return qcmUnique(q, (c) => c === juste);
}
function corrigerVueSituation(q: Q): string[] {
  const d = dimsTexte(q.text);
  const dc = dimsCubes(q);
  if (!d || !dc || d.join() !== dc.join()) return [`dimensions du texte ${d} ≠ du dessin ${dc}`];
  return corrigerVueCubes(q);
}
/** Deux rangées : les hauteurs du texte sont celles du dessin. */
function hauteursTexte(t: string) {
  const m = t.match(/derrière ([\d, ]+) ; devant ([\d, ]+)\./);
  return m ? [m[1], m[2]].map((r) => r.split(",").map((x) => Number(x.trim()))) : null;
}
function hauteursCoherentes(q: Q): string[] {
  const h = hauteursTexte(q.text);
  if (!h) return ["hauteurs illisibles"];
  const c = cubesDe(q);
  const vrai = [0, 1].map((y) => h[y].map((_, x) => c.filter((k) => k.x === x && k.y === y).length));
  return vrai.every((r, y) => r.join() === h[y].join()) && c.length === h.flat().reduce((a, b) => a + b, 0) ? [] : ["les hauteurs du texte ne sont pas celles du dessin"];
}
function corrigerDeuxRangees(q: Q): string[] {
  return [...hauteursCoherentes(q), ...corrigerVueCubes(q)];
}

/** La vue (de dessus / de face) d'un solide dessiné, nommé par le dessin seul. */
function corrigerVueDessin(q: Q): string[] {
  const s = dessin(q);
  if (!s) return ["pas de solide dessiné"];
  const dessus = /de dessus/.test(q.text);
  const face = /de face/.test(q.text);
  if (dessus === face) return ["direction de la vue illisible"];
  if (s === "pyramide" && dessus) return ["vue de dessus d'une pyramide : base non précisée"];
  const f = VUES[s][dessus ? "dessus" : "face"];
  return [...(figure(q.expected[0]) === f ? [] : [`vue ${dessus ? "de dessus" : "de face"} ${de(NOM[s])} : ${f}`]), ...qcmUnique(q, (c) => figure(c) != null && FIGURES_JUSTES[f].includes(figure(c)!))];
}

/* ─── perspective cavalière (repere3d) : on relit les pointillés ─── */
type Seg = { de: number; a: number; pointille?: boolean };
const perspDe = (q: Q) => {
  const c = q.canvas as any;
  return c?.kind === "repere3d" ? { pts: c.points as { label: string }[], segs: c.segments as Seg[] } : null;
};
function corrigerComptePerspective(q: Q): string[] {
  const p = perspDe(q);
  if (!p) return ["pas de perspective"];
  const caches = p.segs.filter((s) => s.pointille).length;
  const t = q.text;
  // Faces vues : 3 pour un pavé (8 sommets), 2 pour le prisme couché (6) et la pyramide (5).
  const n =
    /pointillés compris|cachées comprises/.test(t) ? p.segs.length
    : /pointillés|cachées sont tracées/.test(t) ? caches
    : /traits pleins|vraiment/.test(t) ? p.segs.length - caches
    : /sommets/.test(t) ? p.pts.length
    : /faces/.test(t) ? (p.pts.length === 8 ? 3 : 2)
    : null;
  if (n == null) return ["question illisible"];
  // Euler : F + S − A = 2.
  const F = p.pts.length === 8 ? 6 : 5;
  if (F + p.pts.length - p.segs.length !== 2) return ["la figure n'est pas un polyèdre fermé"];
  return nombreAttendu(q, n);
}
function corrigerCachePerspective(q: Q): string[] {
  const p = perspDe(q);
  if (!p) return ["pas de perspective"];
  const nomS = (s: Seg) => `[${p.pts[s.de].label}${p.pts[s.a].label}]`;
  const t = q.text;
  if (/sommet/.test(t)) {
    const caches = p.pts.map((x, i) => (p.segs.filter((s) => s.de === i || s.a === i).every((s) => s.pointille) ? x.label : null)).filter(Boolean);
    if (caches.length !== 1) return [`${caches.length} sommets cachés`];
    return qcmUnique(q, (c) => c === caches[0]);
  }
  const visible = /trait plein|vraiment|visible/.test(t);
  const segDe = (c: string) => p.segs.find((s) => nomS(s) === c || `[${p.pts[s.a].label}${p.pts[s.de].label}]` === c);
  if (!(q.choices ?? []).every((c) => segDe(c))) return ["une proposition n'est pas une arête de la figure"];
  return qcmUnique(q, (c) => !!segDe(c)!.pointille !== visible);
}

/* ─── patrons du cube : on PLIE ─── */
const patronsDe = (q: Q) => (((q.canvas as any)?.patrons ?? []) as { nom?: string; cases: Cases; textes?: { case: [number, number]; texte: string }[] }[]);
function corrigerPatronCube(q: Q): string[] {
  const P = patronsDe(q);
  const bons = P.filter((x) => sePlieEnCube(x.cases));
  if (bons.length !== 1) return [`${bons.length} patrons de cube parmi les dessins`];
  return qcmUnique(q, (c) => c === `Le dessin ${bons[0].nom}`);
}
/** La case opposée à une case donnée, en roulant un cube sur le patron. */
function opposee(c: Cases, k: [number, number]): [number, number] | null {
  const m = plier(c);
  const f = m.get(`${k[0]},${k[1]}`);
  for (const [cle, v] of m) if (f && v === OPPOSEE[f]) return cle.split(",").map(Number) as [number, number];
  return null;
}
function corrigerFaceOpposee(q: Q): string[] {
  const [P] = patronsDe(q);
  if (!P || !sePlieEnCube(P.cases)) return ["le dessin n'est pas un patron de cube"];
  const X = q.text.match(/(?:face |de |opposé de )([A-F]) \?/)?.[1];
  const tx = P.textes ?? [];
  const cx = tx.find((t) => t.texte === X);
  if (!cx) return ["face de départ illisible"];
  const o = opposee(P.cases, cx.case);
  const R = tx.find((t) => o && t.case[0] === o[0] && t.case[1] === o[1])?.texte;
  return qcmUnique(q, (c) => c === R);
}
function corrigerPatronDe(q: Q): string[] {
  const [P] = patronsDe(q);
  if (!P || !sePlieEnCube(P.cases)) return ["le dessin n'est pas un patron de cube"];
  const tx = P.textes ?? [];
  const val = (k: [number, number]) => tx.find((t) => t.case[0] === k[0] && t.case[1] === k[1])?.texte;
  // Chaque paire de faces opposées connues fait 7.
  for (const t of tx) {
    const o = opposee(P.cases, t.case)!;
    if (t.texte !== "?" && val(o) !== "?" && Number(t.texte) + Number(val(o)) !== 7) return [`faces opposées ${t.texte} et ${val(o)} : somme ≠ 7`];
  }
  const inc = tx.find((t) => t.texte === "?");
  if (!inc) return ["pas de « ? »"];
  return nombreAttendu(q, 7 - Number(val(opposee(P.cases, inc.case)!)));
}

/* ─── patrons de pavé, prisme, cylindre ─── */
type Pan = ReturnType<typeof panneauxDe>[number];
const boiteP = (pts: [number, number][]) => ({ w: Math.max(...pts.map((x) => x[0])) - Math.min(...pts.map((x) => x[0])), h: Math.max(...pts.map((x) => x[1])) - Math.min(...pts.map((x) => x[1])) });
/** Les dimensions se lisent sur le panneau lui-même, puis on vérifie qu'il se referme. */
function estPatronLu(p: Pan, quoi: "pave" | "prisme" | "cylindre"): boolean {
  if (quoi === "cylindre") {
    if (!p.disques?.length || !p.pieces.length) return false;
    return estPatronCylindre(p, p.disques[0].r, boiteP(p.pieces[0].points).h);
  }
  const rects = p.pieces.filter((x) => x.points.length === 4).map((x) => boiteP(x.points));
  if (quoi === "pave") {
    if (p.pieces.length !== 6) return false;
    const h = rects[0].h;
    const bande = rects.filter((r) => Math.abs(r.h - h) < 1e-9);
    const ws = [...new Set(bande.map((r) => r.w))].sort((a, b) => a - b);
    for (const L of ws) for (const l of ws) for (const hh of [h]) if (estPatronPave(p, L, l, hh)) return true;
    return false;
  }
  const tri = p.pieces.filter((x) => x.points.length === 3);
  if (rects.length !== 3 || tri.length !== 2) return false;
  return estPatronPrisme(p, rects[0].w, rects[1].w, rects[2].w, rects[0].h);
}
function corrigerPatronSolide(q: Q): string[] {
  const quoi = /pavé/.test(q.text) ? "pave" : /prisme/.test(q.text) ? "prisme" : /cylindre/.test(q.text) ? "cylindre" : null;
  if (!quoi) return ["solide illisible"];
  return unSeulVrai(q, (p) => estPatronLu(p, quoi));
}
function corrigerCotePave(q: Q): string[] {
  const [pan] = panneauxDe(q);
  if (!pan) return ["pas de patron"];
  const [L, l, h] = (pan.cotes ?? []).slice(0, 3).map((c) => Number(c.texte.split(" ")[0]));
  const x = longueurInconnue(q);
  if (x == null) return ["pas de « ? »"];
  return [...cotesVraies(q), ...(estPatronPave(pan, L, l, h) ? [] : ["le dessin n'est pas un patron de pavé"]), ...nombreAttendu(q, Math.round(x * 1e6) / 1e6)];
}

/* ─── sections dessinées (section_solide) ─── */
const coupeDessinee = (q: Q) => {
  const c = q.canvas as any;
  return c?.kind === "section_solide" ? { s: c.solide as S, sec: c.section as string } : null;
};
function formeCoupe(s: S, sec: string): F | null {
  const plat = sec === "horizontale" || sec === "parallele_base" || sec === "parallele_face";
  const debout = sec === "verticale" || sec === "parallele_axe";
  if (s === "cube") return plat || debout ? "carré" : sec === "diagonale" ? "rectangle" : null;
  if (s === "pave_droit") return plat || debout || sec === "diagonale" ? "rectangle" : null;
  if (s === "cylindre") return plat ? "disque" : debout ? "rectangle" : null;
  if (s === "cone" || s === "pyramide") return plat ? (s === "cone" ? "disque" : "carré") : debout ? "triangle" : null;
  return null;
}
function corrigerSectionDessin(q: Q): string[] {
  const c = coupeDessinee(q);
  if (!c) return ["pas de section dessinée"];
  const f = formeCoupe(c.s, c.sec);
  if (!f) return ["section non usuelle"];
  return [...(figure(q.expected[0]) === f ? [] : [`section : ${f}, pas « ${q.expected[0]} »`]), ...qcmUnique(q, (x) => figure(x) != null && FIGURES_JUSTES[f].includes(figure(x)!))];
}
function corrigerPositionPlan(q: Q): string[] {
  const c = coupeDessinee(q);
  if (!c) return ["pas de section dessinée"];
  const juste = c.sec === "diagonale" ? "en biais" : ["horizontale", "parallele_base", "parallele_face"].includes(c.sec) ? "parallèlement" : "perpendiculairement";
  return qcmUnique(q, (x) => x.startsWith(juste));
}
const nb = (t: string, re: RegExp) => Number(t.match(re)?.[1]);
function corrigerSectionMesure(q: Q): string[] {
  const t = q.text;
  const c = coupeDessinee(q);
  if (/[Cc]ube/.test(t)) {
    const a = nb(t, /(\d+) cm d'arête|arête (\d+) cm/) || nb(t, /arête (\d+) cm/);
    if (c?.s !== "cube") return ["le dessin n'est pas un cube"];
    if (/périmètre|tour|ruban|fil/.test(t)) return nombreAttendu(q, 4 * a);
    if (/aire/i.test(t)) return nombreAttendu(q, a * a);
    if (/côté/.test(t)) return nombreAttendu(q, a);
    return ["mesure demandée illisible"];
  }
  if (/pavé|pâté|cake|tofu|pain de mie|argile|mousse|poutre/.test(t)) {
    const m = t.match(/base (\d+) cm sur (\d+) cm/);
    if (!m || c?.s !== "pave_droit") return ["pavé illisible"];
    const [L, l] = [Number(m[1]), Number(m[2])];
    return /périmètre|tour|longueur faut/.test(t) ? nombreAttendu(q, 2 * (L + l)) : nombreAttendu(q, L * l);
  }
  if (c?.s !== "cylindre") return ["le dessin n'est pas un cylindre"];
  if (/par son axe/.test(t)) {
    const d = nb(t, /(\d+) cm de diamètre/), h = nb(t, /(\d+) cm de long/);
    return c.sec === "parallele_axe" ? nombreAttendu(q, 2 * (d + h)) : ["coupe par l'axe mal dessinée"];
  }
  const r = nb(t, /rayon (\d+) cm/);
  const d = nb(t, /diamètre (\d+) cm/) || nb(t, /(\d+) cm de diamètre/);
  const veut = /diamètre/i.test(t.split(/[.:]/).pop() ?? "") ? "d" : "r";
  if (veut === "d") return nombreAttendu(q, d || 2 * r);
  return nombreAttendu(q, r || d / 2);
}
/** La coupe imaginée sur un solide dessiné (sans plan). */
function corrigerSectionImaginee(q: Q): string[] {
  const s = dessin(q);
  const t = q.text;
  if (!s) return ["pas de solide dessiné"];
  const f: F | null =
    /à une face/.test(t) ? (s === "cube" ? "carré" : s === "pave_droit" ? "rectangle" : null)
    : /à sa base/.test(t) ? (s === "cylindre" || s === "cone" ? "disque" : null)
    : /à son axe/.test(t) ? (s === "cylindre" ? "rectangle" : null)
    : /par sa pointe|par son sommet/.test(t) ? (s === "cone" || s === "pyramide" ? "triangle" : null)
    : /bases triangulaires/.test(t) ? (s === "prisme" ? "triangle" : null)
    : /au sol/.test(t) ? (s === "prisme" ? "rectangle" : null)
    : null;
  if (!f) return ["coupe illisible pour ce solide"];
  return [...(figure(q.expected[0]) === f ? [] : [`section : ${f}`]), ...qcmUnique(q, (x) => figure(x) != null && FIGURES_JUSTES[f].includes(figure(x)!))];
}

/* ─── défis ─── */
function corrigerCubePeint(q: Q): string[] {
  const c = cubesDe(q);
  const n = Math.round(Math.cbrt(c.length));
  if (n ** 3 !== c.length) return ["l'assemblage n'est pas un cube plein"];
  if (!q.text.includes(`${n ** 3}`) && !q.text.includes(`${n} sur ${n}`) && !q.text.includes(`${n} cubes de côté`) && !q.text.includes(`${n} parts de côté`)) return ["le texte ne dit pas la taille du dessin"];
  const m = n - 2;
  const k = /aucune face/.test(q.text) ? m ** 3 : /trois faces/.test(q.text) ? 8 : /deux faces/.test(q.text) ? 12 * m : /une face/.test(q.text) ? 6 * m * m : null;
  return k == null ? ["catégorie illisible"] : nombreAttendu(q, k);
}
function corrigerCompleter(q: Q): string[] {
  const m = q.text.match(/pavé plein de (\d+) sur (\d+) sur (\d+)/);
  if (!m) return ["pavé plein illisible"];
  const plein = Number(m[1]) * Number(m[2]) * Number(m[3]);
  const c = cubesDe(q);
  const H = Math.max(...c.map((k) => k.z)) + 1;
  if (Number(m[3]) !== H) return ["la hauteur du pavé plein n'est pas la plus haute colonne"];
  return [...hauteursCoherentes(q), ...nombreAttendu(q, plein - c.length)];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "4e_vision_reconnaitre_tpl_1_nommer": corrigerNommer,
  // 03/11/2026 : le même dessin, en situation (★3).
  "4e_vision_reconnaitre_tpl_4_nommer_situation": corrigerNommer,
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
  // 15/11/2026 — les gabarits neufs.
  "4e_vision_reconnaitre_fixed_cube_pave": corrigerInclusion,
  "4e_vision_reconnaitre_tpl_5_compter": corrigerCompterDessin,
  "4e_vision_reconnaitre_tpl_6_base": corrigerBaseDessin,
  "4e_vision_reconnaitre_tpl_7_parties": corrigerPartiesDessin,
  "4e_vision_reconnaitre_tpl_8_compter_situation": corrigerCompterDessin,
  "4e_vision_vues_tpl_3_dessus_cubes": corrigerDessusPlat,
  "4e_vision_vues_tpl_4_forme_dessin": corrigerVueDessin,
  "4e_vision_vues_tpl_5_rangee": corrigerVueCubes,
  "4e_vision_vues_tpl_6_quelle_vue": corrigerQuelleVue,
  "4e_vision_vues_tpl_7_situation_cubes": corrigerVueSituation,
  "4e_vision_vues_tpl_8_deux_rangees": corrigerDeuxRangees,
  "4e_vision_representation_tpl_3_compter_perspective": corrigerComptePerspective,
  "4e_vision_representation_tpl_4_patron_cube": corrigerPatronCube,
  "4e_vision_representation_tpl_5_cache": corrigerCachePerspective,
  "4e_vision_representation_tpl_6_patron_solide": corrigerPatronSolide,
  "4e_vision_representation_tpl_7_face_opposee": corrigerFaceOpposee,
  "4e_vision_representation_tpl_8_patron_pave_cote": corrigerCotePave,
  "4e_vision_section_tpl_3_forme_dessin": corrigerSectionDessin,
  "4e_vision_section_tpl_4_position_plan": corrigerPositionPlan,
  "4e_vision_section_tpl_5_mesure": corrigerSectionMesure,
  "4e_vision_section_tpl_6_imaginer": corrigerSectionImaginee,
  "4e_vision_section_tpl_7_tranche": corrigerSectionMesure,
  "4e_vision_section_tpl_8_perimetre": corrigerSectionMesure,
  "4e_vision_defi_tpl_4_patron_de": corrigerPatronDe,
  "4e_vision_defi_tpl_5_cube_peint": corrigerCubePeint,
  "4e_vision_defi_tpl_6_completer": corrigerCompleter,
});
