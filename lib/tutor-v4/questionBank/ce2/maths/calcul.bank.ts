// lib/tutor-v4/questionBank/ce2/maths/calcul.bank.ts
//
// PÉRIMÈTRE BO : calcul mental jusqu'à 10 000 (BO n° 41 du 31 octobre 2024,
// cycle 2). Le programme ne dit pas « calcul mental » en bloc : il nomme huit
// familles, une par une, et vise une fluence de quinze résultats en trois
// minutes. Chaque famille a donc ses gabarits, et chaque gabarit enseigne la
// PROCÉDURE, pas seulement le résultat : ajouter 9 c'est ajouter 10 puis
// enlever 1, multiplier par 4 c'est doubler deux fois.
//
// ⛔ LES SQUELETTES (10/11/2026). Mesuré avec scripts/mesurer-squelettes-coach.ts :
// les 11 micros tenaient sur 2 à 6 squelettes, un enfant revoyait 15 à 19 fois
// la même phrase sur 20. Chaque gabarit tire maintenant une FAMILLE (calcul nu,
// étape de la procédure, nombre mystère, petite histoire à partir de ★3), une
// TOURNURE et un enfant de la troupe (Nina, Téo, Zoé, Ravi, Pic le
// paille-en-queue…). ⭐ Un énoncé sur deux environ porte un dessin qui AIDE
// sans donner la réponse : matériel de numération (`base_dix`) du nombre de
// départ, schéma en barres, objets en groupes pour les tables.
// Outils communs : ./outils-calcul-ce2.ts.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  type Etoile,
  type Q,
  barre,
  barreEgale,
  baseDix,
  de,
  deuxPersonnes,
  exp,
  fmt,
  gabarit,
  maj,
  monde,
  mondeDessinable,
  nObj,
  objetsGroupes,
  pick,
  poserCalcul,
  qM,
  qN,
  quelquun,
  rint,
  tIl,
} from "./outils-calcul-ce2";

/* =========================================================
   LES ITEMS FIGÉS (gardés tels quels)
========================================================= */

const FIXES: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "ce2_calcul_ajouter9_fixed_001_procedure",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_ajouter_9_19",
    difficulty: 2,
    theme: "neutral",
    text: "Pour calculer 47 + 9 dans sa tête, quelle est la façon la plus rapide ?",
    format: "qcm",
    choices: [
      "Ajouter 10, puis enlever 1",
      "Ajouter 10, puis ajouter 1",
      "Enlever 10, puis ajouter 1",
      "Ajouter 9 aux unités seulement",
    ],
    expected: ["Ajouter 10, puis enlever 1"],
    comparator: "mcq_exact",
    hint: "9, c'est 10 moins 1.",
    explanation: exp(
      "Ajouter 9, c'est ajouter une dizaine entière puis retirer l'unité en trop.",
      "On ajoute 10, ce qui est facile, puis on enlève 1.",
      "47 + 10 = 57, puis 57 − 1 = 56. Donc 47 + 9 = 56.",
      "La bonne façon est d'ajouter 10 puis d'enlever 1.",
    ),
    tags: ["ce2", "calcul_mental", "ajouter_9", "procedure", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_calcul_x8_fixed_001_procedure",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_multiplier_4_8",
    difficulty: 3,
    theme: "neutral",
    text: "Pour multiplier un nombre par 8 dans sa tête, que peut-on faire ?",
    format: "qcm",
    choices: [
      "Doubler trois fois",
      "Doubler deux fois",
      "Doubler quatre fois",
      "Doubler, puis ajouter le nombre",
    ],
    expected: ["Doubler trois fois"],
    comparator: "mcq_exact",
    hint: "2 × 2 × 2 = 8.",
    explanation: exp(
      "Multiplier par 8, c'est multiplier par 2, puis encore par 2, puis encore par 2.",
      "On double trois fois de suite, car 2 × 2 × 2 = 8.",
      "Par exemple 7 × 8 : 7 double en 14, 14 double en 28, 28 double en 56. Et 7 × 8 = 56.",
      "Pour multiplier par 8, on double trois fois.",
    ),
    tags: ["ce2", "calcul_mental", "multiplier_8", "procedure", "qcm"],
  },
];

/* =========================================================
   LES GABARITS — une famille × une situation × une tournure
========================================================= */

const N = "calcul_mental";
const g = (id: string, microId: string, difficulty: Etoile, hint: string, tags: string[], gen: () => Q) =>
  gabarit({ id, notionId: N, microId, difficulty, hint, tags: ["calcul_mental", ...tags] }, gen);

/** Une chance sur `k` d'avoir le dessin (le reste du temps, l'énoncé seul). */
const parfois = <T,>(p: number, f: () => T | undefined): T | undefined => (Math.random() < p ? f() : undefined);
const avec = (canvas: Q["canvas"] | undefined): Partial<Q> => (canvas ? { canvas } : {});

/* ---------------------------------------------------------
   COMPLÉMENTS — à 100, à 1 000, à la centaine du dessus
--------------------------------------------------------- */

function questionComplement(n: number, cible: number, situation: boolean): string {
  const p = quelquun();
  const N1 = fmt(n);
  const C = fmt(cible);
  const nues = [
    `Combien faut-il ajouter à ${N1} pour aller à ${C} ?`,
    `${N1} + ? = ${C}. Quel nombre manque ?`,
    `Que manque-t-il à ${N1} pour faire ${C} ?`,
    `${p.nom} part de ${N1} et veut arriver à ${C}. Combien doit-${p.il} ajouter ?`,
    `Pic le paille-en-queue demande à ${p.nom} : « De ${N1} à ${C}, il y a combien ? »`,
    `${p.nom} complète : ${N1} + … = ${C}. Quel nombre écrit-${p.il} ?`,
  ];
  if (!situation) return pick(nues);
  const s = pick([
    `${p.nom} a déjà collé ${N1} images. Son album en contient ${C}. Combien d'images lui manque-t-il ?`,
    `Pic le paille-en-queue a ramassé ${N1} graines. Il en veut ${C}. Combien doit-il encore en trouver ?`,
    `La boulangère a déjà fait ${N1} croissants. Elle en veut ${C}. Combien doit-elle encore en faire ?`,
    `Au grand jeu de l'oie, ${p.nom} est sur la case ${N1}. L'arrivée est la case ${C}. Combien de cases reste-t-il ?`,
    `${p.nom} lit un livre de ${C} pages. ${maj(p.il)} est à la page ${N1}. Combien de pages lui reste-t-il ?`,
    `Le puzzle ${de(p.nom)} a ${C} pièces. ${maj(p.il)} en a posé ${N1}. Combien de pièces reste-t-il à poser ?`,
    `La fusée de la classe doit monter à ${C} mètres. Elle est déjà à ${N1} mètres. Combien de mètres lui manque-t-il ?`,
    `Le fermier veut ${C} œufs. Ses poules en ont pondu ${N1}. Combien d'œufs manque-t-il ?`,
    `Les pirates veulent ${C} pièces d'or dans leur coffre. Il y en a ${N1}. Combien en manque-t-il ?`,
    `${p.nom} fait la course de vélo. Le tour fait ${C} mètres et ${p.il} a roulé ${N1} mètres. Combien de mètres reste-t-il ?`,
    `À la kermesse, il faut ${C} tickets pour gagner le gros lot. ${p.nom} en a ${N1}. Combien lui en manque-t-il ?`,
    `Le jardinier veut planter ${C} fleurs. Il en a planté ${N1}. Combien lui en reste-t-il à planter ?`,
  ]);
  return Math.random() < 0.6 ? s : pick(nues);
}

