import type { GenerateursFrancais, QuestionFrancais } from "./types";
import * as T from "./culture-tables";
import type { Relation, Livre } from "./culture-tables";

// LA FAMILLE « CULTURE » DU FRANÇAIS DE 6e : 17 générateurs à correcteur
// (05/10/2026, voir types.ts). Notions : culture_poesie_theatre,
// culture_recits, culture_reperes, lecture_oeuvres.
//
// Deux sortes de briques :
//   • les RELATIONS (culture-tables.ts) : des tables de faits sûrs, interrogées
//     dans les deux sens. Le correcteur relit la phrase, retrouve le fait
//     interrogé dans la table, et vérifie que la bonne réponse lui correspond
//     et qu'aucun leurre ne lui correspond aussi ;
//   • les briques CALCULÉES : un extrait de théâtre, des fins de vers, un récit
//     en cinq étapes, un passage qui montre un sentiment… Le correcteur refait
//     l'analyse sur le texte que lit l'élève (qui dit la deuxième réplique ?
//     quelles rimes ? quelle phrase commence par « Un jour, » ?).
// Une micro tire une brique au hasard ; son correcteur demande à la brique qui
// RECONNAÎT la question de la juger.

type Brique = {
  generer: () => QuestionFrancais;
  /** Vrai si la question a la forme de cette brique. */
  reconnait: (q: QuestionFrancais) => boolean;
  corriger: (q: QuestionFrancais) => string[];
};

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
const uniques = (t: readonly string[]) => [...new Set(t)];
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
// Sans le « h » : « de Hans Christian Andersen » (h aspiré). Aucune clé
// interrogée par « %de » ne commence par un h muet.
const VOYELLE = /^[aeiouyàâäéèêëîïôöûüœæ]/i;

function deForme(x: string): string {
  if (/^le /.test(x)) return "du " + x.slice(3);
  if (/^les /.test(x)) return "des " + x.slice(4);
  if (VOYELLE.test(x)) return "d'" + x;
  return "de " + x;
}
/** « qu'il », « qu'elle », « que Léa »… */
const que = (x: string) => (VOYELLE.test(x) ? "qu'" + x : "que " + x);
/** « parce que le… », « parce qu'on… », « parce qu'Ulysse… ». */
const parceQue = (x: string) => "parce " + que(x);

type Prenom = { p: string; f: boolean };
const il = (n: Prenom) => (n.f ? "elle" : "il");
function prenoms(n: number): Prenom[] {
  return melange(T.PRENOMS).slice(0, n);
}

/** « du « Petit Poucet » », « des « Fourberies de Scapin » », « de « La Belle et la Bête » ». */
function deTitre(t: string): string {
  if (t.startsWith("Le ")) return `du « ${maj(t.slice(3))} »`;
  if (t.startsWith("Les ")) return `des « ${maj(t.slice(4))} »`;
  return `de « ${t} »`;
}
/** L'article non contracté devant un titre : « de « Le … », « à « Les … ». */
const RE_NON_CONTRACTE = /\b(de|à) « (Le|Les) /;

function remplir(tpl: string, x: string): string {
  return tpl.replace("%dt", deTitre(x)).replace("%de", deForme(x)).replace("%S", maj(x)).replace("%s", x);
}
const echap = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Relit une tournure : rend les clés candidates (vérifiées ensuite par aller-retour). */
function lire(tpl: string, texte: string): string[] {
  const i = tpl.search(/%dt|%de|%S|%s/);
  if (i < 0) return [];
  const tok = tpl.startsWith("%de", i) ? "%de" : tpl.slice(i, i + (tpl.startsWith("%dt", i) ? 3 : 2));
  const avant = echap(tpl.slice(0, i));
  const apres = echap(tpl.slice(i + tok.length));
  if (tok === "%dt") {
    const m = new RegExp(`^${avant}(du|des|de) « (.+) »${apres}$`).exec(texte);
    if (!m) return [];
    if (m[1] === "du") return ["Le " + m[2]];
    if (m[1] === "des") return ["Les " + m[2]];
    return [m[2]];
  }
  if (tok === "%de") {
    const m = new RegExp(`^${avant}(du |des |d'|de )(.+)${apres}$`).exec(texte);
    if (!m) return [];
    if (m[1] === "du ") return ["le " + m[2]];
    if (m[1] === "des ") return ["les " + m[2]];
    return [m[2]];
  }
  const m = new RegExp(`^${avant}(.+)${apres}$`).exec(texte);
  if (!m) return [];
  return uniques([m[1], m[1].charAt(0).toLowerCase() + m[1].slice(1)]);
}

/** Le texte cité entre le premier « et le dernier » qui le ferme. */
function citation(texte: string): string | null {
  const m = /« (.+) »/.exec(texte);
  return m ? m[1] : null;
}

// ── Les relations ────────────────────────────────────────────────────────

const valeursDe = (R: Relation, cle: string) => new Set(R.faits.filter((f) => f[0] === cle).map((f) => f[1]));
const clesDe = (R: Relation, val: string) => new Set(R.faits.filter((f) => f[1] === val).map((f) => f[0]));
/** Vrai si [cle, valeur] est dans la table OU trop proche pour servir de leurre. */
const presqueVrai = (R: Relation, cle: string, val: string) =>
  [...R.faits, ...(R.proches ?? [])].some((f) => f[0] === cle && f[1] === val);

function questionRelation(R: Relation): QuestionFrancais {
  const sens = R.versCle.length && Math.random() < 0.5 ? "cle" : "valeur";
  for (let essai = 0; essai < 50; essai++) {
    const f = hasard(R.faits);
    if (sens === "valeur") {
      const leurres = uniques(R.faits.map((g) => g[1])).filter((v) => !presqueVrai(R, f[0], v));
      if (leurres.length < 2) continue;
      return { text: remplir(hasard(R.versValeur), f[0]), correct: f[1], wrongs: melange(leurres).slice(0, 3), methode: R.methodeValeur };
    }
    const leurres = uniques(R.faits.map((g) => g[0])).filter((k) => !presqueVrai(R, k, f[1]));
    if (leurres.length < 2) continue;
    return { text: remplir(hasard(R.versCle), f[1]), correct: f[0], wrongs: melange(leurres).slice(0, 3), methode: R.methodeCle };
  }
  throw new Error(`relation « ${R.nom} » : pas assez de leurres`);
}

/** Toutes les lectures possibles de la question dans cette relation, chacune avec ses problèmes. */
function lectures(q: QuestionFrancais, R: Relation): string[][] {
  const res: string[][] = [];
  const sens: [readonly string[], "valeur" | "cle"][] = [[R.versValeur, "valeur"], [R.versCle, "cle"]];
  for (const [tpls, s] of sens) {
    for (const tpl of tpls) {
      for (const c of lire(tpl, q.text)) {
        if (remplir(tpl, c) !== q.text) continue;
        const p: string[] = [];
        const justes = s === "valeur" ? valeursDe(R, c) : clesDe(R, c);
        const permis = new Set(R.faits.map((f) => (s === "valeur" ? f[1] : f[0])));
        if (!justes.size) {
          p.push(`« ${c} » n'est pas dans la table « ${R.nom} »`);
        } else {
          if (!justes.has(q.correct)) p.push(`la bonne réponse « ${q.correct} » ne correspond pas à « ${c} » dans la table`);
          for (const w of q.wrongs) {
            if (justes.has(w)) p.push(`le leurre « ${w} » est AUSSI une bonne réponse`);
            else if (s === "valeur" ? presqueVrai(R, c, w) : presqueVrai(R, w, c))
              p.push(`le leurre « ${w} » est AUSSI presque juste (paire proche)`);
            if (!permis.has(w)) p.push(`le leurre « ${w} » n'est pas pris dans la table`);
          }
        }
        res.push(p);
      }
    }
  }
  return res;
}

function briqueRelation(R: Relation): Brique {
  return {
    generer: () => questionRelation(R),
    reconnait: (q) => lectures(q, R).length > 0,
    corriger: (q) => {
      const ls = lectures(q, R);
      if (!ls.length) return ["aucune tournure connue : le fait interrogé est introuvable"];
      const doubles = ls.flat().filter((p) => p.includes("AUSSI"));
      if (doubles.length) return doubles;
      return ls.find((p) => !p.length) ?? ls[0];
    },
  };
}

// ── Les couples (défis) : « Lequel de ces couples est juste / faux ? » ──────

const SEP = " — ";
const COUPLE_JUSTE = ["Lequel de ces couples est juste ?", "Une seule de ces associations est exacte. Laquelle ?", "Quelle association est correcte ?"];
const COUPLE_FAUX = ["Lequel de ces couples est faux ?", "Une seule de ces associations est fausse. Laquelle ?", "Quelle association contient une erreur ?"];

