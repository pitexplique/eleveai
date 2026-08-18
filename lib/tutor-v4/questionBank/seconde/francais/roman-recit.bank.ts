// lib/tutor-v4/questionBank/seconde/francais/roman-recit.bank.ts
//
// LE ROMAN ET LE RÉCIT DU XVIIIe AU XXIe SIÈCLE — 14/08/2026.
//
// RÉFÉRENCE : programme de seconde, arrêté du 17 janvier 2019 modifié par le
// JORF du 8 octobre 2020, troisième objet d'étude :
//   « deux œuvres intégrales DE FORME ET DE SIÈCLE DIFFÉRENTS : un roman et,
//   par ailleurs, un recueil de nouvelles, ou un récit de voyage, un récit
//   relevant de l'une des formes du biographique, un journal » ; « une
//   perspective historique et culturelle de L'ÉVOLUTION DES FORMES
//   NARRATIVES ».
//   Exercices : « l'exposé sur une question transversale au récit (personnages,
//   lieux, temporalité, thèmes ou valeurs en jeu) ».
//
// ⭐ « FOCALISATION » est l'un des cinq termes que le programme cite comme
// vocabulaire technique du lycée. C'est la notion centrale de ce fichier.
// ⛔ On n'interroge jamais une œuvre : les exemples sont des situations
// narratives, écrites pour ce fichier.
// ⛔ QCM, QUATRE propositions. ⛔ Aucune ligne morte, longueurs équilibrées.

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
  const d = shuffle(Array.from(new Set(wrongs)).filter((w) => w !== correct)).slice(0, 3);
  return shuffle([correct, ...d]);
}
function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type Cas = { readonly enonce: string; readonly rep: string; readonly raison: string };

