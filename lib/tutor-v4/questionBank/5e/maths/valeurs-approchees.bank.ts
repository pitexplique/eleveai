// VALEURS APPROCHÉES ET ENCADREMENTS (05/11/2026), notion `nombre_approche` de 5e.
//
// Demandé par quatre programmes : Maroc S1-6 (valeurs approchées et encadrement d'un
// quotient), Côte d'Ivoire C1-L2 (par défaut, par excès, troncature, arrondi), Belgique
// 3.1 Sv3 (par défaut, par excès, écriture d'une calculatrice), Québec SNR 7 (troncature).
//   · `approx_encadrer_quotient` reste visible en France : « encadrer des nombres
//     rationnels » est au cycle 4 (BO 2020).
//   · `approx_defaut_exces` et `approx_troncature_arrondi` : ces mots ne sont pas au
//     programme français, masquées `hors_france` dans micros-masquees.ts.
//
// ⛔ Règles du collège : ★1-★2 phrase courte, sans contexte ; contexte à partir de ★3.
// ⚠️ Pour le correcteur : la précision s'écrit « à 0,1 près » ou « au dixième », un
// quotient « 17 ÷ 7 », et le nombre visé vient avant les autres dans l'énoncé.

import type { TutorBankItemV4, NumberLineCanvasData, DifficultyLevel } from "@/lib/tutor-v4/types";

const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
/** Toutes les phrases « début + fin ». */
const croise = (d: string[], f: string[]) => d.flatMap((a) => f.map((b) => `${a} ${b}`));

const fr = (x: number) => String(Math.round(x * 1e6) / 1e6).replace(".", ",");
const fixe = (x: number, k: number) => x.toFixed(k).replace(".", ",");
const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;
function qcm(juste: string, faux: string[]) {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return melange([juste, ...d]);
}
const choix = (juste: string, faux: string[]) => ({ format: "qcm" as const, choices: qcm(juste, faux), expected: [juste], comparator: "mcq_exact" as const });
const ouiNon = (oui: boolean) => ({ format: "qcm" as const, choices: ["Oui", "Non"], expected: [oui ? "Oui" : "Non"], comparator: "mcq_exact" as const });
const deuxSens = (juste: string) => ({ format: "qcm" as const, choices: ["par défaut", "par excès"], expected: [juste], comparator: "mcq_exact" as const });
/** Réponse courte : 3,4 ou 3,40 quand on demande à 0,01 près. */
const court = (x: number, k = 0) => ({ format: "short" as const, expected: [...new Set([fr(x), ...(k > 0 ? [fixe(x, k)] : [])])], comparator: "number_equal" as const });

/* ───────────────────────── le calcul ───────────────────────── */

const PREC = [
  { k: 0, p: "1", nom: "à l’unité" },
  { k: 1, p: "0,1", nom: "au dixième" },
  { k: 2, p: "0,01", nom: "au centième" },
] as const;
type Prec = (typeof PREC)[number];
const prec = () => un(PREC);
const precFine = () => un([PREC[1], PREC[2]]);

const dessous = (x: number, k: number) => Math.floor(x * 10 ** k + 1e-9) / 10 ** k;
const dessus = (x: number, k: number) => (Math.floor(x * 10 ** k + 1e-9) + 1) / 10 ** k;
const arrondi = (x: number, k: number) => Math.floor(x * 10 ** k + 0.5 + 1e-9) / 10 ** k;

/** Un décimal qui a plus de k décimales : ses deux valeurs approchées sont distinctes. */
function decimal(k: number): number {
  const n = k + entre(1, 2);
  let s = "";
  for (let i = 0; i < n - 1; i++) s += entre(0, 9);
  return Number(`${entre(1, 40)}.${s}${entre(1, 9)}`);
}
const pgcd = (a: number, b: number): number => (b ? pgcd(b, a % b) : a);
/** Un quotient au développement décimal illimité. */
function quotient(): { a: number; b: number; x: number } {
  for (;;) {
    const b = un([3, 6, 7, 9, 11, 12, 13, 14, 15]);
    const a = entre(b + 1, 12 * b);
    let r = b / pgcd(a, b);
    while (r % 2 === 0) r /= 2;
    while (r % 5 === 0) r /= 5;
    if (r > 1) return { a, b, x: a / b };
  }
}
/** « 2,42857… » : les n premières décimales, sans arrondir. */
function dev(a: number, b: number, n = 5): string {
  const e = String(Math.floor((a * 10 ** n) / b)).padStart(n + 1, "0");
  return `${e.slice(0, -n)},${e.slice(-n)}…`;
}
function droite(x: number, k: number, label: string): NumberLineCanvasData {
  const c = Math.floor(x * 10 ** k + 1e-9);
  return {
    kind: "number_line",
    min: (c - 1) / 10 ** k,
    max: (c + 2) / 10 ** k,
    step: 1 / 10 ** k,
    points: [{ value: x, label }],
    display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
    size: { width: 360, height: 90 },
  };
}

const SENS = ["par défaut", "par excès"] as const;
type Sens = (typeof SENS)[number];
const valeur = (x: number, k: number, s: Sens) => (s === "par défaut" ? dessous(x, k) : dessus(x, k));

const DEF_DE = "à 0,1 près, la valeur approchée par défaut est le nombre à un chiffre après la virgule juste en dessous ; celle par excès est celui juste au-dessus.";
const DEF_TR = "tronquer, c’est couper les chiffres en trop. Arrondir, c’est prendre la valeur la plus proche : on regarde le chiffre suivant, et s’il vaut 5 ou plus on monte d’un cran.";
const DEF_EN = "encadrer un nombre, c’est donner un nombre plus petit et un nombre plus grand. L’amplitude est l’écart entre les deux.";

const explDE = (nom: string, d: number, e: number, k: number, s: Sens, p: string) =>
  expl(
    DEF_DE,
    `on place ${nom} entre deux nombres consécutifs de pas ${p}, puis on garde celui ${s === "par défaut" ? "du dessous" : "du dessus"}.`,
    `${fixe(d, k)} < ${nom} < ${fixe(e, k)}.`,
    `la valeur approchée ${s} à ${p} près est ${fixe(s === "par défaut" ? d : e, k)}.`,
  );

/* ───────────────────────── situations (★3 et plus) ───────────────────────── */

type Partage = { t: (a: number, b: number) => string; u: string };
const PARTAGES: Partage[] = [
  { t: (a, b) => `Une couturière coupe un ruban de ${a} m en ${b} morceaux égaux.`, u: "m" },
  { t: (a, b) => `Un boulanger répartit ${a} kg de farine dans ${b} sacs égaux.`, u: "kg" },
  { t: (a, b) => `Une infirmière répartit ${a} mL de sirop en ${b} doses égales.`, u: "mL" },
  { t: (a, b) => `Une cycliste parcourt ${a} km en ${b} étapes égales.`, u: "km" },
  { t: (a, b) => `Une addition de ${a} € est partagée entre ${b} amis.`, u: "€" },
  { t: (a, b) => `Un plombier coupe un tuyau de ${a} m en ${b} parts égales.`, u: "m" },
  { t: (a, b) => `Une électricienne coupe ${a} m de câble en ${b} longueurs égales.`, u: "m" },
  { t: (a, b) => `Un apiculteur met ${a} kg de miel dans ${b} seaux identiques.`, u: "kg" },
  { t: (a, b) => `Une chimiste verse ${a} mL de solution dans ${b} tubes identiques.`, u: "mL" },
  { t: (a, b) => `Un maçon répartit ${a} kg de ciment dans ${b} seaux égaux.`, u: "kg" },
  { t: (a, b) => `Une équipe de relais court ${a} km en ${b} parties égales.`, u: "km" },
  { t: (a, b) => `Un pêcheur partage ${a} kg de poisson entre ${b} clients.`, u: "kg" },
];
const QUI = ["une élève", "un ingénieur", "une technicienne", "un comptable", "une pharmacienne", "un architecte", "une géomètre", "un pilote"] as const;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « par défaut » quand on ne doit pas dépasser (maximale), « par excès » quand il en faut assez (minimale). */
const MAXI: ((x: string, p: string, u: string) => string)[] = [
  (x, p, u) => `Un sac peut porter ${x} ${u} au plus. On le charge par paliers de ${p} ${u}. Quelle est la charge maximale ?`,
  (x, p, u) => `Un bidon contient ${x} ${u} au plus. On le remplit par doses de ${p} ${u}. Quel est le contenu maximal ?`,
  (x, p, u) => `Une étagère supporte ${x} ${u} au plus. On pose des charges de ${p} ${u}. Quelle est la charge maximale ?`,
  (x, p, u) => `Un drone emporte ${x} ${u} au plus. Sa charge se règle de ${p} en ${p} ${u}. Quelle est la charge maximale ?`,
  (x, p, u) => `Un ascenseur de chantier monte ${x} ${u} au plus. On charge par blocs de ${p} ${u}. Quelle est la charge maximale ?`,
  (x, p, u) => `Une pirogue transporte ${x} ${u} au plus. On la charge par lots de ${p} ${u}. Quelle est la charge maximale ?`,
];
const MINI: ((x: string, p: string, u: string) => string)[] = [
  (x, p, u) => `Il faut ${x} ${u} de sable pour un mur. Le sable se vend par ${p} ${u}. Quelle est la quantité minimale à acheter ?`,
  (x, p, u) => `Une recette demande ${x} ${u} de sucre. Le sucre se pèse par ${p} ${u}. Quelle est la quantité minimale à prendre ?`,
  (x, p, u) => `Un potager demande ${x} ${u} de terreau. Le terreau se vend par ${p} ${u}. Quelle est la quantité minimale à acheter ?`,
  (x, p, u) => `Un four demande ${x} ${u} d’argile. L’argile se vend par ${p} ${u}. Quelle est la quantité minimale à acheter ?`,
  (x, p, u) => `Un soudeur a besoin de ${x} ${u} de métal. Le métal se vend par ${p} ${u}. Quelle est la quantité minimale à acheter ?`,
  (x, p, u) => `Une boulangère utilise ${x} ${u} de farine. La farine se pèse par ${p} ${u}. Quelle est la quantité minimale à prendre ?`,
];
const FACTURES = ["Une addition", "Une facture", "Un cadeau commun", "Une location de salle", "Une course en taxi", "Une sortie au musée", "Une commande de livres", "Un repas d’équipe"] as const;