function briqueCouples(Rs: readonly Relation[]): Brique {
  const vrai = (a: string, b: string) => Rs.some((R) => R.faits.some((f) => f[0] === a && f[1] === b));
  const proche = (a: string, b: string) => Rs.some((R) => presqueVrai(R, a, b));
  const connu = (a: string, b: string) => Rs.some((R) => R.faits.some((f) => f[0] === a) && R.faits.some((f) => f[1] === b));
  const couper = (s: string): [string, string] | null => {
    const i = s.indexOf(SEP);
    return i < 0 ? null : [s.slice(0, i), s.slice(i + SEP.length)];
  };
  return {
    generer: () => {
      const R = hasard(Rs);
      const faux = Math.random() < 0.4;
      const fauxCouple = (): string => {
        for (;;) {
          const a = hasard(R.faits)[0];
          const b = hasard(R.faits)[1];
          if (!presqueVrai(R, a, b)) return a + SEP + b;
        }
      };
      const justes = melange(R.faits).map((f) => f[0] + SEP + f[1]);
      const cles = new Set<string>();
      const justesDistincts = justes.filter((c) => {
        const k = c.slice(0, c.indexOf(SEP));
        if (cles.has(k)) return false;
        cles.add(k);
        return true;
      });
      if (!faux) {
        const correct = justesDistincts[0];
        const wrongs = new Set<string>();
        while (wrongs.size < 3) wrongs.add(fauxCouple());
        return { text: hasard(COUPLE_JUSTE), correct, wrongs: [...wrongs], methode: "Vérifie chaque couple un par un : un seul tient debout." };
      }
      return {
        text: hasard(COUPLE_FAUX),
        correct: fauxCouple(),
        wrongs: justesDistincts.slice(0, 3),
        methode: "Vérifie chaque couple un par un : un seul est faux.",
      };
    },
    reconnait: (q) => COUPLE_JUSTE.includes(q.text) || COUPLE_FAUX.includes(q.text),
    corriger: (q) => {
      const p: string[] = [];
      const chercheJuste = COUPLE_JUSTE.includes(q.text);
      for (const [o, estBonne] of [[q.correct, true], ...q.wrongs.map((w) => [w, false] as const)] as const) {
        const c = couper(o);
        if (!c) {
          p.push(`« ${o} » n'est pas un couple`);
          continue;
        }
        if (!connu(c[0], c[1])) p.push(`« ${o} » n'est pas pris dans les tables`);
        const v = vrai(c[0], c[1]);
        if (estBonne && v !== chercheJuste) p.push(`la bonne réponse « ${o} » est ${v ? "vraie" : "fausse"} dans la table`);
        if (!estBonne && v === chercheJuste) p.push(`le leurre « ${o} » est AUSSI une bonne réponse`);
        // Un couple « faux » doit l'être franchement.
        if (!v && proche(c[0], c[1])) p.push(`« ${o} » n'est pas franchement faux (paire proche)`);
      }
      return p;
    },
  };
}

// ── Une micro = des briques pondérées ───────────────────────────────────────

function micro(briques: readonly (readonly [Brique, number])[]) {
  const total = briques.reduce((s, b) => s + b[1], 0);
  return {
    generer: (): QuestionFrancais => {
      let r = Math.random() * total;
      for (const [b, w] of briques) if ((r -= w) < 0) return b.generer();
      return briques[0][0].generer();
    },
    corriger: (q: QuestionFrancais): string[] => {
      // Règle commune : l'article se contracte devant un titre (« du « Petit Poucet » »).
      const nonContractes = [q.text, q.correct, ...q.wrongs].filter((s) => RE_NON_CONTRACTE.test(s));
      if (nonContractes.length) return nonContractes.map((s) => `article non contracté devant un titre : « ${s} »`);
      const qui = briques.map((b) => b[0]).filter((b) => b.reconnait(q));
      if (!qui.length) return ["la question n'a la forme d'aucune brique connue de cette micro"];
      const verdicts = qui.map((b) => b.corriger(q));
      return verdicts.find((v) => !v.length) ?? verdicts[0];
    },
  };
}

// ════════════════════════════════════════════════════════════════════════
// POÉSIE : procédés et rimes
// ════════════════════════════════════════════════════════════════════════

const PROCEDES = ["une comparaison", "une métaphore", "une personnification"] as const;
type Procede = (typeof PROCEDES)[number];

function phraseProcede(type: Procede | "aucun", s: (typeof T.POESIE_SUJETS)[number], img: string): string {
  if (type === "une comparaison") return hasard([`${maj(s.s)} est comme ${img}.`, `${maj(s.s)} ressemble à ${img}.`]);
  if (type === "une métaphore") return `${maj(s.s)} est ${img}.`;
  if (type === "une personnification") return `${maj(s.s)} ${hasard(T.VERBES_HUMAINS)} ${hasard(T.COMPLEMENTS_PERSO)}.`;
  return `On voit ${s.s} depuis la fenêtre.`;
}
/** Classe une phrase d'après ce qu'on y LIT : mot de comparaison, verbe humain, « est un… ». */
function classerProcede(phrase: string): Procede | null {
  if (/\bcomme\b|ressemble à/.test(phrase)) return "une comparaison";
  if (T.VERBES_HUMAINS.some((v) => phrase.includes(` ${v} `))) return "une personnification";
  if (/ est (un|une|des) /.test(phrase)) return "une métaphore";
  return null;
}

const PROC_Q1 = ["Lis ce vers : « X » Quel procédé reconnais-tu ?", "« X » Quelle image le poète utilise-t-il ici ?", "Dans le vers « X », quelle figure trouves-tu ?"];
const PROC_Q2 = ["Quelle phrase contient Y ?", "Laquelle de ces phrases est Y ?", "Dans quel vers trouve-t-on Y ?"];

const briqueProcedeNommer: Brique = {
  generer: () => {
    const type = hasard(PROCEDES);
    const s = hasard(T.POESIE_SUJETS);
    const phrase = phraseProcede(type, s, hasard(s.images));
    return {
      text: hasard(PROC_Q1).replace("X", phrase),
      correct: type,
      wrongs: PROCEDES.filter((p) => p !== type),
      methode: "« comme » signale une comparaison ; « est un… » sans « comme », une métaphore ; un geste humain, une personnification.",
    };
  },
  reconnait: (q) => PROC_Q1.some((t) => q.text.startsWith(t.slice(0, t.indexOf("X")))) && q.text.includes("«"),
  corriger: (q) => {
    const c = citation(q.text);
    if (!c) return ["aucun vers cité"];
    const vrai = classerProcede(c);
    if (!vrai) return [`le vers « ${c} » ne contient aucun procédé reconnaissable`];
    const p: string[] = [];
    if (q.correct !== vrai) p.push(`le vers contient ${vrai}, pas ${q.correct}`);
    for (const w of q.wrongs) {
      if (w === vrai) p.push(`le leurre « ${w} » est AUSSI la bonne réponse`);
      if (!(PROCEDES as readonly string[]).includes(w)) p.push(`le leurre « ${w} » n'est pas un procédé`);
    }
    return p;
  },
};

const briqueProcedeTrouver: Brique = {
  generer: () => {
    const type = hasard(PROCEDES);
    const sujets = melange(T.POESIE_SUJETS).slice(0, 4);
    const types: (Procede | "aucun")[] = melange([...PROCEDES, "aucun" as const]);
    const phrases = types.map((t, i) => [t, phraseProcede(t, sujets[i], hasard(sujets[i].images))] as const);
    return {
      text: hasard(PROC_Q2).replace("Y", type),
      correct: phrases.find((x) => x[0] === type)![1],
      wrongs: phrases.filter((x) => x[0] !== type).map((x) => x[1]),
      methode: "Cherche le mot qui trahit l'image : « comme », « est un… », ou un geste humain.",
    };
  },
  reconnait: (q) => PROCEDES.some((p) => PROC_Q2.some((t) => t.replace("Y", p) === q.text)),
  corriger: (q) => {
    const type = PROCEDES.find((p) => q.text.includes(p));
    if (!type) return ["procédé demandé introuvable"];
    const p: string[] = [];
    if (classerProcede(q.correct) !== type) p.push(`« ${q.correct} » n'est pas ${type}`);
    for (const w of q.wrongs) if (classerProcede(w) === type) p.push(`le leurre « ${w} » est AUSSI ${type}`);
    return p;
  },
};

const RE_COMPARE = /^Dans « (.+) », à quoi (.+) est-(il|elle) (comparée?) \?$/;
const briqueProcedeImage: Brique = {
  generer: () => {
    const type = hasard(["une comparaison", "une métaphore"] as const);
    const s = hasard(T.POESIE_SUJETS);
    const img = hasard(s.images);
    const phrase = phraseProcede(type, s, img).replace(/\.$/, "");
    const autres = uniques(T.POESIE_SUJETS.filter((x) => x.s !== s.s).flatMap((x) => x.images)).filter((i) => !phrase.includes(i));
    return {
      text: `Dans « ${phrase} », à quoi ${s.s} est-${s.f ? "elle comparée" : "il comparé"} ?`,
      correct: img,
      wrongs: melange(autres).slice(0, 3),
      methode: "Repère les deux choses que le vers rapproche : l'une est le sujet, l'autre l'image.",
    };
  },
  reconnait: (q) => RE_COMPARE.test(q.text),
  corriger: (q) => {
    const m = RE_COMPARE.exec(q.text)!;
    const [, phrase, sujet, pronom, accord] = m;
    const p: string[] = [];
    const s = T.POESIE_SUJETS.find((x) => x.s === sujet);
    if (!s) return [`le sujet « ${sujet} » n'est pas dans la table`];
    if ((pronom === "elle") !== s.f || (accord === "comparée") !== s.f) p.push("l'accord de « comparé » ou le pronom est faux");
    if (!phrase.toLowerCase().startsWith(sujet.toLowerCase())) p.push("le sujet demandé n'ouvre pas le vers");
    const genre = classerProcede(phrase + " ");
    if (genre !== "une comparaison" && genre !== "une métaphore") p.push("le vers n'est ni une comparaison ni une métaphore");
    if (!phrase.endsWith(" " + q.correct)) p.push(`« ${q.correct} » n'est pas l'image du vers`);
    for (const w of q.wrongs) if (phrase.includes(w)) p.push(`le leurre « ${w} » est dans le vers`);
    return p;
  },
};

