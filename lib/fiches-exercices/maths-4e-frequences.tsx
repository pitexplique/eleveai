// ─── Fiche d'exercices : fréquences observées et probabilité (4e) ─────────────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-frequences.tsx` et sur les
// cinq micros du coach de 4e (notionId proba_frequence). L'angle de la 4e, comme
// le dit `notions.ts` : la 6e CONSTATE que l'écart se réduit quand on répète ;
// la 4e dit POURQUOI ça compte. Six lancers donnant quatre « pile » ne prouvent
// rien ; six cents lancers donnant quatre cents « pile » accusent la pièce
// (exercice 20, le fil de la feuille).
// ⛔ Programme de 4e : pas d'intervalle de fluctuation ni de 1/√n (c'est la
// seconde), pas de loi binomiale. Pour juger un écart, la feuille ne calcule
// rien de savant : elle compare à une SIMULATION (« sur 1 000 séries, combien
// ont fait aussi bien ? ») et elle pose la question « sur combien d'essais ? ».
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 20 « pile » sur 50, ni
// le 3 sorti 12 fois sur 60, ni le sac de 4 rouges et 6 bleues, ni 70 / 56 /
// 51 %, ni 7 « pile » sur 10 ou 700 sur 1 000, ni la punaise, ni le bouchon, ni
// Léa et Malik, ni Pearson. ⛔ Ni ceux de la feuille de 3e (Yanis et ses 50
// lancers, cinq faces de suite) ni de la seconde (punaise à 382 sur 1 000).
//
// ⭐ LES TIRAGES AFFICHÉS SONT DE VRAIS TIRAGES : Python (module `random`),
// graine donnée ci-dessous, refaits par le script de recalcul — un chiffre
// inventé ne passerait pas.
//   · ex. 6  : seed(2), 500 lancers de pièce, « P » si random() < 0.5 ;
//   · ex. 7  : seed(8), 1 000 séries de 8 lancers, random() < 0.5 compté ;
//   · ex. 9  : seed(24), seed(19), seed(2), 300 lancers de dé (randint(1, 6)) ;
//   · ex. 12 : seed(12), 1 000 classes de 25, random() < 0.1 compté ;
//   · ex. 13 : seed(11), 10 000 lancers de pièce, comme l'ex. 6 ;
//   · ex. 14 : seed(14), 6 groupes de 50 tirages, randint(1, 5) <= 2 compté ;
//   · ex. 15 : seed(15), 1 000 séries de 30 lancers de dé, puis (à la suite)
//     1 000 séries de 600, randint(1, 6) == 6 compté ;
//   · ex. 17 : seed(4), 600 lancers de dé ;
//   · ex. 19 : seed(19), 1 000 séances de 5 tirs, random() < 0.75 compté ;
//     seed(119), 1 000 saisons de 40 tirs ;
//   · ex. 20 : seed(20), 1 000 séries de 6 lancers ; seed(120), 1 000 séries de 600.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : les VINGT corrigés ont
// leur dessin. Trois dessins locaux :
//   · `courbe` — LA COURBE DES FRÉQUENCES QUI SE STABILISENT (ex. 6, 9, 17),
//     en SVG : la fréquence cumulée après chaque lancer, recalculée à partir de
//     la chaîne des tirages écrite EN CLAIR (constantes T6, T9A…), et la
//     probabilité en pointillés. C'est le dessin de la notion ;
//   · `barres` — le diagramme en barres du coach, en copie ÉTROITE (220 de
//     large) : celui de figures.tsx (300) écrivait ses libellés à 8,7 px à
//     375 px (mesuré le 25/09 sur la feuille des puissances) ;
//   · `deux` — deux dessins côte à côte à partir de `sm` et sur papier.
// Plus `roue`, `billes` et `tableauProba` de figures.tsx.
// ⛔ LISIBLE AU TÉLÉPHONE : la courbe a un viewBox de 260 et un corps de 13 ;
// rendue sur ~235 px à 375, cela fait 11,75 px.
//
// ⛔ LES PIÈGES NOMMÉS : diviser par le nombre de faces (1) ; rapporter une part
// à l'autre part (2) ; lire un effectif comme un pourcentage (3) ; exiger que
// l'expérience donne le résultat calculé (4) ; prendre une fréquence observée
// pour une probabilité (5) ; croire que l'écart baisse à CHAQUE lancer (6) ;
// juger un pourcentage sans son nombre d'essais (7, 11, 15, 20) ; « trois
// issues, donc 1/3 chacune » (8) ; croire qu'un dé est truqué après 30 lancers
// (9) ; « il a plu, la météo s'est trompée » (10) ; tirer une loi d'une seule
// classe (12) ; croire que le hasard se rattrape en NOMBRE (13) ; croire qu'un
// groupe s'est trompé (14) ; diviser dans le mauvais sens (16) ; conclure après
// 12 lancers (17) ; généraliser un petit comptage (18) ; juger sur une séance
// (19).
//
// Les chiffres du monde, et d'où ils viennent :
// - environ 10,6 % de gauchers (méta-analyse de Papadatou-Pastou et al.,
//   « Human handedness: A meta-analysis », Psychological Bulletin, 2020 : plus
//   de deux millions de personnes) — ex. 12, arrondi à « 1 sur 10 » ;
// - le Comptage national des oiseaux des jardins (LPO et Muséum national
//   d'Histoire naturelle, fin janvier et fin mai) — ex. 18 ; les nombres
//   d'oiseaux sont IMAGINÉS ;
// - un tir au but réussi avec la probabilité 0,75 : un ARRONDI de l'ordre de
//   grandeur des grands tournois (⚠️ À VÉRIFIER avant de citer un chiffre
//   précis ; l'énoncé dit « on admet », comme la feuille de 3e) — ex. 19 ;
// - le « risque de pluie » en pourcentage des bulletins météo est une
//   probabilité ; les 40 jours sont IMAGINÉS — ex. 10 ; le gobelet, les
//   basketteuses, les ampoules et la pièce de l'arbitre sont IMAGINÉS, à
//   l'ordre de grandeur réel.
//
// Les corrigés sont écrits à la première personne (« je divise »), comme les
// autres feuilles de 4e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-frequences-4e.mjs`.
//
// Micro-compétences : proba_frequence_calculer (1, 2, 3, 5, 8, 11, 12, 14, 16,
// 18), proba_frequence_comparer (4, 5, 9, 10, 14, 15, 17), proba_frequence_repeter
// (6, 9, 13, 14, 17), proba_frequence_echantillon (7, 10, 11, 12, 15, 16, 18,
// 19, 20), proba_frequence_defi (8, 13, 16, 17, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { billes, roue, tableauProba } from "@/lib/fiches-exercices/figures";

const BLEU = "#2563eb", ORANGE = "#ea580c", VERT = "#059669", ROUGE = "#dc2626", JAUNE = "#eab308";

