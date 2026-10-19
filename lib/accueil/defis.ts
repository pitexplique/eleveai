// LE DÉFI DU JOUR DE L'ACCUEIL, FABRIQUÉ PAR DES GÉNÉRATEURS (19/10/2026).
//
// Frédéric : « assure-toi que chaque jour la page d'accueil change les articles
// et infos comme un journal quotidien ». Une banque de 12 défis écrits à la main
// revenait tous les 12 jours ; ici chaque jour a SON défi, et « Un autre défi »
// en donne autant qu'on veut. C'est la règle du coach : des générateurs, pas des
// pools.
//
// ⛔ Les règles du site tiennent PAR CONSTRUCTION :
//   - jamais deux choix de même valeur (vérifié à la fabrication, sinon on tire
//     d'autres nombres) ;
//   - « ÷ » pour diviser, jamais 5/2 hors fractions ;
//   - ×10 expliqué par la valeur des chiffres, la division par les billes ;
//   - les distracteurs sont des ERREURS TYPIQUES, pas des nombres au hasard.
// ⚠️ Déterministe : la même graine donne le même défi au serveur et au client
// (pas d'erreur d'hydratation).

export type DefiGenere = {
  classe: string;
  /** Ce que le coach attend dans `?classe=`. */
  coach: string;
  question: string;
  /** Les choix DANS L'ORDRE D'AFFICHAGE. */
  choix: string[];
  bonne: number;
  explication: string;
};

