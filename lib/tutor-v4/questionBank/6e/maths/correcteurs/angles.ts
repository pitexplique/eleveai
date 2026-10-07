import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

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
  if (/est formé par :|Que trace|de quoi est fait/.test(t)) {
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
  const paires = [...q.text.matchAll(/([A-Z]{3}) mesure (\d+)°/g)].map((m) => ({ n: m[1], v: Number(m[2]) }));
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
  const paires = [...q.text.matchAll(/([A-Z]{3}) mesure (\d+)°/g)].map((m) => ({ n: m[1], v: Number(m[2]) }));
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
  if (/sorte d’angle|cet angle sera/.test(t)) return qcm(q, nature(v[0]));
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
  const paires = [...q.text.matchAll(/([A-Z]{3}) mesure (\d+)°/g)].map((m) => ({ n: m[1], v: Number(m[2]) }));
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
/** Le dernier angle nommé dans la question (« Combien mesure l'angle XYZ ? »). */
const angleDemande = (t: string) => t.match(/Combien mesure l’angle ([A-Z]{3}) \?/)?.[1] ?? null;

function corrigerSupplementaires(q: Q): string[] {
  const t = q.text;
  const al = t.match(/Les points ([A-Z]), ([A-Z]) et ([A-Z]) sont alignés, et ([A-Z]) est entre/);
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
  const ms = [...q.text.matchAll(/angle ([A-Z]{3}) mesure (\d+)°/g)].map((m) => Number(m[2]));
  const dem = angleDemande(q.text);
  if (ms.length !== 2 || !dem) return ["énoncé illisible"];
  const r = ms[0] - ms[1];
  if (r <= 0) return ["l’angle intérieur est plus grand que l’angle total"];
  const p = [...attenduDegres(q, r), ...canvasDroites(q)];
  const d = mesureDessinee(q, dem);
  if (d !== null && Math.abs(d - r) > 2) p.push(`l’angle demandé est dessiné à ${Math.round(d)}°, pas ${r}°`);
  return p;
}
function corrigerOpposes(q: Q): string[] {
  const t = q.text;
  const dr = t.match(/droites \(([A-Z])([A-Z])\) et \(([A-Z])([A-Z])\) se coupent en ([A-Z])/);
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

export const CORRECTEURS: CorrecteursMaths = {
  angle_defi_tpl_1: corrigerDefi,
  angle_defi_qcm_tpl_1: corrigerDefiQcm,
  angle_defi_tpl_supplementaires: corrigerSupplementaires,
  angle_defi_tpl_adjacents: corrigerAdjacents,
  angle_defi_tpl_opposes_par_le_sommet: corrigerOpposes,
  angle_defi_tpl_angle_plein: corrigerPlein,
  angle_tracer_tpl_1: corrigerTracer,
  angle_tracer_qcm_tpl_1: corrigerEtapes,
  angle_mesurer_tpl_1: corrigerInstrument,
  angle_mesurer_qcm_tpl_1: corrigerMethode,
  angle_mesurer_qcm_tpl_rapporteur: corrigerRapporteur,
  angle_comparer_tpl_1: corrigerDeux,
  angle_comparer_tpl_2: corrigerDeux,
  angle_comparer_tpl_3: corrigerAuDroit,
  angle_comparer_tpl_4: corrigerAuDroit,
  angle_comparer_qcm_tpl_1: corrigerQuatre,
  angle_comparer_qcm_tpl_2: corrigerQuatre,
  angle_comparer_qcm_tpl_3: corrigerAuDroit,
  angle_comparer_qcm_tpl_4: corrigerAuDroit,
  angle_droit_tpl_1: corrigerDroitCoin,
  angle_droit_tpl_2: corrigerDroitCode,
  angle_droit_qcm_tpl_1: corrigerDroitListe,
  angle_droit_qcm_tpl_2: corrigerDroitOuiNon,
  angle_reconnaitre_tpl_1: corrigerReconnaitre,
  angle_reconnaitre_qcm_tpl_1: corrigerReconnaitreQcm,
  angle_reconnaitre_qcm_tpl_nature: corrigerNature,
};
