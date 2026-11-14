// lib/tutor-v4/questionBank/cm1/maths/reperage-outils.ts
//
// ⭐ 14/11/2026 — LES GABARITS DU REPÉRAGE CM1 (aucune vidéo pour ces micros).
// Avant : 10 à 21 squelettes par micro, 10 à 17 répétitions sur 20. Chaque
// gabarit tire maintenant une SITUATION (plan du quartier, carte au trésor,
// zoo, potager, fouilles, entrepôt, musée, jeu vidéo… métiers compris) × une
// TOURNURE × des nombres, et pose sa figure :
//   - les CASES (« C2 ») : `tableau_donnees`, colonnes en lettres, lignes en
//     nombres numérotées de haut en bas (comme la bataille navale) ;
//   - les NŒUDS (« (3 ; 2) ») : `reperage`, axes gradués à partir de 0.
// ⛔ CM1 = zéro clavier : que des QCM à 3-4 choix. Les leurres = vraies erreurs :
// inverser colonne et ligne (ou les deux nombres), compter à partir de 1 au lieu
// de 0, gauche/droite ou haut/bas inversés, compter la case (le nœud) de départ,
// oublier le point de départ, appliquer le trajet à l'envers.
// ⛔ La figure porte les DONNÉES : jamais le « ? » posé sur la réponse.
// ⛔ La Réunion : une situation sur 24, pas plus.

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { cap, entre, melange, un } from "./trous-outils";

type G = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };
type Qcm = Pick<TutorGeneratedQuestionV4, "format" | "choices" | "expected" | "comparator">;

/* ───────────────────────── Les mots ───────────────────────── */

/** « du coffre », « de la poste », « de l'école », « des tomates ». */
const de = (g: string) => (g.startsWith("le ") ? `du ${g.slice(3)}` : g.startsWith("les ") ? `des ${g.slice(4)}` : `de ${g}`);
/** « au coffre », « à la poste », « à l'école », « aux tomates ». */
const a = (g: string) => (g.startsWith("le ") ? `au ${g.slice(3)}` : g.startsWith("les ") ? `aux ${g.slice(4)}` : `à ${g}`);
const est = (g: string) => (g.startsWith("les ") ? "sont" : "est");
const ses = (g: string) => (g.startsWith("les ") ? "leurs" : "ses");
const pl = (n: number) => `${n} carreau${n > 1 ? "x" : ""}`;
const plC = (n: number) => `${n} case${n > 1 ? "s" : ""}`;
/** « de Téo », « d'Inès ». */
const dP = (nom: string) => (/^[AEIOUYÉH]/.test(nom) ? `d'${nom}` : `de ${nom}`);

type Lieu = readonly [string, string];
type Sit = { plan: string; qui: readonly [string, string]; lieux: readonly Lieu[] };
const S = (plan: string, qui: readonly [string, string], lieux: readonly Lieu[]): Sit => ({ plan, qui, lieux });

const SITS: readonly Sit[] = [
  S("le plan du quartier", ["la factrice", "le facteur"], [["la boulangerie", "🥖"], ["la poste", "✉️"], ["l'école", "🏫"], ["la pharmacie", "💊"], ["la mairie", "🏛️"]]),
  S("la carte au trésor", ["la pirate", "le pirate"], [["le coffre", "💰"], ["le palmier", "🌴"], ["le bateau", "⛵"], ["la colline", "⛰️"], ["le perroquet", "🦜"]]),
  S("le plan du zoo", ["la soigneuse", "le soigneur"], [["l'enclos des lions", "🦁"], ["la volière", "🦜"], ["la mare aux canards", "🦆"], ["la maison des singes", "🐒"], ["l'enclos des girafes", "🦒"]]),
  S("le plan du potager", ["la jardinière", "le jardinier"], [["les tomates", "🍅"], ["les salades", "🥬"], ["les carottes", "🥕"], ["le pommier", "🍎"], ["les fraises", "🍓"]]),
  S("le plan du parc", ["la gardienne du parc", "le gardien du parc"], [["la fontaine", "⛲"], ["le manège", "🎠"], ["le marchand de glaces", "🍦"], ["le grand chêne", "🌳"], ["le bac à sable", "🏖️"]]),
  S("le carré de fouilles", ["l'archéologue", "l'archéologue"], [["la poterie", "🏺"], ["la pièce de monnaie", "🪙"], ["l'os", "🦴"], ["le collier", "📿"], ["la pointe de flèche", "🏹"]]),
  S("le plan de la classe", ["la maîtresse", "le maître"], [["l'ordinateur", "💻"], ["l'aquarium", "🐠"], ["le coin lecture", "📚"], ["la plante verte", "🪴"], ["l'horloge", "🕒"]]),
  S("le plateau du jeu", ["le pion", "le pion"], [["l'étoile", "⭐"], ["la clé", "🔑"], ["la pomme", "🍎"], ["le piège", "🪤"], ["la couronne", "👑"]]),
  S("la carte du jeu vidéo", ["l'héroïne du jeu", "le héros du jeu"], [["la potion", "🧪"], ["l'épée", "🗡️"], ["le château", "🏰"], ["le dragon", "🐉"], ["le bouclier", "🛡️"]]),
  S("le plan du camping", ["la monitrice", "le moniteur"], [["la tente bleue", "⛺"], ["la piscine", "🏊"], ["l'accueil", "🛎️"], ["le terrain de jeux", "⚽"], ["le feu de camp", "🔥"]]),
  S("le plan de la ferme", ["l'agricultrice", "l'agriculteur"], [["le poulailler", "🐔"], ["l'étable", "🐄"], ["le tracteur", "🚜"], ["la bergerie", "🐑"], ["le verger", "🍐"]]),
  S("le plan de la ville", ["la pompière", "le pompier"], [["la caserne", "🚒"], ["l'hôpital", "🏥"], ["la borne à incendie", "🧯"], ["le gymnase", "🏀"], ["la gare", "🚉"]]),
  S("la carte marine", ["la navigatrice", "le navigateur"], [["l'île", "🏝️"], ["le port", "⚓"], ["le rocher", "🪨"], ["la bouée", "🛟"], ["la baleine", "🐋"]]),
  S("le plan de l'entrepôt", ["la magasinière", "le magasinier"], [["les cartons", "📦"], ["le chariot", "🛒"], ["les palettes", "🪵"], ["la porte de livraison", "🚪"], ["l'extincteur", "🧯"]]),
  S("le plan du terrain de foot", ["l'entraîneuse", "l'entraîneur"], [["le ballon", "⚽"], ["le plot rouge", "🔺"], ["le but", "🥅"], ["la gourde", "🥤"], ["le drapeau de coin", "🚩"]]),
  S("le plan du musée", ["la guide", "le guide"], [["la statue", "🗿"], ["le grand tableau", "🖼️"], ["le diamant", "💎"], ["le squelette de dinosaure", "🦖"], ["la sortie", "🚪"]]),
  S("la photo prise par le drone", ["la géomètre", "le géomètre"], [["la maison", "🏠"], ["le grand arbre", "🌳"], ["la voiture", "🚗"], ["la serre", "🌱"], ["le puits", "🪣"]]),
  S("le plan du salon", ["le robot aspirateur", "le robot aspirateur"], [["le canapé", "🛋️"], ["la table", "🍽️"], ["la plante", "🪴"], ["le panier du chat", "🐈"], ["la télévision", "📺"]]),
  S("le plan de la station de ski", ["la monitrice de ski", "le moniteur de ski"], [["le chalet", "🏠"], ["le télésiège", "🚡"], ["le sapin", "🌲"], ["le bonhomme de neige", "⛄"], ["le refuge", "🛖"]]),
  S("le plan du marché", ["la marchande", "le marchand"], [["le stand de fruits", "🍉"], ["le stand de fromages", "🧀"], ["le stand de fleurs", "💐"], ["le stand de poissons", "🐟"], ["le stand de pain", "🥖"]]),
  S("le plan de la bibliothèque", ["la bibliothécaire", "le bibliothécaire"], [["les romans", "📚"], ["les bandes dessinées", "💬"], ["l'ordinateur", "💻"], ["le coin des bébés", "🧸"], ["l'accueil", "🛎️"]]),
  S("le plan de l'aéroport", ["la pilote", "le pilote"], [["l'avion", "✈️"], ["la tour de contrôle", "📡"], ["le hangar", "🏭"], ["la piste", "🛬"], ["le parking", "🅿️"]]),
  S("le plan de la piscine", ["la maître-nageuse", "le maître-nageur"], [["le plongeoir", "🤿"], ["le toboggan", "🌊"], ["les vestiaires", "🚿"], ["la bouée", "🛟"], ["le transat", "🏖️"]]),
  S("la carte du sentier de Mafate", ["la randonneuse", "le randonneur"], [["le gîte", "🏠"], ["la cascade", "💧"], ["le pont", "🌉"], ["le kiosque", "⛺"], ["le sommet", "⛰️"]]),
];

type Qui = { nom: string; il: "il" | "elle"; e: "" | "e" };
function sit(): { s: Sit; q: Qui; L: Lieu[] } {
  // La Réunion (Mafate) : une chance sur deux d'être retirée → ≈ 2 % des tirages.
  let s = un(SITS);
  if (/Mafate/.test(s.plan) && Math.random() < 0.5) s = un(SITS);
  const f = Math.random() < 0.5;
  const nom = f ? s.qui[0] : s.qui[1];
  const il: "il" | "elle" = s.qui[0] !== s.qui[1] ? (f ? "elle" : "il") : nom.startsWith("la ") ? "elle" : nom.startsWith("le ") ? "il" : f ? "elle" : "il";
  return { s, q: { nom, il, e: il === "elle" ? "e" : "" }, L: melange([...s.lieux]) };
}

const PRENOMS: readonly (readonly [string, "il" | "elle"])[] = [
  ["Nina", "elle"], ["Zoé", "elle"], ["Inès", "elle"], ["Jade", "elle"], ["Maya", "elle"], ["Lina", "elle"], ["Emma", "elle"], ["Léa", "elle"], ["Sarah", "elle"], ["Chloé", "elle"], ["Aya", "elle"], ["Rose", "elle"], ["Nora", "elle"], ["Sofia", "elle"],
  ["Téo", "il"], ["Ravi", "il"], ["Malo", "il"], ["Sacha", "il"], ["Amir", "il"], ["Tom", "il"], ["Yanis", "il"], ["Noé", "il"], ["Lucas", "il"], ["Karim", "il"], ["Hugo", "il"], ["Enzo", "il"], ["Bilal", "il"], ["Jules", "il"],
];
const prenom = () => {
  const [nom, il] = un(PRENOMS);
  return { nom, il, Il: cap(il) };
};

const LETTRES = ["A", "B", "C", "D", "E", "F", "G", "K", "M", "N", "P", "R", "S", "T"];
const lettres = (n: number) => melange([...LETTRES]).slice(0, n);

/* ───────────────────────── Les QCM ───────────────────────── */

/** La bonne réponse + les 3 premiers leurres distincts (dans l'ordre donné : les erreurs d'abord, le remplissage ensuite). */
function choix(juste: string, faux: (string | null | undefined)[], rempl: (string | null | undefined)[] = []): Qcm {
  const d: string[] = [];
  for (const f of [...faux, ...rempl]) {
    if (!f || f === juste || d.includes(f)) continue;
    d.push(f);
    if (d.length === 3) break;
  }
  return { format: "qcm", choices: melange([juste, ...d]), expected: [juste], comparator: "mcq_exact" };
}

