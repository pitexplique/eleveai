// lib/tutor-v4/questionBank/ce2/maths/probleme.bank.ts
//
// PÉRIMÈTRE BO : résolution de problèmes jusqu'à 10 000 (BO n° 41 du
// 31 octobre 2024, cycle 2). Le programme ne demande pas « des problèmes » : il
// en nomme SIX types, et trois d'entre eux n'existaient nulle part dans
// l'application avant le 05/08/2026 — la comparaison multiplicative, le produit
// cartésien, et le problème mixte à trois étapes.
//
//   1. additif en une étape, de type parties-tout
//   2. additif de comparaison en une étape
//   3. additif en deux étapes
//   4. multiplicatif en une étape
//   5. mixte en deux ou trois étapes
//   6. comparaison multiplicative en une étape, et produit cartésien
//
// ⚠️ Aucun résultat ni aucun piège ne descend sous zéro : les nombres relatifs
// entrent en 5e. On ne retire jamais plus qu'il n'y a.
//
// ⛔ LES SQUELETTES (10/11/2026). Mesuré avec scripts/mesurer-squelettes-coach.ts :
// 8 des 10 micros étaient sous le seuil (6 à 252 squelettes, jusqu'à 18
// répétitions sur 20), et 3 contextes sur 7 venaient de La Réunion. Chaque
// gabarit tire maintenant une FAMILLE, une RÉSERVE (23 mondes d'enfant et
// métiers : pirates, boulangère, vétérinaire, astronaute, cirque… ; La Réunion
// une fois sur 23), une TOURNURE et un enfant de la troupe.
// ⭐ Dessins : schéma en barres (parties-tout, comparaison, parts égales),
// objets en groupes ou en vrac (choisir l'opération), billet (achats),
// tableau des associations (produit cartésien). Outils : ./outils-calcul-ce2.ts.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  type Etoile,
  type Prenom,
  type Q,
  barre,
  barreEgale,
  de,
  deuxPersonnes,
  exp,
  fmt,
  gabarit,
  maj,
  mondeDessinable,
  objetsEnVrac,
  objetsGroupes,
  pick,
  qM,
  qN,
  que,
  quelquun,
  rint,
  shuffle,
} from "./outils-calcul-ce2";

/* =========================================================
   LES ITEMS FIGÉS (gardés tels quels)
========================================================= */

const FIXES: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "ce2_probleme_comparaison_fixed_001_de_plus_que",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_comparaison",
    difficulty: 3,
    theme: "neutral",
    text: "Maëva a 340 billes. Elle en a 85 de plus que Ryan. Combien Ryan a-t-il de billes ?",
    format: "qcm",
    choices: ["255", "425", "85", "340"],
    expected: ["255"],
    comparator: "mcq_exact",
    hint: "« de plus que » ne veut pas dire qu'il faut ajouter : ici c'est Maëva qui en a le plus.",
    explanation: exp(
      "Un problème de comparaison relie deux quantités par un écart.",
      "On repère qui en a le plus. Ici c'est Maëva : pour trouver Ryan, on enlève l'écart.",
      "340 − 85 = 255.",
      "Ryan a 255 billes.",
    ),
    tags: ["ce2", "probleme", "comparaison", "qcm", "piege"],
  },
  {
    kind: "fixed",
    id: "ce2_probleme_compmult_fixed_001_fois_plus",
    niveau: "ce2",
    matiere: "maths",
    notionId: "probleme",
    microId: "ce2_probleme_comparaison_multiplicative",
    difficulty: 4,
    theme: "neutral",
    text: "Tom a 7 billes. Noé en a 4 fois plus. Combien Noé a-t-il de billes ?",
    format: "qcm",
    choices: ["28", "11", "3", "7"],
    expected: ["28"],
    comparator: "mcq_exact",
    hint: "« 4 fois plus », ce n'est pas « 4 de plus ».",
    explanation: exp(
      "« Fois plus » compare par multiplication, pas par addition.",
      "On multiplie la quantité de départ par le nombre de fois.",
      "7 × 4 = 28. Si Noé en avait eu « 4 de plus », il en aurait eu 11 seulement.",
      "Noé a 28 billes.",
    ),
    tags: ["ce2", "probleme", "comparaison_multiplicative", "qcm", "piege"],
  },
];

/* =========================================================
   LES GABARITS — une famille × une situation × une tournure
========================================================= */

const N = "probleme";
const g = (id: string, microId: string, difficulty: Etoile, hint: string, tags: string[], gen: () => Q) =>
  gabarit({ id, notionId: N, microId, difficulty, hint, tags: ["probleme", ...tags] }, gen);

const parfois = <T,>(p: number, f: () => T | undefined): T | undefined => (Math.random() < p ? f() : undefined);
const avec = (canvas: Q["canvas"] | undefined): Partial<Q> => (canvas ? { canvas } : {});

/* ---------------------------------------------------------
   LES RÉSERVES — qui possède quoi, et comment ça bouge.
   `sujet` absent : c'est un enfant de la troupe qui possède.
   Les objets se comptent par centaines ou par milliers sans
   que la phrase sonne faux (pas « 3 000 pommes »).
   La Réunion : environ une réserve sur vingt-cinq.
--------------------------------------------------------- */

type Reserve = {
  sujet?: string;
  fem?: boolean;
  un: string;
  des: string;
  plus: string;
  moins: string;
  /** Le participe de `moins`, accordé avec l'objet : « prêtés », « vendues ». */
  moinsPp: string;
};

const RESERVES: readonly Reserve[] = [
  { un: "bille", des: "billes", plus: "gagne", moins: "perd", moinsPp: "perdues" },
  { un: "image", des: "images", plus: "reçoit", moins: "donne", moinsPp: "données" },
  { un: "point", des: "points", plus: "gagne", moins: "perd", moinsPp: "perdus" },
  { un: "perle", des: "perles", plus: "achète", moins: "utilise", moinsPp: "utilisées" },
  { un: "timbre", des: "timbres", plus: "reçoit", moins: "échange", moinsPp: "échangés" },
  { un: "carte", des: "cartes", plus: "gagne", moins: "donne", moinsPp: "données" },
  { sujet: "La bibliothèque", fem: true, un: "livre", des: "livres", plus: "achète", moins: "prête", moinsPp: "prêtés" },
  { sujet: "Le capitaine pirate", un: "pièce d'or", des: "pièces d'or", plus: "trouve", moins: "dépense", moinsPp: "dépensées" },
  { sujet: "La fermière", fem: true, un: "œuf", des: "œufs", plus: "ramasse", moins: "vend", moinsPp: "vendus" },
  { sujet: "La boulangère", fem: true, un: "croissant", des: "croissants", plus: "prépare", moins: "vend", moinsPp: "vendus" },
  { sujet: "Le jardinier", un: "graine", des: "graines", plus: "achète", moins: "sème", moinsPp: "semées" },
  { sujet: "Le cirque", un: "billet", des: "billets", plus: "imprime", moins: "vend", moinsPp: "vendus" },
  { sujet: "Le magasin de jouets", un: "ballon", des: "ballons", plus: "reçoit", moins: "vend", moinsPp: "vendus" },
  { sujet: "La cantine", fem: true, un: "yaourt", des: "yaourts", plus: "reçoit", moins: "sert", moinsPp: "servis" },
  { sujet: "Le fleuriste", un: "fleur", des: "fleurs", plus: "reçoit", moins: "vend", moinsPp: "vendues" },
  { sujet: "Le chef pâtissier", un: "cookie", des: "cookies", plus: "prépare", moins: "vend", moinsPp: "vendus" },
  { sujet: "Le musée des dinosaures", un: "fossile", des: "fossiles", plus: "reçoit", moins: "prête", moinsPp: "prêtés" },
  { sujet: "La vétérinaire", fem: true, un: "vaccin", des: "vaccins", plus: "commande", moins: "utilise", moinsPp: "utilisés" },
  { sujet: "L'astronaute Zoé", fem: true, un: "photo", des: "photos", plus: "prend", moins: "envoie", moinsPp: "envoyées" },
  { sujet: "Le vendeur de glaces", un: "cornet", des: "cornets", plus: "reçoit", moins: "vend", moinsPp: "vendus" },
  { sujet: "La maîtresse", fem: true, un: "cahier", des: "cahiers", plus: "commande", moins: "distribue", moinsPp: "distribués" },
  { sujet: "Le pompier", un: "mètre de tuyau", des: "mètres de tuyau", plus: "déroule", moins: "range", moinsPp: "rangés" },
  { sujet: "Le marchand de Saint-Pierre", un: "letchi", des: "letchis", plus: "cueille", moins: "vend", moinsPp: "vendus" },
];

