import type { CorrecteurMaths, CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// LES CORRECTEURS DE vision-espace.bank.ts (06/10/2026, voir types.ts).
// Ils relisent les dimensions et les hauteurs de colonnes DANS LE TEXTE,
// vérifient que le canvas dessine exactement ces cubes, puis recomptent les
// cubes et les carreaux des vues avec leurs propres règles. Les solides
// (faces, arêtes, sommets) ont leur propre table.

type Q = TutorGeneratedQuestionV4;
type Cube = { x: number; y: number; z: number };

const cleCubes = (c: Cube[]) => c.map((k) => `${k.x},${k.y},${k.z}`).sort().join(" ");
/** « 12 carreaux », « 1 cube », « 6 carrés » : la valeur et le mot. */
function reponse(q: Q, v: number, mot: string): string[] {
  const m = String(q.expected[0]).match(/^(\d+) (\S+)$/);
  if (!m) return [`réponse sans unité : « ${q.expected[0]} »`];
  const p: string[] = [];
  if (Number(m[1]) !== v) p.push(`réponse attendue « ${q.expected[0]} », recalculée ${v}`);
  const accorde = v > 1 ? (mot === "carreau" ? "carreaux" : `${mot}s`) : mot;
  if (m[2] !== accorde) p.push(`unité « ${m[2]} », il faut « ${accorde} »`);
  if (v < 0) p.push("nombre négatif");
  return p;
}
function uneSeule(q: Q, juste: (x: string) => boolean, quoi: string): string[] {
  const ch = (q.choices ?? []).map((x) => x.trim());
  const bons = ch.filter(juste);
  if (bons.length !== 1) return [`${bons.length} proposition(s) justes pour ${quoi} : ${ch.join(" | ")}`];
  if (bons[0] !== q.expected[0].trim()) return [`la proposition juste « ${bons[0]} » n'est pas l'attendue « ${q.expected[0]} »`];
  return [];
}
const cubesDuCanvas = (q: Q): Cube[] | null => {
  const cv = q.canvas as any;
  return cv && cv.kind === "solide_3d" && Array.isArray(cv.cubes) ? cv.cubes : null;
};

// ─── Lire l'assemblage décrit ───────────────────────────────────────────────
type Assemblage = { cubes: Cube[]; colonnes: number[][] };
function lirePave(t: string): [number, number, number] | null {
  const m = t.match(/(\d+) cubes de long, (\d+) de large et (\d+) de haut/);
  return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
}
function lireColonnes(t: string): number[][] | null {
  const m = t.match(/Rangée de devant, de gauche à droite : ([\d, et]+) cubes\. Rangée de derrière : ([\d, et]+) cubes\./);
  if (!m) return null;
  const lire = (s: string) => s.split(/, | et /).map(Number);
  return [lire(m[1]), lire(m[2])];
}
function construire(t: string): Assemblage | null {
  const pv = lirePave(t);
  const col = lireColonnes(t);
  if (col) {
    const cubes: Cube[] = [];
    col.forEach((r, y) => r.forEach((k, x) => { for (let z = 0; z < k; z++) cubes.push({ x, y, z }); }));
    return { cubes, colonnes: col };
  }
  if (pv) {
    const [L, l, h] = pv;
    const cubes: Cube[] = [];
    const colonnes: number[][] = [];
    for (let y = 0; y < l; y++) {
      colonnes.push(Array(L).fill(h));
      for (let x = 0; x < L; x++) for (let z = 0; z < h; z++) cubes.push({ x, y, z });
    }
    return { cubes, colonnes };
  }
  return null;
}
/** Les vues d'un assemblage, recalculées à partir des colonnes (rangée 0 = devant). */
function vues(col: number[][]) {
  const n = col[0].length;
  const dessus = col.flat().filter((k) => k > 0).length;
  let face = 0;
  for (let x = 0; x < n; x++) face += Math.max(...col.map((r) => r[x]));
  const droite = col.reduce((s, r) => s + Math.max(...r), 0);
  return { dessus, face, droite };
}
function canvasConforme(q: Q, a: Assemblage): string[] {
  const c = cubesDuCanvas(q);
  if (!c) return [];
  return cleCubes(c) === cleCubes(a.cubes) ? [] : [`le canvas dessine ${c.length} cubes, le texte en décrit ${a.cubes.length}`];
}

// ─── VISION_VUES ────────────────────────────────────────────────────────────
const corrVues: CorrecteurMaths = (q) => {
  const t = q.text;
  const a = construire(t);
  if (!a) return [`assemblage introuvable : ${t}`];
  const p = canvasConforme(q, a);
  const v = vues(a.colonnes);
  if (q.format === "qcm") {
    const m = t.match(/Quelle vue contient (\d+) carreaux/);
    if (!m) return [...p, `question non reconnue : ${t}`];
    const n = Number(m[1]);
    const qui = (x: string) => (/dessus/.test(x) ? v.dessus : /face/.test(x) ? v.face : /droite/.test(x) ? v.droite : -1);
    return [...p, ...uneSeule(q, (x) => (x === "aucune des trois" ? ![v.dessus, v.face, v.droite].includes(n) : qui(x) === n), `la vue à ${n} carreaux`)];
  }
  const m = t.match(/vue (de dessus|de face|de droite)/);
  if (!m) return [...p, `vue introuvable : ${t}`];
  const n = m[1] === "de dessus" ? v.dessus : m[1] === "de face" ? v.face : v.droite;
  return [...p, ...reponse(q, n, "carreau")];
};

// ─── VISION_DENOMBRER ───────────────────────────────────────────────────────
const corrDenombrer: CorrecteurMaths = (q) => {
  const t = q.text;
  let m: RegExpMatchArray | null;
  if ((m = t.match(/Chaque étage est un rectangle de (\d+) cubes sur (\d+)\. Il y a (\d+) étages/))) {
    const [L, l, h] = [Number(m[1]), Number(m[2]), Number(m[3])];
    const p = canvasConforme(q, construire(`${L} cubes de long, ${l} de large et ${h} de haut`)!);
    return [...p, ...reponse(q, L * l * h, "cube")];
  }
  if ((m = t.match(/chaque étage est un carré de cubes, de côté ([\d, puis]+) en montant/))) {
    const cotes = m[1].split(", puis ").map(Number);
    const total = cotes.reduce((s, c) => s + c * c, 0);
    const c = cubesDuCanvas(q);
    const p = c && c.length !== total ? [`le canvas dessine ${c.length} cubes, la pyramide en a ${total}`] : [];
    if (cotes.some((c, i) => i > 0 && c !== cotes[i - 1] - 1)) p.push("les étages de la pyramide ne diminuent pas d'un cube");
    return [...p, ...reponse(q, total, "cube")];
  }
  const a = construire(t);
  if (!a) return [`assemblage introuvable : ${t}`];
  const p = canvasConforme(q, a);
  const total = a.cubes.length;
  if (/ajoute un étage identique/.test(t)) return [...p, ...reponse(q, a.colonnes.flat().length, "cube")];
  if ((m = t.match(/pavé plein de (\d+) cubes de long, (\d+) de large et (\d+) de haut\. .*(?:ajouter|manque)/))) {
    const [L, l, H] = [Number(m[1]), Number(m[2]), Number(m[3])];
    if (L !== a.colonnes[0].length || l !== a.colonnes.length) p.push("le pavé visé n'a pas la taille du quadrillage");
    if (H < Math.max(...a.colonnes.flat())) p.push("une colonne dépasse déjà la hauteur du pavé visé");
    return [...p, ...reponse(q, L * l * H - total, "cube")];
  }
  return [...p, ...reponse(q, total, "cube")];
};

// ─── VISION_REPRESENTATION ──────────────────────────────────────────────────
const SOLIDES: Record<string, { faces: number; aretes: number; sommets: number }> = {
  "un cube": { faces: 6, aretes: 12, sommets: 8 },
  "un pavé droit": { faces: 6, aretes: 12, sommets: 8 },
  "une pyramide à base carrée": { faces: 5, aretes: 8, sommets: 5 },
  "un prisme droit à base triangulaire": { faces: 5, aretes: 9, sommets: 6 },
};
const OBJETS: [RegExp, string][] = [
  [/dé à jouer|morceau de sucre/, "un cube"],
  [/boîte à chaussures|brique de lait|boîte de céréales/, "un pavé droit"],
  [/tente canadienne|chocolat triangulaire/, "un prisme droit à base triangulaire"],
  [/clocher|pyramide d’Égypte/, "une pyramide à base carrée"],
];
const corrRepresentation: CorrecteurMaths = (q) => {
  const t = q.text;
  let m: RegExpMatchArray | null;
  if ((m = t.match(/pavé droit de (\d+) cm de long, (\d+) cm de large et (\d+) cm de haut, avec des pailles/))) {
    const [L, l, h] = [Number(m[1]), Number(m[2]), Number(m[3])];
    const r = String(q.expected[0]).match(/^(\d+) cm$/);
    if (!r) return [`réponse sans unité : ${q.expected[0]}`];
    return Number(r[1]) === 4 * (L + l + h) ? [] : [`longueur attendue ${q.expected[0]}, recalculée ${4 * (L + l + h)} cm (12 arêtes)`];
  }
  if ((m = t.match(/(\d+) cm de long, (\d+) cm de large et (\d+) cm de haut\. Combien de faces de (\d+) cm sur (\d+) cm/))) {
    const d = [m[1], m[2], m[3]].map(Number);
    const [a, b] = [Number(m[4]), Number(m[5])];
    const paires = [[d[0], d[1]], [d[0], d[2]], [d[1], d[2]]].filter(([x, y]) => (x === a && y === b) || (x === b && y === a)).length;
    return uneSeule(q, (x) => x === `${2 * paires} face${2 * paires > 1 ? "s" : ""}`, `les faces de ${a} sur ${b}`);
  }
  if ((m = t.match(/patron d’(un cube|un pavé droit|une pyramide à base carrée|un prisme droit à base triangulaire)/))) {
    return uneSeule(q, (x) => x === `${SOLIDES[m![1]].faces} faces`, "les faces du patron");
  }
  if (/perspective cavalière/.test(t)) {
    if (/arêtes sont cachées/.test(t)) return uneSeule(q, (x) => x === "3 arêtes", "les arêtes cachées");
    if (/faces voit-on/.test(t)) return uneSeule(q, (x) => x === "3 faces", "les faces visibles");
    if (/sommets sont cachés/.test(t)) return uneSeule(q, (x) => x === "1 sommet", "les sommets cachés");
    if (/parallèles en vrai/.test(t)) return uneSeule(q, (x) => x === "parallèles aussi", "le parallélisme");
    return [`question non reconnue : ${t}`];
  }
  if ((m = t.match(/c’est (un cube|un pavé droit|une pyramide à base carrée|un prisme droit à base triangulaire)\. .*(faces|arêtes|sommets)/))) {
    const p: string[] = [];
    const o = OBJETS.find(([re]) => re.test(t));
    if (!o || o[1] !== m[1]) p.push(`l'objet du texte n'est pas ${m[1]}`);
    const s = SOLIDES[m[1]];
    const n = m[2] === "faces" ? s.faces : m[2] === "arêtes" ? s.aretes : s.sommets;
    return [...p, ...uneSeule(q, (x) => x === `${n} ${m![2]}`, `les ${m[2]} d’${m[1]}`)];
  }
  return [`question non reconnue : ${t}`];
};

// ─── VISION_DEFI : le grand cube peint ──────────────────────────────────────
const corrDefi: CorrecteurMaths = (q) => {
  const t = q.text;
  if (/Rangée de devant/.test(t)) return corrDenombrer(q);
  const m = t.match(/(\d+) (?:cubes|parts) de côté|(\d+) sur \2 sur \2/);
  if (!m) return [`taille du grand cube introuvable : ${t}`];
  const n = Number(m[1] ?? m[2]);
  const p: string[] = [];
  const tot = t.match(/en (\d+) petits cubes|formé de (\d+) petits cubes/);
  if (tot && Number(tot[1] ?? tot[2]) !== n ** 3) p.push(`${n} × ${n} × ${n} ne fait pas ${tot[1] ?? tot[2]}`);
  const v = /aucune face/.test(t) ? (n - 2) ** 3 : /exactement une face/.test(t) ? 6 * (n - 2) ** 2 : /exactement deux faces/.test(t) ? 12 * (n - 2) : /exactement trois faces/.test(t) ? 8 : NaN;
  if (Number.isNaN(v)) return [...p, `question non reconnue : ${t}`];
  return [...p, ...reponse(q, v, "cube")];
};

export const CORRECTEURS: CorrecteursMaths = {
  vision_vues_tpl_1: corrVues,
  vision_vues_tpl_pave: corrVues,
  vision_vues_tpl_ouverte: corrVues,

  vision_denombrer_tpl_1: corrDenombrer,
  vision_denombrer_tpl_pave: corrDenombrer,
  vision_denombrer_tpl_2: corrDenombrer,
  vision_denombrer_tpl_ouverte: corrDenombrer,

  vision_representation_tpl_1: corrRepresentation,
  vision_representation_tpl_faces_aretes: corrRepresentation,
  vision_representation_tpl_ouverte: corrRepresentation,

  vision_defi_tpl_1: corrDefi,
  vision_defi_tpl_ouverte: corrDefi,
};