type Chrono = { t: (x: string, nom: string) => string; op: "tronque" | "arrondit"; };
const MESURES: Chrono[] = [
  { op: "tronque", t: (x, nom) => `Un chronomètre mesure ${x} s et coupe les chiffres en trop ${nom}. Qu’affiche-t-il ?` },
  { op: "tronque", t: (x, nom) => `Un compteur de vélo mesure ${x} km et coupe les chiffres en trop ${nom}. Qu’affiche-t-il ?` },
  { op: "tronque", t: (x, nom) => `Une balance mesure ${x} kg et coupe les chiffres en trop ${nom}. Qu’affiche-t-elle ?` },
  { op: "tronque", t: (x, nom) => `Un capteur de pluie mesure ${x} mm et coupe les chiffres en trop ${nom}. Qu’affiche-t-il ?` },
  { op: "tronque", t: (x, nom) => `Un thermomètre mesure ${x} °C et coupe les chiffres en trop ${nom}. Qu’affiche-t-il ?` },
  { op: "arrondit", t: (x, nom) => `Une pharmacienne pèse ${x} g et note la valeur la plus proche ${nom}. Que note-t-elle ?` },
  { op: "arrondit", t: (x, nom) => `Une géomètre mesure ${x} m et note la valeur la plus proche ${nom}. Que note-t-elle ?` },
  { op: "arrondit", t: (x, nom) => `Un médecin mesure ${x} kg et note la valeur la plus proche ${nom}. Que note-t-il ?` },
  { op: "arrondit", t: (x, nom) => `Une astronome calcule ${x} années et note la valeur la plus proche ${nom}. Que note-t-elle ?` },
  { op: "arrondit", t: (x, nom) => `Un menuisier mesure ${x} m et note la valeur la plus proche ${nom}. Que note-t-il ?` },
];

/* ───────────────────────── gabarits ───────────────────────── */

type Micro = "approx_defaut_exces" | "approx_troncature_arrondi" | "approx_encadrer_quotient";
const tpl = (micro: Micro, n: number, difficulty: DifficultyLevel, hint: string, generate: () => any): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `${micro}_tpl_${n}`,
    niveau: "5e",
    matiere: "maths",
    notionId: "nombre_approche",
    microId: micro,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["valeur approchée", micro, "template"],
    generate,
  }) as TutorBankItemV4;

const H_DE = "Par défaut : le nombre juste en dessous. Par excès : le nombre juste au-dessus.";
const DEBUTS = (x: string) => [`Nombre : ${x}.`, `Voici ${x}.`, `Prends ${x}.`, `On part de ${x}.`, `Regarde ${x}.`];

