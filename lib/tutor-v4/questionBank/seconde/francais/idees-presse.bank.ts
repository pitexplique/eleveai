// lib/tutor-v4/questionBank/seconde/francais/idees-presse.bank.ts
//
// LA LITTÉRATURE D'IDÉES ET LA PRESSE DU XIXe AU XXIe SIÈCLE — 14/08/2026.
//
// RÉFÉRENCE : programme de seconde, arrêté du 17 janvier 2019 modifié par le
// JORF du 8 octobre 2020, deuxième objet d'étude :
//   « L'analyse et l'interprétation des textes et documents amènent les élèves
//   à DÉGAGER LA VISÉE D'UNE ARGUMENTATION, à EN DÉTERMINER LES PRÉSUPPOSÉS et
//   à L'INSCRIRE DANS UN COURANT DE PENSÉE plus large. »
//   Formes nommées : « chanson ou poème à visée argumentative, récit, roman,
//   discours, article, essai, plaidoirie ».
//   Exercices : « la contraction de texte ; […] l'essai ; le débat ; LE DISCOURS
//   ÉPIDICTIQUE, JUDICIAIRE OU DÉLIBÉRATIF ».
//
// ⭐ Les trois genres du discours sont nommés PAR LE PROGRAMME. Ils sont fermés,
// vérifiables, et absents du collège : c'est du QCM parfait, et c'est du lycée.
//
// ⚠️ RÈGLE DU 13/08 — DEUX RÉPONSES D'UN MÊME POOL NE DOIVENT JAMAIS
// S'EMBOITER. Une fable EST de l'argumentation indirecte ; une réfutation EST
// un raisonnement. Chaque ligne exclut donc les autres explicitement.
// ⛔ Aucune personne réelle, aucun parti, aucune actualité : les exemples sont
// scolaires et neutres. On apprend à lire un discours, pas à en juger un.
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
type CasFaux = { readonly enonce: string; readonly bonne: string; readonly faux: readonly string[]; readonly raison: string };

/* ===================== 1. THÈSE ET VISÉE (2de_arg_these_visee) ===================== */

const VISEES: readonly string[] = [
  "convaincre par la preuve, en s'adressant à la raison du lecteur",
  "émouvoir le lecteur, pour que le sentiment le pousse à agir",
  "faire rire d'un travers, afin qu'on cesse de le trouver normal",
  "exposer les faits sans trancher, en laissant le lecteur conclure",
];

const CAS_VISEE: readonly Cas[] = [
  { enonce: "« Trois chiffres suffisent : la salle compte trente places, la classe en compte trente-cinq, et nul n'a prévu les cinq autres. »", rep: "convaincre par la preuve, en s'adressant à la raison du lecteur", raison: "le texte aligne des données vérifiables" },
  { enonce: "« Regardez ces enfants qui attendent dehors, sous la pluie, leur cartable trempé, et dites-moi que rien ne presse. »", rep: "émouvoir le lecteur, pour que le sentiment le pousse à agir", raison: "le texte peint une scène pour susciter la pitié" },
  { enonce: "« Le règlement interdit de courir dans les couloirs ; il autorise donc, semble-t-il, d'y galoper. »", rep: "faire rire d'un travers, afin qu'on cesse de le trouver normal", raison: "l'ironie souligne l'absurdité de la règle" },
  { enonce: "« Le conseil s'est tenu le douze ; deux propositions ont été faites, la première par les délégués, la seconde par l'administration. »", rep: "exposer les faits sans trancher, en laissant le lecteur conclure", raison: "aucun jugement n'est porté sur les deux propositions" },
  { enonce: "« Sur trois ans, la fréquentation a doublé pendant que le budget baissait d'un tiers. »", rep: "convaincre par la preuve, en s'adressant à la raison du lecteur", raison: "deux chiffres opposés portent la démonstration" },
  { enonce: "« Il avait douze ans, il aimait lire, et l'on a fermé la seule bibliothèque de son quartier. »", rep: "émouvoir le lecteur, pour que le sentiment le pousse à agir", raison: "le cas particulier est raconté pour toucher" },
  { enonce: "« On nous promet une salle neuve pour la rentrée. Laquelle, on l'ignore encore. »", rep: "faire rire d'un travers, afin qu'on cesse de le trouver normal", raison: "la chute ironique dénonce une promesse vide" },
  { enonce: "« Deux positions s'affrontent : les uns invoquent le coût, les autres l'urgence. Le vote aura lieu jeudi. »", rep: "exposer les faits sans trancher, en laissant le lecteur conclure", raison: "les deux camps sont rapportés à égalité" },
  { enonce: "« L'étude porte sur mille élèves et conclut à un écart de deux points, mesuré trois années de suite. »", rep: "convaincre par la preuve, en s'adressant à la raison du lecteur", raison: "l'appui est chiffré et répété" },
  { enonce: "« Songez à ce que ressent celui qui, chaque matin, doit renoncer à ce que les autres reçoivent sans y penser. »", rep: "émouvoir le lecteur, pour que le sentiment le pousse à agir", raison: "l'appel au sentiment est explicite" },
  { enonce: "« Nous manquons de livres, mais nous avons trois logiciels pour compter ceux qui manquent. »", rep: "faire rire d'un travers, afin qu'on cesse de le trouver normal", raison: "le rapprochement absurde fait la critique" },
  { enonce: "« Le texte a été adopté par vingt voix contre douze, après une séance de deux heures. »", rep: "exposer les faits sans trancher, en laissant le lecteur conclure", raison: "le compte rendu se contente de rapporter" },
  { enonce: "« Aucune des trois solutions proposées n'a jamais été essayée nulle part : c'est le seul point sûr. »", rep: "convaincre par la preuve, en s'adressant à la raison du lecteur", raison: "l'argument repose sur un fait vérifiable" },
  { enonce: "« Elle a attendu deux ans une réponse ; elle est partie sans l'avoir reçue. »", rep: "émouvoir le lecteur, pour que le sentiment le pousse à agir", raison: "le récit bref cherche l'émotion" },
  { enonce: "« On a supprimé les chaises pour éviter qu'on s'assoie pendant les réunions debout. »", rep: "faire rire d'un travers, afin qu'on cesse de le trouver normal", raison: "l'absurde révèle le travers" },
  { enonce: "« Le rapport compte quarante pages et recense huit mesures possibles, sans en recommander aucune. »", rep: "exposer les faits sans trancher, en laissant le lecteur conclure", raison: "le texte décrit sans conclure" },
];

/* ===================== 2. LE PRÉSUPPOSÉ (2de_arg_presuppose) ===================== */

const PRESUPPOSES: readonly CasFaux[] = [
  { enonce: "« Quand cesserez-vous de gaspiller le budget de la classe ? »", bonne: "qu'il y a bien gaspillage, ce que la question ne démontre jamais", faux: ["que le budget de la classe est suffisant", "que le gaspillage a déjà cessé", "que personne ne gère ce budget"], raison: "la question porte sur la fin du gaspillage, donc admet son existence" },
  { enonce: "« Même les meilleurs élèves ont été surpris par ce sujet. »", bonne: "que la surprise des autres allait de soi", faux: ["que les meilleurs élèves échouent souvent", "que le sujet était conforme au programme", "que personne n'a réussi l'épreuve"], raison: "« même » installe une hiérarchie et suppose l'attendu" },
  { enonce: "« Il a enfin rendu son travail. »", bonne: "qu'on l'attendait depuis trop longtemps", faux: ["que le travail est de bonne qualité", "qu'il ne l'avait jamais commencé", "qu'on ne l'attendait plus du tout"], raison: "« enfin » suppose une attente jugée excessive" },
  { enonce: "« Ce n'est pas la première fois que la salle est fermée sans prévenir. »", bonne: "que cela s'est déjà produit auparavant", faux: ["que la salle est fermée en ce moment", "qu'on avait prévenu la fois précédente", "que la salle ne rouvrira pas"], raison: "la formule renvoie explicitement à des précédents" },
  { enonce: "« Comme chacun sait, la lecture s'apprend d'abord à la maison. »", bonne: "que l'affirmation est admise, alors qu'elle est en débat", faux: ["que la lecture ne s'apprend pas à l'école", "que tout le monde a une maison où lire", "que l'auteur a mené une enquête"], raison: "« comme chacun sait » dispense de prouver" },
  { enonce: "« Il continue de contester le règlement. »", bonne: "qu'il le contestait déjà auparavant", faux: ["que le règlement est injuste", "qu'il vient de découvrir le règlement", "qu'il a obtenu gain de cause"], raison: "« continuer » suppose un état antérieur" },
  { enonce: "« Nous avons retrouvé le calme dans les couloirs. »", bonne: "que le calme avait été perdu", faux: ["que les couloirs sont trop étroits", "que le calme n'avait jamais existé", "que le bruit venait des salles"], raison: "« retrouver » suppose une perte" },
  { enonce: "« Pourquoi refuse-t-elle toujours de participer ? »", bonne: "qu'elle refuse, et de façon répétée", faux: ["qu'elle participe parfois", "qu'on ne lui a jamais demandé", "que sa participation serait utile"], raison: "la question porte sur la cause, donc admet le fait" },
  { enonce: "« Le nouveau règlement est plus clair que l'ancien. »", bonne: "que l'ancien règlement manquait de clarté", faux: ["que le nouveau règlement est parfait", "que personne ne lisait l'ancien", "que les deux règlements se valent"], raison: "le comparatif suppose un défaut chez le terme comparé" },
  { enonce: "« Il a reconnu s'être trompé sur ce point. »", bonne: "qu'il s'était effectivement trompé", faux: ["qu'il se trompe souvent", "qu'il refuse d'admettre ses erreurs", "que l'erreur était sans conséquence"], raison: "« reconnaitre » présente le fait comme établi" },
  { enonce: "« La bibliothèque a rouvert ses portes lundi. »", bonne: "qu'elle avait été fermée avant", faux: ["qu'elle ferme le week-end", "qu'elle n'avait jamais ouvert", "qu'elle rouvrira encore"], raison: "« rouvrir » suppose une fermeture" },
  { enonce: "« Vous avez, une fois encore, oublié de signer. »", bonne: "que l'oubli s'est déjà produit", faux: ["que la signature est facultative", "que le document est incomplet", "que personne ne vérifie les signatures"], raison: "« une fois encore » renvoie à des précédents" },
  { enonce: "« Il faudrait au moins que le texte soit lu avant d'être voté. »", bonne: "que ce n'est pas le cas aujourd'hui", faux: ["que le texte est trop long", "que le vote a été reporté", "que la lecture suffirait à convaincre"], raison: "le conditionnel suppose que la condition n'est pas remplie" },
  { enonce: "« Cette mesure aussi a été abandonnée. »", bonne: "que d'autres mesures l'ont été avant elle", faux: ["que la mesure était inutile", "que la mesure sera reprise", "que personne ne l'avait proposée"], raison: "« aussi » ajoute à une série déjà existante" },
  { enonce: "« Elle a repris ses lectures depuis septembre. »", bonne: "qu'elle les avait interrompues", faux: ["qu'elle lit tous les jours", "qu'elle n'avait jamais lu", "qu'elle lit moins qu'avant"], raison: "« reprendre » suppose un arrêt" },
  { enonce: "« Ce sont encore les mêmes qui se plaignent. »", bonne: "que ces personnes se sont déjà plaintes", faux: ["que leurs plaintes sont justifiées", "que personne d'autre ne se plaint", "que les plaintes ont cessé"], raison: "« encore les mêmes » renvoie à un précédent" },
];

