// ─── Fiche de cours : Pythagore et sa réciproque (3e) ─────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/pythagore.bank.ts, notionId `pythagore_theoreme`, 53 items).
//
// ⛔⛔ CETTE FICHE EST UNE FICHE DE SYNTHÈSE, ET ELLE L'ASSUME. Le recouvrement
// a été mesuré sur toutes les classes, pas sur le seul homonyme de 4e — la leçon
// des fiches de proportionnalité et de triangles :
//     pythagore_reconnaitre          déjà en 4e
//     pythagore_calculer_hypotenuse  déjà en 4e
//     pythagore_calculer_cote        déjà en 4e
//     pythagore_rediger              déjà en 4e
//     pythagore_defi                 déjà en 4e
//     pythagore_reciproque           ⭐ PROPRE À LA 3e — la seule
// Et `maths-4e-pythagore.tsx` existe. Prétendre à de la nouveauté là où il n'y
// en a qu'une serait malhonnête ; mieux vaut dire ce que la 3e apporte vraiment.
//
// ⭐⭐ CE QUE LA BANQUE DE 3e DEMANDE VRAIMENT, ET QUI N'EST PAS UN CALCUL : LA
// RÉDACTION. Sur ses 53 items, NEUF portent sur la façon d'écrire — « type
// brevet : rédige une réponse complète », « quelle phrase convient pour
// commencer », « quel est le bon ordre pour rédiger », « un élève écrit
// directement d'après Pythagore sans préciser que le triangle est rectangle en
// A : sa rédaction est-elle complète ? » (non). En 4e on apprend à CALCULER ;
// en 3e on apprend à ÉCRIRE LA PREUVE, parce que c'est ce que le brevet note.
// 👉 La fiche consacre donc une propriété entière aux quatre temps de la
// rédaction, et le corrigé de chaque exemple est écrit dans ce format.
//
// ⭐ ET LA RÉCIPROQUE, qui est le seul contenu neuf. La distinction est subtile
// et la banque la pose de front : le théorème DIRECT part de l'angle droit et
// arrive à l'égalité ; la RÉCIPROQUE part de l'égalité et arrive à l'angle
// droit. On ne peut donc pas prouver qu'un triangle est rectangle avec le
// théorème direct — il faudrait supposer ce qu'on cherche à démontrer.
//
// ⭐ LES 53 ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE — la règle du 31/08 :
//   pythagore_reconnaitre         → l'hypoténuse, et où elle se trouve
//   pythagore_calculer_hypotenuse → on additionne les carrés
//   pythagore_calculer_cote       → on soustrait, et l'ordre compte
//   pythagore_reciproque          → comparer le plus grand carré à la somme
//   pythagore_rediger             → les quatre temps, et la phrase d'ouverture
//   pythagore_defi                → l'échelle contre le mur, la diagonale
//
// ⚠️ LE CANVAS `triangle` IMPOSE DEUX CHOSES, MESURÉES LE 03/09, ET ELLES
// TIRENT EN SENS CONTRAIRE. Son étiquette d'angle au sommet C est posée en
// C.x + 10 derrière un cartouche de 34 px, ce qui exige `C.x <= largeur - 40`.
// Mais le bloc ne fait que 225 px : plus le cadre est LARGE, plus le dessin est
// réduit, et la police finale descend. À 280, elle tombait à 11,1 px pour un
// plancher de 11 — un dixième de marge. Le cadre est donc à 265, et les sommets
// C restent sous 225. Voir `maths-3e-triangles.tsx`, où le même arbitrage s'est
// joué dans l'autre sens.
// ⚠️ Et les longueurs DESSINÉES respectent les proportions annoncées : un côté
// étiqueté « 3 » et un côté étiqueté « 4 » sont tracés dans le rapport 3 : 4.
// Un dessin qui contredit ses propres cotes est la faute documentée par la
// session français.

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

// ⚠️ Aucun emplacement de fiche ne dépasse 225 px à 375, ni 300 px à 1280 —
// mesuré par `scripts/mesurer-largeurs-blocs.mjs`.
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

type Pts = {
  A: { x: number; y: number };
  B: { x: number; y: number };
  C: { x: number; y: number };
};

const triangle = (
  points: Pts,
  opts: {
    sideLabels?: Record<string, string>;
    rightAngleAt?: string;
    angleLabels?: Record<string, string>;
    showAngles?: boolean;
  } = {}
) => (
  <CanvasRenderer
    figure={
      {
        kind: "triangle",
        // ⚠️ 265 ET NON 280. A 280, la police finale tombait a 11,1 px pour
        // un plancher de 11 : un dixieme de marge, qui bascule au premier
        // changement de mise en page. Le bloc faisant 225 px, retrecir le CADRE
        // agrandit le dessin — l inverse du reflexe. Contrainte a respecter en
        // echange : l etiquette d angle de C occupe 40 px, donc C.x <= 225.
        size: { width: 265, height: 210 },
        points,
        display: {
          showPoints: true,
          showLabels: true,
          showSides: true,
          showAngles: opts.showAngles ?? false,
        },
        labels: { A: "A", B: "B", C: "C" },
        sideLabels: opts.sideLabels,
        angleLabels: opts.angleLabels,
        marks: { rightAngleAt: opts.rightAngleAt },
      } as never
    }
  />
);

