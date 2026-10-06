import type { GenerateurFrancais, GenerateursFrancais, QuestionFrancais } from "./types";
import * as T from "./ecriture-tables";
import type { Prenom } from "./ecriture-tables";

// LA FAMILLE « ÉCRITURE » DU FRANÇAIS DE 6e : générateurs à correcteur
// (05/10/2026, voir types.ts). Notions : ecriture_main, ecriture_apprendre,
// ecriture_produire, ecriture_reviser.
//
// ⭐ Des questions CONCRÈTES sur une phrase ou un court texte composé à partir
// des tables (ecriture-tables.ts) : la copie fautive, la faute de majuscule ou
// de ponctuation, la répétition à corriger, la bonne reprise, le connecteur
// qui manque, l'idée principale et le détail, la phrase qui résume.
//
// Chaque micro tire une BRIQUE (une forme de question). Le correcteur de la
// brique RECONNAÎT la forme, relit ce que voit l'élève (les passages entre
// guillemets) et refait le raisonnement : la faute existe bien dans la version
// fautive et pas dans la bonne réponse ; aucun leurre n'est juste lui aussi.
// S'y ajoutent des contrôles de langue sur les textes « propres » (pas sur les
// versions fautives exprès) : élisions, articles non contractés, mot plein
// répété dans deux phrases voisines, pronom placé avant son prénom.

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
/** k éléments distincts tirés au hasard. */
const tirer = <X>(t: readonly X[], k: number): X[] => melange(t).slice(0, k);
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const min = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const echap = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Les passages entre guillemets français, dans l'ordre. */
const cites = (s: string) => [...s.matchAll(/« ([^«»]+?) »/g)].map((m) => m[1]);
const g = (s: string) => `« ${s} »`;
/** Deux ou trois leurres : la taille des choix varie, comme dans le reste du coach. */
const nbLeurres = () => (Math.random() < 0.7 ? 3 : 2);
// ⚠️ Pas de « y » : on écrit « de Yanis », « de Yasmine ».
const VOYELLE = /^[aeiouàâäéèêëîïôöûüœæh]/i;

/** Remplit les jetons d'une phrase de table avec un prénom. */
function remplir(t: string, n: Prenom): string {
  return t
    .replace(/%dP/g, VOYELLE.test(n.p) ? "d'" + n.p : "de " + n.p)
    .replace(/%qP/g, VOYELLE.test(n.p) ? "qu'" + n.p : "que " + n.p)
    .replace(/%P/g, n.p)
    .replace(/%Il/g, n.f ? "Elle" : "Il")
    .replace(/%il/g, n.f ? "elle" : "il")
    .replace(/%e/g, n.f ? "e" : "");
}
/** Les prénoms de la table qui, mis dans le modèle, redonnent `vue`. */
const prenomsDe = (modele: string, vue: string) => T.PRENOMS.filter((n) => remplir(modele, n) === vue);
/** Le modèle de la table (et le prénom) qui redonne `vue`, ou null. */
function retrouver(table: readonly string[], vue: string): { modele: string; n: Prenom | null } | null {
  for (const m of table) {
    if (!m.includes("%")) {
      if (m === vue) return { modele: m, n: null };
      continue;
    }
    const n = prenomsDe(m, vue)[0];
    if (n) return { modele: m, n };
  }
  return null;
}

const LETTRE = "A-Za-zÀ-ÖØ-öø-ÿœŒ";
const mots = (s: string): string[] => [...(s.match(new RegExp(`[${LETTRE}]+`, "g")) ?? [])];
const memeMot = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();

const MOTS_OUTILS = new Set(
  "alors après avant avoir autre autres comme dans depuis encore entre leurs mais même parce pendant plus pour quand quelle quelles quels sans sous toujours toutes trois très votre cette elles phrase texte copie modèle".split(
    " ",
  ),
);
const H_ASPIRE = /^(hibou|héros|hérisson|hamster|haricot|hockey|handball|haut|hache|hanche|hall|halte|hasard|hutte)/i;

/**
 * Contrôles de langue sur des textes qui doivent être JUSTES (jamais sur une
 * version fautive exprès) : élisions (« de Arthur », « parce que on »,
 * « casqu'et »), articles non contractés (« à les »), espace avant la virgule.
 */