/* ===================== 3. LES TROIS GENRES DU DISCOURS (2de_arg_genres_discours) =====================
   ⭐ Nommés par le programme. Le quatrième cas — l'exposé neutre — existe pour
   que le pool ait quatre lignes vivantes et non trois. */

const GENRES_DISCOURS: readonly string[] = [
  "épidictique : il loue ou il blâme, ici et maintenant",
  "judiciaire : il accuse ou il défend, à propos du passé",
  "délibératif : il conseille ou déconseille, en vue de l'avenir",
  "aucun des trois : il expose sans louer, accuser ni conseiller",
];

const DISCOURS: readonly Cas[] = [
  { enonce: "Un élève prononce l'éloge de sa professeure lors de son départ en retraite.", rep: "épidictique : il loue ou il blâme, ici et maintenant", raison: "il s'agit d'un éloge, prononcé pour la circonstance" },
  { enonce: "Un avocat démontre que son client ne se trouvait pas sur les lieux ce soir-là.", rep: "judiciaire : il accuse ou il défend, à propos du passé", raison: "le débat porte sur des faits passés à établir" },
  { enonce: "Un délégué explique pourquoi la classe devrait choisir le musée plutôt que le théâtre.", rep: "délibératif : il conseille ou déconseille, en vue de l'avenir", raison: "il s'agit d'orienter une décision à venir" },
  { enonce: "Un documentaliste présente le fonctionnement du prêt de livres, sans en recommander l'usage.", rep: "aucun des trois : il expose sans louer, accuser ni conseiller", raison: "l'exposé est purement informatif" },
  { enonce: "Un discours dénonce la lâcheté d'un comportement devant l'assemblée réunie.", rep: "épidictique : il loue ou il blâme, ici et maintenant", raison: "le blâme relève de l'épidictique comme l'éloge" },
  { enonce: "Un procureur soutient que l'accusé a bien commis les faits reprochés.", rep: "judiciaire : il accuse ou il défend, à propos du passé", raison: "l'accusation porte sur le passé" },
  { enonce: "Un rapporteur recommande de reporter le vote à la session suivante.", rep: "délibératif : il conseille ou déconseille, en vue de l'avenir", raison: "la recommandation vise une décision future" },
  { enonce: "Un guide décrit l'histoire du bâtiment sans porter de jugement sur ses architectes.", rep: "aucun des trois : il expose sans louer, accuser ni conseiller", raison: "la description reste neutre" },
  { enonce: "Un orateur célèbre le courage des sauveteurs lors d'une cérémonie.", rep: "épidictique : il loue ou il blâme, ici et maintenant", raison: "la célébration est l'objet même du discours" },
  { enonce: "Un défenseur montre que les preuves réunies ne suffisent pas à établir la faute.", rep: "judiciaire : il accuse ou il défend, à propos du passé", raison: "la défense porte sur des faits passés" },
  { enonce: "Un élu propose de construire une nouvelle salle et détaille ce qu'elle apporterait.", rep: "délibératif : il conseille ou déconseille, en vue de l'avenir", raison: "il s'agit de décider pour l'avenir" },
  { enonce: "Un scientifique rend compte d'une expérience et de ses résultats chiffrés.", rep: "aucun des trois : il expose sans louer, accuser ni conseiller", raison: "le compte rendu ne juge ni ne conseille" },
  { enonce: "Un texte fait le portrait admiratif d'une figure disparue, devant ceux qui l'ont connue.", rep: "épidictique : il loue ou il blâme, ici et maintenant", raison: "l'éloge funèbre est le type même de l'épidictique" },
  { enonce: "Une plaidoirie établit que le contrat n'a pas été respecté l'an dernier.", rep: "judiciaire : il accuse ou il défend, à propos du passé", raison: "le litige porte sur un fait passé" },
  { enonce: "Un rapport déconseille d'engager les travaux avant la fin de la saison des pluies.", rep: "délibératif : il conseille ou déconseille, en vue de l'avenir", raison: "le conseil porte sur une action future" },
  { enonce: "Un article recense les horaires et les tarifs des trois salles de la ville.", rep: "aucun des trois : il expose sans louer, accuser ni conseiller", raison: "l'information est donnée sans orientation" },
];

/* ===================== 4. LES FORMES DE L'ARGUMENTATION (2de_arg_formes) =====================
   ⚠️ EMBOITEMENT ÉVITÉ : « une fable EST de l'argumentation indirecte ». La
   ligne générique dit donc explicitement « sans passer par une histoire ». */

const FORMES_ARG: readonly string[] = [
  "un apologue : une histoire inventée dont on tire une leçon",
  "un essai : une réflexion suivie, où l'auteur s'engage en son nom",
  "une plaidoirie : une défense adressée à ceux qui doivent juger",
  "un article : un texte de presse qui informe ou commente l'actualité",
];

const FORMES_CAS: readonly Cas[] = [
  { enonce: "Un renard flatte un corbeau pour lui prendre son fromage ; la morale tient en deux vers.", rep: "un apologue : une histoire inventée dont on tire une leçon", raison: "une histoire brève suivie d'une morale" },
  { enonce: "L'auteur écrit « je » et avance, chapitre après chapitre, ce qu'il pense du hasard.", rep: "un essai : une réflexion suivie, où l'auteur s'engage en son nom", raison: "réflexion personnelle et suivie" },
  { enonce: "Le texte s'adresse à un tribunal et demande l'acquittement au nom des preuves manquantes.", rep: "une plaidoirie : une défense adressée à ceux qui doivent juger", raison: "l'adresse aux juges et la demande sont explicites" },
  { enonce: "Le texte paraît en page trois, signé, daté, et commente la décision de la veille.", rep: "un article : un texte de presse qui informe ou commente l'actualité", raison: "publication de presse et actualité" },
  { enonce: "Deux animaux discutent du meilleur régime politique, et l'un a manifestement tort.", rep: "un apologue : une histoire inventée dont on tire une leçon", raison: "la fiction animalière porte la démonstration" },
  { enonce: "L'auteur reprend une question qu'il s'est posée toute sa vie et y répond en trente pages.", rep: "un essai : une réflexion suivie, où l'auteur s'engage en son nom", raison: "réflexion longue et personnelle" },
  { enonce: "L'orateur demande aux jurés de se souvenir de ce que la loi exige avant de condamner.", rep: "une plaidoirie : une défense adressée à ceux qui doivent juger", raison: "adresse aux jurés, plaidoyer pour la défense" },
  { enonce: "Le texte rapporte les chiffres du conseil et cite trois personnes présentes.", rep: "un article : un texte de presse qui informe ou commente l'actualité", raison: "compte rendu de presse" },
  { enonce: "Un voyageur découvre un pays où tout marche à l'envers, et le lecteur comprend l'allusion.", rep: "un apologue : une histoire inventée dont on tire une leçon", raison: "l'utopie inversée est une forme d'apologue" },
  { enonce: "L'auteur pèse le pour et le contre à voix haute, et finit par prendre parti.", rep: "un essai : une réflexion suivie, où l'auteur s'engage en son nom", raison: "la pensée se cherche devant le lecteur" },
  { enonce: "Le texte réfute une à une les accusations et conclut en demandant la relaxe.", rep: "une plaidoirie : une défense adressée à ceux qui doivent juger", raison: "réfutation puis demande, devant un tribunal" },
  { enonce: "Le texte porte un titre, un chapeau, et se termine par les initiales de son auteur.", rep: "un article : un texte de presse qui informe ou commente l'actualité", raison: "la mise en page est celle de la presse" },
  { enonce: "Une histoire de loup et d'agneau sert à montrer que le plus fort a toujours raison.", rep: "un apologue : une histoire inventée dont on tire une leçon", raison: "récit bref, leçon générale" },
  { enonce: "L'auteur avance des idées sans prétendre les démontrer, et invite à le contredire.", rep: "un essai : une réflexion suivie, où l'auteur s'engage en son nom", raison: "le doute assumé est propre à l'essai" },
  { enonce: "L'avocat rappelle que son client n'a jamais été condamné et demande l'indulgence.", rep: "une plaidoirie : une défense adressée à ceux qui doivent juger", raison: "la demande d'indulgence s'adresse aux juges" },
  { enonce: "Le texte tient en trente lignes, répond à un événement de la veille, et paraît le lendemain.", rep: "un article : un texte de presse qui informe ou commente l'actualité", raison: "brièveté et actualité immédiate" },
];

/* ===================== 5. CONCESSION ET RÉFUTATION (2de_arg_concession_refutation) =====================
   ⚠️ « Une réfutation EST un raisonnement » : la ligne générique doit exclure
   le cas. Elle dit donc « sans reprendre personne ». */

const MANŒUVRES: readonly string[] = [
  "une concession : il admet un point de l'adversaire pour mieux le retourner",
  "une réfutation : il attaque directement l'argument adverse pour l'abattre",
  "une démonstration : il avance sa preuve sans reprendre personne",
  "une question rhétorique : il fait dire au lecteur ce qu'il ne dit pas lui-même",
];

