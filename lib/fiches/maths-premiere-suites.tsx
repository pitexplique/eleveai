// ─── Fiche de cours : les suites numériques (1re spé) ────────────────────────
//
// Cinquième fiche de première spécialité, écrite le 17/09/2026 le même jour que
// la feuille de 20 exercices et la vidéo paysage. Alignée sur la banque
// lib/tutor-v4/questionBank/premiere-spe/maths/suites.bank.ts, renforcée le
// matin même de neuf générateurs et d'une micro neuve, `suite_auxiliaire`.
//
// ⭐⭐ LE FIL : UNE SUITE AJOUTE, OU ELLE MULTIPLIE. Tout le chapitre commence
// par ce tri. Et quand elle ne fait ni l'un ni l'autre, on la ramène à une
// géométrique avec une suite auxiliaire — c'est l'exercice type de fin de
// chapitre, et c'était le grand absent du coach avant ce jour.
//
// ⛔ ÉCRIT SIMPLEMENT : c'est la règle de la fille de Frédéric, en tête de
// lib/fiches/types.ts. Une idée par phrase, le mot de la classe. « On ajoute
// toujours le même nombre », pas « la différence de deux termes consécutifs est
// constante » — la définition savante vient après l'image, jamais avant.
//
// ⛔ Les dessins sont en viewBox 230 : une carte de fiche fait 225 px en poche,
// et un cadre de 320 y réduit le texte à 9 px (mesuré le 17/09 sur la fiche des
// variations).
//
// Micro-compétences couvertes :
// - suite_termes, suite_recurrence  → définition, figure, méthode 1
// - suite_registres                 → figure, propriété « Deux écritures »
// - suite_arithmetique              → propriété « On ajoute », méthode 2, exemple 1
// - suite_geometrique               → propriété « On multiplie », méthode 2, exemple 2
// - suite_evolution                 → usages « Un pourcentage », le réel
// - suite_variation                 → propriété « Monte ou descend »
// - suite_sommes, suite_somme_geo   → usages « Additionner », exemple 3
// - suite_algorithme                → usages « Atteindre un seuil »
// - suite_modeliser                 → le réel, usages
// - suite_auxiliaire, suite_limite  → propriété « Ni l'une ni l'autre », exemple 4
// 13/13.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import {
  egalite,
  egalites,
  cas,
  etapes,
  enBleu,
  enRouge,
  enVert,
  BLEU,
  ROUGE,
  VERT,
} from "@/lib/fiches/schemas";

/** Une case de frise, avec sa valeur. */
function caseFrise(x: number, y: number, valeur: string, couleur: string, largeur = 42) {
  return (
    <g key={`${x}-${valeur}`}>
      <rect x={x} y={y} width={largeur} height={30} rx={6} fill={couleur} fillOpacity={0.12} stroke={couleur} strokeWidth={2} />
      <text x={x + largeur / 2} y={y + 21} textAnchor="middle" fontSize="15" fontWeight="800" fill="#0f172a">
        {valeur}
      </text>
    </g>
  );
}

/**
 * ⭐⭐ LE DESSIN DU CHAPITRE : la même image deux fois, avec « + 3 » puis « × 2 »
 * sur les flèches. C'est le seul tri à faire devant une suite, et il se voit
 * avant de se lire.
 */
function ajouterOuMultiplier() {
  const xs = [14, 70, 126, 182];
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <svg viewBox="0 0 230 150" className="block h-auto w-full" aria-label="Une suite qui ajoute, une suite qui multiplie">
        <text x={8} y={14} fontSize="12" fontWeight="900" fill={VERT}>on AJOUTE</text>
        {["4", "7", "10", "13"].map((v, i) => caseFrise(xs[i], 20, v, VERT))}
        {xs.slice(0, 3).map((x) => (
          <g key={`fa-${x}`}>
            <line x1={x + 44} y1={35} x2={x + 54} y2={35} stroke={VERT} strokeWidth={2} />
            <path d={`M ${x + 50} 32 L ${x + 55} 35 L ${x + 50} 38`} fill="none" stroke={VERT} strokeWidth={2} />
            <text x={x + 49} y={29} textAnchor="middle" fontSize="10" fontWeight="800" fill={VERT}>+3</text>
          </g>
        ))}

        <text x={8} y={90} fontSize="12" fontWeight="900" fill={BLEU}>on MULTIPLIE</text>
        {["4", "8", "16", "32"].map((v, i) => caseFrise(xs[i], 96, v, BLEU))}
        {xs.slice(0, 3).map((x) => (
          <g key={`fg-${x}`}>
            <line x1={x + 44} y1={111} x2={x + 54} y2={111} stroke={BLEU} strokeWidth={2} />
            <path d={`M ${x + 50} 108 L ${x + 55} 111 L ${x + 50} 114`} fill="none" stroke={BLEU} strokeWidth={2} />
            <text x={x + 49} y={105} textAnchor="middle" fontSize="10" fontWeight="800" fill={BLEU}>×2</text>
          </g>
        ))}

        <text x={115} y={70} textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">
          arithmétique : raison 3
        </text>
        <text x={115} y={144} textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">
          géométrique : raison 2
        </text>
      </svg>
    </div>
  );
}