// ── Rimes ──

const SCHEMAS: Record<string, readonly number[]> = {
  "des rimes plates (AABB)": [0, 0, 1, 1],
  "des rimes croisées (ABAB)": [0, 1, 0, 1],
  "des rimes embrassées (ABBA)": [0, 1, 1, 0],
};
const NOMS_SCHEMAS = Object.keys(SCHEMAS);
function famille(mot: string): number {
  return T.FAMILLES_RIMES.findIndex((f) => f.includes(mot));
}
function finsDeVers(schema: string): string[] {
  const [f1, f2] = melange(T.FAMILLES_RIMES).slice(0, 2);
  const a = melange(f1).slice(0, 2);
  const b = melange(f2).slice(0, 2);
  const pris = [0, 0];
  return SCHEMAS[schema].map((k) => (k === 0 ? a : b)[pris[k]++]);
}
/** Le schéma des rimes, CALCULÉ sur les familles de sons. */
function schemaDe(mots: readonly string[]): string | null {
  if (mots.length !== 4) return null;
  const fam = mots.map(famille);
  if (fam.some((f) => f < 0)) return null;
  const vus: number[] = [];
  const motif = fam.map((f) => {
    if (!vus.includes(f)) vus.push(f);
    return vus.indexOf(f);
  });
  return NOMS_SCHEMAS.find((n) => SCHEMAS[n].join() === motif.join()) ?? null;
}

const RIME_Q1 = ["Les quatre vers d'une strophe finissent par M. Comment les rimes sont-elles disposées ?", "Une strophe se termine, vers après vers, par M. Quelles rimes reconnais-tu ?"];
const briqueRimesNommer: Brique = {
  generer: () => {
    const schema = hasard(NOMS_SCHEMAS);
    const mots = finsDeVers(schema);
    return {
      text: hasard(RIME_Q1).replace("M", mots.map((m) => `« ${m} »`).join(", ")),
      correct: schema,
      wrongs: NOMS_SCHEMAS.filter((n) => n !== schema),
      methode: "Donne la lettre A au premier son, B au son suivant, puis lis le motif : AABB, ABAB ou ABBA.",
    };
  },
  reconnait: (q) => RIME_Q1.some((t) => q.text.startsWith(t.slice(0, t.indexOf("M")))),
  corriger: (q) => {
    const mots = [...q.text.matchAll(/« ([^»]+?) »/g)].map((m) => m[1]);
    const vrai = schemaDe(mots);
    if (!vrai) return [`fins de vers illisibles ou hors des familles de rimes : ${mots.join(", ")}`];
    const p: string[] = [];
    if (q.correct !== vrai) p.push(`ces fins de vers donnent ${vrai}, pas ${q.correct}`);
    for (const w of q.wrongs) if (w === vrai) p.push(`le leurre « ${w} » est AUSSI juste`);
    return p;
  },
};

const RIME_Q2 = ["Quelles fins de vers donnent S ?", "Dans quelle strophe trouve-t-on S ?"];
const briqueRimesTrouver: Brique = {
  generer: () => {
    const schema = hasard(NOMS_SCHEMAS);
    const options = NOMS_SCHEMAS.map((n) => [n, finsDeVers(n).join(", ")] as const);
    return {
      text: hasard(RIME_Q2).replace("S", schema),
      correct: options.find((o) => o[0] === schema)![1],
      wrongs: options.filter((o) => o[0] !== schema).map((o) => o[1]),
      methode: "Pour chaque liste, note A, B sous chaque son, puis compare au motif demandé.",
    };
  },
  reconnait: (q) => NOMS_SCHEMAS.some((n) => RIME_Q2.some((t) => t.replace("S", n) === q.text)),
  corriger: (q) => {
    const schema = NOMS_SCHEMAS.find((n) => q.text.includes(n))!;
    const p: string[] = [];
    if (schemaDe(q.correct.split(", ")) !== schema) p.push(`« ${q.correct} » ne donne pas ${schema}`);
    for (const w of q.wrongs) if (schemaDe(w.split(", ")) === schema) p.push(`le leurre « ${w} » donne AUSSI ${schema}`);
    return p;
  },
};

// ════════════════════════════════════════════════════════════════════════
// THÉÂTRE : un extrait fabriqué, relu par le correcteur
// ════════════════════════════════════════════════════════════════════════

/** Vrai si deux didascalies sont identiques ou quasi synonymes (« en chuchotant » / « à voix basse »). */
function memeGroupe(a: string, b: string): boolean {
  return a === b || T.GROUPES_DIDASCALIES.some((g) => g.includes(a) && g.includes(b));
}

type Replique = { qui: Prenom; did?: string; texte: string };
function scene(nbPerso: 2 | 3, posDid: number, lignes = hasard(T.SCENES)): { reps: Replique[]; did: string; extrait: string } {
  const persos = prenoms(nbPerso);
  const ordre = nbPerso === 2 ? [0, 1, 0] : [0, 1, 2];
  const did = hasard(T.DIDASCALIES);
  const reps = lignes.map((l, i) => ({ qui: persos[ordre[i]], did: i === posDid ? did : undefined, texte: l }));
  return { reps, did, extrait: ecrireScene(reps) };
}
function ecrireScene(reps: readonly Replique[]): string {
  return reps.map((r) => `${r.qui.p.toUpperCase()}${r.did ? ` (${r.did})` : ""}. — ${r.texte}`).join(" ");
}
const NOM_MAJ = "[A-ZÀ-ÖØ-Þ][A-ZÀ-ÖØ-Þ-]+";
const RE_REPLIQUE = new RegExp(`(${NOM_MAJ})(?: \\(([^)]+)\\))?\\. — (.+?)(?= ${NOM_MAJ}(?: \\([^)]+\\))?\\. — |$)`, "g");
/** Relit un extrait de théâtre : qui parle, avec quelle didascalie, pour dire quoi. */
function lireScene(extrait: string): { qui: string; did?: string; texte: string }[] {
  return [...extrait.matchAll(RE_REPLIQUE)].map((m) => ({ qui: m[1], did: m[2], texte: m[3] }));
}
const ORDINAUX = ["première", "deuxième", "troisième"];
const NOMBRES = ["un", "deux", "trois", "quatre"];
const PREFIXE_SCENE = "Lis cet extrait de théâtre : « ";
// L'extrait ne contient aucun guillemet : il se ferme au PREMIER « » ».
const extraitDe = (texte: string) => {
  if (!texte.startsWith(PREFIXE_SCENE)) return null;
  const fin = texte.indexOf(" » ", PREFIXE_SCENE.length);
  return fin < 0 ? null : texte.slice(PREFIXE_SCENE.length, fin);
};
const questionDe = (texte: string) => texte.slice(texte.indexOf(" » ", PREFIXE_SCENE.length) + 3);

