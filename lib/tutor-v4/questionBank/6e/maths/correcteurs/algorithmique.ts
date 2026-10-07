import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// LES CORRECTEURS DE L'ALGORITHMIQUE DE 6e (07/10/2026).
//
// ⭐ Chaque correcteur RELIT le programme écrit dans le texte (les lignes qui
// commencent par « – ») avec son propre petit interpréteur — position,
// orientation, distance parcourue, angle total, valeur calculée, actions
// exécutées — et refait le raisonnement demandé par la question. Il ne reprend
// jamais le calcul du gabarit. Il vérifie aussi que les blocs Scratch affichés
// (le canvas) disent la même chose que le texte.

type Q = TutorGeneratedQuestionV4;

/* ---------- Lecture du programme ---------- */

type L =
  | { t: "av"; n: number; u: string }
  | { t: "tg"; a: number; g: boolean }
  | { t: "rep"; k: number; corps: L[] }
  | { t: "dire"; s: string }
  | { t: "stylo" }
  | { t: "calc"; op: string; n: number }
  | { t: "var"; nom: string; op: "=" | "+"; n: number }
  | { t: "trou"; quoi: "av" | "tg" | "rep"; corps?: L[] }
  | { t: "act"; s: string };

function lire(s: string): L {
  let m: RegExpMatchArray | null;
  s = s.trim();
  if ((m = s.match(/^répéter (\d+|…) fois : (.+)$/))) {
    const corps = m[2].split(" puis ").map(lire);
    return m[1] === "…" ? { t: "trou", quoi: "rep", corps } : { t: "rep", k: Number(m[1]), corps };
  }
  if ((m = s.match(/^avancer de (\d+|…) (pas|cm|m|cases?)$/)))
    return m[1] === "…" ? { t: "trou", quoi: "av" } : { t: "av", n: Number(m[1]), u: m[2].replace(/^case$/, "cases") };
  if ((m = s.match(/^tourner (?:à (droite|gauche) )?de (\d+|…) ?°$/)))
    return m[2] === "…" ? { t: "trou", quoi: "tg" } : { t: "tg", a: Number(m[2]), g: m[1] === "gauche" };
  if (s === "faire demi-tour") return { t: "tg", a: 180, g: false };
  if ((m = s.match(/^dire « (.+) »$/))) return { t: "dire", s: m[1] };
  if (s === "poser le stylo") return { t: "stylo" };
  if ((m = s.match(/^choisir le nombre (\d+)$/))) return { t: "calc", op: "=", n: Number(m[1]) };
  if ((m = s.match(/^mettre « (.+) » à (\d+)$/))) return { t: "var", nom: m[1], op: "=", n: Number(m[2]) };
  if ((m = s.match(/^ajouter (\d+) à « (.+) »$/))) return { t: "var", nom: m[2], op: "+", n: Number(m[1]) };
  if ((m = s.match(/^ajouter (\d+)$/))) return { t: "calc", op: "+", n: Number(m[1]) };
  if ((m = s.match(/^soustraire (\d+)$/))) return { t: "calc", op: "-", n: Number(m[1]) };
  if ((m = s.match(/^multiplier par (\d+)$/))) return { t: "calc", op: "×", n: Number(m[1]) };
  if ((m = s.match(/^diviser par (\d+)$/))) return { t: "calc", op: "÷", n: Number(m[1]) };
  return { t: "act", s };
}

/** Les programmes du texte : un par en-tête « … : » (ou un seul, sans en-tête). */
function programmes(text: string): Array<{ titre: string; lignes: string[]; prog: L[] }> {
  const res: Array<{ titre: string; lignes: string[]; prog: L[] }> = [];
  let cur: { titre: string; lignes: string[]; prog: L[] } | null = null;
  for (const brut of text.split("\n")) {
    const l = brut.trim();
    if (l.startsWith("– ")) {
      if (!cur) {
        cur = { titre: "", lignes: [], prog: [] };
        res.push(cur);
      }
      cur.lignes.push(l.slice(2));
      cur.prog.push(lire(l.slice(2)));
    } else if (l.endsWith(":")) {
      cur = { titre: l, lignes: [], prog: [] };
      res.push(cur);
    } else cur = null;
  }
  return res.filter((p) => p.lignes.length);
}
const programme = (q: Q) => programmes(q.text)[0] ?? { titre: "", lignes: [], prog: [] };
/** La question : la dernière ligne du texte. */
const question = (q: Q) => q.text.trim().split("\n").pop() ?? "";

const CAPS: Record<string, number> = { Nord: 0, Est: 90, Sud: 180, Ouest: 270 };
const NOM_CAP = ["Nord", "Est", "Sud", "Ouest"];