const defautExces: TutorBankItemV4[] = [
  // ★1 : la valeur demandée, droite graduée à l'appui.
  tpl("approx_defaut_exces", 1, 1, H_DE, () => {
    const { k, p } = prec();
    const x = decimal(k);
    const s = un(SENS);
    const text = un(croise(DEBUTS(fr(x)), [`Donne sa valeur approchée ${s} à ${p} près.`, `Écris sa valeur approchée ${s} à ${p} près.`, `Quelle est sa valeur approchée ${s} à ${p} près ?`, `Cherche sa valeur approchée ${s} à ${p} près.`]));
    return { text, ...court(valeur(x, k, s), k), canvas: droite(x, k, fr(x)), explanation: explDE(fr(x), dessous(x, k), dessus(x, k), k, s, p) };
  }),
  // ★1 : l'encadrement est donné, on choisit.
  tpl("approx_defaut_exces", 2, 1, H_DE, () => {
    const { k, p } = prec();
    const x = decimal(k);
    const s = un(SENS);
    const [d, e] = [dessous(x, k), dessus(x, k)];
    const text = un(croise([`Tu sais que ${fixe(d, k)} < ${fr(x)} < ${fixe(e, k)}.`, `On a ${fixe(d, k)} < ${fr(x)} < ${fixe(e, k)}.`, `Voici ${fixe(d, k)} < ${fr(x)} < ${fixe(e, k)}.`, `Lis ${fixe(d, k)} < ${fr(x)} < ${fixe(e, k)}.`], [`Quelle est la valeur ${s} à ${p} près ?`, `Quelle valeur est ${s} à ${p} près ?`, `Choisis la valeur ${s} à ${p} près.`, `Trouve la valeur ${s} à ${p} près.`]));
    const juste = fixe(valeur(x, k, s), k);
    return { text, ...choix(juste, [fixe(d, k), fixe(e, k), fr(x), fixe(e + 10 ** -k, k)]), explanation: explDE(fr(x), d, e, k, s, p) };
  }),
  // ★1 : reconnaître le sens.
  tpl("approx_defaut_exces", 3, 1, "Plus petit que le nombre : par défaut. Plus grand : par excès.", () => {
    const { k } = prec();
    const x = decimal(k);
    const s = un(SENS);
    const v = fixe(valeur(x, k, s), k);
    const text = un(croise([`${v} approche ${fr(x)}.`, `${v} remplace ${fr(x)}.`, `On prend ${v} pour ${fr(x)}.`, `${v} est une valeur approchée de ${fr(x)}.`], ["Par défaut ou par excès ?", "Est-ce par défaut ou par excès ?", "Choisis : par défaut ou par excès.", "Dans quel sens : par défaut ou par excès ?", "Quel est le sens : par défaut ou par excès ?"]));
    return { text, ...deuxSens(s), explanation: expl(DEF_DE, "on compare la valeur approchée au nombre.", `${v} ${s === "par défaut" ? "<" : ">"} ${fr(x)}.`, `c’est une valeur approchée ${s}.`) };
  }),
  // ★1 : retrouver la précision.
  tpl("approx_defaut_exces", 4, 1, "Regarde combien de chiffres après la virgule garde la valeur approchée.", () => {
    const { k, p } = un([PREC[1], PREC[2]]);
    const x = Number(`${entre(1, 30)}.${entre(1, 8)}${entre(1, 8)}${entre(1, 8)}`); // ni 0 ni 9 : une seule précision convient
    const s = un(SENS);
    const v = fixe(valeur(x, k, s), k);
    const text = un(croise([`${v} est la valeur ${s} de ${fr(x)}.`, `${v} approche ${s} le nombre ${fr(x)}.`], ["À quelle précision ?", "Quelle est la précision ?", "Avec quelle précision ?", "Choisis la précision.", "Trouve la précision.", "Donne la précision."]));
    return { text, ...choix(`à ${p} près`, ["à 1 près", "à 0,1 près", "à 0,01 près", "à 0,001 près"]), explanation: expl(DEF_DE, "on compte les chiffres gardés après la virgule.", `${v} garde ${k} chiffre${k > 1 ? "s" : ""} après la virgule.`, `la précision est ${p}.`) };
  }),

  // ★2 : un quotient dont on donne le début.
  tpl("approx_defaut_exces", 5, 2, H_DE, () => {
    const { a, b, x } = quotient();
    const { k, p } = prec();
    const s = un(SENS);
    const text = un(croise([`${a} ÷ ${b} = ${dev(a, b)}`, `Tu lis ${a} ÷ ${b} = ${dev(a, b)}`, `On a ${a} ÷ ${b} = ${dev(a, b)}`], [`Valeur approchée ${s} à ${p} près ?`, `Donne sa valeur ${s} à ${p} près.`, `Écris sa valeur ${s} à ${p} près.`, `Que vaut-il ${s} à ${p} près ?`, `Quelle est sa valeur ${s} à ${p} près ?`]));
    return { text, ...court(valeur(x, k, s), k), explanation: explDE(`${a} ÷ ${b}`, dessous(x, k), dessus(x, k), k, s, p) };
  }),
  // ★2 : les deux valeurs d'un coup.
  tpl("approx_defaut_exces", 6, 2, "Les deux valeurs se suivent : leur écart est la précision.", () => {
    const { k, p } = prec();
    const q = Math.random() < 0.5 ? quotient() : null;
    const x = q ? q.x : decimal(k);
    const nom = q ? `${q.a} ÷ ${q.b}` : fr(x);
    const [d, e] = [dessous(x, k), dessus(x, k)];
    const pasK = 10 ** -k;
    const text = un([`Donne les valeurs approchées de ${nom} à ${p} près, par défaut puis par excès.`, `Quelles sont les valeurs de ${nom} à ${p} près, par défaut puis par excès ?`, `Pour ${nom}, à ${p} près : valeur par défaut, puis par excès ?`, `${nom}, à ${p} près. Quelles valeurs par défaut, puis par excès ?`, `Choisis les valeurs de ${nom} à ${p} près : par défaut, puis par excès.`, `Approche ${nom} à ${p} près : par défaut, puis par excès.`, `Trouve les valeurs de ${nom} à ${p} près : par défaut, puis par excès.`, `Écris ${nom} à ${p} près : par défaut, puis par excès.`]);
    const f = (u: number, v: number) => `${fixe(u, k)} et ${fixe(v, k)}`;
    return { text, ...choix(f(d, e), [f(e, d), f(d - pasK, d), f(e, e + pasK), f(d - pasK, e + pasK)]), explanation: explDE(nom, d, e, k, "par défaut", p) };
  }),
  // ★2 : poser la division soi-même.
  tpl("approx_defaut_exces", 7, 2, "Pose la division, puis garde les chiffres demandés.", () => {
    const b = un([3, 6, 7, 9]);
    const { a, x } = (() => { for (;;) { const a = entre(b + 1, 9 * b); if (a % b && (b === 7 || a % 3)) return { a, x: a / b }; } })();
    const { k, p } = un([PREC[0], PREC[1]]);
    const s = un(SENS);
    const text = un(croise([`Calcule ${a} ÷ ${b}.`, `Pose ${a} ÷ ${b}.`, `Effectue ${a} ÷ ${b}.`], [`Donne le résultat ${s} à ${p} près.`, `Écris le quotient ${s} à ${p} près.`, `Quelle est sa valeur ${s} à ${p} près ?`, `Quelle valeur ${s} à ${p} près ?`, `Que vaut-il ${s} à ${p} près ?`]));
    return { text, ...court(valeur(x, k, s), k), explanation: explDE(`${a} ÷ ${b}`, dessous(x, k), dessus(x, k), k, s, p) };
  }),
  // ★2 : des nombres célèbres.
  tpl("approx_defaut_exces", 8, 2, H_DE, () => {
    const [nom, v] = un([["π", "3,14159…"], ["√2", "1,41421…"], ["√3", "1,73205…"], ["√5", "2,23606…"], ["√7", "2,64575…"]] as const);
    const x = Number(v.replace("…", "").replace(",", "."));
    const { k, p } = prec();
    const s = un(SENS);
    const text = un(croise([`${nom} = ${v}`, `On sait que ${nom} = ${v}`, `Ici, ${nom} = ${v}`], [`Donne sa valeur ${s} à ${p} près.`, `Écris sa valeur ${s} à ${p} près.`, `Quelle est sa valeur ${s} à ${p} près ?`, `Que vaut-il ${s} à ${p} près ?`]));
    return { text, ...court(valeur(x, k, s), k), explanation: explDE(nom, dessous(x, k), dessus(x, k), k, s, p) };
  }),

  // ★3 : un partage.
  tpl("approx_defaut_exces", 9, 3, H_DE, () => {
    const C = un(PARTAGES);
    const { a, b, x } = quotient();
    const { k, p } = un([PREC[1], PREC[2]]);
    const s = un(SENS);
    const text = `${C.t(a, b)} ${un([`Donne une part ${s} à ${p} ${C.u} près.`, `Quelle est une part ${s}, à ${p} ${C.u} près ?`, `Calcule une part, ${s} à ${p} ${C.u} près.`])}`;
    return { text, ...court(valeur(x, k, s), k), explanation: explDE(`${a} ÷ ${b}`, dessous(x, k), dessus(x, k), k, s, p) };
  }),
  // ★3 : ne pas dépasser, ou en avoir assez.
  tpl("approx_defaut_exces", 10, 3, "Sans dépasser : par défaut. Pour en avoir assez : par excès.", () => {
    const { k, p } = prec();
    const x = decimal(k);
    const maxi = Math.random() < 0.5;
    const u = un(["kg", "kg", "t"]);
    const text = un(maxi ? MAXI : MINI)(fr(x), p, u);
    const s: Sens = maxi ? "par défaut" : "par excès";
    return { text, ...court(valeur(x, k, s), k), explanation: expl(DEF_DE, maxi ? "on ne doit pas dépasser : on prend la valeur par défaut." : "il en faut assez : on prend la valeur par excès.", `${fixe(dessous(x, k), k)} < ${fr(x)} < ${fixe(dessus(x, k), k)}.`, `la réponse est ${fixe(valeur(x, k, s), k)} ${u}.`) };
  }),
  // ★3 : l'affichage d'une calculatrice.
  tpl("approx_defaut_exces", 11, 3, "Lis les chiffres affichés, puis garde ceux qu’on demande.", () => {
    const { a, b, x } = quotient();
    const { k, p } = prec();
    const s = un(SENS);
    const aff = dev(a, b, 7).replace("…", "");
    const text = `${cap(un(QUI))} tape ${a} ÷ ${b}. La calculatrice affiche ${aff}. ${un([`Écris cette valeur ${s} à ${p} près.`, `Quelle est sa valeur ${s} à ${p} près ?`, `Donne ce quotient ${s} à ${p} près.`])}`;
    return { text, ...court(valeur(x, k, s), k), explanation: explDE(`${a} ÷ ${b}`, dessous(x, k), dessus(x, k), k, s, p) };
  }),
  // ★3 : de l'une à l'autre.
  tpl("approx_defaut_exces", 12, 3, "L’écart entre les deux valeurs est égal à la précision.", () => {
    const { k, p } = prec();
    const s = un(SENS);
    const c = entre(2, 300);
    const v = c / 10 ** k;
    const autre: Sens = s === "par défaut" ? "par excès" : "par défaut";
    const juste = s === "par défaut" ? (c + 1) / 10 ** k : (c - 1) / 10 ** k;
    const text = un(croise([`La valeur ${s} d’un nombre, à ${p} près, est ${fixe(v, k)}.`, `À ${p} près, un nombre vaut ${fixe(v, k)} ${s}.`, `Un nombre a pour valeur ${s} ${fixe(v, k)}, à ${p} près.`], [`Quelle est sa valeur ${autre} ?`, `Donne sa valeur ${autre}.`, `Que vaut-il ${autre} ?`, `Trouve sa valeur ${autre}.`]));
    return { text, ...court(juste, k), explanation: expl(DEF_DE, `les deux valeurs se suivent : on ${s === "par défaut" ? "ajoute" : "retire"} ${p}.`, `${fixe(v, k)} ${s === "par défaut" ? "+" : "−"} ${p} = ${fixe(juste, k)}.`, `la valeur ${autre} est ${fixe(juste, k)}.`) };
  }),

  // ★4 : quel nombre peut-il être ?
  tpl("approx_defaut_exces", 13, 4, "Le nombre est strictement entre ses deux valeurs approchées.", () => {
    const { k, p } = un([PREC[1], PREC[2]]);
    const c = entre(10, 400);
    const [d, e] = [c / 10 ** k, (c + 1) / 10 ** k];
    const pct = (v: number, t: number) => fr(v + t / 10 ** (k + 1));
    const juste = pct(d, entre(1, 9));
    const faux = [pct(d - 10 ** -k, entre(1, 9)), pct(e, entre(1, 9)), pct(e + 10 ** -k, entre(1, 9)), pct(d - 2 * 10 ** -k, entre(1, 9))];
    const text = un([
      `Un nombre vaut ${fixe(d, k)} par défaut et ${fixe(e, k)} par excès, à ${p} près. Lequel peut-il être ?`,
      `À ${p} près, un nombre a pour valeurs ${fixe(d, k)} par défaut et ${fixe(e, k)} par excès. Quel nombre convient ?`,
      `Parmi ces nombres, lequel vaut ${fixe(d, k)} par défaut et ${fixe(e, k)} par excès, à ${p} près ?`,
      `Quel nombre a pour valeurs ${fixe(d, k)} par défaut et ${fixe(e, k)} par excès, à ${p} près ?`,
      `Cherche le nombre : ${fixe(d, k)} par défaut et ${fixe(e, k)} par excès, à ${p} près.`,
      `Une mesure vaut ${fixe(d, k)} par défaut et ${fixe(e, k)} par excès, à ${p} près. Laquelle peut-elle être ?`,
      `Un capteur donne ${fixe(d, k)} par défaut et ${fixe(e, k)} par excès, à ${p} près. Quelle mesure convient ?`,
      `Une élève trouve ${fixe(d, k)} par défaut et ${fixe(e, k)} par excès, à ${p} près. Quel nombre a-t-elle cherché ?`,
    ]);
    return { text, ...choix(juste, faux), explanation: expl(DEF_DE, "le nombre cherché est compris entre ses deux valeurs approchées.", `${fixe(d, k)} < ${juste} < ${fixe(e, k)}.`, `le nombre qui convient est ${juste}.`) };
  }),
  // ★4 : trop-perçu d'un partage au centime.
  tpl("approx_defaut_exces", 14, 4, "Part par excès × nombre de personnes, puis on retire le total.", () => {
    for (;;) {
      const F = un(FACTURES);
      const n = entre(3, 9);
      const cents = entre(1200, 9999);
      if (cents % n === 0) continue;
      const part = Math.ceil(cents / n);
      const trop = part * n - cents;
      const [S, P, R] = [fixe(cents / 100, 2), fixe(part / 100, 2), fixe(trop / 100, 2)];
      const text = un([
        `${F} coûte ${S} €, partagés entre ${n} personnes. Chacune paie sa part par excès, à 0,01 € près. Combien d’euros y a-t-il en trop ?`,
        `${F} de ${S} € est payé par ${n} personnes. Chacune donne sa part par excès, à 0,01 € près. Quel est le surplus en euros ?`.replace(/^(Une .+?) est payé/, "$1 est payée"),
        `${F} coûte ${S} € pour ${n} personnes. Chacune arrondit sa part par excès, à 0,01 € près. Quelle somme reste en trop, en euros ?`,
      ]);
      return { text, ...court(trop / 100, 2), explanation: expl(DEF_DE, "on calcule la part par excès, on multiplie par le nombre de personnes, puis on enlève le total.", `${S} ÷ ${n} ≈ ${P} par excès ; ${P} × ${n} = ${fixe((part * n) / 100, 2)} ; ${fixe((part * n) / 100, 2)} − ${S} = ${R}.`, `il y a ${R} € en trop.`) };
    }
  }),
  // ★4 : deux quotients, même valeur ?
  tpl("approx_defaut_exces", 15, 4, "Calcule les deux valeurs par défaut, puis compare-les.", () => {
    const u = quotient();
    let v = quotient();
    const { k, p } = un([PREC[0], PREC[1]]);
    const veutEgal = Math.random() < 0.5;
    for (let i = 0; i < 400 && (dessous(u.x, k) === dessous(v.x, k)) !== veutEgal || u.x === v.x; i++) v = quotient();
    const egal = dessous(u.x, k) === dessous(v.x, k);
    const n1 = `${u.a} ÷ ${u.b}`;
    const n2 = `${v.a} ÷ ${v.b}`;
    const text = un([
      `${n1} et ${n2} ont-ils la même valeur par défaut à ${p} près ?`,
      `À ${p} près par défaut, ${n1} et ${n2} donnent-ils la même valeur ?`,
      `Par défaut à ${p} près, ${n1} et ${n2} valent-ils la même chose ?`,
      `Regarde ${n1} et ${n2}. Ont-ils la même valeur par défaut à ${p} près ?`,
      `Compare ${n1} et ${n2} par défaut à ${p} près. Trouve-t-on la même valeur ?`,
      `Calcule ${n1} et ${n2} par défaut à ${p} près. Les valeurs sont-elles égales ?`,
      `Une élève compare ${n1} et ${n2} par défaut à ${p} près. Trouve-t-elle la même valeur ?`,
      `Un tableur donne ${n1} et ${n2} par défaut à ${p} près. Affiche-t-il la même valeur ?`,
      `Un comptable note ${n1} et ${n2} par défaut à ${p} près. Écrit-il deux fois le même nombre ?`,
      `Une technicienne note ${n1} et ${n2} par défaut à ${p} près. Écrit-elle deux fois le même nombre ?`,
    ]);
    return { text, ...ouiNon(egal), explanation: expl(DEF_DE, "on calcule les deux valeurs par défaut, puis on les compare.", `${n1} donne ${fixe(dessous(u.x, k), k)} et ${n2} donne ${fixe(dessous(v.x, k), k)}.`, `${egal ? "oui, ce sont les mêmes" : "non, elles sont différentes"}.`) };
  }),
  // ★4 : passer à une précision moins fine.
  tpl("approx_defaut_exces", 16, 4, "Une valeur par défaut garde le début du nombre.", () => {
    const fin = un([PREC[1], PREC[2]]);
    const gros = PREC[fin.k - 1];
    const c = 10 * entre(10, 299) + entre(1, 9);
    const v = c / 10 ** fin.k;
    const juste = Math.floor(c / 10) / 10 ** gros.k;
    const text = un([
      `À ${fin.p} près, un nombre vaut ${fixe(v, fin.k)} par défaut. Combien vaut-il par défaut à ${gros.p} près ?`,
      `La valeur par défaut d’un nombre à ${fin.p} près est ${fixe(v, fin.k)}. Quelle est sa valeur par défaut à ${gros.p} près ?`,
      `Un nombre a pour valeur par défaut ${fixe(v, fin.k)} à ${fin.p} près. Déduis sa valeur par défaut à ${gros.p} près.`,
      `Une mesure vaut ${fixe(v, fin.k)} par défaut, à ${fin.p} près. Que vaut-elle par défaut, à ${gros.p} près ?`,
      `Un calcul donne ${fixe(v, fin.k)} par défaut, à ${fin.p} près. Que donne-t-il par défaut, à ${gros.p} près ?`,
      `Par défaut à ${fin.p} près, on lit ${fixe(v, fin.k)}. Que lit-on par défaut à ${gros.p} près ?`,
      `Un capteur affiche ${fixe(v, fin.k)} par défaut, à ${fin.p} près. Qu’afficherait-il par défaut, à ${gros.p} près ?`,
      `Une élève trouve ${fixe(v, fin.k)} par défaut, à ${fin.p} près. Que trouve-t-elle par défaut, à ${gros.p} près ?`,
      `Un tableur donne ${fixe(v, fin.k)} par défaut, à ${fin.p} près. Que donne-t-il par défaut, à ${gros.p} près ?`,
      `Une balance indique ${fixe(v, fin.k)} par défaut, à ${fin.p} près. Qu’indiquerait-elle par défaut, à ${gros.p} près ?`,
    ]);
    return { text, ...court(juste, gros.k), explanation: expl(DEF_DE, "la valeur par défaut garde le début du nombre : on enlève un chiffre.", `${fixe(v, fin.k)} donne ${fixe(juste, gros.k)}.`, `la valeur par défaut à ${gros.p} près est ${fixe(juste, gros.k)}.`) };
  }),
];

