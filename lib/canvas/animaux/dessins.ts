// lib/canvas/animaux/dessins.ts
//
// ─── LA BIBLIOTHÈQUE D'ANIMAUX : LES DESSINS ──────────────────────────────────
// Demandée par Frédéric le 14/11/2026 : « une bibliothèque d'objets d'animaux »
// réutilisable — d'abord pour les questions du coach CP → CM2 (« Compte les
// coccinelles », « Combien d'insectes ? », comme sur IXL), ensuite pour les
// shorts Manim (les mêmes dessins exportés en SVG, cf. `manim/animaux.py`).
//
// ⭐ MÊME CONTRAT QUE `ObjetsCanvas` : CHAQUE ANIMAL TIENT DANS UNE BOITE DE
// 60 × 60, en FORMES FERMÉES, contour noir #111827 de 2,2. Un trait épais est
// un trait NOIR et on ne colorie pas un trait ; les détails qui restent noirs
// (œil, moustache, patte d'insecte) sont dessinés APRÈS, en trait fin.
// Les quatre animaux déjà présents dans `objets` (chat, poisson, oiseau,
// papillon) sont repris À L'IDENTIQUE : un chat ne change pas de tête d'une
// question à l'autre.
//
// ⭐ LES DESSINS SONT DES CHAÎNES SVG, PAS DU JSX : la même source sert au
// React du coach, à la page d'aperçu ET à l'export Node vers Manim
// (`scripts/exporter-animaux-manim.mts`). Une seule vérité par animal.
//
// ⭐ AJOUTER UN ANIMAL = une entrée dans `FICHES` + une dans `DESSINS`. Rien
// d'autre : taille, couleur, grille, mélange sont gérés par `svg.ts`.

export type AnimalId =
  // Le monde (≈ 96 % des contextes)
  | "chat"
  | "chien"
  | "poule"
  | "poussin"
  | "canard"
  | "oiseau"
  | "poisson"
  | "papillon"
  | "coccinelle"
  | "abeille"
  | "fourmi"
  | "araignee"
  | "escargot"
  | "tortue"
  | "lapin"
  | "souris"
  | "grenouille"
  | "vache"
  | "cochon"
  | "mouton"
  // La Réunion (≈ 4 % : à employer avec parcimonie, cf. mémoire)
  | "margouillat"
  | "tangue"
  | "paille_en_queue"
  | "tortue_marine";

/** La famille sert aux questions de TRI : « Compte les insectes » doit pouvoir
 *  glisser une araignée (8 pattes, pas un insecte) et un escargot parmi eux. */
export type FamilleAnimal =
  | "insecte"
  | "arachnide"
  | "mollusque"
  | "oiseau"
  | "mammifere"
  | "poisson"
  | "reptile"
  | "amphibien";

export type FicheAnimal = {
  /** « un chat », « une poule » — l'article est celui qu'on lit à voix haute. */
  un: string;
  /** « chats », « chevaux » — le pluriel sans article, pour « 7 chats ». */
  pluriel: string;
  famille: FamilleAnimal;
  /** Nombre de pattes : 0 pour le poisson et l'escargot. Sert aux problèmes
   *  « Combien de pattes pour 3 poules ? ». */
  pattes: number;
  origine: "monde" | "reunion";
};

export const FICHES: Record<AnimalId, FicheAnimal> = {
  chat: { un: "un chat", pluriel: "chats", famille: "mammifere", pattes: 4, origine: "monde" },
  chien: { un: "un chien", pluriel: "chiens", famille: "mammifere", pattes: 4, origine: "monde" },
  poule: { un: "une poule", pluriel: "poules", famille: "oiseau", pattes: 2, origine: "monde" },
  poussin: { un: "un poussin", pluriel: "poussins", famille: "oiseau", pattes: 2, origine: "monde" },
  canard: { un: "un canard", pluriel: "canards", famille: "oiseau", pattes: 2, origine: "monde" },
  oiseau: { un: "un oiseau", pluriel: "oiseaux", famille: "oiseau", pattes: 2, origine: "monde" },
  poisson: { un: "un poisson", pluriel: "poissons", famille: "poisson", pattes: 0, origine: "monde" },
  papillon: { un: "un papillon", pluriel: "papillons", famille: "insecte", pattes: 6, origine: "monde" },
  coccinelle: { un: "une coccinelle", pluriel: "coccinelles", famille: "insecte", pattes: 6, origine: "monde" },
  abeille: { un: "une abeille", pluriel: "abeilles", famille: "insecte", pattes: 6, origine: "monde" },
  fourmi: { un: "une fourmi", pluriel: "fourmis", famille: "insecte", pattes: 6, origine: "monde" },
  araignee: { un: "une araignée", pluriel: "araignées", famille: "arachnide", pattes: 8, origine: "monde" },
  escargot: { un: "un escargot", pluriel: "escargots", famille: "mollusque", pattes: 0, origine: "monde" },
  tortue: { un: "une tortue", pluriel: "tortues", famille: "reptile", pattes: 4, origine: "monde" },
  lapin: { un: "un lapin", pluriel: "lapins", famille: "mammifere", pattes: 4, origine: "monde" },
  souris: { un: "une souris", pluriel: "souris", famille: "mammifere", pattes: 4, origine: "monde" },
  grenouille: { un: "une grenouille", pluriel: "grenouilles", famille: "amphibien", pattes: 4, origine: "monde" },
  vache: { un: "une vache", pluriel: "vaches", famille: "mammifere", pattes: 4, origine: "monde" },
  cochon: { un: "un cochon", pluriel: "cochons", famille: "mammifere", pattes: 4, origine: "monde" },
  mouton: { un: "un mouton", pluriel: "moutons", famille: "mammifere", pattes: 4, origine: "monde" },
  margouillat: { un: "un margouillat", pluriel: "margouillats", famille: "reptile", pattes: 4, origine: "reunion" },
  tangue: { un: "un tangue", pluriel: "tangues", famille: "mammifere", pattes: 4, origine: "reunion" },
  paille_en_queue: {
    un: "un paille-en-queue",
    pluriel: "pailles-en-queue",
    famille: "oiseau",
    pattes: 2,
    origine: "reunion",
  },
  tortue_marine: {
    un: "une tortue marine",
    pluriel: "tortues marines",
    famille: "reptile",
    pattes: 4,
    origine: "reunion",
  },
};

