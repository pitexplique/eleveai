// ─── Fiche de cours : les débuts de l'algèbre (CM2) ─────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/algebre.bank.ts (notionId algebre).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec le canvas
// algebre du coach (groupes cachés = x + objets visibles → expression) — comme
// dans les exercices : 3 feuilles cachent x margouillats + 2 visibles → 3x + 2.
//
// Micro-compétences couvertes (les 7 de la banque) :
// - algebre_egalite            → definition, exemple « 8 + 4 = 6 + 6 vrai ? »
// - algebre_completer_egalite  → propriété « le signe = », exemple « 7 + ? = 12 »
// - algebre_nombre_inconnu     → figure + exemple (x + 9 = 20, opération inverse)
// - algebre_schema_barre       → propriété « modéliser » (relié à [[maths-cm2-probleme]])
// - algebre_motif              → propriété « un motif se prolonge » (relié aux suites)
// - algebre_relation           → propriété « la machine » (entrée → règle → sortie)
// - algebre_defi               → défi dessiné 974 (4x = 36, retrouver x)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type AlgebreTheme = "margouillat" | "pomme" | "eau" | "dechet" | "pieces" | "tresor" | "pi";

function algebre(opts: {
  theme?: AlgebreTheme;
  titre?: string;
  groupesCaches?: number;
  objetsVisibles?: number;
  symbole?: string;
  expression?: string;
  phrase?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "algebre",
        theme: opts.theme ?? "margouillat",
        titre: opts.titre,
        groupesCaches: opts.groupesCaches ?? 0,
        objetsVisibles: opts.objetsVisibles ?? 0,
        symbole: opts.symbole ?? "x",
        expression: opts.expression,
        phrase: opts.phrase,
        display: { showConcret: true, showExpression: true, showPhrase: true, showLabels: true },
      }}
    />
  );
}

const pieges = [
  "Croire que le signe = veut dire « le résultat arrive » : il veut dire « la même valeur des deux côtés », comme une balance en équilibre.",
  "Dans « ? − 5 = 12 », répondre 7 : le nombre cherché est plus grand que 12 ! On fait l'inverse : 12 + 5 = 17.",
  "Confondre 2x (deux fois x) et x + 2 (x augmenté de 2) : ce n'est pas la même chose.",
];

const aRetenir = [
  "Un nombre qu'on ne connaît pas encore peut recevoir un nom : une lettre, souvent x.",
  "Le signe = signifie « la même valeur des deux côtés » (comme une balance).",
  "Pour retrouver x, on fait l'opération inverse (+ ↔ −, × ↔ ÷).",
];

