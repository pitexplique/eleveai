// ─── Fiche de cours : nombres premiers et décomposition (4e) ───────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/nombres-premiers.bank.ts, notionId nombre_premier).
//
// ⭐ NOTION OUVERTE LE 30/08/2026, sœur de `divisibilite`. La fracture est à
// SENS UNIQUE : décomposer un nombre en facteurs premiers a BESOIN des
// diviseurs et des critères, alors que reconnaître un multiple n'a aucun besoin
// des nombres premiers. Tout mettre ensemble aurait fait onze micros.
//
// ⭐⭐ LA NUANCE DU BO PORTE TOUTE LA FICHE : la LISTE des premiers s'arrête à
// 30 et c'est une CONNAISSANCE (4e-A-divisibilite-4) ; DÉTERMINER les premiers
// jusqu'à 100 est une COMPÉTENCE (4e-A-divisibilite-7). Retenir et savoir
// trouver sont deux gestes, donc deux micros — et la fiche les sépare
// explicitement, parce qu'un élève qui n'a que la liste ⩽ 30 ne sait pas dire
// si 91 est premier. Or 91 = 7 × 13.
//
// ⚠️ LA DÉCOMPOSITION EST BIEN AU PROGRAMME, et pas comme un extra : c'est une
// compétence associée du BO (4e-A-divisibilite-10), au même rang qu'« utiliser
// les critères » ou « simplifier une fraction », et les attendus de fin d'année
// de 4e sur eduscol la citent nommément.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE :
//   premier_definition  → la définition, la liste ⩽ 30, et le cas de 1
//   premier_determiner  → le crible, et surtout son POINT D'ARRÊT
//   premier_decomposer  → l'arbre, et l'emploi dans les fractions
//   premier_defi        → compter les diviseurs sans en lister aucun
//
// ⭐⭐ LE CONTRE-EXEMPLE PORTE LA FICHE, trois fois :
//   · 1 n'est pas premier — il n'a qu'UN diviseur, pas deux ;
//   · 91 a l'air premier et vaut 7 × 13 — c'est le piège de la liste ⩽ 30 ;
//   · 2 réfute presque toutes les fausses idées, puisqu'il est le seul pair.
//
// ⚠️ LE PGCD ET LE PPCM NE SONT PAS AU PROGRAMME DE 4e : ils arrivent en 3e,
// avec la notion `entier_arithmetique`. Les deux sigles ne sont pas prononcés.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter du LaTeX. Les
 * libellés À L'INTÉRIEUR du dessin, eux, restent en écriture simple.
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
 * La division euclidienne posée. ⚠️ Ce n'est PAS une potence : le canvas rend
 * du HTML et affiche le quotient et le reste dans deux cases. Il sert ici à
 * MONTRER LE RESTE NUL — c'est lui qui autorise à continuer la décomposition.
 */
const divisionPosee = (a: number, b: number, bloc: "carte" | "exemple" = "carte") => {
  const q = Math.floor(a / b);
  return (
    <CanvasRenderer
      figure={
        {
          kind: "calcul_pose",
          operation: "division",
          numbers: [String(a), String(b)],
          division: {
            dividende: String(a),
            diviseur: String(b),
            quotient: String(q),
            reste: String(a - b * q),
          },
          display: { showResult: true },
          size: { width: bloc === "exemple" ? 200 : 222 },
        } as never
      }
    />
  );
};

