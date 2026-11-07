// CARRÉ, CUBE ET PUISSANCES SIMPLES, EN 5e (07/11/2026). Visible en France.
//
// Pourquoi ici : le programme de cycle 4 (arrêté du 18/02/2026, BO n° 10 du 05/03/2026) s'applique
// en 5e depuis la rentrée 2026. Il demande : découvrir la puissance et sa notation pour le carré et
// le cube ; connaître les carrés de 0 à 12 et le cube de 10 ; écrire un nombre sous la forme d'une
// puissance 2 ou 3 ; calculer des expressions à puissances simples, additions, soustractions et
// produits ; calculer une expression littérale contenant une puissance simple. Automatismes :
// 2² = 4, 2³ = 8, 3³ = 27, 10² = 100, 10³ = 1 000.
// Avant ce fichier, aucune micro de 5e ne le faisait : `litteral_calcul` réduit des x², sans jamais
// remplacer x par un nombre dans une puissance.
//
// ⛔ Pas d'exposant négatif, pas d'exposant au-delà de 3 (4e) ; pas de règle sur les produits de
// puissances (4e et 3e). Aucun produit de deux puissances de même base ni de même exposant.
// ★1-★2 : le geste nu, sans prénom ni métier (★1 : 12 mots au plus, ★2 : 15). ★3 et plus : une
// situation, 25 mots au plus. Exposants en Unicode, comme en 4e (voir puissances.bank.ts).
// Les valeurs se tapent au clavier ; le QCM sert aux écritures, aux pièges et aux unités.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { atelier, entre, etapes, fr, melange, qcm, qcmN, un } from "../../cm1/maths/trous-outils";

const NOTION = "puissance_simple";
const MN = atelier("5e", NOTION, "puissance_simple_notation");
const MV = atelier("5e", NOTION, "puissance_simple_valeurs");
const ME = atelier("5e", NOTION, "puissance_simple_ecrire");
const MC = atelier("5e", NOTION, "puissance_simple_calculer");
const ML = atelier("5e", NOTION, "puissance_simple_litteral");

const NBSP = " ";
/** Une expression ne se coupe pas en fin de ligne, à 375 px. */
const e = (s: string | number) => String(s).replace(/ /g, NBSP);
const CHIFFRES = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup = (n: number) => String(n).replace(/\d/g, (d) => CHIFFRES[Number(d)]);
const P = (b: number | string, x: number) => `${typeof b === "number" ? fr(b) : b}${sup(x)}`;
const produit = (b: number | string, x: number) => e(Array(x).fill(typeof b === "number" ? fr(b) : b).join(" × "));
const LETTRES = ["x", "y", "a", "n", "t"];
const CUBES = [2, 3, 4, 5, 10];
const court = (x: number) => ({ format: "short" as const, expected: [fr(x)], comparator: "number_equal" as const });
const vf = (vrai: boolean) => qcm(vrai ? "Vrai" : "Faux", [vrai ? "Faux" : "Vrai"]);

/** Une puissance à écrire : exposant 2 ou 3, base différente de l'exposant. */
function puiss(): { b: number; x: number } {
  for (;;) {
    const x = Math.random() < 0.55 ? 2 : 3;
    const b = x === 2 ? entre(2, 12) : un(CUBES);
    if (b !== x) return { b, x };
  }
}
const valeur = (b: number, x: number) => b ** x;
/* L'exposant et le nombre échangés : le piège classique, sauf quand il tombe juste (4² = 2⁴). */
const renverse = (b: number, x: number) => (b ** x === x ** b ? e(`${b} × ${x}`) : `${x}${sup(b)}`);
const nomExp = (x: number) => (x === 2 ? "carré" : "cube");

const CALCULE = (x: string) => [
  `Calcule ${x}.`, `Effectue ${x}.`, `Trouve ${x}.`, `Que vaut ${x} ?`, `Combien fait ${x} ?`, `Donne la valeur de ${x}.`, `${x} = ?`, `Complète : ${x} = …`, `Quel est le résultat de ${x} ?`, `Que donne ${x} ?`, `Écris le résultat de ${x}.`, `Quel nombre vaut ${x} ?`, `Cherche ${x}.`, `Donne le résultat de ${x}.`,
];
const VRAI_FAUX = (x: string) => [
  `${x}. Vrai ou faux ?`, `Vrai ou faux : ${x}.`, `${x} : vrai ou faux ?`, `On écrit ${x}. Vrai ou faux ?`, `Cette égalité est-elle vraie ? ${x}`, `Est-il vrai que ${x} ?`, `Est-ce juste ? ${x}`, `Cette écriture est-elle juste ? ${x}`, `Regarde bien : ${x}. Vrai ou faux ?`, `On lit : ${x}. Est-ce vrai ?`, `Contrôle : ${x}. Vrai ou faux ?`, `Une égalité : ${x}. Vrai ou faux ?`,
];

/* ═════════ LES SITUATIONS (★3 et plus) ═════════ */
type Rang = { t: (n: string) => string; quoi: string };
const RANGS: Rang[] = [
  { t: (n) => `Une carreleuse pose ${n} rangées de ${n} carreaux.`, quoi: "carreaux" },
  { t: (n) => `Un écran de jeu affiche ${n} lignes de ${n} pixels.`, quoi: "pixels" },
  { t: (n) => `Une fanfare défile en ${n} rangs de ${n} musiciens.`, quoi: "musiciens" },
  { t: (n) => `Une apicultrice installe ${n} rangées de ${n} ruches.`, quoi: "ruches" },
  { t: (n) => `Un technicien pose ${n} rangées de ${n} panneaux solaires.`, quoi: "panneaux" },
  { t: (n) => `Une grille de mots croisés a ${n} lignes de ${n} cases.`, quoi: "cases" },
  { t: (n) => `Une pharmacienne range ${n} rangées de ${n} boîtes.`, quoi: "boîtes" },
  { t: (n) => `Une pâtissière dispose ${n} rangs de ${n} macarons.`, quoi: "macarons" },
  { t: (n) => `Une maraîchère sème ${n} rangs de ${n} salades.`, quoi: "salades" },
  { t: (n) => `Une architecte dessine ${n} rangées de ${n} fenêtres.`, quoi: "fenêtres" },
  { t: (n) => `Un stade aligne ${n} rangées de ${n} projecteurs.`, quoi: "projecteurs" },
  { t: (n) => `Une biologiste prépare ${n} rangées de ${n} tubes.`, quoi: "tubes" },
  { t: (n) => `Un club de danse se place en ${n} lignes de ${n} danseurs.`, quoi: "danseurs" },
  { t: (n) => `Une bibliothécaire remplit ${n} étagères de ${n} livres.`, quoi: "livres" },
  { t: (n) => `Un photographe installe ${n} rangs de ${n} choristes.`, quoi: "choristes" },
  { t: (n) => `Un planteur de Saint-Paul aligne ${n} rangs de ${n} pieds de canne.`, quoi: "pieds" },
];
const BLOCS: Rang[] = [
  { t: (n) => `Une caisse contient ${n} couches de ${n} rangées de ${n} boîtes.`, quoi: "boîtes" },
  { t: (n) => `Un grand cube a ${n} étages de ${n} rangées de ${n} petits cubes.`, quoi: "petits cubes" },
  { t: (n) => `Un entrepôt empile ${n} niveaux de ${n} rangées de ${n} palettes.`, quoi: "palettes" },
  { t: (n) => `Un jeu vidéo construit un bloc de ${n} couches de ${n} lignes de ${n} briques.`, quoi: "briques" },
  { t: (n) => `Un carton contient ${n} étages de ${n} rangées de ${n} savons.`, quoi: "savons" },
  { t: (n) => `Un confiseur monte ${n} étages de ${n} rangées de ${n} chocolats.`, quoi: "chocolats" },
  { t: (n) => `Un port empile ${n} niveaux de ${n} rangées de ${n} conteneurs.`, quoi: "conteneurs" },
  { t: (n) => `Une cave range ${n} étages de ${n} rangées de ${n} bouteilles.`, quoi: "bouteilles" },
  { t: (n) => `Une imprimante pose ${n} couches de ${n} lignes de ${n} plots.`, quoi: "plots" },
  { t: (n) => `Une serre empile ${n} étages de ${n} rangées de ${n} pots.`, quoi: "pots" },
];
/* e choix successifs, b possibilités à chaque fois : b puissance e. L'exposant vient en premier. */
type Code = { t: (x: number, b: number) => string; b: number[]; quoi: string };
const CODES: Code[] = [
  { t: (x, b) => `Un cadenas a ${x} molettes de ${b} chiffres.`, b: [10], quoi: "codes" },
  { t: (x, b) => `Un tableau a ${x} interrupteurs à ${b} positions.`, b: [2, 3], quoi: "réglages" },
  { t: (x, b) => `On lance ${x} dés à ${b} faces.`, b: [6, 4], quoi: "résultats" },
  { t: (x, b) => `Un code a ${x} cases, chacune de ${b} couleurs possibles.`, b: [3, 4, 5], quoi: "codes" },
  { t: (x, b) => `Un robot fait ${x} pas, avec ${b} directions à chaque pas.`, b: [2, 3, 4], quoi: "trajets" },
  { t: (x, b) => `Un message a ${x} signes, chacun parmi ${b} symboles.`, b: [2, 3, 5], quoi: "messages" },
  { t: (x, b) => `Un QCM a ${x} questions de ${b} réponses chacune.`, b: [3, 4], quoi: "façons de répondre" },
  { t: (x, b) => `Une tenue se compose de ${x} habits, à choisir chacun parmi ${b} modèles.`, b: [3, 4, 5], quoi: "tenues" },
];
const SURFACES = [
  { s: "Une terrasse carrée", u: "m" }, { s: "Un potager carré", u: "m" }, { s: "Une tuile carrée", u: "cm" }, { s: "Une parcelle carrée", u: "m" }, { s: "Un tatami carré", u: "dm" }, { s: "Une salle carrée", u: "m" }, { s: "Une dalle carrée", u: "dm" }, { s: "Un bassin carré", u: "m" }, { s: "Une toile carrée", u: "dm" }, { s: "Un vitrail carré", u: "cm" }, { s: "Un panneau carré", u: "dm" }, { s: "Un ring de boxe carré", u: "m" },
];
const SOLIDES = [
  { s: "Une caisse cubique", u: "dm" }, { s: "Un aquarium cubique", u: "dm" }, { s: "Un dé géant", u: "cm" }, { s: "Un glaçon cubique", u: "cm" }, { s: "Un coffre cubique", u: "dm" }, { s: "Une boîte cubique", u: "cm" }, { s: "Un bloc de pierre cubique", u: "m" }, { s: "Un conteneur cubique", u: "m" }, { s: "Un cube de bois", u: "cm" }, { s: "Un réservoir cubique", u: "m" },
];
const QUEST_ECR = (quoi: string) => [`Quelle écriture donne le nombre de ${quoi} ?`, `Comment écrire ce nombre de ${quoi} avec une puissance ?`, `Quelle puissance donne le nombre de ${quoi} ?`, `Quel calcul compte les ${quoi} ?`];
const QUEST_VAL = (quoi: string) => [`Combien de ${quoi} ?`, `Combien y a-t-il de ${quoi} ?`, `Calcule le nombre de ${quoi}.`, `Quel est le nombre de ${quoi} ?`];