/** Exécute : position, cap (0 = Nord, sens des aiguilles d'une montre), distance, angle, actions, valeur. */
function executer(prog: L[], cap0 = 0) {
  const e = {
    x: 0,
    y: 0,
    cap: cap0,
    dist: 0,
    angle: 0,
    actions: [] as L[],
    valeur: NaN,
    vars: {} as Record<string, number>,
    stylo: false,
    traits: [] as Array<{ x0: number; y0: number; x1: number; y1: number; l: number }>,
    negatif: false,
    nonEntier: false,
  };
  const un = (i: L) => {
    if (i.t === "rep") {
      for (let k = 0; k < i.k; k++) i.corps.forEach(un);
      return;
    }
    e.actions.push(i);
    if (i.t === "av") {
      const r = (e.cap * Math.PI) / 180;
      const x1 = e.x + i.n * Math.sin(r);
      const y1 = e.y + i.n * Math.cos(r);
      if (e.stylo) e.traits.push({ x0: e.x, y0: e.y, x1, y1, l: i.n });
      e.x = x1;
      e.y = y1;
      e.dist += i.n;
    } else if (i.t === "tg") {
      e.angle += i.a;
      e.cap = (((e.cap + (i.g ? -i.a : i.a)) % 360) + 360) % 360;
    } else if (i.t === "stylo") e.stylo = true;
    else if (i.t === "calc") {
      if (i.op === "=") e.valeur = i.n;
      else if (i.op === "+") e.valeur = e.valeur + i.n;
      else if (i.op === "-") e.valeur = e.valeur - i.n;
      else if (i.op === "×") e.valeur = e.valeur * i.n;
      else e.valeur = e.valeur / i.n;
      if (e.valeur < 0) e.negatif = true;
      if (!Number.isInteger(e.valeur)) e.nonEntier = true;
    } else if (i.t === "var") e.vars[i.nom] = i.op === "=" ? i.n : (e.vars[i.nom] ?? 0) + i.n;
  };
  prog.forEach(un);
  return e;
}

/* ---------- Outils de vérification ---------- */

const nombre = (s: string) => {
  const m = String(s).match(/\d+(?:,\d+)?/);
  return m ? Number(m[0].replace(",", ".")) : NaN;
};
const uniteDe = (s: string) => (String(s).match(/\d\s*(pas|cm|m|cases?|°)\s*$/) ?? [])[1] ?? "";

/** La réponse attendue vaut `v` (et porte la bonne unité si elle en a une). */
function attendu(q: Q, v: number | string, unite?: string): string[] {
  const p: string[] = [];
  const e = String(q.expected[0] ?? "");
  if (typeof v === "number") {
    if (Math.abs(nombre(e) - v) > 1e-9) p.push(`réponse attendue ${e}, le programme relu donne ${v}`);
    if (unite !== undefined && uniteDe(e).replace(/^case$/, "cases") !== unite)
      p.push(`unité de la réponse « ${e} » : on attend ${unite || "aucune"}`);
  } else if (e !== v) p.push(`réponse attendue « ${e} », le programme relu donne « ${v} »`);
  if (q.format === "qcm") {
    const c = q.choices ?? [];
    if (!c.includes(e)) p.push("la bonne réponse n’est pas parmi les propositions");
    if (typeof v === "number")
      for (const x of c) if (x !== e && Math.abs(nombre(x) - v) < 1e-9 && uniteDe(x) === uniteDe(e)) p.push(`le leurre « ${x} » est juste`);
  }
  return p;
}

