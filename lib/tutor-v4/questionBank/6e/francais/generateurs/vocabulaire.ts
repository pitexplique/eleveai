import type { GenerateurFrancais, GenerateursFrancais, QuestionFrancais } from "./types";
import * as T from "./vocabulaire-tables";
import type { Prenom } from "./vocabulaire-tables";

// LA FAMILLE « VOCABULAIRE » DU FRANÇAIS DE 6e : générateurs à correcteur
// (05/10/2026, voir types.ts). Notions : vocabulaire_enrichir,
// vocabulaire_relations, vocabulaire_emploi.
//
// Chaque micro tire une BRIQUE au hasard (une forme de question). Une brique
// compose la question à partir des tables (vocabulaire-tables.ts) et des
// prénoms ; son correcteur RECONNAÎT la forme de la question, retrouve le
// fait interrogé dans la table en relisant le texte, et vérifie : la bonne
// réponse lui correspond ; aucun leurre ne lui correspond aussi (ni synonyme,
// ni quasi-synonyme, ni mot de la même famille) ; la phrase lue par l'élève
// est bien une phrase de la table. S'y ajoutent des contrôles de langue
// communs : élisions (« de Inès », « que il »), articles non contractés
// (« à les »), mot répété dans deux phrases voisines.

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
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const echap = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Voyelle ou h muet en tête de mot (aucun prénom de la table n'a de h aspiré). */
const VOYELLE = /^[aeiouàâäéèêëîïôöûüœæh]/i;
const deP = (p: string) => (VOYELLE.test(p) ? "d'" + p : "de " + p);

/** Remplit les jetons d'une phrase de table avec un prénom. */
function remplir(t: string, n: Prenom): string {
  return t
    .replace(/%dP/g, deP(n.p))
    .replace(/%qP/g, VOYELLE.test(n.p) ? "qu'" + n.p : "que " + n.p)
    .replace(/%P/g, n.p)
    .replace(/%x\(([^|)]*)\|([^)]*)\)/g, (_, m: string, f: string) => (n.f ? f : m))
    .replace(/%il/g, n.f ? "elle" : "il")
    .replace(/%e/g, n.f ? "e" : "");
}
/** Le prénom de la table qui, mis dans la phrase-modèle, redonne `vue` (ou null). */
function prenomDe(modele: string, vue: string): Prenom | null {
  for (const n of T.PRENOMS) if (remplir(modele, n) === vue) return n;
  return null;
}
/** Les passages entre guillemets français, dans l'ordre. */
const cites = (s: string) => [...s.matchAll(/« ([^«»]+?) »/g)].map((m) => m[1]);
const tirerPrenom = () => hasard(T.PRENOMS);

const MOTS_OUTILS = new Set(
  "alors après avant avoir autre autres comme dans depuis encore entre leurs mais même parce pendant plus pour quand quelle quelles quels sans sous toujours toutes trois très votre cette elles phrase leurre".split(" "),
);

/**
 * Contrôles de langue communs (les fautes que les correcteurs des collègues
 * ont attrapées) : élisions, articles non contractés, mot répété dans deux
 * phrases voisines. `exclus` : les mots interrogés, qui reviennent exprès.
 */
