import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { accordPronom, lireReponse, mesures, val, verifierReponse, verifierQcm, egal, LONGUEUR } from "./aires";

// LES CORRECTEURS DE distances.bank.ts (06/10/2026, voir types.ts).
// Chacun relit les LETTRES et les NOMBRES du texte (et du canvas), refait le
// raisonnement — notation, milieu, inégalité AC + CB ⩾ AB — et rend la liste
// des problèmes (vide = juste).

type Q = TutorGeneratedQuestionV4;
const NB = String.raw`\d+(?:,\d+)?`;
const derniere = (t: string) => t.split(/(?<=[.?!])\s+/).pop() ?? "";

// ─── distance_definition ────────────────────────────────────────────────────

function corrigerNotation(q: Q): string[] {
  const t = q.text;
  const cite = t.match(/« ([^»]+) »/);
  if (cite) {
    // « Que désigne (PQ) ? » : la table propre au correcteur.
    const e = cite[1].trim();
    const m = e.match(/^([[(]?)([A-Z])([A-Z])([\])]?)$/);
    if (!m) return [`écriture illisible : « ${e} »`];
    const [, o, P, Q2, f] = m;
    const genre =
      o === "(" && f === ")" ? "droite" : o === "[" && f === "]" ? "segment" : o === "[" && f === ")" ? "demi-droite" : !o && !f ? "longueur" : null;
    if (!genre) return [`écriture inconnue : « ${e} »`];
    const p: string[] = [];
    if (!q.expected[0].startsWith(`la ${genre}`) && !q.expected[0].startsWith(`le ${genre}`)) p.push(`« ${e} » est ${genre === "longueur" ? "une longueur" : `un(e) ${genre}`}, attendu « ${q.expected[0]} »`);
    if (!q.expected[0].includes(P) || !q.expected[0].includes(Q2)) p.push("la réponse ne parle pas des mêmes points");
    if (genre === "demi-droite" && !q.expected[0].includes(`origine ${P}`)) p.push("l'origine de la demi-droite est fausse");
    return p;
  }
  // « Quelle écriture est correcte ? » : une seule proposition sans crochets ni parenthèses.
  // Le segment [PQ], ou à défaut les deux lettres isolées du texte (« les points D et P »).
  const seules = [...t.matchAll(/(?<![\p{L}])([A-Z])(?![\p{L}])/gu)].map((m) => m[1]);
  const pts = t.match(/\[([A-Z])([A-Z])\]/) ?? (seules.length === 2 ? ["", seules[0], seules[1]] : null);
  if (!pts) return ["les deux points sont introuvables"];
  const d = mesures(t, LONGUEUR);
  if (d.length !== 1) return [`il faut une seule longueur, lu : ${d.length}`];
  const bonne = `${pts[1]}${pts[2]} = ${String(d[0].v).replace(".", ",")} ${d[0].u}`;
  const p: string[] = [];
  if (q.expected[0] !== bonne) p.push(`attendu « ${q.expected[0]} », il faut « ${bonne} »`);
  const sansCrochets = (q.choices ?? []).filter((c) => /^[A-Z]{2} = [\d,]+ [a-z]+$/.test(c));
  if (sansCrochets.length !== 1) p.push(`il faut une seule écriture sans crochets : ${(q.choices ?? []).join(" | ")}`);
  const max: Record<string, number> = { cm: 30, m: 100, km: 100 };
  if (!(d[0].v > 0 && d[0].v <= (max[d[0].u] ?? 0))) p.push(`longueur peu plausible : ${d[0].v} ${d[0].u}`);
  return [...p, ...accordPronom(t)];
}

/**
 * Les anciennes questions ouvertes, devenues QCM de raisonnement. Table propre
 * au correcteur : d'après la question lue, à quoi se reconnaît la SEULE bonne
 * explication. Exactement une proposition doit la vérifier : l'attendue.
 */
