// lib/tutor-v4/question-banks/maths/4e/algorithmique.bank.ts
//
// ⛔⛔ 04/10/2026 — « DES QUESTIONS REVIENNENT SOUVENT ». Mesuré avant la
// réparation : 8 à 12 squelettes d'énoncé par micro, 13 à 18 répétitions sur
// une série de 20 (scripts/mesurer-squelettes-coach.ts 4e algo_programmation).
// Les gabarits changeaient les nombres, jamais la FORME du programme.
//
// ⭐ CE QUI CHANGE. Chaque gabarit tire désormais un PROGRAMME (nombre
// d'instructions, ordre, boucles, conditions), une SITUATION (jeu de
// plateforme, distributeur, thermostat, feu piéton, robot, caisse, drone…, voir
// CTX), une PRÉSENTATION et une TOURNURE de question. Le petit interpréteur
// ci-dessous écrit le programme en texte (pseudo-Scratch), fabrique les blocs du
// canvas ET l'EXÉCUTE : chaque réponse attendue, chaque trace d'explication
// vient de cette exécution, jamais d'un calcul écrit à la main à côté.
//
// Écriture : « mettre score à 3 » ; « ajouter −2 à vies » ;
// « répéter 4 fois [ajouter 1 à score] » ; « si vies > 0 alors [dire “…”] sinon
// [dire “…”] » ; « répéter jusqu’à ce que score ≥ 20 [ajouter 3 à score] ».
// Les crochets figurent la « bouche » du bloc Scratch.

import type { TutorBankItemV4, ScratchBlockData, DifficultyLevel } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function scratchCanvas(
  title: string,
  blocks: ScratchBlockData[],
  description?: string
) {
  return {
    kind: "scratch" as const,
    title,
    description,
    blocks,
  };
}

/** La bonne réponse + trois leurres DISTINCTS, ou null (le tirage recommence). */
function makeChoices(correct: string, wrongs: readonly string[], n = 4): string[] | null {
  const d = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  if (d.length < n - 1) return null;
  return shuffle([correct, ...shuffle(d).slice(0, n - 1)]);
}

/** Retire tant que le tirage ne convient pas (valeurs négatives impossibles, leurres qui se confondent…). */
function tirer<T>(f: () => T | null): T {
  for (let i = 0; i < 400; i++) {
    const r = f();
    if (r) return r;
  }
  throw new Error("algorithmique : tirage impossible");
}

/** −3 avec le vrai signe moins ; 1889 sans espace (années, codes). */
const nb = (n: number) => (n < 0 ? `−${Math.abs(n)}` : String(n));
/** (−3) entre parenthèses quand il suit une opération. */
const par = (n: number) => (n < 0 ? `(${nb(n)})` : nb(n));
/** « de score », « d’énergie ». */
const de = (v: string) => (/^[aeiouyéèêàâîôûœ]/i.test(v) ? `d’${v}` : `de ${v}`);

/* ===========================================================================
   L'INTERPRÉTEUR : un programme est une liste d'instructions.
=========================================================================== */

type Cmp = ">" | "<" | "=" | "≥" | "≤";
type Cond = { v: string; op: Cmp; s: number } | { et: [Cond, Cond] } | { ou: [Cond, Cond] };
type Terme = string | number;
type Ins =
  | { k: "set"; v: string; n: number }
  | { k: "calc"; v: string; a: Terme; op: "+" | "−" | "×"; b: Terme }
  | { k: "add"; v: string; n: number }
  | { k: "rep"; n: number; corps: Ins[] }
  | { k: "jusqua"; c: Cond; corps: Ins[] }
  | { k: "si"; c: Cond; alors: Ins[]; sinon?: Ins[] }
  | { k: "dire"; t: string }
  | { k: "direv"; v: string }
  | { k: "avancer"; n: number }
  | { k: "tourner"; n: number };

const OPS: Cmp[] = [">", "<", "=", "≥", "≤"];

function cmp(x: number, op: Cmp, s: number): boolean {
  switch (op) {
    case ">":
      return x > s;
    case "<":
      return x < s;
    case "=":
      return x === s;
    case "≥":
      return x >= s;
    case "≤":
      return x <= s;
  }
}

function vraie(c: Cond, env: Record<string, number>): boolean {
  if ("et" in c) return vraie(c.et[0], env) && vraie(c.et[1], env);
  if ("ou" in c) return vraie(c.ou[0], env) || vraie(c.ou[1], env);
  return cmp(env[c.v] ?? 0, c.op, c.s);
}

function condTxt(c: Cond): string {
  if ("et" in c) return `${condTxt(c.et[0])} et ${condTxt(c.et[1])}`;
  if ("ou" in c) return `${condTxt(c.ou[0])} ou ${condTxt(c.ou[1])}`;
  return `${c.v} ${c.op} ${nb(c.s)}`;
}

const termeTxt = (t: Terme) => (typeof t === "number" ? par(t) : t);

function insTxt(i: Ins): string {
  switch (i.k) {
    case "set":
      return `mettre ${i.v} à ${nb(i.n)}`;
    case "calc":
      return `mettre ${i.v} à ${typeof i.a === "number" ? nb(i.a) : i.a} ${i.op} ${termeTxt(i.b)}`;
    case "add":
      return `ajouter ${nb(i.n)} à ${i.v}`;
    case "rep":
      return `répéter ${i.n} fois [${i.corps.map(insTxt).join(" ; ")}]`;
    case "jusqua":
      return `répéter jusqu’à ce que ${condTxt(i.c)} [${i.corps.map(insTxt).join(" ; ")}]`;
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
  }
}

const progTxt = (p: Ins[]) => p.map((i) => `« ${insTxt(i)} »`).join(" ; ");

function blocs(p: Ins[]): ScratchBlockData[] {
  return p.map((i): ScratchBlockData => {
    switch (i.k) {
      case "set":
        return { type: "set_variable", variable: i.v, value: nb(i.n) };
      case "calc":
        return {
          type: "set_variable",
          variable: i.v,
          value: `${typeof i.a === "number" ? nb(i.a) : i.a} ${i.op} ${termeTxt(i.b)}`,
        };
      case "add":
        return { type: "change_variable", variable: i.v, value: nb(i.n) };
      case "rep":
        return { type: "repeat", times: i.n, children: blocs(i.corps) };
      case "jusqua":
        // Le canvas n'a pas de bloc « répéter jusqu’à » : ces gabarits n'en montrent pas.
        throw new Error("pas de bloc « répéter jusqu’à » dans le canvas");
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
    }
  });
}

const canvasDe = (titre: string, p: Ins[], avant: ScratchBlockData[] = []) =>
  scratchCanvas(titre, [{ type: "event" }, ...avant, ...blocs(p)]);

type Etat = {
  env: Record<string, number>;
  dits: string[];
  trace: string[];
  dist: number;
  angle: number;
  tours: number;
  min: number;
  max: number;
  infini: boolean;
  /** Plusieurs boucles à la suite : la trace dit « 1re boucle, tour 2 ». */
  boucles: number;
  numeroter: boolean;
};

function varsModifiees(p: Ins[], acc: string[] = []): string[] {
  for (const i of p) {
    if ((i.k === "set" || i.k === "add" || i.k === "calc") && !acc.includes(i.v)) acc.push(i.v);
    if (i.k === "rep" || i.k === "jusqua") varsModifiees(i.corps, acc);
    if (i.k === "si") {
      varsModifiees(i.alors, acc);
      if (i.sinon) varsModifiees(i.sinon, acc);
    }
  }
  return acc;
}

const resserrer = (l: string[]) => (l.length > 5 ? [l[0], l[1], "…", l[l.length - 1]] : l);

function ligneTour(t: number, corps: Ins[], st: Etat, ditsAvant: number): string {
  const vs = varsModifiees(corps);
  let l = `tour ${t} : `;
  if (vs.length) l += vs.map((v) => `${v} = ${nb(st.env[v] ?? 0)}`).join(", ");
  else l += `${st.dist} pas parcourus${st.angle ? `, ${st.angle}° de rotation en tout` : ""}`;
  const dits = st.dits.slice(ditsAvant);
  if (dits.length) l += ` (le lutin dit ${dits.map((d) => `“${d}”`).join(", ")})`;
  return l;
}

function exec(p: Ins[], st: Etat, muet: boolean) {
  const noter = (v: string, n: number) => {
    st.env[v] = n;
    st.min = Math.min(st.min, n);
    st.max = Math.max(st.max, n);
  };
  for (const i of p) {
    switch (i.k) {
      case "set":
        noter(i.v, i.n);
        if (!muet) st.trace.push(`${i.v} prend la valeur ${nb(i.n)}`);
        break;
      case "add": {
        const o = st.env[i.v] ?? 0;
        noter(i.v, o + i.n);
        if (!muet) st.trace.push(`${i.v} devient ${nb(o)} + ${par(i.n)} = ${nb(o + i.n)}`);
        break;
      }
      case "calc": {
        const a = typeof i.a === "number" ? i.a : st.env[i.a] ?? 0;
        const b = typeof i.b === "number" ? i.b : st.env[i.b] ?? 0;
        const r = i.op === "+" ? a + b : i.op === "−" ? a - b : a * b;
        noter(i.v, r);
        if (!muet) st.trace.push(`${i.v} devient ${nb(a)} ${i.op} ${par(b)} = ${nb(r)}`);
        break;
      }
      case "rep": {
        const lignes: string[] = [];
        for (let t = 1; t <= i.n; t++) {
          const d0 = st.dits.length;
          exec(i.corps, st, true);
          lignes.push(ligneTour(t, i.corps, st, d0));
        }
        if (!muet) {
          st.boucles++;
          const pre = st.numeroter ? `${st.boucles === 1 ? "1re" : `${st.boucles}e`} boucle, ` : "";
          st.trace.push(...resserrer(lignes).map((l) => (l === "…" ? l : pre + l)));
        }
        break;
      }
      case "jusqua": {
        const lignes: string[] = [];
        let t = 0;
        while (!vraie(i.c, st.env)) {
          t++;
          if (t > 60) {
            st.infini = true;
            break;
          }
          const d0 = st.dits.length;
          exec(i.corps, st, true);
          lignes.push(ligneTour(t, i.corps, st, d0));
        }
        st.tours = t;
        if (!muet) {
          st.trace.push(...resserrer(lignes));
          st.trace.push(`le test « ${condTxt(i.c)} » devient vrai : la boucle s’arrête après ${t} tour${t > 1 ? "s" : ""}`);
        }
        break;
      }
      case "si": {
        const ok = vraie(i.c, st.env);
        if (!muet)
          st.trace.push(
            `test « ${condTxt(i.c)} » : ${ok ? "vrai" : "faux"}, ` +
              (ok ? "on exécute le « alors »" : i.sinon ? "on exécute le « sinon »" : "on saute le bloc")
          );
        exec(ok ? i.alors : i.sinon ?? [], st, muet);
        break;
      }
      case "dire":
        st.dits.push(i.t);
        if (!muet) st.trace.push(`le lutin dit “${i.t}”`);
        break;
      case "direv": {
        const d = nb(st.env[i.v] ?? 0);
        st.dits.push(d);
        if (!muet) st.trace.push(`le lutin dit ${d}`);
        break;
      }
      case "avancer":
        st.dist += i.n;
        if (!muet) st.trace.push(`on avance de ${i.n} pas`);
        break;
      case "tourner":
        st.angle += i.n;
        if (!muet) st.trace.push(`on tourne de ${i.n}°`);
        break;
    }
  }
}

function executer(p: Ins[], env: Record<string, number> = {}): Etat {
  const st: Etat = {
    env: { ...env },
    dits: [],
    trace: [],
    dist: 0,
    angle: 0,
    tours: 0,
    min: Math.min(0, ...Object.values(env)),
    max: Math.max(0, ...Object.values(env)),
    infini: false,
    boucles: 0,
    numeroter: p.filter((i) => i.k === "rep").length > 1,
  };
  exec(p, st, false);
  return st;
}

/** Valeurs plausibles : pas de nombre négatif hors des contextes relatifs, rien au-delà de 999. */
const plausible = (st: Etat, signe?: boolean) => !st.infini && st.max <= 999 && (signe || st.min >= 0);

function expl(def: string, methode: string, trace: string[], conclusion: string) {
  return (
    `Définition : ${def}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Exécution : ${trace.join(" ; ")}.\n\n` +
    `Conclusion : ${conclusion}`
  );
}

const reponseNombre = (n: number) => ({
  format: "short" as const,
  expected: n < 0 ? [String(n), nb(n)] : [String(n)],
  comparator: "number_equal" as const,
});

const reponseQcm = (bonne: string, choix: string[]) => ({
  format: "qcm" as const,
  choices: choix,
  expected: [bonne],
  comparator: "mcq_exact" as const,
});

/* ===========================================================================
   LES SITUATIONS. `hi` est le message quand la valeur est GRANDE, `lo` quand
   elle est petite ; `quoi` est le groupe nominal AVEC son article.
=========================================================================== */

type Ctx = {
  v: string;
  intro: string;
  hi: string;
  lo: string;
  min: number;
  max: number;
  pas: [number, number];
  quoi: string;
  /** `quoi` est féminin : « la vitesse mesurée est strictement supérieure à… ». */
  f?: boolean;
  signe?: boolean;
};

const CTX: Ctx[] = [
  { v: "score", intro: "Dans un jeu de plateforme, le lutin ramasse des étoiles.", hi: "Niveau suivant", lo: "Rejoue", min: 0, max: 30, pas: [1, 5], quoi: "le score du joueur" },
  { v: "vies", intro: "Dans un jeu vidéo, le personnage gagne ou perd des vies.", hi: "Tout va bien", lo: "Attention, danger", min: 0, max: 9, pas: [1, 2], quoi: "le nombre de vies" },
  { v: "pièces", intro: "Un distributeur de boissons compte les pièces de 1 € introduites.", hi: "Voici ta boisson", lo: "Ajoute une pièce", min: 0, max: 6, pas: [1, 2], quoi: "le nombre de pièces introduites" },
  { v: "température", intro: "Un thermostat règle le chauffage d’une maison.", hi: "Chauffage éteint", lo: "Chauffage allumé", min: 14, max: 24, pas: [1, 2], quoi: "la température de la pièce", f: true },
  { v: "temps", intro: "Un feu piéton compte les secondes depuis son passage au vert.", hi: "Rouge", lo: "Vert", min: 0, max: 40, pas: [2, 5], quoi: "le temps écoulé" },
  { v: "compteur", intro: "Un robot aspirateur compte ses allers-retours dans le salon.", hi: "Retour à la base", lo: "Je continue", min: 0, max: 12, pas: [1, 2], quoi: "le nombre d’allers-retours" },
  { v: "total", intro: "La caisse d’une boulangerie additionne les achats, en euros.", hi: "Réduction offerte", lo: "Pas de réduction", min: 2, max: 30, pas: [1, 4], quoi: "le montant des achats" },
  { v: "argent", intro: "Une application suit l’argent de poche de Léa, en euros.", hi: "Achat possible", lo: "Encore un peu", min: 0, max: 40, pas: [2, 5], quoi: "l’argent économisé" },
  { v: "points", intro: "Un quiz de culture générale compte les bonnes réponses.", hi: "Gagné", lo: "Perdu", min: 0, max: 20, pas: [1, 3], quoi: "le nombre de points" },
  { v: "énergie", intro: "Un robot explorateur dépense de l’énergie à chaque déplacement.", hi: "En route", lo: "Recharge", min: 5, max: 30, pas: [1, 4], quoi: "l’énergie du robot", f: true },
  { v: "niveau", intro: "Un capteur mesure le niveau d’eau d’une citerne de jardin, en centimètres.", hi: "Citerne pleine", lo: "Encore de la place", min: 10, max: 90, pas: [5, 10], quoi: "le niveau de l’eau" },
  { v: "voitures", intro: "Un panneau à l’entrée d’un parking compte les voitures garées.", hi: "Complet", lo: "Places libres", min: 20, max: 60, pas: [1, 5], quoi: "le nombre de voitures garées" },
  { v: "vitesse", intro: "Un radar pédagogique mesure la vitesse des voitures devant une école, en km/h.", hi: "Ralentissez", lo: "Merci", min: 20, max: 50, pas: [2, 5], quoi: "la vitesse mesurée", f: true },
  { v: "distance", intro: "Le compteur d’un vélo mesure la distance parcourue, en kilomètres.", hi: "Pause méritée", lo: "On roule", min: 0, max: 40, pas: [2, 6], quoi: "la distance parcourue", f: true },
  { v: "altitude", intro: "Un drone de surveillance monte et descend ; son altitude est en mètres.", hi: "Trop haut", lo: "Altitude correcte", min: 10, max: 110, pas: [5, 15], quoi: "l’altitude du drone", f: true },
  { v: "litres", intro: "Une pompe remplit un aquarium, litre par litre.", hi: "Aquarium plein", lo: "Remplissage en cours", min: 0, max: 60, pas: [2, 6], quoi: "le volume d’eau" },
  { v: "nageurs", intro: "À la plage de l’Hermitage, un sauveteur compte les nageurs dans la zone surveillée.", hi: "Zone pleine", lo: "Baignade ouverte", min: 0, max: 30, pas: [1, 4], quoi: "le nombre de nageurs" },
  { v: "gemmes", intro: "Dans un jeu de labyrinthe, un explorateur ramasse des gemmes.", hi: "Coffre ouvert", lo: "Cherche encore", min: 0, max: 15, pas: [1, 3], quoi: "le nombre de gemmes" },
];

/** Des situations où la variable peut être NÉGATIVE (les relatifs de 4e). */
const CTX_REL: Ctx[] = [
  { v: "température", intro: "Un capteur mesure la température dans un congélateur, en °C.", hi: "Alerte", lo: "Tout va bien", min: -24, max: -10, pas: [1, 3], quoi: "la température du congélateur", f: true, signe: true },
  { v: "température", intro: "Une station météo de montagne relève la température de la nuit, en °C.", hi: "Pas de gel", lo: "Risque de gel", min: -12, max: 6, pas: [1, 3], quoi: "la température", f: true, signe: true },
  { v: "position", intro: "L’ordinateur d’un plongeur note sa position par rapport à la surface, en mètres (négative sous l’eau).", hi: "Près de la surface", lo: "En profondeur", min: -30, max: 0, pas: [2, 5], quoi: "la position du plongeur", f: true, signe: true },
  { v: "solde", intro: "Une application bancaire surveille le solde d’un compte, en euros.", hi: "Tout va bien", lo: "Alerte découvert", min: -50, max: 80, pas: [5, 15], quoi: "le solde du compte", signe: true },
  { v: "étage", intro: "Un ascenseur de parking souterrain affiche l’étage où il se trouve.", hi: "Sortie à pied", lo: "Parking", min: -4, max: 5, pas: [1, 2], quoi: "l’étage", signe: true },
  { v: "score", intro: "Dans un quiz, une mauvaise réponse fait perdre des points : le score peut devenir négatif.", hi: "Bravo", lo: "Courage", min: -10, max: 10, pas: [1, 3], quoi: "le score", signe: true },
  { v: "x", intro: "Le lutin travaille sur un nombre relatif rangé dans la variable x.", hi: "Grand", lo: "Petit", min: -9, max: 9, pas: [1, 4], quoi: "le nombre x", signe: true },
  { v: "écart", intro: "Au golf, on compte l’écart au par : un écart négatif est un bon score.", hi: "Peut mieux faire", lo: "Belle partie", min: -5, max: 6, pas: [1, 2], quoi: "l’écart au par", signe: true },
  { v: "position", intro: "Un robot se déplace sur une droite graduée, de part et d’autre de l’origine.", hi: "À droite", lo: "À gauche", min: -10, max: 10, pas: [1, 3], quoi: "la position du robot", f: true, signe: true },
];

