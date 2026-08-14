// lib/tutor-v4/questionBank/seconde/francais/poesie.bank.ts
//
// LA POÉSIE DU MOYEN ÂGE AU XVIIIe SIÈCLE — écrit le 14/08/2026.
//
// RÉFÉRENCE : programme de seconde générale et technologique, arrêté du
// 17 janvier 2019 modifié par le JORF du 8 octobre 2020, premier objet d'étude :
//   « La poésie du Moyen Âge au XVIIIe siècle. […] on s'attache aussi à
//   contextualiser la lecture de la poésie, en donnant aux élèves DES REPÈRES
//   SUR SON HISTOIRE, SES CONTINUITÉS, SES ÉVOLUTIONS ET SES RUPTURES, du Moyen
//   Âge au XVIIIe siècle. » Exercices recommandés : « la lecture expressive […]
//   en portant une attention particulière à LA RESTITUTION DES VALEURS
//   RYTHMIQUES ET SONORES DU VERS ».
//   Mouvements nommés par le texte : « la fin'amor, l'Humanisme, la Pléiade, la
//   préciosité, le classicisme ».
//
// ⚠️⚠️ PAS LE XIXe SIÈCLE. « La poésie du XIXe siècle au XXIe siècle » est
// l'objet d'étude de PREMIÈRE — c'est là que se trouvent Rimbaud, Ponge et
// Dorion des programmes d'EAF. Rien de tout cela ici.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE : elles sont choisies par le professeur.
// On interroge des FORMES, des PROCÉDÉS et des MOUVEMENTS — ceux-là mêmes que
// le programme nomme.
// ⚠️ Les vers servant au comptage ont été COMPOSÉS pour ce fichier, et le
// décompte syllabe à syllabe figure dans chaque explication : il doit pouvoir
// se relire. Élision du e devant voyelle, e muet compté devant consonne, e muet
// final non compté.
//
// ⛔ QCM, QUATRE propositions. ⛔ Aucune ligne morte.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  const a = [...items];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type Vers = { readonly vers: string; readonly rep: string; readonly decompte: string; readonly source?: string };
type Simple = { readonly enonce: string; readonly rep: string; readonly raison: string };
type AvecFaux = { readonly enonce: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };

/* ============================ 1. LE MÈTRE (2de_poe_metre) ============================ */

const METRES: readonly string[] = [
  "six syllabes : un hexasyllabe",
  "sept syllabes : un heptasyllabe",
  "huit syllabes : un octosyllabe",
  "dix syllabes : un décasyllabe",
  "douze syllabes : un alexandrin",
];

const VERS_METRE: readonly Vers[] = [
  { vers: "Le vent se lève et court sur la mer étalée", rep: "douze syllabes : un alexandrin", decompte: "Le / vent / se / lè / v'et / court / sur / la / mer / é / ta / lée — le e de « lève » s'élide devant « et »" },
  { vers: "La nuit tombe en silence au bord du grand chemin", rep: "douze syllabes : un alexandrin", decompte: "La / nuit / tom / b'en / si / len / c'au / bord / du / grand / che / min — deux élisions, devant « en » et devant « au »" },
  { vers: "Je marche dans la plaine où le jour va finir", rep: "douze syllabes : un alexandrin", decompte: "Je / mar / che / dans / la / plai / n'où / le / jour / va / fi / nir — le e de « marche » compte devant la consonne de « dans »" },
  { vers: "Le fleuve coule lent au pied de la montagne", rep: "douze syllabes : un alexandrin", decompte: "Le / fleu / ve / cou / le / lent / au / pied / de / la / mon / tagne — les deux e muets comptent, celui de la fin ne compte pas" },
  { vers: "Les oiseaux se sont tus au fond de la vallée", rep: "douze syllabes : un alexandrin", decompte: "Les / oi / seaux / se / sont / tus / au / fond / de / la / val / lée" },
  { vers: "Rien ne bouge ce soir dans la maison muette", rep: "douze syllabes : un alexandrin", decompte: "Rien / ne / bou / ge / ce / soir / dans / la / mai / son / mu / ette — le e final de « muette » ne compte pas" },
  { vers: "La mer se tait, le vent tombe soudain", rep: "dix syllabes : un décasyllabe", decompte: "La / mer / se / tait / le / vent / tom / be / sou / dain" },
  { vers: "Un feu brille au sommet de la colline", rep: "dix syllabes : un décasyllabe", decompte: "Un / feu / bri / ll'au / som / met / de / la / co / lline — élision de « brille » devant « au »" },
  { vers: "Le ciel se couvre avant la fin du jour", rep: "dix syllabes : un décasyllabe", decompte: "Le / ciel / se / cou / vr'a / vant / la / fin / du / jour — élision de « couvre » devant « avant »" },
  { vers: "Personne ne répond dans la maison", rep: "dix syllabes : un décasyllabe", decompte: "Per / son / ne / ne / ré / pond / dans / la / mai / son" },
  { vers: "Le jour se lève sur la ville", rep: "huit syllabes : un octosyllabe", decompte: "Le / jour / se / lè / ve / sur / la / ville — le e final de « ville » ne compte pas" },
  { vers: "La pluie tombe sur les toits gris", rep: "huit syllabes : un octosyllabe", decompte: "La / pluie / tom / be / sur / les / toits / gris" },
  { vers: "Le sable garde tes deux pas", rep: "huit syllabes : un octosyllabe", decompte: "Le / sa / ble / gar / de / tes / deux / pas" },
  { vers: "Un chien aboie au loin, puis rien", rep: "huit syllabes : un octosyllabe", decompte: "Un / chien / a / boie / au / loin / puis / rien" },
  { vers: "La lune éclaire les toits", rep: "sept syllabes : un heptasyllabe", decompte: "La / lu / n'é / clai / re / les / toits — élision de « lune » devant « éclaire »" },
  { vers: "La mer monte lentement", rep: "sept syllabes : un heptasyllabe", decompte: "La / mer / mon / te / len / te / ment" },
  { vers: "Le feu s'éteint dans la nuit", rep: "sept syllabes : un heptasyllabe", decompte: "Le / feu / s'é / teint / dans / la / nuit" },
  { vers: "Le vent souffle et se tait", rep: "six syllabes : un hexasyllabe", decompte: "Le / vent / souf / fl'et / se / tait — élision de « souffle » devant « et »" },
  { vers: "La porte est restée close", rep: "six syllabes : un hexasyllabe", decompte: "La / por / t'est / res / tée / close — élision de « porte » devant « est », e final non compté" },
  { vers: "Rien ne vient de la mer", rep: "six syllabes : un hexasyllabe", decompte: "Rien / ne / vient / de / la / mer" },

  /* ⭐ DES VERS AUTHENTIQUES, ajoutés le 14/08 à la demande de Frédéric. Ils
     valent mieux que des vers fabriqués : l'élève compte sur de la vraie
     poésie, et rencontre au passage les noms de la période.
     ⛔ TOUS SONT DE LA PÉRIODE DU PROGRAMME — Moyen Âge au XVIIIe siècle. PAS
     BAUDELAIRE, pas Rimbaud, pas Verlaine : le XIXe est l'objet d'étude de
     PREMIÈRE, et l'y faire entrer serait exactement l'erreur qu'on a corrigée.
     ⚠️ Un vers, attribué, tous du domaine public depuis des siècles.
     ⚠️ Le décompte de chacun a été refait à la main, élisions comprises. */
  { vers: "Heureux qui, comme Ulysse, a fait un beau voyage", rep: "douze syllabes : un alexandrin", source: "Du Bellay", decompte: "Heu / reux / qui / com / m'U / lys / s'a / fait / un / beau / vo / yage — deux élisions : « comme Ulysse » puis « Ulysse a »" },
  { vers: "Cueillez dès aujourd'hui les roses de la vie", rep: "douze syllabes : un alexandrin", source: "Ronsard", decompte: "Cueil / lez / dès / au / jourd' / hui / les / ro / ses / de / la / vie" },
  { vers: "Je le vis, je rougis, je pâlis à sa vue", rep: "douze syllabes : un alexandrin", source: "Racine", decompte: "Je / le / vis / je / rou / gis / je / pâ / lis / à / sa / vue — trois membres de quatre syllabes" },
  { vers: "C'est Vénus tout entière à sa proie attachée", rep: "douze syllabes : un alexandrin", source: "Racine", decompte: "C'est / Vé / nus / tout / en / tiè / r'à / sa / proi / 'at / ta / chée — deux élisions" },
  { vers: "Et rose elle a vécu ce que vivent les roses", rep: "douze syllabes : un alexandrin", source: "Malherbe", decompte: "Et / ro / s'el / l'a / vé / cu / ce / que / vi / vent / les / roses — deux élisions au début" },
  { vers: "Maître Corbeau, sur un arbre perché", rep: "dix syllabes : un décasyllabe", source: "La Fontaine", decompte: "Maî / tre / Cor / beau / sur / un / ar / bre / per / ché — les deux e muets comptent devant consonne" },
  { vers: "Je vis, je meurs ; je me brûle et me noie", rep: "dix syllabes : un décasyllabe", source: "Louise Labé", decompte: "Je / vis / je / meurs / je / me / brû / l'et / me / noie — élision de « brûle » devant « et »" },
  { vers: "Mignonne, allons voir si la rose", rep: "huit syllabes : un octosyllabe", source: "Ronsard", decompte: "Mi / gnon / n'al / lons / voir / si / la / rose — élision de « mignonne » devant « allons »" },
  { vers: "Mais où sont les neiges d'antan ?", rep: "huit syllabes : un octosyllabe", source: "Villon", decompte: "Mais / où / sont / les / nei / ges / d'an / tan" },
  { vers: "Je plie et ne romps pas", rep: "six syllabes : un hexasyllabe", source: "La Fontaine", decompte: "Je / pli / 'et / ne / romps / pas — élision de « plie » devant « et »" },
  { vers: "Va, cours, vole, et nous venge", rep: "six syllabes : un hexasyllabe", source: "Corneille", decompte: "Va / cours / vo / l'et / nous / venge — élision de « vole » devant « et », e final non compté" },
];

