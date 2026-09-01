// ─── Fiche de cours : le théorème de Thalès (3e) ───────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/thales.bank.ts, notionId thales_theoreme).
//
// ⚠️⚠️ CETTE FICHE N'AJOUTE PRESQUE RIEN À CELLE DE 4e, ET IL FAUT LE DIRE.
// Comparaison des micros, faite avant d'écrire :
//   4e  SEPT micros : reconnaitre, rapports, calculer, vérifier l'égalité pour
//       la réciproque, conclure au parallélisme, rédiger, défis.
//   3e  SIX micros  : configuration, rapports, calculer, réciproque, rédiger,
//       défis. C'est un SOUS-ENSEMBLE — la 3e ne découpe même plus la
//       réciproque en deux gestes.
// 👉 Contrairement à la trigonométrie (qui passe d'un rapport à trois) ou aux
// équations (qui gagnent le produit nul), Thalès en 3e est une REPRISE. La
// fiche l'assume : elle est écrite pour le brevet, pas pour découvrir.
//
// ⭐⭐ MAIS UN DÉSACCORD MESURÉ JUSTIFIE À LUI SEUL CETTE FICHE. Le papillon :
//   · la FICHE de 4e l'enseigne (elle a un dessin dédié) ;
//   · la BANQUE de 4e ne le teste JAMAIS — zéro occurrence de « papillon » ;
//   · la BANQUE de 3e le teste TROIS fois, dont un calcul complet ;
//   · et la 3e n'avait aucune fiche.
// Autrement dit, la seule classe qui interroge le papillon était la seule à ne
// pas l'enseigner. C'est le trou que cette fiche ferme, et c'est pourquoi le
// papillon y a deux blocs au lieu d'un.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Les nombres de la
// fiche sortent de la banque : AB = 3, AC = 6, AM = 2, AN = 4 pour le papillon.
//
// ⚠️ LA GÉOMÉTRIE DU DESSIN EST REPRISE DE LA FICHE DE 4e, ET CE N'EST PAS DE
// LA PARESSE : elle y a été MESURÉE, et la fenêtre est étroite. M doit tomber
// entre 0,30 et 0,34 de [AB] — en deçà, son étiquette touche celle de [AM] ; au
// delà, elle touche celle de [AB]. Les largeurs de cadre (228 et 212) sont
// elles aussi mesurées : à 240, les lettres tombaient à 10,8 px. Redécouvrir
// tout cela aurait coûté une heure pour retrouver les mêmes nombres.
// ⛔ Et PAS de `showFormula` : la formule interne du canvas est écrite en
// 10,5 px, soit 9,7 px dans une carte de 222.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

type Cotes = Partial<Record<"AB" | "AC" | "BC" | "AM" | "AN" | "MN", string>>;

/** La configuration en triangles emboîtés. Géométrie reprise de la 4e. */
const thales = (opts: { sideLabels?: Cotes; bloc?: "carte" | "exemple" }) => {
  const petit = opts.bloc === "exemple";
  const largeur = petit ? 212 : 228;
  const k = largeur / 340;
  const M_SUR_AB = 0.32;
  return (
    <CanvasRenderer
      figure={{
        kind: "thales",
        variant: "triangle",
        size: { width: largeur, height: Math.round(largeur * 0.85) },
        points: {
          A: { x: 55 * k, y: 230 * k },
          B: { x: 285 * k, y: 230 * k },
          C: { x: 180 * k, y: 70 * k },
          M: { x: (55 + M_SUR_AB * 230) * k, y: 230 * k },
        },
        sideLabels: opts.sideLabels,
        display: {
          showPoints: true,
          showLabels: true,
          showSideLabels: !!opts.sideLabels,
          showParallelMarks: true,
          highlightParallel: true,
          showFormula: false,
        },
      }}
    />
  );
};