/** Deux variables qui vivent ensemble. */
const PAIRES: { a: string; b: string; intro: string }[] = [
  { a: "total", b: "prix", intro: "La caisse d’un cinéma calcule le montant à payer, en euros." },
  { a: "score", b: "bonus", intro: "Dans un jeu de course, chaque bonus ramassé s’ajoute au score." },
  { a: "distance", b: "étape", intro: "Une application de randonnée additionne les étapes parcourues, en kilomètres." },
  { a: "argent", b: "dépense", intro: "Une application de budget suit l’argent d’un élève, en euros." },
  { a: "pluie", b: "averse", intro: "Un pluviomètre connecté additionne la pluie tombée, en millimètres." },
  { a: "stock", b: "livraison", intro: "Un magasin de vélos suit son stock de casques." },
  { a: "habitants", b: "arrivées", intro: "Un jeu de simulation suit la population d’un village." },
  { a: "x", b: "y", intro: "Un programme de calcul utilise deux variables." },
  { a: "points", b: "vies", intro: "Dans un jeu d’arcade, le joueur a des points et des vies." },
  { a: "pommes", b: "paniers", intro: "Au verger, un programme compte les pommes cueillies et les paniers remplis." },
  { a: "abonnés", b: "nouveaux", intro: "Une chaîne de vidéos de sciences suit ses abonnés." },
  { a: "temps", b: "tour", intro: "Le chronomètre d’une course de natation additionne les temps, en secondes." },
];

const toutesSituations = [...CTX, ...CTX_REL];

/** Un seuil proche de la valeur : souvent ÉGAL, pour faire travailler le strict/large. */
function seuilPres(x: number, p: number, c: Ctx) {
  const s = randomChoice([x, x, x - p, x + p, x - 2 * p, x + 2 * p, x - 1, x + 1]);
  return c.signe ? s : Math.max(0, s);
}

/**
 * Message dit dans le « alors » : le grand message pour > et ≥, le petit pour < et ≤.
 * Pour « = », selon que la valeur testée est haute ou basse dans sa plage
 * (« si vies = 0 alors dire “Tout va bien” » n'a pas de sens).
 */
function messages(c: Ctx, op: Cmp, s?: number) {
  const bas = op === "<" || op === "≤" || (op === "=" && s !== undefined && s < (c.min + c.max) / 2);
  return bas ? { alors: c.lo, sinon: c.hi } : { alors: c.hi, sinon: c.lo };
}

const pas = (c: Ctx) => randomInt(c.pas[0], c.pas[1]);

/** Les façons de présenter le programme. */
const PRES = [
  (p: string) => `Le programme exécute ${p}.`,
  (p: string) => `Voici le programme : ${p}.`,
  (p: string) => `On lance le programme ${p}.`,
  (p: string) => `Le lutin exécute ${p}.`,
];
const presenter = (p: Ins[]) => randomChoice(PRES)(progTxt(p));

/** Les façons de demander une valeur finale. */
const qValeur = (v: string) =>
  randomChoice([
    `Quelle est la valeur ${de(v)} à la fin du programme ?`,
    `Combien vaut ${v} une fois le programme terminé ?`,
    `Que contient la variable ${v} à la fin ?`,
    `Calcule la valeur finale de la variable ${v}.`,
  ]);

/** Parfois le programme DIT la variable à la fin : la question change avec lui. */
function finirParValeur(p: Ins[], v: string): { prog: Ins[]; q: string } {
  if (Math.random() < 0.25) return { prog: [...p, { k: "direv", v }], q: "Quel nombre le lutin dit-il à la fin ?" };
  return { prog: p, q: qValeur(v) };
}

const Q_MSG = ["Que dit le lutin ?", "Quel message s’affiche ?", "Quel message le programme affiche-t-il ?", "Qu’affiche le programme à l’écran ?"];

/** Les façons de demander si un test est vrai. */
const TOURNURES_VRAI = [
  (c: string) => ({ q: `La condition “${c}” est-elle vraie ?`, oui: "oui", non: "non" }),
  (c: string) => ({ q: `Le test “${c}” donne-t-il vrai ou faux ?`, oui: "vrai", non: "faux" }),
  (c: string) => ({ q: `Que renvoie le test “${c}” : vrai ou faux ?`, oui: "vrai", non: "faux" }),
  (c: string) => ({ q: `Le programme teste “${c}”. Ce test est-il réussi ?`, oui: "oui", non: "non" }),
];

/**
 * Les objectifs en français, symbole par symbole, accordés au groupe nominal
 * (« la distance parcourue est strictement inférieurE à… »).
 * ⚠️ « supérieur à » seul est LARGE en français : on dit « strictement ».
 */
function phrasesObjectif(op: Cmp, f?: boolean): string[] {
  const e = f ? "e" : "";
  switch (op) {
    case ">":
      return ["dépasse", `est strictement supérieur${e} à`, `est strictement plus grand${e} que`];
    case "≥":
      return ["vaut au moins", "atteint ou dépasse", `est supérieur${e} ou égal${e} à`];
    case "<":
      return [`est strictement inférieur${e} à`, "n’atteint pas", `est strictement plus petit${e} que`];
    case "≤":
      return ["vaut au plus", "ne dépasse pas", `est inférieur${e} ou égal${e} à`];
    case "=":
      return ["vaut exactement", `est égal${e} à`];
  }
}

/** Comment se lit le symbole (au masculin : « le symbole se lit… »). */
const SENS: Record<Cmp, string> = {
  ">": "strictement supérieur à",
  "<": "strictement inférieur à",
  "≥": "supérieur ou égal à",
  "≤": "inférieur ou égal à",
  "=": "égal à",
};

function gabarit(
  id: string,
  microId: string,
  difficulty: DifficultyLevel,
  hint: string,
  tags: string[],
  generate: () => any
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["algo_programmation", ...tags, "template"],
    generate,
  } as TutorBankItemV4;
}

/* ===========================================================================
   ALGO_CONDITION
=========================================================================== */

/** ★1 — une comparaison stricte, la valeur est donnée. */
function genConditionSimple() {
  const c = randomChoice(CTX);
  const x = randomInt(c.min, c.max);
  const op = randomChoice([">", "<"] as Cmp[]);
  const s = seuilPres(x, pas(c), c);
  const cond = `${c.v} ${op} ${nb(s)}`;
  const ok = cmp(x, op, s);
  const donnee = randomChoice([
    `La variable ${c.v} vaut ${nb(x)}.`,
    `Le programme vient d’exécuter « mettre ${c.v} à ${nb(x)} ».`,
    `À cet instant, la variable ${c.v} contient le nombre ${nb(x)}.`,
  ]);
  const t = randomChoice(TOURNURES_VRAI)(cond);
  const bonne = ok ? t.oui : t.non;
  const prog: Ins[] = [{ k: "set", v: c.v, n: x }, { k: "si", c: { v: c.v, op, s }, alors: [{ k: "dire", t: messages(c, op).alors }] }];
  return {
    text: `${c.intro} ${donnee} ${t.q}`,
    ...reponseQcm(bonne, shuffle([t.oui, t.non])),
    explanation: expl(
      "une condition est un test qui est soit vrai, soit faux.",
      `on remplace ${c.v} par sa valeur, puis on compare.`,
      [
        `${c.v} vaut ${nb(x)}`,
        `${nb(x)} ${op} ${nb(s)} est ${ok ? "vrai" : "faux"}` +
          (x === s ? ` : un nombre n’est pas strictement ${op === ">" ? "plus grand" : "plus petit"} que lui-même` : ""),
      ],
      `la condition est ${ok ? "vraie" : "fausse"}, la réponse est « ${bonne} ».`
    ),
    canvas: canvasDe("Tester une condition", prog),
  };
}

/** ★1 — lire un symbole de comparaison en français. */
function genConditionLire() {
  const c = randomChoice(CTX);
  const s = randomInt(c.min, c.max);
  const op = randomChoice(OPS);
  const cond = `${c.v} ${op} ${nb(s)}`;
  // « la valeur de score est… » : le nom de variable n'est pas un nom commun qu'on accorde.
  const phrase = (o: Cmp) => `la valeur ${de(c.v)} est ${SENS[o].replace(/(rieur|égal)/g, "$1e")} ${nb(s)}`;
  const q = randomChoice([
    `Que signifie la condition “${cond}” ?`,
    `Comment se lit la condition “${cond}” ?`,
    `Quelle phrase veut dire la même chose que “${cond}” ?`,
    `Le programme contient le test “${cond}”. Que vérifie-t-il ?`,
  ]);
  const choix = makeChoices(phrase(op), OPS.filter((o) => o !== op).map(phrase))!;
  return {
    text: `${c.intro} ${q}`,
    ...reponseQcm(phrase(op), choix),
    explanation: expl(
      "une condition compare deux valeurs avec un symbole : >, <, ≥, ≤ ou =.",
      "on lit le symbole : > et < sont stricts (la valeur limite est exclue), ≥ et ≤ sont larges (elle est incluse).",
      [`le symbole est « ${op} », il se lit « ${SENS[op]} »`],
      `“${cond}” signifie : ${phrase(op)}.`
    ),
    canvas: canvasDe("Lire une condition", [{ k: "si", c: { v: c.v, op, s }, alors: [{ k: "dire", t: messages(c, op, s).alors }] }]),
  };
}

/** ★2 — tous les symboles, avec parfois une instruction avant le test. */
function genConditionSymboles() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const x = randomInt(c.min, c.max);
    const p = pas(c);
    const modif = Math.random() < 0.6;
    const k = Math.random() < 0.4 ? -p : p;
    const prog: Ins[] = modif ? [{ k: "set", v: c.v, n: x }, { k: "add", v: c.v, n: k }] : [{ k: "set", v: c.v, n: x }];
    const st = executer(prog);
    if (!plausible(st)) return null;
    const y = st.env[c.v];
    const op = randomChoice(OPS);
    const s = seuilPres(y, p, c);
    const cond = `${c.v} ${op} ${nb(s)}`;
    const ok = cmp(y, op, s);
    const t = randomChoice(TOURNURES_VRAI)(cond);
    const bonne = ok ? t.oui : t.non;
    return {
      text: `${c.intro} ${presenter(prog)} ${t.q}`,
      ...reponseQcm(bonne, shuffle([t.oui, t.non])),
      explanation: expl(
        "une condition est un test qui est soit vrai, soit faux.",
        `on exécute d’abord le programme pour connaître ${c.v}, puis on compare (≥ et ≤ incluent l’égalité, > et < l’excluent).`,
        [...st.trace, `${nb(y)} ${op} ${nb(s)} est ${ok ? "vrai" : "faux"}`],
        `la condition est ${ok ? "vraie" : "fausse"}, la réponse est « ${bonne} ».`
      ),
      canvas: canvasDe("Tester une condition", [...prog, { k: "si", c: { v: c.v, op, s }, alors: [{ k: "dire", t: messages(c, op, s).alors }] }]),
    };
  });
}

/** ★2 — l'égalité : devinettes, codes, quiz. */
const DEVINETTES: (() => { intro: string; ask: string; s: number; faux: number[]; hi: string; lo: string })[] = [
  () => { const s = randomInt(1, 20); return { intro: "Dans le jeu du nombre mystère, le lutin cache un nombre entre 1 et 20.", ask: "Devine le nombre mystère", s, faux: [s - 1, s + 1, s + 2, s - 3].filter((x) => x >= 1 && x <= 20), hi: "Gagné", lo: "Raté" }; },
  () => { const s = randomInt(10, 99); return { intro: "Un cadenas numérique s’ouvre avec un code à deux chiffres.", ask: "Entre le code", s, faux: [s + 1, s - 1, Number(String(s).split("").reverse().join(""))].filter((x) => x >= 10 && x !== s), hi: "Cadenas ouvert", lo: "Code faux" }; },
  () => { const s = randomInt(100, 999); return { intro: "Le digicode d’un immeuble attend un code à trois chiffres.", ask: "Tape le code", s, faux: [s + 10, s - 1, s + 100].filter((x) => x <= 999), hi: "Porte ouverte", lo: "Code refusé" }; },
  () => { const a = randomInt(3, 9), b = randomInt(4, 9); return { intro: `Un jeu de calcul mental demande combien font ${a} × ${b}.`, ask: "Combien ?", s: a * b, faux: [a * b + a, a * b - b, a + b, a * b + 1], hi: "Bravo", lo: "Recommence" }; },
  () => { const a = randomInt(12, 48), b = randomInt(11, 39); return { intro: `Un quiz demande le résultat de ${a} + ${b}.`, ask: "Ta réponse ?", s: a + b, faux: [a + b + 10, a + b - 1, a + b + 1], hi: "Juste", lo: "Faux" }; },
  () => ({ intro: "Un quiz de géométrie demande combien de côtés a un hexagone.", ask: "Combien de côtés ?", s: 6, faux: [5, 8, 7], hi: "Exact", lo: "Perdu" }),
  () => ({ intro: "Un quiz demande combien il y a de minutes dans une heure.", ask: "Combien de minutes ?", s: 60, faux: [100, 24, 30], hi: "Exact", lo: "Perdu" }),
  () => ({ intro: "Une borne de musée demande en quelle année la tour Eiffel a été achevée.", ask: "En quelle année ?", s: 1889, faux: [1789, 1900, 1898], hi: "Bonne réponse", lo: "Mauvaise réponse" }),
  () => { const s = randomInt(3, 15); return { intro: `Dans un jeu d’aventure, un coffre s’ouvre si l’on tape le nombre de gemmes trouvées ; le héros en a trouvé ${s}.`, ask: "Combien de gemmes ?", s, faux: [s - 1, s + 1, s + 2], hi: "Coffre ouvert", lo: "Coffre fermé" }; },
  () => ({ intro: "Un quiz de sciences demande à quelle température l’eau gèle, en °C.", ask: "Quelle température ?", s: 0, faux: [100, 4, -10], hi: "Exact", lo: "Perdu" }),
];

function genConditionEgalite() {
  const d = randomChoice(DEVINETTES)();
  const r = Math.random() < 0.5 || !d.faux.length ? d.s : randomChoice(d.faux);
  const avecSinon = Math.random() < 0.5;
  const si: Ins = { k: "si", c: { v: "réponse", op: "=", s: d.s }, alors: [{ k: "dire", t: d.hi }], ...(avecSinon ? { sinon: [{ k: "dire", t: d.lo }] } : {}) };
  const st = executer([si], { réponse: r });
  const cond = `réponse = ${nb(d.s)}`;
  const ok = r === d.s;
  const forme = randomInt(0, 2);
  let q: string;
  let bonne: string;
  let choix: string[];
  if (forme === 2) {
    q = randomChoice(Q_MSG);
    bonne = st.dits[0] ?? "aucun message";
    choix = shuffle([d.hi, avecSinon ? d.lo : "aucun message"]);
  } else {
    const t = randomChoice(TOURNURES_VRAI)(cond);
    q = t.q;
    bonne = ok ? t.oui : t.non;
    choix = shuffle([t.oui, t.non]);
  }
  return {
    text: `${d.intro} Le programme pose la question, puis exécute « ${insTxt(si)} ». Le joueur répond ${nb(r)}. ${q}`,
    ...reponseQcm(bonne, choix),
    explanation: expl(
      "une condition d’égalité est vraie seulement si les deux valeurs sont identiques.",
      "on remplace réponse par ce que le joueur a tapé, puis on compare.",
      [`réponse vaut ${nb(r)}`, ...st.trace],
      `la condition est ${ok ? "vraie" : "fausse"}, la réponse est « ${bonne} ».`
    ),
    canvas: scratchCanvas("Tester une réponse", [
      { type: "event" },
      { type: "ask", text: d.ask },
      { type: "set_variable", variable: "réponse", value: nb(r) },
      ...blocs([si]),
    ]),
  };
}

/** ★3 — les relatifs. */
function genConditionRelatifs() {
  return tirer(() => {
    const c = randomChoice(CTX_REL);
    const x = randomInt(c.min, c.max);
    const p = pas(c);
    const modif = Math.random() < 0.5;
    const k = randomChoice([-p, p, -2 * p]);
    const prog: Ins[] = modif ? [{ k: "set", v: c.v, n: x }, { k: "add", v: c.v, n: k }] : [{ k: "set", v: c.v, n: x }];
    const st = executer(prog);
    const y = st.env[c.v];
    const op = randomChoice(OPS);
    const s = seuilPres(y, p, c);
    const cond = `${c.v} ${op} ${nb(s)}`;
    const ok = cmp(y, op, s);
    const forme = randomInt(0, 4);
    let q: string, bonne: string, choix: string[];
    const m = messages(c, op, s);
    if (forme === 4) {
      q = `Avec « si ${cond} alors [dire “${m.alors}”] sinon [dire “${m.sinon}”] », que dit le lutin ?`;
      bonne = ok ? m.alors : m.sinon;
      choix = shuffle([m.alors, m.sinon]);
    } else {
      const t = TOURNURES_VRAI[forme](cond);
      q = t.q;
      bonne = ok ? t.oui : t.non;
      choix = shuffle([t.oui, t.non]);
    }
    return {
      text: `${c.intro} ${modif ? presenter(prog) : `La variable ${c.v} vaut ${nb(x)}.`} ${q}`,
      ...reponseQcm(bonne, choix),
      explanation: expl(
        "une condition peut comparer des nombres relatifs.",
        "on place les deux nombres sur une droite graduée : le plus grand est le plus à droite.",
        [...st.trace, `${nb(y)} ${op} ${nb(s)} est ${ok ? "vrai" : "faux"}`],
        `la condition est ${ok ? "vraie" : "fausse"}, la réponse est « ${bonne} ».`
      ),
      canvas: canvasDe("Condition avec des relatifs", [...prog, { k: "si", c: { v: c.v, op, s }, alors: [{ k: "dire", t: m.alors }], sinon: [{ k: "dire", t: m.sinon }] }]),
    };
  });
}

/** ★3 — quelle valeur rend la condition vraie (ou fausse) ? */
function genConditionQuelleValeur() {
  return tirer(() => {
    const c = randomChoice(toutesSituations);
    const p = pas(c);
    const s = randomInt(c.min + 3, c.max - 3);
    const op = randomChoice(OPS);
    const cherche = Math.random() < 0.7;
    const pool = Array.from(new Set([s - 3, s - 2, s - 1, s, s + 1, s + 2, s + 3, s - p, s + p, s + 2 * p, s - 2 * p])).filter(
      (x) => (c.signe || x >= 0) && x !== undefined
    );
    const bons = pool.filter((x) => cmp(x, op, s) === cherche);
    const mauvais = pool.filter((x) => cmp(x, op, s) !== cherche);
    if (!bons.length || mauvais.length < 3) return null;
    const bonne = bons.includes(s) && Math.random() < 0.5 ? s : randomChoice(bons);
    const choix = makeChoices(nb(bonne), mauvais.map(nb));
    if (!choix) return null;
    const cond = `${c.v} ${op} ${nb(s)}`;
    const m = messages(c, op, s).alors;
    const q = cherche
      ? randomChoice([
          `Parmi ces valeurs ${de(c.v)}, laquelle rend la condition “${cond}” vraie ?`,
          `Pour quelle valeur ${de(c.v)} le bloc « alors » de « si ${cond} » est-il exécuté ?`,
          `Le programme contient « si ${cond} alors [dire “${m}”] ». Quelle valeur ${de(c.v)} fait dire “${m}” au lutin ?`,
          `Laquelle de ces valeurs passe le test “${cond}” ?`,
        ])
      : randomChoice([
          `Parmi ces valeurs ${de(c.v)}, laquelle rend la condition “${cond}” fausse ?`,
          `Pour quelle valeur ${de(c.v)} le bloc « alors » de « si ${cond} » est-il sauté ?`,
          `Laquelle de ces valeurs échoue au test “${cond}” ?`,
        ]);
    return {
      text: `${c.intro} ${q}`,
      ...reponseQcm(nb(bonne), choix),
      explanation: expl(
        "une condition est vraie pour certaines valeurs, fausse pour les autres.",
        "on teste chaque proposition une par une, en faisant attention à la valeur limite.",
        choix.map((x) => `${x} ${op} ${nb(s)} est ${cmp(Number(x.replace("−", "-")), op, s) ? "vrai" : "faux"}`),
        `la seule valeur qui rend la condition ${cherche ? "vraie" : "fausse"} est ${nb(bonne)}.`
      ),
      canvas: canvasDe("Quelle valeur ?", [{ k: "si", c: { v: c.v, op, s }, alors: [{ k: "dire", t: m }] }]),
    };
  });
}

