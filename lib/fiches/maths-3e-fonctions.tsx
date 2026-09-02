// ─── Fiche de cours : la notion de fonction (3e) ──────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/fonctions.bank.ts, notionId `fonction_generalite`, 62 items).
//
// ⭐⭐ LE PARTAGE AVEC LA FICHE DES FONCTIONS AFFINES EST LA DÉCISION CENTRALE,
// et il a été MESURÉ avant d'écrire une ligne. La 3e porte DEUX notions de
// fonctions, et rien dans leurs noms ne dit où passe la frontière :
//   `affine_fonction`     8 micros, toutes préfixées `affine_`
//   `fonction_generalite` 7 micros, toutes préfixées `fonction_`
// Aucun identifiant commun : les deux banques ne se marchent pas dessus. Mais
// les SUJETS, eux, se recouvraient dangereusement — « lire une image sur un
// graphique » existe des deux côtés.
// 👉 La ligne retenue : la fiche affine enseigne LA DROITE ET SES DEUX
// COEFFICIENTS ($a$ l'incline, $b$ la décale). Celle-ci enseigne LA FONCTION
// COMME PROCESSUS — un nombre entre, un nombre sort — et les deux gestes qui
// s'y opposent : l'image et l'antécédent.
//
// ⭐⭐ D'OÙ LA COURBE NON AFFINE, qui est le cœur de cette fiche et sa seule
// vraie différence. Sur une droite, tout nombre a exactement UN antécédent :
// un élève qui n'a jamais vu autre chose croit donc que « antécédent » est
// simplement « image à l'envers », et que les deux sont interchangeables. La
// banque pose pourtant la question de front (`fonction_vocabulaire` :
// « Combien d'antécédents un nombre peut-il avoir ? »). La hauteur d'un ballon
// lancé le règle en une image : la ligne des 6 mètres coupe la courbe DEUX
// fois, à 2 secondes et à 4 secondes. Un même résultat, deux départs. C'est
// indémontrable sur une droite.
// ⚠️ La courbe est tracée en `type: "points"` — une polyligne de valeurs
// RELEVÉES, pas une parabole. Le second degré n'est pas au programme de 3e, et
// un canvas qui dessinerait $x^2$ enseignerait au passage une notion de
// seconde. Une suite de mesures, elle, est exactement ce que le programme fait
// lire.
//
// ⭐ LES MICROS ET LEURS 62 ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE — la règle du
// 31/08, née de l'arbre de probabilités inventé en 4e. Tous les contextes de
// la fiche sortent de la banque, et ils sont déjà réunionnais :
//   fonction_vocabulaire     → le loueur de vélo, $f(2)$, l'unicité de l'image
//   fonction_image           → on remplace $x$, et on calcule
//   fonction_antecedent      → l'excursion payée 87 €, combien de personnes
//   fonction_tableau         → deux lignes, deux sens de lecture
//   fonction_graphique       → la lecture verticale puis horizontale
//   fonction_affine_lineaire → reconnaître le TYPE, sans les coefficients
//   fonction_defi            → les deux loueurs de jet-ski
//
// ⛔ CE QUE CETTE FICHE NE FAIT PAS, ET POURQUOI. Elle ne calcule ni
// coefficient directeur ni ordonnée à l'origine : c'est le sujet entier de la
// fiche affine, et le répéter ici ferait deux cours concurrents sur la même
// classe. La propriété « Linéaire ou affine » s'arrête donc à RECONNAÎTRE, et
// renvoie explicitement à l'autre fiche.

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
 * Le tableau de valeurs d'une fonction.
 * ⭐ Son champ `missing` dit lequel des deux gestes on demande : descendre vers
 * l'image, ou remonter vers l'antécédent. Aucun graphique ne sépare les deux
 * aussi nettement, parce qu'ici les deux lignes sont physiquement distinctes.
 */
const tableauValeurs = (
  xValues: number[],
  yValues: number[],
  missing: { type: "image" | "antecedent"; index: number } | undefined,
  consigne: string,
  bloc: "carte" | "exemple" = "carte",
  highlightIndex?: number
) => (
  <CanvasRenderer
    figure={{
      kind: "fonction_tableau",
      xValues,
      yValues,
      missing,
      highlightIndex,
      consigne,
      size: { width: bloc === "exemple" ? 200 : 222, height: 150 },
    }}
  />
);

/**
 * Le graphique d'une fonction.
 * ⚠️ LES PLAGES RESTENT COURTES, dans les DEUX directions. Le canvas trace une
 * ligne de grille par unité entière : une plage verticale de 0 à 80 dessinerait
 * quatre-vingt-une lignes dans une carte de 222 px. C'est la contrainte qui a
 * décidé des nombres de cette fiche — la comparaison des deux loueurs se joue
 * donc sur des tarifs à un chiffre, et les tarifs à deux chiffres de la banque
 * restent dans le texte des exemples, où rien ne se dessine.
 */
