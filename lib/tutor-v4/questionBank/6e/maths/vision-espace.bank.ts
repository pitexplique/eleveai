// ─── La vision dans l'espace (6e) ──────────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). « La vision dans l'espace » est
// l'un des deux chapitres du domaine « Espace et géométrie » du programme de 6e
// — l'autre étant l'étude de configurations planes. Le coach n'en avait AUCUNE
// micro. Le canvas `solide_3d` savait pourtant déjà dessiner un assemblage de
// cubes en perspective, cube par cube.
//
// L'objectif, mot pour mot (Exemples pour la mise en œuvre des programmes, 6e,
// 2025, p. 16) : « Voir dans l'espace des assemblages de cubes ».
//
// Et ce que le BO en attend :
//   · « interpréter différentes représentations planes d'un assemblage de
//     cubes : dessin à main levée, perspective cavalière, patron » ;
//   · « tracer les différentes vues de cet assemblage : vue de dessus, vue de
//     face, vue de gauche, vue de droite » ;
//   · « inversement, quatre vues étant fournies, choisir parmi plusieurs
//     assemblages celui qui leur correspond » ;
//   · « résoudre des problèmes de dénombrement comme la recherche du nombre de
//     cubes dans un empilement ».
//
// ⭐ CE QUI SE JOUE ICI ET NULLE PART AILLEURS : les cubes qu'on ne VOIT pas.
// Un empilement dessiné en perspective cache des cubes derrière et dessous ;
// l'élève qui compte les faces visibles se trompe toujours. La parade est de
// compter PAR ÉTAGES, et c'est ce que `vision_denombrer` fait travailler.
//
// ⚠️ UNE VUE NE DIT PAS TOUT, ET C'EST LE DÉFI DE LA NOTION : deux assemblages
// différents peuvent avoir exactement les mêmes quatre vues, parce qu'un cube
// caché ne se voit sur aucune d'elles.
//
// ⚠️ « Vue de face », « vue de gauche » : sur un dessin isométrique, rien ne dit
// où est la face. Chaque énoncé précise donc ce qu'on regarde — « la longueur
// et la hauteur » — au lieu de compter sur une orientation implicite.

import type { TutorBankItemV4, Solide3DCanvasData, FigureLibreCanvasData, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, type Prenom } from "./entiers.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : un assemblage de cubes se représente en perspective, et se décrit par ses quatre vues — dessus, face, gauche, droite.\n\n" +
    "Méthode : pour compter les cubes, on procède étage par étage, sans oublier ceux qu'on ne voit pas.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

type Cube = { x: number; y: number; z: number };

/**
 * Un assemblage de cubes en perspective.
 *
 * ⚠️ `showLabels` est à FAUX par défaut ici : le canvas écrit sinon le nombre de
 * cubes sous la figure, ce qui donnerait la réponse de toutes les questions de
 * dénombrement.
 */
function assemblage(cubes: Cube[], opts: { compte?: boolean } = {}): Solide3DCanvasData {
  return {
    kind: "solide_3d",
    solide: "assemblage_cubes",
    cubes,
    display: { showLabels: opts.compte ?? false, showUnitCubes: true },
  };
}

/** Un pavé plein de L × l × h cubes. */
function pave(L: number, l: number, h: number): Cube[] {
  const cubes: Cube[] = [];
  for (let x = 0; x < L; x++)
    for (let y = 0; y < l; y++) for (let z = 0; z < h; z++) cubes.push({ x, y, z });
  return cubes;
}

/** Une vue, dessinée à plat sur un quadrillage — c'est ce que l'élève trace. */
function vue(rows: number, cols: number, cells: [number, number][]): FigureLibreCanvasData {
  return {
    kind: "figure_libre",
    size: { cellSize: 30 },
    grid: { rows, cols, filledCells: cells },
    display: { showGrid: true, showFilled: true, showPerimeter: false },
  };
}

// L'escalier de trois marches : 1 + 2 + 3 = 6 cubes, tous visibles.
const escalier: Cube[] = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 2, y: 0, z: 0 },
  { x: 1, y: 0, z: 1 },
  { x: 2, y: 0, z: 1 },
  { x: 2, y: 0, z: 2 },
];

// La tour en L : un cube se cache derrière, on ne le voit pas de face.
const enL: Cube[] = [
  { x: 0, y: 0, z: 0 },
  { x: 1, y: 0, z: 0 },
  { x: 0, y: 1, z: 0 },
  { x: 0, y: 0, z: 1 },
  { x: 0, y: 0, z: 2 },
];

// ═══════════════════════════════════════════════════════════════════════════
// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE. Mesuré le 05/10 : 6 à 11
// squelettes par micro, 12 à 18 répétitions sur 20. Chaque gabarit compose
// maintenant une situation (caisses au marché, briques de jeu, morceaux de
// sucre, dés…) × une tournure × des prénoms, et TIRE l'assemblage (pavé,
// colonnes de hauteurs variées décrites rangée par rangée) : le canvas dessine
// exactement les cubes décrits. Plus aucune question ouverte à mot-clé.
// Les correcteurs : correcteurs/vision-espace.ts (ils recomptent les cubes du
// canvas et refont les vues).
// ═══════════════════════════════════════════════════════════════════════════