/* ═════════ 1. LA NOTATION ═════════ */
function nDevelopper() {
  const { b, x } = puiss();
  const ecr = P(b, x);
  return {
    text: un([`${ecr} est égal à quel produit ?`, `Quel produit vaut ${ecr} ?`, `Écris ${ecr} sous forme de produit.`, `${ecr} : quel produit choisir ?`, `Quel calcul cache ${ecr} ?`, `Que veut dire ${ecr} ?`, `Quel calcul correspond à ${ecr} ?`, `Écris ${ecr} sans exposant.`, `${ecr} s'écrit aussi comment ?`, `Trouve le produit égal à ${ecr}.`, `Comment calculer ${ecr} ?`, `Quelle multiplication donne ${ecr} ?`, `Choisis le produit égal à ${ecr}.`, `Par quel produit remplacer ${ecr} ?`]),
    ...qcm(produit(b, x), [e(`${fr(b)} × ${x}`), e(`${fr(b)} + ${x}`), e(`${x} × ${x}`), produit(b, x === 2 ? 3 : 2)]),
    explanation: etapes(`l'exposant dit combien de fois on écrit le nombre dans le produit.`, `${ecr} = ${produit(b, x)} = ${fr(valeur(b, x))}.`, `${ecr} = ${produit(b, x)}, et pas ${e(`${fr(b)} × ${x}`)}.`),
  };
}
function nCondenser() {
  const { b, x } = puiss();
  const pr = produit(b, x);
  return {
    text: un([`Comment écrire ${pr} avec une puissance ?`, `Écris ${pr} avec un exposant.`, `Quelle puissance vaut ${pr} ?`, `${pr} s'écrit comment ?`, `Écris plus court : ${pr}.`, `Remplace ${pr} par une puissance.`, `${pr} : quelle écriture choisir ?`, `Quelle écriture est égale à ${pr} ?`, `Trouve la puissance égale à ${pr}.`, `Choisis la puissance égale à ${pr}.`, `Raccourcis ${pr}.`, `Quelle est l'écriture courte de ${pr} ?`, `Comment noter ${pr} ?`]),
    ...qcm(P(b, x), [renverse(b, x), P(b, x === 2 ? 3 : 2), e(`${fr(b)} × ${x}`), fr(b * x)]),
    explanation: etapes(`on compte combien de fois le nombre est écrit dans le produit.`, `${fr(b)} est écrit ${x} fois.`, `${pr} = ${P(b, x)}.`),
  };
}
function nLire() {
  const { b, x } = puiss();
  const nom = x === 2 ? "au carré" : "au cube";
  if (Math.random() < 0.5) {
    return {
      text: un([`Comment se lit ${P(b, x)} ?`, `Comment dire ${P(b, x)} à voix haute ?`, `Comment lire ${P(b, x)} ?`, `${P(b, x)} se lit comment ?`, `Lis ${P(b, x)} : que dis-tu ?`, `Quelle phrase dit ${P(b, x)} ?`, `On lit ${P(b, x)} comment ?`]),
      ...qcm(`${fr(b)} ${nom}`, [`${fr(b)} ${x === 2 ? "au cube" : "au carré"}`, `${x} fois ${fr(b)}`, `${fr(b)} plus ${x}`, `${x} au ${b === 2 ? "double" : "carré"}`]),
      explanation: etapes(`l'exposant 2 se lit « au carré », l'exposant 3 se lit « au cube ».`, `${P(b, x)} = ${produit(b, x)}.`, `${P(b, x)} se lit « ${fr(b)} ${nom} ».`),
    };
  }
  return {
    text: un([`Comment écrire « ${fr(b)} ${nom} » ?`, `Écris « ${fr(b)} ${nom} » en chiffres.`, `Quelle écriture pour « ${fr(b)} ${nom} » ?`, `« ${fr(b)} ${nom} » s'écrit comment ?`, `Quelle écriture dit « ${fr(b)} ${nom} » ?`, `On entend « ${fr(b)} ${nom} ». Qu'écris-tu ?`, `Note « ${fr(b)} ${nom} ».`]),
    ...qcm(P(b, x), [P(b, x === 2 ? 3 : 2), renverse(b, x), e(`${fr(b)} × ${x}`)]),
    explanation: etapes(`« au carré » donne l'exposant 2, « au cube » donne l'exposant 3.`, `${P(b, x)} = ${produit(b, x)}.`, `« ${fr(b)} ${nom} » s'écrit ${P(b, x)}.`),
  };
}
function nVraiFaux() {
  const { b, x } = puiss();
  const vrai = Math.random() < 0.45;
  const droite = vrai ? produit(b, x) : un([e(`${fr(b)} × ${x}`), e(`${fr(b)} + ${x}`)]);
  return {
    text: un(VRAI_FAUX(e(`${P(b, x)} = ${droite}`))),
    ...vf(vrai),
    explanation: etapes(`l'exposant dit combien de fois on écrit le nombre dans le produit.`, `${P(b, x)} = ${produit(b, x)} = ${fr(valeur(b, x))}.`, vrai ? `C'est vrai.` : `C'est faux : ${droite} ne vaut pas ${P(b, x)}.`),
  };
}
function nErreur() {
  const { b, x } = (() => { for (;;) { const p = puiss(); if (p.b > 3) return p; } })();
  const parFois = Math.random() < 0.6;
  const faux = parFois ? b * x : b + x;
  const eq = e(`${P(b, x)} = ${fr(faux)}`);
  const juste = parFois ? `On a calculé ${e(`${fr(b)} × ${x}`)}` : `On a calculé ${e(`${fr(b)} + ${x}`)}`;
  return {
    text: un([`On écrit ${eq}. Quelle est l'erreur ?`, `${eq} est faux. Pourquoi ?`, `D'où vient l'erreur dans ${eq} ?`, `Trouve l'erreur : ${eq}.`, `${eq} : qu'a-t-on mal calculé ?`, `Pourquoi ${eq} est-il faux ?`, `Quelle erreur donne ${eq} ?`, `L'égalité ${eq} est fausse. Qu'a-t-on fait ?`, `Quel calcul a donné ${eq} ?`, `Explique l'erreur : ${eq}.`, `${eq} : d'où vient ce résultat ?`, `Quelle faute cache ${eq} ?`, `Repère la faute : ${eq}.`]),
    ...qcm(juste, [parFois ? `On a calculé ${e(`${fr(b)} + ${x}`)}` : `On a calculé ${e(`${fr(b)} × ${x}`)}`, `On a calculé ${produit(x, x)}`, `On a calculé ${produit(b, x)}`]),
    explanation: etapes(`l'exposant n'est pas un facteur : on répète le nombre.`, `${P(b, x)} = ${produit(b, x)} = ${fr(valeur(b, x))}.`, `${juste}, au lieu de ${produit(b, x)}.`),
  };
}
function nExposant() {
  const { b, x } = puiss();
  const pr = produit(b, x);
  return {
    text: un([`Quel exposant pour écrire ${pr} ?`, `${pr} = ${fr(b)} exposant combien ?`, `On écrit ${pr} avec ${fr(b)}. Quel exposant ?`, `Quel est l'exposant de ${pr} ?`, `Combien de facteurs dans ${pr} ?`, `Écris ${pr} en puissance. Quel exposant mets-tu ?`, `Quel nombre mettre en exposant pour ${pr} ?`, `Donne l'exposant de ${pr}.`, `${pr} : quel est l'exposant ?`, `Dans ${pr}, combien de fois lit-on ${fr(b)} ?`, `L'exposant de ${pr} vaut combien ?`, `Trouve l'exposant de ${pr}.`]),
    ...court(x),
    explanation: etapes(`on compte les facteurs égaux.`, `${fr(b)} est écrit ${x} fois.`, `${pr} = ${P(b, x)} : l'exposant est ${x}.`),
  };
}
function nLettre() {
  const l = un(LETTRES);
  const mode = entre(0, 3);
  if (mode === 0) {
    return {
      text: un([`Comment écrire ${e(`${l} × ${l}`)} ?`, `${e(`${l} × ${l}`)} s'écrit comment ?`, `Écris ${e(`${l} × ${l}`)} avec un exposant.`, `Quelle écriture vaut ${e(`${l} × ${l}`)} ?`, `Raccourcis ${e(`${l} × ${l}`)}.`, `Écris plus court : ${e(`${l} × ${l}`)}.`]),
      ...qcm(`${l}²`, [`2${l}`, e(`${l} + 2`), e(`${l} + ${l}`)]),
      explanation: etapes(`la lettre est écrite deux fois dans un produit.`, `${e(`${l} × ${l}`)} = ${l}².`, `${e(`${l} × ${l}`)} = ${l}², et pas 2${l}.`),
    };
  }
  if (mode === 1) {
    return {
      text: un([`Comment écrire ${produit(l, 3)} ?`, `${produit(l, 3)} s'écrit comment ?`, `Écris ${produit(l, 3)} avec un exposant.`, `Quelle écriture vaut ${produit(l, 3)} ?`, `Raccourcis ${produit(l, 3)}.`, `Écris plus court : ${produit(l, 3)}.`]),
      ...qcm(`${l}³`, [`3${l}`, e(`${l} + 3`), `${l}²`]),
      explanation: etapes(`la lettre est écrite trois fois dans un produit.`, `${produit(l, 3)} = ${l}³.`, `${produit(l, 3)} = ${l}³, et pas 3${l}.`),
    };
  }
  if (mode === 2) {
    return {
      text: un([`Quel produit vaut ${l}² ?`, `Que veut dire ${l}² ?`, `${l}² est égal à quel produit ?`, `Quel calcul cache ${l}² ?`, `Écris ${l}² comme un produit.`, `Écris ${l}² sans exposant.`]),
      ...qcm(e(`${l} × ${l}`), [e(`2 × ${l}`), e(`${l} + ${l}`), e(`${l} + 2`)]),
      explanation: etapes(`l'exposant 2 répète la lettre deux fois dans un produit.`, `${l}² = ${e(`${l} × ${l}`)}.`, `${l}² n'est pas 2${l} : 2${l} = ${e(`${l} + ${l}`)}.`),
    };
  }
  return {
    text: un([`Quelle écriture vaut ${e(`${l} + ${l}`)} ?`, `${e(`${l} + ${l}`)} s'écrit comment ?`, `Attention : que vaut ${e(`${l} + ${l}`)} ?`, `Simplifie ${e(`${l} + ${l}`)}.`, `Écris plus court : ${e(`${l} + ${l}`)}.`, `Addition, pas produit : que vaut ${e(`${l} + ${l}`)} ?`]),
    ...qcm(`2${l}`, [`${l}²`, e(`${l} × ${l}`), `${l}³`]),
    explanation: etapes(`une somme de deux lettres égales n'est pas une puissance.`, `${e(`${l} + ${l}`)} = ${e(`2 × ${l}`)}.`, `${e(`${l} + ${l}`)} = 2${l}, alors que ${e(`${l} × ${l}`)} = ${l}².`),
  };
}
function nIntrus() {
  const { b, x } = puiss();
  const ecr = P(b, x);
  const juste = e(`${fr(b)} × ${x}`);
  return {
    text: un([`Quelle écriture n'est PAS égale à ${ecr} ?`, `Quel calcul ne vaut PAS ${ecr} ?`, `Trouve l'intrus : qui ne vaut pas ${ecr} ?`, `Laquelle est différente de ${ecr} ?`, `Une écriture ne vaut pas ${ecr}. Laquelle ?`, `Élimine ce qui ne vaut pas ${ecr}.`, `Qui n'est pas égal à ${ecr} ?`, `Quel intrus s'est glissé parmi les écritures de ${ecr} ?`, `Repère l'écriture fausse de ${ecr}.`, `${ecr} : quelle écriture est fausse ?`, `Quelle écriture de ${ecr} est fausse ?`, `Choisis l'écriture qui ne vaut pas ${ecr}.`]),
    ...qcm(juste, [produit(b, x), fr(valeur(b, x)), `${fr(b)} ${x === 2 ? "au carré" : "au cube"}`]),
    explanation: etapes(`on répète le nombre, on ne le multiplie pas par l'exposant.`, `${ecr} = ${produit(b, x)} = ${fr(valeur(b, x))}, et ${juste} = ${fr(b * x)}.`, `L'intrus est ${juste}.`),
  };
}
function nRangs() {
  const s = un(RANGS);
  const n = entre(3, 12);
  return {
    text: `${s.t(String(n))} ${un(QUEST_ECR(s.quoi))}`,
    ...qcm(`${n}²`, [`${n} × 2`, renverse(n, 2), `${n}³`, `${n} + ${n}`].map(e)),
    explanation: etapes(`${n} rangées de ${n}, c'est ${n} multiplié par lui-même.`, `${e(`${n} × ${n}`)} = ${n}² = ${fr(n * n)}.`, `Le nombre de ${s.quoi} s'écrit ${n}².`),
  };
}
function nBlocs() {
  const s = un(BLOCS);
  const n = un([2, 3, 4, 5, 6, 10]);
  return {
    text: `${s.t(String(n))} ${un(QUEST_ECR(s.quoi))}`,
    ...qcm(`${n}³`, [`${n} × 3`, renverse(n, 3), `${n}²`, `${n} + ${n} + ${n}`].map(e)),
    explanation: etapes(`trois fois le même nombre dans un produit : c'est un cube.`, `${produit(n, 3)} = ${n}³ = ${fr(n ** 3)}.`, `Le nombre de ${s.quoi} s'écrit ${n}³.`),
  };
}
function nMesure() {
  const aire = Math.random() < 0.55;
  const s = un(aire ? SURFACES : SOLIDES);
  const n = aire ? entre(3, 12) : un(CUBES);
  const x = aire ? 2 : 3;
  const uu = `${s.u}${aire ? "²" : "³"}`;
  const q = aire ? un(["Quelle écriture donne son aire ?", "Comment écrire son aire avec une puissance ?", "Son aire s'écrit comment ?"]) : un(["Quelle écriture donne son volume ?", "Comment écrire son volume avec une puissance ?", "Son volume s'écrit comment ?"]);
  return {
    text: `${s.s} a ${n} ${s.u} ${aire ? "de côté" : "d'arête"}. ${q}`,
    ...qcm(`${n}${sup(x)} ${uu}`, [`${n}${sup(x === 2 ? 3 : 2)} ${uu}`, e(`${n} × ${x} ${uu}`), e(`${n} + ${x} ${uu}`)]),
    explanation: etapes(aire ? `l'aire d'un carré est côté × côté.` : `le volume d'un cube est arête × arête × arête.`, `${produit(n, x)} = ${n}${sup(x)} = ${fr(n ** x)}.`, `${aire ? "Son aire" : "Son volume"} s'écrit ${n}${sup(x)} ${uu}.`),
  };
}
function tirerCode() {
  for (;;) {
    const s = un(CODES);
    const [x, b] = [un([2, 3]), un(s.b)];
    if (x !== b) return { s, x, b };
  }
}
function nCodes() {
  const { s, x, b } = tirerCode();
  return {
    text: `${s.t(x, b)} ${un(QUEST_ECR(s.quoi))}`,
    ...qcm(`${b}${sup(x)}`, [renverse(b, x), e(`${b} × ${x}`), `${b}${sup(x === 2 ? 3 : 2)}`]),
    explanation: etapes(`à chaque étape, on a ${b} possibilités : on multiplie par ${b} à chaque fois.`, `${produit(b, x)} = ${b}${sup(x)}.`, `Le nombre de ${s.quoi} s'écrit ${b}${sup(x)}.`),
  };
}

