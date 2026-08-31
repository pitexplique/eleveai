// ─── Fiche de cours : multiples, diviseurs et division euclidienne (4e) ────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/divisibilite.bank.ts, notionId divisibilite).
//
// ⭐ NOTION OUVERTE LE 30/08/2026. Avec sa sœur `nombre_premier`, elle ferme les
// DIX puces ouvertes du chapitre « Comprendre et utiliser les notions de
// divisibilité et de nombres premiers » — le plus gros bloc restant du
// programme de 4e.
//
// ⭐ QUATRE MICROS REPRENNENT LEURS IDENTIFIANTS DE LA 5e À L'IDENTIQUE :
// `div_multiple_diviseur`, `div_critere_2_5_10`, `div_critere_3_9`,
// `div_lister_diviseurs`. La progression verticale se lit en entier :
//   5e  multiples, diviseurs, critères, lister
//   4e  + division euclidienne, + problèmes
//   3e  + PGCD et PPCM (notion `entier_arithmetique`)
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les nombres
// de la fiche sortent de la banque :
//   div_multiple_diviseur → la relation dite dans les deux sens
//   div_critere_2_5_10    → les unités, et le chiffre qui manque
//   div_critere_3_9       → la somme des chiffres, et 6 qui réfute 3 ⇒ 9
//   div_euclidienne       → quotient et reste, et la condition 0 ⩽ r < b
//   div_lister_diviseurs  → la recherche par PAIRES
//   div_probleme          → les lots, et les bus qui se recroisent
//   div_defi              → les cinq critères d'un coup, le chiffre manquant
//
// ⭐⭐ LE CONTRE-EXEMPLE PORTE LA FICHE, deux fois :
//   · 6 est divisible par 3 mais pas par 9 — c'est lui qui montre que
//     l'implication ne marche que dans UN sens ;
//   · « 47 = 6 × 6 + 11 » est une égalité JUSTE et une division euclidienne
//     FAUSSE — c'est lui qui montre que la condition sur le reste est la
//     moitié de la définition, pas un détail.
//
// ⭐ LE CANVAS `calcul_pose` PORTE LA DIVISION EUCLIDIENNE avec son champ
// `division` — dividende, diviseur, quotient, reste.
// ⛔ CE N'EST PAS UNE POTENCE, et le vérifier au rendu a corrigé une fausse
// affirmation de la première version de cette fiche. En mode « division », le
// canvas rend du HTML — l'opération en gros, puis le quotient et le reste dans
// deux cases de couleur, et la ligne de vérification. Il MET EN FACE le
// quotient et le reste ; il ne montre pas la distribution. La légende dit donc
// ce qu'il fait, pas ce qu'on aurait aimé qu'il fasse.
// ⭐ Conséquence utile : rendu en HTML, il n'a pas de plancher de police à
// surveiller. Mesuré à 375 px : 12 px au minimum, aucun débordement.
//
// ⚠️ LE CRITÈRE PAR 4 N'EST PAS AU PROGRAMME et n'apparaît nulle part, pas même
// comme leurre. Le BO énonce 2, 3, 5, 9 dans les connaissances et 2, 3, 5, 9,
// 10 dans les compétences — un leurre enseigne autant qu'une bonne réponse.
//
// ⚠️ LE PGCD ET LE PPCM NE SONT PAS AU PROGRAMME DE 4e : ils arrivent en 3e.
// Les problèmes de lots et d'engrenages se résolvent donc en LISTANT, et la
// fiche ne prononce jamais les deux sigles.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter du LaTeX. Les
 * libellés À L'INTÉRIEUR du dessin, eux, restent en écriture simple — ils sont
 * tracés en <text> SVG, où le LaTeX s'afficherait en clair.
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
 * La division euclidienne posée : l'opération, puis le quotient et le reste
 * dans deux cases. ⚠️ Ce n'est PAS une potence — le canvas rend du HTML, et il
 * met en face le quotient et le reste au lieu de montrer la distribution.
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

