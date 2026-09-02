// ─── Fiche de cours : calcul littéral (3e) ────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/calcul_litteral.bank.ts, notionId `litteral_calcul`, 60 items).
//
// ⭐⭐ LA BANQUE EST BÂTIE SUR DES ERREURS D'ÉLÈVES, ET LA FICHE AUSSI. Sur ses
// 60 items, SEPT posent la même question : « un élève écrit ceci, a-t-il
// raison ? ». Les sept fausses égalités sont toujours les mêmes, et ce sont
// exactement celles qu'on lit sur les copies :
//     5x = 5 + x          ·  3x + 2 = 5x
//     4(x + 3) = 4x + 3   ·  5x + 10 = 5(x + 10)
//     (x + 2)² = x² + 4   ·  2x + 3x² = 5x²
//     (x + b)² = x² + b²  (la même, en lettres)
// 👉 La rubrique « Pièges » n'a donc pas été imaginée : elle est RECOPIÉE de la
// banque. Chacun de ses sept points est une question que le coach pose vraiment,
// et un élève qui lit la fiche reconnaîtra la question quand elle tombera.
//
// ⭐⭐ CE QUE CETTE FICHE APPORTE QUE LA 4e N'A PAS. La 4e possède déjà une
// fiche `litteral-distributivite`, et elle couvre la distributivité simple, la
// double, et la réduction. Écrire ici un second cours sur les mêmes gestes ne
// servirait personne. Mesuré : les micros ne se croisent pas
// (`litteral_distributivite_*` en 4e, `litteral_*` en 3e), mais les SUJETS, si.
// Deux choses appartiennent en propre à la 3e, et ce sont les deux qui portent
// la fiche :
//   · LA DOUBLE DISTRIBUTIVITÉ ET LA DIFFÉRENCE DE DEUX CARRÉS ;
//   · L'ARTICULATION DES TROIS VERBES. `litteral_defi` demande littéralement
//     « explique la différence entre développer, réduire et factoriser ». Un
//     élève de 3e sait faire les trois gestes séparément et ne sait pas lequel
//     l'énoncé lui demande. C'est le fil de la fiche.
//
// ⭐ LES 60 ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE — la règle du 31/08, née de
// l'arbre de probabilités inventé en 4e :
//   litteral_comprendre → 3x veut dire 3 × x ; le marché et ses fruits à x €
//   litteral_substituer → remplacer, et les parenthèses des nombres négatifs
//   litteral_reduire    → les termes semblables, en x et en y
//   litteral_developper → simple distributivité, puis double
//   litteral_factoriser → le facteur commun, y compris en x²
//   litteral_identite   → développer (x ± b)², factoriser x² − b²
//   litteral_defi       → « vraie pour tout x ? », et les trois verbes
//
// ⛔⛔ CE QUE CETTE FICHE N'ENSEIGNE PAS : $(a+b)^2 = a^2 + 2ab + b^2$ NI SA
// JUMELLE EN MOINS, comme FORMULES. Une première version les posait toutes les
// trois en « identités remarquables » ; Frédéric a corrigé — « (x + 3)² =
// (x+3)(x+3), la formule a² + 2ab + b² n'est pas au programme, il n'y a que
// (a+b)(a−b) = a² − b² ». Vérifié dans les deux sources du dépôt :
//   · LA BANQUE NE DEMANDE JAMAIS LA FORMULE. `litteral_identite` demande de
//     DÉVELOPPER (x+3)², (x−5)², (x±b)² — tous faisables par double
//     distributivité — et de FACTORISER seulement x² − b². La réponse attendue
//     pour (x+3)² est « x² + 6x + 9 », c'est-à-dire le RÉSULTAT, pas l'égalité.
//   · LE DÉPÔT RANGE DÉJÀ LA FORMULE EN SECONDE :
//     `lib/calcul-rapide/data/seconde/calculs.templates.ts` s'annonce comme
//     « les automatismes de Seconde du BO : identités remarquables de tête », et
//     y appelle l'oubli du double produit « l'erreur la plus fréquente de la
//     Seconde ».
// 👉 Un carré se développe donc ICI en écrivant le produit en entier. C'est
// trois secondes de plus et cela ne se trompe jamais, alors qu'une formule mal
// mémorisée fait perdre le terme du milieu — l'erreur que la banque interroge.
// ⚠️ RESTE UNE INCOHÉRENCE À TRANCHER, hors de cette fiche :
// `lib/coach-brevet/banks/algebre.bank.ts` donne encore « (a + b)² = a² + 2ab +
// b² » en INDICE. À signaler à Frédéric plutôt qu'à corriger seul.
//
// ⚠️ LE CANVAS `algebre` NE SE MESURE PAS. Il rend du HTML et non un <svg> :
// `scripts/mesurer-fiches.mjs` ne le voit pas, et aucune de ses alertes ne le
// concerne. Il se contrôle à l'œil, à 375 px.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut porter du LaTeX. Les libellés
 * À L'INTÉRIEUR du dessin restent en écriture simple — ils sont tracés en
 * <text> SVG, où le LaTeX s'afficherait en clair à l'élève.
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
 * La barre partagée en parts.
 * ⭐ C'est le seul dessin qui rende VISIBLE la réduction : deux parts de même
 * nature se collent, deux parts de natures différentes ne se collent pas. La
 * règle « on n'additionne que les termes semblables » cesse d'être une consigne
 * pour devenir une évidence de longueur.
 * ⚠️ Les libellés sont en écriture simple : ils sont tracés en <text> SVG, où
 * le LaTeX resterait affiché en clair.
 *
 * ⛔⛔ ET IL NE FAUT JAMAIS Y MÊLER UN TERME EN x ET UNE CONSTANTE. Mesuré le
 * 02/09/2026 : le canvas donne à chaque part une longueur PROPORTIONNELLE à sa
 * valeur, lue par `parseFloat`. Une barre « 3x | 2x | 12 » devient donc 3, 2 et
 * 12 unités — le dessin affirme que 12 est six fois plus long que 2x, ce qui
 * est faux dès que x dépasse 6. Le défaut s'est signalé par un chevauchement
 * d'étiquettes (la part « 2x », large de 20 unités sur 200, ne pouvait plus
 * porter son texte), mais le chevauchement n'était que le symptôme : le dessin
 * contredisait son propre énoncé.
 * 👉 Le canvas reste juste tant que toutes les parts sont de MÊME NATURE :
 * « 3x | 2x » vaut bien une longueur et demie contre une, pour tout x positif.
 * L'exemple qui mêlait les deux est passé à un tableau, qui ne prétend rien sur
 * les longueurs.
 */
