import type { GenerateursFrancais, QuestionFrancais } from "./types";

// LA COMPRÉHENSION DE 6e : GÉNÉRATEURS À CORRECTEUR (05/10/2026, voir types.ts).
// Famille : comprehension_reprises, comprehension_documents,
// comprehension_textes, fluence_lecture, lecture_voix_haute.
//
// ⛔ La plainte : « Léa observait le margouillat. Il ne bougeait plus. Que
// reprend « Il » ? » revenait sans cesse. Ici, la phrase est composée à partir
// de tables (prénoms × êtres et objets × verbes), et le correcteur relit le
// TEXTE : le pronom ne doit pouvoir reprendre qu'UN seul groupe.

/* ─────────────────────────── outils ─────────────────────────── */

const pick = <T,>(a: readonly T[]): T => a[Math.floor(Math.random() * a.length)];
function melange<T>(a: readonly T[]): T[] {
  const b = [...a];
  for (let i = b.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [b[i], b[j]] = [b[j], b[i]];
  }
  return b;
}
/** Tire k éléments distincts. */
const tirerN = <T,>(a: readonly T[], k: number): T[] => melange(a).slice(0, k);
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const norm = (s: string) => s.trim().toLowerCase();
const echapper = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Le mot (ou groupe) figure-t-il dans le texte, en mot entier ? */
const contient = (texte: string, mot: string, casse = false) =>
  new RegExp(`(?<![\\p{L}])${echapper(mot)}(?![\\p{L}])`, casse ? "u" : "iu").test(texte);
/** Position du mot entier dans le texte (−1 s'il n'y est pas). */
const position = (texte: string, mot: string, casse = false) => {
  const m = new RegExp(`(?<![\\p{L}])${echapper(mot)}(?![\\p{L}])`, casse ? "u" : "iu").exec(texte);
  return m ? m.index : -1;
};
/** « de Léa », « d'Inès ». */
const de = (nom: string) => (/^[aeiouéèêàâîôûœ]/i.test(nom) ? `d'${nom}` : `de ${nom}`);
/** L'extrait cité : entre le premier « et le premier ». */
const extrait = (texte: string) => {
  const a = texte.indexOf("« ");
  const b = texte.indexOf(" »", a);
  return a < 0 || b < 0 ? "" : texte.slice(a + 2, b);
};
/** Le dernier « … » de la question (le mot interrogé). */
const dernierCite = (texte: string) => {
  const m = [...texte.matchAll(/« ([^«»]+) »/g)];
  return m.length ? m[m.length - 1][1] : "";
};
/** Choix uniques (la bonne réponse est retirée des leurres). */
const leurresDistincts = (correct: string, ws: string[], max = 3) => {
  const vus = new Set([norm(correct)]);
  const out: string[] = [];
  for (const w of ws) {
    if (!w || vus.has(norm(w))) continue;
    vus.add(norm(w));
    out.push(w);
    if (out.length >= max) break;
  }
  return out;
};

/* ─────────────────────────── tables communes ─────────────────────────── */

type Genre = "m" | "f";
type Nombre = "s" | "p";
type Prenom = { nom: string; g: Genre };

export const PRENOMS: readonly Prenom[] = [
  { nom: "Léa", g: "f" }, { nom: "Inès", g: "f" }, { nom: "Chloé", g: "f" }, { nom: "Aïcha", g: "f" },
  { nom: "Zoé", g: "f" }, { nom: "Sofia", g: "f" }, { nom: "Nora", g: "f" }, { nom: "Maya", g: "f" },
  { nom: "Camille", g: "f" }, { nom: "Yasmine", g: "f" }, { nom: "Emma", g: "f" }, { nom: "Lina", g: "f" },
  { nom: "Mei", g: "f" }, { nom: "Rose", g: "f" },
  { nom: "Noah", g: "m" }, { nom: "Maël", g: "m" }, { nom: "Yanis", g: "m" }, { nom: "Kenji", g: "m" },
  { nom: "Lucas", g: "m" }, { nom: "Hugo", g: "m" }, { nom: "Malo", g: "m" }, { nom: "Adam", g: "m" },
  { nom: "Samuel", g: "m" }, { nom: "Ibrahim", g: "m" }, { nom: "Théo", g: "m" }, { nom: "Diego", g: "m" },
  { nom: "Nathan", g: "m" }, { nom: "Elio", g: "m" },
];
const filles = PRENOMS.filter((p) => p.g === "f");
const garcons = PRENOMS.filter((p) => p.g === "m");
const ilElle = (g: Genre) => (g === "f" ? "elle" : "il");

/* ═══════════════════ comprehension_reprises ═══════════════════ */

/** Un être ou un objet que l'on peut reprendre par un pronom ou un autre nom. */
type Entite = {
  gn: string; // tel qu'il est écrit dans la phrase : « le margouillat »
  g: Genre;
  n: Nombre;
  /** Reprises nominales : un AUTRE nom qui désigne la même chose. */
  reprises: string[];
  /** Ce que fait l'enfant (présent, 3e pers. du singulier) : « observe ». */
  verbes: string[];
  /** Ce que fait l'entité ensuite (présent, accordé à son nombre). */
  etats: string[];
  /** Verbes après un pronom complément (« Elle le photographie ») : jamais de voyelle initiale. */
  verbesObj: string[];
};

export const ENTITES: readonly Entite[] = [
  { gn: "le margouillat", g: "m", n: "s", reprises: ["le petit lézard", "l'animal"], verbes: ["observe", "regarde", "suit des yeux"], etats: ["ne bouge plus", "se chauffe au soleil", "grimpe le long du mur"], verbesObj: ["photographie", "dessine", "montre à son frère"] },
  { gn: "la tortue", g: "f", n: "s", reprises: ["l'animal", "la petite bête"], verbes: ["observe", "nourrit", "regarde"], etats: ["avance lentement", "rentre la tête", "mange une feuille de salade"], verbesObj: ["prend dans ses mains", "pose dans l'herbe", "dessine"] },
  { gn: "le chaton", g: "m", n: "s", reprises: ["le petit chat", "l'animal"], verbes: ["caresse", "observe", "appelle"], etats: ["joue avec une pelote", "s'endort", "miaule doucement"], verbesObj: ["prend dans ses bras", "porte jusqu'au panier", "dessine"] },
  { gn: "les poussins", g: "m", n: "p", reprises: ["les petits oiseaux", "les jeunes oiseaux"], verbes: ["observe", "nourrit", "compte"], etats: ["piaillent", "picorent des graines", "se serrent les uns contre les autres"], verbesObj: ["photographie", "compte encore", "nourrit"] },
  { gn: "la baleine", g: "f", n: "s", reprises: ["l'animal", "le géant des mers"], verbes: ["observe", "aperçoit", "photographie"], etats: ["souffle un jet d'eau", "plonge sous la surface", "sort de l'eau"], verbesObj: ["photographie", "montre à son père", "suit des yeux"] },
  { gn: "les dauphins", g: "m", n: "p", reprises: ["les animaux", "les mammifères marins"], verbes: ["observe", "aperçoit", "regarde"], etats: ["sautent hors de l'eau", "nagent près du bateau", "jouent dans les vagues"], verbesObj: ["photographie", "suit des yeux", "montre à sa sœur"] },
  { gn: "le vieux chêne", g: "m", n: "s", reprises: ["l'arbre", "cet arbre"], verbes: ["dessine", "observe", "mesure"], etats: ["a plus de cent ans", "perd ses feuilles", "domine le jardin"], verbesObj: ["dessine", "photographie", "montre à sa mère"] },
  { gn: "la fusée", g: "f", n: "s", reprises: ["l'engin", "la maquette"], verbes: ["construit", "lance", "peint"], etats: ["décolle dans un nuage de fumée", "monte très haut", "retombe dans l'herbe"], verbesObj: ["pose sur la rampe", "peint en rouge", "range dans sa chambre"] },
  { gn: "le cerf-volant", g: "m", n: "s", reprises: ["le jouet", "l'engin de papier"], verbes: ["fait voler", "répare", "tient"], etats: ["monte dans le ciel", "danse dans le vent", "plonge vers le sol"], verbesObj: ["répare", "plie", "range dans le placard"] },
  { gn: "la guitare", g: "f", n: "s", reprises: ["l'instrument", "la vieille guitare"], verbes: ["accorde", "essaie", "nettoie"], etats: ["sonne faux", "a perdu une corde", "brille sous la lampe"], verbesObj: ["range", "pose sur le lit", "prête à son cousin"] },
  { gn: "les crêpes", g: "f", n: "p", reprises: ["les galettes dorées", "ces galettes"], verbes: ["prépare", "fait cuire", "retourne"], etats: ["dorent dans la poêle", "sentent bon", "refroidissent sur l'assiette"], verbesObj: ["partage", "saupoudre de sucre", "porte à table"] },
  { gn: "le volcan", g: "m", n: "s", reprises: ["la montagne", "le géant de lave"], verbes: ["observe", "photographie", "dessine"], etats: ["fume au loin", "domine la plaine", "gronde sourdement"], verbesObj: ["photographie", "dessine", "montre à son amie"] },
  { gn: "la lune", g: "f", n: "s", reprises: ["l'astre", "le disque blanc"], verbes: ["observe", "dessine", "regarde"], etats: ["brille au-dessus des toits", "se cache derrière un nuage", "éclaire le chemin"], verbesObj: ["photographie", "dessine", "montre à son petit frère"] },
  { gn: "le ballon", g: "m", n: "s", reprises: ["la balle", "le jouet"], verbes: ["lance", "frappe", "gonfle"], etats: ["rebondit très haut", "roule sous un banc", "file vers le but"], verbesObj: ["rattrape", "range dans son sac", "passe à son équipe"] },
  { gn: "les fourmis", g: "f", n: "p", reprises: ["les insectes", "les petites bêtes"], verbes: ["observe", "suit des yeux", "compte"], etats: ["transportent des miettes", "forment une longue file", "creusent un tunnel"], verbesObj: ["photographie", "dessine", "montre à sa classe"] },
  { gn: "la méduse", g: "f", n: "s", reprises: ["l'animal", "la bête transparente"], verbes: ["observe", "aperçoit", "évite"], etats: ["flotte près du bord", "brille dans l'eau", "s'éloigne doucement"], verbesObj: ["photographie", "montre à son père", "dessine"] },
  { gn: "le robot", g: "m", n: "s", reprises: ["la machine", "l'appareil"], verbes: ["programme", "allume", "répare"], etats: ["clignote", "avance tout seul", "lève un bras"], verbesObj: ["pose sur la table", "règle", "montre à la classe"] },
  { gn: "les tournesols", g: "m", n: "p", reprises: ["les fleurs", "les grandes fleurs jaunes"], verbes: ["arrose", "dessine", "observe"], etats: ["tournent vers le soleil", "dépassent la clôture", "penchent sous la pluie"], verbesObj: ["photographie", "dessine", "coupe"] },
  { gn: "la mouette", g: "f", n: "s", reprises: ["l'oiseau", "l'oiseau de mer"], verbes: ["observe", "photographie", "regarde"], etats: ["crie au-dessus du port", "plane au-dessus des vagues", "se pose sur un poteau"], verbesObj: ["photographie", "dessine", "suit des yeux"] },
  { gn: "le hérisson", g: "m", n: "s", reprises: ["le petit animal", "l'animal"], verbes: ["observe", "découvre", "regarde"], etats: ["se roule en boule", "traverse la pelouse", "renifle les feuilles"], verbesObj: ["photographie", "dessine", "laisse partir"] },
  { gn: "les cahiers", g: "m", n: "p", reprises: ["les carnets", "ces cahiers"], verbes: ["range", "distribue", "empile"], etats: ["tombent par terre", "sont couverts de dessins", "glissent sur le bureau"], verbesObj: ["ramasse", "range", "distribue"] },
];

/** Reprises nominales d'une personne, selon son genre. */
const REPRISES_PERSONNE: Record<Genre, string[]> = {
  f: ["la fillette", "la jeune fille", "l'enfant", "la petite"],
  m: ["le garçon", "le jeune garçon", "l'enfant", "le petit"],
};
/** Ce que fait une personne (présent, sans accord de genre). */
const ACTIONS_PERSONNE = [
  "sourit", "retient son souffle", "s'approche doucement", "sort son carnet", "appelle sa mère",
  "rit aux éclats", "ne dit plus rien", "prend une photo", "recule d'un pas", "s'assoit sur un banc",
  "fait signe à son ami", "chuchote un secret", "range son téléphone", "tend la main", "ferme les yeux",
];

