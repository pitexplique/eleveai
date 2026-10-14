// Algorithmique (5e) — deux notions depuis le 04/08/2026 : algo_programmation
// (lire et exécuter un programme) et algo_construire (l'écrire, le modifier).
// ⚠️ C'est le microId de chaque item qui fait foi, PAS le commentaire de
// section au-dessus : les items déplacés sont restés à leur place dans le
// fichier pour garder leur id, et donc l'historique des réponses des élèves.

import type { TutorBankItemV4, ScratchBlockData, DifficultyLevel } from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de as deNom, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function scratchCanvas(title: string, blocks: any[], description?: string) {
  return {
    kind: "scratch" as const,
    title,
    description,
    blocks,
  };
}

function expl(def: string, meth: string, exec: string, concl: string) {
  return (
    `Définition : ${def}\n\n` +
    `Méthode : ${meth}\n\n` +
    `Exécution : ${exec}\n\n` +
    `Conclusion : ${concl}`
  );
}

/* ===========================================================================
   ⛔⛔ 13/10/2026 — « DES QUESTIONS REVIENNENT ». Mesuré avant : 4 à 13
   squelettes par micro, jusqu'à 18 répétitions sur 20. Les gabarits changeaient
   les nombres, jamais la PHRASE ni la FORME du programme.

   ⭐ Chaque gabarit tire désormais un PROGRAMME (écrit dans le texte en
   pseudo-Scratch, entre « »), une SITUATION, un PRÉNOM et une TOURNURE. Le petit
   interpréteur ci-dessous écrit le programme, fabrique les blocs du canvas et
   l'EXÉCUTE : la réponse attendue et l'explication viennent de cette
   exécution. Le correcteur (correcteurs/algorithmique.ts) relit le texte et
   réexécute le programme avec son propre interpréteur.

   Écriture : « mettre score à 3 » ; « ajouter 2 à score » ;
   « mettre x à 2 × x + 1 » ; « répéter 4 fois [avancer de 20 pas ; tourner de 90°] » ;
   « si score > 10 alors [dire “Bravo”] sinon [dire “Rejoue”] » ;
   « demander “Quel âge as-tu ?” et attendre » ; « dire score ».
   Les crochets figurent la « bouche » du bloc Scratch.
=========================================================================== */

const entre = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));

/** Retire tant que le tirage ne convient pas (valeur négative, leurres confondus…). */
function tirer<T>(f: () => T | null): T {
  for (let i = 0; i < 500; i++) {
    const r = f();
    if (r) return r;
  }
  throw new Error("algorithmique 5e : tirage impossible");
}

/** La bonne réponse + des leurres DISTINCTS (n propositions en tout), ou null. */
function propositions(bonne: string, leurres: readonly string[], n = 4): string[] | null {
  const d = Array.from(new Set(leurres)).filter((w) => w !== bonne);
  if (d.length < n - 1) return null;
  return shuffle([bonne, ...shuffle(d).slice(0, n - 1)]);
}

/** « il » ou « elle ». */
const pron = (p: Prenom) => (p.f ? "elle" : "il");

type Op = "+" | "−" | "×";
type Expr = number | string | { a: Expr; op: Op; b: Expr };
const E = (a: Expr, op: Op, b: Expr): Expr => ({ a, op, b });
const prio = (e: Expr) => (typeof e === "object" ? (e.op === "×" ? 2 : 1) : 3);

/** L'expression écrite, avec les parenthèses nécessaires ; `sub` remplace les variables par leur valeur. */
function exprTxt(e: Expr, sub?: Record<string, number>): string {
  if (typeof e === "number") return String(e);
  if (typeof e === "string") return sub && e in sub ? String(sub[e]) : e;
  const p = e.op === "×" ? 2 : 1;
  const g = prio(e.a) < p ? `(${exprTxt(e.a, sub)})` : exprTxt(e.a, sub);
  const d = prio(e.b) < p || (e.op === "−" && prio(e.b) === 1) ? `(${exprTxt(e.b, sub)})` : exprTxt(e.b, sub);
  return `${g} ${e.op} ${d}`;
}

function evalE(e: Expr, env: Record<string, number>): number {
  if (typeof e === "number") return e;
  if (typeof e === "string") {
    if (!(e in env)) throw new Error(`variable ${e} sans valeur`);
    return env[e];
  }
  const a = evalE(e.a, env);
  const b = evalE(e.b, env);
  return e.op === "+" ? a + b : e.op === "−" ? a - b : a * b;
}

type Cmp = ">" | "<" | "=";
type Cond = { v: string; op: Cmp; s: number } | { v: string; pair: boolean } | { v: string; mult: number };

function condTxt(c: Cond): string {
  if ("op" in c) return `${c.v} ${c.op} ${c.s}`;
  if ("pair" in c) return `${c.v} est ${c.pair ? "pair" : "impair"}`;
  return `${c.v} est un multiple de ${c.mult}`;
}

function vraie(c: Cond, env: Record<string, number>): boolean {
  const x = env[c.v];
  if (x === undefined) throw new Error(`variable ${c.v} sans valeur`);
  if ("op" in c) return c.op === ">" ? x > c.s : c.op === "<" ? x < c.s : x === c.s;
  if ("pair" in c) return (x % 2 === 0) === c.pair;
  return x % c.mult === 0;
}

type Ins =
  | { k: "set"; v: string; e: Expr }
  | { k: "add"; v: string; n: number }
  | { k: "rep"; n: number; corps: Ins[] }
  | { k: "si"; c: Cond; alors: Ins[]; sinon?: Ins[] }
  | { k: "dire"; t: string }
  | { k: "direv"; v: string }
  | { k: "avancer"; n: number }
  | { k: "tourner"; n: number }
  | { k: "demander"; t: string }
  | { k: "stylo" };

function insTxt(i: Ins): string {
  switch (i.k) {
    case "set":
      return `mettre ${i.v} à ${exprTxt(i.e)}`;
    case "add":
      return `ajouter ${i.n} à ${i.v}`;
    case "rep":
      return `répéter ${i.n} fois [${i.corps.map(insTxt).join(" ; ")}]`;
    case "si":
      return (
        `si ${condTxt(i.c)} alors [${i.alors.map(insTxt).join(" ; ")}]` +
        (i.sinon ? ` sinon [${i.sinon.map(insTxt).join(" ; ")}]` : "")
      );
    case "dire":
      return `dire “${i.t}”`;
    case "direv":
      return `dire ${i.v}`;
    case "avancer":
      return `avancer de ${i.n} pas`;
    case "tourner":
      return `tourner de ${i.n}°`;
    case "demander":
      return `demander “${i.t}” et attendre`;
    case "stylo":
      return "stylo en position d’écriture";
  }
}

const progTxt = (p: Ins[]) => p.map((i) => `« ${insTxt(i)} »`).join(" ; ");

function blocs(p: Ins[]): ScratchBlockData[] {
  return p.map((i): ScratchBlockData => {
    switch (i.k) {
      case "set":
        return { type: "set_variable", variable: i.v, value: typeof i.e === "number" ? i.e : exprTxt(i.e) };
      case "add":
        return { type: "change_variable", variable: i.v, value: i.n };
      case "rep":
        return { type: "repeat", times: i.n, children: blocs(i.corps) };
      case "si":
        return i.sinon
          ? { type: "if_else", condition: condTxt(i.c), children: blocs(i.alors), elseChildren: blocs(i.sinon) }
          : { type: "if", condition: condTxt(i.c), children: blocs(i.alors) };
      case "dire":
        return { type: "say", text: i.t };
      case "direv":
        return { type: "say", text: i.v };
      case "avancer":
        return { type: "move", value: i.n };
      case "tourner":
        return { type: "turn", value: i.n };
      case "demander":
        return { type: "ask", text: i.t };
      case "stylo":
        return { type: "pen", text: "stylo en position d’écriture" };
    }
  });
}

/** Le canvas : les valeurs données dans le texte (« x vaut 4 »), puis le programme du texte. */
function canvasProg(titre: string, p: Ins[], donnees: Record<string, number> = {}) {
  return scratchCanvas(titre, [
    { type: "event" },
    ...Object.entries(donnees).map(([v, n]) => ({ type: "set_variable", variable: v, value: n })),
    ...blocs(p),
  ]);
}

type Etat = {
  env: Record<string, number>;
  dits: string[];
  dist: number;
  angle: number;
  trace: string[];
  min: number;
  max: number;
};

function varsModifiees(p: Ins[], acc: string[] = []): string[] {
  for (const i of p) {
    if ((i.k === "set" || i.k === "add") && !acc.includes(i.v)) acc.push(i.v);
    if (i.k === "rep") varsModifiees(i.corps, acc);
    if (i.k === "si") {
      varsModifiees(i.alors, acc);
      if (i.sinon) varsModifiees(i.sinon, acc);
    }
  }
  return acc;
}

const resserrer = (l: string[]) => (l.length > 5 ? [l[0], l[1], "…", l[l.length - 1]] : l);

/** Exécute le programme. `reponses` : ce que l'utilisateur tape, dans l'ordre des « demander ». */
function executer(p: Ins[], env0: Record<string, number> = {}, reponses: number[] = []): Etat {
  const st: Etat = { env: {}, dits: [], dist: 0, angle: 0, trace: [], min: Infinity, max: -Infinity };
  const lues = [...reponses];
  const noter = (v: string, n: number) => {
    st.env[v] = n;
    st.min = Math.min(st.min, n);
    st.max = Math.max(st.max, n);
  };
  for (const [v, n] of Object.entries(env0)) noter(v, n);
  const run = (l: Ins[], muet: boolean) => {
    for (const i of l) {
      switch (i.k) {
        case "set": {
          const r = evalE(i.e, st.env);
          const t =
            typeof i.e === "number" ? `${r}`
            : typeof i.e === "string" ? `de ${i.e}, soit ${r}`
            : `${exprTxt(i.e, st.env)} = ${r}`;
          noter(i.v, r);
          if (!muet) st.trace.push(`${i.v} prend la valeur ${t}`);
          break;
        }
        case "add": {
          const o = st.env[i.v];
          if (o === undefined) throw new Error(`variable ${i.v} sans valeur`);
          noter(i.v, o + i.n);
          if (!muet) st.trace.push(`${i.v} devient ${o} + ${i.n} = ${o + i.n}`);
          break;
        }
        case "rep": {
          const lignes: string[] = [];
          const vs = varsModifiees(i.corps);
          for (let t = 1; t <= i.n; t++) {
            const d0 = st.dits.length;
            run(i.corps, true);
            let ligne = `tour ${t} : ` + (vs.length ? vs.map((v) => `${v} = ${st.env[v]}`).join(", ") : `${st.dist} pas en tout`);
            const dits = st.dits.slice(d0);
            if (dits.length) ligne += ` (le lutin dit ${dits.map((d) => `“${d}”`).join(", ")})`;
            lignes.push(ligne);
          }
          if (!muet) st.trace.push(...resserrer(lignes));
          break;
        }
        case "si": {
          const ok = vraie(i.c, st.env);
          if (!muet)
            st.trace.push(
              `test « ${condTxt(i.c)} » : ${ok ? "vrai" : "faux"}, ` +
                (ok ? "on fait le « alors »" : i.sinon ? "on fait le « sinon »" : "on saute le bloc")
            );
          run(ok ? i.alors : i.sinon ?? [], muet);
          break;
        }
        case "dire":
          st.dits.push(i.t);
          if (!muet) st.trace.push(`le lutin dit “${i.t}”`);
          break;
        case "direv": {
          const x = st.env[i.v];
          if (x === undefined) throw new Error(`variable ${i.v} sans valeur`);
          st.dits.push(String(x));
          if (!muet) st.trace.push(`le lutin dit ${x}`);
          break;
        }
        case "avancer":
          st.dist += i.n;
          if (!muet) st.trace.push(`le lutin avance de ${i.n} pas`);
          break;
        case "tourner":
          st.angle += i.n;
          if (!muet) st.trace.push(`le lutin tourne de ${i.n}°`);
          break;
        case "demander": {
          const r = lues.shift();
          if (r === undefined) throw new Error("pas de réponse pour « demander »");
          noter("réponse", r);
          if (!muet) st.trace.push(`l’utilisateur répond ${r} : réponse vaut ${r}`);
          break;
        }
        case "stylo":
          break;
      }
    }
  };
  run(p, false);
  return st;
}

/** Valeurs plausibles en 5e ici : entières, positives, au plus 999. */
const plausible = (st: Etat) => st.max <= 999 && st.min >= 0;

/** L'explication : la trace de l'exécution. */
const explTrace = (def: string, meth: string, trace: string[], concl: string) =>
  expl(def, meth, trace.join(" ; ") + ".", concl);

const repNombre = (n: number) => ({ format: "short" as const, expected: [String(n)], comparator: "number_equal" as const });
const repQcm = (bonne: string, choix: string[]) => ({
  format: "qcm" as const,
  choices: choix,
  expected: [bonne],
  comparator: "mcq_exact" as const,
});

/** Un nouveau gabarit (les anciens gardent leur objet et leur id). */
function gabarit(
  id: string,
  notionId: "algo_programmation" | "algo_construire",
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  tags: string[],
  generate: () => any
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "5e",
    matiere: "maths",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [notionId, ...tags, "template"],
    generate,
  } as TutorBankItemV4;
}

/* ===========================================================================
   LES SITUATIONS (une seule à La Réunion). `hi` : message quand c'est gagné.
=========================================================================== */

type Ctx = { v: string; intro: (p: Prenom) => string; hi: string; lo: string; depart: [number, number]; pas: [number, number] };

const CTX: Ctx[] = [
  { v: "score", intro: (p) => `${p.nom} programme un jeu de plateforme.`, hi: "Niveau suivant", lo: "Rejoue", depart: [0, 20], pas: [2, 9] },
  { v: "pièces", intro: (p) => `${p.nom} crée un jeu de pirates : le lutin ramasse des pièces d’or.`, hi: "Trésor trouvé", lo: "Cherche encore", depart: [0, 15], pas: [2, 6] },
  { v: "étoiles", intro: (p) => `Dans le jeu spatial ${deNom(p.nom)}, la fusée collecte des étoiles.`, hi: "Mission réussie", lo: "Continue", depart: [0, 12], pas: [1, 5] },
  { v: "pommes", intro: (p) => `${p.nom} code un jeu de verger où l’on cueille des pommes.`, hi: "Panier plein", lo: "Encore des pommes", depart: [0, 10], pas: [2, 6] },
  { v: "points", intro: (p) => `${p.nom} prépare un quiz pour sa classe.`, hi: "Gagné", lo: "Perdu", depart: [0, 10], pas: [1, 4] },
  { v: "vies", intro: (p) => `Dans le jeu ${deNom(p.nom)}, le chat gagne des vies.`, hi: "En pleine forme", lo: "Attention", depart: [1, 5], pas: [1, 3] },
  { v: "graines", intro: (p) => `${p.nom} programme un robot jardinier qui plante des graines.`, hi: "Jardin semé", lo: "Encore un rang", depart: [0, 20], pas: [3, 8] },
  { v: "billes", intro: (p) => `${p.nom} simule une partie de billes dans Scratch.`, hi: "Sac plein", lo: "Rejoue", depart: [5, 25], pas: [2, 6] },
  { v: "tours", intro: (p) => `${p.nom} simule une course de vélo sur une piste.`, hi: "Arrivée", lo: "Encore un tour", depart: [0, 6], pas: [1, 3] },
  { v: "buts", intro: (p) => `${p.nom} programme un match de football.`, hi: "Victoire", lo: "Match nul", depart: [0, 4], pas: [1, 2] },
  { v: "cartes", intro: (p) => `${p.nom} compte sa collection de cartes avec un programme.`, hi: "Album complet", lo: "Il en manque", depart: [10, 40], pas: [3, 9] },
  { v: "livres", intro: (p) => `À la médiathèque, ${p.nom} programme un compteur de livres.`, hi: "Étagère pleine", lo: "Il reste de la place", depart: [5, 30], pas: [2, 7] },
  { v: "litres", intro: (p) => `${p.nom} programme une pompe qui remplit un aquarium.`, hi: "Aquarium plein", lo: "Remplissage", depart: [0, 20], pas: [2, 8] },
  { v: "gemmes", intro: (p) => `${p.nom} invente un jeu de labyrinthe plein de gemmes.`, hi: "Coffre ouvert", lo: "Cherche encore", depart: [0, 10], pas: [1, 5] },
  { v: "paniers", intro: (p) => `${p.nom} programme un match de basket.`, hi: "Belle victoire", lo: "Encore un effort", depart: [0, 12], pas: [2, 3] },
  { v: "bonbons", intro: (p) => `${p.nom} code une machine à bonbons.`, hi: "Machine pleine", lo: "Ajoute des bonbons", depart: [0, 25], pas: [3, 10] },
  { v: "coquillages", intro: (p) => `Sur la plage de l’Hermitage, ${p.nom} programme un jeu de ramassage de coquillages.`, hi: "Seau plein", lo: "Cherche encore", depart: [0, 15], pas: [2, 6] },
  { v: "sauts", intro: (p) => `${p.nom} programme un kangourou qui saute.`, hi: "Record battu", lo: "Encore un saut", depart: [0, 10], pas: [1, 4] },
];

/** Les déplacements : le lutin qui bouge, et qui le programme. */
const COSTUMES = [
  "un robot aspirateur", "un chat", "une tortue", "une voiture de course", "un petit robot",
  "un dinosaure", "un chien", "un crabe", "un manchot", "une fourmi", "un poney", "une coccinelle",
];
function mobile(p: Prenom): string {
  const x = pick(COSTUMES);
  return pick([
    `Le lutin ${deNom(p.nom)} est ${x}.`,
    `Dans le jeu ${deNom(p.nom)}, le lutin est ${x}.`,
    `${p.nom} a choisi ${x} comme lutin.`,
  ]);
}

/** Les débuts de phrase neutres (pas de variable). */
const lanceur = (p: Prenom) =>
  pick([`${p.nom} programme son lutin.`, `${p.nom} teste un programme Scratch.`, mobile(p), `Dans le projet ${deNom(p.nom)}, le lutin suit un programme.`]);

/** Les façons de présenter le programme. */
const PRES = [
  (p: string) => `Voici le programme : ${p}.`,
  (p: string) => `Le programme exécute ${p}.`,
  (p: string) => `On lance le programme ${p}.`,
  (p: string) => `Le lutin exécute ${p}.`,
];
const presenter = (p: Ins[]) => pick(PRES)(progTxt(p));

const qValeur = (v: string) =>
  pick([
    `Quelle est la valeur de la variable ${v} à la fin ?`,
    `Que vaut ${v} une fois le programme terminé ?`,
    `Combien vaut ${v} à la fin du programme ?`,
    `Que contient la variable ${v} à la fin ?`,
  ]);
const Q_DIT = ["Quel nombre le lutin dit-il à la fin ?", "Quel nombre s’affiche à la fin ?"];
const Q_PAS = [
  "Combien de pas le lutin fait-il en tout ?",
  "De combien de pas le lutin avance-t-il en tout ?",
  "Quelle distance, en pas, le lutin parcourt-il ?",
];
const Q_MSG = ["Que dit le lutin ?", "Quel message s’affiche ?", "Quel message le lutin dit-il ?"];
const RIEN = "il ne dit rien";

/** La question sur la fin du programme : la variable, ou le nombre dit si le programme finit par « dire v ». */
function finir(p: Ins[], v: string): { prog: Ins[]; q: string } {
  if (Math.random() < 0.35) return { prog: [...p, { k: "direv", v }], q: pick(Q_DIT) };
  return { prog: p, q: qValeur(v) };
}

const MESSAGES = ["Bonjour", "Salut", "Coucou", "C’est parti", "J’arrive", "Bravo", "À toi", "Bienvenue", "Hop", "On y va", "Super", "Au revoir"];

/* ===========================================================================
   LES GÉNÉRATEURS, micro par micro (en dessous, chaque gabarit y renvoie).
=========================================================================== */

/* ----- algo_sequence ----- */

/** ★1 — quelle action vient en premier, en deuxième, en dernier, juste après… */
function genSeqOrdre() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const n = entre(3, 4);
    const pool: Ins[] = shuffle<Ins>([
      { k: "dire", t: pick(MESSAGES) },
      { k: "dire", t: pick(MESSAGES) },
      { k: "avancer", n: 10 * entre(1, 9) },
      { k: "avancer", n: 10 * entre(1, 9) },
      { k: "tourner", n: pick([30, 45, 60, 90, 120, 180]) },
    ]);
    const prog = pool.slice(0, n);
    const txts = prog.map(insTxt);
    if (new Set(txts).size !== n) return null;
    const rangs = ["en premier", "en deuxième", "en troisième", "en quatrième"];
    const forme = entre(0, 4);
    let idx: number;
    let q: string;
    if (forme <= 1) {
      idx = entre(0, n - 2);
      q = pick([`Quelle action le lutin fait-il ${rangs[idx]} ?`, `Quel bloc est exécuté ${rangs[idx]} ?`]);
    } else if (forme === 2) {
      idx = n - 1;
      q = pick(["Quelle action le lutin fait-il en dernier ?", "Quel bloc est exécuté en dernier ?"]);
    } else {
      idx = entre(1, n - 1);
      q = `Quel bloc est exécuté juste après « ${txts[idx - 1]} » ?`;
    }
    const bonne = txts[idx];
    return {
      text: `${lanceur(p)} ${presenter(prog)} ${q}`,
      ...repQcm(bonne, shuffle(txts)),
      explanation: expl(
        "une séquence est une suite d’instructions exécutées dans l’ordre, de haut en bas.",
        "on lit les blocs un par un, à partir du drapeau vert.",
        txts.map((t, i) => `bloc ${i + 1} : ${t}`).join(" ; ") + ".",
        `la réponse est « ${bonne} ».`
      ),
      canvas: canvasProg("Lire l’ordre des blocs", prog),
    };
  });
}

