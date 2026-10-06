// ─── Les échelles (6e) ─────────────────────────────────────────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (23/08/2026). « S'initier à la résolution de
// problèmes d'échelles » est l'un des cinq objectifs de la proportionnalité en
// 6e [6e-P-proportionnalite-5, p. 19], et c'était le DERNIER trou du programme.
//
// ⭐ LES ÉCHELLES SONT AU PROGRAMME DE 6e, ET DE LÀ SEULEMENT. Au CM1 et au CM2,
// la proportionnalité n'a que deux objectifs — l'identifier, la résoudre. Le
// mot « échelle » n'apparaît nulle part avant la 6e. C'est donc ici que l'élève
// rencontre pour la première fois un rapport entre deux longueurs qui ne sont
// pas dans la même unité, ni même dans le même monde : le papier et le terrain.
//
// ⛔⛔ LE PRODUIT EN CROIX EST INTERDIT À CE STADE. Le BO est explicite pour la
// 6e : « dans cette optique de compréhension du sens de la proportionnalité […]
// la technique du "produit en croix" n'est pas enseignée ». Les procédures
// attendues sont nommées : PROPRIÉTÉ DE LINÉARITÉ (pour la multiplication ou
// l'addition) et RETOUR À L'UNITÉ. Aucune explication de cette banque ne pose
// une égalité de produits ; toutes disent « 3 fois plus sur le plan, donc 3 fois
// plus en vrai », ou « je cherche d'abord ce que vaut 1 cm ».
//
// ⭐ L'ÉCHELLE GRAPHIQUE EST CELLE QUE CITE LE BO : « 1 cm sur le plan
// correspond à 10 m dans la réalité ». Elle se lit sans conversion et c'est par
// elle qu'on commence. L'échelle numérique (1/200) vient ensuite : elle dit la
// même chose, mais sans unité, ce qui oblige à comprendre que les deux
// longueurs se mesurent alors dans LA MÊME unité.
//
// ⚠️ L'ERREUR DU CHAPITRE EST UN SENS, PAS UN CALCUL. Du plan vers la réalité on
// agrandit, de la réalité vers le plan on réduit. Un élève qui divise au lieu de
// multiplier trouve 0,05 m pour une pièce de 5 m — un résultat impossible que
// le simple bon sens rejette. Deux items travaillent ce contrôle.

import type { TutorBankItemV4, EchelleCanvasData } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nombre(n: number): string {
  return Number.isInteger(n) ? String(n) : String(n).replace(".", ",");
}

function ex(def: string, meth: string, calc: string, ccl: string) {
  return `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${ccl}`;
}

function echelleCanvas(data: Omit<EchelleCanvasData, "kind">): EchelleCanvasData {
  return { kind: "echelle", ...data };
}

function correspondance(echelleLabel: string, planLabel: string, reelLabel: string, question?: string) {
  return echelleCanvas({
    variant: "correspondance",
    title: "Comprendre l’échelle",
    echelleLabel,
    planLabel,
    reelLabel,
    questionLabel: question,
  });
}

function versLeReel(echelleLabel: string, planDistance: string, question?: string) {
  return echelleCanvas({
    variant: "distance_reelle",
    title: "Du plan vers la réalité",
    echelleLabel,
    planDistance,
    reelDistance: "?",
    questionLabel: question,
  });
}

function versLePlan(echelleLabel: string, reelDistance: string, question?: string) {
  return echelleCanvas({
    variant: "distance_plan",
    title: "De la réalité vers le plan",
    echelleLabel,
    planDistance: "?",
    reelDistance,
    questionLabel: question,
  });
}

/* ---------------------------------------------------------------------------
   ⛔⛔ 06/10/2026 — « LES MÊMES QUESTIONS REVIENNENT ». Mesuré le 05/10 : 6 à 9
   squelettes d'énoncé par micro, 12 à 17 répétitions sur 20. Chaque gabarit
   compose désormais un DOCUMENT (plan ou carte, table ci-dessous) × un OBJET
   mesuré × une TOURNURE × un PRÉNOM. Mesure : scripts/mesurer-squelettes-
   coach.ts 6e prop_echelle ; correcteurs : correcteurs/echelles.ts.
   ⭐ L'échelle « 1/200 » est gardée (Frédéric, 06/10), et l'énoncé dit TOUJOURS
   ce qu'elle veut dire : « 1 cm sur le plan représente 200 cm en vrai ».
   Toute autre division s'écrit « ÷ ».
--------------------------------------------------------------------------- */
type Prenom = { n: string; f: boolean };
const PRENOMS: readonly Prenom[] = [
  { n: "Léa", f: true }, { n: "Inès", f: true }, { n: "Jade", f: true }, { n: "Chloé", f: true },
  { n: "Aïcha", f: true }, { n: "Maëlys", f: true }, { n: "Yasmine", f: true }, { n: "Emma", f: true },
  { n: "Noémie", f: true }, { n: "Fatou", f: true }, { n: "Lina", f: true }, { n: "Zoé", f: true },
  { n: "Anaïs", f: true }, { n: "Mei", f: true }, { n: "Hugo", f: false }, { n: "Tom", f: false },
  { n: "Nathan", f: false }, { n: "Adam", f: false }, { n: "Rayan", f: false }, { n: "Lucas", f: false },
  { n: "Moussa", f: false }, { n: "Enzo", f: false }, { n: "Ibrahim", f: false }, { n: "Théo", f: false },
  { n: "Kenji", f: false }, { n: "Ilyes", f: false }, { n: "Malik", f: false }, { n: "Yanis", f: false },
];
const pick = <T,>(a: readonly T[]): T => a[randomInt(0, a.length - 1)];
const VOYELLE = /^[aeiouhâàéèêîïôûœ]/i;
const deP = (n: string) => (VOYELLE.test(n) ? `d’${n}` : `de ${n}`);
const il = (P: Prenom) => (P.f ? "elle" : "il");
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « que la cour », « qu’un sentier », « qu’une route ». */
const que = (gn: string) => (VOYELLE.test(gn) ? `qu’${gn}` : `que ${gn}`);
/** « le salon » → « du salon », « la cour » → « de la cour », « l’allée » → « de l’allée ». */
const du = (gn: string) => (gn.startsWith("le ") ? "du " + gn.slice(3) : "de " + gn);

/**
 * Un document à l'échelle : `doc(P)` avec son article (« le plan du collège »),
 * le mot court (« le plan », « la carte »), des objets qu'on y mesure, les
 * longueurs réelles possibles pour 1 cm (`ks`, dans l'unité `u`) et la plus
 * grande mesure plausible sur le papier (`cmMax`).
 */