/** ★4 — une expression à calculer dans la condition. */
const FORMES_EXPR: { txt: (v: string, a: number, b: number) => string; f: (x: number, a: number, b: number) => number; calc: (x: number, a: number, b: number) => string }[] = [
  { txt: (v, a, b) => `${a} × ${v} + ${b}`, f: (x, a, b) => a * x + b, calc: (x, a, b) => `${a} × ${par(x)} + ${b}` },
  { txt: (v, a, b) => `${a} × (${v} + ${b})`, f: (x, a, b) => a * (x + b), calc: (x, a, b) => `${a} × (${nb(x)} + ${b})` },
  { txt: (v, a, b) => `${a} × ${v} − ${b}`, f: (x, a, b) => a * x - b, calc: (x, a, b) => `${a} × ${par(x)} − ${b}` },
  { txt: (v, _a, b) => `${v} × ${v} + ${b}`, f: (x, _a, b) => x * x + b, calc: (x, _a, b) => `${par(x)} × ${par(x)} + ${b}` },
  { txt: (v, a, b) => `(${v} − ${b}) × ${a}`, f: (x, a, b) => (x - b) * a, calc: (x, a, b) => `(${nb(x)} − ${b}) × ${a}` },
  { txt: (v, a, b) => `${b} − ${a} × ${v}`, f: (x, a, b) => b - a * x, calc: (x, a, b) => `${b} − ${a} × ${par(x)}` },
  { txt: (v, _a, b) => `${v} + ${v} + ${b}`, f: (x, _a, b) => 2 * x + b, calc: (x, _a, b) => `${nb(x)} + ${par(x)} + ${b}` },
];
const VARS_EXPR = [
  { v: "x", intro: "Le lutin demande un nombre et le range dans la variable x." },
  { v: "n", intro: "Dans un programme de calcul, la variable n contient le nombre choisi." },
  { v: "t", intro: "Dans un jeu, la variable t contient un nombre tiré au hasard." },
  { v: "y", intro: "Un programme range dans la variable y le nombre tapé par l’utilisateur." },
  { v: "k", intro: "Un robot range dans la variable k le nombre lu sur son capteur." },
  // 08/10 : x va de −5 à 9 ; une carte à −3 n'existe pas, une température si.
  { v: "m", intro: "Un thermomètre range dans la variable m la température lue, en °C." },
  { v: "a", intro: "Une calculatrice programmée garde le nombre saisi dans la variable a." },
];

function genConditionExpression() {
  const ve = randomChoice(VARS_EXPR);
  const F = randomChoice(FORMES_EXPR);
  const x = randomInt(-5, 9);
  const a = randomInt(2, 5);
  const b = randomInt(1, 12);
  const val = F.f(x, a, b);
  const op = randomChoice(OPS);
  const s = randomChoice([val, val, val - 1, val + 1, val - 3, val + 4]);
  const cond = `${F.txt(ve.v, a, b)} ${op} ${nb(s)}`;
  const ok = cmp(val, op, s);
  const donnee = randomChoice([`On a ${ve.v} = ${nb(x)}.`, `La variable ${ve.v} vaut ${nb(x)}.`, `Le programme a exécuté « mettre ${ve.v} à ${nb(x)} ».`]);
  const t = randomChoice(TOURNURES_VRAI)(cond);
  const bonne = ok ? t.oui : t.non;
  return {
    text: `${ve.intro} ${donnee} ${t.q}`,
    ...reponseQcm(bonne, shuffle([t.oui, t.non])),
    explanation: expl(
      "une condition peut contenir une expression à calculer.",
      `on remplace ${ve.v} par ${nb(x)}, on calcule l’expression (priorités : parenthèses, puis ×, puis + et −), puis on compare.`,
      [`${F.calc(x, a, b)} = ${nb(val)}`, `${nb(val)} ${op} ${nb(s)} est ${ok ? "vrai" : "faux"}`],
      `la condition est ${ok ? "vraie" : "fausse"}, la réponse est « ${bonne} ».`
    ),
    canvas: scratchCanvas("Condition avec expression", [
      { type: "event" },
      { type: "set_variable", variable: ve.v, value: nb(x) },
      { type: "if", condition: cond, children: [{ type: "say", text: "Condition vraie" }] },
    ]),
  };
}

/** ★4 — deux tests reliés par « et » / « ou ». */
function genConditionEtOu() {
  return tirer(() => {
    const deuxVariables = Math.random() < 0.3;
    let cond: Cond, env: Record<string, number>, intro: string, donnee: string;
    if (deuxVariables) {
      const pr = randomChoice(PAIRES);
      const xa = randomInt(0, 20), xb = randomInt(0, 9);
      const c1: Cond = { v: pr.a, op: randomChoice([">", "≥", "<"] as Cmp[]), s: Math.max(0, xa + randomChoice([-3, 0, 2])) };
      const c2: Cond = { v: pr.b, op: randomChoice([">", "=", "≤"] as Cmp[]), s: Math.max(0, xb + randomChoice([-1, 0, 1])) };
      cond = Math.random() < 0.5 ? { et: [c1, c2] } : { ou: [c1, c2] };
      env = { [pr.a]: xa, [pr.b]: xb };
      intro = pr.intro;
      donnee = `${pr.a} vaut ${xa} et ${pr.b} vaut ${xb}.`;
    } else {
      const c = randomChoice(CTX);
      const p = pas(c);
      const x = randomInt(c.min, c.max);
      const s1 = Math.max(0, x + randomChoice([-2 * p, -p, 0, p, 1]));
      const s2 = s1 + randomChoice([p, 2 * p, 3 * p]);
      const v = c.v;
      cond = randomChoice<Cond>([
        { et: [{ v, op: ">", s: s1 }, { v, op: "<", s: s2 }] },
        { et: [{ v, op: "≥", s: s1 }, { v, op: "≤", s: s2 }] },
        { ou: [{ v, op: "<", s: s1 }, { v, op: ">", s: s2 }] },
        { ou: [{ v, op: "≤", s: s1 }, { v, op: "≥", s: s2 }] },
      ]);
      env = { [v]: x };
      intro = c.intro;
      donnee = randomChoice([`La variable ${v} vaut ${x}.`, `À cet instant, ${v} = ${x}.`]);
    }
    const ct = condTxt(cond);
    const ok = vraie(cond, env);
    const parties = "et" in cond ? cond.et : "ou" in cond ? cond.ou : [cond, cond];
    const t = randomChoice(TOURNURES_VRAI)(ct);
    const bonne = ok ? t.oui : t.non;
    const lien = "et" in cond ? "et" : "ou";
    return {
      text: `${intro} ${donnee} ${t.q}`,
      ...reponseQcm(bonne, shuffle([t.oui, t.non])),
      explanation: expl(
        "« A et B » est vraie seulement si les DEUX tests sont vrais ; « A ou B » est vraie dès qu’AU MOINS UN des deux est vrai.",
        "on teste chaque partie séparément, puis on les relie.",
        [
          ...parties.map((pt) => `“${condTxt(pt)}” est ${vraie(pt, env) ? "vrai" : "faux"}`),
          `les deux parties sont reliées par « ${lien} »`,
        ],
        `la condition est ${ok ? "vraie" : "fausse"}, la réponse est « ${bonne} ».`
      ),
      canvas: scratchCanvas("Condition composée", [
        { type: "event" },
        ...Object.entries(env).map(([v, n]): ScratchBlockData => ({ type: "set_variable", variable: v, value: nb(n) })),
        { type: "if", condition: ct, children: [{ type: "say", text: "Condition vraie" }] },
      ]),
    };
  });
}

/* ===========================================================================
   ALGO_INSTRUCTION_CONDITIONNELLE
=========================================================================== */

/** Début de programme : « mettre v à x », parfois suivi d'un ou deux « ajouter ». */
function debut(c: Ctx, nAjouts: number, negatifs = true): Ins[] {
  const p: Ins[] = [{ k: "set", v: c.v, n: randomInt(c.min, c.max) }];
  for (let j = 0; j < nAjouts; j++) {
    const k = pas(c);
    p.push({ k: "add", v: c.v, n: negatifs && Math.random() < 0.4 ? -k : k });
  }
  return p;
}

/** ★2 — « si … alors » sans « sinon » : le lutin peut ne rien dire. */
function genSiSimple() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const avant = debut(c, randomChoice([0, 0, 1]));
    const st0 = executer(avant);
    if (!plausible(st0)) return null;
    const op = randomChoice([">", "<", "≥", "≤"] as Cmp[]);
    const s = seuilPres(st0.env[c.v], pas(c), c);
    const m = messages(c, op);
    const prog: Ins[] = [...avant, { k: "si", c: { v: c.v, op, s }, alors: [{ k: "dire", t: m.alors }] }];
    const st = executer(prog);
    const bonne = st.dits[0] ?? "aucun message";
    return {
      text: `${c.intro} ${presenter(prog)} ${randomChoice(Q_MSG)}`,
      ...reponseQcm(bonne, shuffle([m.alors, m.sinon, "aucun message"])),
      explanation: expl(
        "un bloc « si … alors » exécute ce qu’il contient seulement si la condition est vraie ; sinon, il ne se passe rien.",
        "on exécute les blocs dans l’ordre, puis on teste la condition.",
        st.trace,
        bonne === "aucun message" ? "la condition est fausse, le lutin ne dit rien." : `le lutin dit “${bonne}”.`
      ),
      canvas: canvasDe("Si … alors", prog),
    };
  });
}

/** ★2 — « si … alors » qui modifie la variable. */
function genSiModifie() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const avant = debut(c, randomChoice([0, 1]), false);
    const st0 = executer(avant);
    const op = randomChoice([">", "<", "≥", "≤", "="] as Cmp[]);
    const s = seuilPres(st0.env[c.v], pas(c), c);
    const b = pas(c) * randomChoice([1, 1, -1]);
    const si: Ins = { k: "si", c: { v: c.v, op, s }, alors: [{ k: "add", v: c.v, n: b }] };
    const base = [...avant, si];
    const st1 = executer(base);
    if (!plausible(st1)) return null;
    const execute = vraie(si.c, st0.env);
    if (Math.random() < 0.3) {
      const t = randomChoice([
        { q: `Le bloc « ajouter ${nb(b)} à ${c.v} » est-il exécuté ?`, oui: "oui", non: "non" },
        { q: `L’instruction placée dans le « si » est-elle exécutée ?`, oui: "oui", non: "non" },
      ]);
      const bonne = execute ? t.oui : t.non;
      return {
        text: `${c.intro} ${presenter(base)} ${t.q}`,
        ...reponseQcm(bonne, shuffle([t.oui, t.non])),
        explanation: expl(
          "le contenu d’un « si » n’est exécuté que si la condition est vraie.",
          "on calcule la valeur de la variable au moment du test, puis on teste.",
          st1.trace,
          `la condition est ${execute ? "vraie : le bloc est exécuté" : "fausse : le bloc est sauté"}.`
        ),
        canvas: canvasDe("Si … alors", base),
      };
    }
    const { prog, q } = finirParValeur(base, c.v);
    const st = executer(prog);
    const f = st.env[c.v];
    return {
      text: `${c.intro} ${presenter(prog)} ${q}`,
      ...reponseNombre(f),
      explanation: expl(
        "un « si » peut modifier une variable, seulement quand sa condition est vraie.",
        "on suit les blocs dans l’ordre, en testant la condition avec la valeur du moment.",
        st.trace,
        `${c.v} vaut ${nb(f)} à la fin.`
      ),
      canvas: canvasDe("Si … alors", prog),
    };
  });
}

/** ★3 — « si … alors … sinon » : quel message ? */
function genSiSinonMessage() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const avant = debut(c, randomChoice([0, 1, 2]));
    const st0 = executer(avant);
    if (!plausible(st0)) return null;
    const op = randomChoice(OPS);
    const s = seuilPres(st0.env[c.v], pas(c), c);
    const m = messages(c, op, s);
    const prog: Ins[] = [...avant, { k: "si", c: { v: c.v, op, s }, alors: [{ k: "dire", t: m.alors }], sinon: [{ k: "dire", t: m.sinon }] }];
    const st = executer(prog);
    return {
      text: `${c.intro} ${presenter(prog)} ${randomChoice(Q_MSG)}`,
      ...reponseQcm(st.dits[0], shuffle([m.alors, m.sinon])),
      explanation: expl(
        "un bloc « si … alors … sinon » exécute UNE SEULE des deux branches.",
        "on calcule la valeur de la variable au moment du test, puis on choisit la branche.",
        st.trace,
        `le lutin dit “${st.dits[0]}”.`
      ),
      canvas: canvasDe("Si … sinon", prog),
    };
  });
}

/** ★3 — « si … sinon » dont les branches modifient la variable. */
function genSiSinonValeur() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const avant = debut(c, randomChoice([0, 1]));
    const st0 = executer(avant);
    const op = randomChoice(OPS);
    const s = seuilPres(st0.env[c.v], pas(c), c);
    const g = pas(c), l = pas(c);
    const branche = (n: number): Ins[] =>
      Math.random() < 0.25 ? [{ k: "calc", v: c.v, a: c.v, op: "×", b: 2 }] : [{ k: "add", v: c.v, n }];
    const base: Ins[] = [...avant, { k: "si", c: { v: c.v, op, s }, alors: branche(g), sinon: branche(-l) }];
    const { prog, q } = finirParValeur(base, c.v);
    const st = executer(prog);
    if (!plausible(st)) return null;
    return {
      text: `${c.intro} ${presenter(prog)} ${q}`,
      ...reponseNombre(st.env[c.v]),
      explanation: expl(
        "dans un « si … sinon », une seule branche modifie la variable.",
        "on teste la condition avec la valeur du moment, puis on n’applique QUE la branche choisie.",
        st.trace,
        `${c.v} vaut ${nb(st.env[c.v])} à la fin.`
      ),
      canvas: canvasDe("Si … sinon", prog),
    };
  });
}

/** ★3 — deux « si » à la suite, un plafond, un « si » suivi d'un ajout. */
function genDeuxSi() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const x = randomInt(c.min, c.max);
    const p = pas(c);
    const forme = randomInt(0, 2);
    let base: Ins[];
    if (forme === 0) {
      const s1 = seuilPres(x, p, c);
      const a = p * randomChoice([1, -1]);
      const s2 = seuilPres(x + a, p, c);
      base = [
        { k: "set", v: c.v, n: x },
        { k: "si", c: { v: c.v, op: randomChoice(OPS), s: s1 }, alors: [{ k: "add", v: c.v, n: a }] },
        { k: "si", c: { v: c.v, op: randomChoice(OPS), s: s2 }, alors: [{ k: "add", v: c.v, n: pas(c) * randomChoice([1, -1]) }] },
      ];
    } else if (forme === 1) {
      const s = seuilPres(x, p, c);
      base = [
        { k: "set", v: c.v, n: x },
        { k: "si", c: { v: c.v, op: randomChoice(OPS), s }, alors: [{ k: "add", v: c.v, n: p }] },
        { k: "add", v: c.v, n: pas(c) * randomChoice([1, -1]) },
      ];
    } else {
      const k = pas(c) * randomChoice([1, 2]);
      const plafond = Math.random() < 0.5;
      const s = seuilPres(x + k, p, c);
      base = [
        { k: "set", v: c.v, n: x },
        { k: "add", v: c.v, n: plafond ? k : -k },
        { k: "si", c: { v: c.v, op: plafond ? ">" : "<", s }, alors: [{ k: "set", v: c.v, n: s }] },
      ];
    }
    const { prog, q } = finirParValeur(base, c.v);
    const st = executer(prog);
    if (!plausible(st)) return null;
    return {
      text: `${c.intro} ${presenter(prog)} ${q}`,
      ...reponseNombre(st.env[c.v]),
      explanation: expl(
        "chaque « si » teste sa condition au moment où le programme arrive dessus.",
        "on suit les blocs dans l’ordre ; un test utilise la valeur ACTUELLE de la variable, déjà modifiée par les blocs d’avant.",
        st.trace,
        `${c.v} vaut ${nb(st.env[c.v])} à la fin.`
      ),
      canvas: canvasDe("Plusieurs « si »", prog),
    };
  });
}

/** ★4 — une branche modifie la variable, puis un second test décide du message. */
function genSiPuisMessage() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const avant = debut(c, randomChoice([0, 1]));
    const st0 = executer(avant);
    const y = st0.env[c.v];
    const p = pas(c);
    const op1 = randomChoice(OPS), op2 = randomChoice(OPS);
    const s1 = seuilPres(y, p, c);
    const g = pas(c), l = pas(c);
    const y2 = vraie({ v: c.v, op: op1, s: s1 }, st0.env) ? y + g : y - l;
    const s2 = seuilPres(y2, p, c);
    const m = messages(c, op2, s2);
    const prog: Ins[] = [
      ...avant,
      { k: "si", c: { v: c.v, op: op1, s: s1 }, alors: [{ k: "add", v: c.v, n: g }], sinon: [{ k: "add", v: c.v, n: -l }] },
      { k: "si", c: { v: c.v, op: op2, s: s2 }, alors: [{ k: "dire", t: m.alors }], sinon: [{ k: "dire", t: m.sinon }] },
    ];
    const st = executer(prog);
    if (!plausible(st)) return null;
    return {
      text: `${c.intro} ${presenter(prog)} ${randomChoice(Q_MSG)}`,
      ...reponseQcm(st.dits[0], shuffle([m.alors, m.sinon])),
      explanation: expl(
        "dans un « si … sinon », une seule branche est exécutée ; le test suivant voit la variable déjà modifiée.",
        "on exécute les blocs dans l’ordre, en recalculant la variable avant chaque test.",
        st.trace,
        `le lutin dit “${st.dits[0]}”.`
      ),
      canvas: canvasDe("Deux tests", prog),
    };
  });
}

/** ★4 — trois cas : un « si … sinon » dans le « sinon ». */
const TROIS_CAS = [
  { v: "temps", intro: "Un feu piéton choisit sa couleur selon le temps écoulé, en secondes.", m: ["Vert", "Orange", "Rouge"], min: 0, max: 60 },
  { v: "note", intro: "Une application de quiz attribue une médaille selon la note sur 20.", m: ["Bronze", "Argent", "Or"], min: 0, max: 20 },
  { v: "température", intro: "Un thermostat choisit un mode selon la température, en °C.", m: ["Chauffage fort", "Chauffage doux", "Chauffage éteint"], min: 10, max: 26 },
  { v: "âge", intro: "Une borne de cinéma choisit le tarif selon l’âge du spectateur.", m: ["Tarif enfant", "Tarif plein", "Tarif senior"], min: 4, max: 85 },
  { v: "vitesse", intro: "Un radar pédagogique réagit à la vitesse des voitures, en km/h.", m: ["Merci", "Attention", "Ralentissez"], min: 20, max: 60 },
  { v: "batterie", intro: "Un téléphone affiche une icône selon le pourcentage de batterie.", m: ["Batterie faible", "Batterie moyenne", "Batterie pleine"], min: 0, max: 100 },
  { v: "vent", intro: "Un club de voile choisit un drapeau selon la vitesse du vent, en nœuds.", m: ["Drapeau vert", "Drapeau orange", "Drapeau rouge"], min: 0, max: 40 },
  { v: "niveau", intro: "Un capteur de rivière surveille la hauteur de l’eau, en centimètres.", m: ["Normal", "Vigilance", "Alerte crue"], min: 50, max: 300 },
];

function genTroisCas() {
  return tirer(() => {
    const T = randomChoice(TROIS_CAS);
    const span = T.max - T.min;
    const c1 = T.min + Math.round(span * (0.25 + Math.random() * 0.2));
    const c2 = c1 + Math.max(2, Math.round(span * (0.2 + Math.random() * 0.2)));
    if (c2 >= T.max) return null;
    const x = Math.random() < 0.35 ? randomChoice([c1, c2]) : randomInt(T.min, T.max);
    const montant = Math.random() < 0.5;
    const opBas = randomChoice(["<", "≤"] as Cmp[]);
    const opHaut = randomChoice([">", "≥"] as Cmp[]);
    const si: Ins = montant
      ? { k: "si", c: { v: T.v, op: opBas, s: c1 }, alors: [{ k: "dire", t: T.m[0] }], sinon: [{ k: "si", c: { v: T.v, op: opBas, s: c2 }, alors: [{ k: "dire", t: T.m[1] }], sinon: [{ k: "dire", t: T.m[2] }] }] }
      : { k: "si", c: { v: T.v, op: opHaut, s: c2 }, alors: [{ k: "dire", t: T.m[2] }], sinon: [{ k: "si", c: { v: T.v, op: opHaut, s: c1 }, alors: [{ k: "dire", t: T.m[1] }], sinon: [{ k: "dire", t: T.m[0] }] }] };
    const prog: Ins[] = [{ k: "set", v: T.v, n: x }, si];
    const st = executer(prog);
    const q = randomChoice([...Q_MSG, `Pour ${T.v} = ${x}, que dit le lutin ?`]);
    return {
      text: `${T.intro} ${presenter(prog)} ${q}`,
      ...reponseQcm(st.dits[0], shuffle([...T.m])),
      explanation: expl(
        "un « si … sinon » placé dans un « sinon » permet de distinguer trois cas.",
        "on teste la première condition ; si elle est fausse seulement, on passe au second test.",
        st.trace,
        `le lutin dit “${st.dits[0]}”.`
      ),
      canvas: canvasDe("Trois cas", prog),
    };
  });
}

