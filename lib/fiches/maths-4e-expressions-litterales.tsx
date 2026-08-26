// ─── Fiche de cours : les expressions littérales (4e) ──────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/expressions-litterales.bank.ts, notionId litteral_expression).
//
// ⭐ PREMIÈRE DES CINQ FICHES DU BLOC ALGÈBRE, qui s'enchaînent :
// expressions → distributivité → identités remarquables → factorisation →
// équations. Elles partagent le même vocabulaire et les mêmes canvas ; celle-ci
// pose les mots que les quatre suivantes emploieront sans les redéfinir.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Ce que la banque travaille vraiment, énoncé par énoncé :
//   litteral_expression_comprendre → « Dans l'expression 3x + 5, quelle est la lettre ? »
//   litteral_expression_traduire   → « un nombre x augmenté de 4 »
//   litteral_expression_substituer → « Calculer 3x + 2 pour x = 4 »
//   litteral_expression_reduire    → « Réduire : 3x + 2x »
//   litteral_expression_defi       → « Explique pourquoi 3x + 2x peut se réduire en 5x »
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐ LE CANVAS `algebre` EST CELUI DE LA NOTION, et il n'avait jamais servi dans
// une fiche de 4e. Il montre ce qu'aucun autre ne sait montrer : des objets
// CACHÉS derrière un symbole. « 3x + 2 », c'est trois sacs dont on ignore le
// contenu, et deux pièces qu'on voit. Tout le cours en découle — on ne peut pas
// additionner un sac et une pièce, et c'est exactement ce que dit le défi de la
// banque : 3x + 2x se réduit, 3x + 2 ne se réduit pas.
//
// Les autres dessins prennent le relais là où les sacs ne suffisent plus :
//   · l'anatomie de l'expression, mot par mot → `tableau_donnees` ;
//   · « augmenté de 4 » est une longueur ajoutée → `schema_barre` ;
//   · substituer, c'est CALCULER                 → `calcul_pose`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#2563eb";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter une vraie écriture
 * mathématique. Les libellés À L'INTÉRIEUR du dessin, eux, restent en écriture
 * simple — ils sont tracés en `<text>` SVG, où le LaTeX apparaîtrait en clair.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⭐ L'INCONNUE DEVENUE CONCRÈTE. `algebre` dessine des groupes CACHÉS derrière un
// symbole, et des objets visibles à côté. C'est la seule façon de faire voir
// qu'une lettre n'est pas un mystère : c'est un contenu qu'on ne connaît pas
// encore, mais qui est le MÊME dans tous les sacs.
// ⚠️ `theme` existe déjà dans le moteur — on ne réinvente pas l'habillage.
// ⚠️ `algebre` N'A PAS DE CHAMP `size` — c'est le seul canvas du catalogue dans
// ce cas. Il se dimensionne seul et se met à l'échelle de son bloc : on ne peut
// donc rien régler, et il faut MESURER ce qu'il donne dans une carte de 222 px.
const sacs = (opts: {
  caches: number;
  visibles: number;
  expression: string;
}) => (
  <CanvasRenderer
    figure={{
      kind: "algebre",
      theme: "jeu_video",
      groupesCaches: opts.caches,
      objetsVisibles: opts.visibles,
      symbole: "x",
      expression: opts.expression,
      display: { showConcret: true, showExpression: true, showLabels: true },
    }}
  />
);

// L'ANATOMIE D'UNE EXPRESSION, MOT PAR MOT. Ce n'est pas une figure, c'est du
// vocabulaire — et les quatre fiches d'algèbre qui suivent l'emploieront sans le
// redéfinir. Le tableau nomme chaque morceau à sa place.
const anatomie = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["le morceau", "son nom", "ce qu'il dit"],
      rows: [
        { values: ["x", "la lettre", "le nombre qu'on ne connaît pas"] },
        { values: ["3", "le coefficient", "combien de fois on prend x"] },
        { values: ["+ 5", "le terme constant", "il ne dépend pas de x"] },
      ],
      caption: "dans l'expression 3x + 5",
      display: { compact: true, striped: true },
    }}
  />
);

