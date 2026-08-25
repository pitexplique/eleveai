// ─── Fiche de cours : le théorème de Thalès (4e) ───────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach (4e/maths/thales.bank.ts).
// Micro-compétences couvertes → blocs :
//   thales_configuration        → Définition, figure, propriété « Les deux configurations », méthode « Repérer »
//   thales_rapport              → Propriété « Une partie sur le tout », usage 1
//   thales_calculer_longueur    → Propriété « La quatrième proportionnelle », méthode « Calculer », usage 1, exemple 1
//   thales_reciproque_verifier  → Propriété « La réciproque, et ce qu'elle refuse », exemple 2
//   thales_reciproque_conclure  → Usage 3, exemple 2, exercice 3
//   thales_rediger              → Méthode « Rédiger », exemple 1, piège 3
//   thales_defi                 → Exemple 3, exercice 4
//
// ⭐ LA DIFFICULTÉ DE CETTE FICHE EST LA MÊME QU'EN PYTHAGORE, EN PIRE : ici le
// dessin évident est la configuration de Thalès elle-même, et elle peut revenir
// sur les sept blocs. Ce qu'on a cherché, c'est ce qu'elle ne sait PAS montrer :
//   · les rapports comparent une PARTIE AU TOUT → `schema_barre` : AM et MB
//     bout à bout font AB, et le rapport se voit comme une longueur ;
//   · calculer, c'est une QUATRIÈME PROPORTIONNELLE → `tableau_proportionnalite` :
//     Thalès est une situation de proportionnalité, et le tableau le dit ;
//   · le produit en croix est un CALCUL → `calcul_pose` ;
//   · avant la configuration, il y a DEUX PARALLÈLES et deux sécantes →
//     `droites` : ce qu'on repère sur la figure avant de la nommer.
//
// ⭐ ET LE CONTRE-EXEMPLE, ENCORE : la propriété de la réciproque porte une
// configuration dont les rapports NE sont PAS égaux, donc sans marque de
// parallélisme. C'est le seul dessin de la fiche où les deux droites ne sont pas
// parallèles, et c'est ce qui fait comprendre ce que la réciproque affirme.
//
// Les nombres sont ceux de la banque : AM = 3, AB = 6, AN = 4, AC = 8 (le cas
// « rapports égaux »), et AM = 4, AB = 12, AN = 5 pour le calcul.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// LA CONFIGURATION DU COACH, mise à l'échelle du bloc qui la reçoit.
//
// ⛔ MÊME PIÈGE QU'AU TRIANGLE DE PYTHAGORE, MESURÉ LE 25/08. `ThalesCanvas`
// dessine sur des POINTS PAR DÉFAUT FIXES (x de 55 à 285, y de 70 à 230) dans un
// cadre de 340 × 270. Réduire la seule `size` pour tenir dans une carte de 225 px
// ne met rien à l'échelle : ça ROGNE les étiquettes, en silence et sans faire
// baisser la police. On passe donc des POINTS mis à l'échelle, pas un cadre serré.
// ⭐ ON NE PASSE PLUS DE POINTS : depuis la réparation du canvas (25/08), ses
// points par défaut ET ses décalages d'étiquettes suivent la `size` demandée.
// La fiche n'a donc qu'à dire la largeur de son bloc.
// ⛔ Et PAS de `showFormula` : la formule interne du canvas est écrite en 10,5 px,
// ce qui tombe à 9,7 px dans une carte de 222 px. Les trois rapports sont déjà
// écrits en toutes lettres dans le bloc « La formule ».
const thales = (opts: {
  sideLabels?: Partial<Record<"AB" | "AC" | "BC" | "AM" | "AN" | "MN", string>>;
  showParallelMarks?: boolean;
  /** "carte" = propriété ou formule (bloc de 225 px) ; "exemple" = bloc de 199 px. */
  bloc?: "carte" | "exemple";
}) => {
  const petit = opts.bloc === "exemple";
  // 228 et 220, et non 240 et 208 : le bloc « La formule » est un peu plus étroit
  // que les cartes de propriété (216 px mesurés contre 222), et à 240 de cadre ses
  // lettres tombaient à 10,8 px. Un cadre plus serré remonte la police, puisque le
  // SVG est mis à l'échelle de son bloc.
  // ⚠️ 212 pour un exemple, MESURÉ : le bloc d'exemple s'affiche à 200 px, donc à
  // 220 de cadre la police de 12 tombait à 10,9 — un dixième sous le plancher de
  // 11. C'est exactement le genre d'écart qu'aucune relecture n'attrape.
  const largeur = petit ? 212 : 228;
  const k = largeur / 340;
  // ⚠️ M EST PLACÉ À 0,30 DE [AB], ET C'EST UNE MESURE, PAS UN GOÛT. Les polices
  // du canvas ne suivent pas l'échelle (c'est voulu : sinon elles rétréciraient),
  // donc dans un cadre réduit les étiquettes se rapprochent sans maigrir. Trois
  // textes se disputent le bas de la figure — « M », la longueur de [AM] posée au
  // milieu de [AM], et celle de [AB] posée au milieu de [AB] :
  //   · M est à m, l'étiquette de AM à m/2 → il faut m/2 × largeurAB ≥ 19 px ;
  //   · l'étiquette de AB est à 0,5      → il faut |m − 0,5| × largeurAB ≥ 23 px.
  // À 0,283 (le défaut du canvas) le premier écart tombe à 19,8 px et les deux
  // textes se touchent ; à 0,45 c'est le second qui lâche. La fenêtre mesurée est
  // ÉTROITE — m entre 0,30 et 0,34 — et 0,30 laissait encore 0,2 px de recouvrement
  // dans les exemples. On se met au milieu de la fenêtre.
  const M_SUR_AB = 0.32;
  const points = {
    A: { x: 55 * k, y: 230 * k },
    B: { x: 285 * k, y: 230 * k },
    C: { x: 180 * k, y: 70 * k },
    M: { x: (55 + M_SUR_AB * 230) * k, y: 230 * k },
  };
  return (
    <CanvasRenderer
      figure={{
        kind: "thales",
        variant: "triangle",
        // ⚠️ 0,85 et non 270/340 = 0,79 : l'étiquette de AB est posée 40 unités
        // SOUS le point A, donc au ras du bas du cadre d'origine. Un peu de
        // hauteur en plus lui évite de sortir.
        size: { width: largeur, height: Math.round(largeur * 0.85) },
        points,
        sideLabels: opts.sideLabels,
        display: {
          showPoints: true,
          showLabels: true,
          showSideLabels: !!opts.sideLabels,
          showParallelMarks: opts.showParallelMarks ?? true,
          highlightParallel: true,
          showFormula: false,
        },
      }}
    />
  );
};