const CAS_MANŒUVRE: readonly Cas[] = [
  { enonce: "« Je veux bien que la mesure coûte cher. Mais elle coûtera plus cher encore dans cinq ans. »", rep: "une concession : il admet un point de l'adversaire pour mieux le retourner", raison: "le point adverse est accordé puis renversé" },
  { enonce: "« On prétend que la salle est trop petite : elle a accueilli quatre-vingts personnes en juin. »", rep: "une réfutation : il attaque directement l'argument adverse pour l'abattre", raison: "l'argument adverse est cité puis démenti par un fait" },
  { enonce: "« Trois établissements ont essayé cette organisation ; les trois l'ont conservée. »", rep: "une démonstration : il avance sa preuve sans reprendre personne", raison: "la preuve est avancée sans polémique" },
  { enonce: "« Faut-il vraiment attendre un accident pour installer ce passage piéton ? »", rep: "une question rhétorique : il fait dire au lecteur ce qu'il ne dit pas lui-même", raison: "la question impose sa réponse" },
  { enonce: "« Certes, le projet est ambitieux. Il l'est même trop peu, si l'on regarde les besoins. »", rep: "une concession : il admet un point de l'adversaire pour mieux le retourner", raison: "l'accord initial sert de tremplin" },
  { enonce: "« On nous dit que personne ne lit plus : les prêts ont augmenté de moitié. »", rep: "une réfutation : il attaque directement l'argument adverse pour l'abattre", raison: "l'affirmation adverse est contredite par un chiffre" },
  { enonce: "« Les relevés de trois années montrent la même courbe, mois après mois. »", rep: "une démonstration : il avance sa preuve sans reprendre personne", raison: "la preuve se suffit à elle-même" },
  { enonce: "« Qui pourrait sérieusement soutenir qu'un enfant apprend mieux dans le bruit ? »", rep: "une question rhétorique : il fait dire au lecteur ce qu'il ne dit pas lui-même", raison: "la réponse est contenue dans la question" },
  { enonce: "« Sans doute la solution est-elle imparfaite. Aucune ne l'est moins. »", rep: "une concession : il admet un point de l'adversaire pour mieux le retourner", raison: "l'aveu prépare le retournement" },
  { enonce: "« L'argument du coût ne tient pas : le devis est public et tient sur une page. »", rep: "une réfutation : il attaque directement l'argument adverse pour l'abattre", raison: "l'argument adverse est nommé puis abattu" },
  { enonce: "« Chaque salle libérée permet d'accueillir une classe de plus, soit trente élèves. »", rep: "une démonstration : il avance sa preuve sans reprendre personne", raison: "le raisonnement avance seul" },
  { enonce: "« Combien de temps encore fermera-t-on les yeux sur cet état de fait ? »", rep: "une question rhétorique : il fait dire au lecteur ce qu'il ne dit pas lui-même", raison: "la question suppose sa propre réponse" },
  { enonce: "« J'accorde volontiers que le délai est court. Il n'a jamais été plus long ailleurs. »", rep: "une concession : il admet un point de l'adversaire pour mieux le retourner", raison: "le point est accordé, puis relativisé" },
  { enonce: "« Contrairement à ce qu'on avance, le règlement ne l'interdit nulle part : je cite l'article. »", rep: "une réfutation : il attaque directement l'argument adverse pour l'abattre", raison: "l'affirmation adverse est démentie par le texte" },
  { enonce: "« Deux mille inscriptions en un mois : le besoin n'a pas à être prouvé davantage. »", rep: "une démonstration : il avance sa preuve sans reprendre personne", raison: "le chiffre constitue à lui seul la preuve" },
  { enonce: "« Est-il normal qu'une salle reste vide quand trente élèves attendent dehors ? »", rep: "une question rhétorique : il fait dire au lecteur ce qu'il ne dit pas lui-même", raison: "la question oriente entièrement la réponse" },
];

/* ===================== 6. LE COURANT DE PENSÉE (2de_arg_courant_pensee) ===================== */

const COURANTS: readonly string[] = [
  "l'humanisme : la formation de l'homme par les lettres et le savoir",
  "les Lumières : l'examen critique et le refus des vérités reçues",
  "la littérature engagée : l'écrivain met sa plume au service d'une cause",
  "le scepticisme : la suspension du jugement, faute de preuve suffisante",
];

const CAS_COURANT: readonly Cas[] = [
  { enonce: "« Il n'est pas de meilleure éducation que celle qui forme l'homme entier, par l'étude des Anciens et l'exercice du corps. »", rep: "l'humanisme : la formation de l'homme par les lettres et le savoir", raison: "l'éducation totale par les lettres est le programme humaniste" },
  { enonce: "« N'admettons rien que la raison n'ait examiné : la coutume n'est pas une preuve. »", rep: "les Lumières : l'examen critique et le refus des vérités reçues", raison: "l'examen par la raison caractérise les Lumières" },
  { enonce: "« Écrire, quand tant d'hommes souffrent, c'est prendre parti ; se taire aussi. »", rep: "la littérature engagée : l'écrivain met sa plume au service d'une cause", raison: "l'écriture est présentée comme un acte politique" },
  { enonce: "« Sur ce point les témoignages se contredisent : je ne conclurai pas. »", rep: "le scepticisme : la suspension du jugement, faute de preuve suffisante", raison: "le refus de conclure est la marque du scepticisme" },
  { enonce: "« Rien n'est plus utile à l'homme que l'étude des langues où pensèrent les Anciens. »", rep: "l'humanisme : la formation de l'homme par les lettres et le savoir", raison: "le retour aux langues anciennes est humaniste" },
  { enonce: "« Toute autorité qui refuse d'être discutée avoue par là qu'elle ne peut l'être. »", rep: "les Lumières : l'examen critique et le refus des vérités reçues", raison: "la critique de l'autorité est un thème des Lumières" },
  { enonce: "« Ce livre n'a pas d'autre but que de faire connaitre ce que l'on cache. »", rep: "la littérature engagée : l'écrivain met sa plume au service d'une cause", raison: "l'ouvrage est un moyen d'action" },
  { enonce: "« Que sais-je au juste ? Rien qui résiste à un examen sérieux. »", rep: "le scepticisme : la suspension du jugement, faute de preuve suffisante", raison: "le doute méthodique est sceptique" },
  { enonce: "« L'homme se fait par ce qu'il apprend, non par ce qu'il hérite. »", rep: "l'humanisme : la formation de l'homme par les lettres et le savoir", raison: "la formation prime sur la naissance : idée humaniste" },
  { enonce: "« Un fait n'est admis que s'il a été observé, mesuré, et vérifié par d'autres. »", rep: "les Lumières : l'examen critique et le refus des vérités reçues", raison: "l'exigence de vérification caractérise les Lumières" },
  { enonce: "« Je n'écris pas pour plaire : j'écris pour qu'on ne puisse plus dire qu'on ne savait pas. »", rep: "la littérature engagée : l'écrivain met sa plume au service d'une cause", raison: "l'écriture est mise au service d'une dénonciation" },
  { enonce: "« Les deux thèses sont également défendables : je m'abstiendrai de trancher. »", rep: "le scepticisme : la suspension du jugement, faute de preuve suffisante", raison: "l'abstention de jugement est sceptique" },
  { enonce: "« Instruire un enfant, c'est lui donner de quoi se conduire lui-même toute sa vie. »", rep: "l'humanisme : la formation de l'homme par les lettres et le savoir", raison: "l'autonomie par l'instruction est un idéal humaniste" },
  { enonce: "« Osons examiner ce que chacun répète sans l'avoir jamais vérifié. »", rep: "les Lumières : l'examen critique et le refus des vérités reçues", raison: "l'appel à examiner est propre aux Lumières" },
  { enonce: "« Chaque page de ce récit veut arracher une décision au lecteur. »", rep: "la littérature engagée : l'écrivain met sa plume au service d'une cause", raison: "le texte vise l'action du lecteur" },
  { enonce: "« Faute d'éléments, je tiens la question pour ouverte, et je le dis. »", rep: "le scepticisme : la suspension du jugement, faute de preuve suffisante", raison: "la question laissée ouverte marque le scepticisme" },
];

/* ===================== 7. LES GENRES DE LA PRESSE (2de_pres_genres) ===================== */

const GENRES_PRESSE: readonly string[] = [
  "une brève d'information : elle rapporte un fait, sans commentaire",
  "un éditorial : il engage le journal sur une position",
  "un reportage : il raconte ce que le journaliste a vu sur place",
  "une critique : elle juge une œuvre et motive ce jugement",
];

const CAS_PRESSE: readonly Cas[] = [
  { enonce: "Quinze lignes : ce qui s'est passé, où, quand, et rien de plus.", rep: "une brève d'information : elle rapporte un fait, sans commentaire", raison: "les faits seuls, sans point de vue" },
  { enonce: "En première page, non signé de la rédaction, le texte prend position au nom du journal.", rep: "un éditorial : il engage le journal sur une position", raison: "l'engagement du titre est la marque de l'éditorial" },
  { enonce: "Le journaliste décrit la salle, cite trois personnes qu'il a rencontrées, et raconte sa journée sur place.", rep: "un reportage : il raconte ce que le journaliste a vu sur place", raison: "présence sur le terrain et récit" },
  { enonce: "Le texte examine une pièce jouée la veille, en dit le bien et le mal, et conclut par une recommandation.", rep: "une critique : elle juge une œuvre et motive ce jugement", raison: "jugement argumenté sur une œuvre" },
  { enonce: "Trois phrases : le nombre, la date, la source. Fin.", rep: "une brève d'information : elle rapporte un fait, sans commentaire", raison: "la brève se limite aux faits" },
  { enonce: "Le texte défend une position et parle au nom du titre, sans signature individuelle.", rep: "un éditorial : il engage le journal sur une position", raison: "la parole collective du journal" },
  { enonce: "Le journaliste a passé deux jours dans le quartier et rapporte ce qu'il y a entendu.", rep: "un reportage : il raconte ce que le journaliste a vu sur place", raison: "l'enquête de terrain fait le reportage" },
  { enonce: "L'auteur explique pourquoi ce roman lui parait manqué, et cite des passages à l'appui.", rep: "une critique : elle juge une œuvre et motive ce jugement", raison: "jugement motivé sur une œuvre" },
  { enonce: "Un fait, une date, un lieu : le lecteur n'apprend rien de l'avis du journal.", rep: "une brève d'information : elle rapporte un fait, sans commentaire", raison: "aucun avis n'est exprimé" },
  { enonce: "Le texte dit ce que le journal souhaite qu'il advienne, et pourquoi.", rep: "un éditorial : il engage le journal sur une position", raison: "prise de position du titre" },
  { enonce: "On y trouve des descriptions, des dialogues rapportés, et le récit d'un déplacement.", rep: "un reportage : il raconte ce que le journaliste a vu sur place", raison: "le récit de terrain caractérise le reportage" },
  { enonce: "Le texte compare deux mises en scène de la même pièce et dit laquelle emporte l'adhésion.", rep: "une critique : elle juge une œuvre et motive ce jugement", raison: "comparaison et jugement d'œuvres" },
  { enonce: "Le texte tient en un paragraphe et ne comporte aucun adjectif d'appréciation.", rep: "une brève d'information : elle rapporte un fait, sans commentaire", raison: "l'absence d'appréciation signale la brève" },
  { enonce: "Le journal y explique la ligne qu'il entend tenir sur cette question.", rep: "un éditorial : il engage le journal sur une position", raison: "l'éditorial expose la ligne du titre" },
  { enonce: "Le journaliste raconte la nuit passée avec l'équipe de secours, heure par heure.", rep: "un reportage : il raconte ce que le journaliste a vu sur place", raison: "récit vécu sur le terrain" },
  { enonce: "L'article évalue un recueil paru cette semaine et le situe parmi les autres livres de l'auteur.", rep: "une critique : elle juge une œuvre et motive ce jugement", raison: "évaluation argumentée d'une œuvre" },
];

/* ===================== 8. FAIT OU JUGEMENT (2de_pres_fait_jugement) ===================== */

const FAIT_JUGEMENT: readonly string[] = [
  "un fait vérifiable : on peut le contrôler auprès d'une source",
  "un jugement : il exprime une appréciation, non un constat",
  "une prévision : elle porte sur ce qui n'a pas encore eu lieu",
  "une opinion attribuée : le journal rapporte l'avis de quelqu'un d'autre",
];

