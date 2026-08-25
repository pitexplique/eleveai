// lib/tutor-v4/questionBank/3e/francais/argumentation-presse.bank.ts
//
// LIRE L'ARGUMENTATION, DANS LA PRESSE ET DANS L'IMAGE, EN 3e — écrit le
// 13/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique encore à la
// 3e jusqu'en septembre 2028.
//
// ⛔ CE QUI MANQUAIT : une COMPÉTENCE TRAVAILLÉE ENTIÈRE. Le programme range
// « Lire des textes non littéraires, des images et des documents composites (y
// compris numériques) » au même rang que « Élaborer une interprétation de
// textes littéraires ». Elle n'existait nulle part en 3e — le coach ne savait
// lire que de la littérature.
//
// ⭐ CE QUI SÉPARE CETTE BANQUE DE CELLE DE LA 4e : la 4e reconnait la NATURE
// des documents, leur source, le plan et l'angle d'une image, les procédés du
// dessin de presse. En 3e, le programme insiste sur l'ARGUMENTATION — celle des
// textes de presse et celle des images. On interroge donc la thèse et ses
// appuis, les procédés qui cherchent à convaincre ou à persuader, la titraille
// d'un article, ce qu'une image fait dire sans le prouver, la fiabilité d'une
// information numérique, et l'ironie, que « Dénoncer les travers de la société »
// rend indispensable.
// ⛔ Aucun item n'est repris de `4e/francais/documents-composites.bank.ts`.
//
// ⚠️ Aucun document réel n'est reproduit, et aucun texte d'auteur : chaque cas
// est décrit ou écrit en une ligne, ici. Un élève doit pouvoir répondre sans
// avoir le document sous les yeux, parce que ce qui s'interroge est la MÉTHODE
// de lecture, pas un document précis.
//
// ⛔ QCM uniquement, quatre propositions.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
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

type Cas = { readonly gauche: string; readonly droite: string };

/* =============================================================================
   1. THÈSE, ARGUMENTS, EXEMPLES
   ---------------------------------------------------------------------------
   ⚠️ La thèse défendue est DONNÉE dans l'énoncé. Sans elle, « le tourisme fait
   vivre la côte » peut être une thèse, une objection ou une concession selon le
   texte d'où on l'a tirée : trois lignes seraient vraies à la fois.
   ========================================================================== */

type Role = { readonly these: string; readonly phrase: string; readonly rep: string };