function langue(textes: readonly string[]): string[] {
  const p: string[] = [];
  for (const s of textes) {
    const re = /(?<![\wàâéèêëîïôûœç'-])(de|que|le|la|je|me|te|se|ne|ce|lorsque|puisque|jusque) ([A-Za-zÀ-ÿœ]+)/gi;
    for (const e of s.matchAll(re)) {
      const suiv = e[2];
      if (!VOYELLE.test(suiv) || H_ASPIRE.test(suiv) || /^(onze|onzième|huit|huitième)$/i.test(suiv)) continue;
      if (/^(le|la)$/i.test(e[1]) && /^(un|une|on|y)$/i.test(suiv)) continue;
      if (/^(le|la)$/i.test(e[1]) && /^(à|a|aux?|en|avec|au|où|ou|et|est)$/i.test(suiv)) continue;
      if (/^ce$/i.test(e[1]) && /^(à|a)$/i.test(suiv)) continue;
      p.push(`élision oubliée : « ${e[0]} » dans « ${s} »`);
    }
    if (/\bsi (il|ils)\b/.test(s)) p.push(`élision oubliée (« s'il ») dans « ${s} »`);
    if (/(?<![\wàâéèêëîïôûœç])(à|de) (le|les) [a-zàâéèêîôû]/.test(s))
      p.push(`article non contracté (« au », « aux », « du », « des ») dans « ${s} »`);
    if (/[A-Za-zéè]'\s|[A-Za-z]'[bcdfgjklmnpqrstvwxzBCDFGJKLMNPQRSTVWXZ]/.test(s))
      p.push(`apostrophe mal placée dans « ${s} »`);
    for (const e of s.matchAll(/([a-zàâéèêîôûç]+)qu'/gi))
      if (!/^(lors|puis|jus|quoi|pres)$/i.test(e[1])) p.push(`élision suspecte (« casqu'et ») dans « ${s} »`);
    if (/ [,.]/.test(s)) p.push(`espace avant la ponctuation dans « ${s} »`);
    if (/[^ «]\?|[^ «]!(?!\S)/.test(s)) p.push(`il manque l'espace avant « ? » ou « ! » dans « ${s} »`);
  }
  return p;
}

/** Un même mot plein dans deux phrases voisines (hors `permis` et prénoms). */
function repetitions(texte: string, permis: readonly string[] = []): string[] {
  const ex = new Set(permis.flatMap((x) => x.toLowerCase().split(/[\s'-]+/)));
  const phrases = texte.split(/(?<=[.!?])\s+/);
  const motsDe = (s: string) =>
    new Set(
      (s.toLowerCase().match(/[a-zàâäéèêëîïôöûüœç]{5,}/g) ?? []).filter(
        (m) => !MOTS_OUTILS.has(m) && !ex.has(m) && !T.PRENOMS.some((n) => n.p.toLowerCase() === m),
      ),
    );
  const p: string[] = [];
  for (let k = 1; k < phrases.length; k++) {
    const a = motsDe(phrases[k - 1]);
    for (const m of motsDe(phrases[k])) if (a.has(m)) p.push(`« ${m} » répété dans deux phrases voisines`);
  }
  return p;
}

/** Assemble une micro : une brique au hasard ; le correcteur confie la question à la brique qui la reconnaît. */
function micro(briques: readonly Brique[]): GenerateurFrancais {
  return {
    generer: () => hasard(briques).generer(),
    corriger: (q) => {
      const candidates = briques.filter((b) => b.reconnait(q));
      if (!candidates.length) return ["aucune forme de question connue ne reconnaît ce texte"];
      const avis = candidates.map((b) => b.corriger(q));
      return avis.find((a) => !a.length) ?? avis[0];
    },
  };
}

// ════════════════════════════════════════════════════════════════════════
// 1. LA COPIE (ecriture_main)
// ════════════════════════════════════════════════════════════════════════

const SANS_ACCENT: Record<string, string> = { é: "e", è: "e", ê: "e", à: "a", â: "a", î: "i", ô: "o", û: "u", ç: "c" };

type Variante = { v: string; type: string; unMot: boolean };

/** Toutes les copies fautives d'un modèle, à UNE faute près. `unMot` : la faute touche un seul mot. */
function variantes(m: string): Variante[] {
  const r: Variante[] = [];
  for (let i = 0; i < m.length; i++) {
    const c = SANS_ACCENT[m[i]];
    if (c) r.push({ v: m.slice(0, i) + c + m.slice(i + 1), type: "accent", unMot: true });
  }
  for (const d of m.matchAll(/([bcdfglmnprst])\1/g))
    r.push({ v: m.slice(0, d.index!) + m.slice(d.index! + 1), type: "double", unMot: true });
  for (const w of m.matchAll(new RegExp(`[${LETTRE}]{5,}`, "g"))) {
    const mot = w[0];
    const debut = w.index!;
    for (let j = 1; j < mot.length - 2; j++) {
      if (mot[j] === mot[j + 1]) continue;
      const inv = mot.slice(0, j) + mot[j + 1] + mot[j] + mot.slice(j + 2);
      r.push({ v: m.slice(0, debut) + inv + m.slice(debut + mot.length), type: "inversion", unMot: true });
    }
    for (let j = 1; j < mot.length - 1; j++) {
      if (mot[j] === mot[j - 1] || mot[j] === mot[j + 1]) continue;
      const oubli = mot.slice(0, j) + mot.slice(j + 1);
      r.push({ v: m.slice(0, debut) + oubli + m.slice(debut + mot.length), type: "lettre", unMot: true });
    }
  }
  // ⚠️ Pas de faute de majuscule ici : les règles communes comparent les choix
  // sans la casse, « la bibliothèque… » y vaut « La bibliothèque… ».
  r.push({ v: m.replace(/\.$/, ""), type: "point", unMot: false });
  const ws = m.split(" ");
  for (let k = 1; k < ws.length - 1; k++)
    if (!/[.!?]$/.test(ws[k])) r.push({ v: [...ws.slice(0, k), ...ws.slice(k + 1)].join(" "), type: "mot", unMot: false });
  return r.filter((x) => x.v !== m);
}
const estVariante = (m: string, w: string) => variantes(m).some((x) => x.v === w);

/** Un modèle rempli : une phrase (ou deux pour le défi), prénoms différents. */
function tirerModele(deux: boolean): string {
  for (;;) {
    const [a, b] = tirer(T.MODELES_COPIE, 2);
    const [n1, n2] = tirer(T.PRENOMS, 2);
    const m = deux ? `${remplir(a, n1)} ${remplir(b, n2)}` : remplir(a, n1);
    if (!repetitions(m).length) return m;
  }
}
/** Relit un modèle cité : chaque phrase vient de la table. */
function modeleConnu(m: string): boolean {
  const ph = m.split(/(?<=\.)\s+/);
  return ph.length <= 2 && ph.every((x) => retrouver(T.MODELES_COPIE, x) !== null);
}

const TOURNURES_COPIE_EXACTE = [
  "Recopie cette phrase : %M Quelle copie est sans faute ?",
  "%P doit recopier : %M Quelle copie est exacte ?",
  "Voici le modèle : %M Quelle copie est identique au modèle ?",
  "Le professeur a écrit au tableau : %M Quelle copie ne contient aucune erreur ?",
] as const;
const RE_COPIE_EXACTE = /(Quelle copie est sans faute|Quelle copie est exacte|Quelle copie est identique au modèle|Quelle copie ne contient aucune erreur) \?$/;

/** Brique : « Quelle copie est sans faute ? ». `defi` : deux phrases, fautes d'un seul mot. */
function briqueCopieExacte(defi: boolean): Brique {
  return {
    generer() {
      const m = tirerModele(defi);
      const n = hasard(T.PRENOMS);
      const pool = variantes(m).filter((x) => !defi || x.unMot);
      // Des fautes de types différents : la copie fautive ne se repère pas toujours au même endroit.
      const parType = new Map<string, Variante[]>();
      for (const x of pool) parType.set(x.type, [...(parType.get(x.type) ?? []), x]);
      const types = tirer([...parType.keys()], nbLeurres());
      const wrongs = types.map((t) => hasard(parType.get(t)!).v);
      return {
        text: hasard(TOURNURES_COPIE_EXACTE).replace("%M", g(m)).replace("%P", n.p),
        correct: m,
        wrongs,
        methode: "Compare mot par mot avec le modèle : accents, lettres doubles, majuscule et point.",
      };
    },
    reconnait: (q) => RE_COPIE_EXACTE.test(q.text) && cites(q.text).length === 1 && (q.correct.split(". ").length === 2) === defi,
    corriger(q) {
      const p: string[] = [];
      const m = cites(q.text)[0];
      if (!modeleConnu(m)) p.push(`le modèle « ${m} » ne vient pas de la table`);
      if (q.correct !== m) p.push("la bonne réponse n'est pas le modèle recopié à l'identique");
      if (!/^[A-ZÀ-Ý]/.test(m) || !/\.$/.test(m)) p.push("le modèle lui-même n'a pas sa majuscule ou son point");
      for (const w of q.wrongs) {
        if (w === m) p.push(`le leurre « ${w} » est une copie exacte`);
        else if (!estVariante(m, w)) p.push(`le leurre « ${w} » n'est pas le modèle à une faute près`);
      }
      return [...p, ...langue([q.text, q.correct, q.methode ?? ""]), ...repetitions(m)];
    },
  };
}

const TOURNURES_MOT_MAL_COPIE = [
  "Modèle : %M Copie %dP : %C Quel mot %P a-t-%il mal copié ?",
  "%P a recopié %M ainsi : %C Quel mot contient une erreur ?",
  "Voici le modèle %M et la copie %dP %C Quel mot faut-il corriger dans la copie ?",
] as const;
const RE_MOT_MAL_COPIE = /(Quel mot \S+ a-t-(il|elle) mal copié|Quel mot contient une erreur|Quel mot faut-il corriger dans la copie) \?$/;

/** Brique : la copie a UNE faute ; quel mot ? Les leurres sont des mots bien copiés. */
function briqueMotMalCopie(defi: boolean): Brique {
  return {
    generer() {
      for (;;) {
        const m = tirerModele(defi);
        const n = hasard(T.PRENOMS);
        const tm = mots(m);
        const ok = variantes(m).filter((x) => {
          if (!x.unMot) return false;
          const tc = mots(x.v);
          if (tc.length !== tm.length) return false;
          const diff = tc.findIndex((w, i) => w !== tm[i]);
          return diff >= 0 && !tm.some((w) => memeMot(w, tc[diff]));
        });
        if (!ok.length) continue;
        const x = hasard(ok);
        const tc = mots(x.v);
        const fautif = tc.find((w, i) => w !== tm[i])!;
        const bons = [...new Set(tc.filter((w) => w.length >= 3 && !memeMot(w, fautif) && tm.some((u) => u === w)))];
        const parMin = new Map(bons.map((w) => [w.toLowerCase(), w]));
        const wrongs = tirer([...parMin.values()], nbLeurres());
        if (wrongs.length < 2) continue;
        const t = hasard(TOURNURES_MOT_MAL_COPIE);
        return {
          text: remplir(t.replace("%M", g(m)).replace("%C", g(x.v)), n),
          correct: fautif,
          wrongs,
          methode: "Lis la copie mot par mot en suivant le modèle du doigt.",
        };
      }
    },
    reconnait: (q) => RE_MOT_MAL_COPIE.test(q.text) && cites(q.text).length === 2 && (cites(q.text)[0].split(". ").length === 2) === defi,
    corriger(q) {
      const p: string[] = [];
      const [m, c] = cites(q.text);
      if (!modeleConnu(m)) p.push(`le modèle « ${m} » ne vient pas de la table`);
      if (!estVariante(m, c)) p.push("la copie n'est pas le modèle à une faute près");
      const tm = mots(m);
      const tc = mots(c);
      if (tm.length !== tc.length) p.push("la copie n'a pas le même nombre de mots que le modèle");
      const diffs = tc.map((w, i) => (w !== tm[i] ? w : null)).filter((w): w is string => w !== null);
      if (diffs.length !== 1) p.push(`${diffs.length} mots diffèrent entre modèle et copie (il en faut un)`);
      if (q.correct !== diffs[0]) p.push(`la bonne réponse « ${q.correct} » n'est pas le mot fautif de la copie`);
      if (tm.some((w) => memeMot(w, q.correct))) p.push(`« ${q.correct} » s'écrit aussi ainsi dans le modèle`);
      for (const w of q.wrongs) {
        if (!tc.includes(w)) p.push(`le leurre « ${w} » n'est pas dans la copie`);
        if (!tm.includes(w)) p.push(`le leurre « ${w} » est mal copié lui aussi`);
      }
      const texteSansCopie = q.text.replace(g(c), "");
      return [...p, ...langue([texteSansCopie, q.methode ?? ""]), ...repetitions(m)];
    },
  };
}

// ════════════════════════════════════════════════════════════════════════
// 2. LES CODES DE L'ÉCRIT (mise en forme, codes, normes)
// ════════════════════════════════════════════════════════════════════════

const SIGNES = {
  q: "un point d'interrogation",
  e: "un point d'exclamation",
  a: "un point",
  v: "une virgule",
  d: "deux points",
} as const;
/** Le type d'une phrase, relu sur ses MARQUES (jamais sur la table d'origine). */
function typeDePhrase(s: string): "q" | "e" | "a" {
  if (/-(tu|vous|il|elle|on|ils|elles|nous)\b/.test(s) || /^(Est-ce|Où|Quand|Pourquoi|Comment|Combien)(?=[\s-])/.test(s)) return "q";
  if (/^(Comme|Quel|Quelle|Quels|Quelles)(?=\s)/.test(s)) return "e";
  return "a";
}
/** Les leurres permis : jamais un signe qui pourrait se défendre (« ! » après une affirmation). */
const LEURRES_SIGNE = { q: [SIGNES.a, SIGNES.e, SIGNES.v], e: [SIGNES.q, SIGNES.v, SIGNES.d], a: [SIGNES.q, SIGNES.v, SIGNES.d] };

const TOURNURES_SIGNE = [
  "Quel signe faut-il à la fin de cette phrase ? %S",
  "%P a oublié la fin de sa phrase : %S Quel signe faut-il ajouter ?",
  "Il manque un signe à la fin : %S Lequel ?",
  "Comment terminer cette phrase ? %S",
] as const;
const RE_SIGNE = /^(Quel signe faut-il à la fin de cette phrase \?|\S+ a oublié la fin de sa phrase :|Il manque un signe à la fin :|Comment terminer cette phrase \?)/;

const briqueSigneFinal: Brique = {
  generer() {
    const [n1, n2] = tirer(T.PRENOMS, 2);
    const type = hasard(["q", "e", "a"] as const);
    const table = type === "q" ? T.PHRASES_QUESTION : type === "e" ? T.PHRASES_EXCLAMATION : T.PHRASES_AFFIRMATION;
    const s = remplir(hasard(table), n1);
    return {
      text: remplir(hasard(TOURNURES_SIGNE), n2).replace("%S", g(s)),
      correct: SIGNES[type],
      wrongs: tirer(LEURRES_SIGNE[type], nbLeurres()),
      methode: "Une question finit par « ? », une exclamation par « ! », une affirmation par un point.",
    };
  },
  reconnait: (q) => RE_SIGNE.test(q.text) && cites(q.text).length === 1,
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0];
    if (/[.!?]$/.test(s)) p.push("la phrase citée a déjà son signe de fin");
    const connue = [T.PHRASES_QUESTION, T.PHRASES_EXCLAMATION, T.PHRASES_AFFIRMATION].some((t) => retrouver(t, s));
    if (!connue) p.push(`la phrase « ${s} » ne vient pas des tables`);
    const type = typeDePhrase(s);
    if (q.correct !== SIGNES[type]) p.push(`la phrase est de type « ${type} » : il faut ${SIGNES[type]}, pas ${q.correct}`);
    for (const w of q.wrongs) if (!LEURRES_SIGNE[type].includes(w as never)) p.push(`le leurre « ${w} » pourrait se défendre ou n'est pas un signe`);
    return [...p, ...langue([q.text, q.methode ?? ""])];
  },
};

const TOURNURES_MAJUSCULE = [
  "Dans cette phrase, un mot devrait commencer par une majuscule : %S Lequel ?",
  "%P a oublié une majuscule : %S Quel mot faut-il corriger ?",
  "Quel mot de cette phrase doit prendre une majuscule ? %S",
] as const;
const RE_MAJUSCULE = /(un mot devrait commencer par une majuscule|a oublié une majuscule|doit prendre une majuscule)/;
const estNomPropre = (w: string) =>
  T.LIEUX.some((l) => memeMot(l, w)) || T.PRENOMS.some((n) => memeMot(n.p, w));
const motsEspaces = (s: string) => s.split(" ").map((w) => w.replace(/[.,!?]+$/, ""));

const briqueMajuscule: Brique = {
  generer() {
    for (;;) {
      const [n1, n2] = tirer(T.PRENOMS, 2);
      const lieu = hasard(T.LIEUX);
      const juste = remplir(hasard(T.PHRASES_LIEU), n1).replace("%L", lieu);
      const ws = motsEspaces(juste);
      // Le mot fautif : le lieu, ou le prénom s'il n'ouvre pas la phrase.
      const cibles = [lieu, ...(ws[0] === n1.p ? [] : [n1.p])].filter((c) => ws.includes(c));
      const cible = hasard(cibles);
      const fautive = juste.replace(new RegExp(`(?<![${LETTRE}'])${echap(cible)}(?![${LETTRE}])`), cible.toLowerCase());
      const autres = [...new Set(ws.slice(1).filter((w) => w.length >= 4 && !w.includes("'") && !estNomPropre(w)))];
      const wrongs = tirer(autres, nbLeurres());
      if (wrongs.length < 2) continue;
      return {
        text: remplir(hasard(TOURNURES_MAJUSCULE), n2).replace("%S", g(fautive)),
        correct: cible.toLowerCase(),
        wrongs,
        methode: "Les noms propres (prénoms, villes, pays) prennent toujours une majuscule.",
      };
    }
  },
  reconnait: (q) => RE_MAJUSCULE.test(q.text) && cites(q.text).length === 1,
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0];
    const ws = motsEspaces(s);
    if (!/^[A-ZÀ-Ý]/.test(s)) p.push("la phrase citée ne commence pas par une majuscule");
    const enMinuscule = ws.filter((w) => estNomPropre(w) && w === w.toLowerCase());
    if (enMinuscule.length !== 1) p.push(`${enMinuscule.length} noms propres sans majuscule dans la phrase (il en faut un)`);
    if (q.correct !== enMinuscule[0]) p.push(`la bonne réponse « ${q.correct} » n'est pas le nom propre sans majuscule`);
    for (const w of q.wrongs) {
      if (!ws.includes(w)) p.push(`le leurre « ${w} » n'est pas dans la phrase`);
      if (estNomPropre(w)) p.push(`le leurre « ${w} » est un nom propre`);
    }
    const reparee = s.replace(new RegExp(`(?<![${LETTRE}'])${echap(q.correct)}(?![${LETTRE}])`), maj(q.correct));
    return [...p, ...langue([q.text.replace(g(s), g(reparee)), q.methode ?? ""])];
  },
};

/** L'énumération juste : « a, b, c et d ». */
const enumerer = (items: readonly string[]) => `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;

const TOURNURES_ENUM = [
  "Quelle phrase est bien ponctuée ?",
  "Dans quelle phrase les virgules sont-elles bien placées ?",
  "%P écrit une liste dans une phrase. Quelle phrase est correcte ?",
] as const;
const RE_ENUM = /^(Quelle phrase est bien ponctuée \?|Dans quelle phrase les virgules sont-elles bien placées \?|\S+ écrit une liste dans une phrase\. Quelle phrase est correcte \?)$/;
const sansVirgules = (s: string) => s.replace(/,/g, "").replace(/\s+/g, " ");

const briqueEnumeration: Brique = {
  generer() {
    const [n1, n2] = tirer(T.PRENOMS, 2);
    const e = hasard(T.ENUMERATIONS);
    const k = Math.random() < 0.5 ? 3 : 4;
    const items = tirer(e.items, k);
    const debut = remplir(e.debut, n1);
    const correct = `${debut} ${enumerer(items)}.`;
    const fautes = [
      `${debut} ${items.slice(0, -1).join(" ")} et ${items[k - 1]}.`, // aucune virgule
      `${debut}, ${enumerer(items)}.`, // virgule entre le verbe et la liste
      `${debut} ${items.slice(0, -1).join(", ")}, et ${items[k - 1]}.`, // virgule devant « et »
      ...(k === 4 ? [`${debut} ${items[0]} ${items[1]}, ${items[2]} et ${items[3]}.`] : []), // une virgule oubliée
    ];
    return {
      text: remplir(hasard(TOURNURES_ENUM), n2),
      correct,
      wrongs: tirer(fautes, nbLeurres()),
      methode: "Dans une liste, une virgule sépare chaque élément, et « et » relie les deux derniers.",
    };
  },
  reconnait: (q) => RE_ENUM.test(q.text),
  corriger(q) {
    const p: string[] = [];
    let trouve = false;
    for (const e of T.ENUMERATIONS)
      for (const n of T.PRENOMS) {
        const debut = remplir(e.debut, n);
        if (!q.correct.startsWith(debut + " ")) continue;
        const reste = q.correct.slice(debut.length + 1, -1).split(/, | et /);
        if (reste.length >= 3 && reste.every((x) => e.items.includes(x)) && q.correct === `${debut} ${enumerer(reste)}.`)
          trouve = true;
      }
    if (!trouve) p.push("la bonne réponse n'est pas une énumération juste de la table");
    for (const w of q.wrongs) {
      if (w === q.correct) p.push("un leurre est la bonne réponse");
      if (sansVirgules(w) !== sansVirgules(q.correct)) p.push(`le leurre « ${w} » change autre chose que les virgules`);
    }
    return [...p, ...langue([q.text, q.correct, q.methode ?? ""])];
  },
};

const TOURNURES_PAROLES = [
  "Quelle phrase rapporte bien les paroles %dP ?",
  "%P parle. Quelle phrase est bien écrite ?",
  "Comment écrire correctement ce que dit %P ?",
] as const;
const RE_PAROLES = /^(Quelle phrase rapporte bien les paroles (de |d')\S+ \?|\S+ parle\. Quelle phrase est bien écrite \?|Comment écrire correctement ce que dit \S+ \?)$/;
const sansSignesParoles = (s: string) => s.replace(/[:«»]/g, "").replace(/\s+/g, " ").trim();

const briqueParoles: Brique = {
  generer() {
    const n = hasard(T.PRENOMS);
    const { verbe, replique } = hasard(T.PAROLES);
    const correct = `${n.p} ${verbe} : « ${replique} »`;
    const fautes = [
      `${n.p} ${verbe} « ${replique} »`, // les deux-points oubliés
      `${n.p} ${verbe} : ${replique}`, // les guillemets oubliés
      `« ${n.p} ${verbe} : ${replique} »`, // les guillemets autour de toute la phrase
    ];
    return {
      text: remplir(hasard(TOURNURES_PAROLES), n),
      correct,
      wrongs: tirer(fautes, nbLeurres()),
      methode: "On annonce les paroles par deux points, puis on les met entre guillemets.",
    };
  },
  reconnait: (q) => RE_PAROLES.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const n = T.PRENOMS.find((x) => q.text.includes(x.p));
    const ok = T.PAROLES.some((x) => n && q.correct === `${n.p} ${x.verbe} : « ${x.replique} »`);
    if (!ok) p.push("la bonne réponse n'est pas « prénom + verbe : « paroles » »");
    for (const w of q.wrongs) {
      if (w === q.correct) p.push("un leurre est la bonne réponse");
      if (sansSignesParoles(w) !== sansSignesParoles(q.correct)) p.push(`le leurre « ${w} » change autre chose que la ponctuation`);
    }
    return [...p, ...langue([q.text, q.correct, q.methode ?? ""])];
  },
};

// ════════════════════════════════════════════════════════════════════════
// 3. LE BROUILLON ET LA RÉVISION (ecriture_reviser)
// ════════════════════════════════════════════════════════════════════════

/** Le récit dont les notes contiennent toutes celles-ci (un seul attendu). */
const recitsDesNotes = (notes: readonly string[]) => T.RECITS.filter((r) => notes.every((n) => r.notes.includes(n)));
const memeOrdre = (a: readonly string[], b: readonly string[]) => a.length === b.length && a.every((x, i) => x === b[i]);

const TOURNURES_ORDRE = [
  "Sur son brouillon, %P a noté ses idées dans le désordre : %N Laquelle doit venir %Q ?",
  "%P prépare un récit. Voici ses idées en vrac : %N Quelle idée placer %Q ?",
  "Pour organiser son texte, %P range ses idées : %N Quelle idée vient %Q ?",
] as const;
const RE_ORDRE = /(dans le désordre|en vrac|range ses idées) :.*(en premier|en dernier) \?$/;

const briqueOrdreIdees: Brique = {
  generer() {
    const r = hasard(T.RECITS);
    let vrac = melange(r.notes);
    while (memeOrdre(vrac, r.notes)) vrac = melange(r.notes);
    const premier = Math.random() < 0.5;
    const correct = premier ? r.notes[0] : r.notes[3];
    return {
      text: remplir(hasard(TOURNURES_ORDRE), hasard(T.PRENOMS))
        .replace("%N", vrac.map(g).join(", "))
        .replace("%Q", premier ? "en premier" : "en dernier"),
      correct,
      wrongs: tirer(r.notes.filter((n) => n !== correct), nbLeurres()),
      methode: premier
        ? "Le début d'un récit présente la situation, avant le problème."
        : "La fin d'un récit dit comment le problème se termine.",
    };
  },
  reconnait: (q) => RE_ORDRE.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const vrac = cites(q.text);
    const rs = recitsDesNotes(vrac);
    if (vrac.length !== 4 || rs.length !== 1) return ["les idées citées ne sont pas les quatre notes d'un seul récit"];
    const r = rs[0];
    if (memeOrdre(vrac, r.notes)) p.push("les idées sont déjà dans l'ordre : le « désordre » est faux");
    const attendu = /en premier \?$/.test(q.text) ? r.notes[0] : r.notes[3];
    if (q.correct !== attendu) p.push(`il faut « ${attendu} », pas « ${q.correct} »`);
    for (const w of q.wrongs) if (!vrac.includes(w) || w === attendu) p.push(`le leurre « ${w} » n'est pas une autre idée du brouillon`);
    return [...p, ...langue([q.text, q.methode ?? ""])];
  },
};

const TOURNURES_INTRUS_NOTE = [
  "Voici le brouillon %dP : %N Quelle idée n'a rien à faire dans ce récit ?",
  "%P a noté ses idées : %N Laquelle vient d'une autre histoire ?",
  "Dans ce plan, une idée est en trop : %N Laquelle ?",
] as const;
const RE_INTRUS_NOTE = /(n'a rien à faire dans ce récit|vient d'une autre histoire|une idée est en trop)/;

const briqueIntrusNote: Brique = {
  generer() {
    const [r, autre] = tirer(T.RECITS, 2);
    const intrus = autre.notes[1 + Math.floor(Math.random() * 2)];
    const gardees = tirer([0, 1, 2, 3], 3).sort().map((i) => r.notes[i]);
    const pos = Math.floor(Math.random() * 4);
    const plan = [...gardees.slice(0, pos), intrus, ...gardees.slice(pos)];
    return {
      text: remplir(hasard(TOURNURES_INTRUS_NOTE), hasard(T.PRENOMS)).replace("%N", plan.map(g).join(", ")),
      correct: intrus,
      wrongs: tirer(gardees, nbLeurres()),
      methode: "Toutes les idées d'un brouillon parlent de la même histoire : cherche celle qui parle d'autre chose.",
    };
  },
  reconnait: (q) => RE_INTRUS_NOTE.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const plan = cites(q.text);
    if (plan.length !== 4 || !plan.includes(q.correct)) p.push("la bonne réponse n'est pas une idée du plan");
    const autres = plan.filter((n) => n !== q.correct);
    const rs = recitsDesNotes(autres);
    if (rs.length !== 1) p.push("les autres idées ne viennent pas d'un seul récit");
    else if (rs[0].notes.includes(q.correct)) p.push("l'intrus appartient au même récit");
    else if (!T.RECITS.some((r) => r.notes.includes(q.correct))) p.push("l'intrus ne vient d'aucun récit");
    for (const w of q.wrongs) if (!autres.includes(w)) p.push(`le leurre « ${w} » n'est pas une idée du récit`);
    return [...p, ...langue([q.text, q.methode ?? ""])];
  },
};

// Les répétitions du prénom : « Léa prend son sac. Léa part à l'école. »
const TOURNURES_REPETITION = [
  "%Q a écrit : %S Quelle version évite la répétition ?",
  "Dans ce brouillon, un prénom est répété : %S Quelle version est meilleure ?",
  "Comment améliorer ces deux phrases ? %S",
] as const;
const RE_REPETITION = /(Quelle version évite la répétition|un prénom est répété|Comment améliorer ces deux phrases)/;
const pronom = (f: boolean) => (f ? "Elle" : "Il");

const briqueRepetitionPrenom: Brique = {
  generer() {
    const [n, auteur] = tirer(T.PRENOMS, 2);
    const [a, b] = hasard(T.DEUX_ACTIONS);
    const brouillon = `${n.p} ${a} ${n.p} ${b}`;
    const fautes = [
      `${n.p} ${a} ${pronom(!n.f)} ${b}`, // le pronom du mauvais genre
      `${pronom(n.f)} ${a} ${n.p} ${b}`, // le pronom avant le prénom
      `${n.p} ${a} Ils ${b}`, // un pluriel
    ];
    return {
      text: hasard(TOURNURES_REPETITION).replace("%Q", auteur.p).replace("%S", g(brouillon)),
      correct: `${n.p} ${a} ${pronom(n.f)} ${b}`,
      wrongs: tirer(fautes, nbLeurres()),
      methode: "On nomme le personnage d'abord, puis on le reprend par un pronom du même genre.",
    };
  },
  reconnait: (q) => RE_REPETITION.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0] ?? "";
    const paire = T.DEUX_ACTIONS.find(([a, b]) => T.PRENOMS.some((n) => s === `${n.p} ${a} ${n.p} ${b}`));
    const n = T.PRENOMS.find((x) => paire && s === `${x.p} ${paire[0]} ${x.p} ${paire[1]}`);
    if (!paire || !n) return ["le brouillon cité ne répète pas un prénom de la table"];
    const [a, b] = paire;
    if (q.correct !== `${n.p} ${a} ${pronom(n.f)} ${b}`) p.push("la bonne réponse ne reprend pas le prénom par le bon pronom");
    for (const w of q.wrongs) {
      const defauts = [
        w === `${n.p} ${a} ${pronom(!n.f)} ${b}`,
        w === `${pronom(n.f)} ${a} ${n.p} ${b}`,
        w === `${n.p} ${a} Ils ${b}`,
      ];
      if (!defauts.some(Boolean)) p.push(`le leurre « ${w} » n'a pas de défaut reconnu`);
    }
    return [...p, ...langue([q.text, q.correct, q.methode ?? ""])];
  },
};