type DocEch = { doc: (P: Prenom) => string; court: string; objets: readonly string[]; ks: readonly number[]; u: "m" | "km"; cmMax: number };
const DOCS_ECH: readonly DocEch[] = [
  { doc: (P) => `le plan de la maison ${deP(P.n)}`, court: "le plan", objets: ["le salon", "la cuisine", "le couloir", "la terrasse"], ks: [1, 2], u: "m", cmMax: 8 },
  { doc: () => "le plan du collège", court: "le plan", objets: ["la cour", "le préau", "le gymnase", "le couloir principal"], ks: [2, 5, 10], u: "m", cmMax: 12 },
  { doc: (P) => `le plan du jardin ${deP(P.n)}`, court: "le plan", objets: ["l’allée", "la haie", "le potager", "la pelouse"], ks: [1, 2, 5], u: "m", cmMax: 10 },
  { doc: () => "le plan d’un stade", court: "le plan", objets: ["la ligne droite de la piste", "la tribune", "le terrain de foot"], ks: [5, 10, 20], u: "m", cmMax: 12 },
  { doc: () => "le plan d’un camping", court: "le plan", objets: ["l’allée principale", "la plage du lac", "le chemin des sanitaires"], ks: [10, 20, 25], u: "m", cmMax: 12 },
  { doc: () => "le plan d’un zoo", court: "le plan", objets: ["l’enclos des girafes", "le chemin des visiteurs", "le bassin des otaries"], ks: [10, 20, 50], u: "m", cmMax: 12 },
  { doc: () => "le plan d’un parc", court: "le plan", objets: ["le bassin", "la promenade", "l’aire de jeux"], ks: [10, 20, 50], u: "m", cmMax: 12 },
  { doc: (P) => `le plan du quartier ${deP(P.n)}`, court: "le plan", objets: ["la rue principale", "l’avenue", "le boulevard"], ks: [20, 50, 100], u: "m", cmMax: 12 },
  { doc: () => "le plan d’une piscine", court: "le plan", objets: ["le grand bassin", "le petit bassin", "la pataugeoire"], ks: [1, 2, 5], u: "m", cmMax: 10 },
  { doc: () => "le plan d’une ferme", court: "le plan", objets: ["la clôture du pré", "le hangar", "le chemin du verger"], ks: [5, 10, 20], u: "m", cmMax: 12 },
  { doc: () => "le plan d’un port", court: "le plan", objets: ["la jetée", "le quai", "la digue"], ks: [10, 20, 50], u: "m", cmMax: 12 },
  { doc: () => "une carte de randonnée", court: "la carte", objets: ["le sentier du lac", "la montée au refuge", "le chemin des crêtes"], ks: [1, 2], u: "km", cmMax: 12 },
  { doc: () => "une carte routière", court: "la carte", objets: ["la route entre deux villes", "le trajet jusqu’à la plage", "l’autoroute du sud"], ks: [5, 10, 20], u: "km", cmMax: 12 },
  { doc: () => "la carte d’une île", court: "la carte", objets: ["la côte nord", "la route du volcan", "le chemin du phare"], ks: [2, 4, 5], u: "km", cmMax: 12 },
  { doc: () => "une carte de La Réunion", court: "la carte", objets: ["un sentier dans les Hauts", "une route côtière", "un chemin de randonnée"], ks: [2, 4, 5], u: "km", cmMax: 12 },
  { doc: (P) => `la carte du tour à vélo ${deP(P.n)}`, court: "la carte", objets: ["la première étape", "la descente", "la route du retour"], ks: [1, 2, 5], u: "km", cmMax: 12 },
  { doc: () => "la carte d’un parc national", court: "la carte", objets: ["la route forestière", "le sentier des cascades", "la piste cyclable"], ks: [1, 2], u: "km", cmMax: 12 },
];

/** Les échelles écrites en fraction : des plans et des maquettes (la mesure du papier en cm). */
const ECH_NUM: readonly { n: number; doc: (P: Prenom) => string; court: string; objets: readonly string[]; cmMax: number }[] = [
  { n: 50, doc: (P) => `la maquette du bateau ${deP(P.n)}`, court: "la maquette", objets: ["la coque", "le mât"], cmMax: 30 },
  { n: 100, doc: (P) => `le plan de la chambre ${deP(P.n)}`, court: "le plan", objets: ["le mur du fond", "le lit", "la fenêtre"], cmMax: 6 },
  { n: 100, doc: () => "le plan d’une cuisine", court: "le plan", objets: ["le plan de travail", "le mur du four"], cmMax: 6 },
  { n: 200, doc: () => "le plan d’un appartement", court: "le plan", objets: ["le séjour", "le couloir", "la chambre"], cmMax: 6 },
  { n: 200, doc: (P) => `la maquette de la maison ${deP(P.n)}`, court: "la maquette", objets: ["la façade", "le garage"], cmMax: 8 },
  { n: 250, doc: () => "le plan d’une école", court: "le plan", objets: ["la classe", "le préau"], cmMax: 8 },
  { n: 500, doc: () => "le plan d’un gymnase", court: "le plan", objets: ["la salle de sport", "le terrain de handball"], cmMax: 10 },
  { n: 1000, doc: () => "le plan d’un village", court: "le plan", objets: ["la place", "la rue de l’église"], cmMax: 12 },
];
/** « l’échelle 1/200 (1 cm sur le plan représente 200 cm en vrai) ». */
const echNum = (n: number, court: string) => `l’échelle 1/${n} (1 cm sur ${court} représente ${n} cm en vrai)`;

/**
 * Les anciennes questions ouvertes, FERMÉES (coordinateur, 06/10) : un mot-clé
 * numérique en `contains_keyword` acceptait toute réponse contenant ce chiffre.
 * Un nombre attendu → réponse courte `number_equal` avec unité ; une
 * explication → QCM dont les leurres sont les erreurs du chapitre.
 */
type CasFerme = { q: string; r: string; nombre?: { v: string; u: string }; qcm?: { bonne: string; leurres: string[] } };
function fermer(c: CasFerme) {
  if (c.nombre) return { format: "short" as const, expected: [`${c.nombre.v} ${c.nombre.u}`, c.nombre.v], comparator: "number_equal" as const };
  const q = c.qcm!;
  return {
    format: "qcm" as const,
    choices: [q.bonne, ...q.leurres].sort(() => Math.random() - 0.5),
    expected: [q.bonne],
    comparator: "mcq_exact" as const,
  };
}

/** Un document, un objet, une échelle « 1 cm représente k u », une mesure sur le papier. */
function tirerDoc(demi = false) {
  const d = pick(DOCS_ECH);
  const P = pick(PRENOMS);
  const k = pick(d.ks);
  const cm = randomInt(2, d.cmMax) - (demi && Math.random() < 0.4 ? 0.5 : 0);
  // Le propriétaire du document n'est pas celui qui le lit (« Léa regarde le plan de la maison de Tom »).
  const proprio = pick(PRENOMS.filter((x) => x.n !== P.n));
  return { d, P, k, cm, reel: Math.round(cm * k * 100) / 100, objet: pick(d.objets), docTxt: d.doc(proprio) };
}

