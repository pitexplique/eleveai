// ─── Fiche de cours : la dérivation (Première spé) ─────────────────────────────
// PILOTE lycée. Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/premiere-spe/maths/derivation.bank.ts (notionId "derivation").
//
// ⚠️ Le renderer de fiche (FicheCoursClient) affiche le TEXTE BRUT (pas de KaTeX) :
// on écrit donc une notation LISIBLE en Unicode (f'(x) = 2x, x², √x, (xⁿ)' = n·xⁿ⁻¹),
// PAS le LaTeX de la banque ($\dfrac{...}$). Le LaTeX reste réservé à la banque
// (rendue par le coach) et à la vidéo Manim (MathTex).
//
// Micro-compétences de la banque couvertes (mapping micro → bloc) :
// - der_taux       → définition + figure (tangente), propriété « Le nombre dérivé »,
//                    usage « vitesse instantanée », exemple 1 (taux x² entre 1 et 3 = 4),
//                    entraînement 1
// - der_usuelles   → bloc formule (règle de la puissance + tableau des usuelles),
//                    exemple 2, entraînement 2, à retenir
// - der_operations → propriétés « Dériver une somme » et « produit / quotient »,
//                    méthode (dériver terme à terme), exemple 2 & 3, entraînement 2 & 3
// - der_tangente   → méthode « écrire une tangente », usage « tangente »,
//                    exemple 4 DESSINÉ (canvas courbe + tangente), entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const VERT = "#16a34a";

// La parabole y = x² et sa tangente au point A d'abscisse a — le MÊME dessin
// que dans les exercices du coach (canvas fonctionGraphique). f(a) = a²,
// pente = 2a, ordonnée à l'origine = a² − 2a·a = −a² → tangente y = 2a·x − a².
// ⛔⛔ LES GRADUATIONS ÉTAIENT RENDUES À 8 px — corrigé le 01/09/2026.
// Le `viewBox` de ce canvas vaut son champ `size` : demander 300 px de large
// dans une carte qui n'en fait que 222 ne rétrécit pas la carte, il RÉDUIT
// TOUT LE DESSIN de 26 %, police comprise. Mesuré à 375 px : 9,0 px dans le
// bloc « définition », 8,7 dans « formule », 8,0 dans « exemple » — sous le
// plancher de lisibilité de 11 px, sur une fiche de PREMIÈRE.
// 👉 La largeur est donc celle DU BLOC, mesurée, et non un chiffre rond : le
// canvas rend alors ses chiffres à leur taille réelle, 12 px.
const LARGEUR_BLOC = { carte: 222, formule: 216, exemple: 200 } as const;

function courbeTangente(a: number, bloc: keyof typeof LARGEUR_BLOC = "carte") {
  const fa = a * a;
  const pente = 2 * a;
  const ord = fa - pente * a; // = −a²
  const cote = LARGEUR_BLOC[bloc];
  return (
    <CanvasRenderer
      figure={{
        kind: "fonctionGraphique",
        size: { width: cote, height: cote },
        xmin: -1,
        xmax: 4,
        ymin: -2,
        ymax: 9,
        grille: true,
        courbes: [
          { id: "f", type: "quadratique", a: 1, b: 0, c: 0, couleur: BLEU },
          { id: "t", type: "affine", a: pente, b: ord, couleur: ROUGE },
        ],
        misesEnEvidence: [{ point: { x: a, y: fa, label: "A", couleur: VERT } }],
      }}
    />
  );
}

const pieges = [
  "Confondre f(a) et f'(a) : f(a) est l'ordonnée du point (la hauteur), f'(a) est la pente de la tangente en ce point.",
  "Croire que (u × v)' = u' × v' : FAUX. La dérivée d'un produit est (uv)' = u'v + uv', pas le produit des dérivées.",
  "Oublier de remplacer x par a APRÈS avoir dérivé : on calcule d'abord f'(x), puis f'(a).",
];

const aRetenir = [
  "f'(a) = la pente de la tangente en a = la limite du taux de variation quand h → 0.",
  "(xⁿ)' = n·xⁿ⁻¹ ; les dérivées usuelles se connaissent par cœur.",
  "Tangente au point d'abscisse a : y = f'(a)(x − a) + f(a).",
];