/** ★5 — une condition DANS une boucle. */
function genSiDansBoucle() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const x = randomInt(c.min, c.max);
    const p = pas(c);
    const n = randomInt(3, 6);
    const forme = randomInt(0, 2);
    let base: Ins[];
    let v = c.v;
    if (forme === 0) {
      const s = x + randomInt(1, 3) * p;
      base = [{ k: "set", v: c.v, n: x }, { k: "rep", n, corps: [{ k: "add", v: c.v, n: p }, { k: "si", c: { v: c.v, op: randomChoice([">", "≥"] as Cmp[]), s }, alors: [{ k: "add", v: c.v, n: -randomInt(2, 3) * p }] }] }];
    } else if (forme === 1) {
      const s = x + randomInt(1, 3) * p;
      base = [
        { k: "set", v: c.v, n: x },
        { k: "set", v: "alertes", n: 0 },
        { k: "rep", n, corps: [{ k: "add", v: c.v, n: p }, { k: "si", c: { v: c.v, op: randomChoice([">", "≥"] as Cmp[]), s }, alors: [{ k: "add", v: "alertes", n: 1 }, { k: "set", v: c.v, n: x }] }] },
      ];
      v = Math.random() < 0.7 ? "alertes" : c.v;
    } else {
      const s = x + randomChoice([0, p, -p]);
      base = [{ k: "set", v: c.v, n: x }, { k: "rep", n, corps: [{ k: "si", c: { v: c.v, op: randomChoice(["<", "≤"] as Cmp[]), s }, alors: [{ k: "add", v: c.v, n: p + 1 }], sinon: [{ k: "add", v: c.v, n: -p }] }] }];
    }
    const { prog, q } = finirParValeur(base, v);
    const st = executer(prog);
    if (!plausible(st)) return null;
    return {
      text: `${c.intro} ${presenter(prog)} ${q}`,
      ...reponseNombre(st.env[v]),
      explanation: expl(
        "une condition placée dans une boucle est testée à CHAQUE tour, avec la valeur du moment.",
        "on fait un tableau des tours : à chaque tour, on exécute les blocs dans l’ordre.",
        st.trace,
        `${v} vaut ${nb(st.env[v])} à la fin.`
      ),
      canvas: canvasDe("Condition dans une boucle", prog),
    };
  });
}

/** ★5 — quelle valeur de départ produit tel message ? */
function genValeurDeDepart() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const p = pas(c);
    const k = p * randomChoice([1, 2, -1]);
    const op = randomChoice(OPS);
    const s = randomInt(c.min + 2 * p, c.max);
    const m = messages(c, op, s);
    const corps: Ins[] = [{ k: "add", v: c.v, n: k }, { k: "si", c: { v: c.v, op, s }, alors: [{ k: "dire", t: m.alors }], sinon: [{ k: "dire", t: m.sinon }] }];
    const visee = Math.random() < 0.6 ? m.alors : m.sinon;
    const pool = Array.from(new Set([s - k, s - k - 1, s - k + 1, s - k - p, s - k + p, s - k + 2 * p, s - k - 2 * p])).filter((d) => d >= 0);
    const dit = (d: number) => executer(corps, { [c.v]: d }).dits[0];
    const bons = pool.filter((d) => dit(d) === visee);
    const mauvais = pool.filter((d) => dit(d) !== visee);
    if (!bons.length || mauvais.length < 3) return null;
    const bonne = randomChoice(bons);
    const choix = makeChoices(nb(bonne), mauvais.map(nb));
    if (!choix) return null;
    const st = executer(corps, { [c.v]: bonne });
    const q = randomChoice([
      `Parmi ces valeurs de départ ${de(c.v)}, laquelle fait dire “${visee}” au lutin ?`,
      `Avec quelle valeur de départ le lutin dit-il “${visee}” ?`,
      `Quelle valeur de départ ${de(c.v)} mène au message “${visee}” ?`,
    ]);
    return {
      text: `${c.intro} Au départ, ${c.v} contient un nombre inconnu. Puis le programme exécute ${progTxt(corps)}. ${q}`,
      ...reponseQcm(nb(bonne), choix),
      explanation: expl(
        "pour prévoir le message, il faut connaître la valeur de la variable AU MOMENT du test.",
        `pour chaque proposition, on ajoute d’abord ${par(k)}, puis on teste “${condTxt({ v: c.v, op, s })}”.`,
        [`avec ${nb(bonne)} au départ : ${st.trace.join(" ; ")}`],
        `seule la valeur ${nb(bonne)} fait dire “${visee}”.`
      ),
      canvas: canvasDe("Valeur de départ ?", corps, [{ type: "set_variable", variable: c.v, value: "?" }]),
    };
  });
}

/* ===========================================================================
   ALGO_VARIABLE
=========================================================================== */

/** ★2 — « mettre … à » remplace la valeur. */
function genInitialisation() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const forme = randomInt(0, 3);
    const v = () => randomInt(c.min, c.max);
    const base: Ins[] =
      forme === 0
        ? [{ k: "set", v: c.v, n: v() }]
        : forme === 1
          ? [{ k: "set", v: c.v, n: v() }, { k: "set", v: c.v, n: v() }]
          : forme === 2
            ? [{ k: "set", v: c.v, n: v() }, { k: "add", v: c.v, n: pas(c) }, { k: "set", v: c.v, n: v() }]
            : [{ k: "set", v: c.v, n: v() }, { k: "set", v: c.v, n: v() }, { k: "add", v: c.v, n: pas(c) }];
    const { prog, q } = finirParValeur(base, c.v);
    const st = executer(prog);
    if (!plausible(st)) return null;
    return {
      text: `${c.intro} ${presenter(prog)} ${q}`,
      ...reponseNombre(st.env[c.v]),
      explanation: expl(
        "« mettre … à » REMPLACE la valeur de la variable ; « ajouter … à » la modifie.",
        "on suit les blocs dans l’ordre en notant la valeur après chacun.",
        st.trace,
        `${c.v} vaut ${nb(st.env[c.v])} à la fin.`
      ),
      canvas: canvasDe("Mettre à", prog),
    };
  });
}

/** ★2 — un, deux ou trois ajouts positifs. */
function genAjouts() {
  const c = randomChoice(CTX);
  const n = randomInt(1, 3);
  const base: Ins[] = [{ k: "set", v: c.v, n: randomInt(c.min, c.max) }];
  for (let j = 0; j < n; j++) base.push({ k: "add", v: c.v, n: pas(c) });
  const { prog, q } = finirParValeur(base, c.v);
  const st = executer(prog);
  return {
    text: `${c.intro} ${presenter(prog)} ${q}`,
    ...reponseNombre(st.env[c.v]),
    explanation: expl(
      "« ajouter … à » augmente la valeur actuelle de la variable.",
      "on part de la valeur de départ et on applique chaque ajout dans l’ordre.",
      st.trace,
      `${c.v} vaut ${nb(st.env[c.v])} à la fin.`
    ),
    canvas: canvasDe("Ajouter à", prog),
  };
}

/** ★2 — deux variables : on ne modifie que celle qui est nommée. */
function genDeuxVariables() {
  const pr = randomChoice(PAIRES);
  const a = randomInt(0, 20), b = randomInt(1, 9);
  const forme = randomInt(0, 2);
  const base: Ins[] =
    forme === 0
      ? [{ k: "set", v: pr.a, n: a }, { k: "set", v: pr.b, n: b }, { k: "add", v: pr.a, n: randomInt(1, 6) }]
      : forme === 1
        ? [{ k: "set", v: pr.a, n: a }, { k: "add", v: pr.a, n: randomInt(1, 6) }, { k: "set", v: pr.b, n: b }, { k: "add", v: pr.b, n: randomInt(1, 4) }]
        : [{ k: "set", v: pr.b, n: b }, { k: "set", v: pr.a, n: a }, { k: "add", v: pr.b, n: randomInt(1, 4) }, { k: "add", v: pr.a, n: randomInt(1, 6) }];
  const cible = randomChoice([pr.a, pr.b]);
  const { prog, q } = finirParValeur(base, cible);
  const st = executer(prog);
  return {
    text: `${pr.intro} ${presenter(prog)} ${q}`,
    ...reponseNombre(st.env[cible]),
    explanation: expl(
      "chaque variable a sa propre valeur ; un bloc ne modifie que la variable qu’il nomme.",
      `on suit les blocs dans l’ordre, en ne regardant que ceux qui concernent ${cible}.`,
      st.trace,
      `${cible} vaut ${nb(st.env[cible])} à la fin.`
    ),
    canvas: canvasDe("Deux variables", prog),
  };
}

/** ★3 — ajouts positifs et négatifs mêlés. */
function genAjoutsRelatifs() {
  return tirer(() => {
    const c = randomChoice(Math.random() < 0.7 ? CTX : CTX_REL);
    const n = randomInt(2, 4);
    const base: Ins[] = [{ k: "set", v: c.v, n: randomInt(c.min, c.max) }];
    let neg = 0;
    for (let j = 0; j < n; j++) {
      const k = pas(c);
      const negatif = Math.random() < 0.5;
      if (negatif) neg++;
      base.push({ k: "add", v: c.v, n: negatif ? -k : k });
    }
    if (!neg) return null;
    const { prog, q } = finirParValeur(base, c.v);
    const st = executer(prog);
    if (!plausible(st, c.signe)) return null;
    return {
      text: `${c.intro} ${presenter(prog)} ${q}`,
      ...reponseNombre(st.env[c.v]),
      explanation: expl(
        "ajouter un nombre négatif revient à soustraire sa distance à zéro.",
        "on applique chaque ajout dans l’ordre.",
        st.trace,
        `${c.v} vaut ${nb(st.env[c.v])} à la fin.`
      ),
      canvas: canvasDe("Ajouts relatifs", prog),
    };
  });
}

/** ★3 — « mettre v à v × 2 », « mettre v à v − 3 » : la variable dans son propre calcul. */
function genCalculs() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const n = randomInt(2, 3);
    const base: Ins[] = [{ k: "set", v: c.v, n: randomInt(Math.max(1, c.min), Math.min(c.max, 20)) }];
    const faits = new Set<string>();
    for (let j = 0; j < n; j++) {
      const t = randomChoice(["add", "mul", "moins"]);
      faits.add(t);
      if (t === "add") base.push({ k: "add", v: c.v, n: pas(c) });
      else if (t === "mul") base.push({ k: "calc", v: c.v, a: c.v, op: "×", b: randomChoice([2, 3]) });
      else base.push({ k: "calc", v: c.v, a: c.v, op: "−", b: pas(c) });
    }
    if (!faits.has("mul") && !faits.has("moins")) return null;
    const { prog, q } = finirParValeur(base, c.v);
    const st = executer(prog);
    if (!plausible(st) || st.max > 300) return null;
    return {
      text: `${c.intro} ${presenter(prog)} ${q}`,
      ...reponseNombre(st.env[c.v]),
      explanation: expl(
        `dans « mettre ${c.v} à ${c.v} × 2 », on calcule avec l’ANCIENNE valeur, puis le résultat devient la nouvelle.`,
        "on suit les blocs dans l’ordre en notant la valeur après chacun.",
        st.trace,
        `${c.v} vaut ${nb(st.env[c.v])} à la fin.`
      ),
      canvas: canvasDe("Calculer avec une variable", prog),
    };
  });
}

/** ★4 — une boucle « répéter » modifie la variable. */
function genBoucleVariable() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const x = randomInt(c.min, Math.min(c.max, 20));
    const k = pas(c);
    const n = randomInt(3, 6);
    const forme = randomInt(0, 5);
    const set: Ins = { k: "set", v: c.v, n: x };
    const base: Ins[] =
      forme === 0
        ? [set, { k: "rep", n, corps: [{ k: "add", v: c.v, n: k }] }]
        : forme === 1
          ? [set, { k: "rep", n, corps: [{ k: "add", v: c.v, n: k }] }, { k: "add", v: c.v, n: -pas(c) }]
          : forme === 2
            ? [set, { k: "add", v: c.v, n: pas(c) }, { k: "rep", n, corps: [{ k: "add", v: c.v, n: k }] }]
            : forme === 3
              ? [set, { k: "rep", n, corps: [{ k: "add", v: c.v, n: k + 2 }, { k: "add", v: c.v, n: -k }] }]
              : forme === 4
                ? [{ k: "set", v: c.v, n: randomInt(1, 5) }, { k: "rep", n: randomInt(2, 4), corps: [{ k: "calc", v: c.v, a: c.v, op: "×", b: 2 }] }]
                : [set, { k: "rep", n: randomInt(2, 4), corps: [{ k: "add", v: c.v, n: k }] }, { k: "calc", v: c.v, a: c.v, op: "×", b: 2 }];
    const { prog, q } = finirParValeur(base, c.v);
    const st = executer(prog);
    if (!plausible(st) || st.max > 400) return null;
    return {
      text: `${c.intro} ${presenter(prog)} ${q}`,
      ...reponseNombre(st.env[c.v]),
      explanation: expl(
        "« répéter n fois » exécute n fois de suite les blocs qu’il contient.",
        "on note la valeur de la variable à la fin de chaque tour.",
        st.trace,
        `${c.v} vaut ${nb(st.env[c.v])} à la fin.`
      ),
      canvas: canvasDe("Boucle et variable", prog),
    };
  });
}

/** ★4 — deux variables qui se calculent l'une avec l'autre. */
function genVariablesLiees() {
  return tirer(() => {
    const pr = randomChoice(PAIRES);
    const a = randomInt(2, 20), b = randomInt(1, 9);
    const A = pr.a, B = pr.b;
    const forme = randomInt(0, 3);
    const base: Ins[] =
      forme === 0
        ? [{ k: "set", v: A, n: a }, { k: "set", v: B, n: b }, { k: "calc", v: A, a: A, op: "+", b: B }, { k: "calc", v: A, a: A, op: "+", b: B }]
        : forme === 1
          ? [{ k: "set", v: A, n: a }, { k: "set", v: B, n: b }, { k: "calc", v: A, a: A, op: "+", b: B }, { k: "calc", v: B, a: A, op: "−", b: B }]
          : forme === 2
            ? [{ k: "set", v: A, n: a }, { k: "set", v: B, n: b }, { k: "rep", n: randomInt(2, 4), corps: [{ k: "calc", v: A, a: A, op: "+", b: B }] }]
            : [{ k: "set", v: A, n: a }, { k: "set", v: B, n: b }, { k: "calc", v: B, a: B, op: "×", b: 2 }, { k: "calc", v: A, a: A, op: "+", b: B }];
    const cible = forme === 1 ? randomChoice([A, B]) : A;
    const { prog, q } = finirParValeur(base, cible);
    const st = executer(prog);
    if (!plausible(st)) return null;
    return {
      text: `${pr.intro} ${presenter(prog)} ${q}`,
      ...reponseNombre(st.env[cible]),
      explanation: expl(
        "une variable peut se calculer à partir d’une autre ; on utilise toujours leurs valeurs ACTUELLES.",
        "on note la valeur des deux variables après chaque bloc.",
        st.trace,
        `${cible} vaut ${nb(st.env[cible])} à la fin.`
      ),
      canvas: canvasDe("Variables liées", prog),
    };
  });
}

/* ===========================================================================
   ALGO_PROGRAMME_OBJECTIF
=========================================================================== */

/** ★2 — quel bloc réalise l'objectif ? */
function genChoisirBloc() {
  const c = randomChoice(CTX);
  const n = Math.max(2, pas(c));
  const v = c.v;
  const cas = randomChoice([
    { obj: `remettre ${c.quoi} à ${n} au début de chaque partie`, bon: `mettre ${v} à ${n}`, faux: [`ajouter ${n} à ${v}`, `ajouter −${n} à ${v}`, `mettre ${v} à ${v} × ${n}`, `répéter ${n} fois [ajouter 1 à ${v}]`] },
    { obj: `augmenter ${c.quoi} de ${n}`, bon: `ajouter ${n} à ${v}`, faux: [`mettre ${v} à ${n}`, `ajouter −${n} à ${v}`, `mettre ${v} à ${v} × ${n}`] },
    { obj: `diminuer ${c.quoi} de ${n}`, bon: `ajouter −${n} à ${v}`, faux: [`ajouter ${n} à ${v}`, `mettre ${v} à −${n}`, `mettre ${v} à ${n}`] },
    { obj: `doubler ${c.quoi}`, bon: `mettre ${v} à ${v} × 2`, faux: [`ajouter 2 à ${v}`, `mettre ${v} à 2`, `ajouter −2 à ${v}`] },
    { obj: `tripler ${c.quoi}`, bon: `mettre ${v} à ${v} × 3`, faux: [`ajouter 3 à ${v}`, `mettre ${v} à 3`, `mettre ${v} à ${v} + 3`] },
  ]);
  const q = randomChoice([
    "Quel bloc faut-il utiliser ?",
    "Quelle instruction convient ?",
    "Quel bloc réalise cet objectif ?",
    "Parmi ces blocs, lequel faut-il placer ?",
  ]);
  const amorce = randomChoice([`On veut ${cas.obj} (variable ${v}).`, `Objectif : ${cas.obj} ; la variable s’appelle ${v}.`, `Le programme doit ${cas.obj} ; la variable s’appelle ${v}.`]);
  return {
    text: `${c.intro} ${amorce} ${q}`,
    ...reponseQcm(`« ${cas.bon} »`, makeChoices(`« ${cas.bon} »`, cas.faux.map((f) => `« ${f} »`))!),
    explanation: expl(
      "« mettre … à » fixe une valeur ; « ajouter … à » augmente (ou diminue, avec un nombre négatif) ; « mettre v à v × 2 » double.",
      "on traduit l’objectif mot à mot en bloc.",
      [`« ${cas.obj} » se programme avec « ${cas.bon} »`],
      `le bon bloc est « ${cas.bon} ».`
    ),
  };
}

/** Le but d'un programme : quelques familles de programmes et leur objectif. */
function butFacile(c: Ctx) {
  const v = c.v;
  const n = randomInt(3, 6), k = pas(c) + 1, a = randomInt(c.min, Math.min(c.max, 15)), s = randomInt(c.min + 1, c.max);
  const famille = randomInt(0, 2);
  if (famille === 0) {
    const prog: Ins[] = [{ k: "set", v, n: a }, { k: "rep", n, corps: [{ k: "add", v, n: k }] }];
    const f = executer(prog).env[v];
    return { prog, bon: `faire passer ${v} de ${a} à ${f}`, faux: [`faire passer ${v} de ${a} à ${a + k}`, `faire passer ${v} de ${a} à ${a + n}`, `faire passer ${v} de ${a} à ${n * k + n}`, `faire passer ${v} de ${a} à ${a + n + k}`] };
  }
  if (famille === 1) {
    const m = randomChoice([2, 3]);
    const prog: Ins[] = [{ k: "calc", v, a: v, op: "×", b: m }];
    const mot = m === 2 ? "doubler" : "tripler";
    return { prog, bon: `${mot} ${c.quoi}`, faux: [`ajouter ${m} à ${v}`, `mettre ${v} à ${m}`, `diviser ${v} par ${m}`, `répéter ${m} fois le programme`] };
  }
  const op = randomChoice(OPS);
  const m = messages(c, op, s);
  const prog: Ins[] = [{ k: "si", c: { v, op, s }, alors: [{ k: "dire", t: m.alors }], sinon: [{ k: "dire", t: m.sinon }] }];
  const ph = (o: Cmp) => `dire “${m.alors}” quand ${c.quoi} ${phrasesObjectif(o, c.f)[0]} ${s}, sinon “${m.sinon}”`;
  return { prog, bon: ph(op), faux: OPS.filter((o) => o !== op).map(ph) };
}

