// LES RÈGLES DE L'ORDRE, LES INÉQUATIONS AU COLLÈGE (06/11/2026).
//
// Maroc (2AC, 3AC), Sénégal (5e, 4e), Côte d'Ivoire (4e). Le BO du cycle 4
// (`docs/bo-maths-cycle4-recopie.md`) dit « Ordre sur les nombres rationnels » et « comparer,
// ranger, encadrer », mais ni les règles de l'ordre, ni les inéquations : notion masquée,
// voir `lib/tutor-v4/micros-masquees.ts`.
//
// ⛔ Sans intervalles : les solutions se décrivent par une inégalité (x ≤ 5). Coefficients
// simples : les solutions tombent juste, sauf dans les problèmes (« combien au plus ? »).
// ★1-★2 : phrase courte, sans contexte. Chaque formule a son paragraphe, à cause des 375 px.

import { entre, expliquer, melange, qcm, un } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import type { NumberLineCanvasData } from "@/lib/tutor-v4/types_canvas";
import { fabriqueInsecable } from "./outils-insecables";

const tpl = fabriqueInsecable("ordre_inequations", ["inégalité", "inéquation", "ordre"]);

const DEF_O = "ajouter ou soustraire un même nombre aux deux membres garde le sens de l’inégalité ; multiplier par un nombre positif le garde aussi ; multiplier par un nombre négatif le renverse.";
const DEF_I = "résoudre une inéquation, c’est trouver tous les nombres qui la rendent vraie. On ajoute, on soustrait, on divise comme pour une équation ; diviser par un nombre négatif renverse le sens.";

type Sym = "<" | "\\le" | ">" | "\\ge";
const SYMS: Sym[] = ["<", "\\le", ">", "\\ge"];
const INV: Record<Sym, Sym> = { "<": ">", "\\le": "\\ge", ">": "<", "\\ge": "\\le" };
const LETTRES: [string, string][] = [["a", "b"], ["x", "y"], ["m", "n"], ["u", "v"], ["p", "q"], ["r", "s"]];
const UNE = ["x", "x", "y", "t", "n"];

/** Un terme : 3a, −a, 3 × a. */
const fois = (k: number, v: string) => (k === 1 ? v : k === -1 ? `-${v}` : `${k}${v}`);
/** La constante d'une somme : « + 5 », « - 5 », rien. */
const plus = (c: number) => (c === 0 ? "" : c > 0 ? ` + ${c}` : ` - ${-c}`);
const expr = (k: number, v: string, c: number) => `${fois(k, v)}${plus(c)}`;

// « -3u + 4 ≥ -3v + / 4 » : le dernier terme ne part pas seul à la ligne. Une coupure reste possible ailleurs : entière, la formule élargissait le cadre de la bonne réponse (447 px).
const entiere = (f: string) => f.replace(/ ([+-]) (?!.* [+-] )/, " $1 \\nobreak ");
const ineg = (g: string, s: Sym, d: string | number) => `$${entiere(`${g} ${s} ${d}`)}$`;
const parag = (f: string) => `\n\n${f}\n\n`;

const nonNul = (a: number, b: number) => {
  const x = entre(a, b);
  return x === 0 ? b : x;
};

/* Les choix d'une inégalité à compléter : le bon sens, le mauvais, l'égalité, et un membre oublié. */
function choixRegle(g: string, d: string, sym: Sym, oubli: string) {
  const juste = ineg(g, sym, d);
  const faux = [ineg(g, INV[sym], d), `$${entiere(`${g} = ${d}`)}$`, ineg(g, sym, oubli)];
  return { juste, choices: qcm(juste, faux) };
}

const versLeBas = (s: Sym) => s === "<" || s === "\\le";

/* « g s val » est vraie. Les leurres ne le sont jamais : le sens inverse, ou une borne trop forte. */
function leurresBorne(g: string, s: Sym, val: number) {
  const e = entre(2, 6);
  const fort = versLeBas(s) ? val - e : val + e;
  const autre = versLeBas(s) ? val + entre(2, 6) : val - entre(2, 6);
  return [ineg(g, INV[s], val), ineg(g, s, fort), ineg(g, INV[s], autre)];
}

/* Le membre de droite d'un leurre : assez fort pour n'être jamais forcément vrai. */
const tropFort = (k: number, v: string, c: number, s: Sym) => {
  const e = entre(1, 6);
  return expr(k, v, versLeBas(s) ? c - e : c + e);
};

const INTRO_HYP = ["On sait que :", "Deux nombres vérifient :", "Voici une inégalité :", "Deux nombres sont tels que :"];
const FIN_HYP = ["Que peut-on en déduire ?", "Quelle inégalité est vraie ?", "Laquelle de ces inégalités est forcément vraie ?", "Quelle inégalité peut-on écrire ?"];
const hyp = (a: string, s: Sym, b: string) => `${un(INTRO_HYP)}${parag(ineg(a, s, b))}${un(FIN_HYP)}`;

const SOLUTION = ["Quelles sont les solutions ?", "Résous cette inéquation.", "Quelle phrase décrit ses solutions ?", "Que trouve-t-on pour les solutions ?"];
const INTRO_INEQ = ["Voici une inéquation :", "On veut résoudre :", "Résous l’inéquation :", "Soit l’inéquation :"];
const enonceIneq = (f: string, fins: readonly string[] = SOLUTION) => {
  const debut = un(INTRO_INEQ);
  return `${debut}${parag(f)}${debut.startsWith("Résous") ? un(fins.filter((x) => !x.startsWith("Résous"))) : un(fins)}`;
};

/* Les solutions : le bon sens et la bonne valeur, et trois erreurs qu'on voit vraiment. */
function choixSolutions(v: string, s: Sym, val: number, autre: number) {
  const juste = ineg(v, s, val);
  return { juste, choices: qcm(juste, [ineg(v, INV[s], val), ineg(v, s, autre), ineg(v, INV[s], autre)]) };
}