const ROLES: readonly Role[] = [
  { these: "il faut interdire le téléphone au collège", phrase: "Le téléphone n'a pas sa place dans un collège.", rep: "la thèse : c'est l'opinion que l'auteur défend d'un bout à l'autre" },
  { these: "il faut interdire le téléphone au collège", phrase: "Il empêche les élèves de se parler pendant la récréation.", rep: "un argument : c'est une raison donnée à l'appui de la thèse défendue" },
  { these: "il faut interdire le téléphone au collège", phrase: "Dans une classe de 4e de Saint-Pierre, dix élèves sur vingt-huit ont déjà été filmés sans leur accord.", rep: "un exemple : c'est un cas précis, qui rend un argument sensible" },
  { these: "il faut interdire le téléphone au collège", phrase: "Certains diront que le téléphone permet de joindre ses parents.", rep: "la thèse adverse : c'est l'opinion que l'auteur combat tout du long" },
  { these: "il faut interdire le téléphone au collège", phrase: "Il est vrai qu'un téléphone rassure les familles ; cela ne justifie pas qu'on l'utilise en cours.", rep: "une concession : l'auteur accorde un point à l'adversaire, puis le réfute" },

  { these: "il faut protéger le lagon", phrase: "Le lagon ne survivra pas à dix ans de plus de ce régime.", rep: "la thèse : c'est l'opinion que l'auteur défend d'un bout à l'autre" },
  { these: "il faut protéger le lagon", phrase: "Le corail meurt dès que l'eau dépasse durablement trente degrés.", rep: "un argument : c'est une raison donnée à l'appui de la thèse défendue" },
  { these: "il faut protéger le lagon", phrase: "À l'Ermitage, la couverture corallienne est passée de 40 % à 15 % en vingt ans.", rep: "un exemple : c'est un cas précis, qui rend un argument sensible" },
  { these: "il faut protéger le lagon", phrase: "On objectera que le tourisme fait vivre la côte.", rep: "la thèse adverse : c'est l'opinion que l'auteur combat tout du long" },
  { these: "il faut protéger le lagon", phrase: "Le tourisme fait vivre la côte, c'est entendu — encore faut-il qu'il reste quelque chose à voir.", rep: "une concession : l'auteur accorde un point à l'adversaire, puis le réfute" },

  { these: "lire des romans sert à quelque chose", phrase: "Lire des romans n'est pas du temps perdu.", rep: "la thèse : c'est l'opinion que l'auteur défend d'un bout à l'autre" },
  { these: "lire des romans sert à quelque chose", phrase: "Un roman fait entrer dans une tête qui n'est pas la sienne.", rep: "un argument : c'est une raison donnée à l'appui de la thèse défendue" },
  { these: "lire des romans sert à quelque chose", phrase: "Un élève de 3e qui avait lu quinze romans dans l'année a rendu la meilleure copie du brevet blanc.", rep: "un exemple : c'est un cas précis, qui rend un argument sensible" },
  { these: "lire des romans sert à quelque chose", phrase: "Beaucoup pensent qu'un documentaire apprend davantage.", rep: "la thèse adverse : c'est l'opinion que l'auteur combat tout du long" },
  { these: "lire des romans sert à quelque chose", phrase: "Un documentaire apprend des faits, sans doute ; il n'apprend pas ce que l'on ressent.", rep: "une concession : l'auteur accorde un point à l'adversaire, puis le réfute" },

  { these: "le sentier du Piton doit rester fermé", phrase: "Ce sentier doit rester fermé tant que la paroi n'est pas stabilisée.", rep: "la thèse : c'est l'opinion que l'auteur défend d'un bout à l'autre" },
  { these: "le sentier du Piton doit rester fermé", phrase: "Chaque année, les secours y interviennent une dizaine de fois.", rep: "un argument : c'est une raison donnée à l'appui de la thèse défendue" },
  { these: "le sentier du Piton doit rester fermé", phrase: "En 2024, deux randonneurs y ont passé la nuit à attendre l'hélicoptère.", rep: "un exemple : c'est un cas précis, qui rend un argument sensible" },
];

const TOUS_ROLES: readonly string[] = [...new Set(ROLES.map((r) => r.rep))];

/* =============================================================================
   2. CONVAINCRE OU PERSUADER
   ---------------------------------------------------------------------------
   ⚠️ Les deux façons de persuader sont écrites de manière EXCLUSIVE : celle qui
   passe par l'émotion n'interpelle personne, celle qui prend à partie pose une
   question ou dit « vous ». Sans cela, « Voulez-vous vraiment que vos enfants
   nagent dans une eau morte ? » relèverait des deux.
   ========================================================================== */