function butDifficile(c: Ctx) {
  const v = c.v;
  const s = randomInt(c.min + 2, c.max);
  // « mettre température à 0 » n'a pas de sens : la famille 2 part de 0, seulement là où 0 est plausible.
  const f0 = randomInt(0, 3);
  const famille = f0 === 2 && c.min > 0 ? 3 : f0;
  if (famille === 0)
    return { prog: [{ k: "si", c: { v, op: "<", s }, alors: [{ k: "set", v, n: s }] }] as Ins[], bon: `empêcher ${v} de descendre en dessous de ${s}`, faux: [`empêcher ${v} de dépasser ${s}`, `mettre toujours ${v} à ${s}`, `ajouter ${s} à ${v}`, `dire ${v} quand ${v} vaut ${s}`] };
  if (famille === 1)
    return { prog: [{ k: "si", c: { v, op: ">", s }, alors: [{ k: "set", v, n: s }] }] as Ins[], bon: `empêcher ${v} de dépasser ${s}`, faux: [`empêcher ${v} de descendre en dessous de ${s}`, `mettre toujours ${v} à ${s}`, `ajouter ${s} à ${v}`, `dire ${v} quand ${v} vaut ${s}`] };
  if (famille === 2) {
    const n = randomInt(3, 7), k = randomInt(2, 9);
    return { prog: [{ k: "set", v, n: 0 }, { k: "rep", n, corps: [{ k: "add", v, n: k }] }] as Ins[], bon: `mettre dans ${v} le résultat de ${n} × ${k}`, faux: [`mettre dans ${v} le résultat de ${n} + ${k}`, `mettre dans ${v} le résultat de ${k} + ${k}`, `ajouter ${n} à ${v}`, `mettre ${v} à ${k}`] };
  }
  const p = pas(c);
  return {
    prog: [{ k: "si", c: { v, op: ">", s }, alors: [{ k: "add", v, n: -p }], sinon: [{ k: "add", v, n: p }] }] as Ins[],
    bon: `faire baisser ${v} s’il dépasse ${s}, le faire monter sinon`,
    faux: [`faire monter ${v} s’il dépasse ${s}, le faire baisser sinon`, `faire toujours baisser ${v}`, `mettre ${v} à ${s}`, `ajouter ${p} à ${v} deux fois`],
  };
}

function genBut(difficile: boolean) {
  return () =>
    tirer(() => {
      const c = randomChoice(CTX);
      const B = difficile ? butDifficile(c) : butFacile(c);
      const choix = makeChoices(B.bon, B.faux);
      if (!choix) return null;
      const q = randomChoice(["Quel est le but de ce programme ?", "À quoi sert ce programme ?", "Que fait ce programme ?", "Quel objectif ce programme atteint-il ?"]);
      return {
        text: `${c.intro} ${presenter(B.prog)} ${q}`,
        ...reponseQcm(B.bon, choix),
        explanation: expl(
          "trouver le but d’un programme, c’est dire en français ce qu’il fait, quelle que soit la valeur de départ.",
          "on lit chaque bloc et on se demande ce qu’il change ; on peut essayer avec une ou deux valeurs.",
          [`le programme ${progTxt(B.prog)} sert à ${B.bon}`],
          `le but est ${/^[aeiouyéèê]/i.test(B.bon) ? "d’" : "de "}${B.bon}.`
        ),
        canvas: canvasDe("Quel est le but ?", B.prog),
      };
    });
}

/** ★3 — traduire un objectif en condition. */
function genObjectifCondition() {
  const c = randomChoice(CTX);
  const op = randomChoice(OPS);
  const s = randomInt(c.min + 1, c.max);
  const ph = `${randomChoice(phrasesObjectif(op, c.f))} ${s}`;
  const m = messages(c, op, s).alors;
  const amorce = randomChoice([
    `On veut que le programme dise “${m}” seulement quand ${c.quoi} ${ph}.`,
    `Objectif : afficher “${m}” lorsque ${c.quoi} ${ph}.`,
    `Le lutin doit dire “${m}” si ${c.quoi} ${ph}.`,
  ]);
  const q = randomChoice([`Quelle condition faut-il écrire dans le bloc « si » ?`, "Quel test faut-il utiliser ?", "Quelle condition traduit cet objectif ?", "Que faut-il écrire après « si » ?"]);
  const cond = (o: Cmp) => `${c.v} ${o} ${s}`;
  return {
    text: `${c.intro} ${amorce} (La variable s’appelle ${c.v}.) ${q}`,
    ...reponseQcm(cond(op), makeChoices(cond(op), OPS.filter((o) => o !== op).map(cond))!),
    explanation: expl(
      "« dépasse » et « strictement » donnent > ou < ; « au moins », « au plus », « ne dépasse pas » incluent la limite : ≥ ou ≤.",
      "on traduit l’objectif mot à mot, puis on vérifie avec la valeur limite.",
      [`« ${ph} » se traduit par “${cond(op)}”`, `pour ${c.v} = ${s}, le message ${cmp(s, op, s) ? "doit" : "ne doit pas"} s’afficher`],
      `la condition est “${cond(op)}”.`
    ),
  };
}

/** ★3 — un programme de calcul : quelle expression ? */
function genProgrammeCalcul() {
  return tirer(() => {
    const L = randomChoice(["x", "n", "t", "y", "k"]);
    const a = randomInt(2, 9), b = randomInt(1, 12), cc = randomInt(1, 9);
    type Etape = { o: "×" | "+" | "−"; n: number };
    const toutes: Etape[] = [{ o: "×", n: a }, { o: "+", n: b }, { o: "−", n: cc }];
    const etapes = shuffle(toutes).slice(0, randomChoice([2, 3]));
    const ecrire = (es: Etape[], parentheses = true) => {
      let e = L;
      let somme = false;
      for (const st of es) {
        if (st.o === "×") {
          e = somme ? (parentheses ? `(${e}) × ${st.n}` : `${e} × ${st.n}`) : e === L ? `${st.n} × ${e}` : `${e} × ${st.n}`;
          somme = false;
        } else {
          e = `${e} ${st.o} ${st.n}`;
          somme = true;
        }
      }
      return e;
    };
    const valeur = (es: Etape[], x: number) => es.reduce((r, st) => (st.o === "×" ? r * st.n : st.o === "+" ? r + st.n : r - st.n), x);
    const bon = ecrire(etapes);
    const faux = new Set<string>();
    const perm = (arr: Etape[]): Etape[][] => (arr.length <= 1 ? [arr] : arr.flatMap((x, i) => perm([...arr.slice(0, i), ...arr.slice(i + 1)]).map((r) => [x, ...r])));
    for (const p of perm(etapes)) faux.add(ecrire(p));
    faux.add(ecrire(etapes, false));
    for (let i = 0; i < etapes.length; i++) {
      const alt = etapes.map((e, j) => (j === i ? { o: (e.o === "×" ? "+" : "×") as Etape["o"], n: e.n } : e));
      faux.add(ecrire(alt));
    }
    const differents = [...faux].filter((f) => f !== bon);
    // un leurre ne doit pas être ÉGAL à la bonne réponse pour toutes les valeurs
    const evalTxt = (txt: string, x: number) => Function("x", `return ${txt.replace(new RegExp(`\\b${L}\\b`, "g"), "x").replace(/×/g, "*").replace(/−/g, "-")};`)(x) as number;
    const ok = differents.filter((f) => [1.5, 2.7, -3.1].some((x) => Math.abs(evalTxt(f, x) - valeur(etapes, x)) > 1e-9));
    const choix = makeChoices(bon, ok);
    if (!choix) return null;
    const verbe = (st: Etape, premier: boolean) =>
      st.o === "×" ? (premier ? `on le multiplie par ${st.n}` : `on multiplie le résultat par ${st.n}`) : st.o === "+" ? (premier ? `on lui ajoute ${st.n}` : `on ajoute ${st.n}`) : premier ? `on lui soustrait ${st.n}` : `on soustrait ${st.n}`;
    const phrase = `On choisit un nombre ${L}, ${etapes.map((st, i) => verbe(st, i === 0)).join(", puis ")}.`;
    const intro = randomChoice(["Le lutin propose un programme de calcul.", "Un jeu de calcul mental donne la consigne suivante.", "Dans Scratch, Inès veut programmer ce calcul.", "Un robot calculateur suit ces étapes.", "Le professeur écrit un programme de calcul au tableau.", "Une application de devinettes fait ce calcul."]);
    const q = randomChoice(["Quelle expression correspond à ce programme ?", "Quelle formule le programme doit-il calculer ?", "Quelle expression donne le résultat ?", "Quel calcul le lutin doit-il effectuer ?"]);
    const x0 = 2;
    return {
      text: `${intro} ${phrase} ${q}`,
      ...reponseQcm(bon, choix),
      explanation: expl(
        "un programme de calcul s’écrit avec une expression qui respecte l’ORDRE des étapes.",
        "on écrit les étapes une par une ; quand on multiplie un résultat qui est une somme, il faut des parenthèses.",
        [`les étapes donnent ${bon}`, `vérification avec ${L} = ${x0} : le programme donne ${nb(valeur(etapes, x0))} et ${bon} aussi`],
        `l’expression est ${bon}.`
      ),
    };
  });
}

/** ★4 — un objectif programmé, on exécute. */
function genObjectifValeur() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const v = c.v;
    const x = randomInt(c.min, c.max);
    const p = pas(c);
    const s = seuilPres(x, p, c);
    const b = pas(c);
    const cas = randomChoice([
      { obj: `si ${c.quoi} dépasse ${s}, lui ajouter ${b}`, corps: [{ k: "si", c: { v, op: ">", s }, alors: [{ k: "add", v, n: b }] }] as Ins[] },
      { obj: `si ${c.quoi} vaut au moins ${s}, lui retirer ${b}`, corps: [{ k: "si", c: { v, op: "≥", s }, alors: [{ k: "add", v, n: -b }] }] as Ins[] },
      { obj: `si ${c.quoi} est strictement inférieur à ${s}, le remettre à ${s}`, corps: [{ k: "si", c: { v, op: "<", s }, alors: [{ k: "set", v, n: s }] }] as Ins[] },
      { obj: `ajouter ${b}, puis, si ${c.quoi} dépasse ${s}, le ramener à ${s}`, corps: [{ k: "add", v, n: b }, { k: "si", c: { v, op: ">", s }, alors: [{ k: "set", v, n: s }] }] as Ins[] },
      { obj: `retirer ${b}, puis, si ${c.quoi} ne dépasse pas ${s}, dire “${c.lo}”`, corps: [{ k: "add", v, n: -b }, { k: "si", c: { v, op: "≤", s }, alors: [{ k: "dire", t: c.lo }] }] as Ins[] },
    ]);
    const prog: Ins[] = [{ k: "set", v, n: x }, ...cas.corps];
    const st = executer(prog);
    if (!plausible(st)) return null;
    const q = randomChoice([`Quelle est la valeur ${de(v)} à la fin ?`, `Combien vaut ${v} après le programme ?`, `Que contient ${v} une fois le programme terminé ?`]);
    return {
      text: `${c.intro} Objectif : ${cas.obj}. Le programme écrit est ${progTxt(cas.corps)}. Au départ, ${v} vaut ${nb(x)}. ${q}`,
      ...reponseNombre(st.env[v]),
      explanation: expl(
        "un programme traduit un objectif en blocs ; pour prévoir son résultat, on l’exécute.",
        "on part de la valeur de départ et on suit les blocs dans l’ordre.",
        st.trace,
        `${v} vaut ${nb(st.env[v])} à la fin.`
      ),
      canvas: canvasDe("Objectif programmé", prog),
    };
  });
}

/** ★4 — un objectif « si … sinon », quel message pour telle valeur ? */
function genObjectifMessage() {
  const c = randomChoice(CTX);
  const op = randomChoice(OPS);
  const p = pas(c);
  const s = randomInt(c.min + 1, c.max);
  const x = randomChoice([s, s, s - 1, s + 1, s - p, s + p, s + 2 * p]);
  const xx = Math.max(0, x);
  const m = messages(c, op, s);
  const ph = `${randomChoice(phrasesObjectif(op, c.f))} ${s}`;
  const prog: Ins[] = [{ k: "set", v: c.v, n: xx }, { k: "si", c: { v: c.v, op, s }, alors: [{ k: "dire", t: m.alors }], sinon: [{ k: "dire", t: m.sinon }] }];
  const st = executer(prog);
  const q = randomChoice(["que dit le lutin ?", "quel message s’affiche ?", "quel message le programme affiche-t-il ?"]);
  return {
    text: `${c.intro} Objectif : dire “${m.alors}” quand ${c.quoi} ${ph}, et “${m.sinon}” sinon. Le programme teste “${condTxt({ v: c.v, op, s })}”. Pour ${c.v} = ${nb(xx)}, ${q}`,
    ...reponseQcm(st.dits[0], shuffle([m.alors, m.sinon])),
    explanation: expl(
      "un bloc « si … sinon » choisit entre deux messages.",
      "on remplace la variable par sa valeur et on teste la condition.",
      st.trace,
      `le lutin dit “${st.dits[0]}”.`
    ),
    canvas: canvasDe("Objectif : deux messages", prog),
  };
}

/* ===========================================================================
   ALGO_MODIFIER
=========================================================================== */

/** ★3 — on change la condition : que dit le lutin maintenant ? */
function genModifierCondition() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const x = randomInt(c.min, c.max);
    const p = pas(c);
    const opA = randomChoice(OPS);
    const sA = seuilPres(x, p, c);
    // Le nouveau test garde le SENS de l'ancien : « si vitesse < 24 alors dire “Ralentissez” » n'aurait pas de sens.
    const famille: Cmp[] = opA === ">" || opA === "≥" ? [">", "≥"] : opA === "<" || opA === "≤" ? ["<", "≤"] : ["="];
    const opN = Math.random() < 0.5 ? opA : randomChoice(famille);
    const sN = seuilPres(x, p, c);
    if (opA === opN && sA === sN) return null;
    const m = messages(c, opA, sA);
    const avecSinon = Math.random() < 0.5;
    const si = (op: Cmp, s: number): Ins => ({ k: "si", c: { v: c.v, op, s }, alors: [{ k: "dire", t: m.alors }], ...(avecSinon ? { sinon: [{ k: "dire", t: m.sinon }] } : {}) });
    const avant = executer([{ k: "set", v: c.v, n: x }, si(opA, sA)]);
    const prog: Ins[] = [{ k: "set", v: c.v, n: x }, si(opN, sN)];
    const st = executer(prog);
    const dit = st.dits[0] ?? "aucun message";
    const ancien = condTxt({ v: c.v, op: opA, s: sA }), nouveau = condTxt({ v: c.v, op: opN, s: sN });
    let q: string, bonne: string, choix: string[];
    if (Math.random() < 0.3) {
      q = `Après la modification, le lutin dit-il “${m.alors}” ?`;
      bonne = dit === m.alors ? "oui" : "non";
      choix = shuffle(["oui", "non"]);
    } else {
      q = randomChoice(["Que dit le lutin maintenant ?", "Quel message s’affiche après la modification ?", "Qu’affiche le programme modifié ?"]);
      bonne = dit;
      choix = shuffle([m.alors, avecSinon ? m.sinon : "aucun message"]);
    }
    return {
      text: `${c.intro} Le programme contient « ${insTxt(si(opA, sA))} ». On remplace la condition “${ancien}” par “${nouveau}”. La variable ${c.v} vaut ${nb(x)}. ${q}`,
      ...reponseQcm(bonne, choix),
      explanation: expl(
        "après une modification, c’est la NOUVELLE condition qui compte.",
        "on teste la nouvelle condition avec la valeur de la variable.",
        [`avant : ${avant.trace.slice(1).join(" ; ")}`, `après : ${st.trace.slice(1).join(" ; ")}`],
        dit === "aucun message" ? "le lutin ne dit rien." : `le lutin dit “${dit}” : la réponse est « ${bonne} ».`
      ),
      canvas: canvasDe("Programme modifié", prog),
    };
  });
}

/** ★3 — on remplace un nombre dans un bloc : nouvelle valeur finale. */
function genModifierNombre() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const x = randomInt(c.min, c.max);
    const k = pas(c);
    const autre = pas(c) + 1;
    const forme = randomInt(0, 3);
    const cible: Ins = { k: "add", v: c.v, n: k };
    const ancien: Ins[] =
      forme === 0 ? [{ k: "set", v: c.v, n: x }, cible] : forme === 1 ? [{ k: "set", v: c.v, n: x }, cible, { k: "add", v: c.v, n: -autre }] : forme === 2 ? [{ k: "set", v: c.v, n: x }, { k: "add", v: c.v, n: autre }, cible] : [{ k: "set", v: c.v, n: x }, cible, { k: "calc", v: c.v, a: c.v, op: "×", b: 2 }];
    if (ancien.some((i) => i !== cible && i.k === "add" && Math.abs(i.n) === k)) return null;
    const changeDepart = Math.random() < 0.3;
    const k2 = k + randomChoice([2, 3, 5, -1]);
    const x2 = x + randomChoice([2, 5, -1, 10]);
    if (k2 <= 0 || x2 < 0) return null;
    const nouveau = ancien.map((i) => (changeDepart && i.k === "set" ? { ...i, n: x2 } : !changeDepart && i === cible ? { ...cible, n: k2 } : i));
    const st = executer(nouveau);
    if (!plausible(st) || !plausible(executer(ancien))) return null;
    const remplacement = changeDepart ? `« mettre ${c.v} à ${nb(x)} » par « mettre ${c.v} à ${nb(x2)} »` : `« ajouter ${nb(k)} à ${c.v} » par « ajouter ${nb(k2)} à ${c.v} »`;
    const q = randomChoice([`Quelle est maintenant la valeur finale ${de(c.v)} ?`, `Combien vaut ${c.v} à la fin du programme modifié ?`, `Que contient ${c.v} à la fin, après la modification ?`]);
    return {
      text: `${c.intro} Le programme était ${progTxt(ancien)}. On remplace ${remplacement}. ${q}`,
      ...reponseNombre(st.env[c.v]),
      explanation: expl(
        "modifier un nombre dans un bloc change tout ce qui vient après.",
        "on réexécute le programme MODIFIÉ depuis le début.",
        st.trace,
        `${c.v} vaut ${nb(st.env[c.v])} à la fin.`
      ),
      canvas: canvasDe("Programme modifié", nouveau),
    };
  });
}

/** ★3 — le nouvel objectif demande une nouvelle condition. */
function genModifierObjectif() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const opA = randomChoice(OPS);
    const sA = randomInt(c.min + 1, c.max);
    const opN = randomChoice(OPS);
    const sN = randomInt(c.min + 1, c.max);
    if (opA === opN && sA === sN) return null;
    // ⚠️ 08/10 : « vies < 5 » et « vies ≤ 4 » sont la MÊME condition pour un
    // nombre entier : l'ancienne condition serait une seconde bonne réponse.
    const pareilles = Array.from({ length: 400 }, (_, i) => i - 150).every((x) => cmp(x, opA, sA) === cmp(x, opN, sN));
    if (pareilles) return null;
    const m = messages(c, opN, sN).alors;
    const cond = (o: Cmp, s: number) => `${c.v} ${o} ${s}`;
    const bon = cond(opN, sN);
    const choix = makeChoices(bon, [cond(opA, sA), ...OPS.filter((o) => o !== opN).map((o) => cond(o, sN))]);
    if (!choix) return null;
    const ph = `${randomChoice(phrasesObjectif(opN, c.f))} ${sN}`;
    const q = randomChoice(["Quelle est la nouvelle condition ?", "Par quoi faut-il remplacer la condition ?", "Quelle condition faut-il écrire maintenant ?"]);
    return {
      text: `${c.intro} Le programme dit “${m}” quand “${cond(opA, sA)}”. On veut maintenant qu’il le dise seulement quand ${c.quoi} ${ph}. ${q}`,
      ...reponseQcm(bon, choix),
      explanation: expl(
        "modifier un programme pour un nouvel objectif, c’est souvent changer le symbole ou la valeur de la condition.",
        "on traduit le NOUVEL objectif en condition, sans se laisser influencer par l’ancienne.",
        [`« ${ph} » se traduit par “${bon}”`],
        `la nouvelle condition est “${bon}”.`
      ),
    };
  });
}