const esc = (s: string) => s.replace(/[[\]()]/g, "\\$&");
function regleRaisonnement(t: string): ((c: string) => boolean) | null {
  let m: RegExpMatchArray | null;
  if ((m = t.match(/différence entre \(([A-Z]{2})\)/)) || (m = t.match(/confond \(([A-Z]{2})\)/))) {
    const s = m[1];
    return (c) => c.startsWith(`(${s}) est une droite, [${s}] un segment, ${s} une longueur`);
  }
  if ((m = t.match(/a écrit « \[([A-Z]{2})\] = (\d+) cm »/))) {
    const [, s, n] = m;
    return (c) => c.startsWith(`[${s}] est un segment`) && c.endsWith(`il faut écrire ${s} = ${n} cm`);
  }
  if (/jamais plus court que le segment/.test(t)) return (c) => /plus court chemin/.test(c);
  if (/Est-ce sûr \?/.test(t)) return (c) => /^pas forcément.*sur le segment/.test(c);
  if (/règle graduée/.test(t)) return (c) => /compas.*intersection/.test(c);
  if (/combien le segment .* de milieux/.test(t)) return (c) => c === "un seul";
  if (/plus petit que|plus court qu’en ligne droite/.test(t)) return (c) => /^non : .*plus court chemin/.test(c);
  if (/Comment savoir si .* alignés/.test(t)) return (c) => /plus grande distance est égale à la somme des deux autres/.test(c);
  if (/alors [A-Z] est loin/.test(t)) return (c) => /^c’est faux : .*tout près/.test(c);
  if (/tout petit détour/.test(t)) return (c) => /^au moins aussi long/.test(c);
  if ((m = t.match(/annonce (\d+) km .* mais (\d+) km en passant/))) {
    const detour = Number(m[2]) > Number(m[1]);
    if (Number(m[2]) < Number(m[1])) return () => false; // un détour plus court que le direct : impossible
    return (c) => (detour ? /^elle n’est pas sur le segment/.test(c) : /^elle est sur le segment/.test(c));
  }
  if (/quatre parts égales/.test(t)) return (c) => /puis le milieu de/.test(c);
  return null;
}

function corrigerRaisonnement(q: Q): string[] {
  const p: string[] = [];
  if (q.format !== "qcm" || q.comparator !== "mcq_exact") p.push("QCM attendu");
  const choix = q.choices ?? [];
  if (choix.length !== 4 || new Set(choix).size !== 4) p.push(`il faut quatre propositions distinctes : ${choix.join(" | ")}`);
  const regle = regleRaisonnement(q.text);
  if (!regle) return [...p, "question non reconnue par le correcteur"];
  const justes = choix.filter(regle);
  if (justes.length !== 1) p.push(`${justes.length} proposition(s) justes : ${justes.join(" | ")}`);
  else if (justes[0] !== q.expected[0]) p.push(`la juste « ${justes[0]} » n'est pas l'attendue « ${q.expected[0]} »`);
  // Les points nommés dans la réponse sont ceux du texte (M, le milieu construit, excepté).
  const noms = (s: string) => new Set((s.match(/(?<![\p{L}])[A-Z]{1,3}(?![\p{L}])/gu) ?? []).join("").split(""));
  const duTexte = noms(q.text);
  for (const l of noms(q.expected[0])) if (l !== "M" && !duTexte.has(l)) p.push(`la réponse parle du point ${esc(l)}, absent du texte`);
  return [...p, ...accordPronom(q.text)];
}
const corrigerOuverte = corrigerRaisonnement;

// ─── distance_milieu, distance_defi : les points sur une droite ─────────────

/**
 * Place les points sur une droite graduée à partir des phrases « M est le
 * milieu de [AB] » (ou « M, le milieu de [AB] »), puis lit la donnée
 * « XY = 12 cm » et la longueur demandée (le dernier nom à deux lettres de la
 * dernière phrase). Rend la longueur recalculée.
 */