const graphe = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "fonctionGraphique",
        grille: true,
        size: {
          width: bloc === "exemple" ? 200 : 222,
          height: bloc === "exemple" ? 180 : 200,
        },
        ...data,
      } as never
    }
  />
);

/**
 * LA COURBE DE RÉFÉRENCE DE LA FICHE : la hauteur d'un ballon lancé sur la
 * plage de l'Hermitage, relevée seconde par seconde.
 *
 * ⭐ SES VALEURS SONT CHOISIES POUR QUE LA LECTURE TOMBE JUSTE, ET SUR UNE
 * GRADUATION ÉTIQUETÉE. La ligne des 6 mètres coupe EXACTEMENT deux fois, sur
 * deux entiers — 2 s et 4 s ; celle des 4 mètres aussi, à 1 s et 5 s. Un « à
 * peu près » ruinerait la démonstration : l'élève doit LIRE les deux
 * antécédents, pas les deviner. Et une valeur juste posée sur une graduation
 * SANS CHIFFRE ne se lit pas davantage — c'est pourquoi toutes les lectures de
 * la fiche tombent sur 4 ou 6, qui sont écrits.
 *
 * ⛔⛔ LES PLAGES NE SONT PAS UN CADRAGE, C'EST UN CALCUL — trois passes de
 * mesure le 02/09/2026, et deux fausses explications avant la bonne.
 * `fonctionGraphique` écrit ses abscisses 17 px SOUS l'axe horizontal et ses
 * ordonnées contre l'axe vertical, sans jamais vérifier qu'il reste de la
 * place. Ce qui a été observé, dans l'ordre :
 *   · 6..18 h pour 20..30 degrés : `ymin > 0` colle l'axe au bord inférieur du
 *     cadre, et les 13 abscisses tombent HORS du <svg>, qui les rogne. 28
 *     débordements aux deux largeurs.
 *   · −1..10 : l'axe remonte à 182 px, les chiffres finissent à 203 pour un
 *     cadre de 200. Toujours dehors, de trois pixels.
 *   · −2..6 : plus aucun débordement, mais le « 0 » des abscisses — que le
 *     canvas décale de 8 px vers la droite pour dégager l'axe — atterrit dans
 *     la colonne des ordonnées et percute le « −1 ».
 *
 * ⭐ CE QUI RÈGLE TOUT : UNE PLAGE VERTICALE ASSEZ LARGE POUR QUE LE PAS PASSE
 * À 2. Le canvas n'écrit un chiffre que tous les `ceil(16 ÷ écart)` crans ; au
 * delà de 13 unités de haut, l'écart tombe sous 16 px et il n'en écrit plus
 * qu'un sur deux. Les étiquettes deviennent alors −4, −2, 2, 4, 6, 8 : le
 * « ±1 » qui encombrait le coin N'EXISTE PLUS, et les ordonnées s'espacent de
 * 30 px au lieu de 15. Un défaut d'affichage réglé en ÉLARGISSANT le cadre,
 * c'est-à-dire par l'inverse du réflexe.
 * 👉 x[0, 6] et y[−4, 9] : vérifié propre dans les DEUX formats de bloc, la
 * carte de 222×200 et l'exemple de 200×180.
 *
 * ⚠️ Une hauteur négative n'a aucun sens physique, et c'est sans importance :
 * la courbe ne descend pas sous zéro. Le cadre est plus grand que la scène.
  */
const RELEVE_BALLON = [
  { x: 0, y: 0 },
  { x: 1, y: 4 },
  { x: 2, y: 6 },
  { x: 3, y: 8 },
  { x: 4, y: 6 },
  { x: 5, y: 4 },
  { x: 6, y: 0 },
];

const COURBE_BALLON = {
  xmin: 0,
  xmax: 6,
  ymin: -4,
  ymax: 9,
  courbes: [{ id: "h", type: "points", points: RELEVE_BALLON, couleur: "#0284c7" }],
};