/* ═════════ 2. LES VALEURS À CONNAÎTRE ═════════ */
function vCarre() {
  const a = entre(0, 12);
  const m = Math.random() < 0.25;
  const ecr = m ? `${a} au carré` : `${a}²`;
  return {
    text: un(CALCULE(ecr)),
    ...court(a * a),
    explanation: etapes(`le carré d'un nombre, c'est ce nombre multiplié par lui-même.`, `${a}² = ${e(`${a} × ${a}`)} = ${a * a}.`, `${a}² = ${a * a}.`),
  };
}
function vAutomatisme() {
  const [b, x] = un<[number, number]>([[2, 2], [2, 3], [3, 3], [10, 2], [10, 3], [10, 3], [1, 3], [4, 3], [5, 3]]);
  return {
    text: un(CALCULE(Math.random() < 0.2 ? `le ${nomExp(x)} de ${b}` : `${b}${sup(x)}`)),
    ...court(b ** x),
    explanation: etapes(`on écrit le produit, puis on le calcule.`, `${P(b, x)} = ${produit(b, x)} = ${fr(b ** x)}.`, `${P(b, x)} = ${fr(b ** x)}.`),
  };
}
function vQcm() {
  const a = entre(3, 12);
  return {
    text: un([`Que vaut ${a}² ?`, `${a}² est égal à quel nombre ?`, `Quel nombre vaut ${a}² ?`, `Choisis la valeur de ${a}².`, `Quelle est la valeur de ${a}² ?`, `Trouve la valeur de ${a}².`, `${a}² : quel nombre choisir ?`, `Combien vaut ${a} au carré ?`, `${a} au carré donne quel nombre ?`, `Le carré de ${a} vaut combien ?`, `Quel est le carré de ${a} ?`, `Sans calculatrice, que vaut ${a}² ?`]),
    ...qcmN(a * a, [2 * a, a + 2, (a + 1) * (a + 1), a * a + 10]),
    explanation: etapes(`on multiplie le nombre par lui-même.`, `${a}² = ${e(`${a} × ${a}`)} = ${a * a}.`, `${a}² = ${a * a}, et pas ${2 * a} : ce serait ${e(`${a} × 2`)}.`),
  };
}
function vTrou() {
  const a = entre(2, 12);
  const eq = un([`${a} × ${a} = …`, `${a}² = ${a} × ${a} = …`, `… = ${a}²`, `… = ${a} × ${a}`].map(e));
  return {
    text: un([`Complète : ${eq}`, `Complète de tête : ${eq}`, `Remplace les points : ${eq}`, `Quel nombre manque ? ${eq}`, `Trouve le nombre manquant : ${eq}`, `Écris le nombre caché : ${eq}`, `Que mettre à la place des points ? ${eq}`, `Termine l'égalité : ${eq}`]),
    ...court(a * a),
    explanation: etapes(`on connaît les carrés de 0 à 12.`, `${e(`${a} × ${a}`)} = ${a}² = ${a * a}.`, `Le nombre manquant est ${a * a}.`),
  };
}
function vInverse() {
  const a = entre(2, 12);
  const n = a * a;
  return {
    text: un([`Quel nombre positif, au carré, donne ${n} ?`, `Le carré d'un nombre positif vaut ${n}. Quel est ce nombre ?`, `Quel nombre positif multiplié par lui-même donne ${n} ?`, `De quel nombre positif ${n} est-il le carré ?`, `Trouve le nombre positif dont le carré vaut ${n}.`, `Complète avec un nombre positif : …² = ${n}`, `Quel nombre positif a pour carré ${n} ?`, `Un nombre positif au carré fait ${n}. Lequel ?`, `${n} est le carré de quel nombre positif ?`, `… × … = ${n}, avec deux fois le même nombre positif. Lequel ?`, `Retrouve le nombre positif : son carré est ${n}.`, `Cherche le nombre positif tel que …² = ${n}.`]),
    ...court(a),
    explanation: etapes(`on cherche dans les carrés de 0 à 12.`, `${e(`${a} × ${a}`)} = ${n}.`, `${n} = ${a}² : le nombre est ${a}.`),
  };
}
function vComparer() {
  for (;;) {
    const a = entre(2, 12);
    const b = un(CUBES);
    const [v1, v2] = [a * a, b ** 3];
    const r = Math.max(v1, v2) / Math.min(v1, v2);
    if (r > 2.2) continue;
    const [x, y] = melange([`${a}²`, `${b}³`]);
    const juste = v1 === v2 ? "Ils sont égaux" : v1 > v2 ? `${a}²` : `${b}³`;
    return {
      text: un([`Lequel est le plus grand : ${x} ou ${y} ?`, `Compare ${x} et ${y} : lequel est le plus grand ?`, `${x} ou ${y} : lequel vaut le plus ?`, `Qui vaut le plus : ${x} ou ${y} ?`, `Entre ${x} et ${y}, quel est le plus grand ?`, `Quel nombre est le plus grand : ${x} ou ${y} ?`, `Calcule les deux : ${x} ou ${y}, lequel vaut le plus ?`, `${x} et ${y} : qui est au-dessus ?`, `Quel est le plus grand de ${x} et ${y} ?`, `Choisis le plus grand : ${x} ou ${y}.`, `De ${x} et ${y}, lequel dépasse l'autre ?`, `Range ${x} et ${y} : quel est le plus grand ?`]),
      ...qcm(juste, [`${a}²`, `${b}³`, "Ils sont égaux"]),
      explanation: etapes(`on calcule les deux, puis on compare.`, `${a}² = ${v1} et ${b}³ = ${fr(v2)}.`, v1 === v2 ? `Ils sont égaux.` : `Le plus grand est ${juste}.`),
    };
  }
}
function vVraiFaux() {
  const faux = Math.random() < 0.55;
  let eg: string;
  let exp: string;
  if (faux) {
    const a = entre(3, 12);
    const [g, d] = un<[string, number]>([[`${a}²`, 2 * a], [`${a}²`, a + 2], ["2³", 6], ["3³", 9], ["10³", 100], ["10²", 20], ["10³", 30], ["2³", 9], ["3³", 6]]);
    eg = e(`${g} = ${fr(d)}`);
    exp = `${g} ne vaut pas ${fr(d)}.`;
  } else {
    const [b, x] = un<[number, number]>([[2, 3], [3, 3], [10, 2], [10, 3], [entre(2, 12), 2], [entre(2, 12), 2], [entre(2, 12), 2]]);
    eg = e(`${b}${sup(x)} = ${fr(b ** x)}`);
    exp = `${produit(b, x)} = ${fr(b ** x)}.`;
  }
  return {
    text: un(VRAI_FAUX(eg)),
    ...vf(!faux),
    explanation: etapes(`on écrit le produit, puis on le calcule.`, exp, faux ? `C'est faux.` : `C'est vrai.`),
  };
}
function vSuite() {
  const cube = Math.random() < 0.2;
  const k = cube ? entre(1, 2) : entre(1, 8);
  const x = cube ? 3 : 2;
  const t = Array.from({ length: cube ? 3 : 4 }, (_, i) => (k + i) ** x);
  const lu = t.join(", ");
  const suiv = k + t.length;
  const quoi = cube ? "cubes" : "carrés";
  return {
    text: un([`Continue les ${quoi} : ${lu}, …`, `Quel ${cube ? "cube" : "carré"} vient après ? ${lu}, …`, `Suite de ${quoi} : ${lu}, … Quel est le suivant ?`, `Trouve le suivant : ${lu}, …`, `${lu}, … : quel nombre vient ensuite ?`, `Quel nombre suit ${lu} ?`, `Prolonge : ${lu}, …`, `Ces nombres sont des ${quoi} : ${lu}, … Et après ?`, `Écris le nombre suivant : ${lu}, …`, `Complète la suite : ${lu}, …`]),
    ...court(suiv ** x),
    explanation: etapes(`ce sont les ${quoi} de nombres qui se suivent.`, `${t.map((_, i) => `${k + i}${sup(x)}`).join(", ")}, puis ${suiv}${sup(x)} = ${suiv ** x}.`, `Le nombre suivant est ${suiv ** x}.`),
  };
}
function vExtreme() {
  const grand = Math.random() < 0.5;
  for (;;) {
    const pool = melange([...Array.from({ length: 11 }, (_, i) => [i + 2, 2]), [2, 3], [3, 3], [4, 3], [5, 3], [10, 3]] as [number, number][]);
    const t = pool.slice(0, 4);
    const vals = t.map(([b, x]) => b ** x);
    if (new Set(vals).size !== 4) continue;
    const cible = grand ? Math.max(...vals) : Math.min(...vals);
    const juste = t[vals.indexOf(cible)];
    const mot = grand ? "grand" : "petit";
    const ecr = t.map(([b, x]) => `${b}${sup(x)}`);
    return {
      text: un([`Quel est le plus ${mot} ?`, `Quelle puissance est la plus ${grand ? "grande" : "petite"} ?`, `Laquelle vaut le ${grand ? "plus" : "moins"} ?`, `Trouve le plus ${mot} de ces nombres.`, `Calcule de tête : quel est le plus ${mot} ?`, `Choisis le plus ${mot}.`, `Lequel de ces nombres est le plus ${mot} ?`, `Quel nombre est le plus ${mot} ?`, `Compare : lequel est le plus ${mot} ?`, `Repère le plus ${mot} de ces quatre nombres.`, `Parmi ces puissances, quelle est la plus ${grand ? "grande" : "petite"} ?`]),
      ...qcm(`${juste[0]}${sup(juste[1])}`, ecr),
      explanation: etapes(`on calcule chaque puissance.`, t.map(([b, x]) => `${b}${sup(x)} = ${fr(b ** x)}`).join(" ; ") + ".", `Le plus ${mot} est ${juste[0]}${sup(juste[1])}.`),
    };
  }
}
function vRangs() {
  const s = un(RANGS);
  const n = entre(3, 12);
  return {
    text: `${s.t(String(n))} ${un(QUEST_VAL(s.quoi))}`,
    ...court(n * n),
    explanation: etapes(`${n} rangées de ${n} : on calcule ${n}².`, `${n}² = ${e(`${n} × ${n}`)} = ${n * n}.`, `${n * n} ${s.quoi}.`),
  };
}
function vBlocs() {
  const s = un(BLOCS);
  const n = un([2, 3, 4, 5, 10]);
  return {
    text: `${s.t(String(n))} ${un(QUEST_VAL(s.quoi))}`,
    ...court(n ** 3),
    explanation: etapes(`trois fois le même nombre dans un produit : on calcule ${n}³.`, `${n}³ = ${produit(n, 3)} = ${fr(n ** 3)}.`, `${fr(n ** 3)} ${s.quoi}.`),
  };
}
function vCote() {
  const aire = Math.random() < 0.6;
  const s = un(aire ? SURFACES : SOLIDES);
  const a = aire ? entre(3, 12) : un(CUBES);
  const m = aire ? a * a : a ** 3;
  return {
    text: `${s.s} a ${aire ? "une aire" : "un volume"} de ${fr(m)} ${s.u}${aire ? "²" : "³"}. ${aire ? un(["Quelle est la longueur de son côté ?", "Combien mesure son côté ?", "Que mesure un côté ?"]) : un(["Quelle est la longueur de son arête ?", "Combien mesure son arête ?", "Que mesure une arête ?"])}`,
    ...qcmN(a, [aire ? Math.max(2, Math.round(m / 2)) : Math.round(m / 3), a + 1, a + 2, a > 2 ? a - 1 : a + 3], s.u),
    explanation: etapes(aire ? `on cherche le nombre dont le carré vaut ${m}.` : `on cherche le nombre dont le cube vaut ${fr(m)}.`, aire ? `${a}² = ${m}.` : `${a}³ = ${fr(m)}.`, `${aire ? "Le côté" : "L'arête"} mesure ${a} ${s.u}.`),
  };
}
function vCodes() {
  const { s, x, b } = tirerCode();
  return {
    text: `${s.t(x, b)} ${un(QUEST_VAL(s.quoi))}`,
    ...court(b ** x),
    explanation: etapes(`à chaque étape, on a ${b} possibilités : on multiplie.`, `${b}${sup(x)} = ${produit(b, x)} = ${fr(b ** x)}.`, `${fr(b ** x)} ${s.quoi}.`),
  };
}

