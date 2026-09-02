// ─── Fiche de cours : algorithmique et programmation (3e) ─────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/algorithmique.bank.ts, notionId `algo_programmation`, 59 items).
//
// ⭐⭐ LA THÈSE DE LA FICHE : UN PROGRAMME DE CALCUL EST UNE EXPRESSION
// LITTÉRALE. Ce n'est pas une jolie formule, c'est ce que la banque demande
// littéralement — `algo_generaliser` pose six fois « quelle expression
// généralise ce programme ? », et `algo_corriger` demande ce que signifie que
// deux programmes donnent le même résultat POUR TOUT x (réponse : ils sont
// équivalents). L'algorithmique de 3e n'est donc pas un chapitre d'informatique
// posé à côté des maths : c'est le calcul littéral, écrit dans l'autre sens.
// 👉 La fiche renvoie explicitement à `litteral-calcul`, et son piège central
// est le MÊME : l'ordre des opérations. « Ajouter 3 puis multiplier par 4 »
// s'écrit $4(x+3)$, pas $4x + 3$ — la banque pose exactement cette question.
//
// ⭐ CINQ MICROS SUR SIX N'EXISTENT PAS EN 4e — c'est la notion la plus neuve
// des huit qui restaient après les quatre notions entièrement propres. Seule
// `algo_defi` a une cousine. Le risque de recopier la 4e est donc faible ; le
// vrai risque est ailleurs, et c'est celui du doublon avec `litteral_calcul`,
// écrit le même jour. La ligne retenue : là-bas on TRANSFORME une expression
// donnée, ici on la FABRIQUE à partir d'une suite de gestes, et l'on exécute des
// variables et des boucles, qui n'existent nulle part ailleurs au programme.
//
// ⭐ LES 59 ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE — la règle du 31/08 :
//   algo_variable_boucle    → « mettre a à b », et répéter n fois
//   algo_condition_complexe → ET, OU, et le contraire d'une condition
//   algo_programme_calcul   → choisis un nombre, ×a, +b — et le sens inverse
//   algo_generaliser        → l'expression, et les motifs d'allumettes
//   algo_corriger           → les quatre bogues classiques de la banque
//   algo_defi               → boucle ET condition dans le même programme
//
// ⚠️ LE CANVAS `scratch` NE SE MESURE PAS. Comme `algebre`, il rend du HTML et
// non un <svg> : `scripts/mesurer-fiches.mjs` ne le voit pas, et il n'a d'ailleurs
// pas de champ `size` — il se replie tout seul sur la largeur de son bloc. Il se
// contrôle donc à l'œil, à 375 px.
//
// ⛔ ET `number_line` NE DESSINE QUE DES POINTS, JAMAIS UN INTERVALLE OMBRÉ —
// vérifié jusque dans la banque des intervalles de 2de, qui n'a pas d'autre
// moyen. Écrire sous une droite « tous les nombres entre 0 et 10 conviennent »
// serait donc une légende qui promet ce que le dessin ne trace pas. La condition
// composée est montrée par TROIS POINTS TESTÉS — non, oui, non — ce qui est
// exactement la forme des questions de la banque, et ce que le dessin montre
// réellement.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut porter du LaTeX.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⚠️ LES LARGEURS SONT CELLES MESURÉES SUR TÉLÉPHONE DE 375 px : 222 px pour
// une carte de propriété, 216 px pour « La formule », 200 px pour un exemple.
// ⚠️ Aucun emplacement de fiche ne dépasse 225 px, y compris en 1280 — mesuré
// par `scripts/mesurer-largeurs-blocs.mjs`.
const tableau = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" | "formule" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "tableau_donnees",
        display: { compact: true, striped: true },
        size: {
          width: bloc === "exemple" ? 200 : bloc === "formule" ? 216 : 222,
        },
        ...data,
      } as never
    }
  />
);

/**
 * Un programme en blocs, à la Scratch.
 * ⚠️ Pas de `size` : ce canvas rend du HTML et se replie sur la largeur de son
 * bloc. Il échappe donc au mesureur automatique — contrôle à l'œil.
 */
const programme = (titre: string, blocs: unknown[], description?: string) => (
  <CanvasRenderer
    figure={
      {
        kind: "scratch",
        title: titre,
        description,
        blocks: blocs,
        display: { compact: true },
      } as never
    }
  />
);

