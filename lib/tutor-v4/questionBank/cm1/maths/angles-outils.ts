// COMPARER DES ANGLES AU CM1 (14/11/2026) — micro `angle_comparer`.
//
// Avant : 17 squelettes, 10 à 16 répétitions sur 20 (des degrés écrits, deux questions
// ouvertes, un oui/non). ⛔ Programme du CM1 : on compare SANS mesurer, à l'œil, au
// gabarit (calque), à l'équerre ou au coin d'une feuille. Aucun nombre de degrés n'est
// écrit, ni dans l'énoncé ni sur la figure (les « deg » du canvas ne s'affichent pas).
//
// Pièges = vraies erreurs d'élève : l'angle aux côtés les plus longs serait le plus
// grand ; l'angle « penché » serait le plus petit ; 10 h « plus grand » que 2 h sur
// l'horloge ; découper la pizza en plus de parts agrandirait chaque part.
// ★2 : phrase courte, une étape. ★3 : situation, élève qui se trompe, contrainte.

import type { CanvasFigure, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { atelier, cap, entre, etapes, melange, qcm, un } from "./trous-outils";

const g = atelier("cm1", "angle", "angle_comparer", "cm1_");

const NOMS = ["A", "B", "C", "D", "E", "F", "K", "M", "P", "R", "S", "T"];
const deuxNoms = () => melange(NOMS).slice(0, 2);
const troisNoms = () => melange(NOMS).slice(0, 3);

/** Apostrophes typographiques partout. */
const t = (s: string) => s.replace(/'/g, "’");
function fin(text: string, q: ReturnType<typeof qcm>, explanation: string, canvas?: CanvasFigure): Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure } {
  return {
    text: t(text),
    ...q,
    choices: q.choices?.map(t),
    expected: q.expected?.map((e) => t(String(e))),
    explanation: t(explanation),
    ...(canvas ? { canvas } : {}),
  };
}

/** Des ouvertures bien séparées (au moins 25° d'écart) : on les voit à l'œil. */
function ouvertures(n: number, min = 25, max = 155): number[] {
  const pas = [25, 35, 45, 55, 65, 75, 105, 115, 125, 135, 145, 155].filter((d) => d >= min && d <= max);
  for (;;) {
    const l = melange(pas).slice(0, n);
    if (l.every((a, i) => l.every((b, j) => i === j || Math.abs(a - b) >= 25))) return l;
  }
}

type Angle = { deg: number; nom?: string; rotation?: number; longueur?: number };
const dessin = (angles: Angle[]): CanvasFigure =>
  ({
    kind: "deux_angles",
    mode: "cote_a_cote",
    angles: angles.map((a) => ({ deg: a.deg, nom: a.nom, rotation: a.rotation ?? un([0, 10, 350]), longueur: a.longueur ?? entre(70, 90) })),
  }) as CanvasFigure;

/** Un angle seul, sans mesure ni codage : c'est à l'élève de le comparer à l'angle droit. */
const seul = (deg: number): CanvasFigure =>
  ({
    kind: "angle",
    angle: {
      angleDeg: deg,
      labels: { vertex: "", left: "", right: "", angle: "" },
      display: { showLabels: false, showMeasure: false, showArc: true, showRightAngle: false, placeholder: "" },
    },
  }) as CanvasFigure;

/* ─────────── Situations : deux ou trois objets qui forment un angle ─────────── */

type Situ = { o: string; qui: string[] };
const SITU: Situ[] = [
  { o: "paires de ciseaux ouvertes", qui: ["Une coiffeuse", "Un couturier", "Une fleuriste"] },
  { o: "portes entrouvertes", qui: ["Un menuisier", "Une gardienne", "Un architecte"] },
  { o: "parts de pizza", qui: ["Un pizzaiolo", "Une cuisinière", "Un serveur"] },
  { o: "toits de maisons", qui: ["Une charpentière", "Un couvreur", "Une architecte"] },
  { o: "bras de robot pliés", qui: ["Une ingénieure", "Un programmeur", "Une technicienne"] },
  { o: "compas ouverts", qui: ["Une élève", "Un dessinateur", "Une géomètre"] },
  { o: "éventails ouverts", qui: ["Une danseuse", "Un vendeur", "Une costumière"] },
  { o: "livres ouverts", qui: ["Une bibliothécaire", "Un libraire", "Une maîtresse"] },
  { o: "écrans d'ordinateur portable", qui: ["Un informaticien", "Une journaliste", "Un réparateur"] },
  { o: "pinces de crabe", qui: ["Une biologiste marine", "Un pêcheur", "Une soigneuse d'aquarium"] },
  { o: "bras de grue", qui: ["Un grutier", "Une cheffe de chantier", "Un ingénieur"] },
  { o: "becs d'oiseaux ouverts", qui: ["Une ornithologue", "Un photographe", "Une vétérinaire"] },
  { o: "chaises longues dépliées", qui: ["Un maître-nageur", "Une vendeuse", "Un vacancier"] },
  { o: "escabeaux ouverts", qui: ["Un peintre", "Une électricienne", "Un plombier"] },
  { o: "parts de gâteau", qui: ["Un pâtissier", "Une boulangère", "Un traiteur"] },
  { o: "voiles de bateau", qui: ["Une navigatrice", "Un moniteur de voile", "Une skippeuse"] },
  { o: "routes qui se croisent", qui: ["Une cartographe", "Un chauffeur de bus", "Une urbaniste"] },
  { o: "lampes de bureau pliées", qui: ["Un étudiant", "Une dessinatrice", "Un horloger"] },
  { o: "pinces à linge ouvertes", qui: ["Une maman", "Un papa", "Une grand-mère"] },
  { o: "tentes vues de face", qui: ["Une campeuse", "Un scout", "Une animatrice"] },
  { o: "parts de tarte", qui: ["Une pâtissière", "Un cuisinier", "Une cantinière"] },
  { o: "toits de cases créoles à La Réunion", qui: ["Un charpentier", "Une architecte"] },
];
const DEUX: Record<number, string> = { 2: "deux", 3: "trois" };
const VERBE = ["regarde", "compare", "dessine", "observe", "photographie"];
const intro = (n: number) => {
  const s = un(SITU);
  return `${un(s.qui)} ${un(VERBE)} ${DEUX[n]} ${s.o}.`;
};

const OUVERT = "un angle se compare à son ouverture : l'écart entre ses deux côtés.";
const PAS_LONGUEUR = "la longueur des côtés ne compte pas, ni la façon dont l'angle est tourné.";

/* ═════════════════════════════ ★2 ═════════════════════════════ */

/** Deux angles : lequel est le plus grand (le plus petit) ? Une fois sur deux, le plus petit a les côtés les plus longs. */
const c1 = g(11, 2, "Regarde l'écart entre les deux côtés, pas leur longueur.", () => {
  const [x, y] = deuxNoms();
  const [a, b] = ouvertures(2);
  const piege = Math.random() < 0.5;
  const grand = a > b ? x : y;
  const petit = a > b ? y : x;
  const lg = (d: number) => (piege ? (d === Math.min(a, b) ? 100 : 48) : entre(70, 90));
  const cherche = un(["grand", "petit", "ouvert", "fermé"]);
  const r = cherche === "grand" || cherche === "ouvert" ? grand : petit;
  const qst = un([`Quel angle est le plus ${cherche} ?`, `Lequel est le plus ${cherche} ?`, `Quel est l'angle le plus ${cherche} ?`, `Choisis l'angle le plus ${cherche}.`]);
  const avant = un(["", "", "Regarde bien les deux angles.", "Sans mesurer.", "Attention aux côtés.", intro(2)]);
  return fin(
    `${avant} ${qst}`.trim(),
    qcm(`L'angle ${r}`, [`L'angle ${r === x ? y : x}`, "Ils sont égaux"]),
    etapes(OUVERT, piege ? `l'angle ${petit} a des côtés plus longs, mais ses côtés sont moins écartés. ${PAS_LONGUEUR}` : `les côtés de l'angle ${grand} sont plus écartés que ceux de l'angle ${petit}.`, `l'angle le plus ${cherche} est l'angle ${r}.`),
    dessin([{ deg: a, nom: x, longueur: lg(a) }, { deg: b, nom: y, longueur: lg(b) }]),
  );
});

/** Un angle seul, comparé à l'angle droit avec l'équerre ou le coin d'une feuille. */
const OBJETS_SEULS = ["le coin d'un cadre photo", "la pointe d'une part de pizza", "le haut d'un toit", "une porte entrouverte", "le bras plié d'un robot", "une paire de ciseaux ouverte", "le coin d'une table", "la pointe d'une voile", "le dossier d'une chaise longue", "l'ouverture d'un compas", "un livre ouvert", "le croisement de deux routes", "le bec ouvert d'un oiseau", "un escabeau ouvert", "la pointe d'une flèche", "l'écran d'un ordinateur portable"];
const OUTIL = ["son équerre", "le coin d'une feuille", "un gabarit d'angle droit", "le coin de son cahier"];
const c2 = g(12, 2, "Pose l'équerre : un côté sur un côté, puis regarde l'autre côté.", () => {
  const d = un([90, 90, 30, 40, 55, 65, 115, 125, 140, 155]);
  const j = d === 90 ? "Égal à un angle droit" : d < 90 ? "Plus petit qu'un angle droit" : "Plus grand qu'un angle droit";
  const qui = un(["Une maçonne", "Un menuisier", "Une élève", "Un carreleur", "Une couturière", "Un charpentier", "Une architecte", "Un élève", "Une jardinière", "Un dessinateur"]);
  const qst = un(["Comment est cet angle ?", "Que trouve-t-on ?", "Comment est cet angle par rapport à l'angle droit ?", "Que peut-on dire de cet angle ?"]);
  return fin(
    `${qui} pose ${un(OUTIL)} sur ${un(OBJETS_SEULS)}. ${qst}`,
    qcm(j, ["Égal à un angle droit", "Plus petit qu'un angle droit", "Plus grand qu'un angle droit"]),
    etapes("on pose le coin de l'équerre sur le sommet, un côté de l'équerre sur un côté de l'angle.", d === 90 ? "l'autre côté de l'angle est pile sur l'autre côté de l'équerre." : d < 90 ? "l'autre côté de l'angle reste à l'intérieur de l'équerre : l'angle est moins ouvert." : "l'autre côté de l'angle sort de l'équerre : l'angle est plus ouvert.", `l'angle est ${j.toLowerCase()}.`),
    seul(d),
  );
});

/** Trois angles : le plus grand ou le plus petit. Le plus grand est parfois « penché ». */
const c3 = g(13, 2, "Un angle tourné ou penché n'est pas plus petit : regarde seulement l'écart.", () => {
  const n = troisNoms();
  const degs = ouvertures(3);
  const iMax = degs.indexOf(Math.max(...degs));
  const iMin = degs.indexOf(Math.min(...degs));
  const plusGrand = Math.random() < 0.5;
  const k = plusGrand ? iMax : iMin;
  const qst = plusGrand
    ? un(["Quel angle est le plus grand ?", "Lequel est le plus ouvert ?", "Quel est l'angle le plus grand ?", "Lequel a l'ouverture la plus grande ?"])
    : un(["Quel angle est le plus petit ?", "Lequel est le moins ouvert ?", "Quel est l'angle le plus petit ?", "Lequel a l'ouverture la plus petite ?"]);
  const avant = un(["", "Sans mesurer.", "Voici trois angles.", "Observe ces trois angles.", intro(3)]);
  return fin(
    `${avant} ${qst}`.trim(),
    qcm(`L'angle ${n[k]}`, n.filter((_, i) => i !== k).map((x) => `L'angle ${x}`)),
    etapes(OUVERT, `${PAS_LONGUEUR} On compare les écarts un à un.`, `l'angle le ${plusGrand ? "plus grand" : "plus petit"} est l'angle ${n[k]}.`),
    // Le plus grand est tourné de travers : il « a l'air » plus petit.
    dessin(degs.map((deg, i) => ({ deg, nom: n[i], rotation: i === iMax ? un([30, 45, 300]) : un([0, 10, 350]), longueur: i === iMin ? 95 : entre(60, 80) }))),
  );
});

/** L'horloge : l'angle entre les deux aiguilles, à des heures pile. */
const ouvHeure = (h: number) => 30 * Math.min(h, 12 - h);
const aiguilles = (h: number, nom: string): Angle => {
  const deg = ouvHeure(h);
  // Grande aiguille vers le haut (90°) ; la petite tourne dans le sens des aiguilles d'une montre.
  return h <= 6 ? { deg, nom, rotation: 90 - deg, longueur: 85 } : { deg, nom, rotation: 90, longueur: 85 };
};
const c4 = g(14, 2, "Regarde l'écart entre les deux aiguilles, pas le nombre de l'heure.", () => {
  const HEURES = [1, 2, 3, 4, 5, 7, 8, 9, 10, 11];
  let h1 = 0;
  let h2 = 0;
  do { h1 = un(HEURES); h2 = un(HEURES); } while (h1 === h2);
  const o1 = ouvHeure(h1);
  const o2 = ouvHeure(h2);
  const j = o1 === o2 ? "Les deux angles sont égaux" : o1 > o2 ? `À ${h1} h` : `À ${h2} h`;
  const lieu = un(["l'horloge de la classe", "la pendule de la cuisine", "la montre de Léa", "l'horloge de la gare", "le réveil de Hugo", "l'horloge de la mairie", "la pendule du salon", "l'horloge du gymnase"]);
  const qst = un([
    "À quelle heure les aiguilles forment-elles le plus grand angle ?",
    "À quelle heure les aiguilles sont-elles le plus écartées ?",
    "Quand l'angle entre les aiguilles est-il le plus grand ?",
    "À quelle heure l'angle des aiguilles est-il le plus ouvert ?",
  ]);
  return fin(
    `On regarde ${lieu} à ${h1} h, puis à ${h2} h. ${qst}`,
    qcm(j, [`À ${h1} h`, `À ${h2} h`, "Les deux angles sont égaux"]),
    etapes("on compare l'écart entre la petite et la grande aiguille.", `à ${h1} h, la petite aiguille est à ${Math.min(h1, 12 - h1)} heure(s) de la grande ; à ${h2} h, à ${Math.min(h2, 12 - h2)} heure(s). Un plus grand nombre d'heures ne veut pas dire un plus grand angle.`, o1 === o2 ? "les deux angles sont égaux." : `l'angle est le plus grand ${j.toLowerCase()}.`),
    dessin([aiguilles(h1, `${h1} h`), aiguilles(h2, `${h2} h`)]),
  );
});

/** Ce qui change l'angle, et ce qui ne le change pas. */
type Effet = { texte: () => string; avant: Angle; apres: Angle; r: "plus" | "moins" | "pareil"; pourquoi: string };
const EFFETS: (() => Effet)[] = [
  () => {
    const o = un(["le compas", "les ciseaux", "la porte", "l'éventail", "le livre", "l'écran de l'ordinateur", "l'escabeau", "la pince"]);
    const [a, b] = ouvertures(2, 25, 125).sort((p, q) => p - q);
    return { texte: () => `${cap(un(["On ouvre davantage", "Tu ouvres un peu plus", "On écarte encore", "Mia ouvre plus"]))} ${o}.`, avant: { deg: a }, apres: { deg: b }, r: "plus", pourquoi: "les côtés s'écartent : l'ouverture grandit." };
  },
  () => {
    const o = un(["le compas", "les ciseaux", "la porte", "l'éventail", "le livre", "l'écran de l'ordinateur", "le bras du robot", "la pince"]);
    const [a, b] = ouvertures(2, 35, 155).sort((p, q) => q - p);
    return { texte: () => `${cap(un(["On referme un peu", "Tu refermes un peu", "On rapproche les côtés de", "Noé referme un peu"]))} ${o}.`, avant: { deg: a }, apres: { deg: b }, r: "moins", pourquoi: "les côtés se rapprochent : l'ouverture diminue." };
  },
  () => {
    const d = un([35, 50, 65, 115, 130]);
    const quoi = un(["On prolonge les deux côtés de l'angle à la règle.", "On dessine le même angle avec des côtés deux fois plus longs.", "On agrandit la photo de l'angle sans l'ouvrir.", "On prend des ciseaux plus grands, ouverts de la même façon.", "On allonge les branches du compas sans l'ouvrir plus."]);
    return { texte: () => quoi, avant: { deg: d, longueur: 50 }, apres: { deg: d, longueur: 100 }, r: "pareil", pourquoi: "l'écart entre les côtés reste le même : allonger les côtés ne change pas l'angle." };
  },
  () => {
    const d = un([35, 50, 65, 115, 130]);
    const quoi = un(["On tourne la feuille où l'angle est dessiné.", "On penche le dessin de l'angle.", "On fait pivoter l'équerre sur la table.", "On retourne la part de pizza dans l'assiette."]);
    return { texte: () => quoi, avant: { deg: d, rotation: 0 }, apres: { deg: d, rotation: un([40, 60, 300]) }, r: "pareil", pourquoi: "tourner un angle ne change pas son ouverture." };
  },
  () => {
    const [n, m] = un([[4, 6], [4, 8], [6, 8], [3, 6], [4, 12], [6, 12]]);
    const plus = Math.random() < 0.5;
    const [de, a] = plus ? [n, m] : [m, n];
    const plat = un(["la pizza", "la tarte", "le gâteau", "la galette", "le fromage rond"]);
    return { texte: () => `On coupe ${plat} en ${a} parts égales au lieu de ${de}.`, avant: { deg: 360 / de }, apres: { deg: 360 / a }, r: plus ? "moins" : "plus", pourquoi: plus ? "plus de parts se partagent le même tour : chaque part est moins ouverte." : "moins de parts se partagent le même tour : chaque part est plus ouverte." };
  },
];
const REP = { plus: "Il devient plus grand", moins: "Il devient plus petit", pareil: "Il ne change pas" };
const c5 = g(15, 2, "Demande-toi si l'écart entre les côtés change.", () => {
  const e = un(EFFETS)();
  const qst = un(["Que devient l'angle ?", "L'angle change-t-il ?", "Que se passe-t-il pour l'angle ?", "Et l'angle, alors ?"]);
  const j = REP[e.r];
  return fin(
    `${e.texte()} ${qst}`,
    qcm(j, Object.values(REP)),
    etapes(OUVERT, e.pourquoi, `${j.toLowerCase()}.`),
    dessin([{ ...e.avant, nom: "Avant" }, { ...e.apres, nom: "Après" }]),
  );
});

/* ═════════════════════════════ ★3 ═════════════════════════════ */

const PRENOMS = ["Léa", "Hugo", "Inès", "Nathan", "Aïcha", "Malo", "Chloé", "Yanis", "Jade", "Lucas", "Sofia", "Kenji", "Maëlys", "Tom", "Nour", "Enzo", "Lina", "Sacha"];

/** Le gabarit (calque) posé sur l'autre angle. */
const c6 = g(16, 3, "Sommet sur sommet, un côté sur un côté : regarde où tombe l'autre côté.", () => {
  const [x, y] = deuxNoms();
  const cas = un(["dedans", "dehors", "pile"] as const);
  const [p, q] = ouvertures(2, 25, 145).sort((m, n) => m - n);
  const dx = cas === "dedans" ? p : cas === "dehors" ? q : p;
  const dy = cas === "dedans" ? q : cas === "dehors" ? p : p;
  const ou = { dedans: `à l'intérieur de l'angle ${y}`, dehors: `à l'extérieur de l'angle ${y}`, pile: `pile sur l'autre côté de l'angle ${y}` }[cas];
  const j = cas === "dedans" ? `L'angle ${x} est plus petit que l'angle ${y}` : cas === "dehors" ? `L'angle ${x} est plus grand que l'angle ${y}` : `Les angles ${x} et ${y} sont égaux`;
  const outil = un(["un calque", "du papier calque", "un gabarit en carton", "une feuille fine"]);
  return fin(
    `${un(PRENOMS)} reproduit l'angle ${x} sur ${outil}. ${un(["On le pose", "Puis on le pose", "On place ce gabarit"])} sur l'angle ${y} : sommet sur sommet, un côté sur un côté. L'autre côté tombe ${ou}. ${un(["Que peut-on dire ?", "Que conclure ?", "Quelle phrase est juste ?"])}`,
    qcm(j, [`L'angle ${x} est plus petit que l'angle ${y}`, `L'angle ${x} est plus grand que l'angle ${y}`, `Les angles ${x} et ${y} sont égaux`]),
    etapes("on compare avec un gabarit : on superpose les deux angles.", cas === "dedans" ? `l'autre côté reste dans l'angle ${y} : ${x} est moins ouvert.` : cas === "dehors" ? `l'autre côté dépasse de l'angle ${y} : ${x} est plus ouvert.` : "les deux côtés se recouvrent : même ouverture.", `${j.toLowerCase()}.`),
    dessin([{ deg: dx, nom: x }, { deg: dy, nom: y, longueur: cas === "pile" ? 55 : undefined }]),
  );
});

/** Un élève se trompe : côtés plus longs, ou angle penché. */
const c7 = g(17, 3, "Ni la longueur des côtés ni la façon dont l'angle est tourné ne comptent.", () => {
  const [x, y] = deuxNoms();
  const p = un(PRENOMS);
  if (Math.random() < 0.5) {
    // Piège de la longueur : x a de longs côtés mais il est moins ouvert.
    const [a, b] = ouvertures(2).sort((m, n) => m - n);
    return fin(
      `${p} ${un(["dit", "affirme", "pense"])} : « L'angle ${x} est le plus grand, ${un(["ses côtés sont plus longs", "il a de plus longs côtés", "il prend plus de place"])}. » ${un(["Est-ce juste ?", "Qu'en penses-tu ?", "Que lui répondre ?"])}`,
      qcm(`Non : l'angle ${y} est plus ouvert, c'est lui le plus grand`, [`Oui : ses côtés sont plus longs`, `Oui : il prend plus de place sur la feuille`, `Non : les deux angles sont égaux`]),
      etapes(OUVERT, PAS_LONGUEUR, `les côtés de ${y} sont plus écartés : l'angle ${y} est le plus grand.`),
      dessin([{ deg: a, nom: x, longueur: 105 }, { deg: b, nom: y, longueur: 45 }]),
    );
  }
  // Piège du « penché » : y est tourné, il est plus grand ou égal.
  const egal = Math.random() < 0.35;
  const [a, b] = ouvertures(2, 25, 135).sort((m, n) => m - n);
  const dy = egal ? a : b;
  const j = egal ? "Non : ils ont la même ouverture, ils sont égaux" : `Non : l'angle ${y} est plus ouvert, c'est lui le plus grand`;
  return fin(
    `${p} ${un(["dit", "affirme", "pense"])} : « L'angle ${y} est plus petit que l'angle ${x}, ${un(["il est penché", "il est tout de travers", "il est tourné"])}. » ${un(["Est-ce juste ?", "Qu'en penses-tu ?", "Que lui répondre ?"])}`,
    qcm(j, [egal ? `Non : l'angle ${y} est plus ouvert, c'est lui le plus grand` : "Non : ils ont la même ouverture, ils sont égaux", `Oui : un angle penché est plus petit`, `Oui : sa pointe est plus haute`]),
    etapes(OUVERT, PAS_LONGUEUR, egal ? "les deux écarts sont les mêmes : les angles sont égaux." : `les côtés de ${y} sont plus écartés : l'angle ${y} est le plus grand.`),
    dessin([{ deg: a, nom: x, rotation: 0 }, { deg: dy, nom: y, rotation: un([45, 60, 300, 315]) }]),
  );
});

/** Ranger trois angles en situation. */
const c8 = g(18, 3, "Trouve d'abord le plus fermé, puis le plus ouvert.", () => {
  const n = troisNoms();
  const degs = ouvertures(3);
  const croissant = Math.random() < 0.5;
  const tri = [0, 1, 2].sort((i, j) => (croissant ? degs[i] - degs[j] : degs[j] - degs[i])).map((i) => n[i]);
  const j = tri.join(", ");
  const faux = [[...tri].reverse(), [tri[1], tri[0], tri[2]], [tri[0], tri[2], tri[1]], [tri[2], tri[0], tri[1]]].map((l) => l.join(", "));
  const qst = croissant
    ? un(["Range-les du moins ouvert au plus ouvert.", "Range les angles du plus petit au plus grand.", "Quel est l'ordre, du plus petit au plus grand ?"])
    : un(["Range-les du plus ouvert au moins ouvert.", "Range les angles du plus grand au plus petit.", "Quel est l'ordre, du plus grand au plus petit ?"]);
  const iMin = degs.indexOf(Math.min(...degs));
  return fin(
    `${intro(3)} ${qst}`,
    qcm(j, faux),
    etapes(OUVERT, `${PAS_LONGUEUR} On cherche le plus fermé, puis le plus ouvert ; le dernier va au milieu.`, `${croissant ? "du plus petit au plus grand" : "du plus grand au plus petit"} : ${j}.`),
    dessin(degs.map((deg, i) => ({ deg, nom: n[i], longueur: i === iMin ? 98 : entre(55, 80), rotation: un([0, 15, 345, 30]) }))),
  );
});

/** Égaux ou pas ? Côtés et orientation différents. */
const c9 = g(19, 3, "Deux angles sont égaux s'ils ont la même ouverture, quelle que soit la longueur des côtés.", () => {
  const [x, y] = deuxNoms();
  const egal = Math.random() < 0.5;
  const [a, b] = ouvertures(2);
  const dy = egal ? a : b;
  const j = egal ? "Ils sont égaux" : a > dy ? `L'angle ${x} est plus grand` : `L'angle ${y} est plus grand`;
  const qst = un(["Que peut-on dire de ces deux angles ?", "Compare ces deux angles.", "Quelle phrase est juste ?", "Que conclure ?"]);
  const rem = un(["", "Les côtés n'ont pas la même longueur.", "Les deux angles ne sont pas tournés pareil.", "Pense au gabarit."]);
  return fin(
    `${intro(2)} ${rem} ${qst}`.replace(/\s+/g, " ").trim(),
    qcm(j, ["Ils sont égaux", `L'angle ${x} est plus grand`, `L'angle ${y} est plus grand`, "On ne peut pas comparer sans mesurer"]),
    etapes(OUVERT, `${PAS_LONGUEUR} On peut décalquer l'un et le poser sur l'autre.`, egal ? "les deux écarts sont les mêmes : les angles sont égaux." : `${j.toLowerCase()}.`),
    dessin([{ deg: a, nom: x, longueur: 100, rotation: 0 }, { deg: dy, nom: y, longueur: 50, rotation: un([30, 45, 330, 315]) }]),
  );
});

/** Une contrainte : plus grand, plus petit ou égal à l'angle droit. Une seule position convient. */
const BESOINS: { qui: string; quoi: string; pl?: boolean }[] = [
  { qui: "Une ingénieure règle le bras d'un robot.", quoi: "le bras" },
  { qui: "Un étudiant règle sa lampe de bureau.", quoi: "la lampe" },
  { qui: "Un maître-nageur règle une chaise longue.", quoi: "le dossier" },
  { qui: "Une informaticienne ouvre son ordinateur portable.", quoi: "l'écran" },
  { qui: "Un menuisier pose une porte de placard.", quoi: "la porte" },
  { qui: "Une gymnaste prépare un tremplin.", quoi: "le tremplin" },
  { qui: "Un grutier bouge le bras de sa grue.", quoi: "le bras" },
  { qui: "Une charpentière dessine un toit.", quoi: "le toit" },
  { qui: "Un couturier ouvre ses ciseaux.", quoi: "les ciseaux", pl: true },
  { qui: "Une photographe règle son trépied.", quoi: "les pieds", pl: true },
  { qui: "Un peintre ouvre son escabeau.", quoi: "l'escabeau" },
  { qui: "Une fleuriste ouvre un éventail de fleurs.", quoi: "l'éventail" },
];
const c10 = g(20, 3, "Compare chaque angle au coin d'une feuille.", () => {
  const n = troisNoms();
  const b = un(BESOINS);
  const sorte = un(["obtus", "aigu", "droit"] as const);
  const degs = melange([un([30, 45, 60]), 90, un([120, 135, 150])]);
  const cible = sorte === "aigu" ? degs.findIndex((d) => d < 90) : sorte === "droit" ? degs.indexOf(90) : degs.findIndex((d) => d > 90);
  const besoin = { aigu: "un angle plus petit qu'un angle droit", droit: "un angle droit, ni plus ni moins", obtus: "un angle plus grand qu'un angle droit" }[sorte];
  return fin(
    `${b.qui} ${cap(b.quoi)} ${b.pl ? "doivent" : "doit"} former ${besoin}. ${un(["Quelle position convient ?", "Quel dessin convient ?", "Laquelle choisir ?", "Quelle position faut-il prendre ?"])}`,
    qcm(`La position ${n[cible]}`, n.filter((_, i) => i !== cible).map((x) => `La position ${x}`)),
    etapes("on pose le coin d'une feuille sur chaque angle.", "si l'autre côté reste dedans, l'angle est plus petit qu'un angle droit ; s'il sort, il est plus grand.", `la position ${n[cible]} donne ${besoin}.`),
    // Le petit carré n'est PAS dessiné ici : l'élève vérifie lui-même l'angle droit.
    dessin(degs.map((deg, i) => ({ deg: deg === 90 ? 89.9 : deg, nom: n[i] }))),
  );
});

export const angleComparerGabarits = [c1, c2, c3, c4, c5, c6, c7, c8, c9, c10];
