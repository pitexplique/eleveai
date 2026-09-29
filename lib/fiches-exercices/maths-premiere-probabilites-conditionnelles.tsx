// ─── Fiche d'exercices : probabilités conditionnelles et indépendance (1re spé) ─
//                              20 exercices corrigés
//
// Feuille de 1re SPÉCIALITÉ du 29/09/2026, une par notion du coach. Alignée sur
// la banque `lib/tutor-v4/questionBank/premiere-spe/maths/probabilites-conditionnelles.bank.ts`
// (notionId probabilites_conditionnelles, onze micro-compétences).
//
// ⭐⭐ CE QUE LA SPÉ AJOUTE À LA SECONDE ET À LA 1re SANS SPÉ : la PARTITION de
// l'univers (exercice 6), la FORMULE DES PROBABILITÉS TOTALES, nommée et citée
// (9, 13, 15, 17, 19, 20), l'indépendance DÉMONTRÉE — y compris celle des
// contraires (11, 18) —, et la SUCCESSION DE DEUX ÉPREUVES INDÉPENDANTES, où
// l'arbre répète les mêmes branches (12, 16, 17, 18).
// ⛔ LE PIÈGE CENTRAL : confondre P_A(B) et P_B(A) — le test positif, l'alarme
// de gel, le paiement bloqué (13, 15, 17). Et incompatible ≠ indépendant (8, 18).
//
// ⭐ LES DESSINS : arbres pondérés dont le CHEMIN utile est en orange (aide
// locale `arbre`, le canvas du coach ne colore pas), tableaux croisés avec la
// case lue en couleur, diagrammes de Venn pondérés, la roue du jeu, le tableau
// face par face d'une partition. Chaque exercice a au moins un dessin ; ceux qui
// redisent le corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// ⭐ LE MONDE : baguage d'oiseaux, cyclisme, vergers d'une coopérative, site
// marchand, magasin et carte de fidélité, gel dans un vignoble, médiathèque,
// fraude bancaire, triathlon, test du nouveau-né, smartphones, route de montagne,
// le jeu des trois portes. Chiffres = MODÈLES, jamais des données officielles.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-spe-probabilites-conditionnelles.mjs`.
//
// Micro-compétences : pc_conditionnelle (1, 2), pc_registres (2), pc_tableau (3,
// 10, 14), pc_arbre_construire (4, 12, 13), pc_arbre (5, 12, 16, 20),
// pc_partition (6, 9, 19, 20), pc_totales (9, 13, 15, 17, 19, 20), pc_inverser
// (10, 13, 15, 17, 19, 20), pc_independance (7, 11, 14, 16, 18),
// pc_independance_incompatible (8, 18), pc_succession (12, 16, 17, 18). 11/11.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { diagramme, roue, tableauProba, trace, venn } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Un nœud de l'arbre. `chemin` colore la branche qui y MÈNE, et son étiquette. */
type Noeud = { label: string; proba: string; chemin?: boolean; enfants?: Noeud[] };

const CHEMIN = "#ea580c";