// LA CONFIGURATION QUE PERSONNE NE RECONNAÎT : le papillon. Les deux triangles
// sont de part et d'autre du point commun, et l'élève qui n'a vu que des
// triangles emboîtés ne voit plus Thalès du tout. C'est le seul dessin de la
// fiche qui montre l'autre forme — d'où sa place sur la propriété.
const papillon = legende(
  <CanvasRenderer
    figure={{
      kind: "thales",
      variant: "papillon",
      size: { width: 240, height: 204 },
      display: {
        showFormula: false,
        showPoints: true,
        showLabels: true,
        showParallelMarks: true,
        highlightParallel: true,
      },
    }}
  />,
  "le papillon : même théorème, autre forme"
);

// AVANT LA CONFIGURATION, IL Y A DEUX PARALLÈLES. C'est le geste de la méthode
// « Repérer » : on cherche d'abord les marques de parallélisme, puis les deux
// droites sécantes qui les coupent. Aucun canvas `thales` ne montre ça, puisqu'il
// dessine toujours la configuration déjà formée.
const deuxParalleles = (
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: 240, height: 165 },
      lines: [
        {
          id: "p1",
          type: "droite",
          from: { x: 40, y: 60 },
          to: { x: 205, y: 60 },
          color: BLEU,
          display: { showArrows: false, showLabel: false },
        },
        {
          id: "p2",
          type: "droite",
          from: { x: 25, y: 125 },
          to: { x: 220, y: 125 },
          color: BLEU,
          display: { showArrows: false, showLabel: false },
        },
        {
          id: "s1",
          type: "droite",
          from: { x: 122, y: 30 },
          to: { x: 60, y: 145 },
          color: ROUGE,
          display: { showArrows: false, showLabel: false },
        },
        {
          id: "s2",
          type: "droite",
          from: { x: 122, y: 30 },
          to: { x: 190, y: 145 },
          color: ROUGE,
          display: { showArrows: false, showLabel: false },
        },
      ],
      // ⚠️ « le sommet commun » (16 signes) sortait du cadre : l'étiquette est
      // posée au-dessus du point, qui était déjà à 25 du haut. Un mot, et le
      // point descendu de 5.
      points: [{ x: 122, y: 30, label: "sommet", color: ROUGE, highlight: true }],
    }}
  />
);

