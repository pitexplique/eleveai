import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS } from "../entiers.bank";

// Correcteurs des gabarits de angles.bank.ts (06/10/2026, voir types.ts).
// Chaque correcteur RELIT le texte (mesures en degrés, noms de points), refait
// le raisonnement — nature de l'angle, comparaison, somme d'angles — et relit
// le canvas : les lettres dessinées doivent être celles de l'énoncé, la mesure
// dessinée celle de l'énoncé.

type Q = TutorGeneratedQuestionV4;

/** Toutes les mesures « 45° » du texte, dans l'ordre. */
export const degres = (t: string) => [...t.matchAll(/(\d+)\s*°/g)].map((m) => Number(m[1]));
/** Tous les noms d'angles « l'angle ABC » du texte. */
const nomsAngles = (t: string) => [...t.matchAll(/angles?(?: droit| plat)? ([A-Z]{3})\b/g)].map((m) => m[1]);
/** Ma propre table des natures (pas celle du gabarit). */
function nature(v: number) {
  if (v === 0) return "nul";
  if (v > 0 && v < 90) return "aigu";
  if (v === 90) return "droit";
  if (v > 90 && v < 180) return "obtus";
  if (v === 180) return "plat";
  if (v === 360) return "plein";
  return "?";
}
/** Les mesures vraisemblables d'un objet réel, d'après ses mots. */
const OBJETS: [RegExp, number, number][] = [
  [/ciseaux/, 5, 90],
  [/pizza/, 10, 120],
  [/toboggan/, 10, 70],
  [/échelle/, 45, 89],
  [/rampe de skate/, 5, 50],
  [/ordinateur portable/, 80, 150],
  [/chaise longue/, 90, 175],
  [/grue/, 5, 90],
  [/compas|éventail|porte|livre|bras|oiseau|horloge|carrefour/, 0, 180],
];
function plausible(t: string, v: number): string[] {
  const o = OBJETS.find(([re]) => re.test(t));
  if (!o) return [];
  return v < o[1] || v > o[2] ? [`mesure invraisemblable pour l’objet : ${v}° (${o[0]})`] : [];
}

/** Relit un canvas « angle » : lettres et mesure cohérentes avec l'énoncé. */
function canvasAngle(q: Q, mesure?: number): string[] {
  const c = q.canvas as any;
  if (!c) return [];
  if (c.kind !== "angle") return [`canvas inattendu : ${c.kind}`];
  const p: string[] = [];
  const { vertex, left, right } = c.angle.labels ?? {};
  const noms = nomsAngles(q.text);
  const lettresTexte = new Set(q.text.match(/\b[A-Z]\b|(?<=[\[(])[A-Z]|(?<=[A-Z])[A-Z](?=[)\]])/g) ?? []);
  if (noms.length) {
    const n = noms[0];
    if (n[1] !== vertex || !((n[0] === left && n[2] === right) || (n[0] === right && n[2] === left)))
      p.push(`le canvas nomme ${left}${vertex}${right}, l’énoncé ${n}`);
  } else {
    if (![vertex, left, right].every((l) => lettresTexte.has(l) || q.text.includes(l)))
      p.push(`lettres du canvas (${left}${vertex}${right}) absentes de l’énoncé`);
    // Sans nom d'angle : le sommet est l'origine commune des demi-droites [SX) de l'énoncé.
    const origines = [...q.text.matchAll(/\[([A-Z])[A-Z]\)/g)].map((m) => m[1]);
    if (origines.length && origines.some((o) => o !== vertex)) p.push(`le sommet dessiné ${vertex} n’est pas l’origine des demi-droites de l’énoncé`);
  }
  if (mesure !== undefined && c.angle.angleDeg !== mesure) p.push(`canvas à ${c.angle.angleDeg}°, énoncé à ${mesure}°`);
  if (c.angle.display?.showMeasure && mesure === undefined) p.push("le canvas montre une mesure que l’énoncé ne donne pas");
  return p;
}

/** QCM : la bonne réponse est-elle bien celle que je recalcule, et la seule ? */
function qcm(q: Q, juste: string): string[] {
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`réponse attendue « ${q.expected[0]} », recalculée « ${juste} »`);
  if (!(q.choices ?? []).includes(juste)) p.push(`« ${juste} » n’est pas parmi les propositions`);
  return p;
}

// ----- ANGLE_RECONNAITRE
function corrigerReconnaitre(q: Q): string[] {
  const t = q.text;
  const p: string[] = [];
  const noms = nomsAngles(t);
  if (/sommet/.test(t) && noms.length) return [...qcm(q, `le point ${noms[0][1]}`), ...canvasAngle(q)];
  if (/côtés/.test(t) && noms.length) {
    const [g, s, d] = noms[0];
    return [...qcm(q, `[${s}${g}) et [${s}${d})`), ...canvasAngle(q)];
  }
  if (/point commun|point de départ/.test(t)) return qcm(q, "le sommet");
  // ★1 nu (03/11/2026) : « Comment s’appelle le point S de l’angle GSD ? »
  const pt = t.match(/le point ([A-Z])\b/);
  if (pt && noms.length && !/sommet/.test(t)) {
    if (noms[0][1] !== pt[1]) return [`le point ${pt[1]} n’est pas le sommet de ${noms[0]} : la réponse « le sommet » serait fausse`];
    return [...qcm(q, "le sommet"), ...canvasAngle(q)];
  }
  const dd = t.match(/\[([A-Z])([A-Z])\) et \[([A-Z])([A-Z])\)/);
  if (dd) {
    if (dd[1] !== dd[3]) return ["les deux demi-droites n’ont pas la même origine"];
    const [, s, g, , d] = dd;
    const justes = [`${g}${s}${d}`, `${d}${s}${g}`];
    const c = q.choices ?? [];
    if (!justes.includes(q.expected[0])) p.push(`nom attendu ${q.expected[0]}, recalculé ${justes[0]}`);
    if (c.filter((x) => justes.includes(x)).length !== 1) p.push("il faut exactement un nom juste parmi les propositions");
    return [...p, ...canvasAngle(q)];
  }
  return ["tournure inconnue du correcteur"];
}

function corrigerReconnaitreQcm(q: Q): string[] {
  const t = q.text;
  const noms = nomsAngles(t);
  if (/est formé par :|Que trace|de quoi est fait|De quoi est fait/.test(t)) {
    const s = noms[0][1];
    return [...qcm(q, `deux demi-droites d’origine ${s}`), ...canvasAngle(q)];
  }
  const v = degres(t);
  if (v.length !== 1) return [`une seule mesure attendue dans le texte, lu : ${v.join(", ")}`];
  const n = nature(v[0]);
  const p = [...qcm(q, n), ...plausible(t, v[0])];
  if (q.canvas) p.push(...canvasAngle(q, v[0]));
  return p;
}

function corrigerNature(q: Q): string[] {
  const v = degres(q.text);
  if (v.length !== 1) return [`une seule mesure attendue dans le texte, lu : ${v.join(", ")}`];
  const p = [...qcm(q, `un angle ${nature(v[0])}`), ...plausible(q.text, v[0])];
  if (q.canvas) p.push(...canvasAngle(q, v[0]));
  return p;
}

