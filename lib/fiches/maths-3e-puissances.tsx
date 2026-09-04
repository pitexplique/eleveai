// ─── Fiche de cours : puissances et écriture scientifique (3e) ────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/puissances.bank.ts, notionId `entier_puissance`, 59 items).
//
// ⭐⭐ CE CHAPITRE NAÎT EN 3e : aucune micro `entier_puissance_*` n'existe en 4e.
// Mesuré avant d'écrire, comme pour `fonction_generalite` et `litteral_calcul` —
// c'était le critère qui a décidé de l'ordre d'écriture des fiches de 3e. Aucun
// risque de recopier un cours de 4e ici : il n'y en a pas.
//
// ⭐⭐ LES DEUX PREMIERS DESSINS SONT L'ÉTYMOLOGIE, ET ILS FONT LE COURS. Un
// élève écrit « au carré » et « au cube » pendant des années sans savoir que ce
// sont des figures. $5^2$ EST l'aire d'un carré de côté 5 ; $5^3$ EST le volume
// d'un cube de côté 5. Le dire coûte deux dessins et règle d'un coup l'erreur la
// plus fréquente de la banque — $2^3 = 6$ — car personne ne croit qu'un cube de
// côté 2 contienne 6 petits cubes.
//
// ⭐⭐ ET LA DERNIÈRE PROPRIÉTÉ SE DÉMONTRE PAR UN DESSIN, PAS PAR UNE PHRASE.
// `entier_puissance_defi` demande « explique pourquoi $2^3 \times 2^4 = 2^7$
// mais $2^3 + 2^4$ n'est pas égal à $2^7$ ». Une phrase ne convainc personne ;
// quatre barres, si. $2^3 = 8$ et $2^4 = 16$ font 24, tandis que $2^7 = 128$ —
// et sur le diagramme, la barre de la somme est un cinquième de l'autre. Aucune
// règle d'addition ne pourrait combler cet écart.
//
// ⭐ LES 59 ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE — la règle du 31/08, née de
// l'arbre de probabilités inventé en 4e :
//   entier_puissance_comprendre  → n facteurs égaux, le mot « exposant », a^1
//   entier_puissance_calculer    → 2³, 5², et le signe de (−2)² contre (−2)³
//   entier_puissance_dix         → 10^n, 10^−2, et le compte des zéros
//   entier_puissance_ecriture_scientifique → a × 10^n avec 1 ⩽ a < 10
//   entier_puissance_calcul      → a^m × a^n, a^m ÷ a^n, (a^m)^n
//   entier_puissance_defi        → ce qui est faux, ET ce qui est vrai
//
// ⚠️ LES EXPOSANTS NÉGATIFS SONT DANS LE PÉRIMÈTRE. La banque demande $10^{-2}$
// et l'écriture scientifique de $0{,}004$. La fiche les traite donc, mais
// seulement en base dix — c'est là que le programme les emploie.
//
// ⛔ UN PIÈGE DE LA BANQUE EST UNE ÉGALITÉ VRAIE. « Un élève écrit
// $2^3 \times 3^3 = 6^3$. A-t-il raison ? » — OUI. Les bases diffèrent mais
// l'exposant est commun, et $8 \times 27 = 216 = 6^3$. La fiche le dit
// explicitement : un élève entraîné à répondre « non » à toutes les questions de
// cette forme se ferait piéger, et la banque compte là-dessus.
//
// ⚠️ LES LIBELLÉS DES DESSINS PORTENT DES EXPOSANTS UNICODE (², ³, ⁷) et non du
// LaTeX : ils sont tracés en <text> SVG, où `$2^3$` s'afficherait en clair.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut porter du LaTeX. Les libellés
 * À L'INTÉRIEUR du dessin restent en écriture simple.
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