function complement(n: number, cible: number, situation: boolean, dessin: "base" | "barre" | "aucun"): Q {
  const c = cible - n;
  const pas = cible >= 1000 && n % 100 === 0 ? 100 : cible >= 1000 && n % 10 === 0 ? 10 : 1;
  const pieges = [c + 10, c - 10, c + 1, c - 1, c + 100, c - 100, n].filter((v) => v % pas === 0 || pas === 1);
  const sup = Math.ceil((n + 1) / (cible >= 1000 && n % 10 === 0 ? 100 : 10)) * (cible >= 1000 && n % 10 === 0 ? 100 : 10);
  const canvas =
    dessin === "base" ? baseDix(n) : dessin === "barre" ? barre([["déjà", fmt(n)], ["il manque", null]], fmt(cible)) : undefined;
  return qN(
    questionComplement(n, cible, situation),
    c,
    pieges,
    exp(
      `Le complément de ${fmt(n)} à ${fmt(cible)}, c'est ce qui manque à ${fmt(n)} pour arriver à ${fmt(cible)}.`,
      "On monte d'abord au nombre rond juste au-dessus, puis on continue jusqu'au but.",
      sup < cible
        ? `De ${fmt(n)} à ${fmt(sup)}, il y a ${fmt(sup - n)}. De ${fmt(sup)} à ${fmt(cible)}, il y a ${fmt(cible - sup)}. En tout : ${fmt(sup - n)} + ${fmt(cible - sup)} = ${fmt(c)}.`
        : `De ${fmt(n)} à ${fmt(cible)}, il y a ${fmt(c)}.`,
      `Il faut ajouter ${fmt(c)} : ${fmt(n)} + ${fmt(c)} = ${fmt(cible)}.`,
    ),
    avec(canvas),
  );
}

const dessinAuHasard = (): "base" | "barre" | "aucun" => pick(["base", "barre", "aucun", "base", "barre"] as const);

/* ---------------------------------------------------------
   DOUBLES ET MOITIÉS
--------------------------------------------------------- */

function double(n: number, situation: boolean): Q {
  const [p, q] = deuxPersonnes();
  const m = monde();
  const d = Math.floor(n / 10);
  const u = n % 10;
  const nues = [
    `Quel est le double de ${fmt(n)} ?`,
    `${fmt(n)} + ${fmt(n)} = ?`,
    `Combien font 2 fois ${fmt(n)} ?`,
    `${p.nom} double ${fmt(n)}. Quel nombre trouve-${tIl(p)} ?`,
    `Pic le paille-en-queue dit : « Je double ${fmt(n)} ! » Quel nombre trouve-t-il ?`,
    `${p.nom} écrit le double de ${fmt(n)} sur son ardoise. Quel nombre écrit-${p.il} ?`,
  ];
  const histoires = [
    `${p.nom} a ${nObj(n, m)}. ${q.nom} en a le double. Combien ${q.nom} en a-t-${q.il} ?`,
    `${maj(m.ou)}, il y a ${nObj(n, m)}. On en apporte autant. Combien y en a-t-il maintenant ?`,
    `${p.nom} a marqué ${fmt(n)} points au jeu. ${q.nom} en marque deux fois plus. Combien de points pour ${q.nom} ?`,
    `Une recette de gâteau demande ${fmt(n)} grammes de sucre. Le chef cuisinier fait deux gâteaux. Combien de grammes de sucre lui faut-il ?`,
  ];
  const text = situation && Math.random() < 0.6 ? pick(histoires) : pick(nues);
  const sansRetenue = d * 20 + ((2 * u) % 10);
  return qN(
    text,
    2 * n,
    [2 * n + 10, 2 * n - 10, sansRetenue, n + 2, 2 * n + 1, 2 * n - 1],
    exp(
      "Le double d'un nombre, c'est ce nombre ajouté à lui-même.",
      "On double les dizaines, on double les unités, puis on rassemble.",
      n >= 10 && n < 100
        ? `Le double de ${d * 10} est ${d * 20}, le double de ${u} est ${2 * u}. Ensemble : ${d * 20} + ${2 * u} = ${2 * n}.`
        : `${fmt(n)} + ${fmt(n)} = ${fmt(2 * n)}.`,
      `Le double de ${fmt(n)} est ${fmt(2 * n)}.`,
    ),
    avec(parfois(0.65, () => baseDix(n))),
  );
}

function moitie(n: number, situation: boolean): Q {
  const [p, q] = deuxPersonnes();
  const m = monde();
  const h = n / 2;
  const nues = [
    `Quelle est la moitié de ${fmt(n)} ?`,
    `${fmt(n)} ÷ 2 = ?`,
    `On partage ${fmt(n)} en deux parts égales. Combien dans chaque part ?`,
    `Quel nombre, doublé, donne ${fmt(n)} ?`,
    `${p.nom} cherche la moitié de ${fmt(n)}. Que doit-${p.il} trouver ?`,
    `Pic le paille-en-queue coupe ${fmt(n)} en deux moitiés égales. Combien vaut une moitié ?`,
  ];
  const histoires = [
    `${p.nom} et ${q.nom} se partagent ${nObj(n, m)} à égalité. Combien en a chaque enfant ?`,
    `${maj(m.ou)}, il y a ${nObj(n, m)}. On en range la moitié dans une boîte. Combien en range-t-on ?`,
    `Le maître-nageur a ${fmt(n)} bouées. Il en range la moitié. Combien en range-t-il ?`,
    `${p.nom} a lu la moitié d'un livre de ${fmt(n)} pages. Combien de pages a-t-${p.il} lues ?`,
  ];
  const text = situation && Math.random() < 0.6 ? pick(histoires) : pick(nues);
  const d = Math.floor((n % 100) / 10);
  const faute = Math.floor(n / 100) * 50 + Math.floor(d / 2) * 10 + Math.floor((n % 10) / 2);
  return qN(
    text,
    h,
    [h + 10, h - 10, faute, h + 1, h - 1, n * 2, h + 5],
    exp(
      "La moitié d'un nombre, c'est une des deux parts égales quand on le partage en deux.",
      "On coupe le nombre en morceaux faciles à partager en deux, puis on rassemble les moitiés.",
      n < 100 && d % 2 === 1
        ? `${n} = ${n - 10 - (n % 10)} + ${10 + (n % 10)}. La moitié de ${n - 10 - (n % 10)} est ${(n - 10 - (n % 10)) / 2}, la moitié de ${10 + (n % 10)} est ${(10 + (n % 10)) / 2}. Ensemble : ${h}.`
        : `${fmt(h)} + ${fmt(h)} = ${fmt(n)}, donc la moitié de ${fmt(n)} est ${fmt(h)}.`,
      `La moitié de ${fmt(n)} est ${fmt(h)}.`,
    ),
    avec(parfois(0.65, () => (n <= 300 ? baseDix(n) : undefined))),
  );
}

function doubleMoitieEnchaine(): Q {
  const p = quelquun();
  const f = rint(1, 5);
  if (f === 1) {
    const n = rint(11, 45);
    return qN(
      pick([
        `Quel est le double du double de ${n} ?`,
        `${p.nom} double ${n}, puis double encore le résultat. Quel nombre trouve-${tIl(p)} ?`,
        `Pic le paille-en-queue double ${n} deux fois de suite. Où arrive-t-il ?`,
      ]),
      4 * n,
      [2 * n, 4 * n + 10, 4 * n - 10, 3 * n, 4 * n + 2],
      exp("Doubler deux fois, c'est multiplier par 4.", "On double une première fois, puis on double le résultat.", `Le double de ${n} est ${2 * n}, le double de ${2 * n} est ${4 * n}.`, `Le double du double de ${n} est ${4 * n}.`),
      avec(parfois(0.65, () => baseDix(n))),
    );
  }
  if (f === 2) {
    const n = 4 * rint(6, 50);
    return qN(
      pick([
        `Quelle est la moitié de la moitié de ${n} ?`,
        `${p.nom} prend la moitié de ${n}, puis encore la moitié. Quel nombre trouve-${tIl(p)} ?`,
        `On partage ${n} en deux, puis encore en deux. Combien dans chaque part ?`,
      ]),
      n / 4,
      [n / 2, n / 4 + 10, n / 4 - 10, n / 4 + 1, n / 8],
      exp("Prendre deux fois la moitié, c'est partager en 4 parts égales.", "On prend la moitié, puis la moitié du résultat.", `La moitié de ${n} est ${n / 2}, la moitié de ${n / 2} est ${n / 4}.`, `Le résultat est ${n / 4}.`),
      avec(parfois(0.4, () => barreEgale(4, null, String(n)))),
    );
  }
  if (f === 3) {
    const n = rint(12, 48) * 10 + pick([0, 5]);
    return double(n, true);
  }
  if (f === 4) {
    const n = 2 * rint(60, 480);
    return moitie(n, true);
  }
  // Le nombre mystère.
  const x = rint(12, 49);
  return qN(
    pick([
      `${p.nom} pense à un nombre. Son double est ${2 * x}. Quel est ce nombre ?`,
      `Pic le paille-en-queue a doublé son tas de graines : il en a maintenant ${2 * x}. Combien en avait-il avant ?`,
      `Je suis un nombre. Mon double est ${2 * x}. Qui suis-je ?`,
    ]),
    x,
    [2 * x, 4 * x, x + 10, x - 10, x + 1],
    exp("Le double d'un nombre, c'est ce nombre ajouté à lui-même.", "Pour retrouver le nombre de départ, on prend la moitié.", `La moitié de ${2 * x} est ${x}, et ${x} + ${x} = ${2 * x}.`, `Le nombre est ${x}.`),
  );
}

