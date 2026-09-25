// ─── Fiche d'exercices : la distributivité (4e) — 20 exercices corrigés ───────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-distributivite.tsx` et sur
// les cinq micros du coach de 4e (notionId `litteral_distributivite`). L'angle
// de la 4e, comme le cours : DÉVELOPPER, c'est passer d'un produit à une somme,
// et tout tient dans un mot — CHAQUE. Le facteur multiplie chaque terme ; deux
// parenthèses font quatre produits ; on développe d'abord, on réduit ensuite.
// ⛔ On reste sur la distributivité : pas d'identité remarquable (aucun carré
// d'une somme à reconnaître), pas de factorisation à produire, pas d'équation à
// résoudre — chacune a sa propre feuille. « Reconnaître » veut dire ici : dire
// si une expression est un produit (à développer) ou une somme.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni 3(x + 4), 5(2x + 3),
// ni (x + 2)(x + 5), (x + 1)(x + 4), (x + 2)(x + 3), ni 2x + 5 + 3x, 2(x + 7),
// 5x + 3, ni −2(x + 5), 4x + 12 = 4(x + 3), ni 7 × 102, ni les barquettes de
// letchis. ⛔ Ni ceux de la feuille de 3e (7(x − 3), −4(2x − 5), 3x(x + 6),
// 12 − 2(x + 4), (x + 5)(x + 3), (2x − 1)(x + 4), (x + 4)(x − 2), le rectangle
// 2x + 3 sur x − 1, le cadre de 40 sur 30, le potager).
//
// Les pièges nommés : le terme constant qu'on oublie de multiplier (1, 8, 11,
// 14, 16, 18, 19), moins par moins (2, 4, 9, 10, 14), les deux produits du
// milieu oubliés (3, 7, 14, 15, 17), réduire avant de développer (5), confondre
// 4(x − 5) et 4x − 5 (6), un essai réussi pris pour une preuve (7, 20), le moins
// devant un produit qui ne change que le premier signe (13), 2x lu comme 2
// (15), les parenthèses oubliées dans un programme de calcul (12).
//
// Les chiffres du monde, et d'où ils viennent :
// - terrain de football de 105 m sur 68 m : les dimensions recommandées par la
//   FIFA (Football Stadiums, Technical Recommendations and Requirements, 5e éd.,
//   2011) ; les Lois du jeu de l'IFAB (Loi 1) permettent 100 à 110 m sur 64 à
//   75 m en match international — ex. 17 ; l'agrandissement est imaginé ;
// - degrés Fahrenheit : °F = 1,8 × °C + 32, la définition exacte de l'échelle
//   (0 °C = 32 °F, 100 °C = 212 °F) — ex. 18 ; les températures sont inventées ;
// - semi-marathon : 21,0975 km (World Athletics, règle des courses sur route),
//   arrondi à 21,1 km — ex. 19 ; le plan d'entraînement est inventé ;
// - le 1er septembre 2026 est un MARDI (calendrier grégorien ; le script de
//   recalcul le redemande à `Date`) — ex. 20.
// Tout le reste (terrasse, club de handball, programme de calcul) est inventé,
// à l'ordre de grandeur réel.
//
// ⭐⭐ LES SCHÉMAS (« les élèves adorent les schémas ») : LE MODÈLE DES AIRES.
// Un produit k(a + b) est l'aire d'un rectangle coupé en deux ; (a + b)(c + d)
// celle d'un rectangle coupé en quatre, un morceau par produit — le morceau
// qu'on oublie se VOIT. Les contrôles numériques sont posés dans une `trace`,
// les formes dans une grille, et le carré du calendrier est dessiné.
// 20 corrigés dessinés sur 20.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-distributivite-4e.mjs` —
// chaque forme est lue telle qu'elle est écrite et comparée à l'expression de
// départ en neuf valeurs de x ; chaque case des dessins d'aires est relue et
// recalculée comme « ligne × colonne » ; chaque tableau est rejoué.
//
// Les corrigés sont écrits à la première personne (« je développe »), comme les
// feuilles de 3e.
//
// Micro-compétences : litteral_distributivite_simple (1, 2, 5, 6, 7, 8, 9, 11,
// 12, 14, 15, 16, 18, 19), litteral_distributivite_double (3, 4, 6, 7, 10, 13,
// 14, 15, 17, 20), litteral_distributivite_reduire (4, 5, 9, 10, 12, 13, 17,
// 18, 19, 20), litteral_distributivite_reconnaitre (6, 15, 19),
// litteral_distributivite_defi (7, 11, 12, 13, 14, 17, 18, 19, 20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { tableau, trace } from "@/lib/fiches-exercices/figures";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// ⭐ LE MODÈLE DES AIRES (repris de la feuille de 3e) : un rectangle découpé.
// `haut` = les morceaux du côté du haut (étiquette, longueur dessinée), `cote` =
// ceux du côté gauche, `cases` = l'aire de chaque morceau, ligne par ligne. Un
// carré (même étiquette en ligne et en colonne) en bleu, un morceau négatif en
// rose, les autres en orange. Texte NU (x², pas `$`).
// ⛔ Le script de recalcul relit chaque appel `aires(…)` : l'écrire sur UNE
// ligne, en tableaux JSON, et chaque case doit valoir « ligne × colonne ».
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

/** Deux dessins côte à côte : l'un sous l'autre sur téléphone, côte à côte à
 *  partir de `sm` et sur papier (mesuré à 375 px, feuille de Pythagore 24/09). */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);