type QV = TutorGeneratedQuestionV4;
const pickV = <T,>(a: readonly T[]): T => a[Math.floor(Math.random() * a.length)];
const ilV = (p: Prenom) => (p.f ? "elle" : "il");
const IlV = (p: Prenom) => (p.f ? "Elle" : "Il");
/** « 12 carreaux », « 1 carreau », « 8 cubes ». */
const nb = (k: number, mot: string) => `${k} ${mot}${k > 1 && !mot.endsWith("x") ? (mot === "carreau" ? "x" : "s") : ""}`;
function courteV(text: string, v: number, mot: string, explication: string, canvas?: Solide3DCanvasData): QV {
  return { text, format: "short", expected: [nb(v, mot)], comparator: "number_equal", explanation: expl(explication), ...(canvas ? { canvas } : {}) };
}
function qcmV(text: string, bonne: string, leurres: string[], explication: string, canvas?: Solide3DCanvasData): QV {
  return { text, format: "qcm", choices: shuffle([bonne, ...leurres]), expected: [bonne], comparator: "mcq_exact", explanation: expl(explication), ...(canvas ? { canvas } : {}) };
}
/** Des cubes de la vie de tous les jours. */
const CUBES_VIE: { dit: (p: Prenom) => string }[] = [
  { dit: (p) => `${p.nom} empile des caisses cubiques au marché.` },
  { dit: (p) => `${p.nom} construit avec des briques cubiques de son jeu.` },
  { dit: (p) => `${p.nom} range des morceaux de sucre dans une boîte.` },
  { dit: (p) => `${p.nom} empile des dés identiques sur la table.` },
  { dit: (p) => `${p.nom} assemble des cubes de bois en classe.` },
  { dit: (p) => `Dans son jeu vidéo, ${p.nom} pose des blocs cubiques.` },
  { dit: (p) => `${p.nom} empile des cartons cubiques dans le garage.` },
  { dit: (p) => `${p.nom} fabrique un mur avec des glaçons cubiques.` },
  { dit: (p) => `${p.nom} range des boîtes cubiques sur une étagère.` },
  { dit: (p) => `Au centre de loisirs, ${p.nom} empile des coussins cubiques.` },
];
const ctxV = (p: Prenom = pickV(PRENOMS)) => pickV(CUBES_VIE).dit(p);
const VUES = [
  { nom: "de dessus", dit: "vue de dessus (on voit la longueur et la largeur)", a: 0, b: 1 },
  { nom: "de face", dit: "vue de face (on voit la longueur et la hauteur)", a: 0, b: 2 },
  { nom: "de droite", dit: "vue de droite (on voit la largeur et la hauteur)", a: 1, b: 2 },
] as const;
/** Un pavé plein décrit en phrase : « 4 cubes de long, 3 de large et 2 de haut ». */
const direPave = (L: number, l: number, h: number) => `${L} cubes de long, ${l} de large et ${h} de haut`;

/** Des colonnes de cubes posées sur un quadrillage : deux rangées, devant et derrière. */
type Hauteurs = { devant: number[]; derriere: number[] };
function tirerHauteurs(): Hauteurs {
  for (;;) {
    const n = randomInt(2, 4);
    const devant = Array.from({ length: n }, () => randomInt(0, 3));
    const derriere = Array.from({ length: n }, () => randomInt(0, 3));
    const total = [...devant, ...derriere].reduce((a, b) => a + b, 0);
    if (total >= 3 && devant.some((x) => x > 0) && derriere.some((x) => x > 0)) return { devant, derriere };
  }
}
const direRangee = (r: number[]) => `${r.slice(0, -1).join(", ")} et ${r[r.length - 1]}`;
const direHauteurs = (h: Hauteurs) =>
  `Il y a deux rangées de ${h.devant.length} colonnes. Rangée de devant, de gauche à droite : ${direRangee(h.devant)} cubes. Rangée de derrière : ${direRangee(h.derriere)} cubes.`;
function cubesDe(h: Hauteurs): Cube[] {
  const c: Cube[] = [];
  [h.devant, h.derriere].forEach((r, y) => r.forEach((k, x) => { for (let z = 0; z < k; z++) c.push({ x, y, z }); }));
  return c;
}
const vuesDe = (h: Hauteurs) => ({
  dessus: [...h.devant, ...h.derriere].filter((k) => k > 0).length,
  face: h.devant.reduce((s, k, i) => s + Math.max(k, h.derriere[i]), 0),
  droite: Math.max(...h.devant) + Math.max(...h.derriere),
  total: [...h.devant, ...h.derriere].reduce((a, b) => a + b, 0),
});