/* ★3 : une grandeur, une borne, un ajout. */
const GRANDEURS: { v: string; debut: (f: string) => string; plus: (n: number) => string; ensuite: string; n: [number, number]; c: [number, number]; moins?: boolean }[] = [
  { v: "T", debut: (f) => `Le matin, la température T d’une serre, en °C, vérifie :${parag(f)}`, plus: (n) => `À midi, il fait ${n} °C de plus.`, ensuite: "la température de midi", n: [12, 22], c: [3, 9] },
  { v: "t", debut: (f) => `Sans bouchons, la durée t d’un trajet, en minutes, vérifie :${parag(f)}`, plus: (n) => `Aux heures de pointe, il faut ${n} minutes de plus.`, ensuite: "la durée aux heures de pointe", n: [20, 45], c: [8, 25] },
  { v: "m", debut: (f) => `La masse m d’un colis, en kg, vérifie :${parag(f)}`, plus: (n) => `L’emballage ajoute ${n} kg de plus.`, ensuite: "la masse avec l’emballage", n: [4, 20], c: [1, 3] },
  { v: "h", debut: (f) => `La hauteur h d’une plante, en cm, vérifie :${parag(f)}`, plus: (n) => `Un mois plus tard, elle a ${n} cm de plus.`, ensuite: "sa hauteur un mois plus tard", n: [15, 60], c: [4, 12] },
  { v: "n", debut: (f) => `Le niveau n d’un lac, en cm, vérifie :${parag(f)}`, plus: (n) => `Après la sécheresse, il a ${n} cm de moins.`, ensuite: "le niveau après la sécheresse", n: [120, 300], c: [10, 60], moins: true },
  { v: "s", debut: (f) => `Le score s d’une joueuse vérifie :${parag(f)}`, plus: (n) => `Le dernier niveau lui donne ${n} points de plus.`, ensuite: "son score final", n: [40, 200], c: [10, 50] },
  { v: "c", debut: (f) => `Le temps c d’une coureuse, en secondes, vérifie :${parag(f)}`, plus: (n) => `Avec un meilleur départ, elle met ${n} secondes de moins.`, ensuite: "son nouveau temps", n: [50, 90], c: [2, 6], moins: true },
  { v: "b", debut: (f) => `La charge b d’une batterie, en %, vérifie :${parag(f)}`, plus: (n) => `Après une heure de vidéo, elle a ${n} % de moins.`, ensuite: "la charge après la vidéo", n: [50, 90], c: [8, 25], moins: true },
  { v: "p", debut: (f) => `Le nombre p de personnes dans une salle de concert vérifie :${parag(f)}`, plus: (n) => `Un groupe arrive : il y a ${n} personnes de plus.`, ensuite: "le nombre de personnes ensuite", n: [80, 400], c: [10, 50] },
  { v: "d", debut: (f) => `La longueur d d’une étape du sentier de Mafate, en km, vérifie :${parag(f)}`, plus: (n) => `Un détour fait ${n} km de plus.`, ensuite: "la longueur avec le détour", n: [6, 18], c: [1, 4] },
  { v: "v", debut: (f) => `Le volume v d’eau d’une cuve, en L, vérifie :${parag(f)}`, plus: (n) => `On y verse ${n} L de plus.`, ensuite: "le volume ensuite", n: [100, 400], c: [20, 80] },
  { v: "e", debut: (f) => `L’épaisseur e de la neige, en cm, vérifie :${parag(f)}`, plus: (n) => `Au soleil, elle fond : il y a ${n} cm de moins.`, ensuite: "l’épaisseur au soleil", n: [30, 120], c: [5, 20], moins: true },
];

const CADENCES: { v: string; hypo: (f: string) => string; ensuite: (k: number, g: string) => string; k: [number, number]; n: [number, number] }[] = [
  { v: "v", hypo: (f) => `Une cycliste roule à la vitesse v, en km/h, avec :${parag(f)}`, ensuite: (k, g) => `En ${k} heures, elle parcourt ${g} km.`, k: [2, 5], n: [18, 35] },
  { v: "d", hypo: (f) => `Une pompe a un débit d, en L par minute, avec :${parag(f)}`, ensuite: (k, g) => `En ${k} minutes, elle remplit ${g} L.`, k: [3, 12], n: [10, 50] },
  { v: "p", hypo: (f) => `Une imprimante sort p pages par minute, avec :${parag(f)}`, ensuite: (k, g) => `En ${k} minutes, elle sort ${g} pages.`, k: [3, 15], n: [8, 40] },
  { v: "m", hypo: (f) => `Une boîte a une masse m, en kg, avec :${parag(f)}`, ensuite: (k, g) => `Un lot de ${k} boîtes pèse ${g} kg.`, k: [4, 12], n: [2, 9] },
  { v: "c", hypo: (f) => `Une coureuse fait c tours de piste par heure, avec :${parag(f)}`, ensuite: (k, g) => `En ${k} heures, elle fait ${g} tours.`, k: [2, 4], n: [8, 16] },
  { v: "r", hypo: (f) => `Une abeille butine r fleurs par minute, avec :${parag(f)}`, ensuite: (k, g) => `En ${k} minutes, elle butine ${g} fleurs.`, k: [3, 10], n: [5, 20] },
  { v: "b", hypo: (f) => `Un batteur joue b coups par mesure, avec :${parag(f)}`, ensuite: (k, g) => `En ${k} mesures, il joue ${g} coups.`, k: [4, 16], n: [4, 12] },
  { v: "l", hypo: (f) => `Une planche mesure l dm de long, avec :${parag(f)}`, ensuite: (k, g) => `Bout à bout, ${k} planches font ${g} dm.`, k: [3, 8], n: [6, 25] },
  { v: "g", hypo: (f) => `Une tortue marine grossit de g kg par an, avec :${parag(f)}`, ensuite: (k, g) => `En ${k} ans, elle prend ${g} kg.`, k: [2, 9], n: [2, 8] },
  { v: "t", hypo: (f) => `Un tapis roulant avance de t m par minute, avec :${parag(f)}`, ensuite: (k, g) => `En ${k} minutes, il avance de ${g} m.`, k: [3, 10], n: [20, 60] },
];

