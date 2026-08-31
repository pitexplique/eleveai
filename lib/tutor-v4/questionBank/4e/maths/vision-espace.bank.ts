// lib/tutor-v4/questionBank/4e/maths/vision-espace.bank.ts
//
// ⭐ NOTION OUVERTE LE 31/08/2026 : `vision_espace`. Avec sa sœur `reperage`,
// elle ferme le DERNIER bloc du programme de 4e — « Représenter l'espace ».
//
// ⭐ ELLE REPREND L'IDENTIFIANT DE LA 6e, et deux de ses micros
// (`vision_vues`, `vision_representation`) : c'est le même objet, un an plus
// tard. La 4e ajoute la RECONNAISSANCE nommée des sept solides du BO et les
// SECTIONS PLANES.
//
// ⭐ LA FRACTURE AVEC `reperage` EST À SENS UNIQUE : se repérer DANS UN PAVÉ a
// besoin de savoir ce qu'est un pavé, alors que reconnaître un solide n'a aucun
// besoin de coordonnées. C'est ce qui justifie deux notions.
//
// ⭐⭐ LE TYPE `SolideKind` PORTE EXACTEMENT LES SEPT SOLIDES DU BO — cube,
// pavé droit, prisme, cylindre, cône, boule, pyramide. La puce
// 4e-D-espace-4 les énumère dans cet ordre, et le canvas les dessine tous les
// sept. Rien à inventer : la table de ce fichier EST la puce du programme.
//
// ⛔ CE QUE LE COACH NE PEUT PAS ÉVALUER, et qui reste un trou assumé : la
// puce 4e-D-espace-6 demande d'utiliser un logiciel de géométrie dynamique.
// Un geste de logiciel ne se rend pas en QCM. C'est du travail de classe.
//
// ⚠️ LES CANVAS SONT PLAFONNÉS À 340 px (`solide_3d` et `section_solide`). Les
// largeurs sont posées à ce plafond : l'échelle vaut alors 1, et les libellés
// sortent à leur taille nominale.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/**
 * ⭐ LES SEPT SOLIDES DE LA PUCE 4e-D-espace-4, dans l'ordre du BO. Chacun
 * porte ce qui le DISTINGUE des autres — c'est cela qu'on fait travailler, pas
 * une liste de noms.
 */
const SOLIDES = [
  {
    kind: "cube" as const,
    nom: "un cube",
    signe: "six faces carrées, toutes identiques",
    faces: "6 faces carrées",
    objet: "un dé, une boîte de sucre",
  },
  {
    kind: "pave_droit" as const,
    nom: "un pavé droit",
    signe: "six faces rectangulaires",
    faces: "6 faces rectangulaires",
    objet: "une boîte à chaussures, une brique de lait",
  },
  {
    kind: "prisme" as const,
    nom: "un prisme droit",
    signe: "deux bases identiques et parallèles, reliées par des rectangles",
    faces: "2 bases + des rectangles",
    objet: "une part de fromage, un toit à deux pentes",
  },
  {
    kind: "cylindre" as const,
    nom: "un cylindre",
    signe: "deux disques identiques reliés par une surface courbe",
    faces: "2 disques + une surface courbe",
    objet: "une boîte de conserve, un rouleau",
  },
  {
    kind: "cone" as const,
    nom: "un cône",
    signe: "un disque et une pointe",
    faces: "1 disque + une pointe",
    objet: "un cornet de glace, un chapeau de fête",
  },
  {
    kind: "boule" as const,
    nom: "une boule",
    signe: "aucune arête, aucun sommet, aucune face plane",
    faces: "aucune face plane",
    objet: "un ballon, une bille",
  },
  {
    kind: "pyramide" as const,
    nom: "une pyramide",
    signe: "une base polygonale et une pointe",
    faces: "1 base + des triangles",
    objet: "une pyramide d'Égypte, une tente canadienne",
  },
];

/** Le solide dessiné, à la largeur du plafond du canvas. */
function solide(kind: (typeof SOLIDES)[number]["kind"]) {
  return {
    kind: "solide_3d" as const,
    solide: kind,
    display: { showLabels: false, showDimensions: false },
    size: { width: 340, height: 260 },
  };
}