const CAS_FAIT: readonly Cas[] = [
  { enonce: "« La salle a rouvert le douze septembre. »", rep: "un fait vérifiable : on peut le contrôler auprès d'une source", raison: "une date se vérifie" },
  { enonce: "« Cette réouverture est une excellente nouvelle. »", rep: "un jugement : il exprime une appréciation, non un constat", raison: "« excellente » est une appréciation" },
  { enonce: "« La fréquentation devrait doubler d'ici décembre. »", rep: "une prévision : elle porte sur ce qui n'a pas encore eu lieu", raison: "l'énoncé porte sur l'avenir" },
  { enonce: "« Selon la directrice, la salle manquait cruellement au quartier. »", rep: "une opinion attribuée : le journal rapporte l'avis de quelqu'un d'autre", raison: "l'avis est explicitement attribué" },
  { enonce: "« Deux cent dix personnes se sont inscrites la première semaine. »", rep: "un fait vérifiable : on peut le contrôler auprès d'une source", raison: "un chiffre se vérifie" },
  { enonce: "« Ce chiffre est décevant au regard des attentes. »", rep: "un jugement : il exprime une appréciation, non un constat", raison: "« décevant » est une appréciation" },
  { enonce: "« Le rythme des inscriptions ralentira sans doute après les vacances. »", rep: "une prévision : elle porte sur ce qui n'a pas encore eu lieu", raison: "l'énoncé anticipe" },
  { enonce: "« Pour les usagers interrogés, les horaires restent trop courts. »", rep: "une opinion attribuée : le journal rapporte l'avis de quelqu'un d'autre", raison: "l'avis est rapporté, non repris" },
  { enonce: "« Les travaux ont duré onze mois. »", rep: "un fait vérifiable : on peut le contrôler auprès d'une source", raison: "une durée se vérifie" },
  { enonce: "« Onze mois, c'est beaucoup trop long. »", rep: "un jugement : il exprime une appréciation, non un constat", raison: "« beaucoup trop » exprime une appréciation" },
  { enonce: "« Le budget sera vraisemblablement reconduit l'an prochain. »", rep: "une prévision : elle porte sur ce qui n'a pas encore eu lieu", raison: "l'énoncé porte sur l'année à venir" },
  { enonce: "« D'après le service technique, l'installation est aux normes. »", rep: "une opinion attribuée : le journal rapporte l'avis de quelqu'un d'autre", raison: "l'affirmation est mise au compte d'un tiers" },
  { enonce: "« Le bâtiment compte trois étages et deux ascenseurs. »", rep: "un fait vérifiable : on peut le contrôler auprès d'une source", raison: "la description se vérifie sur place" },
  { enonce: "« L'architecture du bâtiment est franchement réussie. »", rep: "un jugement : il exprime une appréciation, non un constat", raison: "« réussie » est une appréciation" },
  { enonce: "« On s'attend à une affluence importante pour l'ouverture. »", rep: "une prévision : elle porte sur ce qui n'a pas encore eu lieu", raison: "l'énoncé anticipe un évènement" },
  { enonce: "« Les riverains estiment que le stationnement va devenir difficile. »", rep: "une opinion attribuée : le journal rapporte l'avis de quelqu'un d'autre", raison: "l'avis des riverains est rapporté" },
];

/* ===================== 9. CE QU'UN TITRE FAIT ADMETTRE (2de_pres_titre_presuppose) ===================== */

const TITRES: readonly CasFaux[] = [
  { enonce: "« Enfin une solution pour les couloirs bondés »", bonne: "que les couloirs étaient bondés", faux: ["que la solution a été imaginée par la rédaction du journal", "que les couloirs ne seront plus jamais encombrés à l'avenir", "que personne ne s'en était plaint jusqu'à aujourd'hui"], raison: "« enfin » et l'adjectif installent le problème comme acquis" },
  { enonce: "« Encore un report pour la salle polyvalente »", bonne: "que d'autres reports ont déjà eu lieu", faux: ["que la salle ne sera jamais construite", "que le report a été décidé hier", "que le projet a été abandonné"], raison: "« encore » suppose des précédents" },
  { enonce: "« La vraie raison du retard »", bonne: "que les raisons données jusqu'ici étaient fausses", faux: ["que le retard est terminé", "que la raison est connue de tous", "qu'il n'y a jamais eu de retard"], raison: "« la vraie » disqualifie implicitement les autres versions" },
  { enonce: "« Ce que l'on ne vous dit pas sur le nouveau règlement »", bonne: "que quelque chose est délibérément caché", faux: ["que le règlement est illégal", "que le règlement n'existe pas encore", "que tout a déjà été publié"], raison: "la formule suppose une rétention d'information" },
  { enonce: "« Le retour du calme dans les couloirs »", bonne: "que le calme avait disparu", faux: ["que les couloirs ont été refaits", "que le bruit n'a jamais existé", "que le calme va repartir"], raison: "« retour » suppose une absence antérieure" },
  { enonce: "« Trois ans de promesses, zéro travaux »", bonne: "que des engagements n'ont pas été tenus", faux: ["que les travaux commenceront bientôt, dès la fin de l'année", "qu'aucune promesse n'a jamais été faite sur ce sujet", "que les travaux sont achevés depuis plusieurs mois déjà"], raison: "l'opposition chiffrée suppose des promesses réelles" },
  { enonce: "« Pourquoi la bibliothèque ferme si tôt »", bonne: "que l'horaire de fermeture est jugé précoce", faux: ["que la bibliothèque va fermer définitivement", "que la bibliothèque ouvre tard", "que personne ne fréquente les lieux"], raison: "la question suppose le jugement qu'elle contient" },
  { enonce: "« Une salle neuve, mais pour qui ? »", bonne: "que l'accès à cette salle risque d'être inégal", faux: ["que la salle n'a pas été construite", "que la salle est trop petite", "que la salle est déjà pleine"], raison: "la question suppose un problème d'accès" },
  { enonce: "« Le budget culture à nouveau raboté »", bonne: "que ce budget a déjà été réduit auparavant", faux: ["que le budget a été augmenté", "que la culture ne coûte rien", "que le budget sera rétabli"], raison: "« à nouveau » renvoie à des précédents" },
  { enonce: "« La fin d'une longue attente pour les usagers »", bonne: "que les usagers attendaient depuis longtemps", faux: ["que les usagers ne sont pas satisfaits", "que l'attente va se prolonger", "qu'il n'y avait aucun usager"], raison: "la formule suppose l'attente comme un fait" },
  { enonce: "« Comment expliquer un tel désintérêt ? »", bonne: "que le désintérêt est réel", faux: ["que l'intérêt du public serait plutôt en hausse cette année", "que la question a déjà été tranchée par les intéressés", "que personne ne s'y est jamais intéressé nulle part"], raison: "la question porte sur la cause, donc admet le fait" },
  { enonce: "« Les vrais chiffres de la fréquentation »", bonne: "que les chiffres connus étaient faux", faux: ["que la fréquentation augmente depuis le début de l'année", "que les chiffres sont tenus secrets par l'administration", "qu'aucun chiffre n'a jamais été établi sur cette question"], raison: "« les vrais » disqualifie ceux qui circulent" },
  { enonce: "« Toujours pas de réponse de l'administration »", bonne: "qu'une réponse était attendue depuis un moment", faux: ["que l'administration a refusé", "que la question vient d'être posée", "que la réponse est arrivée"], raison: "« toujours pas » suppose une attente prolongée" },
  { enonce: "« Le succès inattendu des ateliers du soir »", bonne: "que personne n'avait prévu ce succès", faux: ["que les ateliers ont été annulés", "que le succès était certain", "que les ateliers ont lieu le matin"], raison: "« inattendu » suppose une prévision démentie" },
  { enonce: "« Après des mois de silence, une annonce »", bonne: "qu'aucune communication n'avait eu lieu avant", faux: ["que l'annonce était attendue pour ce jour", "que le silence continue", "que plusieurs annonces ont été faites"], raison: "la formule suppose une période sans information" },
  { enonce: "« Une réforme de plus, une de trop ? »", bonne: "que des réformes se sont succédé", faux: ["que la réforme est la première", "que la réforme a été retirée", "qu'aucune réforme n'est prévue"], raison: "« de plus » suppose une série" },
];

/* ===================== 10. LA FIABILITÉ D'UNE SOURCE (2de_pres_sources) ===================== */

const FIABILITE: readonly string[] = [
  "elle est solide : la source est nommée et l'information vérifiable",
  "elle est faible : aucune source n'est nommée, rien n'est vérifiable",
  "elle est à recouper : la source est nommée mais partie prenante",
  "elle est ancienne : l'information peut avoir cessé d'être vraie",
];

const CAS_SOURCE: readonly Cas[] = [
  { enonce: "« Selon le rapport publié en juin par le service statistique, la fréquentation a augmenté. »", rep: "elle est solide : la source est nommée et l'information vérifiable", raison: "source nommée, document consultable" },
  { enonce: "« Tout le monde sait que la salle sera fermée à la rentrée. »", rep: "elle est faible : aucune source n'est nommée, rien n'est vérifiable", raison: "aucune source, appel à l'évidence" },
  { enonce: "« L'entreprise chargée des travaux affirme que le chantier est en avance. »", rep: "elle est à recouper : la source est nommée mais partie prenante", raison: "la source a intérêt à l'information qu'elle donne" },
  { enonce: "« D'après une enquête menée il y a douze ans, la moitié des élèves lisaient chaque jour. »", rep: "elle est ancienne : l'information peut avoir cessé d'être vraie", raison: "l'ancienneté fragilise la conclusion" },
  { enonce: "« Le procès-verbal du conseil, joint à cet article, mentionne le vote. »", rep: "elle est solide : la source est nommée et l'information vérifiable", raison: "le document est fourni" },
  { enonce: "« On dit que le budget aurait été doublé. »", rep: "elle est faible : aucune source n'est nommée, rien n'est vérifiable", raison: "« on dit » ne désigne personne" },
  { enonce: "« Le fabricant du produit assure qu'aucun défaut n'a été constaté. »", rep: "elle est à recouper : la source est nommée mais partie prenante", raison: "le fabricant est juge et partie" },
  { enonce: "« Un article de 2009 estimait le coût à deux millions. »", rep: "elle est ancienne : l'information peut avoir cessé d'être vraie", raison: "le chiffre a pu changer depuis" },
  { enonce: "« Les trois personnes citées ont accepté d'être nommées et sont jointes par téléphone. »", rep: "elle est solide : la source est nommée et l'information vérifiable", raison: "sources identifiées et joignables" },
  { enonce: "« Des rumeurs circulent depuis plusieurs semaines à ce sujet. »", rep: "elle est faible : aucune source n'est nommée, rien n'est vérifiable", raison: "la rumeur n'est pas une source" },
  { enonce: "« Le candidat déclare que son programme a été chiffré par ses propres équipes. »", rep: "elle est à recouper : la source est nommée mais partie prenante", raison: "l'évaluation vient de l'intéressé" },
  { enonce: "« Selon un recensement effectué avant la dernière réforme, l'effectif était de six cents. »", rep: "elle est ancienne : l'information peut avoir cessé d'être vraie", raison: "la réforme a pu tout changer" },
  { enonce: "« Le registre d'entrée, consultable à l'accueil, indique la date exacte. »", rep: "elle est solide : la source est nommée et l'information vérifiable", raison: "le registre est consultable" },
  { enonce: "« D'après une source proche du dossier qui souhaite rester anonyme. »", rep: "elle est faible : aucune source n'est nommée, rien n'est vérifiable", raison: "l'anonymat empêche toute vérification" },
  { enonce: "« L'association qui demande la subvention estime son action indispensable. »", rep: "elle est à recouper : la source est nommée mais partie prenante", raison: "la source est demandeuse" },
  { enonce: "« Une étude parue voici quinze ans concluait à l'inverse. »", rep: "elle est ancienne : l'information peut avoir cessé d'être vraie", raison: "quinze ans peuvent tout changer" },
];