// Les reprises nominales : « Le chaton… L'animal… »
const TOURNURES_REPRISE = [
  "Lis : %S Par quoi remplacer « %G » dans la deuxième phrase ?",
  "Pour éviter de répéter « %G », quel groupe convient dans la deuxième phrase ? %S",
  "%P se relit : %S Quelle reprise évite la répétition de « %G » ?",
] as const;
const RE_REPRISE = /(Par quoi remplacer|Pour éviter de répéter|Quelle reprise évite la répétition)/;

const catVoisines = (a: string, b: string) => a === b || T.CATEGORIES_VOISINES.some((g) => g.includes(a) && g.includes(b));

const briqueRepriseNominale: Brique = {
  generer() {
    const r = hasard(T.REPRISES);
    const correct = hasard(r.reprises);
    const autresCats = [...new Set(T.REPRISES.filter((x) => !catVoisines(x.cat, r.cat)).map((x) => x.cat))];
    const wrongs = tirer(autresCats, nbLeurres()).map((c) => hasard(T.REPRISES.filter((x) => x.cat === c)).reprises[0]);
    const s = `${r.gn} ${r.actions[0]} ${r.gn} ${r.actions[1]}`;
    return {
      text: remplir(hasard(TOURNURES_REPRISE), hasard(T.PRENOMS)).replace("%S", g(s)).replace(/%G/g, r.gn),
      correct,
      wrongs,
      methode: "La reprise désigne la même chose avec d'autres mots : un animal reste un animal, un outil un outil.",
    };
  },
  reconnait: (q) => RE_REPRISE.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const r = T.REPRISES.find((x) => cites(q.text).includes(`${x.gn} ${x.actions[0]} ${x.gn} ${x.actions[1]}`));
    if (!r) return ["les deux phrases citées ne viennent pas de la table des reprises"];
    if (!r.reprises.includes(q.correct)) p.push(`« ${q.correct} » ne reprend pas « ${r.gn} »`);
    for (const w of q.wrongs) {
      const cats = T.REPRISES.filter((x) => x.reprises.includes(w)).map((x) => x.cat);
      if (!cats.length) p.push(`le leurre « ${w} » n'est pas une reprise de la table`);
      if (cats.some((c) => catVoisines(c, r.cat))) p.push(`le leurre « ${w} » est de la même catégorie (${r.cat}) : il pourrait convenir`);
    }
    return [...p, ...langue([q.text, q.methode ?? ""])];
  },
};