const reserve = () => pick(RESERVES);
/** Énoncés courts (CE2) : un sujet de plus de deux mots (« Le magasin de jouets »)
 *  cède la place à un enfant de la troupe. */
const court = (r: Reserve): Reserve => (r.sujet && r.sujet.split(" ").length > 2 ? { ...r, sujet: undefined, fem: undefined } : r);
/** Une réserve dont l'objet tient en deux mots au plus (pas « mètres de tuyau »). */
const reserveCourte = () => court(pick(RESERVES.filter((x) => x.des.split(" ").length <= 2)));
/** Ce qu'un ENFANT possède (pas des vaccins ni des yaourts). */
const aEnfant = () => pick(RESERVES.filter((x) => !x.sujet || ["livres", "pièces d'or", "graines", "fleurs", "cookies"].includes(x.des)));
/** Ce qui se range dans des boîtes ou des cartons (pas des points, pas des mètres). */
const rangeable = () => pick(RESERVES.filter((x) => !["points", "mètres de tuyau", "photos"].includes(x.des)));

/** Le sujet de la phrase et son pronom. */
function qui(r: Reserve, p: Prenom): { S: string; il: string } {
  return r.sujet ? { S: r.sujet, il: r.fem ? "elle" : "il" } : { S: p.nom, il: p.il };
}

/** Le sujet au milieu d'une phrase : « le cirque », « Nina ». */
const sujetMilieu = (r: Reserve, p: Prenom) => (r.sujet ? r.sujet.charAt(0).toLowerCase() + r.sujet.slice(1) : p.nom);

/** « vendues » → « vendu » (passé composé) ; → « vendue » (une partie est vendue). */
const ppMasc = (r: Reserve) => r.moinsPp.replace(/(es|s)$/, "");
const ppFem = (r: Reserve) => `${ppMasc(r)}e`;

/** « Combien de billes a-t-il ? » — de / d' devant voyelle. */
const combienDe = (r: Reserve) => `Combien ${de(r.des)}`;

/* ---------------------------------------------------------
   CHOISIR L'OPÉRATION
--------------------------------------------------------- */

const OPS = ["une addition", "une soustraction", "une multiplication", "une division"];

function choisirOperation(etoile: Etoile): Q {
  const r = reserveCourte();
  const re = aEnfant();
  const p = quelquun();
  const { S, il } = qui(r, p);
  const grand = etoile >= 4;
  const f = rint(1, grand ? 6 : 4);
  let text: string;
  let bon: string;
  let pourquoi: string;
  let canvas: Q["canvas"] | undefined;
  const m = mondeDessinable();
  if (f === 1) {
    const a = grand ? rint(120, 2400) : rint(12, 60);
    const b = grand ? rint(45, 900) : rint(5, 30);
    text = pick([
      `${S} a ${fmt(a)} ${r.des}. ${maj(il)} en ${r.plus} ${fmt(b)}. Combien en a-t-${il} ?`,
      `${S} a ${fmt(a)} ${r.des} lundi et en ${r.plus} ${fmt(b)} mardi. Combien en tout ?`,
    ]);
    bon = "une addition";
    pourquoi = "la quantité augmente : on rassemble deux parts.";
    canvas = parfois(0.5, () => barre([["", fmt(a)], ["", fmt(b)]], null));
  } else if (f === 2) {
    const a = grand ? rint(500, 4800) : rint(30, 90);
    const b = grand ? rint(45, 400) : rint(5, 25);
    text = pick([
      `${S} a ${fmt(a)} ${r.des}. ${maj(il)} en ${r.moins} ${fmt(b)}. Combien lui en reste-t-il ?`,
      `${S} avait ${fmt(a)} ${r.des}. ${fmt(b)} sont ${r.moinsPp}. Combien en reste-t-il ?`,
    ]);
    bon = "une soustraction";
    pourquoi = "la quantité diminue : on enlève une part.";
    canvas = parfois(0.5, () => barre([["", fmt(b)], ["reste", null]], fmt(a)));
  } else if (f === 3) {
    const k = rint(3, grand ? 9 : 5);
    const n = grand ? rint(12, 60) : rint(2, 5);
    text = pick([
      `${p.nom} a ${k} sachets de ${n} ${m.des}. Combien ${de(m.des)} a-t-${p.il} en tout ?`,
      `${maj(m.ou)}, on voit ${k} groupes de ${n} ${m.des}. Combien ${de(m.des)} en tout ?`,
      `Il y a ${k} rangées de ${n} ${m.des}. Combien ${de(m.des)} y a-t-il ?`,
    ]);
    bon = "une multiplication";
    pourquoi = "la même quantité se répète plusieurs fois.";
    canvas = !grand ? parfois(0.7, () => objetsGroupes(m.dessin!, k, n)) : parfois(0.5, () => barreEgale(k, String(n), null));
  } else if (f === 4) {
    const k = rint(2, grand ? 9 : 5);
    const q = rint(2, grand ? 9 : 6);
    text = pick([
      `${p.nom} partage ${k * q} ${m.des} entre ${k} amis, à parts égales. Combien chacun en reçoit-il ?`,
      `On range ${k * q} ${m.des} par paquets de ${k}. Combien de paquets fait-on ?`,
      `${p.nom} met ${k * q} ${m.des} dans ${k} boîtes, autant dans chacune. Combien par boîte ?`,
    ]);
    bon = "une division";
    pourquoi = "on partage un tout en parts égales.";
    canvas = k * q <= 30 ? parfois(0.7, () => objetsEnVrac(m.dessin!, k * q)) : undefined;
  } else if (f === 5) {
    const a = rint(120, 900);
    const b = rint(15, 90);
    const [x, y] = deuxPersonnes();
    const ecart = Math.random() < 0.5;
    text = ecart
      ? `${x.nom} a ${a} ${re.des} et ${y.nom} ${b}. Combien ${x.nom} en a-t-${x.il} de plus ?`
      : `${x.nom} a ${a} ${re.des}. ${y.nom} en a ${b} de plus. Combien ${y.nom} en a-t-${y.il} ?`;
    bon = ecart ? "une soustraction" : "une addition";
    pourquoi = bon === "une addition" ? "on connaît la petite quantité et l'écart : on ajoute l'écart." : "on cherche un écart entre deux quantités.";
  } else {
    const k = rint(2, 5);
    const n = rint(12, 90);
    const [x, y] = deuxPersonnes();
    text = `${x.nom} a ${n} ${re.des}. ${y.nom} en a ${k} fois plus. Combien ${y.nom} en a-t-${y.il} ?`;
    bon = "une multiplication";
    pourquoi = `« ${k} fois plus », c'est ${k} fois la même quantité.`;
    canvas = parfois(0.5, () => barreEgale(k, String(n), null));
  }
  return qM(
    `${text}\n\nQuelle opération choisir ?`,
    bon,
    OPS,
    exp(
      "Choisir l'opération, c'est reconnaître ce que l'histoire fait à la quantité.",
      "On regarde si la quantité augmente, diminue, se répète à l'identique ou se partage en parts égales.",
      `Ici, ${pourquoi}`,
      `Il faut choisir ${bon}.`,
    ),
    avec(canvas),
  );
}

/* ---------------------------------------------------------
   UNE ÉTAPE : le tout, une part, le départ
--------------------------------------------------------- */

function leTout(): Q {
  const r = reserveCourte();
  const p = quelquun();
  const { S, il } = qui(r, p);
  const a = rint(120, 3800);
  const b = rint(90, 2400);
  const t = a + b;
  const couleurs = ["billes", "perles", "images", "cartes"].includes(r.des);
  const text = pick([
    `${S} a ${fmt(a)} ${r.des}. ${maj(il)} en ${r.plus} ${fmt(b)}. Combien en a-t-${il} ?`,
    `${S} compte ${fmt(a)} ${r.des} le matin et ${fmt(b)} le soir. Combien en tout ?`,
    `${S} range ${fmt(a)} ${r.des} dans une boîte et ${fmt(b)} dans une autre. Combien en tout ?`,
    `Le zoo accueille ${fmt(a)} visiteurs samedi et ${fmt(b)} dimanche. Combien en tout ?`,
    `Le cirque vend ${fmt(a)} billets au premier spectacle et ${fmt(b)} au second. Combien en tout ?`,
    couleurs
      ? `${p.nom} a ${fmt(a)} ${r.des} rouges et ${fmt(b)} bleues. Combien en a-t-${p.il} ?`
      : `${S} a ${fmt(a)} ${r.des}. ${p.nom} lui en apporte ${fmt(b)}. Combien en tout ?`,
  ]);
  return qN(
    text,
    t,
    [a - b > 0 ? a - b : b - a, t + 100, t - 100, t + 10, t - 10, t + 1000],
    exp("Un problème parties-tout donne deux parts et demande le tout.", "On rassemble les deux parts : c'est une addition.", `${fmt(a)} + ${fmt(b)} = ${fmt(t)}.`, `En tout : ${fmt(t)}.`),
    avec(parfois(0.55, () => barre([["", fmt(a)], ["", fmt(b)]], null))),
  );
}