/* ============================ 2. LES RIMES (2de_poe_rimes) ============================ */

const DISPOSITIONS: readonly string[] = [
  "des rimes suivies : deux à deux",
  "des rimes croisées : elles alternent",
  "des rimes embrassées : les deux du milieu sont enfermées",
  "des rimes redoublées : la même revient quatre fois",
];

const RIMES: readonly Simple[] = [
  { enonce: "toits / froids / chemin / matin", rep: "des rimes suivies : deux à deux", raison: "les deux premières riment ensemble, les deux suivantes aussi" },
  { enonce: "matin / rivage / chemin / voyage", rep: "des rimes croisées : elles alternent", raison: "la première rime avec la troisième, la deuxième avec la quatrième" },
  { enonce: "matin / rivage / voyage / chemin", rep: "des rimes embrassées : les deux du milieu sont enfermées", raison: "la première rime avec la dernière, les deux du milieu entre elles" },
  { enonce: "chemin / matin / demain / romain", rep: "des rimes redoublées : la même revient quatre fois", raison: "les quatre vers portent le même son final" },
  { enonce: "vallée / allée / sommeil / réveil", rep: "des rimes suivies : deux à deux", raison: "deux paires successives" },
  { enonce: "sommeil / fontaine / réveil / plaine", rep: "des rimes croisées : elles alternent", raison: "un vers sur deux rime ensemble" },
  { enonce: "sommeil / fontaine / plaine / réveil", rep: "des rimes embrassées : les deux du milieu sont enfermées", raison: "la paire centrale est encadrée" },
  { enonce: "fontaine / plaine / peine / haleine", rep: "des rimes redoublées : la même revient quatre fois", raison: "un seul son pour les quatre vers" },
  { enonce: "silence / danse / hiver / mer", rep: "des rimes suivies : deux à deux", raison: "deux paires successives" },
  { enonce: "hiver / rivière / mer / lumière", rep: "des rimes croisées : elles alternent", raison: "les rimes se répondent un vers sur deux" },
  { enonce: "hiver / rivière / lumière / mer", rep: "des rimes embrassées : les deux du milieu sont enfermées", raison: "la paire centrale est enfermée par la première et la dernière" },
  { enonce: "rivière / lumière / manière / prière", rep: "des rimes redoublées : la même revient quatre fois", raison: "les quatre vers portent le même son" },
  { enonce: "montagne / campagne / village / rivage", rep: "des rimes suivies : deux à deux", raison: "deux paires successives" },
  { enonce: "village / montagne / rivage / campagne", rep: "des rimes croisées : elles alternent", raison: "alternance des deux sons" },
  { enonce: "village / montagne / campagne / rivage", rep: "des rimes embrassées : les deux du milieu sont enfermées", raison: "la paire centrale est encadrée" },
  { enonce: "campagne / montagne / Espagne / gagne", rep: "des rimes redoublées : la même revient quatre fois", raison: "un seul son pour les quatre vers" },
];

/* ============================ 3. LE RYTHME (2de_poe_rythme) ============================ */

const EFFETS_RYTHME: readonly string[] = [
  "un enjambement : la phrase déborde sur le vers suivant, et le sens ne s'arrête pas où le vers s'arrête",
  "un rejet : un mot court est repoussé au début du vers suivant, et cette place le met en relief",
  "un contre-rejet : un mot court est jeté à la fin du vers, en avance sur la phrase qu'il ouvre",
  "une césure marquée : le vers se coupe en deux moitiés qui se répondent",
];

