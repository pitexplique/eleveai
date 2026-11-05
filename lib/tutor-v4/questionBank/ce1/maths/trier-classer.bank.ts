// TRIER ET CLASSER, CE1 (05/11/2026) : Suisse, Belgique, Sénégal, Côte d'Ivoire.
// Masqué en France (lib/tutor-v4/micros-masquees.ts). Phrases très courtes : ces élèves
// lisent peu. Aucune question ouverte. ★1-★2 sans histoire, ★3 avec un métier.
// Les réponses se CALCULENT depuis les propriétés de ../../tri-donnees.ts.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { atelier, etapes, melange, qcm, qcmN, tournure, un, cap } from "../../cm1/maths/trous-outils";
import {
  type Critere,
  type Domaine,
  type Objet,
  communs,
  contexte,
  deuxAuHasard,
  domaine,
  essayer,
  figureEnsembles,
  intrusUnique,
  liste,
  paquet,
  repartir,
  sat,
  tientSurLaFigure,
} from "../../tri-donnees";

/* ═════════════════ ce1_tri_critere ═════════════════ */
const C = atelier("ce1", "trier_classer", "ce1_tri_critere");
const HINT_C = "Regarde chaque objet. Pose-toi la question : oui ou non ?";

const preuve = (x: Objet, k: Critere, oui: boolean) => `${cap(x.le)} ${oui ? k.label : k.neg}.`;

function celuiQui(ctx: boolean, negatif: boolean) {
  const { d, k, p } = essayer(() => {
    const d = domaine();
    const k = un(d.criteres);
    const p = negatif ? paquet(d, k, 3, 1) : paquet(d, k, 1, 3);
    return p && { d, k, p };
  });
  const juste = negatif ? p.non[0] : p.oui[0];
  const faux = negatif ? p.oui : p.non;
  const ph = negatif ? k.neg : k.label;
  const demande = [`${d.quel} ${ph} ?`, `Trouve ${d.le} qui ${ph}.`, `Clique sur ${d.le} qui ${ph}.`, `Lequel ${ph} ?`, `Qui ${ph} ?`, `Cherche ${d.le} qui ${ph}.`];
  return {
    text: ctx ? `${contexte(d)} ${un(demande)}` : un(demande),
    ...qcm(juste.nom, faux.map((x) => x.nom)),
    explanation: etapes(`on regarde chaque réponse.`, `${preuve(juste, k, !negatif)} ${preuve(faux[0], k, negatif)}`, `La réponse est : ${juste.nom}.`),
  };
}

function saufUn() {
  const { d, k, p } = essayer(() => {
    const d = domaine();
    const k = un(d.criteres);
    const p = paquet(d, k, 3, 1);
    return p && { d, k, p };
  });
  const intrus = p.non[0];
  return {
    text: un([`${cap(d.ces)} ${k.pl}, sauf un. Lequel ?`, `Tous ${k.pl}, sauf un. Lequel ?`, `Trouve l'intrus : ${d.les} qui ${k.pl}.`, `Un seul n'est pas à sa place. Le groupe : ${d.les} qui ${k.pl}.`, `Groupe : ${d.les} qui ${k.pl}. Qui est l'intrus ?`]),
    ...qcm(intrus.nom, p.oui.map((x) => x.nom)),
    explanation: etapes(`on cherche celui qui ne va pas.`, preuve(intrus, k, false), `L'intrus est : ${intrus.nom}.`),
  };
}

/** Ce groupe a un point commun ; un seul des autres objets le partage. */
function vaAvec() {
  const { g, juste, faux, k } = essayer(() => {
    const d = domaine();
    const k = un(d.criteres);
    const p = paquet(d, k, 4, 12);
    if (!p) return null;
    const g = p.oui.slice(0, 3);
    const juste = p.oui[3];
    const partages = communs(g, d.criteres);
    const faux = p.non.filter((x) => !partages.some((m) => sat(x, m))).slice(0, 3);
    return faux.length === 3 && partages.some((m) => sat(juste, m)) && { g, juste, faux, k };
  });
  return {
    text: tournure([`Voici un groupe : ${liste(g)}.`, `Ce groupe : ${liste(g)}.`, `Le groupe : ${liste(g)}.`, `Regarde ce groupe : ${liste(g)}.`], ["Qui va avec ?", "Lequel va dans ce groupe ?", "Qui peut entrer ?", "Qui va avec eux ?"]),
    ...qcm(juste.nom, faux.map((x) => x.nom)),
    explanation: etapes(`on cherche le point commun du groupe.`, `Dans ce groupe, tous ${k.pl}. ${preuve(juste, k, true)}`, `${cap(juste.le)} va avec eux.`),
  };
}