function briqueScene(nbPerso: () => 2 | 3): Brique {
  return {
    generer: () => {
      const n = nbPerso();
      const sorte = hasard(["did", "qui", "combien", "comment", "laquelle"] as const);
      const { reps, did, extrait } = scene(n, sorte === "comment" ? 1 : Math.floor(Math.random() * 3));
      const absents = T.PRENOMS.filter((x) => !reps.some((r) => r.qui.p === x.p));
      const autresDid = T.DIDASCALIES.filter((d) => !memeGroupe(d, did));
      const debut = PREFIXE_SCENE + extrait + " » ";
      if (sorte === "did") {
        return {
          text: debut + hasard(["Quelle est la didascalie ?", "Quels mots sont une didascalie ?", "Quelle indication de jeu l'auteur a-t-il écrite ?"]),
          correct: did,
          wrongs: [hasard(reps).texte, hasard(reps).qui.p, hasard(autresDid)],
          methode: "La didascalie n'est pas dite par le comédien : ici, elle est entre parenthèses, après le nom.",
        };
      }
      if (sorte === "qui") {
        const k = Math.floor(Math.random() * 3);
        return {
          text: debut + `Qui dit la ${ORDINAUX[k]} réplique ?`,
          correct: reps[k].qui.p,
          wrongs: uniques([...reps.filter((r) => r.qui.p !== reps[k].qui.p).map((r) => r.qui.p), hasard(absents).p, "le narrateur"]),
          methode: "Au théâtre, le nom écrit devant la réplique dit qui parle. Il n'y a pas de narrateur.",
        };
      }
      if (sorte === "combien") {
        return {
          text: debut + hasard(["Combien de personnages parlent dans cet extrait ?", "Combien de personnages prennent la parole ?"]),
          correct: NOMBRES[n - 1],
          wrongs: NOMBRES.filter((x) => x !== NOMBRES[n - 1]),
          methode: "Compte les noms DIFFÉRENTS écrits devant les répliques.",
        };
      }
      if (sorte === "comment") {
        const qui = reps[1].qui;
        return {
          text: debut + `Comment ${qui.p} dit-${il(qui)} sa réplique ?`,
          correct: did,
          wrongs: melange(autresDid).slice(0, 3),
          methode: "Cherche la didascalie placée après le nom du personnage.",
        };
      }
      const k = reps.findIndex((r) => r.did);
      return {
        text: debut + `Quelle réplique est dite « ${did} » ?`,
        correct: reps[k].texte,
        wrongs: reps.filter((_, i) => i !== k).map((r) => r.texte),
        methode: "Trouve la didascalie, puis lis la réplique qui la suit.",
      };
    },
    reconnait: (q) => q.text.startsWith(PREFIXE_SCENE),
    corriger: (q) => {
      const ex = extraitDe(q.text);
      if (!ex) return ["extrait introuvable"];
      const reps = lireScene(ex);
      if (reps.length !== 3) return [`l'extrait ne se relit pas en trois répliques (${reps.length})`];
      const dids = reps.filter((r) => r.did).map((r) => r.did!);
      if (dids.length !== 1) return [`il faut une seule didascalie, il y en a ${dids.length}`];
      const qu = questionDe(q.text);
      const p: string[] = [];
      const tous = [q.correct, ...q.wrongs];
      if (/didascalie|indication de jeu/.test(qu)) {
        if (q.correct !== dids[0]) p.push(`la didascalie est « ${dids[0]} », pas « ${q.correct} »`);
        for (const w of q.wrongs) if (memeGroupe(w, dids[0])) p.push(`le leurre « ${w} » est AUSSI la didascalie, ou son quasi-synonyme`);
        return p;
      }
      const mQui = /^Qui dit la (\S+) réplique \?$/.exec(qu);
      if (mQui) {
        const k = ORDINAUX.indexOf(mQui[1]);
        if (k < 0) return ["rang de réplique inconnu"];
        const vrai = reps[k].qui;
        if (q.correct.toUpperCase() !== vrai) p.push(`la ${mQui[1]} réplique est dite par ${vrai}`);
        for (const w of q.wrongs) if (w.toUpperCase() === vrai) p.push(`le leurre « ${w} » est AUSSI juste`);
        return p;
      }
      if (/^Combien de personnages/.test(qu)) {
        const n = new Set(reps.map((r) => r.qui)).size;
        if (q.correct !== NOMBRES[n - 1]) p.push(`${n} personnages parlent, pas « ${q.correct} »`);
        for (const w of q.wrongs) if (w === NOMBRES[n - 1]) p.push(`le leurre « ${w} » est AUSSI juste`);
        return p;
      }
      const mComment = /^Comment (.+) dit-(il|elle) sa réplique \?$/.exec(qu);
      if (mComment) {
        const siennes = reps.filter((r) => r.qui === mComment[1].toUpperCase());
        if (siennes.length !== 1) return [`${mComment[1]} dit ${siennes.length} répliques : « sa réplique » est ambigu`];
        const x = T.PRENOMS.find((y) => y.p === mComment[1]);
        if (x && (mComment[2] === "elle") !== x.f) p.push("le pronom ne s'accorde pas avec le prénom");
        if (siennes[0].did !== q.correct) p.push(`${mComment[1]} parle « ${siennes[0].did ?? "sans didascalie"} »`);
        for (const w of q.wrongs)
          if (siennes[0].did && memeGroupe(w, siennes[0].did)) p.push(`le leurre « ${w} » est AUSSI juste (même sens que « ${siennes[0].did} »)`);
        return p;
      }
      const mLaquelle = /^Quelle réplique est dite « (.+) » \?$/.exec(qu);
      if (mLaquelle) {
        const r = reps.find((x) => x.did === mLaquelle[1]);
        if (!r) return [`aucune réplique n'est dite « ${mLaquelle[1]} »`];
        if (q.correct !== r.texte) p.push(`la réplique dite « ${mLaquelle[1]} » est « ${r.texte} »`);
        for (const w of q.wrongs) if (w === r.texte) p.push(`le leurre « ${w} » est AUSSI juste`);
        if (!tous.every((t) => reps.some((x) => x.texte === t))) p.push("une proposition n'est pas une réplique de l'extrait");
        return p;
      }
      return ["question sur l'extrait inconnue"];
    },
  };
}

// ════════════════════════════════════════════════════════════════════════
// AVENTURE : un récit en cinq étapes
// ════════════════════════════════════════════════════════════════════════

const ETAPES = ["la situation initiale", "l'élément déclencheur", "une péripétie", "le dénouement", "la situation finale"] as const;
/** L'étape d'une phrase, lue sur son DÉBUT : c'est ainsi que les récits sont écrits. */
function etapeDe(phrase: string): (typeof ETAPES)[number] {
  if (phrase.startsWith("Un jour, ")) return "l'élément déclencheur";
  if (phrase.startsWith("Alors ")) return "une péripétie";
  if (phrase.startsWith("Enfin, ")) return "le dénouement";
  if (phrase.startsWith("Depuis ce jour, ")) return "la situation finale";
  return "la situation initiale";
}
function recit(): string[] {
  const h = hasard(T.PRENOMS);
  return hasard(T.RECITS_ETAPES).map((s) =>
    s.replace(/\{P\}/g, h.p).replace(/\{il\}/g, il(h)).replace(/\{le\}/g, h.f ? "la" : "le"),
  );
}
const ETAPE_Q = ["Quelle phrase est E ?", "Quelle phrase raconte E ?"];
const RE_ETAPE1 = /^Lis ce récit : « (.+) » Quelle phrase (?:est|raconte) (.+) \?$/;
const briqueEtapeRecit: Brique = {
  generer: () => {
    const phrases = recit();
    const k = Math.floor(Math.random() * 5);
    const autres = melange(phrases.filter((_, i) => i !== k)).slice(0, 3);
    return {
      text: `Lis ce récit : « ${phrases.join(" ")} » ` + hasard(ETAPE_Q).replace("E", ETAPES[k]),
      correct: phrases[k],
      wrongs: autres,
      methode: "Les mots du début guident : « Un jour » lance l'aventure, « Alors » la fait avancer, « Enfin » la résout.",
    };
  },
  reconnait: (q) => RE_ETAPE1.test(q.text),
  corriger: (q) => {
    const [, texte, etape] = RE_ETAPE1.exec(q.text)!;
    const p: string[] = [];
    if (!(ETAPES as readonly string[]).includes(etape)) return [`étape inconnue : ${etape}`];
    for (const o of [q.correct, ...q.wrongs]) if (!texte.includes(o)) p.push(`« ${o} » n'est pas dans le récit`);
    if (etapeDe(q.correct) !== etape) p.push(`« ${q.correct} » est ${etapeDe(q.correct)}, pas ${etape}`);
    for (const w of q.wrongs) if (etapeDe(w) === etape) p.push(`le leurre « ${w} » est AUSSI ${etape}`);
    return p;
  },
};
const RE_ETAPE2 = /^Dans un récit d'aventure, la phrase « (.+) » correspond à…$/;
const briqueEtapePhrase: Brique = {
  generer: () => {
    const phrases = recit();
    const k = Math.floor(Math.random() * 5);
    return {
      text: `Dans un récit d'aventure, la phrase « ${phrases[k]} » correspond à…`,
      correct: ETAPES[k],
      wrongs: melange(ETAPES.filter((_, i) => i !== k)).slice(0, 3),
      methode: "Regarde le premier mot de la phrase et le temps du verbe.",
    };
  },
  reconnait: (q) => RE_ETAPE2.test(q.text),
  corriger: (q) => {
    const [, phrase] = RE_ETAPE2.exec(q.text)!;
    const vrai = etapeDe(phrase);
    const p: string[] = [];
    if (q.correct !== vrai) p.push(`cette phrase est ${vrai}`);
    for (const w of q.wrongs) if (w === vrai) p.push(`le leurre « ${w} » est AUSSI juste`);
    return p;
  },
};

// ════════════════════════════════════════════════════════════════════════
// REPÈRES : reconnaître un genre sur un extrait fabriqué
// ════════════════════════════════════════════════════════════════════════

const GENRES = ["un conte", "une fable", "une pièce de théâtre", "un poème", "un roman"] as const;
type Genre = (typeof GENRES)[number];
const INDICE_DU_GENRE: Record<Genre, string> = {
  "un conte": "la formule « Il était une fois »",
  "une fable": "la morale annoncée à la fin",
  "une pièce de théâtre": "les noms des personnages devant les répliques",
  "un poème": "les vers, séparés par des barres obliques",
  "un roman": "le numéro du chapitre",
};
function extraitDuGenre(g: Genre): string {
  if (g === "un conte") return `Il était une fois ${hasard(T.CONTE_SUJETS)} qui ${hasard(T.CONTE_SUITES)}.`;
  if (g === "une fable") {
    const [a, b] = melange(T.FABLE_ANIMAUX).slice(0, 2);
    return `${maj(a)} se moquait ${deForme(b)}. Mais ${b} lui donna une bonne leçon. Moralité : ${hasard(T.MORALES)}`;
  }
  if (g === "une pièce de théâtre") {
    const s = scene(2, 1);
    return ecrireScene(s.reps.slice(0, 2));
  }
  if (g === "un poème") return hasard(T.POEMES_COURTS);
  return `Chapitre ${2 + Math.floor(Math.random() * 11)}. ${hasard(T.PRENOMS).p} ${hasard(T.ROMAN_PHRASES)}.`;
}
/** Le genre d'un extrait, d'après ses MARQUES. Null si aucune ou plusieurs. */
function genreDe(ex: string): Genre | null {
  const trouves: Genre[] = [];
  if (/Il était une fois/.test(ex)) trouves.push("un conte");
  if (/Moralité : /.test(ex)) trouves.push("une fable");
  if (new RegExp(`${NOM_MAJ}(?: \\([^)]+\\))?\\. — `).test(ex)) trouves.push("une pièce de théâtre");
  if (/ \/ /.test(ex)) trouves.push("un poème");
  if (/^Chapitre \d+\. /.test(ex)) trouves.push("un roman");
  return trouves.length === 1 ? trouves[0] : null;
}
const GENRE_Q = ["De quel genre est ce texte ?", "À quel genre appartient cet extrait ?"];
const RE_GENRE = /^Lis cet extrait : « (.+) » (De quel genre est ce texte|À quel genre appartient cet extrait) \?$/;
const briqueGenreExtrait: Brique = {
  generer: () => {
    const g = hasard(GENRES);
    return {
      text: `Lis cet extrait : « ${extraitDuGenre(g)} » ` + hasard(GENRE_Q),
      correct: g,
      wrongs: melange(GENRES.filter((x) => x !== g)).slice(0, 3),
      methode: "Cherche la marque du genre : « Il était une fois », une morale, des noms devant les répliques, des vers, un chapitre.",
    };
  },
  reconnait: (q) => RE_GENRE.test(q.text),
  corriger: (q) => {
    const ex = RE_GENRE.exec(q.text)![1];
    const vrai = genreDe(ex);
    if (!vrai) return ["l'extrait n'a pas UNE marque de genre claire"];
    const p: string[] = [];
    if (q.correct !== vrai) p.push(`l'extrait est ${vrai}`);
    for (const w of q.wrongs) if (w === vrai) p.push(`le leurre « ${w} » est AUSSI juste`);
    return p;
  },
};