/* ===== TRONCATURE ET ARRONDI ===== */

const OP = [
  { op: "tronque", val: (x: number, k: number) => dessous(x, k), mot: "troncature" },
  { op: "arrondit", val: (x: number, k: number) => arrondi(x, k), mot: "arrondi" },
] as const;
const explTR = (nom: string, x: number, k: number, p: Prec, op: "tronque" | "arrondit") => {
  const v = op === "tronque" ? dessous(x, k) : arrondi(x, k);
  return expl(
    DEF_TR,
    op === "tronque" ? "on coupe les chiffres après le rang demandé." : "on regarde le chiffre juste après le rang demandé.",
    `${nom} ${p.nom} : ${op === "tronque" ? "troncature" : "arrondi"} ${fixe(v, k)}.`,
    `la réponse est ${fixe(v, k)}.`,
  );
};
const dtr = (mot: "troncature" | "arrondi") => (mot === "arrondi" ? "l’arrondi" : "la troncature");
const stIn = (mot: "troncature" | "arrondi", x: string, nom: string) =>
  mot === "arrondi"
    ? [`Arrondis ${x} ${nom}.`, `Donne l’arrondi de ${x} ${nom}.`, `Quel est l’arrondi de ${x} ${nom} ?`, `Écris l’arrondi de ${x} ${nom}.`, `Cherche l’arrondi de ${x} ${nom}.`, `${x} : donne son arrondi ${nom}.`, `Trouve l’arrondi ${nom} de ${x}.`, `L’arrondi ${nom} de ${x} vaut combien ?`]
    : [`Tronque ${x} ${nom}.`, `Donne la troncature de ${x} ${nom}.`, `Quelle est la troncature de ${x} ${nom} ?`, `Écris la troncature de ${x} ${nom}.`, `Cherche la troncature de ${x} ${nom}.`, `${x} : donne sa troncature ${nom}.`, `Trouve la troncature ${nom} de ${x}.`, `La troncature ${nom} de ${x} vaut combien ?`];
const H_TR = "Tronquer : couper. Arrondir : regarder le chiffre suivant, 5 ou plus fait monter.";

/** Un décimal dont la troncature et l'arrondi au rang k diffèrent (ou non). */
function decimalChiffre(k: number, monte: boolean): number {
  const ent = entre(1, 40);
  let s = "";
  for (let i = 0; i < k; i++) s += entre(0, 9);
  s += monte ? entre(5, 9) : entre(0, 4);
  s += entre(1, 9);
  return Number(`${ent}.${s}`);
}

