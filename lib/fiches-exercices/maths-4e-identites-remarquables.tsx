// ─── Fiche d'exercices : développer un carré (4e) — 20 exercices corrigés ─────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-identites-remarquables.tsx`
// et sur les CINQ micros du coach de 4e, notionId litteral_identite_remarquable.
//
// ⛔⛔ LE CALIBRAGE DE 4e (Frédéric, 25/09) : les formules a² + 2ab + b²,
// (a − b)² = …, (a + b)(a − b) = a² − b² ne sont PAS au programme de 4e (ni en
// 2020, ni dans le nouveau programme, où les trois identités sont un objectif de
// 3e). En 4e : « (x + 2)² = (x + 2)(x + 2), puis on distribue ». Cette feuille
// n'écrit donc NULLE PART une formule à apprendre ou à appliquer — ni dans les
// rappels, ni dans les corrigés, ni dans le titre. Chaque carré se développe en
// trois gestes : l'écrire comme un produit, faire les QUATRE produits, réduire.
// Le « double produit » n'est pas récité : il se CONSTATE, sur le calcul (deux
// termes du milieu égaux) et sur le carré découpé (deux rectangles égaux).
// Le vérificateur refuse toute formule-règle dans le texte élève.
// Les micros, lues sans formule : « reconnaître » = voir qu'une expression est
// le carré d'une parenthèse, ou le produit de deux parenthèses qui ne diffèrent
// que par un signe ; « choisir » = choisir d'écrire le produit, puis distribuer.
// ⛔ Ce qui n'est PAS de cette feuille : la distributivité sur des produits
// quelconques en tant que telle (sa feuille), la factorisation (sa feuille), les
// équations.
//
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni (x + 3)², (x + 5)²,
// (x − 4)², (x − 5)(x + 5), x² − 49, (x + 7)(x + 7), 101², 99 × 101, ni le bassin
// et sa margelle. ⛔ Ni ceux de la feuille de 3e ((x + 6)², (x − 2)²,
// (x + 10)(x − 10), x² − 25, 4x² − 9, (2x − 3)² − 16, 101², 99², 102 × 98, le
// potager, le cadre, les deux programmes) ; ⛔ ni ceux de la feuille de seconde
// ((x + 7)², (3x + 1)², (x − 9)², (x − 8)(x + 8), 41², 29², 38 × 42, le carré
// agrandi de 3 cm, 2 025).
//
// Les pièges nommés : le carré « distribué » sur chaque terme, (x + 12)² pris
// pour x² + 144 (1, 8, 13, 18), (2x)² écrit 2x² (3, 15), le dernier produit
// d'un carré écrit négatif (4, 6, 9, 15), le signe du dernier produit quand un
// seul signe change (5), un carré vu dans deux parenthèses différentes (2, 7),
// deux développements qui ont le même terme du milieu (11), l'ordre des termes
// qui cache le carré ou le signe opposé (12), le moins devant une parenthèse
// (10), un essai réussi pris pour une preuve (14), la perte d'aire réduite au
// petit carré du coin (16), la zone ajoutée d'un seul côté (17), « le côté
// double, l'aire double » (18), « +10 % de côté, +10 % d'aire » (19), « une
// rangée de plus, une de moins, rien ne change » (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - tapis de judo : surface de combat de 8 m × 8 m au minimum (10 m × 10 m au
//   plus), zone de sécurité d'au moins 3 m tout autour — Fédération
//   internationale de judo (IJF), Sport and Organisation Rules, « Competition
//   area » ; d'où le tapis de 14 m × 14 m des compétitions — ex. 17 ;
// - jeu de go : plateau réglementaire de 19 × 19 lignes, plateaux de 13 × 13 et
//   9 × 9 pour débuter (Fédération française de go, règles du jeu) — ex. 18 ;
// - la réserve naturelle de 1 km de côté (ex. 19) et la terrasse de 30 × 30
//   dalles (ex. 20) sont IMAGINÉES, à des tailles vraisemblables.
//
// ⭐ LES SCHÉMAS (« les élèves adorent les schémas », Frédéric, redit le 25/09) :
// les VINGT corrigés dessinent. Le dessin clé est LE CARRÉ DÉCOUPÉ de la fiche
// de cours : un carré de côté x + 2 coupé en quatre morceaux, UN PAR PRODUIT —
// les deux rectangles du milieu sont égaux, c'est là que se voit le terme du
// milieu. Le même dessin, avec un côté négatif (morceaux roses), montre les
// deux rectangles qui s'annulent quand un seul signe change (5, 6, 10, 20). Un
// produit ordinaire (7, 12) a deux rectangles DIFFÉRENTS. Le tapis de judo (17)
// est un carré coupé en neuf. Les tableaux (2, 11, 14, 15) montrent les deux
// produits du milieu, ou rejouent les essais numériques.
//
// Les corrigés sont écrits à la première personne (« je repère »), comme les
// feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-identites-remarquables-4e.mjs`
// — chaque chaîne d'égalités est LUE telle qu'elle est écrite et tous ses
// membres comparés en neuf valeurs de x ; chaque case des dessins d'aires vaut
// « ligne × colonne » ; chaque tableau est recalculé case par case ; et aucune
// formule-règle ((a + b)², 2ab, a² − b²…) n'apparaît dans le texte élève.
//
// Micro-compétences : litteral_identite_lier_distributivite (1, 6, 14, 16),
// litteral_identite_reconnaitre (2, 6, 11, 12, 20), litteral_identite_developper
// (3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 16, 17, 18, 19, 20), litteral_identite_choisir
// (7, 10, 12, 17, 18), litteral_identite_defi (8, 14, 15, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// ⭐ LE CARRÉ (OU LE RECTANGLE) DÉCOUPÉ, repris du modèle de 3e : `haut` = les
// morceaux du côté du haut (étiquette, longueur dessinée), `cote` = ceux du côté
// gauche, `cases` = l'aire de chaque morceau, ligne par ligne — un morceau par
// produit de la double distributivité. Un carré (même étiquette en ligne et en
// colonne) en bleu, un morceau négatif en rose, les autres en orange. Texte NU
// (x², pas `$`).
// ⛔ Le script de recalcul relit chaque appel `aires(…)` : l'écrire sur UNE
// ligne, en tableaux JSON ; chaque case doit valoir « ligne × colonne ».
// ⛔ LISIBLE À 375 PX : la largeur du dessin (44 + somme des longueurs + 6) reste
// sous 250, pour que les cases (police 12) restent au-dessus de 11 px à 235 px.
type Bord = [string, number];
const aires = (haut: Bord[], cote: Bord[], cases: string[][]) => {
  const G = 44;
  const T = 22;
  const W = haut.reduce((s, [, l]) => s + l, 0);
  const H = cote.reduce((s, [, l]) => s + l, 0);
  const xs = haut.map((_, j) => G + haut.slice(0, j).reduce((s, [, l]) => s + l, 0));
  const ys = cote.map((_, i) => T + cote.slice(0, i).reduce((s, [, l]) => s + l, 0));
  const fond = (texte: string, i: number, j: number) =>
    texte.startsWith("−") ? "#fee2e2" : cote[i][0] === haut[j][0] ? "#dbeafe" : "#ffedd5";
  return (
    <svg
      viewBox={`0 0 ${G + W + 6} ${T + H + 6}`}
      role="img"
      aria-label={`Rectangle de côtés ${haut.map((h) => h[0]).join(" + ")} et ${cote.map((c) => c[0]).join(" + ")}, découpé en morceaux d'aires ${cases.flat().join(", ")}`}
      className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]"
    >
      {haut.map(([t, l], j) => (
        <text key={`h${j}`} x={xs[j] + l / 2} y={T - 7} textAnchor="middle" fontSize={13} fontWeight={700} fill="#1d4ed8">
          {t}
        </text>
      ))}
      {cote.map(([t, l], i) => (
        <text key={`c${i}`} x={G - 7} y={ys[i] + l / 2 + 4} textAnchor="end" fontSize={13} fontWeight={700} fill="#1d4ed8">
          {t}
        </text>
      ))}
      {cote.map(([, h], i) =>
        haut.map(([, w], j) => (
          <g key={`${i}-${j}`}>
            <rect x={xs[j]} y={ys[i]} width={w} height={h} fill={fond(cases[i][j], i, j)} stroke="#334155" strokeWidth={1.2} />
            <text x={xs[j] + w / 2} y={ys[i] + h / 2 + 4} textAnchor="middle" fontSize={12} fill="#0f172a">
              {cases[i][j]}
            </text>
          </g>
        )),
      )}
    </svg>
  );
};

