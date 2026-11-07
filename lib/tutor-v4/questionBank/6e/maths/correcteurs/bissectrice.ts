import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4, AngleCanvasData, DroitesCanvasData } from "@/lib/tutor-v4/types";
import { uneSeuleJuste, decimalesOk, anglesLus } from "./triangles";
import { mesure, verifierMesure, num, egal } from "./mediatrice";

// Correcteurs des gabarits de bissectrice.bank.ts (06/10/2026, voir types.ts).
// Chaque correcteur RELIT le texte (mesures, noms de l'angle et de la
// demi-droite) et la FIGURE (mesure de l'angle dessiné, position de la
// demi-droite, noms des points), refait le partage en deux — ou le double,
// ou le quart — et vérifie que seule la réponse attendue est juste, en degrés.

type Q = TutorGeneratedQuestionV4;

/** L'angle principal du texte : « l’angle USV mesure 84° », « un angle USV de 84° ». */
function anglePrincipal(t: string) {
  // Le PREMIER angle mesuré du texte : c'est celui de la situation (les parts viennent après).
  const ms = [
    /l’angle ([A-Z]{3}), qui mesure (\d+(?:,\d+)?)°/,
    /[Ll]’angle ([A-Z]{3}) mesure (\d+(?:,\d+)?)°/,
    /[Ll]’angle ([A-Z]{3}) représente [^.]*\. Il mesure (\d+(?:,\d+)?)°/,
    /un angle ([A-Z]{3}) de (\d+(?:,\d+)?)°/,
  ]
    .map((r) => t.match(r))
    .filter((m): m is RegExpMatchArray => Boolean(m))
    .sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
  return ms.length ? { nom: ms[0][1], v: num(ms[0][2]) } : null;
}
/** La figure « angle seul » : même mesure, mêmes noms que le texte. */
function figureAngle(q: Q, nom: string, v: number, p: string[]) {
  if (!q.canvas) return;
  if (q.canvas.kind !== "angle") return void p.push("figure inattendue");
  const a = (q.canvas as AngleCanvasData).angle;
  if (!egal(a.angleDeg, v)) p.push(`figure : angle de ${a.angleDeg}°, ${v}° dans le texte`);
  const l = a.labels ?? {};
  if (l.vertex !== nom[1] || [l.left, l.right].sort().join("") !== [nom[0], nom[2]].sort().join("")) p.push(`figure nommée ${l.left}${l.vertex}${l.right}, texte ${nom}`);
  if (l.angle && num(l.angle.replace("°", "")) !== v) p.push(`figure : mesure écrite ${l.angle}`);
}
/** La figure « angle et demi-droite » : angle total et angle entre [SW) et [SV) mesurés sur le dessin. */
function figureBissectrice(q: Q, noms: { s: string; u: string; v: string; w: string }) {
  if (!q.canvas || q.canvas.kind !== "droites") return null;
  const f = q.canvas as DroitesCanvasData;
  const pt = (l: string) => f.points?.find((x) => x.label === l);
  const [S, U, V, W] = [pt(noms.s), pt(noms.u), pt(noms.v), pt(noms.w)];
  if (!S || !U || !V || !W) return null;
  const ang = (A: { x: number; y: number }, B: { x: number; y: number }) => {
    let d = Math.abs(Math.atan2(A.y - S.y, A.x - S.x) - Math.atan2(B.y - S.y, B.x - S.x)) * (180 / Math.PI);
    if (d > 180) d = 360 - d;
    return d;
  };
  return { total: ang(U, V), wv: ang(W, V), uw: ang(U, W) };
}
const lettresBis = (t: string) => t.match(/\[([A-Z])([A-Z])\)/)?.slice(1, 3) ?? null;