/* ---------------------------------------------------------
   AJOUTER ET SOUSTRAIRE 8, 9, 18, 19, 29, 39
--------------------------------------------------------- */

function histoireAjout(n: number, a: number): string {
  const [p, q] = deuxPersonnes();
  const m = monde();
  return pick([
    `${p.nom} a ${nObj(n, m)}. ${maj(p.il)} en reçoit ${a} de plus. Combien en a-t-${p.il} maintenant ?`,
    `${maj(m.ou)}, il y a ${nObj(n, m)}. On en ajoute ${a}. Combien y en a-t-il ?`,
    `${p.nom} a ${n} points au jeu vidéo. ${maj(p.il)} gagne ${a} points. Combien a-t-${p.il} de points ?`,
    `Le train de la fête foraine transporte ${n} enfants. ${a} enfants montent encore. Combien sont-ils dans le train ?`,
    `${q.nom} lit ${n} pages lundi et ${a} pages mardi. Combien de pages a-t-${q.il} lues ?`,
    `Pic le paille-en-queue a ${n} graines. Il en trouve ${a} sous un arbre. Combien en a-t-il maintenant ?`,
  ]);
}

function histoireRetrait(n: number, s: number): string {
  const [p, q] = deuxPersonnes();
  const m = monde();
  return pick([
    `${p.nom} a ${nObj(n, m)}. ${maj(p.il)} en donne ${s} à ${q.nom}. Combien lui en reste-t-il ?`,
    `${maj(m.ou)}, il y a ${nObj(n, m)}. On en prend ${s}. Combien en reste-t-il ?`,
    `Le livre ${de(p.nom)} a ${n} pages. ${maj(p.il)} en a lu ${s}. Combien de pages lui reste-t-il à lire ?`,
    `La fusée doit voler ${n} jours. Elle a déjà volé ${s} jours. Combien de jours reste-t-il ?`,
    `Le marchand de glaces avait ${n} cornets. Il en vend ${s}. Combien en a-t-il encore ?`,
    `Pic le paille-en-queue avait ${n} graines. Il en mange ${s}. Combien lui en reste-t-il ?`,
  ]);
}

function ajouter(n: number, a: number, situation: boolean): Q {
  const r = n + a;
  const rond = a + 1;
  const p = quelquun();
  const f = rint(1, situation ? 5 : 4);
  let text: string;
  if (f <= 2) text = poserCalcul(`${fmt(n)} + ${a}`, p);
  else if (f === 3) text = `Pour calculer ${fmt(n)} + ${a}, ${p.nom} fait d'abord ${fmt(n)} + ${rond} = ${fmt(n + rond)}. Quel est le résultat de ${fmt(n)} + ${a} ?`;
  else if (f === 4) text = pick([`${fmt(n)} + ${a} = ?`, `Ajoute ${a} à ${fmt(n)}.`, `Quel nombre obtient-on en ajoutant ${a} à ${fmt(n)} ?`]);
  else text = histoireAjout(n, a);
  return qN(
    text,
    r,
    [r + 1, r - 1, r + 10, r - 10, n + rond + 1, n + a - 10],
    exp(
      `Ajouter ${a}, c'est ajouter ${rond}, puis enlever 1.`,
      `On ajoute le nombre rond ${rond}, c'est facile ; puis on retire le 1 ajouté en trop.`,
      `${fmt(n)} + ${rond} = ${fmt(n + rond)}, puis ${fmt(n + rond)} − 1 = ${fmt(r)}.`,
      `${fmt(n)} + ${a} = ${fmt(r)}.`,
    ),
    avec(parfois(0.65, () => baseDix(n))),
  );
}

function soustraire(n: number, s: number, situation: boolean): Q {
  const r = n - s;
  const rond = s + 1;
  const p = quelquun();
  const f = rint(1, situation ? 5 : 4);
  let text: string;
  if (f <= 2) text = poserCalcul(`${fmt(n)} − ${s}`, p);
  else if (f === 3) text = `Pour calculer ${fmt(n)} − ${s}, ${p.nom} fait d'abord ${fmt(n)} − ${rond} = ${fmt(n - rond)}. Quel est le résultat de ${fmt(n)} − ${s} ?`;
  else if (f === 4) text = pick([`${fmt(n)} − ${s} = ?`, `Enlève ${s} à ${fmt(n)}.`, `Quel nombre obtient-on en retirant ${s} de ${fmt(n)} ?`]);
  else text = histoireRetrait(n, s);
  return qN(
    text,
    r,
    [r + 1, r - 1, r + 10, r - 10, n - rond - 1, r + 2],
    exp(
      `Enlever ${s}, c'est enlever ${rond}, puis rajouter 1.`,
      `On retire le nombre rond ${rond} ; on a retiré 1 de trop, on le rajoute.`,
      `${fmt(n)} − ${rond} = ${fmt(n - rond)}, puis ${fmt(n - rond)} + 1 = ${fmt(r)}.`,
      `${fmt(n)} − ${s} = ${fmt(r)}.`,
    ),
    avec(parfois(0.65, () => baseDix(n))),
  );
}

/** « Que doit-il faire ensuite ? » — l'étape qui manque, en mots. */
function etapeSuivante(plus: boolean): Q {
  const p = quelquun();
  const k = pick([9, 19, 29, 39]);
  const n = rint(120, 980);
  const rond = k + 1;
  const debut = plus ? `${fmt(n)} + ${rond} = ${fmt(n + rond)}` : `${fmt(n)} − ${rond} = ${fmt(n - rond)}`;
  const bon = plus ? "enlever 1" : "ajouter 1";
  return qM(
    pick([
      `Pour calculer ${fmt(n)} ${plus ? "+" : "−"} ${k}, ${p.nom} commence par ${debut}. Que doit-${p.il} faire ensuite ?`,
      `${p.nom} calcule ${fmt(n)} ${plus ? "+" : "−"} ${k} de tête. ${maj(p.il)} a déjà fait ${debut}. Quelle est l'étape suivante ?`,
      `Pic le paille-en-queue veut calculer ${fmt(n)} ${plus ? "+" : "−"} ${k}. Il a trouvé ${debut}. Que lui reste-t-il à faire ?`,
    ]),
    bon,
    [plus ? "ajouter 1" : "enlever 1", "enlever 10", "ajouter 10", "rien, c'est fini"],
    exp(
      `${k}, c'est ${rond} moins 1.`,
      plus ? `En ajoutant ${rond}, on a ajouté 1 de trop : on l'enlève.` : `En enlevant ${rond}, on a enlevé 1 de trop : on le rajoute.`,
      plus ? `${fmt(n + rond)} − 1 = ${fmt(n + k)}.` : `${fmt(n - rond)} + 1 = ${fmt(n - k)}.`,
      `Il faut encore ${bon}.`,
    ),
  );
}

/* ---------------------------------------------------------
   MULTIPLIER PAR 4, PAR 8, PAR 25, PAR DES DIZAINES
--------------------------------------------------------- */

