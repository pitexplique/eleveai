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
  const m1 = t.match(new RegExp(`l’angle ${u}${s}${w} mesure (\\d+(?:,\\d+)?)°`))?.[1];
  const m2 = t.match(new RegExp(`l’angle ${w}${s}${v} mesure (\\d+(?:,\\d+)?)°`))?.[1];
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
  if (/plie sa feuille/.test(t)) {
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

export const CORRECTEURS: CorrecteursMaths = {
  bissectrice_definition_tpl_connaitre: corrigerConnaitre,
  bissectrice_definition_tpl_1: corrigerMoitie,
  bissectrice_definition_tpl_figure: corrigerFigureBis,
  bissectrice_definition_tpl_ouverte: corrigerRaisonsBis,
  bissectrice_construire_tpl_rapporteur: corrigerRapporteurQcm,
  bissectrice_construire_tpl_1: corrigerGraduation,
  bissectrice_construire_tpl_ouverte: corrigerConstruireRaisons,
  bissectrice_probleme_tpl_1: corrigerDoubleMoitie,
  bissectrice_probleme_tpl_ouverte: corrigerProblemesBis,
  bissectrice_defi_tpl_1: corrigerQuart,
  bissectrice_defi_tpl_ouverte: corrigerDefiRaisonsBis,
};