/** Les blocs Scratch affichés disent la même chose que le texte. */
function canvasCoherent(q: Q, prog: L[]): string[] {
  const c = q.canvas as any;
  if (!c) return [];
  if (c.kind !== "scratch") return ["canvas inattendu"];
  const bs = c.blocks as any[];
  if (bs[0]?.type !== "event") return ["le canvas ne commence pas par le bloc de départ"];
  const p: string[] = [];
  const cmp = (b: any, i: L, ou: string) => {
    if (i.t === "av") {
      if (b.type !== "move" || nombre(String(b.value)) !== i.n) p.push(`${ou} : bloc « avancer de ${i.n} » attendu`);
      else if (typeof b.value === "string" && !String(b.value).includes(i.u.replace(/^cases$/, "case")))
        p.push(`${ou} : unité du bloc ${b.value}`);
    } else if (i.t === "tg") {
      if (b.type !== "turn" || nombre(String(b.value)) !== i.a) p.push(`${ou} : bloc « tourner de ${i.a}° » attendu`);
      else if (String(b.value).includes("↺") !== i.g) p.push(`${ou} : sens du bloc tourner`);
    } else if (i.t === "rep") {
      if (b.type !== "repeat" || b.times !== i.k || (b.children ?? []).length !== i.corps.length)
        p.push(`${ou} : bloc « répéter ${i.k} fois » attendu`);
      else i.corps.forEach((ii, k) => cmp(b.children[k], ii, `${ou}.${k + 1}`));
    } else if (i.t === "trou") {
      if (!String(b.value ?? b.times ?? "").match(/\?|…/)) p.push(`${ou} : le bloc à compléter n’est pas vide`);
      if (i.quoi === "rep") {
        if (b.type !== "repeat" || (b.children ?? []).length !== (i.corps ?? []).length) p.push(`${ou} : bloc répéter attendu`);
        else (i.corps ?? []).forEach((ii, k) => cmp(b.children[k], ii, `${ou}.${k + 1}`));
      }
    } else if (i.t === "dire") {
      if (b.type !== "say" || b.text !== i.s) p.push(`${ou} : bloc « dire ${i.s} » attendu`);
    } else if (i.t === "stylo") {
      if (b.type !== "pen") p.push(`${ou} : bloc stylo attendu`);
    } else if (i.t === "var") {
      if (b.type !== (i.op === "=" ? "set_variable" : "change_variable") || b.variable !== i.nom || Number(b.value) !== i.n)
        p.push(`${ou} : bloc de variable « ${i.nom} » attendu`);
    } else p.push(`${ou} : instruction sans bloc Scratch (${JSON.stringify(i)})`);
  };
  if (bs.length - 1 !== prog.length) p.push(`le canvas a ${bs.length - 1} blocs, le texte ${prog.length} lignes`);
  else prog.forEach((i, k) => cmp(bs[k + 1], i, `bloc ${k + 1}`));
  return p;
}

/** Distances plausibles pour l'unité. */
function plausible(prog: L[]): string[] {
  const p: string[] = [];
  const max: Record<string, number> = { pas: 200, cm: 300, m: 60, cases: 12 };
  const voir = (i: L) => {
    if (i.t === "rep") i.corps.forEach(voir);
    if (i.t === "av" && (i.n <= 0 || i.n > (max[i.u] ?? 0))) p.push(`déplacement peu plausible : ${i.n} ${i.u}`);
    if (i.t === "tg" && (i.a <= 0 || i.a > 360)) p.push(`angle peu plausible : ${i.a}°`);
    if (i.t === "rep" && (i.k < 2 || i.k > 12)) p.push(`nombre de répétitions peu plausible : ${i.k}`);
  };
  prog.forEach(voir);
  return p;
}

const ORD = ["première", "deuxième", "troisième", "quatrième", "cinquième", "sixième", "septième", "huitième"];

/** « Quelle est la troisième instruction ? », « juste après « … » », « la dernière » : la ligne visée. */
function ligneVisee(lignes: string[], qu: string): string | null {
  let m: RegExpMatchArray | null;
  if ((m = qu.match(/juste après « (.+) »/))) {
    const k = lignes.indexOf(m[1]);
    return k >= 0 && k + 1 < lignes.length ? lignes[k + 1] : null;
  }
  if ((m = qu.match(/juste avant « (.+) »/))) {
    const k = lignes.indexOf(m[1]);
    return k >= 1 ? lignes[k - 1] : null;
  }
  if (/dernière|se termine/.test(qu)) return lignes[lignes.length - 1];
  if (/en premier/.test(qu)) return lignes[0];
  const k = ORD.findIndex((o) => qu.includes(o));
  return k >= 0 && k < lignes.length ? lignes[k] : null;
}

/** Une question « quelle ligne ? » : lignes distinctes, ligne visée, propositions prises dans le programme. */
function verifierRang(q: Q, lignes: string[]): string[] {
  const p: string[] = [];
  if (new Set(lignes).size !== lignes.length) p.push("deux lignes identiques : la question est ambiguë");
  const qu = question(q);
  if (/combien/i.test(qu)) return [...p, ...attendu(q, lignes.length)];
  const juste = ligneVisee(lignes, qu);
  if (!juste) return [...p, `question illisible : « ${qu} »`];
  p.push(...attendu(q, juste));
  for (const c of q.choices ?? []) if (!lignes.includes(c)) p.push(`la proposition « ${c} » n’est pas une ligne du programme`);
  return p;
}

/** L'orientation finale, depuis « Au départ, … regarde vers le Nord. ». */
function orientation(q: Q): string[] {
  const m = q.text.match(/Au départ, .+ regarde vers (?:le |l’)(Nord|Est|Sud|Ouest)\./);
  if (!m) return ["direction de départ illisible"];
  const { prog } = programme(q);
  const e = executer(prog, CAPS[m[1]]);
  if (e.cap % 90) return [`direction finale entre deux points cardinaux (${e.cap}°)`];
  return [...attendu(q, NOM_CAP[e.cap / 90]), ...canvasCoherent(q, prog), ...plausible(prog)];
}
const somme = (xs: number[]) => xs.reduce((s, x) => s + x, 0);
/** L'unité des déplacements du programme (une seule par programme). */
function uniteProg(prog: L[]): string[] {
  const us = new Set<string>();
  const voir = (i: L) => (i.t === "av" ? us.add(i.u) : i.t === "rep" ? i.corps.forEach(voir) : null);
  prog.forEach(voir);
  return [...us];
}