type Lot = { un: string; des: string; quoi: string; fem: boolean; gros?: boolean };
const LOTS: readonly Lot[] = [
  { un: "boîte", des: "boîtes", quoi: "crayons", fem: true },
  { un: "paquet", des: "paquets", quoi: "cartes", fem: false, gros: true },
  { un: "sachet", des: "sachets", quoi: "billes", fem: false, gros: true },
  { un: "panier", des: "paniers", quoi: "œufs", fem: false },
  { un: "étagère", des: "étagères", quoi: "livres", fem: true },
  { un: "wagon", des: "wagons", quoi: "voyageurs", fem: false },
  { un: "coffre", des: "coffres", quoi: "pièces d'or", fem: false, gros: true },
  { un: "plaque", des: "plaques", quoi: "cookies", fem: true },
  { un: "bocal", des: "bocaux", quoi: "bonbons", fem: false, gros: true },
  { un: "rangée", des: "rangées", quoi: "chaises", fem: true },
  { un: "car", des: "cars", quoi: "enfants", fem: false },
  { un: "pot", des: "pots", quoi: "graines", fem: false, gros: true },
  { un: "album", des: "albums", quoi: "images", fem: false, gros: true },
  { un: "filet", des: "filets", quoi: "oranges", fem: false },
  { un: "carton", des: "cartons", quoi: "feuilles", fem: false, gros: true },
  { un: "ruche", des: "ruches", quoi: "abeilles", fem: true, gros: true },
];

function histoireLots(k: number, n: number): string {
  const l = pick(LOTS.filter((x) => n < 100 || x.gros));
  const p = quelquun();
  return pick([
    `${l.fem ? "Une" : "Un"} ${l.un} contient ${fmt(n)} ${l.quoi}. Combien ${de(l.quoi)} y a-t-il dans ${k} ${l.des} ?`,
    `${p.nom} a ${k} ${l.des} de ${fmt(n)} ${l.quoi}. Combien ${de(l.quoi)} a-t-${p.il} en tout ?`,
    `Il y a ${k} ${l.des}. Dans ${l.fem ? "chacune" : "chacun"}, on compte ${fmt(n)} ${l.quoi}. Combien ${de(l.quoi)} en tout ?`,
  ]);
}

function multiplierParDoubles(n: number, k: 4 | 8, situation: boolean): Q {
  const r = n * k;
  const p = quelquun();
  const f = rint(1, situation ? 5 : 4);
  let text: string;
  if (f <= 2) text = poserCalcul(`${n} × ${k}`, p);
  else if (f === 3)
    text =
      k === 4
        ? `${p.nom} double ${n}, puis double encore le résultat. Quel nombre trouve-${tIl(p)} ?`
        : `${p.nom} double ${n} trois fois de suite. Quel nombre trouve-${tIl(p)} ?`;
  else if (f === 4) text = pick([`Combien font ${k} fois ${n} ?`, `${k} × ${n} = ?`, `Multiplie ${n} par ${k}.`]);
  else text = k === 4 && Math.random() < 0.4 ? `Une voiture a 4 roues. Combien de roues ont ${n} voitures ?` : histoireLots(k, n);
  const doubles = k === 4 ? `${n} → ${2 * n} → ${4 * n}` : `${n} → ${2 * n} → ${4 * n} → ${8 * n}`;
  return qN(
    text,
    r,
    [k === 4 ? 2 * n : 4 * n, k === 4 ? 8 * n : 16 * n, r + 10, r - 10, n + k, r + k],
    exp(
      `Multiplier par ${k}, c'est doubler ${k === 4 ? "deux" : "trois"} fois.`,
      `On double, puis on double encore${k === 8 ? ", puis une troisième fois" : ""}.`,
      doubles + ".",
      `${n} × ${k} = ${fmt(r)}.`,
    ),
    avec(parfois(0.65, () => (k === 4 || n < 20 ? barreEgale(k, String(n), null) : undefined))),
  );
}

function x8Etapes(): Q {
  const n = rint(12, 60);
  const p = quelquun();
  const f = rint(1, 3);
  if (f === 1)
    return qN(
      pick([
        `Pour calculer ${n} × 8, on double trois fois. On a déjà ${n} × 2 = ${2 * n} et ${2 * n} × 2 = ${4 * n}. Quel est le résultat final ?`,
        `${p.nom} calcule ${n} × 8 en doublant : ${n}, puis ${2 * n}, puis ${4 * n}… Quel nombre trouve-${tIl(p)} à la fin ?`,
        `${p.nom} a déjà doublé deux fois ${n} : ${4 * n}. Il reste un double pour avoir ${n} × 8. Quel est le résultat ?`,
        `Pic le paille-en-queue double ${n} trois fois : ${2 * n}, ${4 * n}, puis… Quel nombre trouve-t-il ?`,
      ]),
      8 * n,
      [4 * n, 16 * n, 8 * n + 10, 8 * n - 10, 6 * n],
      exp("Multiplier par 8, c'est doubler trois fois.", "Il reste le dernier double.", `${4 * n} × 2 = ${8 * n}.`, `${n} × 8 = ${8 * n}.`),
      avec(parfois(0.6, () => barreEgale(2, String(4 * n), null))),
    );
  if (f === 2) {
    const k = pick([4, 8]);
    return qM(
      pick([
        `${p.nom} veut calculer ${n} × ${k} de tête. Combien de fois doit-${p.il} doubler ${n} ?`,
        `Pour multiplier ${n} par ${k} en doublant, combien de doubles faut-il faire ?`,
        `Pic le paille-en-queue veut faire ${n} × ${k} en doublant. Combien de fois doit-il doubler ?`,
        `${p.nom} remplace « × ${k} » par des doubles. Combien de doubles fait-${p.il} ?`,
      ]),
      k === 4 ? "2 fois" : "3 fois",
      ["2 fois", "3 fois", "4 fois", "8 fois"],
      exp(`${k} = ${k === 4 ? "2 × 2" : "2 × 2 × 2"}.`, "Chaque double multiplie par 2.", k === 4 ? "Deux doubles : × 2 × 2 = × 4." : "Trois doubles : × 2 × 2 × 2 = × 8.", `Il faut doubler ${k === 4 ? 2 : 3} fois.`),
    );
  }
  return multiplierParDoubles(rint(15, 99), pick([4, 8] as const), true);
}

function fois25(n: number, situation: boolean): Q {
  const r = n * 25;
  const p = quelquun();
  const f = rint(1, situation ? 5 : 4);
  let text: string;
  if (f <= 2) text = poserCalcul(`${n} × 25`, p);
  else if (f === 3)
    text = pick([
      `On sait que 4 × 25 = 100. Combien font ${n} × 25 ?`,
      `${p.nom} sait que 4 × 25 = 100. Combien font alors ${n} × 25 ?`,
      `${p.nom} a ${n} pièces de 20 centimes et ${n} pièces de 5 centimes. Combien de centimes en tout ?`,
      `Pic le paille-en-queue fait ${n} sauts de 25 cm. Combien de centimètres parcourt-il ?`,
    ]);
  else if (f === 4) text = pick([`Combien font ${n} fois 25 ?`, `25 × ${n} = ?`, `Compte de 25 en 25, ${n} fois. Où arrives-tu ?`]);
  else
    text = pick([
      `Un paquet contient 25 cartes. Combien de cartes y a-t-il dans ${n} paquets ?`,
      `${p.nom} range ses billes par sachets de 25. ${maj(p.il)} remplit ${n} sachets. Combien de billes a-t-${p.il} ?`,
      `Un car emmène 25 enfants au zoo. Combien d'enfants partent dans ${n} cars ?`,
      `La bibliothécaire range 25 livres par étagère. Combien de livres sur ${n} étagères ?`,
    ]);
  return qN(
    text,
    r,
    [r + 25, r - 25, r + 10, n * 20, n * 30, r + 5],
    exp("4 × 25 = 100 : quatre fois 25, c'est une centaine.", "On fait des paquets de 4 fois 25 (une centaine), puis on ajoute ce qui reste.", n % 4 === 0 ? `${n} × 25 = ${n / 4} × 100 = ${fmt(r)}.` : `${n} = ${n - (n % 4)} + ${n % 4}. ${n - (n % 4)} × 25 = ${(n - (n % 4)) * 25} et ${n % 4} × 25 = ${(n % 4) * 25}. En tout : ${fmt(r)}.`, `${n} × 25 = ${fmt(r)}.`),
    avec(
      text.includes("pièces de 20 centimes") && n <= 5
        ? { kind: "monnaie", elements: [{ valeur: "20c", nombre: n }, { valeur: "5c", nombre: n }] }
        : parfois(0.5, () => (n <= 8 ? barreEgale(n, "25", null) : undefined)),
    ),
  );
}