// Les connecteurs logiques : cause, conséquence, opposition.
const lier = (c: string, b: string) => (c === "parce que" && VOYELLE.test(b) && !H_ASPIRE.test(b) ? `parce qu'${b}` : `${c} ${b}`);
const TOURNURES_LIEN = [
  "Quel mot manque ? %S",
  "Complète la phrase avec le bon connecteur : %S",
  "%P hésite sur le mot qui relie les deux idées : %S Lequel choisir ?",
] as const;
const RE_LIEN = /(Quel mot manque \?|Complète la phrase avec le bon connecteur :|hésite sur le mot qui relie les deux idées)/;
const familleDe = (c: string) => (Object.keys(T.CONNECTEURS) as T.Relation[]).find((k) => (T.CONNECTEURS[k] as readonly string[]).includes(c));

const briqueConnecteur: Brique = {
  generer() {
    const [n1, n2] = tirer(T.PRENOMS, 2);
    const l = hasard(T.LIENS);
    const autres = (Object.keys(T.CONNECTEURS) as T.Relation[]).filter((k) => k !== l.rel);
    const pool = autres.flatMap((k) => T.CONNECTEURS[k] as readonly string[]);
    // Un leurre de chaque autre famille d'abord, puis un troisième au hasard.
    const deux = autres.map((k) => hasard(T.CONNECTEURS[k] as readonly string[]));
    const k = nbLeurres();
    const wrongs = k === 2 ? deux : [...deux, hasard(pool.filter((c) => !deux.includes(c)))];
    return {
      text: remplir(hasard(TOURNURES_LIEN), n2).replace("%S", g(`${remplir(l.a, n1)} … ${remplir(l.b, n1)}.`)),
      correct: hasard(T.CONNECTEURS[l.rel] as readonly string[]),
      wrongs,
      methode: "Demande-toi si la 2e idée donne la cause, la conséquence, ou dit le contraire de ce qu'on attend.",
    };
  },
  reconnait: (q) => RE_LIEN.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0] ?? "";
    let rel: T.Relation | null = null;
    for (const l of T.LIENS) for (const n of T.PRENOMS) if (s === `${remplir(l.a, n)} … ${remplir(l.b, n)}.`) rel = l.rel;
    if (!rel) return ["la phrase citée ne vient pas de la table des liens"];
    if (familleDe(q.correct) !== rel) p.push(`« ${q.correct} » n'exprime pas la relation « ${rel} »`);
    for (const w of q.wrongs) if (!familleDe(w) || familleDe(w) === rel) p.push(`le leurre « ${w} » convient aussi ou n'est pas un connecteur`);
    // La phrase complétée (élision « parce qu'il » comprise) doit être juste.
    const juste = s.replace(/ … (.*)\.$/, (_m, b: string) => ` ${lier(q.correct, b)}.`);
    return [...p, ...langue([q.text, juste, q.methode ?? ""])];
  },
};