function controlesLangue(q: QuestionFrancais, exclus: readonly string[] = []): string[] {
  const p: string[] = [];
  const tout = [q.text, q.correct, ...q.wrongs, q.methode ?? ""];
  for (const s of tout) {
    const e = s.match(/(?<![\wàâéèêëîïôûœç'-])(de|que|le|la|je|me|te|se|ne|ce|lorsque|puisque|jusque) ([aeiouâéèêëîïôûœ][\wàâéèêëîïôûœ]*|Hugo)/i);
    if (e && !/^(le|la) (un|une)$/i.test(e[0])) p.push(`élision oubliée : « ${e[0]} » dans « ${s} »`);
    if (/\bsi (il|ils)\b/.test(s)) p.push(`élision oubliée (« s'il ») dans « ${s} »`);
    if (/(?<![\wàâéèêëîïôûœç])(à|de) (le|les) [a-zàâéèêîôû]/.test(s))
      p.push(`article non contracté (« au », « aux », « du », « des ») dans « ${s} »`);
    // « casqu'et » : une élision devant une consonne ; « d' Inès » : une espace après l'apostrophe.
    if (/[a-zA-Zéè]'\s|[a-zA-Z]'[bcdfgjklmnpqrstvwxyzBCDFGJKLMNPQRSTVWXYZ]/.test(s))
      p.push(`apostrophe mal placée dans « ${s} »`);
    if (/ [,.]/.test(s)) p.push(`espace avant la ponctuation dans « ${s} »`);
    if (/[^ «]\?|[^ ]!(?!\S)|\w:/.test(s)) p.push(`il manque l'espace avant « ? », « ! » ou « : » dans « ${s} »`);
  }
  // Un même mot plein dans deux phrases voisines du texte lu (hors mots interrogés).
  const ex = new Set(exclus.flatMap((x) => x.toLowerCase().split(/[\s'-]+/)));
  const phrases = q.text.split(/(?<=[.!?:])\s+/);
  const motsDe = (s: string) =>
    new Set(
      (s.toLowerCase().match(/[a-zàâäéèêëîïôöûüœç]{5,}/g) ?? []).filter(
        (m) => !MOTS_OUTILS.has(m) && !ex.has(m) && !T.PRENOMS.some((n) => n.p.toLowerCase() === m),
      ),
    );
  for (let k = 1; k < phrases.length; k++) {
    const a = motsDe(phrases[k - 1]);
    for (const m of motsDe(phrases[k])) if (a.has(m)) p.push(`« ${m} » répété dans deux phrases voisines`);
  }
  return p;
}

/** Assemble une micro : une brique au hasard ; le correcteur confie la question à la brique qui la reconnaît. */
function micro(briques: readonly Brique[], exclus: (q: QuestionFrancais) => string[] = () => []): GenerateurFrancais {
  return {
    generer: () => hasard(briques).generer(),
    corriger: (q) => {
      const candidates = briques.filter((b) => b.reconnait(q));
      if (!candidates.length) return ["aucune forme de question connue ne reconnaît ce texte"];
      const avis = candidates.map((b) => b.corriger(q));
      const meilleur = avis.find((a) => !a.length) ?? avis[0];
      return [...meilleur, ...controlesLangue(q, exclus(q))];
    },
  };
}

/** Mots exclus du contrôle de répétition : toutes les citations sauf la phrase lue (la plus longue). */
function saufLaPlusLongue(q: QuestionFrancais): string[] {
  const c = cites(q.text);
  const longue = c.reduce((a, b) => (b.length > a.length ? b : a), "");
  return c.filter((x) => x !== longue);
}

/** Deux sens sont-ils quasi synonymes (table QUASI_SYNONYMES) ? */
const quasi = (a: string, b: string) =>
  a === b || T.QUASI_SYNONYMES.some((g) => g.includes(a) && g.includes(b));

// ── 1. Le sens d'un mot d'après le contexte ───────────────────────────────

/** Les tournures : %ph = la phrase, %m = le mot, %P = le prénom, %il = il/elle. */
const TOURNURES_CONTEXTE = [
  "Lis : « %ph » Que veut dire « %m » dans cette phrase ?",
  "Dans la phrase « %ph », que veut dire « %m » ?",
  "« %ph » D'après la phrase, quel est le sens de « %m » ?",
  "%P lit : « %ph » %Il ne connaît pas le mot « %m ». Que veut dire ce mot ?",
] as const;

function tournure(t: string, ph: string, m: string, n: Prenom): string {
  // « %ph » est suivi d'une virgule dans une tournure : la phrase perd alors son point final.
  const phrase = /%ph », /.test(t) ? ph.replace(/\.$/, "") : ph;
  return t
    .replace("%ph", phrase)
    .replace("%m", m)
    .replace("%P", n.p)
    .replace("%Il", n.f ? "Elle" : "Il");
}

/** Relit une question de contexte : la tournure, la phrase citée, le mot interrogé. */
function lireContexte(text: string) {
  const c = cites(text);
  if (c.length < 2) return null;
  const mot = c[c.length - 1];
  const entree = T.CONTEXTE.find((e) => e.mot === mot);
  if (!entree) return null;
  for (const ph of entree.phrases)
    for (const n of T.PRENOMS) {
      const pleine = remplir(ph.t, n);
      if (c[0] === pleine || c[0] === pleine.replace(/\.$/, "")) return { entree, ph, n, citee: c[0] };
    }
  return { entree, ph: null, n: null, citee: c[0] };
}

const briqueContexte: Brique = {
  generer() {
    const e = hasard(T.CONTEXTE);
    const ph = hasard(e.phrases);
    const n = tirerPrenom();
    const autres = melange(
      T.CONTEXTE.filter(
        (x) => x.classe === e.classe && x.groupe !== e.groupe && !quasi(x.sens, e.sens) && x.sens !== e.contraire,
      ),
    );
    const leurres = [e.contraire, ...autres.slice(0, 2).map((x) => x.sens)];
    // Le lecteur de la 4e tournure n'est pas l'enfant de la phrase.
    const lecteur = hasard(T.PRENOMS.filter((x) => x.p !== n.p));
    return {
      text: tournure(hasard(TOURNURES_CONTEXTE), remplir(ph.t, n), e.mot, lecteur),
      correct: e.sens,
      wrongs: leurres,
      methode: `Cherche l'indice autour du mot : « ${remplir(ph.i, n)} ».`,
    };
  },
  reconnait: (q) => /veut dire|sens de « /.test(q.text) && cites(q.text).length >= 2,
  corriger(q) {
    const p: string[] = [];
    const lu = lireContexte(q.text);
    if (!lu) return ["mot interrogé introuvable dans la table du contexte"];
    const { entree: e, ph, n, citee } = lu;
    if (!ph || !n) p.push(`la phrase citée n'est pas une phrase de la table pour « ${e.mot} »`);
    const lecteur = q.text.match(/^(\S+) lit : /)?.[1];
    if (lecteur && n && lecteur === n.p) p.push("le lecteur et l'enfant de la phrase ont le même prénom");
    if (!new RegExp(`(^|[\\s'])${echap(e.mot)}([\\s,.:!?]|$)`).test(citee)) p.push(`le mot « ${e.mot} » n'est pas dans la phrase citée`);
    if (ph && n && !citee.toLowerCase().includes(remplir(ph.i, n).toLowerCase())) p.push("l'indice n'est pas dans la phrase");
    if (q.correct !== e.sens) p.push(`bonne réponse « ${q.correct} » ≠ sens de la table « ${e.sens} »`);
    for (const w of q.wrongs) {
      if (w === e.contraire) continue;
      const autre = T.CONTEXTE.find((x) => x.sens === w);
      if (!autre) p.push(`leurre « ${w} » : ni le contraire, ni le sens d'un autre mot de la table`);
      else if (autre.mot === e.mot) p.push(`leurre « ${w} » : c'est le sens du mot lui-même`);
      else if (autre.groupe === e.groupe) p.push(`leurre « ${w} » : même groupe de sens que « ${e.mot} »`);
      if (quasi(w, e.sens)) p.push(`leurre « ${w} » : quasi-synonyme de la bonne réponse`);
    }
    if (q.methode && n && ph && !q.methode.includes(remplir(ph.i, n))) p.push("la méthode ne cite pas l'indice");
    return p;
  },
};

// ── 2. Les stratégies : déduire (indice), décomposer, chercher, vérifier ──

const il = (n: Prenom) => (n.f ? "elle" : "il");
const autreQue = (n: Prenom) => hasard(T.PRENOMS.filter((x) => x.p !== n.p));
/** Le passage `indice` tel qu'il est écrit dans la phrase (majuscule comprise). */
function passage(phrase: string, indice: string): string | null {
  const i = phrase.toLowerCase().indexOf(indice.toLowerCase());
  return i < 0 ? null : phrase.slice(i, i + indice.length);
}
/** Retrouve, dans les citations d'un texte, une phrase du CONTEXTE et son mot. */
function lirePhraseContexte(text: string) {
  const c = cites(text);
  for (const e of T.CONTEXTE) {
    if (!c.includes(e.mot)) continue;
    for (const ph of e.phrases)
      for (const n of T.PRENOMS) {
        const pleine = remplir(ph.t, n);
        if (c.some((x) => x === pleine || x === pleine.replace(/\.$/, ""))) return { e, ph, n, phrase: pleine };
      }
  }
  return null;
}

const SANS_INDICE = "aucun : il faut le dictionnaire";
const TOURNURES_INDICE = [
  "« %ph » Quels mots de la phrase aident à comprendre « %m » ?",
  "%L lit : « %ph » Quel passage l'aide à comprendre « %m » ?",
  "Pour deviner le sens de « %m », quel passage faut-il regarder ? « %ph »",
] as const;

const briqueIndice: Brique = {
  generer() {
    // Un indice qui contient le prénom ferait du prénom un demi-indice : écarté.
    const e = hasard(T.CONTEXTE.filter((x) => x.phrases.some((ph) => !ph.i.includes("%"))));
    const ph = hasard(e.phrases.filter((x) => !x.i.includes("%")));
    const n = tirerPrenom();
    const phrase = remplir(ph.t, n);
    const autre = hasard(T.CONTEXTE.filter((x) => x.groupe !== e.groupe && !phrase.toLowerCase().includes(x.phrases[0].i.toLowerCase()) && !x.phrases[0].i.includes("%")));
    return {
      text: hasard(TOURNURES_INDICE).replace("%ph", phrase).replace("%m", e.mot).replace("%L", autreQue(n).p),
      correct: `« ${passage(phrase, ph.i)} »`,
      wrongs: [`« ${n.p} »`, SANS_INDICE, `« ${autre.phrases[0].i} »`],
      methode: "L'indice est le passage qui dit ce qui se passe autour du mot : il en éclaire le sens.",
    };
  },
  reconnait: (q) => /aident à comprendre|l'aide à comprendre|faut-il regarder/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const lu = lirePhraseContexte(q.text);
    if (!lu) return ["phrase ou mot introuvable dans la table du contexte"];
    const { e, ph, n, phrase } = lu;
    const attendu = passage(phrase, ph.i);
    if (!attendu) p.push("l'indice de la table n'est pas dans la phrase");
    if (q.correct !== `« ${attendu} »`) p.push(`bonne réponse « ${q.correct} » ≠ indice de la table « ${ph.i} »`);
    for (const w of q.wrongs) {
      if (w === SANS_INDICE) continue;
      const x = cites(w)[0];
      if (!x) p.push(`leurre « ${w} » illisible`);
      else if (x === n.p) continue;
      else if (phrase.toLowerCase().includes(x.toLowerCase())) p.push(`leurre « ${w} » : ce passage est dans la phrase, il pourrait aider`);
      else if (!T.CONTEXTE.some((y) => y !== e && y.phrases.some((z) => z.i === x))) p.push(`leurre « ${w} » : ni le prénom ni l'indice d'une autre phrase`);
    }
    if (ph.i.includes("%")) p.push("l'indice contient le prénom : le leurre « prénom » serait un demi-indice");
    const lecteur = q.text.match(/^(\S+) lit : /)?.[1];
    if (lecteur === n.p) p.push("le lecteur et l'enfant de la phrase ont le même prénom");
    return p;
  },
};

const TOURNURES_CACHE = [
  "%P ne connaît pas le mot « %m ». Quel mot connu, caché dedans, peut l'aider ?",
  "Dans le mot « %m », quel mot plus simple reconnais-tu ?",
  "Pour comprendre « %m », %P cherche le mot simple de la même famille. Lequel ?",
] as const;
/** Le mot simple se voit-il dans le dérivé ? (« cass » ⊂ casser, « maisonn » ⊃ maison) */
const baseVisible = (x: T.Derive) =>
  x.mot.includes(x.base) || x.base.startsWith(x.rad) || x.rad.startsWith(x.base);
/** `w` ressemble-t-il à un morceau de `mot` (même début de radical) ? */
const ressemble = (mot: string, w: string) => mot.includes(w.slice(0, Math.max(3, w.length - 2)));

const briqueMotCache: Brique = {
  generer() {
    const e = hasard(T.DERIVES.filter((x) => x.visible));
    const leurres = melange(
      [...new Set(T.DERIVES.filter((x) => x.base !== e.base && !ressemble(e.mot, x.base)).map((x) => x.base))],
    ).slice(0, 3);
    return {
      text: hasard(TOURNURES_CACHE).replace("%m", e.mot).replace("%P", tirerPrenom().p),
      correct: e.base,
      wrongs: leurres,
      methode: "On enlève le début (préfixe) ou la fin (suffixe) du mot : il reste un mot que l'on connaît.",
    };
  },
  reconnait: (q) => /caché dedans, peut l'aider|plus simple reconnais-tu|mot simple de la même famille/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const m = cites(q.text)[0];
    const e = T.DERIVES.find((x) => x.mot === m);
    if (!e) return [`« ${m} » n'est pas dans la table des mots dérivés`];
    if (e.pre + e.rad + e.suf !== e.mot) p.push(`table fausse : ${e.pre}+${e.rad}+${e.suf} ≠ ${e.mot}`);
    if (!e.visible || !baseVisible(e)) p.push(`le mot simple « ${e.base} » ne se voit pas dans « ${e.mot} »`);
    if (q.correct !== e.base) p.push(`bonne réponse « ${q.correct} » ≠ mot simple « ${e.base} »`);
    for (const w of q.wrongs) {
      if (T.DERIVES.some((x) => x.base === w && x.mot === e.mot) || w === e.base) p.push(`leurre « ${w} » : de la même famille`);
      if (ressemble(e.mot, w)) p.push(`leurre « ${w} » : il ressemble à un morceau de « ${e.mot} »`);
    }
    return p;
  },
};

// Les méthodes : un scénario (indice dans la phrase / mot connu caché / rien du
// tout / vérifier un sens deviné) appelle UNE méthode juste.
const MAUVAISES = {
  deviner: ["en relisant seulement le mot, plusieurs fois", "en regardant si le mot est long ou court", "en choisissant le sens qui lui plaît"],
  faire: ["inventer un sens qui lui plaît", "sauter le mot et continuer sa lecture", "recopier le mot trois fois"],
  verifier: ["relire le mot tout seul à voix haute", "compter les lettres du mot", "demander si le mot est joli"],
} as const;
const AVEC_AUTOUR = (indice: string) => `en s'aidant des mots autour : « ${indice} »`;
const AVEC_CACHE = (base: string) => `en cherchant le mot connu caché dedans : « ${base} »`;
const DICO = "chercher le mot dans le dictionnaire";
const VERIF = (m: string, s: string) => `remplacer « ${m} » par « ${s} » et relire la phrase`;

const briqueMethode: Brique = {
  generer() {
    const n = tirerPrenom();
    const L = autreQue(n);
    const cas = hasard(["autour", "cache", "dico", "verifier"] as const);
    if (cas === "autour") {
      const e = hasard(T.CONTEXTE);
      const ph = hasard(e.phrases);
      const phrase = remplir(ph.t, n);
      return {
        text: `« ${phrase} » Sans dictionnaire, comment ${L.p} peut-${il(L)} deviner le sens de « ${e.mot} » ?`,
        correct: AVEC_AUTOUR(passage(phrase, remplir(ph.i, n)) ?? ""),
        wrongs: melange<string>(MAUVAISES.deviner).slice(0, 2).concat("en cherchant le mot dans le dictionnaire"),
        methode: "D'abord, on cherche dans la phrase un indice qui éclaire le mot.",
      };
    }
    if (cas === "cache") {
      const e = hasard(T.DERIVES.filter((x) => x.visible));
      return {
        text: `${L.p} trouve le mot « ${e.mot} » dans une liste, sans phrase autour. Sans dictionnaire, comment peut-${il(L)} deviner son sens ?`,
        correct: AVEC_CACHE(e.base),
        wrongs: melange<string>(MAUVAISES.deviner).slice(0, 2).concat("en s'aidant des mots autour"),
        methode: "Sans phrase autour, on découpe le mot : on y cherche un mot que l'on connaît.",
      };
    }
    if (cas === "dico") {
      const r = hasard(T.RARES);
      return {
        text: `${L.p} lit : « ${remplir(r.phrase, n)} » Rien dans la phrase n'aide, et le mot « ${r.mot} » ne cache aucun mot connu. Que doit-${il(L)} faire ?`,
        correct: DICO,
        wrongs: melange<string>(MAUVAISES.faire).slice(0, 2).concat("chercher un mot connu caché dedans"),
        methode: "Quand ni la phrase ni le mot n'aident, on ouvre le dictionnaire.",
      };
    }
    const e = hasard(T.CONTEXTE);
    const ph = hasard(e.phrases);
    return {
      text: `« ${remplir(ph.t, n)} » ${L.p} pense que « ${e.mot} » veut dire « ${e.sens} ». Comment le vérifier ?`,
      correct: VERIF(e.mot, e.sens),
      wrongs: melange<string>(MAUVAISES.verifier).slice(0, 3),
      methode: "On vérifie un sens deviné en le mettant à la place du mot : la phrase doit rester juste.",
    };
  },
  reconnait: (q) => /Sans dictionnaire, comment|Rien dans la phrase n'aide|Comment le vérifier \?/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const c = cites(q.text);
    const t = q.text;
    const mauvais = (liste: readonly string[], permis: string[]) => {
      for (const w of q.wrongs) if (!liste.includes(w) && !permis.includes(w)) p.push(`leurre « ${w} » inattendu pour ce scénario`);
    };
    if (/^« .+ » Sans dictionnaire/.test(t)) {
      const lu = lirePhraseContexte(t);
      if (!lu) return ["phrase du contexte introuvable"];
      const attendu = AVEC_AUTOUR(passage(lu.phrase, remplir(lu.ph.i, lu.n)) ?? "?");
      if (q.correct !== attendu) p.push(`bonne réponse ≠ « ${attendu} »`);
      if (T.DERIVES.some((x) => x.mot === lu.e.mot)) p.push("le mot cache un mot connu : deux méthodes justes");
      mauvais(MAUVAISES.deviner, ["en cherchant le mot dans le dictionnaire"]);
    } else if (/dans une liste, sans phrase autour/.test(t)) {
      const e = T.DERIVES.find((x) => x.mot === c[0]);
      if (!e || !baseVisible(e)) return [`« ${c[0]} » : pas de mot connu visible dedans`];
      if (q.correct !== AVEC_CACHE(e.base)) p.push(`bonne réponse ≠ « ${AVEC_CACHE(e.base)} »`);
      mauvais(MAUVAISES.deviner, ["en s'aidant des mots autour"]);
    } else if (/Rien dans la phrase n'aide/.test(t)) {
      const r = T.RARES.find((x) => x.mot === c[1]);
      if (!r) return [`« ${c[1]} » n'est pas un mot rare de la table`];
      if (!T.PRENOMS.some((n) => remplir(r.phrase, n) === c[0])) p.push("la phrase citée n'est pas celle du mot rare");
      if (T.DERIVES.some((x) => x.mot === r.mot) || T.CONTEXTE.some((x) => x.mot === r.mot)) p.push("le mot rare est devinable");
      if (q.correct !== DICO) p.push("bonne réponse ≠ le dictionnaire");
      mauvais(MAUVAISES.faire, ["chercher un mot connu caché dedans"]);
    } else if (/Comment le vérifier/.test(t)) {
      const lu = lirePhraseContexte(t);
      if (!lu) return ["phrase du contexte introuvable"];
      const s = c[c.length - 1];
      if (s !== lu.e.sens) p.push(`le sens proposé « ${s} » n'est pas celui de la table`);
      if (q.correct !== VERIF(lu.e.mot, s)) p.push("bonne réponse ≠ remplacer le mot par son sens");
      mauvais(MAUVAISES.verifier, []);
    } else p.push("scénario inconnu");
    const L = t.match(/(?:comment |» )(\S+) (?:peut|lit|pense)/)?.[1] ?? t.match(/^(\S+) (?:trouve|lit)/)?.[1];
    if (L && c.some((x) => x.length > 25 && x.includes(L))) p.push("le lecteur et l'enfant de la phrase ont le même prénom");
    return p;
  },
};

// ── 3. Sens propre, sens figuré, expressions imagées ─────────────────────

/** La phrase-modèle de `liste` qui, remplie avec un prénom (ou sans), redonne `vue`. */
const deLaListe = (liste: readonly string[], vue: string) =>
  liste.find((m) => (m.includes("%") ? T.PRENOMS.some((n) => remplir(m, n) === vue) : m === vue));

const TOURNURES_FIGURE = [
  "Dans quelle phrase %nom est-il employé au sens %s ?",
  "Quelle phrase emploie %nom au sens %s ?",
  "%L cherche une phrase où %nom est au sens %s. Laquelle choisir ?",
] as const;

const briqueFigure: Brique = {
  generer() {
    const e = hasard(T.FIGURE);
    const figure = Math.random() < 0.6;
    const [bon, faux] = figure ? [e.figure, e.propre] : [e.propre, e.figure];
    const n = melange(T.PRENOMS);
    return {
      text: hasard(TOURNURES_FIGURE).replace("%nom", e.nom).replace("%s", figure ? "figuré" : "propre").replace("%L", n[3].p),
      correct: remplir(hasard(bon), n[0]),
      wrongs: faux.map((f, k) => remplir(f, n[k + 1])),
      methode: figure
        ? "Au sens figuré, on ne peut pas prendre la phrase au pied de la lettre : le mot fait une image."
        : "Au sens propre, le mot garde son sens premier, concret : on peut le prendre au pied de la lettre.",
    };
  },
  reconnait: (q) => /au sens (figuré|propre)/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const e = T.FIGURE.find((x) => q.text.includes(x.nom));
    if (!e) return ["mot introuvable dans la table du sens figuré"];
    const figure = /au sens figuré/.test(q.text);
    const [bon, faux] = figure ? [e.figure, e.propre] : [e.propre, e.figure];
    if (e.propre.some((x) => e.figure.includes(x))) p.push("table fausse : une phrase est à la fois propre et figurée");
    if (!deLaListe(bon, q.correct)) p.push(`bonne réponse « ${q.correct} » : pas une phrase au sens ${figure ? "figuré" : "propre"} de la table`);
    for (const w of q.wrongs) if (!deLaListe(faux, w)) p.push(`leurre « ${w} » : pas une phrase au sens ${figure ? "propre" : "figuré"} de la table`);
    const rac = new RegExp(e.rac, "i");
    for (const s of [q.correct, ...q.wrongs]) if (!rac.test(s)) p.push(`« ${s} » ne contient pas le mot interrogé`);
    return p;
  },
};

const phraseExpr = (x: T.Expression, n: Prenom) => remplir(`%P ${x.p3}.`, n);
const TOURNURES_EXPR_SENS = [
  "« %ph » Que veut dire cette expression ?",
  "Que veut dire l'expression « %e » ?",
  "On dit : « %ph » Qu'est-ce que cela signifie ?",
] as const;

const briqueExpressionSens: Brique = {
  generer() {
    const x = hasard(T.EXPRESSIONS);
    const autres = melange(T.EXPRESSIONS.filter((y) => y.g !== x.g && !quasi(y.sens, x.sens)));
    const sens = [...new Set(autres.map((y) => y.sens))].slice(0, 2);
    return {
      text: hasard(TOURNURES_EXPR_SENS).replace("%ph", phraseExpr(x, tirerPrenom())).replace("%e", x.e),
      correct: x.sens,
      wrongs: [x.lettre, ...sens],
      methode: "Une expression imagée ne se prend pas au pied de la lettre : on cherche l'idée que l'image fait comprendre.",
    };
  },
  reconnait: (q) => /Que veut dire cette expression|Que veut dire l'expression|Qu'est-ce que cela signifie/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const c = cites(q.text)[0] ?? "";
    const x = T.EXPRESSIONS.find((y) => y.e === c || T.PRENOMS.some((n) => phraseExpr(y, n) === c));
    if (!x) return [`expression introuvable : « ${c} »`];
    if (q.correct !== x.sens) p.push(`bonne réponse « ${q.correct} » ≠ sens de la table « ${x.sens} »`);
    for (const w of q.wrongs) {
      if (w === x.lettre) continue;
      const y = T.EXPRESSIONS.find((z) => z.sens === w);
      if (!y) p.push(`leurre « ${w} » : ni le faux sens au pied de la lettre, ni le sens d'une autre expression`);
      else if (y.g === x.g || quasi(w, x.sens)) p.push(`leurre « ${w} » : même sens que l'expression interrogée`);
    }
    return p;
  },
};

const TOURNURES_SENS_EXPR = [
  "Quelle expression veut dire « %s » ?",
  "Quelle expression imagée signifie « %s » ?",
  "%P veut dire « %s » avec une image. Quelle expression choisit-%il ?",
] as const;

const briqueSensExpression: Brique = {
  generer() {
    const x = hasard(T.EXPRESSIONS);
    const n = tirerPrenom();
    const leurres = melange(T.EXPRESSIONS.filter((y) => y.g !== x.g && !quasi(y.sens, x.sens))).slice(0, 3);
    return {
      text: hasard(TOURNURES_SENS_EXPR).replace("%s", x.sens).replace("%P", n.p).replace("%il", il(n)),
      correct: x.e,
      wrongs: leurres.map((y) => y.e),
      methode: "Pour chaque expression, on se demande quelle idée l'image fait comprendre.",
    };
  },
  reconnait: (q) => /Quelle expression/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0];
    const x = T.EXPRESSIONS.find((y) => y.e === q.correct);
    if (!x) return [`bonne réponse « ${q.correct} » absente de la table des expressions`];
    if (x.sens !== s) p.push(`« ${q.correct} » veut dire « ${x.sens} », pas « ${s} »`);
    for (const w of q.wrongs) {
      const y = T.EXPRESSIONS.find((z) => z.e === w);
      if (!y) p.push(`leurre « ${w} » absent de la table`);
      else if (y.sens === s || y.g === x.g || quasi(y.sens, s)) p.push(`leurre « ${w} » : il veut AUSSI dire « ${s} »`);
    }
    return p;
  },
};