// UN RAPPORT DE THALÈS COMPARE UNE PARTIE AU TOUT. AM n'est pas « un morceau
// quelconque » : c'est une fraction de AB, et MB est le reste. Posés bout à bout,
// les deux longueurs redonnent AB — et le rapport 3/6 se voit.
// ⚠️ Les parts de `schema_barre` ont une largeur proportionnelle à leur valeur :
// 3 et 3 donnent deux moitiés, ce qui est exactement juste ici.
// ⚠️ Hauteur 180 au minimum : sous 170, les étiquettes de parts (posées à 144 px
// du haut) et la phrase du bas (posée à 18 px du bas) se rentrent dedans.
const partieSurTout = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ 200 et non 180, et ça ne s'est vu QU'EN 1280. Les étiquettes de parts
      // (« AM », « MB ») sont larges et centrées sur leur part ; la phrase du bas
      // est centrée sur toute la barre. À 180 de haut, les deux se frôlaient d'un
      // cheveu — invisible à 375 px, net une fois le dessin agrandi.
      size: { width: 240, height: 200 },
      total: "AB = 6",
      parts: [
        { label: "AM", value: "3", color: BLEU },
        { label: "MB", value: "3", color: "#e2e8f0" },
      ],
      questionLabel: "AM / AB = 3/6",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// THALÈS EST UNE SITUATION DE PROPORTIONNALITÉ, et le tableau le dit mieux qu'une
// phrase : le petit triangle et le grand se correspondent, avec le même
// coefficient sur chaque colonne. Calculer une longueur, c'est remplir la case
// vide — une quatrième proportionnelle, exactement comme en proportionnalité.
const tableauDeThales = (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      size: { width: 240, height: 150 },
      rows: 2,
      cols: 2,
      rowLabels: ["petit AMN", "grand ABC"],
      colLabels: ["1er côté", "2e côté"],
      values: [
        ["4", "5"],
        ["12", "?"],
      ],
      missing: [{ row: 1, col: 1 }],
      display: { showRowLabels: true, showColLabels: true, showMissing: true, showGrid: true },
    }}
  />
);

// LE PRODUIT EN CROIX, POSÉ. Une fois le tableau écrit, il reste un calcul, et
// c'est là que l'élève se trompe d'opération. La multiplication posée montre
// l'ordre : on multiplie en croix AVANT de diviser.
const produitEnCroix = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["5", "12"],
      result: "60",
      display: { showResult: true, compact: true },
      questionLabel: "puis 60 ÷ 4 = 15",
    }}
  />
);

const pieges = [
  "Appliquer Thalès sans parallèles : c'est la condition du théorème, et sans elle l'égalité des rapports est fausse.",
  "Mélanger les deux triangles dans un rapport : chaque fraction compare une longueur du petit à la longueur qui lui correspond dans le grand, jamais deux longueurs du même triangle.",
  "Écrire le résultat avant l'égalité des rapports : le calcul seul ne vaut pas justification, il faut la phrase qui annonce la configuration.",
];

const aRetenir = [
  "Thalès s'applique dans deux configurations : les triangles emboîtés et le papillon. Dans les deux, il faut deux droites parallèles.",
  "Les rapports se lisent toujours dans le même ordre : AM/AB = AN/AC = MN/BC — petit sur grand, trois fois de suite.",
  "La réciproque fait le chemin inverse : si deux rapports sont égaux et les points bien placés, alors les droites sont parallèles.",
];