// Les normes : l'accord du verbe avec le sujet.
type Accord = (typeof T.ACCORDS)[number];
const phraseAccord = (a: Accord, pluriel: boolean, faute: boolean) =>
  `${pluriel ? a.pl : a.sg} ${pluriel !== faute ? a.vpl : a.vsg} ${a.suite}.`;
/** Relit une phrase d'accord : l'entrée, le nombre du sujet, la faute éventuelle. */
function lireAccord(s: string): { a: Accord; pluriel: boolean; faute: boolean } | null {
  for (const a of T.ACCORDS)
    for (const pluriel of [false, true])
      for (const faute of [false, true]) if (phraseAccord(a, pluriel, faute) === s) return { a, pluriel, faute };
  return null;
}

const TOURNURES_ACCORD = [
  "Dans ce brouillon, quel mot est mal accordé ? %S",
  "%P se relit : %S Quel mot faut-il corriger ?",
  "Une erreur d'accord s'est glissée ici : %S Où est-elle ?",
] as const;
const RE_ACCORD = /(quel mot est mal accordé|se relit :.*Quel mot faut-il corriger|Une erreur d'accord s'est glissée)/;

const briqueAccord: Brique = {
  generer() {
    for (;;) {
      const a = hasard(T.ACCORDS);
      const pluriel = Math.random() < 0.5;
      const s = phraseAccord(a, pluriel, true);
      const verbe = pluriel ? a.vsg : a.vpl;
      const wrongs = tirer([...new Set(mots(a.suite).filter((w) => w.length >= 4))], nbLeurres());
      if (wrongs.length < 2) continue;
      return {
        text: remplir(hasard(TOURNURES_ACCORD), hasard(T.PRENOMS)).replace("%S", g(s)),
        correct: verbe,
        wrongs,
        methode: "Trouve le sujet du verbe : s'il est au pluriel, le verbe se termine par -nt.",
      };
    }
  },
  reconnait: (q) => RE_ACCORD.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0] ?? "";
    const lu = lireAccord(s);
    if (!lu) return ["la phrase citée ne vient pas de la table des accords"];
    if (!lu.faute) p.push("la phrase citée est juste : il n'y a rien à corriger");
    const fautif = lu.pluriel ? lu.a.vsg : lu.a.vpl;
    if (q.correct !== fautif) p.push(`le mot mal accordé est « ${fautif} », pas « ${q.correct} »`);
    for (const w of q.wrongs) if (!mots(lu.a.suite).includes(w)) p.push(`le leurre « ${w} » n'est pas un mot juste de la phrase`);
    return [...p, ...langue([q.text.replace(g(s), ""), phraseAccord(lu.a, lu.pluriel, false), q.methode ?? ""])];
  },
};

// Le défi : un brouillon de deux phrases, deux erreurs ; quelle version les corrige toutes ?
const TOURNURES_DEFI_REVISER = [
  "Voici un brouillon avec deux erreurs : %S Quelle version est entièrement corrigée ?",
  "%P doit corriger son brouillon : %S Quelle version ne garde aucune erreur ?",
  "Trouve la version sans erreur de ce brouillon : %S",
] as const;
const RE_DEFI_REVISER = /(deux erreurs :.*entièrement corrigée|doit corriger son brouillon|Trouve la version sans erreur de ce brouillon)/;

/** Deux phrases ; `e` = [faute d'accord en 1, faute d'accord en 2, point final oublié]. */
function brouillonDeux(a1: Accord, p1: boolean, a2: Accord, p2: boolean, e: readonly boolean[]): string {
  const s2 = phraseAccord(a2, p2, e[1]);
  return `${phraseAccord(a1, p1, e[0])} ${e[2] ? s2.slice(0, -1) : s2}`;
}
/** Relit deux phrases d'accord (la seconde peut avoir perdu son point) : le nombre d'erreurs. */
function erreursDeux(s: string): { juste: string; n: number } | null {
  const m = s.match(/^(.+?\.) (.+)$/);
  if (!m) return null;
  const sansPoint = !/\.$/.test(m[2]);
  const l1 = lireAccord(m[1]);
  const l2 = lireAccord(sansPoint ? m[2] + "." : m[2]);
  if (!l1 || !l2) return null;
  return {
    juste: `${phraseAccord(l1.a, l1.pluriel, false)} ${phraseAccord(l2.a, l2.pluriel, false)}`,
    n: Number(l1.faute) + Number(l2.faute) + Number(sansPoint),
  };
}

const briqueDefiReviser: Brique = {
  generer() {
    for (;;) {
      const [a1, a2] = tirer(T.ACCORDS, 2);
      const [p1, p2] = [Math.random() < 0.5, Math.random() < 0.5];
      const e = hasard([[true, true, false], [true, false, true], [false, true, true]] as const);
      const brouillon = brouillonDeux(a1, p1, a2, p2, e);
      if (repetitions(brouillon).length) continue;
      const correct = brouillonDeux(a1, p1, a2, p2, [false, false, false]);
      const idx = [0, 1, 2].filter((i) => e[i]);
      const partielles = idx.map((i) => brouillonDeux(a1, p1, a2, p2, e.map((x, j) => x && j !== i)));
      const fautes = [...partielles, brouillon];
      return {
        text: remplir(hasard(TOURNURES_DEFI_REVISER), hasard(T.PRENOMS)).replace("%S", g(brouillon)),
        correct,
        wrongs: tirer(fautes, nbLeurres()),
        methode: "Vérifie chaque verbe avec son sujet, puis la ponctuation de chaque phrase.",
      };
    }
  },
  reconnait: (q) => RE_DEFI_REVISER.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0] ?? "";
    const lu = erreursDeux(s);
    if (!lu) return ["le brouillon cité ne vient pas de la table des accords"];
    if (lu.n !== 2) p.push(`le brouillon a ${lu.n} erreur(s), la consigne en annonce deux`);
    if (q.correct !== lu.juste) p.push("la bonne réponse n'est pas le brouillon entièrement corrigé");
    for (const w of q.wrongs) {
      const lw = erreursDeux(w);
      if (!lw) p.push(`le leurre « ${w} » n'est pas une version du brouillon`);
      else if (lw.n === 0) p.push(`le leurre « ${w} » est sans erreur lui aussi`);
      else if (lw.juste !== lu.juste) p.push(`le leurre « ${w} » parle d'autre chose`);
    }
    return [...p, ...langue([q.text.replace(g(s), ""), q.correct, q.methode ?? ""]), ...repetitions(lu.juste)];
  },
};