/* ═════════ 3. ÉCRIRE UN NOMBRE AVEC UNE PUISSANCE ═════════ */
function eCarre() {
  const a = entre(2, 12);
  const n = a * a;
  return {
    text: un([`Écris ${n} sous la forme d'un carré.`, `${n} est le carré de quel nombre ?`, `Quel carré vaut ${n} ?`, `${n} s'écrit comment avec l'exposant 2 ?`, `Écris ${n} avec l'exposant 2.`, `Quelle puissance 2 vaut ${n} ?`, `Trouve le carré égal à ${n}.`, `Choisis le carré égal à ${n}.`, `Comment écrire ${n} comme un carré ?`, `${n} = ? Choisis un carré.`, `Quelle écriture au carré donne ${n} ?`, `Transforme ${n} en carré.`]),
    ...qcm(`${a}²`, [`${n}²`, `${a}³`, `${Math.max(a + 1, Math.round(n / 2))}²`, `${a + 1}²`]),
    explanation: etapes(`on cherche le nombre qui, multiplié par lui-même, donne ${n}.`, `${e(`${a} × ${a}`)} = ${n}.`, `${n} = ${a}².`),
  };
}
function eCube() {
  const b = un(CUBES);
  const n = b ** 3;
  const a = fr(n);
  return {
    text: un([`Écris ${a} sous la forme d'un cube.`, `${a} est le cube de quel nombre ?`, `Quel cube vaut ${a} ?`, `${a} s'écrit comment avec l'exposant 3 ?`, `Écris ${a} avec l'exposant 3.`, `Quelle puissance 3 vaut ${a} ?`, `Trouve le cube égal à ${a}.`, `Choisis le cube égal à ${a}.`, `Comment écrire ${a} comme un cube ?`, `${a} = ? Choisis un cube.`, `Quelle écriture au cube donne ${a} ?`, `Transforme ${a} en cube.`]),
    ...qcm(`${b}³`, [`${fr(n)}³`, `${b}²`, `${b + 1}³`, `${b === 2 ? 3 : b - 1}³`]),
    explanation: etapes(`on cherche le nombre écrit trois fois dans le produit.`, `${produit(b, 3)} = ${a}.`, `${a} = ${b}³.`),
  };
}
function eDix() {
  const x = un([2, 3]);
  const a = fr(10 ** x);
  return {
    text: un([`Écris ${a} avec une puissance de 10.`, `Quelle puissance de 10 vaut ${a} ?`, `${a} s'écrit comment en puissance de 10 ?`, `Trouve la puissance de 10 égale à ${a}.`, `Choisis la puissance de 10 égale à ${a}.`, `Comment écrire ${a} avec 10 et un exposant ?`, `${a} = 10 exposant combien ? Choisis.`, `Transforme ${a} en puissance de 10.`, `Quelle écriture avec 10 donne ${a} ?`, `Quel exposant de 10 donne ${a} ? Choisis.`, `Remplace ${a} par une puissance de 10.`, `${a} : quelle puissance de 10 choisir ?`]),
    ...qcm(`10${sup(x)}`, [`10${sup(x === 2 ? 3 : 2)}`, `${x}¹⁰`, `${a}²`, x === 2 ? "50²" : "100²"]),
    explanation: etapes(`on compte les zéros : autant de zéros, autant de facteurs 10.`, `${produit(10, x)} = ${a}.`, `${a} = 10${sup(x)}.`),
  };
}
function eTrou() {
  const cube = Math.random() < 0.35;
  const a = cube ? un(CUBES) : entre(2, 12);
  const x = cube ? 3 : 2;
  const n = fr(a ** x);
  const eq = e(Math.random() < 0.5 ? `${n} = …${sup(x)}` : `…${sup(x)} = ${n}`);
  return {
    text: un([`Complète : ${eq}`, `Quel nombre manque ? ${eq}`, `Remplace les points : ${eq}`, `Écris le nombre caché : ${eq}`, `Trouve la base : ${eq}`, `Termine l'égalité : ${eq}`, `Que mettre à la place des points ? ${eq}`, `Le nombre manque : ${eq}`, `De tête : ${eq}`, `Cherche le nombre : ${eq}`]),
    ...court(a),
    explanation: etapes(`on cherche le nombre répété dans le produit.`, `${produit(a, x)} = ${n}.`, `${n} = ${a}${sup(x)}.`),
  };
}
function eLequelCarre() {
  const a = entre(3, 11);
  const n = a * a;
  const pieges = melange([n + 1, n - 1, n + 2, n - 2, n + 3, 2 * a, a * (a + 1)]).filter((v) => !Number.isInteger(Math.sqrt(v)) && v > 0);
  return {
    text: un([`Lequel est le carré d'un nombre entier ?`, `Lequel de ces nombres est un carré ?`, `Quel nombre s'écrit avec l'exposant 2 ?`, `Trouve le carré parmi ces nombres.`, `Un seul nombre est un carré. Lequel ?`, `Quel nombre peut s'écrire n × n, avec n entier ?`, `Lequel s'écrit comme un carré ?`, `Choisis le carré d'un nombre entier.`, `Repère le carré parmi ces nombres.`, `Quel nombre est le carré d'un entier ?`, `Parmi ces nombres, quel est le carré ?`, `Quel nombre s'écrit …² avec un entier ?`]),
    ...qcmN(n, pieges.slice(0, 3)),
    explanation: etapes(`on cherche un nombre égal à un entier multiplié par lui-même.`, `${e(`${a} × ${a}`)} = ${n}.`, `${n} = ${a}² : c'est le carré.`),
  };
}
function eLequelCube() {
  const b = un(CUBES);
  const n = b ** 3;
  const ok = (v: number) => v > 1 && !Number.isInteger(Math.round(Math.cbrt(v) * 1e6) / 1e6);
  const pieges = melange([3 * b, b * b, n + 1, n - 1, n + 2, 2 * n]).filter(ok);
  return {
    text: un([`Lequel est le cube d'un nombre entier ?`, `Lequel de ces nombres est un cube ?`, `Quel nombre s'écrit avec l'exposant 3 ?`, `Trouve le cube parmi ces nombres.`, `Un seul nombre est un cube. Lequel ?`, `Quel nombre est le cube d'un entier ?`, `Lequel s'écrit comme un cube ?`, `Choisis le cube d'un nombre entier.`, `Repère le cube parmi ces nombres.`, `Parmi ces nombres, quel est le cube ?`, `Quel nombre s'écrit …³ avec un entier ?`, `Lequel vient d'un produit de trois facteurs égaux ?`]),
    ...qcmN(n, pieges.slice(0, 3)),
    explanation: etapes(`on cherche un nombre égal à un entier écrit trois fois dans un produit.`, `${produit(b, 3)} = ${fr(n)}.`, `${fr(n)} = ${b}³ : c'est le cube.`),
  };
}
function eExposant() {
  const [b, x] = un<[number, number]>([[2, 3], [3, 3], [4, 3], [5, 3], [10, 3], [10, 2], [entre(3, 12), 2], [entre(3, 12), 2], [8, 2], [4, 3]]);
  const n = fr(b ** x);
  const eq = e(`${n} = ${b} exposant …`);
  return {
    text: un([`Complète : ${eq}`, `${n} s'écrit avec ${b}. Quel exposant ?`, `Quel exposant de ${b} donne ${n} ?`, `Avec ${b}, écris ${n}. Quel exposant mets-tu ?`, `Trouve l'exposant : ${eq}`, `${b} à quel exposant donne ${n} ?`, `Quel exposant manque ? ${eq}`, `On veut ${n} avec ${b}. L'exposant vaut combien ?`, `Remplace les points : ${eq}`, `Exposant 2 ou 3 : ${eq}`, `Choisis l'exposant : ${eq}`, `${b} au carré ou au cube pour faire ${n} ? Donne l'exposant.`]),
    ...court(x),
    explanation: etapes(`on essaie le carré, puis le cube.`, `${produit(b, x)} = ${n}.`, `${n} = ${b}${sup(x)} : l'exposant est ${x}.`),
  };
}
function eEncadrer() {
  for (;;) {
    const n = entre(5, 140);
    const a = Math.floor(Math.sqrt(n));
    if (a * a === n || a < 2) continue;
    const juste = `${a}² et ${a + 1}²`;
    return {
      text: un([`Entre quels carrés voisins se place ${n} ?`, `${n} est entre quels carrés ?`, `Encadre ${n} par deux carrés qui se suivent.`, `Quels carrés qui se suivent entourent ${n} ?`, `Dans quel intervalle de carrés se trouve ${n} ?`, `Trouve les deux carrés voisins autour de ${n}.`, `${n} se trouve entre quels carrés voisins ?`, `Quels sont les carrés voisins de ${n} ?`, `Place ${n} entre deux carrés qui se suivent.`, `Choisis les carrés voisins qui encadrent ${n}.`, `${n} n'est pas un carré. Entre lesquels se place-t-il ?`, `Autour de ${n}, quels carrés voisins trouves-tu ?`]),
      ...qcm(juste, [`${a - 1}² et ${a}²`, `${a + 1}² et ${a + 2}²`, `${a + 2}² et ${a + 3}²`]),
      explanation: etapes(`on cherche les carrés juste en dessous et juste au-dessus.`, `${a}² = ${a * a} et ${a + 1}² = ${(a + 1) * (a + 1)}.`, `${a * a} < ${n} < ${(a + 1) * (a + 1)}.`),
    };
  }
}
function eVraiFaux() {
  const vrai = Math.random() < 0.5;
  if (vrai) {
    const [b, x] = Math.random() < 0.65 ? [entre(2, 12), 2] : [un(CUBES), 3];
    return {
      text: un(VRAI_FAUX(e(`${fr(b ** x)} = ${b}${sup(x)}`))),
      ...vf(true),
      explanation: etapes(`on écrit le produit.`, `${produit(b, x)} = ${fr(b ** x)}.`, `C'est vrai.`),
    };
  }
  const a = entre(3, 12);
  const [n, g] = un<[number, string]>([[2 * a, `${a}²`], [a + 2, `${a}²`], [9, "3³"], [6, "2³"], [100, "10³"], [1000, "10²"], [3 * a, `${a}³`], [4, "2³"]]);
  return {
    text: un(VRAI_FAUX(e(`${fr(n)} = ${g}`))),
    ...vf(false),
    explanation: etapes(`on calcule la puissance.`, `${g} ne vaut pas ${fr(n)}.`, `C'est faux.`),
  };
}
function eAire() {
  const aire = Math.random() < 0.55;
  const s = un(aire ? SURFACES : SOLIDES);
  const a = aire ? entre(3, 12) : un(CUBES);
  const x = aire ? 2 : 3;
  const uu = `${s.u}${aire ? "²" : "³"}`;
  return {
    text: `${s.s} a ${aire ? "une aire" : "un volume"} de ${fr(a ** x)} ${uu}. ${un([`Écris ce nombre sous forme de ${nomExp(x)}.`, `Comment écrire ce nombre avec l'exposant ${x} ?`, `Quelle puissance ${x} donne ce nombre ?`, `Quelle écriture avec l'exposant ${x} convient ?`])}`,
    ...qcm(`${a}${sup(x)}`, [`${a + 1}${sup(x)}`, `${fr(a ** x)}${sup(x)}`, `${a}${sup(x === 2 ? 3 : 2)}`, `${a > 2 ? a - 1 : a + 2}${sup(x)}`]),
    explanation: etapes(`on cherche le nombre répété dans le produit.`, `${produit(a, x)} = ${fr(a ** x)}.`, `${fr(a ** x)} = ${a}${sup(x)}.`),
  };
}
const CARRES_VIVANTS: ((n: number) => string)[] = [
  (n) => `${n} musiciens défilent en carré, autant de lignes que de colonnes.`,
  (n) => `${n} ruches forment un carré parfait, avec autant de lignes que de colonnes.`,
  (n) => `${n} panneaux solaires couvrent un toit en carré : autant de lignes que de colonnes.`,
  (n) => `Une carreleuse pose ${n} carreaux en carré, autant de lignes que de colonnes.`,
  (n) => `Une image carrée compte ${n} pixels, autant sur chaque ligne que sur chaque colonne.`,
  (n) => `Une maraîchère plante ${n} salades en carré, autant de lignes que de colonnes.`,
  (n) => `${n} danseurs forment un carré, avec autant de lignes que de colonnes.`,
  (n) => `Une pâtissière range ${n} macarons en carré, autant de lignes que de colonnes.`,
  (n) => `Une grille carrée compte ${n} cases, autant sur chaque ligne que sur chaque colonne.`,
  (n) => `Un verger compte ${n} arbres plantés en carré, autant de lignes que de colonnes.`,
  (n) => `Une fresque est faite de ${n} tuiles en carré, autant de lignes que de colonnes.`,
  (n) => `Un mur d'écrans en compte ${n}, disposés en carré : autant de lignes que de colonnes.`,
];
function eVivant() {
  const a = entre(3, 12);
  return {
    text: `${un(CARRES_VIVANTS)(a * a)} ${un(["Combien par ligne ?", "Combien sur une ligne ?", "Combien y en a-t-il par ligne ?", "Quel nombre mis au carré donne ce total ?"])}`,
    ...court(a),
    explanation: etapes(`un carré a autant de lignes que de colonnes : on cherche le nombre dont le carré vaut ${a * a}.`, `${a}² = ${e(`${a} × ${a}`)} = ${a * a}.`, `${a} par ligne.`),
  };
}
const DIX: { t: string; x: number }[] = [
  { t: "Il y a 1 000 g dans un kilo.", x: 3 }, { t: "Il y a 1 000 m dans un kilomètre.", x: 3 }, { t: "Il y a 100 cm dans un mètre.", x: 2 }, { t: "Il y a 100 centimes dans un euro.", x: 2 }, { t: "Il y a 1 000 mL dans un litre.", x: 3 }, { t: "Il y a 1 000 mm dans un mètre.", x: 3 }, { t: "Il y a 100 ans dans un siècle.", x: 2 }, { t: "Il y a 1 000 ans dans un millénaire.", x: 3 }, { t: "Un cadenas à 3 molettes propose 1 000 codes.", x: 3 }, { t: "Un stade accueille 1 000 supporters.", x: 3 }, { t: "Il y a 100 hectares dans un km².", x: 2 }, { t: "Une chorale de 100 voix chante ce soir.", x: 2 },
];
function eDixVivant() {
  const s = un(DIX);
  const n = fr(10 ** s.x);
  return {
    text: `${s.t} ${un([`Écris ${n} avec une puissance de 10.`, `Quelle puissance de 10 vaut ${n} ?`, `Comment écrire ${n} avec 10 et un exposant ?`, `Remplace ${n} par une puissance de 10.`])}`,
    ...qcm(`10${sup(s.x)}`, [`10${sup(s.x === 2 ? 3 : 2)}`, `${s.x}¹⁰`, `${n}²`, s.x === 2 ? "50²" : "100²"]),
    explanation: etapes(`on compte les zéros de ${n}.`, `${produit(10, s.x)} = ${n}.`, `${n} = 10${sup(s.x)}.`),
  };
}

/* ═════════ 4. CALCULER UNE EXPRESSION ═════════ */
type Forme = { e: string; m: string; v: number };
const f = (expr: string, m: string, v: number): Forme => ({ e: e(expr), m: e(m), v });
const AIDE_CALC = "D'abord les puissances, puis les produits, puis les additions et soustractions.";
const EXPL = (x: Forme) =>
  etapes(`on calcule d'abord les puissances, puis les produits, puis les additions et soustractions.`, `${x.e} = ${x.m} = ${fr(x.v)}.`, `${x.e} = ${fr(x.v)}.`);