const troncatureArrondi: TutorBankItemV4[] = [
  // ★1 : tronquer, puis arrondir.
  tpl("approx_troncature_arrondi", 1, 1, "Tronquer, c’est couper les chiffres en trop.", () => {
    const P = prec();
    const x = decimalChiffre(P.k, Math.random() < 0.5);
    return { text: un(stIn("troncature", fr(x), P.nom)), ...court(dessous(x, P.k), P.k), explanation: explTR(fr(x), x, P.k, P, "tronque") };
  }),
  tpl("approx_troncature_arrondi", 2, 1, "Regarde le chiffre suivant : 5 ou plus fait monter.", () => {
    const P = prec();
    const x = decimalChiffre(P.k, Math.random() < 0.5);
    return { text: un(stIn("arrondi", fr(x), P.nom)), ...court(arrondi(x, P.k), P.k), explanation: explTR(fr(x), x, P.k, P, "arrondit") };
  }),
  // ★1 : QCM sur le geste.
  tpl("approx_troncature_arrondi", 3, 1, H_TR, () => {
    const P = prec();
    const x = decimalChiffre(P.k, true);
    const O = un(OP);
    const juste = fixe(O.val(x, P.k), P.k);
    const text = un([`${fr(x)} : quel${O.mot === "arrondi" ? "" : "le"} est ${O.mot === "arrondi" ? "son arrondi" : "sa troncature"} ${P.nom} ?`, `Choisis ${dtr(O.mot)} de ${fr(x)} ${P.nom}.`, `Parmi ces nombres, trouve ${dtr(O.mot)} de ${fr(x)} ${P.nom}.`, `Quel nombre est ${dtr(O.mot)} de ${fr(x)} ${P.nom} ?`, `Lequel est ${dtr(O.mot)} de ${fr(x)} ${P.nom} ?`, `Repère ${dtr(O.mot)} de ${fr(x)} ${P.nom}.`, `Vise ${dtr(O.mot)} de ${fr(x)} ${P.nom}.`, `Montre ${dtr(O.mot)} de ${fr(x)} ${P.nom}.`]);
    return { text, ...choix(juste, [fixe(dessous(x, P.k), P.k), fixe(dessus(x, P.k), P.k), fr(x), fixe(dessous(x, P.k) - 10 ** -P.k, P.k)]), explanation: explTR(fr(x), x, P.k, P, O.op) };
  }),
  // ★1 : le chiffre qui décide.
  tpl("approx_troncature_arrondi", 4, 1, "C’est le chiffre juste après le rang demandé.", () => {
    const P = un([PREC[0], PREC[1], PREC[2]]);
    const ent = entre(1, 40);
    const chiffres = Array.from({ length: P.k + 2 }, () => entre(1, 9));
    const x = Number(`${ent}.${chiffres.join("")}`);
    const c = chiffres[P.k];
    const text = un([`Pour arrondir ${fr(x)} ${P.nom}, quel chiffre regarde-t-on ?`, `Quel chiffre décide de l’arrondi de ${fr(x)} ${P.nom} ?`, `Arrondir ${fr(x)} ${P.nom} : quel chiffre faut-il lire ?`, `On arrondit ${fr(x)} ${P.nom}. Quel chiffre lit-on ?`, `Quel chiffre regarder pour arrondir ${fr(x)} ${P.nom} ?`, `Pour l’arrondi de ${fr(x)} ${P.nom}, quel chiffre compte ?`, `${fr(x)}, arrondi ${P.nom} : quel chiffre décide ?`, `On veut arrondir ${fr(x)} ${P.nom}. Quel chiffre compte ?`]);
    return { text, format: "short" as const, expected: [String(c)], comparator: "number_equal" as const, explanation: expl(DEF_TR, "on lit le chiffre juste après le rang demandé.", `dans ${fr(x)}, ce chiffre est ${c}.`, `on regarde le chiffre ${c}.`) };
  }),

  // ★2 : un quotient dont on donne le début.
  tpl("approx_troncature_arrondi", 5, 2, H_TR, () => {
    const { a, b, x } = quotient();
    const P = prec();
    const O = un(OP);
    const text = un(croise([`${a} ÷ ${b} = ${dev(a, b)}`, `Tu lis ${a} ÷ ${b} = ${dev(a, b)}`, `On a ${a} ÷ ${b} = ${dev(a, b)}`], [`Donne ${dtr(O.mot)} ${P.nom}.`, `Écris ${dtr(O.mot)} ${P.nom}.`, `Quel${O.mot === "arrondi" ? "" : "le"} est ${dtr(O.mot)} ${P.nom} ?`, `Cherche ${dtr(O.mot)} ${P.nom}.`]));
    return { text, ...court(O.val(x, P.k), P.k), explanation: explTR(`${a} ÷ ${b}`, x, P.k, P, O.op) };
  }),
  // ★2 : même résultat ?
  tpl("approx_troncature_arrondi", 6, 2, "Si le chiffre suivant vaut moins de 5, c’est le même nombre.", () => {
    const P = prec();
    const monte = Math.random() < 0.5;
    const x = decimalChiffre(P.k, monte);
    const text = un(croise([`Prends ${fr(x)} ${P.nom}.`, `Regarde ${fr(x)} ${P.nom}.`, `Pour ${fr(x)} ${P.nom} :`], ["Troncature et arrondi sont-ils égaux ?", "Troncature et arrondi donnent-ils le même nombre ?", "La troncature et l’arrondi sont-ils pareils ?", "Trouve-t-on le même nombre en tronquant et en arrondissant ?", "Tronquer et arrondir donnent-ils le même nombre ?"]));
    return { text, ...ouiNon(!monte), explanation: expl(DEF_TR, "on calcule les deux, puis on compare.", `troncature ${fixe(dessous(x, P.k), P.k)}, arrondi ${fixe(arrondi(x, P.k), P.k)}.`, monte ? "non, les deux sont différents." : "oui, c’est le même nombre.") };
  }),
  // ★2 : l'arrondi est par défaut ou par excès.
  tpl("approx_troncature_arrondi", 7, 2, "Si l’arrondi est plus petit que le nombre, il est par défaut.", () => {
    const P = prec();
    const monte = Math.random() < 0.5;
    const x = decimalChiffre(P.k, monte);
    const text = un(croise([`L’arrondi de ${fr(x)} ${P.nom} est ${fixe(arrondi(x, P.k), P.k)}.`, `${fr(x)} s’arrondit à ${fixe(arrondi(x, P.k), P.k)} ${P.nom}.`, `On arrondit ${fr(x)} à ${fixe(arrondi(x, P.k), P.k)}, ${P.nom}.`], ["Par défaut ou par excès ?", "Est-ce par défaut ou par excès ?", "Il est par défaut ou par excès ?", "Choisis : par défaut ou par excès."]));
    return { text, ...deuxSens(monte ? "par excès" : "par défaut"), explanation: expl(DEF_TR, "on compare l’arrondi au nombre de départ.", `${fixe(arrondi(x, P.k), P.k)} ${monte ? ">" : "<"} ${fr(x)}.`, `l’arrondi est ${monte ? "par excès" : "par défaut"}.`) };
  }),
  // ★2 : poser la division.
  tpl("approx_troncature_arrondi", 8, 2, "Pose la division jusqu’au chiffre suivant le rang demandé.", () => {
    const b = un([3, 6, 7, 9]);
    const { a, x } = (() => { for (;;) { const a = entre(b + 1, 9 * b); if (a % b && (b === 7 || a % 3)) return { a, x: a / b }; } })();
    const P = un([PREC[0], PREC[1]]);
    const O = un(OP);
    const text = un(croise([`Calcule ${a} ÷ ${b}.`, `Pose ${a} ÷ ${b}.`, `Effectue ${a} ÷ ${b}.`], [`Donne ${dtr(O.mot)} ${P.nom}.`, `Écris ${dtr(O.mot)} ${P.nom}.`, `Quel${O.mot === "arrondi" ? "" : "le"} est ${dtr(O.mot)} ${P.nom} ?`, `Cherche ${dtr(O.mot)} ${P.nom}.`]));
    return { text, ...court(O.val(x, P.k), P.k), explanation: explTR(`${a} ÷ ${b}`, x, P.k, P, O.op) };
  }),

  // ★3 : un appareil coupe ou arrondit.
  tpl("approx_troncature_arrondi", 9, 3, "Couper : troncature. Valeur la plus proche : arrondi.", () => {
    const C = un(MESURES);
    const P = un([PREC[0], PREC[1], PREC[2]]);
    const x = decimalChiffre(P.k, Math.random() < 0.6);
    const v = C.op === "tronque" ? dessous(x, P.k) : arrondi(x, P.k);
    return { text: C.t(fr(x), P.nom), ...court(v, P.k), explanation: explTR(fr(x), x, P.k, P, C.op) };
  }),
  // ★3 : la calculatrice.
  tpl("approx_troncature_arrondi", 10, 3, H_TR, () => {
    const { a, b, x } = quotient();
    const P = prec();
    const O = un(OP);
    const aff = dev(a, b, 7).replace("…", "");
    const text = `${cap(un(QUI))} tape ${a} ÷ ${b}. La calculatrice affiche ${aff}. ${un([`Donne ${dtr(O.mot)} ${P.nom}.`, `Écris ${dtr(O.mot)} de ce quotient ${P.nom}.`, `Quel${O.mot === "arrondi" ? "" : "le"} est ${dtr(O.mot)} ${P.nom} ?`])}`;
    return { text, ...court(O.val(x, P.k), P.k), explanation: explTR(`${a} ÷ ${b}`, x, P.k, P, O.op) };
  }),
  // ★3 : un partage.
  tpl("approx_troncature_arrondi", 11, 3, H_TR, () => {
    const C = un(PARTAGES);
    const { a, b, x } = quotient();
    const P = un([PREC[1], PREC[2]]);
    const O = un(OP);
    const text = `${C.t(a, b)} ${un([`Donne ${dtr(O.mot)} d’une part ${P.nom}.`, `Quel${O.mot === "arrondi" ? "" : "le"} est ${dtr(O.mot)} d’une part ${P.nom} ?`, `Calcule une part, puis ${dtr(O.mot)} ${P.nom}.`])}`;
    return { text, ...court(O.val(x, P.k), P.k), explanation: explTR(`${a} ÷ ${b}`, x, P.k, P, O.op) };
  }),

  // ★4 : quel nombre a cet arrondi et cette troncature ?
  tpl("approx_troncature_arrondi", 12, 4, "Arrondi différent de la troncature : le chiffre suivant vaut 5 ou plus.", () => {
    const P = un([PREC[1], PREC[2]]);
    const c = entre(10, 900);
    const t = c / 10 ** P.k;
    const monte = Math.random() < 0.5;
    const a = monte ? (c + 1) / 10 ** P.k : t;
    const f = (cc: number, d: number) => fr(cc / 10 ** P.k + d / 10 ** (P.k + 1));
    const juste = f(c, monte ? entre(5, 9) : entre(1, 4));
    const faux = [f(c, monte ? entre(1, 4) : entre(5, 9)), f(c + 1, entre(1, 9)), f(c - 1, entre(1, 9)), f(c + 2, entre(1, 9))];
    const text = un([
      `La troncature d’un nombre ${P.nom} est ${fixe(t, P.k)}, son arrondi ${fixe(a, P.k)}. Lequel peut-il être ?`,
      `${P.nom.replace(/^./, (s) => s.toUpperCase())}, un nombre a pour troncature ${fixe(t, P.k)} et pour arrondi ${fixe(a, P.k)}. Quel nombre convient ?`,
      `Quel nombre a pour troncature ${fixe(t, P.k)} et pour arrondi ${fixe(a, P.k)}, ${P.nom} ?`,
      `Cherche le nombre : troncature ${fixe(t, P.k)}, arrondi ${fixe(a, P.k)}, ${P.nom}.`,
      `Une mesure a pour troncature ${fixe(t, P.k)} et pour arrondi ${fixe(a, P.k)}, ${P.nom}. Laquelle peut-elle être ?`,
      `Un capteur donne la troncature ${fixe(t, P.k)} et l’arrondi ${fixe(a, P.k)}, ${P.nom}. Quelle mesure convient ?`,
      `Une élève trouve la troncature ${fixe(t, P.k)} et l’arrondi ${fixe(a, P.k)}, ${P.nom}. Quel nombre avait-elle ?`,
      `Un tableur montre la troncature ${fixe(t, P.k)} et l’arrondi ${fixe(a, P.k)}, ${P.nom}. Quelle valeur a-t-il reçue ?`,
      `Une note : troncature ${fixe(t, P.k)}, arrondi ${fixe(a, P.k)}, ${P.nom}. Quelle valeur peut-elle cacher ?`,
    ]);
    return { text, ...choix(juste, faux), explanation: expl(DEF_TR, "on garde les nombres qui commencent par la troncature, puis on regarde le chiffre suivant.", `${juste} a pour troncature ${fixe(t, P.k)} et pour arrondi ${fixe(a, P.k)}.`, `le nombre qui convient est ${juste}.`) };
  }),
  // ★4 : l'écart au nombre.
  tpl("approx_troncature_arrondi", 13, 4, "Écart = le plus grand − le plus petit.", () => {
    const P = un([PREC[0], PREC[1]]);
    const x = decimalChiffre(P.k, Math.random() < 0.5);
    const O = un(OP);
    const v = O.val(x, P.k);
    const e = Math.round(Math.abs(v - x) * 1e6) / 1e6;
    const text = un([`Quel écart y a-t-il entre ${fr(x)} et ${dtr(O.mot)} ${P.nom} de ce nombre ?`, `Calcule l’écart entre ${fr(x)} et ${dtr(O.mot)} ${P.nom} de ce nombre.`, `On remplace ${fr(x)} par ${dtr(O.mot)} ${P.nom}. Quelle erreur fait-on ?`, `Une mesure vaut ${fr(x)}. On garde ${dtr(O.mot)} ${P.nom}. Quelle est l’erreur ?`, `Un calcul donne ${fr(x)}. On note ${dtr(O.mot)} ${P.nom}. De combien se trompe-t-on ?`, `Une balance lit ${fr(x)} et affiche ${dtr(O.mot)} ${P.nom}. Quel est l’écart ?`, `Une élève remplace ${fr(x)} par ${dtr(O.mot)} ${P.nom}. Quel écart cela fait-il ?`, `Un tableur remplace ${fr(x)} par ${dtr(O.mot)} ${P.nom}. Quelle est l’erreur ?`, `Un capteur lit ${fr(x)} et note ${dtr(O.mot)} ${P.nom}. De combien s’écarte-t-il ?`]);
    return { text, ...court(e), explanation: expl(DEF_TR, "on calcule la valeur approchée, puis l’écart avec le nombre.", `valeur approchée ${fixe(v, P.k)} ; écart ${fr(e)}.`, `l’écart est ${fr(e)}.`) };
  }),
  // ★4 : le piège de l'arrondi en deux fois.
  tpl("approx_troncature_arrondi", 14, 4, "Arrondis les deux fois, puis compare avec l’arrondi direct.", () => {
    const ent = entre(1, 30);
    const u = entre(0, 9);
    const pieg = Math.random() < 0.5;
    const x = Number(`${ent}.${u}${pieg ? 4 : entre(0, 3)}${pieg ? entre(5, 9) : entre(1, 9)}`);
    const centieme = arrondi(x, 2);
    const deux = arrondi(centieme, 1);
    const direct = arrondi(x, 1);
    const egal = Math.abs(deux - direct) < 1e-9;
    const text = un([
      `On arrondit ${fr(x)} au centième, puis ce résultat au dixième. Trouve-t-on l’arrondi direct au dixième ?`,
      `Arrondis ${fr(x)} au centième, puis le résultat au dixième. Est-ce l’arrondi direct au dixième ?`,
      `${fr(x)} : arrondi au centième, puis au dixième. Obtient-on son arrondi direct au dixième ?`,
      `Une élève arrondit ${fr(x)} au centième, puis au dixième. A-t-elle l’arrondi direct au dixième ?`,
      `Un tableur arrondit ${fr(x)} au centième, puis au dixième. Donne-t-il l’arrondi direct au dixième ?`,
      `Un technicien arrondit ${fr(x)} au centième, puis au dixième. Obtient-il l’arrondi direct au dixième ?`,
    ]);
    return { text, ...ouiNon(egal), explanation: expl(DEF_TR, "on fait les deux chemins, puis on compare.", `en deux fois : ${fixe(centieme, 2)} puis ${fixe(deux, 1)} ; direct : ${fixe(direct, 1)}.`, egal ? "oui, c’est le même nombre." : "non : arrondir un nombre déjà arrondi peut fausser le résultat.") };
  }),
];