/**
 * L'ARBRE PONDÉRÉ AVEC SON CHEMIN EN COULEUR. Même géométrie que le canvas
 * `arbre_proba` du coach (colonnes 24 / 168 / 320, 48 par feuille, étiquette
 * d'un nœud intérieur AU-DESSUS du nœud), plus ce qu'il ne sait pas faire :
 * les branches marquées `chemin` en orange épais, dessinées par-dessus les
 * autres. ⛔ Texte NU (SVG). Même cadre défilant que `arbre()` de figures.tsx :
 * largeur naturelle sur téléphone, réduite sur papier.
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
  // Les branches du chemin en dernier : l'orange passe par-dessus le gris.
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

export const exercicesProbabilitesConditionnellesPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "probabilites-conditionnelles",
  titre: "Probabilités conditionnelles et indépendance",
  accroche:
    "Vingt exercices, du geste seul au problème de contrôle : traduire une phrase en probabilité, lire un tableau croisé, construire un arbre, reconnaître une partition, appliquer la formule des probabilités totales, retourner une condition, démontrer une indépendance, enchaîner deux épreuves indépendantes. Oiseaux bagués, vergers, gel dans les vignes, fraude bancaire, test du nouveau-né, jeu des trois portes. Les chemins utiles sont en orange sur les arbres des corrigés.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere-spe",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : traduire, lire, multiplier, comparer.",
      rappel: [
        "$P_A(B)$ se lit « probabilité de $B$ sachant $A$ ». Si $P(A) \\neq 0$ : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
        "Dans un tableau croisé, « sachant $A$ » : on divise par l'effectif de la LIGNE (ou de la colonne) de $A$, jamais par le total.",
        "Sur un arbre : on MULTIPLIE le long d'un chemin, $P(A \\cap B) = P(A) \\times P_A(B)$ ; on ADDITIONNE les chemins qui mènent au même événement.",
        "$A$ et $B$ sont INDÉPENDANTS quand $P(A \\cap B) = P(A) \\times P(B)$. Si $P(A) \\neq 0$, cela revient à $P_A(B) = P(B)$.",
      ],
      exercices: [
        {
          enonce: "On donne $P(A) = 0{,}5$, $P(B) = 0{,}25$ et $P(A \\cap B) = 0{,}2$.\na) Calculer $P_A(B)$.\nb) Calculer $P_B(A)$.",
          correction:
            "a) On se place parmi les issues de $A$ : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)} = \\dfrac{0{,}2}{0{,}5} = 0{,}4$.\nb) Cette fois, la condition est $B$ : on divise par $P(B)$.\n$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0{,}2}{0{,}25} = 0{,}8$.\n⭐ Sur le diagramme, la zone commune pèse $0{,}2$. Elle représente $40$ % du disque $A$, mais $80$ % du disque $B$.\n⛔ Le piège : croire que $P_A(B) = P_B(A)$. Le numérateur est le même, le dénominateur change.",
          schema: venn({ aSeul: ["0,3"], commun: ["0,2"], bSeul: ["0,05"], dehors: ["0,45"] }, {}, "commun"),
          micros: ["pc_conditionnelle"],
        },
        {
          enonce:
            "Dans un lycée, on choisit un élève au hasard. $I$ : « il est interne » ; $S$ : « il est membre de l'association sportive ». Traduire chaque phrase par une probabilité.\na) « $30$ % des internes sont membres de l'association sportive. »\nb) « $12$ % des élèves sont internes et membres de l'association. »\nc) « Parmi les membres de l'association, $40$ % sont internes. »\nd) En déduire $P(I)$ et $P(S)$.",
          correction:
            "a) « Des internes » : on se place parmi les internes. C'est $P_I(S) = 0{,}3$.\nb) « Internes ET membres » : aucune condition, c'est l'intersection. $P(I \\cap S) = 0{,}12$.\nc) « Parmi les membres » : on se place dans $S$. C'est $P_S(I) = 0{,}4$.\nd) $P(I \\cap S) = P(I) \\times P_I(S)$, donc $P(I) = \\dfrac{0{,}12}{0{,}3} = 0{,}4$.\nDe même, $P(I \\cap S) = P(S) \\times P_S(I)$, donc $P(S) = \\dfrac{0{,}12}{0{,}4} = 0{,}3$.\n⭐ Les mots « parmi », « sachant », « chez les » annoncent une condition. Le mot « et » annonce une intersection.\n⛔ Le piège : traduire a) par $P(S) = 0{,}3$. La phrase ne parle que des internes.",
          schema: ecranSeulement(arbre([{ label: "I", proba: "0,4", chemin: true, enfants: [{ label: "S → 0,12", proba: "0,3", chemin: true }, { label: "non S", proba: "0,7" }] }, { label: "non I", proba: "0,6" }])),
          micros: ["pc_registres", "pc_conditionnelle"],
        },
        {
          enonce:
            "Un centre de baguage a capturé $400$ oiseaux, puis a noté ceux qui ont été recapturés l'année suivante (tableau).\na) On choisit une mésange au hasard. Quelle est la probabilité qu'elle ait été recapturée ?\nb) On choisit un oiseau recapturé. Quelle est la probabilité que ce soit une mésange ?\nc) Quelle est la probabilité qu'un oiseau pris au hasard soit une mésange recapturée ?",
          figure: tableauProba(["", "Recapturés", "Non recap.", "Total"], [["Mésanges", "60", "180", "240"], ["Moineaux", "20", "140", "160"], ["Total", "80", "320", "400"]]),
          correction:
            "a) « Sachant que c'est une mésange » : on lit la LIGNE des mésanges, $240$ oiseaux. $P_M(R) = \\dfrac{60}{240} = 0{,}25$.\nb) « Sachant qu'il a été recapturé » : on lit la COLONNE des recapturés, $80$ oiseaux. $P_R(M) = \\dfrac{60}{80} = 0{,}75$.\nc) Aucune condition : on divise par le total. $P(M \\cap R) = \\dfrac{60}{400} = 0{,}15$.\n⭐ La même case ($60$) sert trois fois. C'est le dénominateur qui dit la question.\n⛔ Le piège : répondre $0{,}15$ au a). « Sachant que c'est une mésange » interdit de diviser par $400$.",
          schema: ecranSeulement(tableauProba(["", "Recapturés", "Non recap.", "Total"], [["Mésanges", "60", "180", "240"], ["Moineaux", "20", "140", "160"], ["Total", "80", "320", "400"]], [[0, 1], [0, 3], [2, 1]])),
          micros: ["pc_tableau"],
        },
        {
          enonce:
            "Une coureuse cycliste crève dans $10$ % des courses. Quand elle crève, elle finit dans les dix premières dans $20$ % des cas ; sinon, dans $65$ % des cas. On note $C$ : « elle crève » et $T$ : « elle finit dans les dix premières ».\nConstruire l'arbre pondéré, et dire quelle probabilité porte chaque branche.",
          correction:
            "Premier niveau : ce qui arrive d'abord, la crevaison. $P(C) = 0{,}1$ et $P(\\overline{C}) = 1 - 0{,}1 = 0{,}9$.\nDeuxième niveau, derrière $C$ : « quand elle crève, $20$ % » est une probabilité CONDITIONNELLE. $P_C(T) = 0{,}2$ et $P_C(\\overline{T}) = 0{,}8$.\nDerrière $\\overline{C}$ : $P_{\\overline{C}}(T) = 0{,}65$ et $P_{\\overline{C}}(\\overline{T}) = 0{,}35$.\n✔️ Les branches issues d'un même nœud font $1$ : $0{,}1 + 0{,}9$, $0{,}2 + 0{,}8$, $0{,}65 + 0{,}35$.\n⛔ Le piège : écrire $0{,}2$ sur une branche du premier niveau. Au premier niveau, on ne met que des probabilités SANS condition.",
          schema: arbre([{ label: "C", proba: "0,1", enfants: [{ label: "T", proba: "0,2" }, { label: "non T", proba: "0,8" }] }, { label: "non C", proba: "0,9", enfants: [{ label: "T", proba: "0,65" }, { label: "non T", proba: "0,35" }] }]),
          micros: ["pc_arbre_construire"],
        },
        {
          enonce: "On considère l'arbre pondéré ci-dessous.\na) Calculer $P(A \\cap \\overline{B})$.\nb) Calculer $P(\\overline{A} \\cap B)$.\nc) Calculer $P(B)$.",
          figure: arbre([{ label: "A", proba: "0,3", enfants: [{ label: "B", proba: "0,8" }, { label: "non B", proba: "0,2" }] }, { label: "non A", proba: "0,7", enfants: [{ label: "B", proba: "0,4" }, { label: "non B", proba: "0,6" }] }]),
          correction:
            "a) On suit le chemin $A \\to \\overline{B}$ et on multiplie : $P(A \\cap \\overline{B}) = 0{,}3 \\times 0{,}2 = 0{,}06$.\nb) Chemin $\\overline{A} \\to B$ : $P(\\overline{A} \\cap B) = 0{,}7 \\times 0{,}4 = 0{,}28$.\nc) Deux chemins mènent à $B$ (en orange) : $A \\to B$ et $\\overline{A} \\to B$. On les additionne.\n$P(B) = 0{,}3 \\times 0{,}8 + 0{,}7 \\times 0{,}4 = 0{,}24 + 0{,}28 = 0{,}52$.\n⛔ Le piège : $P(B) = 0{,}8 + 0{,}4 = 1{,}2$. Une probabilité plus grande que $1$ signale l'erreur : on a additionné des BRANCHES au lieu de CHEMINS.",
          schema: ecranSeulement(arbre([{ label: "A", proba: "0,3", chemin: true, enfants: [{ label: "B → 0,24", proba: "0,8", chemin: true }, { label: "non B", proba: "0,2" }] }, { label: "non A", proba: "0,7", chemin: true, enfants: [{ label: "B → 0,28", proba: "0,4", chemin: true }, { label: "non B", proba: "0,6" }] }])),
          micros: ["pc_arbre"],
        },
        {
          enonce:
            "On lance un dé équilibré à six faces. Dire si chaque liste d'événements forme une partition de l'univers $\\Omega = \\{1 ; 2 ; 3 ; 4 ; 5 ; 6\\}$.\na) $A_1 = \\{1 ; 2\\}$, $A_2 = \\{3 ; 4 ; 5\\}$, $A_3 = \\{6\\}$.\nb) $B_1 = \\{1 ; 2 ; 3\\}$, $B_2 = \\{3 ; 4\\}$, $B_3 = \\{5 ; 6\\}$.\nc) $C_1$ : « le résultat est pair » ; $C_2 = \\{1 ; 3\\}$.",
          correction:
            "Une partition découpe $\\Omega$ en morceaux non vides, sans chevauchement et sans oubli : chaque issue tombe dans UN morceau, et un seul.\na) Chaque face est dans exactement un $A_i$ (tableau) : c'est une partition.\nb) La face $3$ est à la fois dans $B_1$ et dans $B_2$ : ce n'est pas une partition. Les morceaux se chevauchent.\nc) La face $5$ n'est ni paire, ni dans $C_2$ : ce n'est pas une partition. Il manque un morceau.\n⭐ Le test se fait face par face : une ligne par liste, une case par issue, et un seul nom dans chaque case.\n⛔ Le piège du b) : les trois morceaux couvrent bien les six faces, mais couvrir ne suffit pas.",
          schema: trace(["Face", "1", "2", "3", "4", "5", "6"], [["A", "A1", "A1", "A2", "A2", "A2", "A3"], ["B", "B1", "B1", "B1 B2", "B2", "B3", "B3"], ["C", "C2", "C1", "C2", "C1", "aucun", "C1"]]),
          micros: ["pc_partition"],
        },
        {
          enonce: "On donne $P(A) = 0{,}4$, $P(B) = 0{,}5$, $P(C) = 0{,}3$, $P(A \\cap B) = 0{,}2$ et $P(A \\cap C) = 0{,}15$.\na) Les événements $A$ et $B$ sont-ils indépendants ?\nb) Et $A$ et $C$ ?",
          correction:
            "On compare l'intersection au PRODUIT des probabilités.\na) $P(A) \\times P(B) = 0{,}4 \\times 0{,}5 = 0{,}2 = P(A \\cap B)$ : $A$ et $B$ sont indépendants.\nb) $P(A) \\times P(C) = 0{,}4 \\times 0{,}3 = 0{,}12$, alors que $P(A \\cap C) = 0{,}15$ : $A$ et $C$ ne sont pas indépendants.\n⭐ Autre lecture : $P_A(C) = \\dfrac{0{,}15}{0{,}4} = 0{,}375 \\neq 0{,}3$. Savoir que $A$ est réalisé CHANGE la probabilité de $C$.\n⭐ Dans le tableau de $A$ et $B$, les deux lignes sont proportionnelles : $B$ pèse la moitié de $A$ comme la moitié de $\\overline{A}$.",
          schema: ecranSeulement(tableauProba(["", "B", "non B", "Total"], [["A", "0,2", "0,2", "0,4"], ["non A", "0,3", "0,3", "0,6"], ["Total", "0,5", "0,5", "1"]], [[0, 1]])),
          micros: ["pc_independance"],
        },
        {
          enonce: "On lance un dé équilibré à six faces. $A$ : « le résultat est pair » ; $B = \\{1 ; 3\\}$ ; $C = \\{1 ; 2\\}$.\na) $A$ et $B$ sont-ils incompatibles ? indépendants ?\nb) Même question pour $A$ et $C$.",
          correction:
            "a) $A = \\{2 ; 4 ; 6\\}$ et $B = \\{1 ; 3\\}$ n'ont aucune face commune : $A \\cap B = \\varnothing$, ils sont INCOMPATIBLES.\nPourtant $P(A) \\times P(B) = \\dfrac{1}{2} \\times \\dfrac{1}{3} = \\dfrac{1}{6}$, alors que $P(A \\cap B) = 0$ : ils ne sont PAS indépendants.\nSi $B$ est réalisé, $A$ devient impossible : $B$ renseigne complètement sur $A$.\nb) $A \\cap C = \\{2\\}$ : ils ne sont pas incompatibles.\n$P(A \\cap C) = \\dfrac{1}{6}$ et $P(A) \\times P(C) = \\dfrac{1}{2} \\times \\dfrac{2}{6} = \\dfrac{1}{6}$ : ils sont indépendants.\n⛔ Le piège : croire qu'« incompatibles » et « indépendants » disent la même chose. C'est presque le contraire : deux événements incompatibles, de probabilités non nulles, ne sont jamais indépendants.",
          schema: (
            <div className="grid min-w-0 grid-cols-1 gap-2">
              {venn({ aSeul: ["2", "4", "6"], commun: [], bSeul: ["1", "3"], dehors: ["5"] }, { a: "A", b: "B", e: "Dé" })}
              {ecranSeulement(venn({ aSeul: ["4", "6"], commun: ["2"], bSeul: ["1"], dehors: ["3", "5"] }, { a: "A", b: "C", e: "Dé" }, "commun"))}
            </div>
          ),
          micros: ["pc_independance_incompatible"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle : nommer, construire, citer la formule, conclure par une phrase.",
      rappel: [
        "Une PARTITION de l'univers : des événements $A_1, A_2, \\ldots, A_n$ deux à deux incompatibles, dont la réunion est $\\Omega$. Exemple le plus simple : $A$ et $\\overline{A}$.",
        "FORMULE DES PROBABILITÉS TOTALES : si $A_1, \\ldots, A_n$ forment une partition, $P(B) = P(A_1 \\cap B) + \\cdots + P(A_n \\cap B)$. Sur l'arbre, c'est la somme des chemins qui mènent à $B$.",
        "Pour « retourner » une condition : $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$, où $P(B)$ vient souvent de la formule des probabilités totales.",
        "Si $A$ et $B$ sont indépendants, $\\overline{A}$ et $B$ le sont aussi. Deux épreuves INDÉPENDANTES qui se suivent : l'arbre répète les mêmes branches derrière chaque nœud.",
      ],
      exercices: [
        {
          enonce:
            "Une coopérative reçoit ses pommes de trois vergers : $45$ % viennent du verger $V_1$, $35$ % de $V_2$ et $20$ % de $V_3$. Les pommes abîmées représentent $4$ % de la récolte de $V_1$, $2$ % de celle de $V_2$ et $10$ % de celle de $V_3$. On prend une pomme au hasard ; $A$ : « elle est abîmée ».\na) Justifier que $V_1$, $V_2$, $V_3$ forment une partition de l'univers.\nb) Calculer $P(A)$ en citant la formule utilisée.\nc) La pomme est abîmée. Quelle est la probabilité qu'elle vienne de $V_3$ ?",
          correction:
            "a) Chaque pomme vient d'un verger, et d'un seul : les trois événements sont deux à deux incompatibles, et leur réunion est l'univers. C'est une partition.\nb) D'après la formule des probabilités totales, pour la partition $V_1$, $V_2$, $V_3$ :\n$P(A) = P(V_1 \\cap A) + P(V_2 \\cap A) + P(V_3 \\cap A)$.\n$P(A) = 0{,}45 \\times 0{,}04 + 0{,}35 \\times 0{,}02 + 0{,}2 \\times 0{,}1 = 0{,}018 + 0{,}007 + 0{,}02 = 0{,}045$.\nc) $P_A(V_3) = \\dfrac{P(V_3 \\cap A)}{P(A)} = \\dfrac{0{,}02}{0{,}045} = \\dfrac{4}{9} \\approx 0{,}444$.\n⭐ $V_3$ ne fournit que $20$ % des pommes, mais près de $44$ % des pommes abîmées.\n⛔ Le piège au c) : répondre $0{,}1$. C'est $P_{V_3}(A)$, la question dans l'autre sens.",
          schema: arbre([{ label: "V1", proba: "0,45", chemin: true, enfants: [{ label: "A → 0,018", proba: "0,04", chemin: true }, { label: "non A", proba: "0,96" }] }, { label: "V2", proba: "0,35", chemin: true, enfants: [{ label: "A → 0,007", proba: "0,02", chemin: true }, { label: "non A", proba: "0,98" }] }, { label: "V3", proba: "0,2", chemin: true, enfants: [{ label: "A → 0,02", proba: "0,1", chemin: true }, { label: "non A", proba: "0,9" }] }]),
          micros: ["pc_partition", "pc_totales", "pc_inverser"],
        },
        {
          enonce:
            "Un site marchand a reçu $2\\,000$ commandes : $30$ % passées depuis un téléphone, les autres depuis un ordinateur. $8$ % des commandes sur téléphone sont renvoyées, contre $5$ % des commandes sur ordinateur.\na) Dresser le tableau croisé des effectifs.\nb) Calculer la probabilité qu'une commande soit renvoyée.\nc) Une commande est renvoyée. Quelle est la probabilité qu'elle ait été passée sur téléphone ?",
          correction:
            "a) Téléphone : $0{,}3 \\times 2\\,000 = 600$ commandes, dont $0{,}08 \\times 600 = 48$ renvoyées et $552$ gardées.\nOrdinateur : $1\\,400$ commandes, dont $0{,}05 \\times 1\\,400 = 70$ renvoyées et $1\\,330$ gardées.\nRenvoyées : $48 + 70 = 118$.\nb) $P(R) = \\dfrac{118}{2\\,000} = 0{,}059$.\nc) On se place dans la COLONNE des renvoyées : $P_R(T) = \\dfrac{48}{118} \\approx 0{,}407$.\n⭐ Les téléphones font $30$ % des commandes, mais environ $41$ % des renvois.\n⛔ Le piège au c) : répondre $0{,}08$. C'est $P_T(R)$, pas $P_R(T)$.",
          schema: ecranSeulement(tableauProba(["", "Renvoyées", "Gardées", "Total"], [["Téléphone", "48", "552", "600"], ["Ordinateur", "70", "1330", "1400"], ["Total", "118", "1882", "2000"]], [[0, 1], [2, 1]])),
          micros: ["pc_tableau", "pc_inverser"],
        },
        {
          enonce:
            "Dans un magasin, on choisit un client au hasard. $C$ : « il paie par carte » ; $F$ : « il a une carte de fidélité ». On sait que $P(C) = 0{,}6$, $P(F) = 0{,}3$ et $P(C \\cup F) = 0{,}72$.\na) Calculer $P(C \\cap F)$.\nb) Démontrer que $C$ et $F$ sont indépendants.\nc) Démontrer que $\\overline{C}$ et $F$ sont aussi indépendants.",
          correction:
            "a) $P(C \\cup F) = P(C) + P(F) - P(C \\cap F)$, donc $P(C \\cap F) = 0{,}6 + 0{,}3 - 0{,}72 = 0{,}18$.\nb) $P(C) \\times P(F) = 0{,}6 \\times 0{,}3 = 0{,}18 = P(C \\cap F)$ : $C$ et $F$ sont indépendants.\nc) $F$ se coupe en deux morceaux incompatibles, $C \\cap F$ et $\\overline{C} \\cap F$. Donc $P(\\overline{C} \\cap F) = P(F) - P(C \\cap F) = 0{,}3 - 0{,}18 = 0{,}12$.\nEt $P(\\overline{C}) \\times P(F) = 0{,}4 \\times 0{,}3 = 0{,}12$ : $\\overline{C}$ et $F$ sont indépendants.\n⭐ C'est une propriété générale : si $A$ et $B$ sont indépendants, $\\overline{A}$ et $B$ le sont aussi. Le calcul du c) en est la démonstration, avec des nombres.\n⛔ Le piège au a) : écrire d'emblée $P(C \\cap F) = 0{,}6 \\times 0{,}3$. C'est justement ce qu'il faut démontrer.",
          schema: venn({ aSeul: ["0,42"], commun: ["0,18"], bSeul: ["0,12"], dehors: ["0,28"] }, { a: "C", b: "F" }, "commun"),
          micros: ["pc_independance"],
        },
        {
          enonce:
            "Un jeu se joue en deux temps. On fait d'abord tourner une roue : elle s'arrête sur « Or » avec la probabilité $0{,}2$, sur « Argent » avec $0{,}3$, sur « Rien » avec $0{,}5$. Puis on tire une bille dans un sac de quatre billes, dont une verte. Les deux épreuves sont indépendantes. $V$ : « la bille est verte ».\na) Construire l'arbre pondéré.\nb) Calculer $P(\\text{Or} \\cap V)$.\nc) On gagne un lot si la roue donne « Or », ou si elle donne « Argent » et la bille est verte. Calculer la probabilité de gagner un lot.",
          figure: ecranSeulement(roue([{ label: "Or", poids: 2, couleur: "#eab308" }, { label: "Argent", poids: 3, couleur: "#94a3b8" }, { label: "Rien", poids: 5, couleur: "#64748b" }])),
          correction:
            "a) Premier niveau, la roue : $0{,}2$ ; $0{,}3$ ; $0{,}5$. Deuxième niveau, la bille : $P(V) = \\dfrac{1}{4} = 0{,}25$, quel que soit le secteur, puisque les épreuves sont indépendantes.\nDerrière chaque secteur, on répète donc les mêmes branches : $0{,}25$ pour $V$, $0{,}75$ pour $\\overline{V}$.\nb) $P(\\text{Or} \\cap V) = 0{,}2 \\times 0{,}25 = 0{,}05$.\nc) Trois chemins gagnent (en orange) : $\\text{Or} \\to V$, $\\text{Or} \\to \\overline{V}$ et $\\text{Argent} \\to V$.\n$P(\\text{lot}) = 0{,}2 \\times 0{,}25 + 0{,}2 \\times 0{,}75 + 0{,}3 \\times 0{,}25 = 0{,}05 + 0{,}15 + 0{,}075 = 0{,}275$.\n⭐ Plus court : les deux chemins de « Or » font $0{,}2$ à eux deux, et $0{,}2 + 0{,}075 = 0{,}275$.\n⛔ Le piège : oublier le chemin $\\text{Or} \\to \\overline{V}$. Avec l'or, la couleur de la bille ne compte plus.",
          schema: arbre([{ label: "Or", proba: "0,2", chemin: true, enfants: [{ label: "V → 0,05", proba: "0,25", chemin: true }, { label: "non V → 0,15", proba: "0,75", chemin: true }] }, { label: "Argent", proba: "0,3", chemin: true, enfants: [{ label: "V → 0,075", proba: "0,25", chemin: true }, { label: "non V", proba: "0,75" }] }, { label: "Rien", proba: "0,5", enfants: [{ label: "V", proba: "0,25" }, { label: "non V", proba: "0,75" }] }]),
          micros: ["pc_succession", "pc_arbre_construire", "pc_arbre"],
        },
        {
          enonce:
            "Au printemps, dans un vignoble, une nuit est une nuit de gel avec la probabilité $0{,}2$. Une sonde déclenche une alarme $90$ % des nuits de gel, et aussi $15$ % des nuits sans gel. $G$ : « il gèle » ; $A$ : « l'alarme sonne ».\na) Construire l'arbre pondéré.\nb) Calculer $P(A)$ avec la formule des probabilités totales.\nc) L'alarme sonne. Quelle est la probabilité qu'il gèle vraiment ?\nd) À chaque alarme, le vigneron allume des bougies antigel. Sur $30$ nuits, combien de nuits les allume-t-il pour rien, en moyenne ?",
          correction:
            "a) $P(G) = 0{,}2$, $P(\\overline{G}) = 0{,}8$ ; $P_G(A) = 0{,}9$, $P_G(\\overline{A}) = 0{,}1$ ; $P_{\\overline{G}}(A) = 0{,}15$, $P_{\\overline{G}}(\\overline{A}) = 0{,}85$.\nb) $G$ et $\\overline{G}$ forment une partition. Formule des probabilités totales :\n$P(A) = P(G \\cap A) + P(\\overline{G} \\cap A) = 0{,}2 \\times 0{,}9 + 0{,}8 \\times 0{,}15 = 0{,}18 + 0{,}12 = 0{,}3$.\nc) $P_A(G) = \\dfrac{P(G \\cap A)}{P(A)} = \\dfrac{0{,}18}{0{,}3} = 0{,}6$.\nd) Une nuit « pour rien », c'est $\\overline{G} \\cap A$, de probabilité $0{,}12$. Sur $30$ nuits : $30 \\times 0{,}12 = 3{,}6$ nuits en moyenne.\n⭐ La sonde repère $90$ % des gels, et pourtant $4$ alarmes sur $10$ sont fausses : les nuits sans gel sont quatre fois plus nombreuses.\n⛔ Le piège au c) : répondre $0{,}9$, qui est $P_G(A)$.",
          schema: arbre([{ label: "G", proba: "0,2", chemin: true, enfants: [{ label: "A → 0,18", proba: "0,9", chemin: true }, { label: "non A", proba: "0,1" }] }, { label: "non G", proba: "0,8", chemin: true, enfants: [{ label: "A → 0,12", proba: "0,15", chemin: true }, { label: "non A", proba: "0,85" }] }]),
          micros: ["pc_arbre_construire", "pc_totales", "pc_inverser"],
        },
        {
          enonce:
            "Une médiathèque compte $800$ inscrits. Le tableau croise leur âge et le fait d'emprunter des bandes dessinées. $J$ : « l'inscrit a moins de $25$ ans » ; $D$ : « il emprunte des BD ».\na) Calculer $P(J)$, $P(D)$ et $P(J \\cap D)$.\nb) Les événements $J$ et $D$ sont-ils indépendants ?\nc) Confirmer en comparant $P_J(D)$ et $P(D)$.",
          figure: tableauProba(["", "BD", "Pas de BD", "Total"], [["Moins de 25", "128", "192", "320"], ["25 et plus", "144", "336", "480"], ["Total", "272", "528", "800"]]),
          correction:
            "a) $P(J) = \\dfrac{320}{800} = 0{,}4$ ; $P(D) = \\dfrac{272}{800} = 0{,}34$ ; $P(J \\cap D) = \\dfrac{128}{800} = 0{,}16$.\nb) $P(J) \\times P(D) = 0{,}4 \\times 0{,}34 = 0{,}136 \\neq 0{,}16$ : $J$ et $D$ ne sont pas indépendants.\nc) $P_J(D) = \\dfrac{128}{320} = 0{,}4$, alors que $P(D) = 0{,}34$. Les moins de $25$ ans empruntent plus souvent des BD que l'ensemble des inscrits.\n⭐ Chez les $25$ ans et plus : $\\dfrac{144}{480} = 0{,}3$. Le diagramme compare les trois parts, en % : elles ne sont pas égales, c'est cela, la dépendance.\n⛔ Le piège : conclure « pas indépendants » parce que $P(J \\cap D)$ n'est pas nul. Ce serait confondre avec « incompatibles ».",
          schema: ecranSeulement(diagramme("barres", [{ label: "Moins de 25", value: 40 }, { label: "25 et plus", value: 30 }, { label: "Tous", value: 34 }])),
          micros: ["pc_independance", "pc_tableau"],
        },
        {
          enonce:
            "Une banque estime que $0{,}2$ % des paiements par carte sont frauduleux. Son algorithme bloque $98$ % des paiements frauduleux, mais aussi $1$ % des paiements honnêtes. $F$ : « le paiement est frauduleux » ; $B$ : « il est bloqué ».\na) Calculer $P(B)$.\nb) Un paiement est bloqué. Quelle est la probabilité qu'il soit frauduleux ?\nc) Retrouver ce résultat avec un tableau sur $100\\,000$ paiements, et commenter.",
          correction:
            "a) $F$ et $\\overline{F}$ forment une partition ; formule des probabilités totales :\n$P(B) = 0{,}002 \\times 0{,}98 + 0{,}998 \\times 0{,}01 = 0{,}00196 + 0{,}00998 = 0{,}01194$.\nb) $P_B(F) = \\dfrac{0{,}00196}{0{,}01194} \\approx 0{,}164$.\nc) Sur $100\\,000$ paiements : $200$ fraudes, dont $196$ bloquées ; $99\\,800$ paiements honnêtes, dont $998$ bloqués. Sur $1\\,194$ paiements bloqués, $196$ seulement sont des fraudes : $\\dfrac{196}{1\\,194} \\approx 0{,}164$.\n⭐ Environ $5$ blocages sur $6$ gênent un client honnête. L'algorithme est bon, mais la fraude est RARE : $1$ % d'une foule, c'est beaucoup de monde.\n⛔ Le piège : répondre $0{,}98$, qui est $P_F(B)$.",
          schema: ecranSeulement(tableauProba(["Sur 100 000", "Bloqué", "Accepté", "Total"], [["Fraudes", "196", "4", "200"], ["Honnêtes", "998", "98802", "99800"], ["Total", "1194", "98806", "100000"]], [[0, 1], [2, 1]])),
          micros: ["pc_inverser", "pc_totales"],
        },
        {
          enonce:
            "Lors d'un triathlon, un athlète sort de l'eau dans son temps prévu avec la probabilité $0{,}8$ (événement $N$). Sur le vélo, il évite la crevaison avec la probabilité $0{,}9$ (événement $V$). On admet que les deux épreuves sont indépendantes.\na) Construire l'arbre pondéré.\nb) Calculer la probabilité que tout se passe bien.\nc) Calculer la probabilité qu'il rencontre exactement un problème.\nd) Calculer la probabilité qu'il rencontre au moins un problème.",
          correction:
            "a) Épreuves indépendantes : derrière $N$ comme derrière $\\overline{N}$, les mêmes branches, $0{,}9$ pour $V$ et $0{,}1$ pour $\\overline{V}$.\nb) $P(N \\cap V) = P(N) \\times P(V) = 0{,}8 \\times 0{,}9 = 0{,}72$.\nc) Deux chemins (en orange) : $N \\to \\overline{V}$ et $\\overline{N} \\to V$.\n$0{,}8 \\times 0{,}1 + 0{,}2 \\times 0{,}9 = 0{,}08 + 0{,}18 = 0{,}26$.\nd) « Au moins un problème » est le contraire de « tout va bien » : $1 - 0{,}72 = 0{,}28$.\n✔️ Vérification : $0{,}28 = 0{,}26 + 0{,}02$, où $0{,}02 = 0{,}2 \\times 0{,}1$ compte les deux problèmes à la fois.\n⛔ Le piège au d) : additionner $0{,}2 + 0{,}1 = 0{,}3$. On compterait deux fois le cas où les deux problèmes arrivent.",
          schema: ecranSeulement(arbre([{ label: "N", proba: "0,8", chemin: true, enfants: [{ label: "V", proba: "0,9" }, { label: "non V → 0,08", proba: "0,1", chemin: true }] }, { label: "non N", proba: "0,2", chemin: true, enfants: [{ label: "V → 0,18", proba: "0,9", chemin: true }, { label: "non V", proba: "0,1" }] }])),
          micros: ["pc_succession", "pc_independance", "pc_arbre"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle : nommer les événements, arbre ou tableau, formule citée, phrase de conclusion.",
      rappel: [
        "Un problème de probabilités commence par NOMMER les événements, puis par l'arbre ou le tableau.",
        "La question retournée ($P_B(A)$ quand l'énoncé donne $P_A(B)$) se traite en deux temps : $P(B)$ par les probabilités totales, puis le quotient.",
        "Raisonner sur un grand effectif ($10\\,000$ personnes, $200\\,000$ bébés) rend les faux positifs visibles.",
      ],
      exercices: [
        {
          titre: "Le test du nouveau-né",
          enonce:
            "Une maladie touche $0{,}5$ % des nouveau-nés. Un test la détecte chez $98$ % des bébés malades, mais il est aussi positif chez $3$ % des bébés sains. $M$ : « le bébé est malade » ; $T$ : « le test est positif ».\na) Construire l'arbre et calculer $P(T)$.\nb) Le test d'un bébé est positif. Quelle est la probabilité qu'il soit malade ? Commenter.\nc) On refait un second test, et on admet que, pour un bébé donné, les deux tests se trompent de façon indépendante. Calculer la probabilité qu'un bébé malade ait deux tests positifs, puis celle d'un bébé sain.\nd) Les deux tests sont positifs. Quelle est maintenant la probabilité que le bébé soit malade ?",
          correction:
            "a) $P(M) = 0{,}005$, $P(\\overline{M}) = 0{,}995$ ; $P_M(T) = 0{,}98$ ; $P_{\\overline{M}}(T) = 0{,}03$.\nFormule des probabilités totales : $P(T) = 0{,}005 \\times 0{,}98 + 0{,}995 \\times 0{,}03 = 0{,}0049 + 0{,}02985 = 0{,}03475$.\nb) $P_T(M) = \\dfrac{0{,}0049}{0{,}03475} \\approx 0{,}141$.\nSur $200\\,000$ bébés : $1\\,000$ malades, dont $980$ positifs ; $199\\,000$ sains, dont $5\\,970$ positifs. Seuls $980$ positifs sur $6\\,950$ sont malades.\nUn test positif ne veut donc pas dire « malade » : environ $1$ chance sur $7$. La maladie est rare, et les faux positifs sont six fois plus nombreux que les vrais.\nc) Deux épreuves indépendantes : on multiplie. Bébé malade : $0{,}98 \\times 0{,}98 = 0{,}9604$. Bébé sain : $0{,}03 \\times 0{,}03 = 0{,}0009$.\nd) Même raisonnement, avec « deux tests positifs » à la place de $T$ :\n$P(\\text{deux positifs}) = 0{,}005 \\times 0{,}9604 + 0{,}995 \\times 0{,}0009 = 0{,}004802 + 0{,}0008955 = 0{,}0056975$.\nLa probabilité d'être malade vaut alors $\\dfrac{0{,}004802}{0{,}0056975} \\approx 0{,}843$.\n⭐ De $14$ % à $84$ % : le second test fait le tri. C'est pourquoi un dépistage positif se CONFIRME toujours.\n⛔ Le piège au b) : répondre $98$ %. C'est $P_M(T)$, la qualité du test, pas la question des parents.",
          schema: (
            <div className="grid min-w-0 grid-cols-1 gap-2 print:grid-cols-2 print:items-start">
              {ecranSeulement(arbre([{ label: "M", proba: "0,005", chemin: true, enfants: [{ label: "T → 0,0049", proba: "0,98", chemin: true }, { label: "non T", proba: "0,02" }] }, { label: "non M", proba: "0,995", chemin: true, enfants: [{ label: "T → 0,02985", proba: "0,03", chemin: true }, { label: "non T", proba: "0,97" }] }]))}
              {tableauProba(["Sur 200 000", "Positif", "Négatif", "Total"], [["Malades", "980", "20", "1000"], ["Sains", "5970", "193030", "199000"], ["Total", "6950", "193050", "200000"]], [[0, 1], [2, 1]])}
            </div>
          ),
          micros: ["pc_totales", "pc_inverser", "pc_succession", "pc_arbre_construire"],
        },
        {
          titre: "Les deux défauts du smartphone",
          enonce:
            "Sur une chaîne de montage, un smartphone peut avoir un défaut d'écran (événement $E$, de probabilité $0{,}04$) et un défaut de batterie (événement $B$, de probabilité $0{,}05$). Les deux pièces viennent de deux ateliers différents : on admet que $E$ et $B$ sont indépendants.\na) Calculer la probabilité qu'un smartphone ait les deux défauts.\nb) $E$ et $B$ sont-ils incompatibles ?\nc) Démontrer que $\\overline{E}$ et $\\overline{B}$ sont indépendants.\nd) Calculer de deux façons la probabilité qu'un smartphone ait au moins un défaut.\ne) Un smartphone a au moins un défaut. Quelle est la probabilité qu'il ait les deux ?",
          correction:
            "a) Indépendance : $P(E \\cap B) = P(E) \\times P(B) = 0{,}04 \\times 0{,}05 = 0{,}002$.\nb) Non : $P(E \\cap B) = 0{,}002 \\neq 0$. Les deux défauts peuvent arriver ensemble. Indépendants, oui ; incompatibles, non.\nc) $P(E \\cup B) = P(E) + P(B) - P(E \\cap B) = 0{,}04 + 0{,}05 - 0{,}002 = 0{,}088$.\n« Aucun défaut » est le contraire de « au moins un » : $P(\\overline{E} \\cap \\overline{B}) = 1 - 0{,}088 = 0{,}912$.\nEt $P(\\overline{E}) \\times P(\\overline{B}) = 0{,}96 \\times 0{,}95 = 0{,}912$. Égalité : $\\overline{E}$ et $\\overline{B}$ sont indépendants.\nd) Première façon, déjà faite : $P(E \\cup B) = 0{,}088$.\nSeconde façon, par le contraire et l'indépendance de c) : $1 - 0{,}96 \\times 0{,}95 = 1 - 0{,}912 = 0{,}088$.\ne) « Les deux défauts » est inclus dans « au moins un » : $P_{E \\cup B}(E \\cap B) = \\dfrac{0{,}002}{0{,}088} \\approx 0{,}023$.\n⭐ Sur l'arbre, l'indépendance se voit : derrière $E$ comme derrière $\\overline{E}$, la batterie a les mêmes branches.\n⛔ Le piège au d) : $0{,}04 + 0{,}05 = 0{,}09$, en comptant deux fois les smartphones aux deux défauts.",
          schema: ecranSeulement(
            <div className="grid min-w-0 grid-cols-1 gap-2">
              {venn({ aSeul: ["0,038"], commun: ["0,002"], bSeul: ["0,048"], dehors: ["0,912"] }, { a: "E", b: "B" }, "union")}
              {arbre([{ label: "E", proba: "0,04", chemin: true, enfants: [{ label: "B → 0,002", proba: "0,05", chemin: true }, { label: "non B → 0,038", proba: "0,95", chemin: true }] }, { label: "non E", proba: "0,96", chemin: true, enfants: [{ label: "B → 0,048", proba: "0,05", chemin: true }, { label: "non B", proba: "0,95" }] }])}
            </div>,
          ),
          micros: ["pc_independance", "pc_independance_incompatible", "pc_succession"],
        },
        {
          titre: "La route et la météo",
          enonce:
            "Sur une route de montagne, on modélise le temps d'un jour d'hiver : sec avec la probabilité $0{,}7$ (événement $S$), pluvieux avec $0{,}25$ ($H$), neigeux avec $0{,}05$ ($N$). La probabilité d'un accident dans la journée vaut $0{,}001$ par temps sec, $0{,}003$ sous la pluie et $0{,}01$ sous la neige. $A$ : « il y a un accident ».\na) $S$, $H$, $N$ forment-ils une partition ? Pourquoi ?\nb) Calculer $P(A)$.\nc) Un accident a eu lieu. Calculer la probabilité qu'il ait neigé, puis qu'il ait fait sec.\nd) Commenter : quel temps est le plus dangereux ? Par quel temps ont lieu la plupart des accidents ?",
          correction:
            "a) Oui : chaque jour a un seul temps parmi les trois (le modèle l'impose), et $0{,}7 + 0{,}25 + 0{,}05 = 1$. Les trois événements sont deux à deux incompatibles et leur réunion est l'univers.\nb) Formule des probabilités totales, pour la partition $S$, $H$, $N$ :\n$P(A) = 0{,}7 \\times 0{,}001 + 0{,}25 \\times 0{,}003 + 0{,}05 \\times 0{,}01 = 0{,}0007 + 0{,}00075 + 0{,}0005 = 0{,}00195$.\nc) $P_A(N) = \\dfrac{0{,}0005}{0{,}00195} \\approx 0{,}256$ et $P_A(S) = \\dfrac{0{,}0007}{0{,}00195} \\approx 0{,}359$.\nd) Le plus dangereux est la neige : $P_N(A) = 0{,}01$, dix fois plus que par temps sec. Elle ne fait que $5$ % des jours, mais environ $26$ % des accidents.\nPourtant, le temps sec compte encore $36$ % des accidents, parce qu'il est de loin le plus fréquent. La pluie en fait environ $38$ % : c'est le plus gros morceau (diagramme, en %).\n⛔ Le piège : conclure du c) que le temps sec est « plus dangereux » que la neige. $P_A(S) > P_A(N)$ compare des parts d'accidents, pas des risques ; le risque, c'est $P_S(A) = 0{,}001$ contre $P_N(A) = 0{,}01$.",
          schema: (
            <div className="grid min-w-0 grid-cols-1 gap-2">
              {arbre([{ label: "S", proba: "0,7", chemin: true, enfants: [{ label: "A → 0,0007", proba: "0,001", chemin: true }, { label: "non A", proba: "0,999" }] }, { label: "H", proba: "0,25", chemin: true, enfants: [{ label: "A → 0,00075", proba: "0,003", chemin: true }, { label: "non A", proba: "0,997" }] }, { label: "N", proba: "0,05", chemin: true, enfants: [{ label: "A → 0,0005", proba: "0,01", chemin: true }, { label: "non A", proba: "0,99" }] }])}
              {ecranSeulement(diagramme("barres", [{ label: "Sec", value: 36 }, { label: "Pluie", value: 38 }, { label: "Neige", value: 26 }]))}
            </div>
          ),
          micros: ["pc_partition", "pc_totales", "pc_inverser"],
        },
        {
          titre: "Le jeu des trois portes",
          enonce:
            "Dans un jeu télévisé, une voiture est cachée au hasard derrière l'une de trois portes. Le candidat choisit la porte 1. L'animateur, qui sait où est la voiture, ouvre alors une AUTRE porte, sans voiture ; s'il a le choix entre deux portes, il tire au sort. $V_k$ : « la voiture est derrière la porte $k$ » ; $O_3$ : « l'animateur ouvre la porte 3 ».\na) Construire l'arbre pondéré : d'abord la voiture, puis la porte ouverte.\nb) Calculer $P(O_3)$.\nc) L'animateur a ouvert la porte 3. Calculer $P_{O_3}(V_1)$ et $P_{O_3}(V_2)$.\nd) Le candidat a-t-il intérêt à changer de porte ?",
          correction:
            "a) Premier niveau : $P(V_1) = P(V_2) = P(V_3) = \\dfrac{1}{3}$ ; ces trois événements forment une partition.\nDerrière $V_1$ : l'animateur peut ouvrir la porte 2 ou la porte 3, chacune avec $\\dfrac{1}{2}$.\nDerrière $V_2$ : il ne peut ouvrir que la porte 3 (ni celle du candidat, ni celle de la voiture) : $P_{V_2}(O_3) = 1$.\nDerrière $V_3$ : il ouvre forcément la porte 2, donc $P_{V_3}(O_3) = 0$ (branche non dessinée).\nb) Formule des probabilités totales : $P(O_3) = \\dfrac{1}{3} \\times \\dfrac{1}{2} + \\dfrac{1}{3} \\times 1 + \\dfrac{1}{3} \\times 0 = \\dfrac{1}{6} + \\dfrac{2}{6} = \\dfrac{1}{2}$.\nc) $P_{O_3}(V_1) = \\dfrac{1/6}{1/2} = \\dfrac{1}{3}$ et $P_{O_3}(V_2) = \\dfrac{1/3}{1/2} = \\dfrac{2}{3}$.\nd) Oui ! En changeant pour la porte 2, il gagne avec la probabilité $\\dfrac{2}{3}$ ; en gardant la porte 1, seulement $\\dfrac{1}{3}$.\n⭐ Le choix de l'animateur n'est pas neutre : il ÉVITE la voiture, et cette information se reporte sur la porte qu'il laisse fermée.\n⛔ Le piège : « il reste deux portes, donc une chance sur deux ». Les deux portes ne sont pas symétriques : l'une a été choisie au hasard par le candidat, l'autre a été épargnée par l'animateur.\n⭐ C'est le célèbre problème de Monty Hall, du nom de l'animateur d'un jeu télévisé américain.",
          schema: arbre([{ label: "V1", proba: "1/3", chemin: true, enfants: [{ label: "O2", proba: "1/2" }, { label: "O3 → 1/6", proba: "1/2", chemin: true }] }, { label: "V2", proba: "1/3", chemin: true, enfants: [{ label: "O3 → 1/3", proba: "1", chemin: true }] }, { label: "V3", proba: "1/3", enfants: [{ label: "O2", proba: "1" }] }]),
          micros: ["pc_partition", "pc_totales", "pc_inverser", "pc_arbre"],
        },
      ],
    },
  ],
};
