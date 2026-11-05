// LES ANGLES AU COURS MOYEN, SANS DEGRÉS (05/11/2026). CM1 et CM2.
//
// ⛔ Frédéric : « enlève le rapporteur au cours moyen, il est hors programme ». Le
// programme : le rapporteur « sera introduit au collège » ; on COMPARE des angles, on
// ne les mesure pas. Ici, le seul repère est l'ANGLE DROIT (le coin d'une feuille,
// l'équerre) : plus petit, plus grand, même ouverture. Aucun nombre de degrés, ni dans
// l'énoncé, ni sur la figure, ni dans l'explication.
// Le seul fait chiffré du CM2 (« un angle droit mesure 90° ») reste dans l'item figé
// `cm2_angle_droit_fixed_1_mesure`, et nulle part ailleurs.
//
// Remplace tous les gabarits de `angle_droit`, `angle_type` et `angle_defi`.
// QCM seulement. Le correcteur de chaque gabarit relit le texte ou la figure :
// correcteurs/angles-repere-droit.ts. La clé (d1, t1, e1…) y renvoie.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, exp, melange, qcm, qcmN, typo, un, v } from "./trous-outils";

type Niveau = "cm1" | "cm2";

const LETTRES = "ABCDEFGHJKLMNPRSTUVW".split("");
const AIGUS = [25, 35, 45, 55, 65];
const OBTUS = [115, 125, 135, 145, 155];
const FEUILLE = ["une feuille", "un cahier", "une carte postale", "un livre"];

/** Un coin bien droit : ≈ 1 sur 25 à La Réunion. */
const COINS = [
  "d'une feuille", "d'un cahier", "d'un livre", "d'une carte postale", "d'une affiche", "d'un écran", "d'un tapis", "d'un drapeau",
  "d'une ardoise", "d'un timbre", "d'un terrain de foot", "d'une enveloppe", "d'un tableau", "d'une piscine", "d'un damier", "d'une photo",
  "d'un carreau", "d'une porte", "d'un plateau", "d'un ticket", "d'une nappe", "d'un classeur", "d'une boîte", "d'un écran de téléphone",
  "d'une fenêtre de case créole",
];

const figure = (deg: number): CanvasFigure => {
  const [a, b, c] = melange(LETTRES).slice(0, 3);
  return { kind: "angle", angle: { angleDeg: deg, labels: { vertex: a, left: b, right: c, angle: "" }, display: { showLabels: true, showMeasure: false, showArc: true, showRightAngle: false } } } as CanvasFigure;
};
const dessin = (degs: number[], noms: string[], longueurs?: number[]): CanvasFigure => ({
  kind: "deux_angles",
  mode: "cote_a_cote",
  angles: degs.map((deg, i) => ({ deg, nom: noms[i], rotation: un([0, 10, 20, 340, 350]), longueur: longueurs?.[i] ?? entre(60, 95) })),
});

const typeDe = (deg: number) => (deg < 90 ? "aigu" : deg === 90 ? "droit" : deg < 180 ? "obtus" : "plat");
const DEF_TYPES = "un angle aigu est plus petit qu'un angle droit ; un angle obtus est plus grand qu'un angle droit.";
const COMPARER = "on pose le coin d'une feuille sur l'angle et on compare les ouvertures.";
const expType = (t: string) =>
  exp(
    DEF_TYPES,
    COMPARER,
    t === "aigu" ? "l'angle reste caché sous le coin de la feuille." : t === "droit" ? "l'angle colle exactement au coin de la feuille." : t === "obtus" ? "l'angle dépasse du coin de la feuille." : "les deux côtés forment une ligne droite.",
    `l'angle est ${t}.`,
  );
const tireType = (niveau: Niveau) => {
  const l = niveau === "cm2" ? ["aigu", "droit", "obtus", "plat"] : ["aigu", "droit", "obtus"];
  const t = un(l);
  return t === "aigu" ? un(AIGUS) : t === "droit" ? 90 : t === "obtus" ? un(OBTUS) : 180;
};
const choixTypes = (niveau: Niveau) => (niveau === "cm2" ? ["aigu", "droit", "obtus", "plat"] : ["aigu", "droit", "obtus"]);

/** L'angle entre les aiguilles à l'heure pile, en nombre de « cases d'une heure ». */
const casesHorloge = (h: number) => Math.min(h, 12 - h);
const typeHorloge = (h: number) => (casesHorloge(h) < 3 ? "aigu" : casesHorloge(h) === 3 ? "droit" : casesHorloge(h) < 6 ? "obtus" : "plat");
const expHorloge = (h: number) => exp("les aiguilles forment un angle droit à 3 h et à 9 h.", "on compare l'écart des aiguilles avec celui de 3 h.", `à ${h} h, l'écart fait ${casesHorloge(h)} ${casesHorloge(h) > 1 ? "cases" : "case"} d'une heure ; à 3 h, il en fait 3.`, `à ${h} h, l'angle est ${typeHorloge(h)}.`);

const ouiNon = (oui: boolean, e: string, text: string, c?: CanvasFigure) => qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"], e, text, c);
const QUI = ["Un élève", "Une élève", "Noa", "Lina", "Sami", "Jade", "Ilan", "Maya", "Un camarade", "Une camarade", "Tom", "Inès"];

/* ───────────────────────── angle_droit ───────────────────────── */

