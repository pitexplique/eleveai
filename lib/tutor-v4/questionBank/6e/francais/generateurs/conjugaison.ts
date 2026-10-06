import type { GenerateursFrancais, QuestionFrancais } from "./types";
import {
  NB, PRENOMS, VERBES_REGULIERS, VERBES_VARIATIONS, VERBES_MODES, CONDITIONS, OUVERTURES_COND, INDICES_TEMPS,
  T_PRESENT_1, T_PRESENT_2, T_IMPARFAIT, T_FUTUR,
  VERBES_COMPOSES, AVOIR, ETRE, INDICES_PASSE, EVENEMENTS_APRES, PASSE_SIMPLE, INDICES_RECIT,
  PP_MODES, AVEC_ETRE_MODES, REPERES_EMPLOI,
  type Prenom, type VerbeRegulier, type VerbeVariation, type ClasseVariation, type VerbeCompose,
} from "./conjugaison-tables";

// GÉNÉRATEURS DE CONJUGAISON DE 6e (05/10/2026) — voir types.ts.
// ⭐ Deux moitiés qui ne se parlent pas :
//   — le GÉNÉRATEUR compose la phrase avec les formes de conjugaison-tables.ts ;
//   — le CORRECTEUR relit la phrase TIRÉE, retrouve le verbe et le sujet dans le
//     texte, recalcule la forme attendue par les RÈGLES DE FORMATION (et sa propre
//     petite table d'irréguliers, plus bas), puis compare.
// Le moteur du cycle 3 (cycle3/francais/conjugationEngine.ts) ne sert que le
// présent / imparfait / futur sans phrase : ces micros-ci demandent des phrases.

// ── Outils communs ───────────────────────────────────────────────────────────
type Temps = "present" | "imparfait" | "futur";
const TEMPS: Temps[] = ["present", "imparfait", "futur"];
const PRONOMS = ["je", "tu", "il", "nous", "vous", "ils"];