type P = { x: number; y: number };
const XMAX = 6;
const YMAX = 5;
const co = (x: number, y: number) => `(${x} ; ${y})`;
const dans = (x: number, y: number) => x >= 0 && y >= 0 && x <= XMAX && y <= YMAX;
/** Les leurres de coordonnées, hors grille retirés. */
const cos = (l: [number, number][]) => l.filter(([x, y]) => dans(x, y)).map(([x, y]) => co(x, y));
/** Remplissage : les voisins du point. */
const autour = (x: number, y: number) => cos([[x + 1, y], [x, y + 1], [x - 1, y], [x, y - 1], [x + 1, y + 1], [x - 1, y - 1], [x + 2, y], [x, y + 2]]);
const qCo = (x: number, y: number, faux: [number, number][]) => choix(co(x, y), cos(faux), autour(x, y));

/** n points distincts de la grille, loin de ceux de `pris`. */
function libres(n: number, pris: P[], min = 1, xmax = XMAX, ymax = YMAX): P[] {
  const r: P[] = [];
  for (let k = 0; r.length < n && k < 500; k++) {
    const p = { x: entre(min, xmax), y: entre(min, ymax) };
    if ([...pris, ...r].some((q) => q.x === p.x && q.y === p.y)) continue;
    r.push(p);
  }
  return r;
}

/* ───────────────────────── Les dessins ───────────────────────── */

type PtDessin = { x: number; y: number; label?: string; color?: string };
type Dir = "droite" | "gauche" | "haut" | "bas";

function grille(o: {
  points?: PtDessin[];
  path?: { start: PtDessin; steps: { direction: Dir; count: number }[] };
}): CanvasFigure {
  return {
    kind: "reperage",
    grid: { rows: YMAX, cols: XMAX },
    points: o.points ?? [],
    path: o.path ? { ...o.path, showArrows: true, color: "#8b5cf6" } : undefined,
    display: { showGrid: true, showAxes: true, showCoordinates: true, showPointLabels: true, showTarget: true },
    size: { width: 340, height: 280 },
  } as CanvasFigure;
}

const COLS = "ABCDEF";
/** c : colonne à partir de 0 (A) ; r : ligne à partir de 1, numérotée de haut en bas. */
const nc = (c: number, r: number) => `${COLS[c]}${r}`;
type Case = { c: number; r: number };
const okC = (c: number, r: number, nc_: number, nr: number) => c >= 0 && r >= 1 && c < nc_ && r <= nr;
/** Les cases voisines, des plus proches aux plus lointaines (remplissage). */
function voisinesC(c: number, r: number, ncol: number, nr: number): string[] {
  const l: string[] = [];
  for (const [dc, dr] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, -1], [1, -1], [-1, 1], [2, 0], [0, 2], [-2, 0], [0, -2]]) {
    if (okC(c + dc, r + dr, ncol, nr)) l.push(nc(c + dc, r + dr));
  }
  return l;
}
/** L'erreur « colonne et ligne inversées » : C2 lu B3. */
const inverseC = (c: number, r: number, ncol: number, nr: number) => (okC(r - 1, c + 1, ncol, nr) ? nc(r - 1, c + 1) : null);

function damier(ncol: number, nr: number, marques: Record<string, string>, caption?: string): CanvasFigure {
  return {
    kind: "tableau_donnees",
    headers: COLS.slice(0, ncol).split(""),
    coin: "",
    rows: Array.from({ length: nr }, (_, i) => ({
      label: String(i + 1),
      values: Array.from({ length: ncol }, (_, c) => marques[nc(c, i + 1)] ?? ""),
    })),
    ...(caption ? { caption } : {}),
    display: { compact: false },
  } as unknown as CanvasFigure;
}
const legende = (l: Lieu[]) => l.map(([n, e]) => `${e} ${n}`).join(" · ");
function casesLibres(n: number, ncol: number, nr: number, pris: Case[] = []): Case[] {
  const r: Case[] = [];
  for (let k = 0; r.length < n && k < 500; k++) {
    const p = { c: entre(0, ncol - 1), r: entre(1, nr) };
    if ([...pris, ...r].some((q) => q.c === p.c && q.r === p.r)) continue;
    r.push(p);
  }
  return r;
}

/* ───────────────────────── Les déplacements ───────────────────────── */

const DX: Record<Dir, [number, number]> = { droite: [1, 0], gauche: [-1, 0], haut: [0, 1], bas: [0, -1] };
const OPP: Record<Dir, Dir> = { droite: "gauche", gauche: "droite", haut: "bas", bas: "haut" };
const VERS: Record<Dir, string> = { droite: "vers la droite", gauche: "vers la gauche", haut: "vers le haut", bas: "vers le bas" };
const FL: Record<Dir, string> = { droite: "→", gauche: "←", haut: "↑", bas: "↓" };
function bouge(dir: Dir, n: number) {
  return un(
    {
      droite: [`avance de ${pl(n)} vers la droite`, `va ${pl(n)} à droite`],
      gauche: [`recule de ${pl(n)} vers la gauche`, `va ${pl(n)} à gauche`],
      haut: [`monte de ${pl(n)}`, `va ${pl(n)} vers le haut`],
      bas: [`descend de ${pl(n)}`, `va ${pl(n)} vers le bas`],
    }[dir],
  );
}
type Pas = { d: Dir; n: number };
const applique = (p: P, pas: Pas[], sens = 1): P => pas.reduce((q, s) => ({ x: q.x + sens * DX[s.d][0] * s.n, y: q.y + sens * DX[s.d][1] * s.n }), p);
const resteDans = (p: P, pas: Pas[]) => {
  let q = p;
  for (const s of pas) {
    q = applique(q, [s]);
    if (!dans(q.x, q.y)) return false;
  }
  return true;
};
const code = (pas: Pas[]) => pas.flatMap((s) => Array(s.n).fill(FL[s.d])).join(" ");
const decrit = (pas: Pas[]) => pas.map((s) => `${pl(s.n)} ${VERS[s.d]}`).join(" puis ");
const horiz = (): Dir => un(["droite", "gauche"] as Dir[]);
const vert = (): Dir => un(["haut", "bas"] as Dir[]);

/* ───────────────────────── Le fabricant ───────────────────────── */

const T = (micro: string, n: string, difficulty: DifficultyLevel, hint: string, generate: () => G): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `cm1_${micro}_tpl_${n}`,
    niveau: "cm1",
    matiere: "maths",
    notionId: "reperage",
    microId: micro,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm1", "reperage", micro, "template", "qcm", "canvas"],
    generate,
  }) as TutorBankItemV4;

/** Retire jusqu'à ce que la condition tienne (tirages au hasard). */
function tirer<X>(f: () => X, ok: (x: X) => boolean): X {
  for (let k = 0; k < 300; k++) {
    const x = f();
    if (ok(x)) return x;
  }
  return f();
}

/* ════════════════════ REPERAGE_QUADRILLAGE (★1-★2) : les CASES ════════════════════ */

