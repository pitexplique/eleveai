// ─── Fiche d'exercices : variables aléatoires réelles (1re spé) ───────────────
//                              20 exercices corrigés
//
// Feuille de 1re SPÉCIALITÉ du 29/09/2026, une par notion du coach. Alignée sur
// la banque `lib/tutor-v4/questionBank/premiere-spe/maths/variables-aleatoires.bank.ts`
// (notionId variables_aleatoires, dix micro-compétences).
//
// ⭐⭐ LE FIL : UNE VARIABLE ALÉATOIRE EST UNE FONCTION, ET SA LOI UN TABLEAU.
// On nomme ce qu'on compte (un gain net, un nombre de buts, un coût), on
// dresse la loi, puis deux nombres la résument : l'ESPÉRANCE (combien en
// moyenne) et l'ÉCART TYPE (à quel point ça varie). La variance se calcule
// par la définition, comme dans la banque ; E(aX + b) = aE(X) + b sert au
// vendeur (12) et au loueur de kayaks (20).
// ⛔ LES PIÈGES NOMMÉS : oublier la mise dans un gain net (3, 18), croire les
// valeurs équiprobables (1, 4, 14), la moyenne des valeurs au lieu de
// l'espérance (5), oublier la racine de l'écart type (6, 13), oublier le fixe
// dans E(aX + b) (12, 20).
//
// ⭐ LES DESSINS : tableaux de la loi, diagrammes en barres (valeurs entières,
// en % ou en effectifs), la roue et l'urne du jeu, la droite graduée avec
// l'espérance marquée en rouge (aide locale `droiteLoi`), l'arbre des deux
// tirages avec les chemins de {X = 1} en orange, le programme Python et le
// découpage de [0 ; 1[ qu'il fait. Ceux qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages).
//
// ⭐ LE MONDE : fête foraine, contrôle qualité des carrosseries, vendeur de vélos,
// football, assurance habitation, basket, loterie d'association, capture-
// recapture dans un lac, loueur de kayaks. Chiffres = MODÈLES.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-spe-variables-aleatoires.mjs`.
//
// Micro-compétences : va_definition (1, 14, 19), va_notation (2, 9, 14),
// va_modeliser (3, 10, 12, 17, 18, 20), va_loi (4, 9, 10, 14, 18, 20),
// va_esperance (5, 9, 10, 12, 14, 20), va_esperance_probleme (11, 15, 17, 18),
// va_variance (6, 13, 17), va_ecart_type (7, 13, 15, 17), va_simulation (8, 16,
// 19), va_echantillon (16, 19). 10/10.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { billes, diagramme, intervalles, programme, repere, roue, tableau, tableauProba, trace } from "@/lib/fiches-exercices/figures";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const VERT = "#16a34a";
const GRIS = "#94a3b8";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * LA DROITE GRADUÉE DE LA LOI : les valeurs de X (étiquetées par leur
 * probabilité, en bleu) et l'espérance en rouge. `intervalles()` de figures.tsx
 * ne dessine rien sans intervalle ; on sert donc le canvas `number_line` avec
 * des points seuls — il empile lui-même les étiquettes qui se touchent.
 * ⛔ Sept graduations au plus : les nombres à trois chiffres se touchent au-delà.
 * ⛔ Texte NU, vrai signe moins « − ».
 */
const droiteLoi = (min: number, max: number, pas: number, points: { value: number; label: string; color: string }[]) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer figure={{ kind: "number_line", min, max, step: pas, size: { width: 320, height: 90 }, intervalles: [], points, display: { showPoints: true, showPointLabels: true } }} />
  </div>
);

/** Un nœud de l'arbre. `chemin` colore la branche qui y MÈNE, et son étiquette. */
type Noeud = { label: string; proba: string; chemin?: boolean; enfants?: Noeud[] };

const CHEMIN = "#ea580c";

/**
 * L'ARBRE PONDÉRÉ AVEC SON CHEMIN EN COULEUR (même aide que la feuille des
 * probabilités conditionnelles de 1re spé) : géométrie du canvas `arbre_proba`,
 * branches `chemin` en orange épais par-dessus les autres. ⛔ Texte NU.
 */
