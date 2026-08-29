// ─── Fiche de cours : dépendance entre deux grandeurs (4e) ─────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/fonctions.bank.ts, notionId fonction_dependance).
//
// ⭐ NOTION OUVERTE LE 28/08/2026. C'était LE PLUS GROS TROU de la classe :
// l'attendu « fonction » du BO était entièrement absent — dix puces, zéro micro.
//
// ⛔⛔ LA LIMITE EST LA SEULE PHRASE DES REPÈRES ANNUELS À NOMMER UNE ANNÉE :
// « La notation et le vocabulaire fonctionnels NE SONT PAS FORMALISÉS EN 4e. »
// Cette fiche n'écrit donc nulle part f(x), ni x ↦ f(x), ni « fonction
// linéaire », ni « fonction affine ». Elle ne pose même pas le mot « fonction »
// comme une définition à retenir — c'est pourquoi elle s'appelle « Dépendance
// entre deux grandeurs ». Le vocabulaire se formalisera en 3e.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les nombres de
// la fiche sortent de la banque :
//   fonction_reconnaitre    → le taxi : 4 € de prise en charge, 2 €/km
//   fonction_programme      → × 3 puis + 2 ; et le remonter à l'envers
//   fonction_tableau_lire   → les deux sens, avec le canvas dédié
//   fonction_graphique_lire → monter puis lire à gauche, ou l'inverse
//   fonction_changer_mode   → du programme au tableau, et retour
//   fonction_probleme       → la salle d'escalade, le club
//   fonction_defi           → deux offres, et des points alignés non proportionnels
//
// ⭐⭐ LE CONTRE-EXEMPLE PORTE LA FICHE, comme sur les fiches de géométrie. Le
// taxi dépend de la distance SANS lui être proportionnel : sans ce cas, l'élève
// range tout le chapitre dans la proportionnalité et s'y trompe toute l'année.
// Le second contre-exemple est graphique — des points parfaitement ALIGNÉS qui
// ne sont pas proportionnels, parce que la droite ne passe pas par l'origine.
//
// ⛔ `fonctionGraphique` N'EST PAS EMPLOYÉ DANS CETTE FICHE, et c'est délibéré.
// C'est un canvas à POINTS FIXES, comme `echelle` — mesuré le 28/08 : dans une
// carte large de 222 px, ses étiquettes sortent du cadre ou tombent sous les
// 11 px. Il reste PARFAIT dans le coach, où la zone de question fait le double,
// et `fonctions.bank.ts` l'y emploie dans ses deux gabarits de lecture
// graphique — avec ses `misesEnEvidence` qui tracent la verticale puis
// l'horizontale.
// 👉 Ici, le bloc « Un graphique aussi » décrit les DEUX TRAJETS de lecture
// dans un tableau, qui se rend en cellules HTML et suit son bloc sans rogner.
// C'est la leçon du 28/08 appliquée d'avance : la largeur du bloc décide, pas
// le canvas.
//
// ⭐ `fonction_tableau`, lui, se rend aussi en HTML : il passe partout, et il
// porte exactement le geste de la notion avec son champ `missing`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter une vraie fraction.
 * Les libellés À L'INTÉRIEUR du dessin, eux, restent en écriture simple — ils
 * sont tracés en <text> SVG, où le LaTeX s'afficherait en clair.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⚠️ LES LARGEURS SONT CELLES MESURÉES SUR TÉLÉPHONE DE 375 px : 222 px pour une
// carte de propriété, 216 px pour « La formule », 200 px pour un exemple.
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

// ⭐ LE CANVAS DÉDIÉ À LA LECTURE DANS LES DEUX SENS. Son champ `missing` dit
// lequel des deux gestes on demande : trouver la valeur qui correspond, ou
// retrouver celle dont on est parti.
const tableauValeurs = (
  xValues: number[],
  yValues: number[],
  missing: { type: "image" | "antecedent"; index: number } | undefined,
  consigne: string,
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={{
      kind: "fonction_tableau",
      xValues,
      yValues,
      missing,
      consigne,
      size: { width: bloc === "exemple" ? 200 : 222, height: 150 },
    }}
  />
);