const Q = "reperage_quadrillage";
const quadrillage: TutorBankItemV4[] = [
  // ★1 — Lire la case d'un lieu.
  T(Q, "g01", 1, "La lettre donne la colonne, le nombre donne la ligne.", () => {
    const { s, q, L } = sit();
    const [cible, ...autres] = casesLibres(3, 5, 4);
    const K = nc(cible.c, cible.r);
    const marques: Record<string, string> = { [K]: L[0][1] };
    autres.forEach((p, i) => (marques[nc(p.c, p.r)] = L[i + 1][1]));
    const lieu = L[0][0];
    const text = un([
      `Sur ${s.plan}, dans quelle case ${est(lieu)} ${lieu} ?`,
      `${cap(q.nom)} regarde ${s.plan}. Dans quelle case ${est(lieu)} ${lieu} ?`,
      `Quelle est la case ${de(lieu)} sur ${s.plan} ?`,
      `${cap(q.nom)} cherche ${lieu} sur ${s.plan}. Quelle case doit-${q.il} noter ?`,
      `Sur ${s.plan}, ${lieu} ${est(lieu)} dans une case. Laquelle ?`,
    ]);
    return {
      text,
      ...choix(K, [inverseC(cible.c, cible.r, 5, 4), ...voisinesC(cible.c, cible.r, 5, 4).slice(0, 4)], voisinesC(cible.c, cible.r, 5, 4)),
      explanation: `On lit d'abord la lettre de la colonne (${COLS[cible.c]}), puis le nombre de la ligne (${cible.r}) : ${lieu} ${est(lieu)} en ${K}.`,
      canvas: damier(5, 4, marques, legende(L.slice(0, 3))),
    };
  }),

  // ★1 — Que trouve-t-on dans la case K ?
  T(Q, "g02", 1, "Descends la colonne de la lettre, puis suis la ligne du nombre.", () => {
    const { s, q, L } = sit();
    const cible = casesLibres(1, 5, 4)[0];
    const inv = inverseC(cible.c, cible.r, 5, 4);
    const pris: Case[] = [cible];
    if (inv && inv !== nc(cible.c, cible.r)) pris.push({ c: COLS.indexOf(inv[0]), r: Number(inv.slice(1)) });
    const autres = [...pris.slice(1), ...casesLibres(4 - pris.length, 5, 4, pris)];
    const K = nc(cible.c, cible.r);
    const marques: Record<string, string> = { [K]: L[0][1] };
    autres.forEach((p, i) => (marques[nc(p.c, p.r)] = L[i + 1][1]));
    const text = un([
      `Sur ${s.plan}, qu'y a-t-il dans la case ${K} ?`,
      `${cap(q.nom)} va dans la case ${K}. Que trouve-t-${q.il} ?`,
      `Quel endroit ${de(s.plan)} est dans la case ${K} ?`,
      `${cap(q.nom)} note la case ${K} sur ${s.plan}. De quel endroit s'agit-il ?`,
      `Sur ${s.plan}, que montre la case ${K} ?`,
    ]);
    return {
      text,
      ...choix(L[0][0], L.slice(1, 4).map((l) => l[0])),
      explanation: `${K} : colonne ${COLS[cible.c]}, ligne ${cible.r}. Dans cette case, il y a ${L[0][0]}.`,
      canvas: damier(5, 4, marques, legende(melange(L.slice(0, 4)))),
    };
  }),

  // ★1 — La colonne ou la ligne seule.
  T(Q, "g03", 1, "Les colonnes portent des lettres, les lignes des nombres.", () => {
    const { s, q, L } = sit();
    const [cible, ...autres] = casesLibres(3, 5, 4);
    const marques: Record<string, string> = { [nc(cible.c, cible.r)]: L[0][1] };
    autres.forEach((p, i) => (marques[nc(p.c, p.r)] = L[i + 1][1]));
    const lieu = L[0][0];
    const col = Math.random() < 0.5;
    const text = col
      ? un([
          `Sur ${s.plan}, dans quelle colonne ${est(lieu)} ${lieu} ?`,
          `${cap(q.nom)} cherche ${lieu}. Quelle est sa colonne ?`,
          `Quelle est la colonne ${de(lieu)} sur ${s.plan} ?`,
          `Dans quelle colonne ${de(s.plan)} faut-il chercher ${lieu} ?`,
        ])
      : un([
          `Sur ${s.plan}, dans quelle ligne ${est(lieu)} ${lieu} ?`,
          `${cap(q.nom)} cherche ${lieu}. Quelle est sa ligne ?`,
          `Quelle est la ligne ${de(lieu)} sur ${s.plan} ?`,
          `Dans quelle ligne ${de(s.plan)} faut-il chercher ${lieu} ?`,
        ]);
    const juste = col ? COLS[cible.c] : String(cible.r);
    const faux = col
      ? [String(cible.r), COLS[cible.c + 1], COLS[cible.c - 1], COLS[cible.c + 2], COLS[cible.c - 2]].filter((v) => v !== undefined && (v.length > 1 || !/[F]/.test(v)))
      : [COLS[cible.c], String(cible.r + 1 <= 4 ? cible.r + 1 : cible.r - 2), String(cible.r - 1 >= 1 ? cible.r - 1 : cible.r + 2), String(cible.r === 1 ? 4 : 1)];
    return {
      text,
      ...choix(juste, faux, col ? ["A", "B", "C", "D", "E"] : ["1", "2", "3", "4"]),
      explanation: col
        ? `La colonne se lit en haut, avec une lettre : ${lieu} ${est(lieu)} dans la colonne ${COLS[cible.c]}. Le ${cible.r} est le numéro de la ligne.`
        : `La ligne se lit à gauche, avec un nombre : ${lieu} ${est(lieu)} dans la ligne ${cible.r}. La lettre ${COLS[cible.c]} est celle de la colonne.`,
      canvas: damier(5, 4, marques, legende(L.slice(0, 3))),
    };
  }),

  // ★2 — La case voisine (droite, gauche, au-dessus, en dessous).
  T(Q, "g04", 2, "Sur ce plan, les lignes sont numérotées de haut en bas : regarde le dessin.", () => {
    const { s, q, L } = sit();
    const c = entre(1, 3);
    const r = entre(2, 3);
    const K = nc(c, r);
    const V: Record<string, string> = { "à droite": nc(c + 1, r), "à gauche": nc(c - 1, r), "au-dessus": nc(c, r - 1), "en dessous": nc(c, r + 1) };
    const dir = un(Object.keys(V));
    const [lieu, autre] = [L[0][0], L[1][0]];
    const text = un([
      `Sur ${s.plan}, ${lieu} ${est(lieu)} en ${K}. ${cap(autre)} ${est(autre)} dans la case juste ${dir}. Quelle case ?`,
      `Quelle est la case juste ${dir} de ${K} sur ${s.plan} ?`,
      `${cap(q.nom)} part ${de(lieu)}, en ${K}, et va dans la case juste ${dir}. Laquelle ?`,
      `${cap(q.nom)} cherche ${autre}, juste ${dir} ${de(lieu)}. Dans quelle case ?`,
    ]);
    return {
      text,
      ...choix(V[dir], Object.values(V)),
      explanation: `${lieu} ${est(lieu)} en ${K}. Juste ${dir}, on arrive en ${V[dir]}.`,
      canvas: damier(5, 4, { [K]: L[0][1] }, `${L[0][1]} ${lieu}`),
    };
  }),

  // ★2 — Bataille navale : quelle case touche un bateau ?
  T(Q, "g05", 2, "Lis la lettre de la colonne puis le nombre de la ligne de chaque proposition.", () => {
    const p = prenom();
    const { bateau, faux } = tirer(
      () => {
        const r1 = entre(1, 5);
        const c1 = entre(0, 3);
        const h = [0, 1, 2].map((k) => ({ c: c1 + k, r: r1 }));
        const c2 = entre(0, 5);
        const r2 = entre(1, 4);
        const v = [0, 1].map((k) => ({ c: c2, r: r2 + k }));
        const bateau = [...h, ...v];
        const noms = bateau.map((b) => nc(b.c, b.r));
        const sur = (k: string | null) => !!k && noms.includes(k);
        const juste = un(bateau);
        const faux = [inverseC(juste.c, juste.r, 6, 5), ...bateau.map((b) => inverseC(b.c, b.r, 6, 5)), ...melange(bateau.flatMap((b) => voisinesC(b.c, b.r, 6, 5).slice(0, 4)))].filter(
          (k): k is string => !!k && !sur(k),
        );
        return { bateau: { cases: bateau, noms, juste: nc(juste.c, juste.r), sur }, faux };
      },
      (x) => new Set(x.bateau.noms).size === 5 && new Set(x.faux).size >= 3,
    );
    const marques: Record<string, string> = {};
    bateau.cases.forEach((b) => (marques[nc(b.c, b.r)] = "🚢"));
    const text = un([
      `Voici la grille de bataille navale ${dP(p.nom)}. Quelle case touche un bateau ?`,
      `Sur la grille ${dP(p.nom)}, une seule de ces cases contient un bateau. Laquelle ?`,
      `${p.nom} a dessiné ses bateaux. Quel tir touche un bateau ?`,
      `Bataille navale : quelle case faut-il viser pour toucher un bateau ${dP(p.nom)} ?`,
    ]);
    return {
      text,
      ...choix(bateau.juste, faux),
      explanation: `${bateau.juste} : colonne ${bateau.juste[0]}, ligne ${bateau.juste.slice(1)}. Cette case est bien occupée par un bateau. Attention à ne pas inverser colonne et ligne.`,
      canvas: damier(6, 5, marques, "🚢 = une case de bateau"),
    };
  }),

  // ★2 — Même colonne / même ligne.
  T(Q, "g06", 2, "Même colonne : même lettre. Même ligne : même nombre.", () => {
    const { s, q, L } = sit();
    const pos = tirer(
      () => {
        const X = { c: entre(0, 4), r: entre(1, 4) };
        const Y = { c: X.c, r: entre(1, 4) };
        const Z = { c: entre(0, 4), r: X.r };
        const W = { c: entre(0, 4), r: entre(1, 4) };
        const Vv = { c: entre(0, 4), r: entre(1, 4) };
        return [X, Y, Z, W, Vv];
      },
      ([X, Y, Z, W, Vv]) =>
        Y.r !== X.r && Z.c !== X.c && Z.c !== Y.c && Y.r !== Z.r &&
        [W, Vv].every((p) => p.c !== X.c && p.r !== X.r) && !(W.c === Vv.c && W.r === Vv.r),
    );
    const marques: Record<string, string> = {};
    pos.forEach((p, i) => (marques[nc(p.c, p.r)] = L[i][1]));
    const col = Math.random() < 0.5;
    const X = L[0][0];
    const mot = col ? "colonne" : "ligne";
    const text = un([
      `Sur ${s.plan}, quel endroit est dans la même ${mot} que ${X} ?`,
      `${cap(q.nom)} part ${de(X)} et reste dans la même ${mot}. Où peut-${q.il} arriver ?`,
      `Quel endroit partage la ${mot} ${de(X)} sur ${s.plan} ?`,
      `${cap(q.nom)} cherche ce qui est dans la même ${mot} que ${X}. Qu'est-ce que c'est ?`,
    ]);
    const juste = col ? L[1][0] : L[2][0];
    const piege = col ? L[2][0] : L[1][0];
    return {
      text,
      ...choix(juste, [piege, L[3][0], L[4][0]]),
      explanation: col
        ? `${X} ${est(X)} en ${nc(pos[0].c, pos[0].r)}. La même colonne a la même lettre (${COLS[pos[0].c]}) : c'est ${juste}, en ${nc(pos[1].c, pos[1].r)}.`
        : `${X} ${est(X)} en ${nc(pos[0].c, pos[0].r)}. La même ligne a le même nombre (${pos[0].r}) : c'est ${juste}, en ${nc(pos[2].c, pos[2].r)}.`,
      canvas: damier(5, 4, marques, legende(melange(L.slice(0, 5)))),
    };
  }),

  // ★2 — De combien de cases avance-t-on ?
  T(Q, "g07", 2, "On ne compte pas la case de départ : on compte les cases où l'on pose le pied.", () => {
    const { s, q, L } = sit();
    const h = Math.random() < 0.6;
    const r = entre(1, 5);
    const c = entre(0, 5);
    const [d1, d2] = h ? melange([entre(0, 1), entre(3, 5)]) : melange([entre(1, 2), entre(4, 5)]);
    const A = h ? { c: d1, r } : { c, r: d1 };
    const B = h ? { c: d2, r } : { c, r: d2 };
    const n = Math.abs(d2 - d1);
    const KA = nc(A.c, A.r);
    const KB = nc(B.c, B.r);
    const meme = h ? "la même ligne" : "la même colonne";
    const text = un([
      `${cap(q.nom)} va de ${KA} à ${KB} en restant sur ${meme}. De combien de cases avance-t-${q.il} ?`,
      `Sur ${s.plan}, combien de cases parcourt-on en allant ${de(L[0][0])} (${KA}) ${a(L[1][0])} (${KB}) ?`,
      `${cap(q.nom)} se déplace ${de(L[0][0])}, en ${KA}, ${a(L[1][0])}, en ${KB}. Combien de cases parcourt-${q.il} ?`,
      `De ${KA} à ${KB}, sur ${meme}, combien de cases faut-il avancer ?`,
    ]);
    return {
      text,
      ...choix(plC(n), [plC(n + 1), plC(n - 1), plC(n + 2)]),
      explanation: `De ${KA} à ${KB}, on avance case par case sans compter celle de départ : ${plC(n)}.`,
      canvas: damier(6, 5, { [KA]: L[0][1], [KB]: L[1][1] }, legende(L.slice(0, 2))),
    };
  }),
];

/* ════════════════════ REPERAGE_COORDONNEES (★1-★3) : les NŒUDS ════════════════════ */