const RYTHMES: readonly Simple[] = [
  { enonce: "« Et le vent qui venait de la mer emportait / Les cris » — le second vers commence par deux mots seulement.", rep: "un rejet : un mot court est repoussé au début du vers suivant, et cette place le met en relief", raison: "le groupe rejeté est bref et se détache" },
  { enonce: "« Il marchait dans la nuit sans regarder derrière / Lui, sans hâte, longeant les murs de la cité »", rep: "un rejet : un mot court est repoussé au début du vers suivant, et cette place le met en relief", raison: "« lui » tombe seul en tête du vers suivant" },
  { enonce: "« La mer était très calme et le ciel très léger, / Et rien ne bougeait plus sur la longue jetée »", rep: "une césure marquée : le vers se coupe en deux moitiés qui se répondent", raison: "chaque vers se partage en deux moitiés de six syllabes qui se répondent" },
  { enonce: "« On entendait au loin les cloches de la ville / Sonner l'heure du soir au-dessus des jardins »", rep: "un enjambement : la phrase déborde sur le vers suivant, et le sens ne s'arrête pas où le vers s'arrête", raison: "la phrase continue largement sur le vers suivant, sans mot isolé" },
  { enonce: "« Rien. / Rien ne restait debout après le passage du vent »", rep: "un contre-rejet : un mot court est jeté à la fin du vers, en avance sur la phrase qu'il ouvre", raison: "le mot bref est placé avant la phrase qu'il annonce" },
  { enonce: "« Les arbres se penchaient sous le poids de la pluie / Battante, et le chemin disparaissait au loin »", rep: "un rejet : un mot court est repoussé au début du vers suivant, et cette place le met en relief", raison: "« battante » se retrouve seul en tête" },
  { enonce: "« Il faisait presque nuit ; la maison était noire / Et froide, et le silence occupait les couloirs »", rep: "un rejet : un mot court est repoussé au début du vers suivant, et cette place le met en relief", raison: "« et froide » tombe en tête du vers suivant" },
  { enonce: "« Je regardais la mer, elle ne bougeait pas ; / Je regardais le ciel, il ne bougeait pas plus »", rep: "une césure marquée : le vers se coupe en deux moitiés qui se répondent", raison: "les deux moitiés de chaque vers se font écho" },
  { enonce: "« La lumière du soir entrait par la fenêtre / Et se posait sans bruit sur le bois de la table »", rep: "un enjambement : la phrase déborde sur le vers suivant, et le sens ne s'arrête pas où le vers s'arrête", raison: "la phrase se poursuit sans qu'un mot bref soit isolé" },
  { enonce: "« Personne. / Personne n'était venu depuis des semaines »", rep: "un contre-rejet : un mot court est jeté à la fin du vers, en avance sur la phrase qu'il ouvre", raison: "le mot est placé en fin de vers alors qu'il ouvre la phrase suivante" },
  { enonce: "« Le fleuve descendait lentement vers la plaine / Immense, où les troupeaux paissaient depuis l'aurore »", rep: "un rejet : un mot court est repoussé au début du vers suivant, et cette place le met en relief", raison: "l'adjectif isolé prend un poids qu'il n'aurait pas ailleurs" },
  { enonce: "« Le jour venait à peine, et la ville dormait ; / La nuit s'était enfuie, et personne n'avait vu »", rep: "une césure marquée : le vers se coupe en deux moitiés qui se répondent", raison: "les deux hémistiches se répondent terme à terme" },
  { enonce: "« Nous avons traversé les villages déserts / Que la guerre avait vidés de leurs habitants »", rep: "un enjambement : la phrase déborde sur le vers suivant, et le sens ne s'arrête pas où le vers s'arrête", raison: "la relative se poursuit sur tout le vers suivant" },
  { enonce: "« Attendre. / Attendre encore, sans savoir jusqu'à quand »", rep: "un contre-rejet : un mot court est jeté à la fin du vers, en avance sur la phrase qu'il ouvre", raison: "le verbe est jeté à l'avance, en fin de vers" },
  { enonce: "« Elle ouvrit la fenêtre et regarda tomber / La neige sur les toits et sur les cheminées »", rep: "un rejet : un mot court est repoussé au début du vers suivant, et cette place le met en relief", raison: "le sujet du verbe est rejeté au vers suivant" },
  { enonce: "« La mer monte le soir, la mer descend le jour, / La mer reprend le sable et le rend à son tour »", rep: "une césure marquée : le vers se coupe en deux moitiés qui se répondent", raison: "chaque vers se coupe nettement en deux moitiés parallèles" },
];

/* ============================ 4. LES SONORITÉS (2de_poe_sonorites) ============================ */

const EFFETS_SONS: readonly string[] = [
  "une allitération : une même consonne revient et se fait entendre",
  "une assonance : une même voyelle revient et se fait entendre",
  "une paronomase : deux mots presque semblables se rapprochent, et leur sens se frotte",
  "une harmonie imitative : les sons imitent ce que le vers décrit",
];

const SONORITES: readonly Simple[] = [
  { enonce: "« Sur le sable salé souffle un souffle de sel »", rep: "une allitération : une même consonne revient et se fait entendre", raison: "le s revient six fois" },
  { enonce: "« La lune allume une fumée sur la dune »", rep: "une assonance : une même voyelle revient et se fait entendre", raison: "le son u revient de mot en mot" },
  { enonce: "« Il confond le fond et la forme »", rep: "une paronomase : deux mots presque semblables se rapprochent, et leur sens se frotte", raison: "« confond » et « fond » se ressemblent et s'appellent" },
  { enonce: "« Le vent siffle et gifle et frappe les volets »", rep: "une harmonie imitative : les sons imitent ce que le vers décrit", raison: "les sifflantes et les occlusives font entendre le vent et les coups" },
  { enonce: "« Trois tours de tambour dans la tour »", rep: "une allitération : une même consonne revient et se fait entendre", raison: "le t revient à chaque mot fort" },
  { enonce: "« L'ombre longe le fleuve et le monde s'endort »", rep: "une assonance : une même voyelle revient et se fait entendre", raison: "le son on revient quatre fois" },
  { enonce: "« Qui vole un œuf vole un bœuf »", rep: "une paronomase : deux mots presque semblables se rapprochent, et leur sens se frotte", raison: "« œuf » et « bœuf » ne diffèrent que d'un son" },
  { enonce: "« Le ruisseau ruisselle et gazouille et bruisse »", rep: "une harmonie imitative : les sons imitent ce que le vers décrit", raison: "les sons imitent le bruit de l'eau" },
  { enonce: "« Frères, frappez fort à la ferme fermée »", rep: "une allitération : une même consonne revient et se fait entendre", raison: "le f revient cinq fois" },
  { enonce: "« Le vieux village dort sous la vieille lumière »", rep: "une assonance : une même voyelle revient et se fait entendre", raison: "le son i revient d'un mot à l'autre" },
  { enonce: "« Il prend le train de la traine »", rep: "une paronomase : deux mots presque semblables se rapprochent, et leur sens se frotte", raison: "« train » et « traine » se répondent par leur forme" },
  { enonce: "« Le tonnerre roule et gronde et tonne au loin »", rep: "une harmonie imitative : les sons imitent ce que le vers décrit", raison: "les r roulés font entendre l'orage" },
  { enonce: "« Douce douleur des jours enfuis »", rep: "une allitération : une même consonne revient et se fait entendre", raison: "le d revient en tête de mot" },
  { enonce: "« La mer amère berce ses pierres »", rep: "une assonance : une même voyelle revient et se fait entendre", raison: "le son è revient de mot en mot" },
  { enonce: "« Il faut se taire pour se plaire »", rep: "une paronomase : deux mots presque semblables se rapprochent, et leur sens se frotte", raison: "« taire » et « plaire » se rapprochent par le son et se répondent par le sens" },
  { enonce: "« Les cloches sonnent, cognent, carillonnent »", rep: "une harmonie imitative : les sons imitent ce que le vers décrit", raison: "les sons imitent la sonnerie" },
];

/* ============================ 5. LES FORMES FIXES (2de_poe_formes_fixes) ============================ */

const FORMES: readonly string[] = [
  "un sonnet : quatorze vers, deux quatrains puis deux tercets",
  "une ballade : trois strophes de même forme et un envoi plus court, avec un vers qui revient",
  "un rondeau : une forme brève où le premier mot ou vers revient comme un refrain",
  "une ode : un poème lyrique en strophes régulières, adressé à quelqu'un ou à quelque chose",
];