const PROCEDES: readonly Cas[] = [
  { gauche: "En vingt ans, la couverture corallienne est passée de 40 % à 15 %.", droite: "convaincre par la preuve seule : il avance un chiffre ou un constat, et ne réfute rien" },
  { gauche: "Trois établissements sur quatre ont déjà franchi le seuil.", droite: "convaincre par la preuve seule : il avance un chiffre ou un constat, et ne réfute rien" },
  { gauche: "Les études menées depuis dix ans concordent toutes.", droite: "convaincre par la preuve seule : il avance un chiffre ou un constat, et ne réfute rien" },
  { gauche: "Le taux d'absentéisme a baissé de douze points en deux ans.", droite: "convaincre par la preuve seule : il avance un chiffre ou un constat, et ne réfute rien" },

  { gauche: "Il ne restera rien à montrer à nos petits-enfants.", droite: "persuader par l'émotion : il choisit des mots qui touchent, sans interpeller personne" },
  { gauche: "Ceux qui ont grandi ici se souviennent d'une eau claire ; leurs enfants ne la connaitront pas.", droite: "persuader par l'émotion : il choisit des mots qui touchent, sans interpeller personne" },
  { gauche: "Un enfant filmé sans le savoir n'oublie jamais tout à fait cette journée-là.", droite: "persuader par l'émotion : il choisit des mots qui touchent, sans interpeller personne" },

  { gauche: "Voulez-vous vraiment que vos enfants nagent dans une eau morte ?", droite: "persuader en prenant le lecteur à partie : il s'adresse à lui par « vous » ou « nous »" },
  { gauche: "Nous savons tous, au fond, ce qu'il faudrait faire.", droite: "persuader en prenant le lecteur à partie : il s'adresse à lui par « vous » ou « nous »" },
  { gauche: "Et vous, qu'auriez-vous fait à sa place ?", droite: "persuader en prenant le lecteur à partie : il s'adresse à lui par « vous » ou « nous »" },

  { gauche: "On nous dit que le tourisme fait vivre la côte. Vivre de quoi, quand il n'y aura plus rien à voir ?", droite: "convaincre en réfutant : il reprend l'objection de l'adversaire, puis la démonte" },
  { gauche: "Certains prétendent que le problème vient d'ailleurs. Les mesures faites au large disent le contraire.", droite: "convaincre en réfutant : il reprend l'objection de l'adversaire, puis la démonte" },
  { gauche: "On oppose souvent la liberté à la règle. La règle est pourtant ce qui rend la liberté possible.", droite: "convaincre en réfutant : il reprend l'objection de l'adversaire, puis la démonte" },

  { gauche: "Le lagon est un poumon : on ne coupe pas la respiration d'une île.", droite: "frapper par une image : il fait voir l'idée au lieu de la démontrer, et l'on retient" },
  { gauche: "Ce collège n'est pas une usine, et les élèves ne sont pas des pièces.", droite: "frapper par une image : il fait voir l'idée au lieu de la démontrer, et l'on retient" },
  { gauche: "Interdire sans expliquer, c'est bâtir un mur sans porte.", droite: "frapper par une image : il fait voir l'idée au lieu de la démontrer, et l'on retient" },
];

const TOUS_PROCEDES: readonly string[] = [...new Set(PROCEDES.map((p) => p.droite))];

/* =============================================================================
   3. LA TITRAILLE
   ---------------------------------------------------------------------------
   Tout ce qui, dans un article, n'est pas l'article — et qui pourtant décide de
   ce qu'on en retiendra. Chaque élément se reconnait à sa PLACE et à sa
   fonction, jamais à son contenu.
   ========================================================================== */