export const ficheDivisibilite4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "divisibilite",
  titre: "Multiples, diviseurs et division euclidienne",
  accroche:
    "Savoir si une division tombe juste sans la poser : c'est ce que permettent les critères de divisibilité, et c'est ce qui rend possible de simplifier une fraction, de constituer des lots sans reste, ou de prévoir quand deux bus se recroiseront. En quatrième, la division euclidienne donne un nom à ce qui reste quand ça ne tombe pas juste.",
  identite: [
    { label: "Une seule relation", valeur: "« multiple de » et « diviseur de » disent la même chose, dans les deux sens" },
    { label: "Deux familles de critères", valeur: "2, 5, 10 regardent les UNITÉS · 3 et 9 regardent la SOMME des chiffres" },
    { label: "Le piège", valeur: "L'égalité ne suffit pas : le reste doit être plus petit que le diviseur" },
  ],
  definition: {
    texte:
      "Un nombre est MULTIPLE d'un autre lorsqu'il s'obtient en le multipliant par un entier ; l'autre en est alors un DIVISEUR. $42 = 6 \\times 7$ : 42 est un multiple de 6, et 6 est un diviseur de 42. ⭐ Ce sont deux façons de dire UNE SEULE relation, comme « parent » et « enfant » — les deux mots ne s'échangent jamais. Le multiple est toujours le plus grand des deux.",
  },
  figure: {
    schema: legende(
      divisionPosee(47, 6),
      "$47 = 6 \\times 7 + 5$, et $5 < 6$",
    ),
    legende:
      "Le quotient et le reste se lisent côte à côte, et c'est ce voisinage qui compte : on a fait 7 parts de 6, et il reste 5. Cinq, c'est trop peu pour une part de plus — sinon on l'aurait faite. Voilà pourquoi le reste est TOUJOURS plus petit que le diviseur, et pourquoi cette condition fait partie de la définition.",
  },
  proprietes: [
    {
      titre: "Multiple et diviseur : une relation, deux mots",
      micros: ["div_multiple_diviseur"],
      texte:
        "Dire « 42 est un multiple de 6 » et « 6 est un diviseur de 42 », c'est dire la même chose. ⚠️ Le test est toujours le même : on divise, et on regarde le RESTE. S'il vaut zéro, la relation existe ; sinon elle n'existe pas. « Presque divisible » ne veut rien dire.",
      schema: tableau({
        headers: ["on dit", "de qui"],
        rows: [
          { values: ["42 est un multiple", "de 6"] },
          { values: ["6 est un diviseur", "de 42"] },
          { values: ["le multiple", "est le plus GRAND"] },
        ],
        highlight: { row: 2 },
        caption: "les deux mots ne s'échangent pas",
      }),
    },
    {
      titre: "2, 5 et 10 : seul le chiffre des unités compte",
      micros: ["div_critere_2_5_10"],
      texte:
        "Ces trois critères ne regardent QUE le dernier chiffre — le reste du nombre ne compte pas, même s'il en a dix. Par 2 si le chiffre des unités est 0, 2, 4, 6 ou 8 ; par 5 s'il est 0 ou 5 ; par 10 s'il est 0. ⭐ Un nombre divisible par 10 l'est forcément par 2 ET par 5 : c'est le seul cas où les trois tombent ensemble.",
      schema: tableau({
        headers: ["divisible par", "si les unités font"],
        rows: [
          { values: ["2", "0, 2, 4, 6 ou 8"] },
          { values: ["5", "0 ou 5"] },
          { values: ["10", "0"] },
        ],
        highlight: { row: 2 },
        caption: "on ne regarde que le dernier chiffre",
      }),
    },
    {
      titre: "3 et 9 : c'est la somme des chiffres qui décide",
      micros: ["div_critere_3_9"],
      texte:
        "Un nombre est divisible par 3 si la somme de ses chiffres l'est, et par 9 si cette même somme est divisible par 9. Pour 4275 : $4 + 2 + 7 + 5 = 18$, qui est divisible par 3 et par 9. ⭐ Le critère transforme un test sur un grand nombre en un test sur un tout petit — c'est exactement à cela qu'il sert.",
      schema: tableau({
        headers: ["le nombre", "somme", "divisible par"],
        rows: [
          { values: ["4275", "18", "3 et 9"] },
          { values: ["1234", "10", "aucun"] },
          { values: ["3438", "18", "3 et 9"] },
        ],
        highlight: { col: 1 },
        caption: "la somme décide, pas le nombre",
      }),
    },
    {
      titre: "Multiple de 9 ⇒ multiple de 3, jamais l'inverse",
      micros: ["div_critere_3_9"],
      texte:
        "Puisque 9 est lui-même un multiple de 3, tout multiple de 9 est un multiple de 3. Mais la réciproque est FAUSSE : ⚠️ 6 est divisible par 3 et pas par 9. Un seul contre-exemple suffit à réfuter une affirmation générale — et celui-là tient en un chiffre.",
      schema: tableau({
        headers: ["si", "alors"],
        rows: [
          { values: ["divisible par 9", "divisible par 3 ✓"] },
          { values: ["divisible par 3", "par 9 ? PAS forcément"] },
          { values: ["6", "par 3 oui, par 9 non"] },
        ],
        highlight: { row: 2 },
        caption: "l'implication ne marche que dans un sens",
      }),
    },
    {
      titre: "La division euclidienne, et sa seconde condition",
      micros: ["div_euclidienne"],
      texte:
        "Diviser 47 par 6 donne un quotient 7 et un reste 5 : on écrit $47 = 6 \\times 7 + 5$. ⚠️ Mais l'égalité ne suffit PAS. Il faut aussi que le reste soit plus petit que le diviseur : $0 \\leqslant r < b$. Sans cette condition, on pourrait aussi écrire $47 = 6 \\times 6 + 11$ — égalité juste, division fausse.",
      schema: legende(
        divisionPosee(89, 7),
        "$89 = 7 \\times 12 + 5$, et $5 < 7$",
      ),
    },
    {
      titre: "Chercher les diviseurs PAR PAIRES",
      micros: ["div_lister_diviseurs"],
      texte:
        "Chaque diviseur trouvé en donne un second : celui qui le complète. Pour 36, on part de 1 et on avance — $1 \\times 36$, $2 \\times 18$, $3 \\times 12$, $4 \\times 9$, $6 \\times 6$ — et on s'arrête quand les deux se croisent. ⭐ Cette méthode garantit de n'en oublier aucun, ce que la recherche au hasard ne garantit jamais.",
      schema: tableau({
        headers: ["paire", "produit"],
        rows: [
          { values: ["1 et 36", "36"] },
          { values: ["2 et 18", "36"] },
          { values: ["3 et 12", "36"] },
          { values: ["4 et 9", "36"] },
          { values: ["6 et 6", "36"] },
        ],
        highlight: { row: 4 },
        caption: "on s'arrête quand elles se croisent",
      }),
    },
  ],
  reel: {
    texte:
      "La divisibilité est la question qu'on se pose chaque fois qu'il faut partager sans casser. Un professeur qui prépare des lots de matériel, un organisateur qui répartit des équipes, un pâtissier qui découpe une plaque : tous cherchent un diviseur commun. À l'inverse, quand deux phénomènes se répètent à leur propre rythme et qu'on veut savoir quand ils retomberont ensemble, on cherche un multiple commun — deux bus qui passent toutes les 6 et 8 minutes se recroisent toutes les 24. Le même raisonnement date les marées de coefficient exceptionnel, les alignements de planètes, et le retour des années bissextiles. Les engrenages en sont l'illustration mécanique : deux roues de 12 et 18 dents reviennent dans leur position de départ après 36 dents, et un horloger qui veut qu'elles ne s'usent pas toujours au même endroit choisit exprès des nombres de dents sans diviseur commun.",
  },
  historique: {
    texte:
      "Les critères de divisibilité par 3 et par 9 ne sont pas des astuces : ils viennent de ce que 10 laisse un reste de 1 quand on le divise par 9, et donc que 10, 100, 1000 aussi. Chaque chiffre pèse alors autant que sa valeur, et c'est pourquoi leur somme suffit. Les mathématiciens indiens du VIIe siècle utilisaient déjà cette propriété pour vérifier leurs calculs — la « preuve par neuf », qui s'est enseignée en France jusqu'aux années 1970. Elle a un défaut que ses utilisateurs connaissaient : elle repère beaucoup d'erreurs, mais pas toutes. Intervertir deux chiffres, par exemple, ne change pas leur somme, et l'erreur passe au travers. C'est un bon exemple d'un contrôle qui a de la valeur sans être une preuve — comme l'ordre de grandeur, il dit « c'est peut-être juste » et jamais « c'est juste ».",
  },
  formule: {
    contexte: "Division euclidienne de a par b",
    expression: "$a = b \\times q + r$   avec   $0 \\leqslant r < b$",
    legende:
      "Les DEUX parties comptent. L'égalité dit comment le dividende se reconstruit ; la condition sur le reste est ce qui rend le quotient et le reste UNIQUES. Sans elle, on pourrait écrire une infinité d'égalités justes pour une même division.",
    schema: tableau(
      {
        headers: ["écriture", "verdict"],
        rows: [
          { values: ["47 = 6 × 7 + 5", "juste : 5 < 6"] },
          { values: ["47 = 6 × 6 + 11", "FAUX : 11 > 6"] },
          { values: ["47 = 6 × 8 − 1", "FAUX : reste négatif"] },
        ],
        highlight: { row: 0 },
        caption: "l'égalité seule ne suffit pas",
      },
      "formule"
    ),
  },
  methode: [
    {
      titre: "Tester si un nombre est multiple d'un autre",
      micros: ["div_multiple_diviseur"],
      texte:
        "On divise, et on regarde le reste. S'il vaut zéro, c'est un multiple ; sinon, non. ⭐ Quand le diviseur est 2, 3, 5, 9 ou 10, le critère évite de poser la division — c'est tout son intérêt.",
      schema: tableau({
        headers: ["le diviseur", "la méthode"],
        rows: [
          { values: ["2, 5, 10", "regarder les unités"] },
          { values: ["3, 9", "sommer les chiffres"] },
          { values: ["les autres", "poser la division"] },
        ],
        caption: "chaque diviseur a sa méthode",
      }),
    },
    {
      titre: "Appliquer les cinq critères d'un coup",
      micros: ["div_critere_2_5_10", "div_critere_3_9", "div_defi"],
      texte:
        "On regarde d'abord le chiffre des unités — il règle 2, 5 et 10 en un instant. Puis on additionne les chiffres — cela règle 3 et 9. ⭐ Deux contrôles rapides derrière : si 9 marche, 3 marche forcément ; si 10 marche, 2 et 5 marchent forcément.",
      schema: tableau({
        headers: ["2025", "test"],
        rows: [
          { values: ["unités : 5", "par 5 ✓, pas par 2 ni 10"] },
          { values: ["somme : 9", "par 3 ✓ et par 9 ✓"] },
        ],
        highlight: { row: 1 },
        caption: "les unités, puis la somme",
      }),
    },
    {
      titre: "Poser une division euclidienne",
      micros: ["div_euclidienne"],
      texte:
        "On cherche le plus grand multiple du diviseur qui ne dépasse pas le dividende ; ce qui manque pour l'atteindre est le reste. ⚠️ Deux contrôles avant de conclure : l'égalité $a = b \\times q + r$ doit tomber, ET le reste doit être plus petit que le diviseur.",
      schema: legende(
        divisionPosee(154, 12),
        "$154 = 12 \\times 12 + 10$, et $10 < 12$",
      ),
    },
    {
      titre: "Lister tous les diviseurs",
      micros: ["div_lister_diviseurs"],
      texte:
        "On avance à partir de 1, et pour chaque diviseur trouvé on note aussitôt son complémentaire. On s'arrête dès que les deux nombres de la paire se croisent. ⭐ Tout nombre a au moins deux diviseurs : 1 et lui-même.",
      schema: tableau({
        headers: ["pour 60", "on trouve"],
        rows: [
          { values: ["1 × 60", "1 et 60"] },
          { values: ["2 × 30", "2 et 30"] },
          { values: ["3 × 20", "3 et 20"] },
          { values: ["4 × 15", "4 et 15"] },
          { values: ["5 × 12", "5 et 12"] },
          { values: ["6 × 10", "6 et 10"] },
        ],
        highlight: { row: 5 },
        caption: "12 diviseurs, sans en oublier",
      }),
    },
    {
      titre: "Lots ou rendez-vous ? Deux problèmes inverses",
      micros: ["div_probleme"],
      texte:
        "⚠️ C'est l'erreur centrale du chapitre. Constituer des LOTS sans reste, c'est chercher un DIVISEUR commun, et on prend le plus GRAND. Savoir quand deux phénomènes retombent ensemble, c'est chercher un MULTIPLE commun, et on prend le plus PETIT. Les deux mots se ressemblent, les deux calculs sont inverses.",
      schema: tableau({
        headers: ["la question", "on cherche"],
        rows: [
          { values: ["faire des lots", "un DIVISEUR, le plus grand"] },
          { values: ["se recroiser", "un MULTIPLE, le plus petit"] },
        ],
        highlight: { col: 1 },
        caption: "deux calculs opposés",
      }),
    },
  ],
  usages: [
    {
      titre: "On me demande si un nombre en divise un autre",
      micros: ["div_multiple_diviseur", "div_critere_2_5_10"],
      detail:
        "On applique le critère s'il en existe un, sinon on pose la division. Le reste décide, et lui seul.",
    },
    {
      titre: "On me demande le reste d'une division",
      micros: ["div_euclidienne"],
      detail:
        "On cherche le plus grand multiple du diviseur sous le dividende. On vérifie ensuite que le reste est bien plus petit que le diviseur.",
    },
    {
      titre: "On me demande de simplifier une fraction",
      micros: ["div_lister_diviseurs", "div_critere_3_9"],
      detail:
        "On cherche un diviseur commun au numérateur et au dénominateur — les critères permettent d'en trouver un sans essayer au hasard.",
    },
    {
      titre: "On me parle de lots, d'équipes ou de rendez-vous",
      micros: ["div_probleme", "div_defi"],
      detail:
        "On identifie d'abord le type : partager sans reste appelle un diviseur commun, retomber ensemble appelle un multiple commun.",
    },
  ],
  exemples: [
    {
      titre: "L'égalité juste, la division fausse",
      micros: ["div_euclidienne"],
      donnees: "Un élève écrit : « 47 divisé par 6 donne un quotient de 6 et un reste de 11 », car $6 \\times 6 + 11 = 47$.",
      question: "A-t-il raison ?",
      schema: divisionPosee(47, 6, "exemple"),
      solution:
        "Son égalité est parfaitement juste : $6 \\times 6 = 36$, et $36 + 11 = 47$.\n\nMais la division euclidienne demande DEUX choses, et la seconde n'est pas respectée : il faut $0 \\leqslant r < b$, or $11 > 6$. Un reste de 11 signifie qu'on peut encore faire une part de 6 — il en resterait alors 5.\n\nLa bonne réponse est $47 = 6 \\times 7 + 5$.\n\n⭐ C'est cette seconde condition qui rend le quotient et le reste UNIQUES. Sans elle, on pourrait écrire $47 = 6 \\times 5 + 17$, $47 = 6 \\times 4 + 23$, et ainsi de suite sans fin.",
    },
    {
      titre: "Les lots du professeur",
      micros: ["div_probleme", "div_lister_diviseurs"],
      donnees: "Un professeur a 48 crayons et 36 gommes. Il veut faire des lots identiques, sans rien laisser.",
      question: "Quel est le plus grand nombre de lots possible ?",
      schema: tableau(
        {
          headers: ["diviseurs de", "communs"],
          rows: [
            { values: ["48", "1, 2, 3, 4, 6, 12"] },
            { values: ["36", "1, 2, 3, 4, 6, 12"] },
            { values: ["le plus grand", "12"] },
          ],
          highlight: { row: 2 },
        },
        "exemple"
      ),
      solution:
        "Faire des lots identiques sans reste, c'est chercher un diviseur commun aux deux quantités.\n\nLes diviseurs de 48 sont 1, 2, 3, 4, 6, 8, 12, 16, 24, 48. Ceux de 36 sont 1, 2, 3, 4, 6, 9, 12, 18, 36. Les diviseurs COMMUNS sont donc 1, 2, 3, 4, 6 et 12, et le plus grand vaut 12.\n\nOn peut faire 12 lots, avec $48 \\div 12 = 4$ crayons et $36 \\div 12 = 3$ gommes chacun.\n\n⚠️ « Le plus grand nombre de LOTS » n'est pas « le plus gros lot » : plus il y a de lots, plus chacun est petit. Lire la question avant de choisir le plus grand ou le plus petit.",
    },
    {
      titre: "Les deux bus",
      micros: ["div_probleme"],
      donnees: "Deux bus partent ensemble d'un arrêt. L'un y repasse toutes les 6 minutes, l'autre toutes les 8 minutes.",
      question: "Dans combien de minutes se croiseront-ils à nouveau ?",
      schema: tableau(
        {
          headers: ["multiples de 6", "multiples de 8"],
          rows: [
            { values: ["6, 12, 18", "8, 16"] },
            { values: ["24", "24"] },
          ],
          highlight: { row: 1 },
        },
        "exemple"
      ),
      solution:
        "Cette fois on cherche un MULTIPLE commun, et le plus PETIT : c'est le premier instant où les deux repassent en même temps.\n\nMultiples de 6 : 6, 12, 18, 24, 30… Multiples de 8 : 8, 16, 24, 32… Le premier qui figure dans les deux listes est 24.\n\nIls se croiseront dans 24 minutes.\n\n⚠️ Ne pas confondre avec les lots ! Là on cherchait un diviseur commun, le plus grand ; ici un multiple commun, le plus petit. Le mot « commun » est le même, tout le reste est inverse.",
    },
  ],
  pieges: [
    "Échanger « multiple » et « diviseur ». Le multiple est toujours le PLUS GRAND des deux.",
    "Croire qu'un nombre divisible par 3 l'est par 9. 6 est divisible par 3 et pas par 9.",
    "Appliquer la somme des chiffres à 2, 5 ou 10. Ces trois critères ne regardent que le chiffre des unités.",
    "Se contenter de l'égalité dans une division euclidienne. Le reste doit AUSSI être plus petit que le diviseur.",
    "Chercher les diviseurs au hasard. La recherche par paires est la seule qui garantisse de n'en oublier aucun.",
    "Confondre le problème des lots et celui des rendez-vous. Diviseur commun le plus grand d'un côté, multiple commun le plus petit de l'autre.",
    "Dire d'un nombre qu'il est « presque divisible ». Le reste vaut zéro, ou il ne vaut pas zéro.",
  ],
  aRetenir: [
    "« a est un multiple de b » et « b est un diviseur de a » disent la même chose : le multiple est le plus grand.",
    "Divisible par 2, 5 ou 10 : on ne regarde que le chiffre des unités.",
    "Divisible par 3 ou 9 : on regarde la somme des chiffres.",
    "Tout multiple de 9 est un multiple de 3 — l'inverse est faux.",
    "Division euclidienne : $a = b \\times q + r$ AVEC $0 \\leqslant r < b$. Les deux conditions comptent.",
    "C'est la condition sur le reste qui rend le quotient et le reste uniques.",
    "On cherche les diviseurs PAR PAIRES, en partant de 1, jusqu'à ce qu'elles se croisent.",
    "Faire des lots : un DIVISEUR commun, le plus GRAND. Se recroiser : un MULTIPLE commun, le plus PETIT.",
  ],
  entrainement: [
    {
      micros: ["div_multiple_diviseur"],
      question: "56 est-il un multiple de 7 ? Et 7 est-il un diviseur de 56 ?",
      correction:
        "Oui aux deux : $56 = 7 \\times 8$. Ce sont deux façons de dire la même chose.",
    },
    {
      micros: ["div_multiple_diviseur"],
      question: "94 est-il un multiple de 6 ?",
      correction:
        "Non : $94 \\div 6$ donne 15 et il reste 4. Le reste n'est pas nul.",
    },
    {
      micros: ["div_critere_2_5_10"],
      question: "Le nombre 3 640 est-il divisible par 2, par 5, par 10 ?",
      correction:
        "Il se termine par 0, donc il est divisible par les trois. ⭐ C'est le seul chiffre des unités pour lequel les trois critères tombent ensemble.",
    },
    {
      micros: ["div_critere_3_9"],
      question: "Le nombre 4 275 est-il divisible par 3 ? Par 9 ?",
      correction:
        "$4 + 2 + 7 + 5 = 18$. Or 18 est divisible par 3 et par 9, donc 4 275 l'est aussi.",
    },
    {
      micros: ["div_critere_3_9", "div_defi"],
      question: "Quel chiffre faut-il mettre à la place du ? dans 47? pour que le nombre soit divisible par 9 ?",
      correction:
        "$4 + 7 = 11$. Le prochain multiple de 9 est 18, donc il faut ajouter 7. Le nombre est 477.",
    },
    {
      micros: ["div_euclidienne"],
      question: "Effectue la division euclidienne de 173 par 8 : quotient et reste.",
      correction:
        "$8 \\times 21 = 168$, et $173 - 168 = 5$. Donc $173 = 8 \\times 21 + 5$, avec $5 < 8$.",
    },
    {
      micros: ["div_euclidienne"],
      question: "Un élève écrit $95 = 7 \\times 12 + 11$. L'égalité tombe-t-elle ? La division est-elle correcte ?",
      correction:
        "L'égalité tombe : $84 + 11 = 95$. Mais la division est fausse, car $11 > 7$. La bonne écriture est $95 = 7 \\times 13 + 4$.",
    },
    {
      micros: ["div_lister_diviseurs"],
      question: "Liste tous les diviseurs de 40.",
      correction:
        "Par paires : $1 \\times 40$, $2 \\times 20$, $4 \\times 10$, $5 \\times 8$. Les diviseurs sont donc 1, 2, 4, 5, 8, 10, 20 et 40 — huit en tout.",
    },
    {
      micros: ["div_probleme"],
      question: "Un club a 24 maillots et 30 ballons. Il veut faire des lots identiques sans rien laisser. Combien de lots au maximum ?",
      correction:
        "Les diviseurs communs à 24 et 30 sont 1, 2, 3 et 6. Le plus grand vaut 6 : on peut faire 6 lots, de 4 maillots et 5 ballons chacun.",
    },
    {
      micros: ["div_probleme", "div_defi"],
      question: "Deux phares clignotent, l'un toutes les 9 secondes, l'autre toutes les 12. Ils viennent de clignoter ensemble. Dans combien de secondes recommenceront-ils ?",
      correction:
        "On cherche le plus petit multiple commun. Multiples de 9 : 9, 18, 27, 36… Multiples de 12 : 12, 24, 36… Le premier commun est 36 secondes.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesDivisibilite4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Multiples, diviseurs et division euclidienne - 4e",
    section: {
      type: "objectif",
      phrase: "Savoir si ça tombe juste sans poser la division",
      sousPhrase:
        "C'est ce que permettent les critères de divisibilité. Et quand ça ne tombe pas juste, la division euclidienne donne un nom à ce qui reste.",
      encadre: {
        titre: "Une seule relation",
        texte:
          "« 42 est un multiple de 6 » et « 6 est un diviseur de 42 » disent la même chose. Le multiple est toujours le plus grand des deux.",
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
          "Partager sans casser : des lots de matériel, des équipes, une plaque à découper. Ou l'inverse : savoir quand deux bus qui passent toutes les 6 et 8 minutes se recroiseront — toutes les 24. Un horloger choisit exprès des roues sans diviseur commun, pour qu'elles ne s'usent pas toujours au même endroit.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le critère par 9 vient de ce que 10, 100 et 1000 laissent tous un reste de 1 quand on les divise par 9. Les mathématiciens indiens du septième siècle s'en servaient pour vérifier leurs calculs : c'est la preuve par neuf, enseignée en France jusqu'aux années 1970. Elle repère beaucoup d'erreurs, mais pas toutes — intervertir deux chiffres ne change pas leur somme.",
      },
    },
  },
  {
    titre: "Les deux familles de critères",
    badge: "Ne pas les mélanger",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "2, 5 et 10",
        contenu:
          "On ne regarde QUE le chiffre des unités, même si le nombre en a dix. Par 2 s'il finit par 0, 2, 4, 6 ou 8. Par 5 s'il finit par 0 ou 5. Par 10 s'il finit par 0.",
      },
      droite: {
        variante: "info",
        titre: "3 et 9",
        contenu:
          "On additionne tous les chiffres, et on teste la somme — bien plus petite, donc bien plus facile. Pour 4275 : quatre plus deux plus sept plus cinq font 18, divisible par 3 et par 9.",
      },
    },
  },
  {
    titre: "Le piège de l'implication",
    badge: "Ce qui coûte des points",
    section: {
      type: "objectif",
      phrase: "Divisible par 3 ne veut pas dire divisible par 9",
      sousPhrase:
        "L'inverse, lui, est toujours vrai : puisque 9 est un multiple de 3, tout multiple de 9 est un multiple de 3.",
      encadre: {
        titre: "Le contre-exemple",
        texte:
          "6 est divisible par 3, et pas par 9. Un seul cas suffit à réfuter une affirmation générale — et celui-là tient en un chiffre.",
      },
    },
  },
  {
    titre: "La division euclidienne",
    badge: "Deux conditions, pas une",
    section: {
      type: "etapes",
      etapes: [
        "On écrit : dividende égale diviseur fois quotient, plus reste.",
        "Pour 47 divisé par 6 : 47 égale 6 fois 7, plus 5.",
        "⚠️ Mais l'égalité ne suffit pas ! Le reste doit être PLUS PETIT que le diviseur.",
        "47 égale 6 fois 6 plus 11 est une égalité juste — et une division FAUSSE.",
        "⭐ C'est cette seconde condition qui rend le quotient et le reste uniques.",
      ],
    },
  },
  {
    titre: "Chercher par paires",
    badge: "La méthode qui n'oublie rien",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "On part de 1",
          texte:
            "Un fois trente-six font trente-six. On note les deux d'un coup : 1 et 36 sont tous deux des diviseurs.",
        },
        {
          titre: "On avance",
          texte:
            "Deux fois dix-huit, trois fois douze, quatre fois neuf. Chaque diviseur trouvé en donne un second.",
        },
        {
          titre: "On s'arrête",
          texte:
            "Six fois six : les deux nombres de la paire se croisent. Inutile d'aller plus loin, tout est trouvé.",
        },
        {
          titre: "Pourquoi ça marche",
          texte:
            "Parce que les diviseurs vont toujours par deux. Chercher au hasard, c'est risquer d'en oublier ; chercher par paires, non.",
        },
      ],
    },
  },
  {
    titre: "Lots ou rendez-vous ?",
    badge: "L'erreur centrale du chapitre",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Faire des LOTS",
        contenu:
          "On partage sans reste : on cherche un DIVISEUR commun, et on prend le plus GRAND. Quarante-huit crayons et trente-six gommes donnent douze lots.",
      },
      droite: {
        variante: "info",
        titre: "Se RECROISER",
        contenu:
          "Deux phénomènes retombent ensemble : on cherche un MULTIPLE commun, et on prend le plus PETIT. Six et huit minutes donnent vingt-quatre.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "Un élève écrit : 47 divisé par 6 donne un quotient de 6 et un reste de 11, car six fois six plus onze font quarante-sept.",
      question: "A-t-il raison ?",
      correction:
        "Son égalité est parfaitement juste : six fois six font trente-six, plus onze font quarante-sept. Mais la division euclidienne demande deux choses, et la seconde n'est pas respectée : le reste doit être plus petit que le diviseur, or onze dépasse six. Un reste de onze signifie qu'on peut encore faire une part de six — il en resterait alors cinq. La bonne réponse est : quarante-sept égale six fois sept, plus cinq.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "Un club a vingt-quatre maillots et trente ballons. Il veut faire des lots identiques, sans rien laisser.",
      question: "Combien de lots au maximum, et que contient chacun ?",
      indice: "Cherche les diviseurs communs aux deux nombres, puis prends le plus grand.",
      correction:
        "Les diviseurs de vingt-quatre sont un, deux, trois, quatre, six, huit, douze et vingt-quatre. Ceux de trente sont un, deux, trois, cinq, six, dix, quinze et trente. Les communs sont un, deux, trois et six ; le plus grand vaut six. On peut donc faire six lots, de quatre maillots et cinq ballons chacun.",
    },
  },
];
