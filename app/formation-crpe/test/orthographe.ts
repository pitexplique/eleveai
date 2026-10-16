// LE TEST D'ORTHOGRAPHE DU CRPE — LES QUESTIONS (16/10/2026).
//
// Frédéric : « ce serait bien de faire un test d'orthographe au CRPE », « c'est
// compté dans la note », puis « l'orthographe sera prise en compte ainsi que
// la rédaction, on peut déjà faire un test d'orthographe ». La qualité de la
// langue compte dans la notation des écrits, MATHS COMPRIS : ce test ne sort
// donc pas de la formation du samedi, il la sert. (La rédaction viendra après.)
//
// ⭐ MÊME MOTEUR QUE LE TEST DE MATHS (TestCrpeClient, prop `test`), même règle :
// deux questions par thème, chaque mauvais choix est une vraie erreur de
// candidat ou d'élève, jamais deux choix identiques.
//
// ⚠️ Les thèmes ne renvoient pas à des samedis (la formation, c'est les maths)
// mais à une fiche de cours du site, gratuite.

import type { Question, Theme } from "./questions";

export const THEMES_ORTHO: Theme[] = [
  // ⭐ EN PREMIER (Frédéric, 16/10 : « hypoténuse, médiatrice, etc. ») : les
  // mots des maths. C'est là qu'une copie de maths perd des points sans que
  // personne ne le voie — et c'est le pont avec la formation du samedi.
  { id: "vocabulaire-maths", titre: "Les mots des maths", lien: { label: "La préparation maths du samedi", href: "/formation-crpe" } },
  { id: "homophones", titre: "Homophones grammaticaux", lien: { label: "Fiche CM2 : l'orthographe grammaticale", href: "/fiches-cours/francais/cm2/grammaire-orthographe" } },
  { id: "pp-avoir", titre: "Participe passé avec être et avoir", lien: { label: "Fiche 5e : le participe passé", href: "/fiches-cours/francais/5e/orthographe-participe" } },
  { id: "pp-pronominal", titre: "Participe passé des verbes pronominaux", lien: { label: "Fiche 4e : le participe passé", href: "/fiches-cours/francais/4e/orthographe-participe" } },
  { id: "conjugaison", titre: "Conjugaison", lien: { label: "Fiche 5e : les temps", href: "/fiches-cours/francais/5e/conjugaison-temps" } },
  { id: "gn", titre: "Accords dans le groupe nominal", lien: { label: "Fiche 5e : les accords", href: "/fiches-cours/francais/5e/orthographe-accords" } },
  { id: "lexique", titre: "Orthographe lexicale", lien: { label: "Fiche 5e : l'orthographe des mots", href: "/fiches-cours/francais/5e/vocabulaire-orthographe" } },
  { id: "pluriels", titre: "Pluriels particuliers", lien: { label: "Fiche 4e : les accords", href: "/fiches-cours/francais/4e/orthographe-accords" } },
  { id: "analyse", titre: "Nature et fonction", lien: { label: "Fiche CM2 : nature et fonction", href: "/fiches-cours/francais/cm2/grammaire-nature-fonction" } },
  { id: "erreurs", titre: "Analyser des erreurs d'élèves", lien: { label: "La dictée du jour", href: "/dictee-du-jour" } },
];