function formeSomme(): Forme {
  const a = entre(2, 12);
  const a2 = a * a;
  const k = entre(2, 30);
  const b = entre(2, 9);
  return un([
    f(`${a}² + ${k}`, `${a2} + ${k}`, a2 + k),
    f(`${k} + ${a}²`, `${k} + ${a2}`, a2 + k),
    f(`${a}² − ${Math.min(k, a2)}`, `${a2} − ${Math.min(k, a2)}`, a2 - Math.min(k, a2)),
    f(`${a2 + k} − ${a}²`, `${a2 + k} − ${a2}`, k),
    f(`${a}² + ${b}²`, `${a2} + ${b * b}`, a2 + b * b),
  ]);
}
function formeProduit(): Forme {
  const a = entre(2, 10);
  const k = entre(2, 5);
  const b = un([2, 3, 10]);
  return un([
    f(`${k} × ${a}²`, `${k} × ${a * a}`, k * a * a),
    f(`${a}² × ${k}`, `${a * a} × ${k}`, k * a * a),
    f(`${k} × ${b}³`, `${k} × ${fr(b ** 3)}`, k * b ** 3),
    f(`${b}³ × ${k}`, `${fr(b ** 3)} × ${k}`, k * b ** 3),
  ]);
}
function formeCube(): Forme {
  const [b, c] = un<[number, number]>([[2, 3], [3, 2], [10, 2], [10, 3], [3, 10], [2, 10]]);
  const k = entre(2, 40);
  return un([
    f(`${b}³ + ${k}`, `${fr(b ** 3)} + ${k}`, b ** 3 + k),
    f(`${k} + ${b}³`, `${k} + ${fr(b ** 3)}`, b ** 3 + k),
    f(`${b}³ + ${c}²`, `${fr(b ** 3)} + ${c * c}`, b ** 3 + c * c),
    f(`${c}² + ${b}³`, `${c * c} + ${fr(b ** 3)}`, b ** 3 + c * c),
    f(`${10}³ − ${c}²`, `1 000 − ${c * c}`, 1000 - c * c),
    f(`${b}³ − ${Math.min(k, 8)}`, `${fr(b ** 3)} − ${Math.min(k, 8)}`, b ** 3 - Math.min(k, 8)),
  ]);
}
function cSomme() { const x = formeSomme(); return { text: un(CALCULE(x.e)), ...court(x.v), explanation: EXPL(x) }; }
function cProduit() { const x = formeProduit(); return { text: un(CALCULE(x.e)), ...court(x.v), explanation: EXPL(x) }; }
function cCube() { const x = formeCube(); return { text: un(CALCULE(x.e)), ...court(x.v), explanation: EXPL(x) }; }
function cPriorite() {
  const a = entre(2, 9);
  const k = entre(2, 9);
  const [expr, juste, faux] = un<[string, string, string]>([[`${k} + ${a}²`, `${a}²`, `${k} + ${a}`], [`${a}² + ${k}`, `${a}²`, `${a} + ${k}`], [`${k} × ${a}²`, `${a}²`, `${k} × ${a}`], [`${a}² − ${k}`, `${a}²`, `${a} − ${k}`]]);
  return {
    text: un([`Dans ${e(expr)}, que calcule-t-on d'abord ?`, `${e(expr)} : quel calcul faire en premier ?`, `Par quoi commencer dans ${e(expr)} ?`, `Quel est le premier calcul de ${e(expr)} ?`, `Pour calculer ${e(expr)}, que fais-tu d'abord ?`, `Quelle opération est prioritaire dans ${e(expr)} ?`, `Que faut-il calculer d'abord dans ${e(expr)} ?`, `${e(expr)} : par quoi commences-tu ?`, `Quelle priorité dans ${e(expr)} ?`, `Premier calcul de ${e(expr)} : lequel ?`]),
    ...qcm(e(juste), [e(faux), e(`${k} + ${a}`), e(`${k} × ${a}`), e(`${a} × 2`)]),
    explanation: etapes(`la puissance passe avant les autres opérations.`, `On calcule d'abord ${e(juste)} = ${a * a}.`, `Le premier calcul est ${e(juste)}.`),
  };
}
function formeTrois(): Forme {
  const a = entre(2, 10);
  const b = entre(2, 9);
  const c = entre(2, 9);
  const k = entre(2, 12);
  const a2 = a * a;
  const options = [
    f(`${a}² + ${b} × ${c}`, `${a2} + ${b * c}`, a2 + b * c),
    f(`${b} × ${c} + ${a}²`, `${b * c} + ${a2}`, a2 + b * c),
    f(`${b} × ${a}² + ${k}`, `${b * a2} + ${k}`, b * a2 + k),
    f(`${k} + ${b} × ${a}²`, `${k} + ${b * a2}`, b * a2 + k),
    f(`${a}² + ${b}² − ${Math.min(k, a2)}`, `${a2} + ${b * b} − ${Math.min(k, a2)}`, a2 + b * b - Math.min(k, a2)),
    f(`2³ + ${a}² − ${Math.min(k, 8)}`, `8 + ${a2} − ${Math.min(k, 8)}`, 8 + a2 - Math.min(k, 8)),
    f(`${b} × 3³ + ${k}`, `${b * 27} + ${k}`, b * 27 + k),
  ];
  if (a2 >= b * c) options.push(f(`${a}² − ${b} × ${c}`, `${a2} − ${b * c}`, a2 - b * c));
  if (b * a2 >= k) options.push(f(`${b} × ${a}² − ${k}`, `${b * a2} − ${k}`, b * a2 - k));
  return un(options);
}
function cTrois() { const x = formeTrois(); return { text: un(CALCULE(x.e)), ...court(x.v), explanation: EXPL(x) }; }
function cPiege() {
  const a = entre(2, 9);
  const k = entre(2, 7);
  const m = un(["fois", "plus", "moins"]);
  if (m === "fois") {
    const x = f(`${k} × ${a}²`, `${k} × ${a * a}`, k * a * a);
    return {
      text: un([`Que vaut ${x.e} ?`, `${x.e} est égal à quel nombre ?`, `Choisis la valeur de ${x.e}.`, `Quel résultat pour ${x.e} ?`, `Quelle est la valeur de ${x.e} ?`, `${x.e} : quel résultat choisir ?`, `Attention au piège : que vaut ${x.e} ?`, `Trouve la valeur juste de ${x.e}.`, `Quel nombre vaut ${x.e} ?`, `Sans te tromper : que vaut ${x.e} ?`, `Le bon résultat de ${x.e} ?`]),
      ...qcmN(x.v, [(k * a) ** 2, k * 2 * a, k + a * a]),
      explanation: etapes(`la puissance d'abord, le produit ensuite.`, `${x.e} = ${x.m} = ${fr(x.v)}.`, `Le résultat est ${fr(x.v)}, et non ${fr((k * a) ** 2)} : le carré ne porte que sur ${a}.`),
    };
  }
  const x = m === "plus" ? f(`${k} + ${a}²`, `${k} + ${a * a}`, k + a * a) : f(`${a * a + k} − ${a}²`, `${a * a + k} − ${a * a}`, k);
  const pieges = m === "plus" ? [(k + a) ** 2, k + 2 * a, k * a * a] : [a * a + k - 2 * a, (a * a + k - a) ** 2, a * a + k];
  return {
    text: un([`Que vaut ${x.e} ?`, `${x.e} est égal à quel nombre ?`, `Choisis la valeur de ${x.e}.`, `Quel résultat pour ${x.e} ?`, `Quelle est la valeur de ${x.e} ?`, `${x.e} : quel résultat choisir ?`, `Attention au piège : que vaut ${x.e} ?`, `Trouve la valeur juste de ${x.e}.`, `Quel nombre vaut ${x.e} ?`, `Sans te tromper : que vaut ${x.e} ?`, `Le bon résultat de ${x.e} ?`]),
    ...qcmN(x.v, pieges),
    explanation: EXPL(x),
  };
}
function cTrou() {
  const a = entre(2, 10);
  const k = entre(2, 20);
  const a2 = a * a;
  const sens = un(["plus", "avant", "moins"]);
  const eq = e(sens === "plus" ? `${a}² + … = ${a2 + k}` : sens === "avant" ? `… + ${a}² = ${a2 + k}` : `${a}² − … = ${Math.max(a2 - k, 0)}`);
  const juste = sens === "moins" ? a2 - Math.max(a2 - k, 0) : k;
  return {
    text: un([`Complète : ${eq}`, `Quel nombre manque ? ${eq}`, `Remplace les points : ${eq}`, `Écris le nombre caché : ${eq}`, `Trouve le nombre manquant : ${eq}`, `Termine l'égalité : ${eq}`, `Que mettre à la place des points ? ${eq}`, `Cherche le nombre : ${eq}`, `${eq}. Quel nombre manque ?`, `De tête : ${eq}`, `Trouve le nombre : ${eq}`]),
    ...court(juste),
    explanation: etapes(`on calcule d'abord la puissance : ${a}² = ${a2}.`, `On obtient : ${eq.replace(`${a}²`, String(a2))}.`, `Le nombre manquant est ${juste}.`),
  };
}
function cVraiFaux() {
  const a = entre(2, 9);
  const b = entre(2, 9);
  const k = entre(2, 5);
  const cas = un<[string, number, number]>([
    [`${k} × ${a}²`, k * a * a, (k * a) ** 2],
    [`${a}² + ${b}²`, a * a + b * b, (a + b) ** 2],
    [`${a}² + ${k}`, a * a + k, (a + k) ** 2],
    [`2³ + ${a}²`, 8 + a * a, 6 + 2 * a],
    [`10² − ${a}²`, 100 - a * a, (10 - a) ** 2],
    [`${k} × 2³`, k * 8, k * 6],
    [`${k} × 10²`, k * 100, k * 20],
    [`3³ − ${a}`, 27 - a, 9 - a < 0 ? 18 + a : 9 - a],
  ]);
  const vrai = Math.random() < 0.5;
  const eg = e(`${cas[0]} = ${fr(vrai ? cas[1] : cas[2])}`);
  if (!vrai && cas[1] === cas[2]) return cVraiFaux();
  return {
    text: un(VRAI_FAUX(eg)),
    ...vf(vrai),
    explanation: etapes(`la puissance d'abord, ensuite le reste.`, `${e(cas[0])} = ${fr(cas[1])}.`, vrai ? `C'est vrai.` : `C'est faux : le résultat est ${fr(cas[1])}.`),
  };
}
function cQuelleExpr() {
  const a = entre(2, 9);
  const b = entre(2, 9);
  const k = entre(2, 9);
  const formes = melange([
    f(`${a}² + ${k}`, `${a * a} + ${k}`, a * a + k),
    f(`${k} × ${a}²`, `${k} × ${a * a}`, k * a * a),
    f(`${a}² + ${b}²`, `${a * a} + ${b * b}`, a * a + b * b),
    f(`${k}² + ${b}`, `${k * k} + ${b}`, k * k + b),
    f(`${a} × ${k}`, `${a} × ${k}`, a * k),
    f(`2³ + ${a}`, `8 + ${a}`, 8 + a),
    b * b >= a ? f(`${b}² − ${a}`, `${b * b} − ${a}`, b * b - a) : f(`${b}² + ${a}`, `${b * b} + ${a}`, b * b + a),
    f(`${b}² + ${a} × ${k}`, `${b * b} + ${a * k}`, b * b + a * k),
  ]);
  const juste = formes.find((x) => /[²³]/.test(x.e))!;
  const pieges = formes.filter((x) => x !== juste).filter((x, i, l) => x.v !== juste.v && l.findIndex((y) => y.v === x.v) === i);
  if (pieges.length < 2) return cQuelleExpr();
  return {
    text: un([`Quelle expression vaut ${fr(juste.v)} ?`, `Laquelle est égale à ${fr(juste.v)} ?`, `Quel calcul donne ${fr(juste.v)} ?`, `Trouve le calcul égal à ${fr(juste.v)}.`, `Quelle expression donne ${fr(juste.v)} ?`, `Choisis le calcul qui fait ${fr(juste.v)}.`, `Qui vaut ${fr(juste.v)} ?`, `Le résultat est ${fr(juste.v)}. Quel était le calcul ?`, `Quel calcul correspond au résultat ${fr(juste.v)} ?`, `Repère l'expression égale à ${fr(juste.v)}.`, `Avec quelle expression obtient-on ${fr(juste.v)} ?`]),
    ...qcm(juste.e, pieges.slice(0, 3).map((x) => x.e)),
    explanation: EXPL(juste),
  };
}
/* Une rangée carrée (ou un bloc), puis un ajout ou un retrait. */
type Total = { t: (n: number, k: number) => string; q: string; moins?: boolean; bloc?: boolean };
const TOTAUX: Total[] = [
  { t: (n, k) => `Une fanfare défile en ${n} rangs de ${n} musiciens, et ${k} autres la suivent.`, q: "Combien de musiciens en tout ?" },
  { t: (n, k) => `Une maraîchère a ${n} rangs de ${n} salades, plus ${k} salades en pots.`, q: "Combien de salades en tout ?" },
  { t: (n, k) => `Un écran montre ${n} lignes de ${n} pixels, et ${k} pixels de plus dans une barre.`, q: "Combien de pixels en tout ?" },
  { t: (n, k) => `Une bibliothèque a ${n} étagères de ${n} livres, et ${k} livres sur un chariot.`, q: "Combien de livres en tout ?" },
  { t: (n, k) => `Une carreleuse pose ${n} rangées de ${n} carreaux, puis ${k} autres carreaux.`, q: "Combien de carreaux en tout ?" },
  { t: (n, k) => `Une pâtissière a ${n} rangs de ${n} macarons. Elle en vend ${k}.`, q: "Combien en reste-t-il ?", moins: true },
  { t: (n, k) => `Une apicultrice a ${n} rangées de ${n} ruches. Elle en déplace ${k}.`, q: "Combien en reste-t-il ?", moins: true },
  { t: (n, k) => `Une pharmacienne a ${n} rangées de ${n} boîtes. Elle en donne ${k}.`, q: "Combien en reste-t-il ?", moins: true },
  { t: (n, k) => `Un stade a ${n} rangées de ${n} projecteurs. On en éteint ${k}.`, q: "Combien en reste-t-il d'allumés ?", moins: true },
  { t: (n, k) => `Une biologiste sème ${n} rangs de ${n} graines. ${k} ne germent pas.`, q: "Combien en reste-t-il ?", moins: true },
  { t: (n, k) => `Une caisse a ${n} couches de ${n} rangées de ${n} boîtes. On en retire ${k}.`, q: "Combien en reste-t-il ?", moins: true, bloc: true },
  { t: (n, k) => `Un port empile ${n} niveaux de ${n} rangées de ${n} conteneurs, et ${k} autres attendent.`, q: "Combien de conteneurs en tout ?", bloc: true },
  { t: (n, k) => `Un jeu vidéo pose ${n} couches de ${n} lignes de ${n} briques, puis ${k} briques de plus.`, q: "Combien de briques en tout ?", bloc: true },
];
function tirerTotal() {
  const s = un(TOTAUX);
  const n = s.bloc ? un([2, 3, 4, 5]) : entre(4, 12);
  const k = entre(3, s.bloc ? 7 : 15);
  const x = s.bloc ? 3 : 2;
  const v = s.moins ? n ** x - k : n ** x + k;
  return { s, n, k, x, v, expr: e(`${n}${sup(x)} ${s.moins ? "−" : "+"} ${k}`) };
}
function cTotal() {
  const { s, n, k, x, v, expr } = tirerTotal();
  return {
    text: `${s.t(n, k)} ${s.q}`,
    ...court(v),
    explanation: etapes(`on écrit le calcul, puis la puissance d'abord.`, `${expr} = ${e(`${fr(n ** x)} ${s.moins ? "−" : "+"} ${k}`)} = ${fr(v)}.`, `Le résultat est ${fr(v)}.`),
  };
}
function cTotalExpr() {
  const { s, n, k, x, v, expr } = tirerTotal();
  const op = s.moins ? "−" : "+";
  return {
    text: `${s.t(n, k)} ${un(["Quel calcul donne la réponse ?", "Quel calcul faut-il faire ?", "Quelle expression convient ?", "Quelle expression donne le résultat ?"])}`,
    /* Le piège des parenthèses, seulement s'il donne un autre résultat et sans base négative : (5 − 9)² = 5² − 9. */
    ...qcm(expr, [`${n} × ${x} ${op} ${k}`, `${n} ${op} ${k}`, `${n}${sup(x === 2 ? 3 : 2)} ${op} ${k}`, ...(k < n || !s.moins ? [`(${n} ${op} ${k})${sup(x)}`] : [])].map(e)),
    explanation: etapes(`on compte d'abord le carré ou le bloc, puis on ${s.moins ? "enlève" : "ajoute"} le reste.`, `${expr} = ${fr(v)}.`, `Le calcul est ${expr}.`),
  };
}
const LOTS: { t: (k: number, n: number) => string; quoi: string }[] = [
  { t: (k, n) => `${k} plateaux portent chacun ${n} rangs de ${n} cookies.`, quoi: "cookies" },
  { t: (k, n) => `${k} murs ont chacun ${n} rangées de ${n} carreaux.`, quoi: "carreaux" },
  { t: (k, n) => `${k} cartons contiennent chacun ${n} rangées de ${n} bouteilles.`, quoi: "bouteilles" },
  { t: (k, n) => `${k} pages d'album ont chacune ${n} lignes de ${n} photos.`, quoi: "photos" },
  { t: (k, n) => `${k} immeubles ont chacun ${n} rangées de ${n} fenêtres.`, quoi: "fenêtres" },
  { t: (k, n) => `${k} serres ont chacune ${n} rangs de ${n} plants.`, quoi: "plants" },
  { t: (k, n) => `${k} tablettes font chacune ${n} rangs de ${n} carrés de chocolat.`, quoi: "carrés" },
  { t: (k, n) => `${k} toits portent chacun ${n} rangées de ${n} panneaux.`, quoi: "panneaux" },
  { t: (k, n) => `${k} gradins ont chacun ${n} rangs de ${n} sièges.`, quoi: "sièges" },
  { t: (k, n) => `${k} plaques de culture ont chacune ${n} lignes de ${n} puits.`, quoi: "puits" },
  { t: (k, n) => `${k} ruchers comptent chacun ${n} rangées de ${n} ruches.`, quoi: "ruches" },
  { t: (k, n) => `${k} tiroirs rangent chacun ${n} rangées de ${n} piles.`, quoi: "piles" },
];
function cLots() {
  const s = un(LOTS);
  const k = entre(2, 8);
  const n = entre(3, 10);
  return {
    text: `${s.t(k, n)} ${un([`Combien de ${s.quoi} en tout ?`, `Quel est le nombre total de ${s.quoi} ?`, `Calcule le nombre total de ${s.quoi}.`, `Combien y a-t-il de ${s.quoi} au total ?`])}`,
    ...court(k * n * n),
    explanation: etapes(`un lot compte ${n}² ${s.quoi}. Puis on multiplie par ${k}.`, `${e(`${k} × ${n}²`)} = ${e(`${k} × ${n * n}`)} = ${k * n * n}.`, `${k * n * n} ${s.quoi}.`),
  };
}
function cDeuxCarres() {
  const a = entre(2, 9);
  const b = entre(a + 1, 12);
  const aire = Math.random() < 0.65;
  const pl = aire
    ? un([{ s: "Deux dalles carrées", u: "m" }, { s: "Deux tapis carrés", u: "m" }, { s: "Deux jardins carrés", u: "m" }, { s: "Deux toiles carrées", u: "dm" }, { s: "Deux vitres carrées", u: "dm" }, { s: "Deux terrasses carrées", u: "m" }])
    : un([{ s: "Deux caisses cubiques", u: "dm" }, { s: "Deux blocs cubiques", u: "m" }, { s: "Deux aquariums cubiques", u: "dm" }, { s: "Deux boîtes cubiques", u: "cm" }]);
  const [p, q] = aire ? [a, b] : [un([2, 3]), un([4, 5])];
  const x = aire ? 2 : 3;
  const uu = `${pl.u}${aire ? "²" : "³"}`;
  const v = p ** x + q ** x;
  return {
    text: `${pl.s} ont ${aire ? "pour côtés" : "pour arêtes"} ${p} ${pl.u} et ${q} ${pl.u}. ${aire ? un(["Quelle est leur aire totale ?", "Quelle aire totale forment ces deux carrés ?"]) : un(["Quel est leur volume total ?", "Quel volume total font ces deux cubes ?"])}`,
    ...qcmN(v, [(p + q) ** x, x * (p + q), p ** x + q], uu),
    explanation: etapes(aire ? `on additionne les aires des deux carrés.` : `on additionne les volumes des deux cubes.`, `${e(`${p}${sup(x)} + ${q}${sup(x)}`)} = ${e(`${p ** x} + ${q ** x}`)} = ${v}.`, `${fr(v)} ${uu}.`),
  };
}
function formeParenthese(): Forme {
  const a = entre(1, 6);
  const b = entre(2, 6);
  const k = entre(2, 5);
  const c = entre(2, 9);
  const d = Math.min(b, 5);
  return un([
    f(`(${a} + ${b})²`, `${a + b}²`, (a + b) ** 2),
    f(`(${a + b + 2} − ${b})²`, `${a + 2}²`, (a + 2) ** 2),
    f(`${k} × (${b}² + ${a})`, `${k} × ${b * b + a}`, k * (b * b + a)),
    f(`(${b}² + ${a}) × ${k}`, `${b * b + a} × ${k}`, k * (b * b + a)),
    f(`(${a} + ${b})² − ${c}`, `${(a + b) ** 2} − ${c}`, (a + b) ** 2 - c),
    f(`${c} + (${a} + ${b})²`, `${c} + ${(a + b) ** 2}`, (a + b) ** 2 + c),
    f(`2 × ${b}² + ${k} × ${c}`, `${2 * b * b} + ${k * c}`, 2 * b * b + k * c),
    f(`${d}³ + ${c}²`, `${d ** 3} + ${c * c}`, d ** 3 + c * c),
  ]);
}
const TOURNE_DEFI = (x: string) => [...CALCULE(x), `Attention aux priorités : calcule ${x}.`, `Dans le bon ordre, calcule ${x}.`];
function cParenthese() { const x = formeParenthese(); return { text: un(TOURNE_DEFI(x.e)), ...court(x.v), explanation: EXPL(x) }; }
function cComparer() {
  let [x1, x2, m1, m2, v1, v2] = ["", "", "", "", 0, 0];
  if (Math.random() < 0.5) {
    const a = entre(1, 6);
    const b = entre(2, 6);
    [x1, x2, m1, m2, v1, v2] = [e(`(${a} + ${b})²`), e(`${a}² + ${b}²`), e(`${a + b}²`), e(`${a * a} + ${b * b}`), (a + b) ** 2, a * a + b * b];
  } else {
    for (;;) {
      const [p, r] = [formeTrois(), formeTrois()];
      if (p.e === r.e || Math.max(p.v, r.v) > 1.6 * Math.min(p.v, r.v)) continue;
      [x1, x2, m1, m2, v1, v2] = [p.e, r.e, p.m, r.m, p.v, r.v];
      break;
    }
  }
  const [u, w] = melange([x1, x2]);
  const juste = v1 === v2 ? "Ils sont égaux" : v1 > v2 ? x1 : x2;
  return {
    text: un([`Compare ${u} et ${w} : lequel est le plus grand ?`, `Lequel est le plus grand : ${u} ou ${w} ?`, `Quel est le plus grand de ${u} et ${w} ?`, `${u} ou ${w} : lequel vaut le plus ?`, `Entre ${u} et ${w}, quel est le plus grand ?`, `Calcule ${u} et ${w}. Lequel dépasse l'autre ?`, `Qui vaut le plus : ${u} ou ${w} ?`, `Calcule les deux : ${u} ou ${w}, lequel vaut le plus ?`, `Choisis le plus grand : ${u} ou ${w}.`, `Attention aux priorités. Le plus grand : ${u} ou ${w} ?`, `De ${u} et ${w}, lequel vaut le plus ?`, `Duel de calculs : ${u} contre ${w}. Qui vaut le plus ?`]),
    ...qcm(juste, [x1, x2, "Ils sont égaux"]),
    explanation: etapes(`on calcule chacun, en respectant les priorités.`, `${x1} = ${m1} = ${fr(v1)} et ${x2} = ${m2} = ${fr(v2)}.`, v1 === v2 ? `Ils sont égaux.` : `Le plus grand est ${juste}.`),
  };
}
const TRIPLETS: [number, number, number][] = [[3, 4, 5], [6, 8, 10], [5, 12, 13]];
function cTriplet() {
  const vrai = Math.random() < 0.5;
  const [a, b, c] = vrai ? un(TRIPLETS) : un<[number, number, number]>([[2, 3, 5], [4, 5, 6], [3, 5, 6], [5, 6, 8], [2, 4, 5], [6, 7, 9], [7, 8, 10], [3, 6, 7], [8, 9, 12]]);
  const eq = e(`${a}² + ${b}² = ${c}²`);
  return {
    text: un([...VRAI_FAUX(eq), `Calcule les deux côtés : ${eq}. Vrai ou faux ?`, `Vérifie par le calcul : ${eq}. Vrai ou faux ?`]),
    ...vf(vrai),
    explanation: etapes(`on calcule chaque côté de l'égalité.`, `${e(`${a}² + ${b}²`)} = ${e(`${a * a} + ${b * b}`)} = ${a * a + b * b} et ${c}² = ${c * c}.`, vrai ? `Les deux côtés valent ${c * c} : c'est vrai.` : `${a * a + b * b} n'est pas ${c * c} : c'est faux.`),
  };
}
const COURS: { t: (g: number, p: number, u: string) => string; u: string }[] = [
  { t: (g, p, u) => `Une cour carrée de ${g} ${u} de côté contient un bassin carré de ${p} ${u} de côté.`, u: "m" },
  { t: (g, p, u) => `Une nappe carrée de ${g} ${u} de côté a un trou carré de ${p} ${u} de côté.`, u: "dm" },
  { t: (g, p, u) => `Un jardin carré de ${g} ${u} de côté contient une serre carrée de ${p} ${u} de côté.`, u: "m" },
  { t: (g, p, u) => `Une plaque carrée de ${g} ${u} de côté est percée d'un carré de ${p} ${u} de côté.`, u: "cm" },
  { t: (g, p, u) => `Une place carrée de ${g} ${u} de côté a une fontaine carrée de ${p} ${u} de côté.`, u: "m" },
  { t: (g, p, u) => `Une salle carrée de ${g} ${u} de côté a une scène carrée de ${p} ${u} de côté.`, u: "m" },
  { t: (g, p, u) => `Un drapeau carré de ${g} ${u} de côté porte un motif carré de ${p} ${u} de côté.`, u: "dm" },
  { t: (g, p, u) => `Un terrain carré de ${g} ${u} de côté contient un abri carré de ${p} ${u} de côté.`, u: "m" },
];
function cCour() {
  const s = un(COURS);
  const g = entre(6, 12);
  const p = entre(2, g - 2);
  const v = g * g - p * p;
  const q = un(["Quelle aire reste-t-il autour ?", "Quelle est l'aire restante ?", "Quelle aire reste libre ?"]);
  return {
    text: `${s.t(g, p, s.u)} ${q}`,
    ...qcmN(v, [(g - p) ** 2, 4 * (g - p), g * g - p], `${s.u}²`),
    explanation: etapes(`on enlève l'aire du petit carré à celle du grand.`, `${e(`${g}² − ${p}²`)} = ${e(`${g * g} − ${p * p}`)} = ${v}.`, `Il reste ${v} ${s.u}².`),
  };
}

