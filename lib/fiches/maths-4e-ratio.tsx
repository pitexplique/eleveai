// ─── Fiche de cours : les ratios (4e) ──────────────────────────────────────────
//
// ÉCRITE le 02/10/2026, quand la notion commune « Ratios et pourcentages »
// (`prop_ratio_pourcentage`) a été coupée en deux (commit 1dcc4d33). Cette fiche
// porte la moitié RATIO ; les pourcentages ont leur propre fiche. ⛔ Aucun
// pourcentage ici.
//
// Au standard de la fiche étalon de 4e (lib/fiches/maths-4e-proportionnalite.tsx) :
// une idée par phrase, un dessin par bloc, `micros` sur chaque bloc, le mode
// classe ENGENDRÉ par `slidesDepuisFiche`.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/4e/maths/ratios.bank.ts`,
// notionId prop_ratio : prop_rapport, prop_ratio_quotients, prop_ratio_trois,
// prop_ratio_partager, prop_ratio_defi. Le BO du cycle 4 (p. 134) : « a et b
// sont dans le ratio 2 : 3 si a/2 = b/3 » ; « a, b, c dans le ratio 2 : 3 : 7
// si a/2 = b/3 = c/7 » ; partager une quantité en deux ou trois parts selon un
// ratio donné.
//
// ⛔ Aucun exemple de l'ancienne feuille commune n'est repris (basket 18/24,
// x : y = 5 : 2, médailles 2 : 3 : 4, Inès et Noé 45 €, vinaigrette 3 : 1,
// randonneurs 24 kg, fruitiers et chênes, possession du ballon, braquet,
// panneaux solaires). Ni les nombres de l'ancienne fiche (sirop 8 : 12,
// 120 € selon 2 : 3 : 7, 90 €, mortier 1 : 4).
//
// LE FIL ROUGE : un mélange de peinture. 2 pots de bleu pour 3 pots de jaune
// donnent un vert ; on y ajoute du blanc pour le ratio à trois termes.
//
// ⭐ LES DESSINS, choisis pour ce qu'ils montrent :
//   · des parts toutes égales, « tant contre tant » → `barreDesParts` (HTML,
//     ci-dessous) : une case par part. Le `schema_barre` du coach dessine des
//     parts PROPORTIONNELLES mais ne découpe pas les cases unité, or c'est
//     précisément l'idée du ratio. Et en HTML il tient dans `methode` et
//     `exemples`, où un SVG tombe sous 11 px (largeur des blocs) ;
//   · la part connue et la case vide        → `tableau_proportionnalite` ;
//   · une part DU TOUT (2 sur 5, pas 2 sur 3) → `fraction`, modèle barre ;
//   · le partage, chacun et sa somme         → `tableau_donnees`.
//
// Fait historique (sûr) : Euclide, Éléments, livre V, vers 300 av. J.-C., est
// consacré aux rapports entre grandeurs ; « ratio » est un mot latin qui veut
// dire « calcul, compte ». ⚠️ L'ancienne fiche attribuait la notation « : » à
// Leibniz : ce n'est pas sûr (Leibniz a introduit « : » pour la DIVISION), donc
// ce n'est pas repris.

import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";
import { slidesDepuisFiche } from "@/lib/fiches/slidesDepuisFiche";

/** Un dessin et sa phrase, sous lui. Les libellés DANS le dessin restent en écriture simple. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// Les couleurs du mélange : un fond clair (le chiffre reste lisible dessus) et
// un bord franc. Imprimé en noir et blanc, le NOM écrit sous chaque groupe suffit.
const BLEU = { fond: "#bfdbfe", bord: "#2563eb" };
const JAUNE = { fond: "#fde68a", bord: "#d97706" };
const BLANC = { fond: "#ffffff", bord: "#64748b" };
const VERT = { fond: "#bbf7d0", bord: "#16a34a" };
const ROSE = { fond: "#fbcfe8", bord: "#db2777" };
type Teinte = typeof BLEU;

type Groupe = {
  /** Le nombre de parts du groupe : autant de cases. */
  n: number;
  teinte: Teinte;
  /** Écrit sous le groupe. */
  nom: string;
  /** Écrit dans CHAQUE case (la valeur d'une part), si elle est courte. */
  dansCase?: string;
  /** Les `marque` dernières cases sont cerclées de rouge (l'écart). */
  marque?: number;
};
type Ligne = { etiquette?: string; groupes: Groupe[] };