// ── 4. Les mots polysémiques ──────────────────────────────────────────────

/** Le mot (ou son pluriel) figure-t-il dans la phrase ? */
const contientMot = (s: string, m: string) =>
  new RegExp(`(^|[\\s'])${echap(m)}s?([\\s,.:!?]|$)`, "i").test(s);

const TOURNURES_POLY_PHRASE = [
  "Dans quelle phrase le mot « %m » veut-il dire « %l » ?",
  "Quelle phrase emploie « %m » au sens de « %l » ?",
  "%L cherche une phrase où « %m » signifie « %l ». Laquelle ?",
] as const;

const briquePolyPhrase: Brique = {
  generer() {
    const w = hasard(T.POLYSEMES);
    const k = Math.floor(Math.random() * w.sens.length);
    const n = melange(T.PRENOMS);
    const autres = w.sens.filter((_, j) => j !== k);
    // Une phrase par autre sens ; s'il n'y a qu'un autre sens, ses deux phrases.
    const faux = autres.length >= 2 ? autres.map((s) => hasard(s.ph)) : [...autres[0].ph];
    return {
      text: hasard(TOURNURES_POLY_PHRASE).replace("%m", w.mot).replace("%l", w.sens[k].l).replace("%L", n[5].p),
      correct: remplir(hasard(w.sens[k].ph), n[0]),
      wrongs: melange(faux).slice(0, 3).map((f, j) => remplir(f, n[j + 1])),
      methode: "Un mot peut avoir plusieurs sens : ce sont les mots autour qui disent lequel.",
    };
  },
  reconnait: (q) => /veut-il dire « |au sens de « |signifie « .+ »\. Laquelle/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const [m, l] = cites(q.text);
    const w = T.POLYSEMES.find((x) => x.mot === m);
    const s = w?.sens.find((x) => x.l === l);
    if (!w || !s) return [`mot ou sens introuvable : « ${m} », « ${l} »`];
    if (!deLaListe(s.ph, q.correct)) p.push(`bonne réponse « ${q.correct} » : pas une phrase du sens « ${l} »`);
    for (const f of q.wrongs) {
      const autre = w.sens.find((x) => x !== s && deLaListe(x.ph, f));
      if (!autre) p.push(`leurre « ${f} » : pas une phrase d'un AUTRE sens de « ${m} »`);
      if (deLaListe(s.ph, f)) p.push(`leurre « ${f} » : il emploie aussi le sens demandé`);
    }
    for (const f of [q.correct, ...q.wrongs]) if (!contientMot(f, m)) p.push(`« ${f} » ne contient pas « ${m} »`);
    return p;
  },
};