export const ficheAlgebreCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "algebre",
  titre: "Les débuts de l'algèbre",
  accroche:
    "L'algèbre, c'est donner un nom à un nombre qu'on ne connaît pas encore. On l'appelle souvent x. On raconte alors la situation avec une écriture mathématique : par exemple 3 feuilles qui cachent chacune x margouillats, plus 2 visibles, c'est 3x + 2.",
  identite: [
    { label: "Mots clés", valeur: "Égalité, signe =, nombre inconnu, x, expression, opération inverse" },
    { label: "Le secret", valeur: "Le signe = veut dire « même valeur des deux côtés »" },
    { label: "Outil", valeur: "La lettre x et l'opération inverse" },
  ],
  definition: {
    texte:
      "Une égalité est vraie quand les deux côtés du signe = ont la même valeur. Quand un nombre est inconnu, on peut lui donner un nom : une lettre, souvent x. Une expression comme 3x + 2 décrit une situation avant même de connaître x. Pour retrouver x, on fait l'opération inverse.",
  },
  figure: {
    schema: algebre({
      theme: "margouillat",
      titre: "Du concret vers l'algèbre",
      groupesCaches: 3,
      objetsVisibles: 2,
      symbole: "x",
      expression: "3x + 2",
      phrase: "Chaque feuille cache le même nombre x de margouillats. Deux margouillats sont visibles.",
    }),
    legende: "3 feuilles (chacune x margouillats) et 2 margouillats visibles : la situation s'écrit 3x + 2.",
  },
  proprietes: [
    {
      titre: "Le signe = est une balance",
      texte: "8 + 4 = 6 + 6 est vrai car les deux côtés valent 12. Le signe = veut dire « même valeur ».",
    },
    {
      titre: "Compléter une égalité",
      texte: "Pour 7 + ? = 12, on cherche ce qui manque : 12 − 7 = 5. Le nombre manquant est 5.",
    },
    {
      titre: "Le nombre inconnu x",
      texte: "Si x + 9 = 20, on fait l'inverse de + 9 : 20 − 9 = 11. Donc x = 11.",
    },
    {
      titre: "Modéliser une situation",
      texte: "2 réservoirs qui contiennent chacun x litres, c'est x + x = 2x.",
    },
  ],
  reel: {
    texte:
      "À La Réunion, on modélise plein de situations : des feuilles qui cachent des margouillats, des réservoirs d'eau qui contiennent chacun la même quantité, un ramassage de déchets sur la plage (x déjà ramassés + 15 de plus), ou le prix au marché quand on ne sait pas encore combien de jus on achètera.",
  },
  historique: {
    texte:
      "Le mot « algèbre » vient d'un livre écrit il y a plus de 1000 ans par un savant de Bagdad, Al-Khwarizmi. Son titre contenait le mot « al-jabr ». C'est lui qui a eu l'idée géniale de remplacer un nombre inconnu par un symbole pour résoudre des problèmes.",
  },
  methode: [
    { titre: "Je repère l'inconnu", texte: "Le nombre que je cherche, je l'appelle x." },
    { titre: "J'écris l'égalité", texte: "Je traduis l'histoire en une écriture avec x (ex. x + 9 = 20)." },
    { titre: "Je fais l'inverse", texte: "Je remonte les opérations à l'envers pour trouver x." },
  ],
  usages: [
    { titre: "Vérifier", detail: "Dire si une égalité est vraie (les deux côtés sont-ils égaux ?)." },
    { titre: "Compléter", detail: "Trouver le nombre manquant qui rend l'égalité vraie." },
    { titre: "Modéliser", detail: "Écrire une situation avec x (2 réservoirs = 2x)." },
  ],
  exemples: [
    {
      titre: "L'égalité est-elle vraie ?",
      donnees: "On regarde l'égalité 8 + 4 = 6 + 6.",
      question: "Est-elle vraie ?",
      solution: "On calcule les deux côtés : 8 + 4 = 12 et 6 + 6 = 12. Les deux valent 12 : oui, elle est vraie.",
    },
    {
      titre: "Trouver le nombre inconnu",
      donnees: "Je pense à un nombre. Je lui ajoute 9 et j'obtiens 20.",
      question: "Quel est ce nombre ?",
      schema: algebre({
        theme: "pi",
        titre: "Nommer ce qu'on ne connaît pas",
        groupesCaches: 1,
        objetsVisibles: 9,
        symbole: "x",
        expression: "x + 9 = 20",
        phrase: "On appelle le nombre inconnu x. Pour le trouver, on fait l'inverse de + 9.",
      }),
      solution: "L'inverse de « + 9 », c'est « − 9 » : 20 − 9 = 11. Le nombre est 11.",
    },
    {
      titre: "Modéliser avec x",
      donnees: "3 feuilles cachent chacune x margouillats. Il y a aussi 2 margouillats visibles.",
      question: "Quelle expression décrit la situation ?",
      schema: algebre({
        theme: "margouillat",
        titre: "Modéliser une situation",
        groupesCaches: 3,
        objetsVisibles: 2,
        symbole: "x",
        expression: "3x + 2",
        phrase: "3 feuilles = 3x, plus 2 margouillats visibles.",
      }),
      solution: "3 feuilles → 3x. On ajoute les 2 visibles → 3x + 2.",
    },
    {
      titre: "Le défi 974",
      donnees: "Un nombre multiplié par 4 donne 36.",
      question: "Quel est ce nombre ?",
      schema: algebre({
        theme: "pi",
        titre: "Défi : retrouver x",
        groupesCaches: 4,
        objetsVisibles: 0,
        symbole: "x",
        expression: "4x = 36",
        phrase: "Il y a 4 fois la même quantité inconnue. Pour retrouver x, on divise par 4.",
      }),
      solution: "L'inverse de « × 4 », c'est « ÷ 4 » : 36 ÷ 4 = 9. Le nombre est 9.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "L'égalité 9 + 5 = 7 + 6 est-elle vraie ?",
      correction: "9 + 5 = 14 mais 7 + 6 = 13. Les deux côtés sont différents : non, elle est fausse.",
    },
    {
      question: "Complète : 8 + ? = 15",
      correction: "On cherche ce qui manque : 15 − 8 = 7. Le nombre manquant est 7.",
    },
    {
      question: "Je pense à un nombre, je le multiplie par 3 et j'obtiens 21. Quel est ce nombre ?",
      correction: "L'inverse de « × 3 » est « ÷ 3 » : 21 ÷ 3 = 7. Le nombre est 7.",
    },
    {
      question: "4 réservoirs contiennent chacun x litres. Quelle expression donne le total ?",
      correction: "x + x + x + x = 4x. Le total est 4x litres.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesAlgebreCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Algèbre - CM2",
    section: {
      type: "objectif",
      phrase: "Donner un nom (x) à un nombre inconnu et le retrouver",
      sousPhrase:
        "Le signe = veut dire « même valeur des deux côtés ». Pour trouver x, on fait l'opération inverse.",
      encadre: {
        titre: "L'idée",
        texte: "Le nombre que je cherche s'appelle x. Je remonte les opérations à l'envers.",
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
          "Des feuilles qui cachent des margouillats, des réservoirs d'eau identiques, un ramassage de déchets sur la plage, un achat au marché.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le mot « algèbre » vient d'« al-jabr », le livre d'Al-Khwarizmi, un savant de Bagdad il y a plus de 1000 ans.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAlgebreCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le nombre inconnu",
    section: {
      type: "exemple",
      enonce: "Je pense à un nombre, je lui ajoute 9 et j'obtiens 20.",
      question: "Quel est ce nombre ?",
      correction: "L'inverse de « + 9 » est « − 9 » : 20 − 9 = 11. Donc x = 11.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Modéliser",
    section: {
      type: "exemple",
      enonce: "3 feuilles cachent chacune x margouillats, plus 2 visibles.",
      question: "Quelle expression ?",
      correction: "3 feuilles → 3x, plus 2 visibles → 3x + 2.",
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
      enonce: "Un nombre multiplié par 4 donne 36.",
      question: "Quel est ce nombre ?",
      indice: "Fais l'opération inverse de « × 4 ».",
      correction: "36 ÷ 4 = 9. Le nombre est 9.",
    },
  },
];
