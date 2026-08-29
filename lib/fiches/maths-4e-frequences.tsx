// ─── Fiche de cours : fréquences observées et probabilité (4e) ─────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/frequences.bank.ts, notionId proba_frequence).
//
// ⭐ NOTION OUVERTE LE 28/08/2026. Elle ferme la puce 4e-B-probabilites-7 du BO,
// « Faire le lien entre fréquence et probabilité », qui était vide : le mot
// « fréquence » n'existait dans la banque de probabilités que comme LEURRE d'un
// QCM de vocabulaire.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les nombres de
// la fiche sortent de la banque :
//   proba_frequence_calculer    → 20 « pile » sur 50 → 0,4 → 40 %
//   proba_frequence_comparer    → l'écart à 1/6 sur un dé, et ce qu'il ne prouve pas
//   proba_frequence_repeter     → 10, 100, 1 000 lancers : l'écart rétrécit
//   proba_frequence_echantillon → 7 « pile » sur 10 ne prouvent rien
//   proba_frequence_defi        → le dé soupçonné, la punaise, les deux erreurs
//
// ⭐ TROIS MICROS RÉACTIVENT LA 6e, avec ses identifiants exacts. La règle est
// posée depuis les échelles : renvoyer un élève de 4e vers une fiche de 6e
// serait un jugement, et le moteur d'étoiles fait le tri sans rien dire.
//
// ⭐⭐ CE QUE LA FICHE ENSEIGNE VRAIMENT N'EST PAS UN CALCUL, C'EST UNE RETENUE
// DE JUGEMENT. Le premier raisonnement statistique de la scolarité tient en une
// question : SUR COMBIEN D'ESSAIS ? Un même pourcentage ne dit pas la même chose
// sur 10 lancers et sur 1 000 — et c'est vrai des dés comme des sondages. Aucun
// autre chapitre du programme ne redit ça.
//
// ⛔ ET LE PIÈGE EST SYMÉTRIQUE, donc la fiche le prend par les DEUX bouts :
//   · exiger que l'expérience donne le résultat calculé ;
//   · en déduire que le calcul est faux quand elle ne le donne pas.
// Le bloc « Deux erreurs opposées » les met face à face. Le hasard ne se corrige
// pas, il se moyenne — et cette phrase-là est le cœur de la notion.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#2563eb";
const GRIS = "#94a3b8";
const ROUGE = "#dc2626";

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
// carte de propriété, 216 px pour « La formule », 200 px pour un exemple. La
// police finale vaut police × largeurAffichée ÷ largeurViewBox, plancher 11 px.
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

// ⭐⭐ LE DESSIN DE LA NOTION : LA FRÉQUENCE QUI SE COLLE À LA PROBABILITÉ.
// Trois barres — 10, 100, 1 000 lancers — et l'écart à 50 % qui fond. C'est ce
// que la 6e constate et ce que la 4e explique, et ça se voit avant de se lire.
const barres = (
  data: { label: string; value: number; color?: string }[],
  largeur = 222
) => (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      data,
      display: { showValues: true, showLabels: true },
      size: { width: largeur, height: 180 },
    }}
  />
);

// LE DÉ ET LES BILLES — les deux objets du hasard que l'élève reconnaît. On les
// emploie là où il faut DÉNOMBRER : une fréquence commence toujours par un
// comptage. ⚠️ `billes` dessine une bille par élément : au-delà d'une
// quinzaine, la figure devient illisible.
const desSix = (
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "de",
      de: { faces: [1, 2, 3, 4, 5, 6], surligne: [3] },
      size: { width: 222, height: 180 },
    }}
  />
);

const sacDeBilles = (
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "billes",
      billes: {
        elements: [
          ...Array.from({ length: 4 }, () => ({ couleur: ROUGE })),
          ...Array.from({ length: 6 }, () => ({ couleur: BLEU })),
        ],
      },
      size: { width: 222, height: 180 },
    }}
  />
);