// =====================================================================
// BISSECTRICE_DEFINITION
function corrigerConnaitre(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let juste: (c: string) => boolean;
  if (/Qu’est-ce que la bissectrice|définition de la bissectrice/.test(t)) juste = (c) => /partage l’angle [A-Z]{3} en deux angles égaux$/.test(c);
  else if (/représente aussi|est aussi…/.test(t)) juste = (c) => c === "son axe de symétrie";
  else if (/[Cc]ombien de bissectrices|a combien de bissectrices/.test(t)) juste = (c) => c === "une seule";
  else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}
function corrigerMoitie(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const a = anglePrincipal(t);
  if (!a) return ["angle illisible"];
  if (a.v <= 0 || a.v >= 180) p.push(`angle non saillant : ${a.v}°`);
  figureAngle(q, a.nom, a.v, p);
  verifierMesure(q, a.v / 2, "°", p);
  return p;
}
function corrigerFigureBis(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const a = anglePrincipal(t);
  const bis = lettresBis(t);
  if (!a || !bis) return ["angle ou demi-droite illisible"];
  const [s, w] = bis;
  const [u, , v] = a.nom.split("");
  const m1 = t.match(new RegExp(`[Ll]’angle ${u}${s}${w} mesure (\\d+(?:,\\d+)?)°`))?.[1];
  const m2 = t.match(new RegExp(`[Ll]’angle ${w}${s}${v} mesure (\\d+(?:,\\d+)?)°`))?.[1];
  if (!m1 || !m2) return ["les deux parts sont illisibles"];
  if (!egal(num(m1) + num(m2), a.v)) p.push(`${m1} + ${m2} ≠ ${a.v}`);
  const g = figureBissectrice(q, { s, u, v, w });
  if (!g) p.push("figure illisible");
  else {
    if (Math.abs(g.total - a.v) > 1) p.push(`figure : angle de ${g.total.toFixed(1)}°`);
    if (Math.abs(g.wv - num(m2)) > 1) p.push(`figure : l’angle ${w}${s}${v} mesure ${g.wv.toFixed(1)}° sur le dessin`);
  }
  const egaux = egal(num(m1), num(m2));
  uneSeuleJuste(q, (c) => (egaux ? /^oui : les angles .* sont égaux$/.test(c) : /^non : les angles .* ne sont pas égaux$/.test(c)), p);
  return p;
}
function corrigerRaisonsBis(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let juste: (c: string) => boolean;
  if (/part du sommet [A-Z], donc c’est la bissectrice/.test(t)) juste = (c) => /^non/.test(c) && /deux angles égaux/.test(c);
  else if (/ressemble-t-elle à la médiatrice/.test(t)) juste = (c) => /deux parts égales/.test(c) && /axes de symétrie/.test(c);
  else if (/« angle saillant »/.test(t)) juste = (c) => /deux angles/.test(c) && /plus petit/.test(c);
  else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}

// =====================================================================
// BISSECTRICE_CONSTRUIRE
function corrigerRapporteurQcm(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  if (/plie (?:sa|une|la) feuille/.test(t)) {
    uneSeuleJuste(q, (c) => /^la bissectrice de l’angle/.test(c), p);
    return p;
  }
  const a = anglePrincipal(t);
  if (!a) return ["angle illisible"];
  figureAngle(q, a.nom, a.v, p);
  uneSeuleJuste(q, (c) => mesure(c)?.u === "°" && egal(mesure(c)!.v, a.v / 2), p);
  return p;
}
function corrigerGraduation(q: Q): string[] {
  return corrigerMoitie(q);
}
function corrigerConstruireRaisons(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let juste: (c: string) => boolean;
  const q45 = t.match(/L’angle [A-Z]{3} mesure (\d+)°\. Pour le partager en deux, .* trace une demi-droite à 45°/);
  if (q45) {
    const m = num(q45[1]);
    if (m === 90) return ["angle droit : 45° serait juste"];
    juste = (c) => {
      const r = c.match(/^les deux parts font 45° et (\d+)° : ce n’est pas la bissectrice$/);
      return Boolean(r && num(r[1]) === m - 45);
    };
  } else if (/Quel est le bon ordre/.test(t)) juste = (c) => /^mesurer l’angle, diviser par 2/.test(c);
  else if (/par pliage, sans rien mesurer/.test(t)) juste = (c) => /se superposent/.test(c);
  else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}

