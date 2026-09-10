// ─── Fiche de cours : algorithmique et Python (2de) ───────────────────────────
//
// Onzième fiche de seconde. Alignée sur la banque
// lib/tutor-v4/questionBank/seconde/maths/algorithmique-python.bank.ts
// (notion algorithmique_python_2de), et sur la 5e comme étalon.
//
// ⭐ FRÉDÉRIC, 10/09/2026 : « c'est une notion TRANSVERSALE ». Elle ne se range
// pas à côté des autres chapitres, elle les SERT tous — on programme pour
// simuler une probabilité, pour calculer une moyenne, pour tester une conjecture
// sur mille cas. La fiche le dit dès l'accroche, et le bloc « à quoi ça sert »
// est bâti là-dessus.
//
// ⭐ ICI, LE VISUEL EST LE CODE. Pas de tableau de données : un programme se
// montre en programme. D'où deux aides locales — `code()` qui pose un bloc
// monospace avec une ligne en couleur, et `trace()` qui montre une variable
// changer de valeur tour après tour. C'est la forme « schéma » de ce chapitre.
//
// ⛔ LE PIÈGE CENTRAL, ET IL EST MESURÉ : `=` n'est PAS l'égalité des maths.
// `x = x + 1` est une phrase fausse en mathématiques et une instruction juste en
// Python. Tant que l'élève lit une égalité, il ne peut pas tracer un programme.
//
// ⚠️ SECOND PIÈGE, ABSENT DU COACH JUSQU'AU 10/09 : `/` rend TOUJOURS un
// flottant. `6 / 3` vaut `2.0`, pas `2`. C'est le piège de type le plus courant,
// et il a désormais son générateur.
//
// Micro-compétences couvertes :
// - python_variable_affectation → propriété « La variable », méthode 1, exemple 1, exos 1-2
// - python_type_variable        → propriété « Les types », exemple 2, exos 3-4
// - python_condition            → propriété « Les conditions », exemple 3, exos 5-6
// - python_boucle               → propriété « Les boucles », usages, exo 7
// - python_boucle_non_bornee    → propriété « Les boucles », exemple 4, exo 8
// - python_fonction             → propriété « Les fonctions », exo 9
// - python_simulation           → propriété « La simulation », le réel, exo 10

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";

const ROUGE = "#dc2626";
const BLEU = "#2563eb";
const VERT = "#059669";

/**
 * Un bloc de code, avec une ligne mise en couleur.
 *
 * ⭐ POURQUOI PAS UN CANVAS. `tableau_donnees` ne traverse jamais `TexteMath` et
 * n'a pas de police à chasse fixe : un programme y perdrait son alignement,
 * c'est-à-dire ce qui porte le sens en Python. L'indentation EST la syntaxe.
 *
 * ⚠️ `whitespace-pre` et non `pre-wrap` : une ligne de code ne se replie pas au
 * milieu. Si elle dépasse, c'est la ligne qui est trop longue — on la raccourcit
 * à l'écriture plutôt que de la laisser casser.
 */
function code(lignes: string[], enCouleur?: number, legende?: string) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-900 p-3">
      <pre className="overflow-x-auto whitespace-pre font-mono text-[13px] leading-6 text-slate-100">
        {lignes.map((l, i) => (
          <div key={i} style={i === enCouleur ? { color: "#fca5a5" } : undefined}>
            {l}
          </div>
        ))}
      </pre>
      {legende ? (
        <p className="mt-2 text-xs leading-5 text-slate-400">{legende}</p>
      ) : null}
    </div>
  );
}

/**
 * La trace d'une variable : ses valeurs successives, reliées par des flèches.
 *
 * ⭐ C'est le geste central du chapitre, et il ne se raconte pas — il se voit.
 * Un élève qui sait tracer sait lire n'importe quel programme.
 */
function trace(nom: string, valeurs: (string | number)[], legende?: string) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4">
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-mono text-sm">
        <span className="font-semibold" style={{ color: BLEU }}>
          {nom}
        </span>
        {valeurs.map((v, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="text-slate-400">→</span>
            <span
              className="rounded bg-white px-2 py-0.5 ring-1 ring-slate-200"
              style={i === valeurs.length - 1 ? { color: ROUGE, fontWeight: 700 } : undefined}
            >
              {v}
            </span>
          </span>
        ))}
      </div>
      {legende ? (
        <p className="mt-2 text-center text-xs leading-5 text-slate-500">{legende}</p>
      ) : null}
    </div>
  );
}