function suite25(): Q {
  const k = rint(3, 30);
  const v = 25 * k;
  const p = quelquun();
  return qN(
    pick([
      `On compte de 25 en 25 : … ${fmt(v - 50)}, ${fmt(v - 25)}, ${fmt(v)}… Quel nombre vient ensuite ?`,
      `${p.nom} compte de 25 en 25 et dit ${fmt(v)}. Quel nombre dit-${p.il} juste après ?`,
      `Pic le paille-en-queue saute de 25 en 25. Il est sur ${fmt(v)}. Où sera-t-il au saut suivant ?`,
    ]),
    v + 25,
    [v + 20, v + 30, v + 50, v + 15, v + 35],
    exp("Compter de 25 en 25, c'est ajouter 25 à chaque fois.", "25, c'est 2 dizaines et 5 unités.", `${fmt(v)} + 25 = ${fmt(v + 25)}.`, `Le nombre suivant est ${fmt(v + 25)}.`),
    avec(parfois(0.6, () => baseDix(v))),
  );
}

function combienDe25(): Q {
  const k = pick([2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 40]);
  const t = 25 * k;
  const p = quelquun();
  const text = pick([
    `Combien de fois 25 y a-t-il dans ${fmt(t)} ?`,
    `25 × ? = ${fmt(t)}. Quel nombre manque ?`,
    `Un paquet contient 25 cartes. Combien de paquets faut-il pour avoir ${fmt(t)} cartes ?`,
    `${p.nom} met ${fmt(t)} billes dans des sachets de 25. Combien de sachets remplit-${p.il} ?`,
    `On range ${fmt(t)} livres par étagères de 25. Combien d'étagères faut-il ?`,
    `Un car emmène 25 enfants. Combien de cars pour ${fmt(t)} enfants ?`,
    `Pic le paille-en-queue fait des sauts de 25 cm. Combien de sauts pour parcourir ${fmt(t)} cm ?`,
    `${p.nom} compte de 25 en 25 jusqu'à ${fmt(t)}. Combien de nombres dit-${p.il} ?`,
    `${p.nom} colle ${fmt(t)} images, 25 par page. Combien de pages remplit-${p.il} ?`,
    `La fermière range ${fmt(t)} œufs par plateaux de 25. Combien de plateaux remplit-elle ?`,
  ]);
  return qN(
    text,
    k,
    [k * 2, k + 1, k - 1, k + 4, t / 10, k * 4],
    exp("Dans 100, il y a 4 fois 25.", "On compte les centaines : 4 fois 25 par centaine, puis ce qui reste.", `${fmt(t)} = ${k} × 25, car ${k} × 25 = ${fmt(t)}.`, `Il y a ${k} fois 25 dans ${fmt(t)}.`),
    avec(parfois(0.65, () => (t !== 100 ? barreEgale(4, "25", "100") : barreEgale(4, null, "100")))),
  );
}

function foisDizaines(a: number, b: number, zeros: 1 | 2, situation: boolean): Q {
  const m = zeros === 1 ? 10 : 100;
  const B = b * m;
  const r = a * B;
  const unite = zeros === 1 ? "dizaines" : "centaines";
  const p = quelquun();
  const f = rint(1, situation ? 5 : 4);
  let text: string;
  if (f <= 2) text = poserCalcul(`${a} × ${fmt(B)}`, p);
  else if (f === 3)
    text = pick([
      `${a} fois ${b} ${unite}, quel nombre cela fait-il ?`,
      `${p.nom} prend ${a} fois ${b} ${unite}. Quel nombre obtient-${p.il} ?`,
      `${p.nom} sait que ${a} × ${b} = ${a * b}. Combien font alors ${a} × ${fmt(B)} ?`,
    ]);
  else if (f === 4) text = pick([`${fmt(B)} × ${a} = ?`, `Combien font ${a} fois ${fmt(B)} ?`, `Multiplie ${fmt(B)} par ${a}.`]);
  else text = histoireLots(a, B);
  return qN(
    text,
    r,
    [r * 10, r / 10, a * b, a + B, r + m, r - m],
    exp(
      `${fmt(B)}, c'est ${b} ${unite}.`,
      `On multiplie les ${unite} : ${a} × ${b} ${unite}.`,
      `${a} × ${b} = ${a * b}, donc ${a} × ${b} ${unite} = ${a * b} ${unite} = ${fmt(r)}.`,
      `${a} × ${fmt(B)} = ${fmt(r)}.`,
    ),
    avec(parfois(0.65, () => (a <= 6 ? barreEgale(a, fmt(B), null) : undefined))),
  );
}

function facteurManquant(): Q {
  const a = rint(2, 9);
  const b = rint(2, 9);
  const m = pick([10, 10, 100]);
  const r = a * b * m;
  const p = quelquun();
  return qN(
    pick([
      `Quel nombre manque : ${a} × ? = ${fmt(r)} ?`,
      `${p.nom} cherche le nombre caché : ${a} × ? = ${fmt(r)}.`,
      `${a} paquets identiques contiennent ${fmt(r)} images en tout. Combien d'images dans un paquet ?`,
      `Pic le paille-en-queue dit : « ${a} fois mon nombre, ça fait ${fmt(r)}. » Quel est son nombre ?`,
      `${p.nom} range ${fmt(r)} perles dans ${a} boîtes, autant dans chacune. Combien de perles par boîte ?`,
      `${p.nom} sait que ${a} × ${b} = ${a * b}. Quel nombre faut-il multiplier par ${a} pour obtenir ${fmt(r)} ?`,
      `${a} cars identiques emmènent ${fmt(r)} enfants. Combien d'enfants dans chaque car ?`,
    ]),
    b * m,
    [b, r, b * m * 10, (b + 1) * m, b * m + 1],
    exp(`${fmt(r)}, c'est ${a * b} ${m === 10 ? "dizaines" : "centaines"}.`, `On cherche ce qui, multiplié par ${a}, donne ${a * b} ${m === 10 ? "dizaines" : "centaines"}.`, `${a} × ${b} = ${a * b}, donc ${a} × ${fmt(b * m)} = ${fmt(r)}.`, `Le nombre caché est ${fmt(b * m)}.`),
    avec(parfois(0.4, () => barreEgale(a, null, fmt(r)))),
  );
}

/* ---------------------------------------------------------
   DÉCOMPOSER — sommes et différences, distributivité
--------------------------------------------------------- */

function somme(a: number, b: number, situation: boolean): Q {
  const r = a + b;
  const p = quelquun();
  const dz = b - (b % 10);
  const f = rint(1, situation ? 5 : 4);
  let text: string;
  if (f <= 2) text = poserCalcul(`${a} + ${b}`, p);
  else if (f === 3) text = `Pour calculer ${a} + ${b}, ${p.nom} fait d'abord ${a} + ${dz} = ${a + dz}. Quel est le résultat final ?`;
  else if (f === 4) text = pick([`${a} + ${b} = ?`, `Ajoute ${b} à ${a} dans ta tête.`, `Quelle est la somme de ${a} et de ${b} ?`]);
  else text = histoireAjout(a, b);
  return qN(
    text,
    r,
    [r + 10, r - 10, r + 1, r - 1, a + dz, r + 100],
    exp("On peut couper un nombre en dizaines et en unités pour calculer plus facilement.", `On ajoute d'abord les dizaines de ${b}, puis ses unités.`, `${a} + ${dz} = ${a + dz}, puis ${a + dz} + ${b % 10} = ${r}.`, `${a} + ${b} = ${r}.`),
    avec(parfois(0.65, () => barre([["", String(a)], ["", String(b)]], null))),
  );
}