export const ANIMAUX = Object.keys(FICHES) as AnimalId[];

/** Trois teintes par animal : `a` = la couleur principale (celle que
 *  `couleur` remplace), `b` et `c` = les détails (bec, ventre, taches…). */
export type Teinte = { a: string; b: string; c: string };

/** ⭐ La couleur par défaut est FIXE : une coccinelle est rouge dans toutes les
 *  questions. `couleur` ne sert qu'aux exercices où la couleur EST la donnée
 *  (« 3 poissons rouges et 4 poissons bleus »). */
export const TEINTES: Record<AnimalId, Teinte> = {
  chat: { a: "#94a3b8", b: "#ffffff", c: "#f9a8d4" },
  chien: { a: "#d97706", b: "#78350f", c: "#fde68a" },
  poule: { a: "#ffffff", b: "#ef4444", c: "#f59e0b" },
  poussin: { a: "#fde047", b: "#f97316", c: "#facc15" },
  canard: { a: "#e7e5e4", b: "#16a34a", c: "#f59e0b" },
  oiseau: { a: "#fca5a5", b: "#f59e0b", c: "#ffffff" },
  poisson: { a: "#38bdf8", b: "#0284c7", c: "#ffffff" },
  papillon: { a: "#f97316", b: "#7c3aed", c: "#ffffff" },
  coccinelle: { a: "#ef4444", b: "#111827", c: "#ffffff" },
  abeille: { a: "#facc15", b: "#111827", c: "#bae6fd" },
  fourmi: { a: "#9a3412", b: "#7c2d12", c: "#ffffff" },
  araignee: { a: "#6d28d9", b: "#4c1d95", c: "#ffffff" },
  escargot: { a: "#d97706", b: "#fde68a", c: "#92400e" },
  tortue: { a: "#16a34a", b: "#a3e635", c: "#bbf7d0" },
  lapin: { a: "#f5f5f4", b: "#f9a8d4", c: "#ffffff" },
  souris: { a: "#a8a29e", b: "#f9a8d4", c: "#ffffff" },
  grenouille: { a: "#4ade80", b: "#bbf7d0", c: "#ffffff" },
  vache: { a: "#ffffff", b: "#f9a8d4", c: "#fde68a" },
  cochon: { a: "#f9a8d4", b: "#f472b6", c: "#ffffff" },
  mouton: { a: "#ffffff", b: "#475569", c: "#ffffff" },
  // Le margouillat a la peau de Ti Margo (public/cahier-vacances/ti-margo.png).
  margouillat: { a: "#7cc22e", b: "#3f8f24", c: "#fde68a" },
  tangue: { a: "#a16207", b: "#fde047", c: "#57534e" },
  paille_en_queue: { a: "#ffffff", b: "#f97316", c: "#111827" },
  tortue_marine: { a: "#92400e", b: "#65a30d", c: "#fbbf24" },
};

// ─── Petits outils d'écriture ─────────────────────────────────────────────────

const ENCRE = "#111827";