function unePart(): Q {
  const r = reserveCourte();
  const p = quelquun();
  const { S, il } = qui(r, p);
  const t = rint(800, 4800);
  const a = rint(150, t - 120);
  const b = t - a;
  const text = pick([
    `${S} a ${fmt(t)} ${r.des}. ${fmt(a)} sont ${/es$/.test(r.moinsPp) ? "rangées" : "rangés"}. Combien reste-t-il à ranger ?`,
    `${S} avait ${fmt(t)} ${r.des}. ${maj(il)} en ${r.moins} ${fmt(a)}. Combien lui en reste-t-il ?`,
    `${S} veut ${fmt(t)} ${r.des}. ${maj(il)} en a ${fmt(a)}. Combien lui en manque-t-il ?`,
    `Sur ${fmt(t)} ${r.des}, ${fmt(a)} sont ${r.moinsPp}. Combien ne le sont pas ?`,
    `Le train transporte ${fmt(t)} voyageurs. ${fmt(a)} descendent. Combien en reste-t-il ?`,
    `${p.nom} lit un livre de ${fmt(t)} pages. ${maj(p.il)} en a lu ${fmt(a)}. Combien en reste-t-il ?`,
  ]);
  return qN(
    text,
    b,
    [t + a, b + 100, b - 100, b + 10, b - 10, a],
    exp("On connaît le tout et une part : on cherche l'autre part.", "On enlève la part connue du tout : c'est une soustraction.", `${fmt(t)} − ${fmt(a)} = ${fmt(b)}. Vérification : ${fmt(a)} + ${fmt(b)} = ${fmt(t)}.`, `La réponse est ${fmt(b)}.`),
    avec(parfois(0.55, () => barre([["connu", fmt(a)], ["?", null]], fmt(t)))),
  );
}

function leDepart(): Q {
  const r = reserveCourte();
  const p = quelquun();
  const { S, il } = qui(r, p);
  const x = rint(1200, 5800);
  const d = rint(150, 2800);
  const moins = Math.random() < 0.6;
  const fin = moins ? x - d : x + d;
  if (fin <= 0) return leDepart();
  const text = moins
    ? pick([
        `${S} ${r.moins} ${fmt(d)} ${r.des}. Il lui en reste ${fmt(fin)}. Combien en avait-${il} ?`,
        `${S} a ${ppMasc(r)} ${fmt(d)} ${r.des}. Il en reste ${fmt(fin)}. Combien y en avait-il avant ?`,
        `Après en avoir ${ppMasc(r)} ${fmt(d)}, ${sujetMilieu(r, p)} a ${fmt(fin)} ${r.des}. Combien au début ?`,
      ])
    : pick([
        `${S} ${r.plus} ${fmt(d)} ${r.des}. ${maj(il)} en a maintenant ${fmt(fin)}. Combien en avait-${il} ?`,
        `Après en avoir reçu ${fmt(d)}, ${sujetMilieu(r, p)} a ${fmt(fin)} ${r.des}. Combien avant ?`,
      ]);
  return qN(
    text,
    x,
    moins ? [fin - d, x + 10, x - 10, x + 100, d] : [fin + d, x + 10, x - 10, x - 100, d],
    exp(
      "On connaît la fin de l'histoire et le changement : on cherche le début.",
      moins ? "On a enlevé : pour revenir au début, on rajoute." : "On a ajouté : pour revenir au début, on enlève.",
      moins ? `${fmt(fin)} + ${fmt(d)} = ${fmt(x)}.` : `${fmt(fin)} − ${fmt(d)} = ${fmt(x)}.`,
      `Au départ, il y en avait ${fmt(x)}.`,
    ),
    avec(parfois(0.55, () => (moins ? barre([["parti", fmt(d)], ["reste", fmt(fin)]], null) : barre([["avant", null], ["reçu", fmt(d)]], fmt(fin))))),
  );
}

/* ---------------------------------------------------------
   COMPARER : « de plus que », « de moins que », l'écart
--------------------------------------------------------- */

function comparaison(): Q {
  const r = aEnfant();
  const [x, y] = deuxPersonnes();
  const a = rint(120, 980);
  const e = rint(15, Math.min(400, a - 20));
  const f = rint(1, 5);
  if (f === 1)
    return qN(
      pick([
        `${x.nom} a ${a} ${r.des}. ${y.nom} en a ${e} de plus. Combien ${y.nom} en a-t-${y.il} ?`,
        `${y.nom} a ${e} ${r.des} de plus ${que(x.nom)}, qui en a ${a}. Combien pour ${y.nom} ?`,
      ]),
      a + e,
      [a - e, e, a + e + 10, a + e - 10, a],
      exp("« De plus » : l'autre en a davantage.", "On ajoute l'écart à la quantité connue.", `${a} + ${e} = ${a + e}.`, `${y.nom} en a ${a + e}.`),
      avec(parfois(0.55, () => barre([[x.nom, String(a)], ["de plus", String(e)]], null))),
    );
  if (f === 2)
    return qN(
      pick([
        `${x.nom} a ${a} ${r.des}, ${e} de plus ${que(y.nom)}. Combien ${y.nom} en a-t-${y.il} ?`,
        `${x.nom} a ${a} ${r.des} : c'est ${e} de plus ${que(y.nom)}. Combien pour ${y.nom} ?`,
      ]),
      a - e,
      [a + e, e, a - e + 10, a - e - 10, a],
      exp("Un problème de comparaison relie deux quantités par un écart.", `On repère qui en a le plus : c'est ${x.nom}. Pour trouver ${y.nom}, on enlève l'écart.`, `${a} − ${e} = ${a - e}.`, `${y.nom} en a ${a - e}.`),
      avec(parfois(0.55, () => barre([[y.nom, null], ["écart", String(e)]], String(a)))),
    );
  if (f === 3)
    return qN(
      pick([
        `${x.nom} a ${a} ${r.des}. ${y.nom} en a ${e} de moins. Combien ${y.nom} en a-t-${y.il} ?`,
        `${y.nom} a ${e} ${r.des} de moins ${que(x.nom)}, qui en a ${a}. Combien pour ${y.nom} ?`,
      ]),
      a - e,
      [a + e, e, a - e + 10, a - e - 10],
      exp("« De moins » : l'autre en a moins.", "On enlève l'écart à la quantité connue.", `${a} − ${e} = ${a - e}.`, `${y.nom} en a ${a - e}.`),
      avec(parfois(0.55, () => barre([[y.nom, null], ["de moins", String(e)]], String(a)))),
    );
  const b = a - e;
  return qN(
    pick([
      `${x.nom} a ${a} ${r.des} et ${y.nom} en a ${b}. Combien ${x.nom} en a-t-${x.il} de plus ?`,
      `${x.nom} a ${a} ${r.des}, ${y.nom} en a ${b}. Combien en manque-t-il à ${y.nom} ?`,
      `${x.nom} a ${a} ${r.des} et ${y.nom} ${b}. Quel est l'écart entre les deux ?`,
      `${y.nom} a ${b} ${r.des}. ${x.nom} en a ${a}. Combien ${y.nom} en a-t-${y.il} de moins ?`,
    ]),
    e,
    [a + b, e + 10, e - 10, e + 1, a],
    exp("L'écart entre deux quantités, c'est ce qu'il faut ajouter à la petite pour avoir la grande.", "On enlève la petite quantité de la grande.", `${a} − ${b} = ${e}.`, `L'écart est de ${e}.`),
    avec(parfois(0.55, () => barre([[y.nom, String(b)], ["écart", null]], String(a)))),
  );
}

/* ---------------------------------------------------------
   DEUX ÉTAPES, TROIS ÉTAPES
--------------------------------------------------------- */