const BAISSES: { v: string; hypo: (f: string, k: number) => string; ensuite: (g: string) => string; k: [number, number]; n: [number, number] }[] = [
  { v: "t", hypo: (f, k) => `Un sous-marin descend de ${k} m par minute pendant t minutes, avec :${parag(f)}`, ensuite: (g) => `Son altitude par rapport à la surface vaut ${g} m.`, k: [2, 9], n: [3, 15] },
  { v: "h", hypo: (f, k) => `La température d’un four qui refroidit baisse de ${k} °C par minute pendant h minutes, avec :${parag(f)}`, ensuite: (g) => `Sa température varie de ${g} °C.`, k: [3, 12], n: [4, 20] },
  { v: "j", hypo: (f, k) => `Le niveau d’un lac baisse de ${k} cm par jour pendant j jours, avec :${parag(f)}`, ensuite: (g) => `Son niveau varie de ${g} cm.`, k: [2, 6], n: [5, 30] },
  { v: "m", hypo: (f, k) => `Une spéléologue descend de ${k} m par minute pendant m minutes, avec :${parag(f)}`, ensuite: (g) => `Son altitude par rapport à l’entrée vaut ${g} m.`, k: [2, 8], n: [5, 25] },
  { v: "h", hypo: (f, k) => `Une batterie perd ${k} % par heure pendant h heures, avec :${parag(f)}`, ensuite: (g) => `Sa charge varie de ${g} %.`, k: [3, 9], n: [2, 8] },
  { v: "s", hypo: (f, k) => `Une plongeuse descend de ${k} m par minute pendant s minutes, avec :${parag(f)}`, ensuite: (g) => `Son altitude par rapport à la surface vaut ${g} m.`, k: [2, 7], n: [3, 12] },
  { v: "n", hypo: (f, k) => `Un glacier recule de ${k} m par an pendant n années, avec :${parag(f)}`, ensuite: (g) => `Sa longueur varie de ${g} m.`, k: [4, 20], n: [5, 30] },
  { v: "t", hypo: (f, k) => `Le réservoir d’un camion perd ${k} L par heure pendant t heures, avec :${parag(f)}`, ensuite: (g) => `Son volume varie de ${g} L.`, k: [8, 25], n: [2, 9] },
  { v: "x", hypo: (f, k) => `Un ascenseur de mine descend de ${k} m par seconde pendant x secondes, avec :${parag(f)}`, ensuite: (g) => `Son altitude par rapport à la surface vaut ${g} m.`, k: [2, 10], n: [10, 60] },
];

const BORNES: { v: string; nom: string; apres: (k: number, g: string) => string; bas: [number, number]; ecart: [number, number]; k: [number, number] }[] = [
  { v: "l", nom: "La largeur l d’une planche, en cm,", apres: (k, g) => `Côte à côte, ${k} planches font ${g} cm.`, bas: [8, 14], ecart: [1, 4], k: [3, 9] },
  { v: "t", nom: "La durée t d’un morceau de musique, en minutes,", apres: (k, g) => `Un album de ${k} morceaux de cette durée dure ${g} minutes.`, bas: [2, 6], ecart: [1, 3], k: [4, 12] },
  { v: "m", nom: "La masse m d’un paquet, en kg,", apres: (k, g) => `Une caisse de ${k} paquets a pour masse ${g} kg.`, bas: [2, 8], ecart: [1, 5], k: [3, 10] },
  { v: "h", nom: "La hauteur h d’une marche, en cm,", apres: (k, g) => `Un escalier de ${k} marches s’élève de ${g} cm.`, bas: [15, 18], ecart: [1, 3], k: [3, 15] },
  { v: "L", nom: "La longueur L d’un pas, en dm,", apres: (k, g) => `Une marche de ${k} pas couvre ${g} dm.`, bas: [5, 8], ecart: [1, 3], k: [10, 50] },
  { v: "v", nom: "La vitesse v d’un marcheur, en km/h,", apres: (k, g) => `En ${k} heures, il parcourt ${g} km.`, bas: [3, 5], ecart: [1, 2], k: [2, 6] },
  { v: "c", nom: "Le contenu c d’une gourde, en dL,", apres: (k, g) => `Les ${k} gourdes d’une équipe contiennent ${g} dL.`, bas: [5, 9], ecart: [1, 4], k: [5, 15] },
  { v: "r", nom: "Le temps r d’un relayeur, en secondes,", apres: (k, g) => `Une équipe de ${k} relayeurs met ${g} secondes.`, bas: [50, 60], ecart: [2, 6], k: [2, 4] },
];

/* b + a x ≤ c : ce qu'on a déjà, ce que coûte chaque unité, la limite. */
const LIMITES: { texte: (b: number, a: number, c: number) => string; q: string[]; a: [number, number]; b: [number, number]; c: [number, number] }[] = [
  { texte: (b, a, c) => `Un ascenseur porte déjà ${b} kg de matériel. Chaque carton pèse ${a} kg, et la charge maximale est de ${c} kg.`, q: ["Combien de cartons peut-on ajouter, au plus ?", "Quel est le plus grand nombre de cartons qu’on peut ajouter ?"], a: [15, 40], b: [60, 150], c: [400, 800] },
  { texte: (b, a, c) => `Une clé USB contient déjà ${b} Go. Chaque film occupe ${a} Go, et sa capacité est de ${c} Go.`, q: ["Combien de films peut-on ajouter, au plus ?", "Quel est le plus grand nombre de films qu’on peut y mettre encore ?"], a: [2, 5], b: [8, 25], c: [32, 64] },
  { texte: (b, a, c) => `Un sac de randonnée pèse ${b} kg à vide. Chaque gourde pleine pèse ${a} kg, et on ne veut pas dépasser ${c} kg.`, q: ["Combien de gourdes peut-on prendre, au plus ?", "Quel est le plus grand nombre de gourdes possible ?"], a: [1, 2], b: [3, 6], c: [9, 16] },
  { texte: (b, a, c) => `Un petit bateau embarque déjà ${b} kg de provisions. Chaque passager pèse ${a} kg en moyenne, et la limite est de ${c} kg.`, q: ["Combien de passagers peut-il embarquer, au plus ?", "Quel est le plus grand nombre de passagers possible ?"], a: [60, 90], b: [100, 300], c: [700, 1200] },
  { texte: (b, a, c) => `Une salle compte déjà ${b} places occupées. Chaque rangée de spectateurs ajoute ${a} personnes, et la jauge est de ${c} personnes.`, q: ["Combien de rangées peut-on encore remplir, au plus ?", "Quel est le plus grand nombre de rangées qu’on peut remplir ?"], a: [8, 20], b: [20, 80], c: [150, 300] },
  { texte: (b, a, c) => `Un drone pèse ${b} g sans charge. Chaque capteur pèse ${a} g, et il ne peut pas décoller au-delà de ${c} g.`, q: ["Combien de capteurs peut-il emporter, au plus ?", "Quel est le plus grand nombre de capteurs possible ?"], a: [40, 120], b: [500, 900], c: [1200, 2000] },
  { texte: (b, a, c) => `Un bassin contient ${b} L d’eau. Chaque seau y verse ${a} L, et il déborde au-delà de ${c} L.`, q: ["Combien de seaux peut-on verser, au plus, sans débordement ?", "Quel est le plus grand nombre de seaux possible sans débordement ?"], a: [8, 20], b: [50, 300], c: [400, 700] },
  { texte: (b, a, c) => `Une étagère porte déjà ${b} kg. Chaque dictionnaire pèse ${a} kg, et elle supporte ${c} kg au plus.`, q: ["Combien de dictionnaires peut-on ajouter, au plus ?", "Quel est le plus grand nombre de dictionnaires possible ?"], a: [2, 4], b: [5, 20], c: [30, 60] },
  { texte: (b, a, c) => `Un téléphérique emporte déjà ${b} kg de matériel. Chaque skieur pèse ${a} kg, et la charge maximale est de ${c} kg.`, q: ["Combien de skieurs peut-il prendre, au plus ?", "Quel est le plus grand nombre de skieurs possible ?"], a: [70, 95], b: [100, 300], c: [1000, 2000] },
  { texte: (b, a, c) => `Une mémoire de téléphone contient déjà ${b} Go. Chaque jeu occupe ${a} Go, et elle a ${c} Go en tout.`, q: ["Combien de jeux peut-on installer, au plus ?", "Quel est le plus grand nombre de jeux possible ?"], a: [2, 6], b: [20, 50], c: [64, 128] },
];

