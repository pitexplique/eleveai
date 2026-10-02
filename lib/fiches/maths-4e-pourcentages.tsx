// ─── Fiche de cours : les pourcentages (4e) ────────────────────────────────────
//
// ÉCRITE le 02/10/2026, quand Frédéric a coupé la notion du coach « Ratios et
// pourcentages » (`prop_ratio_pourcentage`) en deux : `prop_ratio` et
// `prop_pourcentages`. Cette fiche est la moitié POURCENTAGES. Le ratio a sa
// propre fiche : il n'apparaît pas ici.
//
// Au standard de la fiche étalon `maths-4e-proportionnalite.tsx` (30/09) : une
// idée par phrase, un dessin par bloc (canvas du coach), `micros` sur chaque
// bloc, le mode classe ENGENDRÉ par `slidesDepuisFiche`.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/4e/maths/proportionnalite.bank.ts`,
// notionId prop_pourcentages :
//   prop_pourcentage          → p % de N, le taux (partie ÷ total × 100), le total
//   prop_pourcentage_mental   → 10 %, 20 %, 30 %, 5 %, 100 %, 200 %, TOUT part de 10 %
//   prop_coeff_multiplicateur → hausse × (1 + p ÷ 100), baisse × (1 − p ÷ 100), et
//                               le sens inverse (× 1,08 → + 8 %)
//   prop_evolution            → nouvelle valeur ; taux = variation ÷ départ × 100
//   prop_pourcentage_defi     → deux évolutions de suite (+ 20 % puis − 20 %)
//
// ⭐ LE BLOC CALCUL MENTAL est voulu par Frédéric, et il suit sa vidéo
// (`manim/scripts/bases/pourcentages_calcul_mental.py`) : « 10 % de 80 : on
// enlève un zéro, 8 € ; pas de zéro ? on décale la virgule : 10 % de 45 =
// 4,50 € ». Le dessin est le sien aussi : une barre de dix cases, une case = 10 %.
// Le 45 € revient dans l'exemple des soldes, pour le contrôle de tête.
//
// ⭐ LE PIÈGE + 20 % PUIS − 20 % reprend son short « la tablette »
// (`It1VgxU9n78`) : 100 → 120 → 96.
//
// ⛔ Aucun exemple de l'ancienne feuille commune n'est repris (eau du corps,
// céréales, vélo électrique, océans, LED, bouquetins, cerises, braquet, WWF,
// CO₂, coopérative solaire), ni les nombres de l'ancienne fiche commune
// (25 % de 80, 100 € + 15 %).
//
// ⭐ LES DESSINS :
//   · la barre 100 % (batterie, tirs, soldes)  → `schema_barre`, à l'échelle ;
//   · la barre de dix cases du calcul mental   → `schema_barre`, dix parts de 8 ;
//   · le pourcentage retrouvé                  → `tableau_proportionnalite` ;
//   · + 20 % puis − 20 %                       → `stat_graph` en barres : 96 < 100 se voit.
// ⛔ La grille de cent carreaux (`fraction`, model grid) n'est PAS employée : ses
// cases font 34 unités fixes, donc 340 de large, et à la largeur d'un bloc son
// « 96/100 » tombe à 10 px.
// Dans `methode` et `exemples`, seuls des canvas HTML (tableau_donnees,
// tableau_proportionnalite) et les formules de `schemas.tsx`.
//
// FAIT RÉEL (historique) : le mot vient de l'italien « per cento » ; le signe %
// est né d'une abréviation de « per cento » dans des manuscrits marchands
// italiens du XVe siècle. Source : Florian Cajori, « A History of Mathematical
// Notations », vol. 1 (1928), § 308.

import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";
import { egalites } from "@/lib/fiches/schemas";
import { slidesDepuisFiche } from "@/lib/fiches/slidesDepuisFiche";

const BLEU_CLAIR = "#dbeafe";
const BLEU_FONCE = "#93c5fd";
const GRIS = "#f1f5f9";
const ROUGE_CLAIR = "#fecaca";
const VERT_CLAIR = "#dcfce7";

/** Un dessin et sa phrase, sous lui. Les libellés DANS le dessin restent en écriture simple. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

/** La barre du coach : les parts à l'échelle de leur valeur, le total au-dessus. */
const barre = (parts: { label: string; value: string; color?: string }[], total: string, phrase: string, etiquettes = true) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 228, height: 200 },
      total,
      parts,
      questionLabel: phrase,
      display: { showTotal: true, showPartLabels: etiquettes, showValues: true, showQuestion: true },
    }}
  />
);