/* ===== ENCADRER UN QUOTIENT ===== */

const cadre = (d: string, m: string, e: string) => `${d} < ${m} < ${e}`;
const quotientSimple = () => {
  for (;;) {
    const b = entre(3, 9);
    const a = entre(b + 1, 12 * b);
    if (a % b) return { a, b, x: a / b };
  }
};
const fauxCadres = (x: number, k: number, m: string) => {
  const c = Math.floor(x * 10 ** k + 1e-9);
  const f = (u: number, v: number) => cadre(fixe(u / 10 ** k, k), m, fixe(v / 10 ** k, k));
  return { juste: f(c, c + 1), faux: [f(c + 1, c + 2), f(c - 1, c), f(c - 1, c + 2), f(c, c + 2), f(c - 2, c - 1)] };
};
const explEN = (m: string, x: number, k: number, nom: string) => {
  const d = dessous(x, k);
  const e = dessus(x, k);
  return expl(DEF_EN, `on écrit le début de ${m}, puis on encadre ${nom}.`, cadre(fixe(d, k), m, fixe(e, k)) + ".", `l’encadrement ${nom} est ${cadre(fixe(d, k), m, fixe(e, k))}.`);
};
const BORNES = ["inférieure", "supérieure"] as const;
const LETTRES = ["x", "y", "a", "n"] as const;
const H_EN = "Le nombre du milieu est plus grand que la borne de gauche et plus petit que celle de droite.";

