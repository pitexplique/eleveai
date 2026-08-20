// ─── Fiche de cours : le calcul littéral (5e) ──────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/calcul-litteral.bank.ts (notionId litteral_calcul).
// Notion symbolique (peu de canvas du coach) : on MONTRE quand même l'anatomie
// d'une expression et le regroupement des termes semblables par de petits SVG.
//
// Micro-compétences couvertes :
// - litteral_expression_comprendre → définition + figure (anatomie de 3x + 2), propriété, exemple 1
// - litteral_traduire              → exemple 2 (« le double de x augmenté de 5 »), usages, entraînement 1
// - litteral_substituer            → exemple 3 (3x − 2 pour x = 6), méthode, entraînement 2
// - litteral_reduire               → figure « termes semblables », exemple 4 (3x + 2x = 5x), entraînement 3
// - litteral_defi                  → pièges (3x + 2 ≠ 5x) + défi (périmètre / âge de Léa)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// ⭐ LE CANVAS `algebre` DU COACH, enfin utilisé ici. Il montre des groupes
// CACHÉS (l'inconnue, dont on ne voit pas le contenu) à côté d'objets VISIBLES
// (les nombres qu'on connaît), puis l'écriture algébrique qui en sort. C'est
// exactement le geste du calcul littéral, et le thème « jeu vidéo » parle à un
// élève de 5e — le calibrage du 19/08 le dit : score, vies, manches, avant les
// euros.
const modelise = (
  titre: string,
  groupesCaches: number,
  objetsVisibles: number,
  expression: string,
  phrase: string
) => (
  <CanvasRenderer
    figure={{
      kind: "algebre",
      theme: "jeu_video",
      titre,
      groupesCaches,
      objetsVisibles,
      symbole: "x",
      expression,
      phrase,
      display: { showConcret: true, showExpression: true, showPhrase: true, showLabels: true },
    }}
  />
);

// L'anatomie d'une expression : coefficient, partie littérale, terme constant.
//
// ⛔ « COEFFICIENT » ET « LETTRE » SE CHEVAUCHAIENT (Frédéric, 20/08, capture à
// l'appui : on lisait « coefficielettrent »). Les deux légendes partaient sous
// l'expression, à 26 px l'une de l'autre, pour des mots de 75 et 40 px. Sa
// consigne, appliquée : les deux légendes du BAS restent en bas — coefficient
// et terme constant, qui ont la place — et la LETTRE passe au-dessus, avec une
// flèche qui descend sur elle.
const anatomie = (
  <svg viewBox="0 0 320 180" className="h-auto w-full" role="img" aria-label="Anatomie de l'expression 3x + 2">
    {/* La lettre, annoncée par le haut */}
    <text x="100" y="30" fill="#0f172a" fontSize="15" fontWeight="700" textAnchor="middle">lettre</text>
    <line x1="100" y1="38" x2="100" y2="68" stroke="#0f172a" strokeWidth="2" />
    <polyline points="94,60 100,70 106,60" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

    {/* L'expression */}
    <text x="60" y="118" fill="#2563eb" fontSize="46" fontWeight="800">3</text>
    <text x="92" y="118" fill="#0f172a" fontSize="46" fontWeight="800">x</text>
    <text x="132" y="118" fill="#0f172a" fontSize="46" fontWeight="800">+</text>
    <text x="176" y="118" fill="#16a34a" fontSize="46" fontWeight="800">2</text>

    {/* Les deux légendes du bas, chacune sous SON terme */}
    <line x1="70" y1="128" x2="70" y2="146" stroke="#2563eb" strokeWidth="2" />
    <text x="70" y="164" fill="#2563eb" fontSize="15" fontWeight="700" textAnchor="middle">coefficient</text>
    <line x1="186" y1="128" x2="186" y2="146" stroke="#16a34a" strokeWidth="2" />
    <text x="216" y="164" fill="#16a34a" fontSize="15" fontWeight="700" textAnchor="middle">terme constant</text>
  </svg>
);
// Termes semblables : 3 boîtes « x » + 2 boîtes « x » se regroupent en 5 « x ».
const Boite = ({ x, color }: { x: number; color: string }) => (
  <g>
    <rect x={x} y={20} width={28} height={28} rx={4} fill={color} opacity={0.85} stroke="#0f172a" strokeWidth={1.5} />
    <text x={x + 14} y={40} fill="#ffffff" fontSize="16" fontWeight="800" textAnchor="middle">x</text>
  </g>
);
const reduction = (
  <svg viewBox="0 0 320 90" className="h-auto w-full" role="img" aria-label="3x plus 2x égale 5x">
    {[8, 40, 72].map((x) => <Boite key={x} x={x} color="#2563eb" />)}
    {[112, 144].map((x) => <Boite key={x} x={x} color="#16a34a" />)}
    <text x="188" y="42" fill="#0f172a" fontSize="24" fontWeight="800">=</text>
    <text x="214" y="44" fill="#16a34a" fontSize="26" fontWeight="800">5x</text>
  </svg>
);