/** Le tableau de proportionnalité du coach : deux lignes, les cases vides marquées. */
const tableauProp = (valeurs: string[][], manquantes: { row: number; col: number }[], colonnes: string[], lignes: string[]) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      size: { width: 228, height: 150 },
      rows: valeurs.length,
      cols: valeurs[0].length,
      rowLabels: lignes,
      colLabels: colonnes,
      values: valeurs,
      missing: manquantes,
      display: { showRowLabels: true, showColLabels: true, showMissing: true, showGrid: true },
    }}
  />
);

/** Un petit tableau de données, deux colonnes (HTML : il tient dans tous les blocs). */
const donnees = (headers: string[], lignes: string[][], surligne?: number) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers,
      rows: lignes.map((values) => ({ values })),
      ...(surligne !== undefined ? { highlight: { row: surligne } } : {}),
      display: { compact: true, striped: true },
    }}
  />
);

// ⭐ LA BARRE DE DIX CASES, celle de la vidéo de Frédéric : 80 € coupés en dix
// cases de 8 €. Une case, c'est 10 %. La première est plus foncée.
// ⚠️ EN HTML, PAS en `schema_barre` (mesuré le 02/10 à 375 px) : le canvas du
// coach donne une largeur minimale à chaque part, et la dixième case sortait
// du dessin, coupée. Ici les dix cases se partagent la largeur du bloc.
const dixCases = (
  <div className="mx-auto w-full max-w-xs">
    <p className="text-center text-sm font-black text-slate-700">80 €</p>
    <div className="mt-1 flex overflow-hidden rounded-lg border-2 border-slate-700">
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className={`flex-1 py-2 text-center text-sm font-black text-slate-800 ${i === 0 ? "" : "border-l-2 border-slate-700"}`}
          style={{ background: i === 0 ? BLEU_FONCE : BLEU_CLAIR }}
        >
          8
        </div>
      ))}
    </div>
    <p className="mt-1 text-center text-xs font-black text-slate-600">une case = 10 % = 8 €</p>
  </div>
);

const pieges = [
  "Croire que 5 %, c'est diviser par 5. 5 %, c'est la moitié de 10 % : 5 % de 80, c'est 4, pas 16.",
  "Multiplier par 0,3 pour une hausse de 30 %. On trouve seulement la hausse. Le coefficient part de 1 : c'est 1,3.",
  "Croire que − 20 % efface + 20 %. La baisse se calcule sur le nouveau prix, plus grand. On ne revient pas au départ.",
  "Diviser par la valeur d'arrivée pour trouver le taux d'une évolution. On divise toujours par la valeur de départ.",
];

const aRetenir = [
  "p % d'un nombre : je multiplie par p, puis je divise par 100.",
  "De tête, tout part de 10 % : je divise par 10. 20 %, c'est le double. 30 %, le triple. 5 %, la moitié.",
  "100 %, c'est le tout. 200 %, c'est le double du tout.",
  "Hausse de p % : je multiplie par 1 + p ÷ 100. Baisse de p % : je multiplie par 1 − p ÷ 100.",
  "+ 20 % puis − 20 %, c'est × 1,2 puis × 0,8, donc × 0,96 : on perd 4 %.",
];

