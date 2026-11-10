// Renfort des suites GÉOMÉTRIQUES de 1re (module de maths sans spé, programme
// 2026, épreuve anticipée de juin 2027), 10/11/2026.
//
// Même méthode que suites-arithmetiques-renfort.ts (outils partagés) : des
// générateurs, des situations de la vie courante et de culture scientifique,
// le nom de la suite qui change, le rang de départ toujours dit. Termes
// STRICTEMENT POSITIFS (programme) ; nombres calculables sans calculatrice
// (u₀ choisi pour que u₀ × qᵏ tombe juste). Aucune question « open ».
// Correcteurs : correcteurs/suites.ts (tag « g:… »).

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  AN, HEURE, JOUR, MOIS, SEMAINE, NAT_A, NAT_G, NI, NATURES, cadre, cap, courte, expl, fabriquer, lettre, liste, listeNature, moment0, nb, noteSuite,
  nuage, nuageNature, plage, qcm4, quandRang, randomInt, rc, annee0, arr, aff, GENS_ARITH,
} from "./suites-arithmetiques-renfort";
import type { Gen, Ligne, Per, Q } from "./suites-arithmetiques-renfort";

/* ---------- Écritures ---------- */

/** Pourcentage en LaTeX : « 5\,\% ». */
export const pc = (t: number) => `${nb(t)}\\,\\%`;
/** Taux (en %) d'une raison : 1,05 → 5 ; 0,8 → −20. */
export const tauxDe = (q: number) => arr((q - 1) * 100);

/** u × q^k a au plus deux décimales pour k ≤ kmax ? */
const exact = (u: number, q: number, kmax: number) => plage(0, kmax).every((k) => Math.abs(u * q ** k * 100 - Math.round(u * q ** k * 100)) < 1e-6);

/** Nombres « ronds » 2^a × 5^b (× 3) : des départs dont les puissances tombent juste. */
const RONDS: number[] = (() => {
  const s = new Set<number>();
  for (let a = 0; a <= 12; a++) for (let b = 0; b <= 6; b++) for (const c of [1, 3]) {
    const v = 2 ** a * 5 ** b * c;
    if (v <= 500000) for (const w of [v, v / 10, v / 100]) if (w >= 0.05) s.add(arr(w));
  }
  return [...s].sort((x, y) => x - y);
})();

/** Un départ dans [min, max] tel que u × q^k tombe juste jusqu'à kmax. */
export function departExact(q: number, kmax: number, min: number, max: number, entier = false): number {
  const ok = (v: number) => exact(v, q, kmax) && (!entier || plage(0, kmax).every((k) => Number.isInteger(arr(v * q ** k))));
  let c = RONDS.filter((v) => v >= min && v <= max && ok(v));
  if (!c.length) c = RONDS.filter(ok); // hors plage plutôt qu’un effectif à virgule
  return rc(c.length ? c : [10 ** 6]);
}

/* ---------- Périodes propres aux situations géométriques ---------- */

const per = (chaque: string, plur: string, premier: string, nieme: string): Per => ({ chaque, plur, premier, nieme, an: false });
const REBOND = per("À chaque rebond", "rebonds", "le premier rebond", "au rebond numéro $n$");
const PLAQUE = per("À chaque plaque traversée", "plaques", "la première plaque", "après la plaque numéro $n$");
const PLIAGE = per("À chaque pliage", "pliages", "le premier pliage", "après le pliage numéro $n$");
const TOUR = per("À chaque tour", "tours", "le premier tour", "au tour numéro $n$");
const CASE = per("À chaque case suivante", "cases", "la première case", "sur la case numéro $n$");
const DEMIVIE = per("Tous les 30 ans", "périodes de 30 ans", "la première période", "après la période numéro $n$");

export type SitG = { sujet: string; verbe: string; unite: string; nom: string; ce: string; p: Per; u: [number, number]; q: number[]; i1?: boolean; entier?: boolean };

/** `i1` : la situation se prête à un départ au rang 1 (une durée) ; `entier` : on compte des objets (pas de virgule). */
export const SITG: SitG[] = [
  { sujet: "Un capital", verbe: "s’élève à", unite: "€", nom: "le capital", ce: "il", p: AN, u: [500, 20000], q: [1.02, 1.03, 1.04, 1.05, 1.1], i1: true },
  { sujet: "Une culture de bactéries", verbe: "compte", unite: "bactéries", nom: "le nombre de bactéries", ce: "ce nombre", p: HEURE, u: [10, 5000], q: [2, 3, 1.5], i1: true, entier: true },
  { sujet: "Le sang d’un patient", verbe: "contient", unite: "mg de médicament", nom: "la quantité de médicament dans le sang", ce: "cette quantité", p: HEURE, u: [40, 1000], q: [0.8, 0.9, 0.5, 0.7, 0.75] },
  { sujet: "Une voiture neuve", verbe: "vaut", unite: "€", nom: "la valeur de la voiture", ce: "sa valeur", p: AN, u: [8000, 40000], q: [0.85, 0.8, 0.9], i1: true },
  { sujet: "Le compte d’une vulgarisatrice scientifique", verbe: "a", unite: "abonnés", nom: "le nombre d’abonnés du compte", ce: "ce nombre", p: MOIS, u: [200, 20000], q: [1.1, 1.2, 1.25, 1.5], i1: true, entier: true },
  { sujet: "Une ville", verbe: "compte", unite: "habitants", nom: "la population de la ville", ce: "sa population", p: AN, u: [5000, 200000], q: [1.01, 1.02, 1.03, 0.98], i1: true, entier: true },
  { sujet: "Selon un glaciologue, un glacier", verbe: "contient", unite: "millions de m³ de glace", nom: "le volume du glacier", ce: "ce volume", p: AN, u: [100, 2000], q: [0.95, 0.9, 0.98], i1: true },
  { sujet: "Un faisceau lumineux", verbe: "a une intensité de", unite: "lux", nom: "l’intensité du faisceau", ce: "son intensité", p: PLAQUE, u: [100, 1000], q: [0.9, 0.8, 0.7, 0.5] },
  { sujet: "Une balle", verbe: "est lâchée d’une hauteur de", unite: "cm", nom: "la hauteur atteinte par la balle", ce: "la hauteur atteinte", p: REBOND, u: [100, 400], q: [0.8, 0.75, 0.6, 0.5, 0.9] },
  { sujet: "Un échantillon de césium 137", verbe: "a une masse de", unite: "g", nom: "la masse de césium restante", ce: "cette masse", p: DEMIVIE, u: [16, 1024], q: [0.5] },
  { sujet: "Une vidéo sur les volcans", verbe: "totalise", unite: "vues", nom: "le nombre de vues de la vidéo", ce: "ce nombre", p: JOUR, u: [100, 50000], q: [2, 3, 1.5], i1: true, entier: true },
  { sujet: "Un smartphone", verbe: "coûte", unite: "€", nom: "le prix du smartphone", ce: "son prix", p: AN, u: [300, 1200], q: [0.8, 0.75, 0.7, 0.9], i1: true },
  { sujet: "Sur un étang, des nénuphars", verbe: "couvrent", unite: "m²", nom: "la surface couverte par les nénuphars", ce: "cette surface", p: JOUR, u: [1, 50], q: [2, 1.5], i1: true },
  { sujet: "Un tournoi d’échecs en ligne", verbe: "réunit", unite: "joueurs", nom: "le nombre de joueurs encore en lice", ce: "ce nombre", p: TOUR, u: [64, 1024], q: [0.5], entier: true },
  { sujet: "Une feuille de papier", verbe: "a une épaisseur de", unite: "mm", nom: "l’épaisseur de la feuille pliée", ce: "l’épaisseur", p: PLIAGE, u: [0.05, 0.2], q: [2] },
  { sujet: "Sur la première case d’un échiquier,", verbe: "on pose", unite: "grains de riz", nom: "le nombre de grains sur la case", ce: "le nombre de grains", p: CASE, u: [2, 5], q: [2, 3], entier: true },
  { sujet: "Une rumeur", verbe: "est connue de", unite: "personnes", nom: "le nombre de personnes au courant", ce: "ce nombre", p: HEURE, u: [2, 50], q: [2, 3], i1: true, entier: true },
  { sujet: "Un garde forestier compte qu’une forêt", verbe: "a", unite: "arbres", nom: "le nombre d’arbres de la forêt", ce: "ce nombre", p: AN, u: [1000, 20000], q: [1.05, 1.1, 0.95], i1: true, entier: true },
  { sujet: "Un loyer", verbe: "s’élève à", unite: "€ par mois", nom: "le loyer mensuel", ce: "ce loyer", p: AN, u: [400, 1600], q: [1.02, 1.03, 1.05], i1: true },
  { sujet: "Une apicultrice observe qu’une colonie", verbe: "compte", unite: "abeilles", nom: "le nombre d’abeilles de la colonie", ce: "ce nombre", p: MOIS, u: [1000, 20000], q: [1.1, 1.2, 1.5, 0.9], i1: true, entier: true },
  { sujet: "Une commune", verbe: "recycle", unite: "tonnes de déchets par an", nom: "la masse de déchets recyclés", ce: "cette masse", p: AN, u: [100, 5000], q: [1.1, 1.2, 1.25], i1: true },
  { sujet: "Un jeu vidéo", verbe: "se vend à", unite: "exemplaires par mois", nom: "les ventes mensuelles du jeu", ce: "ce nombre", p: MOIS, u: [1000, 100000], q: [0.8, 0.9, 0.75, 0.5], i1: true, entier: true },
  { sujet: "Le site du Piton de la Fournaise", verbe: "accueille", unite: "visiteurs par an", nom: "la fréquentation du site", ce: "la fréquentation", p: AN, u: [10000, 200000], q: [1.1, 1.05, 1.2], i1: true, entier: true },
  { sujet: "Une population de lapins", verbe: "compte", unite: "individus", nom: "le nombre de lapins", ce: "ce nombre", p: AN, u: [10, 1000], q: [1.5, 2, 1.2], i1: true, entier: true },
  { sujet: "Un foyer", verbe: "consomme", unite: "kWh d’électricité par an", nom: "la consommation du foyer", ce: "cette consommation", p: AN, u: [2000, 6000], q: [0.95, 0.9], i1: true },
  { sujet: "Une application de révision", verbe: "est installée sur", unite: "téléphones", nom: "le nombre d’installations", ce: "ce nombre", p: SEMAINE, u: [50, 5000], q: [1.5, 2, 1.25], i1: true, entier: true },
];