export const fichePuissances3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "entier-puissance",
  titre: "Puissances et écriture scientifique",
  accroche:
    "La Terre et la Lune sont séparées d'environ 384 000 kilomètres, et un virus mesure 0,000 000 1 mètre. Écrire ces deux nombres à la main est pénible et se relit mal : on compte les zéros du doigt. Les puissances de dix règlent la question — $3{,}84 \\times 10^5$ et $10^{-7}$ — et rendent d'un coup d'œil comparable ce qui ne l'était pas.",
  identite: [
    { label: "L'écriture", valeur: "$a^n$, c'est $a$ multiplié $n$ fois par lui-même" },
    { label: "Le mot", valeur: "$n$ s'appelle l'exposant ; $a$ est la base" },
    { label: "Le piège", valeur: "$2^3$ vaut 8, jamais 6 : ce n'est pas $2 \\times 3$" },
  ],
  definition: {
    texte:
      "Pour un nombre $a$ et un entier $n$ supérieur ou égal à 1, la puissance $a^n$ est le produit de $n$ facteurs tous égaux à $a$ : $5^3 = 5 \\times 5 \\times 5 = 125$. Le nombre $a$ s'appelle la base, et $n$ l'exposant. On lit « $5$ exposant $3$ », ou « $5$ au cube ». Deux cas particuliers se retiennent : $a^1 = a$, et $a^0 = 1$ pour tout $a$ non nul.",
  },
  figure: {
    schema: (
      <CanvasRenderer
        figure={
          {
            kind: "solide_3d",
            solide: "cube",
            // ⛔ LA GÉOMÉTRIE DE CE CANVAS EST CODÉE EN DUR, en coordonnées
            // absolues : la face avant va jusqu'à x = 222, la face arrière
            // jusqu'à 270, et l'étiquette de profondeur 24 px plus loin. Un
            // cadre de 222 rognait donc quatre « 5 ». Il lui faut ~310.
            size: { width: 310, height: 250 },
            dimensions: { cote: 5 },
            labels: { cote: "5" },
            display: { showLabels: true, showDimensions: true },
          } as never
        }
      />
    ),
    legende:
      "Le mot « cube » n'est pas une image : $5^3$ EST le volume de ce cube, dont les trois dimensions valent 5. C'est pourquoi $2^3$ ne peut pas valoir 6 — un cube compte ses unités dans trois directions, pas dans une.",
  },
  proprietes: [
    {
      titre: "Carré et cube : les mots viennent des figures",
      texte:
        "$5^2$ se lit « 5 au carré » parce que c'est exactement l'aire d'un carré de côté 5 : $5 \\times 5 = 25$. De même $5^3$ est le volume d'un cube de côté 5. Au-delà de 3, il n'y a plus de figure et l'on dit simplement « exposant 4 ». Retenir cette origine évite la confusion avec la multiplication : $2^3$ compte des cubes, pas des paires.",
      schema: legende(
        <CanvasRenderer
          figure={
            {
              kind: "quadrilatere",
              size: { width: 222, height: 180 },
              points: {
                A: { x: 55, y: 150 },
                B: { x: 165, y: 150 },
                C: { x: 165, y: 40 },
                D: { x: 55, y: 40 },
              },
              labels: { A: "", B: "", C: "", D: "" },
              sideLabels: { AB: "5", BC: "5" },
              display: { showPoints: false, showLabels: false, showSides: true },
            } as never
          }
        />,
        "Deux côtés de 5, et l'aire vaut $5 	imes 5$ : c'est $5^2$."
      ),
      micros: ["entier_puissance_comprendre"],
    },
    {
      titre: "Calculer une puissance, et surveiller le signe",
      texte:
        "On écrit le produit en entier, puis on calcule : $2^5 = 2 \\times 2 \\times 2 \\times 2 \\times 2 = 32$. Quand la base est négative, elle s'écrit ENTRE PARENTHÈSES, et le signe du résultat dépend de la parité de l'exposant : un nombre pair de facteurs négatifs donne un résultat positif, un nombre impair un résultat négatif. Ainsi $(-2)^2 = 4$ mais $(-2)^3 = -8$.",
      schema: legende(
        tableau({
          headers: ["écriture", "produit", "résultat"],
          rows: [
            { values: ["2³", "2 × 2 × 2", "8"] },
            { values: ["(−2)²", "(−2) × (−2)", "4"] },
            { values: ["(−2)³", "(−2)³ en entier", "−8"] },
          ],
          highlight: { row: 1 },
          caption: "exposant pair : résultat positif",
        }),
        "Écrire $(-2)^2 = -4$ est faux : deux facteurs négatifs donnent un produit positif."
      ),
      micros: ["entier_puissance_calculer"],
    },
    {
      titre: "Les puissances de dix se comptent en zéros",
      texte:
        "$10^n$ s'écrit avec un 1 suivi de $n$ zéros : $10^3 = 1\\,000$. L'exposant EST le nombre de zéros, ce qui rend ces puissances immédiates. Un exposant négatif fait l'inverse : $10^{-2} = 0{,}01$, c'est-à-dire un 1 placé à la deuxième décimale. Multiplier par $10^n$ déplace la virgule de $n$ rangs vers la droite, et par $10^{-n}$ de $n$ rangs vers la gauche.",
      schema: legende(
        tableau({
          headers: ["puissance", "écriture décimale"],
          rows: [
            { values: ["10³", "1 000"] },
            { values: ["10¹", "10"] },
            { values: ["10⁰", "1"] },
            { values: ["10⁻²", "0,01"] },
          ],
          caption: "l'exposant compte les rangs",
        }),
        "En descendant d'un exposant, on divise par 10 — et cela continue sous zéro."
      ),
      micros: ["entier_puissance_dix"],
    },
    {
      titre: "L'écriture scientifique : un seul chiffre avant la virgule",
      texte:
        "Un nombre est en écriture scientifique lorsqu'il s'écrit $a \\times 10^n$ où $a$ possède UN SEUL chiffre non nul avant la virgule — autrement dit $1 \\leqslant a < 10$ — et où $n$ est un entier relatif. Ainsi $5\\,600 = 5{,}6 \\times 10^3$. L'écriture $42 \\times 10^3$ désigne le même genre de nombre mais n'est PAS scientifique, car 42 en a deux. Cette contrainte n'est pas un caprice : elle rend l'écriture unique, donc deux nombres comparables d'un coup d'œil.",
      schema: legende(
        tableau({
          headers: ["écriture", "scientifique ?"],
          rows: [
            { values: ["5,6 × 10³", "oui"] },
            { values: ["42 × 10³", "non : 42 ⩾ 10"] },
            { values: ["0,56 × 10⁴", "non : 0,56 < 1"] },
            { values: ["4 × 10⁻³", "oui"] },
          ],
          highlight: { row: 1 },
          caption: "un seul chiffre avant la virgule",
        }),
        "La règle porte sur $a$ seul : l'exposant, lui, peut être négatif."
      ),
      micros: ["entier_puissance_ecriture_scientifique"],
    },
    {
      titre: "Multiplier, diviser, élever encore",
      texte:
        "Trois règles suffisent, et toutes se retrouvent en comptant les facteurs. Pour un produit de MÊME base, les exposants s'ajoutent : $a^3 \\times a^4 = a^7$, parce qu'il y a 3 puis 4 facteurs, donc 7 en tout. Pour un quotient, ils se soustraient : $\\dfrac{a^5}{a^2} = a^3$. Et une puissance de puissance les multiplie : $(a^2)^3 = a^6$, car on prend trois fois deux facteurs.",
      schema: legende(
        tableau({
          headers: ["opération", "règle", "exemple"],
          rows: [
            { values: ["produit", "on ajoute", "a³ × a⁴ = a⁷"] },
            { values: ["quotient", "on soustrait", "a⁵ ÷ a² = a³"] },
            { values: ["puissance", "on multiplie", "(a²)³ = a⁶"] },
          ],
          caption: "même base, toujours",
        }),
        "⛔ La base ne change JAMAIS : écrire $2^2 \\times 2^3 = 4^5$ revient à la multiplier aussi."
      ),
      micros: ["entier_puissance_calcul"],
    },
    {
      titre: "Pourquoi l'addition ne suit aucune règle",
      texte:
        "Les trois règles précédentes valent pour la multiplication et la division. L'addition, elle, n'en a aucune : $2^3 + 2^4$ ne vaut ni $2^7$ ni $4^7$. On ne peut que calculer chaque terme — $8 + 16 = 24$ — alors que $2^7$ vaut 128. L'écart est tel qu'aucune règle ne pourrait les rapprocher, et le diagramme le montre mieux qu'un raisonnement.",
      schema: legende(
        <CanvasRenderer
          figure={
            {
              kind: "stat_graph",
              graphType: "barres",
              size: { width: 222, height: 180 },
              data: [
                { label: "2³", value: 8 },
                { label: "2⁴", value: 16 },
                { label: "somme", value: 24 },
                { label: "2⁷", value: 128 },
              ],
              display: { showValues: true, showLabels: true, highlightIndex: 3 },
            } as never
          }
        />,
        "La somme atteint 24 quand $2^7$ vaut 128 : cinq fois plus."
      ),
      micros: ["entier_puissance_defi"],
    },
    {
      titre: "Et une égalité qui, elle, est vraie",
      texte:
        "Toutes les égalités surprenantes ne sont pas fausses. $2^3 \\times 3^3 = 6^3$ est EXACTE : les bases diffèrent, mais l'exposant est commun, et l'on peut alors regrouper les bases — $8 \\times 27 = 216$, qui est bien $6^3$. Répondre « non » par réflexe à toute question de cette forme est donc une mauvaise stratégie : c'est la structure de l'écriture qu'il faut regarder, pas son air suspect.",
      schema: legende(
        tableau({
          headers: ["égalité", "vraie ?"],
          rows: [
            { values: ["2² × 2³ = 2⁵", "oui : même base"] },
            { values: ["2³ × 3³ = 6³", "oui : même exposant"] },
            { values: ["2² × 2³ = 4⁵", "non"] },
            { values: ["10³ + 10² = 10⁵", "non"] },
          ],
          caption: "regarder ce qui est commun",
        }),
        "Même base, on ajoute les exposants ; même exposant, on peut multiplier les bases."
      ),
      micros: ["entier_puissance_defi", "entier_puissance_calcul"],
    },
  ],
  reel: {
    texte:
      "Tout ce qui est très grand ou très petit se dit en puissances de dix. La distance Terre-Lune vaut environ $3{,}84 \\times 10^5$ kilomètres, le diamètre d'un virus $10^{-7}$ mètre, et le disque d'un ordinateur se compte en $10^{12}$ octets. L'intérêt n'est pas d'écrire plus court, il est de COMPARER : entre $10^{-7}$ et $10^{-9}$, l'œil voit immédiatement un facteur cent, là où « 0,000 000 1 » et « 0,000 000 001 » demandent de compter les zéros deux fois. À La Réunion, le piton de la Fournaise culmine à $2{,}63 \\times 10^3$ mètres — et le fond marin qui le porte descend à $4 \\times 10^3$ mètres sous la surface : la montagne est donc bien plus haute qu'elle n'en a l'air.",
  },
  historique: {
    texte:
      "Vers 250 avant notre ère, Archimède écrit « L'Arénaire » pour répondre à une question qui paraissait absurde : combien de grains de sable faudrait-il pour remplir l'univers ? Le problème n'était pas de compter, mais d'ÉCRIRE le résultat — la numération grecque s'arrêtait à la myriade, dix mille. Archimède invente donc un système d'ordres successifs, chacun étant la myriade de myriades du précédent, et parvient à exprimer un nombre que nous noterions $10^{63}$. C'est le premier texte connu qui traite les très grands nombres comme des objets manipulables plutôt que comme un infini vague. L'écriture $a^n$, elle, ne viendra qu'avec Descartes en 1637.",
  },
  formule: {
    contexte: "L'écriture scientifique d'un nombre",
    expression: "$a \\times 10^n \\qquad \\text{avec} \\qquad 1 \\leqslant a < 10$",
    legende:
      "Le nombre $a$ porte les chiffres significatifs, l'exposant $n$ porte l'ordre de grandeur. La condition sur $a$ rend l'écriture UNIQUE : sans elle, $5\\,600$ pourrait s'écrire $56 \\times 10^2$, $5{,}6 \\times 10^3$ ou $0{,}56 \\times 10^4$, et deux nombres ne se compareraient plus d'un coup d'œil.",
    schema: legende(
      tableau(
        {
          headers: ["nombre", "écriture scientifique"],
          rows: [
            { values: ["5 600", "5,6 × 10³"] },
            { values: ["384 000", "3,84 × 10⁵"] },
            { values: ["0,004", "4 × 10⁻³"] },
          ],
          caption: "un seul chiffre devant la virgule",
        },
        "formule"
      ),
      "On déplace la virgule jusqu'à n'avoir qu'un chiffre devant, et l'exposant compte les rangs franchis."
    ),
  },
  methode: [
    {
      titre: "Devant une puissance : écrire le produit",
      texte:
        "Tant que l'exposant est petit, on écrit les facteurs. C'est plus long de trois secondes et cela interdit l'erreur $2^3 = 6$, qui vient toujours d'avoir calculé de tête sans regarder ce que l'écriture demandait.",
      micros: ["entier_puissance_comprendre", "entier_puissance_calculer"],
    },
    {
      titre: "Avant d'appliquer une règle : vérifier ce qui est commun",
      texte:
        "Les exposants ne s'ajoutent QUE si la base est la même. On regarde donc d'abord les bases : identiques, on applique la règle ; différentes, on vérifie si c'est l'exposant qui est commun ; ni l'un ni l'autre, on calcule chaque puissance séparément.",
      micros: ["entier_puissance_calcul"],
    },
    {
      titre: "Passer en écriture scientifique",
      texte:
        "On place la virgule juste après le premier chiffre non nul. Puis on compte les rangs franchis : vers la gauche l'exposant est positif, vers la droite il est négatif. Contrôle immédiat — le nombre $a$ obtenu doit être compris entre 1 et 10.",
      micros: ["entier_puissance_ecriture_scientifique"],
    },
    {
      titre: "Contrôler par l'ordre de grandeur",
      texte:
        "Avant d'écrire un résultat, on se demande s'il est plausible : $3{,}84 \\times 10^5$ vaut quelques centaines de milliers. Une erreur d'un rang se voit alors tout de suite, alors qu'elle passe inaperçue dans une suite de zéros.",
      micros: ["entier_puissance_ecriture_scientifique", "entier_puissance_dix"],
    },
  ],
  usages: [
    {
      titre: "On me demande de calculer une puissance",
      detail:
        "J'écris le produit des facteurs, puis je calcule. Si la base est négative, je la mets entre parenthèses et je regarde la parité de l'exposant.",
      micros: ["entier_puissance_calculer"],
    },
    {
      titre: "On me demande de simplifier un produit de puissances",
      detail:
        "Je vérifie que la base est la même, puis j'ajoute les exposants. La base, elle, ne bouge pas.",
      micros: ["entier_puissance_calcul"],
    },
    {
      titre: "On me donne un grand ou un petit nombre",
      detail:
        "Je le passe en écriture scientifique : un seul chiffre avant la virgule, et l'exposant compte les rangs déplacés.",
      micros: ["entier_puissance_ecriture_scientifique"],
    },
    {
      titre: "On me donne une écriture scientifique",
      detail:
        "Je fais l'inverse : je déplace la virgule de $n$ rangs, vers la droite si l'exposant est positif, vers la gauche s'il est négatif.",
      micros: ["entier_puissance_ecriture_scientifique", "entier_puissance_dix"],
    },
    {
      titre: "On me demande si une égalité est vraie",
      detail:
        "Je regarde ce qui est commun — la base, ou l'exposant — et je calcule les deux membres si je doute. Une addition de puissances se calcule toujours terme à terme.",
      micros: ["entier_puissance_defi"],
    },
  ],
  exemples: [
    {
      titre: "La distance Terre-Lune",
      donnees: "La Lune est à environ 384 000 kilomètres de la Terre.",
      question: "Écrire cette distance en écriture scientifique.",
      solution:
        "On place la virgule juste après le premier chiffre non nul, le 3 : cela donne $3{,}84$. On compte ensuite les rangs franchis pour revenir au nombre de départ — de $3{,}84$ à $384\\,000$, la virgule se déplace de cinq rangs vers la droite — donc l'exposant vaut 5. La distance s'écrit $3{,}84 \\times 10^5$ kilomètres. Contrôle : $3{,}84$ est bien compris entre 1 et 10, l'écriture est donc scientifique.",
      schema: legende(
        tableau(
          {
            headers: ["étape", "écriture"],
            rows: [
              { values: ["départ", "384 000"] },
              { values: ["virgule placée", "3,84"] },
              { values: ["rangs comptés", "3,84 × 10⁵"] },
            ],
            highlight: { row: 2 },
            caption: "cinq rangs vers la droite",
          },
          "exemple"
        ),
        "L'exposant compte les rangs, pas les zéros du nombre de départ."
      ),
      micros: ["entier_puissance_ecriture_scientifique"],
    },
    {
      titre: "Un produit de puissances",
      donnees: "L'expression $2^2 \\times 2^3$.",
      question: "L'écrire sous la forme d'une seule puissance, puis la calculer.",
      solution:
        "Les deux bases sont égales à 2 : les exposants s'ajoutent, donc $2^2 \\times 2^3 = 2^5$. On calcule ensuite : $2^5 = 32$. Le contrôle direct confirme — $4 \\times 8 = 32$. Écrire $4^5$ serait faux : cela reviendrait à multiplier aussi les bases, alors que la règle ne touche qu'aux exposants.",
      micros: ["entier_puissance_calcul"],
    },
    {
      titre: "Un nombre plus petit que 1",
      donnees: "Le nombre $0{,}004$.",
      question: "L'écrire en écriture scientifique.",
      solution:
        "Le premier chiffre non nul est le 4 ; on place la virgule juste après, ce qui donne simplement 4. Pour revenir à $0{,}004$, il faut déplacer la virgule de trois rangs vers la GAUCHE : l'exposant est donc négatif, et vaut $-3$. Le nombre s'écrit $4 \\times 10^{-3}$. Contrôle : $10^{-3} = 0{,}001$, et $4 \\times 0{,}001 = 0{,}004$.",
      micros: ["entier_puissance_ecriture_scientifique", "entier_puissance_dix"],
    },
    {
      titre: "Deux égalités, une vraie et une fausse",
      donnees: "Un élève écrit $10^3 + 10^2 = 10^5$, puis $2^3 \\times 3^3 = 6^3$.",
      question: "Qu'en penser ?",
      solution:
        "La première est FAUSSE. Aucune règle ne concerne l'addition : il faut calculer chaque terme, $1\\,000 + 100 = 1\\,100$, alors que $10^5$ vaut $100\\,000$. Le résultat annoncé est donc près de cent fois trop grand — l'erreur n'est pas légère. La seconde est VRAIE. Les bases diffèrent, mais l'exposant est commun : on peut alors regrouper les bases, et $2^3 \\times 3^3 = (2 \\times 3)^3 = 6^3$. Vérification chiffrée : $8 \\times 27 = 216$, et $6^3 = 216$. La leçon tient en une phrase : ce n'est pas l'allure de l'égalité qui décide, c'est ce qui y est commun.",
      micros: ["entier_puissance_defi"],
    },
  ],
  pieges: [
    "Écrire $2^3 = 6$. Une puissance n'est pas une multiplication par l'exposant : $2^3 = 2 \\times 2 \\times 2 = 8$.",
    "Écrire $(-2)^2 = -4$. Deux facteurs négatifs donnent un produit positif : le résultat est $+4$. En revanche $(-2)^3 = -8$.",
    "Écrire $2^2 \\times 2^3 = 4^5$. Seuls les exposants s'ajoutent ; la base reste 2, donc $2^5$.",
    "Écrire $10^3 + 10^2 = 10^5$. Les règles ne valent que pour la multiplication et la division — une somme se calcule terme à terme.",
    "Présenter $42 \\times 10^3$ comme une écriture scientifique. Il faut UN SEUL chiffre non nul avant la virgule, donc $4{,}2 \\times 10^4$.",
    "Répondre « non » à toute égalité qui surprend : $2^3 \\times 3^3 = 6^3$ est vraie, car l'exposant y est commun.",
    "Confondre le nombre de zéros et l'exposant pour un nombre qui n'est pas une puissance de dix : $384\\,000$ ne s'écrit pas $384 \\times 10^3$ en écriture scientifique.",
  ],
  aRetenir: [
    "$a^n$ est le produit de $n$ facteurs égaux à $a$ — et $a^0 = 1$.",
    "$5^2$ est l'aire d'un carré de côté 5 ; $5^3$ le volume d'un cube de côté 5.",
    "$10^n$ s'écrit avec un 1 suivi de $n$ zéros ; $10^{-n}$ place le 1 au $n$-ième rang décimal.",
    "Même base : les exposants s'ajoutent pour un produit, se soustraient pour un quotient.",
    "$(a^m)^n = a^{m \\times n}$ — on multiplie les exposants.",
    "Une écriture scientifique s'écrit $a \\times 10^n$ avec $1 \\leqslant a < 10$.",
    "L'addition de deux puissances n'obéit à aucune règle : on calcule chaque terme.",
  ],
  entrainement: [
    {
      question: "Que signifie l'écriture $5^3$ ? Calculer sa valeur.",
      correction:
        "Elle signifie le produit de trois facteurs égaux à 5 : $5 \\times 5 \\times 5$, ce qui vaut 125. Le 3 s'appelle l'exposant, le 5 la base.",
      micros: ["entier_puissance_comprendre", "entier_puissance_calculer"],
    },
    {
      question: "Calculer $(-2)^3$.",
      correction:
        "$(-2) \\times (-2) \\times (-2)$. Les deux premiers donnent $+4$, que l'on multiplie par $-2$ : le résultat est $-8$. L'exposant est impair, donc le résultat est négatif.",
      micros: ["entier_puissance_calculer"],
    },
    {
      question: "Combien de zéros compte l'écriture décimale de $10^6$ ?",
      correction:
        "Six : $10^6 = 1\\,000\\,000$. L'exposant donne directement le nombre de zéros qui suivent le 1.",
      micros: ["entier_puissance_dix"],
    },
    {
      question: "Que vaut $10^{-2}$ ?",
      correction:
        "$0{,}01$. Un exposant négatif place le 1 au deuxième rang après la virgule — c'est aussi $\\dfrac{1}{100}$.",
      micros: ["entier_puissance_dix"],
    },
    {
      question: "Simplifier $a^3 \\times a^4$, avec $a$ non nul.",
      correction:
        "La base est la même, donc les exposants s'ajoutent : $a^7$. On le retrouve en comptant les facteurs — trois puis quatre font sept.",
      micros: ["entier_puissance_calcul"],
    },
    {
      question: "Simplifier $\\dfrac{a^5}{a^2}$, avec $a$ non nul.",
      correction:
        "Les exposants se soustraient : $a^{5-2} = a^3$. Deux des cinq facteurs du numérateur se simplifient avec ceux du dénominateur.",
      micros: ["entier_puissance_calcul"],
    },
    {
      question: "Simplifier $(a^2)^3$.",
      correction:
        "On prend trois fois un bloc de deux facteurs, soit six facteurs : $a^6$. Les exposants se multiplient.",
      micros: ["entier_puissance_calcul"],
    },
    {
      question: "Écrire $5\\,600$ en écriture scientifique.",
      correction:
        "On place la virgule après le 5 : $5{,}6$. Il faut trois rangs vers la droite pour retrouver $5\\,600$, donc $5{,}6 \\times 10^3$.",
      micros: ["entier_puissance_ecriture_scientifique"],
    },
    {
      question: "Pourquoi $42 \\times 10^3$ n'est-il pas une écriture scientifique ?",
      correction:
        "Parce que 42 n'est pas compris entre 1 et 10 : il porte deux chiffres avant la virgule. L'écriture correcte est $4{,}2 \\times 10^4$ — on a déplacé la virgule d'un rang, donc l'exposant a augmenté d'une unité.",
      micros: ["entier_puissance_ecriture_scientifique"],
    },
    {
      question:
        "Expliquer pourquoi $2^3 \\times 2^4 = 2^7$, mais $2^3 + 2^4$ n'est pas égal à $2^7$.",
      correction:
        "Dans le produit, on met bout à bout trois facteurs puis quatre facteurs : il y en a bien sept au total, d'où $2^7$. Dans la somme, rien ne se met bout à bout — on additionne deux résultats déjà calculés, $8 + 16 = 24$, alors que $2^7$ vaut 128. Aucune règle ne relie les exposants d'une addition.",
      micros: ["entier_puissance_defi"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=entier_puissance",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres — ce qui est de
// toute façon la bonne façon de projeter, puisque le prof LIT la diapositive à
// voix haute.

export const slidesPuissances3e: ClasseSlide[] = [
  {
    titre: "Écrire les très grands et les très petits",
    badge: "Ce qu'on va faire",
    section: {
      type: "objectif",
      phrase: "Trois cent quatre-vingt-quatre mille kilomètres",
      sousPhrase:
        "C'est la distance de la Terre à la Lune. Et un virus mesure zéro virgule zéro zéro zéro zéro zéro zéro un mètre. Écrire ces nombres à la main est pénible, et les comparer impossible sans compter les zéros du doigt.",
      encadre: {
        titre: "Ce que les puissances apportent",
        texte:
          "Trois virgule quatre-vingt-quatre fois dix puissance cinq, et dix puissance moins sept. Non pour écrire plus court, mais pour comparer d'un coup d'œil.",
      },
    },
  },
  {
    titre: "Le mot vient de la figure",
    badge: "L'origine",
    teinte: "essentiel",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au carré",
        contenu:
          "Cinq au carré, c'est l'aire d'un carré de côté cinq : vingt-cinq cases. Le mot n'est pas une image, c'est la figure elle-même.",
      },
      droite: {
        variante: "info",
        titre: "Au cube",
        contenu:
          "Cinq au cube, c'est le volume d'un cube de côté cinq : cent vingt-cinq petits cubes. Au-delà de trois, il n'y a plus de figure, et l'on dit simplement exposant quatre.",
      },
    },
  },
  {
    titre: "Deux puissance trois ne fait pas six",
    badge: "Le piège numéro un",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce que beaucoup écrivent",
        contenu:
          "Deux puissance trois égale six. On a multiplié la base par l'exposant, comme si l'écriture disait deux fois trois.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui est vrai",
        contenu:
          "Deux fois deux fois deux, donc huit. Et cela se voit : un cube de côté deux contient huit petits cubes, jamais six.",
      },
    },
  },
  {
    titre: "Le signe dépend de la parité",
    badge: "Les bases négatives",
    section: {
      type: "etapes",
      etapes: [
        "J'écris la base négative entre parenthèses, sans quoi le signe se perd.",
        "Je compte les facteurs : c'est l'exposant qui le dit.",
        "Un nombre pair de facteurs négatifs donne un résultat positif. Moins deux au carré vaut donc plus quatre.",
        "Un nombre impair donne un résultat négatif. Moins deux au cube vaut moins huit.",
      ],
    },
  },
  {
    titre: "Les puissances de dix",
    badge: "Le cas qui sert tout le temps",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "L'exposant compte les zéros",
          texte:
            "Dix puissance trois, c'est un suivi de trois zéros, donc mille. Aucun calcul à faire : on lit l'exposant.",
        },
        {
          titre: "Sous zéro, on descend",
          texte:
            "Dix puissance moins deux vaut zéro virgule zéro un. Le un se place au deuxième rang après la virgule.",
        },
        {
          titre: "Multiplier déplace la virgule",
          texte:
            "Multiplier par dix puissance n déplace la virgule de n rangs vers la droite ; par dix puissance moins n, vers la gauche.",
        },
      ],
    },
  },
  {
    titre: "L'écriture scientifique",
    badge: "La règle du chiffre unique",
    section: {
      type: "etapes",
      etapes: [
        "Je repère le premier chiffre non nul du nombre.",
        "Je place la virgule juste après lui : j'obtiens un nombre compris entre un et dix.",
        "Je compte les rangs franchis pour revenir au nombre de départ.",
        "Vers la gauche, l'exposant est positif ; vers la droite, il est négatif. Et je vérifie que le nombre devant est bien entre un et dix.",
      ],
    },
  },
  {
    titre: "Trois règles, et une seule condition",
    badge: "Calculer avec les puissances",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Un produit",
          texte:
            "Même base : les exposants s'ajoutent. a puissance trois fois a puissance quatre donne a puissance sept — trois facteurs, puis quatre.",
        },
        {
          titre: "Un quotient",
          texte:
            "Même base encore : les exposants se soustraient. a puissance cinq divisé par a puissance deux donne a puissance trois.",
        },
        {
          titre: "Une puissance de puissance",
          texte:
            "Les exposants se multiplient. a puissance deux, le tout au cube, donne a puissance six : trois fois deux facteurs.",
        },
      ],
    },
  },
  {
    titre: "Ce qui décide, c'est ce qui est commun",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Fausse",
        contenu:
          "Dix puissance trois plus dix puissance deux égale dix puissance cinq. L'addition n'obéit à aucune règle : mille plus cent font onze cents, pas cent mille.",
      },
      droite: {
        variante: "ok",
        titre: "Vraie, et elle surprend",
        contenu:
          "Deux puissance trois fois trois puissance trois égale six puissance trois. Les bases diffèrent, mais l'exposant est commun : huit fois vingt-sept font deux cent seize, et six au cube aussi.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce: "La Lune est à environ trois cent quatre-vingt-quatre mille kilomètres de la Terre.",
      question: "Écrire cette distance en écriture scientifique.",
      correction:
        "Le premier chiffre non nul est le trois. On place la virgule juste après : cela donne trois virgule quatre-vingt-quatre. Il faut ensuite compter les rangs pour revenir au nombre de départ — la virgule se déplace de cinq rangs vers la droite, donc l'exposant vaut cinq. La distance s'écrit trois virgule quatre-vingt-quatre fois dix puissance cinq kilomètres. Et on contrôle : le nombre devant vaut trois virgule quatre-vingt-quatre, il est bien compris entre un et dix. L'écriture est donc scientifique.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce: "On considère le nombre zéro virgule zéro zéro quatre.",
      question: "L'écrire en écriture scientifique.",
      indice: "Cherchez le premier chiffre non nul, et comptez les rangs dans l'autre sens.",
      correction:
        "Le premier chiffre non nul est le quatre. On place la virgule juste après : cela donne simplement quatre. Pour revenir au nombre de départ, la virgule doit se déplacer de trois rangs vers la gauche : l'exposant est donc négatif, et vaut moins trois. Le nombre s'écrit quatre fois dix puissance moins trois. Le contrôle est immédiat : dix puissance moins trois vaut zéro virgule zéro zéro un, et quatre fois cela donne bien zéro virgule zéro zéro quatre.",
    },
  },
];