/** mulberry32 : petit générateur pseudo-aléatoire reproductible. */
function hasard(graine: number) {
  let a = graine >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Tirage = () => number;
const entre = (r: Tirage, a: number, b: number) => a + Math.floor(r() * (b - a + 1));
const parmi = <T,>(r: Tirage, l: readonly T[]) => l[Math.floor(r() * l.length)];

/** Un nombre à la française : virgule décimale, espace des milliers. */
const fr = (n: number) =>
  n.toLocaleString("fr-FR", { maximumFractionDigits: 3 }).replace(/ | /g, " ");
const rel = (n: number) => (n < 0 ? `−${fr(-n)}` : fr(n));

/** Ce que rend un générateur : la bonne réponse en premier. */
type Brut = Omit<DefiGenere, "choix" | "bonne"> & { juste: string; faux: string[] };

const GENERATEURS: ((r: Tirage) => Brut)[] = [
  // CE1 — l'addition qui passe la dizaine
  (r) => {
    const a = entre(r, 6, 9), b = entre(r, 5, 9), c = 10 - a;
    return {
      classe: "CE1", coach: "ce1",
      question: `Combien font ${a} + ${b} ?`,
      juste: fr(a + b), faux: [fr(a + b - 1), fr(a + b + 1)],
      explication: `${a} + ${c} = 10, puis il reste ${b - c} à ajouter : 10 + ${b - c} = ${a + b}.`,
    };
  },
  // CE2 — les tables
  (r) => {
    const a = entre(r, 3, 9), b = entre(r, 4, 9);
    return {
      classe: "CE2", coach: "ce2",
      question: `Combien font ${a} × ${b} ?`,
      juste: fr(a * b), faux: [fr(a * (b + 1)), fr(a + b)],
      explication: `${a} × ${b}, c'est ${b} rangées de ${a} billes : ${a * b} billes en tout.`,
    };
  },
  // CE2/CM1 — la division par les billes
  (r) => {
    const a = entre(r, 3, 9), b = entre(r, 3, 9), n = a * b;
    return {
      classe: "CM1", coach: "cm1",
      question: `Combien font ${n} ÷ ${a} ?`,
      juste: fr(b), faux: [fr(b + 1), fr(n - a)],
      explication: `${n} billes rangées en ${a} colonnes : ${b} billes dans chaque colonne, car ${b} × ${a} = ${n}.`,
    };
  },
  // CM2 — les durées
  (r) => {
    const h = entre(r, 1, 3), m = parmi(r, [10, 15, 20, 30, 40, 45]);
    return {
      classe: "CM2", coach: "cm2",
      question: `Combien de minutes dans ${h} h ${m} min ?`,
      juste: fr(h * 60 + m), faux: [fr(h * 100 + m), fr(h * 60)],
      explication: `1 heure = 60 minutes, donc ${h} h = ${h * 60} min, plus ${m} min : ${h * 60 + m} minutes.`,
    };
  },
  // CM1/6e — une fraction d'une quantité, dite en mots
  (r) => {
    const f = parmi(r, [
      { mot: "la moitié", d: 2, n: 1 },
      { mot: "le tiers", d: 3, n: 1 },
      { mot: "le quart", d: 4, n: 1 },
      { mot: "les trois quarts", d: 4, n: 3 },
    ]);
    const q = f.d * entre(r, 3, 12), part = q / f.d;
    return {
      classe: "CM1", coach: "cm1",
      question: `Combien font ${f.mot} de ${q} ?`,
      juste: fr(part * f.n),
      faux: f.n === 1 ? [fr(q - f.d), fr(q * f.d)] : [fr(part), fr(q - 3)],
      explication:
        f.n === 1
          ? `On partage ${q} en ${f.d} parts égales : ${q} ÷ ${f.d} = ${part}.`
          : `Un quart de ${q}, c'est ${q} ÷ 4 = ${part} ; trois quarts, c'est 3 × ${part} = ${part * 3}.`,
    };
  },
  // 6e — ×10, ×100 par la valeur des chiffres
  (r) => {
    const u = entre(r, 1, 9), d = entre(r, 1, 9), x = u + d / 10;
    const k = parmi(r, [10, 100]);
    const res = Math.round(x * k);
    return {
      classe: "6e", coach: "6e",
      question: `Combien font ${fr(x)} × ${k} ?`,
      juste: fr(res), faux: [`${fr(x)}0`, fr(k === 10 ? res * 10 : res / 10)],
      explication:
        k === 10
          ? `Chaque chiffre prend une valeur dix fois plus grande : ${u} unités deviennent ${u} dizaines, ${d} dixièmes deviennent ${d} unités. Donc ${fr(res)}.`
          : `Chaque chiffre prend une valeur cent fois plus grande : ${u} unités deviennent ${u} centaines, ${d} dixièmes deviennent ${d} dizaines. Donc ${fr(res)}.`,
    };
  },
  // 6e — comparer des décimaux (le piège du nombre de chiffres)
  (r) => {
    const a = entre(r, 3, 9), b = entre(r, 1, a - 1), c = entre(r, 1, 9), e = entre(r, 1, 9);
    const grand = a / 10, moyen = b / 10 + c / 100, petit = e / 100;
    return {
      classe: "6e", coach: "6e",
      question: "Quel nombre est le plus grand ?",
      juste: fr(grand), faux: [fr(moyen), fr(petit)],
      explication: `On compare les dixièmes : ${a} dixièmes, contre ${b} et 0. C'est ${fr(grand)} qui gagne, même s'il a moins de chiffres.`,
    };
  },
  // 6e — convertir des longueurs
  (r) => {
    const m = entre(r, 1, 9) + parmi(r, [0, 0.5, 0.25]);
    return {
      classe: "6e", coach: "6e",
      question: `${fr(m)} m, ça fait combien de centimètres ?`,
      juste: `${fr(m * 100)} cm`, faux: [`${fr(m * 10)} cm`, `${fr(m * 1000)} cm`],
      explication: `1 m = 100 cm, donc ${fr(m)} m = ${fr(m)} × 100 = ${fr(m * 100)} cm.`,
    };
  },
  // 5e — les relatifs
  (r) => {
    const a = entre(r, 2, 12), b = entre(r, 2, 12);
    if (a === b) return GENERATEURS[9](r);
    const res = b - a;
    return {
      classe: "5e", coach: "5e",
      question: `Combien vaut (−${a}) + ${b} ?`,
      juste: rel(res), faux: [rel(-res), rel(a + b)],
      explication:
        res > 0
          ? `Tu descends de ${a}, puis tu remontes de ${b} : tu finis ${res} au-dessus de zéro.`
          : `Tu descends de ${a}, puis tu remontes de ${b} seulement : tu restes ${-res} sous zéro.`,
    };
  },
  // 5e — les priorités
  (r) => {
    const a = entre(r, 2, 9), b = entre(r, 2, 6), c = entre(r, 2, 6);
    return {
      classe: "5e", coach: "5e",
      question: `Combien vaut ${a} + ${b} × ${c} ?`,
      juste: fr(a + b * c), faux: [fr((a + b) * c), fr(a * b + c)],
      explication: `La multiplication passe d'abord : ${b} × ${c} = ${b * c}, puis ${a} + ${b * c} = ${a + b * c}.`,
    };
  },
  // 4e — Pythagore, les triplets entiers
  (r) => {
    const [a, b, c] = parmi(r, [
      [3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20],
    ] as const);
    return {
      classe: "4e", coach: "4e",
      question: `Un triangle rectangle a des côtés de l'angle droit de ${a} cm et ${b} cm. Combien mesure l'hypoténuse ?`,
      juste: `${c} cm`, faux: [`${a + b} cm`, `${a * a + b * b} cm`],
      explication: `${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}, et le nombre positif dont le carré vaut ${c * c} est ${c}.`,
    };
  },
  // 4e/2de — augmenter d'un pourcentage
  (r) => {
    const p = parmi(r, [10, 20, 25, 50]);
    const prix = (100 / p) * entre(r, 2, 12) * (p === 50 ? 2 : 1);
    const hausse = (prix * p) / 100;
    return {
      classe: "4e", coach: "4e",
      question: `Un prix de ${fr(prix)} € augmente de ${p} %. Quel est le nouveau prix ?`,
      juste: `${fr(prix + hausse)} €`, faux: [`${fr(prix + p)} €`, `${fr(prix - hausse)} €`],
      explication: `${p} % de ${fr(prix)} €, c'est ${fr(hausse)} € (${p === 10 ? "le dixième" : p === 20 ? "le cinquième" : p === 25 ? "le quart" : "la moitié"}). ${fr(prix)} + ${fr(hausse)} = ${fr(prix + hausse)} €.`,
    };
  },
  // 3e — une probabilité, dite en mots
  (r) => {
    const rouges = entre(r, 2, 7), bleues = entre(r, 2, 7);
    if (rouges === bleues) return GENERATEURS[12](r);
    const n = rouges + bleues;
    return {
      classe: "3e", coach: "3e",
      question: `Un sac contient ${rouges} boules rouges et ${bleues} boules bleues. On en tire une au hasard. Quelle est la probabilité qu'elle soit rouge ?`,
      juste: `${rouges} chances sur ${n}`,
      faux: [`${rouges} chances sur ${bleues}`, `1 chance sur ${n}`],
      explication: `Il y a ${n} boules en tout, dont ${rouges} rouges : ${rouges} issues favorables sur ${n} possibles.`,
    };
  },
  // 4e — les puissances de 2
  (r) => {
    const n = entre(r, 5, 10), v = 2 ** n;
    return {
      classe: "4e", coach: "4e",
      question: `Combien vaut 2 multiplié par lui-même ${n} fois ?`,
      juste: fr(v), faux: [fr(2 * n), fr(v / 2)],
      explication: `On double ${n} fois en partant de 1 : ${Array.from({ length: n }, (_, i) => fr(2 ** (i + 1))).join(", ")}.`,
    };
  },
];

/** L'ordre des types, mélangé une fois pour toutes : les niveaux alternent
 *  (pas trois défis de primaire d'affilée). */
const ORDRE = [1, 10, 5, 8, 3, 13, 6, 11, 0, 9, 4, 12, 7, 2];

/** Le défi d'une graine. La bonne réponse n'est jamais à une place fixe. */
export function genererDefi(graine: number): DefiGenere {
  for (let essai = 0; essai < 20; essai++) {
    const r = hasard(graine * 7919 + essai);
    // Le TYPE tourne : les 14 sortes de défi passent toutes avant qu'une revienne
    // (la simulation du 19/10 donnait deux conversions de mètres en trois jours).
    // Seuls les nombres sont tirés au hasard.
    const brut = GENERATEURS[ORDRE[((graine % ORDRE.length) + ORDRE.length) % ORDRE.length]](r);
    const tous = [brut.juste, ...brut.faux];
    // ⛔ Jamais deux choix de même texte (ni de même valeur affichée).
    if (new Set(tous).size !== tous.length) continue;
    const ordre = [0, 1, 2].sort(() => r() - 0.5);
    return {
      classe: brut.classe,
      coach: brut.coach,
      question: brut.question,
      explication: brut.explication,
      choix: ordre.map((i) => tous[i]),
      bonne: ordre.indexOf(0),
    };
  }
  // Inatteignable en pratique ; on ne rend jamais un défi faux.
  return {
    classe: "5e", coach: "5e",
    question: "Combien vaut 2 + 3 × 4 ?",
    choix: ["20", "14", "24"], bonne: 1,
    explication: "La multiplication passe d'abord : 3 × 4 = 12, puis 2 + 12 = 14.",
  };
}
