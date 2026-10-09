// Multiples, diviseurs et divisibilité (5e).
// Écrit le 04/08/2026 : les critères de divisibilité étaient au programme et
// n'existaient nulle part. Ils servent juste après, pour simplifier une
// fraction sans tâtonner.
//
// LaTeX : réservé aux fractions, où l'empilement se lit mieux qu'un « 24/36 ».
// Les entiers et les critères restent en texte brut. ⚠️ Les `expected` sont
// TOUJOURS en brut : c'est ce que l'élève tape.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function frac(n: number, d: number) {
  return `$\\dfrac{${n}}{${d}}$`;
}

function sommeChiffres(n: number) {
  return String(n)
    .split("")
    .reduce((s, c) => s + Number(c), 0);
}

function diviseurs(n: number) {
  const out: number[] = [];
  for (let i = 1; i <= n; i += 1) if (n % i === 0) out.push(i);
  return out;
}

function expl(calcul: string) {
  return (
    "Définition : un nombre est divisible par un autre quand la division tombe juste, sans reste.\n\n" +
    "Méthode : on utilise un critère de divisibilité, ou on pose la division pour vérifier le reste.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : le nombre trouvé répond à la question."
  );
}

// ⭐ 09/10/2026 — DES SITUATIONS, PAS UNE PHRASE. Mesuré le 09/10 : 5 à 9
// squelettes par micro, 14 à 17 répétitions sur 20. Chaque gabarit compose une
// situation (partager, ranger, compter) × une tournure × un prénom ; il a son
// correcteur dans correcteurs/divisibilite.ts. Division : « ÷ », jamais la barre
// (la divisibilité n'est pas une notion de fractions ; les fractions du défi
// restent empilées en LaTeX, objet de la simplification).
import { PRENOMS, pick, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

const il = (p: Prenom) => (p.f ? "elle" : "il");
const Il = (p: Prenom) => (p.f ? "Elle" : "Il");
function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pgcdDe(a: number, b: number): number {
  return b === 0 ? a : pgcdDe(b, a % b);
}
/** « 4 738 » : l'espace des milliers, comme les items du fichier. */
const mil = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/** Partager `n` objets en groupes de `d`, sans reste : une situation de la vie d'un enfant de 12 ans. */
type Partage = { max: number; phrase: (p: Prenom, n: number, d: number) => string };
const PARTAGES: Partage[] = [
  { max: 200, phrase: (p, n, d) => `${p.nom} a ${n} perles. ${Il(p)} veut faire des colliers de ${d} perles.` },
  { max: 200, phrase: (p, n, d) => `${p.nom} a ${n} photos de vacances. ${Il(p)} veut les coller dans un album, ${d} par page.` },
  { max: 150, phrase: (p, n, d) => `${p.nom} a ramassé ${n} œufs à la ferme. ${Il(p)} veut les ranger dans des boîtes de ${d}.` },
  { max: 200, phrase: (p, n, d) => `Pour le spectacle de l’école, ${p.nom} installe ${n} chaises. ${Il(p)} veut des rangées de ${d} chaises.` },
  { max: 120, phrase: (p, n, d) => `${p.nom} organise un tournoi pour ${n} joueurs. ${Il(p)} veut former des équipes de ${d}.` },
  { max: 150, phrase: (p, n, d) => `${p.nom} a ${n} plants de tomates. ${Il(p)} veut les planter en rangées de ${d}.` },
  { max: 120, phrase: (p, n, d) => `${p.nom} a un jeu de ${n} cartes. ${Il(p)} veut les distribuer par paquets de ${d}.` },
  { max: 200, phrase: (p, n, d) => `${p.nom} a fait ${n} biscuits. ${Il(p)} veut les mettre en sachets de ${d}.` },
  { max: 200, phrase: (p, n, d) => `${p.nom} trie ${n} vis dans l’atelier. ${Il(p)} veut les mettre en sachets de ${d}.` },
  { max: 200, phrase: (p, n, d) => `${p.nom} range ${n} livres à la bibliothèque. ${Il(p)} veut mettre ${d} livres par étagère.` },
  { max: 200, phrase: (p, n, d) => `${p.nom} a ${n} autocollants. ${Il(p)} veut les coller sur des pages de ${d}.` },
  { max: 120, phrase: (p, n, d) => `La chorale ${de(p.nom)} compte ${n} chanteurs. Le chef veut des rangs de ${d} chanteurs.` },
  { max: 200, phrase: (p, n, d) => `${p.nom} a ${n} graines de radis. ${Il(p)} veut en semer ${d} par pot.` },
  { max: 200, phrase: (p, n, d) => `Au magasin, ${p.nom} doit ranger ${n} bouteilles d’eau en packs de ${d}.` },
  { max: 100, phrase: (p, n, d) => `${p.nom} prépare une sortie à vélo pour ${n} cyclistes. ${Il(p)} veut faire des groupes de ${d}.` },
  { max: 200, phrase: (p, n, d) => `${p.nom} a cueilli ${n} letchis. ${Il(p)} veut faire des barquettes de ${d} letchis.` },
  { max: 200, phrase: (p, n, d) => `${p.nom} range ${n} crayons de couleur dans des pots de ${d}.` },
  { max: 60, phrase: (p, n, d) => `${p.nom} a ${n} poissons rouges à répartir dans des aquariums, ${d} par aquarium.` },
];

export const divisibiliteBank: TutorBankItemV4[] = [
  /* ===== DIV_MULTIPLE_DIVISEUR ===== */
  {
    kind: "fixed",
    id: "div_multiple_diviseur_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 1,
    theme: "neutral",
    text: "On sait que 7 × 6 = 42. Complète : 42 est un ... de 7.",
    format: "qcm",
    choices: ["multiple", "diviseur", "quotient", "reste"],
    expected: ["multiple"],
    comparator: "mcq_exact",
    hint: "Le grand nombre est le multiple, les petits sont les diviseurs.",
    explanation: expl(
      "42 s’obtient en multipliant 7 par 6 : c’est donc un multiple de 7. Dans l’autre sens, 7 est un diviseur de 42. Un même calcul se lit dans les deux sens.",
    ),
    tags: ["divisibilite", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_multiple_diviseur_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre est à la fois un diviseur de TOUS les nombres entiers ? Réponds par un nombre.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Par quoi peut-on toujours diviser sans reste ?",
    explanation: expl(
      "Tout nombre entier se divise par 1 sans reste, puisque n ÷ 1 = n. Le nombre 1 est donc un diviseur de tous les entiers — et le seul dans ce cas.",
    ),
    tags: ["divisibilite", "remarquable"],
  },
  {
    kind: "fixed",
    id: "div_multiple_diviseur_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 4,
    theme: "neutral",
    text: "Zéro est-il un multiple de 7 ?",
    format: "qcm",
    choices: ["oui", "non", "seulement si on compte 0 comme entier", "on ne peut pas dire"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Existe-t-il un nombre qui, multiplié par 7, donne 0 ?",
    explanation: expl(
      "7 × 0 = 0. Zéro s’obtient donc en multipliant 7 par un entier : c’est un multiple de 7. C’est même un multiple de tous les nombres, ce qui surprend souvent.",
    ),
    tags: ["divisibilite", "piege", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_multiple_diviseur_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "15 est-il un multiple de 5 ou un diviseur de 5 ?",
    format: "qcm",
    choices: ["un multiple", "un diviseur", "les deux"],
    expected: ["un multiple"],
    comparator: "mcq_exact",
    hint: "15 est-il dans la table de 5 ?",
    explanation: expl(
      "5 × 3 = 15 : 15 est dans la table de 5. C’est donc un multiple de 5. Les diviseurs de 5 sont seulement 1 et 5. Un multiple est plus grand, un diviseur est plus petit.",
    ),
    tags: ["divisibilite", "qcm", "vocabulaire"],
  },
  {
    kind: "template",
    id: "div_multiple_diviseur_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    hint: "Pose la division : si le reste est zéro, c’est un multiple.",
    tags: ["divisibilite", "template"],
    // 09/10/2026 : une situation de partage (18) × une tournure (4), ou le calcul nu (4 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const ctx = pick(PARTAGES);
      const d = randomChoice([3, 4, 5, 6, 7, 8, 9]);
      const k = randInt(4, Math.max(5, Math.min(16, Math.floor(ctx.max / d) - 1)));
      const multiple = Math.random() < 0.55;
      const n = multiple ? d * k : d * k + randInt(1, d - 1);
      const situation = Math.random() < 0.7;
      const text = situation
        ? `${ctx.phrase(p, n, d)} ${randomChoice([
            "Est-ce possible sans qu’il en reste ?",
            "Cela tombe-t-il juste, sans reste ?",
            `Autrement dit : ${n} est-il un multiple de ${d} ?`,
            "Est-ce que ça tombe juste ?",
          ])}`
        : randomChoice([
            `Le nombre ${n} est-il un multiple de ${d} ?`,
            `${n} est-il dans la table de ${d} ?`,
            `${p.nom} pose la division de ${n} par ${d}. Le reste est-il nul ?`,
            `${n} est-il un multiple de ${d} ? Pose la division si besoin.`,
          ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(multiple ? "oui" : "non", ["oui", "non", "on ne peut pas savoir"]),
        expected: [multiple ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          multiple
            ? `${n} ÷ ${d} = ${n / d}, le reste est nul : ${n} est bien un multiple de ${d}.`
            : `${n} ÷ ${d} donne ${Math.floor(n / d)} et il reste ${n % d}. Le reste n’est pas nul : ${n} n’est pas un multiple de ${d}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_multiple_diviseur_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    hint: "Le grand nombre est le multiple, les petits sont les diviseurs.",
    tags: ["divisibilite", "qcm", "template"],
    // 08/10/2026 : précise et simple (Frédéric)
    // Avant : « Explique ce que a × b = c apprend sur les multiples et les diviseurs ».
    // Désormais : on lit l'égalité dans un sens tiré au hasard (multiple ou diviseur).
    // 09/10/2026 : le fait (produit, division, table ou situation) × la phrase à compléter (4 sens) × 3 consignes.
    generate: () => {
      const pr = pick(PRENOMS);
      const ctx = pick(PARTAGES.filter((c) => c.max >= 120));
      const a = randomChoice([3, 4, 6, 7, 8, 9]);
      let b = randInt(4, 12);
      if (b === a) b += 1;
      const p = a * b;
      const fait = randomChoice([
        `On sait que ${a} × ${b} = ${p}.`,
        `${p} ÷ ${a} = ${b}, sans reste.`,
        `${pr.nom} a calculé ${a} × ${b} = ${p}.`,
        `${ctx.phrase(pr, p, a)} Cela tombe juste : ${a} × ${b} = ${p}.`,
      ]);
      const sens = randomChoice([
        { x: p, y: a, mot: "multiple" },
        { x: a, y: p, mot: "diviseur" },
        { x: p, y: b, mot: "multiple" },
        { x: b, y: p, mot: "diviseur" },
      ]);
      const consigne = randomChoice(["Complète :", "Quel mot manque ?", "Choisis le bon mot :"]);
      return {
        text: `${fait} ${consigne} ${sens.x} est un ... de ${sens.y}.`,
        format: "qcm",
        choices: shuffle(["multiple", "diviseur"]),
        expected: [sens.mot],
        comparator: "mcq_exact",
        explanation: expl(
          sens.mot === "diviseur"
            ? `${a} × ${b} = ${p}, donc ${p} ÷ ${sens.x} = ${p / sens.x} sans reste. ${sens.x} est un diviseur de ${p}.`
            : `${a} × ${b} = ${p} : ${p} est dans la table de ${sens.y}. ${p} est un multiple de ${sens.y}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_multiple_diviseur_tpl_3_suite",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 1,
    theme: "neutral",
    hint: "Les multiples d’un nombre avancent toujours du même pas : ce nombre.",
    tags: ["divisibilite", "multiples", "template"],
    // 09/10/2026 : compter de d en d, dans une situation (9) ; trouver le suivant ou le nombre qui manque.
    generate: () => {
      const p = pick(PRENOMS);
      const d = randomChoice([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 25]);
      const s = randInt(1, 6);
      const suite = [0, 1, 2, 3].map((i) => d * (s + i));
      const trou = Math.random() < 0.35 ? randInt(1, 2) : -1;
      const liste = suite.map((x, i) => (i === trou ? "…" : String(x))).join(", ");
      const rep = trou >= 0 ? suite[trou] : suite[3] + d;
      const debut = randomChoice([
        `${p.nom} saute de ${d} en ${d} sur une piste graduée : ${liste}.`,
        `${p.nom} compte ses billes ${d} par ${d} : ${liste}.`,
        `${p.nom} récite la table de ${d} : ${liste}.`,
        `${p.nom} range ses cartes par paquets de ${d} et compte : ${liste}.`,
        `Une grenouille fait des bonds de ${d} cases : ${liste}.`,
        `${p.nom} plante un arbre tous les ${d} mètres le long du chemin : ${liste}.`,
        `Les places du parking sont numérotées de ${d} en ${d} : ${liste}.`,
        `Les multiples de ${d} se suivent : ${liste}.`,
        `${p.nom} empile des boîtes de ${d} gâteaux et compte les gâteaux : ${liste}.`,
      ]);
      const question =
        trou >= 0
          ? randomChoice(["Quel nombre manque ?", "Quel nombre remplace les points ?", "Complète le nombre qui manque."])
          : randomChoice(["Quel est le nombre suivant ?", "Quel nombre vient ensuite ?", `Quel est le multiple de ${d} suivant ?`]);
      return {
        text: `${debut} ${question}`,
        format: "short",
        expected: [String(rep)],
        comparator: "number_equal",
        explanation: expl(
          `On avance de ${d} à chaque fois : ce sont les multiples de ${d}. ` +
            (trou >= 0 ? `${suite[trou - 1]} + ${d} = ${rep}.` : `${suite[3]} + ${d} = ${rep}.`),
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_multiple_diviseur_tpl_4_choisir",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 4,
    theme: "neutral",
    hint: "Un multiple est dans la table ; un diviseur partage sans reste.",
    tags: ["divisibilite", "qcm", "template"],
    // 09/10/2026 : choisir LE multiple (ou LE diviseur) parmi quatre nombres, nu ou en situation (6 + 6 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      if (Math.random() < 0.5) {
        const d = randomChoice([3, 4, 6, 7, 8, 9, 11, 12]);
        const bon = d * randInt(3, 12);
        const leurres = new Set<number>();
        while (leurres.size < 3) {
          const x = d * randInt(3, 12) + randomChoice([-2, -1, 1, 2]);
          if (x > d && x % d !== 0) leurres.add(x);
        }
        const text = randomChoice([
          `Lequel de ces nombres est un multiple de ${d} ?`,
          `${p.nom} cherche un nombre de la table de ${d}. Lequel choisir ?`,
          `${p.nom} dit : « Un seul de ces nombres est un multiple de ${d}. » Lequel ?`,
          `${p.nom} a des paquets de ${d} images, tous pleins. Combien d’images peut-${il(p)} avoir ?`,
          `Une boîte contient ${d} œufs. ${p.nom} achète des boîtes pleines. Combien d’œufs peut-${il(p)} avoir en tout ?`,
          `${p.nom} ne vend ses biscuits que par sachets de ${d}. Combien de biscuits peut-${il(p)} vendre en tout ?`,
          `Au cinéma, ${p.nom} réserve des rangées entières de ${d} places. Combien de places peut-${il(p)} réserver ?`,
          `${p.nom} avance de ${d} cases à chaque tour, en partant de 0. Sur quelle case peut-${il(p)} tomber ?`,
        ]);
        return {
          text,
          format: "qcm",
          choices: shuffle([String(bon), ...[...leurres].map(String)]),
          expected: [String(bon)],
          comparator: "mcq_exact",
          explanation: expl(`${bon} ÷ ${d} = ${bon / d}, sans reste : ${bon} est un multiple de ${d}. Les autres nombres laissent un reste.`),
        };
      }
      const N = randomChoice([24, 30, 36, 40, 42, 48, 54, 56, 60, 72, 84, 90, 96]);
      const divs = diviseurs(N).filter((x) => x > 1 && x < N);
      const bon = randomChoice(divs);
      const non = Array.from({ length: N - 2 }, (_, i) => i + 2).filter((x) => N % x !== 0 && x < N);
      const leurres = shuffle(non).slice(0, 3);
      const text = randomChoice([
        `Lequel de ces nombres est un diviseur de ${N} ?`,
        `${p.nom} veut diviser ${N} sans reste. Par quel nombre peut-${il(p)} diviser ?`,
        `${p.nom} dit : « Un seul de ces nombres est un diviseur de ${N}. » Lequel ?`,
        `${p.nom} range ${N} timbres en rangées égales, sans rangée incomplète. Combien de timbres par rangée ?`,
        `${p.nom} veut ranger ${N} photos en pages égales, sans page incomplète. Combien de photos par page peut-${il(p)} mettre ?`,
        `${N} élèves partent en sortie. On veut des groupes égaux, sans élève de côté. Quelle taille de groupe convient ?`,
        `${p.nom} coupe un ruban de ${N} cm en morceaux égaux, sans chute. Combien de centimètres peut mesurer chaque morceau ?`,
        `${p.nom} partage ${N} bonbons en parts égales, sans reste. Combien de bonbons peut contenir chaque part ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([String(bon), ...leurres.map(String)]),
        expected: [String(bon)],
        comparator: "mcq_exact",
        explanation: expl(`${N} ÷ ${bon} = ${N / bon}, sans reste : ${bon} est un diviseur de ${N}. Les autres nombres laissent un reste.`),
      };
    },
  },

  /* ===== DIV_CRITERE_2_5_10 ===== */
  {
    kind: "fixed",
    id: "div_critere_2_5_10_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 1,
    theme: "neutral",
    text: "Un nombre est divisible par 2 quand son chiffre des unités est...",
    format: "qcm",
    choices: [
      "0, 2, 4, 6 ou 8",
      "0 ou 5",
      "0 seulement",
      "n’importe lequel",
    ],
    expected: ["0, 2, 4, 6 ou 8"],
    comparator: "mcq_exact",
    hint: "Ce sont les nombres pairs.",
    explanation: expl(
      "Un nombre est divisible par 2 s’il est pair, c’est-à-dire si son chiffre des unités est 0, 2, 4, 6 ou 8. Il suffit de regarder le dernier chiffre, quelle que soit la taille du nombre.",
    ),
    tags: ["divisibilite", "critere", "propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_critere_2_5_10_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 3,
    theme: "neutral",
    text: "Un nombre se termine par 0. Par lesquels de ces nombres est-il forcément divisible ?",
    format: "qcm",
    choices: ["par 2, par 5 et par 10", "par 5 seulement", "par 10 seulement", "par 3 et par 9"],
    expected: ["par 2, par 5 et par 10"],
    comparator: "mcq_exact",
    hint: "Le zéro final est le seul chiffre qui coche les trois critères à la fois.",
    explanation: expl(
      "Un nombre terminé par 0 est pair, donc divisible par 2. Il se termine par 0 ou 5, donc divisible par 5. Et il se termine par 0, donc divisible par 10. C’est le seul chiffre des unités qui satisfait les trois critères en même temps.",
    ),
    tags: ["divisibilite", "critere", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_critere_2_5_10_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 4,
    theme: "neutral",
    text: "Le nombre 375 est-il divisible par 2 ?",
    format: "qcm",
    choices: ["non", "oui", "oui, car il est divisible par 5", "on ne peut pas savoir sans poser la division"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Ne regarde que le dernier chiffre.",
    explanation: expl(
      "Le chiffre des unités de 375 est 5 : le nombre est impair, donc pas divisible par 2. Attention au piège — 375 est bien divisible par 5, mais cela ne dit rien sur 2.",
    ),
    tags: ["divisibilite", "critere", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_critere_2_5_10_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "On veut savoir si 4 738 est divisible par 5. Quel chiffre suffit-il de regarder ?",
    format: "qcm",
    choices: ["8", "4", "3", "7"],
    expected: ["8"],
    comparator: "mcq_exact",
    hint: "Une dizaine entière est toujours divisible par 5.",
    explanation: expl(
      "4 738 = 4 730 + 8. 4 730 est fait de dizaines : il est divisible par 5. Tout dépend donc du chiffre des unités, 8. Ce n’est ni 0 ni 5 : 4 738 n’est pas divisible par 5.",
    ),
    tags: ["divisibilite", "critere", "qcm", "raisonnement"],
  },
  {
    kind: "template",
    id: "div_critere_2_5_10_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde le chiffre des unités, rien d’autre.",
    tags: ["divisibilite", "critere", "template"],
    // 09/10/2026 : nombre nu (5 tournures, jusqu'à 4 chiffres) ou situation de partage par 2, 5 ou 10 (18).
    generate: () => {
      const p = pick(PRENOMS);
      const par = randomChoice([2, 5, 10]);
      const situation = Math.random() < 0.45;
      const ctx = pick(PARTAGES.filter((c) => c.max >= 100));
      const n = situation ? randInt(21, ctx.max) : randomChoice([randInt(100, 999), randInt(1000, 9999)]);
      const oui = n % par === 0;
      const unite = n % 10;
      const text = situation
        ? `${ctx.phrase(p, n, par)} ${randomChoice([
            "Sans poser la division, est-ce possible sans qu’il en reste ?",
            "Regarde le chiffre des unités : cela tombe-t-il juste ?",
            `Autrement dit : ${n} est-il divisible par ${par} ?`,
          ])}`
        : randomChoice([
            `Le nombre ${mil(n)} est-il divisible par ${par} ? Regarde son chiffre des unités.`,
            `Sans poser la division : ${mil(n)} est-il divisible par ${par} ?`,
            `${p.nom} affirme que ${mil(n)} est divisible par ${par}. A-t-${il(p)} raison ?`,
            `${mil(n)} est-il un multiple de ${par} ? Un seul chiffre suffit pour le savoir.`,
            `${p.nom} veut savoir si ${mil(n)} est divisible par ${par}. Quelle est la réponse ?`,
          ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(oui ? "oui" : "non", ["oui", "non", "on ne peut pas savoir"]),
        expected: [oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          `Le chiffre des unités de ${mil(n)} est ${unite}. ` +
            (par === 2
              ? `Pour être divisible par 2, il faut 0, 2, 4, 6 ou 8 : ${oui ? "c’est le cas" : "ce n’est pas le cas"}.`
              : par === 5
                ? `Pour être divisible par 5, il faut 0 ou 5 : ${oui ? "c’est le cas" : "ce n’est pas le cas"}.`
                : `Pour être divisible par 10, il faut 0 : ${oui ? "c’est le cas" : "ce n’est pas le cas"}.`),
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_critere_2_5_10_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde le chiffre des unités, rien d’autre.",
    tags: ["divisibilite", "critere", "qcm", "template"],
    // 08/10/2026 : précise et simple (Frédéric)
    // Avant : « dis par lesquels de 2, 5 et 10… Explique. » (mot-clé). Désormais un QCM court.
    // 09/10/2026 : nombre nu (4 tournures) ou objets à ranger par 2, 5 ou 10 (6 objets × 3 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const n = randInt(100, 999);
      const d2 = n % 2 === 0;
      const d5 = n % 5 === 0;
      const situation = Math.random() < 0.5;
      const choix = situation
        ? ["par 2, par 5 et par 10", "par 2 seulement", "par 5 seulement", "aucun"]
        : ["par 2, 5 et 10", "par 2 seulement", "par 5 seulement", "par aucun"];
      const bonne = d2 && d5 ? choix[0] : d2 ? choix[1] : d5 ? choix[2] : choix[3];
      const obj = randomChoice(["billes", "timbres", "trombones", "boutons", "élastiques", "images à collectionner"]);
      const text = situation
        ? `${p.nom} a ${n} ${obj}. ${Il(p)} veut les ranger par 2, par 5 ou par 10, sans reste. ${randomChoice([
            "Quels rangements tombent juste ?",
            "Lesquels de ces rangements sont possibles ?",
            `Comment peut-${il(p)} les ranger ?`,
          ])}`
        : randomChoice([
            `Par lesquels de 2, 5 et 10 le nombre ${n} est-il divisible ?`,
            `${p.nom} teste ${n} avec les critères de 2, de 5 et de 10. Que trouve-t-${il(p)} ?`,
            `Regarde le chiffre des unités de ${n}. Par lesquels de 2, 5 et 10 est-il divisible ?`,
            `${p.nom} a écrit ${n} au tableau. Par lesquels de 2, 5 et 10 ce nombre est-il divisible ?`,
          ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(choix),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: expl(
          `Le chiffre des unités de ${n} est ${n % 10}. ` +
            `Divisible par 2 : ${n % 2 === 0 ? "oui" : "non"}. Par 5 : ${n % 5 === 0 ? "oui" : "non"}. Par 10 : ${n % 10 === 0 ? "oui" : "non"}. ` +
            "Le dernier chiffre suffit pour les trois critères.",
        ),
      };
    },
  },

  {
    kind: "template",
    id: "div_critere_2_5_10_tpl_3_chiffre",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 1,
    theme: "neutral",
    hint: "Pour 2 : 0, 2, 4, 6 ou 8. Pour 5 : 0 ou 5. Pour 10 : 0.",
    tags: ["divisibilite", "critere", "qcm", "template"],
    // 09/10/2026 : le chiffre des unités qui manque, nu ou en situation (6 tournures) ; un seul choix convient.
    generate: () => {
      const p = pick(PRENOMS);
      const par = randomChoice([2, 5, 10]);
      const pre = randomChoice([randInt(1, 9), randInt(10, 99), randInt(10, 99)]);
      const ok = (c: number) => (pre * 10 + c) % par === 0;
      const bons = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter(ok);
      const bon = randomChoice(bons);
      const mauvais = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((c) => !ok(c))).slice(0, 3);
      const text = randomChoice([
        `${p.nom} doit écrire un chiffre à la place des points dans ${pre}… pour obtenir un nombre divisible par ${par}. Lequel ?`,
        `${p.nom} écrit ${pre}… et veut un nombre divisible par ${par}. Quel chiffre peut-${il(p)} écrire à la fin ?`,
        `Le code du cadenas ${de(p.nom)} commence par ${pre}… et il est divisible par ${par}. Quel chiffre termine le code ?`,
        `Dans le nombre ${pre}… écrit par ${p.nom}, il manque le chiffre des unités. Lequel donne un nombre divisible par ${par} ?`,
        `Le ticket ${de(p.nom)} porte le numéro ${pre}…, un nombre divisible par ${par}. Quel est le chiffre effacé ?`,
        `${p.nom} pense à un nombre divisible par ${par} qui commence par ${pre}… Quel chiffre des unités peut-il avoir ?`,
        `Le numéro de la maison ${de(p.nom)} s’écrit ${pre}… et il est divisible par ${par}. Quel est son dernier chiffre ?`,
        `${p.nom} complète ${pre}… avec un seul chiffre pour obtenir un nombre divisible par ${par}. Lequel choisit-${il(p)} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([String(bon), ...mauvais.map(String)]),
        expected: [String(bon)],
        comparator: "mcq_exact",
        explanation: expl(
          `Pour être divisible par ${par}, un nombre doit se terminer par ${par === 2 ? "0, 2, 4, 6 ou 8" : par === 5 ? "0 ou 5" : "0"}. ` +
            `Parmi les propositions, seul ${bon} convient : ${pre * 10 + bon} est divisible par ${par}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_critere_2_5_10_tpl_4_condition",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde le chiffre des unités de chaque nombre, et vérifie les deux conditions.",
    tags: ["divisibilite", "critere", "qcm", "template", "piege"],
    // 09/10/2026 : six conditions (« par 5 mais pas par 2 »…) × 5 tournures ; un seul nombre la remplit.
    generate: () => {
      const p = pick(PRENOMS);
      const cond = randomChoice([
        { txt: "par 10", ok: (u: number) => u === 0 },
        { txt: "par 2 et par 5", ok: (u: number) => u === 0 },
        { txt: "par 5 mais pas par 2", ok: (u: number) => u === 5 },
        { txt: "par 2 mais pas par 5", ok: (u: number) => u % 2 === 0 && u !== 0 },
        { txt: "par 5 mais pas par 10", ok: (u: number) => u === 5 },
        { txt: "par 2 mais pas par 10", ok: (u: number) => u % 2 === 0 && u !== 0 },
      ]);
      const chiffres = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const uBon = randomChoice(chiffres.filter(cond.ok));
      // Les leurres : des chiffres qui remplissent UNE des conditions, si possible.
      const uMauvais = shuffle(chiffres.filter((u) => !cond.ok(u))).slice(0, 3);
      const nombre = (u: number) => randInt(10, 999) * 10 + u;
      const vus = new Set<number>();
      const tirer = (u: number) => {
        let x = nombre(u);
        while (vus.has(x)) x = nombre(u);
        vus.add(x);
        return x;
      };
      const bon = tirer(uBon);
      const leurres = uMauvais.map(tirer);
      const text = randomChoice([
        `${p.nom} a noté quatre nombres. Lequel est divisible ${cond.txt} ?`,
        `${p.nom} cherche un nombre divisible ${cond.txt}. Lequel choisir ?`,
        `Un seul de ces nombres est divisible ${cond.txt}. Lequel ?`,
        `${p.nom} affirme : « Ce nombre est divisible ${cond.txt}. » De quel nombre parle-t-${il(p)} ?`,
        `Sans poser de division, ${p.nom} repère le nombre divisible ${cond.txt}. Lequel ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([bon, ...leurres].map(mil)),
        expected: [mil(bon)],
        comparator: "mcq_exact",
        explanation: expl(
          `On regarde le chiffre des unités. ${mil(bon)} se termine par ${uBon} : il est divisible ${cond.txt}. ` +
            "Pour chacun des autres nombres, le chiffre des unités ne convient pas.",
        ),
      };
    },
  },

  /* ===== DIV_CRITERE_3_9 ===== */
  {
    kind: "fixed",
    id: "div_critere_3_9_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 2,
    theme: "neutral",
    text: "Un nombre est divisible par 3 quand...",
    format: "qcm",
    choices: [
      "la somme de ses chiffres est divisible par 3",
      "son dernier chiffre est 3, 6 ou 9",
      "il est impair",
      "son premier chiffre est divisible par 3",
    ],
    expected: ["la somme de ses chiffres est divisible par 3"],
    comparator: "mcq_exact",
    hint: "Ce critère-là ne regarde pas un seul chiffre, mais tous.",
    explanation: expl(
      "Pour 3, on additionne TOUS les chiffres du nombre. Si cette somme est divisible par 3, le nombre l’est aussi. Le dernier chiffre ne dit rien : 13 se termine par 3 mais n’est pas divisible par 3.",
    ),
    tags: ["divisibilite", "critere", "propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_critere_3_9_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 4,
    theme: "neutral",
    text: "Le nombre 13 se termine par 3. Est-il divisible par 3 ?",
    format: "qcm",
    choices: ["non", "oui", "oui, car il se termine par 3", "on ne peut pas savoir"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Additionne les chiffres au lieu de regarder le dernier.",
    explanation: expl(
      "1 + 3 = 4, et 4 n’est pas divisible par 3 : le nombre 13 ne l’est pas non plus. Se terminer par 3 ne prouve rien — c’est le piège que ce critère tend chaque année.",
    ),
    tags: ["divisibilite", "critere", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_critere_3_9_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 4,
    theme: "neutral",
    text: "Un nombre est divisible par 9. Est-il forcément divisible par 3 ?",
    format: "qcm",
    choices: ["oui", "non", "seulement s’il est pair", "on ne peut pas savoir"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "9 se partage lui-même en parts de 3.",
    explanation: expl(
      "Si la somme des chiffres est divisible par 9, elle l’est aussi par 3, puisque 9 = 3 × 3. Tout multiple de 9 est donc un multiple de 3. L’inverse est faux : 6 est divisible par 3 mais pas par 9.",
    ),
    tags: ["divisibilite", "critere", "raisonnement", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_critere_3_9_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "Sans poser la division : 4 152 est-il divisible par 3 ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Additionne les quatre chiffres.",
    explanation: expl(
      "On additionne tous les chiffres : 4 + 1 + 5 + 2 = 12. 12 est dans la table de 3. Donc 4 152 est divisible par 3.",
    ),
    tags: ["divisibilite", "critere", "qcm", "methode"],
  },
  {
    kind: "template",
    id: "div_critere_3_9_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les chiffres, puis regarde la somme.",
    tags: ["divisibilite", "critere", "template"],
    // 09/10/2026 : nombre nu (5 tournures, 3 ou 4 chiffres) ou situation de partage par 3 ou 9 (18).
    generate: () => {
      const p = pick(PRENOMS);
      const par = randomChoice([3, 9]);
      const situation = Math.random() < 0.45;
      const ctx = pick(PARTAGES.filter((c) => c.max >= 100));
      // Un oui sur deux : sinon presque tout est « non » pour 9.
      let n = situation ? randInt(30, ctx.max) : randomChoice([randInt(100, 999), randInt(1000, 9999)]);
      if (Math.random() < 0.5) n -= n % par;
      const s = sommeChiffres(n);
      const oui = n % par === 0;
      const text = situation
        ? `${ctx.phrase(p, n, par)} ${randomChoice([
            "Additionne les chiffres : est-ce possible sans qu’il en reste ?",
            "Sans poser la division, cela tombe-t-il juste ?",
            `Autrement dit : ${n} est-il divisible par ${par} ?`,
          ])}`
        : randomChoice([
            `Le nombre ${mil(n)} est-il divisible par ${par} ?`,
            `Sans poser la division : ${mil(n)} est-il divisible par ${par} ?`,
            `${p.nom} affirme que ${mil(n)} est divisible par ${par}. A-t-${il(p)} raison ?`,
            `${mil(n)} est-il un multiple de ${par} ? Utilise la somme des chiffres.`,
            `${p.nom} additionne les chiffres de ${mil(n)}. Ce nombre est-il divisible par ${par} ?`,
          ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(oui ? "oui" : "non", ["oui", "non", "on ne peut pas savoir"]),
        expected: [oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          `Somme des chiffres de ${mil(n)} : ${String(n).split("").join(" + ")} = ${s}. ` +
            `${s} ${oui ? "est" : "n’est pas"} divisible par ${par}, donc ${mil(n)} ${oui ? "l’est aussi" : "ne l’est pas non plus"}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_critere_3_9_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne tous les chiffres du nombre.",
    tags: ["divisibilite", "critere", "short", "template"],
    // 08/10/2026 : précise et simple (Frédéric)
    // Avant : « Explique comment savoir si n est divisible par 9 » (mot-clé). Désormais l'élève fait l'étape clé : la somme.
    // 09/10/2026 : la somme des chiffres, nue ou en situation (8 tournures), pour 3 ou pour 9.
    generate: () => {
      const p = pick(PRENOMS);
      const par = randomChoice([3, 9]);
      const n = randomChoice([randInt(100, 999), randInt(1000, 9999)]);
      const s = sommeChiffres(n);
      const text = randomChoice([
        `Pour savoir si ${mil(n)} est divisible par ${par}, on additionne ses chiffres. Combien trouves-tu ?`,
        `${p.nom} veut savoir si ${mil(n)} est divisible par ${par}. ${Il(p)} additionne ses chiffres. Quelle somme trouve-t-${il(p)} ?`,
        `Calcule la somme des chiffres de ${mil(n)}. Elle dira si ce nombre est divisible par ${par}.`,
        `Le car du club ${de(p.nom)} a parcouru ${mil(n)} km. Pour tester la divisibilité par ${par}, quelle est la somme des chiffres de ce nombre ?`,
        `${p.nom} a ${mil(n)} points au jeu. Les points se partagent-ils par ${par} ? Commence par la somme des chiffres : combien vaut-elle ?`,
        `Première étape du critère de divisibilité par ${par} pour ${mil(n)} : quelle est la somme de ses chiffres ?`,
        `${p.nom} teste si ${mil(n)} est un multiple de ${par}. Quelle somme de chiffres doit-${il(p)} calculer ? Donne le résultat.`,
        `Dans la bibliothèque ${de(p.nom)}, un livre porte le numéro ${mil(n)}. Ce numéro est-il divisible par ${par} ? Donne d’abord la somme de ses chiffres.`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(s)],
        comparator: "number_equal",
        explanation: expl(
          `On additionne les chiffres : ${String(n).split("").join(" + ")} = ${s}. ` +
            `${s} ${s % par === 0 ? "est" : "n’est pas"} dans la table de ${par}, donc ${mil(n)} ${s % par === 0 ? "est" : "n’est pas"} divisible par ${par}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_critere_3_9_tpl_3_lequel",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les chiffres de chaque nombre.",
    tags: ["divisibilite", "critere", "qcm", "template"],
    // 09/10/2026 : choisir LE nombre divisible par 3 (ou 9) parmi quatre, nu ou en situation (6 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const par = randomChoice([3, 9]);
      const bon = par * randInt(Math.ceil(100 / par), Math.floor(999 / par));
      const leurres = new Set<number>();
      while (leurres.size < 3) {
        const x = randInt(100, 999);
        // Piège : un leurre se termine par 3, 6 ou 9 (le faux critère du dernier chiffre).
        const y = leurres.size === 0 ? x - (x % 10) + par : x;
        if (y % par !== 0 && y !== bon && y <= 999) leurres.add(y);
      }
      const text = randomChoice([
        `${p.nom} a écrit quatre nombres au tableau. Lequel est divisible par ${par} ?`,
        `${p.nom} cherche un nombre divisible par ${par}. Lequel choisir ?`,
        `${p.nom} dit : « Un seul de ces nombres est divisible par ${par}. » Lequel ?`,
        `Le dossard ${de(p.nom)} porte un numéro divisible par ${par}. Lequel est-ce ?`,
        `${p.nom} collectionne les images : ${il(p)} en a un nombre divisible par ${par}. Combien d’images a-t-${il(p)} ?`,
        `${p.nom} veut partager ses billes en ${par} tas égaux, sans reste. Combien de billes peut-${il(p)} avoir ?`,
        `${p.nom} met des graines en sachets de ${par}, tous pleins. Combien de graines a-t-${il(p)} pu ensacher ?`,
        `Sans poser de division, ${p.nom} repère le nombre divisible par ${par}. Lequel ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([bon, ...leurres].map(String)),
        expected: [String(bon)],
        comparator: "mcq_exact",
        explanation: expl(
          `Somme des chiffres de ${bon} : ${String(bon).split("").join(" + ")} = ${sommeChiffres(bon)}, qui est dans la table de ${par}. ` +
            `Pour les autres nombres, la somme des chiffres n’est pas dans la table de ${par}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_critere_3_9_tpl_4_les_deux",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule la somme des chiffres, puis teste 3, puis 9.",
    tags: ["divisibilite", "critere", "qcm", "template"],
    // 09/10/2026 : par 3 et par 9, par 3 seulement, ou ni l'un ni l'autre ; nu ou en situation (5 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const cas = randomChoice([9, 3, 1]);
      let n = randInt(100, 9999);
      if (cas === 9) n -= n % 9;
      else if (cas === 3) n = n - (n % 3) + (n % 9 < 3 ? 3 : 0);
      if (n < 100) n += 9 * 12;
      if (cas === 1 && n % 3 === 0) n += 1;
      if (cas === 3 && n % 9 === 0) n += 3;
      const choix = ["par 3 et par 9", "par 3 seulement", "par 9 seulement", "ni par 3 ni par 9"];
      const bonne = n % 9 === 0 ? choix[0] : n % 3 === 0 ? choix[1] : choix[3];
      const text = randomChoice([
        `Le nombre ${mil(n)} est-il divisible par 3 ? par 9 ?`,
        `${p.nom} teste ${mil(n)} avec les critères de 3 et de 9. Que trouve-t-${il(p)} ?`,
        `La somme des chiffres de ${mil(n)} répond à la question : par lesquels de 3 et 9 ce nombre est-il divisible ?`,
        `${p.nom} a ${mil(n)} grains de riz à ranger en tas de 3 ou en tas de 9, sans reste. Quels tas sont possibles ?`,
        `Au marathon, ${p.nom} porte le dossard ${mil(n)}. Par lesquels de 3 et 9 ce numéro est-il divisible ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(choix),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: expl(
          `${String(n).split("").join(" + ")} = ${sommeChiffres(n)}. ` +
            `Divisible par 3 : ${n % 3 === 0 ? "oui" : "non"}. Divisible par 9 : ${n % 9 === 0 ? "oui" : "non"}. ` +
            "Tout nombre divisible par 9 l’est aussi par 3 : « par 9 seulement » est impossible.",
        ),
      };
    },
  },

  /* ===== DIV_LISTER_DIVISEURS ===== */
  {
    kind: "fixed",
    id: "div_lister_diviseurs_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 3,
    theme: "neutral",
    text: "Combien 12 a-t-il de diviseurs en tout ? Réponds par un nombre.",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche-les par paires : 1 et 12, 2 et 6…",
    explanation: expl(
      "On cherche par paires : 1 × 12, 2 × 6, 3 × 4. Cela donne 1, 2, 3, 4, 6 et 12, soit 6 diviseurs. Chercher par paires évite d’en oublier.",
    ),
    tags: ["divisibilite", "diviseurs"],
  },
  {
    kind: "fixed",
    id: "div_lister_diviseurs_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 4,
    theme: "neutral",
    text: "Combien le nombre 7 a-t-il de diviseurs ? Réponds par un nombre.",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Essaie 1, 2, 3… jusqu’à 7.",
    explanation: expl(
      "Seuls 1 et 7 divisent 7 sans reste. Il a donc exactement 2 diviseurs. Les nombres qui n’en ont que deux portent un nom : on les appelle des nombres premiers.",
    ),
    tags: ["divisibilite", "diviseurs", "remarquable", "premier"],
  },
  {
    kind: "fixed",
    id: "div_lister_diviseurs_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 5,
    theme: "neutral",
    text: "Quel est le plus grand diviseur commun à 24 et 36 ? Réponds par un nombre.",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Liste les diviseurs de chacun, puis compare.",
    explanation: expl(
      "Diviseurs de 24 : 1, 2, 3, 4, 6, 8, 12, 24. Diviseurs de 36 : 1, 2, 3, 4, 6, 9, 12, 18, 36. Les diviseurs communs sont 1, 2, 3, 4, 6 et 12 : le plus grand est 12.",
    ),
    tags: ["divisibilite", "diviseurs", "commun"],
  },
  {
    kind: "fixed",
    id: "div_lister_diviseurs_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: "On cherche les diviseurs de 18 par paires : 1 × 18, 2 × 9, 3 × ... Complète la dernière paire.",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Chaque diviseur en amène un autre : 18 ÷ 3 = ?",
    explanation: expl(
      "18 ÷ 3 = 6, donc 3 × 6 = 18. Les paires sont 1 et 18, 2 et 9, 3 et 6. Les diviseurs de 18 sont 1, 2, 3, 6, 9 et 18. Chercher par paires évite d’en oublier.",
    ),
    tags: ["divisibilite", "diviseurs", "short", "methode"],
  },
  {
    kind: "template",
    id: "div_lister_diviseurs_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche par paires : 1 et le nombre, 2 et sa moitié…",
    tags: ["divisibilite", "diviseurs", "template"],
    // 09/10/2026 : compter les diviseurs, nu ou en situation (8 tournures), n de 12 à 100.
    generate: () => {
      const p = pick(PRENOMS);
      const n = randomChoice([12, 15, 16, 18, 20, 21, 24, 28, 30, 32, 36, 40, 42, 44, 45, 48, 50, 54, 56, 60, 63, 64, 66, 70, 72, 75, 80, 84, 90, 96, 100]);
      const liste = diviseurs(n);
      const text = randomChoice([
        `${p.nom} se demande combien le nombre ${n} a de diviseurs en tout. Réponds par un nombre.`,
        `${p.nom} cherche tous les diviseurs de ${n}, par paires. Combien en trouve-t-${il(p)} ?`,
        `${p.nom} liste les diviseurs de ${n}, sans oublier 1 ni ${n}. Combien y en a-t-il ?`,
        `${p.nom} écrit la liste complète des diviseurs de ${n}. Combien de nombres écrit-${il(p)} ?`,
        `Combien de nombres entiers divisent ${n} sans reste ? ${p.nom} compte aussi 1 et ${n}.`,
        `Le professeur demande à ${p.nom} combien ${n} a de diviseurs. Que doit-${il(p)} répondre ?`,
        `${p.nom} a ${n} jetons. ${Il(p)} veut des piles toutes de même hauteur, sans jeton de côté (une seule pile, ou des piles d’un jeton, c’est permis). Combien de hauteurs de pile sont possibles ?`,
        `${p.nom} veut ranger ${n} tables en rangées égales (une seule rangée est permise). Combien de nombres de tables par rangée sont possibles ?`,
        `${p.nom} et sa classe comptent les diviseurs de ${n} au tableau. Combien en trouvent-ils ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(liste.length)],
        comparator: "number_equal",
        explanation: expl(
          `Les diviseurs de ${n} sont : ${liste.join(", ")}. Il y en a ${liste.length}. ` +
            "En les cherchant par paires, on n’en oublie aucun.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_lister_diviseurs_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche par paires : 1 et le nombre, 2 et sa moitié…",
    tags: ["divisibilite", "diviseurs", "short", "template"],
    // 08/10/2026 : précise et simple (Frédéric)
    // Avant : « Explique comment tu trouves tous les diviseurs de n » (mot-clé).
    // Désormais : une liste où il manque UN diviseur (ni 1 ni n), à retrouver par les paires.
    // 09/10/2026 : la liste trouée, nue ou en situation (6 tournures), n de 24 à 100.
    generate: () => {
      const p = pick(PRENOMS);
      const n = randomChoice([24, 30, 32, 36, 40, 42, 48, 54, 56, 60, 66, 70, 72, 78, 80, 84, 88, 90, 96, 100]);
      const liste = diviseurs(n);
      const manquant = randomChoice(liste.slice(1, -1));
      const trouee = liste.filter((d) => d !== manquant);
      const obj = randomChoice(["billes", "timbres", "photos", "biscuits", "perles"]);
      const text = randomChoice([
        `Voici des diviseurs de ${n} : ${trouee.join(", ")}. Il en manque un. Lequel ?`,
        `${p.nom} a listé les diviseurs de ${n} : ${trouee.join(", ")}. ${Il(p)} en a oublié un. Lequel ?`,
        `${p.nom} range ${n} ${obj} en paquets égaux, sans reste. ${Il(p)} note les tailles de paquet possibles : ${trouee.join(", ")}. Quelle taille a-t-${il(p)} oubliée ?`,
        `Les diviseurs de ${n} sont : ${trouee.join(", ")}… sauf un, qu’on a effacé. Lequel ?`,
        `${p.nom} cherche les diviseurs de ${n} par paires et écrit : ${trouee.join(", ")}. Quel diviseur manque ?`,
        `Dans la liste ${de(p.nom)}, il manque un diviseur de ${n} : ${trouee.join(", ")}. Retrouve-le.`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(manquant)],
        comparator: "number_equal",
        explanation: expl(
          `On cherche par paires : ${liste
            .slice(0, Math.ceil(liste.length / 2))
            .map((d) => `${d} × ${n / d}`)
            .join(", ")}. ` +
            `${manquant} va avec ${n / manquant} : c’est lui qui manquait. Au total : ${liste.join(", ")}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "div_lister_diviseurs_tpl_3_paire",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque diviseur en amène un autre : divise le nombre par celui que tu connais.",
    tags: ["divisibilite", "diviseurs", "short", "template"],
    // 09/10/2026 : compléter une paire de diviseurs, nu ou en situation (6 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const n = randomChoice([12, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 64, 72, 80, 84, 90, 96]);
      const petits = diviseurs(n).filter((x) => x > 1 && x * x <= n);
      const d = randomChoice(petits);
      const avant = [1, ...petits.filter((x) => x < d)].map((x) => `${x} × ${n / x}`).join(", ");
      const text = randomChoice([
        `${p.nom} cherche les diviseurs de ${n} par paires : ${avant}. Complète la paire suivante : ${d} × … = ${n}.`,
        `${p.nom} dessine des rectangles de ${n} carreaux. ${Il(p)} a déjà ${avant}. Avec une largeur de ${d} carreaux : ${d} × … = ${n}. Quelle est la longueur ?`,
        `${p.nom} complète : ${d} × … = ${n}. Le nombre trouvé est aussi un diviseur de ${n}. Lequel est-ce ?`,
        `${p.nom} prépare ${n} parts de gâteau sur ${d} assiettes, autant sur chacune : ${d} × … = ${n}. Combien de parts par assiette ?`,
        `${p.nom} range ${n} chaises en ${d} rangées égales : ${d} × … = ${n}. Combien de chaises par rangée ?`,
        `${p.nom} partage ${n} bonbons entre ${d} amis, sans reste : ${d} × … = ${n}. Combien de bonbons chacun ?`,
        `Diviseurs de ${n}, par paires : ${avant}. ${p.nom} cherche le nombre qui va avec ${d}. Lequel ? (${d} × … = ${n})`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(n / d)],
        comparator: "number_equal",
        explanation: expl(`${n} ÷ ${d} = ${n / d}, donc ${d} × ${n / d} = ${n}. ${d} et ${n / d} sont deux diviseurs de ${n} qui vont ensemble.`),
      };
    },
  },
  {
    kind: "template",
    id: "div_lister_diviseurs_tpl_4_commun",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 5,
    theme: "neutral",
    hint: "Liste les diviseurs de chaque nombre, puis garde le plus grand qu’ils ont en commun.",
    tags: ["divisibilite", "diviseurs", "commun", "short", "template"],
    // 09/10/2026 : le plus grand diviseur commun, nu ou en situation (7 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const g = randomChoice([2, 3, 4, 5, 6, 7, 8, 9, 10, 12]);
      const premiersEntre = [[2, 3], [3, 4], [2, 5], [3, 5], [4, 5], [5, 6], [3, 7], [5, 7], [4, 7], [2, 7], [5, 8], [7, 8], [3, 8]];
      let [x, y] = randomChoice(premiersEntre.filter(([u, v]) => g * v <= 100));
      if (Math.random() < 0.5) [x, y] = [y, x];
      const a = g * x;
      const b = g * y;
      const ruban = Math.random() < 0.15;
      const text = ruban
        ? `${p.nom} coupe un ruban de ${a} cm et un ruban de ${b} cm en morceaux tous de même longueur, la plus grande possible, sans chute. Quelle est la longueur d’un morceau ?`
        : randomChoice([
            `Quel est le plus grand diviseur commun à ${a} et ${b} ? Réponds par un nombre.`,
            `${p.nom} a ${a} roses et ${b} tulipes. ${Il(p)} veut faire des bouquets tous identiques, avec toutes les fleurs. Combien de bouquets au maximum ?`,
            `${p.nom} a ${a} billes rouges et ${b} billes bleues. ${Il(p)} veut des sachets identiques, sans bille de côté. Combien de sachets au maximum ?`,
            `Pour la kermesse, ${p.nom} a ${a} croissants et ${b} pains au chocolat. ${Il(p)} veut des plateaux identiques, sans reste. Combien de plateaux au maximum ?`,
            `Un club compte ${a} filles et ${b} garçons. ${p.nom} veut former des équipes identiques (même nombre de filles, même nombre de garçons). Combien d’équipes au maximum ?`,
            `${p.nom} a ${a} crayons et ${b} gommes. ${Il(p)} veut remplir des trousses identiques, sans rien laisser. Combien de trousses au maximum ?`,
          ]);
      return {
        text,
        format: "short",
        expected: [ruban ? `${g} cm` : String(g)],
        comparator: "number_equal",
        explanation: expl(
          `Diviseurs de ${a} : ${diviseurs(a).join(", ")}. Diviseurs de ${b} : ${diviseurs(b).join(", ")}. ` +
            `Le plus grand diviseur commun est ${g}.` +
            (ruban ? ` Chaque morceau mesure ${g} cm.` : ` On fait ${g} groupes : ${a} ÷ ${g} = ${x} et ${b} ÷ ${g} = ${y} dans chacun.`),
        ),
      };
    },
  },

  /* ===== DIV_DEFI =====
     C'est ici que la divisibilité sert à quelque chose : simplifier une
     fraction sans tâtonner. Les fractions passent en LaTeX, l'empilement se
     lit mieux qu'un « 24/36 » ; les réponses restent en texte brut. */
  {
    kind: "fixed",
    id: "div_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    text: `Par quel nombre peut-on simplifier ${frac(24, 36)} d’un seul coup, pour arriver directement au résultat le plus simple ? Réponds par un nombre.`,
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Cherche le plus grand diviseur commun aux deux nombres.",
    explanation: expl(
      "24 et 36 sont tous deux divisibles par 2, 3, 4, 6 et 12. Le plus grand est 12 : 24 ÷ 12 = 2 et 36 ÷ 12 = 3. On arrive d’un coup à 2/3, sans passer par des étapes intermédiaires.",
    ),
    tags: ["divisibilite", "defi", "fraction", "latex"],
  },
  {
    kind: "fixed",
    id: "div_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Un professeur du collège de Saint-Benoît veut répartir 36 élèves en groupes de même taille, sans laisser personne de côté et sans faire un seul groupe géant. Combien de tailles de groupes différentes sont possibles ? Réponds par un nombre.",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Ce sont les diviseurs de 36, sauf 36 lui-même.",
    explanation: expl(
      "Les diviseurs de 36 sont 1, 2, 3, 4, 6, 9, 12, 18 et 36. On écarte 36, qui ferait un seul groupe de toute la classe. Il reste 8 possibilités… mais des groupes de 1 élève ne sont pas des groupes : on écarte aussi 1. Restent 2, 3, 4, 6, 9, 12 et 18, soit 7 tailles possibles.",
    ),
    tags: ["divisibilite", "defi", "reunion", "diviseurs"],
  },
  {
    kind: "fixed",
    id: "div_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric)
    text: `Un élève simplifie ${frac(35, 40)} en ${frac(7, 8)}. Par quel nombre a-t-il divisé en haut et en bas ?`,
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Regarde le chiffre des unités des deux nombres.",
    explanation: expl(
      "35 se termine par 5 et 40 par 0 : les deux sont divisibles par 5. 35 ÷ 5 = 7 et 40 ÷ 5 = 8. Il a divisé par 5.",
    ),
    tags: ["divisibilite", "defi", "short", "fraction", "latex"],
  },
  {
    kind: "template",
    id: "div_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche le plus grand nombre qui divise les deux à la fois.",
    tags: ["divisibilite", "defi", "fraction", "template", "latex"],
    // 09/10/2026 : nue ou en situation (6 tournures) ; la fraction obtenue est écrite empilée, jamais « a/b ».
    generate: () => {
      const p = pick(PRENOMS);
      const g = randomChoice([2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15]);
      let x = randInt(1, 9);
      let y = randInt(2, 11);
      while (y <= x || pgcdDe(x, y) !== 1 || g * y > 120) {
        x = randInt(1, 9);
        y = randInt(2, 11);
      }
      const a = g * x;
      const b = g * y;
      // Le facteur commun tiré doit être LE plus grand : on le recalcule pour de bon.
      const pgcd = pgcdDe(a, b);
      const text = randomChoice([
        `Par quel nombre faut-il diviser en haut et en bas pour simplifier ${frac(a, b)} en une seule étape ? Réponds par un nombre.`,
        `${p.nom} veut simplifier ${frac(a, b)} d’un seul coup, jusqu’à la fraction la plus simple. Par quel nombre divise-t-${il(p)} ?`,
        `Dans un sac de ${b} billes, ${a} sont rouges : la part de billes rouges est ${frac(a, b)}. ${p.nom} la simplifie en une seule étape. Par quel nombre divise-t-${il(p)} ?`,
        `Au basket, ${p.nom} a réussi ${a} tirs sur ${b}, soit ${frac(a, b)}. Par quel nombre faut-il diviser pour simplifier au maximum en une étape ?`,
        `Dans le club ${de(p.nom)}, ${a} membres sur ${b} font du vélo : ${frac(a, b)}. Quel est le plus grand nombre qui divise à la fois ${a} et ${b} ?`,
        `${p.nom} a répondu juste à ${a} questions sur ${b}. Pour simplifier ${frac(a, b)} en une étape, par quel nombre divise-t-on ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(pgcd)],
        comparator: "number_equal",
        explanation: expl(
          `Le plus grand nombre qui divise à la fois ${a} et ${b} est ${pgcd}. ` +
            `On obtient ${a} ÷ ${pgcd} = ${a / pgcd} en haut et ${b} ÷ ${pgcd} = ${b / pgcd} en bas, soit ${frac(a / pgcd, b / pgcd)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le nombre doit diviser le haut ET le bas.",
    tags: ["divisibilite", "defi", "qcm", "template", "latex"],
    // 08/10/2026 : précise et simple (Frédéric)
    // Avant : « Explique par quoi tu peux simplifier… et comment tu le vois » (mot-clé).
    // Désormais un QCM : un seul choix divise les deux nombres ; chaque leurre divise
    // UN des deux seulement (l'erreur d'élève : ne regarder qu'un nombre).
    // 09/10/2026 : tirée au hasard (avant : 4 cas figés) ; chaque leurre divise UN seul des deux
    // nombres, ou aucun ; nue ou en situation (6 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      let a = 0;
      let b = 0;
      let bons: number[] = [];
      let pieges: number[] = [];
      while (!bons.length || pieges.length < 3) {
        const g = randomChoice([2, 3, 5, 7, 9, 11]);
        a = g * randInt(2, 12);
        b = g * randInt(2, 12);
        if (a >= b) continue;
        bons = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((d) => a % d === 0 && b % d === 0);
        // D'abord ceux qui divisent l'un des deux (l'erreur : ne regarder qu'un nombre).
        const unSeul = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((d) => (a % d === 0) !== (b % d === 0));
        const aucun = [3, 4, 5, 6, 7, 8, 9, 11].filter((d) => a % d !== 0 && b % d !== 0);
        pieges = [...shuffle(unSeul), ...shuffle(aucun)].slice(0, 3);
      }
      const par = randomChoice(bons);
      const text = randomChoice([
        `Par lequel de ces nombres peux-tu simplifier ${frac(a, b)} ?`,
        `${p.nom} veut simplifier ${frac(a, b)}. Par lequel de ces nombres peut-${il(p)} diviser en haut et en bas ?`,
        `Au collège ${de(p.nom)}, sur ${b} élèves interrogés, ${a} mangent à la cantine : ${frac(a, b)}. Par quel nombre peut-on simplifier cette fraction ?`,
        `${p.nom} a gagné ${a} parties sur ${b}, soit ${frac(a, b)}. Lequel de ces nombres divise à la fois ${a} et ${b} ?`,
        `Pour simplifier ${frac(a, b)}, ${p.nom} cherche un nombre qui divise le haut ET le bas. Lequel ?`,
        `Un seul de ces nombres permet de simplifier ${frac(a, b)}. ${p.nom} doit le trouver : lequel est-ce ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([par, ...pieges].map(String)),
        expected: [String(par)],
        comparator: "mcq_exact",
        explanation: expl(
          `${a} ÷ ${par} = ${a / par} et ${b} ÷ ${par} = ${b / par} : ${par} divise les deux nombres. ` +
            `On obtient ${frac(a / par, b / par)}. Chaque autre proposition ne divise qu’un des deux nombres, ou aucun.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_defi_tpl_3_groupes",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Les tailles possibles sont des diviseurs du nombre total ; vérifie ensuite les deux conditions.",
    tags: ["divisibilite", "defi", "diviseurs", "short", "template"],
    // 09/10/2026 : combien de tailles de groupes possibles, avec deux conditions (7 situations × 2 tournures).
    generate: () => {
      const p = pick(PRENOMS);
      const n = randomChoice([12, 18, 20, 24, 28, 30, 32, 36, 40, 42, 45, 48, 50, 54, 56, 60, 64, 72, 80, 84, 90, 96]);
      const m1 = randomChoice([2, 2, 3]);
      const m2 = randomChoice([2, 2, 3]);
      const sit = randomChoice([
        { obj: "élèves", gs: "groupes", g: "groupe" },
        { obj: "joueurs", gs: "équipes", g: "équipe" },
        { obj: "biscuits", gs: "sachets", g: "sachet" },
        { obj: "plants de salade", gs: "rangées", g: "rangée" },
        { obj: "photos", gs: "pages", g: "page" },
        { obj: "chaises", gs: "rangées", g: "rangée" },
        { obj: "perles", gs: "colliers", g: "collier" },
      ]);
      const tailles = diviseurs(n).filter((d) => d >= m1 && n / d >= m2);
      const text = randomChoice([
        `${p.nom} veut répartir ${n} ${sit.obj} en ${sit.gs} de même taille, sans reste (au moins ${m1} par ${sit.g}, et au moins ${m2} ${sit.gs}). Combien de tailles de ${sit.g} sont possibles ?`,
        `${p.nom} doit ranger ${n} ${sit.obj} en ${sit.gs} de même taille, sans reste (au moins ${m1} par ${sit.g}, et au moins ${m2} ${sit.gs}). ${Il(p)} compte les tailles de ${sit.g} possibles. Combien en trouve-t-${il(p)} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(tailles.length)],
        comparator: "number_equal",
        explanation: expl(
          `Les diviseurs de ${n} sont ${diviseurs(n).join(", ")}. ` +
            `On garde ceux qui laissent au moins ${m1} par ${sit.g} et au moins ${m2} ${sit.gs} : ${tailles.join(", ")}. Il y en a ${tailles.length}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_defi_tpl_4_chiffre_cache",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Additionne les chiffres connus, puis cherche ce qu’il manque pour tomber dans la table de 9 (ou de 3).",
    tags: ["divisibilite", "defi", "critere", "template"],
    // 09/10/2026 : un chiffre caché « ? » dans un nombre divisible par 9 (réponse unique) ou par 3 (QCM, un seul choix juste).
    generate: () => {
      const p = pick(PRENOMS);
      const par = randomChoice([9, 9, 3]);
      let chiffres: number[] = [];
      let pos = 1;
      let valides: number[] = [];
      while (true) {
        chiffres = [randInt(1, 9), ...Array.from({ length: randInt(2, 3) }, () => randInt(0, 9))];
        pos = randInt(1, chiffres.length - 1);
        const autres = chiffres.reduce((s, c, i) => (i === pos ? s : s + c), 0);
        valides = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((c) => (autres + c) % par === 0);
        if (par === 9 ? valides.length === 1 : valides.length >= 1) break;
      }
      const ecrit = chiffres.map((c, i) => (i === pos ? "?" : String(c))).join("");
      const debut = randomChoice([
        `${p.nom} a effacé un chiffre du nombre ${ecrit}. Ce nombre est divisible par ${par}.`,
        `Le code secret ${de(p.nom)} s’écrit ${ecrit}, et il est divisible par ${par}.`,
        `Dans le nombre ${ecrit}, le « ? » cache un chiffre. ${p.nom} sait que ce nombre est divisible par ${par}.`,
        `Sur le ticket ${de(p.nom)}, une tache cache un chiffre : ${ecrit}. Le numéro est divisible par ${par}.`,
        `${p.nom} pense à un nombre divisible par ${par} qui s’écrit ${ecrit}.`,
      ]);
      if (par === 9) {
        const c = valides[0];
        return {
          text: `${debut} Quel chiffre remplace le « ? » ?`,
          format: "short",
          expected: [String(c)],
          comparator: "number_equal",
          explanation: expl(
            `La somme des chiffres doit être dans la table de 9. Les chiffres connus font ${chiffres.reduce((s, x, i) => (i === pos ? s : s + x), 0)}. ` +
              `Avec ${c}, la somme vaut ${chiffres.reduce((s, x, i) => (i === pos ? s : s + x), 0) + c}, qui est dans la table de 9. C’est le seul chiffre possible.`,
          ),
        };
      }
      const bon = randomChoice(valides);
      const mauvais = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((c) => !valides.includes(c))).slice(0, 3);
      return {
        text: `${debut} Lequel de ces chiffres peut remplacer le « ? » ?`,
        format: "qcm",
        choices: shuffle([bon, ...mauvais].map(String)),
        expected: [String(bon)],
        comparator: "mcq_exact",
        explanation: expl(
          `La somme des chiffres doit être dans la table de 3. Avec ${bon}, la somme vaut ${chiffres.reduce((s, x, i) => (i === pos ? s : s + x), 0) + bon} : c’est le cas. Les autres chiffres proposés ne conviennent pas.`,
        ),
      };
    },
  },
];