const TITRAILLE: readonly Cas[] = [
  { gauche: "En haut de l'article, en gros caractères : « Le lagon perd son corail ».", droite: "le titre : il annonce le sujet de l'article et lui donne son angle" },
  { gauche: "Trois mots en très grand, en haut de la page : « Le sentier rouvre ».", droite: "le titre : il annonce le sujet de l'article et lui donne son angle" },
  { gauche: "Une phrase courte tout en haut, qui donne l'angle : « Trop de collégiens dorment mal ».", droite: "le titre : il annonce le sujet de l'article et lui donne son angle" },

  { gauche: "Sous le titre, cinq lignes en gras qui résument toute l'enquête.", droite: "le chapô : il résume l'essentiel en quelques lignes, juste sous le titre" },
  { gauche: "Un paragraphe court, en italique, qui donne l'essentiel avant que l'article commence.", droite: "le chapô : il résume l'essentiel en quelques lignes, juste sous le titre" },
  { gauche: "Quelques lignes qui répondent à qui, quoi, où et quand, avant le premier paragraphe.", droite: "le chapô : il résume l'essentiel en quelques lignes, juste sous le titre" },

  { gauche: "Au milieu de l'article, en gras : « Des mesures encore insuffisantes ».", droite: "l'intertitre : il découpe l'article en parties et relance la lecture" },
  { gauche: "Une ligne en gras qui coupe l'article en deux et annonce la suite.", droite: "l'intertitre : il découpe l'article en parties et relance la lecture" },
  { gauche: "Un titre secondaire au milieu de la page : « Ce qu'en disent les familles ».", droite: "l'intertitre : il découpe l'article en parties et relance la lecture" },

  { gauche: "Sous la photographie : « L'Ermitage, le 4 mars 2026. Photo B. Hoarau ».", droite: "la légende : elle dit ce que l'image montre, et aussi d'où elle vient" },
  { gauche: "Sous l'image : « Vue du piton depuis Cilaos. AFP ».", droite: "la légende : elle dit ce que l'image montre, et aussi d'où elle vient" },
  { gauche: "Sous le dessin : « Illustration de Tehem, publiée le 12 mai ».", droite: "la légende : elle dit ce que l'image montre, et aussi d'où elle vient" },

  { gauche: "La toute première phrase : « Il y a vingt ans, on y voyait les poissons depuis la plage. »", droite: "l'accroche : la première phrase de l'article, celle qui retient le lecteur" },
  { gauche: "L'article s'ouvre sur : « Personne, ce matin-là, n'avait prévu le vent. »", droite: "l'accroche : la première phrase de l'article, celle qui retient le lecteur" },
  { gauche: "La première ligne : « Trois cents. C'est le nombre de dossiers en attente. »", droite: "l'accroche : la première phrase de l'article, celle qui retient le lecteur" },

  { gauche: "En fin d'article : « Marie Payet, envoyée spéciale ».", droite: "la signature : elle dit qui a écrit l'article, et engage sa responsabilité" },
  { gauche: "Sous le titre, un nom et une fonction : « Par Karim Dijoux, correspondant ».", droite: "la signature : elle dit qui a écrit l'article, et engage sa responsabilité" },
  { gauche: "Au bas de la page : « Reportage de l'équipe locale ».", droite: "la signature : elle dit qui a écrit l'article, et engage sa responsabilité" },
];

const TOUTE_TITRAILLE: readonly string[] = [...new Set(TITRAILLE.map((t) => t.droite))];

/* =============================================================================
   4. COMMENT UNE IMAGE ARGUMENTE
   ---------------------------------------------------------------------------
   ⛔ Ni le plan, ni l'angle, ni la lumière : ils appartiennent à la 4e. Ce qui
   se joue ici est autre chose — comment une image FAIT CONCLURE sans rien
   démontrer.
   ========================================================================== */

const IMAGES: readonly Cas[] = [
  { gauche: "La photo montre une plage déserte ; à trois mètres à gauche, hors champ, un parking plein.", droite: "le cadrage exclut : ce qui reste en dehors du cadre fait partie de l'argument" },
  { gauche: "On voit dix manifestants serrés ; le cadre s'arrête juste avant la place vide.", droite: "le cadrage exclut : ce qui reste en dehors du cadre fait partie de l'argument" },
  { gauche: "Le cliché montre une salle de classe pleine ; les rangées vides du fond ont été coupées.", droite: "le cadrage exclut : ce qui reste en dehors du cadre fait partie de l'argument" },

  { gauche: "Le même cliché d'une foule parait sous deux légendes : « soutien massif » ici, « rassemblement clairsemé » là.", droite: "la légende oriente : le même cliché change de sens selon ce qu'on écrit au-dessous" },
  { gauche: "Sous une photo d'enfants qui courent : « la joie de la rentrée » — ou bien « une cour saturée ».", droite: "la légende oriente : le même cliché change de sens selon ce qu'on écrit au-dessous" },
  { gauche: "Une photo de barque échouée, légendée « après le cyclone », puis « chantier à l'abandon ».", droite: "la légende oriente : le même cliché change de sens selon ce qu'on écrit au-dessous" },

  { gauche: "À gauche, la courbe des températures ; à droite, la photo d'un corail blanchi.", droite: "le rapprochement conclut : deux images côte à côte suggèrent un lien que nul ne prouve" },
  { gauche: "Sur la même page, le portrait d'un élu et l'image d'un chantier arrêté.", droite: "le rapprochement conclut : deux images côte à côte suggèrent un lien que nul ne prouve" },
  { gauche: "Deux photos côte à côte : la plage en 1990, la plage aujourd'hui.", droite: "le rapprochement conclut : deux images côte à côte suggèrent un lien que nul ne prouve" },

  { gauche: "Les personnes ont été placées, la lumière installée, et l'on a attendu le bon moment.", droite: "la mise en scène compose : la photo n'a pas été prise, elle a été fabriquée de A à Z" },
  { gauche: "Tout le monde regarde l'objectif, aligné devant le bâtiment neuf.", droite: "la mise en scène compose : la photo n'a pas été prise, elle a été fabriquée de A à Z" },
  { gauche: "La table a été dressée et les dossiers posés avant que le photographe entre.", droite: "la mise en scène compose : la photo n'a pas été prise, elle a été fabriquée de A à Z" },

  { gauche: "L'image saisit le maire les yeux fermés, au milieu d'un discours d'une heure.", droite: "le choix de l'instant juge : une simple fraction de seconde passe pour un caractère" },
  { gauche: "Le joueur est photographié au moment exact où il grimace.", droite: "le choix de l'instant juge : une simple fraction de seconde passe pour un caractère" },
  { gauche: "Sur les deux cents clichés pris ce jour-là, celui-ci est le seul où elle ne sourit pas.", droite: "le choix de l'instant juge : une simple fraction de seconde passe pour un caractère" },
];