export const echelles6eBank: TutorBankItemV4[] = [
  // =========================
  // ECHELLE_COMPRENDRE — ce que dit une échelle
  // =========================
  {
    kind: "fixed",
    id: "6e_echelle_comprendre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 2,
    theme: "neutral",
    text: "Sur le plan d'un collège, on lit : « 1 cm sur le plan correspond à 10 m dans la réalité ». Que représentent 3 cm sur ce plan ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Trois fois plus sur le plan, donc trois fois plus en vrai. (Réponds en mètres.)",
    explanation: ex(
      "une échelle indique à quelle longueur réelle correspond une longueur du plan.",
      "on utilise la linéarité : si la longueur sur le plan est multipliée par un nombre, la longueur réelle l'est par le même nombre.",
      "1 cm sur le plan vaut 10 m en vrai. Or 3 cm, c'est 3 fois 1 cm : la longueur réelle est donc 3 fois 10 m, soit 30 m.",
      "3 cm sur le plan représentent 30 m."
    ),
    tags: ["prop_echelle", "comprendre", "canvas", "short"],
    canvas: correspondance("1 cm ↔ 10 m", "1 cm", "10 m", "Et 3 cm ?"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_comprendre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Une maquette est à l'échelle 1/200. Qu'est-ce que cela signifie ?",
    format: "qcm",
    choices: [
      "1 cm sur la maquette représente 200 cm en réalité",
      "1 cm sur la maquette représente 200 m en réalité",
      "la maquette est 200 fois plus grande que la réalité",
      "la maquette mesure 200 cm de long",
    ],
    expected: ["1 cm sur la maquette représente 200 cm en réalité"],
    comparator: "mcq_exact",
    hint: "L'échelle 1/200 n'a pas d'unité : les deux longueurs se mesurent donc dans la même.",
    explanation: ex(
      "une échelle écrite en fraction compare deux longueurs mesurées dans LA MÊME unité.",
      "on lit 1/200 comme « 1 sur la maquette pour 200 en vrai », dans l'unité qu'on veut, pourvu que ce soit la même des deux côtés.",
      "1 cm sur la maquette correspond à 200 cm en réalité, soit 2 m. On pourrait aussi dire 1 mm pour 200 mm : c'est la même échelle. Ce qui serait faux, c'est de changer d'unité en route — « 1 cm pour 200 m » multiplierait la réalité par cent.",
      "l'échelle 1/200 réduit toutes les longueurs 200 fois."
    ),
    tags: ["prop_echelle", "comprendre", "piege", "canvas", "qcm"],
    canvas: correspondance("1/200", "1 cm", "200 cm = 2 m"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_comprendre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une carte, 1 cm représente 5 km. Une route mesure 4 cm sur la carte. Quelle est sa longueur réelle, en km ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "4 fois plus sur la carte, donc 4 fois plus en vrai.",
    explanation: ex(
      "une échelle est une situation de proportionnalité entre la longueur sur la carte et la longueur réelle.",
      "on applique la linéarité : on multiplie la longueur réelle correspondant à 1 cm par le nombre de centimètres.",
      "1 cm correspond à 5 km. Pour 4 cm, on multiplie par 4 des deux côtés : 4 × 5 = 20 km.",
      "la route mesure 20 km."
    ),
    tags: ["prop_echelle", "comprendre", "short"],
  },
  {
    kind: "template",
    id: "6e_echelle_comprendre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie par le même nombre des deux côtés.",
    tags: ["prop_echelle", "comprendre", "template"],
    // 06/10 : la linéarité — on connaît ce que valent PLUSIEURS cm (pas 1 cm).
    generate: () => {
      for (;;) {
        const { d, P, k, docTxt, objet } = tirerDoc();
        const c1 = randomInt(2, 4);
        const fois = randomInt(2, 3);
        const c2 = c1 * fois;
        if (c2 > d.cmMax) continue;
        const [r1, r2] = [c1 * k, c2 * k];
        const text = pick([
          `Sur ${docTxt}, ${c1} cm représentent ${nombre(r1)} ${d.u} dans la réalité. Que représentent ${c2} cm ? Réponds en ${d.u}.`,
          `${P.n} lit sur ${docTxt} : « ${c1} cm pour ${nombre(r1)} ${d.u} ». ${cap(objet)} mesure ${c2} cm sur ${d.court}. Quelle est sa longueur réelle, en ${d.u} ?`,
          `Sur ${docTxt}, ${c1} cm correspondent à ${nombre(r1)} ${d.u}. Combien de ${d.u === "m" ? "mètres" : "kilomètres"} représentent ${c2} cm ?`,
        ]);
        return {
          text,
          format: "short",
          expected: [`${nombre(r2)} ${d.u}`, nombre(r2)],
          comparator: "number_equal",
          explanation: ex(
            "une échelle relie proportionnellement la longueur du plan et la longueur réelle.",
            "on multiplie par le même nombre des deux côtés — c'est la propriété de linéarité.",
            `${c2} cm, c'est ${fois} fois ${c1} cm. La longueur réelle est donc ${fois} fois ${nombre(r1)} ${d.u} : ${fois} × ${nombre(r1)} = ${nombre(r2)} ${d.u}.`,
            `${c2} cm représentent ${nombre(r2)} ${d.u}.`
          ),
          canvas: correspondance(`${c1} cm ↔ ${nombre(r1)} ${d.u}`, `${c1} cm`, `${nombre(r1)} ${d.u}`, `Et ${c2} cm ?`),
        };
      }
    },
  },
  {
    kind: "template",
    id: "6e_echelle_comprendre_tpl_lire",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 2,
    theme: "neutral",
    hint: "2 cm, c'est 2 fois 1 cm : la longueur réelle est 2 fois plus grande.",
    tags: ["prop_echelle", "comprendre", "template"],
    generate: () => {
      const { d, P, k, cm, reel, docTxt, objet } = tirerDoc();
      const text = pick([
        `Sur ${docTxt}, on lit : « 1 cm sur ${d.court} correspond à ${k} ${d.u} dans la réalité ». Que représentent ${cm} cm sur ${d.court} ? Réponds en ${d.u}.`,
        `${P.n} regarde ${docTxt} : 1 cm représente ${k} ${d.u}. ${cap(objet)} mesure ${cm} cm sur ${d.court}. Quelle est sa longueur réelle, en ${d.u} ?`,
        `Sur ${docTxt}, 1 cm représente ${k} ${d.u}. Combien de ${d.u === "m" ? "mètres" : "kilomètres"} représentent ${cm} cm ?`,
        `L’échelle ${du(d.court)} est « 1 cm pour ${k} ${d.u} ». ${P.n} mesure ${objet} : ${cm} cm. Quelle longueur cela fait-il en vrai, en ${d.u} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [`${nombre(reel)} ${d.u}`, nombre(reel)],
        comparator: "number_equal",
        explanation: ex(
          "une échelle indique à quelle longueur réelle correspond une longueur du plan.",
          "on utilise la linéarité : autant de fois 1 cm, autant de fois la longueur réelle.",
          `1 cm vaut ${k} ${d.u}. Or ${cm} cm, c'est ${cm} fois 1 cm : ${cm} × ${k} = ${nombre(reel)} ${d.u}.`,
          `${cm} cm représentent ${nombre(reel)} ${d.u}.`
        ),
        canvas: correspondance(`1 cm ↔ ${k} ${d.u}`, "1 cm", `${k} ${d.u}`, `Et ${cm} cm ?`),
      };
    },
  },
  {
    kind: "template",
    id: "6e_echelle_comprendre_qcm_tpl_fraction",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 3,
    theme: "neutral",
    hint: "L'échelle 1/200 n'a pas d'unité : les deux longueurs se mesurent dans la même unité.",
    tags: ["prop_echelle", "comprendre", "qcm", "template"],
    generate: () => {
      const e = pick(ECH_NUM);
      const P = pick(PRENOMS);
      const mot = e.court.replace(/^(le|la) /, "");
      const bonne = `1 cm sur ${e.court} représente ${e.n} cm en vrai`;
      const leurres = [
        `1 cm sur ${e.court} représente ${e.n} m en vrai`,
        `${e.court} est ${e.n} fois plus grand${e.court.startsWith("la") ? "e" : ""} que la réalité`,
        `${e.court} mesure ${e.n} cm de long`,
        `1 cm sur ${e.court} représente ${e.n} km en vrai`,
      ];
      return {
        text: pick([
          `${cap(e.doc(P))} est à l'échelle 1/${e.n}. Qu'est-ce que cela signifie ?`,
          `${pick(PRENOMS.filter((x) => x.n !== P.n)).n} lit « échelle 1/${e.n} » sur ${e.doc(P)}. Que veut dire cette échelle ?`,
          `Sur ${e.doc(P)}, il est écrit : échelle 1/${e.n}. Choisis la bonne explication.`,
        ]),
        format: "qcm",
        choices: [bonne, ...leurres.sort(() => Math.random() - 0.5).slice(0, 3)].sort(() => Math.random() - 0.5),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: ex(
          "une échelle écrite en fraction compare deux longueurs mesurées dans LA MÊME unité.",
          `on lit 1/${e.n} comme « 1 sur ${e.court} pour ${e.n} en vrai », dans la même unité des deux côtés.`,
          `1 cm sur ${e.court} correspond à ${e.n} cm en réalité. Changer d'unité en route (« 1 cm pour ${e.n} m ») multiplierait la réalité par cent. Et ${mot === "maquette" ? "la maquette" : "le plan"} est plus petit${mot === "maquette" ? "e" : ""} que la réalité, pas plus grand${mot === "maquette" ? "e" : ""}.`,
          `l'échelle 1/${e.n} réduit toutes les longueurs ${e.n} fois.`
        ),
        // Pas de figure ici : elle afficherait « 1 cm ↔ ${e.n} cm », c'est-à-dire la réponse.
      };
    },
  },
  {
    kind: "template",
    id: "6e_echelle_comprendre_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_comprendre",
    difficulty: 4,
    theme: "neutral",
    hint: "Parle des deux longueurs et de ce qui les relie.",
    tags: ["prop_echelle", "comprendre", "template", "ouverte"],
    // 06/10 : trois questions ouvertes, chacune sur un document et des nombres tirés.
    generate: () => {
      const { d, P, k, cm, reel, docTxt } = tirerDoc();
      const e = pick(ECH_NUM);
      const c1 = randomInt(2, 3);
      const fois = randomInt(2, 4);
      // 06/10 (coordinateur) : plus de question ouverte à mots-clés. Un nombre → réponse
      // courte avec unité ; une explication → QCM sur les pièges du chapitre.
      const cas: CasFerme[] = [
        {
          q: `Sur ${docTxt}, on lit « 1 cm pour ${k} ${d.u} ». ${P.n} mesure ${cm} cm sur ${d.court}. Quelle longueur cela représente-t-il en vrai, en ${d.u} ?`,
          nombre: { v: nombre(reel), u: d.u },
          r: `Chaque centimètre mesuré sur ${d.court} représente ${k} ${d.u} en vrai. Comme c'est une situation de proportionnalité, la règle vaut pour toutes les longueurs : ${cm} cm, c'est ${cm} fois 1 cm, donc ${cm} × ${k} = ${nombre(reel)} ${d.u}.`,
        },
        {
          q: `${cap(e.doc(P))} est à ${echNum(e.n, e.court)}. Pourquoi ne doit-on pas lire « 1 cm pour ${e.n} m » ? Choisis la bonne explication.`,
          qcm: {
            bonne: `1/${e.n} n'a pas d'unité : 1 cm sur ${e.court} représente ${e.n} cm, pas ${e.n} m`,
            leurres: [
              `parce que ${e.n} m ne tiendrait pas sur une feuille`,
              `parce qu'il faut lire « ${e.n} cm pour 1 cm »`,
              `parce que l'échelle ne sert qu'aux cartes`,
            ],
          },
          r: `L'échelle 1/${e.n} n'a aucune unité : elle dit 1 sur ${e.court} pour ${e.n} en réalité, dans la même unité des deux côtés. 1 cm représente donc ${e.n} cm en vrai, soit ${nombre(e.n / 100)} m. Lire « 1 cm pour ${e.n} m » changerait d'unité en route et multiplierait la réalité par cent.`,
        },
        {
          q: `Sur ${docTxt}, ${c1} cm représentent ${nombre(c1 * k)} ${d.u}. Pourquoi ${c1 * fois} cm représentent-ils ${nombre(c1 * fois * k)} ${d.u} ? Choisis la bonne explication.`,
          qcm: {
            bonne: `${c1 * fois} cm, c'est ${fois} fois ${c1} cm : la longueur réelle est aussi ${fois} fois plus grande`,
            leurres: [
              `on ajoute ${c1 * fois - c1} cm, donc on ajoute ${nombre((c1 * fois - c1))} ${d.u}`,
              `on multiplie ${c1 * fois} par ${c1}`,
              `les deux longueurs n'ont pas de lien`,
            ],
          },
          r: `${c1 * fois} cm, c'est ${fois} fois ${c1} cm. Comme l'échelle est une situation de proportionnalité, la longueur réelle est aussi ${fois} fois plus grande : ${fois} × ${nombre(c1 * k)} = ${nombre(c1 * fois * k)} ${d.u}. C'est la propriété de linéarité.`,
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        ...fermer(c),
        explanation: ex(
          "une échelle relie proportionnellement les longueurs du plan et celles de la réalité.",
          "on raisonne par linéarité, jamais par produit en croix — il n'est pas au programme de 6e.",
          c.r,
          "on garde le raisonnement, il vaut pour tout plan et toute carte."
        ),
      };
    },
  },

  // =========================
  // ECHELLE_DISTANCE_REELLE — du plan vers la réalité
  // =========================
  {
    kind: "fixed",
    id: "6e_echelle_reelle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "reunion",
    text: "Sur une carte de La Réunion, 1 cm représente 4 km. Saint-Denis et Saint-Pierre sont distants de 9 cm sur la carte. Quelle distance cela fait-il en km ?",
    format: "short",
    expected: ["36"],
    comparator: "number_equal",
    hint: "9 fois plus sur la carte, donc 9 fois plus en vrai.",
    explanation: ex(
      "du plan vers la réalité, on AGRANDIT : la longueur réelle est plus grande que celle de la carte.",
      "on multiplie la distance sur la carte par ce que vaut 1 cm en réalité.",
      "1 cm vaut 4 km. Pour 9 cm, on multiplie par 9 des deux côtés : 9 × 4 = 36 km.",
      "la distance réelle est d'environ 36 km."
    ),
    tags: ["prop_echelle", "reelle", "974", "canvas", "short"],
    canvas: versLeReel("1 cm ↔ 4 km", "9 cm", "Distance réelle ?"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_reelle_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un plan à l'échelle 1/200, une pièce mesure 4 cm de long. Quelle est sa longueur réelle, en mètres ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "1 cm sur le plan fait 200 cm en vrai — pense à convertir à la fin.",
    explanation: ex(
      "l'échelle 1/200 signifie 1 sur le plan pour 200 en réalité, dans la même unité.",
      "on multiplie par 200 en gardant les centimètres, puis on convertit à la fin.",
      "4 cm sur le plan donnent 4 × 200 = 800 cm en réalité. Comme 100 cm font 1 m, cela fait 800 ÷ 100 = 8 m.",
      "la pièce mesure 8 m."
    ),
    tags: ["prop_echelle", "reelle", "canvas", "short"],
    canvas: versLeReel("1/200", "4 cm", "Longueur réelle ?"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_reelle_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un plan où 1 cm représente 5 m, un élève calcule qu'un couloir de 6 cm mesure 1,2 m en réalité. Où est l'erreur ?",
    format: "qcm",
    choices: [
      "il a divisé au lieu de multiplier : le couloir mesure 30 m",
      "il a oublié de convertir en centimètres",
      "aucune erreur, le calcul est juste",
      "il aurait dû multiplier par 100",
    ],
    expected: ["il a divisé au lieu de multiplier : le couloir mesure 30 m"],
    comparator: "mcq_exact",
    hint: "La réalité peut-elle être PLUS PETITE que le plan ?",
    explanation: ex(
      "du plan vers la réalité, on agrandit toujours : le résultat doit être plus grand que la mesure du plan.",
      "on vérifie le SENS avant le calcul, puis on multiplie.",
      "6 ÷ 5 = 1,2 : l'élève a divisé. Or 1,2 m serait plus petit qu'un couloir de 6 cm dessiné… à l'échelle 1 cm pour 5 m — c'est impossible. Il fallait multiplier : 6 × 5 = 30 m. Le contrôle de bon sens attrape l'erreur sans refaire le calcul.",
      "le couloir mesure 30 m."
    ),
    tags: ["prop_echelle", "reelle", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "6e_echelle_reelle_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 3,
    theme: "neutral",
    hint: "Du plan vers la réalité : on agrandit.",
    tags: ["prop_echelle", "reelle", "template"],
    // 06/10 : un document de la table × un objet × quatre tournures ; mesure parfois en demi-cm.
    generate: () => {
      const { d, P, k, cm, reel, docTxt, objet } = tirerDoc(true);
      const motU = d.u === "m" ? "mètres" : "kilomètres";
      const text = pick([
        `Sur ${docTxt}, 1 cm représente ${k} ${d.u}. ${cap(objet)} mesure ${nombre(cm)} cm sur ${d.court}. Quelle est sa longueur réelle, en ${d.u} ?`,
        `${P.n} mesure ${objet} sur ${docTxt} : ${nombre(cm)} cm. Sur ${d.court}, 1 cm représente ${k} ${d.u}. Quelle est la vraie longueur, en ${d.u} ?`,
        `${cap(objet)} mesure ${nombre(cm)} cm sur ${docTxt}, où 1 cm représente ${k} ${d.u}. Calcule sa longueur réelle en ${d.u}.`,
        `Sur ${docTxt} (1 cm pour ${k} ${d.u}), ${P.n} mesure ${objet} : ${nombre(cm)} cm. Combien de ${motU} cela fait-il en réalité ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [`${nombre(reel)} ${d.u}`, nombre(reel)],
        comparator: "number_equal",
        explanation: ex(
          "du plan vers la réalité, on agrandit.",
          "on multiplie la mesure du papier par ce que vaut 1 cm.",
          `1 cm vaut ${k} ${d.u}. Pour ${nombre(cm)} cm, on multiplie par ${nombre(cm)} : ${nombre(cm)} × ${k} = ${nombre(reel)} ${d.u}.`,
          `la longueur réelle est de ${nombre(reel)} ${d.u}.`
        ),
        canvas: versLeReel(`1 cm ↔ ${k} ${d.u}`, `${nombre(cm)} cm`, "Longueur réelle ?"),
      };
    },
  },
  {
    kind: "template",
    id: "6e_echelle_reelle_tpl_fraction",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 4,
    theme: "neutral",
    hint: "1/200 : 1 cm sur le plan fait 200 cm en vrai. Multiplie, puis convertis les cm en m.",
    tags: ["prop_echelle", "reelle", "template", "fraction"],
    generate: () => {
      const e = pick(ECH_NUM);
      const P = pick(PRENOMS);
      const objet = pick(e.objets);
      const c = randomInt(2, e.cmMax);
      const enCm = c * e.n;
      const m = enCm / 100;
      const text = pick([
        `${cap(e.doc(P))} est à ${echNum(e.n, e.court)}. Sur ${e.court}, ${objet} mesure ${c} cm. Quelle est sa longueur réelle, en mètres ?`,
        `Sur ${e.doc(P)}, à ${echNum(e.n, e.court)}, ${objet} mesure ${c} cm. Combien de mètres cela fait-il en vrai ?`,
        `${cap(objet)} mesure ${c} cm sur ${e.doc(P)}. L’échelle est 1/${e.n} : 1 cm sur ${e.court} représente ${e.n} cm en vrai. Calcule sa longueur réelle en mètres.`,
      ]);
      return {
        text,
        format: "short",
        expected: [`${nombre(m)} m`, nombre(m)],
        comparator: "number_equal",
        explanation: ex(
          `l'échelle 1/${e.n} signifie 1 sur ${e.court} pour ${e.n} en réalité, dans la même unité.`,
          `on multiplie par ${e.n} en gardant les centimètres, puis on convertit à la fin (100 cm = 1 m).`,
          `${c} cm sur ${e.court} donnent ${c} × ${e.n} = ${enCm} cm en réalité. ${enCm} cm ÷ 100 = ${nombre(m)} m.`,
          `la longueur réelle est de ${nombre(m)} m.`
        ),
        canvas: versLeReel(`1/${e.n}`, `${c} cm`, "Longueur réelle ?"),
      };
    },
  },
  {
    kind: "template",
    id: "6e_echelle_reelle_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_reelle",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis dans quel sens on va, et comment vérifier que le résultat est plausible.",
    tags: ["prop_echelle", "reelle", "template", "ouverte"],
    // 06/10 : trois questions ouvertes, chacune sur un document et des nombres tirés.
    generate: () => {
      let t = tirerDoc();
      // L'erreur « on a divisé » doit tomber sur au plus deux décimales.
      while (!Number.isInteger((t.cm * 100) / t.k) || t.k === 1) t = tirerDoc();
      const { d, P, k, cm, reel, docTxt, objet } = t;
      const e = pick(ECH_NUM);
      const c2 = randomInt(2, e.cmMax);
      const faux = cm / k;
      // 06/10 (coordinateur) : un nombre → réponse courte avec unité ; une erreur → QCM.
      const cas: CasFerme[] = [
        {
          q: `${cap(objet)} mesure ${cm} cm sur ${docTxt}, où 1 cm représente ${k} ${d.u}. ${P.n} cherche sa longueur réelle. Que doit-${il(P)} trouver, en ${d.u} ?`,
          nombre: { v: nombre(reel), u: d.u },
          r: `Je regarde ce que vaut 1 cm en réalité : ${k} ${d.u}. ${cm} cm, c'est ${cm} fois 1 cm, donc je multiplie : ${cm} × ${k} = ${nombre(reel)} ${d.u}. On va du papier vers le terrain : on agrandit, le résultat doit être plus grand que la mesure du plan.`,
        },
        {
          q: `${cap(e.doc(P))} est à ${echNum(e.n, e.court)}. ${cap(pick(e.objets))} y mesure ${c2} cm. Quelle est sa longueur réelle, en mètres ?`,
          nombre: { v: nombre((c2 * e.n) / 100), u: "m" },
          r: `L'échelle 1/${e.n} dit 1 sur ${e.court} pour ${e.n} en réalité, dans la même unité. Je garde les centimètres et je multiplie : ${c2} × ${e.n} = ${c2 * e.n} cm. Puis je convertis : ${c2 * e.n} ÷ 100 = ${nombre((c2 * e.n) / 100)} m, puisque 100 cm font 1 m.`,
        },
        {
          q: `Sur ${docTxt}, 1 cm représente ${k} ${d.u}. ${P.n} pense ${que(objet)} (${cm} cm sur ${d.court}) mesure ${nombre(faux)} ${d.u} en vrai. Quelle est son erreur ?`,
          qcm: {
            bonne: `${il(P)} a divisé au lieu de multiplier : la bonne longueur est ${nombre(reel)} ${d.u}`,
            leurres: [`${il(P)} a oublié de convertir en centimètres`, "aucune erreur, le calcul est juste", `${il(P)} aurait dû multiplier par 100`],
          },
          r: `${cm} ÷ ${k} = ${nombre(faux)} : ${P.n} a divisé au lieu de multiplier. Or la réalité est plus grande que le plan. Il fallait faire ${cm} × ${k} = ${nombre(reel)} ${d.u}.`,
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        ...fermer(c),
        explanation: ex(
          "du plan vers la réalité, on agrandit.",
          "linéarité ou retour à l'unité, puis contrôle de l'ordre de grandeur.",
          c.r,
          "on garde le raisonnement, il vaut pour toute carte."
        ),
      };
    },
  },

  // =========================
  // ECHELLE_DISTANCE_PLAN — de la réalité vers le plan
  // =========================
  {
    kind: "fixed",
    id: "6e_echelle_plan_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un plan, 1 cm représente 10 m. Une cour mesure 70 m de long. Combien mesure-t-elle sur le plan, en cm ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Combien de fois 10 m tiennent-ils dans 70 m ?",
    explanation: ex(
      "de la réalité vers le plan, on RÉDUIT : la longueur du plan est plus petite que la longueur réelle.",
      "on cherche combien de fois la longueur correspondant à 1 cm tient dans la longueur réelle.",
      "1 cm représente 10 m. Dans 70 m, il y a 70 ÷ 10 = 7 fois 10 m : la cour mesure donc 7 cm sur le plan.",
      "la cour mesure 7 cm sur le plan."
    ),
    tags: ["prop_echelle", "plan", "canvas", "short"],
    canvas: versLePlan("1 cm ↔ 10 m", "70 m", "Longueur sur le plan ?"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_plan_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une carte où 1 cm représente 4 km, quelle longueur occupe un trajet réel de 30 km ?",
    format: "short",
    expected: ["7,5", "7.5", "7,50", "7.50"],
    comparator: "number_equal",
    hint: "Le résultat n'a aucune raison d'être un nombre entier.",
    explanation: ex(
      "de la réalité vers le plan, on réduit.",
      "on divise la longueur réelle par ce que vaut 1 cm.",
      "1 cm représente 4 km. Dans 30 km, il y a 30 ÷ 4 = 7,5 fois 4 km : le trajet occupe 7,5 cm sur la carte, soit 7 cm et 5 mm.",
      "le trajet mesure 7,5 cm sur la carte."
    ),
    tags: ["prop_echelle", "plan", "canvas", "short"],
    canvas: versLePlan("1 cm ↔ 4 km", "30 km", "Longueur sur la carte ?"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_plan_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 4,
    theme: "neutral",
    text: "Pour dessiner un terrain de 60 m sur une feuille, dans quel sens faut-il calculer ?",
    format: "qcm",
    choices: [
      "on réduit : on cherche combien de fois la longueur d'un centimètre tient dans 60 m",
      "on agrandit : on multiplie 60 par l'échelle",
      "on garde 60, en changeant seulement l'unité",
      "cela dépend de la taille de la feuille, pas de l'échelle",
    ],
    expected: [
      "on réduit : on cherche combien de fois la longueur d'un centimètre tient dans 60 m",
    ],
    comparator: "mcq_exact",
    hint: "Le dessin est-il plus grand ou plus petit que le terrain ?",
    explanation: ex(
      "de la réalité vers le plan, on réduit toujours : c'est le sens inverse de la lecture d'une carte.",
      "on divise la longueur réelle par ce que représente 1 cm.",
      "Un terrain de 60 m ne tient sur une feuille qu'une fois réduit. Si 1 cm représente 10 m, on cherche combien de fois 10 m tiennent dans 60 m : 60 ÷ 10 = 6, donc 6 cm. Multiplier donnerait 600 cm, soit six mètres de papier.",
      "on réduit, donc on divise."
    ),
    tags: ["prop_echelle", "plan", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "6e_echelle_plan_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 3,
    theme: "neutral",
    hint: "De la réalité vers le plan : on réduit.",
    tags: ["prop_echelle", "plan", "template"],
    // 06/10 : un document de la table × un objet × quatre tournures ; le résultat peut être un demi-cm.
    generate: () => {
      const { d, P, k, cm, reel, docTxt, objet } = tirerDoc(true);
      const text = pick([
        `Sur ${docTxt}, 1 cm représente ${k} ${d.u}. En vrai, ${objet} mesure ${nombre(reel)} ${d.u}. Quelle longueur faut-il tracer sur ${d.court}, en cm ?`,
        `${P.n} dessine ${docTxt}, où 1 cm représente ${k} ${d.u}. ${cap(objet)} mesure ${nombre(reel)} ${d.u} en réalité. Combien de centimètres doit-${il(P)} tracer ?`,
        `En réalité, ${objet} mesure ${nombre(reel)} ${d.u}. Sur ${docTxt}, 1 cm représente ${k} ${d.u}. Quelle est sa longueur sur ${d.court}, en cm ?`,
        `Sur ${docTxt} (1 cm pour ${k} ${d.u}), quelle longueur occupe ${objet}, qui mesure ${nombre(reel)} ${d.u} en vrai ? Réponds en cm.`,
      ]);
      return {
        text,
        format: "short",
        expected: [`${nombre(cm)} cm`, nombre(cm)],
        comparator: "number_equal",
        explanation: ex(
          "de la réalité vers le plan, on réduit.",
          "on cherche combien de fois la longueur correspondant à 1 cm tient dans la longueur réelle.",
          `1 cm représente ${k} ${d.u}. Dans ${nombre(reel)} ${d.u}, il y a ${nombre(reel)} ÷ ${k} = ${nombre(cm)} fois ${k} ${d.u}. Il faut donc tracer ${nombre(cm)} cm.`,
          `${nombre(cm)} cm sur ${d.court}.`
        ),
        canvas: versLePlan(`1 cm ↔ ${k} ${d.u}`, `${nombre(reel)} ${d.u}`, "Longueur sur le plan ?"),
      };
    },
  },
  {
    kind: "template",
    id: "6e_echelle_plan_tpl_fraction",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 4,
    theme: "neutral",
    hint: "Convertis d'abord les mètres en centimètres, puis divise par le nombre de l'échelle.",
    tags: ["prop_echelle", "plan", "template", "fraction"],
    generate: () => {
      const e = pick(ECH_NUM);
      const P = pick(PRENOMS);
      const objet = pick(e.objets);
      const c = randomInt(2, e.cmMax) - (Math.random() < 0.3 ? 0.5 : 0);
      const enCm = c * e.n;
      const m = enCm / 100;
      const text = pick([
        `${cap(e.doc(P))} est à ${echNum(e.n, e.court)}. En vrai, ${objet} mesure ${nombre(m)} m. Quelle est sa longueur sur ${e.court}, en cm ?`,
        `Sur ${e.doc(P)}, à ${echNum(e.n, e.court)}, combien de centimètres faut-il pour ${objet}, qui mesure ${nombre(m)} m en vrai ?`,
        `En réalité, ${objet} mesure ${nombre(m)} m. L’échelle ${du(e.court)} est 1/${e.n} : 1 cm sur ${e.court} représente ${e.n} cm en vrai. Quelle longueur faut-il tracer, en cm ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [`${nombre(c)} cm`, nombre(c)],
        comparator: "number_equal",
        explanation: ex(
          `l'échelle 1/${e.n} signifie 1 cm sur ${e.court} pour ${e.n} cm en réalité.`,
          `on convertit la longueur réelle en cm, puis on cherche combien de fois ${e.n} cm y tiennent.`,
          `${nombre(m)} m = ${enCm} cm. ${enCm} ÷ ${e.n} = ${nombre(c)}. Il faut tracer ${nombre(c)} cm.`,
          `${nombre(c)} cm sur ${e.court}.`
        ),
        canvas: versLePlan(`1/${e.n}`, `${nombre(m)} m`, "Longueur sur le plan ?"),
      };
    },
  },
  {
    kind: "template",
    id: "6e_echelle_plan_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_distance_plan",
    difficulty: 4,
    theme: "neutral",
    hint: "Explique le sens, puis la méthode, sans produit en croix.",
    tags: ["prop_echelle", "plan", "template", "ouverte"],
    // 06/10 : trois questions ouvertes, chacune sur un document et des nombres tirés.
    generate: () => {
      let t = tirerDoc(true);
      while (t.k === 1) t = tirerDoc(true);
      const { d, P, k, cm, reel, docTxt, objet } = t;
      // Pour la question « nombre à virgule », une mesure qui tombe sur un demi-cm.
      const cmDemi = Number.isInteger(cm) ? cm + 0.5 : cm;
      const reelDemi = cmDemi * k;
      // 06/10 (coordinateur) : un nombre → réponse courte avec unité ; une explication → QCM.
      const cas: CasFerme[] = [
        {
          q: `Sur ${docTxt}, 1 cm représente ${k} ${d.u}. En vrai, ${objet} mesure ${nombre(reel)} ${d.u}. ${P.n} veut en faire le dessin. Quelle longueur doit-${il(P)} tracer sur ${d.court}, en cm ?`,
          nombre: { v: nombre(cm), u: "cm" },
          r: `Je cherche combien de fois ${k} ${d.u} tiennent dans ${nombre(reel)} ${d.u} : ${nombre(reel)} ÷ ${k} = ${nombre(cm)}. Il faut tracer ${nombre(cm)} cm. On passe du terrain au papier : on réduit, donc on divise.`,
        },
        {
          q: `Sur ${docTxt}, 1 cm représente ${k} ${d.u}. ${cap(objet)} mesure ${nombre(reelDemi)} ${d.u} en vrai : sur ${d.court}, cela fait ${nombre(cmDemi)} cm. Est-il normal de trouver un nombre à virgule ? Choisis la bonne réponse.`,
          qcm: {
            bonne: `oui : ${nombre(reelDemi)} n'est pas un multiple de ${k}, et on trace ${nombre(cmDemi)} cm avec une règle en millimètres`,
            leurres: [
              `non : il faut arrondir à ${Math.floor(cmDemi)} cm`,
              "non : un plan ne contient que des nombres entiers",
              "non : il fallait multiplier au lieu de diviser",
            ],
          },
          r: `Rien n'oblige la longueur réelle à être un multiple exact de ${k} ${d.u}. Ici ${nombre(reelDemi)} ÷ ${k} = ${nombre(cmDemi)} : on trace ${nombre(cmDemi)} cm, ce qu'une règle graduée en millimètres permet très bien. Arrondir fausserait le dessin.`,
        },
        {
          q: `Sur ${docTxt}, 1 cm représente ${k} ${d.u}. ${P.n} pense ${que(objet)} (${nombre(reel)} ${d.u} en vrai) doit mesurer ${nombre(reel * k)} cm sur ${d.court}. Quelle est son erreur ?`,
          qcm: {
            bonne: `${il(P)} a multiplié au lieu de diviser : il faut tracer ${nombre(cm)} cm`,
            leurres: [`${il(P)} a oublié de convertir en mètres`, "aucune erreur, le calcul est juste", `${il(P)} aurait dû ajouter ${k} cm`],
          },
          r: `${nombre(reel)} × ${k} = ${nombre(reel * k)} : ${P.n} a multiplié au lieu de diviser. Or le dessin est plus petit que la réalité. Il fallait faire ${nombre(reel)} ÷ ${k} = ${nombre(cm)} cm.`,
        },
      ];
      const c = cas[randomInt(0, cas.length - 1)];
      return {
        text: c.q,
        ...fermer(c),
        explanation: ex(
          "de la réalité vers le plan, on réduit.",
          "on divise par ce que représente 1 cm, sans jamais poser de produit en croix.",
          c.r,
          "on garde le raisonnement, il vaut pour tout plan."
        ),
      };
    },
  },

  // =========================
  // ECHELLE_DEFI
  // =========================
  {
    kind: "fixed",
    id: "6e_echelle_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Sur un plan, une longueur réelle de 12 m est représentée par 3 cm. Que représente 1 cm sur ce plan, en mètres ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "C'est le retour à l'unité : que vaut UN centimètre ?",
    explanation: ex(
      "le retour à l'unité consiste à chercher ce que vaut UNE unité avant de traiter le reste.",
      "on divise la longueur réelle par le nombre de centimètres du plan.",
      "3 cm représentent 12 m. Un centimètre en représente donc trois fois moins : 12 ÷ 3 = 4 m. L'échelle du plan est « 1 cm pour 4 m », et on peut désormais traduire n'importe quelle longueur.",
      "1 cm représente 4 m."
    ),
    tags: ["prop_echelle", "defi", "canvas", "short"],
    canvas: correspondance("1 cm ↔ ?", "3 cm", "12 m", "Que vaut 1 cm ?"),
  },
  {
    kind: "fixed",
    id: "6e_echelle_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un terrain rectangulaire mesure 40 m sur 20 m. Sur un plan où 1 cm représente 5 m, quel est le PÉRIMÈTRE du rectangle dessiné, en cm ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Réduis chaque côté d'abord, puis fais le tour.",
    explanation: ex(
      "chaque longueur du plan s'obtient en réduisant la longueur réelle correspondante.",
      "on convertit les deux côtés, puis on calcule le périmètre du dessin.",
      "40 ÷ 5 = 8 cm et 20 ÷ 5 = 4 cm : le rectangle dessiné mesure 8 cm sur 4 cm. Son périmètre vaut (8 + 4) × 2 = 24 cm. On peut vérifier autrement : le périmètre réel est (40 + 20) × 2 = 120 m, et 120 ÷ 5 = 24 cm — les longueurs étant toutes réduites de la même façon, le périmètre l'est aussi.",
      "le périmètre du dessin est de 24 cm."
    ),
    tags: ["prop_echelle", "defi", "short"],
  },
  {
    kind: "template",
    id: "6e_echelle_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Retour à l'unité : cherche d'abord ce que vaut 1 cm.",
    tags: ["prop_echelle", "defi", "template"],
    // 06/10 : retour à l'unité — que vaut 1 cm ? ou, en deux temps, que valent c2 cm ?
    generate: () => {
      for (;;) {
        const { d, P, k, docTxt, objet } = tirerDoc();
        const c = randomInt(2, 5);
        const c2 = randomInt(2, d.cmMax);
        if (c2 % c === 0 || c % c2 === 0) continue;
        const R = c * k;
        const motU = d.u === "m" ? "mètres" : "kilomètres";
        const versUn = Math.random() < 0.5;
        const text = versUn
          ? pick([
              `Sur ${docTxt}, ${c} cm représentent ${nombre(R)} ${d.u} en vrai. Que représente 1 cm, en ${d.u} ?`,
              `${P.n} lit sur ${docTxt} : « ${c} cm pour ${nombre(R)} ${d.u} ». Quelle est l'échelle : 1 cm pour combien de ${motU} ?`,
              `Sur ${docTxt}, ${c} cm correspondent à ${nombre(R)} ${d.u}. Combien de ${motU} représente 1 cm ?`,
            ])
          : pick([
              `Sur ${docTxt}, ${c} cm représentent ${nombre(R)} ${d.u}. ${cap(objet)} mesure ${c2} cm sur ${d.court}. Quelle est sa longueur réelle, en ${d.u} ?`,
              `${P.n} lit sur ${docTxt} : « ${c} cm pour ${nombre(R)} ${d.u} ». Combien de ${motU} représentent ${c2} cm ?`,
            ]);
        const y = versUn ? k : c2 * k;
        return {
          text,
          format: "short",
          expected: [`${nombre(y)} ${d.u}`, nombre(y)],
          comparator: "number_equal",
          explanation: ex(
            "le retour à l'unité consiste à chercher ce que vaut UNE unité avant de traiter le reste.",
            "on divise la longueur réelle par le nombre de centimètres, puis on multiplie si besoin.",
            `${c} cm représentent ${nombre(R)} ${d.u}. Un seul centimètre en représente ${c} fois moins : ${nombre(R)} ÷ ${c} = ${nombre(k)} ${d.u}.` +
              (versUn ? "" : ` Pour ${c2} cm : ${c2} × ${nombre(k)} = ${nombre(y)} ${d.u}.`),
            versUn ? `1 cm représente ${nombre(k)} ${d.u}.` : `${c2} cm représentent ${nombre(y)} ${d.u}.`
          ),
          canvas: correspondance("1 cm ↔ ?", `${c} cm`, `${nombre(R)} ${d.u}`, versUn ? "Que vaut 1 cm ?" : `Et ${c2} cm ?`),
        };
      }
    },
  },
  {
    kind: "template",
    id: "6e_echelle_defi_tpl_perimetre",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Toutes les longueurs sont réduites de la même façon : le tour du rectangle aussi.",
    tags: ["prop_echelle", "defi", "template", "perimetre"],
    generate: () => {
      const TERRAINS = ["Un potager", "Une cour", "Un enclos à chèvres", "Une piscine", "Un parking", "Un jardin", "Une salle de sport", "Un terrain de basket", "Une prairie", "Un bassin"];
      const t = pick(TERRAINS);
      const P = pick(PRENOMS);
      const k = pick([2, 4, 5, 10]);
      const a = randomInt(3, 12);
      const b = randomInt(2, a - 1);
      const versPlan = Math.random() < 0.5;
      const per = 2 * (a + b);
      const text = versPlan
        ? pick([
            `${t} rectangulaire mesure ${a * k} m sur ${b * k} m. ${P.n} en fait un dessin avec 1 cm pour ${k} m. Quel est le tour du rectangle dessiné, en cm ?`,
            `${P.n} dessine à l'échelle « 1 cm pour ${k} m » ${t.toLowerCase()} rectangulaire de ${a * k} m sur ${b * k} m. Quel est le périmètre du dessin, en cm ?`,
          ])
        : pick([
            `Sur un plan où 1 cm représente ${k} m, ${t.toLowerCase()} rectangulaire mesure ${a} cm sur ${b} cm. Quel est son périmètre réel, en m ?`,
            `${P.n} mesure sur un plan ${t.toLowerCase()} rectangulaire : ${a} cm sur ${b} cm. Sur ce plan, 1 cm représente ${k} m. Combien de mètres de clôture faut-il pour en faire le tour ?`,
          ]);
      const y = versPlan ? per : per * k;
      return {
        text,
        format: "short",
        expected: versPlan ? [`${y} cm`, String(y)] : [`${y} m`, String(y)],
        comparator: "number_equal",
        explanation: ex(
          "chaque longueur du plan s'obtient en réduisant la longueur réelle de la même façon.",
          "on convertit les deux côtés, puis on calcule le périmètre (le tour du rectangle).",
          versPlan
            ? `${a * k} ÷ ${k} = ${a} cm et ${b * k} ÷ ${k} = ${b} cm. Le tour du dessin : (${a} + ${b}) × 2 = ${per} cm.`
            : `${a} cm représentent ${a} × ${k} = ${a * k} m et ${b} cm représentent ${b * k} m. Le tour réel : (${a * k} + ${b * k}) × 2 = ${per * k} m.`,
          versPlan ? `le périmètre du dessin est de ${per} cm.` : `le périmètre réel est de ${per * k} m.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "6e_echelle_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_echelle",
    microId: "echelle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Explique la stratégie, pas seulement le résultat.",
    tags: ["prop_echelle", "defi", "template", "ouverte"],
    // 06/10 : trois questions ouvertes, chacune sur un document et des nombres tirés.
    generate: () => {
      let t = tirerDoc();
      while (t.k === 1) t = tirerDoc();
      const { d, P, k, docTxt } = t;
      const c = randomInt(2, 5);
      let c2 = randomInt(2, d.cmMax);
      while (c2 % c === 0 || c % c2 === 0) c2 = randomInt(2, Math.max(d.cmMax, 7));
      const R = c * k;
      const kt = pick([2, 4, 5, 10]);
      const a = randomInt(3, 12);
      const b = randomInt(2, a - 1);
      const terrain = pick(["un potager", "une cour", "un enclos", "un jardin", "un parking", "une prairie"]);
      const cas: CasFerme[] = [
        {
          q: `Sur ${docTxt}, ${c} cm représentent ${nombre(R)} ${d.u}. Passe par l'unité, puis trouve ce que représentent ${c2} cm, en ${d.u}.`,
          nombre: { v: nombre(c2 * k), u: d.u },
          r: `Je passe par l'unité. ${c} cm valent ${nombre(R)} ${d.u}, donc 1 cm vaut ${c} fois moins : ${nombre(R)} ÷ ${c} = ${nombre(k)} ${d.u}. Puis ${c2} cm valent ${c2} × ${nombre(k)} = ${nombre(c2 * k)} ${d.u}. Le retour à l'unité donne une règle réutilisable.`,
        },
        {
          q: `${cap(terrain)} de ${a * kt} m sur ${b * kt} m est dessiné à l'échelle 1 cm pour ${kt} m. Quelle méthode donne le périmètre du dessin ?`,
          qcm: {
            bonne: `réduire chaque côté (÷ ${kt}), puis faire le tour : ${2 * (a + b)} cm`,
            leurres: [
              `faire le tour en mètres et garder ce nombre : ${2 * (a + b) * kt} cm`,
              `multiplier chaque côté par ${kt}, puis faire le tour : ${2 * (a + b) * kt * kt} cm`,
              `additionner les deux côtés réduits : ${a + b} cm`,
            ],
          },
          r: `Première façon : je réduis chaque côté, ${a * kt} ÷ ${kt} = ${a} cm et ${b * kt} ÷ ${kt} = ${b} cm, puis je fais le tour : (${a} + ${b}) × 2 = ${2 * (a + b)} cm. Seconde façon : le périmètre réel, (${a * kt} + ${b * kt}) × 2 = ${2 * (a + b) * kt} m, que je réduis : ${2 * (a + b) * kt} ÷ ${kt} = ${2 * (a + b)} cm. Toutes les longueurs sont réduites de la même façon.`,
        },
        {
          q: `${P.n} lit sur ${docTxt} : « ${c} cm pour ${nombre(R)} ${d.u} ». Que vaut 1 cm sur ce document, en ${d.u} ?`,
          nombre: { v: nombre(k), u: d.u },
          r: `${c} cm valent ${nombre(R)} ${d.u}. Un seul centimètre vaut ${c} fois moins : ${nombre(R)} ÷ ${c} = ${nombre(k)} ${d.u}. L'échelle est « 1 cm pour ${nombre(k)} ${d.u} ».`,
        },
      ];
      const choisi = cas[randomInt(0, cas.length - 1)];
      return {
        text: choisi.q,
        ...fermer(choisi),
        explanation: ex(
          "une échelle se traite par retour à l'unité ou par linéarité.",
          "on cherche ce que vaut 1 cm, puis on multiplie ou on divise selon le sens.",
          choisi.r,
          "on garde le raisonnement, il vaut pour tout plan et toute maquette."
        ),
      };
    },
  },
];
