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

/** Les phrases qui posent un milieu : [milieu, extrémité, extrémité]. */
function relationsMilieu(t: string): string[][] {
  return [
    ...[...t.matchAll(/([A-Z]),? (?:est )?(?:le )?milieu de \[([A-Z])([A-Z])\]/g)].map((m) => [m[1], m[2], m[3]]),
    ...[...t.matchAll(/[Ll]e milieu de \[([A-Z])([A-Z])\] est ([A-Z])\b/g)].map((m) => [m[3], m[1], m[2]]),
    ...[...t.matchAll(/\[([A-Z])([A-Z])\] a pour milieu ([A-Z])\b/g)].map((m) => [m[3], m[1], m[2]]),
  ];
}

/**
 * Place les points sur une droite graduée à partir des phrases « M est le
 * milieu de [AB] » (ou « M, le milieu de [AB] »), puis lit la donnée
 * « XY = 12 cm » et la longueur demandée (le dernier nom à deux lettres de la
 * dernière phrase). Rend la longueur recalculée.
 */
function resoudreSurLaDroite(t: string): { r: number; u: string; points: Record<string, number> } | string {
  const rel = relationsMilieu(t);
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
  const trajet = t.match(/de ([A-Z]) à ([A-Z])\b/);
  if (/alignés/.test(fin)) {
    const juste = egal(vs[2], vs[0] + vs[1]) ? "oui" : "non";
    if (q.expected[0] !== juste) p.push(`alignés : attendu « ${q.expected[0]} », recalculé « ${juste} »`);
  } else if (seg) {
    const [A, B] = [seg[1], seg[2]];
    const C = [...new Set([...d.keys()].join("").split(""))].find((x) => x !== A && x !== B)!;
    const juste = egal(L(A, C)! + L(C, B)!, L(A, B)!) ? "oui" : "non";
    if (q.expected[0] !== juste) p.push(`[${A}${B}] : attendu « ${q.expected[0]} », recalculé « ${juste} »`);
  } else if (trajet) {
    const [A, B] = [trajet[1], trajet[2]];
    const C = fin.match(/par ([A-Z])\b/)?.[1];
    if (!C || L(A, C) == null || L(C, B) == null || L(A, B) == null) return [...p, "le trajet par le troisième point est illisible"];
    const surplus = L(A, C)! + L(C, B)! - L(A, B)!;
    if (/De combien|Combien de plus/.test(fin)) p.push(...verifierReponse(q, surplus, u));
    else if (/détour|rallonge/.test(fin)) {
      const juste = surplus > 0 ? "oui" : "non";
      if (q.expected[0] !== juste) p.push(`détour : attendu « ${q.expected[0]} », recalculé « ${juste} »`);
    } else return [...p, "question illisible"];
  } else return ["question illisible"];
  return [...p, ...accordPronom(t)];
}