// ─── VISION_VUES ────────────────────────────────────────────────────────────
function genVisionVues(etoile: 2 | 3 | 4): QV {
  const p = pickV(PRENOMS);
  if (etoile === 4) {
    const h = tirerHauteurs();
    const v = vuesDe(h);
    const [quoi, n, pq] = pickV([
      ["vue de dessus", v.dessus, `De dessus, chaque colonne non vide donne UN carreau, quelle que soit sa hauteur : ${v.dessus} colonnes, donc ${v.dessus} carreaux.`],
      ["vue de face", v.face, `De face, on voit pour chaque position la colonne la plus haute (devant ou derrière) : ${h.devant.map((k, i) => Math.max(k, h.derriere[i])).join(" + ")} = ${v.face} carreaux.`],
      ["vue de droite", v.droite, `De droite, chaque rangée montre sa colonne la plus haute : ${Math.max(...h.devant)} pour la rangée de devant, ${Math.max(...h.derriere)} pour celle de derrière, soit ${v.droite} carreaux.`],
    ] as const);
    return courteV(
      `${ctxV(p)} ${direHauteurs(h)} ${pickV([`Combien de carreaux contient la ${quoi} ?`, `Dessine la ${quoi} : combien de carreaux colories-tu ?`, `Combien de carreaux compte la ${quoi} de cet assemblage ?`])}`,
      n, "carreau", pq, assemblage(cubesDe(h)),
    );
  }
  const L = randomInt(2, 6), l = randomInt(2, 5), hh = randomInt(2, 4);
  const dims = [L, l, hh];
  const vue = pickV(VUES);
  const n = dims[vue.a] * dims[vue.b];
  if (etoile === 3 && pickV([true, false])) {
    // Quelle vue a ce nombre de carreaux ? (les trois vues doivent être différentes)
    const ns = VUES.map((w) => dims[w.a] * dims[w.b]);
    if (new Set(ns).size === 3)
      return qcmV(
        `${ctxV(p)} ${IlV(p)} forme un pavé plein de ${direPave(L, l, hh)}. Quelle vue contient ${n} carreaux ?`,
        `la vue ${vue.nom}`,
        VUES.filter((w) => w !== vue).map((w) => `la vue ${w.nom}`).concat("aucune des trois"),
        `Vue de dessus : ${L} × ${l} = ${ns[0]} carreaux. Vue de face : ${L} × ${hh} = ${ns[1]}. Vue de droite : ${l} × ${hh} = ${ns[2]}. C’est la vue ${vue.nom}.`,
        assemblage(pave(L, l, hh)),
      );
  }
  return courteV(
    `${ctxV(p)} ${IlV(p)} forme un pavé plein de ${direPave(L, l, hh)}. ${pickV([`Combien de carreaux contient sa ${vue.dit} ?`, `Sur sa ${vue.dit}, combien de carreaux y a-t-il ?`, `${p.nom} dessine la ${vue.dit}. Combien de carreaux ?`])}`,
    n, "carreau",
    `Cette vue montre un rectangle de ${dims[vue.a]} sur ${dims[vue.b]} : ${dims[vue.a]} × ${dims[vue.b]} = ${n} carreaux. La troisième dimension part vers l’arrière et ne se voit pas.`,
    assemblage(pave(L, l, hh)),
  );
}

// ─── VISION_DENOMBRER ───────────────────────────────────────────────────────
function genVisionDenombrer(etoile: 2 | 3 | 4 | 5): QV {
  const p = pickV(PRENOMS);
  if (etoile <= 3) {
    const L = randomInt(2, 5), l = randomInt(2, 4), h = randomInt(2, etoile === 2 ? 3 : 4);
    const famille = etoile === 2 ? "pave" : pickV(["pave", "etages", "ajouter"] as const);
    if (famille === "etages") {
      return courteV(
        `${ctxV(p)} Chaque étage est un rectangle de ${L} cubes sur ${l}. Il y a ${h} étages identiques. ${pickV(["Combien de cubes en tout ?", "Combien de cubes a-t-" + ilV(p) + " utilisés ?"])}`,
        L * l * h, "cube",
        `Un étage contient ${L} × ${l} = ${L * l} cubes. Avec ${h} étages : ${L * l} × ${h} = ${L * l * h} cubes.`,
        assemblage(pave(L, l, h)),
      );
    }
    if (famille === "ajouter") {
      return courteV(
        `${ctxV(p)} ${IlV(p)} a déjà un pavé plein de ${direPave(L, l, h)}. ${IlV(p)} ajoute un étage identique par-dessus. ${pickV(["Combien de cubes faut-il ajouter ?", "Combien de cubes ajoute-t-" + ilV(p) + " ?"])}`,
        L * l, "cube",
        `Un étage est un rectangle de ${L} sur ${l} : ${L} × ${l} = ${L * l} cubes à ajouter.`,
        assemblage(pave(L, l, h)),
      );
    }
    return courteV(
      `${ctxV(p)} ${IlV(p)} forme un pavé plein de ${direPave(L, l, h)}. ${pickV(["Combien de cubes contient-il ?", "Combien de cubes a-t-" + ilV(p) + " utilisés ?", "Compte les cubes, même ceux qu’on ne voit pas. Combien y en a-t-il ?"])}`,
      L * l * h, "cube",
      `Un étage contient ${L} × ${l} = ${L * l} cubes, et il y a ${h} étages : ${L * l} × ${h} = ${L * l * h} cubes. Les cubes cachés comptent aussi.`,
      assemblage(pave(L, l, h)),
    );
  }
  if (etoile === 4) {
    const famille = pickV(["pyramide", "colonnes"] as const);
    if (famille === "pyramide") {
      const n = randomInt(2, 4);
      const etages: number[] = [];
      for (let i = n; i >= 1; i--) etages.push(i * i);
      const total = etages.reduce((a, b) => a + b, 0);
      const cubes: Cube[] = [];
      for (let z = 0; z < n; z++) for (let x = 0; x < n - z; x++) for (let y = 0; y < n - z; y++) cubes.push({ x, y, z });
      return courteV(
        `${ctxV(p)} ${IlV(p)} construit une pyramide de ${n} étages : chaque étage est un carré de cubes, de côté ${Array.from({ length: n }, (_, i) => n - i).join(", puis ")} en montant. ${pickV(["Combien de cubes en tout ?", "Combien de cubes faut-il, y compris ceux qu’on ne voit pas ?"])}`,
        total, "cube",
        `On compte étage par étage : ${etages.join(" + ")} = ${total} cubes. Les cubes du dessous et du fond sont cachés, mais ils comptent.`,
        assemblage(cubes),
      );
    }
    const h = tirerHauteurs();
    const v = vuesDe(h);
    return courteV(
      `${ctxV(p)} ${direHauteurs(h)} ${pickV(["Combien de cubes en tout ?", "Combien de cubes a-t-" + ilV(p) + " posés ?"])}`,
      v.total, "cube",
      `On additionne les colonnes : ${[...h.devant, ...h.derriere].join(" + ")} = ${v.total} cubes.`,
      assemblage(cubesDe(h)),
    );
  }
  // ★5 : compléter jusqu'à un pavé plein.
  const h = tirerHauteurs();
  const v = vuesDe(h);
  const H = Math.max(...h.devant, ...h.derriere);
  const plein = 2 * h.devant.length * H;
  return courteV(
    `${ctxV(p)} ${direHauteurs(h)} ${IlV(p)} veut obtenir un pavé plein de ${h.devant.length} cubes de long, 2 de large et ${H} de haut. ${pickV(["Combien de cubes doit-" + ilV(p) + " ajouter ?", "Combien de cubes manque-t-il ?"])}`,
    plein - v.total, "cube",
    `Le pavé plein contient ${h.devant.length} × 2 × ${H} = ${plein} cubes. Il y en a déjà ${v.total}. Il manque ${plein} − ${v.total} = ${plein - v.total} cubes.`,
    assemblage(cubesDe(h)),
  );
}