const OBJECTIFS: { texte: (b: number, a: number, c: number) => string; q: string[]; a: [number, number]; b: [number, number]; c: [number, number] }[] = [
  { texte: (b, a, c) => `Une équipe a déjà ${b} points. Une victoire rapporte ${a} points, et il en faut ${c} pour la qualification.`, q: ["Combien de victoires faut-il, au moins ?", "Quel est le plus petit nombre de victoires qui suffit ?"], a: [2, 5], b: [5, 25], c: [30, 60] },
  { texte: (b, a, c) => `Une lectrice a déjà lu ${b} pages. Elle en lit ${a} par jour, et son roman en compte ${c}.`, q: ["Combien de jours lui faut-il, au moins, pour finir ?", "Quel est le plus petit nombre de jours pour finir ?"], a: [15, 40], b: [20, 90], c: [250, 500] },
  { texte: (b, a, c) => `Un coureur a déjà fait ${b} km. Il ajoute ${a} km par sortie, et il vise ${c} km ce mois-ci.`, q: ["Combien de sorties faut-il, au moins ?", "Quel est le plus petit nombre de sorties qui suffit ?"], a: [4, 12], b: [10, 40], c: [80, 150] },
  { texte: (b, a, c) => `Une cuve contient ${b} L. Une pompe y verse ${a} L par minute, et on veut au moins ${c} L.`, q: ["Combien de minutes faut-il, au moins ?", "Quel est le plus petit nombre de minutes qui suffit ?"], a: [6, 20], b: [30, 120], c: [300, 600] },
  { texte: (b, a, c) => `Une plante mesure ${b} cm. Elle pousse de ${a} cm par semaine, et on la repique à partir de ${c} cm.`, q: ["Dans combien de semaines, au moins, peut-on la repiquer ?", "Quel est le plus petit nombre de semaines d’attente ?"], a: [2, 5], b: [4, 15], c: [30, 60] },
  { texte: (b, a, c) => `Un joueur a ${b} points d’expérience. Une mission en rapporte ${a}, et le niveau suivant en demande ${c}.`, q: ["Combien de missions faut-il, au moins ?", "Quel est le plus petit nombre de missions qui suffit ?"], a: [30, 90], b: [50, 300], c: [800, 1500] },
  { texte: (b, a, c) => `Un collectionneur a ${b} timbres. Il en reçoit ${a} par mois, et son album en demande ${c}.`, q: ["Combien de mois faut-il, au moins, pour le remplir ?", "Quel est le plus petit nombre de mois pour le remplir ?"], a: [5, 15], b: [30, 90], c: [200, 400] },
  { texte: (b, a, c) => `Une chorale compte ${b} choristes. Chaque concert en attire ${a} nouveaux, et elle en veut ${c} pour la grande scène.`, q: ["Combien de concerts faut-il, au moins ?", "Quel est le plus petit nombre de concerts qui suffit ?"], a: [2, 6], b: [10, 30], c: [50, 90] },
  { texte: (b, a, c) => `Une alpiniste est à ${b} m d’altitude. Elle monte de ${a} m par heure, et le sommet est à ${c} m.`, q: ["Combien d’heures faut-il, au moins, pour l’atteindre ?", "Quel est le plus petit nombre d’heures pour l’atteindre ?"], a: [200, 400], b: [1000, 2000], c: [3000, 4500] },
  { texte: (b, a, c) => `Un panneau solaire a déjà produit ${b} kWh. Il en produit ${a} par jour, et on en attend ${c}.`, q: ["Combien de jours faut-il, au moins ?", "Quel est le plus petit nombre de jours qui suffit ?"], a: [4, 12], b: [10, 50], c: [100, 250] },
];

const DESCENTES: { texte: (b: number, a: number, c: number) => string; q: string[]; a: [number, number]; b: [number, number]; c: [number, number] }[] = [
  { texte: (b, a, c) => `Une batterie est chargée à ${b} %. Elle perd ${a} % par heure, et elle doit rester à ${c} % au moins.`, q: ["Combien d’heures peut-elle tenir, au plus ?", "Quel est le plus grand nombre d’heures possible ?"], a: [6, 15], b: [70, 100], c: [10, 30] },
  { texte: (b, a, c) => `Une cuve contient ${b} L. Elle se vide de ${a} L par minute, et il doit rester ${c} L au moins.`, q: ["Combien de minutes peut-on la vider, au plus ?", "Quel est le plus grand nombre de minutes possible ?"], a: [5, 20], b: [200, 500], c: [20, 80] },
  { texte: (b, a, c) => `Une bougie mesure ${b} cm. Elle perd ${a} cm par heure, et on l’éteint à ${c} cm.`, q: ["Combien d’heures peut-elle brûler, au plus ?", "Quel est le plus grand nombre d’heures possible ?"], a: [1, 3], b: [15, 30], c: [2, 5] },
  { texte: (b, a, c) => `Un four est à ${b} °C. Il perd ${a} °C par minute, et le gâteau doit rester à ${c} °C au moins.`, q: ["Combien de minutes peut-on attendre, au plus ?", "Quel est le plus grand nombre de minutes possible ?"], a: [4, 12], b: [180, 240], c: [60, 100] },
  { texte: (b, a, c) => `Une plongeuse part avec ${b} bars d’air. Elle en utilise ${a} par minute, et elle remonte à ${c} bars.`, q: ["Combien de minutes peut-elle rester sous l’eau, au plus ?", "Quel est le plus grand nombre de minutes possible ?"], a: [3, 8], b: [180, 220], c: [40, 60] },
  { texte: (b, a, c) => `Un tas de sable fait ${b} m³. On en enlève ${a} m³ par heure, et il doit en rester ${c} m³.`, q: ["Combien d’heures peut-on en enlever, au plus ?", "Quel est le plus grand nombre d’heures possible ?"], a: [2, 6], b: [40, 90], c: [5, 15] },
  { texte: (b, a, c) => `Un lac a ${b} cm d’eau au repère. Il baisse de ${a} cm par semaine, et les bateaux ont besoin de ${c} cm.`, q: ["Combien de semaines peuvent-ils encore naviguer, au plus ?", "Quel est le plus grand nombre de semaines possible ?"], a: [3, 9], b: [120, 250], c: [40, 90] },
  { texte: (b, a, c) => `Un réservoir de moto contient ${b} L. Elle consomme ${a} L par heure, et on s’arrête à ${c} L.`, q: ["Combien d’heures peut-elle rouler, au plus ?", "Quel est le plus grand nombre d’heures possible ?"], a: [2, 4], b: [15, 25], c: [1, 3] },
  { texte: (b, a, c) => `Un glaçon de sculpture pèse ${b} kg. Il fond de ${a} kg par heure, et la sculpture tient jusqu’à ${c} kg.`, q: ["Combien d’heures peut-on l’exposer, au plus ?", "Quel est le plus grand nombre d’heures possible ?"], a: [3, 8], b: [60, 120], c: [15, 30] },
  { texte: (b, a, c) => `Un rouleau contient ${b} m de tissu. Une couturière en coupe ${a} m par robe, et elle garde ${c} m en réserve.`, q: ["Combien de robes peut-elle couper, au plus ?", "Quel est le plus grand nombre de robes possible ?"], a: [2, 5], b: [40, 90], c: [3, 10] },
];