/** ★2 — la distance totale d'une séquence (avec des blocs qui ne font pas avancer). */
function genSeqDistance() {
  const p = pick(PRENOMS);
  const n = entre(2, 4);
  const prog: Ins[] = [];
  for (let i = 0; i < n; i++) {
    prog.push({ k: "avancer", n: 5 * entre(2, 16) });
    if (i < n - 1 && Math.random() < 0.5)
      prog.push(Math.random() < 0.6 ? { k: "tourner", n: pick([45, 90, 90, 180]) } : { k: "dire", t: pick(MESSAGES) });
  }
  const st = executer(prog);
  const pas = prog.filter((i): i is Extract<Ins, { k: "avancer" }> => i.k === "avancer").map((i) => i.n);
  return {
    text: `${mobile(p)} ${presenter(prog)} ${pick(Q_PAS)}`,
    ...repNombre(st.dist),
    explanation: expl(
      "une séquence est une suite d’instructions exécutées dans l’ordre.",
      "on additionne les distances de tous les blocs « avancer » ; « tourner » et « dire » ne font pas avancer.",
      `${pas.join(" + ")} = ${st.dist}.`,
      `le lutin parcourt ${st.dist} pas.`
    ),
    canvas: canvasProg("Distance dans une séquence", prog),
  };
}

/** Une modification de la variable : « ajouter b », « mettre v à v + b », « mettre v à v − b ». */
function modifier(v: string, b: number): Ins {
  const r = Math.random();
  if (r < 0.55) return { k: "add", v, n: b };
  if (r < 0.8) return { k: "set", v, e: E(v, "−", b) };
  return { k: "set", v, e: E(v, "+", b) };
}

/** ★2 — la valeur finale d'une variable après quelques blocs. */
function genSeqVariable() {
  return tirer(() => {
    const c = pick(CTX);
    const p = pick(PRENOMS);
    const prog: Ins[] = [{ k: "set", v: c.v, e: entre(...c.depart) }];
    const n = entre(1, 3);
    for (let i = 0; i < n; i++) prog.push(modifier(c.v, entre(...c.pas)));
    const f = finir(prog, c.v);
    const st = executer(f.prog);
    if (!plausible(st)) return null;
    const fin = st.env[c.v];
    return {
      text: `${c.intro(p)} ${presenter(f.prog)} ${f.q}`,
      ...repNombre(fin),
      explanation: explTrace(
        "une variable garde une valeur que le programme peut changer.",
        "on suit la valeur de la variable bloc après bloc, dans l’ordre.",
        st.trace,
        `la réponse est ${fin}.`
      ),
      canvas: canvasProg(`La variable ${c.v}`, f.prog),
    };
  });
}

/** ★2 — le lutin parle AU MILIEU du programme : il dit la valeur de ce moment-là. */
function genSeqDireMilieu() {
  return tirer(() => {
    const c = pick(CTX);
    const p = pick(PRENOMS);
    const v = c.v;
    const a = entre(...c.depart);
    const b = entre(...c.pas);
    const d = entre(...c.pas);
    const prog: Ins[] = pick<Ins[]>([
      [{ k: "set", v, e: a }, { k: "add", v, n: b }, { k: "direv", v }, { k: "add", v, n: d }],
      [{ k: "set", v, e: a }, { k: "direv", v }, modifier(v, b)],
      [{ k: "set", v, e: a }, modifier(v, b), { k: "direv", v }, modifier(v, d)],
      [{ k: "set", v, e: a }, { k: "add", v, n: b }, { k: "add", v, n: d }, { k: "direv", v }, { k: "set", v, e: 0 }],
    ]);
    const st = executer(prog);
    if (!plausible(st)) return null;
    const dit = Number(st.dits[0]);
    return {
      text: `${c.intro(p)} ${presenter(prog)} ${pick(["Quel nombre le lutin dit-il ?", "Quel nombre s’affiche ?"])}`,
      ...repNombre(dit),
      explanation: explTrace(
        "le bloc « dire » affiche la valeur de la variable AU MOMENT où il est exécuté.",
        "on suit la variable dans l’ordre et on s’arrête au bloc « dire ».",
        st.trace,
        `le lutin dit ${dit}${st.env[v] !== dit ? ` (même si ${v} vaut ${st.env[v]} à la fin)` : ""}.`
      ),
      canvas: canvasProg(`Le lutin dit ${v}`, prog),
    };
  });
}

/** ★3 — l'ordre compte : la variable a déjà une valeur, puis deux blocs (parfois dans l'ordre « piège »). */
function genSeqOrdreCompte() {
  return tirer(() => {
    const c = pick(CTX);
    const p = pick(PRENOMS);
    const v = c.v;
    const x0 = entre(...c.depart);
    const a = entre(...c.depart);
    const b = entre(...c.pas);
    const k = entre(2, 3);
    const deux: [Ins, Ins] = pick<[Ins, Ins]>([
      [{ k: "add", v, n: b }, { k: "set", v, e: a }],
      [{ k: "set", v, e: a }, { k: "add", v, n: b }],
      [{ k: "set", v, e: E(v, "×", k) }, { k: "add", v, n: b }],
      [{ k: "add", v, n: b }, { k: "set", v, e: E(v, "×", k) }],
    ]);
    const f = finir([...deux], v);
    const st = executer(f.prog, { [v]: x0 });
    const autre = executer([deux[1], deux[0]], { [v]: x0 });
    if (!plausible(st) || !plausible(autre)) return null;
    const fin = st.env[v];
    const diff = autre.env[v] !== st.env[v];
    return {
      text: `${c.intro(p)} Au départ, la variable ${v} vaut ${x0}. ${presenter(f.prog)} ${f.q}`,
      ...repNombre(fin),
      explanation: explTrace(
        "un programme exécute ses blocs dans l’ordre : changer l’ordre peut changer le résultat.",
        `on part avec ${v} = ${x0} et on fait les blocs de haut en bas.`,
        st.trace,
        `la réponse est ${fin}.${diff ? ` Dans l’autre ordre, on trouverait ${autre.env[v]}.` : ""}`
      ),
      canvas: canvasProg("L’ordre compte", f.prog, { [v]: x0 }),
    };
  });
}

/** Deux variables qui vivent ensemble. */
const PAIRES: { a: string; b: string; intro: (p: Prenom) => string }[] = [
  { a: "a", b: "b", intro: (p) => `${p.nom} teste un programme à deux variables.` },
  { a: "x", b: "y", intro: (p) => `${p.nom} écrit un programme de calcul avec deux variables.` },
  { a: "pommes", b: "poires", intro: (p) => `${p.nom} compte les fruits de deux paniers.` },
  { a: "rouges", b: "bleus", intro: (p) => `${p.nom} compte des jetons rouges et des jetons bleus.` },
  { a: "chats", b: "chiens", intro: (p) => `${p.nom} programme le compteur d’un refuge pour animaux.` },
  { a: "filles", b: "garçons", intro: (p) => `${p.nom} compte les inscrits du club d’échecs.` },
  { a: "matin", b: "soir", intro: (p) => `${p.nom} note les kilomètres de vélo du matin et du soir.` },
  { a: "gauche", b: "droite", intro: (p) => `${p.nom} compte les voitures qui tournent à gauche ou à droite.` },
];

/* ----- algo_entree_sortie ----- */

/** Les questions posées par le lutin, la variable qui garde la réponse, des réponses plausibles. */
const QUESTIONS: { t: string; v: string; min: number; max: number }[] = [
  { t: "Quel âge as-tu ?", v: "âge", min: 9, max: 14 },
  { t: "Combien de billes as-tu ?", v: "billes", min: 5, max: 40 },
  { t: "Choisis un nombre.", v: "nombre", min: 2, max: 30 },
  { t: "Quelle est ta pointure ?", v: "pointure", min: 32, max: 42 },
  { t: "Combien de pages as-tu lues ?", v: "pages", min: 5, max: 60 },
  { t: "Combien d’élèves dans ta classe ?", v: "élèves", min: 20, max: 30 },
  { t: "Combien de minutes de marche ?", v: "minutes", min: 5, max: 45 },
  { t: "Combien de points as-tu marqués ?", v: "points", min: 3, max: 30 },
  { t: "Combien de cartes as-tu ?", v: "cartes", min: 10, max: 50 },
  { t: "Quelle est ta note ?", v: "note", min: 6, max: 20 },
  { t: "Combien de tours de piste ?", v: "tours", min: 2, max: 12 },
  { t: "Combien de pommes dans le panier ?", v: "pommes", min: 4, max: 25 },
];

const introQuestion = (p: Prenom) =>
  pick([
    `${p.nom} écrit un programme qui pose une question.`,
    `${p.nom} programme un lutin qui discute.`,
    `${p.nom} teste son programme avec la classe.`,
    `Dans le programme ${deNom(p.nom)}, le lutin pose une question.`,
  ]);

/** Qui répond, et quoi. */
function quiRepond(p: Prenom, r: number): string {
  let q = pick(PRENOMS);
  while (q.nom === p.nom) q = pick(PRENOMS);
  return pick([`L’utilisateur répond ${r}.`, `${q.nom} répond ${r}.`, `On tape ${r} au clavier.`, `${q.nom} saisit ${r}.`]);
}

const Q_SORTIE = ["Quel nombre le lutin dit-il ?", "Quelle est la sortie du programme ?", "Quel nombre s’affiche ?"];

/** ★1 — reconnaître l'entrée (« demander ») et la sortie (« dire »). */
function genESRole() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const Qd = pick(QUESTIONS);
    const v = Qd.v;
    const prog: Ins[] = [{ k: "demander", t: Qd.t }, { k: "set", v, e: "réponse" }];
    if (Math.random() < 0.5) prog.push({ k: "add", v, n: entre(1, 5) });
    prog.push(Math.random() < 0.6 ? { k: "direv", v } : { k: "dire", t: pick(["Merci", "C’est noté", "Super", "D’accord"]) });
    const sortie = Math.random() < 0.5;
    const q = sortie
      ? pick(["Quel bloc donne la sortie du programme ?", "Quel bloc affiche un résultat à l’écran ?", "Avec quel bloc le programme donne-t-il une information ?"])
      : pick(["Quel bloc est l’entrée du programme ?", "Quel bloc récupère ce que tape l’utilisateur ?", "Avec quel bloc le programme reçoit-il une information ?"]);
    const txts = prog.map(insTxt);
    const bonne = sortie ? txts[txts.length - 1] : txts[0];
    return {
      text: `${introQuestion(p)} ${presenter(prog)} ${q}`,
      ...repQcm(bonne, shuffle(txts)),
      explanation: expl(
        "une entrée est une information que le programme reçoit ; une sortie est une information qu’il affiche.",
        "le bloc « demander … et attendre » reçoit ce que tape l’utilisateur ; le bloc « dire » affiche à l’écran.",
        `l’entrée est « ${txts[0]} », la sortie est « ${txts[txts.length - 1]} ».`,
        `la réponse est « ${bonne} ».`
      ),
      canvas: canvasProg("Entrée et sortie", prog),
    };
  });
}

/** ★2 — la réponse tapée, une modification, puis la sortie. */
function genESCalcul() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const Qd = pick(QUESTIONS);
    const v = Qd.v;
    const r = entre(Qd.min, Qd.max);
    const b = entre(2, 9);
    const modif: Ins = pick<Ins>([{ k: "add", v, n: b }, { k: "set", v, e: E(v, "−", b) }, { k: "set", v, e: E(v, "×", 2) }, { k: "set", v, e: E(v, "+", b) }]);
    const prog: Ins[] = [{ k: "demander", t: Qd.t }, { k: "set", v, e: "réponse" }, modif, { k: "direv", v }];
    const st = executer(prog, {}, [r]);
    if (!plausible(st)) return null;
    const out = Number(st.dits[0]);
    return {
      text: `${introQuestion(p)} ${presenter(prog)} ${quiRepond(p, r)} ${pick(Q_SORTIE)}`,
      ...repNombre(out),
      explanation: explTrace(
        "un programme reçoit une entrée, la transforme, puis donne une sortie.",
        "on remplace « réponse » par le nombre tapé, puis on suit les blocs dans l’ordre.",
        st.trace,
        `le lutin dit ${out}.`
      ),
      canvas: canvasProg("Entrée → calcul → sortie", prog),
    };
  });
}

/** ★2 — deux variables : laquelle le lutin dit-il ? */
function genESDeuxVariables() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const Qd = pick(QUESTIONS);
    const v = Qd.v;
    const r = entre(Qd.min, Qd.max);
    const b = entre(2, 9);
    const w = pick([
      { n: "double", e: E(v, "×", 2) },
      { n: "triple", e: E(v, "×", 3) },
      { n: "résultat", e: E(v, "+", b) },
      { n: "total", e: E(v, "+", b) },
    ]);
    const ditW = Math.random() < 0.5;
    const prog: Ins[] = [{ k: "demander", t: Qd.t }, { k: "set", v, e: "réponse" }, { k: "set", v: w.n, e: w.e }, { k: "direv", v: ditW ? w.n : v }];
    const st = executer(prog, {}, [r]);
    if (!plausible(st)) return null;
    const out = Number(st.dits[0]);
    return {
      text: `${introQuestion(p)} ${presenter(prog)} ${quiRepond(p, r)} ${pick(Q_SORTIE)}`,
      ...repNombre(out),
      explanation: explTrace(
        "la sortie est ce que le bloc « dire » affiche : il faut regarder QUELLE variable il dit.",
        "on suit les deux variables, puis on lit le bloc « dire ».",
        st.trace,
        `le lutin dit ${ditW ? w.n : v}, soit ${out}.`
      ),
      canvas: canvasProg("Quelle variable est dite ?", prog),
    };
  });
}

/** ★3 — entrée, calcul en une ou deux étapes, sortie. */
function genESCalcul2() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const Qd = pick(QUESTIONS);
    const v = Qd.v;
    const r = entre(Qd.min, Qd.max);
    const k = entre(2, 5);
    const b = entre(1, 12);
    const corps: Ins[] = pick<Ins[]>([
      [{ k: "set", v, e: E(E("réponse", "×", k), "+", b) }],
      [{ k: "set", v, e: E("réponse", "+", b) }, { k: "set", v, e: E(v, "×", k) }],
      [{ k: "set", v, e: E(k, "×", "réponse") }, { k: "set", v, e: E(v, "−", b) }],
      [{ k: "set", v, e: "réponse" }, { k: "set", v, e: E(E(v, "+", b), "×", k) }],
    ]);
    const prog: Ins[] = [{ k: "demander", t: Qd.t }, ...corps, { k: "direv", v }];
    const st = executer(prog, {}, [r]);
    if (!plausible(st)) return null;
    const out = Number(st.dits[0]);
    return {
      text: `${introQuestion(p)} ${presenter(prog)} ${quiRepond(p, r)} ${pick(Q_SORTIE)}`,
      ...repNombre(out),
      explanation: explTrace(
        "un programme peut prendre une entrée, faire un calcul, puis afficher une sortie.",
        "on remplace « réponse » par le nombre tapé ; on fait la multiplication avant l’addition, sauf parenthèses.",
        st.trace,
        `le lutin dit ${out}.`
      ),
      canvas: canvasProg("Entrée → calcul → sortie", prog),
    };
  });
}

/** Deux questions, deux réponses, un calcul. */
const DEUX_ENTREES: { intro: string; a: [string, string]; b: [string, string]; res: string; e: Expr; min: number; max: number }[] = [
  { intro: "Le programme calcule l’aire d’un rectangle.", a: ["Longueur ?", "longueur"], b: ["Largeur ?", "largeur"], res: "aire", e: E("longueur", "×", "largeur"), min: 2, max: 12 },
  { intro: "Le programme calcule le périmètre d’un rectangle.", a: ["Longueur ?", "longueur"], b: ["Largeur ?", "largeur"], res: "périmètre", e: E(2, "×", E("longueur", "+", "largeur")), min: 2, max: 15 },
  { intro: "Le programme compte les biscuits d’un carton.", a: ["Combien de paquets ?", "paquets"], b: ["Combien de biscuits par paquet ?", "biscuits"], res: "total", e: E("paquets", "×", "biscuits"), min: 2, max: 12 },
  { intro: "Le programme calcule la longueur d’une balade.", a: ["Distance à l’aller ?", "aller"], b: ["Distance au retour ?", "retour"], res: "trajet", e: E("aller", "+", "retour"), min: 2, max: 20 },
  { intro: "Le programme compare deux âges.", a: ["Ton âge ?", "âge"], b: ["L’âge de ton frère ?", "frère"], res: "écart", e: E("âge", "−", "frère"), min: 2, max: 14 },
  { intro: "Le programme compte les places d’une salle.", a: ["Combien de rangées ?", "rangées"], b: ["Combien de sièges par rangée ?", "sièges"], res: "places", e: E("rangées", "×", "sièges"), min: 3, max: 15 },
  { intro: "Le programme additionne les points de deux manches.", a: ["Points de la première manche ?", "premier"], b: ["Points de la seconde manche ?", "second"], res: "score", e: E("premier", "+", "second"), min: 3, max: 25 },
];

/** ★3 — deux entrées, puis la sortie. */
function genESDeuxEntrees() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const D = pick(DEUX_ENTREES);
    const r1 = entre(D.min, D.max);
    const r2 = entre(D.min, D.max);
    const prog: Ins[] = [
      { k: "demander", t: D.a[0] },
      { k: "set", v: D.a[1], e: "réponse" },
      { k: "demander", t: D.b[0] },
      { k: "set", v: D.b[1], e: "réponse" },
      { k: "set", v: D.res, e: D.e },
      { k: "direv", v: D.res },
    ];
    const st = executer(prog, {}, [r1, r2]);
    if (!plausible(st)) return null;
    const out = Number(st.dits[0]);
    let q = pick(PRENOMS);
    while (q.nom === p.nom) q = pick(PRENOMS);
    return {
      text: `${p.nom} teste son programme. ${D.intro} ${presenter(prog)} ${pick([`${q.nom} répond ${r1}, puis ${r2}.`, `On tape ${r1}, puis ${r2}.`])} ${pick(Q_SORTIE)}`,
      ...repNombre(out),
      explanation: explTrace(
        "un programme peut recevoir plusieurs entrées : chaque « demander » reçoit une réponse, dans l’ordre.",
        "la première réponse va dans la première variable, la seconde dans la seconde ; puis on calcule.",
        st.trace,
        `le lutin dit ${out}.`
      ),
      canvas: canvasProg("Deux entrées", prog),
    };
  });
}

/** ★4 — retrouver l'entrée à partir de la sortie. */
function genESRetrouver() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const Qd = pick(QUESTIONS);
    const v = Qd.v;
    const r = entre(Qd.min, Qd.max);
    const k = entre(2, 4);
    const b = entre(1, 9);
    const corps: Ins[] = pick<Ins[]>([
      [{ k: "set", v, e: E("réponse", "×", k) }, { k: "add", v, n: b }],
      [{ k: "set", v, e: "réponse" }, { k: "add", v, n: b }],
      [{ k: "set", v, e: E("réponse", "+", b) }, { k: "set", v, e: E(v, "×", k) }],
      [{ k: "set", v, e: E(k, "×", "réponse") }],
    ]);
    const prog: Ins[] = [{ k: "demander", t: Qd.t }, ...corps, { k: "direv", v }];
    const st = executer(prog, {}, [r]);
    if (!plausible(st)) return null;
    const out = Number(st.dits[0]);
    let q = pick(PRENOMS);
    while (q.nom === p.nom) q = pick(PRENOMS);
    return {
      text: `${introQuestion(p)} ${presenter(prog)} ${q.nom} tape un nombre et le lutin dit ${out}. Quel nombre ${q.nom} a-t-${pron(q)} tapé ?`,
      ...repNombre(r),
      explanation: explTrace(
        "on connaît la sortie ; on cherche l’entrée.",
        "on remonte le programme en faisant les opérations contraires (− au lieu de +, ÷ au lieu de ×), puis on vérifie.",
        [`on vérifie avec ${r}`, ...st.trace],
        `${q.nom} a tapé ${r}.`
      ),
      canvas: canvasProg("Retrouver l’entrée", prog),
    };
  });
}

/* ----- algo_expression_valeur ----- */

/** Les variables d'une expression : une lettre, ou un nom dans une petite situation. */
const VARS_EXPR: { v: string; min: number; max: number; intro?: (p: Prenom) => string }[] = [
  { v: "x", min: 2, max: 12 },
  { v: "n", min: 2, max: 12 },
  { v: "a", min: 2, max: 10 },
  { v: "y", min: 2, max: 12 },
  { v: "t", min: 2, max: 9 },
  { v: "côté", min: 3, max: 15, intro: (p) => `${p.nom} programme le tracé d’un carré.` },
  { v: "âge", min: 9, max: 14, intro: (p) => `${p.nom} écrit un programme sur les âges de sa famille.` },
  { v: "score", min: 2, max: 20, intro: (p) => `${p.nom} programme le tableau des scores d’un jeu.` },
  { v: "billes", min: 3, max: 20, intro: (p) => `${p.nom} compte ses billes avec un programme.` },
  { v: "longueur", min: 3, max: 15, intro: (p) => `${p.nom} programme le dessin d’un rectangle.` },
];

/** « x vaut 4. » sous plusieurs formes (toujours « … vaut … », que le correcteur relit). */
const donneeTxt = (v: string, x: number, p: Prenom | null) =>
  pick([`${v} vaut ${x}.`, `La variable ${v} vaut ${x}.`, `On sait que ${v} vaut ${x}.`, p ? `Dans le programme ${deNom(p.nom)}, ${v} vaut ${x}.` : `Ici, ${v} vaut ${x}.`]);

const Q_EXPR = [
  (e: string) => `Que vaut « ${e} » ?`,
  (e: string) => `Calcule « ${e} ».`,
  (e: string) => `Quelle est la valeur de « ${e} » ?`,
  (e: string) => `Quel nombre donne le bloc « ${e} » ?`,
];

/** Une expression à une variable, posée telle quelle (le canvas : la valeur, puis le bloc qui dit l'expression). */
function poserExpression(formes: ((v: string) => Expr)[], titre: string, def: string) {
  return tirer(() => {
    const p = pick(PRENOMS);
    const V = pick(VARS_EXPR);
    const x = entre(V.min, V.max);
    const e = pick(formes)(V.v);
    const val = evalE(e, { [V.v]: x });
    if (val < 0 || val > 999) return null;
    const et = exprTxt(e);
    const intro = V.intro && Math.random() < 0.7 ? `${V.intro(p)} ` : "";
    return {
      text: `${intro}${donneeTxt(V.v, x, intro ? null : p)} ${pick(Q_EXPR)(et)}`,
      ...repNombre(val),
      explanation: expl(
        def,
        `on remplace ${V.v} par ${x}, puis on calcule (la multiplication avant l’addition et la soustraction).`,
        `${et} = ${exprTxt(e, { [V.v]: x })} = ${val}.`,
        `la valeur est ${val}.`
      ),
      canvas: scratchCanvas(titre, [{ type: "event" }, { type: "set_variable", variable: V.v, value: x }, { type: "say", text: et }]),
    };
  });
}