export const ficheFonctions3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "fonction-generalite",
  titre: "Fonctions : image et antécédent",
  accroche:
    "Un loueur de vélo affiche ses tarifs à l'heure. Vous entrez un nombre d'heures, il en sort un prix. C'est exactement ce qu'est une fonction : une machine à un seul bouton, qui transforme un nombre en un autre. Tout le vocabulaire de ce chapitre — image, antécédent, $f(x)$ — sert à dire proprement dans quel SENS on traverse la machine.",
  identite: [
    { label: "L'écriture", valeur: "$f(x)$, qui se lit « $f$ de $x$ » — jamais « $f$ fois $x$ »" },
    { label: "Les deux mots", valeur: "$x$ est l'antécédent, $f(x)$ est son image" },
    { label: "Le piège", valeur: "Un nombre a UNE SEULE image, mais peut avoir PLUSIEURS antécédents" },
  ],
  definition: {
    texte:
      "Une fonction $f$ est un procédé qui, à un nombre, en associe UN SEUL autre. Si l'on part de $x$, le nombre obtenu se note $f(x)$ et s'appelle l'image de $x$ par $f$. En sens inverse, $x$ est appelé un antécédent de $f(x)$. L'écriture $f : x \\mapsto 2x + 3$ se lit « la fonction $f$ qui à $x$ associe $2x + 3$ » : elle décrit la machine, tandis que $f(4) = 11$ décrit un seul passage dedans.",
  },
  figure: {
    schema: tableauValeurs(
      [1, 2, 3, 4],
      [6, 12, 18, 24],
      undefined,
      "Location de vélo : x heures, et le prix en euros"
    ),
    legende:
      "La première ligne porte les nombres de départ, la seconde leurs images. Ici $f(3) = 18$ : trois heures de vélo coûtent 18 €.",
  },
  proprietes: [
    {
      titre: "Trois mots, et un seul sens de lecture",
      texte:
        "L'antécédent est ce qui ENTRE, l'image ce qui SORT. La notation $f(x)$ désigne toujours la sortie : dans $f(3) = 7$, le nombre 3 est l'antécédent et 7 est l'image. Dire « l'image de 7 est 3 » est donc faux — c'est la phrase inverse.",
      schema: legende(
        tableau({
          headers: ["on écrit", "ce que c'est"],
          rows: [
            { values: ["x", "l'antécédent : ce qui entre"] },
            { values: ["f(x)", "l'image : ce qui sort"] },
            { values: ["f(3) = 7", "3 entre, 7 sort"] },
          ],
          caption: "les parenthèses ne multiplient pas",
        }),
        "Le nom dépend de la place, pas de la valeur : un même nombre peut être image ici et antécédent ailleurs."
      ),
      micros: ["fonction_vocabulaire"],
    },
    {
      titre: "Calculer une image : on remplace",
      texte:
        "Pour obtenir $f(4)$ quand $f(x) = 2x + 3$, on remplace chaque $x$ par 4, puis on calcule : $2 \\times 4 + 3 = 11$. Donc $f(4) = 11$. Le calcul se fait dans l'ordre des priorités — la multiplication avant l'addition.",
      schema: legende(
        tableauValeurs(
          [1, 2, 3, 4],
          [6, 12, 18, 24],
          undefined,
          "L'image du nombre surligné",
          "carte",
          2
        ),
        "On part du haut, on descend : l'image de 3 est 18."
      ),
      micros: ["fonction_image"],
    },
    {
      titre: "L'antécédent : le chemin inverse",
      texte:
        "Chercher un antécédent de 12, c'est chercher quel nombre a 12 pour image — donc résoudre l'équation $f(x) = 12$. Avec $f(x) = 2x + 3$, cela donne $2x + 3 = 12$, puis $x = 4,5$. On ne remplace plus : on résout.",
      schema: legende(
        tableauValeurs(
          [1, 2, 3, 4],
          [6, 12, 18, 24],
          { type: "antecedent", index: 3 },
          "Quel nombre a 24 pour image ?"
        ),
        "On part du bas, on remonte : l'antécédent de 24 est 4."
      ),
      micros: ["fonction_antecedent"],
    },
    {
      titre: "Une seule image, mais plusieurs antécédents",
      texte:
        "C'est la dissymétrie du chapitre, et elle n'est pas un détail : un nombre de départ ne peut avoir qu'UNE image — sinon la machine ne serait pas fiable. En revanche, DEUX départs différents peuvent parfaitement donner le même résultat. Sur une droite non horizontale, cela n'arrive jamais ; sur une courbe quelconque, tout le temps.",
      schema: legende(
        graphe({
          ...COURBE_BALLON,
          misesEnEvidence: [
            { horizontale: { y: 6 } },
            { point: { x: 2, y: 6 } },
            { point: { x: 4, y: 6 } },
          ],
        }),
        "Le ballon était à 6 mètres à 2 secondes ET à 4 secondes : 6 a deux antécédents."
      ),
      micros: ["fonction_vocabulaire", "fonction_antecedent"],
    },
    {
      titre: "Le tableau de valeurs : deux lignes, deux rôles",
      texte:
        "La première ligne donne les nombres de départ, la seconde leurs images. Lire une image, c'est descendre d'une case ; chercher un antécédent, c'est remonter. Un tableau ne montre que quelques valeurs choisies : il ne dit rien de ce qui se passe entre deux colonnes.",
      schema: legende(
        tableau({
          headers: ["on cherche", "le geste"],
          rows: [
            { values: ["une image", "descendre depuis la ligne x"] },
            { values: ["un antécédent", "remonter depuis la ligne f(x)"] },
          ],
          caption: "deux lignes, deux sens",
        }),
        "Le tableau est une photographie de la fonction, pas la fonction entière."
      ),
      micros: ["fonction_tableau"],
    },
    {
      titre: "Lire une image sur un graphique",
      texte:
        "On repère $x$ sur l'axe horizontal, on monte jusqu'à la courbe, puis on lit à gauche sur l'axe vertical : c'est l'image. Pour un antécédent, on fait le trajet à l'envers — on part de l'axe vertical et on redescend sur l'axe horizontal.",
      schema: legende(
        graphe({
          ...COURBE_BALLON,
          misesEnEvidence: [
            { verticale: { x: 1 }, horizontale: { y: 4 }, point: { x: 1, y: 4 } },
          ],
        }),
        "À 1 seconde, on monte jusqu'à la courbe puis on lit à gauche : 4 mètres."
      ),
      micros: ["fonction_graphique"],
    },
    {
      titre: "Reconnaître une fonction linéaire ou affine",
      texte:
        "Une fonction linéaire s'écrit $f(x) = ax$ : sa courbe est une droite qui passe par l'origine, car $f(0) = 0$. Une fonction affine s'écrit $f(x) = ax + b$ : sa droite coupe l'axe vertical à la hauteur $b$. Toute fonction linéaire est donc affine — c'est le cas où $b$ vaut 0 — mais l'inverse est faux.",
      schema: legende(
        graphe({
          // ⚠️ Même contrainte que la courbe du ballon : les plages doivent
          // contenir zéro, sinon les axes se collent aux bords du cadre et
          // leurs graduations sont rognées.
          xmin: 0,
          xmax: 6,
          ymin: -4,
          ymax: 9,
          courbes: [
            { id: "lin", type: "lineaire", a: 2, couleur: "#0284c7" },
            { id: "aff", type: "affine", a: 1, b: 3, couleur: "#e11d48" },
          ],
        }),
        "La bleue part de zéro : elle est linéaire. La rose part de 3 : elle est affine seulement."
      ),
      micros: ["fonction_affine_lineaire"],
    },
  ],
  reel: {
    texte:
      "Presque tout tarif est une fonction. Un loueur de jet-ski à Saint-Gilles annonce un prix par heure : le nombre d'heures entre, le prix sort. La hauteur d'un ballon lancé sur la plage en est une aussi — la seconde entre, les mètres sortent — et c'est justement celle-là qui montre qu'un même résultat peut venir de deux instants différents. Comprendre les fonctions, c'est pouvoir répondre à deux questions opposées : « combien cela coûtera-t-il ? », et « avec ce budget, jusqu'où puis-je aller ? ». La seconde est presque toujours la vraie question.",
  },
  historique: {
    texte:
      "Le mot « fonction » est employé par Leibniz vers 1673, pour désigner des longueurs qui dépendent d'un point sur une courbe. L'écriture $f(x)$, elle, est due à Leonhard Euler en 1734 — et c'est cette notation, plus que l'idée, qui a fait basculer les mathématiques : en donnant un NOM à la machine, séparé de ses résultats, elle a permis de parler de la fonction elle-même, de la comparer à une autre, de l'étudier. Avant Euler, on décrivait des calculs ; après lui, on manipule des objets.",
  },
  formule: {
    contexte: "L'écriture d'une fonction, et celle d'un seul de ses résultats",
    expression: "f : x \\mapsto 2x + 3 \\qquad \\text{et} \\qquad f(4) = 11",
    legende:
      "À gauche, la machine tout entière : la flèche $\\mapsto$ se lit « a pour image ». À droite, un seul passage dedans. Les deux écritures parlent de la même fonction, mais la première la décrit et la seconde la fait travailler.",
    schema: legende(
      tableau(
        {
          headers: ["on écrit", "on lit"],
          rows: [
            { values: ["f : x ↦ 2x + 3", "f qui à x associe 2x + 3"] },
            { values: ["f(x) = 2x + 3", "l'image de x vaut 2x + 3"] },
            { values: ["f(4) = 11", "l'image de 4 est 11"] },
          ],
          caption: "trois écritures, une seule fonction",
        },
        "formule"
      ),
      "Trois écritures, une seule fonction."
    ),
  },
  methode: [
    {
      titre: "La première question : image ou antécédent ?",
      texte:
        "Avant tout calcul, regarder CE QUI EST DONNÉ. Si l'énoncé fournit le nombre de départ, on cherche une image : on remplace. S'il fournit le résultat, on cherche un antécédent : on résout une équation. Presque toutes les erreurs du chapitre viennent d'avoir tranché trop vite.",
      schema: legende(
        tableau({
          headers: ["on donne", "on cherche", "on fait"],
          rows: [
            { values: ["x", "l'image", "on remplace"] },
            { values: ["f(x)", "l'antécédent", "on résout"] },
          ],
          caption: "la donnée décide du geste",
        }),
        "Le mot « calcule » ne suffit pas : c'est la donnée qui indique le sens."
      ),
      micros: ["fonction_image", "fonction_antecedent"],
    },
    {
      titre: "Calculer une image sans se tromper de priorité",
      texte:
        "On écrit d'abord la substitution en entier, AVEC les parenthèses si le nombre est négatif : pour $f(x) = -2x + 5$ et $x = 3$, on écrit $-2 \\times 3 + 5$, ce qui donne $-6 + 5 = -1$. Sauter l'étape écrite est la source d'erreur la plus fréquente quand un signe moins traîne.",
      micros: ["fonction_image"],
    },
    {
      titre: "Vérifier un antécédent",
      texte:
        "Une fois $x$ trouvé, on le remet dans la fonction : elle doit redonner le nombre de départ. Si l'on cherchait l'antécédent de 12 et que la vérification donne 12, c'est juste. Cette vérification coûte une ligne et attrape toutes les erreurs de résolution.",
      micros: ["fonction_antecedent"],
    },
    {
      titre: "Lire un graphique : deux traits au crayon",
      texte:
        "On trace le trait vertical depuis l'axe horizontal jusqu'à la courbe, puis le trait horizontal jusqu'à l'axe vertical. Les deux traits laissés sur la copie montrent le raisonnement et évitent de lire une case de travers. Pour un antécédent, on commence par le trait horizontal.",
      micros: ["fonction_graphique"],
    },
  ],
  usages: [
    {
      titre: "On me donne le nombre de départ",
      detail:
        "C'est une image. On remplace $x$ par sa valeur dans l'expression, et on calcule. Exemple : combien coûtent 4 heures de vélo à 6 € l'heure ?",
      micros: ["fonction_image"],
    },
    {
      titre: "On me donne le résultat",
      detail:
        "C'est un antécédent. On écrit l'équation $f(x) = \\text{résultat}$, puis on la résout. Exemple : avec 30 €, combien d'heures de vélo puis-je louer ?",
      micros: ["fonction_antecedent"],
    },
    {
      titre: "On me donne un tableau",
      detail:
        "On cherche la colonne. Descendre depuis la ligne du haut donne une image ; remonter depuis la ligne du bas donne un antécédent.",
      micros: ["fonction_tableau"],
    },
    {
      titre: "On me donne une courbe",
      detail:
        "On lit. Vertical puis horizontal pour une image ; horizontal puis vertical pour un antécédent — et il peut y en avoir plusieurs.",
      micros: ["fonction_graphique"],
    },
    {
      titre: "On me demande de quel type est la fonction",
      detail:
        "On regarde l'expression. $ax$ seul : linéaire. $ax + b$ avec $b$ non nul : affine sans être linéaire. Ni l'un ni l'autre si $x$ apparaît autrement.",
      micros: ["fonction_affine_lineaire"],
    },
  ],
  exemples: [
    {
      titre: "Le food truck de Saint-Pierre",
      donnees: "Le prix de $x$ tacos est donné par $f(x) = 3x + 2$, en euros.",
      question: "Combien coûtent 5 tacos ?",
      solution:
        "On donne le nombre de départ, donc on cherche une image : on remplace. $f(5) = 3 \\times 5 + 2 = 15 + 2 = 17$. Cinq tacos coûtent 17 €. Contrôle rapide : $f(0) = 2$, ce qui correspond au montant fixe de la commande — c'est cohérent.",
      schema: legende(
        tableauValeurs(
          [1, 2, 3, 4],
          [5, 8, 11, 14],
          undefined,
          "Le prix pour x tacos, en euros",
          "exemple"
        ),
        "Chaque taco ajoute 3 € : les images montent de 3 en 3."
      ),
      micros: ["fonction_image", "fonction_tableau"],
    },
    {
      titre: "L'excursion payée d'avance",
      donnees: "Une excursion coûte $f(x) = 12x + 15$ euros pour $x$ personnes.",
      question: "Une famille a payé 87 €. Combien de personnes étaient-elles ?",
      solution:
        "Ici on donne le RÉSULTAT : on cherche donc un antécédent, et on résout. $12x + 15 = 87$, donc $12x = 72$, donc $x = 6$. Elles étaient 6. Vérification obligatoire : $12 \\times 6 + 15 = 72 + 15 = 87$. C'est bien le montant payé.",
      schema: legende(
        tableauValeurs(
          [4, 5, 6, 7],
          [63, 75, 87, 99],
          { type: "antecedent", index: 2 },
          "Quel nombre de personnes coûte 87 euros ?",
          "exemple"
        ),
        "On remonte depuis 87 : la colonne cherchée est celle de 6 personnes."
      ),
      micros: ["fonction_antecedent"],
    },
    {
      titre: "Deux loueurs de jet-ski",
      donnees:
        "Le premier facture $f(x) = 20x$ euros pour $x$ heures ; le second $g(x) = 15x + 10$.",
      question: "Pour 2 heures, lequel est le moins cher ? Et pour 4 heures ?",
      solution:
        "On calcule les deux images à chaque fois. Pour 2 heures : $f(2) = 40$ et $g(2) = 15 \\times 2 + 10 = 40$. Ils coûtent exactement pareil. Pour 4 heures : $f(4) = 80$ et $g(4) = 15 \\times 4 + 10 = 70$ : le second devient moins cher. Il n'y a donc pas de meilleure offre en soi — la réponse dépend de la durée, et 2 heures est précisément le moment où elles se valent. En dessous, le premier est plus avantageux ; au-dessus, le second.",
      micros: ["fonction_defi", "fonction_affine_lineaire"],
    },
    {
      titre: "Le ballon sur la plage",
      donnees:
        "La courbe donne la hauteur d'un ballon lancé sur la plage de l'Hermitage, seconde par seconde.",
      question: "À quels instants le ballon était-il à 4 mètres de haut ?",
      solution:
        "On part de 4 sur l'axe vertical, on trace l'horizontale, et on regarde COMBIEN DE FOIS elle coupe la courbe. Deux fois : à 1 seconde et à 5 secondes. Le nombre 4 a donc deux antécédents. C'est normal : le ballon monte, redescend, et repasse par les mêmes hauteurs. Répondre « 1 seconde » seul serait une réponse incomplète — et c'est l'erreur la plus fréquente de tout le chapitre.",
      schema: legende(
        graphe(
          {
            ...COURBE_BALLON,
            misesEnEvidence: [
              { horizontale: { y: 4 } },
              { point: { x: 1, y: 4 } },
              { point: { x: 5, y: 4 } },
            ],
          },
          "exemple"
        ),
        "Une horizontale, deux intersections : deux antécédents."
      ),
      micros: ["fonction_graphique", "fonction_antecedent"],
    },
  ],
  pieges: [
    "Lire $f(x)$ comme « $f$ fois $x$ ». Ce n'est pas une multiplication : les parenthèses désignent le nombre qu'on fait entrer dans la fonction.",
    "Confondre les deux mots. Dans $f(3) = 7$, l'image est 7 et l'antécédent est 3 — jamais l'inverse.",
    "Croire qu'un nombre n'a qu'un seul antécédent. C'est vrai sur une droite non horizontale, faux dès que la courbe monte puis redescend : il faut alors donner TOUTES les valeurs.",
    "Chercher une image alors qu'on demande un antécédent. Si l'énoncé fournit le prix payé et non la quantité, il faut résoudre une équation, pas remplacer.",
    "Oublier les parenthèses en substituant un nombre négatif : $-2 \\times (-3)$ vaut $+6$, et sauter l'écriture fait perdre le signe.",
    "Prendre le tableau de valeurs pour la fonction entière. Il n'en montre que quelques colonnes ; entre deux d'entre elles, on ne sait rien.",
  ],
  aRetenir: [
    "Une fonction associe à chaque nombre de départ UNE SEULE image.",
    "$x$ est l'antécédent, $f(x)$ est l'image : le nom dépend du sens de lecture.",
    "Calculer une image, c'est REMPLACER. Chercher un antécédent, c'est RÉSOUDRE.",
    "Un nombre peut avoir plusieurs antécédents — il faut les donner tous.",
    "Sur un graphique : vertical puis horizontal pour une image, l'inverse pour un antécédent.",
    "$f(x) = ax$ est linéaire et passe par l'origine ; $f(x) = ax + b$ est affine.",
  ],
  entrainement: [
    {
      question: "Soit $f(x) = 4x - 1$. Calcule $f(3)$.",
      correction:
        "On remplace $x$ par 3 : $4 \\times 3 - 1 = 12 - 1 = 11$. Donc $f(3) = 11$.",
      micros: ["fonction_image"],
    },
    {
      question: "Soit $f(x) = -2x + 5$. Quelle est l'image de 3 ?",
      correction:
        "On écrit la substitution en entier : $-2 \\times 3 + 5 = -6 + 5 = -1$. L'image de 3 est $-1$.",
      micros: ["fonction_image"],
    },
    {
      question: "On sait que $f(5) = 20$. Écris la phrase correcte avec les mots « image » et « antécédent ».",
      correction:
        "20 est l'image de 5 par $f$, et 5 est un antécédent de 20. L'ordre compte : ce qui est entre parenthèses entre dans la machine.",
      micros: ["fonction_vocabulaire"],
    },
    {
      question: "Soit $f(x) = 2x + 1$. Quel est l'antécédent de 9 ?",
      correction:
        "On donne le résultat, donc on résout : $2x + 1 = 9$, puis $2x = 8$, donc $x = 4$. Vérification : $2 \\times 4 + 1 = 9$. C'est juste.",
      micros: ["fonction_antecedent"],
    },
    {
      question:
        "Une randonnée guidée coûte $f(x) = 8x + 20$ euros pour $x$ personnes. Un groupe a payé 92 €. Combien était-il de personnes ?",
      correction:
        "On résout $8x + 20 = 92$, donc $8x = 72$, donc $x = 9$. Le groupe comptait 9 personnes. Vérification : $8 \\times 9 + 20 = 72 + 20 = 92$.",
      micros: ["fonction_antecedent"],
    },
    {
      question:
        "Dans un tableau de valeurs, que trouve-t-on sur la première ligne, et sur la seconde ?",
      correction:
        "Sur la première, les nombres de départ, c'est-à-dire les antécédents. Sur la seconde, leurs images. Descendre donne une image, remonter donne un antécédent.",
      micros: ["fonction_tableau"],
    },
    {
      question:
        "Dans un tableau, $x$ passe de 0 à 1 puis de 1 à 2, et l'image augmente de 3 à chaque fois en partant de 1. Quelle fonction correspond ?",
      correction:
        "L'image part de 1 pour $x = 0$ : c'est le montant fixe. Elle augmente de 3 par unité : c'est le coefficient. La fonction est $f(x) = 3x + 1$. Contrôle : $f(0) = 1$, $f(1) = 4$, $f(2) = 7$.",
      micros: ["fonction_tableau", "fonction_affine_lineaire"],
    },
    {
      question: "La courbe d'une fonction linéaire $f(x) = ax$ passe toujours par quel point ?",
      correction:
        "Par l'origine, le point de coordonnées $(0\\,;\\,0)$ — car $f(0) = a \\times 0 = 0$. C'est ce qui la distingue d'une fonction affine dont le $b$ n'est pas nul.",
      micros: ["fonction_affine_lineaire", "fonction_graphique"],
    },
    {
      question:
        "Sur une courbe, l'horizontale d'ordonnée 5 coupe le tracé en deux endroits. Que peut-on en conclure ?",
      correction:
        "Le nombre 5 possède deux antécédents : deux valeurs de départ différentes ont la même image. C'est impossible sur une droite non horizontale, mais courant sur une courbe qui monte puis redescend. La réponse doit donner les deux valeurs.",
      micros: ["fonction_antecedent", "fonction_graphique"],
    },
    {
      question:
        "Deux loueurs de vélo : $f(x) = 4x$ et $g(x) = 3x + 5$, en euros pour $x$ heures. Pour 3 heures, lequel est le moins cher ?",
      correction:
        "$f(3) = 12$ et $g(3) = 3 \\times 3 + 5 = 14$. Le premier est moins cher pour 3 heures. Attention : ce n'est pas vrai pour toutes les durées — pour 6 heures, $f(6) = 24$ contre $g(6) = 23$, et l'ordre s'inverse.",
      micros: ["fonction_defi"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=fonction_generalite",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres — ce qui est de
// toute façon la bonne façon de projeter, puisque le prof LIT la diapositive à
// voix haute.

export const slidesFonctions3e: ClasseSlide[] = [
  {
    titre: "Une machine à un seul bouton",
    badge: "Ce qu'on va comprendre",
    section: {
      type: "objectif",
      phrase: "Un nombre entre, un nombre sort",
      sousPhrase:
        "Un loueur de vélo : vous lui donnez un nombre d'heures, il vous rend un prix. Toute la difficulté du chapitre tient dans un seul mot — le SENS. Va-t-on de l'heure vers le prix, ou du prix vers l'heure ?",
      encadre: {
        titre: "Les deux mots à retenir aujourd'hui",
        texte:
          "Ce qui entre s'appelle l'antécédent. Ce qui sort s'appelle l'image. Et l'écriture f de x désigne toujours ce qui SORT.",
      },
    },
  },
  {
    titre: "f de x, pas f fois x",
    badge: "Le vocabulaire",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Comment ça se lit",
          texte:
            "f de x. Les parenthèses ne multiplient rien : elles disent quel nombre on fait entrer dans la machine.",
        },
        {
          titre: "Ce que dit f de 3 égale 7",
          texte:
            "Trois entre, sept sort. Donc sept est l'image de trois, et trois est un antécédent de sept.",
        },
        {
          titre: "La règle absolue",
          texte:
            "Un nombre de départ ne peut donner qu'un seul résultat. Sinon la machine ne serait pas fiable, et ce ne serait pas une fonction.",
        },
      ],
    },
  },
  {
    titre: "Calculer une image",
    badge: "On remplace",
    section: {
      type: "etapes",
      etapes: [
        "On lit l'expression de la fonction : f de x égale deux x plus trois.",
        "On remplace chaque x par le nombre demandé, ici quatre. On écrit deux fois quatre plus trois.",
        "On calcule en respectant les priorités : la multiplication d'abord, huit, puis l'addition, onze.",
        "On conclut par une phrase complète : l'image de quatre est onze.",
      ],
    },
  },
  {
    titre: "Chercher un antécédent",
    badge: "On résout",
    teinte: "essentiel",
    section: {
      type: "objectif",
      phrase: "Cette fois, on connaît la sortie",
      sousPhrase:
        "On ne remplace plus rien : on écrit une équation. Chercher l'antécédent de douze, c'est chercher quel nombre a douze pour image.",
      encadre: {
        titre: "Le geste",
        texte:
          "Deux x plus trois égale douze. Donc deux x égale neuf, donc x égale quatre virgule cinq. Puis on vérifie en remettant le résultat dans la fonction.",
      },
    },
  },
  {
    titre: "Le piège du chapitre",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce que beaucoup croient",
        contenu:
          "Un nombre a un seul antécédent, comme il a une seule image. Les deux mots seraient donc symétriques.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui est vrai",
        contenu:
          "Une seule image, oui. Mais plusieurs antécédents, très souvent. Un ballon lancé passe à six mètres de haut à deux secondes ET à quatre secondes : deux instants, une même hauteur.",
      },
    },
  },
  {
    titre: "Lire un graphique",
    badge: "Deux traits au crayon",
    section: {
      type: "etapes",
      etapes: [
        "Pour une image : je repère le nombre sur l'axe horizontal.",
        "Je monte verticalement jusqu'à rencontrer la courbe.",
        "Je pars horizontalement vers la gauche et je lis la valeur : c'est l'image.",
        "Pour un antécédent, je fais exactement le trajet inverse — et je compte combien de fois l'horizontale coupe la courbe.",
      ],
    },
  },
  {
    titre: "Linéaire ou affine",
    badge: "Reconnaître le type",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Linéaire",
          texte:
            "Elle s'écrit a fois x, sans rien d'autre. Sa droite passe par l'origine, puisque l'image de zéro vaut zéro.",
        },
        {
          titre: "Affine",
          texte:
            "Elle s'écrit a fois x plus b. Sa droite coupe l'axe vertical à la hauteur b — le montant fixe, payé avant même de commencer.",
        },
        {
          titre: "Le lien entre les deux",
          texte:
            "Toute fonction linéaire est affine : c'est le cas où b vaut zéro. L'inverse est faux.",
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
        "Une excursion coûte douze euros par personne, plus quinze euros de frais fixes. La fonction est donc f de x égale douze x plus quinze.",
      question: "Une famille a payé quatre-vingt-sept euros. Combien de personnes étaient-elles ?",
      correction:
        "L'énoncé donne le montant payé, c'est-à-dire le RÉSULTAT : on cherche donc un antécédent, et on résout. Douze x plus quinze égale quatre-vingt-sept. On enlève quinze des deux côtés : douze x égale soixante-douze. On divise par douze : x égale six. Elles étaient six. La vérification tient en une ligne, et elle n'est pas facultative : douze fois six font soixante-douze, plus quinze, quatre-vingt-sept euros. C'est bien la somme payée.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce:
        "Deux loueurs de jet-ski. Le premier facture vingt euros par heure. Le second facture quinze euros par heure, plus dix euros de mise à l'eau.",
      question: "Pour deux heures, lequel est le moins cher ? Et pour quatre heures ?",
      indice: "Calculez les deux prix à chaque durée, et comparez seulement ensuite.",
      correction:
        "Pour deux heures : le premier demande vingt fois deux, soit quarante euros. Le second demande quinze fois deux, trente, plus dix, soit quarante euros également. Ils coûtent exactement pareil. Pour quatre heures : le premier demande quatre-vingts euros, le second soixante euros plus dix, soit soixante-dix. Le second devient le moins cher. La conclusion est la vraie leçon : il n'existe pas de meilleure offre en soi. Deux heures est le moment de bascule. En dessous, le premier est avantageux ; au-dessus, c'est le second.",
    },
  },
];
