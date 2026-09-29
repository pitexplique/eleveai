// ─── Fiche d'exercices : la loi binomiale (terminale spé) ─────────────────────
//                              20 exercices corrigés
//
// Feuille de terminale spé du 29/09/2026, une par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/terminale-spe/maths/loi-binomiale.bank.ts`.
//
// ⭐⭐ LE FIL : UNE LOI SE VOIT. La plupart des corrigés dessinent la loi en
// barres (hauteurs en %, arrondies à l'unité), la barre utile en couleur ;
// les chemins de l'arbre de Bernoulli sont comptés (exercices 1, 4, 9 : la
// démonstration de la formule, demandée par le programme).
// ⭐ Les seuils (« au moins une fois », plus petit n, plus petit k,
// surréservation) se lisent dans un tableau ou une boucle Python.
//
// ⛔ Coefficients binomiaux : utilisés (calculatrice, triangle des chemins),
// mais la micro du dénombrement appartient à une autre notion, pas citée ici.
//
// Micro-compétences : binomiale_schema (1, 2, 9), binomiale_reconnaitre (2, 10,
// 15, 19), binomiale_calculer (3, 4, 9, 10, 15, 16, 19),
// binomiale_esperance_variance (5, 8, 11, 13, 14, 17, 18, 20),
// binomiale_intervalle (6, 7, 11, 12, 13, 18, 20), binomiale_defi (13, 16, 17,
// 18, 19, 20). 6/6.
//
// Faits cités : aucun fait réel. Imprimantes, traitement, paquets, grenouilles,
// éoliennes, avion et ateliers sont des MODÈLES, leurs chiffres sont inventés.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, arbre, diagramme, programme, repere, tableau, trace } from "@/lib/fiches-exercices/figures";

/** Dessin réservé à l'écran : le PDF garde 12 à 14 dessins (≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Une courbe qui n'est pas un polynôme, échantillonnée tous les 0,05, coupée en hauteur. */
const echantillon = (f: (x: number) => number, de: number, a: number, yMin = -Infinity, yMax = Infinity): [number, number][] =>
  Array.from({ length: Math.round((a - de) / 0.05) + 1 }, (_, k) => {
    const x = de + k * 0.05;
    return [Math.round(x * 100) / 100, Math.round(f(x) * 1000) / 1000] as [number, number];
  }).filter(([, y]) => y >= yMin && y <= yMax);

type Noeud3 = { label: string; proba?: string; enfants?: Noeud3[] };

/**
 * L'ARBRE PONDÉRÉ À TROIS NIVEAUX. ⛔ Le canvas `arbre_proba` du coach n'a que
 * trois colonnes (départ, niveau 1, niveau 2) : un troisième niveau s'y pose SUR
 * le deuxième. Même dessin (étiquette d'un nœud intérieur au-dessus du nœud,
 * feuille à droite, probabilité au milieu de la branche), une colonne par
 * niveau. ⛔ Texte NU (SVG). Cadre défilant sur téléphone, réduit sur papier.
 */