const k2 = () => entre(2, 9);
const b2 = () => entre(1, 15);

function genExprAddition() {
  return poserExpression(
    [(v) => E(v, "+", b2()), (v) => E(v, "−", entre(1, 9)), (v) => E(b2(), "+", v), (v) => E(E(v, "+", b2()), "−", entre(1, 5))],
    "Valeur d’une expression",
    "calculer une expression, c’est remplacer la variable par sa valeur."
  );
}

function genExprMultiplication() {
  return poserExpression(
    [(v) => E(k2(), "×", v), (v) => E(v, "×", k2()), (v) => E(v, "×", v)],
    "Multiplication avec une variable",
    "une expression avec une variable se calcule dès qu’on connaît la valeur de la variable."
  );
}

function genExprDeuxEtapes() {
  return poserExpression(
    [
      (v) => E(E(k2(), "×", v), "+", b2()),
      (v) => E(b2(), "+", E(k2(), "×", v)),
      (v) => E(E(k2(), "×", v), "−", entre(1, 9)),
      (v) => E(E(v, "×", k2()), "+", b2()),
      (v) => E(k2(), "×", E(v, "+", b2())),
    ],
    "Expression en deux étapes",
    "une expression peut contenir plusieurs opérations : la multiplication passe avant l’addition, sauf parenthèses."
  );
}

/** ★3 — un programme de calcul qui part d'un nombre écrit dans le premier bloc. */
function genExprProgramme() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const r = pick(["résultat", "nombre", "calcul", "total"]);
    const prog: Ins[] = [{ k: "set", v: r, e: entre(2, 12) }];
    const etapes = shuffle<Ins>([
      { k: "set", v: r, e: E(r, "×", entre(2, 5)) },
      { k: "add", v: r, n: entre(1, 12) },
      { k: "set", v: r, e: E(r, "−", entre(1, 9)) },
      { k: "set", v: r, e: E(r, "+", entre(2, 9)) },
    ]).slice(0, entre(2, 3));
    const f = finir([...prog, ...etapes], r);
    const st = executer(f.prog);
    if (!plausible(st)) return null;
    return {
      text: `${pick([`${p.nom} teste un programme de calcul.`, `${p.nom} invente un programme de calcul pour sa classe.`, `Au club de code, ${p.nom} écrit un programme de calcul.`])} ${presenter(f.prog)} ${f.q}`,
      ...repNombre(st.env[r]),
      explanation: explTrace(
        "exécuter un programme de calcul, c’est faire ses instructions dans l’ordre.",
        `on suit la valeur de ${r} bloc après bloc.`,
        st.trace,
        `la réponse est ${st.env[r]}.`
      ),
      canvas: canvasProg("Programme de calcul", f.prog),
    };
  });
}

/** ★3 — la réponse tapée devient la valeur de la variable, puis une expression. */
function genExprReponse() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const V = pick(VARS_EXPR);
    const x = entre(V.min, V.max);
    const k = k2();
    const b = b2();
    const e = pick<Expr>([E(E(k, "×", V.v), "+", b), E(V.v, "+", b), E(E(V.v, "×", k), "−", entre(1, 9)), E(k, "×", E(V.v, "+", b))]);
    const r = pick(["résultat", "sortie", "calcul"]);
    const prog: Ins[] = [{ k: "demander", t: "Choisis un nombre." }, { k: "set", v: V.v, e: "réponse" }, { k: "set", v: r, e }, { k: "direv", v: r }];
    const st = executer(prog, {}, [x]);
    if (!plausible(st)) return null;
    const out = Number(st.dits[0]);
    return {
      text: `${V.intro ? V.intro(p) : `${p.nom} écrit un programme de calcul.`} ${presenter(prog)} ${quiRepond(p, x)} ${pick(Q_SORTIE)}`,
      ...repNombre(out),
      explanation: explTrace(
        "une réponse tapée par l’utilisateur peut servir dans un calcul.",
        `${V.v} prend la valeur tapée, puis on calcule ${exprTxt(e)}.`,
        st.trace,
        `le lutin dit ${out}.`
      ),
      canvas: canvasProg("Réponse utilisée dans un calcul", prog),
    };
  });
}

/** ★3 — deux variables dans la même expression. */
function genExprDeuxVariables() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const [a, b] = pick<[string, string]>([["a", "b"], ["x", "y"], ["m", "n"], ["longueur", "largeur"], ["p", "q"]]);
    const xa = entre(2, 9);
    const xb = entre(2, 9);
    const c = entre(1, 9);
    const e = pick<Expr>([
      E(E(a, "×", b), "+", c),
      E(a, "+", E(b, "×", c)),
      E(E(a, "+", b), "×", c),
      E(E(a, "×", b), "−", c),
      E(a, "×", E(b, "+", c)),
      E(E(2, "×", a), "+", E(2, "×", b)),
    ]);
    const val = evalE(e, { [a]: xa, [b]: xb });
    if (val < 0 || val > 999) return null;
    const et = exprTxt(e);
    return {
      text: `${pick([`${p.nom} teste un bloc de calcul.`, `${p.nom} programme une formule à deux variables.`, `Au club de code, ${p.nom} écrit une formule.`])} ${a} vaut ${xa} et ${b} vaut ${xb}. ${pick(Q_EXPR)(et)}`,
      ...repNombre(val),
      explanation: expl(
        "une expression peut contenir plusieurs variables : chacune est remplacée par sa valeur.",
        "on remplace chaque variable, puis on respecte les priorités (parenthèses, puis ×, puis + et −).",
        `${et} = ${exprTxt(e, { [a]: xa, [b]: xb })} = ${val}.`,
        `la valeur est ${val}.`
      ),
      canvas: scratchCanvas("Deux variables", [
        { type: "event" },
        { type: "set_variable", variable: a, value: xa },
        { type: "set_variable", variable: b, value: xb },
        { type: "say", text: et },
      ]),
    };
  });
}

/** ★4 — QCM : les leurres sont les vraies erreurs de priorité. */
function genExprPieges() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const V = pick(VARS_EXPR);
    const v = V.v;
    const x = entre(V.min, Math.min(V.max, 12));
    const k = entre(2, 6);
    const b = entre(2, 9);
    const formes: { e: Expr; leurres: number[] }[] = [
      { e: E(k, "×", E(v, "+", b)), leurres: [k * x + b, k + x + b, k * x, x + b] },
      { e: E(b, "+", E(k, "×", v)), leurres: [(b + k) * x, b + k + x, k * x, b + k] },
      { e: E(E(k, "×", v), "−", b), leurres: [k * (x - b), k * x, x - b, k * x + b] },
      { e: E(E(v, "+", b), "×", k), leurres: [x + b * k, x + b + k, x + b, x * k + b] },
      { e: E(E(v, "×", v), "+", b), leurres: [2 * x + b, x * (x + b), x * x, x + b] },
    ];
    const F = pick(formes);
    const val = evalE(F.e, { [v]: x });
    if (val < 0 || val > 999) return null;
    const choix = propositions(String(val), F.leurres.filter((l) => l >= 0).map(String));
    if (!choix) return null;
    const et = exprTxt(F.e);
    return {
      text: `${V.intro ? `${V.intro(p)} ` : ""}${donneeTxt(v, x, V.intro ? null : p)} ${pick(Q_EXPR)(et)}`,
      ...repQcm(String(val), choix),
      explanation: expl(
        "dans une expression, on calcule d’abord les parenthèses, puis les multiplications, puis les additions et soustractions.",
        `on remplace ${v} par ${x} et on respecte ces priorités.`,
        `${et} = ${exprTxt(F.e, { [v]: x })} = ${val}.`,
        `la bonne réponse est ${val}.`
      ),
      canvas: scratchCanvas("Attention aux priorités", [{ type: "event" }, { type: "set_variable", variable: v, value: x }, { type: "say", text: et }]),
    };
  });
}

/* ----- algo_prevoir_expression ----- */

const introCalcul = (p: Prenom) =>
  pick([
    `${p.nom} écrit un programme de calcul.`,
    `${p.nom} invente un programme de calcul pour sa classe.`,
    `Au club de code, ${p.nom} écrit un programme de calcul.`,
    `${p.nom} prépare un tour de magie avec un programme de calcul.`,
  ]);

const LETTRES = ["x", "n", "a", "t", "y"];
const RES = ["résultat", "calcul", "sortie"];

/** Un programme en deux ou trois blocs sur l'entrée L, rangé dans r, et sa formule. */
function programmeFormule(L: string, r: string, parentheses: boolean | null) {
  const k = entre(2, 9);
  const b = entre(1, 12);
  const c = entre(1, 9);
  const sans: { prog: Ins[]; f: Expr; leurres: Expr[] }[] = [
    { prog: [{ k: "set", v: r, e: E(k, "×", L) }, { k: "add", v: r, n: b }], f: E(E(k, "×", L), "+", b), leurres: [E(k, "×", E(L, "+", b)), E(L, "+", E(k, "×", b)), E(E(L, "×", b), "+", k), E(E(k, "+", L), "+", b)] },
    { prog: [{ k: "set", v: r, e: E(L, "×", k) }, { k: "set", v: r, e: E(r, "−", b) }], f: E(E(L, "×", k), "−", b), leurres: [E(k, "×", E(L, "−", b)), E(L, "−", E(k, "×", b)), E(E(L, "×", b), "−", k), E(E(L, "+", k), "−", b)] },
    { prog: [{ k: "set", v: r, e: L }, { k: "set", v: r, e: E(r, "×", k) }, { k: "add", v: r, n: b }], f: E(E(L, "×", k), "+", b), leurres: [E(E(L, "+", b), "×", k), E(L, "+", E(b, "×", k)), E(E(L, "+", k), "+", b), E(E(L, "×", b), "+", k)] },
  ];
  const avec: { prog: Ins[]; f: Expr; leurres: Expr[] }[] = [
    { prog: [{ k: "set", v: r, e: E(L, "+", b) }, { k: "set", v: r, e: E(r, "×", k) }], f: E(E(L, "+", b), "×", k), leurres: [E(L, "+", E(b, "×", k)), E(E(k, "×", L), "+", b), E(E(L, "×", b), "+", k), E(E(L, "+", b), "+", k)] },
    { prog: [{ k: "set", v: r, e: E(L, "−", c) }, { k: "set", v: r, e: E(r, "×", k) }], f: E(E(L, "−", c), "×", k), leurres: [E(L, "−", E(c, "×", k)), E(E(k, "×", L), "−", c), E(E(L, "×", k), "+", c), E(E(L, "−", c), "+", k)] },
    { prog: [{ k: "set", v: r, e: E(L, "+", b) }, { k: "set", v: r, e: E(r, "×", k) }, { k: "add", v: r, n: c }], f: E(E(E(L, "+", b), "×", k), "+", c), leurres: [E(E(L, "+", E(b, "×", k)), "+", c), E(E(L, "+", b), "×", E(k, "+", c)), E(L, "+", E(b, "×", E(k, "+", c))), E(E(E(L, "×", k), "+", b), "+", c)] },
  ];
  const F = pick(parentheses === null ? [...sans, ...avec] : parentheses ? avec : sans);
  return { ...F, prog: [...F.prog, { k: "direv" as const, v: r }] };
}

/** ★3 / ★4 — quelle formule traduit le programme ? */
function genPrevoirFormule(parentheses: boolean) {
  return tirer(() => {
    const p = pick(PRENOMS);
    const L = pick(LETTRES);
    const r = pick(RES);
    const F = programmeFormule(L, r, parentheses);
    // Les leurres ne doivent JAMAIS valoir la formule juste (testé sur plusieurs valeurs).
    const egal = (g: Expr) => [2, 5, 7, 13].every((x) => evalE(g, { [L]: x }) === evalE(F.f, { [L]: x }));
    const choix = propositions(exprTxt(F.f), F.leurres.filter((g) => !egal(g)).map((g) => exprTxt(g)));
    if (!choix) return null;
    const q = pick([
      "Quelle formule correspond au programme ?",
      "Quelle expression le lutin calcule-t-il ?",
      `Quelle expression en ${L} donne le nombre dit par le lutin ?`,
      "Quelle écriture traduit ce programme ?",
    ]);
    const x = entre(10, 15);
    const st = executer(F.prog, { [L]: x });
    return {
      text: `${introCalcul(p)} Le nombre de départ est dans la variable ${L}. ${presenter(F.prog)} ${q}`,
      ...repQcm(exprTxt(F.f), choix),
      explanation: expl(
        "un programme de calcul se traduit par une expression : on écrit ses opérations dans l’ordre, avec des parenthèses quand un résultat entier est réutilisé.",
        `on part de ${L} et on suit les blocs un par un.`,
        `le programme calcule ${exprTxt(F.f)}. Vérification avec ${L} = ${x} : ${exprTxt(F.f, { [L]: x })} = ${st.dits[0]}.`,
        `la bonne formule est ${exprTxt(F.f)}.`
      ),
      canvas: canvasProg("Programme vers formule", F.prog),
    };
  });
}

/** ★3 — prévoir la sortie sans lancer le programme. */
function genPrevoirSortie(surPlace: boolean) {
  return tirer(() => {
    const p = pick(PRENOMS);
    const L = pick(LETTRES);
    const x = entre(2, 12);
    let prog: Ins[];
    if (surPlace) {
      const etapes = shuffle<Ins>([
        { k: "set", v: L, e: E(L, "+", entre(1, 9)) },
        { k: "set", v: L, e: E(L, "×", entre(2, 5)) },
        { k: "set", v: L, e: E(L, "−", entre(1, 9)) },
        { k: "add", v: L, n: entre(1, 9) },
      ]).slice(0, 3);
      prog = [...etapes, { k: "direv", v: L }];
    } else {
      prog = programmeFormule(L, pick(RES), null).prog;
    }
    const st = executer(prog, { [L]: x });
    if (!plausible(st)) return null;
    const out = Number(st.dits[0]);
    return {
      text: `${introCalcul(p)} ${presenter(prog)} ${pick([
        `${p.nom} veut prévoir le résultat avant de lancer le programme : ${L} vaut ${x}.`,
        `Sans lancer le programme, on cherche sa sortie quand ${L} vaut ${x}.`,
        `Cette fois, ${L} vaut ${x}.`,
      ])} ${pick(Q_SORTIE)}`,
      ...repNombre(out),
      explanation: explTrace(
        "prévoir un programme, c’est trouver son résultat avant de le lancer.",
        `on part de ${L} = ${x} et on suit les blocs dans l’ordre.`,
        st.trace,
        `le lutin dit ${out}.`
      ),
      canvas: canvasProg("Prévoir le résultat", prog, { [L]: x }),
    };
  });
}

/** ★4 — deux programmes, la même entrée : lequel donne le plus grand (ou le plus petit) nombre ? */
function genPrevoirComparer() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const L = pick(LETTRES);
    const r = pick(RES);
    const A = programmeFormule(L, r, null);
    const B = programmeFormule(L, r, null);
    if (exprTxt(A.f) === exprTxt(B.f)) return null;
    const x = entre(2, 12);
    const sa = executer(A.prog, { [L]: x });
    const sb = executer(B.prog, { [L]: x });
    if (!plausible(sa) || !plausible(sb)) return null;
    const va = Number(sa.dits[0]);
    const vb = Number(sb.dits[0]);
    const grand = Math.random() < 0.6;
    const bonne = va === vb ? "ils disent le même nombre" : (va > vb) === grand ? "le programme A" : "le programme B";
    return {
      text:
        `${p.nom} compare deux programmes de calcul. Programme A : ${progTxt(A.prog)}. Programme B : ${progTxt(B.prog)}. ` +
        `Au départ, ${L} vaut ${x} dans les deux programmes. ${grand ? "Quel programme fait dire au lutin le plus grand nombre ?" : "Quel programme fait dire au lutin le plus petit nombre ?"}`,
      ...repQcm(bonne, ["le programme A", "le programme B", "ils disent le même nombre"]),
      explanation: expl(
        "pour comparer deux programmes, on les exécute avec la même entrée.",
        `on remplace ${L} par ${x} dans chaque programme.`,
        `programme A : ${exprTxt(A.f, { [L]: x })} = ${va}. Programme B : ${exprTxt(B.f, { [L]: x })} = ${vb}.`,
        `la réponse est « ${bonne} ».`
      ),
    };
  });
}

/* ----- algo_defi (lire un programme complet) ----- */

/** ★4 — variable, boucle, et parfois un bloc après la boucle. */
function genDefiBoucle() {
  return tirer(() => {
    const c = pick(CTX);
    const p = pick(PRENOMS);
    const v = c.v;
    const n = entre(2, 6);
    const b = entre(...c.pas);
    const corps: Ins[] = Math.random() < 0.3 ? [{ k: "add", v, n: b }, { k: "add", v: "compteur", n: 1 }] : [modifier(v, b)];
    const prog: Ins[] = [{ k: "set", v, e: entre(...c.depart) }];
    if (corps.length > 1) prog.push({ k: "set", v: "compteur", e: 0 });
    prog.push({ k: "rep", n, corps });
    const apres = entre(0, 3);
    if (apres === 1) prog.push({ k: "add", v, n: entre(1, 9) });
    if (apres === 2) prog.push({ k: "set", v, e: E(v, "×", 2) });
    if (apres === 3) prog.push({ k: "set", v, e: E(v, "−", entre(1, 9)) });
    const cible = corps.length > 1 && Math.random() < 0.3 ? "compteur" : v;
    const f = finir(prog, cible);
    const st = executer(f.prog);
    if (!plausible(st)) return null;
    return {
      text: `${c.intro(p)} ${presenter(f.prog)} ${f.q}`,
      ...repNombre(st.env[cible]),
      explanation: explTrace(
        "un programme peut enchaîner des blocs, une boucle, puis d’autres blocs.",
        "on suit la variable : avant la boucle, à chaque tour, puis après la boucle.",
        st.trace,
        `la réponse est ${st.env[cible]}.`
      ),
      canvas: canvasProg("Variable et boucle", f.prog),
    };
  });
}

/** ★5 — une entrée, une boucle, puis la sortie. */
function genDefiEntreeBoucle() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const Qd = pick(QUESTIONS);
    const v = Qd.v;
    const r = entre(Qd.min, Qd.max);
    const n = entre(2, 5);
    const b = entre(2, 9);
    const prog: Ins[] = [{ k: "demander", t: Qd.t }, { k: "set", v, e: "réponse" }, { k: "rep", n, corps: [modifier(v, b)] }];
    const apres = entre(0, 2);
    if (apres === 1) prog.push({ k: "set", v, e: E(v, "×", 2) });
    if (apres === 2) prog.push({ k: "add", v, n: entre(1, 9) });
    prog.push({ k: "direv", v });
    const st = executer(prog, {}, [r]);
    if (!plausible(st)) return null;
    const out = Number(st.dits[0]);
    return {
      text: `${introQuestion(p)} ${presenter(prog)} ${quiRepond(p, r)} ${pick(Q_SORTIE)}`,
      ...repNombre(out),
      explanation: explTrace(
        "un programme peut combiner une entrée, une boucle et une sortie.",
        "on part de la valeur tapée, on fait chaque tour de boucle, puis les blocs suivants.",
        st.trace,
        `le lutin dit ${out}.`
      ),
      canvas: canvasProg("Entrée + boucle", prog),
    };
  });
}

/** ★5 — une boucle qui double, ou une boucle suivie d'un test. */
function genDefiDoubleOuTest() {
  return tirer(() => {
    const c = pick(CTX);
    const p = pick(PRENOMS);
    const v = c.v;
    let prog: Ins[];
    let q: string;
    const numerique = Math.random() < 0.5;
    if (numerique) {
      const corps: Ins[] = pick<Ins[]>([
        [{ k: "set", v, e: E(v, "×", 2) }],
        [{ k: "set", v, e: E(v, "×", 2) }, { k: "add", v, n: entre(1, 3) }],
        [{ k: "add", v, n: entre(1, 4) }, { k: "set", v, e: E(v, "×", 2) }],
        [{ k: "set", v, e: E(v, "×", 3) }],
      ]);
      const f = finir([{ k: "set", v, e: entre(1, 5) }, { k: "rep", n: entre(2, 4), corps }], v);
      prog = f.prog;
      q = f.q;
    } else {
      const a = entre(...c.depart);
      const b = entre(...c.pas);
      const n = entre(2, 5);
      const fin = a + n * b;
      const s = pick([fin, fin - 1, fin + 1, fin - b, fin + b, a + b]);
      const op = pick<Cmp>([">", "<"]);
      // « si score > s » : le message du succès ; « si score < s » : celui de l'effort.
      const [m1, m2] = op === ">" ? [c.hi, c.lo] : [c.lo, c.hi];
      prog = [{ k: "set", v, e: a }, { k: "rep", n, corps: [{ k: "add", v, n: b }] }, { k: "si", c: { v, op, s }, alors: [{ k: "dire", t: m1 }], sinon: [{ k: "dire", t: m2 }] }];
      q = pick(Q_MSG);
    }
    const st = executer(prog);
    if (!plausible(st)) return null;
    const rep = numerique ? repNombre(st.env[v]) : repQcm(st.dits[0], shuffle([c.hi, c.lo]));
    return {
      text: `${c.intro(p)} ${presenter(prog)} ${q}`,
      ...rep,
      explanation: explTrace(
        "dans une boucle, chaque tour repart de la valeur laissée par le tour précédent.",
        "on fait les tours un par un, puis les blocs qui suivent la boucle.",
        st.trace,
        `la réponse est ${rep.expected[0]}.`
      ),
      canvas: canvasProg("Défi", prog),
    };
  });
}