const hasard = <T,>(t: readonly T[]): T => t[Math.floor(Math.random() * t.length)];
function melange<T>(t: T[]): T[] {
  const r = [...t];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const cite = (s: string) => `«${NB}${s}${NB}»`;
const citations = (t: string): string[] => [...t.matchAll(/« ([^»]*?) »/g)].map((m) => m[1]);
const VOYELLE = /^[aeiouyàâéèêëîïôûh]/i;
const sansTiret = (s: string) => s.replace(/-/g, "");
const bas = (s: string) => s.toLowerCase();

/** Question à choix : leurres sans doublon, trois au plus. */
function qcm(text: string, correct: string, wrongs: string[], methode: string): QuestionFrancais {
  const vus = new Set([bas(correct)]);
  const w = wrongs.filter((x) => (vus.has(bas(x)) ? false : (vus.add(bas(x)), true)));
  return { text, correct, wrongs: w.slice(0, 3), methode };
}

/** Deux prénoms différents. */
function deuxPrenoms(): [Prenom, Prenom] {
  const a = hasard(PRENOMS);
  let b = hasard(PRENOMS);
  while (b.nom === a.nom) b = hasard(PRENOMS);
  return [a, b];
}

/** Le sujet écrit pour une personne (0 = je … 5 = ils), sans élision. */
function sujetDe(p: number): string {
  if (p === 0) return "je";
  if (p === 1) return "tu";
  if (p === 2) return hasard(PRENOMS).nom;
  if (p === 3) return Math.random() < 0.5 ? "nous" : `${hasard(PRENOMS).nom} et moi, nous`;
  if (p === 4) return Math.random() < 0.5 ? "vous" : `${hasard(PRENOMS).nom} et toi, vous`;
  const [a, b] = deuxPrenoms();
  return `${a.nom} et ${b.nom}`;
}
/** « je » + verbe, avec l'élision devant une voyelle ou un h muet. */
const lierJe = (sujet: string, suite: string) =>
  sujet === "je" && VOYELLE.test(suite) ? `j'${suite}` : `${sujet} ${suite}`;

// ── Formes du GÉNÉRATEUR (verbes réguliers) ──────────────────────────────────
function formeGen(v: VerbeRegulier, t: Temps, p: number): string {
  const rad = v.inf.slice(0, -2);
  if (t === "futur") return v.inf + T_FUTUR[p];
  if (t === "present") return v.groupe === 1 ? rad + T_PRESENT_1[p] : rad + T_PRESENT_2[p];
  return (v.groupe === 1 ? rad : rad + "iss") + T_IMPARFAIT[p];
}

// ═════════════════════════════════════════════════════════════════════════════
// LE CORRECTEUR : règles de formation, écrites sans regarder le générateur.
// ═════════════════════════════════════════════════════════════════════════════

/** Présent par la règle : 1er groupe -e/-es/-e…, 2e groupe -is/-is/-it/-issons… */
function cPresent(inf: string, p: number): string {
  const base = inf.slice(0, -2);
  if (inf.endsWith("er")) return base + ["e", "es", "e", "ons", "ez", "ent"][p];
  return base + ["is", "is", "it", "issons", "issez", "issent"][p];
}
/** Imparfait : le radical de « nous » au présent + -ais, -ais, -ait, -ions, -iez, -aient. */
function cImparfait(inf: string, p: number): string {
  const rad = cPresent(inf, 3).replace(/ons$/, "");
  return rad + ["ais", "ais", "ait", "ions", "iez", "aient"][p];
}
/** Futur : l'infinitif + le présent d'« avoir » (ai, as, a, [av]ons, [av]ez, ont). */
function cFutur(inf: string, p: number): string {
  return inf + ["ai", "as", "a", "ons", "ez", "ont"][p];
}
const cForme = (inf: string, t: Temps, p: number) =>
  t === "present" ? cPresent(inf, p) : t === "imparfait" ? cImparfait(inf, p) : cFutur(inf, p);

/** La personne du sujet, lue dans le texte qui précède le verbe. */
function personneLue(avant: string): number | null {
  const a = avant.trim();
  if (/(^|\s)j'$/i.test(avant) || /(^|\s)je$/i.test(a)) return 0;
  if (/(^|\s)tu$/i.test(a)) return 1;
  if (/(^|\s)nous$/i.test(a)) return 3;
  if (/(^|\s)vous$/i.test(a)) return 4;
  if (/(^|\s)(il|elle)$/i.test(a)) return 2;
  if (/(^|\s)(ils|elles)$/i.test(a)) return 5;
  const noms = new Set(PRENOMS.map((x) => x.nom));
  const deux = a.match(/(\p{Lu}[\p{L}]+) et (\p{Lu}[\p{L}]+)$/u);
  if (deux && noms.has(deux[1]) && noms.has(deux[2])) return 5;
  const un = a.match(/(\p{Lu}[\p{L}]+)$/u);
  if (un && noms.has(un[1])) return 2;
  return null;
}

type Lecture = { inf: string; t: Temps; p: number; mot: string; avant: string };
/** Toutes les façons de lire un verbe régulier de la table dans la phrase. */
function lectures(phrase: string): Lecture[] {
  const res: Lecture[] = [];
  for (const { inf } of VERBES_REGULIERS)
    for (const t of TEMPS)
      for (let p = 0; p < 6; p++) {
        const f = cForme(inf, t, p);
        const m = phrase.match(new RegExp(`(^|[\\s'])${f}(?![\\p{L}])`, "iu"));
        if (m && m.index !== undefined) res.push({ inf, t, p, mot: f, avant: phrase.slice(0, m.index + m[1].length) });
      }
  return res;
}
/** Lecture unique du verbe, accordée au sujet lu ; sinon la liste des problèmes. */
function lireVerbe(phrase: string): Lecture | string {
  const ls = lectures(phrase).filter((l) => personneLue(l.avant) === l.p);
  const sens = new Set(ls.map((l) => `${l.inf}|${l.t}|${l.p}`));
  if (sens.size === 0) return `aucun verbe de la table accordé à son sujet dans « ${phrase} »`;
  if (sens.size > 1) return `verbe lisible de plusieurs façons dans « ${phrase} »`;
  return ls[0];
}
/** Élisions manquantes ou fautives. */
function elisions(t: string): string[] {
  const p: string[] = [];
  if (/(^|[\s« ])(je|que|le|la|de|ne|se) [aeiouyéèêàâîôh]/i.test(t)) p.push(`élision manquante dans « ${t} »`);
  if (/(^|[\s« ])(j|qu|l|d|n|s)'[bcdfgjklmnpqrstvwxz]/i.test(t)) p.push(`élision fautive dans « ${t} »`);
  return p;
}

// ═════════════════════════════════════════════════════════════════════════════
// 6e_conj_marques — la marque de temps et la marque de personne.
// ═════════════════════════════════════════════════════════════════════════════
const LIB_TEMPS: Record<Temps, string> = { present: "au présent", imparfait: "à l'imparfait", futur: "au futur" };

/** Découpage du générateur : radical, marque de temps, marque de personne. */
function decoupeGen(v: VerbeRegulier, t: Temps, p: number) {
  const pers =
    t === "futur" ? T_FUTUR[p] : t === "present" && v.groupe === 1 ? T_PRESENT_1[p]
      : ["s", "s", "t", "ons", "ez", "ent"][p];
  const temps = t === "imparfait" ? (p === 3 || p === 4 ? "i" : "ai") : t === "futur" ? "r" : "";
  const radical = v.groupe === 1 ? v.inf.slice(0, -2) : t === "imparfait" || (t === "present" && p >= 3) ? v.inf.slice(0, -2) + "iss" : "";
  return { pers, temps, radical };
}
/** Découpage du correcteur : on retire la terminaison de personne, puis le radical. */
function decoupeCorr(l: Lecture): { pers: string; temps: string } {
  const PERS: Record<Temps, string[]> = {
    present: l.inf.endsWith("er") ? ["e", "es", "e", "ons", "ez", "ent"] : ["s", "s", "t", "ons", "ez", "ent"],
    imparfait: ["s", "s", "t", "ons", "ez", "ent"],
    futur: ["ai", "as", "a", "ons", "ez", "ont"],
  };
  const pers = PERS[l.t][l.p];
  const reste = l.mot.slice(0, l.mot.length - pers.length);
  let temps = "";
  if (l.t === "futur") temps = reste.endsWith("r") ? "r" : "?";
  if (l.t === "imparfait") {
    const rad = cPresent(l.inf, 3).replace(/ons$/, "");
    temps = reste.startsWith(rad) ? reste.slice(rad.length) : "?";
  }
  return { pers, temps };
}

function genMarques(): QuestionFrancais {
  const v = hasard(VERBES_REGULIERS);
  const cplt = hasard(v.cplts);
  const type = hasard(["personne", "personne", "temps", "temps", "quelTemps", "pronom"] as const);
  const t: Temps = type === "temps" ? hasard(["imparfait", "futur"] as Temps[]) : hasard(TEMPS);
  let p = Math.floor(Math.random() * 6);
  const forme = formeGen(v, t, p);
  const d = decoupeGen(v, t, p);

  if (type === "pronom") {
    // Une personne dont la forme est UNIQUE à ce temps (« jouais » = je ou tu : exclu).
    const uniques = [0, 1, 2, 3, 4, 5].filter((k) => [0, 1, 2, 3, 4, 5].filter((j) => formeGen(v, t, j) === formeGen(v, t, k)).length === 1);
    p = hasard(uniques);
    const f = formeGen(v, t, p);
    const pron = (k: number) => (k === 0 && VOYELLE.test(f) ? "j'" : PRONOMS[k]);
    const autres = melange([0, 1, 2, 3, 4, 5].filter((k) => k !== p)).map(pron);
    const consigne = hasard([
      `Quel pronom sujet peut-on placer devant ${cite(`${f} ${cplt}`)} ?`,
      `Qui fait l'action dans ${cite(`… ${f} ${cplt}`)} ? Choisis le pronom.`,
      `La terminaison de ${cite(f)} indique la personne. Quel pronom va avec ce verbe ?`,
    ]);
    return qcm(consigne, pron(p), autres, "La marque de personne, à la fin du verbe, dit qui fait l'action.");
  }

  const indice = hasard(INDICES_TEMPS[t]);
  const sujet = sujetDe(p);
  const corps = lierJe(sujet, `${forme} ${cplt}`);
  const ph = type === "quelTemps" ? maj(corps) : `${indice}, ${corps}`;
  const radicalLeurre = d.radical ? [`${d.radical}-`] : [];
  const fin = (s: string) => `-${s}`;
  const mil = (s: string) => `-${s}-`;

  if (type === "personne") {
    const endings = t === "futur" ? T_FUTUR : t === "present" && v.groupe === 1 ? T_PRESENT_1 : ["s", "s", "t", "ons", "ez", "ent"];
    const leurres = [
      ...(d.temps ? [mil(d.temps)] : []),
      ...radicalLeurre,
      ...melange(endings.filter((e) => e !== d.pers).map(fin)),
    ];
    const consigne = hasard([
      `Dans ${cite(ph)}, quelle est la marque de personne du verbe ?`,
      `${cite(ph)} : quelle partie du verbe indique la personne ?`,
      `Dans la phrase ${cite(ph)}, quelle terminaison montre QUI fait l'action ?`,
    ]);
    return qcm(consigne, fin(d.pers), leurres.slice(0, 2).concat(melange(leurres.slice(2))), "La marque de personne est tout à la fin du verbe : elle change avec le sujet.");
  }
  if (type === "temps") {
    const autreTemps = t === "imparfait" ? ["-r-"] : v.groupe === 1 && p !== 0 ? ["-ai-"] : [];
    const autres = melange((t === "futur" ? T_FUTUR : ["s", "s", "t", "ons", "ez", "ent"]).filter((e) => e !== d.pers).map(fin));
    const leurres = [fin(d.pers), ...radicalLeurre, ...autreTemps, ...autres]
      .filter((x, i) => i === 0 || sansTiret(x) !== d.pers);
    const consigne = hasard([
      `Dans ${cite(ph)}, quelle est la marque de temps du verbe ?`,
      `${cite(ph)} : quelle partie du verbe indique le temps ?`,
      `Dans la phrase ${cite(ph)}, le verbe est ${LIB_TEMPS[t]}. Quelle est sa marque de temps ?`,
    ]);
    const methode = t === "imparfait"
      ? "À l'imparfait, « -ai- » ou « -i- » se glisse juste avant la marque de personne."
      : "Au futur, le « r » se place juste avant la marque de personne.";
    return qcm(consigne, mil(d.temps), leurres, methode);
  }
  // quelTemps : pas de mot de temps dans la phrase, seule la terminaison parle.
  const consigne = hasard([
    `À quel temps est le verbe de ${cite(ph)} ? Regarde sa terminaison.`,
    `${cite(ph)} : à quel temps est conjugué le verbe ?`,
    `Observe la terminaison du verbe dans ${cite(ph)}. À quel temps est-il ?`,
  ]);
  const leurres = melange([...TEMPS.filter((x) => x !== t).map((x) => LIB_TEMPS[x]), "au passé composé"]);
  return qcm(consigne, LIB_TEMPS[t], leurres, "Cherche « -ai- » ou « -i- » (imparfait), ou le « r » (futur), juste avant la marque de personne.");
}

function corrMarques(q: QuestionFrancais): string[] {
  const pb: string[] = [];
  const [cit] = citations(q.text);
  if (!cit) return ["aucune citation dans l'énoncé"];
  pb.push(...elisions(cit));
  if (/pronom/i.test(q.text)) {
    // Le verbe est cité seul (ou après « … ») : sa personne se retrouve par la terminaison.
    const mot = cit.replace(/^…\s*/, "").split(" ")[0];
    const pers = new Set<number>();
    for (const { inf } of VERBES_REGULIERS) for (const t of TEMPS) for (let p = 0; p < 6; p++) if (cForme(inf, t, p) === mot) pers.add(p);
    if (pers.size !== 1) return [...pb, `« ${mot} » va avec ${pers.size} personnes : le pronom n'est pas unique`];
    const p = [...pers][0];
    const attendu = p === 0 && VOYELLE.test(mot) ? "j'" : PRONOMS[p];
    if (q.correct !== attendu) pb.push(`le pronom de « ${mot} » est « ${attendu} », pas « ${q.correct} »`);
    for (const w of q.wrongs) if (w === attendu || (p === 2 && w === "elle") || (p === 5 && w === "elles")) pb.push(`le leurre « ${w} » convient aussi`);
    return pb;
  }
  const l = lireVerbe(cit);
  if (typeof l === "string") return [...pb, l];
  const d = decoupeCorr(l);
  if (/marque de personne|indique la personne|QUI fait/.test(q.text)) {
    if (q.correct !== `-${d.pers}`) pb.push(`la marque de personne de « ${l.mot} » est « -${d.pers} »`);
    for (const w of q.wrongs) if (sansTiret(w) === d.pers) pb.push(`le leurre « ${w} » est la marque de personne`);
  } else if (/marque de temps|indique le temps/.test(q.text)) {
    if (!d.temps || d.temps === "?") return [...pb, `« ${l.mot} » n'a pas de marque de temps lisible`];
    if (q.correct !== `-${d.temps}-`) pb.push(`la marque de temps de « ${l.mot} » est « -${d.temps}- »`);
    for (const w of q.wrongs) if (w === `-${d.temps}-`) pb.push(`le leurre « ${w} » est la marque de temps`);
    if (/le verbe est (au|à l')/.test(q.text) && !q.text.includes(LIB_TEMPS[l.t])) pb.push("le temps annoncé n'est pas celui du verbe");
  } else if (/quel temps/i.test(q.text)) {
    if (q.correct !== LIB_TEMPS[l.t]) pb.push(`« ${l.mot} » est ${LIB_TEMPS[l.t]}`);
    if (q.wrongs.includes(LIB_TEMPS[l.t])) pb.push("un leurre est le bon temps");
    if (Object.values(INDICES_TEMPS).flat().some((i) => cit.startsWith(i))) pb.push("un mot de temps donne la réponse sans la terminaison");
  } else pb.push("tournure de consigne inconnue du correcteur");
  // Le mot de temps en tête (s'il y en a un) doit aller avec le temps du verbe.
  const indice = (Object.keys(INDICES_TEMPS) as Temps[]).find((t) => INDICES_TEMPS[t].some((i) => cit.startsWith(i + ",")));
  if (indice && indice !== l.t) pb.push(`le mot de temps annonce ${LIB_TEMPS[indice]}, le verbe est ${LIB_TEMPS[l.t]}`);
  return pb;
}

// ═════════════════════════════════════════════════════════════════════════════
// 6e_conj_radical_variations — le radical qui change (1er groupe).
// ═════════════════════════════════════════════════════════════════════════════

/** Forme du GÉNÉRATEUR, lue dans les formes écrites en toutes lettres. */
function formeVar(v: VerbeVariation, t: Temps, p: number): string {
  if (t === "present") return v.present.split(" ")[p];
  if (t === "imparfait")
    return p === 3 || p === 4 ? v.impNous.slice(0, -4) + T_IMPARFAIT[p] : v.impJe.slice(0, -3) + T_IMPARFAIT[p];
  return v.futJe.slice(0, -2) + T_FUTUR[p];
}
/** Ce qu'écrit l'élève qui oublie la variation : radical + terminaison, sans rien changer. */
function naive(inf: string, t: Temps, p: number): string {
  const rad = inf.slice(0, -2);
  return t === "present" ? rad + T_PRESENT_1[p] : t === "imparfait" ? rad + T_IMPARFAIT[p] : inf + T_FUTUR[p];
}
/** La variation appliquée PARTOUT, même là où elle n'a rien à faire (nous appellons…). */
function surApplique(v: VerbeVariation, t: Temps, p: number): string {
  const rad = v.inf.slice(0, -2);
  const r =
    v.classe === "ger" ? rad + "e"
      : v.classe === "cer" ? rad.slice(0, -1) + "ç"
        : v.classe === "yer" ? rad.slice(0, -1) + "i"
          : v.classe === "double" ? rad + rad.slice(-1)
            : v.classe === "grave" ? rad.replace(/e([^aeiouyéè]+)$/, "è$1")
              : rad.replace(/é([^aeiouyéè]+)$/, "è$1");
  return t === "present" ? r + T_PRESENT_1[p] : t === "imparfait" ? r + T_IMPARFAIT[p] : r + "er" + T_FUTUR[p];
}
/** Une deuxième faute d'orthographe vraisemblable, propre à chaque sorte de verbe. */
function fauteVoisine(v: VerbeVariation, forme: string): string | null {
  switch (v.classe) {
    case "ger": return /ge[ao]/.test(forme) ? forme.replace(/ge([ao])/, "j$1") : null;
    case "cer": return /ç[ao]/.test(forme) ? forme.replace(/ç([ao])/, "ce$1") : null;
    case "double": return /(ll|tt)/.test(forme) ? forme.replace(/e(ll|tt)/, (_m, c: string) => `è${c[0]}`) : null;
    case "grave": return /è/.test(forme) ? forme.replace("è", "é") : null;
    case "aigu": return /è/.test(forme) ? forme.replace("è", "ê") : null;
    default: return null;
  }
}

const EXPLICATIONS: Record<ClasseVariation, string> = {
  ger: "pour garder le son « j » devant « a » ou « o »",
  cer: "pour garder le son « s » devant « a » ou « o »",
  yer: "parce que le « y » devient « i » devant un « e » muet",
  double: "parce que la consonne double devant un « e » muet",
  grave: "parce que le « e » prend un accent grave devant une syllabe muette",
  aigu: "parce que le « é » devient « è » devant une terminaison muette",
};
const EXPLICATIONS_FAUSSES = [
  "parce que le sujet est au pluriel",
  "parce que c'est un verbe du 3e groupe",
  "pour montrer que le verbe est au passé",
];
/** ⛔ « e → è » et « é → è » se ressemblent trop : jamais l'un comme leurre de l'autre. */
const VOISINES: Partial<Record<ClasseVariation, ClasseVariation>> = { grave: "aigu", aigu: "grave" };

const pronomElide = (p: number, forme: string) => (p === 0 && VOYELLE.test(forme) ? `j'${forme}` : `${PRONOMS[p]} ${forme}`);

function genRadical(): QuestionFrancais {
  const v = hasard(VERBES_VARIATIONS);
  const tempsPossibles: Temps[] = v.futJe ? TEMPS : ["present", "imparfait"];
  // Les cas où la variation joue, et (une fois sur quatre) les pièges où elle ne joue PAS.
  const cas: { t: Temps; p: number }[] = [];
  const pieges: { t: Temps; p: number }[] = [];
  for (const t of tempsPossibles)
    for (let p = 0; p < 6; p++) {
      const f = formeVar(v, t, p);
      // Piège seulement si la faute est vraisemblable : « mangeions », « lançez », « appellons »…
      // (« plongee » ne trompe personne).
      const vraisemblable =
        v.classe === "ger" ? t === "imparfait" && (p === 3 || p === 4)
          : v.classe === "cer" ? (t === "imparfait" && (p === 3 || p === 4)) || (t === "present" && p === 4)
            : true;
      if (f !== naive(v.inf, t, p)) cas.push({ t, p });
      else if (surApplique(v, t, p) !== f && vraisemblable) pieges.push({ t, p });
    }
  const type = hasard(["phrase", "phrase", "orthographe", "pourquoi"] as const);
  const { t, p } = type !== "pourquoi" && pieges.length && Math.random() < 0.25 ? hasard(pieges) : hasard(cas);
  const forme = formeVar(v, t, p);

  if (type === "pourquoi") {
    const pf = pronomElide(p, forme);
    const c = v.inf.slice(-3, -2);
    const question: Record<ClasseVariation, string> = {
      ger: `pourquoi écrit-on un « e » après le « g » dans « ${pf} » ?`,
      cer: `pourquoi met-on une cédille sous le « c » dans « ${pf} » ?`,
      yer: `pourquoi écrit-on un « i » et pas un « y » dans « ${pf} » ?`,
      double: `pourquoi y a-t-il deux « ${c} » dans « ${pf} » ?`,
      grave: `pourquoi y a-t-il un accent grave dans « ${pf} » ?`,
      aigu: `pourquoi l'accent devient-il grave dans « ${pf} » ?`,
    };
    const autres = (Object.keys(EXPLICATIONS) as ClasseVariation[])
      .filter((k) => k !== v.classe && k !== VOISINES[v.classe])
      .map((k) => EXPLICATIONS[k]);
    const leurres = melange([...melange(autres).slice(0, 2), hasard(EXPLICATIONS_FAUSSES)]);
    return qcm(nbsp(`Verbe « ${v.inf} » : ${question[v.classe]}`), EXPLICATIONS[v.classe], leurres,
      "Lis le verbe à voix haute : l'orthographe change pour garder le bon son.");
  }

  const autresP = [0, 1, 2, 3, 4, 5].filter((k) => formeVar(v, t, k) !== forme).map((k) => formeVar(v, t, k));
  const [autre1, autre2] = melange(autresP);
  const leurres = [naive(v.inf, t, p), surApplique(v, t, p), fauteVoisine(v, forme), autre1, autre2]
    .filter((x): x is string => !!x && x !== forme)
    .slice(0, 3);
  const methode: Record<ClasseVariation, string> = {
    ger: "Devant « a » ou « o », on garde le « e » après le « g » pour garder le son « j ».",
    cer: "Devant « a » ou « o », le « c » prend une cédille pour garder le son « s ».",
    yer: "Le « y » devient « i » seulement devant un « e » muet.",
    double: "« appeler » et « jeter » doublent leur consonne devant un « e » muet.",
    grave: "Devant une syllabe muette, le « e » du radical prend un accent grave.",
    aigu: "Devant une terminaison muette (-e, -es, -ent), le « é » devient « è ».",
  };
  if (type === "orthographe") {
    const pr = p === 0 && VOYELLE.test(forme) ? "j'" : PRONOMS[p];
    const consigne = hasard([
      `Quelle est la bonne orthographe de « ${v.inf} » ${LIB_TEMPS[t]} avec « ${pr} » ?`,
      `« ${v.inf} » ${LIB_TEMPS[t]}, avec « ${pr} » : quelle forme est bien écrite ?`,
      `Choisis la forme correcte de « ${v.inf} » ${LIB_TEMPS[t]} pour « ${pr} ».`,
    ]);
    return qcm(nbsp(consigne), forme, melange(leurres), methode[v.classe]);
  }
  const sujet = sujetDe(p);
  const debut = sujet === "je" && VOYELLE.test(forme) ? "j'___" : `${sujet} ___`;
  const ph = `${hasard(INDICES_TEMPS[t])}, ${debut} ${hasard(v.cplts)}.`;
  const consigne = hasard([
    `Complète : « ${ph} » (${v.inf}, ${LIB_TEMPS[t]})`,
    `Quelle forme complète la phrase ? « ${ph} » (${v.inf}, ${LIB_TEMPS[t]})`,
    `« ${ph} » Écris « ${v.inf} » ${LIB_TEMPS[t]} : quelle forme convient ?`,
  ]);
  return qcm(nbsp(consigne), forme, melange(leurres), methode[v.classe]);
}

// ── Correcteur des variations : les règles d'orthographe, appliquées une à une ──
/** Forme par la RÈGLE (1er groupe), y compris les variations du radical. */
function cRegleVar(inf: string, t: Temps, p: number): string {
  let rad = inf.slice(0, -2);
  const fin = t === "present" ? ["e", "es", "e", "ons", "ez", "ent"][p]
    : t === "imparfait" ? ["ais", "ais", "ait", "ions", "iez", "aient"][p]
      : "er" + ["ai", "as", "a", "ons", "ez", "ont"][p];
  // Le « e » qui suit le radical est-il muet ? (-e, -es, -ent du présent ; -erai… du futur)
  const muet = (t === "present" && [0, 1, 2, 5].includes(p)) || t === "futur";
  const finAO = /^[ao]/.test(fin);
  if (inf.endsWith("ger") && finAO) rad += "e";
  else if (inf.endsWith("cer") && finAO) rad = rad.slice(0, -1) + "ç";
  else if (/[ou]yer$/.test(inf) && muet) rad = rad.slice(0, -1) + "i";
  else if (/^(r|re)?(appeler|jeter)$/.test(inf) && muet) rad += rad.slice(-1);
  else if (/e[^aeiouyéè]$/.test(rad) && muet) rad = rad.replace(/e([^aeiouyéè])$/, "è$1");
  else if (/é[^aeiouyéè]+$/.test(rad) && muet && t === "present") rad = rad.replace(/é([^aeiouyéè]+)$/, "è$1");
  return rad + fin;
}
function classeParRegle(inf: string): ClasseVariation | null {
  if (inf.endsWith("ger")) return "ger";
  if (inf.endsWith("cer")) return "cer";
  if (/[ou]yer$/.test(inf)) return "yer";
  if (/^(r)?(appel|jet)er$/.test(inf) || /^rejeter$/.test(inf)) return "double";
  if (/e[^aeiouyéè]er$/.test(inf)) return "grave";
  if (/é[^aeiouyéè]+er$/.test(inf)) return "aigu";
  return null;
}
const nbsp = (s: string) => s.replace(/« /g, `«${NB}`).replace(/ »/g, `${NB}»`);
const TEMPS_LU = (t: string): Temps | null =>
  /au présent/.test(t) ? "present" : /à l'imparfait/.test(t) ? "imparfait" : /au futur/.test(t) ? "futur" : null;

function corrRadical(q: QuestionFrancais): string[] {
  const pb: string[] = [];
  const cits = citations(q.text);
  const inf = VERBES_VARIATIONS.map((v) => v.inf).find((i) => cits.includes(i) || q.text.includes(`(${i},`));
  if (!inf) return ["verbe introuvable dans l'énoncé"];
  if (/^Verbe /.test(q.text)) {
    // « pourquoi » : la forme citée doit montrer la variation, et l'explication être la bonne.
    const pf = cits[cits.length - 1] ?? "";
    const m = pf.match(/^(j'|je |tu |il |nous |vous |ils )(.+)$/);
    if (!m) return ["forme citée illisible"];
    const p = PRONOMS.indexOf(m[1] === "j'" ? "je" : m[1].trim());
    const t = TEMPS.find((x) => cRegleVar(inf, x, p) === m[2]);
    if (!t) return [`« ${pf} » n'est pas une forme juste de « ${inf} »`];
    if (m[2] === naive(inf, t, p)) pb.push("la forme citée ne montre aucune variation");
    const cl = classeParRegle(inf);
    if (!cl) return [...pb, `« ${inf} » n'a pas de variation connue du correcteur`];
    if (q.correct !== EXPLICATIONS[cl]) pb.push(`l'explication de « ${pf} » est : ${EXPLICATIONS[cl]}`);
    for (const w of q.wrongs) {
      if (w === EXPLICATIONS[cl]) pb.push("un leurre est la bonne explication");
      if (VOISINES[cl] && w === EXPLICATIONS[VOISINES[cl]!]) pb.push(`le leurre « ${w} » est presque la bonne réponse`);
    }
    pb.push(...elisions(pf));
    return pb;
  }
  const t = TEMPS_LU(q.text);
  if (!t) return ["temps introuvable dans l'énoncé"];
  let p: number | null = null;
  const pr = q.text.match(/(?:avec|pour) «\s(j'|je|tu|il|nous|vous|ils)\s»/);
  if (pr) p = PRONOMS.indexOf(pr[1] === "j'" ? "je" : pr[1]);
  else {
    const ph = cits.find((c) => c.includes("___")) ?? "";
    p = personneLue(ph.slice(0, ph.indexOf("___")));
    pb.push(...elisions(ph.replace("___", q.correct)));
    const indice = (Object.keys(INDICES_TEMPS) as Temps[]).find((x) => INDICES_TEMPS[x].some((i) => ph.startsWith(i + ",")));
    if (indice && indice !== t) pb.push(`le mot de temps annonce ${LIB_TEMPS[indice]}, la consigne ${LIB_TEMPS[t]}`);
  }
  if (p === null || p < 0) return [...pb, "personne du sujet illisible"];
  const attendu = cRegleVar(inf, t, p);
  if (q.correct !== attendu) pb.push(`« ${inf} » ${LIB_TEMPS[t]} à la personne ${p + 1} s'écrit « ${attendu} », pas « ${q.correct} »`);
  for (const w of q.wrongs) if (w === attendu) pb.push(`le leurre « ${w} » est la bonne forme`);
  if (pr && pr[1] === "j'" && !VOYELLE.test(attendu)) pb.push("« j' » devant une consonne");
  if (pr && pr[1] === "je" && VOYELLE.test(attendu)) pb.push("« je » devant une voyelle : il faut « j' »");
  return pb;
}

// ═════════════════════════════════════════════════════════════════════════════
// 6e_conj_imperatif_conditionnel — conjuguer à l'impératif et au conditionnel.
// ═════════════════════════════════════════════════════════════════════════════

/** Un verbe vu par le générateur des modes : toutes ses formes utiles. */
type VM = {
  inf: string;
  present: (p: number) => string;
  imparfait: (p: number) => string;
  futur: (p: number) => string;
  cond: (p: number) => string;
  imp: string[] | null;
  cpltImp: string[];
  cpltCond: string[];
};
const VMS: VM[] = [
  ...VERBES_MODES.map((v): VM => ({
    inf: v.inf,
    present: (p) => v.present.split(" ")[p],
    imparfait: (p) => v.impRad + T_IMPARFAIT[p],
    futur: (p) => v.futRad + T_FUTUR[p],
    cond: (p) => v.futRad + T_IMPARFAIT[p],
    imp: v.imp ? v.imp.split(" ") : null,
    cpltImp: v.cpltImp,
    cpltCond: v.cpltCond,
  })),
  ...VERBES_REGULIERS.map((v): VM => {
    const rad = v.inf.slice(0, -2);
    return {
      inf: v.inf,
      present: (p) => formeGen(v, "present", p),
      imparfait: (p) => formeGen(v, "imparfait", p),
      futur: (p) => formeGen(v, "futur", p),
      cond: (p) => v.inf + T_IMPARFAIT[p],
      imp: v.inf === "habiter" ? null : v.groupe === 1 ? [rad + "e", rad + "ons", rad + "ez"] : [rad + "is", rad + "issons", rad + "issez"],
      cpltImp: v.cplts,
      cpltCond: v.cplts,
    };
  }),
];
const VMS_IMP = VMS.filter((v) => v.imp);
/** Personne de l'impératif : 0 = tu, 1 = nous, 2 = vous. */
const PERS_IMP = ["2ᵉ personne du singulier", "1ʳᵉ personne du pluriel", "2ᵉ personne du pluriel"];
const IMP_VERS_P = [1, 3, 4];
const AVOIR_IMPARFAIT = ["avais", "avais", "avait", "avions", "aviez", "avaient"];

/** Sujet plein et pronom qui le reprend. */
function sujetEtPronom(p: number): { sujet: string; pron: string } {
  if (p === 2) {
    const a = hasard(PRENOMS);
    return { sujet: a.nom, pron: a.genre === "f" ? "elle" : "il" };
  }
  if (p === 5) {
    const [a, b] = deuxPrenoms();
    return { sujet: `${a.nom} et ${b.nom}`, pron: a.genre === "f" && b.genre === "f" ? "elles" : "ils" };
  }
  return { sujet: PRONOMS[p], pron: PRONOMS[p] };
}
const trou = (sujet: string, forme: string) => (sujet === "je" && VOYELLE.test(forme) ? "j'___" : `${sujet} ___`);

/** Une phrase au conditionnel avec un trou ; le verbe et la personne sont tirés. */
function phraseConditionnel(v: VM, p: number, cplt: string): string {
  const { sujet, pron } = sujetEtPronom(p);
  const forme = v.cond(p);
  const s = Math.random();
  if (s < 0.4) {
    const si = p === 0 ? "Si j'avais" : `Si ${sujet} ${AVOIR_IMPARFAIT[p]}`;
    return `${si} ${hasard(CONDITIONS)}, ${trou(pron, forme)} ${cplt}.`;
  }
  if (s < 0.7 && p !== 2 && p !== 5) {
    // « À ta place, je… » : on se met à la place de QUELQU'UN D'AUTRE.
    const poss = ["ta", "sa", "", "leur", "notre", ""][p];
    return `À ${poss} place, ${trou(sujet, forme)} ${cplt}.`;
  }
  return `${hasard(OUVERTURES_COND)}, ${trou(sujet, forme)} ${cplt}.`;
}

function genImpCond(): QuestionFrancais {
  const type = hasard(["imp", "imp", "cond", "cond", "condForme"] as const);
  if (type === "imp") {
    const v = hasard(VMS_IMP);
    const k = Math.floor(Math.random() * 3);
    const p = IMP_VERS_P[k];
    const forme = v.imp![k];
    const appel = k === 0 ? `, ${hasard(PRENOMS).nom}` : k === 2 ? hasard([", les enfants", ", tout le monde", ""]) : hasard([", les amis", ""]);
    const ph = `___ ${hasard(v.cpltImp)}${appel} !`;
    const leurres = melange([
      v.present(p),
      ...(v.inf === "être" && k === 0 ? ["soit"] : []),
      ...v.imp!.filter((_x, j) => j !== k),
      v.futur(p),
      v.inf,
    ].filter((x) => x !== forme)).sort((a, b) => (a === v.present(p) ? -1 : b === v.present(p) ? 1 : 0));
    const consigne = hasard([
      `Complète : « ${ph} » (${v.inf}, à l'impératif présent, ${PERS_IMP[k]})`,
      `Quelle forme complète l'ordre ? « ${ph} » (${v.inf}, à l'impératif présent, ${PERS_IMP[k]})`,
      `On donne un conseil : « ${ph} » Mets « ${v.inf} » à l'impératif présent, ${PERS_IMP[k]}.`,
    ]);
    const methode = k === 0 && v.imp![0].endsWith("e")
      ? "À l'impératif, pas de sujet ; et pas de « s » à la 2ᵉ personne du singulier des verbes en -er."
      : "À l'impératif, pas de sujet : on garde la forme du verbe pour la personne demandée.";
    return qcm(nbsp(consigne), maj(forme), leurres.map(maj), methode);
  }
  const v = hasard(VMS);
  const p = Math.floor(Math.random() * 6);
  const forme = v.cond(p);
  const autresP = [0, 1, 2, 3, 4, 5].map((j) => v.cond(j)).filter((x) => x !== forme);
  const leurres = [v.futur(p), ...melange([v.imparfait(p), hasard(autresP), v.present(p)])].filter((x) => x !== forme);
  const methode = "Conditionnel présent = radical du futur + terminaisons de l'imparfait (-ais, -ait, -ions…).";
  if (type === "condForme") {
    const pr = p === 0 && VOYELLE.test(forme) ? "j'" : PRONOMS[p];
    const consigne = hasard([
      `Quelle est la forme de « ${v.inf} » au conditionnel présent avec « ${pr} » ?`,
      `« ${v.inf} » au conditionnel présent, avec « ${pr} » : choisis la bonne forme.`,
    ]);
    return qcm(nbsp(consigne), forme, leurres, methode);
  }
  const ph = phraseConditionnel(v, p, hasard(v.cpltCond));
  const consigne = hasard([
    `Complète : « ${ph} » (${v.inf}, au conditionnel présent)`,
    `Quelle forme complète la phrase ? « ${ph} » (${v.inf}, au conditionnel présent)`,
    `« ${ph} » Mets « ${v.inf} » au conditionnel présent.`,
  ]);
  return qcm(nbsp(consigne), forme, leurres, methode);
}

// ── Correcteur des modes : sa propre table des irréguliers, et les règles ────
const C_IRR: Record<string, { pres: string; fut: string; imp?: [string, string, string] }> = {
  être: { pres: "suis es est sommes êtes sont", fut: "ser", imp: ["sois", "soyons", "soyez"] },
  avoir: { pres: "ai as a avons avez ont", fut: "aur", imp: ["aie", "ayons", "ayez"] },
  aller: { pres: "vais vas va allons allez vont", fut: "ir", imp: ["va", "allons", "allez"] },
  faire: { pres: "fais fais fait faisons faites font", fut: "fer", imp: ["fais", "faisons", "faites"] },
  dire: { pres: "dis dis dit disons dites disent", fut: "dir", imp: ["dis", "disons", "dites"] },
  venir: { pres: "viens viens vient venons venez viennent", fut: "viendr", imp: ["viens", "venons", "venez"] },
  prendre: { pres: "prends prends prend prenons prenez prennent", fut: "prendr", imp: ["prends", "prenons", "prenez"] },
  voir: { pres: "vois vois voit voyons voyez voient", fut: "verr" },
  pouvoir: { pres: "peux peux peut pouvons pouvez peuvent", fut: "pourr" },
  vouloir: { pres: "veux veux veut voulons voulez veulent", fut: "voudr" },
};
type ModeC = "present" | "imparfait" | "futur" | "conditionnel" | "imperatif";
/** Toutes les formes d'un verbe, par la règle (et la petite table ci-dessus). */
function cToutes(inf: string): { m: ModeC; p: number; f: string }[] {
  const res: { m: ModeC; p: number; f: string }[] = [];
  const pres = (p: number) => (C_IRR[inf] ? C_IRR[inf].pres.split(" ")[p] : cPresent(inf, p));
  const radImp = inf === "être" ? "ét" : pres(3).replace(/ons$/, "");
  for (let p = 0; p < 6; p++) {
    const fins = ["ais", "ais", "ait", "ions", "iez", "aient"][p];
    res.push({ m: "present", p, f: pres(p) });
    res.push({ m: "imparfait", p, f: radImp + fins });
    res.push({ m: "futur", p, f: cRadFutur(inf) + ["ai", "as", "a", "ons", "ez", "ont"][p] });
    res.push({ m: "conditionnel", p, f: cRadFutur(inf) + fins });
  }
  for (let k = 0; k < 3; k++) {
    const f = cImperatif(inf, k);
    if (f) res.push({ m: "imperatif", p: IMP_VERS_P[k], f });
  }
  return res;
}
/** Le mode (ou le temps) du verbe d'une phrase, lu sur le texte : une seule lecture, sinon null. */
function cModeDe(ph: string): { inf: string; m: ModeC; p: number } | null {
  const vus = new Map<string, { inf: string; m: ModeC; p: number }>();
  const mots = [...ph.matchAll(/[\p{L}]+/gu)];
  for (const inf of INFS_MODES())
    for (const x of cToutes(inf))
      for (const mo of mots) {
        if (bas(mo[0]) !== x.f) continue;
        const avant = ph.slice(0, mo.index);
        if (/'$/.test(avant) && !/(^|\s)j'$/i.test(avant)) continue;
        // L'impératif ouvre la phrase (au plus après un prénom qu'on interpelle : « Malo, va… »).
        const ok = x.m === "imperatif" ? /^\s*$|^\p{Lu}\p{L}+, $/u.test(avant) : personneLue(avant) === x.p;
        if (ok) vus.set(`${inf}|${x.m}|${x.p}`, { inf, m: x.m, p: x.p });
      }
  return vus.size === 1 ? [...vus.values()][0] : null;
}
/** Radical du futur : l'infinitif (sans son « e » final), sauf les irréguliers. */
const cRadFutur = (inf: string) => C_IRR[inf]?.fut ?? (inf.endsWith("re") ? inf.slice(0, -1) : inf);
const cConditionnel = (inf: string, p: number) => cRadFutur(inf) + ["ais", "ais", "ait", "ions", "iez", "aient"][p];
/** Impératif : la table des irréguliers, sinon le présent sans pronom (et sans « s » en -er). */
function cImperatif(inf: string, k: number): string | null {
  if (C_IRR[inf]) return C_IRR[inf].imp?.[k] ?? null;
  const p = IMP_VERS_P[k];
  const f = cPresent(inf, p);
  return inf.endsWith("er") && k === 0 ? f.replace(/s$/, "") : f;
}
const INFS_MODES = () => [...Object.keys(C_IRR), ...VERBES_REGULIERS.map((v) => v.inf)];

function corrImpCond(q: QuestionFrancais): string[] {
  const pb: string[] = [];
  const cits = citations(q.text);
  const mi = q.text.match(/\(?([\p{L}]+)\)?,? à l'impératif présent, (2ᵉ personne du singulier|1ʳᵉ personne du pluriel|2ᵉ personne du pluriel)/u)
    ?? q.text.match(/«\s([\p{L}]+)\s» à l'impératif présent, (2ᵉ personne du singulier|1ʳᵉ personne du pluriel|2ᵉ personne du pluriel)/u);
  if (/impératif/.test(q.text)) {
    if (!mi) return ["consigne d'impératif illisible"];
    const inf = mi[1];
    const k = PERS_IMP.indexOf(mi[2]);
    const att = cImperatif(inf, k);
    if (!att) return [`« ${inf} » n'a pas d'impératif posé en 6e`];
    if (bas(q.correct) !== att) pb.push(`« ${inf} » à l'impératif, ${mi[2]} : « ${att} »`);
    for (const w of q.wrongs) if (bas(w) === att) pb.push(`le leurre « ${w} » est la bonne forme`);
    const ph = cits.find((c) => c.includes("___")) ?? "";
    if (!ph.startsWith("___")) pb.push("à l'impératif, le verbe ouvre la phrase sans sujet");
    if (/^___ (je|tu|il|elle|nous|vous|ils|elles)\s/.test(ph)) pb.push("un pronom sujet dans une phrase à l'impératif");
    // La personne interpellée doit aller avec la personne demandée.
    if (k === 0 && /, (les enfants|les amis|tout le monde) !/.test(ph)) pb.push("on tutoie un groupe");
    if (k !== 0 && PRENOMS.some((x) => ph.includes(`, ${x.nom} !`))) pb.push("on s'adresse à une seule personne au pluriel");
    return pb;
  }
  if (!/conditionnel présent/.test(q.text)) return ["mode demandé introuvable"];
  const inf = INFS_MODES().find((i) => q.text.includes(`(${i},`) || cits.includes(i));
  if (!inf) return ["verbe introuvable"];
  let p: number | null;
  const pr = q.text.match(/avec «\s(j'|je|tu|il|nous|vous|ils)\s»/);
  if (pr) {
    p = PRONOMS.indexOf(pr[1] === "j'" ? "je" : pr[1]);
  } else {
    const ph = cits.find((c) => c.includes("___")) ?? "";
    p = personneLue(ph.slice(0, ph.indexOf("___")));
    pb.push(...elisions(ph.replace("___", q.correct)));
    // La condition « Si … avait » doit parler de la même personne que le verbe.
    const si = ph.match(/^Si (.+?) (avais|avait|avions|aviez|avaient) /) ?? ph.match(/^Si (j')(avais) /);
    if (si) {
      const ps = personneLue(si[1] === "j'" ? "je" : si[1]);
      const accords: Record<string, number[]> = { avais: [0, 1], avait: [2], avions: [3], aviez: [4], avaient: [5] };
      const fin = accords[si[2]] ?? [];
      if (ps === null || !fin.includes(ps)) pb.push(`« Si ${si[1]} ${si[2]} » : le verbe « avoir » ne s'accorde pas`);
      if (ps !== null && p !== null && ps !== p && !(ps === 2 && p === 2) && !(ps === 5 && p === 5)) pb.push("la condition et la suite ne parlent pas de la même personne");
    }
  }
  if (p === null || p < 0) return [...pb, "personne du sujet illisible"];
  const att = cConditionnel(inf, p);
  if (q.correct !== att) pb.push(`« ${inf} » au conditionnel présent, personne ${p + 1} : « ${att} »`);
  for (const w of q.wrongs) {
    if (w === att) pb.push(`le leurre « ${w} » est la bonne forme`);
  }
  return pb;
}

// ═════════════════════════════════════════════════════════════════════════════
// 6e_conj_marques_conditionnel — reconnaître le conditionnel et l'impératif.
// 6e_conj_imperatif_defi — dire à quel mode est un verbe, et pourquoi (deux phrases).
// ═════════════════════════════════════════════════════════════════════════════
const LIB_MODE: Record<ModeC, string> = {
  present: "au présent",
  imparfait: "à l'imparfait",
  futur: "au futur",
  conditionnel: "au conditionnel présent",
  imperatif: "à l'impératif présent",
};
/** Forme du générateur pour un mode ; k = personne de l'impératif. */
function formeMode(v: VM, m: ModeC, p: number): string {
  if (m === "imperatif") return v.imp![IMP_VERS_P.indexOf(p)];
  return m === "present" ? v.present(p) : m === "imparfait" ? v.imparfait(p) : m === "futur" ? v.futur(p) : v.cond(p);
}
/** Une phrase simple dont le verbe est au mode demandé. */
function phraseMode(v: VM, m: ModeC, p: number, cplt?: string): string {
  const f = formeMode(v, m, p);
  if (m === "imperatif") return `${maj(f)} ${cplt ?? hasard(v.cpltImp)} !`;
  return `${maj(lierJe(sujetDe(p), f))} ${cplt ?? hasard(v.cpltCond)}.`;
}
const sansPoint = (s: string) => s.replace(/[.!]$/, "").trim();

function genMarquesCond(): QuestionFrancais {
  const type = hasard(["quelMode", "quelMode", "laquelle", "laquelle", "comment"] as const);
  if (type === "quelMode") {
    const m = hasard(["conditionnel", "conditionnel", "imperatif", "futur", "imparfait", "present"] as ModeC[]);
    const v = hasard(m === "imperatif" ? VMS_IMP : VMS);
    const p = m === "imperatif" ? hasard(IMP_VERS_P) : Math.floor(Math.random() * 6);
    const ph = phraseMode(v, m, p);
    const voisin: ModeC = m === "conditionnel" ? "futur" : m === "futur" ? "conditionnel" : m === "imparfait" ? "conditionnel" : m === "imperatif" ? "present" : "imperatif";
    const autres = (Object.keys(LIB_MODE) as ModeC[]).filter((x) => x !== m && x !== voisin);
    const consigne = hasard([
      `À quel temps et à quel mode est le verbe de ${cite(sansPoint(ph))} ?`,
      `Regarde la terminaison : ${cite(sansPoint(ph))}. Le verbe est…`,
      `${cite(sansPoint(ph))} : à quel temps et à quel mode est conjugué le verbe ?`,
    ]);
    return qcm(consigne, LIB_MODE[m], [LIB_MODE[voisin], ...melange(autres).map((x) => LIB_MODE[x])],
      "Conditionnel = « r » du futur + terminaison de l'imparfait ; impératif = pas de sujet.");
  }
  if (type === "laquelle") {
    const cible = hasard(["conditionnel", "conditionnel", "imperatif"] as ModeC[]);
    if (cible === "imperatif") {
      const v = hasard(VMS_IMP);
      const k = Math.floor(Math.random() * 3);
      const p = IMP_VERS_P[k];
      const cplt = hasard(v.cpltImp);
      const options = (["imperatif", "present", "futur", "conditionnel"] as ModeC[]).map((m) =>
        m === "imperatif" ? `${maj(formeMode(v, m, p))} ${cplt} !` : `${maj(lierJe(PRONOMS[p], formeMode(v, m, p)))} ${cplt}.`);
      return qcm(nbsp(hasard(["Laquelle de ces phrases est à l'impératif ?", "Quelle phrase donne un ordre à l'impératif présent ?"])),
        options[0], melange(options.slice(1)), "À l'impératif, le verbe n'a pas de sujet : il ouvre la phrase.");
    }
    const v = hasard(VMS);
    const p = Math.floor(Math.random() * 6);
    const pr = (f: string) => lierJe(PRONOMS[p], f);
    const options = [v.cond(p), v.futur(p), v.imparfait(p), v.present(p)].map(pr);
    return qcm(nbsp(hasard([
      `Laquelle de ces formes de « ${v.inf} » est au conditionnel présent ?`,
      `« ${v.inf} » : quelle forme est au conditionnel présent ?`,
      `Trouve le conditionnel présent du verbe « ${v.inf} ».`,
    ])), options[0], melange(options.slice(1)), "Il faut les deux marques : le « r » du futur ET la terminaison de l'imparfait.");
  }
  // comment : la marque qui permet de reconnaître le mode.
  const m = hasard(["conditionnel", "conditionnel", "imperatif"] as const);
  const v = hasard(m === "imperatif" ? VMS_IMP : VMS);
  const p = m === "imperatif" ? hasard(IMP_VERS_P) : Math.floor(Math.random() * 6);
  const ph = phraseMode(v, m, p);
  const consigne = hasard([
    `Le verbe de ${cite(sansPoint(ph))} est ${LIB_MODE[m]}. À quoi le reconnait-on ?`,
    `${cite(sansPoint(ph))} : qu'est-ce qui montre que le verbe est ${LIB_MODE[m]} ?`,
  ]);
  const raisons = RAISONS_MODE(v, p);
  const leurres = (Object.keys(raisons) as (keyof typeof raisons)[]).filter((x) => x !== m).map((x) => raisons[x]);
  return qcm(consigne, raisons[m], melange(leurres), "Cherche le sujet, puis regarde ce qui se trouve avant la terminaison.");
}
/** La marque de chaque mode, dite avec le radical et la terminaison de CE verbe. */
function RAISONS_MODE(v: VM, p: number) {
  const fin = T_IMPARFAIT[p];
  const radFut = v.cond(p).slice(0, -fin.length);
  return {
    conditionnel: `le radical du futur « ${radFut}- » et la terminaison de l'imparfait « -${fin} »`,
    futur: `le radical du futur « ${radFut}- » et la terminaison du futur « -${T_FUTUR[p]} »`,
    imparfait: `le radical de l'imparfait « ${v.imparfait(p).slice(0, -fin.length)}- » et la terminaison « -${fin} »`,
    imperatif: "le verbe n'a pas de sujet, il donne un ordre ou un conseil",
  };
}

function genDefiMode(): QuestionFrancais {
  // Deux phrases, le même verbe : seul le mode change. La phrase visée est
  // tantôt la première, tantôt la seconde (le texte reste naturel : le prénom d'abord).
  const cible = hasard(["conditionnel", "imperatif"] as ModeC[]);
  const v = hasard(VMS_IMP.filter((x) => x.cpltImp.length > 1 && x.cpltCond.length > 1));
  const enPremier = Math.random() < 0.5;
  const quellePhrase = Math.random() < 0.5;
  // Une fois sur six, les DEUX phrases sont au mode visé : la réponse n'est pas toujours « une seule ».
  const lesDeux = quellePhrase && Math.random() < 0.17;
  let texte: string;
  let p = 1;
  if (cible === "imperatif") {
    const a = hasard(PRENOMS).nom;
    const [c1, c2] = melange(v.cpltImp);
    texte = lesDeux
      ? `${a}, ${v.imp![0]} ${c1} ! ${maj(v.imp![0])} aussi ${c2} !`
      : enPremier
        ? `${a}, ${v.imp![0]} ${c1} ! ${maj(lierJe("tu", v.present(1)))} aussi ${c2}.`
        : `${a}, ${lierJe("tu", v.present(1))} ${c1}. ${maj(v.imp![0])} aussi ${c2} !`;
  } else {
    p = hasard([2, 5]);
    const { sujet, pron } = sujetEtPronom(p);
    const [c1, c2] = melange(v.cpltCond);
    const autre = lesDeux ? v.cond(p) : formeMode(v, hasard(["futur", "imparfait"] as ModeC[]), p);
    texte = enPremier
      ? `${maj(sujet)} ${v.cond(p)} ${c1}. ${maj(pron)} ${autre} aussi ${c2}.`
      : `${maj(sujet)} ${autre} ${c1}. ${maj(pron)} ${v.cond(p)} aussi ${c2}.`;
  }
  const pc = p;
  const rang = lesDeux ? "les deux phrases" : enPremier ? "la 1ʳᵉ phrase" : "la 2ᵉ phrase";
  if (quellePhrase) {
    const consigne = hasard([
      `${cite(texte)} Dans quelle phrase le verbe est-il ${LIB_MODE[cible]} ?`,
      `Lis : ${cite(texte)} Quelle phrase contient un verbe ${LIB_MODE[cible]} ?`,
    ]);
    const choix = ["la 1ʳᵉ phrase", "la 2ᵉ phrase", "les deux phrases", "aucune des deux"];
    return qcm(consigne, rang, choix.filter((c) => c !== rang),
      cible === "imperatif" ? "Le même verbe, deux fois : à l'impératif, il n'a pas de sujet." : "Le même verbe, deux fois : cherche le « r » du futur suivi de « -ait » ou « -aient ».");
  }
  // À quel mode, et pourquoi ?
  const raisons = RAISONS_MODE(v, pc);
  const libelle: Record<string, string> = {
    conditionnel: `au conditionnel : ${raisons.conditionnel}`,
    imperatif: `à l'impératif : ${raisons.imperatif}`,
    futur: `à l'indicatif futur : ${raisons.futur}`,
    imparfait: `à l'indicatif imparfait : ${raisons.imparfait}`,
  };
  const autre = cible === "imperatif" ? "conditionnel" : "imperatif";
  const indic = hasard(["futur", "imparfait"]);
  const consigne = hasard([
    `${cite(texte)} À quel mode est le verbe de ${rang}, et pourquoi ?`,
    `Lis : ${cite(texte)} Le verbe de ${rang} est à quel mode ? Pourquoi ?`,
  ]);
  return qcm(consigne, libelle[cible], [libelle[autre], libelle[indic]],
    "Le mode se lit dans la forme du verbe : un sujet ou pas, le « r » du futur, la terminaison.");
}

// ── Correcteurs des marques des modes et du défi ─────────────────────────────
/** Les raisons recalculées par la règle (radical du futur + terminaison). */
function cRaisons(inf: string, p: number): Record<string, string> {
  const fin = ["ais", "ais", "ait", "ions", "iez", "aient"][p];
  const imp = cToutes(inf).find((x) => x.m === "imparfait" && x.p === p)!.f;
  return {
    conditionnel: `le radical du futur « ${cRadFutur(inf)}- » et la terminaison de l'imparfait « -${fin} »`,
    futur: `le radical du futur « ${cRadFutur(inf)}- » et la terminaison du futur « -${["ai", "as", "a", "ons", "ez", "ont"][p]} »`,
    imparfait: `le radical de l'imparfait « ${imp.slice(0, -fin.length)}- » et la terminaison « -${fin} »`,
    imperatif: "le verbe n'a pas de sujet, il donne un ordre ou un conseil",
  };
}
const modeDeLibelle = (s: string): ModeC | null =>
  (Object.keys(LIB_MODE) as ModeC[]).find((m) => LIB_MODE[m] === s) ?? null;
/** Coupe un texte cité en phrases. */
const phrasesDe = (t: string) => (t.match(/[^.!?]+(?:[.!?]|$)/g) ?? []).map((s) => s.trim()).filter(Boolean);

function corrMarquesCond(q: QuestionFrancais): string[] {
  const pb: string[] = [];
  const cits = citations(q.text);
  if (/^Laquelle de ces phrases|^Quelle phrase donne/.test(q.text)) {
    const lu = cModeDe(q.correct);
    if (!lu || lu.m !== "imperatif") pb.push(`« ${q.correct} » n'est pas lu à l'impératif`);
    for (const w of q.wrongs) {
      const l = cModeDe(w);
      if (!l) pb.push(`leurre illisible : « ${w} »`);
      else if (l.m === "imperatif") pb.push(`le leurre « ${w} » est aussi à l'impératif`);
    }
    return pb;
  }
  if (/conditionnel présent \?$|Trouve le conditionnel/.test(q.text) && !/quel temps|qu'est-ce qui montre/.test(q.text)) {
    const lu = cModeDe(q.correct);
    if (!lu || lu.m !== "conditionnel") pb.push(`« ${q.correct} » n'est pas au conditionnel présent`);
    for (const w of q.wrongs) {
      const l = cModeDe(w);
      if (!l) pb.push(`leurre illisible : « ${w} »`);
      else if (l.m === "conditionnel") pb.push(`le leurre « ${w} » est aussi au conditionnel`);
    }
    pb.push(...elisions(q.correct), ...q.wrongs.flatMap(elisions));
    return pb;
  }
  const ph = cits[0];
  if (!ph) return ["aucune citation"];
  pb.push(...elisions(ph));
  const lu = cModeDe(ph);
  if (!lu) return [...pb, `verbe illisible ou lisible de plusieurs façons dans « ${ph} »`];
  if (/reconnait-on|qu'est-ce qui montre/.test(q.text)) {
    const r = cRaisons(lu.inf, lu.p);
    if (q.correct !== r[lu.m]) pb.push(`la marque de « ${ph} » est : ${r[lu.m]}`);
    for (const w of q.wrongs) if (w === r[lu.m]) pb.push("un leurre est la bonne marque");
    if (!q.text.includes(LIB_MODE[lu.m])) pb.push("le mode annoncé n'est pas celui du verbe");
    return pb;
  }
  const m = modeDeLibelle(q.correct);
  if (m !== lu.m) pb.push(`le verbe de « ${ph} » est ${LIB_MODE[lu.m]}`);
  for (const w of q.wrongs) if (modeDeLibelle(w) === lu.m) pb.push("un leurre est le bon mode");
  return pb;
}

function corrDefiMode(q: QuestionFrancais): string[] {
  const pb: string[] = [];
  const [texte] = citations(q.text);
  if (!texte) return ["aucune citation"];
  const phs = phrasesDe(texte);
  if (phs.length !== 2) return [`le texte doit avoir deux phrases : « ${texte} »`];
  pb.push(...elisions(texte));
  const lus = phs.map(cModeDe);
  if (lus.some((l) => !l)) return [...pb, `un verbe illisible dans « ${texte} »`];
  if (lus[0]!.inf !== lus[1]!.inf) pb.push("les deux phrases n'ont pas le même verbe");
  const cible = (["conditionnel", "imperatif"] as ModeC[]).find((m) => q.text.includes(LIB_MODE[m]) || q.correct.startsWith(m === "imperatif" ? "à l'impératif" : "au conditionnel"));
  const avec = lus.map((l) => l!.m);
  if (/Dans quelle phrase|Quelle phrase contient/.test(q.text)) {
    if (!cible) return [...pb, "mode demandé illisible"];
    const n = avec.filter((m) => m === cible).length;
    const att = n === 2 ? "les deux phrases" : n === 0 ? "aucune des deux" : avec[0] === cible ? "la 1ʳᵉ phrase" : "la 2ᵉ phrase";
    if (q.correct !== att) pb.push(`la bonne réponse est « ${att} »`);
    if (q.wrongs.includes(att)) pb.push("un leurre est la bonne réponse");
    return pb;
  }
  const rang = /la 1ʳᵉ phrase/.test(q.text) ? 0 : /la 2ᵉ phrase/.test(q.text) ? 1 : -1;
  if (rang < 0) return [...pb, "phrase interrogée illisible"];
  const l = lus[rang]!;
  const r = cRaisons(l.inf, l.m === "imperatif" ? 1 : l.p);
  const att = l.m === "imperatif" ? `à l'impératif : ${r.imperatif}` : l.m === "conditionnel" ? `au conditionnel : ${r.conditionnel}`
    : `à l'indicatif ${l.m === "futur" ? "futur" : l.m === "imparfait" ? "imparfait" : "présent"} : ${r[l.m] ?? ""}`;
  if (q.correct !== att) pb.push(`la bonne réponse est « ${att} »`);
  for (const w of q.wrongs) {
    if (w === att) pb.push("un leurre est la bonne réponse");
    if (w.split(" : ")[0] === att.split(" : ")[0]) pb.push(`le leurre « ${w} » donne le bon mode`);
  }
  return pb;
}

// ═════════════════════════════════════════════════════════════════════════════
// 6e_conj_passe_compose et 6e_conj_plus_que_parfait — auxiliaire + participe.
// ═════════════════════════════════════════════════════════════════════════════
type SujetC = { texte: string; p: number; fem: boolean; pl: boolean };
/** Avec « être », un sujet dont on VOIT le genre (prénoms) ; avec « avoir », toutes les personnes. */
function sujetCompose(aux: "avoir" | "être", sansJe = false): SujetC {
  const choix = aux === "être" ? [2, 2, 5] : sansJe ? [1, 2, 2, 3, 4, 5] : [0, 1, 2, 2, 3, 4, 5];
  const p = hasard(choix);
  if (p === 2) {
    const a = hasard(PRENOMS);
    return { texte: a.nom, p, fem: a.genre === "f", pl: false };
  }
  if (p === 5) {
    const [a, b] = deuxPrenoms();
    return { texte: `${a.nom} et ${b.nom}`, p, fem: a.genre === "f" && b.genre === "f", pl: true };
  }
  return { texte: PRONOMS[p], p, fem: false, pl: p >= 3 };
}
const auxGen = (aux: "avoir" | "être", t: "present" | "imparfait", p: number) =>
  (aux === "avoir" ? AVOIR : ETRE)[t].split(" ")[p];
/** Participe accordé : avec « être », comme le sujet ; avec « avoir », jamais ici. */
const ppGen = (v: VerbeCompose, s: SujetC) =>
  v.aux === "être" ? v.pp + (s.fem ? "e" : "") + (s.pl ? "s" : "") : v.pp;
/** Les quatre accords d'un participe (pour les leurres). */
const accordsPossibles = (pp: string) => [...new Set([pp, pp + "e", pp.endsWith("s") ? pp : pp + "s", pp + "es"])];
/** « j'___ » devant une forme qui commence par une voyelle. */
const blancSujet = (s: SujetC, suite: string) => (s.p === 0 && VOYELLE.test(suite) ? "j'___" : `${s.texte} ___`);

/** ⛔ Pas le même verbe dans les deux propositions (« Quand les invités sont arrivés, Ilyes était arrivé… »). */
const evenementPour = (v: VerbeCompose) => {
  const rad = v.pp.length > 3 ? v.pp.slice(0, -1) : v.pp;
  return hasard(EVENEMENTS_APRES.filter((e) => !new RegExp(`(^|\\s)${rad}`).test(e)));
};

function genCompose(temps: "present" | "imparfait"): QuestionFrancais {
  const v = hasard(VERBES_COMPOSES);
  const type = hasard(["forme", "forme", "auxiliaire", "participe"] as const);
  const s = sujetCompose(v.aux, type !== "forme");
  const aux = auxGen(v.aux, temps, s.p);
  const pp = ppGen(v, s);
  const forme = `${aux} ${pp}`;
  const cplt = hasard(v.cplts);
  const nomTemps = temps === "present" ? "au passé composé" : "au plus-que-parfait";
  const autreAux = v.aux === "avoir" ? "être" : "avoir";
  const tete = temps === "present" ? `${hasard(INDICES_PASSE)}, ` : `Quand ${evenementPour(v)}, `;
  const autreP = hasard([0, 1, 2, 3, 4, 5].filter((k) => auxGen(v.aux, temps, k) !== aux));
  const methodeAux = v.aux === "être"
    ? `« ${v.inf} » se conjugue avec « être » : le participe s'accorde avec le sujet.`
    : `« ${v.inf} » se conjugue avec « avoir » : le participe ne s'accorde pas avec le sujet.`;
  const methodeTemps = temps === "present"
    ? "Passé composé = auxiliaire au PRÉSENT + participe passé."
    : "Plus-que-parfait = auxiliaire à l'IMPARFAIT + participe passé.";

  if (type === "auxiliaire") {
    const ph = `${tete}${s.texte} ___ ${pp} ${cplt}.`;
    const leurres = melange([auxGen(autreAux, temps, s.p), auxGen(v.aux, temps, autreP), auxGen(v.aux, temps === "present" ? "imparfait" : "present", s.p)]);
    const consigne = hasard([
      `Quel auxiliaire complète la phrase ${nomTemps} ? « ${ph} »`,
      `« ${ph} » Choisis l'auxiliaire qui convient (${nomTemps}).`,
    ]);
    return qcm(nbsp(consigne), aux, leurres, `${methodeAux} ${methodeTemps}`);
  }
  if (type === "participe") {
    const ph = `${tete}${s.texte} ${aux} ___ ${cplt}.`;
    const leurres = melange([...accordsPossibles(v.pp).filter((x) => x !== pp), ...(v.inf.endsWith("er") ? [v.inf] : []), ...(v.pp.endsWith("i") ? [v.pp + "t"] : [])]);
    const consigne = hasard([
      `Quel participe passé complète la phrase ? « ${ph} » (${v.inf}, ${nomTemps})`,
      `« ${ph} » Choisis le participe passé de « ${v.inf} » bien accordé (${nomTemps}).`,
    ]);
    return qcm(nbsp(consigne), pp, leurres.slice(0, 3), methodeAux);
  }
  // forme complète
  const ph = `${tete}${blancSujet(s, aux)} ${cplt}.`;
  const autreTemps = temps === "present" ? "imparfait" : "present";
  const fautes = [
    `${auxGen(v.aux, autreTemps, s.p)} ${pp}`,
    ...(v.aux === "être"
      ? [`${auxGen("avoir", temps, s.p)} ${v.pp}`, ...accordsPossibles(v.pp).filter((x) => x !== pp).map((x) => `${aux} ${x}`)]
      : [`${aux} ${v.inf.endsWith("er") ? v.inf : v.pp.endsWith("i") ? v.pp + "t" : v.pp + "e"}`, `${auxGen("avoir", temps, autreP)} ${pp}`]),
  ];
  const leurres = [fautes[0], ...melange(fautes.slice(1))];
  const consigne = hasard([
    `Complète ${nomTemps} : « ${ph} » (${v.inf})`,
    `« ${ph} » Conjugue « ${v.inf} » ${nomTemps}.`,
    `Quelle forme ${nomTemps} complète la phrase ? « ${ph} » (${v.inf})`,
  ]);
  return qcm(nbsp(consigne), forme, leurres.slice(0, 1).concat(melange(leurres.slice(1)).slice(0, 2)), `${methodeTemps} ${v.aux === "être" ? "Avec « être », on accorde le participe avec le sujet." : "Avec « avoir », le participe ne s'accorde pas avec le sujet."}`);
}

function genPlusQueParfait(): QuestionFrancais {
  const r = Math.random();
  if (r < 0.5) return genCompose("imparfait");
  const v = hasard(VERBES_COMPOSES);
  const s = sujetCompose(v.aux, true);
  const cplt = hasard(v.cplts);
  if (r < 0.75) {
    // À quel temps ? (passé composé ou plus-que-parfait, sans autre verbe dans la phrase)
    const t = hasard(["present", "imparfait"] as const);
    const ph = `${s.texte} ${auxGen(v.aux, t, s.p)} ${ppGen(v, s)} ${cplt}`;
    const bon = t === "present" ? "au passé composé" : "au plus-que-parfait";
    const autre = t === "present" ? "au plus-que-parfait" : "au passé composé";
    return qcm(nbsp(hasard([`À quel temps est le verbe de « ${maj(ph)} » ?`, `« ${maj(ph)} » : à quel temps est conjugué le verbe ?`])),
      bon, [autre, ...melange(["à l'imparfait", "au passé simple", "au futur"])],
      "Regarde l'auxiliaire : au présent → passé composé ; à l'imparfait → plus-que-parfait.");
  }
  // Quelle action a eu lieu en premier ?
  const evt = evenementPour(v);
  const action = `${s.texte} ${auxGen(v.aux, "imparfait", s.p)} ${ppGen(v, s)} ${cplt}`;
  const ph = `Quand ${evt}, ${action}.`;
  return qcm(nbsp(hasard([
    `« ${ph} » Quelle action a eu lieu en premier ?`,
    `Lis : « ${ph} » Qu'est-ce qui s'est passé AVANT l'autre action ?`,
  ])), maj(action), [maj(evt), "Les deux en même temps"],
  "Le plus-que-parfait raconte une action passée AVANT une autre action passée.");
}

// ── Correcteur des temps composés : ses propres tables, et la règle d'accord ─
const C_AUX: Record<string, Record<"present" | "imparfait", string[]>> = {
  avoir: { present: ["ai", "as", "a", "avons", "avez", "ont"], imparfait: ["avais", "avais", "avait", "avions", "aviez", "avaient"] },
  être: { present: ["suis", "es", "est", "sommes", "êtes", "sont"], imparfait: ["étais", "étais", "était", "étions", "étiez", "étaient"] },
};
/** Les verbes qui se conjuguent avec « être » (la liste de la classe : aller, venir, partir…). */
const C_AVEC_ETRE = new Set(["aller", "venir", "revenir", "devenir", "partir", "arriver", "entrer", "rentrer", "sortir", "tomber", "rester", "monter", "descendre", "retourner", "naître", "mourir", "passer"]);
const C_PP_IRR: Record<string, string> = {
  prendre: "pris", apprendre: "appris", faire: "fait", voir: "vu", dire: "dit", écrire: "écrit", lire: "lu",
  mettre: "mis", ouvrir: "ouvert", boire: "bu", perdre: "perdu", construire: "construit", venir: "venu",
  descendre: "descendu", partir: "parti", sortir: "sorti",
  être: "été", avoir: "eu", pouvoir: "pu", vouloir: "voulu",
};
const cPP = (inf: string) => C_PP_IRR[inf] ?? (inf.endsWith("er") ? inf.slice(0, -2) + "é" : inf.endsWith("ir") ? inf.slice(0, -1) : "?");
/** Sujet lu dans le texte : personne, genre, nombre (null si illisible). */
function sujetLu(avant: string): { p: number; fem: boolean | null; pl: boolean } | null {
  const p = personneLue(avant);
  if (p === null) return null;
  const nom = (n: string) => PRENOMS.find((x) => x.nom === n);
  const a = avant.trim();
  // Un pronom de reprise dit lui-même le genre : « elle(s) » féminin, « il(s) » masculin (ou mixte).
  const pr = a.match(/(?:^|\s)(il|elle|ils|elles)$/i);
  if (pr) return { p, fem: /^elles?$/i.test(pr[1]), pl: /s$/i.test(pr[1]) };
  if (p === 2) {
    const m = a.match(/(\p{Lu}\p{L}+)$/u);
    const x = m ? nom(m[1]) : undefined;
    return { p, fem: x ? x.genre === "f" : null, pl: false };
  }
  if (p === 5) {
    const m = a.match(/(\p{Lu}\p{L}+) et (\p{Lu}\p{L}+)$/u);
    const x = m ? nom(m[1]) : undefined;
    const y = m ? nom(m[2]) : undefined;
    return { p, fem: x && y ? x.genre === "f" && y.genre === "f" : null, pl: true };
  }
  return { p, fem: null, pl: p >= 3 };
}
/** La forme composée attendue, par la règle. */
function cCompose(inf: string, t: "present" | "imparfait", s: { p: number; fem: boolean | null; pl: boolean }): string | null {
  const etre = C_AVEC_ETRE.has(inf);
  const aux = C_AUX[etre ? "être" : "avoir"][t][s.p];
  let pp = cPP(inf);
  if (etre) {
    if (s.fem === null) return null; // accord impossible à décider : énoncé ambigu
    pp += (s.fem ? "e" : "") + (s.pl ? "s" : "");
  }
  return `${aux} ${pp}`;
}
const INFS_COMPOSES = () => VERBES_COMPOSES.map((v) => v.inf);

function corrCompose(q: QuestionFrancais): string[] {
  const pb: string[] = [];
  const cits = citations(q.text);
  const t: "present" | "imparfait" | null = /passé composé/.test(q.text) ? "present" : /plus-que-parfait/.test(q.text) ? "imparfait" : null;
  // Le même verbe dans les deux propositions (« Quand les invités sont arrivés, Ilyes était arrivé ») : refusé.
  const quand = (cits.find((c) => /^Quand /.test(c)) ?? "").match(/^Quand (.+?), (.+)$/);
  if (quand) {
    const suite = quand[2].replace("___", q.correct);
    for (const inf of INFS_COMPOSES()) {
      const rad = cPP(inf).slice(0, -1);
      if (rad.length > 2 && new RegExp(`(^|\\s)${rad}`).test(quand[1]) && new RegExp(`(^|\\s)${rad}`).test(suite))
        pb.push(`« ${inf} » est répété dans les deux propositions`);
    }
  }
  if (/en premier|AVANT l'autre/.test(q.text)) {
    const ph = cits[0] ?? "";
    const m = ph.match(/^Quand (.+?), (.+)\.$/);
    if (!m) return ["phrase illisible"];
    // L'action au plus-que-parfait est celle dont l'auxiliaire est à l'imparfait.
    const aImparfait = (x: string) => [...C_AUX.avoir.imparfait, ...C_AUX.être.imparfait].some((a) => new RegExp(`(^|\\s)${a}\\s`).test(x));
    const premiere = aImparfait(m[2]) && !aImparfait(m[1]) ? m[2] : aImparfait(m[1]) && !aImparfait(m[2]) ? m[1] : null;
    if (!premiere) return ["aucune action (ou les deux) au plus-que-parfait"];
    if (bas(q.correct) !== bas(premiere)) pb.push(`l'action la plus ancienne est « ${premiere} »`);
    if (q.wrongs.some((w) => bas(w) === bas(premiere))) pb.push("un leurre est la bonne action");
    return pb;
  }
  if (/À quel temps|à quel temps/.test(q.text)) {
    const ph = cits[0] ?? "";
    const pres = [...C_AUX.avoir.present, ...C_AUX.être.present].some((a) => new RegExp(`\\s${a}\\s`).test(ph));
    const imp = [...C_AUX.avoir.imparfait, ...C_AUX.être.imparfait].some((a) => new RegExp(`\\s${a}\\s`).test(ph));
    if (pres === imp) return [`auxiliaire illisible dans « ${ph} »`];
    const att = pres ? "au passé composé" : "au plus-que-parfait";
    if (q.correct !== att) pb.push(`« ${ph} » est ${att}`);
    if (q.wrongs.includes(att)) pb.push("un leurre est le bon temps");
    return pb;
  }
  if (!t) return ["temps demandé introuvable"];
  const ph = cits.find((c) => c.includes("___")) ?? "";
  const i = ph.indexOf("___");
  if (i < 0) return ["pas de trou dans la phrase"];
  // Le mot de temps en tête doit aller avec le temps demandé.
  if (t === "present" && !INDICES_PASSE.some((x) => ph.startsWith(x + ","))) pb.push("pas de mot de temps du passé composé en tête");
  if (t === "imparfait" && !/^Quand /.test(ph)) pb.push("le plus-que-parfait n'a pas d'action postérieure pour le situer");
  const avantBrut = ph.slice(0, i);
  const apres = ph.slice(i + 3).trim();
  if (/auxiliaire/.test(q.text)) {
    const s = sujetLu(avantBrut);
    const pp = apres.split(" ")[0];
    const inf = INFS_COMPOSES().find((x) => accordsPossibles(cPP(x)).includes(pp));
    if (!s || !inf) return [...pb, "sujet ou participe illisible"];
    const att = cCompose(inf, t, s);
    if (!att) return [...pb, "accord indécidable (genre du sujet inconnu)"];
    const [auxAtt, ppAtt] = att.split(" ");
    if (ppAtt !== pp) pb.push(`le participe affiché « ${pp} » devrait être « ${ppAtt} »`);
    if (q.correct !== auxAtt) pb.push(`l'auxiliaire est « ${auxAtt} »`);
    if (q.wrongs.includes(auxAtt)) pb.push("un leurre est le bon auxiliaire");
    return pb;
  }
  const inf = INFS_COMPOSES().find((x) => q.text.includes(`(${x},`) || q.text.includes(`(${x})`) || cits.includes(x));
  if (!inf) return [...pb, "verbe introuvable"];
  if (/participe/.test(q.text)) {
    // « Léa est ___ au musée. » : le sujet est avant l'auxiliaire.
    const mots = avantBrut.trim().split(/\s+/);
    const auxLu = mots.pop() ?? "";
    const s = sujetLu(mots.join(" ") + " ");
    if (!s) return [...pb, "sujet illisible"];
    const att = cCompose(inf, t, s);
    if (!att) return [...pb, "accord indécidable (genre du sujet inconnu)"];
    const [auxAtt, ppAtt] = att.split(" ");
    if (auxLu !== auxAtt) pb.push(`l'auxiliaire affiché « ${auxLu} » devrait être « ${auxAtt} »`);
    if (q.correct !== ppAtt) pb.push(`le participe est « ${ppAtt} »`);
    if (q.wrongs.includes(ppAtt)) pb.push("un leurre est le bon participe");
    return pb;
  }
  const s = sujetLu(avantBrut);
  if (!s) return [...pb, "sujet illisible"];
  const att = cCompose(inf, t, s);
  if (!att) return [...pb, "accord indécidable (genre du sujet inconnu)"];
  if (q.correct !== att) pb.push(`« ${inf} » ${t === "present" ? "au passé composé" : "au plus-que-parfait"} : « ${att} »`);
  if (q.wrongs.includes(att)) pb.push("un leurre est la bonne forme");
  pb.push(...elisions(ph.replace("___", q.correct)));
  return pb;
}

// ═════════════════════════════════════════════════════════════════════════════
// 6e_conj_discours_recit — temps du discours, temps du récit.
// Deux phrases : une action (passé simple OU passé composé), puis un second verbe
// (imparfait pour le récit ; présent ou futur pour le discours).
// ═════════════════════════════════════════════════════════════════════════════
const ENSEMBLES = { recit: "passé simple et imparfait", d1: "passé composé et présent", d2: "passé composé et futur" };
const INDICES_DISCOURS = ["Ce matin", "Hier", "Tout à l'heure"];

function genDiscoursRecit(): QuestionFrancais {
  const recit = Math.random() < 0.5;
  const vA = hasard(VERBES_COMPOSES.filter((v) => !recit || PASSE_SIMPLE[v.inf]));
  const p = hasard(recit || vA.aux === "avoir" ? [0, 2, 2, 5] : [2, 5]);
  let sujet: string, pron: string;
  let s: SujetC;
  if (p === 0) {
    sujet = pron = "je";
    s = { texte: "je", p: 0, fem: false, pl: false };
  } else {
    const sp = sujetEtPronom(p);
    sujet = sp.sujet;
    pron = sp.pron;
    const noms = sujet.split(" et ").map((n) => PRENOMS.find((x) => x.nom === n)!);
    s = { texte: sujet, p, fem: noms.every((x) => x.genre === "f"), pl: p === 5 };
  }
  let vB = hasard(VERBES_REGULIERS);
  while (vB.inf === vA.inf) vB = hasard(VERBES_REGULIERS);
  const cA = hasard(vA.cplts);
  const cB = hasard(vB.cplts);
  const A = recit ? PASSE_SIMPLE[vA.inf].split(" ")[[0, 2, 5].indexOf(p)] : `${auxGen(vA.aux, "present", p)} ${ppGen(vA, s)}`;
  const tB: Temps = recit ? "imparfait" : hasard(["present", "futur"] as Temps[]);
  const ph1 = recit ? `${hasard(INDICES_RECIT)}, ${lierJe(sujet, A)} ${cA}.` : `${hasard(INDICES_DISCOURS)}, ${lierJe(sujet, A)} ${cA}.`;
  const ph2 = recit
    ? `${maj(lierJe(pron, formeGen(vB, tB, p)))} ${cB}.`
    : `${hasard(INDICES_TEMPS[tB])}, ${lierJe(pron, formeGen(vB, tB, p))} ${cB}.`;
  const texte = `${ph1} ${ph2}`;
  const cat = recit ? "du récit" : "du discours";
  const autreCat = recit ? "du discours" : "du récit";
  const ens = recit ? ENSEMBLES.recit : tB === "present" ? ENSEMBLES.d1 : ENSEMBLES.d2;
  if (Math.random() < 0.55) {
    const autresEns = Object.values(ENSEMBLES).filter((e) => e !== ens);
    const consigne = hasard([
      `${cite(texte)} Ce passage relève-t-il du récit ou du discours ? Pourquoi ?`,
      `Lis : ${cite(texte)} Récit ou discours ? Regarde les temps.`,
      `${cite(texte)} Ce passage est-il un récit ou un discours ? Choisis la bonne explication.`,
    ]);
    return qcm(consigne, `${cat} : ${ens}`, [`${autreCat} : ${ens}`, `${cat} : ${hasard(autresEns)}`, `${autreCat} : ${hasard(autresEns)}`],
      "Passé simple et imparfait racontent une histoire ; présent, passé composé et futur, c'est quelqu'un qui parle depuis maintenant.");
  }
  const tA = recit ? "passé simple" : "passé composé";
  const autreT = recit ? "passé composé" : "passé simple";
  const tFaux = recit ? "imparfait : temps du discours" : "futur : temps du récit";
  const consigne = hasard([
    `${cite(texte)} À quel temps est « ${A} », et est-ce un temps du récit ou du discours ?`,
    `Dans ${cite(texte.replace(/\.$/, ""))}, le verbe « ${A} » est…`,
  ]);
  return qcm(nbsp(consigne), `${tA} : temps ${cat}`, [`${tA} : temps ${autreCat}`, `${autreT} : temps ${cat}`, tFaux],
    recit ? "Le passé simple, en un seul mot, est le temps de l'histoire racontée." : "Le passé composé (auxiliaire + participe) est le passé de celui qui parle.");
}

// ── Correcteur discours / récit ──────────────────────────────────────────────
const C_PS_IRR: Record<string, string> = {
  prendre: "pri", apprendre: "appri", faire: "fi", écrire: "écrivi", lire: "lu", mettre: "mi", ouvrir: "ouvri",
  boire: "bu", perdre: "perdi", construire: "construisi", venir: "vin", partir: "parti", sortir: "sorti", descendre: "descendi",
};
/** Passé simple par la règle, pour je (0), il (2), ils (5). */
function cPasseSimple(inf: string, p: number): string | null {
  const k = [0, 2, 5].indexOf(p);
  if (k < 0) return null;
  if (C_PS_IRR[inf]) return C_PS_IRR[inf] + ["s", "t", "rent"][k];
  if (!inf.endsWith("er")) return null;
  const rad = inf.slice(0, -2);
  return (k < 2 && inf.endsWith("ger") ? rad + "e" : rad) + ["ai", "a", "èrent"][k];
}
/** L'action de la 1ʳᵉ phrase : passé simple ou passé composé (une seule lecture). */
function cAction(ph: string): { forme: string; t: "ps" | "pc" } | null {
  const vus: { forme: string; t: "ps" | "pc" }[] = [];
  for (const inf of INFS_COMPOSES()) {
    for (const p of [0, 1, 2, 3, 4, 5]) {
      const ps = cPasseSimple(inf, p);
      if (ps) {
        const m = ph.match(new RegExp(`(^|[\\s'])${ps}(?![\\p{L}])`, "u"));
        if (m && m.index !== undefined && personneLue(ph.slice(0, m.index + m[1].length)) === p) vus.push({ forme: ps, t: "ps" });
      }
    }
    for (const aux of [...C_AUX.avoir.present, ...C_AUX.être.present]) {
      const re = new RegExp(`(^|[\\s'])(${aux} (\\p{L}+))(?![\\p{L}])`, "u");
      const m = ph.match(re);
      if (!m || m.index === undefined) continue;
      const s = sujetLu(ph.slice(0, m.index + m[1].length));
      if (!s) continue;
      const att = cCompose(inf, "present", s);
      if (att && att === m[2]) vus.push({ forme: m[2], t: "pc" });
    }
  }
  const uniques = new Set(vus.map((x) => `${x.forme}|${x.t}`));
  return uniques.size === 1 ? vus[0] : null;
}

function corrDiscoursRecit(q: QuestionFrancais): string[] {
  const pb: string[] = [];
  const [texte] = citations(q.text);
  if (!texte) return ["aucune citation"];
  const phs = phrasesDe(texte);
  if (phs.length !== 2) return [`deux phrases attendues : « ${texte} »`];
  pb.push(...elisions(texte));
  const a = cAction(phs[0]);
  const b = lireVerbe(phs[1]);
  if (!a) return [...pb, `action illisible dans « ${phs[0]} »`];
  if (typeof b === "string") return [...pb, b];
  const recitA = a.t === "ps";
  const recitB = b.t === "imparfait";
  if (recitA !== recitB) return [...pb, "le passage mélange temps du récit et temps du discours"];
  const cat = recitA ? "du récit" : "du discours";
  if (/le verbe «|À quel temps est «/.test(q.text)) {
    const cite2 = citations(q.text)[1];
    if (cite2 !== a.forme) pb.push(`le verbe interrogé « ${cite2} » n'est pas l'action lue « ${a.forme} »`);
    const att = `${recitA ? "passé simple" : "passé composé"} : temps ${cat}`;
    if (q.correct !== att) pb.push(`la bonne réponse est « ${att} »`);
    // Chaque leurre doit être une association FAUSSE (temps du récit ↔ discours).
    const vrai: Record<string, string> = { "passé simple": "du récit", imparfait: "du récit", "plus-que-parfait": "du récit", "passé composé": "du discours", présent: "du discours", futur: "du discours" };
    for (const w of q.wrongs) {
      const [t, c] = w.split(" : temps ");
      if (vrai[t] === c) pb.push(`le leurre « ${w} » est une affirmation juste`);
    }
    return pb;
  }
  const tB = b.t === "imparfait" ? "imparfait" : b.t === "present" ? "présent" : "futur";
  const att = `${cat} : ${recitA ? "passé simple" : "passé composé"} et ${tB}`;
  if (q.correct !== att) pb.push(`la bonne réponse est « ${att} »`);
  if (q.wrongs.includes(att)) pb.push("un leurre est la bonne réponse");
  return pb;
}

// ═════════════════════════════════════════════════════════════════════════════
// 6e_conj_employer — le temps qui convient au SENS de la phrase.
// ⛔ Un leurre ne doit jamais être une phrase correcte : « Demain, Léa va au
// cinéma » est juste (présent à valeur de futur) — le présent n'est donc jamais
// leurre d'un futur ; « Hier, il pleuvait » est juste — l'imparfait n'est jamais
// leurre d'un passé composé.
// ═════════════════════════════════════════════════════════════════════════════
type Emploi = "futur" | "present" | "pc" | "imparfait" | "cond" | "pqp";

function genEmployer(): QuestionFrancais {
  const cat = hasard(["futur", "present", "pc", "imparfait", "cond"] as const);
  const v = hasard(VMS);
  const etre = AVEC_ETRE_MODES.includes(v.inf);
  const s = sujetCompose(etre ? "être" : "avoir");
  const p = s.p;
  const pp = PP_MODES[v.inf] ?? (v.inf.endsWith("er") ? v.inf.slice(0, -2) + "é" : v.inf.slice(0, -1));
  const ppA = etre ? pp + (s.fem ? "e" : "") + (s.pl ? "s" : "") : pp;
  const aux = etre ? "être" : "avoir";
  const formes: Record<Emploi, string> = {
    futur: v.futur(p), present: v.present(p), imparfait: v.imparfait(p), cond: v.cond(p),
    pc: `${auxGen(aux, "present", p)} ${ppA}`, pqp: `${auxGen(aux, "imparfait", p)} ${ppA}`,
  };
  const LEURRES: Record<typeof cat, Emploi[]> = {
    futur: ["imparfait", "pc", "pqp"],
    present: ["futur", "imparfait", "pc"],
    pc: ["futur", "present", "cond"],
    imparfait: ["futur", "present", "cond"],
    cond: ["futur", "present", "pc"],
  };
  const forme = formes[cat];
  const cplt = hasard(v.cpltCond);
  let ph: string;
  if (cat === "cond") {
    const { sujet, pron } = sujetEtPronomDe(s);
    const si = p === 0 ? "Si j'avais" : `Si ${sujet} ${AVOIR_IMPARFAIT[p]}`;
    ph = `${si} ${hasard(CONDITIONS)}, ${trou(pron, forme)} ${cplt}.`;
  } else {
    ph = `${hasard(REPERES_EMPLOI[cat])}, ${blancSujet(s, forme)} ${cplt}.`;
  }
  const consigne = hasard([
    `« ${ph} » Quelle forme de « ${v.inf} » convient ?`,
    `Complète avec le temps qui convient : « ${ph} » (${v.inf})`,
    `Lis la phrase et choisis la bonne forme du verbe « ${v.inf} » : « ${ph} »`,
  ]);
  const methode: Record<typeof cat, string> = {
    futur: "Le mot de temps parle de l'avenir : on emploie le futur.",
    present: "« En ce moment », « maintenant » : l'action se passe pendant qu'on parle, c'est le présent.",
    pc: "Une action passée, terminée, à un moment précis : le passé composé.",
    imparfait: "Une habitude du passé (« chaque été », « tous les soirs ») : l'imparfait.",
    cond: "« Si » + imparfait annonce une condition : la suite se met au conditionnel.",
  };
  return qcm(nbsp(consigne), forme, melange(LEURRES[cat].map((x) => formes[x]).filter((x) => x !== forme)), methode[cat]);
}
/** Sujet et pronom de reprise à partir d'un sujet déjà tiré. */
function sujetEtPronomDe(s: SujetC): { sujet: string; pron: string } {
  if (s.p === 2) return { sujet: s.texte, pron: s.fem ? "elle" : "il" };
  if (s.p === 5) return { sujet: s.texte, pron: s.fem ? "elles" : "ils" };
  return { sujet: s.texte, pron: s.texte };
}

// ── Correcteur de l'emploi : ses propres repères, et ce qui serait AUSSI juste ─
const C_REPERES: { re: RegExp; attendu: Emploi; acceptables: Emploi[] }[] = [
  { re: /^(Demain|L'été prochain|Dans deux jours|Samedi prochain|Plus tard),/, attendu: "futur", acceptables: ["futur", "present"] },
  { re: /^(En ce moment|Maintenant|Aujourd'hui, en ce moment),/, attendu: "present", acceptables: ["present"] },
  { re: /^(Hier|Samedi dernier|L'an dernier|La semaine dernière|Il y a deux jours),/, attendu: "pc", acceptables: ["pc", "imparfait", "pqp"] },
  { re: /^(Autrefois|À cette époque|Il y a longtemps|Jadis), (chaque|tous)/, attendu: "imparfait", acceptables: ["imparfait", "pc"] },
  { re: /^Si /, attendu: "cond", acceptables: ["cond"] },
];
/** Les temps possibles d'une forme, pour un verbe et un sujet donnés (règles du correcteur). */
function cEmploisDe(inf: string, forme: string, s: { p: number; fem: boolean | null; pl: boolean }): Emploi[] {
  const r: Emploi[] = [];
  for (const x of cToutes(inf)) {
    if (x.p !== s.p || x.f !== forme) continue;
    if (x.m === "conditionnel") r.push("cond");
    else if (x.m === "present" || x.m === "imparfait" || x.m === "futur") r.push(x.m);
  }
  if (cCompose(inf, "present", s) === forme) r.push("pc");
  if (cCompose(inf, "imparfait", s) === forme) r.push("pqp");
  return r;
}

function corrEmployer(q: QuestionFrancais): string[] {
  const pb: string[] = [];
  const cits = citations(q.text);
  const ph = cits.find((c) => c.includes("___"));
  if (!ph) return ["pas de phrase à trou"];
  const inf = INFS_MODES().find((i) => cits.includes(i) || q.text.includes(`(${i})`));
  if (!inf) return ["verbe introuvable"];
  const rep = C_REPERES.find((r) => r.re.test(ph));
  if (!rep) return [`aucun repère de temps reconnu dans « ${ph} »`];
  const s = sujetLu(ph.slice(0, ph.indexOf("___")));
  if (!s) return ["sujet illisible"];
  if (C_AVEC_ETRE.has(inf) && s.fem === null) pb.push("accord du participe indécidable");
  const tc = cEmploisDe(inf, q.correct, s);
  if (!tc.includes(rep.attendu)) pb.push(`« ${q.correct} » n'est pas ${rep.attendu} (lu : ${tc.join(", ") || "rien"})`);
  for (const w of q.wrongs) {
    const tw = cEmploisDe(inf, w, s);
    if (!tw.length) pb.push(`leurre « ${w} » : forme inconnue du correcteur`);
    if (tw.some((t) => rep.acceptables.includes(t))) pb.push(`le leurre « ${w} » donne aussi une phrase juste`);
  }
  if (/^Si /.test(ph)) {
    const si = ph.match(/^Si (.+?) (avais|avait|avions|aviez|avaient) /) ?? ph.match(/^Si (j')(avais) /);
    const ps = si ? personneLue(si[1] === "j'" ? "je" : si[1]) : null;
    if (ps !== s.p) pb.push("la condition ne parle pas de la même personne que la suite");
  }
  pb.push(...elisions(ph.replace("___", q.correct)));
  return pb;
}

export const GENERATEURS: GenerateursFrancais = {
  "6e_conj_marques": { generer: genMarques, corriger: corrMarques },
  "6e_conj_employer": { generer: genEmployer, corriger: corrEmployer },
  "6e_conj_discours_recit": { generer: genDiscoursRecit, corriger: corrDiscoursRecit },
  "6e_conj_passe_compose": { generer: () => genCompose("present"), corriger: corrCompose },
  "6e_conj_plus_que_parfait": { generer: genPlusQueParfait, corriger: corrCompose },
  "6e_conj_marques_conditionnel": { generer: genMarquesCond, corriger: corrMarquesCond },
  "6e_conj_imperatif_defi": { generer: genDefiMode, corriger: corrDefiMode },
  "6e_conj_imperatif_conditionnel": { generer: genImpCond, corriger: corrImpCond },
  "6e_conj_radical_variations": { generer: genRadical, corriger: corrRadical },
  // « Former un temps composé » : les deux temps composés de 6e, mêlés (29
  // squelettes seulement avec son ancienne liste).
  "6e_conj_composer": {
    generer: () => (Math.random() < 0.5 ? genCompose("present") : genPlusQueParfait()),
    corriger: corrCompose,
  },
};