/* ── Les tirages, EN CLAIR (Python, graines de l'en-tête) ──────────────────── */
// Pièce : « P » pile, « F » face. Dé : le chiffre de la face.
const T6 = "FFPPFFFPFFFPPPFFFFPPPPPPPFFFPPPPFFFPFFFFFFPFFPFFPFPFFFPFFPFFFPPPFPFPFPFFFFFFPPFFFPFFFPFPFPPFPFFPPFPFPPPFPFPFPPFPPFPPFPPPFFPPPPFFFFFFPPFPPPFPFPFPFPFPPFPPPPPFFFFFPPPFFFFPPFPPPPFPPPPPFPPFPFFFPFFPPFPPFPFFFPFPPFPPFFPPPPPFPPPFPFPFPPFPPPPFFFFPFFFPPPFPFPFFFFPPPPPFFFFPPFPPPPFFFPPPFFPFPFFFPFFPFPFPFFFPPPFFPFPPFFFPFPFFFFPFPFFFPPFFFFPFFFFFPFFPFFPFPFPPFPPFPPPFFFPFPPFPPFPFFPFFFPPPPPPFFPFPPFPFPFFPFPFFFPFPFPFFFFPPPPPFPFPPPPPPPPFFPFFPPPPFPPFPFFPFPFFFFFFFFFFFPFFPPPFPPFPFPPPPFFFPFPFPPFPPFPPPPPPPPPFPPFPPFPFPFFPFFPFP";
const T9A = "645222226616263614466115246463416352633156361233613126524335632154262342652453525216233656242341433326543231146344111364454554423333236156135166446433446336141441222565242211112156412331212515545633664464466231252224332652213665523412245545346212226212334656523323453123655323254311344344542112513651";
const T9B = "615152435352531343313315521215446114115644463552642556124222641564144515454345212114441666324344362443361123641414546124631122434125461466214563615553323531136212354523535666366653655441221415513646463332436166654451313434563133312412246651655115416625325651322231542164354523616232345254315412514245";
const T9C = "111326633525156246465354531134344525222123225535652446535334246646524345536443565644623625343365555655436245365136126115613526152322146113322611111161332262561451221135666133413455613456242166311425544532333546165261312221462561226413152556336435121442156121112212156443564262644515514552164315153363";
const T17 = "231644211145312553321321633223366315364522243153135635244534422331114635564632621426643234653652311623552132341136136631333264561352432345235131423335142421111625625154523115346242244412442642421133252243231351546666144142523364634526633441366214523612664546442122153144251226535454111651453521315133115442342441115354464162634415232262343351621631514654515243322616153545354554423536324152652332536511462363323151513122546511264662563645246233263565445433445132546553445125146353134264512213212456556531522121311316356626264266153616525422345142235456343241413613212151225146524666643255214533645616";

/** Deux dessins : l'un sous l'autre sur téléphone, côte à côte à partir de `sm`. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/** Le diagramme en barres du coach, à 220 de large (voir l'en-tête).
 *  ⛔ Texte NU dans `label`, étiquettes COURTES. Le recalcul relit `{ label, value }`. */
const barres = (data: { label: string; value: number }[], surligne?: number) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer figure={{ kind: "stat_graph", graphType: "barres", data, size: { width: 220, height: 190 }, display: { showValues: true, showLabels: true, highlightIndex: surligne } }} />
  </div>
);

/**
 * ⭐⭐ LA COURBE DES FRÉQUENCES (ex. 6, 9, 17). Aucun canvas du coach ne trace
 * une fréquence CUMULÉE : on la calcule ici, lancer après lancer, à partir de
 * la chaîne des tirages (`succes` : les caractères qui comptent comme succès).
 * La probabilité est la ligne pointillée orange, nommée dans le coin en haut à
 * droite — là où les courbes, qui se sont resserrées, ne passent plus.
 * ⛔ Une fréquence au-dessus de `ymax` (le 6 sorti au premier lancer : 1) est
 * coupée au cadre : c'est le début agité de la courbe, il sort du dessin.
 */
type Tirages = { tirages: string; succes: string; couleur?: string };
const courbe = (series: Tirages[], proba: { valeur: number; label: string }, axe: { ymax: number; pasY: number; pasX: number }) => {
  const W = 260, H = 208, G = 40, D = 242, HAUT = 10, BAS = 160;
  const N = Math.max(...series.map((s) => s.tirages.length));
  const X = (n: number) => G + ((D - G) * n) / N;
  const Y = (f: number) => BAS - ((BAS - HAUT) * f) / axe.ymax;
  const nb = (v: number) => String(+v.toFixed(3)).replace(".", ",");
  const ticksY = Array.from({ length: Math.round(axe.ymax / axe.pasY) + 1 }, (_, i) => i * axe.pasY);
  const ticksX = Array.from({ length: Math.floor(N / axe.pasX) + 1 }, (_, i) => i * axe.pasX);
  const points = ({ tirages, succes }: Tirages) => {
    let k = 0;
    return Array.from(tirages, (c, i) => {
      if (succes.includes(c)) k++;
      return `${X(i + 1).toFixed(1)},${Y(k / (i + 1)).toFixed(1)}`;
    }).join(" ");
  };
  // Même géométrie pour toutes les courbes de la page : un identifiant partagé suffit.
  const clip = "cadre-courbe-frequences";
  return (
    <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[15rem] print:overflow-visible">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full min-w-[15rem] print:min-w-0" role="img" aria-label={`Fréquence observée au fil des lancers, qui se rapproche de la probabilité ${proba.label}`}>
        <defs>
          <clipPath id={clip}>
            <rect x={G} y={HAUT} width={D - G} height={BAS - HAUT} />
          </clipPath>
        </defs>
        <rect x={0} y={0} width={W} height={H} fill="#fff" />
        {ticksY.map((v) => (
          <g key={`y${v}`}>
            <line x1={G} x2={D} y1={Y(v)} y2={Y(v)} stroke="#e2e8f0" strokeWidth={1} />
            <text x={G - 5} y={Y(v) + 4} textAnchor="end" fontSize={13} fill="#475569">
              {nb(v)}
            </text>
          </g>
        ))}
        {ticksX.map((n) => (
          <g key={`x${n}`}>
            <line x1={X(n)} x2={X(n)} y1={HAUT} y2={BAS} stroke="#e2e8f0" strokeWidth={1} />
            <text x={X(n)} y={BAS + 17} textAnchor="middle" fontSize={13} fill="#475569">
              {n}
            </text>
          </g>
        ))}
        <line x1={G} x2={D} y1={BAS} y2={BAS} stroke="#334155" strokeWidth={1.5} />
        <line x1={G} x2={G} y1={HAUT} y2={BAS} stroke="#334155" strokeWidth={1.5} />
        <line x1={G} x2={D} y1={Y(proba.valeur)} y2={Y(proba.valeur)} stroke={ORANGE} strokeWidth={2} strokeDasharray="6 4" />
        {series.map((s, i) => (
          <polyline key={i} points={points(s)} fill="none" stroke={s.couleur ?? BLEU} strokeWidth={1.8} strokeLinejoin="round" clipPath={`url(#${clip})`} />
        ))}
        <rect x={D - 134} y={HAUT + 3} width={132} height={22} rx={4} fill="#fff" fillOpacity={0.92} />
        <line x1={D - 128} x2={D - 112} y1={HAUT + 14} y2={HAUT + 14} stroke={ORANGE} strokeWidth={2} strokeDasharray="5 3" />
        <text x={D - 108} y={HAUT + 19} fontSize={13} fontWeight={700} fill="#9a3412">
          {`probabilité ${proba.label}`}
        </text>
        <text x={(G + D) / 2} y={H - 8} textAnchor="middle" fontSize={13} fill="#334155">
          nombre de lancers
        </text>
      </svg>
    </div>
  );
};