function difference(a: number, b: number, situation: boolean): Q {
  const r = a - b;
  const p = quelquun();
  const dz = b - (b % 10);
  const f = rint(1, situation ? 5 : 4);
  let text: string;
  if (f <= 2) text = poserCalcul(`${a} − ${b}`, p);
  else if (f === 3) text = `Pour calculer ${a} − ${b}, ${p.nom} fait d'abord ${a} − ${dz} = ${a - dz}. Quel est le résultat final ?`;
  else if (f === 4) text = pick([`${a} − ${b} = ?`, `Enlève ${b} à ${a} dans ta tête.`, `Quelle est la différence entre ${a} et ${b} ?`]);
  else text = histoireRetrait(a, b);
  const inverse = Math.abs((Math.floor(a / 10) - Math.floor(b / 10)) * 10 + Math.abs((a % 10) - (b % 10)));
  return qN(
    text,
    r,
    [r + 10, r - 10, r + 1, r - 1, inverse, a + b],
    exp("On peut couper le nombre qu'on enlève en dizaines et en unités.", `On enlève d'abord les dizaines de ${b}, puis ses unités.`, `${a} − ${dz} = ${a - dz}, puis ${a - dz} − ${b % 10} = ${r}.`, `${a} − ${b} = ${r}.`),
    avec(parfois(0.65, () => barre([["on enlève", String(b)], ["il reste", null]], String(a)))),
  );
}

function parDizaineRonde(): Q {
  const d = rint(2, 9) * 10;
  const u = rint(3, 9);
  const n = d + u;
  const plus = rint(11 - u, 9);
  const versRond = 10 - u;
  const p = quelquun();
  return qN(
    pick([
      `Pour calculer ${n} + ${plus}, on passe par ${d + 10}. Combien reste-t-il à ajouter ensuite ?`,
      `${p.nom} calcule ${n} + ${plus} en passant par ${d + 10}. Après ${n} + ${versRond} = ${d + 10}, combien doit-${p.il} encore ajouter ?`,
      `${n} + ${plus} : on va d'abord jusqu'à ${d + 10}. Il reste combien à ajouter ?`,
      `Pic le paille-en-queue saute de ${n} à ${d + 10}, puis il doit encore avancer pour faire ${n} + ${plus}. De combien ?`,
      `${p.nom} coupe ${plus} en deux morceaux pour calculer ${n} + ${plus} : d'abord ${versRond}, pour aller à ${d + 10}. Quel est l'autre morceau ?`,
      `Pour faire ${n} + ${plus}, ${p.nom} ajoute d'abord ${versRond}. Combien lui reste-t-il à ajouter ?`,
      `${p.nom} a ${n} billes et en gagne ${plus}. ${maj(p.il)} compte d'abord jusqu'à ${d + 10}. Combien de billes lui reste-t-il à compter ?`,
    ]),
    plus - versRond,
    [versRond, plus, plus - versRond + 1, 10 - plus, plus + versRond],
    exp(`Passer par la dizaine ronde, c'est couper ${plus} en deux morceaux.`, `On monte de ${n} à ${d + 10} : il faut ${versRond}. Il reste ce qui manque à ${versRond} pour faire ${plus}.`, `${plus} = ${versRond} + ${plus - versRond}.`, `Il reste ${plus - versRond} à ajouter : ${n} + ${plus} = ${n + plus}.`),
    avec(parfois(0.65, () => baseDix(n))),
  );
}

function distributivite(n0: number, k: number, situation: boolean): Q {
  const n = n0 % 10 === 0 ? n0 + 1 : n0;
  const d = n - (n % 10);
  const u = n % 10;
  const r = n * k;
  const p = quelquun();
  const f = rint(1, situation ? 5 : 4);
  let text: string;
  if (f <= 2) text = poserCalcul(`${n} × ${k}`, p);
  else if (f === 3)
    text = pick([
      `Pour calculer ${n} × ${k}, on fait ${d} × ${k} = ${d * k} et ${u} × ${k} = ${u * k}. Quel est le résultat ?`,
      `${p.nom} calcule ${n} × ${k} en deux morceaux : ${d} × ${k} = ${d * k}, puis ${u} × ${k} = ${u * k}. Que trouve-${tIl(p)} ?`,
      `${p.nom} coupe ${n} en ${d} + ${u} pour calculer ${n} × ${k}. Quel résultat trouve-${tIl(p)} ?`,
    ]);
  else if (f === 4) text = pick([`${k} × ${n} = ?`, `Combien font ${k} fois ${n} ?`, `Multiplie ${n} par ${k} dans ta tête.`]);
  else text = histoireLots(k, n);
  return qN(
    text,
    r,
    [d * k + u, d * k, r + 10, r - 10, d * k + u * k + k, n + k],
    exp(`On coupe ${n} en ${d} + ${u}.`, `On multiplie chaque morceau par ${k}, puis on ajoute.`, `${d} × ${k} = ${d * k} et ${u} × ${k} = ${u * k}. ${d * k} + ${u * k} = ${r}.`, `${n} × ${k} = ${r}.`),
    avec(parfois(0.45, () => barre([["dizaines", String(d)], ["unités", String(u)]], String(n)))),
  );
}

function distribEtape(): Q {
  const n = rint(12, 98);
  const k = rint(3, 9);
  const d = n - (n % 10);
  const u = n % 10 || 1;
  const nn = d + u;
  const p = quelquun();
  if (Math.random() < 0.5)
    return qN(
      pick([
        `Pour calculer ${nn} × ${k}, on coupe ${nn} en ${d} + ${u}. On a déjà ${d} × ${k} = ${d * k}. Quel est le résultat final ?`,
        `${p.nom} calcule ${nn} × ${k}. ${maj(p.il)} a trouvé ${d} × ${k} = ${d * k}. Que trouve-${tIl(p)} à la fin ?`,
      ]),
      nn * k,
      [d * k + u, d * k + k, nn * k + 10, nn * k - 10, d * k * 3],
      exp(`${nn} × ${k} = ${d} × ${k} + ${u} × ${k}.`, `Il reste à calculer ${u} × ${k} et à l'ajouter.`, `${u} × ${k} = ${u * k}, et ${d * k} + ${u * k} = ${nn * k}.`, `${nn} × ${k} = ${nn * k}.`),
    );
  const bon = `${d} × ${k} et ${u} × ${k}`;
  return qM(
    pick([
      `Pour calculer ${nn} × ${k} de tête, quels calculs faciles peut-on faire ?`,
      `${p.nom} coupe ${nn} en ${d} + ${u} pour calculer ${nn} × ${k}. Quels calculs fait-${p.il} ensuite ?`,
    ]),
    bon,
    [`${d} × ${u} et ${k} × ${u}`, `${d} + ${k} et ${u} + ${k}`, `${d} × ${k} seulement`, `${nn} + ${k}`],
    exp("On multiplie chaque morceau du nombre.", `${nn} = ${d} + ${u}.`, `${nn} × ${k} = ${d} × ${k} + ${u} × ${k} = ${d * k} + ${u * k}.`, `On calcule ${bon}, puis on ajoute.`),
  );
}

/* ---------------------------------------------------------
   FLUENCE ET DÉFIS
--------------------------------------------------------- */

function table(a: number, b: number): Q {
  const m = mondeDessinable();
  const p = quelquun();
  const dessin = b <= 5 && a <= 6 && Math.random() < 0.85;
  const text = dessin
    ? pick([`Il y a ${a} groupes de ${b} ${m.des}. Combien font ${a} × ${b} ?`, `${p.nom} voit ${a} paquets de ${b} ${m.des}. Combien font ${a} × ${b} ?`, `${a} × ${b} = ? Le dessin peut t'aider.`])
    : poserCalcul(`${a} × ${b}`, p);
  return qN(
    text,
    a * b,
    [a * b + a, a * b - a, a * b + b, a * b - b, a + b, a * b + 1],
    exp(`${a} × ${b}, c'est ${b} répété ${a} fois.`, "C'est un résultat des tables, à connaître par cœur.", `${a} × ${b} = ${a * b}.`, `${a} × ${b} = ${a * b}.`),
    avec(dessin ? objetsGroupes(m.dessin!, a, b) : parfois(0.4, () => barreEgale(a, String(b), null))),
  );
}