function intrusSansCritere() {
  const { l, intrus, k } = essayer(() => {
    const d = domaine();
    const k = un(d.criteres);
    const p = paquet(d, k, 3, 1);
    if (!p) return null;
    const l = [...p.oui, ...p.non];
    const r = intrusUnique(l, d.criteres);
    return r === p.non[0] && { l, intrus: r, k };
  });
  return {
    text: un(["Trouve l'intrus.", "Qui est l'intrus ?", "Lequel n'est pas comme les autres ?", "Un seul ne va pas. Lequel ?", "Clique sur l'intrus.", "Qui ne va pas avec les autres ?"]),
    ...qcm(intrus.nom, l.filter((x) => x !== intrus).map((x) => x.nom)),
    explanation: etapes(`on cherche ce que les autres ont en commun.`, `Les autres ${k.pl}. ${preuve(intrus, k, false)}`, `L'intrus est : ${intrus.nom}.`),
  };
}

/** Deux groupes dessinés : quel critère les sépare ? Il n'y en a qu'un parmi les choix. */
function critereQuiASerVi(ctx: boolean) {
  const { d, k, g1, g2, faux } = essayer(() => {
    const d = domaine();
    const k = un(d.criteres);
    const p = paquet(d, k, 3, 3, 12);
    if (!p) return null;
    const separe = (m: Critere) => p.oui.every((x) => sat(x, m)) && p.non.every((x) => !sat(x, m));
    const faux = d.criteres.filter((m) => m !== k && !separe(m));
    return faux.length >= 2 && !d.criteres.some((m) => m !== k && separe(m)) && { d, k, g1: p.oui, g2: p.non, faux };
  });
  const figure: CanvasFigure = {
    kind: "ensembles",
    disjoints: true,
    ensembles: ["Groupe 1", "Groupe 2"],
    elements: [...g1.map((x) => ({ nom: x.nom, dans: [0] })), ...g2.map((x) => ({ nom: x.nom, dans: [1] }))],
  };
  const demande = ["Comment le groupe 1 est-il choisi ?", "Quel critère a servi pour le groupe 1 ?", "Chaque élément du groupe 1…", "Regarde le groupe 1. Chacun…", "Quel est le point commun du groupe 1 ?", "Que vérifie le groupe 1 ?"];
  return {
    text: ctx ? `${contexte(d)} ${un(["Il y a deux groupes.", "Voici deux groupes.", "On les trie en deux groupes."])} ${un(demande)}` : un(demande),
    ...qcm(k.label, faux.map((m) => m.label)),
    canvas: figure,
    explanation: etapes(`on cherche ce qui est vrai pour tout le groupe 1, et faux pour le groupe 2.`, `${preuve(g1[0], k, true)} ${preuve(g2[0], k, false)}`, `Le critère : ${k.label}.`),
  };
}

function combienDansListe() {
  const { d, k, l, n } = essayer(() => {
    const d = domaine();
    const k = un(d.criteres);
    const nOui = 1 + Math.floor(Math.random() * 3);
    const p = paquet(d, k, nOui, 5 - nOui);
    return p && { d, k, l: melange([...p.oui, ...p.non]), n: nOui };
  });
  return {
    text: `${contexte(d)} ${tournure([`Liste : ${liste(l)}.`, `Il y a : ${liste(l)}.`, `Voici : ${liste(l)}.`], [`Combien ${k.pl} ?`, `Dans cette liste, combien ${k.pl} ?`, `Il y en a combien qui ${k.pl} ?`])}`,
    ...qcmN(n, [n + 1, n + 2, n - 1, 5]),
    explanation: etapes(`on compte ceux qui ${k.pl}.`, `Ceux qui ${k.pl} : ${liste(l.filter((x) => sat(x, k)))}.`, `Il y en a ${n}.`),
  };
}