/** Une grille à DEUX colonnes (jamais trois : mesuré à 375 px), plusieurs
 *  lignes. ⛔ Texte nu, sans `$` : un canvas ne passe pas par KaTeX.
 *  ⛔ Le script de recalcul relit l'appel : UNE ligne, tableaux JSON. */
const grille = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((l) => ({ values: l })), display: { compact: true, striped: true } }} />
  </div>
);

// ⭐ LE MOIS DE SEPTEMBRE 2026, semaine commençant le lundi. Le 1er est un
// MARDI : il tombe dans la 2e colonne (décalage 1). Le carré entouré a ses deux
// diagonales en couleur : n et n + 8 en bleu, n + 1 et n + 7 en orange.
// ⛔ Le script de recalcul relit `DECALAGE` et le redemande à `Date`.
const DECALAGE = 1;
const calendrier = (n: number) => {
  const C = 32;
  const H = 26;
  const M = 7;
  const T = 24;
  const pos = (d: number) => {
    const k = DECALAGE + d - 1;
    return [M + (k % 7) * C, T + Math.floor(k / 7) * H];
  };
  const couleur = (d: number) => (d === n || d === n + 8 ? "#bfdbfe" : d === n + 1 || d === n + 7 ? "#fed7aa" : "#ffffff");
  const [x0, y0] = pos(n);
  return (
    <svg
      viewBox={`0 0 ${2 * M + 7 * C} ${T + 5 * H + 6}`}
      role="img"
      aria-label={`Calendrier de septembre 2026, le carré des dates ${n}, ${n + 1}, ${n + 7} et ${n + 8} entouré`}
      className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]"
    >
      {["L", "M", "M", "J", "V", "S", "D"].map((j, i) => (
        <text key={`j${i}`} x={M + i * C + C / 2} y={T - 8} textAnchor="middle" fontSize={13} fontWeight={700} fill="#1d4ed8">
          {j}
        </text>
      ))}
      {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
        const [x, y] = pos(d);
        return (
          <g key={d}>
            <rect x={x} y={y} width={C} height={H} fill={couleur(d)} stroke="#cbd5e1" strokeWidth={1} />
            <text x={x + C / 2} y={y + H / 2 + 5} textAnchor="middle" fontSize={13} fill="#0f172a">
              {d}
            </text>
          </g>
        );
      })}
      <rect x={x0} y={y0} width={2 * C} height={2 * H} fill="none" stroke="#dc2626" strokeWidth={2.5} />
    </svg>
  );
};