// ⭐ LES PROPORTIONS DU DESSIN SONT CELLES DES COTES. Rectangle en A, avec
// AB = 105 px pour « 3 cm » et AC = 140 px pour « 4 cm » : le rapport 3 : 4 est
// respecté, donc l'hypoténuse tracée mesure bien 175 px, soit 5 unités de 35.
// Un triangle dessiné au hasard sous des cotes 3-4-5 enseignerait que le dessin
// ne veut rien dire.
const P_345: Pts = { A: { x: 48, y: 178 }, B: { x: 48, y: 73 }, C: { x: 188, y: 178 } };
// Un triangle dont on IGNORE encore s'il est rectangle : on ne le dessine donc
// pas avec un angle droit. Cotes 4-5-6, qui ne forment pas un triangle rectangle.
// ⛔ ET LES ETIQUETTES SUIVENT LES LONGUEURS TRACEES, pas l'inverse. Mesure des
// segments : AB vaut 146 px, BC 170, CA 190. Le « 4 » va donc au plus court,
// le « 6 » au plus long. Une premiere version mettait « 5 » sur AB et « 4 » sur
// BC : le cote annonce le plus court etait dessine le plus long.
const P_QUELCONQUE: Pts = { A: { x: 45, y: 175 }, B: { x: 118, y: 52 }, C: { x: 220, y: 175 } };