export const fichePourcentages4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ L'identifiant de notion, tirets à la place des soulignés : c'est la clé du registre.
  notion: "prop-pourcentages",
  titre: "Les pourcentages",
  accroche:
    "Un pourcentage, c'est « tant sur cent ». En 4e, on le calcule de tête à partir de 10 %. On augmente ou on baisse un prix en une seule multiplication. Et on évite le piège : + 20 % puis − 20 % ne ramène pas au départ.",
  identite: [
    { label: "Le secret", valeur: "Tout part de 10 % : diviser par 10" },
    { label: "L'outil de 4e", valeur: "Le coefficient multiplicateur" },
    { label: "Le piège", valeur: "+ 20 % puis − 20 % ne ramène pas au départ" },
  ],
  definition: {
    texte:
      "Un pourcentage, c'est « tant sur cent ».\n\n30 %, c'est 30 parts sur 100.\n\nPrendre p % d'un nombre, c'est le multiplier par p, puis diviser par 100.",
  },
  figure: {
    schema: barre(
      [
        { label: "chargé", value: "30 %", color: VERT_CLAIR },
        { label: "vide", value: "70 %", color: GRIS },
      ],
      "100 %",
      "la batterie : 30 sur 100",
    ),
    legende: "La barre entière, c'est 100 %.",
  },
  proprietes: [
    {
      titre: "p % d'un nombre",
      micros: ["prop_pourcentage"],
      texte:
        "Je multiplie le nombre par p, puis je divise par 100. Une joueuse de basket tente 30 tirs et en réussit 40 %. Elle en réussit 30 × 40 ÷ 100 = 12.",
      schema: barre(
        [
          { label: "40 % réussis", value: "12", color: VERT_CLAIR },
          { label: "60 % ratés", value: "18", color: GRIS },
        ],
        "30 tirs",
        "40 % de 30 = 12",
      ),
    },
    {
      titre: "Tout part de 10 %",
      micros: ["prop_pourcentage_mental"],
      texte:
        "10 %, c'est diviser par 10. Un zéro à la fin ? Je l'enlève : 10 % de 80 €, c'est 8 €. Pas de zéro ? Je décale la virgule : 10 % de 45 €, c'est 4,50 €.",
      schema: dixCases,
    },
    {
      titre: "Les autres, à partir de 10 %",
      micros: ["prop_pourcentage_mental"],
      texte:
        "20 %, c'est le double de 10 %. 30 %, c'est le triple. 5 %, c'est la moitié. 100 %, c'est le tout. 200 %, c'est le double du tout.",
      schema: legende(
        donnees(
          ["de 80 €", "de tête"],
          [
            ["10 %", "80 ÷ 10 = 8 €"],
            ["20 %", "2 × 8 = 16 €"],
            ["30 %", "3 × 8 = 24 €"],
            ["5 %", "8 ÷ 2 = 4 €"],
            ["100 %", "80 €"],
            ["200 %", "2 × 80 = 160 €"],
          ],
          0,
        ),
        "on trouve 10 % d'abord, le reste suit",
      ),
    },
    {
      titre: "Retrouver le pourcentage",
      micros: ["prop_pourcentage"],
      texte:
        "Je divise la partie par le total, puis je multiplie par 100. Une forêt compte 400 arbres, dont 60 chênes. 60 ÷ 400 × 100 = 15 : les chênes font 15 % de la forêt.",
      schema: legende(
        tableauProp(
          [
            ["60", "400"],
            ["?", "100"],
          ],
          [{ row: 1, col: 0 }],
          ["chênes", "forêt"],
          ["arbres", "%"],
        ),
        "c'est un tableau de proportionnalité : ? = 60 × 100 ÷ 400 = 15",
      ),
    },
    {
      titre: "Le coefficient multiplicateur",
      micros: ["prop_coeff_multiplicateur", "prop_evolution"],
      texte:
        "Augmenter de p %, c'est multiplier par 1 + p ÷ 100. Diminuer de p %, c'est multiplier par 1 − p ÷ 100. Un jean à 50 € est soldé à − 30 %. Il reste 70 % du prix : 50 × 0,7 = 35 €.",
      schema: barre(
        [
          { label: "je paie 70 %", value: "35", color: BLEU_CLAIR },
          { label: "− 30 %", value: "15", color: ROUGE_CLAIR },
        ],
        "50 €",
        "d'un coup : 50 × 0,7 = 35 €",
      ),
    },
    {
      titre: "+ 20 % puis − 20 %",
      micros: ["prop_evolution", "prop_pourcentage_defi"],
      texte:
        "On ne revient pas au départ. 100 € augmentent de 20 % : 100 × 1,2 = 120 €. Puis la baisse se calcule sur 120 €, pas sur 100 € : 120 × 0,8 = 96 €.",
      schema: legende(
        <CanvasRenderer
          figure={{
            kind: "stat_graph",
            graphType: "barres",
            data: [
              { label: "départ", value: 100, color: GRIS },
              { label: "+ 20 %", value: 120, color: VERT_CLAIR },
              { label: "− 20 %", value: 96, color: ROUGE_CLAIR },
            ],
            display: { showValues: true, showLabels: true, highlightIndex: 2 },
            size: { width: 222, height: 180 },
          }}
        />,
        "on finit à 96 €, pas à 100 €",
      ),
    },
  ],
  reel: {
    texte:
      "La batterie de ton téléphone. Les soldes à − 30 %. Le taux de réussite d'une joueuse au basket. La part de forêt dans un pays. Le prix d'un ticket qui augmente. Dès qu'on compare à 100, c'est un pourcentage.",
  },
  historique: {
    texte:
      "Le mot vient de l'italien « per cento », qui veut dire « pour cent ». Au XVe siècle, les marchands italiens comptaient déjà leurs intérêts sur cent. Le signe % est né de leur abréviation de « per cento », écrite de plus en plus vite.",
  },
  formule: {
    contexte: "Pour faire évoluer une valeur de p %",
    expression: "hausse : × (1 + p ÷ 100)   ·   baisse : × (1 − p ÷ 100)",
    legende: "Le 1, c'est la valeur qu'on garde. On ajoute ou on retire le pourcentage.",
  },
  methode: [
    {
      titre: "Je calcule p % d'un nombre",
      micros: ["prop_pourcentage", "prop_pourcentage_mental"],
      texte:
        "Un pourcentage facile (10 %, 20 %, 30 %, 5 %) : je pars de 10 %. Sinon, je multiplie par p, puis je divise par 100.",
      schema: egalites(["10\\,\\% \\text{ de } 60 = 6", "35\\,\\% \\text{ de } 60 = 60 \\times 35 \\div 100 = 21"]),
    },
    {
      titre: "Je trouve le coefficient",
      micros: ["prop_coeff_multiplicateur"],
      texte: "Je pars de 1 : c'est le tout. Pour une hausse, j'ajoute le pourcentage. Pour une baisse, je le retire.",
      schema: donnees(
        ["évolution", "coefficient"],
        [
          ["+ 10 %", "× 1,1"],
          ["+ 25 %", "× 1,25"],
          ["− 10 %", "× 0,9"],
          ["− 40 %", "× 0,6"],
        ],
      ),
    },
    {
      titre: "Je lis une évolution",
      micros: ["prop_evolution", "prop_coeff_multiplicateur"],
      texte:
        "Le taux : je divise la variation par la valeur de départ, puis je multiplie par 100. Un coefficient se lit aussi : × 1,08, c'est + 8 %. × 0,75, c'est − 25 %.",
      schema: egalites(["\\times 1{,}08 \\;\\to\\; +8\\,\\%", "\\times 0{,}75 \\;\\to\\; -25\\,\\%"]),
    },
  ],
  usages: [
    {
      titre: "On cherche une partie",
      micros: ["prop_pourcentage", "prop_pourcentage_mental"],
      detail: "10 %, 20 %, 30 %, 5 %, 100 %, 200 % : de tête, à partir de 10 %. Les autres : × p ÷ 100.",
    },
    {
      titre: "On cherche le total",
      micros: ["prop_pourcentage", "prop_pourcentage_mental"],
      detail: "Je connais 10 % ? Je multiplie par 10 pour avoir 100 %. Je connais 5 % ? Je multiplie par 20.",
    },
    {
      titre: "Un prix change deux fois",
      micros: ["prop_evolution", "prop_pourcentage_defi"],
      detail: "J'applique la première évolution. Puis j'applique la seconde au nouveau prix. On peut aussi multiplier les deux coefficients.",
    },
  ],
  exemples: [
    {
      titre: "De tête, à partir de 10 %",
      micros: ["prop_pourcentage_mental"],
      donnees: "Un club de handball compte 140 licenciés. 30 % ont moins de 12 ans.",
      question: "Combien ont moins de 12 ans ? Calcule-le de tête.",
      schema: donnees(
        ["de 140", "de tête"],
        [
          ["10 %", "140 ÷ 10 = 14"],
          ["30 %", "3 × 14 = 42"],
        ],
        1,
      ),
      solution: "10 % de 140 : j'enlève un zéro, c'est 14.\n\n30 %, c'est le triple : 3 × 14 = 42. Donc 42 licenciés ont moins de 12 ans.",
    },
    {
      titre: "Retrouver le total",
      micros: ["prop_pourcentage", "prop_pourcentage_mental"],
      donnees: "Dans une classe, 9 élèves jouent au foot en club. Cela fait 30 % de la classe.",
      question: "Combien y a-t-il d'élèves dans la classe ?",
      schema: tableauProp(
        [
          ["30", "10", "100"],
          ["9", "?", "?"],
        ],
        [
          { row: 1, col: 1 },
          { row: 1, col: 2 },
        ],
        ["", "", ""],
        ["%", "élèves"],
      ),
      solution:
        "30 %, c'est 9 élèves. 10 %, c'est trois fois moins : 9 ÷ 3 = 3 élèves.\n\n100 %, c'est dix fois plus que 10 % : 10 × 3 = 30 élèves.\n\nContrôle : 30 % de 30, c'est 3 × 3 = 9.",
    },
    {
      titre: "Les soldes",
      micros: ["prop_coeff_multiplicateur", "prop_evolution"],
      donnees: "Un sweat coûte 45 €. Il est soldé à − 20 %.",
      question: "Quel est son prix soldé ?",
      schema: egalites(["1 - 0{,}20 = 0{,}8", "45 \\times 0{,}8 = 36"]),
      solution:
        "Une baisse de 20 % : il reste 80 % du prix. Le coefficient est 0,8. 45 × 0,8 = 36 €.\n\nContrôle de tête : 10 % de 45 €, c'est 4,50 €. 20 %, c'est 9 €. Et 45 − 9 = 36 €.",
    },
    {
      titre: "Le taux d'une évolution",
      micros: ["prop_evolution"],
      donnees: "Un potager a donné 40 kg de tomates une année, puis 46 kg l'année suivante.",
      question: "De quel pourcentage la récolte a-t-elle augmenté ?",
      schema: egalites(["46 - 40 = 6", "6 \\div 40 \\times 100 = 15"]),
      solution:
        "La récolte a gagné 46 − 40 = 6 kg. Je divise par la récolte de départ : 6 ÷ 40 × 100 = 15.\n\nLa récolte a augmenté de 15 %. Contrôle : 40 × 1,15 = 46.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule de tête 10 %, 20 % et 5 % de 70.",
      correction: "10 % de 70 : j'enlève le zéro, 7. 20 %, c'est le double : 14. 5 %, c'est la moitié de 10 % : 3,5.",
      micros: ["prop_pourcentage_mental"],
    },
    {
      question: "Un arbre mesurait 3 m il y a dix ans. Aujourd'hui, il mesure 200 % de cette hauteur. Combien mesure-t-il ?",
      correction: "200 %, c'est le double du tout : 2 × 3 = 6. L'arbre mesure 6 m.",
      micros: ["prop_pourcentage_mental"],
    },
    {
      question: "À un quiz de 50 questions, Léo répond juste à 38. Quel pourcentage de bonnes réponses a-t-il ?",
      correction: "Je divise la partie par le total, puis je multiplie par 100 : 38 ÷ 50 × 100 = 76. Léo a 76 % de bonnes réponses.",
      micros: ["prop_pourcentage"],
    },
    {
      question: "Par quel nombre multiplie-t-on une valeur qui augmente de 8 % ? Et une valeur qui baisse de 35 % ?",
      correction: "Hausse de 8 % : 1 + 0,08 = 1,08. Baisse de 35 % : 1 − 0,35 = 0,65.",
      micros: ["prop_coeff_multiplicateur"],
    },
    {
      question: "Un ticket de bus passe de 1,60 € à 2 €. De quel pourcentage son prix a-t-il augmenté ?",
      correction: "La hausse : 2 − 1,60 = 0,40 €. Je divise par le prix de départ : 0,40 ÷ 1,60 × 100 = 25. Le prix a augmenté de 25 %.",
      micros: ["prop_evolution"],
    },
    {
      question: "Un jeu vidéo à 40 € baisse de 50 %, puis augmente de 50 %. Revient-il à 40 € ?",
      correction:
        "Non. Après la baisse : 40 × 0,5 = 20 €. La hausse se calcule sur 20 € : 20 × 1,5 = 30 €. Le jeu coûte 30 €. En tout, on a multiplié par 0,5 × 1,5 = 0,75.",
      micros: ["prop_pourcentage_defi", "prop_evolution"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

/** Le mode classe : ENGENDRÉ par la fiche, jamais recopié. */
export const slidesPourcentages4e = slidesDepuisFiche(fichePourcentages4e);