export const exercicesDistributivite4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "litteral-distributivite",
  titre: "La distributivité",
  accroche:
    "Vingt exercices, du geste seul au problème : développer avec un facteur devant la parenthèse, avec deux parenthèses, réduire ensuite, reconnaître une forme à développer, et démasquer les erreurs. Puis une terrasse, un terrain de football qu'on agrandit, un thermomètre américain, un plan d'entraînement et un tour de magie caché dans le calendrier. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec le pourquoi, le piège nommé, et presque toujours un dessin où chaque produit devient une aire.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/litteral-distributivite", titre: "La distributivité" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris tous les produits avant de réduire.",
      rappel: [
        "DÉVELOPPER, c'est transformer un produit en somme. Le facteur devant la parenthèse multiplie CHAQUE terme : $k(a + b) = ka + kb$.",
        "Le signe devant le facteur part avec lui, et j'applique la règle des signes : $-3(a - b) = -3a + 3b$.",
        "Deux parenthèses : chaque terme de la première multiplie chaque terme de la seconde, soit QUATRE produits : $(a + b)(c + d) = ac + ad + bc + bd$.",
        "RÉDUIRE : je regroupe les termes de la même famille, les $x^2$ ensemble, les $x$ ensemble, les nombres ensemble.",
      ],
      exercices: [
        {
          enonce: "Développer.\na) $6(x + 2)$\nb) $4(3x + 5)$\nc) $8(x - 3)$\nd) $x(x + 7)$",
          correction:
            "Le facteur devant la parenthèse multiplie CHAQUE terme de la parenthèse : la lettre ET le nombre.\na) $6(x + 2) = 6 \\times x + 6 \\times 2 = 6x + 12$.\nb) $4(3x + 5) = 4 \\times 3x + 4 \\times 5 = 12x + 20$.\nc) $8(x - 3) = 8 \\times x - 8 \\times 3 = 8x - 24$.\nd) $x(x + 7) = x \\times x + x \\times 7 = x^2 + 7x$.\n⭐ Le dessin du a) : un rectangle de hauteur $6$ et de longueur $x + 2$, coupé en deux. Le morceau de gauche a pour aire $6x$, celui de droite $6 \\times 2 = 12$.\n⛔ Le piège : écrire $6(x + 2) = 6x + 2$. Le $2$ est dans la parenthèse : il est multiplié par $6$ lui aussi, c'est le morceau de droite du dessin.\nRéponse : $6x + 12$ ; $12x + 20$ ; $8x - 24$ ; $x^2 + 7x$.",
          schema: aires([["x", 110], ["2", 40]], [["6", 60]], [["6x", "12"]]),
          micros: ["litteral_distributivite_simple"],
        },
        {
          enonce: "Développer. Attention aux signes.\na) $-3(x + 6)$\nb) $-5(2x - 4)$\nc) $-(x - 9)$\nd) $-7(1 - x)$",
          correction:
            "Le signe moins fait partie du facteur : il part avec lui et multiplie chaque terme. J'applique la règle des signes à chaque produit.\na) $-3(x + 6) = -3 \\times x + (-3) \\times 6 = -3x - 18$.\nb) $-5(2x - 4) = -5 \\times 2x + (-5) \\times (-4) = -10x + 20$.\nc) Le moins seul, c'est un facteur $-1$ : $-(x - 9) = -1 \\times x + (-1) \\times (-9) = -x + 9$.\nd) $-7(1 - x) = -7 \\times 1 + (-7) \\times (-x) = -7 + 7x$.\n⭐ Le dessin du a) : les deux morceaux sont roses, car $-3$ fois $x$ et $-3$ fois $6$ sont tous les deux négatifs.\n⛔ Le piège au b) : écrire $-10x - 20$. Moins par moins donne plus : $(-5) \\times (-4) = 20$.\nRéponse : $-3x - 18$ ; $-10x + 20$ ; $-x + 9$ ; $-7 + 7x$.",
          schema: aires([["x", 110], ["6", 60]], [["−3", 45]], [["−3x", "−18"]]),
          micros: ["litteral_distributivite_simple"],
        },
        {
          enonce: "On veut développer $(x + 6)(x + 4)$.\na) Combien de produits faut-il effectuer ?\nb) Écrire ces produits, puis réduire.",
          correction:
            "a) Chaque terme de la première parenthèse multiplie chaque terme de la seconde : $2$ termes fois $2$ termes, soit $2 \\times 2 = 4$ produits.\nb) Je les écris dans l'ordre, sans en sauter : $x \\times x = x^2$, $x \\times 4 = 4x$, $6 \\times x = 6x$ et $6 \\times 4 = 24$.\nPuis je regroupe les deux termes en $x$ : $(x + 6)(x + 4) = x^2 + 4x + 6x + 24 = x^2 + 10x + 24$.\n⭐ Le dessin : le rectangle de côtés $x + 6$ et $x + 4$ se découpe en quatre morceaux, un par produit. Son aire est la somme des quatre.\n⛔ Le piège : ne faire que deux produits, « le premier avec le premier, le dernier avec le dernier », et écrire $x^2 + 24$. Il manque les deux rectangles orange, $6x$ et $4x$.\nRéponse : $4$ produits ; $(x + 6)(x + 4) = x^2 + 10x + 24$.",
          schema: aires([["x", 110], ["6", 60]], [["x", 110], ["4", 40]], [["x²", "6x"], ["4x", "24"]]),
          micros: ["litteral_distributivite_double"],
        },
        {
          enonce: "Développer et réduire.\na) $(x + 7)(x - 2)$\nb) $(3x + 1)(x + 5)$",
          correction:
            "Quatre produits, chacun avec son signe, puis je regroupe les termes en $x$.\na) $(x + 7)(x - 2) = x^2 - 2x + 7x - 14 = x^2 + 5x - 14$.\nb) $(3x + 1)(x + 5) = 3x^2 + 15x + x + 5 = 3x^2 + 16x + 5$.\n⭐ Le dessin du a) : le côté $x - 2$ s'écrit $x$ puis $-2$. Les deux morceaux de la ligne $-2$ sont négatifs, en rose.\n⛔ Le piège au a) : écrire $+14$ à la fin. Le dernier produit est $7 \\times (-2) = -14$ : le moins du $-2$ voyage avec lui.\nRéponse : $x^2 + 5x - 14$ ; $3x^2 + 16x + 5$.",
          schema: aires([["x", 110], ["7", 70]], [["x", 110], ["−2", 35]], [["x²", "7x"], ["−2x", "−14"]]),
          micros: ["litteral_distributivite_double", "litteral_distributivite_reduire"],
        },
        {
          enonce: "Développer, puis réduire.\na) $5(x + 2) + 3x$\nb) $4(2x - 1) - 5x$\nc) $2(x + 3) + 4(x - 1)$",
          correction:
            "Deux gestes, dans cet ordre : je développe d'abord, je regroupe ensuite les termes de la même famille.\na) $5(x + 2) + 3x = 5x + 10 + 3x = 8x + 10$.\nb) $4(2x - 1) - 5x = 8x - 4 - 5x = 3x - 4$.\nc) $2(x + 3) + 4(x - 1) = 2x + 6 + 4x - 4 = 6x + 2$.\n⭐ Le tableau contrôle le c) : pour $x = 0$, $x = 1$ et $x = 5$, la forme de départ et la forme réduite donnent le même nombre.\n⛔ Le piège au a) : ajouter le $3x$ au $x$ de la parenthèse AVANT de développer, et écrire $5(4x + 2)$. La multiplication passe avant l'addition : je développe d'abord.\nRéponse : $8x + 10$ ; $3x - 4$ ; $6x + 2$.",
          schema: trace(["x", "2(x + 3) + 4(x − 1)", "6x + 2"], [[0, 2, 2], [1, 8, 8], [5, 32, 32]]),
          micros: ["litteral_distributivite_reduire", "litteral_distributivite_simple"],
        },
        {
          enonce:
            "Pour chaque expression, dire si c'est un produit (à développer) ou une somme. Puis développer et réduire celles qui contiennent encore une parenthèse à ouvrir.\n$A = 4(x - 5)$ ; $B = 4x - 5$ ; $C = (x + 3)(2x - 1)$ ; $D = x^2 + 9x$ ; $E = 7 + 2(x + 1)$",
          correction:
            "Je cherche la DERNIÈRE opération qu'on ferait en remplaçant $x$ par un nombre : c'est elle qui donne la forme.\n$A$ : on calcule la parenthèse, puis on multiplie par $4$. C'est un produit : $A = 4x - 20$.\n$B$ : la dernière opération est la soustraction. C'est une somme, il n'y a rien à ouvrir.\n$C$ : deux parenthèses multipliées, c'est un produit. $C = 2x^2 - x + 6x - 3 = 2x^2 + 5x - 3$.\n$D$ : une somme, déjà développée.\n$E$ : la dernière opération est l'addition, c'est une somme. Mais l'un de ses termes est un produit : il reste une parenthèse à ouvrir. $E = 7 + 2x + 2 = 2x + 9$.\n⛔ Le piège : confondre $A$ et $B$. Dans $4(x - 5)$, le $4$ multiplie aussi le $5$ ; dans $4x - 5$, il ne touche que $x$. Pour $x = 0$ : $A = -20$, mais $B = -5$.\nRéponse : $A$ et $C$ sont des produits ; $B$, $D$ et $E$ sont des sommes ; $A = 4x - 20$, $C = 2x^2 + 5x - 3$ et $E = 2x + 9$.",
          schema: grille(["Expression", "Sa forme"], [["4(x − 5)", "produit"], ["4x − 5", "somme"], ["(x + 3)(2x − 1)", "produit"], ["x² + 9x", "somme"], ["7 + 2(x + 1)", "somme à ouvrir"]]),
          micros: ["litteral_distributivite_reconnaitre", "litteral_distributivite_simple", "litteral_distributivite_double"],
        },
        {
          enonce:
            "Un élève a développé trois expressions. Remplacer $x$ par $2$ des deux côtés pour savoir si chaque égalité est juste, puis corriger celles qui sont fausses.\na) $5(x + 3) = 5x + 3$\nb) $(x + 6)(x + 3) = x^2 + 18$\nc) $3(2x - 5) = 6x - 15$",
          correction:
            "Je remplace $x$ par $2$ à gauche ET à droite. Deux résultats différents : l'égalité est fausse, sans discussion.\na) À gauche : $5(2 + 3) = 5 \\times 5 = 25$. À droite : $5 \\times 2 + 3 = 13$. FAUX : le $3$ n'a pas été multiplié. Correction : $5(x + 3) = 5x + 15$.\nb) À gauche : $(2 + 6)(2 + 3) = 8 \\times 5 = 40$. À droite : $2^2 + 18 = 22$. FAUX : il manque les deux produits du milieu. Correction : $(x + 6)(x + 3) = x^2 + 3x + 6x + 18 = x^2 + 9x + 18$.\nc) À gauche : $3(2 \\times 2 - 5) = 3 \\times (-1) = -3$. À droite : $6 \\times 2 - 15 = -3$. Les deux côtés sont égaux. Je le confirme en développant : $3(2x - 5) = 6x - 15$. JUSTE.\n⛔ Le piège : conclure « juste » après un seul essai réussi. Un essai qui rate prouve « faux » ; un essai qui marche ne prouve rien, c'est le développement qui prouve.\nRéponse : a) faux, $5x + 15$ ; b) faux, $x^2 + 9x + 18$ ; c) juste.",
          schema: trace(["x = 2", "à gauche", "à droite"], [["a)", 25, 13], ["b)", 40, 22], ["c)", "−3", "−3"]]),
          micros: ["litteral_distributivite_defi", "litteral_distributivite_simple", "litteral_distributivite_double"],
        },
        {
          enonce: "Calculer de tête, en coupant un des deux nombres.\na) $6 \\times 103$\nb) $9 \\times 48$\nc) $25 \\times 12$\nd) $15 \\times 99$",
          correction:
            "La distributivité marche aussi avec des nombres. Je coupe le nombre compliqué en un nombre rond plus (ou moins) un petit, et je multiplie CHAQUE morceau.\na) $6 \\times 103 = 6 \\times (100 + 3) = 600 + 18 = 618$.\nb) $9 \\times 48 = 9 \\times (50 - 2) = 450 - 18 = 432$.\nc) $25 \\times 12 = 25 \\times (10 + 2) = 250 + 50 = 300$.\nd) $15 \\times 99 = 15 \\times (100 - 1) = 1\\,500 - 15 = 1\\,485$.\n⭐ Le dessin du a) : le rectangle de $6$ sur $103$ se coupe en un grand morceau de $600$ et une bande de $18$.\n⛔ Le piège au a) : écrire $6 \\times 100 + 3 = 603$. Le $3$ aussi doit être multiplié par $6$ : c'est la petite bande du dessin.\nRéponse : $618$ ; $432$ ; $300$ ; $1\\,485$.",
          schema: aires([["100", 150], ["3", 30]], [["6", 50]], [["600", "18"]]),
          micros: ["litteral_distributivite_simple"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je développe chaque morceau à part, puis je réduis et je contrôle avec un nombre.",
      rappel: [
        "Je développe chaque produit À PART, avec le signe qui le précède, puis je réduis.",
        "Un moins devant une parenthèse change le signe de TOUS ses termes : $-(a + b - c) = -a - b + c$.",
        "Pour contrôler, je remplace $x$ par un nombre dans la forme de départ et dans la forme finale : les deux résultats doivent être égaux.",
      ],
      exercices: [
        {
          enonce: "On donne $A = 3(2x + 5) - 4(x - 2)$.\na) Développer et réduire $A$.\nb) Calculer $A$ pour $x = 10$, de deux façons.",
          correction:
            "a) Je développe chaque produit À PART, avec le signe qui le précède : le facteur du second produit est $-4$, pas $4$.\n$3(2x + 5) = 6x + 15$.\n$-4(x - 2) = -4 \\times x + (-4) \\times (-2) = -4x + 8$.\nJe rassemble et je réduis : $A = 6x + 15 - 4x + 8 = 2x + 23$.\nb) Avec la forme de départ : $3(2 \\times 10 + 5) - 4(10 - 2) = 75 - 32 = 43$. Avec la forme réduite : $2 \\times 10 + 23 = 43$. Les deux concordent.\n⭐ Les deux dessins : à gauche, trois fois $2x + 5$ ; à droite, le facteur $-4$ rend le premier morceau négatif et le second positif, car $(-4) \\times (-2) = 8$.\n⛔ Le piège : écrire $-4x - 8$. Moins par moins donne plus : c'est le terme qu'on perd le plus souvent.\nRéponse : $A = 2x + 23$ ; pour $x = 10$, $A = 43$.",
          schema: deux(aires([["2x", 120], ["5", 50]], [["3", 45]], [["6x", "15"]]), aires([["x", 90], ["−2", 50]], [["−4", 50]], [["−4x", "8"]])),
          micros: ["litteral_distributivite_simple", "litteral_distributivite_reduire"],
        },
        {
          enonce: "Développer et réduire.\na) $B = (2x - 3)(x + 4)$\nb) $C = (x - 6)(x - 1)$",
          correction:
            "Quatre produits dans chaque cas. J'écris chaque terme AVEC son signe, et je fais le produit des signes.\na) $B = (2x - 3)(x + 4) = 2x^2 + 8x - 3x - 12 = 2x^2 + 5x - 12$.\nb) $C = (x - 6)(x - 1) = x^2 - x - 6x + 6 = x^2 - 7x + 6$.\n⭐ Le dessin du b) : les deux côtés ont un morceau négatif. Les rectangles $-6x$ et $-x$ sont roses ; le petit rectangle $(-1) \\times (-6) = 6$ redevient positif.\n⛔ Le piège au b) : écrire $-6$ à la fin. Le dernier produit est $(-6) \\times (-1)$ : moins par moins, il est positif.\nRéponse : $B = 2x^2 + 5x - 12$ ; $C = x^2 - 7x + 6$.",
          schema: aires([["x", 110], ["−6", 60]], [["x", 110], ["−1", 30]], [["x²", "−6x"], ["−x", "6"]]),
          micros: ["litteral_distributivite_double", "litteral_distributivite_reduire"],
        },
        {
          enonce:
            "Une terrasse rectangulaire mesure $4$ m de large et $x + 6$ mètres de long.\na) Exprimer son aire en fonction de $x$, et la développer.\nb) Exprimer son périmètre en fonction de $x$, et le réduire.\nc) Calculer l'aire et le périmètre pour $x = 2{,}5$.",
          correction:
            "a) L'aire d'un rectangle, c'est longueur × largeur : $4(x + 6) = 4x + 24$, en m².\nb) Le périmètre fait le tour : deux longueurs et deux largeurs. $2(x + 6) + 2 \\times 4 = 2x + 12 + 8 = 2x + 20$, en m.\nc) Pour $x = 2{,}5$ : l'aire vaut $4 \\times 2{,}5 + 24 = 34$ m², le périmètre $2 \\times 2{,}5 + 20 = 25$ m.\n⭐ Contrôle avec les vraies dimensions : pour $x = 2{,}5$, la terrasse mesure $8{,}5$ m sur $4$ m, et $8{,}5 \\times 4 = 34$.\n⛔ Le piège : écrire l'aire $4x + 6$. Le dessin montre deux morceaux : $4$ fois $x$, ET $4$ fois $6$, soit $24$ m².\nRéponse : aire $4x + 24$ m² ; périmètre $2x + 20$ m ; pour $x = 2{,}5$, $34$ m² et $25$ m.",
          schema: aires([["x", 110], ["6", 80]], [["4", 55]], [["4x", "24"]]),
          micros: ["litteral_distributivite_simple", "litteral_distributivite_defi"],
        },
        {
          enonce:
            "Voici un programme de calcul.\n• Choisir un nombre.\n• Lui ajouter $3$.\n• Multiplier le résultat par $4$.\n• Soustraire le double du nombre de départ.\na) Tester le programme avec $5$, puis avec $-1$.\nb) On note $x$ le nombre de départ. Écrire le résultat en fonction de $x$, puis le développer et le réduire.\nc) Tom affirme : « le résultat, c'est toujours le double du nombre de départ, plus $12$ ». A-t-il raison ?",
          correction:
            "a) Avec $5$ : $5 + 3 = 8$, puis $8 \\times 4 = 32$, puis $32 - 2 \\times 5 = 22$.\nAvec $-1$ : $-1 + 3 = 2$, puis $2 \\times 4 = 8$, puis $8 - 2 \\times (-1) = 8 + 2 = 10$.\nb) J'écris chaque étape avec $x$ : $x + 3$, puis $4(x + 3)$, puis $4(x + 3) - 2x$.\nJe développe et je réduis : $4(x + 3) - 2x = 4x + 12 - 2x = 2x + 12$.\nc) $2x + 12$, c'est le double de $x$, plus $12$ : Tom a raison, et le calcul du b) le prouve pour TOUS les nombres.\n⭐ Le tableau teste quatre nombres : chaque résultat vaut bien le double du nombre choisi, plus $12$.\n⛔ Le piège au b) : écrire $4 \\times x + 3$, sans parenthèses. C'est TOUT le résultat $x + 3$ qui est multiplié par $4$, pas seulement $x$.\nRéponse : $22$ et $10$ ; le résultat vaut $2x + 12$ ; Tom a raison.",
          schema: tableau(["Nombre choisi", "5", "−1", "0", "10"], ["Résultat", 22, 10, 12, 32]),
          micros: ["litteral_distributivite_simple", "litteral_distributivite_reduire", "litteral_distributivite_defi"],
        },
        {
          enonce: "Développer et réduire $D = (x + 4)(x + 5) - (x + 1)(x + 2)$.",
          correction:
            "Je développe chaque produit À PART, et je garde le second entre parenthèses : le moins devant lui porte sur TOUT son développement.\n$(x + 4)(x + 5) = x^2 + 5x + 4x + 20 = x^2 + 9x + 20$.\n$(x + 1)(x + 2) = x^2 + 2x + x + 2 = x^2 + 3x + 2$.\n$D = (x^2 + 9x + 20) - (x^2 + 3x + 2) = x^2 + 9x + 20 - x^2 - 3x - 2 = 6x + 18$.\n⭐ Contrôle avec $x = 0$ : $4 \\times 5 - 1 \\times 2 = 20 - 2 = 18$, et $6 \\times 0 + 18 = 18$.\n⭐ Les deux dessins : les deux carrés $x^2$ sont les mêmes, ils s'annulent dans la différence ; il ne reste que des $x$ et des nombres.\n⛔ Le piège : écrire $- x^2 + 3x + 2$, en ne changeant que le premier signe. Le moins change le signe de TOUS les termes de la parenthèse : $-3x$ et $-2$.\nRéponse : $D = 6x + 18$.",
          schema: deux(aires([["x", 90], ["5", 50]], [["x", 90], ["4", 40]], [["x²", "5x"], ["4x", "20"]]), aires([["x", 90], ["2", 32]], [["x", 90], ["1", 24]], [["x²", "2x"], ["x", "2"]])),
          micros: ["litteral_distributivite_double", "litteral_distributivite_reduire", "litteral_distributivite_defi"],
        },
        {
          enonce:
            "Trois élèves ont développé. Trouver l'erreur de chacun, puis écrire le bon développement.\na) Inès : $7(x - 2) = 7x - 2$\nb) Hugo : $-3(x - 4) = -3x - 12$\nc) Sami : $(x + 3)(x + 7) = x^2 + 21$",
          correction:
            "Pour chaque ligne, je cherche QUEL produit manque ou est faux, puis je refais le développement complet.\na) Inès n'a multiplié que le $x$ : le $2$ aussi est multiplié par $7$. $7(x - 2) = 7x - 14$.\nb) Hugo a oublié la règle des signes dans le second produit : $(-3) \\times (-4) = 12$. $-3(x - 4) = -3x + 12$.\nc) Sami n'a fait que deux produits sur quatre. $(x + 3)(x + 7) = x^2 + 7x + 3x + 21 = x^2 + 10x + 21$.\n⭐ Le tableau met chaque erreur face à sa correction. Pour $x = 1$, l'écriture de l'élève et la bonne donnent deux nombres différents : $5$ contre $-7$, $-15$ contre $9$, $22$ contre $32$.\n⛔ Le piège : corriger à moitié, par exemple écrire $x^2 + 7x + 21$ pour Sami. Il faut les QUATRE produits, puis réduire.\nRéponse : a) $7x - 14$ ; b) $-3x + 12$ ; c) $x^2 + 10x + 21$.",
          schema: grille(["Écrit par l'élève", "Juste"], [["7x − 2", "7x − 14"], ["−3x − 12", "−3x + 12"], ["x² + 21", "x² + 10x + 21"]]),
          micros: ["litteral_distributivite_defi", "litteral_distributivite_simple", "litteral_distributivite_double"],
        },
        {
          enonce:
            "Relier chaque forme factorisée à sa forme développée. Attention : une forme développée est en trop.\nFormes factorisées : $A = 2(x + 6)$ ; $B = (x + 2)(x + 6)$ ; $C = 2x(x + 6)$ ; $D = (x + 6)(x - 2)$.\nFormes développées : $x^2 + 4x - 12$ ; $2x + 12$ ; $x^2 + 12$ ; $2x^2 + 12x$ ; $x^2 + 8x + 12$.",
          correction:
            "Je ne devine pas : je développe chaque forme factorisée, puis je cherche le résultat dans la liste.\n$A = 2(x + 6) = 2x + 12$.\n$B = (x + 2)(x + 6) = x^2 + 6x + 2x + 12 = x^2 + 8x + 12$.\n$C = 2x(x + 6) = 2x^2 + 12x$.\n$D = (x + 6)(x - 2) = x^2 - 2x + 6x - 12 = x^2 + 4x - 12$.\nL'intrus est $x^2 + 12$ : c'est le faux développement de $B$, où l'on n'a multiplié que les premiers termes entre eux et les derniers entre eux.\n⛔ Le piège : relier $C$ à $2x + 12$, en lisant $2x$ comme $2$. Dans $2x(x + 6)$, le facteur $2x$ multiplie aussi $x$, ce qui donne $2x^2$.\nRéponse : $A$ va avec $2x + 12$, $B$ avec $x^2 + 8x + 12$, $C$ avec $2x^2 + 12x$, $D$ avec $x^2 + 4x - 12$ ; $x^2 + 12$ est l'intrus.",
          schema: grille(["Factorisée", "Développée"], [["2(x + 6)", "2x + 12"], ["(x + 2)(x + 6)", "x² + 8x + 12"], ["2x(x + 6)", "2x² + 12x"], ["(x + 6)(x − 2)", "x² + 4x − 12"], ["intrus", "x² + 12"]]),
          micros: ["litteral_distributivite_reconnaitre", "litteral_distributivite_double", "litteral_distributivite_simple"],
        },
        {
          enonce:
            "Pour la rentrée, les $24$ joueuses d'un club de handball commandent chacune un maillot à $x$ euros et un short à $12$ euros.\na) Écrire le prix total de la commande en fonction de $x$, sous la forme d'un produit.\nb) Développer cette expression. Que représente chacun des deux termes ?\nc) Le maillot coûte $18{,}50$ €. Calculer le prix total de deux façons.",
          correction:
            "a) Une joueuse paie $x + 12$ euros. Pour $24$ joueuses : $24(x + 12)$.\nb) $24(x + 12) = 24x + 288$. Le terme $24x$ est le prix des $24$ maillots ; le terme $288$ est le prix des $24$ shorts, car $24 \\times 12 = 288$.\nc) Avec le produit : une tenue coûte $18{,}50 + 12 = 30{,}50$ €, et $24 \\times 30{,}50 = 732$ €.\nAvec la forme développée : $24 \\times 18{,}50 + 288 = 444 + 288 = 732$ €. Les deux calculs concordent.\n⭐ Le dessin : un rectangle de $24$ de haut, coupé en deux morceaux, les maillots à gauche et les shorts à droite.\n⛔ Le piège : écrire $24x + 12$. Ce serait $24$ maillots, mais UN seul short.\nRéponse : $24(x + 12) = 24x + 288$ ; la commande coûte $732$ €.",
          schema: aires([["x", 100], ["12", 70]], [["24", 60]], [["24x", "288"]]),
          micros: ["litteral_distributivite_simple"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je traduis avec une lettre, je développe, puis je réponds par une phrase.",
      rappel: [
        "Je nomme le nombre inconnu avec une lettre, j'écris l'expression sous forme de PRODUIT, puis je la développe et je la réduis.",
        "L'aire d'un rectangle découpé en morceaux est la somme des aires des morceaux : c'est le dessin de la distributivité.",
        "Des essais ne prouvent rien ; un calcul avec la lettre prouve pour tous les nombres.",
      ],
      exercices: [
        {
          titre: "Le terrain qui s'agrandit",
          enonce:
            "La pelouse d'un stade mesure $105$ m de long et $68$ m de large, les dimensions recommandées par la FIFA. Pour la protéger, on veut l'agrandir de $x$ mètres en longueur ET de $x$ mètres en largeur.\na) Écrire l'aire de la nouvelle pelouse sous la forme d'un produit.\nb) Développer et réduire cette aire.\nc) Un conseiller affirme : « avec $x = 2$, on gagne $2 \\times 105 + 2 \\times 68 = 346$ m² ». Calculer l'aire gagnée. A-t-il raison ?",
          correction:
            "a) La nouvelle pelouse mesure $105 + x$ sur $68 + x$ : son aire est $(105 + x)(68 + x)$ m².\nb) Quatre produits : $(105 + x)(68 + x) = 7\\,140 + 105x + 68x + x^2 = x^2 + 173x + 7\\,140$.\nc) Pour $x = 2$ : $2^2 + 173 \\times 2 + 7\\,140 = 4 + 346 + 7\\,140 = 7\\,490$ m². L'aire gagnée est $7\\,490 - 7\\,140 = 350$ m².\nJe contrôle avec les vraies dimensions : $107 \\times 70 = 7\\,490$.\nLe conseiller a presque raison, mais il oublie $4$ m² : le petit carré du coin, $x \\times x$ avec $x = 2$.\n⭐ Le dessin : l'ancienne pelouse ($7\\,140$ m²), deux bandes ($68x$ et $105x$) et, dans le coin, le petit carré $x^2$ qu'on oublie.\n⛔ Le piège : ne compter que les deux bandes. Quand on allonge DEUX côtés, le coin s'ajoute aussi : c'est le quatrième produit, $x \\times x$.\nRéponse : l'aire vaut $x^2 + 173x + 7\\,140$ m² ; pour $x = 2$, on gagne $350$ m², pas $346$.",
          schema: aires([["105", 150], ["x", 40]], [["68", 97], ["x", 40]], [["7 140", "68x"], ["105x", "x²"]]),
          micros: ["litteral_distributivite_double", "litteral_distributivite_reduire", "litteral_distributivite_defi"],
        },
        {
          titre: "Le thermomètre américain",
          enonce:
            "Aux États-Unis, la température se donne en degrés Fahrenheit (°F). Pour convertir une température de $t$ degrés Celsius, on calcule $1{,}8 \\times t + 32$.\nUn jour d'été, il fait $x$ °C à $8$ h. À $15$ h, il fait $10$ °C de plus.\na) Écrire la température de $15$ h en °F, en fonction de $x$, puis la développer et la réduire.\nb) De combien de degrés Fahrenheit la température a-t-elle monté entre $8$ h et $15$ h ?\nc) Pour $x = 30$, calculer la température de $15$ h en °F, de deux façons.",
          correction:
            "a) À $15$ h, il fait $x + 10$ °C. Je remplace $t$ par $x + 10$, AVEC des parenthèses : $1{,}8(x + 10) + 32$.\nJe développe et je réduis : $1{,}8(x + 10) + 32 = 1{,}8x + 18 + 32 = 1{,}8x + 50$.\nb) À $8$ h, il fait $1{,}8x + 32$ °F. L'écart : $(1{,}8x + 50) - (1{,}8x + 32) = 18$. La température a monté de $18$ °F, quelle que soit celle du matin.\nc) Avec la forme de départ : $1{,}8 \\times (30 + 10) + 32 = 72 + 32 = 104$ °F. Avec la forme réduite : $1{,}8 \\times 30 + 50 = 54 + 50 = 104$ °F.\n⭐ Le tableau le montre sur trois journées : l'écart est toujours de $18$ °F. Un degré Celsius vaut $1{,}8$ degré Fahrenheit, donc $10$ degrés Celsius en valent $18$.\n⛔ Le piège : écrire $1{,}8x + 10 + 32$, sans parenthèses. Les $10$ degrés de plus sont aussi multipliés par $1{,}8$.\nRéponse : $1{,}8x + 50$ °F ; la température monte de $18$ °F ; $104$ °F pour $x = 30$.",
          schema: trace(["x (°C)", "8 h (°F)", "15 h (°F)"], [[5, 41, 59], [20, 68, 86], [30, 86, 104]]),
          micros: ["litteral_distributivite_simple", "litteral_distributivite_reduire", "litteral_distributivite_defi"],
        },
        {
          titre: "La semaine d'entraînement",
          enonce:
            "Pour préparer un semi-marathon ($21{,}1$ km), Inès court trois fois par semaine $x + 5$ kilomètres, puis fait une sortie longue de $2x$ kilomètres.\na) Écrire la distance totale de la semaine en fonction de $x$, puis la développer et la réduire.\nb) Sa copine Lina écrit la distance totale $5(x + 3)$. Développer l'expression de Lina : a-t-elle raison ?\nc) Quelle distance Inès court-elle dans la semaine où $x = 8$ ?",
          correction:
            "a) Les trois sorties font $3(x + 5)$ km, la sortie longue $2x$ km. Total : $3(x + 5) + 2x = 3x + 15 + 2x = 5x + 15$.\nb) Je développe l'expression de Lina : $5(x + 3) = 5x + 15$. C'est la même expression que la mienne : Lina a raison. Elle a écrit un produit (la forme factorisée), j'ai écrit une somme (la forme développée).\nc) Pour $x = 8$ : $5 \\times 8 + 15 = 55$ km. Je contrôle sortie par sortie : trois fois $13$ km, plus $16$ km, soit $3 \\times 13 + 16 = 39 + 16 = 55$ km.\n⭐ Le dessin : les trois sorties forment un rectangle de $3$ sur $x + 5$ ; le tableau donne le total de quatre semaines.\n⛔ Le piège : écrire $3x + 5 + 2x$. Chacune des trois sorties fait $5$ km de plus que $x$ : les $5$ km comptent trois fois.\nRéponse : $5x + 15$ km ; Lina a raison, car $5(x + 3) = 5x + 15$ ; $55$ km pour $x = 8$.",
          schema: deux(aires([["x", 100], ["5", 60]], [["3", 45]], [["3x", "15"]]), tableau(["x", "5", "6", "7", "8"], ["Total (km)", 40, 45, 50, 55])),
          micros: ["litteral_distributivite_simple", "litteral_distributivite_reduire", "litteral_distributivite_reconnaitre", "litteral_distributivite_defi"],
        },
        {
          titre: "Le carré du calendrier",
          enonce:
            "Sur une page de calendrier, on entoure un carré de quatre dates, comme $9$, $10$, $16$ et $17$ en septembre 2026. On multiplie les deux dates de chaque diagonale, puis on calcule la différence : $10 \\times 16 - 9 \\times 17$.\na) Calculer cette différence. Recommencer avec le carré $3$, $4$, $10$, $11$.\nb) On note $n$ la date en haut à gauche du carré. Exprimer les trois autres dates en fonction de $n$.\nc) Prouver que la différence vaut toujours $7$.",
          correction:
            "a) $10 \\times 16 - 9 \\times 17 = 160 - 153 = 7$. Avec l'autre carré : $4 \\times 10 - 3 \\times 11 = 40 - 33 = 7$. Encore $7$.\nb) Sur un calendrier, la date de droite vaut un de plus, et celle du dessous sept de plus (une semaine). Les quatre dates sont $n$, $n + 1$, $n + 7$ et $n + 8$.\nc) La différence s'écrit $(n + 1)(n + 7) - n(n + 8)$.\nJe développe chaque produit : $(n + 1)(n + 7) = n^2 + 7n + n + 7 = n^2 + 8n + 7$, et $n(n + 8) = n^2 + 8n$.\nDonc $(n + 1)(n + 7) - n(n + 8) = n^2 + 8n + 7 - n^2 - 8n = 7$. Les $n^2$ et les $8n$ disparaissent : il reste toujours $7$.\n⭐ Le dessin : les dates d'une diagonale sont en bleu, celles de l'autre en orange. Le tableau essaie d'autres carrés du mois ; seul le calcul du c) prouve que ça marche pour TOUS.\n⛔ Le piège : conclure après deux essais. Des essais montrent des exemples ; le calcul avec la lettre $n$ prouve pour toutes les dates.\nRéponse : la différence vaut toujours $7$, car $(n + 1)(n + 7) - n(n + 8) = 7$.",
          schema: deux(calendrier(9), tableau(["n", "3", "9", "14", "22"], ["Différence", 7, 7, 7, 7])),
          micros: ["litteral_distributivite_double", "litteral_distributivite_reduire", "litteral_distributivite_defi"],
        },
      ],
    },
  ],
};