/**
 * Le duel : deux suites parties du même point. La verte ajoute, la bleue
 * multiplie. La bleue traîne d'abord, puis elle lâche l'autre.
 */
function leDuel() {
  const pts = (f: (t: number) => number) =>
    Array.from({ length: 41 }, (_, i) => {
      const t = i / 40;
      return `${18 + t * 196},${112 - f(t) * 86}`;
    }).join(" ");
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <svg viewBox="0 0 230 140" className="block h-auto w-full" aria-label="Une suite qui ajoute et une qui multiplie, parties du même point">
        <line x1={18} y1={112} x2={218} y2={112} stroke="#0f172a" strokeWidth={1.6} />
        <line x1={18} y1={112} x2={18} y2={16} stroke="#0f172a" strokeWidth={1.6} />
        <polyline points={pts((t) => 0.45 * t)} fill="none" stroke={VERT} strokeWidth={3} />
        <polyline points={pts((t) => 0.95 * t ** 3)} fill="none" stroke={BLEU} strokeWidth={3} />
        <circle cx={18} cy={112} r={4} fill="#f59e0b" />
        <text x={150} y={92} fontSize="11" fontWeight="800" fill={VERT}>+ 30 par an</text>
        <text x={120} y={36} fontSize="11" fontWeight="800" fill={BLEU}>+ 12 % par an</text>
        <text x={26} y={130} fontSize="10" fontWeight="700" fill="#64748b">
          même départ : 250 membres
        </text>
      </svg>
      <p className="mt-2 text-center text-xs leading-5 text-slate-500">
        La bleue passe d&apos;abord SOUS la verte. Puis elle la dépasse, et
        l&apos;écart ne cesse plus de grandir.
      </p>
    </div>
  );
}

/**
 * La suite auxiliaire : u s'approche de L sans l'atteindre, et l'écart v = u − L
 * est ce qui se divise par deux à chaque étape.
 */
function suiteAuxiliaire() {
  const termes = [10, 14, 17.2, 19.76, 21.8, 23.4];
  const y = (v: number) => 104 - (v / 30) * 76;
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-2">
      <svg viewBox="0 0 230 130" className="block h-auto w-full" aria-label="Une suite qui s'approche d'une valeur sans l'atteindre">
        <line x1={20} y1={104} x2={218} y2={104} stroke="#0f172a" strokeWidth={1.4} />
        <line x1={20} y1={y(30)} x2={218} y2={y(30)} stroke={ROUGE} strokeWidth={2} strokeDasharray="5 3" />
        <text x={222} y={y(30) + 4} textAnchor="end" fontSize="11" fontWeight="900" fill={ROUGE}>L = 30</text>
        {termes.map((v, i) => (
          <g key={i}>
            <circle cx={30 + i * 33} cy={y(v)} r={4} fill={BLEU} />
            <line x1={30 + i * 33} y1={y(v)} x2={30 + i * 33} y2={y(30)} stroke={BLEU} strokeWidth={1.4} strokeDasharray="2 2" />
          </g>
        ))}
        <text x={115} y={124} textAnchor="middle" fontSize="11" fontWeight="700" fill="#64748b">
          l&apos;écart à 30 est multiplié par 0,8 à chaque rang
        </text>
      </svg>
      <p className="mt-2 text-center text-xs leading-5 text-slate-500">
        Les traits pointillés sont l&apos;écart. C&apos;est LUI qui forme une
        suite géométrique : on l&apos;appelle v, et on le note v = u − 30.
      </p>
    </div>
  );
}