/** ★3 — on modifie une boucle. */
function genModifierBoucle() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const x = randomInt(c.min, Math.min(c.max, 20));
    const k = pas(c);
    const n = randomInt(3, 6);
    const apres = Math.random() < 0.3;
    const prog = (xx: number, nn: number, kk: number): Ins[] => [{ k: "set", v: c.v, n: xx }, { k: "rep", n: nn, corps: [{ k: "add", v: c.v, n: kk }] }, ...(apres ? [{ k: "direv", v: c.v } as Ins] : [])];
    const quoi = randomInt(0, 2);
    const n2 = n + randomChoice([-2, -1, 1, 2, 3]);
    const k2 = k + randomChoice([-1, 1, 2, 4]);
    const x2 = x + randomChoice([-2, 3, 5]);
    if (n2 < 1 || k2 < 1 || x2 < 0) return null;
    const nouveau = quoi === 0 ? prog(x, n2, k) : quoi === 1 ? prog(x, n, k2) : prog(x2, n, k);
    const remplacement =
      quoi === 0 ? `« répéter ${n} fois » par « répéter ${n2} fois »` : quoi === 1 ? `« ajouter ${k} à ${c.v} » par « ajouter ${k2} à ${c.v} »` : `« mettre ${c.v} à ${x} » par « mettre ${c.v} à ${x2} »`;
    const st = executer(nouveau);
    if (!plausible(st)) return null;
    const q = apres ? "Quel nombre le lutin dit-il maintenant ?" : randomChoice([`Quelle est la nouvelle valeur finale ${de(c.v)} ?`, `Combien vaut ${c.v} à la fin du programme modifié ?`, `Calcule la valeur finale de la variable ${c.v} après la modification.`]);
    return {
      text: `${c.intro} Le programme est ${progTxt(prog(x, n, k))}. On remplace ${remplacement}. ${q}`,
      ...reponseNombre(st.env[c.v]),
      explanation: expl(
        "dans une boucle, changer le nombre de tours ou le bloc répété change le résultat.",
        "on réexécute le programme modifié tour par tour.",
        st.trace,
        `${c.v} vaut ${nb(st.env[c.v])} à la fin.`
      ),
      canvas: canvasDe("Boucle modifiée", nouveau),
    };
  });
}

/** ★4 — corriger une condition qui ne respecte pas l'objectif. */
function genCorrigerCondition() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const op = randomChoice(OPS);
    const s = randomInt(c.min + 1, c.max);
    const bon = `${c.v} ${op} ${s}`;
    const faussesC: { op: Cmp; s: number }[] = [...OPS.filter((o) => o !== op).map((o) => ({ op: o, s })), { op, s: s + 1 }, { op, s: s - 1 }];
    const fausses = faussesC.map((f) => `${c.v} ${f.op} ${f.s}`);
    const iErreur = randomInt(0, fausses.length - 1);
    const erreur = fausses[iErreur];
    const choix = makeChoices(bon, fausses.filter((f) => f !== erreur).concat(erreur));
    if (!choix || !choix.includes(erreur)) return null;
    const m = messages(c, op, s).alors;
    const ph = `${randomChoice(phrasesObjectif(op, c.f))} ${s}`;
    const q = randomChoice([`Par quelle condition faut-il remplacer “${erreur}” ?`, "Quelle condition corrige le programme ?", "Quelle condition faut-il écrire à la place ?"]);
    return {
      text: `${c.intro} Objectif : dire “${m}” seulement quand ${c.quoi} ${ph}. Le programme teste “${erreur}”. ${q}`,
      ...reponseQcm(bon, choix),
      explanation: expl(
        "corriger un programme, c’est remplacer le bloc qui ne traduit pas exactement l’objectif.",
        "on traduit l’objectif, puis on vérifie avec la valeur limite.",
        [`« ${ph} » se traduit par “${bon}”`, `la condition “${erreur}” ne donne pas le même résultat pour toutes les valeurs`],
        `il faut écrire “${bon}”.`
      ),
      // ⛔ 08/10 : le canvas s'affiche AVEC l'énoncé ; il montrait la BONNE
      // condition, c'est-à-dire la réponse. Il montre le programme à corriger.
      canvas: canvasDe("Corriger la condition", [{ k: "si", c: { v: c.v, op: faussesC[iErreur].op, s: faussesC[iErreur].s }, alors: [{ k: "dire", t: m }] }]),
    };
  });
}

/** ★4 — quelle modification donne exactement le résultat voulu ? */
function genQuelleModification() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const v = c.v;
    const a = randomInt(c.min, Math.min(c.max, 15));
    const n = randomInt(3, 6);
    const k = pas(c) + 1;
    const fin = Math.random() < 0.4 ? pas(c) : 0;
    const prog = (aa: number, nn: number, kk: number, ff: number): Ins[] => [{ k: "set", v, n: aa }, { k: "rep", n: nn, corps: [{ k: "add", v, n: kk }] }, ...(ff ? [{ k: "add", v, n: ff } as Ins] : [])];
    const res = (p: Ins[]) => executer(p).env[v];
    const F = res(prog(a, n, k, fin));
    const options: { txt: string; r: number }[] = [];
    const n2 = n + randomChoice([1, 2, -1]);
    const k2 = k + randomChoice([1, 2, -1]);
    const a2 = a + randomChoice([2, 5, 10]);
    if (n2 < 1 || k2 < 1) return null;
    options.push({ txt: `remplacer « répéter ${n} fois » par « répéter ${n2} fois »`, r: res(prog(a, n2, k, fin)) });
    options.push({ txt: `remplacer « ajouter ${k} à ${v} » par « ajouter ${k2} à ${v} »`, r: res(prog(a, n, k2, fin)) });
    options.push({ txt: `remplacer « mettre ${v} à ${a} » par « mettre ${v} à ${a2} »`, r: res(prog(a2, n, k, fin)) });
    if (fin) options.push({ txt: `supprimer « ajouter ${fin} à ${v} »`, r: res(prog(a, n, k, 0)) });
    else options.push({ txt: `ajouter le bloc « ajouter ${k} à ${v} » après la boucle`, r: res(prog(a, n, k, k)) });
    const bonne = randomChoice(options);
    const T = bonne.r;
    if (T === F || options.filter((o) => o.r === T).length > 1) return null;
    const q = randomChoice([`Quelle modification permet d’obtenir ${v} = ${T} à la fin ?`, `Que faut-il changer pour ${/^[aeiouyéèêàâîôûœ]/i.test(v) ? "qu’" : "que "}${v} vaille ${T} à la fin ?`, `Quelle modification fait finir le programme avec ${v} égal à ${T} ?`]);
    const st = executer(prog(a, n, k, fin));
    return {
      text: `${c.intro} Le programme ${progTxt(prog(a, n, k, fin))} se termine avec ${v} = ${F}. ${q}`,
      ...reponseQcm(bonne.txt, shuffle(options.map((o) => o.txt))),
      explanation: expl(
        "pour choisir une modification, on exécute le programme modifié et on compare au résultat voulu.",
        "on teste chaque proposition, une à la fois.",
        [`programme actuel : ${st.trace.join(" ; ")}`, ...options.map((o) => `si l’on choisit « ${o.txt} », ${v} finit à ${o.r}`)],
        `il faut ${bonne.txt}.`
      ),
      canvas: canvasDe("Quelle modification ?", prog(a, n, k, fin)),
    };
  });
}

/* ===========================================================================
   ALGO_DEFI
=========================================================================== */

/** ★4 — « répéter jusqu’à ce que » : combien de tours, quelle valeur ? */
function genJusqua() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const v = c.v;
    const a = randomInt(c.min, c.max);
    const k = pas(c);
    const forme = randomInt(0, 2);
    let prog: Ins[];
    let cible: string;
    if (forme === 0) {
      const s = a + randomInt(2, 6) * k + randomInt(-1, 1);
      prog = [{ k: "set", v, n: a }, { k: "jusqua", c: { v, op: randomChoice([">", "≥"] as Cmp[]), s }, corps: [{ k: "add", v, n: k }] }];
      cible = Math.random() < 0.5 ? "tours" : v;
    } else if (forme === 1) {
      const s = a - randomInt(2, 6) * k + randomInt(-1, 1);
      if (s < 0) return null;
      prog = [{ k: "set", v, n: a }, { k: "jusqua", c: { v, op: randomChoice(["<", "≤"] as Cmp[]), s }, corps: [{ k: "add", v, n: -k }] }];
      cible = Math.random() < 0.5 ? "tours" : v;
    } else {
      const s = a + randomInt(2, 6) * k + randomInt(-1, 1);
      prog = [{ k: "set", v, n: a }, { k: "set", v: "tours", n: 0 }, { k: "jusqua", c: { v, op: randomChoice([">", "≥"] as Cmp[]), s }, corps: [{ k: "add", v, n: k }, { k: "add", v: "tours", n: 1 }] }];
      cible = Math.random() < 0.7 ? "tours" : v;
    }
    const st = executer(prog);
    if (!plausible(st) || st.tours < 1) return null;
    const rep = cible === "tours" ? st.tours : st.env[v];
    const q =
      cible === "tours"
        ? forme === 2
          ? randomChoice(["Que vaut la variable tours à la fin ?", "Combien vaut tours quand le programme s’arrête ?"])
          : randomChoice(["Combien de fois la boucle est-elle exécutée ?", "Combien de tours la boucle fait-elle avant de s’arrêter ?", "Combien de passages dans la boucle y a-t-il ?"])
        : randomChoice([`Que vaut ${v} quand la boucle s’arrête ?`, qValeur(v)]);
    return {
      text: `${c.intro} ${presenter(prog)} ${q}`,
      ...reponseNombre(rep),
      explanation: expl(
        "« répéter jusqu’à ce que » teste la condition AVANT chaque tour et s’arrête dès qu’elle est vraie.",
        "on fait le tableau des tours en notant la valeur de la variable, et on teste la condition à chaque fois.",
        st.trace,
        cible === "tours" ? `la boucle fait ${st.tours} tour${st.tours > 1 ? "s" : ""}.` : `${v} vaut ${nb(st.env[v])} quand la boucle s’arrête.`
      ),
    };
  });
}

/** ★4 — un robot qui se déplace. */
const ROBOTS = [
  "Une tortue de dessin trace son chemin sur l’écran.",
  "Un robot de livraison se déplace dans un entrepôt.",
  "Une tondeuse robot parcourt une pelouse.",
  "Le lutin Scratch se promène sur la scène.",
  "Un robot éducatif roule sur une grande feuille de papier.",
  "Un drone de cartographie survole un champ à altitude fixe.",
  "Un robot de piscine nettoie le fond du bassin.",
];
/** Pas de « lutin » quand c'est un robot qui roule. */
const presenterRobot = (p: Ins[]) =>
  randomChoice([
    (t: string) => `Son programme : ${t}.`,
    (t: string) => `Le programme donné est ${t}.`,
    (t: string) => `On lui donne le programme ${t}.`,
  ])(progTxt(p));
const POLYGONES: Record<number, string> = { 3: "un triangle équilatéral", 4: "un carré", 5: "un pentagone régulier", 6: "un hexagone régulier", 8: "un octogone régulier", 10: "un décagone régulier" };

function genRobot() {
  const intro = randomChoice(ROBOTS);
  const forme = randomInt(0, 3);
  if (forme === 0) {
    const n = randomChoice([3, 4, 5, 6, 8, 10]);
    const d = randomChoice([20, 30, 40, 50, 60, 80, 100]);
    const prog: Ins[] = [{ k: "rep", n, corps: [{ k: "avancer", n: d }, { k: "tourner", n: 360 / n }] }];
    const bonne = POLYGONES[n];
    const q = randomChoice(["Quelle figure le trajet dessine-t-il ?", "Quelle forme a le trajet ?", "Quelle figure obtient-on ?"]);
    return {
      text: `${intro} ${presenterRobot(prog)} ${q}`,
      ...reponseQcm(bonne, makeChoices(bonne, Object.values(POLYGONES).filter((x) => x !== bonne))!),
      explanation: expl(
        "en répétant n fois « avancer, puis tourner de 360 ÷ n degrés », on trace un polygone régulier à n côtés.",
        "on compte les répétitions : chacune trace un côté.",
        [`${n} répétitions, donc ${n} côtés de ${d} pas`, `${n} × ${360 / n}° = 360° : on revient au point de départ`],
        `le trajet dessine ${bonne}.`
      ),
      canvas: canvasDe("Trajet du robot", prog),
    };
  }
  const n = randomInt(2, 6);
  const d = randomChoice([10, 15, 20, 25, 30, 40, 50]);
  const prog: Ins[] =
    forme === 1
      ? [{ k: "rep", n, corps: [{ k: "avancer", n: d }, { k: "tourner", n: randomChoice([90, 60, 45]) }] }]
      : forme === 2
        ? [{ k: "avancer", n: randomChoice([10, 20, 30]) }, { k: "rep", n, corps: [{ k: "avancer", n: d }] }, { k: "tourner", n: 90 }, { k: "avancer", n: randomChoice([5, 15, 25]) }]
        : [{ k: "rep", n, corps: [{ k: "avancer", n: d }, { k: "tourner", n: randomChoice([15, 30, 45, 60, 90]) }] }];
  const st = executer(prog);
  const angle = forme === 3;
  const q = angle
    ? randomChoice(["Au total, de combien de degrés a-t-on tourné ?", "Quelle est la somme de toutes les rotations, en degrés ?", "De combien de degrés le robot a-t-il tourné en tout ?"])
    : randomChoice(["Quelle distance est parcourue en tout, en pas ?", "Combien de pas sont parcourus au total ?", "Quelle est la longueur totale du trajet, en pas ?"]);
  const rep = angle ? st.angle : st.dist;
  return {
    text: `${intro} ${presenterRobot(prog)} ${q}`,
    ...reponseNombre(rep),
    explanation: expl(
      "une boucle répète les mêmes déplacements ; les distances (et les angles) s’additionnent.",
      "on compte ce qui est fait à chaque tour, puis on multiplie par le nombre de tours.",
      st.trace,
      angle ? `on a tourné de ${rep}° en tout.` : `le trajet mesure ${rep} pas.`
    ),
    canvas: canvasDe("Trajet du robot", prog),
  };
}

/** ★5 — boucle puis test final. */
function genBoucleTest() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const v = c.v;
    const x = randomInt(c.min, Math.min(c.max, 20));
    const k = pas(c);
    const n = randomInt(3, 5);
    const forme = randomInt(0, 2);
    const avant: Ins[] =
      forme === 0
        ? [{ k: "set", v, n: x }, { k: "rep", n, corps: [{ k: "add", v, n: k }] }]
        : forme === 1
          ? [{ k: "set", v, n: x }, { k: "rep", n, corps: [{ k: "add", v, n: k }] }, { k: "add", v, n: -pas(c) }]
          : [{ k: "set", v, n: x }, { k: "rep", n, corps: [{ k: "add", v, n: k + 2 }, { k: "add", v, n: -k }] }];
    const y = executer(avant).env[v];
    const op = randomChoice(OPS);
    const s = seuilPres(y, k, c);
    const m = messages(c, op, s);
    const prog: Ins[] = [...avant, { k: "si", c: { v, op, s }, alors: [{ k: "dire", t: m.alors }], sinon: [{ k: "dire", t: m.sinon }] }];
    const st = executer(prog);
    if (!plausible(st)) return null;
    return {
      text: `${c.intro} ${presenter(prog)} ${randomChoice(Q_MSG)}`,
      ...reponseQcm(st.dits[0], shuffle([m.alors, m.sinon])),
      explanation: expl(
        "un défi combine variable, boucle et condition.",
        "on calcule d’abord la valeur de la variable après la boucle, puis on teste la condition.",
        st.trace,
        `le lutin dit “${st.dits[0]}”.`
      ),
      canvas: canvasDe("Boucle + condition", prog),
    };
  });
}

/** ★5 — l'erreur d'un programme : quelle est-elle ? */
function genDebugErreur() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const s = randomInt(c.min + 1, c.max);
    const [O, P] = randomChoice<[Cmp, Cmp]>([["≥", ">"], ["≤", "<"], [">", "≥"], ["<", "≤"], [">", "<"], ["≥", "≤"], ["<", ">"], ["≤", "≥"]]);
    const v = c.v;
    const bon =
      (O === "≥" && P === ">") || (O === "≤" && P === "<")
        ? `il oublie le cas où ${v} vaut exactement ${s}`
        : (O === ">" && P === "≥") || (O === "<" && P === "≤")
          ? `il accepte à tort le cas où ${v} vaut exactement ${s}`
          : `le test est à l’envers : il réagit aux valeurs ${O === ">" || O === "≥" ? "trop petites" : "trop grandes"}`;
    const faux = [
      `il oublie le cas où ${v} vaut exactement ${s}`,
      `il accepte à tort le cas où ${v} vaut exactement ${s}`,
      `le test est à l’envers : il réagit aux valeurs ${O === ">" || O === "≥" ? "trop petites" : "trop grandes"}`,
      "il n’y a aucune erreur",
      `il manque « mettre ${v} à 0 » au début`,
      "il faudrait un bloc « répéter » à la place du « si »",
    ];
    const choix = makeChoices(bon, faux);
    if (!choix) return null;
    const m = messages(c, O, s).alors;
    const ph = `${randomChoice(phrasesObjectif(O, c.f))} ${s}`;
    // Une seconde valeur, loin de la limite, qui montre le test à l'envers.
    const p = pas(c);
    const temoin = O === ">" || O === "≥" ? s + p : Math.max(0, s - p);
    const q = randomChoice(["Quelle est l’erreur ?", "Qu’est-ce qui ne va pas dans ce programme ?", "Pourquoi le programme est-il faux ?"]);
    return {
      text: `${c.intro} Objectif : dire “${m}” quand ${c.quoi} ${ph}. Le programme utilise « si ${v} ${P} ${s} alors [dire “${m}”] ». ${q}`,
      ...reponseQcm(bon, choix),
      explanation: expl(
        "corriger un programme demande de comparer l’objectif et le code.",
        "on traduit l’objectif en condition, puis on compare avec celle du programme, en particulier pour la valeur limite.",
        [
          `l’objectif se traduit par “${v} ${O} ${s}”`,
          `le programme teste “${v} ${P} ${s}”`,
          ...[s, temoin].map((x) => `pour ${v} = ${x} : objectif ${cmp(x, O, s) ? "vrai" : "faux"}, programme ${cmp(x, P, s) ? "vrai" : "faux"}`),
        ],
        `${bon}.`
      ),
      canvas: canvasDe("Trouver l’erreur", [{ k: "si", c: { v, op: P, s }, alors: [{ k: "dire", t: m }] }]),
    };
  });
}

/** ★5 — une boucle dans une boucle, une boucle à deux instructions, deux boucles à la suite. */
function genBoucleDouble(formes: number[]) {
  return () => tirer(() => {
    const c = randomChoice(CTX);
    const v = c.v;
    const x = randomInt(c.min, Math.min(c.max, 20));
    const k = pas(c), j = pas(c);
    const n = randomInt(2, 5), m = randomInt(2, 4);
    const forme = randomChoice(formes);
    const base: Ins[] =
      forme === 0
        ? [{ k: "set", v, n: x }, { k: "rep", n, corps: [{ k: "rep", n: m, corps: [{ k: "add", v, n: k }] }] }]
        : forme === 1
          ? [{ k: "set", v, n: x }, { k: "rep", n, corps: [{ k: "add", v, n: k }, { k: "rep", n: m, corps: [{ k: "add", v, n: 1 }] }] }]
          : forme === 2
            ? [{ k: "set", v, n: x }, { k: "rep", n, corps: [{ k: "add", v, n: k }] }, { k: "rep", n: m, corps: [{ k: "add", v, n: -j }] }]
            : [{ k: "set", v, n: x }, { k: "rep", n, corps: [{ k: "add", v, n: k + j }, { k: "add", v, n: -j }] }, { k: "rep", n: m, corps: [{ k: "add", v, n: j }] }];
    const { prog, q } = finirParValeur(base, v);
    const st = executer(prog);
    if (!plausible(st)) return null;
    return {
      text: `${c.intro} ${presenter(prog)} ${q}`,
      ...reponseNombre(st.env[v]),
      explanation: expl(
        forme === 0 || forme === 1
          ? "une boucle placée dans une autre boucle est exécutée en entier à CHAQUE tour de la grande boucle."
          : "une boucle exécute tous ses blocs à chaque tour ; deux boucles à la suite s’exécutent l’une après l’autre.",
        "on calcule ce que fait un tour, puis on multiplie par le nombre de tours.",
        st.trace,
        `${v} vaut ${nb(st.env[v])} à la fin.`
      ),
      canvas: canvasDe("Boucles", prog),
    };
  });
}