function deuxEtapesRecoitVend(): Q {
  const r = reserveCourte();
  const p = quelquun();
  const { S, il } = qui(r, p);
  const a = rint(300, 2500);
  const b = rint(100, 900);
  const c = rint(80, a + b - 100);
  const res = a + b - c;
  return qN(
    pick([
      `${S} a ${fmt(a)} ${r.des}. ${maj(il)} en ${r.plus} ${fmt(b)}, puis en ${r.moins} ${fmt(c)}. Combien en reste-t-il ?`,
      `${S} a ${fmt(a)} ${r.des}, en ${r.plus} ${fmt(b)}, puis en ${r.moins} ${fmt(c)}. Combien à la fin ?`,
      `${S} a ${fmt(a)} ${r.des}. Lundi, ${il} en ${r.plus} ${fmt(b)} ; mardi, ${il} en ${r.moins} ${fmt(c)}. Combien à la fin ?`,
    ]),
    res,
    [a + b + c, a - c, a + b, res + 100, res - 10],
    exp("Un problème à deux étapes : deux changements, l'un après l'autre.", "On fait d'abord l'ajout, puis le retrait.", `${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}, puis ${fmt(a + b)} − ${fmt(c)} = ${fmt(res)}.`, `Il en reste ${fmt(res)}.`),
    avec(parfois(0.5, () => barre([["", fmt(a)], ["", fmt(b)]], null))),
  );
}

function deuxEtapesLeReste(): Q {
  const r = court(pick(RESERVES.filter((x) => !["points", "photos", "vaccins", "mètres de tuyau", "billets"].includes(x.des))));
  const p = quelquun();
  const { S } = qui(r, p);
  const t = rint(900, 4800);
  const a = rint(150, Math.floor(t / 3));
  const b = rint(150, Math.floor(t / 3));
  const c = t - a - b;
  const fem = /es$/.test(r.moinsPp);
  const trio = pick([
    { m: ["neufs", "abîmés", "à trier"], f: ["neuves", "abîmées", "à trier"] },
    { m: ["rouges", "bleus", "verts"], f: ["rouges", "bleues", "vertes"] },
    { m: ["petits", "moyens", "grands"], f: ["petites", "moyennes", "grandes"] },
  ]);
  const [adjA, adjB, adjC] = fem ? trio.f : trio.m;
  const accord = (x: string) => x;
  return qN(
    pick([
      `${S} a ${fmt(t)} ${r.des} : ${fmt(a)} ${accord(adjA)}, ${fmt(b)} ${accord(adjB)}, les autres ${accord(adjC)}. Combien sont ${accord(adjC)} ?`,
      `Sur ${fmt(t)} ${r.des}, ${fmt(a)} sont ${accord(adjA)} et ${fmt(b)} ${accord(adjB)}. Les autres sont ${accord(adjC)}. Combien ?`,
      `${p.nom} compte ${fmt(t)} ${r.des} : ${fmt(a)} ${accord(adjA)}, ${fmt(b)} ${accord(adjB)}, le reste ${accord(adjC)}. Combien ${accord(adjC)} ?`,
    ]),
    c,
    [t - a, t - b, a + b, c + 10, c - 10, t + a + b],
    exp("On connaît le tout et deux parts : on cherche la troisième.", "On rassemble les deux parts connues, puis on les enlève du tout.", `${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}, puis ${fmt(t)} − ${fmt(a + b)} = ${fmt(c)}.`, `Il y en a ${fmt(c)}.`),
    avec(parfois(0.6, () => barre([["", fmt(a)], ["", fmt(b)], ["?", null]], fmt(t)))),
  );
}

function deuxEtapesComparaisonTotal(): Q {
  const r = aEnfant();
  const [x, y] = deuxPersonnes();
  const a = rint(120, 800);
  const e = rint(25, 400);
  const b = a + e;
  const t = a + b;
  return qN(
    pick([
      `${x.nom} a ${a} ${r.des}. ${y.nom} en a ${e} de plus. Combien en ont-ils à eux deux ?`,
      `${x.nom} a ${a} ${r.des} et ${y.nom} ${e} de plus. Combien en ont-ils ensemble ?`,
      `${y.nom} a ${e} ${r.des} de plus ${que(x.nom)}, qui en a ${a}. Combien en tout ?`,
    ]),
    t,
    [a + e, a + a, t + e, t - 10, t + 100],
    exp("Deux étapes : d'abord la quantité inconnue, puis le total.", `On trouve ce qu'a ${y.nom}, puis on additionne.`, `${a} + ${e} = ${b}, puis ${a} + ${b} = ${t}.`, `Ensemble, ils en ont ${t}.`),
    avec(parfois(0.6, () => barre([[x.nom, String(a)], [y.nom, null]], null))),
  );
}

function troisEtapesMixte(): Q {
  const r = court(rangeable());
  const p = quelquun();
  const { S, il } = qui(r, p);
  const k = rint(3, 8);
  const n = rint(12, 60);
  const v = rint(20, 150);
  const d = rint(20, k * n + v - 20);
  const res = k * n + v - d;
  return qN(
    pick([
      `${S} range ${k} cartons de ${n} ${r.des}, plus ${v}. ${maj(il)} en ${r.moins} ${d}. Combien en reste-t-il ?`,
      `${S} a ${k} boîtes de ${n} ${r.des} et ${v} en vrac. ${maj(il)} en ${r.moins} ${d}. Combien en reste-t-il ?`,
      `${p.nom} a ${k} caisses de ${n} ${r.des} et ${v} en vrac. ${maj(p.il)} en donne ${d}. Combien en reste-t-il ?`,
    ]),
    res,
    [k * n + v, k * n - d, k + n + v - d, res + 10, res - 10, k * n + v + d],
    exp("Trois étapes : une multiplication, une addition, une soustraction.", "On compte les paquets, on ajoute le vrac, on enlève ce qui part.", `${k} × ${n} = ${k * n} ; ${k * n} + ${v} = ${k * n + v} ; ${k * n + v} − ${d} = ${res}.`, `Il en reste ${res}.`),
    avec(parfois(0.5, () => barre([...Array.from({ length: Math.min(k, 4) }, () => ["", String(n)] as [string, string]), ...(k > 4 ? [["…", "…"] as [string, string]] : []), ["vrac", String(v)]], null))),
  );
}

function troisEtapesTables(): Q {
  const p = quelquun();
  const a = rint(3, 9);
  const b = rint(3, 9);
  const c = rint(2, 6);
  const d = rint(2, 8);
  const lieu = pick([
    { lieu: "Le restaurant a", g1: "tables de", g2: "places", q: "Combien de clients au plus ?" },
    { lieu: `Pour sa fête, ${p.nom} installe`, g1: "tables de", g2: "chaises", q: "Combien d'invités ?" },
    { lieu: "Le cinéma de l'école a", g1: "rangées de", g2: "fauteuils", q: "Combien de fauteuils ?" },
    { lieu: "Le train du manège a", g1: "wagons de", g2: "places", q: "Combien de places ?" },
    { lieu: "Le jardinier plante", g1: "rangs de", g2: "salades", q: "Combien de salades ?" },
    { lieu: "Le vaisseau spatial a", g1: "cabines de", g2: "places", q: "Combien d'astronautes peuvent voyager ?" },
    { lieu: "La piscine a", g1: "lignes de", g2: "nageurs", q: "Combien de nageurs ?" },
  ]);
  const t = a * b + c * d;
  return qN(
    `${lieu.lieu} ${a} ${lieu.g1} ${b} ${lieu.g2} et ${c} ${lieu.g1} ${d}. ${lieu.q}`,
    t,
    [a * b, c * d, a + b + c + d, (a + c) * (b + d), t + 10, t - 1],
    exp("Trois étapes : deux multiplications, puis une addition.", "On compte chaque groupe, puis on rassemble.", `${a} × ${b} = ${a * b} ; ${c} × ${d} = ${c * d} ; ${a * b} + ${c * d} = ${t}.`, `En tout : ${t}.`),
    avec(parfois(0.4, () => barre([[`${a} × ${b}`, null], [`${c} × ${d}`, null]], null))),
  );
}

const ARTICLES: readonly { un: string; des: string }[] = [
  { un: "cahier", des: "cahiers" },
  { un: "ballon", des: "ballons" },
  { un: "livre", des: "livres" },
  { un: "toupie", des: "toupies" },
  { un: "puzzle", des: "puzzles" },
  { un: "feutre", des: "feutres" },
  { un: "pinceau", des: "pinceaux" },
  { un: "masque", des: "masques" },
  { un: "cerf-volant", des: "cerfs-volants" },
  { un: "dinosaure", des: "dinosaures" },
];