// ⭐ LE TABLEAU QUI PORTE LE SAUT DE LA 4e. Même fréquence, deux effectifs :
// c'est la seule chose à comprendre du chapitre, et elle tient en trois lignes.
const memePourcentage = tableau(
  {
    headers: ["série", "essais", "fréquence"],
    rows: [
      { values: ["A", "10", "70 %"] },
      { values: ["B", "1 000", "70 %"] },
      { values: ["conclusion", "", "seule B accuse"] },
    ],
    highlight: { row: 2 },
    caption: "même pourcentage, deux poids opposés",
  },
  "formule"
);

export const ficheFrequences4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "proba-frequence",
  titre: "Fréquences observées et probabilité",
  accroche:
    "Une probabilité se calcule avant l'expérience ; une fréquence se mesure après. Les deux ne tombent presque jamais juste l'une sur l'autre, et c'est normal. Ce chapitre apprend à lire cet écart — quand il ne veut rien dire, et quand il accuse.",
  identite: [
    { label: "Le mot de 4e", valeur: "Fréquence : le nombre de succès divisé par le nombre d'essais" },
    { label: "La règle", valeur: "Plus on répète, plus la fréquence approche la probabilité" },
    { label: "La question à poser", valeur: "SUR COMBIEN d'essais ? — sans elle, un pourcentage ne dit rien" },
  ],
  definition: {
    texte:
      "La PROBABILITÉ d'un événement se calcule avant l'expérience : avec un dé équilibré, elle vaut $\\frac{1}{6}$ pour chaque face. La FRÉQUENCE observée se mesure après : c'est le nombre de fois où l'événement s'est produit, divisé par le nombre total d'essais. Les deux sont des nombres compris entre 0 et 1, ce qui permet de les comparer — mais elles ne disent pas la même chose, et elles ne coïncident presque jamais exactement.",
  },
  figure: {
    schema: barres([
      { label: "10", value: 70, color: "#fca5a5" },
      { label: "100", value: 56, color: "#93c5fd" },
      { label: "1000", value: 51, color: BLEU },
    ]),
    legende:
      "La fréquence de « pile » après 10, 100 puis 1 000 lancers. La pièce n'a pas changé — c'est notre mesure qui devient fiable.",
  },
  proprietes: [
    {
      titre: "Une fréquence n'est pas un effectif",
      micros: ["proba_frequence_calculer"],
      texte:
        "L'EFFECTIF compte : « le 3 est sorti 12 fois ». La FRÉQUENCE rapporte ce comptage au total : $12 \\div 60 = 0,2$, soit 20 %. Douze tout seul ne dit rien tant qu'on ignore sur combien de lancers — et c'est déjà la question centrale du chapitre.",
      schema: legende(desSix, "12 sorties du 3 sur 60 lancers, c'est 20 %"),
    },
    {
      titre: "On rapporte au TOTAL, jamais à l'autre part",
      micros: ["proba_frequence_calculer"],
      texte:
        "Un sac de 4 billes rouges et 6 bleues : la fréquence des rouges vaut $\\frac{4}{10} = 40 \\%$, et non $\\frac{4}{6}$. Rapporter une part à l'autre donne un RATIO — c'est une autre notion, et une autre réponse.",
      schema: legende(sacDeBilles, "4 rouges sur 10 billes : 40 %, pas 4 contre 6"),
    },
    {
      titre: "L'écart est normal, il ne prouve rien",
      micros: ["proba_frequence_comparer"],
      texte:
        "Une probabilité annonce ce qui se passe EN MOYENNE sur un grand nombre d'essais, jamais ce qui se passera exactement. Sur 60 lancers d'un dé équilibré, on attend 10 sorties du 3 ; en observer 12 n'a rien d'anormal, et n'autorise aucune conclusion.",
      schema: tableau({
        headers: ["", "sur 60 lancers"],
        rows: [
          { values: ["attendu", "10 fois"] },
          { values: ["observé", "12 fois"] },
          { values: ["écart", "2 lancers"] },
        ],
        highlight: { row: 2 },
        caption: "un écart de 2 ne dit rien",
      }),
    },
    {
      titre: "Plus on répète, plus l'écart se réduit",
      micros: ["proba_frequence_repeter"],
      texte:
        "C'est la propriété centrale : la fréquence observée se rapproche de la probabilité quand le nombre d'essais grandit. ⚠️ Attention au sens : la pièce ne change pas et ne « se rattrape » pas. C'est notre MESURE qui devient fiable — le hasard ne se corrige pas, il se moyenne.",
      schema: legende(
        barres([
          { label: "10", value: 70, color: "#fca5a5" },
          { label: "100", value: 56, color: "#93c5fd" },
          { label: "1000", value: 51, color: BLEU },
        ]),
        "l'écart à 50 % passe de 20 points à 1",
      ),
    },
    {
      titre: "Deux erreurs opposées, fausses toutes les deux",
      micros: ["proba_frequence_comparer", "proba_frequence_defi"],
      texte:
        "Léa obtient 11 « pile » sur 20 et conclut : « la probabilité n'est donc pas $\\frac{1}{2}$ ». Malik conclut : « il faut continuer jusqu'à tomber sur exactement la moitié ». Léa déduit du hasard que le calcul est faux ; Malik attend du hasard qu'il se corrige. Les deux se trompent, en sens contraire.",
      schema: tableau({
        headers: ["l'erreur", "ce qu'elle croit"],
        rows: [
          { values: ["exiger", "l'expérience DOIT donner 50 %"] },
          { values: ["accuser", "elle ne le donne pas, donc c'est faux"] },
        ],
        caption: "symétriques, et fausses toutes les deux",
      }),
    },
    {
      titre: "Ce qu'un petit échantillon ne prouve pas",
      micros: ["proba_frequence_echantillon"],
      texte:
        "7 « pile » sur 10, c'est 70 % : tout le monde crie au truquage. Or cela arrive environ une fois sur huit avec une pièce parfaitement équilibrée. 700 « pile » sur 1 000, c'est le même pourcentage — et cela n'arriverait pratiquement jamais. ⭐ C'est la TAILLE DE L'ÉCHANTILLON qui décide de ce qu'on a le droit de conclure.",
      schema: memePourcentage,
    },
  ],
  reel: {
    texte:
      "C'est le chapitre qui apprend à lire les chiffres qu'on nous montre. Un sondage annonce 62 % — sur combien de personnes ? Un médicament « guérit 8 malades sur 10 » — huit sur dix, ou huit cents sur mille ? À La Réunion, un article du Quotidien peut annoncer que 73 % des habitants utilisent l'IA : le chiffre ne vaut que par la taille de l'échantillon interrogé, et c'est la première question à poser. Les assureurs, eux, vivent de cette propriété : ils ne savent rien de votre année, mais sur cent mille contrats la fréquence des sinistres est d'une régularité remarquable.",
  },
  historique: {
    texte:
      "Que la fréquence se rapproche de la probabilité quand on répète est un fait d'expérience très ancien, mais il a fallu attendre Jacques Bernoulli pour le démontrer : son « Ars Conjectandi », publié en 1713 après sa mort, contient ce qu'on appelle depuis la loi des grands nombres. Bernoulli y travailla vingt ans, et il mesurait bien ce qu'il apportait : sans elle, on ne pouvait pas justifier qu'observer serve à estimer. Un siècle et demi plus tard, le statisticien Karl Pearson lança une pièce 24 000 fois pour vérifier — il obtint 12 012 « pile », soit 50,05 %.",
  },
  formule: {
    contexte: "Pour un événement observé sur un ensemble d'essais",
    expression: "fréquence = nombre de succès ÷ nombre d'essais",
    legende:
      "Un nombre entre 0 et 1, comme une probabilité — c'est ce qui permet de les comparer. Mais la probabilité se calcule AVANT, la fréquence se mesure APRÈS, et l'écart entre les deux ne se juge jamais sans connaître le nombre d'essais.",
    schema: memePourcentage,
  },
  methode: [
    {
      titre: "Calculer une fréquence",
      micros: ["proba_frequence_calculer"],
      // ⛔ Le seul bloc sans dessin : les deux premières propriétés montrent
      // déjà le comptage. Un schéma de plus redirait le texte.
      texte:
        "On compte les succès, on compte le total des essais, on divise. Le résultat se convertit en pourcentage en multipliant par 100. ⚠️ Le total est celui des ESSAIS, pas celui des autres résultats.",
    },
    {
      titre: "Comparer à la probabilité",
      micros: ["proba_frequence_comparer"],
      texte:
        "On écrit les deux dans la même unité — le pourcentage est le plus commode — puis on regarde l'écart. On ne cherche jamais l'égalité : on cherche si l'écart est petit ou grand AU REGARD du nombre d'essais.",
      schema: tableau({
        headers: ["on compare", "en %"],
        rows: [
          { values: ["probabilité 1/6", "16,7 %"] },
          { values: ["observé 12/60", "20 %"] },
          { values: ["écart", "3,3 points"] },
        ],
        caption: "même unité, puis on regarde l'écart",
      }),
    },
    {
      titre: "Décider si un écart accuse",
      micros: ["proba_frequence_echantillon"],
      texte:
        "Deux choses à regarder, jamais une seule : la TAILLE de l'écart, et le NOMBRE d'essais. Un gros écart sur dix essais ne prouve rien. Un petit écart sur dix mille peut suffire. C'est la conjonction des deux qui autorise le soupçon.",
      schema: tableau({
        headers: ["écart", "essais", "conclusion"],
        rows: [
          { values: ["grand", "10", "rien"] },
          { values: ["grand", "1 000", "soupçon"] },
          { values: ["petit", "10", "rien"] },
        ],
        highlight: { row: 1 },
        caption: "il faut les deux ensemble",
      }),
    },
    {
      titre: "Estimer une probabilité qu'on ne sait pas calculer",
      micros: ["proba_frequence_defi", "proba_frequence_repeter"],
      texte:
        "Un dé se calcule, une punaise se mesure. Quand les issues ne sont pas équiprobables, aucun calcul n'est possible : on répète l'expérience un grand nombre de fois, et on prend la fréquence obtenue comme estimation. ⭐ C'est l'usage le plus important de la notion — celui qui sert aux sondages, aux assurances et à la médecine.",
    },
  ],
  usages: [
    {
      titre: "On veut vérifier un calcul de probabilité",
      micros: ["proba_frequence_comparer"],
      detail:
        "On répète l'expérience et on compare. ⚠️ Un écart n'invalide rien : il faut beaucoup d'essais pour qu'il devienne un argument.",
    },
    {
      titre: "On soupçonne un dé ou une pièce",
      micros: ["proba_frequence_echantillon"],
      detail:
        "On lance BEAUCOUP, et on regarde l'écart au regard du nombre de lancers. Dix lancers ne permettront jamais de conclure.",
    },
    {
      titre: "On ne peut pas calculer la probabilité",
      micros: ["proba_frequence_defi"],
      detail:
        "Punaise, bouchon, dé pipé, panne d'une machine : on estime par la fréquence, sur un grand nombre d'essais.",
    },
    {
      titre: "On lit un pourcentage dans la presse",
      micros: ["proba_frequence_echantillon"],
      detail:
        "On cherche l'effectif avant de croire le chiffre. « 70 % » sur quinze personnes et sur quinze mille ne sont pas la même information.",
    },
  ],
  exemples: [
    {
      titre: "La fréquence du 3",
      micros: ["proba_frequence_calculer", "proba_frequence_comparer"],
      donnees: "On lance un dé 60 fois. Le 3 sort 12 fois.",
      question: "Quelle est la fréquence observée du 3, et que vaut-elle face à la probabilité ?",
      schema: tableau(
        {
          headers: ["", "valeur"],
          rows: [
            { values: ["effectif", "12"] },
            { values: ["fréquence", "12 ÷ 60 = 20 %"] },
            { values: ["probabilité", "1/6 ≈ 16,7 %"] },
          ],
          highlight: { row: 1 },
        },
        "exemple"
      ),
      solution:
        "La fréquence vaut $12 \\div 60 = 0,2$, soit 20 %. La probabilité d'une face d'un dé équilibré vaut $\\frac{1}{6}$, soit environ 16,7 %.\n\nL'écart est de 3,3 points, ce qui représente 2 sorties de plus que les 10 attendues.\n\n⚠️ Cela ne prouve rien du tout : sur 60 lancers, un écart de deux sorties est ordinaire. Il faudrait des centaines de lancers pour qu'un tel écart devienne un argument.",
    },
    {
      titre: "Sept « pile » sur dix",
      micros: ["proba_frequence_echantillon"],
      donnees: "On lance une pièce 10 fois et on obtient 7 « pile ».",
      question: "Peut-on conclure qu'elle est truquée ?",
      schema: memePourcentage,
      solution:
        "Non. La fréquence vaut 70 %, contre 50 % attendus — l'écart paraît énorme, et pourtant il ne prouve rien.\n\nObtenir 7 « pile » sur 10 avec une pièce parfaitement équilibrée arrive environ une fois sur huit : c'est courant. En revanche, obtenir 700 « pile » sur 1 000 — le même pourcentage — n'arriverait pratiquement jamais.\n\n⭐ Le pourcentage est identique, la conclusion est opposée. C'est le nombre d'essais qui fait toute la différence.",
    },
    {
      titre: "La punaise",
      micros: ["proba_frequence_defi", "proba_frequence_repeter"],
      donnees: "On lance une punaise 500 fois ; elle retombe pointe en haut 180 fois.",
      question: "Quelle est la probabilité qu'elle retombe pointe en haut ?",
      schema: barres(
        [
          { label: "pointe haut", value: 36, color: BLEU },
          { label: "pointe bas", value: 64, color: GRIS },
        ],
        200
      ),
      solution:
        "Ici, aucun calcul n'est possible : les deux positions ne sont pas équiprobables, et rien dans la forme de la punaise ne permet de prévoir. On ne peut qu'ESTIMER.\n\nLa fréquence observée vaut $180 \\div 500 = 0,36$, soit 36 %. On prend cette valeur comme estimation de la probabilité.\n\n⭐ C'est l'usage le plus important du chapitre : quand on ne peut pas calculer, on mesure — et c'est la répétition qui remplace le calcul.",
    },
  ],
  pieges: [
    "Confondre l'effectif et la fréquence. « Le 3 est sorti 12 fois » est un comptage ; la fréquence rapporte ce comptage au nombre d'essais.",
    "Rapporter une part à l'autre au lieu du total. Sur 4 rouges et 6 bleues, la fréquence des rouges vaut $\\frac{4}{10}$, pas $\\frac{4}{6}$.",
    "Exiger que l'expérience donne le résultat calculé. Une probabilité de $\\frac{1}{2}$ ne promet pas 5 « pile » sur 10.",
    "En déduire que le calcul est faux quand l'expérience s'en écarte. C'est l'erreur inverse de la précédente, et elle est aussi fausse.",
    "Croire que le hasard se rattrape. Après cinq « face », « pile » n'est pas plus probable : le hasard ne se corrige pas, il se moyenne.",
    "Juger un pourcentage sans son effectif. 70 % sur 10 essais et 70 % sur 1 000 ne disent pas la même chose — et c'est vrai des sondages aussi.",
  ],
  aRetenir: [
    "Fréquence observée = nombre de succès ÷ nombre d'essais. C'est un nombre entre 0 et 1, comme une probabilité.",
    "La probabilité se calcule AVANT l'expérience ; la fréquence se mesure APRÈS.",
    "Les deux ne coïncident presque jamais exactement, et c'est NORMAL.",
    "Plus le nombre d'essais grandit, plus la fréquence se rapproche de la probabilité.",
    "La pièce ne se rattrape pas : c'est la mesure qui devient fiable, pas le hasard qui se corrige.",
    "Avant de juger un écart, toujours demander : SUR COMBIEN D'ESSAIS ?",
    "Quand on ne peut pas calculer une probabilité, on l'estime en répétant beaucoup l'expérience.",
  ],
  entrainement: [
    {
      micros: ["proba_frequence_calculer"],
      question: "Sur 200 lancers d'un dé, le 5 sort 28 fois. Quelle est sa fréquence, en pourcentage ?",
      correction: "$28 \\div 200 = 0,14$, soit 14 %.",
    },
    {
      micros: ["proba_frequence_calculer"],
      question: "Un sac contient 3 billes vertes et 9 jaunes. On les tire toutes. Quelle est la fréquence des vertes ?",
      correction:
        "Le total vaut $3 + 9 = 12$ billes. La fréquence des vertes est $3 \\div 12 = 0,25$, soit 25 %. ⚠️ $\\frac{3}{9}$ comparerait les vertes aux JAUNES : c'est un ratio, pas une fréquence.",
    },
    {
      micros: ["proba_frequence_comparer"],
      question:
        "La probabilité d'une face d'un dé vaut $\\frac{1}{6}$. Sur 120 lancers, on attend combien de sorties du 2 ? Et si on en observe 25, faut-il s'inquiéter ?",
      correction:
        "On en attend $120 \\div 6 = 20$. En observer 25 fait un écart de 5 sorties sur 120 lancers — c'est ordinaire, et cela n'autorise aucune conclusion.",
    },
    {
      micros: ["proba_frequence_repeter"],
      question:
        "Un élève lance une pièce et note : 80 % de « pile » après 10 lancers, 58 % après 100, 51 % après 1 000. Que constate-t-il ?",
      correction:
        "La fréquence se rapproche de 50 % : l'écart passe de 30 points à 8, puis à 1. ⚠️ La pièce n'a pas changé — c'est la mesure qui devient fiable.",
    },
    {
      micros: ["proba_frequence_echantillon"],
      question:
        "Deux séries donnent 65 % de « pile » : l'une sur 20 lancers, l'autre sur 2 000. Laquelle permet de soupçonner la pièce ?",
      correction:
        "Celle de 2 000 lancers. Sur 20 lancers, 65 % font 13 « pile » — trois de plus que prévu, le hasard suffit. Sur 2 000, cela fait 300 de trop : le hasard n'y suffit plus.",
    },
    {
      micros: ["proba_frequence_echantillon"],
      question:
        "Un élève interroge 12 camarades et annonce : « 75 % des collégiens aiment les maths ». Quelle est la faiblesse principale ?",
      correction:
        "L'échantillon est bien trop petit : 75 % de 12 personnes, ce sont 9 réponses, et une seule de plus ou de moins change le résultat de 8 points. ⚠️ Il y a une seconde faiblesse, distincte : interroger ses camarades n'est pas interroger « les collégiens ».",
    },
    {
      micros: ["proba_frequence_defi"],
      question:
        "Sur 1 200 lancers d'un dé, le 6 sort 340 fois au lieu des 200 attendus. Peut-on soupçonner le dé ?",
      correction:
        "Oui. La fréquence observée vaut environ 28 % contre 16,7 % attendus, soit 140 sorties de trop sur 1 200 lancers. Le même écart sur 12 lancers ne prouverait rien : c'est la conjonction de l'écart ET du nombre d'essais qui autorise le soupçon.",
    },
    {
      micros: ["proba_frequence_defi"],
      question:
        "Comment estimer la probabilité qu'un bouchon de liège lancé en l'air retombe sur le côté ?",
      correction:
        "On ne peut pas la calculer : les positions ne sont pas équiprobables. On lance donc le bouchon un grand nombre de fois, on compte les fois où il retombe sur le côté, et on prend la fréquence obtenue comme estimation.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesFrequences4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Fréquences et probabilité - 4e",
    section: {
      type: "objectif",
      phrase: "La probabilité se calcule, la fréquence se mesure",
      sousPhrase:
        "L'une avant l'expérience, l'autre après. Elles ne tombent presque jamais juste l'une sur l'autre, et c'est normal. Tout le chapitre apprend à lire cet écart.",
      encadre: {
        titre: "L'idée",
        texte:
          "Fréquence égale nombre de succès divisé par nombre d'essais. Un nombre entre 0 et 1, comme une probabilité — c'est ce qui permet de les comparer.",
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
        titre: "Lire les chiffres qu'on nous montre",
        contenu:
          "Un sondage annonce 62 pour cent : sur combien de personnes ? Un médicament « guérit 8 malades sur 10 » : huit sur dix, ou huit cents sur mille ? Les assureurs, eux, ne savent rien de votre année — mais sur cent mille contrats, la fréquence des sinistres est d'une régularité remarquable.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Jacques Bernoulli a mis vingt ans à démontrer que la fréquence se rapproche de la probabilité : c'est la loi des grands nombres, publiée en 1713 après sa mort. Un siècle et demi plus tard, le statisticien Karl Pearson lança une pièce 24 000 fois pour vérifier. Il obtint 12 012 « pile » — 50,05 pour cent.",
      },
    },
  },
  {
    titre: "Le mot nouveau",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Un effectif compte, une fréquence rapporte",
      sousPhrase:
        "« Le 3 est sorti 12 fois » est un comptage. La fréquence divise ce comptage par le nombre d'essais : 12 sur 60, c'est 20 pour cent. Douze tout seul ne dit rien tant qu'on ignore sur combien de lancers.",
      encadre: {
        titre: "Attention",
        texte:
          "On rapporte toujours au TOTAL des essais, jamais à l'autre résultat. Rapporter une part à l'autre donne un ratio, ce qui est une autre notion.",
      },
    },
  },
  {
    titre: "Plus on répète, plus l'écart se réduit",
    badge: "La propriété centrale",
    section: {
      type: "etapes",
      etapes: [
        "Après 10 lancers d'une pièce : 70 pour cent de « pile ». L'écart à 50 est de 20 points.",
        "Après 100 lancers : 56 pour cent. L'écart tombe à 6 points.",
        "Après 1 000 lancers : 51 pour cent. L'écart n'est plus que d'un point.",
        "⚠️ La pièce n'a pas changé et ne s'est pas rattrapée.",
        "C'est notre MESURE qui devient fiable. Le hasard ne se corrige pas, il se moyenne.",
      ],
    },
  },
  {
    titre: "Deux erreurs opposées",
    badge: "Ce qui coûte des points",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Léa exige",
        contenu:
          "« On a eu 11 pile sur 20, donc la probabilité n'est pas un demi. » Elle déduit du hasard que le calcul est faux.",
      },
      droite: {
        variante: "info",
        titre: "Malik attend",
        contenu:
          "« Il faut continuer jusqu'à tomber sur exactement la moitié. » Il attend du hasard qu'il se corrige. Les deux se trompent, en sens contraire.",
      },
    },
  },
  {
    titre: "La question à toujours poser",
    badge: "Le cœur du chapitre",
    section: {
      type: "objectif",
      phrase: "Sur combien d'essais ?",
      sousPhrase:
        "Sept « pile » sur dix, c'est 70 pour cent : tout le monde crie au truquage. Or cela arrive une fois sur huit avec une pièce parfaitement équilibrée. Sept cents « pile » sur mille, c'est le même pourcentage — et cela n'arriverait pratiquement jamais.",
      encadre: {
        titre: "La règle",
        texte:
          "Un pourcentage sans son effectif ne veut rien dire. C'est vrai des dés comme des sondages.",
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
          titre: "Calculer une fréquence",
          texte:
            "On compte les succès, on compte les essais, on divise. Le total est celui des ESSAIS, pas des autres résultats.",
        },
        {
          titre: "Comparer à la probabilité",
          texte:
            "On met les deux en pourcentage, puis on regarde l'écart. On ne cherche jamais l'égalité.",
        },
        {
          titre: "Décider si un écart accuse",
          texte:
            "Deux choses ensemble : la taille de l'écart ET le nombre d'essais. Jamais l'une sans l'autre.",
        },
        {
          titre: "Estimer ce qu'on ne peut pas calculer",
          texte:
            "Un dé se calcule, une punaise se mesure. On répète beaucoup, et la fréquence sert d'estimation.",
        },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "On lance un dé 60 fois, et le 3 sort 12 fois.",
      question: "Quelle est la fréquence du 3, et que vaut-elle face à la probabilité ?",
      correction:
        "La fréquence vaut 12 divisé par 60, soit 20 pour cent. La probabilité d'une face vaut un sixième, soit environ 16,7 pour cent. L'écart est de 3,3 points, c'est-à-dire deux sorties de plus que les dix attendues. Sur 60 lancers, c'est ordinaire : cela ne prouve rien.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "Deux séries donnent 65 pour cent de « pile » : l'une sur 20 lancers, l'autre sur 2 000.",
      question: "Laquelle permet de soupçonner la pièce ?",
      indice: "Traduis le pourcentage en nombre de lancers en trop.",
      correction:
        "Celle de 2 000 lancers. Sur 20 lancers, 65 pour cent font 13 piles, soit trois de plus que prévu : le hasard suffit à l'expliquer. Sur 2 000 lancers, cela fait 300 de trop : le hasard n'y suffit plus.",
    },
  },
];