function arbre(racine: Noeud[]) {
  const COL = [24, 168, 320];
  const LIGNE = 48;
  const MARGE = 24;
  const nbFeuilles = (n: Noeud): number => (n.enfants?.length ? n.enfants.reduce((s, e) => s + nbFeuilles(e), 0) : 1);
  const plusLongue = (ns: Noeud[]): number => Math.max(...ns.map((n) => (n.enfants?.length ? plusLongue(n.enfants) : n.label.length)));
  const largeur = Math.max(360, Math.ceil(COL[2] + 8 + plusLongue(racine) * 7.8 + 6));
  const hauteur = MARGE * 2 + racine.reduce((s, n) => s + nbFeuilles(n), 0) * LIGNE;
  type Place = { x: number; y: number; n: Noeud; enfants: Place[] };
  let curseur = 0;
  const placer = (n: Noeud, prof: number): Place => {
    const x = COL[Math.min(prof + 1, 2)];
    if (!n.enfants?.length) {
      const y = MARGE + (curseur + 0.5) * LIGNE;
      curseur += 1;
      return { x, y, n, enfants: [] };
    }
    const enfants = n.enfants.map((e) => placer(e, prof + 1));
    return { x, y: (enfants[0].y + enfants[enfants.length - 1].y) / 2, n, enfants };
  };
  const places = racine.map((n) => placer(n, 0));
  const depart = { x: COL[0], y: (places[0].y + places[places.length - 1].y) / 2 };
  const branches: { x1: number; y1: number; p: Place }[] = [];
  const parcourir = (x1: number, y1: number, p: Place) => {
    branches.push({ x1, y1, p });
    p.enfants.forEach((e) => parcourir(p.x, p.y, e));
  };
  places.forEach((p) => parcourir(depart.x, depart.y, p));
  const ordre = [...branches.filter((b) => !b.p.n.chemin), ...branches.filter((b) => b.p.n.chemin)];
  return (
    <div className="mx-auto w-full max-w-[23rem] overflow-x-auto print:max-w-[14rem] print:overflow-visible">
      <div className="min-w-[22.5rem] rounded-xl border border-slate-200 bg-white p-3 print:min-w-0">
        <svg viewBox={`0 0 ${largeur} ${hauteur}`} className="block h-auto w-full" role="img" aria-label="Arbre pondéré">
          <circle cx={depart.x} cy={depart.y} r={4} fill="#0f172a" />
          {ordre.map(({ x1, y1, p }, i) => {
            const vif = !!p.n.chemin;
            return (
              <g key={`b${i}`}>
                <line x1={x1} y1={y1} x2={p.x} y2={p.y} stroke={vif ? CHEMIN : "#475569"} strokeWidth={vif ? 3.5 : 1.8} />
                <text x={(x1 + p.x) / 2} y={(y1 + p.y) / 2 - 5} textAnchor="middle" fontSize="12" fontWeight="700" fill={vif ? CHEMIN : "#2563eb"} stroke="white" strokeWidth="3" paintOrder="stroke">
                  {p.n.proba}
                </text>
              </g>
            );
          })}
          {branches.map(({ p }, i) => {
            const feuille = p.enfants.length === 0;
            return (
              <text key={`n${i}`} x={feuille ? p.x + 8 : p.x} y={feuille ? p.y + 5 : p.y - 13} textAnchor={feuille ? "start" : "middle"} fontSize="14" fontWeight="900" fill={p.n.chemin ? CHEMIN : "#0f172a"} stroke="white" strokeWidth="2.5" paintOrder="stroke">
                {p.n.label}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export const exercicesVariablesAleatoiresPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "variables-aleatoires",
  titre: "Variables aléatoires réelles",
  accroche:
    "Vingt exercices, du geste seul au problème de contrôle : définir une variable aléatoire, lire les notations, dresser une loi, calculer espérance, variance et écart type, décider si un jeu est équitable, simuler avec Python et comparer la moyenne d'un échantillon à l'espérance. Roue de fête foraine, assurance, basket, loterie, poissons d'un lac, loueur de kayaks. L'espérance est marquée en rouge sur la droite graduée des corrigés.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une définition, une lecture, un calcul.",
      rappel: [
        "Une VARIABLE ALÉATOIRE $X$ associe un nombre réel à chaque issue de l'expérience. $\\{X = a\\}$ est l'événement « $X$ prend la valeur $a$ ».",
        "La LOI de $X$ : le tableau des valeurs $x_i$ et des probabilités $p_i = P(X = x_i)$, dont la somme vaut $1$.",
        "ESPÉRANCE : $E(X) = \\sum p_i x_i$, la moyenne des valeurs pondérée par leurs probabilités.",
        "VARIANCE : $V(X) = \\sum p_i \\left(x_i - E(X)\\right)^2$ ; ÉCART TYPE : $\\sigma(X) = \\sqrt{V(X)}$. Il mesure la dispersion autour de $E(X)$.",
      ],
      exercices: [
        {
          enonce:
            "On lance deux pièces équilibrées et on note les deux côtés obtenus. Les issues s'écrivent PP, PF, FP, FF (P pour pile, F pour face). $X$ est le nombre de « pile ».\na) Donner la valeur de $X$ pour chaque issue.\nb) Quelles valeurs $X$ peut-elle prendre ?\nc) Quelles issues forment l'événement $\\{X = 1\\}$ ? Quelle est sa probabilité ?",
          correction:
            "a) $X$ compte les « pile » de chaque issue (tableau) : PP donne $X = 2$ ; PF et FP donnent $X = 1$ ; FF donne $X = 0$.\nb) $X$ prend les valeurs $0$, $1$ et $2$.\nc) $\\{X = 1\\}$ est formé des issues PF et FP : deux issues sur quatre, équiprobables, donc $P(X = 1) = \\dfrac{2}{4} = \\dfrac{1}{2}$.\n⭐ Une variable aléatoire est une FONCTION : à chaque issue, un nombre. Deux issues peuvent donner le même nombre.\n⛔ Le piège : croire que $X$ prend ses trois valeurs avec la même probabilité $\\dfrac{1}{3}$. La valeur $1$ vient de deux issues.",
          schema: tableau(["Issue", "PP", "PF", "FP", "FF"], ["X", 2, 1, 1, 0]),
          micros: ["va_definition"],
        },
        {
          enonce:
            "Une variable aléatoire $X$ prend les valeurs $-2$, $0$, $1$ et $3$ avec les probabilités respectives $0{,}1$ ; $0{,}3$ ; $0{,}4$ et $0{,}2$. Calculer :\na) $P(X = 1)$ ;\nb) $P(X \\leqslant 0)$ ;\nc) $P(X > 0)$ ;\nd) $P(-1 < X < 2)$.",
          figure: ecranSeulement(tableau(["x", "−2", "0", "1", "3"], ["P(X = x)", "0,1", "0,3", "0,4", "0,2"])),
          correction:
            "a) On lit la case : $P(X = 1) = 0{,}4$.\nb) « $X \\leqslant 0$ » regroupe les valeurs $-2$ et $0$ : $P(X \\leqslant 0) = 0{,}1 + 0{,}3 = 0{,}4$.\nc) « $X > 0$ » est le contraire de « $X \\leqslant 0$ » : $P(X > 0) = 1 - 0{,}4 = 0{,}6$.\nd) Entre $-1$ et $2$ exclus, $X$ ne prend que les valeurs $0$ et $1$ : $P(-1 < X < 2) = 0{,}3 + 0{,}4 = 0{,}7$.\n⛔ Le piège au d) : chercher $-1$ et $2$ dans le tableau. $X$ ne prend jamais ces valeurs ; on garde les valeurs de $X$ situées ENTRE les deux.\n⭐ Sur le diagramme (en %), $P(X > 0)$ est la hauteur totale des barres à droite de $0$ : $40 + 20 = 60$.",
          schema: ecranSeulement(diagramme("barres", [{ label: "−2", value: 10 }, { label: "0", value: 30 }, { label: "1", value: 40 }, { label: "3", value: 20 }])),
          micros: ["va_notation"],
        },
        {
          enonce:
            "À une fête, on paie $3$ € pour faire tourner une roue. Rouge (la moitié de la roue) : on ne reçoit rien. Bleu (un tiers) : on reçoit $2$ €. Vert (un sixième) : on reçoit $10$ €. $G$ est le gain NET du joueur, mise déduite.\na) Quelles valeurs $G$ peut-elle prendre ?\nb) Donner la loi de $G$.",
          figure: ecranSeulement(roue([{ label: "0 €", poids: 3, couleur: ROUGE }, { label: "2 €", poids: 2, couleur: BLEU }, { label: "10 €", poids: 1, couleur: VERT }])),
          correction:
            "a) Gain net = somme reçue − mise.\nRouge : $0 - 3 = -3$ €. Bleu : $2 - 3 = -1$ €. Vert : $10 - 3 = 7$ €.\n$G$ prend les valeurs $-3$, $-1$ et $7$.\nb) $P(G = -3) = \\dfrac{1}{2}$, $P(G = -1) = \\dfrac{1}{3}$, $P(G = 7) = \\dfrac{1}{6}$.\n✔️ Somme : $\\dfrac{3}{6} + \\dfrac{2}{6} + \\dfrac{1}{6} = 1$.\n⛔ Le piège : oublier la mise, et donner $0$, $2$, $10$. Ce sont les sommes REÇUES, pas les gains nets.\n⭐ Même avec le bleu, on perd de l'argent : recevoir $2$ € après en avoir payé $3$, c'est perdre $1$ €.",
          schema: ecranSeulement(tableau(["g (en €)", "−3", "−1", "7"], ["P(G = g)", "1/2", "1/3", "1/6"])),
          micros: ["va_modeliser"],
        },
        {
          enonce: "Un sac contient $10$ jetons : $5$ portent le nombre $0$, $3$ le nombre $2$ et $2$ le nombre $5$. On tire un jeton au hasard ; $X$ est le nombre inscrit. Déterminer la loi de $X$.",
          figure: ecranSeulement(billes([{ label: "0", couleur: GRIS }, { label: "0", couleur: GRIS }, { label: "0", couleur: GRIS }, { label: "0", couleur: GRIS }, { label: "0", couleur: GRIS }, { label: "2", couleur: BLEU }, { label: "2", couleur: BLEU }, { label: "2", couleur: BLEU }, { label: "5", couleur: VERT }, { label: "5", couleur: VERT }])),
          correction:
            "Chaque jeton a la même chance d'être tiré, $\\dfrac{1}{10}$.\n$P(X = 0) = \\dfrac{5}{10} = 0{,}5$ ; $P(X = 2) = \\dfrac{3}{10} = 0{,}3$ ; $P(X = 5) = \\dfrac{2}{10} = 0{,}2$.\n✔️ $0{,}5 + 0{,}3 + 0{,}2 = 1$ : une loi fait toujours $1$.\n⭐ Le diagramme en barres de la loi : la hauteur de chaque barre est une probabilité, ici en %.\n⛔ Le piège : donner $\\dfrac{1}{3}$ à chaque valeur parce qu'il y a trois nombres différents. Ce sont les jetons qui sont équiprobables, pas les nombres.",
          schema: diagramme("barres", [{ label: "0", value: 50 }, { label: "2", value: 30 }, { label: "5", value: 20 }]),
          micros: ["va_loi"],
        },
        {
          enonce: "$X$ prend les valeurs $-2$, $0$, $1$ et $3$ avec les probabilités $0{,}1$ ; $0{,}3$ ; $0{,}4$ et $0{,}2$ (la loi de l'exercice 2). Calculer $E(X)$, puis placer ce nombre sur une droite graduée.",
          correction:
            "On multiplie chaque valeur par sa probabilité, puis on additionne.\n$E(X) = -2 \\times 0{,}1 + 0 \\times 0{,}3 + 1 \\times 0{,}4 + 3 \\times 0{,}2 = -0{,}2 + 0 + 0{,}4 + 0{,}6 = 0{,}8$.\n⭐ $E(X)$ est un point d'équilibre : des masses $0{,}1$ ; $0{,}3$ ; $0{,}4$ ; $0{,}2$ posées sur la droite (en bleu) tiendraient en équilibre en $0{,}8$ (en rouge).\n⭐ Sur un très grand nombre de tirages, la moyenne des valeurs obtenues sera proche de $0{,}8$.\n⛔ Le piège : faire la moyenne des valeurs, $\\dfrac{-2 + 0 + 1 + 3}{4} = 0{,}5$, sans tenir compte des probabilités.",
          schema: droiteLoi(-3, 4, 1, [{ value: -2, label: "0,1", color: BLEU }, { value: 0, label: "0,3", color: BLEU }, { value: 1, label: "0,4", color: BLEU }, { value: 3, label: "0,2", color: BLEU }, { value: 0.8, label: "E = 0,8", color: ROUGE }]),
          micros: ["va_esperance"],
        },
        {
          enonce: "Même loi qu'à l'exercice 5, d'espérance $E(X) = 0{,}8$. Calculer la variance $V(X)$ avec la définition, puis l'écart type $\\sigma(X)$.",
          correction:
            "Pour chaque valeur : l'écart à l'espérance, son carré, puis ce carré multiplié par la probabilité (tableau).\n$x = -2$ : écart $-2{,}8$, carré $7{,}84$, pondéré $0{,}1 \\times 7{,}84 = 0{,}784$.\n$x = 0$ : écart $-0{,}8$, carré $0{,}64$, pondéré $0{,}3 \\times 0{,}64 = 0{,}192$.\n$x = 1$ : écart $0{,}2$, carré $0{,}04$, pondéré $0{,}4 \\times 0{,}04 = 0{,}016$.\n$x = 3$ : écart $2{,}2$, carré $4{,}84$, pondéré $0{,}2 \\times 4{,}84 = 0{,}968$.\n$V(X) = 0{,}784 + 0{,}192 + 0{,}016 + 0{,}968 = 1{,}96$, et $\\sigma(X) = \\sqrt{1{,}96} = 1{,}4$.\n⭐ Le carré rend tous les écarts positifs : sans lui, les écarts se compenseraient, et leur somme pondérée ferait toujours $0$.\n⛔ Le piège : oublier la racine. La variance est en « unités au carré » ; l'écart type revient à l'unité de $X$.",
          schema: trace(["x", "p", "x − E", "carré", "p × carré"], [["−2", "0,1", "−2,8", "7,84", "0,784"], ["0", "0,3", "−0,8", "0,64", "0,192"], ["1", "0,4", "0,2", "0,04", "0,016"], ["3", "0,2", "2,2", "4,84", "0,968"], ["Total", "1", "", "", "1,96"]]),
          micros: ["va_variance"],
        },
        {
          enonce:
            "Deux jeux ont la même espérance de gain. Jeu A : on perd ou on gagne $2$ €, avec la probabilité $0{,}5$ chacun ; son gain est noté $X$. Jeu B : on perd $10$ € avec la probabilité $0{,}1$, on gagne $10$ € avec la probabilité $0{,}1$, et sinon le gain est nul ; son gain est noté $Y$.\na) Vérifier que $E(X) = E(Y) = 0$.\nb) Calculer $\\sigma(X)$ et $\\sigma(Y)$.\nc) Quel jeu est le plus risqué ?",
          correction:
            "a) $E(X) = -2 \\times 0{,}5 + 2 \\times 0{,}5 = 0$ et $E(Y) = -10 \\times 0{,}1 + 0 \\times 0{,}8 + 10 \\times 0{,}1 = 0$.\nb) L'espérance est nulle : les écarts sont les valeurs elles-mêmes.\n$V(X) = 0{,}5 \\times (-2)^2 + 0{,}5 \\times 2^2 = 4$, donc $\\sigma(X) = 2$.\n$V(Y) = 0{,}1 \\times (-10)^2 + 0{,}8 \\times 0^2 + 0{,}1 \\times 10^2 = 20$, donc $\\sigma(Y) = \\sqrt{20} \\approx 4{,}47$.\nc) Le jeu B : ses gains s'écartent davantage de la moyenne. On y gagne ou on y perd rarement, mais gros (diagrammes, en % : d'abord $X$, puis $Y$).\n⭐ L'espérance dit « combien en moyenne » ; l'écart type dit « à quel point ça varie ». Deux jeux de même espérance peuvent être très différents.\n⛔ Le piège : conclure que les jeux se valent parce que $E(X) = E(Y)$.",
          schema: ecranSeulement(
            <div className="grid min-w-0 grid-cols-1 gap-2">
              {diagramme("batons", [{ label: "−2", value: 50 }, { label: "2", value: 50 }])}
              {diagramme("batons", [{ label: "−10", value: 10 }, { label: "0", value: 80 }, { label: "10", value: 10 }])}
            </div>,
          ),
          micros: ["va_ecart_type"],
        },
        {
          enonce: "La fonction Python ci-dessous simule une variable aléatoire $X$. La fonction random() renvoie un nombre au hasard dans l'intervalle $[0 ; 1[$.\na) Quelles valeurs la fonction peut-elle renvoyer ?\nb) Donner la loi de $X$.",
          figure: programme(["from random import random", "", "def tirage():", "    u = random()", "    if u < 0.5:", "        return 0", "    elif u < 0.8:", "        return 2", "    else:", "        return 5"]),
          correction:
            "a) La fonction renvoie $0$, $2$ ou $5$.\nb) $u$ est tiré au hasard dans $[0 ; 1[$ : la probabilité qu'il tombe dans un intervalle est la LONGUEUR de cet intervalle.\n$u < 0{,}5$ : longueur $0{,}5$, donc $P(X = 0) = 0{,}5$.\n$0{,}5 \\leqslant u < 0{,}8$ : longueur $0{,}3$, donc $P(X = 2) = 0{,}3$.\n$u \\geqslant 0{,}8$ : longueur $0{,}2$, donc $P(X = 5) = 0{,}2$.\n⭐ C'est la loi du sac de jetons de l'exercice 4 : ce programme remplace le sac.\n⛔ Le piège : lire « $u < 0{,}8$ » comme une probabilité de $0{,}8$ pour la valeur $2$. La ligne elif n'est lue que si $u \\geqslant 0{,}5$ : il reste la tranche de $0{,}5$ à $0{,}8$.",
          schema: ecranSeulement(intervalles(0, 1, [{ de: 0, a: 0.5, deInclus: true, label: "X = 0", color: BLEU }, { de: 0.5, a: 0.8, deInclus: true, label: "X = 2", color: CHEMIN }, { de: 0.8, a: 1, deInclus: true, label: "X = 5", color: VERT }], 0.2)),
          micros: ["va_simulation"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : nommer la variable, dresser la loi, calculer, interpréter.",
      rappel: [
        "Une loi avec une inconnue : la somme des probabilités vaut $1$, c'est l'équation.",
        "Un jeu est ÉQUITABLE quand l'espérance du gain net est nulle. Si $E(G) < 0$, il est défavorable au joueur.",
        "Si $Y = aX + b$ ($a$ et $b$ réels), alors $E(Y) = aE(X) + b$ : un prix unitaire et un fixe se reportent directement sur l'espérance.",
        "Sur un grand nombre de répétitions, la MOYENNE des valeurs obtenues est proche de $E(X)$ : c'est ce que montre une simulation.",
      ],
      exercices: [
        {
          enonce:
            "Un contrôleur compte les défauts de peinture d'une carrosserie de voiture. Le nombre $X$ de défauts vaut $0$, $1$, $2$ ou $3$, avec les probabilités $0{,}6$ ; $0{,}25$ ; $a$ et $2a$, où $a$ est un réel.\na) Calculer $a$.\nb) Calculer $P(X \\geqslant 1)$ et interpréter.\nc) Calculer $E(X)$ et interpréter.",
          figure: ecranSeulement(tableau(["x", "0", "1", "2", "3"], ["P(X = x)", "0,6", "0,25", "a", "2a"])),
          correction:
            "a) La somme des probabilités vaut $1$ : $0{,}6 + 0{,}25 + a + 2a = 1$, donc $3a = 0{,}15$ et $a = 0{,}05$.\nD'où $P(X = 2) = 0{,}05$ et $P(X = 3) = 0{,}1$.\nb) $P(X \\geqslant 1) = 1 - P(X = 0) = 1 - 0{,}6 = 0{,}4$ : $40$ % des carrosseries ont au moins un défaut.\nc) $E(X) = 0 \\times 0{,}6 + 1 \\times 0{,}25 + 2 \\times 0{,}05 + 3 \\times 0{,}1 = 0{,}25 + 0{,}1 + 0{,}3 = 0{,}65$.\nEn moyenne $0{,}65$ défaut par carrosserie, soit $65$ défauts pour $100$ voitures.\n⭐ $0{,}65$ n'est pas une valeur de $X$ : une espérance n'a pas à être une valeur possible.\n⛔ Le piège au a) : écrire $0{,}6 + 0{,}25 + a + a = 1$, comme si les deux dernières cases valaient $a$. On trouverait $a = 0{,}075$ : faux.",
          schema: ecranSeulement(diagramme("barres", [{ label: "0", value: 60 }, { label: "1", value: 25 }, { label: "2", value: 5 }, { label: "3", value: 10 }])),
          micros: ["va_loi", "va_notation", "va_esperance"],
        },
        {
          enonce:
            "Une urne contient $3$ boules rouges et $2$ boules noires. On tire une boule, on la garde, puis on en tire une seconde. $X$ est le nombre de boules rouges obtenues.\na) Construire l'arbre pondéré.\nb) Déterminer la loi de $X$.\nc) Calculer $E(X)$.",
          figure: ecranSeulement(billes([{ couleur: ROUGE }, { couleur: ROUGE }, { couleur: ROUGE }, { couleur: "#0f172a" }, { couleur: "#0f172a" }])),
          correction:
            "a) Premier tirage : $P(R_1) = \\dfrac{3}{5}$, $P(N_1) = \\dfrac{2}{5}$. Au second tirage, il ne reste que $4$ boules.\nAprès une rouge : $2$ rouges et $2$ noires, donc $\\dfrac{2}{4}$ et $\\dfrac{2}{4}$. Après une noire : $3$ rouges et $1$ noire, donc $\\dfrac{3}{4}$ et $\\dfrac{1}{4}$.\nb) $X = 2$ : un seul chemin, $R_1 R_2$, de probabilité $\\dfrac{3}{5} \\times \\dfrac{2}{4} = \\dfrac{6}{20} = 0{,}3$.\n$X = 0$ : le chemin $N_1 N_2$, de probabilité $\\dfrac{2}{5} \\times \\dfrac{1}{4} = \\dfrac{2}{20} = 0{,}1$.\n$X = 1$ : deux chemins (en orange), $R_1 N_2$ et $N_1 R_2$ : $\\dfrac{6}{20} + \\dfrac{6}{20} = 0{,}6$.\n✔️ $0{,}1 + 0{,}6 + 0{,}3 = 1$.\nc) $E(X) = 0 \\times 0{,}1 + 1 \\times 0{,}6 + 2 \\times 0{,}3 = 1{,}2$.\n⭐ En moyenne $1{,}2$ rouge sur $2$ boules, soit $60$ % : exactement la part des rouges dans l'urne.\n⛔ Le piège : garder $\\dfrac{3}{5}$ au second tirage. Sans remise, l'urne a changé.",
          schema: arbre([{ label: "R1", proba: "3/5", chemin: true, enfants: [{ label: "R2 → 0,3", proba: "2/4" }, { label: "N2 → 0,3", proba: "2/4", chemin: true }] }, { label: "N1", proba: "2/5", chemin: true, enfants: [{ label: "R2 → 0,3", proba: "3/4", chemin: true }, { label: "N2 → 0,1", proba: "1/4" }] }]),
          micros: ["va_loi", "va_modeliser", "va_esperance"],
        },
        {
          enonce:
            "Une roue de loterie a $8$ secteurs égaux : $1$ secteur fait recevoir $20$ €, $2$ secteurs font recevoir $6$ €, les $5$ autres rien. Le joueur paie une mise de $m$ euros.\na) Calculer l'espérance de la somme REÇUE.\nb) Pour quelle mise le jeu est-il équitable ?\nc) L'organisateur fixe la mise à $5$ €. Donner la loi du gain net $G$, calculer $E(G)$ et interpréter.",
          figure: ecranSeulement(roue([{ label: "20 €", poids: 1, couleur: VERT }, { label: "0 €", poids: 1, couleur: GRIS }, { label: "6 €", poids: 1, couleur: BLEU }, { label: "0 €", poids: 1, couleur: GRIS }, { label: "0 €", poids: 1, couleur: GRIS }, { label: "6 €", poids: 1, couleur: BLEU }, { label: "0 €", poids: 1, couleur: GRIS }, { label: "0 €", poids: 1, couleur: GRIS }])),
          correction:
            "a) Soit $R$ la somme reçue : $P(R = 20) = \\dfrac{1}{8}$, $P(R = 6) = \\dfrac{2}{8}$, $P(R = 0) = \\dfrac{5}{8}$.\n$E(R) = 20 \\times \\dfrac{1}{8} + 6 \\times \\dfrac{2}{8} + 0 \\times \\dfrac{5}{8} = \\dfrac{20 + 12}{8} = 4$ €.\nb) Le gain net est $G = R - m$. Le jeu est équitable si $E(G) = 0$, c'est-à-dire si la mise vaut ce qu'on reçoit en moyenne : $m = 4$ €.\nc) Avec $m = 5$ : $G$ vaut $15$, $1$ ou $-5$, avec les probabilités $\\dfrac{1}{8}$, $\\dfrac{2}{8}$ et $\\dfrac{5}{8}$.\n$E(G) = 15 \\times \\dfrac{1}{8} + 1 \\times \\dfrac{2}{8} - 5 \\times \\dfrac{5}{8} = \\dfrac{15 + 2 - 25}{8} = -1$ €.\nEn moyenne, le joueur perd $1$ € par partie ; sur $1\\,000$ parties, l'organisateur gagne environ $1\\,000$ €.\n⭐ Plus vite : $G = R - 5$, donc $E(G) = E(R) - 5 = 4 - 5 = -1$.\n⛔ Le piège : dire « le jeu est équitable car on peut gagner $15$ € ». Gagner est POSSIBLE ; en moyenne, on perd.",
          schema: ecranSeulement(droiteLoi(-10, 15, 5, [{ value: -5, label: "5/8", color: BLEU }, { value: 1, label: "2/8", color: BLEU }, { value: 15, label: "1/8", color: BLEU }, { value: -1, label: "E = −1", color: ROUGE }])),
          micros: ["va_esperance_probleme"],
        },
        {
          enonce:
            "Un vendeur de vélos électriques vend $X$ vélos par jour, avec $P(X = 0) = 0{,}3$, $P(X = 1) = 0{,}4$, $P(X = 2) = 0{,}2$ et $P(X = 3) = 0{,}1$. Il gagne chaque jour un fixe de $50$ €, plus une prime de $120$ € par vélo vendu. $S$ est son gain du jour, en euros.\na) Calculer $E(X)$.\nb) Exprimer $S$ en fonction de $X$, puis donner la loi de $S$.\nc) Calculer $E(S)$ de deux façons.",
          figure: ecranSeulement(tableau(["x", "0", "1", "2", "3"], ["P(X = x)", "0,3", "0,4", "0,2", "0,1"])),
          correction:
            "a) $E(X) = 0 \\times 0{,}3 + 1 \\times 0{,}4 + 2 \\times 0{,}2 + 3 \\times 0{,}1 = 0{,}4 + 0{,}4 + 0{,}3 = 1{,}1$ vélo.\nb) $S = 50 + 120X$. Quand $X$ vaut $0$, $1$, $2$, $3$, $S$ vaut $50$, $170$, $290$, $410$ €, avec les MÊMES probabilités (tableau).\nc) Par la loi de $S$ : $E(S) = 50 \\times 0{,}3 + 170 \\times 0{,}4 + 290 \\times 0{,}2 + 410 \\times 0{,}1 = 15 + 68 + 58 + 41 = 182$ €.\nPar la règle $E(aX + b) = aE(X) + b$ : $E(S) = 120 \\times 1{,}1 + 50 = 182$ €.\n⭐ La règle évite de refaire la loi : ce qui arrive à chaque valeur arrive à la moyenne.\n⛔ Le piège : écrire $E(S) = 120 \\times 1{,}1 = 132$ €, en oubliant le fixe, touché chaque jour.",
          schema: tableau(["s (en €)", "50", "170", "290", "410"], ["P(S = s)", "0,3", "0,4", "0,2", "0,1"]),
          micros: ["va_esperance", "va_modeliser"],
        },
        {
          enonce:
            "Le nombre $X$ de buts marqués par une équipe de football lors d'un match suit la loi : $P(X = 0) = 0{,}2$, $P(X = 1) = 0{,}4$, $P(X = 2) = 0{,}3$, $P(X = 3) = 0{,}1$.\na) Calculer $E(X)$, $V(X)$ et $\\sigma(X)$.\nb) Calculer la probabilité que $X$ soit compris entre $E(X) - \\sigma(X)$ et $E(X) + \\sigma(X)$.",
          figure: ecranSeulement(diagramme("barres", [{ label: "0", value: 20 }, { label: "1", value: 40 }, { label: "2", value: 30 }, { label: "3", value: 10 }])),
          correction:
            "a) $E(X) = 0 \\times 0{,}2 + 1 \\times 0{,}4 + 2 \\times 0{,}3 + 3 \\times 0{,}1 = 1{,}3$ but.\n$V(X) = 0{,}2 \\times (0 - 1{,}3)^2 + 0{,}4 \\times (1 - 1{,}3)^2 + 0{,}3 \\times (2 - 1{,}3)^2 + 0{,}1 \\times (3 - 1{,}3)^2$.\n$V(X) = 0{,}2 \\times 1{,}69 + 0{,}4 \\times 0{,}09 + 0{,}3 \\times 0{,}49 + 0{,}1 \\times 2{,}89 = 0{,}338 + 0{,}036 + 0{,}147 + 0{,}289 = 0{,}81$.\n$\\sigma(X) = \\sqrt{0{,}81} = 0{,}9$ but.\nb) $E(X) - \\sigma(X) = 0{,}4$ et $E(X) + \\sigma(X) = 2{,}2$. Les valeurs de $X$ dans cet intervalle sont $1$ et $2$.\n$P(0{,}4 \\leqslant X \\leqslant 2{,}2) = 0{,}4 + 0{,}3 = 0{,}7$.\n⭐ L'intervalle $[E - \\sigma ; E + \\sigma]$ contient ici $70$ % des matchs : c'est le nombre de buts « habituel ».\n⛔ Le piège : $\\sigma = 0{,}81$. C'est la variance ; l'écart type est sa racine.",
          schema: ecranSeulement(droiteLoi(0, 3, 1, [{ value: 0.4, label: "E − σ = 0,4", color: CHEMIN }, { value: 1.3, label: "E = 1,3", color: ROUGE }, { value: 2.2, label: "E + σ = 2,2", color: CHEMIN }])),
          micros: ["va_variance", "va_ecart_type"],
        },
        {
          enonce:
            "On lance deux dés équilibrés à six faces ; $X$ est le plus grand des deux résultats (si les dés sont égaux, c'est ce nombre).\na) Dresser le tableau des $36$ issues avec la valeur de $X$ (ligne : premier dé ; colonne : second dé).\nb) Déterminer la loi de $X$.\nc) Calculer $P(X \\leqslant 3)$ et $E(X)$.",
          correction:
            "a) La case de la ligne $i$ et de la colonne $j$ contient le plus grand des deux nombres (tableau).\nb) Les $36$ issues sont équiprobables. On compte les cases : $1$ case vaut $1$, $3$ valent $2$, $5$ valent $3$, $7$ valent $4$, $9$ valent $5$, $11$ valent $6$.\n$P(X = k) = \\dfrac{2k - 1}{36}$ : $\\dfrac{1}{36}$, $\\dfrac{3}{36}$, $\\dfrac{5}{36}$, $\\dfrac{7}{36}$, $\\dfrac{9}{36}$, $\\dfrac{11}{36}$.\nc) $\\{X \\leqslant 3\\}$ : les deux dés font au plus $3$. Ce sont les $9$ cases en couleur : $P(X \\leqslant 3) = \\dfrac{9}{36} = 0{,}25$.\nOn additionne d'abord les produits : $1 \\times 1 + 2 \\times 3 + 3 \\times 5$ $+ 4 \\times 7 + 5 \\times 9 + 6 \\times 11 = 161$.\nPuis $E(X) = \\dfrac{161}{36} \\approx 4{,}47$.\n⭐ Le plus grand des deux dés dépasse en moyenne $3{,}5$, la moyenne d'un seul dé : prendre le maximum favorise les grandes valeurs. Le diagramme compte les cases.\n⛔ Le piège : croire que les six valeurs sont équiprobables. La valeur $6$ sort $11$ fois plus souvent que la valeur $1$.",
          schema: (
            <div className="grid min-w-0 grid-cols-1 gap-2">
              {tableauProba(["", "1", "2", "3", "4", "5", "6"], [["1", "1", "2", "3", "4", "5", "6"], ["2", "2", "2", "3", "4", "5", "6"], ["3", "3", "3", "3", "4", "5", "6"], ["4", "4", "4", "4", "4", "5", "6"], ["5", "5", "5", "5", "5", "5", "6"], ["6", "6", "6", "6", "6", "6", "6"]], [[0, 1], [0, 2], [0, 3], [1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3]])}
              {ecranSeulement(diagramme("barres", [{ label: "1", value: 1 }, { label: "2", value: 3 }, { label: "3", value: 5 }, { label: "4", value: 7 }, { label: "5", value: 9 }, { label: "6", value: 11 }]))}
            </div>
          ),
          micros: ["va_definition", "va_notation", "va_loi", "va_esperance"],
        },
        {
          enonce:
            "Une assurance habitation modélise le coût annuel $X$ d'un client, en euros : $0$ € avec la probabilité $0{,}9$ ; $1\\,000$ € (petit sinistre) avec $0{,}08$ ; $20\\,000$ € (gros sinistre) avec $0{,}02$.\na) Calculer $E(X)$.\nb) La cotisation annuelle est de $600$ €. Quel est le gain moyen de l'assureur par client ? Pour $10\\,000$ clients ?\nc) On donne $\\sigma(X) \\approx 2\\,802$ €. Pourquoi l'assureur ne pourrait-il pas assurer un seul client sans risque ?",
          figure: ecranSeulement(diagramme("barres", [{ label: "0 €", value: 90 }, { label: "1 000 €", value: 8 }, { label: "20 000 €", value: 2 }])),
          correction:
            "a) $E(X) = 0 \\times 0{,}9 + 1\\,000 \\times 0{,}08 + 20\\,000 \\times 0{,}02 = 80 + 400 = 480$ €.\nb) Pour un client, l'assureur gagne $600 - X$ ; en moyenne $600 - 480 = 120$ €.\nPour $10\\,000$ clients : environ $10\\,000 \\times 120 = 1\\,200\\,000$ € par an.\nc) Pour UN client, l'écart type ($2\\,802$ €) est énorme devant la moyenne ($480$ €) : une année, le coût peut être de $20\\,000$ €, soit une perte de $19\\,400$ €.\nAvec beaucoup de clients, les sinistres des uns sont payés par les cotisations des autres : le coût MOYEN par client se rapproche de $480$ €. C'est le principe de l'assurance.\n⭐ L'espérance fixe le prix ; l'écart type mesure le risque. Sur la droite, $E$ (en rouge) et la cotisation $c$ : l'écart entre les deux est la marge moyenne.\n⛔ Le piège : croire que l'assureur gagne $120$ € sur chaque client. Il perd beaucoup sur quelques-uns et gagne $600$ € sur tous les autres.",
          schema: ecranSeulement(droiteLoi(0, 1000, 200, [{ value: 480, label: "E = 480", color: ROUGE }, { value: 600, label: "c = 600", color: BLEU }])),
          micros: ["va_esperance_probleme", "va_ecart_type"],
        },
        {
          enonce:
            "À un jeu, on lance un dé : sur un $6$, on gagne $4$ € ; sinon, on perd $1$ €. Le programme simule $n$ parties et renvoie la moyenne des gains.\na) Calculer l'espérance $E(G)$ du gain d'une partie.\nb) Une exécution de moyenne(n) a affiché les résultats du tableau. Commenter.\nc) Que devrait afficher moyenne(100000), environ ?",
          figure: (
            <div className="grid min-w-0 grid-cols-1 gap-2">
              {programme(["from random import randint", "", "def partie():", "    if randint(1, 6) == 6:", "        return 4", "    return -1", "", "def moyenne(n):", "    s = 0", "    for i in range(n):", "        s = s + partie()", "    return s / n"])}
              {tableau(["n", "10", "100", "1 000", "10 000"], ["moyenne", "0,5", "−0,05", "−0,185", "−0,167"])}
            </div>
          ),
          correction:
            "a) $P(G = 4) = \\dfrac{1}{6}$ et $P(G = -1) = \\dfrac{5}{6}$.\n$E(G) = 4 \\times \\dfrac{1}{6} - 1 \\times \\dfrac{5}{6} = -\\dfrac{1}{6} \\approx -0{,}167$ €.\nb) Pour $n = 10$, la moyenne ($0{,}5$) est loin de $E(G)$ : trois « 6 » en dix lancers, c'est de la chance. Plus $n$ grandit, plus la moyenne se rapproche de $-0{,}167$ ; pour $n = 10\\,000$, on lit justement $-0{,}167$.\nc) Environ $-0{,}17$ : la moyenne d'un grand échantillon est proche de l'espérance.\n⭐ Sur le graphique, l'abscisse $k$ correspond à $n = 10^k$ ; la ligne horizontale marque $E(G)$. Les moyennes s'en approchent.\n⛔ Le piège : croire que la moyenne vaudra EXACTEMENT $-0{,}167$ à chaque exécution. Elle fluctue, de moins en moins quand $n$ grandit. Sur $10$ parties, tout peut arriver.",
          schema: ecranSeulement(repere([0, 5, -1, 1], [{ pts: [[1, 0.5], [2, -0.05], [3, -0.185], [4, -0.167]] }], [], -0.167)),
          micros: ["va_simulation", "va_echantillon"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle : nommer la variable, sa loi, ses deux nombres, puis une décision.",
      rappel: [
        "Modéliser : NOMMER la variable (« $G$ : le gain net, en euros »), lister ses valeurs, puis dresser sa loi.",
        "Pour comparer deux choix : d'abord l'espérance (lequel rapporte le plus en moyenne), puis l'écart type (lequel est le plus risqué).",
        "Une fréquence observée sur un grand échantillon est proche de la probabilité ; une moyenne observée, proche de l'espérance.",
      ],
      exercices: [
        {
          titre: "Deux points ou trois points ?",
          enonce:
            "En fin de match, une basketteuse peut tenter un tir à deux points, réussi $50$ % du temps, ou un tir à trois points, réussi $35$ % du temps. $X$ est le nombre de points marqués avec un tir à deux points, $Y$ avec un tir à trois points.\na) Donner les lois de $X$ et de $Y$, puis $E(X)$ et $E(Y)$. Quel tir rapporte le plus en moyenne ?\nb) Calculer $\\sigma(X)$ et $\\sigma(Y)$. Quel tir est le plus risqué ?\nc) Il reste une seconde, et son équipe est menée de $2$ points. En prolongation, on estime que son équipe gagne une fois sur deux. Quel tir doit-elle tenter pour avoir le plus de chances de GAGNER ?",
          correction:
            "a) $X$ vaut $2$ (probabilité $0{,}5$) ou $0$ ($0{,}5$) : $E(X) = 2 \\times 0{,}5 = 1$ point.\n$Y$ vaut $3$ ($0{,}35$) ou $0$ ($0{,}65$) : $E(Y) = 3 \\times 0{,}35 = 1{,}05$ point.\nLe tir à trois points rapporte un peu plus en moyenne.\nb) $V(X) = 0{,}5 \\times (2 - 1)^2 + 0{,}5 \\times (0 - 1)^2 = 1$, donc $\\sigma(X) = 1$.\n$V(Y) = 0{,}35 \\times (3 - 1{,}05)^2 + 0{,}65 \\times (0 - 1{,}05)^2 = 0{,}35 \\times 3{,}8025 + 0{,}65 \\times 1{,}1025 = 1{,}330875 + 0{,}716625 = 2{,}0475$, donc $\\sigma(Y) \\approx 1{,}43$.\nLe tir à trois points est plus risqué : ses résultats s'écartent plus de la moyenne.\nc) Tir à trois points réussi : l'équipe gagne. $P(\\text{gagner}) = 0{,}35$.\nTir à deux points réussi : prolongation, gagnée une fois sur deux (arbre). $P(\\text{gagner}) = 0{,}5 \\times 0{,}5 = 0{,}25$.\nElle doit tenter le tir à trois points.\n⭐ La question n'est plus « combien de points en moyenne » mais « quelle chance de gagner ». On choisit la variable qui répond à la VRAIE question.\n⛔ Le piège : croire qu'un écart type plus grand rend un choix mauvais. Ici, il faut prendre le risque.",
          schema: (
            <div className="grid min-w-0 grid-cols-1 gap-2">
              {arbre([{ label: "Réussi", proba: "0,5", chemin: true, enfants: [{ label: "Gagne → 0,25", proba: "0,5", chemin: true }, { label: "Perd", proba: "0,5" }] }, { label: "Raté", proba: "0,5" }])}
              {ecranSeulement(diagramme("barres", [{ label: "Tir à 2", value: 25 }, { label: "Tir à 3", value: 35 }]))}
            </div>
          ),
          micros: ["va_modeliser", "va_esperance_probleme", "va_variance", "va_ecart_type"],
        },
        {
          titre: "La loterie de l'association",
          enonce:
            "Une association vend $200$ billets de loterie à $2$ € l'un. Un billet gagne $100$ €, cinq billets gagnent $20$ €, vingt billets gagnent $5$ €, les autres rien. Chaque billet a la même chance de sortir. $G$ est le gain net de l'acheteur d'un billet.\na) Donner la loi de $G$.\nb) Calculer $E(G)$ et interpréter pour l'acheteur, puis pour l'association.\nc) À quel prix le billet rendrait-il la loterie équitable ?\nd) L'association veut gagner $300$ € avec ses $200$ billets. À quel prix doit-elle les vendre ?",
          correction:
            "a) Gain net = lot − $2$ €. $G$ vaut $98$, $18$, $3$ ou $-2$.\n$P(G = 98) = \\dfrac{1}{200}$, $P(G = 18) = \\dfrac{5}{200}$, $P(G = 3) = \\dfrac{20}{200}$, $P(G = -2) = \\dfrac{174}{200}$.\n✔️ $1 + 5 + 20 + 174 = 200$ billets (diagramme : nombre de billets par gain).\nb) $E(G) = \\dfrac{98 \\times 1 + 18 \\times 5 + 3 \\times 20 - 2 \\times 174}{200} = \\dfrac{98 + 90 + 60 - 348}{200} = \\dfrac{-100}{200} = -0{,}5$ €.\nL'acheteur perd en moyenne $0{,}50$ € par billet. L'association gagne en moyenne $0{,}50$ € par billet, soit $100$ € pour $200$ billets.\n✔️ Recettes $400$ €, lots $100 + 100 + 100 = 300$ € : il reste bien $100$ €.\nc) La somme reçue en moyenne vaut $\\dfrac{100 + 5 \\times 20 + 20 \\times 5}{200} = \\dfrac{300}{200} = 1{,}5$ €. Le jeu est équitable si le billet coûte $1{,}50$ €.\nd) Avec un prix $p$ : $200p - 300 = 300$, soit $p = 3$ € le billet.\n⭐ Une loterie « pour la bonne cause » est volontairement défavorable au joueur : $E(G) < 0$, c'est le don.\n⛔ Le piège au a) : oublier de retirer la mise au gagnant. Celui qui gagne $100$ € a payé son billet : son gain net est $98$ €.",
          schema: diagramme("barres", [{ label: "98 €", value: 1 }, { label: "18 €", value: 5 }, { label: "3 €", value: 20 }, { label: "−2 €", value: 174 }]),
          micros: ["va_modeliser", "va_loi", "va_esperance_probleme"],
        },
        {
          titre: "Compter les poissons d'un lac",
          enonce:
            "Pour estimer le nombre $N$ de poissons d'un lac, des biologistes en capturent $200$, les marquent et les relâchent. Quelques jours plus tard, ils pêchent $25$ poissons, dont $4$ marqués (figure : en orange).\nOn pêche un poisson au hasard, et on pose $Y = 1$ s'il est marqué, $Y = 0$ sinon.\na) Donner la loi de $Y$ en fonction de $N$, puis montrer que $E(Y) = \\dfrac{200}{N}$.\nb) La pêche est un échantillon de $25$ valeurs de $Y$. Quelle est la moyenne de cet échantillon ?\nc) En admettant que cette moyenne est proche de $E(Y)$, estimer $N$.\nd) Le programme simule une pêche de $n$ poissons dans un lac de $N$ poissons. Que renvoie-t-il ? Pourquoi une seule pêche de $25$ poissons donne-t-elle une estimation fragile ?",
          figure: (
            <div className="grid min-w-0 grid-cols-1 gap-2">
              {ecranSeulement(billes([...Array(4).fill({ couleur: CHEMIN }), ...Array(21).fill({ couleur: BLEU })]))}
              {programme(["from random import random", "", "def peche(N, n):", "    k = 0", "    for i in range(n):", "        if random() < 200 / N:", "            k = k + 1", "    return k / n"])}
            </div>
          ),
          correction:
            "a) Chaque poisson a la même chance d'être pêché, et $200$ poissons sur $N$ sont marqués.\n$P(Y = 1) = \\dfrac{200}{N}$ et $P(Y = 0) = 1 - \\dfrac{200}{N}$.\n$E(Y) = 1 \\times \\dfrac{200}{N} + 0 \\times \\left(1 - \\dfrac{200}{N}\\right) = \\dfrac{200}{N}$.\nb) Les $25$ valeurs : $4$ fois $1$ et $21$ fois $0$. Moyenne : $\\dfrac{4}{25} = 0{,}16$.\nc) $\\dfrac{200}{N} \\approx 0{,}16$, donc $N \\approx \\dfrac{200}{0{,}16} = 1\\,250$ poissons.\nd) Le programme renvoie la proportion de poissons marqués dans une pêche simulée : la moyenne d'un échantillon de $n$ valeurs de $Y$.\nAvec $n = 25$, cette moyenne fluctue beaucoup : $3$ poissons marqués au lieu de $4$ donneraient $N \\approx 1\\,667$, et $5$ donneraient $N = 1\\,000$. Il faut pêcher bien plus de poissons pour une estimation fiable.\n⭐ La moyenne d'une variable qui vaut $0$ ou $1$, c'est une FRÉQUENCE : ici, celle des poissons marqués. C'est la méthode de capture-recapture, utilisée en écologie pour compter des animaux qu'on ne peut pas tous voir.\n⛔ Le piège : croire que $Y$ est le nombre de poissons marqués de la pêche. $Y$ ne concerne qu'UN poisson ; c'est la répétition qui fait l'échantillon.",
          micros: ["va_definition", "va_echantillon", "va_simulation"],
        },
        {
          titre: "Le loueur de kayaks",
          enonce:
            "Un loueur de kayaks modélise une journée d'été : soleil avec la probabilité $0{,}5$, nuages avec $0{,}3$, pluie avec $0{,}2$. Il loue alors $40$, $25$ ou $10$ kayaks. Chaque location rapporte $15$ €, et la journée lui coûte $300$ € (salaires, entretien). $L$ est le nombre de kayaks loués, $B$ le bénéfice du jour en euros.\na) Donner la loi de $L$ et calculer $E(L)$.\nb) Exprimer $B$ en fonction de $L$, puis donner la loi de $B$.\nc) Calculer $E(B)$ de deux façons.\nd) Quelle est la probabilité que le loueur perde de l'argent un jour donné ?\ne) Sur une saison de $90$ jours, quel bénéfice peut-il espérer ?",
          figure: ecranSeulement(tableau(["Météo", "Soleil", "Nuages", "Pluie"], ["Kayaks loués", 40, 25, 10])),
          correction:
            "a) $P(L = 40) = 0{,}5$, $P(L = 25) = 0{,}3$, $P(L = 10) = 0{,}2$.\n$E(L) = 40 \\times 0{,}5 + 25 \\times 0{,}3 + 10 \\times 0{,}2 = 20 + 7{,}5 + 2 = 29{,}5$ kayaks.\nb) $B = 15L - 300$. Soleil : $B = 15 \\times 40 - 300 = 300$ € ; nuages : $B = 15 \\times 25 - 300 = 75$ € ; pluie : $B = 15 \\times 10 - 300 = -150$ €, avec les probabilités $0{,}5$ ; $0{,}3$ ; $0{,}2$.\nc) Par la loi de $B$ : $E(B) = 300 \\times 0{,}5 + 75 \\times 0{,}3 - 150 \\times 0{,}2 = 150 + 22{,}5 - 30 = 142{,}5$ €.\nPar la règle $E(aL + b) = aE(L) + b$ : $E(B) = 15 \\times 29{,}5 - 300 = 142{,}5$ €.\nd) Il perd de l'argent quand $B < 0$, c'est-à-dire les jours de pluie : $P(B < 0) = 0{,}2$.\ne) En moyenne $142{,}5$ € par jour, soit environ $90 \\times 142{,}5 = 12\\,825$ € sur la saison.\n⭐ Un jour sur cinq, il perd $150$ € : c'est l'espérance, pas chaque journée, qui dit si l'affaire est rentable (droite : les valeurs de $B$ en bleu, $E(B)$ en rouge).\n⛔ Le piège au c) : calculer $15 \\times 29{,}5 = 442{,}5$ € en oubliant de retirer les $300$ € de frais.",
          schema: droiteLoi(-200, 300, 100, [{ value: -150, label: "0,2", color: BLEU }, { value: 75, label: "0,3", color: BLEU }, { value: 300, label: "0,5", color: BLEU }, { value: 142.5, label: "E = 142,5", color: ROUGE }]),
          micros: ["va_modeliser", "va_loi", "va_esperance"],
        },
      ],
    },
  ],
};