const encadrerQuotient: TutorBankItemV4[] = [
  // ★1 : entre deux entiers.
  tpl("approx_encadrer_quotient", 1, 1, "Cherche le nombre de fois que le diviseur va dans le dividende.", () => {
    const { a, b } = quotientSimple();
    const q = Math.floor(a / b);
    const m = `${a} ÷ ${b}`;
    const f = (u: number) => `${u} et ${u + 1}`;
    const text = un([`Entre quels entiers se trouve ${m} ?`, `${m} est entre quels entiers ?`, `Encadre ${m} entre deux entiers qui se suivent.`, `Quels entiers qui se suivent encadrent ${m} ?`, `Choisis les deux entiers qui encadrent ${m}.`, `Trouve les deux entiers autour de ${m}.`, `Où se place ${m} : entre quels entiers ?`, `Donne l’encadrement de ${m} à l’unité.`]);
    return { text, ...choix(f(q), [f(q + 1), f(q - 1 < 0 ? q + 2 : q - 1), f(q + 2), f(a)]), explanation: expl(DEF_EN, "on cherche combien de fois le diviseur va dans le dividende.", `${b} × ${q} = ${b * q} et ${b} × ${q + 1} = ${b * (q + 1)} ; ${a} est entre les deux.`, `${q} < ${m} < ${q + 1}.`) };
  }),
  // ★1 : une borne, le début du nombre étant donné.
  tpl("approx_encadrer_quotient", 2, 1, "Borne inférieure : juste en dessous. Borne supérieure : juste au-dessus.", () => {
    const { a, b, x } = quotient();
    const P = prec();
    const B = un(BORNES);
    const v = B === "inférieure" ? dessous(x, P.k) : dessus(x, P.k);
    const text = un(croise([`${a} ÷ ${b} = ${dev(a, b)}`, `On a ${a} ÷ ${b} = ${dev(a, b)}`], [`Borne ${B} ${P.nom} ?`, `Donne sa borne ${B} ${P.nom}.`, `Écris sa borne ${B} ${P.nom}.`, `Trouve sa borne ${B} ${P.nom}.`]));
    return { text, ...court(v, P.k), explanation: explEN(`${a} ÷ ${b}`, x, P.k, P.nom) };
  }),
  // ★1 : amplitude.
  tpl("approx_encadrer_quotient", 3, 1, "Amplitude = borne de droite − borne de gauche.", () => {
    const l = un(LETTRES);
    const k = un([0, 1, 1, 2]);
    const c = entre(10, 300);
    const w = un([1, 1, 2, 5]);
    const [d, e] = [c / 10 ** k, (c + w) / 10 ** k];
    const m = cadre(fixe(d, k), l, fixe(e, k));
    const text = un([`Quelle est l’amplitude de ${m} ?`, `Calcule l’amplitude de ${m}.`, `Donne l’amplitude de ${m}.`, `${m} : quelle est son amplitude ?`, `Voici ${m}. Quelle est son amplitude ?`, `Trouve l’amplitude de ${m}.`, `Écris l’amplitude de ${m}.`, `Cherche l’amplitude de ${m}.`]);
    return { text, ...court(w / 10 ** k), explanation: expl(DEF_EN, "on soustrait la borne de gauche à la borne de droite.", `${fixe(e, k)} − ${fixe(d, k)} = ${fr(w / 10 ** k)}.`, `l’amplitude est ${fr(w / 10 ** k)}.`) };
  }),
  // ★1 : le bon encadrement d'un décimal.
  tpl("approx_encadrer_quotient", 4, 1, H_EN, () => {
    const P = precFine();
    const x = decimal(P.k);
    const { juste, faux } = fauxCadres(x, P.k, fr(x));
    const text = un([`Quel encadrement de ${fr(x)} est écrit ${P.nom} ?`, `Choisis l’encadrement de ${fr(x)} ${P.nom}.`, `Encadre ${fr(x)} ${P.nom}.`, `Trouve l’encadrement de ${fr(x)} ${P.nom}.`, `Lequel encadre ${fr(x)} ${P.nom} ?`, `${fr(x)} : quel est son encadrement ${P.nom} ?`, `Repère l’encadrement de ${fr(x)} ${P.nom}.`, `Vise l’encadrement de ${fr(x)} ${P.nom}.`]);
    return { text, ...choix(juste, faux), explanation: explEN(fr(x), x, P.k, P.nom) };
  }),

  // ★2 : le cadre complet d'un quotient.
  tpl("approx_encadrer_quotient", 5, 2, H_EN, () => {
    const { a, b, x } = quotient();
    const P = prec();
    const m = `${a} ÷ ${b}`;
    const { juste, faux } = fauxCadres(x, P.k, m);
    const text = un(croise([`${m} = ${dev(a, b)}`, `On a ${m} = ${dev(a, b)}`, `Tu lis ${m} = ${dev(a, b)}`], [`Encadre ce quotient ${P.nom}.`, `Choisis l’encadrement ${P.nom}.`, `Quel est l’encadrement ${P.nom} ?`, `Trouve son encadrement ${P.nom}.`]));
    return { text, ...choix(juste, faux), explanation: explEN(m, x, P.k, P.nom) };
  }),
  // ★2 : lire la droite graduée.
  tpl("approx_encadrer_quotient", 6, 2, "Regarde les deux graduations autour du point A.", () => {
    const { x } = quotient();
    const P = un([PREC[1], PREC[2]]);
    const { juste, faux } = fauxCadres(x, P.k, "A");
    const text = un(croise(["Lis la droite graduée.", "Regarde la droite graduée.", "Observe cette droite."], [`Quel encadrement de A convient, ${P.nom} ?`, `Encadre A ${P.nom}.`, `Choisis l’encadrement de A ${P.nom}.`, `Trouve l’encadrement de A ${P.nom}.`]));
    return { text, ...choix(juste, faux), canvas: droite(x, P.k, "A"), explanation: explEN("A", x, P.k, P.nom) };
  }),
  // ★2 : vrai ou faux.
  tpl("approx_encadrer_quotient", 7, 2, "Multiplie les bornes par le diviseur, ou pose la division.", () => {
    const { a, b, x } = quotient();
    const P = un([PREC[1], PREC[2]]);
    const m = `${a} ÷ ${b}`;
    const { juste, faux } = fauxCadres(x, P.k, m);
    const vrai = Math.random() < 0.5;
    const proposition = vrai ? juste : un(faux.slice(0, 2));
    const text = un(croise([`Regarde ${proposition}.`, `On écrit ${proposition}.`, `Lis ${proposition}.`], ["Est-ce juste ?", "Cet encadrement est-il juste ?", "Est-il correct ?", "Est-ce un bon encadrement ?", "Cette écriture est-elle vraie ?"]));
    return { text, ...ouiNon(vrai), explanation: explEN(m, x, P.k, P.nom) };
  }),
  // ★2 : poser la division.
  tpl("approx_encadrer_quotient", 8, 2, "Pose la division jusqu’au rang demandé.", () => {
    const b = un([3, 6, 7, 9]);
    const { a, x } = (() => { for (;;) { const a = entre(b + 1, 9 * b); if (a % b && (b === 7 || a % 3)) return { a, x: a / b }; } })();
    const P = un([PREC[0], PREC[1]]);
    const B = un(BORNES);
    const v = B === "inférieure" ? dessous(x, P.k) : dessus(x, P.k);
    const text = un(croise([`Encadre ${a} ÷ ${b} ${P.nom}.`, `Pose ${a} ÷ ${b}, puis encadre ${P.nom}.`, `Encadre le quotient ${a} ÷ ${b} ${P.nom}.`], [`Quelle est la borne ${B} ?`, `Donne la borne ${B}.`, `Écris la borne ${B}.`, `Cherche la borne ${B}.`]));
    return { text, ...court(v, P.k), explanation: explEN(`${a} ÷ ${b}`, x, P.k, P.nom) };
  }),

  // ★3 : un partage.
  tpl("approx_encadrer_quotient", 9, 3, "Pose la division, puis écris les deux valeurs autour de la part.", () => {
    const C = un(PARTAGES);
    const { a, b, x } = quotient();
    const P = un([PREC[0], PREC[1]]);
    const f = (c: number) => `entre ${fixe(c / 10 ** P.k, P.k)} ${C.u} et ${fixe((c + 1) / 10 ** P.k, P.k)} ${C.u}`;
    const c = Math.floor(x * 10 ** P.k + 1e-9);
    const text = `${C.t(a, b)} ${un([`Encadre une part ${P.nom}.`, `Entre quelles valeurs se trouve une part, ${P.nom} ?`, `Choisis l’encadrement d’une part ${P.nom}.`])}`;
    return { text, ...choix(f(c), [f(c + 1), f(c - 1), f(c + 2), f(c - 2)]), explanation: explEN(`${a} ÷ ${b}`, x, P.k, P.nom) };
  }),
  // ★3 : multiplier ou ajouter à un encadrement.
  tpl("approx_encadrer_quotient", 10, 3, "On fait le même calcul sur les deux bornes.", () => {
    const l = un(LETTRES);
    const k = un([1, 2]);
    const c = entre(11, 400);
    const [d, e] = [c / 10 ** k, (c + 1) / 10 ** k];
    const fois = Math.random() < 0.5;
    const n = fois ? un([2, 3, 4, 5, 10, 100]) : entre(2, 40);
    const ex = fois ? `${n} × ${l}` : `${l} + ${n}`;
    const g = (v: number) => (fois ? Math.round(v * n * 1e4) / 1e4 : Math.round((v + n) * 1e4) / 1e4);
    const f = (u: number, v: number) => `${fr(u)} < ${ex} < ${fr(v)}`;
    const text = un(croise([`On sait que ${cadre(fixe(d, k), l, fixe(e, k))}.`, `Tu sais que ${cadre(fixe(d, k), l, fixe(e, k))}.`, `Voici ${cadre(fixe(d, k), l, fixe(e, k))}.`], [`Encadre ${ex}.`, `Déduis un encadrement de ${ex}.`, `Choisis l’encadrement de ${ex}.`, `Quel est l’encadrement de ${ex} ?`, `Trouve l’encadrement de ${ex}.`]));
    return { text, ...choix(f(g(d), g(e)), [f(d, e), f(g(d), g(d) + (e - d)), f(fois ? d * n + 1 : d + n - 1, fois ? e * n + 1 : e + n + 1), f(g(d) - 1, g(e) - 1)]), explanation: expl(DEF_EN, "on fait le même calcul sur les deux bornes.", `${fr(g(d))} < ${ex} < ${fr(g(e))}.`, `l’encadrement est ${fr(g(d))} < ${ex} < ${fr(g(e))}.`) };
  }),
  // ★3 : de l'encadrement à l'arrondi.
  tpl("approx_encadrer_quotient", 11, 3, "Regarde le deuxième chiffre après la virgule de la borne de gauche.", () => {
    const l = un(LETTRES);
    const c = entre(100, 999);
    const [d, e] = [c / 100, (c + 1) / 100];
    const v = Math.floor((c + 5) / 10) / 10;
    const text = un(croise([`On sait que ${cadre(fixe(d, 2), l, fixe(e, 2))}.`, `Une mesure vérifie ${cadre(fixe(d, 2), l, fixe(e, 2))}.`, `Un capteur indique ${cadre(fixe(d, 2), l, fixe(e, 2))}.`], [`Quel est l’arrondi de ${l} au dixième ?`, `Donne l’arrondi de ${l} au dixième.`, `Déduis l’arrondi de ${l} au dixième.`, `Trouve l’arrondi de ${l} au dixième.`, `Écris l’arrondi de ${l} au dixième.`]));
    return { text, ...court(v, 1), explanation: expl(DEF_EN, "on regarde le chiffre des centièmes : tout l’encadrement s’arrondit au même nombre.", `${fixe(d, 2)} et les nombres jusqu’à ${fixe(e, 2)} s’arrondissent à ${fixe(v, 1)}.`, `l’arrondi est ${fixe(v, 1)}.`) };
  }),

  // ★4 : somme ou différence d'encadrements.
  tpl("approx_encadrer_quotient", 12, 4, "Pour une somme, on ajoute les bornes. Pour une différence, on croise : petite − grande, grande − petite.", () => {
    const k = 1;
    const c1 = entre(40, 90);
    const c2 = entre(10, 35);
    const w1 = un([1, 1, 2]);
    const w2 = un([1, 1, 2]);
    const v = (n: number) => fixe(n / 10, k);
    const somme = Math.random() < 0.5;
    const [lo, hi] = somme ? [c1 + c2, c1 + w1 + c2 + w2] : [c1 - c2 - w2, c1 + w1 - c2];
    const ex = somme ? "a + b" : "a − b";
    const f = (u: number, w: number) => `${v(u)} < ${ex} < ${v(w)}`;
    const faux = somme ? [f(c1 + c2 + 1, c1 + w1 + c2 + w2 + 1), f(c1 + c2 - 1, c1 + w1 + c2 + w2 - 1), f(c1 + c2, c1 + w1 + c2 + w2 + 2)] : [f(c1 - c2, c1 + w1 - c2 - w2), f(c1 - c2 - w2 + 1, c1 + w1 - c2 + 1), f(c1 - c2 + 1, c1 + w1 - c2 - w2 + 1), f(c1 - c2 - w2 - 1, c1 + w1 - c2 - 1)];
    const donne = `${cadre(v(c1), "a", v(c1 + w1))} et ${cadre(v(c2), "b", v(c2 + w2))}`;
    const text = un(croise([`On sait que ${donne}.`, `Tu sais que ${donne}.`, `Voici ${donne}.`], [`Encadre ${ex}.`, `Quel est l’encadrement de ${ex} ?`, `Choisis l’encadrement de ${ex}.`, `Déduis un encadrement de ${ex}.`, `Trouve l’encadrement de ${ex}.`]));
    return { text, ...choix(f(lo, hi), faux.filter((x) => { const [u, , w] = x.split(" < "); return Number(u.replace(",", ".")) < Number(w.replace(",", ".")); })), explanation: expl(DEF_EN, somme ? "on ajoute les bornes de gauche, puis celles de droite." : "pour être sûr, on retire la grande borne de b à la petite de a, puis la petite de b à la grande de a.", `${v(lo)} < ${ex} < ${v(hi)}.`, `l’encadrement est ${v(lo)} < ${ex} < ${v(hi)}.`) };
  }),
  // ★4 : périmètre d'un polygone régulier.
  tpl("approx_encadrer_quotient", 13, 4, "Multiplie chaque borne par le nombre de côtés.", () => {
    const P = un([
      ["Un terrain carré", 4], ["Une dalle carrée", 4], ["Un panneau en triangle équilatéral", 3], ["Une tente en triangle équilatéral", 3],
      ["Un kiosque hexagonal régulier", 6], ["Une table hexagonale régulière", 6], ["Un jardin pentagonal régulier", 5], ["Une mosaïque pentagonale régulière", 5],
    ] as const);
    const c = entre(11, 150);
    const d = c / 10;
    const e = (c + 1) / 10;
    const n = P[1];
    const f = (u: number, w: number) => `entre ${fr(u)} m et ${fr(w)} m`;
    const [lo, hi] = [Math.round(d * n * 10) / 10, Math.round(e * n * 10) / 10];
    const text = `${P[0]} a des côtés égaux, entre ${fixe(d, 1)} m et ${fixe(e, 1)} m. ${un(["Encadre son périmètre.", "Entre quelles valeurs se trouve son périmètre ?", "Choisis l’encadrement de son périmètre."])}`;
    return { text, ...choix(f(lo, hi), [f(d, e), f(lo, lo + 0.1), f(Math.round((lo + 1) * 10) / 10, Math.round((hi + 1) * 10) / 10), f(Math.round((d + n) * 10) / 10, Math.round((e + n) * 10) / 10)]), explanation: expl(DEF_EN, `le périmètre vaut ${n} fois le côté : on multiplie les deux bornes par ${n}.`, `${fixe(d, 1)} × ${n} = ${fr(lo)} et ${fixe(e, 1)} × ${n} = ${fr(hi)}.`, `le périmètre est entre ${fr(lo)} m et ${fr(hi)} m.`) };
  }),
  // ★4 : comparer deux quotients.
  tpl("approx_encadrer_quotient", 14, 4, "Encadre chaque quotient au dixième, puis compare les encadrements.", () => {
    for (;;) {
      const u = quotientSimple();
      const v = quotientSimple();
      if (u.a * v.b === v.a * u.b) continue;
      const d1 = dessous(u.x, 1);
      const d2 = dessous(v.x, 1);
      if (d1 === d2) continue;
      if (Math.abs(u.x - v.x) > 1.5) continue;
      const [n1, n2] = [`${u.a} ÷ ${u.b}`, `${v.a} ÷ ${v.b}`];
      const signe = u.x < v.x ? "<" : ">";
      const text = un([
        `Encadre ${n1} et ${n2} au dixième. Quel signe écrire entre eux ?`,
        `Compare ${n1} et ${n2} par un encadrement au dixième. Quel signe écrire ?`,
        `À l’aide d’encadrements au dixième, compare ${n1} et ${n2}. Quel signe écrire ?`,
        `Quel signe mettre entre ${n1} et ${n2} ? Encadre-les au dixième.`,
        `${n1} et ${n2} : encadre-les au dixième. Quel signe les sépare ?`,
        `Une élève encadre ${n1} et ${n2} au dixième. Quel signe doit-elle écrire ?`,
      ]);
      return { text, format: "qcm" as const, choices: ["<", ">"], expected: [signe], comparator: "mcq_exact" as const, explanation: expl(DEF_EN, "on encadre chaque quotient, puis on compare.", `${cadre(fixe(d1, 1), n1, fixe(dessus(u.x, 1), 1))} et ${cadre(fixe(d2, 1), n2, fixe(dessus(v.x, 1), 1))}.`, `${n1} ${signe} ${n2}.`) };
    }
  }),
];

export const valeursApprocheesBank: TutorBankItemV4[] = [...defautExces, ...troncatureArrondi, ...encadrerQuotient];