const TOURNURES_POLY_SENS = [
  "« %ph » Dans cette phrase, que veut dire « %m » ?",
  "Dans la phrase « %ph », quel est le sens de « %m » ?",
  "%L lit : « %ph » Ici, que veut dire « %m » ?",
] as const;

const briquePolySens: Brique = {
  generer() {
    const w = hasard(T.POLYSEMES);
    const s = hasard(w.sens);
    const n = tirerPrenom();
    const propres = w.sens.filter((x) => x !== s).map((x) => x.l);
    // Si le mot n'a que deux sens, on complète avec le sens d'un autre mot.
    const etrangers = melange(T.POLYSEMES.filter((x) => x !== w).flatMap((x) => x.sens.map((y) => y.l))).filter(
      (l) => !w.sens.some((y) => quasi(y.l, l)),
    );
    const t = hasard(TOURNURES_POLY_SENS);
    const ph = remplir(hasard(s.ph), n);
    return {
      text: t
        .replace("%ph", /%ph », /.test(t) ? ph.replace(/\.$/, "") : ph)
        .replace("%m", w.mot)
        .replace("%L", autreQue(n).p),
      correct: s.l,
      wrongs: [...melange(propres).slice(0, 2), ...etrangers].slice(0, 3),
      methode: "On remplace le mot par chaque sens proposé : un seul donne une phrase qui a du sens.",
    };
  },
  reconnait: (q) => /que veut dire « |quel est le sens de « /.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const c = cites(q.text);
    const m = c[c.length - 1];
    const ph = c.find((x) => x !== m) ?? "";
    const w = T.POLYSEMES.find((x) => x.mot === m);
    if (!w) return [`« ${m} » n'est pas dans la table des mots polysémiques`];
    const s = w.sens.filter((x) => deLaListe(x.ph, ph) || deLaListe(x.ph, ph + "."));
    if (s.length !== 1) return [`la phrase citée relève de ${s.length} sens de « ${m} »`];
    if (q.correct !== s[0].l) p.push(`bonne réponse « ${q.correct} » ≠ sens de la phrase « ${s[0].l} »`);
    for (const f of q.wrongs) {
      if (w.sens.some((x) => x !== s[0] && x.l === f)) continue;
      if (w.sens.some((x) => quasi(x.l, f))) p.push(`leurre « ${f} » : c'est un sens de « ${m} »`);
      else if (!T.POLYSEMES.some((x) => x !== w && x.sens.some((y) => y.l === f))) p.push(`leurre « ${f} » inconnu de la table`);
    }
    if (!contientMot(ph, m)) p.push(`la phrase ne contient pas « ${m} »`);
    return p;
  },
};