/* ===================== 11. L'HISTOIRE DES SUPPORTS (2de_pres_supports_histoire) ===================== */

const ETAPES: readonly string[] = [
  "le XIXe siècle : le journal quotidien à bas prix touche un public de masse",
  "le début du XXe siècle : la radio fait entrer l'information dans les foyers",
  "la seconde moitié du XXe siècle : la télévision impose l'image au récit d'actualité",
  "le tournant du XXIe siècle : le numérique permet à chacun de publier",
];

const CAS_SUPPORT: readonly Cas[] = [
  { enonce: "Le prix d'un exemplaire tombe si bas que le journal se vend au numéro, dans la rue.", rep: "le XIXe siècle : le journal quotidien à bas prix touche un public de masse", raison: "la presse à bas prix est une invention du XIXe" },
  { enonce: "L'information arrive dans la cuisine par un poste, à heure fixe, sans qu'on ait à lire.", rep: "le début du XXe siècle : la radio fait entrer l'information dans les foyers", raison: "la radio entre au foyer" },
  { enonce: "Le journal du soir montre les images du jour, et l'image devient le récit.", rep: "la seconde moitié du XXe siècle : la télévision impose l'image au récit d'actualité", raison: "le journal télévisé impose l'image" },
  { enonce: "N'importe qui peut publier un texte lu par des milliers de personnes, sans passer par un titre.", rep: "le tournant du XXIe siècle : le numérique permet à chacun de publier", raison: "la publication cesse d'être un privilège" },
  { enonce: "Le roman-feuilleton paraît en bas de page et fait acheter le journal chaque matin.", rep: "le XIXe siècle : le journal quotidien à bas prix touche un public de masse", raison: "le feuilleton est un procédé de la presse du XIXe" },
  { enonce: "Une voix annonce l'évènement en direct, à des auditeurs qui ne verront rien.", rep: "le début du XXe siècle : la radio fait entrer l'information dans les foyers", raison: "le direct sans image est propre à la radio" },
  { enonce: "Le reportage filmé rapporte la scène, et le commentaire s'ajuste aux images.", rep: "la seconde moitié du XXe siècle : la télévision impose l'image au récit d'actualité", raison: "l'image commande le récit télévisé" },
  { enonce: "L'information circule sans rédaction, se corrige et se contredit en quelques heures.", rep: "le tournant du XXIe siècle : le numérique permet à chacun de publier", raison: "la circulation sans filtre est un trait du numérique" },
  { enonce: "Les tirages se comptent pour la première fois en centaines de milliers d'exemplaires.", rep: "le XIXe siècle : le journal quotidien à bas prix touche un public de masse", raison: "les grands tirages naissent au XIXe" },
  { enonce: "Toute une famille se réunit à heure fixe autour d'un appareil pour écouter les nouvelles.", rep: "le début du XXe siècle : la radio fait entrer l'information dans les foyers", raison: "l'écoute familiale à heure fixe est radiophonique" },
  { enonce: "Un évènement lointain est vu le soir même par des millions de personnes.", rep: "la seconde moitié du XXe siècle : la télévision impose l'image au récit d'actualité", raison: "la diffusion massive d'images est télévisuelle" },
  { enonce: "Un texte publié le matin est partagé, commenté et déformé avant midi.", rep: "le tournant du XXIe siècle : le numérique permet à chacun de publier", raison: "la reprise instantanée est numérique" },
  { enonce: "La publicité paie le journal, dont le prix de vente ne couvre plus les frais.", rep: "le XIXe siècle : le journal quotidien à bas prix touche un public de masse", raison: "le modèle publicitaire nait avec la presse à bas prix" },
  { enonce: "L'auditeur suit un évènement minute par minute, sans attendre le journal du lendemain.", rep: "le début du XXe siècle : la radio fait entrer l'information dans les foyers", raison: "la radio invente le suivi en continu" },
  { enonce: "Le choix de l'image devient un choix éditorial aussi lourd que celui des mots.", rep: "la seconde moitié du XXe siècle : la télévision impose l'image au récit d'actualité", raison: "l'image devient l'enjeu du récit" },
  { enonce: "Les lecteurs deviennent à leur tour des producteurs d'information.", rep: "le tournant du XXIe siècle : le numérique permet à chacun de publier", raison: "le renversement des rôles est numérique" },
];

/* ===================== 12. L'IMAGE DE PRESSE (2de_pres_image) ===================== */

const IMAGES_PRESSE: readonly string[] = [
  "le cadrage : ce qu'on a choisi de garder dans l'image, et donc d'exclure",
  "l'angle de prise de vue : d'en bas il grandit, d'en haut il rapetisse",
  "l'instant choisi : une fraction de seconde donne son sens à toute la scène",
  "la légende : elle oriente la lecture de ce que l'on croit voir seul",
];

const CAS_IMAGE: readonly Cas[] = [
  { enonce: "La photographie ne montre que les premiers rangs ; on ignore si la salle était pleine ou vide derrière.", rep: "le cadrage : ce qu'on a choisi de garder dans l'image, et donc d'exclure", raison: "ce qui est hors champ décide de l'impression" },
  { enonce: "Le personnage est photographié depuis le sol, et paraît dominer tout le bâtiment.", rep: "l'angle de prise de vue : d'en bas il grandit, d'en haut il rapetisse", raison: "la contre-plongée grandit le sujet" },
  { enonce: "Le cliché saisit la seconde où la personne ferme les yeux, et elle paraît accablée.", rep: "l'instant choisi : une fraction de seconde donne son sens à toute la scène", raison: "l'instant décide de l'expression prêtée" },
  { enonce: "La même photographie, sous deux légendes différentes, raconte deux évènements opposés.", rep: "la légende : elle oriente la lecture de ce que l'on croit voir seul", raison: "le texte commande la lecture de l'image" },
  { enonce: "On a coupé l'image juste avant le groupe qui manifestait de l'autre côté de la rue.", rep: "le cadrage : ce qu'on a choisi de garder dans l'image, et donc d'exclure", raison: "l'exclusion change le sens de la scène" },
  { enonce: "Vue d'un hélicoptère, la foule paraît clairsemée sur la place.", rep: "l'angle de prise de vue : d'en bas il grandit, d'en haut il rapetisse", raison: "la plongée rapetisse et disperse" },
  { enonce: "Le photographe a déclenché au moment précis où la main se levait, et le geste paraît menaçant.", rep: "l'instant choisi : une fraction de seconde donne son sens à toute la scène", raison: "l'instant fige un geste qui n'était peut-être rien" },
  { enonce: "Sans le texte qui l'accompagne, on ne saurait ni où ni quand la scène s'est produite.", rep: "la légende : elle oriente la lecture de ce que l'on croit voir seul", raison: "la légende fournit ce que l'image ne dit pas" },
  { enonce: "Le cliché serré sur deux personnes laisse croire à un tête-à-tête, alors qu'ils étaient trente.", rep: "le cadrage : ce qu'on a choisi de garder dans l'image, et donc d'exclure", raison: "le serrage isole et transforme la scène" },
  { enonce: "Photographié de haut, l'orateur semble écrasé par la tribune.", rep: "l'angle de prise de vue : d'en bas il grandit, d'en haut il rapetisse", raison: "la plongée diminue le sujet" },
  { enonce: "Sur les cent photographies prises, on a retenu la seule où il détourne le regard.", rep: "l'instant choisi : une fraction de seconde donne son sens à toute la scène", raison: "le choix de l'instant construit le personnage" },
  { enonce: "Le mot placé sous l'image nomme comme « affrontement » ce qui pourrait n'être qu'une discussion.", rep: "la légende : elle oriente la lecture de ce que l'on croit voir seul", raison: "le mot impose une interprétation" },
  { enonce: "La caricature grossit un seul trait du visage, et c'est ce trait qui fait le jugement.", rep: "le cadrage : ce qu'on a choisi de garder dans l'image, et donc d'exclure", raison: "le dessin garde un trait et efface le reste" },
  { enonce: "L'objectif placé au ras du sol fait paraitre l'obstacle infranchissable.", rep: "l'angle de prise de vue : d'en bas il grandit, d'en haut il rapetisse", raison: "la position de l'objectif change l'échelle perçue" },
  { enonce: "Le photographe attend deux heures pour saisir la seconde où les deux se serrent la main.", rep: "l'instant choisi : une fraction de seconde donne son sens à toute la scène", raison: "l'attente vise l'instant qui fera sens" },
  { enonce: "Une même photographie illustre deux articles de sens contraire, avec deux textes différents.", rep: "la légende : elle oriente la lecture de ce que l'on croit voir seul", raison: "le texte fait basculer l'image" },
];

/* ═══════════ LES TABLES DES SECONDS ITEMS (18/08/2026) ═══════════
   Les douze premiers items de ce fichier partent d'une SITUATION et font nommer
   la catégorie. Les douze seconds font le trajet inverse : ils partent de la
   catégorie et demandent ce qui la définit, le moyen qu'elle emploie, ou le
   geste qu'elle réclame.
   ⚠️ Le retournement littéral — « quelle situation illustre ceci ? » — a été
   ÉCARTÉ : les situations sont des phrases longues et inégales, la bonne
   réponse se serait cochée à la taille. Toutes les réponses ci-dessous sont
   des groupes courts, de longueur voisine.
   ⭐ Chaque pool sert plusieurs entrées : aucune ligne n'est morte. */

/* Le test du présupposé, appliqué : on nie la phrase et l'on regarde ce qui
   survit. ⚠️ Les quatre réponses sont courtes et de même facture — sans quoi
   la nuance (« il fumait avant » contre « il fume encore ») se cocherait à la
   taille plutôt qu'au raisonnement. */
const PRESUPPOSES_NIER: readonly CasFaux[] = [
  { enonce: "« Paul a cessé de fumer. »", bonne: "il fumait auparavant", faux: ["il fume encore aujourd'hui", "il n'a jamais fumé", "il va bientôt reprendre"], raison: "« cesser de » suppose que l'action avait lieu ; le nier ne l'efface pas" },
  { enonce: "« Le maire a enfin tenu sa promesse. »", bonne: "il avait tardé à la tenir", faux: ["il n'avait rien promis du tout", "il l'a tenue aussitôt promise", "il refuse encore de la tenir"], raison: "« enfin » suppose une attente, et l'attente survit à la négation" },
  { enonce: "« Qui a saboté le projet ? »", bonne: "le projet a été saboté", faux: ["le projet a parfaitement réussi", "personne n'a touché au projet", "le projet n'a jamais existé"], raison: "la question porte sur l'auteur, jamais sur le fait : il est donné d'avance" },
  { enonce: "« La réforme continue de diviser. »", bonne: "elle divisait déjà avant", faux: ["elle divise pour la première fois", "elle n'a jamais divisé personne", "elle réunit tout le monde"], raison: "« continuer de » suppose un état antérieur" },
  { enonce: "« Il a recommencé à travailler. »", bonne: "il s'était arrêté de travailler", faux: ["il n'avait jamais travaillé", "il travaille sans interruption", "il va cesser de travailler"], raison: "« recommencer » suppose un arrêt, que la négation ne supprime pas" },
  { enonce: "« Depuis quand tolère-t-on ces retards ? »", bonne: "les retards sont tolérés", faux: ["les retards sont tous sanctionnés", "il n'y a jamais eu de retard", "les retards ont enfin cessé"], raison: "la question porte sur la durée, et fait passer la tolérance pour acquise" },
];