/* ═════════ 5. EXPRESSION LITTÉRALE ═════════ */
type FormeL = { l: string; val: number; e: string; v: number; m: string };
const SI = (l: string, val: number) => un([`Si ${e(`${l} = ${val}`)},`, `Pour ${e(`${l} = ${val}`)},`, `Avec ${e(`${l} = ${val}`)},`]);
const DEMANDE_L = (x: FormeL) => {
  const s = SI(x.l, x.val);
  return un([`${s} que vaut ${x.e} ?`, `${s} calcule ${x.e}.`, `${s} combien fait ${x.e} ?`, `${s} donne la valeur de ${x.e}.`, `Calcule ${x.e} ${s.replace(",", ".").replace(/^./, (c) => c.toLowerCase())}`, `Remplace ${x.l} par ${x.val} dans ${x.e}. Calcule.`, `Que vaut ${x.e} ${s.replace(",", " ?").replace(/^./, (c) => c.toLowerCase())}`, `${x.e} : combien pour ${e(`${x.l} = ${x.val}`)} ?`, `On prend ${e(`${x.l} = ${x.val}`)}. Calcule ${x.e}.`, `Prends ${e(`${x.l} = ${x.val}`)}. Que vaut ${x.e} ?`, `Trouve ${x.e} quand ${e(`${x.l} = ${x.val}`)}.`, `${x.l} vaut ${x.val}. Calcule ${x.e}.`, `${x.l} vaut ${x.val}. Combien fait ${x.e} ?`, `Sachant que ${e(`${x.l} = ${x.val}`)}, calcule ${x.e}.`]);
};
const EXPL_L = (x: FormeL) => etapes(`on remplace ${x.l} par ${x.val}, puis la puissance d'abord.`, `${x.e} = ${x.m} = ${fr(x.v)}.`, `Pour ${e(`${x.l} = ${x.val}`)}, ${x.e} = ${fr(x.v)}.`);
const fl = (l: string, val: number, expr: string, m: string, v: number): FormeL => ({ l, val, e: e(expr), m: e(m), v });

