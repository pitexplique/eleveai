// ─── Fiche d'exercices : répétition d'épreuves, calculer (1re) ────────────────
//                              20 exercices corrigés
//
// Chapitre « Phénomènes aléatoires » (BOP1AL) de première SANS spécialité,
// 28/09/2026, sur l'étalon `maths-premiere-auto-comparer.tsx`. Calculatrice
// autorisée.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/bernoulli.bank.ts`
// (notionId alea_bernoulli_calcul) : « Représenter par un arbre de
// probabilités la répétition de n épreuves aléatoires identiques et
// indépendantes de Bernoulli avec n ⩽ 4 afin de calculer des probabilités. »
// ⛔ n ⩽ 4, borne du programme. ⛔ Pas de loi binomiale, pas de coefficient
// binomial : on COMPTE les chemins sur l'arbre. Avec n = 4, on ne dessine pas
// les seize chemins : on passe par l'évènement contraire (exercices 11, 14,
// 16, 18).
//
// ⭐⭐ LE FIL : UN CHEMIN = UN PRODUIT ; PLUSIEURS CHEMINS = UNE SOMME ;
// « AU MOINS UN » = 1 − « AUCUN ».
// ⛔ LE PIÈGE CENTRAL : oublier que « exactement deux succès » compte
// PLUSIEURS chemins (exercices 3, 8, 9, 13, 17), et additionner des
// probabilités pour « au moins un » au lieu de passer par le contraire
// (exercices 4, 7, 14).
//
// ⭐ L'arbre à TROIS niveaux est dessiné ici (`arbreRepete`), pas par le canvas
// `arbre_proba` du coach : celui-ci n'a que trois colonnes (départ et deux
// niveaux), un troisième niveau se poserait sur le deuxième. Les chemins lus
// sont en ROUGE (`vu: true`), et chaque feuille porte sa probabilité.
//
// ⭐ Frédéric, 28/09 : des arbres partout, et des contextes d'économie,
// d'écologie, de sport, de nature, de PHYSIQUE (signal répété trois fois,
// exercice 10 ; guirlande de LED en série, exercice 15 ; relais redondants,
// exercice 18) et d'HISTOIRE-GÉO (élection, exercice 11 ; disettes d'un
// village médiéval, exercice 17). Le conteneur frigorifique contrôlé au port
// (exercice 14) est son exemple de classe. Les chiffres sont des MODÈLES
// arrondis, jamais présentés comme des données officielles.
// ⭐ PDF ≤ 12 pages : les dessins qui redisent le corrigé sont `ecranSeulement`.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-alea-bernoulli-calcul.mjs`.
//
// Micro-compétences : alea_bern_arbre (1, 5, 8, 9, 10, 13, 15, 17, 19, 20),
// alea_bern_calculer (2, 3, 5, 6, 8, 9, 10, 12, 13, 15, 16, 17, 19, 20),
// alea_bern_au_moins_un (4, 7, 9, 11, 12, 13, 14, 16, 17, 18, 19). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre, de, diagramme, tableau } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Une branche : `vu` la trace en rouge (le chemin lu dans le corrigé). */
type Branche = { label: string; proba: string; enfants?: Branche[]; vu?: boolean };

/**
 * L'arbre d'une RÉPÉTITION d'épreuves, jusqu'à trois niveaux (huit chemins).
 * SVG simple, texte NU. Même geste que le canvas du coach — étiquette d'un
 * nœud intérieur AU-DESSUS du nœud, feuille à droite — avec une colonne de
 * plus. Même cadre que `arbre()` : largeur minimale et défilement sur
 * téléphone, pas sur papier.
 * ⭐ Le script de recalcul RELIT les branches et les « → p » des feuilles.
 */