// ─── VISION_REPRESENTATION : solides, patrons, perspective ─────────────────
const SOLIDES: { nom: string; faces: number; aretes: number; sommets: number; detail: string }[] = [
  { nom: "un cube", faces: 6, aretes: 12, sommets: 8, detail: "6 faces carrées" },
  { nom: "un pavé droit", faces: 6, aretes: 12, sommets: 8, detail: "6 faces rectangulaires" },
  { nom: "une pyramide à base carrée", faces: 5, aretes: 8, sommets: 5, detail: "1 base carrée et 4 faces triangulaires" },
  { nom: "un prisme droit à base triangulaire", faces: 5, aretes: 9, sommets: 6, detail: "2 bases triangulaires et 3 faces rectangulaires" },
];
const OBJETS_SOLIDES: { dit: string; solide: string }[] = [
  { dit: "un dé à jouer", solide: "un cube" },
  { dit: "un morceau de sucre", solide: "un cube" },
  { dit: "une boîte à chaussures", solide: "un pavé droit" },
  { dit: "une brique de lait", solide: "un pavé droit" },
  { dit: "une boîte de céréales", solide: "un pavé droit" },
  { dit: "une tente canadienne", solide: "un prisme droit à base triangulaire" },
  { dit: "une barre de chocolat triangulaire", solide: "un prisme droit à base triangulaire" },
  { dit: "le toit d’un clocher", solide: "une pyramide à base carrée" },
  { dit: "une pyramide d’Égypte", solide: "une pyramide à base carrée" },
];
function genVisionRepresentation(etoile: 2 | 3 | 4): QV {
  const p = pickV(PRENOMS);
  if (etoile === 2) {
    const o = pickV(OBJETS_SOLIDES);
    const s = SOLIDES.find((x) => x.nom === o.solide)!;
    const [quoi, n] = pickV([["faces", s.faces], ["arêtes", s.aretes], ["sommets", s.sommets]] as const);
    const autres = [...new Set([4, 5, 6, 8, 9, 12].filter((k) => k !== n))].sort(() => Math.random() - 0.5).slice(0, 3);
    return qcmV(
      `${p.nom} observe ${o.dit} : c’est ${o.solide}. ${pickV([`Combien de ${quoi} a ce solide ?`, `Combien de ${quoi} compte-t-${ilV(p)} ?`])}`,
      `${n} ${quoi}`,
      autres.map((k) => `${k} ${quoi}`),
      `${o.solide.charAt(0).toUpperCase() + o.solide.slice(1)} a ${s.faces} faces (${s.detail}), ${s.aretes} arêtes et ${s.sommets} sommets.`,
    );
  }
  if (etoile === 3) {
    const famille = pickV(["patron", "arêtes", "morceaux"] as const);
    if (famille === "patron") {
      const s = pickV(SOLIDES);
      return qcmV(
        `${p.nom} découpe le patron d’${s.nom} pour le plier. ${pickV(["Combien de morceaux (faces) a ce patron ?", "Combien de faces doit avoir son patron ?"])}`,
        `${s.faces} faces`,
        [4, 5, 6, 8].filter((k) => k !== s.faces).map((k) => `${k} faces`),
        `Le patron contient autant de faces que le solide : ${s.detail}, soit ${s.faces} faces.`,
      );
    }
    const L = randomInt(4, 12), l = randomInt(2, 8), h = randomInt(2, 9);
    if (famille === "arêtes") {
      return {
        text: `Pour une maquette, ${p.nom} fabrique le squelette d’un pavé droit de ${L} cm de long, ${l} cm de large et ${h} cm de haut, avec des pailles. ${pickV(["Quelle longueur de paille faut-il en tout ?", "Combien de centimètres de paille utilise-t-" + ilV(p) + " ?"])}`,
        format: "short",
        expected: [`${4 * (L + l + h)} cm`],
        comparator: "number_equal",
        explanation: expl(`Un pavé a 12 arêtes : 4 de ${L} cm, 4 de ${l} cm et 4 de ${h} cm. Total : 4 × ${L} + 4 × ${l} + 4 × ${h} = ${4 * (L + l + h)} cm.`),
      };
    }
    const [a, b, nom] = pickV([[L, l, "longueur et largeur"], [L, h, "longueur et hauteur"], [l, h, "largeur et hauteur"]] as const);
    if (L === l || L === h || l === h) return genVisionRepresentation(3);
    return qcmV(
      `${p.nom} dessine le patron d’une boîte en forme de pavé droit : ${L} cm de long, ${l} cm de large et ${h} cm de haut. Combien de faces de ${a} cm sur ${b} cm a ce patron ?`,
      "2 faces",
      ["1 face", "4 faces", "6 faces"],
      `Un pavé a 6 faces, égales deux à deux (faces opposées). Les faces de ${a} cm sur ${b} cm (${nom}) sont 2 : celle de devant et celle de derrière, ou celle du dessus et celle du dessous.`,
    );
  }
  // ★4 : la perspective cavalière.
  const s = pickV(["un cube", "un pavé droit"] as const);
  const [question, bonne, leurres, pq] = pickV([
    [`Sur sa perspective cavalière d’${s}, combien d’arêtes sont cachées (en pointillés) ?`, "3 arêtes", ["0 arête", "4 arêtes", "6 arêtes"], "On ne voit pas les 3 arêtes qui partent du sommet caché, au fond en bas : elles se tracent en pointillés."],
    [`Sur sa perspective cavalière d’${s}, combien de faces voit-on entièrement ?`, "3 faces", ["2 faces", "4 faces", "6 faces"], "On voit la face de devant, celle du dessus et celle de côté : 3 faces. Les 3 autres sont cachées."],
    [`Sur sa perspective cavalière d’${s}, combien de sommets sont cachés ?`, "1 sommet", ["0 sommet", "2 sommets", "4 sommets"], "Un seul sommet est caché : celui du fond, en bas, d’où partent les 3 arêtes en pointillés."],
    [`Sur sa perspective cavalière d’${s}, comment sont dessinées des arêtes parallèles en vrai ?`, "parallèles aussi", ["perpendiculaires", "toujours en pointillés", "deux fois plus longues"], "La perspective cavalière conserve le parallélisme : des arêtes parallèles en vrai restent parallèles sur le dessin."],
  ] as const);
  return qcmV(`${p.nom} dessine ${pickV(OBJETS_SOLIDES.filter((o) => o.solide === s)).dit} en perspective. ${question}`, bonne, [...leurres], pq);
}