function troisEtapesAchats(): Q {
  const p = quelquun();
  const [A, B] = shuffle(ARTICLES).slice(0, 2);
  const na = rint(2, 6);
  const pa = rint(3, 12);
  const nb = rint(2, 4);
  const pb = rint(2, 9);
  const cout = na * pa + nb * pb;
  const billet = [20, 50, 100].find((x) => x > cout + 1);
  if (!billet) return troisEtapesAchats();
  const rendu = billet - cout;
  return qN(
    pick([
      `${p.nom} achète ${na} ${A.des} à ${pa} € et ${nb} ${B.des} à ${pb} €. Combien lui rend-on sur ce billet ?`,
      `${p.nom} paie ${na} ${A.des} à ${pa} € et ${nb} ${B.des} à ${pb} € avec ce billet. Combien lui rend-on ?`,
    ]),
    rendu,
    [cout, billet - na * pa, billet - nb * pb, rendu + 1, rendu + 10],
    exp("Trois étapes : le prix de chaque achat, le total, puis la monnaie rendue.", "On multiplie, on additionne, puis on enlève du billet.", `${na} × ${pa} = ${na * pa} € ; ${nb} × ${pb} = ${nb * pb} € ; total ${cout} € ; ${billet} − ${cout} = ${rendu} €.`, `On lui rend ${rendu} €.`),
    { canvas: { kind: "monnaie", elements: [{ valeur: `${billet}e` as "20e" | "50e" | "100e" }] } },
    "€",
  );
}

/* ---------------------------------------------------------
   COMPARAISON MULTIPLICATIVE
--------------------------------------------------------- */

function foisPlusMoins(): Q {
  const r = aEnfant();
  const [x, y] = deuxPersonnes();
  const k = rint(2, 6);
  const n = rint(4, 25);
  if (Math.random() < 0.55)
    return qN(
      pick([
        `${x.nom} a ${n} ${r.des}. ${y.nom} en a ${k} fois plus. ${combienDe(r)} ${y.nom} a-t-${y.il} ?`,
        `${y.nom} a ${k} fois plus ${de(r.des)} ${que(x.nom)}, qui en a ${n}. Combien en a ${y.nom} ?`,
        `${x.nom} a ${n} ${r.des}. ${y.nom} en a ${k} fois autant. Combien en a ${y.nom} ?`,
      ]),
      n * k,
      [n + k, n * k + n, n * k - n, n, k],
      exp("« Fois plus » compare par multiplication, pas par addition.", "On multiplie la quantité connue par le nombre de fois.", `${n} × ${k} = ${n * k}. (« ${k} de plus » aurait donné ${n + k}.)`, `${y.nom} en a ${n * k}.`),
      avec(parfois(0.6, () => barreEgale(k, String(n), null))),
    );
  const N1 = n * k;
  return qN(
    pick([
      `${x.nom} a ${N1} ${r.des}. ${y.nom} en a ${k} fois moins. ${combienDe(r)} ${y.nom} a-t-${y.il} ?`,
      `${x.nom} a ${N1} ${r.des}, c'est ${k} fois plus ${que(y.nom)}. ${combienDe(r)} ${y.nom} a-t-${y.il} ?`,
    ]),
    n,
    [N1 - k, N1 * k, n + 1, N1, k],
    exp("« Fois moins » : on partage la grande quantité en parts égales.", `On divise par ${k}.`, `${N1} ÷ ${k} = ${n}, car ${k} × ${n} = ${N1}.`, `${y.nom} en a ${n}.`),
    avec(parfois(0.6, () => barreEgale(k, null, String(N1)))),
  );
}

function foisPlusPrix(): Q {
  const p = quelquun();
  const paire = pick([
    { petit: "un casque", grand: "une trottinette", G: "La trottinette", P: "Le casque" },
    { petit: "un ballon", grand: "un vélo", G: "Le vélo", P: "Le ballon" },
    { petit: "un livre", grand: "une tente", G: "La tente", P: "Le livre" },
    { petit: "une trousse", grand: "un cartable", G: "Le cartable", P: "La trousse" },
    { petit: "un yo-yo", grand: "un robot", G: "Le robot", P: "Le yo-yo" },
    { petit: "une balle", grand: "une raquette", G: "La raquette", P: "La balle" },
    { petit: "une toupie", grand: "une fusée", G: "La fusée", P: "La toupie" },
  ]);
  const k = rint(2, 8);
  const prix = rint(4, 40);
  if (Math.random() < 0.6)
    return qN(
      pick([
        `${paire.G} coûte ${k} fois plus cher ${que(paire.petit)}. ${paire.P} coûte ${prix} €. Combien coûte ${paire.grand.replace(/^un |^une /, (a) => (a === "un " ? "le " : "la "))} ?`,
        `${p.nom} voit ${paire.petit} à ${prix} € et ${paire.grand}, ${k} fois plus cher. Combien coûte ${paire.grand.startsWith("une") ? "la" : "le"} ${paire.grand.replace(/^un |^une /, "")} ?`,
      ]),
      prix * k,
      [prix + k, prix * k + prix, prix * (k - 1), prix * k * 2],
      exp("« Fois plus cher » : on multiplie le prix.", `On multiplie ${prix} € par ${k}.`, `${prix} × ${k} = ${prix * k}.`, `Cela coûte ${prix * k} €.`),
      avec(parfois(0.6, () => barreEgale(k, `${prix} €`, null))),
      "€",
    );
  return qN(
    `${paire.G} coûte ${prix * k} €. C'est ${k} fois plus cher ${que(paire.petit)}. Combien coûte ${paire.petit.replace(/^un |^une /, (a) => (a === "un " ? "le " : "la "))} ?`,
    prix,
    [prix * k - k, prix + k, prix * k, prix - 1],
    exp("Si le grand coûte k fois plus, le petit coûte k fois moins.", `On divise ${prix * k} € par ${k}.`, `${prix * k} ÷ ${k} = ${prix}, car ${k} × ${prix} = ${prix * k}.`, `Cela coûte ${prix} €.`),
    avec(parfois(0.6, () => barreEgale(k, null, `${prix * k} €`))),
    "€",
  );
}

/* ---------------------------------------------------------
   PRODUIT CARTÉSIEN : toutes les associations
--------------------------------------------------------- */

type Combo = { A: string; B: string; C?: string; quoi: string; verbe: string; la: string[]; lb: string[] };
const COMBOS: readonly Combo[] = [
  { A: "parfums", B: "cornets", C: "nappages", quoi: "glaces différentes", verbe: "peut-on former", la: ["vanille", "fraise", "chocolat", "citron", "coco", "menthe"], lb: ["cornet", "pot", "gaufre", "biscuit"] },
  { A: "tee-shirts", B: "shorts", C: "casquettes", quoi: "tenues différentes", verbe: "peut-on composer", la: ["rouge", "bleu", "jaune", "vert", "blanc", "noir"], lb: ["jean", "gris", "marine", "beige"] },
  { A: "pains", B: "garnitures", C: "sauces", quoi: "sandwichs différents", verbe: "peut-on préparer", la: ["baguette", "pain de mie", "pain rond", "pain aux noix"], lb: ["jambon", "fromage", "poulet", "thon"] },
  { A: "entrées", B: "desserts", C: "boissons", quoi: "menus différents", verbe: "peut-on choisir", la: ["salade", "soupe", "melon", "carottes"], lb: ["glace", "fruit", "yaourt", "gâteau"] },
  { A: "têtes", B: "corps", C: "paires de bras", quoi: "robots différents", verbe: "peut-on assembler", la: ["ronde", "carrée", "pointue", "ovale"], lb: ["bleu", "rouge", "argent", "vert"] },
  { A: "chapeaux", B: "capes", C: "baguettes magiques", quoi: "déguisements de magicien", verbe: "peut-on faire", la: ["haut", "pointu", "rond", "étoilé"], lb: ["violette", "noire", "dorée", "verte"] },
  { A: "pâtes", B: "garnitures", C: "fromages", quoi: "pizzas différentes", verbe: "peut-on cuisiner", la: ["fine", "épaisse", "complète"], lb: ["tomate", "champignons", "olives", "ananas"] },
  { A: "coques", B: "voiles", C: "drapeaux", quoi: "bateaux pirates", verbe: "peut-on dessiner", la: ["noire", "rouge", "brune", "verte"], lb: ["blanche", "noire", "rayée", "jaune"] },
  { A: "dragons", B: "châteaux", C: "chevaliers", quoi: "histoires différentes", verbe: "peut-on inventer", la: ["vert", "rouge", "bleu", "doré"], lb: ["de pierre", "de glace", "de nuages", "de sable"] },
  { A: "lettres", B: "chiffres", C: "symboles", quoi: "codes secrets", verbe: "peut-on écrire", la: ["A", "B", "C", "D", "E"], lb: ["1", "2", "3", "4", "5"] },
];

/** Le tableau des associations, cases vides (« … ») : on voit les paires sans le total. */
const tableauAssociations = (c: Combo, a: number, b: number): Q["canvas"] =>
  ({ kind: "tableau_donnees", headers: c.lb.slice(0, b), coin: "", rows: c.la.slice(0, a).map((l) => ({ label: l, values: Array.from({ length: b }, () => "…") })) }) as Q["canvas"];