/** ★5 — combien de fois le message est-il dit dans la boucle ? */
function genCompterMessages() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const v = c.v;
    const x = randomInt(c.min, Math.min(c.max, 20));
    const k = pas(c);
    const n = randomInt(4, 7);
    const op = randomChoice(OPS.filter((o) => o !== "="));
    const s = x + randomInt(1, n - 1) * k + randomChoice([0, 0, -1, 1]);
    const msg = messages(c, op);
    const avecSinon = Math.random() < 0.4;
    const compte = avecSinon && Math.random() < 0.5 ? msg.sinon : msg.alors;
    const prog: Ins[] = [
      { k: "set", v, n: x },
      { k: "rep", n, corps: [{ k: "add", v, n: k }, { k: "si", c: { v, op, s }, alors: [{ k: "dire", t: msg.alors }], ...(avecSinon ? { sinon: [{ k: "dire", t: msg.sinon }] } : {}) }] },
    ];
    const st = executer(prog);
    if (!plausible(st)) return null;
    const r = st.dits.filter((d) => d === compte).length;
    const q = randomChoice([`Combien de fois le lutin dit-il “${compte}” ?`, `Combien de fois le message “${compte}” s’affiche-t-il ?`, `Au total, combien de “${compte}” le lutin prononce-t-il ?`]);
    return {
      text: `${c.intro} ${presenter(prog)} ${q}`,
      ...reponseNombre(r),
      explanation: expl(
        "la condition dans la boucle est testée à chaque tour, avec la valeur du moment.",
        "on fait le tableau des tours et on compte les messages.",
        st.trace,
        `le lutin dit “${compte}” ${r} fois.`
      ),
      canvas: canvasDe("Compter les messages", prog),
    };
  });
}

/** ★5 — quelle valeur de test révèle l'erreur ? */
function genValeurQuiRevele() {
  return tirer(() => {
    const c = randomChoice(CTX);
    const v = c.v;
    const s = randomInt(c.min + 3, c.max);
    const p = pas(c);
    const O = randomChoice(OPS.filter((o) => o !== "="));
    const bug = randomChoice<{ op: Cmp; s: number }>([
      { op: O === ">" ? "≥" : O === "≥" ? ">" : O === "<" ? "≤" : "<", s },
      { op: O, s: s + 1 },
      { op: O, s: s - 1 },
    ]);
    const pool = Array.from(new Set([s - 2 * p, s - p, s - 1, s, s + 1, s + p, s + 2 * p])).filter((x) => x >= 0);
    const differe = (x: number) => cmp(x, O, s) !== cmp(x, bug.op, bug.s);
    const bons = pool.filter(differe);
    const mauvais = pool.filter((x) => !differe(x));
    if (bons.length !== 1 || mauvais.length < 3) return null;
    const choix = makeChoices(nb(bons[0]), mauvais.map(nb));
    if (!choix) return null;
    const m = messages(c, O, s).alors;
    const ph = `${randomChoice(phrasesObjectif(O, c.f))} ${s}`;
    const prog = `si ${v} ${bug.op} ${bug.s}`;
    const q = randomChoice([`Pour quelle valeur ${de(v)} le programme se trompe-t-il ?`, "Quelle valeur de test révèle l’erreur ?", "Avec laquelle de ces valeurs le programme ne respecte-t-il pas l’objectif ?", "Quel essai montre que le programme est faux ?"]);
    return {
      text: `${c.intro} Objectif : dire “${m}” quand ${c.quoi} ${ph}. Le programme utilise « ${prog} alors [dire “${m}”] ». ${q}`,
      ...reponseQcm(nb(bons[0]), choix),
      explanation: expl(
        "un programme faux peut donner le bon résultat pour presque toutes les valeurs : l’erreur se cache souvent à la limite.",
        `pour chaque valeur, on compare l’objectif (“${v} ${O} ${s}”) et le programme (“${v} ${bug.op} ${bug.s}”).`,
        choix.map((t) => {
          const x = Number(t.replace("−", "-"));
          return `${t} : objectif ${cmp(x, O, s) ? "vrai" : "faux"}, programme ${cmp(x, bug.op, bug.s) ? "vrai" : "faux"}`;
        }),
        `seule la valeur ${nb(bons[0])} révèle l’erreur.`
      ),
      canvas: canvasDe("Tester le programme", [{ k: "si", c: { v, op: bug.op, s: bug.s }, alors: [{ k: "dire", t: m }] }]),
    };
  });
}

/* ===========================================================================
   LES GABARITS (ids, micros et étoiles d'origine conservés)
=========================================================================== */

const GABARITS: TutorBankItemV4[] = [
  // ---------- ALGO_CONDITION ----------
  gabarit("4e_algo_condition_tpl_1_comparaison_superieur", "algo_condition", 1, "Remplace la variable par sa valeur, puis compare.", ["condition", "comparaison", "canvas"], genConditionSimple),
  gabarit("4e_algo_condition_tpl_7_lire_symbole", "algo_condition", 1, "> et < sont stricts ; ≥ et ≤ incluent l’égalité.", ["condition", "symbole"], genConditionLire),
  gabarit("4e_algo_condition_tpl_2_comparaison_inferieur", "algo_condition", 2, "Exécute d’abord les blocs, puis compare : ≥ et ≤ incluent l’égalité.", ["condition", "comparaison", "canvas"], genConditionSymboles),
  gabarit("4e_algo_condition_tpl_3_egalite", "algo_condition", 2, "Une égalité est vraie seulement si les deux valeurs sont identiques.", ["condition", "egalite", "canvas"], genConditionEgalite),
  gabarit("4e_algo_condition_tpl_4_relatif", "algo_condition", 3, "Attention aux nombres négatifs : −2 est plus grand que −5.", ["condition", "relatif", "canvas"], genConditionRelatifs),
  gabarit("4e_algo_condition_tpl_6_quelle_valeur", "algo_condition", 3, "Teste chaque proposition, en particulier la valeur limite.", ["condition", "valeur", "canvas"], genConditionQuelleValeur),
  gabarit("4e_algo_condition_tpl_5_expression", "algo_condition", 4, "Calcule d’abord l’expression, puis teste la condition.", ["condition", "expression", "canvas"], genConditionExpression),
  gabarit("4e_algo_condition_tpl_5_expression_2", "algo_condition", 4, "« et » : les deux tests doivent être vrais ; « ou » : un seul suffit.", ["condition", "et_ou", "canvas"], genConditionEtOu),

  // ---------- ALGO_INSTRUCTION_CONDITIONNELLE ----------
  gabarit("4e_algo_instruction_conditionnelle_tpl_1_si_simple", "algo_instruction_conditionnelle", 2, "Le bloc intérieur s’exécute seulement si la condition est vraie.", ["conditionnelle", "si", "canvas"], genSiSimple),
  gabarit("4e_algo_instruction_conditionnelle_tpl_1_si_simple_2", "algo_instruction_conditionnelle", 2, "Le bloc intérieur s’exécute seulement si la condition est vraie.", ["conditionnelle", "si", "variable", "canvas"], genSiModifie),
  gabarit("4e_algo_instruction_conditionnelle_tpl_2_si_sinon", "algo_instruction_conditionnelle", 3, "Avec si/sinon, une seule des deux branches est exécutée.", ["conditionnelle", "si_sinon", "canvas"], genSiSinonMessage),
  gabarit("4e_algo_instruction_conditionnelle_tpl_2_si_sinon_2", "algo_instruction_conditionnelle", 3, "N’applique que la branche choisie par le test.", ["conditionnelle", "si_sinon", "variable", "canvas"], genSiSinonValeur),
  gabarit("4e_algo_instruction_conditionnelle_tpl_3_variable_modifiee", "algo_instruction_conditionnelle", 3, "Chaque test utilise la valeur actuelle de la variable.", ["conditionnelle", "variable", "canvas"], genDeuxSi),
  gabarit("4e_algo_instruction_conditionnelle_tpl_4_si_sinon_variable", "algo_instruction_conditionnelle", 4, "Recalcule la variable avant chaque test.", ["conditionnelle", "si_sinon", "variable", "canvas"], genSiPuisMessage),
  gabarit("4e_algo_instruction_conditionnelle_tpl_5_trois_cas", "algo_instruction_conditionnelle", 4, "On ne passe au second test que si le premier est faux.", ["conditionnelle", "imbrication", "canvas"], genTroisCas),
  gabarit("4e_algo_instruction_conditionnelle_tpl_6_si_dans_boucle", "algo_instruction_conditionnelle", 5, "Le test est refait à chaque tour de boucle.", ["conditionnelle", "boucle", "canvas"], genSiDansBoucle),
  gabarit("4e_algo_instruction_conditionnelle_tpl_7_valeur_depart", "algo_instruction_conditionnelle", 5, "Essaie chaque valeur de départ : calcule, puis teste.", ["conditionnelle", "valeur", "canvas"], genValeurDeDepart),

  // ---------- ALGO_VARIABLE ----------
  gabarit("4e_algo_variable_tpl_1_initialisation", "algo_variable", 2, "« mettre … à » remplace complètement l’ancienne valeur.", ["variable", "initialisation", "canvas"], genInitialisation),
  gabarit("4e_algo_variable_tpl_2_increment", "algo_variable", 2, "« ajouter … à » modifie la valeur actuelle.", ["variable", "increment", "canvas"], genAjouts),
  gabarit("4e_algo_variable_tpl_6_set_then_change", "algo_variable", 2, "Un bloc ne modifie que la variable qu’il nomme.", ["variable", "deux_variables", "canvas"], genDeuxVariables),
  gabarit("4e_algo_variable_tpl_3_plusieurs_modifications", "algo_variable", 3, "Suis les modifications dans l’ordre.", ["variable", "suite", "canvas"], genAjoutsRelatifs),
  gabarit("4e_algo_variable_tpl_4_variable_negative", "algo_variable", 3, "On calcule avec l’ancienne valeur, puis on la remplace.", ["variable", "calcul", "canvas"], genCalculs),
  gabarit("4e_algo_variable_tpl_5_boucle_variable", "algo_variable", 4, "La modification est répétée à chaque tour.", ["variable", "boucle", "canvas"], genBoucleVariable),
  gabarit("4e_algo_variable_tpl_7_variables_liees", "algo_variable", 4, "Note la valeur des deux variables après chaque bloc.", ["variable", "deux_variables", "canvas"], genVariablesLiees),

  // ---------- ALGO_PROGRAMME_OBJECTIF ----------
  gabarit("4e_algo_programme_objectif_tpl_6_choisir_bloc", "algo_programme_objectif", 2, "Traduis l’objectif mot à mot en bloc.", ["objectif", "bloc"], genChoisirBloc),
  gabarit("4e_algo_programme_objectif_tpl_7_but_simple", "algo_programme_objectif", 2, "Demande-toi ce que chaque bloc change.", ["objectif", "but", "canvas"], genBut(false)),
  gabarit("4e_algo_programme_objectif_tpl_1_choisir_condition", "algo_programme_objectif", 3, "« au moins » inclut la limite, « dépasse » l’exclut.", ["objectif", "condition"], genObjectifCondition),
  gabarit("4e_algo_programme_objectif_tpl_2_choisir_programme_calcul", "algo_programme_objectif", 3, "Respecte l’ordre des étapes ; une somme multipliée demande des parenthèses.", ["objectif", "programme_calcul"], genProgrammeCalcul),
  gabarit("4e_algo_programme_objectif_tpl_5_choisir_condition", "algo_programme_objectif", 3, "Essaie le programme avec une ou deux valeurs.", ["objectif", "but", "canvas"], genBut(true)),
  gabarit("4e_algo_programme_objectif_tpl_3_objectif_score", "algo_programme_objectif", 4, "Exécute le programme à partir de la valeur de départ.", ["objectif", "condition", "canvas"], genObjectifValeur),
  gabarit("4e_algo_programme_objectif_tpl_4_objectif_si_sinon", "algo_programme_objectif", 4, "Avec si/sinon, le programme choisit un message selon la condition.", ["objectif", "si_sinon", "canvas"], genObjectifMessage),

  // ---------- ALGO_MODIFIER ----------
  gabarit("4e_algo_modifier_tpl_1_modifier_seuil", "algo_modifier", 3, "Utilise la nouvelle condition, pas l’ancienne.", ["modifier", "seuil", "condition", "canvas"], genModifierCondition),
  gabarit("4e_algo_modifier_tpl_2_modifier_bonus", "algo_modifier", 3, "Réexécute le programme modifié depuis le début.", ["modifier", "variable", "canvas"], genModifierNombre),
  gabarit("4e_algo_modifier_tpl_5_seuil", "algo_modifier", 3, "Traduis le nouvel objectif en condition.", ["modifier", "condition"], genModifierObjectif),
  gabarit("4e_algo_modifier_tpl_6_increment", "algo_modifier", 3, "Refais le tableau des tours avec le programme modifié.", ["modifier", "boucle", "canvas"], genModifierBoucle),
  gabarit("4e_algo_modifier_tpl_3_corriger_condition", "algo_modifier", 4, "Traduis l’objectif, puis vérifie avec la valeur limite.", ["modifier", "condition", "debug", "canvas"], genCorrigerCondition),
  gabarit("4e_algo_modifier_tpl_4_changer_objectif", "algo_modifier", 4, "Essaie chaque modification et compare au résultat voulu.", ["modifier", "objectif", "canvas"], genQuelleModification),

  // ---------- ALGO_DEFI ----------
  gabarit("4e_algo_defi_tpl_7_repeter_jusqua", "algo_defi", 4, "La boucle s’arrête dès que la condition devient vraie.", ["defi", "boucle", "jusqua"], genJusqua),
  gabarit("4e_algo_defi_tpl_8_robot", "algo_defi", 4, "Compte ce qui se passe à chaque tour, puis multiplie.", ["defi", "deplacement", "canvas"], genRobot),
  gabarit("4e_algo_defi_tpl_1_condition_variable_boucle", "algo_defi", 5, "Calcule la valeur après la boucle, puis teste.", ["defi", "variable", "boucle", "condition", "canvas"], genBoucleTest),
  gabarit("4e_algo_defi_tpl_2_debug_condition", "algo_defi", 5, "Compare l’objectif avec la condition utilisée.", ["defi", "debug", "condition", "canvas"], genDebugErreur),
  gabarit("4e_algo_defi_tpl_3_score_final", "algo_defi", 5, "Une boucle dans une boucle s’exécute en entier à chaque tour.", ["defi", "variable", "boucle", "canvas"], genBoucleDouble([1, 3])),
  gabarit("4e_algo_defi_tpl_4_message", "algo_defi", 5, "Fais le tableau des tours et compte les messages.", ["defi", "condition", "boucle", "canvas"], genCompterMessages),
  gabarit("4e_algo_defi_tpl_5_debug", "algo_defi", 5, "L’erreur se cache souvent à la valeur limite.", ["defi", "debug", "canvas"], genValeurQuiRevele),
  gabarit("4e_algo_defi_tpl_6_double_boucle", "algo_defi", 5, "Calcule chaque boucle, puis additionne.", ["defi", "variable", "boucle", "canvas"], genBoucleDouble([0, 2])),
];

/* ===========================================================================
   LES ITEMS FIGÉS (définitions, pièges, explications rédigées) — inchangés.
=========================================================================== */