/** ★5 — QCM : les leurres sont les vraies erreurs (un seul tour, départ oublié, départ compté à chaque tour). */
function genDefiPieges() {
  return tirer(() => {
    const c = pick(CTX);
    const p = pick(PRENOMS);
    const v = c.v;
    const d = entre(Math.max(2, c.depart[0]), Math.max(4, c.depart[1]));
    const a = entre(...c.pas);
    const n = entre(3, 6);
    const prog: Ins[] = [{ k: "set", v, e: d }, { k: "rep", n, corps: [{ k: "add", v, n: a }] }, { k: "direv", v }];
    const st = executer(prog);
    if (!plausible(st)) return null;
    const fin = st.env[v];
    const choix = propositions(String(fin), [d + a, a * n, (d + a) * n].map(String));
    if (!choix) return null;
    return {
      text: `${c.intro(p)} ${presenter(prog)} ${pick(PRENOMS.filter((x) => x.nom !== p.nom)).nom} pense que le lutin dira ${d + a}. Quel nombre le lutin dit-il vraiment ?`,
      ...repQcm(String(fin), choix),
      explanation: expl(
        "une boucle « répéter n fois » exécute son contenu n fois, pas une seule.",
        "on calcule l’augmentation totale, puis on l’ajoute à la valeur de départ.",
        `la boucle ajoute ${a} à chaque tour, ${n} fois : ${a} × ${n} = ${a * n}. On part de ${d} : ${d} + ${a * n} = ${fin}. Annoncer ${d + a}, c’est n’avoir compté qu’un tour.`,
        `le lutin dit ${fin}.`
      ),
      canvas: canvasProg("Le compte est bon ?", prog),
    };
  });
}

/* ----- algo_formule_bloc ----- */

/** Les formules proposées : la bonne, puis des leurres qui ne lui sont JAMAIS égaux (éprouvés sur plusieurs valeurs). */
function choixFormules(L: string | string[], bonne: Expr, leurres: Expr[]): string[] | null {
  const vars = Array.isArray(L) ? L : [L];
  const env = (x: number) => Object.fromEntries(vars.map((v, i) => [v, x + 3 * i]));
  const egal = (g: Expr) => [2, 5, 7, 13].every((x) => evalE(g, env(x)) === evalE(bonne, env(x)));
  return propositions(exprTxt(bonne), leurres.filter((g) => !egal(g)).map((g) => exprTxt(g)));
}

const Q_FORMULE = [
  "Quelle formule faut-il écrire dans le bloc ?",
  "Quel calcul le bloc opérateur doit-il faire ?",
  "Quelle expression traduit ce programme ?",
  "Quelle formule correspond ?",
];

/** ★2 — une étape : ajouter ou enlever. */
function genFormuleAddition() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const c = pick(CTX);
    const v = c.v;
    const n = entre(2, 12);
    const plus = Math.random() < 0.6;
    const bonne = plus ? E(v, "+", n) : E(v, "−", n);
    const desc = plus
      ? pick([`ajouter ${n} à ${v}`, `augmenter ${v} de ${n}`])
      : pick([`enlever ${n} à ${v}`, `diminuer ${v} de ${n}`]);
    const choix = choixFormules(v, bonne, [plus ? E(v, "−", n) : E(v, "+", n), E(v, "×", n), E(n, "−", v)]);
    if (!choix) return null;
    return {
      text: `${c.intro(p)} Le programme doit ${desc}. ${pick(Q_FORMULE)}`,
      ...repQcm(exprTxt(bonne), choix),
      explanation: expl(
        "une formule décrit un calcul avec une variable ; dans Scratch, on l’écrit avec un bloc opérateur.",
        "on repère l’opération demandée : ajouter, c’est +, enlever, c’est −.",
        `${desc}, c’est calculer ${exprTxt(bonne)}.`,
        `la formule est ${exprTxt(bonne)}.`
      ),
    };
  });
}

/** ★2 — une étape : multiplier (doubler, tripler…). */
function genFormuleMultiplication() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const c = pick(CTX);
    const v = c.v;
    const forme = entre(0, 2);
    const n = forme === 0 ? entre(3, 9) : forme === 1 ? 2 : 3;
    const desc = forme === 0 ? `multiplier ${v} par ${n}` : forme === 1 ? `doubler ${v}` : `tripler ${v}`;
    const bonne = pick([E(n, "×", v), E(v, "×", n)]);
    const choix = choixFormules(v, bonne, [E(n, "+", v), E(v, "−", n), E(v, "×", v), E(v, "+", v)]);
    if (!choix) return null;
    return {
      text: `${c.intro(p)} Le programme doit ${desc}. ${pick(Q_FORMULE)}`,
      ...repQcm(exprTxt(bonne), choix),
      explanation: expl(
        "une formule décrit un calcul avec une variable ; dans Scratch, on l’écrit avec un bloc opérateur.",
        "doubler, c’est multiplier par 2 ; tripler, c’est multiplier par 3.",
        `${desc}, c’est calculer ${exprTxt(bonne)}.`,
        `la formule est ${exprTxt(bonne)}.`
      ),
    };
  });
}

/** ★3 — un programme de calcul en deux étapes, décrit en français. */
function genFormuleDeuxEtapes() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const L = pick(LETTRES);
    const k = entre(2, 9);
    const b = entre(1, 12);
    const formes: { etapes: string; f: Expr; leurres: Expr[] }[] = [
      { etapes: `multiplier par ${k}, puis ajouter ${b}`, f: E(E(k, "×", L), "+", b), leurres: [E(k, "×", E(L, "+", b)), E(L, "+", E(k, "×", b)), E(E(k, "+", L), "+", b)] },
      { etapes: `ajouter ${b}, puis multiplier le résultat par ${k}`, f: E(E(L, "+", b), "×", k), leurres: [E(L, "+", E(b, "×", k)), E(E(k, "×", L), "+", b), E(E(L, "+", b), "+", k)] },
      { etapes: `multiplier par ${k}, puis soustraire ${b}`, f: E(E(k, "×", L), "−", b), leurres: [E(k, "×", E(L, "−", b)), E(L, "−", E(k, "×", b)), E(E(k, "+", L), "−", b)] },
      { etapes: `soustraire ${b}, puis multiplier le résultat par ${k}`, f: E(E(L, "−", b), "×", k), leurres: [E(L, "−", E(b, "×", k)), E(E(k, "×", L), "−", b), E(E(L, "−", b), "+", k)] },
      { etapes: `ajouter ${b}, puis ajouter ${k}`, f: E(E(L, "+", b), "+", k), leurres: [E(E(L, "+", b), "×", k), E(L, "×", E(b, "+", k)), E(E(L, "×", b), "+", k)] },
    ];
    const F = pick(formes);
    const choix = choixFormules(L, F.f, F.leurres);
    if (!choix) return null;
    return {
      text: `${introCalcul(p)} Programme de calcul : choisir un nombre ${L}, ${F.etapes}. ${pick(Q_FORMULE)}`,
      ...repQcm(exprTxt(F.f), choix),
      explanation: expl(
        "un programme de calcul se traduit par une formule.",
        "on écrit les opérations dans l’ordre du programme ; quand on multiplie « le résultat », on met des parenthèses autour de ce résultat.",
        `choisir ${L}, ${F.etapes} : cela donne ${exprTxt(F.f)}.`,
        `la formule est ${exprTxt(F.f)}.`
      ),
    };
  });
}

/** Les formules de géométrie et de comptage que le programme doit calculer. */
// `v` : [la lettre de la formule, le nom de la variable dans le programme].
const FORMULES_GEO: {
  desc: (v: string, n: number) => string;
  titre: (n: number) => string;
  v: [string, string];
  f: (v: string, n: number) => Expr;
  leurres: (v: string, n: number) => Expr[];
  res: string;
}[] = [
  { desc: (v, n) => `l’aire d’un rectangle de longueur ${v} et de largeur ${n}`, titre: (n) => `l’aire d’un rectangle de largeur ${n}`, v: ["L", "longueur"], f: (v, n) => E(v, "×", n), leurres: (v, n) => [E(v, "+", n), E(2, "×", E(v, "+", n)), E(E(2, "×", v), "+", n)], res: "aire" },
  { desc: (v, n) => `le périmètre d’un rectangle de longueur ${v} et de largeur ${n}`, titre: (n) => `le périmètre d’un rectangle de largeur ${n}`, v: ["L", "longueur"], f: (v, n) => E(2, "×", E(v, "+", n)), leurres: (v, n) => [E(v, "×", n), E(E(2, "×", v), "+", n), E(v, "+", n)], res: "périmètre" },
  { desc: (v) => `le périmètre d’un carré de côté ${v}`, titre: () => "le périmètre d’un carré", v: ["c", "côté"], f: (v) => E(4, "×", v), leurres: (v) => [E(v, "×", v), E(v, "+", 4), E(2, "×", v)], res: "périmètre" },
  { desc: (v) => `l’aire d’un carré de côté ${v}`, titre: () => "l’aire d’un carré", v: ["c", "côté"], f: (v) => E(v, "×", v), leurres: (v) => [E(4, "×", v), E(2, "×", v), E(v, "+", 2)], res: "aire" },
  { desc: (v) => `le périmètre d’un triangle équilatéral de côté ${v}`, titre: () => "le périmètre d’un triangle équilatéral", v: ["c", "côté"], f: (v) => E(3, "×", v), leurres: (v) => [E(v, "×", v), E(v, "+", 3), E(2, "×", v)], res: "périmètre" },
  { desc: (v) => `le périmètre d’un hexagone régulier de côté ${v}`, titre: () => "le périmètre d’un hexagone régulier", v: ["c", "côté"], f: (v) => E(6, "×", v), leurres: (v) => [E(v, "+", 6), E(3, "×", v), E(4, "×", v)], res: "périmètre" },
  { desc: (v) => `le nombre de roues de ${v} vélos`, titre: () => "le nombre de roues d’un groupe de vélos", v: ["n", "vélos"], f: (v) => E(2, "×", v), leurres: (v) => [E(v, "+", 2), E(4, "×", v), E(v, "×", v)], res: "roues" },
  { desc: (v) => `le nombre de roues de ${v} voitures`, titre: () => "le nombre de roues des voitures d’un parking", v: ["n", "voitures"], f: (v) => E(4, "×", v), leurres: (v) => [E(v, "+", 4), E(2, "×", v), E(v, "×", v)], res: "roues" },
  { desc: (v) => `le nombre de pattes de ${v} araignées`, titre: () => "le nombre de pattes d’un groupe d’araignées", v: ["n", "araignées"], f: (v) => E(8, "×", v), leurres: (v) => [E(v, "+", 8), E(4, "×", v), E(6, "×", v)], res: "pattes" },
  { desc: (v) => `le nombre de pattes de ${v} poules`, titre: () => "le nombre de pattes des poules d’un poulailler", v: ["n", "poules"], f: (v) => E(2, "×", v), leurres: (v) => [E(v, "+", 2), E(4, "×", v), E(v, "×", v)], res: "pattes" },
];

/** ★3 — quelle formule le bloc doit-il calculer ? (aire, périmètre, roues, pattes) */
function genFormuleGeo() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const G = pick(FORMULES_GEO);
    const v = G.v[0];
    const n = entre(2, 9);
    const bonne = G.f(v, n);
    const choix = choixFormules(v, bonne, G.leurres(v, n));
    if (!choix) return null;
    return {
      text: `${pick([`${p.nom} veut qu’un programme calcule ${G.desc(v, n)}.`, `Le programme ${deNom(p.nom)} doit calculer ${G.desc(v, n)}.`, `Au club de code, ${p.nom} programme le calcul suivant : ${G.desc(v, n)}.`])} ${pick(Q_FORMULE)}`,
      ...repQcm(exprTxt(bonne), choix),
      explanation: expl(
        "une formule peut modéliser une situation ; le programme la calcule avec un bloc opérateur.",
        "on se rappelle la formule de la situation, puis on l’écrit avec la variable.",
        `${G.desc(v, n)} se calcule par ${exprTxt(bonne)}.`,
        `la formule est ${exprTxt(bonne)}.`
      ),
    };
  });
}

/** ★3 — le programme calcule une formule : quelle valeur dit-il ? */
function genFormuleValeur() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const G = pick(FORMULES_GEO);
    const v = G.v[1];
    const n = entre(2, 9);
    const x = entre(2, 15);
    const prog: Ins[] = [{ k: "set", v: G.res, e: G.f(v, n) }, { k: "direv", v: G.res }];
    const st = executer(prog, { [v]: x });
    if (!plausible(st)) return null;
    const out = Number(st.dits[0]);
    return {
      text: `${pick([`${p.nom} programme le calcul suivant : ${G.titre(n)}.`, `Le programme ${deNom(p.nom)} calcule ${G.titre(n)}.`])} ${presenter(prog)} ${pick([`${v} vaut ${x}.`, `Cette fois, ${v} vaut ${x}.`])} ${pick(Q_SORTIE)}`,
      ...repNombre(out),
      explanation: explTrace(
        "un bloc opérateur calcule une formule avec la valeur de la variable.",
        `on remplace ${v} par ${x} dans la formule du bloc.`,
        st.trace,
        `le lutin dit ${out}.`
      ),
      canvas: canvasProg("Formule dans un bloc", prog, { [v]: x }),
    };
  });
}

/* ----- algo_parametre ----- */

/** « On remplace « A » par « B ». » : A doit être UNE seule fois dans le programme. */
function remplacer(p: Ins[], a: string, b: string): Ins[] | null {
  let vu = 0;
  const r = (l: Ins[]): Ins[] =>
    l.map((i) => {
      if (i.k === "rep") {
        const t = `répéter ${i.n} fois`;
        if (t === a) {
          vu++;
          const m = b.match(/^répéter (\d+) fois$/);
          return { ...i, n: Number(m![1]), corps: r(i.corps) };
        }
        return { ...i, corps: r(i.corps) };
      }
      if (insTxt(i) === a) {
        vu++;
        return PARAM_TMP.get(b)!;
      }
      return i;
    });
  const out = r(p);
  return vu === 1 ? out : null;
}
// Le bloc de remplacement, rangé par son texte le temps d'un tirage.
const PARAM_TMP = new Map<string, Ins>();

const verbeRemplacer = (p: Prenom, a: string, b: string) =>
  pick([`${p.nom} remplace « ${a} » par « ${b} ».`, `On remplace « ${a} » par « ${b} ».`, `${p.nom} modifie un paramètre : on remplace « ${a} » par « ${b} ».`]);

/** Construit la question « après modification ». */
function apresModif(p: Prenom, intro: string, prog: Ins[], a: Ins | string, b: Ins | string, q: string, env: Record<string, number> = {}) {
  const ta = typeof a === "string" ? a : insTxt(a);
  const tb = typeof b === "string" ? b : insTxt(b);
  if (typeof b !== "string") PARAM_TMP.set(tb, b);
  const nouveau = remplacer(prog, ta, tb);
  if (!nouveau) return null;
  const st = executer(nouveau, env);
  if (!plausible(st) || !plausible(executer(prog, env))) return null;
  const donnees = Object.entries(env).map(([v, x]) => `${v} vaut ${x}.`).join(" ");
  return { st, text: `${intro} ${presenter(prog)} ${donnees ? `${donnees} ` : ""}${verbeRemplacer(p, ta, tb)} ${q}`, nouveau };
}

/** ★3 — changer la distance d'un bloc « avancer ». */
function genParamDistance() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const a = 10 * entre(1, 8);
    const b = 10 * entre(1, 9);
    if (a === b) return null;
    const n = entre(2, 6);
    const prog: Ins[] = pick<Ins[]>([
      [{ k: "rep", n, corps: [{ k: "avancer", n: a }] }],
      [{ k: "avancer", n: a }, { k: "tourner", n: 90 }, { k: "avancer", n: 5 * entre(2, 6) }],
      [{ k: "rep", n, corps: [{ k: "avancer", n: a }, { k: "tourner", n: pick([60, 90, 120]) }] }],
      [{ k: "avancer", n: 5 * entre(2, 6) }, { k: "dire", t: pick(MESSAGES) }, { k: "rep", n, corps: [{ k: "avancer", n: a }] }],
    ]);
    const r = apresModif(p, mobile(p), prog, { k: "avancer", n: a }, { k: "avancer", n: b }, pick(Q_PAS));
    if (!r) return null;
    return {
      text: r.text,
      ...repNombre(r.st.dist),
      explanation: explTrace(
        "un paramètre est un nombre que l’on peut régler dans un bloc ; le changer change ce que fait le programme.",
        `on garde le programme et on remplace seulement ${a} par ${b}.`,
        r.st.trace,
        `le lutin parcourt ${r.st.dist} pas.`
      ),
      canvas: canvasProg("Modifier un paramètre", prog),
    };
  });
}

/** ★3 — changer le nombre de répétitions d'une boucle. */
function genParamRepetitions() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const n = entre(2, 6);
    const m = entre(2, 8);
    if (n === m) return null;
    if (Math.random() < 0.5) {
      const prog: Ins[] = [{ k: "rep", n, corps: [{ k: "avancer", n: 5 * entre(2, 10) }] }];
      const r = apresModif(p, mobile(p), prog, `répéter ${n} fois`, `répéter ${m} fois`, pick(Q_PAS));
      if (!r) return null;
      return {
        text: r.text,
        ...repNombre(r.st.dist),
        explanation: explTrace("le nombre de répétitions est un paramètre de la boucle.", `la boucle tourne maintenant ${m} fois au lieu de ${n}.`, r.st.trace, `le lutin parcourt ${r.st.dist} pas.`),
        canvas: canvasProg("Paramètre de boucle", prog),
      };
    }
    const c = pick(CTX);
    const f = finir([{ k: "set", v: c.v, e: entre(...c.depart) }, { k: "rep", n, corps: [{ k: "add", v: c.v, n: entre(...c.pas) }] }], c.v);
    const r = apresModif(p, c.intro(p), f.prog, `répéter ${n} fois`, `répéter ${m} fois`, f.q);
    if (!r) return null;
    return {
      text: r.text,
      ...repNombre(r.st.env[c.v]),
      explanation: explTrace("le nombre de répétitions est un paramètre de la boucle.", `la boucle tourne maintenant ${m} fois au lieu de ${n}.`, r.st.trace, `la réponse est ${r.st.env[c.v]}.`),
      canvas: canvasProg("Paramètre de boucle", f.prog),
    };
  });
}

/** Les polygones réguliers : nom, nombre de côtés (l'angle se calcule : 360 ÷ côtés). */
const POLYGONES: [string, number][] = [
  ["un triangle équilatéral", 3],
  ["un carré", 4],
  ["un pentagone régulier", 5],
  ["un hexagone régulier", 6],
  ["un octogone régulier", 8],
  ["un décagone régulier", 10],
  ["un dodécagone régulier", 12],
];
const tracer = (n: number, c: number): Ins[] => [{ k: "stylo" }, { k: "rep", n, corps: [{ k: "avancer", n: c }, { k: "tourner", n: 360 / n }] }];

/** ★3 — passer d'un polygone à un autre : quels paramètres changer ? */
function genParamPolygone() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const [nom1, n1] = pick(POLYGONES);
    const [nom2, n2] = pick(POLYGONES);
    if (n1 === n2) return null;
    const c = 10 * entre(3, 8);
    const prog = tracer(n1, c);
    const t1 = 360 / n1, t2 = 360 / n2;
    const ch = (n: number, t: number) => `répéter ${n} fois, tourner de ${t}°`;
    const choix = propositions(ch(n2, t2), [ch(n2, t1), ch(n1, t2), ch(n2, 180 - t2), ch(n2 * 2, t2 / 2)].filter((x) => !x.includes(".")));
    if (!choix) return null;
    return {
      text: `${p.nom} trace ${nom1} avec ${progTxt(prog)}. ${p.f ? "Elle" : "Il"} veut maintenant tracer ${nom2}. ${pick(["Quels paramètres faut-il mettre ?", "Que faut-il écrire dans les blocs ?", "Quels nombres faut-il choisir ?"])}`,
      ...repQcm(ch(n2, t2), choix),
      explanation: expl(
        "pour tracer un polygone régulier, on répète « avancer, tourner » autant de fois qu’il a de côtés ; les angles tournés font un tour complet : 360°.",
        "nombre de répétitions = nombre de côtés ; angle = 360° ÷ nombre de côtés.",
        `${nom2.replace(/^un /, "le ")} a ${n2} côtés : on répète ${n2} fois et on tourne de 360° ÷ ${n2} = ${t2}°.`,
        `il faut « ${ch(n2, t2)} ».`
      ),
      canvas: canvasProg(`Tracer ${nom1}`, prog),
    };
  });
}

/** ★4 — changer un coefficient dans une formule. */
function genParamCoefficient() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const L = pick(LETTRES);
    const r = pick(RES);
    const k1 = entre(2, 9);
    const k2 = entre(2, 9);
    if (k1 === k2) return null;
    const avecAjout = Math.random() < 0.5;
    const prog: Ins[] = [{ k: "set", v: r, e: E(k1, "×", L) }, ...(avecAjout ? [{ k: "add", v: r, n: entre(1, 9) } as Ins] : []), { k: "direv", v: r }];
    const x = entre(2, 12);
    const res = apresModif(p, introCalcul(p), prog, { k: "set", v: r, e: E(k1, "×", L) }, { k: "set", v: r, e: E(k2, "×", L) }, pick(Q_SORTIE), { [L]: x });
    if (!res) return null;
    const out = Number(res.st.dits[0]);
    return {
      text: res.text,
      ...repNombre(out),
      explanation: explTrace("un paramètre peut être un nombre dans une formule : ici, le coefficient de la multiplication.", `on utilise le nouveau coefficient ${k2} avec ${L} = ${x}.`, res.st.trace, `le lutin dit ${out}.`),
      canvas: canvasProg("Changer un coefficient", prog, { [L]: x }),
    };
  });
}

/** ★4 — changer ce qu'une boucle ajoute. */
function genParamAjout() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const c = pick(CTX);
    const v = c.v;
    const b1 = entre(...c.pas);
    const b2 = entre(...c.pas) + entre(0, 3);
    if (b1 === b2) return null;
    const n = entre(2, 6);
    const f = finir([{ k: "set", v, e: entre(...c.depart) }, { k: "rep", n, corps: [{ k: "add", v, n: b1 }] }], v);
    const r = apresModif(p, c.intro(p), f.prog, { k: "add", v, n: b1 }, { k: "add", v, n: b2 }, f.q);
    if (!r) return null;
    return {
      text: r.text,
      ...repNombre(r.st.env[v]),
      explanation: explTrace("changer un paramètre modifie l’effet du bloc à chaque tour de boucle.", `chaque tour ajoute maintenant ${b2} au lieu de ${b1}.`, r.st.trace, `la réponse est ${r.st.env[v]}.`),
      canvas: canvasProg("Modifier un paramètre", f.prog),
    };
  });
}

/* ----- algo_test_condition ----- */