// ═══════════════════════════════════════════════════════════════════════════
// ⭐ 07/11/2026 — distance_milieu ★1-★2. Même contrat : on relit le texte et la
// figure, on recalcule, jamais on ne recopie. Tournure non reconnue = défaut.
// ═══════════════════════════════════════════════════════════════════════════
const INCONNUE = ["tournure inconnue du correcteur"];
function seule(q: Q, juste: (c: string) => boolean): string[] {
  const ch = q.choices ?? [];
  const bons = ch.filter(juste);
  if (bons.length !== 1) return [`${bons.length} proposition(s) justes : ${ch.join(" | ")}`];
  return bons[0] === q.expected[0] ? [] : [`proposition juste « ${bons[0]} », attendue « ${q.expected[0]} »`];
}
/** Oui/non ou vrai/faux : la proposition qui dit `vrai`. */
const trancher = (q: Q, vrai: boolean) => seule(q, (c) => ((q.choices ?? []).includes("vrai") ? c === (vrai ? "vrai" : "faux") : c === (vrai ? "oui" : "non")));
/** A = 0, M = 1, B = 2 : les places sur la droite, d'après la phrase du milieu. */
function placesDuMilieu(t: string): Record<string, number> | null {
  const r = relationsMilieu(t);
  if (r.length !== 1) return null;
  const [M, A, B] = r[0];
  return new Set([M, A, B]).size === 3 ? { [A]: 0, [M]: 1, [B]: 2 } : null;
}
const ecart = (pos: Record<string, number>, s: string) => (pos[s[0]] == null || pos[s[1]] == null ? NaN : Math.abs(pos[s[0]] - pos[s[1]]));
/** « XY = ZT », « XY = 2 × ZT », « XY = ZT ÷ 2 » : vrai ou faux, avec ces places ; null si illisible. */
function egaliteVraie(pos: Record<string, number>, e: string): boolean | null {
  const m = e.match(/^([A-Z]{2}) = (?:(2) × )?([A-Z]{2})(?: ÷ (2))?$/);
  if (!m) return null;
  const [g, d] = [ecart(pos, m[1]), ecart(pos, m[3])];
  if (Number.isNaN(g) || Number.isNaN(d)) return null;
  return egal(g, (d * (m[2] ? 2 : 1)) / (m[4] ? 2 : 1));
}
/** Les places lues sur la figure, de 0 (A) à 1 (B). */
function placesFigure(q: Q, A: string, B: string): Record<string, number> | null {
  const pts = (q.canvas as any)?.points as { x: number; label: string }[] | undefined;
  const pa = pts?.find((x) => x.label === A);
  const pb = pts?.find((x) => x.label === B);
  if (!pts || !pa || !pb) return null;
  return Object.fromEntries(pts.map((x) => [x.label, (x.x - pa.x) / (pb.x - pa.x)]));
}

