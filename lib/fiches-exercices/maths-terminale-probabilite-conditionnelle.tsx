// ─── Fiche d'exercices : probabilités conditionnelles (terminale spé) ─────────
//                              20 exercices corrigés
//
// Feuille de terminale spé du 29/09/2026, une par notion du coach. Alignée sur
// `lib/tutor-v4/questionBank/terminale-spe/maths/probabilites-conditionnelles.bank.ts`.
//
// ⛔ Pas de répétition de la feuille de 1re spé (maths-premiere-probabilites-
// conditionnelles.tsx) : ici, des arbres à TROIS branches ou à TROIS niveaux,
// des épreuves successives qui ne sont PAS indépendantes (pièce truquée, urne de
// Pólya, deux urnes), l'inversion du conditionnement au niveau du bac (dépistage,
// contrôle qualité, anti-spam, double test), une probabilité inconnue qu'on
// retrouve par une équation, et les SUITES DE PROBABILITÉS p(n+1) = a p(n) + b.
//
// ⭐ LES DESSINS : arbres pondérés (le canvas du coach ; `arbre3`, aide locale,
// pour les arbres à trois niveaux que le canvas superpose), tableau croisé de
// probabilités, diagramme en barres des causes, programme Python, et les
// suites de probabilités en points avec leur limite en horizontale.
//
// Micro-compétences : proba_conditionnelle_arbre (1, 3, 5, 6, 7, 14, 16, 18),
// proba_conditionnelle_formule (2, 3, 6, 7, 11, 12), proba_totales (4, 5, 8, 9,
// 10, 11, 15, 16, 17, 18, 19, 20), proba_inverse_bayes (5, 9, 10, 13, 14, 15,
// 16, 17, 18, 19, 20), proba_conditionnelle_defi (13, 14, 17, 18, 19, 20). 5/5.
//
// Faits cités : aucun fait réel. Usines, fournisseurs, tests, vaccin, filtre,
// crédits et relais sont des MODÈLES, leurs chiffres sont inventés.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre, diagramme, programme, repere, tableau, tableauProba } from "@/lib/fiches-exercices/figures";

/** Dessin réservé à l'écran : le PDF garde 12 à 14 dessins (≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Les termes d'une suite en points rouges, à partir du rang n0 (valeurs EN CLAIR, arrondies). */
const termes = (n0: number, valeurs: number[]) => valeurs.map((y, i) => ({ x: n0 + i, y, label: "" }));

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

