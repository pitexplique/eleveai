import type { GenerateursFrancais, QuestionFrancais } from "./types";
import {
  NB, PRENOMS, SCENES, CC_TEMPS, CC_MANIERE, CC_LIEUX, CC_CAUSES, VERBES_INDIRECTS, VERBES_PERSONNE_COD,
  VERBES_ETAT, ADJ_ATTRIBUTS, GN_ATTRIBUTS, EPITHETES, ANTEPOSES, NOMS,
  PAIRES_CAUSE, PAIRES_TEMPS, PAIRES_OPPOSITION, SUITES_TROIS, SIMPLES_INFINITIF, VERBES_CONJUGUES_COMPLEXE,
  type Prenom, type Scene, type Action,
} from "./grammaire-tables";

// GÉNÉRATEURS DE GRAMMAIRE DE 6e (05/10/2026) — voir types.ts.
// Les phrases sont construites à partir de constituants TYPÉS (grammaire-tables.ts) :
// la fonction demandée est connue par construction. Chaque correcteur la
// retrouve à part, sur le texte que lit l'élève, à partir des tables.

// ── Outils ───────────────────────────────────────────────────────────────────
const hasard = <T,>(t: readonly T[]): T => t[Math.floor(Math.random() * t.length)];
function melange<T>(t: T[]): T[] {
  const r = [...t];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}
const cite = (s: string) => `«${NB}${s}${NB}»`;
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
// Sans « y » : on écrit « de Yanis », pas « d'Yanis ».
const VOYELLE = "aeiouàâäéèêëîïôöûüœAEIOUÀÂÄÉÈÊËÎÏÔÖÛÜ";

/** Élisions et contractions : de Inès → d'Inès, le arrose → l'arrose, à le → au… */
function lier(s: string): string {
  return s
    .replace(new RegExp(`(?<!\\p{L})(le|la|de|que|lorsque|puisque|ne|se|me|te) (?=[${VOYELLE}])`, "giu"), (_m, w: string) => `${w.slice(0, -1)}'`)
    .replace(/(?<!\p{L})([Ss])i (ils?)(?!\p{L})/gu, "$1'$2")
    .replace(new RegExp(`(?<!\\p{L})(ce) (?=[${VOYELLE}])`, "gu"), "cet ")
    .replace(/(?<!\p{L})à le /gu, "au ")
    .replace(/(?<!\p{L})à les /gu, "aux ")
    .replace(/(?<!\p{L})de le /gu, "du ")
    .replace(/(?<!\p{L})de les /gu, "des ");
}

/** Toutes les citations « … » d'un texte, dans l'ordre. */
const citations = (t: string): string[] => [...t.matchAll(/« ([^»]*?) »/g)].map((m) => m[1]);
const echapper = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Nombre d'occurrences d'un groupe (mots entiers, sans tenir compte de la casse). */
const compte = (texte: string, groupe: string): number =>
  [...texte.matchAll(new RegExp(`(?<!\\p{L})${echapper(groupe)}(?!\\p{L})`, "giu"))].length;
const bas = (s: string) => s.toLowerCase();

/** Question à choix : la bonne réponse et les leurres, sans doublon. */
function qcm(text: string, correct: string, wrongs: string[], methode: string): QuestionFrancais {
  const vus = new Set([bas(correct)]);
  const w = wrongs.filter((x) => (vus.has(bas(x)) ? false : (vus.add(bas(x)), true)));
  // « Dans « Léa lit. », … » : pas de point dans une citation suivie d'une virgule ou d'un « ? ».
  const t = nb(text).replace(new RegExp(`\\.${NB}»(?=,| \\?)`, "g"), `${NB}»`);
  return { text: t, correct: nb(correct), wrongs: w.slice(0, 3).map(nb), methode: nb(methode) };
}
/** Espaces insécables à l'intérieur des guillemets français, comme dans le fichier existant. */
function nb(s: string): string {
  return s.replace(/« /g, `«${NB}`).replace(/ »/g, `${NB}»`);
}

/** Assemble des groupes en phrase : majuscule, virgule après un CC en tête, point. */
function phrase(groupes: string[], virguleApres = -1): string {
  const t = groupes.map((g, i) => (i === virguleApres ? `${g},` : g)).join(" ");
  return lier(maj(t)) + ".";
}

// ── Compléments circonstanciels ──────────────────────────────────────────────
type SorteCC = "temps" | "lieu" | "cause" | "manière";
const SORTES: SorteCC[] = ["temps", "lieu", "cause", "manière"];
const TABLE_CC: Record<SorteCC, string[]> = { temps: CC_TEMPS, lieu: CC_LIEUX, cause: CC_CAUSES, manière: CC_MANIERE };
/** La sorte d'un CC, retrouvée dans les tables (null si inconnu ou dans deux tables). */
function sorteDe(g: string): SorteCC | null {
  const s = SORTES.filter((k) => TABLE_CC[k].some((x) => bas(lier(x)) === bas(g)));
  return s.length === 1 ? s[0] : null;
}
const VOCAB_CC: Record<SorteCC, string>[] = [
  { temps: "temps", lieu: "lieu", cause: "cause", manière: "manière" },
  { temps: "le moment (quand ?)", lieu: "le lieu (où ?)", cause: "la cause (pourquoi ?)", manière: "la manière (comment ?)" },
  { temps: "Quand ?", lieu: "Où ?", cause: "Pourquoi ?", manière: "Comment ?" },
];
const METHODE_CC: Record<SorteCC, string> = {
  temps: "Pose la question « quand ? » après le verbe : si le groupe répond, c'est le temps.",
  lieu: "Pose la question « où ? » après le verbe : si le groupe répond, c'est le lieu.",
  cause: "Pose la question « pourquoi ? » après le verbe : si le groupe répond, c'est la cause.",
  manière: "Pose la question « comment ? » après le verbe : si le groupe répond, c'est la manière.",
}

/** Une phrase « sujet + verbe + COD » avec deux CC de sortes différentes. */
function phraseAvecCC(cible: SorteCC) {
  const scene: Scene = hasard(SCENES);
  const act: Action = hasard(scene.actions);
  const p: Prenom = hasard(PRENOMS);
  const autre = hasard(SORTES.filter((s) => s !== cible));
  const tire = (s: SorteCC) => (s === "lieu" ? hasard(scene.lieux) : s === "cause" ? hasard(scene.causes) : hasard(TABLE_CC[s]));
  const cc: Record<string, string> = { [cible]: tire(cible), [autre]: tire(autre) };
  // Un adverbe seul (« lentement ») se place juste après le verbe.
  const adverbe = cc.manière !== undefined && !cc.manière.includes(" ") ? cc.manière : null;
  const fin = [cible, autre]
    .filter((s) => s !== "temps" && !(adverbe && s === "manière"))
    .sort((x, y) => (x === "lieu" ? -1 : y === "lieu" ? 1 : 0));
  const tempsEnTete = cc.temps !== undefined && Math.random() < 0.6;
  const groupes = [
    ...(tempsEnTete ? [cc.temps] : []),
    p.p, act.v, ...(adverbe ? [adverbe] : []), act.cod.t,
    ...fin.map((s) => cc[s]),
    ...(cc.temps !== undefined && !tempsEnTete ? [cc.temps] : []),
  ];
  const texte = phrase(groupes, tempsEnTete ? 0 : -1);
  const cite1 = (g: string) => (tempsEnTete && g === cc.temps ? maj(g) : lier(g));
  return { texte, cibleTexte: cite1(cc[cible]), autreTexte: cite1(cc[autre]), cod: lier(act.cod.t), sujet: p.p, verbe: act.v };
}

const gCcSortes = {
  generer(): QuestionFrancais {
    const cible = hasard<SorteCC>(["temps", "lieu", "cause", "temps", "lieu", "cause", "manière"]);
    const f = phraseAvecCC(cible);
    const tour = Math.floor(Math.random() * 4);
    if (tour === 3) {
      return qcm(
        hasard([
          `Dans ${cite(f.texte)}, quel groupe est un complément circonstanciel de ${cible} ?`,
          `Lis : ${cite(f.texte)} Quel groupe est le complément circonstanciel de ${cible} ?`,
          `${cite(f.texte)} Trouve le complément circonstanciel de ${cible}.`,
        ]),
        f.cibleTexte,
        melange([f.autreTexte, f.cod, f.sujet]),
        METHODE_CC[cible],
      );
    }
    const vocab = VOCAB_CC[tour];
    const textes = [
      `Dans ${cite(f.texte)}, le groupe ${cite(f.cibleTexte)} est un complément circonstanciel de…`,
      `Lis : ${cite(f.texte)} Que précise le groupe ${cite(f.cibleTexte)} ?`,
      `À quelle question répond ${cite(f.cibleTexte)} dans ${cite(f.texte)} ?`,
    ];
    return qcm(textes[tour], vocab[cible], melange(SORTES.filter((s) => s !== cible).map((s) => vocab[s])), METHODE_CC[cible]);
  },
  corriger(q: QuestionFrancais): string[] {
    const p: string[] = [];
    const c = citations(q.text);
    if (!c.length) return ["aucune phrase citée"];
    const ph = c.reduce((x, y) => (y.length > x.length ? y : x));
    const options = [q.correct, ...q.wrongs];
    const dem = q.text.match(/circonstanciel de (temps|lieu|cause|manière)(?: \?|\.)$/);
    if (dem) {
      // Tournure « quel groupe est un CC de… » : les options sont des groupes de la phrase.
      const sorte = dem[1] as SorteCC;
      for (const o of options) if (compte(ph, o) !== 1) p.push(`« ${o} » n'est pas une seule fois dans la phrase`);
      if (sorteDe(q.correct) !== sorte) p.push(`« ${q.correct} » n'est pas un CC de ${sorte}`);
      for (const w of q.wrongs) if (sorteDe(w) === sorte) p.push(`le leurre « ${w} » est aussi un CC de ${sorte}`);
      return p;
    }
    const groupe = c.find((x) => x !== ph);
    if (!groupe) return ["le groupe interrogé n'est pas cité"];
    if (compte(ph, groupe) !== 1) p.push(`« ${groupe} » n'est pas une seule fois dans la phrase`);
    const sorte = sorteDe(groupe);
    if (!sorte) return [...p, `« ${groupe} » n'est dans aucune table de CC (ou dans deux)`];
    const vocab = VOCAB_CC.find((v) => Object.values(v).includes(q.correct));
    if (!vocab) return [...p, `réponse « ${q.correct} » inconnue`];
    if (q.correct !== vocab[sorte]) p.push(`« ${groupe} » est un CC de ${sorte}, pas « ${q.correct} »`);
    for (const w of q.wrongs) if (!Object.values(vocab).includes(w)) p.push(`leurre « ${w} » hors vocabulaire`);
    return p;
  },
};

