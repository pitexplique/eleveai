// ─── Kit de survie · Spé maths Première ─────────────────────────────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = notions de lib/tutor-v4/knowledge/maths/premiere-spe/notions.ts
// - checklists     = micro-compétences de microSkills.ts (libellés du BO 2019)
// - test de survie = items "fixed" puisés dans les banques du coach
// Ici on n'écrit QUE le condensé de survie : essentiel, formules, réflexes,
// pièges, « en vrai ». Le reste est dérivé automatiquement.

import type { TutorBankItemFixedV4, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/maths/premiere-spe/microSkills";
import { suitesBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/suites.bank";
import { secondDegreBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/second-degre.bank";
import { derivationBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/derivation.bank";
import { variationsFonctionsBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/variations-fonctions.bank";
import { exponentielleBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/exponentielle.bank";
import { trigonometrieBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/trigonometrie.bank";
import { produitScalaireBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/produit-scalaire.bank";
import { geometrieRepereeBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/geometrie-reperee.bank";
import { probabilitesConditionnellesBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/probabilites-conditionnelles.bank";
import { variablesAleatoiresBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/variables-aleatoires.bank";
import { algorithmiqueBank } from "@/lib/tutor-v4/questionBank/premiere-spe/maths/algorithmique.bank";
import type { KitData, KitExo, KitNotion } from "@/components/kit/types";

/* ───────────────────────── dérivations automatiques ───────────────────────── */

const microLabel = new Map(microSkills.map((m) => [m.id, m.label]));

/** Libellés des micro-compétences d'une notion (checklist « je sais… »). */
function microsDe(notionId: string): string[] {
  return microSkills.filter((m) => m.notionId === notionId).map((m) => m.label);
}

/**
 * « Test de survie » : items imprimables de la banque du coach.
 * On garde les items fixes SANS figure ni audio, on couvre des
 * micro-compétences différentes, par difficulté croissante. Déterministe.
 */
function testDeSurvie(bank: TutorBankItemV4[], take = 3): KitExo[] {
  const imprimables = bank.filter(
    (i): i is TutorBankItemFixedV4 => i.kind === "fixed" && !i.canvas && !i.audioSrc
  );
  const parDifficulte = [...imprimables].sort((a, b) => a.difficulty - b.difficulty);

  const choisis: TutorBankItemFixedV4[] = [];
  const microsVus = new Set<string>();
  for (const item of parDifficulte) {
    if (choisis.length >= take) break;
    if (microsVus.has(item.microId)) continue;
    choisis.push(item);
    microsVus.add(item.microId);
  }
  // Complément si la banque a moins de micros distincts que `take`.
  for (const item of parDifficulte) {
    if (choisis.length >= take) break;
    if (!choisis.includes(item)) choisis.push(item);
  }

  return choisis.map((item) => ({
    id: item.id,
    micro: microLabel.get(item.microId) ?? item.microId,
    enonce: item.text,
    choices: item.format === "qcm" ? item.choices : undefined,
    reponse: item.expected[0] ?? "",
    corrige: item.explanation,
    difficulty: item.difficulty,
  }));
}

/* ─────────────────────────── le condensé de survie ────────────────────────── */

type Condense = Omit<KitNotion, "micros" | "exos">;

const CONDENSES: Condense[] = [
  /* ═══════════════ ALGÈBRE ═══════════════ */
  {
    id: "suites",
    emoji: "🪜",
    titre: "Suites numériques",
    domaine: "Algèbre",
    essentiel:
      "Une suite, c'est une liste de nombres numérotés : $u_n$. Deux familles à reconnaître au premier coup d'œil : **arithmétique** (on ajoute toujours le même nombre $r$) et **géométrique** (on multiplie toujours par le même $q$). Presque tout le chapitre tient dans ces deux modèles.",
    formules: [
      { label: "Arithmétique", latex: "$u_{n+1}=u_n+r$ et $u_n=u_0+n\\,r$" },
      { label: "Géométrique", latex: "$u_{n+1}=q\\,u_n$ et $u_n=u_0\\,q^n$" },
      { label: "Somme des entiers", latex: "$1+2+\\dots+n=\\dfrac{n(n+1)}{2}$" },
      { label: "Somme géométrique", latex: "$1+q+\\dots+q^n=\\dfrac{1-q^{n+1}}{1-q}$ (si $q\\neq 1$)" },
      { label: "Sens de variation", latex: "étudier le signe de $u_{n+1}-u_n$" },
    ],
    reflexes: [
      { si: "« on ajoute toujours $r$ »", alors: "suite arithmétique de raison $r$" },
      { si: "« on multiplie par $q$ » / « +5 % »", alors: "géométrique de raison $q$ (1,05 pour +5 %)" },
      { si: "« croissante ou décroissante ? »", alors: "signe de $u_{n+1}-u_n$" },
      { si: "somme de termes consécutifs", alors: "formule de somme (compter les termes !)" },
    ],
    pieges: [
      "Confondre $u_n = u_0 + n\\,r$ (départ $u_0$) et $u_n = u_1 + (n-1)\\,r$ (départ $u_1$) : tout dépend du premier terme.",
      "Croire qu'une géométrique de raison $q<1$ décroît toujours : si $u_0<0$, elle croît.",
      "Se tromper dans le nombre de termes d'une somme : de $u_3$ à $u_{10}$, il y a 8 termes, pas 7.",
    ],
    reel: "Un loyer qui augmente de 2 % par an : suite géométrique de raison 1,02 — au bout de 10 ans, ce n'est pas +20 %.",
  },
  {
    id: "second_degre",
    emoji: "📐",
    titre: "Second degré",
    domaine: "Algèbre",
    essentiel:
      "Tout trinôme $ax^2+bx+c$ se résout avec un seul nombre : le **discriminant** $\\Delta$. Il dit combien de racines (2, 1 ou 0), puis la chaîne est toujours la même : racines → factorisation → signe. Le signe de $a$ dit dans quel sens s'ouvre la parabole.",
    formules: [
      { label: "Discriminant", latex: "$\\Delta=b^2-4ac$" },
      { label: "Racines (si $\\Delta>0$)", latex: "$x=\\dfrac{-b\\pm\\sqrt{\\Delta}}{2a}$ ; si $\\Delta=0$ : $x_0=-\\dfrac{b}{2a}$" },
      { label: "Factorisation", latex: "$a(x-x_1)(x-x_2)$" },
      { label: "Forme canonique", latex: "$a(x-\\alpha)^2+\\beta$ avec $\\alpha=-\\dfrac{b}{2a}$, $\\beta=f(\\alpha)$" },
      { label: "Signe", latex: "signe de $a$ à l'extérieur des racines, signe de $-a$ entre" },
    ],
    reflexes: [
      { si: "équation avec $x^2$", alors: "calculer $\\Delta$" },
      { si: "inéquation du 2ⁿᵈ degré", alors: "racines + tableau de signe (jamais diviser par $x$)" },
      { si: "sommet, maximum, minimum", alors: "$\\alpha=-\\dfrac{b}{2a}$ (forme canonique)" },
      { si: "vérifier des racines", alors: "$x_1+x_2=-\\dfrac{b}{a}$ et $x_1 x_2=\\dfrac{c}{a}$" },
    ],
    pieges: [
      "Erreur de signe dans $b^2$ : si $b=-3$, alors $b^2=9$ (jamais $-9$).",
      "Si $\\Delta<0$, le trinôme n'a pas de racine mais il a un SIGNE : celui de $a$, partout.",
      "Oublier le facteur $a$ dans la factorisation $a(x-x_1)(x-x_2)$.",
    ],
    reel: "La trajectoire d'un ballon au stade : une parabole — le sommet est atteint en $x=-\\frac{b}{2a}$.",
  },

  /* ═══════════════ ANALYSE ═══════════════ */
  {
    id: "derivation",
    emoji: "📉",
    titre: "Dérivation",
    domaine: "Analyse",
    essentiel:
      "Dériver, c'est mesurer la **vitesse instantanée** de variation. Le nombre dérivé $f'(a)$ est la **pente de la tangente** au point d'abscisse $a$. On connaît les dérivées usuelles par cœur, puis trois règles (somme, produit, quotient) font tout le reste.",
    formules: [
      { label: "Usuelles", latex: "$(x^n)'=n\\,x^{n-1}$ ; $k'=0$ ; $(ax+b)'=a$" },
      { label: "Inverse et racine", latex: "$\\left(\\tfrac1x\\right)'=-\\tfrac1{x^2}$ ; $(\\sqrt x)'=\\tfrac1{2\\sqrt x}$" },
      { label: "Produit", latex: "$(uv)'=u'v+uv'$" },
      { label: "Quotient", latex: "$\\left(\\tfrac uv\\right)'=\\dfrac{u'v-uv'}{v^2}$" },
      { label: "Tangente en $a$", latex: "$y=f'(a)(x-a)+f(a)$" },
    ],
    reflexes: [
      { si: "« pente », « tangente », « vitesse »", alors: "nombre dérivé $f'(a)$" },
      { si: "calculer $f'(a)$", alors: "dériver D'ABORD, remplacer $x$ par $a$ ENSUITE" },
      { si: "produit ou quotient", alors: "les formules $u'v+uv'$ — jamais $u'v'$" },
    ],
    pieges: [
      "Confondre $f(a)$ (hauteur du point) et $f'(a)$ (pente de la tangente en ce point).",
      "Croire que $(u\\times v)'=u'\\times v'$ : FAUX, c'est $u'v+uv'$.",
      "Remplacer $x$ par $a$ avant de dériver : on obtient une constante, dérivée nulle — absurde.",
    ],
    reel: "Ta vitesse au compteur dans les lacets de Cilaos : un nombre dérivé. La moyenne du trajet ne dit rien du virage en cours.",
  },
  {
    id: "variations_fonctions",
    emoji: "📈",
    titre: "Variations et courbes",
    domaine: "Analyse",
    essentiel:
      "Le signe de $f'$ commande tout : $f'>0$ → $f$ monte, $f'<0$ → $f$ descend. Étudier une fonction = dériver, étudier le **signe de $f'$**, dresser le **tableau de variations**. Un extremum se cache là où $f'$ s'annule **en changeant de signe**.",
    formules: [
      { label: "Le lien clé", latex: "$f'>0$ sur $I$ ⟹ $f$ croissante sur $I$ (et inversement)" },
      { label: "Extremum local", latex: "$f'(x_0)=0$ ET $f'$ change de signe en $x_0$" },
      { label: "Plan d'étude", latex: "dériver → signe de $f'$ → tableau → extremums" },
      { label: "Signe de $f'$ du 2ⁿᵈ degré", latex: "$\\Delta$ et signe de $a$ (chapitre Second degré)" },
    ],
    reflexes: [
      { si: "« étudier les variations »", alors: "je dérive, puis signe de $f'$" },
      { si: "« maximum / minimum / optimiser »", alors: "extremum : $f'$ s'annule en changeant de signe" },
      { si: "problème d'aire, de coût, de volume", alors: "poser la fonction, puis la dériver" },
      { si: "« valeur du maximum »", alors: "c'est $f(x_0)$, pas $x_0$ (lire la question !)" },
    ],
    pieges: [
      "$f'(x_0)=0$ ne suffit pas : pour $f(x)=x^3$ en 0, $f'$ s'annule SANS changer de signe → pas d'extremum.",
      "Confondre le tableau de signe de $f'$ et le tableau de variations de $f$ (le second se déduit du premier).",
      "Répondre $x_0$ quand on demande $f(x_0)$, ou l'inverse.",
    ],
    reel: "La crue d'une rivière pendant un cyclone : tant que la dérivée (le débit entrant) est positive, le niveau monte.",
  },
  {
    id: "exponentielle",
    emoji: "🚀",
    titre: "Fonction exponentielle",
    domaine: "Analyse",
    essentiel:
      "$\\exp$ est LA fonction égale à sa propre dérivée : $(e^x)'=e^x$, avec $e^0=1$. Toujours **strictement positive**, toujours **croissante**. Elle transforme les sommes en produits : $e^{a+b}=e^a e^b$ — toutes les simplifications viennent de là.",
    formules: [
      { label: "Propriété clé", latex: "$e^{a+b}=e^a\\,e^b$ ; $e^{-a}=\\dfrac1{e^a}$ ; $\\dfrac{e^a}{e^b}=e^{a-b}$" },
      { label: "Puissance", latex: "$(e^a)^n=e^{na}$" },
      { label: "Dérivées", latex: "$(e^x)'=e^x$ ; $(e^{kx})'=k\\,e^{kx}$" },
      { label: "Signe et sens", latex: "$e^x>0$ pour tout $x$ ; $\\exp$ strictement croissante" },
    ],
    reflexes: [
      { si: "équation $e^u=e^v$", alors: "$u=v$ (l'exponentielle ne prend jamais deux fois la même valeur)" },
      { si: "signe d'un produit avec $e^x$", alors: "seul l'autre facteur compte ($e^x>0$)" },
      { si: "factoriser une expression en $e^x$", alors: "mettre $e^{kx}$ en facteur sans risque (jamais nul)" },
      { si: "croissance de $t$ % par période", alors: "modèle exponentiel / géométrique" },
    ],
    pieges: [
      "Écrire $e^{a+b}=e^a+e^b$ : FAUX — la somme devient un PRODUIT.",
      "Croire que $e^x$ peut être négatif ou nul : jamais.",
      "Dériver $e^{3x}$ en $e^{3x}$ : il manque le facteur 3 ($(e^{kx})'=k\\,e^{kx}$).",
    ],
    reel: "Les moustiques après une semaine de pluie : croissance exponentielle — d'où l'urgence de la démoustication.",
  },
  {
    id: "trigonometrie",
    emoji: "🌀",
    titre: "Fonctions trigonométriques",
    domaine: "Analyse",
    essentiel:
      "Le **radian** mesure un angle par la longueur d'arc : $\\pi$ rad $=180°$. Sur le **cercle trigonométrique** (rayon 1), $\\cos x$ est l'**abscisse** et $\\sin x$ l'**ordonnée** du point. Les valeurs remarquables par cœur + les angles associés = l'essentiel du chapitre.",
    formules: [
      { label: "Conversion", latex: "$180°=\\pi$ rad (degrés → radians : $\\times\\dfrac{\\pi}{180}$)" },
      { label: "Identité", latex: "$\\cos^2 x+\\sin^2 x=1$" },
      { label: "Valeurs (cos)", latex: "$0,\\dfrac{\\pi}{6},\\dfrac{\\pi}{4},\\dfrac{\\pi}{3},\\dfrac{\\pi}{2}$ → $1,\\dfrac{\\sqrt3}{2},\\dfrac{\\sqrt2}{2},\\dfrac12,0$ (sin : l'ordre inverse)" },
      { label: "Angles associés", latex: "$\\cos(-x)=\\cos x$ ; $\\sin(-x)=-\\sin x$" },
      { label: "Périodicité", latex: "$\\cos(x+2\\pi)=\\cos x$ ; $\\sin(x+2\\pi)=\\sin x$" },
    ],
    reflexes: [
      { si: "un angle en degrés", alors: "convertir en radians ($\\times\\pi/180$)" },
      { si: "placer $\\dfrac{5\\pi}{6}$ sur le cercle", alors: "partir de $(1;0)$, tourner dans le sens inverse des aiguilles" },
      { si: "angle associé ($\\pi-x$, $-x$…)", alors: "dessiner le cercle et lire les symétries" },
      { si: "$\\sin x$ connu, $\\cos x$ cherché", alors: "$\\cos^2 x+\\sin^2 x=1$ + signe selon le quadrant" },
    ],
    pieges: [
      "Calculatrice restée en degrés (ou en radians) : vérifier le mode AVANT de calculer.",
      "Confondre $\\cos$ (abscisse, axe horizontal) et $\\sin$ (ordonnée, axe vertical).",
      "Oublier le signe : au quadrant 2, $\\cos<0$ et $\\sin>0$.",
    ],
    reel: "Les alizés qui s'enroulent autour de l'anticyclone des Mascareignes : les modèles météo comptent ces angles en radians.",
  },

  /* ═══════════════ GÉOMÉTRIE ═══════════════ */
  {
    id: "produit_scalaire",
    emoji: "➡️",
    titre: "Produit scalaire",
    domaine: "Géométrie",
    essentiel:
      "Le produit scalaire multiplie deux vecteurs pour donner **un nombre**. Trois façons de le calculer — coordonnées, normes + angle, projection — on choisit selon les données. S'il vaut **0**, les vecteurs sont **orthogonaux** : c'est l'outil n°1 des angles droits.",
    formules: [
      { label: "Coordonnées", latex: "$\\vec u\\cdot\\vec v=xx'+yy'$" },
      { label: "Normes et angle", latex: "$\\vec u\\cdot\\vec v=\\lVert\\vec u\\rVert\\,\\lVert\\vec v\\rVert\\cos(\\vec u,\\vec v)$" },
      { label: "Orthogonalité", latex: "$\\vec u\\perp\\vec v \\iff \\vec u\\cdot\\vec v=0$" },
      { label: "Norme", latex: "$\\lVert\\vec u\\rVert=\\sqrt{x^2+y^2}$" },
      { label: "Al-Kashi", latex: "$a^2=b^2+c^2-2bc\\cos\\hat A$" },
    ],
    reflexes: [
      { si: "coordonnées connues", alors: "$xx'+yy'$ direct" },
      { si: "longueurs et angle connus", alors: "formule avec $\\cos$" },
      { si: "« montrer un angle droit »", alors: "produit scalaire nul" },
      { si: "triangle quelconque (3 longueurs, ou 2 + angle)", alors: "Al-Kashi" },
    ],
    pieges: [
      "Le produit scalaire est un NOMBRE, pas un vecteur.",
      "Al-Kashi : ne pas oublier le terme $-2bc\\cos\\hat A$ (sinon c'est Pythagore, réservé au triangle rectangle).",
      "Coordonnées d'un vecteur $\\overrightarrow{AB}$ : arrivée moins départ ($x_B-x_A$ ; $y_B-y_A$).",
    ],
    reel: "Vérifier qu'un mur est d'équerre sans rapporteur : deux vecteurs le long des cloisons, produit scalaire nul.",
  },
  {
    id: "geometrie_reperee",
    emoji: "🗺️",
    titre: "Géométrie repérée",
    domaine: "Géométrie",
    essentiel:
      "La géométrie devient du calcul : une **droite** = une équation $ax+by+c=0$ dont $\\vec n(a;b)$ est un **vecteur normal** ; un **cercle** = $(x-a)^2+(y-b)^2=r^2$ avec centre $(a;b)$ et rayon $r$. Savoir passer de l'objet à l'équation, et retour.",
    formules: [
      { label: "Droite", latex: "$ax+by+c=0$ ; vecteur normal $\\vec n(a;b)$ ; directeur $\\vec u(-b;a)$" },
      { label: "Cercle", latex: "centre $\\Omega(a;b)$, rayon $r$ : $(x-a)^2+(y-b)^2=r^2$" },
      { label: "Parabole", latex: "$y=ax^2+bx+c$ : sommet en $x=-\\dfrac{b}{2a}$" },
      { label: "Appartenance", latex: "un point est sur la courbe ⟺ ses coordonnées vérifient l'équation" },
    ],
    reflexes: [
      { si: "« perpendiculaire à la droite $d$ »", alors: "utiliser le vecteur normal de $d$" },
      { si: "équation $x^2+y^2+\\dots=0$", alors: "forme canonique pour lire centre et rayon" },
      { si: "« le point est-il sur… ? »", alors: "remplacer $x$ et $y$ par les coordonnées" },
      { si: "projeté orthogonal", alors: "intersection de la droite et de sa perpendiculaire passant par le point" },
    ],
    pieges: [
      "Les signes du centre : $(x-3)^2$ → abscisse $+3$ ; $(x+3)^2$ → abscisse $-3$.",
      "Oublier de compléter le carré ($x^2-6x = (x-3)^2-9$) pour trouver le cercle.",
      "Confondre vecteur normal (perpendiculaire à la droite) et vecteur directeur (le long de la droite).",
    ],
    reel: "La zone couverte par une antenne relais sur la carte : un cercle — centre l'antenne, rayon la portée.",
  },

  /* ═══════════════ PROBABILITÉS ═══════════════ */
  {
    id: "probabilites_conditionnelles",
    emoji: "🎲",
    titre: "Probabilités conditionnelles",
    domaine: "Probabilités et statistiques",
    essentiel:
      "$P_A(B)$ = la probabilité de $B$ **quand on sait** que $A$ a eu lieu : on réduit l'univers à $A$. L'**arbre pondéré** fait tout le travail : on **multiplie** le long d'une branche, on **additionne** les chemins. Indépendance = savoir $A$ ne change rien à $B$.",
    formules: [
      { label: "Conditionnelle", latex: "$P_A(B)=\\dfrac{P(A\\cap B)}{P(A)}$" },
      { label: "Branche d'arbre", latex: "$P(A\\cap B)=P(A)\\times P_A(B)$" },
      { label: "Probabilités totales", latex: "$P(B)=P(A\\cap B)+P(\\bar A\\cap B)$" },
      { label: "Indépendance", latex: "$P(A\\cap B)=P(A)\\,P(B)$ (⟺ $P_A(B)=P(B)$)" },
    ],
    reflexes: [
      { si: "« sachant que… »", alors: "probabilité conditionnelle" },
      { si: "expérience en deux étapes", alors: "arbre pondéré" },
      { si: "$P(B)$ sans condition", alors: "probabilités totales : additionner TOUS les chemins vers $B$" },
      { si: "« indépendants ? »", alors: "comparer $P(A\\cap B)$ et $P(A)\\,P(B)$" },
    ],
    pieges: [
      "Confondre $P_A(B)$ et $P(A\\cap B)$ : « sachant » n'est pas « et ».",
      "Confondre $P_A(B)$ et $P_B(A)$ : le sens du conditionnement compte.",
      "Sur un arbre, les branches issues d'un même nœud doivent sommer à 1 — sinon l'arbre est faux.",
    ],
    reel: "Un test médical : « positif sachant malade » et « malade sachant positif » ne sont PAS le même nombre — c'est tout l'enjeu du dépistage.",
  },
  {
    id: "variables_aleatoires",
    emoji: "🎯",
    titre: "Variables aléatoires",
    domaine: "Probabilités et statistiques",
    essentiel:
      "Une variable aléatoire $X$ attache un **nombre** à chaque issue (un gain, un score…). Sa **loi** = le tableau valeurs/probabilités (somme $=1$). L'**espérance** $E(X)$ est la moyenne pondérée par les probabilités : ce qu'on obtient « en moyenne » sur un grand nombre de répétitions.",
    formules: [
      { label: "Loi", latex: "tableau $x_i \\mapsto p_i$ avec $\\sum p_i=1$" },
      { label: "Espérance", latex: "$E(X)=\\sum x_i\\,p_i$" },
      { label: "Variance", latex: "$V(X)=\\sum p_i\\,(x_i-E(X))^2$" },
      { label: "Écart-type", latex: "$\\sigma(X)=\\sqrt{V(X)}$" },
    ],
    reflexes: [
      { si: "jeu d'argent", alors: "$X$ = gain ALGÉBRIQUE (mise déduite, valeurs négatives possibles)" },
      { si: "« jeu équitable ? »", alors: "$E(X)=0$" },
      { si: "$P(X\\leqslant a)$", alors: "additionner les probabilités de toutes les valeurs $\\leqslant a$" },
      { si: "loi terminée", alors: "vérifier que la somme des $p_i$ fait exactement 1" },
    ],
    pieges: [
      "Oublier de retirer la mise : gagner 10 € après avoir misé 2 €, c'est un gain de 8 €.",
      "$E(X)$ n'est pas forcément une valeur possible de $X$ (une moyenne de 0,5 sur des entiers, c'est normal).",
      "Une variance négative est IMPOSSIBLE : c'est le signal d'une erreur de calcul.",
    ],
    reel: "La tombola du collège : l'espérance du gain d'un billet à 2 € est négative — c'est l'organisateur qui finance le voyage.",
  },

  /* ═══════════════ ALGORITHMIQUE ═══════════════ */
  {
    id: "algorithmique",
    emoji: "💻",
    titre: "Algorithmique (Python)",
    domaine: "Algorithmique et programmation",
    essentiel:
      "Trois briques : les **listes** (stocker), les **boucles** (répéter), les **fonctions** (emballer un calcul). Le grand classique de Première : la **recherche de seuil** — une boucle `while` qui avance tant que la condition n'est pas atteinte.",
    formules: [
      { label: "Liste des termes", latex: "`[u(n) for n in range(10)]` — indices 0 à 9" },
      { label: "Boucle bornée", latex: "`for i in range(n):` répète $n$ fois ; `range(a,b)` va de $a$ à $b-1$" },
      { label: "Seuil", latex: "`while u < S:` … `n = n+1` — s'arrête au PREMIER dépassement" },
      { label: "Fonction", latex: "`def f(x): return 2*x+1` — une fonction RENVOIE avec `return`" },
    ],
    reflexes: [
      { si: "« à partir de quel rang… ? »", alors: "recherche de seuil : boucle `while`" },
      { si: "« que renvoie ce programme ? »", alors: "tableau d'étapes : suivre chaque variable ligne à ligne" },
      { si: "suite définie par récurrence", alors: "`u = f(u)` répété dans la boucle" },
      { si: "`range(n)`", alors: "dernier indice $n-1$ (jamais $n$)" },
    ],
    pieges: [
      "`range(10)` s'arrête à 9 : il produit bien 10 valeurs, mais la dernière est 9.",
      "Boucle infinie : si la condition du `while` ne peut jamais devenir fausse, le programme ne s'arrête pas.",
      "Confondre `print` (afficher) et `return` (renvoyer la valeur — utilisable ensuite).",
    ],
    reel: "« Dans combien d'années mon livret dépasse-t-il 1 000 € ? » : une recherche de seuil — un `while`, pas un `for`.",
  },
];

/* ─────────────────────────── assemblage automatique ───────────────────────── */

const BANQUES: Record<string, TutorBankItemV4[]> = {
  suites: suitesBank,
  second_degre: secondDegreBank,
  derivation: derivationBank,
  variations_fonctions: variationsFonctionsBank,
  exponentielle: exponentielleBank,
  trigonometrie: trigonometrieBank,
  produit_scalaire: produitScalaireBank,
  geometrie_reperee: geometrieRepereeBank,
  probabilites_conditionnelles: probabilitesConditionnellesBank,
  variables_aleatoires: variablesAleatoiresBank,
  algorithmique: algorithmiqueBank,
};

export const KIT_MATHS_PREMIERE: KitData = {
  slug: "maths-premiere",
  titre: "Kit de survie · Spé maths Première",
  baseline:
    "Les 11 chapitres du programme en 11 fiches : les formules qui sauvent, les réflexes, les pièges qui coûtent des points — et un test corrigé par chapitre. À imprimer, à glisser dans le classeur.",
  matiere: "maths",
  classeLabel: "Première · spécialité maths",
  coachClasse: "premiere-spe",
  notions: CONDENSES.map((c) => ({
    ...c,
    micros: microsDe(c.id),
    exos: testDeSurvie(BANQUES[c.id] ?? []),
  })),
};