const MOYENS: readonly string[] = [
  "des preuves et un raisonnement",
  "l'émotion et l'image frappante",
  "le rire porté sur un travers",
  "aucun : le texte informe seulement",
];

const CAS_MOYEN: readonly Cas[] = [
  { enonce: "Convaincre.", rep: "des preuves et un raisonnement", raison: "convaincre s'adresse à la raison, et se vérifie" },
  { enonce: "Persuader.", rep: "l'émotion et l'image frappante", raison: "persuader passe par le sentiment, non par la démonstration" },
  { enonce: "Manier l'ironie.", rep: "le rire porté sur un travers", raison: "on dit le contraire de ce qu'on pense pour rendre un travers insupportable" },
  { enonce: "Exposer sans prendre parti.", rep: "aucun : le texte informe seulement", raison: "l'exposé neutre ne cherche rien du lecteur" },
];

const TEMPS_DISCOURS: readonly string[] = [
  "le présent d'une cérémonie",
  "le passé d'un fait",
  "l'avenir d'une décision",
  "aucun temps en particulier",
];

const CAS_TEMPS: readonly Cas[] = [
  { enonce: "Le discours épidictique loue ou blâme.", rep: "le présent d'une cérémonie", raison: "on célèbre ou l'on condamne devant une assemblée réunie" },
  { enonce: "Le discours judiciaire accuse ou défend.", rep: "le passé d'un fait", raison: "le tribunal juge ce qui a déjà eu lieu" },
  { enonce: "Le discours délibératif conseille ou déconseille.", rep: "l'avenir d'une décision", raison: "on délibère sur ce qui n'est pas encore fait" },
  { enonce: "Un texte qui se contente d'exposer.", rep: "aucun temps en particulier", raison: "il n'appartient à aucun des trois genres du discours" },
  { enonce: "Un éloge funèbre prononcé devant l'assistance.", rep: "le présent d'une cérémonie", raison: "l'éloge est le cas type de l'épidictique" },
  { enonce: "Une plaidoirie qui revient sur la nuit des faits.", rep: "le passé d'un fait", raison: "elle discute ce qui s'est passé" },
  { enonce: "Un discours qui demande un vote pour demain.", rep: "l'avenir d'une décision", raison: "il vise une décision à prendre" },
];

const PROPRES: readonly string[] = [
  "il démontre par une histoire inventée",
  "il avance en son nom propre",
  "il s'adresse à ceux qui doivent juger",
  "il suit l'actualité du jour",
];

const CAS_PROPRE: readonly Cas[] = [
  { enonce: "L'apologue.", rep: "il démontre par une histoire inventée", raison: "la fable et le conte philosophique argumentent indirectement" },
  { enonce: "L'essai.", rep: "il avance en son nom propre", raison: "l'auteur y engage sa parole, sans se cacher derrière un récit" },
  { enonce: "La plaidoirie.", rep: "il s'adresse à ceux qui doivent juger", raison: "elle vise une décision de justice" },
  { enonce: "L'article de presse.", rep: "il suit l'actualité du jour", raison: "il naît d'un événement et se périme avec lui" },
];

const MANOEUVRES_DEF: readonly string[] = [
  "accorder un point à l'adversaire",
  "attaquer l'argument de l'adversaire",
  "appuyer sa thèse d'un exemple neuf",
  "éviter la question et en poser une autre",
];

const CAS_MANOEUVRE_DEF: readonly Cas[] = [
  { enonce: "La concession.", rep: "accorder un point à l'adversaire", raison: "on lui donne raison sur un point pour être cru sur le reste" },
  { enonce: "La réfutation.", rep: "attaquer l'argument de l'adversaire", raison: "on montre que son raisonnement ne tient pas" },
  { enonce: "La confirmation.", rep: "appuyer sa thèse d'un exemple neuf", raison: "on renforce sa propre position sans parler de l'adversaire" },
  { enonce: "L'esquive.", rep: "éviter la question et en poser une autre", raison: "elle donne l'apparence d'une réponse sans en être une" },
];

const MOTS_ORDRE: readonly string[] = [
  "instruire les hommes par l'examen",
  "revenir aux textes anciens eux-mêmes",
  "soumettre l'art à la raison et à la règle",
  "chercher le rare contre le mot commun",
];

const CAS_MOT_ORDRE: readonly Cas[] = [
  { enonce: "Les Lumières.", rep: "instruire les hommes par l'examen", raison: "le siècle veut éclairer, et tient l'examen pour la voie du progrès" },
  { enonce: "L'Humanisme.", rep: "revenir aux textes anciens eux-mêmes", raison: "on relit les Anciens dans leur langue, sans intermédiaire" },
  { enonce: "Le classicisme.", rep: "soumettre l'art à la raison et à la règle", raison: "la clarté et la mesure y sont des exigences" },
  { enonce: "La préciosité.", rep: "chercher le rare contre le mot commun", raison: "l'expression choisie y vaut preuve d'esprit" },
];

const SIGNES_PRESSE: readonly string[] = [
  "il engage la position de la rédaction",
  "il rapporte ce que le journaliste a vu",
  "il donne l'information en quelques lignes",
  "il laisse parler quelqu'un d'autre",
];

const CAS_SIGNE: readonly Cas[] = [
  { enonce: "L'éditorial.", rep: "il engage la position de la rédaction", raison: "il est signé et assume un point de vue" },
  { enonce: "Le reportage.", rep: "il rapporte ce que le journaliste a vu", raison: "il vaut par la présence sur les lieux" },
  { enonce: "La brève.", rep: "il donne l'information en quelques lignes", raison: "elle informe sans développer" },
  { enonce: "L'interview.", rep: "il laisse parler quelqu'un d'autre", raison: "le journaliste s'efface derrière son invité" },
];

const NATURES: readonly string[] = [
  "un fait, qui se vérifie",
  "un jugement, qui s'apprécie",
  "une opinion rapportée d'un tiers",
  "une prévision, encore invérifiable",
];

const CAS_NATURE: readonly Cas[] = [
  { enonce: "« La salle a été inaugurée jeudi. »", rep: "un fait, qui se vérifie", raison: "la date et l'événement se contrôlent" },
  { enonce: "« Cette inauguration était une réussite. »", rep: "un jugement, qui s'apprécie", raison: "aucun contrôle ne peut trancher entre réussite et échec" },
  { enonce: "« Selon le maire, la salle manquait depuis dix ans. »", rep: "une opinion rapportée d'un tiers", raison: "le journal rapporte sans prendre à son compte" },
  { enonce: "« La fréquentation devrait doubler l'an prochain. »", rep: "une prévision, encore invérifiable", raison: "elle porte sur ce qui n'a pas eu lieu" },
  { enonce: "« Le budget s'élève à trois cent mille euros. »", rep: "un fait, qui se vérifie", raison: "un chiffre se contrôle sur pièces" },
  { enonce: "« Ce budget est beaucoup trop élevé. »", rep: "un jugement, qui s'apprécie", raison: "« trop » suppose une norme qui n'est pas dite" },
  { enonce: "« D'après l'opposition, le chantier a pris du retard. »", rep: "une opinion rapportée d'un tiers", raison: "la source est nommée, l'affirmation ne l'engage pas" },
  { enonce: "« Les travaux seront terminés avant l'été. »", rep: "une prévision, encore invérifiable", raison: "rien ne permet encore de la contrôler" },
];

const PROCEDES_TITRE: readonly string[] = [
  "une question qui suppose le problème posé",
  "un chiffre coupé de ce qui l'explique",
  "des guillemets qui mettent à distance",
  "un conditionnel qui n'engage personne",
];

const CAS_PROCEDE: readonly Cas[] = [
  { enonce: "« Faut-il interdire les téléphones au collège ? »", rep: "une question qui suppose le problème posé", raison: "le titre pose comme acquis qu'un problème existe" },
  { enonce: "« Trois cents signalements en un an »", rep: "un chiffre coupé de ce qui l'explique", raison: "sans point de comparaison, le nombre ne dit rien" },
  { enonce: "« Une réforme “historique” »", rep: "des guillemets qui mettent à distance", raison: "le journal cite le mot sans le reprendre à son compte" },
  { enonce: "« Le rapport évoquerait des manquements »", rep: "un conditionnel qui n'engage personne", raison: "l'information est donnée sans être garantie" },
  { enonce: "« Jusqu'à quand tolérera-t-on cette situation ? »", rep: "une question qui suppose le problème posé", raison: "la question présuppose qu'il y a lieu de ne plus tolérer" },
  { enonce: "« Deux fois plus qu'en janvier »", rep: "un chiffre coupé de ce qui l'explique", raison: "on ignore le nombre de départ, donc l'ampleur réelle" },
  { enonce: "« Un accord “équilibré”, selon les signataires »", rep: "des guillemets qui mettent à distance", raison: "les guillemets renvoient le mot à celui qui l'emploie" },
  { enonce: "« Le chantier aurait coûté le double »", rep: "un conditionnel qui n'engage personne", raison: "le conditionnel signale une information non vérifiée" },
];

const GESTES_VERIF: readonly string[] = [
  "remonter au document d'origine",
  "chercher qui a publié, et quand",
  "comparer avec un second média",
  "rien : l'information est déjà de première main",
];

const CAS_GESTE: readonly Cas[] = [
  { enonce: "Un article qui cite un autre article, lui-même sans source.", rep: "remonter au document d'origine", raison: "la chaine des reprises doit être remontée jusqu'au premier maillon" },
  { enonce: "Une capture d'écran partagée sans date ni nom.", rep: "chercher qui a publié, et quand", raison: "sans auteur ni date, rien ne peut être évalué" },
  { enonce: "Une information seule, qu'aucun autre journal ne donne.", rep: "comparer avec un second média", raison: "une information isolée demande un recoupement" },
  { enonce: "Le rapport officiel lui-même, consulté en entier.", rep: "rien : l'information est déjà de première main", raison: "on tient la source, non son écho" },
  { enonce: "Un fil qui résume « ce que dit une étude » sans la nommer.", rep: "remonter au document d'origine", raison: "tant que l'étude n'est pas identifiée, le résumé ne vaut rien" },
  { enonce: "Un compte anonyme qui annonce une décision imminente.", rep: "chercher qui a publié, et quand", raison: "l'anonymat interdit d'attribuer la moindre responsabilité" },
];

const SUPPORTS_SUITE: readonly string[] = [
  "le journal imprimé",
  "la radio",
  "la télévision",
  "le fil en ligne",
];