/** Le sujet de la phrase d'évolution est-il féminin (« cette masse », « son intensité ») ? */
export const feminin = (s: SitG) => /^(cette|sa|la) /.test(s.ce) || /intensité|épaisseur/.test(s.ce);

/** « augmente de $5\,\%$ », « double », « est divisé(e) par $2$ » : formes fixes, relues par le correcteur. */
export function verbeG(q: number, fem = false) {
  if (q === 2) return rc(["double", `augmente de $${pc(100)}$`]);
  if (q === 3) return "triple";
  if (q === 0.5) return rc([`est divisé${fem ? "e" : ""} par $2$`, `diminue de $${pc(50)}$`]);
  const t = tauxDe(q);
  return t > 0 ? `${rc(["augmente de", "progresse de"])} $${pc(t)}$` : `${rc(["diminue de", "baisse de"])} $${pc(-t)}$`;
}

export function situG(s: SitG, u0: number, q: number, i0: number, an0: number) {
  return `${s.sujet} ${s.verbe} $${nb(u0)}$ ${s.unite} ${moment0(s.p, i0, an0)}. ${s.p.chaque}, ${s.ce} ${verbeG(q, feminin(s))}.`;
}

/** Situation, raison et départ exact jusqu'au rang kmax. */
export function sitG(kmax = 3, filtre?: (s: SitG) => boolean) {
  const s = rc(SITG.filter((x) => !filtre || filtre(x)));
  const q = rc(s.q);
  const u0 = departExact(q, kmax, s.u[0], s.u[1], s.entier);
  return { s, q, u0, i0: s.i1 ? rc([0, 0, 1]) : 0, an0: annee0() };
}

/** Raisons simples (calcul de tête) et départs assortis. */
function qSimple(d: number) {
  return d === 1 ? rc([2, 3, 0.5, 10]) : d === 2 ? rc([2, 3, 0.5, 1.5, 1.2, 0.8, 0.1]) : rc([1.5, 1.2, 0.8, 0.9, 1.1, 0.25, 1.25, 0.75]);
}

const EX_Q = (ts: number[], q: number) =>
  expl("dans une suite géométrique, on passe d’un terme au suivant en multipliant toujours par le même nombre : la raison $q$.", "on divise un terme par le précédent.", `$\\dfrac{${nb(ts[1])}}{${nb(ts[0])}} = ${nb(q)}$, et de même pour les suivants.`, `la raison est $q = ${nb(q)}$.`);

/* =========================================================
   EXPO_SUITE_RECONNAITRE
========================================================= */

function gRaisonListe(d: number): Q {
  const L = lettre();
  const nT = d === 1 ? 4 : 5;
  const i0 = rc([0, 1]);
  if (randomInt(1, 2) === 1) {
    const { s, q, u0 } = sitG(nT - 1);
    const ts = plage(0, nT - 1).map((k) => u0 * q ** k);
    return courte(
      rc([
        `${s.sujet} : on relève ${s.nom}, ${s.p.chaque.toLowerCase()}. On obtient $${liste(ts)}$. Ces nombres forment une suite géométrique, à partir de $${L}_${i0}$. Quelle est sa raison ?`,
        `On a noté ${s.nom}, ${s.p.chaque.toLowerCase()} : $${liste(ts)}$. On admet que c’est une suite géométrique $(${L}_n)$, qui commence à $${L}_${i0}$. Quelle est sa raison ?`,
      ]),
      q,
      EX_Q(ts, q)
    );
  }
  const q = qSimple(d);
  const u0 = departExact(q, nT - 1, 1, d === 1 ? 200 : 2000, d === 1);
  const ts = plage(0, nT - 1).map((k) => u0 * q ** k);
  return courte(
    rc([
      `${cadre()}Les premiers termes d’une suite géométrique $(${L}_n)$ sont, à partir de $${L}_${i0}$ : $${liste(ts)}$. Quelle est sa raison ?`,
      `${cadre()}Une suite géométrique $(${L}_n)$ commence, à partir de $${L}_${i0}$, par $${liste(ts)}$. Donne sa raison $q$.`,
      `${cadre()}Voici, dans l’ordre et à partir de $${L}_${i0}$, des termes consécutifs d’une suite géométrique : $${liste(ts)}$. Quelle est sa raison ?`,
    ]),
    q,
    EX_Q(ts, q)
  );
}

const EX_NAT = (sorte: string, ts: number[]) =>
  expl(
    "arithmétique : on AJOUTE toujours le même nombre ; géométrique : on MULTIPLIE toujours par le même nombre.",
    "on calcule les quotients entre termes consécutifs, et les écarts.",
    `écarts : $${liste(ts.slice(1).map((t, k) => t - ts[k]))}$ ; quotients : $${liste(ts.slice(1, 3).map((t, k) => Math.round((t / ts[k]) * 100) / 100))}$…`,
    sorte === "A" ? "les écarts sont constants : la suite est arithmétique." : sorte === "G" ? "les quotients sont constants : la suite est géométrique." : "ni les écarts ni les quotients ne sont constants."
  );

function gNatureListe(d: number): Q {
  const L = lettre();
  const sorte = rc(["G", "G", "A", "N"] as const);
  const { ts, raison } = listeNature(sorte, d === 1 ? 4 : 5);
  const text = rc([
    `${cadre()}La suite $(${L}_n)$ commence par $${liste(ts)}$. Cette suite semble :`,
    `${cadre()}On donne les premiers termes d’une suite $(${L}_n)$ : $${liste(ts)}$. Elle est :`,
    `${cadre()}Les termes $${L}_0$ à $${L}_${ts.length - 1}$ d’une suite valent $${liste(ts)}$. Quelle est sa nature ?`,
  ]);
  if (d === 1) {
    const bon = sorte === "A" ? "arithmétique" : sorte === "G" ? "géométrique" : NI;
    return qcm4(text, bon, NATURES.filter((x) => x !== bon), EX_NAT(sorte, ts));
  }
  const ecart = ts[1] - ts[0];
  const quot = Math.round((ts[1] / ts[0]) * 100) / 100;
  const bon = sorte === "A" ? NAT_A(raison) : sorte === "G" ? NAT_G(raison) : NI;
  const pieges = sorte === "A" ? [NAT_G(raison), NAT_G(quot), NI, NAT_A(ts[0]), NAT_A(-raison), NAT_G(ts[1])] : sorte === "G" ? [NAT_A(ecart), NAT_A(raison), NI, NAT_G(ecart), NAT_G(arr(1 / raison))] : [NAT_A(ecart), NAT_G(quot), NAT_G(2), NAT_A(ts[2] - ts[1]), NAT_G(ecart), NAT_A(quot)];
  return qcm4(text, bon, pieges, EX_NAT(sorte, ts));
}

const uniteCourte = (s: SitG) => s.unite.replace(/ (par|d’|de (?!m³)).*$/, "");

function gNatureSituation(d: number): Q {
  const { s, q, u0, an0 } = sitG(2);
  const sorte = rc(["G", "G", "A", "N"] as const);
  const hausse = q > 1;
  const X = Math.max(1, Math.round(u0 * rc([0.05, 0.1, 0.2])));
  const evo =
    sorte === "G"
      ? `${s.p.chaque}, ${s.ce} ${verbeG(q, feminin(s))}.`
      : sorte === "A"
        ? `${s.p.chaque}, ${s.ce} ${hausse ? "augmente" : "diminue"} de $${nb(X)}$ ${uniteCourte(s)}.`
        : `${s.p.chaque}, ${s.ce} ${hausse ? "augmente" : "diminue"}, mais pas de la même quantité : de $${nb(X)}$, puis de $${nb(X + 2)}$, puis de $${nb(X + 5)}$.`;
  const text = `${s.sujet} ${s.verbe} $${nb(u0)}$ ${s.unite} ${moment0(s.p, 0, an0)}. ${evo} ${rc(["La suite des valeurs successives est :", `On note $u_n$ ${s.nom} après $n$ ${s.p.plur}. La suite $(u_n)$ est :`, "Quelle suite modélise cette situation ?"])}`;
  const r = hausse ? X : -X;
  const ex = expl(
    "un POURCENTAGE fixe (ou « double », « triple »…) donne une suite géométrique ; une QUANTITÉ fixe ajoutée donne une suite arithmétique.",
    "on lit l’énoncé : un taux, ou une quantité en unités ?",
    sorte === "G" ? `on multiplie à chaque étape par $${nb(q)}$.` : sorte === "A" ? `on ajoute $${nb(r)}$ à chaque étape.` : "les variations changent, et ce ne sont pas des pourcentages fixes.",
    sorte === "G" ? `la suite est ${NAT_G(q)}.` : sorte === "A" ? `la suite est ${NAT_A(r)}.` : `la suite n’est ${NI}.`
  );
  if (d === 1) {
    const bon = sorte === "A" ? "arithmétique" : sorte === "G" ? "géométrique" : NI;
    return qcm4(text, bon, NATURES.filter((x) => x !== bon), ex);
  }
  const t = tauxDe(q);
  const bon = sorte === "G" ? NAT_G(q) : sorte === "A" ? NAT_A(r) : NI;
  const pieges = sorte === "G" ? [NAT_A(t), NAT_G(arr(Math.abs(t) / 100)), NAT_A(q), NI, NAT_G(t)] : sorte === "A" ? [NAT_G(r), NAT_A(-r), NAT_G(arr(1 + r / 100)), NI] : [NAT_A(r), NAT_A(r + 2), NAT_G(2), NAT_G(arr(1 + r / 100))];
  return qcm4(text, bon, pieges, ex);
}