const FORMES_FIXES: readonly Simple[] = [
  { enonce: "Quatorze vers : deux strophes de quatre, puis deux de trois.", rep: "un sonnet : quatorze vers, deux quatrains puis deux tercets", raison: "c'est la structure même du sonnet" },
  { enonce: "Trois strophes bâties sur les mêmes rimes, puis une strophe plus courte adressée au prince ; le dernier vers de chaque strophe est le même.", rep: "une ballade : trois strophes de même forme et un envoi plus court, avec un vers qui revient", raison: "l'envoi et le refrain caractérisent la ballade" },
  { enonce: "Une forme brève de treize ou quinze vers, où les premiers mots du poème reviennent deux fois sans rimer.", rep: "un rondeau : une forme brève où le premier mot ou vers revient comme un refrain", raison: "le retour du début est la marque du rondeau" },
  { enonce: "Un poème de strophes régulières, adressé à la nature ou à une personne, sur un ton élevé.", rep: "une ode : un poème lyrique en strophes régulières, adressé à quelqu'un ou à quelque chose", raison: "l'adresse et le ton élevé désignent l'ode" },
  { enonce: "Deux quatrains, deux tercets, et souvent une pointe dans le dernier vers.", rep: "un sonnet : quatorze vers, deux quatrains puis deux tercets", raison: "la pointe finale est un usage fréquent du sonnet" },
  { enonce: "Un refrain qui clôt chacune des trois strophes, et un envoi qui interpelle un destinataire.", rep: "une ballade : trois strophes de même forme et un envoi plus court, avec un vers qui revient", raison: "refrain plus envoi : c'est la ballade" },
  { enonce: "Un poème court où le premier hémistiche revient au milieu et à la fin.", rep: "un rondeau : une forme brève où le premier mot ou vers revient comme un refrain", raison: "le retour du début caractérise le rondeau" },
  { enonce: "Des strophes de même longueur, un ton de célébration, une adresse au printemps.", rep: "une ode : un poème lyrique en strophes régulières, adressé à quelqu'un ou à quelque chose", raison: "célébration et adresse désignent l'ode" },
  { enonce: "Quatorze vers dont les huit premiers se répondent par leurs rimes, les six derniers formant un autre système.", rep: "un sonnet : quatorze vers, deux quatrains puis deux tercets", raison: "le partage huit / six est celui du sonnet" },
  { enonce: "Trois strophes identiques de forme, la même clausule à chaque fin, un envoi de quatre ou cinq vers.", rep: "une ballade : trois strophes de même forme et un envoi plus court, avec un vers qui revient", raison: "la structure décrite est celle de la ballade" },
  { enonce: "Une quinzaine de vers seulement, deux rimes en tout, et un retour du début en refrain.", rep: "un rondeau : une forme brève où le premier mot ou vers revient comme un refrain", raison: "brièveté, deux rimes et refrain : c'est le rondeau" },
  { enonce: "Un chant en l'honneur d'une victoire, en strophes régulières et sur un ton soutenu.", rep: "une ode : un poème lyrique en strophes régulières, adressé à quelqu'un ou à quelque chose", raison: "le chant de célébration en strophes régulières est l'ode" },
  { enonce: "Un poème dont la chute tient dans les deux derniers vers, après quatorze vers en tout.", rep: "un sonnet : quatorze vers, deux quatrains puis deux tercets", raison: "quatorze vers avec chute finale : le sonnet" },
  { enonce: "Un poème dont chaque strophe s'achève sur le même vers, et qui s'adresse à un prince pour finir.", rep: "une ballade : trois strophes de même forme et un envoi plus court, avec un vers qui revient", raison: "l'envoi au prince est la signature de la ballade" },
  { enonce: "Une forme courte, à refrain, souvent employée pour un compliment ou un badinage.", rep: "un rondeau : une forme brève où le premier mot ou vers revient comme un refrain", raison: "la brièveté à refrain désigne le rondeau" },
  { enonce: "Un poème adressé à un fleuve, en strophes de six vers toutes bâties de la même façon.", rep: "une ode : un poème lyrique en strophes régulières, adressé à quelqu'un ou à quelque chose", raison: "adresse et régularité strophique : l'ode" },
];

/* ============================ 6. MÉTAPHORE OU COMPARAISON (2de_poe_images) ============================ */

const IMAGES: readonly AvecFaux[] = [
  { enonce: "« La mer est un miroir que le vent vient briser. »", bonne: "une métaphore : le rapprochement se fait sans outil qui l'annonce", faux: ["une comparaison : un outil annonce le rapprochement", "une personnification : une chose reçoit des traits humains", "une hyperbole : l'expression exagère volontairement"], raison: "aucun mot comme « tel » ou « pareil à » n'annonce l'image" },
  { enonce: "« La mer est comme un miroir que le vent vient briser. »", bonne: "une comparaison : un outil annonce le rapprochement", faux: ["une métaphore : le rapprochement se fait sans outil qui l'annonce", "une personnification : une chose reçoit des traits humains", "une hyperbole : l'expression exagère volontairement"], raison: "« comme » annonce explicitement le rapprochement" },
  { enonce: "« La mer respire lentement dans son sommeil. »", bonne: "une personnification : une chose reçoit des traits humains", faux: ["une comparaison : un outil annonce le rapprochement", "une métaphore : le rapprochement se fait sans outil qui l'annonce", "une hyperbole : l'expression exagère volontairement"], raison: "respirer et dormir sont des actes prêtés à la mer" },
  { enonce: "« J'ai attendu ce jour pendant mille ans. »", bonne: "une hyperbole : l'expression exagère volontairement", faux: ["une comparaison : un outil annonce le rapprochement", "une métaphore : le rapprochement se fait sans outil qui l'annonce", "une personnification : une chose reçoit des traits humains"], raison: "l'exagération est manifeste et voulue" },
  { enonce: "« Ses cheveux, un incendie sur ses épaules. »", bonne: "une métaphore : le rapprochement se fait sans outil qui l'annonce", faux: ["une comparaison : un outil annonce le rapprochement", "une personnification : une chose reçoit des traits humains", "une hyperbole : l'expression exagère volontairement"], raison: "l'image est posée directement, sans outil" },
  { enonce: "« Ses cheveux, pareils à un incendie. »", bonne: "une comparaison : un outil annonce le rapprochement", faux: ["une métaphore : le rapprochement se fait sans outil qui l'annonce", "une personnification : une chose reçoit des traits humains", "une hyperbole : l'expression exagère volontairement"], raison: "« pareils à » est l'outil de comparaison" },
  { enonce: "« Le vent hurle et se plaint dans les branches. »", bonne: "une personnification : une chose reçoit des traits humains", faux: ["une comparaison : un outil annonce le rapprochement", "une métaphore : le rapprochement se fait sans outil qui l'annonce", "une hyperbole : l'expression exagère volontairement"], raison: "hurler et se plaindre sont des actes humains prêtés au vent" },
  { enonce: "« Cette nouvelle a fait le tour de la Terre en une seconde. »", bonne: "une hyperbole : l'expression exagère volontairement", faux: ["une comparaison : un outil annonce le rapprochement", "une métaphore : le rapprochement se fait sans outil qui l'annonce", "une personnification : une chose reçoit des traits humains"], raison: "l'exagération porte sur l'étendue et la vitesse" },
  { enonce: "« La ville, ce grand corps endormi. »", bonne: "une métaphore : le rapprochement se fait sans outil qui l'annonce", faux: ["une comparaison : un outil annonce le rapprochement", "une personnification : une chose reçoit des traits humains", "une hyperbole : l'expression exagère volontairement"], raison: "l'apposition pose l'image sans outil" },
  { enonce: "« La ville dort comme un grand corps fatigué. »", bonne: "une comparaison : un outil annonce le rapprochement", faux: ["une métaphore : le rapprochement se fait sans outil qui l'annonce", "une personnification : une chose reçoit des traits humains", "une hyperbole : l'expression exagère volontairement"], raison: "« comme » annonce le rapprochement" },
  { enonce: "« La nuit tend ses bras au-dessus des toits. »", bonne: "une personnification : une chose reçoit des traits humains", faux: ["une comparaison : un outil annonce le rapprochement", "une métaphore : le rapprochement se fait sans outil qui l'annonce", "une hyperbole : l'expression exagère volontairement"], raison: "la nuit reçoit des bras, donc un corps" },
  { enonce: "« Il a versé des torrents de larmes. »", bonne: "une hyperbole : l'expression exagère volontairement", faux: ["une comparaison : un outil annonce le rapprochement", "une métaphore : le rapprochement se fait sans outil qui l'annonce", "une personnification : une chose reçoit des traits humains"], raison: "l'exagération porte sur la quantité" },
  { enonce: "« Ce silence, un mur entre eux deux. »", bonne: "une métaphore : le rapprochement se fait sans outil qui l'annonce", faux: ["une comparaison : un outil annonce le rapprochement", "une personnification : une chose reçoit des traits humains", "une hyperbole : l'expression exagère volontairement"], raison: "l'image est posée par apposition" },
  { enonce: "« Ce silence était tel un mur entre eux deux. »", bonne: "une comparaison : un outil annonce le rapprochement", faux: ["une métaphore : le rapprochement se fait sans outil qui l'annonce", "une personnification : une chose reçoit des traits humains", "une hyperbole : l'expression exagère volontairement"], raison: "« tel » est un outil de comparaison" },
  { enonce: "« La mort rôde et guette au coin de la rue. »", bonne: "une personnification : une chose reçoit des traits humains", faux: ["une comparaison : un outil annonce le rapprochement", "une métaphore : le rapprochement se fait sans outil qui l'annonce", "une hyperbole : l'expression exagère volontairement"], raison: "rôder et guetter sont des actes prêtés à la mort" },
  { enonce: "« Je te l'ai répété un million de fois. »", bonne: "une hyperbole : l'expression exagère volontairement", faux: ["une comparaison : un outil annonce le rapprochement", "une métaphore : le rapprochement se fait sans outil qui l'annonce", "une personnification : une chose reçoit des traits humains"], raison: "l'exagération porte sur le nombre" },
];