const CAS_SUITE: readonly Cas[] = [
  { enonce: "Le premier support de presse de masse, au XIXe siècle.", rep: "le journal imprimé", raison: "le quotidien bon marché met le récit à la portée de tous" },
  { enonce: "Le support qui, dans les années vingt, apporte la voix.", rep: "la radio", raison: "l'information cesse d'attendre l'imprimerie" },
  { enonce: "Le support qui, après-guerre, apporte l'image animée.", rep: "la télévision", raison: "le journal télévisé devient le rendez-vous du soir" },
  { enonce: "Le support où l'information se corrige après publication.", rep: "le fil en ligne", raison: "la publication continue remplace l'édition figée" },
  { enonce: "Le support dont l'édition est arrêtée une fois pour toutes.", rep: "le journal imprimé", raison: "une fois tiré, il ne se corrige plus" },
  { enonce: "Le support qui a permis d'informer sans savoir lire.", rep: "la radio", raison: "la voix touche ceux que l'imprimé laissait de côté" },
];

const VERIFS_IMAGE: readonly string[] = [
  "ce que le cadre a laissé dehors",
  "d'où regardait le photographe",
  "à quel instant il a déclenché",
  "ce que la légende fait voir",
];

const CAS_VERIF_IMAGE: readonly Cas[] = [
  { enonce: "Une foule paraît immense, mais nul ne sait où elle s'arrête.", rep: "ce que le cadre a laissé dehors", raison: "le cadrage décide de ce qui existe pour le lecteur" },
  { enonce: "Un orateur est vu d'en bas, et parait dominer l'assemblée.", rep: "d'où regardait le photographe", raison: "la contre-plongée grandit le sujet" },
  { enonce: "Un visage est saisi entre deux mots, l'air hagard.", rep: "à quel instant il a déclenché", raison: "un instant isolé ne dit rien de la durée" },
  { enonce: "La même photographie illustre deux articles de sens contraire.", rep: "ce que la légende fait voir", raison: "le texte fait basculer ce que l'on croyait voir seul" },
  { enonce: "Un stade paraît vide, sur un cliché pris avant l'ouverture.", rep: "à quel instant il a déclenché", raison: "l'heure du déclenchement fait toute l'image" },
  { enonce: "Un manifestant semble seul face aux forces de l'ordre.", rep: "ce que le cadre a laissé dehors", raison: "le hors-champ contient peut-être des centaines de personnes" },
];