// ── COD et COI ───────────────────────────────────────────────────────────────
const VERBES_COD = new Set([...SCENES.flatMap((s) => s.actions.map((x) => x.v)), ...VERBES_PERSONNE_COD]);
const VERBES_COI = new Set(VERBES_INDIRECTS.map((x) => x.v));
const PREPOSITION_EN_TETE = /^(?:(?:à|au|aux|de|du|des)(?!\p{L})|d')/iu;
/** Des lieux où l'on peut parler, écrire, rêver… (tous dans CC_LIEUX). */
const LIEUX_NEUTRES = ["dans sa chambre", "dans la cour", "dans le salon", "dans le train", "au parc"];
type Objet = "cod" | "coi";

/** « Sujet + verbe + complément d'objet (+ CC) », la fonction du complément connue. */
function phraseObjet(type: Objet, avecCC = Math.random() < 0.6, p: Prenom = hasard(PRENOMS)) {
  let verbe: string, comp: string, lieux: string[];
  if (type === "cod") {
    const scene = hasard(SCENES);
    const act = hasard(scene.actions);
    verbe = act.v;
    comp = lier(act.cod.t);
    lieux = scene.lieux;
  } else {
    const vi = hasard(VERBES_INDIRECTS);
    verbe = vi.v;
    comp = lier(hasard(vi.coi).t);
    // « profiter du soleil dans le salon » sonne faux : un lieu seulement quand on s'adresse à quelqu'un.
    lieux = vi.personnes ? LIEUX_NEUTRES : CC_TEMPS;
  }
  const cc = avecCC ? (Math.random() < 0.5 ? hasard(lieux) : hasard(CC_TEMPS)) : null;
  const enTete = cc !== null && CC_TEMPS.includes(cc) && Math.random() < 0.5;
  const groupes = [...(enTete ? [cc] : []), p.p, verbe, comp, ...(cc && !enTete ? [cc] : [])];
  return { texte: phrase(groupes, enTete ? 0 : -1), comp, verbe, sujet: p.p, cc: cc ? (enTete ? maj(cc) : lier(cc)) : null };
}

/** La fonction d'un complément, retrouvée sur la phrase : le mot juste avant est-il un verbe direct ou indirect ? */
function fonctionObjet(ph: string, comp: string): Objet | null {
  const i = bas(ph).indexOf(bas(comp));
  if (i < 0) return null;
  const avant = ph.slice(0, i).trim().split(/\s+/).pop() ?? "";
  if (VERBES_COI.has(avant) && !VERBES_COD.has(avant) && PREPOSITION_EN_TETE.test(comp)) return "coi";
  if (VERBES_COD.has(avant) && !VERBES_COI.has(avant) && !/^(à|au|aux)(?!\p{L})/iu.test(comp)) return "cod";
  return null;
}
const VOCAB_OBJ: { cod: string; coi: string; autres: string[] }[] = [
  { cod: "un complément d'objet direct", coi: "un complément d'objet indirect", autres: ["un complément circonstanciel de lieu", "un attribut du sujet"] },
  { cod: "un COD", coi: "un COI", autres: ["un CC de lieu", "un attribut du sujet", "le sujet"] },
];
const METHODE_OBJ: Record<Objet, string> = {
  cod: "Regarde ce qui suit le verbe : pas de préposition entre les deux, c'est un COD.",
  coi: "Regarde ce qui suit le verbe : une préposition (à, de) les relie, c'est un COI.",
};

const gCodCoi = {
  generer(): QuestionFrancais {
    const type: Objet = Math.random() < 0.5 ? "cod" : "coi";
    const nom = type === "cod" ? "direct" : "indirect";
    const tour = Math.floor(Math.random() * 4);
    if (tour === 3) {
      // Quatre phrases, une seule contient le complément demandé.
      const ps = melange([...PRENOMS]).slice(0, 4);
      const autre: Objet = type === "cod" ? "coi" : "cod";
      const bonne = phraseObjet(type, false, ps[0]).texte;
      const leurres = ps.slice(1).map((p) => phraseObjet(autre, false, p).texte);
      return qcm(
        hasard([`Quelle phrase contient un complément d'objet ${nom} ?`, `Dans quelle phrase le verbe a-t-il un complément d'objet ${nom} ?`]),
        bonne, leurres, METHODE_OBJ[type],
      );
    }
    const f = phraseObjet(type, tour === 2 ? true : undefined);
    if (tour === 2) {
      return qcm(
        hasard([
          `Dans ${cite(f.texte)}, quel est le complément d'objet ${nom} ?`,
          `${cite(f.texte)} Trouve le complément d'objet ${nom} du verbe.`,
        ]),
        f.comp, melange([f.sujet, f.cc as string, f.verbe]), METHODE_OBJ[type],
      );
    }
    const v = VOCAB_OBJ[tour];
    return qcm(
      tour === 0
        ? `Dans ${cite(f.texte)}, le groupe ${cite(f.comp)} est…`
        : `${cite(f.texte)} Quelle est la fonction de ${cite(f.comp)} ?`,
      v[type], melange([v[type === "cod" ? "coi" : "cod"], ...melange(v.autres).slice(0, 2)]), METHODE_OBJ[type],
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const p: string[] = [];
    const c = citations(q.text);
    const options = [q.correct, ...q.wrongs];
    const dem = q.text.match(/complément d'objet (direct|indirect)/);
    if (!c.length) {
      // Tournure « quelle phrase » : une seule option a le complément demandé.
      const voulu: Objet = dem?.[1] === "direct" ? "cod" : "coi";
      const fct = (o: string) => {
        const mots = o.replace(/\.$/, "").split(" ");
        return fonctionObjet(o.replace(/\.$/, ""), mots.slice(2).join(" "));
      };
      if (fct(q.correct) !== voulu) p.push(`« ${q.correct} » n'a pas de complément d'objet ${dem?.[1]}`);
      for (const w of q.wrongs) if (fct(w) === voulu || fct(w) === null) p.push(`le leurre « ${w} » est douteux`);
      return p;
    }
    const ph = c.reduce((x, y) => (y.length > x.length ? y : x));
    if (c.length === 1 && dem) {
      const voulu: Objet = dem[1] === "direct" ? "cod" : "coi";
      for (const o of options) if (compte(ph, o) !== 1) p.push(`« ${o} » n'est pas une seule fois dans la phrase`);
      if (fonctionObjet(ph, q.correct) !== voulu) p.push(`« ${q.correct} » n'est pas ${voulu.toUpperCase()}`);
      for (const w of q.wrongs) if (fonctionObjet(ph, w) === voulu) p.push(`le leurre « ${w} » est aussi ${voulu.toUpperCase()}`);
      return p;
    }
    const groupe = c.find((x) => x !== ph) ?? "";
    if (compte(ph, groupe) !== 1) p.push(`« ${groupe} » n'est pas une seule fois dans la phrase`);
    const f = fonctionObjet(ph, groupe);
    if (!f) return [...p, `fonction de « ${groupe} » introuvable`];
    const v = VOCAB_OBJ.find((x) => x.cod === q.correct || x.coi === q.correct);
    if (!v) return [...p, `réponse « ${q.correct} » inconnue`];
    if (q.correct !== v[f]) p.push(`« ${groupe} » est ${v[f]}, pas « ${q.correct} »`);
    return p;
  },
};

// ── Attribut du sujet ou COD ─────────────────────────────────────────────────
const ETATS = new Set(VERBES_ETAT.flat());
const genreDe = (prenom: string) => PRENOMS.find((x) => x.p === prenom)?.g ?? null;
/** Le prénom sujet d'une phrase (le premier prénom de la table qu'elle contient). */
const sujetDe = (ph: string) => PRENOMS.find((x) => compte(ph, x.p) > 0)?.p ?? null;

/** Phrase à attribut (« Léa semble fatiguée ») ou à COD (« Léa admire une bonne gardienne »). */
function phraseAttributOuCod(type: "attribut" | "cod", p: Prenom = hasard(PRENOMS), gnCommun?: [string, string]) {
  let verbe: string, groupe: string;
  if (type === "attribut") {
    if (gnCommun || Math.random() < 0.35) {
      const paire = gnCommun ?? hasard(GN_ATTRIBUTS);
      verbe = hasard(["est", "devient", "reste"]);
      groupe = paire[p.g === "m" ? 0 : 1];
    } else {
      verbe = hasard(VERBES_ETAT)[0];
      groupe = hasard(ADJ_ATTRIBUTS)[p.g === "m" ? 0 : 1];
    }
  } else if (gnCommun || Math.random() < 0.35) {
    verbe = hasard(VERBES_PERSONNE_COD);
    groupe = gnCommun ? gnCommun[p.g === "m" ? 0 : 1] : hasard(hasard(GN_ATTRIBUTS));
  } else {
    const act = hasard(hasard(SCENES).actions);
    verbe = act.v;
    groupe = lier(act.cod.t);
  }
  const temps = Math.random() < 0.4 ? hasard(CC_TEMPS) : null;
  return { texte: phrase([...(temps ? [temps] : []), p.p, verbe, groupe], temps ? 0 : -1), groupe, verbe, sujet: p.p };
}

/** Fonction du groupe placé après le verbe ; null si la phrase est fautive (attribut mal accordé…). */
function fonctionApresVerbe(ph: string, groupe: string): "attribut" | "cod" | null {
  const i = bas(ph).indexOf(bas(groupe));
  if (i < 0) return null;
  const avant = ph.slice(0, i).trim().split(/\s+/).pop() ?? "";
  if (ETATS.has(avant)) {
    const g = genreDe(sujetDe(ph) ?? "");
    if (!g) return null;
    const k = g === "m" ? 0 : 1;
    const adj = ADJ_ATTRIBUTS.find((x) => x.slice(0, 2).includes(groupe));
    const gnA = GN_ATTRIBUTS.find((x) => x.includes(groupe));
    if (adj) return adj[k] === groupe ? "attribut" : null;
    if (gnA) return gnA[k] === groupe ? "attribut" : null;
    return null;
  }
  if (VERBES_COD.has(avant)) return "cod";
  return null;
}
const VOCAB_ATTR = { attribut: "un attribut du sujet", cod: "un complément d'objet direct" };
const METHODE_ATTR = {
  attribut: "Le verbe est un verbe d'état (être, sembler, devenir, rester) : le groupe dit comment EST le sujet, c'est un attribut.",
  cod: "Le verbe est un verbe d'action : le groupe répond à « qui ? » ou « quoi ? » après le verbe, c'est un COD.",
};

const gAttributCod = {
  generer(): QuestionFrancais {
    const type = Math.random() < 0.5 ? ("attribut" as const) : ("cod" as const);
    const autre = type === "attribut" ? "cod" : "attribut";
    const tour = Math.floor(Math.random() * 3);
    if (tour === 1) {
      const ps = melange([...PRENOMS]).slice(0, 4);
      return qcm(
        type === "attribut" ? "Quelle phrase contient un attribut du sujet ?" : "Quelle phrase contient un complément d'objet direct ?",
        phraseAttributOuCod(type, ps[0]).texte,
        ps.slice(1).map((p) => phraseAttributOuCod(autre, p).texte),
        METHODE_ATTR[type],
      );
    }
    if (tour === 2) {
      // Le même groupe, deux verbes : c'est le verbe qui décide.
      const p = hasard(PRENOMS);
      const paire = hasard(GN_ATTRIBUTS);
      const a1 = phraseAttributOuCod("attribut", p, paire);
      const c1 = phraseAttributOuCod("cod", p, paire);
      const attributPremier = Math.random() < 0.5;
      const [f1, f2] = attributPremier ? [a1, c1] : [c1, a1];
      const demande = Math.random() < 0.5 ? "attribut" : "cod";
      const bonne = (demande === "attribut") === attributPremier ? "dans la première" : "dans la seconde";
      return qcm(
        `Phrase 1 : ${cite(f1.texte)} Phrase 2 : ${cite(f2.texte)} Dans quelle phrase le groupe ${cite(a1.groupe)} est-il ${VOCAB_ATTR[demande]} ?`,
        bonne,
        melange(["dans la première", "dans la seconde", "dans les deux", "dans aucune"].filter((x) => x !== bonne)),
        "Compare les verbes : un verbe d'état annonce un attribut, un verbe d'action annonce un COD.",
      );
    }
    const f = phraseAttributOuCod(type);
    return qcm(
      hasard([`Dans ${cite(f.texte)}, le groupe ${cite(f.groupe)} est…`, `${cite(f.texte)} Quelle est la fonction de ${cite(f.groupe)} ?`]),
      VOCAB_ATTR[type],
      melange([VOCAB_ATTR[autre], ...melange(["un complément d'objet indirect", "un complément circonstanciel de lieu", "le sujet"]).slice(0, 2)]),
      METHODE_ATTR[type],
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const p: string[] = [];
    const c = citations(q.text);
    if (!c.length) {
      const voulu = q.text.includes("attribut") ? "attribut" : "cod";
      const fct = (o: string) => {
        const s = o.replace(/\.$/, "");
        const mots = s.replace(/^[^,]*, /, "").split(" ");
        return fonctionApresVerbe(s, mots.slice(2).join(" "));
      };
      if (fct(q.correct) !== voulu) p.push(`« ${q.correct} » ne contient pas ce qui est demandé`);
      for (const w of q.wrongs) if (fct(w) !== (voulu === "cod" ? "attribut" : "cod")) p.push(`le leurre « ${w} » est douteux`);
      return p;
    }
    if (c.length === 3) {
      const [s1, s2, g] = c;
      const f1 = fonctionApresVerbe(s1, g), f2 = fonctionApresVerbe(s2, g);
      if (!f1 || !f2 || f1 === f2) return [`les deux phrases ne s'opposent pas (${f1} / ${f2})`];
      const voulu = q.text.includes(VOCAB_ATTR.attribut) ? "attribut" : "cod";
      const bonne = f1 === voulu ? "dans la première" : "dans la seconde";
      if (q.correct !== bonne) p.push(`la bonne réponse est « ${bonne} »`);
      return p;
    }
    const [ph, groupe] = c;
    if (compte(ph, groupe) !== 1) p.push(`« ${groupe} » n'est pas une seule fois dans la phrase`);
    const f = fonctionApresVerbe(ph, groupe);
    if (!f) return [...p, `fonction de « ${groupe} » introuvable (ou attribut mal accordé)`];
    if (q.correct !== VOCAB_ATTR[f]) p.push(`« ${groupe} » est ${VOCAB_ATTR[f]}`);
    return p;
  },
};

// ── Manipulations : déplacer, supprimer, encadrer ────────────────────────────
const possessifPluriel = (t: string) => t.replace(/(?<!\p{L})(son|sa)(?!\p{L})/gu, "leur").replace(/(?<!\p{L})ses(?!\p{L})/gu, "leurs");
const COD_TEXTES = new Set(SCENES.flatMap((s) => s.actions.flatMap((x) => [bas(lier(x.cod.t)), bas(lier(possessifPluriel(x.cod.t)))])));
const VERBES_CONJ_ACTIONS = new Set(SCENES.flatMap((s) => s.actions.flatMap((x) => [x.v, x.vp])));
const estPrenom = (g: string) => PRENOMS.some((x) => x.p === g);
type Role = "cc" | "sujet" | "cod" | "verbe";
/** Le rôle d'un groupe, retrouvé dans les tables. */
function roleDe(g: string): Role | null {
  if (sorteDe(g)) return "cc";
  const paire = g.match(/^(\S+) et (\S+)$/);
  if (estPrenom(g) || (paire && estPrenom(paire[1]) && estPrenom(paire[2]))) return "sujet";
  if (COD_TEXTES.has(bas(g))) return "cod";
  if (VERBES_CONJ_ACTIONS.has(bas(g))) return "verbe";
  return null;
}

/** « Sujet + verbe + COD + CC » ; le sujet est parfois double (« Léa et Noah »). */
function phraseManip() {
  const scene = hasard(SCENES);
  const act = hasard(scene.actions);
  const [p1, p2] = melange([...PRENOMS]);
  const pluriel = Math.random() < 0.3;
  const sujet = pluriel ? `${p1.p} et ${p2.p}` : p1.p;
  const sorte = hasard<SorteCC>(["lieu", "lieu", "temps", "manière", "cause"]);
  // Un adverbe seul en fin de phrase sonne mal (« porte un maillot calmement ») : on garde « avec soin », « sans bruit »…
  const choix = sorte === "lieu" ? scene.lieux : sorte === "cause" ? scene.causes : sorte === "manière" ? CC_MANIERE.filter((x) => x.includes(" ")) : TABLE_CC[sorte];
  const cc = hasard(pluriel ? choix.filter((x) => !/(?<!\p{L})(sa|son|ses)(?!\p{L})/u.test(x)) : choix);
  const verbe = pluriel ? act.vp : act.v;
  const cod = lier(pluriel ? possessifPluriel(act.cod.t) : act.cod.t);
  return { texte: phrase([sujet, verbe, cod, cc]), sujet, verbe, cod, cc: lier(cc) };
}
const MANIP: Record<"cc" | "sujet" | "cod", string> = {
  cc: "on peut le déplacer ou le supprimer",
  sujet: "on peut l'encadrer par « c'est … qui »",
  cod: "on peut le remplacer par « le », « la » ou « les » placé avant le verbe",
};

const gManipulations = {
  generer(): QuestionFrancais {
    const f = phraseManip();
    const tour = Math.floor(Math.random() * 5);
    if (tour === 0)
      return qcm(
        hasard([`Dans ${cite(f.texte)}, quel groupe peut-on déplacer en tête de phrase ?`, `${cite(f.texte)} Quel groupe peut-on déplacer ?`]),
        f.cc, melange([f.sujet, f.cod, f.verbe]),
        "Essaie de mettre chaque groupe au début de la phrase : seul le complément circonstanciel peut bouger.",
      );
    if (tour === 1)
      return qcm(
        `Dans ${cite(f.texte)}, quel groupe peut-on supprimer ? La phrase doit rester correcte.`,
        f.cc, melange([f.sujet, f.verbe]),
        "Barre chaque groupe à tour de rôle : sans sujet ou sans verbe, il n'y a plus de phrase.",
      );
    if (tour === 2)
      return qcm(
        hasard([`Dans ${cite(f.texte)}, quel groupe peut-on encadrer par « c'est … qui » ?`, `${cite(f.texte)} On encadre le sujet par « c'est … qui ». Quel est le sujet ?`]),
        f.sujet, melange([f.cod, f.cc, f.verbe]),
        `« C'est ${f.sujet} qui ${f.verbe}… » : le groupe encadré par « c'est … qui » est le sujet.`,
      );
    if (tour === 3) {
      const reste = f.texte.replace(/\.$/, "").replace(` ${f.cc}`, "");
      const minus = (s: string) => (estPrenom(s.split(" ")[0]) ? s : s.charAt(0).toLowerCase() + s.slice(1));
      return qcm(
        `${cite(f.texte)} On déplace le complément circonstanciel au début. Quelle phrase obtient-on ?`,
        `${maj(f.cc)}, ${minus(reste)}.`,
        melange([
          `${maj(f.cod)}, ${f.sujet} ${f.verbe} ${f.cc}.`,
          `${maj(f.verbe)} ${f.sujet} ${f.cod} ${f.cc}.`,
        ]),
        "On prend le complément circonstanciel, on le place en tête et on met une virgule après lui.",
      );
    }
    const role = hasard<"cc" | "sujet" | "cod">(["cc", "sujet", "cod"]);
    const groupe = role === "cc" ? f.cc : role === "sujet" ? f.sujet : f.cod;
    const nom = role === "cc" ? "un complément circonstanciel" : role === "sujet" ? "le sujet" : "le COD";
    return qcm(
      `Dans ${cite(f.texte)}, quelle manipulation montre que ${cite(groupe)} est ${nom} ?`,
      MANIP[role], melange((["cc", "sujet", "cod"] as const).filter((r) => r !== role).map((r) => MANIP[r]).concat("on peut le mettre au pluriel")),
      "Chaque fonction a son test : déplacer pour le complément circonstanciel, encadrer pour le sujet, remplacer par un pronom pour le COD.",
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const p: string[] = [];
    const c = citations(q.text);
    const ph = c[0] ?? "";
    // Les groupes de la phrase, retrouvés par leurs rôles dans les tables.
    const mots = ph.replace(/\.$/, "");
    const cc = CC_LIEUX.concat(CC_TEMPS, CC_MANIERE, CC_CAUSES).map(lier).filter((x) => compte(mots, x) === 1);
    if (cc.length !== 1) return [`la phrase n'a pas exactement un complément circonstanciel (${cc.join(", ")})`];
    if (q.text.includes("déplace le complément circonstanciel au début")) {
      const reste = mots.replace(` ${cc[0]}`, "");
      const attendu = `${maj(cc[0])}, ${estPrenom(reste.split(" ")[0]) ? reste : reste.charAt(0).toLowerCase() + reste.slice(1)}.`;
      if (q.correct !== attendu) p.push(`la phrase attendue est « ${attendu} »`);
      return p;
    }
    if (q.text.includes("quelle manipulation")) {
      const r = roleDe(c[1] ?? "");
      if (!r || r === "verbe") return [`rôle de « ${c[1]} » introuvable`];
      if (q.correct !== nb(MANIP[r])) p.push(`le test de « ${c[1]} » est « ${MANIP[r]} »`);
      return p;
    }
    for (const o of [q.correct, ...q.wrongs]) if (compte(ph, o) !== 1) p.push(`« ${o} » n'est pas une seule fois dans la phrase`);
    const voulu: Role = /encadr/.test(q.text) ? "sujet" : "cc";
    if (roleDe(q.correct) !== voulu) p.push(`« ${q.correct} » n'est pas ${voulu}`);
    for (const w of q.wrongs) if (roleDe(w) === voulu || roleDe(w) === null) p.push(`le leurre « ${w} » est douteux`);
    return p;
  },
};

// ── Pronoms personnels : les repérer, les choisir ────────────────────────────
type GenreNombre = { g: "m" | "f" | null; n: "s" | "p" };
const DET_GN: Record<string, GenreNombre> = {
  un: { g: "m", n: "s" }, le: { g: "m", n: "s" }, son: { g: "m", n: "s" }, mon: { g: "m", n: "s" }, ce: { g: "m", n: "s" },
  cet: { g: "m", n: "s" }, du: { g: "m", n: "s" }, au: { g: "m", n: "s" },
  une: { g: "f", n: "s" }, la: { g: "f", n: "s" }, sa: { g: "f", n: "s" }, ma: { g: "f", n: "s" }, cette: { g: "f", n: "s" },
  les: { g: null, n: "p" }, des: { g: null, n: "p" }, ses: { g: null, n: "p" }, mes: { g: null, n: "p" }, ces: { g: null, n: "p" },
  aux: { g: null, n: "p" }, leurs: { g: null, n: "p" }, "l'": { g: null, n: "s" },
};
/** Genre et nombre d'un groupe : par son prénom, ou par son déterminant (« à sa sœur » → féminin singulier). */
function genreNombre(groupe: string): GenreNombre | null {
  const g = genreDe(groupe);
  if (g) return { g, n: "s" };
  const m = bas(groupe).replace(/^(à|de) /, "").match(/^(l'|\p{L}+)/u);
  return m ? DET_GN[m[1]] ?? null : null;
}
const PRONOM_COD = (gn: GenreNombre) => (gn.n === "p" ? "les" : gn.g === "f" ? "la" : "le");
const PRONOM_COI = (gn: GenreNombre) => (gn.n === "p" ? "leur" : "lui");
const PRONOM_SUJET = (g: "m" | "f", n: "s" | "p") => (n === "p" ? (g === "m" ? "ils" : "elles") : g === "m" ? "il" : "elle");
const commenceParConsonne = (s: string) => !new RegExp(`^[${VOYELLE}h]`, "i").test(s);
const METHODE_PRONOM = "Le pronom prend le genre et le nombre du groupe qu'il remplace : le, la, les pour un COD ; lui, leur pour un COI.";

const gPronoms = {
  generer(): QuestionFrancais {
    const tour = Math.floor(Math.random() * 4);
    const p = hasard(PRENOMS);
    if (tour === 0) {
      // Remplacer le COD par le, la ou les.
      const act = hasard(SCENES.flatMap((s) => s.actions).filter((x) => commenceParConsonne(x.v)));
      const pr = PRONOM_COD(act.cod);
      return qcm(
        `${cite(phrase([p.p, act.v, act.cod.t]))} Remplace ${cite(lier(act.cod.t))} par un pronom. Quelle phrase obtient-on ?`,
        phrase([p.p, pr, act.v]),
        melange(["le", "la", "les", "lui", "leur"].filter((x) => x !== pr)).slice(0, 3).map((x) => phrase([p.p, x, act.v])),
        METHODE_PRONOM,
      );
    }
    if (tour === 1) {
      // Remplacer le COI (une personne) par lui ou leur.
      const vi = hasard(VERBES_INDIRECTS.filter((x) => x.personnes && commenceParConsonne(x.v)));
      const coi = hasard(vi.coi);
      const pr = PRONOM_COI(coi);
      return qcm(
        `${cite(phrase([p.p, vi.v, coi.t]))} Remplace ${cite(lier(coi.t))} par un pronom. Quelle phrase obtient-on ?`,
        phrase([p.p, pr, vi.v]),
        melange(["le", "la", "les", "lui", "leur"].filter((x) => x !== pr)).slice(0, 3).map((x) => phrase([p.p, x, vi.v])),
        METHODE_PRONOM,
      );
    }
    if (tour === 2) {
      // Remplacer un sujet double par ils ou elles.
      const [a, b] = melange(PRENOMS.filter((x) => x.p !== p.p)).slice(0, 2);
      const sujet = Math.random() < 0.5 ? `${p.p} et ${a.p}` : `${p.p}, ${a.p} et ${b.p}`;
      const masc = [p, a, ...(sujet.includes(",") ? [b] : [])].some((x) => x.g === "m");
      const pr = PRONOM_SUJET(masc ? "m" : "f", "p");
      const act = hasard(hasard(SCENES).actions);
      return qcm(
        hasard([
          `${cite(phrase([sujet, act.vp, possessifPluriel(act.cod.t)]))} Par quel pronom personnel peut-on remplacer le sujet ${cite(sujet)} ?`,
          `Dans ${cite(phrase([sujet, act.vp, possessifPluriel(act.cod.t)]))}, quel pronom remplace ${cite(sujet)} ?`,
        ]),
        pr, melange(["il", "elle", "ils", "elles"].filter((x) => x !== pr)),
        "Plusieurs personnes : ils ou elles. Il suffit d'un garçon dans le groupe pour écrire « ils ».",
      );
    }
    // Repérer le pronom sujet ou le pronom complément dans une phrase.
    const act = hasard(SCENES.flatMap((s) => s.actions).filter((x) => commenceParConsonne(x.v)));
    const n = Math.random() < 0.3 ? "p" : "s";
    const ps = PRONOM_SUJET(p.g, n);
    const po = PRONOM_COD(act.cod);
    const cc = hasard(CC_TEMPS.filter((x) => !/(?<!\p{L})(le|la|les|l')/u.test(x)));
    const texte = phrase([ps, po, n === "p" ? act.vp : act.v, cc]);
    const motCC = lier(cc).split(" ").pop() as string;
    const demande = Math.random() < 0.5 ? "sujet" : "complément";
    return qcm(
      hasard([
        `Dans ${cite(texte)}, quel mot est un pronom personnel ${demande} ?`,
        `${cite(texte)} Trouve le pronom personnel ${demande}.`,
      ]),
      demande === "sujet" ? maj(ps) : po,
      melange([demande === "sujet" ? po : maj(ps), n === "p" ? act.vp : act.v, motCC]),
      demande === "sujet"
        ? "Le pronom sujet fait l'action : pose la question « qui est-ce qui ? » avant le verbe."
        : "Le pronom complément se place juste avant le verbe et remplace un groupe déjà nommé.",
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const p: string[] = [];
    const c = citations(q.text);
    const opts = [q.correct, ...q.wrongs];
    if (/Remplace /.test(q.text)) {
      // On refait le remplacement : pronom choisi d'après le déterminant du groupe.
      const [ph, groupe] = c;
      const gn = genreNombre(groupe);
      if (!gn) return [`genre de « ${groupe} » introuvable`];
      const sp = ph.replace(/\.$/, "").replace(` ${groupe}`, "").split(" ");
      const verbe = sp[1];
      const coi = /^(à|au|aux)(?!\p{L})/iu.test(groupe);
      if (coi && !VERBES_COI.has(verbe)) p.push(`« ${verbe} » n'est pas un verbe à COI`);
      if (!coi && !VERBES_COD.has(verbe)) p.push(`« ${verbe} » n'est pas un verbe à COD`);
      const attendu = phrase([sp[0], coi ? PRONOM_COI(gn) : PRONOM_COD(gn), verbe]);
      if (q.correct !== attendu) p.push(`la phrase attendue est « ${attendu} »`);
      if (q.wrongs.some((w) => w === attendu)) p.push("un leurre est la bonne phrase");
      return p;
    }
    if (/remplace|remplacer le sujet/.test(q.text)) {
      const sujet = c[c.length - 1];
      const noms = sujet.split(/, | et /);
      const genres = noms.map(genreDe);
      if (genres.some((g) => !g) || noms.length < 2) return [`sujet « ${sujet} » illisible`];
      const attendu = PRONOM_SUJET(genres.includes("m") ? "m" : "f", "p");
      if (q.correct !== attendu) p.push(`le pronom attendu est « ${attendu} »`);
      return p;
    }
    // Repérage : le mot demandé est-il bien un pronom sujet / complément, une seule fois ?
    const ph = c[0];
    const demande = q.text.includes("personnel sujet") ? "sujet" : "complément";
    const SUJETS = ["il", "elle", "ils", "elles"], COMPL = ["le", "la", "les", "lui", "leur"];
    for (const o of opts) if (compte(ph, o) !== 1) p.push(`« ${o} » n'est pas une seule fois dans la phrase`);
    const ok = (o: string) => (demande === "sujet" ? SUJETS : COMPL).includes(bas(o));
    if (!ok(q.correct)) p.push(`« ${q.correct} » n'est pas un pronom ${demande}`);
    for (const w of q.wrongs) if (ok(w)) p.push(`le leurre « ${w} » est aussi un pronom ${demande}`);
    const mots = ph.replace(/\.$/, "").split(" ");
    if (!SUJETS.includes(bas(mots[0])) || !COMPL.includes(mots[1])) p.push("la phrase ne commence pas par « pronom sujet + pronom complément »");
    else {
      const pl = bas(mots[0]).endsWith("s");
      if (!(pl ? VERBES_CONJ_ACTIONS.has(mots[2]) && SCENES.some((s) => s.actions.some((x) => x.vp === mots[2])) : SCENES.some((s) => s.actions.some((x) => x.v === mots[2]))))
        p.push(`le verbe « ${mots[2]} » ne s'accorde pas avec « ${mots[0]} »`);
    }
    return p;
  },
};

// ── La fonction d'un pronom personnel ────────────────────────────────────────
const VERBES_PERSONNE_DIRECTS = ["regarde", "appelle", "attend", "aide", "invite", "encourage", "écoute", "applaudit"];
const DIRECTS = new Set([...VERBES_COD, ...VERBES_PERSONNE_DIRECTS]);
const FONCTIONS_PRONOM = { sujet: "sujet", cod: "complément d'objet direct", coi: "complément d'objet indirect" };
const CC_SANS_ARTICLE = CC_TEMPS.filter((x) => !/(?<!\p{L})(le|la|les|l')/u.test(x));
const PRONOMS_SUJETS = ["il", "elle", "ils", "elles"];

/** Une phrase à pronom complément ; le sujet est un prénom ou un pronom. */
function phrasePronom() {
  const p = hasard(PRENOMS);
  const sujetPronom = Math.random() < 0.5;
  const sujet = sujetPronom ? PRONOM_SUJET(p.g, "s") : p.p;
  let verbe: string, objet: string;
  const r = Math.random();
  if (r < 0.35) {
    const act = hasard(SCENES.flatMap((s) => s.actions));
    verbe = act.v;
    objet = PRONOM_COD(act.cod);
  } else if (r < 0.65) {
    verbe = hasard(VERBES_PERSONNE_DIRECTS);
    objet = hasard(["le", "la", "les", "me", "te", "nous", "vous"]);
  } else {
    verbe = hasard(VERBES_INDIRECTS.filter((x) => x.personnes)).v;
    objet = hasard(["lui", "leur", "me", "te", "nous", "vous"]);
  }
  const cc = Math.random() < 0.6 ? hasard(CC_SANS_ARTICLE) : null;
  const enTete = cc !== null && Math.random() < 0.5;
  const texte = phrase([...(enTete ? [cc] : []), sujet, objet, verbe, ...(cc && !enTete ? [cc] : [])], enTete ? 0 : -1);
  // Le pronom tel qu'il est écrit (élidé : l', m', t').
  const mots = texte.match(/\p{L}+'|\p{L}+/gu) as string[];
  const iSujet = mots.findIndex((m) => bas(m) === bas(sujet));
  return { texte, sujet: mots[iSujet], objet: mots[iSujet + 1], sujetPronom, verbe };
}
/** Fonction d'un pronom, retrouvée sur la phrase : sa place et le verbe qui le suit. */
function fonctionPronom(ph: string, pr: string): keyof typeof FONCTIONS_PRONOM | null {
  const mots = ph.match(/\p{L}+'|\p{L}+/gu) ?? [];
  const i = mots.findIndex((m) => bas(m) === bas(pr));
  if (i < 0 || mots.filter((m) => bas(m) === bas(pr)).length !== 1) return null;
  const x = bas(pr);
  const suivant = mots[i + 1] ?? "";
  if (PRONOMS_SUJETS.includes(x)) return estPrenom(mots[i - 1] ?? "") ? null : "sujet";
  const avant = bas(mots[i - 1] ?? "");
  if (!PRONOMS_SUJETS.includes(avant) && !estPrenom(mots[i - 1] ?? "")) return null;
  const direct = DIRECTS.has(suivant), indirect = VERBES_COI.has(suivant);
  if (direct === indirect) return null;
  if (["le", "la", "les", "l'"].includes(x)) return direct ? "cod" : null;
  if (["lui", "leur"].includes(x)) return indirect ? "coi" : null;
  if (["me", "te", "nous", "vous", "m'", "t'"].includes(x)) return direct ? "cod" : "coi";
  return null;
}
const METHODE_FONCTION_PRONOM: Record<keyof typeof FONCTIONS_PRONOM, string> = {
  sujet: "Pose la question « qui est-ce qui ? » devant le verbe : la réponse est le sujet.",
  cod: "Remets le complément après le verbe : s'il n'y a pas de préposition (regarder QUELQU'UN), c'est un COD.",
  coi: "Remets le complément après le verbe : s'il faut « à » (parler À QUELQU'UN), c'est un COI.",
};

const gPronomsFonction = {
  generer(): QuestionFrancais {
    const f = phrasePronom();
    const surSujet = f.sujetPronom && Math.random() < 0.35;
    const pr = surSujet ? f.sujet : f.objet;
    const fct = surSujet ? "sujet" : DIRECTS.has(f.verbe) ? "cod" : "coi";
    return qcm(
      hasard([
        `Dans ${cite(f.texte)}, quelle est la fonction du pronom ${cite(pr)} ?`,
        `${cite(f.texte)} Le pronom ${cite(pr)} est…`,
        `Lis : ${cite(f.texte)} Quelle est la fonction de ${cite(pr)} ?`,
      ]),
      FONCTIONS_PRONOM[fct],
      melange([...Object.values(FONCTIONS_PRONOM).filter((x) => x !== FONCTIONS_PRONOM[fct]), "complément circonstanciel"]),
      METHODE_FONCTION_PRONOM[fct],
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const c = citations(q.text);
    const ph = c.reduce((x, y) => (y.length > x.length ? y : x));
    const pr = c.find((x) => x !== ph) ?? "";
    const f = fonctionPronom(ph, pr);
    if (!f) return [`fonction de « ${pr} » introuvable dans « ${ph} »`];
    return q.correct === FONCTIONS_PRONOM[f] ? [] : [`« ${pr} » est ${FONCTIONS_PRONOM[f]}`];
  },
};

// ── L'antécédent d'un pronom ─────────────────────────────────────────────────
const DETS_RE = /(?<!\p{L})(?:(une|un|les|le|la|des|du|aux|au|son|sa|ses|cette|cet|ces|ce)(?=\s)|(l')(?=\p{L}))/giu;
/** Les groupes d'un texte (prénoms et groupes à déterminant), avec leur genre et leur nombre. */
function groupesDe(t: string): { t: string; gn: GenreNombre }[] {
  const r: { t: string; gn: GenreNombre }[] = [];
  for (const x of PRENOMS) for (let k = 0; k < compte(t, x.p); k++) r.push({ t: x.p, gn: { g: x.g, n: "s" } });
  for (const m of t.matchAll(DETS_RE)) r.push({ t: m[0], gn: DET_GN[bas(m[1] ?? m[2])] });
  return r;
}
/** Le groupe peut-il être repris par ce pronom (genre et nombre) ? */
function compatible(gn: GenreNombre, pr: string): boolean {
  const x = bas(pr);
  if (["il", "le"].includes(x)) return gn.n === "s" && gn.g !== "f";
  if (["elle", "la"].includes(x)) return gn.n === "s" && gn.g !== "m";
  if (["ils", "les"].includes(x)) return gn.n === "p";
  if (x === "elles") return gn.n === "p" && gn.g !== "m";
  return true;
}
/** Le groupe nominal d'un complément de lieu, quand il est écrit tel quel (« dans la cuisine » → « la cuisine »). */
const gnDuLieu = (lieu: string) => {
  const m = lier(lieu).match(/^(?:dans|sur|à|chez|devant|près de|au bord de) ((?:la|le|les|sa|son|ses|l')(?:\s|(?<=')).+)$/u);
  return m ? m[1] : null;
};

type TexteAntecedent = { texte: string; pronom: string; ref: string; autres: string[]; fct: "sujet" | "COD" };
/** Deux phrases : la seconde reprend le sujet ET le COD de la première par des pronoms. */
function texteAntecedent(): TexteAntecedent {
  for (;;) {
    const scene = hasard(SCENES);
    const act = hasard(scene.actions.filter((x) => x.suite));
    const lieu = hasard(scene.lieux);
    const gnLieu = gnDuLieu(lieu);
    if (!gnLieu) continue;
    const p = hasard(PRENOMS);
    const ps = PRONOM_SUJET(p.g, "s"), po = PRONOM_COD(act.cod);
    const texte = `${phrase([p.p, act.v, act.cod.t, lieu])} ${phrase([ps, po, act.suite as string])}`;
    const surSujet = Math.random() < 0.5;
    const pronom = surSujet ? maj(ps) : po;
    const ref = surSujet ? p.p : lier(act.cod.t);
    if (compte(texte, pronom) !== 1) continue;
    const avant = texte.slice(0, texte.search(new RegExp(`(?<!\\p{L})${pronom}(?!\\p{L})`, "u")));
    if (groupesDe(avant).filter((g) => compatible(g.gn, pronom)).length !== 1) continue;
    const autres = [p.p, lier(act.cod.t), gnLieu].filter((x) => x !== ref);
    return { texte, pronom, ref, autres, fct: surSujet ? "sujet" : "COD" };
  }
}
/** Vérifie qu'un pronom ne peut reprendre qu'UN groupe du texte, et lequel. */
function verifierAntecedent(texte: string, pronom: string, ref: string, autres: string[]): string[] {
  const p: string[] = [];
  if (compte(texte, pronom) !== 1) return [`« ${pronom} » n'est pas une seule fois dans le texte`];
  const avant = texte.slice(0, texte.search(new RegExp(`(?<!\\p{L})${echapper(pronom)}(?!\\p{L})`, "u")));
  const possibles = groupesDe(avant).filter((g) => compatible(g.gn, pronom));
  if (possibles.length !== 1) p.push(`« ${pronom} » peut reprendre ${possibles.length} groupes (${possibles.map((x) => x.t).join(", ")})`);
  const gnRef = genreNombre(ref);
  if (!gnRef || !compatible(gnRef, pronom)) p.push(`« ${ref} » ne s'accorde pas avec « ${pronom} »`);
  if (compte(avant, ref) < 1) p.push(`« ${ref} » n'est pas dans le texte avant le pronom`);
  for (const a of autres) {
    if (compte(avant, a) < 1) p.push(`le leurre « ${a} » n'est pas dans le texte`);
    const g = genreNombre(a);
    if (!g || compatible(g, pronom)) p.push(`le leurre « ${a} » pourrait aussi être repris par « ${pronom} »`);
  }
  return p;
}
const METHODE_ANTECEDENT = "Remonte dans le texte : l'antécédent est le groupe nommé avant le pronom, avec le même genre et le même nombre.";

const gPronomAntecedent = {
  generer(): QuestionFrancais {
    const a = texteAntecedent();
    return qcm(
      hasard([
        `${cite(a.texte)} Que reprend le pronom ${cite(a.pronom)} ?`,
        `Lis : ${cite(a.texte)} À quel groupe renvoie ${cite(a.pronom)} ?`,
        `${cite(a.texte)} Quel est l'antécédent de ${cite(a.pronom)} ?`,
        `${cite(a.texte)} Qui ou quoi désigne le pronom ${cite(a.pronom)} ?`,
      ]),
      a.ref, melange(a.autres), METHODE_ANTECEDENT,
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const c = citations(q.text);
    const texte = c.reduce((x, y) => (y.length > x.length ? y : x));
    const pronom = c.find((x) => x !== texte) ?? "";
    return verifierAntecedent(texte, pronom, q.correct, q.wrongs);
  },
};

// ── Défi pronoms : qui est « il », et quelle est sa fonction ? ───────────────
const FCT_DEFI = { sujet: "sujet", COD: "COD" } as const;
const gPronomsDefi = {
  generer(): QuestionFrancais {
    if (Math.random() < 0.4) {
      // Remplacer le sujet ET le COD par des pronoms, sujet parfois double.
      const act = hasard(SCENES.flatMap((s) => s.actions).filter((x) => commenceParConsonne(x.v)));
      const [p1, p2] = melange([...PRENOMS]);
      const pl = Math.random() < 0.4;
      const sujet = pl ? `${p1.p} et ${p2.p}` : p1.p;
      const cod = pl ? possessifPluriel(act.cod.t) : act.cod.t;
      const v = pl ? act.vp : act.v;
      const g = pl ? ([p1, p2].some((x) => x.g === "m") ? "m" : "f") : p1.g;
      const ps = PRONOM_SUJET(g, pl ? "p" : "s"), po = PRONOM_COD(act.cod);
      // Les leurres gardent un sujet du bon nombre : la faute porte sur le genre ou sur le COD.
      const autreSujet = { il: "elle", elle: "il", ils: "elles", elles: "ils" }[ps] as string;
      const [c1, c2] = melange(["le", "la", "les", "lui"].filter((x) => x !== po));
      return qcm(
        `${cite(phrase([sujet, v, cod]))} Remplace le sujet et le COD par des pronoms. Quelle phrase obtient-on ?`,
        phrase([ps, po, v]),
        melange([phrase([autreSujet, po, v]), phrase([ps, c1, v]), phrase([autreSujet, c2, v])]),
        "Le sujet devient il, elle, ils ou elles ; le COD devient le, la ou les, juste avant le verbe.",
      );
    }
    const a = texteAntecedent();
    const fct = FCT_DEFI[a.fct], autre = a.fct === "sujet" ? "COD" : "sujet";
    return qcm(
      hasard([
        `${cite(a.texte)} Que reprend ${cite(a.pronom)}, et quelle est sa fonction ?`,
        `Lis : ${cite(a.texte)} Qui ou quoi est ${cite(a.pronom)} ? Quelle est sa fonction ?`,
      ]),
      `${a.ref}, ${fct}`,
      melange([`${a.autres[0]}, ${fct}`, `${a.ref}, ${autre}`, `${a.autres[1]}, ${autre}`]),
      "Cherche d'abord le groupe repris (même genre, même nombre), puis regarde la place du pronom : avant le verbe et sujet, ou complément.",
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const c = citations(q.text);
    if (q.text.includes("Remplace le sujet et le COD")) {
      const mots = c[0].replace(/\.$/, "").split(" ");
      const iv = mots.findIndex((m) => VERBES_CONJ_ACTIONS.has(m));
      if (iv < 1) return ["verbe introuvable"];
      const sujet = mots.slice(0, iv).join(" "), cod = mots.slice(iv + 1).join(" ");
      const noms = sujet.split(" et ");
      const genres = noms.map(genreDe);
      // « leur gourde » : le déterminant ne dit pas le genre, on le prend dans la table des COD.
      const dansTable = SCENES.flatMap((s) => s.actions).find((x) => [x.cod.t, possessifPluriel(x.cod.t)].includes(cod));
      const gnCod = dansTable ? { g: dansTable.cod.g, n: dansTable.cod.n } : genreNombre(cod);
      if (genres.some((g) => !g) || !gnCod) return ["sujet ou COD illisible"];
      const attendu = phrase([PRONOM_SUJET(genres.includes("m") ? "m" : "f", noms.length > 1 ? "p" : "s"), PRONOM_COD(gnCod), mots[iv]]);
      return q.correct === attendu ? [] : [`la phrase attendue est « ${attendu} »`];
    }
    const texte = c.reduce((x, y) => (y.length > x.length ? y : x));
    const pronom = c.find((x) => x !== texte) ?? "";
    const [ref, f] = q.correct.split(", ");
    const p = verifierAntecedent(texte, pronom, ref, q.wrongs.map((w) => w.split(", ")[0]).filter((w) => w !== ref));
    const attendue = PRONOMS_SUJETS.includes(bas(pronom)) ? "sujet" : ["le", "la", "les"].includes(pronom) ? "COD" : null;
    if (f !== attendue) p.push(`« ${pronom} » est ${attendue}, pas ${f}`);
    if (q.wrongs.includes(`${ref}, ${f}`)) p.push("un leurre est la bonne réponse");
    return p;
  },
};

// ── Le groupe nominal : noyau, épithète, complément du nom ───────────────────
type GNEtendu = { t: string; noyau: string; det: string; ante?: string; post?: string; cn?: string };
/** Forme « A » : det + épithète avant + nom + CN de chose (« une petite boîte en carton ») ;
 *  « B » : le/la/les + [épithète avant] + nom + épithète après + CN prénom (« le vieux vélo rouge de Léa ») ;
 *  « C » : det + épithète avant + nom + épithète après (« un gros chien noir »). */
function gnEtendu(forme: "A" | "B" | "C", opts: { pluriel?: boolean; indefini?: boolean } = {}): GNEtendu {
  for (;;) {
    const nom = hasard(NOMS);
    const pl = opts.pluriel ?? (!opts.indefini && Math.random() < 0.25);
    const k = (nom.g === "m" ? 0 : 1) + (pl ? 2 : 0);
    const antes = nom.adj.filter((x) => ANTEPOSES.has(x)), posts = nom.adj.filter((x) => !ANTEPOSES.has(x));
    const ante = forme === "A" || forme === "C" || Math.random() < 0.4 ? (antes.length ? EPITHETES[hasard(antes)][k] : null) : undefined;
    const post = forme !== "A" ? (posts.length ? EPITHETES[hasard(posts)][k] : null) : undefined;
    if (ante === null || post === null) continue;
    // Pas d'adjectifs qui se répètent ou se contredisent : « la vieille table ancienne », « un gros sac léger ».
    if (ante?.startsWith("vie") && post?.startsWith("ancien")) continue;
    if (ante && post && (post.startsWith("énorme") || (ante.startsWith("gros") && post.startsWith("lég")))) continue;
    const cn = forme === "A" ? hasard(nom.cn) : forme === "B" ? lier(`de ${hasard(PRENOMS).p}`) : undefined;
    const defini = forme === "B" || (!opts.indefini && (pl || Math.random() < 0.5));
    // « le vélo de Léa » : avec un prénom, toujours l'article défini.
    const demonstratif = forme !== "B" && Math.random() < 0.25;
    const det = pl
      ? (opts.indefini ? "des" : demonstratif ? "ces" : "les")
      : defini ? (demonstratif ? (nom.g === "m" ? "ce" : "cette") : nom.g === "m" ? "le" : "la") : nom.g === "m" ? "un" : "une";
    if (det === "des" && ante) continue; // « de petits vélos » : on l'évite en 6e
    const noyau = pl ? nom.p : nom.s;
    const t = [det, ante, noyau, post, cn].filter(Boolean).join(" ");
    return { t, noyau, det, ...(ante ? { ante } : {}), ...(post ? { post } : {}), ...(cn ? { cn } : {}) };
  }
}
const FORMES_NOMS = new Set(NOMS.flatMap((x) => [x.s, x.p]));
const FORMES_EPITHETES = new Set(Object.values(EPITHETES).flat());
const DETERMINANTS = new Set(Object.keys(DET_GN).concat("des", "ces", "cette"));
/** Le nom noyau d'un groupe nominal : le premier mot qui est un nom de la table. */
const noyauDe = (gn: string) => gn.split(" ").find((m) => FORMES_NOMS.has(m)) ?? null;

const gGn = {
  generer(): QuestionFrancais {
    const g = gnEtendu(hasard(["A", "B", "C", "B"] as const));
    const leurres = melange([g.ante, g.post, g.cn?.split(/ |'/).pop(), g.det].filter((x): x is string => !!x));
    const methode = "Le nom noyau est le nom que tous les autres mots complètent : enlève les adjectifs et le complément, il reste « déterminant + nom ».";
    const tour = Math.floor(Math.random() * 3);
    if (tour === 2) {
      const p = hasard(PRENOMS.filter((x) => compte(g.t, x.p) === 0));
      const ph = phrase([p.p, hasard(["regarde", "cherche", "dessine", "photographie", "montre"]), g.t]);
      return qcm(
        hasard([`${cite(ph)} Quel est le nom noyau du groupe nominal ${cite(g.t)} ?`, `Dans ${cite(ph)}, quel nom est le noyau du groupe ${cite(g.t)} ?`]),
        g.noyau, leurres, methode,
      );
    }
    return qcm(
      tour === 0 ? `Dans le groupe nominal ${cite(g.t)}, quel est le nom noyau ?` : `${cite(g.t)} Quel mot est le noyau de ce groupe nominal ?`,
      g.noyau, leurres, methode,
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const p: string[] = [];
    const c = citations(q.text);
    const gn = c.find((x) => DETERMINANTS.has(bas(x.split(" ")[0])) && !/[.]$/.test(x)) ?? "";
    const noyau = noyauDe(gn);
    if (!noyau) return [`pas de nom de la table dans « ${gn} »`];
    if (q.correct !== noyau) p.push(`le noyau de « ${gn} » est « ${noyau} »`);
    const mots = gn.split(/ |(?<=')/);
    for (const w of q.wrongs) if (!mots.includes(w)) p.push(`le leurre « ${w} » n'est pas dans le groupe`);
    if (q.wrongs.includes(noyau)) p.push("un leurre est le noyau");
    return p;
  },
};

// ── Le groupe nominal, quelle que soit sa fonction ───────────────────────────
type FonctionGN = "sujet" | "cod" | "attribut" | "cct";
const FCT_GN: Record<FonctionGN, string> = {
  sujet: "sujet du verbe", cod: "complément d'objet direct", attribut: "attribut du sujet", cct: "complément circonstanciel de temps",
};
const CC_TEMPS_GN = ["ce matin", "chaque samedi", "le mercredi", "ce soir", "le dimanche"];
const VERBES_REGARD = ["regarde", "cherche", "dessine", "photographie", "montre"];
/** Ce que fait le groupe quand il est sujet (selon le nom). */
function suiteSujet(noyau: string): string {
  if (["chien", "tortue"].includes(noyau)) return hasard(["dort dans le jardin", "attend près de la porte"]);
  if (["gâteau", "tarte"].includes(noyau)) return hasard(["est sur la table", "refroidit dans la cuisine"]);
  if (noyau === "maison") return "se trouve près de la rivière";
  if (noyau === "bateau") return "flotte sur le lac";
  return hasard(["est sur l'étagère", "reste dans le garage", "est dans le salon"]);
}
/** Une phrase où le groupe nominal a la fonction voulue. */
function phraseGN(g: GNEtendu, f: Exclude<FonctionGN, "cct">): string {
  const p = hasard(PRENOMS);
  if (f === "sujet") return phrase([g.t, suiteSujet(g.noyau)]);
  if (f === "cod") return phrase([p.p, hasard(VERBES_REGARD), g.t]);
  return phrase([hasard([`le cadeau de ${p.p}`, "le lot du concours", `le trésor de ${p.p}`]), "est", g.t]);
}
/** La fonction d'un groupe nominal, retrouvée par sa place dans la phrase. */
function fonctionGN(ph: string, gn: string): FonctionGN | null {
  const i = bas(ph).indexOf(bas(gn));
  if (i < 0 || compte(ph, gn) !== 1) return null;
  const avant = ph.slice(0, i).trim();
  if (!avant) {
    if (ph.slice(i + gn.length).startsWith(",")) return CC_TEMPS.includes(bas(gn)) ? "cct" : null;
    return "sujet";
  }
  const mot = avant.split(/\s+/).pop() as string;
  if (ETATS.has(mot)) return "attribut";
  if (DIRECTS.has(mot)) return "cod";
  return null;
}
const NATURE = {
  oui: "oui : sa nature ne change pas, seule sa fonction change",
  autres: [
    "non : dans la phrase 2, ce n'est plus un groupe nominal",
    "non : dans la phrase 1, ce n'est pas un groupe nominal",
    "oui : et il a la même fonction dans les deux phrases",
  ],
};

const gGnTouteFonction = {
  generer(): QuestionFrancais {
    const tour = Math.random();
    const g = gnEtendu(hasard(["A", "C"] as const), { pluriel: false, indefini: true });
    if (tour < 0.35) {
      const f = hasard<Exclude<FonctionGN, "cct">>(["sujet", "cod", "attribut"]);
      const autres = melange((["sujet", "cod", "attribut"] as const).filter((x) => x !== f));
      const phrases = [phraseGN(g, f), ...autres.map((x) => phraseGN(g, x))];
      return qcm(
        `Dans quelle phrase le groupe nominal ${cite(g.t)} est-il ${FCT_GN[f]} ?`,
        phrases[0], phrases.slice(1),
        "C'est toujours le même groupe nominal : seule sa place par rapport au verbe change sa fonction.",
      );
    }
    if (tour < 0.6) {
      const [f1, f2] = melange(["sujet", "cod", "attribut"] as const);
      return qcm(
        `Phrase 1 : ${cite(phraseGN(g, f1))} Phrase 2 : ${cite(phraseGN(g, f2))} Le groupe ${cite(g.t)} est-il un groupe nominal dans les deux phrases ?`,
        NATURE.oui, melange([...NATURE.autres]),
        "La nature d'un groupe (groupe nominal) ne change jamais ; sa fonction dépend de la phrase.",
      );
    }
    // Une phrase, un groupe nominal : quelle est sa fonction ?
    const f = hasard<FonctionGN>(["sujet", "cod", "attribut", "cct"]);
    let ph: string, groupe: string;
    if (f === "cct") {
      const cc = hasard(CC_TEMPS_GN);
      ph = phrase([cc, hasard(PRENOMS).p, hasard(VERBES_REGARD), g.t], 0);
      groupe = maj(cc);
    } else {
      ph = phraseGN(g, f);
      groupe = f === "sujet" ? maj(g.t) : g.t;
    }
    return qcm(
      hasard([
        `Dans ${cite(ph)}, le groupe nominal ${cite(groupe)} est…`,
        `${cite(ph)} Quelle est la fonction du groupe nominal ${cite(groupe)} ?`,
      ]),
      FCT_GN[f], melange(Object.values(FCT_GN).filter((x) => x !== FCT_GN[f])),
      f === "cct"
        ? "Même un groupe nominal peut être complément circonstanciel : il répond à « quand ? » et se déplace."
        : "Regarde la place du groupe : avant le verbe, il est sujet ; après un verbe d'état, attribut ; après un verbe d'action, COD.",
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const p: string[] = [];
    const c = citations(q.text);
    const m = q.text.match(/est-il (sujet du verbe|complément d'objet direct|attribut du sujet) \?$/);
    if (m) {
      const voulu = (Object.keys(FCT_GN) as FonctionGN[]).find((k) => FCT_GN[k] === m[1]);
      const gn = c[0];
      if (fonctionGN(q.correct, gn) !== voulu) p.push(`dans « ${q.correct} », « ${gn} » n'est pas ${m[1]}`);
      for (const w of q.wrongs) {
        const f = fonctionGN(w, gn);
        if (!f || f === voulu) p.push(`le leurre « ${w} » est douteux`);
      }
      return p;
    }
    if (c.length === 3) {
      const [s1, s2, gn] = c;
      const f1 = fonctionGN(s1, gn), f2 = fonctionGN(s2, gn);
      if (!f1 || !f2 || f1 === f2) p.push(`les deux phrases ne donnent pas deux fonctions différentes (${f1}, ${f2})`);
      if (q.correct !== NATURE.oui) p.push("la nature d'un groupe nominal ne change pas");
      return p;
    }
    const [ph, gn] = c;
    const f = fonctionGN(ph, gn);
    if (!f) return [`fonction de « ${gn} » introuvable`];
    if (!(f === "cct" || noyauDe(gn))) p.push(`« ${gn} » n'a pas de nom noyau`);
    if (q.correct !== FCT_GN[f]) p.push(`« ${gn} » est ${FCT_GN[f]}`);
    return p;
  },
};

// ── Épithète ou complément du nom ────────────────────────────────────────────
type Expansion = "epithete" | "cn";
const EXP: Record<Expansion | "noyau" | "det", string> = {
  epithete: "une épithète", cn: "un complément du nom", noyau: "le nom noyau", det: "un déterminant",
};
const PREP_CN = /^(de|d'|du|des|en|au|aux|à)(?=\s|\p{L})/u;
/** La nature d'un mot ou d'un groupe pris dans un groupe nominal. */
function expansionDe(x: string): keyof typeof EXP | null {
  if (PREP_CN.test(x)) return "cn";
  if (FORMES_EPITHETES.has(x)) return "epithete";
  if (FORMES_NOMS.has(x)) return "noyau";
  if (DETERMINANTS.has(bas(x))) return "det";
  return null;
}
const METHODE_EXP: Record<Expansion, string> = {
  epithete: "Une épithète est un adjectif collé au nom, sans préposition ; elle s'accorde avec lui.",
  cn: "Un complément du nom commence par une préposition (de, en, à…) et complète le nom.",
};

const gEpitheteCn = {
  generer(): QuestionFrancais {
    const tour = Math.floor(Math.random() * 4);
    if (tour === 3) {
      const bon = gnEtendu(hasard(["A", "B"] as const));
      const leurres = [gnEtendu("C"), gnEtendu("C"), gnEtendu("C")].map((x) => x.t);
      return qcm(
        hasard(["Quel groupe nominal contient un complément du nom ?", "Dans quel groupe nominal le nom a-t-il un complément du nom ?"]),
        lier(bon.t), leurres.map(lier), METHODE_EXP.cn,
      );
    }
    const g = gnEtendu(hasard(["A", "B"] as const));
    const t = lier(g.t);
    const adj = (g.post ?? g.ante) as string;
    const cn = g.cn as string;
    const cible: Expansion = Math.random() < 0.5 ? "epithete" : "cn";
    if (tour === 2) {
      const p = hasard(PRENOMS.filter((x) => compte(t, x.p) === 0));
      const ph = phrase([p.p, hasard(VERBES_REGARD), g.t]);
      return qcm(
        cible === "cn" ? `Dans ${cite(ph)}, quel est le complément du nom ${cite(g.noyau)} ?` : `Dans ${cite(ph)}, quelle est l'épithète du nom ${cite(g.noyau)} ?`,
        cible === "cn" ? cn : adj,
        cible === "cn" ? melange([adj, g.noyau, p.p]) : melange([cn, g.noyau, p.p]),
        METHODE_EXP[cible],
      );
    }
    const x = cible === "cn" ? cn : adj;
    return qcm(
      tour === 0 ? `Dans le groupe nominal ${cite(t)}, ${cite(x)} est…` : `${cite(t)} Quel est le rôle de ${cite(x)} dans ce groupe ?`,
      EXP[cible], melange([EXP[cible === "cn" ? "epithete" : "cn"], EXP.noyau, hasard(["un attribut du sujet", EXP.det])]),
      METHODE_EXP[cible],
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const p: string[] = [];
    const c = citations(q.text);
    if (!c.length) {
      const aUnCn = (gn: string) => /(?<!\p{L})(de|d'|du|des|en|au|aux|à)(?=\s|\p{L})/u.test(gn.replace(/^\S+ /, ""));
      if (!aUnCn(q.correct)) p.push(`« ${q.correct} » n'a pas de complément du nom`);
      for (const w of q.wrongs) if (aUnCn(w)) p.push(`le leurre « ${w} » a aussi un complément du nom`);
      return p;
    }
    const demande = q.text.match(/quel est le complément du nom|quelle est l'épithète du nom/);
    if (demande) {
      const [ph, nom] = c;
      if (!FORMES_NOMS.has(nom) || compte(ph, nom) !== 1) p.push(`« ${nom} » n'est pas un nom de la phrase`);
      const voulu: Expansion = demande[0].includes("complément") ? "cn" : "epithete";
      for (const o of [q.correct, ...q.wrongs]) if (compte(ph, o) !== 1) p.push(`« ${o} » n'est pas une seule fois dans la phrase`);
      if (expansionDe(q.correct) !== voulu) p.push(`« ${q.correct} » n'est pas ${EXP[voulu]}`);
      for (const w of q.wrongs) if (expansionDe(w) === voulu) p.push(`le leurre « ${w} » est aussi ${EXP[voulu]}`);
      // L'épithète s'accorde avec le nom noyau.
      const nomT = NOMS.find((n) => n.s === nom || n.p === nom);
      const adjs = [q.correct, ...q.wrongs].filter((o) => expansionDe(o) === "epithete");
      if (nomT) for (const a of adjs) {
        const k = (nomT.g === "m" ? 0 : 1) + (nomT.p === nom ? 2 : 0);
        if (!Object.values(EPITHETES).some((f) => f[k] === a)) p.push(`« ${a} » ne s'accorde pas avec « ${nom} »`);
      }
      return p;
    }
    const [gn, x] = c;
    if (compte(gn, x) !== 1) p.push(`« ${x} » n'est pas une seule fois dans le groupe`);
    const e = expansionDe(x);
    if (!e) return [...p, `nature de « ${x} » introuvable`];
    if (q.correct !== EXP[e]) p.push(`« ${x} » est ${EXP[e]}`);
    return p;
  },
};

// ── Participe passé : avec être, avec avoir (sans COD placé avant) ───────────
/** Verbes conjugués avec être : participe au masculin singulier, et une suite naturelle. */
const PP_ETRE: [string, string[]][] = [
  ["allé", ["à la piscine", "au marché", "chez le dentiste"]], ["arrivé", ["en retard", "à l'heure", "les premiers"]],
  ["parti", ["en vacances", "très tôt", "en classe de neige"]], ["tombé", ["dans la boue", "dans l'escalier"]],
  ["resté", ["à la maison", "dans la cour"]], ["rentré", ["tard", "à la maison"]], ["sorti", ["dans le jardin", "sous la pluie"]],
  ["monté", ["au grenier", "en haut de la tour"]], ["descendu", ["à la cave", "au bord du lac"]],
  ["venu", ["à la fête", "au match"]], ["revenu", ["de la plage", "du marché"]],
];
const SUJETS_GN: [string, "m" | "f", "s" | "p"][] = [
  ["les filles", "f", "p"], ["les garçons", "m", "p"], ["mes cousines", "f", "p"], ["mes cousins", "m", "p"],
  ["ma tante", "f", "s"], ["mon oncle", "m", "s"], ["les enfants", "m", "p"], ["nos voisines", "f", "p"], ["notre voisin", "m", "s"],
];
const ACCORD = (g: "m" | "f", n: "s" | "p") => (g === "f" ? "e" : "") + (n === "p" ? "s" : "");
/** Genre et nombre d'un sujet : prénoms, « Léa et Noah », ou groupe de la table. */
function genreNombreSujet(s: string): { g: "m" | "f"; n: "s" | "p" } | null {
  const parts = s.split(" et ");
  if (parts.length > 1) {
    const gs = parts.map((x) => genreDe(x) ?? SUJETS_GN.find((y) => y[0] === bas(x))?.[1]);
    return gs.some((x) => !x) ? null : { g: gs.includes("m") ? "m" : "f", n: "p" };
  }
  const g = genreDe(s);
  if (g) return { g, n: "s" };
  const t = SUJETS_GN.find((y) => y[0] === bas(s));
  return t ? { g: t[1], n: t[2] } : null;
}
type PhrasePP = { sujet: string; aux: string; pp: string; suite: string; tete: string | null; etre: boolean; base: string };
function phrasePP(): PhrasePP {
  const r = Math.random();
  const [p1, p2] = melange([...PRENOMS]);
  const sujet = r < 0.4 ? p1.p : r < 0.7 ? `${p1.p} et ${p2.p}` : hasard(SUJETS_GN)[0];
  const gn = genreNombreSujet(sujet) as { g: "m" | "f"; n: "s" | "p" };
  const tete = Math.random() < 0.35 ? hasard(["hier", "ce matin", "samedi dernier", "pendant les vacances"]) : null;
  if (Math.random() < 0.65) {
    const [base, suites] = hasard(PP_ETRE);
    return { sujet, aux: gn.n === "p" ? "sont" : "est", pp: base + ACCORD(gn.g, gn.n), suite: hasard(suites), tete, etre: true, base };
  }
  const act = hasard(SCENES.flatMap((s) => s.actions));
  const cod = gn.n === "p" ? possessifPluriel(act.cod.t) : act.cod.t;
  return { sujet, aux: gn.n === "p" ? "ont" : "a", pp: act.pp, suite: cod, tete, etre: false, base: act.pp };
}
const textePP = (f: PhrasePP, pp: string) => phrase([...(f.tete ? [f.tete] : []), f.sujet, f.aux, pp, f.suite], f.tete ? 0 : -1);
const formesPP = (base: string) => [base, `${base}e`, `${base}s`, `${base}es`].map((x) => x.replace(/ss$/, "s"));
const PP_AVOIR = new Set(SCENES.flatMap((s) => s.actions.map((x) => x.pp)));

/** L'accord attendu, refait sur la phrase : auxiliaire, sujet, participe. */
function accordAttendu(ph: string): { forme: string; lu: string } | string {
  const s = ph.replace(/\.$/, "").replace(/^[^,]*, /, "");
  const m = s.match(/^(.+?) (est|sont|a|ont) (\S+?)(?:___)? (.+)$/u);
  if (!m) return "phrase illisible";
  const [, sujet, aux, lu] = m;
  const gn = genreNombreSujet(sujet);
  if (!gn) return `sujet « ${sujet} » inconnu`;
  if ((aux === "sont" || aux === "ont") !== (gn.n === "p")) return `l'auxiliaire « ${aux} » ne s'accorde pas avec « ${sujet} »`;
  if (/(?<!\p{L})(l'|la|le|les)$/u.test(sujet)) return "COD placé avant l'auxiliaire : hors programme";
  if (aux === "est" || aux === "sont") {
    const base = PP_ETRE.map((x) => x[0]).find((b) => formesPP(b).includes(lu));
    if (!base) return `participe « ${lu} » inconnu avec être`;
    return { forme: base + ACCORD(gn.g, gn.n), lu };
  }
  if (!PP_AVOIR.has(lu.replace(/(e|s|es)$/, "")) && !PP_AVOIR.has(lu)) return `participe « ${lu} » inconnu avec avoir`;
  const base = [...PP_AVOIR].find((b) => formesPP(b).includes(lu)) as string;
  return { forme: base, lu };
}

const gParticipePasse = {
  generer(): QuestionFrancais {
    const f = phrasePP();
    const formes = formesPP(f.base);
    const leurres = formes.filter((x) => x !== f.pp);
    const methode = f.etre
      ? "Avec l'auxiliaire être, le participe passé s'accorde avec le sujet, comme un adjectif."
      : "Avec l'auxiliaire avoir, le participe passé ne s'accorde pas avec le sujet.";
    if (Math.random() < 0.6) {
      const trou = textePP(f, `${f.base}___`);
      return qcm(
        hasard([`Complète : ${cite(trou)}`, `Choisis la bonne orthographe : ${cite(trou)}`, `${cite(trou)} Quel participe passé faut-il écrire ?`]),
        f.pp, melange(leurres), methode,
      );
    }
    return qcm(
      hasard(["Quelle phrase est bien accordée ?", "Dans quelle phrase le participe passé est-il bien écrit ?"]),
      textePP(f, f.pp), melange(leurres).map((x) => textePP(f, x)), methode,
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const p: string[] = [];
    const c = citations(q.text);
    if (c.length) {
      const a = accordAttendu(c[0]);
      if (typeof a === "string") return [a];
      if (q.correct !== a.forme) p.push(`il faut « ${a.forme} »`);
      if (q.wrongs.includes(a.forme)) p.push("un leurre est la bonne forme");
      return p;
    }
    const a = accordAttendu(q.correct);
    if (typeof a === "string") return [a];
    if (a.lu !== a.forme) p.push(`« ${q.correct} » est mal accordée (« ${a.forme} »)`);
    for (const w of q.wrongs) {
      const b = accordAttendu(w);
      if (typeof b === "string" || b.lu === b.forme) p.push(`le leurre « ${w} » est douteux`);
    }
    return p;
  },
};

// ── La phrase complexe : propositions, liens, conjonctions ───────────────────
type Lien = "jux" | "coord" | "sub";
const remplir = (t: string, p: Prenom) =>
  t.replace("{P}", p.p).replace(/\{il\}/g, p.g === "m" ? "il" : "elle").replace("{e}", p.g === "f" ? "e" : "");
const COORD = ["mais", "ou", "et", "donc", "or", "ni", "car"];
const SUBORD = ["quand", "lorsque", "parce que", "puisque", "alors que", "dès que", "pendant que", "si", "comme"];
const RE_SUB = /(?<!\p{L})(quand|lorsqu(?:e|')|parce qu(?:e|')|puisqu(?:e|')|alors qu(?:e|')|dès qu(?:e|')|pendant qu(?:e|'))/iu;
const RE_COORD = /(?<!\p{L})(mais|ou|et|donc|or|ni|car)(?!\p{L})/iu;
/** Nombre de verbes conjugués d'une phrase, recompté avec la liste écrite à la main. */
const VERBES_COMPTES = new Set([...VERBES_CONJUGUES_COMPLEXE, ...VERBES_CONJ_ACTIONS]);
const nbVerbes = (t: string) => (t.match(/\p{L}+/gu) ?? []).filter((m) => VERBES_COMPTES.has(bas(m))).length;
/** Le lien entre les propositions, retrouvé sur la phrase (null si deux sortes à la fois). */
function lienDe(t: string): Lien | null {
  const s = RE_SUB.test(t), c = RE_COORD.test(t);
  if (s && c) return null;
  if (s) return "sub";
  if (c) return "coord";
  return /[,;:]/.test(t) ? "jux" : null;
}

const cataphore = (t: string) => /^(Il|Elle) (?!pleut|fait)/u.test(t) && PRENOMS.some((x) => compte(t, x.p) > 0);
type Paire = { a: string; b: string; sorte: "cause" | "temps" | "opposition"; alorsQue: boolean };
function tirerPaire(): Paire {
  const p = hasard(PRENOMS);
  const r = Math.random();
  if (r < 0.4) {
    const [a, b] = hasard(PAIRES_CAUSE);
    return { a: remplir(a, p), b: remplir(b, p), sorte: "cause", alorsQue: false };
  }
  if (r < 0.75) {
    const [a, b] = hasard(PAIRES_TEMPS);
    return { a: remplir(a, p), b: remplir(b, p), sorte: "temps", alorsQue: false };
  }
  const [a, b, aq] = hasard(PAIRES_OPPOSITION);
  return { a: remplir(a, p), b: remplir(b, p), sorte: "opposition", alorsQue: aq };
}
const PRONOM_PERSONNEL = /(?<!\p{L})(il|elle)(?!\p{L})/u;
/** Relie deux propositions ; rend la phrase et le mot de liaison (null pour la juxtaposition). */
function relier(pr: Paire, lien: Lien): { texte: string; mot: string | null } | null {
  const { a, b } = pr;
  // Pas de « il » qui annonce un prénom nommé plus loin : la proposition qui le contient vient après.
  const bAvant = !(PRONOM_PERSONNEL.test(b) && PRENOMS.some((x) => compte(a, x.p) > 0));
  const formes: [string, string | null][] = [];
  if (pr.sorte === "cause") {
    if (lien === "sub") formes.push([`${a} parce que ${b}`, "parce que"], [`${a} puisque ${b}`, "puisque"]);
    if (lien === "coord") formes.push([`${a}, car ${b}`, "car"], ...(bAvant && !b.startsWith("il ") ? [[`${b}, donc ${a}`, "donc"] as [string, string]] : []));
    if (lien === "jux") formes.push([`${a} : ${b}`, null], ...(bAvant && !b.startsWith("il ") ? [[`${b}, ${a}`, null] as [string, null]] : []));
  } else if (pr.sorte === "temps") {
    if (lien === "sub") formes.push([`quand ${a}, ${b}`, "quand"], [`lorsque ${a}, ${b}`, "lorsque"], ...(bAvant && !PRONOM_PERSONNEL.test(b) ? [[`${b} dès que ${a}`, "dès que"] as [string, string]] : []));
    if (lien === "coord") formes.push([`${a} et ${b}`, "et"]);
    if (lien === "jux") formes.push([`${a}, ${b}`, null], [`${a} ; ${b}`, null]);
  } else {
    if (lien === "sub" && pr.alorsQue) formes.push([`${a} alors que ${b}`, "alors que"]);
    if (lien === "coord") formes.push([`${a}, mais ${b}`, "mais"]);
    if (lien === "jux") formes.push([`${a} ; ${b}`, null]);
  }
  if (!formes.length) return null;
  const [t, mot] = hasard(formes);
  return { texte: phrase([t]), mot };
}
function phraseRelieeAuHasard(lien?: Lien) {
  for (;;) {
    const pr = tirerPaire();
    const l = lien ?? hasard<Lien>(["jux", "coord", "sub"]);
    const r = relier(pr, l);
    if (r) return { ...r, lien: l, paire: pr };
  }
}
/** Une phrase à une, deux ou trois propositions. */
function phraseAPropositions(n: 1 | 2 | 3): string {
  const p = hasard(PRENOMS);
  if (n === 2) return phraseRelieeAuHasard().texte;
  if (n === 3) {
    const [a, b, c] = hasard(SUITES_TROIS).map((x) => remplir(x, p));
    return phrase([Math.random() < 0.5 ? `${a}, ${b} et ${c}` : `${a}, ${b}, ${c}`]);
  }
  if (Math.random() < 0.4) return phrase([remplir(hasard(SIMPLES_INFINITIF), p)]);
  const scene = hasard(SCENES);
  const act = hasard(scene.actions);
  return phrase([p.p, act.v, act.cod.t, hasard(scene.lieux)]);
}
const NOMBRES = ["une", "deux", "trois", "quatre"];
const METHODE_PROPOSITION = "Compte les verbes conjugués : une proposition par verbe conjugué. Un infinitif ne compte pas.";

const gComplexeProposition = {
  generer(): QuestionFrancais {
    const n = hasard<1 | 2 | 3>([1, 2, 2, 3]);
    const tour = Math.floor(Math.random() * 4);
    if (tour === 3) {
      const simple = Math.random() < 0.5;
      const bonne = phraseAPropositions(simple ? 1 : hasard<2 | 3>([2, 3]));
      const leurres = [0, 1, 2].map(() => phraseAPropositions(simple ? hasard<2 | 3>([2, 2, 3]) : 1));
      return qcm(simple ? "Quelle phrase est une phrase simple ?" : "Quelle phrase est une phrase complexe ?", bonne, leurres, METHODE_PROPOSITION);
    }
    const t = phraseAPropositions(n);
    if (tour === 2) {
      const simple = n === 1;
      return qcm(
        `${cite(t)} Cette phrase est…`,
        simple ? "une phrase simple : une seule proposition" : "une phrase complexe : plusieurs propositions",
        [simple ? "une phrase complexe : plusieurs propositions" : "une phrase simple : une seule proposition", "une phrase sans verbe conjugué"],
        METHODE_PROPOSITION,
      );
    }
    return qcm(
      tour === 0 ? `${cite(t)} Combien de propositions compte cette phrase ?` : `Dans ${cite(t)}, combien y a-t-il de verbes conjugués ?`,
      NOMBRES[n - 1], melange(NOMBRES.filter((x) => x !== NOMBRES[n - 1])), METHODE_PROPOSITION,
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const p: string[] = [];
    const c = citations(q.text);
    if (!c.length) {
      const simple = q.text.includes("simple");
      const ok = (t: string) => (simple ? nbVerbes(t) === 1 : nbVerbes(t) >= 2);
      if (!ok(q.correct)) p.push(`« ${q.correct} » : ${nbVerbes(q.correct)} verbe(s) conjugué(s)`);
      for (const w of q.wrongs) if (ok(w) || nbVerbes(w) === 0) p.push(`le leurre « ${w} » est douteux`);
      return p;
    }
    const n = nbVerbes(c[0]);
    if (n < 1 || n > 3) return [`${n} verbes conjugués comptés dans « ${c[0]} »`];
    if (q.text.includes("Cette phrase est")) {
      const attendu = n === 1 ? "une phrase simple : une seule proposition" : "une phrase complexe : plusieurs propositions";
      if (q.correct !== attendu) p.push(`${n} verbe(s) conjugué(s) : la réponse est « ${attendu} »`);
      return p;
    }
    if (q.correct !== NOMBRES[n - 1]) p.push(`${n} verbe(s) conjugué(s) : la réponse est « ${NOMBRES[n - 1]} »`);
    return p;
  },
};

const LIENS: Record<Lien, string> = { jux: "par juxtaposition", coord: "par coordination", sub: "par subordination" };
const METHODE_LIEN = "Regarde ce qui relie les propositions : une ponctuation seule (juxtaposition), et, mais, car, donc… (coordination), quand, parce que… (subordination).";
const gComplexeArticulation = {
  generer(): QuestionFrancais {
    const tour = Math.floor(Math.random() * 3);
    if (tour === 2) {
      // La même paire, reliée de trois façons : une seule est demandée.
      for (;;) {
        const pr = tirerPaire();
        const formes = (["jux", "coord", "sub"] as Lien[]).map((l) => ({ l, r: relier(pr, l) }));
        if (formes.some((f) => !f.r)) continue;
        const voulu = hasard(formes);
        return qcm(
          `Quelle phrase relie ses deux propositions ${LIENS[voulu.l]} ?`,
          (voulu.r as { texte: string }).texte,
          formes.filter((f) => f !== voulu).map((f) => (f.r as { texte: string }).texte),
          METHODE_LIEN,
        );
      }
    }
    const f = phraseRelieeAuHasard();
    return qcm(
      tour === 0 ? `${cite(f.texte)} Comment les deux propositions sont-elles reliées ?` : `Dans ${cite(f.texte)}, les propositions sont reliées…`,
      LIENS[f.lien], [...melange(Object.values(LIENS).filter((x) => x !== LIENS[f.lien])), "elles ne sont pas reliées : il n'y a qu'une proposition"],
      METHODE_LIEN,
    );
  },
  corriger(q: QuestionFrancais): string[] {
    const p: string[] = [];
    const c = citations(q.text);
    // Un « Elle » en tête qui annonce un prénom nommé plus loin : phrase ambiguë, refusée.
    const verifier = (t: string): Lien | null => (nbVerbes(t) === 2 && !cataphore(t) ? lienDe(t) : null);
    if (!c.length) {
      const voulu = (Object.keys(LIENS) as Lien[]).find((k) => q.text.includes(LIENS[k]));
      if (verifier(q.correct) !== voulu) p.push(`« ${q.correct} » n'est pas reliée ${voulu && LIENS[voulu]}`);
      for (const w of q.wrongs) if (!verifier(w) || verifier(w) === voulu) p.push(`le leurre « ${w} » est douteux`);
      return p;
    }
    const l = verifier(c[0]);
    if (!l) return [`lien introuvable dans « ${c[0]} » (${nbVerbes(c[0])} verbes)`];
    if (q.correct !== LIENS[l]) p.push(`les propositions sont reliées ${LIENS[l]}`);
    return p;
  },
};

const NATURES_CONJ = {
  coord: "une conjonction de coordination", sub: "une conjonction de subordination", prep: "une préposition", adv: "un adverbe",
};
const PREPOSITIONS = ["dans", "vers", "de", "du", "à", "au", "sans", "sur"];
/** Le bon mot de liaison pour une paire, selon le sens et la sorte de lien. */
const CONJ_PAR_SENS: Record<Paire["sorte"], { coord: string[]; sub: string[] }> = {
  cause: { coord: ["car"], sub: ["parce que", "puisque"] },
  temps: { coord: ["et"], sub: ["quand", "lorsque", "dès que"] },
  opposition: { coord: ["mais"], sub: ["alors que"] },
};
const METHODE_CONJ = "Coordination (mais, ou, et, donc, or, ni, car) : les propositions restent à égalité. Subordination (quand, parce que, lorsque…) : l'une dépend de l'autre.";

const gComplexeConjonctions = {
  generer(): QuestionFrancais {
    const tour = Math.floor(Math.random() * 3);
    if (tour === 2) {
      // Choisir une conjonction de la bonne sorte pour relier deux propositions données.
      for (;;) {
        const pr = tirerPaire();
        const sorte = Math.random() < 0.5 ? ("coord" as const) : ("sub" as const);
        if (sorte === "sub" && pr.sorte === "opposition" && !pr.alorsQue) continue;
        const bonnes = CONJ_PAR_SENS[pr.sorte][sorte];
        const autre = sorte === "coord" ? "sub" : "coord";
        const leurres = melange([...CONJ_PAR_SENS[pr.sorte][autre], ...(autre === "coord" ? ["donc", "mais", "car", "et"] : ["quand", "parce que", "lorsque"])]);
        return qcm(
          `Pour relier ${cite(lier(maj(pr.a)))} et ${cite(lier(pr.b))}, quelle conjonction de ${sorte === "coord" ? "coordination" : "subordination"} peut-on choisir ?`,
          hasard(bonnes), leurres, METHODE_CONJ,
        );
      }
    }
    for (;;) {
      const f = phraseRelieeAuHasard(Math.random() < 0.5 ? "coord" : "sub");
      if (!f.mot || compte(f.texte, f.mot) !== 1) continue; // « parce qu'il » : on cite un mot écrit tel quel
      const sorte = f.lien === "coord" ? "coord" : "sub";
      if (tour === 0) {
        const mot = f.texte.startsWith(maj(f.mot)) ? maj(f.mot) : f.mot; // cité tel qu'il est écrit
        return qcm(
          hasard([`Dans ${cite(f.texte)}, le mot ${cite(mot)} est…`, `${cite(f.texte)} Quelle est la nature de ${cite(mot)} ?`]),
          NATURES_CONJ[sorte], melange(Object.values(NATURES_CONJ).filter((x) => x !== NATURES_CONJ[sorte])), METHODE_CONJ,
        );
      }
      const mots = (f.texte.match(/\p{L}+/gu) ?? []).filter((m) => !COORD.includes(bas(m)) && !SUBORD.some((s) => s.split(" ").includes(bas(m))));
      const preps = mots.filter((m) => PREPOSITIONS.includes(m));
      const verbes = mots.filter((m) => VERBES_COMPTES.has(bas(m)));
      const leurres = [...new Set([...preps.slice(0, 1), ...melange(verbes).slice(0, 1), ...melange(mots.filter((m) => m.length > 3))])].slice(0, 3);
      if (leurres.length < 3) continue;
      return qcm(
        `Dans ${cite(f.texte)}, quel mot est une conjonction de ${sorte === "coord" ? "coordination" : "subordination"} ?`,
        f.mot, melange(leurres), METHODE_CONJ,
      );
    }
  },
  corriger(q: QuestionFrancais): string[] {
    const p: string[] = [];
    const c = citations(q.text);
    const sorteDeMot = (m: string) => (COORD.includes(bas(m)) ? "coord" : SUBORD.includes(bas(m)) ? "sub" : null);
    const demande = q.text.match(/conjonction de (coordination|subordination)/);
    if (demande) {
      const voulu = demande[1] === "coordination" ? "coord" : "sub";
      if (sorteDeMot(q.correct) !== voulu) p.push(`« ${q.correct} » n'est pas une conjonction de ${demande[1]}`);
      for (const w of q.wrongs) if (sorteDeMot(w) === voulu) p.push(`le leurre « ${w} » est aussi une conjonction de ${demande[1]}`);
      if (c.length === 1) {
        // Les mots proposés sont pris dans la phrase, qui a deux propositions.
        if (nbVerbes(c[0]) !== 2 || cataphore(c[0])) p.push(`« ${c[0]} » n'a pas deux propositions claires`);
        for (const o of [q.correct, ...q.wrongs]) if (compte(c[0], o) < 1) p.push(`« ${o} » n'est pas dans la phrase`);
      }
      return p;
    }
    const [ph, mot] = c;
    if (compte(ph, mot) !== 1) p.push(`« ${mot} » n'est pas une seule fois dans la phrase`);
    if (nbVerbes(ph) !== 2 || cataphore(ph)) p.push(`« ${ph} » n'a pas deux propositions claires`);
    const s = sorteDeMot(mot);
    if (!s) return [...p, `« ${mot} » n'est pas une conjonction connue`];
    if (q.correct !== NATURES_CONJ[s]) p.push(`« ${mot} » est ${NATURES_CONJ[s]}`);
    return p;
  },
};

export const GENERATEURS: GenerateursFrancais = {
  "6e_complexe_proposition": gComplexeProposition,
  "6e_complexe_conjonctions": gComplexeConjonctions,
  "6e_complexe_articulation": gComplexeArticulation,
  "6e_orth_participe_passe": gParticipePasse,
  "6e_gram_gn": gGn,
  "6e_gram_gn_toute_fonction": gGnTouteFonction,
  "6e_gram_epithete_cn": gEpitheteCn,
  "6e_gram_pronoms": gPronoms,
  "6e_gram_pronoms_defi": gPronomsDefi,
  "6e_gram_pronom_antecedent": gPronomAntecedent,
  "6e_gram_pronoms_fonction": gPronomsFonction,
  "6e_gram_cc_sortes": gCcSortes,
  "6e_gram_cod_coi": gCodCoi,
  "6e_gram_attribut_cod": gAttributCod,
  "6e_gram_manipulations": gManipulations,
};