// ── 5. Réemployer un mot à bon escient ────────────────────────────────────

const accorde = (a: T.Adjectif, n: Prenom) => (n.f ? a.f : a.m);
/** Le mot `a` irait-il dans une situation du groupe `g`, au sens propre ou au sens figuré ? */
const convientAussi = (a: T.Adjectif, g: string) => a.g === g || (a.fig ?? []).includes(g);
const BLANC = "____";
const situation = (cadre: string, a: T.Adjectif | null, n: Prenom) =>
  remplir(cadre.replace("%A", a ? accorde(a, n) : BLANC), n);
/** Retrouve (adjectif du cadre, adjectif employé, prénom) d'une phrase d'option. */
function lireSituation(s: string) {
  for (const c of T.ADJECTIFS)
    for (const n of T.PRENOMS)
      for (const a of T.ADJECTIFS) if (situation(c.cadre, a, n) === s) return { c, a, n };
  return null;
}

const TOURNURES_REEMPLOI_PHRASE = [
  "« %M » veut dire « %d ». Quelle phrase l'emploie à bon escient ?",
  "%L vient d'apprendre le mot « %M » : « %d ». Dans quelle phrase est-il bien employé ?",
  "Quelle phrase emploie le mot « %M » à bon escient ?",
] as const;

const briqueReemploiPhrase: Brique = {
  generer() {
    const a = hasard(T.ADJECTIFS);
    const n = melange(T.PRENOMS);
    const autres = melange(T.ADJECTIFS.filter((x) => !convientAussi(a, x.g))).slice(0, 3);
    return {
      text: hasard(TOURNURES_REEMPLOI_PHRASE).replace(/^« %M/, "« " + maj(a.m)).replace("%M", a.m).replace("%d", a.def).replace("%L", n[4].p),
      correct: situation(a.cadre, a, n[0]),
      wrongs: autres.map((x, k) => situation(x.cadre, a, n[k + 1])),
      methode: `On cherche la situation où l'on est vraiment « ${a.def} ».`,
    };
  },
  reconnait: (q) => /bon escient|bien employé/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const m = cites(q.text)[0]?.toLowerCase();
    const a = T.ADJECTIFS.find((x) => x.m === m);
    if (!a) return [`« ${m} » n'est pas dans la table des adjectifs`];
    const def = cites(q.text)[1];
    if (def && def !== a.def) p.push(`la définition donnée « ${def} » n'est pas celle de « ${a.m} »`);
    const bon = lireSituation(q.correct);
    if (!bon) p.push(`bonne réponse « ${q.correct} » : situation inconnue`);
    else {
      if (bon.c !== a) p.push(`bonne réponse : ce n'est pas la situation de « ${a.m} »`);
      if (bon.a !== a) p.push("bonne réponse : ce n'est pas le mot interrogé");
    }
    for (const w of q.wrongs) {
      const x = lireSituation(w);
      if (!x) p.push(`leurre « ${w} » : situation inconnue`);
      else if (x.a !== a) p.push(`leurre « ${w} » : il n'emploie pas « ${a.m} »`);
      else if (convientAussi(a, x.c.g)) p.push(`leurre « ${w} » : « ${a.m} » y convient AUSSI (même groupe de sens, ou sens figuré)`);
    }
    return p;
  },
};

const TOURNURES_REEMPLOI_MOT = [
  "Complète avec le mot qui convient : « %s »",
  "Quel mot convient dans cette phrase ? « %s »",
  "%L hésite. Quel mot va le mieux ? « %s »",
] as const;

const briqueReemploiMot: Brique = {
  generer() {
    const a = hasard(T.ADJECTIFS);
    const n = tirerPrenom();
    const autres = melange(T.ADJECTIFS.filter((x) => !convientAussi(x, a.g) && accorde(x, n) !== accorde(a, n))).slice(0, 3);
    return {
      text: hasard(TOURNURES_REEMPLOI_MOT).replace("%s", situation(a.cadre, null, n)).replace("%L", autreQue(n).p),
      correct: accorde(a, n),
      wrongs: autres.map((x) => accorde(x, n)),
      methode: "On relit la situation : elle décrit ce que veut dire le bon mot. On n'oublie pas l'accord.",
    };
  },
  reconnait: (q) => q.text.includes(BLANC),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0] ?? "";
    let trouve: { a: T.Adjectif; n: Prenom } | null = null;
    for (const a of T.ADJECTIFS) for (const n of T.PRENOMS) if (situation(a.cadre, null, n) === s) trouve = { a, n };
    if (!trouve) return ["situation introuvable dans la table"];
    const { a, n } = trouve;
    if (q.correct !== accorde(a, n)) p.push(`bonne réponse « ${q.correct} » ≠ « ${accorde(a, n)} » (accordé avec ${n.p})`);
    for (const w of q.wrongs) {
      const x = T.ADJECTIFS.find((y) => y.m === w || y.f === w);
      if (!x) p.push(`leurre « ${w} » inconnu`);
      else {
        if (convientAussi(x, a.g)) p.push(`leurre « ${w} » : il irait AUSSI dans cette situation (même sens, ou sens figuré)`);
        if (w !== accorde(x, n)) p.push(`leurre « ${w} » : mal accordé avec ${n.p}`);
      }
    }
    return p;
  },
};

// ── 6. Les niveaux de langue ──────────────────────────────────────────────

type NomRegistre = "familier" | "courant" | "soutenu";
/** Les registres où un mot figure dans la table. */
const registresDe = (mot: string): Set<NomRegistre> => {
  const r = new Set<NomRegistre>();
  for (const x of T.REGISTRES) {
    if (x.fam === mot) r.add("familier");
    if (x.cour === mot) r.add("courant");
    if (x.sout === mot) r.add("soutenu");
  }
  return r;
};
const motDe = (x: T.Registre, r: NomRegistre) => (r === "familier" ? x.fam : r === "courant" ? x.cour : x.sout);

const TOURNURES_REG_MOT = [
  "Parmi ces mots, lequel est %r ?",
  "Quel mot appartient au langage %r ?",
  "%P cherche le mot du langage %r. Lequel ?",
] as const;

const briqueRegistreMot: Brique = {
  generer() {
    const r = hasard<NomRegistre>(["familier", "familier", "courant", "soutenu"]);
    const x = hasard(T.REGISTRES.filter((y) => motDe(y, r)));
    const memes = [x.fam, x.cour, x.sout].filter((m): m is string => !!m && m !== motDe(x, r));
    const autres = melange(T.REGISTRES.filter((y) => y.g !== x.g))
      .map((y) => (r === "courant" ? y.fam : y.cour))
      .filter((m) => !registresDe(m).has(r));
    return {
      text: hasard(TOURNURES_REG_MOT).replace("%r", r).replace("%P", tirerPrenom().p),
      correct: motDe(x, r) as string,
      wrongs: [...new Set([...memes, ...autres])].slice(0, 3),
      methode: "Familier : entre copains. Courant : avec tout le monde. Soutenu : dans un livre ou un discours.",
    };
  },
  reconnait: (q) => /lequel est (familier|courant|soutenu)|au langage (familier|courant|soutenu)|le mot du langage/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const r = q.text.match(/(familier|courant|soutenu)/)?.[1] as NomRegistre;
    if (!registresDe(q.correct).has(r)) p.push(`bonne réponse « ${q.correct} » : pas ${r} dans la table`);
    for (const w of q.wrongs) {
      const rw = registresDe(w);
      if (!rw.size) p.push(`leurre « ${w} » absent de la table`);
      if (rw.has(r)) p.push(`leurre « ${w} » : il est AUSSI ${r}`);
    }
    return p;
  },
};

const TOURNURES_REG_COURANT = [
  "Dans un exposé, %P remplace « %f » par un mot courant. Lequel ?",
  "Quel mot courant veut dire la même chose que « %f » ?",
  "En langage courant, comment dit-on « %f » ?",
] as const;