function corrMilAutre(q: Q): string[] {
  if (/moitiés?/.test(q.text)) {
    const d = mesures(q.text, LONGUEUR);
    if (d.length !== 1) return [`il faut une seule longueur, lu : ${d.length}`];
    return verifierReponse(q, d[0].v, d[0].u);
  }
  return corrigerMilieu(q);
}
function corrMilFigure(q: Q): string[] {
  const s = q.text.match(/\[([A-Z])([A-Z])\]/) ?? q.text.match(/de ([A-Z]) et de ([A-Z])/);
  if (!s) return INCONNUE;
  const f = placesFigure(q, s[1], s[2]);
  if (!f) return ["figure illisible"];
  const milieux = Object.keys(f).filter((l) => egal(f[l], 0.5));
  if (milieux.length !== 1) return [`la figure a ${milieux.length} milieu(x)`];
  if (Object.values(f).some((v) => v < 0 || v > 1)) return ["un point est hors du segment"];
  if (q.format === "qcm") return seule(q, (c) => c === milieux[0]);
  return q.expected.join() === milieux[0] ? [] : [`attendu « ${q.expected.join()} », milieu dessiné : ${milieux[0]}`];
}
function corrMilFigureOui(q: Q): string[] {
  const t = q.text;
  const s = t.match(/\[([A-Z])([A-Z])\]/) ?? t.match(/de ([A-Z]) et de ([A-Z])/);
  if (!s) return INCONNUE;
  const f = placesFigure(q, s[1], s[2]);
  if (!f) return ["figure illisible"];
  const P = Object.keys(f).filter((l) => l !== s[1] && l !== s[2]);
  if (P.length !== 1 || !new RegExp(`(?<![\\p{L}\\[])${P[0]}(?![\\p{L}\\]])`, "u").test(t)) return ["le point du texte n'est pas celui de la figure"];
  return trancher(q, egal(f[P[0]], 0.5));
}
function corrMilEgalite(q: Q): string[] {
  const pos = placesDuMilieu(q.text);
  const e = q.text.match(/\b[A-Z]{2} = [A-Z]{2}\b/)?.[0];
  if (!pos || !e) return INCONNUE;
  const v = egaliteVraie(pos, e);
  return v === null ? INCONNUE : trancher(q, v);
}
function corrMilCompleter(q: Q): string[] {
  const pos = placesDuMilieu(q.text);
  const donnee = q.text.match(/\b([A-Z]{2})\b(?= est égal| = …)|(?:égale à|que) ([A-Z]{2})\b/);
  const x = donnee?.[1] ?? donnee?.[2];
  if (!pos || !x || Number.isNaN(ecart(pos, x))) return INCONNUE;
  const memeLongueur = (s: string) => /^[A-Z]{2}$/.test(s) && s !== x && s !== envers(x) && egal(ecart(pos, s), ecart(pos, x));
  if (q.format === "qcm") return seule(q, memeLongueur);
  return q.expected.every(memeLongueur) && q.expected.length === 2 ? [] : [`attendu « ${q.expected.join(" / ")} »`];
}
const envers = (s: string) => s[1] + s[0];
function corrMilDouble(q: Q): string[] {
  const t = q.text;
  const pos = placesDuMilieu(t);
  if (!pos) return INCONNUE;
  let m: RegExpMatchArray | null;
  const lettresJustes = (attendu: number) => {
    const toutes = Object.keys(pos).flatMap((a) => Object.keys(pos).filter((b) => a !== b).map((b) => a + b)).filter((s) => egal(ecart(pos, s), attendu));
    const ok = q.expected.length === toutes.length && toutes.every((s) => q.expected.includes(s));
    return ok ? [] : [`attendu « ${q.expected.join(" / ")} », il faut « ${toutes.join(" / ")} »`];
  };
  if ((m = t.match(/\b([A-Z]{2}) vaut combien de fois ([A-Z]{2})/)) || (m = t.match(/\b([A-Z]{2}) = … × ([A-Z]{2})/)))
    return verifierNombre(q, ecart(pos, m[1]) / ecart(pos, m[2]));
  if ((m = t.match(/\b([A-Z]{2}) est la moitié de quelle longueur/))) return lettresJustes(2 * ecart(pos, m[1]));
  if ((m = t.match(/\b([A-Z]{2}) est le double de quelle longueur/))) return lettresJustes(ecart(pos, m[1]) / 2);
  if ((m = t.match(/Choisis : ([A-Z]{2}) est … de ([A-Z]{2})/))) {
    const r = ecart(pos, m[1]) / ecart(pos, m[2]);
    const mot = r === 0.5 ? "la moitié" : r === 2 ? "le double" : null;
    return mot ? seule(q, (c) => c === mot) : ["rapport inattendu"];
  }
  return INCONNUE;
}
const verifierNombre = (q: Q, v: number): string[] => (egal(val(q.expected[0]), v) ? [] : [`réponse « ${q.expected[0]} », recalculée ${v}`]);
/** Table propre au correcteur : ce que dit chaque phrase de la définition. */
const DEF_MILIEU: [RegExp, boolean][] = [
  [/est sur \[/, true],
  [/en deux parts égales/, true],
  [/a un seul milieu/, true],
  [/ont la même longueur/, true],
  [/a deux milieux/, false],
  [/en trois parts égales/, false],
  [/est hors de/, false],
  [/est toujours le point/, false],
];
function corrMilVrai(q: Q): string[] {
  if (/combien de milieux/i.test(q.text)) return seule(q, (c) => c === "1");
  const d = DEF_MILIEU.filter(([re]) => re.test(q.text));
  return d.length === 1 ? trancher(q, d[0][1]) : INCONNUE;
}

function corrMilReste(q: Q): string[] {
  const t = q.text;
  const P = t.match(/\b([A-Z]) est (?:sur|un point de|entre|dessus)|on place ([A-Z])\b|\. ([A-Z]) est dessus/);
  const lettre = P?.[1] ?? P?.[2] ?? P?.[3];
  const seg = t.match(/\[([A-Z])([A-Z])\]/) ?? t.match(/entre ([A-Z]) et ([A-Z])/);
  if (!lettre || !seg) return INCONNUE;
  const [A, B] = [seg[1], seg[2]];
  const d = mesures(t, LONGUEUR);
  if (d.length !== 2 || d[0].u !== d[1].u) return [`il faut deux longueurs de même unité, lu : ${d.length}`];
  const total = d[0].v;
  const morceau = d[1].v;
  // Le morceau connu part d'une extrémité : le texte le nomme, ou dit « à … de A ».
  const depuis = t.match(new RegExp(`\\b([${A}${B}])${lettre} = `))?.[1] ?? t.match(/ de ([A-Z])\. /)?.[1];
  if (!depuis || (depuis !== A && depuis !== B)) return ["le morceau connu est illisible"];
  const autre = depuis === A ? B : A;
  const demande = derniere(t).match(/\b([A-Z])([A-Z])\b/);
  if (!demande || ![`${lettre}${autre}`, `${autre}${lettre}`].includes(demande[0])) return [`on devrait demander ${lettre}${autre}, lu : ${demande?.[0]}`];
  if (!(morceau > 0 && morceau < total)) return [`morceau impossible : ${morceau} sur ${total}`];
  const p = verifierReponse(q, total - morceau, d[0].u);
  const f = placesFigure(q, A, B);
  if (!f || f[lettre] == null) p.push("figure illisible");
  else {
    const lu = depuis === A ? f[lettre] : 1 - f[lettre];
    if (!egal(lu, morceau / total)) p.push(`figure : ${lettre} à ${lu.toFixed(2)} du segment, texte ${(morceau / total).toFixed(2)}`);
  }
  return p;
}
function corrMilVerdict(q: Q): string[] {
  const t = q.text;
  const seg = t.match(/\[([A-Z])([A-Z])\]/) ?? t.match(/entre ([A-Z]) et ([A-Z])/);
  if (!seg) return INCONNUE;
  const [A, B] = [seg[1], seg[2]];
  if (/n’est pas sur|est hors de/.test(t)) return trancher(q, false);
  const d = (x: string, y: string) => {
    const m = t.match(new RegExp(`\\b(?:${x}${y}|${y}${x}) = (${NB}) (km|dm|cm|mm|m)\\b`));
    return m ? val(m[1]) : null;
  };
  const P = t.match(new RegExp(`\\b([^${A}${B}\\W])[${A}${B}] = `, "u"))?.[1];
  if (!P) return INCONNUE;
  const [pa, pb, ab] = [d(P, A), d(P, B), d(A, B)];
  if (pa != null && pb != null) return trancher(q, egal(pa, pb));
  if (ab != null && (pa != null || pb != null)) return trancher(q, egal(2 * (pa ?? pb)!, ab));
  return INCONNUE;
}
function corrMilGraduation(q: Q): string[] {
  const ns = [...q.text.matchAll(/(?<![\p{L}\d,])\d+(?!\d|,\d)/gu)].map((m) => Number(m[0]));
  if (ns.length !== 2) return [`il faut deux graduations, lu : ${ns.length}`];
  if (!/milieu/.test(q.text) || !/[Gg]radu/.test(q.text)) return INCONNUE;
  if (Math.abs(ns[0] - ns[1]) < 2) return ["graduations trop proches"];
  return verifierNombre(q, (ns[0] + ns[1]) / 2);
}
const CONVERSION_MILIEU: Record<string, Record<string, number>> = { m: { cm: 100 }, cm: { mm: 10 }, km: { m: 1000 }, dm: { cm: 10 } };
function corrMilUnites(q: Q): string[] {
  const t = q.text;
  const pos = placesDuMilieu(t);
  const fin = derniere(t);
  const don = t.match(new RegExp(`\\b([A-Z]{2}) = (${NB}) (km|dm|cm|mm|m)\\b`));
  const dem = fin.match(/\b([A-Z]{2})\b/)?.[1];
  const vers = fin.match(/\b(?:en|de) (km|dm|cm|mm|m)\b/)?.[1];
  if (!pos || !don || !dem || !vers) return INCONNUE;
  const f = CONVERSION_MILIEU[don[3]]?.[vers];
  if (!f) return [`conversion inconnue : ${don[3]} vers ${vers}`];
  return verifierReponse(q, (val(don[2]) / ecart(pos, don[1])) * ecart(pos, dem) * f, vers);
}
function corrMilSomme(q: Q): string[] {
  const t = q.text;
  const pos = placesDuMilieu(t);
  if (!pos) return INCONNUE;
  const fin = derniere(t);
  const somme = t.match(new RegExp(`\\b([A-Z]{2}) \\+ ([A-Z]{2}) (?:=|vaut) (${NB}) (km|dm|cm|mm|m)\\b`));
  if (somme) {
    const un = ecart(pos, somme[1]) + ecart(pos, somme[2]);
    const dem = fin.match(/\b([A-Z]{2})\b/)?.[1];
    if (!dem || !egal(un, 2)) return ["la somme n'est pas celle des deux moitiés"];
    return verifierReponse(q, (val(somme[3]) / un) * ecart(pos, dem), somme[4]);
  }
  const don = t.match(new RegExp(`\\b([A-Z]{2}) = (${NB}) (km|dm|cm|mm|m)\\b`));
  const dem = fin.match(/\b([A-Z]{2}) \+ ([A-Z]{2})\b/);
  if (!don || !dem) return INCONNUE;
  return verifierReponse(q, (val(don[2]) / ecart(pos, don[1])) * (ecart(pos, dem[1]) + ecart(pos, dem[2])), don[3]);
}
function corrMilIntrus(q: Q): string[] {
  const pos = placesDuMilieu(q.text);
  if (!pos) return INCONNUE;
  const fin = derniere(q.text);
  const cherche = /fausse/.test(fin) ? false : /juste|vraie/.test(fin) ? true : null;
  if (cherche === null) return INCONNUE;
  const lu = (q.choices ?? []).map((c) => egaliteVraie(pos, c));
  if (lu.some((v) => v === null)) return [`égalité illisible : ${(q.choices ?? []).join(" | ")}`];
  return seule(q, (c) => egaliteVraie(pos, c) === cherche);
}
function corrMilFigureCote(q: Q): string[] {
  const t = q.text;
  const pos = placesDuMilieu(t);
  const fig = q.canvas as any;
  if (!pos || !fig?.lines) return INCONNUE;
  const [A, , B] = Object.keys(pos).sort((a, b) => pos[a] - pos[b]);
  const f = placesFigure(q, A, B);
  if (!f) return ["figure illisible"];
  const M = Object.keys(pos).find((l) => pos[l] === 1)!;
  if (!egal(f[M], 0.5)) return ["figure : le milieu n'est pas au milieu"];
  const cote = fig.lines.find((l: any) => l.label);
  const lu = String(cote?.label ?? "").match(new RegExp(`^(${NB}) (km|dm|cm|mm|m)$`));
  if (!lu) return ["longueur écrite illisible"];
  const pa = fig.points.find((x: any) => x.label === A);
  const pb = fig.points.find((x: any) => x.label === B);
  const part = Math.abs(cote.to.x - cote.from.x) / Math.abs(pb.x - pa.x);
  if (!egal(part, 0.5) && !egal(part, 1)) return ["le trait de la longueur écrite n'est ni le tout ni une moitié"];
  const demande = derniere(t).match(/\b([A-Z]{2})\b/)?.[1];
  if (!demande) return INCONNUE;
  const p = verifierReponse(q, (val(lu[1]) / part) * (ecart(pos, demande) / 2), lu[2]);
  if (egal(part, ecart(pos, demande) / 2)) p.push("la figure écrit déjà la réponse");
  return p;
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
  distance_definition_tpl_situation: corrigerNotation,
  distance_definition_tpl_ouverte: corrigerOuverte,
  distance_milieu_tpl_e1_autre: corrMilAutre,
  distance_milieu_tpl_e1_figure: corrMilFigure,
  distance_milieu_tpl_e1_figure_oui: corrMilFigureOui,
  distance_milieu_tpl_e1_egalite: corrMilEgalite,
  distance_milieu_tpl_e1_complete: corrMilCompleter,
  distance_milieu_tpl_e1_double: corrMilDouble,
  distance_milieu_tpl_e1_vrai: corrMilVrai,
  distance_milieu_tpl_e2_reste: corrMilReste,
  distance_milieu_tpl_e2_verdict: corrMilVerdict,
  distance_milieu_tpl_e2_graduation: corrMilGraduation,
  distance_milieu_tpl_e2_unites: corrMilUnites,
  distance_milieu_tpl_e2_somme: corrMilSomme,
  distance_milieu_tpl_e2_intrus: corrMilIntrus,
  distance_milieu_tpl_e2_figure: corrMilFigureCote,
};
