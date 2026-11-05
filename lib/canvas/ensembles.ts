// lib/canvas/ensembles.ts
//
// LA GÉOMÉTRIE DU DIAGRAMME D'ENSEMBLES (05/11/2026). Rien n'est saisi à la main : un
// élément donne ses appartenances (`dans`), et on cherche une place où tout son texte
// est DANS ses ensembles et HORS des autres. `place: false` veut dire que ça ne tient
// pas : le gabarit retire alors un autre tirage, et le correcteur le vérifie.

export type FigureEnsembles = {
  ensembles: string[];
  elements: { nom: string; dans: number[] }[];
  disjoints?: boolean;
};

type Cercle = { x: number; y: number; r: number };

/** Coupe un texte en lignes d'au plus `max` caractères, sans couper les mots. */
export function couper(texte: string, max: number): string[] {
  const lignes: string[] = [];
  let l = "";
  for (const mot of texte.split(" ")) {
    if (l && (l + " " + mot).length > max) {
      lignes.push(l);
      l = mot;
    } else l = l ? `${l} ${mot}` : mot;
  }
  if (l) lignes.push(l);
  return lignes;
}

export const LARGEUR = 360;
const HAUT_NOMS = 44; // deux lignes de noms au-dessus des cercles
const DEMI_HAUT = 8;
const demiLarge = (nom: string) => nom.length * 3.6 + 3;

function cercles(n: number, disjoints?: boolean): Cercle[] {
  if (n === 3) {
    const r = 92;
    const y = HAUT_NOMS + r;
    return [{ x: 122, y, r }, { x: 238, y, r }, { x: 180, y: y + 100, r }];
  }
  if (disjoints) {
    const r = 84;
    return [{ x: 92, y: HAUT_NOMS + r, r }, { x: 268, y: HAUT_NOMS + r, r }];
  }
  const r = 112;
  return [{ x: 130, y: HAUT_NOMS + r, r }, { x: 230, y: HAUT_NOMS + r, r }];
}

const dedans = (c: Cercle, x: number, y: number, marge: number) => Math.hypot(x - c.x, y - c.y) <= c.r - marge;
const dehors = (c: Cercle, x: number, y: number, marge: number) => Math.hypot(x - c.x, y - c.y) >= c.r + marge;

/* Les places possibles d'un texte de cette largeur dans cette zone, de la plus centrale
   à la plus excentrée. Mémorisé : ce calcul est refait à chaque question tirée. */
const MEMO = new Map<string, { x: number; y: number }[]>();

function places(cs: Cercle[], cleConfig: string, dans: number[], dl: number, basCercles: number, hauteur: number) {
  const cle = `${cleConfig}|${dans.join("")}|${dl}`;
  const deja = MEMO.get(cle);
  if (deja) return deja;
  const trouves: { x: number; y: number }[] = [];
  const horsDeTout = dans.length === 0;
  const haut = horsDeTout ? basCercles : DEMI_HAUT;
  for (let y = haut + DEMI_HAUT; y <= hauteur - DEMI_HAUT; y += 4) {
    for (let x = dl + 2; x <= LARGEUR - dl - 2; x += 4) {
      const bords = [[x - dl, y - DEMI_HAUT], [x, y - DEMI_HAUT], [x + dl, y - DEMI_HAUT], [x - dl, y], [x + dl, y], [x - dl, y + DEMI_HAUT], [x, y + DEMI_HAUT], [x + dl, y + DEMI_HAUT]];
      const ok = bords.every(([bx, by]) => cs.every((c, k) => (dans.includes(k) ? dedans(c, bx, by, 3) : dehors(c, bx, by, 3))));
      if (ok) trouves.push({ x, y });
    }
  }
  const mx = trouves.reduce((s, p) => s + p.x, 0) / (trouves.length || 1);
  const my = trouves.reduce((s, p) => s + p.y, 0) / (trouves.length || 1);
  trouves.sort((a, b) => Math.hypot(a.x - mx, a.y - my) - Math.hypot(b.x - mx, b.y - my));
  MEMO.set(cle, trouves);
  return trouves;
}

export type PlanEnsembles = {
  W: number;
  H: number;
  cercles: Cercle[];
  noms: { lignes: string[]; x: number; y: number; ancre: "start" | "end" | "middle" }[];
  elements: { nom: string; dans: number[]; x: number; y: number; place: boolean }[];
};

export function planEnsembles(f: FigureEnsembles): PlanEnsembles {
  const n = f.ensembles.length;
  const cs = cercles(n, f.disjoints);
  const basCercles = Math.max(...cs.map((c) => c.y + c.r));
  const coupes = f.ensembles.map((e) => couper(e, 23));
  const noms: PlanEnsembles["noms"] = [
    { lignes: coupes[0], x: 6, y: 15, ancre: "start" },
    { lignes: coupes[1], x: LARGEUR - 6, y: 15, ancre: "end" },
  ];
  let bas = basCercles;
  if (n === 3) {
    noms.push({ lignes: coupes[2], x: cs[2].x, y: bas + 17, ancre: "middle" });
    bas += 6 + 16 * coupes[2].length;
  }
  const horsDeTout = f.elements.some((e) => e.dans.length === 0);
  const H = bas + (horsDeTout ? 44 : 6);
  const cleConfig = `${n}|${f.disjoints ? 1 : 0}|${H}`;

  // Les plus longs d'abord : c'est eux qui ont le moins de places possibles.
  const ordre = f.elements.map((e, i) => ({ e, i })).sort((a, b) => b.e.nom.length - a.e.nom.length);
  const poses: { x: number; y: number; dl: number }[] = [];
  const sortie: PlanEnsembles["elements"] = f.elements.map((e) => ({ ...e, x: 0, y: 0, place: false }));
  for (const { e, i } of ordre) {
    const dl = demiLarge(e.nom);
    const trouve = places(cs, cleConfig, [...e.dans].sort(), dl, bas, H).find((p) =>
      poses.every((q) => Math.abs(p.x - q.x) >= dl + q.dl + 3 || Math.abs(p.y - q.y) >= 2 * DEMI_HAUT + 1),
    );
    if (trouve) {
      poses.push({ ...trouve, dl });
      sortie[i] = { ...e, x: trouve.x, y: trouve.y, place: true };
    }
  }
  return { W: LARGEUR, H, cercles: cs, noms, elements: sortie };
}