export const ficheDerivationPremiere: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  // Le slug de route (= la valeur en base notion_ressources), comme "cm2"/"3e" :
  // sert au fil d'Ariane ET à la requête vidéo (VideoNotion → classe='premiere-spe').
  classe: "premiere-spe",
  notion: "derivation",
  titre: "La dérivation",
  accroche:
    "Dériver, c'est mesurer la vitesse à laquelle une fonction varie à un instant précis. Le nombre dérivé f'(a) est la pente de la tangente à la courbe : il annonce si la fonction monte, descend, et à quel point.",
  identite: [
    { label: "Prérequis", valeur: "Fonctions, équation d'une droite (y = mx + p)" },
    { label: "L'idée clé", valeur: "f'(a) = pente de la tangente en a" },
    { label: "Outil", valeur: "Tableau des dérivées, calculatrice" },
  ],
  definition: {
    texte:
      "Le nombre dérivé de f en a, noté f'(a), est la pente de la tangente à la courbe de f au point d'abscisse a. C'est la limite du taux de variation (f(a + h) − f(a)) / h quand h devient très petit (h → 0). La fonction dérivée f' associe à chaque x ce nombre dérivé f'(x).",
  },
  figure: {
    schema: courbeTangente(1),
    legende: "La tangente (rouge) à la courbe y = x² au point A(1 ; 1) : sa pente est f'(1) = 2.",
  },
  proprietes: [
    {
      titre: "Le nombre dérivé",
      texte:
        "f'(a) est la limite du taux de variation (f(a + h) − f(a)) / h quand h → 0 : c'est la pente de la tangente au point d'abscisse a.",
    },
    {
      titre: "Dériver une somme",
      texte:
        "(u + v)' = u' + v' : on dérive terme à terme. Un facteur constant se garde : (k·u)' = k·u', et une constante seule donne 0.",
    },
    {
      titre: "Produit et quotient",
      texte:
        "(u × v)' = u'v + uv' ; (u / v)' = (u'v − uv') / v². Attention : ce n'est jamais le produit ni le quotient des dérivées.",
    },
  ],
  reel: {
    texte:
      "Le nombre dérivé, c'est la « vitesse à l'instant précis » et non la moyenne : la vitesse lue au compteur en montant la Route du Littoral, le débit de la Rivière des Galets qui grimpe pendant un cyclone, ou le coût marginal d'une production (ce que coûte le tout dernier objet fabriqué). Partout où une grandeur varie, sa dérivée dit à quelle vitesse.",
  },
  historique: {
    texte:
      "Le calcul différentiel naît à la fin du XVIIe siècle. Isaac Newton (en Angleterre) et Gottfried Leibniz (en Allemagne) l'inventent chacun de leur côté — d'où une célèbre querelle sur la paternité. Pierre de Fermat avait déjà cherché les tangentes un peu avant. La notation f' arrive plus tard, avec Lagrange.",
  },
  formule: {
    contexte: "Les dérivées usuelles (à connaître par cœur)",
    expression: "(xⁿ)' = n·xⁿ⁻¹",
    legende:
      "k' = 0  ·  (ax + b)' = a  ·  (x²)' = 2x  ·  (x³)' = 3x²  ·  (1/x)' = −1/x²  ·  (√x)' = 1/(2√x)",
    schema: courbeTangente(2, "formule"),
  },
  methode: [
    {
      titre: "Dériver terme à terme",
      texte:
        "On dérive chaque terme avec les formules usuelles. Les constantes disparaissent (leur dérivée est 0).",
    },
    {
      titre: "Calculer un nombre dérivé",
      texte:
        "On dérive d'abord f pour obtenir f'(x), PUIS on remplace x par a pour calculer f'(a).",
    },
    {
      titre: "Écrire une tangente",
      texte:
        "Tangente au point d'abscisse a : y = f'(a)(x − a) + f(a). La pente est f'(a) ; elle passe par (a ; f(a)).",
    },
  ],
  usages: [
    {
      titre: "Une vitesse, un débit instantané",
      detail:
        "Le nombre dérivé d'une grandeur en fonction du temps donne sa vitesse (ou son débit) à un instant précis.",
    },
    {
      titre: "La tangente à une courbe",
      detail:
        "La pente de la tangente en a est f'(a), et son équation est y = f'(a)(x − a) + f(a).",
    },
    {
      titre: "Un maximum ou un minimum",
      detail:
        "Un extremum se trouve là où f'(x) s'annule en changeant de signe : la tangente y est horizontale (pente 0).",
    },
  ],
  exemples: [
    {
      titre: "Le taux de variation",
      donnees: "f(x) = x², entre a = 1 et b = 3.",
      question: "Calculer le taux de variation.",
      solution:
        "Taux = (f(3) − f(1)) / (3 − 1) = (9 − 1) / 2 = 8 / 2 = 4. C'est la pente de la corde entre les deux points.",
    },
    {
      titre: "Dériver un polynôme",
      donnees: "f(x) = 3x² − 5x + 2.",
      question: "Calculer f'(x).",
      solution:
        "On dérive terme à terme : (3x²)' = 6x, (−5x)' = −5, (2)' = 0. Donc f'(x) = 6x − 5.",
    },
    {
      titre: "Un nombre dérivé",
      donnees: "f(x) = x² − 4x + 1.",
      question: "Calculer f'(3).",
      solution:
        "D'abord f'(x) = 2x − 4. Puis on remplace x par 3 : f'(3) = 2 × 3 − 4 = 2.",
    },
    {
      titre: "L'équation de la tangente",
      donnees: "f(x) = x², au point d'abscisse a = 1.",
      question: "Donner l'équation de la tangente.",
      schema: courbeTangente(1, "exemple"),
      solution:
        "f(1) = 1 et f'(1) = 2. Tangente : y = f'(1)(x − 1) + f(1) = 2(x − 1) + 1 = 2x − 1.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Pour f(x) = x², calcule le taux de variation entre 1 et 3.",
      correction: "Taux = (f(3) − f(1)) / (3 − 1) = (9 − 1) / 2 = 4.",
    },
    {
      question: "Dérive f(x) = 3x² − 5x + 2.",
      correction: "On dérive terme à terme : f'(x) = 6x − 5 (la constante 2 disparaît).",
    },
    {
      question: "Pour f(x) = x² − 4x + 1, calcule f'(3).",
      correction: "f'(x) = 2x − 4, donc f'(3) = 2 × 3 − 4 = 2.",
    },
    {
      question: "Donne l'équation de la tangente à f(x) = x² au point d'abscisse a = 1.",
      correction:
        "f(1) = 1, f'(1) = 2. Tangente : y = 2(x − 1) + 1 = 2x − 1.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=premiere-spe",
};

export const slidesDerivationPremiere: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Dérivation - 1re spé",
    section: {
      type: "objectif",
      phrase: "Mesurer la vitesse de variation d'une fonction",
      sousPhrase:
        "Le nombre dérivé f'(a) est la pente de la tangente à la courbe au point d'abscisse a.",
      encadre: {
        titre: "L'idée",
        texte: "La tangente, c'est la « limite des cordes » : la pente à un instant précis.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "La vitesse lue au compteur (et non la moyenne), le débit d'une rivière en crue pendant un cyclone, le coût marginal d'une production.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Newton et Leibniz ont inventé le calcul différentiel chacun de leur côté à la fin du XVIIe siècle — d'où une célèbre querelle sur la paternité.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheDerivationPremiere.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Les dérivées usuelles",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "(xⁿ)' = n·xⁿ⁻¹",
      sousPhrase:
        "k' = 0  ·  (ax + b)' = a  ·  (x²)' = 2x  ·  (x³)' = 3x²  ·  (1/x)' = −1/x²  ·  (√x)' = 1/(2√x)",
      encadre: {
        titre: "Somme",
        texte: "(u + v)' = u' + v' : on dérive terme à terme.",
      },
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheDerivationPremiere.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Un nombre dérivé",
    section: {
      type: "exemple",
      enonce: "f(x) = x² − 4x + 1.",
      question: "Calculer f'(3).",
      correction: "f'(x) = 2x − 4, donc f'(3) = 2 x 3 − 4 = 2.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "L'équation de la tangente",
    section: {
      type: "exemple",
      enonce: "f(x) = x², au point d'abscisse a = 1.",
      question: "Donner l'équation de la tangente.",
      correction: "f(1) = 1, f'(1) = 2 : y = 2(x − 1) + 1 = 2x − 1.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "f(x) = 3x² − 5x + 2.",
      question: "Dérive f, puis calcule f'(1).",
      indice: "Dérive terme à terme, puis remplace x par 1.",
      correction: "f'(x) = 6x − 5, donc f'(1) = 6 − 5 = 1.",
    },
  },
];
