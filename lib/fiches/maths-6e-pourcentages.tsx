// ─── Fiche de cours : les pourcentages (6e) ────────────────────────────────────
// Fiche « en blocs » : toute la matière de la page vit ici, la page et les
// flashcards ne font que la rendre. Fiche DÉCOUVERTE (6e) : comprendre ce que
// veut dire %, relier à la fraction et au décimal, lire une situation sur 100,
// calculer des pourcentages simples (50 %, 25 %, 10 %). La fiche 5e reprend
// ensuite les calculs généraux (réductions, augmentations).
//
// Couverture des micro-compétences de la banque coach
// (lib/tutor-v4/questionBank/6e/maths/pourcentages.bank.ts) :
// - pourcentage_comprendre     → accroche, définition, méthode « Lire »,
//                                usage 1, slide « Objectif », entraînement 1
// - pourcentage_fraction       → propriété 1, usage 2, exemple 1, entraînement 2
// - pourcentage_decimal        → propriété 2, usage 2, exemple 1, entraînement 2
// - pourcentage_lire           → méthode « Lire », exemple 2, entraînement 3
// - pourcentage_calcul_simple  → propriété 3, formule, méthode « Calculer »,
//                                usage 3, entraînement 4
// - pourcentage_defi           → repères moitié/quart/dixième (propriété 3,
//                                aRetenir), entraînement 2 (25 % = 1/4)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const pieges = [
  "Croire que % veut dire « sur 10 » ou « sur 1000 » : % veut toujours dire « sur 100 ».",
  "Écrire 5 % = 0,5 : c'est faux, 5 % = 5/100 = 0,05.",
  "Oublier que 50 % de 18 dépend de 18 : un pourcentage est toujours une part « de quelque chose ».",
];

const aRetenir = [
  "p % veut dire « p sur 100 » : c'est la fraction p/100.",
  "Un pourcentage a trois écritures : 25 % = 25/100 = 0,25.",
  "Les repères : 50 % = la moitié, 25 % = le quart, 10 % = le dixième.",
];

// Grille de 100 carreaux : 25 coloriés → 25 %. L'image de la définition.
const schemaGrille = (
  <svg
    viewBox="0 0 209 236"
    className="h-auto w-full"
    role="img"
    aria-label="Grille de 100 carreaux dont 25 sont coloriés : cela représente 25 %"
  >
    {Array.from({ length: 100 }, (_, i) => {
      const colonne = i % 10;
      const ligne = Math.floor(i / 10);
      const colorie = colonne < 5 && ligne < 5;
      return (
        <rect
          key={i}
          x={colonne * 21}
          y={ligne * 21}
          width={20}
          height={20}
          rx={3}
          fill={colorie ? "#0ea5e9" : "rgba(14,165,233,0.12)"}
          stroke="#0ea5e9"
          strokeWidth={colorie ? 0 : 1}
        />
      );
    })}
    <text
      x="104.5"
      y="230"
      fill="#334155"
      fontSize="16"
      fontWeight="800"
      textAnchor="middle"
    >
      25 carreaux sur 100 = 25 %
    </text>
  </svg>
);