/** Deux termes : consécutifs (q = quotient) ou à deux rangs d'écart (q² = quotient). */
function gQuotient(d: number): Q {
  const L = lettre();
  const q = d === 2 ? rc([2, 3, 0.5, 1.5, 4]) : rc([2, 3, 0.5, 1.5, 1.2, 0.8]);
  const ecart = d === 2 ? 1 : rc([1, 2]);
  const i = randomInt(1, 7);
  const ui = departExact(q, ecart, 2, 3000, true);
  const uj = ui * q ** ecart;
  const text = rc([
    `${cadre()}La suite $(${L}_n)$ est géométrique, à termes strictement positifs, avec $${L}_${i} = ${nb(ui)}$ et $${L}_${i + ecart} = ${nb(uj)}$. Quelle est sa raison ?`,
    `${cadre()}Pour une suite géométrique $(${L}_n)$ à termes positifs, on sait que $${L}_${i} = ${nb(ui)}$ et $${L}_${i + ecart} = ${nb(uj)}$. Calcule sa raison $q$.`,
    `${cadre()}On connaît deux termes d’une suite géométrique à termes positifs : $${L}_${i} = ${nb(ui)}$ et $${L}_${i + ecart} = ${nb(uj)}$. Que vaut $q$ ?`,
  ]);
  return courte(text, q, expl(`de $${L}_${i}$ à $${L}_${i + ecart}$, on multiplie ${ecart === 1 ? "une fois" : "deux fois"} par $q$.`, ecart === 1 ? "on divise le terme suivant par le précédent." : "le quotient vaut $q^2$ ; on cherche le nombre positif dont le carré vaut ce quotient.", `$\\dfrac{${nb(uj)}}{${nb(ui)}} = ${nb(q ** ecart)}$${ecart === 2 ? ` $= ${nb(q)}^2$` : ""}.`, `la raison est $q = ${nb(q)}$.`));
}

/* =========================================================
   EXPO_SUITE_RECURRENCE
========================================================= */

const relG = (L: string, q: number) => rc([`$${L}_{n+1} = ${nb(q)} \\times ${L}_n$`, `$${L}_{n+1} = ${nb(q)}${L}_n$`, `$${L}_{n+1} = ${nb(q)} \\times ${L}_n$`]);
const EX_RELG = (L: string, q: number, quoi: string) =>
  expl(`la relation de récurrence donne $${L}_{n+1}$ à partir de $${L}_n$ ; pour une suite géométrique, on MULTIPLIE par la raison.`, quoi, `$${L}_{n+1} = ${nb(q)} \\times ${L}_n$.`, `la suite est géométrique de raison $${nb(q)}$.`);

function piegesRelG(L: string, q: number) {
  const R = `${L}_{n+1}`;
  const N = `${L}_n`;
  const t = Math.abs(tauxDe(q));
  const p = [`$${R} = ${N} + ${nb(t)}$`, `$${R} = ${nb(t / 100)} \\times ${N}$`, `$${R} = ${N} + ${nb(q)}$`, `$${N} = ${nb(q)} \\times ${R}$`];
  if (q < 2 && q !== 1) p.push(`$${R} = ${nb(arr(2 - q))} \\times ${N}$`);
  return p;
}

function gRelationSituation(d: number): Q {
  const { s, q, u0, an0 } = sitG(2);
  const L = lettre();
  const i0 = d === 1 || !s.i1 ? 0 : rc([0, 1]);
  const text = `${situG(s, u0, q, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)} ${rc(["Quelle relation de récurrence vérifie la suite ?", `Pour tout entier $n \\ge ${i0}$, on a :`, "Quelle égalité traduit cette évolution ?"])}`;
  return qcm4(text, `$${L}_{n+1} = ${nb(q)} \\times ${L}_n$`, piegesRelG(L, q), EX_RELG(L, q, `${q === 2 ? "doubler" : q === 3 ? "tripler" : q === 0.5 ? "diviser par $2$" : "évoluer d’un pourcentage fixe"}, c’est multiplier par le même coefficient à chaque étape.`));
}

function gRelationListe(_d: number): Q {
  const L = lettre();
  const { ts, raison: q } = listeNature("G", 5);
  const text = rc([
    `${cadre()}Une suite géométrique $(${L}_n)$ commence, à partir de $${L}_0$, par $${liste(ts)}$. Quelle relation vérifie-t-elle pour tout entier naturel $n$ ?`,
    `${cadre()}On lit les termes $${L}_0$ à $${L}_4$ d’une suite géométrique : $${liste(ts)}$. Quelle est sa relation de récurrence ?`,
  ]);
  return qcm4(text, `$${L}_{n+1} = ${nb(q)} \\times ${L}_n$`, [...piegesRelG(L, q), `$${L}_{n+1} = ${L}_n ${ts[1] - ts[0] < 0 ? "-" : "+"} ${nb(Math.abs(ts[1] - ts[0]))}$`], EX_RELG(L, q, "on divise un terme par le précédent pour trouver le coefficient."));
}

function gSuivant(d: number): Q {
  const L = lettre();
  const q = qSimple(d);
  const k = randomInt(1, 8);
  const x = departExact(q, 1, 2, d === 1 ? 500 : 5000, d === 1);
  const text = rc([
    `${cadre()}La suite $(${L}_n)$ vérifie ${relG(L, q)} pour tout entier naturel $n$. On sait que $${L}_${k} = ${nb(x)}$. Combien vaut $${L}_{${k + 1}}$ ?`,
    `${cadre()}Pour tout entier naturel $n$, ${relG(L, q)}. Sachant que $${L}_${k} = ${nb(x)}$, calcule $${L}_{${k + 1}}$.`,
    `${cadre()}On a $${L}_${k} = ${nb(x)}$ et, pour tout entier naturel $n$, ${relG(L, q)}. Que vaut le terme suivant, $${L}_{${k + 1}}$ ?`,
  ]);
  return courte(text, x * q, expl("la relation donne le terme suivant à partir du terme actuel.", `on remplace $n$ par $${k}$ : $${L}_{${k + 1}} = ${nb(q)} \\times ${L}_${k}$.`, `$${L}_{${k + 1}} = ${nb(q)} \\times ${nb(x)} = ${nb(x * q)}$.`, `$${L}_{${k + 1}} = ${nb(x * q)}$.`));
}

function gDerouler(d: number): Q {
  const L = lettre();
  const q = qSimple(d);
  const pas = d === 1 ? 2 : 3;
  const i0 = rc([0, 1]);
  const x = departExact(q, pas, 1, 3000, d === 1);
  const k = i0 + pas;
  const text = rc([
    `${cadre()}La suite $(${L}_n)$ est définie par $${L}_${i0} = ${nb(x)}$ et ${relG(L, q)} pour tout entier $n \\ge ${i0}$. Combien vaut $${L}_{${k}}$ ?`,
    `${cadre()}On pose $${L}_${i0} = ${nb(x)}$ et, pour tout entier $n \\ge ${i0}$, ${relG(L, q)}. Calcule $${L}_{${k}}$ pas à pas.`,
    `${cadre()}Une suite commence à $${L}_${i0} = ${nb(x)}$ et vérifie ${relG(L, q)} pour $n \\ge ${i0}$. Que vaut $${L}_{${k}}$ ?`,
  ]);
  return courte(text, x * q ** pas, expl("une relation de récurrence se déroule pas à pas.", `on multiplie par $${nb(q)}$, ${pas} fois de suite.`, `$${liste(plage(0, pas).map((j) => x * q ** j))}$.`, `$${L}_{${k}} = ${nb(x * q ** pas)}$.`));
}

function gPrecedent(d: number): Q {
  const L = lettre();
  const q = d === 2 ? rc([2, 3, 0.5, 10]) : rc([2, 1.5, 0.5, 1.2, 0.8, 4]);
  const recul = d === 2 ? 1 : rc([1, 2]);
  const k = randomInt(4, 9);
  const y = departExact(q, recul, 2, 3000);
  const x = y * q ** recul;
  const text = rc([
    `${cadre()}La suite $(${L}_n)$ vérifie ${relG(L, q)} pour tout entier naturel $n$, et $${L}_${k} = ${nb(x)}$. Combien vaut $${L}_{${k - recul}}$ ?`,
    `${cadre()}On sait que $${L}_${k} = ${nb(x)}$ et que, pour tout entier naturel $n$, ${relG(L, q)}. Retrouve $${L}_{${k - recul}}$.`,
    `${cadre()}On remonte le temps : pour tout entier naturel $n$, ${relG(L, q)}, et $${L}_${k} = ${nb(x)}$. Que vaut $${L}_{${k - recul}}$ ?`,
  ]);
  return courte(text, y, expl("pour revenir au terme PRÉCÉDENT, on fait l’opération inverse : on divise par $q$.", `${recul === 1 ? "un pas" : "deux pas"} en arrière.`, `$${L}_{${k - recul}} = ${nb(x)} \\div ${nb(q ** recul)} = ${nb(y)}$.`, `$${L}_{${k - recul}} = ${nb(y)}$.`));
}

function gRecContexte(d: number): Q {
  const pas = d === 2 ? 2 : 3;
  const { s, q, u0, i0, an0 } = sitG(pas);
  const L = lettre();
  const k = i0 + pas;
  const text = `${situG(s, u0, q, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)} ${rc([`Calcule $${L}_{${k}}$, c’est-à-dire ${s.nom} ${quandRang(s.p, i0, an0, k)}.`, `Que vaut $${L}_{${k}}$ ?`, `En utilisant $${L}_{n+1} = ${nb(q)} \\times ${L}_n$, calcule $${L}_{${k}}$.`])}`;
  return courte(text, u0 * q ** pas, expl(`$${L}_{n+1} = ${nb(q)} \\times ${L}_n$ et $${L}_${i0} = ${nb(u0)}$.`, `on multiplie ${pas} fois par $${nb(q)}$.`, `$${liste(plage(0, pas).map((j) => u0 * q ** j))}$.`, `$${L}_{${k}} = ${nb(u0 * q ** pas)}$.`));
}

/* =========================================================
   EXPO_SUITE_TAUX
========================================================= */

const EX_TAUX = (t: number, q: number) =>
  expl("la raison d’une suite géométrique est le coefficient multiplicateur : $q = 1 + \\dfrac{t}{100}$ (avec $t < 0$ pour une baisse).", `${t > 0 ? "augmenter" : "diminuer"} de $${pc(Math.abs(t))}$, c’est multiplier par $1 ${t > 0 ? "+" : "-"} ${nb(Math.abs(t) / 100)}$.`, `$q = 1 ${t > 0 ? "+" : "-"} ${nb(Math.abs(t) / 100)} = ${nb(q)}$.`, `la raison est $q = ${nb(q)}$${q < 1 ? " (inférieure à 1, mais strictement positive)" : ""}.`);