const pieges = [
  "Réduire 3x + 2 en 5x : impossible ! 3x a une lettre, 2 n'en a pas (pas des termes semblables).",
  "Écrire 2x + 3x = 5x² : on additionne les coefficients (2 + 3 = 5), on ne touche pas à la lettre → 5x.",
  "Oublier les parenthèses avec un négatif : pour x = −3, 2x = 2 × (−3) = −6.",
];

const aRetenir = [
  "Une lettre représente un nombre ; 3x veut dire 3 × x (le signe × disparaît).",
  "Substituer = remplacer la lettre par sa valeur, puis calculer.",
  "On ne réduit que les termes semblables (même lettre) : 3x + 2x = 5x.",
];

export const ficheCalculLitteral5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "litteral-calcul",
  titre: "Le calcul littéral",
  accroche:
    "Une lettre pour un nombre qu'on ne connaît pas encore : le calcul littéral, c'est écrire une règle qui marche pour tous les nombres.",
  identite: [
    { label: "Mots clés", valeur: "Lettre, coefficient, terme, réduire, substituer" },
    { label: "Le secret", valeur: "3x veut dire 3 × x" },
    { label: "Outil", valeur: "Les termes semblables (même lettre)" },
  ],
  definition: {
    texte:
      "Une expression littérale contient des nombres, des lettres et des opérations. La lettre (x, a, n...) représente un nombre. Le nombre collé à la lettre est le coefficient (3x = 3 × x) ; un nombre seul est un terme constant. On peut la calculer en remplaçant la lettre par une valeur.",
  },
  figure: {
    schema: anatomie,
    legende: "Dans 3x + 2 : 3 est le coefficient, x la lettre, 2 le terme constant.",
  },
  // Un dessin sous chaque propriété (REGLES.md § 2 bis). Trois d'entre elles se
  // MODÉLISENT — des coffres dont on ignore le contenu, des pièces qu'on
  // compte : le canvas `algebre` montre le passage du concret à l'écriture. La
  // troisième, « Réduire », est un regroupement d'objets identiques : elle garde
  // son dessin de boîtes, où l'on voit 3 x et 2 x devenir 5 x.
  proprietes: [
    {
      titre: "Le signe × disparaît",
      texte: "3 × x s'écrit 3x, et a × b s'écrit ab.",
      schema: modelise(
        "3 coffres identiques",
        3,
        0,
        "3x",
        "Trois coffres au même contenu : on écrit 3x, pas 3 × x."
      ),
    },
    {
      titre: "Substituer",
      texte: "Remplacer la lettre par un nombre, puis calculer : pour x = 5, x + 3 = 8.",
      schema: modelise(
        "1 coffre ouvert : x = 5",
        1,
        3,
        "x + 3 = 8",
        "Le coffre contenait 5 : 5 + 3 = 8."
      ),
    },
    {
      titre: "Réduire",
      texte: "Regrouper les termes semblables (même lettre) : 3x + 2x = 5x.",
      schema: reduction,
    },
    {
      titre: "Termes non semblables",
      texte: "3x et 2 ne se regroupent pas : 3x + 2 reste 3x + 2.",
      schema: modelise(
        "3 coffres et 2 pièces",
        3,
        2,
        "3x + 2",
        "Les coffres sont inconnus, les pièces sont connues : on ne peut pas les mélanger."
      ),
    },
  ],
  reel: {
    texte:
      "Le calcul littéral sert à écrire des formules : le périmètre d'un carré (P = 4 × c), le prix de n places de cinéma (7n), la conversion d'heures en minutes (60h). Une seule écriture pour toutes les valeurs.",
  },
  historique: {
    texte:
      "Utiliser des lettres pour les nombres est une idée du mathématicien français François Viète, à la fin du XVIᵉ siècle. Avant lui, tout s'écrivait en toutes lettres, ce qui rendait les calculs très longs.",
  },
  methode: [
    {
      titre: "Je lis l'expression",
      texte: "Coefficient, lettre, terme constant : je repère chaque partie.",
      schema: anatomie,
    },
    {
      titre: "Je réduis",
      texte: "Je regroupe les termes semblables (même lettre) en additionnant les coefficients.",
      schema: reduction,
    },
    {
      titre: "Je substitue",
      texte: "Pour une valeur donnée, je remplace la lettre puis je calcule.",
      schema: modelise(
        "2 coffres ouverts : x = 4",
        2,
        1,
        "2x + 1 = 9",
        "Chaque coffre contenait 4 : 4 + 4 + 1 = 9."
      ),
    },
  ],
  usages: [
    {
      titre: "Augmenter / diminuer",
      detail: "« augmenté de 3 » → + 3 ; « diminué de 4 » → − 4.",
      schema: modelise(
        "1 coffre et 3 pièces",
        1,
        3,
        "x + 3",
        "Un score inconnu, augmenté de 3 points."
      ),
    },
    {
      titre: "Multiplier",
      detail: "« le double de x » → 2x ; « le triple de n » → 3n.",
      schema: modelise("2 coffres identiques", 2, 0, "2x", "Le double d'un score inconnu."),
    },
    {
      titre: "Partager",
      detail: "« le quart de x » → x/4.",
      schema: modelise(
        "1 coffre partagé en 4",
        1,
        0,
        "x/4",
        "Le score inconnu, partagé en 4 parts égales."
      ),
    },
  ],
  exemples: [
    {
      titre: "Comprendre une expression",
      donnees: "L'expression 3x + 2.",
      question: "Quel est le coefficient de x ? Et le terme constant ?",
      schema: anatomie,
      solution:
        "Le nombre collé à x est 3 : c'est le coefficient. Le nombre seul est 2 : c'est le terme constant.",
    },
    {
      titre: "Traduire une phrase",
      donnees: "« Le double de x augmenté de 5 ».",
      question: "Écris l'expression littérale.",
      schema: modelise(
        "2 coffres et 5 pièces",
        2,
        5,
        "2x + 5",
        "Le double du score inconnu, puis 5 points de plus.",
      ),
      solution:
        "Le double de x, c'est 2x. Augmenté de 5, on ajoute 5 : l'expression est 2x + 5 (et non 2(x + 5)).",
    },
    {
      titre: "Substituer une valeur",
      donnees: "L'expression 3x − 2, pour x = 6.",
      question: "Quelle est sa valeur ?",
      schema: modelise(
        "3 coffres ouverts : x = 6",
        3,
        0,
        "3x − 2 = 16",
        "Chaque coffre valait 6 : 18, moins 2, il reste 16.",
      ),
      solution:
        "On remplace x par 6 : 3x − 2 = 3 × 6 − 2 = 18 − 2 = 16.",
    },
    {
      titre: "Réduire",
      donnees: "L'expression 3x + 2x.",
      question: "Réduis-la.",
      schema: reduction,
      solution:
        "3x et 2x sont des termes semblables (même lettre x). On additionne les coefficients : 3 + 2 = 5, donc 3x + 2x = 5x.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Traduis : « le triple d'un nombre n diminué de 4 ».",
      correction: "Le triple de n, c'est 3n. Diminué de 4 : 3n − 4.",
    },
    {
      question: "Calcule 2x + 5 pour x = −3.",
      correction: "2x + 5 = 2 × (−3) + 5 = −6 + 5 = −1.",
    },
    {
      question: "Réduis : x + x + 3.",
      correction: "x + x = 2x, donc x + x + 3 = 2x + 3 (on ne peut pas aller plus loin).",
    },
    {
      question: "Léa a x ans. Écris son âge dans 5 ans, puis calcule-le si x = 12.",
      correction: "Son âge dans 5 ans est x + 5. Pour x = 12 : 12 + 5 = 17 ans.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesCalculLitteral5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calcul littéral - 5e",
    section: {
      type: "objectif",
      phrase: "Écrire, réduire et calculer avec des lettres",
      sousPhrase:
        "Une lettre représente un nombre. 3x veut dire 3 × x. Une seule écriture pour tous les nombres.",
      encadre: {
        titre: "L'idée",
        texte: "On ne regroupe que les termes semblables (même lettre).",
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
          "Écrire des formules : périmètre d'un carré (4c), prix de n places (7n), conversions. Une écriture pour toutes les valeurs.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Utiliser des lettres pour les nombres vient de François Viète, à la fin du XVIᵉ siècle. Avant, tout s'écrivait en toutes lettres.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheCalculLitteral5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Traduire une phrase",
    badge: "3 mots-clés",
    section: {
      type: "cartes",
      cartes: ficheCalculLitteral5e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Substituer",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "On calcule 3x − 2 pour x = 6.",
      question: "Quelle est la valeur ?",
      correction: "On remplace x par 6 : 3 × 6 − 2 = 18 − 2 = 16.",
    },
  },
  {
    titre: "Réduire",
    badge: "Termes semblables",
    section: {
      type: "exemple",
      enonce: "On réduit 3x + 2x.",
      question: "Quel est le résultat ?",
      correction: "Même lettre : on additionne les coefficients. 3 + 2 = 5, donc 3x + 2x = 5x.",
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
      enonce: "Léa a x ans.",
      question: "Écris son âge dans 5 ans, puis calcule-le si x = 12.",
      indice: "« dans 5 ans » signifie qu'on ajoute 5.",
      correction: "Son âge est x + 5. Pour x = 12 : 12 + 5 = 17 ans.",
    },
  },
];