const TOUTES_IMAGES: readonly string[] = [...new Set(IMAGES.map((i) => i.droite))];

/* =============================================================================
   5. LA FIABILITÉ D'UNE INFORMATION NUMÉRIQUE
   ---------------------------------------------------------------------------
   ⚠️ Six états, et le plus utile n'est pas « c'est faux » : c'est la différence
   entre une information INVÉRIFIABLE — plus rien ne mène à sa source — et une
   information seulement INVÉRIFIÉE, dont la source existe et qu'il reste à
   ouvrir. La seconde se répare en trois clics ; la première, jamais.
   ========================================================================== */

const FIABILITE: readonly Cas[] = [
  { gauche: "Une capture d'écran circule, sans nom de journal ni date.", droite: "invérifiable : plus rien, dans ce qui est publié, ne mène à la source" },
  { gauche: "Un chiffre est repris dans un message vocal, sans que personne sache qui l'a mesuré.", droite: "invérifiable : plus rien, dans ce qui est publié, ne mène à la source" },
  { gauche: "Une vidéo est publiée par un compte créé la semaine dernière, sans aucune autre publication.", droite: "invérifiable : plus rien, dans ce qui est publié, ne mène à la source" },

  { gauche: "Un article dit « selon une étude de l'IRD publiée en janvier », sans lien vers l'étude.", droite: "invérifiée mais vérifiable : la source est nommée, il ne reste qu'à la lire" },
  { gauche: "Un message renvoie à un rapport officiel dont il donne le titre exact, mais pas le passage.", droite: "invérifiée mais vérifiable : la source est nommée, il ne reste qu'à la lire" },
  { gauche: "Une infographie porte « INSEE, 2025 » en tout petit sous le graphique.", droite: "invérifiée mais vérifiable : la source est nommée, il ne reste qu'à la lire" },

  { gauche: "Quarante comptes publient la même phrase, mot pour mot, en une heure.", droite: "une apparence de nombre : c'est une seule source recopiée, et non des preuves" },
  { gauche: "Cinq sites reprennent l'information ; tous citent le même communiqué de presse.", droite: "une apparence de nombre : c'est une seule source recopiée, et non des preuves" },
  { gauche: "L'information est « partout », mais chaque page renvoie à la précédente.", droite: "une apparence de nombre : c'est une seule source recopiée, et non des preuves" },

  { gauche: "En haut du résultat de recherche, une mention discrète : « Annonce ».", droite: "un contenu sponsorisé : quelqu'un a payé pour qu'il apparaisse ici même" },
  { gauche: "Une vidéo vante un produit, et la description porte « en partenariat avec la marque ».", droite: "un contenu sponsorisé : quelqu'un a payé pour qu'il apparaisse ici même" },
  { gauche: "Un billet de blog se termine par un lien d'achat et un code de réduction.", droite: "un contenu sponsorisé : quelqu'un a payé pour qu'il apparaisse ici même" },

  { gauche: "La page des horaires du car date de 2019, et la ligne a été réorganisée depuis.", droite: "une information périmée : elle a pu être juste en son temps, plus depuis" },
  { gauche: "Une carte des zones interdites circule sans qu'on voie qu'elle a trois ans.", droite: "une information périmée : elle a pu être juste en son temps, plus depuis" },
  { gauche: "Un tarif est repris d'une page mise à jour pour la dernière fois en 2021.", droite: "une information périmée : elle a pu être juste en son temps, plus depuis" },

  { gauche: "L'article nomme l'organisme, donne la date de mesure et explique comment le comptage a été fait.", droite: "vérifiable et vérifiée : source nommée, date donnée, méthode expliquée" },
  { gauche: "La page indique l'auteur, la date de publication et la date de dernière mise à jour.", droite: "vérifiable et vérifiée : source nommée, date donnée, méthode expliquée" },
  { gauche: "Le graphique porte son unité, sa source et l'échantillon sur lequel il a été construit.", droite: "vérifiable et vérifiée : source nommée, date donnée, méthode expliquée" },
];