// =====================================================================
// BISSECTRICE_PROBLEME
function corrigerDoubleMoitie(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  decimalesOk(t, p);
  const bis = lettresBis(t);
  if (!bis) return ["demi-droite illisible"];
  const [s, w] = bis;
  const fin = t.split(/(?<=[.?]) /).pop() ?? "";
  const demande = fin.match(/angle ([A-Z]{3})/)?.[1];
  if (!demande || demande[1] !== s) return ["angle demandé illisible"];
  const a = anglePrincipal(t);
  // Cas 1 : on connaît une moitié (un angle qui contient W) et on demande l'angle entier.
  const moitie = t.match(new RegExp(`L’angle ([A-Z]${s}${w}|${w}${s}[A-Z]) mesure (\\d+(?:,\\d+)?)°`));
  let total: number;
  if (moitie && !demande.includes(w)) {
    total = 2 * num(moitie[2]);
    verifierMesure(q, total, "°", p);
  } else if (a && !a.nom.includes(w) && demande.includes(w)) {
    total = a.v;
    verifierMesure(q, a.v / 2, "°", p);
  } else return [...p, "données illisibles"];
  if (total >= 180) p.push(`angle non saillant : ${total}°`);
  const nomTotal = moitie ? demande : a!.nom;
  const g = figureBissectrice(q, { s, u: nomTotal[0] === w ? nomTotal[2] : nomTotal[0], v: nomTotal[2] === w ? nomTotal[0] : nomTotal[2], w });
  if (q.canvas && !g) p.push("figure illisible");
  if (g && (Math.abs(g.total - total) > 1 || Math.abs(g.wv - g.uw) > 1)) p.push("figure : la demi-droite ne partage pas l’angle dessiné en deux");
  return p;
}
function corrigerProblemesBis(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let r: number;
  if (/angle plat/.test(t)) r = 90;
  else if (/angle droit/.test(t)) r = 45;
  else if (/équilatéral/.test(t)) r = 30;
  else if (/isocèle en ([A-Z]), et ses angles à la base mesurent (\d+)°/.test(t)) {
    const b = num(t.match(/angles à la base mesurent (\d+)°/)![1]);
    if (2 * b >= 180) p.push("angles à la base impossibles");
    r = (180 - 2 * b) / 2;
  } else {
    const as = anglesLus(t);
    if (as.length !== 2) return ["angles illisibles"];
    const z = 180 - as[0] - as[1];
    if (z <= 0) p.push("troisième angle impossible");
    r = z / 2;
  }
  verifierMesure(q, r, "°", p);
  return p;
}

// =====================================================================
// BISSECTRICE_DEFI
function corrigerQuart(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  const a = anglePrincipal(t);
  if (!a) return ["angle illisible"];
  if (!/puis la bissectrice de l’une des deux moitiés/.test(t)) p.push("deux bissectrices successives non annoncées");
  figureAngle(q, a.nom, a.v, p);
  verifierMesure(q, a.v / 4, "°", p);
  if (Math.round((a.v / 4) * 100) !== (a.v / 4) * 100) p.push("plus de deux décimales");
  return p;
}
function corrigerDefiRaisonsBis(q: Q): string[] {
  const p: string[] = [];
  const t = q.text;
  let juste: (c: string) => boolean;
  const tourne = t.match(/mesure (\d+)°, et .* tourne .* de (\d+)°/);
  const entiers = t.match(/part d’un angle de (\d+)°/);
  if (tourne) {
    const [m, d] = [num(tourne[1]), num(tourne[2])];
    juste = (c) => {
      const r = c.match(/^(\d+)° et (\d+)° : ce n’est plus la bissectrice$/);
      return Boolean(r && num(r[1]) === m / 2 + d && num(r[2]) === m / 2 - d);
    };
  } else if (entiers) {
    const m = num(entiers[1]);
    juste = (c) => {
      if (!/^non : /.test(c)) return false;
      const vals = [...c.matchAll(/(\d+(?:,\d+)?)°/g)].map((x) => num(x[1]));
      const suite = vals.every((x, i) => i === 0 ? x === m : egal(x, vals[i - 1] / 2));
      return suite && vals.length >= 3 && !Number.isInteger(vals[vals.length - 1]);
    };
  } else if (/Qu’est-ce qui change entre les deux/.test(t)) juste = (c) => /longueur/.test(c) && /angle/.test(c);
  else return ["question non reconnue"];
  uneSeuleJuste(q, juste, p);
  return p;
}