/** « Combien de fois … tourne-t-il ? », « … instructions … ? » : on compte dans l'exécution. */
function compter(qu: string, prog: L[]): number {
  const acts = executer(prog).actions;
  if (/tourne-t|« tourner »/.test(qu)) return acts.filter((i) => i.t === "tg").length;
  if (/avance-t|« avancer »/.test(qu)) return acts.filter((i) => i.t === "av").length;
  if (/instructions/.test(qu)) return acts.length;
  return acts.filter((i) => i.t === "act").length;
}

/** Ce que le stylo dessine : la figure reconnue à partir des traits, sans lire la boucle. */
function figure(prog: L[]) {
  const e = executer(prog);
  const T = e.traits;
  const eq = (a: number, b: number) => Math.abs(a - b) < 1e-6;
  const res = { nom: "?", cotes: T.length, perimetre: somme(T.map((t) => t.l)), longueurs: T.map((t) => t.l), traits: T };
  if (!T.length) return { ...res, nom: "rien" };
  const ferme = eq(T[T.length - 1].x1, T[0].x0) && eq(T[T.length - 1].y1, T[0].y0);
  // Fermée avant la fin : la figure est tracée deux fois.
  const fermeTot = T.slice(0, -1).some((t) => eq(t.x1, T[0].x0) && eq(t.y1, T[0].y0));
  if (!ferme) return { ...res, nom: "ouverte" };
  if (fermeTot) return { ...res, nom: "repassée" };
  // Les virages entre traits consécutifs (dernier → premier compris) : tous du même côté, total 360°.
  const virages = T.map((t, k) => {
    const u = T[(k + 1) % T.length];
    const a1 = Math.atan2(t.x1 - t.x0, t.y1 - t.y0);
    const a2 = Math.atan2(u.x1 - u.x0, u.y1 - u.y0);
    let d = ((a2 - a1) * 180) / Math.PI;
    while (d <= -180) d += 360;
    while (d > 180) d -= 360;
    return d;
  });
  if (!eq(Math.abs(somme(virages)), 360) || !virages.every((v) => Math.sign(v) === Math.sign(virages[0]))) return { ...res, nom: "croisée" };
  const egaux = T.every((t) => eq(t.l, T[0].l));
  const reguliers = virages.every((v) => eq(v, virages[0]));
  const n = T.length;
  let nom = "autre";
  if (n === 3 && egaux) nom = "un triangle équilatéral";
  else if (n === 4 && reguliers && eq(Math.abs(virages[0]), 90))
    nom = egaux ? "un carré" : eq(T[0].l, T[2].l) && eq(T[1].l, T[3].l) ? "un rectangle" : "autre";
  else if (egaux && reguliers) nom = ({ 5: "un pentagone", 6: "un hexagone", 8: "un octogone" } as Record<number, string>)[n] ?? "autre";
  return { ...res, nom };
}

/* ---------- Les correcteurs, un par gabarit ---------- */

