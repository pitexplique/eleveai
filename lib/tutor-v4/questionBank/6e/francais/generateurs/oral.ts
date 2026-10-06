import type { GenerateurFrancais, GenerateursFrancais, QuestionFrancais } from "./types";
import * as T from "./oral-tables";
import type { Bloc, Prenom, Situation } from "./oral-tables";

// LA FAMILLE « ORAL » DU FRANÇAIS DE 6e : 14 générateurs à correcteur
// (06/10/2026, voir types.ts). Notions : oral_ecouter, oral_dire, oral_echanger.
//
// À l'oral, beaucoup d'attitudes sont « un peu justes » (écouter, reformuler,
// regarder la classe…). Deux garde-fous :
//   • une question part d'une SITUATION précise (oral-tables.ts) dont les
//     leurres sont écrits POUR ELLE : chacun y est clairement mauvais ;
//   • une table de QUASI-SYNONYMES (plus bas) : deux attitudes du même groupe
//     ne sont jamais opposées l'une à l'autre, et le correcteur le vérifie.
// Le correcteur relit le texte que lit l'élève, retrouve la situation (une et
// une seule), vérifie la bonne réponse et chaque leurre, puis relit le
// français : élisions, contractions, pronoms à deux antécédents, verbe répété.

// ── Outils ────────────────────────────────────────────────────────────────