/**
 * ⛔ Les diapos ne vivent PAS dans `FicheCoursData` : elles s'exportent à part et
 * la page les passe à `FicheCoursClient` en second argument. Le reste du
 * diaporama se dérive tout seul des rubriques de la fiche.
 */
export const slidesSuitesPremiere: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les suites - 1re spé",
    section: {
      type: "objectif",
      phrase: "On ajoute, ou on multiplie",
      sousPhrase:
        "Une suite qui ajoute toujours le même nombre est arithmétique. Une suite qui multiplie toujours par le même nombre est géométrique. Tout le chapitre commence par ce tri.",
    },
  },
];

export const ficheSuitesPremiere: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere-spe",
  notion: "suites",
  titre: "Les suites numériques",
  accroche:
    "Une suite, c'est une liste de nombres rangés par leur rang. Deux questions suffisent à la comprendre : qu'est-ce qu'on fait pour passer d'un terme au suivant, et sait-on sauter directement au rang 100 ? Si on ajoute toujours le même nombre, elle est arithmétique. Si on multiplie toujours par le même nombre, elle est géométrique.",
  identite: [
    { label: "Prérequis", valeur: "Calcul littéral, puissances, pourcentages" },
    { label: "L'idée clé", valeur: "On ajoute, ou on multiplie" },
    { label: "Outil", valeur: "Le terme général, pour atteindre un rang lointain" },
  ],

  definition: {
    texte:
      "Une SUITE est une liste de nombres rangés par leur rang : $u_0$, $u_1$, $u_2$, et ainsi de suite. On la décrit de deux façons. Par RÉCURRENCE, on dit comment passer d'un terme au suivant : $u_{n+1} = u_n + 3$. De façon EXPLICITE, on donne le terme directement à partir de son rang : $u_n = 4 + 3n$. ⭐ C'est la même suite. Mais pour connaître $u_{100}$, la première écriture oblige à calculer les cent termes d'avant, alors que la seconde donne la réponse en un calcul.",
  },

  figure: {
    schema: ajouterOuMultiplier(),
    legende:
      "⭐ Voici le seul tri à faire devant une suite. En haut, on ajoute 3 à chaque rang : la suite est arithmétique, et 3 est sa raison. En bas, on multiplie par 2 : elle est géométrique, et 2 est sa raison. Le mot « raison » sert dans les deux cas, mais il ne désigne pas la même chose.",
  },

  proprietes: [
    {
      titre: "⭐ On ajoute : arithmétique",
      texte:
        "Une suite est arithmétique quand on ajoute toujours le même nombre $r$ pour passer d'un terme au suivant. Ce nombre s'appelle la raison. Pour le MONTRER, on calcule $u_{n+1} - u_n$ : si le résultat ne dépend plus de $n$, c'est gagné.",
      schema: egalites(
        [
          `u_{n+1} = u_n + r`,
          `u_n = u_0 + rn`,
          `\\text{montrer : } u_{n+1} - u_n = ${enVert("r")}`,
        ],
        "La raison est le nombre qu'on ajoute. Pas le premier terme.",
      ),
      micros: ["suite_arithmetique"],
    },
    {
      titre: "⭐ On multiplie : géométrique",
      texte:
        "Une suite est géométrique quand on multiplie toujours par le même nombre $q$. Pour le MONTRER, on ne soustrait pas : on DIVISE. On calcule $\\dfrac{u_{n+1}}{u_n}$, et si le résultat ne dépend plus de $n$, la suite est géométrique.",
      schema: egalites(
        [
          `u_{n+1} = q \\times u_n`,
          `u_n = u_0 \\times q^{n}`,
          `\\text{montrer : } \\dfrac{u_{n+1}}{u_n} = ${enBleu("q")}`,
        ],
        "Si tu soustrayais ici, le résultat dépendrait encore de n et tu ne conclurais rien.",
      ),
      micros: ["suite_geometrique"],
    },
    {
      titre: "Monte-t-elle, ou descend-elle ?",
      texte:
        "Pour une suite, pas besoin de dériver : le sens se lit sur la raison. Si la suite est arithmétique, on regarde le signe de $r$. Si elle est géométrique et part d'un nombre positif, on regarde si $q$ est plus grand que $1$, ou compris entre $0$ et $1$.",
      schema: cas(
        [
          { formule: "r > 0", verdict: "elle monte", couleur: VERT },
          { formule: "r < 0", verdict: "elle descend", couleur: ROUGE },
        ],
        "Pour une géométrique à termes positifs : q plus grand que 1 elle monte, q entre 0 et 1 elle descend.",
      ),
      micros: ["suite_variation"],
    },
    {
      titre: "⛔ Ni l'une ni l'autre : la suite auxiliaire",
      texte:
        "Quand $u_{n+1} = a\\,u_n + b$, la suite n'est ni arithmétique ni géométrique, et on ne sait pas écrire son terme général. On pose alors $v_n = u_n - L$, où $L$ est donné par l'énoncé : c'est la valeur qui ne bouge plus, celle qui vérifie $L = aL + b$. Cette nouvelle suite $(v_n)$, elle, est géométrique de raison $a$.",
      schema: suiteAuxiliaire(),
      micros: ["suite_auxiliaire", "suite_limite"],
    },
  ],

  reel: {
    texte:
      "Deux clubs de randonnée ouvrent le même jour à Saint-Denis, avec $250$ membres chacun. Le premier en gagne $30$ par an. Le second voit son nombre de membres augmenter de $12\\,\\%$ par an. La première année, les deux arrivent à $280$ membres : exactement pareil. Dix ans plus tard, le premier en a $550$ et le second $776$. Vingt ans plus tard, $850$ contre $2412$. ⭐ C'est toute la différence entre ajouter et multiplier. Une hausse en pourcentage démarre doucement, parfois plus doucement qu'une hausse fixe, et elle finit toujours par la dépasser.",
  },

  historique: {
    texte:
      "Les suites sont plus vieilles que l'algèbre. Une tablette babylonienne calcule déjà des intérêts composés, c'est-à-dire une suite géométrique, près de deux mille ans avant notre ère. Au XIIIᵉ siècle, Fibonacci pose son célèbre problème de lapins et obtient une suite où chaque terme est la somme des deux précédents. ⚠️ Cette suite-là n'est ni arithmétique ni géométrique : on n'ajoute pas toujours le même nombre, et on ne multiplie pas toujours par le même. Il a fallu attendre le XVIIIᵉ siècle pour savoir écrire son terme général.",
  },

  methode: [
    {
      titre: "1. Je calcule des termes",
      texte:
        "Si la suite est donnée explicitement, je remplace $n$ par la valeur demandée. Si elle est donnée par récurrence, je calcule les termes un par un, dans l'ordre.",
      schema: egalites(
        [
          `u_n = 3n + 5 \\;\\longrightarrow\\; u_{10} = ${enBleu("35")}`,
          `u_0 = 2 \\text{ et } u_{n+1} = 3u_n - 1`,
          `u_1 = 5, \\; u_2 = 14, \\; u_3 = ${enBleu("41")}`,
        ],
        "Avec une récurrence, on ne peut pas sauter : il faut passer par tous les termes.",
      ),
      micros: ["suite_termes", "suite_recurrence"],
    },
    {
      titre: "2. Je reconnais, et je le montre",
      texte:
        "Je calcule la différence entre deux termes consécutifs. Si elle est constante, la suite est arithmétique. Sinon, je calcule le quotient. S'il est constant, elle est géométrique.",
      schema: etapes(
        ["u_{n+1} - u_n", "\\text{constante ?}", "\\text{sinon } \\dfrac{u_{n+1}}{u_n}", "\\text{constant ?}"],
        "Deux tests, toujours dans cet ordre. Si aucun ne marche, on pense à la suite auxiliaire.",
      ),
      micros: ["suite_arithmetique", "suite_geometrique"],
    },
    {
      titre: "3. J'écris le terme général",
      texte:
        "Une fois la famille et la raison connues, le terme général s'écrit tout seul. C'est lui qui permet d'atteindre n'importe quel rang sans calculer les précédents.",
      schema: egalites(
        [
          `\\text{arithmétique}`,
          `u_n = u_0 + rn`,
          `\\text{géométrique}`,
          `u_n = u_0 \\times q^{n}`,
        ],
        "Le premier terme compte : si la suite commence à u₁, les formules se décalent d'un rang.",
      ),
      micros: ["suite_registres"],
    },
  ],

  usages: [
    {
      titre: "⭐ Un pourcentage, c'est une suite géométrique",
      detail:
        "Augmenter de $12\\,\\%$, c'est multiplier par $1{,}12$. Baisser de $10\\,\\%$, c'est multiplier par $0{,}9$. ⛔ La raison n'est jamais le pourcentage lui-même : c'est le coefficient multiplicateur.",
      schema: (
        <>
          {leDuel()}
          {egalites(
            [
              `+ 12\\,\\% \\;\\longrightarrow\\; q = ${enBleu("1{,}12")}`,
              `- 10\\,\\% \\;\\longrightarrow\\; q = ${enRouge("0{,}9")}`,
            ],
            "Deux hausses de 10 % ne font pas 20 % : 1,1 × 1,1 = 1,21, soit 21 %.",
          )}
        </>
      ),
      micros: ["suite_evolution", "suite_modeliser"],
    },
    {
      titre: "Additionner beaucoup de termes",
      detail:
        "Pour une suite arithmétique, la somme vaut le nombre de termes multiplié par la moyenne du premier et du dernier. Pour une géométrique, on applique la formule. ⚠️ De $u_0$ à $u_n$, il y a $n+1$ termes, pas $n$.",
      schema: egalites(
        [
          `1 + 2 + \\ldots + n = \\dfrac{n(n+1)}{2}`,
          `1 + q + \\ldots + q^{n} = \\dfrac{q^{n+1} - 1}{q - 1}`,
        ],
        "La seconde formule ne vaut que si q est différent de 1.",
      ),
      micros: ["suite_sommes", "suite_somme_geo"],
    },
    {
      titre: "Atteindre un seuil",
      detail:
        "« À partir de quelle année dépasse-t-on mille ? » En première, on ne résout pas cette question par une formule : on calcule les termes un par un jusqu'à dépasser la valeur visée. C'est exactement ce que fait un algorithme « tant que ».",
      // ⛔ Mesuré en poche : cette ligne débordait de 85 px. Coupée en deux.
      schema: egalites(
        [
          `\\text{tant que } u \\leqslant 2000 \\text{ :}`,
          `u \\leftarrow 1{,}05 \\times u`,
          `\\text{tours comptés : } n = ${enVert("15")}`,
        ],
        "On répond par le RANG atteint, pas par la valeur.",
      ),
      micros: ["suite_algorithme"],
    },
  ],

  exemples: [
    {
      titre: "Montrer qu'une suite est arithmétique",
      donnees: "$u_n = 7 - 2n$.",
      question: "Montrer que $(u_n)$ est arithmétique, et donner sa raison.",
      solution:
        "$u_{n+1} = 7 - 2(n+1) = 5 - 2n$.\n$u_{n+1} - u_n = (5 - 2n) - (7 - 2n) = -2$.\nLa différence vaut $-2$ quel que soit $n$ : la suite est arithmétique, de raison $-2$ et de premier terme $u_0 = 7$.",
      micros: ["suite_arithmetique"],
    },
    {
      titre: "Montrer qu'une suite est géométrique",
      donnees: "$u_n = 3 \\times 4^{n}$.",
      question: "Montrer que $(u_n)$ est géométrique, et donner sa raison.",
      solution:
        "$u_{n+1} = 3 \\times 4^{n+1} = 3 \\times 4^{n} \\times 4$.\n$\\dfrac{u_{n+1}}{u_n} = 4$.\nLe quotient vaut $4$ quel que soit $n$ : la suite est géométrique, de raison $4$ et de premier terme $u_0 = 3$.",
      micros: ["suite_geometrique"],
    },
    {
      titre: "Calculer une somme",
      donnees: "$(u_n)$ arithmétique, $u_0 = 5$, raison $3$.",
      question: "Calculer $u_0 + u_1 + \\ldots + u_{20}$.",
      solution:
        "De $u_0$ à $u_{20}$, il y a $21$ termes.\n$u_{20} = 5 + 20 \\times 3 = 65$.\n$S = 21 \\times \\dfrac{5 + 65}{2} = 21 \\times 35 = 735$.\n⛔ Compter $20$ termes au lieu de $21$ est l'erreur la plus fréquente.",
      micros: ["suite_sommes"],
    },
    {
      titre: "La suite auxiliaire",
      donnees: "$u_0 = 10$ et $u_{n+1} = 0{,}8\\,u_n + 6$. On pose $v_n = u_n - 30$.",
      question: "Montrer que $(v_n)$ est géométrique, puis exprimer $u_n$.",
      solution:
        "$v_{n+1} = u_{n+1} - 30 = 0{,}8\\,u_n + 6 - 30 = 0{,}8\\,u_n - 24$.\nOr $0{,}8 \\times 30 = 24$, donc $v_{n+1} = 0{,}8\\,(u_n - 30) = 0{,}8\\,v_n$.\n$(v_n)$ est géométrique de raison $0{,}8$, avec $v_0 = 10 - 30 = -20$.\nDonc $v_n = -20 \\times 0{,}8^{n}$, et $u_n = v_n + 30 = -20 \\times 0{,}8^{n} + 30$.\n⛔ Ne pas s'arrêter à $v_n$ : la question porte sur $u_n$.",
      micros: ["suite_auxiliaire"],
    },
  ],

  pieges: [
    "⛔ Confondre la raison et le premier terme. Dans $u_n = 5 + 4n$, la raison est $4$, et $5$ est le premier terme.",
    "⛔ Soustraire pour montrer qu'une suite est géométrique. Pour une géométrique, on DIVISE.",
    "⛔ Prendre le pourcentage pour la raison. Une hausse de $12\\,\\%$ donne $q = 1{,}12$, jamais $q = 12$.",
    "⚠️ Compter $n$ termes de $u_0$ à $u_n$. Il y en a $n+1$ : le rang $0$ est un terme comme les autres.",
    "⚠️ S'arrêter à $v_n$ dans un exercice de suite auxiliaire. La question porte presque toujours sur $u_n$.",
    "⚠️ Croire qu'une hausse fixe reste devant une hausse en pourcentage. Elle est dépassée, toujours : la seule question est quand.",
  ],

  aRetenir: [
    "⭐ On ajoute toujours le même nombre : ARITHMÉTIQUE, $u_n = u_0 + rn$.",
    "⭐ On multiplie toujours par le même nombre : GÉOMÉTRIQUE, $u_n = u_0 \\times q^{n}$.",
    "Montrer : la DIFFÉRENCE pour une arithmétique, le QUOTIENT pour une géométrique.",
    "Un pourcentage se traduit par un coefficient multiplicateur : $+ 12\\,\\%$ donne $1{,}12$.",
    "Le sens de variation se lit sur la raison, sans dériver.",
    "Ni l'une ni l'autre : on pose $v_n = u_n - L$, et $(v_n)$ devient géométrique.",
  ],

  coachHref: "/coach-ia/maths?classe=premiere-spe",

  entrainement: [
    {
      question: "Soit $u_n = 4n - 7$. Donner la raison et le premier terme.",
      correction: "$u_{n+1} - u_n = 4$ : arithmétique de raison $4$, et $u_0 = -7$.",
    },
    {
      question: "Soit $u_0 = 2$ et $u_{n+1} = 3u_n - 1$. Calculer $u_3$.",
      correction: "$u_1 = 5$, $u_2 = 14$, $u_3 = 41$. On passe par tous les termes.",
    },
    {
      question: "Un loyer de $200$ € augmente de $8\\,\\%$ par an. Quel est le loyer au bout de $3$ ans ?",
      correction: "$200 \\times 1{,}08^{3} \\approx 251{,}94$ €. ⛔ Et non $248$ € : le pourcentage porte chaque année sur un loyer déjà augmenté.",
    },
    {
      question: "Calculer $1 + 2 + \\ldots + 50$.",
      correction: "$\\dfrac{50 \\times 51}{2} = 1275$.",
    },
    {
      question: "Soit $u_n = 5 \\times 2^{n}$. Cette suite monte-t-elle ou descend-elle ?",
      correction: "$q = 2$, plus grand que $1$, et le premier terme est positif : elle monte.",
    },
    {
      question: "$(v_n)$ est géométrique de raison $0{,}5$, $v_0 = 60$, et $v_n = u_n - 40$. Exprimer $u_n$.",
      correction: "$v_n = 60 \\times 0{,}5^{n}$, donc $u_n = 60 \\times 0{,}5^{n} + 40$. La suite s'approche de $40$.",
    },
  ],
};