export const CORRECTEURS: CorrecteursMaths = {
  /* ===== algo_sequence ===== */
  "6e_algo_sequence_tpl_1_compter_instructions": (q) => {
    const { prog } = programme(q);
    const qu = question(q);
    const n = /« avancer »|avance-t/.test(qu)
      ? prog.filter((i) => i.t === "av").length
      : /« tourner »|tourne-t/.test(qu)
        ? prog.filter((i) => i.t === "tg").length
        : prog.length;
    return [...attendu(q, n), ...canvasCoherent(q, prog), ...plausible(prog)];
  },
  "6e_algo_sequence_tpl_2_premiere_action": (q) => {
    const { prog, lignes } = programme(q);
    return [...verifierRang(q, lignes), ...canvasCoherent(q, prog), ...plausible(prog)];
  },
  "6e_algo_sequence_tpl_3_etapes_routine": (q) => verifierRang(q, programme(q).lignes),
  "6e_algo_sequence_tpl_4_ordre_change_resultat": (q) => {
    const ps = programmes(q.text);
    const p: string[] = [];
    if (ps.length !== 2) return [`deux programmes attendus, ${ps.length} lus`];
    const v = ps.map((x) => executer(x.prog));
    if (v.some((e) => e.negatif || e.nonEntier || Number.isNaN(e.valeur))) p.push("un calcul passe par un nombre négatif ou non entier");
    if ([...ps[0].lignes].sort().join("|") !== [...ps[1].lignes].sort().join("|")) p.push("les deux programmes n’ont pas les mêmes lignes");
    if (ps[0].lignes.join("|") === ps[1].lignes.join("|")) p.push("les deux programmes sont dans le même ordre");
    const qu = question(q);
    if (/même nombre/.test(qu)) return [...p, ...attendu(q, v[0].valeur === v[1].valeur ? "oui, le même nombre" : "non, deux nombres différents")];
    const k = ps.findIndex((x) => {
      const nom = x.titre.replace(/^Programme (de |d’)/, "").replace(/ :$/, "");
      return qu.includes(` ${nom} `) || qu.includes(`d’${nom}`) || qu.endsWith(` ${nom}.`) || qu.endsWith(` ${nom} ?`);
    });
    if (k < 0) return [...p, `je ne trouve pas de qui parle la question : « ${qu} »`];
    return [...p, ...attendu(q, v[k].valeur)];
  },

  /* ===== algo_deplacement ===== */
  "6e_algo_deplacement_tpl_1_distance_totale": (q) => {
    const { prog } = programme(q);
    const us = uniteProg(prog);
    if (us.length !== 1) return ["plusieurs unités dans le programme"];
    return [...attendu(q, executer(prog).dist, us[0]), ...canvasCoherent(q, prog), ...plausible(prog)];
  },
  "6e_algo_deplacement_tpl_2_angle_total": (q) => {
    const { prog } = programme(q);
    return [...attendu(q, executer(prog).angle, "°"), ...canvasCoherent(q, prog), ...plausible(prog)];
  },
  "6e_algo_deplacement_tpl_3_completer_bloc": (q) => {
    const { prog } = programme(q);
    const trous = prog.filter((i) => i.t === "trou") as Array<{ t: "trou"; quoi: string }>;
    if (trous.length !== 1) return [`un seul bloc à compléter attendu, ${trous.length} lus`];
    const e = executer(prog);
    let m: RegExpMatchArray | null;
    if ((m = q.text.match(/doit tourner de (\d+)° en tout/))) {
      if (trous[0].quoi !== "tg") return ["le bloc vide n’est pas un bloc tourner"];
      const reste = Number(m[1]) - e.angle;
      if (reste <= 0) return ["le bloc manquant serait nul ou négatif"];
      return [...attendu(q, reste, "°"), ...canvasCoherent(q, prog), ...plausible(prog)];
    }
    if ((m = q.text.match(/doit parcourir (\d+) (pas|cm|m|cases?) en tout/))) {
      if (trous[0].quoi !== "av") return ["le bloc vide n’est pas un bloc avancer"];
      const reste = Number(m[1]) - e.dist;
      if (reste <= 0) return ["le bloc manquant serait nul ou négatif"];
      return [...attendu(q, reste, m[2].replace(/^case$/, "cases")), ...canvasCoherent(q, prog), ...plausible(prog)];
    }
    return ["objectif illisible (« doit parcourir … en tout » ou « doit tourner de …° en tout »)"];
  },
  "6e_algo_deplacement_tpl_4_orientation_simple": orientation,
  "6e_algo_deplacement_tpl_6_orientation_finale": orientation,
  "6e_algo_deplacement_tpl_5_quel_bloc": (q) => {
    const { prog, lignes } = programme(q);
    const qu = question(q);
    const cherche = /direction|tourner/.test(qu) ? "tg" : /place|avancer/.test(qu) ? "av" : "";
    if (!cherche) return [`question illisible : « ${qu} »`];
    const bons = lignes.filter((_, k) => prog[k].t === cherche);
    if (bons.length !== 1) return [`${bons.length} lignes répondent à la question`];
    const p = [...attendu(q, bons[0]), ...canvasCoherent(q, prog), ...plausible(prog)];
    for (const c of q.choices ?? []) if (!lignes.includes(c)) p.push(`la proposition « ${c} » n’est pas dans le programme`);
    return p;
  },
  "6e_algo_deplacement_tpl_7_distance_au_depart": (q) => {
    const { prog } = programme(q);
    const e = executer(prog);
    const qu = question(q);
    const us = uniteProg(prog);
    if (us.length !== 1) return ["plusieurs unités dans le programme"];
    const loin = Math.hypot(e.x, e.y);
    if (/point de départ \?|même endroit/.test(qu) && /revient|finit/.test(qu))
      return [...attendu(q, loin < 1e-6 ? "oui" : "non"), ...canvasCoherent(q, prog), ...plausible(prog)];
    const p = [...canvasCoherent(q, prog), ...plausible(prog)];
    if (/du départ|de son point de départ/.test(qu)) {
      if (Math.abs(loin - Math.round(loin)) > 1e-6) p.push("distance au départ non entière");
      return [...p, ...attendu(q, Math.round(loin), us[0])];
    }
    if (/parcouru/.test(qu)) return [...p, ...attendu(q, e.dist, us[0])];
    return [`question illisible : « ${qu} »`];
  },

  /* ===== algo_repetition ===== */
  "6e_algo_repetition_tpl_1_distance": (q) => {
    const { prog } = programme(q);
    const us = uniteProg(prog);
    if (us.length !== 1) return ["plusieurs unités dans le programme"];
    return [...attendu(q, executer(prog).dist, us[0]), ...canvasCoherent(q, prog), ...plausible(prog)];
  },
  "6e_algo_repetition_tpl_2_nombre_actions": (q) => {
    const { prog } = programme(q);
    return [...attendu(q, compter(question(q), prog)), ...canvasCoherent(q, prog), ...plausible(prog)];
  },
  "6e_algo_repetition_tpl_3_completer_repetition": (q) => {
    const { prog } = programme(q);
    const t = prog[0];
    if (prog.length !== 1 || t.t !== "trou" || t.quoi !== "rep") return ["une boucle à compléter attendue"];
    const tour = executer(t.corps ?? []);
    let m: RegExpMatchArray | null;
    let k: number;
    if ((m = q.text.match(/doit tourner de (\d+)° en tout/))) k = Number(m[1]) / tour.angle;
    else if ((m = q.text.match(/doit parcourir (\d+) (pas|cm|m|cases?) en tout/))) k = Number(m[1]) / tour.dist;
    else return ["objectif illisible"];
    const p: string[] = [];
    if (!Number.isInteger(k) || k < 2) p.push(`le nombre de tours ne tombe pas juste (${k})`);
    return [...p, ...attendu(q, k), ...canvasCoherent(q, prog), ...plausible(t.corps ?? [])];
  },
  "6e_algo_repetition_tpl_4_angle_total": (q) => {
    const { prog } = programme(q);
    return [...attendu(q, executer(prog).angle, "°"), ...canvasCoherent(q, prog), ...plausible(prog)];
  },
  "6e_algo_repetition_tpl_5_combien_de_fois": (q) => {
    const { prog } = programme(q);
    const p: string[] = [];
    if (prog.length !== 1 || prog[0].t !== "rep") p.push("une seule boucle attendue");
    return [...p, ...attendu(q, compter(question(q), prog)), ...plausible(prog)];
  },
  "6e_algo_repetition_tpl_6_avant_pendant_apres": (q) => {
    const { prog } = programme(q);
    const qu = question(q);
    const e = executer(prog);
    const us = uniteProg(prog);
    const p = [...canvasCoherent(q, prog), ...plausible(prog)];
    if (/degrés/.test(qu)) return [...p, ...attendu(q, e.angle, "°")];
    if (/distance/.test(qu)) return [...p, ...attendu(q, e.dist, us[0])];
    return [...p, ...attendu(q, compter(qu, prog))];
  },

  /* ===== algo_lire_programme ===== */
  "6e_algo_lire_programme_tpl_1_distance_totale": (q) => {
    const { prog } = programme(q);
    const us = uniteProg(prog);
    if (us.length !== 1) return ["plusieurs unités dans le programme"];
    return [...attendu(q, executer(prog).dist, us[0]), ...canvasCoherent(q, prog), ...plausible(prog)];
  },
  "6e_algo_lire_programme_tpl_2_nombre_blocs_executés": (q) => {
    const { prog } = programme(q);
    return [...attendu(q, compter(question(q), prog)), ...canvasCoherent(q, prog), ...plausible(prog)];
  },
  "6e_algo_lire_programme_tpl_3_qcm_resultat": (q) => {
    const { prog } = programme(q);
    if (prog[0]?.t === "calc") return calculJuste(q, prog);
    const us = uniteProg(prog);
    if (us.length !== 1) return ["plusieurs unités dans le programme"];
    return [...attendu(q, executer(prog).dist, us[0]), ...canvasCoherent(q, prog), ...plausible(prog)];
  },
  "6e_algo_lire_programme_tpl_4_calcul_une_etape": (q) => {
    const { prog } = programme(q);
    const p: string[] = prog.length !== 2 ? ["un programme d’une seule opération attendu"] : [];
    return [...p, ...calculJuste(q, prog)];
  },
  "6e_algo_lire_programme_tpl_5_calcul_plusieurs_etapes": (q) => calculJuste(q, programme(q).prog),
  "6e_algo_lire_programme_tpl_6_variable_et_boucle": (q) => {
    const { prog, lignes } = programme(q);
    if (lignes[0] === "choisir un nombre") {
      // À l'envers : on essaie tous les nombres de départ.
      const v = nombre((q.text.match(/obtient (\d+)/) ?? [])[1] ?? "");
      const bons: number[] = [];
      for (let s = 0; s <= 300; s++) {
        const e = executer([{ t: "calc", op: "=", n: s }, ...prog.slice(1)]);
        if (Math.abs(e.valeur - v) < 1e-9 && !e.negatif) bons.push(s);
      }
      if (bons.length !== 1) return [`${bons.length} nombres de départ donnent ${v}`];
      return attendu(q, bons[0]);
    }
    const m = question(q).match(/« (.+) »/);
    if (!m) return ["variable de la question illisible"];
    const e = executer(prog);
    if (!(m[1] in e.vars)) return [`la variable « ${m[1]} » n’est pas dans le programme`];
    return [...attendu(q, e.vars[m[1]]), ...canvasCoherent(q, prog), ...plausible(prog)];
  },

  /* ===== algo_figure ===== */
  "6e_algo_figure_tpl_1_carre_cote": (q) => {
    const { prog } = programme(q);
    const f = figure(prog);
    const p = [...canvasCoherent(q, prog), ...plausible(prog)];
    const annonce = figureAnnoncee(q);
    if (annonce && annonce !== f.nom) p.push(`l’énoncé annonce ${annonce}, le programme trace ${f.nom}`);
    if (/côtés/.test(question(q)) && /Combien de côtés/.test(question(q))) return [...p, ...attendu(q, f.cotes)];
    if (!f.longueurs.every((l) => l === f.longueurs[0])) p.push("les côtés n’ont pas tous la même longueur");
    return [...p, ...attendu(q, f.longueurs[0], uniteProg(prog)[0])];
  },
  "6e_algo_figure_tpl_2_perimetre_carre": (q) => {
    const { prog } = programme(q);
    const f = figure(prog);
    const p = [...canvasCoherent(q, prog), ...plausible(prog)];
    const annonce = figureAnnoncee(q);
    if (annonce && annonce !== f.nom) p.push(`l’énoncé annonce ${annonce}, le programme trace ${f.nom}`);
    if (!NOMS_FIGURES.includes(f.nom)) p.push(`figure non reconnue (${f.nom})`);
    return [...p, ...attendu(q, f.perimetre, uniteProg(prog)[0])];
  },
  "6e_algo_figure_tpl_3_triangle_equilateral": (q) => {
    const { prog } = programme(q);
    const voulu = figureAnnoncee(q);
    if (!voulu) return ["figure voulue illisible"];
    const v = nombre(String(q.expected[0]));
    const f = figure(remplir(prog, v));
    const p = [...canvasCoherent(q, prog)];
    if (f.nom !== voulu) p.push(`avec ${q.expected[0]}, le programme trace ${f.nom}, pas ${voulu}`);
    const surAngle = /angle|degrés/.test(question(q));
    if (surAngle !== String(q.expected[0]).endsWith("°")) p.push("unité : un angle en degrés, un nombre de tours sans unité");
    return p;
  },
  "6e_algo_figure_tpl_4_quelle_figure": (q) => {
    const { prog } = programme(q);
    const f = figure(prog);
    const p = [...attendu(q, f.nom), ...canvasCoherent(q, prog), ...plausible(prog)];
    if (f.nom === "un carré" && (q.choices ?? []).includes("un rectangle")) p.push("un carré est aussi un rectangle : deux bonnes réponses");
    if (f.nom === "un triangle équilatéral" && (q.choices ?? []).includes("un triangle")) p.push("deux bonnes réponses (triangle)");
    return p;
  },
  "6e_algo_figure_tpl_5_escalier": (q) => {
    const { prog } = programme(q);
    const f = figure(prog);
    const p = [...canvasCoherent(q, prog), ...plausible(prog)];
    if (f.nom !== "ouverte") p.push(`un escalier ne se referme pas (${f.nom})`);
    if (/marches/.test(question(q))) {
      const t0 = f.traits[0];
      const dir = (t: typeof t0) => Math.atan2(t.x1 - t.x0, t.y1 - t.y0);
      const marches = f.traits.filter((t) => Math.abs(dir(t) - dir(t0)) < 1e-6).length;
      return [...p, ...attendu(q, marches)];
    }
    return [...p, ...attendu(q, f.perimetre, uniteProg(prog)[0])];
  },

  /* ===== algo_defi ===== */
  "6e_algo_defi_tpl_1_perimetre_rectangle": (q) => {
    const { prog } = programme(q);
    const f = figure(prog);
    const u = uniteProg(prog)[0];
    const p = [...canvasCoherent(q, prog), ...plausible(prog)];
    if (f.nom !== "un rectangle") p.push(`le programme trace ${f.nom}, pas un rectangle`);
    if (/aire/.test(question(q))) {
      const [a, b] = f.longueurs;
      const e = String(q.expected[0]);
      if (!e.endsWith(`${u}²`)) p.push(`une aire s’écrit en ${u}² (« ${e} »)`);
      if (nombre(e) !== a * b) p.push(`aire attendue ${e}, le rectangle relu donne ${a * b}`);
      return p;
    }
    return [...p, ...attendu(q, f.perimetre, u)];
  },
  "6e_algo_defi_tpl_2_boucle_optimisee": (q) => {
    const { lignes, prog } = programme(q);
    // Le motif peut contenir lui-même « dire « … » » : on le prend entre deux repères fixes.
    const m = question(q).match(/répéter … fois : (.+) »\. Quel nombre/) ?? question(q).match(/boucle « (.+) », combien/);
    if (!m) return ["motif de la boucle illisible"];
    const motif = m[1].split(" puis ");
    const k = lignes.length / motif.length;
    const p = [...canvasCoherent(q, prog), ...plausible(prog)];
    if (!Number.isInteger(k)) return [...p, "le programme n’est pas fait du motif répété"];
    for (let i = 0; i < lignes.length; i++)
      if (lignes[i] !== motif[i % motif.length]) return [...p, `la ligne ${i + 1} ne suit pas le motif`];
    return [...p, ...attendu(q, k)];
  },
  "6e_algo_defi_tpl_3_reunion_margouillat": (q) => {
    const { lignes } = programme(q);
    const m = q.text.match(/trace (un [a-zéè ]+?) de côté (\d+) (pas|cm|m|cases?)\./);
    if (!m) return ["figure voulue illisible"];
    const [, voulu, cote] = m;
    // On applique chaque correction proposée et on regarde ce que le stylo trace.
    const repare = (choix: string) => {
      let ls = [...lignes];
      const c = choix.match(/^changer « (.+) » en « (.+) »$/);
      if (c) {
        if (!ls.some((l) => l.includes(c[1]))) return false;
        ls = ls.map((l) => l.replace(c[1], c[2]));
      } else if (/^ajouter un bloc « avancer »/.test(choix)) ls.push(`avancer de ${cote} pas`);
      else if (/^ajouter un bloc « dire »/.test(choix)) ls.push("dire « Fini ! »");
      else return false;
      const f = figure(ls.map(lire));
      return f.nom === voulu && f.longueurs.every((l) => l === Number(cote));
    };
    const p: string[] = [];
    if (figure(lignes.map(lire)).nom === voulu && figure(lignes.map(lire)).longueurs.every((l) => l === Number(cote)))
      p.push("le programme de départ trace déjà la figure");
    const bons = (q.choices ?? []).filter(repare);
    if (bons.length !== 1) p.push(`${bons.length} corrections réparent le programme : ${bons.join(" | ")}`);
    else if (bons[0] !== q.expected[0]) p.push(`la correction qui marche est « ${bons[0]} », pas « ${q.expected[0]} »`);
    return [...p, ...canvasCoherent(q, programme(q).prog), ...plausible(programme(q).prog)];
  },
  "6e_algo_defi_tpl_4_calcul_en_boucle": (q) => calculJuste(q, programme(q).prog),
};