const QUANTITES = [
  "Une quantité", "Le prix d’un abonnement", "Le nombre de visiteurs d’un musée", "La masse d’un stock de riz", "Le nombre d’adhérents d’une association", "La population d’un village", "Le débit d’une source",
  "Le nombre de ventes d’un livre", "La production d’une ferme solaire", "Le volume d’un réservoir", "Le nombre de passagers d’une ligne de tram", "La valeur d’une collection de timbres",
];

function gTauxVersQ(d: number): Q {
  const t = d === 1 ? rc([10, 20, 50, 5, -10, -20, -50]) : d === 2 ? rc([3, 4, 2, 15, 25, 30, -5, -15, -25, -30]) : rc([0.5, 1.5, -2.5, -0.5, 12.5, -12, 150, 200, -75]);
  const q = arr(1 + t / 100);
  const L = lettre();
  const P = `${t > 0 ? rc(["augmente de", "progresse de"]) : rc(["diminue de", "baisse de"])} $${pc(Math.abs(t))}$`;
  const text = randomInt(1, 2) === 1
    ? `${rc(QUANTITES)} ${P} chaque ${rc(["année", "mois", "semaine"])}. ${rc(["Quelle est la raison de la suite géométrique associée ?", `On note $${L}_n$ sa valeur après $n$ périodes. Quelle est la raison de $(${L}_n)$ ?`, "Par quel coefficient multiplie-t-on à chaque période ?"])}`
    : `${cadre()}Une suite géométrique $(${L}_n)$ modélise une évolution : à chaque étape, la valeur ${P}. ${rc(["Quelle est sa raison $q$ ?", "Donne sa raison."])}`;
  return courte(text, q, EX_TAUX(t, q));
}

const evolution = (t: number) => `une ${t > 0 ? "hausse" : "baisse"} de $${pc(Math.abs(t))}$ à chaque étape`;

function gQVersTaux(d: number): Q {
  const t = d === 2 ? rc([10, 20, 5, 25, -10, -20, -5, -50]) : rc([2, 3, 4, 12, 30, -2, -4, -15, -25, -40]);
  const q = arr(1 + t / 100);
  const L = lettre();
  const pieges = [evolution(-t), `une ${t > 0 ? "hausse" : "baisse"} de $${pc(Math.abs(2 * t))}$ à chaque étape`, `une hausse de $${pc(arr(q * 100))}$ à chaque étape`, `une ${q > 1 ? "hausse" : "baisse"} de $${pc(q)}$ à chaque étape`, `une baisse de $${pc(arr(q * 100))}$ à chaque étape`];
  return qcm4(
    `${cadre()}${rc(["Une suite géométrique", "La suite géométrique"])} $(${L}_n)$ a pour raison $q = ${nb(q)}$. ${rc(["À quelle évolution correspond-elle ?", "Quelle évolution traduit-elle ?", "Cette raison correspond à :"])}`,
    evolution(t),
    pieges,
    expl("une raison $q$ correspond au taux $t$ tel que $q = 1 + \\dfrac{t}{100}$.", "on retire $1$ à la raison, puis on écrit le résultat en pourcentage.", `$${nb(q)} - 1 = ${nb(t / 100)}$, soit $${pc(t)}$.`, `c’est ${evolution(t)}.`)
  );
}

const MOTS: Array<[string, number]> = [
  ["double", 2], ["triple", 3], ["est multiplié par $10$", 10], ["est divisé par $2$", 0.5], ["est divisé par $4$", 0.25], ["est divisé par $10$", 0.1],
  ["perd la moitié de sa valeur", 0.5], ["augmente de moitié", 1.5], ["perd les trois quarts de sa valeur", 0.25], ["augmente de $100\\,\\%$", 2], ["augmente de $200\\,\\%$", 3], ["perd un quart de sa valeur", 0.75],
];

function gTauxMots(_d: number): Q {
  const [m, q] = rc(MOTS);
  const L = lettre();
  return courte(
    `${rc(QUANTITES)} ${m} ${rc(["chaque année", "chaque mois", "chaque semaine", "à chaque étape"])}. ${rc(["Quelle est la raison de la suite géométrique associée ?", `On note $${L}_n$ sa valeur après $n$ étapes. Quelle est la raison $q$ ?`, "Par quel nombre multiplie-t-on à chaque fois ?"])}`,
    q,
    expl("la raison d’une suite géométrique est le nombre par lequel on multiplie à chaque étape.", "on traduit les mots en multiplication.", `« ${m.replace(/\$/g, "")} », c’est multiplier par $${nb(q)}$.`, `$q = ${nb(q)}$.`)
  );
}

function gTauxDeuxTermes(d: number): Q {
  const t = d === 2 ? rc([10, 20, 25, 50, -10, -20, -25, -50]) : rc([2, 4, 5, 15, 30, 35, -5, -15, -30, -40]);
  const q = arr(1 + t / 100);
  const { s, an0 } = sitG(1, (x) => x.p.an);
  const a = departExact(q, 1, s.u[0], s.u[1], s.entier);
  const b = arr(a * q);
  const L = lettre();
  const intro = `${cap(s.nom)} passe de $${nb(a)}$ ${s.unite} en ${an0} à $${nb(b)}$ ${s.unite} en ${an0 + 1}. On suppose que l’évolution se poursuit au même taux.`;
  if (randomInt(1, 2) === 1)
    return courte(`${intro} ${rc([`On note $${L}_n$ ${s.nom} en ${an0} + $n$. Quelle est la raison de la suite géométrique $(${L}_n)$ ?`, "Quel est le coefficient multiplicateur annuel ?"])}`, q, expl("la raison est le quotient de deux termes consécutifs.", "on divise la valeur d’arrivée par la valeur de départ.", `$\\dfrac{${nb(b)}}{${nb(a)}} = ${nb(q)}$.`, `$q = ${nb(q)}$.`));
  return courte(`${intro} ${t > 0 ? "De combien de pourcents augmente-t-on chaque année ?" : "De combien de pourcents baisse-t-on chaque année ?"} (Donne le nombre, sans le signe %.)`, Math.abs(t), expl("$q = 1 + \\dfrac{t}{100}$.", "on calcule le coefficient, puis on retire $1$.", `$\\dfrac{${nb(b)}}{${nb(a)}} = ${nb(q)}$ et $${nb(q)} - 1 = ${nb(t / 100)}$.`, `c’est une ${t > 0 ? "hausse" : "baisse"} de $${pc(Math.abs(t))}$ par an.`));
}

function gTauxGlobal(_d: number): Q {
  const t = rc([10, 20, 50, -10, -20, -50, 30]);
  const q = arr(1 + t / 100);
  const k = 2;
  const g = arr((q ** k - 1) * 100);
  const L = lettre();
  return qcm4(
    `${cadre()}La suite géométrique $(${L}_n)$ a pour raison $q = ${nb(q)}$. ${rc([`Entre $${L}_0$ et $${L}_2$, quelle est l’évolution globale ?`, `Deux étapes de suite, on passe de $${L}_0$ à $${L}_2$. Cela correspond à :`])}`,
    `une ${g > 0 ? "hausse" : "baisse"} de $${pc(Math.abs(g))}$`,
    [`une ${t > 0 ? "hausse" : "baisse"} de $${pc(Math.abs(2 * t))}$`, `une ${t > 0 ? "hausse" : "baisse"} de $${pc(Math.abs(t))}$`, `une ${g > 0 ? "baisse" : "hausse"} de $${pc(Math.abs(g))}$`, `une ${t > 0 ? "hausse" : "baisse"} de $${pc(arr(q * q * 100))}$`],
    expl("deux évolutions successives se MULTIPLIENT : les pourcentages ne s’additionnent pas.", "on calcule $q^2$, puis on retire $1$.", `$${nb(q)}^2 = ${nb(q * q)}$ et $${nb(q * q)} - 1 = ${nb(arr(q * q - 1))}$.`, `c’est une ${g > 0 ? "hausse" : "baisse"} de $${pc(Math.abs(g))}$, et non de $${pc(Math.abs(2 * t))}$.`)
  );
}

/* =========================================================
   EXPO_SUITE_TERME_RANG
========================================================= */

function gTerme0(d: number): Q {
  const L = lettre();
  const q = qSimple(d);
  const k = d === 1 ? randomInt(2, 4) : d === 2 ? randomInt(2, 3) : randomInt(3, 4);
  const u = departExact(q, k, 1, 5000, d === 1);
  const text = rc([
    `${cadre()}La suite géométrique $(${L}_n)$ a pour premier terme $${L}_0 = ${nb(u)}$ et pour raison $q = ${nb(q)}$. Combien vaut $${L}_{${k}}$ ?`,
    `${cadre()}On considère la suite géométrique de premier terme $${L}_0 = ${nb(u)}$ et de raison $q = ${nb(q)}$. Calcule $${L}_{${k}}$.`,
    `${cadre()}Une suite géométrique $(${L}_n)$, définie pour $n \\ge 0$, vérifie $${L}_0 = ${nb(u)}$, avec la raison $q = ${nb(q)}$. Que vaut $${L}_{${k}}$ ?`,
  ]);
  return courte(text, u * q ** k, expl("pour une suite géométrique qui commence au rang $0$ : $u_n = u_0 \\times q^n$.", `de $${L}_0$ à $${L}_{${k}}$, on multiplie $${k}$ fois par $q$.`, `$${L}_{${k}} = ${nb(u)} \\times ${nb(q)}^{${k}} = ${nb(u)} \\times ${nb(q ** k)} = ${nb(u * q ** k)}$.`, `$${L}_{${k}} = ${nb(u * q ** k)}$.`));
}

function gTerme1(d: number): Q {
  const L = lettre();
  const q = qSimple(d);
  const k = randomInt(3, 4);
  const u = departExact(q, k - 1, 1, 5000);
  const text = rc([
    `${cadre()}La suite géométrique $(${L}_n)$, définie pour $n \\ge 1$, a pour premier terme $${L}_1 = ${nb(u)}$ et pour raison $q = ${nb(q)}$. Combien vaut $${L}_{${k}}$ ?`,
    `${cadre()}Attention au rang de départ : une suite géométrique de raison $q = ${nb(q)}$ commence à $${L}_1 = ${nb(u)}$. Calcule $${L}_{${k}}$.`,
    `${cadre()}On numérote les termes à partir de $1$ : $${L}_1 = ${nb(u)}$, et la raison est $q = ${nb(q)}$. Que vaut $${L}_{${k}}$ ?`,
  ]);
  return courte(text, u * q ** (k - 1), expl("quand la suite commence au rang $1$ : $u_n = u_1 \\times q^{n-1}$.", `de $${L}_1$ à $${L}_{${k}}$, on multiplie $${k - 1}$ fois par $q$, et non $${k}$ fois.`, `$${L}_{${k}} = ${nb(u)} \\times ${nb(q)}^{${k - 1}} = ${nb(u * q ** (k - 1))}$.`, `$${L}_{${k}} = ${nb(u * q ** (k - 1))}$.`));
}