// ─── VISION_DEFI : le grand cube peint puis découpé ─────────────────────────
const CUBES_PEINTS: { dit: (p: Prenom, n: number) => string; adj: string }[] = [
  { dit: (p, n) => `${p.nom} peint en rouge un grand cube de bois de ${n} cubes de côté, puis le découpe en ${n ** 3} petits cubes.`, adj: "peinte" },
  { dit: (p, n) => `Un gâteau en forme de cube de ${n} parts de côté est recouvert de glaçage sur ses 6 faces. ${p.nom} le coupe en ${n ** 3} petits cubes.`, adj: "glacée" },
  { dit: (p, n) => `${p.nom} trempe dans la peinture un cube formé de ${n ** 3} petits cubes (${n} sur ${n} sur ${n}), puis le démonte.`, adj: "peinte" },
  { dit: (p, n) => `Un bloc de fromage cubique de ${n} sur ${n} sur ${n} a une croûte sur ses 6 faces. ${p.nom} le coupe en ${n ** 3} petits cubes.`, adj: "avec de la croûte" },
  { dit: (p, n) => `${p.nom} recouvre de papier doré un cube de ${n} sur ${n} sur ${n} formé de petits cubes, puis le démonte.`, adj: "dorée" },
];
function genVisionDefi(): QV {
  const p = pickV(PRENOMS);
  const n = randomInt(3, 6);
  const c = pickV(CUBES_PEINTS);
  const [quoi, plur, v, pq] = pickV([
    ["aucune face", false, (n - 2) ** 3, `Ce sont ceux du cœur, qui ne touchent aucune face : un cube de ${n - 2} sur ${n - 2} sur ${n - 2}, soit ${(n - 2) ** 3}.`],
    ["exactement une face", false, 6 * (n - 2) ** 2, `Sur chaque face, les petits cubes du milieu (sans les bords) : ${n - 2} × ${n - 2} = ${(n - 2) ** 2}. Il y a 6 faces : 6 × ${(n - 2) ** 2} = ${6 * (n - 2) ** 2}.`],
    ["exactement deux faces", true, 12 * (n - 2), `Ce sont ceux des arêtes, sans les coins : ${n - 2} par arête. Un cube a 12 arêtes : 12 × ${n - 2} = ${12 * (n - 2)}.`],
    ["exactement trois faces", true, 8, "Ce sont les petits cubes des coins : un cube a 8 sommets, donc 8 coins."],
  ] as const);
  const adj = c.adj.startsWith("avec") ? c.adj : `${c.adj}${plur ? "s" : ""}`;
  const ont = quoi === "aucune face" ? "n’ont" : "ont"; // « combien n’ont aucune face… »
  return courteV(
    `${c.dit(p, n)} ${pickV([`Combien de petits cubes ${ont} ${quoi} ${adj} ?`, `Parmi les petits cubes, combien ${ont} ${quoi} ${adj} ?`])}`,
    v, "cube", pq,
  );
}