const briqueVersCourant: Brique = {
  generer() {
    const x = hasard(T.REGISTRES);
    const autres = [...new Set(melange(T.REGISTRES.filter((y) => y.g !== x.g)).map((y) => y.cour))].slice(0, 3);
    return {
      text: hasard(TOURNURES_REG_COURANT).replace("%f", x.fam).replace("%P", tirerPrenom().p),
      correct: x.cour,
      wrongs: autres,
      methode: `« ${x.fam} » est familier : on cherche le mot de tous les jours qui a le même sens.`,
    };
  },
  reconnait: (q) => /mot courant|En langage courant/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const f = cites(q.text)[0];
    const x = T.REGISTRES.find((y) => y.fam === f);
    if (!x) return [`« ${f} » n'est pas un mot familier de la table`];
    if (q.correct !== x.cour) p.push(`bonne réponse « ${q.correct} » ≠ « ${x.cour} »`);
    for (const w of q.wrongs) {
      const y = T.REGISTRES.find((z) => z.cour === w);
      if (!y) p.push(`leurre « ${w} » : pas un mot courant de la table`);
      else if (y.g === x.g) p.push(`leurre « ${w} » : même sens que « ${f} »`);
      if (w === x.sout) p.push(`leurre « ${w} » : même sens que « ${f} »`);
    }
    return p;
  },
};

type Niveaux = { v: NomRegistre; o: NomRegistre };
function composerPhrase(vi: number, oi: number, n: Niveaux): string | null {
  const v = T.VERBES_REGISTRE[vi];
  const o = T.OBJETS_REGISTRE[oi];
  const ov = n.o === "familier" ? o.fam : n.o === "courant" ? o.cour : o.sout;
  if (!ov) return null;
  return v.cadre.replace("%V", v[n.v === "familier" ? "fam" : n.v === "courant" ? "cour" : "sout"]).replace("%O", ov);
}
/** Les niveaux (verbe, objet) d'une phrase composée, ou null. */
function lirePhraseRegistre(s: string): Niveaux | null {
  const R3: NomRegistre[] = ["familier", "courant", "soutenu"];
  for (let vi = 0; vi < T.VERBES_REGISTRE.length; vi++)
    for (let oi = 0; oi < T.OBJETS_REGISTRE.length; oi++)
      for (const v of R3) for (const o of R3) if (composerPhrase(vi, oi, { v, o }) === s) return { v, o };
  return null;
}

const briqueSituation: Brique = {
  generer() {
    const vi = Math.floor(Math.random() * T.VERBES_REGISTRE.length);
    const oi = Math.floor(Math.random() * T.OBJETS_REGISTRE.length);
    const n = tirerPrenom();
    const sit = remplir(hasard(T.SITUATIONS_COURANT), n);
    const ff: Niveaux[] = [{ v: "familier", o: "familier" }, { v: "familier", o: "courant" }, { v: "courant", o: "familier" }];
    return {
      text: `${sit} Quelle phrase convient à cette situation ?`,
      correct: composerPhrase(vi, oi, { v: "courant", o: "courant" }) as string,
      wrongs: ff.map((x) => composerPhrase(vi, oi, x) as string),
      methode: "Devant un adulte qu'on ne connaît pas, on n'emploie aucun mot familier.",
    };
  },
  reconnait: (q) => /convient à cette situation/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const sit = q.text.replace(/ Quelle phrase convient à cette situation \?$/, "");
    if (!T.SITUATIONS_COURANT.some((s) => T.PRENOMS.some((n) => remplir(s, n) === sit))) p.push("situation inconnue");
    const c = lirePhraseRegistre(q.correct);
    if (!c || c.v === "familier" || c.o === "familier") p.push(`bonne réponse « ${q.correct} » : elle contient un mot familier`);
    for (const w of q.wrongs) {
      const x = lirePhraseRegistre(w);
      if (!x) p.push(`leurre « ${w} » : phrase inconnue`);
      else if (x.v !== "familier" && x.o !== "familier") p.push(`leurre « ${w} » : aucun mot familier, il conviendrait aussi`);
    }
    return p;
  },
};

const TOURNURES_REG_PHRASE = [
  "« %ph », dit %P. Dans quel niveau de langue est cette phrase ?",
  "%P dit : « %ph » Quel est le niveau de langue de cette phrase ?",
] as const;
const NOMS_REG: NomRegistre[] = ["familier", "courant", "soutenu"];

const briqueRegistrePhrase: Brique = {
  generer() {
    const r = hasard<NomRegistre>(["familier", "familier", "courant", "courant", "soutenu"]);
    let ph: string | null = null;
    while (!ph)
      ph = composerPhrase(
        Math.floor(Math.random() * T.VERBES_REGISTRE.length),
        Math.floor(Math.random() * T.OBJETS_REGISTRE.length),
        { v: r, o: r },
      );
    const t = hasard(TOURNURES_REG_PHRASE);
    return {
      text: t.replace("%ph", /^« %ph », dit/.test(t) ? ph.replace(/\.$/, "") : ph).replace("%P", tirerPrenom().p),
      correct: r,
      wrongs: NOMS_REG.filter((x) => x !== r),
      methode: "On regarde chaque mot : un seul mot familier rend la phrase familière.",
    };
  },
  reconnait: (q) => /niveau de langue (est|de) cette phrase/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const c0 = cites(q.text)[0];
    const ph = c0.endsWith(".") ? c0 : c0 + ".";
    const x = lirePhraseRegistre(ph);
    if (!x) return [`phrase inconnue : « ${ph} »`];
    if (x.v !== x.o) p.push("phrase mélangée : son niveau est discutable");
    if (q.correct !== x.v) p.push(`bonne réponse « ${q.correct} » ≠ « ${x.v} »`);
    for (const w of q.wrongs) if (!NOMS_REG.includes(w as NomRegistre) || w === x.v) p.push(`leurre « ${w} » invalide`);
    return p;
  },
};

// ── 7. L'orthographe des mots fréquents ───────────────────────────────────

function distance(a: string, b: string): number {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
}
/** Des mots français qui ressemblent à des fautes : jamais en leurre. */
const MOTS_EXISTANTS = new Set(["vacance", "travaille", "gentille", "professeure", "oiseaux", "mathématique", "quelques fois", "fasse"]);

const TOURNURES_ORTHO = [
  "Complète avec le mot bien écrit : « %ph »",
  "Quel mot est bien orthographié ? « %ph »",
  "%L recopie cette phrase. Quelle est la bonne orthographe du mot qui manque ? « %ph »",
] as const;

const briqueOrtho: Brique = {
  generer() {
    const o = hasard(T.ORTHO);
    const n = tirerPrenom();
    return {
      text: hasard(TOURNURES_ORTHO).replace("%ph", remplir(o.ph, n)).replace("%L", autreQue(n).p),
      correct: o.mot,
      wrongs: melange(o.fautes),
      methode: "C'est un mot qu'on rencontre souvent : on le relit lettre par lettre et on le mémorise.",
    };
  },
  reconnait: (q) => q.text.includes(BLANC),
  corriger(q) {
    const p: string[] = [];
    const ph = cites(q.text)[0] ?? "";
    const o = T.ORTHO.find((x) => T.PRENOMS.some((n) => remplir(x.ph, n) === ph));
    if (!o) return ["phrase introuvable dans la table d'orthographe"];
    if (q.correct !== o.mot) p.push(`bonne réponse « ${q.correct} » ≠ « ${o.mot} »`);
    for (const w of q.wrongs) {
      if (!o.fautes.includes(w)) p.push(`leurre « ${w} » : pas une faute de la table pour « ${o.mot} »`);
      if (T.ORTHO.some((x) => x.mot === w) || MOTS_EXISTANTS.has(w)) p.push(`leurre « ${w} » : c'est un mot qui existe`);
      if (distance(w, o.mot) > 3) p.push(`leurre « ${w} » : trop loin du mot pour être une faute plausible`);
    }
    if ((ph.match(/____/g) ?? []).length !== 1) p.push("la phrase doit avoir exactement une place vide");
    return p;
  },
};

// ── 8. Mot simple, dérivé, composé ────────────────────────────────────────

type Nature = "simple" | "dérivé" | "composé";
const NATURES: Nature[] = ["simple", "dérivé", "composé"];
function naturesDe(m: string): Nature[] {
  const r: Nature[] = [];
  if (T.SIMPLES.includes(m)) r.push("simple");
  if (T.DERIVES.some((x) => x.mot === m)) r.push("dérivé");
  if (T.COMPOSES.some((x) => x.mot === m)) r.push("composé");
  return r;
}
const motsDeNature = (n: Nature): string[] =>
  n === "simple" ? [...T.SIMPLES] : n === "dérivé" ? T.DERIVES.map((x) => x.mot) : T.COMPOSES.map((x) => x.mot);
const unMot = (n: Nature) => `un mot ${n}`;

