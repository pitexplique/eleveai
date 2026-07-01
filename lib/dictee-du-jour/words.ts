// La dictée du jour — 1 mot à écouter et écrire, qui change CHAQUE JOUR.
// Objectif : un rituel quotidien (« comme un journal ») pour faire revenir les
// élèves. Le tirage est DÉTERMINISTE par date → tout le monde a le même mot le
// même jour (effet « édition du jour »), et il change à minuit.
//
// Audio : lecture par la synthèse vocale du navigateur (speakText), avec la
// bonne voix selon `lang` — donc AUCUN mp3 à produire. On choisit des mots à
// l'orthographe piégeuse : c'est là qu'est la valeur d'une dictée.
//
// Rotation des matières : la liste finale est ENTRELACÉE (round-robin) pour
// qu'un jour donné tombe sur une matière différente de la veille.

export type DicteeLang = "fr" | "en" | "es";

export type DicteeMot = {
  matiere: string; // libellé affiché
  lang: DicteeLang; // voix de lecture
  mot: string; // le mot à écrire (accents compris — ils comptent !)
  indice: string; // sens / définition, révélé en aide et à la correction
};

// ── Français ─────────────────────────────────────────────────
const FRANCAIS: DicteeMot[] = [
  { matiere: "Français", lang: "fr", mot: "aujourd'hui", indice: "Le jour où l'on est." },
  { matiere: "Français", lang: "fr", mot: "parmi", indice: "Au milieu de (jamais de « s »)." },
  { matiere: "Français", lang: "fr", mot: "quelconque", indice: "Ordinaire, sans importance particulière." },
  { matiere: "Français", lang: "fr", mot: "malgré", indice: "En dépit de." },
  { matiere: "Français", lang: "fr", mot: "longtemps", indice: "Pendant une longue durée." },
  { matiere: "Français", lang: "fr", mot: "accueil", indice: "Manière de recevoir quelqu'un." },
  { matiere: "Français", lang: "fr", mot: "rythme", indice: "Le mouvement régulier d'une musique." },
  { matiere: "Français", lang: "fr", mot: "professeur", indice: "Celui qui enseigne." },
  { matiere: "Français", lang: "fr", mot: "deuxième", indice: "Juste après le premier." },
  { matiere: "Français", lang: "fr", mot: "cauchemar", indice: "Un mauvais rêve (pas de « d » !)." },
];

// ── Maths ────────────────────────────────────────────────────
const MATHS: DicteeMot[] = [
  { matiere: "Maths", lang: "fr", mot: "hypoténuse", indice: "Le plus grand côté d'un triangle rectangle." },
  { matiere: "Maths", lang: "fr", mot: "quotient", indice: "Le résultat d'une division." },
  { matiere: "Maths", lang: "fr", mot: "parallélépipède", indice: "Un solide type « boîte »." },
  { matiere: "Maths", lang: "fr", mot: "périmètre", indice: "Le tour d'une figure." },
  { matiere: "Maths", lang: "fr", mot: "symétrie", indice: "Répétition en miroir." },
  { matiere: "Maths", lang: "fr", mot: "numérateur", indice: "Le nombre du haut d'une fraction." },
  { matiere: "Maths", lang: "fr", mot: "losange", indice: "Quadrilatère aux 4 côtés égaux." },
  { matiere: "Maths", lang: "fr", mot: "pourcentage", indice: "Une proportion sur cent." },
  { matiere: "Maths", lang: "fr", mot: "diagonale", indice: "Relie deux sommets opposés." },
  { matiere: "Maths", lang: "fr", mot: "multiplication", indice: "L'opération « fois »." },
];

// ── Anglais (on entend le mot anglais, on l'écrit) ───────────
const ANGLAIS: DicteeMot[] = [
  { matiere: "Anglais", lang: "en", mot: "Wednesday", indice: "mercredi" },
  { matiere: "Anglais", lang: "en", mot: "beautiful", indice: "beau / magnifique" },
  { matiere: "Anglais", lang: "en", mot: "because", indice: "parce que" },
  { matiere: "Anglais", lang: "en", mot: "friend", indice: "ami" },
  { matiere: "Anglais", lang: "en", mot: "weather", indice: "le temps (météo)" },
  { matiere: "Anglais", lang: "en", mot: "always", indice: "toujours" },
  { matiere: "Anglais", lang: "en", mot: "tomorrow", indice: "demain" },
  { matiere: "Anglais", lang: "en", mot: "enough", indice: "assez / suffisamment" },
  { matiere: "Anglais", lang: "en", mot: "through", indice: "à travers" },
  { matiere: "Anglais", lang: "en", mot: "different", indice: "différent" },
];

// ── Espagnol (on entend le mot espagnol, on l'écrit) ─────────
const ESPAGNOL: DicteeMot[] = [
  { matiere: "Espagnol", lang: "es", mot: "corazón", indice: "cœur (avec l'accent !)" },
  { matiere: "Espagnol", lang: "es", mot: "mañana", indice: "demain (avec le ñ)" },
  { matiere: "Espagnol", lang: "es", mot: "ciudad", indice: "ville" },
  { matiere: "Espagnol", lang: "es", mot: "amarillo", indice: "jaune" },
  { matiere: "Espagnol", lang: "es", mot: "trabajar", indice: "travailler" },
  { matiere: "Espagnol", lang: "es", mot: "familia", indice: "famille" },
  { matiere: "Espagnol", lang: "es", mot: "gracias", indice: "merci" },
  { matiere: "Espagnol", lang: "es", mot: "pequeño", indice: "petit (avec le ñ)" },
  { matiere: "Espagnol", lang: "es", mot: "escuela", indice: "école" },
  { matiere: "Espagnol", lang: "es", mot: "jueves", indice: "jeudi" },
];