/** Les façons de demander si un test est vrai (oui / non, ou vrai / faux). */
const TOURNURES_VRAI = [
  (c: string) => ({ q: `La condition “${c}” est-elle vraie ?`, oui: "oui", non: "non" }),
  (c: string) => ({ q: `Le test “${c}” donne-t-il vrai ou faux ?`, oui: "vrai", non: "faux" }),
  (c: string) => ({ q: `Vrai ou faux : “${c}” ?`, oui: "vrai", non: "faux" }),
  (c: string) => ({ q: `Le programme teste “${c}”. Ce test est-il réussi ?`, oui: "oui", non: "non" }),
];

/** Un seuil proche de la valeur, souvent ÉGAL (pour travailler le strict). */
const seuilPres = (x: number, b: number) => Math.max(0, pick([x, x, x - 1, x + 1, x - b, x + b, x + 2 * b]));

/** Le message du « alors » : le succès pour « > », l'effort pour « < ». */
const messagesSi = (c: Ctx, op: Cmp): [string, string] => (op === "<" ? [c.lo, c.hi] : [c.hi, c.lo]);

const donneeVar = (v: string, x: number) => pick([`La variable ${v} vaut ${x}.`, `${v} vaut ${x}.`, `À cet instant, ${v} vaut ${x}.`]);

/** ★2 — une comparaison : vraie ou fausse ? */
function genTestVrai() {
  const c = pick(CTX);
  const p = pick(PRENOMS);
  const x = entre(c.depart[0], c.depart[1] + 5);
  const op = pick<Cmp>([">", ">", "<", "<", "="]);
  const s = seuilPres(x, entre(...c.pas));
  const cond: Cond = { v: c.v, op, s };
  const ok = vraie(cond, { [c.v]: x });
  const t = pick(TOURNURES_VRAI)(condTxt(cond));
  const bonne = ok ? t.oui : t.non;
  return {
    text: `${c.intro(p)} ${donneeVar(c.v, x)} ${t.q}`,
    ...repQcm(bonne, shuffle([t.oui, t.non])),
    explanation: expl(
      "une condition est un test : elle est vraie ou fausse.",
      `on remplace ${c.v} par sa valeur, puis on compare (« > » et « < » sont stricts : un nombre n’est pas plus grand que lui-même).`,
      `${x} ${op} ${s} est ${ok ? "vrai" : "faux"}.`,
      `la réponse est « ${bonne} ».`
    ),
    canvas: canvasProg("Tester une condition", [{ k: "si", c: cond, alors: [{ k: "dire", t: messagesSi(c, op)[0] }] }], { [c.v]: x }),
  };
}

/** ★2 — le bloc du « si » est-il exécuté ? (le lutin parle-t-il ?) */
function genTestExecute() {
  const c = pick(CTX);
  const p = pick(PRENOMS);
  const x = entre(c.depart[0], c.depart[1] + 5);
  const op = pick<Cmp>([">", "<", "="]);
  const s = seuilPres(x, entre(...c.pas));
  const msg = messagesSi(c, op)[0];
  const prog: Ins[] = [{ k: "set", v: c.v, e: x }, { k: "si", c: { v: c.v, op, s }, alors: [{ k: "dire", t: msg }] }];
  const st = executer(prog);
  const parle = st.dits.length > 0;
  const oui = Math.random() < 0.5;
  const q = oui ? `Le lutin dit-il “${msg}” ?` : pick(Q_MSG);
  const bonne = oui ? (parle ? "oui" : "non") : parle ? msg : RIEN;
  return {
    text: `${c.intro(p)} ${presenter(prog)} ${q}`,
    ...repQcm(bonne, oui ? shuffle(["oui", "non"]) : shuffle([msg, RIEN])),
    explanation: explTrace(
      "le bloc « si … alors » n’exécute ce qu’il contient que si la condition est vraie.",
      "on calcule la valeur de la variable, puis on teste la condition.",
      st.trace,
      `la réponse est « ${bonne} ».`
    ),
    canvas: canvasProg("Si … alors", prog),
  };
}

/** ★3 — la valeur finale d'une variable après un « si » (parfois « si … sinon »). */
function genTestVariable() {
  return tirer(() => {
    const c = pick(CTX);
    const p = pick(PRENOMS);
    const v = c.v;
    const a = entre(...c.depart);
    const b = entre(...c.pas);
    const avant: Ins[] = Math.random() < 0.4 ? [{ k: "add", v, n: entre(...c.pas) }] : [];
    const x = executer([{ k: "set", v, e: a }, ...avant]).env[v];
    const op = pick<Cmp>([">", "<", "="]);
    const cond: Cond = { v, op, s: seuilPres(x, b) };
    const sinon: Ins[] | undefined = Math.random() < 0.4 ? [pick<Ins>([{ k: "set", v, e: 0 }, { k: "add", v, n: 1 }, { k: "set", v, e: E(v, "−", 1) }])] : undefined;
    const f = finir([{ k: "set", v, e: a }, ...avant, { k: "si", c: cond, alors: [modifier(v, b)], ...(sinon ? { sinon } : {}) }], v);
    const st = executer(f.prog);
    if (!plausible(st)) return null;
    return {
      text: `${c.intro(p)} ${presenter(f.prog)} ${f.q}`,
      ...repNombre(st.env[v]),
      explanation: explTrace(
        "une condition décide si un bloc est exécuté ou sauté.",
        "on suit la variable jusqu’au test, on regarde si la condition est vraie, puis on continue.",
        st.trace,
        `la réponse est ${st.env[v]}.`
      ),
      canvas: canvasProg("Condition et variable", f.prog),
    };
  });
}

/** ★3 — tester une propriété : pair, impair, multiple de… */
function genTestParite() {
  const c = pick(CTX);
  const p = pick(PRENOMS);
  const x = entre(2, 60);
  const cond: Cond = pick<Cond>([{ v: c.v, pair: true }, { v: c.v, pair: false }, { v: c.v, mult: pick([3, 5, 10]) }]);
  const ok = vraie(cond, { [c.v]: x });
  if (Math.random() < 0.5) {
    const t = pick(TOURNURES_VRAI)(condTxt(cond));
    const bonne = ok ? t.oui : t.non;
    return {
      text: `${c.intro(p)} ${donneeVar(c.v, x)} ${t.q}`,
      ...repQcm(bonne, shuffle([t.oui, t.non])),
      explanation: expl(
        "une condition peut tester une propriété d’un nombre.",
        "un nombre pair est un multiple de 2 ; un multiple de 5 se termine par 0 ou 5 ; un multiple de 10 se termine par 0 ; pour 3, on divise.",
        `${x} ${ok ? "vérifie" : "ne vérifie pas"} « ${condTxt(cond).replace(`${c.v} `, "")} ».`,
        `la réponse est « ${bonne} ».`
      ),
      canvas: canvasProg("Tester une propriété", [{ k: "si", c: cond, alors: [{ k: "dire", t: c.hi }] }], { [c.v]: x }),
    };
  }
  const prog: Ins[] = [{ k: "set", v: c.v, e: x }, { k: "si", c: cond, alors: [{ k: "dire", t: c.hi }], sinon: [{ k: "dire", t: c.lo }] }];
  const st = executer(prog);
  return {
    text: `${c.intro(p)} ${presenter(prog)} ${pick(Q_MSG)}`,
    ...repQcm(st.dits[0], shuffle([c.hi, c.lo])),
    explanation: explTrace(
      "une condition peut tester une propriété d’un nombre : pair, impair, multiple de…",
      "on regarde si le nombre a la propriété, puis on exécute le « alors » ou le « sinon ».",
      st.trace,
      `le lutin dit “${st.dits[0]}”.`
    ),
    canvas: canvasProg("Tester une propriété", prog),
  };
}

/** ★3 — « si … alors … sinon … » : quel message ? */
function genTestSinon() {
  const c = pick(CTX);
  const p = pick(PRENOMS);
  const x = entre(c.depart[0], c.depart[1] + 5);
  const op = pick<Cmp>([">", "<", "="]);
  const s = seuilPres(x, entre(...c.pas));
  const [m1, m2] = messagesSi(c, op);
  const donnee = Math.random() < 0.5;
  const si: Ins = { k: "si", c: { v: c.v, op, s }, alors: [{ k: "dire", t: m1 }], sinon: [{ k: "dire", t: m2 }] };
  const prog: Ins[] = donnee ? [si] : [{ k: "set", v: c.v, e: x }, si];
  const st = executer(prog, donnee ? { [c.v]: x } : {});
  return {
    text: `${c.intro(p)} ${donnee ? `${donneeVar(c.v, x)} ` : ""}${presenter(prog)} ${pick(Q_MSG)}`,
    ...repQcm(st.dits[0], shuffle([m1, m2])),
    explanation: explTrace(
      "avec « si … alors … sinon », le programme fait l’un OU l’autre, jamais les deux.",
      "on teste la condition : vraie, on fait le « alors » ; fausse, on fait le « sinon ».",
      st.trace,
      `le lutin dit “${st.dits[0]}”.`
    ),
    canvas: canvasProg("Si … sinon", prog, donnee ? { [c.v]: x } : {}),
  };
}

/** ★4 — une condition qui décide d'un déplacement. */
function genTestDeplacement() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const v = pick(["énergie", "batterie", "carburant", "vitesse"]);
    const x = entre(1, 20);
    const op = pick<Cmp>([">", "<"]);
    const s = seuilPres(x, entre(1, 4));
    const a = 10 * entre(1, 6);
    const b = 10 * entre(1, 9);
    const sinon: Ins[] | undefined = Math.random() < 0.5 ? [{ k: "avancer", n: 5 * entre(1, 6) }] : Math.random() < 0.5 ? [{ k: "tourner", n: 90 }] : undefined;
    if (sinon && sinon[0].k === "avancer" && sinon[0].n === b) return null;
    const prog: Ins[] = [{ k: "avancer", n: a }, { k: "si", c: { v, op, s }, alors: [{ k: "avancer", n: b }], ...(sinon ? { sinon } : {}) }];
    if (Math.random() < 0.4) prog.push({ k: "avancer", n: 5 * entre(1, 8) });
    const st = executer(prog, { [v]: x });
    return {
      text: `${mobile(p)} ${pick([`La variable ${v} vaut ${x}.`, `Au départ, ${v} vaut ${x}.`])} ${presenter(prog)} ${pick(Q_PAS)}`,
      ...repNombre(st.dist),
      explanation: explTrace(
        "un bloc conditionnel peut déclencher, ou non, un déplacement.",
        `on teste la condition avec ${v} = ${x}, puis on additionne seulement les « avancer » exécutés.`,
        st.trace,
        `le lutin parcourt ${st.dist} pas.`
      ),
      canvas: canvasProg("Condition et déplacement", prog, { [v]: x }),
    };
  });
}

/* ----- algo_boucle ----- */

/** ★2 — la distance parcourue avec une boucle. */
function genBoucleDistance() {
  const p = pick(PRENOMS);
  const n = entre(2, 8);
  const a = 5 * entre(2, 12);
  const corps: Ins[] = Math.random() < 0.6 ? [{ k: "avancer", n: a }] : [{ k: "avancer", n: a }, { k: "tourner", n: pick([45, 60, 90, 120]) }];
  const prog: Ins[] = [...(Math.random() < 0.3 ? [{ k: "avancer", n: 5 * entre(2, 8) } as Ins] : []), { k: "rep", n, corps }];
  const st = executer(prog);
  return {
    text: `${mobile(p)} ${presenter(prog)} ${pick(Q_PAS)}`,
    ...repNombre(st.dist),
    explanation: explTrace(
      "une boucle « répéter n fois » exécute n fois les blocs qu’elle contient.",
      "on multiplie la distance d’un tour par le nombre de tours, sans oublier les blocs hors de la boucle.",
      st.trace,
      `le lutin parcourt ${st.dist} pas.`
    ),
    canvas: canvasProg("Distance avec une boucle", prog),
  };
}

/** ★3 — une variable qui augmente à chaque tour. */
function genBoucleCompteur() {
  return tirer(() => {
    const c = pick(CTX);
    const p = pick(PRENOMS);
    const v = c.v;
    const d = Math.random() < 0.5 ? 0 : entre(...c.depart);
    const f = finir([{ k: "set", v, e: d }, { k: "rep", n: entre(2, 7), corps: [{ k: "add", v, n: entre(...c.pas) }] }], v);
    const st = executer(f.prog);
    if (!plausible(st)) return null;
    return {
      text: `${c.intro(p)} ${presenter(f.prog)} ${f.q}`,
      ...repNombre(st.env[v]),
      explanation: explTrace(
        "une boucle répète les blocs qu’elle contient : la variable change à chaque tour.",
        "on part de la valeur de départ, puis on ajoute autant de fois qu’il y a de tours.",
        st.trace,
        `la réponse est ${st.env[v]}.`
      ),
      canvas: canvasProg("Boucle et variable", f.prog),
    };
  });
}

const Q_COMBIEN_REP = ["Combien de fois faut-il répéter la boucle ?", "Quel nombre faut-il écrire dans « répéter … fois » ?", "Combien de tours de boucle faut-il ?"];

/** ★3 — retrouver le nombre de répétitions. */
function genBoucleRetrouver() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const n = entre(2, 9);
    if (Math.random() < 0.5) {
      const a = 5 * entre(2, 10);
      const T = n * a;
      return {
        text: `${mobile(p)} Le lutin doit parcourir ${T} pas en tout. Chaque tour de boucle contient « avancer de ${a} pas ». ${pick(Q_COMBIEN_REP)}`,
        ...repNombre(n),
        explanation: expl(
          "une boucle répète la même instruction un nombre de fois choisi.",
          "on divise la distance totale par la distance d’un tour.",
          `${T} ÷ ${a} = ${n}.`,
          `il faut répéter ${n} fois.`
        ),
      };
    }
    const c = pick(CTX);
    const d = entre(...c.depart);
    const b = entre(...c.pas);
    const T = d + n * b;
    if (T > 999) return null;
    return {
      text: `${c.intro(p)} Au départ, la variable ${c.v} vaut ${d}. Chaque tour de boucle fait « ajouter ${b} à ${c.v} ». On veut que ${c.v} arrive à ${T}. ${pick(Q_COMBIEN_REP)}`,
      ...repNombre(n),
      explanation: expl(
        "chaque tour de boucle ajoute la même quantité.",
        "on calcule ce qu’il faut ajouter en tout, puis on divise par l’ajout d’un tour.",
        `il faut ajouter ${T} − ${d} = ${T - d} ; ${T - d} ÷ ${b} = ${n}.`,
        `il faut répéter ${n} fois.`
      ),
    };
  });
}

/** ★3 — le lutin parle dans la boucle : combien de fois, quel dernier nombre ? */
function genBoucleParler() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const n = entre(2, 7);
    if (Math.random() < 0.5) {
      const m = pick(MESSAGES);
      const avant = Math.random() < 0.4;
      const prog: Ins[] = [...(avant ? [{ k: "dire", t: m } as Ins] : []), { k: "rep", n, corps: [{ k: "dire", t: m }, { k: "avancer", n: 5 * entre(2, 8) }] }];
      const st = executer(prog);
      const nb = st.dits.filter((d) => d === m).length;
      return {
        text: `${mobile(p)} ${presenter(prog)} Combien de fois le lutin dit-il “${m}” ?`,
        ...repNombre(nb),
        explanation: explTrace(
          "les blocs dans la boucle sont exécutés à chaque tour ; ceux hors de la boucle, une seule fois.",
          "on compte les tours, puis les blocs hors de la boucle.",
          [`la boucle fait ${n} tours, avec un “${m}” à chaque tour${avant ? ", plus un “" + m + "” avant la boucle" : ""}`],
          `le lutin dit “${m}” ${nb} fois.`
        ),
        canvas: canvasProg("Parler dans une boucle", prog),
      };
    }
    const c = pick(CTX);
    const prog: Ins[] = [{ k: "set", v: c.v, e: entre(...c.depart) }, { k: "rep", n, corps: [{ k: "add", v: c.v, n: entre(...c.pas) }, { k: "direv", v: c.v }] }];
    const st = executer(prog);
    if (!plausible(st)) return null;
    const dernier = Number(st.dits[st.dits.length - 1]);
    return {
      text: `${c.intro(p)} ${presenter(prog)} ${pick(Q_DIT)}`,
      ...repNombre(dernier),
      explanation: explTrace(
        "le lutin parle à chaque tour : il dit la valeur du moment.",
        "on suit la variable tour après tour ; le dernier nombre dit est celui du dernier tour.",
        st.trace,
        `le dernier nombre dit est ${dernier}.`
      ),
      canvas: canvasProg("Parler dans une boucle", prog),
    };
  });
}

/** ★4 — les polygones réguliers : combien de répétitions, quel angle, quelle figure ? */
function genBouclePolygone() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const [nom, n] = pick(POLYGONES);
    const forme = entre(0, 2);
    const expliquer = expl(
      "pour tracer un polygone régulier, on répète « avancer, tourner » autant de fois qu’il a de côtés.",
      "à la fin, le lutin a fait un tour complet : les angles tournés font 360° en tout.",
      `${nom.replace(/^un /, "le ")} a ${n} côtés : ${n} répétitions, et 360° ÷ ${n} = ${360 / n}° à chaque tour.`,
      forme === 0 ? `il faut répéter ${n} fois.` : forme === 1 ? `le lutin tourne de ${360 / n}°.` : `le programme trace ${nom}.`
    );
    if (forme === 0)
      return {
        text: `${p.nom} programme son lutin. Pour tracer ${nom}, combien de fois faut-il répéter « avancer, puis tourner » ?`,
        ...repNombre(n),
        explanation: expliquer,
      };
    if (forme === 1)
      return {
        text: `${p.nom} programme son lutin. Pour tracer ${nom} avec une boucle, de combien de degrés le lutin doit-il tourner à chaque tour ?`,
        ...repNombre(360 / n),
        explanation: expliquer,
      };
    const prog = tracer(n, 10 * entre(3, 8));
    const autres = POLYGONES.filter(([, k]) => k !== n).map(([x]) => x);
    const choix = propositions(nom, autres);
    if (!choix) return null;
    return {
      text: `${p.nom} lance ${progTxt(prog)}. Quelle figure le lutin trace-t-il ?`,
      ...repQcm(nom, choix),
      explanation: expliquer,
      canvas: canvasProg("Quelle figure ?", prog),
    };
  });
}

/* ----- algo_construire_defi (écrire, compléter, déboguer) ----- */

/** Le programme écrit avec un « ? » à la place d'un nombre. */
const avecTrou = (p: Ins[], vrai: string, trou: string) => progTxt(p).replace(vrai, trou);

/** ★4 — compléter un programme pour atteindre un objectif. */
function genCDCompleter() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const n = entre(2, 8);
    if (Math.random() < 0.35) {
      const a = 5 * entre(2, 10);
      const prog: Ins[] = [{ k: "rep", n, corps: [{ k: "avancer", n: a }] }];
      const T = n * a;
      return {
        text: `${mobile(p)} Le lutin doit parcourir ${T} pas en tout. Complète le programme : ${avecTrou(prog, `répéter ${n} fois`, "répéter ? fois")}. ${pick(["Quel nombre faut-il écrire à la place du point d’interrogation ?", "Quel nombre remplace le « ? » ?"])}`,
        ...repNombre(n),
        explanation: expl("compléter un programme, c’est trouver le paramètre qui atteint l’objectif.", "on divise la distance voulue par la distance d’un tour.", `${T} ÷ ${a} = ${n}.`, `il faut écrire ${n}.`),
      };
    }
    const c = pick(CTX);
    const v = c.v;
    const d = entre(...c.depart);
    const b = entre(...c.pas);
    const prog: Ins[] = [{ k: "set", v, e: d }, { k: "rep", n, corps: [{ k: "add", v, n: b }] }];
    const T = d + n * b;
    if (T > 999) return null;
    const trou = entre(0, 2);
    const [vrai, faux, rep, calcul] =
      trou === 0 ? [`répéter ${n} fois`, "répéter ? fois", n, `il faut ajouter ${T} − ${d} = ${T - d}, et ${T - d} ÷ ${b} = ${n}.`]
      : trou === 1 ? [`ajouter ${b} à ${v}`, `ajouter ? à ${v}`, b, `il faut ajouter ${T} − ${d} = ${T - d} en ${n} tours : ${T - d} ÷ ${n} = ${b}.`]
      : [`mettre ${v} à ${d}`, `mettre ${v} à ?`, d, `la boucle ajoute ${n} × ${b} = ${n * b} ; on part donc de ${T} − ${n * b} = ${d}.`];
    return {
      text: `${c.intro(p)} À la fin, la variable ${v} doit valoir ${T}. Complète le programme : ${avecTrou(prog, vrai as string, faux as string)}. ${pick(["Quel nombre faut-il écrire à la place du point d’interrogation ?", "Quel nombre remplace le « ? » ?"])}`,
      ...repNombre(rep as number),
      explanation: expl("compléter un programme, c’est trouver le nombre qui atteint l’objectif.", "on part de l’objectif et on remonte le programme.", calcul as string, `il faut écrire ${rep}.`),
    };
  });
}

/** ★4 — choisir le programme qui atteint l'objectif. */
function genCDChoisir() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const c = pick(CTX);
    const v = c.v;
    const d = entre(...c.depart);
    const b = entre(...c.pas);
    const n = entre(2, 6);
    const T = d + n * b;
    const P = (d0: number, n0: number, b0: number): Ins[] => [{ k: "set", v, e: d0 }, { k: "rep", n: n0, corps: [{ k: "add", v, n: b0 }] }];
    const bon = progTxt(P(d, n, b));
    const leurres = [P(d, n + 1, b), P(d, n - 1, b), P(d, n, b + 1), P(d + b, n, b), P(0, n, b), P(d, b, n)]
      .filter((x) => executer(x).env[v] !== T)
      .map(progTxt);
    const choix = propositions(bon, leurres);
    if (!choix || T > 999) return null;
    return {
      text: `${c.intro(p)} Objectif : à la fin, la variable ${v} doit valoir ${T}. ${pick(["Quel programme atteint l’objectif ?", "Quel programme faut-il choisir ?", "Lequel de ces programmes convient ?"])}`,
      ...repQcm(bon, choix),
      explanation: expl(
        "pour choisir un programme, on l’exécute dans sa tête et on compare avec l’objectif.",
        "valeur finale = valeur de départ + nombre de tours × ce qu’on ajoute à chaque tour.",
        `${d} + ${n} × ${b} = ${T}.`,
        `le bon programme est ${bon}.`
      ),
    };
  });
}