/** Le papillon : les deux triangles de part et d'autre du point commun. */
const papillon = (opts: { sideLabels?: Cotes; bloc?: "carte" | "exemple" } = {}) => {
  const largeur = opts.bloc === "exemple" ? 212 : 228;
  return (
    <CanvasRenderer
      figure={{
        kind: "thales",
        variant: "papillon",
        size: { width: largeur, height: Math.round(largeur * 0.85) },
        sideLabels: opts.sideLabels,
        display: {
          showPoints: true,
          showLabels: true,
          showSideLabels: !!opts.sideLabels,
          showParallelMarks: true,
          highlightParallel: true,
          showFormula: false,
        },
      }}
    />
  );
};

const tableau = (data: Record<string, unknown>, compact = false) => (
  <CanvasRenderer
    figure={{ kind: "tableau_donnees", display: { compact }, ...data } as never}
  />
);

export const ficheThales3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  notion: "thales-theoreme",
  titre: "Le théorème de Thalès",
  accroche:
    "Le théorème est celui de la quatrième, mot pour mot. Ce qui change en troisième, c'est ce qu'on en attend au brevet : reconnaitre la configuration même quand elle est retournée en papillon, et rédiger une justification qui tienne — parce que les points sont donnés pour le raisonnement, pas seulement pour le résultat.",
  identite: [
    { label: "Prérequis", valeur: "Droites parallèles, proportionnalité, quotients égaux" },
    { label: "Les deux formes", valeur: "Triangles emboités, et papillon" },
    { label: "L'idée clé", valeur: "Deux parallèles coupées par deux sécantes" },
  ],
  definition: {
    texte:
      "Deux droites sécantes en un point A sont coupées par deux droites parallèles. Le théorème de Thalès affirme alors que les longueurs découpées sur ces sécantes sont proportionnelles : les trois quotients AM/AB, AN/AC et MN/BC sont égaux. Il faut donc DEUX conditions, et pas une : des points alignés sur deux sécantes issues du même point, et deux droites parallèles.",
  },
  figure: {
    schema: legende(
      thales({ sideLabels: { AM: "AM", AB: "AB", AN: "AN", AC: "AC" } }),
      "$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$",
    ),
    legende:
      "Les droites (MN) et (BC) sont parallèles : les longueurs découpées sur (AB) et sur (AC) sont proportionnelles.",
  },
  proprietes: [
    {
      titre: "Il faut deux sécantes ET deux parallèles",
      texte:
        "C'est la condition d'entrée, et elle se vérifie AVANT tout calcul. Deux droites qui se coupent en A, deux droites parallèles qui les traversent. S'il manque le parallélisme, le théorème ne s'applique pas — et rien n'autorise à écrire les quotients.",
      micros: ["thales_configuration"],
      schema: legende(
        thales({}),
        "les marques indiquent le parallélisme",
      ),
    },
    {
      titre: "La configuration en triangles emboités",
      texte:
        "C'est la forme la plus courante : M appartient au segment [AB], N au segment [AC], et la droite (MN) est parallèle à (BC). Le petit triangle AMN est comme une réduction du grand triangle ABC.",
      micros: ["thales_configuration"],
      schema: legende(
        thales({ sideLabels: { AM: "AM", AB: "AB" } }),
        "le petit triangle est emboité dans le grand",
      ),
    },
    {
      titre: "La configuration en papillon",
      texte:
        "C'est la MÊME situation, retournée : les deux triangles sont de part et d'autre du point A, opposés par le sommet. Un élève qui n'a vu que des triangles emboités ne reconnait plus Thalès du tout — c'est l'erreur de configuration la plus fréquente au brevet.",
      micros: ["thales_configuration"],
      schema: legende(
        papillon(),
        "les deux triangles, de part et d'autre de $A$",
      ),
    },
    {
      titre: "Le papillon donne les mêmes quotients",
      texte:
        "Et c'est tout l'intérêt de le reconnaitre : une fois la configuration identifiée, on écrit exactement les mêmes égalités que dans le cas emboité. Rien à retenir en plus, rien à adapter. Seul le dessin a changé de forme.",
      micros: ["thales_configuration", "thales_rapport"],
      schema: legende(
        papillon({ sideLabels: { AM: "2 cm", AB: "3 cm", AN: "4 cm", AC: "6 cm" } }),
        "$\\dfrac{2}{3} = \\dfrac{4}{6}$ : les quotients sont égaux",
      ),
    },
    {
      // ⭐⭐ LE LIEN QUE FRÉDÉRIC A FAIT, ET QUI VAUT UN BLOC À LUI SEUL :
      // « la configuration papillon, c'est où l'homothétie a un rapport
      // négatif ». C'est exact, et ça relie deux notions que la 3e enseigne
      // séparément — `sym_transformation` et `thales_theoreme`. Le papillon
      // n'est pas une bizarrerie de figure : c'est l'image du triangle par une
      // homothétie de rapport négatif, qui envoie chaque point DE L'AUTRE CÔTÉ
      // du centre. Voir lib/fiches/maths-3e-transformations.tsx.
      // ⚠️ ET LES DEUX FICHES NE NOMMENT PAS CE POINT PAREIL — Frédéric l'a
      // relevé aussitôt : « mais centre O ». Le centre de l'homothétie est le
      // point d'intersection des deux sécantes, que Thalès appelle A et que les
      // transformations appellent O. Laisser les deux notations se contredire
      // en silence, c'est précisément ce qui empêche l'élève de voir que les
      // deux chapitres parlent du même objet. Le texte le dit donc.
      titre: "Le papillon est une homothétie de rapport négatif",
      texte:
        "Les deux configurations sont en réalité la même transformation. Le centre de cette homothétie est le point où les deux sécantes se croisent : on le note A ici, mais c'est exactement le point que la fiche des transformations appelle O. Dans le cas emboité, le petit triangle est l'image du grand par une homothétie de rapport POSITIF. Dans le papillon, le rapport est NÉGATIF : le signe moins est précisément ce qui fait basculer l'image de l'autre côté du centre. C'est pour cela que les quotients de longueurs restent identiques — seule la position change.",
      micros: ["thales_configuration", "thales_rapport"],
      schema: tableau({
        headers: ["configuration", "le rapport"],
        rows: [
          { values: ["triangles emboités", "positif"] },
          { values: ["papillon", "négatif"] },
        ],
        highlight: { row: 1 },
        caption: "le signe décide du côté",
      }),
    },
    {
      titre: "Les quotients se lisent dans le même ordre",
      texte:
        "C'est là que les erreurs se logent. Chaque quotient met le PETIT au numérateur et le GRAND au dénominateur, et l'on respecte le même ordre dans les trois : AM/AB, puis AN/AC, puis MN/BC. Mélanger l'ordre, c'est écrire une égalité fausse tout en croyant appliquer le théorème.",
      micros: ["thales_rapport"],
      schema: tableau({
        headers: ["sur (AB)", "sur (AC)", "les parallèles"],
        rows: [{ values: ["AM / AB", "AN / AC", "MN / BC"] }],
        highlight: { row: 0 },
        caption: "le petit au-dessus, toujours dans le même ordre",
      }),
    },
    {
      titre: "Trois longueurs connues suffisent",
      texte:
        "Pour calculer la quatrième, on écrit l'égalité des deux quotients qui contiennent les longueurs utiles, et on résout par le produit en croix. On n'écrit jamais les trois quotients quand deux suffisent.",
      micros: ["thales_calculer_longueur"],
      schema: legende(
        thales({ sideLabels: { AM: "2 cm", AB: "3 cm", AN: "?", AC: "6 cm" } }),
        "trois longueurs connues, une inconnue",
      ),
    },
    {
      titre: "La réciproque démontre le parallélisme",
      texte:
        "On l'emploie dans l'autre sens : si les points sont alignés dans le MÊME ORDRE sur les deux sécantes et si les quotients sont égaux, alors les droites sont parallèles. C'est le seul outil du collège qui permet de conclure « ces droites sont parallèles » à partir de longueurs.",
      micros: ["thales_reciproque"],
      schema: tableau({
        headers: ["on connait", "on en déduit"],
        rows: [
          { values: ["les parallèles", "les quotients sont égaux"] },
          { values: ["les quotients égaux", "les droites sont parallèles"] },
        ],
        highlight: { row: 1 },
        caption: "le théorème, puis sa réciproque",
      }),
    },
    {
      titre: "L'ordre des points conditionne la réciproque",
      texte:
        "Attention : l'égalité des quotients ne suffit pas. Il faut AUSSI que les points soient rangés dans le même ordre sur les deux droites — A, M, B d'un côté et A, N, C de l'autre. Si l'ordre diffère, les quotients peuvent être égaux sans que les droites soient parallèles.",
      micros: ["thales_reciproque"],
    },
  ],
  reel: {
    texte:
      "Thalès mesure ce qui est trop grand pour un décamètre. La hauteur d'un arbre par la longueur de son ombre comparée à celle d'un bâton, la largeur d'une ravine sans la traverser, la hauteur d'un mât : dans chaque cas, on fabrique un petit triangle semblable au grand et on lit le rapport. C'est aussi le principe de l'agrandissement d'un plan, du réglage d'un vidéoprojecteur, et de tout ce qui se calcule « à l'échelle ».",
  },
  historique: {
    texte:
      "La légende raconte que Thalès de Milet, vers 600 avant notre ère, aurait mesuré la hauteur de la pyramide de Khéops en comparant son ombre à celle de son bâton, planté verticalement. L'anecdote est probablement enjolivée, mais elle dit bien l'idée : plutôt que d'atteindre le sommet, on compare deux triangles semblables. Le théorème porte son nom en France ; ailleurs, on l'appelle souvent « théorème des proportions ».",
  },
  formule: {
    contexte: "Le théorème de Thalès",
    expression: "$\\dfrac{AM}{AB} = \\dfrac{AN}{AC} = \\dfrac{MN}{BC}$",
    legende:
      "Valable dans les DEUX configurations : triangles emboités et papillon. Le petit au numérateur, et le même ordre dans les trois quotients.",
    schema: legende(
      thales({ sideLabels: { AM: "AM", AB: "AB", AN: "AN", AC: "AC" } }),
      "trois quotients, une seule égalité",
    ),
  },
  methode: [
    {
      titre: "Chercher les parallèles d'abord",
      texte:
        "Avant de nommer quoi que ce soit, on repère les marques de parallélisme ou la phrase de l'énoncé qui l'affirme. Sans parallèles, pas de Thalès.",
      micros: ["thales_configuration"],
    },
    {
      titre: "Identifier la configuration",
      texte:
        "Les deux triangles sont-ils emboités, ou de part et d'autre du point commun ? La réponse ne change RIEN aux calculs, mais elle évite de croire que le théorème ne s'applique pas.",
      micros: ["thales_configuration"],
      schema: legende(
        papillon(),
        "retourné, c'est la même configuration",
      ),
    },
    {
      titre: "Écrire les quotients dans l'ordre",
      texte:
        "On écrit les trois quotients avec toujours le petit au numérateur : AM/AB = AN/AC = MN/BC. On garde le même ordre partout — c'est ce qui rend l'égalité vraie.",
      micros: ["thales_rapport"],
    },
    {
      titre: "Calculer par produit en croix",
      texte:
        "On ne garde que les deux quotients où figure l'inconnue et les longueurs connues, puis on résout : de AM/AB = AN/AC on tire AN = AC × AM / AB.",
      micros: ["thales_calculer_longueur"],
    },
    {
      titre: "Rédiger la justification",
      texte:
        "Au brevet, les points vont à la rédaction autant qu'au résultat. Trois phrases suffisent : les points sont alignés, les droites sont parallèles, donc d'après le théorème de Thalès on peut écrire l'égalité — puis le calcul.",
      micros: ["thales_rediger"],
    },
  ],
  usages: [
    {
      titre: "On cherche une longueur",
      detail:
        "Les parallèles sont données : on applique le théorème, on écrit deux quotients et on résout par produit en croix.",
      micros: ["thales_calculer_longueur"],
    },
    {
      titre: "On cherche à prouver un parallélisme",
      detail:
        "On vérifie l'ordre des points, on calcule les deux quotients, et s'ils sont égaux on conclut par la réciproque.",
      micros: ["thales_reciproque"],
    },
    {
      titre: "La figure ne ressemble à rien de connu",
      detail:
        "On la retourne mentalement : le papillon est la même configuration vue de l'autre côté du point commun.",
      micros: ["thales_configuration"],
    },
  ],
  exemples: [
    {
      titre: "Calculer une longueur",
      donnees:
        "Dans le triangle ABC, M appartient à [AB] et N à [AC], avec (MN) parallèle à (BC). On a AM = 2 cm, AB = 3 cm et AC = 6 cm.",
      question: "Combien mesure AN ?",
      solution:
        "Les droites (MN) et (BC) sont parallèles, donc d'après le théorème de Thalès : AM/AB = AN/AC, soit 2/3 = AN/6. Par produit en croix, AN = 6 × 2 / 3 = 4 cm.",
      micros: ["thales_calculer_longueur", "thales_rediger"],
      schema: legende(
        thales({ sideLabels: { AM: "2 cm", AB: "3 cm", AN: "?", AC: "6 cm" }, bloc: "exemple" }),
        "$\\dfrac{2}{3} = \\dfrac{AN}{6}$",
      ),
    },
    {
      titre: "Le même calcul, en papillon",
      donnees:
        "Même énoncé, mais M et N sont de l'autre côté de A : les deux triangles sont opposés par le sommet. On a toujours AM = 2 cm, AB = 3 cm et AC = 6 cm.",
      question: "Combien mesure AN ?",
      solution:
        "La configuration est un papillon, mais le théorème est le même : AM/AB = AN/AC, soit 2/3 = AN/6, donc AN = 4 cm. Le dessin a changé de forme, pas le calcul.",
      micros: ["thales_configuration", "thales_calculer_longueur"],
      schema: legende(
        papillon({ sideLabels: { AM: "2 cm", AB: "3 cm", AN: "?", AC: "6 cm" }, bloc: "exemple" }),
        "même théorème, autre forme",
      ),
    },
    {
      titre: "Prouver que deux droites sont parallèles",
      donnees:
        "Les points A, M, B sont alignés dans cet ordre, et A, N, C aussi. On mesure AM = 2, AB = 3, AN = 4 et AC = 6.",
      question: "Les droites (MN) et (BC) sont-elles parallèles ?",
      solution:
        "On calcule les deux quotients : AM/AB = 2/3 et AN/AC = 4/6 = 2/3. Ils sont égaux, et les points sont alignés dans le même ordre sur les deux droites. D'après la réciproque du théorème de Thalès, (MN) et (BC) sont parallèles.",
      micros: ["thales_reciproque", "thales_rediger"],
    },
    {
      titre: "Rédiger comme au brevet",
      donnees: "Une configuration de Thalès, avec (MN) parallèle à (BC).",
      question: "Comment rédiger le calcul de MN ?",
      solution:
        "Trois phrases. « Les points A, M, B sont alignés et les points A, N, C sont alignés. Les droites (MN) et (BC) sont parallèles. D'après le théorème de Thalès, AM/AB = AN/AC = MN/BC. » Puis on remplace par les valeurs et on calcule. Les points de barème vont à ces trois phrases autant qu'au résultat.",
      micros: ["thales_rediger"],
    },
  ],
  pieges: [
    "Appliquer Thalès sans parallèles : c'est la condition d'entrée, elle se vérifie avant tout calcul.",
    "Ne pas reconnaitre le papillon et croire que le théorème ne s'applique pas : c'est la même configuration, retournée.",
    "Mélanger l'ordre des quotients : le petit est toujours au numérateur, et l'ordre est le même dans les trois.",
    "Oublier de vérifier l'ordre des points avant d'employer la réciproque : l'égalité des quotients ne suffit pas.",
    "Confondre le théorème et sa réciproque : l'un part des parallèles, l'autre y arrive.",
    "Donner le résultat sans la justification : au brevet, les trois phrases valent autant que le nombre.",
  ],
  aRetenir: [
    "Thalès demande deux sécantes issues d'un même point ET deux droites parallèles.",
    "Deux configurations : triangles emboités, et papillon. Le théorème est identique.",
    "AM/AB = AN/AC = MN/BC : le petit au numérateur, le même ordre dans les trois.",
    "Trois longueurs connues suffisent pour trouver la quatrième, par produit en croix.",
    "La réciproque prouve un parallélisme — à condition que les points soient dans le même ordre.",
    "Au brevet, la rédaction compte : alignement, parallélisme, puis l'égalité.",
  ],
  entrainement: [
    {
      question:
        "Une configuration de Thalès met en jeu combien de droites parallèles, et combien de sécantes ?",
      correction:
        "Deux droites parallèles, coupées par deux droites sécantes en un même point. Les deux conditions sont nécessaires.",
      micros: ["thales_configuration"],
    },
    {
      question:
        "Dans une configuration en papillon, où sont situés les deux triangles ?",
      correction:
        "De part et d'autre du point commun aux deux sécantes : ils sont opposés par le sommet. Le théorème s'y applique exactement de la même façon.",
      micros: ["thales_configuration"],
    },
    {
      question:
        "Compléter : AM/AB = AN/… = …/BC",
      correction: "AM/AB = AN/AC = MN/BC.",
      micros: ["thales_rapport"],
    },
    {
      question:
        "Avec AM = 2 cm, AB = 3 cm et AC = 6 cm, combien mesure AN ?",
      correction:
        "AM/AB = AN/AC donne 2/3 = AN/6, donc AN = 6 × 2 / 3 = 4 cm.",
      micros: ["thales_calculer_longueur"],
    },
    {
      question:
        "On trouve AM/AB = 2/3 et AN/AC = 2/3. Peut-on conclure que (MN) et (BC) sont parallèles ?",
      correction:
        "Oui, à condition que les points soient alignés dans le même ordre sur les deux droites. C'est la réciproque du théorème de Thalès.",
      micros: ["thales_reciproque"],
    },
    {
      question:
        "Quelles phrases faut-il écrire avant de poser l'égalité des quotients ?",
      correction:
        "Que les points sont alignés sur chacune des deux sécantes, et que les deux droites sont parallèles. Ces deux phrases justifient l'emploi du théorème.",
      micros: ["thales_rediger"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=3e",
};

export const slidesThales3e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Thalès - 3e",
    section: {
      type: "objectif",
      phrase: "Le même théorème, mais retourné",
      sousPhrase:
        "Le théorème est celui de la quatrième. Ce qui change, c'est qu'au brevet on le rencontre en papillon — et beaucoup d'élèves ne le reconnaissent plus.",
      encadre: {
        titre: "Les deux conditions",
        texte:
          "Deux droites sécantes en un même point, et deux droites parallèles qui les traversent. Sans parallèles, pas de Thalès.",
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
          "Thalès mesure ce qui est trop grand pour un décamètre : la hauteur d'un arbre par son ombre, la largeur d'une ravine sans la traverser. On fabrique un petit triangle semblable au grand, et on lit le rapport.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "La légende dit que Thalès de Milet aurait mesuré la pyramide de Khéops en comparant son ombre à celle de son bâton. L'anecdote est sans doute enjolivée, mais l'idée est la bonne : au lieu de monter, on compare.",
      },
    },
  },
  {
    titre: "Les deux configurations",
    badge: "À reconnaitre",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Triangles emboités",
        contenu:
          "M sur le segment A B, N sur le segment A C, et la droite M N parallèle à B C. Le petit triangle est une réduction du grand.",
      },
      droite: {
        variante: "info",
        titre: "Le papillon",
        contenu:
          "Les deux triangles sont de part et d'autre du point A, opposés par le sommet. C'est la MÊME configuration, et les quotients s'écrivent exactement pareil.",
      },
    },
  },
  {
    titre: "Rédiger au brevet",
    badge: "La méthode",
    section: {
      type: "etapes",
      etapes: [
        "Dire que les points sont alignés sur chacune des deux sécantes.",
        "Dire que les deux droites sont parallèles.",
        "Écrire l'égalité : A M sur A B égale A N sur A C égale M N sur B C.",
        "Remplacer par les valeurs, puis calculer par produit en croix.",
      ],
    },
  },
];