function lPuissance() {
  const l = un(LETTRES);
  const cube = Math.random() < 0.3;
  const val = cube ? un([1, 2, 3, 4, 5, 10]) : entre(1, 12);
  const x = cube
    ? fl(l, val, `${l}³`, produit(val, 3), val ** 3)
    : fl(l, val, `${l}²`, `${val} × ${val}`, val * val);
  return { text: DEMANDE_L(x), ...court(x.v), explanation: EXPL_L(x) };
}
function lAjout() {
  const l = un(LETTRES);
  const val = entre(2, 10);
  const k = entre(2, 20);
  const a2 = val * val;
  const x = un([
    fl(l, val, `${l}² + ${k}`, `${val}² + ${k} = ${a2} + ${k}`, a2 + k),
    fl(l, val, `${k} + ${l}²`, `${k} + ${val}² = ${k} + ${a2}`, a2 + k),
    fl(l, val, `${l}² − ${Math.min(k, a2)}`, `${val}² − ${Math.min(k, a2)} = ${a2} − ${Math.min(k, a2)}`, a2 - Math.min(k, a2)),
    fl(l, val, `${a2 + k} − ${l}²`, `${a2 + k} − ${val}² = ${a2 + k} − ${a2}`, k),
  ]);
  return { text: DEMANDE_L(x), ...court(x.v), explanation: EXPL_L(x) };
}
function lProduit() {
  const l = un(LETTRES);
  const val = entre(2, 10);
  const k = entre(2, 9);
  const x = un([
    fl(l, val, `${k} × ${l}²`, `${k} × ${val}² = ${k} × ${val * val}`, k * val * val),
    fl(l, val, `${l}² × ${k}`, `${val}² × ${k} = ${val * val} × ${k}`, k * val * val),
  ]);
  return { text: DEMANDE_L(x), ...court(x.v), explanation: EXPL_L(x) };
}
function lPiege() {
  const l = un(LETTRES);
  const val = entre(3, 12);
  const s = SI(l, val);
  return {
    text: un([`${s} que vaut ${l}² ?`, `${s} ${l}² est égal à combien ?`, `${s} choisis la valeur de ${l}².`, `${s} quelle est la valeur de ${l}² ?`, `${l}² vaut combien pour ${e(`${l} = ${val}`)} ?`, `Remplace ${l} par ${val}. Que vaut ${l}² ?`, `Prends ${e(`${l} = ${val}`)}. Combien fait ${l}² ?`, `${l} vaut ${val}. Choisis la valeur de ${l}².`, `Quel nombre vaut ${l}² si ${e(`${l} = ${val}`)} ?`, `${s} quel résultat donne ${l}² ?`, `Attention : ${e(`${l} = ${val}`)}. Que vaut ${l}² ?`]),
    ...qcmN(val * val, [2 * val, val + 2, val * val + val]),
    explanation: etapes(`${l}² veut dire ${e(`${l} × ${l}`)}.`, `${e(`${val} × ${val}`)} = ${val * val}.`, `${l}² = ${val * val}, et pas ${2 * val} : ce serait 2${l}.`),
  };
}
function lDeux() {
  const l = un(LETTRES);
  const val = entre(2, 9);
  const k = entre(2, 5);
  const j = entre(1, 9);
  const a2 = val * val;
  const options = [
    fl(l, val, `${k}${l}²`, `${k} × ${val}² = ${k} × ${a2}`, k * a2),
    fl(l, val, `${k}${l}² + ${j}`, `${k} × ${val}² + ${j} = ${k * a2} + ${j}`, k * a2 + j),
    fl(l, val, `${l}² + ${l}`, `${val}² + ${val} = ${a2} + ${val}`, a2 + val),
    fl(l, val, `${l}² + ${k}${l}`, `${val}² + ${k} × ${val} = ${a2} + ${k * val}`, a2 + k * val),
    fl(l, val > 5 ? 3 : val, `${l}³ + ${j}`, `${(val > 5 ? 3 : val) ** 3} + ${j}`, (val > 5 ? 3 : val) ** 3 + j),
  ];
  if (val >= 2) options.push(fl(l, val, `${l}² − ${l}`, `${val}² − ${val} = ${a2} − ${val}`, a2 - val));
  if (val >= k) options.push(fl(l, val, `${l}² − ${k}${l}`, `${val}² − ${k} × ${val} = ${a2} − ${k * val}`, a2 - k * val));
  const x = un(options);
  return { text: DEMANDE_L(x), ...court(x.v), explanation: EXPL_L(x) };
}
function lPiegeFois() {
  const l = un(LETTRES);
  const val = entre(2, 7);
  const k = entre(2, 6);
  const expr = `${k}${l}²`;
  const v = k * val * val;
  const s = SI(l, val);
  return {
    text: un([`${s} que vaut ${expr} ?`, `${s} ${expr} est égal à combien ?`, `${s} choisis la valeur de ${expr}.`, `${s} quelle est la valeur de ${expr} ?`, `${expr} vaut combien pour ${e(`${l} = ${val}`)} ?`, `Remplace ${l} par ${val}. Que vaut ${expr} ?`, `Prends ${e(`${l} = ${val}`)}. Combien fait ${expr} ?`, `${l} vaut ${val}. Choisis la valeur de ${expr}.`, `Quel nombre vaut ${expr} si ${e(`${l} = ${val}`)} ?`, `${s} quel résultat donne ${expr} ?`, `Attention : ${e(`${l} = ${val}`)}. Que vaut ${expr} ?`]),
    ...qcmN(v, [(k * val) ** 2, k * 2 * val, k + val * val]),
    explanation: etapes(`${expr} veut dire ${e(`${k} × ${l}²`)} : le carré ne porte que sur ${l}.`, `${e(`${k} × ${val}²`)} = ${e(`${k} × ${val * val}`)} = ${v}.`, `${expr} = ${v}, et pas ${(k * val) ** 2}.`),
  };
}
function lTester() {
  const l = un(LETTRES);
  const val = entre(2, 10);
  const k = entre(1, 15);
  const vrai = Math.random() < 0.5;
  const juste = val * val + k;
  const droite = vrai ? juste : un([2 * val + k, juste + 1, juste + val]);
  const eg = e(`${l}² + ${k} = ${droite}`);
  const eLv = e(`${l} = ${val}`);
  return {
    text: un([`${eg} est-elle vraie pour ${eLv} ?`, `Pour ${eLv}, ${eg} : vrai ou faux ?`, `Teste ${eLv} dans ${eg}. Vrai ou faux ?`, `Vrai ou faux : ${eg} si ${eLv}.`, `Si ${eLv}, a-t-on ${eg} ?`, `On remplace ${l} par ${val} dans ${eg}. Est-ce vrai ?`, `Avec ${eLv}, l'égalité ${eg} est-elle juste ?`, `${eLv} vérifie-t-il ${eg} ?`, `Contrôle ${eg} pour ${eLv}. Vrai ou faux ?`, `${eg} marche-t-elle avec ${eLv} ?`, `Essaie ${eLv} dans ${eg} : vrai ou faux ?`, `L'égalité ${eg} est-elle vraie quand ${eLv} ?`]),
    ...vf(droite === juste),
    explanation: etapes(`on remplace ${l} par ${val} dans le membre de gauche.`, `${e(`${val}² + ${k}`)} = ${e(`${val * val} + ${k}`)} = ${juste}.`, droite === juste ? `On trouve ${droite} : c'est vrai.` : `On trouve ${juste}, pas ${droite} : c'est faux.`),
  };
}
function lInverse() {
  const l = un(LETTRES);
  const a = entre(2, 12);
  const n = a * a;
  return {
    text: un([`${e(`${l}² = ${n}`)}, et ${l} est positif. Que vaut ${l} ?`, `${l} est positif et ${e(`${l}² = ${n}`)}. Trouve ${l}.`, `Quelle valeur positive de ${l} donne ${e(`${l}² = ${n}`)} ?`, `Trouve ${l} positif tel que ${e(`${l}² = ${n}`)}.`, `Pour quel ${l} positif a-t-on ${e(`${l}² = ${n}`)} ?`, `${e(`${l}² = ${n}`)} : quel nombre positif convient ?`, `Choisis ${l} positif : ${e(`${l}² = ${n}`)}.`, `Quelle valeur positive convient : ${e(`${l}² = ${n}`)} ?`, `Résous avec ${l} positif : ${e(`${l}² = ${n}`)}.`, `Cherche ${l} positif : ${e(`${l}² = ${n}`)}.`, `Quel ${l} positif vérifie ${e(`${l}² = ${n}`)} ?`, `Le carré de ${l} vaut ${n}, avec ${l} positif. Que vaut ${l} ?`]),
    ...qcmN(a, [n, Math.round(n / 2), a + 1, a + 2]),
    explanation: etapes(`on cherche le nombre dont le carré vaut ${n}.`, `${e(`${a} × ${a}`)} = ${n}.`, `${l} = ${a}.`),
  };
}
function lQuelleExpr() {
  const l = un(LETTRES);
  const val = entre(2, 9);
  const k = entre(2, 9);
  const formes = melange([
    { x: `${l}² + ${k}`, v: val * val + k },
    { x: `2${l} + ${k}`, v: 2 * val + k },
    { x: `${k}${l}²`, v: k * val * val },
    { x: `(${l} + ${k})²`, v: (val + k) ** 2 },
    { x: `${l} + ${k}`, v: val + k },
    { x: `${l}² + ${l}`, v: val * val + val },
  ]);
  const juste = formes[0];
  const pieges = formes.slice(1).filter((y, i, a) => y.v !== juste.v && a.findIndex((z) => z.v === y.v) === i);
  if (pieges.length < 2) return lQuelleExpr();
  const eLv = e(`${l} = ${val}`);
  return {
    text: un([`Pour ${eLv}, quelle expression vaut ${fr(juste.v)} ?`, `Si ${eLv}, laquelle est égale à ${fr(juste.v)} ?`, `Avec ${eLv}, quelle expression donne ${fr(juste.v)} ?`, `Quelle expression vaut ${fr(juste.v)} quand ${eLv} ?`, `${eLv} : quelle expression fait ${fr(juste.v)} ?`, `Trouve l'expression égale à ${fr(juste.v)} pour ${eLv}.`, `On prend ${eLv}. Laquelle vaut ${fr(juste.v)} ?`, `${fr(juste.v)} : quelle expression, avec ${eLv} ?`, `Qui vaut ${fr(juste.v)} si ${eLv} ?`, `Choisis l'expression qui fait ${fr(juste.v)} pour ${eLv}.`, `Remplace ${l} par ${val}. Quelle expression donne ${fr(juste.v)} ?`, `Teste ${eLv}. Laquelle donne ${fr(juste.v)} ?`]),
    ...qcm(e(juste.x), pieges.slice(0, 3).map((y) => e(y.x))),
    explanation: etapes(`on remplace ${l} par ${val} dans chaque expression.`, `${e(juste.x)} donne ${fr(juste.v)}.`, `L'expression est ${e(juste.x)}.`),
  };
}
/* Formules d'autres matières : la lettre change, la formule reste juste. */
type Formule = { t: (val: number) => string; val: number[]; v: (val: number) => number; u: string; pieges: (val: number) => number[]; expr: (val: number) => string };
const FORMULES: Formule[] = [
  { t: (val) => `En physique, une bille tombe de d = 5 × t² mètres en t secondes. Que vaut d pour t = ${val} ?`, val: [1, 2, 3, 4, 5, 6], v: (t) => 5 * t * t, u: "m", pieges: (t) => [(5 * t) ** 2, 10 * t, 5 + t * t], expr: (t) => `5 × ${t}²` },
  { t: (val) => `Un peintre couvre les faces d'un cube d'arête a : S = 6 × a² m². Que vaut S pour a = ${val} ?`, val: [2, 3, 4, 5, 10], v: (a) => 6 * a * a, u: "m²", pieges: (a) => [(6 * a) ** 2, 12 * a, 6 + a * a], expr: (a) => `6 × ${a}²` },
  { t: (val) => `Une géomètre estime l'aire d'un disque de rayon r par A = 3 × r² m². Que vaut A pour r = ${val} ?`, val: [2, 3, 4, 5, 6, 10], v: (r) => 3 * r * r, u: "m²", pieges: (r) => [(3 * r) ** 2, 6 * r, 3 + r * r], expr: (r) => `3 × ${r}²` },
  { t: (val) => `Une monitrice d'auto-école donne d = v² ÷ 100 mètres de freinage, à v km/h. Que vaut d pour v = ${val} ?`, val: [10, 20, 30, 40, 50, 60, 80, 90], v: (v) => (v * v) / 100, u: "m", pieges: (v) => [(2 * v) / 100, v, (v * v) / 10], expr: (v) => `${v}² ÷ 100` },
  { t: (val) => `Un électricien calcule P = 5 × I² watts pour un courant I. Que vaut P pour I = ${val} ?`, val: [2, 3, 4, 6, 10], v: (i) => 5 * i * i, u: "W", pieges: (i) => [(5 * i) ** 2, 10 * i, 5 + i * i], expr: (i) => `5 × ${i}²` },
  { t: (val) => `Une ingénieure note E = 2 × v² joules pour un drone à v m/s. Que vaut E pour v = ${val} ?`, val: [2, 3, 4, 5, 8, 10], v: (v) => 2 * v * v, u: "J", pieges: (v) => [(2 * v) ** 2, 4 * v, 2 + v * v], expr: (v) => `2 × ${v}²` },
  { t: (val) => `Un aquarium cubique d'arête a a pour volume V = a³ dm³. Que vaut V pour a = ${val} ?`, val: [2, 3, 4, 5, 10], v: (a) => a ** 3, u: "dm³", pieges: (a) => [3 * a, a * a, a + 3], expr: (a) => `${a}³` },
  { t: (val) => `Une carreleuse facture P = 20 × c² euros une pièce carrée de côté c. Que vaut P pour c = ${val} ?`, val: [3, 4, 5, 6, 7, 8, 10], v: (c) => 20 * c * c, u: "€", pieges: (c) => [(20 * c) ** 2, 40 * c, 20 + c * c], expr: (c) => `20 × ${c}²` },
  { t: (val) => `Un organisateur compte M = n² − n matchs aller-retour pour n équipes. Que vaut M pour n = ${val} ?`, val: [3, 4, 5, 6, 8, 10, 12], v: (n) => n * n - n, u: "matchs", pieges: (n) => [n * n, 2 * n - n, (n - 1) * (n - 1)], expr: (n) => `${n}² − ${n}` },
  { t: (val) => `Une graphiste crée une icône carrée de c pixels de côté : N = c² pixels. Que vaut N pour c = ${val} ?`, val: [8, 9, 10, 12, 11, 7], v: (c) => c * c, u: "pixels", pieges: (c) => [2 * c, 4 * c, c * c + c], expr: (c) => `${c}²` },
  { t: (val) => `Une architecte pose N = 4 × c² dalles pour un patio de côté c. Que vaut N pour c = ${val} ?`, val: [3, 4, 5, 6, 7], v: (c) => 4 * c * c, u: "dalles", pieges: (c) => [(4 * c) ** 2, 8 * c, 4 + c * c], expr: (c) => `4 × ${c}²` },
  { t: (val) => `Un cuisinier calcule V = 2 × r² décilitres de sauce pour un plat de rayon r. Que vaut V pour r = ${val} ?`, val: [2, 3, 4, 5, 6], v: (r) => 2 * r * r, u: "dL", pieges: (r) => [(2 * r) ** 2, 4 * r, 2 + r * r], expr: (r) => `2 × ${r}²` },
];
function lFormule() {
  const s = un(FORMULES);
  const val = un(s.val);
  const v = s.v(val);
  return {
    text: s.t(val).replace(/ ([=×÷−]) /g, `${NBSP}$1${NBSP}`),
    ...qcmN(v, s.pieges(val), s.u, 5),
    explanation: etapes(`on remplace la lettre par ${val}, et la puissance d'abord.`, `${e(s.expr(val))} = ${fr(v)}.`, `${fr(v)} ${s.u}.`),
  };
}
/* Programme de calcul : la phrase devient une expression. */
type Prog = { d: (k: number) => string; expr: (l: string, k: number) => string; v: (x: number, k: number) => number; pieges: (l: string, k: number) => string[] };
const PROGS: Prog[] = [
  { d: (k) => `mets-le au carré, puis ajoute ${k}`, expr: (l, k) => `${l}² + ${k}`, v: (x, k) => x * x + k, pieges: (l, k) => [`2${l} + ${k}`, `(${l} + ${k})²`, `${l} + ${k}²`] },
  { d: (k) => `mets-le au carré, puis enlève ${k}`, expr: (l, k) => `${l}² − ${k}`, v: (x, k) => x * x - k, pieges: (l, k) => [`2${l} − ${k}`, `(${l} − ${k})²`, `${l} − ${k}²`] },
  { d: (k) => `mets-le au carré, puis multiplie par ${k}`, expr: (l, k) => `${k}${l}²`, v: (x, k) => k * x * x, pieges: (l, k) => [`(${k}${l})²`, `2${l} × ${k}`, `${l}² + ${k}`] },
  { d: (k) => `ajoute ${k}, puis mets le résultat au carré`, expr: (l, k) => `(${l} + ${k})²`, v: (x, k) => (x + k) ** 2, pieges: (l, k) => [`${l}² + ${k}`, `${l} + ${k}²`, `2${l} + ${k}`] },
  { d: (k) => `multiplie-le par ${k}, puis mets le résultat au carré`, expr: (l, k) => `(${k}${l})²`, v: (x, k) => (k * x) ** 2, pieges: (l, k) => [`${k}${l}²`, `${l}² + ${k}`, `2${l} × ${k}`] },
  { d: (k) => `mets-le au cube, puis ajoute ${k}`, expr: (l, k) => `${l}³ + ${k}`, v: (x, k) => x ** 3 + k, pieges: (l, k) => [`3${l} + ${k}`, `(${l} + ${k})³`, `${l}² + ${k}`] },
];
const ORDRE_PROG = ["Choisis un nombre", "Pense à un nombre", "Prends un nombre", "Un jeu de magie : choisis un nombre", "Dans ce tour, choisis un nombre", "Sur ta calculatrice, tape un nombre"];
function tirerProg() {
  const s = un(PROGS);
  const k = entre(2, 5);
  /* Le cube et le carré d'un produit restent calculables de tête. */
  const petit = s === PROGS[5] || s === PROGS[4];
  /* « Enlève » : le résultat reste positif, ici on ne teste pas les relatifs. */
  return { s, k, val: entre(s === PROGS[1] ? 3 : 2, petit ? 4 : 9), l: un(LETTRES) };
}
function lProgrammeValeur() {
  const { s, k, val } = tirerProg();
  const v = s.v(val, k);
  return {
    text: `${un(ORDRE_PROG)}, ${s.d(k)}. ${un([`Avec ${val}, que trouves-tu ?`, `Quel résultat pour ${val} ?`, `Que donne le nombre ${val} ?`, `Essaie avec ${val} : que trouves-tu ?`])}`,
    ...court(v),
    explanation: etapes(`on suit les étapes dans l'ordre.`, `${val} donne ${fr(v)}.`, `Le résultat est ${fr(v)}.`),
  };
}
function lProgrammeExpr() {
  const { s, k, l } = tirerProg();
  return {
    text: `${un(ORDRE_PROG).replace(/un nombre$/, `un nombre ${l}`)}, ${s.d(k)}. ${un(["Quelle expression obtiens-tu ?", "Quelle expression décrit ce programme ?", "Quel résultat, avec la lettre ?", "Quelle écriture correspond ?"])}`,
    ...qcm(e(s.expr(l, k)), s.pieges(l, k).map(e)),
    explanation: etapes(`on écrit les étapes dans l'ordre, sur la lettre ${l}.`, `On obtient ${e(s.expr(l, k))}.`, `L'expression est ${e(s.expr(l, k))}.`),
  };
}
function lComparer() {
  for (;;) {
    const l = un(LETTRES);
    const val = entre(2, 12);
    const k = entre(2, 9);
    const liste = melange([
      { x: `${l}²`, v: val * val },
      { x: `${k}${l}`, v: k * val },
      { x: `${l} + ${k * 5}`, v: val + k * 5 },
      { x: `${l}² − ${k}`, v: val * val - k },
    ]).slice(0, 3);
    const vals = liste.map((z) => z.v);
    if (new Set(vals).size < 3 || Math.min(...vals) < 0) continue;
    const grand = Math.random() < 0.5;
    const cible = grand ? Math.max(...vals) : Math.min(...vals);
    const juste = liste[vals.indexOf(cible)];
    const eLv = e(`${l} = ${val}`);
    const mot = grand ? "grand" : "petit";
    return {
      text: un([`Pour ${eLv}, quelle expression est la plus ${grand ? "grande" : "petite"} ?`, `Si ${eLv}, laquelle donne le plus ${mot} résultat ?`, `Avec ${eLv}, quel est le plus ${mot} résultat ?`, `Dans un test, ${eLv}. Quelle expression vaut le ${grand ? "plus" : "moins"} ?`, `On prend ${eLv}. Laquelle vaut le ${grand ? "plus" : "moins"} ?`, `Défi : ${eLv}. Quelle expression est la plus ${grand ? "grande" : "petite"} ?`, `Remplace ${l} par ${val}. Quel résultat est le plus ${mot} ?`, `Compare pour ${eLv} : quelle expression est la plus ${grand ? "grande" : "petite"} ?`, `Teste ${eLv}. Quelle expression donne le plus ${mot} résultat ?`, `Calcule les trois pour ${eLv}. Laquelle est la plus ${grand ? "grande" : "petite"} ?`, `Sachant que ${eLv}, laquelle est la plus ${grand ? "grande" : "petite"} ?`, `${eLv} : quelle expression donne le plus ${mot} nombre ?`]),
      ...qcm(e(juste.x), liste.map((z) => e(z.x))),
      explanation: etapes(`on remplace ${l} par ${val} dans chaque expression.`, liste.map((z) => `${e(z.x)} = ${fr(z.v)}`).join(" ; ") + ".", `La plus ${grand ? "grande" : "petite"} est ${e(juste.x)}.`),
    };
  }
}
function lDeuxLettres() {
  const a = entre(2, 9);
  const b = entre(2, 5);
  const [l, m] = melange(["a", "b", "x", "y"]).slice(0, 2);
  const options: { x: string; v: number; d: string }[] = [
    { x: `${l}² + ${m}³`, v: a * a + b ** 3, d: `${a}² + ${b}³` },
    { x: `${l}² + ${m}²`, v: a * a + b * b, d: `${a}² + ${b}²` },
    { x: `2${l}² + ${m}`, v: 2 * a * a + b, d: `2 × ${a}² + ${b}` },
    { x: `${l}² + 2${m}`, v: a * a + 2 * b, d: `${a}² + 2 × ${b}` },
    { x: `${l}² × ${m}`, v: a * a * b, d: `${a}² × ${b}` },
  ];
  if (a * a >= b * b) options.push({ x: `${l}² − ${m}²`, v: a * a - b * b, d: `${a}² − ${b}²` });
  const c = un(options);
  const donnees = un([`${e(`${l} = ${a}`)} et ${e(`${m} = ${b}`)}`, `${e(`${m} = ${b}`)} et ${e(`${l} = ${a}`)}`]);
  return {
    text: un([`Dans un tableur, ${donnees}. Calcule ${e(c.x)}.`, `Si ${donnees}, que vaut ${e(c.x)} ?`, `Pour ${donnees}, calcule ${e(c.x)}.`, `Avec ${donnees}, combien fait ${e(c.x)} ?`, `On prend ${donnees}. Que vaut ${e(c.x)} ?`, `Remplace : ${donnees}. Calcule ${e(c.x)}.`, `Sachant que ${donnees}, calcule ${e(c.x)}.`, `Un programme a ${donnees}. Que donne ${e(c.x)} ?`, `Deux lettres, ${donnees} : que vaut ${e(c.x)} ?`, `${e(c.x)} : combien pour ${donnees} ?`, `Trouve ${e(c.x)} quand ${donnees}.`, `Donne ${e(c.x)} avec ${donnees}.`]),
    ...court(c.v),
    explanation: etapes(`on remplace chaque lettre par son nombre, puis la puissance d'abord.`, `${e(c.x)} = ${e(c.d)} = ${fr(c.v)}.`, `${e(c.x)} = ${fr(c.v)}.`),
  };
}
function lEquation() {
  const l = un(LETTRES);
  const a = entre(2, 10);
  const k = entre(1, 20);
  const eq = e(`${l}² + ${k} = ${a * a + k}`);
  return {
    text: un([`Dans une énigme, ${l} est positif et ${eq}. Que vaut ${l} ?`, `${eq}, avec ${l} positif. Trouve ${l}.`, `Quelle valeur positive de ${l} vérifie ${eq} ?`, `Pour quel ${l} positif a-t-on ${eq} ?`, `Résous avec ${l} positif : ${eq}.`, `Un nombre positif ${l} vérifie ${eq}. Lequel ?`, `Trouve le nombre positif ${l} : ${eq}.`, `Une énigme : ${eq}, ${l} positif. Quel est ${l} ?`, `Cherche ${l} positif tel que ${eq}.`, `Remonte le calcul : ${eq}, avec ${l} positif.`, `${eq} : quelle valeur positive pour ${l} ?`, `Teste des valeurs positives : ${eq}. Que vaut ${l} ?`]),
    ...qcmN(a, [a + 1, a + 2, a > 2 ? a - 1 : a + 3, Math.round(a * a / 2)]),
    explanation: etapes(`on enlève ${k} des deux côtés, puis on cherche le carré.`, `${l}² = ${a * a + k} − ${k} = ${a * a}, et ${e(`${a} × ${a}`)} = ${a * a}.`, `${l} = ${a}.`),
  };
}