function arbre3(racine: Noeud3[]) {
  const PAS = 122, LIGNE = 44, MARGE = 22;
  const profondeur = (ns: Noeud3[]): number => Math.max(...ns.map((n) => (n.enfants?.length ? 1 + profondeur(n.enfants) : 1)));
  const col = (p: number) => 24 + p * PAS;
  const nbFeuilles = (n: Noeud3): number => (n.enfants?.length ? n.enfants.reduce((s, e) => s + nbFeuilles(e), 0) : 1);
  type Place = { x: number; y: number; n: Noeud3; enfants: Place[] };
  let curseur = 0;
  const placer = (n: Noeud3, prof: number): Place => {
    const x = col(prof + 1);
    if (!n.enfants?.length) {
      const y = MARGE + (curseur + 0.5) * LIGNE;
      curseur += 1;
      return { x, y, n, enfants: [] };
    }
    const enfants = n.enfants.map((e) => placer(e, prof + 1));
    return { x, y: (enfants[0].y + enfants[enfants.length - 1].y) / 2, n, enfants };
  };
  const places = racine.map((n) => placer(n, 0));
  const feuilles: Place[] = [];
  const branches: { x1: number; y1: number; p: Place }[] = [];
  const parcourir = (x1: number, y1: number, p: Place) => {
    branches.push({ x1, y1, p });
    if (!p.enfants.length) feuilles.push(p);
    p.enfants.forEach((e) => parcourir(p.x, p.y, e));
  };
  const depart = { x: col(0), y: (places[0].y + places[places.length - 1].y) / 2 };
  places.forEach((p) => parcourir(depart.x, depart.y, p));
  const largeur = Math.ceil(Math.max(...feuilles.map((f) => f.x + 8 + f.n.label.length * 7.8 + 6), col(profondeur(racine)) + 40));
  const hauteur = MARGE * 2 + racine.reduce((s, n) => s + nbFeuilles(n), 0) * LIGNE;
  return (
    <div className="mx-auto w-full max-w-[26rem] overflow-x-auto print:max-w-[15rem] print:overflow-visible">
      <div className="min-w-[25rem] rounded-xl border border-slate-200 bg-white p-3 print:min-w-0">
        <svg viewBox={`0 0 ${largeur} ${hauteur}`} className="block h-auto w-full" role="img" aria-label="Arbre pondéré à trois niveaux">
          <circle cx={depart.x} cy={depart.y} r={4} fill="#0f172a" />
          {branches.map(({ x1, y1, p }, i) => (
            <g key={`b${i}`}>
              <line x1={x1} y1={y1} x2={p.x} y2={p.y} stroke="#475569" strokeWidth={1.8} />
              <text x={(x1 + p.x) / 2} y={(y1 + p.y) / 2 - 5} textAnchor="middle" fontSize="13" fontWeight="700" fill="#2563eb" stroke="white" strokeWidth="3" paintOrder="stroke">
                {p.n.proba}
              </text>
            </g>
          ))}
          {branches.map(({ p }, i) => {
            const feuille = p.enfants.length === 0;
            return (
              <text key={`n${i}`} x={feuille ? p.x + 8 : p.x} y={feuille ? p.y + 5 : p.y - 13} textAnchor={feuille ? "start" : "middle"} fontSize="14" fontWeight="900" fill="#0f172a" stroke="white" strokeWidth="2.5" paintOrder="stroke">
                {p.n.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export const exercicesLoiBinomialeTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "loi-binomiale",
  titre: "Loi binomiale",
  accroche:
    "Vingt exercices, du schéma de Bernoulli au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle dessine la loi en barres, la bonne barre en couleur.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "Épreuve de Bernoulli : deux issues, succès (probabilité $p$) et échec ($1 - p$). Schéma de Bernoulli : on la répète $n$ fois, de façon identique et indépendante.",
        "Si $X$ compte les succès, $X$ suit la loi binomiale $\\mathcal{B}(n ; p)$ et $P(X = k) = \\binom{n}{k}p^k(1 - p)^{n-k}$.",
        "$E(X) = np$, $V(X) = np(1 - p)$ et $\\sigma(X) = \\sqrt{np(1 - p)}$.",
        "« Au moins un succès » est le contraire de « aucun succès » : $P(X \\geqslant 1) = 1 - (1 - p)^n$.",
      ],
      exercices: [
        {
          enonce:
            "On répète trois fois, de façon indépendante, une épreuve de Bernoulli de paramètre $p = 0{,}2$ (succès $S$, échec $E$). $X$ compte les succès.\na) Combien de chemins de l'arbre contiennent exactement deux succès ?\nb) Quelle est la probabilité de chacun de ces chemins ?\nc) En déduire $P(X = 2)$, puis $P(X = 0)$.",
          figure: arbre3([
            {
              label: "S",
              proba: "0,2",
              enfants: [
                { label: "S", proba: "0,2", enfants: [{ label: "SSS", proba: "0,2" }, { label: "SSE", proba: "0,8" }] },
                { label: "E", proba: "0,8", enfants: [{ label: "SES", proba: "0,2" }, { label: "SEE", proba: "0,8" }] },
              ],
            },
            {
              label: "E",
              proba: "0,8",
              enfants: [
                { label: "S", proba: "0,2", enfants: [{ label: "ESS", proba: "0,2" }, { label: "ESE", proba: "0,8" }] },
                { label: "E", proba: "0,8", enfants: [{ label: "EES", proba: "0,2" }, { label: "EEE", proba: "0,8" }] },
              ],
            },
          ]),
          correction:
            "a) Deux succès et un échec : l'échec est au 1er, au 2e ou au 3e rang. Ce sont les chemins $SSE$, $SES$ et $ESS$ : il y en a $3$.\nb) Les épreuves sont indépendantes : on multiplie le long du chemin. Chacun porte deux fois $0{,}2$ et une fois $0{,}8$, dans un ordre différent.\nSa probabilité vaut $0{,}2^2 \\times 0{,}8 = 0{,}032$.\nc) $P(X = 2) = 3 \\times 0{,}032 = 0{,}096$.\n$X = 0$ correspond au seul chemin $EEE$ : $P(X = 0) = 0{,}8^3 = 0{,}512$.\n⚠️ Ne pas oublier le nombre de chemins : $0{,}032$ est la probabilité d'UN chemin, pas de l'événement $X = 2$.\n⭐ Sur le dessin : les feuilles $SSE$, $SES$, $ESS$ sont éparpillées dans l'arbre, mais leurs probabilités sont égales. Le $3$ est $\\binom{3}{2}$.",
          micros: ["binomiale_schema"],
        },
        {
          enonce:
            "Dans chaque cas, $X$ suit-elle une loi binomiale ? Si oui, donner ses paramètres.\na) On lance $10$ fois un dé équilibré ; $X$ compte les $6$.\nb) On tire $3$ cartes SANS remise dans un jeu de $32$ cartes ; $X$ compte les as.\nc) On tire $5$ boules AVEC remise dans une urne de $3$ rouges et $7$ vertes ; $X$ compte les rouges.\nd) On lance une pièce jusqu'à obtenir pile ; $X$ compte les lancers.",
          correction:
            "a) Oui. Chaque lancer est une épreuve de Bernoulli (succès : « obtenir $6$ », $p = \\dfrac{1}{6}$), répétée $10$ fois de façon identique et indépendante. $X \\sim \\mathcal{B}\\left(10 ; \\dfrac{1}{6}\\right)$.\nb) Non. Sans remise, la probabilité de tirer un as change d'un tirage à l'autre : $\\dfrac{4}{32}$ au premier, puis $\\dfrac{3}{31}$ ou $\\dfrac{4}{31}$. Les tirages ne sont pas indépendants.\nc) Oui. Avec remise, l'urne ne change pas : $p = \\dfrac{3}{10} = 0{,}3$ à chaque tirage. $X \\sim \\mathcal{B}(5 ; 0{,}3)$.\nd) Non. Le nombre de répétitions n'est pas fixé à l'avance : c'est justement lui que $X$ mesure.\n⚠️ Deux conditions sont nécessaires : un nombre $n$ de répétitions FIXÉ, et des répétitions indépendantes et identiques.\n⭐ Sur le dessin (cas b) : après un as, la branche vers « As » porte $\\dfrac{3}{31}$ ; après une autre carte, elle porte $\\dfrac{4}{31}$. Les probabilités changent : ce n'est pas un schéma de Bernoulli.",
          schema: ecranSeulement(
            arbre([
              { label: "As", proba: "4/32", enfants: [{ label: "As", proba: "3/31" }, { label: "Autre", proba: "28/31" }] },
              { label: "Autre", proba: "28/32", enfants: [{ label: "As", proba: "4/31" }, { label: "Autre", proba: "27/31" }] },
            ]),
          ),
          micros: ["binomiale_schema", "binomiale_reconnaitre"],
        },
        {
          enonce: "$X$ suit la loi $\\mathcal{B}(8 ; 0{,}3)$. Calculer $P(X = 2)$ et $P(X = 0)$, arrondies au dix-millième.",
          correction:
            "$P(X = 2) = \\binom{8}{2} \\times 0{,}3^2 \\times 0{,}7^6$.\nÀ la calculatrice, $\\binom{8}{2} = 28$ : $P(X = 2) = 28 \\times 0{,}09 \\times 0{,}7^6 \\approx 0{,}2965$.\n$P(X = 0) = 0{,}7^8 \\approx 0{,}0576$ : aucun succès, huit échecs.\n⚠️ L'exposant de $0{,}7$ est $8 - 2 = 6$, le nombre d'ÉCHECS, pas $8$.\n⭐ Sur le dessin : la loi en barres (hauteurs en %). La barre de $2$, en couleur, est la plus haute : $2$ est la valeur la plus probable, proche de $E(X) = 2{,}4$.",
          schema: diagramme("barres", [{ label: "0", value: 6 }, { label: "1", value: 20 }, { label: "2", value: 30 }, { label: "3", value: 25 }, { label: "4", value: 14 }, { label: "5", value: 5 }, { label: "6", value: 1 }, { label: "7", value: 0 }, { label: "8", value: 0 }], 2),
          micros: ["binomiale_calculer"],
        },
        {
          enonce:
            "On lance $5$ fois une pièce équilibrée ; $X$ compte les piles. Le tableau donne le nombre de chemins de l'arbre qui mènent à $k$ piles.\na) Pourquoi tous les chemins ont-ils la même probabilité ? Laquelle ?\nb) Calculer $P(X = 3)$ et $P(X \\geqslant 4)$.",
          figure: tableau(["k", "0", "1", "2", "3", "4", "5"], ["chemins", "1", "5", "10", "10", "5", "1"]),
          correction:
            "a) Chaque chemin est une suite de $5$ lancers indépendants. Pile et face ont la même probabilité $0{,}5$ : chaque chemin vaut $0{,}5^5 = \\dfrac{1}{32}$.\nb) $P(X = 3) = 10 \\times \\dfrac{1}{32} = \\dfrac{10}{32} = 0{,}3125$.\n$P(X \\geqslant 4) = P(X = 4) + P(X = 5) = \\dfrac{5 + 1}{32} = \\dfrac{6}{32} = 0{,}1875$.\n⚠️ Ce raccourci marche parce que $p = 0{,}5$. Si $p \\neq 0{,}5$, les chemins n'ont pas tous la même probabilité.\n⭐ Sur le tableau : ce sont les coefficients $\\binom{5}{k}$. Ils sont symétriques, et leur somme vaut $32 = 2^5$, le nombre total de chemins.",
          micros: ["binomiale_calculer"],
        },
        {
          enonce:
            "Un institut de sondage appelle $50$ numéros. Chaque appel aboutit à une réponse avec la probabilité $0{,}2$, indépendamment des autres. $X$ compte les réponses. Calculer $E(X)$, $V(X)$ et $\\sigma(X)$. Interpréter $E(X)$.",
          correction:
            "$X$ suit la loi $\\mathcal{B}(50 ; 0{,}2)$.\n$E(X) = 50 \\times 0{,}2 = 10$.\n$V(X) = 50 \\times 0{,}2 \\times 0{,}8 = 8$ et $\\sigma(X) = \\sqrt{8} \\approx 2{,}83$.\nSi l'institut refait très souvent cette série de $50$ appels, il obtient en moyenne $10$ réponses par série.\n⚠️ $\\sigma$ est la racine de la variance : $\\sigma(X) = \\sqrt{8}$, pas $8$.\n⭐ Sur le dessin (de $5$ à $15$ réponses) : les barres sont hautes autour de $10$, en couleur, et diminuent de chaque côté. De $7$ à $13$ réponses, elles totalisent environ $79$ %.",
          schema: ecranSeulement(diagramme("barres", [{ label: "5", value: 3 }, { label: "6", value: 6 }, { label: "7", value: 9 }, { label: "8", value: 12 }, { label: "9", value: 14 }, { label: "10", value: 14 }, { label: "11", value: 13 }, { label: "12", value: 10 }, { label: "13", value: 8 }, { label: "14", value: 5 }, { label: "15", value: 3 }], 5)),
          micros: ["binomiale_esperance_variance"],
        },
        {
          enonce:
            "Un bureau a $10$ imprimantes. Chaque jour, chacune tombe en panne avec la probabilité $0{,}05$, indépendamment des autres. Quelle est la probabilité qu'au moins une imprimante tombe en panne un jour donné ?",
          correction:
            "$X$, le nombre d'imprimantes en panne, suit la loi $\\mathcal{B}(10 ; 0{,}05)$.\n« Au moins une » est le contraire de « aucune ».\n$P(X = 0) = 0{,}95^{10}$, donc $P(X \\geqslant 1) = 1 - 0{,}95^{10} \\approx 0{,}401$.\nChaque imprimante est fiable à $95$ %, et pourtant il y a environ $40$ % de risque qu'au moins une tombe en panne.\n⚠️ Additionner $P(X = 1) + P(X = 2) + \\cdots + P(X = 10)$ marche aussi, mais c'est dix calculs au lieu d'un.\n⭐ Sur le dessin : la barre de $0$, en couleur, vaut environ $60$ % ; tout le reste de la loi est « au moins une ».",
          schema: diagramme("barres", [{ label: "0", value: 60 }, { label: "1", value: 32 }, { label: "2", value: 7 }, { label: "3", value: 1 }, { label: "4", value: 0 }, { label: "5", value: 0 }], 0),
          micros: ["binomiale_intervalle"],
        },
        {
          enonce: "$X$ suit la loi $\\mathcal{B}(6 ; 0{,}4)$. Calculer :\na) $P(X \\leqslant 2)$ ;\nb) $P(X > 2)$ ;\nc) $P(2 \\leqslant X \\leqslant 4)$.",
          correction:
            "a) $P(X \\leqslant 2) = P(X = 0) + P(X = 1) + P(X = 2)$.\nCela fait $0{,}046656 + 0{,}186624 + 0{,}31104 = 0{,}54432$.\nb) $P(X > 2) = 1 - P(X \\leqslant 2) = 0{,}45568$.\nc) $P(2 \\leqslant X \\leqslant 4) = P(X \\leqslant 4) - P(X \\leqslant 1)$.\n$P(X \\leqslant 4) = 0{,}95904$ et $P(X \\leqslant 1) = 0{,}23328$ : on obtient $0{,}72576$.\n⚠️ $P(2 \\leqslant X \\leqslant 4) \\neq P(X \\leqslant 4) - P(X \\leqslant 2)$ : il faut garder la valeur $2$, on retire donc $P(X \\leqslant 1)$.\n⭐ Sur le dessin : $P(X \\leqslant 2)$, ce sont les trois barres de gauche, jusqu'à celle en couleur.",
          schema: diagramme("barres", [{ label: "0", value: 5 }, { label: "1", value: 19 }, { label: "2", value: 31 }, { label: "3", value: 28 }, { label: "4", value: 14 }, { label: "5", value: 4 }, { label: "6", value: 0 }], 2),
          micros: ["binomiale_intervalle"],
        },
        {
          enonce: "Une variable aléatoire $X$ suit une loi binomiale d'espérance $6$ et de variance $4{,}2$. Déterminer ses paramètres $n$ et $p$.",
          correction:
            "On a $np = 6$ et $np(1 - p) = 4{,}2$.\nOn divise la seconde égalité par la première : $1 - p = \\dfrac{4{,}2}{6} = 0{,}7$, donc $p = 0{,}3$.\nPuis $n = \\dfrac{6}{0{,}3} = 20$ : $X \\sim \\mathcal{B}(20 ; 0{,}3)$.\nVérification : $20 \\times 0{,}3 \\times 0{,}7 = 4{,}2$.\n⚠️ $n$ doit être un entier : si le calcul donnait $n = 20{,}5$, il n'existerait pas de telle loi binomiale.\n⭐ Sur le dessin : la loi $\\mathcal{B}(20 ; 0{,}3)$ de $0$ à $10$ ; la plus haute barre, en couleur, est à $6$, l'espérance.",
          schema: ecranSeulement(diagramme("barres", [{ label: "0", value: 0 }, { label: "1", value: 1 }, { label: "2", value: 3 }, { label: "3", value: 7 }, { label: "4", value: 13 }, { label: "5", value: 18 }, { label: "6", value: 19 }, { label: "7", value: 16 }, { label: "8", value: 11 }, { label: "9", value: 7 }, { label: "10", value: 3 }], 6)),
          micros: ["binomiale_esperance_variance"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Pour justifier une loi binomiale : on nomme l'épreuve, le succès et sa probabilité $p$ ; on dit qu'elle est répétée $n$ fois de façon identique et indépendante, et que $X$ compte les succès.",
        "Un tirage SANS remise dans une très grande population s'assimile à un tirage avec remise.",
        "$P(X > k) = 1 - P(X \\leqslant k)$ et $P(a \\leqslant X \\leqslant b) = P(X \\leqslant b) - P(X \\leqslant a - 1)$.",
        "$E(aX + b) = aE(X) + b$ et $V(aX + b) = a^2V(X)$.",
      ],
      exercices: [
        {
          enonce:
            "Démonstration du cours. On répète $n$ fois, de façon indépendante, une épreuve de Bernoulli de paramètre $p$ ; on note $q = 1 - p$ et $X$ le nombre de succès.\na) Pour $n = 4$, écrire les chemins qui comptent exactement $2$ succès. Quelle est la probabilité de chacun ?\nb) Dans le cas général, justifier que $P(X = k) = \\binom{n}{k}p^kq^{n-k}$.\nc) Application : $n = 4$ et $p = 0{,}5$. Calculer $P(X = 2)$.",
          correction:
            "a) On place les deux $S$ parmi quatre rangs : $SSEE$, $SESE$, $SEES$, $ESSE$, $ESES$, $EESS$. Il y a $6$ chemins, et $6 = \\binom{4}{2}$.\nLes épreuves sont indépendantes : chaque chemin a pour probabilité le produit de ses branches, deux facteurs $p$ et deux facteurs $q$, soit $p^2q^2$.\nb) Un chemin qui compte $k$ succès porte $k$ facteurs $p$ et $n - k$ facteurs $q$ : sa probabilité est $p^kq^{n-k}$, quel que soit l'ordre.\nCes chemins sont autant que de façons de choisir les $k$ rangs des succès parmi $n$ : il y en a $\\binom{n}{k}$.\nIls correspondent à des issues deux à deux incompatibles : on additionne. $P(X = k) = \\binom{n}{k}p^kq^{n-k}$.\nc) $P(X = 2) = 6 \\times 0{,}5^2 \\times 0{,}5^2 = \\dfrac{6}{16} = 0{,}375$.\n⚠️ L'indépendance sert DEUX fois : pour multiplier le long d'un chemin, et pour que chaque branche porte le même $p$.\n⭐ Sur le tableau : six chemins, six fois la même probabilité $p^2q^2$ ; la dernière ligne fait la somme.",
          schema: trace(["chemin", "probabilité"], [["SSEE", "p²q²"], ["SESE", "p²q²"], ["SEES", "p²q²"], ["ESSE", "p²q²"], ["ESES", "p²q²"], ["EESS", "p²q²"], ["6 chemins", "6p²q²"]]),
          micros: ["binomiale_schema", "binomiale_calculer"],
        },
        {
          enonce:
            "Un traitement guérit $80$ % des patients. On le donne à $12$ patients, qui réagissent indépendamment les uns des autres. $X$ compte les patients guéris.\na) Justifier que $X$ suit une loi binomiale et donner ses paramètres.\nb) Calculer $P(X = 12)$.\nc) Calculer $P(X \\geqslant 10)$.\nd) Calculer $E(X)$ et l'interpréter.",
          correction:
            "a) Pour chaque patient, deux issues : guéri (succès, $p = 0{,}8$) ou non. On répète $12$ fois, de façon identique et indépendante, et $X$ compte les succès : $X \\sim \\mathcal{B}(12 ; 0{,}8)$.\nb) $P(X = 12) = 0{,}8^{12} \\approx 0{,}0687$.\nc) $P(X = 10) = \\binom{12}{10} \\times 0{,}8^{10} \\times 0{,}2^2 \\approx 0{,}2835$, avec $\\binom{12}{10} = 66$.\n$P(X = 11) = 12 \\times 0{,}8^{11} \\times 0{,}2 \\approx 0{,}2062$.\n$P(X \\geqslant 10) = P(X = 10) + P(X = 11)$ $+ P(X = 12) \\approx 0{,}558$.\nd) $E(X) = 12 \\times 0{,}8 = 9{,}6$ : sur un grand nombre de groupes de $12$ patients, on compte en moyenne $9{,}6$ guérisons par groupe.\n⚠️ On n'observera jamais $9{,}6$ guérisons : l'espérance est une MOYENNE, pas une valeur possible de $X$.\n⚠️ En c), on garde les valeurs exactes jusqu'au bout : additionner les arrondis donnerait $0{,}5584$ au lieu de $0{,}5583$.\n⭐ Sur le dessin (de $4$ à $12$ guérisons) : $P(X \\geqslant 10)$, ce sont les trois barres de droite, à partir de celle en couleur.",
          schema: diagramme("barres", [{ label: "4", value: 0 }, { label: "5", value: 0 }, { label: "6", value: 2 }, { label: "7", value: 5 }, { label: "8", value: 13 }, { label: "9", value: 24 }, { label: "10", value: 28 }, { label: "11", value: 21 }, { label: "12", value: 7 }], 6),
          micros: ["binomiale_reconnaitre", "binomiale_calculer"],
        },
        {
          enonce:
            "Un fichier est envoyé en $200$ paquets. Chaque paquet est perdu avec la probabilité $0{,}02$, indépendamment des autres. $X$ compte les paquets perdus.\na) Calculer $E(X)$ et $\\sigma(X)$.\nb) Calculer $P(X \\leqslant 4)$.\nc) Le transfert est jugé mauvais si plus de $8$ paquets sont perdus. Calculer la probabilité de cet événement.",
          correction:
            "$X$ suit la loi $\\mathcal{B}(200 ; 0{,}02)$.\na) $E(X) = 200 \\times 0{,}02 = 4$. $V(X) = 4 \\times 0{,}98 = 3{,}92$ et $\\sigma(X) = \\sqrt{3{,}92} \\approx 1{,}98$.\nb) À la calculatrice (fonction de répartition) : $P(X \\leqslant 4) \\approx 0{,}629$.\nc) « Plus de $8$ » veut dire $X \\geqslant 9$ : $P(X > 8) = 1 - P(X \\leqslant 8) \\approx 0{,}020$.\n⚠️ $P(X > 8) = 1 - P(X \\leqslant 8)$, et non $1 - P(X \\leqslant 7)$ : le contraire de « $X > 8$ » est « $X \\leqslant 8$ ».\n⭐ Sur le dessin : la loi est tassée entre $0$ et $10$ ; la barre de $4$, en couleur, et celle de $3$ sont les plus hautes. Au-delà de $8$, les barres sont presque nulles.",
          schema: ecranSeulement(diagramme("barres", [{ label: "0", value: 2 }, { label: "1", value: 7 }, { label: "2", value: 15 }, { label: "3", value: 20 }, { label: "4", value: 20 }, { label: "5", value: 16 }, { label: "6", value: 10 }, { label: "7", value: 6 }, { label: "8", value: 3 }, { label: "9", value: 1 }, { label: "10", value: 0 }], 4)),
          micros: ["binomiale_esperance_variance", "binomiale_intervalle"],
        },
        {
          enonce:
            "Une espèce de grenouille rare vit dans $5$ % des mares d'une région. Une biologiste inspecte $n$ mares prises au hasard, de façon indépendante. $X$ compte les mares où elle trouve l'espèce.\na) Exprimer $P(X \\geqslant 1)$ en fonction de $n$.\nb) Déterminer par le calcul le plus petit $n$ tel que $P(X \\geqslant 1) \\geqslant 0{,}95$.\nc) Que renvoie la fonction Python ci-dessous ?",
          figure: programme(["def seuil():", "    n = 1", "    while 1 - 0.95**n < 0.95:", "        n = n + 1", "    return n"]),
          correction:
            "a) $X \\sim \\mathcal{B}(n ; 0{,}05)$ et $P(X \\geqslant 1) = 1 - P(X = 0) = 1 - 0{,}95^n$.\nb) $1 - 0{,}95^n \\geqslant 0{,}95$ équivaut à $0{,}95^n \\leqslant 0{,}05$.\nLa fonction $\\ln$ est croissante : $n\\ln(0{,}95) \\leqslant \\ln(0{,}05)$.\n$\\ln(0{,}95) < 0$ : en divisant, le sens change. $n \\geqslant \\dfrac{\\ln(0{,}05)}{\\ln(0{,}95)} \\approx 58{,}4$.\nLe plus petit entier est $n = 59$. Vérification : $1 - 0{,}95^{58} \\approx 0{,}9490$ et $1 - 0{,}95^{59} \\approx 0{,}9515$.\nc) La boucle augmente $n$ tant que la probabilité reste sous $0{,}95$ : elle renvoie $59$, comme le calcul.\n⚠️ Diviser par $\\ln(0{,}95)$, qui est NÉGATIF, retourne l'inégalité : c'est l'erreur la plus fréquente.\n⭐ Dans le programme : la condition du while est le CONTRAIRE de ce qu'on cherche. La boucle tourne tant que ce n'est pas assez.",
          schema: ecranSeulement(tableau(["n", "58", "59"], ["P(X ≥ 1)", "0,9490", "0,9515"])),
          micros: ["binomiale_intervalle"],
        },
        {
          enonce:
            "Une machine produit $5$ % de pièces défectueuses. Un lot compte $100$ pièces, assimilé à un tirage avec remise ; $X$ compte les pièces défectueuses.\na) Donner la loi de $X$ et son espérance.\nb) À l'aide du tableau, déterminer le plus petit entier $k$ tel que $P(X \\leqslant k) \\geqslant 0{,}95$.\nc) Un lot contient $12$ pièces défectueuses. Qu'en penser ?",
          correction:
            "a) $X \\sim \\mathcal{B}(100 ; 0{,}05)$ et $E(X) = 100 \\times 0{,}05 = 5$.\nb) $P(X \\leqslant 8) \\approx 0{,}937 < 0{,}95$ et $P(X \\leqslant 9) \\approx 0{,}972 \\geqslant 0{,}95$ : $k = 9$.\nDans $95$ % des lots au moins, on compte au plus $9$ pièces défectueuses.\nc) $12 > 9$ : si la machine produisait encore $5$ % de défauts, un tel lot aurait une probabilité inférieure à $5$ % d'arriver. On met en doute le réglage de la machine.\n⚠️ Ce n'est pas une preuve : un lot à $12$ défauts reste possible avec une machine bien réglée. La règle se trompe dans moins de $5$ % des cas.\n⭐ Sur le tableau : la probabilité cumulée monte avec $k$ ; on lit la PREMIÈRE colonne qui dépasse $0{,}95$.",
          schema: tableau(["k", "7", "8", "9", "10"], ["P(X ≤ k)", "0,872", "0,937", "0,972", "0,989"]),
          micros: ["binomiale_intervalle", "binomiale_esperance_variance", "binomiale_defi"],
        },
        {
          enonce:
            "Un livreur fait $20$ livraisons par jour ; chacune est en retard avec la probabilité $0{,}15$, indépendamment des autres. $X$ compte les retards. Sa prime du jour vaut $30 - 4X$ euros.\na) Calculer $E(X)$ et $V(X)$.\nb) En déduire l'espérance et l'écart-type de la prime.\nc) Quelle est la probabilité que la prime atteigne au moins $22$ euros ?",
          correction:
            "a) $X \\sim \\mathcal{B}(20 ; 0{,}15)$ : $E(X) = 20 \\times 0{,}15 = 3$ et $V(X) = 3 \\times 0{,}85 = 2{,}55$.\nb) Espérance : $E(30 - 4X) = 30 - 4E(X) = 30 - 12 = 18$ euros.\nVariance : $V(30 - 4X) = (-4)^2V(X) = 16 \\times 2{,}55 = 40{,}8$. Écart-type : $\\sqrt{40{,}8} \\approx 6{,}39$ euros.\nc) $30 - 4X \\geqslant 22$ équivaut à $4X \\leqslant 8$, soit $X \\leqslant 2$.\n$P(X \\leqslant 2) \\approx 0{,}405$.\n⚠️ Dans la variance, le $30$ disparaît et le $-4$ devient $16$ : on ne trouve pas $30 - 4 \\times 2{,}55$.\n⭐ Sur le dessin : la prime atteint $22$ euros pour $0$, $1$ ou $2$ retards, les trois barres de gauche jusqu'à celle en couleur.",
          schema: ecranSeulement(diagramme("barres", [{ label: "0", value: 4 }, { label: "1", value: 14 }, { label: "2", value: 23 }, { label: "3", value: 24 }, { label: "4", value: 18 }, { label: "5", value: 10 }, { label: "6", value: 5 }, { label: "7", value: 2 }, { label: "8", value: 0 }], 2)),
          micros: ["binomiale_esperance_variance"],
        },
        {
          enonce:
            "Un sac contient $10\\,000$ graines, dont $3$ % ne germent pas. On en prélève $50$ au hasard. $X$ compte les graines qui ne germent pas.\na) Le prélèvement est sans remise. Pourquoi peut-on quand même utiliser une loi binomiale ? Laquelle ?\nb) Calculer la probabilité que toutes les graines prélevées germent.\nc) Calculer la probabilité qu'au plus $2$ graines ne germent pas.",
          correction:
            "a) Il y a $300$ graines stériles sur $10\\,000$. Même après en avoir retiré quelques-unes, la proportion reste presque $0{,}03$ : par exemple $\\dfrac{299}{9\\,999} \\approx 0{,}0299$.\nOn assimile donc le prélèvement à $50$ tirages avec remise : $X \\sim \\mathcal{B}(50 ; 0{,}03)$.\nb) « Toutes germent » veut dire $X = 0$ : $P(X = 0) = 0{,}97^{50} \\approx 0{,}218$.\nc) $P(X \\leqslant 2) \\approx 0{,}811$ (calculatrice).\n⚠️ Avec $50$ graines prélevées dans un sac de $60$, l'approximation serait fausse : elle demande un prélèvement petit devant la population.\n⭐ Sur le dessin : la barre de $1$, en couleur, est la plus haute ; en moyenne on attend $50 \\times 0{,}03 = 1{,}5$ graine stérile.",
          schema: ecranSeulement(diagramme("barres", [{ label: "0", value: 22 }, { label: "1", value: 34 }, { label: "2", value: 26 }, { label: "3", value: 13 }, { label: "4", value: 5 }, { label: "5", value: 1 }, { label: "6", value: 0 }], 1)),
          micros: ["binomiale_reconnaitre", "binomiale_calculer"],
        },
        {
          enonce:
            "Un laboratoire fait $10$ mesures ; chacune est aberrante avec la probabilité $p$, indépendamment des autres. On cherche la valeur de $p$ qui rend le plus probable « exactement une mesure aberrante ».\na) Montrer que cette probabilité vaut $f(p) = 10p(1 - p)^9$.\nb) Montrer que $f'(p) = 10(1 - p)^8(1 - 10p)$.\nc) En déduire la valeur de $p$ qui maximise $f$ sur $[0 ; 1]$, et ce maximum.",
          correction:
            "a) Le nombre $X$ de mesures aberrantes suit $\\mathcal{B}(10 ; p)$, et $\\binom{10}{1} = 10$ : $P(X = 1) = 10p(1 - p)^9$.\nb) On dérive un produit : $f'(p) = 10(1 - p)^9 + 10p \\times 9(1 - p)^8 \\times (-1)$.\nOn factorise par $10(1 - p)^8$ : $f'(p) = 10(1 - p)^8\\big((1 - p) - 9p\\big)$ $= 10(1 - p)^8(1 - 10p)$.\nc) Sur $[0 ; 1]$, $(1 - p)^8 \\geqslant 0$ : $f'(p)$ a le signe de $1 - 10p$, positif avant $0{,}1$ et négatif après.\n$f$ croît puis décroît : son maximum est atteint en $p = 0{,}1$, et vaut $f(0{,}1) = 0{,}9^9 \\approx 0{,}387$.\n⭐ C'est naturel : pour $p = 0{,}1$, $E(X) = 10 \\times 0{,}1 = 1$. La valeur « une mesure aberrante » est alors la moyenne.\n⚠️ Dans la dérivée de $(1 - p)^9$, ne pas oublier le facteur $-1$, dérivée de $1 - p$.\n⚠️ Sur le dessin, les deux axes sont agrandis dix fois : une graduation vaut $0{,}1$. Le sommet de la courbe est au point $(1 ; 3{,}87)$, c'est-à-dire $p = 0{,}1$ et $f(p) \\approx 0{,}387$.",
          schema: repere([-1, 10, -1, 5], [{ pts: echantillon((t) => 10 * t * (1 - t / 10) ** 9, 0, 10), couleur: ORANGE }], [{ x: 1, y: 3.87, label: "" }], undefined, true),
          micros: ["binomiale_calculer", "binomiale_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. On reconnaît la loi, on calcule, on décide.",
      rappel: [
        "Plan type : reconnaître la loi et ses paramètres, calculer, puis interpréter dans le contexte.",
        "Chercher un seuil : on calcule la probabilité pour plusieurs valeurs de $n$ ou de $k$ (tableau, boucle), et on garde la première qui convient.",
        "Une espérance se lit « en moyenne, sur un grand nombre de répétitions ». Elle n'est pas forcément une valeur possible.",
      ],
      exercices: [
        {
          titre: "Répondre au hasard",
          enonce:
            "Un QCM compte $20$ questions à $4$ réponses, dont une seule est juste. Un candidat répond à tout au hasard. $X$ compte ses bonnes réponses.\na) Justifier que $X$ suit une loi binomiale et préciser ses paramètres.\nb) Calculer $E(X)$ et $\\sigma(X)$.\nc) Il faut $10$ bonnes réponses pour réussir. Calculer $P(X \\geqslant 10)$.\nd) Une bonne réponse rapporte $1$ point, une mauvaise en retire $a$. Exprimer la note $N$ en fonction de $X$, puis choisir $a$ pour que $E(N) = 0$.",
          correction:
            "a) Chaque question est une épreuve de Bernoulli : succès « bonne réponse », $p = \\dfrac{1}{4}$. Le candidat répond au hasard, donc de façon indépendante, $20$ fois : $X \\sim \\mathcal{B}(20 ; 0{,}25)$.\nb) $E(X) = 20 \\times 0{,}25 = 5$ ; $V(X) = 5 \\times 0{,}75 = 3{,}75$ ; $\\sigma(X) = \\sqrt{3{,}75} \\approx 1{,}94$.\nc) $P(X \\geqslant 10) = 1 - P(X \\leqslant 9) \\approx 0{,}0139$ : un peu plus d'une chance sur cent.\nd) Il y a $X$ bonnes réponses et $20 - X$ mauvaises : $N = X - a(20 - X) = (1 + a)X - 20a$.\n$E(N) = (1 + a) \\times 5 - 20a = 5 - 15a$. Donc $E(N) = 0$ pour $a = \\dfrac{1}{3}$.\nAvec ce barème, répondre au hasard ne rapporte rien en moyenne.\n⚠️ $P(X \\geqslant 10) = 1 - P(X \\leqslant 9)$ : on retire tout ce qui est STRICTEMENT sous $10$.\n⭐ Sur le dessin : la loi culmine en $5$ (en couleur) ; les barres de $10$ et au-delà sont presque invisibles.",
          schema: diagramme("barres", [{ label: "0", value: 0 }, { label: "1", value: 2 }, { label: "2", value: 7 }, { label: "3", value: 13 }, { label: "4", value: 19 }, { label: "5", value: 20 }, { label: "6", value: 17 }, { label: "7", value: 11 }, { label: "8", value: 6 }, { label: "9", value: 3 }, { label: "10", value: 1 }], 5),
          micros: ["binomiale_esperance_variance", "binomiale_defi"],
        },
        {
          titre: "Le parc d'éoliennes",
          enonce:
            "Un parc compte $n$ éoliennes. Un jour donné, chacune fonctionne avec la probabilité $0{,}9$, indépendamment des autres. $Y$ compte les éoliennes qui fonctionnent. Le parc couvre ses besoins si au moins $10$ éoliennes fonctionnent.\na) Pour $n = 12$ : donner la loi de $Y$, puis calculer $E(Y)$ et $P(Y = 12)$.\nb) Calculer $P(Y \\geqslant 10)$ pour $n = 12$.\nc) Combien d'éoliennes faut-il au minimum pour que $P(Y \\geqslant 10) \\geqslant 0{,}95$ ?",
          correction:
            "a) $Y \\sim \\mathcal{B}(12 ; 0{,}9)$, $E(Y) = 12 \\times 0{,}9 = 10{,}8$ et $P(Y = 12) = 0{,}9^{12} \\approx 0{,}282$.\nb) $P(Y = 10) \\approx 0{,}230$ et $P(Y = 11) \\approx 0{,}377$.\n$P(Y \\geqslant 10) = P(Y = 10) + P(Y = 11)$ $+ P(Y = 12) \\approx 0{,}889$.\nc) On recalcule pour d'autres valeurs de $n$ : $0{,}889$ pour $n = 12$, puis $0{,}966$ pour $n = 13$.\nIl faut au moins $13$ éoliennes.\n⚠️ $E(Y) = 10{,}8$ dépasse $10$, et pourtant le parc manque d'énergie plus d'un jour sur dix : une moyenne ne garantit rien pour UN jour donné.\n⭐ Sur le tableau : une seule éolienne de plus fait passer la probabilité de $0{,}889$ à $0{,}966$.",
          schema: tableau(["n", "12", "13", "14"], ["P(Y ≥ 10)", "0,889", "0,966", "0,991"]),
          micros: ["binomiale_intervalle", "binomiale_esperance_variance", "binomiale_defi"],
        },
        {
          titre: "Les deux ateliers",
          enonce:
            "Une usine a deux ateliers. L'atelier $A$ fait $60$ % des pièces, dont $3$ % sont défectueuses ; l'atelier $B$ fait les autres, dont $5{,}5$ % sont défectueuses.\na) Montrer que la probabilité qu'une pièce soit défectueuse vaut $0{,}04$.\nb) Un client prélève $25$ pièces dans un stock très grand ; on assimile ce prélèvement à un tirage avec remise. $X$ compte les pièces défectueuses. Quelle est la loi de $X$ ?\nc) Calculer $P(X = 0)$, $P(X \\leqslant 2)$ et $E(X)$.\nd) Le client refuse le lot s'il y trouve au moins $3$ pièces défectueuses. Quelle est la probabilité qu'il le refuse ?",
          correction:
            "a) Probabilités totales : $P(D) = 0{,}6 \\times 0{,}03 + 0{,}4 \\times 0{,}055$ $= 0{,}018 + 0{,}022 = 0{,}04$.\nb) Chaque pièce est défectueuse (succès) avec la probabilité $0{,}04$, et les $25$ prélèvements sont assimilés à des tirages indépendants : $X \\sim \\mathcal{B}(25 ; 0{,}04)$.\nc) $P(X = 0) = 0{,}96^{25} \\approx 0{,}360$.\n$P(X \\leqslant 2) \\approx 0{,}924$ (calculatrice) et $E(X) = 25 \\times 0{,}04 = 1$.\nd) « Au moins $3$ » : $P(X \\geqslant 3) = 1 - P(X \\leqslant 2) \\approx 0{,}076$.\nLe client refuse environ $8$ lots sur $100$, alors que la production n'a pas changé.\n⚠️ Le « succès » de la loi binomiale est ici un défaut : « succès » veut seulement dire « l'issue qu'on compte ».\n⭐ Sur le dessin : l'arbre donne $p = 0{,}04$ en additionnant les deux chemins qui finissent par $D$ ; la loi binomiale part de là.",
          schema: (
            <div className="grid grid-cols-1 min-w-0 gap-2">
              {arbre([
                { label: "A", proba: "0,6", enfants: [{ label: "D → 0,018", proba: "0,03" }, { label: "D̄", proba: "0,97" }] },
                { label: "B", proba: "0,4", enfants: [{ label: "D → 0,022", proba: "0,055" }, { label: "D̄", proba: "0,945" }] },
              ])}
              {ecranSeulement(diagramme("barres", [{ label: "0", value: 36 }, { label: "1", value: 38 }, { label: "2", value: 19 }, { label: "3", value: 6 }, { label: "4", value: 1 }, { label: "5", value: 0 }], 3))}
            </div>
          ),
          micros: ["binomiale_reconnaitre", "binomiale_calculer", "binomiale_defi"],
        },
        {
          titre: "L'avion en surréservation",
          enonce:
            "Un avion a $150$ places. Chaque personne qui a acheté un billet se présente à l'embarquement avec la probabilité $0{,}92$, indépendamment des autres. La compagnie vend $158$ billets ; $X$ compte les passagers qui se présentent.\na) Quelle loi suit $X$ ? Calculer $E(X)$ et $\\sigma(X)$.\nb) Il y a surréservation si $X > 150$. Calculer sa probabilité.\nc) La compagnie accepte un risque de surréservation d'au plus $5$ %. Combien de billets peut-elle vendre au maximum ?",
          correction:
            "a) $X \\sim \\mathcal{B}(158 ; 0{,}92)$. $E(X) = 158 \\times 0{,}92 = 145{,}36$.\n$V(X) = 145{,}36 \\times 0{,}08 \\approx 11{,}63$, donc $\\sigma(X) \\approx 3{,}41$.\nb) $P(X > 150) = 1 - P(X \\leqslant 150) \\approx 0{,}058$ (calculatrice).\nc) On refait le calcul en changeant le nombre de billets : $0{,}012$ pour $156$ billets, $0{,}028$ pour $157$, $0{,}058$ pour $158$.\nLe risque reste sous $5$ % jusqu'à $157$ billets : la compagnie peut en vendre $157$ au plus.\n⚠️ En moyenne, $145$ passagers se présentent, bien moins que $150$ : mais le risque vient des jours où beaucoup se présentent. $151$ passagers, c'est un peu plus d'un écart-type et demi au-dessus de la moyenne : ce n'est pas rare.\n⭐ Sur le tableau : chaque billet de plus fait plus que doubler le risque.",
          schema: tableau(["billets", "156", "157", "158"], ["P(X > 150)", "0,012", "0,028", "0,058"]),
          micros: ["binomiale_intervalle", "binomiale_esperance_variance", "binomiale_defi"],
        },
      ],
    },
  ],
};
