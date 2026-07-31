// lib/tutor-v4/questionBank/terminale-spe/maths/geometrie-espace-concours.bank.ts
//
// Notions : géométrie dans l'espace (geometrie_espace) et produit scalaire
// dans l'espace (produit_scalaire_espace).
// Calibrage : épreuve de mathématiques du Concours Avenir (sujet 2026),
// section « Géométrie » (questions 37 à 48).
//
// Les gestes qui reviennent :
//   - lire un vecteur normal directement sur l'équation cartésienne ;
//   - appliquer la formule de la distance d'un point à un plan ;
//   - substituer une représentation paramétrique dans une équation de plan
//     pour trouver l'intersection ;
//   - projeter orthogonalement en écrivant que le produit scalaire s'annule.
//
// Piège récurrent du concours : le vecteur normal « évident » n'est pas
// toujours proposé — il faut reconnaître un de ses multiples.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const geometrieEspaceConcoursBank: TutorBankItemV4[] = [
  /* =========================================================
     ESPACE_REPERE_COORDONNEES
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Dans l'espace, on considère $A(1\\,;\\,2\\,;\\,3)$ et $B(4\\,;\\,6\\,;\\,3)$. Les coordonnées de $\\overrightarrow{AB}$ sont :",
    format: "qcm",
    choices: [
      "$(3\\,;\\,4\\,;\\,0)$",
      "$(5\\,;\\,8\\,;\\,6)$",
      "$(-3\\,;\\,-4\\,;\\,0)$",
      "$(3\\,;\\,4\\,;\\,6)$",
    ],
    expected: ["$(3\\,;\\,4\\,;\\,0)$"],
    comparator: "mcq_exact",
    hint: "$\\overrightarrow{AB}$ se calcule par « arrivée moins départ ».",
    explanation: exp(
      "$\\overrightarrow{AB}\\left(x_B - x_A\\,;\\,y_B - y_A\\,;\\,z_B - z_A\\right)$.",
      "On soustrait les coordonnées de $A$ à celles de $B$.",
      "$(4-1\\,;\\,6-2\\,;\\,3-3) = (3\\,;\\,4\\,;\\,0)$. Additionner donnerait $(5\\,;\\,8\\,;\\,6)$, inverser l'ordre donnerait $\\overrightarrow{BA}$.",
      "$\\overrightarrow{AB}(3\\,;\\,4\\,;\\,0)$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Le milieu du segment $[AB]$, avec $A(2\\,;\\,0\\,;\\,4)$ et $B(0\\,;\\,4\\,;\\,-2)$, a pour coordonnées :",
    format: "qcm",
    choices: [
      "$(1\\,;\\,2\\,;\\,1)$",
      "$(2\\,;\\,4\\,;\\,2)$",
      "$(1\\,;\\,2\\,;\\,3)$",
      "$(-1\\,;\\,2\\,;\\,-3)$",
    ],
    expected: ["$(1\\,;\\,2\\,;\\,1)$"],
    comparator: "mcq_exact",
    hint: "On fait la moyenne coordonnée par coordonnée.",
    explanation: exp(
      "Le milieu de $[AB]$ a pour coordonnées $\\left(\\dfrac{x_A+x_B}{2}\\,;\\,\\dfrac{y_A+y_B}{2}\\,;\\,\\dfrac{z_A+z_B}{2}\\right)$.",
      "On calcule les trois moyennes.",
      "$\\dfrac{2+0}{2} = 1$, $\\dfrac{0+4}{2} = 2$, $\\dfrac{4-2}{2} = 1$. Oublier de diviser donnerait $(2\\,;\\,4\\,;\\,2)$.",
      "Le milieu est $(1\\,;\\,2\\,;\\,1)$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un repère orthonormé, la norme du vecteur $\\vec{u}(2\\,;\\,3\\,;\\,6)$ vaut :",
    format: "qcm",
    choices: ["$7$", "$11$", "$\\sqrt{41}$", "$49$"],
    expected: ["$7$"],
    comparator: "mcq_exact",
    hint: "$\\|\\vec{u}\\| = \\sqrt{x^2 + y^2 + z^2}$ — et $49$ est un carré parfait.",
    explanation: exp(
      "Dans un repère orthonormé, $\\|\\vec{u}\\| = \\sqrt{x^2+y^2+z^2}$.",
      "On calcule la somme des carrés, puis la racine.",
      "$4 + 9 + 36 = 49$, donc $\\|\\vec{u}\\| = \\sqrt{49} = 7$. Répondre $49$, c'est avoir oublié la racine ; $11$ serait la somme des coordonnées.",
      "La norme vaut $7$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "La distance $AB$, avec $A(1\\,;\\,0\\,;\\,0)$ et $B(4\\,;\\,4\\,;\\,0)$, vaut :",
    format: "qcm",
    choices: ["$5$", "$7$", "$\\sqrt{7}$", "$25$"],
    expected: ["$5$"],
    comparator: "mcq_exact",
    hint: "Calcule d'abord $\\overrightarrow{AB}$, puis sa norme.",
    explanation: exp(
      "$AB = \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2 + (z_B-z_A)^2}$.",
      "On calcule le vecteur, puis sa norme.",
      "$\\overrightarrow{AB}(3\\,;\\,4\\,;\\,0)$, donc $AB = \\sqrt{9 + 16} = \\sqrt{25} = 5$.",
      "La distance vaut $5$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 4,
    theme: "neutral",
    text: "Soient $A(5\\,;\\,5\\,;\\,-1)$ et $B(7\\,;\\,3\\,;\\,-9)$. Les coordonnées de $\\overrightarrow{AB}$ sont :",
    format: "qcm",
    choices: [
      "$(2\\,;\\,-2\\,;\\,-8)$",
      "$(-2\\,;\\,2\\,;\\,8)$",
      "$(12\\,;\\,8\\,;\\,-10)$",
      "$(2\\,;\\,2\\,;\\,8)$",
    ],
    expected: ["$(2\\,;\\,-2\\,;\\,-8)$"],
    comparator: "mcq_exact",
    hint: "Attention aux signes sur la troisième coordonnée : $-9 - (-1)$.",
    explanation: exp(
      "$\\overrightarrow{AB}\\left(x_B - x_A\\,;\\,y_B - y_A\\,;\\,z_B - z_A\\right)$.",
      "On soustrait en surveillant les signes.",
      "$(7-5\\,;\\,3-5\\,;\\,-9-(-1)) = (2\\,;\\,-2\\,;\\,-8)$. Le vecteur opposé $(-2\\,;\\,2\\,;\\,8)$ correspond à $\\overrightarrow{BA}$.",
      "$\\overrightarrow{AB}(2\\,;\\,-2\\,;\\,-8)$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  /* =========================================================
     ESPACE_VECTEURS
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 3,
    theme: "neutral",
    text: "Les vecteurs $\\vec{u}(1\\,;\\,2\\,;\\,3)$ et $\\vec{v}(2\\,;\\,4\\,;\\,6)$ sont :",
    format: "qcm",
    choices: ["colinéaires", "orthogonaux", "égaux", "de même norme"],
    expected: ["colinéaires"],
    comparator: "mcq_exact",
    hint: "Compare les coordonnées de $\\vec{v}$ à celles de $\\vec{u}$ : y a-t-il un facteur commun ?",
    explanation: exp(
      "Deux vecteurs sont colinéaires si l'un est un multiple de l'autre.",
      "On cherche un coefficient de proportionnalité.",
      "$\\vec{v} = 2\\vec{u}$ : le rapport est le même sur les trois coordonnées. Ils ne sont pas égaux, et leurs normes diffèrent d'un facteur $2$.",
      "Ils sont colinéaires."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 4,
    theme: "neutral",
    text: "Soient $\\vec{u}(1\\,;\\,0\\,;\\,1)$, $\\vec{v}(0\\,;\\,1\\,;\\,0)$ et $\\vec{w}(1\\,;\\,1\\,;\\,1)$. On peut affirmer que :",
    format: "qcm",
    choices: [
      "$\\vec{w} = \\vec{u} + \\vec{v}$",
      "$\\vec{w} = \\vec{u} - \\vec{v}$",
      "$\\vec{w} = 2\\vec{u}$",
      "les trois vecteurs sont colinéaires",
    ],
    expected: ["$\\vec{w} = \\vec{u} + \\vec{v}$"],
    comparator: "mcq_exact",
    hint: "Additionne coordonnée par coordonnée.",
    explanation: exp(
      "On additionne deux vecteurs coordonnée par coordonnée.",
      "On calcule $\\vec{u} + \\vec{v}$ et on compare à $\\vec{w}$.",
      "$\\vec{u} + \\vec{v} = (1+0\\,;\\,0+1\\,;\\,1+0) = (1\\,;\\,1\\,;\\,1) = \\vec{w}$.",
      "$\\vec{w} = \\vec{u} + \\vec{v}$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 4,
    theme: "neutral",
    text: "Trois vecteurs de l'espace sont coplanaires lorsque :",
    format: "qcm",
    choices: [
      "l'un s'écrit comme combinaison linéaire des deux autres",
      "ils sont deux à deux orthogonaux",
      "ils ont tous la même norme",
      "ils sont tous les trois nuls",
    ],
    expected: ["l'un s'écrit comme combinaison linéaire des deux autres"],
    comparator: "mcq_exact",
    hint: "Coplanaires : on peut les dessiner tous les trois dans un même plan.",
    explanation: exp(
      "Trois vecteurs sont coplanaires si l'un appartient au plan engendré par les deux autres.",
      "On traduit cette appartenance en écriture vectorielle.",
      "Cela signifie qu'il existe des réels $a$ et $b$ tels que $\\vec{w} = a\\vec{u} + b\\vec{v}$. L'orthogonalité deux à deux caractérise au contraire une base orthogonale, donc trois vecteurs non coplanaires.",
      "L'un s'écrit comme combinaison linéaire des deux autres."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 4,
    theme: "neutral",
    text: "Les vecteurs $\\vec{u}(2\\,;\\,-1\\,;\\,3)$ et $\\vec{v}(-4\\,;\\,2\\,;\\,-6)$ sont :",
    format: "qcm",
    choices: [
      "colinéaires et de sens contraire",
      "colinéaires et de même sens",
      "orthogonaux",
      "non colinéaires",
    ],
    expected: ["colinéaires et de sens contraire"],
    comparator: "mcq_exact",
    hint: "Cherche le coefficient : est-il positif ou négatif ?",
    explanation: exp(
      "Deux vecteurs colinéaires sont de même sens si le coefficient est positif, de sens contraire s'il est négatif.",
      "On cherche le coefficient de proportionnalité et on regarde son signe.",
      "$\\vec{v} = -2\\vec{u}$ : le coefficient $-2$ est négatif.",
      "Ils sont colinéaires et de sens contraire."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  /* =========================================================
     ESPACE_DROITE_PARAMETRIQUE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 4,
    theme: "neutral",
    text: "Soient $A(1\\,;\\,0\\,;\\,2)$ et $B(3\\,;\\,-1\\,;\\,5)$. Une représentation paramétrique de la droite $(AB)$ est (avec $t \\in \\mathbb{R}$) :",
    format: "qcm",
    choices: [
      "$x = 1 + 2t\\ ;\\ y = -t\\ ;\\ z = 2 + 3t$",
      "$x = 1 + t\\ ;\\ y = -t\\ ;\\ z = 2 + t$",
      "$x = 1 + 3t\\ ;\\ y = -t\\ ;\\ z = 2 + 2t$",
      "$x = 1 + 2t\\ ;\\ y = t\\ ;\\ z = 2 + 3t$",
    ],
    expected: ["$x = 1 + 2t\\ ;\\ y = -t\\ ;\\ z = 2 + 3t$"],
    comparator: "mcq_exact",
    hint: "Le point $A$ donne les constantes, le vecteur $\\overrightarrow{AB}$ donne les coefficients de $t$.",
    explanation: exp(
      "Une droite passant par $A$ et de vecteur directeur $\\vec{u}$ a pour représentation $M = A + t\\vec{u}$.",
      "On calcule $\\overrightarrow{AB}$, puis on assemble.",
      "$\\overrightarrow{AB}(2\\,;\\,-1\\,;\\,3)$, donc $x = 1 + 2t$, $y = 0 - t$, $z = 2 + 3t$.",
      "C'est la première proposition."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_11",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 3,
    theme: "neutral",
    text: "La droite de représentation paramétrique $x = 2 - t\\ ;\\ y = 1 + 3t\\ ;\\ z = 4t$ (avec $t \\in \\mathbb{R}$) admet pour vecteur directeur :",
    format: "qcm",
    choices: [
      "$(-1\\,;\\,3\\,;\\,4)$",
      "$(2\\,;\\,1\\,;\\,0)$",
      "$(1\\,;\\,3\\,;\\,4)$",
      "$(-1\\,;\\,-3\\,;\\,-4)$",
    ],
    expected: ["$(-1\\,;\\,3\\,;\\,4)$"],
    comparator: "mcq_exact",
    hint: "Le vecteur directeur se lit sur les coefficients de $t$, pas sur les constantes.",
    explanation: exp(
      "Dans $M = A + t\\vec{u}$, les coefficients de $t$ donnent $\\vec{u}$ et les constantes donnent $A$.",
      "On lit les coefficients de $t$ ligne par ligne.",
      "Les coefficients sont $-1$, $3$ et $4$. Le triplet $(2\\,;\\,1\\,;\\,0)$ est un point de la droite, pas un vecteur directeur.",
      "Un vecteur directeur est $(-1\\,;\\,3\\,;\\,4)$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_12",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 3,
    theme: "neutral",
    text: "Le point $A(2\\,;\\,1\\,;\\,0)$ appartient-il à la droite $x = 2 - t\\ ;\\ y = 1 + 3t\\ ;\\ z = 4t$ ?",
    format: "qcm",
    choices: [
      "oui, pour $t = 0$",
      "non, il n'appartient pas à la droite",
      "oui, pour $t = 1$",
      "oui, pour $t = 2$",
    ],
    expected: ["oui, pour $t = 0$"],
    comparator: "mcq_exact",
    hint: "Cherche s'il existe une valeur de $t$ donnant les trois coordonnées à la fois.",
    explanation: exp(
      "Un point appartient à la droite s'il existe une valeur de $t$ vérifiant les trois équations.",
      "On résout la première équation, puis on vérifie sur les deux autres.",
      "$2 - t = 2$ donne $t = 0$. Pour $t = 0$ : $y = 1$ et $z = 0$ : les trois coordonnées correspondent.",
      "Oui, pour $t = 0$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_13",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 3,
    theme: "neutral",
    text: "Deux droites de l'espace dont les vecteurs directeurs sont colinéaires sont :",
    format: "qcm",
    choices: [
      "parallèles ou confondues",
      "nécessairement sécantes",
      "orthogonales",
      "non coplanaires",
    ],
    expected: ["parallèles ou confondues"],
    comparator: "mcq_exact",
    hint: "Même direction : elles ne peuvent pas se croiser en un seul point.",
    explanation: exp(
      "Deux droites de même direction sont parallèles ; elles sont confondues si elles ont un point commun.",
      "On distingue les deux cas selon l'existence d'un point commun.",
      "Des directions colinéaires interdisent d'être sécantes en un unique point, et interdisent aussi d'être non coplanaires.",
      "Elles sont parallèles ou confondues."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_14",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 5,
    theme: "neutral",
    text: "Soient $d_1 : x = t\\ ;\\ y = 1\\ ;\\ z = 2 + t$ et $d_2 : x = 1 - s\\ ;\\ y = 1\\ ;\\ z = 1 + s$. On peut affirmer que ces droites sont :",
    format: "qcm",
    choices: [
      "sécantes au point $(0\\,;\\,1\\,;\\,2)$",
      "parallèles",
      "non coplanaires",
      "sécantes au point $(1\\,;\\,1\\,;\\,2)$",
    ],
    expected: ["sécantes au point $(0\\,;\\,1\\,;\\,2)$"],
    comparator: "mcq_exact",
    hint: "Égale les coordonnées et résous le système en $t$ et $s$.",
    explanation: exp(
      "Deux droites sont sécantes s'il existe des paramètres donnant le même point.",
      "On écrit l'égalité des trois coordonnées et on résout.",
      "$t = 1 - s$ et $2 + t = 1 + s$ donnent $t = s - 1$, puis $s - 1 = 1 - s$, soit $s = 1$ et $t = 0$. Le point commun est $(0\\,;\\,1\\,;\\,2)$. Les directions $(1\\,;\\,0\\,;\\,1)$ et $(-1\\,;\\,0\\,;\\,1)$ ne sont pas colinéaires : les droites ne sont pas parallèles.",
      "Elles sont sécantes au point $(0\\,;\\,1\\,;\\,2)$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  /* =========================================================
     ESPACE_PLAN_EQUATION
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_15",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 5,
    theme: "neutral",
    text: "On considère le plan $\\mathscr{P}$ d'équation $2x - y + z - 3 = 0$. Parmi les vecteurs suivants, lequel est normal à $\\mathscr{P}$ ?",
    format: "qcm",
    choices: [
      "$(4\\,;\\,-2\\,;\\,2)$",
      "$(1\\,;\\,-2\\,;\\,1)$",
      "$(2\\,;\\,1\\,;\\,-1)$",
      "$(2\\,;\\,1\\,;\\,1)$",
    ],
    expected: ["$(4\\,;\\,-2\\,;\\,2)$"],
    comparator: "mcq_exact",
    hint: "Le vecteur $(2\\,;\\,-1\\,;\\,1)$ n'est pas proposé : cherche un de ses multiples.",
    explanation: exp(
      "Le plan d'équation $ax + by + cz + d = 0$ admet $(a\\,;\\,b\\,;\\,c)$ pour vecteur normal, ainsi que tous ses multiples.",
      "On lit les coefficients, puis on cherche un vecteur colinéaire parmi les propositions.",
      "Ici $(a\\,;\\,b\\,;\\,c) = (2\\,;\\,-1\\,;\\,1)$, absent de la liste. Or $(4\\,;\\,-2\\,;\\,2) = 2 \\times (2\\,;\\,-1\\,;\\,1)$ : il est bien normal au plan.",
      "Le vecteur $(4\\,;\\,-2\\,;\\,2)$ est normal à $\\mathscr{P}$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_16",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 4,
    theme: "neutral",
    text: "Une équation cartésienne du plan passant par $A(1\\,;\\,2\\,;\\,3)$ et de vecteur normal $\\vec{n}(1\\,;\\,1\\,;\\,1)$ est :",
    format: "qcm",
    choices: [
      "$x + y + z - 6 = 0$",
      "$x + y + z = 0$",
      "$x + y + z - 1 = 0$",
      "$x - y + z - 2 = 0$",
    ],
    expected: ["$x + y + z - 6 = 0$"],
    comparator: "mcq_exact",
    hint: "Écris $x + y + z + d = 0$, puis impose que $A$ appartienne au plan.",
    explanation: exp(
      "Le plan de vecteur normal $(a\\,;\\,b\\,;\\,c)$ a une équation de la forme $ax + by + cz + d = 0$.",
      "On écrit la forme générale, puis on détermine $d$ avec le point donné.",
      "$x + y + z + d = 0$ et $1 + 2 + 3 + d = 0$ donnent $d = -6$.",
      "Une équation est $x + y + z - 6 = 0$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_17",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un repère orthonormé $\\left(O\\,;\\,\\vec{i}\\,,\\,\\vec{j}\\,,\\,\\vec{k}\\right)$, le plan d'équation $z = 0$ est :",
    format: "qcm",
    choices: [
      "le plan $(Oxy)$",
      "le plan $(Oxz)$",
      "le plan $(Oyz)$",
      "l'axe $(Oz)$",
    ],
    expected: ["le plan $(Oxy)$"],
    comparator: "mcq_exact",
    hint: "$z = 0$ signifie « altitude nulle » : $x$ et $y$ restent libres.",
    explanation: exp(
      "Une équation de plan impose une contrainte ; les deux autres coordonnées restent libres.",
      "On repère quelles coordonnées sont libres.",
      "$z = 0$ laisse $x$ et $y$ quelconques : c'est le plan engendré par $\\vec{i}$ et $\\vec{j}$, noté $(Oxy)$.",
      "C'est le plan $(Oxy)$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_18",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $\\mathscr{P}$ le plan passant par $A(1\\,;\\,2\\,;\\,3)$ et admettant $\\vec{u}(1\\,;\\,0\\,;\\,1)$ et $\\vec{v}(0\\,;\\,1\\,;\\,1)$ pour vecteurs directeurs. Une équation cartésienne de $\\mathscr{P}$ est :",
    format: "qcm",
    choices: [
      "$x + y - z = 0$",
      "$x - y + z = 0$",
      "$x + y + z = 6$",
      "$x + y - z = 6$",
    ],
    expected: ["$x + y - z = 0$"],
    comparator: "mcq_exact",
    hint: "Cherche $(a\\,;\\,b\\,;\\,c)$ orthogonal à la fois à $\\vec{u}$ et à $\\vec{v}$.",
    explanation: exp(
      "Un vecteur normal au plan est orthogonal aux deux vecteurs directeurs.",
      "On résout $\\vec{n}\\cdot\\vec{u} = 0$ et $\\vec{n}\\cdot\\vec{v} = 0$, puis on ajuste la constante avec $A$.",
      "$a + c = 0$ et $b + c = 0$ donnent $a = b = -c$ : on peut prendre $\\vec{n}(1\\,;\\,1\\,;\\,-1)$. L'équation s'écrit $x + y - z + d = 0$, et $1 + 2 - 3 + d = 0$ donne $d = 0$.",
      "Une équation est $x + y - z = 0$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_19",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 4,
    theme: "neutral",
    text: "Les plans d'équations $x + y + z = 3$ et $2x + 2y + 2z = 1$ sont :",
    format: "qcm",
    choices: [
      "parallèles et distincts",
      "sécants selon une droite",
      "confondus",
      "perpendiculaires",
    ],
    expected: ["parallèles et distincts"],
    comparator: "mcq_exact",
    hint: "Divise la seconde équation par $2$ et compare les constantes.",
    explanation: exp(
      "Deux plans sont parallèles si leurs vecteurs normaux sont colinéaires ; confondus si les équations sont proportionnelles.",
      "On normalise la seconde équation pour comparer.",
      "$2x + 2y + 2z = 1$ équivaut à $x + y + z = \\dfrac{1}{2}$. Même vecteur normal que le premier plan, mais constante différente de $3$ : ils sont parallèles sans être confondus.",
      "Ils sont parallèles et distincts."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  /* =========================================================
     ESPACE_POSITION_RELATIVE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_20",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 4,
    theme: "neutral",
    text: "On considère $\\Pi_1 : x + y + z = 3$ et $\\Pi_2 : 2x - y + z = 1$. L'intersection $\\Pi_1 \\cap \\Pi_2$ est :",
    format: "qcm",
    choices: ["une droite", "un plan", "un point", "l'ensemble vide"],
    expected: ["une droite"],
    comparator: "mcq_exact",
    hint: "Les vecteurs normaux $(1\\,;\\,1\\,;\\,1)$ et $(2\\,;\\,-1\\,;\\,1)$ sont-ils colinéaires ?",
    explanation: exp(
      "Deux plans non parallèles se coupent selon une droite.",
      "On compare les vecteurs normaux.",
      "$(1\\,;\\,1\\,;\\,1)$ et $(2\\,;\\,-1\\,;\\,1)$ ne sont pas colinéaires : les plans ne sont ni parallèles ni confondus. Deux plans ne peuvent jamais se couper en un seul point.",
      "L'intersection est une droite."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_21",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 3,
    theme: "neutral",
    text: "Une droite non parallèle à un plan et non contenue dans ce plan le coupe en :",
    format: "qcm",
    choices: ["un point", "une droite", "aucun point", "un plan"],
    expected: ["un point"],
    comparator: "mcq_exact",
    hint: "Substituer la représentation paramétrique dans l'équation donne une équation d'inconnue $t$.",
    explanation: exp(
      "Une droite est soit incluse dans un plan, soit parallèle sans point commun, soit sécante en un point.",
      "On substitue la représentation paramétrique dans l'équation du plan.",
      "On obtient une équation du premier degré en $t$ qui, hors cas parallèle, admet exactement une solution.",
      "Elle le coupe en un point."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_22",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 5,
    theme: "neutral",
    text: "Soient $\\mathscr{P} : x - y + 2z - 3 = 0$ et $d : x = 1 + t\\ ;\\ y = 1 - t\\ ;\\ z = t$. Le point d'intersection de $d$ et $\\mathscr{P}$ est :",
    format: "qcm",
    choices: [
      "$\\left(\\dfrac{7}{4}\\,;\\,\\dfrac{1}{4}\\,;\\,\\dfrac{3}{4}\\right)$",
      "$(1\\,;\\,1\\,;\\,0)$",
      "$\\left(\\dfrac{3}{2}\\,;\\,\\dfrac{1}{2}\\,;\\,1\\right)$",
      "$\\left(\\dfrac{3}{2}\\,;\\,\\dfrac{1}{2}\\,;\\,\\dfrac{1}{2}\\right)$",
    ],
    expected: ["$\\left(\\dfrac{7}{4}\\,;\\,\\dfrac{1}{4}\\,;\\,\\dfrac{3}{4}\\right)$"],
    comparator: "mcq_exact",
    hint: "Remplace $x$, $y$ et $z$ par leurs expressions en $t$ dans l'équation du plan.",
    explanation: exp(
      "Le point d'intersection correspond à la valeur de $t$ vérifiant l'équation du plan.",
      "On substitue, on résout en $t$, puis on remplace.",
      "$(1+t) - (1-t) + 2t - 3 = 4t - 3 = 0$, donc $t = \\dfrac{3}{4}$. Alors $x = \\dfrac{7}{4}$, $y = \\dfrac{1}{4}$, $z = \\dfrac{3}{4}$.",
      "Le point est $\\left(\\dfrac{7}{4}\\,;\\,\\dfrac{1}{4}\\,;\\,\\dfrac{3}{4}\\right)$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_23",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 4,
    theme: "neutral",
    text: "Deux plans dont les vecteurs normaux sont colinéaires sont :",
    format: "qcm",
    choices: [
      "parallèles ou confondus",
      "sécants selon une droite",
      "perpendiculaires",
      "sécants en un point",
    ],
    expected: ["parallèles ou confondus"],
    comparator: "mcq_exact",
    hint: "Même direction normale signifie même « inclinaison ».",
    explanation: exp(
      "La direction d'un plan est entièrement déterminée par son vecteur normal.",
      "On compare les vecteurs normaux, puis les constantes.",
      "Des normales colinéaires donnent des plans de même direction : ils sont parallèles, et confondus si leurs équations sont proportionnelles. Deux plans ne se coupent jamais en un seul point.",
      "Ils sont parallèles ou confondus."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_24",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 4,
    theme: "neutral",
    text: "Deux droites de l'espace non coplanaires :",
    format: "qcm",
    choices: [
      "n'ont aucun point commun et ne sont pas parallèles",
      "sont parallèles",
      "sont sécantes",
      "sont confondues",
    ],
    expected: ["n'ont aucun point commun et ne sont pas parallèles"],
    comparator: "mcq_exact",
    hint: "Deux droites parallèles, comme deux droites sécantes, définissent toujours un plan.",
    explanation: exp(
      "Deux droites sont coplanaires si elles appartiennent à un même plan.",
      "On élimine les cas qui forceraient la coplanarité.",
      "Deux droites parallèles définissent un plan ; deux droites sécantes aussi. Ne pas être coplanaires exclut donc les deux, et interdit tout point commun.",
      "Elles n'ont aucun point commun et ne sont pas parallèles."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  /* =========================================================
     ESPACE_DEFI
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_25",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit le tétraèdre $OABC$ avec $O(0\\,;\\,0\\,;\\,0)$, $A(2\\,;\\,0\\,;\\,0)$, $B(0\\,;\\,3\\,;\\,0)$ et $C(0\\,;\\,0\\,;\\,6)$. Son volume, en unités de volume, vaut :",
    format: "qcm",
    choices: ["$6$", "$9$", "$12$", "$18$"],
    expected: ["$6$"],
    comparator: "mcq_exact",
    hint: "Prends $OAB$ comme base : c'est un triangle rectangle en $O$, et $[OC]$ est la hauteur.",
    explanation: exp(
      "Le volume d'un tétraèdre vaut $\\dfrac{1}{3} \\times \\mathcal{B} \\times h$.",
      "On choisit une base facile à calculer et la hauteur associée.",
      "Le triangle $OAB$ est rectangle en $O$ : son aire vaut $\\dfrac{2 \\times 3}{2} = 3$. L'arête $[OC]$, de longueur $6$, est perpendiculaire à ce plan. Donc $V = \\dfrac{1}{3} \\times 3 \\times 6 = 6$. Oublier le tiers donnerait $18$.",
      "Le volume vaut $6$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_26",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Le volume d'une pyramide de base d'aire $\\mathcal{B}$ et de hauteur $h$ vaut :",
    format: "qcm",
    choices: [
      "$\\dfrac{1}{3}\\mathcal{B}h$",
      "$\\mathcal{B}h$",
      "$\\dfrac{1}{2}\\mathcal{B}h$",
      "$\\dfrac{1}{6}\\mathcal{B}h$",
    ],
    expected: ["$\\dfrac{1}{3}\\mathcal{B}h$"],
    comparator: "mcq_exact",
    hint: "C'est le tiers du prisme de même base et de même hauteur.",
    explanation: exp(
      "Le volume d'une pyramide vaut le tiers de celui du prisme de même base et de même hauteur.",
      "On applique la formule du programme.",
      "$V = \\dfrac{1}{3}\\mathcal{B}h$. Le facteur $\\dfrac{1}{2}$ est celui de l'aire d'un triangle, pas d'un volume.",
      "Le volume vaut $\\dfrac{1}{3}\\mathcal{B}h$."
    ),
    tags: ["terminale-spe", "espace", "concours-avenir", "qcm"],
  },

  /* =========================================================
     PS_ESPACE_CALCULER
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_27",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un repère orthonormé, le produit scalaire $\\vec{u}\\cdot\\vec{v}$ avec $\\vec{u}(1\\,;\\,2\\,;\\,0)$ et $\\vec{v}(2\\,;\\,1\\,;\\,0)$ vaut :",
    format: "qcm",
    choices: ["$4$", "$0$", "$2$", "$5$"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "On multiplie les coordonnées deux à deux, puis on additionne.",
    explanation: exp(
      "En repère orthonormé, $\\vec{u}\\cdot\\vec{v} = xx' + yy' + zz'$.",
      "On calcule les trois produits et on les additionne.",
      "$1 \\times 2 + 2 \\times 1 + 0 \\times 0 = 2 + 2 = 4$.",
      "Le produit scalaire vaut $4$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_28",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Le produit scalaire $\\vec{u}\\cdot\\vec{v}$ avec $\\vec{u}(1\\,;\\,-1\\,;\\,2)$ et $\\vec{v}(3\\,;\\,1\\,;\\,1)$ vaut :",
    format: "qcm",
    choices: ["$4$", "$6$", "$2$", "$0$"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "Attention au signe de la deuxième coordonnée.",
    explanation: exp(
      "En repère orthonormé, $\\vec{u}\\cdot\\vec{v} = xx' + yy' + zz'$.",
      "On calcule les trois produits en surveillant les signes.",
      "$1 \\times 3 + (-1) \\times 1 + 2 \\times 1 = 3 - 1 + 2 = 4$.",
      "Le produit scalaire vaut $4$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_29",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $\\vec{u}(2\\,;\\,3\\,;\\,6)$, le produit scalaire $\\vec{u}\\cdot\\vec{u}$ vaut :",
    format: "qcm",
    choices: ["$49$", "$7$", "$11$", "$\\sqrt{49}$"],
    expected: ["$49$"],
    comparator: "mcq_exact",
    hint: "$\\vec{u}\\cdot\\vec{u} = \\|\\vec{u}\\|^{2}$ : c'est un carré, pas une norme.",
    explanation: exp(
      "$\\vec{u}\\cdot\\vec{u} = \\|\\vec{u}\\|^{2} = x^2 + y^2 + z^2$.",
      "On calcule la somme des carrés, sans prendre la racine.",
      "$4 + 9 + 36 = 49$. La norme, elle, vaudrait $7$ : c'est le piège.",
      "$\\vec{u}\\cdot\\vec{u} = 49$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_30",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Si $\\vec{u}$ et $\\vec{v}$ sont deux vecteurs non nuls tels que $\\vec{u}\\cdot\\vec{v} = 0$, alors ils sont :",
    format: "qcm",
    choices: ["orthogonaux", "colinéaires", "égaux", "de même norme"],
    expected: ["orthogonaux"],
    comparator: "mcq_exact",
    hint: "$\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$ : quel angle annule le cosinus ?",
    explanation: exp(
      "Deux vecteurs non nuls sont orthogonaux si et seulement si leur produit scalaire est nul.",
      "On utilise l'expression avec le cosinus.",
      "Les normes étant non nulles, $\\cos\\theta = 0$, donc $\\theta = \\dfrac{\\pi}{2}$. Des vecteurs colinéaires auraient au contraire un produit scalaire maximal en valeur absolue.",
      "Ils sont orthogonaux."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_31",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 5,
    theme: "neutral",
    text: "Soient $A$, $B$ et $C$ trois points tels que $AB = 8$ cm, $BC = 4$ cm et $AC = 6$ cm. Alors $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$ vaut :",
    format: "qcm",
    choices: ["$42$", "$-42$", "$84$", "$24$"],
    expected: ["$42$"],
    comparator: "mcq_exact",
    hint: "Écris $\\overrightarrow{BC} = \\overrightarrow{AC} - \\overrightarrow{AB}$ et développe la norme au carré.",
    explanation: exp(
      "$\\left\\|\\vec{a} - \\vec{b}\\right\\|^{2} = \\|\\vec{a}\\|^2 + \\|\\vec{b}\\|^2 - 2\\,\\vec{a}\\cdot\\vec{b}$.",
      "On exprime $\\overrightarrow{BC}$ à partir des deux autres vecteurs, puis on développe.",
      "$BC^2 = AC^2 + AB^2 - 2\\,\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$, soit $16 = 36 + 64 - 2\\,\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$. Donc $2\\,\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = 84$.",
      "$\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = 42$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  /* =========================================================
     PS_ESPACE_ORTHOGONALITE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_32",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 3,
    theme: "neutral",
    text: "Les vecteurs $\\vec{u}(1\\,;\\,2\\,;\\,3)$ et $\\vec{v}(3\\,;\\,0\\,;\\,-1)$ sont :",
    format: "qcm",
    choices: ["orthogonaux", "colinéaires", "égaux", "ni orthogonaux ni colinéaires"],
    expected: ["orthogonaux"],
    comparator: "mcq_exact",
    hint: "Calcule le produit scalaire : s'il est nul, la réponse est immédiate.",
    explanation: exp(
      "Deux vecteurs sont orthogonaux si et seulement si leur produit scalaire est nul.",
      "On calcule le produit scalaire.",
      "$1 \\times 3 + 2 \\times 0 + 3 \\times (-1) = 3 + 0 - 3 = 0$.",
      "Ils sont orthogonaux."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_33",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 4,
    theme: "neutral",
    text: "Pour quelle valeur du réel $m$ les vecteurs $\\vec{u}(1\\,;\\,m\\,;\\,2)$ et $\\vec{v}(3\\,;\\,1\\,;\\,-3)$ sont-ils orthogonaux ?",
    format: "qcm",
    choices: ["$m = 3$", "$m = -3$", "$m = 0$", "$m = 6$"],
    expected: ["$m = 3$"],
    comparator: "mcq_exact",
    hint: "Écris que le produit scalaire est nul, puis résous en $m$.",
    explanation: exp(
      "Deux vecteurs sont orthogonaux si et seulement si leur produit scalaire est nul.",
      "On exprime le produit scalaire en fonction de $m$, puis on résout.",
      "$\\vec{u}\\cdot\\vec{v} = 3 + m - 6 = m - 3$. L'annuler donne $m = 3$.",
      "$m = 3$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_34",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 4,
    theme: "neutral",
    text: "Une droite est orthogonale à un plan lorsque son vecteur directeur est :",
    format: "qcm",
    choices: [
      "colinéaire à un vecteur normal du plan",
      "orthogonal à un vecteur normal du plan",
      "contenu dans le plan",
      "de norme égale à $1$",
    ],
    expected: ["colinéaire à un vecteur normal du plan"],
    comparator: "mcq_exact",
    hint: "Le vecteur normal indique justement la direction perpendiculaire au plan.",
    explanation: exp(
      "Un vecteur normal à un plan est orthogonal à toutes les directions de ce plan.",
      "On traduit « la droite est perpendiculaire au plan » en termes de vecteurs.",
      "La droite doit pointer dans la direction normale : son vecteur directeur est colinéaire à $\\vec{n}$. S'il était orthogonal à $\\vec{n}$, la droite serait au contraire parallèle au plan.",
      "Il est colinéaire à un vecteur normal du plan."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_35",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 4,
    theme: "neutral",
    text: "Les vecteurs $\\vec{u}(1\\,;\\,1\\,;\\,0)$ et $\\vec{v}(1\\,;\\,-1\\,;\\,0)$ sont :",
    format: "qcm",
    choices: [
      "orthogonaux et de même norme",
      "colinéaires",
      "orthogonaux et de normes différentes",
      "égaux",
    ],
    expected: ["orthogonaux et de même norme"],
    comparator: "mcq_exact",
    hint: "Calcule le produit scalaire, puis les deux normes.",
    explanation: exp(
      "On teste séparément l'orthogonalité (produit scalaire nul) et l'égalité des normes.",
      "On calcule le produit scalaire, puis chaque norme.",
      "$1 \\times 1 + 1 \\times (-1) + 0 = 0$ : orthogonaux. Et $\\|\\vec{u}\\| = \\|\\vec{v}\\| = \\sqrt{2}$.",
      "Ils sont orthogonaux et de même norme."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  /* =========================================================
     PS_ESPACE_NORME_DISTANCE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_36",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 5,
    theme: "neutral",
    text: "La distance du point $A(-3\\,;\\,1\\,;\\,1)$ au plan d'équation $x + y - z = 0$ vaut :",
    format: "qcm",
    choices: ["$\\sqrt{3}$", "$1$", "$\\sqrt{2}$", "$0$"],
    expected: ["$\\sqrt{3}$"],
    comparator: "mcq_exact",
    hint: "$d = \\dfrac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2+b^2+c^2}}$.",
    explanation: exp(
      "La distance d'un point $M(x_0\\,;\\,y_0\\,;\\,z_0)$ au plan $ax+by+cz+d=0$ vaut $\\dfrac{|ax_0+by_0+cz_0+d|}{\\sqrt{a^2+b^2+c^2}}$.",
      "On applique la formule en n'oubliant pas la valeur absolue.",
      "Numérateur : $|-3 + 1 - 1| = 3$. Dénominateur : $\\sqrt{1+1+1} = \\sqrt{3}$. Donc $d = \\dfrac{3}{\\sqrt{3}} = \\sqrt{3}$.",
      "La distance vaut $\\sqrt{3}$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_37",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 5,
    theme: "neutral",
    text: "La distance du point $M(2\\,;\\,0\\,;\\,2)$ au plan d'équation $x - y + 2z - 3 = 0$ vaut :",
    format: "qcm",
    choices: [
      "$\\dfrac{\\sqrt{6}}{2}$",
      "$\\dfrac{1}{\\sqrt{6}}$",
      "$\\dfrac{\\sqrt{6}}{3}$",
      "$\\sqrt{3}$",
    ],
    expected: ["$\\dfrac{\\sqrt{6}}{2}$"],
    comparator: "mcq_exact",
    hint: "Pense à rendre le dénominateur rationnel après le calcul.",
    explanation: exp(
      "La distance d'un point au plan $ax+by+cz+d=0$ vaut $\\dfrac{|ax_0+by_0+cz_0+d|}{\\sqrt{a^2+b^2+c^2}}$.",
      "On applique la formule, puis on simplifie l'écriture.",
      "Numérateur : $|2 - 0 + 4 - 3| = 3$. Dénominateur : $\\sqrt{1+1+4} = \\sqrt{6}$. Donc $d = \\dfrac{3}{\\sqrt{6}} = \\dfrac{3\\sqrt{6}}{6} = \\dfrac{\\sqrt{6}}{2}$.",
      "La distance vaut $\\dfrac{\\sqrt{6}}{2}$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_38",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 4,
    theme: "neutral",
    text: "La distance d'un point $M(x_0\\,;\\,y_0\\,;\\,z_0)$ au plan d'équation $ax + by + cz + d = 0$ est donnée par :",
    format: "qcm",
    choices: [
      "$\\dfrac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}$",
      "$\\dfrac{ax_0 + by_0 + cz_0 + d}{\\sqrt{a^2 + b^2 + c^2}}$",
      "$\\dfrac{|ax_0 + by_0 + cz_0 + d|}{a + b + c}$",
      "$\\left|ax_0 + by_0 + cz_0 + d\\right|$",
    ],
    expected: [
      "$\\dfrac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}$",
    ],
    comparator: "mcq_exact",
    hint: "Une distance est toujours positive : la valeur absolue est indispensable.",
    explanation: exp(
      "La distance au plan se calcule en normalisant le vecteur normal.",
      "On vérifie la présence de la valeur absolue et de la norme au dénominateur.",
      "Sans valeur absolue, le résultat pourrait être négatif : impossible pour une distance. Le dénominateur est la norme $\\sqrt{a^2+b^2+c^2}$ du vecteur normal, pas la somme $a+b+c$.",
      "C'est la première formule."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_39",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 3,
    theme: "neutral",
    text: "La norme du vecteur $\\vec{u}(1\\,;\\,2\\,;\\,2)$ vaut :",
    format: "qcm",
    choices: ["$3$", "$5$", "$\\sqrt{5}$", "$9$"],
    expected: ["$3$"],
    comparator: "mcq_exact",
    hint: "$1 + 4 + 4$ est un carré parfait.",
    explanation: exp(
      "En repère orthonormé, $\\|\\vec{u}\\| = \\sqrt{x^2+y^2+z^2}$.",
      "On calcule la somme des carrés, puis la racine.",
      "$1 + 4 + 4 = 9$, donc $\\|\\vec{u}\\| = 3$. Répondre $9$, c'est avoir oublié la racine ; $5$ serait la somme des coordonnées.",
      "La norme vaut $3$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_40",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 5,
    theme: "neutral",
    text: "La distance du point $M(2\\,;\\,0\\,;\\,2)$ à la droite $d : x = 1 + t\\ ;\\ y = 1 - t\\ ;\\ z = t$ vaut :",
    format: "qcm",
    choices: [
      "$\\dfrac{\\sqrt{6}}{3}$",
      "$\\dfrac{\\sqrt{6}}{2}$",
      "$\\dfrac{1}{\\sqrt{6}}$",
      "$0$",
    ],
    expected: ["$\\dfrac{\\sqrt{6}}{3}$"],
    comparator: "mcq_exact",
    hint: "Cherche le point $P(t)$ de $d$ tel que $\\overrightarrow{MP}$ soit orthogonal au vecteur directeur.",
    explanation: exp(
      "La distance d'un point à une droite est atteinte au projeté orthogonal.",
      "On écrit que $\\overrightarrow{MP}\\cdot\\vec{u} = 0$, puis on calcule la norme.",
      "Avec $P(1+t\\,;\\,1-t\\,;\\,t)$, on a $\\overrightarrow{MP}(t-1\\,;\\,1-t\\,;\\,t-2)$ et $\\vec{u}(1\\,;\\,-1\\,;\\,1)$. Alors $\\overrightarrow{MP}\\cdot\\vec{u} = 3t - 4 = 0$, soit $t = \\dfrac{4}{3}$. On obtient $\\overrightarrow{MP}\\left(\\dfrac{1}{3}\\,;\\,-\\dfrac{1}{3}\\,;\\,-\\dfrac{2}{3}\\right)$, de norme $\\sqrt{\\dfrac{6}{9}} = \\dfrac{\\sqrt{6}}{3}$.",
      "La distance vaut $\\dfrac{\\sqrt{6}}{3}$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  /* =========================================================
     PS_ESPACE_ANGLE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_41",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Dans l'espace, on considère $\\vec{u}(1\\,;\\,2\\,;\\,0)$ et $\\vec{v}(2\\,;\\,1\\,;\\,0)$. La valeur de $\\cos\\left(\\vec{u}\\,,\\,\\vec{v}\\right)$ est :",
    format: "qcm",
    choices: ["$\\dfrac{4}{5}$", "$\\dfrac{1}{5}$", "$\\dfrac{3}{5}$", "$\\dfrac{2}{5}$"],
    expected: ["$\\dfrac{4}{5}$"],
    comparator: "mcq_exact",
    hint: "$\\cos\\theta = \\dfrac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}$, et les deux normes valent $\\sqrt{5}$.",
    explanation: exp(
      "$\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$.",
      "On calcule le produit scalaire et les deux normes.",
      "$\\vec{u}\\cdot\\vec{v} = 2 + 2 = 4$, et $\\|\\vec{u}\\| = \\|\\vec{v}\\| = \\sqrt{5}$. Donc $\\cos\\theta = \\dfrac{4}{\\sqrt{5}\\times\\sqrt{5}} = \\dfrac{4}{5}$.",
      "$\\cos\\left(\\vec{u}\\,,\\,\\vec{v}\\right) = \\dfrac{4}{5}$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_42",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Pour deux vecteurs non nuls $\\vec{u}$ et $\\vec{v}$ faisant un angle $\\theta$, on a :",
    format: "qcm",
    choices: [
      "$\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$",
      "$\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\sin\\theta$",
      "$\\vec{u}\\cdot\\vec{v} = \\left(\\|\\vec{u}\\| + \\|\\vec{v}\\|\\right)\\cos\\theta$",
      "$\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|$",
    ],
    expected: ["$\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$"],
    comparator: "mcq_exact",
    hint: "C'est le cosinus qui s'annule quand les vecteurs sont perpendiculaires.",
    explanation: exp(
      "Expression du produit scalaire avec les normes et l'angle.",
      "On vérifie la cohérence dans le cas de l'orthogonalité.",
      "Si $\\theta = \\dfrac{\\pi}{2}$, le produit scalaire doit être nul : seule la formule avec $\\cos\\theta$ le garantit, puisque $\\cos\\dfrac{\\pi}{2} = 0$.",
      "$\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_43",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Soient $\\vec{u}(1\\,;\\,0\\,;\\,0)$ et $\\vec{v}(1\\,;\\,1\\,;\\,0)$. L'angle géométrique entre $\\vec{u}$ et $\\vec{v}$ mesure :",
    format: "qcm",
    choices: [
      "$\\dfrac{\\pi}{4}$",
      "$\\dfrac{\\pi}{3}$",
      "$\\dfrac{\\pi}{2}$",
      "$\\dfrac{\\pi}{6}$",
    ],
    expected: ["$\\dfrac{\\pi}{4}$"],
    comparator: "mcq_exact",
    hint: "Calcule le cosinus : tu devrais reconnaître $\\dfrac{\\sqrt{2}}{2}$.",
    explanation: exp(
      "$\\cos\\theta = \\dfrac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}$.",
      "On calcule le cosinus, puis on identifie l'angle.",
      "$\\vec{u}\\cdot\\vec{v} = 1$, $\\|\\vec{u}\\| = 1$ et $\\|\\vec{v}\\| = \\sqrt{2}$. Donc $\\cos\\theta = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$, ce qui correspond à $\\dfrac{\\pi}{4}$.",
      "L'angle mesure $\\dfrac{\\pi}{4}$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_44",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Si $\\cos\\left(\\vec{u}\\,,\\,\\vec{v}\\right) = 0$ pour deux vecteurs non nuls, alors l'angle géométrique entre eux mesure :",
    format: "qcm",
    choices: [
      "$\\dfrac{\\pi}{2}$",
      "$0$",
      "$\\pi$",
      "$\\dfrac{\\pi}{4}$",
    ],
    expected: ["$\\dfrac{\\pi}{2}$"],
    comparator: "mcq_exact",
    hint: "Sur $[0\\,;\\,\\pi]$, le cosinus ne s'annule qu'une seule fois.",
    explanation: exp(
      "L'angle géométrique entre deux vecteurs appartient à $[0\\,;\\,\\pi]$.",
      "On cherche où le cosinus s'annule sur cet intervalle.",
      "$\\cos\\theta = 0$ avec $\\theta \\in [0\\,;\\,\\pi]$ donne $\\theta = \\dfrac{\\pi}{2}$ : les vecteurs sont orthogonaux.",
      "L'angle mesure $\\dfrac{\\pi}{2}$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  /* =========================================================
     PS_ESPACE_PLAN_NORMAL
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_45",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 3,
    theme: "neutral",
    text: "Une équation cartésienne du plan passant par l'origine et de vecteur normal $\\vec{n}(2\\,;\\,-1\\,;\\,3)$ est :",
    format: "qcm",
    choices: [
      "$2x - y + 3z = 0$",
      "$2x - y + 3z = 1$",
      "$x - y + z = 0$",
      "$2x + y + 3z = 0$",
    ],
    expected: ["$2x - y + 3z = 0$"],
    comparator: "mcq_exact",
    hint: "Passer par l'origine impose que la constante soit nulle.",
    explanation: exp(
      "Le plan de vecteur normal $(a\\,;\\,b\\,;\\,c)$ a une équation $ax + by + cz + d = 0$.",
      "On reporte les coordonnées du vecteur normal, puis le point $O$.",
      "$2x - y + 3z + d = 0$ et $O(0\\,;\\,0\\,;\\,0)$ donnent $d = 0$.",
      "Une équation est $2x - y + 3z = 0$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_46",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $\\mathscr{P}$ le plan d'équation $x + y + z = 0$. Le projeté orthogonal $H$ du point $A(1\\,;\\,2\\,;\\,3)$ sur $\\mathscr{P}$ a pour coordonnées :",
    format: "qcm",
    choices: [
      "$(-1\\,;\\,0\\,;\\,1)$",
      "$(1\\,;\\,0\\,;\\,-1)$",
      "$(0\\,;\\,0\\,;\\,0)$",
      "$(1\\,;\\,2\\,;\\,3)$",
    ],
    expected: ["$(-1\\,;\\,0\\,;\\,1)$"],
    comparator: "mcq_exact",
    hint: "$H = A + t\\,\\vec{n}$ avec $\\vec{n}(1\\,;\\,1\\,;\\,1)$ : trouve $t$ pour que $H$ soit dans le plan.",
    explanation: exp(
      "Le projeté orthogonal s'obtient en se déplaçant depuis $A$ selon la direction normale.",
      "On écrit $H = A + t\\vec{n}$, puis on impose l'équation du plan.",
      "$H(1+t\\,;\\,2+t\\,;\\,3+t)$ appartient à $\\mathscr{P}$ si $(1+t)+(2+t)+(3+t) = 6 + 3t = 0$, soit $t = -2$. Alors $H(-1\\,;\\,0\\,;\\,1)$.",
      "$H(-1\\,;\\,0\\,;\\,1)$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_47",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 5,
    theme: "neutral",
    text: "Soient $A$ et $B$ deux points distincts de l'espace. L'ensemble des points $M$ tels que $\\overrightarrow{MA}\\cdot\\overrightarrow{MB} = 0$ est :",
    format: "qcm",
    choices: [
      "la sphère de diamètre $[AB]$",
      "le plan médiateur de $[AB]$",
      "la droite $(AB)$",
      "l'ensemble vide",
    ],
    expected: ["la sphère de diamètre $[AB]$"],
    comparator: "mcq_exact",
    hint: "Dans le plan, la même condition donne le cercle de diamètre $[AB]$.",
    explanation: exp(
      "$\\overrightarrow{MA}\\cdot\\overrightarrow{MB} = 0$ signifie que l'angle $\\widehat{AMB}$ est droit.",
      "On généralise à l'espace la caractérisation connue dans le plan.",
      "Voir $[AB]$ sous un angle droit caractérise, dans le plan, le cercle de diamètre $[AB]$ ; dans l'espace, en faisant tourner ce cercle autour de $(AB)$, on obtient la sphère de diamètre $[AB]$. Le plan médiateur correspondrait à $MA = MB$.",
      "C'est la sphère de diamètre $[AB]$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  /* =========================================================
     PS_ESPACE_DEFI
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_48",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $d : x = 1 + t\\ ;\\ y = -t\\ ;\\ z = 1 + t$ et $M(2\\,;\\,2\\,;\\,0)$. Le projeté orthogonal $H$ de $M$ sur $d$ a pour coordonnées :",
    format: "qcm",
    choices: [
      "$\\left(\\dfrac{1}{3}\\,;\\,\\dfrac{2}{3}\\,;\\,\\dfrac{1}{3}\\right)$",
      "$\\left(\\dfrac{2}{3}\\,;\\,\\dfrac{1}{3}\\,;\\,\\dfrac{2}{3}\\right)$",
      "$(1\\,;\\,1\\,;\\,1)$",
      "$(0\\,;\\,1\\,;\\,1)$",
    ],
    expected: ["$\\left(\\dfrac{1}{3}\\,;\\,\\dfrac{2}{3}\\,;\\,\\dfrac{1}{3}\\right)$"],
    comparator: "mcq_exact",
    hint: "Écris $\\overrightarrow{MP}\\cdot\\vec{u} = 0$ avec $P(1+t\\,;\\,-t\\,;\\,1+t)$.",
    explanation: exp(
      "Le projeté orthogonal $H$ est le point de la droite tel que $\\overrightarrow{MH}$ soit orthogonal au vecteur directeur.",
      "On paramètre le point courant, on annule le produit scalaire, puis on remplace.",
      "Avec $P(1+t\\,;\\,-t\\,;\\,1+t)$ : $\\overrightarrow{MP}(t-1\\,;\\,-t-2\\,;\\,t+1)$ et $\\vec{u}(1\\,;\\,-1\\,;\\,1)$. Alors $\\overrightarrow{MP}\\cdot\\vec{u} = (t-1) + (t+2) + (t+1) = 3t + 2 = 0$, soit $t = -\\dfrac{2}{3}$, d'où $H\\left(\\dfrac{1}{3}\\,;\\,\\dfrac{2}{3}\\,;\\,\\dfrac{1}{3}\\right)$.",
      "$H\\left(\\dfrac{1}{3}\\,;\\,\\dfrac{2}{3}\\,;\\,\\dfrac{1}{3}\\right)$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_geo_concours_49",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soient $A(5\\,;\\,5\\,;\\,-1)$, $B(7\\,;\\,3\\,;\\,-9)$ et $C(3\\,;\\,1\\,;\\,-5)$. Le triangle $ABC$ est :",
    format: "qcm",
    choices: [
      "rectangle et isocèle",
      "rectangle mais non isocèle",
      "isocèle mais non rectangle",
      "équilatéral",
    ],
    expected: ["rectangle et isocèle"],
    comparator: "mcq_exact",
    hint: "Calcule $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$, puis leur produit scalaire et leurs normes.",
    explanation: exp(
      "On teste l'orthogonalité par le produit scalaire et l'isocélie par les normes.",
      "On calcule les deux vecteurs issus de $A$.",
      "$\\overrightarrow{AB}(2\\,;\\,-2\\,;\\,-8)$ et $\\overrightarrow{AC}(-2\\,;\\,-4\\,;\\,-4)$. Produit scalaire : $-4 + 8 + 32 = 36$... ce n'est pas nul en $A$. On teste alors en $C$ : $\\overrightarrow{CA}(2\\,;\\,4\\,;\\,4)$ et $\\overrightarrow{CB}(4\\,;\\,2\\,;\\,-4)$, de produit scalaire $8 + 8 - 16 = 0$ : l'angle droit est en $C$. Et $CA = \\sqrt{4+16+16} = 6 = CB = \\sqrt{16+4+16}$.",
      "Le triangle est rectangle et isocèle en $C$."
    ),
    tags: ["terminale-spe", "produit-scalaire", "concours-avenir", "qcm"],
  },
];