const arbreRepete = (racine: Branche[]) => {
  const COL = [14, 100, 186, 272];
  const PAS = 30;
  const HAUT = 20;
  type Place = { x: number; y: number; b: Branche; fils: Place[] };
  let rang = 0;
  const place = (b: Branche, d: number): Place => {
    const x = COL[d + 1];
    if (!b.enfants || b.enfants.length === 0) {
      const y = HAUT + (rang + 0.5) * PAS;
      rang += 1;
      return { x, y, b, fils: [] };
    }
    const fils = b.enfants.map((e) => place(e, d + 1));
    return { x, y: (fils[0].y + fils[fils.length - 1].y) / 2, b, fils };
  };
  const hauts = racine.map((b) => place(b, 0));
  const depart = { x: COL[0], y: (hauts[0].y + hauts[hauts.length - 1].y) / 2 };
  const traits: { de: { x: number; y: number }; p: Place }[] = [];
  const parcours = (origine: { x: number; y: number }, p: Place) => {
    traits.push({ de: origine, p });
    p.fils.forEach((f) => parcours(p, f));
  };
  hauts.forEach((p) => parcours(depart, p));
  const feuilles = traits.map((t) => t.p).filter((p) => p.fils.length === 0);
  const largeur = Math.ceil(Math.max(...feuilles.map((f) => f.x + 10 + f.b.label.length * 7.4)) + 6);
  const hauteur = HAUT * 2 + rang * PAS;
  return (
    <div className="mx-auto w-full max-w-[24rem] overflow-x-auto print:max-w-[14rem] print:overflow-visible">
      <div className="min-w-[22.5rem] rounded-xl border border-slate-200 bg-white p-2 print:min-w-0">
        <svg viewBox={`0 0 ${largeur} ${hauteur}`} className="block h-auto w-full" role="img" aria-label="Arbre d'une répétition d'épreuves">
          <circle cx={depart.x} cy={depart.y} r={3.5} fill="#0f172a" />
          {traits.map(({ de: o, p }, i) => (
            <g key={`t${i}`}>
              <line x1={o.x} y1={o.y} x2={p.x} y2={p.y} stroke={p.b.vu ? "#dc2626" : "#475569"} strokeWidth={p.b.vu ? 3 : 1.6} />
              <text x={(o.x + p.x) / 2} y={(o.y + p.y) / 2 - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#2563eb" stroke="white" strokeWidth="3" paintOrder="stroke">
                {p.b.proba}
              </text>
            </g>
          ))}
          {traits.map(({ p }, i) => {
            const feuille = p.fils.length === 0;
            return (
              <text
                key={`n${i}`}
                x={feuille ? p.x + 6 : p.x}
                y={feuille ? p.y + 4 : p.y - 8}
                textAnchor={feuille ? "start" : "middle"}
                fontSize="13"
                fontWeight="900"
                fill={p.b.vu ? "#dc2626" : "#0f172a"}
                stroke="white"
                strokeWidth="2.5"
                paintOrder="stroke"
              >
                {p.b.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export const exercicesAleaBernoulliCalculPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "alea-bernoulli-calcul",
  titre: "Répétition d'épreuves : calculer",
  accroche:
    "Vingt exercices pour représenter par un arbre la répétition de deux, trois ou quatre épreuves de Bernoulli, calculer la probabilité d'un chemin, compter les chemins qui donnent « exactement deux succès », et calculer « au moins un succès » par l'évènement contraire. Lancers francs, signal numérique, élection, conteneurs frigorifiques, guirlande de LED, disettes médiévales, relais de secours, éoliennes, tennis. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un arbre, un chemin, une somme de chemins, ou un évènement contraire.",
      rappel: [
        "On note $S$ le succès, de probabilité $p$, et $E$ l'échec (c'est $\\overline{S}$), de probabilité $1 - p$. À chaque épreuve, l'arbre recopie les mêmes branches.",
        "Un chemin, par exemple $SES$, a pour probabilité le PRODUIT : $p \\times (1 - p) \\times p$.",
        "Pour « exactement $k$ succès », on compte les chemins qui en ont $k$, et on additionne.",
        "« Au moins un succès » est le contraire de « aucun succès » : $P = 1 - (1 - p)^n$.",
      ],
      exercices: [
        {
          enonce: "On répète deux fois, de façon indépendante, une épreuve de Bernoulli de paramètre $p = 0{,}3$. Construire l'arbre pondéré.",
          correction:
            "Premier niveau : $S$ avec $0{,}3$, $E$ avec $1 - 0{,}3 = 0{,}7$.\nLes épreuves sont identiques et indépendantes : derrière $S$ comme derrière $E$, on recopie $S$ avec $0{,}3$ et $E$ avec $0{,}7$.\nL'arbre a $2 \\times 2 = 4$ chemins : $SS$, $SE$, $ES$, $EE$.\n⭐ Répétition indépendante : TOUTES les branches $S$ portent le même nombre $p$.",
          schema: arbre([
            { label: "S", proba: "0,3", enfants: [{ label: "S", proba: "0,3" }, { label: "E", proba: "0,7" }] },
            { label: "E", proba: "0,7", enfants: [{ label: "S", proba: "0,3" }, { label: "E", proba: "0,7" }] },
          ]),
          micros: ["alea_bern_arbre"],
        },
        {
          enonce: "Avec l'arbre de l'exercice 1, calculer la probabilité de deux succès, puis celle de deux échecs.",
          correction:
            "Deux succès : un seul chemin, $SS$. $P(SS) = 0{,}3 \\times 0{,}3 = 0{,}09$.\nDeux échecs : le chemin $EE$. $P(EE) = 0{,}7 \\times 0{,}7 = 0{,}49$.\n⚠️ Le piège : $0{,}3 + 0{,}3$. Le long d'un chemin, on MULTIPLIE.",
          schema: ecranSeulement(arbre([{ label: "S", proba: "0,3", enfants: [{ label: "S → 0,09", proba: "0,3" }, { label: "E", proba: "0,7" }] }, { label: "E", proba: "0,7", enfants: [{ label: "S", proba: "0,3" }, { label: "E → 0,49", proba: "0,7" }] }])),
          micros: ["alea_bern_calculer"],
        },
        {
          enonce: "Toujours avec $p = 0{,}3$ et deux épreuves : calculer la probabilité d'obtenir exactement un succès. Vérifier que les trois résultats (zéro, un, deux succès) font $1$.",
          correction:
            "Exactement un succès : DEUX chemins, $SE$ et $ES$.\n$P(SE) = 0{,}3 \\times 0{,}7 = 0{,}21$ et $P(ES) = 0{,}7 \\times 0{,}3 = 0{,}21$.\nOn additionne : $0{,}21 + 0{,}21 = 0{,}42$.\nVérification : $0{,}49 + 0{,}42 + 0{,}09 = 1$.\n⛔ Le piège : ne compter que $SE$ et répondre $0{,}21$. Le succès peut venir en premier OU en second.",
          schema: ecranSeulement(
            arbre([
              { label: "S", proba: "0,3", enfants: [{ label: "S", proba: "0,3" }, { label: "E → 0,21", proba: "0,7" }] },
              { label: "E", proba: "0,7", enfants: [{ label: "S → 0,21", proba: "0,3" }, { label: "E", proba: "0,7" }] },
            ]),
          ),
          micros: ["alea_bern_calculer"],
        },
        {
          enonce: "Toujours avec $p = 0{,}3$ et deux épreuves : calculer la probabilité d'obtenir au moins un succès, en passant par l'évènement contraire.",
          correction:
            "« Au moins un succès » : un ou deux succès. Son contraire : « aucun succès », c'est-à-dire le chemin $EE$.\n$P(EE) = 0{,}7^2 = 0{,}49$.\nDonc $P(\\text{au moins un succès}) = 1 - 0{,}49 = 0{,}51$.\n✔️ Par les chemins : $0{,}42 + 0{,}09 = 0{,}51$.\n⭐ Le contraire ne demande qu'UN chemin ; c'est ce qui le rend si pratique.",
          schema: ecranSeulement(arbre([{ label: "S", proba: "0,3", enfants: [{ label: "S", proba: "0,3" }, { label: "E", proba: "0,7" }] }, { label: "E", proba: "0,7", enfants: [{ label: "S", proba: "0,3" }, { label: "E → 0,49", proba: "0,7" }] }])),
          micros: ["alea_bern_au_moins_un"],
        },
        {
          enonce: "On lance trois fois une pièce équilibrée. Le succès est « pile ». Construire l'arbre, compter ses chemins, et donner la probabilité de chacun. Quelle est la probabilité d'obtenir exactement deux « pile » ?",
          correction:
            "Chaque lancer : $S$ (pile) avec $0{,}5$, $E$ (face) avec $0{,}5$. On recopie ces deux branches à chaque niveau.\nL'arbre a $2 \\times 2 \\times 2 = 8$ chemins, chacun de probabilité $0{,}5^3 = 0{,}125$.\nExactement deux « pile » : $SSE$, $SES$, $ESS$, soit trois chemins.\n$P = 3 \\times 0{,}125 = 0{,}375$.\n⭐ Quand $p = 0{,}5$, tous les chemins ont la même probabilité : il suffit de les compter.",
          schema: arbreRepete([
            { label: "S", proba: "0,5", vu: true, enfants: [
              { label: "S", proba: "0,5", vu: true, enfants: [{ label: "SSS → 0,125", proba: "0,5" }, { label: "SSE → 0,125", proba: "0,5", vu: true }] },
              { label: "E", proba: "0,5", vu: true, enfants: [{ label: "SES → 0,125", proba: "0,5", vu: true }, { label: "SEE → 0,125", proba: "0,5" }] },
            ] },
            { label: "E", proba: "0,5", vu: true, enfants: [
              { label: "S", proba: "0,5", vu: true, enfants: [{ label: "ESS → 0,125", proba: "0,5", vu: true }, { label: "ESE → 0,125", proba: "0,5" }] },
              { label: "E", proba: "0,5", enfants: [{ label: "EES → 0,125", proba: "0,5" }, { label: "EEE → 0,125", proba: "0,5" }] },
            ] },
          ]),
          micros: ["alea_bern_arbre", "alea_bern_calculer"],
        },
        {
          enonce: "On répète trois fois une épreuve de Bernoulli de paramètre $p = 0{,}4$. Calculer la probabilité de trois succès, puis celle de trois échecs.",
          correction:
            "Trois succès : le chemin $SSS$. $P = 0{,}4 \\times 0{,}4 \\times 0{,}4 = 0{,}4^3 = 0{,}064$.\nTrois échecs : le chemin $EEE$, avec $1 - p = 0{,}6$. $P = 0{,}6^3 = 0{,}216$.\n⚠️ Pour les échecs, on multiplie les $0{,}6$, pas les $0{,}4$.",
          schema: ecranSeulement(arbreRepete([{ label: "S", proba: "0,4", vu: true, enfants: [{ label: "S", proba: "0,4", vu: true, enfants: [{ label: "SSS → 0,064", proba: "0,4", vu: true }, { label: "SSE → 0,096", proba: "0,6" }] }, { label: "E", proba: "0,6", enfants: [{ label: "SES → 0,096", proba: "0,4" }, { label: "SEE → 0,144", proba: "0,6" }] }] }, { label: "E", proba: "0,6", vu: true, enfants: [{ label: "S", proba: "0,4", enfants: [{ label: "ESS → 0,096", proba: "0,4" }, { label: "ESE → 0,144", proba: "0,6" }] }, { label: "E", proba: "0,6", vu: true, enfants: [{ label: "EES → 0,144", proba: "0,4" }, { label: "EEE → 0,216", proba: "0,6", vu: true }] }] }])),
          micros: ["alea_bern_calculer"],
        },
        {
          enonce: "On lance trois fois un dé équilibré. Quelle est la probabilité d'obtenir au moins un $6$ ? Arrondir au centième.",
          figure: de([6]),
          correction:
            "Le succès : « obtenir $6$ », $p = \\dfrac{1}{6}$. L'échec : $\\dfrac{5}{6}$.\nContraire de « au moins un $6$ » : « aucun $6$ », le chemin $EEE$. $P(EEE) = \\left(\\dfrac{5}{6}\\right)^3 = \\dfrac{125}{216}$.\nDonc $P(\\text{au moins un } 6) = 1 - \\dfrac{125}{216} = \\dfrac{91}{216} \\approx 0{,}42$.\n⛔ Le piège : $\\dfrac{1}{6} + \\dfrac{1}{6} + \\dfrac{1}{6} = \\dfrac{1}{2}$. Ce calcul compte deux fois les lancers avec plusieurs $6$ : avec six lancers, il donnerait $1$, la certitude, ce qui est faux.",
          micros: ["alea_bern_au_moins_un"],
        },
        {
          enonce: "On répète trois fois une épreuve de Bernoulli de paramètre $p = 0{,}4$. Combien de chemins donnent exactement deux succès ? Calculer la probabilité d'exactement deux succès.",
          correction:
            "Les chemins avec deux $S$ et un $E$ : $SSE$, $SES$, $ESS$. Il y en a trois : l'échec peut être en première, deuxième ou troisième position.\nChacun a la même probabilité : $0{,}4 \\times 0{,}4 \\times 0{,}6 = 0{,}096$ (l'ordre des facteurs ne change rien).\n$P = 3 \\times 0{,}096 = 0{,}288$.\n⭐ Trois chemins, un seul calcul, multiplié par trois.",
          schema: ecranSeulement(
            arbreRepete([
              { label: "S", proba: "0,4", vu: true, enfants: [
                { label: "S", proba: "0,4", vu: true, enfants: [{ label: "SSS → 0,064", proba: "0,4" }, { label: "SSE → 0,096", proba: "0,6", vu: true }] },
                { label: "E", proba: "0,6", vu: true, enfants: [{ label: "SES → 0,096", proba: "0,4", vu: true }, { label: "SEE → 0,144", proba: "0,6" }] },
              ] },
              { label: "E", proba: "0,6", vu: true, enfants: [
                { label: "S", proba: "0,4", vu: true, enfants: [{ label: "ESS → 0,096", proba: "0,4", vu: true }, { label: "ESE → 0,144", proba: "0,6" }] },
                { label: "E", proba: "0,6", enfants: [{ label: "EES → 0,144", proba: "0,4" }, { label: "EEE → 0,216", proba: "0,6" }] },
              ] },
            ]),
          ),
          micros: ["alea_bern_arbre", "alea_bern_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Modéliser par une répétition, construire l'arbre, calculer, puis répondre par une phrase.",
      rappel: [
        "On nomme l'épreuve, le succès, $p$ et $n$. On justifie « identiques et indépendantes ».",
        "Exactement $k$ succès : on compte les chemins, tous de même probabilité, et on multiplie.",
        "Au moins un : $1 - (1 - p)^n$. Avec $n = 4$, on ne dessine pas les seize chemins : le contraire suffit.",
      ],
      exercices: [
        {
          titre: "Trois lancers francs",
          enonce:
            "Une basketteuse réussit un lancer franc avec la probabilité $0{,}8$ ; ses lancers sont supposés indépendants. Elle en tire trois.\na) Calculer la probabilité qu'elle les réussisse tous.\nb) Calculer la probabilité qu'elle en réussisse exactement deux.\nc) Calculer la probabilité qu'elle en réussisse au moins un.",
          figure: arbreRepete([
            { label: "S", proba: "0,8", enfants: [
              { label: "S", proba: "0,8", enfants: [{ label: "SSS", proba: "0,8" }, { label: "SSE", proba: "0,2" }] },
              { label: "E", proba: "0,2", enfants: [{ label: "SES", proba: "0,8" }, { label: "SEE", proba: "0,2" }] },
            ] },
            { label: "E", proba: "0,2", enfants: [
              { label: "S", proba: "0,8", enfants: [{ label: "ESS", proba: "0,8" }, { label: "ESE", proba: "0,2" }] },
              { label: "E", proba: "0,2", enfants: [{ label: "EES", proba: "0,8" }, { label: "EEE", proba: "0,2" }] },
            ] },
          ]),
          correction:
            "a) Le chemin $SSS$ : $0{,}8^3 = 0{,}512$.\nb) Trois chemins : $SSE$, $SES$, $ESS$, chacun de probabilité $0{,}8 \\times 0{,}8 \\times 0{,}2 = 0{,}128$.\n$P = 3 \\times 0{,}128 = 0{,}384$.\nc) Contraire : « aucun réussi », le chemin $EEE$, $0{,}2^3 = 0{,}008$. Donc $1 - 0{,}008 = 0{,}992$.\n⭐ Une joueuse à $80$ % rate ses trois lancers moins d'une fois sur cent.",
          micros: ["alea_bern_arbre", "alea_bern_calculer", "alea_bern_au_moins_un"],
        },
        {
          titre: "Le signal répété trois fois",
          enonce:
            "Pour transmettre un bit dans un câble bruité, on l'envoie trois fois. Chaque copie arrive juste ($J$) avec la probabilité $0{,}9$, faussée ($F$) sinon, indépendamment des autres. Le récepteur garde la valeur majoritaire : il se trompe seulement si au moins deux copies sont faussées.\na) Construire l'arbre des trois copies.\nb) Calculer la probabilité que le récepteur trouve le bon bit.\nc) Comparer à un envoi unique.",
          correction:
            "a) À chaque niveau : $J$ avec $0{,}9$, $F$ avec $0{,}1$. Huit chemins.\nb) Le récepteur a raison si AUCUNE copie n'est faussée, ou une seule.\nAucune : $JJJ$, $0{,}9^3 = 0{,}729$. Une seule : $JJF$, $JFJ$, $FJJ$, chacun $0{,}9 \\times 0{,}9 \\times 0{,}1 = 0{,}081$, soit $3 \\times 0{,}081 = 0{,}243$.\n$P = 0{,}729 + 0{,}243 = 0{,}972$.\nc) Envoi unique : $0{,}9$. En triplant, l'erreur passe de $10$ % à $2{,}8$ %.\n⭐ C'est le principe des codes correcteurs d'erreurs : un peu de répétition rend la transmission bien plus fiable.",
          schema: ecranSeulement(
            arbreRepete([
              { label: "J", proba: "0,9", vu: true, enfants: [
                { label: "J", proba: "0,9", vu: true, enfants: [{ label: "JJJ → 0,729", proba: "0,9", vu: true }, { label: "JJF → 0,081", proba: "0,1", vu: true }] },
                { label: "F", proba: "0,1", vu: true, enfants: [{ label: "JFJ → 0,081", proba: "0,9", vu: true }, { label: "JFF → 0,009", proba: "0,1" }] },
              ] },
              { label: "F", proba: "0,1", vu: true, enfants: [
                { label: "J", proba: "0,9", vu: true, enfants: [{ label: "FJJ → 0,081", proba: "0,9", vu: true }, { label: "FJF → 0,009", proba: "0,1" }] },
                { label: "F", proba: "0,1", enfants: [{ label: "FFJ → 0,009", proba: "0,9" }, { label: "FFF → 0,001", proba: "0,1" }] },
              ] },
            ]),
          ),
          micros: ["alea_bern_arbre", "alea_bern_calculer"],
        },
        {
          titre: "Quatre électeurs",
          enonce:
            "Dans une grande ville (modèle), $40$ % des électeurs votent pour la liste A. Un journaliste interroge $4$ électeurs au hasard ; la ville est assez grande pour considérer les réponses comme indépendantes.\na) Calculer la probabilité qu'aucun des quatre ne vote A.\nb) En déduire la probabilité qu'au moins un vote A.\nc) Calculer la probabilité que les quatre votent A.",
          correction:
            "Épreuve : interroger un électeur ; succès : « il vote A », $p = 0{,}4$ ; $n = 4$.\na) Aucun : le seul chemin $EEEE$, $0{,}6^4 = 0{,}1296$.\nb) $1 - 0{,}1296 = 0{,}8704$.\nc) Le chemin $SSSS$ : $0{,}4^4 = 0{,}0256$.\n⭐ Plus d'une fois sur huit ($0{,}13$), le journaliste ne trouverait AUCUN électeur de A, alors que la liste fait $40$ % : quatre personnes, c'est bien trop peu pour un sondage.",
          schema: ecranSeulement(tableau(["", "aucun A", "au moins un", "tous A"], ["probabilité", "0,1296", "0,8704", "0,0256"])),
          micros: ["alea_bern_au_moins_un"],
        },
        {
          titre: "Trois graines",
          enonce:
            "Un jardinier sème $3$ graines de tomate ; chacune germe avec la probabilité $0{,}8$, indépendamment.\na) Calculer la probabilité qu'aucune ne germe.\nb) Calculer la probabilité qu'au moins une germe.\nc) Calculer la probabilité qu'exactement une germe.",
          correction:
            "Succès : « la graine germe », $p = 0{,}8$ ; échec : $0{,}2$ ; $n = 3$.\na) $EEE$ : $0{,}2^3 = 0{,}008$.\nb) $1 - 0{,}008 = 0{,}992$.\nc) Trois chemins : $SEE$, $ESE$, $EES$, chacun $0{,}8 \\times 0{,}2 \\times 0{,}2 = 0{,}032$. $P = 3 \\times 0{,}032 = 0{,}096$.\n⭐ Semer trois graines par trou, c'est presque s'assurer qu'au moins une lève.",
          schema: ecranSeulement(arbreRepete([{ label: "S", proba: "0,8", vu: true, enfants: [{ label: "S", proba: "0,8", enfants: [{ label: "SSS → 0,512", proba: "0,8" }, { label: "SSE → 0,128", proba: "0,2" }] }, { label: "E", proba: "0,2", vu: true, enfants: [{ label: "SES → 0,128", proba: "0,8" }, { label: "SEE → 0,032", proba: "0,2", vu: true }] }] }, { label: "E", proba: "0,2", vu: true, enfants: [{ label: "S", proba: "0,8", vu: true, enfants: [{ label: "ESS → 0,128", proba: "0,8" }, { label: "ESE → 0,032", proba: "0,2", vu: true }] }, { label: "E", proba: "0,2", vu: true, enfants: [{ label: "EES → 0,032", proba: "0,8", vu: true }, { label: "EEE → 0,008", proba: "0,2" }] }] }])),
          micros: ["alea_bern_calculer", "alea_bern_au_moins_un"],
        },
        {
          titre: "Les appels du commercial",
          enonce:
            "Un commercial conclut une vente à chaque appel avec la probabilité $0{,}2$, indépendamment. Il passe trois appels.\na) Construire l'arbre.\nb) Calculer la probabilité d'exactement une vente.\nc) Calculer la probabilité d'au moins une vente.",
          correction:
            "a) À chaque niveau : $S$ (vente) $0{,}2$, $E$ $0{,}8$. Huit chemins.\nb) Une vente : $SEE$, $ESE$, $EES$, chacun $0{,}2 \\times 0{,}8 \\times 0{,}8 = 0{,}128$. $P = 3 \\times 0{,}128 = 0{,}384$.\nc) Aucune : $0{,}8^3 = 0{,}512$. Au moins une : $1 - 0{,}512 = 0{,}488$.\n⚠️ Même avec trois appels, il y a plus d'une chance sur deux de ne rien vendre : $0{,}512$.",
          schema: arbreRepete([
            { label: "S", proba: "0,2", vu: true, enfants: [
              { label: "S", proba: "0,2", enfants: [{ label: "SSS → 0,008", proba: "0,2" }, { label: "SSE → 0,032", proba: "0,8" }] },
              { label: "E", proba: "0,8", vu: true, enfants: [{ label: "SES → 0,032", proba: "0,2" }, { label: "SEE → 0,128", proba: "0,8", vu: true }] },
            ] },
            { label: "E", proba: "0,8", vu: true, enfants: [
              { label: "S", proba: "0,2", vu: true, enfants: [{ label: "ESS → 0,032", proba: "0,2" }, { label: "ESE → 0,128", proba: "0,8", vu: true }] },
              { label: "E", proba: "0,8", vu: true, enfants: [{ label: "EES → 0,128", proba: "0,2", vu: true }, { label: "EEE → 0,512", proba: "0,8" }] },
            ] },
          ]),
          micros: ["alea_bern_arbre", "alea_bern_calculer", "alea_bern_au_moins_un"],
        },
        {
          titre: "Les conteneurs frigorifiques",
          enonce:
            "À l'arrivée au port, on ouvre des conteneurs de marchandises réfrigérées pour vérifier que la chaîne du froid a tenu. Chaque conteneur a une rupture du froid avec la probabilité $0{,}1$, indépendamment des autres. On en contrôle $1$, $2$, $3$ ou $4$.\na) Calculer la probabilité de trouver au moins un conteneur en rupture quand on en contrôle $4$.\nb) Le diagramme donne cette probabilité pour $n = 1$ à $4$. Vérifier les valeurs pour $n = 2$ et $n = 3$.",
          correction:
            "a) Contraire : aucun conteneur en rupture, $0{,}9^4 = 0{,}6561$. Donc $1 - 0{,}6561 = 0{,}3439 \\approx 34$ %.\nb) $n = 2$ : $1 - 0{,}9^2 = 1 - 0{,}81 = 0{,}19$. $n = 3$ : $1 - 0{,}9^3 = 1 - 0{,}729 = 0{,}271 \\approx 27$ %.\n⭐ Chaque conteneur de plus fait monter les chances de repérer un problème, mais de moins en moins : environ $+10$, $+9$, $+8$, $+7$ points.\n⚠️ Avec $n = 4$, on ne dessine pas les seize chemins : un seul compte, celui où tout va bien.",
          schema: diagramme("barres", [
            { label: "n = 1", value: 10 },
            { label: "n = 2", value: 19 },
            { label: "n = 3", value: 27 },
            { label: "n = 4", value: 34 },
          ]),
          micros: ["alea_bern_au_moins_un"],
        },
        {
          titre: "La guirlande de LED",
          enonce:
            "Une petite guirlande compte $3$ LED montées en série : elle ne s'allume que si les trois fonctionnent. Chaque LED fonctionne ($M$) avec la probabilité $0{,}9$, indépendamment ; sinon elle est grillée ($G$).\na) Construire l'arbre et calculer la probabilité que la guirlande s'allume.\nb) Calculer la probabilité qu'exactement une LED soit grillée.",
          correction:
            "a) À chaque niveau : $M$ $0{,}9$, $G$ $0{,}1$. La guirlande s'allume sur le seul chemin $MMM$ : $0{,}9^3 = 0{,}729$.\nElle reste éteinte avec la probabilité $1 - 0{,}729 = 0{,}271$.\nb) Trois chemins : $MMG$, $MGM$, $GMM$, chacun $0{,}9 \\times 0{,}9 \\times 0{,}1 = 0{,}081$. $P = 3 \\times 0{,}081 = 0{,}243$.\n⭐ En série, une seule LED grillée éteint tout : plus il y a de LED, plus la guirlande est fragile.",
          schema: arbreRepete([
            { label: "M", proba: "0,9", vu: true, enfants: [
              { label: "M", proba: "0,9", vu: true, enfants: [{ label: "MMM → 0,729", proba: "0,9", vu: true }, { label: "MMG → 0,081", proba: "0,1" }] },
              { label: "G", proba: "0,1", enfants: [{ label: "MGM → 0,081", proba: "0,9" }, { label: "MGG → 0,009", proba: "0,1" }] },
            ] },
            { label: "G", proba: "0,1", enfants: [
              { label: "M", proba: "0,9", enfants: [{ label: "GMM → 0,081", proba: "0,9" }, { label: "GMG → 0,009", proba: "0,1" }] },
              { label: "G", proba: "0,1", enfants: [{ label: "GGM → 0,009", proba: "0,9" }, { label: "GGG → 0,001", proba: "0,1" }] },
            ] },
          ]),
          micros: ["alea_bern_arbre", "alea_bern_calculer"],
        },
        {
          titre: "Le QCM au hasard",
          enonce:
            "Un élève répond au hasard aux $4$ questions d'un QCM ; chaque question a quatre propositions, dont une seule est juste.\na) Calculer la probabilité qu'il réponde juste aux quatre questions.\nb) Calculer la probabilité qu'il réponde faux partout.\nc) En déduire la probabilité qu'il ait au moins une bonne réponse. Arrondir au centième.",
          correction:
            "Succès : « répondre juste », $p = 0{,}25$ ; $n = 4$ épreuves identiques et indépendantes.\na) $0{,}25^4 = 0{,}00390625 \\approx 0{,}004$ : moins d'une chance sur deux cents.\nb) $0{,}75^4 = 0{,}31640625 \\approx 0{,}32$.\nc) $1 - 0{,}31640625 = 0{,}68359375 \\approx 0{,}68$.\n⭐ Répondre au hasard donne souvent UN point, presque jamais les quatre.",
          schema: ecranSeulement(tableau(["", "4 justes", "tout faux", "au moins 1"], ["probabilité", "≈ 0,004", "≈ 0,32", "≈ 0,68"])),
          micros: ["alea_bern_calculer", "alea_bern_au_moins_un"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Modéliser, dessiner l'arbre, compter les chemins utiles, et conclure par une phrase.",
      rappel: [
        "« Au moins deux succès » sur trois épreuves : les chemins à deux succès et le chemin à trois succès.",
        "Pour comparer des stratégies (un envoi ou trois, un relais ou quatre), on calcule la même probabilité dans chaque cas.",
      ],
      exercices: [
        {
          titre: "Les disettes d'un village médiéval",
          enonce:
            "Dans un village du Moyen Âge (modèle), une année est une année de disette ($D$) avec la probabilité $0{,}2$, indépendamment d'une année à l'autre ; sinon, c'est une bonne année ($B$). On étudie trois années de suite.\na) Construire l'arbre.\nb) Calculer la probabilité de n'avoir aucune disette, puis au moins une.\nc) Deux disettes en trois ans épuisent les réserves du village. Calculer la probabilité d'au moins deux disettes.",
          correction:
            "a) À chaque niveau : $D$ $0{,}2$, $B$ $0{,}8$. Huit chemins.\nb) Aucune : $BBB$, $0{,}8^3 = 0{,}512$. Au moins une : $1 - 0{,}512 = 0{,}488$.\nc) Deux disettes : $DDB$, $DBD$, $BDD$, chacun $0{,}2 \\times 0{,}2 \\times 0{,}8 = 0{,}032$, soit $0{,}096$. Trois : $DDD$, $0{,}2^3 = 0{,}008$.\nAu moins deux : $0{,}096 + 0{,}008 = 0{,}104$.\nEnviron une période de trois ans sur dix épuise les réserves.\n⭐ Dans ce modèle, une disette sur cinq ans suffit à rendre les crises graves assez fréquentes : de quoi comprendre l'importance des greniers.",
          schema: arbreRepete([
            { label: "D", proba: "0,2", vu: true, enfants: [
              { label: "D", proba: "0,2", vu: true, enfants: [{ label: "DDD → 0,008", proba: "0,2", vu: true }, { label: "DDB → 0,032", proba: "0,8", vu: true }] },
              { label: "B", proba: "0,8", vu: true, enfants: [{ label: "DBD → 0,032", proba: "0,2", vu: true }, { label: "DBB → 0,128", proba: "0,8" }] },
            ] },
            { label: "B", proba: "0,8", vu: true, enfants: [
              { label: "D", proba: "0,2", vu: true, enfants: [{ label: "BDD → 0,032", proba: "0,2", vu: true }, { label: "BDB → 0,128", proba: "0,8" }] },
              { label: "B", proba: "0,8", enfants: [{ label: "BBD → 0,128", proba: "0,2" }, { label: "BBB → 0,512", proba: "0,8" }] },
            ] },
          ]),
          micros: ["alea_bern_arbre", "alea_bern_calculer", "alea_bern_au_moins_un"],
        },
        {
          titre: "Les relais de secours",
          enonce:
            "Un refuge de montagne communique par radio grâce à des relais. Un jour d'orage, chaque relais tombe en panne avec la probabilité $0{,}2$, indépendamment. La liaison tient si au moins un relais fonctionne.\na) Avec un seul relais, quelle est la probabilité que la liaison tienne ?\nb) Calculer cette probabilité avec $2$, $3$ puis $4$ relais.\nc) Combien de relais faut-il pour que la liaison tienne avec une probabilité d'au moins $0{,}99$ ?",
          correction:
            "a) Un relais : la liaison tient s'il fonctionne, $1 - 0{,}2 = 0{,}8$.\nb) Contraire : tous les relais en panne, $0{,}2^n$.\n$n = 2$ : $1 - 0{,}04 = 0{,}96$. $n = 3$ : $1 - 0{,}008 = 0{,}992$. $n = 4$ : $1 - 0{,}0016 = 0{,}9984$.\nc) $0{,}96 < 0{,}99$ mais $0{,}992 \\geqslant 0{,}99$ : il faut $3$ relais.\n⭐ Doubler ou tripler un équipement critique s'appelle la redondance : c'est un principe de sécurité, en aviation par exemple.",
          schema: tableau(["relais", "1", "2", "3", "4"], ["liaison", "0,8", "0,96", "0,992", "0,9984"]),
          micros: ["alea_bern_au_moins_un"],
        },
        {
          titre: "Le parc éolien",
          enonce:
            "Un petit parc compte $3$ éoliennes. Un jour donné, chacune fonctionne ($M$) avec la probabilité $0{,}95$, indépendamment ; sinon elle est en panne ($P$). Le parc remplit son contrat de production si au moins deux éoliennes fonctionnent.\na) Construire l'arbre.\nb) Calculer la probabilité que les trois fonctionnent.\nc) Calculer la probabilité que le contrat soit rempli. Arrondir au millième.\nd) Calculer la probabilité qu'au moins une éolienne soit en panne.",
          correction:
            "a) À chaque niveau : $M$ $0{,}95$, $P$ $0{,}05$.\nb) $MMM$ : $0{,}95^3 = 0{,}857375$.\nc) Au moins deux fonctionnent : $MMM$, et les trois chemins avec une seule panne ($MMP$, $MPM$, $PMM$), chacun $0{,}95^2 \\times 0{,}05 = 0{,}045125$.\n$P = 0{,}857375 + 3 \\times 0{,}045125 = 0{,}857375 + 0{,}135375 = 0{,}99275 \\approx 0{,}993$.\nd) Contraire de « les trois fonctionnent » : $1 - 0{,}857375 = 0{,}142625 \\approx 0{,}143$.\n⭐ Une panne quelque part arrive environ un jour sur sept, mais le contrat n'échoue que moins d'un jour sur cent : c'est tout l'intérêt d'avoir plusieurs machines.",
          schema: arbreRepete([
            { label: "M", proba: "0,95", vu: true, enfants: [
              { label: "M", proba: "0,95", vu: true, enfants: [{ label: "MMM → 0,857375", proba: "0,95", vu: true }, { label: "MMP → 0,045125", proba: "0,05", vu: true }] },
              { label: "P", proba: "0,05", vu: true, enfants: [{ label: "MPM → 0,045125", proba: "0,95", vu: true }, { label: "MPP → 0,002375", proba: "0,05" }] },
            ] },
            { label: "P", proba: "0,05", vu: true, enfants: [
              { label: "M", proba: "0,95", vu: true, enfants: [{ label: "PMM → 0,045125", proba: "0,95", vu: true }, { label: "PMP → 0,002375", proba: "0,05" }] },
              { label: "P", proba: "0,05", enfants: [{ label: "PPM → 0,002375", proba: "0,95" }, { label: "PPP → 0,000125", proba: "0,05" }] },
            ] },
          ]),
          micros: ["alea_bern_arbre", "alea_bern_calculer", "alea_bern_au_moins_un"],
        },
        {
          titre: "Le match en trois sets",
          enonce:
            "Une joueuse de tennis gagne chaque set ($G$) avec la probabilité $0{,}6$, indépendamment des autres ; sinon elle le perd ($P$). Le match se joue au meilleur des trois sets : il faut en gagner deux.\nPour simplifier, on imagine qu'on joue toujours les trois sets, même quand le match est déjà gagné.\na) Quels chemins de l'arbre donnent la victoire ?\nb) Calculer la probabilité qu'elle gagne le match.\nc) Calculer la probabilité qu'elle gagne en deux sets seulement.\nd) Un set à $60$ %, un match à combien ? Commenter.",
          figure: arbreRepete([
            { label: "G", proba: "0,6", enfants: [
              { label: "G", proba: "0,6", enfants: [{ label: "GGG", proba: "0,6" }, { label: "GGP", proba: "0,4" }] },
              { label: "P", proba: "0,4", enfants: [{ label: "GPG", proba: "0,6" }, { label: "GPP", proba: "0,4" }] },
            ] },
            { label: "P", proba: "0,4", enfants: [
              { label: "G", proba: "0,6", enfants: [{ label: "PGG", proba: "0,6" }, { label: "PGP", proba: "0,4" }] },
              { label: "P", proba: "0,4", enfants: [{ label: "PPG", proba: "0,6" }, { label: "PPP", proba: "0,4" }] },
            ] },
          ]),
          correction:
            "a) Elle gagne si elle remporte au moins deux sets sur trois : $GGG$, $GGP$, $GPG$, $PGG$.\nb) $GGG$ : $0{,}6^3 = 0{,}216$. Les trois autres : $0{,}6 \\times 0{,}6 \\times 0{,}4 = 0{,}144$ chacun.\n$P = 0{,}216 + 3 \\times 0{,}144 = 0{,}216 + 0{,}432 = 0{,}648$.\nc) Deux sets seulement : les deux premiers gagnés, $0{,}6 \\times 0{,}6 = 0{,}36$.\nd) Un set à $60$ %, un match à environ $65$ % : le format « deux sets gagnants » AVANTAGE la meilleure joueuse.\n⭐ Les matchs masculins des tournois du Grand Chelem se jouent en trois sets gagnants : la surprise y est encore plus rare.",
          schema: ecranSeulement(
            arbreRepete([
              { label: "G", proba: "0,6", vu: true, enfants: [
                { label: "G", proba: "0,6", vu: true, enfants: [{ label: "GGG → 0,216", proba: "0,6", vu: true }, { label: "GGP → 0,144", proba: "0,4", vu: true }] },
                { label: "P", proba: "0,4", vu: true, enfants: [{ label: "GPG → 0,144", proba: "0,6", vu: true }, { label: "GPP → 0,096", proba: "0,4" }] },
              ] },
              { label: "P", proba: "0,4", vu: true, enfants: [
                { label: "G", proba: "0,6", vu: true, enfants: [{ label: "PGG → 0,144", proba: "0,6", vu: true }, { label: "PGP → 0,096", proba: "0,4" }] },
                { label: "P", proba: "0,4", enfants: [{ label: "PPG → 0,096", proba: "0,6" }, { label: "PPP → 0,064", proba: "0,4" }] },
              ] },
            ]),
          ),
          micros: ["alea_bern_arbre", "alea_bern_calculer"],
        },
      ],
    },
  ],
};