export const ficheAlgorithmique3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "algo-programmation",
  titre: "Algorithmique : variables, boucles et programmes de calcul",
  accroche:
    "« Choisis un nombre, multiplie-le par 4, ajoute 1 » : voilà un programme. Mais c'est aussi une expression littérale, $4x + 1$, et les deux disent rigoureusement la même chose. Tout ce chapitre tient dans ce va-et-vient — exécuter une suite de gestes sur un nombre précis, ou l'écrire une fois pour toutes avec une lettre. La machine fait le premier ; l'algèbre fait le second.",
  identite: [
    { label: "Une variable", valeur: "Une boite qui retient une valeur, et qu'on peut changer" },
    { label: "Le lien avec l'algèbre", valeur: "Un programme de calcul se généralise en une expression" },
    { label: "Le piège", valeur: "« Ajouter 3 puis multiplier par 4 » donne $4(x+3)$, pas $4x+3$" },
  ],
  definition: {
    texte:
      "Un algorithme est une suite d'instructions non ambiguës qui, exécutées dans l'ordre, résolvent un problème. Trois briques suffisent à tout écrire. Une VARIABLE retient une valeur et peut la changer en cours de route. Une BOUCLE répète un bloc d'instructions un nombre donné de fois. Une CONDITION choisit entre deux suites selon qu'un test est vrai ou faux. Un programme de calcul est le cas le plus simple : il n'utilise qu'une variable, et aucune répétition.",
  },
  figure: {
    schema: programme(
      "Un programme de calcul",
      [
        { type: "ask", text: "Choisis un nombre" },
        { type: "set_variable", variable: "x", value: "réponse" },
        { type: "change_variable", variable: "x", value: 3 },
        { type: "set_variable", variable: "x", value: "x × 4" },
        { type: "say", text: "résultat" },
      ],
      "On ajoute 3, PUIS on multiplie par 4.",
    ),
    legende:
      "Lu dans l'ordre : le nombre choisi reçoit d'abord $+3$, et c'est le TOTAL qui est ensuite multiplié par 4. L'expression est donc $4(x+3)$ — les parenthèses ne sont pas décoratives, elles disent l'ordre.",
  },
  proprietes: [
    {
      titre: "Une variable retient, puis oublie",
      texte:
        "Une variable est une boite nommée qui contient une valeur. L'instruction « mettre $a$ à $b$ » copie la valeur de $b$ DANS $a$ : après elle, $a$ vaut ce que valait $b$, et $b$ n'a pas bougé. La valeur précédente de $a$, elle, est définitivement perdue. C'est le point qui déroute : le signe ressemble à une égalité, mais il désigne un déplacement à sens unique.",
      schema: legende(
        tableau({
          headers: ["instruction", "a", "b"],
          rows: [
            { values: ["au départ", "3", "7"] },
            { values: ["mettre a à b", "7", "7"] },
            { values: ["l'ancien 3", "perdu", "—"] },
          ],
          highlight: { row: 1 },
          caption: "b ne change pas",
        }),
        "Le contenu va de droite à gauche : $b$ garde sa valeur, $a$ perd la sienne."
      ),
      micros: ["algo_variable_boucle"],
    },
    {
      titre: "Une boucle répète, et le total se construit",
      texte:
        "Répéter $n$ fois « ajouter $p$ » fait grandir la variable de $n \\times p$ au total. Encore faut-il l'avoir INITIALISÉE avant d'entrer dans la boucle : une variable qui n'a pas reçu de valeur de départ ne peut pas être augmentée, et le programme échoue ou repart d'une valeur imprévisible. Le tableau d'exécution — une ligne par tour — est le moyen le plus sûr de suivre ce qui se passe.",
      schema: legende(
        tableau({
          headers: ["tour", "total"],
          rows: [
            { values: ["au départ", "0"] },
            { values: ["après le 1er", "5"] },
            { values: ["après le 2e", "10"] },
            { values: ["après le 3e", "15"] },
          ],
          caption: "3 tours de « ajouter 5 »",
        }),
        "Trois répétitions de $+5$ à partir de 0 : le total vaut $3 \\times 5 = 15$."
      ),
      micros: ["algo_variable_boucle"],
    },
    {
      titre: "Une condition avec ET : les deux à la fois",
      texte:
        "La condition « $x > 0$ ET $x < 10$ » n'est vraie que si les DEUX tests le sont en même temps. Un nombre négatif échoue au premier, un nombre trop grand au second, et un seul échec suffit à rendre l'ensemble faux. Avec OU, c'est l'inverse : « $x < 0$ OU $x > 10$ » est vraie dès qu'UN des deux tests réussit.",
      schema: legende(
        <CanvasRenderer
          figure={
            {
              kind: "number_line",
              size: { width: 222, height: 120 },
              min: -5,
              max: 15,
              step: 5,
              points: [
                { value: -3, label: "non" },
                { value: 5, label: "oui" },
                { value: 12, label: "non" },
              ],
              display: {
                showTicks: true,
                showValues: true,
                showPoints: true,
                showPointLabels: true,
                showZero: true,
              },
            } as never
          }
        />,
        "Trois nombres testés : seul celui du milieu satisfait les deux conditions."
      ),
      micros: ["algo_condition_complexe"],
    },
    {
      titre: "Le contraire d'une condition renverse aussi le bord",
      texte:
        "Le contraire de « $x \\geqslant 5$ » est « $x < 5$ », et non « $x \\leqslant 5$ ». La valeur 5 elle-même doit changer de camp : elle satisfaisait la première, elle ne doit pas satisfaire la seconde. Oublier ce détail est le bogue le plus courant des programmes qui trient — accepter les notes « supérieures ou égales à 10 » ne s'écrit pas « note $> 10$ », faute de quoi un élève ayant exactement 10 est refusé.",
      schema: legende(
        tableau({
          headers: ["condition", "son contraire"],
          rows: [
            { values: ["x ⩾ 5", "x < 5"] },
            { values: ["x > 5", "x ⩽ 5"] },
            { values: ["ET", "devient OU"] },
          ],
          highlight: { row: 0 },
          caption: "le bord change de camp",
        }),
        "Le symbole strict devient large, et le large devient strict."
      ),
      micros: ["algo_condition_complexe"],
    },
    {
      titre: "Un programme de calcul, et son expression",
      texte:
        "Généraliser un programme, c'est remplacer le nombre choisi par une lettre et écrire la suite des opérations en une seule expression. « Choisir $x$, multiplier par 5, enlever 2 » donne $5x - 2$. L'intérêt est immédiat : l'expression vaut pour TOUS les nombres à la fois, alors qu'une exécution ne dit rien de plus que le cas traité.",
      schema: legende(
        programme("Multiplier puis enlever", [
          { type: "ask", text: "Choisis un nombre" },
          { type: "set_variable", variable: "x", value: "réponse" },
          { type: "set_variable", variable: "x", value: "x × 5" },
          // ⚠️ `set_variable` et non `change_variable` : ce dernier rend
          // « ajouter -2 à x », alors que le texte de la propriété dit
          // « enlever 2 ». Le dessin doit dire ce que dit la phrase.
          { type: "set_variable", variable: "x", value: "x − 2" },
          { type: "say", text: "résultat" },
        ]),
        "Ce programme calcule $5x - 2$, quel que soit le nombre choisi."
      ),
      micros: ["algo_programme_calcul", "algo_generaliser"],
    },
    {
      titre: "L'ordre décide des parenthèses",
      texte:
        "C'est le piège central du chapitre, et il vient directement du calcul littéral. « Multiplier par 4 puis ajouter 3 » s'écrit $4x + 3$. Mais « ajouter 3 PUIS multiplier par 4 » s'écrit $4(x + 3)$, car c'est le résultat de l'addition qui est multiplié. Les deux programmes ne donnent pas les mêmes résultats : pour $x = 2$, le premier donne 11 et le second 20.",
      schema: legende(
        tableau({
          headers: ["le programme", "l'expression", "pour x = 2"],
          rows: [
            { values: ["×4 puis +3", "4x + 3", "11"] },
            { values: ["+3 puis ×4", "4(x + 3)", "20"] },
          ],
          highlight: { row: 1 },
          caption: "l'ordre change tout",
        }),
        "Une parenthèse oubliée ne change pas l'apparence : elle change le résultat."
      ),
      micros: ["algo_corriger", "algo_programme_calcul"],
    },
    {
      titre: "Remonter d'un résultat vers le nombre choisi",
      texte:
        "Un programme se lit aussi à l'envers. Si $5x + 2$ affiche 17, on cherche le nombre choisi en résolvant $5x + 2 = 17$, ce qui donne $x = 3$. Autre méthode, souvent plus rapide de tête : refaire les opérations inverses dans l'ordre inverse — retrancher 2, puis diviser par 5. Les deux chemins mènent au même nombre, et se contrôlent l'un l'autre.",
      schema: legende(
        tableau({
          headers: ["à l'endroit", "à l'envers"],
          rows: [
            { values: ["×5", "÷5"] },
            { values: ["+2", "−2"] },
            { values: ["ordre normal", "ordre inversé"] },
          ],
          caption: "on défait dans l'autre sens",
        }),
        "On commence par défaire la DERNIÈRE opération : ici on enlève 2 avant de diviser."
      ),
      micros: ["algo_programme_calcul"],
    },
    {
      titre: "Généraliser un motif qui grandit",
      texte:
        "Un motif construit avec des allumettes suit souvent une règle simple : chaque étape ajoute toujours le même nombre. Si le motif 1 en utilise 5, le motif 2 en utilise 8 et le motif 3 en utilise 11, l'écart constant vaut 3 : le motif $n$ en utilise donc $3n + 2$. Le nombre qui s'ajoute à chaque étape devient le coefficient de $n$, et ce qui reste est ce qu'il fallait au départ.",
      schema: legende(
        tableau({
          headers: ["motif", "allumettes", "écart"],
          rows: [
            { values: ["1", "5", "—"] },
            { values: ["2", "8", "+3"] },
            { values: ["3", "11", "+3"] },
            { values: ["n", "3n + 2", ""] },
          ],
          highlight: { row: 3 },
          caption: "l'écart devient le coefficient",
        }),
        "Contrôle : pour $n = 1$, $3 \\times 1 + 2 = 5$. La formule redonne bien le premier motif."
      ),
      micros: ["algo_generaliser"],
    },
  ],
  reel: {
    texte:
      "Un tableur est un algorithme déguisé : chaque cellule contient un programme de calcul, et les autres cellules lui fournissent ses variables. Un jeu vidéo empile des conditions — si la vie tombe à zéro, alors la partie s'arrête — et des boucles qui redessinent l'écran soixante fois par seconde. Mais l'usage le plus proche du collège est le plus banal : une facture d'électricité applique un programme de calcul à votre consommation, un abonnement de bus applique le sien au nombre de trajets. Savoir généraliser un programme en expression, c'est pouvoir vérifier une facture au lieu de la subir.",
  },
  historique: {
    texte:
      "Le mot « algorithme » vient d'un nom propre. Al-Khwârizmî, savant persan de la Maison de la sagesse à Bagdad, écrit vers 820 un traité de méthodes de résolution qui sera traduit en latin sous le titre « Algoritmi de numero indorum ». Le détail remarquable est que le même homme a donné son nom aux deux moitiés de cette fiche : le mot « algèbre » vient du titre d'un autre de ses ouvrages, « al-jabr », qui désigne l'opération consistant à faire passer un terme de l'autre côté d'une équation. Algorithme et algèbre ont donc la même origine, ce qui n'est pas un hasard : ce sont deux façons de décrire une suite d'opérations sans faire le calcul.",
  },
  formule: {
    contexte: "Le passage d'un programme de calcul à son expression",
    expression:
      "\\text{« choisir } x \\text{, ajouter } b \\text{, multiplier par } a \\text{ »} \\;\\longrightarrow\\; a(x + b)",
    legende:
      "⚠️ La parenthèse vient de l'ORDRE, pas de la formule. Si l'on multiplie d'abord et qu'on ajoute ensuite, la même paire de nombres donne $ax + b$, qui est une expression différente. Une seule question tranche : sur quoi porte la dernière opération — sur le nombre seul, ou sur tout ce qui précède ?",
    schema: legende(
      tableau(
        {
          headers: ["l'ordre des gestes", "l'expression"],
          rows: [
            { values: ["+ b puis × a", "a(x + b)"] },
            { values: ["× a puis + b", "ax + b"] },
            { values: ["× a puis × a", "a²x"] },
          ],
          caption: "la dernière opération porte sur tout",
        },
        "formule"
      ),
      "Deux programmes équivalents donnent le même résultat pour TOUT $x$ — pas seulement pour un."
    ),
  },
  methode: [
    {
      titre: "Exécuter un programme : le tableau d'exécution",
      texte:
        "Une ligne par étape, une colonne par variable. On y inscrit la valeur APRÈS chaque instruction. C'est long à écrire et cela ne se trompe jamais, alors que suivre un programme de tête échoue dès qu'une boucle dépasse trois tours.",
      micros: ["algo_variable_boucle"],
    },
    {
      titre: "Généraliser : remplacer le nombre par une lettre",
      texte:
        "On réécrit la suite des gestes en gardant $x$ tout du long, sans jamais calculer. À chaque étape, on se demande sur quoi porte l'opération : sur $x$ seul, ou sur tout ce qu'on a déjà obtenu ? La réponse décide des parenthèses.",
      micros: ["algo_generaliser"],
    },
    {
      titre: "Vérifier une généralisation sur un nombre",
      texte:
        "On exécute le programme sur une valeur simple, puis on calcule l'expression pour cette même valeur. Les deux doivent coïncider. ⚠️ Un seul essai ne prouve pas l'équivalence, mais un désaccord prouve l'erreur — et c'est ce qu'on cherche.",
      micros: ["algo_generaliser", "algo_corriger"],
    },
    {
      titre: "Chercher un bogue : les quatre suspects",
      texte:
        "Une variable non initialisée avant une boucle ; un test strict là où il fallait un test large ; un affichage placé avant le calcul ; et l'ordre des opérations qui inverse les parenthèses. La banque du coach ne pose pratiquement que ces quatre-là.",
      micros: ["algo_corriger"],
    },
    {
      titre: "Écrire une condition composée",
      texte:
        "ET exige les deux tests, OU se contente d'un seul. Pour être sûr, on teste trois nombres : un trop petit, un dans la cible, un trop grand. Si les trois réponses sont celles attendues, la condition est juste.",
      micros: ["algo_condition_complexe"],
    },
  ],
  usages: [
    {
      titre: "On me donne un programme et un nombre",
      detail:
        "J'exécute, étape par étape, dans un tableau d'exécution. Une ligne par instruction, la valeur après chacune.",
      micros: ["algo_variable_boucle", "algo_programme_calcul"],
    },
    {
      titre: "On me demande l'expression du programme",
      detail:
        "Je garde $x$ et je n'effectue aucun calcul. Je surveille l'ordre : la dernière opération porte sur tout ce qui précède.",
      micros: ["algo_generaliser"],
    },
    {
      titre: "On me donne le résultat et on cherche le nombre choisi",
      detail:
        "Je résous l'équation, ou je défais les opérations dans l'ordre inverse — les deux se contrôlent.",
      micros: ["algo_programme_calcul"],
    },
    {
      titre: "On me demande si deux programmes sont équivalents",
      detail:
        "J'écris les deux expressions et je les développe. Si elles se réduisent à la même, les programmes sont équivalents pour tout $x$.",
      micros: ["algo_corriger", "algo_generaliser"],
    },
    {
      titre: "Le programme contient une boucle et une condition",
      detail:
        "J'exécute d'abord toute la boucle dans un tableau, et je teste la condition SEULEMENT sur la valeur finale.",
      micros: ["algo_defi"],
    },
  ],
  exemples: [
    {
      titre: "Une boucle, puis un test",
      donnees:
        "La variable score vaut 0. On répète 4 fois : ajouter 7 à score. Puis, si score $\\geqslant$ 30, on affiche « réussi », sinon « raté ».",
      question: "Quel message s'affiche ?",
      solution:
        "On exécute d'abord la boucle en entier : partant de 0, quatre ajouts de 7 donnent 7, puis 14, puis 21, puis 28. La valeur finale est 28 — on peut aussi l'obtenir directement par $4 \\times 7 = 28$. On teste ENSUITE, et une seule fois : $28 \\geqslant 30$ est faux. Le message affiché est donc « raté ». ⚠️ L'erreur consiste à tester à chaque tour ; ici la condition vient après la boucle, pas dedans.",
      schema: legende(
        tableau(
          {
            headers: ["tour", "score"],
            rows: [
              { values: ["départ", "0"] },
              { values: ["1", "7"] },
              { values: ["2", "14"] },
              { values: ["3", "21"] },
              { values: ["4", "28"] },
            ],
            highlight: { row: 4 },
            caption: "on teste la valeur finale",
          },
          "exemple"
        ),
        "28 est inférieur à 30 : le message est « raté »."
      ),
      micros: ["algo_defi", "algo_variable_boucle"],
    },
    {
      titre: "Généraliser un programme",
      donnees: "On choisit un nombre, on lui ajoute 3, puis on multiplie le résultat par 2.",
      question: "Quelle expression généralise ce programme ?",
      solution:
        "On appelle $x$ le nombre choisi. Après l'addition, on a $x + 3$. La multiplication porte ensuite sur CE résultat, donc sur la somme entière : il faut des parenthèses, et l'expression est $2(x + 3)$. Écrire $2x + 3$ décrirait un autre programme, celui où l'on multiplie d'abord. Contrôle sur un nombre : pour $x = 5$, le programme donne $5 + 3 = 8$ puis $8 \\times 2 = 16$ ; et $2(5 + 3) = 2 \\times 8 = 16$. C'est cohérent, alors que $2 \\times 5 + 3$ donnerait 13.",
      micros: ["algo_generaliser"],
    },
    {
      titre: "Corriger un programme",
      donnees:
        "Un programme doit ajouter 3 à $x$ puis multiplier par 4. Il calcule $4x + 3$.",
      question: "Où est l'erreur, et comment la corriger ?",
      solution:
        "L'expression écrite correspond à l'ordre inverse : elle multiplie d'abord, puis ajoute. Or l'énoncé demande que la multiplication porte sur le résultat de l'addition. Il manque donc des parenthèses, et la bonne expression est $4(x + 3)$. On peut le vérifier sur un nombre : pour $x = 2$, le programme voulu donne $2 + 3 = 5$ puis $5 \\times 4 = 20$, tandis que $4 \\times 2 + 3$ donne 11. L'écart de 9 confirme que ce n'était pas un détail d'écriture.",
      micros: ["algo_corriger"],
    },
    {
      titre: "Le motif d'allumettes",
      donnees:
        "Un motif utilise 5 allumettes à l'étape 1, 8 à l'étape 2, et 11 à l'étape 3.",
      question: "Combien en faut-il pour l'étape 20 ?",
      solution:
        "On cherche d'abord l'écart entre deux étapes consécutives : $8 - 5 = 3$, et $11 - 8 = 3$. L'écart est constant et vaut 3, qui devient donc le coefficient de $n$. Reste à ajuster : $3 \\times 1 = 3$, alors que l'étape 1 en demande 5 — il manque 2. La formule est $3n + 2$. On la contrôle sur une autre étape que celle qui a servi : $3 \\times 3 + 2 = 11$, ce qui est bien le motif 3. Pour l'étape 20 : $3 \\times 20 + 2 = 62$ allumettes.",
      schema: legende(
        tableau(
          {
            headers: ["étape", "allumettes"],
            rows: [
              { values: ["1", "5"] },
              { values: ["2", "8"] },
              { values: ["3", "11"] },
              { values: ["20", "62"] },
            ],
            highlight: { row: 3 },
            caption: "3n + 2",
          },
          "exemple"
        ),
        "La formule évite de dessiner les vingt motifs."
      ),
      micros: ["algo_generaliser"],
    },
  ],
  pieges: [
    "Écrire $4x + 3$ pour « ajouter 3 puis multiplier par 4 ». La multiplication porte sur la somme : c'est $4(x + 3)$.",
    "Oublier d'initialiser une variable avant une boucle qui l'augmente : elle n'a alors aucune valeur de départ, et le total obtenu ne veut rien dire.",
    "Tester « note $> 10$ » pour accepter les notes supérieures OU ÉGALES à 10 : l'élève ayant exactement 10 est refusé. Il faut $\\geqslant$.",
    "Croire que « mettre $a$ à $b$ » échange les deux variables. La valeur va de $b$ vers $a$ ; $b$ ne change pas, et l'ancienne valeur de $a$ est perdue.",
    "Confondre ET et OU. Avec ET, un seul test raté suffit à tout invalider ; avec OU, un seul test réussi suffit à tout valider.",
    "Placer l'affichage du résultat avant le calcul : le programme montre alors une valeur qui n'a pas encore été mise à jour.",
    "Vérifier une généralisation sur le nombre qui a servi à la trouver : cela ne prouve rien. Il faut en essayer un autre.",
  ],
  aRetenir: [
    "Un programme de calcul se généralise en une expression littérale.",
    "L'ordre des gestes décide des parenthèses : $a(x+b)$ n'est pas $ax + b$.",
    "« Mettre $a$ à $b$ » copie $b$ dans $a$ : $b$ ne bouge pas, l'ancien $a$ est perdu.",
    "Une variable augmentée dans une boucle doit être initialisée avant.",
    "ET exige les deux conditions ; OU se contente d'une seule.",
    "Le contraire de $x \\geqslant 5$ est $x < 5$ : le bord change de camp.",
    "Deux programmes sont équivalents s'ils donnent le même résultat pour TOUT $x$.",
  ],
  entrainement: [
    {
      question:
        "La variable $a$ vaut 3 et $b$ vaut 7. On exécute « mettre $a$ à $b$ ». Que valent $a$ et $b$ ensuite ?",
      correction:
        "$a$ vaut 7 et $b$ vaut toujours 7. La valeur est copiée de $b$ vers $a$ ; l'ancienne valeur de $a$, qui était 3, est perdue.",
      micros: ["algo_variable_boucle"],
    },
    {
      question:
        "La variable total vaut 0. On répète 6 fois : ajouter 4 à total. Quelle est la valeur finale ?",
      correction:
        "Six ajouts de 4 à partir de 0 donnent $6 \\times 4 = 24$. On peut le vérifier en déroulant : 4, 8, 12, 16, 20, 24.",
      micros: ["algo_variable_boucle"],
    },
    {
      question: "La variable $x$ vaut 12. La condition « $x > 0$ ET $x < 10$ » est-elle vraie ?",
      correction:
        "Non. Le premier test réussit — 12 est bien positif — mais le second échoue, car 12 n'est pas inférieur à 10. Avec ET, un seul échec suffit à rendre l'ensemble faux.",
      micros: ["algo_condition_complexe"],
    },
    {
      question: "Quel est le contraire de la condition « $x \\geqslant 5$ » ?",
      correction:
        "C'est « $x < 5$ ». Le symbole large devient strict, de sorte que la valeur 5 change de camp : elle satisfaisait la première condition, elle ne satisfait pas la seconde.",
      micros: ["algo_condition_complexe"],
    },
    {
      question:
        "On choisit un nombre, on le multiplie par 5, puis on enlève 2. Quelle expression correspond ?",
      correction:
        "$5x - 2$. La multiplication vient en premier et porte sur le nombre seul : aucune parenthèse n'est nécessaire.",
      micros: ["algo_generaliser", "algo_programme_calcul"],
    },
    {
      question:
        "On choisit un nombre, on lui ajoute 4, puis on multiplie par 3. Quelle expression correspond ?",
      correction:
        "$3(x + 4)$. La multiplication porte cette fois sur le résultat de l'addition, donc les parenthèses sont obligatoires. Pour $x = 1$ : le programme donne 15, et $3(1+4) = 15$.",
      micros: ["algo_generaliser"],
    },
    {
      question: "Un programme calcule $3x + 4$. Le résultat affiché est 19. Quel nombre avait-on choisi ?",
      correction:
        "On résout $3x + 4 = 19$, donc $3x = 15$, donc $x = 5$. Par les opérations inverses : on enlève 4, ce qui donne 15, puis on divise par 3, ce qui donne 5.",
      micros: ["algo_programme_calcul"],
    },
    {
      question:
        "Un programme doit additionner des nombres, mais oublie d'initialiser le total. Quel est le problème ?",
      correction:
        "Le total n'a pas de valeur de départ : la première addition n'a rien à quoi s'ajouter. Le résultat est soit une erreur, soit une valeur laissée par une exécution précédente — donc imprévisible.",
      micros: ["algo_corriger"],
    },
    {
      question:
        "Un motif utilise $2n + 5$ allumettes à l'étape $n$. Combien en faut-il à l'étape 12 ?",
      correction:
        "On remplace $n$ par 12 : $2 \\times 12 + 5 = 24 + 5 = 29$ allumettes.",
      micros: ["algo_generaliser"],
    },
    {
      question:
        "Deux programmes de calcul donnent le même résultat pour toutes les valeurs de $x$. Comment dit-on ?",
      correction:
        "On dit qu'ils sont ÉQUIVALENTS. Cela se prouve en développant les deux expressions : si elles se réduisent à la même, l'égalité vaut pour tout $x$ — un seul nombre commun ne suffirait pas.",
      micros: ["algo_corriger", "algo_generaliser"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=algo_programmation",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres — ce qui est de
// toute façon la bonne façon de projeter, puisque le prof LIT la diapositive à
// voix haute.

export const slidesAlgorithmique3e: ClasseSlide[] = [
  {
    titre: "Un programme est une expression",
    badge: "Ce qu'on va comprendre",
    section: {
      type: "objectif",
      phrase: "Choisis un nombre, multiplie par quatre, ajoute un",
      sousPhrase:
        "C'est un programme. Mais c'est aussi une expression littérale, quatre x plus un, et les deux disent exactement la même chose.",
      encadre: {
        titre: "Le va-et-vient du chapitre",
        texte:
          "Exécuter, c'est appliquer les gestes à un nombre précis. Généraliser, c'est les écrire une fois pour toutes avec une lettre. La machine fait le premier, l'algèbre fait le second.",
      },
    },
  },
  {
    titre: "Trois briques suffisent",
    badge: "Le vocabulaire",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Une variable",
          texte:
            "Une boite nommée qui retient une valeur, et qui peut en changer en cours de route.",
        },
        {
          titre: "Une boucle",
          texte:
            "Elle répète un bloc d'instructions un nombre donné de fois, sans qu'on ait à les récrire.",
        },
        {
          titre: "Une condition",
          texte:
            "Elle choisit entre deux suites d'instructions, selon qu'un test est vrai ou faux.",
        },
      ],
    },
  },
  {
    titre: "Mettre a à b",
    badge: "Le sens de l'affectation",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on croit",
        contenu:
          "Que les deux variables s'échangent leurs valeurs, comme dans une égalité qui marcherait dans les deux sens.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui se passe",
        contenu:
          "La valeur va de b vers a, à sens unique. Si a valait trois et b sept, alors a vaut sept, b vaut toujours sept, et l'ancien trois est définitivement perdu.",
      },
    },
  },
  {
    titre: "Suivre une boucle sans se tromper",
    badge: "Le tableau d'exécution",
    section: {
      type: "etapes",
      etapes: [
        "Je trace un tableau : une ligne par étape, une colonne par variable.",
        "J'écris d'abord la valeur de départ. Une variable qu'on augmente doit toujours être initialisée.",
        "J'inscris ensuite la valeur APRÈS chaque tour de boucle, une ligne à la fois.",
        "La dernière ligne donne le résultat. C'est long, et cela ne se trompe jamais.",
      ],
    },
  },
  {
    titre: "ET, ou bien OU",
    badge: "Les conditions composées",
    teinte: "essentiel",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Avec ET",
        contenu:
          "Les deux tests doivent réussir en même temps. Un seul échec suffit à rendre l'ensemble faux. x plus grand que zéro ET plus petit que dix : seuls les nombres du milieu passent.",
      },
      droite: {
        variante: "info",
        titre: "Avec OU",
        contenu:
          "Un seul test réussi suffit. x plus petit que zéro OU plus grand que dix : cette fois ce sont les nombres des extrémités qui passent, et pas ceux du milieu.",
      },
    },
  },
  {
    titre: "Le piège central du chapitre",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on écrit trop vite",
        contenu:
          "Ajouter trois puis multiplier par quatre : quatre x plus trois. On a recopié les nombres dans l'ordre où on les a lus.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui est vrai",
        contenu:
          "Quatre fois, parenthèse, x plus trois. La multiplication porte sur le résultat de l'addition. Pour x égale deux : le bon programme donne vingt, l'autre onze.",
      },
    },
  },
  {
    titre: "Remonter au nombre choisi",
    badge: "Le sens inverse",
    section: {
      type: "etapes",
      etapes: [
        "Je regarde la DERNIÈRE opération faite par le programme.",
        "Je la défais en premier : si le programme ajoutait deux, je retranche deux.",
        "Je remonte ainsi jusqu'au début, en inversant chaque opération.",
        "Autre chemin possible : écrire l'équation et la résoudre. Les deux méthodes se contrôlent l'une l'autre.",
      ],
    },
  },
  {
    titre: "Les quatre bogues classiques",
    badge: "Corriger un programme",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "La variable oubliée",
          texte:
            "Une variable augmentée dans une boucle mais jamais initialisée : elle n'a pas de valeur de départ.",
        },
        {
          titre: "Le test trop strict",
          texte:
            "Accepter les notes supérieures ou égales à dix ne s'écrit pas « plus grand que dix ». L'élève ayant exactement dix serait refusé.",
        },
        {
          titre: "L'ordre inversé",
          texte:
            "Les parenthèses manquantes, qui font porter la multiplication sur le mauvais morceau. C'est le bogue le plus fréquent.",
        },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce:
        "Un motif d'allumettes en utilise cinq à l'étape un, huit à l'étape deux, et onze à l'étape trois.",
      question: "Combien en faut-il à l'étape vingt ?",
      correction:
        "On cherche d'abord l'écart entre deux étapes qui se suivent. Huit moins cinq font trois ; onze moins huit font trois également. L'écart est donc constant et vaut trois : c'est lui qui devient le coefficient de n. Reste à ajuster. Trois fois un font trois, alors que l'étape un en demande cinq : il manque deux. La formule est donc trois n plus deux. On la contrôle sur une AUTRE étape que celle qui a servi à la trouver : trois fois trois plus deux font onze, ce qui est bien le motif trois. Pour l'étape vingt : trois fois vingt plus deux, soit soixante-deux allumettes. Et l'on n'a rien dessiné.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce:
        "La variable score vaut zéro. On répète quatre fois : ajouter sept à score. Puis, si score est supérieur ou égal à trente, on affiche « réussi », sinon « raté ».",
      question: "Quel message s'affiche ?",
      indice: "Exécutez toute la boucle AVANT de regarder la condition.",
      correction:
        "On déroule d'abord la boucle en entier : partant de zéro, quatre ajouts de sept donnent sept, puis quatorze, puis vingt et un, puis vingt-huit. On peut aussi aller au but : quatre fois sept font vingt-huit. C'est SEULEMENT ensuite qu'on teste, et une seule fois. Vingt-huit est-il supérieur ou égal à trente ? Non. Le message affiché est donc « raté ». L'erreur habituelle est de tester à chaque tour : ici la condition est écrite après la boucle, pas à l'intérieur.",
    },
  },
];