const d1 = () => {
  const deg = un([90, 90, 90, 35, 50, 65, 115, 130, 150]);
  const e = exp("un angle droit a l'ouverture du coin d'une feuille.", COMPARER, deg === 90 ? "les côtés collent au coin de la feuille." : "un côté s'écarte du coin de la feuille.", deg === 90 ? "cet angle est droit." : "cet angle n'est pas droit.");
  return ouiNon(deg === 90, e, v(["Voici un angle.", "Regarde cet angle.", "Observe la figure.", "Voici une figure.", "Regarde l'ouverture."], ["Est-il droit ?", "Est-ce un angle droit ?", "Cet angle est-il droit ?", "Forme-t-il un angle droit ?", "A-t-il l'ouverture du coin d'une feuille ?"]), figure(deg));
};
const d2 = () => {
  const o = un(COINS);
  return qcm("droit", ["aigu", "obtus", "plat"], exp("le coin d'une figure rectangulaire est un angle droit.", "on reconnaît un rectangle ou un carré.", `le coin ${o} a la même ouverture que le coin d'une feuille.`, "c'est un angle droit."), v([`Le coin ${o} forme un angle :`, `Quel angle forme le coin ${o} ?`, `Le coin ${o} est un angle :`, `De quel type est le coin ${o} ?`]));
};
const d3 = () =>
  qcm("L'équerre", ["La balance", "Le chronomètre", "Le verre doseur", "Le thermomètre"], exp("une équerre possède un angle droit.", "on pose son coin sur l'angle à vérifier.", "si les deux côtés collent, l'angle est droit.", "on utilise l'équerre."), v(["", "En classe.", "Sur ta table.", "Dans ta trousse."], ["Quel outil vérifie un angle droit ?", "Quel outil montre si un angle est droit ?", "Avec quoi vérifier un angle droit ?", "Quel instrument possède un angle droit ?", "Quel outil choisir pour contrôler un angle droit ?", "Que poser sur un angle pour voir s'il est droit ?"]));