// ════════════════════════════════════════════════════════════════════════
// 4. PRODUIRE UN TEXTE (ecriture_produire) : récit, cohérence, avis
// ════════════════════════════════════════════════════════════════════════

/** Une étape précédée d'un connecteur : minuscule sauf si elle s'ouvre sur le prénom. */
const apresConnecteur = (c: string, etape: string, n: Prenom) =>
  `${c}, ${etape.startsWith("%P") ? remplir(etape, n) : min(remplir(etape, n))}`;
const motsDuRecit = (r: T.Recit, s: string) => r.mots.some((m) => s.toLowerCase().includes(m.toLowerCase()));
/** Le pronom ne précède jamais le prénom dans un texte de récit. */
function pronomAvantPrenom(brut: string, n: Prenom): string[] {
  // Le « il » impersonnel (« Il y a », « il fait », « il faut ») ne renvoie à personne.
  const texte = brut.replace(/\b[Ii]l (y a|fait|faut)\b/g, (m) => "_".repeat(m.length));
  const iP = texte.indexOf(n.p);
  const iPro = texte.search(n.f ? /(?<![\wÀ-ÿ])[Ee]lle(?![\wÀ-ÿ])/ : /(?<![\wÀ-ÿ])[Ii]l(?![\wÀ-ÿ])/);
  return iPro >= 0 && (iP < 0 || iPro < iP) ? [`le pronom vient avant le prénom ${n.p}`] : [];
}

const TOURNURES_CONNECTEUR_RECIT = [
  "Quel connecteur convient à la place des points ? %R",
  "Complète le récit %dP : %R Quel mot mettre à la place des points ?",
  "Lis ce récit : %R Quel connecteur manque ?",
] as const;
const RE_CONNECTEUR_RECIT = /(Quel connecteur convient à la place des points|Quel mot mettre à la place des points|Quel connecteur manque)/;

const briqueConnecteurRecit: Brique = {
  generer() {
    const [n, auteur] = tirer(T.PRENOMS, 2);
    const r = hasard(T.RECITS);
    const debut = Math.random() < 0.5;
    const ph = r.etapes.map((e, i) =>
      i === 0 && debut ? apresConnecteur("…", e, n) : i === 3 && !debut ? apresConnecteur("…", e, n) : remplir(e, n),
    );
    return {
      text: remplir(hasard(TOURNURES_CONNECTEUR_RECIT), auteur).replace("%R", g(ph.join(" "))),
      correct: hasard(debut ? T.OUVERTURES : T.FERMETURES),
      wrongs: tirer(debut ? T.FERMETURES : T.OUVERTURES, nbLeurres()),
      methode: debut
        ? "Au début d'un récit, le connecteur installe le moment : « Un matin », « Un jour »."
        : "À la fin d'un récit, le connecteur annonce le dénouement : « Finalement », « Enfin ».",
    };
  },
  reconnait: (q) => RE_CONNECTEUR_RECIT.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0] ?? "";
    let pos = -1;
    let perso: Prenom | null = null;
    for (const r of T.RECITS)
      for (const n of T.PRENOMS)
        for (const k of [0, 3])
          if (s === r.etapes.map((e, i) => (i === k ? apresConnecteur("…", e, n) : remplir(e, n))).join(" ")) {
            pos = k;
            perso = n;
          }
    if (pos < 0 || !perso) return ["le récit cité ne vient pas de la table"];
    const bons = pos === 0 ? T.OUVERTURES : T.FERMETURES;
    const faux = pos === 0 ? T.FERMETURES : T.OUVERTURES;
    if (!bons.includes(q.correct)) p.push(`« ${q.correct} » ne convient pas ${pos === 0 ? "au début" : "à la fin"}`);
    for (const w of q.wrongs) if (!faux.includes(w)) p.push(`le leurre « ${w} » pourrait convenir`);
    const complet = s.replace("…", q.correct);
    return [...p, ...langue([q.text, complet, q.methode ?? ""]), ...pronomAvantPrenom(complet, perso)];
  },
};

const TOURNURES_FIN = [
  "Voici le début d'une histoire : %R Quelle phrase peut la terminer ?",
  "%Q écrit un récit : %R Quelle fin garde la logique de l'histoire ?",
  "Lis le début de ce récit : %R Quelle est la suite logique ?",
] as const;
const RE_FIN = /(Quelle phrase peut la terminer|Quelle fin garde la logique de l'histoire|Quelle est la suite logique)/;

const briqueFinRecit: Brique = {
  generer() {
    for (;;) {
      const [n, auteur] = tirer(T.PRENOMS, 2);
      const [r, ...autres] = tirer(T.RECITS, 4);
      const wrongs = autres.slice(0, nbLeurres()).map((a) => remplir(a.etapes[3], n));
      if (wrongs.some((w) => motsDuRecit(r, w))) continue;
      return {
        text: hasard(TOURNURES_FIN)
          .replace("%Q", auteur.p)
          .replace("%R", g(r.etapes.slice(0, 3).map((e) => remplir(e, n)).join(" "))),
        correct: remplir(r.etapes[3], n),
        wrongs,
        methode: "La fin règle le problème posé au début : elle parle des mêmes personnages et des mêmes objets.",
      };
    }
  },
  reconnait: (q) => RE_FIN.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0] ?? "";
    let trouve: { r: T.Recit; n: Prenom } | null = null;
    for (const r of T.RECITS)
      for (const n of T.PRENOMS) if (s === r.etapes.slice(0, 3).map((e) => remplir(e, n)).join(" ")) trouve = { r, n };
    if (!trouve) return ["le début cité ne vient pas de la table"];
    const { r, n } = trouve;
    if (q.correct !== remplir(r.etapes[3], n)) p.push("la bonne réponse n'est pas la fin de ce récit");
    if (!motsDuRecit(r, q.correct)) p.push("la fin ne reprend aucun mot de l'histoire : elle n'est pas reconnaissable");
    for (const w of q.wrongs) {
      const autre = T.RECITS.find((a) => a !== r && remplir(a.etapes[3], n) === w);
      if (!autre) p.push(`le leurre « ${w} » n'est la fin d'aucun autre récit`);
      if (motsDuRecit(r, w)) p.push(`le leurre « ${w} » parle de la même histoire : il pourrait convenir`);
    }
    const complet = `${s} ${q.correct}`;
    return [...p, ...langue([q.text, q.correct, q.methode ?? ""]), ...pronomAvantPrenom(complet, n), ...repetitions(complet, r.mots)];
  },
};

// La cohérence des temps.
const TOURNURES_TEMPS = [
  "Dans ce récit, une phrase n'est pas au même temps que les autres : %R Laquelle ?",
  "%Q se relit : %R Quelle phrase casse la cohérence des temps ?",
  "Quelle phrase faut-il mettre au même temps que les autres ? %R",
] as const;
const RE_TEMPS = /(n'est pas au même temps que les autres|casse la cohérence des temps|mettre au même temps que les autres)/;

const briqueTemps: Brique = {
  generer() {
    const [n, auteur] = tirer(T.PRENOMS, 2);
    const rt = hasard(T.RECITS_TEMPS);
    const base: "ps" | "pr" = Math.random() < 0.6 ? "ps" : "pr";
    const autre = base === "ps" ? "pr" : "ps";
    const k = Math.floor(Math.random() * 3);
    const ph = rt.map((x, i) => remplir(i === k ? x[autre] : x[base], n));
    return {
      text: hasard(TOURNURES_TEMPS).replace("%Q", auteur.p).replace("%R", g(ph.join(" "))),
      correct: ph[k],
      wrongs: ph.filter((_, i) => i !== k),
      methode: "Repère le verbe de chaque phrase : un récit garde le même temps du début à la fin.",
    };
  },
  reconnait: (q) => RE_TEMPS.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0] ?? "";
    const ph = s.split(/(?<=\.) /);
    let lu: { temps: ("ps" | "pr")[]; n: Prenom } | null = null;
    for (const rt of T.RECITS_TEMPS)
      for (const n of T.PRENOMS) {
        if (ph.length !== rt.length) continue;
        const temps = ph.map((x, i) => (x === remplir(rt[i].ps, n) ? "ps" : x === remplir(rt[i].pr, n) ? "pr" : null));
        if (temps.every((t) => t)) lu = { temps: temps as ("ps" | "pr")[], n };
      }
    if (!lu) return ["le récit cité ne vient pas de la table des temps"];
    const nbPs = lu.temps.filter((t) => t === "ps").length;
    if (nbPs !== 1 && nbPs !== 2) p.push("aucune phrase ne change de temps (ou toutes)");
    const minoritaire = nbPs === 1 ? "ps" : "pr";
    const attendue = ph[lu.temps.indexOf(minoritaire)];
    if (q.correct !== attendue) p.push(`la phrase qui change de temps est « ${attendue} »`);
    for (const w of q.wrongs) if (!ph.includes(w) || w === attendue) p.push(`le leurre « ${w} » n'est pas une autre phrase du récit`);
    return [...p, ...langue([q.text, q.methode ?? ""]), ...pronomAvantPrenom(s, lu.n)];
  },
};