export const exercicesProbabiliteConditionnelleTerminale: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "terminale-spe",
  notion: "probabilite-conditionnelle",
  titre: "Probabilités conditionnelles",
  accroche:
    "Vingt exercices, de la lecture d'un arbre au problème de bac, avec un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et chaque calcul suit un chemin de l'arbre.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=terminale-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ est la probabilité de $B$ sachant $A$ (avec $P(A) \\neq 0$). Donc $P(A \\cap B) = P(A) \\times P_A(B)$.",
        "Dans un arbre pondéré, les branches issues d'un même nœud ont une somme égale à $1$. La probabilité d'un chemin est le PRODUIT des probabilités de ses branches.",
        "Probabilités totales : si $A_1$, …, $A_n$ forment une partition de l'univers, alors $P(B) = P(A_1 \\cap B) + \\cdots + P(A_n \\cap B)$.",
        "$A$ et $B$ sont indépendants lorsque $P(A \\cap B) = P(A) \\times P(B)$, c'est-à-dire $P_A(B) = P(B)$ si $P(A) \\neq 0$.",
      ],
      exercices: [
        {
          enonce:
            "Une entreprise fabrique des vis dans trois usines $U_1$, $U_2$ et $U_3$. On choisit une vis au hasard ; $D$ est l'événement « la vis est défectueuse ». Certaines probabilités de l'arbre sont effacées.\na) Compléter l'arbre.\nb) Calculer $P(U_3 \\cap \\overline{D})$.",
          figure: arbre([
            { label: "U1", proba: "0,5", enfants: [{ label: "D", proba: "0,02" }, { label: "D̄", proba: "?" }] },
            { label: "U2", proba: "0,3", enfants: [{ label: "D", proba: "0,03" }, { label: "D̄", proba: "?" }] },
            { label: "U3", proba: "?", enfants: [{ label: "D", proba: "0,05" }, { label: "D̄", proba: "?" }] },
          ]),
          correction:
            "a) Les trois premières branches partent du même point : leur somme vaut $1$.\n$P(U_3) = 1 - 0{,}5 - 0{,}3 = 0{,}2$.\nDe chaque usine partent deux branches, $D$ et $\\overline{D}$ : on complète à $1$.\n$P_{U_1}(\\overline{D}) = 0{,}98$, $P_{U_2}(\\overline{D}) = 0{,}97$ et $P_{U_3}(\\overline{D}) = 0{,}95$.\nb) On suit le chemin $U_3$ puis $\\overline{D}$ et on multiplie : $P(U_3 \\cap \\overline{D}) = 0{,}2 \\times 0{,}95 = 0{,}19$.\n⚠️ Les nombres de la deuxième colonne sont des probabilités CONDITIONNELLES : $0{,}05$ est $P_{U_3}(D)$, pas $P(D)$.\n⭐ Sur le dessin : une partition en trois se voit à ses trois branches de départ, qui recouvrent tous les cas.",
          micros: ["proba_conditionnelle_arbre"],
        },
        {
          enonce:
            "Dans une salle de sport, on choisit un abonné au hasard. $C$ : « il fait du cardio » ; $M$ : « il fait de la musculation ». Le tableau donne les probabilités.\na) Calculer $P_C(M)$.\nb) Calculer $P_M(C)$.\nc) Traduire chaque résultat par une phrase.",
          figure: tableauProba(
            ["", "M", "non M", "Total"],
            [
              ["C", "0,1", "0,3", "0,4"],
              ["non C", "0,06", "0,54", "0,6"],
              ["Total", "0,16", "0,84", "1"],
            ],
            [[0, 1]],
          ),
          correction:
            "On lit $P(C \\cap M) = 0{,}1$ (case en couleur), $P(C) = 0{,}4$ et $P(M) = 0{,}16$.\na) $P_C(M) = \\dfrac{P(C \\cap M)}{P(C)} = \\dfrac{0{,}1}{0{,}4} = 0{,}25$.\nb) $P_M(C) = \\dfrac{P(C \\cap M)}{P(M)} = \\dfrac{0{,}1}{0{,}16} = 0{,}625$.\nc) Parmi les abonnés qui font du cardio, $25$ % font aussi de la musculation. Parmi ceux qui font de la musculation, $62{,}5$ % font aussi du cardio.\n⚠️ Même numérateur, mais pas le même dénominateur : on divise par la probabilité de l'événement qui SUIT « sachant ».\n⭐ Sur le dessin : $P_C(M)$ se lit dans la LIGNE de $C$ (la case sur le total de la ligne), $P_M(C)$ dans la COLONNE de $M$.",
          micros: ["proba_conditionnelle_formule"],
        },
        {
          enonce:
            "Une urne contient $5$ boules rouges et $3$ boules vertes. On tire successivement trois boules, SANS remise. On note $R_k$ l'événement « la $k$-ième boule est rouge ».\na) Calculer $P(R_1 \\cap R_2)$.\nb) Calculer la probabilité de tirer trois boules rouges.",
          correction:
            "a) $P(R_1) = \\dfrac{5}{8}$. Une rouge est partie : il reste $4$ rouges sur $7$ boules, donc $P_{R_1}(R_2) = \\dfrac{4}{7}$.\n$P(R_1 \\cap R_2) = \\dfrac{5}{8} \\times \\dfrac{4}{7} = \\dfrac{20}{56} = \\dfrac{5}{14}$.\nb) Sachant deux rouges tirées, il reste $3$ rouges sur $6$ boules : $P_{R_1 \\cap R_2}(R_3) = \\dfrac{3}{6}$.\n$P(R_1 \\cap R_2 \\cap R_3) = \\dfrac{5}{8} \\times \\dfrac{4}{7} \\times \\dfrac{3}{6} = \\dfrac{60}{336} = \\dfrac{5}{28} \\approx 0{,}179$.\n⚠️ Sans remise, les tirages ne sont PAS indépendants : la composition de l'urne change à chaque tirage, et les probabilités de l'arbre avec elle.\n⭐ Sur le dessin : on ne trace que les branches utiles. Le chemin rouge-rouge-rouge porte $\\dfrac{5}{8}$, puis $\\dfrac{4}{7}$, puis $\\dfrac{3}{6}$.",
          schema: ecranSeulement(
            arbre3([
              { label: "R1", proba: "5/8", enfants: [{ label: "R2", proba: "4/7", enfants: [{ label: "R3", proba: "3/6" }, { label: "V3", proba: "3/6" }] }, { label: "V2", proba: "3/7" }] },
              { label: "V1", proba: "3/8" },
            ]),
          ),
          micros: ["proba_conditionnelle_formule", "proba_conditionnelle_arbre"],
        },
        {
          enonce:
            "Un site marchand a trois fournisseurs : $45$ % des colis viennent de $F_1$, $35$ % de $F_2$ et $20$ % de $F_3$. Un colis arrive en retard dans $4$ % des cas s'il vient de $F_1$, $10$ % s'il vient de $F_2$ et $15$ % s'il vient de $F_3$. Calculer la probabilité $P(R)$ qu'un colis pris au hasard arrive en retard.",
          correction:
            "$F_1$, $F_2$ et $F_3$ forment une partition : chaque colis vient d'un fournisseur, et d'un seul.\nFormule des probabilités totales : $P(R) = P(F_1 \\cap R) + P(F_2 \\cap R) + P(F_3 \\cap R)$.\n$P(F_1 \\cap R) = 0{,}45 \\times 0{,}04 = 0{,}018$.\n$P(F_2 \\cap R) = 0{,}35 \\times 0{,}1 = 0{,}035$.\n$P(F_3 \\cap R) = 0{,}2 \\times 0{,}15 = 0{,}03$.\nDonc $P(R) = 0{,}018 + 0{,}035 + 0{,}03 = 0{,}083$ : $8{,}3$ % des colis arrivent en retard.\n⚠️ On n'additionne pas $4$ %, $10$ % et $15$ % : chaque taux est pondéré par la part de son fournisseur.\n⭐ Sur le dessin : on additionne les trois chemins qui finissent par $R$.",
          schema: ecranSeulement(
            arbre([
              { label: "F1", proba: "0,45", enfants: [{ label: "R → 0,018", proba: "0,04" }, { label: "R̄", proba: "0,96" }] },
              { label: "F2", proba: "0,35", enfants: [{ label: "R → 0,035", proba: "0,1" }, { label: "R̄", proba: "0,9" }] },
              { label: "F3", proba: "0,2", enfants: [{ label: "R → 0,03", proba: "0,15" }, { label: "R̄", proba: "0,85" }] },
            ]),
          ),
          micros: ["proba_totales"],
        },
        {
          enonce:
            "On donne $P(A) = 0{,}2$, $P_A(B) = 0{,}9$ et $P(B) = 0{,}3$. Dans l'arbre, la probabilité $P_{\\overline{A}}(B)$ manque.\na) Calculer $P(A \\cap B)$, puis $P(\\overline{A} \\cap B)$.\nb) En déduire $P_{\\overline{A}}(B)$.\nc) Calculer $P_B(A)$.",
          figure: ecranSeulement(
            arbre([
              { label: "A", proba: "0,2", enfants: [{ label: "B", proba: "0,9" }, { label: "B̄", proba: "0,1" }] },
              { label: "Ā", proba: "0,8", enfants: [{ label: "B", proba: "?" }, { label: "B̄", proba: "?" }] },
            ]),
          ),
          correction:
            "a) $P(A \\cap B) = 0{,}2 \\times 0{,}9 = 0{,}18$.\nPar les probabilités totales, $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$. Donc $P(\\overline{A} \\cap B) = 0{,}3 - 0{,}18 = 0{,}12$.\nb) $P_{\\overline{A}}(B) = \\dfrac{P(\\overline{A} \\cap B)}{P(\\overline{A})}$ $= \\dfrac{0{,}12}{0{,}8} = 0{,}15$.\nc) $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0{,}18}{0{,}3} = 0{,}6$.\n⚠️ $P_B(A)$ n'est écrit sur aucune branche : l'arbre part de $A$, pas de $B$. On l'obtient par la définition, en « remontant » l'arbre.\n⭐ Sur le dessin : la case « ? » vers $B$ vaut $0{,}15$, et celle vers $\\overline{B}$ vaut $0{,}85$.",
          micros: ["proba_conditionnelle_arbre", "proba_totales", "proba_inverse_bayes"],
        },
        {
          enonce:
            "Sur un site de vente en ligne : « $40$ % des visiteurs ajoutent un article à leur panier. Parmi eux, $30$ % vont jusqu'au paiement. Un visiteur qui n'a rien mis dans son panier ne paie jamais. » On note $A$ : « le visiteur ajoute un article » et $V$ : « il paie ».\na) Traduire chaque phrase par une probabilité.\nb) Calculer $P(V)$, puis $P_V(A)$. Commenter.",
          correction:
            "a) « $40$ % des visiteurs ajoutent » : $P(A) = 0{,}4$.\n« Parmi eux, $30$ % paient » : c'est une probabilité SACHANT $A$, $P_A(V) = 0{,}3$.\n« Sans panier, jamais de paiement » : $P_{\\overline{A}}(V) = 0$.\nb) $P(V) = 0{,}4 \\times 0{,}3 + 0{,}6 \\times 0 = 0{,}12$.\n$P_V(A) = \\dfrac{P(A \\cap V)}{P(V)} = \\dfrac{0{,}12}{0{,}12} = 1$ : tout visiteur qui paie avait un panier. C'est logique.\n⚠️ « Parmi eux » signale une probabilité conditionnelle : $30$ % n'est pas $P(V)$, ni $P(A \\cap V)$.\n⭐ Sur le dessin : la branche $\\overline{A} \\to V$ porte $0$, donc un seul chemin mène au paiement.",
          schema: ecranSeulement(
            arbre([
              { label: "A", proba: "0,4", enfants: [{ label: "V", proba: "0,3" }, { label: "V̄", proba: "0,7" }] },
              { label: "Ā", proba: "0,6", enfants: [{ label: "V", proba: "0" }, { label: "V̄", proba: "1" }] },
            ]),
          ),
          micros: ["proba_conditionnelle_formule", "proba_conditionnelle_arbre"],
        },
        {
          enonce:
            "Dans un club omnisport, $60$ % des membres font de la natation ($N$). Parmi les nageurs, $25$ % font aussi du vélo ($V$). Parmi les non-nageurs, $25$ % font du vélo.\na) Calculer $P(V)$.\nb) Les événements $N$ et $V$ sont-ils indépendants ?",
          correction:
            "a) Probabilités totales : $P(V) = 0{,}6 \\times 0{,}25 + 0{,}4 \\times 0{,}25$ $= 0{,}15 + 0{,}1 = 0{,}25$.\nb) $P_N(V) = 0{,}25$ et $P(V) = 0{,}25$ : savoir qu'un membre nage ne change pas la probabilité qu'il fasse du vélo.\n$N$ et $V$ sont indépendants. On le vérifie : $P(N \\cap V) = 0{,}15$ et $P(N) \\times P(V) = 0{,}6 \\times 0{,}25 = 0{,}15$.\n⚠️ Indépendants ne veut pas dire incompatibles : $15$ % des membres font les deux sports.\n⭐ Sur le dessin : les deux moitiés de l'arbre portent les MÊMES probabilités, $0{,}25$ et $0{,}75$. C'est la signature de l'indépendance.",
          schema: ecranSeulement(
            arbre([
              { label: "N", proba: "0,6", enfants: [{ label: "V", proba: "0,25" }, { label: "V̄", proba: "0,75" }] },
              { label: "N̄", proba: "0,4", enfants: [{ label: "V", proba: "0,25" }, { label: "V̄", proba: "0,75" }] },
            ]),
          ),
          micros: ["proba_conditionnelle_formule", "proba_conditionnelle_arbre"],
        },
        {
          enonce:
            "On ne connaît pas $x = P(A)$. On sait que $P_A(B) = 0{,}8$, $P_{\\overline{A}}(B) = 0{,}3$ et $P(B) = 0{,}5$. Déterminer $x$.",
          figure: arbre([
            { label: "A", proba: "x", enfants: [{ label: "B", proba: "0,8" }, { label: "B̄", proba: "0,2" }] },
            { label: "Ā", proba: "1 − x", enfants: [{ label: "B", proba: "0,3" }, { label: "B̄", proba: "0,7" }] },
          ]),
          correction:
            "Probabilités totales : $P(B) = x \\times 0{,}8 + (1 - x) \\times 0{,}3$.\nOn développe : $P(B) = 0{,}8x + 0{,}3 - 0{,}3x = 0{,}5x + 0{,}3$.\nOn résout $0{,}5x + 0{,}3 = 0{,}5$ : $0{,}5x = 0{,}2$, donc $x = 0{,}4$.\nVérification : $0{,}4 \\times 0{,}8 + 0{,}6 \\times 0{,}3 = 0{,}32 + 0{,}18 = 0{,}5$.\n⚠️ La branche $\\overline{A}$ porte $1 - x$, pas une nouvelle inconnue : les deux branches du départ ont une somme égale à $1$.\n⭐ Sur le dessin : l'inconnue se place sur l'arbre comme un nombre, et on écrit $P(B)$ chemin par chemin.",
          micros: ["proba_totales"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un devoir. On rédige.",
      rappel: [
        "Inverser le conditionnement : $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$ $= \\dfrac{P(A) \\times P_A(B)}{P(B)}$, et on calcule $P(B)$ par les probabilités totales.",
        "Dans une succession d'épreuves, la probabilité d'un chemin est le produit des probabilités conditionnelles le long du chemin, même sur trois niveaux.",
        "Suite de probabilités : on relie $p_{n+1}$ à $p_n$ par un arbre entre l'étape $n$ et l'étape $n + 1$, puis on étudie la suite.",
      ],
      exercices: [
        {
          enonce:
            "Une maladie touche $2$ % d'une population. Un test de dépistage est positif chez $95$ % des malades, et chez $10$ % des personnes saines. On choisit une personne au hasard ; $M$ : « elle est malade », $T$ : « son test est positif ».\na) Construire l'arbre et calculer $P(T)$.\nb) Une personne a un test positif. Quelle est la probabilité qu'elle soit malade ?\nc) Une personne a un test négatif. Quelle est la probabilité qu'elle soit saine ?",
          correction:
            "a) $P(M) = 0{,}02$, $P_M(T) = 0{,}95$, $P_{\\overline{M}}(T) = 0{,}1$.\n$P(T) = 0{,}02 \\times 0{,}95 + 0{,}98 \\times 0{,}1$ $= 0{,}019 + 0{,}098 = 0{,}117$.\nb) $P_T(M) = \\dfrac{P(M \\cap T)}{P(T)} = \\dfrac{0{,}019}{0{,}117} \\approx 0{,}162$.\nc) $P(\\overline{M} \\cap \\overline{T}) = 0{,}98 \\times 0{,}9 = 0{,}882$ et $P(\\overline{T}) = 1 - 0{,}117 = 0{,}883$.\n$P_{\\overline{T}}(\\overline{M}) = \\dfrac{0{,}882}{0{,}883} \\approx 0{,}9989$.\n⚠️ Le test « détecte $95$ % des malades », et pourtant un positif n'est malade qu'avec une probabilité de $16$ % environ. On a confondu $P_M(T)$ et $P_T(M)$.\n⭐ Pourquoi ? Sur $10\\,000$ personnes, $190$ malades sont positifs, mais aussi $980$ personnes saines : les faux positifs sont bien plus nombreux, parce que les sains sont bien plus nombreux.\n⭐ Sur le dessin : les deux chemins qui finissent par $T$ pèsent $0{,}019$ et $0{,}098$. Le second est cinq fois plus lourd.",
          schema: arbre([
            { label: "M", proba: "0,02", enfants: [{ label: "T → 0,019", proba: "0,95" }, { label: "T̄", proba: "0,05" }] },
            { label: "M̄", proba: "0,98", enfants: [{ label: "T → 0,098", proba: "0,1" }, { label: "T̄", proba: "0,9" }] },
          ]),
          micros: ["proba_totales", "proba_inverse_bayes"],
        },
        {
          enonce:
            "En fin de chaîne, un contrôle automatique rejette les pièces qu'il juge défectueuses. $5$ % des pièces sont défectueuses ($D$). Le contrôle rejette $90$ % des pièces défectueuses, mais aussi $4$ % des pièces bonnes. $J$ : « la pièce est rejetée ».\na) Calculer $P(J)$.\nb) Une pièce est rejetée. Quelle est la probabilité qu'elle soit bonne ?\nc) Une pièce est acceptée. Quelle est la probabilité qu'elle soit défectueuse ?",
          correction:
            "a) $P(J) = 0{,}05 \\times 0{,}9 + 0{,}95 \\times 0{,}04$ $= 0{,}045 + 0{,}038 = 0{,}083$.\nb) $P_J(\\overline{D}) = \\dfrac{0{,}038}{0{,}083} \\approx 0{,}458$.\nPrès de la moitié des pièces rejetées sont bonnes.\nc) $P(D \\cap \\overline{J}) = 0{,}05 \\times 0{,}1 = 0{,}005$ et $P(\\overline{J}) = 1 - 0{,}083 = 0{,}917$.\n$P_{\\overline{J}}(D) = \\dfrac{0{,}005}{0{,}917} \\approx 0{,}0055$ : moins de $6$ pièces acceptées sur $1\\,000$ sont défectueuses, contre $50$ avant le contrôle.\n⚠️ « Rejette $4$ % des bonnes » est $P_{\\overline{D}}(J)$ ; la question b) demande $P_J(\\overline{D})$. Ce ne sont pas les mêmes.\n⭐ Sur le dessin : deux chemins mènent au rejet, $0{,}045$ et $0{,}038$ ; ils sont presque aussi lourds l'un que l'autre, d'où le « près de la moitié ».",
          schema: ecranSeulement(
            arbre([
              { label: "D", proba: "0,05", enfants: [{ label: "J → 0,045", proba: "0,9" }, { label: "J̄ → 0,005", proba: "0,1" }] },
              { label: "D̄", proba: "0,95", enfants: [{ label: "J → 0,038", proba: "0,04" }, { label: "J̄", proba: "0,96" }] },
            ]),
          ),
          micros: ["proba_totales", "proba_inverse_bayes"],
        },
        {
          enonce:
            "Un sac contient deux pièces : une équilibrée ($E$) et une truquée ($T$), qui tombe sur pile avec la probabilité $0{,}8$. On prend une pièce au hasard et on la lance deux fois. $P_1$ : « pile au premier lancer », $P_2$ : « pile au second ».\na) Calculer $P(P_1)$.\nb) Calculer $P(P_1 \\cap P_2)$.\nc) $P_1$ et $P_2$ sont-ils indépendants ? Expliquer ce résultat.",
          correction:
            "a) $P(P_1) = 0{,}5 \\times 0{,}5 + 0{,}5 \\times 0{,}8$ $= 0{,}25 + 0{,}4 = 0{,}65$.\nb) Une fois la pièce choisie, les deux lancers sont indépendants : on multiplie le long du chemin.\n$P(E \\cap P_1 \\cap P_2) = 0{,}5 \\times 0{,}5 \\times 0{,}5 = 0{,}125$ et $P(T \\cap P_1 \\cap P_2) = 0{,}5 \\times 0{,}8 \\times 0{,}8 = 0{,}32$.\n$P(P_1 \\cap P_2) = 0{,}125 + 0{,}32 = 0{,}445$.\nc) Par symétrie, $P(P_2) = 0{,}65$. Or $P(P_1) \\times P(P_2) = 0{,}65^2 = 0{,}4225 \\neq 0{,}445$ : ils ne sont PAS indépendants.\nEn effet, $P_{P_1}(P_2) = \\dfrac{0{,}445}{0{,}65} \\approx 0{,}685 > 0{,}65$ : un premier pile rend plus probable qu'on tienne la pièce truquée, donc un second pile.\n⚠️ Les lancers sont indépendants SACHANT la pièce, mais pas quand on ignore laquelle on tient.\n⭐ Sur le dessin : deux chemins mènent à « pile puis pile », un par pièce ; on les additionne.",
          schema: arbre3([
            { label: "E", proba: "0,5", enfants: [{ label: "P1", proba: "0,5", enfants: [{ label: "P2", proba: "0,5" }, { label: "F2", proba: "0,5" }] }, { label: "F1", proba: "0,5" }] },
            { label: "T", proba: "0,5", enfants: [{ label: "P1", proba: "0,8", enfants: [{ label: "P2", proba: "0,8" }, { label: "F2", proba: "0,2" }] }, { label: "F1", proba: "0,2" }] },
          ]),
          micros: ["proba_totales", "proba_conditionnelle_formule"],
        },
        {
          enonce:
            "Chaque jour de classe, Lina va au lycée à vélo ou en bus. Si elle prend le vélo un jour, elle le reprend le lendemain avec la probabilité $0{,}7$. Si elle prend le bus, elle prend le vélo le lendemain avec la probabilité $0{,}4$. Le jour $1$, elle prend le vélo. On note $p_n$ la probabilité qu'elle prenne le vélo le jour $n$ : $p_1 = 1$.\na) À l'aide d'un arbre, montrer que $p_{n+1} = 0{,}3p_n + 0{,}4$.\nb) Calculer $p_2$ et $p_3$.\nc) Que renvoie la fonction Python ci-dessous ? Que signifie ce résultat ?",
          figure: programme(["def rang():", "    n = 1", "    p = 1", "    while p - 4/7 >= 0.001:", "        p = 0.3 * p + 0.4", "        n = n + 1", "    return n"]),
          correction:
            "a) Le jour $n$ : vélo avec la probabilité $p_n$, bus avec $1 - p_n$.\nProbabilités totales sur le jour $n + 1$ : $p_{n+1} = 0{,}7p_n + 0{,}4(1 - p_n)$.\nOn développe : $p_{n+1} = 0{,}7p_n + 0{,}4 - 0{,}4p_n = 0{,}3p_n + 0{,}4$.\nb) $p_2 = 0{,}3 \\times 1 + 0{,}4 = 0{,}7$ et $p_3 = 0{,}3 \\times 0{,}7 + 0{,}4 = 0{,}61$.\nc) La boucle calcule les termes tant que l'écart $p_n - \\dfrac{4}{7}$ reste $\\geqslant 0{,}001$. Les termes : $0{,}7$ ; $0{,}61$ ; $0{,}583$ ; $0{,}5749$ ; $0{,}57247$ ; puis $p_7 \\approx 0{,}57174$.\nLa fonction renvoie $7$ : à partir du jour $7$, la probabilité est à moins d'un millième de $\\dfrac{4}{7} \\approx 0{,}571$.\n⭐ D'où vient $\\dfrac{4}{7}$ ? C'est la solution de $\\ell = 0{,}3\\ell + 0{,}4$, soit $0{,}7\\ell = 0{,}4$ : la probabilité qui ne bouge plus d'un jour à l'autre.\n⚠️ Sur le dessin, une graduation vaut $0{,}1$ : les points descendent vers la droite $y \\approx 5{,}71$, c'est-à-dire $p \\approx 0{,}571$.",
          schema: repere([-1, 9, -1, 11], [], termes(1, [10, 7, 6.1, 5.83, 5.75, 5.72, 5.72, 5.72]), 5.714, true),
          micros: ["proba_conditionnelle_formule", "proba_totales"],
        },
        {
          enonce:
            "Un filtre anti-spam repère le mot « gratuit ». Dans une messagerie, $30$ % des courriels sont des spams ($S$). Le mot apparaît dans $40$ % des spams et dans $2$ % des autres courriels. $G$ : « le courriel contient le mot ».\na) Calculer $P(G)$, puis $P_G(S)$.\nb) On note maintenant $x$ la part des spams. Montrer que $P_G(S) = \\dfrac{0{,}4x}{0{,}38x + 0{,}02}$.\nc) Pour quelles valeurs de $x$ a-t-on $P_G(S) \\geqslant 0{,}99$ ?",
          correction:
            "a) $P(G) = 0{,}3 \\times 0{,}4 + 0{,}7 \\times 0{,}02$ $= 0{,}12 + 0{,}014 = 0{,}134$.\n$P_G(S) = \\dfrac{0{,}12}{0{,}134} \\approx 0{,}896$.\nb) $P(S \\cap G) = 0{,}4x$ et $P(G) = 0{,}4x + 0{,}02(1 - x) = 0{,}38x + 0{,}02$. On divise.\nc) Le dénominateur est positif : on peut multiplier sans changer le sens.\n$0{,}4x \\geqslant 0{,}99(0{,}38x + 0{,}02)$ équivaut à $0{,}4x \\geqslant 0{,}3762x + 0{,}0198$, soit $0{,}0238x \\geqslant 0{,}0198$.\nDonc $x \\geqslant \\dfrac{0{,}0198}{0{,}0238} \\approx 0{,}832$.\nIl faudrait plus de $83$ % de spams pour que le mot suffise à conclure à $99$ %.\n⚠️ La probabilité « sachant $G$ » dépend de la part des spams : le même filtre est plus ou moins fiable selon la messagerie.\n⭐ Sur le dessin (question a) : sur les deux chemins qui mènent à $G$, celui du spam pèse $0{,}12$, l'autre $0{,}014$.",
          schema: ecranSeulement(
            arbre([
              { label: "S", proba: "0,3", enfants: [{ label: "G → 0,12", proba: "0,4" }, { label: "Ḡ", proba: "0,6" }] },
              { label: "S̄", proba: "0,7", enfants: [{ label: "G → 0,014", proba: "0,02" }, { label: "Ḡ", proba: "0,98" }] },
            ]),
          ),
          micros: ["proba_inverse_bayes", "proba_conditionnelle_defi"],
        },
        {
          enonce:
            "Une maladie touche $1$ % d'une population. Un test est positif chez $99$ % des malades et chez $5$ % des personnes saines. Quand le test est positif, on le refait ; on admet que, sachant l'état de la personne, les deux tests sont indépendants.\na) Calculer la probabilité qu'une personne positive au premier test soit malade.\nb) Calculer la probabilité qu'une personne positive aux DEUX tests soit malade.",
          correction:
            "a) $P(T_1) = 0{,}01 \\times 0{,}99 + 0{,}99 \\times 0{,}05$ $= 0{,}0099 + 0{,}0495 = 0{,}0594$.\n$P_{T_1}(M) = \\dfrac{0{,}0099}{0{,}0594} = \\dfrac{1}{6} \\approx 0{,}167$.\nb) On suit les chemins à trois niveaux :\n$P(M \\cap T_1 \\cap T_2)$ $= 0{,}01 \\times 0{,}99 \\times 0{,}99 = 0{,}009801$.\n$P(\\overline{M} \\cap T_1 \\cap T_2)$ $= 0{,}99 \\times 0{,}05 \\times 0{,}05 = 0{,}002475$.\n$P(T_1 \\cap T_2)$ $= 0{,}009801 + 0{,}002475 = 0{,}012276$.\nDonc la probabilité cherchée vaut $\\dfrac{0{,}009801}{0{,}012276} \\approx 0{,}798$.\nLe second test fait passer la probabilité d'être malade de $17$ % environ à $80$ % environ.\n⚠️ On n'élève pas $P_{T_1}(M)$ au carré : on refait le calcul sur l'arbre complet, avec les chemins à trois branches.\n⭐ Sur le dessin : le faux positif doit se tromper DEUX fois ($0{,}05 \\times 0{,}05$), le vrai positif réussir deux fois ($0{,}99 \\times 0{,}99$).",
          schema: arbre3([
            { label: "M", proba: "0,01", enfants: [{ label: "T1", proba: "0,99", enfants: [{ label: "T2", proba: "0,99" }, { label: "T̄2", proba: "0,01" }] }, { label: "T̄1", proba: "0,01" }] },
            { label: "M̄", proba: "0,99", enfants: [{ label: "T1", proba: "0,05", enfants: [{ label: "T2", proba: "0,05" }, { label: "T̄2", proba: "0,95" }] }, { label: "T̄1", proba: "0,95" }] },
          ]),
          micros: ["proba_inverse_bayes", "proba_conditionnelle_arbre", "proba_conditionnelle_defi"],
        },
        {
          enonce:
            "Une banque classe ses emprunteurs en trois profils : $50$ % sont du profil $A$, $35$ % du profil $B$ et $15$ % du profil $C$. La probabilité de ne pas rembourser (événement $D$) vaut $1$ % pour $A$, $4$ % pour $B$ et $10$ % pour $C$.\na) Calculer $P(D)$.\nb) Un emprunteur ne rembourse pas. De quel profil est-il le plus probablement ?",
          correction:
            "a) $P(D) = 0{,}5 \\times 0{,}01 + 0{,}35 \\times 0{,}04 + 0{,}15 \\times 0{,}1$, soit $0{,}005 + 0{,}014 + 0{,}015 = 0{,}034$.\nb) On inverse pour chaque profil :\n$P_D(A) = \\dfrac{0{,}005}{0{,}034} \\approx 0{,}147$ ; $P_D(B) = \\dfrac{0{,}014}{0{,}034} \\approx 0{,}412$ ; $P_D(C) = \\dfrac{0{,}015}{0{,}034} \\approx 0{,}441$.\nLe profil $C$ est le plus probable, de peu devant $B$.\nVérification : $0{,}147 + 0{,}412 + 0{,}441 = 1$ (aux arrondis près), car un défaillant a forcément un profil.\n⚠️ Le profil $C$ ne pèse que $15$ % des emprunteurs, mais son risque est dix fois celui de $A$ : il fournit la plus grosse part des défauts.\n⭐ Sur le dessin : les barres montrent, en %, d'où viennent les défauts. Elles ne ressemblent pas du tout aux parts $50$, $35$, $15$ des profils.",
          schema: diagramme("barres", [{ label: "A", value: 15 }, { label: "B", value: 41 }, { label: "C", value: 44 }], 2),
          micros: ["proba_totales", "proba_inverse_bayes"],
        },
        {
          enonce:
            "Une urne contient $2$ boules rouges et $3$ boules vertes. On tire une boule, on la remet, et on AJOUTE une boule de la même couleur ; puis on tire une seconde boule. $R_1$ et $R_2$ : « la première (la seconde) boule est rouge ».\na) Calculer $P(R_2)$.\nb) Sachant que la seconde boule est rouge, quelle est la probabilité que la première l'ait été ?\nc) $R_1$ et $R_2$ sont-ils indépendants ?",
          correction:
            "a) Si la première est rouge, l'urne contient $3$ rouges sur $6$ : $P_{R_1}(R_2) = \\dfrac{3}{6} = \\dfrac{1}{2}$.\nSi elle est verte, l'urne contient $2$ rouges sur $6$ : $P_{\\overline{R_1}}(R_2) = \\dfrac{2}{6} = \\dfrac{1}{3}$.\n$P(R_2) = \\dfrac{2}{5} \\times \\dfrac{1}{2} + \\dfrac{3}{5} \\times \\dfrac{1}{3} = \\dfrac{1}{5} + \\dfrac{1}{5} = \\dfrac{2}{5}$.\nb) $P_{R_2}(R_1) = \\dfrac{P(R_1 \\cap R_2)}{P(R_2)} = \\dfrac{1/5}{2/5} = \\dfrac{1}{2}$.\nc) $P_{R_1}(R_2) = \\dfrac{1}{2} \\neq \\dfrac{2}{5} = P(R_2)$ : ils ne sont pas indépendants.\n⭐ Surprise : $P(R_2) = P(R_1) = \\dfrac{2}{5}$. Sans rien savoir du premier tirage, la seconde boule a autant de chances d'être rouge que la première.\n⚠️ Même probabilité ne veut pas dire indépendance : le premier tirage modifie l'urne.\n⭐ Sur le dessin : les deux chemins qui finissent par $R_2$ pèsent chacun $\\dfrac{1}{5}$.",
          schema: ecranSeulement(
            arbre([
              { label: "R1", proba: "2/5", enfants: [{ label: "R2 → 1/5", proba: "1/2" }, { label: "V2", proba: "1/2" }] },
              { label: "V1", proba: "3/5", enfants: [{ label: "R2 → 1/5", proba: "1/3" }, { label: "V2", proba: "2/3" }] },
            ]),
          ),
          micros: ["proba_totales", "proba_inverse_bayes", "proba_conditionnelle_arbre"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de bac, avec ses questions qui s'enchaînent. L'arbre porte tout le raisonnement.",
      rappel: [
        "Plan type : on nomme les événements, on construit l'arbre, on calcule une probabilité totale, puis on inverse le conditionnement.",
        "Une probabilité conditionnelle dépend de la répartition de départ : si une proportion devient $x$, on obtient une FONCTION de $x$, qu'on étudie.",
        "Suite $p_{n+1} = ap_n + b$ avec $a \\neq 1$ : $\\ell = a\\ell + b$ donne le point fixe ; $v_n = p_n - \\ell$ est géométrique de raison $a$.",
      ],
      exercices: [
        {
          titre: "Le vaccin et les malades",
          enonce:
            "Pendant un hiver, $40$ % d'une population est vaccinée ($V$) contre une maladie. Un vacciné tombe malade ($G$) avec la probabilité $0{,}08$, un non-vacciné avec la probabilité $0{,}25$.\na) Calculer $P(G)$.\nb) Calculer $P_G(V)$. Un journal écrit : « $18$ % des malades étaient vaccinés, le vaccin ne sert à rien ». Qu'en penser ?\nc) On note $x$ la part des vaccinés. Montrer que $P_G(V) = \\dfrac{0{,}08x}{0{,}25 - 0{,}17x}$.\nd) Quelle part de vaccinés faudrait-il pour que la moitié des malades soient vaccinés ?",
          correction:
            "a) $P(G) = 0{,}4 \\times 0{,}08 + 0{,}6 \\times 0{,}25$ $= 0{,}032 + 0{,}15 = 0{,}182$.\nb) $P_G(V) = \\dfrac{0{,}032}{0{,}182} \\approx 0{,}176$ : environ $18$ % des malades sont vaccinés.\nMais le journal confond deux questions. Le vaccin protège : $P_V(G) = 0{,}08$ contre $P_{\\overline{V}}(G) = 0{,}25$, le risque est divisé par plus de $3$.\nc) $P(V \\cap G) = 0{,}08x$ et $P(G) = 0{,}08x + 0{,}25(1 - x) = 0{,}25 - 0{,}17x$. On divise.\nd) On résout $\\dfrac{0{,}08x}{0{,}25 - 0{,}17x} = 0{,}5$ : $0{,}08x = 0{,}125 - 0{,}085x$, donc $0{,}165x = 0{,}125$.\n$x = \\dfrac{0{,}125}{0{,}165} \\approx 0{,}758$ : avec environ $76$ % de vaccinés, la moitié des malades seraient vaccinés, alors que le vaccin marche toujours aussi bien.\n⚠️ $P_G(V)$ mesure la part des vaccinés parmi les malades ; l'efficacité se lit sur $P_V(G)$ comparé à $P_{\\overline{V}}(G)$.\n⭐ Sur le tableau : plus la population est vaccinée, plus les malades vaccinés sont nombreux. C'est un effet de la répartition, pas du vaccin.",
          schema: (
            <div className="grid grid-cols-1 min-w-0 gap-2">
              {ecranSeulement(
                arbre([
                  { label: "V", proba: "0,4", enfants: [{ label: "G → 0,032", proba: "0,08" }, { label: "Ḡ", proba: "0,92" }] },
                  { label: "V̄", proba: "0,6", enfants: [{ label: "G → 0,15", proba: "0,25" }, { label: "Ḡ", proba: "0,75" }] },
                ]),
              )}
              {tableau(["part x", "0,2", "0,4", "0,6", "0,8"], ["P sachant G", "0,074", "0,176", "0,324", "0,561"])}
            </div>
          ),
          micros: ["proba_totales", "proba_inverse_bayes", "proba_conditionnelle_defi"],
        },
        {
          titre: "Le dé et les deux urnes",
          enonce:
            "On lance un dé équilibré. S'il donne $6$, on prend l'urne $U_1$ ($3$ boules rouges, $1$ verte) ; sinon, l'urne $U_2$ ($2$ rouges, $3$ vertes). Dans l'urne choisie, on tire successivement deux boules sans remise.\na) Construire l'arbre, puis montrer que la probabilité de tirer deux boules rouges vaut $\\dfrac{1}{6}$.\nb) On a tiré deux rouges. Quelle est la probabilité que ce soit dans l'urne $U_1$ ?\nc) Calculer la probabilité $P(R_1)$ que la première boule soit rouge.\nd) On admet que $P(R_2) = P(R_1)$. Les événements $R_1$ et $R_2$ sont-ils indépendants ?",
          correction:
            "a) Dans $U_1$ : $P = \\dfrac{3}{4} \\times \\dfrac{2}{3} = \\dfrac{1}{2}$ pour deux rouges. Dans $U_2$ : $\\dfrac{2}{5} \\times \\dfrac{1}{4} = \\dfrac{1}{10}$.\nProbabilités totales : $P(R_1 \\cap R_2) = \\dfrac{1}{6} \\times \\dfrac{1}{2} + \\dfrac{5}{6} \\times \\dfrac{1}{10}$ $= \\dfrac{1}{12} + \\dfrac{1}{12} = \\dfrac{1}{6}$.\nb) $P_{R_1 \\cap R_2}(U_1) = \\dfrac{1/12}{1/6} = \\dfrac{1}{2}$.\nL'urne $U_1$ n'avait qu'une chance sur six d'être choisie ; après deux rouges, c'est une chance sur deux.\nc) $P(R_1) = \\dfrac{1}{6} \\times \\dfrac{3}{4} + \\dfrac{5}{6} \\times \\dfrac{2}{5} = \\dfrac{1}{8} + \\dfrac{1}{3} = \\dfrac{11}{24}$.\nd) $P(R_1) \\times P(R_2) = \\left(\\dfrac{11}{24}\\right)^2 = \\dfrac{121}{576} \\approx 0{,}210$, alors que $P(R_1 \\cap R_2) = \\dfrac{1}{6} \\approx 0{,}167$.\nCe n'est pas égal : $R_1$ et $R_2$ ne sont pas indépendants.\n⚠️ En a), on ne multiplie pas $P(R_1)$ par $P(R_2)$ : on additionne les chemins, urne par urne.\n⭐ Sur le dessin : les deux chemins « rouge, rouge » pèsent chacun $\\dfrac{1}{12}$, alors que les urnes pèsent $\\dfrac{1}{6}$ et $\\dfrac{5}{6}$.",
          schema: arbre3([
            { label: "U1", proba: "1/6", enfants: [{ label: "R1", proba: "3/4", enfants: [{ label: "R2", proba: "2/3" }, { label: "V2", proba: "1/3" }] }, { label: "V1", proba: "1/4" }] },
            { label: "U2", proba: "5/6", enfants: [{ label: "R1", proba: "2/5", enfants: [{ label: "R2", proba: "1/4" }, { label: "V2", proba: "3/4" }] }, { label: "V1", proba: "3/5" }] },
          ]),
          micros: ["proba_conditionnelle_arbre", "proba_totales", "proba_inverse_bayes", "proba_conditionnelle_defi"],
        },
        {
          titre: "Répondre au hasard",
          enonce:
            "Dans un QCM à $4$ réponses, un élève connaît la réponse d'une question avec la probabilité $0{,}6$. S'il la connaît, il répond juste ; sinon, il répond au hasard. $C$ : « il connaît la réponse » ; $J$ : « il répond juste ».\na) Calculer $P(J)$.\nb) L'élève a répondu juste. Quelle est la probabilité qu'il ait connu la réponse ?\nc) Le QCM propose maintenant $k$ réponses. Montrer que $P_J(C) = \\dfrac{0{,}6k}{0{,}6k + 0{,}4}$.\nd) Combien de réponses faut-il proposer pour que $P_J(C) \\geqslant 0{,}95$ ?",
          correction:
            "a) $P(J) = 0{,}6 \\times 1 + 0{,}4 \\times \\dfrac{1}{4} = 0{,}6 + 0{,}1 = 0{,}7$.\nb) $P_J(C) = \\dfrac{0{,}6}{0{,}7} = \\dfrac{6}{7} \\approx 0{,}857$.\nc) Avec $k$ réponses, $P(J) = 0{,}6 + \\dfrac{0{,}4}{k}$. Donc $P_J(C) = \\dfrac{0{,}6}{0{,}6 + \\dfrac{0{,}4}{k}}$ ; on multiplie en haut et en bas par $k$.\nd) Tout est positif : $0{,}6k \\geqslant 0{,}95(0{,}6k + 0{,}4)$ équivaut à $0{,}6k \\geqslant 0{,}57k + 0{,}38$, soit $0{,}03k \\geqslant 0{,}38$.\nDonc $k \\geqslant \\dfrac{0{,}38}{0{,}03} \\approx 12{,}7$ : il faut au moins $13$ réponses.\n⚠️ $k$ est un nombre ENTIER de réponses : on arrondit au-dessus, pas au plus proche.\n⚠️ $P_C(J) = 1$, mais $P_J(C)$ n'est que $0{,}857$ : une bonne réponse ne prouve pas qu'on savait.\n⭐ Sur le tableau : avec $2$ réponses, $0{,}75$ ; avec $4$, $0{,}857$ ; avec $10$, $0{,}938$ ; il faut aller jusqu'à $13$ pour passer $0{,}95$.",
          schema: (
            <div className="grid grid-cols-1 min-w-0 gap-2">
              {ecranSeulement(
                arbre([
                  { label: "C", proba: "0,6", enfants: [{ label: "J", proba: "1" }] },
                  { label: "C̄", proba: "0,4", enfants: [{ label: "J", proba: "1/4" }, { label: "J̄", proba: "3/4" }] },
                ]),
              )}
              {tableau(["k", "2", "4", "10", "13"], ["P sachant J", "0,75", "0,857", "0,938", "0,951"])}
            </div>
          ),
          micros: ["proba_totales", "proba_inverse_bayes", "proba_conditionnelle_defi"],
        },
        {
          titre: "Le bit qui traverse les relais",
          enonce:
            "Un bit ($0$ ou $1$) traverse une chaîne de relais. Chaque relais transmet le bit reçu correctement avec la probabilité $0{,}9$ et l'inverse avec la probabilité $0{,}1$, indépendamment des autres. On envoie un $1$. On note $p_n$ la probabilité que le bit soit correct après $n$ relais : $p_0 = 1$.\na) À l'aide d'un arbre, montrer que $p_{n+1} = 0{,}8p_n + 0{,}1$.\nb) On pose $v_n = p_n - 0{,}5$. Montrer que $(v_n)$ est géométrique, puis que $p_n = 0{,}5 + 0{,}5 \\times 0{,}8^n$.\nc) Déterminer la limite de $(p_n)$. Interpréter.\nd) Combien de relais au plus peut-on traverser pour que $p_n \\geqslant 0{,}75$ ?\ne) L'émetteur envoie $0$ ou $1$ avec la même probabilité. Après $2$ relais, on reçoit un $1$. Quelle est la probabilité qu'on ait envoyé un $1$ ?",
          correction:
            "a) Après $n$ relais, le bit est correct ($p_n$) ou faux ($1 - p_n$). Au relais suivant : correct puis transmis, ou faux puis inversé.\n$p_{n+1} = 0{,}9p_n + 0{,}1(1 - p_n) = 0{,}8p_n + 0{,}1$.\nb) $v_{n+1} = p_{n+1} - 0{,}5 = 0{,}8p_n - 0{,}4$ $= 0{,}8(p_n - 0{,}5) = 0{,}8v_n$.\n$(v_n)$ est géométrique de raison $0{,}8$, avec $v_0 = 0{,}5$. Donc $v_n = 0{,}5 \\times 0{,}8^n$ et $p_n = 0{,}5 + 0{,}5 \\times 0{,}8^n$.\nc) $-1 < 0{,}8 < 1$, donc $0{,}8^n \\to 0$ et $\\lim p_n = 0{,}5$.\nAprès beaucoup de relais, le bit reçu est correct une fois sur deux : il ne dit plus rien sur le bit envoyé.\nd) $p_n \\geqslant 0{,}75$ équivaut à $0{,}5 \\times 0{,}8^n \\geqslant 0{,}25$, soit $0{,}8^n \\geqslant 0{,}5$.\n$0{,}8^3 = 0{,}512$ et $0{,}8^4 = 0{,}4096$ : au plus $3$ relais.\ne) $p_2 = 0{,}82$. On reçoit $1$ si on a envoyé $1$ et qu'il est resté correct, ou envoyé $0$ et qu'il a été inversé.\n$P(\\text{reçu } 1) = 0{,}5 \\times 0{,}82 + 0{,}5 \\times 0{,}18 = 0{,}5$, donc la probabilité cherchée vaut $\\dfrac{0{,}41}{0{,}5} = 0{,}82$.\n⚠️ En d), le sens change : $0{,}8^n$ DIMINUE quand $n$ augmente, donc la condition est vraie pour les PETITS $n$.\n⭐ Sur le dessin, une graduation vaut $0{,}1$ : les points descendent vers la droite $y = 5$, c'est-à-dire $p = 0{,}5$.",
          schema: repere([-1, 9, -1, 11], [], termes(0, [10, 9, 8.2, 7.56, 7.05, 6.64, 6.31, 6.05, 5.84]), 5, true),
          micros: ["proba_totales", "proba_inverse_bayes", "proba_conditionnelle_defi"],
        },
      ],
    },
  ],
};