/** Le verbe d'une action (« ne bouge plus » → « bouge », « s'endort » → « endort »). */
const verbeDe = (action: string) => action.replace(/^(ne|se) /, "").replace(/^s'/, "").split(" ")[0];
/** Tous les verbes des tables des reprises. */
const VERBES_REPRISES = new Set<string>([
  ...ACTIONS_PERSONNE.map(verbeDe),
  ...ENTITES.flatMap((e) => [...e.verbes, ...e.etats, ...e.verbesObj].map(verbeDe)),
]);
/** ⛔ Relecture du 05/10 : « Malo range les cahiers. Le garçon range son téléphone. »
 *  Un même verbe ne revient pas dans deux phrases de l'extrait. */
function verbesRepetes(ext: string): string[] {
  const vus = new Map<string, number>();
  for (const ph of phrasesDe(ext)) {
    const mots = new Set(ph.replace(/[.,]/g, "").split(" ").map((m) => m.replace(/^[sl]'/, "")).filter((m) => VERBES_REPRISES.has(m)));
    for (const m of mots) vus.set(m, (vus.get(m) ?? 0) + 1);
  }
  return [...vus].filter(([, k]) => k > 1).map(([m]) => `le verbe « ${m} » revient dans deux phrases`);
}

type Groupe = { txt: string; g: Genre; n: Nombre; personne: boolean };
const PRONOMS: Record<string, { g: Genre | null; n: Nombre }> = {
  il: { g: "m", n: "s" }, elle: { g: "f", n: "s" }, ils: { g: "m", n: "p" }, elles: { g: "f", n: "p" },
  le: { g: "m", n: "s" }, la: { g: "f", n: "s" }, les: { g: null, n: "p" },
};
/** Reprise nominale → groupes qu'elle peut désigner (relu par le correcteur). */
const DESIGNE: Map<string, (gr: Groupe) => boolean> = (() => {
  const m = new Map<string, (gr: Groupe) => boolean>();
  for (const g of ["f", "m"] as Genre[])
    for (const r of REPRISES_PERSONNE[g])
      if (r === "l'enfant") m.set(r, (gr) => gr.personne);
      else m.set(r, (gr) => gr.personne && gr.g === g);
  for (const e of ENTITES)
    for (const r of e.reprises) {
      const avant = m.get(r);
      m.set(r, (gr) => (avant ? avant(gr) : false) || norm(gr.txt) === norm(e.gn));
    }
  return m;
})();
const accordPronom = (p: { g: Genre | null; n: Nombre }, gr: Groupe) => gr.n === p.n && (p.g === null || gr.g === p.g);

/** ⛔ Relecture du 05/10 : « Léa sourit à son amie. Elle grimpe… » — « son amie »
 *  est un antécédent possible de « Elle ». Ces groupes (personnes et animaux
 *  des phrases neutres et des indices) comptent comme des groupes du texte. */
const AUTRES_GROUPES: readonly [string, Genre, Nombre][] = [
  ["son amie", "f", "s"], ["sa sœur", "f", "s"], ["sa petite sœur", "f", "s"], ["sa mère", "f", "s"], ["sa grand-mère", "f", "s"],
  ["sa famille", "f", "s"], ["la maraîchère", "f", "s"], ["une archéologue", "f", "s"], ["la marchande", "f", "s"],
  ["sa cousine", "f", "s"], ["sa voisine", "f", "s"], ["sa tante", "f", "s"], ["sa meilleure amie", "f", "s"], ["une patiente", "f", "s"],
  ["une fillette malade", "f", "s"], ["une chienne blessée", "f", "s"], ["sa vieille chienne", "f", "s"], ["une lapine", "f", "s"],
  ["la professeure", "f", "s"], ["la docteure", "f", "s"], ["une pêcheuse", "f", "s"], ["une girafe", "f", "s"], ["sa tortue", "f", "s"],
["une ornithologue", "f", "s"], ["la marchande de fruits", "f", "s"],
  ["son grand-père", "m", "s"], ["son voisin", "m", "s"], ["un garçon malade", "m", "s"], ["un lapin", "m", "s"], ["le maraîcher", "m", "s"],
  ["un archéologue", "m", "s"], ["le chien", "m", "s"],
  ["son ami", "m", "s"], ["son meilleur ami", "m", "s"], ["son frère", "m", "s"], ["son petit frère", "m", "s"], ["son cousin", "m", "s"],
  ["son père", "m", "s"], ["son oncle", "m", "s"], ["le marchand de fruits", "m", "s"], ["un pêcheur", "m", "s"], ["le docteur", "m", "s"],
  ["le professeur", "m", "s"], ["l'arbitre", "m", "s"], ["un patient", "m", "s"], ["un enfant malade", "m", "s"], ["le dentiste", "m", "s"],
  ["le jury", "m", "s"], ["un ornithologue", "m", "s"], ["un chien blessé", "m", "s"], ["un chaton", "m", "s"], ["son chat", "m", "s"],
  ["le chat", "m", "s"], ["son chien", "m", "s"], ["un petit chien", "m", "s"], ["son vieux chien", "m", "s"], ["un hibou", "m", "s"],
  ["un éléphant", "m", "s"], ["le bébé", "m", "s"], ["ses parents", "m", "p"], ["les mariés", "m", "p"], ["ses élèves", "m", "p"],
  ["les supporters", "m", "p"], ["les passagers", "m", "p"], ["les invités", "m", "p"], ["les girafes", "f", "p"],
];

/** Les groupes du lexique présents dans un texte, avant une position. */
function groupesAvant(texte: string, fin: number): Groupe[] {
  const avant = texte.slice(0, fin);
  const out: Groupe[] = [];
  for (const p of PRENOMS) if (contient(avant, p.nom, true)) out.push({ txt: p.nom, g: p.g, n: "s", personne: true });
  for (const [txt, g, n] of AUTRES_GROUPES) if (contient(avant, txt)) out.push({ txt, g, n, personne: true });
  for (const e of ENTITES) if (contient(avant, e.gn)) out.push({ txt: e.gn, g: e.g, n: e.n, personne: false });
  return out;
}
/** Les groupes que peut reprendre la reprise `r` (pronom ou nom). */
function candidats(r: string, groupes: Groupe[]): Groupe[] | null {
  const p = PRONOMS[norm(r)];
  if (p) return groupes.filter((gr) => accordPronom(p, gr));
  const d = DESIGNE.get(norm(r));
  if (d) return groupes.filter(d);
  return null;
}
/** Une reprise doit désigner UN SEUL groupe du texte, et ce doit être la bonne réponse. */
function verifierReprise(ext: string, r: string, pos: number, correct: string | null): string[] {
  const pb: string[] = [];
  if (pos < 0) return [`la reprise « ${r} » n'est pas dans l'extrait`];
  const c = candidats(r, groupesAvant(ext, pos));
  if (!c) return [`« ${r} » n'est ni un pronom ni une reprise connue`];
  if (c.length !== 1) pb.push(`« ${r} » peut reprendre ${c.length} groupes (${c.map((x) => x.txt).join(", ") || "aucun"})`);
  else if (correct !== null && norm(c[0].txt) !== norm(correct)) pb.push(`« ${r} » reprend « ${c[0].txt} », pas « ${correct} »`);
  pb.push(...nombreReprise(r, c));
  return pb;
}
/** Une reprise nominale garde le nombre de ce qu'elle reprend (le verbe s'accorde avec elle). */
function nombreReprise(r: string, c: Groupe[]): string[] {
  if (PRONOMS[norm(r)] || c.length !== 1) return [];
  const pluriel = /^(les|ces) /i.test(r);
  return pluriel !== (c[0].n === "p") ? [`« ${r} » n'a pas le nombre de « ${c[0].txt} »`] : [];
}

const TOURNURES_REPRISE = [
  (r: string) => `Que reprend « ${r} » ?`,
  (r: string) => `Dans ce texte, « ${r} » désigne…`,
  (r: string) => `De qui ou de quoi parle « ${r} » ?`,
  (r: string) => `Quel groupe du texte est remplacé par « ${r} » ?`,
];
const METHODE_PRONOM = "Un pronom reprend un groupe déjà écrit : remonte le texte et cherche un groupe de même genre et de même nombre.";
const METHODE_NOM = "Une reprise nomme autrement ce dont on vient de parler : remonte le texte et cherche ce qu'elle peut désigner.";

/** Le petit texte de deux phrases et la reprise interrogée. */
function texteReprise(): { ext: string; r: string; correct: string; leurres: string[]; pronom: boolean } {
  for (;;) {
    const e = pick(ENTITES);
    // La personne doit différer de l'entité en genre ou en nombre (sinon le pronom hésite).
    const ps = PRENOMS.filter((p) => e.n === "p" || p.g !== e.g);
    const p = pick(ps);
    const s1 = `${p.nom} ${pick(e.verbes)} ${e.gn}.`;
    const pronE = e.n === "p" ? (e.g === "f" ? "Elles" : "Ils") : e.g === "f" ? "Elle" : "Il";
    const pronP = maj(ilElle(p.g));
    const objE = e.n === "p" ? "les" : e.g === "f" ? "la" : "le";
    const forme = pick(["pronomE", "pronomP", "objet", "nomE", "nomP"] as const);
    const absentE = pick(ENTITES.filter((x) => x.gn !== e.gn && x.g === e.g && x.n === e.n)).gn;
    const absentP = pick(PRENOMS.filter((x) => x.g === p.g && x.nom !== p.nom)).nom;
    const temoin = pick(["celui qui raconte l'histoire", "quelqu'un dont le texte ne parle pas"]);
    if (forme === "pronomE")
      return { ext: `${s1} ${pronE} ${pick(e.etats)}.`, r: pronE, correct: e.gn, leurres: [p.nom, absentE, temoin], pronom: true };
    if (forme === "pronomP")
      return { ext: `${s1} ${pronP} ${pick(ACTIONS_PERSONNE)}.`, r: pronP, correct: p.nom, leurres: [e.gn, absentP, temoin], pronom: true };
    if (forme === "objet")
      return { ext: `${s1} ${pronP} ${objE} ${pick(e.verbesObj)}.`, r: objE, correct: e.gn, leurres: [p.nom, absentE, temoin], pronom: true };
    if (forme === "nomE") {
      const r = pick(e.reprises);
      return { ext: `${s1} ${maj(r)} ${pick(e.etats)}.`, r: maj(r), correct: e.gn, leurres: [p.nom, absentE, temoin], pronom: false };
    }
    const r = pick(REPRISES_PERSONNE[p.g]);
    return { ext: `${s1} ${maj(r)} ${pick(ACTIONS_PERSONNE)}.`, r: maj(r), correct: p.nom, leurres: [e.gn, absentP, temoin], pronom: false };
  }
}

/** Position de la reprise interrogée : dans la DERNIÈRE phrase de l'extrait. */
function positionReprise(ext: string, r: string): number {
  const debut = ext.lastIndexOf(". ", ext.length - 2) + 2;
  const fin = ext.slice(debut);
  // Pronom complément : juste après le pronom sujet (« Elle la dessine »).
  const objet = /^(Il|Elle|Ils|Elles) (le|la|les) /u.exec(fin);
  if (objet && objet[2] === r) return debut + objet[1].length + 1;
  const i = position(fin, r, true);
  return i < 0 ? -1 : debut + i;
}

/** Relit un extrait : chaque reprise de la dernière phrase désigne un seul groupe. */
function verifierToutesReprises(ext: string): string[] {
  const debut = ext.lastIndexOf(". ", ext.length - 2) + 2;
  const fin = ext.slice(debut);
  const pb: string[] = [];
  const m = /^(Il|Elle|Ils|Elles)(?![\p{L}])(?: (le|la|les) )?/u.exec(fin);
  if (m) {
    pb.push(...verifierReprise(ext, m[1], debut, null));
    if (m[2]) pb.push(...verifierReprise(ext, m[2], debut + m[1].length + 1, null));
  }
  return pb;
}

/* ── Contrôle commun à TOUTES les micros : un pronom sujet, un seul antécédent ── */

/** Les pronoms sujets d'un texte (sauf « il pleut », « il fait », « il y a »…). */
const MOTIF_PRONOM_SUJET = /(?<![\p{L}'’])(Il|Elle|Ils|Elles|il|elle|ils|elles)(?![\p{L}'’-])(?! (?:pleut|fait|y a|était|faut|neige)(?![\p{L}]))/gu;
/** Rend un problème par pronom sujet qui peut reprendre zéro ou plusieurs groupes. */
function pronomsAmbigus(ext: string): string[] {
  const pb: string[] = [];
  for (const m of ext.matchAll(MOTIF_PRONOM_SUJET)) {
    const c = candidats(m[1], groupesAvant(ext, m.index!)) ?? [];
    if (c.length > 1) pb.push(`« ${m[1]} » peut reprendre ${c.map((x) => x.txt).join(" ou ")}`);
  }
  return [...new Set(pb)];
}
/** Remplace par le prénom tout pronom qui hésiterait (« Elle » après « son amie »). */
function desambiguiser(ext: string, p: Prenom): string {
  let s = ext;
  for (;;) {
    const m = [...s.matchAll(MOTIF_PRONOM_SUJET)].find((x) => (candidats(x[1], groupesAvant(s, x.index!)) ?? []).length > 1);
    if (!m) return s;
    s = s.slice(0, m.index!) + p.nom + s.slice(m.index! + m[1].length);
  }
}

function corrigerReprise(q: QuestionFrancais): string[] {
  const ext = extrait(q.text);
  const r = dernierCite(q.text);
  const pb: string[] = [];
  if (!ext) return ["pas d'extrait entre « »"];
  if (!contient(ext, q.correct, true) && !contient(ext, q.correct)) pb.push(`la bonne réponse « ${q.correct} » n'est pas dans le texte`);
  pb.push(...verifierReprise(ext, r, positionReprise(ext, r), q.correct));
  pb.push(...verifierToutesReprises(ext));
  pb.push(...verbesRepetes(ext));
  const groupes = groupesAvant(ext, positionReprise(ext, r));
  const c = candidats(r, groupes) ?? [];
  for (const w of q.wrongs) if (c.some((x) => norm(x.txt) === norm(w))) pb.push(`le leurre « ${w} » peut aussi être repris par « ${r} »`);
  return [...new Set(pb)];
}

const genererReprise = (): QuestionFrancais => {
  let t = texteReprise();
  while (verbesRepetes(t.ext).length) t = texteReprise(); // le second verbe diffère du premier
  return {
    text: `« ${t.ext} » ${pick(TOURNURES_REPRISE)(t.r)}`,
    correct: t.correct,
    wrongs: leurresDistincts(t.correct, melange(t.leurres)),
    methode: t.pronom ? METHODE_PRONOM : METHODE_NOM,
  };
};

/* ─────────────── 6e_comp_liens_logiques ─────────────── */

// Une phrase = deux propositions tirées d'une SITUATION et reliées par un mot
// de liaison. « $S » = le sujet (le prénom la première fois, puis il/elle),
// « $e » = le « e » du féminin. Le correcteur retrouve la situation dans le
// texte et en déduit le lien attendu (la cause avant ou après l'effet).

type Relation = "cause" | "consequence" | "opposition" | "but" | "temps";
const LIBELLE: Record<Relation, { une: string; la: string }> = {
  cause: { une: "une cause", la: "la cause" },
  consequence: { une: "une conséquence", la: "la conséquence" },
  opposition: { une: "une opposition", la: "l'opposition" },
  but: { une: "un but", la: "le but" },
  temps: { une: "une succession dans le temps", la: "la succession dans le temps" },
};
/** Les mots de liaison, et la façon de les placer entre les deux propositions. */
const LIENS: Record<Relation, { mot: string; joint: string; trou: boolean }[]> = {
  cause: [{ mot: "car", joint: ", car ", trou: true }, { mot: "parce que", joint: " parce que ", trou: true }, { mot: "puisque", joint: " puisque ", trou: true }],
  consequence: [{ mot: "donc", joint: ", donc ", trou: true }, { mot: "alors", joint: ", alors ", trou: true }, { mot: "c'est pourquoi", joint: ", c'est pourquoi ", trou: true }, { mot: "si bien que", joint: ", si bien que ", trou: true }],
  opposition: [{ mot: "mais", joint: ", mais ", trou: true }, { mot: "pourtant", joint: ", pourtant ", trou: true }, { mot: "cependant", joint: ". Cependant, ", trou: false }],
  but: [{ mot: "pour", joint: " pour ", trou: true }, { mot: "afin de", joint: " afin de ", trou: true }],
  temps: [{ mot: "puis", joint: ", puis ", trou: true }, { mot: "ensuite", joint: ". Ensuite, ", trou: false }, { mot: "plus tard", joint: ". Plus tard, ", trou: false }],
};
const RELATION_DU_MOT = new Map<string, Relation>(
  (Object.keys(LIENS) as Relation[]).flatMap((r) => LIENS[r].map((l) => [l.mot, r] as [string, Relation])),
);
/** Pour un trou à remplir : les liens qui sont clairement faux à cet endroit. */
const INCOMPATIBLES: Record<Relation, string[]> = {
  cause: ["pourtant", "mais", "afin de", "pour"],
  consequence: ["car", "parce que", "pourtant", "mais"],
  opposition: ["donc", "alors", "car", "c'est pourquoi"],
  but: ["car", "donc", "mais", "puis"],
  temps: ["car", "parce que", "pourtant"],
};

type Situation = { rel: "causal" | "opposition" | "but" | "temps"; a: string; b: string };
// causal : a = la cause, b = l'effet ; opposition : a = le fait, b = l'inattendu ;
// but : a = l'action, b = le but (infinitif) ; temps : a = d'abord, b = ensuite.
const SITUATIONS: readonly Situation[] = [
  { rel: "causal", a: "$S a oublié son parapluie", b: "$S rentre trempé$e" },
  { rel: "causal", a: "$S a couru très vite", b: "$S est essoufflé$e" },
  { rel: "causal", a: "$S a perdu ses clés", b: "$S ne peut pas ouvrir la porte" },
  { rel: "causal", a: "il pleut très fort", b: "le match est annulé" },
  { rel: "causal", a: "$S a bien révisé", b: "$S réussit son contrôle" },
  { rel: "causal", a: "$S n'a rien mangé ce matin", b: "$S a très faim" },
  { rel: "causal", a: "la mer est agitée", b: "la baignade est interdite" },
  { rel: "causal", a: "$S a laissé la porte ouverte", b: "le chat s'est échappé" },
  { rel: "causal", a: "$S s'est couché$e très tard", b: "$S bâille en classe" },
  { rel: "causal", a: "le réveil n'a pas sonné", b: "$S arrive en retard" },
  { rel: "causal", a: "le bus est en panne", b: "$S va à l'école à pied" },
  { rel: "causal", a: "$S a renversé son verre", b: "$S doit essuyer la table" },
  { rel: "causal", a: "$S a gagné le tournoi d'échecs", b: "$S reçoit une médaille" },
  { rel: "causal", a: "il fait très chaud", b: "$S boit beaucoup d'eau" },
  { rel: "causal", a: "$S s'est cassé le bras", b: "$S ne peut pas jouer au handball" },
  { rel: "opposition", a: "$S s'est beaucoup entraîné$e", b: "$S a perdu la course" },
  { rel: "opposition", a: "le ciel est tout bleu", b: "$S prend son parapluie" },
  { rel: "opposition", a: "$S a très sommeil", b: "$S continue de lire" },
  { rel: "opposition", a: "la soupe est brûlante", b: "$S la boit d'un trait" },
  { rel: "opposition", a: "$S a peur du noir", b: "$S traverse le couloir sans lumière" },
  { rel: "opposition", a: "le film est très long", b: "$S ne s'ennuie pas une seconde" },
  { rel: "opposition", a: "$S déteste les épinards", b: "$S finit son assiette" },
  { rel: "opposition", a: "l'eau est glacée", b: "$S plonge sans hésiter" },
  { rel: "opposition", a: "$S a de la fièvre", b: "$S veut aller à l'école" },
  { rel: "opposition", a: "le chemin est difficile", b: "$S arrive le premier au sommet" },
  { rel: "but", a: "$S se lève tôt", b: "ne pas rater le bus" },
  { rel: "but", a: "$S range sa chambre", b: "retrouver ses affaires" },
  { rel: "but", a: "$S s'entraîne chaque soir", b: "gagner la course" },
  { rel: "but", a: "$S met un bonnet", b: "ne pas avoir froid" },
  { rel: "but", a: "$S lit la notice", b: "monter son étagère" },
  { rel: "but", a: "$S économise son argent de poche", b: "acheter un vélo" },
  { rel: "but", a: "$S parle doucement", b: "ne pas réveiller le bébé" },
  { rel: "but", a: "$S prend une loupe", b: "observer les fourmis" },
  { rel: "but", a: "$S répète son texte", b: "réussir son exposé" },
  { rel: "but", a: "$S met de la crème solaire", b: "éviter les coups de soleil" },
  { rel: "temps", a: "$S prend son petit-déjeuner", b: "$S part à l'école" },
  { rel: "temps", a: "$S épluche les pommes", b: "$S les coupe en morceaux" },
  { rel: "temps", a: "$S enfile son maillot", b: "$S plonge dans la piscine" },
  { rel: "temps", a: "$S fait ses devoirs", b: "$S joue aux échecs" },
  { rel: "temps", a: "$S écrit sa lettre", b: "$S la poste" },
  { rel: "temps", a: "$S gonfle les ballons", b: "$S décore la salle" },
  { rel: "temps", a: "$S se brosse les dents", b: "$S va se coucher" },
  { rel: "temps", a: "$S lit l'énoncé", b: "$S répond aux questions" },
];

/** ⛔ Décision du 06/10 : le second être nommé est du genre OPPOSÉ au personnage
 *  (« Chloé cherche son frère », « Ibrahim cherche sa sœur ») : le pronom qui
 *  suit ne peut alors reprendre que le personnage, sans répéter son prénom.
 *  Écriture dans les tables : « {masculin|féminin} ». */
const oppose = (s: string, g: Genre) => s.replace(/\{([^|{}]*)\|([^|{}]*)\}/g, (_m, mas, fem) => (g === "f" ? mas : fem));
/** Les deux écritures d'un mot à variante (« {frère|sœur} » → frère, sœur). */
const variantes = (s: string) => (/\{/.test(s) ? [oppose(s, "f"), oppose(s, "m")] : [s]);

/** Remplit $S (prénom la 1re fois, puis pronom) et $e ; fait les élisions. */
function remplir(phrase: string, p: Prenom): string {
  let premier = true;
  let s = oppose(phrase, p.g).replace(/\$S/g, () => {
    const r = premier ? p.nom : ilElle(p.g);
    premier = false;
    return r;
  });
  s = s.replace(/\$e/g, p.g === "f" ? "e" : "");
  // Seulement « que », « de », « puisque », « lorsque » : pas « casque et » !
  // Pas d'élision devant le Y de Yanis ou de Yasmine : « que Yanis ».
  s = s.replace(/((?<![\p{L}])(?:qu|d|puisqu|lorsqu))e ([aeiouéèêàâîôûœ])/giu, "$1'$2");
  return maj(s);
}
/** Motif de recherche d'un mot de liaison (avec ses élisions). */
const motifLien = (mot: string) =>
  new RegExp(
    `(?<![\\p{L}'’])${
      /que$| de$/.test(mot)
        ? echapper(mot).replace(/que$/, "qu(?:e(?![\\p{L}])|')").replace(/ de$/, " d(?:e(?![\\p{L}])|')")
        : `${echapper(mot)}(?![\\p{L}])`
    }`,
    "iu",
  );
const liensDans = (ext: string) => [...RELATION_DU_MOT.keys()].filter((m) => motifLien(m).test(ext));
/** Motif d'une proposition de la table (le sujet et le « e » du féminin varient). */
const motifProposition = (t: string) =>
  new RegExp(
    t
      .split(/(\$S|\$e|\{[^{}]*\})/)
      .map((x) => (x === "$S" ? "\\p{L}+" : x === "$e" ? "e?" : x.startsWith("{") ? `(?:${variantes(x).map(echapper).join("|")})` : echapper(x)))
      .join(""),
    "iu",
  );
/** Retrouve la situation dans le texte et rend le lien qu'elle demande. */
function relationAttendue(ext: string): Relation | null {
  for (const s of SITUATIONS) {
    const ma = motifProposition(s.a).exec(ext);
    const mb = motifProposition(s.b).exec(ext);
    if (!ma || !mb) continue;
    if (s.rel === "causal") return ma.index < mb.index ? "consequence" : "cause";
    if (ma.index > mb.index) return null; // un fait et sa suite à l'envers
    return s.rel;
  }
  return null;
}

const METHODE_LIEN = "Demande-toi ce que la deuxième partie apporte à la première : sa cause, sa conséquence, une surprise, un but, ou la suite dans le temps.";

function phraseLien(rel: Relation, avecTrou: boolean) {
  const typ = rel === "cause" || rel === "consequence" ? "causal" : rel;
  const s = pick(SITUATIONS.filter((x) => x.rel === typ));
  const l = pick(LIENS[rel].filter((x) => !avecTrou || x.trou));
  const [x, y] = rel === "cause" ? [s.b, s.a] : [s.a, s.b];
  const joint = avecTrou ? (l.joint.startsWith(",") ? ", … " : " … ") : l.joint;
  return { phrase: remplir(`${x}${joint}${y}.`, pick(PRENOMS)), mot: l.mot };
}

function genererLien(): QuestionFrancais {
  const rel = pick(Object.keys(LIENS) as Relation[]);
  const autres = (Object.keys(LIENS) as Relation[]).filter((r) => r !== rel);
  const forme = pick(["sens", "sens", "trou", "trou", "inverse"] as const);
  if (forme === "inverse") {
    const correct = pick(LIENS[rel]).mot;
    const wrongs = tirerN(autres, 3).map((r) => pick(LIENS[r]).mot);
    const t = pick([`Quel mot de liaison exprime ${LIBELLE[rel].la} ?`, `Pour exprimer ${LIBELLE[rel].la}, quel mot choisis-tu ?`]);
    return { text: t, correct, wrongs, methode: METHODE_LIEN };
  }
  if (forme === "trou") {
    const { phrase, mot } = phraseLien(rel, true);
    const t = pick(["Complète avec le bon mot de liaison :", "Quel mot de liaison va dans le trou ?", "Choisis le mot qui relie le mieux les deux parties :"]);
    return { text: `${t} « ${phrase} »`, correct: mot, wrongs: tirerN(INCOMPATIBLES[rel], 3), methode: METHODE_LIEN };
  }
  const { phrase, mot } = phraseLien(rel, false);
  const t = pick([
    (m: string) => `Que marque « ${m} » ?`,
    (m: string) => `Qu'exprime le mot « ${m} » dans cette phrase ?`,
    (m: string) => `Dans cette phrase, « ${m} » introduit…`,
  ]);
  return { text: `« ${phrase} » ${t(mot)}`, correct: LIBELLE[rel].une, wrongs: tirerN(autres, 3).map((r) => LIBELLE[r].une), methode: METHODE_LIEN };
}

function corrigerLien(q: QuestionFrancais): string[] {
  const pb: string[] = [];
  const ext = extrait(q.text);
  const relDuLibelle = (s: string) => (Object.keys(LIBELLE) as Relation[]).find((r) => LIBELLE[r].une === s || LIBELLE[r].la === s);
  if (!ext) {
    // « Quel mot de liaison exprime la cause ? »
    const rel = (Object.keys(LIBELLE) as Relation[]).find((r) => new RegExp(` ${echapper(LIBELLE[r].la)}[ ,]`).test(q.text));
    if (!rel) return ["relation demandée introuvable"];
    if (RELATION_DU_MOT.get(q.correct) !== rel) pb.push(`« ${q.correct} » n'exprime pas ${LIBELLE[rel].la}`);
    for (const w of q.wrongs) if (!RELATION_DU_MOT.has(w) || RELATION_DU_MOT.get(w) === rel) pb.push(`le leurre « ${w} » n'est pas clairement faux`);
    return pb;
  }
  const attendue = relationAttendue(ext);
  if (!attendue) return ["situation introuvable dans le texte, ou parties dans le mauvais ordre"];
  const presents = liensDans(ext);
  if (ext.includes("…")) {
    if (presents.length) pb.push(`le texte à trous contient déjà « ${presents.join(", ")} »`);
    if (RELATION_DU_MOT.get(q.correct) !== attendue) pb.push(`« ${q.correct} » ne marque pas ${LIBELLE[attendue].la}`);
    for (const w of q.wrongs) if (!INCOMPATIBLES[attendue].includes(w)) pb.push(`le leurre « ${w} » pourrait convenir`);
    return pb;
  }
  const cite = dernierCite(q.text);
  if (presents.length !== 1 || presents[0] !== cite) pb.push(`mots de liaison dans le texte : ${presents.join(", ") || "aucun"} (cité : « ${cite} »)`);
  if (RELATION_DU_MOT.get(cite) !== attendue) pb.push(`« ${cite} » ne va pas avec cette situation (${LIBELLE[attendue].la} attendue)`);
  if (relDuLibelle(q.correct) !== attendue) pb.push(`bonne réponse « ${q.correct} » au lieu de ${LIBELLE[attendue].une}`);
  for (const w of q.wrongs) if (!relDuLibelle(w) || relDuLibelle(w) === attendue) pb.push(`le leurre « ${w} » n'est pas clairement faux`);
  return pb;
}

/* ─────────────── 6e_comp_reprises_defi ─────────────── */

// Trois phrases, une fille, un garçon et un être ou un objet : il faut suivre
// chacun d'un bout à l'autre. « l'enfant » est exclu (il y a deux enfants).

const RANGS = ["première", "deuxième", "troisième", "quatrième"];
const phrasesDe = (ext: string) => ext.split(/(?<=\.) /);

/** La reprise qui ouvre une phrase (pronom sujet ou reprise nominale connue). */
function repriseEnTete(phrase: string): string | null {
  const m = /^(Il|Elle|Ils|Elles)(?![\p{L}])/u.exec(phrase);
  if (m) return m[1];
  const noms = [...DESIGNE.keys()].sort((a, b) => b.length - a.length);
  for (const r of noms) if (phrase.startsWith(maj(r) + " ")) return maj(r);
  return null;
}
/** Le groupe repris par la tête de chaque phrase (après la première) ; problèmes sinon. */
function suivreReprises(ext: string): { referents: (string | null)[]; pb: string[] } {
  const ph = phrasesDe(ext);
  const referents: (string | null)[] = [null];
  const pb: string[] = [];
  let debut = ph[0].length + 1;
  for (let i = 1; i < ph.length; i++) {
    const r = repriseEnTete(ph[i]);
    if (!r) {
      referents.push(null);
    } else {
      const c = candidats(r, groupesAvant(ext, debut)) ?? [];
      if (c.length !== 1) pb.push(`phrase ${i + 1} : « ${r} » peut reprendre ${c.length} groupes (${c.map((x) => x.txt).join(", ") || "aucun"})`);
      pb.push(...nombreReprise(r, c));
      referents.push(c.length === 1 ? c[0].txt : null);
    }
    debut += ph[i].length + 1;
  }
  return { referents, pb };
}

function genererRepriseDefi(): QuestionFrancais {
  for (;;) {
    const q = composerRepriseDefi();
    const ext = extrait(q.text);
    // « Le garçon appelle sa mère. La fillette… » : « sa mère » ferait hésiter → on retire.
    if (!verbesRepetes(ext).length && !suivreReprises(ext).pb.length && !pronomsAmbigus(ext).length) return q;
  }
}
function composerRepriseDefi(): QuestionFrancais {
  const e = pick(ENTITES);
  const [f, m] = [pick(filles), pick(garcons)];
  const [p1, p2] = melange([f, m]);
  const s1 = `${p1.nom} ${pick(e.verbes)} ${e.gn} avec ${p2.nom}.`;
  const pronomOk = e.n === "p"; // sinon « Il » ou « Elle » hésiterait avec l'entité
  type Ph = { txt: string; ref: string; action: string; personne: boolean; r: string };
  const phrasePour = (qui: Prenom | "E", action: string): Ph => {
    if (qui === "E") {
      const r = maj(pick(e.reprises));
      return { txt: `${r} ${action}.`, ref: e.gn, action, personne: false, r };
    }
    const noms = REPRISES_PERSONNE[qui.g].filter((x) => x !== "l'enfant");
    const r = pronomOk && Math.random() < 0.5 ? maj(ilElle(qui.g)) : maj(pick(noms));
    return { txt: `${r} ${action}.`, ref: qui.nom, action, personne: true, r };
  };
  const ordre = tirerN([p1, p2, "E"] as (Prenom | "E")[], 2);
  const [a1, a2] = tirerN(ACTIONS_PERSONNE, 2);
  const [e1, e2] = tirerN(e.etats, 2);
  const ph = ordre.map((qui, i) => phrasePour(qui, qui === "E" ? (i === 0 ? e1 : e2) : i === 0 ? a1 : a2));
  const ext = [s1, ...ph.map((x) => x.txt)].join(" ");
  const k = Math.floor(Math.random() * 2);
  const vise = ph[k];
  const tousGroupes = [p1.nom, p2.nom, e.gn];
  const absent = vise.personne ? pick(PRENOMS.filter((x) => !tousGroupes.includes(x.nom))).nom : pick(ENTITES.filter((x) => x.gn !== e.gn)).gn;
  const wrongs = leurresDistincts(vise.ref, melange([...tousGroupes.filter((x) => x !== vise.ref), absent]));
  const rang = RANGS[k + 1];
  // « qu'est-ce qui sentent bon » serait faux : la question « qui ? » vise une personne.
  const forme = vise.personne ? pick(["reprise", "qui"] as const) : "reprise";
  let question: string;
  if (forme === "qui") question = `Dans ce passage, qui ${vise.action} ?`;
  else
    question = pick([
      `Dans la ${rang} phrase, que reprend « ${vise.r} » ?`,
      `Dans la ${rang} phrase, « ${vise.r} » désigne…`,
      `De qui ou de quoi parle « ${vise.r} » dans la ${rang} phrase ?`,
    ]);
  return { text: `« ${ext} » ${question}`, correct: vise.ref, wrongs, methode: "Suis chaque personnage : à chaque phrase, demande-toi qui fait l'action, puis remonte le texte jusqu'à son nom." };
}

function corrigerRepriseDefi(q: QuestionFrancais): string[] {
  const ext = extrait(q.text);
  if (!ext) return ["pas d'extrait"];
  const ph = phrasesDe(ext);
  const { referents, pb } = suivreReprises(ext);
  pb.push(...verbesRepetes(ext));
  const question = q.text.slice(q.text.indexOf(" »", q.text.indexOf("« ")) + 2);
  let attendu: string | null = null;
  const qui = /qu(?:i|'est-ce qui) (.+) \?$/u.exec(question);
  if (qui && !question.includes("« ")) {
    const ou = ph.map((p, i) => (p.includes(` ${qui[1]}.`) ? i : -1)).filter((i) => i >= 0);
    if (ou.length !== 1) pb.push(`l'action « ${qui[1]} » est dans ${ou.length} phrases`);
    else attendu = referents[ou[0]];
  } else {
    const rang = RANGS.findIndex((r) => question.includes(`la ${r} phrase`));
    const r = dernierCite(question);
    if (rang < 1 || !ph[rang]?.startsWith(r + " ")) pb.push(`« ${r} » n'ouvre pas la phrase ${rang + 1}`);
    else attendu = referents[rang];
  }
  if (!attendu) pb.push("référent introuvable");
  else if (norm(attendu) !== norm(q.correct)) pb.push(`la bonne réponse est « ${attendu} », pas « ${q.correct} »`);
  for (const w of q.wrongs) if (attendu && norm(w) === norm(attendu)) pb.push(`le leurre « ${w} » est la bonne réponse`);
  return pb;
}

/* ─────────────── 6e_comp_indices ─────────────── */

// Un lieu ou un moment n'est jamais écrit : un INDICE le trahit (« sable » →
// la plage). Chaque indice n'appartient qu'à un lieu ou un moment ; le
// correcteur vérifie qu'un seul lieu (ou moment) est trahi par le texte.

/** [phrase, mot indice] ; « $S » = le personnage. */
type Indice = [string, string];
type Cadre = { nom: string; indices: Indice[] };
const LIEUX: readonly Cadre[] = [
  { nom: "à la plage", indices: [["$S étale sa serviette sur le sable.", "sable"], ["$S saute dans les vagues.", "vagues"], ["$S ramasse un coquillage.", "coquillage"]] },
  { nom: "à la piscine", indices: [["$S saute du plongeoir.", "plongeoir"], ["$S nage jusqu'au bord du bassin.", "bassin"], ["$S ajuste son bonnet de bain.", "bonnet de bain"]] },
  { nom: "dans une cuisine", indices: [["$S sort une casserole.", "casserole"], ["$S allume le four.", "four"], ["$S casse des œufs dans un saladier.", "saladier"]] },
  { nom: "à la gare", indices: [["$S attend sur le quai.", "quai"], ["$S court vers le train.", "train"], ["$S regarde le panneau des départs.", "départs"]] },
  { nom: "à la bibliothèque", indices: [["$S emprunte trois romans.", "romans"], ["$S marche entre les rayonnages.", "rayonnages"], ["$S rend sa carte de lecteur.", "carte de lecteur"]] },
  { nom: "dans une forêt", indices: [["$S marche entre les grands sapins.", "sapins"], ["$S ramasse des champignons.", "champignons"], ["$S entend un pic frapper un tronc.", "tronc"]] },
  { nom: "à la montagne", indices: [["$S regarde les sommets enneigés.", "sommets"], ["$S grimpe vers le refuge.", "refuge"], ["$S monte dans le téléphérique.", "téléphérique"]] },
  { nom: "dans une salle de classe", indices: [["$S lève la main pour répondre {au professeur|à la professeure}.", "{professeur|professeure}"], ["$S range sa trousse dans son cartable.", "cartable"], ["$S copie la leçon au propre.", "leçon"]] },
  { nom: "chez le médecin", indices: [["$S montre sa gorge {au docteur|à la docteure}.", "{docteur|docteure}"], ["$S regarde le stéthoscope.", "stéthoscope"], ["$S tend l'ordonnance {à son père|à sa mère}.", "ordonnance"]] },
  { nom: "au stade", indices: [["$S tire vers les cages.", "cages"], ["$S entend le coup de sifflet du match.", "sifflet"], ["$S salue les supporters dans les tribunes.", "tribunes"]] },
  { nom: "au zoo", indices: [["$S regarde les girafes.", "girafes"], ["$S s'arrête devant l'enclos des lions.", "enclos"], ["$S photographie {un éléphant|une girafe}.", "{éléphant|girafe}"]] },
  { nom: "au marché", indices: [["$S choisit des tomates sur l'étal.", "étal"], ["$S paie {le marchand|la marchande} de fruits.", "{marchand|marchande}"], ["$S goûte une fraise offerte par {le maraîcher|la maraîchère}.", "{maraîcher|maraîchère}"]] },
  { nom: "au cinéma", indices: [["$S achète un pot de pop-corn.", "pop-corn"], ["$S regarde la bande-annonce.", "bande-annonce"], ["$S fixe le grand écran.", "écran"]] },
  { nom: "au port", indices: [["$S compte les voiliers.", "voiliers"], ["$S marche sur le ponton.", "ponton"], ["$S salue {un pêcheur|une pêcheuse} qui répare ses filets.", "filets"]] },
  { nom: "dans un potager", indices: [["$S arrose les salades.", "salades"], ["$S plante des radis.", "radis"], ["$S remplit son arrosoir.", "arrosoir"]] },
  { nom: "dans un musée", indices: [["$S admire une statue.", "statue"], ["$S s'approche d'une momie.", "momie"], ["$S regarde un tableau ancien.", "tableau"]] },
  { nom: "sur un volcan", indices: [["$S marche sur une coulée de lave.", "lave"], ["$S voit le cratère fumer.", "cratère"], ["$S ramasse une pierre ponce.", "pierre ponce"]] },
];
const MOMENTS: readonly Cadre[] = [
  { nom: "le matin", indices: [["Le réveil sonne.", "réveil"], ["$S avale son petit-déjeuner.", "petit-déjeuner"], ["Le soleil se lève.", "se lève"]] },
  { nom: "le soir", indices: [["Le soleil se couche.", "se couche"], ["$S met son pyjama.", "pyjama"], ["$S dîne avec sa famille.", "dîne"]] },
  { nom: "la nuit", indices: [["Les étoiles brillent.", "étoiles"], ["Toute la maison dort.", "dort"], ["Un hibou hulule dehors.", "hibou"]] },
  { nom: "en hiver", indices: [["La neige tombe.", "neige"], ["$S enfile ses moufles.", "moufles"], ["Le lac est gelé.", "gelé"]] },
  { nom: "en automne", indices: [["Les feuilles mortes tombent.", "feuilles mortes"], ["$S ramasse des châtaignes.", "châtaignes"], ["Les jours raccourcissent.", "raccourcissent"]] },
  { nom: "au printemps", indices: [["Les premiers bourgeons apparaissent.", "bourgeons"], ["Les hirondelles reviennent.", "hirondelles"], ["Les cerisiers sont en fleurs.", "cerisiers"]] },
];
/** Phrases sans indice : leurs mots servent de leurres. */
const NEUTRES: readonly Indice[] = [
  ["$S range son téléphone.", "téléphone"], ["$S cherche {son frère|sa sœur}.", "{frère|sœur}"], ["$S met sa casquette.", "casquette"],
  ["$S relace sa chaussure.", "chaussure"], ["$S regarde sa montre.", "montre"], ["$S appelle {son grand-père|sa grand-mère}.", "{grand-père|grand-mère}"],
  ["$S ouvre son sac.", "sac"], ["$S rit avec {son cousin|sa cousine}.", "{cousin|cousine}"], ["$S boit une gorgée de jus.", "jus"],
  ["$S sourit à {son ami|son amie}.", "{ami|amie}"], ["$S pose son manteau.", "manteau"], ["$S prend une photo.", "photo"],
];
/** Les cadres (lieux ou moments) trahis par un texte. */
const cadresDans = (ext: string, table: readonly Cadre[]) =>
  table.filter((c) => c.indices.some(([, mot]) => variantes(mot).some((v) => contient(ext, v))));
const cadreDuMot = (mot: string, table: readonly Cadre[]) => table.find((c) => c.indices.some(([, m]) => variantes(m).includes(mot)));

/** Un texte de trois phrases : une phrase indice parmi deux neutres (et un moment, parfois). */
function texteIndices(avecMoment: boolean) {
  const moment = pick(MOMENTS);
  // Pas de salle de classe ni de musée la nuit : seuls ces lieux vivent le soir.
  const OUVERTS_LE_SOIR = ["à la plage", "dans une forêt", "à la montagne", "au port", "dans une cuisine", "au cinéma", "à la gare", "sur un volcan", "au stade"];
  const nocturne = avecMoment && (moment.nom === "la nuit" || moment.nom === "le soir");
  const lieu = pick(nocturne ? LIEUX.filter((l) => OUVERTS_LE_SOIR.includes(l.nom)) : LIEUX);
  const iLieu = pick(lieu.indices);
  const iMoment = pick(moment.indices);
  const [n1, n2] = tirerN(NEUTRES, 2);
  // Le moment vient en DERNIER : « La neige tombe. Elle… » ferait hésiter le pronom.
  const corps = avecMoment ? [...melange([iLieu, n1]), iMoment] : melange([iLieu, n1, n2]);
  const perso = pick(PRENOMS);
  // « Malo rit avec son cousin. Il… » : le pronom qui hésite redevient le prénom.
  const ext = desambiguiser(remplir(corps.map(([ph]) => ph).join(" "), perso).replace(/\. (il|elle) /g, (_m, x) => `. ${maj(x)} `), perso);
  return { ext, perso, lieu, moment, iLieu, iMoment, neutres: [n1, n2].filter((n) => corps.includes(n)) };
}

const METHODE_INDICE = "Le texte ne le dit pas : cherche le mot qui te met sur la piste, celui qui ne peut aller qu'avec un seul lieu ou un seul moment.";

function genererIndices(): QuestionFrancais {
  const forme = pick(["ou", "motLieu", "quand", "motMoment"] as const);
  const t = texteIndices(forme === "quand" || forme === "motMoment");
  if (forme === "ou")
    return {
      text: `« ${t.ext} » ${pick(["Où se passe cette scène ?", "Où se trouve le personnage ?", "Dans quel lieu sommes-nous ?"])}`,
      correct: maj(t.lieu.nom),
      wrongs: tirerN(LIEUX.filter((l) => l !== t.lieu), 3).map((l) => maj(l.nom)),
      methode: METHODE_INDICE,
    };
  if (forme === "quand")
    return {
      text: `« ${t.ext} » ${pick(["À quel moment se passe cette scène ?", "Quand se passe cette scène ?"])}`,
      correct: maj(t.moment.nom),
      wrongs: tirerN(MOMENTS.filter((l) => l !== t.moment), 3).map((l) => maj(l.nom)),
      methode: METHODE_INDICE,
    };
  const [cadre, ind, table] = forme === "motLieu" ? [t.lieu, t.iLieu, LIEUX] : [t.moment, t.iMoment, MOMENTS];
  const autres = tirerN(table.filter((c) => c !== cadre), 2).map((c) => oppose(pick(c.indices)[1], t.perso.g));
  const neutres = t.neutres.map(([, m]) => oppose(m, t.perso.g));
  return {
    text: `« ${t.ext} » ${pick([`La scène se passe ${cadre.nom}. Quel mot du texte le montre ?`, `Quel indice du texte montre que la scène se passe ${cadre.nom} ?`, `Relève l'indice : comment sait-on que la scène se passe ${cadre.nom} ?`])}`,
    correct: oppose(ind[1], t.perso.g),
    wrongs: leurresDistincts(oppose(ind[1], t.perso.g), [...melange(neutres), ...autres]),
    methode: METHODE_INDICE,
  };
}

function corrigerIndices(q: QuestionFrancais): string[] {
  const ext = extrait(q.text);
  if (!ext) return ["pas d'extrait"];
  const pb: string[] = [];
  const lieux = cadresDans(ext, LIEUX);
  const moments = cadresDans(ext, MOMENTS);
  if (lieux.length !== 1) pb.push(`le texte trahit ${lieux.length} lieux (${lieux.map((l) => l.nom).join(", ")})`);
  if (moments.length > 1) pb.push(`le texte trahit ${moments.length} moments`);
  const question = q.text.slice(q.text.lastIndexOf(" »") + 2);
  const nommé = [...LIEUX, ...MOMENTS].find((c) => question.includes(`se passe ${c.nom}`));
  if (nommé) {
    const table = LIEUX.includes(nommé) ? LIEUX : MOMENTS;
    if (!contient(ext, q.correct)) pb.push(`l'indice « ${q.correct} » n'est pas dans le texte`);
    if (cadreDuMot(q.correct, table) !== nommé) pb.push(`« ${q.correct} » n'est pas un indice de « ${nommé.nom} »`);
    for (const w of q.wrongs) if (cadreDuMot(w, table) === nommé) pb.push(`le leurre « ${w} » est aussi un indice`);
    return pb;
  }
  const table = /moment|Quand/.test(question) ? MOMENTS : LIEUX;
  const trouves = table === LIEUX ? lieux : moments;
  if (trouves.length !== 1) return [...pb, "aucun cadre unique pour répondre"];
  if (norm(q.correct) !== norm(trouves[0].nom)) pb.push(`la bonne réponse est « ${trouves[0].nom} »`);
  for (const w of q.wrongs) if (norm(w) === norm(trouves[0].nom)) pb.push(`le leurre « ${w} » est la bonne réponse`);
  return pb;
}

/* ═══════════════════ comprehension_textes ═══════════════════ */

/* ─────────────── 6e_comp_implicite ─────────────── */

// Ce que ressent un personnage, le temps qu'il fait, son métier : jamais écrit.
// Chaque réponse a ses phrases-indices ; aucune ne contient le mot de la réponse
// (le correcteur le vérifie : sinon ce n'est plus de l'implicite).

type Inference = { reponse: string | [string, string]; mot: string; conclusion: string | [string, string]; indices: string[] };
type Categorie = { nom: string; questions: ((p: Prenom) => string)[]; items: Inference[] };

const CATEGORIES: readonly Categorie[] = [
  {
    nom: "émotion",
    questions: [(p) => `Que ressent ${p.nom} ?`, (p) => `Quel sentiment éprouve ${p.nom} ?`, (p) => `Dans quel état d'esprit est ${p.nom} ?`],
    items: [
      { reponse: "de la peur", mot: "peur", conclusion: "a peur", indices: ["$S tremble de tout son corps.", "$S retient un cri et recule contre le mur.", "$S entend un craquement et n'ose plus bouger."] },
      { reponse: "de la joie", mot: "joie", conclusion: ["est joyeux", "est joyeuse"], indices: ["$S sourit jusqu'aux oreilles.", "$S danse en chantant dans le couloir.", "$S serre son cadeau contre son cœur en riant."] },
      { reponse: "de la colère", mot: "colère", conclusion: "est en colère", indices: ["$S claque la porte de sa chambre.", "$S serre les poings et devient tout rouge.", "$S jette son cahier par terre."] },
      { reponse: "de la tristesse", mot: "trist", conclusion: "est triste", indices: ["$S pleure en silence.", "$S baisse la tête, les yeux pleins de larmes.", "$S regarde la photo {de son vieux chien disparu|de sa vieille chienne disparue}."] },
      { reponse: "de la surprise", mot: "surpri", conclusion: ["est surpris", "est surprise"], indices: ["$S ouvre de grands yeux et reste bouche bée.", "$S laisse tomber sa cuillère, stupéfait$e.", "$S n'en croit pas ses yeux."] },
      { reponse: "de la fatigue", mot: "fatigu", conclusion: ["est fatigué", "est fatiguée"], indices: ["$S bâille sans arrêt.", "$S s'endort sur son livre.", "$S a les paupières lourdes et traîne les pieds."] },
    ],
  },
  {
    nom: "météo",
    questions: [() => "Quel temps fait-il ?", () => "Quel temps fait-il sans doute dehors ?"],
    items: [
      { reponse: "il pleut", mot: "pluie|pleu", conclusion: "il pleut", indices: ["$S ouvre son parapluie.", "$S saute dans les flaques.", "$S rentre avec les cheveux trempés."] },
      { reponse: "il fait très chaud", mot: "chaud|chaleur", conclusion: "il fait très chaud", indices: ["$S s'éponge le front et cherche l'ombre.", "$S boit une grande bouteille d'eau fraîche d'un trait.", "$S s'évente avec son cahier."] },
      { reponse: "il fait très froid", mot: "froid", conclusion: "il fait très froid", indices: ["$S souffle sur ses doigts engourdis.", "$S remonte son écharpe jusqu'au nez.", "$S voit son souffle former un petit nuage blanc."] },
      { reponse: "il y a beaucoup de vent", mot: "vent", conclusion: "il y a beaucoup de vent", indices: ["$S court après sa casquette qui s'envole.", "$S a les cheveux qui volent dans tous les sens.", "$S tient son parapluie retourné à deux mains."] },
    ],
  },
  {
    nom: "métier",
    questions: [(p) => `Quel est sans doute le métier ${de(p.nom)} ?`, (p) => `Que fait ${p.nom} dans la vie ?`],
    items: [
      { reponse: ["un médecin", "une médecin"], mot: "médecin", conclusion: "est médecin", indices: ["$S enfile sa blouse blanche et écoute le cœur {d'un patient|d'une patiente}.", "$S examine la gorge {d'un garçon malade|d'une fillette malade}."] },
      { reponse: ["un boulanger", "une boulangère"], mot: "boulang", conclusion: ["est boulanger", "est boulangère"], indices: ["$S sort les baguettes du four à quatre heures du matin.", "$S pétrit la pâte à pain avant le lever du jour."] },
      { reponse: ["un pompier", "une pompière"], mot: "pompi", conclusion: ["est pompier", "est pompière"], indices: ["$S enfile son casque et saute dans le camion rouge.", "$S déroule la lance à incendie."] },
      { reponse: ["un pilote d'avion", "une pilote d'avion"], mot: "pilote", conclusion: "est pilote d'avion", indices: ["$S salue les passagers et s'installe dans le cockpit.", "$S vérifie les moteurs avant le décollage."] },
      { reponse: ["un vétérinaire", "une vétérinaire"], mot: "vétérinaire", conclusion: "est vétérinaire", indices: ["$S soigne la patte {d'un chien blessé|d'une chienne blessée}.", "$S vaccine {un lapin|une lapine} dans son cabinet."] },
      { reponse: ["un facteur", "une factrice"], mot: "facte|factri", conclusion: ["est facteur", "est factrice"], indices: ["$S glisse des lettres dans chaque boîte de la rue.", "$S remplit sa sacoche de colis et de lettres."] },
      { reponse: ["un jardinier", "une jardinière"], mot: "jardini", conclusion: ["est jardinier", "est jardinière"], indices: ["$S taille les rosiers du parc municipal.", "$S tond les pelouses de la mairie tous les lundis."] },
      { reponse: ["un musicien", "une musicienne"], mot: "musici", conclusion: ["est musicien", "est musicienne"], indices: ["$S accorde son violon avant le concert.", "$S joue de la trompette dans un orchestre."] },
      { reponse: ["un professeur", "une professeure"], mot: "profess", conclusion: ["est professeur", "est professeure"], indices: ["$S corrige les copies de ses élèves.", "$S écrit la leçon du jour au tableau pour ses élèves."] },
      { reponse: ["un photographe", "une photographe"], mot: "photograph", conclusion: "est photographe", indices: ["$S règle son objectif et cadre les mariés devant l'église.", "$S développe les clichés de son dernier reportage."] },
    ],
  },
];
const forme = (x: string | [string, string], g: Genre) => (typeof x === "string" ? x : g === "f" ? x[1] : x[0]);
/** Les réponses d'une catégorie dont un indice figure dans le texte. */
const inferencesDans = (ext: string, cat: Categorie) =>
  cat.items.filter((it) => it.indices.some((i) => motifProposition(i.replace(/\.$/, "")).test(ext)));
const toutesReponses = (it: Inference) => (typeof it.reponse === "string" ? [it.reponse] : it.reponse);

/** Un texte : une ou deux phrases-indices, et des phrases neutres. */
function texteImplicite(nbNeutres: number, nbIndices = 1) {
  const cat = pick(CATEGORIES);
  const it = pick(cat.items);
  const p = pick(PRENOMS);
  const indices = tirerN(it.indices, nbIndices);
  const neutres = tirerN(NEUTRES, nbNeutres).map(([ph]) => ph);
  const ordre = melange([...indices, ...neutres]);
  const ext = desambiguiser(remplir(ordre.join(" "), p).replace(/\. (il|elle) /g, (_m, x) => `. ${maj(x)} `), p);
  return { cat, it, p, ext };
}
const METHODE_IMPLICITE = "La réponse n'est pas écrite : relève ce que fait le personnage, puis demande-toi ce que cela révèle.";

function genererImplicite(nbNeutres = 1, nbIndices = 1): QuestionFrancais {
  const { cat, it, p, ext } = texteImplicite(nbNeutres, nbIndices);
  const autres = tirerN(cat.items.filter((x) => x !== it), 3).map((x) => forme(x.reponse, p.g));
  return { text: `« ${ext} » ${pick(cat.questions)(p)}`, correct: forme(it.reponse, p.g), wrongs: autres, methode: METHODE_IMPLICITE };
}

function corrigerImplicite(q: QuestionFrancais): string[] {
  const ext = extrait(q.text);
  if (!ext) return ["pas d'extrait"];
  const pb: string[] = [];
  const cat = CATEGORIES.find((c) => c.items.some((it) => toutesReponses(it).includes(q.correct)));
  if (!cat) return [`« ${q.correct} » n'est dans aucune table`];
  const trouves = inferencesDans(ext, cat);
  if (trouves.length !== 1) return [`le texte suggère ${trouves.length} réponses (${trouves.map((t) => toutesReponses(t)[0]).join(", ")})`];
  const it = trouves[0];
  if (!toutesReponses(it).includes(q.correct)) pb.push(`le texte suggère « ${toutesReponses(it)[0]} », pas « ${q.correct} »`);
  // En début de mot : « parapluie » ne dit pas « il pleut ».
  if (new RegExp(`(?<![\\p{L}])(?:${it.mot})`, "iu").test(ext)) pb.push("la réponse est écrite dans le texte : ce n'est plus de l'implicite");
  for (const w of q.wrongs) if (toutesReponses(it).includes(w) || !cat.items.some((x) => toutesReponses(x).includes(w))) pb.push(`le leurre « ${w} » ne va pas`);
  return pb;
}

/* ─────────────── 6e_comp_justifier ─────────────── */

// « Quelle phrase montre que Léa a peur ? » : les choix sont des phrases ; une
// seule est un indice de la conclusion, les autres sont neutres (ou absentes).

function genererJustifier(): QuestionFrancais {
  const { cat, it, p, ext } = texteImplicite(2);
  const phrases = phrasesDe(ext);
  const indice = phrases.find((ph) => it.indices.some((i) => motifProposition(i.replace(/\.$/, "")).test(ph)))!;
  const autreIt = pick(cat.items.filter((x) => x !== it));
  const absente = remplir(pick(autreIt.indices), p).replace(new RegExp(`^${p.nom} `), `${maj(ilElle(p.g))} `);
  const concl = forme(it.conclusion, p.g);
  const suite = cat.nom === "météo" ? concl : `${p.nom} ${concl}`;
  // « qu'il fait froid », « qu'Inès est médecin » (06/10/2026).
  const que = remplir(/^[aeiouéèêàâîôûœ]/i.test(suite) ? `qu'${suite}` : `que ${suite}`, p).replace(/^Qu/, "qu");
  const t = pick([
    `Quelle phrase du texte montre ${que} ?`,
    `Pour prouver ${que}, quelle phrase cites-tu ?`,
    `Quelle phrase permet de dire ${que} ?`,
  ]);
  return {
    text: `« ${ext} » ${t}`,
    correct: indice,
    wrongs: leurresDistincts(indice, [...melange(phrases.filter((x) => x !== indice)), absente]),
    methode: "Cherche la phrase qui PROUVE la réponse : celle où l'action du personnage la révèle.",
  };
}

function corrigerJustifier(q: QuestionFrancais): string[] {
  const ext = extrait(q.text);
  if (!ext) return ["pas d'extrait"];
  const pb: string[] = [];
  const question = q.text.slice(q.text.lastIndexOf(" »") + 2);
  const items = CATEGORIES.flatMap((c) => c.items).filter((it) =>
    (typeof it.conclusion === "string" ? [it.conclusion] : it.conclusion).some((c) => new RegExp(`(?<![\\p{L}])${echapper(c)}(?: \\?|,)`, "u").test(question)),
  );
  if (items.length !== 1) return [`conclusion de la question introuvable (${items.length})`];
  const it = items[0];
  const prouve = (ph: string) => it.indices.some((i) => motifProposition(i.replace(/\.$/, "")).test(ph));
  if (!phrasesDe(ext).includes(q.correct)) pb.push("la bonne réponse n'est pas une phrase du texte");
  if (!prouve(q.correct)) pb.push(`« ${q.correct} » ne prouve pas la conclusion`);
  if (phrasesDe(ext).filter(prouve).length !== 1) pb.push("le texte a plusieurs phrases qui prouvent");
  for (const w of q.wrongs) if (prouve(w)) pb.push(`le leurre « ${w} » prouve aussi la conclusion`);
  return pb;
}

/* ─────────────── 6e_comp_sens_global ─────────────── */

// Un petit récit de trois phrases ; la question demande de quoi il parle
// SURTOUT. Leurres : un détail du texte (piège classique) et d'autres sujets.
// « $N » = le prénom à chaque fois (après une phrase dont le sujet n'est pas
// le personnage, « il » hésiterait : « Le bateau quitte le port. Il… »).

type Recit = { theme: string; detail: string; phrases: string };
const RECITS: readonly Recit[] = [
  { theme: "la préparation d'un gâteau", detail: "les œufs", phrases: "$S sort la farine et les œufs. $S mélange tout dans un grand bol. Une heure plus tard, le gâteau sort du four." },
  { theme: "un match de football", detail: "le maillot", phrases: "$S enfile son maillot. L'arbitre siffle le coup d'envoi. À la dernière minute, $N marque le but de la victoire." },
  { theme: "la recherche d'un animal perdu", detail: "une voiture", phrases: "$S ne trouve plus {son chien|sa tortue}. $S fouille le jardin et appelle partout. Enfin, {le chien|la tortue} sort de sous une voiture." },
  { theme: "le premier jour au collège", detail: "un plan", phrases: "$S entre dans un grand bâtiment inconnu. $S cherche sa salle sur un plan. À midi, $S a déjà deux nouveaux amis." },
  { theme: "une sortie en bateau", detail: "le port", phrases: "$S monte à bord avec {son oncle|sa tante}. Le bateau quitte le port. Au large, $N aperçoit des dauphins." },
  { theme: "la préparation d'un exposé", detail: "les volcans", phrases: "$S choisit un sujet sur les volcans. $S cherche des informations au CDI. Puis $S prépare des affiches pour la classe." },
  { theme: "une randonnée en montagne", detail: "les chaussures", phrases: "$S lace ses chaussures de marche. Le sentier monte pendant des heures. Au sommet, $N admire la vue." },
  { theme: "une fête d'anniversaire", detail: "les bougies", phrases: "$S souffle ses onze bougies. Tous les invités chantent en chœur. Puis $N ouvre ses cadeaux." },
  { theme: "une panne d'électricité", detail: "une lampe de poche", phrases: "Soudain, toutes les lumières s'éteignent. $S cherche une lampe de poche. Toute la famille dîne à la bougie." },
  { theme: "l'adoption d'un chiot", detail: "un refuge", phrases: "$S et ses parents visitent un refuge. Un petit chien les regarde tristement. Le soir même, $N l'emmène à la maison." },
  { theme: "un concours de dessin", detail: "les crayons", phrases: "$S prépare ses crayons. $S dessine un dragon pendant deux heures. Le jury lui donne le premier prix." },
  { theme: "une journée à la neige", detail: "un chocolat chaud", phrases: "$S enfile sa combinaison. $S descend la piste en luge. Le soir, $S boit un chocolat chaud." },
  { theme: "un spectacle de théâtre", detail: "le rideau", phrases: "$S répète son rôle tous les soirs. Le jour venu, le rideau se lève. À la fin, le public applaudit très fort." },
  { theme: "un déménagement", detail: "les jouets", phrases: "$S emballe ses jouets dans des cartons. Un camion emporte les meubles. Le soir, $N découvre sa nouvelle chambre." },
  { theme: "une dispute entre amis", detail: "la récréation", phrases: "$S ne parle plus à {son meilleur ami|sa meilleure amie}. À la récréation, $S reste dans son coin. Le lendemain, les deux amis se réconcilient." },
  { theme: "une visite chez le dentiste", detail: "une brosse à dents", phrases: "$S s'installe dans un grand fauteuil. Le dentiste examine ses dents. Puis $N repart avec une brosse à dents neuve." },
  { theme: "une nuit sous la tente", detail: "les grenouilles", phrases: "$S plante la tente près d'un lac. $S regarde le soleil se coucher. Puis $S s'endort en écoutant les grenouilles." },
  { theme: "la cueillette des letchis", detail: "l'échelle", phrases: "En décembre, les letchis sont mûrs. $S grimpe à l'échelle. Bientôt, le panier déborde de fruits rouges." },
  { theme: "une course de vélo", detail: "le casque", phrases: "$S ajuste son casque sur la ligne de départ. $S pédale de toutes ses forces. Dans la dernière côte, $S dépasse tout le monde." },
  { theme: "une expérience de sciences", detail: "une éprouvette", phrases: "$S verse du vinaigre dans une éprouvette. $S ajoute une cuillère de bicarbonate. Aussitôt, une mousse déborde." },
];
/** Comme `remplir`, avec « $N » = toujours le prénom, et une majuscule après chaque point. */
const remplirRecit = (phrases: string, p: Prenom) =>
  desambiguiser(remplir(phrases.replace(/\$N/g, p.nom), p).replace(/\. (il|elle) /g, (_m, x) => `. ${maj(x)} `), p);

function genererSensGlobal(): QuestionFrancais {
  const r = pick(RECITS);
  const ext = remplirRecit(r.phrases, pick(PRENOMS));
  const autres = tirerN(RECITS.filter((x) => x !== r), 2).map((x) => x.theme);
  const titre = Math.random() < 0.35;
  const f = (s: string) => (titre ? maj(s) : s);
  const t = titre
    ? pick(["Quel titre conviendrait le mieux à ce texte ?", "Quel titre choisirais-tu pour ce texte ?"])
    : pick(["De quoi parle surtout ce texte ?", "Ce texte raconte surtout…", "Quel est le sujet principal de ce texte ?"]);
  return {
    text: `« ${ext} » ${t}`,
    correct: f(r.theme),
    wrongs: melange([f(r.detail), ...autres.map(f)]),
    methode: "Ne t'arrête pas à un détail : cherche ce dont parlent TOUTES les phrases du texte.",
  };
}

/** Le récit dont toutes les phrases se retrouvent dans le texte. */
const recitDuTexte = (ext: string) =>
  RECITS.filter((r) => r.phrases.split(/(?<=\.) /).every((ph) => motifProposition(ph.replace(/\$N/g, "$S").replace(/\.$/, "")).test(ext)));

function corrigerSensGlobal(q: QuestionFrancais): string[] {
  const ext = extrait(q.text);
  if (!ext) return ["pas d'extrait"];
  const r = recitDuTexte(ext);
  if (r.length !== 1) return [`le texte correspond à ${r.length} récits`];
  const pb: string[] = [];
  if (norm(q.correct) !== norm(r[0].theme)) pb.push(`le sujet est « ${r[0].theme} », pas « ${q.correct} »`);
  for (const w of q.wrongs) {
    if (norm(w) === norm(r[0].theme)) pb.push(`le leurre « ${w} » est le sujet`);
    else if (norm(w) !== norm(r[0].detail) && !RECITS.some((x) => norm(x.theme) === norm(w))) pb.push(`le leurre « ${w} » n'est dans aucune table`);
  }
  return pb;
}

/* ─────────────── 6e_comp_genre ─────────────── */

// Chaque genre est composé avec SES marques (« Il était une fois », la morale,
// les noms en capitales du théâtre, les vers séparés par « / »…). Le
// correcteur cherche ces marques dans le texte : un seul genre doit apparaître.

const PERSOS_CONTE = ["un roi très avare", "une princesse curieuse", "un meunier pauvre", "une fée distraite", "un géant solitaire", "une sorcière gourmande", "un jeune berger", "une reine très fière"];
const LIEUX_CONTE = ["au fond d'une forêt sombre", "dans un château de glace", "au bord d'une rivière", "en haut d'une tour", "dans un petit village"];
const EVENEMENTS_CONTE = ["un oiseau magique frappa à sa fenêtre", "une vieille femme lui demanda de l'aide", "un dragon apparut dans le ciel", "une clé d'or tomba du ciel", "un loup se mit à parler"];
// Le premier animal est GRAND, le second petit (« plus petit que lui »).
const GRANDS_FABLE = ["lion", "loup", "sanglier", "taureau", "cerf", "bouc", "renard"];
const PETITS_FABLE = ["rat", "moineau", "grillon", "lézard", "mulot", "pigeon", "rouge-gorge"];
const MORALES = ["On a souvent besoin d'un plus petit que soi.", "Il ne faut jamais mépriser les plus faibles.", "Qui se moque des autres finit par être moqué.", "Le plus petit peut sauver le plus grand."];
const REPLIQUES = [["Tu as entendu ce bruit ?", "Ce n'est que le vent."], ["Où as-tu caché la clé ?", "Je ne dirai rien !"], ["Viens vite, le spectacle commence !", "J'arrive, attends-moi."], ["Qui a mangé mon gâteau ?", "Ce n'est pas moi, je le jure !"]];
const DIDASCALIES = ["à voix basse", "en riant", "en courant vers la porte", "en levant les bras", "en se cachant"];
const VERS = [
  ["Le soleil s'endort sur la mer", "La lune monte dans l'air"], ["Dans le jardin chante un merle", "Sur la feuille brille une perle"],
  ["Le vent court sur la colline", "Il fait danser l'églantine"], ["La pluie tombe sur le toit", "Elle chante comme autrefois"],
  ["Petit chat dort près du feu", "Il ferme à demi les yeux"], ["La neige couvre le chemin", "Tout est blanc jusqu'au matin"],
];
const RECETTES = [
  { plat: "la pâte à crêpes", ing: "farine, œufs, lait", etapes: "Mélangez la farine et les œufs. Versez le lait petit à petit." },
  { plat: "la salade de fruits", ing: "pommes, bananes, oranges", etapes: "Coupez les fruits en morceaux. Arrosez de jus d'orange." },
  { plat: "le gâteau au yaourt", ing: "yaourt, sucre, farine, œufs", etapes: "Versez le yaourt dans un saladier. Ajoutez le sucre puis la farine." },
  { plat: "la soupe de légumes", ing: "carottes, poireaux, pommes de terre", etapes: "Épluchez les légumes. Faites-les cuire dans l'eau bouillante." },
];
const VILLES = ["Lyon", "Brest", "Lille", "Marseille", "Grenoble", "Nantes", "Strasbourg", "Saint-Denis de La Réunion"];
const MOIS = ["janvier", "mars", "avril", "mai", "juin", "octobre", "novembre"];
const FAITS_PRESSE = ["les élèves du collège ont planté cent arbres dans le parc", "une tortue géante est arrivée au zoo de la ville", "la bibliothèque a ouvert une salle de jeux de société", "un orage a privé le quartier d'électricité", "l'équipe de handball des moins de 13 ans a gagné la coupe régionale"];
const ANIMAUX_DOC = [
  { a: "Le hérisson", classe: "un petit mammifère", vit: "dans les haies et les jardins", mange: "d'insectes et de vers" },
  { a: "La chouette", classe: "un oiseau de nuit", vit: "dans les arbres creux", mange: "de souris et de mulots" },
  { a: "La tortue de mer", classe: "un reptile", vit: "dans les océans chauds", mange: "de méduses et d'algues" },
  { a: "L'abeille", classe: "un insecte", vit: "dans une ruche", mange: "de nectar et de pollen" },
  { a: "Le requin-baleine", classe: "un poisson géant", vit: "dans les mers tropicales", mange: "de plancton" },
];

type Genre6 = { nom: string; marque: RegExp; composer: () => string };
const GENRES: readonly Genre6[] = [
  { nom: "un conte", marque: /Il était une fois/u, composer: () => `Il était une fois ${pick(PERSOS_CONTE)} qui vivait ${pick(LIEUX_CONTE)}. Un jour, ${pick(EVENEMENTS_CONTE)}.` },
  {
    nom: "une fable",
    marque: /Morale :/u,
    composer: () => {
      const [a, b] = [pick(GRANDS_FABLE), pick(PETITS_FABLE)];
      return `Un ${a} se moquait d'un ${b} plus petit que lui. Un jour, le ${b} lui sauva la vie. Morale : ${pick(MORALES)}`;
    },
  },
  {
    nom: "une pièce de théâtre",
    marque: /\p{Lu}{3,} (?:\(|:)/u,
    composer: () => {
      const [a, b] = tirerN(PRENOMS, 2).map((p) => p.nom.toUpperCase());
      const [r1, r2] = pick(REPLIQUES);
      return `${a} (${pick(DIDASCALIES)}) : ${r1} ${b} : ${r2}`;
    },
  },
  {
    nom: "un poème",
    marque: / \/ /u,
    composer: () => {
      const [v1, v2] = tirerN(VERS, 2);
      return `${v1[0]}, / ${v1[1]}. / ${v2[0]}, / ${v2[1]}.`;
    },
  },
  {
    nom: "une recette",
    marque: /Ingrédients :/u,
    composer: () => {
      const r = pick(RECETTES);
      return `${maj(r.plat)}. Ingrédients : ${r.ing}. ${r.etapes}`;
    },
  },
  {
    nom: "une lettre",
    marque: /^Ch(?:er|ère) \p{Lu}[^,]*,/u,
    composer: () => {
      const [a, b] = tirerN(PRENOMS, 2);
      return `${a.g === "f" ? "Chère" : "Cher"} ${a.nom}, je t'écris depuis ${pick(["la montagne", "la mer", "chez ma grand-mère", "la colonie de vacances"])}. Tu me manques beaucoup. Je t'embrasse, ${b.nom}.`;
    },
  },
  {
    nom: "un article de journal",
    marque: /^[\p{Lu}][^,.]+, le \d+ \p{L}+\./u,
    composer: () => `${pick(VILLES)}, le ${2 + Math.floor(Math.random() * 27)} ${pick(MOIS)}. Hier, ${pick(FAITS_PRESSE)}.`,
  },
  {
    nom: "un texte documentaire",
    marque: /est (?:un|une) (?:petit mammifère|oiseau de nuit|reptile|insecte|poisson géant)\./u,
    composer: () => {
      const d = pick(ANIMAUX_DOC);
      return `${d.a} est ${d.classe}. Il vit ${d.vit}. Il se nourrit ${d.mange}.`.replace(/^(La [^.]+\. )Il/u, "$1Elle").replace(/^(L'abeille[^.]+\. )Il/u, "$1Elle");
    },
  },
];

function genererGenre(): QuestionFrancais {
  const g = pick(GENRES);
  const t = pick(["À quel genre appartient ce texte ?", "Ce texte est sans doute…", "Quel type de texte est-ce ?", "Qu'est-ce qui décrit le mieux ce texte ?"]);
  return {
    text: `« ${g.composer()} » ${t}`,
    correct: g.nom,
    wrongs: tirerN(GENRES.filter((x) => x !== g), 3).map((x) => x.nom),
    methode: "Repère les marques du genre : la formule du début, la morale, les noms des personnages devant les répliques, les vers, la liste d'ingrédients…",
  };
}

function corrigerGenre(q: QuestionFrancais): string[] {
  const ext = extrait(q.text);
  if (!ext) return ["pas d'extrait"];
  const trouves = GENRES.filter((g) => g.marque.test(ext));
  if (trouves.length !== 1) return [`le texte porte les marques de ${trouves.length} genres (${trouves.map((g) => g.nom).join(", ")})`];
  const pb: string[] = [];
  if (q.correct !== trouves[0].nom) pb.push(`le genre est « ${trouves[0].nom} », pas « ${q.correct} »`);
  for (const w of q.wrongs) if (w === trouves[0].nom || !GENRES.some((g) => g.nom === w)) pb.push(`le leurre « ${w} » ne va pas`);
  if (/^(La|L'abeille)/u.test(ext) && / Il vit/u.test(ext)) pb.push("pronom masculin pour un animal féminin");
  return pb;
}

/* ─────────────── 6e_comp_defi ─────────────── */

// Défi : deux indices à croiser (« où ET quand ? »), ou l'implicite noyé dans
// trois phrases neutres. La réponse n'est jamais écrite.

function genererCompDefi(): QuestionFrancais {
  if (Math.random() < 0.4) {
    const q = genererImplicite(3);
    return { ...q, methode: "Plusieurs phrases ne servent à rien : trouve celle qui révèle la réponse, puis déduis." };
  }
  const t = texteIndices(true);
  const autreL = pick(LIEUX.filter((l) => l !== t.lieu));
  const autreM = pick(MOMENTS.filter((m) => m !== t.moment));
  const rep = (l: Cadre, m: Cadre) => `${maj(l.nom)}, ${m.nom}`;
  return {
    text: `« ${t.ext} » ${pick(["Où et quand se passe cette scène ?", "Où se trouve le personnage, et à quel moment ?", "Dans quel lieu et à quel moment sommes-nous ?"])}`,
    correct: rep(t.lieu, t.moment),
    wrongs: melange([rep(t.lieu, autreM), rep(autreL, t.moment), rep(pick(LIEUX.filter((l) => l !== t.lieu && l !== autreL)), pick(MOMENTS.filter((m) => m !== t.moment && m !== autreM)))]),
    methode: "Cherche DEUX indices : un mot qui trahit le lieu, un autre qui trahit le moment.",
  };
}

function corrigerCompDefi(q: QuestionFrancais): string[] {
  if (!/Où|lieu/.test(q.text)) return corrigerImplicite(q);
  const ext = extrait(q.text);
  const lieux = cadresDans(ext, LIEUX);
  const moments = cadresDans(ext, MOMENTS);
  if (lieux.length !== 1 || moments.length !== 1) return [`le texte trahit ${lieux.length} lieux et ${moments.length} moments`];
  const attendu = `${maj(lieux[0].nom)}, ${moments[0].nom}`;
  const pb: string[] = [];
  if (q.correct !== attendu) pb.push(`la bonne réponse est « ${attendu} »`);
  for (const w of q.wrongs) if (w === attendu) pb.push(`le leurre « ${w} » est la bonne réponse`);
  return pb;
}

/* ═══════════════════ comprehension_documents ═══════════════════ */

/* ─────────────── 6e_comp_documents ─────────────── */

// Une ligne de source composée (auteur, titre, support, date) ; la question
// porte sur l'un de ces éléments, ou sur la nature du document (déduite du
// support). Supports inventés : aucun vrai journal n'est cité.

const NOMS = ["Martin", "Benali", "Nguyen", "Rakoto", "Dubois", "Moreau", "Diallo", "Lefèvre", "Payet", "Garcia", "Rossi", "Kowalski", "Haddad", "Tanaka"];
const SUPPORTS = [
  { nom: "La Gazette des collégiens", nature: "un article de journal" },
  { nom: "L'Écho du quartier", nature: "un article de journal" },
  { nom: "le magazine Planète Junior", nature: "un article de magazine" },
  { nom: "le magazine Curieux de nature", nature: "un article de magazine" },
  { nom: "l'encyclopédie Mille Questions", nature: "un article d'encyclopédie" },
  { nom: "l'encyclopédie Le Monde vivant", nature: "un article d'encyclopédie" },
  { nom: "le site nature-pour-tous.fr", nature: "une page de site internet" },
  { nom: "le site du musée des Sciences", nature: "une page de site internet" },
  { nom: "le roman Le Secret du phare", nature: "un extrait de roman" },
  { nom: "le roman La Forêt des lucioles", nature: "un extrait de roman" },
];
const NATURES = [...new Set(SUPPORTS.map((s) => s.nature))];
const TITRES = ["Les hérissons au jardin", "Comment naissent les volcans", "Le retour des baleines", "Les secrets des abeilles", "Le vélo à l'école", "Pourquoi la mer est salée", "Les étoiles filantes d'août", "La vie des fourmis", "Le tri des déchets en classe", "Les grandes migrations"];
/** Pour un roman, le titre entre guillemets est celui d'un CHAPITRE. */
const CHAPITRES = ["Une nuit au musée", "Le mystère de la cabane", "La lettre sans signature", "Le départ", "Une rencontre inattendue", "La tempête"];
const titreDe = (sup: { nature: string }) => pick(sup.nature === "un extrait de roman" ? CHAPITRES : TITRES);
const dateAuHasard = () => `${2 + Math.floor(Math.random() * 27)} ${pick(MOIS)} ${2019 + Math.floor(Math.random() * 7)}`;
const auteurAuHasard = () => `${pick(PRENOMS).nom} ${pick(NOMS)}`;
const MOTIF_SOURCE = /Source : ([^,]+), « ([^»]+) », ([^,]+), (\d+ \p{L}+ \d{4})\./u;

function genererDocuments(): QuestionFrancais {
  const sup = pick(SUPPORTS);
  const [auteur, titre, date] = [auteurAuHasard(), titreDe(sup), dateAuHasard()];
  const source = `Source : ${auteur}, « ${titre} », ${sup.nom}, ${date}.`;
  const autres = (f: () => string, v: string) => {
    const s = new Set<string>();
    while (s.size < 2) { const x = f(); if (x !== v) s.add(x); }
    return [...s];
  };
  const q = pick(["auteur", "titre", "support", "date", "nature", "nature"] as const);
  const intro = pick(["Lis la source de ce document.", "Voici la source d'un document.", "Observe cette source."]);
  const Q = {
    auteur: { t: pick(["Qui a écrit ce document ?", "Quel est l'auteur de ce document ?"]), c: auteur, w: [...autres(auteurAuHasard, auteur), sup.nom] },
    titre: { t: pick(["Quel est le titre de ce document ?", "Comment s'appelle ce document ?"]), c: titre, w: [sup.nom, ...tirerN([...TITRES, ...CHAPITRES].filter((x) => x !== titre), 2)] },
    support: { t: pick(["Où ce document a-t-il été publié ?", "D'où vient ce document ?"]), c: sup.nom, w: [auteur, ...tirerN(SUPPORTS.filter((s) => s !== sup), 2).map((s) => s.nom)] },
    date: { t: pick(["Quand ce document a-t-il été publié ?", "Quelle est la date de ce document ?"]), c: date, w: autres(dateAuHasard, date) },
    nature: { t: pick(["Quelle est la nature de ce document ?", "Ce document est…"]), c: sup.nature, w: tirerN(NATURES.filter((n) => n !== sup.nature), 3) },
  }[q];
  return { text: `${intro} ${source} ${Q.t}`, correct: Q.c, wrongs: leurresDistincts(Q.c, Q.w), methode: "La source se lit dans l'ordre : l'auteur, le titre entre guillemets, le support, puis la date." };
}

function corrigerDocuments(q: QuestionFrancais): string[] {
  const m = MOTIF_SOURCE.exec(q.text);
  if (!m) return ["source illisible"];
  const [, auteur, titre, supNom, date] = m;
  const sup = SUPPORTS.find((s) => s.nom === supNom);
  if (!sup) return [`support inconnu : « ${supNom} »`];
  const question = q.text.slice(m.index + m[0].length);
  const attendu = /écrit|auteur/.test(question) ? auteur : /titre|appelle/.test(question) ? titre : /Où|D'où/.test(question) ? supNom : /Quand|date/.test(question) ? date : /nature|Ce document est/.test(question) ? sup.nature : null;
  if (!attendu) return ["question non reconnue"];
  const pb: string[] = [];
  if (q.correct !== attendu) pb.push(`la bonne réponse est « ${attendu} », pas « ${q.correct} »`);
  for (const w of q.wrongs) if (w === attendu) pb.push(`le leurre « ${w} » est la bonne réponse`);
  return pb;
}

/* ─────────────── 6e_comp_documents_comparer ─────────────── */

// Deux documents sur un même animal : chacun donne deux informations, dont une
// en commun (d'accord ou non). Le correcteur relit les deux documents et
// recalcule ce qui est commun, propre à un seul, ou contradictoire.

type Info = "taille" | "nourriture" | "vie" | "habitat";
const LIBELLE_INFO: Record<Info, string> = { taille: "la taille", nourriture: "la nourriture", vie: "la durée de vie", habitat: "l'endroit où vit l'animal" };
/** Phrase d'une information ; « $A » = l'animal (nom ou pronom). */
const PHRASE_INFO: Record<Info, string> = { taille: "$A mesure environ $V.", nourriture: "$A mange $V.", vie: "$A vit environ $V.", habitat: "$A habite $V." };
const MOTIF_INFO: Record<Info, RegExp> = {
  taille: /mesure environ ([^.]+)\./u, nourriture: / mange ([^.]+)\./u, vie: /vit environ ([^.]+)\./u, habitat: /habite ([^.]+)\./u,
};
type FicheAnimal = { nom: string; f: boolean } & Record<Info, [string, string]>; // [valeur, autre valeur]
const FICHES: readonly FicheAnimal[] = [
  { nom: "le hérisson", f: false, taille: ["25 cm", "40 cm"], nourriture: ["des insectes et des vers", "des fruits et des graines"], vie: ["5 ans", "12 ans"], habitat: ["les haies et les jardins", "les grottes"] },
  { nom: "la chouette", f: true, taille: ["35 cm", "60 cm"], nourriture: ["des souris et des mulots", "des feuilles"], vie: ["10 ans", "3 ans"], habitat: ["les arbres creux", "les terriers"] },
  { nom: "le panda", f: false, taille: ["1,5 m", "3 m"], nourriture: ["du bambou", "des poissons"], vie: ["20 ans", "6 ans"], habitat: ["les forêts de bambous", "les déserts"] },
  { nom: "le manchot", f: false, taille: ["1 m", "2 m"], nourriture: ["des poissons", "des herbes"], vie: ["20 ans", "4 ans"], habitat: ["les côtes glacées", "les forêts tropicales"] },
  { nom: "le koala", f: false, taille: ["70 cm", "2 m"], nourriture: ["des feuilles d'eucalyptus", "des insectes"], vie: ["15 ans", "40 ans"], habitat: ["les eucalyptus", "les rivières"] },
  { nom: "la tortue de mer", f: true, taille: ["1 m", "4 m"], nourriture: ["des méduses et des algues", "des noix"], vie: ["80 ans", "8 ans"], habitat: ["les océans chauds", "les montagnes"] },
  { nom: "le dauphin", f: false, taille: ["2,5 m", "8 m"], nourriture: ["des poissons", "des fruits"], vie: ["40 ans", "5 ans"], habitat: ["les mers du monde entier", "les lacs gelés"] },
  { nom: "la chauve-souris", f: true, taille: ["10 cm", "50 cm"], nourriture: ["des moustiques", "des graines"], vie: ["20 ans", "2 ans"], habitat: ["les grottes et les greniers", "les rivières"] },
  { nom: "l'écureuil", f: false, taille: ["20 cm", "50 cm"], nourriture: ["des noisettes et des glands", "des poissons"], vie: ["6 ans", "25 ans"], habitat: ["les forêts", "les plages"] },
  { nom: "la baleine bleue", f: true, taille: ["25 m", "8 m"], nourriture: ["du krill", "des algues"], vie: ["80 ans", "10 ans"], habitat: ["les océans", "les fleuves"] },
  { nom: "le lézard vert", f: false, taille: ["35 cm", "1 m"], nourriture: ["des insectes", "des feuilles"], vie: ["10 ans", "30 ans"], habitat: ["les murets ensoleillés", "les étangs"] },
  { nom: "l'abeille", f: true, taille: ["1,5 cm", "5 cm"], nourriture: ["du nectar et du pollen", "des insectes"], vie: ["6 semaines", "2 ans"], habitat: ["une ruche", "un terrier"] },
];
const NATURES_DOC = ["une fiche du zoo", "un article de magazine", "une page d'encyclopédie", "un exposé d'élève", "une affiche du parc naturel"];

function composerDoc(a: FicheAnimal, infos: [Info, string][]) {
  return infos.map(([i, v], k) => PHRASE_INFO[i].replace("$A", k === 0 ? maj(a.nom) : a.f ? "Elle" : "Il").replace("$V", v)).join(" ");
}
const MOTIF_DOCS = /Document 1 \(([^)]+)\) : « ([^«»]+) » Document 2 \(([^)]+)\) : « ([^«»]+) »/u;
const lireDoc = (d: string) => {
  const out = new Map<Info, string>();
  for (const i of Object.keys(MOTIF_INFO) as Info[]) { const m = MOTIF_INFO[i].exec(d); if (m) out.set(i, m[1]); }
  return out;
};

function genererComparer(): QuestionFrancais {
  const a = pick(FICHES);
  const [A, B, C, D] = melange(Object.keys(LIBELLE_INFO) as Info[]);
  const desaccord = Math.random() < 0.35;
  const d1 = composerDoc(a, melange([[A, a[A][0]], [B, a[B][0]]] as [Info, string][]));
  const d2 = composerDoc(a, melange([[B, a[B][desaccord ? 1 : 0]], [C, a[C][0]]] as [Info, string][]));
  const [n1, n2] = tirerN(NATURES_DOC, 2);
  const docs = `Document 1 (${n1}) : « ${d1} » Document 2 (${n2}) : « ${d2} »`;
  const lib = (i: Info) => LIBELLE_INFO[i];
  let t: string, c: Info, w: Info[];
  if (desaccord) [t, c, w] = [pick(["Sur quelle information les deux documents ne sont-ils pas d'accord ?", "Quelle information change d'un document à l'autre ?"]), B, [A, C, D]];
  else {
    const k = pick(["commun", "seul2", "seul1"] as const);
    if (k === "commun") [t, c, w] = [pick(["Quelle information se trouve dans les deux documents ?", "Sur quelle information les deux documents se rejoignent-ils ?"]), B, [A, C, D]];
    else if (k === "seul2") [t, c, w] = ["Quelle information donne SEULEMENT le document 2 ?", C, [A, B, D]];
    else [t, c, w] = ["Quelle information donne SEULEMENT le document 1 ?", A, [B, C, D]];
  }
  return { text: `${docs} ${t}`, correct: lib(c), wrongs: w.map(lib), methode: "Lis les deux documents phrase par phrase, et coche ce que dit chacun : ce qui est dans les deux, dans un seul, ou différent." };
}

function corrigerComparer(q: QuestionFrancais): string[] {
  const m = MOTIF_DOCS.exec(q.text);
  if (!m) return ["documents illisibles"];
  const [d1, d2] = [lireDoc(m[2]), lireDoc(m[4])];
  const question = q.text.slice(m.index + m[0].length);
  const infos = Object.keys(LIBELLE_INFO) as Info[];
  let attendus: Info[];
  if (/pas d'accord|change/.test(question)) attendus = infos.filter((i) => d1.has(i) && d2.has(i) && d1.get(i) !== d2.get(i));
  else if (/deux documents|rejoignent/.test(question)) attendus = infos.filter((i) => d1.has(i) && d2.has(i) && d1.get(i) === d2.get(i));
  else if (/document 2/.test(question)) attendus = infos.filter((i) => d2.has(i) && !d1.has(i));
  else if (/document 1/.test(question)) attendus = infos.filter((i) => d1.has(i) && !d2.has(i));
  else return ["question non reconnue"];
  if (attendus.length !== 1) return [`${attendus.length} réponses possibles`];
  const pb: string[] = [];
  if (q.correct !== LIBELLE_INFO[attendus[0]]) pb.push(`la bonne réponse est « ${LIBELLE_INFO[attendus[0]]} »`);
  for (const w of q.wrongs) if (w === LIBELLE_INFO[attendus[0]]) pb.push(`le leurre « ${w} » est la bonne réponse`);
  return pb;
}

/* ─────────────── 6e_comp_image ─────────────── */

// L'image est DÉCRITE (le coach n'affiche pas d'image ici) : ce qu'on voit au
// premier plan, au centre, à l'arrière-plan, et le texte écrit dessus. On
// interroge les plans, le plus proche / le plus lointain, le sujet de l'image.

/** Des paysages cohérents : les éléments d'une même image vont ensemble. */
const SCENES_IMAGE = [
  { titres: ["Festival de la mer", "Souvenir de Bretagne"], elements: ["un enfant qui ramasse des coquillages", "un voilier", "un phare blanc", "un pêcheur sur sa barque", "une mouette posée sur un rocher"] },
  { titres: ["Fête de la montagne", "Randonnée des cimes"], elements: ["une fillette avec des bâtons de marche", "un troupeau de vaches", "une forêt de sapins", "une montagne enneigée", "un petit chalet"] },
  { titres: ["Journée sans voiture", "Ma ville à vélo"], elements: ["un vélo rouge", "un bus scolaire", "une grande roue", "une fontaine", "un grand immeuble"] },
  { titres: ["Fête du village", "Marché de la ferme"], elements: ["un chien qui saute", "un champ de tournesols", "un tracteur", "une ferme", "un moulin"] },
  { titres: ["Souvenir du volcan", "Sur les pentes du volcan"], elements: ["un randonneur avec un sac à dos", "une coulée de lave refroidie", "un volcan qui fume", "un nuage de fumée grise"] },
  { titres: ["Pique-nique au parc", "Printemps au jardin public"], elements: ["une fillette avec un cerf-volant", "un arbre en fleurs", "un kiosque à musique", "un lac avec des canards", "un banc vert"] },
  { titres: ["Visite du château", "Journée du patrimoine"], elements: ["un chevalier en armure", "un pont-levis", "un château fort", "une tour avec un drapeau"] },
];
const IMAGES = [
  { type: "une affiche", ecrit: (s: string) => `En haut, un titre en grosses lettres : « ${s} ».` },
  { type: "une photographie", ecrit: (s: string) => `En bas, une légende : « ${s} ».` },
  { type: "une carte postale", ecrit: (s: string) => `En bas à droite, il est écrit : « ${s} ».` },
];
const SUJETS_IMAGE = SCENES_IMAGE.flatMap((s) => s.titres);
const PLANS = { premier: "au premier plan", centre: "au centre", fond: "à l'arrière-plan" } as const;

function genererImage(): QuestionFrancais {
  const scene = pick(SCENES_IMAGE);
  const [x, y, z] = tirerN(scene.elements, 3);
  const horsImage = pick(pick(SCENES_IMAGE.filter((s) => s !== scene)).elements);
  const img = pick(IMAGES);
  const sujet = pick(scene.titres);
  const description = `Voici ${img.type}. Au premier plan, on voit ${x}. Au centre, on voit ${y}. À l'arrière-plan, on voit ${z}. ${img.ecrit(sujet)}`;
  const k = pick(["premier", "fond", "centre", "proche", "loin", "ou", "ecrit"] as const);
  const elt = { premier: x, centre: y, fond: z } as const;
  const Q: Record<typeof k, () => { t: string; c: string; w: string[] }> = {
    premier: () => ({ t: "Que voit-on au premier plan ?", c: x, w: [y, z, horsImage] }),
    centre: () => ({ t: "Que voit-on au centre de l'image ?", c: y, w: [x, z, horsImage] }),
    fond: () => ({ t: "Que voit-on à l'arrière-plan ?", c: z, w: [x, y, horsImage] }),
    proche: () => ({ t: "Quel élément est le plus proche de celui qui regarde ?", c: x, w: [y, z, horsImage] }),
    loin: () => ({ t: "Quel élément est le plus loin de celui qui regarde ?", c: z, w: [x, y, horsImage] }),
    ou: () => {
      const p = pick(["premier", "centre", "fond"] as const);
      return { t: `Où se trouve ${elt[p]} sur l'image ?`, c: PLANS[p], w: [...Object.values(PLANS).filter((v) => v !== PLANS[p]), "on ne le voit pas"] };
    },
    ecrit: () => ({ t: pick(["Quel texte est écrit sur l'image ?", "Quels mots peut-on lire sur l'image ?"]), c: sujet, w: tirerN(SUJETS_IMAGE.filter((s) => s !== sujet), 3) }),
  };
  const q = Q[k]();
  return { text: `${description} ${q.t}`, correct: q.c, wrongs: q.w, methode: "Lis l'image dans l'ordre : le premier plan (le plus près de toi), le centre, puis l'arrière-plan (le plus loin), et le texte écrit dessus." };
}

function corrigerImage(q: QuestionFrancais): string[] {
  const m = /Au premier plan, on voit ([^.]+)\. Au centre, on voit ([^.]+)\. À l'arrière-plan, on voit ([^.]+)\. [^«]*« ([^»]+) »\.\s*(.*)$/u.exec(q.text);
  if (!m) return ["description illisible"];
  const [, x, y, z, ecrit, question] = m;
  let attendu: string | null = null;
  if (/premier plan \?|plus proche/.test(question)) attendu = x;
  else if (/au centre/.test(question)) attendu = y;
  else if (/arrière-plan \?|plus loin/.test(question)) attendu = z;
  else if (/écrit|lire/.test(question)) attendu = ecrit;
  else {
    const o = /Où se trouve (.+) sur l'image \?/u.exec(question);
    if (o) attendu = o[1] === x ? PLANS.premier : o[1] === y ? PLANS.centre : o[1] === z ? PLANS.fond : null;
  }
  if (!attendu) return ["question non reconnue"];
  const pb: string[] = [];
  if (q.correct !== attendu) pb.push(`la bonne réponse est « ${attendu} »`);
  for (const w of q.wrongs) if (w === attendu) pb.push(`le leurre « ${w} » est la bonne réponse`);
  return pb;
}

/* ─────────────── 6e_comp_documents_defi ─────────────── */

// Trois documents : le message d'un enfant donne le JOUR, le tableau donne
// l'HEURE de chaque jour, la légende de la photo donne le LIEU. La réponse
// exige de croiser les trois ; le correcteur refait le croisement.

const ACTIVITES = ["l'atelier de cuisine", "le tournoi d'échecs", "la course d'orientation", "la sortie au musée", "le concert de la chorale", "l'atelier de robotique", "la fête des sciences", "le cross du collège", "l'initiation à l'escalade", "la séance de cinéma en plein air"];
const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
const LIEUX_ACTIVITE = ["au gymnase", "dans la cour", "à la médiathèque", "au parc municipal", "dans la salle polyvalente", "au stade", "à la salle des fêtes"];
const HEURES = ["9 h", "10 h", "11 h", "14 h", "15 h", "16 h", "17 h"];

function genererDocumentsDefi(): QuestionFrancais {
  const p = pick(PRENOMS);
  const act = pick(ACTIVITES);
  const jours = tirerN(JOURS, 3).sort((a, b) => JOURS.indexOf(a) - JOURS.indexOf(b));
  const heures = tirerN(HEURES, 3);
  const k = Math.floor(Math.random() * 3);
  const [lieu, autreLieu] = tirerN(LIEUX_ACTIVITE, 2);
  const doc1 = `Message ${de(p.nom)} : « Je participe à ${act} ${jours[k]}. »`.replace(/à le /, "au ");
  const doc2 = `Tableau des horaires : ${jours.map((j, i) => `${j} ${heures[i]}`).join(" ; ")}.`;
  const doc3 = `Légende de la photo : « ${maj(act)} a lieu ${lieu}. »`;
  const rep = (h: string, l: string) => `à ${h}, ${l}`;
  const autreH = heures.filter((_, i) => i !== k);
  const t = pick([`À quelle heure et où ${p.nom} doit-${ilElle(p.g)} se rendre ?`, `Quand et où ${p.nom} doit-${ilElle(p.g)} aller ?`]);
  return {
    text: `${doc1} ${doc2} ${doc3} ${t}`,
    correct: rep(heures[k], lieu),
    wrongs: melange([rep(autreH[0], lieu), rep(heures[k], autreLieu), rep(autreH[1], autreLieu)]),
    methode: "Croise les trois documents : le message donne le jour, le tableau l'heure de ce jour, la photo le lieu.",
  };
}

function corrigerDocumentsDefi(q: QuestionFrancais): string[] {
  const m1 = /Je participe [^«»]+? (\p{L}+)\. »/u.exec(q.text);
  const m2 = /Tableau des horaires : ([^.]+)\./u.exec(q.text);
  const m3 = /a lieu ([^.]+)\. »/u.exec(q.text);
  if (!m1 || !m2 || !m3) return ["documents illisibles"];
  const horaires = new Map(m2[1].split(" ; ").map((x) => [x.split(" ")[0], x.slice(x.indexOf(" ") + 1)] as [string, string]));
  const h = horaires.get(m1[1]);
  if (!h) return [`le jour « ${m1[1]} » n'est pas dans le tableau`];
  const attendu = `à ${h}, ${m3[1]}`;
  const pb: string[] = [];
  if (q.correct !== attendu) pb.push(`la bonne réponse est « ${attendu} »`);
  for (const w of q.wrongs) if (w === attendu) pb.push(`le leurre « ${w} » est la bonne réponse`);
  return pb;
}

/* ═══════════════════ fluence_lecture ═══════════════════ */

/* ─────────────── 6e_flue_130_mots ─────────────── */

// Le repère de 6e : environ 130 mots lus par minute. On CALCULE une vitesse
// de lecture, un temps ou un nombre de mots, et l'on compare au repère.

const TEXTES_LUS = ["un conte", "un article", "une page de roman", "un poème", "un texte documentaire", "une fable", "une lettre", "un extrait de bande dessinée"];
const fmtMots = (n: number) => `${n} mots`;

function genererFluence130(): QuestionFrancais {
  const p = pick(PRENOMS);
  const v = 80 + 5 * Math.floor(Math.random() * 17); // 80 à 160 mots par minute
  const t = 2 + Math.floor(Math.random() * 3); // 2 à 4 minutes
  const m = v * t;
  const il = ilElle(p.g);
  const doc = pick(TEXTES_LUS);
  const intro = `${p.nom} lit ${doc} de ${m} mots en ${t} minutes, sans s'arrêter.`;
  const k = pick(["vitesse", "vitesse", "repere", "duree"] as const);
  if (k === "vitesse")
    return {
      text: `${intro} ${pick([`Combien de mots lit-${il} par minute ?`, `Quelle est sa vitesse de lecture ?`])}`,
      correct: `${v} mots par minute`,
      wrongs: [`${v + 10} mots par minute`, `${v - 10} mots par minute`, `${m} mots par minute`],
      methode: "Divise le nombre de mots par le nombre de minutes.",
    };
  if (k === "repere") {
    const atteint = v >= 130;
    const oui = `Oui : ${il} lit ${v} mots par minute.`;
    const non = `Non : ${il} lit ${v} mots par minute.`;
    return {
      text: `${intro} Atteint-${il} le repère de 6e, environ 130 mots par minute ?`,
      correct: atteint ? oui : non,
      wrongs: [atteint ? non : oui, `${atteint ? "Non" : "Oui"} : ${il} lit ${m} mots par minute.`, `${atteint ? "Oui" : "Non"} : ${il} lit ${m} mots par minute.`],
      methode: "Calcule d'abord sa vitesse (mots ÷ minutes), puis compare-la à 130.",
    };
  }
  // Moins de 1 000 mots : « 1085 » sans espace serait mal écrit, « 1 085 » trop long à lire.
  const t2s = [t + 1, t + 2, t + 3].filter((x) => v * x < 1000 && v * x + v < 1000);
  if (!t2s.length) return genererFluence130();
  const t2 = pick(t2s);
  return {
    text: `${intro} À la même vitesse, combien de mots lira-t-${il} en ${t2} minutes ?`,
    correct: fmtMots(v * t2),
    wrongs: [fmtMots(m + t2), fmtMots(v * t2 + v), fmtMots(v * t2 - v)],
    methode: "Trouve d'abord combien de mots sont lus en une minute, puis multiplie.",
  };
}

function corrigerFluence130(q: QuestionFrancais): string[] {
  const m = /de (\d+) mots en (\d+) minutes/u.exec(q.text);
  if (!m) return ["énoncé illisible"];
  const [mots, t] = [Number(m[1]), Number(m[2])];
  if (mots % t) return ["la vitesse ne tombe pas juste"];
  const v = mots / t;
  let attendu: string;
  const t2 = /en (\d+) minutes \?/u.exec(q.text);
  if (/repère/.test(q.text)) attendu = `${v >= 130 ? "Oui" : "Non"} : ${/-elle /.test(q.text) ? "elle" : "il"} lit ${v} mots par minute.`;
  else if (t2) attendu = fmtMots(v * Number(t2[1]));
  else attendu = `${v} mots par minute`;
  const pb: string[] = [];
  if (q.correct !== attendu) pb.push(`la bonne réponse est « ${attendu} »`);
  for (const w of q.wrongs) if (w === attendu) pb.push(`le leurre « ${w} » est la bonne réponse`);
  return pb;
}

/* ─────────────── 6e_flue_groupes_syntaxiques ─────────────── */

// Une phrase = un groupe sujet + un groupe verbal + un complément (de temps ou
// de lieu). La bonne lecture coupe ENTRE les groupes ; les leurres coupent au
// milieu d'un groupe. Le correcteur vérifie chaque morceau contre les tables.

const SUJETS_GS = ["La sœur de $P", "Le cousin de $P", "Mon vieux voisin", "Les élèves de sixième", "Notre professeur de musique", "La petite chienne noire", "Le grand frère de $P", "Un groupe de touristes", "La meilleure amie de $P"];
const GV_GS: Record<"s" | "p", string[]> = {
  s: ["attend le bus", "regarde les vagues", "lit une bande dessinée", "prépare le goûter", "traverse la rue", "range ses affaires", "dort profondément", "écoute la radio"],
  p: ["attendent le bus", "regardent les vagues", "lisent une bande dessinée", "préparent le goûter", "traversent la rue", "rangent leurs affaires", "dorment profondément", "écoutent la radio"],
};
const CC_GS = ["chaque matin", "dans la cour", "après l'école", "devant la fenêtre", "sous la pluie", "depuis une heure", "au bord du lac", "le dimanche soir"];
const GROUPES_GS = (() => {
  const s = new Set<string>([...GV_GS.s, ...GV_GS.p, ...CC_GS]);
  for (const x of SUJETS_GS) {
    if (x.includes("$P")) for (const p of PRENOMS) s.add(x.replace(" de $P", ` ${de(p.nom)}`));
    else s.add(x);
  }
  return s;
})();
/** Coupe une liste de mots aux positions données (après le mot i). */
const couper = (mots: string[], cuts: number[]) => {
  const parts: string[] = [];
  let d = 0;
  for (const c of [...cuts, mots.length]) { parts.push(mots.slice(d, c).join(" ")); d = c; }
  return parts.join(" / ");
};
const morceaux = (s: string) => s.replace(/\.$/, "").split(" / ");

function phraseGS() {
  const sujet = pick(SUJETS_GS).replace(" de $P", ` ${de(pick(PRENOMS).nom)}`);
  const pluriel = /^(Les|Un groupe)/.test(sujet) && !/^Un groupe/.test(sujet);
  const gv = pick(GV_GS[pluriel ? "p" : "s"]);
  const cc = pick(CC_GS);
  return [sujet, gv, cc];
}

function genererGroupes(): QuestionFrancais {
  const groupes = phraseGS();
  const mots = groupes.join(" ").split(" ");
  const b1 = groupes[0].split(" ").length;
  const b2 = b1 + groupes[1].split(" ").length;
  const correct = couper(mots, [b1, b2]) + ".";
  const leurres = new Set<string>();
  while (leurres.size < 3) {
    const [c1, c2] = tirerN([...Array(mots.length - 1).keys()].map((i) => i + 1), 2).sort((a, b) => a - b);
    if (c1 === b1 && c2 === b2) continue;
    leurres.add(couper(mots, [c1, c2]) + ".");
  }
  return {
    text: `${pick(["Quelle lecture respecte les groupes de sens ?", "Où faut-il faire les pauses pour lire par groupes de sens ?", "Le « / » marque une petite pause. Quelle lecture est la bonne ?"])} Phrase : « ${mots.join(" ")}. »`,
    correct,
    wrongs: [...leurres],
    methode: "On ne coupe jamais un groupe : qui ? / fait quoi ? / où ou quand ?",
  };
}

function corrigerGroupes(q: QuestionFrancais): string[] {
  const pb: string[] = [];
  const phrase = dernierCite(q.text); // pas extrait() : la consigne peut citer « / »
  const sansBarres = (s: string) => s.replace(/ \/ /g, " ");
  if (sansBarres(q.correct) !== phrase) pb.push("la bonne réponse n'est pas la phrase lue");
  if (!morceaux(q.correct).every((m) => GROUPES_GS.has(m))) pb.push(`la bonne réponse coupe un groupe : « ${q.correct} »`);
  for (const w of q.wrongs) {
    if (sansBarres(w) !== phrase) pb.push(`le leurre « ${w} » n'est pas la même phrase`);
    if (morceaux(w).every((m) => GROUPES_GS.has(m))) pb.push(`le leurre « ${w} » respecte aussi les groupes`);
  }
  return pb;
}

/* ─────────────── 6e_flue_silencieuse ─────────────── */

// Le phrasé se lit dans la ponctuation : « ? » la voix monte, « ! » elle porte
// plus fort, « . » elle descend et se pose, « … » elle reste en suspens, « , »
// petite pause. Le correcteur relit le signe final (ou la virgule) de la phrase.

const PHRASES_PONCT: Record<"?" | "!" | "." | "…", string[]> = {
  // Questions FERMÉES (réponse oui ou non) : ce sont elles qui font monter la voix.
  "?": ["Est-ce que $S a fini son dessin ?", "Tu viens au parc avec $S ?", "As-tu vu le nouveau vélo de $S ?", "Le chat de $S est rentré ?", "Tu as prévenu $S ?", "Est-ce que le bus de $S est déjà parti ?"],
  "!": ["Quel beau dessin, $S !", "Attention, $S, le plat est brûlant !", "Bravo, $S a gagné la course !", "Vite, $S, le train va partir !", "Quelle surprise de te voir, $S !"],
  ".": ["$S range sa chambre avant le dîner.", "$S promène son chien tous les soirs.", "Le frère de $S joue du piano.", "$S prépare son sac pour demain.", "La maison de $S est au bout de la rue."],
  "…": ["$S ouvrit la porte et vit…", "Et soudain, $S entendit un bruit…", "Au fond de la boîte de $S, il y avait…", "$S retint son souffle et attendit…"],
};
const LECTURE_PONCT: Record<"?" | "!" | "." | "…", string> = {
  "?": "la voix monte, comme pour une question",
  "!": "la voix porte plus fort, avec de l'énergie",
  ".": "la voix descend et se pose",
  "…": "la voix reste en suspens, comme si la suite allait venir",
};
/** Phrases qui ont UNE virgule : le mot avant la virgule est le lieu de la pause. */
const PHRASES_VIRGULE = ["Ce matin, $S part à la mer.", "Dans le grenier, $S trouve un vieux coffre.", "Après le repas, $S fait la vaisselle.", "Le soir venu, $S regarde les étoiles.", "Sans faire de bruit, $S referme la porte.", "Au bout du chemin, $S aperçoit une cabane."];

function genererSilencieuse(): QuestionFrancais {
  const p = pick(PRENOMS);
  if (Math.random() < 0.3) {
    const ph = remplir(pick(PHRASES_VIRGULE), p);
    const mots = ph.replace(/[.,]/g, "").split(" ");
    const avant = ph.slice(0, ph.indexOf(",")).split(" ").pop()!;
    const autres = tirerN(mots.filter((m) => m !== avant && m.length > 2), 3);
    return {
      text: `« ${ph} » ${pick(["Où fais-tu une petite pause en lisant cette phrase ?", "À quel endroit marques-tu une courte pause ?"])}`,
      correct: `après « ${avant} »`,
      wrongs: autres.map((m) => `après « ${m} »`),
      methode: "La virgule demande une petite pause : on respire juste après le mot qu'elle suit.",
    };
  }
  const signe = pick(Object.keys(PHRASES_PONCT) as ("?" | "!" | "." | "…")[]);
  const ph = remplir(pick(PHRASES_PONCT[signe]), p);
  return {
    text: `« ${ph} » ${pick(["Comment lis-tu la fin de cette phrase à voix haute ?", "À voix haute, que fait ta voix à la fin de cette phrase ?", "Quel phrasé convient à la fin de cette phrase ?"])}`,
    correct: LECTURE_PONCT[signe],
    wrongs: tirerN((Object.keys(LECTURE_PONCT) as ("?" | "!" | "." | "…")[]).filter((s) => s !== signe), 3).map((s) => LECTURE_PONCT[s]),
    methode: "Regarde le signe à la fin de la phrase : c'est lui qui dit ce que fait ta voix.",
  };
}

function corrigerSilencieuse(q: QuestionFrancais): string[] {
  const ph = extrait(q.text);
  if (!ph) return ["pas de phrase"];
  const pb: string[] = [];
  if (/pause/.test(q.text)) {
    const virgules = ph.split(",").length - 1;
    if (virgules !== 1) return [`la phrase a ${virgules} virgules`];
    const attendu = `après « ${ph.slice(0, ph.indexOf(",")).split(" ").pop()} »`;
    if (q.correct !== attendu) pb.push(`la bonne réponse est « ${attendu} »`);
    for (const w of q.wrongs) if (w === attendu) pb.push(`le leurre « ${w} » est la bonne réponse`);
    return pb;
  }
  const signe = ph.endsWith("…") ? "…" : (ph.slice(-1) as "?" | "!" | ".");
  const attendu = LECTURE_PONCT[signe];
  if (!attendu) return [`signe final inconnu : « ${signe} »`];
  if (q.correct !== attendu) pb.push(`la bonne réponse est « ${attendu} »`);
  for (const w of q.wrongs) if (w === attendu) pb.push(`le leurre « ${w} » est la bonne réponse`);
  return pb;
}

/* ─────────────── 6e_flue_defi ─────────────── */

// Défi : deux lecteurs à comparer. Piège : celui qui lit le PLUS de mots n'est
// pas forcément le plus rapide (il a peut-être lu plus longtemps). Ou bien la
// lecture par groupes de sens, mélangée avec le calcul de vitesse.

function genererFluenceDefi(): QuestionFrancais {
  if (Math.random() < 0.35) return Math.random() < 0.5 ? genererGroupes() : genererFluence130();
  for (;;) {
    const [a, b] = tirerN(PRENOMS, 2);
    const [va, vb] = tirerN([90, 100, 105, 110, 115, 120, 125, 130, 135, 140, 150], 2);
    const [ta, tb] = [2 + Math.floor(Math.random() * 4), 2 + Math.floor(Math.random() * 4)];
    const [ma, mb] = [va * ta, vb * tb];
    if (ma === mb) continue;
    const plusDeMots = ma > mb ? a : b;
    const rapide = va > vb ? a : b;
    if (Math.random() < 0.5 && plusDeMots === rapide) continue; // le piège une fois sur deux au moins
    return {
      text: `${a.nom} lit ${ma} mots en ${ta} minutes. ${b.nom} lit ${mb} mots en ${tb} minutes. ${pick(["Qui lit le plus vite ?", "Qui a la lecture la plus rapide ?"])}`,
      correct: rapide.nom,
      wrongs: [(rapide === a ? b : a).nom, "Ils lisent à la même vitesse.", "On ne peut pas le savoir."],
      methode: "Ne compare pas les nombres de mots : calcule la vitesse de chacun (mots ÷ minutes), puis compare.",
    };
  }
}

function corrigerFluenceDefi(q: QuestionFrancais): string[] {
  if (/groupes de sens|« \/ »/.test(q.text)) return corrigerGroupes(q);
  const m = /^(\p{L}+) lit (\d+) mots en (\d+) minutes\. (\p{L}+) lit (\d+) mots en (\d+) minutes\./u.exec(q.text);
  if (!m) return corrigerFluence130(q);
  const [va, vb] = [Number(m[2]) / Number(m[3]), Number(m[5]) / Number(m[6])];
  if (va === vb) return ["les deux vitesses sont égales"];
  const attendu = va > vb ? m[1] : m[4];
  const pb: string[] = [];
  if (q.correct !== attendu) pb.push(`le plus rapide est ${attendu}`);
  for (const w of q.wrongs) if (w === attendu) pb.push(`le leurre « ${w} » est la bonne réponse`);
  return pb;
}

/* ═══════════════════ lecture_voix_haute ═══════════════════ */

/* ─────────────── 6e_voix_expressive ─────────────── */

// Le verbe de parole dit COMMENT lire la réplique (« chuchote » → à voix
// basse). Chaque manière a ses verbes et ses répliques qui lui vont.

type Maniere = { nom: string; verbes: string[]; repliques: string[] };
const MANIERES: readonly Maniere[] = [
  { nom: "doucement, à voix basse", verbes: ["chuchote", "murmure"], repliques: ["Chut, le bébé dort.", "Ne fais pas de bruit.", "Viens, j'ai un secret à te dire.", "Parle moins fort, on va nous entendre."] },
  { nom: "fort, en haussant la voix", verbes: ["crie", "hurle", "s'écrie"], repliques: ["Au secours !", "Attention, la balle !", "Par ici, venez tous !", "Le bus arrive !"] },
  { nom: "d'un ton ferme, sans hésiter", verbes: ["ordonne", "exige"], repliques: ["Range ta chambre tout de suite.", "Pose ce téléphone.", "Reviens ici immédiatement.", "Éteins la télévision."] },
  { nom: "lentement, d'un ton las", verbes: ["soupire"], repliques: ["Encore des devoirs…", "Il pleut encore…", "Je n'ai plus envie de jouer.", "La journée a été si longue…"] },
  { nom: "en hésitant, avec de petites coupures", verbes: ["bredouille", "balbutie"], repliques: ["Je… je ne sais pas.", "C'est… c'est moi qui ai cassé le vase.", "Euh… peut-être demain.", "Je… j'ai oublié mon cahier."] },
];
const TOUS_VERBES_DIRE = MANIERES.flatMap((m) => m.verbes);
/** « Chut, le bébé dort », chuchote Léa. / « Au secours ! » crie Léa. */
const incise = (rep: string, verbe: string, nom: string) =>
  rep.endsWith(".") ? `« ${rep.slice(0, -1)} », ${verbe} ${nom}.` : `« ${rep} » ${verbe} ${nom}.`;
const MOTIF_INCISE = /« ([^«»]+?) »,? (\S+) (\p{L}+)\./u;

function genererExpressive(): QuestionFrancais {
  const m = pick(MANIERES);
  const p = pick(PRENOMS);
  const verbe = pick(m.verbes);
  const phrase = incise(pick(m.repliques), verbe, p.nom);
  if (Math.random() < 0.3) {
    const motsReplique = phrase.replace(/[«»,.!?…]/g, " ").split(/\s+/).filter((w) => w.length > 3 && w !== verbe && w !== p.nom);
    return {
      text: `Lis : ${phrase} Quel mot t'indique comment dire la réplique ?`,
      correct: verbe,
      wrongs: leurresDistincts(verbe, [...tirerN(motsReplique, 2), p.nom]),
      methode: "Le verbe placé après la réplique (« chuchote », « crie »…) dit comment parler.",
    };
  }
  return {
    text: `Lis : ${phrase} ${pick(["Comment dois-tu lire cette réplique ?", "Quelle voix prends-tu pour cette réplique ?", "À voix haute, comment dis-tu cette réplique ?"])}`,
    correct: m.nom,
    wrongs: tirerN(MANIERES.filter((x) => x !== m), 3).map((x) => x.nom),
    methode: "Regarde le verbe qui suit la réplique : il dit comment le personnage parle.",
  };
}

function corrigerExpressive(q: QuestionFrancais): string[] {
  const m = MOTIF_INCISE.exec(q.text);
  if (!m) return ["réplique illisible"];
  const [, rep, verbe] = m;
  const maniere = MANIERES.find((x) => x.verbes.includes(verbe));
  if (!maniere) return [`verbe de parole inconnu : « ${verbe} »`];
  const pb: string[] = [];
  const repNormale = (r: string) => r.replace(/\.$/, "");
  if (!maniere.repliques.some((r) => repNormale(r) === rep)) pb.push(`la réplique ne va pas avec « ${verbe} »`);
  const attendu = /Quel mot/.test(q.text) ? verbe : maniere.nom;
  if (q.correct !== attendu) pb.push(`la bonne réponse est « ${attendu} »`);
  for (const w of q.wrongs) if (w === attendu || (attendu === verbe && TOUS_VERBES_DIRE.includes(w))) pb.push(`le leurre « ${w} » ne va pas`);
  return pb;
}

/* ─────────────── 6e_voix_emotions ─────────────── */

// L'émotion du personnage se lit dans ce qui suit la réplique (« en
// tremblant », « les larmes aux yeux »). Le mot de l'émotion n'est jamais
// écrit : c'est à l'élève de le faire entendre.

type EmotionVoix = { nom: string; mot: string; indices: string[]; repliques: string[] };
const EMOTIONS_VOIX: readonly EmotionVoix[] = [
  { nom: "la peur", mot: "peur", indices: [" en tremblant", ", d'une toute petite voix", ", en reculant contre le mur"], repliques: ["Il y a quelqu'un dans le couloir ?", "Tu as entendu ce bruit ?", "Ne me laisse pas dans le noir !"] },
  { nom: "la joie", mot: "joie|joyeu", indices: [" en riant", ", avec un grand sourire", " en sautant sur place"], repliques: ["On a gagné !", "C'est le plus beau jour de ma vie !", "Tu es revenu !"] },
  { nom: "la colère", mot: "colère", indices: [" en tapant du pied", ", les poings serrés", ", le visage tout rouge"], repliques: ["Ce n'est pas juste !", "Rends-moi mon ballon !", "Tu as encore triché !"] },
  { nom: "la tristesse", mot: "trist", indices: [", les larmes aux yeux", " en reniflant", ", la tête basse"], repliques: ["Mon chat ne reviendra pas.", "Je vais déménager loin d'ici.", "Personne n'est venu à ma fête."] },
  { nom: "la surprise", mot: "surpri", indices: [", les yeux écarquillés", ", bouche bée", " en laissant tomber son sac"], repliques: ["Toi, ici ?", "Mais c'est incroyable !", "Le gâteau a disparu ?"] },
];
const TOUS_INDICES_VOIX = EMOTIONS_VOIX.flatMap((e) => e.indices.map((i) => i.replace(/^,? /, "")));

function genererEmotions(): QuestionFrancais {
  const e = pick(EMOTIONS_VOIX);
  const p = pick(PRENOMS);
  const rep = pick(e.repliques);
  const ind = pick(e.indices);
  const phrase = (rep.endsWith(".") ? `« ${rep.slice(0, -1)} », dit ${p.nom}` : `« ${rep} » dit ${p.nom}`) + `${ind}.`;
  if (Math.random() < 0.35) {
    const correct = ind.replace(/^,? /, "");
    return {
      text: `Lis : ${phrase} Quels mots t'aident à trouver l'émotion du personnage ?`,
      correct,
      wrongs: tirerN(EMOTIONS_VOIX.filter((x) => x !== e).flatMap((x) => x.indices.map((i) => i.replace(/^,? /, ""))), 3),
      methode: "Après la réplique, cherche ce que fait le personnage en parlant : son corps trahit son émotion.",
    };
  }
  return {
    text: `Lis : ${phrase} ${pick(["Quelle émotion ta voix doit-elle faire entendre ?", "Quelle émotion dois-tu faire entendre en lisant cette réplique ?", `Que ressent ${p.nom} quand ${ilElle(p.g)} parle ?`])}`,
    correct: e.nom,
    wrongs: tirerN(EMOTIONS_VOIX.filter((x) => x !== e), 3).map((x) => x.nom),
    methode: "Après la réplique, cherche ce que fait le personnage en parlant : son corps trahit son émotion.",
  };
}

function corrigerEmotions(q: QuestionFrancais): string[] {
  const m = /« ([^«»]+?) »,? dit (\p{L}+)(.*?)\.\s/u.exec(q.text);
  if (!m) return ["réplique illisible"];
  const [, rep, , suite] = m;
  const trouvees = EMOTIONS_VOIX.filter((e) => e.indices.some((i) => suite === i));
  if (trouvees.length !== 1) return [`la phrase trahit ${trouvees.length} émotions`];
  const e = trouvees[0];
  const pb: string[] = [];
  if (!e.repliques.some((r) => r.replace(/\.$/, "") === rep)) pb.push("la réplique ne va pas avec l'émotion");
  if (new RegExp(`(?<![\\p{L}])(?:${e.mot})`, "iu").test(q.text.slice(0, m.index + m[0].length))) pb.push("l'émotion est écrite dans le texte");
  const attendu = /Quels mots/.test(q.text) ? suite.replace(/^,? /, "") : e.nom;
  if (q.correct !== attendu) pb.push(`la bonne réponse est « ${attendu} »`);
  for (const w of q.wrongs) {
    if (w === attendu) pb.push(`le leurre « ${w} » est la bonne réponse`);
    if (attendu !== e.nom && e.indices.some((i) => i.replace(/^,? /, "") === w)) pb.push(`le leurre « ${w} » est aussi un indice de ${e.nom}`);
    if (attendu !== e.nom && !TOUS_INDICES_VOIX.includes(w)) pb.push(`le leurre « ${w} » est hors table`);
  }
  return pb;
}

/* ─────────────── 6e_voix_dialogue ─────────────── */

// Un dialogue à tirets : les deux premières répliques ont une incise (« demande
// Inès », « répond Hugo »), les suivantes non. Les personnages parlent chacun à
// leur tour : le correcteur refait l'alternance pour savoir qui parle.

const DIALOGUES = [
  ["Tu viens ?", "J'arrive !", "Dépêche-toi, le film commence.", "Garde-moi une place !"],
  ["Tu as vu mon cahier ?", "Il est sous ton lit.", "Merci, tu me sauves !", "De rien, mais range ta chambre."],
  ["On joue au ballon ?", "Pas maintenant, il pleut.", "Alors, un jeu de société ?", "D'accord, je choisis le jeu."],
  ["Qui a mangé la dernière crêpe ?", "Ce n'est pas moi !", "Tu as du sucre sur le menton.", "Bon, d'accord, c'est moi."],
  ["Tu as fini l'exercice ?", "Presque, il me reste une question.", "Je peux t'aider, si tu veux.", "Oui, merci beaucoup !"],
  ["Regarde, un arc-en-ciel !", "Où ça ?", "Juste au-dessus du clocher.", "Il est magnifique !"],
  ["Tu as entendu ce bruit ?", "C'est sûrement le chat.", "Nous n'avons pas de chat…", "Alors allons voir ensemble."],
  ["On part à quelle heure demain ?", "À huit heures précises.", "C'est trop tôt !", "Tant pis, tu dormiras dans le car."],
];
const VERBE_1 = (r: string) => (r.endsWith("?") ? "demande" : r.endsWith("!") ? "s'exclame" : "dit");
/** « — Tu viens ? demande Inès. » / « — Il est sous ton lit, répond Hugo. » */
const repliqueIncise = (r: string, verbe: string, nom: string) => (r.endsWith(".") ? `— ${r.slice(0, -1)}, ${verbe} ${nom}.` : `— ${r} ${verbe} ${nom}.`);

function composerDialogue(nb: 3 | 4) {
  const d = pick(DIALOGUES).slice(0, nb);
  const [a, b] = tirerN(PRENOMS, 2);
  const lignes = d.map((r, i) => (i === 0 ? repliqueIncise(r, VERBE_1(r), a.nom) : i === 1 ? repliqueIncise(r, "répond", b.nom) : `— ${r}`));
  return { d, a, b, texte: lignes.join(" ") };
}

function genererDialogue(nb: 3 | 4 = 3): QuestionFrancais {
  const { d, a, b, texte } = composerDialogue(nb);
  const absent = pick(PRENOMS.filter((p) => p !== a && p !== b)).nom;
  const k = nb === 4 && Math.random() < 0.6 ? 3 : pick([1, 2] as const);
  const qui = k % 2 === 0 ? a : b;
  const t = k === 1
    ? `Qui dit « ${d[1]} » ?`
    : pick([`Qui prononce la ${RANGS[k]} réplique ?`, `Qui dit « ${d[k]} » ?`]);
  return {
    text: `Lis ce dialogue : ${texte} ${t}`,
    correct: qui.nom,
    wrongs: melange([(qui === a ? b : a).nom, absent, "le narrateur"]),
    methode: "Les personnages parlent chacun à leur tour : chaque tiret change de personnage. Repère qui ouvre le dialogue, puis alterne.",
  };
}

function corrigerDialogue(q: QuestionFrancais): string[] {
  const corps = q.text.replace(/^Lis ce dialogue : /, "");
  const lignes = corps.split(/ ?— /).slice(1);
  if (lignes.length < 3) return ["dialogue illisible"];
  // La question est collée à la dernière réplique : on l'en détache.
  const derniere = lignes[lignes.length - 1];
  const coupe = derniere.search(/ Qui (?:dit|prononce)/);
  lignes[lignes.length - 1] = derniere.slice(0, coupe);
  const question = derniere.slice(coupe + 1);
  const locuteurs: string[] = [];
  for (let i = 0; i < lignes.length; i++) {
    const m = / (?:demande|s'exclame|dit|répond) (\p{L}+)\.$/u.exec(lignes[i]);
    if (m) locuteurs.push(m[1]);
    else if (i >= 2) locuteurs.push(locuteurs[i - 2]); // chacun son tour
    else return [`la réplique ${i + 1} n'a pas d'incise`];
  }
  if (locuteurs[0] === locuteurs[1]) return ["les deux premières répliques ont le même locuteur"];
  let k = RANGS.findIndex((r) => question.includes(`la ${r} réplique`));
  if (k < 0) {
    const cite = dernierCite(question);
    k = lignes.findIndex((l) => l === cite || l.startsWith(cite.replace(/[.!?…]$/, "")));
    if (lignes.filter((l) => l.startsWith(cite.replace(/[.!?…]$/, ""))).length !== 1) return [`la réplique citée « ${cite} » est introuvable ou répétée`];
  }
  const attendu = locuteurs[k];
  const pb: string[] = [];
  if (q.correct !== attendu) pb.push(`la réplique ${k + 1} est dite par ${attendu}`);
  for (const w of q.wrongs) if (w === attendu) pb.push(`le leurre « ${w} » est la bonne réponse`);
  return pb;
}

/* ─────────────── 6e_voix_preparer ─────────────── */

// Préparer sa lecture : repérer le mot difficile à prononcer, et savoir où
// lever les yeux vers la classe (à la fin d'une phrase, jamais au milieu).

const PHRASES_DIFFICILES: readonly Indice[] = [
  ["$S admire un chrysanthème.", "chrysanthème"], ["$S photographie un hippopotame.", "hippopotame"],
  ["$S écoute {un ornithologue|une ornithologue}.", "ornithologue"], ["$S dessine un ptérodactyle.", "ptérodactyle"],
  ["$S rencontre {un archéologue|une archéologue}.", "archéologue"], ["$S regarde dans un kaléidoscope.", "kaléidoscope"],
  ["$S rêve de devenir paléontologue.", "paléontologue"], ["$S se perd dans un labyrinthe.", "labyrinthe"],
  ["$S observe un rhinocéros.", "rhinocéros"], ["$S entend passer un hélicoptère.", "hélicoptère"],
  ["$S apprend à jouer du xylophone.", "xylophone"], ["$S goûte une tarte à la rhubarbe.", "rhubarbe"],
];
const DIFFICILES = new Set(PHRASES_DIFFICILES.map(([, m]) => m));
/** Phrases neutres plus longues : leurs mots du milieu servent de mauvais endroits pour lever les yeux. */
const PHRASES_LONGUES = ["$S marche lentement vers la grande porte du jardin.", "$S pose son cartable rouge sur la chaise de la cuisine.", "$S cherche ses lunettes partout dans le salon.", "$S raconte une histoire drôle à {son petit frère|sa petite sœur}.", "$S range les assiettes propres dans le placard du haut."];

function genererPreparer(): QuestionFrancais {
  const p = pick(PRENOMS);
  if (Math.random() < 0.5) {
    const [dif, mot] = pick(PHRASES_DIFFICILES);
    const neutres = tirerN(NEUTRES, 2);
    const ext = desambiguiser(remplir([dif, ...neutres.map(([ph]) => ph)].join(" "), p).replace(/\. (il|elle) /g, (_m, x) => `. ${maj(x)} `), p);
    return {
      text: `« ${ext} » ${pick(["En préparant ta lecture, quel mot vas-tu t'entraîner à prononcer ?", "Avant de lire ce texte devant la classe, quel mot difficile repères-tu ?"])}`,
      correct: mot,
      wrongs: [...neutres.map(([, m]) => oppose(m, p.g)), p.nom],
      methode: "Avant de lire à voix haute, lis en silence et repère les mots longs ou rares : entraîne-toi à les dire syllabe par syllabe.",
    };
  }
  const [l1, l2] = tirerN(PHRASES_LONGUES, 2);
  const ext = desambiguiser(remplir(`${l1} ${l2}`, p).replace(/\. (il|elle) /g, (_m, x) => `. ${maj(x)} `), p);
  const ph1 = phrasesDe(ext)[0];
  const fin = ph1.replace(/\.$/, "").split(" ").pop()!;
  const tousMots = ext.replace(/[.,]/g, "").split(" ");
  const unique = (w: string) => tousMots.filter((x) => x === w).length === 1;
  const milieux = tirerN(ph1.replace(/\.$/, "").split(" ").slice(1, -1).filter((w) => w.length > 2 && unique(w)), 3);
  return {
    text: `« ${ext} » ${pick(["Où peux-tu lever les yeux vers la classe sans couper une phrase ?", "À quel moment peux-tu regarder ton auditoire ?"])}`,
    correct: `après « ${fin}. »`,
    wrongs: milieux.map((w) => `après « ${w} »`),
    methode: "On regarde l'auditoire à la fin d'une phrase, au point : jamais au milieu d'un groupe de mots.",
  };
}

function corrigerPreparer(q: QuestionFrancais): string[] {
  const ext = extrait(q.text);
  if (!ext) return ["pas d'extrait"];
  const pb: string[] = [];
  if (/mot/.test(q.text.slice(q.text.lastIndexOf(" »")))) {
    const presents = [...DIFFICILES].filter((m) => contient(ext, m));
    if (presents.length !== 1) return [`${presents.length} mots difficiles dans le texte`];
    if (q.correct !== presents[0]) pb.push(`le mot difficile est « ${presents[0]} »`);
    for (const w of q.wrongs) if (DIFFICILES.has(w) || !contient(ext, w)) pb.push(`le leurre « ${w} » ne va pas`);
    return pb;
  }
  const finDePhrase = (choix: string) => {
    const m = /après « (\S+?)(\.)? »/u.exec(choix);
    if (!m) return null;
    const re = new RegExp(`(?<![\\p{L}])${echapper(m[1])}([.,!?]?)`, "gu");
    const occ = [...ext.matchAll(re)];
    return occ.length === 1 ? occ[0][1] === "." : null;
  };
  if (finDePhrase(q.correct) !== true) pb.push(`« ${q.correct} » n'est pas une fin de phrase unique`);
  for (const w of q.wrongs) if (finDePhrase(w) !== false) pb.push(`le leurre « ${w} » est une fin de phrase, ou un mot répété`);
  return pb;
}

/* ─────────────── 6e_voix_defi ─────────────── */

// Défi : un dialogue de QUATRE répliques (la 3e et la 4e sans incise : il faut
// tenir l'alternance), ou l'émotion et le ton mélangés.

function genererVoixDefi(): QuestionFrancais {
  const r = Math.random();
  if (r < 0.5) return genererDialogue(4);
  return r < 0.75 ? genererEmotions() : genererExpressive();
}
function corrigerVoixDefi(q: QuestionFrancais): string[] {
  if (q.text.startsWith("Lis ce dialogue")) return corrigerDialogue(q);
  return / dit \p{L}+/u.test(q.text) && EMOTIONS_VOIX.some((e) => e.indices.some((i) => q.text.includes(`${i}.`))) ? corrigerEmotions(q) : corrigerExpressive(q);
}

/* ═══════════════════ le registre ═══════════════════ */

/** Ajoute au correcteur le contrôle commun : chaque pronom sujet de l'extrait
 *  n'a qu'un antécédent possible. (Pas pour les dialogues ni les poèmes : leur
 *  « Il » renvoie à un mot que le lexique ne connaît pas.) */
/** ⛔ 06/10 : « Il regarde la photo… Il regarde sa montre. » — tous les verbes des
 *  tables (le mot qui suit « $S »), pour la règle « pas le même verbe deux fois ». */
let VERBES_TOUS: Set<string> | null = null;
function verbesTous(): Set<string> {
  if (VERBES_TOUS) return VERBES_TOUS;
  const gabarits = [
    ...NEUTRES.map(([p]) => p), ...LIEUX.flatMap((l) => l.indices.map(([p]) => p)), ...MOMENTS.flatMap((l) => l.indices.map(([p]) => p)),
    ...CATEGORIES.flatMap((c) => c.items.flatMap((i) => i.indices)), ...RECITS.map((r) => r.phrases.replace(/\$N/g, "$S")),
    ...PHRASES_DIFFICILES.map(([p]) => p), ...PHRASES_LONGUES, ...ACTIONS_PERSONNE.map((a) => `$S ${a}`),
  ];
  VERBES_TOUS = new Set<string>(VERBES_REPRISES);
  for (const g of gabarits) for (const m of g.matchAll(/\$S ([^.]+)/g)) VERBES_TOUS.add(verbeDe(m[1]));
  return VERBES_TOUS;
}
/** Un même verbe des tables dans deux phrases de l'extrait. */
function verbesRepetesTout(ext: string): string[] {
  const vus = new Map<string, number>();
  for (const ph of phrasesDe(ext)) {
    const mots = new Set(ph.replace(/[.,!?…]/g, "").split(" ").map((m) => m.replace(/^[sl]'/, "")).filter((m) => verbesTous().has(m)));
    for (const m of mots) vus.set(m, (vus.get(m) ?? 0) + 1);
  }
  return [...vus].filter(([, k]) => k > 1).map(([m]) => `le verbe « ${m} » revient dans deux phrases`);
}

/** Contrôles communs à toute micro qui a un extrait : un seul antécédent par
 *  pronom sujet, et pas le même verbe dans deux phrases. */
const avecPronoms = (corriger: (q: QuestionFrancais) => string[]) => (q: QuestionFrancais) => [
  ...corriger(q),
  ...pronomsAmbigus(extrait(q.text)),
  ...verbesRepetesTout(extrait(q.text)),
];
/** Côté générateur : on retire tant qu'un verbe revient (au plus 200 essais). */
const sansVerbeRepete = (generer: () => QuestionFrancais) => () => {
  let q = generer();
  for (let k = 0; k < 200 && verbesRepetesTout(extrait(q.text)).length; k++) q = generer();
  return q;
};

export const GENERATEURS: GenerateursFrancais = {
  "6e_comp_reprises": { generer: sansVerbeRepete(genererReprise), corriger: avecPronoms(corrigerReprise) },
  "6e_comp_liens_logiques": { generer: sansVerbeRepete(genererLien), corriger: avecPronoms(corrigerLien) },
  "6e_comp_reprises_defi": { generer: sansVerbeRepete(genererRepriseDefi), corriger: avecPronoms(corrigerRepriseDefi) },
  "6e_comp_indices": { generer: sansVerbeRepete(genererIndices), corriger: avecPronoms(corrigerIndices) },
  "6e_comp_implicite": { generer: sansVerbeRepete(() => genererImplicite()), corriger: avecPronoms(corrigerImplicite) },
  "6e_comp_justifier": { generer: sansVerbeRepete(genererJustifier), corriger: avecPronoms(corrigerJustifier) },
  "6e_comp_sens_global": { generer: sansVerbeRepete(genererSensGlobal), corriger: avecPronoms(corrigerSensGlobal) },
  "6e_comp_genre": { generer: genererGenre, corriger: corrigerGenre },
  "6e_comp_defi": { generer: sansVerbeRepete(genererCompDefi), corriger: avecPronoms(corrigerCompDefi) },
  "6e_comp_documents": { generer: genererDocuments, corriger: corrigerDocuments },
  "6e_comp_documents_comparer": { generer: genererComparer, corriger: corrigerComparer },
  "6e_comp_image": { generer: genererImage, corriger: corrigerImage },
  "6e_comp_documents_defi": { generer: genererDocumentsDefi, corriger: corrigerDocumentsDefi },
  "6e_flue_130_mots": { generer: genererFluence130, corriger: corrigerFluence130 },
  "6e_flue_groupes_syntaxiques": { generer: genererGroupes, corriger: corrigerGroupes },
  "6e_flue_silencieuse": { generer: genererSilencieuse, corriger: corrigerSilencieuse },
  "6e_flue_defi": { generer: genererFluenceDefi, corriger: corrigerFluenceDefi },
  "6e_voix_expressive": { generer: genererExpressive, corriger: corrigerExpressive },
  "6e_voix_emotions": { generer: genererEmotions, corriger: corrigerEmotions },
  "6e_voix_dialogue": { generer: () => genererDialogue(3), corriger: corrigerDialogue },
  "6e_voix_preparer": { generer: sansVerbeRepete(genererPreparer), corriger: avecPronoms(corrigerPreparer) },
  "6e_voix_defi": { generer: genererVoixDefi, corriger: corrigerVoixDefi },
};