/** ★5 — trouver l'instruction fausse dans le tracé d'un polygone. */
function genCDErreurPolygone() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const [nom, n] = pick(POLYGONES);
    const c = 10 * entre(3, 8);
    const angleFaux = Math.random() < 0.6;
    const r = angleFaux ? n : pick([n - 1, n + 1, n + 2].filter((k) => k >= 3));
    const t = angleFaux ? pick([30, 36, 45, 60, 72, 90, 120].filter((x) => x !== 360 / n)) : 360 / n;
    const prog: Ins[] = [{ k: "stylo" }, { k: "rep", n: r, corps: [{ k: "avancer", n: c }, { k: "tourner", n: t }] }];
    const fautive = angleFaux ? `tourner de ${t}°` : `répéter ${r} fois`;
    return {
      text: `${p.nom} veut tracer ${nom}. ${presenter(prog)} Le dessin n’est pas le bon. ${pick(["Quelle instruction pose problème ?", "Quel bloc faut-il corriger ?", "Où est l’erreur ?"])}`,
      ...repQcm(fautive, shuffle([`répéter ${r} fois`, `tourner de ${t}°`, `avancer de ${c} pas`, "stylo en position d’écriture"])),
      explanation: expl(
        "pour tracer un polygone régulier : autant de répétitions que de côtés, et un angle de 360° ÷ nombre de côtés.",
        "on compare chaque nombre du programme avec ce qu’il faudrait.",
        `${nom.replace(/^un /, "le ")} a ${n} côtés : il faut répéter ${n} fois et tourner de ${360 / n}°. Le programme ${angleFaux ? `tourne de ${t}°` : `répète ${r} fois`}.`,
        `l’instruction à corriger est « ${fautive} ».`
      ),
      canvas: canvasProg("Trouver l’erreur", prog),
    };
  });
}

/** ★5 — tester un programme faux : que dit-il VRAIMENT ? */
function genCDTester() {
  return tirer(() => {
    const p = pick(PRENOMS);
    const L = pick(["n", "x", "a", "nombre"]);
    const k = entre(2, 5);
    const b = entre(1, 9);
    const formes: { but: Expr; bug: Ins[] }[] = [
      { but: E(E(k, "×", L), "+", b), bug: [{ k: "add", v: L, n: b }, { k: "set", v: L, e: E(L, "×", k) }] },
      { but: E(E(L, "+", b), "×", k), bug: [{ k: "set", v: L, e: E(L, "×", k) }, { k: "add", v: L, n: b }] },
      { but: E(E(k, "×", L), "−", b), bug: [{ k: "set", v: L, e: E(L, "−", b) }, { k: "set", v: L, e: E(L, "×", k) }] },
      { but: E(E(L, "×", k), "+", b), bug: [{ k: "add", v: L, n: b }, { k: "set", v: L, e: E(L, "×", k) }] },
      { but: E(E(L, "×", 2), "+", b), bug: [{ k: "add", v: L, n: b }, { k: "add", v: L, n: 2 }] },
    ];
    const F = pick(formes);
    const prog: Ins[] = [{ k: "demander", t: "Choisis un nombre." }, { k: "set", v: L, e: "réponse" }, ...F.bug, { k: "direv", v: L }];
    const r = entre(b + 1, 12);
    const st = executer(prog, {}, [r]);
    if (!plausible(st)) return null;
    const out = Number(st.dits[0]);
    const voulu = evalE(F.but, { [L]: r });
    if (out === voulu) return null;
    let q = pick(PRENOMS);
    while (q.nom === p.nom) q = pick(PRENOMS);
    return {
      text: `Le programme ${deNom(p.nom)} doit dire ${exprTxt(F.but)}, où ${L} est le nombre tapé. ${presenter(prog)} ${q.nom} tape ${r}. Quel nombre le lutin dit-il vraiment ?`,
      ...repNombre(out),
      explanation: explTrace(
        "tester un programme, c’est l’exécuter avec une valeur simple et comparer avec ce qu’il devrait faire.",
        `on suit les blocs avec ${L} = ${r}, puis on compare avec ${exprTxt(F.but, { [L]: r })} = ${voulu}.`,
        st.trace,
        `le lutin dit ${out}, et pas ${voulu} : le programme est faux.`
      ),
      canvas: canvasProg("Le programme à tester", prog),
    };
  });
}

/** ★4 — suivre deux variables : chaque bloc utilise les valeurs DU MOMENT. */
function genSeqTrace() {
  return tirer(() => {
    const P = pick(PAIRES);
    const p = pick(PRENOMS);
    const { a, b } = P;
    const va = entre(2, 9);
    const vb = entre(2, 9);
    const k = entre(2, 3);
    const n = entre(1, 6);
    const etapes: Ins[] = shuffle<Ins>([
      { k: "set", v: a, e: E(a, "+", b) },
      { k: "set", v: b, e: E(a, "×", k) },
      { k: "set", v: b, e: E(b, "−", a) },
      { k: "set", v: a, e: E(b, "+", n) },
      { k: "add", v: b, n },
      { k: "set", v: b, e: E(a, "+", b) },
    ]).slice(0, entre(2, 3));
    const prog: Ins[] = [{ k: "set", v: a, e: va }, { k: "set", v: b, e: vb }, ...etapes];
    // Les deux variables doivent bouger (sinon la question est sans intérêt).
    if (!etapes.some((i) => "v" in i && i.v === a) || !etapes.some((i) => "v" in i && i.v === b)) return null;
    const cible = pick([a, b]);
    const f = finir(prog, cible);
    const st = executer(f.prog);
    if (!plausible(st)) return null;
    const fin = st.env[cible];
    return {
      text: `${P.intro(p)} ${presenter(f.prog)} ${f.q}`,
      ...repNombre(fin),
      explanation: explTrace(
        "chaque bloc utilise la valeur des variables AU MOMENT où il est exécuté.",
        "on note la valeur de chaque variable après chaque bloc, dans l’ordre.",
        st.trace,
        `la réponse est ${fin}.`
      ),
      canvas: canvasProg("Suivre deux variables", f.prog),
    };
  });
}