const barre = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "schema_barre",
        size: { width: bloc === "exemple" ? 200 : 222, height: 190 },
        ...data,
      } as never
    }
  />
);

export const ficheCalculLitteral3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "litteral-calcul",
  titre: "Calcul littéral : développer, réduire, factoriser",
  accroche:
    "Au marché, un fruit coûte 3 € et vous en prenez $x$ : le total s'écrit $3x$, sans qu'on ait besoin de savoir combien vous en achetez. C'est tout l'intérêt d'une lettre — elle permet de calculer AVANT de connaître le nombre. En troisième, les gestes de quatrième se consolident, et deux choses s'ajoutent : la double distributivité, qui fait se rencontrer deux parenthèses, et une égalité — $(a+b)(a-b) = a^2 - b^2$ — sans laquelle certaines expressions ne se factoriseraient pas du tout.",
  identite: [
    { label: "Les trois verbes", valeur: "Développer enlève les parenthèses · Réduire regroupe · Factoriser les remet" },
    { label: "L'outil neuf de la 3e", valeur: "La double distributivité — et $(a+b)(a-b) = a^2 - b^2$" },
    { label: "Le piège", valeur: "$3x + 2$ ne se réduit pas : $x$ et $1$ ne sont pas de même nature" },
  ],
  definition: {
    texte:
      "Une expression littérale est un calcul où une ou plusieurs lettres remplacent des nombres inconnus ou variables. L'écriture $3x$ signifie $3 \\times x$ — le signe de multiplication est sous-entendu, et lui seul. Trois gestes s'appliquent à une telle expression : DÉVELOPPER, c'est-à-dire transformer un produit en somme ; RÉDUIRE, regrouper ce qui est de même nature ; FACTORISER, transformer une somme en produit. Développer et factoriser sont exactement inverses l'un de l'autre. Un carré n'est pas un cas à part : $(x+3)^2$ EST le produit $(x+3)(x+3)$, et se développe comme n'importe quel autre.",
  },
  figure: {
    schema: (
      <CanvasRenderer
        figure={
          {
            kind: "algebre",
            theme: "margouillat",
            groupesCaches: 3,
            objetsVisibles: 5,
            symbole: "x",
            expression: "3x + 5",
            phrase: "Trois boites identiques, et cinq margouillats dehors.",
          } as never
        }
      />
    ),
    legende:
      "Chaque boîte contient le même nombre de margouillats, appelé $x$. Le total s'écrit $3x + 5$ — et cette écriture est juste quel que soit ce nombre.",
  },
  proprietes: [
    {
      titre: "La lettre cache un nombre, et la multiplication est sous-entendue",
      texte:
        "Dans $3x + 5$, la lettre $x$ désigne un nombre qu'on ne connaît pas encore, ou qui peut changer. L'absence de signe entre le 3 et le $x$ signifie une MULTIPLICATION : $3x = 3 \\times x$. C'est la source de la toute première erreur du chapitre, car rien à l'écrit ne distingue « trois fois » de « trois plus ».",
      schema: legende(
        tableau({
          headers: ["on écrit", "cela veut dire"],
          rows: [
            { values: ["3x", "3 × x"] },
            { values: ["x²", "x × x"] },
            { values: ["3 + x", "3 plus x"] },
          ],
          highlight: { row: 0 },
          caption: "le signe absent est un ×",
        }),
        "Aucun signe entre un nombre et une lettre : c'est toujours une multiplication."
      ),
      micros: ["litteral_comprendre"],
    },
    {
      titre: "Remplacer une lettre : les parenthèses ne sont pas facultatives",
      texte:
        "Calculer la valeur d'une expression, c'est remplacer la lettre par un nombre, puis calculer en respectant les priorités. Si le nombre est négatif, il s'écrit ENTRE PARENTHÈSES : pour $2a - 5$ avec $a = -3$, on écrit $2 \\times (-3) - 5 = -6 - 5 = -11$. Sans les parenthèses, l'écriture $2 \\times -3$ n'a pas de sens et le signe se perd.",
      schema: legende(
        tableau({
          headers: ["expression", "pour", "valeur"],
          rows: [
            { values: ["3x + 2", "x = 4", "14"] },
            { values: ["2a − 5", "a = −3", "−11"] },
            { values: ["4(x + 1)", "x = 2", "12"] },
          ],
          caption: "on remplace, puis on calcule",
        }),
        "La lettre disparaît, un nombre prend sa place — et le résultat dépend de ce nombre."
      ),
      micros: ["litteral_substituer"],
    },
    {
      titre: "Réduire : on n'additionne que ce qui est de même nature",
      texte:
        "Deux termes sont semblables lorsqu'ils portent la MÊME lettre à la MÊME puissance. On peut alors ajouter leurs coefficients : $3x + 2x = 5x$. En revanche $3x + 2$ ne se réduit pas, car un $x$ et une unité ne sont pas de même nature — pas plus que $2x$ et $3x^2$.",
      schema: legende(
        barre({
          title: "3x + 2x se regroupe",
          total: "5x",
          parts: [
            { label: "3x", value: "3x" },
            { label: "2x", value: "2x" },
          ],
          questionLabel: "3x + 2x = 5x",
        }),
        "Trois longueurs $x$ plus deux longueurs $x$ font cinq longueurs $x$."
      ),
      micros: ["litteral_reduire"],
    },
    {
      titre: "Développer : chaque terme de l'intérieur, une fois chacun",
      texte:
        "Développer $3(x + 4)$, c'est multiplier le 3 par CHAQUE terme entre parenthèses : $3 \\times x + 3 \\times 4 = 3x + 12$. Oublier le second terme est l'erreur la plus fréquente du chapitre. C'est la distributivité SIMPLE : un seul facteur, une seule parenthèse.",
      schema: legende(
        barre({
          title: "3 fois (x + 4)",
          total: "3x + 12",
          parts: [
            { label: "x + 4", value: "x + 4" },
            { label: "x + 4", value: "x + 4" },
            { label: "x + 4", value: "x + 4" },
          ],
          questionLabel: "3 fois (x + 4) = 3x + 12",
        }),
        "Le 3 s'applique au paquet entier, donc à ses deux morceaux."
      ),
      micros: ["litteral_developper"],
    },
    {
      titre: "La double distributivité, et les carrés",
      texte:
        "Quand DEUX parenthèses se multiplient, chaque terme de la première rencontre chaque terme de la seconde : $(2x+1)(x+3)$ donne exactement quatre produits — $2x^2$, $6x$, $x$ et $3$ — que l'on réduit en $2x^2 + 7x + 3$. Un carré se traite pareil, car $(x+3)^2$ signifie $(x+3)(x+3)$ : quatre produits encore, dont deux identiques, d'où $x^2 + 6x + 9$. Écrire le produit en entier avant de calculer est le seul moyen sûr de ne pas perdre le terme du milieu.",
      schema: legende(
        tableau({
          headers: ["×", "x", "+ 3"],
          rows: [
            { values: ["x", "x²", "3x"] },
            { values: ["+ 3", "3x", "9"] },
          ],
          caption: "(x + 3)² : quatre cases",
        }),
        "Les deux cases $3x$ se regroupent : c'est de là que vient le $6x$ que l'on oublie."
      ),
      micros: ["litteral_developper", "litteral_identite"],
    },
    {
      titre: "Factoriser : reconnaître ce qui est commun",
      texte:
        "Factoriser, c'est le chemin inverse : on cherche un facteur présent dans TOUS les termes et on le met devant une parenthèse. Dans $3x + 12$, le 3 est commun — car $12 = 3 \\times 4$ — donc $3x + 12 = 3(x + 4)$. Dans $5x^2 + 3x$, c'est le $x$ qui est commun : $x(5x + 3)$.",
      schema: legende(
        tableau({
          headers: ["somme", "commun", "produit"],
          rows: [
            { values: ["3x + 12", "3", "3(x + 4)"] },
            { values: ["5x + 10", "5", "5(x + 2)"] },
            { values: ["5x² + 3x", "x", "x(5x + 3)"] },
          ],
          caption: "de la somme au produit",
        }),
        "Le contrôle est immédiat : en développant, on doit retomber sur la somme de départ."
      ),
      micros: ["litteral_factoriser"],
    },
    {
      titre: "La différence de deux carrés",
      texte:
        "Une égalité mérite d'être connue par cœur, parce qu'elle seule permet de factoriser une expression qui n'a AUCUN facteur commun : $(a+b)(a-b) = a^2 - b^2$. On la vérifie en développant — $a^2 - ab + ab - b^2$ — où les deux termes du milieu s'annulent, ce qui explique qu'il n'en reste aucun. Lue de gauche à droite elle développe ; lue de droite à gauche elle factorise, et c'est ce second sens qui sert le plus.",
      schema: legende(
        tableau({
          headers: ["à factoriser", "on reconnaît", "résultat"],
          rows: [
            { values: ["x² − 36", "x² − 6²", "(x + 6)(x − 6)"] },
            { values: ["x² − 49", "x² − 7²", "(x + 7)(x − 7)"] },
            { values: ["x² + 36", "une SOMME", "impossible"] },
          ],
          highlight: { row: 2 },
          caption: "une différence, jamais une somme",
        }),
        "Une différence de deux carrés se factorise toujours ; une somme de deux carrés, jamais."
      ),
      micros: ["litteral_identite"],
    },
    {
      titre: "Trois verbes, trois directions",
      texte:
        "Développer transforme un PRODUIT en SOMME. Factoriser fait l'inverse, d'une somme vers un produit. Réduire ne change pas de sens : il range, en regroupant les termes semblables, et accompagne le plus souvent un développement. Savoir lequel l'énoncé demande vaut la moitié de l'exercice.",
      schema: legende(
        tableau({
          headers: ["verbe", "de", "vers"],
          rows: [
            { values: ["développer", "un produit", "une somme"] },
            { values: ["factoriser", "une somme", "un produit"] },
            { values: ["réduire", "une somme", "la même, rangée"] },
          ],
          caption: "développer et factoriser sont inverses",
        }),
        "Une expression factorisée est un PRODUIT ; une expression développée est une SOMME."
      ),
      micros: ["litteral_defi"],
    },
  ],
  reel: {
    texte:
      "Toute formule de tarif, d'aire ou de programme est une expression littérale. Au marché de Saint-Paul, $x$ fruits à 3 € font $3x$ euros, et l'écriture vaut pour un client comme pour cent. Mais l'usage le plus quotidien est ailleurs : dans un tableur, une case qui contient une formule EST une expression littérale, et les autres cases lui donnent ses lettres. Développer et factoriser servent alors très concrètement — une expression factorisée se calcule souvent en moins d'opérations, et c'est ce qui rend un tableau rapide plutôt que lent.",
  },
  historique: {
    texte:
      "L'habitude de noter les inconnues par les dernières lettres de l'alphabet — $x$, $y$, $z$ — et les nombres connus par les premières — $a$, $b$, $c$ — vient de René Descartes, en 1637, dans « La Géométrie ». Elle n'a rien d'évident : avant lui, les mathématiciens écrivaient leurs équations en phrases, et un problème du second degré tenait en un paragraphe. Le calcul littéral n'a pas rendu les mathématiques plus difficiles, il les a rendues COURTES — et c'est en devenant courtes qu'elles sont devenues manipulables.",
  },
  formule: {
    contexte: "La seule identité à connaître par cœur en troisième",
    expression: "(a+b)(a-b) = a^2 - b^2",
    legende:
      "Lue de gauche à droite elle développe ; lue de droite à gauche elle factorise, et c'est ce sens-là qui sert. Reconnaître $x^2 - 49$ comme $x^2 - 7^2$ donne immédiatement $(x+7)(x-7)$, sans aucun calcul — et rien d'autre ne permettait de factoriser cette expression.",
    schema: legende(
      tableau(
        {
          headers: ["×", "a", "− b"],
          rows: [
            { values: ["a", "a²", "− ab"] },
            { values: ["+ b", "+ ab", "− b²"] },
          ],
          caption: "− ab et + ab s'annulent",
        },
        "formule"
      ),
      "Les deux produits croisés s'annulent : c'est pour cela qu'il ne reste pas de terme du milieu."
    ),
  },
  methode: [
    {
      titre: "Repérer le verbe avant de commencer",
      texte:
        "L'énoncé dit « développer », « factoriser » ou « réduire ». Le résultat attendu n'est pas de la même forme : un produit pour une factorisation, une somme pour un développement. Une réponse de la mauvaise forme est fausse, même si le calcul est juste.",
      micros: ["litteral_defi"],
    },
    {
      titre: "Développer : compter ses produits",
      texte:
        "Avec une parenthèse, il y a autant de produits que de termes à l'intérieur. Avec deux parenthèses de deux termes chacune, il y en a exactement QUATRE. Compter avant de calculer évite l'oubli, qui est l'erreur dominante.",
      micros: ["litteral_developper"],
    },
    {
      titre: "Factoriser : chercher le commun, y compris la lettre",
      texte:
        "On regarde d'abord les nombres — quel diviseur ont-ils tous ? — puis les lettres : si $x$ figure dans chaque terme, il sort aussi. Puis on développe mentalement pour vérifier qu'on retombe sur l'expression de départ.",
      micros: ["litteral_factoriser"],
    },
    {
      titre: "Un carré : on écrit le produit en entier",
      texte:
        "Devant $(x+3)^2$, on n'a aucune formule à retrouver : on récrit $(x+3)(x+3)$, puis on développe les quatre produits. C'est plus long de trois secondes, et cela ne se trompe jamais — alors qu'une formule mal mémorisée fait perdre le terme du milieu.",
      micros: ["litteral_identite"],
    },
    {
      titre: "Vérifier sur un nombre",
      texte:
        "Une égalité littérale doit être vraie POUR TOUT $x$. Si l'on doute, on choisit une valeur simple — $x = 1$ ou $x = 2$ — et on calcule les deux membres. Deux résultats différents prouvent l'erreur ; deux résultats égaux ne prouvent rien à eux seuls, mais rassurent.",
      micros: ["litteral_defi", "litteral_substituer"],
    },
  ],
  usages: [
    {
      titre: "On me demande de développer",
      detail:
        "Je pars d'un produit et je dois obtenir une somme. Je multiplie chaque terme, sans en oublier, puis je réduis.",
      micros: ["litteral_developper"],
    },
    {
      titre: "On me demande de factoriser",
      detail:
        "Je pars d'une somme et je dois obtenir un produit. Je cherche un facteur commun ; s'il n'y en a pas, je regarde si c'est une identité remarquable.",
      micros: ["litteral_factoriser", "litteral_identite"],
    },
    {
      titre: "On me demande de réduire",
      detail:
        "Je regroupe les termes semblables : les $x^2$ ensemble, les $x$ ensemble, les nombres ensemble. Rien d'autre ne se regroupe.",
      micros: ["litteral_reduire"],
    },
    {
      titre: "On me donne une valeur pour la lettre",
      detail:
        "Je remplace, avec des parenthèses si le nombre est négatif, et je calcule dans l'ordre des priorités.",
      micros: ["litteral_substituer"],
    },
    {
      titre: "On me demande si une égalité est vraie pour tout $x$",
      detail:
        "Je développe les deux membres. S'ils donnent la même expression réduite, l'égalité est vraie partout ; sinon, un contre-exemple suffit à conclure.",
      micros: ["litteral_defi"],
    },
  ],
  exemples: [
    {
      titre: "Développer, puis réduire",
      donnees: "L'expression $A = 3(x + 4) + 2x$.",
      question: "Développer puis réduire $A$.",
      solution:
        "On développe d'abord : le 3 multiplie les DEUX termes, donc $3(x+4) = 3x + 12$. L'expression devient $3x + 12 + 2x$. On réduit ensuite en regroupant les termes semblables : $3x$ et $2x$ sont de même nature et donnent $5x$ ; le 12 reste seul, car il n'est semblable à rien. Donc $A = 5x + 12$. Contrôle sur une valeur : pour $x = 1$, l'expression de départ vaut $3 \\times 5 + 2 = 17$, et $5 \\times 1 + 12 = 17$. C'est cohérent.",
      schema: legende(
        tableau(
          {
            headers: ["étape", "expression"],
            rows: [
              { values: ["départ", "3(x + 4) + 2x"] },
              { values: ["développée", "3x + 12 + 2x"] },
              { values: ["réduite", "5x + 12"] },
            ],
            highlight: { row: 2 },
            caption: "développer, puis réduire",
          },
          "exemple"
        ),
        "On ne regroupe que ce qui est de même nature : le 12 reste seul."
      ),
      micros: ["litteral_developper", "litteral_reduire"],
    },
    {
      titre: "La double distributivité",
      donnees: "L'expression $B = (2x + 1)(x + 3)$.",
      question: "Développer et réduire $B$.",
      solution:
        "Chaque terme de la première parenthèse rencontre chaque terme de la seconde : cela fait exactement quatre produits. $2x \\times x = 2x^2$ ; $2x \\times 3 = 6x$ ; $1 \\times x = x$ ; $1 \\times 3 = 3$. On obtient $2x^2 + 6x + x + 3$, puis on réduit les deux termes en $x$ : $B = 2x^2 + 7x + 3$. Le $x^2$ et le 3 restent seuls, faute de semblable.",
      micros: ["litteral_developper"],
    },
    {
      titre: "Un carré, et une différence de carrés",
      donnees: "Les expressions $C = (x + 5)^2$ et $D = x^2 - 36$.",
      question: "Développer $C$, factoriser $D$.",
      solution:
        "Pour $C$, on récrit d'abord le carré comme un produit : $(x+5)(x+5)$. Les quatre produits sont $x^2$, $5x$, $5x$ et $25$ ; les deux termes du milieu sont identiques et se regroupent, donc $C = x^2 + 10x + 25$. Écrire $x^2 + 25$ serait faux, et c'est exactement ce que l'on évite en écrivant le produit en entier. Pour $D$, aucun facteur n'est commun aux deux termes — mais $36 = 6^2$, donc l'expression est une différence de deux carrés : $D = (x + 6)(x - 6)$. Contrôle par développement : $x^2 - 6x + 6x - 36 = x^2 - 36$. Les deux termes du milieu s'annulent ici, au lieu de se regrouper : c'est toute la différence entre les deux calculs.",
      micros: ["litteral_identite", "litteral_factoriser"],
    },
    {
      titre: "L'égalité est-elle vraie pour tout $x$ ?",
      donnees: "Un élève affirme que $3(x + 2)$ et $3x + 5$ sont égales quel que soit $x$.",
      question: "A-t-il raison ?",
      solution:
        "On développe le premier membre : $3(x+2) = 3x + 6$. On compare à $3x + 5$ : les termes en $x$ sont identiques, mais 6 n'est pas 5. Les expressions ne sont donc PAS égales. Un contre-exemple suffit d'ailleurs à conclure : pour $x = 0$, la première vaut 6 et la seconde 5. Attention au raisonnement inverse — trouver UNE valeur où les deux coïncident ne prouverait rien, car une égalité littérale doit tenir pour tous les nombres à la fois.",
      micros: ["litteral_defi", "litteral_developper"],
    },
  ],
  pieges: [
    "Lire $5x$ comme $5 + x$. L'absence de signe est une multiplication, jamais une addition.",
    "Écrire $3x + 2 = 5x$. Un terme en $x$ et un nombre ne sont pas semblables : l'expression est déjà réduite.",
    "Écrire $4(x + 3) = 4x + 3$. Le facteur multiplie CHAQUE terme de la parenthèse, donc $4x + 12$.",
    "Écrire $5x + 10 = 5(x + 10)$. En développant, cela donnerait $5x + 50$ : le second terme doit être divisé lui aussi, d'où $5(x + 2)$.",
    "Écrire $(x + 2)^2 = x^2 + 4$. Le carré d'une somme n'est pas la somme des carrés : en écrivant le produit $(x+2)(x+2)$ en entier, on trouve $x^2 + 4x + 4$.",
    "Écrire $2x + 3x^2 = 5x^2$. Les puissances diffèrent, donc les termes ne sont pas semblables et rien ne se regroupe.",
    "Oublier les parenthèses en remplaçant un nombre négatif : $2 \\times (-3)$ vaut $-6$, et sans parenthèses le signe se perd.",
  ],
  aRetenir: [
    "$3x$ signifie $3 \\times x$ : le signe de multiplication est sous-entendu.",
    "On ne regroupe que les termes SEMBLABLES — même lettre, même puissance.",
    "Développer va du produit vers la somme ; factoriser fait l'inverse.",
    "$(x+3)^2$ signifie $(x+3)(x+3)$ : on écrit le produit, puis on développe.",
    "$(a+b)(a-b) = a^2 - b^2$ : une différence de carrés se factorise toujours.",
    "Une égalité littérale doit être vraie pour TOUT $x$ ; un seul contre-exemple la détruit.",
  ],
  entrainement: [
    {
      question: "Réduire : $4a - 2a + 3$.",
      correction:
        "Les termes $4a$ et $-2a$ sont semblables et donnent $2a$. Le 3 n'a pas de semblable. Résultat : $2a + 3$, qui ne se réduit pas davantage.",
      micros: ["litteral_reduire"],
    },
    {
      question: "Calculer $2a - 5$ pour $a = -3$.",
      correction:
        "On remplace avec des parenthèses : $2 \\times (-3) - 5 = -6 - 5 = -11$.",
      micros: ["litteral_substituer"],
    },
    {
      question: "Développer : $-2(x - 5)$.",
      correction:
        "Le facteur $-2$ multiplie les deux termes : $-2 \\times x = -2x$, et $-2 \\times (-5) = +10$. Résultat : $-2x + 10$. Le double signe moins donne un plus — c'est là que se perd le second terme.",
      micros: ["litteral_developper"],
    },
    {
      question: "Développer et réduire : $(x + 4)(x + 2)$.",
      correction:
        "Quatre produits : $x^2$, $2x$, $4x$ et $8$. On réduit les deux termes en $x$ : $x^2 + 6x + 8$.",
      micros: ["litteral_developper"],
    },
    {
      question: "Factoriser : $7x + 21$.",
      correction:
        "Le 7 est commun, car $21 = 7 \\times 3$. Donc $7x + 21 = 7(x + 3)$. Contrôle : en développant, $7x + 21$. C'est bien l'expression de départ.",
      micros: ["litteral_factoriser"],
    },
    {
      question: "Factoriser : $6x^2 + 4x$.",
      correction:
        "Le 2 est commun aux nombres et le $x$ à chaque terme : le facteur commun est $2x$. Donc $6x^2 + 4x = 2x(3x + 2)$. Contrôle : $2x \\times 3x = 6x^2$ et $2x \\times 2 = 4x$.",
      micros: ["litteral_factoriser"],
    },
    {
      question: "Développer : $(x - 5)^2$.",
      correction:
        "On récrit le carré comme un produit : $(x-5)(x-5)$. Les quatre produits sont $x^2$, $-5x$, $-5x$ et $+25$ — le dernier est positif, puisque moins par moins donne plus. En regroupant les deux termes du milieu : $x^2 - 10x + 25$.",
      micros: ["litteral_identite"],
    },
    {
      question: "Factoriser : $x^2 - 81$.",
      correction:
        "On reconnaît une différence de deux carrés, car $81 = 9^2$. Donc $x^2 - 81 = (x + 9)(x - 9)$.",
      micros: ["litteral_identite", "litteral_factoriser"],
    },
    {
      question: "Un élève écrit $(x + 2)^2 = x^2 + 4$. A-t-il raison ?",
      correction:
        "Non. En récrivant le produit en entier — $(x+2)(x+2)$ — on trouve quatre produits, dont deux termes en $2x$ au milieu : le développement correct est $x^2 + 4x + 4$. Un contre-exemple le confirme en une ligne — pour $x = 1$, le membre de gauche vaut $9$ et celui de droite $5$.",
      micros: ["litteral_identite", "litteral_defi"],
    },
    {
      question:
        "Les expressions $5(x + 3)$ et $5x + 15$ sont-elles égales pour tout $x$ ?",
      correction:
        "Oui. En développant la première, $5 \\times x + 5 \\times 3 = 5x + 15$ : on obtient exactement la seconde. Ce sont deux écritures de la même expression, l'une factorisée et l'autre développée.",
      micros: ["litteral_defi", "litteral_developper"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=litteral_calcul",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres — ce qui est de
// toute façon la bonne façon de projeter, puisque le prof LIT la diapositive à
// voix haute.

export const slidesCalculLitteral3e: ClasseSlide[] = [
  {
    titre: "Calculer sans connaître le nombre",
    badge: "Ce qu'on va faire",
    section: {
      type: "objectif",
      phrase: "Une lettre tient la place d'un nombre",
      sousPhrase:
        "Au marché, un fruit coûte trois euros. Vous en prenez x. Le total s'écrit trois x — et cette écriture est juste que vous en preniez deux ou deux cents.",
      encadre: {
        titre: "Ce qui est nouveau en troisième",
        texte:
          "Les gestes sont ceux de quatrième. Ce qui change, c'est la vitesse : trois égalités qu'on reconnaît d'un coup d'œil au lieu de les recalculer.",
      },
    },
  },
  {
    titre: "Trois verbes, trois directions",
    badge: "Le vocabulaire",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Développer",
          texte:
            "On part d'un produit et on arrive à une somme. On enlève les parenthèses en multipliant chaque terme.",
        },
        {
          titre: "Factoriser",
          texte:
            "L'inverse exactement : on part d'une somme et on arrive à un produit, en mettant en facteur ce qui est commun.",
        },
        {
          titre: "Réduire",
          texte:
            "On ne change pas de sens, on range : on regroupe les termes semblables. C'est ce qui suit presque toujours un développement.",
        },
      ],
    },
  },
  {
    titre: "Ce qui se regroupe et ce qui ne se regroupe pas",
    badge: "La règle",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "ok",
        titre: "Se regroupe",
        contenu:
          "Trois x plus deux x font cinq x. Même lettre, même puissance : les termes sont semblables, on ajoute les coefficients.",
      },
      droite: {
        variante: "piege",
        titre: "Ne se regroupe pas",
        contenu:
          "Trois x plus deux reste trois x plus deux. Et deux x plus trois x au carré ne font pas cinq x au carré : les puissances diffèrent.",
      },
    },
  },
  {
    titre: "Développer une parenthèse",
    badge: "Le geste",
    section: {
      type: "etapes",
      etapes: [
        "Je regarde combien de termes il y a dans la parenthèse : ici deux, x et quatre.",
        "Je multiplie le facteur de devant par le PREMIER terme : trois fois x, donc trois x.",
        "Je multiplie le même facteur par le SECOND terme : trois fois quatre, donc douze.",
        "J'écris la somme : trois x plus douze. Autant de produits que de termes — c'est le contrôle.",
      ],
    },
  },
  {
    titre: "Deux parenthèses qui se multiplient",
    badge: "L'outil de la troisième",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Quatre produits, toujours",
          texte:
            "Chaque terme de la première parenthèse rencontre chaque terme de la seconde. Deux termes de chaque côté : quatre produits, et on les compte avant de calculer.",
        },
        {
          titre: "Un carré n'est pas un cas à part",
          texte:
            "x plus trois, le tout au carré, veut dire x plus trois, multiplié par x plus trois. On récrit le produit en entier, et on développe comme d'habitude.",
        },
        {
          titre: "La seule égalité à savoir",
          texte:
            "a plus b, multiplié par a moins b, égale a au carré moins b au carré. Celle-là n'a pas de terme du milieu : les deux produits croisés s'annulent.",
        },
      ],
    },
  },
  {
    titre: "Le terme qu'on oublie",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce que beaucoup écrivent",
        contenu:
          "x plus deux, le tout au carré, égale x au carré plus quatre. On a mis chaque morceau au carré, séparément.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui est vrai",
        contenu:
          "On récrit le produit : x plus deux, fois x plus deux. Quatre produits, dont deux fois deux x au milieu. Cela donne x au carré, plus quatre x, plus quatre. Pour x égale un : neuf d'un côté, cinq de l'autre.",
      },
    },
  },
  {
    titre: "Factoriser, c'est reconnaître",
    badge: "Le geste inverse",
    section: {
      type: "etapes",
      etapes: [
        "Je regarde les nombres : ont-ils un diviseur commun ? Dans trois x plus douze, le trois divise les deux.",
        "Je regarde les lettres : le x est-il dans chaque terme ? Si oui, il sort aussi.",
        "J'écris le facteur commun devant une parenthèse, et je place ce qui reste dedans.",
        "Je développe mentalement pour vérifier que je retombe sur la somme de départ.",
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce: "On considère l'expression trois fois, parenthèse, x plus quatre, fermée, plus deux x.",
      question: "Développer, puis réduire.",
      correction:
        "On développe d'abord la parenthèse. Le trois multiplie les DEUX termes : trois fois x donne trois x, et trois fois quatre donne douze. L'expression devient trois x plus douze plus deux x. On réduit ensuite : trois x et deux x sont de même nature, ils donnent cinq x. Le douze reste seul, car il n'est semblable à rien. Le résultat est cinq x plus douze. Et on contrôle sur une valeur : pour x égale un, l'expression de départ vaut trois fois cinq plus deux, soit dix-sept ; le résultat donne cinq plus douze, dix-sept également.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce: "On considère l'expression x au carré moins trente-six.",
      question: "La factoriser.",
      indice: "Regardez si les deux termes sont des carrés, et quel signe les sépare.",
      correction:
        "Trente-six est le carré de six. L'expression est donc une différence de deux carrés, et c'est la troisième identité remarquable, lue de droite à gauche. Le résultat est parenthèse x plus six, fermée, multipliée par parenthèse x moins six. Le contrôle se fait en développant : x au carré, moins six x, plus six x, moins trente-six. Les deux termes du milieu s'annulent, et il reste bien x au carré moins trente-six. C'est exactement pour cette raison que cette identité n'a pas de terme du milieu.",
    },
  },
];