export const visionEspaceBank: TutorBankItemV4[] = [
  /* =========================================================================
     VISION_RECONNAITRE — la puce 4e-D-espace-4
  ========================================================================= */
  {
    kind: "template",
    id: "4e_vision_reconnaitre_tpl_1_nommer",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde les bases : combien y en a-t-il, et de quelle forme ?",
    tags: ["solide", "reconnaitre", "qcm", "template", "canvas"],
    generate: () => {
      const s = randomChoice(SOLIDES);
      return {
        text: "Quel est le nom de ce solide ?",
        format: "qcm",
        choices: makeChoices(s.nom, SOLIDES.map((x) => x.nom)),
        expected: [s.nom],
        comparator: "mcq_exact",
        explanation:
          "Définition : chaque solide se reconnaît à ses BASES et à ses faces latérales — pas à son allure générale.\n\n" +
          "Méthode : on compte d'abord les bases, puis on regarde leur forme, puis ce qui les relie.\n\n" +
          `Calcul : ce solide a ${s.faces}, donc c'est ${s.nom}.\n\n` +
          `Conclusion : ⭐ pour le retenir : ${s.objet}. Sa signature est « ${s.signe} ».`,
        canvas: solide(s.kind),
      };
    },
  },
  {
    kind: "template",
    id: "4e_vision_reconnaitre_tpl_2_signature",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "C'est le nombre et la forme des bases qui décident.",
    tags: ["solide", "reconnaitre", "description", "qcm", "template"],
    generate: () => {
      const s = randomChoice(SOLIDES);
      return {
        text: `Quel solide a ${s.signe} ?`,
        format: "qcm",
        choices: makeChoices(s.nom, SOLIDES.map((x) => x.nom)),
        expected: [s.nom],
        comparator: "mcq_exact",
        explanation:
          "Définition : reconnaître un solide, c'est le retrouver à partir de sa DESCRIPTION — le geste inverse de le nommer sur un dessin.\n\n" +
          "Méthode : on traduit la description en bases et faces latérales.\n\n" +
          `Calcul : « ${s.signe} » décrit ${s.nom}.\n\n` +
          `Conclusion : ⭐ ${s.objet} en sont des exemples du quotidien. ⚠️ Le cube est un cas PARTICULIER de pavé droit — tout cube est un pavé, l'inverse est faux.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : le cube est un pavé droit. C'est une inclusion,
    // pas une ressemblance, et elle se retient comme celle du carré dans les
    // rectangles.
    kind: "fixed",
    id: "4e_vision_reconnaitre_fixed_cube_pave",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Un cube est-il un pavé droit ?",
    format: "qcm",
    choices: [
      "oui : c'est un pavé droit dont toutes les faces sont des carrés",
      "non : ce sont deux solides différents",
      "oui, mais seulement si ses arêtes mesurent 1",
      "non : un pavé droit a forcément des faces rectangulaires non carrées",
    ],
    expected: ["oui : c'est un pavé droit dont toutes les faces sont des carrés"],
    comparator: "mcq_exact",
    hint: "Un carré est-il un rectangle ?",
    explanation:
      "Définition : un pavé droit est un solide à six faces rectangulaires. Or un CARRÉ est un rectangle particulier — celui dont les quatre côtés sont égaux.\n\n" +
      "Méthode : on vérifie que le cube remplit bien la définition du pavé, sans rien y ajouter.\n\n" +
      "Calcul : les six faces d'un cube sont des carrés, donc des rectangles. La définition est remplie.\n\n" +
      "Conclusion : ⭐ c'est la même inclusion qu'entre le carré et le rectangle, d'un étage plus haut. ⚠️ Et elle marche dans UN seul sens : tout cube est un pavé, mais une boîte à chaussures n'est pas un cube.",
    tags: ["solide", "reconnaitre", "valeur_particuliere", "inclusion", "qcm"],
  },

  /* =========================================================================
     VISION_VUES — réactivation 6e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_vision_vues_tpl_1_forme",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 3,
    theme: "neutral",
    hint: "Une vue est une ombre : elle aplatit le solide sur un plan.",
    tags: ["solide", "vues", "qcm", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        { s: SOLIDES[0], vue: "de dessus", forme: "un carré" },
        { s: SOLIDES[1], vue: "de dessus", forme: "un rectangle" },
        { s: SOLIDES[3], vue: "de dessus", forme: "un disque" },
        { s: SOLIDES[3], vue: "de face", forme: "un rectangle" },
        { s: SOLIDES[4], vue: "de dessus", forme: "un disque" },
        { s: SOLIDES[4], vue: "de face", forme: "un triangle" },
        { s: SOLIDES[5], vue: "de dessus", forme: "un disque" },
        { s: SOLIDES[5], vue: "de face", forme: "un disque" },
        { s: SOLIDES[6], vue: "de face", forme: "un triangle" },
      ]);
      return {
        text: `Quelle est la vue ${cas.vue} ${cas.s.nom} ?`,
        format: "qcm",
        choices: makeChoices(cas.forme, [
          "un carré",
          "un rectangle",
          "un disque",
          "un triangle",
          "un losange",
        ]),
        expected: [cas.forme],
        comparator: "mcq_exact",
        explanation:
          "Définition : une vue est ce qu'on voit en regardant le solide bien en face d'une direction — comme son ombre portée sur un mur.\n\n" +
          "Méthode : on imagine le solide écrasé dans cette direction. Le relief disparaît, il ne reste qu'un contour PLAT.\n\n" +
          `Calcul : vu ${cas.vue}, ${cas.s.nom} donne ${cas.forme}.\n\n` +
          `Conclusion : ⭐ la boule est le seul solide dont TOUTES les vues sont identiques — un disque, quel que soit l'angle. C'est ce qui en fait le solide le plus simple à dessiner et le plus difficile à reconnaître sur une seule vue.`,
        canvas: solide(cas.s.kind),
      };
    },
  },
  {
    kind: "template",
    id: "4e_vision_vues_tpl_2_deviner",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 4,
    theme: "neutral",
    hint: "Une seule vue ne suffit presque jamais : il en faut deux.",
    tags: ["solide", "vues", "deduire", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { dessus: "un disque", face: "un rectangle", rep: "un cylindre" },
        { dessus: "un disque", face: "un triangle", rep: "un cône" },
        { dessus: "un disque", face: "un disque", rep: "une boule" },
        { dessus: "un carré", face: "un carré", rep: "un cube" },
        { dessus: "un rectangle", face: "un rectangle", rep: "un pavé droit" },
        { dessus: "un carré", face: "un triangle", rep: "une pyramide" },
      ]);
      return {
        text: `Un solide vu de dessus donne ${cas.dessus}, et vu de face ${cas.face}. De quel solide s'agit-il ?`,
        format: "qcm",
        choices: makeChoices(cas.rep, SOLIDES.map((x) => x.nom)),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux vues suffisent presque toujours à identifier un solide usuel — une seule, presque jamais.\n\n" +
          "Méthode : la vue de DESSUS donne la forme de la base ; la vue de FACE dit si le solide monte droit, se termine en pointe, ou est rond.\n\n" +
          `Calcul : une base ${cas.dessus === "un disque" ? "ronde" : cas.dessus === "un carré" ? "carrée" : "rectangulaire"} et une face ${cas.face === "un triangle" ? "en pointe" : cas.face === "un disque" ? "ronde" : "droite"} désignent ${cas.rep}.\n\n` +
          "Conclusion : ⚠️ un disque vu de dessus peut être un cylindre, un cône OU une boule. C'est la seconde vue qui tranche — et c'est pour cela que les plans techniques en donnent toujours au moins deux.",
      };
    },
  },

  /* =========================================================================
     VISION_REPRESENTATION — perspective et patron
  ========================================================================= */
  {
    kind: "template",
    id: "4e_vision_representation_tpl_1_patron",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 4,
    theme: "neutral",
    hint: "Un patron est le solide déplié : compte ses morceaux.",
    tags: ["solide", "patron", "qcm", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        { s: SOLIDES[0], patron: "6 carrés" },
        { s: SOLIDES[1], patron: "6 rectangles" },
        { s: SOLIDES[3], patron: "2 disques et un rectangle" },
        { s: SOLIDES[4], patron: "1 disque et une portion de disque" },
        { s: SOLIDES[6], patron: "1 carré et 4 triangles" },
        { s: SOLIDES[2], patron: "2 triangles et 3 rectangles" },
      ]);
      return {
        text: `De quoi est fait le patron ${cas.s.nom} ?`,
        format: "qcm",
        choices: makeChoices(cas.patron, [
          "6 carrés",
          "6 rectangles",
          "2 disques et un rectangle",
          "1 disque et une portion de disque",
          "1 carré et 4 triangles",
          "2 triangles et 3 rectangles",
        ]),
        expected: [cas.patron],
        comparator: "mcq_exact",
        explanation:
          "Définition : un patron est le solide DÉPLIÉ à plat. Chaque face du solide y apparaît une fois, en vraie grandeur.\n\n" +
          "Méthode : on compte les faces du solide et on note leur forme — le patron n'a ni plus ni moins de morceaux.\n\n" +
          `Calcul : ${cas.s.nom} a ${cas.s.faces}, son patron est donc fait de ${cas.patron}.\n\n` +
          `Conclusion : ⭐ LA BOULE N'A PAS DE PATRON, et c'est ce qui rend les cartes du monde impossibles à dessiner sans déformer : on ne peut pas mettre une sphère à plat. Toutes les projections trichent quelque part.`,
        canvas: solide(cas.s.kind),
      };
    },
  },
  {
    kind: "template",
    id: "4e_vision_representation_tpl_2_perspective",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 4,
    theme: "neutral",
    hint: "En perspective cavalière, ce qui fuit n'est pas dessiné en vraie grandeur.",
    tags: ["solide", "perspective", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { q: "Comment dessine-t-on les arêtes cachées ?", r: "en pointillés" },
        { q: "Que deviennent deux arêtes parallèles du solide ?", r: "elles restent parallèles sur le dessin" },
        { q: "Une face vue de front est dessinée…", r: "en vraie grandeur" },
        { q: "Un angle droit qui fuit vers l'arrière est dessiné…", r: "comme un angle non droit" },
        { q: "Un carré vu de front est dessiné…", r: "comme un carré" },
        { q: "Un carré qui fuit vers l'arrière est dessiné…", r: "comme un parallélogramme" },
      ]);
      return {
        text: `En perspective cavalière : ${cas.q}`,
        format: "qcm",
        choices: makeChoices(cas.r, [
          "en pointillés",
          "elles restent parallèles sur le dessin",
          "en vraie grandeur",
          "comme un angle non droit",
          "comme un carré",
          "comme un parallélogramme",
        ]),
        expected: [cas.r],
        comparator: "mcq_exact",
        explanation:
          "Définition : la perspective cavalière est un CODE de dessin. Elle ne cherche pas à imiter l'œil : elle suit des règles fixes, et c'est ce qui la rend lisible.\n\n" +
          "Méthode : deux règles suffisent. Ce qui est de FRONT est en vraie grandeur ; ce qui FUIT est déformé, mais le parallélisme est toujours conservé.\n\n" +
          `Calcul : ${cas.q.replace(/\?$/, "")} → ${cas.r}.\n\n` +
          "Conclusion : ⚠️ un dessin en perspective MENT sur les longueurs et les angles qui fuient — mais jamais sur le parallélisme. C'est pour cela qu'on ne mesure jamais sur une perspective.",
      };
    },
  },

  /* =========================================================================
     VISION_SECTION — ce que la 4e ajoute à la 6e
  ========================================================================= */
  {
    kind: "template",
    id: "4e_vision_section_tpl_1_forme",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_section",
    difficulty: 4,
    theme: "neutral",
    hint: "La section est la forme de la tranche, vue à plat.",
    tags: ["solide", "section", "qcm", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        { s: "cube" as const, sec: "parallele_base" as const, quoi: "un plan parallèle à la base", forme: "un carré" },
        { s: "pave_droit" as const, sec: "parallele_base" as const, quoi: "un plan parallèle à la base", forme: "un rectangle" },
        { s: "cylindre" as const, sec: "parallele_base" as const, quoi: "un plan parallèle à la base", forme: "un disque" },
        { s: "cylindre" as const, sec: "parallele_axe" as const, quoi: "un plan parallèle à l'axe", forme: "un rectangle" },
        { s: "cone" as const, sec: "parallele_base" as const, quoi: "un plan parallèle à la base", forme: "un disque" },
        { s: "pyramide" as const, sec: "parallele_base" as const, quoi: "un plan parallèle à la base", forme: "un carré" },
      ]);
      const nomSolide = SOLIDES.find((x) => x.kind === cas.s)?.nom ?? "ce solide";
      return {
        text: `On coupe ${nomSolide} par ${cas.quoi}. Quelle est la forme de la section ?`,
        format: "qcm",
        choices: makeChoices(cas.forme, [
          "un carré",
          "un rectangle",
          "un disque",
          "un triangle",
          "un losange",
        ]),
        expected: [cas.forme],
        comparator: "mcq_exact",
        explanation:
          "Définition : la SECTION est la surface plane obtenue en coupant le solide — la forme qu'on voit sur la tranche.\n\n" +
          "Méthode : quand le plan est PARALLÈLE à la base, la section a la même forme que la base. C'est la règle qui règle la plupart des cas.\n\n" +
          `Calcul : en coupant ${nomSolide} par ${cas.quoi}, on obtient ${cas.forme}.\n\n` +
          `Conclusion : ⚠️ le CÔNE est l'exception qui compte : sa section parallèle à la base est bien un disque, mais PLUS PETIT que la base — la forme se conserve, pas la taille. Pour le cylindre, elle est identique.`,
        canvas: {
          kind: "section_solide",
          solide: cas.s,
          section: cas.sec,
          display: { showLabels: true, showSectionName: false, showPlane: true },
          size: { width: 340, height: 280 },
        },
      };
    },
  },

  {
    // ⭐ SECOND GABARIT EXIGÉ PAR LE MODE COMPLET. Il prend la section par
    // l'autre bout : au lieu de donner la coupe et demander la forme, on donne
    // la FORME et on demande quelle coupe l'a produite.
    kind: "template",
    id: "4e_vision_section_tpl_2_quelle_coupe",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_section",
    difficulty: 5,
    theme: "neutral",
    hint: "Une section ronde vient d'une coupe parallèle à une base ronde.",
    tags: ["solide", "section", "inverse", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { solide: "un cylindre", forme: "un disque", rep: "une coupe parallèle à la base" },
        { solide: "un cylindre", forme: "un rectangle", rep: "une coupe parallèle à l'axe" },
        { solide: "un cube", forme: "un carré", rep: "une coupe parallèle à une face" },
        { solide: "un pavé droit", forme: "un rectangle", rep: "une coupe parallèle à une face" },
        { solide: "un cône", forme: "un disque", rep: "une coupe parallèle à la base" },
        { solide: "une pyramide", forme: "un carré", rep: "une coupe parallèle à la base" },
      ]);
      return {
        text: `En coupant ${cas.solide}, on obtient ${cas.forme} comme section. De quelle coupe s'agit-il ?`,
        format: "qcm",
        choices: makeChoices(cas.rep, [
          "une coupe parallèle à la base",
          "une coupe parallèle à l'axe",
          "une coupe parallèle à une face",
          "une coupe en diagonale",
          "aucune coupe ne donne cette forme",
        ]),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : la forme de la section dépend de l'ORIENTATION du plan de coupe par rapport au solide.\n\n" +
          "Méthode : on part de la forme obtenue et on cherche quelle orientation la produit. Une forme ronde vient d'une coupe parallèle à une base ronde ; une forme droite vient d'une coupe dans le sens de la hauteur.\n\n" +
          `Calcul : pour obtenir ${cas.forme} en coupant ${cas.solide}, il faut ${cas.rep}.\n\n` +
          "Conclusion : ⭐ le cylindre est le seul des sept à donner DEUX formes très différentes selon la coupe : un disque à plat, un rectangle en long. C'est ce qui en fait le meilleur exemple pour comprendre qu'une section n'est pas une propriété du solide, mais du couple solide + plan.",
      };
    },
  },

  /* =========================================================================
     VISION_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_vision_defi_tpl_1_intrus",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche ce que trois d'entre eux ont en commun.",
    tags: ["solide", "defi", "intrus", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { liste: ["un cube", "un pavé droit", "un prisme droit", "une boule"], intrus: "une boule", pourquoi: "les trois autres ont des faces planes et des arêtes ; la boule n'en a aucune" },
        { liste: ["un cylindre", "un cône", "une boule", "un cube"], intrus: "un cube", pourquoi: "les trois autres ont une surface courbe ; le cube n'en a pas" },
        { liste: ["un cône", "une pyramide", "un cylindre", "une pointe"], intrus: "un cylindre", pourquoi: "les deux premiers se terminent en pointe, le cylindre non" },
        { liste: ["un cube", "un pavé droit", "un prisme droit", "un cône"], intrus: "un cône", pourquoi: "les trois autres ont deux bases identiques et parallèles" },
        { liste: ["une boule", "un cylindre", "un cône", "une pyramide"], intrus: "une pyramide", pourquoi: "les trois autres ont une surface courbe" },
      ]);
      return {
        text: `Quel est l'intrus : ${cas.liste.join(", ")} ?`,
        format: "qcm",
        choices: cas.liste,
        expected: [cas.intrus],
        comparator: "mcq_exact",
        explanation:
          "Définition : trouver un intrus, c'est trouver la PROPRIÉTÉ que les autres partagent — pas celle qui saute aux yeux en premier.\n\n" +
          "Méthode : on teste les propriétés une par une : faces planes ou courbes, nombre de bases, présence d'une pointe.\n\n" +
          `Calcul : ${cas.pourquoi}.\n\n` +
          `Conclusion : l'intrus est ${cas.intrus}. ⭐ Un même solide peut être l'intrus d'une liste et pas d'une autre : tout dépend de la propriété choisie. C'est pour cela qu'il faut la NOMMER, pas seulement désigner.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_vision_defi_tpl_2_compter",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte séparément les faces, les arêtes et les sommets.",
    tags: ["solide", "defi", "compter", "template", "canvas"],
    generate: () => {
      const cas = randomChoice([
        { s: SOLIDES[0], quoi: "faces", n: 6 },
        { s: SOLIDES[0], quoi: "arêtes", n: 12 },
        { s: SOLIDES[0], quoi: "sommets", n: 8 },
        { s: SOLIDES[1], quoi: "faces", n: 6 },
        { s: SOLIDES[1], quoi: "arêtes", n: 12 },
        { s: SOLIDES[1], quoi: "sommets", n: 8 },
        { s: SOLIDES[2], quoi: "faces", n: 5 },
        { s: SOLIDES[2], quoi: "sommets", n: 6 },
        { s: SOLIDES[6], quoi: "faces", n: 5 },
        { s: SOLIDES[6], quoi: "sommets", n: 5 },
      ]);
      const detail =
        cas.s.kind === "prisme"
          ? "un prisme à base triangulaire a 2 triangles et 3 rectangles, soit 5 faces, et 6 sommets (3 en haut, 3 en bas)"
          : cas.s.kind === "pyramide"
            ? "une pyramide à base carrée a 1 carré et 4 triangles, soit 5 faces, et 5 sommets (4 à la base, 1 au sommet)"
            : "un cube et un pavé droit ont tous deux 6 faces, 12 arêtes et 8 sommets — seules les formes des faces diffèrent";
      return {
        text: `Combien ${cas.s.nom} a-t-il de ${cas.quoi} ?`,
        format: "short",
        expected: [String(cas.n)],
        comparator: "number_equal",
        explanation:
          "Définition : une FACE est une surface, une ARÊTE est un segment où deux faces se rejoignent, un SOMMET est un point où des arêtes se rencontrent.\n\n" +
          "Méthode : on compte par groupes — le dessus, le dessous, puis les côtés — pour ne pas oublier les éléments cachés.\n\n" +
          `Calcul : ${detail}.\n\n` +
          `Conclusion : ${cas.s.nom} a ${cas.n} ${cas.quoi}. ⚠️ L'erreur la plus fréquente est d'oublier ce qui est CACHÉ derrière : sur un cube dessiné en perspective, on ne voit que 3 faces sur 6.`,
        canvas: solide(cas.s.kind),
      };
    },
  },
  {
    kind: "template",
    id: "4e_vision_defi_tpl_3_situation",
    niveau: "4e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Quelle forme a l'objet, une fois qu'on enlève les détails ?",
    tags: ["solide", "defi", "modeliser", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { objet: "une boîte de conserve", rep: "un cylindre" },
        { objet: "un ballon de handball", rep: "une boule" },
        { objet: "un cornet de glace", rep: "un cône" },
        { objet: "une boîte à chaussures", rep: "un pavé droit" },
        { objet: "un dé à jouer", rep: "un cube" },
        { objet: "une tente canadienne", rep: "un prisme droit" },
        { objet: "un toit à deux pentes", rep: "un prisme droit" },
        { objet: "une pyramide d'Égypte", rep: "une pyramide" },
        { objet: "un rouleau de papier", rep: "un cylindre" },
        { objet: "un chapeau de fête pointu", rep: "un cône" },
      ]);
      return {
        text: `Par quel solide modélise-t-on ${cas.objet} ?`,
        format: "qcm",
        choices: makeChoices(cas.rep, SOLIDES.map((x) => x.nom)),
        expected: [cas.rep],
        comparator: "mcq_exact",
        explanation:
          "Définition : modéliser, c'est remplacer un objet réel par le solide qui lui ressemble le plus, en oubliant les détails.\n\n" +
          "Méthode : on regarde les bases et la façon dont l'objet monte. Les poignées, les creux et les bosses ne comptent pas.\n\n" +
          `Calcul : ${cas.objet} se modélise par ${cas.rep}.\n\n` +
          "Conclusion : ⭐ c'est ce geste qui rend les formules utiles : on ne calcule jamais le volume d'une boîte de conserve, on calcule celui d'un cylindre. La modélisation est le pont entre le monde et les mathématiques.",
      };
    },
  },
];