// Donner son avis : l'argument qui appuie, l'avis et le fait.
const qu = (s: string) => (VOYELLE.test(s) && !H_ASPIRE.test(s) ? `qu'${s}` : `que ${s}`);
const TOURNURES_ARGUMENT = [
  "%P pense %A. Quel argument appuie son avis ?",
  "%P défend cette idée : %A. Quel argument l'aide ?",
  "Pour convaincre %A, quel argument %P peut-%il donner ?",
] as const;
const RE_ARGUMENT = /(Quel argument appuie son avis|Quel argument l'aide|quel argument \S+ peut-(il|elle) donner)/;

const briqueArgument: Brique = {
  generer() {
    const n = hasard(T.PRENOMS);
    const d = hasard(T.DEBATS);
    const pour = Math.random() < 0.5;
    const [avis, bons, contraires] = pour ? [d.avis, d.pour, d.contre] : [d.contraire, d.contre, d.pour];
    const t = hasard(TOURNURES_ARGUMENT);
    const leurres = [...contraires, hasard(T.NON_ARGUMENTS)];
    return {
      text: remplir(t, n).replace("%A", t.includes("cette idée") ? avis : qu(avis)),
      correct: hasard(bons),
      wrongs: tirer(leurres, nbLeurres()),
      methode: "Un bon argument donne une raison qui va dans le même sens que l'avis.",
    };
  },
  reconnait: (q) => RE_ARGUMENT.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const d = T.DEBATS.find((x) => q.text.includes(x.avis) || q.text.includes(x.contraire));
    if (!d) return ["l'avis cité ne vient pas de la table des débats"];
    const pour = q.text.includes(d.avis) && !q.text.includes(d.contraire);
    const [bons, contraires] = pour ? [d.pour, d.contre] : [d.contre, d.pour];
    if (!bons.includes(q.correct)) p.push(`« ${q.correct} » n'appuie pas cet avis`);
    for (const w of q.wrongs)
      if (!contraires.includes(w) && !T.NON_ARGUMENTS.includes(w)) p.push(`le leurre « ${w} » pourrait appuyer l'avis`);
    return [...p, ...langue([q.text, q.methode ?? ""])];
  },
};

const FORMULES_AVIS = ["Je pense que %A.", "À mon avis, %A.", "Selon moi, %A.", "Je trouve que %A."] as const;
const RE_AVIS_Q = /^(Quelle phrase donne un avis \?|Laquelle de ces phrases exprime une opinion \?)$/;
const RE_FAIT_Q = /^(Quelle phrase est un fait, et pas un avis \?|Laquelle de ces phrases n'est pas une opinion \?)$/;
const formuler = (f: string, a: string) => (f.startsWith("Je pense que") || f.startsWith("Je trouve que") ? f.replace("que %A", qu(a)) : f.replace("%A", a));
const estAvis = (s: string) => T.DEBATS.some((d) => FORMULES_AVIS.some((f) => s === formuler(f, d.avis) || s === formuler(f, d.contraire)));
const estFait = (s: string) => T.DEBATS.some((d) => d.faits.includes(s));

const briqueAvisOuFait: Brique = {
  generer() {
    const [d, e] = tirer(T.DEBATS, 2);
    const avis = (x: (typeof T.DEBATS)[number]) => formuler(hasard(FORMULES_AVIS), Math.random() < 0.5 ? x.avis : x.contraire);
    if (Math.random() < 0.5) {
      return {
        text: hasard(["Quelle phrase donne un avis ?", "Laquelle de ces phrases exprime une opinion ?"]),
        correct: avis(d),
        wrongs: tirer([...d.faits, ...e.faits], nbLeurres()),
        methode: "Un avis dit ce qu'on pense : « je pense que », « à mon avis ». Un fait se vérifie.",
      };
    }
    const avisDiff = [...new Set([avis(d), avis(e), avis(d), avis(e)])];
    return {
      text: hasard(["Quelle phrase est un fait, et pas un avis ?", "Laquelle de ces phrases n'est pas une opinion ?"]),
      correct: hasard(d.faits),
      wrongs: avisDiff.slice(0, nbLeurres()),
      methode: "Un fait se vérifie ; un avis dit ce qu'une personne pense.",
    };
  },
  reconnait: (q) => RE_AVIS_Q.test(q.text) || RE_FAIT_Q.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const chercheAvis = RE_AVIS_Q.test(q.text);
    if (chercheAvis ? !estAvis(q.correct) : !estFait(q.correct)) p.push(`« ${q.correct} » n'est pas ${chercheAvis ? "un avis" : "un fait"} de la table`);
    for (const w of q.wrongs) if (chercheAvis ? !estFait(w) : !estAvis(w)) p.push(`le leurre « ${w} » n'est pas ${chercheAvis ? "un fait" : "un avis"}`);
    return [...p, ...langue([q.text, q.correct, ...q.wrongs, q.methode ?? ""])];
  },
};

// Justifier un choix.
const deInf = (s: string) => (VOYELLE.test(s) && !H_ASPIRE.test(s) ? `d'${s}` : `de ${s}`);
const parceQue = (s: string) => lier("parce que", s);
const TOURNURES_JUSTIFIER = [
  "%P écrit : « J'ai choisi %C… » Quelle suite justifie vraiment ce choix ?",
  "%P explique son choix : « J'ai décidé %C… » Quelle suite est une vraie justification ?",
  "Dans sa rédaction, %P écrit : « Je préfère %I… » Quelle raison est la meilleure ?",
] as const;
const RE_JUSTIFIER = /(Quelle suite justifie vraiment ce choix|Quelle suite est une vraie justification|Quelle raison est la meilleure)/;

const briqueJustifier: Brique = {
  generer() {
    const n = hasard(T.PRENOMS);
    const [c, autre] = tirer(T.CHOIX, 2);
    const nonArgs = tirer(T.NON_ARGUMENTS, 2).map(parceQue);
    return {
      text: remplir(hasard(TOURNURES_JUSTIFIER), n).replace("%C", deInf(c.choix)).replace("%I", c.choix),
      correct: parceQue(c.raison),
      wrongs: tirer([...nonArgs, parceQue(autre.raison)], nbLeurres()),
      methode: "Une justification donne une vraie raison, liée au choix ; « c'est comme ça » n'explique rien.",
    };
  },
  reconnait: (q) => RE_JUSTIFIER.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const c = T.CHOIX.find((x) => q.text.includes(`« J'ai choisi ${deInf(x.choix)}…`) || q.text.includes(`« J'ai décidé ${deInf(x.choix)}…`) || q.text.includes(`« Je préfère ${x.choix}…`));
    if (!c) return ["le choix cité ne vient pas de la table"];
    if (q.correct !== parceQue(c.raison)) p.push("la bonne réponse n'est pas la raison de ce choix");
    for (const w of q.wrongs) {
      const nonArg = T.NON_ARGUMENTS.some((x) => parceQue(x) === w);
      const autre = T.CHOIX.some((x) => x !== c && parceQue(x.raison) === w);
      if (!nonArg && !autre) p.push(`le leurre « ${w} » n'est ni un non-argument ni la raison d'un autre choix`);
    }
    return [...p, ...langue([q.text, q.correct, ...q.wrongs, q.methode ?? ""])];
  },
};

// ════════════════════════════════════════════════════════════════════════
// 5. ÉCRIRE POUR APPRENDRE (ecriture_apprendre) : titre, idée principale,
//    exemple, résumé, plan dans l'ordre
// ════════════════════════════════════════════════════════════════════════

/** Le texte d'un thème : l'idée principale au début ou à la fin, les détails mélangés. */
function texteTheme(th: T.Theme): string {
  const d = melange(th.details);
  return (Math.random() < 0.6 ? [th.idee, ...d] : [...d, th.idee]).join(" ");
}
/** Le thème dont les phrases sont exactement celles du texte cité. */
function themeDuTexte(s: string): T.Theme | null {
  const ph = s.split(/(?<=\.) /);
  const r = T.THEMES.filter((th) => ph.length === 4 && [th.idee, ...th.details].every((x) => ph.includes(x)));
  return r.length === 1 ? r[0] : null;
}
/** Deux thèmes trop proches pour se prêter des leurres (table THEMES_VOISINS). */
const themesVoisins = (a: T.Theme, b: T.Theme) => a === b || T.THEMES_VOISINS.some((g) => g.includes(a.titre) && g.includes(b.titre));
/** Un thème et k autres thèmes, aucun voisin du premier. */
function themeEtAutres(k: number): [T.Theme, ...T.Theme[]] {
  const th = hasard(T.THEMES);
  return [th, ...tirer(T.THEMES.filter((a) => !themesVoisins(a, th)), k)];
}
const controleTexteTheme =(s: string, th: T.Theme) => [...langue([s]), ...repetitions(s, th.cles)];

const TOURNURES_TITRE = [
  "Tu prends des notes sur ce texte : %T Quel titre leur donner ?",
  "%P lit ce texte pour sa leçon : %T Quel titre résume tout le texte ?",
  "Quel titre convient à ce paragraphe ? %T",
] as const;
const RE_TITRE = /(Quel titre leur donner|Quel titre résume tout le texte|Quel titre convient à ce paragraphe)/;

const briqueTitre: Brique = {
  generer() {
    const [th, ...autres] = themeEtAutres(2);
    const k = nbLeurres();
    return {
      text: remplir(hasard(TOURNURES_TITRE), hasard(T.PRENOMS)).replace("%T", g(texteTheme(th))),
      correct: th.titre,
      wrongs: [th.etroit, ...autres.map((a) => a.titre)].slice(0, k),
      methode: "Le bon titre couvre TOUT le texte, pas seulement un détail.",
    };
  },
  reconnait: (q) => RE_TITRE.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0] ?? "";
    const th = themeDuTexte(s);
    if (!th) return ["le texte cité ne vient pas d'un seul thème de la table"];
    if (q.correct !== th.titre) p.push("la bonne réponse n'est pas le titre de ce texte");
    for (const w of q.wrongs)
      if (w !== th.etroit && !T.THEMES.some((a) => !themesVoisins(a, th) && a.titre === w)) p.push(`le leurre « ${w} » n'est ni trop étroit ni hors sujet`);
    return [...p, ...langue([q.text.replace(g(s), ""), q.methode ?? ""]), ...controleTexteTheme(s, th)];
  },
};

