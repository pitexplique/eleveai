// lib/tutor-v4/questionBank/ce2/maths/multiplication.bank.ts
//
// La multiplication du CE2, écrite à la main. Six micro-compétences qui
// passaient par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, applicable à la rentrée 2025,
// cycle 2) : les tables de 2 à 9 et celle de 10, le sens de la multiplication
// (groupes égaux, disposition en rangées), la multiplication posée « d'un
// nombre à deux ou trois chiffres par un nombre À UN OU DEUX CHIFFRES », et la
// multiplication par 10 et par 100. Les nombres restent sous 10 000.
//
// ⚠️ Le calendrier compte : « l'algorithme de la multiplication posée est
// introduit en PÉRIODE 4 au plus tard ». Avant cela, l'élève multiplie sans
// poser — par addition itérée ou par décomposition.
//
// Le texte donne aussi la disposition : pour 16 × 548, on pose « avec le
// nombre ayant le moins de chiffres sur la deuxième ligne ». Deux lignes à
// calculer au lieu de trois.
//
// LE PIÈGE DE LA NOTION : « pour multiplier par 10, on ajoute un zéro ». La
// recette marche, et c'est bien le problème — elle cache ce qui se passe. Ce
// n'est pas un zéro qu'on colle, c'est chaque chiffre qui monte d'un rang : les
// unités deviennent des dizaines, les dizaines des centaines. L'élève qui a
// appris la recette la rejouera sur 2,5 en CM1 et écrira 2,50.
// Deux autres reviennent chaque année : la retenue oubliée dans la
// multiplication posée, et 7 × 8 — la case de la table que personne ne retient.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type { CalculPoseCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