export const visionEspaceBank: TutorBankItemV4[] = [
  // =========================
  // VISION_VUES — dessus, face, gauche, droite
  // =========================
  {
    kind: "fixed",
    id: "vision_vues_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé est formé de cubes : 4 de long, 3 de large, 2 de haut. Sa vue de dessus est un rectangle. Combien de carreaux contient-elle ?",
    format: "short",
    expected: ["12 carreaux"],
    comparator: "number_equal",
    hint: "Vue de dessus : on ne voit que la longueur et la largeur.",
    explanation: expl(
      "Vue de dessus, on regarde le pavé d'en haut : on voit un rectangle de 4 sur 3, soit 4 × 3 = 12 carreaux. La hauteur, elle, ne se voit pas de dessus."
    ),
    tags: ["vision_espace", "vues", "canvas", "short"],
    canvas: assemblage(pave(4, 3, 2)),
  },
  {
    kind: "fixed",
    id: "vision_vues_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 2,
    theme: "neutral",
    text: "Le même pavé (4 de long, 3 de large, 2 de haut) est regardé de face, c'est-à-dire en voyant sa longueur et sa hauteur. Combien de carreaux contient cette vue ?",
    format: "short",
    expected: ["8 carreaux"],
    comparator: "number_equal",
    hint: "De face, on voit la longueur et la hauteur.",
    explanation: expl(
      "De face, on voit un rectangle de 4 de long sur 2 de haut : 4 × 2 = 8 carreaux. La largeur disparaît, elle part vers l'arrière."
    ),
    tags: ["vision_espace", "vues", "canvas", "short"],
    canvas: vue(2, 4, [
      [0, 0], [0, 1], [0, 2], [0, 3],
      [1, 0], [1, 1], [1, 2], [1, 3],
    ]),
  },
  {
    kind: "fixed",
    id: "vision_vues_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 3,
    theme: "neutral",
    text: "Toujours le même pavé (4 de long, 3 de large, 2 de haut). Combien de carreaux contient sa vue de droite, où l'on voit la largeur et la hauteur ?",
    format: "short",
    expected: ["6 carreaux"],
    comparator: "number_equal",
    hint: "De droite, on voit la largeur et la hauteur.",
    explanation: expl(
      "De droite, on voit un rectangle de 3 de large sur 2 de haut : 3 × 2 = 6 carreaux. C'est la longueur qui, cette fois, part vers l'arrière."
    ),
    tags: ["vision_espace", "vues", "short"],
  },
  {
    kind: "fixed",
    id: "vision_vues_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 3,
    theme: "neutral",
    text: "Pour un pavé plein, quelles vues ont toujours les mêmes dimensions ?",
    format: "qcm",
    choices: [
      "la vue de gauche et la vue de droite",
      "la vue de dessus et la vue de face",
      "la vue de face et la vue de droite",
      "aucune : les quatre vues sont toujours différentes",
    ],
    expected: ["la vue de gauche et la vue de droite"],
    comparator: "mcq_exact",
    hint: "Ce sont les deux faces opposées d'un même pavé.",
    explanation: expl(
      "La vue de gauche et la vue de droite montrent deux faces opposées du pavé, qui sont identiques : largeur × hauteur dans les deux cas. Sur un pavé plein, la vue de dessus et la vue de dessous le sont aussi."
    ),
    tags: ["vision_espace", "vues", "qcm"],
  },
  {
    kind: "fixed",
    id: "vision_vues_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 4,
    theme: "neutral",
    text: "Observe l'assemblage en escalier. Combien de carreaux contient sa vue de dessus ?",
    format: "short",
    expected: ["3 carreaux"],
    comparator: "number_equal",
    hint: "Vu d'en haut, une colonne de cubes empilés ne fait qu'un seul carreau.",
    explanation: expl(
      "L'escalier occupe trois colonnes, les unes derrière les autres sur une seule rangée. Vu de dessus, chaque colonne — quelle que soit sa hauteur — ne donne qu'un carreau : la vue de dessus contient donc 3 carreaux, alors que l'assemblage compte 6 cubes."
    ),
    tags: ["vision_espace", "vues", "canvas", "short"],
    canvas: assemblage(escalier),
  },
  {
    kind: "template",
    id: "vision_vues_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque vue ne montre que DEUX des trois dimensions.",
    tags: ["vision_espace", "vues", "template"],
    generate: () => genVisionVues(3),
  },
  {
    kind: "template",
    id: "vision_vues_tpl_pave",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque vue ne montre que DEUX des trois dimensions.",
    tags: ["vision_espace", "vues", "template", "canvas"],
    generate: () => genVisionVues(2),
  },
  {
    kind: "template",
    id: "vision_vues_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_vues",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis ce que chaque vue montre, et ce qu'elle perd.",
    tags: ["vision_espace", "vues", "template", "ouverte"],
    // 06/10/2026 : l'ancienne question ouverte à mots-clés devient un calcul de vue
    // sur des colonnes de hauteurs variées (les cubes cachés ne comptent pas double).
    generate: () => genVisionVues(4),
  },

  // =========================
  // VISION_DENOMBRER — et surtout les cubes qu'on ne voit pas
  // =========================
  {
    kind: "fixed",
    id: "vision_denombrer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 2,
    theme: "neutral",
    text: "Un pavé plein est formé de cubes : 3 de long, 2 de large, 2 de haut. Combien de cubes contient-il ?",
    format: "short",
    expected: ["12 cubes"],
    comparator: "number_equal",
    hint: "Compte un étage, puis multiplie par le nombre d'étages.",
    explanation: expl(
      "Un étage contient 3 × 2 = 6 cubes. Il y a 2 étages, donc 6 × 2 = 12 cubes au total. On peut aussi écrire directement 3 × 2 × 2 = 12."
    ),
    tags: ["vision_espace", "denombrer", "canvas", "short"],
    canvas: assemblage(pave(3, 2, 2)),
  },
  {
    kind: "fixed",
    id: "vision_denombrer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 3,
    theme: "neutral",
    text: "Observe l'assemblage en escalier. Combien de cubes le composent ?",
    format: "short",
    expected: ["6 cubes"],
    comparator: "number_equal",
    hint: "Compte étage par étage : combien au rez-de-chaussée, puis au-dessus ?",
    explanation: expl(
      "Étage du bas : 3 cubes. Étage du milieu : 2 cubes. Étage du haut : 1 cube. Total : 3 + 2 + 1 = 6 cubes."
    ),
    tags: ["vision_espace", "denombrer", "canvas", "short"],
    canvas: assemblage(escalier),
  },
  {
    kind: "fixed",
    id: "vision_denombrer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un empilement dessiné en perspective, pourquoi ne peut-on pas compter les cubes en comptant les faces visibles ?",
    format: "qcm",
    choices: [
      "parce que certains cubes sont cachés derrière ou dessous les autres",
      "parce qu'un cube montre toujours trois faces",
      "parce que le dessin déforme les longueurs",
      "parce que les cubes du haut sont plus petits",
    ],
    expected: ["parce que certains cubes sont cachés derrière ou dessous les autres"],
    comparator: "mcq_exact",
    hint: "Un empilement a un intérieur, et l'intérieur ne se voit pas.",
    explanation: expl(
      "Un empilement cache des cubes : ceux du fond, ceux des étages inférieurs, ceux du milieu. Compter ce qu'on voit donne toujours un nombre trop petit. La parade est de compter ÉTAGE PAR ÉTAGE, en se demandant chaque fois combien de cubes soutiennent l'étage du dessus."
    ),
    tags: ["vision_espace", "denombrer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "vision_denombrer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 4,
    theme: "neutral",
    text: "Un empilement a 3 étages : 9 cubes au rez-de-chaussée, 4 au premier, 1 au second. Combien de cubes en tout ?",
    format: "short",
    expected: ["14 cubes"],
    comparator: "number_equal",
    hint: "On additionne les étages.",
    explanation: expl("9 + 4 + 1 = 14 cubes. Compter par étages évite d'oublier ceux du fond."),
    tags: ["vision_espace", "denombrer", "short"],
  },
  {
    kind: "template",
    id: "vision_denombrer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 3,
    theme: "neutral",
    hint: "Un étage, puis le nombre d'étages.",
    tags: ["vision_espace", "denombrer", "template"],
    generate: () => genVisionDenombrer(3),
  },
  {
    kind: "template",
    id: "vision_denombrer_tpl_pave",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 2,
    theme: "neutral",
    hint: "Un étage, puis le nombre d'étages.",
    tags: ["vision_espace", "denombrer", "template", "canvas"],
    generate: () => genVisionDenombrer(2),
  },
  {
    kind: "template",
    id: "vision_denombrer_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les étages, du bas vers le haut.",
    tags: ["vision_espace", "denombrer", "template"],
    generate: () => genVisionDenombrer(4),
  },
  {
    kind: "template",
    id: "vision_denombrer_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_denombrer",
    difficulty: 5,
    theme: "neutral",
    hint: "Décris une méthode qui ne dépend pas de ce qu'on voit.",
    tags: ["vision_espace", "denombrer", "template", "ouverte"],
    // 06/10/2026 : l'ancienne question ouverte devient un calcul : combien de cubes
    // manque-t-il pour compléter le pavé ? (il faut compter aussi les cubes cachés).
    generate: () => genVisionDenombrer(5),
  },

  // =========================
  // VISION_REPRESENTATION — perspective, main levée, patron
  // =========================
  {
    kind: "fixed",
    id: "vision_representation_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une représentation en perspective cavalière, comment dessine-t-on les arêtes cachées ?",
    format: "qcm",
    choices: [
      "en pointillés",
      "en trait épais",
      "on ne les dessine pas du tout",
      "en rouge",
    ],
    expected: ["en pointillés"],
    comparator: "mcq_exact",
    hint: "Il faut qu'on les devine sans les confondre avec les autres.",
    explanation: expl(
      "Les arêtes cachées se tracent en POINTILLÉS : elles existent sur le solide mais on ne les verrait pas en vrai. Le pointillé permet de les montrer sans laisser croire qu'elles sont visibles."
    ),
    tags: ["vision_espace", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "vision_representation_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de carrés compte le patron d'un cube ?",
    format: "short",
    expected: ["6 carrés"],
    comparator: "number_equal",
    hint: "Autant que le cube a de faces.",
    explanation: expl(
      "Un cube a 6 faces carrées, donc son patron est fait de 6 carrés. Ils peuvent être disposés de plusieurs façons — il existe onze patrons différents du cube — mais il y en a toujours six."
    ),
    tags: ["vision_espace", "representation", "short"],
  },
  {
    kind: "fixed",
    id: "vision_representation_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une perspective cavalière d'un cube, les faces qui sont des carrés en réalité sont dessinées…",
    format: "qcm",
    choices: [
      "certaines en carré, d'autres en parallélogramme penché",
      "toutes en carré, sans exception",
      "toutes en parallélogramme",
      "toutes en rectangle",
    ],
    expected: ["certaines en carré, d'autres en parallélogramme penché"],
    comparator: "mcq_exact",
    hint: "Regarde les faces de côté sur un dessin de cube.",
    explanation: expl(
      "La face de devant se dessine en vrai carré, mais les faces qui partent vers l'arrière sont penchées : elles deviennent des parallélogrammes. C'est le prix à payer pour représenter du volume sur une feuille plate — le dessin ne conserve pas les angles."
    ),
    tags: ["vision_espace", "representation", "qcm"],
  },
  {
    kind: "fixed",
    id: "vision_representation_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle représentation permet de LIRE directement le nombre de cubes d'une colonne ?",
    format: "qcm",
    choices: [
      "la vue de face ou de côté, où les étages se comptent",
      "la vue de dessus, qui montre toutes les colonnes",
      "le patron, qui montre toutes les faces",
      "aucune : il faut toujours manipuler l'assemblage",
    ],
    expected: ["la vue de face ou de côté, où les étages se comptent"],
    comparator: "mcq_exact",
    hint: "Quelle vue montre la hauteur ?",
    explanation: expl(
      "La hauteur ne se voit ni de dessus ni sur un patron. Ce sont les vues de face, de gauche et de droite qui la montrent : on y compte les étages d'une colonne directement. La vue de dessus, elle, dit où sont les colonnes, pas leur hauteur."
    ),
    tags: ["vision_espace", "representation", "qcm"],
  },
  {
    kind: "template",
    id: "vision_representation_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les faces du solide.",
    tags: ["vision_espace", "representation", "template"],
    generate: () => genVisionRepresentation(3),
  },
  {
    kind: "template",
    id: "vision_representation_tpl_faces_aretes",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les faces, puis les arêtes (les bords), puis les sommets (les coins).",
    tags: ["vision_espace", "representation", "template", "solides"],
    generate: () => genVisionRepresentation(2),
  },
  {
    kind: "template",
    id: "vision_representation_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_representation",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis ce que chaque représentation garde, et ce qu'elle perd.",
    tags: ["vision_espace", "representation", "template", "ouverte"],
    // 06/10/2026 : l'ancienne question ouverte devient un QCM sur la perspective
    // cavalière (arêtes cachées, faces visibles, parallélisme conservé).
    generate: () => genVisionRepresentation(4),
  },

  // =========================
  // VISION_DEFI
  // =========================
  {
    kind: "fixed",
    id: "vision_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux assemblages de cubes différents peuvent-ils avoir exactement les mêmes quatre vues (dessus, face, gauche, droite) ?",
    format: "qcm",
    choices: [
      "oui : un cube complètement caché ne se voit sur aucune des quatre vues",
      "non : quatre vues décrivent toujours un seul assemblage",
      "oui, mais seulement si les assemblages sont des pavés",
      "non, sauf si on ajoute la vue de dessous",
    ],
    expected: ["oui : un cube complètement caché ne se voit sur aucune des quatre vues"],
    comparator: "mcq_exact",
    hint: "Que devient un cube enfoui au milieu d'un gros empilement ?",
    explanation: expl(
      "Un cube entouré de tous les côtés n'apparaît sur aucune vue : le retirer ne change aucune des quatre images. Deux assemblages, l'un avec ce cube et l'autre sans, ont donc les mêmes vues sans être identiques. Les vues décrivent beaucoup, mais pas tout."
    ),
    tags: ["vision_espace", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "vision_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un cube de 3 sur 3 sur 3 est peint en rouge à l'extérieur, puis découpé en 27 petits cubes. Combien de petits cubes n'ont AUCUNE face peinte ?",
    format: "short",
    expected: ["1 cube"],
    comparator: "number_equal",
    hint: "Lequel ne touche aucune paroi ?",
    explanation: expl(
      "Seul le petit cube du centre ne touche aucune face extérieure : il n'a donc aucune face peinte. Tous les autres sont sur une paroi, une arête ou un coin. Réponse : 1 cube."
    ),
    tags: ["vision_espace", "defi", "canvas", "short"],
    canvas: assemblage(pave(3, 3, 3)),
  },
  {
    kind: "template",
    id: "vision_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le cœur d'un cube est lui-même un cube, plus petit de deux unités dans chaque direction.",
    tags: ["vision_espace", "defi", "template"],
    generate: () => genVisionDefi(),
  },
  {
    kind: "template",
    id: "vision_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "vision_espace",
    microId: "vision_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Raisonne sur ce qui touche l'extérieur et ce qui ne le touche pas.",
    tags: ["vision_espace", "defi", "template", "ouverte"],
    // 06/10/2026 : l'ancienne question ouverte devient un calcul (cubes du cœur,
    // des faces, des arêtes, des coins) : on mêle les colonnes et les vues.
    generate: () => (Math.random() < 0.5 ? genVisionDefi() : genVisionDenombrer(5)),
  },
];

// La tour en L sert de réserve pour les prochains items de reconstitution
// (vue de dessus identique, hauteurs différentes).
void enL;
void shuffle;