function gTermeAutre(_d: number): Q {
  const L = lettre();
  const q = rc([2, 3, 0.5, 1.5, 1.2, 0.8, 10]);
  const i = randomInt(2, 8);
  const pas = rc([2, 3, -1, -2]);
  const base = departExact(q, Math.abs(pas), 1, 3000);
  const ui = pas > 0 ? base : base * q ** -pas;
  const v = pas > 0 ? base * q ** pas : base;
  const k = i + pas;
  const text = rc([
    `${cadre()}La suite $(${L}_n)$ est géométrique de raison $q = ${nb(q)}$, et $${L}_${i} = ${nb(ui)}$. Combien vaut $${L}_{${k}}$ ?`,
    `${cadre()}Pour une suite géométrique de raison $q = ${nb(q)}$, on connaît $${L}_${i} = ${nb(ui)}$. Calcule $${L}_{${k}}$.`,
    `${cadre()}On ne connaît pas le premier terme, seulement $${L}_${i} = ${nb(ui)}$ et la raison $q = ${nb(q)}$ de cette suite géométrique. Que vaut $${L}_{${k}}$ ?`,
  ]);
  return courte(text, v, expl("$u_k = u_i \\times q^{k-i}$ : on multiplie (ou on divise) par $q$ autant de fois qu’il y a de pas.", `de $${L}_${i}$ à $${L}_{${k}}$ : $${Math.abs(pas)}$ pas ${pas > 0 ? "en avant" : "en arrière"}.`, pas > 0 ? `$${L}_{${k}} = ${nb(ui)} \\times ${nb(q)}^{${pas}} = ${nb(v)}$.` : `$${L}_{${k}} = ${nb(ui)} \\div ${nb(q)}^{${-pas}} = ${nb(v)}$.`, `$${L}_{${k}} = ${nb(v)}$.`));
}

function gTermeCalcul(_d: number): Q {
  const L = lettre();
  const q = rc([1.02, 1.05, 1.1, 0.9, 0.95, 1.5, 0.8, 2, 3]);
  const u = rc([100, 200, 500, 1000, 2000, 5000, 1500]);
  const k = randomInt(5, 30);
  const i0 = rc([0, 1]);
  const pas = k - i0;
  const cands: Array<[string, number]> = [
    [`$${nb(u)} \\times ${nb(q)}^{${pas}}$`, u * q ** pas],
    [`$${nb(u)} \\times ${nb(q)}^{${i0 === 0 ? k - 1 : k}}$`, u * q ** (i0 === 0 ? k - 1 : k)],
    [`$${nb(u)} \\times ${nb(q)} \\times ${pas}$`, u * q * pas],
    [`$${nb(u)} + ${pas} \\times ${nb(q)}$`, u + pas * q],
    [`$(${nb(u)} \\times ${nb(q)})^{${pas}}$`, (u * q) ** pas],
  ];
  const vus = new Set([cands[0][1]]);
  const pieges: string[] = [];
  for (const [e, v] of cands.slice(1)) if (![...vus].some((w) => Math.abs(w - v) <= 1e-9 * Math.max(1, Math.abs(v)))) { vus.add(v); pieges.push(e); }
  return qcm4(
    `${cadre()}La suite géométrique $(${L}_n)$ commence au rang $${i0}$ : $${L}_${i0} = ${nb(u)}$, raison $q = ${nb(q)}$. ${rc([`Quel calcul donne $${L}_{${k}}$ ?`, `Pour obtenir $${L}_{${k}}$, on calcule :`, `Quelle expression vaut $${L}_{${k}}$ ?`])}`,
    cands[0][0],
    pieges,
    expl(i0 === 0 ? "$u_n = u_0 \\times q^n$." : "$u_n = u_1 \\times q^{n-1}$.", `de $${L}_${i0}$ à $${L}_{${k}}$, on multiplie $${pas}$ fois par $q$ : l’exposant est le nombre de pas.`, `$${L}_{${k}} = ${nb(u)} \\times ${nb(q)}^{${pas}}$.`, `le bon calcul est $${nb(u)} \\times ${nb(q)}^{${pas}}$.`)
  );
}

function gTermeContexte(d: number): Q {
  const pas = d === 2 ? 2 : 3;
  const { s, q, u0, i0, an0 } = sitG(pas);
  const L = lettre();
  const k = i0 + pas;
  const v = u0 * q ** pas;
  const text = `${situG(s, u0, q, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)} ${rc([`Combien vaut $${L}_{${k}}$, c’est-à-dire ${s.nom} ${quandRang(s.p, i0, an0, k)} ?`, `Calcule $${L}_{${k}}$.`, `Quelle est la valeur de $${L}_{${k}}$ ?`])}`;
  return courte(text, v, expl(`la suite est géométrique de raison $${nb(q)}$, avec $${L}_${i0} = ${nb(u0)}$.`, `de $${L}_${i0}$ à $${L}_{${k}}$, on multiplie $${pas}$ fois par $${nb(q)}$.`, `$${L}_{${k}} = ${nb(u0)} \\times ${nb(q)}^{${pas}} = ${nb(u0)} \\times ${nb(q ** pas)} = ${nb(v)}$.`, `${s.nom} ${quandRang(s.p, i0, an0, k)} vaut $${nb(v)}$.`));
}

/* =========================================================
   EXPO_SUITE_EXPLICITE
========================================================= */

const EX_EXPLG = (L: string, i0: number, u: number, q: number, bon: string) =>
  expl(i0 === 0 ? "pour une suite géométrique qui commence au rang $0$ : $u_n = u_0 \\times q^n$." : "pour une suite géométrique qui commence au rang $1$ : $u_n = u_1 \\times q^{n-1}$.", "le rang est en EXPOSANT : on multiplie par $q$ une fois par étape.", `$${L}_${i0} = ${nb(u)}$ et $q = ${nb(q)}$.`, `${bon} ; on vérifie avec $${L}_${i0} = ${nb(u)}$.`);

function piegesExplG(L: string, i0: number, u: number, q: number) {
  const P = (e: string) => `$${L}_n = ${e}$`;
  const t = tauxDe(q);
  if (i0 === 0) return { bon: P(`${nb(u)} \\times ${nb(q)}^n`), pieges: [P(`${nb(u)} \\times ${nb(q)}^{n-1}`), P(`${nb(u)} \\times ${nb(q)} \\times n`), P(aff(u, t)), P(`${nb(q)} \\times ${nb(u)}^n`), ...(Math.abs(t) === 100 ? [] : [P(`${nb(u)} \\times ${nb(Math.abs(t) / 100)}^n`)])] };
  return { bon: P(`${nb(u)} \\times ${nb(q)}^{n-1}`), pieges: [P(`${nb(u)} \\times ${nb(q)}^n`), P(`${nb(u)} \\times ${nb(q)}^{n+1}`), P(`${nb(u)} \\times ${nb(q)} \\times (n - 1)`), P(`${nb(q)} \\times ${nb(u)}^{n-1}`)] };
}

function gExpl0(d: number): Q {
  const L = lettre();
  const q = d === 1 ? rc([2, 3, 1.5, 0.5]) : rc([1.05, 1.2, 0.8, 0.9, 1.03, 0.75, 2.5]);
  const u = d === 1 ? departExact(q, 3, 2, 500, true) : departExact(q, 3, 50, 5000);
  const { bon, pieges } = piegesExplG(L, 0, u, q);
  const text = rc([
    `${cadre()}Une suite géométrique $(${L}_n)$ a pour premier terme $${L}_0 = ${nb(u)}$ et pour raison $q = ${nb(q)}$. Pour tout entier naturel $n$ :`,
    `${cadre()}On a $${L}_0 = ${nb(u)}$ et ${relG(L, q)} pour tout entier naturel $n$. Quelle est l’expression de $${L}_n$ en fonction de $n$ ?`,
    `${cadre()}Les premiers termes d’une suite géométrique sont, à partir de $${L}_0$ : $${liste(plage(0, 3).map((j) => u * q ** j))}$. Quelle est l’expression de $${L}_n$ ?`,
  ]);
  return qcm4(text, bon, pieges, EX_EXPLG(L, 0, u, q, bon));
}

function gExpl1(d: number): Q {
  const L = lettre();
  const q = d === 2 ? rc([2, 3, 1.5, 0.5]) : rc([1.05, 1.2, 0.8, 0.9, 1.1, 0.75]);
  const u = departExact(q, 2, 10, 5000);
  const { bon, pieges } = piegesExplG(L, 1, u, q);
  const text = rc([
    `${cadre()}Une suite géométrique $(${L}_n)$, définie pour $n \\ge 1$, a pour premier terme $${L}_1 = ${nb(u)}$ et pour raison $q = ${nb(q)}$. Pour tout entier $n \\ge 1$ :`,
    `${cadre()}Attention, la suite commence au rang $1$ : $${L}_1 = ${nb(u)}$ et ${relG(L, q)} pour $n \\ge 1$. Quelle est l’expression de $${L}_n$ ?`,
    `${cadre()}Les termes d’une suite géométrique sont numérotés à partir de $1$ : $${L}_1 = ${nb(u)}$, $${L}_2 = ${nb(u * q)}$, $${L}_3 = ${nb(u * q * q)}$. Pour tout $n \\ge 1$ :`,
  ]);
  return qcm4(text, bon, pieges, EX_EXPLG(L, 1, u, q, bon));
}

function gExplContexte(_d: number): Q {
  const { s, q, u0, i0, an0 } = sitG(2);
  const L = lettre();
  const { bon, pieges } = piegesExplG(L, i0, u0, q);
  const text = `${situG(s, u0, q, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)} ${rc([`Quelle est l’expression de $${L}_n$ en fonction de $n$ ?`, `Pour tout entier $n \\ge ${i0}$, on a :`, `Quelle formule permet de calculer directement $${L}_n$ ?`])}`;
  return qcm4(text, bon, pieges, EX_EXPLG(L, i0, u0, q, bon));
}