export const algorithmiqueBank: TutorBankItemV4[] = [
  /* =========================
     ALGO_SEQUENCE
  ========================= */

  {
    kind: "fixed",
    id: "5e_algo_sequence_fixed_1_definition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 1,
    theme: "neutral",
    text: "Dans un programme Scratch, les blocs sont exécutés...",
    format: "qcm",
    choices: [
      "dans l’ordre, de haut en bas",
      "au hasard",
      "seulement si l’élève clique dessus",
      "toujours en même temps",
    ],
    expected: ["dans l’ordre, de haut en bas"],
    comparator: "mcq_exact",
    hint: "Lis les blocs comme une recette.",
    explanation:
      "Définition : une séquence est une suite d’instructions exécutées dans un ordre précis.\n\n" +
      "Méthode : on lit les blocs de haut en bas.\n\n" +
      "Exécution : le premier bloc est exécuté, puis le suivant, puis le suivant.\n\n" +
      "Conclusion : les blocs sont exécutés dans l’ordre.",
    tags: ["algo_programmation", "sequence", "scratch", "qcm"],
    canvas: scratchCanvas("Séquence Scratch", [
      { type: "event" },
      { type: "say", text: "Bonjour" },
      { type: "move", value: 20 },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_sequence_fixed_2_ordre",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 1,
    theme: "neutral",
    text: "Dans ce programme, quelle action est faite en premier après le drapeau vert ?",
    format: "qcm",
    choices: [
      "dire Bonjour",
      "avancer de 20",
      "attendre 1 seconde",
      "tourner de 90°",
    ],
    expected: ["dire Bonjour"],
    comparator: "mcq_exact",
    hint: "Regarde le premier bloc sous le drapeau vert.",
    explanation:
      "Définition : une séquence se lit dans l’ordre.\n\n" +
      "Méthode : on regarde le bloc placé juste après l’événement de départ.\n\n" +
      "Exécution : après le drapeau vert, le premier bloc est “dire Bonjour”.\n\n" +
      "Conclusion : la première action est “dire Bonjour”.",
    tags: ["algo_programmation", "sequence", "ordre", "qcm"],
    canvas: scratchCanvas("Lire l’ordre des blocs", [
      { type: "event" },
      { type: "say", text: "Bonjour" },
      { type: "move", value: 20 },
      { type: "turn", value: 90 },
    ]),
  },

  {
    kind: "template",
    id: "5e_algo_sequence_tpl_1_distance",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les blocs « avancer » ; les autres blocs ne font pas avancer.",
    tags: ["algo_programmation", "sequence", "distance", "template", "canvas"],
    generate: genSeqDistance,
  },

  {
    kind: "template",
    id: "5e_algo_sequence_tpl_2_variable_finale",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Suis la valeur de la variable étape par étape.",
    tags: ["algo_programmation", "sequence", "variable", "template", "canvas"],
    generate: genSeqVariable,
  },

  {
    kind: "fixed",
    id: "5e_algo_sequence_fixed_3_piege_ordre",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : “L’ordre des blocs n’a pas d’importance.” A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Changer l’ordre peut changer le résultat.",
    explanation:
      "Définition : un algorithme suit un ordre précis d’instructions.\n\n" +
      "Méthode : on vérifie si changer l’ordre change le résultat.\n\n" +
      "Exécution : mettre une variable à 0 puis ajouter 5 ne donne pas toujours le même résultat que faire l’inverse.\n\n" +
      "Conclusion : l’ordre des blocs est important.",
    tags: ["algo_programmation", "sequence", "erreur", "qcm"],
    canvas: scratchCanvas("Attention à l’ordre", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 0 },
      { type: "change_variable", variable: "score", value: 5 },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_sequence_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "x vaut 3. Le programme multiplie x par 2, puis ajoute 5 à x. Quelle valeur affiche-t-il ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Fais les blocs dans l’ordre, de haut en bas.",
    explanation:
      "Définition : un programme est une suite d’instructions faites dans l’ordre.\n\n" +
      "Méthode : on fait chaque bloc l’un après l’autre, de haut en bas.\n\n" +
      "Exécution : 3 × 2 = 6, puis 6 + 5 = 11. Dans l’autre ordre, on trouverait (3 + 5) × 2 = 16.\n\n" +
      "Conclusion : le programme affiche 11. L’ordre change le résultat.",
    tags: ["algo_programmation", "sequence", "short", "raisonnement"],
    canvas: scratchCanvas("L’ordre compte", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 3 },
      { type: "set_variable", variable: "x", value: "x × 2" },
      { type: "change_variable", variable: "x", value: 5 },
      { type: "say", text: "x" },
    ]),
  },
    /* =========================
     ALGO_ENTREES_SORTIES
  ========================= */

  {
    kind: "fixed",
    id: "5e_algo_entree_sortie_fixed_1_vocabulaire",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 1,
    theme: "neutral",
    text: "Dans Scratch, le bloc “demander … et attendre” sert principalement à...",
    format: "qcm",
    choices: [
      "recevoir une information de l’utilisateur",
      "faire avancer le lutin",
      "tracer un carré",
      "effacer une variable",
    ],
    expected: ["recevoir une information de l’utilisateur"],
    comparator: "mcq_exact",
    hint: "L’utilisateur écrit une réponse.",
    explanation:
      "Définition : une entrée est une information donnée au programme.\n\n" +
      "Méthode : on repère les blocs qui demandent une réponse à l’utilisateur.\n\n" +
      "Exécution : le bloc “demander … et attendre” récupère une réponse.\n\n" +
      "Conclusion : ce bloc sert à recevoir une entrée.",
    tags: ["algo_programmation", "entree", "sortie", "scratch", "qcm"],
    canvas: scratchCanvas("Entrée utilisateur", [
      { type: "event" },
      { type: "ask", text: "Quel est ton âge ?" },
      { type: "say", text: "Merci !" },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_entree_sortie_fixed_2_sortie",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 1,
    theme: "neutral",
    text: "Dans ce programme, quelle est la sortie affichée par le lutin ?",
    format: "qcm",
    choices: ["Bonjour", "Quel est ton âge ?", "réponse", "score"],
    expected: ["Bonjour"],
    comparator: "mcq_exact",
    hint: "Une sortie est ce que le programme affiche ou dit.",
    explanation:
      "Définition : une sortie est une information donnée par le programme.\n\n" +
      "Méthode : on repère le bloc “dire”.\n\n" +
      "Exécution : le bloc “dire Bonjour” affiche le message “Bonjour”.\n\n" +
      "Conclusion : la sortie affichée est “Bonjour”.",
    tags: ["algo_programmation", "sortie", "dire", "qcm"],
    canvas: scratchCanvas("Sortie affichée", [
      { type: "event" },
      { type: "say", text: "Bonjour" },
    ]),
  },

  {
    kind: "template",
    id: "5e_algo_entree_sortie_tpl_1_variable_reponse",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 2,
    theme: "neutral",
    hint: "La réponse tapée est rangée dans la variable : remplace « réponse » par ce nombre.",
    tags: ["algo_programmation", "entree", "variable", "template", "canvas"],
    generate: genESCalcul,
  },

  {
    kind: "template",
    id: "5e_algo_entree_sortie_tpl_2_sortie_variable",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde quelle variable le bloc « dire » affiche.",
    tags: ["algo_programmation", "sortie", "variable", "template", "canvas"],
    generate: genESDeuxVariables,
  },

  {
    kind: "template",
    id: "5e_algo_entree_sortie_tpl_3_entree_calcul_sortie",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 3,
    theme: "neutral",
    hint: "Le programme prend une entrée, fait un calcul, puis affiche une sortie.",
    tags: ["algo_programmation", "entree", "sortie", "calcul", "template", "canvas"],
    generate: genESCalcul2,
  },

  {
    kind: "fixed",
    id: "5e_algo_entree_sortie_fixed_3_piege_reponse",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 3,
    theme: "neutral",
    text: "Dans Scratch, la “réponse” correspond toujours à...",
    format: "qcm",
    choices: [
      "la dernière valeur saisie par l’utilisateur",
      "la distance parcourue par le lutin",
      "le nombre de blocs du programme",
      "la couleur du stylo",
    ],
    expected: ["la dernière valeur saisie par l’utilisateur"],
    comparator: "mcq_exact",
    hint: "Elle vient du bloc “demander … et attendre”.",
    explanation:
      "Définition : dans Scratch, “réponse” contient ce que l’utilisateur vient de saisir.\n\n" +
      "Méthode : on associe “réponse” au dernier bloc “demander … et attendre”.\n\n" +
      "Exécution : si l’utilisateur écrit 8, alors “réponse” vaut 8.\n\n" +
      "Conclusion : “réponse” correspond à la dernière valeur saisie.",
    tags: ["algo_programmation", "reponse", "entree", "piege", "qcm"],
    canvas: scratchCanvas("Bloc réponse", [
      { type: "event" },
      { type: "ask", text: "Choisis un nombre" },
      { type: "say", text: "réponse" },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_entree_sortie_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Dans ce programme, quel bloc donne la sortie ?",
    format: "qcm",
    choices: ["dire", "demander", "mettre"],
    expected: ["dire"],
    comparator: "mcq_exact",
    hint: "L’entrée vient de l’utilisateur ; la sortie est donnée par le programme.",
    explanation:
      "Définition : une entrée est ce que le programme reçoit ; une sortie est ce qu’il affiche.\n\n" +
      "Méthode : on cherche le bloc qui montre un résultat à l’écran.\n\n" +
      "Exécution : « demander » reçoit l’âge : c’est l’entrée. « dire » affiche le résultat : c’est la sortie.\n\n" +
      "Conclusion : la sortie est donnée par le bloc « dire ».",
    tags: ["algo_programmation", "entree", "sortie", "qcm", "vocabulaire"],
    canvas: scratchCanvas("Entrée et sortie", [
      { type: "event" },
      { type: "ask", text: "Quel est ton âge ?" },
      { type: "set_variable", variable: "âge", value: "réponse" },
      { type: "say", text: "âge + 1" },
    ]),
  },
    /* =========================
     ALGO_FORMULE_BLOCS
  ========================= */

  {
    kind: "fixed",
    id: "5e_algo_formule_bloc_fixed_1_definition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_formule_bloc",
    difficulty: 2,
    theme: "neutral",
    text: "Dans Scratch, une formule comme x + 5 peut être représentée avec...",
    format: "qcm",
    choices: [
      "un bloc opérateur",
      "un bloc avancer seulement",
      "un bloc stylo seulement",
      "un bloc tourner seulement",
    ],
    expected: ["un bloc opérateur"],
    comparator: "mcq_exact",
    hint: "Les calculs utilisent souvent les blocs verts.",
    explanation:
      "Définition : une formule peut être traduite avec des blocs de calcul.\n\n" +
      "Méthode : on utilise un bloc opérateur pour représenter une addition, une soustraction, une multiplication ou une division.\n\n" +
      "Exécution : x + 5 se représente avec un bloc opérateur contenant x, + et 5.\n\n" +
      "Conclusion : on utilise un bloc opérateur.",
    tags: ["algo_programmation", "formule", "operateur", "scratch", "qcm"],
    canvas: scratchCanvas("Formule en blocs", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 7 },
      { type: "operator", left: "x", operator: "+", right: 5 },
    ]),
  },

  {
    kind: "template",
    id: "5e_algo_formule_bloc_tpl_1_addition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_formule_bloc",
    difficulty: 2,
    theme: "neutral",
    hint: "Traduis la formule en opération.",
    tags: ["algo_programmation", "formule", "addition", "template"],
    generate: genFormuleAddition,
  },

  {
    kind: "template",
    id: "5e_algo_formule_bloc_tpl_2_multiplication",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_formule_bloc",
    difficulty: 2,
    theme: "neutral",
    hint: "Doubler, c’est multiplier par 2 ; tripler, c’est multiplier par 3.",
    tags: ["algo_programmation", "formule", "multiplication", "template"],
    generate: genFormuleMultiplication,
  },

  {
    kind: "template",
    id: "5e_algo_formule_bloc_tpl_3_formule_rectangle",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_formule_bloc",
    difficulty: 3,
    theme: "neutral",
    hint: "Rappelle-toi la formule (aire, périmètre…), puis écris-la avec la lettre.",
    tags: ["algo_programmation", "formule", "aire", "rectangle", "template"],
    generate: genFormuleGeo,
  },

  {
    kind: "template",
    id: "5e_algo_formule_bloc_tpl_4_programme_de_calcul",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_formule_bloc",
    difficulty: 3,
    theme: "neutral",
    hint: "Traduis chaque instruction par une opération.",
    tags: ["algo_programmation", "formule", "programme_calcul", "template"],
    generate: genFormuleDeuxEtapes,
  },

  {
    kind: "fixed",
    id: "5e_algo_formule_bloc_fixed_2_piege_ordre",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_formule_bloc",
    difficulty: 3,
    theme: "neutral",
    text:
      "Un programme prend x, ajoute 3, puis multiplie le résultat par 2. La formule est-elle x + 3 × 2 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "On multiplie tout le résultat obtenu après l’ajout de 3.",
    explanation:
      "Définition : une formule doit respecter l’ordre du programme.\n\n" +
      "Méthode : on utilise des parenthèses quand toute une expression est réutilisée.\n\n" +
      "Exécution : on calcule d’abord x + 3, puis on multiplie ce résultat par 2. La formule est donc (x + 3) × 2.\n\n" +
      "Conclusion : x + 3 × 2 ne représente pas le programme.",
    tags: ["algo_programmation", "formule", "erreur", "ordre", "qcm"],
    canvas: scratchCanvas("Attention à l’ordre", [
      { type: "event" },
      { type: "operator", left: "x", operator: "+", right: 3 },
      { type: "operator", left: "x + 3", operator: "×", right: 2 },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_formule_bloc_open_1_methode",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_formule_bloc",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Programme : choisir x, multiplier par 3, puis ajouter 5. Écris la formule du résultat.",
    format: "short",
    expected: ["3x + 5", "3 × x + 5"],
    comparator: "expression_equivalente",
    hint: "Il faut suivre les instructions dans l’ordre.",
    explanation:
      "Définition : traduire un programme en formule, c’est écrire ses calculs avec la lettre x.\n\n" +
      "Méthode : on part de x et on écrit les opérations dans l’ordre.\n\n" +
      "Exécution : x multiplié par 3 donne 3 × x. On ajoute 5 : 3 × x + 5, soit 3x + 5.\n\n" +
      "Conclusion : la formule est 3x + 5 (et pas 3 × (x + 5)).",
    tags: ["algo_programmation", "formule", "short", "methode"],
  },
    /* =========================
     ALGO_EXPRESSION_VALEUR
  ========================= */

  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_1_addition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace x par sa valeur.",
    tags: ["algo_programmation", "expression", "valeur", "addition", "template", "canvas"],
    generate: genExprAddition,
  },

  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_2_multiplication",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace x par sa valeur puis multiplie.",
    tags: ["algo_programmation", "expression", "valeur", "multiplication", "template", "canvas"],
    generate: genExprMultiplication,
  },

  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_3_expression_deux_etapes",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace la variable, puis : parenthèses d’abord, puis ×, puis + et −.",
    tags: ["algo_programmation", "expression", "valeur", "deux_etapes", "template", "canvas"],
    generate: genExprDeuxEtapes,
  },

  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_4_programme_calcul",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis les blocs dans l’ordre.",
    tags: ["algo_programmation", "expression", "programme_calcul", "template", "canvas"],
    generate: genExprProgramme,
  },

  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_5_reponse_utilisateur",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "La réponse de l’utilisateur devient la valeur de x.",
    tags: ["algo_programmation", "expression", "entree", "reponse", "template", "canvas"],
    generate: genExprReponse,
  },

  {
    kind: "fixed",
    id: "5e_algo_expression_valeur_fixed_1_piege_variable",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 4,
    theme: "neutral",
    text: "Si x vaut 4, l’expression x + x vaut-elle 8 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Chaque x est remplacé par 4.",
    explanation:
      "Définition : une variable représente une même valeur dans une expression.\n\n" +
      "Méthode : on remplace chaque x par 4.\n\n" +
      "Exécution : x + x = 4 + 4 = 8.\n\n" +
      "Conclusion : oui, l’expression vaut 8.",
    tags: ["algo_programmation", "expression", "variable", "qcm"],
    canvas: scratchCanvas("Même variable deux fois", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 4 },
      { type: "operator", left: "x", operator: "+", right: "x" },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_expression_valeur_open_1_methode",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "x vaut 4. Calcule 3 × x + 2.",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Il faut remplacer x par 4.",
    explanation:
      "Définition : une expression avec une variable change de valeur quand la variable change.\n\n" +
      "Méthode : on remplace x par le nombre donné, puis on calcule (la multiplication d’abord).\n\n" +
      "Exécution : 3 × 4 + 2 = 12 + 2 = 14.\n\n" +
      "Conclusion : l’expression vaut 14.",
    tags: ["algo_programmation", "expression", "short", "methode"],
  },
    /* =========================
     ALGO_PREVOIR_EXPRESSION
  ========================= */

  {
    kind: "template",
    id: "5e_algo_prevoir_expression_tpl_1_prevoir_resultat",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis le programme sans l’exécuter : suis la variable étape par étape.",
    tags: ["algo_programmation", "prevoir", "expression", "template", "canvas"],
    generate: () => genPrevoirSortie(false),
  },

  {
    kind: "template",
    id: "5e_algo_prevoir_expression_tpl_2_reconnaitre_formule",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "Transforme les blocs en formule avec x.",
    tags: ["algo_programmation", "prevoir", "formule", "template", "canvas"],
    generate: () => genPrevoirFormule(false),
  },

  {
    kind: "template",
    id: "5e_algo_prevoir_expression_tpl_3_parentheses",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 4,
    theme: "neutral",
    hint: "Ici, on ajoute d’abord, puis on multiplie tout le résultat.",
    tags: ["algo_programmation", "prevoir", "parentheses", "template", "canvas"],
    generate: () => genPrevoirFormule(true),
  },

  {
    kind: "template",
    id: "5e_algo_prevoir_expression_tpl_4_comparer_deux_programmes",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 4,
    theme: "neutral",
    hint: "Exécute chaque programme avec la même valeur de départ, puis compare.",
    tags: ["algo_programmation", "prevoir", "comparer", "template", "qcm"],
    generate: genPrevoirComparer,
  },

  {
    kind: "fixed",
    id: "5e_algo_prevoir_expression_fixed_1_piege_priorites",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 4,
    theme: "neutral",
    text:
      "Un programme prend x, le multiplie par 3, puis ajoute 2. Pour x = 4, un élève répond 18. A-t-il raison ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule 3 × 4 + 2.",
    explanation:
      "Définition : prévoir le résultat consiste à suivre correctement les opérations.\n\n" +
      "Méthode : on remplace x par 4 puis on calcule dans l’ordre.\n\n" +
      "Exécution : 3 × 4 + 2 = 12 + 2 = 14.\n\n" +
      "Conclusion : l’élève a tort, le résultat est 14.",
    tags: ["algo_programmation", "prevoir", "erreur", "qcm"],
    canvas: scratchCanvas("Erreur de prévision", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 4 },
      { type: "set_variable", variable: "résultat", value: "3 × x" },
      { type: "change_variable", variable: "résultat", value: 2 },
      { type: "say", text: "résultat" },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_prevoir_expression_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "L’utilisateur répond 6. Quelle valeur le programme affiche-t-il ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Il faut suivre les valeurs étape par étape.",
    explanation:
      "Définition : prévoir un programme, c’est trouver son résultat avant de le lancer.\n\n" +
      "Méthode : on lit les blocs dans l’ordre et on suit la variable.\n\n" +
      "Exécution : x vaut 6. Puis x × 2 = 12. Puis 12 − 3 = 9.\n\n" +
      "Conclusion : le programme affiche 9.",
    tags: ["algo_programmation", "prevoir", "short", "methode"],
    canvas: scratchCanvas("Prévoir", [
      { type: "event" },
      { type: "ask", text: "Choisis un nombre" },
      { type: "set_variable", variable: "x", value: "réponse" },
      { type: "set_variable", variable: "x", value: "x × 2" },
      { type: "change_variable", variable: "x", value: -3 },
      { type: "say", text: "x" },
    ]),
  },
    /* =========================
     ALGO_PARAMETRES
  ========================= */

  {
    kind: "template",
    id: "5e_algo_parametre_tpl_1_modifier_distance",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_parametre",
    difficulty: 3,
    theme: "neutral",
    hint: "Le paramètre du bloc avancer est la distance.",
    tags: ["algo_programmation", "parametre", "distance", "template", "canvas"],
    generate: genParamDistance,
  },

  {
    kind: "template",
    id: "5e_algo_parametre_tpl_2_effet_sur_boucle",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_parametre",
    difficulty: 3,
    theme: "neutral",
    hint: "La boucle tourne avec le NOUVEAU nombre de répétitions.",
    tags: ["algo_programmation", "parametre", "boucle", "template", "canvas"],
    generate: genParamRepetitions,
  },

  {
    kind: "template",
    id: "5e_algo_parametre_tpl_3_changer_coefficient",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_parametre",
    difficulty: 4,
    theme: "neutral",
    hint: "Le coefficient multiplie la valeur de x.",
    tags: ["algo_programmation", "parametre", "coefficient", "formule", "template", "canvas"],
    generate: genParamCoefficient,
  },

  {
    kind: "template",
    id: "5e_algo_parametre_tpl_4_modifier_ajout",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_parametre",
    difficulty: 4,
    theme: "neutral",
    hint: "Chaque tour de boucle ajoute maintenant la NOUVELLE valeur.",
    tags: ["algo_programmation", "parametre", "variable", "template", "canvas"],
    generate: genParamAjout,
  },

  {
    kind: "fixed",
    id: "5e_algo_parametre_fixed_1_piege_parametre",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_parametre",
    difficulty: 4,
    theme: "neutral",
    text:
      "Dans un bloc “répéter 5 fois”, le nombre 5 est-il un paramètre que l’on peut modifier ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "C’est la valeur qui indique le nombre de répétitions.",
    explanation:
      "Définition : un paramètre est une valeur réglable dans un bloc.\n\n" +
      "Méthode : on repère les nombres ou textes modifiables dans les blocs.\n\n" +
      "Exécution : dans “répéter 5 fois”, le nombre 5 indique combien de fois la boucle se répète.\n\n" +
      "Conclusion : oui, 5 est un paramètre.",
    tags: ["algo_programmation", "parametre", "boucle", "qcm"],
    canvas: scratchCanvas("Paramètre de boucle", [
      { type: "event" },
      {
        type: "repeat",
        times: 5,
        children: [{ type: "move", value: 10 }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_parametre_fixed_2_piege_effet",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_parametre",
    difficulty: 4,
    theme: "neutral",
    text:
      "Si on augmente le nombre de répétitions dans une boucle, le programme effectue-t-il plus d’actions ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Une boucle répète les blocs qu’elle contient.",
    explanation:
      "Définition : une boucle répète des instructions.\n\n" +
      "Méthode : on regarde le nombre de répétitions.\n\n" +
      "Exécution : si ce nombre augmente, les instructions à l’intérieur sont exécutées davantage de fois.\n\n" +
      "Conclusion : oui, le programme effectue plus d’actions.",
    tags: ["algo_programmation", "parametre", "boucle", "effet", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_algo_parametre_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_parametre",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Ce programme trace un carré de côté 50. On veut un côté de 80. Quel nombre faut-il changer ?",
    format: "qcm",
    choices: ["50", "90", "4"],
    expected: ["50"],
    comparator: "mcq_exact",
    hint: "Pense aux nombres dans les blocs avancer, tourner ou répéter.",
    explanation:
      "Définition : un paramètre est un nombre qu’on peut changer dans un bloc.\n\n" +
      "Méthode : on cherche le bloc qui règle la longueur du côté.\n\n" +
      "Exécution : 50 est la longueur dans « avancer ». 90 est l’angle, 4 le nombre de côtés.\n\n" +
      "Conclusion : on remplace 50 par 80 dans « avancer de 50 ».",
    tags: ["algo_programmation", "parametre", "qcm", "vocabulaire"],
    canvas: scratchCanvas("Carré", [
      { type: "event" },
      { type: "pen", text: "stylo en position d’écriture" },
      { type: "repeat", times: 4, children: [{ type: "move", value: 50 }, { type: "turn", value: 90 }] },
    ]),
  },
    /* =========================
     ALGO_TESTS_CONDITIONS
  ========================= */

  {
    kind: "template",
    id: "5e_algo_tests_tpl_1_condition_vraie",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_test_condition",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie si la condition est vraie ou fausse.",
    tags: ["algo_programmation", "condition", "if", "template", "canvas"],
    generate: genTestVrai,
  },

  {
    kind: "template",
    id: "5e_algo_tests_tpl_2_condition_fausse",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_test_condition",
    difficulty: 2,
    theme: "neutral",
    hint: "Le programme agit seulement si la condition est vraie.",
    tags: ["algo_programmation", "condition", "if", "template", "canvas"],
    generate: genTestExecute,
  },

  {
    kind: "template",
    id: "5e_algo_tests_tpl_3_resultat_variable",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_test_condition",
    difficulty: 3,
    theme: "neutral",
    hint: "Observe ce qui arrive à la variable.",
    tags: ["algo_programmation", "condition", "variable", "template", "canvas"],
    generate: genTestVariable,
  },

  {
    kind: "template",
    id: "5e_algo_tests_tpl_4_parite",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_test_condition",
    difficulty: 3,
    theme: "neutral",
    hint: "Pair : multiple de 2. Multiple de 5 : finit par 0 ou 5. Multiple de 10 : finit par 0.",
    tags: ["algo_programmation", "condition", "pair", "template", "canvas"],
    generate: genTestParite,
  },

  {
    kind: "template",
    id: "5e_algo_tests_tpl_5_deplacement_condition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_test_condition",
    difficulty: 4,
    theme: "neutral",
    hint: "Le déplacement se fait seulement si la condition est vraie.",
    tags: ["algo_programmation", "condition", "deplacement", "template", "canvas"],
    generate: genTestDeplacement,
  },

  {
    kind: "fixed",
    id: "5e_algo_tests_fixed_1_definition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_test_condition",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert une condition dans un programme ?",
    format: "qcm",
    choices: shuffle([
      "à tester une situation",
      "à colorier un dessin",
      "à supprimer un programme",
      "à éteindre l’ordinateur",
    ]),
    expected: ["à tester une situation"],
    comparator: "mcq_exact",
    hint: "Une condition répond souvent par vrai ou faux.",
    explanation:
      "Définition : une condition sert à vérifier une situation.\n\n" +
      "Méthode : le programme regarde si une affirmation est vraie ou fausse.\n\n" +
      "Exécution : selon le résultat, certaines actions sont exécutées.\n\n" +
      "Conclusion : une condition sert à tester une situation.",
    tags: ["algo_programmation", "condition", "vocabulaire", "qcm"],
  },

  {
    kind: "fixed",
    id: "5e_algo_tests_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_test_condition",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "note vaut 8. Le lutin dit-il « Bravo » ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Regarde si la condition « note > 10 » est vraie.",
    explanation:
      "Définition : une condition est un test : elle est vraie ou fausse.\n\n" +
      "Méthode : on teste la condition avec la valeur de la variable.\n\n" +
      "Exécution : 8 > 10 est faux. Le bloc « dire Bravo » n’est donc pas exécuté.\n\n" +
      "Conclusion : non, le lutin ne dit rien.",
    tags: ["algo_programmation", "condition", "qcm", "vocabulaire"],
    canvas: scratchCanvas("Condition", [
      { type: "event" },
      { type: "set_variable", variable: "note", value: 8 },
      { type: "if", condition: "note > 10", children: [{ type: "say", text: "Bravo" }] },
    ]),
  },
    /* =========================
     ALGO_BOUCLE
  ========================= */

  {
    kind: "template",
    id: "5e_algo_boucle_tpl_1_distance_totale",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_boucle",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie le nombre de répétitions par la distance.",
    tags: ["algo_programmation", "boucle", "distance", "template", "canvas"],
    generate: genBoucleDistance,
  },

  {
    kind: "template",
    id: "5e_algo_boucle_tpl_2_valeur_variable",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_boucle",
    difficulty: 3,
    theme: "neutral",
    hint: "La variable augmente à chaque répétition.",
    tags: ["algo_programmation", "boucle", "variable", "template", "canvas"],
    generate: genBoucleCompteur,
  },

  {
    kind: "template",
    id: "5e_algo_boucle_tpl_3_polygone_regulier",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_boucle",
    difficulty: 4,
    theme: "neutral",
    hint: "Autant de répétitions que de côtés ; les angles tournés font 360° en tout.",
    tags: ["algo_programmation", "boucle", "geometrie", "template", "canvas"],
    generate: genBouclePolygone,
  },
    {
    kind: "template",
    id: "5e_algo_boucle_tpl_4_retrouver_repetitions",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_boucle",
    difficulty: 3,
    theme: "neutral",
    hint: "Nombre de répétitions = distance totale ÷ distance par répétition.",
    tags: ["algo_programmation", "boucle", "inverse", "template"],
    generate: genBoucleRetrouver,
  },

  {
    kind: "fixed",
    id: "5e_algo_boucle_fixed_1_definition",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_boucle",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert une boucle dans un programme ?",
    format: "qcm",
    choices: [
      "à répéter des instructions",
      "à effacer le programme",
      "à changer la couleur de l’écran",
      "à arrêter l’ordinateur",
    ],
    expected: ["à répéter des instructions"],
    comparator: "mcq_exact",
    hint: "Une boucle évite d’écrire plusieurs fois les mêmes blocs.",
    explanation:
      "Définition : une boucle permet de répéter une ou plusieurs instructions.\n\n" +
      "Méthode : on repère le bloc “répéter ... fois”.\n\n" +
      "Exécution : les blocs à l’intérieur sont exécutés plusieurs fois.\n\n" +
      "Conclusion : une boucle sert à répéter des instructions.",
    tags: ["algo_programmation", "boucle", "definition", "qcm"],
    canvas: scratchCanvas("Boucle Scratch", [
      { type: "event" },
      {
        type: "repeat",
        times: 4,
        children: [{ type: "move", value: 20 }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_boucle_fixed_2_piege_une_fois",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_boucle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans “répéter 4 fois”, les blocs placés à l’intérieur sont exécutés 1 seule fois. Vrai ou faux ?",
    format: "qcm",
    choices: ["vrai", "faux"],
    expected: ["faux"],
    comparator: "mcq_exact",
    hint: "Lis bien le nombre écrit dans le bloc répéter.",
    explanation:
      "Définition : le nombre dans une boucle indique combien de fois les blocs sont exécutés.\n\n" +
      "Méthode : on lit le paramètre de la boucle.\n\n" +
      "Exécution : “répéter 4 fois” exécute les blocs 4 fois.\n\n" +
      "Conclusion : l’affirmation est fausse.",
    tags: ["algo_programmation", "boucle", "piege", "qcm"],
    canvas: scratchCanvas("Lire une boucle", [
      { type: "event" },
      {
        type: "repeat",
        times: 4,
        children: [{ type: "say", text: "Bonjour" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_boucle_open_1_expliquer",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_boucle",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Ce programme trace un carré. Sans la boucle, combien de blocs « avancer » et « tourner » faut-il écrire en tout ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "La boucle fait 4 tours, avec 2 blocs à chaque tour.",
    explanation:
      "Définition : une boucle répète automatiquement des blocs.\n\n" +
      "Méthode : on compte les blocs d’un tour, puis on multiplie par le nombre de tours.\n\n" +
      "Exécution : 2 blocs × 4 tours = 8 blocs. Avec la boucle, on n’en écrit que 2.\n\n" +
      "Conclusion : sans boucle, il faut 8 blocs. La boucle rend le programme plus court.",
    tags: ["algo_programmation", "boucle", "short", "optimisation"],
    canvas: scratchCanvas("Carré", [
      { type: "event" },
      { type: "repeat", times: 4, children: [{ type: "move", value: 50 }, { type: "turn", value: 90 }] },
    ]),
  },

  /* =========================
     ALGO_DEFIS
  ========================= */

  {
    kind: "template",
    id: "5e_algo_defi_tpl_1_programme_complet",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Suis d’abord la variable, puis la boucle.",
    tags: ["algo_programmation", "defi", "variable", "boucle", "template", "canvas"],
    generate: genDefiBoucle,
  },

  {
    kind: "template",
    id: "5e_algo_defi_tpl_2_erreur_logique",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_construire_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare ce que le programme fait vraiment avec ce qu’il était censé faire.",
    tags: ["algo_programmation", "defi", "erreur", "logique", "template", "canvas"],
    generate: genCDErreurPolygone,
  },
  gabarit(
    "5e_algo_construire_defi_tpl_3_completer",
    "algo_construire",
    "algo_construire_defi",
    4,
    "Pars de l’objectif et remonte le programme.",
    ["defi", "completer", "boucle"],
    genCDCompleter
  ),
  gabarit(
    "5e_algo_construire_defi_tpl_4_choisir_programme",
    "algo_construire",
    "algo_construire_defi",
    4,
    "Exécute chaque programme dans ta tête : départ + tours × ajout.",
    ["defi", "choisir", "boucle", "qcm"],
    genCDChoisir
  ),
  gabarit(
    "5e_algo_construire_defi_tpl_5_tester",
    "algo_construire",
    "algo_construire_defi",
    5,
    "Suis les blocs un par un avec le nombre tapé, puis compare avec ce qui était voulu.",
    ["defi", "debug", "entree", "canvas"],
    genCDTester
  ),
    {
    kind: "template",
    id: "5e_algo_defi_tpl_3_entree_calcul_boucle",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Utilise la valeur saisie, puis applique la boucle.",
    tags: ["algo_programmation", "defi", "entree", "calcul", "boucle", "template", "canvas"],
    generate: genDefiEntreeBoucle,
  },

  {
    kind: "fixed",
    id: "5e_algo_defi_fixed_1_condition_piege",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    text:
      "Un programme contient : si score > 10 alors dire “Bravo”. Si score vaut 8, le lutin dira-t-il “Bravo” ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Vérifie si 8 est supérieur à 10.",
    explanation:
      "Définition : un bloc conditionnel s’exécute seulement si la condition est vraie.\n\n" +
      "Méthode : on compare score avec 10.\n\n" +
      "Exécution : 8 > 10 est faux, donc le bloc “dire Bravo” n’est pas exécuté.\n\n" +
      "Conclusion : le lutin ne dira pas “Bravo”.",
    tags: ["algo_programmation", "defi", "condition", "piege", "qcm"],
    canvas: scratchCanvas("Condition piège", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 8 },
      {
        type: "if",
        condition: "score > 10",
        children: [{ type: "say", text: "Bravo" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "5e_algo_defi_open_1_debug",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_construire_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text:
      "Ce programme doit afficher le double du nombre, plus 1 : avec 5, il devrait afficher 11.\nOn tape 5. Quelle valeur affiche-t-il vraiment ?",
    // Frédéric (08/10) : plus de oui/non (une chance sur deux) → la valeur affichée.
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Suis les blocs un par un avec x = 5.",
    explanation:
      "Définition : vérifier un programme, c’est le tester avec une valeur simple.\n\n" +
      "Méthode : on suit les blocs un par un, puis on compare avec le résultat attendu.\n\n" +
      "Exécution : x vaut 5. On ajoute 1 : 6. On multiplie par 2 : 12. Il affiche 12, pas 11.\n\n" +
      "Conclusion : il affiche 12, pas 11 : les deux blocs de calcul sont dans le mauvais ordre.",
    tags: ["algo_programmation", "defi", "debug", "qcm", "methode"],
    canvas: scratchCanvas("Le programme à vérifier", [
      { type: "event" },
      { type: "ask", text: "Choisis un nombre" },
      { type: "set_variable", variable: "x", value: "réponse" },
      { type: "change_variable", variable: "x", value: 1 },
      { type: "set_variable", variable: "x", value: "x × 2" },
      { type: "say", text: "x" },
    ]),
  },

  /* =========================
     TOP-UP — ALGO_SEQUENCE (+4)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_sequence_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 1,
    theme: "neutral",
    text: "Que se passe-t-il si on échange l’ordre de deux blocs dans une séquence ?",
    format: "qcm",
    choices: [
      "le programme peut donner un résultat différent",
      "rien ne change jamais",
      "le programme s’arrête toujours",
      "les blocs disparaissent",
    ],
    expected: ["le programme peut donner un résultat différent"],
    comparator: "mcq_exact",
    hint: "L’ordre est important dans une séquence.",
    explanation: expl(
      "une séquence est une suite d’instructions exécutées dans l’ordre.",
      "on compare le résultat avant et après l’échange.",
      "changer l’ordre des blocs peut modifier les actions et donc le résultat.",
      "l’ordre des blocs est important."
    ),
    tags: ["algo_programmation", "sequence", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_algo_sequence_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    text: "Dans ce programme, quelle est la deuxième action après le drapeau vert ?",
    format: "qcm",
    choices: ["avancer de 20", "dire Bonjour", "tourner de 90°", "attendre"],
    expected: ["avancer de 20"],
    comparator: "mcq_exact",
    hint: "Compte les blocs sous le drapeau.",
    explanation: expl(
      "une séquence se lit dans l’ordre, de haut en bas.",
      "on repère le deuxième bloc sous l’événement de départ.",
      "après “dire Bonjour”, le deuxième bloc est “avancer de 20”.",
      "la deuxième action est “avancer de 20”."
    ),
    tags: ["algo_programmation", "sequence", "ordre", "qcm"],
    canvas: scratchCanvas("Ordre des blocs", [
      { type: "event" },
      { type: "say", text: "Bonjour" },
      { type: "move", value: 20 },
      { type: "turn", value: 90 },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_sequence_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "x vaut 10. Le programme ajoute 5 à x, puis enlève 3 à x. Quelle valeur affiche-t-il ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Fais les blocs l’un après l’autre.",
    explanation: expl(
      "une séquence est une suite d’instructions faites l’une après l’autre.",
      "on suit les blocs dans l’ordre, de haut en bas.",
      "10 + 5 = 15, puis 15 − 3 = 12.",
      "le programme affiche 12."
    ),
    tags: ["algo_programmation", "sequence", "short"],
    canvas: scratchCanvas("Séquence", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 10 },
      { type: "change_variable", variable: "x", value: 5 },
      { type: "change_variable", variable: "x", value: -3 },
      { type: "say", text: "x" },
    ]),
  },
  {
    kind: "template",
    id: "5e_algo_sequence_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_sequence",
    difficulty: 2,
    theme: "neutral",
    hint: "Le bloc « dire » montre la valeur du moment, pas celle de la fin.",
    tags: ["algo_programmation", "sequence", "template", "canvas"],
    generate: genSeqDireMilieu,
  },
  gabarit(
    "5e_algo_sequence_tpl_3_ordre",
    "algo_programmation",
    "algo_sequence",
    1,
    "Lis les blocs de haut en bas, à partir du drapeau vert.",
    ["sequence", "ordre", "qcm", "canvas"],
    genSeqOrdre
  ),
  gabarit(
    "5e_algo_sequence_tpl_4_ordre_compte",
    "algo_programmation",
    "algo_sequence",
    3,
    "Fais les blocs un par un, dans l’ordre : changer l’ordre change le résultat.",
    ["sequence", "ordre", "variable", "canvas"],
    genSeqOrdreCompte
  ),
  gabarit(
    "5e_algo_sequence_tpl_5_deux_variables",
    "algo_programmation",
    "algo_sequence",
    4,
    "Note la valeur de chaque variable après chaque bloc.",
    ["sequence", "variable", "trace", "canvas"],
    genSeqTrace
  ),

  /* =========================
     TOP-UP — ALGO_ENTREE_SORTIE (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_entree_sortie_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 2,
    theme: "neutral",
    text: "Quel bloc Scratch sert à obtenir une entrée de l’utilisateur ?",
    format: "qcm",
    choices: [
      "demander … et attendre",
      "avancer de 10",
      "dire Bonjour",
      "tourner de 90°",
    ],
    expected: ["demander … et attendre"],
    comparator: "mcq_exact",
    hint: "C’est le bloc qui pose une question.",
    explanation: expl(
      "une entrée est une donnée fournie par l’utilisateur.",
      "on repère le bloc qui demande une information.",
      "le bloc “demander … et attendre” récupère la saisie de l’utilisateur.",
      "c’est le bloc “demander … et attendre”."
    ),
    tags: ["algo_programmation", "entree", "qcm"],
    canvas: scratchCanvas("Bloc demander", [
      { type: "event" },
      { type: "ask", text: "Quel est ton âge ?" },
      { type: "say", text: "réponse" },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_entree_sortie_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 3,
    theme: "neutral",
    text: "L’utilisateur saisit 7. Le programme multiplie par 2 puis affiche. Que montre-t-il ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Entrée × 2.",
    explanation: expl(
      "un programme transforme une entrée en sortie.",
      "on applique le calcul à la valeur saisie.",
      "7 × 2 = 14.",
      "le programme affiche 14."
    ),
    tags: ["algo_programmation", "entree", "sortie"],
    canvas: scratchCanvas("Entrée → ×2 → sortie", [
      { type: "event" },
      { type: "ask", text: "Choisis un nombre" },
      { type: "set_variable", variable: "nombre", value: 7 },
      { type: "say", text: "nombre × 2" },
    ]),
  },
  {
    kind: "template",
    id: "5e_algo_entree_sortie_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_entree_sortie",
    difficulty: 3,
    theme: "neutral",
    hint: "La première réponse va dans la première variable, la seconde dans la seconde.",
    tags: ["algo_programmation", "entree", "sortie", "template", "canvas"],
    generate: genESDeuxEntrees,
  },
  gabarit(
    "5e_algo_entree_sortie_tpl_4_role",
    "algo_programmation",
    "algo_entree_sortie",
    1,
    "L’entrée vient de l’utilisateur (« demander ») ; la sortie s’affiche à l’écran (« dire »).",
    ["entree", "sortie", "vocabulaire", "qcm", "canvas"],
    genESRole
  ),
  gabarit(
    "5e_algo_entree_sortie_tpl_5_retrouver_entree",
    "algo_programmation",
    "algo_entree_sortie",
    4,
    "Remonte le programme avec les opérations contraires, puis vérifie.",
    ["entree", "sortie", "raisonnement", "canvas"],
    genESRetrouver
  ),

  /* =========================
     TOP-UP — ALGO_FORMULE_BLOC (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_formule_bloc_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_formule_bloc",
    difficulty: 2,
    theme: "neutral",
    text: "Quel bloc opérateur traduit la formule « périmètre = côté × 4 » d’un carré ?",
    format: "qcm",
    choices: ["côté × 4", "côté + 4", "côté ÷ 4", "côté − 4"],
    expected: ["côté × 4"],
    comparator: "mcq_exact",
    hint: "Le périmètre d’un carré est 4 fois le côté.",
    explanation: expl(
      "une formule peut se traduire par un bloc opérateur.",
      "on identifie l’opération de la formule.",
      "le périmètre d’un carré est côté × 4.",
      "le bloc correct est “côté × 4”."
    ),
    tags: ["algo_programmation", "formule", "qcm"],
    canvas: scratchCanvas("Formule du carré", [
      { type: "event" },
      { type: "operator", left: "côté", operator: "×", right: 4 },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_formule_bloc_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_formule_bloc",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "longueur vaut 7 et largeur vaut 4. Le programme met aire à longueur × largeur. Quelle valeur affiche-t-il ?",
    format: "short",
    expected: ["28"],
    comparator: "number_equal",
    hint: "Le bloc opérateur × multiplie les deux variables.",
    explanation: expl(
      "une formule se traduit par un bloc opérateur.",
      "on remplace chaque variable par sa valeur dans le bloc « longueur × largeur ».",
      "7 × 4 = 28.",
      "le programme affiche 28."
    ),
    tags: ["algo_programmation", "formule", "short"],
    canvas: scratchCanvas("Aire d’un rectangle", [
      { type: "event" },
      { type: "set_variable", variable: "longueur", value: 7 },
      { type: "set_variable", variable: "largeur", value: 4 },
      { type: "set_variable", variable: "aire", value: "longueur × largeur" },
      { type: "say", text: "aire" },
    ]),
  },
  {
    kind: "template",
    id: "5e_algo_formule_bloc_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_formule_bloc",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace la variable par sa valeur dans la formule du bloc.",
    tags: ["algo_programmation", "formule", "template", "canvas"],
    generate: genFormuleValeur,
  },

  /* =========================
     TOP-UP — ALGO_EXPRESSION_VALEUR (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_expression_valeur_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 2,
    theme: "neutral",
    text: "Si x vaut 6, quelle est la valeur de x − 2 ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Remplace x par 6.",
    explanation: expl(
      "calculer une expression, c’est remplacer la variable par sa valeur.",
      "on remplace x puis on calcule.",
      "x − 2 = 6 − 2 = 4.",
      "la valeur de l’expression est 4."
    ),
    tags: ["algo_programmation", "expression", "valeur"],
    canvas: scratchCanvas("Valeur d’une expression", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 6 },
      { type: "operator", left: "x", operator: "−", right: 2 },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_expression_valeur_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    text: "Si a vaut 3, quelle est la valeur de 2 × a + 1 ?",
    format: "qcm",
    choices: ["7", "6", "9", "8"],
    expected: ["7"],
    comparator: "mcq_exact",
    hint: "Calcule d’abord 2 × a.",
    explanation: expl(
      "on calcule l’expression en remplaçant la variable.",
      "on respecte la priorité de la multiplication.",
      "2 × 3 + 1 = 6 + 1 = 7.",
      "la valeur est 7."
    ),
    tags: ["algo_programmation", "expression", "valeur", "qcm"],
  },
  {
    kind: "template",
    id: "5e_algo_expression_valeur_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_expression_valeur",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace chaque variable par sa valeur, puis respecte les priorités.",
    tags: ["algo_programmation", "expression", "valeur", "template", "canvas"],
    generate: genExprDeuxVariables,
  },
  gabarit(
    "5e_algo_expression_valeur_tpl_6_pieges_priorites",
    "algo_programmation",
    "algo_expression_valeur",
    4,
    "Parenthèses d’abord, puis multiplications, puis additions et soustractions.",
    ["expression", "valeur", "priorites", "qcm", "canvas"],
    genExprPieges
  ),

  /* =========================
     TOP-UP — ALGO_PREVOIR_EXPRESSION (+4)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_prevoir_expression_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    text: "Un programme calcule x + 5. Que faut-il connaître pour prévoir le résultat ?",
    format: "qcm",
    choices: ["la valeur de x", "la couleur du lutin", "le nombre de blocs", "la taille de l’écran"],
    expected: ["la valeur de x"],
    comparator: "mcq_exact",
    hint: "Le résultat dépend de la variable.",
    explanation: expl(
      "prévoir un résultat, c’est anticiper la sortie d’un calcul.",
      "on identifie la variable dont dépend l’expression.",
      "x + 5 dépend de la valeur de x.",
      "il faut connaître la valeur de x."
    ),
    tags: ["algo_programmation", "prevoir", "expression", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_algo_prevoir_expression_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    text: "Le programme calcule x × 3. Si x augmente, le résultat...",
    format: "qcm",
    choices: ["augmente", "diminue", "reste identique", "devient nul"],
    expected: ["augmente"],
    comparator: "mcq_exact",
    hint: "Multiplier par 3 conserve le sens de variation.",
    explanation: expl(
      "prévoir, c’est anticiper l’effet d’une variation.",
      "on observe comment le résultat change quand x change.",
      "si x augmente, x × 3 augmente aussi.",
      "le résultat augmente."
    ),
    tags: ["algo_programmation", "prevoir", "expression", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_algo_prevoir_expression_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Le programme demande x, puis affiche x + 10. L’utilisateur répond 25. Quelle valeur s’affiche ?",
    format: "short",
    expected: ["35"],
    comparator: "number_equal",
    hint: "On remplace x par la valeur saisie.",
    explanation: expl(
      "prévoir, c’est calculer le résultat à l’avance.",
      "on remplace x par la réponse de l’utilisateur.",
      "25 + 10 = 35.",
      "le programme affiche 35."
    ),
    tags: ["algo_programmation", "prevoir", "expression", "short"],
    canvas: scratchCanvas("x + 10", [
      { type: "event" },
      { type: "ask", text: "Choisis un nombre" },
      { type: "set_variable", variable: "x", value: "réponse" },
      { type: "say", text: "x + 10" },
    ]),
  },
  {
    kind: "template",
    id: "5e_algo_prevoir_expression_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_prevoir_expression",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace x puis calcule.",
    tags: ["algo_programmation", "prevoir", "expression", "template", "canvas"],
    generate: () => genPrevoirSortie(true),
  },

  /* =========================
     TOP-UP — ALGO_PARAMETRE (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_parametre_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_parametre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le bloc “tourner de 90°”, quel est le paramètre ?",
    format: "qcm",
    choices: ["90°", "tourner", "le lutin", "le drapeau vert"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "C’est la valeur que l’on peut changer.",
    explanation: expl(
      "un paramètre est une valeur modifiable dans un bloc.",
      "on repère la valeur que l’on peut changer.",
      "dans “tourner de 90°”, la valeur 90° est le paramètre.",
      "le paramètre est 90°."
    ),
    tags: ["algo_programmation", "parametre", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_algo_parametre_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_parametre",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Dans ce programme, on change « avancer de 30 » en « avancer de 50 ». De combien de pas le lutin avance-t-il en tout ?",
    format: "short",
    expected: ["150 pas", "150"],
    comparator: "number_equal",
    hint: "La boucle fait 3 tours avec le nouveau paramètre.",
    explanation: expl(
      "un paramètre est un nombre que l’on peut régler dans un bloc.",
      "on garde la boucle et on utilise le nouveau nombre : 50.",
      "3 × 50 = 150.",
      "le lutin avance de 150 pas en tout."
    ),
    tags: ["algo_programmation", "parametre", "short"],
    canvas: scratchCanvas("Avancer", [
      { type: "event" },
      { type: "repeat", times: 3, children: [{ type: "move", value: 30 }] },
    ]),
  },
  {
    kind: "template",
    id: "5e_algo_parametre_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_parametre",
    difficulty: 3,
    theme: "neutral",
    hint: "Autant de répétitions que de côtés ; angle = 360° ÷ nombre de côtés.",
    tags: ["algo_programmation", "parametre", "boucle", "polygone", "template", "canvas"],
    generate: genParamPolygone,
  },

  /* =========================
     TOP-UP — ALGO_TEST_CONDITION (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_test_condition_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_test_condition",
    difficulty: 2,
    theme: "neutral",
    text: "Le score vaut 8. La condition “si score > 10” est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Compare 8 et 10.",
    explanation: expl(
      "une condition teste une comparaison.",
      "on compare les deux nombres.",
      "8 > 10 est faux.",
      "la condition n’est pas vraie : “non”."
    ),
    tags: ["algo_programmation", "condition", "qcm"],
    canvas: scratchCanvas("Tester une condition", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 8 },
      { type: "if", condition: "score > 10", children: [{ type: "say", text: "Gagné" }] },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_test_condition_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_test_condition",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "score vaut 15. Quelle valeur le programme affiche-t-il ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Le bloc à l’intérieur ne s’exécute pas toujours.",
    explanation: expl(
      "le bloc « si … alors » teste une condition.",
      "si la condition est vraie, on fait les blocs à l’intérieur ; sinon on les saute.",
      "15 > 20 est faux : on n’ajoute pas 10. score reste à 15.",
      "le programme affiche 15 (et pas 25)."
    ),
    tags: ["algo_programmation", "condition", "short"],
    canvas: scratchCanvas("Si … alors", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 15 },
      { type: "if", condition: "score > 20", children: [{ type: "change_variable", variable: "score", value: 10 }] },
      { type: "say", text: "score" },
    ]),
  },
  {
    kind: "template",
    id: "5e_algo_test_condition_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_test_condition",
    difficulty: 3,
    theme: "neutral",
    hint: "Teste la condition : vraie, on fait le « alors » ; fausse, le « sinon ».",
    tags: ["algo_programmation", "condition", "template", "canvas"],
    generate: genTestSinon,
  },

  /* =========================
     TOP-UP — ALGO_BOUCLE (+3)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_boucle_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_boucle",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert une boucle “répéter” dans un programme ?",
    format: "qcm",
    choices: [
      "à répéter plusieurs fois les mêmes blocs",
      "à arrêter le programme",
      "à changer la couleur du lutin",
      "à supprimer une variable",
    ],
    expected: ["à répéter plusieurs fois les mêmes blocs"],
    comparator: "mcq_exact",
    hint: "Boucle = répétition.",
    explanation: expl(
      "une boucle répète des instructions.",
      "on identifie le rôle du bloc “répéter”.",
      "le bloc “répéter” exécute plusieurs fois les blocs qu’il contient.",
      "une boucle sert à répéter plusieurs fois les mêmes blocs."
    ),
    tags: ["algo_programmation", "boucle", "qcm"],
  },
  {
    kind: "fixed",
    id: "5e_algo_boucle_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_boucle",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Ce programme trace un hexagone. Sans la boucle, combien de blocs « avancer » et « tourner » faut-il écrire en tout ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "La boucle fait 6 tours, avec 2 blocs à chaque tour.",
    explanation: expl(
      "une boucle répète des blocs à notre place.",
      "on compte les blocs d’un tour, puis on multiplie par le nombre de tours.",
      "2 blocs × 6 tours = 12 blocs. Avec la boucle, on n’en écrit que 2.",
      "sans boucle, il faut 12 blocs : la boucle rend le programme plus court."
    ),
    tags: ["algo_programmation", "boucle", "short"],
    canvas: scratchCanvas("Hexagone", [
      { type: "event" },
      { type: "repeat", times: 6, children: [{ type: "move", value: 40 }, { type: "turn", value: 60 }] },
    ]),
  },
  {
    kind: "template",
    id: "5e_algo_boucle_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_boucle",
    difficulty: 3,
    theme: "neutral",
    hint: "Les blocs dans la boucle se font à chaque tour ; ceux hors de la boucle, une seule fois.",
    tags: ["algo_programmation", "boucle", "variable", "template", "canvas"],
    generate: genBoucleParler,
  },

  /* =========================
     TOP-UP — ALGO_DEFI (+5)
  ========================= */
  {
    kind: "fixed",
    id: "5e_algo_defi_fixed_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un programme : total = 0, puis répéter 4 fois (ajouter 5 à total). Quelle est la valeur finale de total ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "4 × 5.",
    explanation: expl(
      "il faut suivre la variable dans la boucle.",
      "on calcule l’augmentation totale.",
      "4 répétitions de +5 : 4 × 5 = 20.",
      "total vaut 20."
    ),
    tags: ["algo_programmation", "defi", "boucle"],
    canvas: scratchCanvas("Boucle compteur", [
      { type: "event" },
      { type: "set_variable", variable: "total", value: 0 },
      { type: "repeat", times: 4, children: [{ type: "change_variable", variable: "total", value: 5 }] },
      { type: "say", text: "total" },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_defi_qcm_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_construire_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Pour tracer un pentagone régulier avec une boucle, combien de fois faut-il répéter “avancer puis tourner” ?",
    format: "qcm",
    choices: ["5", "4", "6", "3"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "Un pentagone a 5 côtés.",
    explanation: expl(
      "le nombre de répétitions correspond au nombre de côtés.",
      "on compte les côtés du polygone.",
      "un pentagone a 5 côtés.",
      "il faut répéter 5 fois."
    ),
    tags: ["algo_programmation", "defi", "boucle", "geometrie", "qcm"],
    canvas: scratchCanvas("Tracer un pentagone", [
      { type: "event" },
      { type: "repeat", times: 5, children: [{ type: "move", value: 50 }, { type: "turn", value: 72 }] },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_defi_fixed_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un programme : x = 3, puis x devient 2 × x + 1. Quelle est la valeur finale de x ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "2 × 3 + 1.",
    explanation: expl(
      "on suit la transformation de la variable.",
      "on remplace x par sa valeur dans le calcul.",
      "2 × 3 + 1 = 6 + 1 = 7.",
      "x vaut 7."
    ),
    tags: ["algo_programmation", "defi", "expression"],
  },
  {
    kind: "fixed",
    id: "5e_algo_defi_open_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_construire",
    microId: "algo_construire_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "score vaut 5. Le programme répète 0 fois « ajouter 2 à score ». Quelle valeur affiche-t-il ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Combien de fois répète-t-on si le nombre est 0 ?",
    explanation: expl(
      "une boucle « répéter n fois » fait ses blocs exactement n fois.",
      "on remplace n par 0.",
      "répéter 0 fois, c’est ne jamais ajouter 2. score reste à 5.",
      "le programme affiche 5 (et pas 7)."
    ),
    tags: ["algo_programmation", "defi", "boucle", "short", "erreur"],
    canvas: scratchCanvas("Répéter 0 fois", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 5 },
      { type: "repeat", times: 0, children: [{ type: "change_variable", variable: "score", value: 2 }] },
      { type: "say", text: "score" },
    ]),
  },
  {
    kind: "template",
    id: "5e_algo_defi_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Fais les tours un par un : chaque tour repart de la valeur laissée par le précédent.",
    tags: ["algo_programmation", "defi", "template", "canvas"],
    generate: genDefiDoubleOuTest,
  },

  /* ===== ALGO_DEFI =====
     Les défis d'écriture sont partis vers algo_construire_defi le 04/08/2026,
     et les deux questions ouvertes avec eux. Celles-ci les remplacent : lire
     un programme, c'est savoir dire ce qu'il fera AVANT de cliquer. */
  {
    kind: "fixed",
    id: "5e_algo_defi_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "a vaut 2 et b vaut 5. Le programme met a à a + b, puis met b à a × 2. Que vaut b à la fin ?",
    format: "short",
    expected: ["14"],
    comparator: "number_equal",
    hint: "Note la valeur de a et de b après chaque bloc.",
    explanation: expl(
      "prévoir un programme, c’est le faire dans sa tête avant la machine.",
      "on lit les blocs un par un, et on note la valeur de chaque variable après chaque bloc.",
      "a = 2 + 5 = 7. Puis b = 7 × 2 = 14 : on prend la NOUVELLE valeur de a.",
      "b vaut 14 à la fin (et pas 4)."
    ),
    tags: ["algo_programmation", "defi", "short", "methode"],
    canvas: scratchCanvas("Suivre deux variables", [
      { type: "event" },
      { type: "set_variable", variable: "a", value: 2 },
      { type: "set_variable", variable: "b", value: 5 },
      { type: "set_variable", variable: "a", value: "a + b" },
      { type: "set_variable", variable: "b", value: "a × 2" },
      { type: "say", text: "b" },
    ]),
  },
  {
    kind: "fixed",
    id: "5e_algo_defi_open_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "nombre vaut 5. Le programme répète 4 fois « ajouter 3 à nombre ». Un élève annonce 8. Quel est le bon résultat ?",
    format: "qcm",
    choices: ["17", "8", "12", "32"],
    expected: ["17"],
    comparator: "mcq_exact",
    hint: "Combien de fois l’instruction « ajouter 3 » est-elle exécutée ?",
    explanation: expl(
      "une boucle « répéter n fois » exécute son contenu n fois, pas une seule.",
      "on compte les répétitions avant de calculer : l’ajout se fait autant de fois que la boucle tourne.",
      "l’élève n’a compté qu’un seul ajout : 5 + 3 = 8. Or l’instruction tourne 4 fois : 5 + 3 + 3 + 3 + 3 = 5 + 12 = 17.",
      "la variable nombre vaut 17 à la fin, pas 8.",
    ),
    tags: ["algo_programmation", "defi", "qcm", "piege", "boucle"],
    canvas: scratchCanvas("Le compte est bon ?", [
      { type: "event" },
      { type: "set_variable", variable: "nombre", value: 5 },
      { type: "repeat", times: 4, children: [{ type: "change_variable", variable: "nombre", value: 3 }] },
      { type: "say", text: "nombre" },
    ]),
  },
  {
    kind: "template",
    id: "5e_algo_defi_tpl_x2",
    niveau: "5e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis combien de fois la boucle tourne, puis ce que ça ajoute en tout.",
    tags: ["algo_programmation", "defi", "qcm", "template"],
    // 08/10/2026 : précise et simple (Frédéric). QCM dont les leurres sont les
    // vraies erreurs : un seul tour (début + ajout), oubli du départ (ajout × tours),
    // départ compté à chaque tour ((début + ajout) × tours).
    generate: genDefiPieges,
  },
];