// =====================================================================
// ⭐ 07/11/2026 — CORRECTEURS DES GABARITS ★1-★2. Même contrat : on relit le texte
// et la figure, on recalcule, jamais on ne recopie. Tournure non reconnue = défaut.
// =====================================================================
const INCONNUE = ["tournure inconnue du correcteur"];
function seule(q: Q, juste: (c: string) => boolean): string[] {
  const p: string[] = [];
  uneSeuleJuste(q, juste, p);
  return p;
}
const trancher = (q: Q, vrai: boolean) => seule(q, (c) => ((q.choices ?? []).includes("vrai") ? c === (vrai ? "vrai" : "faux") : c === (vrai ? "oui" : "non")));
const mesuree = (q: Q, v: number) => {
  const p: string[] = [];
  verifierMesure(q, v, "°", p);
  decimalesOk(q.text, p);
  return p;
};
const degres = (t: string) => anglesLus(t);
const dos = (x: string) => x[2] + x[1] + x[0];
const memeAngle = (x: string, y: string) => x === y || x === dos(y);
const nomLu = (t: string) => t.match(/l’angle ([A-Z]{3})\b/i)?.[1] ?? null;
/** Les angles du dessin autour du sommet, pour une demi-droite [SW). */
function partsDessinees(q: Q, nom: string, w: string) {
  return figureBissectrice(q, { s: nom[1], u: nom[0], v: nom[2], w });
}
/** La figure dit-elle bien : angle entier `total`, deux parts de la bonne mesure ? */
function figureAccord(q: Q, nom: string, w: string, total: number, wv: number): string[] {
  const g = partsDessinees(q, nom, w);
  if (!g) return ["figure illisible"];
  if (Math.abs(g.total - total) > 1) return [`figure : angle de ${g.total.toFixed(1)}°, ${total}° dans le texte`];
  if (Math.abs(g.wv - wv) > 1 && Math.abs(g.uw - wv) > 1) return [`figure : parts de ${g.uw.toFixed(1)}° et ${g.wv.toFixed(1)}°, texte ${wv}°`];
  return [];
}
/** Sans nom dans le texte : la figure parle pour lui, on lit ses points. */
const nomDeFigure = (q: Q) => {
  const pts = (q.canvas as DroitesCanvasData | undefined)?.points;
  return pts && pts.length >= 4 ? { nom: pts[1].label! + pts[0].label! + pts[2].label!, w: pts[3].label! } : null;
};