function gExplCalcul(d: number): Q {
  const L = lettre();
  const q = qSimple(d);
  const k = randomInt(2, d === 1 ? 4 : 3);
  const a = departExact(q, k, 1, 3000, d === 1);
  const def = rc([`$${L}_n = ${nb(a)} \\times ${nb(q)}^n$`, `$${L}(n) = ${nb(a)} \\times ${nb(q)}^n$`]);
  return courte(
    rc([`${cadre()}Une suite est définie pour tout entier naturel $n$ par ${def}. Calcule $${L}_{${k}}$.`, `${cadre()}On définit, pour tout entier naturel $n$, ${def}. Que vaut $${L}_{${k}}$ ?`, `${cadre()}Soit la suite définie par ${def} pour $n \\ge 0$. Donne la valeur de $${L}_{${k}}$.`]),
    a * q ** k,
    expl("la forme explicite donne directement le terme de rang $n$.", `on remplace $n$ par $${k}$, puis on calcule la puissance AVANT de multiplier.`, `$${L}_{${k}} = ${nb(a)} \\times ${nb(q)}^{${k}} = ${nb(a)} \\times ${nb(q ** k)} = ${nb(a * q ** k)}$.`, `$${L}_{${k}} = ${nb(a * q ** k)}$.`)
  );
}

function gExplLire(d: number): Q {
  const L = lettre();
  const q = d === 1 ? rc([2, 3, 1.5, 0.5, 1.2]) : rc([1.05, 0.8, 0.9, 1.03, 0.75, 1.25]);
  let a = rc([5, 10, 20, 50, 100, 200, 500, 1000, 1500, 3000]);
  if (a === q) a = 40;
  const C = (x: number, y: number) => `$${L}_0 = ${nb(x)}$ et $q = ${nb(y)}$`;
  return qcm4(
    `${cadre()}${rc(["Une suite géométrique est définie, pour tout entier naturel $n$, par", "Pour tout entier naturel $n$, on pose", "On étudie la suite définie pour $n \\ge 0$ par"])} $${L}_n = ${nb(a)} \\times ${nb(q)}^n$. ${rc(["Quels sont son premier terme et sa raison ?", "Lis son premier terme et sa raison :", "On en déduit :"])}`,
    C(a, q),
    [C(q, a), C(arr(a * q), q), C(a, arr(Math.abs(q - 1))), C(a, arr(q * 100))],
    expl("$u_n = u_0 \\times q^n$ : le nombre devant est $u_0$, la base de la puissance est la raison.", "on remplace $n$ par $0$ pour retrouver $u_0$ ($q^0 = 1$).", `$${L}_0 = ${nb(a)} \\times 1 = ${nb(a)}$ et la base vaut $${nb(q)}$.`, `${C(a, q)}.`)
  );
}

/* =========================================================
   EXPO_SUITE_VARIATION
========================================================= */

const SENSG = ["croissante", "décroissante", "constante", "négative à partir d’un certain rang", "croissante puis décroissante"];
const sensG = (q: number) => (q > 1 ? "croissante" : q < 1 ? "décroissante" : "constante");
const EX_SENSG = (q: number, ou: string) =>
  expl("pour une suite géométrique à termes strictement positifs : croissante si $q > 1$, décroissante si $0 < q < 1$, constante si $q = 1$.", "on compare la raison à $1$ (et non à $0$).", `${ou} : $q = ${nb(q)}$${q > 1 ? " > 1" : q < 1 ? " < 1" : ""}.`, `la suite est ${sensG(q)}${q < 1 ? " : elle se rapproche de $0$ sans jamais devenir négative" : ""}.`);
const qcmSensG = (text: string, q: number, ou: string, canvas?: CanvasFigure) => qcm4(text, sensG(q), SENSG.filter((x) => x !== sensG(q)).slice(0, 4), EX_SENSG(q, ou), canvas);
const qSigne = () => {
  const t = rc(["+", "+", "-", "-", "1"]);
  return t === "1" ? 1 : t === "+" ? rc([1.02, 1.1, 1.5, 2, 3, 1.25, 1.05]) : rc([0.5, 0.8, 0.9, 0.95, 0.25, 0.75, 0.1]);
};

function gVarQ(_d: number): Q {
  const L = lettre();
  const q = qSigne();
  const u = rc([2, 5, 10, 40, 100, 250, 1000, 3000]);
  return qcmSensG(`${cadre()}${rc(["Une suite géométrique", "La suite géométrique"])} $(${L}_n)$, à termes strictement positifs, a pour premier terme $${L}_0 = ${nb(u)}$ et pour raison $q = ${nb(q)}$. ${rc(["Elle est :", "Quel est son sens de variation ?", "Cette suite est :"])}`, q, "la raison est donnée");
}

function gVarExpl(_d: number): Q {
  const L = lettre();
  const q = qSigne();
  const a = rc([3, 7, 20, 50, 120, 400, 2500]);
  return qcmSensG(`${cadre()}${rc(["Pour tout entier naturel $n$, on pose", "On définit, pour tout entier naturel $n$,", "Une suite est définie pour $n \\ge 0$ par"])} $${L}_n = ${nb(a)} \\times ${nb(q)}^n$. ${rc(["Cette suite est :", "Quel est son sens de variation ?"])}`, q, "la base de la puissance est la raison");
}

function gVarSituation(_d: number): Q {
  const { s, q, u0, i0, an0 } = sitG(2);
  const L = lettre();
  return qcmSensG(`${situG(s, u0, q, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)} ${rc([`La suite $(${L}_n)$ est :`, `Quel est le sens de variation de $(${L}_n)$ ?`, `Comment évolue la suite $(${L}_n)$ ?`])}`, q, "on traduit l’évolution en coefficient multiplicateur");
}

function gVarPiege(_d: number): Q {
  const L = lettre();
  const bas = rc([true, false]);
  const q = bas ? rc([0.5, 0.8, 0.9, 0.95, 0.75, 0.6]) : rc([1.01, 1.02, 1.05, 1.1]);
  const u = rc([50, 200, 1000, 5000]);
  const bon = bas ? "décroissante, car $0 < q < 1$" : "croissante, car $q > 1$";
  const pieges = bas
    ? ["croissante, car $q > 0$", `croissante, car $${L}_0 > 0$`, "constante, car $q$ est proche de $1$", "elle finira par devenir négative"]
    : ["constante, car $q$ est proche de $1$", "décroissante, car le taux est faible", "on ne peut pas savoir sans calculer d’autres termes", "croissante, car $q > 0$"];
  return qcm4(
    `${cadre()}La suite géométrique $(${L}_n)$ a pour premier terme $${L}_0 = ${nb(u)}$ et pour raison $q = ${nb(q)}$. ${rc(["Quel est son sens de variation, et pourquoi ?", "Quelle affirmation est juste ?", "Un élève hésite. Quelle réponse est correcte ?"])}`,
    bon,
    pieges,
    expl("pour une suite géométrique à termes positifs, on compare la raison à $1$.", "« $q > 0$ » ne suffit pas ; et une raison proche de $1$ n’est pas égale à $1$.", `$q = ${nb(q)}$ : $${liste([u, u * q, u * q * q])} \\ldots$`, `la suite est ${bas ? "décroissante (et reste positive)" : "croissante"}.`)
  );
}

/* =========================================================
   EXPO_SUITE_GRAPHIQUE
========================================================= */

function gGraphLireQ(_d: number): Q {
  const L = lettre();
  const sorte = rc([2, 3]);
  const ts = nuageNature(sorte);
  const q = arr(ts[1] / ts[0]);
  return courte(
    `${cadre()}${rc(["On a placé les points", "Le graphique montre les points", "Voici les points"])} $(n\\,;\\,${L}_n)$ d’une suite géométrique. ${rc(["Lis $" + L + "_0$ et $" + L + "_1$, puis donne la raison $q$.", "Quelle est la raison de cette suite ?", "Par quel nombre multiplie-t-on d’un point au suivant ?"])}`,
    q,
    expl("la raison d’une suite géométrique est le quotient de deux termes consécutifs.", "on lit deux ordonnées consécutives et on divise.", `$${L}_0 = ${nb(ts[0])}$ et $${L}_1 = ${nb(ts[1])}$, donc $q = \\dfrac{${nb(ts[1])}}{${nb(ts[0])}} = ${nb(q)}$.`, `$q = ${nb(q)}$.`),
    nuage(L, ts)
  );
}

const LIMITES = ["les termes se rapprochent de $0$", "les termes deviennent aussi grands que l’on veut", "les termes se rapprochent du premier terme", "les termes finissent par être négatifs", "les termes restent tous égaux"];

function gGraphConjecture(_d: number): Q {
  const L = lettre();
  const monte = rc([true, false]);
  const [u0, q] = monte ? rc([[1, 2], [2, 2], [1, 3], [4, 1.5], [1, 1.5]] as const) : rc([[32, 0.5], [40, 0.5], [27, 0.5], [30, 0.6], [24, 0.5]] as const);
  const ts = plage(0, 5).map((k) => u0 * q ** k).filter((y) => y <= 40);
  const bon = monte ? LIMITES[1] : LIMITES[0];
  return qcm4(
    `${cadre()}Le graphique montre les premiers termes d’une suite géométrique $(${L}_n)$ à termes positifs. ${rc(["Que peut-on conjecturer quand $n$ devient très grand ?", "Si l’on continue, comment se comportent les termes ?", "Quelle conjecture peut-on faire sur ses termes, pour $n$ très grand ?"])}`,
    bon,
    LIMITES.filter((x) => x !== bon),
    expl("si $q > 1$, les termes grandissent sans limite ; si $0 < q < 1$, ils se rapprochent de $0$ sans l’atteindre.", "on observe le nuage et on lit la raison.", `$q = \\dfrac{${nb(ts[1])}}{${nb(ts[0])}} = ${nb(q)}$.`, `${bon}.`),
    nuage(L, ts)
  );
}