/** Deux dessins côte à côte (exercices 6, 7, 9, 10) : l'un sous l'autre sur
 *  téléphone, côte à côte à partir de `sm` et sur papier. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

// Un tableau à DEUX colonnes de valeurs, chaque ligne avec son libellé (le modèle
// de la feuille de seconde). ⛔ Deux colonnes, jamais trois, et du texte NU.
// ⛔ Le script le relit : l'appel sur UNE ligne, les lignes en triplets JSON.
const tableau2 = (title: string, headers: [string, string], rows: [string, string, string][]) => (
  <div className="mx-auto w-full max-w-[26rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", title, headers, rows: rows.map(([label, a, b]) => ({ label, values: [a, b] })) }} />
  </div>
);

export const exercicesIdentitesRemarquables4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "litteral-identite-remarquable",
  titre: "Développer un carré",
  accroche:
    "Vingt exercices, du geste seul au problème, avec une seule méthode et aucune formule à apprendre : écrire le carré comme un produit, faire les quatre produits, réduire. On y voit pourquoi deux termes du milieu s'ajoutent dans un carré et s'annulent quand un seul signe change, on reconnaît un carré au premier coup d'œil, et on démasque l'erreur la plus fréquente, écrire le carré de chaque terme. Puis un tapis de judo, les plateaux du jeu de go, une réserve naturelle qui s'agrandit, un carreleur. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et le carré découpé où chaque produit devient une aire.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/litteral-identite-remarquable", titre: "Les identités remarquables" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un carré ou un produit par exercice. J'écris d'abord le produit des deux parenthèses, puis je fais les quatre produits.",
      rappel: [
        "Un carré est un produit par lui-même : $(x + 20)^2$ s'écrit $(x + 20)(x + 20)$.",
        "Double distributivité : chaque terme de la première parenthèse multiplie chaque terme de la seconde. QUATRE produits, puis je réduis.",
        "Deux parenthèses identiques : les deux produits du milieu sont ÉGAUX, ils s'ajoutent. Les mêmes nombres avec un signe qui change : ils sont OPPOSÉS, ils s'annulent.",
        "Le dessin : un carré découpé en quatre morceaux, un par produit. Deux carrés dans les coins, et deux rectangles égaux entre eux.",
      ],
      exercices: [
        {
          enonce:
            "a) Écrire $(x + 2)^2$ comme un produit de deux facteurs.\nb) Développer $(x + 2)^2$ par double distributivité, en écrivant les quatre produits.\nc) Même travail avec $(x + 8)^2$.",
          correction:
            "Je repère le carré : il porte sur TOUTE la parenthèse $x + 2$. Élever au carré, c'est multiplier par soi-même.\na) $(x + 2)^2 = (x + 2)(x + 2)$.\nb) Je multiplie chaque terme de la première parenthèse par chaque terme de la seconde : $x \\times x = x^2$, $x \\times 2 = 2x$, $2 \\times x = 2x$ et $2 \\times 2 = 4$.\nDonc $(x + 2)^2 = x^2 + 2x + 2x + 4 = x^2 + 4x + 4$.\nc) $(x + 8)^2 = (x + 8)(x + 8) = x^2 + 8x + 8x + 64 = x^2 + 16x + 64$.\n⭐ Le dessin : le carré de côté $x + 2$ se découpe en quatre morceaux, un par produit. Les deux rectangles de $2x$ sont identiques : ensemble, ils font le terme du milieu, $4x$.\n⛔ Le piège : écrire $(x + 2)^2 = x^2 + 4$, en ne gardant que les deux coins du carré. Il manque les deux rectangles.\nRéponse : $(x + 2)^2 = x^2 + 4x + 4$ et $(x + 8)^2 = x^2 + 16x + 64$.",
          schema: aires([["x", 110], ["2", 40]], [["x", 110], ["2", 40]], [["x²", "2x"], ["2x", "4"]]),
          micros: ["litteral_identite_lier_distributivite"],
        },
        {
          enonce:
            "Pour chaque produit, dire s'il s'agit du carré d'une somme, du carré d'une différence, du produit de deux parenthèses qui ne diffèrent que par un signe, ou de rien de tout cela.\na) $(x - 7)^2$\nb) $(x + 2)(x - 2)$\nc) $(x + 9)(x + 9)$\nd) $(x + 1)(x + 5)$\ne) $(x - 3)(x + 4)$\nf) $(6 + x)^2$",
          correction:
            "Je regarde les deux parenthèses : identiques, c'est un carré ; les mêmes termes avec un signe qui change, les deux produits du milieu vont s'annuler ; sinon, rien de particulier.\na) Une différence élevée au carré : c'est le carré d'une différence, $(x - 7)(x - 7)$.\nb) Les mêmes termes $x$ et $2$, un signe qui change : les produits du milieu, $-2x$ et $2x$, s'annulent.\nc) Deux parenthèses identiques : c'est $(x + 9)^2$, le carré d'une somme.\nd) Deux nombres différents, $1$ et $5$ : rien de particulier, c'est une double distributivité ordinaire.\ne) Un signe change, mais les nombres $3$ et $4$ sont différents : rien de particulier.\nf) Une somme élevée au carré : c'est le carré d'une somme. L'ordre $6 + x$ ne change rien.\n⭐ Le tableau montre les deux produits du milieu : ÉGAUX pour un carré, OPPOSÉS au b), DIFFÉRENTS au d) et au e).\n⛔ Le piège au e) : voir un moins et un plus, et croire que le milieu va disparaître. Il faut AUSSI les mêmes nombres : ici $4x - 3x = x$, il reste un terme en $x$.\nRéponse : a) carré d'une différence ; b) un seul signe change ; c) carré d'une somme ; d) rien ; e) rien ; f) carré d'une somme.",
          schema: tableau2("Les deux produits du milieu", ["produits du milieu", "termes"], [["(x − 7)²", "−7x et −7x", "3"], ["(x + 2)(x − 2)", "−2x et 2x", "2"], ["(x + 9)(x + 9)", "9x et 9x", "3"], ["(x + 1)(x + 5)", "5x et x", "3"], ["(x − 3)(x + 4)", "4x et −3x", "3"], ["(6 + x)²", "6x et 6x", "3"]]),
          micros: ["litteral_identite_reconnaitre"],
        },
        {
          enonce: "Développer et réduire.\na) $(x + 9)^2$\nb) $(2x + 3)^2$",
          correction:
            "J'écris chaque carré comme un produit, puis je fais les quatre produits.\na) $(x + 9)^2 = (x + 9)(x + 9) = x^2 + 9x + 9x + 81 = x^2 + 18x + 81$.\nb) $(2x + 3)^2 = (2x + 3)(2x + 3) = 4x^2 + 6x + 6x + 9 = 4x^2 + 12x + 9$.\n⭐ Le dessin du b) : le grand carré vaut $2x \\times 2x = 4x^2$, chaque rectangle $2x \\times 3 = 6x$, et les deux ensemble font $12x$.\n⛔ Le piège au b) : écrire $2x \\times 2x = 2x^2$. Je multiplie les nombres ET les lettres : $2 \\times 2 = 4$ et $x \\times x = x^2$, donc $4x^2$.\nRéponse : $(x + 9)^2 = x^2 + 18x + 81$ et $(2x + 3)^2 = 4x^2 + 12x + 9$.",
          schema: aires([["2x", 110], ["3", 50]], [["2x", 110], ["3", 50]], [["4x²", "6x"], ["6x", "9"]]),
          micros: ["litteral_identite_developper"],
        },
        {
          enonce: "Développer et réduire.\na) $(x - 6)^2$\nb) $(3x - 2)^2$",
          correction:
            "J'écris chaque carré comme un produit, et je garde le signe moins avec le nombre qu'il précède.\na) $(x - 6)^2 = (x - 6)(x - 6) = x^2 - 6x - 6x + 36 = x^2 - 12x + 36$.\nb) $(3x - 2)^2 = (3x - 2)(3x - 2) = 9x^2 - 6x - 6x + 4 = 9x^2 - 12x + 4$.\n⭐ Le dessin du a) : les deux rectangles valent $-6x$ chacun, et le petit carré $(-6) \\times (-6) = +36$.\n⛔ Le piège : écrire $(x - 6)^2 = x^2 - 12x - 36$. Le dernier produit est $(-6) \\times (-6)$ : moins par moins donne plus, $+36$.\nRéponse : $(x - 6)^2 = x^2 - 12x + 36$ et $(3x - 2)^2 = 9x^2 - 12x + 4$.",
          schema: aires([["x", 110], ["−6", 60]], [["x", 110], ["−6", 60]], [["x²", "−6x"], ["−6x", "36"]]),
          micros: ["litteral_identite_developper"],
        },
        {
          enonce: "Développer et réduire.\na) $(x + 11)(x - 11)$\nb) $(3x + 4)(3x - 4)$",
          correction:
            "Je fais les quatre produits, et je regarde ce que deviennent les deux du milieu.\na) $(x + 11)(x - 11) = x^2 - 11x + 11x - 121 = x^2 - 121$.\nb) $(3x + 4)(3x - 4) = 9x^2 - 12x + 12x - 16 = 9x^2 - 16$.\n⭐ Le dessin du a) : les deux rectangles valent $11x$ et $-11x$ : ils s'annulent. Il ne reste que $x^2$ et $-121$.\n⛔ Le piège : écrire $+121$. Le dernier produit est $11 \\times (-11) = -121$ : un seul des deux nombres est négatif.\nRéponse : $(x + 11)(x - 11) = x^2 - 121$ et $(3x + 4)(3x - 4) = 9x^2 - 16$.",
          schema: aires([["x", 110], ["11", 60]], [["x", 110], ["−11", 60]], [["x²", "11x"], ["−11x", "−121"]]),
          micros: ["litteral_identite_developper"],
        },
        {
          enonce:
            "a) Développer $(x - 8)(x - 8)$ en écrivant les quatre produits.\nb) Développer $(x - 8)(x + 8)$ de la même façon.\nc) Les deux produits ne diffèrent que par un signe. Pourquoi le premier donne-t-il trois termes, et le second deux seulement ?",
          correction:
            "Je fais la double distributivité, sans raccourci, pour VOIR ce qui se passe au milieu.\na) $(x - 8)(x - 8) = x^2 - 8x - 8x + 64 = x^2 - 16x + 64$.\nb) $(x - 8)(x + 8) = x^2 + 8x - 8x - 64 = x^2 - 64$.\nc) Au a), les deux termes du milieu sont ÉGAUX, $-8x$ et $-8x$ : ils s'ajoutent en $-16x$. Au b), ils sont OPPOSÉS, $8x$ et $-8x$ : ils s'annulent.\n⭐ Le a) est le carré $(x - 8)^2$ : deux parenthèses identiques donnent toujours deux termes du milieu égaux. Les dessins le montrent : deux rectangles roses à gauche, un orange et un rose à droite.\n⛔ Le piège au a) : écrire $-64$ pour le dernier produit. $(-8) \\times (-8) = +64$.\nRéponse : $x^2 - 16x + 64$ ; $x^2 - 64$.",
          schema: deux(
            aires([["x", 110], ["−8", 55]], [["x", 110], ["−8", 55]], [["x²", "−8x"], ["−8x", "64"]]),
            aires([["x", 110], ["8", 55]], [["x", 110], ["−8", 55]], [["x²", "8x"], ["−8x", "−64"]]),
          ),
          micros: ["litteral_identite_lier_distributivite", "litteral_identite_reconnaitre"],
        },
        {
          enonce: "Pour chaque produit, dire si les deux parenthèses sont identiques (c'est alors un carré), puis développer.\na) $(x + 4)(x + 6)$\nb) $(x + 10)(x + 10)$",
          correction:
            "Je compare les deux parenthèses avant de calculer, puis je fais les quatre produits dans les deux cas.\na) $4$ et $6$ sont différents : ce n'est pas un carré. $(x + 4)(x + 6) = x^2 + 6x + 4x + 24 = x^2 + 10x + 24$.\nb) Les deux parenthèses sont identiques : c'est le carré $(x + 10)^2$. $(x + 10)(x + 10) = x^2 + 10x + 10x + 100 = x^2 + 20x + 100$.\n⭐ Sur les dessins : au a), les deux rectangles ont des aires DIFFÉRENTES, $6x$ et $4x$ ; au b), ils sont identiques, $10x$ et $10x$.\n⛔ Le piège au a) : croire que deux signes plus suffisent pour un carré, et écrire $x^2 + 8x + 16$ comme si c'était $(x + 4)(x + 4)$. Un carré demande deux parenthèses IDENTIQUES.\nRéponse : $x^2 + 10x + 24$ ; $x^2 + 20x + 100$.",
          schema: deux(
            aires([["x", 110], ["6", 60]], [["x", 110], ["4", 45]], [["x²", "6x"], ["4x", "24"]]),
            aires([["x", 110], ["10", 70]], [["x", 110], ["10", 70]], [["x²", "10x"], ["10x", "100"]]),
          ),
          micros: ["litteral_identite_choisir", "litteral_identite_developper"],
        },
        {
          enonce: "Un élève écrit : $(x + 12)^2 = x^2 + 144$.\na) Tester son égalité avec $x = 1$.\nb) Qu'a-t-il oublié ? Écrire le bon développement.",
          correction:
            "a) À gauche : $(1 + 12)^2 = 13^2 = 169$. À droite : $1^2 + 144 = 145$. Je ne trouve pas la même chose : l'égalité est fausse.\nb) J'écris le produit et je fais les quatre produits : $(x + 12)^2 = (x + 12)(x + 12) = x^2 + 12x + 12x + 144 = x^2 + 24x + 144$. Il a oublié les deux produits du milieu, $12x$ et $12x$.\n⭐ Contrôle avec $x = 1$ : $1 + 24 + 144 = 169$, comme à gauche. Et l'écart $169 - 145 = 24$, c'est justement $24x$ pour $x = 1$.\n⭐ Le dessin : l'élève n'a gardé que les deux coins, $x^2$ et $144$ ; les deux rectangles de $12x$ ont disparu.\n⛔ Le piège : croire que le carré « se distribue », et mettre au carré chaque terme séparément. On écrit le produit, et on fait les QUATRE produits.\nRéponse : l'égalité est fausse ; $(x + 12)^2 = x^2 + 24x + 144$.",
          schema: aires([["x", 110], ["12", 60]], [["x", 110], ["12", 60]], [["x²", "12x"], ["12x", "144"]]),
          micros: ["litteral_identite_defi", "litteral_identite_developper"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes, comme au contrôle. J'écris chaque carré comme un produit, et chaque morceau à part.",
      rappel: [
        "Je regarde les deux parenthèses AVANT de calculer : identiques, c'est un carré et les deux produits du milieu s'ajoutent ; les mêmes nombres avec un signe qui change, ils s'annulent ; sinon, ils restent différents.",
        "Un moins devant une parenthèse change le signe de TOUS ses termes : j'écris chaque développement entre parenthèses, et je ne les retire qu'à la fin.",
        "Pour tester une égalité, je remplace $x$ par un nombre. Un essai qui rate prouve « faux » ; un essai qui marche ne prouve rien.",
      ],
      exercices: [
        {
          enonce: "Développer et réduire $A = (2x + 1)^2 + (2x - 1)^2$.",
          correction:
            "Je développe chaque carré à part, en l'écrivant comme un produit.\n$(2x + 1)^2 = (2x + 1)(2x + 1) = 4x^2 + 2x + 2x + 1 = 4x^2 + 4x + 1$.\n$(2x - 1)^2 = (2x - 1)(2x - 1) = 4x^2 - 2x - 2x + 1 = 4x^2 - 4x + 1$.\nJ'additionne : $A = 4x^2 + 4x + 1 + 4x^2 - 4x + 1 = 8x^2 + 2$.\n⭐ Les deux termes du milieu, $+4x$ et $-4x$, s'annulent : les dessins montrent les mêmes rectangles, une fois positifs, une fois négatifs.\n⭐ Contrôle avec $x = 1$ : $3^2 + 1^2 = 10$, et $8 \\times 1 + 2 = 10$.\n⛔ Le piège : écrire $(2x - 1)^2 = 4x^2 - 4x - 1$. Le dernier produit est $(-1) \\times (-1) = +1$.\nRéponse : $A = 8x^2 + 2$.",
          schema: deux(
            aires([["2x", 110], ["1", 35]], [["2x", 110], ["1", 35]], [["4x²", "2x"], ["2x", "1"]]),
            aires([["2x", 110], ["−1", 35]], [["2x", 110], ["−1", 35]], [["4x²", "−2x"], ["−2x", "1"]]),
          ),
          micros: ["litteral_identite_developper"],
        },
        {
          enonce: "Développer et réduire $B = (x + 9)^2 - (x + 9)(x - 9)$.",
          correction:
            "Je reconnais un carré, puis un produit de deux parenthèses qui ne diffèrent que par un signe. Je développe chaque morceau À PART, entre parenthèses.\n$(x + 9)^2 = (x + 9)(x + 9) = x^2 + 9x + 9x + 81 = x^2 + 18x + 81$.\n$(x + 9)(x - 9) = x^2 - 9x + 9x - 81 = x^2 - 81$.\nJe soustrais TOUT le second morceau : $B = (x^2 + 18x + 81) - (x^2 - 81) = x^2 + 18x + 81 - x^2 + 81 = 18x + 162$.\n⭐ Contrôle avec $x = 0$ : $9^2 - 9 \\times (-9) = 81 + 81 = 162$, et $18 \\times 0 + 162 = 162$.\n⛔ Le piège : oublier que le moins porte sur tout $x^2 - 81$, et écrire $- x^2 - 81$. On trouverait $18x$ au lieu de $18x + 162$.\nRéponse : $B = 18x + 162$.",
          schema: deux(
            aires([["x", 110], ["9", 55]], [["x", 110], ["9", 55]], [["x²", "9x"], ["9x", "81"]]),
            aires([["x", 110], ["9", 55]], [["x", 110], ["−9", 55]], [["x²", "9x"], ["−9x", "−81"]]),
          ),
          micros: ["litteral_identite_developper", "litteral_identite_choisir"],
        },
        {
          enonce:
            "Voici quatre produits : $A = (x - 8)^2$, $B = (x + 12)(x - 12)$, $C = (x + 11)^2$ et $D = (x + 2)(x + 20)$.\nEt voici leurs développements, dans le désordre : $x^2 + 22x + 40$ ; $x^2 - 144$ ; $x^2 + 22x + 121$ ; $x^2 - 16x + 64$.\na) Sans calculer, lequel des quatre produits n'a que deux termes une fois développé ? Pourquoi ?\nb) Associer chaque produit à son développement, en faisant les quatre produits.\nc) Contrôler chaque association en remplaçant $x$ par $1$.",
          correction:
            "a) C'est $B$ : ses deux parenthèses ne diffèrent que par un signe, donc ses deux produits du milieu, $-12x$ et $12x$, s'annulent. Il reste deux termes.\nb) Je fais les quatre produits de chacun.\n$A = (x - 8)(x - 8) = x^2 - 8x - 8x + 64 = x^2 - 16x + 64$.\n$B = (x + 12)(x - 12) = x^2 - 12x + 12x - 144 = x^2 - 144$.\n$C = (x + 11)(x + 11) = x^2 + 11x + 11x + 121 = x^2 + 22x + 121$.\n$D = (x + 2)(x + 20) = x^2 + 20x + 2x + 40 = x^2 + 22x + 40$.\nc) Pour $x = 1$ : $A$ vaut $(1 - 8)^2 = 49$ et $1 - 16 + 64 = 49$. Le tableau fait les quatre contrôles : à chaque ligne, le produit et le développement donnent le même nombre.\n⛔ Le piège : $C$ et $D$ ont le même terme du milieu, $22x$. Seul le dernier produit les distingue : $11 \\times 11 = 121$ pour le carré, $2 \\times 20 = 40$ pour l'autre.\nRéponse : $A = x^2 - 16x + 64$ ; $B = x^2 - 144$ ; $C = x^2 + 22x + 121$ ; $D = x^2 + 22x + 40$.",
          schema: tableau2("Chaque produit et son développement, en x = 1", ["développement", "pour x = 1"], [["A", "x² − 16x + 64", "49"], ["B", "x² − 144", "−143"], ["C", "x² + 22x + 121", "144"], ["D", "x² + 22x + 40", "63"]]),
          micros: ["litteral_identite_reconnaitre", "litteral_identite_developper"],
        },
        {
          enonce:
            "Pour chaque expression, écrire d'abord le produit de deux parenthèses. Dire si les deux produits du milieu vont s'ajouter, s'annuler ou rester différents. Puis développer.\na) $(x + 2)(x + 8)$\nb) $(x + 15)(x - 15)$\nc) $(4 + x)^2$\nd) $(x - 13)(13 + x)$",
          correction:
            "Je compare les deux parenthèses : identiques, les mêmes termes avec un signe qui change, ou différentes.\na) $2$ et $8$ : différentes, les produits du milieu restent différents. $(x + 2)(x + 8) = x^2 + 8x + 2x + 16 = x^2 + 10x + 16$.\nb) Les mêmes termes, un signe qui change : ils s'annulent. $(x + 15)(x - 15) = x^2 - 15x + 15x - 225 = x^2 - 225$.\nc) Un carré : j'écris $(4 + x)(4 + x)$, les produits du milieu sont égaux. $(4 + x)^2 = (4 + x)(4 + x) = 16 + 4x + 4x + x^2 = 16 + 8x + x^2$, que je range en $x^2 + 8x + 16$.\nd) $13 + x$, c'est $x + 13$ : les mêmes termes, un signe qui change, ils s'annulent. $(x - 13)(13 + x) = 13x + x^2 - 169 - 13x = x^2 - 169$.\n⭐ Le a) et le c) se ressemblent, et pourtant seul le c) est un carré : le dessin du a) a deux rectangles différents, $8x$ et $2x$.\n⛔ Le piège au d) : ne pas voir les signes opposés parce que l'ordre a changé. L'addition ne dépend pas de l'ordre : $13 + x = x + 13$.\nRéponse : a) $x^2 + 10x + 16$ ; b) $x^2 - 225$ ; c) $x^2 + 8x + 16$ ; d) $x^2 - 169$.",
          schema: aires([["x", 110], ["8", 60]], [["x", 110], ["2", 30]], [["x²", "8x"], ["2x", "16"]]),
          micros: ["litteral_identite_choisir", "litteral_identite_reconnaitre", "litteral_identite_developper"],
        },
        {
          enonce: "Calculer de tête, en écrivant $61 = 60 + 1$ et $59 = 60 - 1$, puis en faisant les quatre produits.\na) $61^2$\nb) $59^2$\nc) $61 \\times 59$",
          correction:
            "J'écris chaque nombre à côté de $60$, dont le carré $3\\,600$ se calcule de tête, et je fais les quatre produits comme avec une lettre.\na) $61^2 = (60 + 1)(60 + 1) = 3\\,600 + 60 + 60 + 1 = 3\\,721$.\nb) $59^2 = (60 - 1)(60 - 1) = 3\\,600 - 60 - 60 + 1 = 3\\,481$.\nc) $61 \\times 59 = (60 + 1)(60 - 1) = 3\\,600 - 60 + 60 - 1 = 3\\,599$.\n⭐ Le dessin du a) : le carré de côté $61$, c'est un carré de $3\\,600$, deux bandes de $60$ et un petit carré de $1$.\n⛔ Le piège au a) : écrire $61^2 = 3\\,600 + 1 = 3\\,601$. Les deux bandes de $60$ ne disparaissent pas.\nRéponse : $3\\,721$ ; $3\\,481$ ; $3\\,599$.",
          schema: aires([["60", 150], ["1", 36]], [["60", 150], ["1", 36]], [["3 600", "60"], ["60", "1"]]),
          micros: ["litteral_identite_developper"],
        },
        {
          enonce:
            "Pour vérifier l'égalité $(x - 10)^2 = x^2 - 100$, Tom remplace $x$ par $10$ et trouve $0$ des deux côtés. Il conclut : « c'est juste ».\na) Tester l'égalité avec $x = 0$.\nb) Tom a-t-il raison ? Expliquer son erreur de raisonnement, puis son erreur de calcul.\nc) Écrire le bon développement de $(x - 10)^2$.",
          correction:
            "a) À gauche : $(0 - 10)^2 = (-10)^2 = 100$. À droite : $0^2 - 100 = -100$. Les deux côtés sont différents.\nb) Non. Un essai qui marche ne prouve rien : l'égalité peut être vraie pour $x = 10$ et fausse pour d'autres nombres. Un SEUL essai qui rate, comme au a), prouve qu'elle est fausse.\nSon erreur de calcul : il a mis au carré chaque terme séparément. Il a confondu $(x - 10)^2$ avec $(x - 10)(x + 10) = x^2 + 10x - 10x - 100 = x^2 - 100$, où les produits du milieu s'annulent.\nc) Je reviens au produit : $(x - 10)^2 = (x - 10)(x - 10) = x^2 - 10x - 10x + 100 = x^2 - 20x + 100$.\n⭐ Le tableau : pour $x = 10$, les deux côtés valent $0$ par hasard ; pour $x = 0$ et $x = 20$, ils ne sont plus égaux.\n⛔ Le piège : conclure « vrai » après un seul essai réussi. Pour prouver une égalité, il faut un calcul avec la lettre.\nRéponse : l'égalité est fausse ; $(x - 10)^2 = x^2 - 20x + 100$.",
          schema: tableau2("Trois essais de l'égalité de Tom", ["(x − 10)²", "x² − 100"], [["x = 0", "100", "−100"], ["x = 10", "0", "0"], ["x = 20", "100", "300"]]),
          micros: ["litteral_identite_defi", "litteral_identite_lier_distributivite"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifier.\na) Pour tout nombre $x$, $(3x)^2 = 3x^2$.\nb) Pour tout nombre $x$, $(x - 6)^2 = (6 - x)^2$.\nc) Pour tout nombre $x$, $(x + 0{,}5)^2 = x^2 + x + 0{,}25$.\nd) Pour tout nombre $x$, $(x - 11)^2 = x^2 - 22x - 121$.",
          correction:
            "Pour prouver « faux », un seul contre-exemple suffit. Pour prouver « vrai », je développe avec la lettre.\na) FAUX. Pour $x = 2$ : $(3 \\times 2)^2 = 36$, mais $3 \\times 2^2 = 12$. En fait $(3x)^2 = 3x \\times 3x = 9x^2$.\nb) VRAI. À l'exercice 4, $(x - 6)^2 = x^2 - 12x + 36$. Et $(6 - x)^2 = (6 - x)(6 - x) = 36 - 6x - 6x + x^2 = 36 - 12x + x^2$ : les mêmes termes, dans un autre ordre. Deux nombres opposés ont le même carré.\nc) VRAI. $(x + 0{,}5)^2 = (x + 0{,}5)(x + 0{,}5) = x^2 + 0{,}5x + 0{,}5x + 0{,}25 = x^2 + x + 0{,}25$.\nd) FAUX. Pour $x = 2$ : $(2 - 11)^2 = 81$, mais $4 - 44 - 121 = -161$. Le bon développement : $(x - 11)^2 = (x - 11)(x - 11) = x^2 - 11x - 11x + 121 = x^2 - 22x + 121$.\n⭐ Le tableau fait l'essai $x = 2$ partout : il démasque a) et d), mais au b) et au c), l'égalité des deux côtés ne prouve rien. C'est le calcul avec la lettre qui prouve.\n⛔ Le piège au d) : mettre le moins partout. Seuls les deux produits du milieu sont négatifs ; le dernier, $(-11) \\times (-11)$, est positif.\nRéponse : faux, vrai, vrai, faux.",
          schema: tableau2("L'essai x = 2 pour chaque égalité", ["à gauche", "à droite"], [["a)", "36", "12"], ["b)", "16", "16"], ["c)", "6,25", "6,25"], ["d)", "81", "−161"]]),
          micros: ["litteral_identite_defi", "litteral_identite_developper"],
        },
        {
          enonce:
            "Un carré a pour côté $x$ cm ($x$ est plus grand que $3$). On retire $3$ cm à son côté.\na) Exprimer l'aire du nouveau carré en fonction de $x$, puis la développer.\nb) Un élève dit : « j'ai retiré $3$ cm au côté, donc l'aire a diminué de $3 \\times 3 = 9$ cm² ». Calculer les deux aires pour $x = 10$ et conclure.\nc) Exprimer, en fonction de $x$, de combien l'aire a diminué.",
          correction:
            "a) Le nouveau côté mesure $x - 3$ : l'aire est $(x - 3)^2 = (x - 3)(x - 3) = x^2 - 3x - 3x + 9 = x^2 - 6x + 9$.\nb) Pour $x = 10$ : l'ancien carré a une aire de $10^2 = 100$ cm², le nouveau $7^2 = 49$ cm². L'aire a diminué de $100 - 49 = 51$ cm², et non de $9$ cm².\nc) La diminution : $x^2 - (x^2 - 6x + 9) = x^2 - x^2 + 6x - 9 = 6x - 9$. Pour $x = 10$ : $6 \\times 10 - 9 = 51$ cm², comme au b).\n⭐ Le dessin : le carré de côté $x$ se découpe en le nouveau carré $(x - 3)^2$, deux bandes de $3 \\times (x - 3) = 3x - 9$, et un petit carré de $9$. On enlève les deux bandes ET le coin : $2(3x - 9) + 9 = 6x - 9$.\n⛔ Le piège : ne penser qu'au petit carré de $9$ cm² du coin. Les deux bandes le long des côtés font presque toute la perte.\nRéponse : la nouvelle aire est $x^2 - 6x + 9$ cm² ; elle a diminué de $6x - 9$ cm², soit $51$ cm² pour $x = 10$.",
          schema: aires([["x − 3", 120], ["3", 55]], [["x − 3", 120], ["3", 55]], [["(x − 3)²", "3x − 9"], ["3x − 9", "9"]]),
          micros: ["litteral_identite_lier_distributivite", "litteral_identite_developper"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je repère le carré ou le produit caché, je fais les quatre produits, puis je réponds par une phrase.",
      rappel: [
        "Un carré dont on allonge le côté se découpe en quatre morceaux : le carré de départ, deux bandes égales le long des côtés, et un petit carré dans le coin.",
        "Les nombres se développent comme les lettres : j'écris un nombre comme une somme ou une différence avec un nombre rond, puis je fais les quatre produits.",
        "Je vérifie avec un nombre, puis je termine par une phrase qui répond à la question, avec l'unité.",
      ],
      exercices: [
        {
          titre: "Le tapis de judo",
          enonce:
            "En compétition de judo, la surface de combat est un carré, entouré d'une zone de sécurité de même largeur tout autour. On prend une surface de combat de $8$ m de côté et une zone de sécurité de $x$ m de large.\na) Exprimer le côté du tapis entier, puis son aire, en fonction de $x$. Développer l'aire.\nb) En déduire l'aire de la zone de sécurité seule.\nc) Le règlement demande au moins $3$ m de zone de sécurité. Calculer l'aire de la zone de sécurité pour $x = 3$, de deux façons.",
          correction:
            "a) La zone de sécurité s'ajoute des DEUX côtés : le côté du tapis entier mesure $8 + 2x$. Son aire est un carré, que j'écris comme un produit : $(8 + 2x)^2 = (8 + 2x)(8 + 2x) = 64 + 16x + 16x + 4x^2 = 64 + 32x + 4x^2$.\nb) J'enlève la surface de combat, $8^2 = 64$ m² : $64 + 32x + 4x^2 - 64 = 32x + 4x^2$.\nc) Avec la formule trouvée : $32 \\times 3 + 4 \\times 3^2 = 96 + 36 = 132$ m².\nAvec les dimensions : le tapis entier mesure $8 + 6 = 14$ m de côté, donc $14^2 - 64 = 196 - 64 = 132$ m². Les deux calculs concordent.\n⭐ Le dessin : la zone de sécurité, ce sont quatre bandes de $8x$ le long des côtés et quatre petits carrés de $x^2$ dans les coins : $4 \\times 8x + 4x^2 = 32x + 4x^2$. Chacun des produits $16x$ du calcul, ce sont deux de ces bandes.\n⛔ Le piège : n'ajouter $x$ qu'une fois et écrire $(8 + x)^2$. La zone de sécurité borde la surface de combat à gauche ET à droite, en haut ET en bas.\nRéponse : la zone de sécurité a une aire de $4x^2 + 32x$ m², soit $132$ m² pour $x = 3$.",
          schema: aires([["x", 40], ["8", 120], ["x", 40]], [["x", 40], ["8", 120], ["x", 40]], [["x²", "8x", "x²"], ["8x", "64", "8x"], ["x²", "8x", "x²"]]),
          micros: ["litteral_identite_developper", "litteral_identite_choisir"],
        },
        {
          titre: "Les trois plateaux de go",
          enonce:
            "Au jeu de go, on pose les pierres sur les intersections d'une grille carrée. Le grand plateau a $19$ lignes sur $19$ ; pour débuter, on joue sur $13$ lignes sur $13$, ou sur $9$ sur $9$.\na) Calculer de tête le nombre d'intersections du grand plateau, en écrivant $19 = 20 - 1$.\nb) Même question pour le plateau de $13$ sur $13$, en écrivant $13 = 10 + 3$.\nc) Combien d'intersections le grand plateau a-t-il de plus que celui de $13$ sur $13$ ? Vérifier avec le produit $(19 - 13)(19 + 13)$.\nd) Un joueur dit : « $19$, c'est à peu près le double de $9$, donc le grand plateau a à peu près deux fois plus d'intersections que le petit ». A-t-il raison ?",
          correction:
            "a) $19^2 = (20 - 1)(20 - 1) = 400 - 20 - 20 + 1 = 361$ intersections.\nb) $13^2 = (10 + 3)(10 + 3) = 100 + 30 + 30 + 9 = 169$ intersections.\nc) $361 - 169 = 192$. Et $(19 - 13)(19 + 13) = 6 \\times 32 = 192$ : on retrouve la même chose. Ce n'est pas un hasard : en faisant les quatre produits, $(19 - 13)(19 + 13) = 19^2 + 19 \\times 13 - 13 \\times 19 - 13^2 = 361 - 169$, et les deux produits du milieu s'annulent.\nd) Non. Le petit plateau a $9^2 = 81$ intersections, et $361 \\div 81$ vaut environ $4{,}5$ : le grand plateau en a plus de QUATRE fois plus. Quand le côté double, l'aire est multipliée par $4$, pas par $2$.\n⭐ Le dessin du a) : le carré de $20$ sur $20$, moins deux bandes de $20$, plus le petit carré de $1$ qu'on avait retiré deux fois.\n⛔ Le piège au a) : écrire $19^2 = 400 - 1 = 399$. On oublie les deux bandes de $20$, les deux produits du milieu.\nRéponse : le grand plateau a $361$ intersections, celui de $13$ sur $13$ en a $169$, soit $192$ de moins ; le grand plateau en a environ $4{,}5$ fois plus que le petit.",
          schema: aires([["20", 150], ["−1", 34]], [["20", 150], ["−1", 34]], [["400", "−20"], ["−20", "1"]]),
          micros: ["litteral_identite_developper", "litteral_identite_choisir", "litteral_identite_defi"],
        },
        {
          titre: "La réserve naturelle qui s'agrandit",
          enonce:
            "Une réserve naturelle a la forme d'un carré de $1$ km de côté. On l'agrandit : son côté augmente de $10$ % et passe à $1{,}1$ km.\na) Écrire $1{,}1^2$ sous la forme $(1 + 0{,}1)(1 + 0{,}1)$, et calculer l'aire de la nouvelle réserve.\nb) Un habitant dit : « le côté a augmenté de $10$ %, donc l'aire aussi ». A-t-il raison ? De quel pourcentage l'aire a-t-elle augmenté ?\nc) Quelques années plus tard, le côté augmente encore de $10$ % et passe à $1{,}21$ km. Calculer la nouvelle aire en écrivant $1{,}21 = 1{,}2 + 0{,}01$.",
          correction:
            "a) $1{,}1^2 = (1 + 0{,}1)(1 + 0{,}1) = 1 + 0{,}1 + 0{,}1 + 0{,}01 = 1{,}21$ km².\nb) Non. L'aire passe de $1$ km² à $1{,}21$ km² : elle augmente de $0{,}21$ km², soit $21$ %, et non $10$ %.\nLe dessin le montre : les deux bandes de $0{,}1$ km² font $20$ %, et le petit carré du coin, $0{,}01$ km², ajoute encore $1$ %.\nc) $1{,}21^2 = (1{,}2 + 0{,}01)(1{,}2 + 0{,}01) = 1{,}44 + 0{,}012 + 0{,}012 + 0{,}0001 = 1{,}4641$ km².\n⛔ Le piège : croire qu'un côté qui augmente de $10$ % donne une aire qui augmente de $10$ %. Le côté compte DEUX fois dans l'aire : il y a deux bandes, $20$ %, plus le petit carré du coin.\nRéponse : la réserve passe à $1{,}21$ km², soit $21$ % d'aire en plus ; puis à $1{,}4641$ km².",
          schema: aires([["1", 150], ["0,1", 40]], [["1", 150], ["0,1", 40]], [["1", "0,1"], ["0,1", "0,01"]]),
          micros: ["litteral_identite_developper", "litteral_identite_defi"],
        },
        {
          titre: "Le carreleur et la dalle manquante",
          enonce:
            "Un carreleur pose des dalles carrées, toutes identiques. Pour une terrasse carrée, il lui faut $30$ rangées de $30$ dalles. Le client change d'avis : il veut un rectangle de $31$ dalles sur $29$.\na) Combien de dalles faut-il pour chaque terrasse ? Calculer $31 \\times 29$ de tête, en écrivant $(30 + 1)(30 - 1)$.\nb) On note $n$ le nombre de dalles du côté du carré. Le rectangle a $n + 1$ dalles sur $n - 1$. Prouver qu'il faut toujours exactement une dalle de moins que pour le carré.\nc) Un autre client veut un rectangle de $32$ dalles sur $28$ au lieu du carré de $30$ sur $30$. Combien de dalles de moins ?",
          correction:
            "a) Le carré : $30^2 = 900$ dalles. Le rectangle : $31 \\times 29 = (30 + 1)(30 - 1) = 900 - 30 + 30 - 1 = 899$ dalles.\nb) Je reconnais deux parenthèses qui ne diffèrent que par un signe, et je fais les quatre produits : $(n + 1)(n - 1) = n^2 - n + n - 1 = n^2 - 1$. Le rectangle a donc toujours une dalle de moins que le carré de $n^2$ dalles, quelle que soit sa taille.\n⭐ Le dessin : la colonne ajoutée à droite ($+n$) et la rangée retirée en bas ($-n$) se compensent, mais la dalle du coin, elle, est retirée : $-1$.\nc) $32 \\times 28 = (30 + 2)(30 - 2) = 900 - 60 + 60 - 4 = 896$ dalles, soit $4$ dalles de moins.\n⛔ Le piège : croire que « une rangée de plus, une rangée de moins » ne change rien. Il manque toujours le petit carré du coin.\nRéponse : $900$ dalles pour le carré et $899$ pour le rectangle ; toujours une de moins, car $(n + 1)(n - 1) = n^2 - 1$ ; $4$ dalles de moins pour $32$ sur $28$.",
          schema: aires([["n", 120], ["1", 32]], [["n", 120], ["−1", 32]], [["n²", "n"], ["−n", "−1"]]),
          micros: ["litteral_identite_reconnaitre", "litteral_identite_developper", "litteral_identite_defi"],
        },
      ],
    },
  ],
};