const d4 = () => {
  const F = un([{ n: "un carré", r: 4 }, { n: "un rectangle", r: 4 }, { n: "un triangle rectangle", r: 1 }, { n: "un cercle", r: 0 }]);
  const faux = [0, 1, 2, 3, 4, 6].filter((x) => x !== F.r);
  return qcmN(F.r, faux, exp("un angle droit se code par un petit carré.", "on compte les coins droits de la figure.", `${F.n} : ${F.r} ${F.r > 1 ? "angles droits" : "angle droit"}.`, `la réponse est ${F.r}.`), v([`Combien d'angles droits a ${F.n} ?`, `${cap(F.n)} a combien d'angles droits ?`, `Compte les angles droits dans ${F.n}.`, `Quel est le nombre d'angles droits dans ${F.n} ?`]));
};
const d5 = () => {
  const qui = un(QUI);
  const deg = un([90, 90, 70, 75, 105, 110]);
  const dit = v(["Cet angle est droit.", deg === 90 ? "Il colle au coin d'une feuille, donc il est droit." : "Cet angle est presque droit, donc il est droit.", "Il a l'ouverture du coin d'une feuille.", "C'est un angle droit."]);
  const e = exp("un angle droit a exactement l'ouverture du coin d'une feuille.", "presque droit, ce n'est pas droit : on vérifie avec le coin.", deg === 90 ? "les côtés collent au coin." : "un côté s'écarte du coin.", deg === 90 ? `${qui} a raison.` : `${qui} se trompe.`);
  return ouiNon(deg === 90, e, `${qui} dit : « ${dit} » ${v(["A-t-il raison ?", "Est-ce juste ?", "Est-ce vrai ?", "Peut-on le dire ?"])}`.replace("A-t-il raison", /^(Une|Lina|Jade|Maya|Inès)/.test(qui) ? "A-t-elle raison" : "A-t-il raison"), figure(deg));
};
const d6 = () => {
  const o = un(COINS);
  return qcm(`Le coin ${o}`, ["Une pièce ronde", "Une ficelle souple", "Un crayon seul", "Une assiette ronde", "Une bille"], exp("un coin bien droit a la même ouverture qu'une équerre.", "on pose ce coin sur l'angle à vérifier.", `le coin ${o} remplace l'équerre.`, `on peut utiliser le coin ${o}.`), v(["Tu n'as pas d'équerre.", "L'équerre manque.", "Pas d'équerre ce matin.", "Ton équerre est cassée."], ["Quoi utiliser pour vérifier un angle droit ?", "Quel objet la remplace ?", "Par quoi la remplacer ?", "Quel objet aide à vérifier un angle droit ?"]));
};
const d7 = () => {
  const h = un([3, 9]);
  return qcm(`${h} h`, ["1 h", "2 h", "5 h", "6 h", "7 h", "10 h", "11 h"].filter((x) => x !== `${h} h`), expHorloge(h), v(["Regarde une horloge.", "Pense à une horloge.", "Sur une pendule à aiguilles.", "Imagine les aiguilles d'une horloge."], ["À quelle heure pile forment-elles un angle droit ?", "Quelle heure pile donne un angle droit ?", "À quelle heure pile l'angle des aiguilles est-il droit ?", "Laquelle de ces heures pile donne un angle droit ?"]));
};
const d8 = () => {
  const C = un([
    { q: "Quelle figure a quatre angles droits ?", r: "Le rectangle", f: ["Le triangle équilatéral", "Le cercle", "Le pentagone"] },
    { q: "Quelle figure n'a aucun angle droit ?", r: "Le cercle", f: ["Le carré", "Le rectangle", "Le triangle rectangle"] },
    { q: "Quel triangle a un angle droit ?", r: "Le triangle rectangle", f: ["Le triangle équilatéral", "Tous les triangles", "Aucun triangle"] },
    { q: "Deux droites perpendiculaires forment quel angle ?", r: "Un angle droit", f: ["Un angle aigu", "Un angle obtus", "Un angle plat"] },
    { q: "Quel code montre un angle droit sur une figure ?", r: "Un petit carré", f: ["Un petit rond", "Une croix", "Une flèche"] },
    { q: "Tourner d'un quart de tour, c'est tourner de quel angle ?", r: "Un angle droit", f: ["Un angle plat", "Un angle aigu", "Un tour complet"] },
    { q: "Un mur bien vertical et le sol forment quel angle ?", r: "Un angle droit", f: ["Un angle aigu", "Un angle obtus", "Un angle plat"] },
    { q: "Comment appelle-t-on l'angle du coin d'une feuille ?", r: "Un angle droit", f: ["Un angle aigu", "Un angle obtus", "Un angle plat"] },
    { q: "Quelle figure a quatre côtés égaux et quatre angles droits ?", r: "Le carré", f: ["Le losange", "Le rectangle", "Le triangle équilatéral"] },
    { q: "Quel outil trace un angle droit ?", r: "L'équerre", f: ["Le compas", "La gomme", "Le crayon seul"] },
    { q: "Quel instrument de la trousse a un coin bien droit ?", r: "L'équerre", f: ["Le compas", "La gomme", "Le taille-crayon"] },
    { q: "Dans quel objet voit-on facilement un angle droit ?", r: "Un cahier", f: ["Une balle", "Une bague", "Une assiette ronde"] },
  ]);
  return qcm(C.r, C.f, exp("un angle droit a l'ouverture du coin d'une feuille.", "on pense au coin d'une feuille, à l'équerre, au petit carré du codage.", `la réponse juste est : ${C.r.toLowerCase()}.`, `${C.r}.`), C.q);
};
const d9 = () => {
  const noms = melange(["A", "B", "C"]);
  const autres = melange([35, 55, 125, 145]).slice(0, 2);
  const degs = melange([90, ...autres]);
  const j = noms[degs.indexOf(90)];
  return qcm(`L'angle ${j}`, noms.filter((x) => x !== j).map((x) => `L'angle ${x}`), exp("un angle droit a l'ouverture du coin d'une feuille.", COMPARER, `seul l'angle ${j} colle au coin de la feuille.`, `l'angle ${j} est droit.`), v(["Voici trois angles.", "Regarde ces trois angles.", "Observe ces angles.", "Sans mesurer.", "Pense au coin d'une feuille."], ["Lequel est droit ?", "Lequel est un angle droit ?", "Quel angle est droit ?", "Trouve l'angle droit.", "Où est l'angle droit ?"]), dessin(degs, noms));
};
const METIERS = ["Une menuisière", "Un maçon", "Une architecte", "Un carreleur", "Une couturière", "Un charpentier", "Une ingénieure", "Un peintre", "Une dessinatrice", "Un électricien", "Une tapissière", "Un plombier"];
const CHOSES = ["le coin d'une étagère", "le coin d'un mur", "le coin d'un plan", "le coin d'une dalle", "le coin d'un tissu", "le coin d'une poutre", "le coin d'une pièce de robot", "le coin d'un cadre", "le coin d'un meuble", "le coin d'un tuyau coudé"];
const d10 = () => {
  const colle = Math.random() < 0.5;
  const res = colle ? v(["Les deux côtés collent à l'équerre.", "L'équerre touche les deux côtés sur toute leur longueur."]) : v(["Un côté s'écarte de l'équerre.", "Il reste un vide entre un côté et l'équerre."]);
  return ouiNon(colle, exp("une équerre possède un angle droit.", "on pose son coin sur l'angle à vérifier.", colle ? "les deux côtés collent à l'équerre." : "un côté ne colle pas à l'équerre.", colle ? "l'angle est droit." : "l'angle n'est pas droit."), `${un(METIERS)} vérifie ${un(CHOSES)} avec une équerre. ${res} ${v(["Cet angle est-il droit ?", "Le coin est-il droit ?", "Est-ce un angle droit ?"])}`);
};

/* ───────────────────────── angle_type ───────────────────────── */

