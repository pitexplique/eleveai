// ─── Fiche d'exercices : puissances et notation scientifique (4e) — 20 exercices corrigés ─
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-puissances.tsx` et sur les
// HUIT micros du coach de 4e, notionId puissance_ecriture.
//
// ⛔ LE CALIBRAGE DE 4e, TENU PARTOUT : « la mise en acte de produits et de
// quotients de puissances de même base résulte de l'application de la
// DÉFINITION plutôt que de celle d'une formule » (BO du cycle 4). Cette feuille
// n'écrit donc NULLE PART une règle sur les exposants : un produit de puissances
// de 10 s'écrit en clair et on compte les zéros (9, 15, 17), un produit de même
// base s'écrit facteur par facteur (16). Les formules sont de 3e
// (`maths-3e-puissances.tsx`).
// ⛔ Et ce qui n'est PAS de cette notion : les préfixes (nano, micro… giga) et les
// ordres de grandeur, qui ont leur feuille (`ordre_grandeur`). Aucun préfixe
// n'est employé ici hors des unités courantes (km, mL, kWh).
//
// ⛔ Aucun exemple de la fiche de cours n'est repris (5⁴, 3², (−2)³ contre −2³,
// (−2)² contre −2², 2⁻³, 4⁻¹, 5⁻², 12 500, 34 500, 0,0072, 8,5 × 10³, 10³ × 10²,
// 2³ + 4², 3² × 10², la colonie de bactéries, la feuille pliée), ni aucun de la
// feuille de 3e (Neptune, disque de photos, fourmis, échiquier, feuille pliée,
// 7⁴, (−2)⁴, 45 000…).
//
// Les pièges nommés : l'exposant pris pour un facteur (1, 2), les parenthèses
// qui décident de la base (3), l'exposant négatif pris pour un nombre négatif
// (4, 6, 11), le zéro avant la virgule compté comme un rang (5), le zéro du
// milieu perdu (7), la mantisse qui décide à la place de l'exposant (8, 14),
// les exposants multipliés au lieu de compter les zéros (9), (2 + 3)² pris pour
// 2² + 3² (10), la virgule et l'exposant bougés dans le même sens (12), un zéro
// oublié dans un grand nombre (13), la notation laissée à 20 × 10⁵ (15), une
// somme de puissances traitée comme un produit (16), la puissance de 10 oubliée
// dans une division (17), diviser par un nombre plus petit que 1 (18), −4 pris
// pour plus grand que −3 (19), le nombre de tours confondu avec un nombre de
// joueurs (20).
//
// Les chiffres réels, et d'où ils viennent (arrondis pour le calcul) :
//   · diamètre du Soleil ≈ 1 391 400 km (NASA, Sun Fact Sheet : rayon moyen
//     695 700 km), arrondi à 1 400 000 km — ex. 13 ;
//   · longueur d'Escherichia coli ≈ 2 µm (BioNumbers, Milo et al., Harvard) — ex. 13 ;
//   · ≈ 3 × 10¹³ cellules dans un corps humain adulte (Sender, Fuchs et Milo,
//     PLoS Biology, 2016) — ex. 13 ;
//   · une éolienne terrestre de 2,5 MW produit environ 5 × 10⁶ kWh par an
//     (2,5 MW × 8 760 h × un facteur de charge d'environ 25 %, ordre de grandeur
//     du Bilan électrique 2023 de RTE) — ex. 17 ;
//   · consommation d'électricité de la France en 2023 ≈ 445 TWh, soit
//     ≈ 4,5 × 10¹¹ kWh (RTE, Bilan électrique 2023) — ex. 17 ; la consommation
//     d'un foyer, 5 × 10³ kWh par an chauffage compris, est un ARRONDI de
//     l'énoncé (4,5 à 5 MWh selon la CRE) ;
//   · bassin olympique : 50 m × 25 m, profondeur d'au moins 2 m (World Aquatics,
//     règles des installations FR 2) — ex. 18 ;
//   · 20 gouttes d'eau pour 1 mL (compte-gouttes normalisé, Pharmacopée
//     européenne 2.1.1) — ex. 18 ;
//   · masses : baleine bleue jusqu'à environ 150 t (NOAA Fisheries), éléphant
//     d'Afrique mâle environ 6 t (WWF), colibri d'Elena environ 2 g (le plus
//     petit oiseau du monde), abeille ouvrière environ 0,1 g, être humain 70 kg
//     (homme de référence de la CIPR) — ex. 19 ;
//   · Roland-Garros : tableau final du simple messieurs à 128 joueurs (FFT) — ex. 20.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas », Frédéric, redit le 25/09) :
// les VINGT corrigés dessinent. Des tableaux qui montrent l'échelle des
// exposants (2, 4), le signe qui alterne (3), la virgule qui voyage (6, 7, 12),
// le produit écrit en clair (9, 15) ; des barres qui doublent (2) ou qui
// s'effondrent de moitié (20) ; la droite graduée où l'inverse et l'opposé se
// séparent (11) ; et le carré de côté 2 + 3 découpé en quatre (10), qui dit
// mieux qu'une phrase pourquoi (2 + 3)² n'est pas 2² + 3². Chaque case, chaque
// barre, chaque point, chaque rectangle est RELU par le script de recalcul.
//
// Les corrigés sont écrits à la première personne (« je repère »), comme les
// feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-puissances-4e.mjs`.
//
// Micro-compétences : puissance_comprendre (1, 20), puissance_calculer (2, 3,
// 11, 20), puissance_exposant_negatif (4, 11, 18, 20), puissance_dix (5, 6, 9,
// 18), puissance_notation_scientifique (7, 12, 13, 15, 17, 18), puissance_comparer
// (8, 14, 19), puissance_calcul (9, 10, 15, 16, 17, 19), puissance_defi (16,
// 17, 18, 19, 20). 8/8.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// ⛔ MESURÉ À 375 PX (25/09, coordinateur) : le `diagramme` de figures.tsx a un
// viewBox de 300 de large pour un dessin rendu à ~235 px ; ses nombres (12)
// tombaient à 9,4 px et ses étiquettes (11) à 8,7 px. D'où cette copie locale à
// 220 de large : 11 × 235 ÷ 220 ≈ 11,7 px, au-dessus du plancher de 11 px.
// Étiquettes COURTES en conséquence (« 1 » à « 7 » pour les tours de l'ex. 20).
const diagramme = (graphType: "barres", data: { label: string; value: number }[], surligne?: number) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer figure={{ kind: "stat_graph", graphType, data, size: { width: 220, height: 190 }, display: { showValues: true, showLabels: true, highlightIndex: surligne } }} />
  </div>
);

