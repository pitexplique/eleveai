// ─── Fiche d'exercices : la dérivation (1re, sans spécialité) ─────────────────
//                              20 exercices corrigés
//
// Première feuille de la première SANS spé (28/09/2026), écrite avec celle de
// 1re spé : une feuille « Dérivation » par classe. Le coach de première a six
// notions (lire un graphique · nombre dérivé et tangente · formules de base ·
// polynômes · signe · tableau de variations) ; le bouton « Exercices » de
// chacune mène ici (`notionsCoach` du registre). Alignée sur
// `lib/tutor-v4/questionBank/premiere/maths/derivee-lecture.bank.ts` et
// `derivee-calcul.bank.ts`.
//
// ⛔⛔ LE PROGRAMME, PAS CELUI DE LA SPÉ : dérivées de la constante, de
// l'identité, du carré et du cube ; somme ; produit par un réel ; polynômes de
// degré 3 au plus ; tableau de variations. PAS de discriminant, PAS de produit
// ni de quotient, PAS d'équation de tangente par la formule. Le signe de f′ se
// lit sur une forme factorisée DONNÉE, qu'on vérifie en développant — comme au
// sujet des Centres étrangers de juin 2026.
//
// ⭐ Frédéric, 28/09 : « n'oublie pas les canvas ». Chaque lecture graphique
// porte sa courbe dans l'énoncé ; chaque corrigé de signe ou de variations
// dessine son tableau.
// ⭐⭐ Et, le même jour : « les élèves de première […] détestent tous les maths.
// Donc il y a vraiment besoin d'avoir un lien graphique et aussi un lien sur
// l'économie ou l'histoire-géo ». D'où l'exode rural (9), la recette marginale
// (10), le bénéfice du maraîcher (11), la confiture (17), le festival (19) ; la
// crue (4) et le sentier de montagne (20) pour la géographie. Les chiffres sont
// des MODÈLES, jamais présentés comme des données réelles.
//
// Micro-compétences : der_tangente_lire (1, 4, 10, 20), der_tangente_signe (2),
// der_tangente_horizontale (3, 20), der_comparer_vitesses (4, 20),
// der_nombre_derive_sens (9, 18), der_tangente_coefficient (9, 10),
// der_modele_interpreter (18, 20), der_derivee_constante (5),
// der_derivee_identite (5), der_derivee_carre_cube (5), der_derivee_produit_reel
// (6), der_derivee_somme (6), der_derivee_degre2 (6, 19), der_derivee_degre3 (7,
// 13, 20), der_calculer_nombre_derive (8, 20), der_signe_etudier (11),
// der_signe_factorisee (12, 14, 16), der_verifier_forme_factorisee (13, 14, 15,
// 16, 17), der_variations_deduire (11, 12, 14), der_tableau_dresser (14, 15, 16,
// 18), der_extremum_determiner (15, 16, 17), der_optimisation (17, 19),
// der_prevoir_evolution (18). 23/23.

import type { ReactNode } from "react";
import { CanvasRenderer } from "@/lib/canvas";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, repere, tableauSignes } from "@/lib/fiches-exercices/figures";

const nb = (n: number) => String(n).replace("-", "−");

/** Un dessin d'appoint, montré à l'écran et pas sur papier : avec lui, le PDF
 *  passait à 13 pages (28/09, limite 12). Les tableaux et les courbes qu'on
 *  LIT restent imprimés ; seuls partent ceux qui redisent le corrigé. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Le tableau de variations : signe de la dérivée en haut, valeurs en bas.
 *  ⛔ Dans le cadre des aides de `figures.tsx` : sans lui, sept tableaux en
 *  pleine largeur portaient le PDF à 14 pages (28/09, limite 12). */
function tableauVariations(
  bornes: number[],
  signes: ("+" | "-")[],
  valeurs: number[],
  f = "f",
  variable = "x",
) {
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[14rem]">
    <CanvasRenderer
      figure={{
        kind: "tableau_variations",
        variable,
        bornes: bornes.map(nb),
        derivee: { label: `${f} ′(${variable})`, signes, marques: Array(bornes.length - 2).fill("0") },
        variations: { label: `${f}(${variable})`, valeurs: valeurs.map(nb) },
        size: { width: 380, height: 200 },
      }}
    />
    </div>
  );
}