const TOUTES_FIABILITES: readonly string[] = [...new Set(FIABILITE.map((f) => f.droite))];

/* =============================================================================
   6. L'IRONIE
   ---------------------------------------------------------------------------
   « Dénoncer les travers de la société » ne se lit pas sans elle. ⚠️ La ligne
   « au premier degré » n'est pas un remplissage : sans elle, l'élève apprend
   que tout est ironique, ce qui est l'erreur exactement inverse — et la plus
   fréquente.
   ========================================================================== */

const IRONIE: readonly Cas[] = [
  { gauche: "Quelle excellente idée d'avoir supprimé le seul car qui montait aux hauts !", droite: "l'ironie : la phrase dit tout le contraire de ce qu'elle veut faire entendre" },
  { gauche: "Bravo : trois heures de queue pour un formulaire qu'on remplit en deux minutes.", droite: "l'ironie : la phrase dit tout le contraire de ce qu'elle veut faire entendre" },
  { gauche: "On nous explique qu'il n'y a pas d'argent. Heureusement, la nouvelle façade est magnifique.", droite: "l'ironie : la phrase dit tout le contraire de ce qu'elle veut faire entendre" },
  { gauche: "Rien de tel qu'une salle sans fenêtre pour donner le gout d'apprendre.", droite: "l'ironie : la phrase dit tout le contraire de ce qu'elle veut faire entendre" },

  { gauche: "Il n'y a pas un mètre carré de la côte qui n'ait été bétonné dix fois.", droite: "l'exagération : elle grossit le trait pour rendre le défaut bien visible" },
  { gauche: "Le dossier a traversé quatorze bureaux, deux ministères et un océan avant de revenir vide.", droite: "l'exagération : elle grossit le trait pour rendre le défaut bien visible" },
  { gauche: "Chaque matin, l'île entière semble s'être donné rendez-vous sur la même route.", droite: "l'exagération : elle grossit le trait pour rendre le défaut bien visible" },

  { gauche: "Je ne comprends pas : si l'eau est potable, pourquoi les bureaux reçoivent-ils des bouteilles ?", droite: "la fausse naïveté : il feint de ne pas comprendre pour forcer à s'expliquer" },
  { gauche: "Quelqu'un pourrait-il m'expliquer pourquoi il faut un justificatif de domicile pour prouver qu'on n'en a pas ?", droite: "la fausse naïveté : il feint de ne pas comprendre pour forcer à s'expliquer" },
  { gauche: "J'aimerais qu'on m'explique comment on révise sans manuel.", droite: "la fausse naïveté : il feint de ne pas comprendre pour forcer à s'expliquer" },

  { gauche: "Le sentier est fermé depuis le 3 mars pour raisons de sécurité.", droite: "le premier degré : la phrase dit exactement ce qu'elle veut faire entendre" },
  { gauche: "Trois classes de 3e ont participé au projet cette année.", droite: "le premier degré : la phrase dit exactement ce qu'elle veut faire entendre" },
  { gauche: "La collecte des déchets a lieu le mardi et le vendredi.", droite: "le premier degré : la phrase dit exactement ce qu'elle veut faire entendre" },

  { gauche: "L'établissement connait « quelques tensions » depuis la rentrée.", droite: "l'euphémisme : il atténue les mots pour ne pas nommer la chose" },
  { gauche: "On parle d'une « réorganisation » du service ; quatre postes sur cinq ont disparu.", droite: "l'euphémisme : il atténue les mots pour ne pas nommer la chose" },
  { gauche: "Il nous a quittés la semaine dernière.", droite: "l'euphémisme : il atténue les mots pour ne pas nommer la chose" },
];