const QUEL_TYPE = ["Quel est le type de cet angle ?", "De quel type est cet angle ?", "Comment est cet angle ?", "Cet angle est :", "Quel mot convient pour cet angle ?"];
const t1 = (niveau: Niveau) => () => {
  const deg = tireType(niveau);
  const t = typeDe(deg);
  return qcm(t, choixTypes(niveau), expType(t), v(["Voici un angle.", "Regarde cet angle.", "Observe la figure.", "Compare au coin d'une feuille.", "Pense au coin d'une feuille."], QUEL_TYPE), figure(deg));
};
const t2 = (niveau: Niveau) => () => {
  const C = un([
    ...[["plus petit qu'un angle droit", "aigu"], ["moins ouvert qu'un angle droit", "aigu"], ["caché sous le coin d'une feuille", "aigu"], ["plus grand qu'un angle droit", "obtus"], ["plus ouvert qu'un angle droit", "obtus"], ["plus ouvert que le coin d'une feuille", "obtus"], ["de la même ouverture que le coin d'une feuille", "droit"], ["de la même ouverture qu'une équerre", "droit"]],
    ...(niveau === "cm2" ? [["dont les côtés forment une ligne droite", "plat"], ["égal à deux angles droits", "plat"]] : []),
  ]);
  return qcm(C[1], choixTypes(niveau), exp(DEF_TYPES, "on compare à l'angle droit.", `${C[0]} : c'est le mot « ${C[1]} ».`, `cet angle est ${C[1]}.`), v([`Un angle ${C[0]} est :`, `Comment s'appelle un angle ${C[0]} ?`, `Quel mot désigne un angle ${C[0]} ?`]));
};
const t3 = () => {
  const C = un([
    { p: "L'angle dépasse du coin.", t: "obtus" }, { p: "Un côté de l'angle sort du coin.", t: "obtus" }, { p: "L'angle s'ouvre plus que le coin.", t: "obtus" },
    { p: "L'angle reste caché sous le coin.", t: "aigu" }, { p: "L'angle s'ouvre moins que le coin.", t: "aigu" }, { p: "Un côté de l'angle reste sous le coin.", t: "aigu" },
    { p: "Les deux côtés collent au coin.", t: "droit" }, { p: "L'angle colle exactement au coin.", t: "droit" },
  ]);
  return qcm(C.t, ["aigu", "droit", "obtus"], expType(C.t), `${v(["On pose le coin d'une feuille sur un angle.", "On place le coin d'une feuille sur un angle.", `On pose le coin d'${un(FEUILLE)} sur un angle.`])} ${C.p} ${v(["L'angle est :", "Quel est son type ?", "De quel type est-il ?", "Quel mot convient ?"])}`);
};
const t4 = (niveau: Niveau) => () => {
  const h = un(niveau === "cm2" ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] : [1, 2, 3, 4, 5, 7, 8, 9, 10, 11]);
  return qcm(typeHorloge(h), choixTypes(niveau), expHorloge(h), `${v([`Il est ${h} h pile.`, `À ${h} h pile.`, `L'horloge indique ${h} h pile.`])} ${v(["L'angle des aiguilles est :", "Quel angle forment les aiguilles ?", "Les aiguilles forment un angle :", "De quel type est l'angle des aiguilles ?"])}`);
};
const SITUATIONS: [string, string][] = [
  ["Une porte à peine ouverte", "aigu"], ["Des ciseaux presque fermés", "aigu"], ["Un livre entrouvert", "aigu"], ["Un portail presque fermé", "aigu"], ["Un compas à peine écarté", "aigu"], ["Un éventail à peine déplié", "aigu"], ["Une pince presque fermée", "aigu"], ["Une trappe à peine soulevée", "aigu"], ["Un volet à peine poussé", "aigu"],
  ["Une porte ouverte comme le coin d'une feuille", "droit"], ["Un volet ouvert comme le coin d'un cahier", "droit"], ["Un livre ouvert comme le coin d'une feuille", "droit"], ["Un compas écarté comme le coin d'une feuille", "droit"], ["Un poteau bien vertical sur le sol", "droit"], ["Un portail ouvert comme le coin d'un carré", "droit"],
  ["Une porte ouverte bien plus que le coin d'une feuille", "obtus"], ["Des ciseaux écartés bien plus que le coin d'une feuille", "obtus"], ["Un éventail déplié bien plus que le coin d'une feuille", "obtus"], ["Un livre ouvert bien plus que le coin d'une feuille", "obtus"], ["Un portail ouvert bien plus que le coin d'une feuille", "obtus"], ["Un compas écarté bien plus que le coin d'une feuille", "obtus"],
];
const t5 = () => {
  const [s, t] = un(SITUATIONS);
  return qcm(t, ["aigu", "droit", "obtus"], expType(t), `${s}. ${v(["Quel type d'angle voit-on ?", "L'angle formé est :", "De quel type est l'angle ?", "Comment est l'angle ?"])}`);
};
const t6 = () => {
  const deg = un([...AIGUS, 90, ...OBTUS]);
  const j = deg < 90 ? "Plus petit" : deg === 90 ? "Pareil" : "Plus grand";
  return qcm(j, ["Plus petit", "Pareil", "Plus grand"], expType(typeDe(deg)), `${v(["Observe la figure.", "Pose un coin de feuille sur cet angle.", "Regarde cet angle."])} ${v(["Il est, par rapport à un angle droit :", "Par rapport à l'angle droit, il est :", "Comparé à l'angle droit, il est :"])}`, figure(deg));
};
const t7 = () => {
  const qui = un(QUI);
  const t0 = un(["aigu", "droit", "obtus"]);
  const deg = un([...AIGUS, 90, ...OBTUS]);
  const juste = typeDe(deg) === t0;
  const elle = /^(Une|Lina|Jade|Maya|Inès)/.test(qui);
  return ouiNon(juste, expType(typeDe(deg)), `${qui} dit : « Cet angle est ${t0}. » ${v([elle ? "A-t-elle raison ?" : "A-t-il raison ?", "Est-ce juste ?", "Est-ce vrai ?"])}`, figure(deg));
};
const t8 = () => {
  const noms = melange(["A", "B", "C"]);
  const degs = melange([un(AIGUS), 90, un(OBTUS)]);
  const t = un(["aigu", "droit", "obtus"]);
  const j = noms[degs.findIndex((d) => typeDe(d) === t)];
  return qcm(`L'angle ${j}`, noms.filter((x) => x !== j).map((x) => `L'angle ${x}`), expType(t), `${v(["Voici trois angles.", "Regarde ces trois angles.", "Observe ces angles."])} ${v([`Lequel est ${t} ?`, `Quel angle est ${t} ?`, `Trouve l'angle ${t}.`])}`, dessin(degs, noms));
};
const CONTEXTES = [
  "Un architecte dessine l'angle d'un toit", "Une pilote note l'angle d'un virage", "Une skateuse regarde l'angle de sa rampe", "Un kiné regarde l'ouverture d'un genou", "Une cycliste observe l'angle de sa selle", "Un jardinier écarte les branches d'un arbuste",
  "Une graphiste trace le coin d'un logo", "Un charpentier dessine le haut d'une ferme de toit", "Une biologiste dessine l'angle d'une aile", "Un footballeur regarde l'angle de son tir", "Une marine trace la route d'un bateau", "Un luthier trace le manche d'une guitare",
  "Une ingénieure dessine le bras d'un robot", "Un photographe ouvre son trépied", "Une chirurgienne regarde l'ouverture d'une pince", "Un grutier regarde le bras de sa grue", "Une danseuse ouvre ses bras", "Un astronome pointe sa lunette",
  "Une mécanicienne dessine une clé", "Un boulanger entaille un pain", "Une nageuse plie le coude", "Un dessinateur trace un personnage", "Une couturière coupe un col", "Un pompier place son échelle", "Une charpentière de La Réunion dessine le toit d'une case créole",
];
const t9 = (niveau: Niveau) => () => {
  const deg = tireType(niveau);
  const t = typeDe(deg);
  return qcm(t, choixTypes(niveau), expType(t), `${un(CONTEXTES)}. ${v(["Voici l'angle obtenu.", "Le dessin montre cet angle.", "Cet angle est dessiné."])} ${v(["De quel type est-il ?", "Il est :", "Quel mot convient ?"])}`, figure(deg));
};

/* ───────────────────────── angle_defi ───────────────────────── */

const ETATS = { aigu: "à peine ouverte", droit: "ouverte comme le coin d'une feuille", obtus: "ouverte bien plus que le coin d'une feuille" } as const;
const OBJETS_E1 = [["portes", "porte"], ["fenêtres", "fenêtre"], ["trappes", "trappe"], ["valises", "valise"], ["armoires", "armoire"], ["boîtes", "boîte"], ["lucarnes", "lucarne"], ["cages", "cage"], ["caisses", "caisse"], ["barrières", "barrière"]];
const e1 = () => {
  const [pl] = un(OBJETS_E1);
  const noms = ["A", "B", "C"];
  const types = melange(["aigu", "droit", "obtus"] as const);
  const Q = un([
    { q: "Laquelle a le plus grand angle ?", t: "obtus" }, { q: "Laquelle a le plus petit angle ?", t: "aigu" }, { q: "Laquelle forme un angle droit ?", t: "droit" }, { q: "Laquelle forme un angle obtus ?", t: "obtus" }, { q: "Laquelle forme un angle aigu ?", t: "aigu" }, { q: "Laquelle est la plus ouverte ?", t: "obtus" }, { q: "Laquelle est la moins ouverte ?", t: "aigu" },
  ]);
  const j = noms[types.indexOf(Q.t as (typeof types)[number])];
  return qcm(j, noms.filter((x) => x !== j), exp(DEF_TYPES, "on compare chaque ouverture au coin d'une feuille.", `${j} : ${ETATS[Q.t as keyof typeof ETATS]}.`, `la réponse est ${j}.`), `Trois ${pl}. ${noms.map((n, i) => `${n} : ${ETATS[types[i]]}`).join(" ; ")}. ${Q.q}`);
};
const e2 = () => {
  const egales = Math.random() < 0.2;
  const h1 = un([1, 2, 3, 4, 5]);
  let h2 = 12 - h1;
  if (!egales) do h2 = un([1, 2, 3, 4, 5, 7, 8, 9, 10, 11]); while (casesHorloge(h2) === casesHorloge(h1));
  const [a, b] = melange([h1, h2]);
  const grand = Math.random() < 0.5;
  const ca = casesHorloge(a);
  const cb = casesHorloge(b);
  const r = ca === cb ? "C'est pareil" : (ca > cb) === grand ? `${a} h` : `${b} h`;
  return qcm(r, [`${a} h`, `${b} h`, "C'est pareil"], exp("plus les aiguilles sont écartées, plus l'angle est grand.", "on compte les cases d'une heure entre les aiguilles, par le chemin le plus court.", `à ${a} h : ${ca} ; à ${b} h : ${cb}.`, `la réponse est : ${r}.`), `${v(["Regarde deux horloges.", "Deux horloges sonnent.", "Pense à deux pendules."])} ${v([`L'une indique ${a} h pile, l'autre ${b} h pile.`, `Il est ${a} h pile sur l'une et ${b} h pile sur l'autre.`])} ${grand ? v(["Où l'angle des aiguilles est-il le plus grand ?", "Quelle heure donne le plus grand angle ?", "À quelle heure les aiguilles sont-elles les plus écartées ?"]) : v(["Où l'angle des aiguilles est-il le plus petit ?", "Quelle heure donne le plus petit angle ?", "À quelle heure les aiguilles sont-elles les moins écartées ?"])}`);
};
const e3 = () => {
  const noms = melange(["A", "B", "C", "D"]).slice(0, 2);
  const cas = un(["egaux", "egaux", "piege", "piege", "piege"]);
  const d0 = un([40, 55, 70, 110, 130]);
  const d1_ = d0 < 60 ? d0 + 40 : d0 - 40;
  const degs = cas === "egaux" ? [d0, d0] : [d0, d1_];
  const longs = melange([55, 100]);
  // Dans le piège, les côtés les plus longs vont au plus petit angle.
  if (cas === "piege") {
    longs[0] = d0 < d1_ ? 100 : 55;
    longs[1] = d0 < d1_ ? 55 : 100;
  }
  const g = degs[0] === degs[1] ? "Ils sont égaux" : degs[0] > degs[1] ? `L'angle ${noms[0]}` : `L'angle ${noms[1]}`;
  return qcm(g, [`L'angle ${noms[0]}`, `L'angle ${noms[1]}`, "Ils sont égaux"], exp("la taille d'un angle dépend de son ouverture, pas de la longueur de ses côtés.", "on regarde l'écart entre les côtés.", degs[0] === degs[1] ? "les deux ouvertures sont les mêmes." : "l'un des angles est plus ouvert, même avec des côtés courts.", `la réponse est : ${g.toLowerCase()}.`), `${v(["Voici deux angles.", "Regarde ces deux angles.", "Attention aux longueurs des côtés.", "Les côtés n'ont pas la même longueur.", "Ne te laisse pas piéger par les longueurs."])} ${v(["Lequel est le plus grand ?", "Quel angle est le plus grand ?", "Lequel est le plus ouvert ?", "Quel angle est le plus ouvert ?"])}`, dessin(degs, noms, longs));
};
const E4: { q: string; r: string; f: string[] }[] = [
  { q: "On colle deux angles droits par un côté. Quel angle obtient-on ?", r: "Un angle plat", f: ["Un angle aigu", "Un angle droit", "Un tour complet"] },
  { q: "Deux angles droits collés forment :", r: "Un angle plat", f: ["Un angle aigu", "Un angle obtus", "Un tour complet"] },
  { q: "On colle un angle droit et un angle aigu. Quel angle obtient-on ?", r: "Un angle obtus", f: ["Un angle aigu", "Un angle droit", "Un angle plat"] },
  { q: "Un angle droit et un angle aigu collés forment :", r: "Un angle obtus", f: ["Un angle aigu", "Un angle droit", "Un angle plat"] },
  { q: "On partage un angle droit en deux angles égaux. Chaque moitié est :", r: "Un angle aigu", f: ["Un angle droit", "Un angle obtus", "Un angle plat"] },
  { q: "On colle deux moitiés d'angle droit. Quel angle obtient-on ?", r: "Un angle droit", f: ["Un angle aigu", "Un angle obtus", "Un angle plat"] },
  { q: "On colle quatre angles droits autour d'un point. Cela fait :", r: "Un tour complet", f: ["Un angle plat", "Un demi-tour", "Un angle droit"] },
  { q: "On colle trois angles droits. Il reste combien d'angles droits pour faire un tour complet ?", r: "Un", f: ["Deux", "Trois", "Quatre"] },
  { q: "Une part d'une tarte coupée en quatre parts égales a un angle :", r: "Droit", f: ["Aigu", "Obtus", "Plat"] },
  { q: "Une part d'une tarte coupée en huit parts égales a un angle :", r: "Aigu", f: ["Droit", "Obtus", "Plat"] },
  { q: "Une tarte coupée en trois parts égales. Chaque part a un angle :", r: "Obtus", f: ["Aigu", "Droit", "Plat"] },
  { q: "Une pizza coupée en deux parts égales. Chaque part a un angle :", r: "Plat", f: ["Aigu", "Droit", "Obtus"] },
  { q: "Un gâteau rond coupé en six parts égales. Chaque part a un angle :", r: "Aigu", f: ["Droit", "Obtus", "Plat"] },
];
const e4 = () => {
  const C = un(E4);
  return qcm(C.r, C.f, exp("un angle droit est un quart de tour ; deux angles droits font un angle plat.", "on imagine les angles collés et on compare au coin d'une feuille.", `ici : ${C.r.toLowerCase()}.`, `la réponse est : ${C.r.toLowerCase()}.`), `${v(["", "Sans mesurer.", "Imagine la scène.", "Pense au coin d'une feuille."])} ${C.q}`.trim());
};
const OBJ_E5 = [
  { n: "cartes postales rectangulaires", p: 4 }, { n: "affiches rectangulaires", p: 4 }, { n: "fenêtres carrées", p: 4 }, { n: "carreaux carrés", p: 4 }, { n: "photos rectangulaires", p: 4 }, { n: "drapeaux rectangulaires", p: 4 }, { n: "tapis rectangulaires", p: 4 }, { n: "timbres carrés", p: 4 }, { n: "tickets rectangulaires", p: 4 }, { n: "écrans rectangulaires", p: 4 },
  { n: "équerres en forme de triangle rectangle", p: 1 }, { n: "voiles en forme de triangle rectangle", p: 1 }, { n: "panneaux en forme de triangle rectangle", p: 1 },
];
const e5 = () => {
  const O = un(OBJ_E5);
  const k = entre(2, 9);
  const r = k * O.p;
  return qcmN(r, [k, k + 4, r + 4, r - 1, k * 2, k * 3].filter((x) => x !== r), exp("un rectangle ou un carré a 4 angles droits ; un triangle rectangle en a 1.", "on multiplie le nombre d'objets par le nombre d'angles droits de chacun.", `${k} × ${O.p} = ${r}.`, `il y a ${r} angles droits.`), `${v(["Il y a", "On compte", "Sur le mur, on voit", "Sur la table, il y a", "Dans la salle, on voit"])} ${k} ${O.n}. ${v(["Combien d'angles droits en tout ?", "Compte tous leurs angles droits.", "Cela fait combien d'angles droits ?"])}`);
};
const DIRS = ["le nord", "l'est", "le sud", "l'ouest"];
const e6 = () => {
  const dep = entre(0, 3);
  const k = un([1, 1, 2, 3]);
  const droite = Math.random() < 0.5;
  const arr = (dep + (droite ? k : 4 - k)) % 4;
  const tour = k === 1 ? "un quart de tour" : k === 2 ? "deux quarts de tour" : "trois quarts de tour";
  const qui = un(["Un robot", "Un drone", "Un marcheur", "Un pilote", "Un randonneur", "Un sous-marin", "Un cavalier", "Un nageur"]);
  return qcm(cap(DIRS[arr]), DIRS.filter((_, i) => i !== arr).map(cap), exp("un quart de tour, c'est tourner d'un angle droit.", "on tourne en suivant la boussole : nord, est, sud, ouest quand on va à droite.", `${DIRS[dep]}, puis ${tour} à ${droite ? "droite" : "gauche"}.`, `il regarde vers ${DIRS[arr]}.`), `${qui} regarde vers ${DIRS[dep]}. Il fait ${tour} à ${droite ? "droite" : "gauche"}. ${v(["Vers où regarde-t-il maintenant ?", "Quelle direction regarde-t-il ?", "Vers où est-il tourné ?"])}`);
};
const ORDRE_TYPES = ["aigu", "droit", "obtus", "plat"];
const e7 = (niveau: Niveau) => () => {
  const [x, y] = melange(LETTRES).slice(0, 2);
  const ts = niveau === "cm2" ? ORDRE_TYPES : ORDRE_TYPES.slice(0, 3);
  const inconnu = Math.random() < 0.2;
  let a = un(ts);
  let b = un(ts);
  if (inconnu) a = b = un(["aigu", "obtus"]);
  else while (a === b) b = un(ts);
  const grand = Math.random() < 0.5;
  const r = a === b ? "On ne peut pas savoir" : (ORDRE_TYPES.indexOf(a) > ORDRE_TYPES.indexOf(b)) === grand ? `L'angle ${x}` : `L'angle ${y}`;
  return qcm(r, [`L'angle ${x}`, `L'angle ${y}`, "On ne peut pas savoir"], exp("aigu, puis droit, puis obtus, puis plat : du plus petit au plus grand.", "le nom de l'angle dit sa place par rapport à l'angle droit.", a === b ? "deux angles du même type peuvent être différents : le nom ne suffit pas." : `l'angle ${x} est ${a}, l'angle ${y} est ${b}.`, `la réponse est : ${r.toLowerCase()}.`), `${v(["Sans figure.", "Pas de dessin.", "Réfléchis sans mesurer."])} L'angle ${x} est ${a}. L'angle ${y} est ${b}. ${grand ? v(["Lequel est le plus grand ?", "Quel angle est le plus ouvert ?"]) : v(["Lequel est le plus petit ?", "Quel angle est le moins ouvert ?"])}`);
};
const e8 = () => {
  const noms = ["A", "B", "C"];
  const degs = melange([un([25, 35, 45]), un([60, 70, 90]), un([115, 135, 155])]);
  const ordre = noms.map((n, i) => ({ n, d: degs[i] })).sort((a, b) => a.d - b.d).map((x) => x.n);
  const perms = [["A", "B", "C"], ["A", "C", "B"], ["B", "A", "C"], ["B", "C", "A"], ["C", "A", "B"], ["C", "B", "A"]].map((p) => p.join(", "));
  const croissant = Math.random() < 0.6;
  const j = (croissant ? ordre : [...ordre].reverse()).join(", ");
  return qcm(j, perms.filter((p) => p !== j), exp("plus les côtés sont écartés, plus l'angle est grand.", "on repère le plus fermé et le plus ouvert.", `du moins ouvert au plus ouvert : ${ordre.join(", ")}.`, `le bon ordre est ${j}.`), `${v(["Voici trois angles.", "Regarde ces trois angles.", "Observe ces angles."])} ${croissant ? v(["Range-les du plus petit au plus grand.", "Quel est l'ordre du plus petit au plus grand ?", "Du moins ouvert au plus ouvert, cela donne :"]) : v(["Range-les du plus grand au plus petit.", "Quel est l'ordre du plus grand au plus petit ?", "Du plus ouvert au moins ouvert, cela donne :"])}`, dessin(degs, noms));
};
const PLIABLES = ["une feuille", "une serviette", "une nappe", "un mouchoir", "un morceau de tissu", "un papier de soie", "une carte", "un drap"];
const e9 = () => {
  const o = un(PLIABLES);
  const qui = un(["Mia", "Léo", "Une couturière", "Une lingère", "Une fleuriste", "Un cuisinier", "Une élève", "Un artiste"]);
  const C = un([
    { p: `plie ${o} en deux, puis replie le pli sur lui-même`, r: "Un angle droit" },
    { p: `plie ${o} en quatre, bord sur bord`, r: "Un angle droit" },
    { p: `fait un angle droit par pliage, puis le replie en deux, bord sur bord`, r: "Un angle aigu" },
    { p: `plie ${o} en deux, replie le pli sur lui-même, puis replie encore ce coin en deux`, r: "Un angle aigu" },
  ]);
  return qcm(C.r, ["Un angle droit", "Un angle aigu", "Un angle obtus", "Un angle plat"], exp("le pli replié sur lui-même donne un angle droit.", "replier un angle en deux donne sa moitié.", "la moitié d'un angle droit est plus petite qu'un angle droit.", `on obtient : ${C.r.toLowerCase()}.`), `${qui} ${C.p}. ${v(["Quel angle obtient-on au coin ?", "Quel est l'angle du coin obtenu ?", "Le coin forme :", "L'angle du coin est :"])}`);
};

/* ───────────────────────── Le plan ───────────────────────── */

type Gabarit = { cle: string; micro: string; d: number; hint: string; gen: (n: Niveau) => () => TutorGeneratedQuestionV4 };
const seul = (f: () => TutorGeneratedQuestionV4) => () => f;
const H_COIN = "Pose le coin d'une feuille sur l'angle : colle-t-il exactement ?";
const H_TYPE = "Plus petit qu'un angle droit : aigu. Plus grand : obtus.";
const H_HEURE = "À 3 h pile, les aiguilles forment un angle droit.";

export const PLAN_ANGLES_REPERE_DROIT: Gabarit[] = [
  { cle: "d1", micro: "angle_droit", d: 1, hint: H_COIN, gen: seul(d1) },
  { cle: "d2", micro: "angle_droit", d: 1, hint: "Un rectangle a 4 coins droits.", gen: seul(d2) },
  { cle: "d3", micro: "angle_droit", d: 1, hint: "Cet outil a un coin bien droit.", gen: seul(d3) },
  { cle: "d4", micro: "angle_droit", d: 1, hint: "Compte les coins droits de la figure.", gen: seul(d4) },
  { cle: "d5", micro: "angle_droit", d: 2, hint: "Presque droit, ce n'est pas droit.", gen: seul(d5) },
  { cle: "d6", micro: "angle_droit", d: 2, hint: "Il faut un objet avec un coin bien droit.", gen: seul(d6) },
  { cle: "d7", micro: "angle_droit", d: 2, hint: H_HEURE, gen: seul(d7) },
  { cle: "d8", micro: "angle_droit", d: 2, hint: "Pense au coin d'une feuille.", gen: seul(d8) },
  { cle: "d9", micro: "angle_droit", d: 2, hint: H_COIN, gen: seul(d9) },
  { cle: "d10", micro: "angle_droit", d: 3, hint: "L'équerre doit toucher les deux côtés.", gen: seul(d10) },
  { cle: "d5b", micro: "angle_droit", d: 3, hint: "Presque droit, ce n'est pas droit.", gen: seul(d5) },
  { cle: "d9b", micro: "angle_droit", d: 3, hint: H_COIN, gen: seul(d9) },

  { cle: "t1", micro: "angle_type", d: 1, hint: H_TYPE, gen: t1 },
  { cle: "t2", micro: "angle_type", d: 1, hint: H_TYPE, gen: t2 },
  { cle: "t3", micro: "angle_type", d: 2, hint: "Dépasser du coin : plus grand qu'un angle droit.", gen: seul(t3) },
  { cle: "t4", micro: "angle_type", d: 2, hint: H_HEURE, gen: t4 },
  { cle: "t5", micro: "angle_type", d: 2, hint: H_TYPE, gen: seul(t5) },
  { cle: "t6", micro: "angle_type", d: 2, hint: "Le coin d'une feuille est un angle droit.", gen: seul(t6) },
  { cle: "t7", micro: "angle_type", d: 3, hint: H_TYPE, gen: seul(t7) },
  { cle: "t8", micro: "angle_type", d: 3, hint: H_TYPE, gen: seul(t8) },
  { cle: "t9", micro: "angle_type", d: 3, hint: H_TYPE, gen: t9 },

  { cle: "e1", micro: "angle_defi", d: 3, hint: "Compare chaque ouverture au coin d'une feuille.", gen: seul(e1) },
  { cle: "e3", micro: "angle_defi", d: 3, hint: "Seule l'ouverture compte, pas la longueur des côtés.", gen: seul(e3) },
  { cle: "e5", micro: "angle_defi", d: 3, hint: "Un rectangle a 4 angles droits, un triangle rectangle en a 1.", gen: seul(e5) },
  { cle: "e7", micro: "angle_defi", d: 3, hint: "Aigu, droit, obtus, plat : du plus petit au plus grand.", gen: e7 },
  { cle: "e2", micro: "angle_defi", d: 4, hint: "Compte les cases d'une heure entre les aiguilles.", gen: seul(e2) },
  { cle: "e4", micro: "angle_defi", d: 4, hint: "Imagine les angles collés.", gen: seul(e4) },
  { cle: "e6", micro: "angle_defi", d: 4, hint: "Dessine la boussole, et tourne.", gen: seul(e6) },
  { cle: "e8", micro: "angle_defi", d: 4, hint: "Cherche d'abord le plus fermé.", gen: seul(e8) },
  { cle: "e9", micro: "angle_defi", d: 4, hint: "Replier un angle en deux donne sa moitié.", gen: seul(e9) },
  { cle: "e2b", micro: "angle_defi", d: 5, hint: "Compte les cases d'une heure entre les aiguilles.", gen: seul(e2) },
  { cle: "e4b", micro: "angle_defi", d: 5, hint: "Imagine les angles collés.", gen: seul(e4) },
  { cle: "e8b", micro: "angle_defi", d: 5, hint: "Cherche d'abord le plus fermé.", gen: seul(e8) },
  { cle: "e6b", micro: "angle_defi", d: 5, hint: "Dessine la boussole, et tourne.", gen: seul(e6) },
];

export const idAngleRepere = (niveau: Niveau, g: { cle: string; micro: string }) => `${niveau}_${g.micro}_repere_${g.cle}`;

export function anglesRepereDroit(niveau: Niveau): TutorBankItemV4[] {
  return PLAN_ANGLES_REPERE_DROIT.map(
    (g) =>
      ({
        kind: "template",
        id: idAngleRepere(niveau, g),
        niveau,
        matiere: "maths",
        notionId: "angle",
        microId: g.micro,
        difficulty: g.d,
        theme: "neutral",
        hint: typo(g.hint),
        tags: ["angle", "repere_droit", "template"],
        generate: g.gen(niveau),
      }) as TutorBankItemV4,
  );
}