export const exercicesDerivationPremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "derivation",
  titre: "La dérivation",
  accroche:
    "Vingt exercices, de la tangente qu'on lit sur un graphique au problème de contrôle, avec un rappel de cours de trois lignes avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, et elle dessine la courbe ou le tableau.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. On applique, on écrit le résultat.",
      rappel: [
        "$f'(a)$, le nombre dérivé de $f$ en $a$, est le COEFFICIENT DIRECTEUR de la tangente à la courbe au point d'abscisse $a$.",
        "Pour le lire : on part du point de contact, on avance de $1$ sur la tangente, et on compte de combien elle monte (ou descend).",
        "$f'(a) > 0$ : la courbe monte en $a$. $f'(a) < 0$ : elle descend. $f'(a) = 0$ : la tangente est horizontale.",
        "Les formules : $k' = 0$ ; $x' = 1$ ; $(x^2)' = 2x$ ; $(x^3)' = 3x^2$ ; $(k \\times u)' = k \\times u'$ ; $(u + v)' = u' + v'$.",
      ],
      exercices: [
        {
          enonce: "La droite orange est la tangente à la courbe de $f$ au point $A$ d'abscisse $2$. Lire $f(2)$ et $f'(2)$.",
          figure: repere([-1, 4, -3, 4], [{ q: [0.5, 0, -2] }, { q: [0, 2, -4], couleur: ORANGE }], [{ x: 2, y: 0, label: "A" }]),
          correction:
            "$f(2)$ est l'ordonnée de $A$ : $f(2) = 0$.\n$f'(2)$ est le coefficient directeur de la tangente. On part de $A(2 ; 0)$ et on avance de $1$ : la tangente passe par $(3 ; 2)$. Elle est montée de $2$.\nDonc $f'(2) = 2$.\n⛔ Ne pas confondre les deux : $f(2)$ se lit sur l'axe vertical, $f'(2)$ est une PENTE, elle se lit sur la tangente.\n⚠️ $f(2) = 0$ n'empêche pas $f'(2)$ d'être positif : la courbe traverse l'axe en montant.",
          micros: ["der_tangente_lire"],
        },
        {
          enonce: "Voici la courbe d'une fonction $f$. Donner le signe de $f'(-2)$, de $f'(0)$ et de $f'(1)$, sans calcul.",
          figure: repere([-3, 3, -4, 4], [{ p: [1, 0, -3, 0] }], [
            { x: -2, y: -2, label: "A" },
            { x: 0, y: 0, label: "B" },
            { x: 1, y: -2, label: "C" },
          ]),
          correction:
            "On regarde si la courbe MONTE ou DESCEND quand on la parcourt de gauche à droite.\nEn $A$ (abscisse $-2$), la courbe monte : $f'(-2) > 0$.\nEn $B$ (abscisse $0$), elle descend : $f'(0) < 0$.\nEn $C$ (abscisse $1$), elle est au fond d'un creux : la tangente est horizontale, $f'(1) = 0$.\n⚠️ Le signe de $f'(a)$ ne dépend pas du signe de $f(a)$ : en $A$, la courbe est sous l'axe, et pourtant elle monte.",
          schema: ecranSeulement(
            repere(
              [-3, 3, -4, 4],
              [
                { p: [1, 0, -3, 0] },
                { q: [0, 9, 16], couleur: ORANGE },
                { q: [0, -3, 0], couleur: ORANGE },
                { q: [0, 0, -2], couleur: ORANGE },
              ],
              [
                { x: -2, y: -2, label: "A" },
                { x: 0, y: 0, label: "B" },
                { x: 1, y: -2, label: "C" },
              ],
            ),
          ),
          micros: ["der_tangente_signe"],
        },
        {
          enonce: "Voici la courbe d'une fonction $f$. En quels points la tangente est-elle horizontale ? Que valent $f'$ et $f$ en ces points ?",
          figure: repere([-1, 5, -2, 6], [{ p: [1, -6, 9, 0] }]),
          correction:
            "La tangente est horizontale au sommet d'une bosse et au fond d'un creux.\nEn $x = 1$, la courbe atteint un sommet : $f'(1) = 0$ et $f(1) = 4$. C'est un MAXIMUM local.\nEn $x = 3$, elle touche le fond d'un creux : $f'(3) = 0$ et $f(3) = 0$. C'est un MINIMUM local.\n⚠️ En $x = 3$, $f(3) = 0$ ET $f'(3) = 0$ : ces deux zéros n'ont pas le même sens. Le premier dit où est le point, le second dit que la tangente est plate.",
          schema: ecranSeulement(
            repere([-1, 5, -2, 6], [{ p: [1, -6, 9, 0] }, { q: [0, 0, 4], couleur: ORANGE }], [
              { x: 1, y: 4, label: "" },
              { x: 3, y: 0, label: "" },
            ]),
          ),
          micros: ["der_tangente_horizontale"],
        },
        {
          enonce:
            "Pendant une crue, la hauteur d'une rivière au-dessus de son niveau habituel, en mètres, est donnée par la courbe ci-dessous ($t$ en jours). Les tangentes aux jours $1$ et $2$ sont tracées.\na) Lire $h'(1)$ et $h'(2)$.\nb) Lequel de ces deux jours la rivière monte-t-elle le plus vite ?",
          figure: repere([-1, 7, -1, 10], [{ q: [-1, 6, 0] }, { q: [0, 4, 1], couleur: ORANGE }, { q: [0, 2, 4], couleur: ORANGE }], [
            { x: 1, y: 5, label: "A" },
            { x: 2, y: 8, label: "B" },
          ]),
          correction:
            "a) En $A(1 ; 5)$, on avance d'un jour sur la tangente : elle passe par $(2 ; 9)$. Elle monte de $4$, donc $h'(1) = 4$.\nEn $B(2 ; 8)$, la tangente passe par $(3 ; 10)$ : elle monte de $2$, donc $h'(2) = 2$.\nb) $h'(1) = 4 > h'(2) = 2$ : la rivière monte plus vite le jour $1$, à $4$ mètres par jour, contre $2$ mètres par jour le jour $2$.\n⚠️ Le jour $2$, l'eau est plus HAUTE ($8$ m contre $5$ m), mais elle monte moins VITE. La hauteur, c'est $h$ ; la vitesse, c'est $h'$.",
          micros: ["der_comparer_vitesses", "der_tangente_lire"],
        },
        {
          enonce: "Dériver chacune de ces fonctions :\n$f(x) = 7$ ; $g(x) = x$ ; $h(x) = -3x + 5$ ; $k(x) = x^2$ ; $m(x) = x^3$.",
          correction:
            "$f$ est constante : $f'(x) = 0$. Une constante ne varie pas.\n$g'(x) = 1$ : la droite $y = x$ a une pente de $1$ partout.\n$h$ est affine, de coefficient directeur $-3$ : $h'(x) = -3$. Le $5$ disparaît.\n$k'(x) = 2x$.\n$m'(x) = 3x^2$.\n⚠️ $(x^2)' = 2x$ et non $x$ : l'exposant descend devant, puis il diminue de $1$.\n⭐ Sur le dessin, la droite de $h$ descend de $3$ à chaque pas de $1$ : sa dérivée, c'est sa pente.",
          schema: ecranSeulement(repere([-1, 4, -3, 6], [{ q: [0, -3, 5], couleur: ORANGE }], [{ x: 0, y: 5, label: "" }, { x: 1, y: 2, label: "" }])),
          micros: ["der_derivee_constante", "der_derivee_identite", "der_derivee_carre_cube"],
        },
        {
          enonce: "Dériver : $f(x) = 5x^2$ ; $g(x) = -2x^3$ ; $h(x) = 4x^2 - 3x + 8$.",
          correction:
            "Un nombre qui multiplie reste devant : $(k \\times u)' = k \\times u'$.\n$f'(x) = 5 \\times 2x = 10x$.\n$g'(x) = -2 \\times 3x^2 = -6x^2$.\nPour une somme, on dérive chaque terme : $h'(x) = 4 \\times 2x - 3 + 0 = 8x - 3$.\n⚠️ Le signe moins de $-2x^3$ se garde : $g'(x) = -6x^2$, pas $6x^2$.",
          micros: ["der_derivee_produit_reel", "der_derivee_somme", "der_derivee_degre2"],
        },
        {
          enonce: "Dériver $f(x) = 2x^3 - 6x^2 + x - 4$.",
          correction:
            "On dérive terme à terme.\n$(2x^3)' = 2 \\times 3x^2 = 6x^2$.\n$(-6x^2)' = -6 \\times 2x = -12x$.\n$(x)' = 1$ et $(-4)' = 0$.\nDonc $f'(x) = 6x^2 - 12x + 1$.\n⭐ La dérivée d'un polynôme de degré $3$ est un polynôme de degré $2$ : chaque exposant baisse de $1$.\nSur le dessin : $f'(0) = 1$, et la tangente au point $(0 ; -4)$ monte bien de $1$ à chaque pas de $1$.",
          schema: repere([-1, 4, -10, 2], [{ p: [2, -6, 1, -4] }, { q: [0, 1, -4], couleur: ORANGE }], [{ x: 0, y: -4, label: "" }]),
          micros: ["der_derivee_degre3"],
        },
        {
          enonce: "Soit $f(x) = x^3 - 4x + 1$. Calculer $f'(2)$, $f'(0)$ et $f'(-1)$.",
          correction:
            "D'abord la dérivée : $f'(x) = 3x^2 - 4$.\nPuis on remplace $x$ : $f'(2) = 12 - 4 = 8$ ; $f'(0) = -4$ ; $f'(-1) = 3 - 4 = -1$.\nEn $0$ et en $-1$, le nombre dérivé est négatif : la courbe y descend. En $2$, elle monte fort.\n⛔ On remplace dans $f'$, pas dans $f$ : $f(2) = 8 - 8 + 1 = 1$, ce n'est pas la réponse.\n⚠️ $(-1)^2 = 1$ : $3 \\times (-1)^2 = 3$, et non $-3$.",
          schema: repere([-3, 3, -3, 5], [{ p: [1, 0, -4, 1] }, { q: [0, -4, 1], couleur: ORANGE }], [{ x: 0, y: 1, label: "" }]),
          micros: ["der_calculer_nombre_derive"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs gestes à enchaîner, comme dans un contrôle. On rédige.",
      rappel: [
        "Le signe de $f'$ donne les variations de $f$ : $f' > 0$ sur un intervalle, $f$ y est croissante ; $f' < 0$, elle y est décroissante.",
        "Pour le signe d'un produit comme $(x - 1)(x - 5)$, on fait un tableau de signes : une ligne par facteur, puis la règle des signes.",
        "« Vérifier que $f'(x) = \\dots$ » : on DÉVELOPPE la forme proposée et on compare avec $f'(x)$.",
        "Sur un intervalle $[a ; b]$, on calcule toujours $f(a)$ et $f(b)$ : le maximum ou le minimum peut se trouver aux bornes.",
      ],
      exercices: [
        {
          titre: "Un village pendant l'exode rural",
          enonce:
            "Pendant l'exode rural, les campagnes françaises se vident au profit des villes. La population d'un village de montagne, en centaines d'habitants, est $P(t)$, où $t$ est le nombre de décennies écoulées depuis 1940. On sait que $P(2) = 5$ et $P'(2) = -3$.\na) En quelle année est-on quand $t = 2$ ? Combien le village a-t-il d'habitants ?\nb) Que vaut le coefficient directeur de la tangente au point d'abscisse $2$ ? La population augmente-t-elle ou diminue-t-elle ?\nc) Entre $t = 2$ et $t = 2{,}1$, c'est-à-dire en un an, de combien d'habitants environ la population varie-t-elle ?",
          correction:
            "a) $t = 2$ : deux décennies après 1940, soit en 1960. $P(2) = 5$ centaines : le village a $500$ habitants.\nb) Le coefficient directeur de la tangente, c'est le nombre dérivé : $-3$. Il est négatif : la population DIMINUE.\nc) Près de $2$, la courbe se confond presque avec sa tangente : quand $t$ augmente de $0{,}1$, $P(t)$ varie d'environ $-3 \\times 0{,}1 = -0{,}3$ centaine.\nLe village perd donc environ $30$ habitants en un an : ils partent pour la ville.\n⭐ C'est le sens du nombre dérivé : une VITESSE. $P'(2) = -3$ se lit « moins $300$ habitants par décennie », au rythme de 1960.\n⚠️ Ce n'est qu'une approximation : plus on s'éloigne de 1960, moins la tangente colle à la courbe.",
          schema: ecranSeulement(repere([-1, 5, -1, 8], [{ q: [0, -3, 11], couleur: ORANGE }], [{ x: 2, y: 5, label: "1960" }])),
          micros: ["der_nombre_derive_sens", "der_tangente_coefficient"],
        },
        {
          titre: "La recette d'une entreprise",
          enonce:
            "Une entreprise vend $x$ centaines de sacs à dos. Sa recette, en milliers d'euros, est $R(x)$. Sur la courbe de $R$, la tangente au point $A(1 ; 3)$ passe aussi par le point $B(3 ; 7)$.\na) Calculer $R'(1)$.\nb) Donner l'équation réduite de cette tangente.\nc) Les économistes appellent $R'(1)$ la « recette marginale ». Que rapporte, à peu près, une centaine de sacs de plus quand on en vend déjà cent ?",
          figure: repere([-1, 4, -1, 8], [{ q: [0, 2, 1], couleur: ORANGE }], [
            { x: 1, y: 3, label: "A" },
            { x: 3, y: 7, label: "B" },
          ]),
          correction:
            "a) $R'(1)$ est le coefficient directeur de la tangente, qui passe par $A$ et $B$ :\n$R'(1) = \\dfrac{7 - 3}{3 - 1} = \\dfrac{4}{2} = 2$.\nb) La tangente a une équation de la forme $y = 2x + p$. Elle passe par $A(1 ; 3)$ : $3 = 2 \\times 1 + p$, donc $p = 1$.\nC'est la droite $y = 2x + 1$. ✔️ Avec $B$ : $2 \\times 3 + 1 = 7$.\nc) $R'(1) = 2$ milliers d'euros par centaine de sacs : une centaine de sacs de plus rapporte environ $2\\,000$ euros, soit $20$ euros par sac.\n⚠️ Dans le quotient, les ordonnées en haut, les abscisses en bas, DANS LE MÊME ORDRE : $\\dfrac{7 - 3}{3 - 1}$, pas $\\dfrac{7 - 3}{1 - 3}$.",
          micros: ["der_tangente_coefficient", "der_tangente_lire", "der_modele_interpreter"],
        },
        {
          titre: "Le bénéfice d'un maraîcher",
          enonce:
            "Un maraîcher vend $x$ tonnes de tomates par saison, avec $0 \\leqslant x \\leqslant 6$. Son bénéfice $B(x)$, en milliers d'euros, a pour dérivée $B'(x) = -2x + 6$. La droite ci-dessous représente $B'$.\na) Étudier le signe de $B'(x)$, par le calcul puis sur le dessin.\nb) En déduire les variations de $B$. Combien de tonnes doit-il vendre pour que son bénéfice soit le plus grand possible ?",
          figure: repere([-1, 7, -7, 7], [{ q: [0, -2, 6], couleur: ORANGE }], [{ x: 3, y: 0, label: "" }]),
          correction:
            "a) $-2x + 6 > 0$ donne $-2x > -6$, donc $x < 3$ : on divise par $-2$, qui est négatif, et le sens de l'inégalité s'inverse.\n$B'(x)$ est positive pour $x < 3$, nulle en $3$, négative pour $x > 3$.\nSur le dessin, c'est la même chose : la droite de $B'$ est AU-DESSUS de l'axe avant $3$, en dessous après.\nb) $B$ est croissante sur $[0 ; 3]$ et décroissante sur $[3 ; 6]$ : le bénéfice est le plus grand pour $3$ tonnes.\nAu-delà, chaque tonne de plus fait BAISSER le bénéfice : il faut par exemple payer des saisonniers en plus, ou brader les tomates.\n⚠️ Diviser par un nombre négatif RETOURNE l'inégalité : c'est l'erreur qui inverse tout le tableau.\n⛔ Le dessin est celui de $B'$, pas de $B$ : la droite descend, et pourtant $B$ monte tant qu'elle est au-dessus de l'axe.",
          schema: tableauSignes(["0", "3", "6"], [["$B'(x)$", ["+", "-"], ["0"]]]),
          micros: ["der_signe_etudier", "der_variations_deduire"],
        },
        {
          enonce: "La dérivée d'une fonction $f$ est $f'(x) = (x - 1)(x - 5)$. Dresser le tableau de signes de $f'(x)$, puis donner les variations de $f$.",
          correction:
            "Chaque facteur change de signe en une valeur : $x - 1$ s'annule en $1$, $x - 5$ en $5$.\n$x - 1$ est négatif avant $1$, positif après. $x - 5$ est négatif avant $5$, positif après.\nLa règle des signes donne $f'(x)$ : positif avant $1$, négatif entre $1$ et $5$, positif après $5$.\n$f$ est croissante sur $]-\\infty ; 1]$, décroissante sur $[1 ; 5]$, croissante sur $[5 ; +\\infty[$.\n⚠️ Entre $1$ et $5$, les deux facteurs n'ont pas le même signe : le produit est NÉGATIF. Le tableau évite de le deviner.",
          schema: tableauSignes(["−∞", "1", "5", "+∞"], [
            ["$x - 1$", ["-", "+", "+"], ["0", ""]],
            ["$x - 5$", ["-", "-", "+"], ["", "0"]],
            ["$f'(x)$", ["+", "-", "+"], ["0", "0"]],
          ]),
          micros: ["der_signe_factorisee", "der_variations_deduire"],
        },
        {
          enonce: "Soit $f(x) = x^3 - 6x^2 + 9x + 1$.\na) Calculer $f'(x)$.\nb) Vérifier que $f'(x) = 3(x - 1)(x - 3)$.",
          correction:
            "a) $f'(x) = 3x^2 - 12x + 9$.\nb) On part de la forme proposée et on DÉVELOPPE : $(x - 1)(x - 3) = x^2 - 3x - x + 3 = x^2 - 4x + 3$.\nPuis $3(x^2 - 4x + 3) = 3x^2 - 12x + 9$.\nOn retrouve exactement $f'(x)$ : la forme factorisée est juste. ✔️\n⭐ « Vérifier que » : on ne factorise pas soi-même, on développe la forme donnée et on compare. C'est toujours plus facile dans ce sens.\n⭐ Les racines $1$ et $3$ de $f'$ sont les abscisses des deux tangentes horizontales : c'est la courbe de l'exercice 3, montée de $1$.",
          schema: ecranSeulement(
            repere([-1, 5, -1, 6], [{ p: [1, -6, 9, 1] }, { q: [0, 0, 5], couleur: ORANGE }, { q: [0, 0, 1], couleur: ORANGE }], [
              { x: 1, y: 5, label: "" },
              { x: 3, y: 1, label: "" },
            ]),
          ),
          micros: ["der_verifier_forme_factorisee", "der_derivee_degre3"],
        },
        {
          enonce:
            "Soit $f(x) = x^3 - 3x^2 - 9x + 2$ sur $[-3 ; 5]$.\na) Calculer $f'(x)$ et vérifier que $f'(x) = 3(x + 1)(x - 3)$.\nb) Étudier le signe de $f'(x)$.\nc) Dresser le tableau de variations de $f$, images comprises.",
          correction:
            "a) $f'(x) = 3x^2 - 6x - 9$. Et $3(x + 1)(x - 3) = 3(x^2 - 3x + x - 3) = 3(x^2 - 2x - 3) = 3x^2 - 6x - 9$. ✔️\nb) $3$ est positif. $x + 1$ s'annule en $-1$, $x - 3$ en $3$ : le produit est positif sur $[-3 ; -1]$, négatif sur $[-1 ; 3]$, positif sur $[3 ; 5]$.\nc) $f$ croît sur $[-3 ; -1]$, décroît sur $[-1 ; 3]$, croît sur $[3 ; 5]$.\nImages : $f(-3) = -27 - 27 + 27 + 2 = -25$ ; $f(-1) = -1 - 3 + 9 + 2 = 7$ ; $f(3) = 27 - 27 - 27 + 2 = -25$ ; $f(5) = 125 - 75 - 45 + 2 = 7$.\n⚠️ On calcule aussi les images aux BORNES $-3$ et $5$ : un tableau sans elles est incomplet.",
          schema: tableauVariations([-3, -1, 3, 5], ["+", "-", "+"], [-25, 7, -25, 7]),
          micros: ["der_verifier_forme_factorisee", "der_signe_factorisee", "der_variations_deduire", "der_tableau_dresser"],
        },
        {
          enonce:
            "Soit $f(x) = -x^3 + 3x + 1$ sur $[-2 ; 2]$.\na) Vérifier que $f'(x) = 3(1 - x)(1 + x)$.\nb) Dresser le tableau de variations de $f$.\nc) Donner le maximum et le minimum de $f$ sur $[-2 ; 2]$, et où ils sont atteints.",
          correction:
            "a) $f'(x) = -3x^2 + 3$. Et $3(1 - x)(1 + x) = 3(1 - x^2) = 3 - 3x^2$. ✔️\nb) $1 - x$ s'annule en $1$, $1 + x$ en $-1$. Le produit $3(1 - x)(1 + x)$ est négatif sur $[-2 ; -1]$, positif sur $[-1 ; 1]$, négatif sur $[1 ; 2]$.\n$f$ décroît sur $[-2 ; -1]$, croît sur $[-1 ; 1]$, décroît sur $[1 ; 2]$.\nImages : $f(-2) = 8 - 6 + 1 = 3$ ; $f(-1) = 1 - 3 + 1 = -1$ ; $f(1) = -1 + 3 + 1 = 3$ ; $f(2) = -8 + 6 + 1 = -1$.\nc) Le maximum vaut $3$, atteint DEUX fois : en $-2$ et en $1$. Le minimum vaut $-1$, atteint en $-1$ et en $2$.\n⚠️ Sans les bornes, on oubliait la moitié des réponses : le maximum est aussi atteint en $-2$, qui n'annule pas $f'$.",
          schema: (
            <>
              {tableauVariations([-2, -1, 1, 2], ["-", "+", "-"], [3, -1, 3, -1])}
              {ecranSeulement(
                repere([-3, 3, -2, 4], [{ p: [-1, 0, 3, 1] }], [
                  { x: -2, y: 3, label: "" },
                  { x: -1, y: -1, label: "" },
                  { x: 1, y: 3, label: "" },
                  { x: 2, y: -1, label: "" },
                ]),
              )}
            </>
          ),
          micros: ["der_extremum_determiner", "der_tableau_dresser", "der_verifier_forme_factorisee"],
        },
        {
          enonce:
            "Soit $f(x) = 2x^3 - 3x^2 - 12x + 5$ sur $[-2 ; 3]$.\n1. Calculer $f'(x)$.\n2. Vérifier que $f'(x) = (6x + 6)(x - 2)$.\n3. Étudier le signe de $f'(x)$ sur $[-2 ; 3]$.\n4. En déduire les variations de $f$, et son maximum sur $[-2 ; 3]$.",
          correction:
            "1. $f'(x) = 6x^2 - 6x - 12$.\n2. $(6x + 6)(x - 2) = 6x^2 - 12x + 6x - 12 = 6x^2 - 6x - 12$. ✔️\n3. $6x + 6 = 0$ pour $x = -1$ ; $x - 2 = 0$ pour $x = 2$. Le produit est positif sur $[-2 ; -1]$, négatif sur $[-1 ; 2]$, positif sur $[2 ; 3]$.\n4. $f$ croît sur $[-2 ; -1]$, décroît sur $[-1 ; 2]$, croît sur $[2 ; 3]$.\nImages : $f(-2) = -16 - 12 + 24 + 5 = 1$ ; $f(-1) = -2 - 3 + 12 + 5 = 12$ ; $f(2) = 16 - 12 - 24 + 5 = -15$ ; $f(3) = 54 - 27 - 36 + 5 = -4$.\nLe maximum de $f$ sur $[-2 ; 3]$ vaut $12$, atteint en $x = -1$.\n⭐ C'est la forme exacte d'un exercice de contrôle : chaque question prépare la suivante. On ne cherche jamais le signe de $f'$ sur la forme développée.",
          schema: (
            <>
              {tableauSignes(["−2", "−1", "2", "3"], [
                ["$6x + 6$", ["-", "+", "+"], ["0", ""]],
                ["$x - 2$", ["-", "-", "+"], ["", "0"]],
                ["$f'(x)$", ["+", "-", "+"], ["0", "0"]],
              ])}
              {tableauVariations([-2, -1, 2, 3], ["+", "-", "+"], [1, 12, -15, -4])}
            </>
          ),
          micros: ["der_tableau_dresser", "der_extremum_determiner", "der_signe_factorisee", "der_verifier_forme_factorisee"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un exercice complet de contrôle, avec ses questions qui s'enchaînent. Le nombre dérivé y devient une vitesse.",
      rappel: [
        "Dans un problème, $f'(x)$ est une VITESSE : des mètres par kilomètre, des malades par jour, des euros par billet.",
        "Pour trouver un maximum : on dérive, on étudie le signe de $f'$, on dresse le tableau de variations, et on calcule l'image au sommet.",
        "On donne l'intervalle où $x$ a un sens, et on répond à la question posée, avec son unité.",
      ],
      exercices: [
        {
          titre: "La coopérative de confitures",
          enonce:
            "Une coopérative fabrique entre $0$ et $10$ milliers de pots de confiture par mois. Son bénéfice mensuel, en centaines d'euros, est $B(x) = -x^3 + 12x^2 - 21x - 10$, où $x$ est le nombre de milliers de pots.\na) Calculer $B'(x)$ et vérifier que $B'(x) = -3(x - 1)(x - 7)$.\nb) Dresser le tableau de variations de $B$ sur $[0 ; 10]$.\nc) Combien de pots faut-il fabriquer pour un bénéfice maximal ? Quel est ce bénéfice, en euros ?",
          correction:
            "a) $B'(x) = -3x^2 + 24x - 21$. Et $-3(x - 1)(x - 7) = -3(x^2 - 8x + 7) = -3x^2 + 24x - 21$. ✔️\nb) $(x - 1)(x - 7)$ est positif à l'extérieur de $[1 ; 7]$, négatif entre $1$ et $7$. Le facteur $-3$ retourne tout :\n$B'(x)$ est négatif sur $[0 ; 1]$, positif sur $[1 ; 7]$, négatif sur $[7 ; 10]$.\n$B$ décroît sur $[0 ; 1]$, croît sur $[1 ; 7]$, décroît sur $[7 ; 10]$.\nImages : $B(0) = -10$ ; $B(1) = -1 + 12 - 21 - 10 = -20$ ; $B(7) = -343 + 588 - 147 - 10 = 88$ ; $B(10) = -1000 + 1200 - 210 - 10 = -20$.\nc) Le maximum est atteint en $x = 7$ : il faut fabriquer $7\\,000$ pots par mois.\nLe bénéfice vaut alors $88$ centaines d'euros, soit $8\\,800$ euros.\n⚠️ Le facteur $-3$ RETOURNE tous les signes : oublié, il transforme le maximum en minimum.\n⚠️ On répond en pots et en euros : « $x = 7$ » ne répond pas à la question.",
          schema: (
            <>
              {tableauSignes(["0", "1", "7", "10"], [
                ["$-3$", ["-", "-", "-"], ["", ""]],
                ["$x - 1$", ["-", "+", "+"], ["0", ""]],
                ["$x - 7$", ["-", "-", "+"], ["", "0"]],
                ["$B'(x)$", ["-", "+", "-"], ["0", "0"]],
              ])}
              {tableauVariations([0, 1, 7, 10], ["-", "+", "-"], [-10, -20, 88, -20], "B")}
            </>
          ),
          micros: ["der_optimisation", "der_verifier_forme_factorisee", "der_extremum_determiner"],
        },
        {
          titre: "Une épidémie de grippe",
          enonce:
            "Pendant une épidémie de grippe, le nombre de malades dans une ville, $t$ jours après le premier cas signalé, est modélisé par $N(t) = -t^3 + 15t^2 + 100$, pour $t$ entre $0$ et $14$.\na) Calculer $N'(t)$ et vérifier que $N'(t) = -3t(t - 10)$.\nb) Dresser le tableau de variations de $N$. Quel jour l'épidémie atteint-elle son pic ? Combien y a-t-il alors de malades ?\nc) Calculer $N'(2)$, $N'(5)$ et $N'(8)$. Que représentent ces nombres ? Lequel de ces trois jours l'épidémie progresse-t-elle le plus vite ?",
          correction:
            "a) $N'(t) = -3t^2 + 30t$. Et $-3t(t - 10) = -3t^2 + 30t$. ✔️\nb) Sur $]0 ; 14]$, $-3t$ est négatif, et $t - 10$ change de signe en $10$ : le produit est positif sur $[0 ; 10]$, négatif sur $[10 ; 14]$.\n$N$ croît sur $[0 ; 10]$ puis décroît sur $[10 ; 14]$.\n$N(0) = 100$ ; $N(10) = -1000 + 1500 + 100 = 600$ ; $N(14) = -2744 + 2940 + 100 = 296$.\nLe pic est atteint le jour $10$, avec $600$ malades.\nc) $N'(2) = -12 + 60 = 48$ ; $N'(5) = -75 + 150 = 75$ ; $N'(8) = -192 + 240 = 48$.\n$N'(t)$ est la VITESSE de l'épidémie, en malades par jour. Le jour $5$, elle gagne environ $75$ malades par jour : c'est le plus rapide des trois.\n⭐ Le jour $8$, il y a plus de malades que le jour $5$ ($548$ contre $350$), mais l'épidémie ralentit déjà : c'est le signe que le pic approche.\n⚠️ Au pic, $N'(10) = 0$ : l'épidémie ne progresse plus, et pourtant il n'y a jamais eu autant de malades.",
          schema: tableauVariations([0, 10, 14], ["+", "-"], [100, 600, 296], "N", "t"),
          micros: ["der_prevoir_evolution", "der_modele_interpreter", "der_nombre_derive_sens", "der_tableau_dresser"],
        },
        {
          titre: "Le prix des billets du festival",
          enonce:
            "Un festival vend $1\\,000$ billets à $40$ euros. Une étude montre que chaque euro d'augmentation du prix fait perdre $20$ spectateurs. On note $x$ l'augmentation, en euros ($0 \\leqslant x \\leqslant 50$).\na) Exprimer le prix du billet et le nombre de spectateurs en fonction de $x$.\nb) Montrer que la recette est $R(x) = -20x^2 + 200x + 40\\,000$.\nc) Quelle augmentation rend la recette maximale ? Donner le prix du billet, le nombre de spectateurs et la recette.",
          correction:
            "a) Le prix est $40 + x$ euros ; le nombre de spectateurs est $1\\,000 - 20x$.\nb) Recette = prix × nombre de billets : $R(x) = (40 + x)(1\\,000 - 20x)$.\nOn développe : $40\\,000 - 800x + 1\\,000x - 20x^2 = -20x^2 + 200x + 40\\,000$. ✔️\nc) $R'(x) = -40x + 200$. $R'(x) = 0$ pour $x = 5$ ; $R'$ est positive avant $5$, négative après.\n$R$ croît sur $[0 ; 5]$, décroît sur $[5 ; 50]$ : le maximum est en $x = 5$.\nLe billet coûte alors $45$ euros, il y a $1\\,000 - 100 = 900$ spectateurs, et la recette vaut $45 \\times 900 = 40\\,500$ euros.\n✔️ Avec la formule : $R(5) = -500 + 1\\,000 + 40\\,000 = 40\\,500$.\n⚠️ Augmenter le prix ne rapporte que jusqu'à un certain point : au-delà de $45$ euros, les spectateurs perdus coûtent plus que les euros gagnés.",
          schema: tableauVariations([0, 5, 50], ["+", "-"], [40000, 40500, 0], "R"),
          micros: ["der_optimisation", "der_derivee_degre2"],
        },
        {
          titre: "Le sentier de montagne",
          enonce:
            "Un randonneur suit un sentier de montagne. Son altitude, en centaines de mètres, est $h(x) = -0{,}25x^3 + 1{,}5x^2 + 2$, où $x$ est la distance parcourue en kilomètres ($0 \\leqslant x \\leqslant 6$). La courbe et deux tangentes sont tracées.\na) Lire $h'(2)$ sur la tangente en $A$. De combien de mètres le sentier monte-t-il par kilomètre en ce point ?\nb) Que vaut $h'(4)$ ? Que se passe-t-il au point $S$ ?\nc) Calculer $h'(x)$ et retrouver ces deux valeurs.\nd) Vérifier que $h'(x) = -0{,}75(x - 2)^2 + 3$. En déduire que le sentier n'est nulle part plus raide qu'en $A$.",
          figure: repere([-1, 7, -1, 11], [{ p: [-0.25, 1.5, 0, 2] }, { q: [0, 3, 0], couleur: ORANGE }, { q: [0, 0, 10], couleur: ORANGE }], [
            { x: 2, y: 6, label: "A" },
            { x: 4, y: 10, label: "S" },
          ]),
          correction:
            "a) La tangente en $A(2 ; 6)$ passe par $(3 ; 9)$ : quand on avance de $1$, elle monte de $3$. Donc $h'(2) = 3$.\nL'unité de $h'$ est celle de $h$ divisée par celle de $x$ : des centaines de mètres PAR kilomètre. Le sentier monte de $300$ m par kilomètre, soit une pente de $30$ %.\nb) En $S$, la tangente est horizontale : $h'(4) = 0$. Le randonneur est au SOMMET, à $1\\,000$ m d'altitude ; après, le sentier redescend.\nc) $h'(x) = -0{,}25 \\times 3x^2 + 1{,}5 \\times 2x = -0{,}75x^2 + 3x$.\n$h'(2) = -3 + 6 = 3$ ✔️ et $h'(4) = -12 + 12 = 0$ ✔️.\nd) On développe la forme proposée : $-0{,}75(x^2 - 4x + 4) + 3 = -0{,}75x^2 + 3x - 3 + 3 = -0{,}75x^2 + 3x$. ✔️\nUn carré est toujours positif ou nul : $-0{,}75(x - 2)^2 \\leqslant 0$, donc $h'(x) \\leqslant 3$ pour tout $x$, avec égalité seulement en $x = 2$.\nLa pente ne dépasse jamais $3$, soit $30$ % : le passage le plus raide du sentier est en $A$.\n⭐ Le plus raide n'est pas le plus haut : en $A$, on est à $600$ m ; au sommet $S$, la pente est nulle.",
          micros: [
            "der_tangente_lire",
            "der_tangente_horizontale",
            "der_comparer_vitesses",
            "der_modele_interpreter",
            "der_derivee_degre3",
            "der_calculer_nombre_derive",
          ],
        },
      ],
    },
  ],
};