// Le tableau d'un corrigé, plusieurs lignes : du HTML, pas un canvas.
// ⚠️ Pas de formule dans les cases : elles ne traversent pas KaTeX. Les
// exposants s'y écrivent en Unicode (10⁻⁴), le signe moins en « − ».
const tableau = (lignes: [string, ...string[]][]) => (
  <div className="overflow-x-auto">
    <table className="mx-auto border-collapse text-sm">
      <tbody>
        {lignes.map(([entete, ...cases]) => (
          <tr key={entete}>
            <th className="border border-slate-400 bg-slate-100 px-2 py-1 text-left font-semibold text-slate-800">
              {entete}
            </th>
            {cases.map((c, i) => (
              <td key={i} className="border border-slate-400 px-3 py-1 text-center text-slate-900">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Une droite graduée avec des POINTS (le helper `droite` de figures.tsx ne
// dessine qu'un intervalle). Même réglage que la fiche de cours : 260 de large,
// une graduation par unité, des étiquettes d'une lettre.
// ⛔ 220 de large et non 260 (mesure du 25/09) : rendue à ~235 px sur
// téléphone, la droite garde ses nombres au-dessus de 11 px effectifs.
// ⭐ Les points négatifs en rouge, les positifs en bleu : l'inverse (A) et
// l'opposé (B) de l'exercice 11 tombent de part et d'autre de zéro.
const droiteGraduee = (points: { value: number; label: string }[], min: number, max: number) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min,
        max,
        step: 1,
        points: points.map((p) => ({ ...p, color: p.value < 0 ? "#dc2626" : "#2563eb" })),
        display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
        size: { width: 220, height: 95 },
      }}
    />
  </div>
);

// ⭐ LE CARRÉ DE CÔTÉ 2 + 3 (exercice 10), en SVG local : aucun canvas du coach
// ne découpe un carré en rectangles étiquetés. Chaque rectangle est
// [x, y, largeur, hauteur, aire écrite], en cases ; le script relit ce tableau
// et vérifie que les quatre morceaux pavent le carré de 5 sur 5 et que chaque
// aire écrite est la bonne.
const U = 34;
const MARGE = 24;
const CARRE: [number, number, number, number, string][] = [
  [0, 0, 2, 2, "4"],
  [2, 0, 3, 2, "6"],
  [0, 2, 2, 3, "6"],
  [2, 2, 3, 3, "9"],
];
const TEINTES = ["#bfdbfe", "#fde68a", "#fde68a", "#bbf7d0"];
const carreDecoupe = (
  <div className="mx-auto w-full max-w-[13rem] print:max-w-[10rem]">
    <svg viewBox={`0 0 ${5 * U + MARGE + 8} ${5 * U + MARGE + 8}`} className="w-full" role="img" aria-label="Un carré de côté 2 + 3 découpé en un carré de 4 cases, un carré de 9 cases et deux rectangles de 6 cases">
      {CARRE.map(([x, y, w, h, aire], i) => (
        <g key={i}>
          <rect x={MARGE + x * U} y={MARGE + y * U} width={w * U} height={h * U} fill={TEINTES[i]} stroke="#334155" strokeWidth={1.5} />
          <text x={MARGE + (x + w / 2) * U} y={MARGE + (y + h / 2) * U + 5} textAnchor="middle" fontSize={15} fontWeight={700} fill="#0f172a">
            {aire}
          </text>
        </g>
      ))}
      <text x={MARGE + 1 * U} y={MARGE - 8} textAnchor="middle" fontSize={13} fill="#334155">2</text>
      <text x={MARGE + 3.5 * U} y={MARGE - 8} textAnchor="middle" fontSize={13} fill="#334155">3</text>
      <text x={MARGE - 10} y={MARGE + 1 * U + 5} textAnchor="middle" fontSize={13} fill="#334155">2</text>
      <text x={MARGE - 10} y={MARGE + 3.5 * U + 5} textAnchor="middle" fontSize={13} fill="#334155">3</text>
    </svg>
  </div>
);

export const exercicesPuissances4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "puissance-ecriture",
  titre: "Puissances et notation scientifique",
  accroche:
    "Vingt exercices, du calcul seul au problème : écrire et calculer une puissance, le signe et les parenthèses, l'exposant négatif qui donne un inverse, les puissances de 10, la notation scientifique, comparer et ranger. Puis un parc éolien, une piscine olympique en gouttes d'eau, le poids des animaux, le tableau de Roland-Garros. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et un schéma.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/puissance-ecriture", titre: "Puissances et notation scientifique" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris le produit en entier si j'hésite, puis je calcule.",
      rappel: [
        "$a^n$ est le produit de $n$ facteurs égaux à $a$ : $a$ est la BASE, $n$ est l'EXPOSANT. Et $a^0 = 1$ pour tout nombre $a$ non nul.",
        "Les parenthèses décident de la base : dans $(-a)^n$, le signe moins est répété ; dans $-a^n$, il reste devant.",
        "Un exposant négatif donne un INVERSE : $a^{-n} = \\dfrac{1}{a^n}$. Pour $a$ positif, c'est un nombre positif.",
        "$10^n$ s'écrit avec $n$ zéros ; $10^{-n}$ place le $1$ au $n$-ième rang après la virgule. Notation scientifique : $a \\times 10^n$ avec $1 \\leqslant a < 10$.",
      ],
      exercices: [
        {
          enonce:
            "a) Écris sous la forme d'une puissance : $6 \\times 6 \\times 6 \\times 6 \\times 6$.\nb) Écris sous la forme d'une puissance : $(-4) \\times (-4)$.\nc) Dans $11^4$, quelle est la base ? Quel est l'exposant ? Écris le produit.",
          correction:
            "a) Je compte les facteurs : le $6$ apparaît cinq fois, donc $6 \\times 6 \\times 6 \\times 6 \\times 6 = 6^5$.\nb) Le nombre répété est $-4$ tout entier : je garde les parenthèses, $(-4) \\times (-4) = (-4)^2$.\nc) La base est $11$, le nombre répété ; l'exposant est $4$, le nombre de facteurs : $11^4 = 11 \\times 11 \\times 11 \\times 11$.\n⛔ Le piège : écrire $6 \\times 5$ au lieu de $6^5$. L'exposant COMPTE les facteurs, il n'en est pas un : $6 \\times 5 = 30$, alors que $6^5 = 7\\,776$.\nRéponse : a) $6^5$ ; b) $(-4)^2$ ; c) base $11$, exposant $4$.",
          schema: tableau([
            ["Écriture", "6⁵", "(−4)²", "11⁴"],
            ["Base", "6", "−4", "11"],
            ["Exposant", "5", "2", "4"],
            ["Produit", "6×6×6×6×6", "(−4)×(−4)", "11×11×11×11"],
          ]),
          micros: ["puissance_comprendre"],
        },
        {
          enonce: "Calcule sans calculatrice :\na) $2^6$\nb) $5^3$\nc) $9^2$\nd) $8^0$",
          correction:
            "a) J'écris le produit : $2^6 = 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 = 64$. J'avance pas à pas, en doublant : $2$, $4$, $8$, $16$, $32$, $64$.\nb) $5^3 = 5 \\times 5 \\times 5 = 125$ : $5 \\times 5 = 25$, puis $25 \\times 5 = 125$.\nc) $9^2 = 9 \\times 9 = 81$.\nd) Je descends l'échelle en divisant par $8$ : $8^2 = 64$, $8^1 = 8$, puis $8^0 = 8 \\div 8 = 1$.\n⛔ Le piège : écrire $2^6 = 12$. Ça, c'est $2 \\times 6$. Six facteurs $2$ donnent $64$, pas $12$.\nRéponse : $2^6 = 64$ ; $5^3 = 125$ ; $9^2 = 81$ ; $8^0 = 1$.",
          schema: (
            <div className="space-y-3">
              {diagramme("barres", [
                { label: "2¹", value: 2 },
                { label: "2²", value: 4 },
                { label: "2³", value: 8 },
                { label: "2⁴", value: 16 },
                { label: "2⁵", value: 32 },
                { label: "2⁶", value: 64 },
              ], 5)}
              {tableau([
                ["Puissance", "8²", "8¹", "8⁰"],
                ["Valeur", "64", "8", "1"],
                ["On divise par", "", "8", "8"],
              ])}
            </div>
          ),
          micros: ["puissance_calculer"],
        },
        {
          enonce: "Calcule :\na) $(-3)^4$\nb) $-3^4$\nc) $(-5)^3$\nd) $(-1)^7$",
          correction:
            "a) La base est $-3$, entre parenthèses : $(-3)^4 = (-3) \\times (-3) \\times (-3) \\times (-3) = 81$. Quatre facteurs négatifs, un nombre PAIR : le résultat est positif.\nb) Sans parenthèses, l'exposant ne porte que sur le $3$ : $-3^4 = -(3 \\times 3 \\times 3 \\times 3) = -81$.\nc) $(-5)^3 = (-5) \\times (-5) \\times (-5) = -125$. Trois facteurs négatifs, un nombre IMPAIR : le résultat est négatif.\nd) Sept facteurs $-1$, un nombre impair : $(-1)^7 = -1$.\n⛔ Le piège : lire $-3^4$ comme $(-3)^4$. Les parenthèses décident de la base : $(-3)^4$ vaut $81$, mais $-3^4$ vaut $-81$.\nRéponse : a) $81$ ; b) $-81$ ; c) $-125$ ; d) $-1$.",
          schema: tableau([
            ["Écriture", "(−3)⁴", "−3⁴", "(−5)³", "(−1)⁷"],
            ["Facteurs négatifs", "4", "aucun", "3", "7"],
            ["Signe", "+", "−", "−", "−"],
            ["Valeur", "81", "−81", "−125", "−1"],
          ]),
          micros: ["puissance_calculer"],
        },
        {
          enonce:
            "a) Écris $2^{-4}$ sous forme de fraction, puis en écriture décimale.\nb) Même question pour $5^{-1}$.\nc) Écris $3^{-2}$ sous forme de fraction. Est-ce un nombre négatif ?",
          correction:
            "Un exposant négatif désigne un INVERSE : $a^{-n} = \\dfrac{1}{a^n}$.\na) $2^{-4} = \\dfrac{1}{2^4} = \\dfrac{1}{16}$, et $1 \\div 16 = 0{,}0625$.\nb) $5^{-1} = \\dfrac{1}{5^1} = \\dfrac{1}{5} = 0{,}2$.\nc) $3^{-2} = \\dfrac{1}{3^2} = \\dfrac{1}{9}$. Non : c'est un nombre POSITIF, plus petit que $1$.\n⭐ Le tableau le montre sans rien admettre : à chaque marche vers la droite, je divise par $2$. Après $2^0 = 1$, la division continue : $0{,}5$, puis $0{,}25$…\n⛔ Le piège : croire que $2^{-4}$ vaut $-16$. Le signe moins porte sur l'EXPOSANT : il annonce un inverse, pas un opposé.\nRéponse : $2^{-4} = \\dfrac{1}{16} = 0{,}0625$ ; $5^{-1} = \\dfrac{1}{5} = 0{,}2$ ; $3^{-2} = \\dfrac{1}{9}$, un nombre positif.",
          schema: tableau([
            ["Puissance", "2²", "2¹", "2⁰", "2⁻¹", "2⁻²", "2⁻³", "2⁻⁴"],
            ["Valeur", "4", "2", "1", "0,5", "0,25", "0,125", "0,0625"],
          ]),
          micros: ["puissance_exposant_negatif"],
        },
        {
          enonce:
            "a) Écris en écriture décimale : $10^7$, puis $10^{-5}$.\nb) Écris sous la forme d'une puissance de $10$ : $10\\,000$, puis $0{,}000001$.",
          correction:
            "a) $10^7$ : un $1$ suivi de sept zéros, $10^7 = 10\\,000\\,000$, dix millions.\n$10^{-5}$ : le $1$ se place au cinquième rang après la virgule, $10^{-5} = 0{,}00001$.\nb) $10\\,000$ s'écrit avec quatre zéros : $10\\,000 = 10^4$.\nDans $0{,}000001$, le $1$ est au sixième rang après la virgule : $0{,}000001 = 10^{-6}$.\n⛔ Le piège : compter TOUS les zéros de $0{,}000001$, celui d'avant la virgule compris, et écrire $10^{-7}$. Je compte les RANGS après la virgule : le $1$ est au sixième.\nRéponse : $10^7 = 10\\,000\\,000$ ; $10^{-5} = 0{,}00001$ ; $10\\,000 = 10^4$ ; $0{,}000001 = 10^{-6}$.",
          schema: tableau([
            ["Puissance", "10⁻⁶", "10⁻⁵", "10⁴", "10⁷"],
            ["Décimal", "0,000001", "0,00001", "10 000", "10 000 000"],
            ["Ce qu'on compte", "6 rangs", "5 rangs", "4 zéros", "7 zéros"],
          ]),
          micros: ["puissance_dix"],
        },
        {
          enonce: "Écris en écriture décimale :\na) $6{,}4 \\times 10^3$\nb) $271 \\times 10^{-2}$\nc) $0{,}05 \\times 10^4$",
          correction:
            "a) Multiplier par $10^3$, c'est multiplier par $1\\,000$ : la virgule avance de trois rangs vers la droite. $6{,}4 \\times 10^3 = 6\\,400$.\nb) $10^{-2} = 0{,}01$ : multiplier par $0{,}01$, c'est diviser par $100$. La virgule recule de deux rangs vers la gauche : $271 \\times 10^{-2} = 2{,}71$.\nc) Quatre rangs vers la droite : $0{,}05 \\times 10^4 = 500$.\n⛔ Le piège : dans b), croire que l'exposant négatif rend le résultat négatif, et écrire $-2{,}71$. Un exposant négatif fait RECULER la virgule ; le nombre reste positif.\nRéponse : a) $6\\,400$ ; b) $2{,}71$ ; c) $500$.",
          schema: tableau([
            ["Calcul", "6,4 × 10³", "271 × 10⁻²", "0,05 × 10⁴"],
            ["La virgule", "3 rangs à droite", "2 rangs à gauche", "4 rangs à droite"],
            ["Résultat", "6 400", "2,71", "500"],
          ]),
          micros: ["puissance_dix"],
        },
        {
          enonce: "Donne la notation scientifique de :\na) $72\\,000$\nb) $0{,}00039$\nc) $506$\nd) $0{,}8$",
          correction:
            "La notation scientifique est $a \\times 10^n$ avec un seul chiffre non nul avant la virgule : $1 \\leqslant a < 10$.\na) Je place la virgule après le $7$ : $7{,}2$. Pour revenir à $72\\,000$, elle doit avancer de quatre rangs vers la droite : $72\\,000 = 7{,}2 \\times 10^{4}$.\nb) Le premier chiffre non nul est le $3$ : $3{,}9$. Pour revenir à $0{,}00039$, la virgule recule de quatre rangs, l'exposant est négatif : $0{,}00039 = 3{,}9 \\times 10^{-4}$.\nc) Deux rangs vers la droite, et je garde le $0$ du milieu : $506 = 5{,}06 \\times 10^{2}$.\nd) Un rang vers la gauche : $0{,}8 = 8 \\times 10^{-1}$.\n⛔ Le piège : dans c), perdre le zéro du milieu et écrire $5{,}6 \\times 10^2$. Or $5{,}6 \\times 10^2 = 560$, pas $506$.\nRéponse : a) $7{,}2 \\times 10^{4}$ ; b) $3{,}9 \\times 10^{-4}$ ; c) $5{,}06 \\times 10^{2}$ ; d) $8 \\times 10^{-1}$.",
          schema: tableau([
            ["Nombre", "72 000", "0,00039", "506", "0,8"],
            ["La virgule bouge de", "4 rangs", "4 rangs", "2 rangs", "1 rang"],
            ["Scientifique", "7,2 × 10⁴", "3,9 × 10⁻⁴", "5,06 × 10²", "8 × 10⁻¹"],
          ]),
          micros: ["puissance_notation_scientifique"],
        },
        {
          enonce:
            "Compare, en écrivant le signe qui convient :\na) $4{,}1 \\times 10^{6}$ et $9{,}7 \\times 10^{5}$\nb) $2{,}3 \\times 10^{-3}$ et $2{,}3 \\times 10^{-2}$\nc) $6{,}05 \\times 10^{4}$ et $6{,}5 \\times 10^{4}$",
          correction:
            "Je regarde d'abord les exposants ; je ne compare les nombres devant que si les exposants sont égaux.\na) $6 > 5$ : un million contre cent mille. Même si $9{,}7 > 4{,}1$, le nombre devant ne rattrape pas un rang de plus : $4{,}1 \\times 10^{6} > 9{,}7 \\times 10^{5}$.\nb) Les exposants sont négatifs, et $-2 > -3$ : $10^{-2} = 0{,}01$ est plus grand que $10^{-3} = 0{,}001$. Donc $2{,}3 \\times 10^{-3} < 2{,}3 \\times 10^{-2}$.\nc) Même exposant : je compare $6{,}05$ et $6{,}5$, c'est-à-dire $6{,}05$ et $6{,}50$. Donc $6{,}05 \\times 10^{4} < 6{,}5 \\times 10^{4}$.\n⛔ Le piège : dans a), choisir $9{,}7 \\times 10^{5}$ parce que $9{,}7$ est plus grand que $4{,}1$. En clair, c'est $4\\,100\\,000$ contre $970\\,000$ : les barres le montrent.\nRéponse : a) $>$ ; b) $<$ ; c) $<$.",
          schema: (
            <div className="space-y-3">
              {diagramme("barres", [
                { label: "4,1 × 10⁶", value: 4100000 },
                { label: "9,7 × 10⁵", value: 970000 },
              ], 0)}
              {tableau([
                ["a)", "4 100 000", ">", "970 000"],
                ["b)", "0,0023", "<", "0,023"],
                ["c)", "60 500", "<", "65 000"],
              ])}
            </div>
          ),
          micros: ["puissance_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. J'écris les puissances en clair et je justifie chaque réponse par un calcul.",
      rappel: [
        "En 4e, pas de règle sur les exposants à apprendre : j'écris chaque puissance en clair, je calcule, puis je compte les zéros ou les rangs.",
        "Les priorités : les parenthèses, puis les puissances, puis les multiplications et divisions, enfin les additions et soustractions.",
        "Pour comparer deux notations scientifiques : l'exposant d'abord ; les nombres devant seulement si les exposants sont égaux.",
        "Une somme de puissances ne se regroupe pas : je calcule chaque puissance, puis j'additionne.",
      ],
      exercices: [
        {
          enonce:
            "Calcule en écrivant chaque puissance de $10$ en clair, puis donne le résultat sous la forme d'une puissance de $10$ :\n$A = 10^6 \\times 10^3$\n$B = 10^{-2} \\times 10^{-3}$\n$C = 10^7 \\div 10^4$",
          correction:
            "Je ne cherche pas de règle : j'écris les nombres, je calcule, je compte les zéros.\n$A = 1\\,000\\,000 \\times 1\\,000 = 1\\,000\\,000\\,000$. Six zéros, puis trois de plus : neuf zéros. Donc $A = 10^9$, un milliard.\n$B = 0{,}01 \\times 0{,}001 = 0{,}00001$. Le $1$ est au cinquième rang après la virgule : $B = 10^{-5}$.\n$C = 10\\,000\\,000 \\div 10\\,000 = 1\\,000$. Diviser par $10\\,000$ retire quatre zéros aux sept : $C = 10^3$.\n⛔ Le piège : multiplier les exposants dans A, $6 \\times 3$, et écrire $10^{18}$. Je vérifie en clair : un million fois mille, c'est un milliard, avec neuf zéros.\nRéponse : $A = 10^9$ ; $B = 10^{-5}$ ; $C = 10^3$.",
          schema: tableau([
            ["Calcul", "10⁶ × 10³", "10⁻² × 10⁻³", "10⁷ ÷ 10⁴"],
            ["En clair", "1 000 000 × 1 000", "0,01 × 0,001", "10 000 000 ÷ 10 000"],
            ["Résultat", "1 000 000 000", "0,00001", "1 000"],
            ["Puissance de 10", "10⁹", "10⁻⁵", "10³"],
          ]),
          micros: ["puissance_calcul", "puissance_dix"],
        },
        {
          enonce:
            "Calcule, en respectant les priorités :\n$A = 2^5 + 3^3$\n$B = 4^2 \\times 10^3$\n$C = 5 \\times 2^3 - 6^2$\n$D = (2 + 3)^2$ et $E = 2^2 + 3^2$. Sont-ils égaux ?",
          correction:
            "Je calcule chaque puissance AVANT les multiplications et les additions.\n$A = 2^5 + 3^3 = 32 + 27 = 59$.\n$B = 4^2 \\times 10^3 = 16 \\times 1\\,000 = 16\\,000$.\n$C = 5 \\times 2^3 - 6^2 = 5 \\times 8 - 36 = 40 - 36 = 4$.\n$D$ : la parenthèse d'abord, $(2 + 3)^2 = 5^2 = 25$. Et $E = 2^2 + 3^2 = 4 + 9 = 13$. Ils ne sont pas égaux.\n⭐ Le dessin le montre : le carré de côté $2 + 3$ contient le carré de $2$ ($4$ cases) et le carré de $3$ ($9$ cases), mais aussi deux rectangles de $2$ sur $3$ ($6$ cases chacun). $4 + 9 + 6 + 6 = 25$.\n⛔ Le piège : croire que $(2 + 3)^2 = 2^2 + 3^2$. Il manque les deux rectangles, soit $12$ cases.\nRéponse : $A = 59$ ; $B = 16\\,000$ ; $C = 4$ ; $D = 25$ et $E = 13$, donc $D$ et $E$ ne sont pas égaux.",
          schema: carreDecoupe,
          micros: ["puissance_calcul"],
        },
        {
          enonce:
            "On donne $A = 2^{-1}$, $B = -2^{1}$, $C = 4^{0}$, $D = (-1)^{5}$ et $E = 2^{1}$.\na) Écris chaque nombre en écriture décimale.\nb) Range-les dans l'ordre croissant.\nc) $A$ et $B$ se ressemblent. Explique ce qui les sépare.",
          correction:
            "a) $A = 2^{-1} = \\dfrac{1}{2} = 0{,}5$ : l'exposant négatif donne l'INVERSE de $2$.\n$B = -2^{1} = -2$ : le signe moins est devant, c'est l'OPPOSÉ de $2$.\n$C = 4^{0} = 1$ : tout nombre non nul à la puissance $0$ vaut $1$.\n$D = (-1)^{5} = -1$ : cinq facteurs négatifs, un nombre impair.\n$E = 2^{1} = 2$.\nb) Je place les cinq points sur la droite graduée et je lis de gauche à droite.\nc) Dans $A$, le moins est sur l'exposant : il annonce un inverse, et $A$ est positif. Dans $B$, le moins est devant le nombre : il annonce un opposé, et $B$ est négatif.\n⛔ Le piège : placer $A$ à gauche de zéro. Un exposant négatif ne rend jamais négative une puissance d'un nombre positif.\nRéponse : $B < D < A < C < E$, soit $-2 < -1 < 0{,}5 < 1 < 2$.",
          schema: droiteGraduee([
            { value: -2, label: "B" },
            { value: -1, label: "D" },
            { value: 0.5, label: "A" },
            { value: 1, label: "C" },
            { value: 2, label: "E" },
          ], -3, 3),
          micros: ["puissance_exposant_negatif", "puissance_calculer"],
        },
        {
          enonce:
            "Ces écritures ne sont pas des notations scientifiques. Corrige-les, en passant par l'écriture décimale.\na) $23 \\times 10^{5}$\nb) $0{,}47 \\times 10^{-2}$\nc) $715 \\times 10^{-6}$",
          correction:
            "Le nombre devant doit être entre $1$ et $10$. Je passe par l'écriture décimale, puis je repars de zéro.\na) $23 \\times 10^{5} = 2\\,300\\,000$ : la virgule avance de cinq rangs. Puis $2\\,300\\,000 = 2{,}3 \\times 10^{6}$.\nb) $0{,}47 \\times 10^{-2} = 0{,}47 \\times 0{,}01 = 0{,}0047$. Puis $0{,}0047 = 4{,}7 \\times 10^{-3}$.\nc) La virgule recule de six rangs : $715 \\times 10^{-6} = 0{,}000715$. Puis $0{,}000715 = 7{,}15 \\times 10^{-4}$.\n⭐ Contrôle : en a), le nombre devant est divisé par $10$ et l'exposant gagne $1$ ; en b), il est multiplié par $10$ et l'exposant perd $1$ ; en c), il est divisé par $100$ et l'exposant gagne $2$.\n⛔ Le piège : bouger la virgule et l'exposant dans le MÊME sens, et écrire $2{,}3 \\times 10^{4}$ au a). Ce nombre vaut $23\\,000$, cent fois trop peu.\nRéponse : a) $2{,}3 \\times 10^{6}$ ; b) $4{,}7 \\times 10^{-3}$ ; c) $7{,}15 \\times 10^{-4}$.",
          schema: tableau([
            ["Donné", "23 × 10⁵", "0,47 × 10⁻²", "715 × 10⁻⁶"],
            ["En clair", "2 300 000", "0,0047", "0,000715"],
            ["Scientifique", "2,3 × 10⁶", "4,7 × 10⁻³", "7,15 × 10⁻⁴"],
          ]),
          micros: ["puissance_notation_scientifique"],
        },
        {
          enonce:
            "Écris chaque grandeur en notation scientifique.\na) Le diamètre du Soleil : environ $1\\,400\\,000$ km.\nb) La longueur d'une bactérie Escherichia coli : environ $0{,}000002$ m.\nc) Le nombre de cellules d'un corps humain adulte : environ $30\\,000\\,000\\,000\\,000$.\nd) Pour c), un camarade écrit $30 \\times 10^{12}$. Est-ce juste ?",
          correction:
            "a) Je place la virgule après le $1$ : $1{,}4$. Pour revenir au nombre, six rangs vers la droite : $1\\,400\\,000 = 1{,}4 \\times 10^{6}$ km.\nb) Le premier chiffre non nul est le $2$. Pour revenir à $0{,}000002$, la virgule recule de six rangs : $0{,}000002 = 2 \\times 10^{-6}$ m, deux millionièmes de mètre.\nc) Après le $3$, il y a treize zéros : le zéro de $30$, puis quatre paquets de trois. $30\\,000\\,000\\,000\\,000 = 3 \\times 10^{13}$ cellules.\nd) $30 \\times 10^{12}$ vaut bien le même nombre : le calcul est juste. Mais $30$ a deux chiffres avant la virgule : ce n'est pas une notation scientifique.\n⛔ Le piège : dans c), ne compter que les zéros des paquets de trois ($12$) et écrire $3 \\times 10^{12}$. J'oublierais le zéro de $30$ : le nombre serait dix fois trop petit.\nRéponse : a) $1{,}4 \\times 10^{6}$ km ; b) $2 \\times 10^{-6}$ m ; c) $3 \\times 10^{13}$ cellules ; d) juste en valeur, mais pas scientifique.",
          schema: tableau([
            ["Grandeur", "Soleil (km)", "E. coli (m)", "Cellules"],
            ["En clair", "1 400 000", "0,000002", "30 000 000 000 000"],
            ["Scientifique", "1,4 × 10⁶", "2 × 10⁻⁶", "3 × 10¹³"],
          ]),
          micros: ["puissance_notation_scientifique"],
        },
        {
          enonce:
            "Range dans l'ordre croissant :\n$7{,}5 \\times 10^{-3}$ ; $1{,}2 \\times 10^{-2}$ ; $9 \\times 10^{-4}$ ; $0{,}008$ ; $3{,}4 \\times 10^{-3}$.",
          correction:
            "J'écris d'abord $0{,}008$ en notation scientifique : $0{,}008 = 8 \\times 10^{-3}$.\nJe range par exposant. Le plus petit est $-4$, puis vient $-3$, puis $-2$.\nExposant $-4$ : $9 \\times 10^{-4}$ est le plus petit nombre.\nExposant $-3$ : trois nombres. Je compare $3{,}4$ ; $7{,}5$ et $8$.\nExposant $-2$ : $1{,}2 \\times 10^{-2}$ est le plus grand.\n⛔ Le piège : croire que $9 \\times 10^{-4}$ est le plus grand parce que $9$ est le plus grand nombre devant. Son exposant est le plus petit : $0{,}0009$, c'est moins d'un millième.\nRéponse : $9 \\times 10^{-4} < 3{,}4 \\times 10^{-3} < 7{,}5 \\times 10^{-3} < 0{,}008 < 1{,}2 \\times 10^{-2}$.",
          schema: tableau([
            ["Écriture", "9 × 10⁻⁴", "3,4 × 10⁻³", "7,5 × 10⁻³", "8 × 10⁻³", "1,2 × 10⁻²"],
            ["Exposant", "−4", "−3", "−3", "−3", "−2"],
            ["Décimal", "0,0009", "0,0034", "0,0075", "0,008", "0,012"],
          ]),
          micros: ["puissance_comparer"],
        },
        {
          enonce:
            "Calcule, puis donne le résultat en notation scientifique. Écris les puissances de $10$ en clair.\n$A = 5 \\times 10^{3} \\times 4 \\times 10^{2}$\n$B = \\dfrac{9 \\times 10^{5}}{3 \\times 10^{2}}$\n$C = 2{,}5 \\times 10^{-2} \\times 4$",
          correction:
            "Dans un produit, j'ai le droit de changer l'ordre des facteurs : je regroupe les nombres d'un côté, les puissances de $10$ de l'autre.\n$A = (5 \\times 4) \\times (10^{3} \\times 10^{2}) = 20 \\times (1\\,000 \\times 100) = 20 \\times 100\\,000 = 2\\,000\\,000$. Donc $A = 2 \\times 10^{6}$.\n$B = \\dfrac{9}{3} \\times \\dfrac{100\\,000}{100} = 3 \\times 1\\,000 = 3\\,000$. Donc $B = 3 \\times 10^{3}$.\n$C = (2{,}5 \\times 4) \\times 10^{-2} = 10 \\times 0{,}01 = 0{,}1$. Donc $C = 1 \\times 10^{-1}$.\n⛔ Le piège : s'arrêter à $20 \\times 10^{5}$ pour A. Le calcul est juste, mais $20$ a deux chiffres avant la virgule : il faut encore écrire $20 = 2 \\times 10$.\nRéponse : $A = 2 \\times 10^{6}$ ; $B = 3 \\times 10^{3}$ ; $C = 1 \\times 10^{-1}$.",
          schema: tableau([
            ["Calcul", "A", "B", "C"],
            ["Les nombres", "5 × 4 = 20", "9 ÷ 3 = 3", "2,5 × 4 = 10"],
            ["Les puissances de 10", "1 000 × 100 = 100 000", "100 000 ÷ 100 = 1 000", "0,01"],
            ["Résultat", "2 × 10⁶", "3 × 10³", "1 × 10⁻¹"],
          ]),
          micros: ["puissance_calcul", "puissance_notation_scientifique"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifie en écrivant les produits ou en calculant.\na) $2^3 \\times 2^2 = 2^5$\nb) $3^2 + 3^2 = 3^4$\nc) $10^{-2} < 10^{-3}$\nd) $5^2 \\times 2^2 = 10^2$",
          correction:
            "a) $2^3 \\times 2^2 = (2 \\times 2 \\times 2) \\times (2 \\times 2)$ : cinq facteurs $2$ en tout. VRAI, les deux valent $32$.\nb) $3^2 + 3^2 = 9 + 9 = 18$, alors que $3^4 = 81$. FAUX : une somme n'est pas un produit.\nc) $10^{-2} = 0{,}01$ et $10^{-3} = 0{,}001$ : c'est $0{,}01$ le plus grand. FAUX, c'est l'inverse.\nd) $5^2 \\times 2^2 = 25 \\times 4 = 100$ et $10^2 = 100$. VRAI : $(5 \\times 5) \\times (2 \\times 2) = (5 \\times 2) \\times (5 \\times 2)$.\n⛔ Le piège : répondre « vrai » au b) en additionnant les exposants. $3^2 + 3^2$, c'est deux fois $3^2$, soit $2 \\times 9 = 18$ : rien à voir avec $3^4$.\nRéponse : a) vrai ; b) faux ; c) faux ; d) vrai.",
          schema: tableau([
            ["Affirmation", "a)", "b)", "c)", "d)"],
            ["À gauche", "32", "18", "0,01", "100"],
            ["À droite", "32", "81", "0,001", "100"],
            ["Verdict", "VRAI", "FAUX", "FAUX", "VRAI"],
          ]),
          micros: ["puissance_calcul", "puissance_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation réelle, plusieurs questions qui s'enchaînent. Je calcule en clair, puis j'écris le résultat en notation scientifique.",
      rappel: [
        "Je traduis l'énoncé en calcul (total $=$ nombre $\\times$ quantité d'un seul, partage $=$ total $\\div$ part), j'écris les nombres en clair, puis je donne le résultat en notation scientifique.",
        "Pour diviser deux grands nombres, je retire le même nombre de zéros aux deux : $600\\,000 \\div 3\\,000 = 600 \\div 3$.",
        "Diviser par un nombre plus petit que $1$ fait GRANDIR le résultat. Diviser par $2$ à chaque étape, $n$ fois, c'est multiplier par $2^{-n}$.",
      ],
      exercices: [
        {
          titre: "Le parc éolien",
          enonce:
            "Une éolienne terrestre produit environ $5 \\times 10^{6}$ kWh d'électricité par an. Un parc en compte $40$.\na) Combien de kWh le parc produit-il par an ? Donne le résultat en clair, puis en notation scientifique.\nb) Un foyer consomme environ $5 \\times 10^{3}$ kWh par an. Combien de foyers le parc peut-il alimenter ?\nc) En 2023, la France a consommé environ $4{,}5 \\times 10^{11}$ kWh d'électricité. Combien de parcs comme celui-ci faudrait-il pour tout produire ?",
          correction:
            "a) Production du parc $=$ nombre d'éoliennes $\\times$ production d'une éolienne. $5 \\times 10^{6} = 5\\,000\\,000$, donc $40 \\times 5\\,000\\,000 = 200\\,000\\,000$ kWh. En notation scientifique : $2 \\times 10^{8}$ kWh.\nb) Nombre de foyers $=$ production $\\div$ consommation d'un foyer. $200\\,000\\,000 \\div 5\\,000 = 40\\,000$ foyers.\n⭐ Contrôle : $40\\,000 \\times 5\\,000 = 200\\,000\\,000$.\nc) $4{,}5 \\times 10^{11} = 450\\,000\\,000\\,000$. Je retire huit zéros aux deux nombres : $450\\,000\\,000\\,000 \\div 200\\,000\\,000 = 4\\,500 \\div 2 = 2\\,250$ parcs.\n⛔ Le piège : dans c), diviser les nombres devant, $4{,}5 \\div 2 = 2{,}25$, et oublier les puissances de $10$. L'exposant dit la taille : $10^{11}$ contre $10^{8}$, trois rangs d'écart, mille fois plus.\nRéponse : a) $2 \\times 10^{8}$ kWh ; b) $40\\,000$ foyers ; c) environ $2\\,250$ parcs.",
          schema: tableau([
            ["Qui ?", "Une éolienne", "Le parc", "Un foyer", "La France"],
            ["kWh par an", "5 × 10⁶", "2 × 10⁸", "5 × 10³", "4,5 × 10¹¹"],
            ["En clair", "5 000 000", "200 000 000", "5 000", "450 000 000 000"],
          ]),
          micros: ["puissance_notation_scientifique", "puissance_calcul", "puissance_defi"],
        },
        {
          titre: "La piscine en gouttes d'eau",
          enonce:
            "Un bassin olympique mesure $50$ m de long et $25$ m de large ; on prend $2$ m de profondeur.\na) Calcule son volume en m³. Sachant que $1$ m³ $= 10^{3}$ L et $1$ L $= 10^{3}$ mL, écris ce volume en litres, puis en millilitres, en notation scientifique.\nb) Il faut $20$ gouttes d'eau pour faire $1$ mL. Quel est le volume d'une goutte, en mL ? Écris-le en notation scientifique.\nc) Combien de gouttes faut-il pour remplir le bassin ?",
          correction:
            "a) Le bassin est un pavé : $50 \\times 25 \\times 2 = 2\\,500$ m³.\nEn litres : $2\\,500 \\times 1\\,000 = 2\\,500\\,000$ L, soit $2{,}5 \\times 10^{6}$ L.\nEn millilitres : $2\\,500\\,000 \\times 1\\,000 = 2\\,500\\,000\\,000$ mL, soit $2{,}5 \\times 10^{9}$ mL.\nb) Une goutte : $1 \\div 20 = 0{,}05$ mL, soit $5 \\times 10^{-2}$ mL.\nc) Nombre de gouttes $=$ volume $\\div$ volume d'une goutte. Diviser par $0{,}05$, c'est multiplier par $20$ : $2\\,500\\,000\\,000 \\times 20 = 50\\,000\\,000\\,000$, soit $5 \\times 10^{10}$ gouttes, cinquante milliards.\n⛔ Le piège : dans c), trouver MOINS de gouttes que de millilitres. Une goutte est plus petite qu'un millilitre : il faut vingt gouttes par millilitre, donc beaucoup plus de gouttes.\nRéponse : a) $2\\,500$ m³, soit $2{,}5 \\times 10^{6}$ L et $2{,}5 \\times 10^{9}$ mL ; b) $5 \\times 10^{-2}$ mL ; c) $5 \\times 10^{10}$ gouttes.",
          schema: tableau([
            ["Unité", "m³", "L", "mL", "gouttes"],
            ["Quantité", "2 500", "2,5 × 10⁶", "2,5 × 10⁹", "5 × 10¹⁰"],
            ["On multiplie par", "", "1 000", "1 000", "20"],
          ]),
          micros: ["puissance_dix", "puissance_exposant_negatif", "puissance_notation_scientifique", "puissance_defi"],
        },
        {
          titre: "Du plus léger au plus lourd",
          enonce:
            "Voici des masses d'animaux, en kilogrammes :\nbaleine bleue : $1{,}5 \\times 10^{5}$ ; abeille : $1 \\times 10^{-4}$ ; éléphant d'Afrique : $6 \\times 10^{3}$ ; colibri d'Elena : $2 \\times 10^{-3}$ ; être humain : $7 \\times 10^{1}$.\na) Range ces masses dans l'ordre croissant.\nb) Combien de fois la baleine est-elle plus lourde que l'éléphant ?\nc) Combien d'abeilles pèsent autant qu'un colibri ?\nd) Écris la masse de l'abeille en grammes.",
          correction:
            "a) Tous les exposants sont différents : je range par exposant, $-4 < -3 < 1 < 3 < 5$, sans regarder les nombres devant. Ordre : abeille, colibri, être humain, éléphant, baleine.\nb) En clair : $1{,}5 \\times 10^{5} = 150\\,000$ kg et $6 \\times 10^{3} = 6\\,000$ kg. Je retire trois zéros aux deux : $150\\,000 \\div 6\\,000 = 150 \\div 6 = 25$.\nc) $2 \\times 10^{-3} = 0{,}002$ kg et $1 \\times 10^{-4} = 0{,}0001$ kg. Je multiplie les deux par $10\\,000$ : $0{,}002 \\div 0{,}0001 = 20 \\div 1 = 20$.\nd) $1$ kg $= 10^{3}$ g : $0{,}0001 \\times 1\\,000 = 0{,}1$ g.\n⛔ Le piège : croire que l'abeille est plus lourde que le colibri parce que $4 > 3$. Avec des exposants négatifs, $-4$ est PLUS PETIT que $-3$ : $0{,}0001$ contre $0{,}002$.\nRéponse : a) abeille, colibri, être humain, éléphant, baleine ; b) $25$ fois ; c) $20$ abeilles ; d) $0{,}1$ g.",
          schema: tableau([
            ["Animal", "abeille", "colibri", "humain", "éléphant", "baleine"],
            ["Masse (kg)", "1 × 10⁻⁴", "2 × 10⁻³", "7 × 10¹", "6 × 10³", "1,5 × 10⁵"],
            ["En clair (kg)", "0,0001", "0,002", "70", "6 000", "150 000"],
          ]),
          micros: ["puissance_comparer", "puissance_calcul", "puissance_defi"],
        },
        {
          titre: "Le tableau de Roland-Garros",
          enonce:
            "Le tableau du simple messieurs de Roland-Garros compte $128$ joueurs. À chaque tour, les joueurs s'affrontent deux par deux et le perdant est éliminé.\na) Écris $128$ comme une puissance de $2$. Combien de tours faut-il pour désigner le vainqueur ?\nb) Combien de joueurs restent en quarts de finale, c'est-à-dire après $4$ tours ? Quelle fraction des $128$ joueurs est-ce ? Écris-la comme une puissance de $2$.\nc) Combien de matchs se jouent en tout ?\nd) Un tournoi de ping-pong réunit $1\\,024$ joueurs. Combien de tours faut-il ?",
          correction:
            "a) Je divise par $2$ jusqu'à $1$ : $128$, $64$, $32$, $16$, $8$, $4$, $2$, $1$. Sept divisions, donc sept facteurs $2$ : $128 = 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2 = 2^7$. Chaque tour divise le nombre de joueurs par $2$ : il faut $7$ tours.\nb) Après $4$ tours : $128 \\div 2 \\div 2 \\div 2 \\div 2 = 8$ joueurs. La fraction est $\\dfrac{8}{128} = \\dfrac{1}{16} = \\dfrac{1}{2^4} = 2^{-4}$.\nc) Chaque match élimine un joueur, et il faut en éliminer $127$ pour garder le vainqueur : $64 + 32 + 16 + 8 + 4 + 2 + 1 = 127$ matchs.\nd) Je double à partir de $1$ : $1\\,024 = 2^{10}$, donc $10$ tours. Huit fois plus de joueurs, et seulement trois tours de plus.\n⛔ Le piège : croire qu'il faut $64$ tours, ou $128$. Le nombre de tours est l'EXPOSANT, le nombre de divisions par $2$ : pas un nombre de joueurs.\nRéponse : a) $128 = 2^7$, soit $7$ tours ; b) $8$ joueurs, soit $2^{-4}$ du tableau ; c) $127$ matchs ; d) $10$ tours.",
          schema: (
            <div className="space-y-3">
              {tableau([
                ["Tour", "1", "2", "3", "4", "5", "6", "7"],
                ["Joueurs", "128", "64", "32", "16", "8", "4", "2"],
                ["Matchs", "64", "32", "16", "8", "4", "2", "1"],
              ])}
              {diagramme("barres", [
                { label: "1", value: 128 },
                { label: "2", value: 64 },
                { label: "3", value: 32 },
                { label: "4", value: 16 },
                { label: "5", value: 8 },
                { label: "6", value: 4 },
                { label: "7", value: 2 },
              ], 4)}
            </div>
          ),
          micros: ["puissance_comprendre", "puissance_calculer", "puissance_exposant_negatif", "puissance_defi"],
        },
      ],
    },
  ],
};