function item(
  id: string, notionId: string, microId: string, difficulty: TutorBankItemV4["difficulty"],
  hint: string, tags: readonly string[], question: string,
  table: readonly Cas[], pool: readonly string[], definition: string, methode: string,
): TutorBankItemV4 {
  return {
    kind: "template", id, niveau: "seconde", matiere: "francais", notionId, microId,
    difficulty, theme: "neutral", hint, tags: [...tags],
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `${c.enonce}\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.rep, pool),
        expected: [c.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `Ici, ${c.raison}.`, `La réponse est : ${c.rep}.`),
      };
    },
  };
}

/* =========== 1. LES FORMES DU RÉCIT (2de_rom_formes) =========== */

const FORMES: readonly string[] = [
  "un roman : un récit long, qui déploie une intrigue et des personnages",
  "un recueil de nouvelles : des récits brefs et indépendants les uns des autres",
  "un récit de voyage : un déplacement réel qui commande l'ordre du récit",
  "un journal : des entrées datées, écrites sans savoir la suite",
];

const CAS_FORMES: readonly Cas[] = [
  { enonce: "Quatre cents pages, une intrigue unique, une trentaine de personnages qui se croisent.", rep: "un roman : un récit long, qui déploie une intrigue et des personnages", raison: "la longueur et l'intrigue unique désignent le roman" },
  { enonce: "Douze textes de quinze pages, sans personnage commun, chacun avec sa chute.", rep: "un recueil de nouvelles : des récits brefs et indépendants les uns des autres", raison: "brièveté et indépendance des textes" },
  { enonce: "Le narrateur part de Marseille, traverse l'Égypte, remonte le Nil, et raconte dans cet ordre.", rep: "un récit de voyage : un déplacement réel qui commande l'ordre du récit", raison: "l'itinéraire commande la composition" },
  { enonce: "« 3 mars. — Il pleut encore. Je ne sais pas si je partirai demain. »", rep: "un journal : des entrées datées, écrites sans savoir la suite", raison: "la date et l'ignorance de la suite signent le journal" },
  { enonce: "Une histoire qui s'étend sur trois générations et se termine cent ans après son début.", rep: "un roman : un récit long, qui déploie une intrigue et des personnages", raison: "l'ampleur temporelle est romanesque" },
  { enonce: "Chaque texte tient en dix pages et se retourne dans les trois dernières lignes.", rep: "un recueil de nouvelles : des récits brefs et indépendants les uns des autres", raison: "la chute brève caractérise la nouvelle" },
  { enonce: "L'auteur note ce qu'il voit d'un pays qu'il traverse, et son étonnement fait le livre.", rep: "un récit de voyage : un déplacement réel qui commande l'ordre du récit", raison: "le déplacement et l'étonnement font le récit de voyage" },
  { enonce: "Les entrées se succèdent au jour le jour, et certaines contredisent les précédentes.", rep: "un journal : des entrées datées, écrites sans savoir la suite", raison: "l'écriture au jour le jour explique les contradictions" },
  { enonce: "Une intrigue principale, deux intrigues secondaires, et un dénouement qui les noue toutes.", rep: "un roman : un récit long, qui déploie une intrigue et des personnages", raison: "l'entrelacement d'intrigues est romanesque" },
  { enonce: "Vingt histoires sans lien, sinon un thème que le titre du livre annonce.", rep: "un recueil de nouvelles : des récits brefs et indépendants les uns des autres", raison: "l'unité est thématique, non narrative" },
  { enonce: "Le texte suit les étapes d'une traversée et s'arrête à l'arrivée.", rep: "un récit de voyage : un déplacement réel qui commande l'ordre du récit", raison: "le trajet borne le récit" },
  { enonce: "Le narrateur écrit chaque soir, et l'on sent qu'il ignore ce qui l'attend le lendemain.", rep: "un journal : des entrées datées, écrites sans savoir la suite", raison: "l'ignorance du lendemain est propre au journal" },
  { enonce: "Le lecteur suit un même personnage de son enfance à sa mort, sur six cents pages.", rep: "un roman : un récit long, qui déploie une intrigue et des personnages", raison: "l'ampleur et le suivi d'un personnage sont romanesques" },
  { enonce: "Chaque récit installe une situation en deux pages et la renverse à la dernière.", rep: "un recueil de nouvelles : des récits brefs et indépendants les uns des autres", raison: "l'économie et la chute font la nouvelle" },
  { enonce: "L'auteur décrit une ville, puis la suivante, dans l'ordre où il les a vues.", rep: "un récit de voyage : un déplacement réel qui commande l'ordre du récit", raison: "l'ordre des lieux visités commande le texte" },
  { enonce: "Les pages portent des dates, et l'écriture s'arrête net un jour de novembre.", rep: "un journal : des entrées datées, écrites sans savoir la suite", raison: "l'arrêt brutal est un effet du journal" },
];

/* =========== 2. LA BRIÈVETÉ DE LA NOUVELLE (2de_rom_brievete) =========== */

const CONTRAINTES: readonly string[] = [
  "elle entre dans l'action sans préparer le terrain",
  "elle réserve son sens pour la dernière ligne",
  "elle réduit les personnages au strict nécessaire",
  "elle laisse hors du texte tout ce qui n'est pas indispensable",
];

const CAS_BRIEVETE: readonly Cas[] = [
  { enonce: "Le texte commence par « Il ouvrit la lettre », sans qu'on sache encore qui il est.", rep: "elle entre dans l'action sans préparer le terrain", raison: "aucune exposition préalable" },
  { enonce: "Tout le récit change de sens quand on lit les six derniers mots.", rep: "elle réserve son sens pour la dernière ligne", raison: "la chute redistribue le sens" },
  { enonce: "Deux personnages seulement, désignés par « l'homme » et « la femme ».", rep: "elle réduit les personnages au strict nécessaire", raison: "les personnages sont réduits à l'essentiel" },
  { enonce: "On ne saura jamais ce qu'il est advenu ensuite, et le texte n'en dit rien.", rep: "elle laisse hors du texte tout ce qui n'est pas indispensable", raison: "l'après est laissé au lecteur" },
  { enonce: "La première phrase place le lecteur au milieu d'une dispute déjà commencée.", rep: "elle entre dans l'action sans préparer le terrain", raison: "l'entrée est immédiate" },
  { enonce: "Le dernier mot révèle que le narrateur était l'assassin.", rep: "elle réserve son sens pour la dernière ligne", raison: "la révélation finale renverse tout" },
  { enonce: "Un seul personnage porte le récit, et il n'a pas de nom.", rep: "elle réduit les personnages au strict nécessaire", raison: "l'économie va jusqu'à l'anonymat" },
  { enonce: "Le passé du personnage est évoqué en une phrase, et pas davantage.", rep: "elle laisse hors du texte tout ce qui n'est pas indispensable", raison: "le passé est réduit à une allusion" },
  { enonce: "Le lecteur découvre le lieu en même temps que l'action, sans description préalable.", rep: "elle entre dans l'action sans préparer le terrain", raison: "aucun décor n'est planté avant" },
  { enonce: "La chute oblige à relire tout le texte autrement.", rep: "elle réserve son sens pour la dernière ligne", raison: "la fin commande la relecture" },
  { enonce: "Les figurants sont désignés par leur fonction : le postier, la voisine.", rep: "elle réduit les personnages au strict nécessaire", raison: "les personnages sont réduits à leur rôle" },
  { enonce: "L'auteur laisse au lecteur le soin d'imaginer ce qui s'est dit pendant la nuit.", rep: "elle laisse hors du texte tout ce qui n'est pas indispensable", raison: "l'ellipse est confiée au lecteur" },
  { enonce: "Rien n'est expliqué avant : on est jeté dans la scène dès la première ligne.", rep: "elle entre dans l'action sans préparer le terrain", raison: "l'entrée est abrupte" },
  { enonce: "Ce que l'on croyait un souvenir se révèle un mensonge, à la toute fin.", rep: "elle réserve son sens pour la dernière ligne", raison: "la chute renverse la lecture" },
  { enonce: "Aucun personnage secondaire n'a droit à plus de deux phrases.", rep: "elle réduit les personnages au strict nécessaire", raison: "l'économie contraint les seconds rôles" },
  { enonce: "Le lieu n'est jamais nommé, et cela ne manque à aucun moment.", rep: "elle laisse hors du texte tout ce qui n'est pas indispensable", raison: "l'indéterminé est un choix d'économie" },
];

/* =========== 3. LES FORMES DU BIOGRAPHIQUE (2de_rom_biographique) =========== */

const PACTES: readonly string[] = [
  "une autobiographie : l'auteur, le narrateur et le personnage sont la même personne",
  "une biographie : quelqu'un raconte la vie d'un autre, de l'extérieur",
  "des mémoires : l'auteur raconte sa vie pour éclairer son époque",
  "une autofiction : l'auteur se met en scène en assumant la part d'invention",
];

const CAS_PACTE: readonly Cas[] = [
  { enonce: "« Je suis né en 1943, dans une maison qui n'existe plus », écrit l'auteur en son nom.", rep: "une autobiographie : l'auteur, le narrateur et le personnage sont la même personne", raison: "l'identité des trois instances est affirmée" },
  { enonce: "L'auteur reconstitue la vie d'un chimiste mort en 1912, à partir de ses lettres.", rep: "une biographie : quelqu'un raconte la vie d'un autre, de l'extérieur", raison: "un autre est raconté, sur documents" },
  { enonce: "L'auteur raconte ce qu'il a vu de son temps, et sa vie sert de fil au tableau d'une époque.", rep: "des mémoires : l'auteur raconte sa vie pour éclairer son époque", raison: "l'époque prime sur la personne" },
  { enonce: "L'auteur porte son propre nom, mais prévient que certaines scènes n'ont jamais eu lieu.", rep: "une autofiction : l'auteur se met en scène en assumant la part d'invention", raison: "le nom réel et l'invention assumée coexistent" },
  { enonce: "« Je me souviens de la couleur du carrelage » : c'est bien l'auteur qui parle de lui.", rep: "une autobiographie : l'auteur, le narrateur et le personnage sont la même personne", raison: "le souvenir personnel est donné pour vrai" },
  { enonce: "Un historien retrace le parcours d'une femme peintre du XIXe siècle.", rep: "une biographie : quelqu'un raconte la vie d'un autre, de l'extérieur", raison: "le sujet raconté est un tiers" },
  { enonce: "L'auteur consacre trois chapitres aux évènements auxquels il a assisté, et deux à lui-même.", rep: "des mémoires : l'auteur raconte sa vie pour éclairer son époque", raison: "le témoignage sur l'époque domine" },
  { enonce: "Le narrateur, qui porte le nom de l'auteur, vit une scène que la quatrième de couverture dit inventée.", rep: "une autofiction : l'auteur se met en scène en assumant la part d'invention", raison: "l'invention est revendiquée" },
  { enonce: "L'auteur promet au lecteur de dire la vérité sur sa propre vie, et signe cette promesse.", rep: "une autobiographie : l'auteur, le narrateur et le personnage sont la même personne", raison: "le pacte de vérité est explicite" },
  { enonce: "L'ouvrage suit un homme politique de sa naissance à sa mort, avec bibliographie.", rep: "une biographie : quelqu'un raconte la vie d'un autre, de l'extérieur", raison: "le travail documentaire sur un tiers" },
  { enonce: "L'auteur explique qu'il écrit pour que l'on sache ce qui s'est réellement passé ces années-là.", rep: "des mémoires : l'auteur raconte sa vie pour éclairer son époque", raison: "la visée est le témoignage historique" },
  { enonce: "L'auteur se dédouble en personnage et joue de la confusion sans jamais la lever.", rep: "une autofiction : l'auteur se met en scène en assumant la part d'invention", raison: "le brouillage est le principe même du livre" },
  { enonce: "« J'ai longtemps cru que ce souvenir était vrai » : l'auteur enquête sur sa propre mémoire.", rep: "une autobiographie : l'auteur, le narrateur et le personnage sont la même personne", raison: "l'enquête porte sur sa vie, donnée pour réelle" },
  { enonce: "L'ouvrage rassemble les témoignages de dix proches pour reconstituer une existence.", rep: "une biographie : quelqu'un raconte la vie d'un autre, de l'extérieur", raison: "la vie d'un autre est reconstituée par enquête" },
  { enonce: "L'auteur, ancien ministre, raconte les coulisses des décisions qu'il a prises.", rep: "des mémoires : l'auteur raconte sa vie pour éclairer son époque", raison: "le récit sert l'histoire publique" },
  { enonce: "Le livre porte la mention « roman » et le narrateur porte pourtant le prénom de l'auteur.", rep: "une autofiction : l'auteur se met en scène en assumant la part d'invention", raison: "la mention générique et le nom se contredisent volontairement" },
];

/* =========== 4. L'ÉVOLUTION DES FORMES (2de_rom_evolution) =========== */

const EPOQUES: readonly string[] = [
  "le XVIIIe siècle : le roman se donne pour un document trouvé, lettres ou mémoires",
  "le XIXe siècle : le roman prétend peindre la société tout entière",
  "la première moitié du XXe siècle : le récit entre dans la conscience et brouille la chronologie",
  "la seconde moitié du XXe siècle et après : le récit interroge sa propre fabrication",
];

const CAS_EVOLUTION: readonly Cas[] = [
  { enonce: "L'auteur affirme n'être que l'éditeur d'une correspondance qu'on lui aurait confiée.", rep: "le XVIIIe siècle : le roman se donne pour un document trouvé, lettres ou mémoires", raison: "la fiction du manuscrit trouvé est du XVIIIe" },
  { enonce: "Le récit décrit un quartier, ses commerces, ses loyers, et le milieu explique les êtres.", rep: "le XIXe siècle : le roman prétend peindre la société tout entière", raison: "l'ambition sociale est celle du XIXe" },
  { enonce: "Trois cents pages pour une seule journée, vue de l'intérieur d'une conscience.", rep: "la première moitié du XXe siècle : le récit entre dans la conscience et brouille la chronologie", raison: "la durée intérieure remplace la chronologie" },
  { enonce: "Le narrateur s'interrompt pour dire qu'il hésite entre deux suites possibles.", rep: "la seconde moitié du XXe siècle et après : le récit interroge sa propre fabrication", raison: "le récit se prend lui-même pour objet" },
  { enonce: "Le roman se compose uniquement de lettres échangées entre quatre personnages.", rep: "le XVIIIe siècle : le roman se donne pour un document trouvé, lettres ou mémoires", raison: "le roman épistolaire est du XVIIIe" },
  { enonce: "Un même personnage revient d'un livre à l'autre, et l'ensemble forme une fresque.", rep: "le XIXe siècle : le roman prétend peindre la société tout entière", raison: "le retour des personnages sert la fresque sociale" },
  { enonce: "Les phrases suivent le fil d'une pensée, sans ponctuation qui les sépare nettement.", rep: "la première moitié du XXe siècle : le récit entre dans la conscience et brouille la chronologie", raison: "le monologue intérieur est du premier XXe" },
  { enonce: "Le livre contient les brouillons de son propre chapitre trois.", rep: "la seconde moitié du XXe siècle et après : le récit interroge sa propre fabrication", raison: "l'exhibition du travail d'écriture est contemporaine" },
  { enonce: "Une préface assure que le manuscrit a été trouvé dans une malle.", rep: "le XVIIIe siècle : le roman se donne pour un document trouvé, lettres ou mémoires", raison: "le manuscrit trouvé authentifie la fiction" },
  { enonce: "Le narrateur décrit une machine, un procédé, un métier, avec la précision d'une enquête.", rep: "le XIXe siècle : le roman prétend peindre la société tout entière", raison: "la documentation sert la peinture sociale" },
  { enonce: "Le récit revient six fois sur la même scène, un peu différente à chaque fois.", rep: "la première moitié du XXe siècle : le récit entre dans la conscience et brouille la chronologie", raison: "la répétition variée mine la chronologie" },
  { enonce: "Le lecteur est pris à partie et invité à choisir la fin qu'il préfère.", rep: "la seconde moitié du XXe siècle et après : le récit interroge sa propre fabrication", raison: "l'adresse au lecteur défait l'illusion" },
  { enonce: "Le héros raconte sa vie à la première personne, sous forme de confession écrite.", rep: "le XVIIIe siècle : le roman se donne pour un document trouvé, lettres ou mémoires", raison: "les mémoires fictifs sont du XVIIIe" },
  { enonce: "L'hérédité et la misère expliquent, chapitre après chapitre, la chute du personnage.", rep: "le XIXe siècle : le roman prétend peindre la société tout entière", raison: "le déterminisme social est du XIXe" },
  { enonce: "Le temps du récit ne suit plus l'horloge mais la mémoire du personnage.", rep: "la première moitié du XXe siècle : le récit entre dans la conscience et brouille la chronologie", raison: "la mémoire commande la durée" },
  { enonce: "Le narrateur avoue avoir menti au chapitre précédent, et recommence.", rep: "la seconde moitié du XXe siècle et après : le récit interroge sa propre fabrication", raison: "le narrateur peu fiable est un procédé contemporain" },
];

/* =========== 5. L'EFFET DE RÉEL (2de_rom_effet_de_reel) =========== */

const DETAILS: readonly string[] = [
  "il fait vrai, sans rien apporter à l'action : c'est un effet de réel",
  "il annonce discrètement la suite : c'est un indice semé pour plus tard",
  "il caractérise le personnage sans que le narrateur ait à le juger",
  "il situe l'époque et le milieu, comme le ferait une date",
];

const CAS_DETAIL: readonly Cas[] = [
  { enonce: "Sur la cheminée, un baromètre. On n'en reparlera jamais.", rep: "il fait vrai, sans rien apporter à l'action : c'est un effet de réel", raison: "le détail ne sert qu'à faire vrai" },
  { enonce: "Le narrateur signale, l'air de rien, que la porte du fond ne ferme pas à clé.", rep: "il annonce discrètement la suite : c'est un indice semé pour plus tard", raison: "le détail prépare un évènement" },
  { enonce: "Il compte trois fois sa monnaie avant de payer un café.", rep: "il caractérise le personnage sans que le narrateur ait à le juger", raison: "le geste dit l'avarice ou l'inquiétude sans commentaire" },
  { enonce: "Les rues sont éclairées au gaz et les tramways tirés par des chevaux.", rep: "il situe l'époque et le milieu, comme le ferait une date", raison: "les objets datent la scène" },
  { enonce: "Une mouche se pose sur le rebord, repart. Le récit continue.", rep: "il fait vrai, sans rien apporter à l'action : c'est un effet de réel", raison: "le détail n'a aucune fonction narrative" },
  { enonce: "On mentionne que le fusil est accroché au-dessus de la porte.", rep: "il annonce discrètement la suite : c'est un indice semé pour plus tard", raison: "l'objet reviendra nécessairement" },
  { enonce: "Elle range ses livres par ordre de taille, jamais par auteur.", rep: "il caractérise le personnage sans que le narrateur ait à le juger", raison: "l'habitude peint le personnage" },
  { enonce: "Les femmes portent des chapeaux et l'on paie en francs.", rep: "il situe l'époque et le milieu, comme le ferait une date", raison: "les usages datent la scène" },
  { enonce: "Le papier peint est à fleurs jaunes, décollé dans un angle.", rep: "il fait vrai, sans rien apporter à l'action : c'est un effet de réel", raison: "la précision ne sert que la vraisemblance" },
  { enonce: "Le narrateur note que le train de midi ne s'arrête plus dans cette gare.", rep: "il annonce discrètement la suite : c'est un indice semé pour plus tard", raison: "l'information servira à la fuite ou au retard" },
  { enonce: "Il essuie ses lunettes chaque fois qu'on lui pose une question.", rep: "il caractérise le personnage sans que le narrateur ait à le juger", raison: "le tic trahit l'embarras" },
  { enonce: "Les enfants vont à l'école en blouse, et le maitre porte une craie à la main.", rep: "il situe l'époque et le milieu, comme le ferait une date", raison: "le décor scolaire situe l'époque" },
  { enonce: "Un chien aboie deux maisons plus loin, puis se tait.", rep: "il fait vrai, sans rien apporter à l'action : c'est un effet de réel", raison: "le bruit ne sert qu'à l'illusion du vrai" },
  { enonce: "On apprend en passant qu'elle sait nager depuis l'enfance.", rep: "il annonce discrètement la suite : c'est un indice semé pour plus tard", raison: "l'information prépare un épisode" },
  { enonce: "Il garde ses gants à l'intérieur, même assis à table.", rep: "il caractérise le personnage sans que le narrateur ait à le juger", raison: "le détail dit quelque chose du personnage" },
  { enonce: "Les affiches annoncent un spectacle de lanterne magique.", rep: "il situe l'époque et le milieu, comme le ferait une date", raison: "l'objet daté situe la scène" },
];

/* =========== 6. LE PORTRAIT (2de_rom_personnage) =========== */

const PORTRAITS: readonly string[] = [
  "un portrait physique qui vaut jugement moral, sans que le mot soit prononcé",
  "un portrait par les objets : ce qu'il possède dit ce qu'il est",
  "un portrait par le regard d'un autre personnage, donc orienté",
  "un portrait en action : c'est ce qu'il fait qui le décrit",
];

const CAS_PORTRAIT: readonly Cas[] = [
  { enonce: "« Un front bas, des yeux trop rapprochés, une bouche qui ne souriait jamais tout à fait. »", rep: "un portrait physique qui vaut jugement moral, sans que le mot soit prononcé", raison: "les traits physiques suggèrent le caractère" },
  { enonce: "« Trois montres, aucune à l'heure, et un carnet couvert de comptes raturés. »", rep: "un portrait par les objets : ce qu'il possède dit ce qu'il est", raison: "les objets font le portrait" },
  { enonce: "« Sa sœur le trouvait paresseux ; c'est par elle que nous le découvrons. »", rep: "un portrait par le regard d'un autre personnage, donc orienté", raison: "le portrait passe par un tiers" },
  { enonce: "« Il traversa la pièce, redressa le tableau, referma la fenêtre, et seulement alors s'assit. »", rep: "un portrait en action : c'est ce qu'il fait qui le décrit", raison: "les gestes tiennent lieu de description" },
  { enonce: "« Des mains larges, abimées, et des ongles coupés très court. »", rep: "un portrait physique qui vaut jugement moral, sans que le mot soit prononcé", raison: "le physique dit la condition et le caractère" },
  { enonce: "« Une bibliothèque sans un livre corné, et des rideaux tirés en plein jour. »", rep: "un portrait par les objets : ce qu'il possède dit ce qu'il est", raison: "l'intérieur peint l'habitant" },
  { enonce: "« Pour ses voisins, c'était un homme aimable ; nous n'en saurons pas plus. »", rep: "un portrait par le regard d'un autre personnage, donc orienté", raison: "le point de vue est celui des voisins" },
  { enonce: "« Elle compta les assiettes deux fois avant de mettre la table. »", rep: "un portrait en action : c'est ce qu'il fait qui le décrit", raison: "le geste caractérise" },
  { enonce: "« Un visage sans âge, que rien ne semblait avoir jamais surpris. »", rep: "un portrait physique qui vaut jugement moral, sans que le mot soit prononcé", raison: "l'apparence suggère le tempérament" },
  { enonce: "« Sur la table : un jeu de cartes usé, une lettre non ouverte, un verre vide. »", rep: "un portrait par les objets : ce qu'il possède dit ce qu'il est", raison: "les objets racontent une vie" },
  { enonce: "« Son ancien professeur le disait brillant, mais nous n'avons que sa parole. »", rep: "un portrait par le regard d'un autre personnage, donc orienté", raison: "le jugement vient d'un tiers" },
  { enonce: "« Il rangea les papiers dans l'ordre inverse de leur arrivée. »", rep: "un portrait en action : c'est ce qu'il fait qui le décrit", raison: "l'acte peint le personnage" },
  { enonce: "« Une allure droite, que la fatigue n'entamait pas. »", rep: "un portrait physique qui vaut jugement moral, sans que le mot soit prononcé", raison: "le maintien vaut caractère" },
  { enonce: "« Un manteau retourné, reprisé aux coudes, mais brossé chaque matin. »", rep: "un portrait par les objets : ce qu'il possède dit ce qu'il est", raison: "le vêtement dit la condition et la dignité" },
  { enonce: "« Sa fille le croyait sévère : le récit ne dit pas s'il l'était. »", rep: "un portrait par le regard d'un autre personnage, donc orienté", raison: "la focalisation passe par la fille" },
  { enonce: "« Elle relut la lettre, la plia, la déplia, puis la brûla. »", rep: "un portrait en action : c'est ce qu'il fait qui le décrit", raison: "la suite de gestes fait le portrait" },
];

/* =========== 7. NARRATEUR, AUTEUR, PERSONNAGE (2de_nar_narrateur) =========== */

const INSTANCES: readonly string[] = [
  "un narrateur extérieur à l'histoire, qui n'y prend aucune part",
  "un narrateur qui est le personnage principal de sa propre histoire",
  "un narrateur témoin, présent dans l'histoire mais qui raconte celle d'un autre",
  "l'auteur lui-même, qui interrompt la fiction pour parler en son nom",
];

const CAS_INSTANCE: readonly Cas[] = [
  { enonce: "« Il entra sans frapper. Elle ne leva pas les yeux. »", rep: "un narrateur extérieur à l'histoire, qui n'y prend aucune part", raison: "personne ne dit « je » : le récit vient du dehors" },
  { enonce: "« J'entrai sans frapper, et je vis qu'elle ne levait pas les yeux. »", rep: "un narrateur qui est le personnage principal de sa propre histoire", raison: "le « je » est celui qui agit" },
  { enonce: "« Je l'ai vu entrer. Ce qu'il a fait ensuite, c'est son histoire, pas la mienne. »", rep: "un narrateur témoin, présent dans l'histoire mais qui raconte celle d'un autre", raison: "le « je » assiste sans être le sujet" },
  { enonce: "« Le lecteur me pardonnera cette digression : j'y tiens depuis vingt ans. »", rep: "l'auteur lui-même, qui interrompt la fiction pour parler en son nom", raison: "l'adresse au lecteur suspend la fiction" },
  { enonce: "« La ville dormait. Personne ne vit la barque s'éloigner. »", rep: "un narrateur extérieur à l'histoire, qui n'y prend aucune part", raison: "le récit est mené du dehors" },
  { enonce: "« Je n'ai jamais su pourquoi j'avais accepté ce jour-là. »", rep: "un narrateur qui est le personnage principal de sa propre histoire", raison: "le « je » est au centre de l'action" },
  { enonce: "« Nous étions trois à le connaitre, et c'est de lui que je veux parler. »", rep: "un narrateur témoin, présent dans l'histoire mais qui raconte celle d'un autre", raison: "le narrateur est présent mais secondaire" },
  { enonce: "« J'aurais pu faire mourir mon personnage ici. J'ai préféré le laisser vivre. »", rep: "l'auteur lui-même, qui interrompt la fiction pour parler en son nom", raison: "l'auteur commente ses propres choix" },
  { enonce: "« Elle referma le tiroir. Il était trop tard, mais elle l'ignorait encore. »", rep: "un narrateur extérieur à l'histoire, qui n'y prend aucune part", raison: "le narrateur sait plus que le personnage, du dehors" },
  { enonce: "« Je crois que c'est ce soir-là que tout a basculé pour moi. »", rep: "un narrateur qui est le personnage principal de sa propre histoire", raison: "le récit porte sur celui qui parle" },
  { enonce: "« Il ne m'a jamais rien raconté. J'ai reconstitué ce qui suit. »", rep: "un narrateur témoin, présent dans l'histoire mais qui raconte celle d'un autre", raison: "le narrateur raconte la vie d'un autre" },
  { enonce: "« On me reprochera cette scène ; je l'assume entièrement. »", rep: "l'auteur lui-même, qui interrompt la fiction pour parler en son nom", raison: "l'auteur sort du récit pour se défendre" },
  { enonce: "« Le train partit à l'heure. Aucun des voyageurs ne se doutait de rien. »", rep: "un narrateur extérieur à l'histoire, qui n'y prend aucune part", raison: "le récit est extérieur et surplombant" },
  { enonce: "« Je descendis la rue en courant, sans savoir où j'allais. »", rep: "un narrateur qui est le personnage principal de sa propre histoire", raison: "le « je » agit et raconte" },
  { enonce: "« Elle me confia cette histoire un soir d'hiver ; je la rapporte comme je l'ai entendue. »", rep: "un narrateur témoin, présent dans l'histoire mais qui raconte celle d'un autre", raison: "le narrateur transmet le récit d'une autre" },
  { enonce: "« Ici s'arrête ce que je sais de mon personnage, et j'aimerais en savoir plus. »", rep: "l'auteur lui-même, qui interrompt la fiction pour parler en son nom", raison: "l'auteur avoue les limites de sa fiction" },
];

/* =========== 8. LA FOCALISATION (2de_nar_focalisation) =========== */

const FOCALISATIONS: readonly string[] = [
  "une focalisation interne : on ne sait que ce qu'un personnage sait",
  "une focalisation zéro : le narrateur sait tout, de tous, à tout moment",
  "une focalisation externe : on ne voit que ce qu'une caméra verrait",
];

/* ⚠️ DÉFAUT TROUVÉ EN LISANT DES TIRAGES, le 14/08 — invisible aux 58 000
   tirages et au détecteur de lignes mortes. La quatrième ligne disait
   seulement « une focalisation qui change d'un personnage à l'autre » : or
   entrer dans deux consciences, c'est AUSSI la définition de la focalisation
   zéro, et un professeur aurait répondu « zéro » sans avoir tort. Deux réponses
   défendables pour un même item.
   ⭐ LA DISTINCTION JUSTE, et les cas la tenaient déjà : en focalisation zéro,
   le narrateur sait des choses QUE PERSONNE dans l'histoire ne sait ; en
   interne alternée, il ne sait rien de plus que les deux personnages, il passe
   seulement de l'un à l'autre. C'est le LIBELLÉ qui ne le disait pas. */
const FOCALISATIONS4: readonly string[] = [
  ...FOCALISATIONS,
  "une focalisation interne portée tour à tour par deux personnages, sans que le narrateur en sache plus qu'eux",
];

const CAS_FOCALISATION: readonly Cas[] = [
  { enonce: "« Elle crut reconnaitre son pas dans l'escalier, et son cœur se serra. »", rep: "une focalisation interne : on ne sait que ce qu'un personnage sait", raison: "on partage sa croyance et son émotion, sans savoir si elle a raison" },
  { enonce: "« Elle crut reconnaitre son pas. C'était le voisin, mais elle ne l'apprendrait que le lendemain. »", rep: "une focalisation zéro : le narrateur sait tout, de tous, à tout moment", raison: "le narrateur sait ce qu'elle ignore, et la suite" },
  { enonce: "« Elle s'immobilisa dans l'escalier. Sa main resta un instant sur la rampe. »", rep: "une focalisation externe : on ne voit que ce qu'une caméra verrait", raison: "seuls les gestes sont donnés, sans aucun accès à l'intérieur" },
  { enonce: "« Il la trouvait distante ; elle le croyait indifférent. Ni l'un ni l'autre ne parla. »", rep: "une focalisation interne portée tour à tour par deux personnages, sans que le narrateur en sache plus qu'eux", raison: "on entre successivement dans les deux consciences" },
  { enonce: "« Il ne comprit pas tout de suite ce que la lettre signifiait. »", rep: "une focalisation interne : on ne sait que ce qu'un personnage sait", raison: "le récit épouse sa lenteur de compréhension" },
  { enonce: "« Il ne comprit pas ; sa femme, elle, avait compris depuis longtemps. »", rep: "une focalisation zéro : le narrateur sait tout, de tous, à tout moment", raison: "le narrateur accède aux deux, et au passé de l'une" },
  { enonce: "« L'homme posa l'enveloppe sur la table et sortit. La porte resta entrouverte. »", rep: "une focalisation externe : on ne voit que ce qu'une caméra verrait", raison: "aucune pensée n'est donnée" },
  { enonce: "« Elle pensait à demain ; lui pensait à la veille ; le train roulait. »", rep: "une focalisation interne portée tour à tour par deux personnages, sans que le narrateur en sache plus qu'eux", raison: "le récit passe d'une conscience à l'autre" },
  { enonce: "« Elle ne voyait du jardin que ce que la fenêtre en laissait paraitre. »", rep: "une focalisation interne : on ne sait que ce qu'un personnage sait", raison: "le champ de vision est celui du personnage" },
  { enonce: "« Personne dans la maison ne savait encore ce qui s'était passé à Paris. »", rep: "une focalisation zéro : le narrateur sait tout, de tous, à tout moment", raison: "le narrateur sait ce que nul personnage ne sait" },
  { enonce: "« Deux hommes attendaient sous l'auvent. L'un fumait. L'autre regardait sa montre. »", rep: "une focalisation externe : on ne voit que ce qu'une caméra verrait", raison: "le récit se borne au visible" },
  { enonce: "« Le père croyait bien faire. Le fils y voyait une trahison. »", rep: "une focalisation interne portée tour à tour par deux personnages, sans que le narrateur en sache plus qu'eux", raison: "les deux intériorités sont données tour à tour" },
  { enonce: "« Il lui sembla que la pièce avait changé, sans qu'il pût dire en quoi. »", rep: "une focalisation interne : on ne sait que ce qu'un personnage sait", raison: "l'impression est donnée avec ses limites" },
  { enonce: "« Ce qu'aucun d'eux ne pouvait deviner, c'est que la lettre était déjà partie. »", rep: "une focalisation zéro : le narrateur sait tout, de tous, à tout moment", raison: "le narrateur surplombe tous les personnages" },
  { enonce: "« La femme entra, s'assit, commanda. Elle ne regarda pas la porte une seule fois. »", rep: "une focalisation externe : on ne voit que ce qu'une caméra verrait", raison: "le comportement seul est rapporté" },
  { enonce: "« Elle attendait un mot ; il cherchait ses mots ; le silence dura. »", rep: "une focalisation interne portée tour à tour par deux personnages, sans que le narrateur en sache plus qu'eux", raison: "on suit alternativement les deux consciences" },
];

/* =========== 9. CHANGER DE FOCALISATION (2de_nar_changer_focalisation) =========== */

const EFFETS_CHANGEMENT: readonly string[] = [
  "on perd le suspense : le lecteur en sait désormais plus que le personnage",
  "on gagne le suspense : le lecteur en sait autant que le personnage, pas plus",
  "on perd toute sympathie pour le personnage, qu'on ne voit plus du dedans",
  "on découvre que le personnage se trompait sur ce qu'il croyait savoir",
];

const CAS_CHANGEMENT: readonly Cas[] = [
  { enonce: "La scène était vue par l'enfant ; le narrateur passe au savoir total et révèle ce qui attend la famille.", rep: "on perd le suspense : le lecteur en sait désormais plus que le personnage", raison: "le lecteur reçoit une information que le personnage n'a pas" },
  { enonce: "Le narrateur savait tout ; il se restreint désormais à ce que voit le voyageur.", rep: "on gagne le suspense : le lecteur en sait autant que le personnage, pas plus", raison: "la restriction crée l'attente" },
  { enonce: "On était dans la tête du personnage ; on ne le voit plus que de l'extérieur, comme un inconnu.", rep: "on perd toute sympathie pour le personnage, qu'on ne voit plus du dedans", raison: "la mise à distance coupe l'identification" },
  { enonce: "Après vingt pages vues par lui, le récit montre la scène par un autre : il avait tout mal interprété.", rep: "on découvre que le personnage se trompait sur ce qu'il croyait savoir", raison: "le second point de vue corrige le premier" },
  { enonce: "Le narrateur annonce ce qui arrivera au chapitre suivant, alors qu'on suivait un personnage aveugle à tout cela.", rep: "on perd le suspense : le lecteur en sait désormais plus que le personnage", raison: "l'annonce dissipe l'attente" },
  { enonce: "Le récit abandonne le point de vue surplombant pour ne plus rien montrer que la chambre où il est enfermé.", rep: "on gagne le suspense : le lecteur en sait autant que le personnage, pas plus", raison: "l'enfermement du point de vue crée la tension" },
  { enonce: "Le personnage était « je » ; il devient « l'homme », et le lecteur cesse de l'accompagner.", rep: "on perd toute sympathie pour le personnage, qu'on ne voit plus du dedans", raison: "le passage à la troisième personne éloigne" },
  { enonce: "La même conversation, racontée d'abord par elle puis par lui, ne dit pas la même chose.", rep: "on découvre que le personnage se trompait sur ce qu'il croyait savoir", raison: "la seconde version dément la première" },
  { enonce: "Le narrateur glisse une phrase que nul personnage ne pourrait savoir, et le lecteur comprend avant eux.", rep: "on perd le suspense : le lecteur en sait désormais plus que le personnage", raison: "le savoir du lecteur devance celui des personnages" },
  { enonce: "On ne saura de la bataille que ce que le soldat en aperçoit depuis son fossé.", rep: "on gagne le suspense : le lecteur en sait autant que le personnage, pas plus", raison: "la vision partielle nourrit l'inquiétude" },
  { enonce: "Le récit cesse de nommer les pensées et se contente désormais des gestes.", rep: "on perd toute sympathie pour le personnage, qu'on ne voit plus du dedans", raison: "l'extériorité rend le personnage opaque" },
  { enonce: "Un second récit reprend les mêmes faits et montre que le témoin s'était mépris.", rep: "on découvre que le personnage se trompait sur ce qu'il croyait savoir", raison: "la reprise corrige l'erreur" },
  { enonce: "Après avoir tout ignoré avec le personnage, on lit une page où le narrateur explique toute l'affaire.", rep: "on perd le suspense : le lecteur en sait désormais plus que le personnage", raison: "l'explication supprime l'ignorance partagée" },
  { enonce: "Le narrateur renonce à dire ce que pense le meurtrier, et ne montre plus que ce qu'il fait.", rep: "on gagne le suspense : le lecteur en sait autant que le personnage, pas plus", raison: "l'accès refusé à la pensée fait monter la tension" },
  { enonce: "Le personnage que l'on suivait devient une silhouette aperçue par d'autres.", rep: "on perd toute sympathie pour le personnage, qu'on ne voit plus du dedans", raison: "il cesse d'être un intérieur pour devenir un objet" },
  { enonce: "La lettre que l'on croyait perdue avait été lue : un autre point de vue le révèle.", rep: "on découvre que le personnage se trompait sur ce qu'il croyait savoir", raison: "le changement de foyer corrige une croyance" },
];

/* =========== 10. LE RYTHME DU RÉCIT (2de_nar_rythme) =========== */

const RYTHMES: readonly string[] = [
  "une ellipse : le récit saute une durée sans rien en dire",
  "un sommaire : le récit résume en peu de mots une longue durée",
  "une scène : le récit prend à peu près le temps que l'action a duré",
  "une pause : le récit s'arrête pour décrire, et l'action n'avance plus",
];

const CAS_RYTHME: readonly Cas[] = [
  { enonce: "« Trois ans passèrent. » Puis le récit reprend, sans rien dire de ces trois ans.", rep: "une ellipse : le récit saute une durée sans rien en dire", raison: "la durée est franchie sans contenu" },
  { enonce: "« Pendant dix ans, il enseigna, se maria, eut deux enfants et publia trois livres. »", rep: "un sommaire : le récit résume en peu de mots une longue durée", raison: "dix ans tiennent en une phrase" },
  { enonce: "Le dialogue occupe quatre pages, et l'échange a duré quatre minutes.", rep: "une scène : le récit prend à peu près le temps que l'action a duré", raison: "durée du récit et de l'action coïncident" },
  { enonce: "Deux pages sont consacrées au jardin, aux allées, aux arbres. Rien ne se passe.", rep: "une pause : le récit s'arrête pour décrire, et l'action n'avance plus", raison: "la description suspend l'action" },
  { enonce: "« Quand il rouvrit les yeux, c'était l'été suivant. »", rep: "une ellipse : le récit saute une durée sans rien en dire", raison: "une saison entière est sautée" },
  { enonce: "« Les mois d'hiver furent difficiles, mais ils tinrent. »", rep: "un sommaire : le récit résume en peu de mots une longue durée", raison: "plusieurs mois en une phrase" },
  { enonce: "On suit la course pas à pas, souffle après souffle, sur trois pages.", rep: "une scène : le récit prend à peu près le temps que l'action a duré", raison: "le récit épouse la durée réelle" },
  { enonce: "Le narrateur détaille la façade, ses fenêtres, ses volets, avant que quiconque entre.", rep: "une pause : le récit s'arrête pour décrire, et l'action n'avance plus", raison: "la description arrête le temps" },
  { enonce: "Entre le dernier chapitre et celui-ci, la guerre a eu lieu. Le texte n'en parle pas.", rep: "une ellipse : le récit saute une durée sans rien en dire", raison: "un évènement majeur est passé sous silence" },
  { enonce: "« Il voyagea deux ans, vit dix pays, et ne trouva nulle part ce qu'il cherchait. »", rep: "un sommaire : le récit résume en peu de mots une longue durée", raison: "deux ans sont condensés" },
  { enonce: "La scène du repas est rapportée réplique par réplique, sans rien omettre.", rep: "une scène : le récit prend à peu près le temps que l'action a duré", raison: "aucune compression" },
  { enonce: "Une page entière décrit le contenu d'un tiroir, objet par objet.", rep: "une pause : le récit s'arrête pour décrire, et l'action n'avance plus", raison: "l'inventaire suspend l'action" },
  { enonce: "« Le lendemain matin, tout était réglé. » On ne saura pas comment.", rep: "une ellipse : le récit saute une durée sans rien en dire", raison: "le déroulement est escamoté" },
  { enonce: "« L'année scolaire s'écoula sans incident notable. »", rep: "un sommaire : le récit résume en peu de mots une longue durée", raison: "une année en une phrase" },
  { enonce: "L'attente devant la porte est racontée minute par minute.", rep: "une scène : le récit prend à peu près le temps que l'action a duré", raison: "le récit suit la durée vécue" },
  { enonce: "Le narrateur interrompt l'action pour expliquer l'histoire du bâtiment sur deux pages.", rep: "une pause : le récit s'arrête pour décrire, et l'action n'avance plus", raison: "l'explication suspend le récit" },
];

/* =========== 11. L'ORDRE DU RÉCIT (2de_nar_ordre) =========== */

const ORDRES: readonly string[] = [
  "une analepse : le récit revient en arrière pour éclairer le présent",
  "une prolepse : le récit annonce à l'avance ce qui va arriver",
  "un récit dans le récit : un personnage prend la parole et raconte à son tour",
  "un ordre strictement chronologique : rien ne devance ni ne revient",
];

const CAS_ORDRE: readonly Cas[] = [
  { enonce: "« Pour comprendre ce qui suit, il faut remonter à l'été de ses douze ans. »", rep: "une analepse : le récit revient en arrière pour éclairer le présent", raison: "le récit remonte dans le temps" },
  { enonce: "« Il ne le savait pas encore, mais il ne reverrait jamais cette maison. »", rep: "une prolepse : le récit annonce à l'avance ce qui va arriver", raison: "l'avenir est annoncé au lecteur" },
  { enonce: "« Alors le vieil homme se mit à parler, et voici ce qu'il raconta. »", rep: "un récit dans le récit : un personnage prend la parole et raconte à son tour", raison: "un second récit s'ouvre dans le premier" },
  { enonce: "Le récit suit les jours l'un après l'autre, du lundi au dimanche, sans écart.", rep: "un ordre strictement chronologique : rien ne devance ni ne revient", raison: "aucun décrochage temporel" },
  { enonce: "« Dix ans plus tôt, au même endroit, la scène avait été tout autre. »", rep: "une analepse : le récit revient en arrière pour éclairer le présent", raison: "retour explicite en arrière" },
  { enonce: "« Cette décision devait lui coûter cher, mais nous n'en sommes pas là. »", rep: "une prolepse : le récit annonce à l'avance ce qui va arriver", raison: "le narrateur anticipe" },
  { enonce: "Le voyageur commence son histoire, et le narrateur s'efface pour trois chapitres.", rep: "un récit dans le récit : un personnage prend la parole et raconte à son tour", raison: "un narrateur second prend le relais" },
  { enonce: "Chaque chapitre reprend là où le précédent s'est arrêté, à l'heure près.", rep: "un ordre strictement chronologique : rien ne devance ni ne revient", raison: "la continuité est stricte" },
  { enonce: "« Il revoyait la salle de classe, l'odeur de craie, la fenêtre ouverte. »", rep: "une analepse : le récit revient en arrière pour éclairer le présent", raison: "le souvenir ramène en arrière" },
  { enonce: "« Nul ne se doutait que ce dîner serait le dernier. »", rep: "une prolepse : le récit annonce à l'avance ce qui va arriver", raison: "l'issue est annoncée" },
  { enonce: "« Écoutez plutôt ce qui m'est arrivé l'an dernier », dit-elle, et elle raconta.", rep: "un récit dans le récit : un personnage prend la parole et raconte à son tour", raison: "un récit second est enchâssé" },
  { enonce: "Le texte va du matin au soir sans jamais anticiper ni revenir.", rep: "un ordre strictement chronologique : rien ne devance ni ne revient", raison: "la ligne du temps est respectée" },
  { enonce: "« Tout avait commencé bien avant, un soir d'octobre. »", rep: "une analepse : le récit revient en arrière pour éclairer le présent", raison: "le récit remonte à l'origine" },
  { enonce: "« Elle ignorait qu'elle relirait cette lettre vingt ans plus tard. »", rep: "une prolepse : le récit annonce à l'avance ce qui va arriver", raison: "l'avenir lointain est dévoilé" },
  { enonce: "Un personnage lit à voix haute un journal intime, et le journal devient le récit.", rep: "un récit dans le récit : un personnage prend la parole et raconte à son tour", raison: "un texte second s'ouvre dans le premier" },
  { enonce: "Le récit avance sans un seul retour en arrière, du premier jour au dernier.", rep: "un ordre strictement chronologique : rien ne devance ni ne revient", raison: "aucune analepse ni prolepse" },
];

/* =========== 12. LE DISCOURS INDIRECT LIBRE (2de_nar_discours_indirect_libre) =========== */

const PAROLES: readonly string[] = [
  "du discours indirect libre : la voix du personnage passe dans le récit, sans guillemets ni « que »",
  "du discours direct : les paroles sont rapportées telles quelles, entre guillemets",
  "du discours indirect : les paroles sont subordonnées à un verbe qui les introduit",
  "du discours narrativisé : les paroles sont résumées en un mot, sans être rapportées",
];

const CAS_PAROLE: readonly Cas[] = [
  { enonce: "« Il regarda la pendule. Il fallait partir, et vite. Que dirait-il en arrivant ? »", rep: "du discours indirect libre : la voix du personnage passe dans le récit, sans guillemets ni « que »", raison: "la pensée du personnage occupe le récit sans marque d'introduction" },
  { enonce: "« Il regarda la pendule et dit : « Il faut partir. » »", rep: "du discours direct : les paroles sont rapportées telles quelles, entre guillemets", raison: "guillemets et verbe introducteur" },
  { enonce: "« Il regarda la pendule et dit qu'il fallait partir. »", rep: "du discours indirect : les paroles sont subordonnées à un verbe qui les introduit", raison: "la subordonnée en « que » dépend du verbe de parole" },
  { enonce: "« Il regarda la pendule et annonça son départ. »", rep: "du discours narrativisé : les paroles sont résumées en un mot, sans être rapportées", raison: "les paroles sont réduites à un nom" },
  { enonce: "« Elle relut la lettre. Non, décidément, elle ne répondrait pas. »", rep: "du discours indirect libre : la voix du personnage passe dans le récit, sans guillemets ni « que »", raison: "le « non, décidément » est sa voix, dans le récit" },
  { enonce: "« Elle relut la lettre et murmura : « Je ne répondrai pas. » »", rep: "du discours direct : les paroles sont rapportées telles quelles, entre guillemets", raison: "les mots exacts sont donnés" },
  { enonce: "« Elle relut la lettre et déclara qu'elle ne répondrait pas. »", rep: "du discours indirect : les paroles sont subordonnées à un verbe qui les introduit", raison: "subordination à un verbe de parole" },
  { enonce: "« Elle relut la lettre et opposa un refus. »", rep: "du discours narrativisé : les paroles sont résumées en un mot, sans être rapportées", raison: "la parole est résumée en un nom" },
  { enonce: "« Il ouvrit la porte. Personne. Où pouvaient-ils bien être passés ? »", rep: "du discours indirect libre : la voix du personnage passe dans le récit, sans guillemets ni « que »", raison: "la question est celle du personnage, sans introduction" },
  { enonce: "« Il ouvrit la porte et cria : « Il n'y a personne ! » »", rep: "du discours direct : les paroles sont rapportées telles quelles, entre guillemets", raison: "les paroles sont citées" },
  { enonce: "« Il ouvrit la porte et constata qu'il n'y avait personne. »", rep: "du discours indirect : les paroles sont subordonnées à un verbe qui les introduit", raison: "la subordonnée dépend de « constata »" },
  { enonce: "« Il ouvrit la porte et fit part de son étonnement. »", rep: "du discours narrativisé : les paroles sont résumées en un mot, sans être rapportées", raison: "la parole est mentionnée sans être donnée" },
  { enonce: "« Elle s'assit. Après tout, elle avait bien mérité ce moment de repos. »", rep: "du discours indirect libre : la voix du personnage passe dans le récit, sans guillemets ni « que »", raison: "« après tout » est une marque de sa voix" },
  { enonce: "« Elle s'assit en disant : « J'ai bien mérité ce repos. » »", rep: "du discours direct : les paroles sont rapportées telles quelles, entre guillemets", raison: "les mots sont donnés entre guillemets" },
  { enonce: "« Elle s'assit en affirmant qu'elle avait mérité ce repos. »", rep: "du discours indirect : les paroles sont subordonnées à un verbe qui les introduit", raison: "les paroles sont subordonnées" },
  { enonce: "« Elle s'assit et justifia sa pause. »", rep: "du discours narrativisé : les paroles sont résumées en un mot, sans être rapportées", raison: "la parole est réduite à un verbe" },
];

/* ═══════════ LES TABLES DES SECONDS ITEMS (18/08/2026) ═══════════
   Les douze premiers items partent d'une situation et font nommer le procédé.
   Les douze seconds partent du procédé et demandent ce qu'il PRODUIT : la
   vitesse qu'il donne, ce qu'il permet de savoir, ce qu'on perdrait à le
   supprimer, l'indice auquel on le reconnait.
   ⭐ C'est le bon sens de lecture pour un commentaire : nommer ne vaut rien,
   c'est l'effet qui s'analyse. */

const PROPRES_FORME: readonly string[] = [
  "une intrigue qui se déploie sur la durée",
  "des récits qui se passent les uns des autres",
  "un ordre commandé par le déplacement",
  "une écriture qui ignore encore la suite",
];

const CAS_PROPRE_FORME: readonly Cas[] = [
  { enonce: "Le roman.", rep: "une intrigue qui se déploie sur la durée", raison: "la longueur lui permet de faire évoluer ses personnages" },
  { enonce: "Le recueil de nouvelles.", rep: "des récits qui se passent les uns des autres", raison: "chaque nouvelle tient seule : on peut les lire dans le désordre" },
  { enonce: "Le récit de voyage.", rep: "un ordre commandé par le déplacement", raison: "c'est l'itinéraire, non l'intrigue, qui organise le texte" },
  { enonce: "Le journal.", rep: "une écriture qui ignore encore la suite", raison: "chaque entrée est écrite sans savoir ce qui viendra" },
];

const GAINS_BRIEVETE: readonly string[] = [
  "le lecteur est jeté dans l'action aussitôt",
  "la dernière ligne retourne tout ce qui précède",
  "chaque personnage compte, faute d'être nombreux",
  "ce qui n'est pas écrit travaille autant que le texte",
];

const CAS_GAIN: readonly Cas[] = [
  { enonce: "La nouvelle entre dans l'action sans préparer le terrain.", rep: "le lecteur est jeté dans l'action aussitôt", raison: "aucune exposition ne retarde l'entrée en matière" },
  { enonce: "La nouvelle réserve son sens pour la dernière ligne.", rep: "la dernière ligne retourne tout ce qui précède", raison: "la chute oblige à relire ce qu'on croyait avoir compris" },
  { enonce: "La nouvelle réduit ses personnages au strict nécessaire.", rep: "chaque personnage compte, faute d'être nombreux", raison: "aucun n'est décoratif : la brièveté l'interdit" },
  { enonce: "La nouvelle laisse hors du texte tout ce qui n'est pas indispensable.", rep: "ce qui n'est pas écrit travaille autant que le texte", raison: "le lecteur comble les vides, et cette part lui revient" },
];

const GARANTS: readonly string[] = [
  "l'auteur s'engage à dire le vrai sur lui-même",
  "un tiers enquête et répond de ce qu'il avance",
  "l'auteur répond de son époque autant que de lui",
  "l'auteur assume d'inventer à partir de lui-même",
];

const CAS_GARANT: readonly Cas[] = [
  { enonce: "L'autobiographie.", rep: "l'auteur s'engage à dire le vrai sur lui-même", raison: "c'est le pacte autobiographique : auteur, narrateur et personnage ne font qu'un" },
  { enonce: "La biographie.", rep: "un tiers enquête et répond de ce qu'il avance", raison: "celui qui écrit n'est pas celui dont on raconte la vie" },
  { enonce: "Les mémoires.", rep: "l'auteur répond de son époque autant que de lui", raison: "la vie personnelle y sert à éclairer une histoire plus large" },
  { enonce: "L'autofiction.", rep: "l'auteur assume d'inventer à partir de lui-même", raison: "le pacte est déclaré : c'est lui, et ce n'est pas tout à fait lui" },
];

const TRAITS_EPOQUE: readonly string[] = [
  "le roman se donne pour un document trouvé",
  "le roman prétend peindre la société entière",
  "le récit entre dans la conscience et brouille le temps",
  "le récit interroge sa propre fabrication",
];

const CAS_TRAIT_EPOQUE: readonly Cas[] = [
  { enonce: "Le XVIIIe siècle.", rep: "le roman se donne pour un document trouvé", raison: "lettres et mémoires prétendus authentiques donnent au roman sa caution" },
  { enonce: "Le XIXe siècle.", rep: "le roman prétend peindre la société entière", raison: "le romancier se veut l'observateur de son temps" },
  { enonce: "La première moitié du XXe siècle.", rep: "le récit entre dans la conscience et brouille le temps", raison: "la chronologie cède devant le mouvement de la pensée" },
  { enonce: "La seconde moitié du XXe siècle.", rep: "le récit interroge sa propre fabrication", raison: "le roman se prend lui-même pour objet" },
];

/* ⭐ LE TEST DE SUPPRESSION, appliqué au détail. C'est la manipulation la plus
   sûre pour reconnaitre un effet de réel : si l'on retire le détail et que RIEN
   ne manque au récit — ni indice, ni caractérisation, ni repère —, alors il
   n'était là que pour faire vrai. */
const PERTES: readonly string[] = [
  "rien, sinon l'impression que c'est vrai",
  "l'annonce discrète de ce qui va suivre",
  "ce qui nous faisait juger le personnage",
  "le repère d'époque et de milieu",
];

const CAS_PERTE: readonly Cas[] = [
  { enonce: "Un baromètre est posé sur le piano, et l'on n'en reparlera jamais.", rep: "rien, sinon l'impression que c'est vrai", raison: "l'objet ne sert ni l'action ni le portrait : il atteste seulement le monde" },
  { enonce: "Le narrateur signale une porte mal fermée, dix pages avant la fuite.", rep: "l'annonce discrète de ce qui va suivre", raison: "le détail était un indice semé pour plus tard" },
  { enonce: "Les manchettes du personnage sont usées, et il les cache d'un geste.", rep: "ce qui nous faisait juger le personnage", raison: "le détail dit la gêne sociale sans que le narrateur ait à la nommer" },
  { enonce: "Une lampe à pétrole éclaire la pièce, et le train siffle au loin.", rep: "le repère d'époque et de milieu", raison: "le détail date la scène aussi sûrement qu'un millésime" },
  { enonce: "Le papier peint porte des fleurs jaunes, jamais mentionnées ensuite.", rep: "rien, sinon l'impression que c'est vrai", raison: "c'est l'effet de réel dans sa forme la plus nue" },
  { enonce: "Le personnage range un couteau dans sa poche, au premier chapitre.", rep: "l'annonce discrète de ce qui va suivre", raison: "l'objet reviendra : le détail prépare" },
];

const CONCLUSIONS: readonly string[] = [
  "un jugement moral, sans qu'il soit écrit",
  "une condition sociale, par ce qu'il possède",
  "un point de vue, donc partial",
  "un caractère, déduit de ses actes",
];

const CAS_CONCLUSION: readonly Cas[] = [
  { enonce: "Le front est bas, l'œil fuyant, la bouche mauvaise.", rep: "un jugement moral, sans qu'il soit écrit", raison: "le physique porte la condamnation que le narrateur ne prononce pas" },
  { enonce: "Trois pipes, un fauteuil défoncé, des livres jamais ouverts.", rep: "une condition sociale, par ce qu'il possède", raison: "les objets disent le milieu et les habitudes" },
  { enonce: "« Il me parut fatigué, et peut-être malhonnête », dit un autre personnage.", rep: "un point de vue, donc partial", raison: "le portrait passe par un regard qui peut se tromper" },
  { enonce: "Il ramasse le sac, remercie sans regarder, et repart au pas de course.", rep: "un caractère, déduit de ses actes", raison: "aucun adjectif : c'est la conduite qui décrit" },
];

const SAVOIRS: readonly string[] = [
  "tout, s'il le décide",
  "ce qu'il a vécu lui-même",
  "ce qu'il a vu du dehors",
  "rien de plus, mais il commente",
];

const CAS_SAVOIR: readonly Cas[] = [
  { enonce: "Un narrateur extérieur à l'histoire, qui n'y prend aucune part.", rep: "tout, s'il le décide", raison: "n'étant pas dans l'histoire, rien ne borne ce qu'il peut savoir" },
  { enonce: "Un narrateur qui est le personnage principal de sa propre histoire.", rep: "ce qu'il a vécu lui-même", raison: "il ne peut rapporter que ce dont il a fait l'expérience" },
  { enonce: "Un narrateur témoin, présent mais qui raconte la vie d'un autre.", rep: "ce qu'il a vu du dehors", raison: "la conscience de l'autre lui reste fermée" },
  { enonce: "L'auteur qui interrompt la fiction pour parler en son nom.", rep: "rien de plus, mais il commente", raison: "il sort du récit pour s'adresser au lecteur" },
];

/* ⚠️ LA QUATRIÈME LIGNE PORTE LA CORRECTION DU 14/08 : ce qui distingue la
   focalisation zéro de l'interne alternée n'est pas le nombre de consciences,
   c'est ce que le narrateur sait EN PLUS d'elles. Le libellé le dit ici. */
const INDICES_FOCALISATION: readonly string[] = [
  "des perceptions attachées à un seul personnage",
  "des informations que personne dans l'histoire ne possède",
  "aucune pensée, seulement des gestes et des paroles",
  "deux consciences, mais rien de plus qu'elles n'en savent",
];

const CAS_INDICE: readonly Cas[] = [
  { enonce: "Une focalisation interne.", rep: "des perceptions attachées à un seul personnage", raison: "on voit, on entend et l'on pense par lui, et par lui seul" },
  { enonce: "Une focalisation zéro.", rep: "des informations que personne dans l'histoire ne possède", raison: "c'est le seul indice sûr : un savoir qui n'appartient à aucun personnage" },
  { enonce: "Une focalisation externe.", rep: "aucune pensée, seulement des gestes et des paroles", raison: "le récit se tient à la surface, comme une caméra" },
  { enonce: "Une focalisation interne portée tour à tour par deux personnages.", rep: "deux consciences, mais rien de plus qu'elles n'en savent", raison: "on change de tête sans jamais dépasser ce que les têtes savent" },
];

const CHANGEMENTS: readonly string[] = [
  "on passe de l'interne à la focalisation zéro",
  "on passe de la focalisation zéro à l'interne",
  "on passe de l'interne à l'externe",
  "on reste en interne, et le personnage se détrompe",
];

const CAS_CHANGEMENT_INV: readonly Cas[] = [
  { enonce: "Le suspense tombe : le lecteur en sait désormais plus que le personnage.", rep: "on passe de l'interne à la focalisation zéro", raison: "le narrateur s'est mis à savoir ce que le personnage ignore" },
  { enonce: "Le suspense nait : le lecteur n'en sait pas plus que le personnage.", rep: "on passe de la focalisation zéro à l'interne", raison: "le savoir se resserre sur une seule conscience" },
  { enonce: "Le personnage devient opaque : on ne voit plus que ses gestes.", rep: "on passe de l'interne à l'externe", raison: "l'accès à la pensée se ferme, et la sympathie s'éloigne" },
  { enonce: "On découvre que le personnage se trompait sur ce qu'il croyait savoir.", rep: "on reste en interne, et le personnage se détrompe", raison: "la focalisation ne bouge pas : c'est le personnage qui apprend" },
];

const VITESSES: readonly string[] = [
  "le récit va infiniment plus vite que l'histoire",
  "le récit va plus vite que l'histoire",
  "le récit va à la vitesse de l'histoire",
  "le récit avance alors que l'histoire s'arrête",
];

const CAS_VITESSE: readonly Cas[] = [
  { enonce: "Une ellipse.", rep: "le récit va infiniment plus vite que l'histoire", raison: "des années peuvent passer en zéro ligne" },
  { enonce: "Un sommaire.", rep: "le récit va plus vite que l'histoire", raison: "une longue durée tient en quelques phrases" },
  { enonce: "Une scène.", rep: "le récit va à la vitesse de l'histoire", raison: "le dialogue est le cas type : on met à le lire le temps qu'il a duré" },
  { enonce: "Une pause descriptive.", rep: "le récit avance alors que l'histoire s'arrête", raison: "les pages défilent et l'action ne bouge pas d'un pouce" },
];

const GAINS_ORDRE: readonly string[] = [
  "il éclaire le présent par ce qui l'a précédé",
  "il crée l'attente en annonçant la suite",
  "il donne la parole à un autre que le narrateur",
  "il laisse découvrir dans l'ordre où l'on a vécu",
];

const CAS_GAIN_ORDRE: readonly Cas[] = [
  { enonce: "Une analepse.", rep: "il éclaire le présent par ce qui l'a précédé", raison: "le retour en arrière explique ce qu'on ne comprenait pas" },
  { enonce: "Une prolepse.", rep: "il crée l'attente en annonçant la suite", raison: "savoir ce qui vient ne supprime pas l'intérêt : il le déplace" },
  { enonce: "Un récit dans le récit.", rep: "il donne la parole à un autre que le narrateur", raison: "une seconde voix prend le relais, avec son propre savoir" },
  { enonce: "Un ordre strictement chronologique.", rep: "il laisse découvrir dans l'ordre où l'on a vécu", raison: "le lecteur avance au même pas que les personnages" },
];

const RECONNAIT_PAROLE: readonly string[] = [
  "ni guillemets ni « que », mais la voix du personnage",
  "des guillemets et un verbe de parole",
  "une subordonnée introduite par « que »",
  "un seul mot qui résume ce qui a été dit",
];

const CAS_RECONNAIT: readonly Cas[] = [
  { enonce: "Le discours indirect libre.", rep: "ni guillemets ni « que », mais la voix du personnage", raison: "les deux voix se superposent : c'est ce qui le rend difficile à repérer" },
  { enonce: "Le discours direct.", rep: "des guillemets et un verbe de parole", raison: "les paroles sont données telles quelles" },
  { enonce: "Le discours indirect.", rep: "une subordonnée introduite par « que »", raison: "les paroles sont subordonnées, donc reformulées" },
  { enonce: "Le discours narrativisé.", rep: "un seul mot qui résume ce qui a été dit", raison: "« il refusa » tient lieu de toute une conversation" },
];

export const romanRecitSecondeBank: TutorBankItemV4[] = [
  item("2de_rom_formes_tpl_1", "roman_formes_2de", "2de_rom_formes", 2,
    "Longueur, indépendance des textes, itinéraire, dates : quatre indices pour quatre formes.",
    ["seconde", "roman", "template"], "De quelle forme de récit s'agit-il ?", CAS_FORMES, FORMES,
    "Le programme demande deux œuvres intégrales de forme ET de siècle différents : un roman, et par ailleurs un recueil de nouvelles, un récit de voyage, un récit biographique ou un journal. Chaque forme impose sa composition.",
    "Regarde ce qui commande l'ordre du texte : une intrigue, l'indépendance des récits, un trajet, ou des dates."),

  item("2de_rom_brievete_tpl_1", "roman_formes_2de", "2de_rom_brievete", 2,
    "La nouvelle n'a pas le temps. Demande-toi ce qu'elle sacrifie pour tenir en si peu de pages.",
    ["seconde", "roman", "template"], "Que la brièveté impose-t-elle ici ?", CAS_BRIEVETE, CONTRAINTES,
    "La nouvelle est courte, et cette contrainte commande tout : elle entre dans l'action sans préparation, réduit ses personnages, laisse hors du texte ce qui n'est pas indispensable, et réserve souvent son sens pour la dernière ligne.",
    "Demande-toi ce qui manque par rapport à un roman : l'exposition, les personnages secondaires, l'après — et ce que ce manque produit."),

  item("2de_rom_biographique_tpl_1", "roman_formes_2de", "2de_rom_biographique", 3,
    "Trois questions : qui parle, de qui, et que promet-il au lecteur ?",
    ["seconde", "roman", "template"], "De quelle forme du biographique s'agit-il ?", CAS_PACTE, PACTES,
    "Chaque forme du biographique engage un pacte différent avec le lecteur. L'autobiographie promet la vérité sur soi. La biographie raconte un autre, de l'extérieur. Les mémoires prennent la vie comme moyen d'éclairer une époque. L'autofiction assume la part d'invention.",
    "Demande-toi si l'auteur parle de lui ou d'un autre, puis ce qu'il promet : la vérité, le témoignage, ou un mélange assumé."),

  item("2de_rom_evolution_tpl_1", "roman_formes_2de", "2de_rom_evolution", 3,
    "Quatre âges du récit : le document trouvé, la fresque sociale, la conscience, puis le récit qui se regarde.",
    ["seconde", "roman", "template"], "À quelle étape de l'évolution des formes narratives cela renvoie-t-il ?", CAS_EVOLUTION, EPOQUES,
    "Le programme demande une « perspective historique et culturelle de l'évolution des formes narratives ». Quatre moments : le XVIIIe qui déguise la fiction en document, le XIXe qui veut peindre la société, le premier XXe qui entre dans la conscience, et l'époque contemporaine où le récit s'interroge lui-même.",
    "Demande-toi ce que le récit cherche à faire croire : qu'il est vrai, qu'il est complet, qu'il est intérieur, ou qu'il est fabriqué."),

  item("2de_rom_effet_de_reel_tpl_1", "roman_formes_2de", "2de_rom_effet_de_reel", 3,
    "Demande-toi si le détail reviendra. S'il ne revient jamais, il ne servait qu'à faire vrai.",
    ["seconde", "roman", "template"], "Que fait ce détail dans le récit ?", CAS_DETAIL, DETAILS,
    "Tout détail n'a pas la même fonction. Certains ne servent qu'à faire vrai, et c'est ce qu'on appelle l'effet de réel : ils n'annoncent rien et ne reviennent pas. D'autres préparent la suite, caractérisent un personnage, ou datent une époque.",
    "Demande-toi si le détail reviendra, s'il dit quelque chose du personnage, ou s'il situe l'époque. S'il ne fait rien de tout cela, c'est un effet de réel."),

  item("2de_rom_personnage_tpl_1", "roman_formes_2de", "2de_rom_personnage", 2,
    "Un portrait ne décrit pas : il juge. Cherche par quel moyen il le fait sans le dire.",
    ["seconde", "roman", "template"], "Comment ce portrait est-il construit ?", CAS_PORTRAIT, PORTRAITS,
    "Un portrait romanesque ne se contente jamais de décrire : il oriente le jugement du lecteur. Il peut passer par le physique, par les objets, par le regard d'un autre personnage, ou par les actions — et chaque moyen engage différemment.",
    "Demande-toi ce qui est montré : un corps, des objets, un avis, ou des gestes."),

  item("2de_nar_narrateur_tpl_1", "narration_2de", "2de_nar_narrateur", 2,
    "Cherche le « je ». S'il y en a un, demande-toi s'il est le héros, un témoin, ou l'auteur lui-même.",
    ["seconde", "narration", "template"], "Qui raconte ?", CAS_INSTANCE, INSTANCES,
    "Le narrateur n'est pas l'auteur : c'est la voix qui raconte à l'intérieur du livre. Il peut être extérieur à l'histoire, en être le héros, n'en être qu'un témoin, ou céder la place à l'auteur qui s'adresse au lecteur.",
    "Cherche d'abord s'il y a un « je ». S'il y en a un, demande-toi de qui parle l'histoire : de lui, ou d'un autre."),

  item("2de_nar_focalisation_tpl_1", "narration_2de", "2de_nar_focalisation", 3,
    "La question n'est pas « qui parle ? » mais « qui voit ? » — et surtout : que ne peut-on pas savoir ?",
    ["seconde", "narration", "template"], "Quelle focalisation reconnait-on ?", CAS_FOCALISATION, FOCALISATIONS4,
    "La focalisation est le terme que le programme cite comme vocabulaire du lycée. Interne : on ne sait que ce qu'un personnage sait. Zéro : le narrateur sait tout, de tous. Externe : on ne voit que ce qu'une caméra verrait, sans accès aux pensées. Elle peut aussi changer en cours de scène.",
    "Demande-toi ce que le récit t'INTERDIT de savoir. C'est l'interdit qui désigne la focalisation, pas ce qui est dit."),

  item("2de_nar_changer_focalisation_tpl_1", "narration_2de", "2de_nar_changer_focalisation", 3,
    "Compare ce que le lecteur savait avant et ce qu'il sait après : l'écart est la réponse.",
    ["seconde", "narration", "template"], "Que produit ce changement de focalisation ?", CAS_CHANGEMENT, EFFETS_CHANGEMENT,
    "Changer de focalisation, ce n'est pas un détail technique : cela redistribue le savoir. Donner au lecteur plus qu'au personnage supprime le suspense et crée l'ironie ; lui en donner autant le maintient dans l'attente ; le priver de l'intérieur d'un personnage l'éloigne de lui.",
    "Mesure l'écart de savoir entre le lecteur et le personnage, avant et après le changement."),

  item("2de_nar_rythme_tpl_1", "narration_2de", "2de_nar_rythme", 2,
    "Compare deux durées : celle que l'action a prise, et celle que le texte prend pour la dire.",
    ["seconde", "narration", "template"], "Quel fait de rythme reconnait-on ?", CAS_RYTHME, RYTHMES,
    "Le rythme d'un récit se mesure en comparant deux durées : celle de l'histoire et celle du texte. L'ellipse saute une durée sans rien en dire ; le sommaire la résume ; la scène épouse à peu près la durée réelle ; la pause arrête l'action pour décrire.",
    "Demande-toi combien de temps l'action a duré, puis combien de pages le récit y consacre."),

  item("2de_nar_ordre_tpl_1", "narration_2de", "2de_nar_ordre", 2,
    "Le récit va-t-il en arrière, en avant, ou s'ouvre-t-il sur un autre récit ?",
    ["seconde", "narration", "template"], "Quel fait d'ordre reconnait-on ?", CAS_ORDRE, ORDRES,
    "Un récit n'est pas obligé de suivre le temps. L'analepse revient en arrière pour éclairer le présent ; la prolepse annonce ce qui va venir et crée l'attente ou le regret ; le récit second ouvre une histoire dans l'histoire. L'ordre strictement chronologique est un choix parmi d'autres.",
    "Repère le repère temporel employé : « dix ans plus tôt », « il ne le savait pas encore », ou l'ouverture d'une parole longue."),

  item("2de_nar_discours_indirect_libre_tpl_1", "narration_2de", "2de_nar_discours_indirect_libre", 3,
    "Cherche les guillemets, puis le « que ». S'il n'y a ni l'un ni l'autre et qu'on entend pourtant le personnage, tu y es.",
    ["seconde", "narration", "template"], "Comment la parole ou la pensée est-elle rapportée ?", CAS_PAROLE, PAROLES,
    "Le discours indirect libre fait entendre deux voix à la fois : le récit garde son temps et sa personne, mais le vocabulaire, les exclamations et les questions sont ceux du personnage. Ni guillemets, ni « que » : c'est ce qui le distingue du direct et de l'indirect.",
    "Cherche les guillemets : s'il y en a, c'est du direct. Cherche le « que » après un verbe de parole : c'est de l'indirect. S'il n'y a ni l'un ni l'autre mais qu'on entend le personnage, c'est de l'indirect libre."),

  /* ══════════════ LES SECONDS ITEMS ══════════════ */

  item("2de_rom_formes_tpl_2", "roman_formes_2de", "2de_rom_formes", 3,
    "Chaque forme impose une contrainte qu'aucune autre n'a. Cherche celle-là.",
    ["seconde", "roman", "template"], "Qu'est-ce qui est propre à cette forme ?", CAS_PROPRE_FORME, PROPRES_FORME,
    "Le programme demande deux œuvres intégrales de forme et de siècle différents. Chaque forme du récit a sa contrainte propre : le roman déploie une intrigue dans la durée ; les nouvelles d'un recueil se passent les unes des autres ; le récit de voyage suit un itinéraire réel ; le journal s'écrit sans connaitre la suite, et c'est ce qui le rend irremplaçable.",
    "Demande-toi ce que la forme rend possible, et surtout ce qu'elle interdit. C'est l'interdit qui la définit."),

  item("2de_rom_brievete_tpl_2", "roman_formes_2de", "2de_rom_brievete", 3,
    "La brièveté n'est pas une privation : chaque contrainte donne quelque chose en échange.",
    ["seconde", "roman", "template"], "Que la nouvelle gagne-t-elle à cette contrainte ?", CAS_GAIN, GAINS_BRIEVETE,
    "La nouvelle ne raconte pas moins qu'un roman : elle raconte autrement. Entrer sans exposition jette le lecteur dans l'action ; réserver le sens pour la fin oblige à tout relire ; réduire les personnages leur donne à chacun du poids ; et laisser hors du texte l'inutile fait travailler le lecteur autant que l'auteur.",
    "Pour chaque contrainte, demande-toi ce que le lecteur doit faire à la place. C'est là qu'est le gain."),

  item("2de_rom_biographique_tpl_2", "roman_formes_2de", "2de_rom_biographique", 3,
    "Un pacte est une promesse. Demande-toi qui la fait, et de quoi il répond.",
    ["seconde", "roman", "template"], "Sur quoi repose le pacte de lecture ?", CAS_GARANT, GARANTS,
    "Les récits de vie se distinguent par le contrat passé avec le lecteur. L'autobiographie promet la vérité sur soi. La biographie repose sur l'enquête d'un tiers. Les mémoires engagent l'auteur sur son époque autant que sur lui-même. L'autofiction déclare la part d'invention, et c'est cette déclaration qui la rend honnête.",
    "Demande-toi qui écrit, de qui l'on parle, et ce que l'auteur s'engage à garantir."),

  item("2de_rom_evolution_tpl_2", "roman_formes_2de", "2de_rom_evolution", 3,
    "Chaque siècle demande au roman quelque chose que le précédent ne lui demandait pas.",
    ["seconde", "roman", "template"], "Quel est le trait dominant du roman à ce moment ?", CAS_TRAIT_EPOQUE, TRAITS_EPOQUE,
    "Le roman du XVIIIe siècle se déguise en document trouvé pour se faire admettre. Celui du XIXe prétend peindre la société entière. La première moitié du XXe entre dans la conscience et brouille la chronologie. La seconde moitié prend le roman lui-même pour objet.",
    "Demande-toi de quoi le roman a besoin pour être cru à ce moment-là : d'une caution, d'un savoir, d'une conscience, ou de rien."),

  item("2de_rom_effet_de_reel_tpl_2", "roman_formes_2de", "2de_rom_effet_de_reel", 4,
    "Retire le détail par la pensée, puis relis. Si rien ne manque, tu as ta réponse.",
    ["seconde", "roman", "template"], "Si l'on supprimait ce détail, que perdrait le récit ?", CAS_PERTE, PERTES,
    "Un détail de récit peut faire quatre choses : annoncer la suite, caractériser un personnage, situer une époque, ou rien du tout. Ce dernier cas porte un nom — l'effet de réel — et il n'est pas un défaut : c'est précisément parce qu'il ne sert à rien qu'il fait vrai. Le monde, lui, est plein de choses inutiles.",
    "Applique la suppression : retire le détail et relis. Ce qui manque alors te dit ce que le détail faisait."),

  item("2de_rom_personnage_tpl_2", "roman_formes_2de", "2de_rom_personnage", 3,
    "Le narrateur ne juge presque jamais lui-même. Demande-toi ce qu'il te laisse conclure.",
    ["seconde", "roman", "template"], "Que le lecteur en conclut-il ?", CAS_CONCLUSION, CONCLUSIONS,
    "Un portrait ne dit presque jamais ce qu'il veut faire penser : il laisse conclure. Le physique peut porter un jugement moral que personne n'écrit ; les objets disent la condition ; le regard d'un autre personnage oriente sans qu'on s'en aperçoive ; et la conduite décrit mieux qu'aucun adjectif.",
    "Cherche d'abord ce que tu penses du personnage, puis remonte à ce qui, dans le texte, te l'a fait penser."),

  item("2de_nar_narrateur_tpl_2", "narration_2de", "2de_nar_narrateur", 3,
    "La question n'est pas qui parle, mais ce que celui qui parle peut savoir.",
    ["seconde", "narration", "template"], "Que ce narrateur peut-il savoir ?", CAS_SAVOIR, SAVOIRS,
    "Le choix du narrateur décide de ce qui pourra être raconté. Un narrateur extérieur n'a aucune limite si l'auteur ne lui en donne pas. Un narrateur personnage ne peut rapporter que sa propre expérience. Un narrateur témoin voit l'autre du dehors, et sa conscience lui reste fermée — c'est là que nait l'énigme.",
    "Demande-toi ce que ce narrateur ne POURRAIT PAS raconter. Ses limites le définissent mieux que sa position."),

  item("2de_nar_focalisation_tpl_2", "narration_2de", "2de_nar_focalisation", 4,
    "Un seul indice est sûr : le narrateur sait-il quelque chose que PERSONNE dans l'histoire ne sait ?",
    ["seconde", "narration", "template"], "À quel indice la reconnait-on ?", CAS_INDICE, INDICES_FOCALISATION,
    "La focalisation est le filtre par lequel passe l'information. Interne : on ne sait que ce qu'un personnage sait. Zéro : le narrateur sait ce que personne dans l'histoire ne sait. Externe : on ne voit que ce qu'une caméra verrait. Et l'interne peut passer d'un personnage à l'autre sans que le narrateur en sache jamais plus qu'eux — c'est ce qui la sépare de la zéro.",
    "Ne compte pas les consciences : un récit peut entrer dans deux têtes sans être en focalisation zéro. Cherche un savoir qui n'appartient à AUCUN personnage."),

  item("2de_nar_changer_focalisation_tpl_2", "narration_2de", "2de_nar_changer_focalisation", 4,
    "Pars de l'effet et remonte au changement. Qui en sait le plus, du lecteur ou du personnage ?",
    ["seconde", "narration", "template"], "Quel changement de focalisation produit cet effet ?", CAS_CHANGEMENT_INV, CHANGEMENTS,
    "Changer de focalisation, c'est déplacer l'écart de savoir entre le lecteur et le personnage — et c'est cet écart qui fait le suspense, l'ironie ou la pitié. Quand le lecteur en sait plus, il attend la catastrophe. Quand il en sait autant, il la découvre avec le personnage. Quand il en sait moins, le personnage devient opaque.",
    "Compare deux savoirs : celui du lecteur et celui du personnage. Le sens du changement est celui de leur écart."),

  item("2de_nar_rythme_tpl_2", "narration_2de", "2de_nar_rythme", 3,
    "Compare deux durées : le temps que l'action a pris, et le temps qu'on met à la lire.",
    ["seconde", "narration", "template"], "Quelle vitesse ce procédé donne-t-il au récit ?", CAS_VITESSE, VITESSES,
    "Le rythme d'un récit se mesure en comparant deux durées : celle de l'histoire racontée et celle du récit qui la raconte. L'ellipse passe une durée en zéro ligne. Le sommaire condense. La scène, souvent dialoguée, se lit à peu près dans le temps qu'elle a duré. La pause descriptive fait avancer les pages pendant que l'action s'arrête.",
    "Demande-toi combien de temps a duré l'action, puis combien de lignes le récit y consacre. Le rapport des deux est le rythme."),

  item("2de_nar_ordre_tpl_2", "narration_2de", "2de_nar_ordre", 3,
    "Rompre la chronologie n'est jamais gratuit : demande-toi ce que la rupture apporte au lecteur.",
    ["seconde", "narration", "template"], "Que le récit gagne-t-il à ce procédé ?", CAS_GAIN_ORDRE, GAINS_ORDRE,
    "Un récit n'est pas obligé de suivre l'ordre des événements. L'analepse revient en arrière pour éclairer ce qu'on ne comprenait pas. La prolepse annonce la suite, et déplace l'intérêt de « quoi » vers « comment ». Le récit dans le récit installe une seconde voix. L'ordre chronologique, lui, fait avancer le lecteur au pas des personnages.",
    "Demande-toi ce que le lecteur sait de plus, ou de moins, à cause de ce déplacement."),

  item("2de_nar_discours_indirect_libre_tpl_2", "narration_2de", "2de_nar_discours_indirect_libre", 3,
    "Deux marques suffisent à trancher : les guillemets, et le « que ». Leur absence à toutes deux est un signe.",
    ["seconde", "narration", "template"], "À quoi le reconnait-on ?", CAS_RECONNAIT, RECONNAIT_PAROLE,
    "Quatre façons de rapporter une parole, et elles se reconnaissent à des marques visibles. Le direct a ses guillemets. L'indirect a son « que » après un verbe de parole. Le narrativisé résume tout en un verbe. Le discours indirect libre n'a ni l'un ni l'autre : la voix du personnage passe dans le récit, et c'est cette superposition qui le rend si difficile à repérer.",
    "Cherche les marques dans l'ordre : guillemets, puis « que », puis verbe résumant. Si aucune n'y est et qu'on entend pourtant le personnage, c'est l'indirect libre."),
];