/**
 * ⭐ LA BARRE DES PARTS : une case par part, toutes de même taille.
 * `aligne` : toutes les lignes ont la même largeur de case (pour comparer deux
 * quantités et voir l'ÉCART) ; sinon chaque ligne prend toute la largeur (pour
 * voir que 6 : 9 et 2 : 3 partagent la barre au même endroit).
 * ⛔ Aucun `min-w` : les cases rétrécissent avec le bloc.
 */
const barreDesParts = (lignes: Ligne[], aligne = false) => {
  const max = Math.max(...lignes.map((l) => l.groupes.reduce((s, g) => s + g.n, 0)));
  return (
    <div className="mx-auto grid w-full max-w-[360px] gap-3 rounded-xl border border-slate-200 bg-white p-3">
      {lignes.map((ligne, i) => {
        const total = ligne.groupes.reduce((s, g) => s + g.n, 0);
        const colonnes = aligne ? max : total;
        return (
          <div key={i} className="flex items-start gap-2">
            {ligne.etiquette ? (
              <span className="w-12 shrink-0 pt-1.5 text-right text-xs font-black text-slate-700">{ligne.etiquette}</span>
            ) : null}
            <div
              className="grid flex-1 gap-y-1"
              style={{ gridTemplateColumns: `repeat(${colonnes}, minmax(0, 1fr))` }}
            >
              {ligne.groupes.flatMap((g, gi) =>
                Array.from({ length: g.n }, (_, k) => (
                  <div
                    key={`c-${gi}-${k}`}
                    className="flex h-8 items-center justify-center text-xs font-black text-slate-900"
                    style={{
                      background: g.teinte.fond,
                      border: `2px solid ${g.marque && k >= g.n - g.marque ? "#dc2626" : g.teinte.bord}`,
                      borderStyle: g.marque && k >= g.n - g.marque ? "dashed" : "solid",
                    }}
                  >
                    {g.dansCase ?? ""}
                  </div>
                )),
              )}
              {ligne.groupes.map((g, gi) => (
                <span
                  key={`n-${gi}`}
                  className="text-center text-xs font-bold leading-tight text-slate-700"
                  style={{ gridColumn: `span ${g.n}` }}
                >
                  {g.nom}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** Le tableau de proportionnalité du coach : la ligne des parts, la ligne des quantités. */
const tableauParts = (valeurs: string[][], manquantes: { row: number; col: number }[], lignes: string[]) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      size: { width: 228, height: 150 },
      rows: valeurs.length,
      cols: valeurs[0].length,
      rowLabels: lignes,
      colLabels: valeurs[0].map(() => ""),
      values: valeurs,
      missing: manquantes,
      display: { showRowLabels: true, showColLabels: false, showMissing: true, showGrid: true },
    }}
  />
);

/** Un petit tableau de données (HTML : il tient dans tous les blocs). */
const donnees = (headers: string[], lignes: string[][]) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers,
      rows: lignes.map((values) => ({ values })),
      display: { compact: true, striped: true },
    }}
  />
);

// Le fil rouge : bleu : jaune = 2 : 3.
const vert23 = barreDesParts([
  {
    groupes: [
      { n: 2, teinte: BLEU, nom: "2 parts de bleu" },
      { n: 3, teinte: JAUNE, nom: "3 parts de jaune" },
    ],
  },
]);

const pieges = [
  "Lire 2 : 3 comme « 2 sur 3 ». C'est 2 parts CONTRE 3 parts. Le bleu fait donc 2 parts sur 5.",
  "Simplifier en soustrayant. 6 : 9 devient 2 : 3 en divisant par 3. Retirer 4 aux deux nombres donne 2 : 5, et c'est faux.",
  "Inverser l'ordre. Si bleu : jaune = 2 : 3, alors jaune : bleu = 3 : 2.",
  "Partager en divisant par le nombre de personnes. Avec le ratio 1 : 2 : 4, je divise par 7 parts, pas par 3 personnes.",
  "Prendre l'écart pour une des quantités. L'écart, c'est aussi un nombre de parts.",
];

const aRetenir = [
  "Un ratio compare des parts toutes égales : 2 : 3, c'est 2 parts contre 3 parts.",
  "a et b sont dans le ratio 2 : 3 quand $\\dfrac{a}{2} = \\dfrac{b}{3}$. Ce nombre commun est la valeur d'une part.",
  "Un ratio se simplifie comme une fraction : je divise les deux nombres par le même nombre.",
  "Partager selon un ratio : le total des parts, puis une part, puis la part de chacun.",
];

export const ficheRatio4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ L'identifiant de notion, avec des tirets : `registre.ts` construit la clé
  // par `notionId.replace(/_/g, "-")`.
  notion: "prop-ratio",
  titre: "Les ratios",
  accroche:
    "Un ratio dit « tant contre tant ». 2 pots de bleu pour 3 pots de jaune, c'est le ratio 2 : 3. En 4e, on s'en sert pour calculer et pour partager.",
  identite: [
    { label: "Le secret", valeur: "Des parts toutes égales" },
    { label: "La règle du partage", valeur: "Je divise d'abord par le total des parts" },
    { label: "Le piège", valeur: "L'ordre compte : 2 : 3 n'est pas 3 : 2" },
  ],
  definition: {
    texte:
      "Un ratio compare des quantités avec des parts toutes égales.\n\nLe ratio bleu : jaune = 2 : 3 veut dire : 2 parts de bleu pour 3 parts de jaune.\n\nDeux nombres a et b sont dans le ratio 2 : 3 quand $\\dfrac{a}{2} = \\dfrac{b}{3}$.",
  },
  figure: {
    schema: vert23,
    legende: "Bleu : jaune = 2 : 3. Toutes les cases ont la même taille.",
  },
  proprietes: [
    {
      titre: "Simplifier un ratio",
      micros: ["prop_rapport"],
      texte:
        "Je divise les deux nombres par le même nombre, comme une fraction. 6 pots de bleu pour 9 pots de jaune : je divise par 3. J'obtiens 2 : 3. C'est le même vert.",
      schema: legende(
        barreDesParts([
          {
            etiquette: "6 : 9",
            groupes: [
              { n: 6, teinte: BLEU, nom: "bleu" },
              { n: 9, teinte: JAUNE, nom: "jaune" },
            ],
          },
          {
            etiquette: "2 : 3",
            groupes: [
              { n: 2, teinte: BLEU, nom: "bleu" },
              { n: 3, teinte: JAUNE, nom: "jaune" },
            ],
          },
        ]),
        "la frontière bleu-jaune tombe au même endroit",
      ),
    },
    {
      titre: "Le ratio devient un calcul",
      micros: ["prop_ratio_quotients", "prop_rapport"],
      texte:
        "a et b sont dans le ratio 2 : 3 quand $\\dfrac{a}{2} = \\dfrac{b}{3}$. Chaque nombre est divisé par SA part. Le résultat commun, c'est la valeur d'une part. Avec 8 L de bleu : une part vaut 8 ÷ 2 = 4 L. Il faut donc 3 × 4 = 12 L de jaune.",
      schema: legende(
        tableauParts(
          [
            ["2", "3"],
            ["8", "?"],
          ],
          [{ row: 1, col: 1 }],
          ["parts", "litres"],
        ),
        "8 ÷ 2 = 4 L la part, donc ? = 3 × 4 = 12 L",
      ),
    },
    {
      titre: "Un ratio à trois termes",
      micros: ["prop_ratio_trois"],
      texte:
        "Pour un vert pâle, j'ajoute du blanc : bleu : jaune : blanc = 2 : 3 : 7. Cela veut dire $\\dfrac{a}{2} = \\dfrac{b}{3} = \\dfrac{c}{7}$. Un seul nombre connu suffit pour trouver les deux autres.",
      schema: legende(
        barreDesParts([
          {
            groupes: [
              { n: 2, teinte: BLEU, nom: "bleu" },
              { n: 3, teinte: JAUNE, nom: "jaune" },
              { n: 7, teinte: BLANC, nom: "blanc" },
            ],
          },
        ]),
        "2 + 3 + 7 = 12 parts en tout",
      ),
    },
    {
      titre: "Une part du tout",
      micros: ["prop_ratio_quotients", "prop_ratio_defi"],
      texte:
        "Dans le ratio 2 : 3, il y a 2 + 3 = 5 parts en tout. Le bleu représente donc $\\dfrac{2}{5}$ du mélange. Ce n'est pas $\\dfrac{2}{3}$ : 3, c'est le jaune, pas le total.",
      schema: legende(
        <CanvasRenderer
          figure={{
            kind: "fraction",
            model: "bar",
            fraction: { numerator: 2, denominator: 5, label: "bleu : 2 parts sur 5", color: BLEU.bord },
            size: { width: 260, height: 150 },
          }}
        />,
        "le bleu, rapporté au mélange entier",
      ),
    },
  ],
  reel: {
    texte:
      "Une recette : 1 verre de riz pour 2 verres d'eau. Un béton : du ciment, du sable et du gravier. Une peinture mélangée au magasin de bricolage. Un gain partagé selon ce que chacun a mis. Dès qu'on dit « tant pour tant », c'est un ratio.",
  },
  historique: {
    texte:
      "Vers 300 avant notre ère, le Grec Euclide consacre un livre entier de ses Éléments aux rapports entre grandeurs. Le mot « ratio » est latin. Il veut dire « calcul ».",
  },
  formule: {
    contexte: "a, b et c dans le ratio 2 : 3 : 7",
    expression: "$\\dfrac{a}{2} = \\dfrac{b}{3} = \\dfrac{c}{7}$",
    legende: "Chaque nombre divisé par sa part donne la même chose : la valeur d'une part.",
    schema: legende(
      tableauParts(
        [
          ["2", "3", "7"],
          ["6", "9", "21"],
        ],
        [],
        ["parts", "litres"],
      ),
      "6 ÷ 2 = 9 ÷ 3 = 21 ÷ 7 = 3 L : une part vaut 3 L",
    ),
  },
  methode: [
    {
      titre: "Je compte les parts",
      micros: ["prop_ratio_partager", "prop_ratio_trois"],
      texte:
        "Léo, Sami et Jade gagnent 84 € à un concours photo. Ils partagent selon le ratio 1 : 2 : 4. J'additionne : 1 + 2 + 4 = 7 parts.",
      schema: barreDesParts([
        {
          groupes: [
            { n: 1, teinte: VERT, nom: "Léo" },
            { n: 2, teinte: BLEU, nom: "Sami" },
            { n: 4, teinte: ROSE, nom: "Jade" },
          ],
        },
      ]),
    },
    {
      titre: "Je trouve une part",
      micros: ["prop_ratio_partager"],
      texte: "Je divise la quantité par le total des parts. 84 ÷ 7 = 12. Une part vaut 12 €.",
      schema: barreDesParts([
        {
          groupes: [
            { n: 1, teinte: VERT, nom: "Léo", dansCase: "12" },
            { n: 2, teinte: BLEU, nom: "Sami", dansCase: "12" },
            { n: 4, teinte: ROSE, nom: "Jade", dansCase: "12" },
          ],
        },
      ]),
    },
    {
      titre: "Je distribue, je vérifie",
      micros: ["prop_ratio_partager"],
      texte: "Chacun reçoit son nombre de parts × 12 €. Je vérifie que la somme redonne 84 €.",
      schema: donnees(
        ["ami", "il reçoit"],
        [
          ["Léo", "1 × 12 = 12 €"],
          ["Sami", "2 × 12 = 24 €"],
          ["Jade", "4 × 12 = 48 €"],
          ["total", "12 + 24 + 48 = 84 €"],
        ],
      ),
    },
  ],
  usages: [
    {
      titre: "Je connais une quantité",
      micros: ["prop_rapport", "prop_ratio_quotients"],
      detail: "Je la divise par SA part : j'ai une part. Puis je multiplie par l'autre part.",
    },
    {
      titre: "Je connais le total",
      micros: ["prop_ratio_partager"],
      detail: "Je divise le total par la somme des parts. Puis je multiplie par la part de chacun.",
    },
    {
      titre: "Je connais l'écart",
      micros: ["prop_ratio_defi"],
      detail: "L'écart aussi est un nombre de parts. Dans le ratio 3 : 5, l'écart vaut 5 − 3 = 2 parts.",
    },
  ],
  exemples: [
    {
      titre: "La playlist",
      micros: ["prop_rapport"],
      donnees: "Une playlist compte 40 morceaux de rap et 24 morceaux de pop.",
      question: "Quel est le ratio rap : pop, simplifié ?",
      schema: barreDesParts([
        {
          groupes: [
            { n: 5, teinte: VERT, nom: "rap" },
            { n: 3, teinte: ROSE, nom: "pop" },
          ],
        },
      ]),
      solution:
        "40 et 24 se divisent tous les deux par 8. 40 ÷ 8 = 5 et 24 ÷ 8 = 3. Le ratio rap : pop est 5 : 3.\n\nDans l'autre sens, pop : rap = 3 : 5.",
    },
    {
      titre: "Le smoothie",
      micros: ["prop_ratio_trois", "prop_ratio_quotients"],
      donnees: "Pour un smoothie, le ratio fraise : banane : lait est 3 : 2 : 5. On met 15 cL de fraise.",
      question: "Combien faut-il de banane et de lait ?",
      schema: tableauParts(
        [
          ["3", "2", "5"],
          ["15", "?", "?"],
        ],
        [
          { row: 1, col: 1 },
          { row: 1, col: 2 },
        ],
        ["parts", "cL"],
      ),
      solution:
        "Une part vaut 15 ÷ 3 = 5 cL. Banane : 2 × 5 = 10 cL. Lait : 5 × 5 = 25 cL.\n\nLe smoothie fait 15 + 10 + 25 = 50 cL.",
    },
    {
      titre: "Planter des arbres",
      micros: ["prop_ratio_partager", "prop_ratio_trois"],
      donnees: "Trois villages se partagent 1 500 jeunes arbres à planter, selon le ratio 2 : 3 : 5.",
      question: "Combien d'arbres plante chaque village ?",
      schema: barreDesParts([
        {
          groupes: [
            { n: 2, teinte: VERT, nom: "A : 300" },
            { n: 3, teinte: BLEU, nom: "B : 450" },
            { n: 5, teinte: JAUNE, nom: "C : 750" },
          ],
        },
      ]),
      solution:
        "2 + 3 + 5 = 10 parts. Une part vaut 1 500 ÷ 10 = 150 arbres. Village A : 2 × 150 = 300. Village B : 3 × 150 = 450. Village C : 5 × 150 = 750.\n\nContrôle : 300 + 450 + 750 = 1 500.",
    },
    {
      titre: "Défi : l'écart",
      micros: ["prop_ratio_defi"],
      donnees:
        "Dans une forêt, le ratio cerfs : sangliers est 3 : 5. On compte 40 sangliers de plus que de cerfs.",
      question: "Combien y a-t-il d'animaux en tout ?",
      schema: barreDesParts(
        [
          { etiquette: "cerfs", groupes: [{ n: 3, teinte: VERT, nom: "3 parts" }] },
          { etiquette: "sangliers", groupes: [{ n: 5, teinte: JAUNE, nom: "5 parts, dont l'écart", marque: 2 }] },
        ],
        true,
      ),
      solution:
        "L'écart vaut 5 − 3 = 2 parts. Donc 2 parts = 40 animaux, et une part = 20. Cerfs : 3 × 20 = 60. Sangliers : 5 × 20 = 100.\n\nEn tout : 60 + 100 = 160 animaux. ⚠️ 40 n'est ni les cerfs ni les sangliers : c'est l'écart.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un aquarium contient 12 poissons rouges et 20 poissons zèbres. Quel est le ratio rouges : zèbres, simplifié ?",
      correction: "12 et 20 se divisent par 4. Le ratio est 3 : 5.",
      micros: ["prop_rapport"],
    },
    {
      question: "x et y sont dans le ratio 4 : 7, et y = 35. Combien vaut x ?",
      correction:
        "$\\dfrac{x}{4} = \\dfrac{y}{7}$. Or 35 ÷ 7 = 5 : une part vaut 5. Donc x = 4 × 5 = 20.",
      micros: ["prop_ratio_quotients"],
    },
    {
      question: "a, b et c sont dans le ratio 1 : 3 : 5, et c = 40. Calcule a et b.",
      correction: "Une part vaut 40 ÷ 5 = 8. Donc a = 1 × 8 = 8 et b = 3 × 8 = 24.",
      micros: ["prop_ratio_trois"],
    },
    {
      question: "Deux frères se partagent 56 cartes à collectionner selon le ratio 3 : 5. Combien chacun en reçoit-il ?",
      correction:
        "3 + 5 = 8 parts. Une part vaut 56 ÷ 8 = 7 cartes. L'un reçoit 3 × 7 = 21 cartes, l'autre 5 × 7 = 35 cartes. Contrôle : 21 + 35 = 56.",
      micros: ["prop_ratio_partager"],
    },
    {
      question: "Dans une classe, le ratio filles : garçons est 3 : 4. Quelle fraction de la classe sont les filles ?",
      correction:
        "3 + 4 = 7 parts en tout. Les filles en ont 3 : c'est $\\dfrac{3}{7}$ de la classe. ⚠️ Pas $\\dfrac{3}{4}$ : ce serait comparer aux garçons, pas à la classe entière.",
      micros: ["prop_ratio_quotients", "prop_ratio_defi"],
    },
    {
      question:
        "Dans un mélange de graines pour oiseaux, le ratio tournesol : millet est 2 : 7. Il y a 250 g de millet de plus que de tournesol. Quelle masse de tournesol y a-t-il ?",
      correction:
        "L'écart vaut 7 − 2 = 5 parts. 5 parts = 250 g, donc une part = 50 g. Tournesol : 2 × 50 = 100 g. Contrôle : millet 7 × 50 = 350 g, et 350 − 100 = 250 g.",
      micros: ["prop_ratio_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

/** Le mode classe : ENGENDRÉ par la fiche, jamais recopié. */
export const slidesRatio4e = slidesDepuisFiche(ficheRatio4e);