function item(
  id: string, notionId: string, microId: string, difficulty: TutorBankItemV4["difficulty"], hint: string,
  tags: readonly string[], question: string, table: readonly Cas[], pool: readonly string[],
  definition: string, methode: string,
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

function itemFaux(
  id: string, notionId: string, microId: string, difficulty: TutorBankItemV4["difficulty"], hint: string,
  tags: readonly string[], question: string, table: readonly CasFaux[],
  definition: string, methode: string,
): TutorBankItemV4 {
  return {
    kind: "template", id, niveau: "seconde", matiere: "francais", notionId, microId,
    difficulty, theme: "neutral", hint, tags: [...tags],
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `${c.enonce}\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.bonne, c.faux),
        expected: [c.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(definition, methode, `Ici, ${c.raison}.`, `La réponse est : ${c.bonne}.`),
      };
    },
  };
}

export const ideesPresseSecondeBank: TutorBankItemV4[] = [
  item("2de_arg_these_visee_tpl_1", "argumentation_2de", "2de_arg_these_visee", 2,
    "Demande-toi à quoi l'auteur fait appel : à la raison, au sentiment, au rire, ou à rien de tout cela.",
    ["seconde", "argumentation", "template"], "Quelle est la visée de ce passage ?", CAS_VISEE, VISEES,
    "La visée, c'est ce que le texte veut obtenir du lecteur. Convaincre s'adresse à la raison et s'appuie sur des preuves ; persuader passe par le sentiment ; l'ironie fait rire d'un travers pour le rendre insupportable ; l'exposé neutre se contente d'informer.",
    "Cherche le moyen employé : un chiffre, une scène, une pointe, ou rien. Le moyen désigne la visée."),

  itemFaux("2de_arg_presuppose_tpl_1", "argumentation_2de", "2de_arg_presuppose", 3,
    "Un présupposé, c'est ce qu'il faudrait déjà admettre pour que la phrase ait un sens.",
    ["seconde", "argumentation", "template"], "Que cet énoncé fait-il admettre sans le dire ?", PRESUPPOSES,
    "Le présupposé est ce qu'un énoncé tient pour acquis sans l'affirmer. Il ne se discute pas, puisqu'il n'est pas dit : c'est ce qui le rend redoutable. Nier la phrase ne le fait pas disparaitre — et c'est justement le test.",
    "Mets la phrase à la forme négative. Ce qui reste vrai malgré la négation était présupposé."),

  item("2de_arg_genres_discours_tpl_1", "argumentation_2de", "2de_arg_genres_discours", 3,
    "Trois questions : loue-t-il ? juge-t-il le passé ? conseille-t-il pour l'avenir ?",
    ["seconde", "argumentation", "template"], "De quel genre de discours s'agit-il ?", DISCOURS, GENRES_DISCOURS,
    "Le programme nomme trois genres. L'épidictique loue ou blâme, dans le présent d'une cérémonie. Le judiciaire accuse ou défend, à propos de faits passés. Le délibératif conseille ou déconseille, en vue d'une décision à prendre. Un texte qui se contente d'exposer n'appartient à aucun des trois.",
    "Repère le temps visé : le présent d'une cérémonie, le passé d'un fait, ou l'avenir d'une décision."),

  item("2de_arg_formes_tpl_1", "argumentation_2de", "2de_arg_formes", 2,
    "Cherche s'il y a une histoire inventée, un « je » qui réfléchit, un tribunal, ou une actualité.",
    ["seconde", "argumentation", "template"], "Quelle forme d'argumentation reconnait-on ?", FORMES_CAS, FORMES_ARG,
    "L'apologue argumente par une histoire inventée dont on tire une leçon : c'est de l'argumentation indirecte. L'essai avance en son nom propre. La plaidoirie s'adresse à ceux qui doivent juger. L'article relève de la presse et suit l'actualité.",
    "Demande-toi si le texte raconte pour démontrer, réfléchit en son nom, s'adresse à des juges, ou suit l'actualité."),

  item("2de_arg_concession_refutation_tpl_1", "argumentation_2de", "2de_arg_concession_refutation", 3,
    "Regarde si l'auteur reprend l'adversaire, et de quelle façon : en l'accordant, ou en l'attaquant.",
    ["seconde", "argumentation", "template"], "Quelle manœuvre l'auteur emploie-t-il ?", CAS_MANŒUVRE, MANŒUVRES,
    "Concéder, c'est accorder un point à l'adversaire pour le retourner ensuite : cela donne l'air d'être juste et désarme la contradiction. Réfuter, c'est attaquer l'argument adverse pour l'abattre. Démontrer, c'est avancer sa preuve sans reprendre personne. La question rhétorique fait dire au lecteur ce que l'auteur ne dit pas.",
    "Cherche si un argument adverse est cité. S'il l'est et qu'il est accordé, c'est une concession ; s'il est attaqué, une réfutation."),

  item("2de_arg_courant_pensee_tpl_1", "argumentation_2de", "2de_arg_courant_pensee", 3,
    "Cherche ce en quoi le texte met sa confiance : l'éducation, la raison critique, l'action, ou rien.",
    ["seconde", "argumentation", "template"], "À quel courant de pensée ce propos se rattache-t-il ?", CAS_COURANT, COURANTS,
    "Le programme demande d'inscrire une argumentation « dans un courant de pensée plus large ». L'humanisme mise sur la formation de l'homme par les lettres ; les Lumières sur l'examen critique contre les vérités reçues ; la littérature engagée met l'écriture au service d'une cause ; le scepticisme suspend le jugement faute de preuve.",
    "Demande-toi ce que le texte tient pour le moyen d'agir : instruire, examiner, dénoncer, ou s'abstenir."),

  item("2de_pres_genres_tpl_1", "presse_medias_2de", "2de_pres_genres", 2,
    "Longueur, signature, présence sur place, jugement : quatre indices, quatre genres.",
    ["seconde", "presse", "template"], "De quel genre de presse s'agit-il ?", CAS_PRESSE, GENRES_PRESSE,
    "La brève rapporte un fait sans commentaire. L'éditorial engage le journal sur une position. Le reportage raconte ce que le journaliste a vu sur place. La critique juge une œuvre et motive son jugement. Ces quatre genres n'ont ni la même longueur, ni la même signature, ni le même degré d'engagement.",
    "Regarde d'abord si le texte juge. S'il juge une œuvre : critique. S'il juge une question au nom du journal : éditorial."),

  item("2de_pres_fait_jugement_tpl_1", "presse_medias_2de", "2de_pres_fait_jugement", 2,
    "Un fait se vérifie. Un jugement s'apprécie. Une prévision attend. Une opinion attribuée appartient à quelqu'un d'autre.",
    ["seconde", "presse", "template"], "De quelle nature est cet énoncé ?", CAS_FAIT, FAIT_JUGEMENT,
    "Lire un article, c'est d'abord séparer ce qui se vérifie de ce qui s'apprécie. Un fait peut être contrôlé ; un jugement exprime une appréciation ; une prévision porte sur ce qui n'a pas eu lieu ; une opinion attribuée est celle d'un tiers, que le journal rapporte sans la reprendre.",
    "Demande-toi : puis-je vérifier cela auprès de quelqu'un ou d'un document ? Sinon, cherche l'adjectif ou l'attribution."),

  itemFaux("2de_pres_titre_presuppose_tpl_1", "presse_medias_2de", "2de_pres_titre_presuppose", 3,
    "Un titre est court : ce qu'il ne démontre pas, il le fait admettre.",
    ["seconde", "presse", "template"], "Que ce titre fait-il admettre avant même la lecture ?", TITRES,
    "Un titre dispose de peu de mots et d'une grande force. Les adverbes comme « enfin », « encore », « toujours pas », les adjectifs comme « vrai » ou « inattendu », et les questions en « pourquoi » installent des faits que l'article ne démontrera pas forcément.",
    "Repère l'adverbe ou l'adjectif, puis demande-toi ce qu'il faudrait déjà tenir pour vrai pour que le titre ait un sens."),

  item("2de_pres_sources_tpl_1", "presse_medias_2de", "2de_pres_sources", 3,
    "Trois questions : la source est-elle nommée ? est-elle intéressée ? est-elle récente ?",
    ["seconde", "presse", "template"], "Que dire de la fiabilité de cette information ?", CAS_SOURCE, FIABILITE,
    "Une information vaut ce que vaut sa source. Une source nommée et consultable est solide. Une source absente ne permet rien. Une source partie prenante a intérêt à ce qu'elle affirme : elle demande d'être recoupée. Une source ancienne a pu cesser d'être exacte.",
    "Nomme la source à voix haute. Si tu ne peux pas, l'information est faible. Si tu le peux, demande-toi ce qu'elle y gagne."),

  item("2de_pres_supports_histoire_tpl_1", "presse_medias_2de", "2de_pres_supports_histoire", 2,
    "Quatre étapes, quatre supports : le papier bon marché, la voix, l'image, puis chacun.",
    ["seconde", "presse", "template"], "À quelle étape de l'histoire des médias cela renvoie-t-il ?", CAS_SUPPORT, ETAPES,
    "Le programme demande de prendre en compte « l'influence des moyens techniques modernes de communication de masse, du XIXe siècle à nos jours ». Quatre étapes : le quotidien à bas prix, la radio, la télévision, puis le numérique — et chacune change qui parle, à qui, et sous quel contrôle.",
    "Demande-toi par quel canal l'information passe, et qui a le droit de publier à cette étape."),

  item("2de_pres_image_tpl_1", "presse_medias_2de", "2de_pres_image", 3,
    "Une photographie ne ment pas : elle choisit. Reste à savoir ce qui a été choisi.",
    ["seconde", "presse", "template"], "Qu'est-ce qui oriente la lecture de cette image ?", CAS_IMAGE, IMAGES_PRESSE,
    "Une image de presse résulte de quatre décisions au moins : ce qu'on garde dans le cadre, d'où l'on regarde, à quel instant on déclenche, et ce que la légende en dit. Aucune de ces décisions n'est neutre, et aucune ne se voit sur l'image elle-même.",
    "Demande-toi d'abord ce qui manque hors du cadre, puis où se tenait celui qui a pris la photographie."),

  /* ══════════════ LES SECONDS ITEMS ══════════════ */

  item("2de_arg_these_visee_tpl_2", "argumentation_2de", "2de_arg_these_visee", 3,
    "Une visée se reconnait au moyen qu'elle emploie. Demande-toi ce que l'auteur met en avant.",
    ["seconde", "argumentation", "template"], "Quel moyen cette visée emploie-t-elle ?", CAS_MOYEN, MOYENS,
    "Convaincre et persuader ne sont pas deux mots pour la même chose. Convaincre s'adresse à la raison et procède par preuves : on peut vérifier. Persuader s'adresse au sentiment et procède par images : on adhère sans pouvoir contrôler. L'ironie emprunte une troisième voie, le rire. Et l'exposé neutre ne cherche rien du lecteur.",
    "Regarde ce que l'auteur met en avant : un chiffre, une scène, une pointe, ou rien du tout. Le moyen employé désigne la visée."),

  itemFaux("2de_arg_presuppose_tpl_2", "argumentation_2de", "2de_arg_presuppose", 4,
    "Nie la phrase, puis relis-la. Ce qui résiste à la négation était présupposé.",
    ["seconde", "argumentation", "template"], "Que reste-t-il vrai même si l'on nie cette phrase ?", PRESUPPOSES_NIER,
    "Le test du présupposé est mécanique, et c'est ce qui le rend sûr : on met la phrase à la forme négative, et l'on regarde ce qui survit. Ce qui reste debout n'était pas affirmé, donc pas discutable — il était glissé sous l'affirmation. C'est ainsi qu'un titre fait admettre ce qu'il n'a jamais écrit.",
    "Écris la phrase au négatif, puis demande-toi ce qu'il faut encore admettre pour qu'elle garde un sens."),

  item("2de_arg_genres_discours_tpl_2", "argumentation_2de", "2de_arg_genres_discours", 3,
    "Chacun des trois genres regarde un temps différent : la cérémonie, le procès, la décision.",
    ["seconde", "argumentation", "template"], "Sur quel temps ce genre porte-t-il ?", CAS_TEMPS, TEMPS_DISCOURS,
    "Les trois genres du discours que nomme le programme se distinguent par le temps qu'ils visent. L'épidictique loue ou blâme dans le présent d'une cérémonie ; le judiciaire accuse ou défend à propos de faits passés ; le délibératif conseille en vue d'une décision à venir. Cette classification vient de l'Antiquité et sert encore.",
    "Ne cherche pas le ton, cherche le temps : ce qui se célèbre maintenant, ce qui s'est produit, ou ce qui reste à décider."),

  item("2de_arg_formes_tpl_2", "argumentation_2de", "2de_arg_formes", 3,
    "Chaque forme a un propre, et un seul. Cherche ce qu'elle est seule à faire.",
    ["seconde", "argumentation", "template"], "Quel est le propre de cette forme ?", CAS_PROPRE, PROPRES,
    "L'argumentation est dite directe quand l'auteur avance sa thèse en son nom — c'est l'essai. Elle est indirecte quand une histoire inventée porte la démonstration à sa place : c'est l'apologue, fable ou conte philosophique. La plaidoirie, elle, vise une décision de justice ; l'article naît d'un événement et se périme avec lui.",
    "Demande-toi si le texte raconte pour démontrer, s'il parle en son nom, s'il s'adresse à des juges, ou s'il suit l'actualité."),

  item("2de_arg_concession_refutation_tpl_2", "argumentation_2de", "2de_arg_concession_refutation", 3,
    "Concéder n'est pas céder : c'est accorder un point pour être cru sur le reste.",
    ["seconde", "argumentation", "template"], "En quoi consiste cette manœuvre ?", CAS_MANOEUVRE_DEF, MANOEUVRES_DEF,
    "Discuter une opinion demande de la reprendre avant de la combattre. Concéder, c'est accorder un point à l'adversaire — non par faiblesse, mais parce qu'un lecteur croit davantage celui qui ne prétend pas avoir raison sur tout. Réfuter, c'est montrer que son argument ne tient pas. Confirmer, c'est appuyer sa propre thèse. Esquiver, c'est feindre de répondre.",
    "Regarde ce que l'auteur fait de l'argument adverse : il l'accorde, il l'attaque, il l'ignore, ou il le remplace par un autre."),

  item("2de_arg_courant_pensee_tpl_2", "argumentation_2de", "2de_arg_courant_pensee", 3,
    "Chaque courant tient en une phrase. Cherche celle qui pourrait être sa devise.",
    ["seconde", "argumentation", "template"], "Quel est le mot d'ordre de ce courant ?", CAS_MOT_ORDRE, MOTS_ORDRE,
    "Inscrire un texte dans un courant de pensée, c'est retrouver ce qu'il tient pour évident. L'Humanisme revient aux textes anciens eux-mêmes ; le classicisme soumet l'art à la raison et à la règle ; la préciosité cherche le rare contre le mot commun ; les Lumières veulent instruire les hommes par l'examen.",
    "Cherche ce que le texte n'a pas besoin de justifier : c'est là que le courant se trahit."),

  item("2de_pres_genres_tpl_2", "presse_medias_2de", "2de_pres_genres", 3,
    "Un genre de presse se reconnait à ce qu'il engage : la rédaction, le témoin, ou personne.",
    ["seconde", "presse", "template"], "À quoi reconnait-on ce genre ?", CAS_SIGNE, SIGNES_PRESSE,
    "Les genres de presse ne se distinguent pas par leur sujet, qui peut être le même, mais par ce qu'ils engagent. L'éditorial engage la rédaction et assume une position. Le reportage vaut par la présence du journaliste sur les lieux. La brève informe sans développer. L'interview laisse parler un autre, et le journaliste s'efface.",
    "Demande-toi qui parle et qui répond de ce qui est dit. C'est ce partage qui nomme le genre."),

  item("2de_pres_fait_jugement_tpl_2", "presse_medias_2de", "2de_pres_fait_jugement", 3,
    "Un fait se vérifie, un jugement s'apprécie. Une prévision ne se vérifie pas encore.",
    ["seconde", "presse", "template"], "De quelle nature est cet énoncé ?", CAS_NATURE, NATURES,
    "Séparer le fait du jugement est le premier geste de lecture d'un article — et il ne suffit pas de deux catégories. Une opinion rapportée d'un tiers n'engage pas le journal, mais elle n'est pas un fait pour autant. Une prévision porte sur ce qui n'a pas eu lieu : elle ne pourra être contrôlée que plus tard.",
    "Pose une seule question : puis-je vérifier cela aujourd'hui, et par quel moyen ? Si aucun moyen n'existe, ce n'est pas un fait."),

  item("2de_pres_titre_presuppose_tpl_2", "presse_medias_2de", "2de_pres_titre_presuppose", 4,
    "Un titre dispose de peu de signes. Chacun de ces procédés lui permet d'en dire plus qu'il n'en écrit.",
    ["seconde", "presse", "template"], "Quel procédé ce titre emploie-t-il ?", CAS_PROCEDE, PROCEDES_TITRE,
    "Un titre doit tenir en quelques mots, et quatre procédés lui permettent de suggérer sans affirmer : la question, qui pose le problème comme acquis ; le chiffre isolé, qu'aucune comparaison n'éclaire ; les guillemets, qui citent un mot sans le reprendre à son compte ; le conditionnel, qui rapporte sans garantir.",
    "Demande-toi ce que le titre affirmerait s'il fallait le prouver. La différence entre ce qu'il suggère et ce qu'il affirme est le procédé."),

  item("2de_pres_sources_tpl_2", "presse_medias_2de", "2de_pres_sources", 4,
    "À chaque défaut de source son geste : remonter, identifier, recouper — ou rien, quand on tient l'original.",
    ["seconde", "presse", "template"], "Quel geste de vérification s'impose ?", CAS_GESTE, GESTES_VERIF,
    "Vérifier n'est pas douter de tout : c'est savoir quel geste chaque situation réclame. Une information reprise demande qu'on remonte au document d'origine. Une publication sans auteur ni date demande qu'on identifie qui parle et quand. Une information isolée demande un recoupement. Et quand on tient la source elle-même, il n'y a plus rien à faire.",
    "Cherche d'abord ce qui manque : l'origine, l'auteur, ou la confirmation. Le manque désigne le geste."),

  item("2de_pres_supports_histoire_tpl_2", "presse_medias_2de", "2de_pres_supports_histoire", 3,
    "Chaque support a apporté quelque chose que le précédent ne pouvait pas donner.",
    ["seconde", "presse", "template"], "De quel support s'agit-il ?", CAS_SUITE, SUPPORTS_SUITE,
    "L'histoire des supports est celle de ce qu'ils ajoutent. Le journal imprimé du XIXe siècle met le récit à la portée de tous les budgets, mais son édition est figée une fois tirée. La radio apporte la voix, et informe ceux qui ne lisent pas. La télévision apporte l'image animée. Le fil en ligne apporte la correction après publication — et le doute qui va avec.",
    "Demande-toi ce que le support permet que le précédent interdisait, et ce qu'il perd au passage."),

  item("2de_pres_image_tpl_2", "presse_medias_2de", "2de_pres_image", 4,
    "Quatre décisions se prennent avant qu'une photographie existe. Cherche laquelle explique l'effet décrit.",
    ["seconde", "presse", "template"], "Que faut-il vérifier en premier ?", CAS_VERIF_IMAGE, VERIFS_IMAGE,
    "Une photographie de presse ne ment pas : elle choisit. Quatre décisions la précèdent — ce qu'on garde dans le cadre, d'où l'on regarde, à quel instant on déclenche, ce que la légende en dit. Aucune ne se voit sur l'image, et chacune peut renverser ce qu'elle paraît montrer.",
    "Nomme d'abord l'effet produit sur toi, puis demande-toi laquelle des quatre décisions a pu le produire."),
];