const FIGES: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "4e_algo_condition_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 1,
    theme: "neutral",
    text: "En algorithmique, une condition sert à...",
    format: "qcm",
    choices: [
      "tester si une affirmation est vraie ou fausse",
      "dessiner automatiquement un carré",
      "effacer toutes les variables",
      "remplacer tous les calculs",
    ],
    expected: ["tester si une affirmation est vraie ou fausse"],
    comparator: "mcq_exact",
    hint: "Une condition répond souvent par vrai ou faux.",
    explanation:
      "Définition : une condition est un test qui peut être vrai ou faux.\n\n" +
      "Méthode : on lit la comparaison puis on vérifie si elle est vraie.\n\n" +
      "Exécution : par exemple, score > 10 est vrai si score est supérieur à 10.\n\n" +
      "Conclusion : une condition sert à tester une affirmation.",
    tags: ["algo_programmation", "condition", "definition", "qcm"],
    canvas: scratchCanvas("Condition simple", [
      { type: "event" },
      {
        type: "if",
        condition: "score > 10",
        children: [{ type: "say", text: "Bravo !" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_condition_fixed_2_piege_strict",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 3,
    theme: "neutral",
    text: "La variable score vaut 10. La condition “score > 10” est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le symbole > signifie strictement supérieur.",
    explanation:
      "Définition : le symbole > signifie strictement supérieur.\n\n" +
      "Méthode : on vérifie si 10 est plus grand que 10.\n\n" +
      "Exécution : 10 > 10 est faux, car les deux valeurs sont égales.\n\n" +
      "Conclusion : la condition n’est pas vraie.",
    tags: ["algo_programmation", "condition", "strict", "piege", "qcm"],
    canvas: scratchCanvas("Piège du strictement supérieur", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 10 },
      {
        type: "if",
        condition: "score > 10",
        children: [{ type: "say", text: "Bravo" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_condition_fixed_3_piege_egalite",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 3,
    theme: "neutral",
    text: "La variable x vaut 7. La condition “x = 7” est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le signe = teste si les deux valeurs sont identiques.",
    explanation:
      "Définition : une condition d’égalité vérifie si deux valeurs sont identiques.\n\n" +
      "Méthode : on compare la valeur de x avec 7.\n\n" +
      "Exécution : x vaut 7, donc x = 7 est vrai.\n\n" +
      "Conclusion : la condition est vraie.",
    tags: ["algo_programmation", "condition", "egalite", "qcm"],
    canvas: scratchCanvas("Condition d’égalité", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 7 },
      {
        type: "if",
        condition: "x = 7",
        children: [{ type: "say", text: "Exact" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_condition_open_1_expliquer",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 4,
    theme: "neutral",
    text: "Explique ce qu’est une condition dans un programme.",
    format: "open",
    expected: ["vrai", "faux", "test", "si"],
    comparator: "contains_keyword",
    hint: "Utilise les mots vrai, faux et si.",
    explanation:
      "Définition : une condition est un test logique qui peut être vrai ou faux.\n\n" +
      "Méthode : le programme vérifie la condition avant d’exécuter certains blocs.\n\n" +
      "Exécution : dans “si score > 10”, le programme teste si score est supérieur à 10.\n\n" +
      "Conclusion : une condition permet au programme de prendre une décision.",
    tags: ["algo_programmation", "condition", "open", "vocabulaire"],
  },

  {
    kind: "fixed",
    id: "4e_algo_condition_fixed_3_piege_egalite_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 3,
    theme: "neutral",
    text: "La variable x vaut 12. La condition “x > 12” est-elle vraie ?",
    format: "qcm",
    choices: ["non", "oui"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "« Strictement plus grand » exclut la valeur elle-même.",
    explanation:
      "Définition : une condition compare deux valeurs et vaut vrai ou faux.\n\n" +
      "Méthode : on compare la valeur de x avec 12.\n\n" +
      "Exécution : x vaut exactement 12. Or « x > 12 » demande STRICTEMENT plus grand : 12 n’est pas plus grand que 12, donc la condition est fausse. Écrite « x ≥ 12 », elle aurait été vraie.\n\n" +
      "Conclusion : la condition est fausse.",
    tags: ["algo_programmation", "condition", "comparaison", "piege", "qcm"],
    canvas: scratchCanvas("Condition de comparaison", [
      { type: "event" },
      { type: "set_variable", variable: "x", value: 12 },
      {
        type: "if",
        condition: "x > 12",
        children: [{ type: "say", text: "Plus grand" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_condition_open_1_expliquer_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_condition",
    difficulty: 4,
    theme: "neutral",
    // ⛔ 08/10 : ex-réponse ouverte (mot-clé « 10 » seul) → QCM sur les mêmes pièges.
    text: "Quelle est la différence entre les conditions “score > 10” et “score ≥ 10” ?",
    format: "qcm",
    choices: [
      "pour score = 10, la première est fausse et la seconde vraie",
      "pour score = 10, la première est vraie et la seconde fausse",
      "aucune : elles donnent toujours le même résultat",
      "pour score = 11, elles donnent des résultats différents",
    ],
    expected: ["pour score = 10, la première est fausse et la seconde vraie"],
    comparator: "mcq_exact",
    hint: "Que se passe-t-il si score vaut exactement 10 ?",
    explanation:
      "Définition : une condition est un test logique qui peut être vrai ou faux.\n\n" +
      "Méthode : on regarde ce qui arrive à la valeur limite, celle qui sépare les deux cas.\n\n" +
      "Exécution : si score vaut 12, les deux conditions sont vraies. Si score vaut 9, les deux sont fausses. Tout se joue sur 10 : « score > 10 » est FAUSSE, car 10 n’est pas strictement plus grand que 10, alors que « score ≥ 10 » est VRAIE.\n\n" +
      "Conclusion : les deux conditions ne diffèrent que sur une seule valeur — mais c’est souvent celle-là qui décide.",
    tags: ["algo_programmation", "condition", "open", "vocabulaire"],
  },

  {
    kind: "fixed",
    id: "4e_algo_instruction_conditionnelle_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    text: "Un bloc “si ... alors” permet...",
    format: "qcm",
    choices: [
      "d’exécuter des instructions seulement si une condition est vraie",
      "d’exécuter des instructions seulement si une condition est fausse",
      "d’exécuter des instructions tant qu’une condition reste vraie",
      "de vérifier une condition à la fin de chaque instruction",
    ],
    expected: ["d’exécuter des instructions seulement si une condition est vraie"],
    comparator: "mcq_exact",
    hint: "Le mot important est “si”.",
    explanation:
      "Définition : une instruction conditionnelle dépend d’une condition.\n\n" +
      "Méthode : on teste la condition avant d’exécuter les blocs à l’intérieur.\n\n" +
      "Exécution : si la condition est vraie, les blocs sont exécutés ; sinon, ils sont ignorés.\n\n" +
      "Conclusion : un bloc “si” exécute des instructions seulement si la condition est vraie.",
    tags: ["algo_programmation", "conditionnelle", "si", "qcm"],
    canvas: scratchCanvas("Instruction conditionnelle", [
      { type: "event" },
      {
        type: "if",
        condition: "score > 10",
        children: [{ type: "say", text: "Bravo !" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_instruction_conditionnelle_fixed_1_definition_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un bloc “si ... alors ... sinon”, que se passe-t-il quand la condition est fausse ?",
    format: "qcm",
    choices: [
      "seules les instructions du “sinon” sont exécutées",
      "aucune instruction n’est exécutée",
      "les deux parties sont exécutées l’une après l’autre",
      "le programme s’arrête",
    ],
    expected: ["seules les instructions du “sinon” sont exécutées"],
    comparator: "mcq_exact",
    hint: "Le “sinon” est là précisément pour ce cas.",
    explanation:
      "Définition : une instruction conditionnelle choisit entre deux chemins.\n\n" +
      "Méthode : on teste la condition, puis on suit UN SEUL des deux chemins.\n\n" +
      "Exécution : condition vraie, le programme exécute la partie “alors” et saute le “sinon”. Condition fausse, il saute le “alors” et exécute le “sinon”. Jamais les deux.\n\n" +
      "Conclusion : le “sinon” sert exactement à ça — dire quoi faire quand la condition n’est pas remplie.",
    tags: ["algo_programmation", "conditionnelle", "si", "qcm"],
    canvas: scratchCanvas("Instruction conditionnelle", [
      { type: "event" },
      {
        type: "if",
        condition: "score > 10",
        children: [{ type: "say", text: "Bravo !" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_instruction_conditionnelle_fixed_2_piege_deux_branches",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    text:
      "Dans un bloc si/sinon, les deux branches sont-elles exécutées l’une après l’autre ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Le programme choisit une seule branche.",
    explanation:
      "Définition : un bloc si/sinon permet de choisir entre deux actions.\n\n" +
      "Méthode : si la condition est vraie, on exécute la première branche ; sinon, on exécute l’autre.\n\n" +
      "Exécution : les deux branches ne sont pas exécutées ensemble.\n\n" +
      "Conclusion : non, une seule branche est exécutée.",
    tags: ["algo_programmation", "conditionnelle", "si_sinon", "piege", "qcm"],
    canvas: scratchCanvas("Une seule branche", [
      { type: "event" },
      {
        type: "if_else",
        condition: "score > 10",
        children: [{ type: "say", text: "Réussi" }],
        elseChildren: [{ type: "say", text: "Essaie encore" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_instruction_conditionnelle_open_1_expliquer",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_instruction_conditionnelle",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre un bloc “si” et un bloc “si/sinon”.",
    format: "open",
    expected: ["condition", "si", "sinon", "branche"],
    comparator: "contains_keyword",
    hint: "Dans si/sinon, il y a une action prévue quand la condition est fausse.",
    explanation:
      "Définition : un bloc “si” exécute une action seulement si la condition est vraie. Un bloc “si/sinon” choisit entre deux actions.\n\n" +
      "Méthode : on regarde ce qui se passe quand la condition est vraie, puis quand elle est fausse.\n\n" +
      "Exécution : avec “si”, il peut ne rien se passer si la condition est fausse. Avec “si/sinon”, une autre branche est exécutée.\n\n" +
      "Conclusion : le bloc si/sinon permet une décision plus complète.",
    tags: ["algo_programmation", "conditionnelle", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "4e_algo_variable_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_variable",
    difficulty: 1,
    theme: "neutral",
    text: "En programmation, une variable sert à...",
    format: "qcm",
    choices: [
      "stocker une valeur qui peut changer",
      "dessiner uniquement un cercle",
      "supprimer un programme",
      "remplacer le drapeau vert",
    ],
    expected: ["stocker une valeur qui peut changer"],
    comparator: "mcq_exact",
    hint: "Une variable peut contenir un nombre, un score, une réponse...",
    explanation:
      "Définition : une variable est une mémoire qui stocke une valeur.\n\n" +
      "Méthode : on repère les blocs “mettre à” et “ajouter à”.\n\n" +
      "Exécution : une variable peut être initialisée puis modifiée.\n\n" +
      "Conclusion : une variable sert à stocker une valeur qui peut changer.",
    tags: ["algo_programmation", "variable", "definition", "qcm"],
    canvas: scratchCanvas("Variable score", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 0 },
      { type: "change_variable", variable: "score", value: 1 },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_variable_fixed_2_piege_remplacement",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_variable",
    difficulty: 4,
    theme: "neutral",
    text:
      "score vaut 5. On exécute “mettre score à 2”. Quelle est la nouvelle valeur de score ?",
    format: "qcm",
    choices: ["2", "5", "7", "10"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Le bloc “mettre à” remplace complètement l’ancienne valeur.",
    explanation:
      "Définition : le bloc “mettre variable à ...” remplace l’ancienne valeur.\n\n" +
      "Méthode : on oublie l’ancienne valeur et on lit la nouvelle.\n\n" +
      "Exécution : score devient 2.\n\n" +
      "Conclusion : la nouvelle valeur de score est 2.",
    tags: ["algo_programmation", "variable", "piege", "qcm"],
    canvas: scratchCanvas("Remplacement de valeur", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 5 },
      { type: "set_variable", variable: "score", value: 2 },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_variable_open_1_expliquer_difference",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_variable",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique la différence entre “mettre score à 5” et “ajouter 5 à score”.",
    format: "open",
    expected: ["remplace", "ancienne", "ajoute", "valeur"],
    comparator: "contains_keyword",
    hint: "Un bloc remplace la valeur, l’autre la modifie.",
    explanation:
      "Définition : “mettre à” fixe une nouvelle valeur, alors que “ajouter à” modifie la valeur actuelle.\n\n" +
      "Méthode : on regarde si l’ancienne valeur est conservée ou non.\n\n" +
      "Exécution : “mettre score à 5” donne directement 5. “ajouter 5 à score” augmente la valeur actuelle de 5.\n\n" +
      "Conclusion : les deux blocs ont des rôles différents.",
    tags: ["algo_programmation", "variable", "open", "vocabulaire"],
  },

  {
    kind: "fixed",
    id: "4e_algo_variable_fixed_3_initialisation",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_variable",
    difficulty: 2,
    theme: "neutral",
    text: "Que fait le bloc « mettre score à 0 » ?",
    format: "qcm",
    choices: [
      "il donne la valeur 0 à la variable score",
      "il ajoute 0 au score actuel",
      "il supprime la variable score",
      "il affiche 0 à l’écran",
    ],
    expected: ["il donne la valeur 0 à la variable score"],
    comparator: "mcq_exact",
    hint: "« mettre à » fixe la valeur de départ.",
    explanation:
      "Définition : « mettre à » initialise une variable avec une valeur.\n\n" +
      "Méthode : on remplace l’ancienne valeur par la nouvelle.\n\n" +
      "Exécution : score vaut désormais 0.\n\n" +
      "Conclusion : le bloc fixe la valeur de score à 0.",
    tags: ["algo_programmation", "variable", "qcm"],
    canvas: scratchCanvas("Initialisation", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 0 },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_programme_objectif_fixed_1_definition",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 2,
    theme: "neutral",
    text: "Écrire un programme pour répondre à un problème, c’est...",
    format: "qcm",
    choices: [
      "choisir les blocs qui permettent d’atteindre un objectif",
      "choisir les blocs qui utilisent le plus de variables possible",
      "écrire le plus grand nombre de blocs pour être complet",
      "recopier les blocs d’un programme qui ressemble au sien",
    ],
    expected: ["choisir les blocs qui permettent d’atteindre un objectif"],
    comparator: "mcq_exact",
    hint: "Un programme doit avoir un but clair.",
    explanation:
      "Définition : un programme répond à un objectif précis.\n\n" +
      "Méthode : on choisit les blocs utiles et on les place dans le bon ordre.\n\n" +
      "Exécution : si l’objectif est de tester un score, on utilise une condition.\n\n" +
      "Conclusion : programmer, c’est organiser les blocs pour atteindre un objectif.",
    tags: ["algo_programmation", "objectif", "programme", "qcm"],
    canvas: scratchCanvas("Programme avec objectif", [
      { type: "event" },
      { type: "ask", text: "Quel est ton score ?" },
      { type: "set_variable", variable: "score", value: "réponse" },
      {
        type: "if_else",
        condition: "score > 10",
        children: [{ type: "say", text: "Réussi" }],
        elseChildren: [{ type: "say", text: "À revoir" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_programme_objectif_fixed_2_piege_objectif",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 4,
    theme: "neutral",
    text:
      "On veut afficher “Gagné” seulement si réponse = 5. Le programme teste réponse > 5. Est-il correct ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "“Égal à 5” et “supérieur à 5” ne veulent pas dire la même chose.",
    explanation:
      "Définition : un programme doit traduire exactement l’objectif.\n\n" +
      "Méthode : on compare la condition utilisée avec l’objectif demandé.\n\n" +
      "Exécution : l’objectif demande réponse = 5, mais le programme teste réponse > 5.\n\n" +
      "Conclusion : le programme n’est pas correct.",
    tags: ["algo_programmation", "objectif", "erreur", "condition", "qcm"],
    canvas: scratchCanvas("Objectif mal traduit", [
      { type: "event" },
      { type: "ask", text: "Devine le nombre" },
      { type: "set_variable", variable: "réponse", value: "réponse" },
      {
        type: "if",
        condition: "réponse > 5",
        children: [{ type: "say", text: "Gagné" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_programme_objectif_open_1_methode",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment choisir les blocs pour répondre à un objectif donné.",
    format: "open",
    expected: ["objectif", "blocs", "ordre", "condition"],
    comparator: "contains_keyword",
    hint: "Commence par comprendre ce que le programme doit faire.",
    explanation:
      "Définition : programmer pour un objectif consiste à construire une suite de blocs adaptée au problème.\n\n" +
      "Méthode : on identifie les données, les calculs, les conditions et l’ordre des blocs.\n\n" +
      "Exécution : si l’objectif demande un choix, on utilise une condition ; si une valeur change, on utilise une variable.\n\n" +
      "Conclusion : les blocs doivent être choisis selon l’objectif.",
    tags: ["algo_programmation", "objectif", "open", "methode"],
  },

  {
    kind: "fixed",
    id: "4e_algo_programme_objectif_fixed_3_condition_au_moins",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 2,
    theme: "neutral",
    text: "Pour afficher « Gagné » si score est au moins 10, quelle condition choisir ?",
    format: "qcm",
    choices: ["score ≥ 10", "score > 10", "score < 10", "score = 0"],
    expected: ["score ≥ 10"],
    comparator: "mcq_exact",
    hint: "« au moins 10 » inclut 10.",
    explanation:
      "Définition : « au moins 10 » signifie supérieur ou égal à 10.\n\n" +
      "Méthode : on choisit le symbole ≥.\n\n" +
      "Exécution : score = 10 doit afficher « Gagné ».\n\n" +
      "Conclusion : la condition est score ≥ 10.",
    tags: ["algo_programmation", "programme_objectif", "qcm"],
  },

  {
    kind: "fixed",
    id: "4e_algo_programme_objectif_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_programme_objectif",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment choisir la condition d’un programme à partir d’un objectif.",
    format: "open",
    expected: ["objectif", "condition", "comparaison"],
    comparator: "contains_keyword",
    hint: "On traduit l’objectif en comparaison.",
    explanation:
      "Définition : un objectif décrit ce que doit faire le programme.\n\n" +
      "Méthode : on traduit l’objectif en une comparaison (>, ≥, <, =).\n\n" +
      "Exécution : on teste quelques valeurs pour vérifier.\n\n" +
      "Conclusion : on choisit la condition qui réalise exactement l’objectif.",
    tags: ["algo_programmation", "programme_objectif", "open"],
  },

  {
    kind: "fixed",
    id: "4e_algo_modifier_fixed_1_piege_ancien_parametre",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
    difficulty: 4,
    theme: "neutral",
    text:
      "Un programme utilisait “score > 10”. On le modifie en “score > 15”. Pour score = 12, faut-il encore afficher “Bravo” ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Il faut utiliser la nouvelle condition.",
    explanation:
      "Définition : après modification, c’est la nouvelle version du programme qui compte.\n\n" +
      "Méthode : on teste score > 15.\n\n" +
      "Exécution : 12 > 15 est faux.\n\n" +
      "Conclusion : il ne faut pas afficher “Bravo”.",
    tags: ["algo_programmation", "modifier", "condition", "piege", "qcm"],
    canvas: scratchCanvas("Ancien ou nouveau seuil ?", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 12 },
      {
        type: "if",
        condition: "score > 15",
        children: [{ type: "say", text: "Bravo" }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_modifier_open_1_methode",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment vérifier qu’un programme modifié respecte bien le nouvel objectif.",
    format: "open",
    expected: ["objectif", "tester", "valeur", "résultat"],
    comparator: "contains_keyword",
    hint: "Teste le programme avec une valeur simple.",
    explanation:
      "Définition : vérifier un programme modifié consiste à contrôler qu’il répond au nouvel objectif.\n\n" +
      "Méthode : on choisit une valeur test, on exécute les blocs dans l’ordre, puis on compare au résultat attendu.\n\n" +
      "Exécution : si l’objectif change, il faut utiliser les nouveaux paramètres ou les nouvelles conditions.\n\n" +
      "Conclusion : on valide la modification en testant le comportement obtenu.",
    tags: ["algo_programmation", "modifier", "open", "methode", "debug"],
  },

  {
    kind: "fixed",
    id: "4e_algo_modifier_fixed_2_corriger_egalite",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
    difficulty: 3,
    theme: "neutral",
    text: "Un programme doit réagir si score est « au moins 10 », mais il utilise « score > 10 ». Quelle correction faut-il faire ?",
    format: "qcm",
    choices: [
      "remplacer par « score ≥ 10 »",
      "remplacer par « score < 10 »",
      "supprimer la condition",
      "remplacer par « score = 10 »",
    ],
    expected: ["remplacer par « score ≥ 10 »"],
    comparator: "mcq_exact",
    hint: "« au moins 10 » inclut 10.",
    explanation:
      "Définition : « au moins 10 » signifie supérieur ou égal à 10.\n\n" +
      "Méthode : on inclut le cas d’égalité.\n\n" +
      "Exécution : « score > 10 » exclut 10, ce qui est faux.\n\n" +
      "Conclusion : on corrige en « score ≥ 10 ».",
    tags: ["algo_programmation", "modifier", "correction", "qcm"],
  },

  {
    kind: "fixed",
    id: "4e_algo_modifier_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_modifier",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la méthode pour modifier un programme afin de changer son seuil de réussite.",
    format: "open",
    expected: ["condition", "seuil", "remplacer"],
    comparator: "contains_keyword",
    hint: "On repère le paramètre à changer.",
    explanation:
      "Définition : modifier un programme, c’est ajuster un paramètre sans tout réécrire.\n\n" +
      "Méthode : on repère la condition contenant le seuil et on remplace la valeur.\n\n" +
      "Exécution : on vérifie ensuite avec quelques scores.\n\n" +
      "Conclusion : on remplace le seuil dans la condition.",
    tags: ["algo_programmation", "modifier", "open"],
  },

  {
    kind: "fixed",
    id: "4e_algo_defi_open_1_synthese",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    text:
      "Explique une méthode pour analyser un programme qui contient une variable, une boucle et une condition.",
    format: "open",
    expected: ["variable", "boucle", "condition", "ordre"],
    comparator: "contains_keyword",
    hint: "Suis les blocs dans l’ordre : valeur de départ, répétitions, puis test.",
    explanation:
      "Définition : analyser un programme consiste à prévoir son comportement.\n\n" +
      "Méthode : on suit les blocs dans l’ordre : initialisation de la variable, effet de la boucle, puis condition finale.\n\n" +
      "Exécution : on met à jour la variable à chaque étape, puis on teste vrai ou faux.\n\n" +
      "Conclusion : cette méthode évite les erreurs de logique.",
    tags: ["algo_programmation", "defi", "open", "synthese"],
  },

  {
    kind: "fixed",
    id: "4e_algo_defi_fixed_1_trace",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    text: "score vaut 0. On répète 3 fois « ajouter 4 à score ». Quelle est la valeur finale de score ?",
    format: "qcm",
    choices: ["12", "7", "4", "3"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "4 ajouté 3 fois.",
    explanation:
      "Définition : une boucle répète une instruction plusieurs fois.\n\n" +
      "Méthode : on ajoute 4 à chaque tour, 3 fois.\n\n" +
      "Exécution : 0 + 4 + 4 + 4 = 12.\n\n" +
      "Conclusion : score vaut 12.",
    tags: ["algo_programmation", "defi", "boucle", "qcm"],
    canvas: scratchCanvas("Boucle simple", [
      { type: "event" },
      { type: "set_variable", variable: "score", value: 0 },
      {
        type: "repeat",
        times: 3,
        children: [{ type: "change_variable", variable: "score", value: 4 }],
      },
    ]),
  },

  {
    kind: "fixed",
    id: "4e_algo_defi_fixed_2_role_variable",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un programme, à quoi sert une variable comme « score » ?",
    format: "qcm",
    choices: [
      "à mémoriser une valeur qui peut changer",
      "à dessiner une figure",
      "à effacer l’écran",
      "à arrêter le programme",
    ],
    expected: ["à mémoriser une valeur qui peut changer"],
    comparator: "mcq_exact",
    hint: "Une variable garde une valeur en mémoire.",
    explanation:
      "Définition : une variable mémorise une valeur qui peut évoluer.\n\n" +
      "Méthode : on l’initialise puis on la modifie.\n\n" +
      "Exécution : score change au fil du programme.\n\n" +
      "Conclusion : une variable sert à mémoriser une valeur qui peut changer.",
    tags: ["algo_programmation", "defi", "variable", "qcm"],
  },

  {
    kind: "fixed",
    id: "4e_algo_defi_open_2",
    niveau: "4e",
    matiere: "maths",
    notionId: "algo_programmation",
    microId: "algo_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi il est important de tester un programme avec plusieurs valeurs.",
    format: "open",
    expected: ["tester", "valeurs", "erreur"],
    comparator: "contains_keyword",
    hint: "Une seule valeur ne montre pas toutes les erreurs.",
    explanation:
      "Définition : tester, c’est exécuter le programme sur des cas variés.\n\n" +
      "Méthode : on essaie plusieurs valeurs, y compris les cas limites (égalité).\n\n" +
      "Exécution : certaines erreurs n’apparaissent qu’à la limite.\n\n" +
      "Conclusion : tester plusieurs valeurs permet de repérer les erreurs cachées.",
    tags: ["algo_programmation", "defi", "open"],
  },
];

export const algorithmiqueBank: TutorBankItemV4[] = [...FIGES, ...GABARITS];