export const ficheNombresPremiers4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "nombre-premier",
  titre: "Nombres premiers et décomposition",
  accroche:
    "Certains nombres ne se cassent pas : 7, 13, 31 n'ont d'autres diviseurs qu'eux-mêmes et 1. Tous les autres se fabriquent en les multipliant, et d'une seule façon. C'est ce qui fait des nombres premiers les briques élémentaires de l'arithmétique — et ce qui rend la décomposition si utile pour simplifier, compter ou comparer.",
  identite: [
    { label: "La définition", valeur: "EXACTEMENT deux diviseurs : 1 et lui-même" },
    { label: "Ce qu'il faut savoir", valeur: "La liste jusqu'à 30 · et savoir TROUVER jusqu'à 100" },
    { label: "Le piège", valeur: "1 n'est pas premier, et 91 non plus — il vaut 7 × 13" },
  ],
  definition: {
    texte:
      "Un nombre premier est un entier qui a EXACTEMENT deux diviseurs : 1 et lui-même. 7 est premier, car aucun autre nombre ne le divise. 12 ne l'est pas, car 2, 3, 4 et 6 le divisent aussi. ⚠️ Le mot important est « exactement » : 1 n'a qu'UN seul diviseur — « 1 » et « lui-même » désignent ici le même nombre — donc 1 n'est pas premier. ⭐ Le plus petit nombre premier est 2, et c'est aussi le seul qui soit pair.",
  },
  figure: {
    schema: tableau({
      headers: ["nombre", "ses diviseurs", "premier ?"],
      rows: [
        { values: ["1", "1", "non : un seul"] },
        { values: ["2", "1 et 2", "OUI"] },
        { values: ["7", "1 et 7", "OUI"] },
        { values: ["12", "1,2,3,4,6,12", "non : six"] },
      ],
      highlight: { col: 2 },
      caption: "on compte les diviseurs",
    }),
    legende:
      "Tout se joue sur un décompte. Deux diviseurs exactement : le nombre est premier. Un seul, ou plus de deux : il ne l'est pas. C'est la seule définition à retenir, et elle règle aussi le cas de 1.",
  },
  proprietes: [
    {
      titre: "Exactement deux diviseurs, ni plus ni moins",
      micros: ["premier_definition"],
      texte:
        "Tout nombre entier plus grand que 1 possède au moins deux diviseurs : 1 et lui-même. Ceux qui n'en ont QUE ces deux-là sont les nombres premiers. ⚠️ Pour montrer qu'un nombre n'est pas premier, un seul autre diviseur suffit — inutile de tous les chercher.",
      schema: tableau({
        headers: ["combien de diviseurs", "alors"],
        rows: [
          { values: ["1 seul", "c'est 1 : pas premier"] },
          { values: ["exactement 2", "PREMIER"] },
          { values: ["3 ou plus", "pas premier"] },
        ],
        highlight: { row: 1 },
        caption: "le décompte décide",
      }),
    },
    {
      titre: "La liste jusqu'à 30, à connaître par cœur",
      micros: ["premier_definition"],
      texte:
        "2, 3, 5, 7, 11, 13, 17, 19, 23, 29 : dix nombres, et le programme demande de les savoir. ⚠️ Les faux amis les plus fréquents sont les multiples de 3 impairs — 9, 15, 21, 27 — qui n'ont pas l'air composés parce qu'ils sont impairs. Le critère par 3 les démasque en une seconde.",
      schema: tableau({
        headers: ["premiers ⩽ 30", "faux amis"],
        rows: [
          { values: ["2, 3, 5, 7", "9 = 3 × 3"] },
          { values: ["11, 13, 17, 19", "15 = 3 × 5"] },
          { values: ["23, 29", "21 = 3 × 7"] },
        ],
        highlight: { col: 1 },
        caption: "impair ne veut pas dire premier",
      }),
    },
    {
      titre: "Jusqu'à 100, quatre tests suffisent",
      micros: ["premier_determiner"],
      texte:
        "Les diviseurs vont par paires : si $d$ divise $n$, alors $n \\div d$ le divise aussi. Dans chaque paire, l'un des deux est au plus la racine carrée de $n$. ⭐ Pour un nombre inférieur à 100, il suffit donc de tester 2, 3, 5 et 7 — car $11^2 = 121$ dépasse déjà 100.",
      schema: tableau({
        headers: ["on teste", "car"],
        rows: [
          { values: ["2", "2² = 4 ⩽ 100"] },
          { values: ["3", "3² = 9 ⩽ 100"] },
          { values: ["5", "5² = 25 ⩽ 100"] },
          { values: ["7", "7² = 49 ⩽ 100"] },
          { values: ["11 : inutile", "11² = 121 > 100"] },
        ],
        highlight: { row: 4 },
        caption: "quatre tests, et on s'arrête",
      }),
    },
    {
      titre: "91 a l'air premier — il vaut 7 × 13",
      micros: ["premier_determiner"],
      texte:
        "Il est impair, il ne finit pas par 5, et $9 + 1 = 10$ n'est pas divisible par 3. Trois tests passent, et l'élève conclut trop vite. ⚠️ Le quatrième est celui qu'on oublie : $91 \\div 7 = 13$. C'est exactement pour ce genre de nombre que la liste jusqu'à 30 ne suffit pas, et que la MÉTHODE est demandée.",
      schema: legende(
        divisionPosee(91, 7),
        "$91 = 7 \\times 13$, reste 0 : il n'est pas premier",
      ),
    },
    {
      titre: "Toute décomposition est unique",
      micros: ["premier_decomposer"],
      texte:
        "Tout entier plus grand que 1 s'écrit comme un produit de nombres premiers, et d'UNE SEULE façon — à l'ordre près. $60 = 2 \\times 2 \\times 3 \\times 5$, et il n'existe aucune autre écriture. ⭐ C'est cette unicité qui interdit à 1 d'être premier : sinon on pourrait ajouter autant de 1 qu'on veut, et l'écriture ne serait plus unique.",
      schema: tableau({
        headers: ["on divise", "par", "il reste"],
        rows: [
          { values: ["60", "2", "30"] },
          { values: ["30", "2", "15"] },
          { values: ["15", "3", "5"] },
          { values: ["5", "5", "1"] },
        ],
        highlight: { row: 3 },
        caption: "60 = 2 × 2 × 3 × 5",
      }),
    },
    {
      titre: "La décomposition compte les diviseurs sans les lister",
      micros: ["premier_defi", "premier_decomposer"],
      texte:
        "Dans $12 = 2 \\times 2 \\times 3$, le facteur 2 apparaît deux fois et le 3 une fois. Pour fabriquer un diviseur, on choisit combien de fois on prend chacun : 0, 1 ou 2 fois le 2, et 0 ou 1 fois le 3. Cela fait $3 \\times 2 = 6$ diviseurs. ⭐ On les a comptés sans en écrire un seul.",
      schema: tableau({
        headers: ["facteur", "apparaît", "choix"],
        rows: [
          { values: ["2", "2 fois", "3"] },
          { values: ["3", "1 fois", "2"] },
          { values: ["total", "—", "3 × 2 = 6"] },
        ],
        highlight: { row: 2 },
        caption: "12 a bien 6 diviseurs",
      }),
    },
  ],
  reel: {
    texte:
      "Les nombres premiers ont longtemps passé pour la partie la plus inutile des mathématiques — le mathématicien anglais Hardy s'en félicitait encore en 1940, y voyant une science pure que rien ne pourrait salir. Trente-cinq ans plus tard, ils sont devenus la clé de tout ce qui se paie en ligne. Le chiffrement RSA, qui protège les connexions bancaires, repose sur un déséquilibre : multiplier deux très grands nombres premiers est instantané, mais retrouver ces deux facteurs à partir du produit demanderait des siècles à un ordinateur. Chacun peut donc publier le produit — c'est la clé publique — sans que personne ne puisse en déduire les facteurs, qui sont la clé privée. C'est exactement la décomposition en facteurs premiers de cette fiche, avec des nombres de plusieurs centaines de chiffres. Le cadenas d'un site marchand, un paiement sans contact, une messagerie chiffrée : tous reposent sur le fait qu'on sait multiplier bien mieux qu'on ne sait décomposer.",
  },
  historique: {
    texte:
      "Euclide démontre vers 300 avant notre ère qu'il existe une infinité de nombres premiers, et sa preuve tient en trois lignes qu'on comprend encore aujourd'hui : si la liste était finie, on multiplierait tous ses éléments et on ajouterait 1 ; le nombre obtenu ne serait divisible par aucun d'eux, ce qui est absurde. Ératosthène, bibliothécaire d'Alexandrie au siècle suivant, invente la méthode pour les trouver — on écrit tous les nombres, on garde 2 puis on barre ses multiples, on garde 3 puis on barre les siens, et ainsi de suite. C'est le crible qui porte son nom, et c'est encore la méthode enseignée. Le même Ératosthène avait mesuré la circonférence de la Terre à quelques pour cent près, en comparant l'ombre de deux bâtons dans deux villes éloignées. Les nombres premiers restent, vingt-trois siècles plus tard, un sujet de recherche ouvert : personne ne sait s'il existe une infinité de nombres premiers jumeaux — deux premiers séparés de 2, comme 11 et 13, ou 29 et 31.",
  },
  formule: {
    contexte: "Tout entier plus grand que 1",
    expression: "n = p_1 \\times p_2 \\times \\ldots \\times p_k",
    legende:
      "où chaque facteur est un nombre premier — et cette écriture est UNIQUE, à l'ordre près. C'est le théorème fondamental de l'arithmétique, et c'est lui qui fait des nombres premiers les briques élémentaires : tout nombre se construit avec, et d'une seule façon.",
    schema: tableau(
      {
        headers: ["nombre", "décomposition"],
        rows: [
          { values: ["36", "2 × 2 × 3 × 3"] },
          { values: ["60", "2 × 2 × 3 × 5"] },
          { values: ["97", "97 (déjà premier)"] },
        ],
        highlight: { row: 2 },
        caption: "un nombre premier est sa propre décomposition",
      },
      "formule"
    ),
  },
  methode: [
    {
      titre: "Décider si un nombre est premier",
      micros: ["premier_definition", "premier_determiner"],
      texte:
        "On teste les nombres premiers dont le carré ne dépasse pas le nombre : 2, 3, 5, 7 pour tout ce qui est inférieur à 100. Dès qu'une division tombe juste, c'est fini : le nombre n'est pas premier. Si les quatre échouent, il l'est.",
      schema: tableau({
        headers: ["pour 83", "résultat"],
        rows: [
          { values: ["par 2 ?", "non, il est impair"] },
          { values: ["par 3 ?", "8+3=11, non"] },
          { values: ["par 5 ?", "non, finit par 3"] },
          { values: ["par 7 ?", "83 = 7×11+6, non"] },
        ],
        highlight: { row: 3 },
        caption: "83 est premier",
      }),
    },
    {
      titre: "Construire le crible d'Ératosthène",
      micros: ["premier_determiner"],
      texte:
        "On écrit les nombres de 2 à 100. On entoure 2, puis on barre tous ses multiples. On entoure le plus petit nombre non barré — 3 — et on barre les siens. Puis 5, puis 7. ⭐ On s'arrête là : tout ce qui reste est premier, et il y en a 25.",
      schema: tableau({
        headers: ["on entoure", "on barre"],
        rows: [
          { values: ["2", "4, 6, 8, 10…"] },
          { values: ["3", "9, 15, 21…"] },
          { values: ["5", "25, 35, 55…"] },
          { values: ["7", "49, 77, 91"] },
        ],
        highlight: { row: 3 },
        caption: "après 7, tout ce qui reste est premier",
      }),
    },
    {
      titre: "Décomposer un nombre",
      micros: ["premier_decomposer"],
      texte:
        "On divise par le plus petit nombre premier possible, on recommence sur le quotient, et on s'arrête quand on tombe sur 1. ⚠️ Deux contrôles avant de conclure : chaque facteur doit être PREMIER, et leur produit doit redonner le nombre de départ.",
      schema: legende(
        divisionPosee(84, 2),
        "on commence par 2, puis on recommence sur 42",
      ),
    },
    {
      titre: "Simplifier une fraction par la décomposition",
      micros: ["premier_decomposer"],
      texte:
        "On décompose le numérateur et le dénominateur, puis on barre tous les facteurs communs. ⭐ C'est ici que la décomposition SERT vraiment : elle montre d'un coup tout ce qui peut se barrer, au lieu de simplifier par petits pas au hasard.",
      schema: tableau({
        headers: ["", "décomposition"],
        rows: [
          { values: ["84", "2 × 2 × 3 × 7"] },
          { values: ["126", "2 × 3 × 3 × 7"] },
          { values: ["reste", "2 / 3"] },
        ],
        highlight: { row: 2 },
        caption: "on barre 2, 3 et 7",
      }),
    },
    {
      titre: "Compter les diviseurs sans les lister",
      micros: ["premier_defi"],
      texte:
        "On décompose, on compte combien de fois chaque facteur premier apparaît, on ajoute 1 à chacun de ces comptes, et on multiplie le tout. Pour $36 = 2^2 \\times 3^2$ : $(2+1) \\times (2+1) = 9$ diviseurs.",
      schema: tableau({
        headers: ["36 =", "2×2×3×3"],
        rows: [
          { values: ["le 2 apparaît", "2 fois → 3 choix"] },
          { values: ["le 3 apparaît", "2 fois → 3 choix"] },
          { values: ["en tout", "3 × 3 = 9"] },
        ],
        highlight: { row: 2 },
        caption: "neuf diviseurs, sans en écrire un",
      }),
    },
  ],
  usages: [
    {
      titre: "On me demande si un nombre est premier",
      micros: ["premier_definition", "premier_determiner"],
      detail:
        "On teste 2, 3, 5 et 7 si le nombre est inférieur à 100. Une seule division juste suffit à conclure que non.",
    },
    {
      titre: "On me demande de décomposer un nombre",
      micros: ["premier_decomposer"],
      detail:
        "On divise par le plus petit premier possible, encore et encore, jusqu'à 1. Puis on vérifie en refaisant le produit.",
    },
    {
      titre: "On me demande de simplifier une fraction",
      micros: ["premier_decomposer"],
      detail:
        "On décompose le haut et le bas, et on barre les facteurs communs. Ce qui reste est irréductible.",
    },
    {
      titre: "On me demande combien un nombre a de diviseurs",
      micros: ["premier_defi"],
      detail:
        "On décompose, on ajoute 1 à chaque exposant, et on multiplie. Aucun diviseur n'a besoin d'être écrit.",
    },
  ],
  exemples: [
    {
      titre: "Le nombre qui a l'air premier",
      micros: ["premier_determiner"],
      donnees: "On demande si 91 est un nombre premier.",
      question: "Que répondre, et comment le justifier ?",
      schema: divisionPosee(91, 7, "exemple"),
      solution:
        "On teste les nombres premiers dont le carré ne dépasse pas 91 : 2, 3, 5 et 7.\n\nPar 2 : 91 est impair, non. Par 3 : $9 + 1 = 10$, qui n'est pas un multiple de 3, non. Par 5 : il ne finit ni par 0 ni par 5, non. Par 7 : $91 \\div 7 = 13$, sans reste — OUI.\n\n91 n'est donc pas premier : $91 = 7 \\times 13$.\n\n⚠️ Trois tests sur quatre passaient. C'est exactement pour ce genre de nombre que la liste jusqu'à 30 ne suffit pas et que le programme demande la MÉTHODE : un élève qui s'arrête après 5 conclut faux.",
    },
    {
      titre: "Décomposer 84",
      micros: ["premier_decomposer"],
      donnees: "On veut écrire 84 comme un produit de nombres premiers.",
      question: "Quelle est sa décomposition ?",
      schema: tableau(
        {
          headers: ["on divise", "par", "reste"],
          rows: [
            { values: ["84", "2", "42"] },
            { values: ["42", "2", "21"] },
            { values: ["21", "3", "7"] },
            { values: ["7", "7", "1"] },
          ],
          highlight: { row: 3 },
        },
        "exemple"
      ),
      solution:
        "On divise par le plus petit premier possible, à chaque étape.\n\n$84 \\div 2 = 42$, puis $42 \\div 2 = 21$. 21 n'est plus pair, on passe à 3 : $21 \\div 3 = 7$. Enfin 7 est premier, et $7 \\div 7 = 1$ : on s'arrête.\n\nDonc $84 = 2 \\times 2 \\times 3 \\times 7$.\n\n⭐ Contrôle : $2 \\times 2 = 4$, $4 \\times 3 = 12$, $12 \\times 7 = 84$. Le produit redonne bien le nombre de départ — et chaque facteur est premier. Sans ces deux vérifications, une décomposition n'est pas terminée.",
    },
    {
      titre: "Simplifier avec la décomposition",
      micros: ["premier_decomposer", "premier_defi"],
      donnees: "On veut rendre la fraction $\\dfrac{84}{126}$ irréductible.",
      question: "Quelle est la fraction simplifiée ?",
      schema: tableau(
        {
          headers: ["", "décomposition"],
          rows: [
            { values: ["84", "2 × 2 × 3 × 7"] },
            { values: ["126", "2 × 3 × 3 × 7"] },
          ],
          highlight: { row: 1 },
        },
        "exemple"
      ),
      solution:
        "On décompose les deux : $84 = 2 \\times 2 \\times 3 \\times 7$ et $126 = 2 \\times 3 \\times 3 \\times 7$.\n\nLes facteurs communs sont un 2, un 3 et un 7. On les barre en haut et en bas.\n\nIl reste $2$ au numérateur et $3$ au dénominateur : la fraction vaut $\\dfrac{2}{3}$.\n\n⭐ C'est là que la décomposition gagne du temps. En simplifiant au hasard, on aurait divisé par 2, puis par 3, puis par 7 — trois étapes, avec le risque de s'arrêter trop tôt et de rendre une fraction encore réductible. La décomposition montre TOUT ce qui se barre, d'un seul coup d'œil.",
    },
  ],
  pieges: [
    "Croire que 1 est premier. Il n'a qu'UN seul diviseur, alors que la définition en demande exactement deux.",
    "Croire que tous les nombres impairs sont premiers. 9, 15, 21 et 27 sont impairs et composés.",
    "Croire que tous les premiers sont impairs. 2 est premier et pair — c'est le seul, mais il suffit à réfuter.",
    "S'arrêter après avoir testé 2, 3 et 5. 91 passe ces trois tests et vaut pourtant 7 × 13.",
    "Tester tous les nombres jusqu'au nombre lui-même. Jusqu'à 100, quatre tests suffisent.",
    "Écrire 1 dans une décomposition. Il ne change rien au produit et détruit l'unicité de l'écriture.",
    "Oublier de vérifier que le produit redonne le nombre de départ. C'est le seul contrôle d'une décomposition.",
  ],
  aRetenir: [
    "Un nombre premier a EXACTEMENT deux diviseurs : 1 et lui-même.",
    "1 n'est pas premier : il n'en a qu'un seul.",
    "2 est le plus petit nombre premier, et le seul qui soit pair.",
    "La liste jusqu'à 30 est à connaître : 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.",
    "Jusqu'à 100, il suffit de tester 2, 3, 5 et 7 — car 11² = 121 dépasse déjà 100.",
    "Tout entier plus grand que 1 s'écrit comme un produit de nombres premiers, et d'une SEULE façon.",
    "Décomposer sert à simplifier une fraction d'un coup, au lieu de la simplifier par petits pas.",
    "Le nombre de diviseurs se lit sur la décomposition : on ajoute 1 à chaque exposant, et on multiplie.",
  ],
  entrainement: [
    {
      micros: ["premier_definition"],
      question: "Le nombre 1 est-il premier ? Justifie.",
      correction:
        "Non. Un nombre premier a exactement deux diviseurs, or 1 n'en a qu'un seul — « 1 » et « lui-même » désignent ici le même nombre.",
    },
    {
      micros: ["premier_definition"],
      question: "Dans la liste 17, 21, 23, 29, lequel n'est pas premier ?",
      correction:
        "21, car $21 = 3 \\times 7$. Il est impair, mais impair ne veut pas dire premier.",
    },
    {
      micros: ["premier_definition"],
      question: "Y a-t-il un nombre premier pair ? Lequel ?",
      correction:
        "Oui, un seul : 2. Tout autre nombre pair est divisible par 2, donc il a au moins trois diviseurs.",
    },
    {
      micros: ["premier_determiner"],
      question: "Le nombre 83 est-il premier ?",
      correction:
        "Oui. Il est impair, $8+3 = 11$ n'est pas multiple de 3, il ne finit pas par 0 ou 5, et $83 = 7 \\times 11 + 6$. Les quatre tests échouent, donc il est premier.",
    },
    {
      micros: ["premier_determiner"],
      question: "Le nombre 91 est-il premier ?",
      correction:
        "Non : $91 = 7 \\times 13$. C'est le piège classique — il passe les tests par 2, 3 et 5.",
    },
    {
      micros: ["premier_determiner"],
      question: "Jusqu'où faut-il tester pour savoir si un nombre inférieur à 100 est premier ?",
      correction:
        "Jusqu'à 7, car $11^2 = 121$ dépasse déjà 100. Quatre tests suffisent : 2, 3, 5 et 7.",
    },
    {
      micros: ["premier_decomposer"],
      question: "Décompose 60 en produit de facteurs premiers.",
      correction:
        "$60 = 2 \\times 2 \\times 3 \\times 5$. Contrôle : $2 \\times 2 \\times 3 \\times 5 = 60$, et chaque facteur est premier.",
    },
    {
      micros: ["premier_decomposer"],
      question: "Décompose 225.",
      correction:
        "225 est impair, mais $2+2+5 = 9$ : il est divisible par 3 et par 9. $225 = 3 \\times 3 \\times 5 \\times 5$.",
    },
    {
      micros: ["premier_decomposer"],
      question: "Rends $\\dfrac{90}{126}$ irréductible.",
      correction:
        "$90 = 2 \\times 3 \\times 3 \\times 5$ et $126 = 2 \\times 3 \\times 3 \\times 7$. On barre le 2 et les deux 3 : il reste $\\dfrac{5}{7}$.",
    },
    {
      micros: ["premier_defi"],
      question: "Le nombre 45 se décompose en 3 × 3 × 5. Combien a-t-il de diviseurs ?",
      correction:
        "Le 3 apparaît 2 fois, donc 3 choix ; le 5 apparaît 1 fois, donc 2 choix. En tout $3 \\times 2 = 6$ diviseurs — ce sont 1, 3, 5, 9, 15 et 45.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesNombresPremiers4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Nombres premiers et décomposition - 4e",
    section: {
      type: "objectif",
      phrase: "Les nombres qui ne se cassent pas",
      sousPhrase:
        "7, 13, 31 n'ont d'autres diviseurs qu'eux-mêmes et 1. Tous les autres se fabriquent en les multipliant — et d'une seule façon.",
      encadre: {
        titre: "La définition",
        texte:
          "Un nombre premier a EXACTEMENT deux diviseurs : 1 et lui-même. Tout se joue sur ce décompte.",
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
          "Tout ce qui se paie en ligne repose là-dessus. Multiplier deux très grands nombres premiers est instantané ; retrouver ces deux facteurs à partir du produit demanderait des siècles à un ordinateur. On peut donc publier le produit sans livrer les facteurs : c'est le chiffrement des sites bancaires.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Euclide a démontré vers trois cents avant notre ère qu'il y en a une infinité, en trois lignes. Et vingt-trois siècles plus tard, personne ne sait encore s'il existe une infinité de nombres premiers jumeaux — deux premiers séparés de deux, comme onze et treize.",
      },
    },
  },
  {
    titre: "Le cas de 1",
    badge: "Le piège de la définition",
    section: {
      type: "objectif",
      phrase: "1 n'est pas un nombre premier",
      sousPhrase:
        "Il faut EXACTEMENT deux diviseurs. Or 1 n'en a qu'un seul : « un » et « lui-même » désignent ici le même nombre.",
      encadre: {
        titre: "Et ce n'est pas arbitraire",
        texte:
          "Si on l'acceptait, la décomposition cesserait d'être unique : on pourrait écrire douze égale deux fois deux fois trois, ou un fois deux fois deux fois trois, et ainsi de suite sans fin.",
      },
    },
  },
  {
    titre: "Ce qu'il faut savoir, et ce qu'il faut savoir faire",
    badge: "Deux choses différentes",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "SAVOIR : jusqu'à 30",
        contenu:
          "Deux, trois, cinq, sept, onze, treize, dix-sept, dix-neuf, vingt-trois, vingt-neuf. Dix nombres, à connaître par cœur.",
      },
      droite: {
        variante: "info",
        titre: "SAVOIR FAIRE : jusqu'à 100",
        contenu:
          "Là, on ne récite plus, on cherche. Et quatre tests suffisent : deux, trois, cinq et sept — parce que onze au carré fait cent vingt et un, déjà au-delà.",
      },
    },
  },
  {
    titre: "Le nombre qui piège tout le monde",
    badge: "Ce qui coûte des points",
    section: {
      type: "objectif",
      phrase: "91 a l'air premier",
      sousPhrase:
        "Il est impair. Il ne finit pas par cinq. Neuf plus un font dix, qui n'est pas un multiple de trois. Trois tests passent — et l'élève conclut.",
      encadre: {
        titre: "Le quatrième test",
        texte:
          "Quatre-vingt-onze divisé par sept donne treize, sans reste. Quatre-vingt-onze égale sept fois treize. C'est pour lui que la méthode est demandée, et pas seulement la liste.",
      },
    },
  },
  {
    titre: "Décomposer, en quatre gestes",
    badge: "La méthode",
    section: {
      type: "etapes",
      etapes: [
        "On divise par le plus petit nombre premier possible.",
        "On recommence sur le quotient obtenu.",
        "On s'arrête quand on tombe sur un.",
        "⚠️ On vérifie DEUX choses : chaque facteur est premier, et le produit redonne le nombre de départ.",
        "⭐ Quatre-vingt-quatre égale deux fois deux fois trois fois sept.",
      ],
    },
  },
  {
    titre: "À quoi sert la décomposition",
    badge: "Deux emplois",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Simplifier une fraction",
          texte:
            "On décompose le haut et le bas, on barre tout ce qui est commun. D'un seul coup d'œil, au lieu de simplifier par petits pas.",
        },
        {
          titre: "Compter les diviseurs",
          texte:
            "On ajoute un à chaque exposant, et on multiplie. Trente-six a neuf diviseurs — sans en écrire un seul.",
        },
        {
          titre: "Comparer deux nombres",
          texte:
            "Deux nombres qui n'ont aucun facteur premier commun n'ont aucun diviseur commun autre que un.",
        },
        {
          titre: "Et l'unicité",
          texte:
            "Il n'existe qu'une seule décomposition par nombre, à l'ordre près. C'est ce qui fait des premiers les briques de tout le reste.",
        },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "On veut savoir si quatre-vingt-onze est un nombre premier.",
      question: "Que répondre, et comment le justifier ?",
      correction:
        "On teste les premiers dont le carré ne dépasse pas quatre-vingt-onze : deux, trois, cinq et sept. Par deux : il est impair, non. Par trois : neuf plus un font dix, qui n'est pas multiple de trois, non. Par cinq : il ne finit ni par zéro ni par cinq, non. Par sept : quatre-vingt-onze divisé par sept donne treize, sans reste — oui. Il n'est donc pas premier, et vaut sept fois treize. Trois tests sur quatre passaient : c'est pour ce genre de nombre que la méthode compte plus que la liste.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "On veut rendre la fraction quatre-vingt-quatre sur cent vingt-six irréductible.",
      question: "Quelle est la fraction simplifiée ?",
      indice: "Décompose le numérateur et le dénominateur, puis barre ce qui est commun.",
      correction:
        "Quatre-vingt-quatre égale deux fois deux fois trois fois sept. Cent vingt-six égale deux fois trois fois trois fois sept. Les facteurs communs sont un deux, un trois et un sept : on les barre. Il reste deux au numérateur et trois au dénominateur, soit deux tiers. En simplifiant au hasard, il aurait fallu trois étapes — et le risque de s'arrêter trop tôt.",
    },
  },
];