// ----- BISSECTRICE_DEFINITION, ★1
function corrE1Figure(q: Q): string[] {
  const nom = nomLu(q.text);
  if (!nom) return INCONNUE;
  return seule(q, (c) => {
    const w = c.match(/^\[([A-Z])([A-Z])\)$/);
    if (!w || w[1] !== nom[1] || w[2] === nom[0] || w[2] === nom[2]) return false;
    const g = partsDessinees(q, nom, w[2]);
    return Boolean(g && Math.abs(g.uw - g.wv) < 1);
  });
}
function corrE1FigureOui(q: Q): string[] {
  const nom = nomLu(q.text);
  const bis = lettresBis(q.text);
  if (!nom || !bis || bis[0] !== nom[1]) return INCONNUE;
  const g = partsDessinees(q, nom, bis[1]);
  if (!g) return ["figure illisible"];
  if (!egal(Math.round(g.uw + g.wv), Math.round(g.total))) return ["figure : la demi-droite est hors de l’angle"];
  return trancher(q, Math.abs(g.uw - g.wv) < 1);
}
function corrE1Sommet(q: Q): string[] {
  const nom = nomLu(q.text);
  if (!nom) return INCONNUE;
  if (q.format === "qcm") return seule(q, (c) => c === nom[1]);
  return q.expected.join() === nom[1] ? [] : [`attendu « ${q.expected.join()} », le sommet est ${nom[1]}`];
}
function corrE1Egal(q: Q): string[] {
  const d = degres(q.text);
  const bis = lettresBis(q.text);
  if (d.length !== 1 || !bis) return INCONNUE;
  const p = mesuree(q, d[0]);
  const f = nomDeFigure(q);
  if (!f || f.w !== bis[1]) return [...p, "la figure ne porte pas la demi-droite du texte"];
  p.push(...figureAccord(q, f.nom, f.w, 2 * d[0], d[0]));
  return p;
}
const DEF_BIS: [RegExp, boolean][] = [
  [/en deux angles égaux/, true],
  [/part du sommet/, true],
  [/une seule bissectrice/, true],
  [/à l’intérieur/, true],
  [/axe de symétrie/, true],
  [/en trois angles égaux/, false],
  [/deux bissectrices/, false],
  [/un côté de l’angle/, false],
  [/toujours 45°/, false],
  [/à l’extérieur/, false],
];
function corrE1Vrai(q: Q): string[] {
  const d = DEF_BIS.filter(([re]) => re.test(q.text));
  return d.length === 1 ? trancher(q, d[0][1]) : INCONNUE;
}
function corrE1Moitie(q: Q): string[] {
  const d = degres(q.text);
  if (d.length !== 1) return INCONNUE;
  const p = mesuree(q, d[0] / 2);
  const c = q.canvas as AngleCanvasData | undefined;
  if (!c || c.kind !== "angle" || !egal(c.angle.angleDeg, d[0])) p.push("figure : l’angle dessiné n’est pas celui du texte");
  return p;
}
function corrE1Nom(q: Q): string[] {
  const t = q.text;
  if (/Que partage la bissectrice|Que coupe en deux une bissectrice|quelle figure/.test(t)) return seule(q, (c) => c === "un angle");
  const bis = lettresBis(t);
  const f = nomDeFigure(q);
  if (!bis || !f || f.w !== bis[1]) return INCONNUE;
  const g = partsDessinees(q, f.nom, f.w);
  if (!g || Math.abs(g.uw - g.wv) > 1) return ["figure : les deux parts ne sont pas égales"];
  const d = degres(t);
  if (d.length && Math.abs(g.uw - d[0]) > 1) return [`figure : parts de ${g.uw.toFixed(1)}°, texte ${d[0]}°`];
  return seule(q, (c) => c === "la bissectrice");
}