const AIDE_N = "L'exposant dit combien de fois on écrit le nombre dans le produit.";
const AIDE_V = "Le carré d'un nombre, c'est ce nombre multiplié par lui-même.";
const AIDE_E = "Cherche le nombre répété dans le produit.";
const AIDE_L = "Remplace la lettre par le nombre, puis calcule la puissance d'abord.";

export const puissanceSimpleBank: TutorBankItemV4[] = [
  MN(1, 1, AIDE_N, nDevelopper),
  MN(2, 1, AIDE_N, nCondenser),
  MN(3, 1, "L'exposant 2 se lit « au carré », l'exposant 3 « au cube ».", nLire),
  MN(4, 1, AIDE_N, nVraiFaux),
  MN(5, 2, "L'exposant n'est pas un facteur : on répète le nombre.", nErreur),
  MN(6, 2, AIDE_N, nExposant),
  MN(7, 2, "x × x n'est pas x + x.", nLettre),
  MN(8, 2, "Calcule chaque écriture.", nIntrus),
  MN(9, 3, "Autant de rangées que d'objets par rangée : c'est un carré.", nRangs),
  MN(10, 3, "Trois fois le même nombre dans un produit : c'est un cube.", nBlocs),
  MN(11, 3, "Aire d'un carré : côté × côté. Volume d'un cube : arête × arête × arête.", nMesure),
  MN(12, 3, "À chaque étape, on multiplie par le nombre de possibilités.", nCodes),

  MV(1, 1, AIDE_V, vCarre),
  MV(2, 1, "Écris le produit, puis calcule.", vAutomatisme),
  MV(3, 1, AIDE_V, vQcm),
  MV(4, 1, AIDE_V, vTrou),
  MV(5, 2, "Cherche dans les carrés de 0 à 12.", vInverse),
  MV(6, 2, "Calcule les deux, puis compare.", vComparer),
  MV(7, 2, "Écris le produit, puis calcule.", vVraiFaux),
  MV(8, 2, "Quel est le rang de ces nombres ?", vSuite),
  MV(9, 2, "Calcule chaque puissance.", vExtreme),
  MV(10, 3, "Autant de rangées que d'objets par rangée : calcule le carré.", vRangs),
  MV(11, 3, "Trois fois le même nombre : calcule le cube.", vBlocs),
  MV(12, 3, "Cherche le nombre dont le carré ou le cube donne cette mesure.", vCote),
  MV(13, 3, "À chaque étape, on multiplie par le nombre de possibilités.", vCodes),

  ME(1, 1, AIDE_E, eCarre),
  ME(2, 1, AIDE_E, eCube),
  ME(3, 1, "Compte les zéros.", eDix),
  ME(4, 1, AIDE_E, eTrou),
  ME(5, 2, "Cherche un nombre égal à un entier multiplié par lui-même.", eLequelCarre),
  ME(6, 2, "Cherche un produit de trois facteurs égaux.", eLequelCube),
  ME(7, 2, "Essaie le carré, puis le cube.", eExposant),
  ME(8, 2, "Cherche les carrés juste en dessous et juste au-dessus.", eEncadrer),
  ME(9, 2, "Calcule la puissance.", eVraiFaux),
  ME(10, 3, AIDE_E, eAire),
  ME(11, 3, "Autant de lignes que de colonnes : cherche le carré.", eVivant),
  ME(12, 3, "Compte les zéros.", eDixVivant),

  MC(1, 1, AIDE_CALC, cSomme),
  MC(2, 1, AIDE_CALC, cProduit),
  MC(3, 1, AIDE_CALC, cCube),
  MC(4, 1, "La puissance passe avant les autres opérations.", cPriorite),
  MC(5, 2, AIDE_CALC, cTrois),
  MC(6, 2, "La puissance d'abord : elle ne porte que sur le nombre juste avant.", cPiege),
  MC(7, 2, "Calcule d'abord la puissance.", cTrou),
  MC(8, 2, AIDE_CALC, cVraiFaux),
  MC(9, 2, AIDE_CALC, cQuelleExpr),
  MC(10, 3, "Écris le calcul : le carré ou le cube d'abord.", cTotal),
  MC(11, 3, "Compte d'abord le carré ou le bloc.", cTotalExpr),
  MC(12, 3, "Compte un lot, puis multiplie.", cLots),
  MC(13, 3, "Additionne les deux aires, ou les deux volumes.", cDeuxCarres),
  MC(14, 4, "Les parenthèses d'abord, puis les puissances.", cParenthese),
  MC(15, 4, "Calcule chacun, en respectant les priorités.", cComparer),
  MC(16, 4, "Calcule chaque côté de l'égalité.", cTriplet),
  MC(17, 4, "Enlève l'aire du petit carré à celle du grand.", cCour),

  ML(1, 1, AIDE_L, lPuissance),
  ML(2, 1, AIDE_L, lAjout),
  ML(3, 1, AIDE_L, lProduit),
  ML(4, 1, "La lettre au carré veut dire la lettre multipliée par elle-même.", lPiege),
  ML(5, 2, AIDE_L, lDeux),
  ML(6, 2, "Le carré ne porte que sur la lettre.", lPiegeFois),
  ML(7, 2, "Remplace, calcule, compare au membre de droite.", lTester),
  ML(8, 2, "Cherche le nombre dont le carré donne ce résultat.", lInverse),
  ML(9, 2, "Remplace la lettre dans chaque expression.", lQuelleExpr),
  ML(10, 3, AIDE_L, lFormule),
  ML(11, 3, "Suis les étapes dans l'ordre.", lProgrammeValeur),
  ML(12, 3, "Écris les étapes dans l'ordre, sur la lettre.", lProgrammeExpr),
  ML(13, 4, "Remplace la lettre dans chaque expression.", lComparer),
  ML(14, 4, "Remplace chaque lettre par son nombre.", lDeuxLettres),
  ML(15, 4, "Enlève le nombre ajouté, puis cherche le carré.", lEquation),
];