/* ============================ 7 à 12. HISTOIRE ET MOUVEMENTS ============================
   ⭐ Les cinq mouvements sont NOMMÉS par le programme : fin'amor, Humanisme,
   Pléiade, préciosité, classicisme. On les interroge par ce qu'ils cherchent,
   jamais par une œuvre.
   ========================================================================== */

/* ⛔⛔ DÉFAUT DE CONCEPTION CORRIGÉ LE 14/08, ET IL ÉTAIT GRAVE.
   La première version faisait UNE MICRO PAR MOUVEMENT et demandait « quel
   mouvement est décrit ? ». La réponse était donc toujours le mouvement nommé
   dans le titre de la micro : réussite garantie sans rien savoir, et la bonne
   ligne était en plus la plus longue des quatre dans 100 % des tirages.
   ⭐ LA QUESTION EST RETOURNÉE : le mouvement est DONNÉ, et c'est le TRAIT qu'il
   faut reconnaitre parmi quatre. Les distracteurs sont les traits authentiques
   des autres mouvements — donc tous vrais, mais d'une autre école. */

type Trait = { readonly mouvement: string; readonly trait: string };

const TRAITS: readonly Trait[] = [
  /* ⚠️ LES VINGT TRAITS ONT DES LONGUEURS VOISINES, ET CE N'EST PAS UN HASARD.
     Mesuré le 14/08 : quand un pool était systématiquement plus long ou plus
     court que les trois autres, la bonne réponse se repérait à sa taille — 100 %
     des tirages dans un cas. Tout écart de longueur entre pools se paie ici. */
  { mouvement: "finamor", trait: "le poète sert une dame inaccessible comme un vassal son seigneur" },
  { mouvement: "finamor", trait: "l'amour vaut par l'attente, et le désir ne doit pas être comblé" },
  { mouvement: "finamor", trait: "le poème se chante, et celui qui l'écrit en est le musicien" },
  { mouvement: "finamor", trait: "le secret est un devoir : nommer la dame, ce serait la perdre" },
  { mouvement: "finamor", trait: "l'amant se dit indigne, et cette indignité fait son mérite" },

  { mouvement: "humanisme", trait: "on relit les Anciens dans leur langue, sans passer par personne" },
  { mouvement: "humanisme", trait: "on veut que le français rivalise avec le latin et avec le grec" },
  { mouvement: "humanisme", trait: "on importe d'Italie des formes neuves, à commencer par le sonnet" },
  { mouvement: "humanisme", trait: "l'homme est mis au centre, et sa formation passe avant tout" },
  { mouvement: "humanisme", trait: "on forge des mots neufs pour dire ce que la langue taisait" },

  { mouvement: "preciosite", trait: "on évite le mot commun, et l'on cherche l'expression rare" },
  { mouvement: "preciosite", trait: "la poésie se fait au salon, où l'esprit vaut le sentiment" },
  { mouvement: "preciosite", trait: "on nomme les choses par des détours plutôt que par leur nom" },
  { mouvement: "preciosite", trait: "la galanterie et le jeu sur les mots tiennent lieu de sujet" },
  { mouvement: "preciosite", trait: "on raffine la langue comme les manières, et les deux se jugent" },

  { mouvement: "classicisme", trait: "on exige la clarté et la mesure ; l'obscurité est un défaut" },
  { mouvement: "classicisme", trait: "l'imitation des Anciens devient une règle, et la règle un chemin" },
  { mouvement: "classicisme", trait: "on se défie du mot trop cherché, tenu pour un excès du passé" },
  { mouvement: "classicisme", trait: "l'art doit plaire et instruire, et se soumettre à la raison" },
  { mouvement: "classicisme", trait: "le beau est tenu pour universel, donc valable en tout lieu" },
];

function traitsDe(mouvement: string) {
  return TRAITS.filter((t) => t.mouvement === mouvement).map((t) => t.trait);
}
function traitsHors(mouvement: string) {
  return TRAITS.filter((t) => t.mouvement !== mouvement).map((t) => t.trait);
}

const SIECLES: readonly AvecFaux[] = [
  { enonce: "La fin'amor des troubadours", bonne: "le Moyen Âge", faux: ["le XVIe siècle", "le XVIIe siècle", "le XVIIIe siècle"], raison: "les troubadours écrivent à partir du XIIe siècle" },
  { enonce: "L'Humanisme", bonne: "le XVIe siècle", faux: ["le Moyen Âge", "le XVIIe siècle", "le XVIIIe siècle"], raison: "l'Humanisme est le mouvement du XVIe siècle" },
  { enonce: "La Pléiade", bonne: "le XVIe siècle", faux: ["le Moyen Âge", "le XVIIe siècle", "le XVIIIe siècle"], raison: "la Pléiade se forme au milieu du XVIe siècle" },
  { enonce: "La préciosité", bonne: "le XVIIe siècle", faux: ["le Moyen Âge", "le XVIe siècle", "le XVIIIe siècle"], raison: "la préciosité occupe la première moitié du XVIIe siècle" },
  { enonce: "Le classicisme", bonne: "le XVIIe siècle", faux: ["le Moyen Âge", "le XVIe siècle", "le XVIIIe siècle"], raison: "le classicisme s'impose dans la seconde moitié du XVIIe siècle" },
  { enonce: "Les Lumières", bonne: "le XVIIIe siècle", faux: ["le Moyen Âge", "le XVIe siècle", "le XVIIe siècle"], raison: "les Lumières sont le mouvement du XVIIIe siècle" },
  { enonce: "Le grand rhétoriqueur, poète de cour à la versification très travaillée", bonne: "le Moyen Âge", faux: ["le XVIe siècle", "le XVIIe siècle", "le XVIIIe siècle"], raison: "les grands rhétoriqueurs closent le Moyen Âge" },
  { enonce: "La naturalisation du sonnet en langue française", bonne: "le XVIe siècle", faux: ["le Moyen Âge", "le XVIIe siècle", "le XVIIIe siècle"], raison: "le sonnet passe en français au XVIe siècle" },
  { enonce: "La querelle des Anciens et des Modernes", bonne: "le XVIIe siècle", faux: ["le Moyen Âge", "le XVIe siècle", "le XVIIIe siècle"], raison: "la querelle éclate à la fin du XVIIe siècle" },
  { enonce: "La poésie didactique mise au service de la science et du progrès", bonne: "le XVIIIe siècle", faux: ["le Moyen Âge", "le XVIe siècle", "le XVIIe siècle"], raison: "c'est un usage du siècle des Lumières" },
  { enonce: "Le chant courtois accompagné à la vielle", bonne: "le Moyen Âge", faux: ["le XVIe siècle", "le XVIIe siècle", "le XVIIIe siècle"], raison: "le chant courtois est médiéval" },
  { enonce: "La défense et l'illustration de la langue française", bonne: "le XVIe siècle", faux: ["le Moyen Âge", "le XVIIe siècle", "le XVIIIe siècle"], raison: "le manifeste de la Pléiade date de 1549" },
  { enonce: "Les salons où se juge le bel esprit", bonne: "le XVIIe siècle", faux: ["le Moyen Âge", "le XVIe siècle", "le XVIIIe siècle"], raison: "les salons précieux sont du XVIIe siècle" },
  { enonce: "L'Encyclopédie et l'esprit d'examen", bonne: "le XVIIIe siècle", faux: ["le Moyen Âge", "le XVIe siècle", "le XVIIe siècle"], raison: "l'Encyclopédie est l'entreprise des Lumières" },
  { enonce: "La ballade à envoi, forme reine des poètes de cour", bonne: "le Moyen Âge", faux: ["le XVIe siècle", "le XVIIe siècle", "le XVIIIe siècle"], raison: "la ballade à envoi est une forme médiévale" },
  { enonce: "L'art poétique qui fixe les règles au nom de la raison", bonne: "le XVIIe siècle", faux: ["le Moyen Âge", "le XVIe siècle", "le XVIIIe siècle"], raison: "les arts poétiques réglés sont classiques" },
];