function gGraphPoint(_d: number): Q {
  const L = lettre();
  const q = rc([2, 3, 0.5, 1.5]);
  const k = randomInt(1, 4);
  const a = departExact(q, k + 1, 2, 400, true);
  const f = (x: number) => a * q ** x;
  const P = (x: number, y: number) => `$(${nb(x)}\\,;\\,${nb(y)})$`;
  const pts: Array<[number, number]> = [[k, f(k + 1)], [k, a * q * k], [k + 1, f(k)], [k, a + q * k], [f(k), k]];
  const pieges = pts.filter(([x, y]) => !(Number.isInteger(x) && x >= 0 && Math.abs(f(x) - y) < 1e-9)).map(([x, y]) => P(x, y));
  return qcm4(
    `${cadre()}La suite $(${L}_n)$ est définie pour tout entier naturel $n$ par $${L}_n = ${nb(a)} \\times ${nb(q)}^n$. ${rc(["Quel point fait partie de sa représentation graphique ?", "Parmi ces points, lequel appartient au nuage des termes ?", "Quel point est un point $(n\\,;\\," + L + "_n)$ de la suite ?"])}`,
    P(k, f(k)),
    pieges,
    expl("la représentation graphique d’une suite est l’ensemble des points $(n\\,;\\,u_n)$.", "on calcule $u_n$ pour l’abscisse proposée.", `$${L}_{${k}} = ${nb(a)} \\times ${nb(q)}^{${k}} = ${nb(f(k))}$.`, `le point ${P(k, f(k))} appartient au nuage.`)
  );
}

/** Deux nuages sur le même graphique : lequel est géométrique ? */
function gGraphDeux(_d: number): Q {
  const r = rc([2, 3, 4]);
  const a0 = randomInt(1, 4);
  const arith = plage(0, 4).map((k) => a0 + r * k);
  const [g0, q] = rc([[1, 2], [2, 2], [1, 3], [32, 0.5], [16, 0.5]] as const);
  const geo = plage(0, 4).map((k) => g0 * q ** k).filter((y) => y <= 40);
  const geoEnA = rc([true, false]);
  const A = geoEnA ? geo : arith;
  const B = geoEnA ? arith : geo;
  const ymax = Math.ceil(Math.max(...A, ...B)) + 1;
  const canvas = {
    kind: "fonctionGraphique",
    titre: "Suite A (bleu) et suite B (rouge)",
    size: { width: 320, height: 260 },
    xmin: -1,
    xmax: 5,
    ymin: 0,
    ymax,
    grille: true,
    points: [...A.map((y, k) => ({ x: k, y, label: k === A.length - 1 ? "A" : undefined, couleur: "#2563eb" })), ...B.map((y, k) => ({ x: k, y, label: k === B.length - 1 ? "B" : undefined, couleur: "#dc2626" }))],
  } as CanvasFigure;
  const demandeGeo = rc([true, false]);
  const bon = (demandeGeo === geoEnA) ? "la suite A" : "la suite B";
  return qcm4(
    `${cadre()}Le graphique montre les premiers termes de deux suites : A (points bleus) et B (points rouges). L’une est arithmétique, l’autre géométrique. ${demandeGeo ? "Laquelle est géométrique ?" : "Laquelle est arithmétique ?"}`,
    bon,
    [bon === "la suite A" ? "la suite B" : "la suite A", "les deux", "aucune des deux", "on ne peut pas savoir sans les formules"],
    expl("points alignés (écart constant) : suite arithmétique ; points sur une courbe qui se creuse (quotient constant) : suite géométrique.", "on regarde lequel des deux nuages est aligné.", `A : $${liste(A)}$ ; B : $${liste(B)}$.`, `${bon} est ${demandeGeo ? "géométrique" : "arithmétique"}.`),
    canvas
  );
}

/* =========================================================
   EXPO_SUITE_INTERPRETER
========================================================= */

function gInterpTerme(_d: number): Q {
  const { s, q, u0, i0, an0 } = sitG(0);
  const L = lettre();
  const pas = randomInt(3, 10);
  const k = i0 + pas;
  const V = Math.round(u0 * q ** pas);
  const Q_ = (j: number) => `${cap(s.nom)} ${quandRang(s.p, i0, an0, j)} vaut environ $${nb(V)}$`;
  return qcm4(
    `${situG(s, u0, q, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)} On calcule $${L}_{${k}} \\approx ${nb(V)}$. ${rc(["Que signifie ce résultat ?", "Comment interpréter ce nombre ?", "Que représente ce nombre ?"])}`,
    Q_(k),
    [Q_(k + 1), Q_(k - 1), `${cap(s.ce)} a ${q > 1 ? "augmenté" : "diminué"} d’environ $${nb(V)}$ depuis le départ`, Q_(k + 2)],
    expl(`l’énoncé fixe le rang de départ : $${L}_${i0}$ correspond ${moment0(s.p, i0, an0)}.`, `on traduit l’indice $${k}$ en moment.`, `$${L}_{${k}} = ${nb(u0)} \\times ${nb(q)}^{${pas}} \\approx ${nb(V)}$.`, `${Q_(k)} (une valeur totale, pas une augmentation).`)
  );
}

function gInterpRang(_d: number): Q {
  const { s, q, u0, an0 } = sitG(1, (x) => x.p.an);
  const i0 = rc([0, 1]);
  const L = lettre();
  const k = i0 + randomInt(2, 15);
  const debut = `${situG(s, u0, q, i0, an0)} ${noteSuite(L, s.nom, s.p, i0, an0)}`;
  if (randomInt(1, 2) === 1)
    return courte(`${debut} ${rc([`À quelle année correspond $${L}_{${k}}$ ?`, `$${L}_{${k}}$ donne ${s.nom} en quelle année ?`])}`, an0 + k - i0, expl(`$${L}_${i0}$ correspond à ${an0}.`, `de $${L}_${i0}$ à $${L}_{${k}}$, il y a $${k - i0}$ ans.`, `$${an0} + ${k - i0} = ${an0 + k - i0}$.`, `$${L}_{${k}}$ correspond à ${an0 + k - i0}.`));
  return courte(`${debut} ${rc([`Quel est l’indice $n$ du terme qui donne ${s.nom} en ${an0 + k - i0} ?`, `Quel terme $${L}_n$ correspond à ${an0 + k - i0} ? Donne $n$.`])}`, k, expl(`$${L}_${i0}$ correspond à ${an0}.`, "on compte les années écoulées, puis on ajoute le rang de départ.", `$${an0 + k - i0} - ${an0} + ${i0} = ${k}$.`, `c’est $${L}_{${k}}$.`));
}

function gInterpQ(_d: number): Q {
  const s = rc(SITG.filter((x) => x.q.some((q) => q !== 2 && q !== 3 && q !== 0.5)));
  const q = rc(s.q.filter((x) => x !== 2 && x !== 3 && x !== 0.5));
  const u0 = departExact(q, 1, s.u[0], s.u[1], s.entier);
  const an0 = annee0();
  const L = lettre();
  const t = tauxDe(q);
  const per_ = s.p.chaque.charAt(0).toLowerCase() + s.p.chaque.slice(1);
  const ev = (sens: string, x: string) => `${s.nom} ${sens} de $${x}$ ${per_}`;
  return qcm4(
    `${noteSuite(L, s.nom, s.p, 0, an0)} Une étude donne $${L}_n = ${nb(u0)} \\times ${nb(q)}^n$ pour tout entier naturel $n$. ${rc([`Que signifie le nombre $${nb(q)}$ ?`, `Dans cette formule, que traduit le nombre $${nb(q)}$ ?`, `Quel est le sens du nombre $${nb(q)}$ ?`])}`,
    ev(t > 0 ? "augmente" : "diminue", pc(Math.abs(t))),
    [ev(t > 0 ? "diminue" : "augmente", pc(Math.abs(t))), ev("augmente", pc(q)), ev("augmente", pc(arr(q * 100))), ev(t > 0 ? "augmente" : "diminue", nb(q))],
    expl("$q = 1 + \\dfrac{t}{100}$ : la raison est le coefficient multiplicateur de chaque étape.", "on retire $1$ à la raison et on l’écrit en pourcentage.", `$${nb(q)} - 1 = ${nb(t / 100)}$, soit $${pc(t)}$.`, `${ev(t > 0 ? "augmente" : "diminue", pc(Math.abs(t)))}.`)
  );
}

function gInterpSeuil(_d: number): Q {
  const monte = rc([true, false]);
  const { s, q, u0, an0 } = sitG(0, (x) => x.q.some((v) => (monte ? v >= 1.5 : v <= 0.5)));
  const qq = rc(s.q.filter((v) => (monte ? v >= 1.5 : v <= 0.5)));
  const m = randomInt(3, monte ? 6 : 5);
  const u = departExact(qq, m, s.u[0], s.u[1], s.entier);
  const L = lettre();
  const um1 = u * qq ** (m - 1);
  const um = u * qq ** m;
  const S = arr((um1 + um) / 2);
  const debut = `${situG(s, u, qq, 0, an0)} ${noteSuite(L, s.nom, s.p, 0, an0)}`;
  const ex = expl(`on cherche le premier rang $n$ tel que $${L}_n ${monte ? ">" : "<"} ${nb(S)}$.`, "on calcule les termes un à un (ou on teste avec la formule $u_n = u_0 \\times q^n$).", `$${L}_{${m - 1}} = ${nb(um1)}$ et $${L}_{${m}} = ${nb(um)}$.`, `c’est à partir du rang $${m}$${s.p.an ? `, c’est-à-dire en ${an0 + m}` : ""}.`);
  if (s.p.an && randomInt(1, 2) === 1)
    return courte(`${debut} ${monte ? `En quelle année la valeur $${nb(S)}$ est-elle dépassée pour la première fois ?` : `En quelle année passe-t-on pour la première fois sous la valeur $${nb(S)}$ ?`}`, an0 + m, ex);
  return courte(`${debut} ${rc([`À partir de quel rang $n$ a-t-on $${L}_n ${monte ? ">" : "<"} ${nb(S)}$ ?`, `Quel est le plus petit entier $n$ tel que $${L}_n ${monte ? ">" : "<"} ${nb(S)}$ ?`])}`, m, ex);
}