function cartesien(etoile: Etoile): Q {
  const c = pick(COMBOS);
  const p = quelquun();
  const a = rint(2, Math.min(5, c.la.length));
  const b = rint(2, Math.min(4, c.lb.length));
  if (etoile === 4) {
    const tableau = parfois(0.7, () => tableauAssociations(c, a, b));
    return qN(
      pick([
        `Il y a ${a} ${c.A} et ${b} ${c.B}. Combien ${de(c.quoi)} ${c.verbe} ?`,
        `${p.nom} a ${a} ${c.A} et ${b} ${c.B}. Combien ${de(c.quoi)} ${c.verbe} ?`,
        `Avec ${a} ${c.A} et ${b} ${c.B}, combien de ${c.quoi} ${c.verbe} ?`,
        `Pic le paille-en-queue associe ${a} ${c.A} et ${b} ${c.B}. Combien ${de(c.quoi)} ${c.verbe} ?`,
      ]),
      a * b,
      [a + b, a * b * 2, a * b + 1, a * b - 1, a * a],
      exp("Pour compter toutes les associations, on associe chaque élément du premier groupe à chaque élément du second.", `Chacun des ${a} ${c.A} va avec chacun des ${b} ${c.B}.`, `${a} × ${b} = ${a * b}.`, `On peut faire ${a * b} ${c.quoi}.`),
      avec(tableau),
    );
  }
  if (Math.random() < 0.5) {
    const k = rint(2, 3);
    return qN(
      pick([
        `Il y a ${a} ${c.A}, ${b} ${c.B} et ${k} ${c.C}. Combien ${de(c.quoi)} ${c.verbe} ?`,
        `${p.nom} a ${a} ${c.A}, ${b} ${c.B} et ${k} ${c.C}. Combien ${de(c.quoi)} ${c.verbe} ?`,
      ]),
      a * b * k,
      [a + b + k, a * b, a * b + k, a * b * k + 1, (a + b) * k],
      exp("Avec trois groupes, on associe chaque élément de chacun.", "On multiplie les trois nombres.", `${a} × ${b} = ${a * b}, puis ${a * b} × ${k} = ${a * b * k}.`, `On peut faire ${a * b * k} ${c.quoi}.`),
      avec(parfois(0.6, () => tableauAssociations(c, a, b))),
    );
  }
  const t = a * b;
  return qN(
    pick([
      `Avec ses ${c.A} et ${b} ${c.B}, ${p.nom} fait ${t} ${c.quoi}. Combien a-t-${p.il} ${de(c.A)} ?`,
      `On fait ${t} ${c.quoi} avec ${b} ${c.B} et des ${c.A}. Combien ${de(c.A)} ?`,
    ]),
    a,
    [t - b, t, a + 1, b, a * 2],
    exp("Le nombre d'associations est le produit des deux groupes.", `On cherche le nombre qui, multiplié par ${b}, donne ${t}.`, `${a} × ${b} = ${t}, donc il y a ${a} ${c.A}.`, `Il y a ${a} ${c.A}.`),
  );
}

/* ---------------------------------------------------------
   LE SCHÉMA EN BARRES : lire le dessin
--------------------------------------------------------- */

function lireSchema(etoile: Etoile): Q {
  const r = rangeable();
  const p = quelquun();
  const { S } = qui(r, p);
  const f = etoile === 3 ? rint(1, 2) : etoile === 4 ? rint(3, 4) : 5;
  if (f === 1) {
    const a = rint(120, 2800);
    const b = rint(90, 2400);
    return qN(
      pick([
        `Le schéma montre les ${r.des} ${de(p.nom)}. Quel nombre remplace le point d'interrogation ?`,
        `${p.nom} a dessiné ce schéma pour ses ${r.des}. Que vaut le « ? » ?`,
        `Regarde le schéma : deux parts et un tout. Quel est le tout ?`,
        `Pic le paille-en-queue a caché le total du schéma. Combien vaut-il ?`,
        `${p.nom} réunit ses ${r.des} : le schéma montre les deux tas. Combien en a-t-${p.il} en tout ?`,
        `${p.nom} lit le schéma de la maîtresse. Que vaut la barre entière ?`,
        `Le schéma ${de(p.nom)} a deux parts. Quel est le total ?`,
      ]),
      a + b,
      [a - b > 0 ? a - b : b - a, a + b + 100, a + b - 100, a + b + 10],
      exp("Dans un schéma en barres, le tout est la barre entière.", "On connaît les deux parts : on les additionne.", `${fmt(a)} + ${fmt(b)} = ${fmt(a + b)}.`, `Le « ? » vaut ${fmt(a + b)}.`),
      { canvas: barre([["", fmt(a)], ["", fmt(b)]], null) },
    );
  }
  if (f === 2) {
    const t = rint(800, 4800);
    const a = rint(150, t - 100);
    return qN(
      pick([
        `Le schéma montre les ${r.des} ${de(p.nom)}. Quel nombre remplace le point d'interrogation ?`,
        `${p.nom} a dessiné ce schéma. Combien vaut la part cachée ?`,
        `Regarde le schéma : on connaît le tout et une part. Que vaut l'autre part ?`,
        `Pic le paille-en-queue a caché une part du schéma. Combien vaut-elle ?`,
        `${p.nom} sait combien ${p.il} a ${de(r.des)} en tout. Le schéma montre une part. Combien vaut l'autre ?`,
        `Le schéma ${de(p.nom)} montre le tout et une part. Quel nombre manque ?`,
        `${p.nom} a dessiné ses ${r.des} en barre. Que vaut la partie rouge ?`,
      ]),
      t - a,
      [t + a, t - a + 100, t - a - 10, a],
      exp("Dans un schéma en barres, les parts mises bout à bout font le tout.", "On enlève la part connue du tout.", `${fmt(t)} − ${fmt(a)} = ${fmt(t - a)}.`, `Le « ? » vaut ${fmt(t - a)}.`),
      { canvas: barre([["", fmt(a)], ["", null]], fmt(t)) },
    );
  }
  if (f === 3) {
    const k = rint(3, 8);
    const q = rint(4, 25);
    const objet = pick([
      { quoi: "dictionnaires", qui: "La maîtresse", verbe: "a acheté", fin: "Quel est le prix d'un seul ?" },
      { quoi: "billets de cirque", qui: `${p.nom}`, verbe: "a payé", fin: "Combien coûte un billet ?" },
      { quoi: "ballons", qui: "Le club de foot", verbe: "a acheté", fin: "Quel est le prix d'un ballon ?" },
      { quoi: "pots de peinture", qui: "Le peintre", verbe: "a acheté", fin: "Combien coûte un pot ?" },
      { quoi: "livres", qui: "La bibliothécaire", verbe: "a acheté", fin: "Combien coûte un livre ?" },
    ]);
    return qN(
      pick([
        `${objet.qui} ${objet.verbe} ${k} ${objet.quoi} au même prix pour ${k * q} €. ${objet.fin}`,
        `${k} ${objet.quoi} coûtent ${k * q} €, tous au même prix. ${objet.fin}`,
        `${p.nom} lit le schéma : ${k} ${objet.quoi} pour ${k * q} €. ${objet.fin}`,
        `${objet.qui} ${objet.verbe} ${k} ${objet.quoi} identiques pour ${k * q} €. ${objet.fin}`,
      ]),
      q,
      [k * q - k, q + 1, k, k * q, q * 2],
      exp("Des parts égales : le tout se partage.", `On divise ${k * q} € par ${k}.`, `${k * q} ÷ ${k} = ${q}, car ${k} × ${q} = ${k * q}.`, `Un seul coûte ${q} €.`),
      { canvas: barreEgale(k, null, `${k * q} €`) },
      "€",
    );
  }
  if (f === 4) {
    const k = rint(3, 6);
    const q = rint(12, 80);
    return qN(
      pick([
        `${S} remplit ${k} boîtes de ${q} ${r.des}. Combien en tout ?`,
        `Le schéma montre ${k} parts égales de ${q}. Que vaut la barre entière ?`,
        `${p.nom} dessine ${k} parts de ${q} ${r.des}. Combien vaut le total ?`,
        `Pic le paille-en-queue a rempli ${k} paniers de ${q} ${r.des}. Combien en tout ?`,
        `${p.nom} met ${q} ${r.des} dans chacune de ses ${k} boîtes. Combien en a-t-${p.il} ?`,
      ]),
      k * q,
      [k + q, k * q + q, k * q - q, k * q + 10],
      exp("Des parts égales mises bout à bout : c'est une multiplication.", `${k} parts de ${q}.`, `${k} × ${q} = ${k * q}.`, `Le total est ${k * q}.`),
      { canvas: barreEgale(k, String(q), null) },
    );
  }
  const re = aEnfant();
  const [x, y] = deuxPersonnes();
  const a = rint(120, 700);
  const e = rint(25, 300);
  return qN(
    pick([
      `${x.nom} a ${a} ${re.des}. ${y.nom} en a ${e} de plus. Combien en ont-ils à eux deux ?`,
      `${x.nom} a ${a} ${re.des}, et ${y.nom} ${e} de plus. Combien en ont-ils ensemble ?`,
      `${y.nom} a ${e} ${re.des} de plus ${que(x.nom)}, qui en a ${a}. Combien en tout ?`,
      `${x.nom} a ${a} ${re.des} ; ${y.nom} en a ${e} de plus. Quel est leur total ?`,
    ]),
    a + a + e,
    [a + e, a + e + e, a + a, a + a + e + 10],
    exp("Deux étapes : la part de chacun, puis le total.", `${y.nom} en a ${a} + ${e} = ${a + e}.`, `${a} + ${a + e} = ${a + a + e}.`, `Ensemble : ${a + a + e}.`),
    { canvas: barre([[x.nom, String(a)], [y.nom, null]], null) },
  );
}