function faitRapide(etoile: Etoile): Q {
  const f = rint(1, 6);
  if (f === 1) return table(rint(2, 9), rint(2, 9));
  if (f === 2) return etoile >= 3 ? moitie(2 * rint(13, 49), false) : double(rint(11, 45), false);
  if (f === 3) return etoile >= 3 ? soustraire(rint(41, 400), pick([9, 19]), false) : ajouter(rint(21, 480), pick([9, 19]), false);
  if (f === 4) return etoile >= 3 ? complement(rint(1, 9) * 10 + rint(1, 9), 100, false, dessinAuHasard()) : foisDizaines(rint(2, 9), rint(2, 9), 1, false);
  if (f === 5) {
    const k = pick([10, 100]);
    const n = k === 10 ? rint(12, 99) : rint(2, 59);
    return qN(
      poserCalcul(`${n} × ${k}`),
      n * k,
      [n * k * 10, n, n + k, n * k + k],
      exp(`Multiplier par ${k}, c'est changer la valeur des chiffres.`, k === 10 ? "Les unités deviennent des dizaines, les dizaines des centaines." : "Les unités deviennent des centaines.", `${n} × ${k} = ${fmt(n * k)}.`, `${n} × ${k} = ${fmt(n * k)}.`),
      avec(parfois(0.65, () => (k === 10 && n < 30 ? baseDix(n) : undefined))),
    );
  }
  return etoile >= 3 ? fois25(rint(2, 12), false) : multiplierParDoubles(rint(11, 25), 4, false);
}

function nombreMystere(): Q {
  const p = quelquun();
  const f = rint(1, 4);
  if (f === 1) {
    const k = pick([9, 19, 8, 18]);
    const x = rint(25, 480);
    return qN(
      pick([
        `${p.nom} pense à un nombre. ${maj(p.il)} ajoute ${k} et trouve ${x + k}. À quel nombre pensait-${p.il} ?`,
        `Je suis un nombre. Si on m'ajoute ${k}, on trouve ${x + k}. Qui suis-je ?`,
        `Pic le paille-en-queue a reçu ${k} graines. Il en a maintenant ${x + k}. Combien en avait-il avant ?`,
      ]),
      x,
      [x + 2 * k, x + 1, x - 1, x + 10, x + k],
      exp("Pour retrouver le nombre de départ, on fait le chemin inverse.", `On a ajouté ${k} : on enlève ${k}.`, `${x + k} − ${k} = ${x}.`, `Le nombre est ${x}.`),
      avec(parfois(0.6, () => barre([["?", null], ["ajouté", String(k)]], String(x + k)))),
    );
  }
  if (f === 2) {
    const a = rint(101, 489);
    const cible = pick([500, 600, 700, 800, 1000].filter((c) => c > a + 10));
    return complement(a, cible, true, dessinAuHasard());
  }
  if (f === 3) {
    const k = rint(2, 9);
    return qN(
      pick([
        `Sans poser l'opération, combien font ${k * 10} × 8 ?`,
        `${p.nom} dit : « ${k} × 8 = ${k * 8}. » Combien font alors ${k * 10} × 8 ?`,
        `Pic le paille-en-queue sait que ${k} × 8 = ${k * 8}. Combien font ${k} × 80 ?`,
      ]),
      k * 80,
      [k * 8, k * 800, k * 80 + 10, k * 80 - 40, k * 80 + 8],
      exp("Multiplier des dizaines, c'est multiplier les chiffres et garder les dizaines.", `${k} × 8 = ${k * 8}, donc ${k} dizaines × 8 = ${k * 8} dizaines.`, `${k * 8} dizaines = ${k * 80}.`, `Le résultat est ${k * 80}.`),
      avec(parfois(0.5, () => barreEgale(8, String(k * 10), null))),
    );
  }
  const n = rint(2, 9);
  const r = 4 * 25 * n;
  return qN(
    pick([
      `Calcule astucieusement : 4 × ${n} × 25.`,
      `${p.nom} doit calculer 25 × ${n} × 4. Quel est le résultat ?`,
      `Pic le paille-en-queue range ${n} sachets de 25 graines dans chacun de ses 4 nids. Combien de graines en tout ?`,
    ]),
    r,
    [r / 10, r + 100, r - 100, 25 * n, r * 2],
    exp("On peut multiplier dans l'ordre qu'on veut.", "4 × 25 = 100 : on commence par là.", `4 × 25 = 100, puis 100 × ${n} = ${r}.`, `Le résultat est ${fmt(r)}.`),
  );
}

function choisirProcedure(): Q {
  const p = quelquun();
  const f = rint(1, 5);
  const n = rint(120, 880);
  const cas =
    f === 1
      ? { calc: `${n} + 19`, bon: "ajouter 20, puis enlever 1", faux: ["ajouter 20, puis ajouter 1", "ajouter 10, puis enlever 9", "poser l'opération en colonnes"] }
      : f === 2
        ? { calc: `${n} − 19`, bon: "enlever 20, puis ajouter 1", faux: ["enlever 20, puis enlever 1", "enlever 10, puis ajouter 9", "ajouter 19, puis enlever 1"] }
        : f === 3
          ? { calc: `${rint(12, 49)} × 4`, bon: "doubler, puis doubler encore", faux: ["doubler trois fois", "ajouter 4", "doubler, puis ajouter 2"] }
          : f === 4
            ? { calc: `${rint(12, 30)} × 8`, bon: "doubler trois fois", faux: ["doubler deux fois", "doubler, puis ajouter 8", "multiplier par 4, puis ajouter 4"] }
            : { calc: `${n} + 9`, bon: "ajouter 10, puis enlever 1", faux: ["ajouter 10, puis ajouter 1", "enlever 10, puis ajouter 1", "ajouter 9 aux dizaines"] };
  return qM(
    pick([
      `Pour calculer ${cas.calc} de tête, quelle est la façon la plus sûre ?`,
      `${p.nom} veut calculer ${cas.calc} sans poser l'opération. Que lui conseilles-tu ?`,
      `Pic le paille-en-queue doit calculer ${cas.calc} très vite. Quelle méthode choisir ?`,
    ]),
    cas.bon,
    cas.faux,
    exp("Calculer de tête, c'est choisir un chemin facile avec des nombres ronds.", "On remplace le nombre difficile par un nombre rond, puis on corrige.", `Pour ${cas.calc} : ${cas.bon}.`, `La bonne méthode : ${cas.bon}.`),
    avec(f === 1 || f === 2 || f === 5 ? parfois(0.6, () => baseDix(n)) : undefined),
  );
}

/* =========================================================
   LES ITEMS
========================================================= */