const RUPTURES: readonly AvecFaux[] = [
  { enonce: "De la fin'amor à la Pléiade : qu'est-ce qui change le plus ?", bonne: "le poème cesse d'être chanté pour devenir un texte écrit et lu", faux: ["l'amour disparait des sujets du poème", "le poème renonce à toute forme fixe", "le poète cesse d'écrire en français"], raison: "l'amour reste, la forme fixe aussi : c'est le lien à la musique qui se défait" },
  { enonce: "De la fin'amor à la Pléiade : qu'est-ce qui se maintient ?", bonne: "la dame reste au centre, et l'amour continue de porter le poème", faux: ["le poème continue d'être chanté à la vielle", "le poème garde le latin comme langue", "le poète reste un vassal de sa dame par contrat"], raison: "le motif amoureux traverse les siècles, le reste change" },
  { enonce: "De l'Humanisme au classicisme : qu'est-ce qui change le plus ?", bonne: "l'imitation des Anciens devient une règle à respecter, non plus une découverte à faire", faux: ["les Anciens cessent d'être lus", "le français cède la place au latin", "la poésie renonce aux formes fixes"], raison: "l'Antiquité reste la référence, mais son statut change du tout au tout" },
  { enonce: "De la préciosité au classicisme : qu'est-ce qui change le plus ?", bonne: "la recherche de l'expression rare devient un défaut, au nom du naturel", faux: ["le salon disparait de la vie littéraire", "la poésie cesse de parler d'amour", "le vers cède la place à la prose"], raison: "le classicisme retourne contre la préciosité ce qu'elle tenait pour une qualité" },
  { enonce: "Du Moyen Âge au XVIe siècle : qu'est-ce qui se maintient ?", bonne: "les formes fixes continuent d'organiser le poème", faux: ["le poème reste toujours chanté", "le latin reste la langue de la poésie savante en France", "le poète reste anonyme"], raison: "les formes fixes traversent la césure, le reste évolue" },
  { enonce: "Du XVIe au XVIIe siècle : qu'est-ce qui change le plus ?", bonne: "l'enrichissement de la langue cède la place à son épuration", faux: ["le français cesse d'être une langue littéraire", "la poésie cesse d'imiter les Anciens", "le sonnet disparait entièrement"], raison: "on passe d'un siècle qui veut enrichir à un siècle qui veut purifier" },
  { enonce: "Du classicisme aux Lumières : qu'est-ce qui change le plus ?", bonne: "la poésie se met au service de l'examen critique et de la diffusion des idées", faux: ["la poésie abandonne le vers régulier", "la poésie cesse d'imiter les Anciens", "la poésie renonce à plaire"], raison: "le siècle des Lumières oriente les lettres vers la critique et le savoir" },
  { enonce: "De la Pléiade au classicisme : qu'est-ce qui se maintient ?", bonne: "l'imitation des Anciens reste la voie du beau", faux: ["la volonté d'enrichir la langue par des mots nouveaux", "le refus de toute règle imposée", "le goût de l'expression rare et cherchée"], raison: "l'antiquité demeure le modèle, même si l'usage qu'on en fait change" },
  { enonce: "De la fin'amor à la préciosité : qu'est-ce qui se maintient ?", bonne: "l'amour se dit par détours, et le mérite se prouve par la parole", faux: ["le poème reste chanté par son auteur", "la dame reste une suzeraine féodale", "le poème garde la langue d'oc"], raison: "le détour et l'épreuve de langage traversent les deux mouvements" },
  { enonce: "De l'Humanisme aux Lumières : qu'est-ce qui se maintient ?", bonne: "la confiance dans le savoir pour former les hommes", faux: ["le retour systématique aux textes grecs et latins", "la primauté du vers sur la prose", "l'obligation d'écrire en latin"], raison: "les deux siècles partagent la foi dans l'instruction" },
  { enonce: "Du XVIIe au XVIIIe siècle : qu'est-ce qui se maintient ?", bonne: "la raison reste la mesure de ce qui est juste", faux: ["les règles poétiques restent inchangées et incontestées", "les salons cessent d'exister", "la poésie reste le genre dominant"], raison: "la raison traverse les deux siècles, son emploi change" },
  { enonce: "Du Moyen Âge au XVIIIe siècle, à travers tout l'objet d'étude : qu'est-ce qui se maintient ?", bonne: "le vers reste organisé par un nombre de syllabes et par des rimes", faux: ["la poésie reste liée à la musique d'un bout à l'autre", "la poésie garde les mêmes sujets d'un bout à l'autre", "la poésie reste écrite par les mêmes milieux sociaux"], raison: "la contrainte du nombre et de la rime traverse toute la période" },

  /* ⚠️ QUATRE CAS À BONNE RÉPONSE COURTE, ajoutés après mesure : les réponses
     justes demandent une phrase nuancée, et la bonne se trouvait être la plus
     longue des quatre dans 75 % des tirages. Ici ce sont les réponses FAUSSES
     qui s'étendent, parce qu'elles ajoutent ce que l'histoire ne dit pas. */
  { enonce: "Du Moyen Âge au XVIIe siècle, qu'est-ce que la poésie a perdu en chemin ?", bonne: "la musique", faux: ["la contrainte du nombre de syllabes, abandonnée au profit du vers libre", "l'usage du français, remplacé par le latin des savants", "le goût des formes fixes, jugées trop contraignantes par les poètes"], raison: "le poème cesse d'être chanté ; le reste demeure" },
  { enonce: "De la préciosité au classicisme, qu'est-ce qui subsiste malgré la rupture ?", bonne: "le salon", faux: ["la recherche systématique du mot rare et du détour élégant", "le refus de toute règle imposée aux poètes par les doctes", "l'idée que la poésie doit d'abord surprendre par son ingéniosité"], raison: "le lieu social demeure, la doctrine s'y renverse" },
  { enonce: "Ce que la Pléiade acclimate en français, en un mot ?", bonne: "le sonnet", faux: ["la disparition complète des formes héritées du Moyen Âge", "l'obligation d'écrire en latin pour être pris au sérieux", "l'abandon de la rime au profit du rythme seul"], raison: "la Pléiade naturalise le sonnet, venu d'Italie" },
  { enonce: "Ce que le classicisme oppose à la préciosité, en un mot ?", bonne: "le naturel", faux: ["l'interdiction d'écrire sur le sentiment amoureux", "le retour à la poésie chantée des troubadours", "le rejet de toute référence à l'Antiquité"], raison: "au mot cherché, le classicisme oppose le naturel" },
];