export const fichePythagore3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "pythagore-theoreme",
  titre: "Pythagore, sa réciproque, et la rédaction attendue",
  accroche:
    "En quatrième, le théorème de Pythagore servait à CALCULER une longueur qu'on ne pouvait pas mesurer. En troisième, il sert aussi à DÉMONTRER — prouver qu'un angle est droit sans jamais poser d'équerre — et surtout à l'écrire comme le brevet l'attend. Car le calcul juste ne suffit plus : c'est la phrase qui l'entoure qui est notée.",
  identite: [
    { label: "Le théorème", valeur: "Rectangle $\\Rightarrow$ le carré de l'hypoténuse est la somme des deux autres" },
    { label: "La réciproque", valeur: "L'égalité des carrés $\\Rightarrow$ le triangle est rectangle" },
    { label: "Le piège", valeur: "Le direct ne PROUVE jamais qu'un triangle est rectangle" },
  ],
  definition: {
    texte:
      "Dans un triangle rectangle, l'HYPOTÉNUSE est le côté opposé à l'angle droit — c'est toujours le plus long. Le théorème de Pythagore affirme que son carré est égal à la somme des carrés des deux autres côtés : si le triangle $ABC$ est rectangle en $A$, alors $BC^2 = AB^2 + AC^2$. La RÉCIPROQUE fait le chemin inverse : si l'égalité est vérifiée, alors le triangle est rectangle, et l'angle droit se situe au sommet opposé au plus grand côté.",
  },
  figure: {
    schema: triangle(P_345, {
      rightAngleAt: "A",
      sideLabels: { AB: "3", CA: "4", BC: "5" },
    }),
    legende:
      "Rectangle en $A$ : le côté opposé, $BC$, est l'hypoténuse. On vérifie que $3^2 + 4^2 = 9 + 16 = 25$, et que $5^2 = 25$.",
  },
  proprietes: [
    {
      titre: "Repérer l'hypoténuse avant tout calcul",
      texte:
        "L'hypoténuse est le côté OPPOSÉ à l'angle droit, jamais l'un de ceux qui le forment. Dans un triangle rectangle en $A$, c'est donc $BC$ — celui qui ne contient pas la lettre $A$. C'est aussi le plus long des trois, ce qui donne un contrôle gratuit : un résultat où l'hypoténuse serait plus courte qu'un autre côté est nécessairement faux.",
      schema: legende(
        triangle(P_345, {
          rightAngleAt: "A",
          sideLabels: { BC: "hypoténuse" },
        }),
        "Rectangle en $A$ : l'hypoténuse est $BC$, la seule qui ne touche pas $A$."
      ),
      micros: ["pythagore_reconnaitre"],
    },
    {
      titre: "Calculer l'hypoténuse : on additionne",
      texte:
        "Quand les deux côtés de l'angle droit sont connus, on élève chacun au carré, on additionne, puis on prend la racine carrée. Avec $3$ cm et $4$ cm : $3^2 + 4^2 = 9 + 16 = 25$, donc l'hypoténuse mesure $\\sqrt{25} = 5$ cm. ⚠️ La racine se prend à la FIN — écrire $\\sqrt{3} + \\sqrt{4}$ n'a rien à voir avec le résultat cherché.",
      schema: legende(
        tableau({
          headers: ["étape", "calcul"],
          rows: [
            { values: ["les carrés", "3² = 9 · 4² = 16"] },
            { values: ["la somme", "9 + 16 = 25"] },
            { values: ["la racine", "√25 = 5"] },
          ],
          highlight: { row: 2 },
          caption: "la racine, seulement à la fin",
        }),
        "Trois lignes, toujours dans cet ordre."
      ),
      micros: ["pythagore_calculer_hypotenuse"],
    },
    {
      titre: "Calculer un côté de l'angle droit : on soustrait",
      texte:
        "Quand c'est l'hypoténuse qui est connue, l'opération s'inverse : on retranche. Avec une hypoténuse de $13$ cm et un côté de $5$ cm : $13^2 - 5^2 = 169 - 25 = 144$, donc l'autre côté mesure $\\sqrt{144} = 12$ cm. ⛔ Et l'ordre n'est pas libre — c'est toujours le carré de l'hypoténuse qui vient en premier, sans quoi l'on obtiendrait un nombre négatif.",
      schema: legende(
        tableau({
          headers: ["on connaît", "on fait"],
          rows: [
            { values: ["les 2 côtés droits", "on ADDITIONNE"] },
            { values: ["l'hypoténuse + 1", "on SOUSTRAIT"] },
            { values: ["l'ordre", "grand² − petit²"] },
          ],
          highlight: { row: 1 },
          caption: "la donnée décide de l'opération",
        }),
        "Repérer d'abord si l'hypoténuse fait partie des données : tout en découle."
      ),
      micros: ["pythagore_calculer_cote"],
    },
    {
      titre: "La réciproque : prouver qu'un angle est droit",
      texte:
        "C'est la nouveauté de l'année. Quand on connaît les TROIS longueurs et qu'on ignore si le triangle est rectangle, on compare le carré du plus grand côté à la somme des carrés des deux autres. S'ils sont égaux, le triangle est rectangle, et l'angle droit se trouve au sommet OPPOSÉ à ce plus grand côté. S'ils diffèrent, il ne l'est pas.",
      schema: legende(
        triangle(P_QUELCONQUE, {
          sideLabels: { AB: "4", BC: "5", CA: "6" },
        }),
        "On ne le dessine pas avec un angle droit : c'est justement ce qu'il faut établir."
      ),
      micros: ["pythagore_reciproque"],
    },
    {
      titre: "Direct et réciproque ne se remplacent pas",
      texte:
        "Le théorème DIRECT part de l'angle droit et aboutit à l'égalité : il suppose donc le triangle rectangle, et sert à calculer une longueur. La RÉCIPROQUE part de l'égalité et aboutit à l'angle droit : elle sert à démontrer. ⛔ Utiliser le direct pour prouver qu'un triangle est rectangle revient à supposer ce qu'on cherche — c'est un raisonnement circulaire, et il ne vaut aucun point.",
      schema: legende(
        tableau({
          headers: ["", "on part de", "on obtient"],
          rows: [
            { values: ["direct", "l'angle droit", "l'égalité"] },
            { values: ["réciproque", "l'égalité", "l'angle droit"] },
          ],
          caption: "deux sens, deux usages",
        }),
        "L'énoncé dit lequel employer : « calcule » appelle le direct, « démontre » la réciproque."
      ),
      micros: ["pythagore_reciproque", "pythagore_reconnaitre"],
    },
    {
      titre: "La rédaction attendue tient en quatre temps",
      texte:
        "C'est ce que le brevet note, et c'est ce que la banque interroge le plus. On écrit d'abord L'HYPOTHÈSE — « le triangle $ABC$ est rectangle en $A$ » — puis on NOMME le théorème, puis on pose l'égalité et on calcule, puis on CONCLUT par une phrase avec l'unité. ⛔ Écrire « d'après Pythagore, $BC^2 = AB^2 + AC^2$ » sans avoir dit où se trouve l'angle droit est une rédaction incomplète, même si le calcul est juste.",
      schema: legende(
        tableau({
          headers: ["temps", "ce qu'on écrit"],
          rows: [
            { values: ["1. hypothèse", "ABC rectangle en A"] },
            { values: ["2. théorème", "d'après Pythagore"] },
            { values: ["3. calcul", "BC² = AB² + AC²"] },
            { values: ["4. conclusion", "donc BC = 5 cm"] },
          ],
          highlight: { row: 0 },
          caption: "le premier temps est celui qu'on saute",
        }),
        "Le calcul juste ne suffit pas : c'est la phrase qui l'entoure qui est notée."
      ),
      micros: ["pythagore_rediger"],
    },
    {
      titre: "La rédaction de la réciproque a ses propres mots",
      texte:
        "Elle ne s'écrit pas comme le direct. On calcule SÉPARÉMENT les deux membres — d'un côté le carré du plus grand, de l'autre la somme des deux carrés — puis on les compare, et on conclut. La phrase attendue est : « comme $BC^2 = AB^2 + AC^2$, d'après la réciproque du théorème de Pythagore, le triangle $ABC$ est rectangle en $A$ ». Le sommet doit être nommé.",
      schema: legende(
        tableau({
          headers: ["on calcule", "à part"],
          rows: [
            { values: ["le grand carré", "10² = 100"] },
            { values: ["la somme", "6² + 8² = 100"] },
            { values: ["on compare", "égaux : rectangle"] },
          ],
          highlight: { row: 2 },
          caption: "deux colonnes, puis on compare",
        }),
        "Calculer les deux membres SÉPARÉMENT est ce qui rend la comparaison honnête."
      ),
      micros: ["pythagore_rediger", "pythagore_reciproque"],
    },
    {
      titre: "Quelques triplets qu'il vaut mieux reconnaître",
      texte:
        "Certains triplets de nombres entiers vérifient exactement l'égalité, et les reconnaître fait gagner un temps précieux : $3$-$4$-$5$, $6$-$8$-$10$, $5$-$12$-$13$, $9$-$12$-$15$. Les trois derniers sont d'ailleurs des agrandissements ou des cousins du premier. ⚠️ Mais un triplet non reconnu ne prouve rien : il faut alors calculer, et $4$-$5$-$6$ montre bien que trois entiers proches ne suffisent pas.",
      schema: legende(
        tableau({
          headers: ["triplet", "vérification"],
          rows: [
            { values: ["3, 4, 5", "9 + 16 = 25 ✓"] },
            { values: ["6, 8, 10", "36 + 64 = 100 ✓"] },
            { values: ["5, 12, 13", "25 + 144 = 169 ✓"] },
            { values: ["4, 5, 6", "16 + 25 = 41 ≠ 36"] },
          ],
          highlight: { row: 3 },
          caption: "le dernier n'est pas rectangle",
        }),
        "Reconnaître va vite ; vérifier ne trompe jamais."
      ),
      micros: ["pythagore_defi", "pythagore_reciproque"],
    },
  ],
  reel: {
    texte:
      "La réciproque est l'outil des gens qui construisent. Pour tracer un angle droit sur un chantier sans équerre — et une équerre de menuisier est bien trop petite pour une dalle —, on mesure trois mètres sur un mur, quatre mètres sur l'autre, et l'on ajuste jusqu'à ce que la diagonale fasse exactement cinq mètres. L'angle est alors droit, garanti par le théorème. La méthode est si ancienne qu'on l'appelle « la corde à treize nœuds » : douze intervalles égaux, repliés en $3 + 4 + 5$, donnent un angle droit sans aucun instrument. Les bâtisseurs de cathédrales s'en servaient, et les maçons aussi.",
  },
  historique: {
    texte:
      "Le résultat porte le nom de Pythagore, au VIᵉ siècle avant notre ère, mais il lui est très antérieur. La tablette babylonienne Plimpton 322, gravée vers 1800 avant notre ère, aligne quinze triplets de nombres qui vérifient exactement l'égalité — dont certains bien trop grands pour avoir été trouvés au hasard, comme $119$, $120$ et $169$. Les Babyloniens connaissaient donc la relation mille ans avant les Grecs. Ce que l'école pythagoricienne a apporté n'est pas la découverte, c'est la DÉMONSTRATION : le passage d'une recette qui marche à une vérité qu'on prouve. C'est exactement le geste que cette fiche vous demande d'apprendre à écrire.",
  },
  formule: {
    contexte: "Le théorème et sa réciproque, dans un triangle rectangle en $A$",
    expression: "$BC^2 = AB^2 + AC^2$",
    legende:
      "La même égalité sert dans les deux sens, et c'est ce qui rend la distinction difficile. Lue de gauche à droite quand on SAIT que le triangle est rectangle, elle calcule une longueur. Lue à l'envers quand on l'IGNORE, elle démontre l'angle droit. ⚠️ Ce n'est pas la formule qui change : c'est ce qu'on admet au départ.",
    schema: legende(
      tableau(
        {
          headers: ["l'énoncé dit", "on emploie"],
          rows: [
            { values: ["« calcule BC »", "le direct"] },
            { values: ["« démontre que… »", "la réciproque"] },
            { values: ["« ce triangle est-il rectangle ? »", "la réciproque"] },
          ],
          caption: "le verbe de la consigne tranche",
        },
        "formule"
      ),
      "Un seul mot de l'énoncé décide du théorème à citer."
    ),
  },
  methode: [
    {
      titre: "Commencer par situer l'angle droit",
      texte:
        "Avant tout calcul, on repère où il est — l'énoncé le dit, ou la figure le code. L'hypoténuse est alors le côté opposé, et c'est elle qui portera le carré isolé dans l'égalité. Sauter cette étape est la cause de la moitié des erreurs de signe.",
      micros: ["pythagore_reconnaitre"],
    },
    {
      titre: "Décider entre addition et soustraction",
      texte:
        "Si l'hypoténuse est CHERCHÉE, on additionne les carrés. Si elle est DONNÉE, on soustrait — et toujours dans l'ordre « carré de l'hypoténuse moins carré du côté connu ». Un résultat négatif signale qu'on a inversé.",
      micros: ["pythagore_calculer_hypotenuse", "pythagore_calculer_cote"],
    },
    {
      titre: "Ne prendre la racine qu'à la fin",
      texte:
        "On travaille sur les CARRÉS jusqu'au bout, puis on extrait la racine une seule fois, sur le résultat. Passer par des racines intermédiaires introduit des arrondis et des erreurs, et ne simplifie rien.",
      micros: ["pythagore_calculer_hypotenuse"],
    },
    {
      titre: "Pour la réciproque : deux colonnes séparées",
      texte:
        "On calcule d'un côté le carré du plus grand, de l'autre la somme des deux autres carrés, SANS les écrire dans une même égalité — puisqu'on ignore encore si elle est vraie. On compare seulement ensuite.",
      micros: ["pythagore_reciproque"],
    },
    {
      titre: "Rédiger, même quand le calcul est évident",
      texte:
        "Les quatre temps s'écrivent toujours : hypothèse, théorème nommé, calcul, conclusion avec l'unité. ⚠️ Le premier est celui qu'on saute, et c'est celui qui coûte des points — le correcteur doit lire OÙ se trouve l'angle droit.",
      micros: ["pythagore_rediger"],
    },
  ],
  usages: [
    {
      titre: "On me donne les deux côtés de l'angle droit",
      detail: "J'additionne leurs carrés, puis je prends la racine : j'obtiens l'hypoténuse.",
      micros: ["pythagore_calculer_hypotenuse"],
    },
    {
      titre: "On me donne l'hypoténuse et un côté",
      detail:
        "Je soustrais le carré du côté connu de celui de l'hypoténuse, puis je prends la racine.",
      micros: ["pythagore_calculer_cote"],
    },
    {
      titre: "On me donne les trois longueurs",
      detail:
        "Je compare le carré du plus grand à la somme des deux autres carrés : c'est la réciproque.",
      micros: ["pythagore_reciproque"],
    },
    {
      titre: "On me demande de démontrer, pas de calculer",
      detail:
        "J'emploie la réciproque, et je nomme le sommet de l'angle droit dans ma conclusion.",
      micros: ["pythagore_reciproque", "pythagore_rediger"],
    },
    {
      titre: "Le problème parle d'une échelle, d'une diagonale, d'un mât",
      detail:
        "Je cherche le triangle rectangle caché dans la situation, puis j'applique le théorème direct.",
      micros: ["pythagore_defi"],
    },
  ],
  exemples: [
    {
      titre: "Calculer une hypoténuse, rédigé comme au brevet",
      donnees: "Le triangle $ABC$ est rectangle en $A$, avec $AB = 6$ cm et $AC = 8$ cm.",
      question: "Calculer $BC$.",
      solution:
        "Le triangle $ABC$ est rectangle en $A$. D'après le théorème de Pythagore, $BC^2 = AB^2 + AC^2$. On remplace : $BC^2 = 6^2 + 8^2 = 36 + 64 = 100$. Donc $BC = \\sqrt{100} = 10$ cm. ⚠️ Remarquez les quatre temps : la première phrase pose l'hypothèse, la deuxième nomme le théorème, la troisième calcule, la quatrième conclut AVEC l'unité. Le correcteur cherche les quatre.",
      micros: ["pythagore_calculer_hypotenuse", "pythagore_rediger"],
    },
    {
      titre: "Calculer un côté de l'angle droit",
      donnees: "Le triangle $ABC$ est rectangle en $A$, avec $BC = 13$ cm et $AB = 5$ cm.",
      question: "Calculer $AC$.",
      solution:
        "Le triangle $ABC$ est rectangle en $A$. D'après le théorème de Pythagore, $BC^2 = AB^2 + AC^2$. On isole le terme cherché : $AC^2 = BC^2 - AB^2 = 13^2 - 5^2 = 169 - 25 = 144$. Donc $AC = \\sqrt{144} = 12$ cm. ⛔ L'ordre de la soustraction n'est pas libre : $5^2 - 13^2$ donnerait $-144$, et aucune longueur n'est négative. C'est toujours le carré de l'hypoténuse qui vient en premier.",
      schema: legende(
        tableau(
          {
            headers: ["étape", "calcul"],
            rows: [
              { values: ["on isole", "AC² = BC² − AB²"] },
              { values: ["on remplace", "169 − 25"] },
              { values: ["on conclut", "AC = 12 cm"] },
            ],
            highlight: { row: 0 },
            caption: "l'hypoténuse d'abord",
          },
          "exemple"
        ),
        "Isoler AVANT de remplacer évite l'inversion."
      ),
      micros: ["pythagore_calculer_cote", "pythagore_rediger"],
    },
    {
      titre: "Démontrer qu'un triangle est rectangle",
      donnees: "Un triangle $ABC$ a pour côtés $AB = 9$ cm, $AC = 12$ cm et $BC = 15$ cm.",
      question: "Ce triangle est-il rectangle ?",
      solution:
        "Le plus grand côté est $BC$, avec $15$ cm. On calcule SÉPARÉMENT les deux membres, puisqu'on ignore encore s'ils sont égaux. D'une part, $BC^2 = 15^2 = 225$. D'autre part, $AB^2 + AC^2 = 9^2 + 12^2 = 81 + 144 = 225$. Les deux résultats sont égaux. Donc, d'après la réciproque du théorème de Pythagore, le triangle $ABC$ est rectangle en $A$ — le sommet opposé au plus grand côté. ⚠️ Le nommer fait partie de la réponse : conclure « il est rectangle » sans dire où ne vaut pas tous les points.",
      micros: ["pythagore_reciproque", "pythagore_rediger"],
    },
    {
      titre: "L'échelle contre le mur",
      donnees: "Une échelle de $5$ m est posée contre un mur, son pied à $3$ m du mur.",
      question: "À quelle hauteur touche-t-elle le mur ?",
      solution:
        "Le mur, le sol et l'échelle forment un triangle rectangle, dont l'angle droit est au pied du mur — c'est la situation qu'il faut voir avant tout calcul. L'échelle en est l'HYPOTÉNUSE, puisqu'elle est opposée à cet angle droit. D'après le théorème de Pythagore, $5^2 = 3^2 + h^2$, donc $h^2 = 25 - 9 = 16$ et $h = 4$ m. L'échelle touche le mur à $4$ mètres de haut. ⚠️ L'erreur consiste à traiter l'échelle comme un côté de l'angle droit : on additionnerait alors au lieu de soustraire, et l'on trouverait une hauteur PLUS GRANDE que l'échelle elle-même.",
      schema: legende(
        // ⛔ GEOMETRIE PROPRE A CET EXEMPLE, ET NON P_345. Ici la HAUTEUR vaut 4
        // et la distance au mur 3 : le cote vertical doit donc etre le plus
        // long. P_345 a l'inverse — 105 px en vertical, 140 en horizontal — et
        // le dessin aurait montre une echelle dont le pied est plus loin que le
        // sommet n'est haut, en contradiction avec ses propres cotes.
        triangle(
          { A: { x: 55, y: 178 }, B: { x: 55, y: 38 }, C: { x: 160, y: 178 } },
          { rightAngleAt: "A", sideLabels: { AB: "h", CA: "3", BC: "5" } }
        ),
        "L'échelle est l'hypoténuse : la hauteur cherchée est plus petite qu'elle."
      ),
      micros: ["pythagore_defi", "pythagore_calculer_cote"],
    },
  ],
  pieges: [
    "Employer le théorème direct pour PROUVER qu'un triangle est rectangle. Il suppose l'angle droit : c'est la réciproque qui le démontre.",
    "Écrire « d'après Pythagore, $BC^2 = AB^2 + AC^2$ » sans dire où se trouve l'angle droit. La rédaction est incomplète, même avec un calcul juste.",
    "Prendre pour hypoténuse un côté qui touche l'angle droit. C'est le côté OPPOSÉ, et le plus long des trois.",
    "Soustraire dans le mauvais sens : $5^2 - 13^2$ donne un nombre négatif, alors qu'aucune longueur ne l'est.",
    "Prendre la racine trop tôt. On travaille sur les carrés jusqu'au bout, et l'on extrait une seule fois, à la fin.",
    "Écrire directement l'égalité dans une réciproque. Tant qu'on ignore si elle est vraie, on calcule les deux membres SÉPARÉMENT.",
    "Conclure « il est rectangle » sans nommer le sommet. L'angle droit est opposé au plus grand côté, et il faut le dire.",
  ],
  aRetenir: [
    "L'hypoténuse est opposée à l'angle droit, et c'est le plus long côté.",
    "Rectangle en $A$ : $BC^2 = AB^2 + AC^2$.",
    "Hypoténuse cherchée : on additionne. Hypoténuse donnée : on soustrait.",
    "La réciproque part de l'égalité et conclut à l'angle droit — jamais l'inverse.",
    "Quatre temps : hypothèse, théorème nommé, calcul, conclusion avec l'unité.",
    "$3$-$4$-$5$, $6$-$8$-$10$, $5$-$12$-$13$ : des triplets à reconnaître d'un coup d'œil.",
  ],
  entrainement: [
    {
      question: "Dans un triangle rectangle en $A$, quel côté est l'hypoténuse ?",
      correction:
        "C'est $BC$, le côté opposé à l'angle droit — le seul qui ne contient pas la lettre $A$. C'est aussi le plus long des trois.",
      micros: ["pythagore_reconnaitre"],
    },
    {
      question:
        "Un triangle rectangle a des côtés de l'angle droit de $6$ cm et $8$ cm. Quelle est son hypoténuse ?",
      correction:
        "$6^2 + 8^2 = 36 + 64 = 100$, donc l'hypoténuse vaut $\\sqrt{100} = 10$ cm.",
      micros: ["pythagore_calculer_hypotenuse"],
    },
    {
      question:
        "Un triangle rectangle a une hypoténuse de $13$ cm et un côté de l'angle droit de $5$ cm. Combien mesure l'autre côté ?",
      correction:
        "$13^2 - 5^2 = 169 - 25 = 144$, donc l'autre côté vaut $\\sqrt{144} = 12$ cm. L'hypoténuse vient toujours en premier dans la soustraction.",
      micros: ["pythagore_calculer_cote"],
    },
    {
      question: "Un triangle a pour côtés $9$ cm, $12$ cm et $15$ cm. Est-il rectangle ?",
      correction:
        "Le plus grand côté vaut $15$. D'une part $15^2 = 225$ ; d'autre part $9^2 + 12^2 = 81 + 144 = 225$. Les deux membres sont égaux, donc d'après la réciproque du théorème de Pythagore, le triangle est rectangle au sommet opposé au côté de $15$ cm.",
      micros: ["pythagore_reciproque"],
    },
    {
      question: "Un triangle a pour côtés $4$ cm, $5$ cm et $6$ cm. Est-il rectangle ?",
      correction:
        "Le plus grand côté vaut $6$, donc $6^2 = 36$. Et $4^2 + 5^2 = 16 + 25 = 41$. Comme $36 \\neq 41$, le triangle n'est PAS rectangle. Trois entiers proches ne suffisent pas.",
      micros: ["pythagore_reciproque"],
    },
    {
      question:
        "On connaît les trois longueurs d'un triangle et l'on veut savoir s'il est rectangle. Quel théorème employer ?",
      correction:
        "La réciproque du théorème de Pythagore. Le théorème direct ne conviendrait pas : il suppose déjà l'angle droit, donc il supposerait ce qu'on cherche à démontrer.",
      micros: ["pythagore_reciproque"],
    },
    {
      question:
        "Un élève écrit « d'après Pythagore, $BC^2 = AB^2 + AC^2$ » sans préciser que le triangle est rectangle en $A$. Sa rédaction est-elle complète ?",
      correction:
        "Non. L'hypothèse doit être écrite AVANT le théorème : c'est elle qui autorise à l'employer, et elle indique au correcteur où se trouve l'angle droit.",
      micros: ["pythagore_rediger"],
    },
    {
      question: "Quel est le bon ordre pour rédiger un calcul de longueur avec Pythagore ?",
      correction:
        "Hypothèse — le triangle est rectangle en tel sommet ; théorème nommé ; égalité et calcul ; conclusion avec l'unité. Quatre temps, dans cet ordre.",
      micros: ["pythagore_rediger"],
    },
    {
      question:
        "Un rectangle mesure $9$ cm sur $12$ cm. Quelle est la longueur de sa diagonale ?",
      correction:
        "La diagonale coupe le rectangle en deux triangles rectangles dont elle est l'hypoténuse. Donc $9^2 + 12^2 = 81 + 144 = 225$, et la diagonale vaut $\\sqrt{225} = 15$ cm.",
      micros: ["pythagore_defi", "pythagore_calculer_hypotenuse"],
    },
    {
      question:
        "Une échelle de $5$ m est posée contre un mur, son pied à $3$ m du mur. À quelle hauteur touche-t-elle le mur ?",
      correction:
        "L'échelle est l'hypoténuse du triangle rectangle formé par le mur et le sol. Donc $h^2 = 5^2 - 3^2 = 25 - 9 = 16$, et $h = 4$ m. Contrôle : la hauteur trouvée est bien inférieure à la longueur de l'échelle.",
      micros: ["pythagore_defi", "pythagore_calculer_cote"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=pythagore_theoreme",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres.

export const slidesPythagore3e: ClasseSlide[] = [
  {
    titre: "Calculer, puis démontrer",
    badge: "Ce qui change cette année",
    section: {
      type: "objectif",
      phrase: "En quatrième, Pythagore servait à trouver une longueur",
      sousPhrase:
        "En troisième, il sert aussi à PROUVER qu'un angle est droit, sans jamais poser d'équerre. Et surtout à l'écrire comme le brevet l'attend.",
      encadre: {
        titre: "Ce que le brevet note",
        texte:
          "Pas seulement le calcul. La phrase qui l'entoure : l'hypothèse, le théorème nommé, et la conclusion avec son unité.",
      },
    },
  },
  {
    titre: "L'hypoténuse, d'abord",
    badge: "Le repérage",
    teinte: "essentiel",
    section: {
      type: "objectif",
      phrase: "Le côté opposé à l'angle droit",
      sousPhrase:
        "Jamais l'un de ceux qui le forment. Dans un triangle rectangle en A, c'est BC — le seul qui ne contient pas la lettre A.",
      encadre: {
        titre: "Le contrôle gratuit",
        texte:
          "C'est aussi le plus long des trois côtés. Un résultat où l'hypoténuse serait plus courte qu'un autre côté est forcément faux.",
      },
    },
  },
  {
    titre: "Additionner ou soustraire",
    badge: "La décision",
    section: {
      type: "etapes",
      etapes: [
        "Je repère où se trouve l'angle droit, et donc quelle est l'hypoténuse.",
        "Si l'hypoténuse est CHERCHÉE : j'additionne les carrés des deux autres côtés.",
        "Si l'hypoténuse est DONNÉE : je soustrais, et toujours dans l'ordre carré de l'hypoténuse moins carré du côté connu.",
        "Je ne prends la racine qu'à la toute fin, une seule fois, sur le résultat.",
      ],
    },
  },
  {
    titre: "La nouveauté : la réciproque",
    badge: "Prouver l'angle droit",
    teinte: "essentiel",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Le théorème direct",
        contenu:
          "On part de l'angle droit, on arrive à l'égalité des carrés. Il sert à CALCULER une longueur, et il suppose le triangle rectangle.",
      },
      droite: {
        variante: "info",
        titre: "La réciproque",
        contenu:
          "On part de l'égalité des carrés, on arrive à l'angle droit. Elle sert à DÉMONTRER, quand on connaît les trois longueurs.",
      },
    },
  },
  {
    titre: "Le raisonnement circulaire",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on voit sur les copies",
        contenu:
          "Pour montrer qu'un triangle est rectangle, on écrit d'après Pythagore et l'égalité des carrés.",
      },
      droite: {
        variante: "ok",
        titre: "Pourquoi c'est faux",
        contenu:
          "Le théorème direct SUPPOSE l'angle droit. L'employer pour le démontrer revient à supposer ce qu'on cherche. Il faut nommer la réciproque, et elle seule.",
      },
    },
  },
  {
    titre: "Les quatre temps de la rédaction",
    badge: "Ce que le correcteur cherche",
    teinte: "essentiel",
    section: {
      type: "etapes",
      etapes: [
        "L'HYPOTHÈSE : le triangle ABC est rectangle en A. C'est le temps qu'on saute, et celui qui coûte des points.",
        "LE THÉORÈME nommé : d'après le théorème de Pythagore.",
        "LE CALCUL : on pose l'égalité, on remplace, on calcule.",
        "LA CONCLUSION : donc BC égale dix centimètres. Avec l'unité.",
      ],
    },
  },
  {
    titre: "La réciproque a ses propres mots",
    badge: "Rédiger autrement",
    section: {
      type: "objectif",
      phrase: "On calcule les deux membres SÉPARÉMENT",
      sousPhrase:
        "Puisqu'on ignore encore s'ils sont égaux, on ne peut pas les écrire dans une même égalité. D'un côté le carré du plus grand ; de l'autre la somme des deux autres carrés. On compare ensuite.",
      encadre: {
        titre: "La phrase de conclusion",
        texte:
          "Comme les deux résultats sont égaux, d'après la RÉCIPROQUE du théorème de Pythagore, le triangle est rectangle en A. Le sommet doit être nommé.",
      },
    },
  },
  {
    titre: "La corde à treize nœuds",
    badge: "À quoi ça sert vraiment",
    section: {
      type: "objectif",
      phrase: "Tracer un angle droit sans équerre",
      sousPhrase:
        "Sur un chantier, on mesure trois mètres sur un mur, quatre sur l'autre, et on ajuste jusqu'à ce que la diagonale fasse exactement cinq mètres. L'angle est alors droit, garanti par la réciproque.",
      encadre: {
        titre: "Pourquoi treize nœuds",
        texte:
          "Douze intervalles égaux, repliés en trois, quatre et cinq. Les bâtisseurs de cathédrales s'en servaient, et les maçons aussi.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce: "Un triangle ABC a pour côtés AB égale neuf centimètres, AC douze, et BC quinze.",
      question: "Ce triangle est-il rectangle ?",
      correction:
        "Le plus grand côté est BC, quinze centimètres. On calcule SÉPARÉMENT les deux membres, puisqu'on ignore encore s'ils sont égaux. D'une part, BC au carré vaut quinze au carré, soit deux cent vingt-cinq. D'autre part, AB au carré plus AC au carré vaut quatre-vingt-un plus cent quarante-quatre, soit deux cent vingt-cinq également. Les deux résultats sont égaux. Donc, d'après la RÉCIPROQUE du théorème de Pythagore, le triangle ABC est rectangle en A — le sommet opposé au plus grand côté. Et il faut le nommer : conclure qu'il est rectangle sans dire où ne vaut pas tous les points.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce: "Une échelle de cinq mètres est posée contre un mur. Son pied est à trois mètres du mur.",
      question: "À quelle hauteur l'échelle touche-t-elle le mur ?",
      indice: "Cherchez d'abord le triangle rectangle, et demandez-vous lequel de ses côtés est l'échelle.",
      correction:
        "Le mur, le sol et l'échelle forment un triangle rectangle, et l'angle droit est au pied du mur. L'échelle est donc l'HYPOTÉNUSE, puisqu'elle est opposée à cet angle droit. D'après le théorème de Pythagore, cinq au carré égale trois au carré plus la hauteur au carré. Donc la hauteur au carré vaut vingt-cinq moins neuf, soit seize, et la hauteur vaut quatre mètres. Le contrôle est immédiat : la hauteur trouvée est plus petite que l'échelle, ce qui est bien le cas. L'erreur classique consiste à traiter l'échelle comme un côté de l'angle droit : on additionnerait alors, et l'on trouverait une hauteur plus grande que l'échelle elle-même.",
    },
  },
];