const GABARITS: TutorBankItemV4[] = [
  // ce2_calcul_complements
  g("ce2_calcul_complement_tpl_001_a_cent", "ce2_calcul_complements", 2, "Va d'abord à la dizaine du dessus, puis jusqu'à 100.", ["complement"], () =>
    complement(rint(1, 9) * 10 + rint(1, 9), 100, Math.random() < 0.4, dessinAuHasard()),
  ),
  g("ce2_calcul_complement_tpl_002_a_mille", "ce2_calcul_complements", 3, "Passe d'abord à la centaine du dessus, puis jusqu'à 1 000.", ["complement"], () =>
    Math.random() < 0.75
      ? complement(rint(1, 9) * 100 + rint(1, 9) * 10, 1000, true, dessinAuHasard())
      : complement(rint(1, 9) * 10 + rint(1, 9), 100, true, dessinAuHasard()),
  ),
  g("ce2_calcul_complement_tpl_003_centaine_superieure", "ce2_calcul_complements", 4, "Monte d'abord à la dizaine ronde, puis à la centaine.", ["complement"], () => {
    const f = rint(1, 3);
    if (f === 1) {
      const n = rint(101, 899);
      return complement(n % 100 === 0 ? n + 7 : n, Math.ceil((n + 1) / 100) * 100, true, pick(["barre", "aucun"] as const));
    }
    if (f === 2) return complement(rint(101, 989), 1000, true, pick(["barre", "aucun", "base"] as const));
    const n = rint(1, 8) * 1000 + rint(1, 9) * 100;
    return complement(n, Math.ceil(n / 1000) * 1000, true, pick(["barre", "aucun"] as const));
  }),

  // ce2_calcul_doubles_moities
  g("ce2_calcul_double_tpl_001", "ce2_calcul_doubles_moities", 2, "Double les dizaines, double les unités, puis rassemble.", ["double"], () =>
    double(rint(11, 49), Math.random() < 0.4),
  ),
  g("ce2_calcul_moitie_tpl_001", "ce2_calcul_doubles_moities", 3, "Coupe le nombre en morceaux faciles à partager en deux.", ["moitie"], () =>
    Math.random() < 0.7 ? moitie(2 * rint(7, 49), true) : moitie(pick([100, 120, 140, 160, 180, 200, 240, 300, 360, 400, 500, 600, 800, 1000]), true),
  ),
  g("ce2_calcul_double_moitie_tpl_002_enchainement", "ce2_calcul_doubles_moities", 5, "Fais une étape après l'autre.", ["double", "moitie"], doubleMoitieEnchaine),

  // ce2_calcul_decomposer
  g("ce2_calcul_decomposer_tpl_001_somme", "ce2_calcul_decomposer", 3, "Ajoute d'abord les dizaines, puis les unités.", ["decomposer"], () =>
    Math.random() < 0.7 ? somme(rint(23, 79), rint(12, 59), true) : somme(rint(120, 680), rint(21, 89), true),
  ),
  g("ce2_calcul_decomposer_tpl_002_difference", "ce2_calcul_decomposer", 4, "Enlève d'abord les dizaines, puis les unités.", ["decomposer"], () => {
    const a = rint(45, 99);
    return Math.random() < 0.7 ? difference(a, rint(12, a - 11), true) : difference(rint(150, 900), rint(21, 89), true);
  }),
  g("ce2_calcul_decomposer_tpl_003_dizaine_ronde", "ce2_calcul_decomposer", 4, "Va jusqu'à la dizaine ronde, puis ajoute le reste.", ["decomposer"], parDizaineRonde),

  // ce2_calcul_ajouter_9_19
  g("ce2_calcul_ajouter9_tpl_001", "ce2_calcul_ajouter_9_19", 2, "Ajouter 9, c'est ajouter 10 puis enlever 1.", ["ajouter_9"], () =>
    ajouter(Math.random() < 0.6 ? rint(21, 89) : rint(120, 480), pick([8, 9]), Math.random() < 0.3),
  ),
  g("ce2_calcul_ajouter8_18_tpl_002", "ce2_calcul_ajouter_9_19", 4, "Ajouter 19, c'est ajouter 20 puis enlever 1.", ["ajouter_19"], () =>
    Math.random() < 0.2 ? etapeSuivante(true) : ajouter(rint(120, 980), pick([18, 19, 9]), true),
  ),

  // ce2_calcul_soustraire_9_19
  g("ce2_calcul_soustraire9_tpl_001", "ce2_calcul_soustraire_9_19", 3, "Enlever 9, c'est enlever 10 puis rajouter 1.", ["soustraire_9"], () =>
    soustraire(Math.random() < 0.5 ? rint(31, 99) : rint(120, 680), pick([9, 19]), true),
  ),
  g("ce2_calcul_soustraire9_tpl_003", "ce2_calcul_soustraire_9_19", 4, "Enlever 29, c'est enlever 30 puis rajouter 1.", ["soustraire_29"], () =>
    Math.random() < 0.4 ? soustraire(rint(1010, 4900), 9, true) : soustraire(rint(150, 980), pick([19, 29]), true),
  ),
  g("ce2_calcul_soustraire9_tpl_002_etape", "ce2_calcul_soustraire_9_19", 5, "On a enlevé un peu trop : on corrige.", ["soustraire_39"], () =>
    Math.random() < 0.4 ? etapeSuivante(false) : soustraire(rint(200, 990), pick([29, 39]), true),
  ),

  // ce2_calcul_multiplier_4_8
  g("ce2_calcul_x4_x8_tpl_001", "ce2_calcul_multiplier_4_8", 3, "Multiplier par 4, c'est doubler deux fois.", ["multiplier_4_8"], () =>
    Math.random() < 0.65 ? multiplierParDoubles(rint(11, 49), 4, true) : multiplierParDoubles(rint(6, 25), 8, true),
  ),
  g("ce2_calcul_x8_tpl_002_etapes", "ce2_calcul_multiplier_4_8", 5, "Multiplier par 8, c'est doubler trois fois.", ["multiplier_8"], x8Etapes),

  // ce2_calcul_multiples_25
  g("ce2_calcul_multiples25_tpl_001", "ce2_calcul_multiples_25", 3, "4 × 25 = 100.", ["multiples_25"], () =>
    Math.random() < 0.25 ? suite25() : fois25(pick([2, 3, 4, 5, 6, 7, 8, 10, 12, 16, 20]), true),
  ),
  g("ce2_calcul_multiples25_tpl_002_combien_de_fois", "ce2_calcul_multiples_25", 4, "Dans 100, il y a 4 fois 25.", ["multiples_25"], combienDe25),
  g("ce2_calcul_multiples25_tpl_003_monnaie", "ce2_calcul_multiples_25", 4, "Compte les centaines : 4 fois 25 dans chacune.", ["multiples_25"], () =>
    Math.random() < 0.5 ? fois25(pick([9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40]), true) : suite25(),
  ),

  // ce2_calcul_dizaines_entieres
  g("ce2_calcul_dizaines_tpl_001", "ce2_calcul_dizaines_entieres", 2, "Multiplie les chiffres, et garde les dizaines.", ["dizaines"], () =>
    foisDizaines(rint(2, 9), rint(2, 9), 1, Math.random() < 0.3),
  ),
  g("ce2_calcul_dizaines_tpl_003_centaines", "ce2_calcul_dizaines_entieres", 4, "Multiplie les chiffres, et garde les centaines.", ["centaines"], () =>
    foisDizaines(rint(2, 9), rint(2, 9), Math.random() < 0.7 ? 2 : 1, true),
  ),
  g("ce2_calcul_dizaines_tpl_002_facteur_manquant", "ce2_calcul_dizaines_entieres", 5, "Pense à la table, puis aux dizaines.", ["facteur_manquant"], facteurManquant),

  // ce2_calcul_distributivite
  g("ce2_calcul_distributivite_tpl_001", "ce2_calcul_distributivite", 4, "Coupe le nombre en dizaines et unités.", ["distributivite"], () =>
    distributivite(rint(12, 98), rint(3, 9), true),
  ),
  g("ce2_calcul_distributivite_tpl_003_onze_dix_neuf", "ce2_calcul_distributivite", 4, "11 fois, c'est 10 fois plus 1 fois.", ["distributivite"], () => {
    const k = rint(2, 9);
    const n = pick([11, 12, 15, 19, 21]);
    return distributivite(n, k, true);
  }),
  g("ce2_calcul_distributivite_tpl_002_etape", "ce2_calcul_distributivite", 5, "Additionne les deux morceaux.", ["distributivite"], distribEtape),

  // ce2_calcul_fluence
  g("ce2_calcul_fluence_tpl_001_tables", "ce2_calcul_fluence", 1, "C'est un résultat des tables.", ["fluence", "tables"], () => table(rint(2, 9), rint(2, 9))),
  g("ce2_calcul_fluence_tpl_002_melange", "ce2_calcul_fluence", 2, "Chaque famille a son raccourci : sers-t'en.", ["fluence"], () => faitRapide(2)),
  g("ce2_calcul_fluence_tpl_003_faits", "ce2_calcul_fluence", 3, "Un fait connu par cœur va plus vite qu'un calcul.", ["fluence"], () => faitRapide(3)),

  // ce2_calcul_defi
  g("ce2_calcul_defi_tpl_001_chemin_le_plus_court", "ce2_calcul_defi", 4, "Cherche le chemin le plus court.", ["defi"], nombreMystere),
  g("ce2_calcul_defi_tpl_002_complement_manquant", "ce2_calcul_defi", 4, "Monte jusqu'au nombre rond, puis continue.", ["defi"], () =>
    Math.random() < 0.5 ? complement(rint(101, 489), pick([500, 600, 700, 800, 1000]), true, dessinAuHasard()) : nombreMystere(),
  ),
  g("ce2_calcul_defi_tpl_003_choisir_la_procedure", "ce2_calcul_defi", 5, "Remplace par un nombre rond, puis corrige.", ["defi"], () =>
    Math.random() < 0.5 ? choisirProcedure() : nombreMystere(),
  ),
];

export const calculBank: TutorBankItemV4[] = [...FIXES, ...GABARITS];