// ----- BISSECTRICE_DEFINITION, ★2
function corrE2Double(q: Q): string[] {
  const d = degres(q.text);
  const distinctes = [...new Set(d)];
  if (distinctes.length !== 1) return INCONNUE;
  const v = distinctes[0];
  if (2 * v >= 180) return [`angle non saillant : ${2 * v}°`];
  const p = mesuree(q, 2 * v);
  const f = nomDeFigure(q);
  if (!f) return [...p, "figure illisible"];
  p.push(...figureAccord(q, f.nom, f.w, 2 * v, v));
  return p;
}
function corrE2Verdict(q: Q): string[] {
  const t = q.text;
  const d = degres(t);
  let parts: [number, number] | null = null;
  if (/L’angle [A-Z]{3} mesure \d+°\. L’angle [A-Z]{3} mesure \d+°/.test(t) && d.length === 2) parts = [d[1], d[0] - d[1]]; // le total, puis une part
  else if (d.length === 3) parts = [d[1], d[2]];
  else if (d.length === 2) parts = [d[0], d[1]];
  if (!parts) return INCONNUE;
  const p = trancher(q, egal(parts[0], parts[1]));
  if (d.length === 3 && !egal(d[1] + d[2], d[0])) p.push(`${d[1]} + ${d[2]} ≠ ${d[0]}`);
  if (q.canvas) {
    const f = nomDeFigure(q);
    if (!f) return [...p, "figure illisible"];
    p.push(...figureAccord(q, f.nom, f.w, parts[0] + parts[1], parts[1]));
  }
  return p;
}
function corrE2Reste(q: Q): string[] {
  const d = degres(q.text);
  if (d.length !== 2) return INCONNUE;
  const [t, a] = [Math.max(...d), Math.min(...d)];
  const p = mesuree(q, t - a);
  const f = nomDeFigure(q);
  if (!f) return [...p, "figure illisible"];
  p.push(...figureAccord(q, f.nom, f.w, t, t - a));
  return p;
}
function corrE2Phrase(q: Q): string[] {
  const t = q.text;
  const nom = nomLu(t);
  const bis = lettresBis(t);
  if (!nom || !bis) return INCONNUE;
  const cherche = /fausse/.test(t) ? false : /juste|vraie/.test(t) ? true : null;
  if (cherche === null) return INCONNUE;
  const taille = (x: string) => (memeAngle(x, nom) ? 2 : memeAngle(x, nom[0] + nom[1] + bis[1]) || memeAngle(x, bis[1] + nom[1] + nom[2]) ? 1 : NaN);
  const vraie = (c: string) => {
    let m: RegExpMatchArray | null;
    if ((m = c.match(/^([A-Z]{3}) et ([A-Z]{3}) sont égaux$/))) return egal(taille(m[1]), taille(m[2]));
    if ((m = c.match(/^([A-Z]{3}) est le double de ([A-Z]{3})$/))) return egal(taille(m[1]), 2 * taille(m[2]));
    if ((m = c.match(/^([A-Z]{3}) est la moitié de ([A-Z]{3})$/))) return egal(2 * taille(m[1]), taille(m[2]));
    return null;
  };
  if ((q.choices ?? []).some((c) => vraie(c) === null)) return [`phrase illisible : ${(q.choices ?? []).join(" | ")}`];
  return seule(q, (c) => vraie(c) === cherche);
}
function corrE2QuelAngle(q: Q): string[] {
  const t = q.text;
  const nom = nomLu(t);
  const bis = lettresBis(t);
  const m = t.match(/(?:égal à|double de) ([A-Z]{3})\b|égal à ([A-Z]{3})\b/);
  const x = m?.[1] ?? m?.[2];
  if (!nom || !bis || !x) return INCONNUE;
  const [uw, wv] = [nom[0] + nom[1] + bis[1], bis[1] + nom[1] + nom[2]];
  if (!memeAngle(x, uw) && !memeAngle(x, wv)) return ["l’angle cité n’est pas une part"];
  const cible = /double/.test(t) ? nom : memeAngle(x, uw) ? wv : uw;
  const f = figureBissectrice(q, { s: nom[1], u: nom[0], v: nom[2], w: bis[1] });
  if (!f || Math.abs(f.uw - f.wv) > 1) return ["figure : [SW) n’est pas dessinée en bissectrice"];
  if (q.format === "qcm") return seule(q, (c) => memeAngle(c, cible));
  return q.expected.length === 2 && q.expected.every((e) => memeAngle(e, cible)) ? [] : [`attendu « ${q.expected.join(" / ")} », il faut ${cible}`];
}
function corrE2DroitPlat(q: Q): string[] {
  const droit = /angle droit/.test(q.text);
  const plat = /angle plat/.test(q.text);
  if (droit === plat) return INCONNUE;
  return mesuree(q, plat ? 90 : 45);
}
function corrE2Nature(q: Q): string[] {
  const d = degres(q.text);
  if (d.length !== 1) return INCONNUE;
  const moitie = d[0] / 2;
  const nature = moitie < 90 ? "aigu" : egal(moitie, 90) ? "droit" : "obtus";
  const fin = q.text;
  if (/est-elle un angle aigu/.test(fin)) return trancher(q, nature === "aigu");
  if (/est-elle un angle droit/.test(fin)) return trancher(q, nature === "droit");
  if (!/nature|un angle…/.test(fin)) return INCONNUE;
  return seule(q, (c) => c === nature);
}