/** Une forme pleine, contour noir. */
const F = (fill: string, w = 2.2) =>
  `fill="${fill}" stroke="${ENCRE}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
/** Un détail qui reste noir (œil, moustache, patte fine). */
const D = (w = 1.6) =>
  `fill="none" stroke="${ENCRE}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const oeil = (x: number, y: number, r = 2.2) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${ENCRE}"/>`;
/** Un œil « dessin animé » : blanc, pupille noire — pour les têtes de face. */
const grosOeil = (x: number, y: number, r = 4) =>
  `<circle cx="${x}" cy="${y}" r="${r}" ${F("#ffffff", 1.6)}/><circle cx="${x + r * 0.2}" cy="${y + r * 0.1}" r="${r * 0.5}" fill="${ENCRE}"/>`;

/** Un contour bouclé (laine du mouton) : des arcs bombés vers l'extérieur
 *  posés sur une ellipse. Un seul chemin fermé, donc un seul coloriage. */
function boucles(cx: number, cy: number, rx: number, ry: number, n: number) {
  const pts = Array.from({ length: n }, (_, i) => {
    const t = (i / n) * Math.PI * 2;
    return [cx + rx * Math.cos(t), cy + ry * Math.sin(t)];
  });
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 1; i <= n; i++) {
    const [x, y] = pts[i % n];
    const [px, py] = pts[i - 1];
    const r = (Math.hypot(x - px, y - py) * 0.6).toFixed(1);
    d += ` A ${r} ${r} 0 0 1 ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  return d + " Z";
}