// « AUGMENTÉ DE 4 » EST UNE LONGUEUR AJOUTÉE. Traduire une phrase, c'est
// reconnaître l'opération qu'elle décrit — et la barre montre que le résultat est
// plus grand que x, ce qui interdit d'écrire 4x.
// ⚠️ Hauteur 200 : les étiquettes de parts sont posées à 144 px du haut et la
// phrase du bas à 18 px du bas — sous 180, elles se frôlent (mesuré en 1280).
const augmenteDe4 = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 228, height: 200 },
      total: "x + 4",
      parts: [
        { label: "x", value: "x", color: BLEU },
        { label: "de plus", value: "4", color: "#e2e8f0" },
      ],
      questionLabel: "ce n'est pas 4x",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// SUBSTITUER, C'EST CALCULER. Une fois la lettre remplacée, il ne reste que des
// nombres — et l'ordre des opérations reprend ses droits : la multiplication
// avant l'addition.
const substitution = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["3", "4"],
      result: "12",
      display: { showResult: true, compact: true },
      questionLabel: "puis 12 + 2 = 14",
    }}
  />
);

const pieges = [
  "Écrire 4x au lieu de x + 4 : « augmenté de 4 » ajoute 4, il ne multiplie pas par 4. Le résultat doit être plus GRAND que x, pas quatre fois plus grand.",
  "Réduire 3x + 2 en 5x : on ne peut additionner que des termes semblables. Trois sacs et deux pièces ne font pas cinq de quelque chose.",
  "Oublier les priorités en substituant : pour x = 4, l'expression 3x + 2 vaut 3 × 4 + 2 = 14, et non 3 × 6 = 18.",
];

const aRetenir = [
  "Une expression littérale est un calcul où une lettre remplace un nombre qu'on ne connaît pas encore. La lettre vaut la même chose partout dans l'expression.",
  "Substituer, c'est remplacer la lettre par une valeur, puis calculer en respectant les priorités.",
  "On ne réduit que des termes SEMBLABLES : les termes en x avec les termes en x, les nombres avec les nombres.",
];

