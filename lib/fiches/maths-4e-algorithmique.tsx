// ─── Fiche de cours : algorithmique et programmation (4e) ─────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/algorithmique.bank.ts, notionId algo_programmation).
//
// ⭐ LA VINGTIÈME ET DERNIÈRE FICHE DE LA 4ᵉ, et la seule qui emploie le canvas
// `scratch` à ce niveau. Elle referme aussi une boucle : le dernier dessin met
// une EXPRESSION LITTÉRALE dans un bloc de programme, ce qui renvoie à la
// première fiche du bloc algèbre. Une lettre dans un calcul et une variable dans
// un programme sont la même idée, vue par deux métiers.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Ce que la banque travaille vraiment :
//   algo_condition  → « une condition sert à… » → TESTER SI UNE AFFIRMATION EST
//        VRAIE OU FAUSSE ; et une avalanche de « score vaut n, la condition
//        score > s est-elle vraie ? ». ⚠️ Dont celle-ci : « score vaut 10, la
//        condition score > 10 est-elle vraie ? » → NON.
//   algo_instruction_conditionnelle → « si … alors » n'exécute QUE si la
//        condition est vraie ; dans « si … alors … sinon », quand la condition
//        est fausse, SEULES les instructions du « sinon » s'exécutent.
//   algo_variable → « une variable sert à STOCKER UNE VALEUR QUI PEUT CHANGER » ;
//        « mettre score à 0 » lui donne la valeur 0 ; « ajouter 5 à score »
//        REMPLACE l'ancienne valeur par l'ancienne plus 5.
//   algo_programme_objectif → choisir les blocs qui atteignent un objectif ;
//        traduire « au moins 10 » en « score ≥ 10 » ; et mettre une formule
//        littérale dans un programme (« 3 × x + 2 »).
//   algo_modifier → changer un seuil, changer un bonus, et VÉRIFIER en testant.
//   algo_defi     → « score vaut 0, on répète 3 fois ajouter 4 » → 12.
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐⭐ LE CONTRE-EXEMPLE EST UN VRAI BUG DE PROGRAMMEUR, et la banque y revient
// CINQ fois : la confusion entre « > » et « ≥ ».
//     « Un programme doit réagir si score est AU MOINS 10, mais il utilise
//       score > 10. Quelle correction ? » → remplacer par « score ≥ 10 »
//     et le défi le nomme : « le programme exclut le cas où score est égal au
//     seuil ».
// C'est l'erreur qui ne se voit sur aucun essai SAUF UN — celui où la valeur
// tombe exactement sur le seuil. D'où la méthode que la fiche enseigne : tester
// aux BORNES, pas au hasard. Le tableau de la première propriété montre les
// trois valeurs 9, 10 et 11 côte à côte, et une seule ligne diffère.
//
// ⛔ `scratch` REND EN HTML, PAS EN SVG — ET ÇA CHANGE LE CONTRÔLE. Le mesureur
// de console ne lit que les `<text>` des SVG : il ne verra AUCUN de ces blocs, et
// répondra « 0 petite, 0 chevauchement » sans avoir rien regardé. Ce qui menace
// ici n'est pas la taille de police (14 px et 12 px, fixes et confortables) mais
// le DÉBORDEMENT : chaque bloc est en `w-fit`, son retrait vaut `profondeur × 14`
// pixels, et rien ne le contraint à la largeur de sa carte. Un libellé trop long
// sort donc du cadre sans que personne ne l'apprenne.
// 👉 Les libellés de cette fiche sont tous COURTS et ont été mesurés au DOM
// (largeur du bloc contre largeur de son conteneur), pas à l'œil. Le libellé par
// défaut de `event` — « 🟩 quand drapeau vert cliqué », 28 signes — est le seul
// qui débordait : il est remplacé partout par « 🟩 quand on clique ».

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/** Un dessin et sa phrase, sous lui. La phrase passe par `TexteMath` — les
 *  libellés à l'intérieur du dessin restent en écriture simple. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⭐ LE PROGRAMME COMPLET, ET IL EST UNE FONCTION DE SON BONUS. C'est ce qui
// permet de montrer « modifier un programme » sans redessiner : le même
// programme avec 4 donne 12 et affiche « Gagné », avec 2 il donne 6 et affiche
// « Continue ». Un seul nombre change, et la sortie bascule.
// Les valeurs viennent de la banque : score part de 0, on répète 3 fois, et le
// seuil de réussite est 10.
const programme = (bonus: number) => (
  <CanvasRenderer
    figure={{
      kind: "scratch",
      blocks: [
        { type: "event", text: "🟩 quand on clique" },
        { type: "set_variable", variable: "score", value: 0 },
        {
          type: "repeat",
          times: 3,
          children: [
            { type: "change_variable", variable: "score", value: bonus },
          ],
        },
        {
          type: "if_else",
          condition: "score ≥ 10",
          children: [{ type: "say", text: "« Gagné »" }],
          elseChildren: [{ type: "say", text: "« Continue »" }],
        },
      ],
      display: { compact: true },
    }}
  />
);

// LE BLOC DE DÉCISION, SEUL. Détaché du reste, il montre les deux branches : ce
// qui se passe quand c'est vrai, et ce qui se passe quand c'est faux. La banque
// insiste sur ce point — quand la condition est fausse, SEULES les instructions
// du « sinon » s'exécutent, jamais les deux.
const blocDecision = (
  <CanvasRenderer
    figure={{
      kind: "scratch",
      blocks: [
        {
          type: "if_else",
          condition: "score ≥ 10",
          children: [{ type: "say", text: "« Validé »" }],
          elseChildren: [{ type: "say", text: "« À revoir »" }],
        },
      ],
      display: { compact: true },
    }}
  />
);

// ⭐ UNE EXPRESSION LITTÉRALE DEVIENT UN BLOC, et la boucle de l'année se
// referme. « 3 × x + 2 » est exactement ce que la première fiche du bloc algèbre
// appelait une expression littérale ; ici, x est une variable de programme. La
// lettre du mathématicien et la variable de l'informaticien sont la même chose.
const formuleEnBlocs = (
  <CanvasRenderer
    figure={{
      kind: "scratch",
      blocks: [
        { type: "event", text: "🟩 quand on clique" },
        { type: "set_variable", variable: "x", value: 5 },
        { type: "set_variable", variable: "y", value: "3 × x + 2" },
        { type: "say", text: "y" },
      ],
      display: { compact: true },
    }}
  />
);

// ⭐⭐ LE TABLEAU QUI MONTRE LE BUG. Trois valeurs autour du seuil, et deux
// conditions. Les lignes 9 et 11 sont identiques : c'est pour cela que l'erreur
// passe inaperçue quand on teste au hasard. La ligne 10 est la seule où les deux
// conditions divergent — et c'est justement celle que la banque interroge.
const tableauSeuils = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["si score vaut", "score > 10", "score ≥ 10"],
      rows: [
        { values: ["9", "faux", "faux"] },
        { values: ["10", "faux", "VRAI"] },
        { values: ["11", "vrai", "vrai"] },
      ],
      highlight: { row: 1 },
      caption: "une seule ligne diffère : celle du seuil exact",
      display: { compact: true, striped: true },
    }}
  />
);

// LA TRACE D'EXÉCUTION — le geste de base de l'informaticien. On suit la
// variable ligne à ligne, en notant sa valeur avant et après. C'est ainsi qu'on
// comprend « ajouter 4 à score » : l'ancienne valeur est REMPLACÉE par
// l'ancienne plus 4. Les nombres sont ceux du défi de la banque : 3 fois 4 → 12.
const tableauTrace = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["l'instruction", "score avant", "score après"],
      rows: [
        { values: ["mettre score à 0", "—", "0"] },
        { values: ["ajouter 4 à score", "0", "4"] },
        { values: ["ajouter 4 à score", "4", "8"] },
        { values: ["ajouter 4 à score", "8", "12"] },
      ],
      highlight: { row: 3 },
      caption: "la variable garde la dernière valeur écrite",
      display: { compact: true, striped: true },
    }}
  />
);

// ⭐ DU FRANÇAIS À LA CONDITION. C'est là que se joue tout `algo_programme_objectif` :
// l'énoncé est une phrase, et il faut choisir le bon symbole. Trois formulations
// courantes, trois conditions, et ce que chacune fait du cas limite.
const tableauObjectifs = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["l'objectif dit", "la condition", "et 10 alors ?"],
      rows: [
        { values: ["plus de 10", "score > 10", "exclu"] },
        { values: ["au moins 10", "score ≥ 10", "inclus"] },
        { values: ["exactement 10", "score = 10", "le seul cas"] },
      ],
      highlight: { row: 1 },
      caption: "« au moins » inclut la valeur, « plus de » ne l'inclut pas",
      display: { compact: true, striped: true },
    }}
  />
);

const pieges = [
  "Confondre « > » et « ≥ » : « au moins 10 » s'écrit score ≥ 10. Avec score > 10, un élève qui a exactement 10 est refusé — et le bug ne se voit sur aucun essai sauf celui-là.",
  "Croire qu'un « si … alors … sinon » exécute les deux branches : il n'en exécute JAMAIS qu'une seule. Si la condition est fausse, seules les instructions du « sinon » tournent.",
  "Oublier que « ajouter 4 à score » REMPLACE la valeur : score ne vaut pas 4, il vaut son ancienne valeur plus 4. Trois fois de suite à partir de 0, cela fait 12 et non 4.",
];

const aRetenir = [
  "Une condition est une affirmation que le programme teste : elle est VRAIE ou FAUSSE, jamais autre chose. « si … alors » n'exécute ses instructions que si elle est vraie.",
  "Une variable est une case qui garde une valeur, et cette valeur peut changer. « mettre à » écrase, « ajouter à » modifie à partir de l'ancienne valeur.",
  "Un programme se vérifie en le faisant tourner sur des valeurs choisies — surtout celles qui tombent exactement sur le seuil, là où les erreurs se cachent.",
];

export const ficheAlgorithmique4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "algo-programmation",
  titre: "Algorithmique et programmation",
  accroche:
    "Un programme est une suite d'instructions qu'une machine exécute sans rien deviner : elle fait exactement ce qui est écrit, ni plus ni moins. Trois idées suffisent pour tout ce qu'on demande en 4ᵉ — une variable qui retient, une condition qui décide, une répétition qui recommence. Et la plus grosse difficulté n'est pas d'écrire le programme : c'est de traduire l'objectif en condition juste.",
  identite: [
    { label: "Le mot clé", valeur: "La condition : vraie ou fausse" },
    { label: "Le geste", valeur: "Suivre la variable, ligne à ligne" },
    { label: "La règle d'or", valeur: "« Au moins 10 » s'écrit score ≥ 10" },
  ],
  definition: {
    texte:
      "Un algorithme est une suite d'instructions qui mène à un résultat ; un programme en est l'écriture dans un langage qu'une machine comprend. Trois briques suffisent ici. La VARIABLE est une case nommée qui retient une valeur, et cette valeur peut changer. La CONDITION est une affirmation que la machine teste : elle vaut vrai ou faux. L'INSTRUCTION CONDITIONNELLE, « si … alors … sinon », choisit ce qu'on exécute selon la réponse. ⚠️ La machine ne devine rien : elle applique la condition écrite, pas celle qu'on avait en tête.",
  },
  figure: {
    schema: legende(
      programme(4),
      "score part de 0, gagne 4 trois fois, puis on décide"
    ),
    legende:
      "Le programme se lit de haut en bas. Après les trois tours de boucle, score vaut $3 \\times 4 = 12$. Comme $12 \\geq 10$, la condition est vraie : le lutin dit « Gagné », et la branche « sinon » n'est jamais exécutée.",
  },
  proprietes: [
    {
      titre: "Vraie ou fausse, rien d'autre",
      micros: ["algo_condition"],
      texte:
        "Une condition est un test dont la réponse est oui ou non. ⚠️ Et le cas limite compte : si score vaut exactement 10, alors « score > 10 » est FAUSSE, tandis que « score ≥ 10 » est vraie.",
      schema: tableauSeuils,
    },
    {
      titre: "Une branche, jamais deux",
      micros: ["algo_instruction_conditionnelle"],
      texte:
        "« Si … alors … sinon » choisit. Quand la condition est vraie, seules les instructions du haut s'exécutent ; quand elle est fausse, seules celles du « sinon ». Il n'y a jamais les deux.",
      schema: blocDecision,
    },
    {
      titre: "La variable garde la dernière valeur",
      micros: ["algo_variable"],
      texte:
        "« Mettre score à 0 » écrase ce qu'il y avait. « Ajouter 4 à score » ne met pas 4 : il remplace l'ancienne valeur par l'ancienne plus 4. Trois fois de suite depuis 0, on arrive à 12.",
      schema: tableauTrace,
    },
    {
      titre: "Modifier, c'est changer une seule chose",
      micros: ["algo_modifier"],
      texte:
        "Voici le même programme avec 2 au lieu de 4. Le score final devient $3 \\times 2 = 6$, la condition est fausse, et le lutin dit « Continue ». Un nombre a changé, la sortie a basculé.",
      schema: programme(2),
    },
  ],
  reel: {
    texte:
      "La confusion entre « plus de » et « au moins » n'est pas une subtilité d'exercice : c'est l'un des bugs les plus courants du métier, et il coûte cher. Un site qui offre la livraison « à partir de 50 € » et qui teste « total > 50 » refuse la livraison gratuite à qui commande exactement 50 € — et personne ne s'en aperçoit tant qu'aucun client ne tombe pile dessus. Les mêmes trois briques font tourner tout ce qui vous entoure : le distributeur qui compare votre code, la machine à laver qui répète un cycle, l'appareil photo du téléphone qui décide d'allumer le flash. Et le réflexe qu'enseigne cette fiche — essayer la valeur exacte du seuil — est celui que les développeurs appliquent tous les jours sous le nom de « test aux limites ».",
  },
  historique: {
    texte:
      "Le mot « algorithme » est le nom d'un homme : al-Khwarizmi, savant de Bagdad du IXᵉ siècle, dont le nom latinisé en « Algoritmi » a fini par désigner les méthodes de calcul qu'il décrivait — le même auteur, d'ailleurs, dont le livre a donné le mot « algèbre ». Quant au premier programme de l'histoire, il a été écrit en 1843 par la mathématicienne britannique Ada Lovelace pour une machine qui n'a jamais été construite, la machine analytique de Charles Babbage. Elle y avait vu quelque chose que Babbage lui-même n'avait pas vu : que la machine pourrait manipuler autre chose que des nombres.",
  },
  formule: {
    contexte: "Les quatre blocs de la 4ᵉ",
    expression:
      "mettre … à …   ·   ajouter … à …   ·   répéter … fois   ·   si … alors … sinon",
    legende:
      "Quatre blocs suffisent à écrire tous les programmes de cette fiche : un pour créer une variable, un pour la faire évoluer, un pour répéter, un pour décider. Tout le reste est du vocabulaire.",
    // ⛔ Pas de schéma ici, et c'est réfléchi : le programme complet de la figure
    // de référence contient les quatre blocs, empilés dans cet ordre. Les
    // redessiner seuls ne dirait rien de neuf (Frédéric, 25/08).
  },
  methode: [
    {
      titre: "Traduire l'objectif",
      micros: ["algo_programme_objectif"],
      texte:
        "On part de la phrase et on choisit le symbole. « Plus de 10 » exclut 10, « au moins 10 » l'inclut, « exactement 10 » ne garde que lui. C'est l'étape où se jouent la plupart des erreurs.",
      schema: tableauObjectifs,
    },
    {
      titre: "Suivre la variable",
      micros: ["algo_variable"],
      texte:
        "On note la valeur de la variable après chaque instruction, dans un tableau. C'est long la première fois, et c'est la seule façon d'être sûr — un programme ne se lit pas, il se déroule.",
      schema: tableauTrace,
    },
    {
      titre: "Tester aux bornes",
      micros: ["algo_defi", "algo_condition"],
      texte:
        "On essaie la valeur juste en dessous du seuil, le seuil exact, et celle juste au-dessus. Une erreur de « > » ou « ≥ » ne se voit QUE sur le seuil exact : tester au hasard ne la trouvera pas.",
      schema: tableauSeuils,
    },
  ],
  usages: [
    {
      titre: "Un jeu qui compte les points",
      micros: ["algo_programme_objectif", "algo_variable"],
      detail:
        "Une variable retient le score, une boucle le fait monter, une condition décide du message final. C'est le squelette de presque tous les petits jeux.",
      schema: programme(4),
    },
    {
      titre: "Changer la difficulté",
      micros: ["algo_modifier"],
      detail:
        "Baisser le bonus de 4 à 2 rend le jeu plus dur sans toucher au reste : le score final passe de 12 à 6, et le message change. Modifier, c'est agir sur un seul nombre — puis vérifier.",
      schema: programme(2),
    },
    {
      titre: "Programmer une formule",
      micros: ["algo_programme_objectif"],
      detail:
        "Une expression littérale se met telle quelle dans un bloc : $y = 3x + 2$ devient « mettre y à 3 × x + 2 ». La lettre du mathématicien et la variable du programmeur sont la même idée.",
      schema: formuleEnBlocs,
    },
  ],
  exemples: [
    {
      titre: "Que dit le lutin ?",
      micros: ["algo_instruction_conditionnelle", "algo_variable"],
      donnees: "Le programme met score à 0, répète 3 fois « ajouter 4 à score », puis teste « score ≥ 10 ».",
      question: "Quel message s'affiche ?",
      schema: programme(4),
      solution:
        "On déroule. Après « mettre score à 0 », score vaut 0. La boucle tourne trois fois : 0 → 4 → 8 → 12. La condition « $12 \\geq 10$ » est vraie, donc le lutin dit « Gagné ». ⚠️ La branche « sinon » n'est PAS exécutée : une instruction conditionnelle ne choisit jamais les deux.",
    },
    {
      titre: "Le bug du « au moins »",
      micros: ["algo_condition", "algo_defi"],
      donnees: "Un programme doit dire « Validé » si la note est AU MOINS 10. Il utilise la condition « note > 10 ».",
      question: "Où est le problème, et comment le trouver ?",
      schema: tableauSeuils,
      solution:
        "Pour une note de 9, le programme refuse — c'est correct. Pour 11, il valide — correct aussi. Mais pour exactement 10, « $10 > 10$ » est FAUSSE : l'élève est refusé alors qu'il devrait passer. ⭐ Le programme exclut le cas où la note est égale au seuil, et c'est le SEUL essai qui le révèle. La correction est d'écrire « note ≥ 10 ». Et la leçon vaut au-delà : on ne teste pas au hasard, on teste aux bornes.",
    },
    {
      titre: "Modifier sans tout casser",
      micros: ["algo_modifier"],
      donnees: "On veut rendre le jeu plus difficile : le bonus passe de 4 à 2.",
      question: "Que devient le message affiché ?",
      schema: programme(2),
      solution:
        "Seul le bloc « ajouter … à score » change. La boucle donne maintenant 0 → 2 → 4 → 6, donc score vaut 6. La condition « $6 \\geq 10$ » est fausse, et le lutin dit « Continue ». ⭐ On a modifié UNE valeur, et on a vérifié en déroulant : c'est la méthode complète. Modifier sans dérouler ensuite, c'est espérer plutôt que savoir.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "La variable score vaut 10. La condition « score > 10 » est-elle vraie ?",
      correction:
        "Non. Le symbole « > » signifie STRICTEMENT supérieur : 10 n'est pas strictement supérieur à 10. Pour inclure le cas d'égalité, il faut écrire « score ≥ 10 ».",
      micros: ["algo_condition"],
    },
    {
      question: "Dans un bloc « si … alors … sinon », que se passe-t-il quand la condition est fausse ?",
      correction:
        "Seules les instructions du « sinon » sont exécutées. Celles du « alors » sont ignorées entièrement. Une instruction conditionnelle choisit toujours une branche et une seule.",
      micros: ["algo_instruction_conditionnelle"],
    },
    {
      question: "score vaut 0. On exécute trois fois « ajouter 4 à score ». Quelle est la valeur finale ?",
      correction:
        "12. Chaque exécution remplace l'ancienne valeur par l'ancienne plus 4 : 0 → 4 → 8 → 12. ⚠️ La réponse 4 confond « ajouter 4 » avec « mettre à 4 ».",
      micros: ["algo_variable", "algo_defi"],
    },
    {
      question: "On veut afficher « Gagné » si le score est au moins 10. Quelle condition choisir ?",
      correction:
        "« score ≥ 10 ». « Au moins 10 » inclut la valeur 10 ; « score > 10 » l'exclurait et refuserait un joueur qui a exactement 10 points.",
      micros: ["algo_programme_objectif"],
    },
    {
      question: "Un programme teste « score > 5 ». On veut maintenant qu'il réagisse seulement si le score dépasse 8. Quelle est la nouvelle condition ?",
      correction:
        "« score > 8 ». On ne change que le nombre du seuil : le symbole reste « > », puisque « dépasse » veut bien dire strictement supérieur. Puis on vérifie en essayant 8, qui doit être refusé.",
      micros: ["algo_modifier"],
    },
    {
      question: "Que fait le bloc « mettre score à 0 » ?",
      correction:
        "Il donne la valeur 0 à la variable score, en effaçant ce qu'elle contenait. ⚠️ Ce n'est pas « ajouter 0 » : « mettre à » écrase, « ajouter à » part de l'ancienne valeur.",
      micros: ["algo_variable"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : `ModeClasse.tsx` n'a pas de rendu KaTeX, et le
// code serait projeté en clair au tableau devant la classe.
export const slidesAlgorithmique4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Algorithmique - 4e",
    section: {
      type: "objectif",
      phrase: "La machine ne devine rien",
      sousPhrase:
        "Une variable qui retient, une condition qui décide, une répétition qui recommence : trois briques suffisent.",
      encadre: {
        titre: "L'idée",
        texte: "Le programme fait ce qui est écrit, pas ce qu'on avait en tête.",
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
          "Un site qui offre la livraison « à partir de 50 € » mais teste « total > 50 » refuse la gratuité à qui commande exactement 50 €. Personne ne le voit tant qu'aucun client ne tombe pile dessus.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Algorithme » est le nom d'un homme : al-Khwarizmi, savant de Bagdad du IXe siècle — le même dont le livre a donné le mot « algèbre ». Et le premier programme est d'Ada Lovelace, en 1843, pour une machine jamais construite.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "« Au moins 10 » s'écrit score ≥ 10",
      sousPhrase:
        "Avec score > 10, celui qui a exactement 10 est refusé. Et l'erreur ne se voit sur aucun essai, sauf celui-là.",
      encadre: {
        titre: "Le test",
        texte: "Essaie 9, puis 10, puis 11. Les erreurs de seuil se cachent toujours sur la valeur exacte.",
      },
    },
  },
  {
    titre: "Les quatre blocs",
    badge: "4 briques",
    section: {
      type: "cartes",
      cartes: [
        { titre: "mettre … à …", texte: "Crée la variable et écrase sa valeur." },
        { titre: "ajouter … à …", texte: "Part de l'ancienne valeur et la modifie." },
        { titre: "répéter … fois", texte: "Recommence les mêmes instructions." },
        { titre: "si … alors … sinon", texte: "Choisit UNE branche, jamais les deux." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAlgorithmique4e.methode.map((m) => ({
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
      cartes: ficheAlgorithmique4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On déroule",
    section: {
      type: "exemple",
      enonce: "score = 0, puis 3 fois « ajouter 4 à score », puis « si score ≥ 10 ».",
      question: "Que dit le lutin ?",
      correction:
        "0 → 4 → 8 → 12. Comme 12 ≥ 10, il dit « Gagné ». La branche « sinon » n'est pas exécutée.",
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
      enonce: "La variable score vaut 10.",
      question: "La condition « score > 10 » est-elle vraie ?",
      indice: "« > » veut dire STRICTEMENT supérieur.",
      correction: "Non : 10 n'est pas strictement supérieur à 10. Il fallait écrire score ≥ 10.",
    },
  },
];