/** Un dos piquant (tangue) : dents de scie le long d'un demi-ovale. */
function dosPiquant(cx: number, cy: number, rx: number, ry: number, n: number) {
  let d = `M ${cx - rx} ${cy}`;
  for (let i = 1; i <= n; i++) {
    const tMid = Math.PI - ((i - 0.5) / n) * Math.PI;
    const tEnd = Math.PI - (i / n) * Math.PI;
    const px = cx + (rx + 5) * Math.cos(tMid);
    const py = cy - (ry + 5) * Math.sin(tMid);
    const ex = cx + rx * Math.cos(tEnd);
    const ey = cy - ry * Math.sin(tEnd);
    d += ` L ${px.toFixed(1)} ${py.toFixed(1)} L ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  }
  return d + " Z";
}

// ─── Les vingt-quatre dessins, chacun dans sa boite de 60 × 60 ───────────────

export const DESSINS: Record<AnimalId, (t: Teinte) => string> = {
  // Repris d'ObjetsCanvas : assis et de face (de profil, on y voyait un phoque).
  chat: (t) => `
    <path d="M 40 52 C 53 52 57 41 52 32 C 59 41 54 57 40 57 Z" ${F(t.a)}/>
    <path d="M 30 32 C 18 32 14 44 16 54 L 44 54 C 46 44 42 32 30 32 Z" ${F(t.a)}/>
    <path d="M 21 17 L 18 5 L 31 13 Z" ${F(t.a)}/>
    <path d="M 39 17 L 42 5 L 29 13 Z" ${F(t.a)}/>
    <circle cx="30" cy="26" r="14" ${F(t.a)}/>
    ${oeil(25, 24)}${oeil(35, 24)}
    <path d="M 27 30 L 33 30 L 30 33 Z" ${F(t.c)}/>
    <path d="M 30 33 L 30 35 M 30 35 a 4 3 0 0 1 -5 1 M 30 35 a 4 3 0 0 0 5 1" ${D(1.3)}/>
    <path d="M 16 27 L 5 25 M 16 30 L 5 32 M 44 27 L 55 25 M 44 30 L 55 32" ${D(1.2)}/>`,

  // De face comme le chat : oreilles tombantes, museau clair, langue.
  chien: (t) => `
    <path d="M 30 38 C 18 38 15 48 17 56 L 43 56 C 45 48 42 38 30 38 Z" ${F(t.a)}/>
    <circle cx="30" cy="26" r="15" ${F(t.a)}/>
    <path d="M 17 16 C 7 17 6 36 13 40 C 19 39 20 28 19 20 Z" ${F(t.b)}/>
    <path d="M 43 16 C 53 17 54 36 47 40 C 41 39 40 28 41 20 Z" ${F(t.b)}/>
    <path d="M 29 39 L 29 44 a 3 3 0 0 0 6 0 L 35 38 Z" ${F("#f472b6", 1.6)}/>
    <ellipse cx="30" cy="33" rx="9" ry="6.5" ${F(t.c)}/>
    <ellipse cx="30" cy="30" rx="3.4" ry="2.4" fill="${ENCRE}"/>
    <path d="M 30 32 L 30 35 M 30 35 a 3 2.5 0 0 1 -4 0.5 M 30 35 a 3 2.5 0 0 0 4 0.5" ${D(1.3)}/>
    ${oeil(24, 22, 2.4)}${oeil(36, 22, 2.4)}`,

  // De profil, tournée vers la droite : crête et barbillon rouges.
  poule: (t) => `
    <path d="M 23 47 L 23 55 M 19 55 L 27 55 M 32 47 L 32 55 M 28 55 L 36 55" ${D(2)}/>
    <path d="M 13 33 L 4 17 L 11 21 L 10 12 L 18 26 Z" ${F(t.a)}/>
    <ellipse cx="27" cy="36" rx="17" ry="13" ${F(t.a)}/>
    <path d="M 38 14 a 3 3 0 0 1 4 -4 a 3 3 0 0 1 5 0 a 3 3 0 0 1 3 5 L 42 17 Z" ${F(t.b)}/>
    <circle cx="43" cy="22" r="8.5" ${F(t.a)}/>
    <path d="M 50 20 L 57 23.5 L 50 27 Z" ${F(t.c)}/>
    <ellipse cx="49" cy="30.5" rx="2.3" ry="3.4" ${F(t.b, 1.6)}/>
    ${oeil(45, 20.5, 2)}
    <path d="M 18 34 C 22 44 32 44 36 36" ${D(1.6)}/>`,

  // Une boule jaune et sa tête : le petit de la poule.
  poussin: (t) => `
    <path d="M 25 49 L 25 55 M 21 55 L 29 55 M 35 49 L 35 55 M 31 55 L 39 55" ${D(2)}/>
    <circle cx="30" cy="38" r="15" ${F(t.a)}/>
    <circle cx="32" cy="19" r="11" ${F(t.a)}/>
    <path d="M 42 18 L 50 21 L 42 24 Z" ${F(t.b)}/>
    ${oeil(36, 16, 2.1)}
    <path d="M 20 36 C 24 46 34 46 38 38 C 32 40 25 39 20 36 Z" ${F(t.c, 1.6)}/>
    <path d="M 30 8 C 29 4 33 4 32 8" ${D(1.4)}/>`,

  // Le colvert : tête verte, corps beige, bec jaune ; il nage (pas de pattes).
  canard: (t) => `
    <path d="M 36 22 L 46 22 L 46 36 L 36 36 Z" ${F(t.b)}/>
    <path d="M 9 37 L 4 27 L 15 33 Z" ${F(t.a)}/>
    <ellipse cx="28" cy="40" rx="20" ry="12" ${F(t.a)}/>
    <circle cx="42" cy="21" r="9" ${F(t.b)}/>
    <path d="M 49 19 C 54 19 58 20 59 23 C 56 26 52 26 49 25 Z" ${F(t.c)}/>
    ${oeil(44, 18.5, 2)}
    <path d="M 36 31 L 46 31" stroke="#ffffff" stroke-width="2.6"/>
    <path d="M 17 37 C 22 45 32 45 37 38 C 30 36 22 36 17 37 Z" ${F("#a8a29e", 1.6)}/>
    <path d="M 6 54 C 14 51 22 57 30 54 C 38 51 46 57 54 54" ${D(1.6)}/>`,

  // Repris d'ObjetsCanvas.
  oiseau: (t) => `
    <path d="M 12 30 L 4 20 L 8 34 Z" ${F(t.a)}/>
    <ellipse cx="28" cy="34" rx="17" ry="12" ${F(t.a)}/>
    <circle cx="43" cy="22" r="9" ${F(t.a)}/>
    <path d="M 51 20 L 59 23 L 51 26 Z" ${F(t.b)}/>
    ${oeil(45, 20, 2.1)}
    <path d="M 20 30 a 12 8 0 0 1 16 3 a 12 8 0 0 1 -16 -3 Z" ${F(t.a)}/>
    <path d="M 24 46 L 24 54 M 33 46 L 33 54" ${D(2)}/>`,

  // Repris d'ObjetsCanvas.
  poisson: (t) => `
    <path d="M 50 18 L 50 44 L 34 31 Z" ${F(t.b)}/>
    <ellipse cx="26" cy="31" rx="20" ry="13" ${F(t.a)}/>
    <path d="M 24 18 a 9 6 0 0 1 12 3" ${F(t.b)}/>
    ${oeil(14, 28, 2.4)}
    <path d="M 8 31 a 8 8 0 0 0 5 6" ${D(1.4)}/>`,

  // Repris d'ObjetsCanvas, avec un rond sur chaque aile pour le lire de loin.
  papillon: (t) => `
    <path d="M 28 30 C 12 8 2 22 10 32 C 2 42 14 52 28 32 Z" ${F(t.a)}/>
    <path d="M 32 30 C 48 8 58 22 50 32 C 58 42 46 52 32 32 Z" ${F(t.a)}/>
    <circle cx="16" cy="24" r="3.4" ${F(t.c, 1.4)}/>
    <circle cx="44" cy="24" r="3.4" ${F(t.c, 1.4)}/>
    <ellipse cx="30" cy="31" rx="3.4" ry="15" ${F(t.b)}/>
    <path d="M 28 16 L 22 6 M 32 16 L 38 6" ${D(1.6)}/>`,

  // Vue de dessus : six pattes, sept points — reconnue même en tout petit.
  coccinelle: (t) => `
    <path d="M 14 24 L 6 20 M 12 34 L 4 34 M 14 44 L 6 49 M 46 24 L 54 20 M 48 34 L 56 34 M 46 44 L 54 49" ${D(2)}/>
    <path d="M 26 8 L 22 3 M 34 8 L 38 3" ${D(1.6)}/>
    <circle cx="30" cy="14" r="8" fill="${ENCRE}"/>
    <circle cx="26.5" cy="12" r="1.8" fill="${t.c}"/>
    <circle cx="33.5" cy="12" r="1.8" fill="${t.c}"/>
    <circle cx="30" cy="34" r="18" ${F(t.a)}/>
    <path d="M 30 16 L 30 52" ${D(1.8)}/>
    <circle cx="22" cy="26" r="3.6" fill="${t.b}"/>
    <circle cx="38" cy="26" r="3.6" fill="${t.b}"/>
    <circle cx="20" cy="38" r="3.6" fill="${t.b}"/>
    <circle cx="40" cy="38" r="3.6" fill="${t.b}"/>
    <circle cx="25" cy="47" r="2.8" fill="${t.b}"/>
    <circle cx="35" cy="47" r="2.8" fill="${t.b}"/>
    <circle cx="30" cy="21" r="3" fill="${t.b}"/>`,

  // De profil : rayée jaune et noir, ailes bleutées, dard.
  abeille: (t) => `
    <ellipse cx="24" cy="17" rx="7" ry="11" transform="rotate(-25 24 17)" ${F(t.c, 1.8)}/>
    <ellipse cx="35" cy="17" rx="6" ry="10" transform="rotate(20 35 17)" ${F(t.c, 1.8)}/>
    <path d="M 12 34 L 4 36 L 12 39 Z" fill="${ENCRE}"/>
    <ellipse cx="29" cy="36" rx="18" ry="12" fill="${t.a}"/>
    <path d="M 23 24.6 L 23 47.4 M 33 24.3 L 33 47.7" stroke="${t.b}" stroke-width="5"/>
    <ellipse cx="29" cy="36" rx="18" ry="12" ${F("none")}/>
    <path d="M 22 48 L 20 54 M 30 48 L 30 54 M 37 47 L 40 53" ${D(1.6)}/>
    <circle cx="49" cy="31" r="8" ${F(t.a)}/>
    <path d="M 50 23 L 48 14 M 54 25 L 57 16" ${D(1.5)}/>
    ${oeil(52, 29, 2.2)}
    <path d="M 49 35 a 3 2 0 0 0 5 -1" ${D(1.3)}/>`,

  // Trois parties (tête, thorax, abdomen) et six pattes : la fourmi type.
  fourmi: (t) => `
    <path d="M 32 34 L 26 46 L 22 48 M 36 35 L 36 48 L 33 51 M 39 34 L 46 46 L 50 48 M 33 30 L 26 20 L 22 19 M 39 30 L 44 20 L 48 19" ${D(1.8)}/>
    <path d="M 51 26 L 54 15 L 58 13 M 53 28 L 59 21" ${D(1.5)}/>
    <ellipse cx="18" cy="34" rx="12" ry="9" ${F(t.a)}/>
    <ellipse cx="36" cy="32" rx="6" ry="4.5" ${F(t.a)}/>
    <circle cx="48" cy="30" r="6.5" ${F(t.a)}/>
    <circle cx="50" cy="28.5" r="2" fill="${t.c}"/>
    <circle cx="50.5" cy="28.5" r="1" fill="${ENCRE}"/>`,

  // Huit pattes, deux parties : le piège parfait d'un « compte les insectes ».
  araignee: (t) => `
    <path d="M 24 30 L 12 20 L 6 26 M 24 34 L 10 30 L 3 36 M 25 38 L 12 42 L 7 50 M 27 41 L 18 50 L 16 57" ${D(2)}/>
    <path d="M 36 30 L 48 20 L 54 26 M 36 34 L 50 30 L 57 36 M 35 38 L 48 42 L 53 50 M 33 41 L 42 50 L 44 57" ${D(2)}/>
    <path d="M 30 4 L 30 18" ${D(1.2)}/>
    <circle cx="30" cy="40" r="11" ${F(t.a)}/>
    <circle cx="30" cy="26" r="8" ${F(t.b)}/>
    <circle cx="27" cy="25" r="2.6" fill="${t.c}"/><circle cx="27.4" cy="25.4" r="1.2" fill="${ENCRE}"/>
    <circle cx="33" cy="25" r="2.6" fill="${t.c}"/><circle cx="33.4" cy="25.4" r="1.2" fill="${ENCRE}"/>
    <circle cx="26" cy="38" r="2" fill="${t.c}"/><circle cx="34" cy="38" r="2" fill="${t.c}"/>
    <circle cx="30" cy="45" r="2" fill="${t.c}"/>`,

  // La coquille en spirale posée sur le pied, deux cornes à boules.
  escargot: (t) => `
    <path d="M 49 31 L 46 19 M 53 31 L 57 20" ${D(1.6)}/>
    <circle cx="46" cy="19" r="2" fill="${ENCRE}"/><circle cx="57" cy="20" r="2" fill="${ENCRE}"/>
    <path d="M 4 52 C 4 47 10 46 16 46 L 44 46 L 47 32 C 48 27 55 27 55 32 L 54 47 C 57 49 56 52 52 52 Z" ${F(t.b)}/>
    ${oeil(51, 35, 1.8)}
    <circle cx="26" cy="31" r="15" ${F(t.a)}/>
    <path d="M 27 31 a 2.5 2.5 0 1 0 -2.5 2.5 a 5.5 5.5 0 1 0 5.5 -5.5 a 9 9 0 1 0 9 9" ${D(1.7)}/>`,

  // De profil : carapace en dôme, tête qui sort à droite.
  tortue: (t) => `
    <rect x="13" y="38" width="9" height="13" rx="3.5" ${F(t.b)}/>
    <rect x="37" y="38" width="9" height="13" rx="3.5" ${F(t.b)}/>
    <path d="M 8 40 L 3 43 L 9 44 Z" ${F(t.b)}/>
    <path d="M 46 36 C 48 32 52 30 54 30 C 58 30 59 36 57 39 C 54 42 48 41 46 40 Z" ${F(t.b)}/>
    ${oeil(54.5, 33.5, 1.8)}
    <path d="M 9 42 A 21 20 0 0 1 51 42 Z" ${F(t.a)}/>
    <path d="M 7 41 L 53 41 L 51 46 L 9 46 Z" ${F(t.c)}/>
    <path d="M 22 41 L 25 30 L 35 30 L 38 41 M 25 30 L 19 24 M 35 30 L 41 24 M 30 22 L 30 30" ${D(1.5)}/>`,

  // Les longues oreilles suffisent à le nommer ; on le dessine de face.
  lapin: (t) => `
    <ellipse cx="30" cy="49" rx="14" ry="8" ${F(t.a)}/>
    <ellipse cx="23" cy="13" rx="5" ry="12" transform="rotate(-8 23 13)" ${F(t.a)}/>
    <ellipse cx="37" cy="13" rx="5" ry="12" transform="rotate(8 37 13)" ${F(t.a)}/>
    <ellipse cx="23" cy="14" rx="2.2" ry="8" transform="rotate(-8 23 14)" fill="${t.b}"/>
    <ellipse cx="37" cy="14" rx="2.2" ry="8" transform="rotate(8 37 14)" fill="${t.b}"/>
    <circle cx="30" cy="32" r="13" ${F(t.a)}/>
    ${oeil(25, 29, 2.2)}${oeil(35, 29, 2.2)}
    <path d="M 28 34 L 32 34 L 30 36.5 Z" ${F(t.b, 1.3)}/>
    <path d="M 30 36.5 L 30 38.5 M 30 38.5 a 3 2.5 0 0 1 -4 0.5 M 30 38.5 a 3 2.5 0 0 0 4 0.5" ${D(1.3)}/>
    <path d="M 21 35 L 12 34 M 21 37 L 12 39 M 39 35 L 48 34 M 39 37 L 48 39" ${D(1.1)}/>`,

  // De profil : grosse oreille ronde, museau pointu, longue queue.
  souris: (t) => `
    <path d="M 12 44 C 4 44 2 36 6 30 C 9 26 8 22 4 20" ${D(1.8)}/>
    <path d="M 22 47 L 20 52 M 36 47 L 37 52" ${D(2)}/>
    <path d="M 10 42 C 10 30 24 25 38 30 L 55 38 L 40 46 C 30 50 10 52 10 42 Z" ${F(t.a)}/>
    <circle cx="36" cy="25" r="8" ${F(t.a)}/>
    <circle cx="36" cy="25" r="4.5" fill="${t.b}"/>
    ${oeil(43, 34, 2)}
    <circle cx="55" cy="38" r="2.2" fill="${ENCRE}"/>
    <path d="M 50 37 L 58 33 M 50 39 L 58 43" ${D(1)}/>`,

  // De face : deux gros yeux sur le dessus, grand sourire.
  grenouille: (t) => `
    <ellipse cx="13" cy="51" rx="7" ry="3.5" ${F(t.a)}/>
    <ellipse cx="47" cy="51" rx="7" ry="3.5" ${F(t.a)}/>
    <ellipse cx="30" cy="42" rx="17" ry="11" ${F(t.a)}/>
    <ellipse cx="30" cy="45" rx="9" ry="6.5" ${F(t.b, 1.6)}/>
    <ellipse cx="30" cy="30" rx="19" ry="11" ${F(t.a)}/>
    <circle cx="19" cy="20" r="7" ${F(t.a)}/>
    <circle cx="41" cy="20" r="7" ${F(t.a)}/>
    ${grosOeil(19, 20, 4.2)}${grosOeil(41, 20, 4.2)}
    <path d="M 18 32 C 24 38 36 38 42 32" ${D(1.8)}/>`,

  // La tête de face : cornes, oreilles, taches, gros mufle rose.
  vache: (t) => `
    <path d="M 18 14 C 12 12 10 6 13 4 C 14 8 17 10 21 10 Z" ${F(t.c)}/>
    <path d="M 42 14 C 48 12 50 6 47 4 C 46 8 43 10 39 10 Z" ${F(t.c)}/>
    <ellipse cx="11" cy="21" rx="8" ry="4" transform="rotate(20 11 21)" ${F(t.a)}/>
    <ellipse cx="49" cy="21" rx="8" ry="4" transform="rotate(-20 49 21)" ${F(t.a)}/>
    <path d="M 16 18 C 16 8 44 8 44 18 L 42 42 L 18 42 Z" ${F(t.a)}/>
    <path d="M 18 14 C 22 10 28 12 27 17 C 26 22 20 22 17 20 Z" fill="${ENCRE}"/>
    <path d="M 40 26 C 44 26 44 32 42 34 C 38 33 37 28 40 26 Z" fill="${ENCRE}"/>
    ${oeil(24, 26, 2.4)}${oeil(36, 26, 2.4)}
    <ellipse cx="30" cy="44" rx="15" ry="10" ${F(t.b)}/>
    <ellipse cx="24.5" cy="43" rx="2.2" ry="3" fill="${ENCRE}"/>
    <ellipse cx="35.5" cy="43" rx="2.2" ry="3" fill="${ENCRE}"/>
    <path d="M 25 50 C 28 52 32 52 35 50" ${D(1.4)}/>`,

  // La tête de face : rose, groin à deux trous, oreilles pointues.
  cochon: (t) => `
    <path d="M 13 20 L 12 6 L 25 14 Z" ${F(t.a)}/>
    <path d="M 47 20 L 48 6 L 35 14 Z" ${F(t.a)}/>
    <circle cx="30" cy="32" r="19" ${F(t.a)}/>
    ${oeil(23, 26, 2.4)}${oeil(37, 26, 2.4)}
    <ellipse cx="30" cy="38" rx="9" ry="6.5" ${F(t.b)}/>
    <ellipse cx="27" cy="38" rx="1.8" ry="2.6" fill="${ENCRE}"/>
    <ellipse cx="33" cy="38" rx="1.8" ry="2.6" fill="${ENCRE}"/>
    <path d="M 25 46 C 28 48 32 48 35 46" ${D(1.4)}/>`,

  // De profil : une laine bouclée, une tête grise, quatre pattes.
  mouton: (t) => `
    <rect x="14" y="40" width="5" height="15" rx="2" ${F(t.b, 1.8)}/>
    <rect x="21" y="40" width="5" height="15" rx="2" ${F(t.b, 1.8)}/>
    <rect x="31" y="40" width="5" height="15" rx="2" ${F(t.b, 1.8)}/>
    <rect x="38" y="40" width="5" height="15" rx="2" ${F(t.b, 1.8)}/>
    <path d="${boucles(27, 33, 18, 11, 12)}" ${F(t.a)}/>
    <ellipse cx="43" cy="20" rx="6" ry="3" transform="rotate(-25 43 20)" ${F(t.b, 1.8)}/>
    <ellipse cx="49" cy="28" rx="7" ry="9" ${F(t.b)}/>
    <path d="${boucles(46, 18, 6, 4, 6)}" ${F(t.a, 1.8)}/>
    <circle cx="51" cy="25" r="2.4" fill="${t.c}"/><circle cx="51.6" cy="25.4" r="1.2" fill="${ENCRE}"/>`,

  // ─── La Réunion ───────────────────────────────────────────────────────────

  // Vu de dessus, comme sur un mur de case : la peau verte de Ti Margo.
  margouillat: (t) => `
    <path d="M 38 25 L 41 15 L 44 16 L 41 26 Z" ${F(t.a, 1.8)}/>
    <path d="M 38 35 L 41 45 L 44 44 L 41 34 Z" ${F(t.a, 1.8)}/>
    <path d="M 21 25 L 17 15 L 20 14 L 25 25 Z" ${F(t.a, 1.8)}/>
    <path d="M 21 35 L 17 45 L 20 46 L 25 35 Z" ${F(t.a, 1.8)}/>
    <circle cx="42.5" cy="14.5" r="2.6" ${F(t.a, 1.4)}/>
    <circle cx="42.5" cy="45.5" r="2.6" ${F(t.a, 1.4)}/>
    <circle cx="18.5" cy="13.5" r="2.6" ${F(t.a, 1.4)}/>
    <circle cx="18.5" cy="46.5" r="2.6" ${F(t.a, 1.4)}/>
    <path d="M 18 27 C 10 27 5 33 4 42 C 3 50 9 54 14 50 C 9 50 8 44 10 39 C 12 34 15 33 18 33 Z" ${F(t.a)}/>
    <ellipse cx="30" cy="30" rx="13" ry="7.5" ${F(t.a)}/>
    <ellipse cx="48" cy="30" rx="9" ry="6.5" ${F(t.a)}/>
    <circle cx="26" cy="28" r="1.6" fill="${t.b}"/><circle cx="32" cy="32" r="1.6" fill="${t.b}"/>
    <circle cx="35" cy="27" r="1.3" fill="${t.b}"/><circle cx="23" cy="32.5" r="1.3" fill="${t.b}"/>
    ${grosOeil(50, 25.5, 2.6)}${grosOeil(50, 34.5, 2.6)}`,

  // Le tangue : petit hérisson de La Réunion, dos piquant et museau pointu.
  tangue: (t) => `
    <path d="M 18 44 L 17 52 M 25 45 L 25 52 M 38 45 L 39 52 M 44 43 L 46 50" ${D(2.2)}/>
    <path d="${dosPiquant(29, 42, 19, 15, 11)}" ${F(t.c)}/>
    <path d="M 12 44 C 12 34 22 28 32 28 C 42 28 48 33 50 37 L 58 41 L 49 45 C 40 48 16 49 12 44 Z" ${F(t.a)}/>
    <path d="M 20 32 C 24 36 26 42 26 47 M 30 29 C 33 34 34 41 34 47" stroke="${t.b}" stroke-width="2.6" fill="none"/>
    <circle cx="58" cy="41" r="2" fill="${ENCRE}"/>
    ${oeil(46, 37, 1.9)}`,

  // L'oiseau blanc aux deux longues plumes de queue (le logo d'Air Austral).
  // ⛔ Premier jet : ailes en triangles fins et queues tombantes — blanc sur
  // blanc, on y lisait un insecte à pattes. Les ailes sont larges et barrées
  // de noir, les deux plumes filent à l'HORIZONTALE derrière le corps.
  paille_en_queue: (t) => `
    <path d="M 16 29 C 10 29 5 30 1 32 L 1 34 C 6 33 11 32 16 32 Z" ${F(t.a, 1.5)}/>
    <path d="M 16 32 C 11 34 6 37 2 41 L 3 43 C 8 39 12 36 17 34 Z" ${F(t.a, 1.5)}/>
    <path d="M 26 33 C 22 42 16 48 10 51 C 20 52 30 44 36 33 Z" ${F(t.a)}/>
    <ellipse cx="30" cy="30" rx="15" ry="8" ${F(t.a)}/>
    <path d="M 24 27 C 20 16 14 9 6 5 C 18 4 30 12 36 26 Z" ${F(t.a)}/>
    <path d="M 6 5 C 12 5 18 8 22 12 L 18 15 C 15 11 11 8 6 5 Z" fill="${t.c}"/>
    <circle cx="45" cy="26" r="7" ${F(t.a)}/>
    <path d="M 51 24 L 59 27.5 L 51 30 Z" ${F(t.b)}/>
    <path d="M 40 24.5 C 43 22 47 22 51 24.5 C 47 27 43 27 40 24.5 Z" fill="${t.c}"/>
    <circle cx="46.5" cy="24.6" r="1.6" fill="#ffffff"/>`,

  // Vue de dessus, en train de nager : nageoires-palettes, écailles sur la carapace.
  tortue_marine: (t) => `
    <path d="M 20 22 C 10 14 2 14 2 20 C 6 24 14 28 20 30 Z" ${F(t.b)}/>
    <path d="M 40 22 C 50 14 58 14 58 20 C 54 24 46 28 40 30 Z" ${F(t.b)}/>
    <path d="M 21 42 C 15 46 12 52 15 54 C 19 52 22 48 24 45 Z" ${F(t.b)}/>
    <path d="M 39 42 C 45 46 48 52 45 54 C 41 52 38 48 36 45 Z" ${F(t.b)}/>
    <path d="M 28 50 L 30 57 L 32 50 Z" ${F(t.b, 1.6)}/>
    <circle cx="30" cy="10" r="6.5" ${F(t.b)}/>
    ${oeil(27.5, 8.5, 1.5)}${oeil(32.5, 8.5, 1.5)}
    <ellipse cx="30" cy="32" rx="15" ry="19" ${F(t.a)}/>
    <path d="M 30 17 L 25 23 L 25 31 L 30 35 L 35 31 L 35 23 Z M 25 31 L 25 40 L 30 45 L 35 40 L 35 31 M 30 35 L 30 45 M 25 23 L 17 25 M 35 23 L 43 25 M 25 40 L 18 40 M 35 40 L 42 40" fill="none" stroke="${t.c}" stroke-width="1.6" stroke-linejoin="round"/>`,
};