const TOURNURES_IDEE = [
  "Lis ce texte : %T Quelle phrase donne l'idée principale ?",
  "%P doit noter l'essentiel de ce texte : %T Quelle phrase garder ?",
  "Dans ce paragraphe, quelle phrase dit l'essentiel ? %T",
] as const;
const RE_IDEE = /(Quelle phrase donne l'idée principale|Quelle phrase garder|quelle phrase dit l'essentiel)/;

const briqueIdeePrincipale: Brique = {
  generer() {
    const th = hasard(T.THEMES);
    return {
      text: remplir(hasard(TOURNURES_IDEE), hasard(T.PRENOMS)).replace("%T", g(texteTheme(th))),
      correct: th.idee,
      wrongs: tirer(th.details, nbLeurres()),
      methode: "L'idée principale est la phrase générale ; les autres sont des exemples qui la détaillent.",
    };
  },
  reconnait: (q) => RE_IDEE.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0] ?? "";
    const th = themeDuTexte(s);
    if (!th) return ["le texte cité ne vient pas d'un seul thème de la table"];
    if (q.correct !== th.idee) p.push("la bonne réponse n'est pas l'idée principale");
    for (const w of q.wrongs) if (!th.details.includes(w)) p.push(`le leurre « ${w} » n'est pas un détail du texte`);
    return [...p, ...langue([q.text.replace(g(s), ""), q.methode ?? ""]), ...controleTexteTheme(s, th)];
  },
};

const TOURNURES_EXEMPLE = [
  "Quel exemple appuie cette idée ? %I",
  "%P écrit l'idée principale de son paragraphe : %I Quel détail peut-%il ajouter ?",
  "Quelle phrase développe cette idée ? %I",
] as const;
const RE_EXEMPLE = /(Quel exemple appuie cette idée|Quel détail peut-(il|elle) ajouter|Quelle phrase développe cette idée)/;

const briqueExemple: Brique = {
  generer() {
    const [th, ...autres] = themeEtAutres(3);
    return {
      text: remplir(hasard(TOURNURES_EXEMPLE), hasard(T.PRENOMS)).replace("%I", g(th.idee)),
      correct: hasard(th.details),
      wrongs: autres.slice(0, nbLeurres()).map((a) => hasard(a.details)),
      methode: "Un bon exemple parle du même sujet que l'idée et la rend plus précise.",
    };
  },
  reconnait: (q) => RE_EXEMPLE.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const th = T.THEMES.find((x) => cites(q.text)[0] === x.idee);
    if (!th) return ["l'idée citée ne vient pas de la table"];
    if (!th.details.includes(q.correct)) p.push("la bonne réponse n'est pas un détail de cette idée");
    for (const w of q.wrongs) {
      const autre = T.THEMES.find((a) => a.details.includes(w));
      if (!autre || themesVoisins(autre, th)) p.push(`le leurre « ${w} » appartient au même sujet ou à un sujet voisin`);
    }
    return [...p, ...langue([q.text, q.correct, q.methode ?? ""])];
  },
};

const TOURNURES_RESUME = [
  "Lis ce texte : %T Quelle phrase le résume le mieux ?",
  "%P doit résumer ce texte en une phrase : %T Laquelle choisir ?",
  "Quel est le meilleur résumé de ce paragraphe ? %T",
] as const;
const RE_RESUME = /(Quelle phrase le résume le mieux|doit résumer ce texte en une phrase|Quel est le meilleur résumé de ce paragraphe)/;

const briqueResume: Brique = {
  generer() {
    const [th, ...autres] = themeEtAutres(2);
    const k = nbLeurres();
    return {
      text: remplir(hasard(TOURNURES_RESUME), hasard(T.PRENOMS)).replace("%T", g(texteTheme(th))),
      correct: th.resume,
      wrongs: [hasard(th.details), ...autres.map((a) => a.resume)].slice(0, k),
      methode: "Un résumé dit l'essentiel de TOUT le texte avec d'autres mots ; un détail ne suffit pas.",
    };
  },
  reconnait: (q) => RE_RESUME.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0] ?? "";
    const th = themeDuTexte(s);
    if (!th) return ["le texte cité ne vient pas d'un seul thème de la table"];
    if (q.correct !== th.resume) p.push("la bonne réponse n'est pas le résumé de ce texte");
    if (s.includes(q.correct)) p.push("le résumé est recopié du texte, pas reformulé");
    for (const w of q.wrongs)
      if (!th.details.includes(w) && !T.THEMES.some((a) => !themesVoisins(a, th) && a.resume === w)) p.push(`le leurre « ${w} » pourrait résumer le texte`);
    return [...p, ...langue([q.text.replace(g(s), ""), q.correct, q.methode ?? ""]), ...controleTexteTheme(s, th)];
  },
};

// Le défi : le plan d'un récit, dans l'ordre.
const TOURNURES_PLAN = [
  "Lis ce récit : %R Quel plan le résume dans l'ordre ?",
  "%Q résume ce récit en quelques notes : %R Quel plan respecte l'ordre de l'histoire ?",
  "Quel plan suit l'ordre de ce récit ? %R",
] as const;
const RE_PLAN = /(Quel plan le résume dans l'ordre|Quel plan respecte l'ordre de l'histoire|Quel plan suit l'ordre de ce récit)/;
const plan = (notes: readonly string[]) => notes.join(" → ");

const briquePlanRecit: Brique = {
  generer() {
    const [n, auteur] = tirer(T.PRENOMS, 2);
    const r = hasard(T.RECITS);
    const ordres = new Set<string>();
    while (ordres.size < 3) {
      const m = melange(r.notes);
      if (!memeOrdre(m, r.notes)) ordres.add(plan(m));
    }
    return {
      text: hasard(TOURNURES_PLAN).replace("%Q", auteur.p).replace("%R", g(r.etapes.map((e) => remplir(e, n)).join(" "))),
      correct: plan(r.notes),
      wrongs: [...ordres].slice(0, nbLeurres()),
      methode: "Repère dans l'ordre : la situation de départ, le problème, ce que fait le héros, la fin.",
    };
  },
  reconnait: (q) => RE_PLAN.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0] ?? "";
    let trouve: { r: T.Recit; n: Prenom } | null = null;
    for (const r of T.RECITS) for (const n of T.PRENOMS) if (s === r.etapes.map((e) => remplir(e, n)).join(" ")) trouve = { r, n };
    if (!trouve) return ["le récit cité ne vient pas de la table"];
    const { r, n } = trouve;
    if (q.correct !== plan(r.notes)) p.push("la bonne réponse ne suit pas l'ordre du récit");
    for (const w of q.wrongs) {
      const parts = w.split(" → ");
      if (parts.length !== 4 || !parts.every((x) => r.notes.includes(x)) || new Set(parts).size !== 4)
        p.push(`le leurre « ${w} » n'est pas le même plan dans un autre ordre`);
      else if (memeOrdre(parts, r.notes)) p.push(`le leurre « ${w} » est dans le bon ordre`);
    }
    return [...p, ...langue([q.text, q.methode ?? ""]), ...pronomAvantPrenom(s, n), ...repetitions(s, r.mots)];
  },
};

// ════════════════════════════════════════════════════════════════════════
// LES MICROS
// ════════════════════════════════════════════════════════════════════════

export const GENERATEURS: GenerateursFrancais = {
  "6e_ecrit_copie": micro([briqueCopieExacte(false), briqueMotMalCopie(false)]),
  "6e_ecrit_mise_en_forme": micro([briqueSigneFinal, briqueMajuscule, briqueEnumeration, briqueParoles]),
  "6e_ecrit_copie_defi": micro([briqueCopieExacte(true), briqueMotMalCopie(true)]),
  "6e_ecrit_codes": micro([briqueSigneFinal, briqueMajuscule, briqueEnumeration, briqueParoles]),
  "6e_ecrit_notes": micro([briqueTitre, briqueIdeePrincipale]),
  "6e_ecrit_resumer": micro([briqueResume, briqueTitre]),
  "6e_ecrit_hierarchiser": micro([briqueIdeePrincipale, briqueExemple]),
  "6e_ecrit_apprendre_defi": micro([briquePlanRecit, briqueResume, briqueExemple]),
  "6e_ecrit_invention": micro([briqueConnecteurRecit, briqueFinRecit, briqueOrdreIdees]),
  "6e_ecrit_reflexion": micro([briqueArgument, briqueAvisOuFait, briqueJustifier]),
  "6e_ecrit_coherence": micro([briqueTemps, briqueRepriseNominale, briqueRepetitionPrenom, briqueConnecteur]),
  "6e_ecrit_produire_defi": micro([briqueFinRecit, briqueTemps, briqueConnecteurRecit]),
  "6e_ecrit_justifier": micro([briqueJustifier, briqueConnecteur]),
  "6e_ecrit_brouillon": micro([briqueOrdreIdees, briqueIntrusNote]),
  "6e_ecrit_reviser": micro([briqueRepetitionPrenom, briqueRepriseNominale, briqueConnecteur]),
  "6e_ecrit_normes": micro([briqueAccord, briqueSigneFinal, briqueMajuscule]),
  "6e_ecrit_reviser_defi": micro([briqueDefiReviser, briqueAccord, briqueRepetitionPrenom]),
};