export const ficheFonctions4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "fonction-dependance",
  titre: "Dépendance entre deux grandeurs",
  accroche:
    "Le prix d'une course de taxi dépend de la distance. La température d'un ballon d'eau dépend du temps de chauffe. Dans ces situations, connaître une grandeur suffit à déterminer l'autre — et il existe quatre façons de décrire ce lien : une phrase, un programme de calcul, un tableau, un graphique. Savoir passer de l'une à l'autre, c'est tout l'objet de cette fiche.",
  identite: [
    { label: "Le mot de 4e", valeur: "Dépendre : la première grandeur DÉTERMINE la seconde" },
    { label: "Les quatre modes", valeur: "Phrase · programme de calcul · tableau · graphique" },
    { label: "Le piège", valeur: "Dépendre n'est pas être proportionnel" },
  ],
  definition: {
    texte:
      "Une grandeur dépend d'une autre lorsque connaître la première SUFFIT à déterminer la seconde, sans ambiguïté. Le prix payé dépend de la masse de letchis achetée : 3 kg donnent toujours le même prix. La couleur des yeux ne dépend pas de l'âge : deux élèves du même âge peuvent avoir des yeux différents. ⚠️ La proportionnalité est un CAS PARTICULIER de dépendance, pas sa définition — le prix d'un taxi dépend de la distance sans lui être proportionnel.",
  },
  figure: {
    schema: tableau({
      headers: ["si je connais…", "je peux trouver…", "dépendance ?"],
      rows: [
        { values: ["la masse achetée", "le prix payé", "oui"] },
        { values: ["le côté d'un carré", "son aire", "oui"] },
        { values: ["l'âge d'un élève", "la couleur de ses yeux", "non"] },
      ],
      highlight: { col: 2 },
      caption: "connaître la première suffit-il ?",
    }),
    legende:
      "Le test tient en une question : deux résultats différents pourraient-ils correspondre à la même valeur de départ ? Si oui, il n'y a pas de dépendance.",
  },
  proprietes: [
    {
      titre: "Dépendre, c'est être déterminé par",
      micros: ["fonction_reconnaitre"],
      texte:
        "Ce n'est pas « varier en même temps ». La question est : connaître la première grandeur suffit-il à fixer la seconde ? Le prix d'un car dépend du nombre de places réservées. Le nombre de buts marqués ne dépend pas du numéro de maillot — deux joueurs portant le même numéro peuvent en marquer autant qu'ils veulent.",
      schema: tableau({
        headers: ["situation", "dépendance"],
        rows: [
          { values: ["prix selon la masse", "oui"] },
          { values: ["aire selon le côté", "oui"] },
          { values: ["pointure selon le prénom", "non"] },
        ],
        caption: "la première fixe-t-elle la seconde ?",
      }),
    },
    {
      titre: "Dépendre n'est pas être proportionnel",
      micros: ["fonction_reconnaitre"],
      texte:
        "Un taxi facture 4 € de prise en charge puis 2 € par kilomètre. Le prix dépend bien de la distance — une distance donnée fixe le prix — mais 2 km coûtent 8 € et 4 km en coûtent 12, ce qui n'est pas le double. ⭐ C'est la prise en charge qui casse la proportionnalité : un trajet de 0 km coûte déjà 4 €.",
      schema: tableau({
        headers: ["distance", "prix", "le double ?"],
        rows: [
          { values: ["0 km", "4 €", "—"] },
          { values: ["2 km", "8 €", "—"] },
          { values: ["4 km", "12 €", "non : 16 €"] },
        ],
        highlight: { row: 2 },
        caption: "dépendant, mais pas proportionnel",
      }),
    },
    {
      titre: "Un programme de calcul décrit une dépendance",
      micros: ["fonction_programme"],
      texte:
        "« Choisis un nombre, multiplie-le par 3, ajoute 2 » : à chaque nombre de départ correspond un seul résultat. C'est la façon la plus concrète de décrire un lien. ⚠️ L'ORDRE fait partie de la règle : multiplier puis ajouter ne donne pas la même chose qu'ajouter puis multiplier.",
      schema: tableau({
        headers: ["on part de", "× 3", "+ 2"],
        rows: [
          { values: ["1", "3", "5"] },
          { values: ["2", "6", "8"] },
          { values: ["5", "15", "17"] },
        ],
        caption: "un seul résultat par nombre de départ",
      }),
    },
    {
      titre: "Un tableau se lit dans les deux sens",
      micros: ["fonction_tableau_lire"],
      texte:
        "De haut en bas, on trouve la valeur qui correspond : sous 3, on lit 11. De bas en haut, on cherche de quel nombre on est parti : 11 se trouve au-dessus de 3. ⭐ Le second sens est le plus difficile, parce qu'il faut CHERCHER au lieu de simplement lire.",
      schema: tableauValeurs(
        [1, 2, 3, 4, 5],
        [5, 8, 11, 14, 17],
        { type: "image", index: 2 },
        "que vaut la valeur pour 3 ?"
      ),
    },
    {
      titre: "Un graphique aussi",
      micros: ["fonction_graphique_lire"],
      texte:
        "Pour trouver la valeur qui correspond à 3 : on part de 3 sur l'axe du bas, on MONTE jusqu'au point, on lit à gauche. Pour le sens inverse : on part de la hauteur, on va HORIZONTALEMENT jusqu'au point, on descend. ⚠️ Confondre les deux trajets est l'erreur la plus fréquente.",
      schema: tableau({
        headers: ["je cherche", "je pars de", "je vais"],
        rows: [
          { values: ["la valeur", "l'axe du bas", "en haut, puis à gauche"] },
          { values: ["le départ", "l'axe de gauche", "à droite, puis en bas"] },
        ],
        highlight: { col: 2 },
        caption: "deux trajets inverses",
      }),
    },
    {
      titre: "Aligné ne veut pas dire proportionnel",
      micros: ["fonction_defi", "fonction_graphique_lire"],
      texte:
        "Sur un graphique, des points parfaitement alignés peuvent décrire une situation qui n'est PAS proportionnelle. Le test est ailleurs : la droite passe-t-elle par l'origine ? Si le prix vaut déjà 4 € pour 0 article, ce n'est pas proportionnel — même si tout est bien aligné.",
      schema: tableau({
        headers: ["pour 0", "alignés ?", "proportionnel ?"],
        rows: [
          { values: ["0", "oui", "oui"] },
          { values: ["4 €", "oui", "NON"] },
        ],
        highlight: { row: 1 },
        caption: "c'est le point à zéro qui décide",
      }),
    },
  ],
  reel: {
    texte:
      "Les dépendances non proportionnelles sont la règle dès qu'un abonnement entre en jeu, et c'est pour cela qu'elles méritent un chapitre. Une salle d'escalade à La Réunion demande une inscription puis un prix par séance ; un forfait téléphonique a une part fixe et une part variable ; un taxi a sa prise en charge. Dans chaque cas, la question utile n'est pas « quelle offre est la moins chère », mais « à partir de combien de séances l'abonnement devient-il rentable ». C'est exactement ce que permet de lire un tableau ou un graphique — et c'est le raisonnement qu'un adulte refait toute sa vie devant deux contrats.",
  },
  historique: {
    texte:
      "L'idée qu'une grandeur en détermine une autre est très ancienne — les tables babyloniennes de carrés et d'inverses, vers 1800 avant notre ère, en sont déjà des tableaux de valeurs. Mais le mot « fonction » est de Leibniz, à la fin du XVIIe siècle, et il désignait d'abord une longueur liée à un point d'une courbe. C'est Euler qui, en 1748, lui donne son sens moderne et introduit la notation qu'on utilise encore. Un siècle plus tard, Dirichlet en donne la définition la plus large : peu importe la formule, il suffit qu'à chaque valeur corresponde une valeur et une seule. C'est cette idée-là — et non la formule — que l'on installe en quatrième.",
  },
  formule: {
    contexte: "Pour décrire un lien entre deux grandeurs",
    expression: "une phrase · un programme de calcul · un tableau · un graphique",
    legende:
      "Quatre façons de dire la même chose. Savoir passer de l'une à l'autre est ce que demande le programme — et c'est aussi ce qui rend le lien utilisable : le tableau pour lire vite, le graphique pour comparer d'un coup d'œil, le programme pour calculer n'importe quelle valeur.",
    schema: tableau(
      {
        headers: ["mode", "ce qu'il donne vite"],
        rows: [
          { values: ["le programme", "n'importe quelle valeur"] },
          { values: ["le tableau", "les valeurs déjà calculées"] },
          { values: ["le graphique", "l'allure et les comparaisons"] },
        ],
        caption: "chaque mode a son usage",
      },
      "formule"
    ),
  },
  methode: [
    {
      titre: "Reconnaître une dépendance",
      micros: ["fonction_reconnaitre"],
      // ⛔ Le seul bloc sans dessin : la figure de référence et la première
      // propriété montrent déjà le test. Un schéma de plus redirait le texte.
      texte:
        "Une seule question : deux résultats différents pourraient-ils correspondre à la même valeur de départ ? Si oui, il n'y a pas de dépendance. Puis, séparément : est-ce proportionnel ? On le vérifie en regardant ce que vaut la seconde grandeur quand la première vaut zéro.",
    },
    {
      titre: "Suivre un programme, et le remonter",
      micros: ["fonction_programme"],
      texte:
        "Dans le sens direct, on applique les étapes DANS L'ORDRE. Dans le sens inverse — on connaît le résultat, on cherche le départ — on défait chaque étape par son opération contraire, en commençant par la DERNIÈRE.",
      schema: tableau({
        headers: ["sens", "on fait"],
        rows: [
          { values: ["direct", "× 3 puis + 2"] },
          { values: ["inverse", "− 2 puis ÷ 3"] },
        ],
        highlight: { row: 1 },
        caption: "à l'envers, et en sens contraire",
      }),
    },
    {
      titre: "Lire dans le bon sens",
      micros: ["fonction_tableau_lire", "fonction_graphique_lire"],
      texte:
        "On repère d'abord ce que l'énoncé DONNE. S'il donne la valeur de départ, on lit dans le sens direct. S'il donne le résultat, on cherche à l'envers. C'est la même distinction dans un tableau et sur un graphique.",
      schema: tableauValeurs(
        [1, 2, 3, 4, 5],
        [5, 8, 11, 14, 17],
        { type: "antecedent", index: 3 },
        "de quel nombre vient 14 ?"
      ),
    },
    {
      titre: "Passer d'un mode à l'autre",
      micros: ["fonction_changer_mode"],
      texte:
        "Du programme au tableau : on applique le programme à chaque valeur. Du tableau au programme : on regarde de combien la valeur augmente à chaque pas — c'est le facteur — puis ce qu'il faut ajouter. ⭐ Le contrôle est immédiat : la règle trouvée doit redonner TOUTES les colonnes, pas seulement une.",
      schema: tableau({
        headers: ["étape", "ce qu'on cherche"],
        rows: [
          { values: ["1", "l'augmentation par pas"] },
          { values: ["2", "ce qu'il faut ajouter"] },
          { values: ["3", "on vérifie sur toutes les colonnes"] },
        ],
        caption: "du tableau vers la règle",
      }),
    },
  ],
  usages: [
    {
      titre: "On connaît la valeur de départ",
      micros: ["fonction_programme", "fonction_tableau_lire"],
      detail:
        "On applique le programme, ou on lit le tableau de haut en bas. C'est le sens direct, le plus simple.",
    },
    {
      titre: "On connaît le résultat",
      micros: ["fonction_tableau_lire", "fonction_graphique_lire"],
      detail:
        "On remonte : on défait le programme à l'envers, ou on cherche dans la ligne du bas du tableau. Ce sens demande de chercher.",
    },
    {
      titre: "On doit comparer deux offres",
      micros: ["fonction_defi", "fonction_probleme"],
      detail:
        "On calcule les deux pour le nombre voulu. ⚠️ Il n'y a pas de meilleure offre en soi — la réponse change selon le nombre.",
    },
    {
      titre: "On se demande si c'est proportionnel",
      micros: ["fonction_reconnaitre"],
      detail:
        "On regarde la valeur pour zéro. Si elle n'est pas nulle, ce n'est pas proportionnel — même si tout paraît régulier.",
    },
  ],
  exemples: [
    {
      titre: "Le taxi",
      micros: ["fonction_reconnaitre", "fonction_programme"],
      donnees: "Un taxi facture 4 € de prise en charge, puis 2 € par kilomètre.",
      question: "Le prix dépend-il de la distance ? Lui est-il proportionnel ?",
      schema: tableau(
        {
          headers: ["distance", "prix"],
          rows: [
            { values: ["0 km", "4 €"] },
            { values: ["2 km", "8 €"] },
            { values: ["4 km", "12 €"] },
          ],
          highlight: { row: 0 },
        },
        "exemple"
      ),
      solution:
        "Le prix DÉPEND de la distance : une distance donnée fixe le prix, sans ambiguïté. Le programme est « multiplier par 2, puis ajouter 4 ».\n\nMais il n'est PAS proportionnel. Deux kilomètres coûtent $2 \\times 2 + 4 = 8$ € ; quatre kilomètres coûtent $4 \\times 2 + 4 = 12$ €. Or 12 n'est pas le double de 8.\n\n⭐ La raison se lit à zéro : un trajet de 0 km coûte déjà 4 €. Dans une situation proportionnelle, zéro donne toujours zéro.",
    },
    {
      titre: "Remonter le programme",
      micros: ["fonction_programme", "fonction_probleme"],
      donnees: "Un club demande 12 € d'adhésion, puis 3 € par sortie. Malik a payé 39 € en tout.",
      question: "Combien de sorties a-t-il faites ?",
      schema: tableau(
        {
          headers: ["étape", "calcul"],
          rows: [
            { values: ["on retire l'adhésion", "39 − 12 = 27"] },
            { values: ["on divise", "27 ÷ 3 = 9"] },
          ],
          highlight: { row: 1 },
        },
        "exemple"
      ),
      solution:
        "On connaît le résultat et on cherche le départ : il faut donc remonter le programme, en défaisant les étapes dans l'ordre INVERSE.\n\nOn retire d'abord l'adhésion : $39 - 12 = 27$ €. Puis on divise par le prix d'une sortie : $27 \\div 3 = 9$ sorties.\n\n⚠️ Diviser 39 par 3 directement donnerait 13, un résultat faux : l'adhésion ne se divise pas, elle se paie une seule fois.",
    },
    {
      titre: "Les deux offres",
      micros: ["fonction_defi", "fonction_changer_mode"],
      donnees: "Offre A : 6 € la séance, sans abonnement. Offre B : 20 € d'abonnement, puis 2 € la séance.",
      question: "Laquelle choisir pour 10 séances ?",
      schema: tableau(
        {
          headers: ["séances", "A", "B"],
          rows: [
            { values: ["1", "6 €", "22 €"] },
            { values: ["5", "30 €", "30 €"] },
            { values: ["10", "60 €", "40 €"] },
          ],
          highlight: { row: 1 },
        },
        "exemple"
      ),
      solution:
        "Pour 10 séances : A donne $10 \\times 6 = 60$ €, et B donne $20 + 10 \\times 2 = 40$ €. L'offre B est donc la moins chère.\n\n⭐ Mais la réponse dépend du nombre ! Pour 1 séance, A coûte 6 € et B en coûte 22. Le tableau montre le point de bascule : à 5 séances, les deux coûtent exactement 30 €.\n\nC'est tout l'intérêt du chapitre — il n'y a pas de meilleure offre en soi, il y a une meilleure offre POUR UN NOMBRE DONNÉ.",
    },
  ],
  pieges: [
    "Confondre dépendre et être proportionnel. Le prix d'un taxi dépend de la distance sans lui être proportionnel.",
    "Croire que des points alignés suffisent à prouver la proportionnalité. Il faut en plus que la droite passe par l'origine.",
    "Inverser l'ordre d'un programme de calcul. « × 3 puis + 2 » et « + 2 puis × 3 » ne décrivent pas le même lien.",
    "Remonter un programme sans défaire les étapes à l'envers. On commence par la DERNIÈRE opération.",
    "Diviser le total quand il contient une part fixe. Une adhésion se retire d'abord, elle ne se divise pas.",
    "Confondre les deux trajets de lecture graphique. Pour trouver la valeur, on monte puis on va à gauche ; pour le départ, on va à droite puis on descend.",
  ],
  aRetenir: [
    "Une grandeur dépend d'une autre quand connaître la première SUFFIT à déterminer la seconde.",
    "La proportionnalité est un cas particulier de dépendance, pas sa définition.",
    "Le test de la proportionnalité : que vaut la seconde grandeur quand la première vaut zéro ?",
    "Quatre modes décrivent un même lien : une phrase, un programme de calcul, un tableau, un graphique.",
    "Un tableau et un graphique se lisent dans les DEUX sens : trouver la valeur, ou retrouver le départ.",
    "Pour remonter un programme, on défait les étapes dans l'ordre inverse, en commençant par la dernière.",
    "Comparer deux offres n'a de sens que POUR UN NOMBRE DONNÉ — il existe souvent un point de bascule.",
  ],
  entrainement: [
    {
      micros: ["fonction_reconnaitre"],
      question: "L'aire d'un carré dépend-elle de la longueur de son côté ? Et la couleur d'une voiture dépend-elle de sa vitesse maximale ?",
      correction:
        "Oui pour la première : un côté donné fixe l'aire, sans ambiguïté. Non pour la seconde : deux voitures de même couleur peuvent avoir des vitesses très différentes.",
    },
    {
      micros: ["fonction_programme"],
      question: "Programme : choisis un nombre, multiplie par 4, ajoute 7. Que donne-t-il pour 6 ?",
      correction: "$6 \\times 4 = 24$, puis $24 + 7 = 31$.",
    },
    {
      micros: ["fonction_programme"],
      question: "Même programme (× 4 puis + 7). Le résultat vaut 43. De quel nombre est-on parti ?",
      correction:
        "On défait à l'envers : $43 - 7 = 36$, puis $36 \\div 4 = 9$. On est parti de 9.",
    },
    {
      micros: ["fonction_tableau_lire"],
      question: "Un tableau donne 5 ; 8 ; 11 ; 14 pour les valeurs 1 ; 2 ; 3 ; 4. Quelle valeur correspond à 3 ? Et de quel nombre vient 14 ?",
      correction:
        "Sous 3, on lit 11. Et 14 se trouve au-dessous de 4 : on part donc de 4. Le tableau se lit dans les deux sens.",
    },
    {
      micros: ["fonction_changer_mode"],
      question: "Un tableau donne 9 ; 14 ; 19 ; 24 pour 1 ; 2 ; 3 ; 4. Quel programme de calcul décrit ce lien ?",
      correction:
        "D'une colonne à la suivante, la valeur augmente de 5 : c'est le facteur. Pour 1 on obtient 9, or $1 \\times 5 = 5$, et il faut 4 de plus. Le programme est « multiplier par 5, puis ajouter 4 ». ⚠️ Ce n'est pas proportionnel : pour 0, la valeur serait 4.",
    },
    {
      micros: ["fonction_graphique_lire"],
      question: "Sur un graphique, comment trouve-t-on la valeur qui correspond à 4 ?",
      correction:
        "On part de 4 sur l'axe horizontal, on MONTE jusqu'au point, puis on lit à gauche sur l'axe vertical. Pour le sens inverse, le trajet est exactement l'opposé.",
    },
    {
      micros: ["fonction_probleme"],
      question: "Une salle demande 15 € d'inscription puis 4 € par séance. Combien coûtent 12 séances ?",
      correction:
        "$12 \\times 4 = 48$, puis $48 + 15 = 63$ €. ⚠️ Ce n'est pas proportionnel : 0 séance coûte déjà 15 €.",
    },
    {
      micros: ["fonction_defi"],
      question:
        "Offre A : 5 € la séance. Offre B : 24 € d'abonnement puis 2 € la séance. À partir de combien de séances B devient-elle plus intéressante ?",
      correction:
        "On cherche quand les deux coûtent pareil : A donne 5 fois le nombre de séances, B donne 24 plus 2 fois ce nombre. Pour 8 séances, A donne 40 € et B donne 40 € : c'est le point de bascule. À partir de 9 séances, B est moins chère.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesFonctions4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Dépendance entre deux grandeurs - 4e",
    section: {
      type: "objectif",
      phrase: "Connaître l'une suffit à trouver l'autre",
      sousPhrase:
        "Le prix d'une course de taxi dépend de la distance. La température d'un ballon dépend du temps de chauffe. Dans ces situations, une grandeur en détermine une autre.",
      encadre: {
        titre: "Le test",
        texte:
          "Deux résultats différents pourraient-ils correspondre à la même valeur de départ ? Si oui, il n'y a pas de dépendance.",
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
          "Dès qu'un abonnement entre en jeu — une salle d'escalade, un forfait, un taxi —, la bonne question n'est pas « quelle offre est la moins chère », mais « à partir de combien de séances l'abonnement devient rentable ». C'est le raisonnement qu'un adulte refait toute sa vie devant deux contrats.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les tables babyloniennes de carrés, vers 1800 avant notre ère, sont déjà des tableaux de valeurs. Mais c'est Dirichlet, au dix-neuvième siècle, qui en donne la définition la plus large : peu importe la formule, il suffit qu'à chaque valeur corresponde une valeur et une seule.",
      },
    },
  },
  {
    titre: "Le piège de l'année",
    badge: "Ce qui coûte des points",
    section: {
      type: "objectif",
      phrase: "Dépendre n'est pas être proportionnel",
      sousPhrase:
        "Un taxi facture 4 euros de prise en charge puis 2 euros du kilomètre. Deux kilomètres coûtent 8 euros, quatre kilomètres en coûtent 12 — ce n'est pas le double. Le prix dépend pourtant bien de la distance.",
      encadre: {
        titre: "Le test",
        texte:
          "On regarde ce que vaut la seconde grandeur quand la première vaut zéro. Ici, un trajet de zéro kilomètre coûte déjà 4 euros : ce n'est donc pas proportionnel.",
      },
    },
  },
  {
    titre: "Quatre façons de dire la même chose",
    badge: "Les modes de représentation",
    section: {
      type: "etapes",
      etapes: [
        "Une PHRASE : le prix vaut 4 euros plus 2 euros par kilomètre.",
        "Un PROGRAMME de calcul : multiplier par 2, puis ajouter 4.",
        "Un TABLEAU de valeurs : 0 donne 4, 2 donne 8, 4 donne 12.",
        "Un GRAPHIQUE : des points qu'on lit d'un coup d'œil.",
        "⭐ Savoir passer de l'un à l'autre, c'est exactement ce que demande le programme.",
      ],
    },
  },
  {
    titre: "Lire dans les deux sens",
    badge: "Le geste central",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "On donne le départ",
        contenu:
          "On lit le tableau de haut en bas, ou on monte depuis l'axe horizontal du graphique puis on lit à gauche. C'est le sens facile.",
      },
      droite: {
        variante: "info",
        titre: "On donne le résultat",
        contenu:
          "On cherche dans la ligne du bas et on remonte, ou on part de l'axe vertical et on va à droite puis on descend. Ce sens demande de chercher, pas seulement de lire.",
      },
    },
  },
  {
    titre: "Les 4 réflexes",
    badge: "La méthode",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Reconnaître une dépendance",
          texte:
            "Deux résultats différents pourraient-ils venir de la même valeur ? Puis, à part : est-ce proportionnel ? On regarde zéro.",
        },
        {
          titre: "Suivre un programme",
          texte:
            "Dans l'ordre écrit. Et pour le remonter, on défait chaque étape à l'envers, en commençant par la dernière.",
        },
        {
          titre: "Lire dans le bon sens",
          texte:
            "On repère ce que l'énoncé donne : le départ, ou le résultat. C'est ça qui décide du sens de lecture.",
        },
        {
          titre: "Changer de mode",
          texte:
            "Du tableau à la règle : on cherche l'augmentation par pas, puis ce qu'il faut ajouter. Et on vérifie sur toutes les colonnes.",
        },
      ],
    },
  },
  {
    titre: "Alignés, et pourtant pas proportionnels",
    badge: "Le second piège",
    section: {
      type: "objectif",
      phrase: "L'alignement ne suffit pas",
      sousPhrase:
        "Sur un graphique, des points parfaitement alignés peuvent décrire une situation qui n'est pas proportionnelle. Ce qui décide, c'est le point au-dessus de zéro.",
      encadre: {
        titre: "La règle",
        texte:
          "Il faut que la droite passe par l'origine. Si le prix vaut déjà 4 euros pour zéro article, ce n'est pas proportionnel.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "Un club demande 12 euros d'adhésion, puis 3 euros par sortie. Malik a payé 39 euros en tout.",
      question: "Combien de sorties a-t-il faites ?",
      correction:
        "On connaît le résultat, donc on remonte le programme à l'envers. On retire d'abord l'adhésion : 39 moins 12 égale 27 euros. Puis on divise par le prix d'une sortie : 27 divisé par 3, soit 9 sorties. Attention : diviser 39 par 3 directement donnerait 13, un résultat faux — l'adhésion ne se divise pas.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "Offre A : 5 euros la séance. Offre B : 24 euros d'abonnement, puis 2 euros la séance.",
      question: "À partir de combien de séances l'offre B devient-elle plus intéressante ?",
      indice: "Cherche d'abord le nombre de séances où les deux coûtent exactement pareil.",
      correction:
        "Pour 8 séances, A donne 40 euros et B donne 24 plus 16, soit 40 euros aussi : c'est le point de bascule. À partir de 9 séances, l'offre B est moins chère. Il n'y a donc pas de meilleure offre en soi — cela dépend du nombre de séances.",
    },
  },
];