function methodeNature(m: string, n: Nature): string {
  if (n === "simple") return "On ne peut pas le découper : ni préfixe, ni suffixe, un seul mot.";
  if (n === "dérivé") {
    const d = T.DERIVES.find((x) => x.mot === m)!;
    return `On y voit le mot simple « ${d.base} », avec un préfixe ou un suffixe.`;
  }
  const c = T.COMPOSES.find((x) => x.mot === m)!;
  return `Il réunit deux mots qui existent seuls : « ${c.a} » et « ${c.b} ».`;
}

const TOURNURES_NATURE = [
  "Le mot « %m » est-il simple, dérivé ou composé ?",
  "%P range le mot « %m » dans son tableau de vocabulaire. Dans quelle colonne ?",
  "Comment est formé le mot « %m » ?",
] as const;

const briqueNature: Brique = {
  generer() {
    const n = hasard(NATURES);
    const m = hasard(motsDeNature(n));
    return {
      text: hasard(TOURNURES_NATURE).replace("%m", m).replace("%P", tirerPrenom().p),
      correct: unMot(n),
      wrongs: NATURES.filter((x) => x !== n).map(unMot),
      methode: methodeNature(m, n),
    };
  },
  reconnait: (q) => /simple, dérivé ou composé|Dans quelle colonne|Comment est formé/.test(q.text),
  corriger(q) {
    const m = cites(q.text)[0];
    const ns = naturesDe(m);
    if (ns.length !== 1) return [`« ${m} » : ${ns.length} natures dans les tables`];
    const p: string[] = [];
    if (q.correct !== unMot(ns[0])) p.push(`bonne réponse « ${q.correct} » ≠ « ${unMot(ns[0])} »`);
    for (const w of q.wrongs) if (w === unMot(ns[0]) || !NATURES.map(unMot).includes(w)) p.push(`leurre « ${w} » invalide`);
    return p;
  },
};

const TOURNURES_NATURE_CHOIX = [
  "Lequel de ces mots est un mot %n ?",
  "%P cherche un mot %n. Lequel ?",
  "Parmi ces mots, lequel est %n ?",
] as const;

const briqueNatureChoix: Brique = {
  generer() {
    const n = hasard(NATURES);
    const m = hasard(motsDeNature(n));
    const autres = NATURES.filter((x) => x !== n);
    const wrongs = [hasard(motsDeNature(autres[0])), hasard(motsDeNature(autres[1])), hasard(motsDeNature(hasard(autres)))];
    return {
      text: hasard(TOURNURES_NATURE_CHOIX).replace("%n", n).replace("%P", tirerPrenom().p),
      correct: m,
      wrongs: [...new Set(wrongs)],
      methode: methodeNature(m, n),
    };
  },
  reconnait: (q) => /un mot (simple|dérivé|composé)( \?|\. Lequel)|lequel est (simple|dérivé|composé)/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const n = q.text.match(/(simple|dérivé|composé)/)?.[1] as Nature;
    const nc = naturesDe(q.correct);
    if (nc.length !== 1 || nc[0] !== n) p.push(`bonne réponse « ${q.correct} » : pas un mot ${n} (seul) dans les tables`);
    for (const w of q.wrongs) {
      const nw = naturesDe(w);
      if (!nw.length) p.push(`leurre « ${w} » absent des tables`);
      if (nw.includes(n)) p.push(`leurre « ${w} » : c'est AUSSI un mot ${n}`);
    }
    return p;
  },
};

// ── 9. Composer et décomposer ─────────────────────────────────────────────

const VERBAUX = T.COMPOSES.filter((x) => x.v && x.def);
const radDe = (s: string) => s.toLowerCase().slice(0, Math.min(4, s.length));

const briqueDefCompose: Brique = {
  generer() {
    const c = hasard(VERBAUX);
    const leurres = melange(VERBAUX.filter((x) => x.v !== c.v && !c.def!.includes(radDe(x.b)) && x.b !== c.b)).slice(0, 3);
    const t = hasard(["Quel mot composé désigne « %d » ?", "Comment appelle-t-on « %d » ?", "%P décrit « %d ». De quel mot composé parle-t-%il ?"]);
    const n = tirerPrenom();
    return {
      text: t.replace("%d", c.def!).replace("%P", n.p).replace("%il", il(n)),
      correct: c.mot,
      wrongs: leurres.map((x) => x.mot),
      methode: `Le mot composé réunit le verbe et le nom de la définition : « ${c.a} » + « ${c.b} ».`,
    };
  },
  reconnait: (q) => /mot composé désigne|Comment appelle-t-on|De quel mot composé/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const d = cites(q.text)[0];
    const c = VERBAUX.find((x) => x.mot === q.correct);
    if (!c) return [`bonne réponse « ${q.correct} » : pas un composé verbe + nom de la table`];
    if (c.def !== d) p.push(`la définition n'est pas celle de « ${c.mot} »`);
    if (!d.includes(c.v!) || !d.includes(radDe(c.b))) p.push(`la définition ne contient pas le verbe « ${c.v} » et le nom « ${c.b} »`);
    if (!c.mot.startsWith(c.a) || !c.mot.includes(c.b)) p.push(`« ${c.mot} » ne se forme pas de « ${c.a} » + « ${c.b} »`);
    for (const w of q.wrongs) {
      const x = VERBAUX.find((y) => y.mot === w);
      if (!x) p.push(`leurre « ${w} » absent de la table`);
      else if (x.v === c.v || d.includes(radDe(x.b))) p.push(`leurre « ${w} » : il colle AUSSI à la définition`);
    }
    return p;
  },
};

const briqueVerbeCompose: Brique = {
  generer() {
    const c = hasard(VERBAUX);
    const leurres = [...new Set(melange(T.COMPOSES.filter((x) => x.a !== c.a && x.v !== c.v)).map((x) => x.mot))].slice(0, 3);
    const t = hasard(["Lequel de ces mots est formé avec le verbe « %v » ?", "Quel mot composé contient le verbe « %v » ?"]);
    return {
      text: t.replace("%v", c.v!),
      correct: c.mot,
      wrongs: leurres,
      methode: `On cherche le mot qui commence par le verbe conjugué : « ${c.a} ».`,
    };
  },
  reconnait: (q) => /formé avec le verbe|contient le verbe/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const v = cites(q.text)[0];
    const c = VERBAUX.find((x) => x.mot === q.correct);
    if (!c || c.v !== v) p.push(`bonne réponse « ${q.correct} » : pas formée avec « ${v} »`);
    for (const w of q.wrongs) {
      const x = T.COMPOSES.find((y) => y.mot === w);
      if (!x) p.push(`leurre « ${w} » absent de la table`);
      else if (x.v === v || (c && x.a === c.a)) p.push(`leurre « ${w} » : formé AUSSI avec « ${v} »`);
    }
    return p;
  },
};

const briqueAssembler: Brique = {
  generer() {
    const c = hasard(T.COMPOSES);
    const leurres = melange(T.COMPOSES.filter((x) => ![x.a, x.b].some((y) => y === c.a || y === c.b))).slice(0, 3);
    const t = hasard(["Avec « %a » et « %b », quel mot composé forme-t-on ?", "%P assemble « %a » et « %b ». Quel mot obtient-%il ?"]);
    const n = tirerPrenom();
    return {
      text: t.replace("%a", c.a).replace("%b", c.b).replace("%P", n.p).replace("%il", il(n)),
      correct: c.mot,
      wrongs: leurres.map((x) => x.mot),
      methode: "Un mot composé réunit deux mots qui existent seuls, parfois avec un trait d'union ou un petit mot (à, de, en).",
    };
  },
  reconnait: (q) => /quel mot composé forme-t-on|Quel mot obtient/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const [a, b] = cites(q.text);
    const c = T.COMPOSES.find((x) => x.mot === q.correct);
    if (!c || c.a !== a || c.b !== b) p.push(`bonne réponse « ${q.correct} » : pas formée de « ${a} » + « ${b} »`);
    if (!q.correct.includes(a) || !q.correct.includes(b)) p.push(`« ${q.correct} » ne contient pas « ${a} » et « ${b} »`);
    for (const w of q.wrongs) if (w.includes(a) && w.includes(b)) p.push(`leurre « ${w} » : il contient AUSSI les deux mots`);
    return p;
  },
};

type Partie = "préfixe" | "suffixe" | "radical";
const forme = (k: Partie, s: string) => (k === "préfixe" ? `${s}-` : k === "suffixe" ? `-${s}` : s);