export const fichePourcentages6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "pourcentage-nombre",
  titre: "Les pourcentages",
  accroche:
    "Le symbole % veut dire « sur 100 ». Dire 25 %, c'est dire 25 sur 100. En 6e, on découvre ce que ça signifie, comment l'écrire en fraction et en décimal, et comment calculer des pourcentages simples.",
  identite: [
    { label: "Prérequis", valeur: "Fractions simples, nombres décimaux" },
    { label: "Idée clé", valeur: "p % = p sur 100" },
    { label: "Repères", valeur: "50 % = moitié, 25 % = quart, 10 % = dixième" },
  ],
  definition: {
    texte:
      "Un pourcentage est une proportion exprimée sur 100. Écrire p %, c'est écrire « p sur 100 », c'est-à-dire la fraction p/100. Par exemple, 30 % veut dire 30 sur 100 : dans un groupe de 100 personnes, cela représente 30 personnes.",
  },
  proprietes: [
    {
      titre: "Un pourcentage est une fraction sur 100",
      texte:
        "p % s'écrit p/100. Par exemple 25 % = 25/100. Certaines fractions se simplifient : 50/100 = 1/2, 25/100 = 1/4, 10/100 = 1/10.",
    },
    {
      titre: "Un pourcentage a aussi une écriture décimale",
      texte:
        "Pour passer du pourcentage au décimal, on divise par 100. Par exemple 50 % = 50/100 = 0,5 et 5 % = 5/100 = 0,05. Attention à la place de la virgule.",
    },
    {
      titre: "Les pourcentages simples ont des repères",
      texte:
        "50 %, c'est la moitié. 25 %, c'est le quart. 10 %, c'est le dixième. Ces repères permettent de calculer de tête : 50 % de 18, c'est la moitié de 18, donc 9.",
    },
  ],
  reel: {
    texte:
      "Les pourcentages sont partout : la batterie du téléphone (80 %), les soldes en magasin (−50 %, c'est la moitié du prix en moins), les sondages, la composition des aliments sur les étiquettes, ou la barre de téléchargement d'un jeu.",
  },
  historique: {
    texte:
      "Le mot « pourcentage » vient du latin « per centum », qui veut dire « pour cent ». Les marchands italiens du XVᵉ siècle l'utilisaient déjà pour leurs comptes. Le symbole % est né plus tard, vers le XVIIᵉ siècle, par déformation de l'abréviation « per cento ».",
  },
  formule: {
    contexte: "Calculer un pourcentage simple d'un nombre",
    expression: "p % de N = N × p ÷ 100",
    legende:
      "Exemple : 10 % de 60 = 60 × 10 ÷ 100 = 6. Avec les repères, c'est plus rapide : 10 % de 60, c'est le dixième de 60.",
    schema: schemaGrille,
  },
  methode: [
    {
      titre: "Lire",
      texte:
        "On traduit le symbole % par « sur 100 ». 20 % d'élèves à lunettes, c'est 20 élèves sur 100.",
    },
    {
      titre: "Traduire",
      texte:
        "On écrit le pourcentage en fraction sur 100, et en décimal si besoin : 25 % = 25/100 = 0,25.",
    },
    {
      titre: "Calculer",
      texte:
        "On utilise un repère simple : 50 % = la moitié, 25 % = le quart, 10 % = le dixième. Sinon, on multiplie par le pourcentage et on divise par 100.",
    },
  ],
  usages: [
    {
      titre: "Comprendre un pourcentage",
      detail:
        "On lit « sur 100 » : 75 % veut dire 75 sur 100. Sur un groupe de 100, le pourcentage donne directement le nombre.",
    },
    {
      titre: "Relier fraction et décimal",
      detail:
        "On écrit p % = p/100, puis on divise par 100 pour le décimal : 10 % = 10/100 = 1/10 = 0,1.",
    },
    {
      titre: "Calculer un pourcentage simple",
      detail:
        "On passe par la moitié, le quart ou le dixième : 25 % de 20, c'est le quart de 20, donc 5.",
    },
  ],
  exemples: [
    {
      titre: "Trois écritures d'un même nombre",
      donnees: "On s'intéresse à 75 %.",
      question: "Écrire 75 % en fraction sur 100, puis en écriture décimale.",
      solution:
        "75 % veut dire 75 sur 100, donc 75 % = 75/100. Cette fraction se simplifie : 75/100 = 3/4. En divisant 75 par 100, on obtient l'écriture décimale : 0,75.",
    },
    {
      titre: "Lire un pourcentage dans une situation",
      donnees: "Sur 100 bonbons, 60 % sont rouges.",
      question: "Combien y a-t-il de bonbons rouges ?",
      solution:
        "60 % veut dire 60 sur 100. Comme il y a exactement 100 bonbons, le pourcentage donne directement le nombre : il y a 60 bonbons rouges.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Que signifie 40 % ?",
      correction:
        "Le symbole % veut dire « sur 100 ». Donc 40 % signifie 40 sur 100 : dans un groupe de 100, cela représente 40.",
    },
    {
      question:
        "Écris 25 % sous forme de fraction sur 100, puis en écriture décimale. Que remarques-tu ?",
      correction:
        "25 % = 25/100. En divisant 25 par 100, on obtient 0,25. On remarque que 25/100 se simplifie en 1/4 : 25 %, c'est exactement le quart.",
    },
    {
      question:
        "Dans une collection de 100 cartes, 8 % sont brillantes. Combien y a-t-il de cartes brillantes ?",
      correction:
        "8 % veut dire 8 sur 100. La collection compte exactement 100 cartes, donc le pourcentage donne directement le nombre : il y a 8 cartes brillantes.",
    },
    {
      question: "Calcule 10 % de 60, puis 50 % de 18.",
      correction:
        "10 %, c'est le dixième : 10 % de 60 = 60 ÷ 10 = 6. On peut vérifier avec la formule : 60 × 10 ÷ 100 = 6. 50 %, c'est la moitié : 50 % de 18 = 18 ÷ 2 = 9.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesPourcentages6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Pourcentages - 6e",
    section: {
      type: "objectif",
      phrase: "Comprendre ce que veut dire %",
      sousPhrase:
        "Un pourcentage exprime une proportion sur 100 : dire 25 %, c'est dire 25 sur 100.",
      encadre: {
        titre: "L'idée",
        texte: "Le symbole % veut dire « sur 100 ». Toujours.",
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
          "La batterie du téléphone (80 %), les soldes (−50 %), les sondages, les étiquettes des aliments, la barre de téléchargement d'un jeu.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Pourcentage » vient du latin « per centum », « pour cent ». Les marchands italiens du XVe siècle l'utilisaient déjà. Le symbole % est né vers le XVIIe siècle.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePourcentages6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Trois écritures",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "25 % = 25/100 = 0,25",
      sousPhrase:
        "Un même nombre a trois écritures : pourcentage, fraction sur 100, décimal.",
      encadre: {
        titre: "Les repères",
        texte: "50 % = la moitié, 25 % = le quart, 10 % = le dixième.",
      },
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: fichePourcentages6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Trois écritures",
    section: {
      type: "exemple",
      enonce: "On s'intéresse à 75 %.",
      question: "Écris 75 % en fraction sur 100, puis en décimal.",
      correction: "75 % = 75/100 = 3/4 = 0,75.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Lire une situation",
    section: {
      type: "exemple",
      enonce: "Sur 100 bonbons, 60 % sont rouges.",
      question: "Combien de bonbons rouges ?",
      correction:
        "60 % veut dire 60 sur 100. Comme il y a 100 bonbons, il y a 60 bonbons rouges.",
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
      enonce: "Un jeu coûte 60 euros. On veut connaître 10 % de 60.",
      question: "Calcule 10 % de 60.",
      indice: "10 %, c'est le dixième.",
      correction: "10 % de 60 = 60 ÷ 10 = 6. Avec la formule : 60 × 10 ÷ 100 = 6.",
    },
  },
];