/* ---------------------------------------------------------
   VÉRIFIER : la réponse est-elle possible ?
--------------------------------------------------------- */

function verifier(etoile: Etoile): Q {
  const r = reserveCourte();
  let p = quelquun();
  while (r.sujet?.includes(p.nom)) p = quelquun();
  const { S } = qui(r, p);
  const re = aEnfant();
  const f = etoile === 4 ? rint(1, 2) : rint(1, 3);
  if (f === 1) {
    const a = rint(800, 4800);
    const b = rint(30, 600);
    const juste = Math.random() < 0.4;
    const annonce = juste ? a - b : pick([a, a + b, a + b * 2]);
    return qM(
      pick([
        `${S} avait ${fmt(a)} ${r.des} et en a ${ppMasc(r)} ${fmt(b)}. ${p.nom} dit qu'il en reste ${fmt(annonce)}. Sa réponse est-elle possible ?`,
        `${p.nom} : « J'avais ${fmt(a)} ${re.des}, j'en ai ${ppMasc(re)} ${fmt(b)}, il m'en reste ${fmt(annonce)}. » Sa réponse est-elle possible ?`,
        `Il y avait ${fmt(a)} ${r.des} ; ${fmt(b)} sont partis. ${p.nom} en compte ${fmt(annonce)}. Sa réponse est-elle possible ?`.replace("partis", /es$/.test(r.moinsPp) ? "parties" : "partis"),
      ]),
      juste ? "Oui, elle est correcte" : "Non, elle est impossible",
      [juste ? "Non, elle est impossible" : "Oui, elle est correcte", "On ne peut pas le savoir"],
      exp("Quand on enlève, il doit rester MOINS qu'au départ.", `On compare la réponse au départ, ${fmt(a)}.`, juste ? `${fmt(a)} − ${fmt(b)} = ${fmt(a - b)} : la réponse est juste.` : `${fmt(annonce)} n'est pas plus petit que ${fmt(a)} : c'est impossible. La bonne réponse est ${fmt(a - b)}.`, juste ? "La réponse est possible." : "La réponse est impossible."),
      avec(parfois(0.5, () => barre([["parti", fmt(b)], ["reste", null]], fmt(a)))),
    );
  }
  if (f === 2) {
    const t = rint(800, 4800);
    const part = Math.random() < 0.5 ? rint(100, t - 50) : rint(t + 50, t + 900);
    const ok = part < t;
    return qM(
      pick([
        `${S} a ${fmt(t)} ${r.des}. ${p.nom} dit que ${fmt(part)} sont ${r.moinsPp}. Est-ce possible ?`,
        `Sur ${fmt(t)} ${r.des}, ${p.nom} en compte ${fmt(part)} ${r.moinsPp}. Est-ce possible ?`,
      ]),
      ok ? "oui" : "non",
      [ok ? "non" : "oui", "on ne peut pas le savoir"],
      exp("Une partie ne peut pas être plus grande que le tout.", `On compare ${fmt(part)} et ${fmt(t)}.`, ok ? `${fmt(part)} est plus petit que ${fmt(t)} : c'est possible.` : `${fmt(part)} est plus grand que ${fmt(t)} : c'est impossible.`, ok ? "Oui, c'est possible." : "Non, c'est impossible."),
      avec(parfois(0.6, () => barre([["partie", fmt(part)], ["reste", null]], fmt(t)))),
    );
  }
  const a = rint(600, 4800);
  const b = rint(120, 2800);
  const juste = Math.random() < 0.45;
  const annonce = juste ? a + b : pick([Math.abs(a - b), a, b + 1]);
  return qM(
    pick([
      `On réunit ${fmt(a)} et ${fmt(b)}. ${p.nom} trouve ${fmt(annonce)}. Cette réponse est-elle possible ?`,
      `${S} a ${fmt(a)} ${r.des} et en ${r.plus} ${fmt(b)}. Total trouvé : ${fmt(annonce)}. Est-ce possible ?`,
    ]),
    juste ? "oui" : "non",
    [juste ? "non" : "oui", "on ne peut pas le savoir"],
    exp("Quand on réunit deux quantités, le total est plus grand que chacune.", "On estime : on arrondit à la centaine.", juste ? `${fmt(a)} + ${fmt(b)} = ${fmt(a + b)} : c'est juste.` : `${fmt(annonce)} n'est pas plus grand que ${fmt(Math.max(a, b))} : c'est impossible.`, juste ? "Oui." : "Non."),
    avec(parfois(0.5, () => barre([["", fmt(a)], ["", fmt(b)]], null))),
  );
}

/* ---------------------------------------------------------
   LES DÉFIS : le reste du partage, c'est l'histoire qui décide
--------------------------------------------------------- */

function defiReste(type: 1 | 2 | 3): Q {
  const k = rint(4, 10);
  const q = rint(3, 9);
  const reste = rint(1, k - 1);
  const t = k * q + reste;
  const p = quelquun();
  const sit = pick([
    { quoi: "cahiers", boite: "boîtes", fem: true, qui: "La maîtresse", v: "range" },
    { quoi: "œufs", boite: "boîtes", fem: true, qui: "La fermière", v: "range" },
    { quoi: "croissants", boite: "sachets", fem: false, qui: "La boulangère", v: "met" },
    { quoi: "billes", boite: "sachets", fem: false, qui: "Le marchand de jouets", v: "met" },
    { quoi: "livres", boite: "cartons", fem: false, qui: "La bibliothécaire", v: "range" },
    { quoi: "pièces d'or", boite: "coffres", fem: false, qui: "Le capitaine pirate", v: "range" },
    { quoi: "cookies", boite: "boîtes", fem: true, qui: "Le chef pâtissier", v: "range" },
    { quoi: "graines", boite: "pots", fem: false, qui: "Le jardinier", v: "met" },
    { quoi: "poissons", boite: "aquariums", fem: false, qui: "La soigneuse", v: "met" },
  ]);
  const complets = sit.fem ? "complètes" : "complets";
  const debut = pick([
    `${sit.qui} ${sit.v} ${t} ${sit.quoi} dans des ${sit.boite} de ${k}.`,
    `${sit.qui} ${sit.v} ${t} ${sit.quoi} par ${sit.boite} de ${k}.`,
    `${p.nom} range ${t} ${sit.quoi} dans des ${sit.boite} de ${k}.`,
    `${p.nom} met ${t} ${sit.quoi} dans des ${sit.boite} de ${k}.`,
  ]);
  if (type === 1)
    return qN(
      `${debut} ${pick([`Combien ${de(sit.boite)} seront ${complets} ?`, `Combien ${de(sit.boite)} ${complets} y aura-t-il ?`, `Combien ${de(sit.boite)} seront pleines ?`.replace("pleines", sit.fem ? "pleines" : "pleins")])}`,
      q,
      [q + 1, reste, q - 1, k],
      exp("On cherche combien de fois le paquet tient dans le total.", `${t} = ${k} × ${q} + ${reste}.`, `${q} ${sit.boite} ${complets}, et ${reste} ${sit.quoi} restent.`, `${q} ${sit.boite} sont ${complets}.`),
      avec(parfois(0.5, () => barre([...Array.from({ length: Math.min(q, 4) }, () => ["", String(k)] as [string, string]), ...(q > 4 ? [["…", "…"] as [string, string]] : []), ["reste", null]], String(t)))),
    );
  if (type === 2)
    return qN(
      `${debut} ${pick([`Combien ${de(sit.quoi)} restent à part ?`, `Combien n'auront pas de place ?`, `Une fois les ${sit.boite} remplis, combien en reste-t-il ?`.replace("remplis", sit.fem ? "remplies" : "remplis")])}`,
      reste,
      [k - reste, q, reste + 1, k],
      exp("Le reste, c'est ce qui ne suffit pas à remplir un paquet de plus.", `${k} × ${q} = ${k * q}.`, `${t} − ${k * q} = ${reste}.`, `Il en reste ${reste}.`),
      avec(parfois(0.5, () => barre([["déjà rangés", String(k * q)], ["reste", null]], String(t)))),
    );
  const v = pick([
    { qui: "élèves partent en sortie", v: "voiture transporte", vs: "voitures", fin: "pour que TOUS partent" },
    { qui: "enfants vont à la piscine", v: "minibus emmène", vs: "minibus", fin: "pour tous" },
    { qui: "supporters vont au match", v: "car transporte", vs: "cars", fin: "pour tous" },
    { qui: "astronautes partent vers Mars", v: "fusée emmène", vs: "fusées", fin: "pour que tous décollent" },
  ]);
  return qN(
    `${t} ${v.qui}. Chaque ${v.v} ${k} personnes. ${pick([`Combien ${de(v.vs)} faut-il ${v.fin} ?`, `Combien ${de(v.vs)} doit-on prévoir ?`, `Combien ${de(v.vs)} faut-il au minimum ?`])}`,
    q + 1,
    [q, reste, q + 2, k],
    exp("Le reste ne se jette pas : des personnes ne restent pas sur le trottoir.", `${t} = ${k} × ${q} + ${reste}.`, `${q} ${v.vs} ne suffisent pas : il reste ${reste} personnes, il en faut une de plus.`.replace("il en faut une", v.vs === "fusées" || v.vs === "voitures" ? "il en faut une" : "il en faut un"), `Il faut ${q + 1} ${v.vs}.`),
  );
}