export const ficheThales4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "thales-theoreme",
  titre: "Le théorème de Thalès",
  accroche:
    "Quand une droite parallèle à un côté coupe un triangle, elle fabrique un petit triangle qui a exactement la même forme que le grand — juste réduit. Le théorème de Thalès met cette réduction en chiffres : trois rapports de longueurs, tous égaux.",
  identite: [
    { label: "Condition", valeur: "Deux droites parallèles (sans elles, rien ne s'applique)" },
    { label: "Les deux formes", valeur: "Triangles emboîtés, et papillon" },
    { label: "Outil", valeur: "L'égalité de trois rapports, et le produit en croix" },
  ],
  definition: {
    texte:
      "Dans un triangle ABC, si M est un point de [AB], N un point de [AC], et si la droite (MN) est parallèle à (BC), alors les longueurs des trois côtés du petit triangle sont proportionnelles à celles du grand. Autrement dit, les trois rapports AM/AB, AN/AC et MN/BC sont égaux.",
  },
  figure: {
    schema: thales({
      sideLabels: { AM: "3 cm", AB: "6 cm", AN: "4 cm", AC: "8 cm" },
    }),
    legende: "(MN) est parallèle à (BC) : le petit triangle AMN est une réduction du grand ABC.",
  },
  proprietes: [
    {
      titre: "Les deux configurations",
      micros: ["thales_configuration"],
      texte:
        "Thalès ne sert pas que dans les triangles emboîtés. Quand les deux triangles sont de part et d'autre du point commun, on parle de configuration en papillon : le théorème est le même.",
      schema: papillon,
    },
    {
      titre: "Un rapport compare une partie au tout",
      micros: ["thales_rapport"],
      texte:
        "AM n'est pas une longueur quelconque : c'est une fraction de AB, et MB est ce qui reste. Le rapport AM/AB mesure cette fraction.",
      schema: partieSurTout,
    },
    {
      titre: "Une quatrième proportionnelle",
      micros: ["thales_calculer_longueur"],
      texte:
        "Le petit triangle et le grand forment un tableau de proportionnalité : le même coefficient relie chaque longueur à celle qui lui correspond. Calculer, c'est remplir la case vide.",
      schema: tableauDeThales,
    },
    {
      titre: "La réciproque, et ce qu'elle refuse",
      micros: ["thales_reciproque_verifier"],
      texte:
        "Ici AM/AB = 2/6 et AN/AC = 3/8. Les deux rapports sont différents, donc (MN) n'est pas parallèle à (BC) : aucune marque de parallélisme sur la figure.",
      schema: thales({
        sideLabels: { AM: "2 cm", AB: "6 cm", AN: "3 cm", AC: "8 cm" },
        showParallelMarks: false,
      }),
    },
  ],
  reel: {
    texte:
      "Thalès sert dès qu'une longueur est hors de portée. À La Réunion, c'est la hauteur d'un pied de letchi ou d'un filao mesurée par son ombre : on plante un bâton, on compare les deux ombres, et le rapport donne la hauteur de l'arbre. C'est aussi la façon dont on lit un plan à l'échelle, dont on agrandit un patron de couture, et dont un appareil photo forme son image — l'objet et sa photo sont deux triangles emboîtés de part et d'autre de l'objectif.",
  },
  historique: {
    texte:
      "La légende raconte que Thalès de Milet, six siècles avant notre ère, aurait mesuré la hauteur de la pyramide de Khéops depuis son ombre : il aurait attendu l'instant où son propre corps projetait une ombre de sa taille, et mesuré au même moment l'ombre de la pyramide. Le théorème porte son nom en France seulement — ailleurs, on l'appelle le théorème des proportions ou le théorème de l'interception.",
  },
  formule: {
    contexte: "Dans un triangle ABC, avec M sur [AB], N sur [AC] et (MN) // (BC)",
    expression: "AM / AB = AN / AC = MN / BC",
    legende:
      "Trois rapports, toujours écrits dans le même ordre : la longueur du petit triangle au-dessus, celle qui lui correspond dans le grand au-dessous.",
    // Le troisième rapport est celui qu'on oublie : MN sur BC. Il est le seul
    // étiqueté ici, pour qu'on le cherche sur la figure.
    schema: thales({ sideLabels: { MN: "MN", BC: "BC" } }),
  },
  methode: [
    {
      titre: "Repérer",
      micros: ["thales_configuration"],
      texte:
        "On cherche d'abord les deux droites parallèles et leurs marques, puis le point où se croisent les deux sécantes. Sans parallèles, Thalès ne s'applique pas.",
      schema: legende(deuxParalleles, "deux parallèles, deux sécantes, un point commun"),
    },
    {
      titre: "Calculer",
      micros: ["thales_calculer_longueur"],
      texte:
        "On écrit l'égalité des rapports, on ne garde que les deux fractions utiles, puis on fait le produit en croix : on multiplie d'abord, on divise ensuite.",
      schema: produitEnCroix,
    },
    {
      titre: "Rédiger",
      micros: ["thales_rediger"],
      // Comme sur la fiche de Pythagore : un bloc peut rester sans dessin quand le
      // dessin ne ferait que redire le texte (arbitrage de Frédéric, 25/08).
      texte:
        "Trois lignes. 1) « Dans le triangle ABC, M appartient à [AB], N appartient à [AC] et (MN) est parallèle à (BC) » — on annonce la configuration ET le parallélisme. 2) « …d'après le théorème de Thalès, AM/AB = AN/AC = MN/BC ». 3) On remplace par les nombres, on calcule, on conclut avec l'unité.",
    },
  ],
  usages: [
    {
      titre: "Calculer une longueur",
      micros: ["thales_rapport", "thales_calculer_longueur"],
      detail:
        "Trois longueurs sont connues, la quatrième manque. On écrit les deux rapports qui les contiennent et on fait le produit en croix.",
    },
    {
      titre: "Retrouver une longueur du grand triangle",
      micros: ["thales_calculer_longueur"],
      detail:
        "Le même théorème sert dans les deux sens : on peut chercher une longueur du petit triangle comme une longueur du grand, l'égalité des rapports ne change pas.",
    },
    {
      titre: "Démontrer que deux droites sont parallèles",
      micros: ["thales_reciproque_conclure"],
      detail:
        "Les quatre longueurs sont connues. On calcule séparément les deux rapports : s'ils sont égaux et si les points sont alignés dans le même ordre, les droites sont parallèles.",
    },
  ],
  exemples: [
    {
      titre: "La longueur qui manque",
      micros: ["thales_calculer_longueur", "thales_rediger"],
      donnees:
        "Dans le triangle ABC, M appartient à [AB], N appartient à [AC] et (MN) est parallèle à (BC). On sait que AM = 4 cm, AB = 12 cm et AN = 5 cm.",
      question: "Combien mesure AC ?",
      schema: thales({
        bloc: "exemple",
        sideLabels: { AM: "4 cm", AB: "12 cm", AN: "5 cm", AC: "?" },
      }),
      solution:
        "Dans le triangle ABC, M appartient à [AB], N appartient à [AC] et (MN) est parallèle à (BC). D'après le théorème de Thalès : AM/AB = AN/AC. Donc 4/12 = 5/AC. Par le produit en croix : 4 × AC = 5 × 12 = 60, donc AC = 60 ÷ 4 = 15. Le côté AC mesure 15 cm.",
    },
    {
      titre: "Les droites sont-elles parallèles ?",
      micros: ["thales_reciproque_verifier", "thales_reciproque_conclure"],
      donnees:
        "Dans le triangle ABC, M est sur [AB] et N est sur [AC], dans le même ordre depuis A. On mesure AM = 3 cm, AB = 6 cm, AN = 4 cm et AC = 8 cm.",
      question: "La droite (MN) est-elle parallèle à (BC) ?",
      schema: thales({
        bloc: "exemple",
        sideLabels: { AM: "3 cm", AB: "6 cm", AN: "4 cm", AC: "8 cm" },
      }),
      solution:
        "On calcule les deux rapports séparément. D'un côté, AM/AB = 3/6 = 0,5. De l'autre, AN/AC = 4/8 = 0,5. Les deux rapports sont égaux, et les points A, M, B d'une part, A, N, C d'autre part, sont alignés dans le même ordre. Donc, d'après la réciproque du théorème de Thalès, (MN) est parallèle à (BC).",
    },
    {
      titre: "La hauteur du letchi",
      micros: ["thales_defi"],
      donnees:
        "Un bâton de 1 m planté droit projette une ombre de 2 m. Au même moment, l'ombre d'un pied de letchi mesure 12 m. Le soleil donne deux triangles emboîtés de même forme.",
      question: "Quelle est la hauteur de l'arbre ?",
      schema: thales({
        bloc: "exemple",
        sideLabels: { AM: "1 m", AB: "?", AN: "2 m", AC: "12 m" },
      }),
      solution:
        "Les rayons du soleil sont parallèles, donc les deux triangles sont en configuration de Thalès : hauteur/ombre est le même rapport pour le bâton et pour l'arbre. On écrit 1/2 = h/12. Par le produit en croix : 2 × h = 1 × 12 = 12, donc h = 6. Le pied de letchi mesure 6 m de haut.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Quelle condition doit absolument être vérifiée avant d'écrire une égalité de Thalès ?",
      correction:
        "Il faut deux droites parallèles. Sans parallélisme, les rapports ne sont pas égaux et le théorème ne s'applique pas — c'est la première chose à écrire dans la rédaction.",
      micros: ["thales_configuration"],
    },
    {
      question:
        "Dans un triangle ABC avec (MN) // (BC), on a AM = 3 cm, AB = 6 cm et AN = 4 cm. Combien mesure AC ?",
      correction:
        "D'après le théorème de Thalès, AM/AB = AN/AC, donc 3/6 = 4/AC. Par le produit en croix : 3 × AC = 4 × 6 = 24, donc AC = 24 ÷ 3 = 8. Le côté AC mesure 8 cm.",
      micros: ["thales_calculer_longueur", "thales_rediger"],
    },
    {
      question:
        "On mesure AM = 2 cm, AB = 6 cm, AN = 3 cm et AC = 8 cm. Les droites (MN) et (BC) sont-elles parallèles ?",
      correction:
        "On compare les deux rapports. AM/AB = 2/6, soit environ 0,33. AN/AC = 3/8, soit 0,375. Les deux rapports sont différents, donc d'après la réciproque du théorème de Thalès, (MN) n'est pas parallèle à (BC).",
      micros: ["thales_reciproque_verifier", "thales_reciproque_conclure"],
    },
    {
      question:
        "Pourquoi peut-on mesurer la hauteur d'un arbre avec son ombre et un simple bâton ?",
      correction:
        "Parce que les rayons du soleil arrivent parallèles : le bâton et son ombre, l'arbre et la sienne forment deux triangles en configuration de Thalès. Le rapport hauteur/ombre est donc le même pour les deux, et une seule multiplication suffit pour trouver la hauteur de l'arbre.",
      micros: ["thales_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesThales4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Thalès - 4e",
    section: {
      type: "objectif",
      phrase: "Calculer une longueur hors de portée",
      sousPhrase:
        "Quand une parallèle coupe un triangle, le petit triangle est une réduction du grand : trois rapports de longueurs, tous égaux.",
      encadre: {
        titre: "L'idée",
        texte: "Même forme, taille différente : les longueurs sont proportionnelles.",
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
          "La hauteur d'un letchi par son ombre, un plan à l'échelle, un patron agrandi, l'image que forme un appareil photo.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le théorème ne s'appelle « de Thalès » qu'en France. Ailleurs, c'est le théorème des proportions ou de l'interception.",
      },
    },
  },
  {
    titre: "La condition",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Sans parallèles, pas de Thalès",
      sousPhrase:
        "Le parallélisme n'est pas un détail de la figure : c'est ce qui rend les rapports égaux.",
      encadre: {
        titre: "Attention",
        texte: "On l'annonce dans la rédaction, avant d'écrire la moindre fraction.",
      },
    },
  },
  {
    titre: "Les deux sens du théorème",
    badge: "2 repères",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Le théorème",
          texte:
            "On SAIT que les droites sont parallèles, on CHERCHE une longueur. On écrit les rapports, puis le produit en croix.",
        },
        {
          titre: "La réciproque",
          texte:
            "On CONNAÎT les quatre longueurs, on CHERCHE si les droites sont parallèles. On compare les deux rapports.",
        },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheThales4e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheThales4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "La longueur qui manque",
    section: {
      type: "exemple",
      enonce: "(MN) // (BC), AM = 4 cm, AB = 12 cm, AN = 5 cm.",
      question: "Combien mesure AC ?",
      correction:
        "4/12 = 5/AC, donc 4 × AC = 60, et AC = 15 cm.",
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
      enonce: "AM = 2 cm, AB = 6 cm, AN = 3 cm, AC = 8 cm.",
      question: "(MN) est-elle parallèle à (BC) ?",
      indice: "Compare 2/6 et 3/8.",
      correction:
        "2/6 ≈ 0,33 et 3/8 = 0,375 : les rapports diffèrent, donc les droites ne sont pas parallèles.",
    },
  },
];