function resoudreSurLaDroite(t: string): { r: number; u: string; points: Record<string, number> } | string {
  const rel = [...t.matchAll(/([A-Z]),? (?:est )?(?:le )?milieu de \[([A-Z])([A-Z])\]/g)].map((m) => [m[1], m[2], m[3]]);
  if (!rel.length) return "aucune phrase « … est le milieu de [..] »";
  const pos: Record<string, number> = { [rel[0][1]]: 0, [rel[0][2]]: 1 };
  for (let tour = 0; tour < 4; tour++)
    for (const [X, Y, Z] of rel) if (pos[Y] != null && pos[Z] != null) pos[X] = (pos[Y] + pos[Z]) / 2;
  if (rel.some(([X]) => pos[X] == null)) return "un milieu n'a pas pu être placé";
  const donnees = [...t.matchAll(new RegExp(`\\b([A-Z])([A-Z]) = (${NB}) (km|dm|cm|mm|m)\\b`, "g"))];
  if (donnees.length !== 1) return `il faut une seule longueur donnée, lu : ${donnees.length}`;
  const [, P1, P2, v, u] = donnees[0];
  if (pos[P1] == null || pos[P2] == null || pos[P1] === pos[P2]) return `la donnée ${P1}${P2} ne porte pas sur deux points placés`;
  const echelle = val(v) / Math.abs(pos[P1] - pos[P2]);
  const demandes = [...derniere(t).matchAll(/\b([A-Z])([A-Z])\b/g)];
  const d = demandes[demandes.length - 1];
  if (!d) return "longueur demandée introuvable";
  if (pos[d[1]] == null || pos[d[2]] == null) return `la longueur demandée ${d[1]}${d[2]} porte sur un point inconnu`;
  if (d[1] + d[2] === P1 + P2 || d[2] + d[1] === P1 + P2) return "on demande la longueur déjà donnée";
  return { r: Math.abs(pos[d[1]] - pos[d[2]]) * echelle, u, points: pos };
}

function corrigerMilieu(q: Q): string[] {
  const s = resoudreSurLaDroite(q.text);
  if (typeof s === "string") return [s];
  const p = verifierReponse(q, s.r, s.u);
  // Le canvas : les mêmes lettres que le texte, le milieu au milieu.
  const c = q.canvas as any;
  if (c) {
    const etiquettes = (c.points ?? []).map((x: any) => x.label).sort().join("");
    const attendues = Object.keys(s.points).sort().join("");
    if (etiquettes !== attendues) p.push(`canvas : points ${etiquettes}, texte : ${attendues}`);
    const [a, b, m] = ["", "", ""].map((_, i) => (c.points ?? [])[i]);
    if (a && b && m && Math.abs((a.x + b.x) / 2 - m.x) > 1e-6) p.push("canvas : le milieu n'est pas au milieu");
  }
  return [...p, ...accordPronom(q.text)];
}