/** Réponse courte en degrés : l'attendue doit être « v° ». */
function attenduDegres(q: Q, v: number): string[] {
  const p: string[] = [];
  if (q.expected[0] !== `${v}°`) p.push(`réponse attendue « ${q.expected[0]} », recalculée « ${v}° » (avec l’unité)`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour une mesure`);
  return p;
}

// ----- ANGLE_DROIT
function corrigerDroitCoin(q: Q): string[] {
  // Le coin d'un objet rectangulaire, ou vérifié à l'équerre : 90°.
  if (!/coin|équerre/.test(q.text) || !/angle droit|équerre/.test(q.text)) return ["rien ne dit que l’angle est droit"];
  if (degres(q.text).length) return ["une mesure est déjà écrite dans l’énoncé"];
  return attenduDegres(q, 90);
}
function corrigerDroitCode(q: Q): string[] {
  const c = q.canvas as any;
  const p = attenduDegres(q, 90);
  if (!c?.angle?.display?.showRightAngle) p.push("le canvas ne code pas l’angle droit");
  if (c?.angle?.angleDeg !== 90) p.push(`canvas à ${c?.angle?.angleDeg}°`);
  return [...p, ...canvasAngle(q)];
}
function corrigerDroitListe(q: Q): string[] {
  const paires = [...q.text.matchAll(/([A-Z]{3})(?: mesure| =) (\d+)°/g)].map((m) => ({ n: m[1], v: Number(m[2]) }));
  if (paires.length !== 4) return [`quatre angles attendus, lus : ${paires.length}`];
  const droits = paires.filter((x) => x.v === 90);
  if (droits.length !== 1) return [`${droits.length} angles droits dans la liste`];
  if (new Set(paires.flatMap((x) => x.n.split(""))).size !== 12) return ["deux angles partagent une lettre"];
  return qcm(q, `l’angle ${droits[0].n}`);
}
function corrigerDroitOuiNon(q: Q): string[] {
  const v = degres(q.text);
  if (v.length !== 1) return [`une seule mesure attendue, lu : ${v.join(", ")}`];
  const juste = v[0] === 90 ? "oui, il mesure 90°" : v[0] < 90 ? "non, il est plus petit qu’un angle droit" : "non, il est plus grand qu’un angle droit";
  return [...qcm(q, juste), ...plausible(q.text, v[0]), ...canvasAngle(q, v[0])];
}

// ----- ANGLE_COMPARER
function corrigerDeux(q: Q): string[] {
  const v = degres(q.text);
  if (v.length !== 2) return [`deux mesures attendues, lu : ${v.join(", ")}`];
  if (v[0] === v[1]) return ["les deux mesures sont égales"];
  const grand = /plus grand|plus grande/.test(q.text);
  const petit = /plus petit|plus petite/.test(q.text);
  if (grand === petit) return ["la question ne dit pas clairement « plus grand » ou « plus petit »"];
  const r = grand ? Math.max(...v) : Math.min(...v);
  const p = [...attenduDegres(q, r), ...v.flatMap((x) => plausible(q.text, x))];
  // Français : « le sien ordinateur portableà » (signalé à la relecture du 06/10).
  if (/[a-zé]à \d|(sien|siens|sienne) [a-zé]/.test(q.text)) p.push(`phrase mal construite : « ${q.text} »`);
  return p;
}
function corrigerQuatre(q: Q): string[] {
  const paires = [...q.text.matchAll(/([A-Z]{3})(?: mesure| =) (\d+)°/g)].map((m) => ({ n: m[1], v: Number(m[2]) }));
  if (paires.length !== 4) return [`quatre angles attendus, lus : ${paires.length}`];
  if (new Set(paires.map((x) => x.v)).size !== 4) return ["deux angles ont la même mesure"];
  const grand = /plus grand|plus ouvert/.test(q.text);
  const vs = paires.map((x) => x.v);
  const r = grand ? Math.max(...vs) : Math.min(...vs);
  return qcm(q, `l’angle ${paires.find((x) => x.v === r)!.n}`);
}
function corrigerAuDroit(q: Q): string[] {
  const v = degres(q.text);
  if (v.length !== 1) return [`une seule mesure attendue, lu : ${v.join(", ")}`];
  const juste = v[0] < 90 ? "plus petit qu’un angle droit" : v[0] > 90 ? "plus grand qu’un angle droit" : "égal à un angle droit";
  return [...qcm(q, juste), ...plausible(q.text, v[0]), ...canvasAngle(q, v[0])];
}

/** ★2 dessiné (03/11/2026) : pas de mesure écrite, on lit l'angle sur la figure, loin de 90°. */
function corrigerAuDroitDessine(q: Q): string[] {
  if (degres(q.text).length) return ["une mesure est écrite : ce n’est plus une comparaison à l’œil"];
  const c = q.canvas as any;
  if (c?.kind !== "angle") return ["pas de figure"];
  if (c.angle.display?.showMeasure) return ["la figure affiche la mesure"];
  const v = c.angle.angleDeg;
  if (Math.abs(v - 90) < 25) return [`angle de ${v}° trop proche de 90° pour juger à l’œil`];
  const juste = v < 90 ? "plus petit qu’un angle droit" : "plus grand qu’un angle droit";
  return [...qcm(q, juste), ...canvasAngle(q)];
}

/** Énoncé ★1-★2 : aucun prénom (REGLES-6E.md, 03/11/2026). */
const aPrenom = (t: string) => PRENOMS.some((x) => new RegExp(`(^|[^\\p{L}])${x.nom}(?![\\p{L}])`, "u").test(t));
function nu(f: (q: Q) => string[]) {
  return (q: Q) => [...f(q), ...(aPrenom(q.text) ? ["prénom dans un énoncé nu (★1-★2)"] : [])];
}
/** ★3 en situation : un prénom ou un objet est attendu. */
function enSituation(f: (q: Q) => string[]) {
  return (q: Q) => [...f(q), ...(aPrenom(q.text) || /ouvre|coupe|déplie|pose|grimpe|monte|règle|écarte|photographie|lève|regarde|arrive/.test(q.text) ? [] : ["gabarit ★3 sans situation"])];
}
const nombrePaires = (t: string) => [...t.matchAll(/([A-Z]{3})(?: mesure| =) (\d+)°/g)].length;

// ----- ANGLE_MESURER
function corrigerInstrument(q: Q): string[] {
  if (/unité/.test(q.text)) return qcm(q, "en degrés");
  if (/instrument|outil|Avec quoi/.test(q.text)) return qcm(q, "un rapporteur");
  return ["tournure inconnue du correcteur"];
}
function corrigerMethode(q: Q): string[] {
  const t = q.text;
  const nom = nomsAngles(t)[0];
  if (/centre du rapporteur \?|Où met-on le centre/.test(t) && nom) return [...qcm(q, `sur le point ${nom[1]}`), ...canvasAngle(q)];
  const zero = t.match(/sur \[([A-Z])([A-Z])\)/);
  if (zero) {
    // Le 0 est sur [SX) : on lit sur l'autre côté de l'angle nommé, ou des lettres de la figure.
    const c = q.canvas as any;
    const { vertex, left, right } = c?.angle?.labels ?? {};
    if (zero[1] !== vertex) return [`le 0 est posé sur une demi-droite qui ne part pas du sommet ${vertex}`];
    const autre = zero[2] === right ? left : zero[2] === left ? right : null;
    if (!autre) return ["le côté du 0 n’est pas un côté de l’angle dessiné"];
    return [...qcm(q, `sur [${vertex}${autre})`), ...canvasAngle(q)];
  }
  const v = degres(t);
  if (/aigu|obtus/.test(t) && v.length === 2) {
    if (v[0] + v[1] !== 180) return ["les deux lectures ne font pas 180°"];
    const juste = /aigu/.test(t) ? Math.min(...v) : Math.max(...v);
    return [...qcm(q, `${juste}°`), ...canvasAngle(q, juste)];
  }
  return ["tournure inconnue du correcteur"];
}
function corrigerRapporteur(q: Q): string[] {
  // La mesure n'est PAS dans le texte : on la lit sur le canvas, comme l'élève.
  const c = q.canvas as any;
  if (c?.kind !== "angle" || !c.angle.display?.showProtractor) return ["pas de rapporteur dessiné"];
  if (c.angle.display.showMeasure) return ["le canvas affiche la mesure : rien à lire"];
  if (degres(q.text).length) return ["la mesure est écrite dans l’énoncé"];
  const v = c.angle.angleDeg;
  if (v % 10 !== 0 || v < 10 || v > 170) return [`lecture non lisible au rapporteur : ${v}°`];
  const p = [...qcm(q, `${v}°`), ...canvasAngle(q)];
  if (!(q.choices ?? []).includes(`${180 - v}°`) && v !== 90) p.push("le piège de l’autre graduation manque");
  return p;
}

// ----- ANGLE_TRACER
function corrigerTracer(q: Q): string[] {
  const t = q.text;
  const v = degres(t);
  if (v.length !== 1) return [`une seule mesure attendue, lu : ${v.join(", ")}`];
  if (v[0] === 90) return ["à 90°, l’équerre serait aussi une bonne réponse"];
  if (/instrument|trousse/.test(t)) return qcm(q, "un rapporteur");
  if (/graduation|repère/.test(t)) {
    const p = [...qcm(q, `${v[0]}°`), ...canvasAngle(q, v[0])];
    if (!(q.choices ?? []).includes(`${180 - v[0]}°`)) p.push("le piège de l’autre graduation manque");
    return p;
  }
  if (/sorte d’angle|cet angle sera/i.test(t)) return qcm(q, nature(v[0]));
  return ["tournure inconnue du correcteur"];
}
function corrigerEtapes(q: Q): string[] {
  const t = q.text;
  const nom = nomsAngles(t)[0];
  const v = degres(t)[0];
  if (!nom || v === undefined) return ["nom ou mesure de l’angle illisible"];
  const [g, s, d] = nom;
  // Ma propre suite d'étapes, refaite à partir du nom lu.
  const ordre = [`tracer [${s}${d})`, `poser le centre du rapporteur sur ${s} et le 0 sur [${s}${d})`, `faire un repère à ${v}°`, `tracer [${s}${g}) en passant par le repère`];
  const rang = ["première", "deuxième", "troisième", "dernière"].findIndex((m) => t.includes(`${m} étape`));
  if (rang < 0) return ["rang de l’étape illisible"];
  const p = qcm(q, ordre[rang]);
  if ((q.choices ?? []).some((c) => !ordre.includes(c))) p.push("une proposition n’est pas une étape de la construction");
  return p;
}

// ----- ANGLE_DEFI
function corrigerDefi(q: Q): string[] {
  const t = q.text;
  const parts = t.match(/en (\d+) parts égales/);
  if (parts) {
    const k = Number(parts[1]);
    if (360 % k) return [`360 ÷ ${k} ne tombe pas juste`];
    return [...attenduDegres(q, 360 / k), ...plausible(t.replace(/tarte|gâteau|galette|quiche/, "pizza"), 360 / k)];
  }
  const partage = t.match(/(droit|plat)\b.*en (\d+) angles égaux/);
  if (partage) {
    const total = partage[1] === "droit" ? 90 : 180;
    const k = Number(partage[2]);
    if (total % k) return [`${total} ÷ ${k} ne tombe pas juste`];
    return attenduDegres(q, total / k);
  }
  return corrigerAuDroit(q);
}
function corrigerDefiQcm(q: Q): string[] {
  const paires = [...q.text.matchAll(/([A-Z]{3})(?: mesure| =) (\d+)°/g)].map((m) => ({ n: m[1], v: Number(m[2]) }));
  if (paires.length !== 4) return [`quatre angles attendus, lus : ${paires.length}`];
  const veutAigu = /plus petit|aigu/.test(q.text);
  const ok = paires.filter((x) => (veutAigu ? nature(x.v) === "aigu" : nature(x.v) === "obtus"));
  if (ok.length !== 1) return [`${ok.length} angles conviennent au lieu d’un seul`];
  return qcm(q, `l’angle ${ok[0].n}`);
}

/** La mesure d'un angle nommé, LUE sur un canvas « droites » (demi-droites de même origine). */
function mesureDessinee(q: Q, nom: string): number | null {
  const c = q.canvas as any;
  if (c?.kind !== "droites") return null;
  const pt = (l: string) => c.points.find((p: any) => p.label === l);
  const [A, O, B] = [pt(nom[0]), pt(nom[1]), pt(nom[2])];
  if (!A || !O || !B) return null;
  const da = Math.atan2(-(A.y - O.y), A.x - O.x);
  const db = Math.atan2(-(B.y - O.y), B.x - O.x);
  let d = (Math.abs(da - db) * 180) / Math.PI;
  if (d > 180) d = 360 - d;
  return d;
}
/** Chaque angle « XYZ mesure v° » de l'énoncé doit être dessiné à v° (à 2° près, l'arrondi des pixels). */
function canvasDroites(q: Q): string[] {
  const p: string[] = [];
  const c = q.canvas as any;
  if (c?.kind !== "droites") return ["pas de figure"];
  const lettresFig = new Set(c.points.map((x: any) => x.label));
  const lettresTxt = new Set((q.text.match(/\b[A-Z]{3}\b|\(([A-Z]{2})\)|\[([A-Z]{2})\)|\b[A-Z]\b(?!’)/g) ?? []).join("").replace(/[()[\]]/g, "").split(""));
  for (const l of lettresTxt) if (!lettresFig.has(l)) p.push(`le point ${l} de l’énoncé n’est pas sur la figure`);
  for (const m of q.text.matchAll(/angle ([A-Z]{3}) mesure (\d+)°/g)) {
    const d = mesureDessinee(q, m[1]);
    if (d === null) p.push(`angle ${m[1]} introuvable sur la figure`);
    else if (Math.abs(d - Number(m[2])) > 2) p.push(`${m[1]} dessiné à ${Math.round(d)}°, énoncé à ${m[2]}°`);
  }
  return p;
}
/** Le signe entre deux mesures : je relis les deux nombres et je refais la comparaison. */
function corrigerSigne(q: Q): string[] {
  const v = degres(q.text);
  if (v.length !== 2) return [`deux mesures attendues, lu : ${v.join(", ")}`];
  if (v[0] === v[1]) return ["les deux mesures sont égales"];
  return qcm(q, v[0] < v[1] ? "<" : ">");
}
/** Deux angles dessinés : je mesure la figure et je retrouve le plus grand ou le plus petit. */
function corrigerDessin(q: Q): string[] {
  const noms = (q.choices ?? []).map((c) => c.match(/([A-Z]{3})$/)?.[1] ?? "");
  if (noms.length !== 2 || noms.some((n) => !n)) return ["deux angles nommés attendus dans les propositions"];
  const [d1, d2] = noms.map((n) => mesureDessinee(q, n));
  if (d1 === null || d2 === null) return ["angle introuvable sur la figure"];
  if (Math.abs(d1 - d2) < 30) return [`angles trop proches pour un choix à l’œil : ${Math.round(d1)}° et ${Math.round(d2)}°`];
  const grand = /plus grand/.test(q.text);
  if (grand === /plus petit/.test(q.text)) return ["la question ne dit pas clairement « plus grand » ou « plus petit »"];
  return [...qcm(q, `l’angle ${(d1 > d2) === grand ? noms[0] : noms[1]}`), ...canvasDroites(q)];
}
/** Le dernier angle nommé dans la question (« Combien mesure l'angle XYZ ? »). */
const angleDemande = (t: string) => t.match(/(?:Combien mesure|Calcule|Trouve|Quelle est la mesure de|Donne la mesure de) l’angle ([A-Z]{3}) ?[.?]$/)?.[1] ?? null;

function corrigerSupplementaires(q: Q): string[] {
  const t = q.text;
  const al = t.match(/[Ll]es points ([A-Z]), ([A-Z]) et ([A-Z]) sont alignés, et ([A-Z]) est entre/);
  const m = t.match(/angle ([A-Z]{3}) mesure (\d+)°/);
  const dem = angleDemande(t);
  if (!al || !m || !dem) return ["énoncé illisible"];
  const r = 180 - Number(m[2]);
  const p = [...attenduDegres(q, r), ...canvasDroites(q)];
  const d = mesureDessinee(q, dem);
  if (d !== null && Math.abs(d - r) > 2) p.push(`l’angle demandé est dessiné à ${Math.round(d)}°, pas ${r}°`);
  const plat = mesureDessinee(q, `${al[1]}${al[4]}${al[3]}`);
  if (plat !== null && Math.abs(plat - 180) > 2) p.push("les trois points ne sont pas alignés sur la figure");
  return p;
}
function corrigerAdjacents(q: Q): string[] {
  // Dans une tournure, le petit angle vient d'abord : le plus grand des deux est le total.
  const ms = [...q.text.matchAll(/angle ([A-Z]{3})(?:, qui le contient,)? mesure (\d+)°/g)].map((m) => Number(m[2]));
  const dem = angleDemande(q.text);
  if (ms.length !== 2 || !dem) return ["énoncé illisible"];
  const r = Math.max(...ms) - Math.min(...ms);
  if (r <= 0) return ["l’angle intérieur est aussi grand que l’angle total"];
  const p = [...attenduDegres(q, r), ...canvasDroites(q)];
  const d = mesureDessinee(q, dem);
  if (d !== null && Math.abs(d - r) > 2) p.push(`l’angle demandé est dessiné à ${Math.round(d)}°, pas ${r}°`);
  return p;
}
function corrigerOpposes(q: Q): string[] {
  const t = q.text;
  const dr = t.match(/\(([A-Z])([A-Z])\) et \(([A-Z])([A-Z])\) se coupent en ([A-Z])/);
  const m = t.match(/angle ([A-Z]{3}) mesure (\d+)°/);
  const dem = angleDemande(t);
  if (!dr || !m || !dem) return ["énoncé illisible"];
  const [, A, B, C, D, O] = dr;
  const a = Number(m[2]);
  if (m[1] !== `${A}${O}${C}`) return ["l’angle donné n’est pas celui attendu"];
  // L'opposé par le sommet de AOC est BOD (ou DOB) ; les deux autres sont supplémentaires.
  const r = [`${B}${O}${D}`, `${D}${O}${B}`].includes(dem) ? a : 180 - a;
  const p = [...attenduDegres(q, r), ...canvasDroites(q)];
  const d = mesureDessinee(q, dem);
  if (d !== null && Math.abs(d - r) > 2) p.push(`l’angle demandé est dessiné à ${Math.round(d)}°, pas ${r}°`);
  return p;
}
function corrigerPlein(q: Q): string[] {
  const ms = [...q.text.matchAll(/angle ([A-Z]{3}) mesure (\d+)°/g)].map((m) => Number(m[2]));
  const dem = angleDemande(q.text);
  if (ms.length !== 2 || !dem || !/tour complet/.test(q.text)) return ["énoncé illisible"];
  const r = 360 - ms[0] - ms[1];
  if (r <= 0 || r >= 180) return [`angle restant hors de 0°-180° : ${r}°`];
  const p = [...attenduDegres(q, r), ...canvasDroites(q)];
  const d = mesureDessinee(q, dem);
  if (d !== null && Math.abs(d - r) > 2) p.push(`l’angle demandé est dessiné à ${Math.round(d)}°, pas ${r}°`);
  return p;
}

// =====================================================================
// ⭐ 07/11/2026 — CORRECTEURS DES GABARITS « À PLUSIEURS FAÇONS ». Même contrat :
// on relit le texte et la figure, on refait le raisonnement, jamais on ne recopie
// la réponse. Une tournure non reconnue est un défaut.
// =====================================================================
const INCONNUE = ["tournure inconnue du correcteur"];
/** Exactement une proposition juste, et c'est l'attendue. */
function seule(q: Q, juste: (c: string) => boolean): string[] {
  const ch = q.choices ?? [];
  const bons = ch.filter(juste);
  if (bons.length !== 1) return [`${bons.length} proposition(s) justes : ${ch.join(" | ")}`];
  return bons[0] === q.expected[0] ? [] : [`proposition juste « ${bons[0]} », attendue « ${q.expected[0]} »`];
}
const a = (q: Q, c: string) => (q.choices ?? []).includes(c);
const verdict = (q: Q, oui: boolean) => seule(q, (c) => c === (oui ? "oui" : "non"));
const verite = (q: Q, vrai: boolean) => seule(q, (c) => c === (vrai ? "vrai" : "faux"));
const reponse = (q: Q, v: number | string): string[] => (String(q.expected[0]) === String(v) ? [] : [`réponse attendue « ${q.expected[0]} », recalculée « ${v} »`]);
/** Un énoncé qui se tranche par oui/non ou vrai/faux. */
const trancher = (q: Q, vrai: boolean) => (a(q, "vrai") ? verite(q, vrai) : verdict(q, vrai));
const seTranche = (q: Q) => a(q, "oui") || a(q, "vrai");
const etiquettes = (q: Q) => (q.canvas as any)?.angle?.labels as { vertex: string; left: string; right: string } | undefined;
const nomTexte = (t: string) => t.match(/\b([A-Z]{3})\b/)?.[1];
const memeAngle = (x: string, y: string) => x.length === 3 && y.length === 3 && x[1] === y[1] && ((x[0] === y[0] && x[2] === y[2]) || (x[0] === y[2] && x[2] === y[0]));
const natureLue = (t: string) => t.match(/\b(aigu|droit|obtus|plat)s?\b/)?.[1];
/** La figure dit-elle bien la mesure ? */
function dessinVaut(q: Q, nom: string, v: number): string[] {
  const d = mesureDessinee(q, nom);
  if (d === null) return [`angle ${nom} introuvable sur la figure`];
  return Math.abs(d - v) > 2 ? [`${nom} dessiné à ${Math.round(d)}°, attendu ${v}°`] : [];
}
const chapeaux = (t: string) => [...t.matchAll(/\\widehat\{([A-Z]{3})\}/g)].map((m) => m[1]);
const nomChoix = (c: string) => c.match(/([A-Z]{3})$/)?.[1] ?? "";

// ----- ANGLE_RECONNAITRE ★1
const DEF_ANGLE: [RegExp, boolean][] = [[/a deux côtés/, true], [/a trois côtés/, false], [/côtés partent du sommet/, true], [/a deux sommets/, false], [/sommet est au milieu du nom/, true], [/côtés d’un angle sont des demi-droites/, true]];
function corrRec1(q: Q): string[] {
  const t = q.text;
  const lab = etiquettes(q);
  let m: RegExpMatchArray | null;
  if (/^Vrai ou faux : (?:un angle|les |le sommet)/.test(t)) {
    const d = DEF_ANGLE.find(([re]) => re.test(t));
    return d ? verite(q, d[1]) : INCONNUE;
  }
  if (/[Cc]ombien de côtés|Compte les côtés/.test(t)) return seule(q, (c) => c === "2");
  if (/[Cc]ombien de sommets/.test(t)) return seule(q, (c) => c === "1");
  // Même angle ?
  if ((m = t.match(/([A-Z]{3}) et ([A-Z]{3}) (?:désignent|:)/)) || (m = t.match(/angle ([A-Z]{3}) est-il aussi l’angle ([A-Z]{3})/))) return verdict(q, memeAngle(m[1], m[2]));
  // Le nom à choisir d'après le sommet.
  if ((m = t.match(/sommet (?:est )?([A-Z])\b/)) && q.choices?.length && q.choices.every((c) => /^[A-Z]{3}$/.test(c))) {
    const S = m[1];
    return seule(q, (c) => c[1] === S);
  }
  // Une demi-droite est-elle un côté ?
  if (/est-elle un/.test(t)) {
    const n = nomTexte(t);
    const dd = t.match(/\[([A-Z])([A-Z])\)/);
    if (!n || !dd) return INCONNUE;
    return verdict(q, dd[1] === n[1] && (dd[2] === n[0] || dd[2] === n[2]));
  }
  // L'autre côté.
  if ((m = t.match(/\[([A-Z])([A-Z])\)/)) && /[Ll]’autre/.test(t)) {
    const n = nomTexte(t);
    if (!n || m[1] !== n[1] || (m[2] !== n[0] && m[2] !== n[2])) return ["le côté donné n’est pas un côté de l’angle"];
    const autre = m[2] === n[0] ? n[2] : n[0];
    return seule(q, (c) => c === `[${n[1]}${autre})`);
  }
  if (lab) {
    const nomFig = lab.left + lab.vertex + lab.right;
    const n = nomTexte(t);
    // Un côté à choisir sur la figure.
    if (/demi-droite est un côté|un côté de (?:cet angle|l’angle)/.test(t)) {
      if (n && !memeAngle(n, nomFig)) return ["le texte et la figure ne nomment pas le même angle"];
      return seule(q, (c) => c === `[${lab.vertex}${lab.left})` || c === `[${lab.vertex}${lab.right})`);
    }
    if ((m = t.match(/([A-Z]) … ([A-Z])/))) {
      if ([m[1], m[2]].sort().join() !== [lab.left, lab.right].sort().join()) return ["les lettres du nom ne sont pas celles de la figure"];
      return reponse(q, lab.vertex);
    }
    if (n && /peut-il s’appeler|est-il le nom|convient-il|Cet angle est-il/.test(t)) return verdict(q, memeAngle(n, nomFig));
    if (/\bnom\b|s’appelle/.test(t)) {
      if (q.format === "qcm") return seule(q, (c) => memeAngle(c, nomFig));
      const att = [...q.expected].map(String).sort().join();
      const voulu = [nomFig, lab.right + lab.vertex + lab.left].sort().join();
      return att === voulu ? [] : [`noms acceptés ${att}, attendus ${voulu}`];
    }
    if (/sommet|partent|sur les deux côtés/.test(t)) return q.format === "qcm" ? seule(q, (c) => c === lab.vertex) : reponse(q, lab.vertex);
    return INCONNUE;
  }
  // Le sommet, d'après le nom seul.
  const n = nomTexte(t);
  if (n) {
    if ((m = t.match(/^(?:Vrai ou faux : )?([A-Z]) est(?:-il)? le sommet/)) || (m = t.match(/sommet de l’angle [A-Z]{3} est-il ([A-Z])/))) return trancher(q, m[1] === n[1]);
    if (/sommet/.test(t)) return q.format === "qcm" ? seule(q, (c) => c === n[1]) : reponse(q, n[1]);
  }
  return INCONNUE;
}

// ----- ANGLE_RECONNAITRE ★2
const DEFS: Record<string, string> = { "moins de 90°": "aigu", "exactement 90°": "droit", "entre 90° et 180°": "obtus", "exactement 180°": "plat" };
function corrRec2(q: Q): string[] {
  const t = q.text;
  let m: RegExpMatchArray | null;
  const c = q.canvas as any;
  if (c?.kind === "angle") {
    if (c.angle.display?.showMeasure) return ["la figure affiche la mesure"];
    const v = c.angle.angleDeg;
    if (v !== 90 && Math.abs(v - 90) < 25) return [`angle de ${v}° trop proche de 90° pour juger à l’œil`];
    if (v === 90 && !c.angle.display?.showRightAngle) return ["angle droit sans codage"];
    return seule(q, (x) => x === nature(v));
  }
  if ((m = t.match(/angles (?:sont )?(aigus|obtus)/)) && q.format === "short") {
    const vis = degres(t);
    if (vis.length !== 5) return [`cinq mesures attendues, lu ${vis.length}`];
    const voulu = m[1] === "aigus" ? "aigu" : "obtus";
    return reponse(q, vis.filter((x) => nature(x) === voulu).length);
  }
  for (const [d, nat] of Object.entries(DEFS)) if (t.includes(d)) return seule(q, (x) => x === nat);
  if (a(q, "moins de 90°")) {
    const nat = natureLue(t);
    return nat ? seule(q, (x) => DEFS[x] === nat) : INCONNUE;
  }
  if (seTranche(q)) {
    const v = degres(t);
    const nat = natureLue(t);
    return v.length === 1 && nat ? trancher(q, nature(v[0]) === nat) : INCONNUE;
  }
  if (q.choices?.length && q.choices.every((x) => /^\d+°$/.test(x))) {
    const nat = natureLue(t);
    return nat ? seule(q, (x) => nature(parseInt(x)) === nat) : INCONNUE;
  }
  if (a(q, "aigu")) {
    const v = degres(t);
    return v.length === 1 ? seule(q, (x) => x === nature(v[0])) : INCONNUE;
  }
  const dd = t.match(/\[([A-Z])([A-Z])\) et \[([A-Z])([A-Z])\)/);
  if (dd) {
    if (dd[1] !== dd[3]) return ["les deux demi-droites n’ont pas la même origine"];
    if (q.format === "short") return reponse(q, dd[1]);
    return seule(q, (x) => memeAngle(x, dd[2] + dd[1] + dd[4]));
  }
  if ((m = t.match(/d’origine ([A-Z])/))) return reponse(q, m[1]);
  const n = nomTexte(t);
  if (n && /origine|partent/.test(t)) return reponse(q, n[1]);
  return INCONNUE;
}

// ----- ANGLE_DROIT
function corrDroit1(q: Q): string[] {
  const t = q.text;
  const c = q.canvas as any;
  if (c?.kind === "angle") {
    const code = !!c.angle.display?.showRightAngle;
    if (code !== (c.angle.angleDeg === 90)) return ["le codage et la mesure dessinée se contredisent"];
    if (!code && Math.abs(c.angle.angleDeg - 90) < 25) return ["angle trop proche de 90° pour être jugé non droit"];
    const { vertex, left, right } = c.angle.labels;
    const n = nomTexte(t);
    if (n && !memeAngle(n, left + vertex + right)) return ["le texte et la figure ne nomment pas le même angle"];
    if (c.angle.display?.showMeasure) return ["la figure affiche la mesure"];
    return verdict(q, code);
  }
  if (a(q, "une équerre")) return seule(q, (x) => x === "une équerre");
  if (a(q, "un petit carré")) return seule(q, (x) => x === "un petit carré");
  if (a(q, "un angle droit")) return /petit carré|90°/.test(t) ? seule(q, (x) => x === "un angle droit") : INCONNUE;
  if (seTranche(q)) {
    const v = degres(t);
    return v.length === 1 ? trancher(q, v[0] === 90) : INCONNUE;
  }
  if (a(q, "90°")) return seule(q, (x) => x === "90°");
  if (/angles droits/.test(t) && q.format === "short") return /triangle rectangle/.test(t) ? reponse(q, 1) : /carré|rectangle/.test(t) ? reponse(q, 4) : INCONNUE;
  if (/[Aa]ngle droit/.test(t) && q.format === "short") return attenduDegres(q, 90);
  return INCONNUE;
}
const VRAI_DROIT: [RegExp, boolean][] = [
  [/droit mesure 90°/, true], [/tous les angles droits/, true], [/longs côtés/, false], [/carré a 4 angles droits/, true], [/rectangle a 2 angles droits/, false],
  [/plat vaut 2 angles droits/, true], [/plus grand qu’un angle aigu/, true], [/plus grand qu’un angle obtus/, false],
];
function corrDroit2(q: Q): string[] {
  const t = q.text;
  const c = q.canvas as any;
  let m: RegExpMatchArray | null;
  if (c?.kind === "droites") {
    if ((q.choices ?? []).some((x) => x.startsWith("l’angle"))) {
      const noms = (q.choices ?? []).map(nomChoix);
      const droits = noms.filter((n) => Math.abs((mesureDessinee(q, n) ?? 0) - 90) <= 2);
      if (droits.length !== 1) return [`${droits.length} angles droits dessinés`];
      for (const n of noms) if (n !== droits[0] && Math.abs((mesureDessinee(q, n) ?? 0) - 90) < 25) return [`${n} trop proche de 90° pour un choix à l’œil`];
      return seule(q, (x) => nomChoix(x) === droits[0]);
    }
    if ((m = t.match(/L’angle ([A-Z]{3}) est-il droit/))) {
      const d = mesureDessinee(q, m[1]);
      if (d === null) return ["angle introuvable sur la figure"];
      if (Math.abs(d - 90) > 2 && Math.abs(d - 90) < 25) return ["angle trop proche de 90° pour juger"];
      return verdict(q, Math.abs(d - 90) <= 2);
    }
    if ((m = t.match(/[Aa]ngle (?:droit )?([A-Z]{3})/))) {
      const v = degres(t)[0];
      const dem = t.match(/angle ([A-Z]{3}) ?[.?]$/)?.[1];
      if (!dem) return INCONNUE;
      return [...attenduDegres(q, 90 - v), ...dessinVaut(q, m[1], 90), ...dessinVaut(q, dem, 90 - v)];
    }
    return INCONNUE;
  }
  if (a(q, "vrai")) {
    const v = t.match(/angle de (\d+)° est droit/);
    if (v) return verite(q, Number(v[1]) === 90);
    const d = VRAI_DROIT.find(([re]) => re.test(t));
    return d ? verite(q, d[1]) : INCONNUE;
  }
  if (a(q, "un angle droit")) return /perpendiculaires/.test(t) ? seule(q, (x) => x === "un angle droit") : INCONNUE;
  if (/erpendiculaires/.test(t)) return /combien d’angles droits/.test(t) ? reponse(q, 4) : attenduDegres(q, 90);
  if ((m = t.match(/(\d) angles droits/))) return attenduDegres(q, Number(m[1]) * 90);
  if (/[Aa]ngle plat/.test(t) && /angles droits/.test(t)) return reponse(q, 2);
  if (/[Tt]our complet/.test(t) && /angles droits/.test(t)) return reponse(q, 4);
  if ((m = t.match(/(?:en|,) (\d) (?:parts égales|angles égaux)/))) return attenduDegres(q, 90 / Number(m[1]));
  const v = degres(t).filter((x) => x !== 90);
  if (v.length === 1 && /ajouter|Complète|manque|contient|coupé en deux/.test(t)) return attenduDegres(q, 90 - v[0]);
  return INCONNUE;
}
function corrDroit3(q: Q): string[] {
  const t = q.text;
  let m: RegExpMatchArray | null;
  if ((m = t.match(/(\d+) h\b/)) && a(q, "aigu")) {
    const h = Number(m[1]);
    return seule(q, (c) => c === nature(Math.min(h, 12 - h) * 30));
  }
  if (a(q, "oui")) {
    const v = degres(t);
    return v.length === 1 ? verdict(q, v[0] === 90) : INCONNUE;
  }
  if ((m = t.match(/en (\d) (?:parts égales|angles égaux)/))) return attenduDegres(q, 90 / Number(m[1]));
  if ((m = t.match(/(\d) carreaux/))) return attenduDegres(q, 90 * Number(m[1]));
  if (/trois quarts de tour/.test(t)) return attenduDegres(q, 270);
  if (/quart de tour/.test(t)) return attenduDegres(q, 90);
  if (/demi-tour/.test(t)) return attenduDegres(q, 180);
  if (/tour complet/.test(t)) return attenduDegres(q, 360);
  return INCONNUE;
}

// ----- ANGLE_COMPARER ★1
function corrComp1(q: Q): string[] {
  const t = q.text;
  if (/ouvert/.test(t) && q.format === "short") {
    const v = degres(t);
    if (v.length !== 2 || v[0] === v[1]) return ["deux mesures différentes attendues"];
    return attenduDegres(q, /moins ouvert/.test(t) ? Math.min(...v) : Math.max(...v));
  }
  if (/change-t-elle|changent-ils/.test(t)) return verdict(q, false);
  if (/que regardes-tu|qui compte|que compares-tu/.test(t)) return seule(q, (c) => c === "leur ouverture");
  const v = degres(t);
  if (v.length !== 2) return INCONNUE;
  if (/égaux|égal à|même mesure/.test(t)) return verdict(q, v[0] === v[1]);
  if (v[0] === v[1]) return ["les deux mesures sont égales"];
  if (/ < /.test(t)) return verite(q, v[0] < v[1]);
  if (/ > /.test(t)) return verite(q, v[0] > v[1]);
  if (/plus grand/.test(t)) return trancher(q, v[0] > v[1]);
  if (/plus petit/.test(t)) return trancher(q, v[0] < v[1]);
  return INCONNUE;
}
// ----- ANGLE_COMPARER ★2
const RANG: Record<string, number> = { aigu: 1, droit: 2, obtus: 3, plat: 4 };
function corrComp2(q: Q): string[] {
  const t = q.text;
  const c = q.canvas as any;
  let m: RegExpMatchArray | null;
  if (c?.kind === "droites") {
    const noms = (q.choices ?? []).map(nomChoix);
    const ds = noms.map((n) => mesureDessinee(q, n) ?? NaN);
    if (ds.some(Number.isNaN) || noms.length !== 3) return ["trois angles dessinés attendus"];
    const trie = [...ds].sort((x, y) => x - y);
    const grand = /plus grand/.test(t);
    if (grand === /plus petit/.test(t)) return INCONNUE;
    if ((grand ? trie[2] - trie[1] : trie[1] - trie[0]) < 15) return ["angles trop proches pour un choix à l’œil"];
    const r = grand ? trie[2] : trie[0];
    return seule(q, (x) => nomChoix(x) === noms[ds.indexOf(r)]);
  }
  if ((q.choices ?? []).some((x) => / [<>] /.test(x))) {
    const v = degres(t);
    if (v.length !== 3 || new Set(v).size !== 3) return ["trois mesures différentes attendues"];
    const decroissant = /plus grand au plus petit|décroissant/.test(t);
    if (!decroissant && !/plus petit au plus grand|croissant/.test(t)) return INCONNUE;
    const tri = [...v].sort((x, y) => (decroissant ? y - x : x - y)).map((x) => `${x}°`).join(decroissant ? " > " : " < ");
    return seule(q, (x) => x === tri);
  }
  if (/entre|plus grand que .* et plus petit que/.test(t) && q.format === "qcm") {
    const [x, y] = degres(t);
    return seule(q, (z) => parseInt(z) > x && parseInt(z) < y);
  }
  if (/écart|dépasse|de plus a/.test(t)) {
    const v = degres(t);
    if (v.length !== 2 || v[0] === v[1]) return ["deux mesures différentes attendues"];
    return attenduDegres(q, Math.abs(v[0] - v[1]));
  }
  if ((m = t.match(/(\d+)° de plus qu’un angle de (\d+)°/))) return attenduDegres(q, Number(m[1]) + Number(m[2]));
  if ((m = t.match(/(\d+)° de moins qu’un angle de (\d+)°/))) return attenduDegres(q, Number(m[2]) - Number(m[1]));
  if ((m = t.match(/Ajoute (\d+)° à un angle de (\d+)°/))) return attenduDegres(q, Number(m[1]) + Number(m[2]));
  if ((m = t.match(/Retire (\d+)° à un angle de (\d+)°/))) return attenduDegres(q, Number(m[2]) - Number(m[1]));
  if ((m = t.match(/mesure (\d+)°\. Un autre a (\d+)° de (plus|moins)/))) return attenduDegres(q, m[3] === "plus" ? Number(m[1]) + Number(m[2]) : Number(m[1]) - Number(m[2]));
  const nats = [...t.matchAll(/angle (aigu|droit|obtus|plat)/g)].map((x) => x[1]);
  if (nats.length === 2 && nats[0] !== nats[1]) {
    const [X, Y] = nats;
    if (/Lequel est le plus grand/.test(t)) return seule(q, (x) => x === `un angle ${RANG[X] > RANG[Y] ? X : Y}`);
    if (/quel angle est le plus petit/.test(t)) return seule(q, (x) => x === `un angle ${RANG[X] < RANG[Y] ? X : Y}`);
    if (/est-il plus petit/.test(t)) return verdict(q, RANG[X] < RANG[Y]);
    if (/est plus grand/.test(t)) return verite(q, RANG[X] > RANG[Y]);
  }
  return INCONNUE;
}
// ----- ANGLE_COMPARER ★3
function corrComp3(q: Q): string[] {
  const t = q.text;
  const v = degres(t);
  let m: RegExpMatchArray | null;
  if (/plus raide|plus douce/.test(t)) return v.length === 2 && v[0] !== v[1] ? attenduDegres(q, /plus raide/.test(t) ? Math.max(...v) : Math.min(...v)) : ["deux mesures attendues"];
  if (/plus grande mesure/.test(t)) return v.length === 2 && v[0] !== v[1] ? attenduDegres(q, Math.max(...v)) : ["deux mesures attendues"];
  if (/grandi|écart|ouvert en plus/.test(t)) return v.length === 2 && v[1] > v[0] ? attenduDegres(q, v[1] - v[0]) : ["deux ouvertures croissantes attendues"];
  if ((m = t.match(/à (\d) h(?:,)? (?:puis à|et à) (\d) h/))) {
    const [x, y] = [Number(m[1]), Number(m[2])];
    if (x === y || x > 6 || y > 6) return ["heures invalides"];
    const grand = /plus grand/.test(t);
    return seule(q, (z) => z === `à ${(x > y) === grand ? x : y} h`);
  }
  return INCONNUE;
}

// ----- ANGLE_MESURER ★1
function corrMes1(q: Q): string[] {
  const t = q.text;
  const c = q.canvas as any;
  let m: RegExpMatchArray | null;
  if (c?.angle?.display?.showProtractor) {
    if (/plus grande graduation|va de 0 à combien|finit la graduation|dernier nombre/.test(t)) return reponse(q, 180);
    if (/[Cc]ommence/.test(t)) return reponse(q, 0);
    return corrigerRapporteur(q);
  }
  if (c?.kind === "angle") {
    if (c.angle.display?.showMeasure) return ["la figure affiche la mesure"];
    const v = c.angle.angleDeg;
    const ch = (q.choices ?? []).map((x) => parseInt(x));
    const proche = ch.reduce((x, y) => (Math.abs(y - v) < Math.abs(x - v) ? y : x));
    for (const x of ch) if (x !== proche && Math.abs(x - v) < 25) return ["deux mesures trop proches pour une estimation"];
    return seule(q, (x) => parseInt(x) === proche);
  }
  const v = degres(t)[0];
  if (/petit rond|symbole °|le ° dans/.test(t)) return seule(q, (x) => x === "degrés");
  if (/Comment lis-tu|Lis cette mesure|à voix haute/.test(t)) return seule(q, (x) => x === `${v} degrés`);
  if ((m = t.match(/(\d+) degrés/))) return seule(q, (x) => x === `${m![1]}°`);
  if (/écriture est une mesure|la mesure d’un angle\.|convient à un angle/.test(t)) return seule(q, (x) => /^\d+°$/.test(x));
  if (/centre/.test(t)) return seule(q, (x) => x === "sur le sommet");
  if (/le 0|Le 0/.test(t) && /places-tu|poses-tu|va où/.test(t)) return seule(q, (x) => x === "sur un côté");
  if (/lis-tu la mesure/.test(t)) return seule(q, (x) => x === "sur l’autre côté");
  if (/Que mesure un rapporteur|rapporteur sert|Avec un rapporteur/.test(t)) return seule(q, (x) => x === "des angles");
  if (/mesure une longueur|longueur d’un côté/.test(t)) return seule(q, (x) => x === "une règle graduée");
  if (/mesure un angle|mesure d’un angle aigu|mesures-tu un angle obtus/.test(t)) return seule(q, (x) => x === "un rapporteur");
  return INCONNUE;
}
// ----- ANGLE_MESURER ★2
function corrMes2(q: Q): string[] {
  const t = q.text;
  const c = q.canvas as any;
  let m: RegExpMatchArray | null;
  if (c?.angle?.display?.showProtractor) {
    const p = corrigerRapporteur(q);
    if (c.angle.display.protractorScale !== "double") p.push("il faut le rapporteur à deux graduations");
    const nat = /aigu ou obtus/.test(t) ? null : natureLue(t);
    if (nat && nature(c.angle.angleDeg) !== nat) p.push(`l’énoncé dit ${nat}, la figure ${c.angle.angleDeg}°`);
    return p;
  }
  if (c?.kind === "angle") {
    const v = c.angle.angleDeg;
    if (c.angle.display?.showMeasure) return ["la figure affiche la mesure"];
    for (const x of q.choices ?? []) if (parseInt(x) !== v && Math.abs(parseInt(x) - v) < 30) return ["deux mesures trop proches pour une estimation"];
    return [...seule(q, (x) => parseInt(x) === v), ...canvasAngle(q)];
  }
  if (a(q, "oui")) {
    const v = degres(t);
    const nat = natureLue(t);
    return v.length === 1 && nat ? verdict(q, nature(v[0]) === nat) : INCONNUE;
  }
  if ((q.choices ?? []).length === 2 && (q.choices ?? []).every((x) => /^\d+°$/.test(x))) {
    const v = degres(t);
    const nat = natureLue(t);
    if (v.length !== 2 || v[0] + v[1] !== 180 || !nat) return ["les deux lectures doivent faire 180°"];
    return seule(q, (x) => nature(parseInt(x)) === nat);
  }
  if (/étape|en premier|en dernier|ensuite/.test(t)) {
    const n = t.match(/[Aa]ngle ([A-Z]{3})/)?.[1];
    if (!n) return INCONNUE;
    const ordre = [`poser le centre sur ${n[1]}`, "mettre le 0 sur un côté", "lire la mesure sur l’autre côté"];
    const k = /première|en premier/.test(t) ? 0 : /deuxième|ensuite/.test(t) ? 1 : /dernière|en dernier/.test(t) ? 2 : -1;
    return k < 0 ? INCONNUE : seule(q, (x) => x === ordre[k]);
  }
  if ((m = t.match(/Le 0 est sur un côté\. L’autre côté passe par (\d+)/)) || (m = t.match(/Un côté est sur le 0, l’autre sur (\d+)/))) return attenduDegres(q, Number(m[1]));
  if ((m = t.match(/(?:par|sur|à) (\d+),? (?:l’autre par|et à|et) (\d+)/))) return attenduDegres(q, Math.abs(Number(m[2]) - Number(m[1])));
  return INCONNUE;
}

// ----- ANGLE_TRACER ★1
function corrTr1(q: Q): string[] {
  const t = q.text;
  const c = q.canvas as any;
  let m: RegExpMatchArray | null;
  const v = degres(t);
  if (c?.angle?.display?.showProtractor) return v.length === 1 ? verdict(q, c.angle.angleDeg === v[0]) : INCONNUE;
  if (a(q, "une équerre") && a(q, "un compas")) {
    if (v[0] === 90) return a(q, "un rapporteur") ? ["à 90°, deux instruments conviennent"] : seule(q, (x) => x === "une équerre");
    return seule(q, (x) => x === "un rapporteur");
  }
  if (/demi-droites traces-tu|combien de côtés|traits droits/.test(t)) return reponse(q, 2);
  if ((m = t.match(/\[([A-Z])([A-Z])\) et \[([A-Z])([A-Z])\)/))) {
    if (m[1] !== m[3]) return ["les deux demi-droites n’ont pas la même origine"];
    return seule(q, (x) => memeAngle(x, m![2] + m![1] + m![4]));
  }
  if (/graduation|repère/i.test(t)) {
    const p = seule(q, (x) => x === `${v[0]}°`);
    if (!a(q, `${180 - v[0]}°`)) p.push("le piège de l’autre graduation manque");
    return p;
  }
  if (a(q, "aigu")) return v.length === 1 ? seule(q, (x) => x === nature(v[0])) : INCONNUE;
  if (a(q, "oui")) {
    const nat = natureLue(t);
    return v.length === 1 && nat ? verdict(q, nature(v[0]) === nat) : INCONNUE;
  }
  if ((m = t.match(/\[([A-Z])([A-Z])\)/)) && /le 0/.test(t)) return seule(q, (x) => x === `sur [${m![1]}${m![2]})`);
  const n = nomTexte(t);
  if (n && /centre/.test(t)) return seule(q, (x) => x === `sur ${n[1]}`);
  if (n && /sommet/.test(t)) return reponse(q, n[1]);
  if (n && /partent|D’où part/.test(t)) return seule(q, (x) => x === n[1]);
  return INCONNUE;
}
// ----- ANGLE_TRACER ★2
function corrTr2(q: Q): string[] {
  const t = q.text;
  const v = degres(t);
  let m: RegExpMatchArray | null;
  if (/équerre/.test(t)) return v.length === 1 ? verdict(q, v[0] === 90) : INCONNUE;
  if ((m = t.match(/double de (\d+)°/))) return attenduDegres(q, 2 * Number(m[1]));
  if ((m = t.match(/moitié de (\d+)°/))) return attenduDegres(q, Number(m[1]) / 2);
  if (/côte à côte/.test(t)) return v.length === 2 ? attenduDegres(q, v[0] + v[1]) : INCONNUE;
  if (a(q, "oui")) {
    const nat = natureLue(t);
    return v.length === 1 && nat ? verdict(q, nature(v[0]) === nat) : INCONNUE;
  }
  const n = nomTexte(t);
  const trace = t.match(/\[([A-Z])([A-Z])\)/);
  if (n && trace) {
    if (trace[1] !== n[1] || trace[2] !== n[2]) return ["la demi-droite tracée n’est pas un côté de l’angle"];
    return seule(q, (x) => x === `[${n[1]}${n[0]})`);
  }
  return INCONNUE;
}

// ----- ANGLE_DEFI ★4-★5
const TOURS: [RegExp, number][] = [[/trois quarts de tour/g, 270], [/quart de tour/g, 90], [/demi-tour/g, 180]];
function corrDefiNeuf(q: Q): string[] {
  const t = q.text;
  const c = q.canvas as any;
  let m: RegExpMatchArray | null;
  // Parts.
  if ((m = t.match(/(\d+) parts égales/)) && /[Pp]rend|prend|côte à côte|voisines/.test(t)) {
    const k = Number(m[1]);
    const pris = t.match(/(?:prend|de|par|total de) (\d+) parts/);
    if (!pris || 360 % k) return ["énoncé illisible"];
    return attenduDegres(q, (360 / k) * Number(pris[1]));
  }
  if ((m = t.match(/roue a (\d+) rayons régulièrement espacés\. Quel angle forment (\d+) rayons/))) return attenduDegres(q, (360 / Number(m[1])) * (Number(m[2]) - 1));
  // Horloge.
  if ((m = t.match(/en (\d+) minutes\b/)) || (m = t.match(/attend (\d+) minutes/)) || (m = t.match(/avance de (\d+) minutes/))) return attenduDegres(q, 6 * Number(m[1]));
  if ((m = t.match(/à (\d) h,? (?:et à|puis à) (\d) h/))) return attenduDegres(q, 30 * Math.abs(Number(m[2]) - Number(m[1])));
  if ((m = t.match(/font-elles (\d+)°/)) || (m = t.match(/angle de (\d+)° entre les aiguilles/))) return reponse(q, Number(m[1]) / 30);
  if ((m = t.match(/(\d) h\b/)) && /aiguilles|horloge/.test(t)) return attenduDegres(q, 30 * Number(m[1]));
  // Tours enchaînés.
  if (/tour/.test(t) && /même sens|sans changer de sens/.test(t)) {
    let reste = t;
    let tot = 0;
    for (const [re, val] of TOURS)
      reste = reste.replace(re, () => {
        tot += val;
        return "";
      });
    return attenduDegres(q, tot);
  }
  // Rayons, étoile.
  if ((m = t.match(/(\d+) (?:demi-droites|angles égaux font|branches)/))) return attenduDegres(q, 360 / Number(m[1]));
  if ((m = t.match(/(?:angles de|angles égaux de|espacés de|espacées de) (\d+)°/))) return reponse(q, 360 / Number(m[1]));
  // Le double, le triple, k fois : la question est dans la dernière phrase.
  const fois = /le double de/.test(t) ? 2 : /le triple de/.test(t) ? 3 : Number(t.match(/(\d+) fois/)?.[1] ?? 0);
  if (fois && /angle (plat|droit)/.test(t)) {
    const total = /angle plat/.test(t) ? 180 : 90;
    const petit = total / (fois + 1);
    if (!Number.isInteger(petit)) return ["partage qui ne tombe pas juste"];
    const fin = t.slice(t.lastIndexOf(". ") + 2);
    return attenduDegres(q, /petit/.test(fin) ? petit : fois * petit);
  }
  if (c?.kind !== "droites") return INCONNUE;
  const p = canvasDroites(q);
  // Partage en deux angles égaux.
  if (/deux angles égaux/.test(t)) {
    const gr = t.match(/L’angle ([A-Z]{3}) mesure (\d+)°/);
    const dem = t.match(/(?:Combien mesure|Calcule) l’angle ([A-Z]{3})/);
    const dd = t.match(/\[([A-Z])([A-Z])\)/);
    if (!gr || !dem || !dd) return INCONNUE;
    const v = Number(gr[2]);
    const r = gr[1].includes(dd[2]) ? 2 * v : v / 2;
    return [...p, ...attenduDegres(q, r), ...dessinVaut(q, dem[1], r)];
  }
  // Coupé en trois, deux angles égaux.
  if ((m = t.match(/L’angle ([A-Z]{3}) mesure (\d+)°\. Il est coupé en trois/))) {
    const x = Number(t.match(/(\d+)° chacun/)?.[1]);
    const dem = t.match(/l’angle ([A-Z]{3}) ?[?.]$/)?.[1];
    if (!x || !dem) return INCONNUE;
    return [...p, ...attenduDegres(q, Number(m[2]) - 2 * x), ...dessinVaut(q, dem, Number(m[2]) - 2 * x)];
  }
  // Une croix : sommes.
  const dr = t.match(/\(([A-Z])([A-Z])\) et \(([A-Z])([A-Z])\) se (?:coupent|croisent) en ([A-Z])/);
  if (dr) {
    const [, A, B, C, D, O] = dr;
    const x = Number(t.match(/angle [A-Z]{3} mesure (\d+)°/)?.[1]);
    if (/quatre angles autour/.test(t)) return [...p, ...attenduDegres(q, 360)];
    if ((m = t.match(/Trois des quatre angles sont ([A-Z]{3}), ([A-Z]{3}) et ([A-Z]{3})/))) {
      const som = [m[1], m[2], m[3]].reduce((s, n) => s + (mesureDessinee(q, n) ?? NaN), 0);
      return [...p, ...attenduDegres(q, 180 + x), ...(Math.abs(som - (180 + x)) > 3 ? ["somme dessinée différente"] : [])];
    }
    if ((m = t.match(/somme des angles ([A-Z]{3}) et ([A-Z]{3})/))) {
      const som = (mesureDessinee(q, m[1]) ?? NaN) + (mesureDessinee(q, m[2]) ?? NaN);
      const r = m[1] === `${A}${O}${C}` && m[2] === `${B}${O}${D}` ? 2 * x : 180;
      return [...p, ...attenduDegres(q, r), ...(Math.abs(som - r) > 3 ? [`somme dessinée ${Math.round(som)}°, calculée ${r}°`] : [])];
    }
    return INCONNUE;
  }
  // Trois angles dans un angle plat ou droit.
  const total = /sont alignés/.test(t) ? 180 : /est droit/.test(t) ? 90 : 0;
  if (total) {
    const ms = [...t.matchAll(/angle ([A-Z]{3}) mesure (\d+)°/g)].map((x) => Number(x[2]));
    const dem = t.match(/(?:Combien mesure|Calcule|Trouve) l’angle ([A-Z]{3})/)?.[1];
    if (ms.length !== 2 || !dem) return INCONNUE;
    const r = total - ms[0] - ms[1];
    return [...p, ...attenduDegres(q, r), ...dessinVaut(q, dem, r)];
  }
  return INCONNUE;
}

// ----- ANGLE_RELATIONS (les gabarits de angles.bank.ts)
function corrRelNeuf(q: Q): string[] {
  const t = q.text;
  const c = q.canvas as any;
  const h = chapeaux(t);
  const v = degres(t);
  if (seTranche(q)) {
    if (h.length === 2) {
      const [x, y] = h;
      if (x[1] !== y[1]) return ["sommets différents"];
      const commun = [x[0], x[2]].some((l) => y[0] === l || y[2] === l);
      const dx = mesureDessinee(q, x);
      const dy = mesureDessinee(q, y);
      if (dx === null || dy === null) return ["angle introuvable sur la figure"];
      return trancher(q, /adjacents/.test(t) ? commun : !commun && Math.abs(dx - dy) <= 2);
    }
    if (/opposés par le sommet|adjacents/.test(t)) return verdict(q, true);
    return v.length >= 2 ? trancher(q, v[0] + v[1] === 180) : INCONNUE;
  }
  if (/[Ss]upplémentaires/.test(t) && /[Ss]omme|font combien/.test(t)) return attenduDegres(q, 180);
  if (/font 180°/.test(t)) return seule(q, (x) => x === "supplémentaires");
  if (/face à face/.test(t) && !h.length) return seule(q, (x) => x === "opposés par le sommet");
  if (/côtés communs|côtés en commun/.test(t)) return reponse(q, 1);
  // L'angle opposé, l'angle égal : un choix sur la figure.
  if ((q.choices ?? []).some((x) => x.startsWith("l’angle")) && h.length === 1 && c?.kind === "droites") {
    const x = h[0];
    if (v.length === 1) {
      const d = dessinVaut(q, x, v[0]);
      if (d.length) return d;
    }
    return seule(q, (ch) => {
      const n = nomChoix(ch);
      if (!n || n[1] !== x[1]) return false;
      const d1 = mesureDessinee(q, `${x[0]}${x[1]}${n[0]}`);
      const d2 = mesureDessinee(q, `${x[2]}${x[1]}${n[2]}`);
      return d1 !== null && d2 !== null && Math.abs(d1 - 180) <= 2 && Math.abs(d2 - 180) <= 2;
    });
  }
  const fois = /le double de/.test(t) ? 2 : /le triple de/.test(t) ? 3 : Number(t.match(/(\d+) fois/)?.[1] ?? 0);
  if (fois) {
    const petit = 180 / (fois + 1);
    if (!Number.isInteger(petit)) return ["partage qui ne tombe pas juste"];
    return attenduDegres(q, /plus petit/.test(t) ? petit : fois * petit);
  }
  if (/plus (?:grand|petit) des quatre angles/.test(t) && v.length === 1) return attenduDegres(q, /plus grand/.test(t) ? Math.max(v[0], 180 - v[0]) : Math.min(v[0], 180 - v[0]));
  if (/voisin/.test(t) && !/plus (petit|grand)/.test(t) && v.length === 1) return attenduDegres(q, 180 - v[0]);
  if (/angle opposé|angle en face/.test(t) && v.length === 1) return attenduDegres(q, v[0]);
  if (/Il manque|ajouter|Complète|\+ … = 180|plat contient|supplémentaire de/.test(t)) {
    const u = v.filter((x) => x !== 180);
    return u.length === 1 ? attenduDegres(q, 180 - u[0]) : INCONNUE;
  }
  if (/plus (petit|grand)/.test(t) && !h.length) {
    const d = v.find((x) => x !== 180);
    if (!d || (180 - d) % 2) return ["écart illisible"];
    const pet = (180 - d) / 2;
    return attenduDegres(q, /plus petit/.test(t) ? pet : pet + d);
  }
  if (c?.kind !== "droites") return INCONNUE;
  if (/tour/.test(t) && h.length === 3) {
    if (v.length !== 2) return INCONNUE;
    const r = 360 - v[0] - v[1];
    return [...attenduDegres(q, r), ...dessinVaut(q, h[2], r)];
  }
  if (/quatre angles/.test(t)) return attenduDegres(q, 360);
  if (/\$ \+ \$/.test(t)) {
    const [x, y] = t.match(/\\widehat\{([A-Z]{3})\}\$ \+ \$\\widehat\{([A-Z]{3})\}/)!.slice(1);
    const som = (mesureDessinee(q, x) ?? NaN) + (mesureDessinee(q, y) ?? NaN);
    if (Number.isNaN(som)) return ["angle introuvable sur la figure"];
    return attenduDegres(q, Math.round(som / 5) * 5);
  }
  if (h.length === 3 && v.length === 2) {
    const r = Math.max(...v) - Math.min(...v);
    const dem = h.find((n) => mesureDessinee(q, n) !== null && Math.abs(mesureDessinee(q, n)! - r) <= 2);
    return dem ? attenduDegres(q, r) : [`aucun angle de ${r}° sur la figure`];
  }
  return INCONNUE;
}

export const CORRECTEURS: CorrecteursMaths = {
  angle_reconnaitre_tpl_sommet_figure: nu(corrRec1), angle_reconnaitre_tpl_sommet_nom: nu(corrRec1), angle_reconnaitre_tpl_nom_figure: nu(corrRec1), angle_reconnaitre_tpl_cotes: nu(corrRec1), angle_reconnaitre_tpl_verdict: nu(corrRec1),
  angle_reconnaitre_tpl_nature_mesure: nu(corrRec2), angle_reconnaitre_tpl_nature_figure: nu(corrRec2), angle_reconnaitre_tpl_mesure_pour_nature: nu(corrRec2), angle_reconnaitre_tpl_intervalle: nu(corrRec2), angle_reconnaitre_tpl_compter_nature: nu(corrRec2), angle_reconnaitre_tpl_origine: nu(corrRec2),
  angle_droit_tpl_codage: nu(corrDroit1), angle_droit_tpl_mesure_verdict: nu(corrDroit1), angle_droit_tpl_signe: nu(corrDroit1), angle_droit_tpl_outil: nu(corrDroit1), angle_droit_tpl_trouver: nu(corrDroit1),
  angle_droit_qcm_tpl_oeil: nu(corrDroit2), angle_droit_tpl_complement: nu(corrDroit2), angle_droit_tpl_plusieurs: nu(corrDroit2), angle_droit_tpl_perpendiculaire: nu(corrDroit2), angle_droit_tpl_vrai_faux: nu(corrDroit2),
  angle_droit_tpl_ctx3_metier: corrDroit3, angle_droit_tpl_ctx3_horloge: corrDroit3, angle_droit_tpl_ctx3_chantier: corrDroit3,
  angle_comparer_tpl_ouvert: nu(corrComp1), angle_comparer_tpl_verdict: nu(corrComp1), angle_comparer_tpl_cotes: nu(corrComp1), angle_comparer_tpl_egaux: nu(corrComp1),
  angle_comparer_tpl_ranger: nu(corrComp2), angle_comparer_tpl_entre: nu(corrComp2), angle_comparer_tpl_ecart: nu(corrComp2), angle_comparer_tpl_natures: nu(corrComp2), angle_comparer_tpl_trois_dessin: nu(corrComp2), angle_comparer_tpl_de_plus: nu(corrComp2),
  angle_comparer_tpl_ctx3_pentes: corrComp3, angle_comparer_tpl_ctx3_piege_cotes: corrComp3, angle_comparer_tpl_ctx3_ouvrir: corrComp3, angle_comparer_tpl_ctx3_horloge: corrComp3,
  angle_mesurer_tpl_rapporteur_simple: nu(corrMes1), angle_mesurer_tpl_symbole: nu(corrMes1), angle_mesurer_tpl_geste: nu(corrMes1), angle_mesurer_tpl_estimer: nu(corrMes1), angle_mesurer_tpl_quoi: nu(corrMes1), angle_mesurer_tpl_bornes: nu(corrMes1),
  angle_mesurer_tpl_rapporteur_double: nu(corrMes2), angle_mesurer_tpl_lecture: nu(corrMes2), angle_mesurer_tpl_possible: nu(corrMes2), angle_mesurer_tpl_etapes: nu(corrMes2), angle_mesurer_tpl_estimer_fin: nu(corrMes2), angle_mesurer_tpl_graduations: nu(corrMes2),
  angle_tracer_tpl_instrument: nu(corrTr1), angle_tracer_tpl_cotes: nu(corrTr1), angle_tracer_tpl_repere: nu(corrTr1), angle_tracer_tpl_nature: nu(corrTr1), angle_tracer_tpl_verifier: nu(corrTr1), angle_tracer_tpl_poser: nu(corrTr1),
  angle_tracer_tpl_suite: nu(corrTr2), angle_tracer_tpl_erreur: nu(corrTr2), angle_tracer_tpl_calcul: nu(corrTr2), angle_tracer_tpl_equerre: nu(corrTr2),
  angle_defi_tpl_parts: corrDefiNeuf, angle_defi_tpl_minutes: corrDefiNeuf, angle_defi_tpl_trois_angles: corrDefiNeuf, angle_defi_tpl_tours: corrDefiNeuf, angle_defi_tpl_moitie: corrDefiNeuf, angle_defi_tpl_fois_plus: corrDefiNeuf, angle_defi_tpl_croix_somme: corrDefiNeuf, angle_defi_tpl_rayons: corrDefiNeuf, angle_defi_tpl_heures: corrDefiNeuf, angle_defi_tpl_partage_inegal: corrDefiNeuf,
  angle_relations_tpl_verdict: nu(corrRelNeuf), angle_relations_tpl_vocab: nu(corrRelNeuf), angle_relations_tpl_oppose: nu(corrRelNeuf), angle_relations_tpl_complete: nu(corrRelNeuf), angle_relations_tpl_difference: nu(corrRelNeuf), angle_relations_tpl_reconnaitre: nu(corrRelNeuf), angle_relations_tpl_meme_mesure: nu(corrRelNeuf),
  angle_relations_tpl_voisin: nu(corrRelNeuf), angle_relations_tpl_double: corrRelNeuf, angle_relations_tpl_extreme: corrRelNeuf, angle_relations_tpl_croix_somme: corrRelNeuf, angle_relations_tpl_ecart: corrRelNeuf, angle_relations_tpl_tour_complet: corrRelNeuf,
  angle_defi_tpl_1: corrigerDefi,
  angle_defi_qcm_tpl_1: corrigerDefiQcm,
  angle_defi_tpl_supplementaires: corrigerSupplementaires,
  angle_defi_tpl_adjacents: corrigerAdjacents,
  angle_defi_tpl_opposes_par_le_sommet: corrigerOpposes,
  angle_defi_tpl_angle_plein: corrigerPlein,
  angle_tracer_tpl_1: nu(corrigerTracer),
  angle_tracer_qcm_tpl_1: nu(corrigerEtapes),
  angle_tracer_tpl_ctx3: enSituation((q) => (/étape/.test(q.text) ? corrigerEtapes(q) : corrigerTracer(q))),
  angle_mesurer_tpl_1: nu(corrigerInstrument),
  angle_mesurer_qcm_tpl_1: nu(corrigerMethode),
  angle_mesurer_tpl_ctx3: enSituation((q) => (/instrument|outil|Avec quoi|unité/.test(q.text) ? corrigerInstrument(q) : corrigerMethode(q))),
  angle_mesurer_qcm_tpl_rapporteur: corrigerRapporteur,
  angle_comparer_tpl_1: nu(corrigerDeux),
  angle_comparer_tpl_2: nu(corrigerDeux),
  angle_comparer_tpl_signe: nu(corrigerSigne),
  angle_comparer_tpl_dessin_grand: nu(corrigerDessin),
  angle_comparer_tpl_dessin_petit: nu(corrigerDessin),
  angle_comparer_tpl_3: nu(corrigerAuDroit),
  angle_comparer_tpl_4: nu(corrigerAuDroit),
  angle_comparer_qcm_tpl_1: nu(corrigerQuatre),
  angle_comparer_qcm_tpl_2: nu(corrigerQuatre),
  angle_comparer_qcm_tpl_3: nu(corrigerAuDroitDessine),
  angle_comparer_qcm_tpl_4: nu(corrigerAuDroitDessine),
  angle_comparer_tpl_ctx3: enSituation((q) =>
    nombrePaires(q.text) === 4 ? corrigerQuatre(q) : degres(q.text).length === 2 ? corrigerDeux(q) : corrigerAuDroit(q),
  ),
  angle_droit_tpl_1: nu(corrigerDroitCoin),
  angle_droit_tpl_2: nu(corrigerDroitCode),
  angle_droit_qcm_tpl_1: nu(corrigerDroitListe),
  angle_droit_qcm_tpl_2: nu(corrigerDroitOuiNon),
  angle_droit_tpl_ctx3: enSituation((q) =>
    nombrePaires(q.text) === 4 ? corrigerDroitListe(q) : q.format === "qcm" ? corrigerDroitOuiNon(q) : corrigerDroitCoin(q),
  ),
  angle_reconnaitre_tpl_1: nu(corrigerReconnaitre),
  angle_reconnaitre_qcm_tpl_1: nu(corrigerReconnaitreQcm),
  angle_reconnaitre_tpl_ctx3: enSituation((q) =>
    (q.choices ?? []).includes("aigu") || /demi-droites d’origine/.test((q.choices ?? []).join()) ? corrigerReconnaitreQcm(q) : corrigerReconnaitre(q),
  ),
  angle_reconnaitre_qcm_tpl_nature: corrigerNature,
};
