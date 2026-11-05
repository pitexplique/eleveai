// RÉPÉTITION DE n ≤ 4 ÉPREUVES DE BERNOULLI, PROGRAMME DE PREMIÈRE SPÉ (05/11/2026) :
// la banque s'arrêtait à deux épreuves (`pc_succession`).

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, entre, expl, fabrique, fr, nL, qcm, un } from "../../lycee-commun";

const tpl = fabrique("premiere-spe", "probabilites_conditionnelles", "1s_");

type Ctx = { qui: string; ev: string };
const CTX: Ctx[] = [
  { qui: "Une basketteuse", ev: "réussit un lancer franc" },
  { qui: "Un archer", ev: "touche la cible" },
  { qui: "Une machine", ev: "fabrique une pièce sans défaut" },
  { qui: "Un semencier", ev: "obtient une graine qui germe" },
  { qui: "Une plateforme", ev: "reçoit une réponse à un message" },
  { qui: "Un candidat qui répond au hasard", ev: "trouve la bonne réponse à une question" },
  { qui: "Une équipe de secours", ev: "repère un signal de détresse lors d'une sortie" },
  { qui: "Un vétérinaire", ev: "trouve un animal vacciné" },
  { qui: "Un biologiste", ev: "observe une mutation sur une cellule" },
  { qui: "Une joueuse d'échecs", ev: "gagne une partie" },
  { qui: "Un commercial", ev: "signe un contrat à un rendez-vous" },
  { qui: "Un technicien", ev: "trouve un capteur en panne" },
  { qui: "Une pharmacienne", ev: "reçoit une ordonnance renouvelable" },
  { qui: "Un guide", ev: "aperçoit un dauphin lors d'une sortie en mer" },
  { qui: "Une gardienne de handball", ev: "arrête un tir" },
  { qui: "Un livreur", ev: "trouve le client chez lui" },
];
const PROBAS = [0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9];
/** Énoncé : le contexte, la probabilité, le nombre de répétitions. */
const INTRO = (c: Ctx, p: number, n: number) => `${c.qui} ${c.ev} (un succès) avec la probabilité $${nL(p)}$. On répète ${n} fois cette épreuve, ${un(["de façon indépendante", "dans les mêmes conditions et de façon indépendante", "chaque essai étant indépendant des autres"])}.`;
const q_ = (p: number) => Math.round((1 - p) * 10) / 10;
const arr = (x: number) => Math.round(x * 1e6) / 1e6;
const C = (n: number, k: number) => {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return r;
};
const exact = (n: number, k: number, p: number) => arr(C(n, k) * p ** k * q_(p) ** (n - k));

/** L'arbre pondéré (deux ou trois niveaux) : il donne les branches, jamais le résultat. */
function arbre(p: number, n: number): CanvasFigure {
  const niveau = (i: number): any[] => [
    { label: "S", proba: fr(p), ...(i < n ? { enfants: niveau(i + 1) } : {}) },
    { label: "S̄", proba: fr(q_(p)), ...(i < n ? { enfants: niveau(i + 1) } : {}) },
  ];
  return { kind: "arbre_proba", racineEnfants: niveau(1) } as CanvasFigure;
}
const DEF = "dans une répétition d'épreuves de Bernoulli indépendantes, la probabilité d'un chemin est le produit des probabilités de ses branches.";
const DEF_C = "l'évènement contraire de « au moins un succès » est « aucun succès » ; et $P(A) = 1 - P(\\overline{A})$.";
const puis = (x: number, e: number) => `${nL(x)}^{${e}}`;
const prod = (p: number, q: number, k: number, m: number) => [k ? (k === 1 ? nL(p) : puis(p, k)) : "", m ? (m === 1 ? nL(q) : puis(q, m)) : ""].filter(Boolean).join(" \\times ");