// La bonne réponse est mise de côté, trois pièges distincts sont tirés ensuite,
// puis on mélange. L'écrire autrement a rendu des questions impossibles à
// réussir dans 79 banques : voir scripts/verifier-generateurs.mjs.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function calculPose(data: Omit<CalculPoseCanvasData, "kind">): CalculPoseCanvasData {
  return { kind: "calcul_pose", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/* =========================================================
   LES SITUATIONS ET LES TOURNURES
   ⛔ Mesuré le 05/10/2026 (scripts/mesurer-squelettes-coach.ts) :
   3 à 10 squelettes par micro, 14 à 19 questions sur 20 déjà
   vues dans une série. Les élèves réels sont des 6e en
   remédiation : ils reconnaissent la PHRASE, pas les nombres.
   « 3 sachets de 7 billes » et « 4 sachets de 9 billes », c'est
   la même question pour eux. Chaque gabarit tire donc une
   situation ET une tournure.
========================================================= */

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// « de » s'élide devant une voyelle : « combien d'œufs », « combien de billes ».
function de(mot: string) {
  return /^[aeiouyàâéèêîïôœ]/i.test(mot) ? `d'${mot}` : `de ${mot}`;
}

function pl(n: number, formes: readonly [string, string]) {
  return n === 1 ? formes[0] : formes[1];
}

const PRENOMS: readonly (readonly [string, "f" | "m"])[] = [
  ["Léa", "f"], ["Hugo", "m"], ["Inès", "f"], ["Noah", "m"], ["Maëlys", "f"],
  ["Rayan", "m"], ["Chloé", "f"], ["Malik", "m"], ["Jade", "f"], ["Tom", "m"],
  ["Aya", "f"], ["Lucas", "m"], ["Zoé", "f"], ["Enzo", "m"], ["Sofia", "f"],
  ["Nathan", "m"], ["Lina", "f"], ["Yanis", "m"],
];

function tirePrenom() {
  const [nom, genre] = randomChoice(PRENOMS);
  return { nom, il: genre === "f" ? "elle" : "il", Il: genre === "f" ? "Elle" : "Il" };
}

// Le moment où l'on surprend un calcul — pour les « a-t-il raison ? ».
const MOMENTS = [
  "Au tableau",
  "Pendant le calcul mental",
  "Dans son cahier",
  "Au jeu des tables",
  "Pendant la correction",
  "Sur son ardoise",
] as const;

// Des paquets tous pareils : a contenants de b objets (b ≤ 10).
type Groupes = {
  lieu: string;
  contenant: readonly [string, string];
  prep: string;
  objet: readonly [string, string];
  verbe: string;
};
const GROUPES: readonly Groupes[] = [
  { lieu: "à la boulangerie", contenant: ["plateau", "plateaux"], prep: "sur", objet: ["croissant", "croissants"], verbe: "pose" },
  { lieu: "au marché", contenant: ["cagette", "cagettes"], prep: "dans", objet: ["mangue", "mangues"], verbe: "met" },
  { lieu: "à la cantine", contenant: ["table", "tables"], prep: "à", objet: ["élève", "élèves"], verbe: "installe" },
  { lieu: "dans la classe", contenant: ["trousse", "trousses"], prep: "dans", objet: ["crayon", "crayons"], verbe: "range" },
  { lieu: "au gymnase", contenant: ["équipe", "équipes"], prep: "dans", objet: ["joueur", "joueurs"], verbe: "met" },
  { lieu: "dans le potager", contenant: ["rangée", "rangées"], prep: "dans", objet: ["salade", "salades"], verbe: "plante" },
  { lieu: "à la bibliothèque", contenant: ["étagère", "étagères"], prep: "sur", objet: ["livre", "livres"], verbe: "range" },
  { lieu: "à la ferme", contenant: ["boîte", "boîtes"], prep: "dans", objet: ["œuf", "œufs"], verbe: "range" },
  { lieu: "à la fête de l'école", contenant: ["sachet", "sachets"], prep: "dans", objet: ["bonbon", "bonbons"], verbe: "glisse" },
  { lieu: "au magasin de jouets", contenant: ["coffret", "coffrets"], prep: "dans", objet: ["petite voiture", "petites voitures"], verbe: "range" },
  { lieu: "à la piscine", contenant: ["ligne d'eau", "lignes d'eau"], prep: "dans", objet: ["nageur", "nageurs"], verbe: "place" },
  { lieu: "dans la cuisine", contenant: ["assiette", "assiettes"], prep: "sur", objet: ["crêpe", "crêpes"], verbe: "pose" },
  { lieu: "au stade", contenant: ["banc", "bancs"], prep: "sur", objet: ["supporter", "supporters"], verbe: "installe" },
  { lieu: "à la poste", contenant: ["carnet", "carnets"], prep: "dans", objet: ["timbre", "timbres"], verbe: "met" },
  { lieu: "à la pâtisserie", contenant: ["boîte", "boîtes"], prep: "dans", objet: ["macaron", "macarons"], verbe: "range" },
  { lieu: "au club de foot", contenant: ["filet", "filets"], prep: "dans", objet: ["ballon", "ballons"], verbe: "met" },
  { lieu: "au marché de Saint-Paul", contenant: ["barquette", "barquettes"], prep: "dans", objet: ["letchi", "letchis"], verbe: "met" },
  { lieu: "à l'atelier de peinture", contenant: ["pot", "pots"], prep: "dans", objet: ["pinceau", "pinceaux"], verbe: "range" },
];

/** « a contenants de b objets », posé de quatre façons, demandé de trois. */
function enonceGroupes(s: Groupes, a: number, b: number) {
  const P = tirePrenom();
  const cont = pl(a, s.contenant);
  const obj = pl(b, s.objet);
  const constat = randomChoice([
    `${cap(s.lieu)}, ${P.nom} ${s.verbe} ${b} ${obj} ${s.prep} chaque ${s.contenant[0]}. Il y a ${a} ${cont}.`,
    `${cap(s.lieu)}, on compte ${a} ${cont} de ${b} ${obj}.`,
    `${cap(s.lieu)}, voici ${a} ${cont}. ${cap(s.prep)} chaque ${s.contenant[0]}, il y a ${b} ${obj}.`,
    `${P.nom} compte ${a} ${cont} ${s.lieu}, avec ${b} ${obj} ${s.prep} chaque ${s.contenant[0]}.`,
  ]);
  const question = randomChoice([
    `Combien ${de(s.objet[1])} en tout ?`,
    `Combien y a-t-il ${de(s.objet[1])} au total ?`,
    `Quel est le nombre total ${de(s.objet[1])} ?`,
  ]);
  return { constat, question };
}

// Des rangées : r lignes de c objets (le quadrillage).
type Rangees = {
  ou: string;
  ligne: readonly [string, string];
  prep: string;
  objet: readonly [string, string];
};
const RANGEES: readonly Rangees[] = [
  { ou: "Dans la salle de spectacle", ligne: ["rangée", "rangées"], prep: "dans", objet: ["fauteuil", "fauteuils"] },
  { ou: "Dans le verger", ligne: ["rangée", "rangées"], prep: "dans", objet: ["pommier", "pommiers"] },
  { ou: "Sur la tablette de chocolat", ligne: ["rangée", "rangées"], prep: "dans", objet: ["carré", "carrés"] },
  { ou: "Sur le parking de l'école", ligne: ["file", "files"], prep: "dans", objet: ["place", "places"] },
  { ou: "Sur le mur de la salle de bains", ligne: ["rangée", "rangées"], prep: "dans", objet: ["carreau", "carreaux"] },
  { ou: "Sur la planche de timbres", ligne: ["ligne", "lignes"], prep: "sur", objet: ["timbre", "timbres"] },
  { ou: "Dans la boîte de chocolats", ligne: ["rangée", "rangées"], prep: "dans", objet: ["chocolat", "chocolats"] },
  { ou: "Pour la photo de classe", ligne: ["rang", "rangs"], prep: "dans", objet: ["élève", "élèves"] },
  { ou: "Dans le champ de maïs", ligne: ["rangée", "rangées"], prep: "dans", objet: ["pied", "pieds"] },
  { ou: "Dans la serre", ligne: ["rangée", "rangées"], prep: "dans", objet: ["pot de fleurs", "pots de fleurs"] },
  { ou: "Sur la façade de l'immeuble", ligne: ["étage", "étages"], prep: "à", objet: ["fenêtre", "fenêtres"] },
  { ou: "Dans le casier à bouteilles", ligne: ["rangée", "rangées"], prep: "dans", objet: ["bouteille", "bouteilles"] },
  { ou: "Dans la classe", ligne: ["rangée", "rangées"], prep: "dans", objet: ["table", "tables"] },
  { ou: "Sur la mosaïque", ligne: ["ligne", "lignes"], prep: "sur", objet: ["pastille", "pastilles"] },
];

// Des lots plus gros, pour la multiplication posée : b contenants de a objets.
type Lots = {
  lieu: string;
  contenant: readonly [string, string];
  prep: string;
  objet: readonly [string, string];
  verbe: string;
};
const LOTS: readonly Lots[] = [
  { lieu: "à la papeterie", contenant: ["carton", "cartons"], prep: "dans", objet: ["cahier", "cahiers"], verbe: "range" },
  { lieu: "à l'imprimerie", contenant: ["paquet", "paquets"], prep: "dans", objet: ["affiche", "affiches"], verbe: "met" },
  { lieu: "au supermarché", contenant: ["palette", "palettes"], prep: "sur", objet: ["bouteille", "bouteilles"], verbe: "pose" },
  { lieu: "à la ferme", contenant: ["caisse", "caisses"], prep: "dans", objet: ["œuf", "œufs"], verbe: "range" },
  { lieu: "à la bibliothèque", contenant: ["caisse", "caisses"], prep: "dans", objet: ["livre", "livres"], verbe: "range" },
  { lieu: "au club de tennis", contenant: ["panier", "paniers"], prep: "dans", objet: ["balle", "balles"], verbe: "met" },
  { lieu: "à la fête foraine", contenant: ["carnet", "carnets"], prep: "dans", objet: ["ticket", "tickets"], verbe: "agrafe" },
  { lieu: "chez le fleuriste", contenant: ["seau", "seaux"], prep: "dans", objet: ["tulipe", "tulipes"], verbe: "met" },
  { lieu: "à la mercerie", contenant: ["boîte", "boîtes"], prep: "dans", objet: ["bouton", "boutons"], verbe: "range" },
  { lieu: "au magasin de bricolage", contenant: ["sachet", "sachets"], prep: "dans", objet: ["clou", "clous"], verbe: "met" },
  { lieu: "à la boulangerie", contenant: ["plaque", "plaques"], prep: "sur", objet: ["pain au chocolat", "pains au chocolat"], verbe: "pose" },
  { lieu: "au stade", contenant: ["tribune", "tribunes"], prep: "dans", objet: ["siège", "sièges"], verbe: "installe" },
  { lieu: "à l'école", contenant: ["boîte", "boîtes"], prep: "dans", objet: ["craie", "craies"], verbe: "range" },
  { lieu: "au verger", contenant: ["cageot", "cageots"], prep: "dans", objet: ["pomme", "pommes"], verbe: "met" },
  { lieu: "à la coopérative de Saint-Joseph", contenant: ["barquette", "barquettes"], prep: "dans", objet: ["letchi", "letchis"], verbe: "met" },
  { lieu: "à la confiserie", contenant: ["bocal", "bocaux"], prep: "dans", objet: ["bonbon", "bonbons"], verbe: "verse" },
];

/** « b contenants de a objets », pour les gros lots. */
function enonceLots(s: Lots, a: number, b: number) {
  const P = tirePrenom();
  const obj = s.objet[1];
  return randomChoice([
    `${cap(s.lieu)}, on ${s.verbe} ${a} ${pl(a, s.objet)} ${s.prep} chaque ${s.contenant[0]}. Combien ${de(obj)} dans ${b} ${pl(b, s.contenant)} ?`,
    `${cap(s.lieu)}, il y a ${b} ${pl(b, s.contenant)} de ${a} ${pl(a, s.objet)}. Combien ${de(obj)} cela fait-il ?`,
    `${cap(s.lieu)}, ${P.nom} reçoit ${b} ${pl(b, s.contenant)}. Chaque ${s.contenant[0]} contient ${a} ${pl(a, s.objet)}. Quel est le nombre total ${de(obj)} ?`,
  ]);
}

// Des lots de 10 ou de 100, pour multiplier par 10 et par 100.
const PAR_10_100: readonly { un: string; lot: readonly [string, string]; par: 10 | 100; objet: string }[] = [
  { un: "un", lot: ["carnet", "carnets"], par: 10, objet: "timbres" },
  { un: "une", lot: ["boîte", "boîtes"], par: 10, objet: "œufs" },
  { un: "un", lot: ["paquet", "paquets"], par: 100, objet: "feuilles" },
  { un: "un", lot: ["sachet", "sachets"], par: 100, objet: "perles" },
  { un: "une", lot: ["boîte", "boîtes"], par: 100, objet: "trombones" },
  { un: "un", lot: ["rouleau", "rouleaux"], par: 10, objet: "pièces" },
  { un: "une", lot: ["plaque", "plaques"], par: 100, objet: "carreaux" },
  { un: "une", lot: ["barquette", "barquettes"], par: 10, objet: "fraises" },
  { un: "un", lot: ["lot", "lots"], par: 10, objet: "crayons" },
  { un: "un", lot: ["sac", "sacs"], par: 100, objet: "billes" },
  { un: "un", lot: ["pack", "packs"], par: 10, objet: "bouteilles" },
  { un: "une", lot: ["boîte", "boîtes"], par: 100, objet: "punaises" },
  { un: "une", lot: ["planche", "planches"], par: 10, objet: "autocollants" },
  { un: "un", lot: ["paquet", "paquets"], par: 10, objet: "mouchoirs" },
];

// Le calcul « nu » : une seule phrase, c'est un seul squelette. Douze façons
// de demander le même produit.
// ⚠️ `pose` : pour la multiplication posée, on retire les tournures « de tête ».
function enonceProduit(a: number, b: number, pose = false) {
  const tournures = [
    `Combien font ${a} × ${b} ?`,
    `Calcule ${a} × ${b}.`,
    `Quel est le résultat de ${a} × ${b} ?`,
    `${a} fois ${b}, cela fait combien ?`,
    `Complète : ${a} × ${b} = …`,
    `Que vaut ${a} × ${b} ?`,
    `Combien obtient-on en multipliant ${a} par ${b} ?`,
    `Trouve le résultat de ${a} × ${b}.`,
    `De tête : ${a} × ${b} = ?`,
    `Combien font ${a} multiplié par ${b} ?`,
    `Trouve le nombre caché : ${a} × ${b} = ?`,
    `${tirePrenom().nom} doit calculer ${a} × ${b}. Quel résultat doit-on trouver ?`,
    `Quel est le produit de ${a} par ${b} ?`,
    `Multiplie ${a} par ${b}. Quel nombre obtiens-tu ?`,
    `Si l'on prend ${a} fois le nombre ${b}, combien obtient-on ?`,
    `${a} × ${b} = ? Choisis le bon résultat.`,
    `Combien vaut ${a} × ${b} ?`,
  ];
  return randomChoice(pose ? tournures.filter((t) => !t.startsWith("De tête")) : tournures);
}

// Des quantités à trois chiffres qui reviennent : il faut qu'elles soient
// plausibles (pas de cageot de 933 pommes).
const GROS_LOTS: readonly { fait: (a: number) => string; demande: (b: number) => string; objet: string }[] = [
  { fait: (a) => `Chaque jour, une boulangerie fait ${a} baguettes.`, demande: (b) => `Combien de baguettes fait-elle en ${b} jours ?`, objet: "baguettes" },
  { fait: (a) => `Un avion transporte ${a} passagers à chaque vol.`, demande: (b) => `Combien de passagers transporte-t-il en ${b} vols ?`, objet: "passagers" },
  { fait: (a) => `Un livre compte ${a} pages.`, demande: (b) => `Combien de pages dans ${b} exemplaires de ce livre ?`, objet: "pages" },
  { fait: (a) => `Une salle de spectacle a ${a} places.`, demande: (b) => `Combien de spectateurs pour ${b} soirées complètes ?`, objet: "spectateurs" },
  { fait: (a) => `Un camion livre ${a} briques à chaque voyage.`, demande: (b) => `Combien de briques livre-t-il en ${b} voyages ?`, objet: "briques" },
  { fait: (a) => `Un club vend ${a} billets à chaque match.`, demande: (b) => `Combien de billets vend-il en ${b} matchs ?`, objet: "billets" },
  { fait: (a) => `Un car parcourt ${a} km par jour.`, demande: (b) => `Combien de kilomètres parcourt-il en ${b} jours ?`, objet: "kilomètres" },
  { fait: (a) => `Une machine remplit ${a} bouteilles en une heure.`, demande: (b) => `Combien de bouteilles remplit-elle en ${b} heures ?`, objet: "bouteilles" },
  { fait: (a) => `Un cinéma accueille ${a} spectateurs à chaque séance.`, demande: (b) => `Combien de spectateurs pour ${b} séances ?`, objet: "spectateurs" },
  { fait: (a) => `Un maraîcher récolte ${a} kg de tomates chaque semaine.`, demande: (b) => `Combien de kilos récolte-t-il en ${b} semaines ?`, objet: "kilos" },
  { fait: (a) => `Il faut ${a} perles pour un collier.`, demande: (b) => `Combien de perles faut-il pour ${b} colliers ?`, objet: "perles" },
  { fait: (a) => `Un train compte ${a} places assises.`, demande: (b) => `Combien de places dans ${b} trains identiques ?`, objet: "places" },
  { fait: (a) => `Une imprimante imprime ${a} pages par jour.`, demande: (b) => `Combien de pages imprime-t-elle en ${b} jours ?`, objet: "pages" },
  { fait: (a) => `Un rouleau contient ${a} timbres.`, demande: (b) => `Combien de timbres dans ${b} rouleaux ?`, objet: "timbres" },
];

/** Le facteur qui manque : t × ? = p. */
function enonceFacteur(t: number, p: number) {
  const P = tirePrenom();
  return randomChoice([
    `Complète : ${t} × … = ${p}`,
    `Complète : … × ${t} = ${p}`,
    `Quel nombre manque ? ${t} × ? = ${p}`,
    `Par combien faut-il multiplier ${t} pour obtenir ${p} ?`,
    `Combien de fois faut-il prendre ${t} pour arriver à ${p} ?`,
    `Dans la table de ${t}, quel nombre multiplié par ${t} donne ${p} ?`,
    `${t} fois combien font ${p} ?`,
    `${P.nom} pense à un nombre. Multiplié par ${t}, il donne ${p}. Quel est ce nombre ?`,
    `En comptant de ${t} en ${t} depuis 0, combien de bonds faut-il pour arriver à ${p} ?`,
  ]);
}

/** Le facteur qui manque, raconté : on remplit des contenants de t. */
function enonceFacteurGroupes(s: Groupes, t: number, total: number) {
  const P = tirePrenom();
  return randomChoice([
    `${cap(s.lieu)}, on ${s.verbe} ${total} ${s.objet[1]}, ${t} ${s.prep} chaque ${s.contenant[0]}. Combien ${de(s.contenant[1])} faut-il ?`,
    `${cap(s.lieu)}, ${P.nom} ${s.verbe} ${t} ${pl(t, s.objet)} ${s.prep} chaque ${s.contenant[0]}. ${P.Il} a ${total} ${s.objet[1]}. Combien ${de(s.contenant[1])} lui faut-il ?`,
  ]);
}

/** L'appui qui fait retrouver t × n sans réciter. */
function appui(t: number, n: number) {
  const p = t * n;
  switch (t) {
    case 2:
      return `2 × ${n}, c'est le double de ${n} : ${n} + ${n} = ${p}.`;
    case 3:
      return `3 × ${n}, c'est le double de ${n}, plus encore ${n} : ${2 * n} + ${n} = ${p}.`;
    case 4:
      return `4 × ${n}, c'est le double du double : le double de ${n} est ${2 * n}, et le double de ${2 * n} est ${p}.`;
    case 5:
      return `5 × ${n}, c'est la moitié de 10 × ${n} = ${10 * n} : la moitié de ${10 * n} est ${p}.`;
    case 10:
      return n === 10
        ? "10 × 10 : dans 10, le 1 est une dizaine ; 1 dizaine devient 1 centaine : 100."
        : `10 × ${n} : ${n} ${n === 1 ? "unité devient" : "unités deviennent"} ${n} ${n === 1 ? "dizaine" : "dizaines"} : ${p}.`;
    case 6:
      return `6 × ${n} = 5 × ${n} + ${n} = ${5 * n} + ${n} = ${p}.`;
    case 7:
      return `7 × ${n} = 5 × ${n} + 2 × ${n} = ${5 * n} + ${2 * n} = ${p}.`;
    case 8:
      return `8 × ${n}, c'est le double de 4 × ${n} = ${4 * n} : ${4 * n} + ${4 * n} = ${p}.`;
    case 9:
      return `9 × ${n} = 10 × ${n} - ${n} = ${10 * n} - ${n} = ${p}.`;
    default:
      return `${t} × ${n} = ${p}.`;
  }
}

/**
 * « Un élève dit que a × b = w. A-t-il raison ? » — une fois sur deux il a
 * raison. Les propositions : « c'est juste », ou « c'est faux : a × b = … ».
 * `faux` doit fournir au moins quatre valeurs différentes du bon produit.
 */
function affirmation(a: number, b: number, faux: readonly number[]) {
  const p = a * b;
  const autres = Array.from(new Set(faux)).filter((v) => v !== p && v > 0);
  const juste = Math.random() < 0.5;
  const w = juste ? p : randomChoice(autres);
  const P = tirePrenom();
  const moment = randomChoice(MOMENTS);
  const text = randomChoice([
    `${moment}, ${P.nom} écrit ${a} × ${b} = ${w}. Est-ce juste ?`,
    `${moment}, ${P.nom} annonce : « ${a} × ${b} = ${w} ». A-t-${P.il} raison ?`,
    `${moment}, ${P.nom} affirme que ${a} fois ${b} font ${w}. Qu'en penses-tu ?`,
    `${moment}, on lit : ${a} × ${b} = ${w}. Vrai ou faux ?`,
    `${P.nom} parie que ${a} × ${b} = ${w}. A-t-${P.il} gagné son pari ?`,
    `Le robot calculateur de ${P.nom} affiche ${a} × ${b} = ${w}. Peut-on lui faire confiance ?`,
    `Pour vérifier, ${P.nom} relit son calcul : ${a} × ${b} = ${w}. Faut-il le corriger ?`,
    `Dans l'exercice, la réponse proposée pour ${a} × ${b} est ${w}. Est-elle bonne ?`,
    `${P.nom} récite : « ${a} fois ${b}, ${w} ». Vrai ou faux ?`,
    `${moment}, ${P.nom} complète ${a} × ${b} = … avec ${w}. Est-ce le bon nombre ?`,
  ]);
  const corrige = (v: number) => `c'est faux : ${a} × ${b} = ${v}`;
  const correct = juste ? "c'est juste" : corrige(p);
  const pieges = juste
    ? autres.map(corrige)
    : ["c'est juste", ...autres.filter((v) => v !== w).map(corrige)];
  return { text, choices: makeChoices(correct, pieges), expected: [correct], juste, w, p };
}

/** Les chiffres de a multipliés un par un, retenue comprise (a × b, b à un chiffre). */
function etapesPosee(a: number, b: number) {
  const chiffres = String(a).split("").map(Number).reverse();
  const rangs = ["Unités", "Dizaines", "Centaines"];
  let retenue = 0;
  const phrases: string[] = [];
  chiffres.forEach((c, i) => {
    const prod = b * c;
    const tot = prod + retenue;
    const calc = retenue > 0 ? `${b} × ${c} = ${prod}, plus la retenue ${retenue}, égale ${tot}` : `${b} × ${c} = ${prod}`;
    if (i === chiffres.length - 1) {
      phrases.push(`${rangs[i]} : ${calc}, on écrit ${tot}.`);
    } else {
      const r = Math.floor(tot / 10);
      phrases.push(r > 0 ? `${rangs[i]} : ${calc}, on écrit ${tot % 10} et on retient ${r}.` : `${rangs[i]} : ${calc}, on écrit ${tot}, pas de retenue.`);
      retenue = r;
    }
  });
  return `${phrases.join(" ")} Résultat : ${a * b}.`;
}

/**
 * ⛔ Décision de Frédéric (05/10/2026) : multiplier par 10 ou 100 s'explique
 * UNIQUEMENT par la valeur des chiffres, jamais par « on ajoute un zéro ».
 * Son modèle : « Méthode : multiplier par 10, c'est rendre chaque chiffre dix
 * fois plus grand : il monte d'une colonne. Calcul : 4 dizaines deviennent
 * 4 centaines, 5 unités deviennent 5 dizaines : 450. » (×100 : deux colonnes).
 */
function methode10(facteur: number) {
  return facteur === 10
    ? "Multiplier par 10, c'est rendre chaque chiffre dix fois plus grand : il monte d'une colonne."
    : "Multiplier par 100, c'est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.";
}
const DEF_COLONNES = "Dans un nombre, chaque chiffre vaut selon sa colonne : unités, dizaines, centaines, milliers.";
function calcul10(n: number, facteur: number) {
  return `${cap(montee(n, facteur))} : ${n * facteur}.`;
}

/** Ce que devient chaque chiffre de n multiplié par 10 ou 100 : il MONTE. */
function montee(n: number, facteur: number) {
  const noms: readonly (readonly [string, string])[] = [
    ["unité", "unités"], ["dizaine", "dizaines"], ["centaine", "centaines"],
    ["millier", "milliers"], ["dizaine de milliers", "dizaines de milliers"],
  ];
  const saut = facteur === 10 ? 1 : 2;
  return String(n)
    .split("")
    .map(Number)
    .reverse()
    .map((c, i) => (c === 0 ? "" : `${c} ${pl(c, noms[i])} ${c === 1 ? "devient" : "deviennent"} ${c} ${pl(c, noms[i + saut])}`))
    .filter(Boolean)
    .reverse()
    .join(", ");
}

/** Une addition de n répétée k fois : « 6 + 6 + 6 ». */
function repete(n: number, k: number) {
  return Array(k).fill(n).join(" + ");
}

export const multiplicationBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_TABLES_2_3_4_5_10 — les tables faciles
     Elles s'appuient sur des gestes connus : doubler, compter
     de cinq en cinq, monter d'un rang.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_tables_2_3_4_5_10_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 1,
    theme: "neutral",
    text: "Multiplier un nombre par 2, c'est faire quoi ?",
    format: "qcm",
    choices: ["son double", "sa moitié", "lui ajouter 2", "lui enlever 2"],
    expected: ["son double"],
    comparator: "mcq_exact",
    hint: "2 × 7, c'est 7 + 7.",
    explanation: exp(
      "Multiplier par 2, c'est prendre deux fois le nombre : c'est son double.",
      "On additionne le nombre avec lui-même.",
      "2 × 7 = 7 + 7 = 14. C'est pour cela que la table de 2 est la plus facile : on la connaît déjà en sachant doubler.",
      "Multiplier par 2, c'est doubler.",
    ),
    tags: ["ce2", "multiplication", "tables", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_tables_2_3_4_5_10_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 4 × 5 ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Compte de cinq en cinq, quatre fois.",
    explanation: exp(
      "Multiplier, c'est additionner plusieurs fois le même nombre.",
      "On compte de 5 en 5, autant de fois que l'indique l'autre nombre.",
      "5, 10, 15, 20 : quatre bonds de 5 mènent à 20. On peut aussi voir 4 × 5 comme le double de 2 × 5 = 10.",
      "4 × 5 = 20.",
    ),
    tags: ["ce2", "multiplication", "tables"],
  },
  {
    kind: "fixed",
    id: "ce2_tables_2_3_4_5_10_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 7 × 0 ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Sept paquets vides, cela fait combien d'objets ?",
    explanation: exp(
      "Multiplier par 0, c'est prendre zéro fois le nombre : il ne reste rien.",
      "On se demande combien d'objets il y a en tout.",
      "7 × 0, c'est sept paquets qui ne contiennent rien : 0 + 0 + 0 + 0 + 0 + 0 + 0 = 0. Tout nombre multiplié par 0 donne 0.",
      "7 × 0 = 0.",
    ),
    tags: ["ce2", "multiplication", "tables", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_tables_2_3_4_5_10_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Appuie-toi sur ce que tu sais déjà : doubler, compter de 5 en 5.",
    tags: ["ce2", "multiplication", "tables", "template"],
    generate: () => {
      const table = randomChoice([2, 3, 4, 5, 10]);
      const n = randomInt(2, 10);
      const produit = table * n;
      // L'ordre change d'un tirage à l'autre : 3 × 7 et 7 × 3 sont la même case.
      const tourne = Math.random() < 0.5;
      const [a, b] = tourne ? [n, table] : [table, n];
      const text =
        table === 2 && Math.random() < 0.2
          ? randomChoice([`Quel est le double de ${n} ?`, `Combien fait ${n} pris deux fois ?`])
          : Math.random() < 0.2
            ? randomChoice([
                `Dans la table de ${table}, combien font ${a} × ${b} ?`,
                `Récite la table de ${table} : ${a} × ${b} = ?`,
              ])
            : enonceProduit(a, b);
      return {
        text,
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier, c'est additionner plusieurs fois le même nombre.",
          "On s'appuie sur un résultat qu'on connaît déjà, puis on ajuste.",
          `${appui(table, n)}${tourne && n !== table ? ` Et ${n} × ${table}, c'est le même résultat : l'ordre ne change rien.` : ""}`,
          `${a} × ${b} = ${produit}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_tables_2_3_4_5_10_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Combien de paquets, et combien dans chaque paquet ? Puis récite la bonne table.",
    tags: ["ce2", "multiplication", "tables", "probleme", "template"],
    generate: () => {
      const s = randomChoice(GROUPES);
      const table = randomChoice([2, 3, 4, 5, 10]);
      const n = randomInt(2, 9);
      // La table est tantôt le nombre de paquets, tantôt leur contenu.
      const [a, b] = Math.random() < 0.5 ? [n, table] : [table, n];
      const total = a * b;
      const { constat, question } = enonceGroupes(s, a, b);
      return {
        text: `${constat} ${question}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand des paquets contiennent tous la même chose, on multiplie au lieu d'additionner.",
          "On multiplie le nombre de paquets par ce que chacun contient, en s'appuyant sur la table qu'on connaît.",
          `${a} × ${b} = ${total}. ${appui(table, n)}`,
          `Il y a ${total} ${s.objet[1]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_tables_2_3_4_5_10_tpl_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les bonds un par un : la table défile toute seule.",
    tags: ["ce2", "multiplication", "tables", "bonds", "template"],
    generate: () => {
      const sauteur = randomChoice([
        ["Une grenouille", "elle"],
        ["Un kangourou", "il"],
        ["Une sauterelle", "elle"],
        ["Un robot", "il"],
        ["Un lapin", "il"],
        ["Une puce", "elle"],
        ["Un pion", "il"],
        ["Une coccinelle", "elle"],
        ["Un écureuil", "il"],
        ["Un margouillat", "il"],
      ] as const);
      const [S, il] = sauteur;
      const table = randomChoice([2, 3, 4, 5, 10]);
      const n = randomInt(2, 10);
      const produit = table * n;
      const suite = Array.from({ length: n }, (_, i) => table * (i + 1)).join(", ");
      const text = randomChoice([
        `${S} avance de ${table} cases à chaque saut, en partant de la case 0. Sur quelle case arrive-t-${il} après ${n} sauts ?`,
        `Sur une piste graduée, ${S.charAt(0).toLowerCase() + S.slice(1)} part de 0 et fait ${n} bonds de ${table}. Où arrive-t-${il} ?`,
        `${S} fait ${n} sauts de ${table} cases, depuis la case 0. Sur quel nombre se pose-t-${il} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "Faire plusieurs bonds de même longueur, c'est multiplier.",
          `On compte de ${table} en ${table} depuis 0, autant de fois qu'il y a de bonds.`,
          `${suite} : ${n} bonds de ${table} mènent à ${produit}, car ${n} × ${table} = ${produit}.`,
          `${il === "elle" ? "Elle" : "Il"} arrive sur la case ${produit}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_tables_2_3_4_5_10_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche combien de fois il faut prendre le nombre pour arriver au total.",
    tags: ["ce2", "multiplication", "tables", "template"],
    generate: () => {
      const table = randomChoice([2, 3, 4, 5, 10]);
      const n = randomInt(2, 10);
      const produit = table * n;
      // Une fois sur deux, le facteur manquant est raconté : des paquets à remplir.
      const s = randomChoice(GROUPES);
      const raconte = Math.random() < 0.5;
      return {
        text: raconte ? enonceFacteurGroupes(s, table, produit) : enonceFacteur(table, produit),
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher le nombre qui manque dans une multiplication, c'est parcourir la table à l'envers.",
          "On récite la table jusqu'à tomber sur le total.",
          `Dans la table de ${table}, on cherche ${produit} : ${table} × ${n} = ${produit}. Le nombre qui manque est ${n}.`,
          raconte ? `Il faut ${n} ${s.contenant[1]}.` : `Il manque ${n}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_tables_2_3_4_5_10_tpl_5",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Refais le calcul toi-même avant de juger.",
    tags: ["ce2", "multiplication", "tables", "vrai_faux", "qcm", "template"],
    generate: () => {
      const table = randomChoice([2, 3, 4, 5, 10]);
      const n = randomInt(2, 10);
      const [a, b] = Math.random() < 0.5 ? [table, n] : [n, table];
      const p = table * n;
      const q = affirmation(a, b, [p + table, p - table, p + 1, p - 1, p + n, p + 10]);
      return {
        text: q.text,
        format: "qcm",
        choices: q.choices,
        expected: q.expected,
        comparator: "mcq_exact",
        explanation: exp(
          "Pour juger un calcul, on le refait soi-même.",
          "On retrouve le produit avec un appui sûr, puis on compare.",
          `${appui(table, n)} ${q.juste ? `Le résultat annoncé, ${q.w}, est le bon.` : `Le résultat annoncé, ${q.w}, est faux.`}`,
          q.juste ? `C'est juste : ${a} × ${b} = ${p}.` : `C'est faux : ${a} × ${b} = ${p}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_tables_2_3_4_5_10_tpl_6",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_2_3_4_5_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte de tant en tant depuis 0 : lequel de ces nombres tombe juste ?",
    tags: ["ce2", "multiplication", "tables", "reconnaitre", "qcm", "template"],
    generate: () => {
      const table = randomChoice([2, 3, 4, 5, 10]);
      const k = randomInt(2, 10);
      const bon = table * k;
      // Les pièges sont VOISINS du bon nombre, et aucun n'est dans la table.
      const pieges = [bon + 1, bon - 1, bon + 2, bon - 2, bon + 3, bon - 3, bon + table + 1, bon - table + 1]
        .filter((v) => v > 0 && v % table !== 0)
        .map(String);
      const s = randomChoice(GROUPES);
      const P = tirePrenom();
      const text = randomChoice([
        `Lequel de ces nombres est dans la table de ${table} ?`,
        `Quel nombre peut-on obtenir en multipliant ${table} par un nombre entier ?`,
        `En comptant de ${table} en ${table} à partir de 0, quel nombre va-t-on dire ?`,
        `Quel nombre est un résultat de la table de ${table} ?`,
        `${P.nom} récite la table de ${table}. Quel nombre va-t-${P.il} dire ?`,
        `${cap(s.lieu)}, on fait des ${s.contenant[1]} de ${table} ${s.objet[1]}, sans qu'il en reste. Lequel de ces nombres ${de(s.objet[1])} convient ?`,
        `${cap(s.lieu)}, on ${s.verbe} ${table} ${s.objet[1]} ${s.prep} chaque ${s.contenant[0]}, et tout est rempli. Combien ${de(s.objet[1])} peut-il y avoir ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(String(bon), pieges),
        expected: [String(bon)],
        comparator: "mcq_exact",
        explanation: exp(
          `Les résultats de la table de ${table} sont ce qu'on obtient en comptant de ${table} en ${table} depuis 0.`,
          `On cherche, parmi les nombres proposés, celui qui s'écrit ${table} × quelque chose.`,
          `${table} × ${k} = ${bon} : ${bon} est dans la table de ${table}. Les autres tombent juste à côté.`,
          `C'est ${bon}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_TABLES_6_7_8_9 — les tables difficiles
     Elles se réduisent quand on sait que l'ordre ne change
     rien : 7 × 3 se retrouve dans la table de 3.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_tables_6_7_8_9_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 7 × 8 ?",
    format: "short",
    expected: ["56"],
    comparator: "number_equal",
    hint: "C'est le résultat que tout le monde oublie. 5, 6, 7, 8 : 56 = 7 × 8.",
    explanation: exp(
      "7 × 8 est le produit le plus difficile à retenir de toutes les tables.",
      "On utilise le truc des quatre chiffres qui se suivent : 5, 6, 7, 8.",
      "56 = 7 × 8. On peut aussi calculer : 7 × 8 = 7 × 4 × 2 = 28 × 2 = 56.",
      "7 × 8 = 56.",
    ),
    tags: ["ce2", "multiplication", "tables", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_tables_6_7_8_9_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 3,
    theme: "neutral",
    text: "Si tu sais que 3 × 8 = 24, que vaut 8 × 3 ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "L'ordre ne change rien dans une multiplication.",
    explanation: exp(
      "Dans une multiplication, on peut échanger les deux nombres sans changer le résultat.",
      "On retourne le calcul pour retomber sur une table qu'on connaît mieux.",
      "3 rangées de 8 ou 8 rangées de 3 : dans les deux cas, il y a 24 cases. C'est pour cela qu'apprendre les tables de 6, 7, 8 et 9 est moins long qu'il n'y paraît — la moitié est déjà connue.",
      "8 × 3 = 24.",
    ),
    tags: ["ce2", "multiplication", "tables", "methode"],
  },
  {
    kind: "fixed",
    id: "ce2_tables_6_7_8_9_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit que 6 × 9 = 56. A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 6 × 9 = 54",
      "oui",
      "non, 6 × 9 = 63",
      "non, 6 × 9 = 45",
    ],
    expected: ["non, 6 × 9 = 54"],
    comparator: "mcq_exact",
    hint: "Passe par 6 × 10, puis enlève un 6.",
    explanation: exp(
      "Multiplier par 9, c'est multiplier par 10 puis enlever une fois le nombre.",
      "On calcule le produit facile par 10, puis on retire.",
      "6 × 10 = 60, et 60 - 6 = 54. Le 56 qu'il annonce, c'est 7 × 8 : les deux résultats se ressemblent et se confondent souvent.",
      "Non : 6 × 9 = 54.",
    ),
    tags: ["ce2", "multiplication", "tables", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_tables_6_7_8_9_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe par un résultat voisin que tu connais.",
    tags: ["ce2", "multiplication", "tables", "template"],
    generate: () => {
      const table = randomChoice([6, 7, 8, 9]);
      const n = randomInt(2, 10);
      const produit = table * n;
      const tourne = Math.random() < 0.5;
      const [a, b] = tourne ? [n, table] : [table, n];
      const text =
        Math.random() < 0.2
          ? randomChoice([
              `Dans la table de ${table}, combien font ${a} × ${b} ?`,
              `Récite la table de ${table} : ${a} × ${b} = ?`,
            ])
          : enonceProduit(a, b);
      return {
        text,
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une multiplication, on peut échanger les deux nombres sans changer le résultat.",
          "On s'appuie sur un produit voisin plus facile, puis on ajuste.",
          `${appui(table, n)}${tourne && n !== table ? ` Et ${n} × ${table}, c'est le même résultat : l'ordre ne change rien.` : ""}`,
          `${a} × ${b} = ${produit}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_tables_6_7_8_9_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de paquets, combien dans chacun ? Puis passe par un produit voisin.",
    tags: ["ce2", "multiplication", "tables", "probleme", "template"],
    generate: () => {
      const s = randomChoice(GROUPES);
      const table = randomChoice([6, 7, 8, 9]);
      const n = randomInt(3, 9);
      const [a, b] = Math.random() < 0.5 ? [n, table] : [table, n];
      const total = a * b;
      const { constat, question } = enonceGroupes(s, a, b);
      return {
        text: `${constat} ${question}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand des paquets contiennent tous la même chose, on multiplie au lieu d'additionner.",
          "On multiplie le nombre de paquets par ce que chacun contient, en passant par un produit plus facile.",
          `${a} × ${b} = ${total}. ${appui(table, n)}`,
          `Il y a ${total} ${s.objet[1]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_tables_6_7_8_9_tpl_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 3,
    theme: "neutral",
    hint: "Pars du résultat qu'on te donne : il n'y a presque rien à refaire.",
    tags: ["ce2", "multiplication", "tables", "methode", "template"],
    generate: () => {
      const table = randomChoice([6, 7, 8, 9]);
      const P = tirePrenom();
      const genre = randomChoice(["plus", "moins", "ordre", "double"] as const);
      // Le « double » n'existe que pour 6 et 8 (moitiés : 3 et 4).
      const sorte = genre === "double" && table % 2 !== 0 ? "plus" : genre;
      if (sorte === "plus" || sorte === "moins") {
        const n = sorte === "plus" ? randomInt(2, 8) : randomInt(3, 10);
        const m = sorte === "plus" ? n + 1 : n - 1;
        const p = table * n;
        const r = table * m;
        const text =
          sorte === "plus"
            ? randomChoice([
                `Tu sais que ${table} × ${n} = ${p}. Ajoute un ${table} de plus : combien font ${table} × ${m} ?`,
                `Sachant que ${table} × ${n} = ${p}, calcule ${table} × ${m} en ajoutant ${table}.`,
                `${P.nom} connaît ${table} × ${n} = ${p}. Que trouve-t-${P.il} pour ${table} × ${m} ?`,
              ])
            : randomChoice([
                `Tu sais que ${table} × ${n} = ${p}. Enlève un ${table} : combien font ${table} × ${m} ?`,
                `Sachant que ${table} × ${n} = ${p}, calcule ${table} × ${m} en retirant ${table}.`,
                `${P.nom} part de ${table} × ${n} = ${p} pour trouver ${table} × ${m}. Quel résultat obtient-${P.il} ?`,
              ]);
        return {
          text,
          format: "short",
          expected: [String(r)],
          comparator: "number_equal",
          explanation: exp(
            `Passer de ${table} × ${n} à ${table} × ${m}, c'est prendre ${table} une fois ${sorte === "plus" ? "de plus" : "de moins"}.`,
            `On part du résultat connu et on ${sorte === "plus" ? "ajoute" : "retire"} ${table}.`,
            sorte === "plus" ? `${p} + ${table} = ${r}.` : `${p} - ${table} = ${r}.`,
            `${table} × ${m} = ${r}.`,
          ),
        };
      }
      if (sorte === "ordre") {
        const n = randomInt(2, 5);
        const p = table * n;
        const text = randomChoice([
          `Si ${n} × ${table} = ${p}, que vaut ${table} × ${n} ?`,
          `${P.nom} sait que ${n} × ${table} = ${p}. Combien font ${table} × ${n} ?`,
          `On retourne ${n} × ${table} = ${p}. Que vaut ${table} × ${n} ?`,
        ]);
        return {
          text,
          format: "short",
          expected: [String(p)],
          comparator: "number_equal",
          explanation: exp(
            "Dans une multiplication, on peut échanger les deux nombres sans changer le résultat.",
            "On retourne le calcul pour retomber sur une table qu'on connaît déjà.",
            `${n} rangées de ${table} ou ${table} rangées de ${n} : c'est le même quadrillage, ${p} cases.`,
            `${table} × ${n} = ${p}.`,
          ),
        };
      }
      const moitie = table / 2;
      const n = randomInt(3, 9);
      const q = moitie * n;
      const p = table * n;
      const text = randomChoice([
        `${table} × ${n}, c'est le double de ${moitie} × ${n}. Sachant que ${moitie} × ${n} = ${q}, combien font ${table} × ${n} ?`,
        `${P.nom} sait que ${moitie} × ${n} = ${q}. Pour ${table} × ${n}, ${P.il} double. Que trouve-t-${P.il} ?`,
        `Double ${moitie} × ${n} = ${q} : combien font ${table} × ${n} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: exp(
          `${table} est le double de ${moitie} : ${table} × ${n} est donc le double de ${moitie} × ${n}.`,
          "On part du produit connu et on le double.",
          `${q} + ${q} = ${p}.`,
          `${table} × ${n} = ${p}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_tables_6_7_8_9_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 4,
    theme: "neutral",
    hint: "Récite la table jusqu'à tomber sur le total.",
    tags: ["ce2", "multiplication", "tables", "template"],
    generate: () => {
      const table = randomChoice([6, 7, 8, 9]);
      const n = randomInt(2, 10);
      const produit = table * n;
      const s = randomChoice(GROUPES);
      const raconte = Math.random() < 0.5;
      return {
        text: raconte ? enonceFacteurGroupes(s, table, produit) : enonceFacteur(table, produit),
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher le nombre qui manque, c'est parcourir la table à l'envers.",
          "On récite la table de ce nombre jusqu'à tomber sur le total.",
          `Dans la table de ${table}, on cherche ${produit} : ${n} × ${table} = ${produit}. Le nombre qui manque est ${n}.`,
          raconte ? `Il faut ${n} ${s.contenant[1]}.` : `Il manque ${n}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_tables_6_7_8_9_tpl_5",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 4,
    theme: "neutral",
    hint: "Refais le calcul par un produit voisin avant de juger.",
    tags: ["ce2", "multiplication", "tables", "vrai_faux", "piege", "qcm", "template"],
    generate: () => {
      const table = randomChoice([6, 7, 8, 9]);
      const n = randomInt(3, 9);
      const [a, b] = Math.random() < 0.5 ? [table, n] : [n, table];
      const p = table * n;
      // Les confusions qui reviennent chaque année, en plus des voisins.
      const CONFUSIONS: Record<number, number[]> = {
        54: [56, 45, 64], 56: [54, 63, 58, 48], 63: [64, 56, 72], 48: [46, 42, 64],
        42: [48, 36, 49], 72: [74, 81, 63], 49: [48, 42, 56], 64: [63, 56, 46],
        36: [32, 42, 38], 81: [72, 89, 18],
      };
      const q = affirmation(a, b, [...(CONFUSIONS[p] ?? []), p + table, p - table, p + 1, p - 1, p + n]);
      return {
        text: q.text,
        format: "qcm",
        choices: q.choices,
        expected: q.expected,
        comparator: "mcq_exact",
        explanation: exp(
          "Pour juger un calcul, on le refait soi-même.",
          "On retrouve le produit par un appui sûr, puis on compare.",
          `${appui(table, n)} ${q.juste ? `Le résultat annoncé, ${q.w}, est le bon.` : `Le résultat annoncé, ${q.w}, est faux.`}`,
          q.juste ? `C'est juste : ${a} × ${b} = ${p}.` : `C'est faux : ${a} × ${b} = ${p}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_tables_6_7_8_9_tpl_6",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_tables_6_7_8_9",
    difficulty: 4,
    theme: "neutral",
    hint: "Calcule chaque proposition : une seule tombe juste.",
    tags: ["ce2", "multiplication", "tables", "choisir_calcul", "qcm", "template"],
    generate: () => {
      const table = randomChoice([6, 7, 8, 9]);
      const n = randomInt(3, 9);
      const p = table * n;
      // Des calculs voisins, dont aucun ne vaut p (6 × 4 et 8 × 3 font tous deux 24).
      const pieges = [
        [table, n + 1], [table + 1, n], [table - 1, n], [table, n - 1], [table + 1, n - 1], [table - 1, n + 1],
      ]
        .filter(([x, y]) => x * y !== p)
        .map(([x, y]) => `${x} × ${y}`);
      const correct = `${table} × ${n}`;
      const P = tirePrenom();
      const intro = randomChoice(["", "Jeu des tables. ", "Défi du jour. ", "Calcul mental. "]);
      const question = randomChoice([
        `Quel calcul donne ${p} ?`,
        `Lequel de ces calculs a pour résultat ${p} ?`,
        `${P.nom} cherche une multiplication égale à ${p}. Laquelle choisir ?`,
        `Dans quelle case de la table trouve-t-on ${p} ?`,
        `Quel produit vaut ${p} ?`,
      ]);
      return {
        text: `${intro}${question}`,
        format: "qcm",
        choices: makeChoices(correct, pieges),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque résultat de la table correspond à un calcul.",
          "On calcule chaque proposition et on garde celle qui donne le bon nombre.",
          `${appui(table, n)} Les autres calculs sont voisins, mais ne donnent pas ${p}.`,
          `C'est ${correct}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MULTIPLICATION_SENS — groupes égaux et rangées
     Ce que la multiplication RACONTE : des paquets tous
     pareils, ou un quadrillage de rangées.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_multiplication_sens_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Quel calcul remplace 6 + 6 + 6 + 6 ?",
    format: "qcm",
    choices: ["4 × 6", "6 × 6", "4 + 6", "6 - 4"],
    expected: ["4 × 6"],
    comparator: "mcq_exact",
    hint: "Compte combien de fois le 6 est écrit.",
    explanation: exp(
      "Une multiplication remplace une addition de nombres tous égaux.",
      "On compte combien de fois le nombre est répété.",
      "Le 6 est écrit 4 fois : cela s'écrit 4 × 6, et vaut 24. On n'écrit pas 6 × 6, qui voudrait dire six paquets de six.",
      "C'est 4 × 6.",
    ),
    tags: ["ce2", "multiplication", "sens", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_sens_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 3,
    theme: "reunion",
    text: "Dans un champ, la canne est plantée en 8 rangées de 7 pieds. Un élève dit qu'il y a autant de pieds que dans 7 rangées de 8. A-t-il raison ?",
    format: "qcm",
    choices: [
      "oui, il y a 56 pieds dans les deux cas",
      "non, 8 rangées c'est plus",
      "non, 7 rangées c'est plus",
      "on ne peut pas savoir",
    ],
    expected: ["oui, il y a 56 pieds dans les deux cas"],
    comparator: "mcq_exact",
    hint: "Fais tourner le champ d'un quart de tour : que changerait-il ?",
    explanation: exp(
      "Dans une multiplication, on peut échanger les deux nombres sans changer le résultat.",
      "On imagine le champ vu de l'autre côté : les rangées deviennent des colonnes.",
      "8 × 7 = 56 et 7 × 8 = 56. C'est le même champ regardé dans l'autre sens : le nombre de pieds ne bouge pas.",
      "Oui : 56 pieds dans les deux cas.",
    ),
    tags: ["ce2", "multiplication", "sens", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_sens_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 4,
    theme: "neutral",
    text: "Peut-on écrire 5 + 5 + 5 + 3 sous la forme d'une multiplication ?",
    format: "qcm",
    choices: [
      "non, les nombres ne sont pas tous égaux",
      "oui, cela fait 4 × 5",
      "oui, cela fait 3 × 5",
      "oui, cela fait 4 × 3",
    ],
    expected: ["non, les nombres ne sont pas tous égaux"],
    comparator: "mcq_exact",
    hint: "La multiplication ne remplace que des paquets tous pareils.",
    explanation: exp(
      "Une multiplication ne remplace une addition que si tous les nombres sont égaux.",
      "On vérifie d'abord que les paquets ont tous la même taille.",
      "Ici il y a trois 5 et un 3 : les paquets ne sont pas pareils. On peut écrire 3 × 5 + 3, mais pas une seule multiplication.",
      "Non, les nombres ne sont pas tous égaux.",
    ),
    tags: ["ce2", "multiplication", "sens", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_multiplication_sens_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 2,
    theme: "neutral",
    hint: "Combien de paquets, et combien dans chaque paquet ?",
    tags: ["ce2", "multiplication", "sens", "template"],
    generate: () => {
      const paquets = randomInt(3, 8);
      const parPaquet = randomInt(3, 9);
      const total = paquets * parPaquet;
      const s = randomChoice(GROUPES);
      const { constat, question } = enonceGroupes(s, paquets, parPaquet);
      return {
        text: `${constat} ${question}`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand des paquets contiennent tous la même chose, on multiplie au lieu d'additionner.",
          "On multiplie le nombre de paquets par ce que chacun contient.",
          `${paquets} × ${parPaquet} = ${total}. C'est plus court que d'écrire ${repete(parPaquet, paquets)}.`,
          `Il y a ${total} ${s.objet[1]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_sens_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 2,
    theme: "neutral",
    hint: "Des paquets tous pareils : c'est le signe ×.",
    tags: ["ce2", "multiplication", "sens", "choisir_calcul", "qcm", "template"],
    generate: () => {
      const s = randomChoice(GROUPES);
      const a = randomInt(3, 8);
      let b = randomInt(3, 9);
      if (b === a) b = a + 1;
      const { constat } = enonceGroupes(s, a, b);
      const question = randomChoice([
        `Quel calcul donne le nombre total ${de(s.objet[1])} ?`,
        `Quel calcul faut-il faire pour savoir combien il y a ${de(s.objet[1])} ?`,
        `Quelle opération permet de trouver le nombre ${de(s.objet[1])} ?`,
      ]);
      const correct = `${a} × ${b}`;
      return {
        text: `${constat} ${question}`,
        format: "qcm",
        // ⚠️ « b × a » serait juste aussi : il n'est jamais parmi les pièges.
        choices: makeChoices(correct, [
          `${a} + ${b}`,
          b > a ? `${b} - ${a}` : `${a} - ${b}`,
          `${a} × ${a}`,
          `${b} × ${b}`,
          `${a} + ${a}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand on réunit des paquets qui contiennent tous la même chose, on multiplie.",
          "On repère le nombre de paquets et ce que contient chacun.",
          `${a} paquets de ${b} : ${correct} = ${a * b}. Le calcul ${a} + ${b} ne donnerait que ${a + b} : il ajoute le nombre de paquets au contenu d'un seul paquet.`,
          `Le bon calcul est ${correct}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_sens_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte combien de fois le nombre est répété.",
    tags: ["ce2", "multiplication", "sens", "template"],
    generate: () => {
      const n = randomInt(3, 9);
      const fois = randomInt(3, 6);
      const somme = repete(n, fois);
      const P = tirePrenom();
      return {
        // La longueur de l'addition change le squelette ; la tournure aussi.
        text: randomChoice([
          `Quel calcul remplace ${somme} ?`,
          `Quelle multiplication est égale à ${somme} ?`,
          `${P.nom} écrit ${somme}. Comment l'écrire plus vite ?`,
          `Comment écrire ${somme} avec le signe × ?`,
          `Quelle écriture plus courte donne ${somme} ?`,
          `Au lieu d'écrire ${somme}, que peut-on écrire ?`,
        ]),
        format: "qcm",
        // ⚠️ Quand `fois` vaut `n`, deux des pièges retombent sur la bonne
        // réponse et disparaissent au tri : on en écrit assez pour qu'il en
        // reste toujours trois.
        choices: makeChoices(`${fois} × ${n}`, [
          `${n} × ${n}`,
          `${fois} + ${n}`,
          `${fois} × ${fois}`,
          `${n} - ${fois}`,
          `${fois + 1} × ${n}`,
        ]),
        expected: [`${fois} × ${n}`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une multiplication remplace une addition de nombres tous égaux.",
          "On compte combien de fois le nombre est répété : c'est le premier facteur.",
          `Le ${n} est écrit ${fois} fois : cela s'écrit ${fois} × ${n}, et vaut ${fois * n}.`,
          `C'est ${fois} × ${n}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_sens_tpl_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de rangées, et combien dans chaque rangée ?",
    tags: ["ce2", "multiplication", "sens", "rangees", "template"],
    generate: () => {
      const s = randomChoice(RANGEES);
      const r = randomInt(3, 9);
      const c = randomInt(3, 9);
      const total = r * c;
      const lignes = pl(r, s.ligne);
      const objets = pl(c, s.objet);
      const text = randomChoice([
        `${s.ou}, il y a ${r} ${lignes} de ${c} ${objets}. Combien ${de(s.objet[1])} en tout ?`,
        `${s.ou}, on voit ${r} ${lignes}, avec ${c} ${objets} ${s.prep} chaque ${s.ligne[0]}. Combien ${de(s.objet[1])} y a-t-il ?`,
        `${s.ou}, les ${s.objet[1]} forment ${r} ${lignes} de ${c}. Combien y en a-t-il ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un quadrillage de rangées toutes pareilles se compte par une multiplication.",
          "On multiplie le nombre de rangées par le nombre d'objets dans une rangée.",
          `${r} × ${c} = ${total}. On pourrait aussi compter par colonnes : ${c} × ${r} = ${total}, c'est le même quadrillage.`,
          `Il y a ${total} ${s.objet[1]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_sens_tpl_5",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_sens",
    difficulty: 3,
    theme: "neutral",
    hint: "Le premier nombre dit combien de fois on écrit le second.",
    tags: ["ce2", "multiplication", "sens", "addition_iteree", "qcm", "template"],
    generate: () => {
      const a = randomInt(3, 5);
      let b = randomInt(2, 9);
      if (b === a) b = a + 2;
      const correct = repete(b, a);
      const P = tirePrenom();
      const intro = randomChoice(["", "Retour à l'addition. ", "Vérification. ", "Petit défi. "]);
      const question = randomChoice([
        `Quelle addition donne le même résultat que ${a} × ${b} ?`,
        `${P.nom} veut vérifier ${a} × ${b} avec une addition. Laquelle doit-${P.il} écrire ?`,
        `Quelle addition est égale à ${a} × ${b} ?`,
        `${a} × ${b}, ce sont ${a} paquets de ${b}. Quelle addition correspond ?`,
        `Quelle addition se cache derrière ${a} × ${b} ?`,
      ]);
      return {
        text: `${intro}${question}`,
        format: "qcm",
        // ⚠️ « a répété b fois » serait juste aussi : il n'est jamais parmi les pièges.
        choices: makeChoices(correct, [`${a} + ${b}`, repete(b, a + 1), repete(b, a - 1), repete(b + 1, a)]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une multiplication remplace une addition de nombres tous égaux.",
          `${a} × ${b}, ce sont ${a} paquets de ${b} : on écrit ${b} autant de fois qu'il y a de paquets.`,
          `${correct} = ${a * b}, et ${a} × ${b} = ${a * b}. L'addition ${a} + ${b} ne donne que ${a + b}.`,
          `C'est ${correct}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MULTIPLICATION_POSEE — par un nombre à un OU DEUX chiffres
     Par un chiffre, le piège est la retenue qu'on oublie.
     Par deux chiffres, c'en est un autre, et c'est un vrai saut :
     il y a une DEUXIÈME LIGNE, et elle est décalée d'un rang.
     Le chiffre des dizaines du multiplicateur ne compte pas des
     unités — sa ligne démarre une colonne plus à gauche.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_multiplication_posee_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 2,
    theme: "neutral",
    text: "Pour poser 24 × 3, par quel chiffre commence-t-on ?",
    format: "qcm",
    choices: [
      "par les unités, le 4",
      "par les dizaines, le 2",
      "par le 3",
      "peu importe",
    ],
    expected: ["par les unités, le 4"],
    comparator: "mcq_exact",
    hint: "Comme dans l'addition posée : on part de la droite.",
    explanation: exp(
      "Dans une multiplication posée, on commence toujours par les unités, à droite.",
      "On multiplie chaque chiffre en partant de la droite, en gardant la retenue pour le rang suivant.",
      "3 × 4 = 12 : on écrit 2 et on retient 1. Puis 3 × 2 = 6, plus la retenue 1, égale 7. Résultat : 72. En commençant par la gauche, on ne saurait pas où mettre la retenue.",
      "On commence par les unités.",
    ),
    tags: ["ce2", "multiplication", "posee", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_posee_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève pose 27 × 4. Il calcule 4 × 7 = 28, écrit 8, puis fait 4 × 2 = 8 et écrit 88. Où s'est-il trompé ?",
    format: "qcm",
    choices: [
      "il a oublié d'ajouter la retenue 2",
      "il a oublié d'ajouter la retenue 8",
      "il fallait commencer par le 2",
      "il n'y a pas d'erreur",
    ],
    expected: ["il a oublié d'ajouter la retenue 2"],
    comparator: "mcq_exact",
    hint: "4 × 7 = 28 : le 8 s'écrit, mais le 2 ?",
    explanation: exp(
      "Quand un produit dépasse 9, le chiffre des dizaines est une retenue : il rejoint le rang suivant.",
      "On écrit les unités du produit, on garde les dizaines en retenue, et on les ajoute au produit suivant.",
      "4 × 7 = 28 : il écrit 8 et retient 2. Ensuite 4 × 2 = 8, PLUS la retenue 2, donc 10. Le résultat est 108, pas 88.",
      "Il a oublié d'ajouter la retenue 2.",
    ),
    tags: ["ce2", "multiplication", "posee", "piege", "qcm", "canvas"],
    canvas: calculPose({
      operation: "multiplication",
      numbers: ["27", "4"],
      result: "108",
      retenues: ["2"],
      display: { showResult: false, showRetenues: false },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_posee_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 123 × 3 ?",
    format: "short",
    expected: ["369"],
    comparator: "number_equal",
    hint: "Aucun produit ne dépasse 9 : aucune retenue.",
    explanation: exp(
      "On multiplie chaque chiffre par le nombre, en partant des unités.",
      "On avance de droite à gauche et on note la retenue quand un produit dépasse 9.",
      "3 × 3 = 9, 3 × 2 = 6, 3 × 1 = 3. Aucun produit ne dépasse 9 : il n'y a pas de retenue. Le résultat est 369.",
      "123 × 3 = 369.",
    ),
    tags: ["ce2", "multiplication", "posee"],
  },
  {
    kind: "template",
    id: "ce2_multiplication_posee_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par les unités et surveille la retenue.",
    tags: ["ce2", "multiplication", "posee", "template", "canvas"],
    generate: () => {
      const a = randomInt(13, 98);
      const b = randomInt(3, 9);
      const produit = a * b;
      return {
        text: randomChoice([
          enonceProduit(a, b, true),
          enonceProduit(a, b, true),
          `Pose et calcule ${a} × ${b}.`,
          `Pose l'opération ${a} × ${b}. Quel résultat trouves-tu ?`,
        ]),
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "On multiplie chaque chiffre en partant des unités, et le chiffre des dizaines d'un produit devient une retenue.",
          "On écrit les unités du produit, on garde les dizaines, on les ajoute au produit suivant.",
          etapesPosee(a, b),
          `${a} × ${b} = ${produit}.`,
        ),
        canvas: calculPose({
          operation: "multiplication",
          numbers: [String(a), String(b)],
          result: String(produit),
          display: { showResult: false, showRetenues: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_posee_tpl_5",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul contenant, puis autant de contenants : c'est une multiplication.",
    tags: ["ce2", "multiplication", "posee", "probleme", "template"],
    generate: () => {
      const parBoite = randomInt(12, 49);
      const boites = randomInt(2, 5);
      const total = parBoite * boites;
      const s = randomChoice(LOTS);
      return {
        text: enonceLots(s, parBoite, boites),
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand des contenants reçoivent tous la même quantité, on multiplie.",
          "On pose la multiplication et on commence par les unités, en surveillant la retenue.",
          `${parBoite} × ${boites}. ${etapesPosee(parBoite, boites)}`,
          `Il y a ${total} ${s.objet[1]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_posee_tpl_6",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    hint: "Tout commence à droite : le chiffre des unités, multiplié par le nombre du bas.",
    tags: ["ce2", "multiplication", "posee", "retenue", "methode", "template"],
    generate: () => {
      // Le geste plutôt que le résultat : la colonne des unités, et sa retenue.
      let a = randomInt(13, 98);
      let b = randomInt(3, 9);
      while (((a % 10) * b) < 10) {
        a = randomInt(13, 98);
        b = randomInt(3, 9);
      }
      const u = a % 10;
      const prod = u * b;
      const P = tirePrenom();
      const intro = randomChoice([
        `On pose ${a} × ${b}.`,
        `${P.nom} pose la multiplication ${a} × ${b}.`,
        `Au tableau, la maîtresse pose ${a} × ${b}.`,
        `Pour calculer ${a} × ${b}, ${P.nom} pose l'opération.`,
      ]);
      const sorte = randomChoice(["retenue", "retenue", "unites", "premier"] as const);
      const question =
        sorte === "retenue"
          ? randomChoice([
              "Quelle retenue faut-il noter après avoir multiplié les unités ?",
              "Après le calcul des unités, quel nombre part en retenue ?",
            ])
          : sorte === "unites"
            ? randomChoice([
                "Quel chiffre écrit-on dans la colonne des unités du résultat ?",
                "Quel est le chiffre des unités du résultat ?",
              ])
            : randomChoice([
                "Combien vaut le premier produit à calculer, celui des unités ?",
                "Quel est le résultat de la toute première multiplication à faire ?",
              ]);
      const reponse = sorte === "retenue" ? Math.floor(prod / 10) : sorte === "unites" ? prod % 10 : prod;
      return {
        text: `${intro} ${question}`,
        format: "short",
        expected: [String(reponse)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une multiplication posée, on commence par les unités ; si le produit dépasse 9, ses dizaines passent en retenue.",
          `On multiplie le chiffre des unités de ${a}, le ${u}, par ${b}.`,
          etapesPosee(a, b),
          sorte === "retenue"
            ? `La retenue est ${reponse}.`
            : sorte === "unites"
              ? `Le chiffre des unités du résultat est ${reponse}.`
              : `Le premier produit vaut ${reponse}.`,
        ),
        canvas: calculPose({
          operation: "multiplication",
          numbers: [String(a), String(b)],
          result: String(a * b),
          display: { showResult: false, showRetenues: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_posee_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 4,
    // Ses trois décors étaient réunionnais ; seize décors variés désormais,
    // dont un seul à La Réunion : le thème redevient neutre.
    theme: "neutral",
    hint: "Un seul paquet, puis autant de paquets : c'est une multiplication.",
    tags: ["ce2", "multiplication", "posee", "probleme", "template"],
    generate: () => {
      const parBoite = randomInt(24, 96);
      const boites = randomInt(3, 8);
      const total = parBoite * boites;
      const s = randomChoice(LOTS);
      return {
        text: enonceLots(s, parBoite, boites),
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Quand des contenants reçoivent tous la même quantité, on multiplie.",
          "On pose la multiplication et on commence par les unités, en surveillant la retenue.",
          `${parBoite} × ${boites}. ${etapesPosee(parBoite, boites)}`,
          `Il y a ${total} ${s.objet[1]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_posee_tpl_7",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Refais la colonne des unités : que devient le chiffre des dizaines du produit ?",
    tags: ["ce2", "multiplication", "posee", "retenue", "piege", "qcm", "template"],
    generate: () => {
      // On tire jusqu'à avoir une vraie retenue aux unités.
      let a = randomInt(13, 98);
      let b = randomInt(3, 9);
      while (((a % 10) * b) < 10) {
        a = randomInt(13, 98);
        b = randomInt(3, 9);
      }
      const u = a % 10;
      const d = Math.floor(a / 10);
      const retenue = Math.floor((u * b) / 10);
      const produit = a * b;
      const oubli = b * d * 10 + ((u * b) % 10);
      const P = tirePrenom();
      const moment = randomChoice(MOMENTS);
      const text = randomChoice([
        `${moment}, ${P.nom} pose ${a} × ${b} et trouve ${oubli}. ${P.Il} a oublié la retenue. Quel est le bon résultat ?`,
        `${moment}, ${P.nom} calcule ${a} × ${b} en posant l'opération. ${P.Il} écrit ${oubli}, sans ajouter la retenue. Que fallait-il trouver ?`,
        `${moment}, ${P.nom} annonce ${a} × ${b} = ${oubli}. Quel est le résultat juste ?`,
        `${P.nom} a posé ${a} × ${b} et trouvé ${oubli}. La maîtresse entoure la colonne des dizaines. Quel résultat fallait-il écrire ?`,
        `Sur la feuille de ${P.nom}, on lit ${a} × ${b} = ${oubli} : la petite retenue n'est pas écrite. Corrige le résultat.`,
        `Le robot de la classe a posé ${a} × ${b} et affiche ${oubli}. Il a oublié une retenue. Quel est le vrai résultat ?`,
        `${P.nom} trouve ${oubli} pour ${a} × ${b}. ${P.Il} a bien écrit le chiffre des unités, mais a perdu la retenue. Que vaut ${a} × ${b} ?`,
        `Dans la correction, ${a} × ${b} = ${oubli} est barré en rouge. Quel est le bon produit ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(String(produit), [String(oubli), String(produit + 10), String(produit - b), String(produit + b)]),
        expected: [String(produit)],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand un produit dépasse 9, son chiffre des dizaines est une retenue : il rejoint le rang suivant.",
          "On écrit les unités du produit, on garde les dizaines en retenue, et on les ajoute au produit suivant.",
          `${etapesPosee(a, b)} Sans la retenue ${retenue}, on écrit ${b * d} au lieu de ${b * d + retenue} devant le ${(u * b) % 10} : c'est le ${oubli} trouvé.`,
          `${a} × ${b} = ${produit}.`,
        ),
        canvas: calculPose({
          operation: "multiplication",
          numbers: [String(a), String(b)],
          result: String(produit),
          retenues: [String(retenue)],
          display: { showResult: false, showRetenues: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_posee_tpl_8",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    hint: "Trois chiffres, trois colonnes : unités, dizaines, centaines, sans oublier les retenues.",
    tags: ["ce2", "multiplication", "posee", "trois_chiffres", "template", "canvas"],
    generate: () => {
      const a = randomInt(102, 989);
      const b = randomInt(2, 9);
      const produit = a * b;
      const s = randomChoice(GROS_LOTS);
      const raconte = Math.random() < 0.5;
      const P = tirePrenom();
      return {
        text: raconte
          ? randomChoice([
              `${s.fait(a)} ${s.demande(b)}`,
              `Pour son exposé, ${P.nom} a relevé ceci : ${s.fait(a).charAt(0).toLowerCase() + s.fait(a).slice(1)} ${s.demande(b)}`,
            ])
          : randomChoice([enonceProduit(a, b, true), `Pose et calcule ${a} × ${b}.`, `Pose l'opération ${a} × ${b}. Quel résultat trouves-tu ?`]),
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "On multiplie chaque chiffre en partant des unités ; quand un produit dépasse 9, ses dizaines passent en retenue.",
          "On avance colonne par colonne, de droite à gauche, en ajoutant la retenue au produit suivant.",
          etapesPosee(a, b),
          raconte ? `${a} × ${b} = ${produit} : cela fait ${produit} ${s.objet}.` : `${a} × ${b} = ${produit}.`,
        ),
        canvas: calculPose({
          operation: "multiplication",
          numbers: [String(a), String(b)],
          result: String(produit),
          display: { showResult: false, showRetenues: false },
        }),
      };
    },
  },

  // --- Par un nombre à DEUX chiffres -----------------------
  // Ici s'ouvre la deuxième ligne. Tout se joue sur son décalage.
  {
    kind: "fixed",
    id: "ce2_multiplication_posee_fixed_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève pose 24 × 13. Il calcule 3 × 24 = 72, puis 1 × 24 = 24, il additionne les deux lignes l'une sous l'autre et annonce 96. Où s'est-il trompé ?",
    format: "qcm",
    choices: [
      "le 1 de 13 compte des dizaines : sa ligne se décale d'un rang",
      "il a oublié une retenue",
      "il fallait commencer par le 1",
      "72 est faux, c'est 62",
    ],
    expected: ["le 1 de 13 compte des dizaines : sa ligne se décale d'un rang"],
    comparator: "mcq_exact",
    hint: "Dans 13, le 1 ne vaut pas 1. Il vaut 10.",
    explanation: exp(
      "Dans une multiplication posée par un nombre à deux chiffres, la deuxième ligne est décalée d'un rang vers la gauche.",
      "On multiplie d'abord par les unités du multiplicateur, puis par ses dizaines — et cette deuxième ligne démarre sous les dizaines, pas sous les unités.",
      "Ses deux calculs sont bons : 3 × 24 = 72 et 1 × 24 = 24. Mais le 1 de 13 vaut une dizaine : sa ligne, c'est 10 × 24 = 240, pas 24. Le total est 72 + 240 = 312, pas 96.",
      "Il n'a pas décalé la deuxième ligne : le résultat est 312.",
    ),
    tags: ["ce2", "multiplication", "posee", "deux_chiffres", "piege", "qcm", "canvas"],
    canvas: calculPose({
      operation: "multiplication",
      numbers: ["24", "13"],
      result: "312",
      display: { showResult: false, showRetenues: false },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_posee_fixed_5",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 4,
    theme: "neutral",
    text: "Quand on pose 32 × 14, pourquoi écrit-on un zéro au bout de la deuxième ligne ?",
    format: "qcm",
    choices: [
      "parce que le 1 de 14 vaut une dizaine : cette ligne, c'est 32 × 10",
      "pour que les deux lignes aient la même longueur",
      "parce qu'on termine toujours une multiplication par un zéro",
      "c'est une habitude d'écriture, on peut l'oublier",
    ],
    expected: ["parce que le 1 de 14 vaut une dizaine : cette ligne, c'est 32 × 10"],
    comparator: "mcq_exact",
    hint: "Ce zéro n'est pas là pour décorer : il dit quelque chose sur le rang.",
    explanation: exp(
      "Le zéro de la deuxième ligne marque le décalage d'un rang : il dit que cette ligne compte des dizaines.",
      "On regarde ce que vaut vraiment le chiffre par lequel on multiplie.",
      "Dans 14, le 1 vaut 10. La deuxième ligne n'est donc pas 1 × 32 = 32, mais 10 × 32 = 320. Le zéro écrit au bout, c'est ce ×10. Sans lui, on additionnerait 32 au lieu de 320.",
      "Le zéro dit que cette ligne, c'est 32 × 10.",
    ),
    tags: ["ce2", "multiplication", "posee", "deux_chiffres", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_posee_fixed_6",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 3,
    theme: "neutral",
    text: "On doit poser 16 × 548. Quelle disposition donne le moins de lignes à calculer ?",
    format: "qcm",
    choices: [
      "548 en haut et 16 en dessous",
      "16 en haut et 548 en dessous",
      "les deux donnent le même nombre de lignes",
      "on ne peut pas poser cette multiplication",
    ],
    expected: ["548 en haut et 16 en dessous"],
    comparator: "mcq_exact",
    hint: "Chaque chiffre du nombre du bas fabrique une ligne. Lequel en a le moins ?",
    explanation: exp(
      "Dans une multiplication posée, le nombre du bas fabrique une ligne par chiffre.",
      "On met donc en dessous celui qui a le moins de chiffres.",
      "Avec 16 en dessous : 2 chiffres, donc 2 lignes. Avec 548 en dessous : 3 chiffres, donc 3 lignes. Le résultat est le même — 16 × 548 = 548 × 16 — mais il y a une ligne de moins à écrire, et une occasion de moins de se tromper.",
      "On pose 548 en haut et 16 en dessous.",
    ),
    tags: ["ce2", "multiplication", "posee", "deux_chiffres", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_multiplication_posee_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux lignes : une pour les unités, une pour les dizaines. La seconde se décale.",
    tags: ["ce2", "multiplication", "posee", "deux_chiffres", "template", "canvas"],
    generate: () => {
      const a = randomInt(23, 98);
      const b = randomInt(12, 39);
      const u = b % 10;
      const d = Math.floor(b / 10);
      const produit = a * b;
      return {
        text: randomChoice([
          enonceProduit(a, b, true),
          enonceProduit(a, b, true),
          `Pose et calcule ${a} × ${b}.`,
          `Pose l'opération ${a} × ${b}, en deux lignes. Quel résultat trouves-tu ?`,
          `Calcule ${a} × ${b} en posant l'opération : n'oublie pas de décaler la deuxième ligne.`,
          `Pose ${a} × ${b} : une ligne pour les unités, une pour les dizaines. Quel est le total ?`,
          `Calcule ${a} × ${b} en posant l'opération en colonnes.`,
          `${tirePrenom().nom} pose ${a} × ${b} sur son cahier. Quel résultat doit-on trouver après l'addition des deux lignes ?`,
        ]),
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "Par un nombre à deux chiffres, la multiplication posée a deux lignes, et la seconde est décalée d'un rang.",
          "On multiplie par les unités, puis par les dizaines en décalant, puis on additionne les deux lignes.",
          `${u} × ${a} = ${a * u}. Puis ${d} dizaine${d > 1 ? "s" : ""} : ${d * 10} × ${a} = ${a * d * 10}. On additionne : ${a * u} + ${a * d * 10} = ${produit}.`,
          `${a} × ${b} = ${produit}.`,
        ),
        canvas: calculPose({
          operation: "multiplication",
          numbers: [String(a), String(b)],
          result: String(produit),
          display: { showResult: false, showRetenues: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_posee_tpl_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde ce que vaut vraiment le chiffre de gauche du nombre du bas.",
    tags: ["ce2", "multiplication", "posee", "deux_chiffres", "piege", "template"],
    generate: () => {
      const a = randomInt(23, 98);
      const b = randomInt(12, 39);
      const u = b % 10;
      const d = Math.floor(b / 10);
      const produit = a * b;
      const sansDecalage = a * u + a * d;
      const P = tirePrenom();
      const moment = randomChoice(MOMENTS);
      return {
        text: randomChoice([
          `${moment}, ${P.nom} pose ${a} × ${b}. ${P.Il} écrit ses deux lignes l'une sous l'autre, sans décaler la seconde, et trouve ${sansDecalage}. Quel est le bon résultat ?`,
          `${moment}, ${P.nom} calcule ${a} × ${b} et annonce ${sansDecalage}. ${P.Il} a oublié de décaler la deuxième ligne. Que fallait-il trouver ?`,
          `${moment}, ${P.nom} trouve ${a} × ${b} = ${sansDecalage}, car sa ligne des dizaines n'est pas décalée. Quel est le résultat juste ?`,
          `${P.nom} a posé ${a} × ${b} en deux lignes, mais la seconde commence sous les unités. ${P.Il} trouve ${sansDecalage}. Que fallait-il trouver ?`,
          `Le robot de la classe pose ${a} × ${b} sans décaler sa deuxième ligne et affiche ${sansDecalage}. Quel est le bon résultat ?`,
          `Sur la feuille de ${P.nom}, ${a} × ${b} = ${sansDecalage} : la deuxième ligne n'a pas été décalée d'une colonne. Corrige le résultat.`,
          `Dans la correction, ${a} × ${b} = ${sansDecalage} est barré en rouge : la ligne des dizaines n'était pas décalée. Quel est le bon produit ?`,
          `${P.nom} additionne ${a * u} et ${a * d} pour calculer ${a} × ${b}, et trouve ${sansDecalage}. Quel résultat aurait-${P.il} dû trouver ?`,
          `« ${a} × ${b} = ${sansDecalage} », dit ${P.nom}. Mais sa deuxième ligne n'est pas décalée. Quel est le produit exact ?`,
          `En posant ${a} × ${b}, ${P.nom} a aligné ses deux lignes à droite et trouve ${sansDecalage}. Quel est le bon résultat ?`,
          `Un calcul posé donne ${a} × ${b} = ${sansDecalage}, sans décalage de la deuxième ligne. Retrouve le résultat juste.`,
        ]),
        format: "qcm",
        choices: makeChoices(String(produit), [
          String(sansDecalage),
          String(produit + a),
          String(produit - a),
          String(produit + 10 * a),
        ]),
        expected: [String(produit)],
        comparator: "mcq_exact",
        explanation: exp(
          "La deuxième ligne d'une multiplication posée est décalée d'un rang : elle compte des dizaines.",
          "On reprend la ligne des dizaines à sa vraie valeur, puis on additionne.",
          `${u} × ${a} = ${a * u}, c'est juste. Mais le ${d} de ${b} vaut ${d * 10}, pas ${d} : sa ligne est ${d * 10} × ${a} = ${a * d * 10}, et non ${a * d}. Le total est ${a * u} + ${a * d * 10} = ${produit}.`,
          `${a} × ${b} = ${produit}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_multiplication_posee_tpl_9",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_posee",
    difficulty: 5,
    theme: "neutral",
    hint: "Pose le nombre à deux chiffres en dessous : deux lignes, la seconde décalée.",
    tags: ["ce2", "multiplication", "posee", "deux_chiffres", "probleme", "template", "canvas"],
    generate: () => {
      const a = randomInt(23, 98);
      const b = randomInt(12, 39);
      const u = b % 10;
      const d = Math.floor(b / 10);
      const produit = a * b;
      const s = randomChoice(LOTS);
      return {
        text: enonceLots(s, a, b),
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "Quand des contenants reçoivent tous la même quantité, on multiplie ; par un nombre à deux chiffres, la multiplication posée a deux lignes.",
          "On multiplie par les unités, puis par les dizaines en décalant d'un rang, puis on additionne les deux lignes.",
          `${a} × ${b} : ${u} × ${a} = ${a * u}. Puis ${d} dizaine${d > 1 ? "s" : ""} : ${d * 10} × ${a} = ${a * d * 10}. On additionne : ${a * u} + ${a * d * 10} = ${produit}.`,
          `Il y a ${produit} ${s.objet[1]}.`,
        ),
        canvas: calculPose({
          operation: "multiplication",
          numbers: [String(a), String(b)],
          result: String(produit),
          display: { showResult: false, showRetenues: false },
        }),
      };
    },
  },

  /* =========================================================
     CE2_MULTIPLICATION_VOCABULAIRE — facteur, produit, multiple
     Attendu du BO resté sans question. Les trois mots sont dans
     le texte, avec ses phrases : « Le produit de 3 et de 25 est
     75 », « 3 et 25 sont les facteurs de la multiplication
     3 × 25 », « 75 est un multiple de 25 ».
     LE PIÈGE : « multiple » n'est pas « multiplication ». 12 est
     un multiple de 3 parce qu'il est dans la table de 3 — ce
     n'est pas une opération, c'est ce qu'un nombre EST.
     Son cousin : donner le calcul au lieu du résultat. Le
     produit de 6 et de 7, c'est 42, pas « 6 × 7 ».
  ========================================================= */
  // ⚠️ « Quel est le produit de 6 et de 7 ? » était figé ici. C'est un calcul,
  // pas un cas remarquable, et le gabarit tpl_1 le tire déjà — avec les mêmes
  // pièges, la somme et le calcul recopié. Les trois `fixed` qui restent
  // gagnent leur place : deux phrases littérales du programme, et la
  // définition de « multiple ».
  {
    kind: "fixed",
    id: "ce2_multiplication_vocabulaire_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la multiplication 3 × 25, comment appelle-t-on 3 et 25 ?",
    format: "qcm",
    choices: ["les facteurs", "les termes", "les produits", "les multiples"],
    expected: ["les facteurs"],
    comparator: "mcq_exact",
    hint: "Le mot « terme » est réservé à l'addition et à la soustraction.",
    explanation: exp(
      "Les nombres qu'on multiplie s'appellent les facteurs ; leur résultat s'appelle le produit.",
      "On nomme d'abord ce qu'on multiplie, ensuite ce qu'on obtient.",
      "3 et 25 sont les facteurs de la multiplication 3 × 25. Le nombre 75 est le produit. « Terme » appartient à l'addition et à la soustraction.",
      "3 et 25 sont les facteurs.",
    ),
    tags: ["ce2", "multiplication", "vocabulaire", "facteur", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_vocabulaire_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    text: "Que veut dire « 12 est un multiple de 3 » ?",
    format: "qcm",
    choices: [
      "12 est dans la table de 3 : on a 3 × 4 = 12",
      "12 est une multiplication",
      "12 est plus grand que 3",
      "on peut multiplier 12 par 3",
    ],
    expected: ["12 est dans la table de 3 : on a 3 × 4 = 12"],
    comparator: "mcq_exact",
    hint: "« Multiple » n'est pas « multiplication ». Ce n'est pas une opération à faire, c'est ce que le nombre est déjà.",
    explanation: exp(
      "Un multiple d'un nombre est un résultat de sa table de multiplication.",
      "On cherche s'il existe un nombre entier qui, multiplié par 3, donne 12.",
      "3 × 4 = 12 : oui, 12 est un multiple de 3. On peut aussi dire que 12 est dans la table de 3. Attention, « multiple » n'est pas une opération : c'est ce qu'est le nombre. Et 12 est plus grand que 3 sans que cela ait le moindre rapport — 13 aussi, et 13 n'est pas un multiple de 3.",
      "12 est un multiple de 3 parce que 3 × 4 = 12.",
    ),
    tags: ["ce2", "multiplication", "vocabulaire", "multiple", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_vocabulaire_fixed_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Les nombres pairs sont les multiples de quel nombre ?",
    format: "qcm",
    choices: ["2", "1", "5", "10"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Un nombre pair se partage en deux parts égales.",
    explanation: exp(
      "Un nombre pair est un nombre qu'on peut partager en deux parts entières égales.",
      "On regarde la table qui donne exactement les nombres pairs.",
      "La table de 2 donne 2, 4, 6, 8, 10, 12… : ce sont tous les nombres pairs, et rien d'autre. Les nombres impairs, eux, ne sont pas des multiples de 2.",
      "Les nombres pairs sont les multiples de 2.",
    ),
    tags: ["ce2", "multiplication", "vocabulaire", "multiple", "parite", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_multiplication_vocabulaire_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le produit, c'est le résultat. Pas le calcul, pas la somme.",
    tags: ["ce2", "multiplication", "vocabulaire", "produit", "template"],
    generate: () => {
      const a = randomInt(3, 9);
      const b = randomInt(4, 25);
      const produit = a * b;
      const P = tirePrenom();
      const intro = randomChoice(["", "Vocabulaire. ", "Attention au mot. "]);
      const question = randomChoice([
        `Quel est le produit de ${a} et de ${b} ?`,
        `Calcule le produit de ${a} par ${b}.`,
        `Le produit de ${a} et de ${b}, c'est combien ?`,
        `Donne le produit des nombres ${a} et ${b}.`,
        `${P.nom} doit trouver le produit de ${a} et de ${b}. Que doit-${P.il} répondre ?`,
        `Quel nombre est le produit de ${a} par ${b} ?`,
        `${a} et ${b} sont les facteurs d'une multiplication. Quel est son produit ?`,
        `Que vaut le produit de ${a} et de ${b} ?`,
      ]);
      return {
        text: `${intro}${question}`,
        format: "qcm",
        choices: makeChoices(String(produit), [
          String(a + b),
          `${a} × ${b}`,
          String(produit + a),
          String(produit - a),
        ]),
        expected: [String(produit)],
        comparator: "mcq_exact",
        explanation: exp(
          "Le produit de deux nombres est le résultat de leur multiplication.",
          "On multiplie les deux facteurs et on donne le nombre trouvé.",
          `${a} × ${b} = ${produit}. La somme, elle, ferait ${a + b} : ce n'est pas ce qu'on demande. Et « ${a} × ${b} » est le calcul, pas la réponse.`,
          `Le produit de ${a} et de ${b} est ${produit}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_vocabulaire_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche celui qui tombe juste dans la table.",
    tags: ["ce2", "multiplication", "vocabulaire", "multiple", "template"],
    generate: () => {
      // On écarte 2 : les pièges « au voisinage » se recoupent quand le pas
      // vaut 2, et le QCM perdrait une ligne. La parité a son item fixe.
      const n = randomInt(3, 9);
      const k = randomInt(3, 9);
      const multiple = n * k;
      const s = randomChoice(GROUPES);
      const P = tirePrenom();
      return {
        text:
          Math.random() < 0.5
            ? randomChoice([
                `${cap(s.lieu)}, on veut faire des ${s.contenant[1]} de ${n} ${s.objet[1]}, sans qu'il en reste. Lequel de ces nombres ${de(s.objet[1])} convient ?`,
                `${cap(s.lieu)}, on ${s.verbe} ${n} ${s.objet[1]} ${s.prep} chaque ${s.contenant[0]}, et il ne reste rien à ranger. Combien ${de(s.objet[1])} peut-il y avoir en tout ?`,
              ])
            : randomChoice([
                `Lequel de ces nombres est un multiple de ${n} ?`,
                `Parmi ces nombres, lequel est un multiple de ${n} ?`,
                `Quel nombre est un multiple de ${n} ?`,
                `${P.nom} cherche un multiple de ${n}. Lequel doit-${P.il} choisir ?`,
                `Coche le seul multiple de ${n}.`,
                `Quel nombre est dans la table de ${n} ?`,
                `En comptant de ${n} en ${n} depuis 0, quel nombre va-t-on dire ?`,
                `Un seul de ces nombres est un multiple de ${n}. Lequel ?`,
              ]),
        format: "qcm",
        choices: makeChoices(String(multiple), [
          String(multiple + 1),
          String(multiple - 1),
          String(multiple + n + 1),
          String(multiple - n + 1),
        ]),
        expected: [String(multiple)],
        comparator: "mcq_exact",
        explanation: exp(
          `Un multiple de ${n} est un nombre qu'on obtient dans la table de ${n}.`,
          `On parcourt la table de ${n} et on cherche lequel des nombres proposés y tombe.`,
          `${n} × ${k} = ${multiple} : ${multiple} est bien un multiple de ${n}. Les trois autres tombent à côté de la table — juste à côté, mais à côté.`,
          `C'est ${multiple}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_vocabulaire_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Les nombres qu'on multiplie sont les facteurs ; le résultat est le produit.",
    tags: ["ce2", "multiplication", "vocabulaire", "facteur", "produit", "qcm", "template"],
    generate: () => {
      const a = randomInt(3, 9);
      let b = randomInt(4, 12);
      if (b === a) b = a + 1;
      const p = a * b;
      const P = tirePrenom();
      const intro = randomChoice([
        `Au tableau, on lit ${a} × ${b} = ${p}.`,
        `${P.nom} écrit l'égalité ${a} × ${b} = ${p}.`,
        `Dans son cahier, ${P.nom} a noté ${a} × ${b} = ${p}.`,
        `On sait que ${a} × ${b} = ${p}.`,
        `Voici une multiplication : ${a} × ${b} = ${p}.`,
      ]);
      const sorte = randomChoice(["nomProduit", "nomFacteur", "facteurs", "produit"] as const);
      const q =
        sorte === "nomProduit"
          ? {
              question: randomChoice([`Comment appelle-t-on le nombre ${p} ?`, `Quel nom donne-t-on à ${p} dans cette égalité ?`]),
              correct: "le produit",
              pieges: ["un facteur", "la somme", "un terme"],
              conclusion: `${p} est le produit.`,
            }
          : sorte === "nomFacteur"
            ? {
                question: randomChoice([`Comment appelle-t-on le nombre ${a} ?`, `Quel nom donne-t-on à ${a} dans cette égalité ?`]),
                correct: "un facteur",
                pieges: ["le produit", "un terme", "la différence"],
                conclusion: `${a} est un facteur.`,
              }
            : sorte === "facteurs"
              ? {
                  question: randomChoice(["Quels sont les facteurs de cette multiplication ?", "Quels nombres sont les facteurs ?"]),
                  correct: `${a} et ${b}`,
                  pieges: [`${p} seulement`, `${a} et ${p}`, `${b} et ${p}`],
                  conclusion: `Les facteurs sont ${a} et ${b}.`,
                }
              : {
                  question: randomChoice(["Quel est le produit ?", "Quel nombre est le produit dans cette égalité ?"]),
                  correct: String(p),
                  pieges: [String(a), String(b), String(a + b)],
                  conclusion: `Le produit est ${p}.`,
                };
      return {
        text: `${intro} ${q.question}`,
        format: "qcm",
        choices: makeChoices(q.correct, q.pieges),
        expected: [q.correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une multiplication, les nombres qu'on multiplie s'appellent les facteurs ; le résultat s'appelle le produit.",
          "On repère ce qui est multiplié, puis ce qui est obtenu.",
          `Dans ${a} × ${b} = ${p}, ${a} et ${b} sont les facteurs et ${p} est le produit. « Terme » et « somme » sont des mots de l'addition.`,
          q.conclusion,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_vocabulaire_tpl_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le produit est le résultat ; il manque un des nombres qu'on a multipliés.",
    tags: ["ce2", "multiplication", "vocabulaire", "facteur", "template"],
    generate: () => {
      const a = randomInt(3, 9);
      const k = randomInt(2, 10);
      const p = a * k;
      const P = tirePrenom();
      const intro = randomChoice(["", "Devinette. ", "Défi du jour. "]);
      const question = randomChoice([
        `Le produit de ${a} et d'un autre nombre est ${p}. Quel est cet autre nombre ?`,
        `${P.nom} multiplie ${a} par un nombre et obtient le produit ${p}. Quel est ce nombre ?`,
        `${a} est un facteur d'une multiplication dont le produit est ${p}. Quel est l'autre facteur ?`,
        `Le produit vaut ${p} et l'un des facteurs vaut ${a}. Quel est l'autre facteur ?`,
        `Complète avec le facteur qui manque : ${a} × … = ${p}.`,
        `Trouve le second facteur : le produit de ${a} et de ce facteur est ${p}.`,
      ]);
      return {
        text: `${intro}${question}`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: exp(
          "Les facteurs sont les nombres qu'on multiplie ; le produit est le résultat.",
          `On cherche, dans la table de ${a}, le nombre qui donne ${p}.`,
          `${a} × ${k} = ${p} : l'autre facteur est ${k}.`,
          `L'autre facteur est ${k}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_vocabulaire_tpl_5",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    hint: "Trois des nombres sont dans la table. Cherche l'intrus.",
    tags: ["ce2", "multiplication", "vocabulaire", "multiple", "intrus", "qcm", "template"],
    generate: () => {
      const n = randomInt(3, 9);
      // Trois multiples différents, et un intrus voisin d'un multiple.
      const ks = shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 4);
      const multiples = ks.slice(0, 3).map((k) => String(n * k));
      const intrus = n * ks[3] + randomChoice([1, -1, 2]);
      const s = randomChoice(GROUPES);
      const P = tirePrenom();
      const text =
        Math.random() < 0.5
          ? randomChoice([
              `${cap(s.lieu)}, on fait des ${s.contenant[1]} de ${n} ${s.objet[1]}. Avec lequel de ces nombres ${de(s.objet[1])} en restera-t-il ?`,
              `${cap(s.lieu)}, ${P.nom} veut mettre ${n} ${s.objet[1]} ${s.prep} chaque ${s.contenant[0]}, sans qu'il en reste. Lequel de ces nombres ${de(s.objet[1])} ne convient pas ?`,
            ])
          : randomChoice([
              `Lequel de ces nombres n'est PAS un multiple de ${n} ?`,
              `Parmi ces nombres, lequel n'est pas dans la table de ${n} ?`,
              `Trouve l'intrus : trois de ces nombres sont des multiples de ${n}, pas le quatrième. Lequel ?`,
              `${P.nom} a écrit des multiples de ${n}, mais s'est trompé${P.il === "elle" ? "e" : ""} une fois. Quel nombre n'est pas un multiple de ${n} ?`,
              `Quel nombre ne tombe pas juste dans la table de ${n} ?`,
              `En comptant de ${n} en ${n} depuis 0, quel nombre ne dira-t-on jamais ?`,
              `Un seul de ces nombres n'est pas un résultat de la table de ${n}. Lequel ?`,
            ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(String(intrus), multiples),
        expected: [String(intrus)],
        comparator: "mcq_exact",
        explanation: exp(
          `Un multiple de ${n} est un nombre qu'on obtient dans la table de ${n}.`,
          `On cherche chaque nombre dans la table de ${n}.`,
          `${ks.slice(0, 3).map((k) => `${n} × ${k} = ${n * k}`).join(", ")} : ces trois-là sont des multiples de ${n}. ${intrus} tombe entre deux résultats de la table.`,
          `L'intrus est ${intrus}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_vocabulaire_tpl_6",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_vocabulaire",
    difficulty: 4,
    theme: "neutral",
    hint: "Essaie chaque proposition : dans quelle table le nombre tombe-t-il juste ?",
    tags: ["ce2", "multiplication", "vocabulaire", "multiple", "qcm", "template"],
    generate: () => {
      const n = randomInt(3, 9);
      const k = randomInt(3, 9);
      const p = n * k;
      // Les pièges ne divisent pas p : un seul choix est juste.
      const pieges = [2, 3, 4, 5, 6, 7, 8, 9, 10].filter((x) => x !== n && p % x !== 0).map(String);
      const s = randomChoice(GROUPES);
      const P = tirePrenom();
      // Une fois sur deux, la question est racontée.
      const text =
        Math.random() < 0.5
          ? randomChoice([
              `${cap(s.lieu)}, on répartit ${p} ${s.objet[1]} en ${s.contenant[1]} identiques, sans qu'il en reste. Combien peut-il y en avoir ${s.prep} chaque ${s.contenant[0]} ?`,
              `${cap(s.lieu)}, ${P.nom} veut répartir ${p} ${s.objet[1]} sans reste, le même nombre ${s.prep} chaque ${s.contenant[0]}. Lequel de ces nombres peut-${P.il} mettre ${s.prep} chaque ${s.contenant[0]} ?`,
            ])
          : randomChoice([
              `${p} est un multiple de quel nombre ?`,
              `${p} est dans la table de quel nombre ?`,
              `De quel nombre ${p} est-il un multiple ?`,
              `Parmi ces nombres, lequel a ${p} dans sa table ?`,
              `Dans quelle table trouve-t-on ${p} ?`,
              `${p} tombe juste dans la table de quel nombre ?`,
              `${P.nom} dit que ${p} est un multiple d'un de ces nombres. Lequel ?`,
              `On peut écrire ${p} = … × un nombre entier. Quel nombre peut remplacer les points ?`,
            ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(String(n), pieges),
        expected: [String(n)],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre est un multiple de n s'il est dans la table de n.",
          "On cherche, parmi les nombres proposés, celui dont la table contient le nombre.",
          `${n} × ${k} = ${p} : ${p} est dans la table de ${n}. Les autres propositions ne tombent pas juste.`,
          `${p} est un multiple de ${n}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MULTIPLICATION_10_100 — multiplier par 10 ou par 100
     ⚠️ On refuse la recette « on ajoute un zéro ». Ce qui se
     passe, c'est que chaque chiffre MONTE d'un rang.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_multiplication_10_100_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 2,
    theme: "neutral",
    text: "Quand on multiplie un nombre entier par 10, que deviennent ses unités ?",
    format: "qcm",
    choices: [
      "elles deviennent des dizaines",
      "elles deviennent des centaines",
      "elles disparaissent",
      "elles ne changent pas",
    ],
    expected: ["elles deviennent des dizaines"],
    comparator: "mcq_exact",
    hint: "Dix fois plus grand, c'est une colonne plus à gauche.",
    explanation: exp(
      "Dans un nombre, chaque chiffre vaut selon sa colonne : unités, dizaines, centaines, milliers.",
      "Multiplier par 10, c'est rendre chaque chiffre dix fois plus grand : il monte d'une colonne.",
      "Pour 3 × 10 : 3 unités deviennent 3 dizaines : 30.",
      "Les unités deviennent des dizaines.",
    ),
    tags: ["ce2", "multiplication", "par_10", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_10_100_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 47 × 100 ?",
    format: "short",
    expected: ["4700"],
    comparator: "number_equal",
    hint: "Chaque chiffre monte de DEUX colonnes.",
    explanation: exp(
      "Dans un nombre, chaque chiffre vaut selon sa colonne : unités, dizaines, centaines, milliers.",
      "Multiplier par 100, c'est rendre chaque chiffre cent fois plus grand : il monte de deux colonnes.",
      "4 dizaines deviennent 4 milliers, 7 unités deviennent 7 centaines : 4700.",
      "47 × 100 = 4700.",
    ),
    tags: ["ce2", "multiplication", "par_100"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_10_100_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 4,
    theme: "neutral",
    text: "Combien font 10 × 10 ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Le 1 de 10 est une dizaine. Que devient-il, dix fois plus grand ?",
    explanation: exp(
      "Dans un nombre, chaque chiffre vaut selon sa colonne : unités, dizaines, centaines, milliers.",
      "Multiplier par 10, c'est rendre chaque chiffre dix fois plus grand : il monte d'une colonne.",
      "Dans 10, le 1 est une dizaine : 1 dizaine devient 1 centaine : 100. C'est ce que montre une plaque de cent carreaux, dix rangées de dix.",
      "10 × 10 = 100.",
    ),
    tags: ["ce2", "multiplication", "par_10", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_multiplication_10_100_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque chiffre monte d'une colonne par 10, de deux colonnes par 100.",
    tags: ["ce2", "multiplication", "par_10", "template"],
    generate: () => {
      const facteur = randomChoice([10, 100]);
      const n = facteur === 100 ? randomInt(2, 99) : randomInt(2, 999);
      const produit = n * facteur;
      const [a, b] = Math.random() < 0.3 ? [facteur, n] : [n, facteur];
      return {
        text: randomChoice([
          enonceProduit(a, b),
          enonceProduit(a, b),
          `Rends ${n} ${facteur === 10 ? "dix" : "cent"} fois plus grand. Quel nombre obtiens-tu ?`,
          `Quel nombre est ${facteur === 10 ? "dix" : "cent"} fois plus grand que ${n} ?`,
        ]),
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          DEF_COLONNES,
          methode10(facteur),
          calcul10(n, facteur),
          `${n} × ${facteur} = ${produit}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_10_100_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 4,
    theme: "neutral",
    hint: "De combien de colonnes les chiffres ont-ils monté ?",
    tags: ["ce2", "multiplication", "par_10", "template"],
    generate: () => {
      const facteur = randomChoice([10, 100]);
      const n = facteur === 100 ? randomInt(2, 99) : randomInt(2, 999);
      const produit = n * facteur;
      const P = tirePrenom();
      return {
        text: randomChoice([
          `Par combien faut-il multiplier ${n} pour obtenir ${produit} ?`,
          `Complète : ${n} × … = ${produit}`,
          `${P.nom} transforme ${n} en ${produit} avec une seule multiplication. Par quel nombre a-t-${P.il} multiplié ?`,
          `De ${n} à ${produit}, par combien a-t-on multiplié ?`,
          `Quel nombre manque ? ${n} × ? = ${produit}`,
          `${produit} est combien de fois plus grand que ${n} ?`,
          `On a multiplié ${n} par 10 ou par 100, et on a trouvé ${produit}. Par lequel ?`,
          `Les chiffres de ${n} sont devenus ${produit}. Par combien a-t-on multiplié ?`,
          `La machine à multiplier transforme ${n} en ${produit}. Multiplie-t-elle par 10 ou par 100 ?`,
          `${P.nom} écrit ${n}, puis ${produit}. De combien de colonnes les chiffres ont-ils monté ? Donne le nombre par lequel on a multiplié.`,
          `Quel est le facteur manquant : ${n} × … = ${produit} ?`,
          `${n} × 10 ou ${n} × 100 : lequel donne ${produit} ? Par quel nombre faut-il multiplier ?`,
        ]),
        format: "short",
        expected: [String(facteur)],
        comparator: "number_equal",
        explanation: exp(
          DEF_COLONNES,
          "Multiplier par 10, c'est rendre chaque chiffre dix fois plus grand : il monte d'une colonne. Par 100, il monte de deux colonnes. On compte les colonnes gagnées.",
          `${calcul10(n, facteur)} Chaque chiffre a monté de ${facteur === 10 ? "une colonne" : "deux colonnes"} : on a multiplié par ${facteur}.`,
          `Il faut multiplier par ${facteur}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_10_100_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 2,
    theme: "neutral",
    hint: "Des paquets de 10 ou de 100 : chaque chiffre monte d'une ou de deux colonnes.",
    tags: ["ce2", "multiplication", "par_10", "par_100", "probleme", "template"],
    generate: () => {
      const s = randomChoice(PAR_10_100);
      const n = randomInt(2, 99);
      const total = n * s.par;
      const lots = pl(n, s.lot);
      const P = tirePrenom();
      const text = randomChoice([
        `${cap(s.un)} ${s.lot[0]} contient ${s.par} ${s.objet}. Combien ${de(s.objet)} dans ${n} ${lots} ?`,
        `${P.nom} achète ${n} ${lots} de ${s.par} ${s.objet}. Combien ${de(s.objet)} rapporte-t-${P.il} ?`,
        `On réunit ${n} ${lots} de ${s.par} ${s.objet}. Quel est le nombre total ${de(s.objet)} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          `On multiplie le nombre de lots par ${s.par}. ${DEF_COLONNES}`,
          methode10(s.par),
          `${n} × ${s.par} : ${calcul10(n, s.par)}`,
          `Il y a ${total} ${s.objet}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_10_100_tpl_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais redescendre chaque chiffre d'une colonne (pour 10) ou de deux colonnes (pour 100).",
    tags: ["ce2", "multiplication", "par_10", "par_100", "facteur_manquant", "template"],
    generate: () => {
      const s = randomChoice(PAR_10_100);
      const n = randomInt(2, 99);
      const total = n * s.par;
      const P = tirePrenom();
      const raconte = Math.random() < 0.5;
      const text = raconte
        ? randomChoice([
            `Pour avoir ${total} ${s.objet}, combien ${de(s.lot[1])} de ${s.par} faut-il ?`,
            `${P.nom} a ${total} ${s.objet} et les range en ${s.lot[1]} de ${s.par}. Combien ${de(s.lot[1])} remplit-${P.il} ?`,
          ])
        : randomChoice([
            `Quel nombre multiplié par ${s.par} donne ${total} ?`,
            `Complète : … × ${s.par} = ${total}`,
            `${P.nom} pense à un nombre. Multiplié par ${s.par}, il donne ${total}. Quel est ce nombre ?`,
            `${total} est ${s.par === 10 ? "dix" : "cent"} fois plus grand qu'un nombre. Lequel ?`,
            `Quel nombre manque ? ? × ${s.par} = ${total}`,
            `La machine à multiplier par ${s.par} a affiché ${total}. Quel nombre y avait-on mis ?`,
            `Par quel nombre faut-il multiplier ${s.par} pour obtenir ${total} ?`,
          ]);
      return {
        text,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          `${methode10(s.par)} ${DEF_COLONNES}`,
          `On cherche le nombre dont les chiffres, une fois montés de ${s.par === 10 ? "une colonne" : "deux colonnes"}, donnent ${total}.`,
          `${n} × ${s.par} : ${calcul10(n, s.par)}`,
          raconte ? `Il faut ${n} ${pl(n, s.lot)}.` : `Le nombre cherché est ${n}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_10_100_tpl_5",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_10_100",
    difficulty: 4,
    theme: "neutral",
    hint: "Ne compte pas les zéros : regarde de combien de colonnes chaque chiffre monte.",
    tags: ["ce2", "multiplication", "par_10", "par_100", "vrai_faux", "piege", "qcm", "template"],
    generate: () => {
      const facteur = randomChoice([10, 100]);
      // Un nombre qui finit par 0, une fois sur deux : c'est là que la
      // recette « on ajoute un zéro » se perd.
      const n = Math.random() < 0.5 ? 10 * randomInt(2, 9) : facteur === 100 ? randomInt(12, 99) : randomInt(12, 999);
      const p = n * facteur;
      const q = affirmation(n, facteur, [p * 10, p / 10, n * (facteur === 10 ? 100 : 10), p + facteur, p + 1]);
      return {
        text: q.text,
        format: "qcm",
        choices: q.choices,
        expected: q.expected,
        comparator: "mcq_exact",
        explanation: exp(
          DEF_COLONNES,
          `${methode10(facteur)} On refait le calcul chiffre par chiffre, puis on compare.`,
          `${calcul10(n, facteur)} ${q.juste ? `Le résultat annoncé, ${q.w}, est le bon.` : `Le résultat annoncé, ${q.w}, est faux.`}`,
          q.juste ? `C'est juste : ${n} × ${facteur} = ${p}.` : `C'est faux : ${n} × ${facteur} = ${p}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MULTIPLICATION_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_multiplication_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Lequel est le plus grand : 25 × 4 ou 24 × 5 ?",
    format: "qcm",
    choices: ["24 × 5", "25 × 4", "ils sont égaux", "on ne peut pas savoir"],
    expected: ["24 × 5"],
    comparator: "mcq_exact",
    hint: "25 × 4, c'est un repère : quatre pièces de 25 centimes font 1 euro.",
    explanation: exp(
      "Enlever 1 à un facteur et l'ajouter à l'autre ne redonne pas le même produit.",
      "On calcule chacun des deux avec un appui connu, puis on compare.",
      "25 × 4 = 100 : c'est le repère des quatre pièces de 25 centimes. Et 24 × 5 = 120, car 24 × 5 vaut la moitié de 24 × 10 = 240. On compare 100 et 120.",
      "Le plus grand est 24 × 5.",
    ),
    tags: ["ce2", "multiplication", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_multiplication_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Une classe de 24 élèves part en sortie. Chaque élève emporte 2 bouteilles de 50 cL. Combien de litres d'eau la classe emporte-t-elle ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "Deux bouteilles de 50 cL, cela fait combien par élève ?",
    explanation: exp(
      "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce que porte un élève.",
      "On calcule la quantité par élève, puis on multiplie par le nombre d'élèves.",
      "2 × 50 cL = 100 cL, soit 1 L par élève. Puis 24 × 1 = 24 litres.",
      "La classe emporte 24 litres.",
    ),
    tags: ["ce2", "multiplication", "defi", "reunion", "deux_etapes"],
  },
  {
    kind: "template",
    id: "ce2_multiplication_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche d'abord le contenu d'un seul rang.",
    tags: ["ce2", "multiplication", "defi", "template"],
    generate: () => {
      // Trois étages emboîtés : des grands contenants, des rangs, des objets.
      const s = randomChoice([
        { grand: ["boîte", "boîtes"], v1: "a", ligne: ["rangée", "rangées"], v2: "a", objet: ["œuf", "œufs"] },
        { grand: ["immeuble", "immeubles"], v1: "a", ligne: ["étage", "étages"], v2: "a", objet: ["fenêtre", "fenêtres"] },
        { grand: ["tablette", "tablettes"], v1: "a", ligne: ["rangée", "rangées"], v2: "a", objet: ["carré", "carrés"] },
        { grand: ["salle de cinéma", "salles de cinéma"], v1: "compte", ligne: ["rangée", "rangées"], v2: "compte", objet: ["fauteuil", "fauteuils"] },
        { grand: ["train", "trains"], v1: "tire", ligne: ["wagon", "wagons"], v2: "a", objet: ["fenêtre", "fenêtres"] },
        { grand: ["armoire", "armoires"], v1: "a", ligne: ["étagère", "étagères"], v2: "porte", objet: ["classeur", "classeurs"] },
        { grand: ["jardin", "jardins"], v1: "a", ligne: ["allée", "allées"], v2: "est bordée de", objet: ["rosier", "rosiers"] },
        { grand: ["camion", "camions"], v1: "transporte", ligne: ["caisse", "caisses"], v2: "contient", objet: ["bouteille", "bouteilles"] },
        { grand: ["album", "albums"], v1: "a", ligne: ["page", "pages"], v2: "porte", objet: ["autocollant", "autocollants"] },
        { grand: ["carton", "cartons"], v1: "contient", ligne: ["paquet", "paquets"], v2: "contient", objet: ["biscuit", "biscuits"] },
        { grand: ["étagère", "étagères"], v1: "porte", ligne: ["bocal", "bocaux"], v2: "contient", objet: ["bonbon", "bonbons"] },
        { grand: ["parking", "parkings"], v1: "a", ligne: ["niveau", "niveaux"], v2: "a", objet: ["place", "places"] },
      ] as const);
      const r = randomInt(3, 9);
      const c = randomInt(3, 9);
      const k = randomInt(2, 5);
      const parGrand = r * c;
      const total = parGrand * k;
      const P = tirePrenom();
      const lignes = s.ligne[1];
      const objets = s.objet[1];
      const fem = ["boîte", "tablette", "salle de cinéma", "armoire", "étagère"].includes(s.grand[0]);
      const unSeul = fem ? `une seule ${s.grand[0]}` : `un seul ${s.grand[0]}`;
      const text = randomChoice([
        `Chaque ${s.grand[0]} ${s.v1} ${r} ${lignes}, et chaque ${s.ligne[0]} ${s.v2} ${c} ${objets}. Combien ${de(objets)} dans ${k} ${s.grand[1]} ?`,
        `${P.nom} regarde ${k} ${s.grand[1]} : ${r} ${lignes} par ${s.grand[0]}, ${c} ${objets} par ${s.ligne[0]}. Combien ${de(objets)} en tout ?`,
        `Il y a ${k} ${s.grand[1]}. Chaque ${s.grand[0]} ${s.v1} ${r} ${lignes} de ${c} ${objets}. Quel est le nombre total ${de(objets)} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          `Un problème à deux étapes se résout dans l'ordre : d'abord ${unSeul}, ensuite le tout.`,
          `On multiplie les ${lignes} par leur contenu, puis le résultat par le nombre ${de(s.grand[1])}.`,
          `Pour ${unSeul} : ${r} × ${c} = ${parGrand} ${objets}. Pour ${k} ${s.grand[1]} : ${parGrand} × ${k} = ${total}.`,
          `Il y a ${total} ${objets}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Décompose : le nombre rond d'abord, le reste ensuite.",
    tags: ["ce2", "multiplication", "defi", "template"],
    generate: () => {
      // 11 à 19, ou 21 à 29 : le nombre rond est 10 ou 20.
      const rond = randomChoice([10, 20]);
      const u = randomInt(1, 9);
      const n = rond + u;
      const b = randomInt(3, 9);
      const produit = n * b;
      const P = tirePrenom();
      const intro = randomChoice(["", "Calcul mental. ", "Sans poser. "]);
      const question = randomChoice([
        `Pour calculer ${n} × ${b} de tête, on décompose ${n} en ${rond} + ${u}. Combien font ${n} × ${b} ?`,
        `${P.nom} calcule ${n} × ${b} de tête en coupant ${n} en ${rond} et ${u}. Quel résultat trouve-t-${P.il} ?`,
        `Calcule ${n} × ${b} : pense à ${rond} × ${b}, puis à ${u} × ${b}.`,
        `${n} × ${b}, c'est ${rond} × ${b} plus ${u} × ${b}. Combien cela fait-il ?`,
        `Combien font ${n} × ${b} ? Astuce : ${n} = ${rond} + ${u}.`,
        `De tête : ${n} × ${b} = ? Commence par ${rond} × ${b}.`,
      ]);
      return {
        text: `${intro}${question}`,
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "Un nombre décomposé se multiplie morceau par morceau, puis on rassemble.",
          "On multiplie chaque morceau par le même nombre, puis on additionne les deux résultats.",
          `${rond} × ${b} = ${rond * b}, et ${u} × ${b} = ${u * b}. On additionne : ${rond * b} + ${u * b} = ${produit}.`,
          `${n} × ${b} = ${produit}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_defi_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule les deux produits avec un appui sûr, puis compare.",
    tags: ["ce2", "multiplication", "defi", "comparer", "qcm", "template"],
    generate: () => {
      const a = randomInt(11, 30);
      const b = randomChoice([2, 4, 6, 8]);
      // Trois cas : un facteur bouge d'un cran dans chaque sens, ou bien on
      // double l'un et on prend la moitié de l'autre — et là, c'est égal.
      const cas = randomChoice(["plus", "moins", "double"] as const);
      const [c, d] = cas === "plus" ? [a + 1, b - 1] : cas === "moins" ? [a - 1, b + 1] : [a * 2, b / 2];
      const A = `${a} × ${b}`;
      const B = `${c} × ${d}`;
      const pA = a * b;
      const pB = c * d;
      const correct = pA === pB ? "ils sont égaux" : pA > pB ? A : B;
      const P = tirePrenom();
      const intro = randomChoice(["", "Défi. ", "Sans te presser. "]);
      const question = randomChoice([
        `Lequel est le plus grand : ${A} ou ${B} ?`,
        `${P.nom} hésite entre ${A} et ${B}. Lequel donne le plus grand résultat ?`,
        `Compare ${A} et ${B}. Quel produit est le plus grand ?`,
      ]);
      const [premier, second] = Math.random() < 0.5 ? [A, B] : [B, A];
      return {
        text: `${intro}${question.replace(`${A} ou ${B}`, `${premier} ou ${second}`).replace(`${A} et ${B}`, `${premier} et ${second}`)}`,
        format: "qcm",
        choices: makeChoices(correct, [A, B, "ils sont égaux", "on ne peut pas savoir"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Enlever 1 à un facteur et l'ajouter à l'autre change le produit ; doubler l'un et prendre la moitié de l'autre ne le change pas.",
          "On calcule chacun des deux produits, puis on compare.",
          `${A} = ${pA} et ${B} = ${pB}. On compare ${pA} et ${pB}.`,
          correct === "ils sont égaux" ? `Ils sont égaux : ${pA} dans les deux cas.` : `Le plus grand est ${correct}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_multiplication_defi_tpl_4",
    niveau: "ce2",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce2_multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux achats, deux multiplications, puis une addition.",
    tags: ["ce2", "multiplication", "defi", "deux_etapes", "monnaie", "template"],
    generate: () => {
      const s = randomChoice([
        { lieu: "à la librairie", o1: "livres", o2: "magazines" },
        { lieu: "au marché", o1: "melons", o2: "ananas" },
        { lieu: "au magasin de sport", o1: "paires de chaussettes", o2: "ballons" },
        { lieu: "à la papeterie", o1: "classeurs", o2: "trousses" },
        { lieu: "au cinéma", o1: "places", o2: "boissons" },
        { lieu: "à la fête foraine", o1: "tours de manège", o2: "barbes à papa" },
        { lieu: "au musée", o1: "billets d'entrée", o2: "cartes postales" },
        { lieu: "chez le fleuriste", o1: "bouquets", o2: "plantes" },
        { lieu: "à la piscine", o1: "entrées", o2: "bonnets de bain" },
        { lieu: "au zoo", o1: "billets", o2: "glaces" },
        { lieu: "au magasin de jouets", o1: "puzzles", o2: "balles" },
        { lieu: "à la boulangerie", o1: "tartes", o2: "gâteaux" },
      ] as const);
      const a = randomInt(2, 9);
      const x = randomInt(2, 9);
      const b = randomInt(2, 9);
      const y = randomInt(2, 9);
      const total = a * x + b * y;
      const P = tirePrenom();
      const text = randomChoice([
        `${cap(s.lieu)}, ${P.nom} achète ${a} ${s.o1} à ${x} € pièce et ${b} ${s.o2} à ${y} € pièce. Combien paie-t-${P.il} en tout ?`,
        `${cap(s.lieu)}, on paie ${a} ${s.o1} à ${x} € pièce et ${b} ${s.o2} à ${y} € pièce. Quel est le prix total, en euros ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes se résout dans l'ordre : chaque achat d'abord, la somme ensuite.",
          "On multiplie la quantité par le prix pour chaque achat, puis on additionne les deux montants.",
          `${a} × ${x} = ${a * x} € et ${b} × ${y} = ${b * y} €. On additionne : ${a * x} + ${b * y} = ${total} €.`,
          `Le total est ${total} €.`,
        ),
      };
    },
  },
];