export const ficheExpressionsLitterales4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "litteral-expression",
  titre: "Les expressions littérales",
  accroche:
    "Une lettre dans un calcul n'est pas un mystère : c'est un nombre qu'on ne connaît pas encore, et qui vaut la même chose d'un bout à l'autre de l'expression. Savoir lire, traduire, calculer et réduire une expression littérale ouvre tout le reste de l'algèbre de 4ᵉ.",
  identite: [
    { label: "Le mot clé", valeur: "La lettre : un nombre qu'on ne connaît pas encore" },
    { label: "Deux gestes", valeur: "Substituer une valeur, et réduire" },
    { label: "La règle d'or", valeur: "On n'additionne que ce qui est semblable" },
  ],
  definition: {
    texte:
      "Une expression littérale est un calcul dans lequel une ou plusieurs lettres remplacent des nombres. La lettre désigne un nombre précis mais inconnu, et elle garde la même valeur partout dans l'expression. Écrire $3x$ signifie « trois fois $x$ » : le signe de multiplication ne s'écrit pas devant une lettre.",
  },
  figure: {
    schema: legende(
      sacs({ caches: 3, visibles: 2, expression: "3x + 2" }),
      "trois contenus identiques mais inconnus, et deux objets visibles"
    ),
    legende: "$3x + 2$ : trois fois le même contenu caché, plus deux objets qu'on voit.",
  },
  proprietes: [
    {
      titre: "Ce que chaque morceau dit",
      micros: ["litteral_expression_comprendre"],
      texte:
        "Dans $3x + 5$, la lettre est $x$, le coefficient est 3 — il dit combien de fois on prend $x$ — et 5 est le terme constant, qui ne dépend pas de $x$.",
      schema: anatomie,
    },
    {
      titre: "Traduire une phrase",
      micros: ["litteral_expression_traduire"],
      texte:
        "« Un nombre $x$ augmenté de 4 » s'écrit $x + 4$. On ajoute, donc le résultat est plus grand que $x$ — ce que $4x$ ne dit pas du tout.",
      schema: augmenteDe4,
    },
    {
      titre: "Donner une valeur à la lettre",
      micros: ["litteral_expression_substituer"],
      texte:
        "Substituer, c'est remplacer la lettre par un nombre. Pour $x = 4$, l'expression $3x + 2$ devient $3 \\times 4 + 2$, et les priorités s'appliquent : $12 + 2 = 14$.",
      schema: substitution,
    },
    {
      titre: "On n'additionne que ce qui est pareil",
      micros: ["litteral_expression_reduire", "litteral_expression_defi"],
      texte:
        "$3x + 2x$ se réduit en $5x$ : trois sacs et deux sacs font cinq sacs. Mais $3x + 2$ ne se réduit pas — un sac et une pièce ne sont pas la même chose.",
      schema: legende(
        sacs({ caches: 5, visibles: 0, expression: "3x + 2x = 5x" }),
        "cinq fois le même contenu : ça se compte"
      ),
    },
  ],
  reel: {
    texte:
      "Une expression littérale, c'est une formule qui attend ses nombres. À La Réunion, c'est le tarif d'un taxi — une prise en charge fixe plus un prix au kilomètre —, la facture d'électricité avec son abonnement et sa consommation, ou le prix d'une sortie scolaire : un car à louer, plus tant par élève. Écrire la formule une fois permet de répondre pour vingt élèves comme pour cinquante, sans tout recommencer. C'est aussi ce que fait un tableur dans chacune de ses cellules.",
  },
  historique: {
    texte:
      "Utiliser des lettres pour les nombres inconnus vient du mathématicien français François Viète, à la fin du XVIe siècle : avant lui, les problèmes s'énonçaient en phrases entières, et chaque type de problème avait sa recette. Le mot « algèbre », lui, vient de l'arabe « al-jabr », qui désigne le geste de remettre en place — celui qu'on fait en transposant un terme d'un côté à l'autre d'une égalité.",
  },
  formule: {
    contexte: "Écriture des produits",
    expression: "3 × x s'écrit 3x   ·   x × x s'écrit x²   ·   1 × x s'écrit x",
    legende:
      "Le signe × disparaît devant une lettre, et le coefficient 1 ne s'écrit pas. C'est une convention d'écriture, pas un calcul.",
    // ⛔ Pas de schéma ici : ce sont des conventions d'écriture, pas une idée à
    // montrer. Les sacs de la définition disent déjà ce qu'est 3x. Un dessin qui
    // répète n'apprend rien (Frédéric, 25/08).
  },
  methode: [
    {
      titre: "Lire",
      micros: ["litteral_expression_comprendre"],
      // Un bloc peut rester sans dessin quand le dessin redirait le texte : le
      // tableau d'anatomie de la première propriété fait déjà ce travail.
      texte:
        "On repère d'abord la lettre, puis les coefficients qui la précèdent, puis les termes constants. Un terme est un morceau séparé des autres par un + ou un −, signe compris.",
    },
    {
      titre: "Réduire",
      micros: ["litteral_expression_reduire"],
      texte:
        "On regroupe les termes semblables : les termes en $x$ ensemble, les nombres ensemble. On additionne les coefficients, et la lettre ne bouge pas. S'il n'y a rien de semblable, l'expression est déjà réduite.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "tableau_donnees",
            headers: ["l'expression", "termes en x", "termes constants"],
            rows: [
              { values: ["3x + 2x", "3x et 2x → 5x", "aucun"] },
              { values: ["3x + 2", "3x", "2"] },
              { values: ["5x + 4 − 2x", "5x et −2x → 3x", "4"] },
            ],
            highlight: { row: 1 },
            caption: "la 2e ligne ne se réduit pas : rien n'est semblable",
            display: { compact: true, striped: true },
          }}
        />
      ),
    },
    {
      titre: "Substituer",
      micros: ["litteral_expression_substituer"],
      texte:
        "On réécrit l'expression en remplaçant chaque lettre par sa valeur, sans oublier de remettre le signe × qu'on avait supprimé. Puis on calcule en respectant les priorités.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "calcul_pose",
            operation: "addition",
            numbers: ["12", "2"],
            result: "14",
            display: { showResult: true, compact: true },
            questionLabel: "3x + 2 pour x = 4",
          }}
        />
      ),
    },
  ],
  usages: [
    {
      titre: "Écrire une formule",
      micros: ["litteral_expression_traduire"],
      detail:
        "On traduit la situation mot à mot : « augmenté de » donne une addition, « fois » une multiplication, « de moins que » une soustraction. La lettre nomme ce qui varie.",
      schema: augmenteDe4,
    },
    {
      titre: "Calculer une valeur",
      micros: ["litteral_expression_substituer"],
      detail:
        "On remplace la lettre par la valeur donnée, puis on calcule. La même formule sert pour toutes les valeurs : c'est tout son intérêt.",
    },
    {
      titre: "Simplifier l'écriture",
      micros: ["litteral_expression_reduire"],
      detail:
        "On réduit avant de substituer quand c'est possible : moins de termes, moins d'occasions de se tromper dans le calcul.",
    },
  ],
  exemples: [
    {
      titre: "Reconnaître les morceaux",
      micros: ["litteral_expression_comprendre"],
      donnees: "On considère l'expression $3x + 5$.",
      question: "Quelle est la lettre, et que représente le 3 ?",
      schema: anatomie,
      solution:
        "La lettre est $x$ : c'est le nombre qu'on ne connaît pas encore. Le 3 est le coefficient de $x$ : il dit qu'on prend trois fois ce nombre. Enfin, 5 est le terme constant — il ne dépend pas de $x$ et ne changera pas, quelle que soit la valeur de la lettre.",
    },
    {
      titre: "De la phrase à l'écriture",
      micros: ["litteral_expression_traduire"],
      donnees: "On veut traduire : « un nombre $x$ augmenté de 4 ».",
      question: "Quelle expression littérale écrit-on ?",
      schema: augmenteDe4,
      solution:
        "« Augmenté de 4 » signifie qu'on AJOUTE 4 : l'expression est $x + 4$. ⚠️ L'erreur fréquente est d'écrire $4x$, qui signifie « quatre fois $x$ ». On peut le vérifier avec un nombre : pour $x = 10$, « augmenté de 4 » donne 14, alors que $4x$ donnerait 40.",
    },
    {
      titre: "Pourquoi 3x + 2x fait 5x",
      micros: ["litteral_expression_reduire", "litteral_expression_defi"],
      donnees: "On veut réduire $3x + 2x$, et on se demande pourquoi $3x + 2$ ne se réduit pas.",
      question: "Comment l'expliquer ?",
      schema: legende(
        sacs({ caches: 5, visibles: 0, expression: "3x + 2x = 5x" }),
        "trois sacs plus deux sacs : cinq sacs"
      ),
      solution:
        "$3x$ signifie « trois fois $x$ » et $2x$ « deux fois $x$ » : ce sont des paquets du MÊME objet. Trois paquets plus deux paquets font cinq paquets, donc $3x + 2x = 5x$. On peut le vérifier avec un nombre : pour $x = 4$, on a $12 + 8 = 20$, et $5 \\times 4 = 20$. En revanche, dans $3x + 2$, le 2 n'est pas un paquet de $x$ : les deux termes ne sont pas semblables, et l'expression est déjà réduite.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Dans l'expression $3x + 5$, quelle est la lettre et quel est le terme constant ?",
      correction:
        "La lettre est $x$, c'est le nombre inconnu. Le terme constant est 5 : il ne dépend pas de $x$. Le 3, lui, est le coefficient de $x$.",
      micros: ["litteral_expression_comprendre"],
    },
    {
      question: "Traduire par une expression littérale : « un nombre $x$ augmenté de 4 ».",
      correction:
        "On écrit $x + 4$. « Augmenté de » indique une addition. Attention à ne pas écrire $4x$, qui voudrait dire « quatre fois $x$ » — un contrôle rapide avec $x = 10$ suffit à trancher : 14 contre 40.",
      micros: ["litteral_expression_traduire"],
    },
    {
      question: "Calculer $3x + 2$ pour $x = 4$.",
      correction:
        "On remplace $x$ par 4, en remettant le signe de multiplication : $3 \\times 4 + 2$. La multiplication passe avant l'addition, donc $12 + 2 = 14$. ⚠️ On ne calcule pas $4 + 2 = 6$ puis $3 \\times 6$ : ce serait ignorer les priorités.",
      micros: ["litteral_expression_substituer"],
    },
    {
      question: "Explique pourquoi $3x + 2x$ peut se réduire en $5x$, mais pas $3x + 2$.",
      correction:
        "$3x$ et $2x$ sont des termes SEMBLABLES : ce sont des paquets du même objet $x$. Trois paquets plus deux paquets font cinq paquets, donc $5x$. Dans $3x + 2$, en revanche, le 2 n'est pas un paquet de $x$ — c'est un nombre seul. On ne peut pas additionner des choses de natures différentes, exactement comme on n'additionne pas trois sacs et deux pièces.",
      micros: ["litteral_expression_reduire", "litteral_expression_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesExpressionsLitterales4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Expressions littérales - 4e",
    section: {
      type: "objectif",
      phrase: "Une lettre à la place d'un nombre inconnu",
      sousPhrase:
        "Lire, traduire, calculer et réduire une expression littérale : c'est la porte d'entrée de toute l'algèbre de 4e.",
      encadre: {
        titre: "L'idée",
        texte: "La lettre vaut la même chose d'un bout à l'autre de l'expression.",
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
          "Le tarif d'un taxi — une prise en charge plus un prix au kilomètre —, une facture d'électricité, le prix d'une sortie scolaire, chaque cellule d'un tableur.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Algèbre » vient de l'arabe « al-jabr », le geste de remettre en place. Et c'est Viète qui, au XVIe siècle, a eu l'idée d'écrire les inconnues avec des lettres.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "On n'additionne que ce qui est semblable",
      sousPhrase:
        "3x + 2x fait 5x — trois sacs et deux sacs font cinq sacs. Mais 3x + 2 ne se réduit pas : un sac n'est pas une pièce.",
      encadre: {
        titre: "Le test",
        texte: "Remplace la lettre par un nombre : si les deux écritures donnent le même résultat, la réduction est juste.",
      },
    },
  },
  {
    titre: "Les conventions d'écriture",
    badge: "3 repères",
    section: {
      type: "cartes",
      cartes: [
        { titre: "3 × x s'écrit 3x", texte: "Le signe × disparaît devant une lettre." },
        { titre: "1 × x s'écrit x", texte: "Le coefficient 1 ne s'écrit pas." },
        { titre: "x × x s'écrit x²", texte: "Un produit de la lettre par elle-même devient une puissance." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheExpressionsLitterales4e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheExpressionsLitterales4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "De la phrase à l'écriture",
    section: {
      type: "exemple",
      enonce: "« Un nombre x augmenté de 4 ».",
      question: "Quelle expression écrit-on ?",
      correction:
        "x + 4. Pour x = 10, cela fait 14 — alors que 4x donnerait 40.",
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
      enonce: "Calculer 3x + 2 pour x = 4.",
      question: "Quel est le résultat ?",
      indice: "La multiplication passe avant l'addition.",
      correction: "3 × 4 + 2 = 12 + 2 = 14. Et non 3 × 6 = 18.",
    },
  },
];