function corrigerEstMilieu(q: Q): string[] {
  const t = q.text;
  const m = t.match(/([A-Z]) est-il le milieu de \[([A-Z])([A-Z])\]/);
  if (!m) return corrigerMilieu(q);
  const [, P, A, B] = m;
  const la = t.match(new RegExp(`${P}${A} = (${NB}) (cm|m)`));
  const lb = t.match(new RegExp(`${P}${B} = (${NB}) (cm|m)`));
  if (!la || !lb) return ["les longueurs PA et PB sont illisibles"];
  const hors = /hors de la droite|triangle/.test(t);
  const sur = new RegExp(`${P} est sur le segment|un point ${P} sur le segment`).test(t);
  if (hors === sur) return ["on ne sait pas si le point est sur le segment"];
  const egales = egal(val(la[1]), val(lb[1])) && la[2] === lb[2];
  const choix = q.choices ?? [];
  const trouve = (re: RegExp) => choix.filter((c) => re.test(c));
  const oui = trouve(/^oui/);
  const nonInegal = trouve(/ne sont pas égales/);
  const nonHors = trouve(/n’est pas sur le segment/);
  if (oui.length !== 1 || nonInegal.length !== 1 || nonHors.length !== 1) return [`propositions mal formées : ${choix.join(" | ")}`];
  const juste = hors ? nonHors[0] : egales ? oui[0] : nonInegal[0];
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », il faut « ${juste} »`);
  if (hors && !egales) p.push("hors du segment ET longueurs inégales : deux raisons à la fois");
  return [...p, ...accordPronom(t)];
}

// ─── distance_inegalite ─────────────────────────────────────────────────────

function corrigerInegalite(q: Q): string[] {
  const t = q.text;
  const d = new Map<string, { v: number; u: string }>();
  for (const m of t.matchAll(new RegExp(`\\b([A-Z])([A-Z]) = (${NB}) (km|cm|m)\\b`, "g")))
    d.set([m[1], m[2]].sort().join(""), { v: val(m[3]), u: m[4] });
  if (d.size !== 3) return [`il faut trois distances, lu : ${d.size}`];
  const unites = new Set([...d.values()].map((x) => x.u));
  if (unites.size !== 1) return ["les distances ne sont pas dans la même unité"];
  const u = [...unites][0];
  const L = (x: string, y: string) => d.get([x, y].sort().join(""))?.v;
  const vs = [...d.values()].map((x) => x.v).sort((a, b) => a - b);
  const p: string[] = [];
  if (vs[2] > vs[0] + vs[1]) p.push(`trois distances impossibles : ${vs.join(", ")} (aucun triangle ne les a)`);
  const fin = derniere(t);
  const seg = fin.match(/segment \[([A-Z])([A-Z])\]/);
  const trajet = t.match(/trajet ([A-Z]) → ([A-Z]) → ([A-Z])/) ?? fin.match(/Passer par ([A-Z]) pour aller de ([A-Z]) à ([A-Z])/);
  if (/alignés/.test(fin)) {
    const juste = egal(vs[2], vs[0] + vs[1]) ? "oui" : "non";
    if (q.expected[0] !== juste) p.push(`alignés : attendu « ${q.expected[0]} », recalculé « ${juste} »`);
  } else if (seg) {
    const [A, B] = [seg[1], seg[2]];
    const C = [...new Set([...d.keys()].join("").split(""))].find((x) => x !== A && x !== B)!;
    const juste = egal(L(A, C)! + L(C, B)!, L(A, B)!) ? "oui" : "non";
    if (q.expected[0] !== juste) p.push(`[${A}${B}] : attendu « ${q.expected[0]} », recalculé « ${juste} »`);
  } else if (trajet && /De combien/.test(fin)) {
    const [A, C, B] = [trajet[1], trajet[2], trajet[3]];
    p.push(...verifierReponse(q, L(A, C)! + L(C, B)! - L(A, B)!, u));
  } else if (trajet) {
    const [C, A, B] = [trajet[1], trajet[2], trajet[3]];
    const juste = L(A, C)! + L(C, B)! > L(A, B)! ? "oui" : "non";
    if (q.expected[0] !== juste) p.push(`détour : attendu « ${q.expected[0]} », recalculé « ${juste} »`);
  } else return ["question illisible"];
  return [...p, ...accordPronom(t)];
}

export const CORRECTEURS: CorrecteursMaths = {
  distance_milieu_tpl_e1: corrigerMilieu,
  distance_milieu_tpl_1: corrigerMilieu,
  distance_milieu_tpl_e3: corrigerEstMilieu,
  distance_milieu_tpl_ouverte: corrigerOuverte,
  distance_inegalite_tpl_1: corrigerInegalite,
  distance_inegalite_tpl_ouverte: corrigerOuverte,
  distance_defi_tpl_1: corrigerMilieu,
  distance_defi_tpl_ouverte: corrigerOuverte,
  distance_definition_tpl_1: corrigerNotation,
  distance_definition_tpl_ouverte: corrigerOuverte,
};