export const QUESTIONS_ORTHO: Question[] = [
  // ── Les mots des maths
  {
    theme: "vocabulaire-maths",
    enonce: "Dans un triangle rectangle, le plus grand côté s'appelle l'…",
    choix: ["hypothénuse", "hypoténuse", "hypoténuze", "hippoténuse"],
    bonne: 1,
    correction: "« hypoténuse », sans h après le t : du grec hupo-teinousa, « tendue sous » (l'angle droit). « Hypothénuse » est l'erreur la plus répandue, même chez les adultes.",
  },
  {
    theme: "vocabulaire-maths",
    enonce: "Deux droites qui ne se coupent jamais sont…",
    choix: ["paralèlles", "parallèles", "parralèles", "parallelles"],
    bonne: 1,
    correction: "« parallèle » : un r, puis deux l, puis un seul l après le è — pa-ra-llè-le.",
  },
  {
    theme: "vocabulaire-maths",
    enonce: "Un triangle qui a deux côtés de même longueur est…",
    choix: ["isocelle", "isoscèle", "isocèle", "isocéle"],
    bonne: 2,
    correction: "« isocèle » : iso (égal) + skelos (jambe), mais en français on écrit c, avec un accent grave et un seul l.",
  },
  // ── Homophones grammaticaux
  {
    theme: "homophones",
    enonce: "Elle ___ rendu compte de son erreur.",
    choix: ["c'est", "s'est", "ses", "ces"],
    bonne: 1,
    correction: "« s'est » : c'est le verbe pronominal se rendre compte, au passé composé. Astuce : on peut dire « je me suis rendu compte ».",
  },
  {
    theme: "homophones",
    enonce: "___ à moi, je partirai demain.",
    choix: ["Quand", "Qu'en", "Quant", "Comme"],
    bonne: 2,
    correction: "« Quant à » signifie « en ce qui concerne ». « Quand » marque le temps, « qu'en » se décompose en « que + en ».",
  },
  // ── Participe passé avec être et avoir
  {
    theme: "pp-avoir",
    enonce: "Les lettres que nous avons ___ hier sont arrivées.",
    choix: ["écrit", "écrits", "écrites", "écrite"],
    bonne: 2,
    correction: "Avec avoir, le participe s'accorde avec le COD s'il est placé AVANT : « que » reprend « les lettres » (féminin pluriel), d'où « écrites ».",
  },
  {
    theme: "pp-avoir",
    enonce: "Elles ont ___ toute la journée.",
    choix: ["marché", "marchées", "marchés", "marchée"],
    bonne: 0,
    correction: "Avec avoir, pas de COD placé avant : le participe ne s'accorde pas. Le sujet « elles » ne compte pas avec avoir.",
  },
  // ── Participe passé des verbes pronominaux
  {
    theme: "pp-pronominal",
    enonce: "Elles se sont ___ les mains.",
    choix: ["lavées", "lavé", "lavés", "lavée"],
    bonne: 1,
    correction: "Le COD est « les mains », placé APRÈS le verbe : pas d'accord. « Se » est ici complément d'objet second. Comparez : « elles se sont lavées » (sans COD après).",
  },
  {
    theme: "pp-pronominal",
    enonce: "Ils se sont ___ pendant des heures.",
    choix: ["parlés", "parlées", "parlé", "parlée"],
    bonne: 2,
    correction: "On parle À quelqu'un : « se » est complément d'objet indirect, il n'y a pas de COD, donc pas d'accord.",
  },
  // ── Conjugaison
  {
    theme: "conjugaison",
    enonce: "Il faut que tu ___ à l'heure.",
    choix: ["soit", "sois", "es", "soies"],
    bonne: 1,
    correction: "« Il faut que » appelle le subjonctif : que je sois, que tu sois, qu'il soit. « Soit » est la 3e personne.",
  },
  {
    theme: "conjugaison",
    enonce: "Ce jour-là, ils ___ la route à pied.",
    choix: ["prenèrent", "prirent", "prendirent", "prièrent"],
    bonne: 1,
    correction: "Passé simple de prendre : je pris, ils prirent. « Prièrent » est le passé simple de prier.",
  },
  // ── Accords dans le groupe nominal
  {
    theme: "gn",
    enonce: "Elle porte des chaussures ___.",
    choix: ["marrons", "marronnes", "marron", "marronne"],
    bonne: 2,
    correction: "Un nom employé comme adjectif de couleur reste invariable : des chaussures marron, des yeux noisette (exceptions : rose, mauve, fauve…).",
  },
  {
    theme: "gn",
    enonce: "Ce livre coûte quatre-___ euros.",
    choix: ["vingt", "vingts", "vint", "vins"],
    bonne: 1,
    correction: "« Vingt » prend un s quand il est multiplié ET termine le nombre : quatre-vingts euros, mais quatre-vingt-deux euros.",
  },
  // ── Orthographe lexicale
  {
    theme: "lexique",
    enonce: "Quelle écriture est correcte ?",
    choix: ["acceuillir", "accueillir", "accueuillir", "aceuillir"],
    bonne: 1,
    correction: "« accueillir » : après c, on écrit « ue » pour garder le son [k] devant « il » — comme dans cueillir, recueil.",
  },
  {
    theme: "lexique",
    enonce: "Quelle écriture est correcte ?",
    choix: ["un dilemne", "un dilème", "un dilemme", "un dillemme"],
    bonne: 2,
    correction: "« dilemme », avec deux m — l'erreur « dilemne » vient de l'analogie avec « indemne ».",
  },
  // ── Pluriels particuliers
  {
    theme: "pluriels",
    enonce: "Quel pluriel est correct ?",
    choix: ["des piques-niques", "des pique-niques", "des pique-nique", "des piques-nique"],
    bonne: 1,
    correction: "Dans un nom composé verbe + nom, le verbe reste invariable : des pique-niques, des tire-bouchons.",
  },
  {
    theme: "pluriels",
    enonce: "Quel pluriel est correct ?",
    choix: ["des bijous", "des landaus", "des chevals", "des genous"],
    bonne: 1,
    correction: "« landau » fait landaus (comme sarrau). Mais bijou, genou… font bijoux, genoux, et cheval fait chevaux.",
  },
  // ── Nature et fonction
  {
    theme: "analyse",
    enonce: "« Le chat de ma voisine dort. » Quelle est la fonction de « de ma voisine » ?",
    choix: ["complément d'objet direct", "complément du nom", "sujet", "complément circonstanciel"],
    bonne: 1,
    correction: "« de ma voisine » complète le nom « chat » : c'est un complément du nom. Le verbe « dort » n'a pas de complément d'objet.",
  },
  {
    theme: "analyse",
    enonce: "« Je leur parle souvent. » Quelle est la nature de « leur » ?",
    choix: ["déterminant possessif", "pronom personnel", "adjectif", "adverbe"],
    bonne: 1,
    correction: "Devant un verbe, « leur » est un pronom personnel, toujours invariable. Devant un nom (« leurs livres »), c'est un déterminant possessif.",
  },
  // ── Analyser des erreurs d'élèves
  {
    theme: "erreurs",
    enonce: "Un élève écrit : « Les enfants mange à la cantine. » Quelle est l'origine la plus probable de l'erreur ?",
    choix: [
      "Il ne connaît pas le verbe manger",
      "L'accord sujet-verbe ne s'entend pas à l'oral, il ne le marque pas",
      "Il confond le sujet et le complément",
      "C'est une erreur d'orthographe lexicale",
    ],
    bonne: 1,
    correction: "« mange » et « mangent » se prononcent pareil : l'élève écrit ce qu'il entend. On l'aide en faisant chercher le sujet et en remplaçant par un verbe où l'accord s'entend (« ils prennent »).",
  },
  {
    theme: "erreurs",
    enonce: "Un élève écrit : « Mon frère les manges. » Quelle est l'origine la plus probable de l'erreur ?",
    choix: [
      "Il accorde le verbe avec « les », le mot le plus proche, au lieu du sujet",
      "Il ne connaît pas la conjugaison du présent",
      "Il confond « les » et « des »",
      "Il oublie que « frère » est un nom",
    ],
    bonne: 0,
    correction: "C'est un accord de proximité : le pronom « les », pluriel et collé au verbe, fait écran avec le sujet « mon frère ». On fait remonter au sujet : « qui est-ce qui mange ? »",
  },
];