/** Deux blocs côte à côte, pour opposer deux structures. */
function opposer(
  gauche: { titre: string; lignes: string[] },
  droite: { titre: string; lignes: string[] },
  legende?: string,
) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
      <div className="flex flex-col gap-2 sm:flex-row">
        {[gauche, droite].map((b, i) => (
          <div key={i} className="flex-1 rounded-lg bg-slate-900 p-2">
            <div
              className="mb-1 text-center text-xs font-bold"
              style={{ color: i === 0 ? "#93c5fd" : "#86efac" }}
            >
              {b.titre}
            </div>
            <pre className="overflow-x-auto whitespace-pre font-mono text-[12px] leading-5 text-slate-100">
              {b.lignes.join("\n")}
            </pre>
          </div>
        ))}
      </div>
      {legende ? (
        <p className="mt-2 text-center text-xs leading-5 text-slate-500">{legende}</p>
      ) : null}
    </div>
  );
}

export const fichePythonSeconde: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "seconde",
  notion: "algorithmique-python-2de",
  titre: "Algorithmique et Python",
  accroche:
    "Ce chapitre n'est pas un chapitre à côté des autres : c'est un OUTIL qui les sert tous. On programme pour simuler mille lancers de dé, pour tester une conjecture sur tous les nombres jusqu'à cent, pour calculer ce qu'on ne veut pas calculer à la main. Et pour cela, il suffit de savoir lire un programme ligne à ligne.",
  identite: [
    { label: "Mots clés", valeur: "Variable, affectation, condition, boucle, fonction" },
    { label: "Le secret", valeur: "Suivre le programme ligne à ligne, en notant les valeurs" },
    { label: "Outil", valeur: "Un ordinateur qui répète sans se tromper ni se fatiguer" },
  ],

  definition: {
    texte:
      "Un ALGORITHME est une suite d'instructions qui mène d'une donnée à un résultat. Python est un langage qui permet de l'écrire pour qu'une machine l'exécute. Une VARIABLE est un nom qui retient une valeur ; l'AFFECTATION `x = 5` range la valeur $5$ dans la boîte nommée $x$. ⛔ Ce signe `=` n'est pas l'égalité des mathématiques : il ne compare pas, il RANGE.",
  },

  figure: {
    schema: code(
      ["x = 5", "y = x + 3", "print(y)"],
      1,
      "Trois instructions, exécutées dans l'ordre. La ligne rouge lit x, calcule, et range le résultat dans y. Le programme affiche 8.",
    ),
    legende:
      "Un programme se lit de haut en bas, une ligne à la fois. ⭐ À chaque ligne, on peut noter ce que valent les variables : c'est tout le métier de ce chapitre.",
  },

  proprietes: [
    {
      titre: "⛔ La variable : `=` range, il ne compare pas",
      texte:
        "`x = x + 1` est une phrase FAUSSE en mathématiques et une instruction JUSTE en Python. On calcule d'abord la droite avec l'ancienne valeur, puis on range le résultat à gauche. Pour comparer, Python utilise `==`, avec deux signes.",
      schema: trace(
        "x",
        [0, 1, 2, 3],
        "Après x = 0, l'instruction x = x + 1 répétée trois fois. À chaque tour, l'ancienne valeur sert à calculer la nouvelle.",
      ),
    },
    {
      titre: "Les types, et le piège de la division",
      texte:
        "Une valeur a un TYPE : entier (`int`), flottant (`float`), chaîne (`str`), booléen (`bool`). ⛔ En Python 3, l'opérateur `/` rend TOUJOURS un flottant, même quand la division tombe juste : `6 / 3` vaut `2.0`, pas `2`. Pour un entier, il faut la division entière `//`.",
      schema: code(
        ["6 / 3   → 2.0    (float)", "6 // 3  → 2      (int)", "6 % 4   → 2      (int)", "6 > 3   → True   (bool)"],
        0,
        "Quatre opérateurs, quatre types de résultat. La ligne rouge est celle qui surprend.",
      ),
    },
    {
      titre: "Les conditions : un seul bloc s'exécute",
      texte:
        "`if` teste, `elif` teste seulement si le précédent était faux, `else` ramasse le reste. On descend les tests dans l'ordre et on s'arrête au PREMIER qui est vrai. ⭐ `n % 2 == 0` est le test de parité : le reste de la division par $2$ vaut $0$.",
      schema: code(
        ["if note >= 16:", "    print(\"tres bien\")", "elif note >= 10:", "    print(\"admis\")", "else:", "    print(\"a revoir\")"],
        2,
        "Avec note = 12 : le premier test échoue, la ligne rouge est vraie, et le programme s'arrête là.",
      ),
    },
    {
      titre: "Les boucles : on sait combien, ou on sait quand",
      texte:
        "`for` répète un nombre de fois CONNU d'avance — `range(5)` donne cinq tours, de $0$ à $4$. `while` répète TANT QUE sa condition reste vraie : on ne sait pas combien de tours, on sait seulement quand ça s'arrête.",
      schema: opposer(
        { titre: "for — bornée", lignes: ["s = 0", "for i in range(4):", "    s = s + i"] },
        { titre: "while — non bornée", lignes: ["x = 1", "while x < 50:", "    x = x * 2"] },
        "À gauche, quatre tours, décidés d'avance. À droite, on compte en traçant : 1, 2, 4, 8, 16, 32, 64 — six tours.",
      ),
    },
    {
      titre: "Les fonctions : `def` et `return`",
      texte:
        "Une fonction porte un nom, reçoit des arguments et RENVOIE un résultat avec `return`. On l'écrit une fois, on l'appelle autant qu'on veut. ⚠️ `return` renvoie une valeur au programme ; `print` l'affiche seulement à l'écran. Ce n'est pas la même chose.",
      schema: code(
        ["def f(x):", "    return 2 * x + 1", "", "f(3)   → 7", "f(10)  → 21"],
        1,
        "La ligne rouge est le calcul. Écrit une fois, il sert pour toutes les valeurs.",
      ),
    },
    {
      titre: "La simulation : compter ce qu'on ne peut pas prévoir",
      texte:
        "`randint(1, 6)` tire un entier au hasard entre $1$ et $6$, LES DEUX BORNES COMPRISES — donc six valeurs possibles. En répétant beaucoup et en comptant les succès, on ESTIME une probabilité : c'est la fréquence observée.",
      schema: code(
        ["c = 0", "for i in range(1000):", "    if randint(1, 6) == 6:", "        c = c + 1", "print(c / 1000)"],
        3,
        "Le compteur ne monte que sous condition. À la fin, c / 1000 estime la probabilité d'obtenir un 6.",
      ),
    },
  ],

  reel: {
    texte:
      "C'est le chapitre qui sert tous les autres. En probabilités, on simule dix mille lancers pour voir la fréquence s'approcher de la théorie. En statistiques, on calcule une moyenne sur une série qu'aucun élève ne voudrait additionner à la main. En arithmétique, on teste une conjecture sur tous les entiers jusqu'à mille. ⭐ Et hors du lycée : un moteur de recherche, un GPS, une application de messagerie ne sont que des algorithmes — des suites d'instructions, écrites une fois, exécutées des milliards de fois.",
  },

  historique: {
    texte:
      "Le mot « algorithme » vient du nom d'al-Khwârizmî, le mathématicien de Bagdad qui donna aussi son titre à l'algèbre au IXᵉ siècle : une suite de gestes à faire dans l'ordre, sans avoir à comprendre pourquoi ils marchent. Python, lui, est né en 1991 sous les doigts du Néerlandais Guido van Rossum, qui cherchait un langage lisible — et qui l'a baptisé non pas d'après le serpent, mais d'après la troupe comique des Monty Python.",
  },

  methode: [
    {
      titre: "Je trace, ligne à ligne",
      texte:
        "Je note la valeur de chaque variable APRÈS chaque instruction. C'est lent, c'est sûr, et c'est ce qu'on attend au contrôle : personne ne demande de deviner.",
      schema: trace(
        "s",
        [0, 0, 1, 3, 6],
        "s = 0, puis s = s + i pour i valant 0, 1, 2, 3. La dernière valeur est la réponse.",
      ),
    },
    {
      titre: "Je repère la structure avant le détail",
      texte:
        "Une indentation ouvre un bloc. Ce qui est décalé appartient au `if` ou à la boucle au-dessus ; ce qui revient à gauche s'exécute après. ⛔ En Python, l'alignement n'est pas de la mise en forme : c'est de la syntaxe.",
      schema: code(
        ["for i in range(3):", "    print(i)      # dans la boucle", "print(\"fini\")     # apres la boucle"],
        1,
        "La ligne rouge est décalée, donc répétée trois fois. La dernière ne l'est pas : elle s'exécute une seule fois.",
      ),
    },
    {
      titre: "Je vérifie sur un petit cas",
      texte:
        "Avant de faire confiance à un programme, je le fais tourner mentalement avec une valeur simple dont je connais la réponse. Si le programme se trompe là, inutile de l'essayer plus loin.",
      schema: code(
        ["def carre(x):", "    return x * x", "", "carre(3)  → 9   ✓"],
        3,
        "Un cas dont on connaît la réponse suffit à démasquer la plupart des erreurs.",
      ),
    },
  ],

  usages: [
    {
      titre: "Tracer un programme",
      detail:
        "« Que vaut x à la fin ? » — c'est LA question du contrôle. On suit les instructions dans l'ordre en notant les valeurs, sans chercher de raccourci.",
      schema: trace("x", [1, 2, 4, 8, 16], "x = 1 puis x = x * 2, tant que x < 10."),
    },
    {
      titre: "Compter sous condition",
      detail:
        "Un compteur qui ne monte que si un test est vrai : c'est le motif de toutes les simulations, et de tout dénombrement.",
      schema: code(
        ["c = 0", "for t in [3, 6, 1, 6, 4]:", "    if t == 6:", "        c = c + 1"],
        2,
        "La ligne rouge décide. Ici c finit à 2.",
      ),
    },
    {
      titre: "Estimer une probabilité",
      detail:
        "On répète l'expérience un grand nombre de fois, on compte les succès, on divise. Plus on répète, plus l'estimation est fiable.",
      schema: trace(
        "c / n",
        ["0,20", "0,17", "0,167"],
        "La même simulation avec 10, 100 puis 10 000 lancers : l'estimation se rapproche de 1/6 ≈ 0,1667.",
      ),
    },
  ],

  exemples: [
    {
      titre: "Une affectation qui se mord la queue",
      donnees: "`a = 2` puis `b = a` puis `a = 7`.",
      question: "Que vaut `b` ?",
      schema: trace("b", [2, 2], "b a copié la valeur de a, pas la boîte a."),
      solution:
        "`b` vaut $2$. À la ligne `b = a`, Python lit la VALEUR d'a — c'est-à-dire $2$ — et la range dans b. Changer a ensuite ne touche plus à b. ⛔ L'erreur est de croire que b « suit » a : une affectation copie une valeur, elle ne crée pas de lien.",
    },
    {
      titre: "⛔ Le type d'une division",
      donnees: "`8 / 4` et `8 // 4`.",
      question: "Ces deux expressions ont-elles le même type ?",
      schema: code(["8 / 4   → 2.0   (float)", "8 // 4  → 2     (int)"], 0),
      solution:
        "Non. Les deux valent deux, mais `8 / 4` rend `2.0`, un FLOTTANT, tandis que `8 // 4` rend `2`, un ENTIER. ⭐ On ne regarde pas si le calcul tombe juste, on regarde l'OPÉRATEUR : en Python 3, `/` rend toujours un flottant.",
    },
    {
      titre: "Un test de parité",
      donnees: "`n = 37`.",
      question: "Qu'affiche `if n % 2 == 0: print(\"pair\") else: print(\"impair\")` ?",
      schema: code(["37 % 2  → 1", "1 == 0  → False", "→ else"], 1),
      solution:
        "Le programme affiche « impair ». `37 % 2` donne le reste de la division de $37$ par $2$, soit $1$. La condition `1 == 0` est fausse, donc c'est le bloc `else` qui s'exécute. ⭐ Tester la parité, c'est tester si ce reste vaut zéro.",
    },
    {
      titre: "Combien de tours ?",
      donnees: "`x = 1` et `c = 0`, puis `while x < 20: x = x * 2; c = c + 1`.",
      question: "Que vaut `c` à la fin ?",
      schema: trace("x", [1, 2, 4, 8, 16, 32], "Cinq doublements pour dépasser 20."),
      solution:
        "`c` vaut $5$. On trace : x vaut $1$, $2$, $4$, $8$, $16$, puis $32$ — et à ce moment la condition `x < 20` devient fausse, la boucle s'arrête. Il y a eu cinq passages, donc cinq incréments. ⛔ Ce nombre ne se devine pas : une boucle `while` se COMPTE.",
    },
  ],

  pieges: [
    "⛔ `=` n'est pas l'égalité. `x = x + 1` range dans x l'ancienne valeur augmentée de un. Pour comparer, on écrit `==`, avec deux signes.",
    "⛔ `/` rend toujours un flottant en Python 3 : `6 / 3` vaut `2.0`. Pour un entier, c'est `//`.",
    "⛔ `range(5)` donne $0, 1, 2, 3, 4$ — cinq valeurs, et la dernière n'est pas $5$. De même `range(1, 4)` s'arrête à $3$.",
    "⛔ L'indentation est de la SYNTAXE, pas de la décoration. Une ligne décalée appartient au bloc au-dessus ; la même ligne non décalée s'exécute une seule fois.",
    "⛔ Dans un `if / elif / else`, un SEUL bloc s'exécute. Dès qu'un test est vrai, les suivants ne sont même pas lus.",
    "⛔ `return` renvoie une valeur au programme, `print` l'affiche à l'écran. Une fonction sans `return` ne renvoie rien, même si elle affiche quelque chose.",
  ],

  aRetenir: [
    "`x = 5` range $5$ dans x ; `x == 5` demande si x vaut $5$.",
    "Types : `int`, `float`, `str`, `bool`. Et `/` rend toujours un `float`.",
    "`n % 2 == 0` teste si n est pair.",
    "`for` : on sait combien de tours. `while` : on sait quand s'arrêter.",
    "`range(n)` va de $0$ à $n-1$ : n valeurs, pas n+1.",
    "Pour répondre à « que vaut x à la fin ? », on TRACE ligne à ligne.",
  ],

  entrainement: [
    {
      question: "Après `x = 4` puis `x = x + 6`, que vaut x ?",
      correction:
        "$10$. Python calcule d'abord la droite avec l'ancienne valeur — $4 + 6 = 10$ — puis range le résultat dans x.",
    },
    {
      question: "Après `a = 3`, `b = a`, `a = 9`, que vaut b ?",
      correction:
        "$3$. La ligne `b = a` a copié la VALEUR d'a au moment où elle s'exécutait. Changer a ensuite ne modifie pas b.",
    },
    {
      question: "Quel est le type de `10 / 5` en Python ?",
      correction:
        "Un flottant (`float`) : `10 / 5` vaut `2.0`. L'opérateur `/` rend toujours un flottant, même quand la division tombe juste.",
    },
    {
      question: "Quel est le type de `17 % 5` ?",
      correction:
        "Un entier (`int`). `%` donne le reste d'une division euclidienne : ici $2$. C'est `/` qui rend un flottant, pas `%` ni `//`.",
    },
    {
      question: "Avec `n = 24`, qu'affiche `if n % 2 == 0: print(\"pair\") else: print(\"impair\")` ?",
      correction:
        "« pair ». $24 \\% 2 = 0$, donc la condition est vraie.",
    },
    {
      question: "Avec `note = 8`, qu'affiche `if note >= 16: \"tres bien\" elif note >= 10: \"admis\" else: \"a revoir\"` ?",
      correction:
        "« a revoir ». Les deux premiers tests échouent — $8 < 16$ et $8 < 10$ — donc c'est le bloc `else` qui s'exécute.",
    },
    {
      question: "Que vaut s après `s = 0` puis `for i in range(4): s = s + i` ?",
      correction:
        "$6$. i prend les valeurs $0$, $1$, $2$, $3$ — et non $4$ — donc $s = 0+1+2+3 = 6$.",
    },
    {
      question: "Que vaut c après `x = 1`, `c = 0`, `while x < 100: x = x * 2; c = c + 1` ?",
      correction:
        "$7$. On trace : $1, 2, 4, 8, 16, 32, 64, 128$. Il faut sept doublements pour dépasser $100$.",
    },
    {
      question: "Avec `def f(x): return 3 * x - 2`, que vaut `f(5)` ?",
      correction:
        "$13$. On remplace x par $5$ dans l'expression : $3 \\times 5 - 2 = 13$.",
    },
    {
      question: "Une simulation de $2000$ lancers compte $340$ succès. Quelle estimation de la probabilité ?",
      correction:
        "$\\dfrac{340}{2000} = 0{,}17$. Une estimation est une FRÉQUENCE observée : le nombre de succès divisé par le nombre d'essais.",
    },
  ],

  coachHref: "/coach-ia/maths?classe=seconde",
};

export const slidesPythonSeconde: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Algorithmique et Python - 2de",
    section: {
      type: "objectif",
      phrase: "Lire un programme ligne à ligne, et savoir ce qu'il vaut à la fin",
      sousPhrase:
        "Variable, condition, boucle, fonction : quatre briques, et un outil qui sert tous les autres chapitres.",
    },
  },
];