const triCritere: TutorBankItemV4[] = [
  C(1, 1, HINT_C, () => celuiQui(false, false)),
  C(2, 1, HINT_C, () => saufUn()),
  C(3, 1, "Trouve d'abord le point commun du groupe.", () => vaAvec()),
  C(4, 2, HINT_C, () => celuiQui(false, true)),
  C(5, 2, "Cherche ce que trois d'entre eux ont en commun.", () => intrusSansCritere()),
  C(6, 2, "Essaie chaque critère sur le groupe 1, puis sur le groupe 2.", () => critereQuiASerVi(false)),
  C(7, 3, HINT_C, () => celuiQui(true, false)),
  C(8, 3, "Essaie chaque critère sur le groupe 1, puis sur le groupe 2.", () => critereQuiASerVi(true)),
  C(9, 3, "Compte seulement ceux qui répondent oui.", () => combienDansListe()),
];

/* ═════════════════ ce1_tri_ensembles ═════════════════ */
const E = atelier("ce1", "trier_classer", "ce1_tri_ensembles");
const HINT_E = "Au milieu, c'est dans les deux ensembles à la fois.";

type Deux = { d: Domaine; a: Critere; b: Critere; l: Objet[]; fig: CanvasFigure; ab: Objet[]; seulA: Objet[]; seulB: Objet[]; dehors: Objet[]; autres: Objet[] };

/** Deux ensembles qui se croisent. Toutes les zones se calculent. */
function deuxEnsembles(condition: (z: Deux) => boolean = () => true): Deux {
  return essayer(() => {
    const d = domaine();
    const [a, b] = deuxAuHasard(d.criteres);
    const l = repartir(d, [a, b], 7, 12);
    const fig = figureEnsembles(l, [a, b]);
    const z: Deux = {
      d, a, b, l, fig,
      ab: l.filter((x) => sat(x, a) && sat(x, b)),
      seulA: l.filter((x) => sat(x, a) && !sat(x, b)),
      seulB: l.filter((x) => !sat(x, a) && sat(x, b)),
      dehors: l.filter((x) => !sat(x, a) && !sat(x, b)),
      autres: melange(d.objets().filter((x) => !l.some((y) => y.nom === x.nom) && x.nom.length <= 12)),
    };
    return z.ab.length >= 1 && z.seulA.length >= 1 && z.seulB.length >= 1 && tientSurLaFigure(fig) && condition(z) && z;
  });
}

const lis = ["Regarde le dessin.", "Lis le dessin.", "Observe les ensembles.", ""];

function quiDansA() {
  const z = deuxEnsembles((y) => y.seulB.length + y.dehors.length >= 2);
  const [k, dans] = un<[Critere, Objet[]]>([[z.a, [...z.seulA, ...z.ab]], [z.b, [...z.seulB, ...z.ab]]]);
  const juste = un(dans);
  const faux = z.l.filter((x) => !sat(x, k));
  return {
    text: tournure(lis, [`Qui est dans « ${k.label} » ?`, `Qui va dans « ${k.label} » ?`, `Trouve un élément de « ${k.label} ».`, `Clique sur un élément de « ${k.label} ».`]),
    ...qcm(juste.nom, faux.map((x) => x.nom)),
    canvas: z.fig,
    explanation: etapes(`on regarde dans le cercle « ${k.label} ».`, `${cap(juste.le)} est dans ce cercle.`, `La réponse est : ${juste.nom}.`),
  };
}

function quiDansLesDeux() {
  const z = deuxEnsembles((y) => y.ab.length === 1);
  return {
    text: tournure(lis, [`Qui est dans « ${z.a.label} » et dans « ${z.b.label} » ?`, `Qui est dans les deux ensembles ?`, `Qui est au milieu du dessin ?`, `Qui ${z.a.label} et ${z.b.label} ?`]),
    ...qcm(z.ab[0].nom, z.l.filter((x) => x !== z.ab[0]).map((x) => x.nom)),
    canvas: z.fig,
    explanation: etapes(`on regarde là où les deux cercles se croisent.`, `${cap(z.ab[0].le)} ${z.a.label}, et ${z.b.label}.`, `La réponse est : ${z.ab[0].nom}.`),
  };
}

function quiSeulement() {
  const z = deuxEnsembles((y) => y.seulA.length >= 1 && y.ab.length + y.seulB.length + y.dehors.length >= 2);
  const juste = un(z.seulA);
  const faux = z.l.filter((x) => !z.seulA.includes(x));
  return {
    text: tournure(lis, [`Qui est dans « ${z.a.label} » seulement ?`, `Qui est dans « ${z.a.label} », mais pas dans « ${z.b.label} » ?`, `Qui ${z.a.label} et ${z.b.neg} ?`]),
    ...qcm(juste.nom, faux.map((x) => x.nom)),
    canvas: z.fig,
    explanation: etapes(`on regarde le cercle « ${z.a.label} », sans le milieu.`, `${cap(juste.le)} n'est que dans ce cercle.`, `La réponse est : ${juste.nom}.`),
  };
}