const TOUTES_IRONIES: readonly string[] = [...new Set(IRONIE.map((i) => i.droite))];

function gabarit(
  id: string,
  microId: string,
  notionId: string,
  table: readonly Cas[],
  pool: readonly string[],
  question: string,
  difficulty: 2 | 3,
  hint: string,
  definition: string,
  methode: string,
  tags: readonly string[],
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "3e",
    matiere: "francais",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [...tags],
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `${c.gauche}\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.droite, pool),
        expected: [c.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `${c.gauche} → ${c.droite}.`, `${c.droite.charAt(0).toUpperCase()}${c.droite.slice(1)}.`),
      };
    },
  };
}

export const argumentationPresse3eBank: TutorBankItemV4[] = [
  {
    kind: "template",
    id: "3e_lect_these_arguments_tpl_1",
    niveau: "3e",
    matiere: "francais",
    notionId: "lecture_comprehension",
    microId: "3e_lect_these_arguments",
    difficulty: 3,
    theme: "neutral",
    hint: "La thèse défendue t'est donnée. Demande-toi si la phrase la POSE, l'APPUIE, l'ILLUSTRE ou la COMBAT.",
    tags: ["3e", "lecture", "argumentation", "these", "template"],
    generate: () => {
      const r = randomChoice(ROLES);
      return {
        text: `Dans un texte qui défend l'idée que ${r.these} :\n\n« ${r.phrase} »\n\nQuel rôle cette phrase joue-t-elle ?`,
        format: "qcm" as const,
        choices: makeChoices(r.rep, TOUS_ROLES),
        expected: [r.rep],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un texte qui argumente s'organise toujours de la même façon. La thèse est l'opinion défendue. Les arguments sont les raisons qui la soutiennent. Les exemples sont les cas précis qui rendent un argument visible. Et l'auteur cite souvent la thèse adverse, soit pour la combattre, soit pour lui accorder un point avant de la réfuter : c'est la concession.",
          "Un exemple se reconnait à ce qu'il est daté, situé, chiffré ou nommé. Un argument, lui, est général. Et quand une phrase donne raison à l'adversaire avant un « mais » ou un « pourtant », c'est une concession — pas un revirement.",
          `« ${r.phrase} » est ${r.rep}.`,
          `${r.rep.charAt(0).toUpperCase()}${r.rep.slice(1)}.`,
        ),
      };
    },
  },
  gabarit(
    "3e_lect_procedes_argumentatifs_tpl_1",
    "3e_lect_procedes_argumentatifs",
    "lecture_comprehension",
    PROCEDES,
    TOUS_PROCEDES,
    "Comment l'auteur s'y prend-il ?",
    3,
    "Convaincre s'adresse à la raison ; persuader s'adresse au reste.",
    "Convaincre, c'est amener quelqu'un à penser comme vous par la raison : un chiffre, une preuve, un raisonnement, ou la réfutation de son objection. Persuader, c'est l'emporter autrement : par des mots qui touchent, ou en prenant le lecteur à partie. Une image, elle, ne démontre rien — elle fait voir, et c'est souvent plus efficace.",
    "Demande-toi si la phrase pourrait être vérifiée. Un chiffre se vérifie, une émotion non. Et si la phrase te parle directement — « vous », une question posée au lecteur —, elle cherche à te prendre à partie.",
    ["3e", "lecture", "argumentation", "convaincre", "persuader", "template"],
  ),
  gabarit(
    "3e_lect_titraille_tpl_1",
    "3e_lect_titraille",
    "lecture_comprehension",
    TITRAILLE,
    TOUTE_TITRAILLE,
    "De quel élément de la titraille s'agit-il ?",
    2,
    "Chaque élément se reconnait à sa PLACE dans la page, pas à ce qu'il raconte.",
    "La titraille, c'est tout ce qui entoure l'article : le titre donne l'angle, le chapô résume sous le titre, les intertitres découpent et relancent, la légende accompagne l'image, l'accroche est la première phrase du texte, et la signature dit qui écrit. Ces éléments sont souvent écrits par quelqu'un d'autre que l'auteur de l'article.",
    "Situe l'élément avant de le nommer : au-dessus du texte, sous le titre, au milieu, sous une image, ou à la fin. La place suffit presque toujours.",
    ["3e", "lecture", "presse", "titraille", "template"],
  ),
  gabarit(
    "3e_lect_image_argument_tpl_1",
    "3e_lect_image_argument",
    "lecture_comprehension",
    IMAGES,
    TOUTES_IMAGES,
    "Comment cette image argumente-t-elle ?",
    3,
    "Une image ne ment presque jamais. Ce qui argumente, c'est ce qu'on en a fait.",
    "Une photographie peut être exacte et faire pourtant conclure faux. Le cadre décide de ce qu'on ne verra pas. La légende décide de ce que l'on croit voir. Deux images posées côte à côte suggèrent un lien qu'aucune des deux ne prouve. Une scène peut avoir été composée avant d'être prise. Et l'instant choisi, sur des centaines, fige une expression qu'on prendra pour un caractère.",
    "Pose trois questions : qu'y a-t-il juste à côté du cadre ? qui a écrit la légende ? et pourquoi cette image-là est-elle voisine de celle-là ?",
    ["3e", "lecture", "image", "argumentation", "template"],
  ),
  gabarit(
    "3e_lect_fiabilite_numerique_tpl_1",
    "3e_lect_fiabilite_numerique",
    "lecture_comprehension",
    FIABILITE,
    TOUTES_FIABILITES,
    "Que peut-on dire de cette information ?",
    3,
    "« Je ne l'ai pas vérifiée » et « je ne peux pas la vérifier » ne sont pas la même chose.",
    "Une information numérique se juge à ce qu'elle permet de faire. Si l'on peut remonter à la source, elle est vérifiable — même si personne ne l'a encore fait. Si l'on ne le peut pas, elle ne vaut rien, quelle que soit sa vraisemblance. La répétition ne confirme rien : quarante comptes qui recopient la même phrase font une seule source. Et une page exacte en 2019 peut être fausse aujourd'hui.",
    "Cherche trois choses : qui l'affirme, quand, et comment il le sait. Puis, quand plusieurs pages disent la même chose, remonte chacune : très souvent elles mènent au même communiqué.",
    ["3e", "lecture", "numerique", "fiabilite", "emi", "template"],
  ),
  gabarit(
    "3e_discours_ironie_tpl_1",
    "3e_discours_ironie",
    "analyse_discours",
    IRONIE,
    TOUTES_IRONIES,
    "Quel procédé la phrase emploie-t-elle ?",
    3,
    "Attention : tout n'est pas ironique. Une phrase qui informe informe, et c'est tout.",
    "L'ironie dit le contraire de ce qu'elle veut faire entendre, et compte sur le lecteur pour rétablir. Elle voisine avec d'autres procédés de la dénonciation : l'exagération, qui grossit le trait ; la fausse naïveté, qui feint l'incompréhension pour obliger à s'expliquer ; l'euphémisme, qui atténue pour ne pas nommer. Mais beaucoup de phrases ne font rien de tout cela : elles disent ce qu'elles disent.",
    "Demande-toi si la phrase, prise au mot, est absurde ou insoutenable. Si oui, cherche ce qu'elle veut faire entendre. Si non — un horaire, un effectif, une date —, ne cherche rien : elle est au premier degré.",
    ["3e", "discours", "ironie", "denonciation", "template"],
  ),
];