/* =========================================================
   LES ITEMS
========================================================= */

const GABARITS: TutorBankItemV4[] = [
  // ce2_probleme_choisir_operation
  g("ce2_probleme_choisir_tpl_001", "ce2_probleme_choisir_operation", 2, "Demande-toi si la quantité augmente, diminue, se répète ou se partage.", ["choisir_operation"], () => choisirOperation(2)),
  g("ce2_probleme_choisir_tpl_002_groupes_ou_reunion", "ce2_probleme_choisir_operation", 4, "Paquets égaux ou parts qu'on réunit ?", ["choisir_operation"], () => choisirOperation(4)),
  g("ce2_probleme_choisir_tpl_003_partage", "ce2_probleme_choisir_operation", 4, "Partage en parts égales : c'est une division.", ["choisir_operation"], () => choisirOperation(4)),

  // ce2_probleme_une_etape
  g("ce2_probleme_une_etape_tpl_001_parties_tout", "ce2_probleme_une_etape", 2, "Deux parts qu'on rassemble : on additionne.", ["parties_tout"], leTout),
  g("ce2_probleme_une_etape_tpl_002_part_manquante", "ce2_probleme_une_etape", 3, "Le tout moins la part connue.", ["parties_tout"], unePart),
  g("ce2_probleme_une_etape_tpl_003_etat_initial", "ce2_probleme_une_etape", 5, "Fais l'histoire à l'envers.", ["etat_initial"], leDepart),

  // ce2_probleme_comparaison
  g("ce2_probleme_comparaison_tpl_001", "ce2_probleme_comparaison", 3, "Qui en a le plus ? Ajoute ou enlève l'écart.", ["comparaison"], comparaison),
  g("ce2_probleme_comparaison_tpl_002_ecart", "ce2_probleme_comparaison", 3, "L'écart : la grande quantité moins la petite.", ["comparaison"], comparaison),

  // ce2_probleme_deux_etapes
  g("ce2_probleme_deux_etapes_tpl_001", "ce2_probleme_deux_etapes", 3, "Un changement, puis l'autre.", ["deux_etapes"], () => (Math.random() < 0.7 ? deuxEtapesRecoitVend() : deuxEtapesComparaisonTotal())),
  g("ce2_probleme_deux_etapes_tpl_002_le_reste", "ce2_probleme_deux_etapes", 5, "Rassemble les parts connues, puis enlève-les du tout.", ["deux_etapes"], deuxEtapesLeReste),
  g("ce2_probleme_deux_etapes_tpl_003_comparaison_puis_total", "ce2_probleme_deux_etapes", 5, "D'abord la quantité inconnue, puis le total.", ["deux_etapes"], () => (Math.random() < 0.6 ? deuxEtapesComparaisonTotal() : deuxEtapesRecoitVend())),

  // ce2_probleme_trois_etapes
  g("ce2_probleme_trois_etapes_tpl_001_mixte", "ce2_probleme_trois_etapes", 5, "Les paquets, puis le vrac, puis ce qui part.", ["trois_etapes"], troisEtapesMixte),
  g("ce2_probleme_trois_etapes_tpl_002_restaurant", "ce2_probleme_trois_etapes", 5, "Compte chaque groupe, puis rassemble.", ["trois_etapes"], troisEtapesTables),
  g("ce2_probleme_trois_etapes_tpl_003_achats", "ce2_probleme_trois_etapes", 5, "Le prix de chaque achat, le total, puis la monnaie.", ["trois_etapes"], troisEtapesAchats),

  // ce2_probleme_comparaison_multiplicative
  g("ce2_probleme_compmult_tpl_001", "ce2_probleme_comparaison_multiplicative", 4, "« Fois plus » : on multiplie. « Fois moins » : on divise.", ["comparaison_multiplicative"], foisPlusMoins),
  g("ce2_probleme_compmult_tpl_002_prix", "ce2_probleme_comparaison_multiplicative", 5, "« Fois plus cher » : on multiplie le prix.", ["comparaison_multiplicative"], () => (Math.random() < 0.65 ? foisPlusPrix() : foisPlusMoins())),

  // ce2_probleme_produit_cartesien
  g("ce2_probleme_cartesien_tpl_001", "ce2_probleme_produit_cartesien", 4, "Chaque élément du premier groupe va avec chaque élément du second.", ["produit_cartesien"], () => cartesien(4)),
  g("ce2_probleme_cartesien_tpl_002_trois_ensembles", "ce2_probleme_produit_cartesien", 5, "Avec trois groupes, on multiplie trois nombres.", ["produit_cartesien"], () => cartesien(5)),
  g("ce2_probleme_cartesien_tpl_003_ensemble_manquant", "ce2_probleme_produit_cartesien", 5, "Quel nombre, multiplié par l'autre groupe, donne toutes les associations ?", ["produit_cartesien"], () => cartesien(5)),

  // ce2_probleme_schema_barre
  g("ce2_probleme_schema_tpl_001", "ce2_probleme_schema_barre", 3, "La barre entière, c'est le tout.", ["schema_barre", "canvas"], () => lireSchema(3)),
  g("ce2_probleme_schema_tpl_003_parts_egales", "ce2_probleme_schema_barre", 4, "Des parts égales : multiplie ou partage.", ["schema_barre", "canvas"], () => lireSchema(4)),
  g("ce2_probleme_schema_tpl_002_comparaison", "ce2_probleme_schema_barre", 5, "D'abord la part de chacun, puis le total.", ["schema_barre", "canvas"], () => (Math.random() < 0.6 ? lireSchema(5) : lireSchema(4))),

  // ce2_probleme_verifier
  g("ce2_probleme_verifier_tpl_001", "ce2_probleme_verifier", 4, "Quand on enlève, il reste moins qu'au départ.", ["verifier"], () => verifier(4)),
  g("ce2_probleme_verifier_tpl_002_part_plus_grande", "ce2_probleme_verifier", 4, "Une partie ne dépasse jamais le tout.", ["verifier"], () => verifier(4)),
  g("ce2_probleme_verifier_tpl_003_somme_trop_petite", "ce2_probleme_verifier", 5, "Un total est plus grand que chacune de ses parts.", ["verifier"], () => verifier(5)),

  // ce2_probleme_defi
  g("ce2_probleme_defi_tpl_001_partage_avec_reste", "ce2_probleme_defi", 5, "Combien de fois le paquet tient-il dans le total ?", ["defi"], () => defiReste(1)),
  g("ce2_probleme_defi_tpl_002_reste_du_partage", "ce2_probleme_defi", 5, "Le reste : ce qui ne remplit pas un paquet de plus.", ["defi"], () => defiReste(2)),
  g("ce2_probleme_defi_tpl_003_reste_selon_histoire", "ce2_probleme_defi", 5, "Personne ne reste sur le trottoir.", ["defi"], () => defiReste(3)),
];

export const problemeBank: TutorBankItemV4[] = [...FIXES, ...GABARITS];