export const bernoulliRepetitionBank: TutorBankItemV4[] = [
  /* ===== pc_bernoulli_repetition ===== */
  tpl("pc_bernoulli_repetition", 1, 1, "Tous les succès : multiplie la probabilité de succès autant de fois qu'il y a d'épreuves.", () => {
    const c = un(CTX);
    const p = un(PROBAS);
    const n = entre(2, 3);
    const tous = un([true, false]);
    const v = arr((tous ? p : q_(p)) ** n);
    return court(`${INTRO(c, p, n)} ${tous ? un(["Quelle est la probabilité d'obtenir que des succès ?", "Quelle est la probabilité que toutes les épreuves soient des succès ?"]) : un(["Quelle est la probabilité de n'obtenir aucun succès ?", "Quelle est la probabilité que toutes les épreuves soient des échecs ?"])}`, v, expl(DEF, "un seul chemin de l'arbre convient.", `$${puis(tous ? p : q_(p), n)} = ${nL(v)}$.`, `la probabilité vaut $${nL(v)}$.`), arbre(p, n));
  }),
  tpl("pc_bernoulli_repetition", 2, 1, "Écris les chemins, ou compte-les sur l'arbre.", () => {
    const c = un(CTX);
    const p = un(PROBAS);
    const n = entre(2, 4);
    const k = entre(1, n - 1);
    return court(`${INTRO(c, p, n)} ${un([`Combien de chemins de l'arbre comportent exactement ${k} succès ?`, `Sur l'arbre, combien de chemins mènent à exactement ${k} succès ?`, `Combien de chemins correspondent à exactement ${k} succès ?`])}`, C(n, k), expl("un chemin est une suite de succès $S$ et d'échecs $\\overline{S}$.", `on compte les façons de placer ${k} succès parmi ${n} épreuves.`, `il y en a $${C(n, k)}$.`, `$${C(n, k)}$ chemins conviennent.`), n <= 3 ? arbre(p, n) : undefined);
  }),
  tpl("pc_bernoulli_repetition", 3, 2, "Deux chemins : succès puis échec, et échec puis succès.", () => {
    const c = un(CTX);
    const p = un(PROBAS);
    const v = exact(2, 1, p);
    return court(`${INTRO(c, p, 2)} ${un(["Quelle est la probabilité d'obtenir exactement 1 succès ?", "Calcule la probabilité d'avoir exactement 1 succès.", "Avec quelle probabilité obtient-on exactement 1 succès ?"])}`, v, expl(DEF, "deux chemins contiennent exactement un succès.", `$2 \\times ${nL(p)} \\times ${nL(q_(p))} = ${nL(v)}$.`, `la probabilité vaut $${nL(v)}$.`), arbre(p, 2));
  }),
  tpl("pc_bernoulli_repetition", 4, 2, "Compte les chemins qui conviennent, multiplie par la probabilité d'un chemin.", () => {
    const c = un(CTX);
    const p = un(PROBAS);
    const k = entre(1, 2);
    const v = exact(3, k, p);
    return court(`${INTRO(c, p, 3)} ${un([`Quelle est la probabilité d'obtenir exactement ${k} succès ?`, `Calcule la probabilité d'avoir exactement ${k} succès.`, `Avec quelle probabilité obtient-on exactement ${k} succès ?`])}`, v, expl(DEF, `$${C(3, k)}$ chemins contiennent exactement ${k} succès, et ils ont tous la même probabilité.`, `$${C(3, k)} \\times ${prod(p, q_(p), k, 3 - k)} = ${nL(v)}$.`, `la probabilité vaut $${nL(v)}$.`), arbre(p, 3));
  }),
  tpl("pc_bernoulli_repetition", 5, 3, "Sur 4 épreuves, l'arbre est grand : compte les chemins par calcul.", () => {
    const c = un(CTX);
    const p = un(PROBAS);
    const k = entre(1, 3);
    const v = exact(4, k, p);
    return court(`${INTRO(c, p, 4)} ${un([`Quelle est la probabilité d'obtenir exactement ${k} succès ?`, `Calcule la probabilité d'avoir exactement ${k} succès.`, `Avec quelle probabilité obtient-on exactement ${k} succès ?`])}`, v, expl(DEF, `$${C(4, k)}$ chemins contiennent exactement ${k} succès.`, `$${C(4, k)} \\times ${prod(p, q_(p), k, 4 - k)} = ${nL(v)}$.`, `la probabilité vaut $${nL(v)}$.`));
  }),
  tpl("pc_bernoulli_repetition", 6, 3, "Nombre de chemins × probabilité d'un chemin : le produit doit contenir autant de facteurs que d'épreuves.", () => {
    const c = un(CTX);
    const p = un(PROBAS);
    const n = entre(3, 4);
    const k = entre(1, n - 1);
    const q = q_(p);
    const e = (m: number, a: number, b: number) => `$${m === 1 ? "" : `${m} \\times `}${prod(p, q, a, b)}$`;
    const j = e(C(n, k), k, n - k);
    return qcm(`${INTRO(c, p, n)} ${un([`Quel calcul donne la probabilité d'obtenir exactement ${k} succès ?`, `Quelle écriture donne la probabilité d'avoir exactement ${k} succès ?`])}`, j, [e(1, k, n - k), e(n, k, n - k), e(C(n, k), n - k, k), e(C(n, k), k, n - k + 1), e(C(n, k) + 1, k, n - k)], expl(DEF, `$${C(n, k)}$ chemins contiennent ${k} succès et ${n - k} échecs.`, `chaque chemin a pour probabilité $${prod(p, q, k, n - k)}$.`, `le calcul est ${j}.`));
  }),

  /* ===== pc_bernoulli_au_moins_un ===== */
  tpl("pc_bernoulli_au_moins_un", 1, 1, "Le contraire de « au moins un » est « aucun ».", () => {
    const c = un(CTX);
    const p = un(PROBAS);
    const n = entre(2, 4);
    return qcm(`${INTRO(c, p, n)} ${un(["Quel est l'évènement contraire de « obtenir au moins un succès » ?", "Quel évènement est le contraire de « au moins un succès » ?", "Pour « au moins un succès », quel est l'évènement contraire ?"])}`, "N'obtenir aucun succès", ["Obtenir exactement un succès", "N'obtenir que des succès", "Obtenir au moins un échec"], expl(DEF_C, "on cherche ce qui reste quand « au moins un succès » n'est pas réalisé.", "il ne reste que le chemin formé uniquement d'échecs.", "le contraire est « aucun succès »."));
  }),
  tpl("pc_bernoulli_au_moins_un", 2, 1, "« Aucun succès » : échec à chaque épreuve.", () => {
    const c = un(CTX);
    const p = un(PROBAS);
    const n = entre(2, 4);
    const v = arr(q_(p) ** n);
    return court(`${INTRO(c, p, n)} ${un(["Quelle est la probabilité de n'obtenir aucun succès ?", "Calcule la probabilité que l'évènement ne se produise jamais.", "Avec quelle probabilité n'a-t-on aucun succès ?"])}`, v, expl("la probabilité d'échec est $1 - p$ ; les épreuves sont indépendantes.", "un seul chemin : échec à chaque épreuve.", `$${puis(q_(p), n)} = ${nL(v)}$.`, `la probabilité vaut $${nL(v)}$.`), n <= 3 ? arbre(p, n) : undefined);
  }),
  tpl("pc_bernoulli_au_moins_un", 3, 2, "Passe par le contraire : 1 − P(aucun succès).", () => {
    const c = un(CTX);
    const p = un(PROBAS);
    const n = entre(2, 3);
    const v = arr(1 - q_(p) ** n);
    return court(`${INTRO(c, p, n)} ${un(["Quelle est la probabilité d'obtenir au moins un succès ?", "Calcule la probabilité d'avoir au moins un succès.", "Avec quelle probabilité obtient-on au moins un succès ?"])}`, v, expl(DEF_C, "on calcule d'abord la probabilité de n'avoir aucun succès.", `$1 - ${puis(q_(p), n)} = ${nL(v)}$.`, `la probabilité vaut $${nL(v)}$.`), arbre(p, n));
  }),
  tpl("pc_bernoulli_au_moins_un", 4, 2, "Sur 4 épreuves aussi : 1 − P(aucun succès), sans dessiner tout l'arbre.", () => {
    const c = un(CTX);
    const p = un(PROBAS);
    const v = arr(1 - q_(p) ** 4);
    return court(`${INTRO(c, p, 4)} ${un(["Quelle est la probabilité d'obtenir au moins un succès ?", "Sans dessiner tout l'arbre, calcule la probabilité d'avoir au moins un succès.", "Avec quelle probabilité obtient-on au moins un succès ?"])}`, v, expl(DEF_C, "un seul chemin correspond à « aucun succès ».", `$1 - ${puis(q_(p), 4)} = ${nL(v)}$.`, `la probabilité vaut $${nL(v)}$.`));
  }),
  tpl("pc_bernoulli_au_moins_un", 5, 3, "« Au moins 2 » : 1 − P(0 succès) − P(1 succès).", () => {
    const c = un(CTX);
    const p = un(PROBAS);
    const n = entre(3, 4);
    const v = arr(1 - q_(p) ** n - n * p * q_(p) ** (n - 1));
    return court(`${INTRO(c, p, n)} ${un(["Quelle est la probabilité d'obtenir au moins 2 succès ?", "Calcule la probabilité d'avoir au moins 2 succès.", "Avec quelle probabilité obtient-on au moins 2 succès ?"])}`, v, expl("le contraire de « au moins 2 succès » est « 0 ou 1 succès ».", `on calcule $P(0)$ et $P(1)$, avec $${n}$ chemins pour un seul succès.`, `$1 - ${puis(q_(p), n)} - ${n} \\times ${prod(p, q_(p), 1, n - 1)} = ${nL(v)}$.`, `la probabilité vaut $${nL(v)}$.`));
  }),
  tpl("pc_bernoulli_au_moins_un", 6, 3, "Teste n = 1, 2, 3, 4 : calcule 1 − (1 − p)ⁿ.", () => {
    const c = un(CTX);
    for (;;) {
      const p = un(PROBAS);
      const s = un([0.5, 0.6, 0.7, 0.75, 0.8, 0.9, 0.95]);
      const v = [1, 2, 3, 4].map((n) => 1 - q_(p) ** n);
      const n = v.findIndex((x) => x >= s) + 1;
      if (n < 2) continue;
      return court(`${c.qui} ${c.ev} (un succès) avec la probabilité $${nL(p)}$, à chaque épreuve indépendante. ${un([`Combien d'épreuves faut-il au minimum (entre 1 et 4) pour que la probabilité d'au moins un succès atteigne $${nL(s)}$ ?`, `À partir de combien d'épreuves (entre 1 et 4) la probabilité d'au moins un succès atteint-elle $${nL(s)}$ ?`])}`, n, expl(DEF_C, "on calcule $1 - (1 - p)^{n}$ pour $n = 1, 2, 3, 4$.", v.map((x, i) => `$n = ${i + 1}$ : $${nL(arr(x))}$`).join(" ; ") + ".", `il faut au moins $${n}$ épreuves.`));
    }
  }),
];