// ── Histoire (mots français) ─────────────────────────────────
const HISTOIRE: DicteeMot[] = [
  { matiere: "Histoire", lang: "fr", mot: "Révolution", indice: "Grand bouleversement, ex. 1789." },
  { matiere: "Histoire", lang: "fr", mot: "République", indice: "Un régime politique sans roi." },
  { matiere: "Histoire", lang: "fr", mot: "Antiquité", indice: "L'époque des Grecs et des Romains." },
  { matiere: "Histoire", lang: "fr", mot: "préhistoire", indice: "Avant l'invention de l'écriture." },
  { matiere: "Histoire", lang: "fr", mot: "monarchie", indice: "Un gouvernement dirigé par un roi." },
  { matiere: "Histoire", lang: "fr", mot: "démocratie", indice: "Le pouvoir appartient au peuple." },
  { matiere: "Histoire", lang: "fr", mot: "chevalier", indice: "Un guerrier du Moyen Âge, à cheval." },
  { matiere: "Histoire", lang: "fr", mot: "cathédrale", indice: "Une très grande église." },
];

// ── Géographie (mots français) ───────────────────────────────
const GEOGRAPHIE: DicteeMot[] = [
  { matiere: "Géographie", lang: "fr", mot: "continent", indice: "L'Afrique, l'Europe… en sont." },
  { matiere: "Géographie", lang: "fr", mot: "équateur", indice: "La ligne imaginaire au milieu du globe." },
  { matiere: "Géographie", lang: "fr", mot: "hémisphère", indice: "Une moitié de la Terre (nord ou sud)." },
  { matiere: "Géographie", lang: "fr", mot: "péninsule", indice: "Une terre entourée d'eau sur trois côtés." },
  { matiere: "Géographie", lang: "fr", mot: "archipel", indice: "Un groupe d'îles." },
  { matiere: "Géographie", lang: "fr", mot: "frontière", indice: "La limite entre deux pays." },
  { matiere: "Géographie", lang: "fr", mot: "altitude", indice: "La hauteur au-dessus de la mer." },
  { matiere: "Géographie", lang: "fr", mot: "métropole", indice: "Une grande ville principale." },
];

// ── Écologie (mots français) ─────────────────────────────────
const ECOLOGIE: DicteeMot[] = [
  { matiere: "Écologie", lang: "fr", mot: "biodiversité", indice: "La variété des espèces vivantes." },
  { matiere: "Écologie", lang: "fr", mot: "écosystème", indice: "Un milieu + les êtres vivants qui y vivent." },
  { matiere: "Écologie", lang: "fr", mot: "recyclage", indice: "Transformer les déchets pour les réutiliser." },
  { matiere: "Écologie", lang: "fr", mot: "réchauffement", indice: "La hausse des températures du climat." },
  { matiere: "Écologie", lang: "fr", mot: "atmosphère", indice: "La couche de gaz autour de la Terre." },
  { matiere: "Écologie", lang: "fr", mot: "pollution", indice: "La salissure de l'environnement." },
  { matiere: "Écologie", lang: "fr", mot: "oxygène", indice: "Le gaz que l'on respire." },
  { matiere: "Écologie", lang: "fr", mot: "planète", indice: "La Terre en est une." },
];

// Entrelacement round-robin : chaque jour tombe sur une matière différente
// (Français → Maths → Anglais → Espagnol → Histoire → Géographie → Écologie → …).
function entrelacer(groupes: DicteeMot[][]): DicteeMot[] {
  const out: DicteeMot[] = [];
  const max = Math.max(...groupes.map((g) => g.length));
  for (let i = 0; i < max; i++) {
    for (const g of groupes) if (i < g.length) out.push(g[i]);
  }
  return out;
}

export const DICTEE_MOTS: DicteeMot[] = entrelacer([
  FRANCAIS,
  MATHS,
  ANGLAIS,
  ESPAGNOL,
  HISTOIRE,
  GEOGRAPHIE,
  ECOLOGIE,
]);

// Numéro de jour stable (jours depuis l'époque, en UTC pour éviter les demi-jours).
function daySerial(date: Date): number {
  return Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000
  );
}

/** Index déterministe du mot du jour (même mot pour tous, ce jour-là). */
export function motDuJourIndex(date: Date, total = DICTEE_MOTS.length): number {
  const s = daySerial(date);
  return ((s % total) + total) % total;
}

/** Le mot du jour pour une date donnée. */
export function getMotDuJour(date: Date): DicteeMot {
  return DICTEE_MOTS[motDuJourIndex(date)];
}

/** Comparaison « dictée » : casse et espaces ignorés, mais ACCENTS conservés. */
export function reponseCorrecte(saisie: string, mot: string): boolean {
  const norm = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");
  return norm(saisie) === norm(mot);
}