// ----- BISSECTRICE_CONSTRUIRE, ★2
/** L'ordre des gestes, propre au correcteur : relu dans la proposition, pas recopié. */
const ORDRE_GESTES: [RegExp, number][] = [[/^mesurer/, 0], [/^diviser/, 1], [/^marquer/, 2], [/^tracer/, 3]];
const rangGeste = (c: string) => ORDRE_GESTES.find(([re]) => re.test(c))?.[1] ?? -1;
function corrCOrdre(q: Q): string[] {
  const t = q.text;
  const rangs: Record<string, number> = { première: 0, deuxième: 1, troisième: 2, dernière: 3 };
  const r = t.match(/(première|deuxième|troisième|dernière) étape/)?.[1];
  if (r) return seule(q, (c) => rangGeste(c) === rangs[r]);
  const m = t.match(/juste (après|avant) « ([^»]+) »/);
  if (!m) return INCONNUE;
  const i = rangGeste(m[2].trim());
  if (i < 0) return INCONNUE;
  return seule(q, (c) => rangGeste(c) === i + (m[1] === "après" ? 1 : -1));
}
function corrCPoser(q: Q): string[] {
  const nom = q.text.match(/\b([A-Z]{3})\b/)?.[1];
  if (!nom) return INCONNUE;
  if (/centre du rapporteur/.test(q.text)) return q.format === "qcm" ? seule(q, (c) => c === `sur le sommet ${nom[1]}`) : q.expected.join() === nom[1] ? [] : [`le sommet est ${nom[1]}`];
  if (/zéro du rapporteur/.test(q.text)) return seule(q, (c) => /^sur un côté/.test(c));
  return INCONNUE;
}
function corrCPli(q: Q): string[] {
  const t = q.text;
  if (/Faut-il d’abord mesurer/.test(t)) return trancher(q, false);
  const cote = [...t.matchAll(/\[([A-Z])([A-Z])\)/g)];
  const nomA = t.match(/l’angle ([A-Z]{3})/)?.[1];
  if (nomA && cote.length === 1) {
    const [S, U] = [cote[0][1], cote[0][2]];
    if (nomA[1] !== S || (nomA[0] !== U && nomA[2] !== U)) return ["le côté cité n’est pas un côté de l’angle"];
    const autre = nomA[0] === U ? nomA[2] : nomA[0];
    return seule(q, (c) => c === `[${S}${autre})`);
  }
  if (cote.length !== 2 || cote[0][1] !== cote[1][1] || cote[0][2] === cote[1][2]) return INCONNUE;
  const S = cote[0][1];
  if (/Par quel point/.test(t)) return q.expected.join() === S ? [] : [`le pli passe par ${S}`];
  if (/De quel point/.test(t)) return seule(q, (c) => c === S);
  if (/est-il la bissectrice/.test(t)) return trancher(q, true);
  if (/Combien de parts/.test(t)) return seule(q, (c) => c === "2");
  if (/Comment sont les deux parts/.test(t)) return seule(q, (c) => c === "égales");
  return INCONNUE;
}
function corrCInverse(q: Q): string[] {
  const d = degres(q.text);
  if (d.length !== 1 || !/bissectrice|moitié/.test(q.text)) return INCONNUE;
  if (2 * d[0] >= 180) return [`angle non saillant : ${2 * d[0]}°`];
  return mesuree(q, 2 * d[0]);
}
function corrCVerifie(q: Q): string[] {
  const d = degres(q.text);
  if (d.length !== 2) return INCONNUE;
  const [m, a] = d; // toutes les tournures donnent l'angle, puis la graduation
  const p = trancher(q, egal(a, m / 2));
  if (q.canvas) {
    const c = q.canvas as AngleCanvasData;
    if (c.kind !== "angle" || !egal(c.angle.angleDeg, m)) p.push("figure : l’angle dessiné n’est pas celui du texte");
  }
  return p;
}
function corrCOutil(q: Q): string[] {
  const t = q.text;
  if (/Sans outil|pas de rapporteur/.test(t)) return seule(q, (c) => /^plier/.test(c));
  if (/trace/.test(t)) return seule(q, (c) => c === "la règle");
  if (/mesure|marque/.test(t)) return seule(q, (c) => c === "le rapporteur");
  return INCONNUE;
}
function corrCCalcul(q: Q): string[] {
  const d = degres(q.text);
  if (d.length !== 1 || !/graduation/.test(q.text)) return INCONNUE;
  const p = mesuree(q, d[0] / 2);
  const c = q.canvas as AngleCanvasData | undefined;
  if (!c || c.kind !== "angle" || !egal(c.angle.angleDeg, d[0])) p.push("figure : l’angle dessiné n’est pas celui du texte");
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  bissectrice_definition_tpl_connaitre: corrigerConnaitre,
  bissectrice_definition_tpl_1: corrigerMoitie,
  bissectrice_definition_tpl_situation: corrigerMoitie,
  bissectrice_definition_tpl_figure: corrigerFigureBis,
  bissectrice_definition_tpl_ouverte: corrigerRaisonsBis,
  bissectrice_construire_tpl_rapporteur: corrigerRapporteurQcm,
  bissectrice_construire_tpl_1: corrigerGraduation,
  bissectrice_construire_tpl_ouverte: corrigerConstruireRaisons,
  bissectrice_probleme_tpl_1: corrigerDoubleMoitie,
  bissectrice_probleme_tpl_ouverte: corrigerProblemesBis,
  bissectrice_defi_tpl_1: corrigerQuart,
  bissectrice_defi_tpl_ouverte: corrigerDefiRaisonsBis,
  bissectrice_definition_tpl_e1_figure: corrE1Figure,
  bissectrice_definition_tpl_e1_figure_oui: corrE1FigureOui,
  bissectrice_definition_tpl_e1_sommet: corrE1Sommet,
  bissectrice_definition_tpl_e1_egal: corrE1Egal,
  bissectrice_definition_tpl_e1_vrai: corrE1Vrai,
  bissectrice_definition_tpl_e1_moitie: corrE1Moitie,
  bissectrice_definition_tpl_e1_nom: corrE1Nom,
  bissectrice_definition_tpl_e2_double: corrE2Double,
  bissectrice_definition_tpl_e2_verdict: corrE2Verdict,
  bissectrice_definition_tpl_e2_reste: corrE2Reste,
  bissectrice_definition_tpl_e2_phrase: corrE2Phrase,
  bissectrice_definition_tpl_e2_quel_angle: corrE2QuelAngle,
  bissectrice_definition_tpl_e2_droit_plat: corrE2DroitPlat,
  bissectrice_definition_tpl_e2_nature: corrE2Nature,
  bissectrice_construire_tpl_e2_ordre: corrCOrdre,
  bissectrice_construire_tpl_e2_poser: corrCPoser,
  bissectrice_construire_tpl_e2_pli: corrCPli,
  bissectrice_construire_tpl_e2_inverse: corrCInverse,
  bissectrice_construire_tpl_e2_verifie: corrCVerifie,
  bissectrice_construire_tpl_e2_outil: corrCOutil,
  bissectrice_construire_tpl_e2_calcul: corrCCalcul,
};