// Défi : classer trois extraits, ou justifier un classement.
const LETTRES = ["A", "B", "C"];
const RE_TROIS = /([ABC]) : « (.+?) »(?= [ABC] : « | (?:Quel|Quelle))/g;
function lireTrois(texte: string): Map<string, string> {
  return new Map([...texte.matchAll(RE_TROIS)].map((m) => [m[1], m[2]]));
}
const CLASSER_Q = "Quel classement est juste ?";
const JUSTIFIER_RE = /Quel indice montre que l'extrait ([ABC]) est (.+) \?$/;
const briqueClasserTrois: Brique = {
  generer: () => {
    const gs = melange(GENRES).slice(0, 3) as Genre[];
    const debut = "Classe ces trois extraits par genre. " + gs.map((g, i) => `${LETTRES[i]} : « ${extraitDuGenre(g)} »`).join(" ");
    const ecrire = (t: readonly string[]) => t.map((g, i) => `${LETTRES[i]} : ${g}`).join(" ; ");
    if (Math.random() < 0.5) {
      const autre = hasard(GENRES.filter((g) => !gs.includes(g)));
      const wrongs = uniques([
        ecrire([gs[1], gs[0], gs[2]]),
        ecrire([gs[0], gs[2], gs[1]]),
        ecrire([gs[2], gs[1], gs[0]]),
        ecrire([gs[0], gs[1], autre]),
      ]);
      return {
        text: `${debut} ${CLASSER_Q}`,
        correct: ecrire(gs),
        wrongs: melange(wrongs).slice(0, 3),
        methode: "Classe chaque extrait d'après sa marque, puis vérifie les trois lettres une par une.",
      };
    }
    const k = Math.floor(Math.random() * 3);
    return {
      text: `${debut} Quel indice montre que l'extrait ${LETTRES[k]} est ${gs[k]} ?`,
      correct: INDICE_DU_GENRE[gs[k]],
      wrongs: GENRES.filter((g) => g !== gs[k]).map((g) => INDICE_DU_GENRE[g]).slice(0, 3),
      methode: "Justifier, c'est montrer la marque du genre dans le texte lui-même.",
    };
  },
  reconnait: (q) => q.text.startsWith("Classe ces trois extraits par genre. "),
  corriger: (q) => {
    const ex = lireTrois(q.text);
    if (ex.size !== 3) return [`trois extraits attendus, ${ex.size} relus`];
    const vrais = new Map([...ex].map(([l, t]) => [l, genreDe(t)]));
    if ([...vrais.values()].some((g) => !g)) return ["un extrait n'a pas de marque de genre claire"];
    const p: string[] = [];
    if (q.text.endsWith(CLASSER_Q)) {
      const juste = (o: string) =>
        o.split(" ; ").length === 3 && o.split(" ; ").every((part) => {
          const [l, g] = part.split(" : ");
          return vrais.get(l) === g;
        });
      if (!juste(q.correct)) p.push(`le classement « ${q.correct} » est faux`);
      for (const w of q.wrongs) if (juste(w)) p.push(`le leurre « ${w} » est AUSSI juste`);
      return p;
    }
    const m = JUSTIFIER_RE.exec(q.text);
    if (!m) return ["question inconnue"];
    const g = vrais.get(m[1])!;
    if (g !== m[2]) p.push(`l'extrait ${m[1]} est ${g}, pas ${m[2]}`);
    if (q.correct !== INDICE_DU_GENRE[g]) p.push(`l'indice de ${g} est « ${INDICE_DU_GENRE[g]} »`);
    for (const w of q.wrongs) if (w === INDICE_DU_GENRE[g]) p.push(`le leurre « ${w} » est AUSSI juste`);
    return p;
  },
};

// ════════════════════════════════════════════════════════════════════════
// RÉSEAU : des œuvres qui partagent un thème
// ════════════════════════════════════════════════════════════════════════

const TOUTES_OEUVRES_THEMES = T.THEMES.flatMap((t) => t.oeuvres);
function briqueThemes(
  tournures: readonly ((p: Prenom, a: string, theme: string) => string)[],
  forme: RegExp,
  methode: string,
): Brique {
  return {
    generer: () => {
      const t = hasard(T.THEMES);
      const [a, b] = melange(t.oeuvres).slice(0, 2);
      const ailleurs = T.THEMES.filter((x) => x !== t && !t.interdits.includes(x.theme)).flatMap((x) => x.oeuvres);
      return {
        text: hasard(tournures)(hasard(T.PRENOMS), a, t.theme),
        correct: b,
        wrongs: melange(ailleurs).slice(0, 3),
        methode,
      };
    },
    reconnait: (q) => /thème (: )?« .+? »/.test(q.text) && forme.test(q.text),
    corriger: (q) => {
      const theme = /thème (?:: )?« (.+?) »/.exec(q.text)![1];
      const t = T.THEMES.find((x) => x.theme === theme);
      if (!t) return [`le thème « ${theme} » n'est pas dans la table`];
      const cites = TOUTES_OEUVRES_THEMES.filter((o) => q.text.includes(o));
      const p: string[] = [];
      if (cites.length !== 1) p.push(`la question doit citer UNE œuvre de départ, elle en cite ${cites.length}`);
      else if (!t.oeuvres.includes(cites[0])) p.push(`« ${cites[0]} » ne traite pas ce thème`);
      if (!t.oeuvres.includes(q.correct) || cites.includes(q.correct)) p.push(`« ${q.correct} » n'est pas une AUTRE œuvre de ce thème`);
      for (const w of q.wrongs) {
        const tw = T.THEMES.find((x) => x.oeuvres.includes(w));
        if (!tw) p.push(`le leurre « ${w} » n'est pas dans la table`);
        else if (tw === t || t.interdits.includes(tw.theme)) p.push(`le leurre « ${w} » pourrait AUSSI aller avec ce thème`);
      }
      return p;
    },
  };
}
const briqueReseauThemes = briqueThemes(
  [
    (p, a, t) => `${p.p} étudie ${a}, sur le thème « ${t} ». Quelle autre œuvre peut-${il(p)} mettre en réseau avec elle ?`,
    (p, a, t) => `Pour un exposé sur le thème « ${t} », ${p.p} a choisi ${a}. Quelle œuvre peut-${il(p)} ajouter ?`,
  ],
  /mettre en réseau avec elle \?$|Quelle œuvre peut-(il|elle) ajouter \?$/,
  "Mettre en réseau, c'est rapprocher des œuvres qui traitent le même thème.",
);
const briqueRelierThemes = briqueThemes(
  [
    (p, a, t) => `${p.p} lit ${a}. Cela lui rappelle une autre histoire sur le même thème : « ${t} ». Laquelle ?`,
    (p, a, t) => `En lisant ${a}, ${p.p} pense à une histoire déjà connue, sur le thème « ${t} ». Laquelle ?`,
  ],
  /Laquelle \?$/,
  "Relier une lecture à ce qu'on sait déjà : cherche une histoire qui raconte la même chose.",
);

// ════════════════════════════════════════════════════════════════════════
// TRACE DE LECTURE ET LECTURE D'ŒUVRES : avis, résumés, souvenirs, débat
// ════════════════════════════════════════════════════════════════════════