export const exercicesFrequences4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "proba-frequence",
  titre: "Fréquences et probabilité",
  accroche:
    "Vingt exercices, du geste seul au problème : calculer une fréquence, la comparer à la probabilité, voir l'écart se réduire quand on répète, et savoir ce qu'un petit nombre d'essais ne prouve pas. Un gobelet dont aucun calcul ne donne la probabilité, la météo, deux basketteuses, les gauchers d'une classe, les oiseaux des jardins, une séance de tirs au but, la pièce d'un arbitre. De vraies simulations et des courbes de fréquences dans les corrigés. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/proba-frequence", titre: "Fréquences observées et probabilité" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice : compter, diviser par le nombre d'essais, comparer.",
      rappel: [
        "La PROBABILITÉ se calcule AVANT l'expérience (un dé équilibré : $\\dfrac{1}{6}$ par face). La FRÉQUENCE se mesure APRÈS.",
        "Fréquence $= \\dfrac{\\text{nombre de fois où l'événement s'est produit}}{\\text{nombre total d'essais}}$ : un nombre entre $0$ et $1$, qu'on peut écrire en pourcentage.",
        "Les fréquences de toutes les issues font $1$, soit $100$ %.",
        "Fréquence et probabilité ne tombent presque jamais juste l'une sur l'autre : c'est NORMAL.",
      ],
      exercices: [
        {
          enonce:
            "On lance un dé $80$ fois. Le $1$ sort $12$ fois, le $2$ sort $15$ fois, le $3$ sort $11$ fois, le $4$ sort $18$ fois, le $5$ sort $10$ fois et le $6$ sort $14$ fois.\na) Calculer la fréquence d'apparition du $4$, en fraction, en nombre décimal, puis en pourcentage.\nb) Calculer la fréquence d'apparition du $5$.\nc) Que vaut la somme des six fréquences ?",
          reponses: [
            { question: "a)", attendu: ["0,225", "22,5%"] },
            { question: "b)", attendu: ["0,125", "12,5%"] },
            { question: "c)", attendu: "1" },
          ],
          correction:
            "a) Je compte les essais : $80$ lancers en tout. Le $4$ est sorti $18$ fois.\nFréquence $= \\dfrac{18}{80} = 0{,}225$, soit $22{,}5$ %.\nb) Le $5$ est sorti $10$ fois sur $80$ : $\\dfrac{10}{80} = 0{,}125$, soit $12{,}5$ %.\nc) Les six effectifs font $80$ en tout : les six fréquences font $\\dfrac{80}{80} = 1$, soit $100$ %.\n⛔ Le piège : diviser par $6$, le nombre de faces. On divise par le nombre de LANCERS, $80$.\nRéponse : $\\dfrac{18}{80} = 0{,}225$, soit $22{,}5$ % pour le $4$ ; $0{,}125$ pour le $5$ ; la somme vaut $1$.",
          // Les effectifs du dé, la barre du 4 surlignée.
          schema: barres([{ label: "1", value: 12 }, { label: "2", value: 15 }, { label: "3", value: 11 }, { label: "4", value: 18 }, { label: "5", value: 10 }, { label: "6", value: 14 }], 3),
          micros: ["proba_frequence_calculer"],
        },
        {
          enonce:
            "Maé lance une pièce $60$ fois : elle obtient $33$ fois pile et $27$ fois face.\na) Calculer la fréquence de pile.\nb) Son frère calcule $\\dfrac{33}{27}$. Que compare-t-il vraiment ?",
          reponses: [
            { question: "a)", attendu: ["0,55", "55%"] },
          ],
          correction:
            "a) Je rapporte au TOTAL des lancers : $33 + 27 = 60$.\nFréquence de pile $= \\dfrac{33}{60} = 0{,}55$, soit $55$ %.\n⭐ Contrôle : la fréquence de face vaut $\\dfrac{27}{60} = 0{,}45$, et $0{,}55 + 0{,}45 = 1$.\nb) $\\dfrac{33}{27}$ compare les piles aux FACES, pas au total : c'est un rapport entre deux parts, qui dépasse $1$ ici. Une fréquence, elle, ne dépasse jamais $1$.\n⛔ Le piège : diviser par l'autre résultat au lieu du nombre total d'essais.\nRéponse : fréquence de pile $0{,}55$, soit $55$ %.",
          schema: tableauProba(["", "effectif", "fréquence"], [["pile", "33", "0,55"], ["face", "27", "0,45"], ["total", "60", "1"]], [[0, 2]]),
          micros: ["proba_frequence_calculer"],
        },
        {
          enonce:
            "Une roue a trois secteurs : rouge, bleu et vert. On la fait tourner $200$ fois : le rouge sort $96$ fois, le bleu $64$ fois et le vert $40$ fois.\na) Calculer la fréquence de chaque couleur, puis l'écrire en pourcentage.\nb) Vérifier que les trois fréquences font $1$.",
          reponses: [
            { question: "a) rouge", attendu: ["0,48", "48%"] },
            { question: "a) bleu", attendu: ["0,32", "32%"] },
            { question: "a) vert", attendu: ["0,2", "20%"] },
          ],
          correction:
            "a) Je divise chaque effectif par $200$, le nombre de tours.\nRouge : $\\dfrac{96}{200} = 0{,}48$, soit $48$ %.\nBleu : $\\dfrac{64}{200} = 0{,}32$, soit $32$ %.\nVert : $\\dfrac{40}{200} = 0{,}2$, soit $20$ %.\nb) $0{,}48 + 0{,}32 + 0{,}2 = 1$ : c'est normal, chaque tour tombe sur une couleur et une seule.\n⛔ Le piège : lire « $96$ fois » comme « $96$ % ». $96$ est un effectif ; sur $200$ tours, cela fait $48$ %.\nRéponse : rouge $48$ %, bleu $32$ %, vert $20$ %.",
          // Les fréquences EN POURCENTAGE (le canvas écrit ses nombres sans virgule).
          schema: barres([{ label: "rouge", value: 48 }, { label: "bleu", value: 32 }, { label: "vert", value: 20 }], 0),
          micros: ["proba_frequence_calculer"],
        },
        {
          enonce:
            "Une roue est partagée en $4$ secteurs de même taille : rouge, bleu, vert et jaune. On la fait tourner $160$ fois, et le rouge sort $44$ fois.\na) Quelle est la probabilité d'obtenir rouge ?\nb) Calculer la fréquence observée du rouge.\nc) Combien de rouges attendait-on sur $160$ tours ? La roue est-elle truquée ?",
          reponses: [
            { question: "a)", attendu: ["0,25", "25%"] },
            { question: "b)", attendu: ["0,275", "27,5%"] },
            { question: "c) rouges", attendu: "40" },
            { question: "c) truqué", attendu: ["non", "faux"] },
          ],
          correction:
            "a) Quatre secteurs égaux, un seul rouge : $P(\\text{rouge}) = \\dfrac{1}{4} = 0{,}25$, soit $25$ %. Je l'ai CALCULÉE avant de tourner la roue.\nb) Je la MESURE après : $\\dfrac{44}{160} = 0{,}275$, soit $27{,}5$ %.\nc) On attendait environ $160 \\times \\dfrac{1}{4} = 40$ rouges ; on en a vu $44$. L'écart est de $4$ tours, soit $2{,}5$ points.\nSur $160$ tours, un tel écart est ordinaire : il ne prouve rien.\n⛔ Le piège : exiger exactement $40$ rouges. Une probabilité annonce ce qui se passe EN MOYENNE, pas ce qui arrivera exactement.\nRéponse : probabilité $0{,}25$, fréquence $0{,}275$ ; l'écart est normal, rien ne permet de dire que la roue est truquée.",
          schema: deux(
            roue([{ label: "rouge", poids: 1, couleur: ROUGE }, { label: "bleu", poids: 1, couleur: BLEU }, { label: "vert", poids: 1, couleur: VERT }, { label: "jaune", poids: 1, couleur: JAUNE }]),
            barres([{ label: "attendu", value: 40 }, { label: "observé", value: 44 }], 1),
          ),
          micros: ["proba_frequence_comparer"],
        },
        {
          enonce:
            "Pour chaque phrase, dire s'il s'agit d'une probabilité ou d'une fréquence observée.\na) « Avec un dé équilibré, la probabilité d'obtenir $2$ est $\\dfrac{1}{6}$. »\nb) « Sur mes $50$ derniers lancers, le $2$ est sorti $11$ fois. »\nc) « Cette basketteuse a réussi $78$ % de ses lancers francs cette saison. »\nd) « Une roue a $8$ secteurs égaux dont $3$ rouges : la chance de tomber sur rouge est $\\dfrac{3}{8}$. »\ne) Pour la phrase b), calculer la fréquence et la comparer à la probabilité de la phrase a).",
          reponses: [
            { question: "a)", attendu: ["probabilité", "une probabilité"] },
            { question: "b)", attendu: ["fréquence", "fréquence observée", "une fréquence", "une fréquence observée"] },
            { question: "c)", attendu: ["fréquence", "fréquence observée", "une fréquence", "une fréquence observée"] },
            { question: "d)", attendu: ["probabilité", "une probabilité"] },
            { question: "e)", attendu: ["0,22", "22%"] },
          ],
          correction:
            "Pour chaque phrase, je me demande : a-t-on CALCULÉ avant, ou COMPTÉ après ?\na) Calculée à partir du dé, sans le lancer : une probabilité.\nb) Comptée après $50$ lancers : un effectif, qui donne une fréquence observée.\nc) Mesurée sur les matchs joués : une fréquence observée.\nd) Calculée à partir des secteurs : une probabilité, $\\dfrac{3}{8} = 0{,}375$.\ne) $\\dfrac{11}{50} = 0{,}22$, soit $22$ %, contre $\\dfrac{1}{6} \\approx 0{,}17$ pour la probabilité. Sur $50$ lancers, cet écart n'a rien d'anormal.\n⛔ Le piège au c) : prendre un pourcentage pour une probabilité. $78$ % a été OBSERVÉ ; la saison prochaine, la fréquence changera.\nRéponse : a) et d) sont des probabilités ; b) et c) des fréquences ; la fréquence de b) vaut $0{,}22$.",
          schema: tableauProba(["phrase", "avant ou après ?", "donc"], [["a", "calculé avant", "probabilité"], ["b", "compté après", "fréquence"], ["c", "compté après", "fréquence"], ["d", "calculé avant", "probabilité"]], [[1, 3], [2, 3]]),
          micros: ["proba_frequence_comparer", "proba_frequence_calculer"],
        },
        {
          enonce:
            "Un logiciel simule $500$ lancers d'une pièce équilibrée et suit la fréquence de pile : après $10$ lancers, $0{,}3$ ; après $50$, $0{,}42$ ; après $100$, $0{,}41$ ; après $200$, $0{,}49$ ; après $500$, $0{,}502$.\na) Calculer l'écart entre chaque fréquence et la probabilité $0{,}5$.\nb) Que devient l'écart quand le nombre de lancers augmente ?\nc) L'écart diminue-t-il à CHAQUE étape ?",
          reponses: [
            { question: "a)", attendu: "0,2 ; 0,08 ; 0,09 ; 0,01 ; 0,002" },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          correction:
            "a) Je soustrais : $0{,}5 - 0{,}3 = 0{,}2$ ; $0{,}5 - 0{,}42 = 0{,}08$ ; $0{,}5 - 0{,}41 = 0{,}09$ ; $0{,}5 - 0{,}49 = 0{,}01$ ; $0{,}502 - 0{,}5 = 0{,}002$.\nEn points de pourcentage : $20$, puis $8$, $9$, $1$ et $0{,}2$.\nb) L'écart se réduit : de $20$ points après $10$ lancers à $0{,}2$ point après $500$. Sur la courbe, la fréquence part de loin, puis se colle à la ligne pointillée de la probabilité.\nc) Non : de $50$ à $100$ lancers, il passe de $8$ à $9$ points. L'écart se réduit sur le LONG terme, pas à chaque lancer.\n⛔ Le piège : croire que la pièce « se corrige ». Elle n'a pas changé ; c'est la mesure qui devient fiable quand les lancers s'accumulent.\nRéponse : écarts de $20$ ; $8$ ; $9$ ; $1$ ; $0{,}2$ points : l'écart se réduit quand on répète, sans baisser à chaque fois.",
          schema: courbe([{ tirages: T6, succes: "P" }], { valeur: 0.5, label: "1/2" }, { ymax: 1, pasY: 0.25, pasX: 100 }),
          micros: ["proba_frequence_repeter"],
        },
        {
          enonce:
            "Nora lance une pièce $8$ fois et obtient $6$ fois face : « $75$ % de face, cette pièce est truquée ! » Pour vérifier, on simule $1\\,000$ séries de $8$ lancers d'une pièce ÉQUILIBRÉE et on compte les faces de chaque série : $0$ à $2$ faces dans $130$ séries ; $3$ faces dans $209$ ; $4$ faces dans $279$ ; $5$ faces dans $225$ ; $6$ à $8$ faces dans $157$.\na) Combien de séries ont donné au moins $6$ faces ? Quelle part des $1\\,000$ séries cela fait-il ?\nb) Nora a-t-elle raison ?",
          reponses: [
            { question: "a) séries", attendu: "157" },
            { question: "a) part", attendu: "157/1000", tolerance: 0.005 },
            { question: "b)", attendu: ["non", "faux"] },
          ],
          correction:
            "a) Je lis la dernière barre : $157$ séries sur $1\\,000$ ont donné $6$ faces ou plus, soit $\\dfrac{157}{1\\,000} \\approx 0{,}16$ : environ une série sur six.\nb) Avec une pièce parfaitement équilibrée, le résultat de Nora arrive environ une fois sur six : c'est courant. Ses $8$ lancers ne prouvent rien.\n⭐ Pour soupçonner la pièce, il faudrait des centaines de lancers.\n⛔ Le piège : juger un pourcentage sans regarder sur combien d'essais il a été obtenu. $75$ % de $8$ lancers, c'est seulement $2$ faces de plus que les $4$ attendues.\nRéponse : $157$ séries sur $1\\,000$, environ une sur six : Nora ne peut rien conclure.",
          schema: barres([{ label: "0 à 2", value: 130 }, { label: "3", value: 209 }, { label: "4", value: 279 }, { label: "5", value: 225 }, { label: "6 à 8", value: 157 }], 4),
          micros: ["proba_frequence_echantillon"],
        },
        {
          enonce:
            "On lance un gobelet en plastique $400$ fois. Il retombe $88$ fois sur le fond, $36$ fois à l'envers (sur son ouverture) et $276$ fois couché sur le côté.\na) Peut-on CALCULER la probabilité de chaque position, comme pour un dé ?\nb) Estimer la probabilité de chaque position.\nc) Sur $1\\,000$ nouveaux lancers, combien de fois environ le gobelet tombera-t-il sur le côté ?",
          reponses: [
            { question: "a)", attendu: ["non", "faux"] },
            { question: "b) fond", attendu: "0,22" },
            { question: "b) envers", attendu: "0,09" },
            { question: "b) côté", attendu: "0,69" },
            { question: "c)", attendu: "690" },
          ],
          correction:
            "a) Non : les trois positions n'ont pas la même chance, la forme du gobelet en favorise une. Aucun calcul n'est possible : on ne peut qu'ESTIMER, par la fréquence.\nb) Je divise chaque effectif par $400$ : fond $\\dfrac{88}{400} = 0{,}22$ ; à l'envers $\\dfrac{36}{400} = 0{,}09$ ; sur le côté $\\dfrac{276}{400} = 0{,}69$.\n⭐ Contrôle : $0{,}22 + 0{,}09 + 0{,}69 = 1$.\nc) Environ $1\\,000 \\times 0{,}69 = 690$ fois — une estimation, pas une certitude.\n⛔ Le piège : « trois positions, donc $\\dfrac{1}{3}$ chacune ». Trois issues ne font pas trois chances égales.\nRéponse : environ $0{,}22$ ; $0{,}09$ ; $0{,}69$ ; environ $690$ fois sur le côté.",
          schema: barres([{ label: "fond", value: 88 }, { label: "envers", value: 36 }, { label: "côté", value: 276 }], 2),
          micros: ["proba_frequence_defi", "proba_frequence_calculer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme en devoir : la fréquence, la probabilité, l'écart, puis le nombre d'essais.",
      rappel: [
        "Plus on répète l'expérience, plus la fréquence se rapproche de la probabilité : l'écart se réduit sur le long terme, pas à chaque essai.",
        "Pour comparer, je mets tout dans la même unité (le pourcentage), puis je regarde l'écart.",
        "Avant de juger un écart, je demande toujours : SUR COMBIEN D'ESSAIS ?",
        "Quand aucun calcul ne donne la probabilité, je l'ESTIME par la fréquence, sur un grand nombre d'essais.",
      ],
      exercices: [
        {
          enonce:
            "Ana, Ben et Chloé lancent chacun un dé $300$ fois et suivent la fréquence du $6$. Après $30$ lancers, Ana a obtenu $10$ six, Ben $1$ et Chloé $5$. Après $300$ lancers : Ana $49$, Ben $46$ et Chloé $50$.\na) Calculer les trois fréquences après $30$ lancers, au centième.\nb) Même question après $300$ lancers.\nc) Comparer à la probabilité d'obtenir $6$. Que montre la courbe ?",
          reponses: [
            { question: "a) Ana", attendu: "0,33", tolerance: 0.005 },
            { question: "a) Ben", attendu: "0,03", tolerance: 0.005 },
            { question: "a) Chloé", attendu: "0,17", tolerance: 0.005 },
            { question: "b) Ana", attendu: "0,16", tolerance: 0.005 },
            { question: "b) Ben", attendu: "0,15", tolerance: 0.005 },
            { question: "b) Chloé", attendu: "0,17", tolerance: 0.005 },
            { question: "c) P(6)", attendu: "1/6" },
          ],
          correction:
            "a) Je divise par $30$ : Ana $\\dfrac{10}{30} \\approx 0{,}33$ ; Ben $\\dfrac{1}{30} \\approx 0{,}03$ ; Chloé $\\dfrac{5}{30} \\approx 0{,}17$. Les fréquences sont très éloignées : de $0{,}03$ à $0{,}33$.\nb) Je divise par $300$ : Ana $\\dfrac{49}{300} \\approx 0{,}16$ ; Ben $\\dfrac{46}{300} \\approx 0{,}15$ ; Chloé $\\dfrac{50}{300} \\approx 0{,}17$. Elles sont maintenant très proches.\nc) Le dé est équilibré : $P(6) = \\dfrac{1}{6} \\approx 0{,}17$. Les trois courbes (Ana en bleu, Ben en orange, Chloé en vert) partent dans tous les sens, puis se resserrent autour de la ligne pointillée.\n⛔ Le piège : croire, après $30$ lancers, que le dé d'Ana favorise le $6$ et que celui de Ben le boude. Sur $30$ lancers, le hasard écarte beaucoup les fréquences.\nRéponse : de $0{,}03$ à $0{,}33$ après $30$ lancers, de $0{,}15$ à $0{,}17$ après $300$ : plus on répète, plus les fréquences se rapprochent de $\\dfrac{1}{6}$.",
          schema: courbe([{ tirages: T9A, succes: "6", couleur: BLEU }, { tirages: T9B, succes: "6", couleur: ORANGE }, { tirages: T9C, succes: "6", couleur: VERT }], { valeur: 1 / 6, label: "1/6" }, { ymax: 0.5, pasY: 0.1, pasX: 50 }),
          micros: ["proba_frequence_repeter", "proba_frequence_comparer"],
        },
        {
          enonce:
            "Sur $40$ jours, le bulletin météo d'une ville a annoncé « $30$ % de risque de pluie ». Il a plu $13$ de ces $40$ jours.\na) Calculer la fréquence des jours de pluie parmi ces $40$ jours.\nb) Combien de jours de pluie la prévision laissait-elle attendre ? Est-elle fiable ?\nc) Dans une autre ville, sur $40$ jours annoncés à $30$ %, il a plu $26$ jours. Qu'en penser ?",
          reponses: [
            { question: "a)", attendu: ["0,325", "32,5%"] },
            { question: "b) jours", attendu: "12" },
            { question: "b) fiable", attendu: ["oui", "vrai"] },
          ],
          correction:
            "a) $\\dfrac{13}{40} = 0{,}325$, soit $32{,}5$ %.\nb) « $30$ % de risque » annonce qu'il pleut environ $3$ jours sur $10$ : sur $40$ jours, $40 \\times 0{,}3 = 12$ jours. On en a vu $13$ : un seul jour d'écart. La prévision est fiable.\nc) $\\dfrac{26}{40} = 0{,}65$, soit $65$ %, alors qu'on attendait $12$ jours : $14$ jours de trop, plus du double. Sur $40$ jours, un écart aussi grand fait douter : dans cette ville, la prévision annonce trop peu de pluie.\n⛔ Le piège : dire « on annonçait $30$ %, il a plu, donc la météo s'est trompée ». Une probabilité de $0{,}3$ n'interdit pas la pluie : elle se juge sur BEAUCOUP de jours, pas sur un seul.\nRéponse : $0{,}325$, proche de $0{,}3$ : la prévision est fiable ; $0{,}65$ dans l'autre ville : on peut douter.",
          schema: barres([{ label: "attendu", value: 12 }, { label: "ville 1", value: 13 }, { label: "ville 2", value: 26 }], 2),
          micros: ["proba_frequence_comparer", "proba_frequence_echantillon"],
        },
        {
          enonce:
            "Deux basketteuses tirent des lancers francs. Léna en a réussi $18$ sur $20$ pendant un match. Maëlle en a réussi $312$ sur $400$ pendant la saison.\na) Calculer la fréquence de réussite de chacune.\nb) Laquelle de ces deux fréquences estime le mieux la chance de réussite de la joueuse ? Pourquoi ?\nc) L'entraîneur affirme : « Léna tire mieux que Maëlle ». Peut-il l'affirmer ?",
          reponses: [
            { question: "a) Léna", attendu: ["0,9", "90%"] },
            { question: "a) Maëlle", attendu: ["0,78", "78%"] },
            { question: "b)", attendu: ["Maëlle", "celle de Maëlle"] },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          correction:
            "a) Léna : $\\dfrac{18}{20} = 0{,}9$, soit $90$ %. Maëlle : $\\dfrac{312}{400} = 0{,}78$, soit $78$ %.\nb) Celle de Maëlle : elle repose sur $400$ tirs. Pour Léna, un seul tir de plus ou de moins change la fréquence de $\\dfrac{1}{20} = 0{,}05$, soit $5$ points ; pour Maëlle, de $\\dfrac{1}{400} = 0{,}0025$ seulement.\nc) Non. Les $90$ % de Léna ont été obtenus en un seul match : un bon jour peut suffire à les expliquer. Pour comparer, il faudrait suivre Léna sur des centaines de tirs, elle aussi.\n⛔ Le piège : comparer deux pourcentages sans regarder sur combien d'essais chacun a été mesuré.\nRéponse : $0{,}9$ et $0{,}78$ ; l'estimation de Maëlle est la plus fiable ; on ne peut pas dire que Léna tire mieux.",
          schema: tableauProba(["joueuse", "réussis", "tirs", "fréquence"], [["Léna", "18", "20", "0,9"], ["Maëlle", "312", "400", "0,78"]], [[1, 2]]),
          micros: ["proba_frequence_calculer", "proba_frequence_echantillon"],
        },
        {
          enonce:
            "Environ $1$ personne sur $10$ est gauchère. Dans la classe de Tom, il y a $6$ gauchers sur $25$ élèves.\na) Calculer la fréquence des gauchers dans cette classe.\nb) On a simulé $1\\,000$ classes de $25$ élèves, où chaque élève a $1$ chance sur $10$ d'être gaucher. Le diagramme donne le nombre de classes selon leur nombre de gauchers. Combien de classes ont $6$ gauchers ou plus ?\nc) Tom conclut : « dans le monde, les gauchers sont bien plus d'un sur dix ». A-t-il raison ?",
          reponses: [
            { question: "a)", attendu: ["0,24", "24%"] },
            { question: "b)", attendu: "34" },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          correction:
            "a) $\\dfrac{6}{25} = 0{,}24$, soit $24$ % : plus du double de $10$ %.\nb) Je lis la dernière barre : $34$ classes sur $1\\,000$, soit environ $3$ %, à peu près une classe sur trente.\nc) Non. Sa classe sort de l'ordinaire, mais une classe sur trente, c'est beaucoup de classes : parmi les milliers de classes de collège de France, beaucoup en ont autant. $25$ élèves ne disent presque rien de la population entière.\n⭐ Pour mesurer la part des gauchers, des chercheurs ont réuni les études portant sur plus de deux millions de personnes : environ $10{,}6$ %.\n⛔ Le piège : tirer une loi générale d'un petit groupe qu'on connaît bien.\nRéponse : $0{,}24$ ; $34$ classes sur $1\\,000$ ; Tom ne peut rien conclure pour le monde.",
          schema: barres([{ label: "0", value: 78 }, { label: "1", value: 196 }, { label: "2", value: 272 }, { label: "3", value: 223 }, { label: "4", value: 137 }, { label: "5", value: 60 }, { label: "6+", value: 34 }], 6),
          micros: ["proba_frequence_echantillon", "proba_frequence_calculer"],
        },
        {
          enonce:
            "Hugo simule $10\\,000$ lancers d'une pièce équilibrée. Après $100$ lancers, il a $55$ piles ; après $1\\,000$ lancers, $480$ piles ; après $10\\,000$ lancers, $5\\,057$ piles. Il affirme : « plus on lance, plus le nombre de piles se rapproche de la moitié des lancers ».\na) Pour chaque étape, calculer l'écart entre le nombre de piles et la moitié des lancers.\nb) Calculer la fréquence de pile à chaque étape, puis son écart à $0{,}5$.\nc) Hugo a-t-il raison ? Qu'est-ce qui se rapproche vraiment ?",
          reponses: [
            { question: "a)", attendu: "5 ; 20 ; 57" },
            { question: "b) fréq.", attendu: "0,55 ; 0,48 ; 0,5057" },
            { question: "b) écarts", attendu: "0,05 ; 0,02 ; 0,0057" },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          correction:
            "a) La moitié des lancers : $50$, $500$, puis $5\\,000$. Écarts : $55 - 50 = 5$ ; $500 - 480 = 20$ ; $5\\,057 - 5\\,000 = 57$. L'écart en nombre de piles GRANDIT.\nb) Fréquences : $\\dfrac{55}{100} = 0{,}55$ ; $\\dfrac{480}{1\\,000} = 0{,}48$ ; $\\dfrac{5\\,057}{10\\,000} = 0{,}5057$. Écarts à $0{,}5$ : $0{,}05$ ; $0{,}02$ ; $0{,}0057$. L'écart en fréquence DIMINUE.\nc) Hugo se trompe : le nombre de piles ne « rattrape » pas la moitié, son écart peut même grandir. C'est la FRÉQUENCE qui se rapproche de $0{,}5$ : $57$ piles de trop, c'est beaucoup, mais rapporté à $10\\,000$ lancers, c'est très peu.\n⛔ Le piège : croire que le hasard se corrige. Il ne se corrige pas, il se moyenne.\nRéponse : écarts de $5$, $20$ puis $57$ piles ; écarts de fréquence de $0{,}05$, $0{,}02$ puis $0{,}0057$ : c'est la fréquence qui se rapproche de la probabilité.",
          schema: tableauProba(["lancers", "piles", "écart à la moitié", "fréquence"], [["100", "55", "5", "0,55"], ["1 000", "480", "20", "0,48"], ["10 000", "5 057", "57", "0,5057"]], [[2, 2], [2, 3]]),
          micros: ["proba_frequence_repeter", "proba_frequence_defi"],
        },
        {
          enonce:
            "Un sac contient $2$ jetons verts et $3$ jetons jaunes. On tire un jeton, on note sa couleur et on le remet. Six groupes font chacun $50$ tirages ; ils obtiennent $19$, $15$, $20$, $23$, $21$ et $22$ jetons verts.\na) Quelle est la probabilité de tirer un jeton vert ?\nb) Calculer la fréquence des verts pour chaque groupe.\nc) On met les résultats en commun. Calculer la fréquence des verts sur les $300$ tirages.\nd) Commenter.",
          reponses: [
            { question: "a)", attendu: "0,4" },
            { question: "b)", attendu: "0,38 ; 0,3 ; 0,4 ; 0,46 ; 0,42 ; 0,44" },
            { question: "c)", attendu: "0,4" },
          ],
          correction:
            "a) $5$ jetons, dont $2$ verts : $P(\\text{vert}) = \\dfrac{2}{5} = 0{,}4$.\nb) Je divise chaque nombre par $50$ : $0{,}38$ ; $0{,}3$ ; $0{,}4$ ; $0{,}46$ ; $0{,}42$ ; $0{,}44$.\nc) $19 + 15 + 20 + 23 + 21 + 22 = 120$ verts sur $300$ tirages : $\\dfrac{120}{300} = 0{,}4$.\nd) Les groupes vont de $0{,}3$ à $0{,}46$ : sur $50$ tirages, la fréquence varie beaucoup. En réunissant les $300$ tirages, on se rapproche de la probabilité — ici on tombe même pile sur $0{,}4$, ce qui est un hasard heureux.\n⛔ Le piège : croire que le groupe qui a trouvé $0{,}3$ s'est trompé. Aucun groupe ne s'est trompé : chacun a observé SA série.\nRéponse : $P = 0{,}4$ ; fréquences de $0{,}3$ à $0{,}46$ ; en commun, $0{,}4$.",
          // À droite, les fréquences EN POURCENTAGE, puis « tous » pour les 300 tirages.
          schema: deux(
            billes([{ couleur: VERT }, { couleur: VERT }, { couleur: JAUNE }, { couleur: JAUNE }, { couleur: JAUNE }]),
            barres([{ label: "G1", value: 38 }, { label: "G2", value: 30 }, { label: "G3", value: 40 }, { label: "G4", value: 46 }, { label: "G5", value: 42 }, { label: "G6", value: 44 }, { label: "tous", value: 40 }], 6),
          ),
          micros: ["proba_frequence_calculer", "proba_frequence_comparer", "proba_frequence_repeter"],
        },
        {
          enonce:
            "Inès et Karim soupçonnent chacun leur dé de favoriser le $6$. Inès lance le sien $30$ fois et obtient $8$ six. Karim lance le sien $600$ fois et obtient $140$ six.\na) Calculer les deux fréquences, au centième. Laquelle est la plus grande ?\nb) Combien de six attendait-on dans chaque cas avec un dé équilibré ? Combien y en a-t-il de trop ?\nc) On simule $1\\,000$ séries de $30$ lancers d'un dé équilibré : $101$ séries donnent $8$ six ou plus. On simule aussi $1\\,000$ séries de $600$ lancers : aucune ne dépasse $133$ six. Qui a de bonnes raisons de soupçonner son dé ?",
          reponses: [
            { question: "a) Inès", attendu: "0,27", tolerance: 0.005 },
            { question: "a) Karim", attendu: "0,23", tolerance: 0.005 },
            { question: "a) plus", attendu: ["Inès", "celle d'Inès"] },
            { question: "b) Inès", attendu: "5" },
            { question: "b) Karim", attendu: "100" },
            { question: "b) trop I", attendu: "3" },
            { question: "b) trop K", attendu: "40" },
            { question: "c)", attendu: ["Karim"] },
          ],
          correction:
            "a) Inès : $\\dfrac{8}{30} \\approx 0{,}27$. Karim : $\\dfrac{140}{600} \\approx 0{,}23$. La fréquence d'Inès est la plus grande.\nb) Avec un dé équilibré, on attend un sixième des lancers : $30 \\div 6 = 5$ six pour Inès, $600 \\div 6 = 100$ six pour Karim. Inès en a $3$ de trop ; Karim, $40$.\nc) Le résultat d'Inès arrive dans environ une série sur dix avec un dé équilibré : il ne prouve rien. Celui de Karim n'est arrivé dans aucune des $1\\,000$ séries : Karim a de bonnes raisons de soupçonner son dé.\n⛔ Le piège : croire que le plus gros pourcentage accuse le plus. C'est l'écart ET le nombre de lancers qui comptent, ensemble.\nRéponse : $0{,}27$ et $0{,}23$ ; $3$ et $40$ six de trop ; seul Karim peut soupçonner son dé.",
          schema: tableauProba(["", "lancers", "six", "attendus", "de trop"], [["Inès", "30", "8", "5", "3"], ["Karim", "600", "140", "100", "40"]], [[1, 4]]),
          micros: ["proba_frequence_echantillon", "proba_frequence_comparer"],
        },
        {
          enonce:
            "Un fabricant d'ampoules LED contrôle $2\\,000$ ampoules prises au hasard dans sa production : $36$ sont défectueuses.\na) Estimer la probabilité qu'une ampoule soit défectueuse.\nb) Environ combien d'ampoules défectueuses faut-il prévoir dans une commande de $50\\,000$ ampoules ?\nc) Un magasin reçoit un carton de $10$ ampoules, dont $2$ défectueuses. Le gérant écrit au fabricant : « $20$ % de vos ampoules sont défectueuses ». Qu'en penser ?",
          reponses: [
            { question: "a)", attendu: ["0,018", "1,8%"] },
            { question: "b)", attendu: "900" },
          ],
          correction:
            "a) Aucun calcul ne donne cette probabilité : je l'estime par la fréquence, mesurée sur beaucoup d'ampoules. $\\dfrac{36}{2\\,000} = 0{,}018$, soit $1{,}8$ %.\nb) $50\\,000 \\times 0{,}018 = 900$ : environ $900$ ampoules défectueuses — une estimation, pas un compte exact.\nc) $\\dfrac{2}{10} = 0{,}2$, soit $20$ %, mais sur $10$ ampoules seulement. Un carton malchanceux ne dit rien de toute la production ; le contrôle de $2\\,000$ ampoules est bien plus fiable.\n⛔ Le piège : diviser dans le mauvais sens, $2\\,000 \\div 36$. La fréquence met le nombre d'ampoules défectueuses AU NUMÉRATEUR.\nRéponse : environ $0{,}018$ ; environ $900$ ampoules ; le carton de $10$ ne prouve rien.",
          schema: tableauProba(["", "contrôle", "commande"], [["ampoules", "2 000", "50 000"], ["défectueuses", "36", "900"]], [[1, 2]]),
          micros: ["proba_frequence_defi", "proba_frequence_calculer", "proba_frequence_echantillon"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles : je calcule, je compare, et je regarde sur combien d'essais avant de conclure.",
      rappel: [
        "Je calcule la fréquence, je la compare à la probabilité, puis je regarde le NOMBRE d'essais.",
        "Une SIMULATION répète l'expérience des centaines de fois : elle montre si un résultat est courant ou rare quand tout est normal.",
        "Un écart sur peu d'essais ne prouve rien ; un écart qui tient sur des centaines d'essais fait douter.",
      ],
      exercices: [
        {
          titre: "Le dé de Lucas",
          enonce:
            "Lucas trouve que son dé sort trop souvent le $1$ : sur ses $12$ premiers lancers, il a obtenu $4$ fois le $1$.\na) Calculer la fréquence du $1$ sur ces $12$ lancers et la comparer à la probabilité pour un dé équilibré.\nb) Lucas peut-il conclure que son dé est truqué ?\nc) Avec sa classe, il continue jusqu'à $600$ lancers, ses $12$ premiers compris. Le $1$ est sorti $10$ fois sur les $60$ premiers lancers, $21$ fois sur les $120$ premiers, $53$ fois sur les $300$ premiers et $101$ fois sur les $600$. Calculer ces quatre fréquences, au millième.\nd) Que conclure ?",
          reponses: [
            { question: "a) fréq.", attendu: "1/3", tolerance: 0.005 },
            { question: "a) proba", attendu: "1/6", tolerance: 0.005 },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: "0,167 ; 0,175 ; 0,177 ; 0,168", tolerance: 0.0005 },
          ],
          correction:
            "a) $\\dfrac{4}{12} = \\dfrac{1}{3} \\approx 0{,}333$, contre $P(1) = \\dfrac{1}{6} \\approx 0{,}167$ pour un dé équilibré : deux fois plus.\nb) Non. Sur $12$ lancers, on attendait $2$ fois le $1$ ; il est sorti $2$ fois de plus. Sur si peu de lancers, un tel écart est courant.\nc) $\\dfrac{10}{60} \\approx 0{,}167$ ; $\\dfrac{21}{120} = 0{,}175$ ; $\\dfrac{53}{300} \\approx 0{,}177$ ; $\\dfrac{101}{600} \\approx 0{,}168$.\nd) Sur $600$ lancers, on attendait $600 \\div 6 = 100$ fois le $1$ ; il est sorti $101$ fois. La fréquence s'est collée à $\\dfrac{1}{6}$ : rien n'accuse le dé. Sur la courbe, le début est agité, puis la fréquence se stabilise près de la ligne pointillée.\n⛔ Le piège : conclure après $12$ lancers. Le début de la courbe bouge beaucoup ; c'est la suite, sur des centaines de lancers, qui renseigne.\nRéponse : $0{,}333$ au début, $0{,}168$ après $600$ lancers : rien n'indique que le dé de Lucas soit truqué, ses $12$ premiers lancers l'avaient trompé.",
          schema: courbe([{ tirages: T17, succes: "1" }], { valeur: 1 / 6, label: "1/6" }, { ymax: 0.5, pasY: 0.1, pasX: 100 }),
          micros: ["proba_frequence_comparer", "proba_frequence_repeter", "proba_frequence_defi"],
        },
        {
          titre: "Les oiseaux des jardins",
          enonce:
            "Chaque hiver, le Comptage national des oiseaux des jardins (LPO et Muséum national d'Histoire naturelle) invite chacun à compter pendant une heure les oiseaux de son jardin. Jade a compté $20$ oiseaux à sa mangeoire, dont $8$ mésanges bleues. Dans toute sa commune, les participants ont compté $1\\,500$ oiseaux, dont $270$ mésanges bleues.\na) Calculer la fréquence des mésanges bleues chez Jade, puis dans la commune.\nb) Jade affirme : « $40$ % des oiseaux de ma commune sont des mésanges bleues ». Qu'en penser ?\nc) Estimer la probabilité que le prochain oiseau observé à une mangeoire de la commune soit une mésange bleue.\nd) Sur $200$ oiseaux observés dans la commune, combien de mésanges bleues peut-on prévoir, environ ?",
          reponses: [
            { question: "a) Jade", attendu: ["0,4", "40%"] },
            { question: "a) comm.", attendu: ["0,18", "18%"] },
            { question: "c)", attendu: "0,18" },
            { question: "d)", attendu: "36" },
          ],
          correction:
            "a) Chez Jade : $\\dfrac{8}{20} = 0{,}4$, soit $40$ %. Dans la commune : $\\dfrac{270}{1\\,500} = 0{,}18$, soit $18$ %.\nb) Elle généralise à partir de $20$ oiseaux, vus à UNE seule mangeoire pendant une heure : c'est bien trop peu. Une mésange de plus ou de moins change sa fréquence de $5$ points. Le comptage de la commune, sur $1\\,500$ oiseaux, est bien plus fiable.\nc) J'estime la probabilité par la fréquence la plus fiable, celle de la commune : environ $0{,}18$.\nd) $200 \\times 0{,}18 = 36$ : environ $36$ mésanges bleues.\n⛔ Le piège : prendre la fréquence d'un petit comptage pour la vérité. Plus on compte d'oiseaux, plus l'estimation est sûre.\nRéponse : $0{,}4$ et $0{,}18$ ; Jade généralise trop vite ; probabilité estimée à $0{,}18$ ; environ $36$ mésanges bleues.",
          // Les deux fréquences EN POURCENTAGE.
          schema: barres([{ label: "Jade", value: 40 }, { label: "commune", value: 18 }], 1),
          micros: ["proba_frequence_calculer", "proba_frequence_echantillon", "proba_frequence_defi"],
        },
        {
          titre: "La séance de tirs au but",
          enonce:
            "On admet qu'un tir au but est réussi avec la probabilité $0{,}75$ — trois sur quatre, l'ordre de grandeur des grands tournois. À l'entraînement, une équipe réussit $2$ tirs sur $5$. L'entraîneur s'alarme : « nos tireurs sont nuls ».\na) Calculer la fréquence de réussite de cette séance.\nb) On simule $1\\,000$ séances de $5$ tirs, chaque tir réussi avec la probabilité $0{,}75$ : $90$ séances donnent $2$ réussites ou moins, $268$ en donnent $3$, $384$ en donnent $4$ et $258$ en donnent $5$. Le résultat de l'équipe est-il rare ?\nc) Sur toute la saison, l'équipe a réussi $22$ tirs sur $40$. On simule $1\\,000$ saisons de $40$ tirs : seules $4$ donnent $22$ réussites ou moins. Calculer la fréquence de la saison, puis conclure.",
          reponses: [
            { question: "a)", attendu: ["0,4", "40%"] },
            { question: "b)", attendu: ["non", "faux"] },
            { question: "c)", attendu: ["0,55", "55%"] },
          ],
          correction:
            "a) $\\dfrac{2}{5} = 0{,}4$, soit $40$ %, contre $75$ % attendus.\nb) $90$ séances sur $1\\,000$, environ une sur dix, donnent $2$ réussites ou moins : c'est un mauvais jour, pas une preuve. Sur $5$ tirs, on ne peut rien conclure.\nc) $\\dfrac{22}{40} = 0{,}55$, soit $55$ %. Si la vraie probabilité était $0{,}75$, cela n'arriverait que dans $4$ saisons sur $1\\,000$ : c'est très rare. Cette fois, l'entraîneur a de bonnes raisons de penser que ses tireurs réussissent moins de trois tirs sur quatre.\n⭐ L'écart de la saison ($20$ points) est plus petit que celui de la séance ($35$ points), et pourtant c'est lui qui accuse : il tient sur $40$ tirs.\n⛔ Le piège : juger sur une seule séance de $5$ tirs.\nRéponse : $0{,}4$, un résultat courant (une séance sur dix) ; $0{,}55$ sur la saison, très rare : là, on peut douter.",
          schema: barres([{ label: "0 à 2", value: 90 }, { label: "3", value: 268 }, { label: "4", value: 384 }, { label: "5", value: 258 }], 0),
          micros: ["proba_frequence_echantillon", "proba_frequence_defi"],
        },
        {
          titre: "La pièce de l'arbitre",
          enonce:
            "Avant chaque match de rugby, l'arbitre lance une pièce pour choisir qui donne le coup d'envoi. Un capitaine a vu la pièce tomber $4$ fois sur pile en $6$ matchs : « elle est truquée ! » La ligue fait lancer la même pièce $600$ fois : elle tombe $400$ fois sur pile.\na) Calculer la fréquence de pile dans les deux cas. Que remarque-t-on ?\nb) On simule $1\\,000$ séries de $6$ lancers d'une pièce équilibrée ; le diagramme donne le nombre de séries selon le nombre de piles. Combien de séries ont donné au moins $4$ piles ?\nc) On simule aussi $1\\,000$ séries de $600$ lancers : le nombre de piles y va de $264$ à $343$. Que conclure dans chacun des deux cas ?",
          reponses: [
            { question: "a) capit.", attendu: "2/3", tolerance: 0.005 },
            { question: "a) ligue", attendu: "2/3", tolerance: 0.005 },
            { question: "b)", attendu: "315" },
          ],
          correction:
            "a) $\\dfrac{4}{6} = \\dfrac{2}{3} \\approx 0{,}67$ et $\\dfrac{400}{600} = \\dfrac{2}{3} \\approx 0{,}67$ : exactement la même fréquence.\nb) J'additionne les barres de $4$, $5$ et $6$ piles : $200 + 101 + 14 = 315$ séries sur $1\\,000$, environ une sur trois.\nc) Pour le capitaine : $4$ piles sur $6$ arrive environ une fois sur trois avec une pièce équilibrée. Ses $6$ matchs ne prouvent RIEN.\nPour la ligue : en $1\\,000$ séries de $600$ lancers, jamais plus de $343$ piles. $400$ est très loin au-dessus : on attendait $300$ piles, il y en a $100$ de trop. Cette fois, la pièce est très probablement truquée.\n⛔ Le piège : croire que la même fréquence mène à la même conclusion. $6$ lancers donnant $4$ piles ne prouvent rien ; $600$ lancers donnant $400$ piles accusent la pièce.\nRéponse : même fréquence, $\\dfrac{2}{3}$ ; $315$ séries sur $1\\,000$ ; le capitaine ne peut rien conclure, la ligue peut soupçonner la pièce.",
          schema: (
            <div className="grid gap-2">
              {barres([{ label: "0", value: 17 }, { label: "1", value: 99 }, { label: "2", value: 248 }, { label: "3", value: 321 }, { label: "4", value: 200 }, { label: "5", value: 101 }, { label: "6", value: 14 }], 4)}
              {tableauProba(["1 000 séries", "de 6", "de 600"], [["piles, au moins", "0", "264"], ["piles, au plus", "6", "343"], ["séries à 2/3 ou plus", "315", "0"]], [[2, 1], [2, 2]])}
            </div>
          ),
          micros: ["proba_frequence_echantillon", "proba_frequence_defi"],
        },
      ],
    },
  ],
};