const briqueDecouper: Brique = {
  generer() {
    const k = hasard<Partie>(["préfixe", "suffixe", "radical"]);
    const ok = T.DERIVES.filter((x) => (k === "préfixe" ? x.pre : k === "suffixe" ? x.suf : x.pre && x.suf));
    const d = hasard(ok);
    const morceaux: string[] = [];
    if (d.pre && k !== "préfixe") morceaux.push(forme("préfixe", d.pre));
    if (d.suf && k !== "suffixe") morceaux.push(forme("suffixe", d.suf));
    if (k !== "radical") morceaux.push(d.rad);
    // Un morceau d'un autre mot, de la même sorte, absent de celui-ci.
    const etranger = hasard(
      T.DERIVES.map((x) => (k === "préfixe" ? x.pre : k === "suffixe" ? x.suf : x.rad)).filter(
        (s) => s && !d.mot.includes(s),
      ),
    );
    const t = hasard(["Dans le mot « %m », quel est le %k ?", "%P découpe le mot « %m ». Quel est son %k ?"]);
    return {
      text: t.replace("%m", d.mot).replace("%k", k).replace("%P", tirerPrenom().p),
      correct: forme(k, k === "préfixe" ? d.pre : k === "suffixe" ? d.suf : d.rad),
      wrongs: [...new Set([...morceaux, forme(k, etranger)])].slice(0, 3),
      methode: `${d.pre ? `« ${d.pre}- » est le préfixe, ` : ""}« ${d.rad} » le radical${d.suf ? `, « -${d.suf} » le suffixe` : ""}.`,
    };
  },
  reconnait: (q) => /quel est le (préfixe|suffixe|radical)|Quel est son (préfixe|suffixe|radical)/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const m = cites(q.text)[0];
    const k = q.text.match(/(préfixe|suffixe|radical) \?/)?.[1] as Partie;
    const d = T.DERIVES.find((x) => x.mot === m);
    if (!d) return [`« ${m} » absent de la table des dérivés`];
    if (d.pre + d.rad + d.suf !== d.mot) p.push(`table fausse : ${d.pre}+${d.rad}+${d.suf} ≠ ${d.mot}`);
    const bon = forme(k, k === "préfixe" ? d.pre : k === "suffixe" ? d.suf : d.rad);
    if (q.correct !== bon) p.push(`bonne réponse « ${q.correct} » ≠ « ${bon} »`);
    for (const w of q.wrongs) if (w === bon) p.push(`leurre « ${w} » : c'est la bonne réponse`);
    if (k === "préfixe" && !d.mot.startsWith(d.pre)) p.push("le préfixe n'est pas au début du mot");
    if (k === "suffixe" && !d.mot.endsWith(d.suf)) p.push("le suffixe n'est pas à la fin du mot");
    return p;
  },
};

// ── 10. Les racines latines et grecques ───────────────────────────────────

const racineDans = (mot: string, r: string) => mot.toLowerCase().includes(r.toLowerCase());

const briqueSensRacine: Brique = {
  generer() {
    const r = hasard(T.RACINES);
    const w = hasard(r.mots);
    // La racine voisine dans le même mot donne un leurre plausible (« mètre » dans « chronomètre »).
    const voisine = T.RACINES.filter((x) => x !== r && x.g !== r.g && x.mots.includes(w)).map((x) => x.sens);
    const autres = melange(T.RACINES.filter((x) => x.g !== r.g)).map((x) => x.sens);
    const t = hasard([
      "Dans « %w », que veut dire la racine %o « %r » ?",
      "%P lit le mot « %w ». Que veut dire sa racine %o « %r » ?",
      "La racine %o « %r » se trouve dans « %w ». Que veut-elle dire ?",
    ]);
    return {
      text: t.replace("%w", w).replace("%o", r.o).replace("%r", r.r).replace("%P", tirerPrenom().p),
      correct: r.sens,
      wrongs: [...new Set([...voisine, ...autres])].slice(0, 3),
      methode: `« ${r.r} » veut dire « ${r.sens} » : on le retrouve dans ${r.mots.map((x) => `« ${x} »`).join(" et ")}.`,
    };
  },
  reconnait: (q) => /que veut dire la racine|Que veut dire sa racine|Que veut-elle dire/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const c = cites(q.text);
    const r = T.RACINES.find((x) => c.includes(x.r) && x.mots.some((m) => c.includes(m)));
    if (!r) return ["racine ou mot introuvable dans la table"];
    const w = c.find((x) => r.mots.includes(x))!;
    if (!racineDans(w, r.r)) p.push(`« ${r.r} » ne se voit pas dans « ${w} »`);
    if (q.correct !== r.sens) p.push(`bonne réponse « ${q.correct} » ≠ « ${r.sens} »`);
    for (const s of q.wrongs) {
      const x = T.RACINES.find((y) => y.sens === s);
      if (!x) p.push(`leurre « ${s} » : le sens d'aucune racine`);
      else if (x.g === r.g || quasi(s, r.sens)) p.push(`leurre « ${s} » : même sens que « ${r.r} »`);
    }
    return p;
  },
};

const briqueQuelleRacine: Brique = {
  generer() {
    const r = hasard(T.RACINES);
    const leurres = melange(T.RACINES.filter((x) => x.g !== r.g)).slice(0, 3);
    const t = hasard(["Quelle racine veut dire « %s » ?", "%P cherche une racine qui veut dire « %s ». Laquelle ?"]);
    return {
      text: t.replace("%s", r.sens).replace("%P", tirerPrenom().p),
      correct: r.r,
      wrongs: leurres.map((x) => x.r),
      methode: `« ${r.r} » veut dire « ${r.sens} », comme dans « ${r.mots[0]} ».`,
    };
  },
  reconnait: (q) => /racine qui veut dire|Quelle racine veut dire/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const s = cites(q.text)[0];
    const r = T.RACINES.find((x) => x.r === q.correct);
    if (!r || r.sens !== s) p.push(`« ${q.correct} » ne veut pas dire « ${s} »`);
    for (const w of q.wrongs) {
      const x = T.RACINES.find((y) => y.r === w);
      if (!x) p.push(`leurre « ${w} » absent de la table`);
      else if (x.sens === s || (r && x.g === r.g)) p.push(`leurre « ${w} » : il veut AUSSI dire « ${s} »`);
    }
    return p;
  },
};

const briqueMotRacine: Brique = {
  generer() {
    const r = hasard(T.RACINES);
    const leurres = [
      ...new Set(
        melange(T.RACINES.filter((x) => x.g !== r.g).flatMap((x) => x.mots)).filter(
          (m) => !racineDans(m, r.r) && !T.RACINES.some((y) => y.g === r.g && racineDans(m, y.r)),
        ),
      ),
    ].slice(0, 3);
    const t = hasard(["Quel mot contient la racine « %r » (%s) ?", "%P cherche un mot formé avec la racine « %r » (%s). Lequel ?"]);
    return {
      text: t.replace("%r", r.r).replace("%s", r.sens).replace("%P", tirerPrenom().p),
      correct: hasard(r.mots),
      wrongs: leurres,
      methode: `On cherche « ${r.r} » à l'intérieur de chaque mot.`,
    };
  },
  reconnait: (q) => /contient la racine|formé avec la racine/.test(q.text),
  corriger(q) {
    const p: string[] = [];
    const rr = cites(q.text)[0];
    const r = T.RACINES.find((x) => x.r === rr);
    if (!r) return [`racine « ${rr} » absente de la table`];
    if (!r.mots.includes(q.correct) || !racineDans(q.correct, r.r)) p.push(`bonne réponse « ${q.correct} » : pas un mot de la racine « ${r.r} »`);
    for (const w of q.wrongs) {
      if (racineDans(w, r.r)) p.push(`leurre « ${w} » : il contient AUSSI « ${r.r} »`);
      if (T.RACINES.some((y) => y.g === r.g && y.mots.includes(w))) p.push(`leurre « ${w} » : même sens de racine`);
    }
    return p;
  },
};

export const GENERATEURS: GenerateursFrancais = {
  "6e_voc_formation": micro([briqueNature, briqueNature, briqueNatureChoix, briqueMotCache], saufLaPlusLongue),
  "6e_voc_composition": micro([briqueDefCompose, briqueVerbeCompose, briqueAssembler, briqueDecouper], saufLaPlusLongue),
  "6e_voc_racines": micro([briqueSensRacine, briqueQuelleRacine, briqueMotRacine], saufLaPlusLongue),
  "6e_voc_orthographe": micro([briqueOrtho], saufLaPlusLongue),
  "6e_voc_niveau_langue": micro([briqueRegistreMot, briqueVersCourant, briqueSituation, briqueRegistrePhrase], saufLaPlusLongue),
  "6e_voc_reemploi": micro([briqueReemploiPhrase, briqueReemploiMot], saufLaPlusLongue),
  "6e_voc_polysemie": micro([briquePolyPhrase, briquePolySens], saufLaPlusLongue),
  "6e_voc_sens_figure": micro([briqueFigure, briqueFigure, briqueExpressionSens, briqueSensExpression], saufLaPlusLongue),
  "6e_voc_strategies": micro([briqueIndice, briqueMotCache, briqueMethode], saufLaPlusLongue),
  "6e_voc_contexte": micro([briqueContexte], (q) => cites(q.text).slice(-1)),
};