const RE_JUSTIFIE = /\bparce qu(e\b|')|\bcar\b/;
const RE_JE = /(^|[^\p{L}])((je|moi|me)(?![\p{L}])|j'|m')/iu;
const livreCite = (texte: string): Livre | undefined =>
  T.LIVRES.find((l) => texte.includes(`« ${l.titre} »`) || texte.includes(deTitre(l.titre)));
const OUVERTURES_AVIS = ["J'ai aimé ce livre", "J'ai trouvé ce livre passionnant", "Je conseille ce livre"];
const AVIS_SANS_RAISON = ["J'ai aimé ce livre.", "Ce livre est génial !", "Tout le monde devrait lire ce livre.", "Je n'ai pas aimé ce livre."];

const AVIS_Q = [
  (p: Prenom, t: string) => `${p.p} écrit son avis sur « ${t} » dans son carnet. Quel avis est justifié ?`,
  (p: Prenom, t: string) => `Dans son carnet, ${p.p} parle ${deTitre(t)}. Quelle phrase donne un avis avec une raison ?`,
];
const briqueAvisJustifie: Brique = {
  generer: () => {
    const l = hasard(T.LIVRES);
    return {
      text: hasard(AVIS_Q)(hasard(T.PRENOMS), l.titre),
      correct: `${hasard(OUVERTURES_AVIS)} ${parceQue(hasard(l.raisons))}.`,
      wrongs: melange([...AVIS_SANS_RAISON, l.resume]).slice(0, 3),
      methode: "Un avis justifié donne une raison : cherche « parce que » ou « car ».",
    };
  },
  reconnait: (q) => /Quel avis est justifié \?$|Quelle phrase donne un avis avec une raison \?$/.test(q.text),
  corriger: (q) => {
    const l = livreCite(q.text);
    if (!l) return ["le livre cité n'est pas dans la table"];
    const p: string[] = [];
    if (!RE_JUSTIFIE.test(q.correct)) p.push("la bonne réponse ne donne pas de raison");
    if (!l.raisons.some((r) => q.correct.includes(r))) p.push("la raison donnée ne vient pas de ce livre");
    for (const w of q.wrongs) if (RE_JUSTIFIE.test(w)) p.push(`le leurre « ${w} » est AUSSI justifié`);
    return p;
  },
};

const RESUME_Q = [
  (p: Prenom, t: string) => `Dans son carnet, ${p.p} a écrit plusieurs phrases sur « ${t} ». Laquelle est un résumé, et non un avis ?`,
  (p: Prenom, t: string) => `${p.p} relit son carnet sur « ${t} ». Quelle phrase résume l'histoire sans donner d'avis ?`,
];
const AVIS_Q2 = [
  (p: Prenom, t: string) => `Dans son carnet, ${p.p} a écrit plusieurs phrases sur « ${t} ». Laquelle est un avis personnel ?`,
];
const briqueResumeOuAvis: Brique = {
  generer: () => {
    const l = hasard(T.LIVRES);
    const p = hasard(T.PRENOMS);
    const avis = [
      `J'ai aimé ce livre ${parceQue(hasard(l.raisons))}.`,
      `Je n'ai pas aimé ce livre ${parceQue(l.critique)}.`,
      `Je trouve ${que(l.critique)}.`,
    ];
    if (Math.random() < 0.6) {
      return {
        text: hasard(RESUME_Q)(p, l.titre),
        correct: l.resume,
        wrongs: avis,
        methode: "Un résumé raconte l'histoire, sans « je » ; un avis dit ce qu'on en pense.",
      };
    }
    const autre = hasard(T.LIVRES.filter((x) => x !== l));
    return {
      text: hasard(AVIS_Q2)(p, l.titre),
      correct: hasard(avis),
      wrongs: [l.resume, ...(l.auteur ? [`Ce livre a été écrit par ${l.auteur}.`] : [autre.resume]), "L'histoire compte plusieurs personnages."],
      methode: "Un avis personnel parle de soi : « j'ai aimé », « je trouve que »…",
    };
  },
  reconnait: (q) => /Laquelle est un résumé, et non un avis \?$|Quelle phrase résume l'histoire sans donner d'avis \?$|Laquelle est un avis personnel \?$/.test(q.text),
  corriger: (q) => {
    const l = livreCite(q.text);
    if (!l) return ["le livre cité n'est pas dans la table"];
    const p: string[] = [];
    if (/avis personnel/.test(q.text)) {
      if (!RE_JE.test(q.correct)) p.push("la bonne réponse n'est pas un avis personnel");
      for (const w of q.wrongs) if (RE_JE.test(w)) p.push(`le leurre « ${w} » est AUSSI un avis personnel`);
      return p;
    }
    if (q.correct !== l.resume) p.push("la bonne réponse n'est pas le résumé de ce livre");
    if (RE_JE.test(q.correct)) p.push("le résumé contient un « je »");
    for (const w of q.wrongs) if (!RE_JE.test(w)) p.push(`le leurre « ${w} » n'est pas un avis`);
    return p;
  },
};

// Relier une œuvre à sa propre vie.
const RE_VECU = /^(Moi aussi|Comme moi|Ça me rappelle)/;
const RELIER_Q = [
  (p: Prenom, l: Livre) => `${p.p} lit « ${l.titre} ». ${l.resume} Quelle remarque relie ce livre à sa propre vie ?`,
  (p: Prenom, l: Livre) => `${p.p} lit « ${l.titre} ». ${l.resume} Quelle phrase montre ${que(il(p))} relie sa lecture à ce qu'${il(p)} a vécu ?`,
];
const briqueRelierVecu: Brique = {
  generer: () => {
    const l = hasard(T.LIVRES);
    const wrongs = [
      `${maj(l.critique)}.`,
      "L'histoire compte plusieurs personnages.",
      l.auteur ? `Ce livre a été écrit par ${l.auteur}.` : "Ce livre est très ancien.",
      `L'histoire se termine bien.`,
    ];
    return {
      text: hasard(RELIER_Q)(hasard(T.PRENOMS), l),
      correct: l.experience,
      wrongs: melange(wrongs).slice(0, 3),
      methode: "Relier un livre à sa vie, c'est dire ce qu'on a vécu de semblable : « Moi aussi… ».",
    };
  },
  reconnait: (q) => /Quelle remarque relie ce livre à sa propre vie \?$|relie sa lecture à ce qu'(il|elle) a vécu \?$/.test(q.text),
  corriger: (q) => {
    const l = livreCite(q.text);
    if (!l) return ["le livre cité n'est pas dans la table"];
    const p: string[] = [];
    if (!q.text.includes(l.resume)) p.push("le résumé lu n'est pas celui du livre");
    if (!RE_VECU.test(q.correct) || q.correct !== l.experience) p.push("la bonne réponse n'est pas le souvenir lié à ce livre");
    for (const w of q.wrongs) if (RE_VECU.test(w) || RE_JE.test(w)) p.push(`le leurre « ${w} » parle AUSSI de soi`);
    return p;
  },
};

// Suivre une œuvre longue : chapitres et personnages notés dans le carnet.
const RE_CHAP = /Chapitre (\d) : (.+?)\./g;
const briqueChapitres = (nb: number): Brique => ({
  generer: () => {
    const [lecteur, h] = prenoms(2);
    const evs = melange(T.EVENEMENTS_CHAPITRES).slice(0, nb);
    const absent = hasard(T.EVENEMENTS_CHAPITRES.filter((e) => !evs.includes(e)));
    const liste = evs.map((e, i) => `Chapitre ${i + 1} : ${h.p} ${e}.`).join(" ");
    const debut = `Dans son carnet, ${lecteur.p} résume chaque chapitre d'un roman. ${liste} `;
    const k = Math.floor(Math.random() * nb);
    if (Math.random() < 0.5) {
      return {
        text: debut + `Dans quel chapitre lit-on : « ${h.p} ${evs[k]} » ?`,
        correct: `au chapitre ${k + 1}`,
        wrongs: evs.map((_, i) => `au chapitre ${i + 1}`).filter((_, i) => i !== k).slice(0, 3),
        methode: "Le carnet garde le fil : relis les résumés un par un.",
      };
    }
    return {
      text: debut + `Que se passe-t-il au chapitre ${k + 1} ?`,
      correct: `${h.p} ${evs[k]}.`,
      wrongs: melange([...evs.filter((_, i) => i !== k), absent]).slice(0, 3).map((e) => `${h.p} ${e}.`),
      methode: "Retrouve la ligne du chapitre demandé dans le carnet.",
    };
  },
  reconnait: (q) => /résume chaque chapitre d'un roman/.test(q.text),
  corriger: (q) => {
    const chap = new Map([...q.text.matchAll(RE_CHAP)].map((m) => [Number(m[1]), m[2]]));
    if (chap.size < 3) return ["résumés de chapitres illisibles"];
    const p: string[] = [];
    const m1 = /Dans quel chapitre lit-on : « (.+) » \?$/.exec(q.text);
    if (m1) {
      const ks = [...chap].filter(([, t]) => t === m1[1]).map(([k]) => k);
      if (ks.length !== 1) return [`l'événement demandé apparaît dans ${ks.length} chapitres`];
      if (q.correct !== `au chapitre ${ks[0]}`) p.push(`c'est au chapitre ${ks[0]}`);
      for (const w of q.wrongs) if (w === `au chapitre ${ks[0]}`) p.push(`le leurre « ${w} » est AUSSI juste`);
      return p;
    }
    const m2 = /Que se passe-t-il au chapitre (\d) \?$/.exec(q.text);
    if (!m2) return ["question inconnue"];
    const vrai = chap.get(Number(m2[1])) + ".";
    if (q.correct !== vrai) p.push(`au chapitre ${m2[1]} : « ${vrai} »`);
    for (const w of q.wrongs) if (w === vrai) p.push(`le leurre « ${w} » est AUSSI juste`);
    return p;
  },
});

const briquePersonnages: Brique = {
  generer: () => {
    const [lecteur, h, ...autres] = prenoms(5);
    const roles = melange(T.ROLES).slice(0, 4);
    const fiche = autres.map((x, i) => [x, roles[i][x.f ? 0 : 1]] as const);
    const k = Math.floor(Math.random() * 3);
    const [x, role] = fiche[k];
    const horsFiche = roles[3][x.f ? 0 : 1];
    return {
      text:
        `Dans son carnet, ${lecteur.p} a noté les personnages d'un long roman : ${h.p}, ${h.f ? "l'héroïne" : "le héros"} ; ` +
        fiche.map(([y, r]) => `${y.p}, ${r}`).join(" ; ") +
        `. Au chapitre ${8 + Math.floor(Math.random() * 12)}, ${x.p} revient dans l'histoire. Qui est ${x.p} ?`,
      correct: role,
      wrongs: [...fiche.filter((_, i) => i !== k).map(([, r]) => r), horsFiche],
      methode: "Quand un personnage revient, la liste du carnet rappelle qui il est.",
    };
  },
  reconnait: (q) => /a noté les personnages d'un long roman/.test(q.text),
  corriger: (q) => {
    const m = /d'un long roman : (.+?)\. Au chapitre \d+, (.+) revient dans l'histoire\. Qui est (.+) \?$/.exec(q.text);
    if (!m || m[2] !== m[3]) return ["fiche des personnages illisible"];
    const fiche = new Map(m[1].split(" ; ").map((s) => [s.slice(0, s.indexOf(", ")), s.slice(s.indexOf(", ") + 2)]));
    const vrai = fiche.get(m[2]);
    if (!vrai) return [`${m[2]} n'est pas dans la fiche`];
    const p: string[] = [];
    if (q.correct !== vrai) p.push(`${m[2]} est ${vrai}`);
    for (const w of q.wrongs) if (w === vrai) p.push(`le leurre « ${w} » est AUSSI juste`);
    return p;
  },
};

// Fonder une interprétation sur un passage : les signes d'un sentiment.
function sentimentDe(phrase: string): string | null {
  const s = T.SENTIMENTS.filter((x) => x.signes.some((sg) => phrase.includes(sg)));
  return s.length === 1 ? s[0].nom : null;
}
function etat(nom: string, f: boolean): string {
  const t: Record<string, string> = {
    "la peur": "a peur",
    "la joie": f ? "est joyeuse" : "est joyeux",
    "la colère": "est en colère",
    "la tristesse": "est triste",
    "la surprise": f ? "est surprise" : "est surpris",
    "la fatigue": f ? "est fatiguée" : "est fatigué",
  };
  return t[nom];
}
const NOMS_SENTIMENTS = T.SENTIMENTS.map((s) => s.nom);

const briqueFonderPassage: Brique = {
  generer: () => {
    const [lecteur, h] = prenoms(2);
    const ss = melange(T.SENTIMENTS).slice(0, 4);
    return {
      text: hasard([
        `${lecteur.p} pense que, dans le roman, ${h.p} ressent ${ss[0].nom}. Quel passage le prouve ?`,
        `Selon ${lecteur.p}, ${h.p} ressent ${ss[0].nom} à ce moment du récit. Sur quel passage peut-${il(lecteur)} s'appuyer ?`,
      ]),
      correct: `${h.p} ${hasard(ss[0].signes)}.`,
      wrongs: ss.slice(1).map((s) => `${h.p} ${hasard(s.signes)}.`),
      methode: "Une interprétation se prouve par un passage précis : un geste, une réaction du personnage.",
    };
  },
  reconnait: (q) => /ressent (.+?)(\. Quel passage le prouve \?| à ce moment du récit)/.test(q.text),
  corriger: (q) => {
    const nom = NOMS_SENTIMENTS.find((n) => q.text.includes(`ressent ${n}`));
    if (!nom) return ["sentiment introuvable"];
    const p: string[] = [];
    if (sentimentDe(q.correct) !== nom) p.push(`« ${q.correct} » ne montre pas ${nom}`);
    for (const w of q.wrongs) if (sentimentDe(w) === nom || sentimentDe(w) === null) p.push(`le leurre « ${w} » montre AUSSI ${nom}, ou rien de clair`);
    return p;
  },
};

const RE_PASSAGE = /^Lis ce passage : « (.+) » Quel sentiment ce passage montre-t-il chez (.+) \?$/;
const briqueFonderSentiment: Brique = {
  generer: () => {
    const h = hasard(T.PRENOMS);
    const s = hasard(T.SENTIMENTS);
    return {
      text: `Lis ce passage : « ${hasard(T.AMORCES_PASSAGE)} ${h.p} ${hasard(s.signes)}. » Quel sentiment ce passage montre-t-il chez ${h.p} ?`,
      correct: s.nom,
      wrongs: melange(NOMS_SENTIMENTS.filter((n) => n !== s.nom)).slice(0, 3),
      methode: "Repère le geste ou la réaction du personnage : il trahit ce qu'il ressent.",
    };
  },
  reconnait: (q) => RE_PASSAGE.test(q.text),
  corriger: (q) => {
    const [, passage, nomPerso] = RE_PASSAGE.exec(q.text)!;
    if (!passage.includes(nomPerso + " ")) return ["le personnage demandé n'est pas dans le passage"];
    const vrai = sentimentDe(passage);
    if (!vrai) return ["le passage ne montre pas un seul sentiment clair"];
    const p: string[] = [];
    if (q.correct !== vrai) p.push(`le passage montre ${vrai}`);
    for (const w of q.wrongs) if (w === vrai) p.push(`le leurre « ${w} » est AUSSI juste`);
    return p;
  },
};

// « que Léa », « qu'Amina » : l'élision suit le prénom (06/10/2026, « que Inès » passait).
const RE_ARGUMENT = /^Je pense qu(?:e |')(.+) (a peur|est [^,]+), car (elle|il) (.+)\.$/;
const briqueFonderArgument: Brique = {
  generer: () => {
    const h = hasard(T.PRENOMS);
    const s = hasard(T.SENTIMENTS);
    const e = `${h.p} ${etat(s.nom, h.f)}`;
    return {
      text: hasard([
        `Quelle phrase s'appuie sur le texte pour dire ${que(e)} ?`,
        `Pour montrer ${que(e)}, quelle phrase est la mieux fondée ?`,
      ]),
      correct: `Je pense ${que(e)}, car ${il(h)} ${hasard(s.signes)}.`,
      wrongs: [`Je pense ${que(e)}, parce que c'est souvent comme ça.`, `${maj(e)}, c'est évident.`, `Je pense ${que(e)}, mais je ne sais pas pourquoi.`],
      methode: "Une interprétation fondée cite ce que fait le personnage dans le texte.",
    };
  },
  reconnait: (q) => /^(Quelle phrase s'appuie sur le texte pour dire qu(?:e |')|Pour montrer qu(?:e |'))/.test(q.text),
  corriger: (q) => {
    const m = RE_ARGUMENT.exec(q.correct);
    if (!m) return ["la bonne réponse n'a pas la forme « je pense que…, car… »"];
    const p: string[] = [];
    const nom = sentimentDe(m[4]);
    if (!nom) p.push("la raison donnée n'est pas un signe du texte");
    const perso = T.PRENOMS.find((x) => x.p === m[1]);
    if (!perso) p.push("personnage inconnu");
    else {
      if ((m[3] === "elle") !== perso.f) p.push("le pronom ne s'accorde pas");
      if (nom && etat(nom, perso.f) !== m[2]) p.push(`le signe montre ${nom}, pas « ${m[2]} »`);
      if (!q.text.includes(`${perso.p} ${m[2]}`)) p.push("la bonne réponse ne parle pas du sentiment demandé");
    }
    for (const w of q.wrongs) if (T.SENTIMENTS.some((s) => s.signes.some((sg) => w.includes(sg)))) p.push(`le leurre « ${w} » cite AUSSI le texte`);
    return p;
  },
};

// Défi : deux personnages, deux sentiments.
const RE_DEUX = /^Lis : « (.+?) (.+?)\. À côté, (.+?) (.+?)\. » Qui ressent (.+) \?$/;
const briqueFonderDeux: Brique = {
  generer: () => {
    const [a, b] = prenoms(2);
    const [s1, s2] = melange(T.SENTIMENTS).slice(0, 2);
    const premier = Math.random() < 0.5;
    const visee = premier ? s1 : s2;
    return {
      text: `Lis : « ${a.p} ${hasard(s1.signes)}. À côté, ${b.p} ${hasard(s2.signes)}. » Qui ressent ${visee.nom} ?`,
      correct: premier ? a.p : b.p,
      wrongs: [premier ? b.p : a.p, "les deux", "personne"],
      methode: "Lis chaque phrase séparément : quel geste, pour quel personnage ?",
    };
  },
  reconnait: (q) => RE_DEUX.test(q.text),
  corriger: (q) => {
    const m = RE_DEUX.exec(q.text)!;
    const [, a, sa, b, sb, nom] = m;
    const qui = [[a, sentimentDe(sa)], [b, sentimentDe(sb)]].filter(([, s]) => s === nom).map(([x]) => x);
    const p: string[] = [];
    if (qui.length !== 1) return [`${qui.length} personnages ressentent ${nom} : il en faut un seul`];
    if (q.correct !== qui[0]) p.push(`c'est ${qui[0]} qui ressent ${nom}`);
    for (const w of q.wrongs) if (w === qui[0]) p.push(`le leurre « ${w} » est AUSSI juste`);
    return p;
  },
};

// Débattre : une réponse qui argumente.
const RE_DEBAT = /^À propos (d(?:u|es|e) « .+? »),(.+?) dit qu'(il|elle) a aimé ce livre parce (?:que |qu')(.+?)\. (.+?) (n'est pas d'accord|est d'accord et veut ajouter un argument)\. /;
const briqueDebat: Brique = {
  generer: () => {
    const l = hasard(T.LIVRES);
    const [a, b] = prenoms(2);
    const [r1, r2] = melange(l.raisons);
    const debut = `À propos ${deTitre(l.titre)}, ${a.p} dit qu'${il(a)} a aimé ce livre ${parceQue(r1)}. `;
    if (Math.random() < 0.6) {
      return {
        text: debut + `${b.p} n'est pas d'accord. Quelle réponse ${deForme(b.p)} fait avancer le débat ?`,
        correct: `Je ne suis pas d'accord, ${parceQue(l.critique)}.`,
        wrongs: melange(T.REPONSES_IMPOLIES).slice(0, 3),
        methode: "Dans un débat, on peut être en désaccord : on donne une raison, sans attaquer la personne.",
      };
    }
    return {
      text: debut + `${b.p} est d'accord et veut ajouter un argument. Que peut-${il(b)} dire ?`,
      correct: `Je suis d'accord, et en plus ${r2}.`,
      wrongs: ["Moi aussi.", "Pareil.", "Je ne sais pas trop.", "Oui, oui, c'est ça."].slice(0, 3),
      methode: "Ajouter un argument, c'est apporter une NOUVELLE raison tirée du livre.",
    };
  },
  reconnait: (q) => RE_DEBAT.test(q.text),
  corriger: (q) => {
    const m = RE_DEBAT.exec(q.text)!;
    const l = T.LIVRES.find((x) => deTitre(x.titre) === m[1]);
    if (!l) return ["livre inconnu"];
    const p: string[] = [];
    if (!l.raisons.includes(m[4])) p.push("la raison de départ ne vient pas de ce livre");
    if (m[6] === "n'est pas d'accord") {
      if (q.correct !== `Je ne suis pas d'accord, ${parceQue(l.critique)}.`) p.push("la bonne réponse n'argumente pas contre ce livre");
    } else {
      const r2 = l.raisons.find((r) => q.correct === `Je suis d'accord, et en plus ${r}.`);
      if (!r2) p.push("la bonne réponse n'apporte pas une raison du livre");
      else if (r2 === m[4]) p.push("la bonne réponse répète l'argument de départ");
    }
    for (const w of q.wrongs) if (RE_JUSTIFIE.test(w) || l.raisons.some((r) => w.includes(r))) p.push(`le leurre « ${w} » argumente AUSSI`);
    return p;
  },
};

// Débattre : reformuler l'avis d'un camarade avant de répondre.
const RE_REFORMULER = /^À propos (d(?:u|es|e) « .+? »),(.+?) dit : « J'ai aimé ce livre parce (?:que |qu')(.+?)\. » (.+?) veut vérifier qu'(il|elle) a bien compris\. Que dit-(il|elle) \?$/;
const briqueReformuler: Brique = {
  generer: () => {
    const l = hasard(T.LIVRES);
    const [a, b] = prenoms(2);
    const [r1, r2] = melange(l.raisons);
    return {
      text: `À propos ${deTitre(l.titre)}, ${a.p} dit : « J'ai aimé ce livre ${parceQue(r1)}. » ${b.p} veut vérifier qu'${il(b)} a bien compris. Que dit-${il(b)} ?`,
      correct: `Si je comprends bien, tu as aimé ce livre ${parceQue(r1)}.`,
      wrongs: [
        `Si je comprends bien, tu as aimé ce livre ${parceQue(r2)}.`,
        `Si je comprends bien, tu n'as pas aimé ce livre ${parceQue(l.critique)}.`,
        hasard(T.REPONSES_IMPOLIES),
      ],
      methode: "Reformuler, c'est redire l'idée de l'autre avec ses propres mots, sans la changer.",
    };
  },
  reconnait: (q) => RE_REFORMULER.test(q.text),
  corriger: (q) => {
    const m = RE_REFORMULER.exec(q.text)!;
    const l = T.LIVRES.find((x) => deTitre(x.titre) === m[1]);
    if (!l) return ["livre inconnu"];
    const p: string[] = [];
    const b = T.PRENOMS.find((x) => x.p === m[4]);
    if (!b || (m[5] === "elle") !== b.f || m[5] !== m[6]) p.push("pronom mal accordé");
    const fidele = `Si je comprends bien, tu as aimé ce livre ${parceQue(m[3])}.`;
    if (q.correct !== fidele) p.push("la bonne réponse ne reformule pas fidèlement l'avis");
    for (const w of q.wrongs) if (w === fidele) p.push(`le leurre « ${w} » est AUSSI fidèle`);
    return p;
  },
};

// ════════════════════════════════════════════════════════════════════════
// LES MICROS
// ════════════════════════════════════════════════════════════════════════

const R = (x: Relation) => briqueRelation(x);
const sceneDeux = briqueScene(() => (Math.random() < 0.7 ? 2 : 3));
const sceneTrois = briqueScene(() => 3);

export const GENERATEURS: GenerateursFrancais = {
  // ── culture_poesie_theatre ──
  "6e_cult_poesie": micro([
    [R(T.POESIE_TERMES), 3],
    [R(T.POEMES_POETES), 1],
    [briqueProcedeNommer, 2],
    [briqueProcedeTrouver, 1],
    [briqueProcedeImage, 1],
    [briqueRimesNommer, 2],
  ]),
  "6e_cult_theatre": micro([
    [R(T.THEATRE_TERMES), 3],
    [R(T.MOLIERE), 2],
    [sceneDeux, 4],
  ]),
  "6e_cult_arts_defi": micro([
    [briqueCouples([T.POESIE_TERMES, T.THEATRE_TERMES, T.MOLIERE, T.POEMES_POETES]), 2],
    [R(T.INDICES_GENRE_FORME), 2],
    [sceneTrois, 2],
    [briqueRimesTrouver, 1],
    [briqueProcedeTrouver, 1],
  ]),

  // ── culture_recits ──
  "6e_cult_origines": micro([
    [R(T.ORIGINES_ACTIONS), 3],
    [R(T.ORIGINES_EXPLICATIONS), 2],
    [R(T.DIEUX), 2],
    [R(T.SOURCES_RECITS), 2],
  ]),
  "6e_cult_aventure": micro([
    [R(T.AVENTURE_HEROS), 2],
    [R(T.AVENTURE_AUTEURS), 2],
    [R(T.AVENTURE_MOTS), 2],
    [briqueEtapeRecit, 2],
    [briqueEtapePhrase, 2],
  ]),
  "6e_cult_monstres": micro([
    [R(T.MONSTRES_PORTRAITS), 3],
    [R(T.MONSTRES_HEROS), 2],
    [R(T.MONSTRES_RUSES), 2],
    [R(T.MONSTRES_MOTS), 1],
  ]),
  "6e_cult_recits_defi": micro([
    [R(T.TYPES_RECITS), 3],
    [
      briqueCouples([
        T.ORIGINES_ACTIONS, T.DIEUX, T.SOURCES_RECITS, T.AVENTURE_HEROS, T.AVENTURE_AUTEURS,
        T.MONSTRES_PORTRAITS, T.MONSTRES_HEROS,
      ]),
      3,
    ],
    [briqueEtapeRecit, 1],
  ]),

  // ── culture_reperes ──
  "6e_culture_genres": micro([
    [R(T.OEUVRES_GENRES), 3],
    [R(T.INDICES_GENRES), 2],
    [R(T.AUTEURS_GENRES), 1],
    [briqueGenreExtrait, 3],
  ]),
  "6e_culture_contexte": micro([
    [R(T.EPOQUES), 3],
    [R(T.PAYS_AUTEURS), 2],
    [R(T.CONTEXTE_AUTEURS), 1],
  ]),
  "6e_culture_reseau": micro([
    [R(T.RESEAU_MOTS), 2],
    [R(T.RESEAU_LIENS), 2],
    [briqueReseauThemes, 3],
  ]),
  "6e_culture_trace": micro([
    [R(T.CARNET), 2],
    [briqueAvisJustifie, 2],
    [briqueResumeOuAvis, 2],
  ]),
  "6e_culture_reperes_defi": micro([
    [briqueClasserTrois, 4],
    [briqueCouples([T.OEUVRES_GENRES, T.EPOQUES, T.PAYS_AUTEURS, T.AUTEURS_GENRES]), 2],
  ]),

  // ── lecture_oeuvres ──
  "6e_oeuvre_integrale": micro([
    [R(T.STRATEGIES_LECTURE), 2],
    [briqueChapitres(4), 2],
    [briquePersonnages, 2],
  ]),
  "6e_oeuvre_relier": micro([
    [briqueRelierVecu, 3],
    [briqueRelierThemes, 2],
  ]),
  "6e_oeuvre_fonder": micro([
    [briqueFonderPassage, 2],
    [briqueFonderSentiment, 2],
    [briqueFonderArgument, 2],
  ]),
  "6e_oeuvre_debattre": micro([
    [briqueDebat, 3],
    [briqueReformuler, 2],
  ]),
  "6e_oeuvre_defi": micro([
    [briqueFonderDeux, 2],
    [briqueChapitres(5), 1],
    [briqueDebat, 1],
    [briqueRelierThemes, 1],
    [briqueCouples([T.STRATEGIES_LECTURE, T.CARNET]), 1],
  ]),
};