function gInterpGlobal(_d: number): Q {
  const { s, an0 } = sitG(0, (x) => x.p.an && x.i1 === true);
  const q = rc([1.1, 1.2, 1.5, 0.8, 0.9, 0.5]);
  const k = 2;
  const u0 = departExact(q, k, s.u[0], s.u[1], s.entier);
  const L = lettre();
  const g = arr((q ** k - 1) * 100);
  return courte(
    `${situG(s, u0, q, 0, an0)} ${noteSuite(L, s.nom, s.p, 0, an0)} ${rc([`Entre ${an0} et ${an0 + k}, de quel pourcentage ${s.nom} a-t-il évolué ?`, `Quel est le taux d’évolution global entre $${L}_0$ et $${L}_{${k}}$ ?`])} (Donne le nombre en %, négatif s’il s’agit d’une baisse.)`.replace("a-t-il évolué", "a évolué"),
    g,
    expl("deux évolutions successives se multiplient : le coefficient global est $q^2$.", "on calcule $q^2$, puis on retire $1$.", `$${nb(q)}^2 = ${nb(q * q)}$, et $${nb(q * q)} - 1 = ${nb(arr(q * q - 1))}$.`, `l’évolution globale est de $${pc(g)}$ (et non $${pc(arr(2 * (q - 1) * 100))}$).`)
  );
}

/* ---------- Gabarits et fusion ---------- */


const NOTION: Record<string, string> = {
  expo_suite_reconnaitre: "expo_suite_geometrique",
  expo_suite_recurrence: "expo_suite_geometrique",
  expo_suite_taux: "expo_suite_geometrique",
  expo_suite_terme_rang: "expo_suite_geometrique",
  expo_suite_explicite: "expo_suite_terme_general",
  expo_suite_variation: "expo_suite_terme_general",
  expo_suite_graphique: "expo_suite_terme_general",
  expo_suite_interpreter: "expo_suite_terme_general",
};

export const GENS_GEO: Record<string, Gen> = {
  gRaisonListe, gNatureListe, gNatureSituation, gQuotient, aFormeNature: GENS_ARITH.aFormeNature,
  gRelationSituation, gRelationListe, gSuivant, gDerouler, gPrecedent, gRecContexte,
  gTauxVersQ, gQVersTaux, gTauxMots, gTauxDeuxTermes, gTauxGlobal,
  gTerme0, gTerme1, gTermeAutre, gTermeCalcul, gTermeContexte,
  gExpl0, gExpl1, gExplContexte, gExplCalcul, gExplLire,
  gVarQ, gVarExpl, gVarSituation, gVarPiege,
  aGraphNature: GENS_ARITH.aGraphNature, gGraphLireQ, gGraphConjecture, gGraphPoint, gGraphDeux,
  gInterpTerme, gInterpRang, gInterpQ, gInterpSeuil, gInterpGlobal,
};

const H_REC = "Géométrique : on MULTIPLIE toujours par le même nombre (la raison q).";
const H_RECU = "Le terme SUIVANT s’obtient en multipliant le terme actuel par q.";
const H_TAUX = "Hausse de t % : q = 1 + t/100 ; baisse de t % : q = 1 − t/100.";
const H_TERME = "On multiplie par q autant de fois qu’il y a de PAS (attention au rang de départ).";
const H_EXPL = "Rang 0 : uₙ = u₀ × qⁿ ; rang 1 : uₙ = u₁ × qⁿ⁻¹.";
const H_VAR = "Compare la raison à 1, pas à 0.";
const H_GRA = "Points alignés : arithmétique ; points qui se creusent : géométrique.";
const H_INT = "L’indice compte les étapes depuis le départ ; q traduit un pourcentage.";

const LIGNES: Ligne[] = [
  ["expo_suite_reconnaitre", 1, "gRaisonListe", H_REC],
  ["expo_suite_reconnaitre", 1, "gNatureListe", H_REC],
  ["expo_suite_reconnaitre", 1, "gNatureSituation", H_REC],
  ["expo_suite_reconnaitre", 2, "gRaisonListe", H_REC],
  ["expo_suite_reconnaitre", 2, "gNatureListe", H_REC],
  ["expo_suite_reconnaitre", 2, "gNatureSituation", H_REC],
  ["expo_suite_reconnaitre", 2, "gQuotient", H_REC],
  ["expo_suite_reconnaitre", 3, "gQuotient", H_REC],
  ["expo_suite_reconnaitre", 3, "aFormeNature", H_REC],
  ["expo_suite_reconnaitre", 3, "gNatureSituation", H_REC],
  ["expo_suite_reconnaitre", 3, "gRaisonListe", H_REC],

  ["expo_suite_recurrence", 1, "gSuivant", H_RECU],
  ["expo_suite_recurrence", 1, "gRelationSituation", H_RECU],
  ["expo_suite_recurrence", 1, "gDerouler", H_RECU],
  ["expo_suite_recurrence", 2, "gRelationSituation", H_RECU],
  ["expo_suite_recurrence", 2, "gRelationListe", H_RECU],
  ["expo_suite_recurrence", 2, "gDerouler", H_RECU],
  ["expo_suite_recurrence", 2, "gRecContexte", H_RECU],
  ["expo_suite_recurrence", 2, "gPrecedent", "Pour reculer d’un rang, on divise par q."],
  ["expo_suite_recurrence", 3, "gPrecedent", "Pour reculer d’un rang, on divise par q."],
  ["expo_suite_recurrence", 3, "gRecContexte", H_RECU],
  ["expo_suite_recurrence", 3, "gDerouler", H_RECU],
  ["expo_suite_recurrence", 3, "gRelationSituation", H_RECU],

  ["expo_suite_taux", 1, "gTauxVersQ", H_TAUX],
  ["expo_suite_taux", 1, "gTauxMots", H_TAUX],
  ["expo_suite_taux", 1, "gQVersTaux", H_TAUX],
  ["expo_suite_taux", 2, "gTauxVersQ", H_TAUX],
  ["expo_suite_taux", 2, "gQVersTaux", H_TAUX],
  ["expo_suite_taux", 2, "gTauxMots", H_TAUX],
  ["expo_suite_taux", 2, "gTauxDeuxTermes", H_TAUX],
  ["expo_suite_taux", 3, "gQVersTaux", H_TAUX],
  ["expo_suite_taux", 3, "gTauxDeuxTermes", H_TAUX],
  ["expo_suite_taux", 3, "gTauxGlobal", "Deux hausses successives se MULTIPLIENT."],
  ["expo_suite_taux", 3, "gTauxVersQ", H_TAUX],

  ["expo_suite_terme_rang", 1, "gTerme0", H_TERME],
  ["expo_suite_terme_rang", 1, "gExplCalcul", H_TERME],
  ["expo_suite_terme_rang", 1, "gSuivant", H_TERME],
  ["expo_suite_terme_rang", 2, "gTerme0", H_TERME],
  ["expo_suite_terme_rang", 2, "gTerme1", H_TERME],
  ["expo_suite_terme_rang", 2, "gTermeCalcul", H_TERME],
  ["expo_suite_terme_rang", 2, "gTermeContexte", H_TERME],
  ["expo_suite_terme_rang", 3, "gTerme1", H_TERME],
  ["expo_suite_terme_rang", 3, "gTermeAutre", H_TERME],
  ["expo_suite_terme_rang", 3, "gTermeContexte", H_TERME],
  ["expo_suite_terme_rang", 3, "gTermeCalcul", H_TERME],

  ["expo_suite_explicite", 1, "gExpl0", H_EXPL],
  ["expo_suite_explicite", 1, "gExplCalcul", H_EXPL],
  ["expo_suite_explicite", 1, "gExplLire", H_EXPL],
  ["expo_suite_explicite", 2, "gExpl0", H_EXPL],
  ["expo_suite_explicite", 2, "gExpl1", H_EXPL],
  ["expo_suite_explicite", 2, "gExplContexte", H_EXPL],
  ["expo_suite_explicite", 2, "gExplLire", H_EXPL],
  ["expo_suite_explicite", 3, "gExpl1", H_EXPL],
  ["expo_suite_explicite", 3, "gExplContexte", H_EXPL],
  ["expo_suite_explicite", 3, "gExpl0", H_EXPL],
  ["expo_suite_explicite", 3, "gExplCalcul", H_EXPL],

  ["expo_suite_variation", 1, "gVarQ", H_VAR],
  ["expo_suite_variation", 1, "gVarSituation", H_VAR],
  ["expo_suite_variation", 1, "gVarExpl", H_VAR],
  ["expo_suite_variation", 2, "gVarExpl", H_VAR],
  ["expo_suite_variation", 2, "gVarSituation", H_VAR],
  ["expo_suite_variation", 2, "gVarQ", H_VAR],
  ["expo_suite_variation", 3, "gVarPiege", H_VAR],
  ["expo_suite_variation", 3, "gVarSituation", H_VAR],
  ["expo_suite_variation", 3, "gVarExpl", H_VAR],

  ["expo_suite_graphique", 1, "aGraphNature", H_GRA],
  ["expo_suite_graphique", 1, "gGraphLireQ", H_GRA],
  ["expo_suite_graphique", 1, "gGraphDeux", H_GRA],
  ["expo_suite_graphique", 2, "gGraphDeux", H_GRA],
  ["expo_suite_graphique", 2, "gGraphLireQ", H_GRA],
  ["expo_suite_graphique", 2, "gGraphConjecture", H_GRA],
  ["expo_suite_graphique", 2, "aGraphNature", H_GRA],
  ["expo_suite_graphique", 3, "gGraphConjecture", H_GRA],
  ["expo_suite_graphique", 3, "gGraphPoint", H_GRA],
  ["expo_suite_graphique", 3, "gGraphDeux", H_GRA],
  ["expo_suite_graphique", 3, "aGraphNature", H_GRA],

  ["expo_suite_interpreter", 1, "gInterpRang", H_INT],
  ["expo_suite_interpreter", 1, "gInterpQ", H_INT],
  ["expo_suite_interpreter", 1, "gInterpTerme", H_INT],
  ["expo_suite_interpreter", 2, "gInterpTerme", H_INT],
  ["expo_suite_interpreter", 2, "gInterpQ", H_INT],
  ["expo_suite_interpreter", 2, "gInterpRang", H_INT],
  ["expo_suite_interpreter", 2, "gInterpGlobal", "Deux évolutions successives se multiplient."],
  ["expo_suite_interpreter", 3, "gInterpSeuil", H_INT],
  ["expo_suite_interpreter", 3, "gInterpTerme", H_INT],
  ["expo_suite_interpreter", 3, "gInterpGlobal", "Deux évolutions successives se multiplient."],
];

export const renfortSuitesGeometriques: TutorBankItemV4[] = fabriquer("premiere_suites_geo_renfort", NOTION, GENS_GEO, LIGNES, "geometrique");