const hasard = <X>(t: readonly X[]): X => t[Math.floor(Math.random() * t.length)];
function melange<X>(t: readonly X[]): X[] {
  const c = [...t];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
// Sans « h » ni « y » : « de Hugo », « de Yanis ».
const VOYELLE = /^[aeiouàâäéèêëîïôöûüœæ]/i;
const de = (x: string) => (VOYELLE.test(x) ? "d'" + x : "de " + x);
const que = (x: string) => (VOYELLE.test(x) ? "qu'" + x : "que " + x);
const echap = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const LETTRE = "[A-Za-zÀ-ÿœæŒÆ]";

function deuxPrenoms(): [Prenom, Prenom] {
  const P = hasard(T.PRENOMS);
  const Q = hasard(T.PRENOMS.filter((x) => x.f !== P.f));
  return [P, Q];
}
const trouverPrenom = (p: string) => T.PRENOMS.find((x) => x.p === p);

// ── Le français, relu ─────────────────────────────────────────────────────

const ELISIONS_PERMISES = new Set([
  "l", "d", "j", "m", "t", "s", "n", "c", "qu", "jusqu", "lorsqu", "puisqu", "aujourd", "presqu", "quelqu",
]);
const IMPERSONNEL =
  /(il (faut|ne faut|y a|n'y a|vaut|est temps|reste|pleut|fait|était une fois)|faut-il|vaut-il|y a-t-il|s'il te plaît|s'il vous plaît)/gi;
/** Verbes conjugués des tables : aucun ne doit revenir dans deux phrases voisines. */
const VERBES_SURVEILLES = new Set([
  "présente", "parle", "dit", "explique", "lit", "montre", "regarde", "écoute", "demande", "raconte",
  "répond", "joue", "prépare", "coupe", "propose", "pense", "veut", "doit", "sait", "voit", "arrive",
  "commence", "trouve", "annonce", "lève", "garde", "reçoit", "emploie", "entend", "lance", "lit",
  "donne", "écrit", "cherche", "passe", "prend", "attend", "répète", "annonce", "chuchote", "crie",
]);
/** Adjectifs ou participes à accorder après un prénom de fille. */
const ACCORDS: Record<string, string> = {
  stressé: "stressée", intimidé: "intimidée", perdu: "perdue", gêné: "gênée", fatigué: "fatiguée",
  pressé: "pressée", déçu: "déçue", content: "contente", fier: "fière", prêt: "prête", sûr: "sûre",
  vexé: "vexée", énervé: "énervée", surpris: "surprise", inquiet: "inquiète", timide: "timide",
  convaincu: "convaincue", seul: "seule", furieux: "furieuse", ému: "émue",
};

function relireFrancais(s: string): string[] {
  const p: string[] = [];
  if (/undefined|null|NaN|[{}]/.test(s)) p.push(`trou dans le texte : « ${s} »`);
  const oubli = new RegExp(
    `(?<!${LETTRE})(de|que|je|me|te|se|ne|le|la|lorsque|puisque) ([aeiouàâäéèêëîïôöûüœæ]${LETTRE}*)`,
    "i",
  ).exec(s);
  if (oubli) p.push(`élision oubliée : « ${oubli[0]} »`);
  const si = new RegExp(`(?<!${LETTRE})si ils?(?!${LETTRE})`, "i").exec(s);
  if (si) p.push(`élision oubliée : « ${si[0]} »`);
  for (const m of s.matchAll(new RegExp(`(${LETTRE}+)'`, "g")))
    if (!ELISIONS_PERMISES.has(m[1].toLowerCase())) p.push(`élision fautive : « ${m[0]} »`);
  const contr = new RegExp(`(?<!${LETTRE})(à|de) (le|les) `, "i").exec(s);
  if (contr) p.push(`article non contracté : « ${contr[0].trim()} »`);
  if (/[^ ][?!;]/.test(s)) p.push("il manque une espace avant « ? », « ! » ou « ; »");
  if (/[^ ]:(?!\d)/.test(s)) p.push("il manque une espace avant « : »");
  if (/«(?! )/.test(s) || /(?<! )»/.test(s)) p.push("guillemets sans espace intérieure");
  if (/ [,.]/.test(s)) p.push("espace avant une virgule ou un point");
  let prof = 0;
  for (const c of s) {
    if (c === "«" && ++prof > 1) p.push("guillemets imbriqués");
    if (c === "»" && --prof < 0) p.push("guillemet fermant sans ouvrant");
  }
  if (prof > 0) p.push("guillemets non refermés");
  return p;
}

function positions(s: string, mot: string): number[] {
  const r = new RegExp(`(?<!${LETTRE})${echap(mot)}(?!${LETTRE})`, "g");
  return [...s.matchAll(r)].map((m) => m.index ?? 0);
}

/** Un pronom il/elle doit avoir UN antécédent prénommé, placé AVANT lui. */
function relirePronoms(s: string): string[] {
  const p: string[] = [];
  const sans = s.replace(IMPERSONNEL, (m) => " ".repeat(m.length));
  for (const f of [true, false]) {
    const pron = f ? "elle" : "il";
    const idx = [...positions(sans, pron), ...positions(sans, maj(pron))];
    if (!idx.length) continue;
    const noms = T.PRENOMS.filter((x) => x.f === f && positions(s, x.p).length);
    if (noms.length >= 2)
      p.push(`pronom « ${pron} » ambigu : ${noms.map((x) => x.p).join(" ou ")}`);
    else if (noms.length === 1 && Math.min(...idx) < Math.min(...positions(s, noms[0].p)))
      p.push(`pronom « ${pron} » placé avant son prénom (${noms[0].p})`);
  }
  // Un possessif (« son exposé ») avant le premier prénom : il n'a pas encore d'antécédent.
  const premierNom = Math.min(...T.PRENOMS.flatMap((x) => positions(s, x.p)));
  const premierPoss = Math.min(...["son", "sa", "ses", "Son", "Sa", "Ses"].flatMap((m) => positions(s, m)));
  if (Number.isFinite(premierNom) && premierPoss < premierNom) p.push("possessif placé avant le prénom");
  // Accords simples après un prénom de fille.
  for (const x of T.PRENOMS.filter((y) => y.f && positions(s, y.p).length)) {
    const r = new RegExp(`${x.p} (est|était|semble|reste|se sent) (${LETTRE}+)`, "g");
    for (const m of s.matchAll(r)) if (ACCORDS[m[2]] && ACCORDS[m[2]] !== m[2]) p.push(`accord oublié : « ${m[0]} »`);
  }
  return p;
}

function relireRepetitions(s: string): string[] {
  const phrases = s.split(/(?<=[.!?])\s+/).map((ph) => new Set(ph.toLowerCase().match(new RegExp(`${LETTRE}+`, "g")) ?? []));
  const p: string[] = [];
  for (let i = 0; i + 1 < phrases.length; i++)
    for (const v of phrases[i]) if (VERBES_SURVEILLES.has(v) && phrases[i + 1].has(v)) p.push(`verbe « ${v} » répété dans deux phrases voisines`);
  return p;
}

function relire(q: QuestionFrancais): string[] {
  const p: string[] = [];
  for (const s of [q.text, q.correct, ...q.wrongs, q.methode ?? ""]) p.push(...relireFrancais(s));
  p.push(...relirePronoms(q.text), ...relireRepetitions(q.text));
  return p;
}

// ── Les quasi-synonymes : jamais l'un en leurre de l'autre ────────────────

const QUASI: readonly RegExp[] = [
  /plus fort|voix forte|hausser la voix|projeter sa voix/i,
  /ralentir|plus lentement|des pauses|marquer une pause|silences?/i,
  /lever les yeux|regarder (la classe|le public|son public|les autres)|face à la classe/i,
  /mots? clés?/i,
  /résumer|l'essentiel|idée principale/i,
  /reformul|avec ses (propres )?mots|redire autrement/i,
  /lever la main|attendre son tour/i,
  /s'excuser|pardon/i,
];
function quasi(a: string, b: string): boolean {
  if (a.trim().toLowerCase() === b.trim().toLowerCase()) return true;
  return QUASI.some((g) => g.test(a) && g.test(b));
}

// ── Remplir et relire un gabarit ──────────────────────────────────────────

type Vars = { P?: Prenom; Q?: Prenom; X?: string; bon?: string };

function remplir(tpl: string, v: Vars): string {
  return tpl.replace(/\{(\w+)\}/g, (_, k: string) => {
    const P = v.P ?? T.PRENOMS[0];
    const Q = v.Q ?? T.PRENOMS[T.PRENOMS.length - 1];
    switch (k) {
      case "P": return P.p;
      case "Q": return Q.p;
      case "deP": return de(P.p);
      case "deQ": return de(Q.p);
      case "queP": return que(P.p);
      case "queQ": return que(Q.p);
      case "il": return P.f ? "elle" : "il";
      case "Il": return P.f ? "Elle" : "Il";
      case "ilQ": return Q.f ? "elle" : "il";
      case "IlQ": return Q.f ? "Elle" : "Il";
      case "e": return P.f ? "e" : "";
      case "eQ": return Q.f ? "e" : "";
      case "X": return v.X ?? "";
      case "deX": return de(v.X ?? "");
      case "bon": return v.bon ?? "";
      case "Bon": return maj(v.bon ?? "");
      case "deBon": return de(v.bon ?? "");
      default: throw new Error(`gabarit inconnu {${k}}`);
    }
  });
}

/**
 * Relit un texte rempli à partir d'un gabarit : rend les valeurs (prénoms,
 * contexte, attitude) si le texte est EXACTEMENT ce gabarit rempli
 * (aller-retour), sinon null.
 */
function lire(tpl: string, texte: string, ctx: readonly string[]): Vars | null {
  const noms: string[] = [];
  const corps = tpl
    .split(/(\{\w+\})/)
    .map((morceau) => {
      const m = /^\{(\w+)\}$/.exec(morceau);
      if (!m) return echap(morceau);
      noms.push(m[1]);
      return "(.*?)";
    })
    .join("");
  const m = new RegExp(`^${corps}$`).exec(texte);
  if (!m) return null;
  const v: Vars = {};
  noms.forEach((n, i) => {
    const val = m[i + 1];
    if (n === "P") v.P = trouverPrenom(val);
    else if (n === "Q") v.Q = trouverPrenom(val);
    else if (n === "deP" || n === "queP") v.P = trouverPrenom(val.replace(/^(de |d'|que |qu')/, ""));
    else if (n === "deQ" || n === "queQ") v.Q = trouverPrenom(val.replace(/^(de |d'|que |qu')/, ""));
    else if (n === "X") v.X = val;
    else if (n === "deX") v.X = val.replace(/^(de |d')/, "");
    else if (n === "bon") v.bon = val;
    else if (n === "Bon") v.bon = val.charAt(0).toLowerCase() + val.slice(1);
    else if (n === "deBon") v.bon = val.replace(/^(de |d')/, "");
  });
  if (/\{(P|deP|queP|il|Il|e)\}/.test(tpl) && !v.P) {
    // Le prénom n'apparaît qu'en pronom : on essaie les deux genres.
    if (!/\{(P|deP|queP)\}/.test(tpl)) v.P = T.PRENOMS.find((x) => remplir(tpl, { ...v, P: x }) === texte);
    if (!v.P) return null;
  }
  if (/\{(Q|deQ|queQ)\}/.test(tpl) && !v.Q) return null;
  if (v.P && v.Q && v.P.f === v.Q.f) return null;
  if (/\{(X|deX)\}/.test(tpl) && !ctx.includes(v.X ?? "")) return null;
  return remplir(tpl, v) === texte ? v : null;
}

// ── Les SITUATIONS : situation → attitude, et l'inverse ───────────────────

function questionSituation(B: Bloc, inverse = Math.random() < 0.3): QuestionFrancais {
  // Une attitude qui contient déjà des guillemets ne s'interroge pas à l'envers
  // (« « … » » serait illisible).
  const inversables = B.sits.filter(inversable);
  const sit = inverse && inversables.length ? hasard(inversables) : hasard(B.sits);
  if (inverse && B.toursInv.length && inversable(sit)) {
    const autres = B.sits.filter((o) => o.id !== sit.id && !o.pasDInverse && compatiblesInverse(sit, o));
    if (autres.length >= 3)
      return {
        text: remplir(hasard(B.toursInv), { bon: sit.bon }),
        correct: sit.cas,
        wrongs: melange(autres).slice(0, 3).map((o) => o.cas),
        methode: B.methodeInv,
      };
  }
  const [P, Q] = deuxPrenoms();
  const v: Vars = { P, Q, X: hasard(B.ctx) };
  return {
    text: remplir(sit.s + " " + hasard(sit.tours ?? B.tours), v),
    correct: remplir(sit.bon, v),
    wrongs: melange(sit.faux).slice(0, 3).map((w) => remplir(w, v)),
    methode: B.methode,
  };
}

/** Une attitude sans guillemets ni prénom, d'une situation qui s'interroge à l'envers. */
const inversable = (s: Situation) => !s.pasDInverse && !/[«{]/.test(s.bon);

/** Le cas de `o` peut-il servir de leurre à la question « quand faut-il {bon de sit} ? » */
function compatiblesInverse(sit: Situation, o: Situation): boolean {
  if ((sit.voisins ?? []).includes(o.id) || (o.voisins ?? []).includes(sit.id)) return false;
  return !quasi(sit.bon, o.bon);
}

function corrigerSituation(B: Bloc, q: QuestionFrancais): string[] {
  const p = relire(q);
  const directs: { sit: Situation; v: Vars }[] = [];
  for (const sit of B.sits)
    for (const tour of sit.tours ?? B.tours) {
      const v = lire(sit.s + " " + tour, q.text, B.ctx);
      if (v) directs.push({ sit, v });
    }
  const inverses: Situation[] = [];
  for (const tour of B.toursInv) {
    const v = lire(tour, q.text, B.ctx);
    if (v?.bon) inverses.push(...B.sits.filter((s) => s.bon === v.bon));
  }
  const n = new Set([...directs.map((d) => d.sit.id), ...inverses.map((s) => "inv:" + s.id)]).size;
  if (n === 0) return [...p, "situation introuvable dans la table"];
  if (n > 1) return [...p, "le texte correspond à plusieurs situations"];
  if (directs.length) {
    const { sit, v } = directs[0];
    if (q.correct !== remplir(sit.bon, v)) p.push(`la bonne réponse n'est pas l'attitude de la situation « ${sit.id} »`);
    for (const w of q.wrongs) {
      if (!sit.faux.some((f) => remplir(f, v) === w)) p.push(`leurre « ${w} » : absent des attitudes fausses de « ${sit.id} »`);
      if (quasi(w, q.correct)) p.push(`leurre « ${w} » : quasi-synonyme de la bonne réponse`);
    }
  } else {
    const sit = inverses[0];
    if (q.correct !== sit.cas) p.push(`la bonne réponse n'est pas le cas de « ${sit.id} »`);
    for (const w of q.wrongs) {
      const o = B.sits.find((x) => x.cas === w);
      if (!o) p.push(`leurre « ${w} » : cas absent de la table`);
      else if (o.id === sit.id || o.pasDInverse || !compatiblesInverse(sit, o)) p.push(`leurre « ${w} » : ce cas demande aussi cette attitude`);
    }
  }
  return p;
}

function depuisBloc(B: Bloc): GenerateurFrancais {
  return { generer: () => questionSituation(B), corriger: (q) => corrigerSituation(B, q) };
}

// ── Les BRIQUES : une micro mélange plusieurs façons de poser sa compétence ─

type Brique = {
  generer: () => QuestionFrancais;
  /** Vrai si la question a la forme de cette brique. */
  reconnait: (q: QuestionFrancais) => boolean;
  corriger: (q: QuestionFrancais) => string[];
};

function briqueBloc(B: Bloc): Brique {
  return {
    generer: () => questionSituation(B),
    reconnait: (q) => !corrigerSituation(B, q).some((p) => p.startsWith("situation introuvable")),
    corriger: (q) => corrigerSituation(B, q),
  };
}

/** Une micro = des briques pondérées ; le correcteur fait juger la question par LA brique qui la reconnaît. */
function melangeBriques(briques: readonly [Brique, number][]): GenerateurFrancais {
  const total = briques.reduce((a, [, w]) => a + w, 0);
  return {
    generer: () => {
      let r = Math.random() * total;
      for (const [b, w] of briques) if ((r -= w) < 0) return b.generer();
      return briques[0][0].generer();
    },
    corriger: (q) => {
      const qui = briques.filter(([b]) => b.reconnait(q));
      if (qui.length === 0) return [...relire(q), "question reconnue par aucune brique"];
      if (qui.length > 1) return [...relire(q), "question reconnue par plusieurs briques"];
      return qui[0][0].corriger(q);
    },
  };
}

// ── Le MESSAGE entendu : on cherche UNE information (ou deux, ou l'essentiel) ─

type TypeInfo = "jour" | "heure" | "lieu" | "objet";
const TYPES_INFO: readonly TypeInfo[] = ["jour", "heure", "lieu", "objet"];
const VALEURS: Record<TypeInfo, readonly string[]> = { jour: T.JOURS, heure: T.HEURES, lieu: T.LIEUX, objet: T.OBJETS };
/** Ce que l'élève cherche, dit de plusieurs façons. */
const QUOI: Record<TypeInfo, readonly string[]> = {
  jour: ["quel jour il faut venir", "le jour du rendez-vous"],
  heure: ["à quelle heure il faut être là", "l'heure du rendez-vous"],
  lieu: ["où il faut se retrouver", "le lieu du rendez-vous"],
  objet: ["ce qu'il faut apporter", "ce qu'il faut mettre dans son sac"],
};
const TOURS_UN = [
  "{P} écoute pour savoir {quoi}. Quelle information compte pour {P} ?",
  "{P} veut seulement savoir {quoi}. Que faut-il retenir ?",
  "Avant d'écouter, {P} se demande {quoi}. Quelle est la réponse ?",
];
const TOURS_DEUX = [
  "{P} doit retenir deux choses : {quoi} et {quoi2}. Quelle réponse est juste ?",
  "{P} écoute pour savoir {quoi}, et aussi {quoi2}. Que faut-il retenir ?",
];
const TOURS_RESUME = [
  "{P} a entendu ce message une seule fois. Quel résumé redit l'essentiel, sans erreur ?",
  "{P} doit redire ce message à un camarade absent. Quel résumé est juste et complet ?",
  "{P} hésite entre plusieurs résumés de ce message. Lequel redit tout l'essentiel ?",
];
type Message = { annonceur: string; evenement: string } & Record<TypeInfo, string>;

function tirerMessage(): Message {
  const ev = hasard(T.EVENEMENTS);
  return {
    annonceur: hasard(T.ANNONCEURS),
    evenement: ev.nom,
    jour: hasard(T.JOURS),
    heure: hasard(T.HEURES),
    lieu: hasard(T.LIEUX),
    objet: hasard(ev.objets),
  };
}
const objetsDe = (m: Message) => T.EVENEMENTS.find((e) => e.nom === m.evenement)?.objets ?? [];
const dire = (m: Message) =>
  `${m.annonceur} annonce : « ${m.evenement} aura lieu ${m.jour} à ${m.heure}, ${m.lieu}. Apportez ${m.objet}. »`;
const RE_MESSAGE = /^(.+?) annonce : « (.+?) aura lieu (\S+) à (.+?), (.+?)\. Apportez (.+?)\. » (.+)$/;

/** Relit le message cité : null s'il n'est pas fait des valeurs des tables. */
function lireMessage(texte: string): { m: Message; suite: string } | null {
  const r = RE_MESSAGE.exec(texte);
  if (!r) return null;
  const m: Message = { annonceur: r[1], evenement: r[2], jour: r[3], heure: r[4], lieu: r[5], objet: r[6] };
  if (!T.ANNONCEURS.includes(m.annonceur) || !objetsDe(m).includes(m.objet)) return null;
  for (const t of TYPES_INFO) if (!VALEURS[t].includes(m[t])) return null;
  return { m, suite: r[7] };
}

/** Les valeurs des tables présentes dans une réponse, type par type. */
function valeursDans(s: string, t: TypeInfo): string[] {
  return VALEURS[t].filter((v) => new RegExp(`(?<![\\wÀ-ÿ])${echap(v)}(?![\\wÀ-ÿ])`).test(s));
}

/** Retrouve, dans la suite du texte, quel(s) type(s) d'information l'élève cherche. */
function lireQuoi(suite: string, tours: readonly string[], P: boolean): { P: Prenom; types: TypeInfo[] } | null {
  for (const tour of tours)
    for (const t1 of TYPES_INFO)
      for (const q1 of QUOI[t1])
        for (const t2 of tours === TOURS_DEUX ? TYPES_INFO.filter((x) => x !== t1) : [t1])
          for (const q2 of tours === TOURS_DEUX ? QUOI[t2] : [""]) {
            const tpl = tour.replace("{quoi}", q1).replace("{quoi2}", q2);
            const v = lire(tpl, suite, []);
            if (v && (v.P || !P)) return { P: v.P!, types: tours === TOURS_DEUX ? [t1, t2] : [t1] };
          }
  return null;
}

const briqueMessageUn: Brique = {
  generer: () => {
    const m = tirerMessage();
    const t = hasard(TYPES_INFO);
    const P = hasard(T.PRENOMS);
    const tour = hasard(TOURS_UN).replace("{quoi}", hasard(QUOI[t]));
    return {
      text: dire(m) + " " + remplir(tour, { P }),
      correct: m[t],
      wrongs: melange(TYPES_INFO.filter((x) => x !== t)).map((x) => m[x]),
      methode: "Repère d'abord ce que tu cherches (un jour, une heure, un lieu, un objet), puis écoute seulement cette information.",
    };
  },
  reconnait: (q) => {
    const l = lireMessage(q.text);
    return !!l && !!lireQuoi(l.suite, TOURS_UN, true);
  },
  corriger: (q) => {
    const p = relire(q);
    const l = lireMessage(q.text);
    const quoi = l && lireQuoi(l.suite, TOURS_UN, true);
    if (!l || !quoi) return [...p, "message ou question illisible"];
    const t = quoi.types[0];
    if (q.correct !== l.m[t]) p.push(`la bonne réponse devrait être « ${l.m[t]} » (${t})`);
    for (const w of q.wrongs) {
      if (w === l.m[t] || valeursDans(w, t).includes(l.m[t])) p.push(`leurre « ${w} » : c'est aussi l'information cherchée`);
      if (!TYPES_INFO.some((x) => x !== t && l.m[x] === w)) p.push(`leurre « ${w} » : absent du message`);
    }
    return p;
  },
};

const briqueMessageDeux: Brique = {
  generer: () => {
    const m = tirerMessage();
    const [t1, t2] = melange(TYPES_INFO).slice(0, 2);
    const [a, b] = TYPES_INFO.filter((x) => x !== t1 && x !== t2);
    const P = hasard(T.PRENOMS);
    // Pas deux fois « du rendez-vous » dans la même phrase.
    const q1 = hasard(QUOI[t1]);
    const q2 = hasard(QUOI[t2].filter((x) => !(q1.includes("rendez-vous") && x.includes("rendez-vous"))));
    const tour = hasard(TOURS_DEUX).replace("{quoi}", q1).replace("{quoi2}", q2);
    const dire2 = (x: string, y: string) => `${x} ; ${y}`;
    return {
      text: dire(m) + " " + remplir(tour, { P }),
      correct: dire2(m[t1], m[t2]),
      wrongs: melange([dire2(m[t1], m[a]), dire2(m[b], m[t2]), dire2(m[a], m[b])]),
      methode: "Garde en tête les deux choses que tu cherches, et vérifie que ta réponse donne les deux, sans erreur.",
    };
  },
  reconnait: (q) => {
    const l = lireMessage(q.text);
    return !!l && !!lireQuoi(l.suite, TOURS_DEUX, true);
  },
  corriger: (q) => {
    const p = relire(q);
    const l = lireMessage(q.text);
    const quoi = l && lireQuoi(l.suite, TOURS_DEUX, true);
    if (!l || !quoi) return [...p, "message ou question illisible"];
    const [t1, t2] = quoi.types;
    const juste = (s: string) => {
      const [x, y] = s.split(" ; ");
      return x === l.m[t1] && y === l.m[t2];
    };
    if (!juste(q.correct)) p.push(`la bonne réponse devrait être « ${l.m[t1]} ; ${l.m[t2]} »`);
    for (const w of q.wrongs) {
      if (juste(w)) p.push(`leurre « ${w} » : il est juste`);
      const morceaux = w.split(" ; ");
      if (morceaux.length !== 2 || !morceaux.every((x) => TYPES_INFO.some((t) => l.m[t] === x)))
        p.push(`leurre « ${w} » : ce ne sont pas des informations du message`);
    }
    return p;
  },
};

/** « La sortie au musée : mardi, 9 h, devant le portail, avec une gourde. » */
const resumer = (e: string, j: string, h: string, l: string, o: string | null) =>
  `${e} : ${j}, ${h}, ${l}${o ? `, avec ${o}` : ""}.`;
const autre = (t: TypeInfo, v: string) => hasard(VALEURS[t].filter((x) => x !== v));

const briqueResume: Brique = {
  generer: () => {
    const m = tirerMessage();
    const P = hasard(T.PRENOMS);
    const fautes = melange([
      resumer(m.evenement, autre("jour", m.jour), m.heure, m.lieu, m.objet),
      resumer(m.evenement, m.jour, autre("heure", m.heure), m.lieu, m.objet),
      resumer(m.evenement, m.jour, m.heure, autre("lieu", m.lieu), m.objet),
      resumer(m.evenement, m.jour, m.heure, m.lieu, hasard(objetsDe(m).filter((x) => x !== m.objet))),
      resumer(m.evenement, m.jour, m.heure, m.lieu, null),
    ]).slice(0, 3);
    return {
      text: dire(m) + " " + remplir(hasard(TOURS_RESUME), { P }),
      correct: resumer(m.evenement, m.jour, m.heure, m.lieu, m.objet),
      wrongs: fautes,
      methode: "Vérifie une à une les quatre informations : le jour, l'heure, le lieu et ce qu'il faut apporter.",
    };
  },
  reconnait: (q) => {
    const l = lireMessage(q.text);
    return !!l && TOURS_RESUME.some((t) => !!lire(t, l.suite, []));
  },
  corriger: (q) => {
    const p = relire(q);
    const l = lireMessage(q.text);
    if (!l || !TOURS_RESUME.some((t) => !!lire(t, l.suite, []))) return [...p, "message ou question illisible"];
    // Un résumé est juste si, pour chacune des quatre informations, il donne
    // la valeur du message et aucune autre.
    const juste = (s: string) =>
      s.startsWith(l.m.evenement + " : ") && TYPES_INFO.every((t) => {
        const vu = valeursDans(s, t);
        return vu.length === 1 && vu[0] === l.m[t];
      });
    if (!juste(q.correct)) p.push("la bonne réponse ne redit pas exactement le message");
    for (const w of q.wrongs) if (juste(w)) p.push(`leurre « ${w} » : il redit lui aussi tout le message`);
    return p;
  },
};

/** Le premier texte entre « … » (sans imbrication). */
function citee(texte: string): string | null {
  const m = /« (.+?) »/.exec(texte);
  return m ? m[1] : null;
}
const parceQue = (x: string) => "parce " + que(x);

// ── REFORMULER une consigne entendue ──────────────────────────────────────

const TOURS_REFORMULER = [
  "{P} redit la consigne avec ses mots. Quelle phrase est juste ?",
  "{P} doit reformuler cette consigne pour {Q}. Quelle reformulation convient ?",
  "Quelle phrase {deP} reformule correctement cette consigne ?",
  "{P} veut vérifier qu'{il} a compris. Quelle reformulation est juste ?",
];
const consigneDe = (a: T.Action, b: T.Action) => `${a.imp} ${a.c}, puis ${b.imp.toLowerCase()} ${b.c}.`;
const reformuler = (a: T.Action, ca: string, b: T.Action, cb: string) => `Il faut d'abord ${a.inf} ${ca}, puis ${b.inf} ${cb}.`;
/** Toutes les fausses reformulations d'une consigne : ordre inversé, détail faux, moitié oubliée, mot pour mot. */
function faussesReformulations(a: T.Action, b: T.Action): string[] {
  return [
    reformuler(b, b.r, a, a.r),
    reformuler(a, a.alt, b, b.r),
    reformuler(a, a.r, b, b.alt),
    `Il faut seulement ${a.inf} ${a.r}.`,
    `Il faut seulement ${b.inf} ${b.r}.`,
    `« ${consigneDe(a, b)} »`,
  ];
}

const briqueReformuler: Brique = {
  generer: () => {
    const [a, b] = melange(T.ACTIONS).slice(0, 2);
    const [P, Q] = deuxPrenoms();
    return {
      text: `${hasard(T.DONNEURS)} : « ${consigneDe(a, b)} » ${remplir(hasard(TOURS_REFORMULER), { P, Q })}`,
      correct: reformuler(a, a.r, b, b.r),
      wrongs: melange(faussesReformulations(a, b)).slice(0, 3),
      methode: "Vérifie que la reformulation garde les deux actions, dans le même ordre, avec les mêmes détails, mais avec d'autres mots.",
    };
  },
  reconnait: (q) => T.DONNEURS.some((d) => q.text.startsWith(d + " : « ")),
  corriger: (q) => {
    const p = relire(q);
    const c = citee(q.text);
    const d = T.DONNEURS.find((x) => q.text.startsWith(x + " : « "));
    const suite = c ? q.text.slice(`${d} : « ${c} » `.length) : "";
    if (!c || !TOURS_REFORMULER.some((t) => lire(t, suite, []))) return [...p, "consigne ou question illisible"];
    const [x, y] = c.replace(/\.$/, "").split(", puis ");
    const a = T.ACTIONS.find((u) => `${u.imp} ${u.c}` === x);
    const b = T.ACTIONS.find((u) => `${u.imp.toLowerCase()} ${u.c}` === y);
    if (!a || !b) return [...p, "une action de la consigne est absente de la table"];
    if (a === b) p.push("la consigne répète deux fois la même action");
    if (q.correct !== reformuler(a, a.r, b, b.r)) p.push("la bonne réponse ne redit pas la consigne dans l'ordre et avec ses détails");
    const fausses = faussesReformulations(a, b);
    for (const w of q.wrongs) {
      if (w === q.correct) p.push(`leurre « ${w} » : c'est la bonne reformulation`);
      if (!fausses.includes(w)) p.push(`leurre « ${w} » : ni ordre inversé, ni détail faux, ni moitié oubliée`);
    }
    for (const u of T.ACTIONS) if (u.alt === u.r) p.push(`table : le détail faux de « ${u.inf} » est le vrai`);
    return p;
  },
};

// ── Le GENRE de discours entendu ──────────────────────────────────────────

const TOURS_GENRE = [
  "{P} entend : « {extrait} » De quel genre de discours s'agit-il ?",
  "{P} écoute ce passage : « {extrait} » Qu'est-ce {queP} est en train d'écouter ?",
  "{P} entend : « {extrait} » Quel genre de discours reconnaît-{il} ?",
  "{P} écoute ce passage : « {extrait} » À quel genre appartient-il ?",
];

function extrait(g: T.Genre, Q: Prenom): string {
  const [i1, i2] = melange(T.INGREDIENTS);
  const itw = hasard(T.ITW);
  const vals: Record<string, string> = {
    perso: hasard(T.PERSOS_CONTE),
    lieuConte: hasard(T.LIEUX_CONTE),
    ingr: i1,
    ingr2: i2,
    duree: hasard(T.DUREES),
    ciel: hasard(T.CIELS),
    region: hasard(T.REGIONS),
    degres: hasard(T.DEGRES),
    Q: Q.p,
    queAvis: que(hasard(T.AVIS_DEBAT)),
    itwQ: itw[0],
    itwR: itw[1],
    Produit: maj(hasard(T.PRODUITS)),
    slogan: hasard(T.SLOGANS),
    deVille: de(hasard(T.VILLES)),
    voie: String(1 + Math.floor(Math.random() * 12)),
    sujet: hasard(T.SUJETS),
  };
  return hasard(g.gabarits).replace(/\{(\w+)\}/g, (_, k: string) => {
    if (!(k in vals)) throw new Error(`gabarit de genre inconnu {${k}}`);
    return vals[k];
  });
}

const briqueGenre: Brique = {
  generer: () => {
    const g = hasard(T.GENRES);
    const [P, Q] = deuxPrenoms();
    const tour = hasard(TOURS_GENRE);
    return {
      text: remplir(tour.replace("{extrait}", extrait(g, Q)), { P, Q }),
      correct: g.nom,
      wrongs: melange(T.GENRES.filter((x) => x !== g)).slice(0, 3).map((x) => x.nom),
      methode: "Cherche l'indice qui trahit le genre : la formule du début, des ordres, une date et un lieu, une question de journaliste…",
    };
  },
  reconnait: (q) => /^\S+ (entend|écoute ce passage) : « /.test(q.text),
  corriger: (q) => {
    const p = relire(q);
    const c = citee(q.text);
    if (!c) return [...p, "extrait introuvable"];
    // Le texte autour de l'extrait doit être une tournure connue.
    const v = TOURS_GENRE.map((t) => lire(t.replace("{extrait}", c.replace(/[{}]/g, "")), q.text, [])).find((x) => x);
    if (!v) p.push("tournure inconnue");
    // L'extrait doit porter l'indice d'UN seul genre : c'est la réponse.
    const signes = T.GENRES.filter((g) => g.indice.test(c));
    if (signes.length !== 1) return [...p, `l'extrait porte les indices de ${signes.length} genres`];
    if (q.correct !== signes[0].nom) p.push(`la bonne réponse devrait être « ${signes[0].nom} »`);
    for (const w of q.wrongs) {
      const g = T.GENRES.find((x) => x.nom === w);
      if (!g) p.push(`leurre « ${w} » : genre absent de la table`);
      else if (g.indice.test(c)) p.push(`leurre « ${w} » : l'extrait en porte aussi l'indice`);
    }
    return p;
  },
};

// ── Le RESSENTI exprimé et justifié ───────────────────────────────────────

const TOURS_RESSENTI = [
  "Quelle phrase exprime un ressenti et le justifie ?",
  "Quelle phrase {deP} dit ce qu'{il} a ressenti, et pourquoi ?",
  "{P} doit dire à la classe ce qu'{il} a ressenti, et pourquoi. Quelle phrase convient ?",
  "Quelle réponse donne un ressenti justifié par le passage ?",
];
const TOUS_SENTIMENTS = Object.values(T.SENTIMENTS).flat();

const briqueRessenti: Brique = {
  generer: () => {
    const pa = hasard(T.PASSAGES);
    const P = hasard(T.PRENOMS);
    const s = hasard(T.SENTIMENTS[pa.e]);
    return {
      text: `${P.p} écoute ${hasard(T.TEXTES_ECOUTES)}. Dans ce passage, ${pa.txt}. ${remplir(hasard(TOURS_RESSENTI), { P })}`,
      correct: `${s}, ${parceQue(pa.txt)}.`,
      wrongs: melange([`${maj(pa.txt)}.`, `${s}.`, hasard(T.HORS_TEXTE)]),
      methode: "Un ressenti justifié dit ce qu'on a éprouvé (« J'ai eu peur… ») ET ce qui, dans le texte, l'a provoqué (« parce que… »).",
    };
  },
  reconnait: (q) => /^\S+ écoute .+\. Dans ce passage, .+?\. /.test(q.text),
  corriger: (q) => {
    const p = relire(q);
    const m = /^(\S+) écoute (.+?)\. Dans ce passage, (.+?)\. (.+)$/.exec(q.text);
    const pa = m && T.PASSAGES.find((x) => x.txt === m[3]);
    if (!m || !pa) return [...p, "passage absent de la table"];
    if (!T.TEXTES_ECOUTES.includes(m[2])) p.push("texte écouté absent de la table");
    if (!TOURS_RESSENTI.some((t) => lire(t, m[4], []))) p.push("tournure inconnue");
    const justifie = (s: string) => TOUS_SENTIMENTS.some((x) => s === `${x}, ${parceQue(pa.txt)}.`);
    if (!T.SENTIMENTS[pa.e].some((x) => q.correct === `${x}, ${parceQue(pa.txt)}.`))
      p.push("la bonne réponse n'exprime pas un sentiment accordé au passage, justifié par lui");
    for (const w of q.wrongs) {
      if (justifie(w)) p.push(`leurre « ${w} » : c'est aussi un ressenti justifié par le passage`);
      const resume = w === `${maj(pa.txt)}.`;
      const seul = TOUS_SENTIMENTS.some((x) => w === `${x}.`);
      if (!resume && !seul && !T.HORS_TEXTE.includes(w)) p.push(`leurre « ${w} » : forme inconnue`);
    }
    return p;
  },
};

// ── Le TON qu'indique une didascalie ──────────────────────────────────────

const TOURS_TON = [
  "Comment {P} doit-{il} dire cette réplique ?",
  "Quel ton {P} doit-{il} prendre ?",
  "Comment faut-il jouer cette réplique ?",
];
const briqueTon: Brique = {
  generer: () => {
    const t = hasard(T.TONS);
    const P = hasard(T.PRENOMS);
    const autres = T.TONS.filter((x) => x !== t && !quasi(x.ton, t.ton));
    return {
      text: `${P.p} joue une scène. Sa réplique commence par une didascalie : « (${t.did}) ${hasard(T.REPLIQUES)} » ${remplir(hasard(TOURS_TON), { P })}`,
      correct: t.ton,
      wrongs: melange(autres).slice(0, 3).map((x) => x.ton),
      methode: "La didascalie, entre parenthèses, n'est pas dite : elle indique au comédien comment jouer.",
    };
  },
  reconnait: (q) => /^\S+ joue une scène\. Sa réplique commence par une didascalie : /.test(q.text),
  corriger: (q) => {
    const p = relire(q);
    const m = /^(\S+) joue une scène\. Sa réplique commence par une didascalie : « \((.+?)\) (.+?) » (.+)$/.exec(q.text);
    const t = m && T.TONS.find((x) => x.did === m[2]);
    if (!m || !t) return [...p, "didascalie absente de la table"];
    if (!T.REPLIQUES.includes(m[3])) p.push("réplique absente de la table");
    if (!TOURS_TON.some((x) => lire(x, m[4], []))) p.push("tournure inconnue");
    if (q.correct !== t.ton) p.push(`la didascalie « ${t.did} » demande : ${t.ton}`);
    for (const w of q.wrongs) {
      const o = T.TONS.find((x) => x.ton === w);
      if (!o) p.push(`leurre « ${w} » : ton absent de la table`);
      else if (o === t || quasi(o.ton, t.ton)) p.push(`leurre « ${w} » : trop proche du ton demandé`);
    }
    return p;
  },
};

// ── Expliquer une DÉMARCHE, dans l'ordre ──────────────────────────────────

const TOURS_DEMARCHE = [
  "Quelle explication est claire et dans le bon ordre ?",
  "Quelle explication permet de refaire la démarche sans se tromper ?",
  "Quelle explication suit le bon ordre ?",
];
const expliquer = (e: readonly string[]) =>
  e.length === 3 ? `D'abord, ${e[0]}. Ensuite, ${e[1]}. Enfin, ${e[2]}.` : `D'abord, ${e[0]}. Enfin, ${e[1]}.`;

const briqueDemarche: Brique = {
  generer: () => {
    const d = hasard(T.DEMARCHES);
    const P = hasard(T.PRENOMS);
    const [a, b, c] = d.etapes;
    return {
      text: `${P.p} explique à la classe, sans notes, comment ${d.nom}. ${hasard(TOURS_DEMARCHE)}`,
      correct: expliquer([a, b, c]),
      wrongs: melange([expliquer([b, a, c]), expliquer([a, c, b]), expliquer([c, b, a]), expliquer([b, c, a]), expliquer([a, c])]).slice(0, 3),
      methode: "Refais la démarche dans ta tête : chaque étape doit être possible au moment où on la dit.",
    };
  },
  reconnait: (q) => /^\S+ explique à la classe, sans notes, comment /.test(q.text),
  corriger: (q) => {
    const p = relire(q);
    const m = /^(\S+) explique à la classe, sans notes, comment (.+?)\. (.+)$/.exec(q.text);
    const d = m && T.DEMARCHES.find((x) => x.nom === m[2]);
    if (!m || !d) return [...p, "démarche absente de la table"];
    if (!TOURS_DEMARCHE.includes(m[3])) p.push("tournure inconnue");
    // On relit les étapes dans la réponse, connecteur par connecteur.
    const etapesDe = (s: string) => {
      const r = /^D'abord, (.+?)\. Ensuite, (.+?)\. Enfin, (.+?)\.$/.exec(s);
      return r ? [r[1], r[2], r[3]] : null;
    };
    const ok = (s: string) => {
      const e = etapesDe(s);
      return !!e && e.every((x, i) => x === d.etapes[i]);
    };
    if (!ok(q.correct)) p.push("la bonne réponse ne donne pas les trois étapes dans l'ordre");
    for (const w of q.wrongs) {
      if (ok(w)) p.push(`leurre « ${w} » : il est dans le bon ordre`);
      const r2 = /^D'abord, (.+?)\. Enfin, (.+?)\.$/.exec(w);
      const morceaux = etapesDe(w) ?? (r2 ? [r2[1], r2[2]] : null);
      if (!morceaux || !morceaux.every((x) => d.etapes.includes(x))) p.push(`leurre « ${w} » : étapes absentes de la démarche`);
    }
    return p;
  },
};

// ── Les DÉBATS : défendre, ajuster, tenir compte, répondre sans répéter ───

type Camp = T.Debat["pour"];
const camps = (d: T.Debat): [Camp, Camp] => (Math.random() < 0.5 ? [d.pour, d.contre] : [d.contre, d.pour]);
const debatDe = (q: string) => T.DEBATS.find((d) => d.q === q);
const campDe = (d: T.Debat, avisOuArg: string): Camp | null =>
  [d.pour, d.contre].find((c) => c.avis === avisOuArg || c.args.includes(avisOuArg)) ?? null;
const tousArgs = (d: T.Debat) => [...d.pour.args, ...d.contre.args];
/** Les arguments de tous les débats présents dans une phrase. */
const argsDans = (s: string) => T.DEBATS.flatMap((d) => tousArgs(d)).filter((a) => s.includes(a));
const OUVERTURE = (q: string) => `Débat en classe : « ${q} »`;
const RE_DEBAT = /^Débat en classe : « (.+?) » (.+)$/;

// Défendre son avis.
const TOURS_DEFENDRE = [
  "{P} pense {queAvis}. Quelle phrase défend cet avis avec un argument ?",
  "{P} pense {queAvis}. Que peut dire {P} pour défendre cet avis ?",
  "{P} pense {queAvis}. Quelle phrase donne cet avis ET une raison ?",
];
const defendre = (avis: string, arg: string) => `Je pense ${que(avis)}, ${parceQue(arg)}.`;

const briqueDefendre: Brique = {
  generer: () => {
    const d = hasard(T.DEBATS);
    const [moi, eux] = camps(d);
    const P = hasard(T.PRENOMS);
    return {
      text: `${OUVERTURE(d.q)} ${remplir(hasard(TOURS_DEFENDRE).replace("{queAvis}", que(moi.avis)), { P })}`,
      correct: defendre(moi.avis, hasard(moi.args)),
      wrongs: melange([
        `Je pense ${que(moi.avis)}, c'est tout.`,
        defendre(moi.avis, hasard(eux.args)),
        defendre(eux.avis, hasard(eux.args)),
        hasard(T.ATTAQUES),
      ]).slice(0, 3),
      methode: "Un avis défendu = l'avis + « parce que » + une raison qui va DANS LE SENS de cet avis.",
    };
  },
  reconnait: (q) => {
    const m = RE_DEBAT.exec(q.text);
    return !!m && / pense (que |qu')/.test(m[2]) && /défend|donne cet avis/.test(m[2]);
  },
  corriger: (q) => {
    const p = relire(q);
    const m = RE_DEBAT.exec(q.text);
    const d = m && debatDe(m[1]);
    if (!m || !d) return [...p, "débat absent de la table"];
    const avis = /pense (?:que |qu')(.+?)\. /.exec(m[2]);
    const moi = avis && [d.pour, d.contre].find((c) => que(c.avis) === avis[0].slice(6, -2));
    if (!moi) return [...p, "avis absent de la table"];
    if (!TOURS_DEFENDRE.some((t) => lire(t.replace("{queAvis}", que(moi.avis)), m[2], []))) p.push("tournure inconnue");
    const ok = (s: string) => moi.args.some((a) => s === defendre(moi.avis, a));
    if (!ok(q.correct)) p.push("la bonne réponse ne défend pas cet avis par un de SES arguments");
    const eux = moi === d.pour ? d.contre : d.pour;
    // Un leurre = sans raison, raison du camp d'en face, avis d'en face, ou attaque.
    const fausses = [
      `Je pense ${que(moi.avis)}, c'est tout.`,
      ...eux.args.map((a) => defendre(moi.avis, a)),
      ...eux.args.map((a) => defendre(eux.avis, a)),
      ...T.ATTAQUES,
    ];
    for (const w of q.wrongs) {
      if (ok(w)) p.push(`leurre « ${w} » : il défend aussi cet avis`);
      else if (!fausses.includes(w)) p.push(`leurre « ${w} » : forme inconnue`);
    }
    return p;
  },
};

// Ajuster son avis après une bonne objection.
const ajuster = (avis: string, arg: string) => `Tu as raison sur ce point, mais je pense quand même ${que(avis)}, ${parceQue(arg)}.`;
const briqueAjuster: Brique = {
  generer: () => {
    const d = hasard(T.DEBATS);
    const [moi, eux] = camps(d);
    const [P, Q] = deuxPrenoms();
    return {
      text: `${OUVERTURE(d.q)} ${P.p} pense ${que(moi.avis)}. ${Q.p} répond : « ${maj(hasard(eux.args))}. » ${P.p} trouve cette remarque juste. Que peut dire ${P.p} pour ajuster son avis ?`,
      correct: ajuster(moi.avis, hasard(moi.args)),
      wrongs: melange([
        hasard(T.ATTAQUES),
        defendre(moi.avis, hasard(moi.args)),
        "Bon, alors je ne dis plus rien.",
        `Je répète : je pense ${que(moi.avis)}.`,
      ]).slice(0, 3),
      methode: "Ajuster son avis, c'est reconnaître ce qui est juste chez l'autre, puis redire son idée avec une raison.",
    };
  },
  reconnait: (q) => RE_DEBAT.test(q.text) && q.text.endsWith("pour ajuster son avis ?"),
  corriger: (q) => {
    const p = relire(q);
    const m = /^Débat en classe : « (.+?) » (\S+) pense (?:que |qu')(.+?)\. (\S+) répond : « (.+?)\. » \2 trouve cette remarque juste\. Que peut dire \2 pour ajuster son avis \?$/.exec(q.text);
    const d = m && debatDe(m[1]);
    if (!m || !d) return [...p, "débat ou phrase illisible"];
    const moi = campDe(d, m[3]);
    const objection = m[5].charAt(0).toLowerCase() + m[5].slice(1);
    const eux = campDe(d, objection);
    if (!moi || !eux || moi === eux) return [...p, "l'objection ne vient pas du camp opposé"];
    if (moi.avis !== m[3]) p.push("avis absent de la table");
    const ok = (s: string) => moi.args.some((a) => s === ajuster(moi.avis, a));
    if (!ok(q.correct)) p.push("la bonne réponse ne reconnaît pas l'objection avant de redire l'avis avec une raison");
    const fausses = [
      ...T.ATTAQUES,
      ...moi.args.map((a) => defendre(moi.avis, a)),
      "Bon, alors je ne dis plus rien.",
      `Je répète : je pense ${que(moi.avis)}.`,
    ];
    for (const w of q.wrongs) {
      if (ok(w)) p.push(`leurre « ${w} » : il ajuste aussi l'avis`);
      if (/^Tu as raison/.test(w)) p.push(`leurre « ${w} » : il reconnaît l'objection`);
      if (!fausses.includes(w)) p.push(`leurre « ${w} » : forme inconnue`);
    }
    return p;
  },
};

// Tenir compte de ce qui vient d'être dit.
const TOURS_INTERAGIR = [
  "{Q} vient de dire : « {Arg}. » Quelle réponse {deP} tient compte de cette remarque ?",
  "{Q} vient de dire : « {Arg}. » {P} veut répondre en tenant compte de cette remarque. Quelle réponse convient ?",
  "{Q} vient de dire : « {Arg}. » Quelle réponse {deP} prouve qu'{il} a écouté ?",
];
const repDesaccord = (argQ: string, contre: string) => `Tu dis ${que(argQ)}, mais ${contre}.`;
const repAccord = (Q: string, argQ: string, plus: string) => `Comme ${Q}, je pense ${que(argQ)}, et en plus ${plus}.`;

const briqueInteragir: Brique = {
  generer: () => {
    const d = hasard(T.DEBATS);
    const [eux, autres] = camps(d);
    const [argQ, arg2] = melange(eux.args);
    const [P, Q] = deuxPrenoms();
    const ailleurs = hasard(T.DEBATS.filter((x) => x !== d));
    const tour = hasard(TOURS_INTERAGIR).replace("{Arg}", maj(argQ));
    return {
      text: `${OUVERTURE(d.q)} ${remplir(tour, { P, Q })}`,
      correct: Math.random() < 0.5 ? repDesaccord(argQ, hasard(autres.args)) : repAccord(Q.p, argQ, arg2),
      wrongs: melange([
        `Moi, je veux parler d'autre chose : ${hasard(tousArgs(ailleurs))}.`,
        `Je n'ai pas écouté, mais je pense ${que(hasard([d.pour, d.contre]).avis)}.`,
        hasard(T.ATTAQUES),
      ]),
      methode: "Tenir compte de ce qui vient d'être dit, c'est le reprendre (« Tu dis que… », « Comme… ») puis ajouter SA réponse.",
    };
  },
  reconnait: (q) => RE_DEBAT.test(q.text) && / vient de dire : « /.test(q.text),
  corriger: (q) => {
    const p = relire(q);
    const m = RE_DEBAT.exec(q.text);
    const d = m && debatDe(m[1]);
    const c = m && /vient de dire : « (.+?)\. »/.exec(m[2]);
    if (!m || !d || !c) return [...p, "débat ou remarque illisible"];
    const argQ = c[1].charAt(0).toLowerCase() + c[1].slice(1);
    const eux = campDe(d, argQ);
    if (!eux || !eux.args.includes(argQ)) return [...p, "remarque absente de la table"];
    const autres = eux === d.pour ? d.contre : d.pour;
    const v = TOURS_INTERAGIR.map((t) => lire(t.replace("{Arg}", c[1]), m[2], [])).find((x) => x);
    if (!v || !v.Q) return [...p, "tournure inconnue"];
    const Q = v.Q.p;
    const ok = (s: string) =>
      autres.args.some((a) => s === repDesaccord(argQ, a)) || eux.args.some((a) => a !== argQ && s === repAccord(Q, argQ, a));
    if (!ok(q.correct)) p.push("la bonne réponse ne reprend pas la remarque avant d'y répondre");
    for (const w of q.wrongs) {
      if (ok(w) || w.includes(argQ)) p.push(`leurre « ${w} » : il tient compte de la remarque`);
      if (argsDans(w).some((a) => tousArgs(d).includes(a)) && !w.startsWith("Je n'ai pas écouté"))
        p.push(`leurre « ${w} » : il répond sur le sujet du débat`);
    }
    return p;
  },
};

// Répondre sans répéter.
const TOURS_SANS_REPETER = [
  "{Q} affirme : « {Arg}. » {P} veut répondre sans répéter cette phrase. Quelle réponse convient ?",
  "{Q} affirme : « {Arg}. » Quelle réponse {deP} fait avancer le débat, sans répéter ?",
];
const repAjout = (plus: string) => `D'accord, et j'ajoute ${que(plus)}.`;
const repContre = (contre: string) => `Je ne suis pas d'accord : ${contre}.`;

const briqueSansRepeter: Brique = {
  generer: () => {
    const d = hasard(T.DEBATS);
    const [eux, autres] = camps(d);
    const [argQ, arg2] = melange(eux.args);
    const [P, Q] = deuxPrenoms();
    const ailleurs = hasard(T.DEBATS.filter((x) => x !== d));
    return {
      text: `${OUVERTURE(d.q)} ${remplir(hasard(TOURS_SANS_REPETER).replace("{Arg}", maj(argQ)), { P, Q })}`,
      correct: Math.random() < 0.5 ? repAjout(arg2) : repContre(hasard(autres.args)),
      wrongs: melange([
        `Oui, ${argQ}.`,
        `Moi aussi, je pense ${que(argQ)}.`,
        `Moi, je veux parler d'autre chose : ${hasard(tousArgs(ailleurs))}.`,
        hasard(T.ATTAQUES),
      ]).slice(0, 3),
      methode: "Répondre sans répéter, c'est apporter une idée NOUVELLE : un autre argument, ou une objection.",
    };
  },
  reconnait: (q) => RE_DEBAT.test(q.text) && / affirme : « /.test(q.text),
  corriger: (q) => {
    const p = relire(q);
    const m = RE_DEBAT.exec(q.text);
    const d = m && debatDe(m[1]);
    const c = m && /affirme : « (.+?)\. »/.exec(m[2]);
    if (!m || !d || !c) return [...p, "débat ou remarque illisible"];
    const argQ = c[1].charAt(0).toLowerCase() + c[1].slice(1);
    const eux = campDe(d, argQ);
    if (!eux || !eux.args.includes(argQ)) return [...p, "remarque absente de la table"];
    if (!TOURS_SANS_REPETER.some((t) => lire(t.replace("{Arg}", c[1]), m[2], []))) p.push("tournure inconnue");
    const autres = eux === d.pour ? d.contre : d.pour;
    // Juste = une idée NOUVELLE du débat, dans le bon sens, sans reprendre la phrase entendue.
    const ok = (s: string) =>
      !s.includes(argQ) &&
      (eux.args.some((a) => a !== argQ && s === repAjout(a)) || autres.args.some((a) => s === repContre(a)));
    if (!ok(q.correct)) p.push("la bonne réponse n'apporte pas une idée nouvelle du débat");
    for (const w of q.wrongs) {
      if (ok(w)) p.push(`leurre « ${w} » : il apporte aussi une idée nouvelle`);
      const nouvelles = argsDans(w).filter((a) => a !== argQ && tousArgs(d).includes(a));
      if (nouvelles.length) p.push(`leurre « ${w} » : il contient un argument nouveau du débat`);
    }
    return p;
  },
};

// ── Les générateurs ───────────────────────────────────────────────────────

export const GENERATEURS: GenerateursFrancais = {
  "6e_oral_presenter": depuisBloc(T.PRESENTER),
  "6e_oral_codes": depuisBloc(T.CODES),
  "6e_oral_reflexif": depuisBloc(T.REFLEXIF),
  "6e_oral_jouer": melangeBriques([
    [briqueBloc(T.JOUER), 1],
    [briqueTon, 1],
  ]),
  "6e_oral_dire_defi": melangeBriques([
    [briqueDemarche, 2],
    [briqueBloc(T.PRESENTER), 1],
    [briqueBloc(T.REFLEXIF), 1],
  ]),
  "6e_oral_reformuler": melangeBriques([[briqueReformuler, 1]]),
  "6e_oral_genres_discours": melangeBriques([[briqueGenre, 1]]),
  "6e_oral_ressenti": melangeBriques([[briqueRessenti, 1]]),
  "6e_oral_argumenter": melangeBriques([
    [briqueDefendre, 1],
    [briqueAjuster, 1],
  ]),
  "6e_oral_interagir": melangeBriques([[briqueInteragir, 1]]),
  // Pas la brique « interagir » ici : sa bonne réponse « Comme X, je pense que… »
  // reprend la phrase entendue, ce que ce défi interdit justement.
  "6e_oral_echanger_defi": melangeBriques([
    [briqueSansRepeter, 3],
    [briqueAjuster, 1],
  ]),
  "6e_oral_ecouter": melangeBriques([
    [briqueBloc(T.ECOUTER), 1],
    [briqueMessageUn, 1],
  ]),
  "6e_oral_ecouter_defi": melangeBriques([
    [briqueResume, 3],
    [briqueMessageDeux, 2],
  ]),
  "6e_oral_regard_critique": depuisBloc(T.CRITIQUE),
};