export const poesieSecondeBank: TutorBankItemV4[] = [
  {
    kind: "template", id: "2de_poe_metre_tpl_1", niveau: "seconde", matiere: "francais",
    notionId: "poesie_formes_2de", microId: "2de_poe_metre", difficulty: 3, theme: "neutral",
    hint: "Le e final devant une consonne compte ; devant une voyelle il s'élide ; en fin de vers il ne compte pas.",
    tags: ["seconde", "poésie", "versification", "template"],
    generate: () => {
      const c = randomChoice(VERS_METRE);
      return {
        text: `« ${c.vers} »${c.source ? ` (${c.source})` : ""}\n\nCombien ce vers compte-t-il de syllabes ?`,
        format: "qcm" as const, choices: makeChoices(c.rep, METRES), expected: [c.rep], comparator: "mcq_exact" as const,
        explanation: exp(
          "Compter un vers ne se fait pas à l'oreille d'aujourd'hui. Trois règles suffisent : le e muet compte quand il précède une consonne, il s'élide devant une voyelle, et il ne compte jamais à la fin du vers.",
          "Découpe à voix basse en marquant chaque e muet, puis vérifie les rencontres de voyelles : c'est là que le compte se perd.",
          `Décompte : ${c.decompte}.`,
          `Le vers compte ${c.rep}.`,
        ),
      };
    },
  },
  {
    kind: "template", id: "2de_poe_rimes_tpl_1", niveau: "seconde", matiere: "francais",
    notionId: "poesie_formes_2de", microId: "2de_poe_rimes", difficulty: 2, theme: "neutral",
    hint: "Note les sons finaux par des lettres : AABB, ABAB, ABBA ou AAAA.",
    tags: ["seconde", "poésie", "rimes", "template"],
    generate: () => {
      const c = randomChoice(RIMES);
      return {
        text: `Voici les mots à la rime de quatre vers :\n${c.enonce}\n\nQuelle est leur disposition ?`,
        format: "qcm" as const, choices: makeChoices(c.rep, DISPOSITIONS), expected: [c.rep], comparator: "mcq_exact" as const,
        explanation: exp(
          "Quatre dispositions courantes : suivies, quand les rimes vont deux à deux ; croisées, quand elles alternent ; embrassées, quand la paire du milieu est enfermée par la première et la dernière ; redoublées, quand un seul son court sur les quatre vers.",
          "Attribue une lettre à chaque son final. Le schéma obtenu donne la réponse sans hésitation.",
          `Ici, ${c.raison}.`,
          `Ce sont ${c.rep}.`,
        ),
      };
    },
  },
  {
    kind: "template", id: "2de_poe_rythme_tpl_1", niveau: "seconde", matiere: "francais",
    notionId: "poesie_formes_2de", microId: "2de_poe_rythme", difficulty: 3, theme: "neutral",
    hint: "Regarde si la phrase déborde, et surtout la LONGUEUR de ce qui déborde : un mot seul, ou tout un membre ?",
    tags: ["seconde", "poésie", "rythme", "template"],
    generate: () => {
      const c = randomChoice(RYTHMES);
      return {
        text: `${c.enonce}\n\nDe quel fait de rythme s'agit-il ?`,
        format: "qcm" as const, choices: makeChoices(c.rep, EFFETS_RYTHME), expected: [c.rep], comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand la phrase ne s'arrête pas où le vers s'arrête, il y a enjambement. Si l'élément qui déborde est bref et tombe au début du vers suivant, on parle de rejet ; s'il est bref et jeté à la fin du vers précédent, de contre-rejet. La césure, elle, coupe le vers en son milieu.",
          "Mesure ce qui déborde. Un mot ou deux : rejet ou contre-rejet, selon le côté. Un membre entier : enjambement.",
          `Ici, ${c.raison}.`,
          `Il s'agit d'${c.rep.startsWith("une") ? c.rep : c.rep}.`,
        ),
      };
    },
  },
  {
    kind: "template", id: "2de_poe_sonorites_tpl_1", niveau: "seconde", matiere: "francais",
    notionId: "poesie_formes_2de", microId: "2de_poe_sonorites", difficulty: 2, theme: "neutral",
    hint: "Consonne répétée, voyelle répétée, mots presque semblables, ou sons qui imitent : ce sont quatre choses différentes.",
    tags: ["seconde", "poésie", "sonorités", "template"],
    generate: () => {
      const c = randomChoice(SONORITES);
      return {
        text: `« ${c.enonce} »\n\nQuel effet sonore ce vers produit-il ?`,
        format: "qcm" as const, choices: makeChoices(c.rep, EFFETS_SONS), expected: [c.rep], comparator: "mcq_exact" as const,
        explanation: exp(
          "L'allitération répète une consonne, l'assonance une voyelle. La paronomase rapproche deux mots presque identiques pour que leurs sens se frottent. L'harmonie imitative va plus loin : les sons choisis miment ce que le vers décrit.",
          "Repère d'abord ce qui se répète : une consonne, une voyelle, ou un mot entier presque semblable. Puis demande-toi si ce retour imite quelque chose.",
          `Ici, ${c.raison}.`,
          `C'est ${c.rep}.`,
        ),
      };
    },
  },
  {
    kind: "template", id: "2de_poe_formes_fixes_tpl_1", niveau: "seconde", matiere: "francais",
    notionId: "poesie_formes_2de", microId: "2de_poe_formes_fixes", difficulty: 2, theme: "neutral",
    hint: "Compte les vers et cherche s'il y a un refrain ou un envoi : ce sont les deux signes les plus sûrs.",
    tags: ["seconde", "poésie", "formes fixes", "template"],
    generate: () => {
      const c = randomChoice(FORMES_FIXES);
      return {
        text: `${c.enonce}\n\nDe quelle forme s'agit-il ?`,
        format: "qcm" as const, choices: makeChoices(c.rep, FORMES), expected: [c.rep], comparator: "mcq_exact" as const,
        explanation: exp(
          "Les formes fixes se reconnaissent à leur architecture. Le sonnet : quatorze vers, deux quatrains puis deux tercets. La ballade : trois strophes de même forme, un refrain, et un envoi qui s'adresse à un destinataire. Le rondeau : une forme brève à refrain. L'ode : des strophes régulières et une adresse, sur un ton élevé.",
          "Compte les vers, cherche un refrain, cherche un envoi. Ces trois indices suffisent à trancher.",
          `Ici, ${c.raison}.`,
          `Il s'agit d'${c.rep}.`,
        ),
      };
    },
  },
  {
    kind: "template", id: "2de_poe_images_tpl_1", niveau: "seconde", matiere: "francais",
    notionId: "poesie_formes_2de", microId: "2de_poe_images", difficulty: 2, theme: "neutral",
    hint: "Cherche d'abord s'il y a un outil qui annonce le rapprochement : comme, tel, pareil à, semblable à.",
    tags: ["seconde", "poésie", "figures", "template"],
    generate: () => {
      const c = randomChoice(IMAGES);
      return {
        text: `${c.enonce}\n\nDe quelle figure s'agit-il ?`,
        format: "qcm" as const, choices: makeChoices(c.bonne, c.faux), expected: [c.bonne], comparator: "mcq_exact" as const,
        explanation: exp(
          "La comparaison rapproche deux réalités en l'annonçant par un outil : comme, tel, pareil à. La métaphore fait le même rapprochement sans le dire, et c'est ce qui la rend plus forte : les deux réalités se confondent au lieu de se ressembler. La personnification prête des traits humains à ce qui n'en a pas ; l'hyperbole exagère.",
          "Cherche l'outil. S'il y est, comparaison. S'il n'y est pas, demande-toi si l'image prête un comportement humain, ou si elle exagère un degré.",
          `Ici, ${c.raison}.`,
          `C'est ${c.bonne}.`,
        ),
      };
    },
  },

  /* ---- Histoire et mouvements ---- */
  {
    kind: "template", id: "2de_poehist_finamor_tpl_1", niveau: "seconde", matiere: "francais",
    notionId: "poesie_histoire_2de", microId: "2de_poehist_finamor", difficulty: 3, theme: "neutral",
    hint: "Les quatre traits sont vrais, mais d'écoles différentes. Cherche le service et l'attente.",
    tags: ["seconde", "poésie", "histoire littéraire", "template"],
    generate: () => {
      const bonne = randomChoice(traitsDe("finamor"));
      return {
        text: `Lequel de ces traits appartient à la fin'amor des troubadours ?`,
        format: "qcm" as const, choices: makeChoices(bonne, traitsHors("finamor")), expected: [bonne], comparator: "mcq_exact" as const,
        explanation: exp(
          "La fin'amor, chantée par les troubadours à partir du XIIe siècle, transpose en amour le lien féodal : la dame est une suzeraine, l'amant son vassal. Le désir y vaut par l'attente, le secret est un devoir, et le poème se chante.",
          "Les quatre propositions décrivent des mouvements réels : aucune n'est fausse en soi. Cherche celle qui parle de service, d'attente ou de secret.",
          `Le trait attendu : ${bonne}.`,
          "Les trois autres appartiennent à l'Humanisme, à la préciosité ou au classicisme.",
        ),
      };
    },
  },
  {
    kind: "template", id: "2de_poehist_humanisme_pleiade_tpl_1", niveau: "seconde", matiere: "francais",
    notionId: "poesie_histoire_2de", microId: "2de_poehist_humanisme_pleiade", difficulty: 3, theme: "neutral",
    hint: "Les quatre traits sont vrais. Cherche celui qui regarde vers l'Antiquité ou vers la langue française.",
    tags: ["seconde", "poésie", "histoire littéraire", "template"],
    generate: () => {
      const bonne = randomChoice(traitsDe("humanisme"));
      return {
        text: `Lequel de ces traits appartient à l'Humanisme et à la Pléiade ?`,
        format: "qcm" as const, choices: makeChoices(bonne, traitsHors("humanisme")), expected: [bonne], comparator: "mcq_exact" as const,
        explanation: exp(
          "L'Humanisme, au XVIe siècle, retourne aux textes antiques dans leur langue et place la formation de l'homme au centre. La Pléiade en est le versant poétique français : elle veut enrichir le français jusqu'à le rendre digne du latin et du grec, et y acclimate des formes venues d'Italie, dont le sonnet.",
          "Les quatre propositions sont vraies, mais d'écoles différentes. Cherche celle qui parle des Anciens ou de la langue française.",
          `Le trait attendu : ${bonne}.`,
          "Les trois autres appartiennent à la fin'amor, à la préciosité ou au classicisme.",
        ),
      };
    },
  },
  {
    kind: "template", id: "2de_poehist_preciosite_tpl_1", niveau: "seconde", matiere: "francais",
    notionId: "poesie_histoire_2de", microId: "2de_poehist_preciosite", difficulty: 3, theme: "neutral",
    hint: "Les quatre traits sont vrais. Cherche la recherche : le mot rare, le détour élégant, le salon.",
    tags: ["seconde", "poésie", "histoire littéraire", "template"],
    generate: () => {
      const bonne = randomChoice(traitsDe("preciosite"));
      return {
        text: `Lequel de ces traits appartient à la préciosité ?`,
        format: "qcm" as const, choices: makeChoices(bonne, traitsHors("preciosite")), expected: [bonne], comparator: "mcq_exact" as const,
        explanation: exp(
          "La préciosité, dans la première moitié du XVIIe siècle, se joue dans les salons. Elle cherche l'expression rare, préfère le détour au mot commun, cultive le trait d'esprit et la galanterie. Elle raffine la langue comme les manières.",
          "Les quatre propositions sont vraies, mais d'écoles différentes. Cherche celle où l'on évite le mot simple par élégance.",
          `Le trait attendu : ${bonne}.`,
          "Les trois autres appartiennent à la fin'amor, à l'Humanisme ou au classicisme.",
        ),
      };
    },
  },
  {
    kind: "template", id: "2de_poehist_classicisme_tpl_1", niveau: "seconde", matiere: "francais",
    notionId: "poesie_histoire_2de", microId: "2de_poehist_classicisme", difficulty: 3, theme: "neutral",
    hint: "Les quatre traits sont vrais. Cherche la clarté, la mesure, la règle et la raison.",
    tags: ["seconde", "poésie", "histoire littéraire", "template"],
    generate: () => {
      const bonne = randomChoice(traitsDe("classicisme"));
      return {
        text: `Lequel de ces traits appartient au classicisme ?`,
        format: "qcm" as const, choices: makeChoices(bonne, traitsHors("classicisme")), expected: [bonne], comparator: "mcq_exact" as const,
        explanation: exp(
          "Le classicisme, dans la seconde moitié du XVIIe siècle, exige clarté, mesure et naturel. Il fait de l'imitation des Anciens une règle, soumet l'art à la raison, et veut qu'il plaise et instruise à la fois. Il se construit en partie CONTRE la recherche précieuse — ce qui explique que ses traits soient souvent l'inverse des siens.",
          "Les quatre propositions sont vraies, mais d'écoles différentes. Cherche l'exigence de règle et la méfiance envers l'excès.",
          `Le trait attendu : ${bonne}.`,
          "Les trois autres appartiennent à la fin'amor, à l'Humanisme ou à la préciosité.",
        ),
      };
    },
  },
  {
    kind: "template", id: "2de_poehist_siecle_tpl_1", niveau: "seconde", matiere: "francais",
    notionId: "poesie_histoire_2de", microId: "2de_poehist_siecle", difficulty: 2, theme: "neutral",
    hint: "Quatre repères pour tout l'objet d'étude : Moyen Âge, XVIe, XVIIe, XVIIIe.",
    tags: ["seconde", "poésie", "histoire littéraire", "template"],
    generate: () => {
      const c = randomChoice(SIECLES);
      return {
        text: `${c.enonce}\n\nÀ quelle période cela appartient-il ?`,
        format: "qcm" as const, choices: makeChoices(c.bonne, c.faux), expected: [c.bonne], comparator: "mcq_exact" as const,
        explanation: exp(
          "L'objet d'étude couvre quatre repères : le Moyen Âge des troubadours et des formes fixes, le XVIe siècle de l'Humanisme et de la Pléiade, le XVIIe de la préciosité puis du classicisme, le XVIIIe des Lumières. Les connaitre, c'est pouvoir situer un texte sans l'avoir lu.",
          "Rattache le trait décrit à ce qu'il suppose : un chant accompagné renvoie au Moyen Âge, un projet sur la langue au XVIe, une exigence de règle au XVIIe, un esprit d'examen au XVIIIe.",
          `Ici, ${c.raison}.`,
          `Cela appartient à ${c.bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template", id: "2de_poehist_continuite_rupture_tpl_1", niveau: "seconde", matiere: "francais",
    notionId: "poesie_histoire_2de", microId: "2de_poehist_continuite_rupture", difficulty: 3, theme: "neutral",
    hint: "Lis bien la question : elle demande soit ce qui CHANGE, soit ce qui SE MAINTIENT. Ce n'est pas la même réponse.",
    tags: ["seconde", "poésie", "histoire littéraire", "template"],
    generate: () => {
      const c = randomChoice(RUPTURES);
      return {
        text: `${c.enonce}`,
        format: "qcm" as const, choices: makeChoices(c.bonne, c.faux), expected: [c.bonne], comparator: "mcq_exact" as const,
        explanation: exp(
          "Le programme demande des repères sur « les continuités, les évolutions et les ruptures » de la poésie. Un mouvement ne remplace jamais tout à fait le précédent : il garde certaines choses et en rejette d'autres, et c'est ce partage qu'il faut savoir faire.",
          "Sépare toujours deux questions : qu'est-ce que le nouveau mouvement conserve, et qu'est-ce qu'il refuse ? Une réponse qui affirme une disparition totale est presque toujours fausse.",
          `Ici, ${c.raison}.`,
          `La réponse est : ${c.bonne}.`,
        ),
      };
    },
  },
];