const MOTS: [string, number][] = [["Le double", 2], ["Le triple", 3], ["Le quadruple", 4], ["Le quintuple", 5]];
const COMPARE: [string, Sym][] = [["est inférieur ou égal à", "\\le"], ["est au plus égal à", "\\le"], ["est strictement inférieur à", "<"], ["est supérieur ou égal à", "\\ge"], ["est au moins égal à", "\\ge"], ["est strictement supérieur à", ">"]];
const PROGRAMMES = ["On note x un nombre.", "Une joueuse pense à un nombre x.", "Un programme de calcul part d’un nombre x.", "Un magicien demande de choisir un nombre x.", "Sur un tableur, une cellule contient un nombre x."];

/** Les trois tirages de ★3 : une limite atteinte sans tomber juste à chaque fois. */
const tirageABC = (o: { a: [number, number]; b: [number, number]; c: [number, number] }) => ({ a: entre(o.a[0], o.a[1]), b: entre(o.b[0], o.b[1]), c: entre(o.c[0], o.c[1]) });

export const ordreInequationsBank = [
  /* ===== LES RÈGLES ===== */

  tpl("ordre_regles", 1, 1, "Ajouter ou soustraire un même nombre aux deux membres garde le sens.", () => {
    const [a, b] = un(LETTRES);
    const s = un(SYMS);
    const c = un([-1, 1]) * entre(1, 15);
    const { juste, choices } = choixRegle(expr(1, a, c), expr(1, b, c), s, tropFort(1, b, c, s));
    return { text: hyp(a, s, b), format: "qcm", choices, expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_O, c > 0 ? `on ajoute ${c} aux deux membres.` : `on soustrait ${-c} aux deux membres.`, "le sens ne change pas.", juste) };
  }),

  tpl("ordre_regles", 2, 1, "Multiplier par un nombre positif garde le sens.", () => {
    const [a, b] = un(LETTRES);
    const s = un(SYMS);
    const k = entre(2, 12);
    const { juste, choices } = choixRegle(fois(k, a), fois(k, b), s, tropFort(k, b, 0, s));
    return { text: hyp(a, s, b), format: "qcm", choices, expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_O, `on multiplie les deux membres par ${k}, qui est positif.`, "le sens ne change pas.", juste) };
  }),

  tpl("ordre_regles", 3, 1, "Multiplier par un nombre négatif renverse le sens.", () => {
    const [a, b] = un(LETTRES);
    const s = un(SYMS);
    const k = -entre(2, 12);
    const { juste, choices } = choixRegle(fois(k, a), fois(k, b), INV[s], tropFort(k, b, 0, INV[s]));
    return { text: hyp(a, s, b), format: "qcm", choices, expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_O, `on multiplie les deux membres par ${k}, qui est négatif.`, "le sens se renverse.", juste) };
  }),

  tpl("ordre_regles", 4, 1, "Calcule les deux membres, puis compare les nombres obtenus.", () => {
    const x = nonNul(-9, 9);
    const y = x + entre(1, 9);
    const [g, d, s]: [number, number, Sym] = Math.random() < 0.5 ? [x, y, "<"] : [y, x, ">"];
    const op = un([
      { dit: (k: number) => `On ajoute ${k} aux deux membres.`, f: (n: number, k: number) => n + k, k: entre(2, 12) },
      { dit: (k: number) => `On soustrait ${k} aux deux membres.`, f: (n: number, k: number) => n - k, k: entre(2, 12) },
      { dit: (k: number) => `On multiplie les deux membres par ${k}.`, f: (n: number, k: number) => n * k, k: entre(2, 6) },
      { dit: (k: number) => `On multiplie les deux membres par −${k}.`, f: (n: number, k: number) => -n * k, k: entre(2, 6) },
    ]);
    const [g2, d2] = [op.f(g, op.k), op.f(d, op.k)];
    const vrai: Sym = g2 < d2 ? "<" : ">";
    const juste = `$${g2} ${vrai} ${d2}$`;
    const text = `${un(["On part de :", "Voici une inégalité juste :", "On sait bien que :", "Prenons :"])}${parag(`$${g} ${s} ${d}$`)}${op.dit(op.k)} ${un(["Quelle inégalité obtient-on ?", "Qu’écrit-on alors ?", "Quelle inégalité est juste ?"])}`;
    return { text, format: "qcm", choices: qcm(juste, [`$${g2} ${INV[vrai]} ${d2}$`, `$${g2} = ${d2}$`]), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_O, "on calcule chaque membre.", `on obtient ${g2} et ${d2}.`, juste) };
  }),

  tpl("ordre_regles", 5, 2, "Deux étapes : d’abord le produit (attention au signe), puis l’ajout.", () => {
    const [a, b] = un(LETTRES);
    const s = un(SYMS);
    const k = un([-1, 1]) * entre(2, 9);
    const c = un([-1, 1]) * entre(1, 15);
    const sens = k > 0 ? s : INV[s];
    const { juste, choices } = choixRegle(expr(k, a, c), expr(k, b, c), sens, tropFort(k, b, c, sens));
    return { text: hyp(a, s, b), format: "qcm", choices, expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_O, `on multiplie par ${k}${k < 0 ? ", négatif : le sens se renverse" : ", positif : le sens reste"}, puis on ajoute ${c}.`, "ajouter ne change pas le sens.", juste) };
  }),

  tpl("ordre_regles", 6, 2, "Soustraire a, c’est multiplier a par −1 : le sens se renverse.", () => {
    const [a, b] = un(LETTRES);
    const s = un(SYMS);
    const c = entre(2, 20);
    const k = un([1, 1, 2, 3, 5]);
    const g = `${c} - ${k === 1 ? a : `${k}${a}`}`;
    const d = `${c} - ${k === 1 ? b : `${k}${b}`}`;
    const { juste, choices } = choixRegle(g, d, INV[s], String(c));
    return { text: hyp(a, s, b), format: "qcm", choices, expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_O, `${g} contient −${k === 1 ? "" : k}${a} : on a multiplié par un nombre négatif.`, "le sens se renverse.", juste) };
  }),

  tpl("ordre_regles", 7, 2, "Applique aux deux membres la même opération que dans le choix.", () => {
    const v = un(UNE);
    const s = un(SYMS);
    const n = nonNul(-9, 12);
    const k = un([1, 1, 2, 3, 4, -1, -2, -3]);
    const c = k === 1 ? nonNul(-9, 12) : un([0, 0, nonNul(-9, 12)]);
    const sens = k > 0 ? s : INV[s];
    const val = k * n + c;
    const g = expr(k, v, c);
    const juste = ineg(g, sens, val);
    const text = `${un(["On sait que :", "Un nombre vérifie :", "Voici une inégalité :", "On a :"])}${parag(ineg(v, s, n))}${un(FIN_HYP)}`;
    return { text, format: "qcm", choices: qcm(juste, leurresBorne(g, sens, val)), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_O, k < 0 ? `on multiplie par ${k}, négatif : le sens se renverse.` : "on garde le sens.", `${k} × ${n}${plus(c)} = ${val}.`, juste) };
  }),

  tpl("ordre_regles", 8, 2, "Un seul choix respecte la règle du signe.", () => {
    const [a, b] = un(LETTRES);
    const s = un(SYMS);
    const op = melange([
      { k: 1, c: entre(2, 9) },
      { k: entre(2, 6), c: 0 },
      { k: -entre(2, 6), c: 0 },
      { k: -1, c: 0 },
      { k: 1, c: -entre(2, 9) },
      { k: -entre(2, 4), c: entre(1, 9) },
    ]).slice(0, 4);
    const faireSens = (o: { k: number }, bon: boolean) => (bon === o.k > 0 ? s : INV[s]);
    const liste = op.map((o, i) => ineg(expr(o.k, a, o.c), faireSens(o, i === 0), expr(o.k, b, o.c)));
    const text = `${un(["On sait que :", "Deux nombres vérifient :", "Voici une inégalité :"])}${parag(ineg(a, s, b))}${un(["Laquelle de ces inégalités est juste ?", "Une seule de ces inégalités est forcément vraie. Laquelle ?", "Trouve la seule inégalité forcément vraie."])}`;
    return { text, format: "qcm", choices: melange(liste), expected: [liste[0]], comparator: "mcq_exact", explanation: expliquer(DEF_O, "on regarde le signe du nombre qui multiplie.", "négatif : le sens se renverse ; positif ou simple ajout : il reste.", liste[0]) };
  }),

  tpl("ordre_regles", 9, 3, "Ajouter ou enlever la même quantité garde le sens de l’inégalité.", () => {
    const o = un(GRANDEURS);
    const s = un(SYMS);
    const n = entre(o.n[0], o.n[1]);
    const c = entre(o.c[0], o.c[1]);
    const dc = o.moins ? -c : c;
    const g = expr(1, o.v, dc);
    const juste = ineg(g, s, n + dc);
    const text = `${o.debut(ineg(o.v, s, n))}${o.plus(c)} ${un([`Que peut-on écrire pour ${o.ensuite} ?`, `Quelle inégalité vérifie ${o.ensuite} ?`, `Quelle inégalité décrit ${o.ensuite} ?`])}`;
    return { text, format: "qcm", choices: qcm(juste, leurresBorne(g, s, n + dc)), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_O, "la même quantité change les deux membres.", `${n}${plus(dc)} = ${n + dc}.`, juste) };
  }),

  tpl("ordre_regles", 10, 3, "Multiplier les deux membres par un nombre positif garde le sens.", () => {
    const o = un(CADENCES);
    const s = un(SYMS);
    const n = entre(o.n[0], o.n[1]);
    const k = entre(o.k[0], o.k[1]);
    const g = fois(k, o.v);
    const juste = ineg(g, s, k * n);
    const text = `${o.hypo(ineg(o.v, s, n))}${o.ensuite(k, `$${g}$`)} ${un(["Quelle inégalité peut-on écrire ?", "Que peut-on en déduire ?", "Que sait-on de cette quantité ?"])}`;
    return { text, format: "qcm", choices: qcm(juste, leurresBorne(g, s, k * n)), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_O, `on multiplie les deux membres par ${k}, positif.`, `${k} × ${n} = ${k * n}.`, juste) };
  }),

  tpl("ordre_regles", 11, 3, "Une baisse, c’est multiplier par un nombre négatif : le sens se renverse.", () => {
    const o = un(BAISSES);
    const s = un(SYMS);
    const n = entre(o.n[0], o.n[1]);
    const k = entre(o.k[0], o.k[1]);
    const g = fois(-k, o.v);
    const juste = ineg(g, INV[s], -k * n);
    const text = `${o.hypo(ineg(o.v, s, n), k)}${o.ensuite(`$${g}$`)} ${un(["Quelle inégalité peut-on écrire ?", "Que peut-on en déduire ?", "Que sait-on de cette quantité ?"])}`;
    return { text, format: "qcm", choices: qcm(juste, leurresBorne(g, INV[s], -k * n)), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_O, `on multiplie les deux membres par −${k}, négatif : le sens se renverse.`, `−${k} × ${n} = ${-k * n}.`, juste) };
  }),

  tpl("ordre_regles", 12, 3, "Applique la même opération aux trois membres de l’encadrement.", () => {
    const o = un(BORNES);
    const bas = entre(o.bas[0], o.bas[1]);
    const haut = bas + entre(o.ecart[0], o.ecart[1]);
    const k = entre(o.k[0], o.k[1]);
    const g = fois(k, o.v);
    const f = (l: number, h: number) => `$${l} \\le ${g} \\le ${h}$`;
    const juste = f(k * bas, k * haut);
    const text = `${o.nom} vérifie :${parag(`$${bas} \\le ${o.v} \\le ${haut}$`)}${o.apres(k, `$${g}$`)} ${un(["Quel encadrement peut-on écrire ?", "Comment encadrer cette quantité ?", "Quel encadrement est juste ?"])}`;
    return { text, format: "qcm", choices: qcm(juste, [f(bas, haut), f(k * bas, haut), f(bas + k, haut + k)]), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_O, `on multiplie les trois membres par ${k}, positif : les sens restent.`, `${k} × ${bas} = ${k * bas} et ${k} × ${haut} = ${k * haut}.`, juste) };
  }),

  /* ===== LES INÉQUATIONS ===== */

  tpl("inequation_college", 1, 1, "On enlève ou on ajoute le même nombre des deux côtés : le sens reste.", () => {
    const v = un(UNE);
    const s = un(SYMS);
    const a = entre(1, 15);
    const b = nonNul(-12, 25);
    const forme = un([
      { g: `${v} + ${a}`, val: b - a, autre: b + a },
      { g: `${a} + ${v}`, val: b - a, autre: b + a },
      { g: `${v} - ${a}`, val: b + a, autre: b - a },
    ]);
    const { juste, choices } = choixSolutions(v, s, forme.val, forme.autre);
    return { text: enonceIneq(ineg(forme.g, s, b)), format: "qcm", choices, expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_I, "on isole l’inconnue en faisant la même chose des deux côtés.", `la valeur limite est ${forme.val}, et le sens reste.`, juste) };
  }),

  tpl("inequation_college", 2, 1, "On divise par un nombre positif : le sens reste.", () => {
    const v = un(UNE);
    const s = un(SYMS);
    const a = entre(2, 9);
    const q = nonNul(-9, 12);
    const b = a * q;
    const { juste, choices } = choixSolutions(v, s, q, b - a === q ? b + a : b - a);
    return { text: enonceIneq(ineg(fois(a, v), s, b)), format: "qcm", choices, expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_I, `on divise les deux membres par ${a}, positif.`, `${b < 0 ? `(−${-b})` : b} ÷ ${a} = ${q}.`, juste) };
  }),

  tpl("inequation_college", 3, 1, "Remplace l’inconnue par chaque nombre, et vérifie l’inégalité.", () => {
    const v = un(UNE);
    const haut = Math.random() < 0.5;
    const s: Sym = haut ? un(["<", "\\le"] as Sym[]) : un([">", "\\ge"] as Sym[]);
    const a = un([1, 2, 3, 4]);
    const c = a === 1 ? entre(1, 9) : un([0, entre(1, 9)]);
    const sol = entre(-3, 9);
    const b = a * sol + c;
    // La limite elle-même est solution si l'inégalité est large : on écarte ce cas des leurres.
    const justeNb = haut ? sol - entre(1, 4) : sol + entre(1, 4);
    const faux = haut ? [sol + 1, sol + 2, sol + entre(3, 6)] : [sol - 1, sol - 2, sol - entre(3, 6)];
    const texteNb = (n: number) => (n < 0 ? `−${-n}` : String(n));
    const f = ineg(expr(a, v, c), s, b);
    const text = `${un(["Voici une inéquation :", "On regarde l’inéquation :", "Soit l’inéquation :"])}${parag(f)}${un(["Lequel de ces nombres est solution ?", "Quel nombre est une solution ?", "Parmi ces nombres, lequel est solution ?", "Trouve la solution parmi ces nombres."])}`;
    return { text, format: "qcm", choices: melange([justeNb, ...faux].map(texteNb)), expected: [texteNb(justeNb)], comparator: "mcq_exact", explanation: expliquer(DEF_I, "on remplace l’inconnue par chaque nombre.", `pour ${texteNb(justeNb)}, l’inégalité est vraie.`, `${texteNb(justeNb)} est solution.`) };
  }),

  tpl("inequation_college", 4, 1, "Résous d’abord, puis cherche l’entier le plus proche de la limite. Attention au strict.", () => {
    const v = un(UNE);
    const haut = Math.random() < 0.5;
    const s: Sym = haut ? un(["<", "\\le"] as Sym[]) : un([">", "\\ge"] as Sym[]);
    const a = entre(1, 12);
    const val = entre(3, 20);
    const g = un([`${v} + ${a}`, `${a} + ${v}`]);
    const b = val + a;
    const rep = s === "<" ? val - 1 : s === ">" ? val + 1 : val;
    const text = `${un(["Voici une inéquation :", "On regarde l’inéquation :", "Soit l’inéquation :"])}${parag(ineg(g, s, b))}${haut ? un(["Quel est le plus grand nombre entier solution ?", "Quel est le plus grand entier qui convient ?", "Donne le plus grand entier solution."]) : un(["Quel est le plus petit nombre entier solution ?", "Quel est le plus petit entier qui convient ?", "Donne le plus petit entier solution."])}`;
    return { text, format: "short", expected: [String(rep)], comparator: "number_equal", explanation: expliquer(DEF_I, "on isole l’inconnue.", `la limite est ${val}${s === "<" || s === ">" ? ", et elle n’est pas comprise" : ", et elle est comprise"}.`, `c’est ${rep}.`) };
  }),

  tpl("inequation_college", 5, 2, "Deux étapes : d’abord le nombre seul, puis on divise.", () => {
    const v = un(UNE);
    const s = un(SYMS);
    const a = entre(2, 9);
    const c = un([-1, 1]) * entre(1, 15);
    const q = nonNul(-8, 12);
    const b = a * q + c;
    const g = un([expr(a, v, c), ...(c > 0 ? [`${c} + ${fois(a, v)}`] : [])]);
    const autre = (b + c) / a === q || !Number.isInteger((b + c) / a) ? q + un([-2, 2, 3]) : (b + c) / a;
    const { juste, choices } = choixSolutions(v, s, q, autre);
    return { text: enonceIneq(ineg(g, s, b)), format: "qcm", choices, expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_I, `on ${c > 0 ? `soustrait ${c}` : `ajoute ${-c}`}, puis on divise par ${a}, positif.`, `$${fois(a, v)} ${s} ${a * q}$, puis la limite est ${q}.`, juste) };
  }),

  tpl("inequation_college", 6, 2, "On divise par un nombre négatif : le sens se renverse.", () => {
    const v = un(UNE);
    const s = un(SYMS);
    const a = entre(2, 9);
    const q = nonNul(-9, 12);
    const b = -a * q;
    const { juste, choices } = choixSolutions(v, INV[s], q, -q);
    return { text: enonceIneq(ineg(fois(-a, v), s, b)), format: "qcm", choices, expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_I, `on divise les deux membres par −${a}, négatif : le sens se renverse.`, `la limite est ${q}.`, juste) };
  }),

  tpl("inequation_college", 7, 2, "Enlève d’abord le nombre seul. Puis, en divisant par un négatif, renverse le sens.", () => {
    const v = un(UNE);
    const s = un(SYMS);
    const a = entre(2, 7);
    const c = entre(1, 15);
    const q = nonNul(-8, 10);
    const b = c - a * q;
    const g = un([`${c} - ${fois(a, v)}`, `${fois(-a, v)} + ${c}`]);
    const { juste, choices } = choixSolutions(v, INV[s], q, -q);
    return { text: enonceIneq(ineg(g, s, b)), format: "qcm", choices, expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_I, `on soustrait ${c}, puis on divise par −${a}, négatif : le sens se renverse.`, `la limite est ${q}.`, juste) };
  }),

  tpl("inequation_college", 8, 2, "Résous chaque inéquation : une seule a pour solutions la partie en couleur.", () => {
    const val = entre(-5, 5);
    const s = un(SYMS);
    const droite = s === ">" || s === "\\ge";
    const inclus = s === "\\le" || s === "\\ge";
    const a = entre(2, 5);
    const c = entre(1, 9);
    const forme = (sym: Sym, v0: number) => un([ineg(`x + ${c}`, sym, v0 + c), ineg(fois(a, "x"), sym, a * v0), ineg(expr(a, "x", c), sym, a * v0 + c), ineg(fois(-a, "x"), INV[sym], -a * v0)]);
    const juste = forme(s, val);
    const stricte: Sym = s === "<" ? "\\le" : s === "\\le" ? "<" : s === ">" ? "\\ge" : ">";
    const faux = [forme(INV[s], val), forme(s, val + un([-2, 2])), forme(stricte, val)];
    const canvas: NumberLineCanvasData = {
      kind: "number_line",
      size: { width: 360, height: 90 },
      min: -8,
      max: 8,
      step: 1,
      intervalles: [droite ? { de: val, deInclus: inclus, color: "#dc2626" } : { a: val, aInclus: inclus, color: "#dc2626" }],
      display: { showTicks: true, showValues: true, showPoints: false, showZero: true },
    };
    const text = `${un(["Sur la droite graduée, la partie en couleur montre les solutions d’une inéquation.", "La droite graduée montre en couleur les solutions d’une inéquation.", "Voici les solutions d’une inéquation, en couleur sur la droite."])} ${un(["De quelle inéquation s’agit-il ?", "Laquelle de ces inéquations est-ce ?", "Quelle inéquation a ces solutions ?"])}`;
    return { text, format: "qcm", choices: melange([juste, ...faux]), expected: [juste], comparator: "mcq_exact", canvas, explanation: expliquer(DEF_I, "on résout chaque inéquation et on compare.", `la limite est ${val}, ${inclus ? "comprise" : "non comprise"}.`, juste) };
  }),

  tpl("inequation_college", 9, 3, "Pose l’inéquation, résous-la, et garde un nombre entier : on arrondit en dessous.", () => {
    const o = un(LIMITES);
    const { a, b, c } = tirageABC(o);
    const rep = Math.floor((c - b) / a);
    return { text: `${o.texte(b, a, c)} ${un(o.q)}`, format: "short", expected: [String(rep)], comparator: "number_equal", explanation: expliquer(DEF_I, `on note x le nombre cherché : ${b} + ${a}x ≤ ${c}.`, `${a}x ≤ ${c - b}, donc x ≤ ${c - b} ÷ ${a}, et x est entier.`, `au plus ${rep}.`) };
  }),

  tpl("inequation_college", 10, 3, "Pose l’inéquation, résous-la, et garde un nombre entier : on arrondit au-dessus.", () => {
    const o = un(OBJECTIFS);
    const { a, b, c } = tirageABC(o);
    const rep = Math.ceil((c - b) / a);
    return { text: `${o.texte(b, a, c)} ${un(o.q)}`, format: "short", expected: [String(rep)], comparator: "number_equal", explanation: expliquer(DEF_I, `on note x le nombre cherché : ${b} + ${a}x ≥ ${c}.`, `${a}x ≥ ${c - b}, donc x ≥ ${c - b} ÷ ${a}, et x est entier.`, `au moins ${rep}.`) };
  }),

  tpl("inequation_college", 11, 3, "Traduis mot à mot : d’abord le produit, puis l’ajout, puis le signe.", () => {
    const [mot, k] = un(MOTS);
    const [compare, s] = un(COMPARE);
    const n = entre(2, 20);
    const v = entre(n + 3, 60);
    const aug = Math.random() < 0.5;
    const c = aug ? n : -n;
    const g = expr(k, "x", c);
    const juste = ineg(g, s, v);
    const strict: Sym = s === "<" ? "\\le" : s === "\\le" ? "<" : s === ">" ? "\\ge" : ">";
    const text = `${un(PROGRAMMES)} ${mot} de x, ${aug ? "augmenté" : "diminué"} de ${n}, ${compare} ${v}. ${un(["Quelle inéquation traduit cette phrase ?", "Comment l’écrire avec une inéquation ?", "Quelle est la bonne inéquation ?"])}`;
    return { text, format: "qcm", choices: qcm(juste, [ineg(g, INV[s], v), ineg(expr(k, "x", -c), s, v), ineg(g, strict, v), ineg(expr(1, "x", k + c), s, v)]), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_I, "on traduit chaque groupe de mots.", `${mot.toLowerCase()} de x s’écrit ${k}x.`, juste) };
  }),

  tpl("inequation_college", 12, 3, "La quantité baisse : b − ax doit rester au-dessus de la limite. On arrondit en dessous.", () => {
    const o = un(DESCENTES);
    const { a, b, c } = tirageABC(o);
    const rep = Math.floor((b - c) / a);
    return { text: `${o.texte(b, a, c)} ${un(o.q)}`, format: "short", expected: [String(rep)], comparator: "number_equal", explanation: expliquer(DEF_I, `on note x le nombre cherché : ${b} − ${a}x ≥ ${c}.`, `−${a}x ≥ ${c - b}, donc x ≤ ${b - c} ÷ ${a}, et x est entier.`, `au plus ${rep}.`) };
  }),
];