function combienLesDeux(ctx: boolean) {
  const z = deuxEnsembles();
  const n = z.ab.length;
  const debut = ctx ? `${contexte(z.d)} ` : "";
  return {
    text: debut + un([`Combien sont dans « ${z.a.label} » et dans « ${z.b.label} » ?`, `Combien sont dans les deux ensembles : « ${z.a.label} », « ${z.b.label} » ?`, `Au milieu de « ${z.a.label} » et « ${z.b.label} », il y en a combien ?`]),
    ...qcmN(n, [n + 1, z.l.length, z.seulA.length + n, z.seulB.length + n]),
    canvas: z.fig,
    explanation: etapes(`on compte dans la partie du milieu.`, `Au milieu : ${liste(z.ab)}.`, `Il y en a ${n}.`),
  };
}

function combienSeulement() {
  const z = deuxEnsembles();
  const n = z.seulA.length;
  return {
    text: un([`Combien sont dans « ${z.a.label} » seulement ?`, `Combien sont dans « ${z.a.label} », mais pas dans « ${z.b.label} » ?`, `« ${z.a.label} » seulement : il y en a combien ?`]),
    ...qcmN(n, [n + z.ab.length, n + 1, z.seulB.length, z.ab.length]),
    canvas: z.fig,
    explanation: etapes(`on compte dans « ${z.a.label} », sans le milieu.`, `Dans « ${z.a.label} » seulement : ${liste(z.seulA)}.`, `Il y en a ${n}.`),
  };
}

function ouVa(ctx: boolean) {
  const z = deuxEnsembles((y) => y.autres.length > 0);
  const x = un(z.autres);
  const A = `Dans « ${z.a.label} » seulement`;
  const B = `Dans « ${z.b.label} » seulement`;
  const les2 = "Dans les deux";
  const hors = "En dehors";
  const juste = sat(x, z.a) ? (sat(x, z.b) ? les2 : A) : sat(x, z.b) ? B : hors;
  const debut = ctx ? `${contexte(z.d)} ` : "";
  return {
    text: debut + un([`Où va ${x.le} ?`, `Où placer ${x.le} ?`, `Où ranger ${x.le} ?`, `On ajoute ${x.le}. Dans quelle zone ?`]),
    ...qcm(juste, [A, B, les2, hors]),
    canvas: z.fig,
    explanation: etapes(`on pose les deux questions.`, `${cap(x.le)} ${sat(x, z.a) ? z.a.label : z.a.neg}. ${cap(x.le)} ${sat(x, z.b) ? z.b.label : z.b.neg}.`, `La réponse : ${juste}.`),
  };
}

function combienEnTout() {
  const z = deuxEnsembles();
  const n = z.seulA.length + z.ab.length;
  return {
    text: `${contexte(z.d)} ${un([`Combien ${z.a.pl} ?`, `En tout, combien ${z.a.pl} ?`, `Dans « ${z.a.label} », il y en a combien en tout ?`])}`,
    ...qcmN(n, [z.seulA.length, n + 1, z.l.length, z.seulB.length + z.ab.length]),
    canvas: z.fig,
    explanation: etapes(`on compte tout le cercle, avec le milieu.`, `${z.seulA.length} + ${z.ab.length} = ${n}.`, `${n} ${z.a.pl}.`),
  };
}

const triEnsembles: TutorBankItemV4[] = [
  E(1, 1, "Regarde ce qui est dans ce cercle.", () => quiDansA()),
  E(2, 1, HINT_E, () => quiDansLesDeux()),
  E(3, 1, "Regarde ce cercle, sans le milieu.", () => quiSeulement()),
  E(4, 2, HINT_E, () => combienLesDeux(false)),
  E(5, 2, "Regarde ce cercle, sans le milieu.", () => combienSeulement()),
  E(6, 2, "Pose les deux questions : oui ou non ?", () => ouVa(false)),
  E(7, 3, "Pose les deux questions : oui ou non ?", () => ouVa(true)),
  E(8, 3, HINT_E, () => combienLesDeux(true)),
  E(9, 3, "Tout le cercle compte, le milieu aussi.", () => combienEnTout()),
];

export const trierClasserBank: TutorBankItemV4[] = [...triCritere, ...triEnsembles];