const NOMS_FIGURES = ["un triangle équilatéral", "un carré", "un rectangle", "un pentagone", "un hexagone", "un octogone"];
/** La figure annoncée dans l'énoncé (avant le programme), s'il y en a une. */
function figureAnnoncee(q: Q): string | null {
  const avant = q.text.split("\n– ")[0];
  return NOMS_FIGURES.find((n) => avant.includes(n)) ?? null;
}
/** Remplit le « … » du programme avec la valeur v. */
function remplir(prog: L[], v: number): L[] {
  return prog.map((i): L => {
    if (i.t === "trou") {
      if (i.quoi === "rep") return { t: "rep", k: v, corps: remplir(i.corps ?? [], v) };
      if (i.quoi === "tg") return { t: "tg", a: v, g: false };
      return { t: "av", n: v, u: "pas" };
    }
    if (i.t === "rep") return { ...i, corps: remplir(i.corps, v) };
    return i;
  });
}

/** Un programme de calcul : la réponse est la valeur finale, entière, jamais négative en route. */
function calculJuste(q: Q, prog: L[]): string[] {
  const p: string[] = [];
  if (prog[0]?.t !== "calc" || prog[0].op !== "=") p.push("le programme ne commence pas par « choisir le nombre »");
  const calcul = (i: L): boolean => i.t === "calc" || (i.t === "rep" && i.corps.every(calcul));
  if (!prog.every(calcul)) p.push("ligne de calcul illisible");
  const e = executer(prog);
  if (e.negatif || e.nonEntier) p.push("un calcul passe par un nombre négatif ou non entier");
  if (e.valeur > 500) p.push(`résultat peu plausible : ${e.valeur}`);
  return [...p, ...attendu(q, e.valeur)];
}