const C = "reperage_coordonnees";
const coordonnees: TutorBankItemV4[] = [
  // ★1 — Lire les coordonnées d'un lieu.
  T(C, "g01", 1, "Le premier nombre se lit sur l'axe horizontal, le second sur l'axe vertical.", () => {
    const { s, q, L } = sit();
    const p = tirer(() => ({ x: entre(1, 5), y: entre(1, 4) }), (p) => p.x !== p.y || Math.random() < 0.2);
    const [P, ...ls] = lettres(3);
    const autres = libres(2, [p]);
    const lieu = L[0][0];
    const text = un([
      `Sur ${s.plan}, ${lieu} ${est(lieu)} au point ${P}. Quelles sont ${ses(lieu)} coordonnées ?`,
      `${cap(q.nom)} repère ${lieu} au point ${P}. Quelles sont les coordonnées de ce point ?`,
      `Le point ${P}, c'est ${lieu}. Quelles sont les coordonnées de ce point ?`,
      `À quelles coordonnées se trouve${lieu.startsWith("les ") ? "nt" : ""} ${lieu}, au point ${P} ?`,
      `${cap(q.nom)} doit donner les coordonnées ${de(lieu)} (point ${P}). Lesquelles ?`,
    ]);
    return {
      text,
      ...qCo(p.x, p.y, [[p.y, p.x], [p.x + 1, p.y + 1], [p.x + 1, p.y], [p.x, p.y + 1]]),
      explanation: `On part de 0 : ${P} est à ${p.x} sur l'axe horizontal, puis à ${p.y} sur l'axe vertical. Ses coordonnées sont ${co(p.x, p.y)}.`,
      canvas: grille({ points: [{ ...p, label: P }, ...autres.map((a_, i) => ({ ...a_, label: ls[i], color: "#38bdf8" }))] }),
    };
  }),

  // ★1 — Le premier ou le deuxième nombre seul.
  T(C, "g02", 1, "Premier nombre : l'axe horizontal. Deuxième nombre : l'axe vertical.", () => {
    const { s, q, L } = sit();
    const p = tirer(() => ({ x: entre(1, 5), y: entre(1, 4) }), (p) => p.x !== p.y);
    const [P] = lettres(1);
    const lieu = L[0][0];
    const prem = Math.random() < 0.5;
    const rang = prem ? "premier" : "deuxième";
    const text = un([
      `${cap(lieu)} ${est(lieu)} au point ${P}. Quel est le ${rang} nombre de ${ses(lieu)} coordonnées ?`,
      `Sur ${s.plan}, quel est le ${rang} nombre des coordonnées du point ${P} ?`,
      `${cap(q.nom)} écrit les coordonnées ${de(lieu)} (point ${P}). Quel est le ${rang} nombre ?`,
      `Point ${P}, ${lieu} : quel nombre ${q.nom} écrit-${q.il} en ${prem ? "premier" : "second"} ?`,
    ]);
    const [j, f] = prem ? [p.x, p.y] : [p.y, p.x];
    return {
      text,
      ...choix(String(j), [String(f), String(j + 1), String(j - 1 >= 0 ? j - 1 : j + 2), String(f + 1)], ["0", "1", "2", "3", "4", "5", "6"]),
      explanation: prem
        ? `Le premier nombre se lit sur l'axe horizontal : ${P} est à ${p.x}. Coordonnées : ${co(p.x, p.y)}.`
        : `Le deuxième nombre se lit sur l'axe vertical : ${P} est à ${p.y}. Coordonnées : ${co(p.x, p.y)}.`,
      canvas: grille({ points: [{ ...p, label: P }] }),
    };
  }),

  // ★2 — Quel point a ces coordonnées ?
  T(C, "g03", 2, "Avance d'abord sur l'axe horizontal, puis monte.", () => {
    const { s, q, L } = sit();
    const p = tirer(() => ({ x: entre(0, 5), y: entre(0, 4) }), (p) => p.x !== p.y && p.y <= 4 && p.x <= 5);
    const pieges = [{ x: p.y, y: p.x }, { x: p.x + 1, y: p.y + 1 }].filter((r) => dans(r.x, r.y));
    const pts = [p, ...pieges, ...libres(3 - pieges.length, [p, ...pieges], 0)];
    const noms = lettres(4);
    const lieu = L[0][0];
    const text = un([
      `Sur ${s.plan}, ${lieu} ${est(lieu)} en ${co(p.x, p.y)}. À quel point ?`,
      `${cap(q.nom)} cherche le point ${co(p.x, p.y)} sur ${s.plan}. Lequel est-ce ?`,
      `${cap(lieu)} ${lieu.startsWith("les ") ? "ont" : "a"} pour coordonnées ${co(p.x, p.y)}. Quel point ${de(s.plan)} est-ce ?`,
      `${cap(q.nom)} doit aller ${a(lieu)}, en ${co(p.x, p.y)}. Quel point choisir ?`,
    ]);
    return {
      text,
      ...choix(`le point ${noms[0]}`, noms.slice(1).map((n) => `le point ${n}`)),
      explanation: `${co(p.x, p.y)} : on avance de ${p.x} sur l'axe horizontal, puis on monte de ${p.y}. On tombe sur le point ${noms[0]}.`,
      canvas: grille({ points: melange(pts.map((r, i) => ({ ...r, label: noms[i] }))) }),
    };
  }),

  // ★2 — Un point sur un axe (une coordonnée vaut 0).
  T(C, "g04", 2, "Sur un axe, une des deux coordonnées vaut 0 : on compte à partir de 0.", () => {
    const { s, q, L } = sit();
    const surX = Math.random() < 0.5;
    const p = surX ? { x: entre(1, 5), y: 0 } : { x: 0, y: entre(1, 5) };
    const [P, P2] = lettres(2);
    const autre = libres(1, [p])[0];
    const lieu = L[0][0];
    const text = un([
      `Sur ${s.plan}, ${lieu} ${est(lieu)} au point ${P}. Quelles sont ${ses(lieu)} coordonnées ?`,
      `${cap(lieu)} ${est(lieu)} sur un axe, au point ${P}. Quelles sont ${ses(lieu)} coordonnées ?`,
      `Quelles coordonnées ${q.nom} doit-${q.il} écrire pour ${lieu} (point ${P}) ?`,
      `${cap(q.nom)} lit la position ${de(lieu)} : le point ${P}. Quelles coordonnées ?`,
    ]);
    const faux: [number, number][] = surX
      ? [[0, p.x], [p.x, 1], [p.x + 1, 1], [p.x + 1, 0]]
      : [[p.y, 0], [1, p.y], [1, p.y + 1], [0, p.y + 1]];
    return {
      text,
      ...qCo(p.x, p.y, faux),
      explanation: surX
        ? `${P} est sur l'axe horizontal : on avance de ${p.x}, on ne monte pas. Coordonnées : ${co(p.x, p.y)}.`
        : `${P} est sur l'axe vertical : on n'avance pas (0), on monte de ${p.y}. Coordonnées : ${co(p.x, p.y)}.`,
      canvas: grille({ points: [{ ...p, label: P }, { ...autre, label: P2, color: "#38bdf8" }] }),
    };
  }),

  // ★3 — Diagnostiquer la lecture d'un camarade.
  T(C, "g05", 3, "Lis toi-même les coordonnées, puis compare avec ce qu'il a écrit.", () => {
    const { s, L } = sit();
    const e = prenom();
    const p = tirer(() => ({ x: entre(1, 5), y: entre(1, 4) }), (p) => p.x !== p.y);
    const [P] = lettres(1);
    const cas = un(["juste", "inverse", "plus1", "x1"] as const);
    const lu = { juste: co(p.x, p.y), inverse: co(p.y, p.x), plus1: co(p.x + 1, p.y + 1), x1: co(p.x + 1, p.y) }[cas];
    const R = {
      juste: "Oui, c'est juste.",
      inverse: `Non, ${e.il} a inversé les deux nombres.`,
      plus1: `Non, ${e.il} a compté les lignes à partir de 1 au lieu de 0.`,
      x1: "Non, son premier nombre a 1 de trop.",
    };
    const lieu = L[0][0];
    const text = un([
      `${e.nom} lit ${lieu} (point ${P}) sur ${s.plan} et écrit ${lu}. Qu'en penses-tu ?`,
      `Sur ${s.plan}, ${e.nom} dit que ${lieu}, au point ${P}, est en ${lu}. A-t-${e.il} raison ?`,
      `Pour le point ${P} (${lieu}), ${e.nom} écrit ${lu}. Est-ce juste ?`,
    ]);
    return {
      text,
      ...choix(R[cas], Object.values(R)),
      explanation: `${P} est à ${p.x} sur l'axe horizontal et à ${p.y} sur l'axe vertical : ses coordonnées sont ${co(p.x, p.y)}. ${e.nom} a écrit ${lu}.`,
      canvas: grille({ points: [{ ...p, label: P }] }),
    };
  }),

  // ★3 — Le plus à droite / à gauche / haut / bas, d'après les coordonnées.
  T(C, "g06", 3, "Plus à droite : le premier nombre est plus grand. Plus haut : le deuxième.", () => {
    const { s, q, L } = sit();
    const quoi = un(["le plus à droite", "le plus à gauche", "le plus haut", "le plus bas"] as const);
    const horizontal = quoi === "le plus à droite" || quoi === "le plus à gauche";
    const max = quoi === "le plus à droite" || quoi === "le plus haut";
    const pick = (ps: P[], h: boolean, m: boolean) => {
      const v = ps.map((p) => (h ? p.x : p.y));
      const best = m ? Math.max(...v) : Math.min(...v);
      return v.indexOf(best);
    };
    const pts = tirer(
      () => [0, 1, 2].map(() => ({ x: entre(0, 6), y: entre(0, 5) })),
      (ps) => new Set(ps.map((p) => p.x)).size === 3 && new Set(ps.map((p) => p.y)).size === 3 && pick(ps, horizontal, max) !== pick(ps, !horizontal, max),
    );
    const i = pick(pts, horizontal, max);
    const j = pick(pts, !horizontal, max);
    const n = L.slice(0, 3).map((l) => l[0]);
    const liste = `${n[0]} ${est(n[0])} en ${co(pts[0].x, pts[0].y)}, ${n[1]} en ${co(pts[1].x, pts[1].y)} et ${n[2]} en ${co(pts[2].x, pts[2].y)}.`;
    const text = un([
      `Sur ${s.plan} : ${liste} Quel endroit est ${quoi} ?`,
      `${cap(q.nom)} note : ${liste} Lequel est ${quoi} ?`,
      `${cap(liste)} Sur ${s.plan}, quel endroit est ${quoi} ?`,
    ]);
    return {
      text,
      ...choix(n[i], [n[j], ...n]),
      explanation: horizontal
        ? `Gauche-droite se lit avec le PREMIER nombre. ${cap(n[i])} a le premier nombre ${max ? "le plus grand" : "le plus petit"} (${pts[i].x}).`
        : `Haut-bas se lit avec le DEUXIÈME nombre. ${cap(n[i])} a le deuxième nombre ${max ? "le plus grand" : "le plus petit"} (${pts[i].y}).`,
      canvas: grille({ points: pts.map((p) => ({ ...p, color: "#38bdf8" })) }),
    };
  }),

  // ★3 — L'intrus : pas sur la même ligne horizontale / verticale.
  T(C, "g07", 3, "Même ligne horizontale : même deuxième nombre. Même verticale : même premier nombre.", () => {
    const { s, q } = sit();
    const horizontale = Math.random() < 0.5;
    const k = entre(1, 4);
    const xs = melange([0, 1, 2, 3, 4, 5].filter((v) => v !== k)).slice(0, 3);
    const a_ = melange([0, 1, 2, 3, 4, 5].filter((v) => v !== k))[0];
    const align = xs.map((v) => (horizontale ? co(v, k) : co(k, v)));
    const intrus = horizontale ? co(k, a_) : co(a_, k);
    const ligne = horizontale ? "la même ligne horizontale" : "la même ligne verticale";
    const text = un([
      `Sur ${s.plan}, ${q.nom} a noté quatre points. Trois sont sur ${ligne}. Lequel n'y est pas ?`,
      `Sur ${s.plan}, trois de ces points sont sur ${ligne}. Lequel est l'intrus ?`,
      `${cap(q.nom)} relève quatre points. Lequel n'est pas sur ${ligne} que les autres ?`,
      `${cap(q.nom)} aligne trois repères sur ${ligne}. Quel point n'est pas aligné avec eux ?`,
      `Sur ${s.plan}, quel point n'est pas sur ${ligne} que les trois autres ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: melange([intrus, ...align]),
      expected: [intrus],
      comparator: "mcq_exact",
      explanation: horizontale
        ? `Sur une même ligne horizontale, le DEUXIÈME nombre est le même (${k}). ${intrus} ne l'a pas.`
        : `Sur une même ligne verticale, le PREMIER nombre est le même (${k}). ${intrus} ne l'a pas.`,
    };
  }),
];

/* ════════════════════ REPERAGE_PLACER_POINT (★1-★3) ════════════════════ */

const PL = "reperage_placer_point";
const placer: TutorBankItemV4[] = [
  // ★1 — Choisir le bon point.
  T(PL, "g01", 1, "Avance du premier nombre vers la droite, puis monte du deuxième.", () => {
    const { s, q, L } = sit();
    const p = tirer(() => ({ x: entre(1, 5), y: entre(1, 4) }), (p) => p.x !== p.y);
    const pieges = [{ x: p.y, y: p.x }, { x: p.x + 1, y: p.y + 1 }, Math.random() < 0.5 ? { x: p.x, y: p.y + 1 } : { x: p.x + 1, y: p.y }];
    const noms = lettres(4);
    const lieu = L[0][0];
    const text = un([
      `${cap(q.nom)} veut placer ${lieu} en ${co(p.x, p.y)}. Quel point choisir ?`,
      `Sur ${s.plan}, ${lieu} ${lieu.startsWith("les ") ? "doivent" : "doit"} aller en ${co(p.x, p.y)}. À quel point ?`,
      `Où placer ${lieu}, de coordonnées ${co(p.x, p.y)} ?`,
      `${cap(q.nom)} place ${lieu} en ${co(p.x, p.y)} sur ${s.plan}. Quel point est le bon ?`,
    ]);
    return {
      text,
      ...choix(`le point ${noms[0]}`, noms.slice(1).map((n) => `le point ${n}`)),
      explanation: `${co(p.x, p.y)} : depuis 0, on avance de ${pl(p.x)} vers la droite, puis on monte de ${pl(p.y)}. C'est le point ${noms[0]}.`,
      canvas: grille({ points: melange([p, ...pieges].map((r, i) => ({ ...r, label: noms[i] }))) }),
    };
  }),

  // ★1 — Le premier geste, puis le second.
  T(PL, "g02", 1, "Le premier nombre fait avancer vers la droite, le deuxième fait monter.", () => {
    const { s, q, L } = sit();
    const p = tirer(() => ({ x: entre(1, 6), y: entre(1, 5) }), (p) => p.x !== p.y);
    const lieu = L[0][0];
    const prem = Math.random() < 0.55;
    const opts = {
      ax: `avancer de ${pl(p.x)} vers la droite`,
      mx: `monter de ${pl(p.x)}`,
      ay: `avancer de ${pl(p.y)} vers la droite`,
      my: `monter de ${pl(p.y)}`,
    };
    const text = prem
      ? un([
          `Pour placer ${lieu} en ${co(p.x, p.y)}, que fait-on d'abord, en partant de 0 ?`,
          `${cap(q.nom)} place ${lieu} en ${co(p.x, p.y)} sur ${s.plan}. Que fait-${q.il} en premier ?`,
          `Sur ${s.plan}, ${lieu} va en ${co(p.x, p.y)}. Quel est le premier geste depuis 0 ?`,
        ])
      : un([
          `Pour placer ${lieu} en ${co(p.x, p.y)}, ${q.nom} a avancé de ${pl(p.x)} vers la droite. Que fait-${q.il} ensuite ?`,
          `Sur ${s.plan}, on place ${lieu} en ${co(p.x, p.y)}. Après avoir avancé de ${pl(p.x)}, que fait-on ?`,
          `${cap(q.nom)} place ${lieu} en ${co(p.x, p.y)}. Premier geste fait. Quel est le second ?`,
        ]);
    return {
      text,
      ...choix(prem ? opts.ax : opts.my, prem ? [opts.ay, opts.mx, opts.my] : [opts.mx, opts.ay, `descendre de ${pl(p.y)}`]),
      explanation: `${co(p.x, p.y)} : d'abord ${opts.ax}, puis ${opts.my}.`,
      canvas: grille({ points: [{ x: 0, y: 0, label: "0", color: "#94a3b8" }] }),
    };
  }),

  // ★2 — Choisir le bon point quand une coordonnée vaut 0.
  T(PL, "g03", 2, "0, c'est rester sur l'axe : on ne bouge pas dans cette direction.", () => {
    const { s, q, L } = sit();
    const surX = Math.random() < 0.5;
    const p = surX ? { x: entre(1, 5), y: 0 } : { x: 0, y: entre(1, 4) };
    const pieges = surX ? [{ x: 0, y: p.x }, { x: p.x, y: 1 }, { x: p.x + 1, y: 1 }] : [{ x: p.y, y: 0 }, { x: 1, y: p.y }, { x: 1, y: p.y + 1 }];
    const noms = lettres(4);
    const lieu = L[0][0];
    const text = un([
      `Sur ${s.plan}, ${q.nom} veut placer ${lieu} en ${co(p.x, p.y)}. Quel point choisir ?`,
      `${cap(lieu)} ${lieu.startsWith("les ") ? "doivent" : "doit"} aller en ${co(p.x, p.y)}. Quel est le bon point ?`,
      `Quel point a pour coordonnées ${co(p.x, p.y)} sur ${s.plan} ?`,
      `${cap(q.nom)} place ${lieu} en ${co(p.x, p.y)}. Où le met-${q.il} ?`,
    ]);
    return {
      text,
      ...choix(`le point ${noms[0]}`, noms.slice(1).map((n) => `le point ${n}`)),
      explanation: surX
        ? `${co(p.x, p.y)} : on avance de ${p.x}, et on ne monte pas (0). Le point est sur l'axe horizontal : c'est ${noms[0]}.`
        : `${co(p.x, p.y)} : on n'avance pas (0), on monte de ${p.y}. Le point est sur l'axe vertical : c'est ${noms[0]}.`,
      canvas: grille({ points: melange([p, ...pieges].map((r, i) => ({ ...r, label: noms[i] }))) }),
    };
  }),

  // ★2 — Le point placé par un camarade est-il juste ?
  T(PL, "g04", 2, "Lis les coordonnées du point placé et compare-les à celles demandées.", () => {
    const { s, L } = sit();
    const e = prenom();
    const p = tirer(() => ({ x: entre(1, 5), y: entre(1, 4) }), (p) => p.x !== p.y);
    const cas = un(["juste", "inverse", "plus1", "haut"] as const);
    const mis = { juste: p, inverse: { x: p.y, y: p.x }, plus1: { x: p.x + 1, y: p.y + 1 }, haut: { x: p.x, y: p.y + 1 } }[cas];
    const R = {
      juste: "Le point est bien placé.",
      inverse: `${e.Il} a inversé les deux nombres.`,
      plus1: `${e.Il} a compté les lignes à partir de 1 au lieu de 0.`,
      haut: "Le point est un carreau trop haut.",
    };
    const [P] = lettres(1);
    const lieu = L[0][0];
    const text = un([
      `${e.nom} doit placer ${lieu} en ${co(p.x, p.y)}. ${e.Il} trace le point ${P}. Qu'en penses-tu ?`,
      `Sur ${s.plan}, ${e.nom} a placé ${lieu} au point ${P}. Il fallait ${co(p.x, p.y)}. Que dis-tu ?`,
      `Il fallait placer ${lieu} en ${co(p.x, p.y)}. Voici le point ${P} ${dP(e.nom)}. Est-il juste ?`,
    ]);
    return {
      text,
      ...choix(R[cas], Object.values(R)),
      explanation: `Le point ${P} est en ${co(mis.x, mis.y)}. Il fallait ${co(p.x, p.y)} : avancer de ${p.x}, puis monter de ${p.y}.`,
      canvas: grille({ points: [{ ...mis, label: P }] }),
    };
  }),

  // ★2 — Le trajet depuis 0 donne les coordonnées (même dans le désordre).
  T(PL, "g05", 2, "Le premier nombre dit toujours de combien on va vers la droite, quel que soit l'ordre des gestes.", () => {
    const { s, q, L } = sit();
    const p = tirer(() => ({ x: entre(1, 6), y: entre(1, 5) }), (p) => p.x !== p.y);
    const lieu = L[0][0];
    const desordre = Math.random() < 0.4;
    const geste = desordre
      ? `monte de ${pl(p.y)} puis va ${pl(p.x)} vers la droite`
      : `avance de ${pl(p.x)} vers la droite puis monte de ${pl(p.y)}`;
    const text = un([
      `Pour placer ${lieu}, ${q.nom} part de 0, ${geste}. Quelles sont les coordonnées ?`,
      `Sur ${s.plan}, depuis 0, on ${geste} : c'est ${lieu}. Ses coordonnées ?`,
      `${cap(q.nom)} part de 0 et ${geste}. Où place-t-${q.il} ${lieu} ?`,
    ]);
    return {
      text,
      ...qCo(p.x, p.y, [[p.y, p.x], [p.x + 1, p.y + 1], [p.x, p.y + 1]]),
      explanation: `Vers la droite : ${p.x}, c'est le premier nombre. Vers le haut : ${p.y}, c'est le deuxième. ${cap(lieu)} va en ${co(p.x, p.y)}.`,
      canvas: grille({ points: [{ x: 0, y: 0, label: "0", color: "#94a3b8" }] }),
    };
  }),

  // ★3 — Le 4e coin d'un rectangle.
  T(PL, "g06", 3, "Le coin qui manque a le premier nombre d'un voisin et le deuxième nombre de l'autre.", () => {
    const { s, q } = sit();
    const [x1, x2] = tirer(() => [entre(0, 3), entre(3, 6)], ([a_, b]) => b - a_ >= 2);
    const [y1, y2] = tirer(() => [entre(0, 2), entre(2, 5)], ([a_, b]) => b - a_ >= 2);
    const coins = [{ x: x1, y: y1 }, { x: x2, y: y1 }, { x: x2, y: y2 }, { x: x1, y: y2 }];
    const i = entre(0, 3);
    const D = coins[i];
    const donnes = [1, 2, 3].map((k) => coins[(i + k) % 4]);
    const objet = un(["un enclos", "un potager", "un tapis", "un terrain", "une piscine", "une affiche", "un bassin", "un parking"]);
    const text = un([
      `${cap(q.nom)} trace ${objet} rectangulaire sur ${s.plan}. Trois coins sont A, B et C. Où est le 4e coin ?`,
      `Sur ${s.plan}, A, B et C sont trois coins d'${objet} rectangulaire. Quelles sont les coordonnées du 4e coin ?`,
      `${cap(q.nom)} pose trois piquets en A, B et C pour ${objet} rectangulaire. Où planter le dernier ?`,
    ]);
    return {
      text,
      ...qCo(D.x, D.y, [[D.y, D.x], [D.x + 1, D.y], [D.x, D.y + 1], [D.x - 1, D.y]]),
      explanation: `Le 4e coin est sur la même verticale que son voisin (premier nombre ${D.x}) et sur la même horizontale que l'autre (deuxième nombre ${D.y}) : ${co(D.x, D.y)}.`,
      canvas: grille({ points: donnes.map((p, k) => ({ ...p, label: "ABC"[k] })) }),
    };
  }),

  // ★3 — Même verticale que A, même horizontale que B.
  T(PL, "g07", 3, "Même verticale : même premier nombre. Même horizontale : même deuxième nombre.", () => {
    const { s, q, L } = sit();
    const [A, B] = tirer(() => libres(2, [], 0), ([A, B]) => A.x !== B.x && A.y !== B.y && A.x !== B.y && A.y !== B.x);
    const [nA, nB] = lettres(2);
    const vA = Math.random() < 0.5;
    const R = vA ? { x: A.x, y: B.y } : { x: B.x, y: A.y };
    const Fx = vA ? { x: B.x, y: A.y } : { x: A.x, y: B.y };
    const lieu = L[0][0];
    const consigne = vA
      ? `sur la même verticale que ${nA} et sur la même horizontale que ${nB}`
      : `sur la même horizontale que ${nA} et sur la même verticale que ${nB}`;
    const text = un([
      `Sur ${s.plan}, ${q.nom} place ${lieu} ${consigne}. Quelles sont ${ses(lieu)} coordonnées ?`,
      `Où placer ${lieu}, ${consigne} ?`,
      `${cap(q.nom)} cherche ${lieu}, ${consigne}. Où est-ce ?`,
      `Sur ${s.plan}, ${lieu} ${est(lieu)} ${consigne}. Quelles coordonnées ?`,
    ]);
    return {
      text,
      ...qCo(R.x, R.y, [[Fx.x, Fx.y], [R.y, R.x], [R.x + 1, R.y], [R.x, R.y + 1]]),
      explanation: vA
        ? `Même verticale que ${nA} : premier nombre ${A.x}. Même horizontale que ${nB} : deuxième nombre ${B.y}. Réponse : ${co(R.x, R.y)}.`
        : `Même verticale que ${nB} : premier nombre ${B.x}. Même horizontale que ${nA} : deuxième nombre ${A.y}. Réponse : ${co(R.x, R.y)}.`,
      canvas: grille({ points: [{ ...A, label: nA }, { ...B, label: nB }] }),
    };
  }),

  // ★3 — Le milieu de deux points alignés.
  T(PL, "g08", 3, "Le milieu est à mi-chemin : compte les carreaux entre les deux points et prends la moitié.", () => {
    const { s, q, L } = sit();
    const h = Math.random() < 0.6;
    const m = h ? XMAX : YMAX;
    const [u1, u2] = tirer(() => [entre(1, m - 2), entre(3, m)], ([a_, b]) => b - a_ >= 2 && (b - a_) % 2 === 0);
    const k = entre(0, h ? YMAX : XMAX);
    const mid = (u1 + u2) / 2;
    const ecart = (u2 - u1) / 2;
    const A = h ? { x: u1, y: k } : { x: k, y: u1 };
    const B = h ? { x: u2, y: k } : { x: k, y: u2 };
    const R = h ? { x: mid, y: k } : { x: k, y: mid };
    const [nA, nB] = lettres(2);
    const lieu = L[0][0];
    const text = un([
      `Sur ${s.plan}, ${lieu} ${est(lieu)} juste au milieu de ${nA} et ${nB}. Quelles sont ${ses(lieu)} coordonnées ?`,
      `${cap(q.nom)} place ${lieu} à mi-chemin entre ${nA} et ${nB}. Quelles coordonnées choisit-${q.il} ?`,
      `Quel point est exactement au milieu de ${nA} et ${nB} ?`,
    ]);
    const faux: [number, number][] = h ? [[ecart, k], [k, mid], [mid + 1, k], [mid, k + 1]] : [[k, ecart], [mid, k], [k, mid + 1], [k + 1, mid]];
    return {
      text,
      ...qCo(R.x, R.y, faux),
      explanation: `De ${u1} à ${u2}, il y a ${pl(u2 - u1)} ; la moitié, c'est ${ecart}. Le milieu est à ${u1} + ${ecart} = ${mid} : ${co(R.x, R.y)}.`,
      canvas: grille({ points: [{ ...A, label: nA }, { ...B, label: nB }] }),
    };
  }),
];

/* ════════════════════ REPERAGE_DEPLACEMENT (★1-★3) ════════════════════ */

const D = "reperage_deplacement";
const deplacement: TutorBankItemV4[] = [
  // ★1 — Un seul mouvement.
  T(D, "g01", 1, "Droite ou gauche : le premier nombre change. Haut ou bas : le deuxième.", () => {
    const { s, q, L } = sit();
    const { p, pas } = tirer(
      () => ({ p: { x: entre(0, 6), y: entre(0, 5) }, pas: { d: un(["droite", "gauche", "haut", "bas"] as Dir[]), n: entre(1, 3) } }),
      ({ p, pas }) => resteDans(p, [pas]) && p.x !== p.y,
    );
    const r = applique(p, [pas]);
    const opp = applique(p, [{ d: OPP[pas.d], n: pas.n }]);
    const [dx, dy] = DX[pas.d];
    const axe = { x: p.x + dy * pas.n, y: p.y + dx * pas.n };
    const [P] = lettres(1);
    const lieu = L[0][0];
    const mv = bouge(pas.d, pas.n);
    const text = un([
      `${cap(q.nom)} part du point ${P} et ${mv}. Où arrive-t-${q.il} ?`,
      `Sur ${s.plan}, ${q.nom} est au point ${P}. ${cap(q.il)} ${mv}. Quelles sont ses nouvelles coordonnées ?`,
      `Depuis ${lieu} (point ${P}), ${q.nom} ${mv}. Où est-${q.il} maintenant ?`,
      `${cap(q.nom)} quitte ${lieu} (point ${P}) et ${mv}. À quelles coordonnées arrive-t-${q.il} ?`,
    ]);
    return {
      text,
      ...qCo(r.x, r.y, [[opp.x, opp.y], [axe.x, axe.y], [r.x + dx, r.y + dy], [p.x, p.y]]),
      explanation: `${P} est en ${co(p.x, p.y)}. ${cap(VERS[pas.d])}, ${dx ? "le premier" : "le deuxième"} nombre ${pas.d === "droite" || pas.d === "haut" ? "augmente" : "diminue"} de ${pas.n} : on arrive en ${co(r.x, r.y)}.`,
      canvas: grille({ points: [{ ...p, label: P }] }),
    };
  }),

  // ★1 — Quel déplacement de A à B ?
  T(D, "g02", 1, "Compte les carreaux entre les deux points, sans compter le point de départ.", () => {
    const { s, q, L } = sit();
    const { p, pas } = tirer(
      () => ({ p: { x: entre(0, 6), y: entre(0, 5) }, pas: { d: un(["droite", "gauche", "haut", "bas"] as Dir[]), n: entre(2, 4) } }),
      ({ p, pas }) => resteDans(p, [pas]),
    );
    const r = applique(p, [pas]);
    const [nA, nB] = lettres(2);
    const autreAxe: Dir = pas.d === "droite" || pas.d === "gauche" ? un(["haut", "bas"] as Dir[]) : un(["droite", "gauche"] as Dir[]);
    const text = un([
      `${cap(q.nom)} va ${de(L[0][0])} (point ${nA}) ${a(L[1][0])} (point ${nB}). Quel déplacement fait-${q.il} ?`,
      `Sur ${s.plan}, comment aller du point ${nA} au point ${nB} ?`,
      `Quel trajet mène ${de(L[0][0])}, en ${nA}, ${a(L[1][0])}, en ${nB} ?`,
      `${cap(q.nom)} est en ${nA} et doit aller en ${nB}. Que doit-${q.il} faire ?`,
    ]);
    return {
      text,
      ...choix(`${pl(pas.n)} ${VERS[pas.d]}`, [`${pl(pas.n)} ${VERS[OPP[pas.d]]}`, `${pl(pas.n + 1)} ${VERS[pas.d]}`, `${pl(pas.n)} ${VERS[autreAxe]}`]),
      explanation: `De ${co(p.x, p.y)} à ${co(r.x, r.y)}, on va ${VERS[pas.d]} de ${pl(pas.n)}.`,
      canvas: grille({ points: [{ ...p, label: nA }, { ...r, label: nB, color: "#f97316" }] }),
    };
  }),

  // ★2 — Deux mouvements.
  T(D, "g03", 2, "Fais les mouvements l'un après l'autre : droite/gauche change le premier nombre, haut/bas le deuxième.", () => {
    const { s, q, L } = sit();
    const { p, pas } = tirer(
      () => {
        const ps = [{ d: horiz(), n: entre(1, 3) }, { d: vert(), n: entre(1, 3) }];
        return { p: { x: entre(0, 6), y: entre(0, 5) }, pas: Math.random() < 0.6 ? ps : ps.reverse() };
      },
      ({ p, pas }) => resteDans(p, pas) && pas[0].n !== pas[1].n,
    );
    const r = applique(p, pas);
    const h = pas.find((s_) => s_.d === "droite" || s_.d === "gauche")!;
    const v = pas.find((s_) => s_.d === "haut" || s_.d === "bas")!;
    const sh = DX[h.d][0];
    const sv = DX[v.d][1];
    const [P] = lettres(1);
    const mv = `${bouge(pas[0].d, pas[0].n)}, puis ${bouge(pas[1].d, pas[1].n)}`;
    const text = un([
      `${cap(q.nom)} part du point ${P}. ${cap(q.il)} ${mv}. Où arrive-t-${q.il} ?`,
      `Sur ${s.plan}, ${q.nom} quitte ${L[0][0]} (point ${P}). ${cap(q.il)} ${mv}. Où est-${q.il} ?`,
      `Depuis le point ${P}, ${q.nom} ${mv}. Quelles sont ses coordonnées d'arrivée ?`,
    ]);
    return {
      text,
      ...qCo(r.x, r.y, [
        [p.x - sh * h.n, p.y + sv * v.n],
        [p.x + sh * h.n, p.y - sv * v.n],
        [p.x + sh * v.n, p.y + sv * h.n],
        [r.y, r.x],
      ]),
      explanation: `Départ ${co(p.x, p.y)}. ${cap(VERS[h.d])} de ${h.n} : premier nombre ${p.x + sh * h.n}. ${cap(VERS[v.d])} de ${v.n} : deuxième nombre ${p.y + sv * v.n}. Arrivée ${co(r.x, r.y)}.`,
      canvas: grille({ points: [{ ...p, label: P }] }),
    };
  }),

  // ★2 — Lire un chemin dessiné.
  T(D, "g04", 2, "Suis le chemin flèche après flèche et compte les carreaux de chaque morceau.", () => {
    const { s, q } = sit();
    const { p, pas } = tirer(
      () => {
        const ps = [{ d: horiz(), n: entre(1, 4) }, { d: vert(), n: entre(1, 3) }];
        return { p: { x: entre(0, 6), y: entre(0, 5) }, pas: Math.random() < 0.5 ? ps : ps.reverse() };
      },
      ({ p, pas }) => resteDans(p, pas) && pas[0].n !== pas[1].n,
    );
    const [P] = lettres(1);
    const juste = decrit(pas);
    const text = un([
      `${cap(q.nom)} a suivi le chemin dessiné depuis le point ${P}. Quel trajet a-t-${q.il} fait ?`,
      `Sur ${s.plan}, le chemin part du point ${P}. Quel trajet décrit-il ?`,
      `Quel trajet ${q.nom} a-t-${q.il} fait depuis ${P} ? Regarde le chemin.`,
    ]);
    return {
      text,
      ...choix(juste, [
        decrit([{ d: pas[0].d, n: pas[1].n }, { d: pas[1].d, n: pas[0].n }]),
        decrit([{ d: OPP[pas[0].d], n: pas[0].n }, pas[1]]),
        decrit([pas[0], { d: OPP[pas[1].d], n: pas[1].n }]),
        decrit([{ d: pas[0].d, n: pas[0].n + 1 }, pas[1]]),
      ]),
      explanation: `Le chemin fait d'abord ${pl(pas[0].n)} ${VERS[pas[0].d]}, puis ${pl(pas[1].n)} ${VERS[pas[1].d]}.`,
      canvas: grille({ path: { start: { ...p, label: P, color: "#ef4444" }, steps: pas.map((s_) => ({ direction: s_.d, count: s_.n })) } }),
    };
  }),

  // ★2 — Un code de flèches.
  T(D, "g05", 2, "→ : +1 au premier nombre ; ← : −1 ; ↑ : +1 au deuxième ; ↓ : −1.", () => {
    const { s, q, L } = sit();
    const { p, pas } = tirer(
      () => {
        const ps = [{ d: horiz(), n: entre(1, 3) }, { d: vert(), n: entre(1, 3) }];
        return { p: { x: entre(0, 6), y: entre(0, 5) }, pas: Math.random() < 0.5 ? ps : ps.reverse() };
      },
      ({ p, pas }) => resteDans(p, pas) && pas[0].n + pas[1].n >= 3 && pas[0].n !== pas[1].n,
    );
    const r = applique(p, pas);
    const h = pas.find((s_) => s_.d === "droite" || s_.d === "gauche")!;
    const v = pas.find((s_) => s_.d === "haut" || s_.d === "bas")!;
    const sh = DX[h.d][0];
    const sv = DX[v.d][1];
    const [P] = lettres(1);
    const cd = code(pas);
    const text = un([
      `${cap(q.nom)} part du point ${P} et suit le code ${cd}. Où arrive-t-${q.il} ?`,
      `Sur ${s.plan}, depuis ${L[0][0]} (point ${P}), on suit le code ${cd}. Où arrive-t-on ?`,
      `Code : ${cd}. ${cap(q.nom)} part de ${P}. Quelles sont ses coordonnées à la fin ?`,
    ]);
    return {
      text,
      ...qCo(r.x, r.y, [
        [p.x - sh * h.n, p.y + sv * v.n],
        [p.x + sh * h.n, p.y - sv * v.n],
        [p.x + sh * v.n, p.y + sv * h.n],
        [r.y, r.x],
      ]),
      explanation: `${h.n} flèche${h.n > 1 ? "s" : ""} ${FL[h.d]} et ${v.n} flèche${v.n > 1 ? "s" : ""} ${FL[v.d]} : depuis ${co(p.x, p.y)}, on arrive en ${co(r.x, r.y)}.`,
      canvas: grille({ points: [{ ...p, label: P }] }),
    };
  }),

  // ★3 — Retrouver le départ.
  T(D, "g06", 3, "Pour retrouver le départ, on refait le trajet à l'envers : droite devient gauche, haut devient bas.", () => {
    const { s, q } = sit();
    const { p, pas } = tirer(
      () => ({ p: { x: entre(0, 6), y: entre(0, 5) }, pas: [{ d: horiz(), n: entre(1, 3) }, { d: vert(), n: entre(1, 3) }] }),
      ({ p, pas }) => resteDans(p, pas) && pas[0].n !== pas[1].n,
    );
    const r = applique(p, pas);
    const av = applique(r, pas);
    const [P] = lettres(1);
    const mv = `${bouge(pas[0].d, pas[0].n)}, puis ${bouge(pas[1].d, pas[1].n)}`;
    const text = un([
      `${cap(q.nom)} ${mv}. ${cap(q.il)} arrive au point ${P}. D'où est-${q.il} parti${q.e} ?`,
      `Sur ${s.plan}, ${q.nom} ${mv} et arrive en ${P}. Quel était son point de départ ?`,
      `${cap(q.nom)} ${mv}, et arrive en ${P}. Où était-${q.il} au départ ?`,
    ]);
    return {
      text,
      ...qCo(p.x, p.y, [
        [av.x, av.y],
        [p.x + 2 * DX[pas[0].d][0] * pas[0].n, p.y],
        [p.x, p.y + 2 * DX[pas[1].d][1] * pas[1].n],
        [p.y, p.x],
      ]),
      explanation: `On repart de ${P} ${co(r.x, r.y)} et on fait tout à l'envers : ${pl(pas[0].n)} ${VERS[OPP[pas[0].d]]}, ${pl(pas[1].n)} ${VERS[OPP[pas[1].d]]}. Départ : ${co(p.x, p.y)}.`,
      canvas: grille({ points: [{ ...r, label: P, color: "#f97316" }] }),
    };
  }),

  // ★3 — Combien de carreaux parcourus en tout ?
  T(D, "g07", 3, "On additionne les carreaux de chaque morceau du chemin, même quand on revient en arrière.", () => {
    const { s, q } = sit();
    const { p, pas } = tirer(
      () => {
        const h = horiz();
        const a_ = entre(2, 4);
        const c = entre(1, a_ - 1);
        const v = { d: vert(), n: entre(1, 3) };
        return { p: { x: entre(0, 6), y: entre(0, 5) }, pas: [{ d: h, n: a_ }, v, { d: OPP[h], n: c }] };
      },
      ({ p, pas }) => resteDans(p, pas),
    );
    const total = pas.reduce((t, s_) => t + s_.n, 0);
    const net = Math.abs(pas[0].n - pas[2].n) + pas[1].n;
    const [P] = lettres(1);
    const text = un([
      `${cap(q.nom)} suit le chemin dessiné depuis le point ${P}. Combien de carreaux parcourt-${q.il} en tout ?`,
      `Sur ${s.plan}, le chemin part du point ${P}. Quelle longueur, en carreaux, fait-il en tout ?`,
      `${cap(q.nom)} fait tout ce chemin depuis ${P}. Combien de carreaux a-t-${q.il} parcourus ?`,
    ]);
    return {
      text,
      ...choix(pl(total), [pl(net), pl(total + 1), pl(pas[0].n + pas[1].n), pl(total + 3)]),
      explanation: `${pas.map((s_) => s_.n).join(" + ")} = ${total} : ${pl(total)} parcourus (même le retour en arrière compte).`,
      canvas: grille({ path: { start: { ...p, label: P, color: "#ef4444" }, steps: pas.map((s_) => ({ direction: s_.d, count: s_.n })) } }),
    };
  }),

  // ★3 — Quel code mène de A à B ?
  T(D, "g08", 3, "Compte d'abord les carreaux vers la droite ou la gauche, puis vers le haut ou le bas.", () => {
    const { s, q, L } = sit();
    const [A, B] = tirer(() => libres(2, [], 0), ([A, B]) => A.x !== B.x && A.y !== B.y && Math.abs(B.x - A.x) <= 3 && Math.abs(B.y - A.y) <= 3);
    const h: Pas = { d: B.x > A.x ? "droite" : "gauche", n: Math.abs(B.x - A.x) };
    const v: Pas = { d: B.y > A.y ? "haut" : "bas", n: Math.abs(B.y - A.y) };
    const [nA, nB] = lettres(2);
    const text = un([
      `Quel code mène ${q.nom} du point ${nA} au point ${nB} ?`,
      `${cap(q.nom)} veut aller ${de(L[0][0])} (point ${nA}) ${a(L[1][0])} (point ${nB}). Quel code suivre ?`,
      `Sur ${s.plan}, quel code fait passer de ${nA} à ${nB} ?`,
    ]);
    return {
      text,
      ...choix(code([h, v]), [
        code([{ d: OPP[h.d], n: h.n }, v]),
        code([h, { d: OPP[v.d], n: v.n }]),
        h.n !== v.n ? code([{ d: h.d, n: v.n }, { d: v.d, n: h.n }]) : code([{ d: h.d, n: h.n + 1 }, v]),
        code([{ d: h.d, n: h.n + 1 }, v]),
        code([h, { d: v.d, n: v.n + 1 }]),
      ]),
      explanation: `De ${co(A.x, A.y)} à ${co(B.x, B.y)} : ${pl(h.n)} ${VERS[h.d]} et ${pl(v.n)} ${VERS[v.d]}, soit ${code([h, v])}.`,
      canvas: grille({ points: [{ ...A, label: nA }, { ...B, label: nB, color: "#f97316" }] }),
    };
  }),
];

/* ════════════════════ REPERAGE_DEFI (★3-★4) ════════════════════ */

const F = "reperage_defi";
const defi: TutorBankItemV4[] = [
  // ★3 — Bataille navale : la 3e case du bateau.
  T(F, "g01", 3, "Un bateau est en ligne droite : la 3e case prolonge les deux cases touchées.", () => {
    const e = prenom();
    const { t1, t2, eau, rep, faux } = tirer(
      () => {
        const hzt = Math.random() < 0.5;
        const r0 = hzt ? entre(1, 5) : entre(1, 3);
        const c0 = hzt ? entre(0, 3) : entre(0, 5);
        const cases = [0, 1, 2].map((k) => (hzt ? { c: c0 + k, r: r0 } : { c: c0, r: r0 + k }));
        const debut = Math.random() < 0.5;
        const touches = debut ? [cases[0], cases[1]] : [cases[1], cases[2]];
        const rep = debut ? cases[2] : cases[0];
        const eauC = debut ? (hzt ? { c: c0 - 1, r: r0 } : { c: c0, r: r0 - 1 }) : hzt ? { c: c0 + 3, r: r0 } : { c: c0, r: r0 + 3 };
        const K = (x: Case) => nc(x.c, x.r);
        const pris = [...touches, rep].map(K);
        const faux = [
          okC(eauC.c, eauC.r, 6, 5) ? K(eauC) : null,
          inverseC(rep.c, rep.r, 6, 5),
          ...melange(touches.flatMap((t) => (hzt ? [{ c: t.c, r: t.r + 1 }, { c: t.c, r: t.r - 1 }] : [{ c: t.c + 1, r: t.r }, { c: t.c - 1, r: t.r }])).filter((x) => okC(x.c, x.r, 6, 5)).map(K)),
        ].filter((k): k is string => !!k && !pris.includes(k));
        return { t1: K(touches[0]), t2: K(touches[1]), eau: okC(eauC.c, eauC.r, 6, 5) ? K(eauC) : "", rep: K(rep), faux };
      },
      (x) => !!x.eau && new Set(x.faux).size >= 3,
    );
    const marques: Record<string, string> = { [t1]: "💥", [t2]: "💥", [eau]: "💧" };
    const text = un([
      `Bataille navale : ${e.nom} a touché ${t1} et ${t2}. En ${eau}, c'était dans l'eau. Le bateau fait 3 cases. Où est la 3e ?`,
      `${e.nom} a touché un bateau de 3 cases en ${t1} et ${t2}, et raté en ${eau}. Quelle case doit-${e.il} viser ?`,
      `Sur la grille, ${t1} et ${t2} sont touchées, ${eau} est dans l'eau. Où est la dernière case de ce bateau de 3 cases ?`,
      `Le bateau caché fait 3 cases en ligne. ${e.nom} a touché ${t1} et ${t2} ; ${eau} était dans l'eau. Quelle case viser ?`,
    ]);
    return {
      text,
      ...choix(rep, faux),
      explanation: `${t1} et ${t2} sont côte à côte : le bateau continue dans le même sens. ${eau} est dans l'eau, donc la 3e case est de l'autre côté : ${rep}.`,
      canvas: damier(6, 5, marques, "💥 touché · 💧 dans l'eau"),
    };
  }),

  // ★3 — Le plus court chemin en suivant les lignes.
  T(F, "g02", 3, "En suivant les lignes, on additionne les carreaux à l'horizontale et à la verticale.", () => {
    const { s, q, L } = sit();
    const [A, B] = tirer(() => libres(2, [], 0), ([A, B]) => A.x !== B.x && A.y !== B.y && Math.abs(A.x - B.x) !== Math.abs(A.y - B.y));
    const dx = Math.abs(A.x - B.x);
    const dy = Math.abs(A.y - B.y);
    const t = dx + dy;
    const [nA, nB] = lettres(2);
    const text = un([
      `${cap(q.nom)} va ${de(L[0][0])} (point ${nA}) ${a(L[1][0])} (point ${nB}) en suivant les lignes. Combien de carreaux au minimum ?`,
      `Sur ${s.plan}, en suivant les lignes du quadrillage, combien de carreaux faut-il au moins pour aller de ${nA} à ${nB} ?`,
      `Quel est le plus court trajet, en carreaux, ${de(L[0][0])} (${nA}) ${a(L[1][0])} (${nB}), sans couper les cases ?`,
    ]);
    return {
      text,
      ...choix(pl(t), [pl(t + 1), pl(dx), pl(dy), pl(t + 2), pl(dx * dy)]),
      explanation: `${pl(dx)} à l'horizontale + ${pl(dy)} à la verticale = ${pl(t)}.`,
      canvas: grille({ points: [{ ...A, label: nA }, { ...B, label: nB, color: "#f97316" }] }),
    };
  }),

  // ★3 — Le trésor décrit à partir d'un repère.
  T(F, "g03", 3, "Pars du repère, pas de 0 : ajoute ou enlève les carreaux à ses coordonnées.", () => {
    const { s, q, L } = sit();
    const { p, pas } = tirer(
      () => ({ p: { x: entre(0, 6), y: entre(0, 5) }, pas: [{ d: horiz(), n: entre(1, 3) }, { d: vert(), n: entre(1, 3) }] }),
      ({ p, pas }) => resteDans(p, pas) && pas[0].n !== pas[1].n && !(p.x === 0 && p.y === 0),
    );
    const r = applique(p, pas);
    const [P] = lettres(1);
    const [rep, cible] = [L[0][0], L[1][0]];
    const H = pas[0].d === "droite" ? "à droite" : "à gauche";
    const V = pas[1].d === "haut" ? "au-dessus" : "en dessous";
    const text = un([
      `Sur ${s.plan}, ${cible} ${est(cible)} à ${pl(pas[0].n)} ${H} et ${pl(pas[1].n)} ${V} ${de(rep)} (point ${P}). Quelles sont ${ses(cible)} coordonnées ?`,
      `${cap(q.nom)} cherche ${cible} : ${pl(pas[0].n)} ${H} ${de(rep)} (point ${P}), puis ${pl(pas[1].n)} ${V}. Où est-ce ?`,
      `Indice : « ${cap(cible)} ${est(cible)} ${pl(pas[0].n)} ${H} et ${pl(pas[1].n)} ${V} du point ${P}. » Quelles coordonnées ?`,
    ]);
    const sh = DX[pas[0].d][0];
    const sv = DX[pas[1].d][1];
    return {
      text,
      ...qCo(r.x, r.y, [
        [pas[0].n, pas[1].n],
        [r.y, r.x],
        [p.x - sh * pas[0].n, r.y],
        [r.x, p.y - sv * pas[1].n],
        [p.x + sh * pas[1].n, p.y + sv * pas[0].n],
      ]),
      explanation: `${P} est en ${co(p.x, p.y)}. ${cap(H)} de ${pas[0].n} : ${r.x}. ${cap(V)} de ${pas[1].n} : ${r.y}. ${cap(cible)} : ${co(r.x, r.y)}.`,
      canvas: grille({ points: [{ ...p, label: P }] }),
    };
  }),

  // ★4 — Retrouver le départ après trois mouvements.
  T(F, "g04", 4, "Refais tout le trajet à l'envers, en partant de l'arrivée.", () => {
    const { s, q } = sit();
    const { p, pas } = tirer(
      () => {
        const h = horiz();
        return {
          p: { x: entre(0, 6), y: entre(0, 5) },
          pas: melange([{ d: h, n: entre(1, 4) }, { d: vert(), n: entre(1, 3) }, { d: Math.random() < 0.5 ? h : OPP[h], n: entre(1, 2) }]),
        };
      },
      ({ p, pas }) => resteDans(p, pas) && (applique(p, pas).x !== p.x || applique(p, pas).y !== p.y),
    );
    const r = applique(p, pas);
    const av = applique(r, pas);
    const [P] = lettres(1);
    const mv = pas.map((s_) => bouge(s_.d, s_.n)).join(", puis ");
    const text = un([
      `${cap(q.nom)} ${mv}. ${cap(q.il)} arrive au point ${P}. D'où est-${q.il} parti${q.e} ?`,
      `Sur ${s.plan}, ${q.nom} ${mv} et finit au point ${P}. Où était son départ ?`,
      `Arrivée : le point ${P}. Trajet ${de(q.nom)} : ${q.il} ${mv}. Quel était le point de départ ?`,
    ]);
    return {
      text,
      ...qCo(p.x, p.y, [[av.x, av.y], [p.y, p.x], [p.x + 1, p.y], [p.x, p.y + 1], [p.x - 1, p.y]]),
      explanation: `On part de ${P} ${co(r.x, r.y)} et on défait chaque mouvement (droite ↔ gauche, haut ↔ bas) : départ ${co(p.x, p.y)}.`,
      canvas: grille({ points: [{ ...r, label: P, color: "#f97316" }] }),
    };
  }),

  // ★4 — Le point le plus proche en suivant les lignes.
  T(F, "g05", 4, "Pour chaque point, additionne les carreaux à l'horizontale et à la verticale, puis compare.", () => {
    const { s, q, L } = sit();
    const dist = (u: P, v: P) => Math.abs(u.x - v.x) + Math.abs(u.y - v.y);
    const pts = tirer(
      () => libres(4, [], 0),
      ([X, ...c]) => {
        const d = c.map((p) => dist(X, p));
        const best = Math.min(...d);
        const hx = c.map((p) => Math.abs(p.x - X.x));
        const i = d.indexOf(best);
        return d.filter((v) => v === best).length === 1 && hx.indexOf(Math.min(...hx)) !== i && best >= 2;
      },
    );
    const [X, ...c] = pts;
    const d = c.map((p) => dist(X, p));
    const i = d.indexOf(Math.min(...d));
    const noms = lettres(4);
    const text = un([
      `${cap(q.nom)} est ${a(L[0][0])} (point ${noms[0]}). En suivant les lignes, quel point est le plus proche ?`,
      `Sur ${s.plan}, depuis le point ${noms[0]}, quel point atteint-on en le moins de carreaux, en suivant les lignes ?`,
      `${cap(q.nom)} part de ${noms[0]} et suit les lignes du quadrillage. Quel point est le plus près ?`,
    ]);
    return {
      text,
      ...choix(`le point ${noms[i + 1]}`, noms.slice(1).map((n) => `le point ${n}`)),
      explanation: `Carreaux depuis ${noms[0]} : ${c.map((_, k) => `${noms[k + 1]} → ${d[k]}`).join(", ")}. Le plus proche est ${noms[i + 1]}.`,
      canvas: grille({ points: [{ ...X, label: noms[0], color: "#f97316" }, ...c.map((p, k) => ({ ...p, label: noms[k + 1] }))] }),
    };
  }),

  // ★4 — Un long code de flèches.
  T(F, "g06", 4, "Compte les → et les ← (ils s'annulent), puis les ↑ et les ↓.", () => {
    const { s, q, L } = sit();
    const { p, pas } = tirer(
      () => {
        const n = entre(5, 7);
        const ds = Array.from({ length: n }, () => un(["droite", "gauche", "haut", "bas", "droite", "haut"] as Dir[]));
        return { p: { x: entre(0, 6), y: entre(0, 5) }, pas: ds.map((d) => ({ d, n: 1 })) };
      },
      ({ p, pas }) =>
        resteDans(p, pas) && pas.some((s_) => s_.d === "gauche" || s_.d === "bas") && pas.some((s_) => s_.d === "droite") && pas.some((s_) => s_.d === "haut"),
    );
    const r = applique(p, pas);
    const nb = (d: Dir) => pas.filter((s_) => s_.d === d).length;
    const sansRetour = { x: p.x + nb("droite") + nb("gauche"), y: p.y + nb("haut") + nb("bas") };
    const [P] = lettres(1);
    const cd = code(pas);
    const text = un([
      `${cap(q.nom)} part du point ${P} et suit le code ${cd}. Où arrive-t-${q.il} ?`,
      `Sur ${s.plan}, depuis ${L[0][0]} (point ${P}), on suit le code ${cd}. Quelles coordonnées à l'arrivée ?`,
      `Code secret : ${cd}. ${cap(q.nom)} part de ${P}. Où finit-${q.il} ?`,
    ]);
    return {
      text,
      ...qCo(r.x, r.y, [[sansRetour.x, sansRetour.y], [r.y, r.x], [r.x + 1, r.y], [r.x, r.y + 1], [r.x - 1, r.y]]),
      explanation: `${nb("droite")} → et ${nb("gauche")} ← : premier nombre ${p.x} + ${nb("droite")} − ${nb("gauche")} = ${r.x}. ${nb("haut")} ↑ et ${nb("bas")} ↓ : deuxième nombre ${p.y} + ${nb("haut")} − ${nb("bas")} = ${r.y}.`,
      canvas: grille({ points: [{ ...p, label: P }] }),
    };
  }),

  // ★4 — Se déplacer sur des CASES numérotées de haut en bas.
  T(F, "g07", 4, "Sur ce plan, les lignes sont numérotées de haut en bas : descendre fait AUGMENTER le nombre.", () => {
    const { s, q, L } = sit();
    const { c, r, h, v } = tirer(
      () => ({ c: entre(0, 5), r: entre(1, 5), h: { d: horiz(), n: entre(1, 3) }, v: { d: vert(), n: entre(1, 3) } }),
      ({ c, r, h, v }) => {
        const c2 = c + DX[h.d][0] * h.n;
        const r2 = r - DX[v.d][1] * v.n;
        const rInv = r + DX[v.d][1] * v.n;
        return okC(c2, r2, 6, 5) && okC(c2, rInv, 6, 5) && h.n !== v.n;
      },
    );
    const c2 = c + DX[h.d][0] * h.n;
    const r2 = r - DX[v.d][1] * v.n;
    const rInv = r + DX[v.d][1] * v.n;
    const cInv = c - DX[h.d][0] * h.n;
    const K = nc(c, r);
    const vv = v.d === "haut" ? "vers le haut" : "vers le bas";
    const hh = h.d === "droite" ? "vers la droite" : "vers la gauche";
    const lieu = L[0][0];
    const text = un([
      `${cap(q.nom)} part ${de(lieu)}, case ${K}. ${cap(q.il)} va ${plC(h.n)} ${hh}, puis ${plC(v.n)} ${vv}. Dans quelle case arrive-t-${q.il} ?`,
      `Sur ${s.plan}, depuis la case ${K}, on va ${plC(h.n)} ${hh} et ${plC(v.n)} ${vv}. Quelle case ?`,
      `Depuis ${lieu} (${K}), ${q.nom} se déplace de ${plC(h.n)} ${hh}, puis de ${plC(v.n)} ${vv}. Où est-${q.il} ?`,
    ]);
    return {
      text,
      ...choix(nc(c2, r2), [
        nc(c2, rInv),
        okC(cInv, r2, 6, 5) ? nc(cInv, r2) : null,
        okC(c + DX[h.d][0] * v.n, r - DX[v.d][1] * h.n, 6, 5) ? nc(c + DX[h.d][0] * v.n, r - DX[v.d][1] * h.n) : null,
        inverseC(c2, r2, 6, 5),
      ], voisinesC(c2, r2, 6, 5)),
      explanation: `${cap(hh)} de ${h.n} : colonne ${COLS[c2]}. ${cap(vv)} de ${v.n} : sur ce plan, la ligne ${v.d === "bas" ? "augmente" : "diminue"} (${r} → ${r2}). Arrivée : ${nc(c2, r2)}.`,
      canvas: damier(6, 5, { [K]: L[0][1] }, `${L[0][1]} ${lieu}`),
    };
  }),
];

export const reperageGabarits: TutorBankItemV4[] = [...quadrillage, ...coordonnees, ...placer, ...deplacement, ...defi];
