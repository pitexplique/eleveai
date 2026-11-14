// lib/tutor-v4/questionBank/ce2/maths/longueur.bank.ts
//
// Les longueurs du CE2, écrites à la main. Jusqu'ici les huit
// micro-compétences passaient par le constructeur commun, qui aiguille sur la
// NOTION : « choisir l'unité la mieux adaptée » et « mesurer un segment »
// recevaient le même « Un ruban mesure 34 cm… ».
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : les unités km, m, dm, cm
// et mm, et les relations connues entre elles. DEUX interdits du texte, qui
// pèsent sur presque chaque question :
//   — pas de tableau de conversion : on passe par les relations (1 m = 100 cm,
//     1 km = 1000 m), pas par des colonnes à remplir ;
//   — pas d'écriture à virgule pour les longueurs. On écrit « 2 m 50 cm », et
//     jamais « 2,50 m ». La virgule est réservée à la monnaie.
//
// LE PIÈGE DE LA NOTION, celui qu'ils font tous : comparer les NOMBRES au lieu
// des longueurs. « 90 cm est plus long que 1 m, parce que 90 est plus grand
// que 1. » Il revient dans comparer, dans problème et dans les défis.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.
// Les réponses numériques en `short` deviennent cliquables toutes seules —
// l'unité écrite après le nombre est conservée par le convertisseur.

import type { CanvasFigure, NumberLineCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { choix, deuxPersonnes, gabarit, maj, pick, pl, quelquun, rint, troisPersonnes, type Etoile, type Q } from "./outils-mesures-ce2";
import { choisirUnite, comparer, estimer, relations, unites, type Grandeur } from "./grandeurs-ce2";

function numberLine(data: Omit<NumberLineCanvasData, "kind">): NumberLineCanvasData {
  return { kind: "number_line", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const longueurBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_LONGUEUR_UNITES — connaître km, m, dm, cm, mm
     Ce qui se joue ici : savoir laquelle est grande, laquelle
     est petite. Sans cet ordre, aucune conversion ne tient.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_unites_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Parmi le mètre, le centimètre et le millimètre, quelle est la plus PETITE unité ?",
    format: "qcm",
    choices: ["le millimètre", "le centimètre", "le mètre", "elles sont pareilles"],
    expected: ["le millimètre"],
    comparator: "mcq_exact",
    hint: "Regarde l'épaisseur d'une pièce de monnaie : on la mesure avec la plus petite.",
    explanation: exp(
      "Le millimètre est la plus petite unité de longueur qu'on utilise au CE2.",
      "On range les unités : millimètre, centimètre, décimètre, mètre, kilomètre.",
      "Il faut 10 millimètres pour faire 1 centimètre, et 100 centimètres pour faire 1 mètre. Le millimètre est donc tout en bas.",
      "La plus petite est le millimètre.",
    ),
    tags: ["ce2", "longueur", "unites", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_unites_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_unites",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le mot « kilomètre », que veut dire « kilo » ?",
    format: "qcm",
    choices: ["mille", "cent", "dix", "un million"],
    expected: ["mille"],
    comparator: "mcq_exact",
    hint: "C'est le même « kilo » que dans kilogramme.",
    explanation: exp(
      "« Kilo » est un mot grec qui veut dire mille.",
      "On lit le début du mot pour retrouver combien de fois l'unité est répétée.",
      "Un kilomètre, c'est mille mètres. C'est le même « kilo » que dans kilogramme, qui vaut mille grammes.",
      "« Kilo » veut dire mille.",
    ),
    tags: ["ce2", "longueur", "unites", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_unites_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_unites",
    difficulty: 3,
    theme: "reunion",
    text: "Sur la route entre Saint-Denis et Saint-Pierre, les panneaux annoncent les distances en km. Pourquoi pas en cm ?",
    format: "qcm",
    choices: [
      "parce que le nombre de centimètres serait beaucoup trop grand",
      "parce que le centimètre n'existe pas sur la route",
      "parce que le kilomètre est plus précis",
      "parce qu'on ne peut pas mesurer une route",
    ],
    expected: ["parce que le nombre de centimètres serait beaucoup trop grand"],
    comparator: "mcq_exact",
    hint: "80 km, ça ferait combien de centimètres ? Un nombre à huit chiffres.",
    explanation: exp(
      "On choisit une unité pour que le nombre reste facile à lire.",
      "On imagine la même distance écrite dans l'autre unité, puis on regarde la taille du nombre.",
      "Saint-Denis–Saint-Pierre fait environ 80 km. En centimètres, cela ferait 8 000 000 cm : illisible sur un panneau.",
      "On utilise le kilomètre pour garder un nombre court.",
    ),
    tags: ["ce2", "longueur", "unites", "reunion", "qcm"],
  },

  /* =========================================================
     CE2_LONGUEUR_RELATIONS — passer d'une unité à l'autre
     Le programme dit : par les relations connues, pas par un
     tableau de conversion.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_relations_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_relations",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centimètres dans 1 mètre ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Regarde une règle d'un mètre : compte ses graduations.",
    explanation: exp(
      "1 mètre vaut 100 centimètres.",
      "On se rappelle du mètre de la classe : il porte 100 petits traits numérotés.",
      "Le « centi » de centimètre veut dire cent : il faut 100 centimètres pour faire 1 mètre.",
      "1 m = 100 cm.",
    ),
    tags: ["ce2", "longueur", "relations", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_relations_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_relations",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 m = 10 cm ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 m = 100 cm",
      "oui",
      "non, 1 m = 1000 cm",
      "non, 1 m = 10 mm",
    ],
    expected: ["non, 1 m = 100 cm"],
    comparator: "mcq_exact",
    hint: "10 cm, c'est à peu près la largeur de ta main. Un mètre est bien plus long.",
    explanation: exp(
      "1 mètre vaut 100 centimètres, et 10 décimètres.",
      "On vérifie avec un objet connu : 10 cm, c'est la largeur d'une main.",
      "Il a confondu avec le décimètre : 1 m = 10 dm, mais 1 m = 100 cm. Dix mains ne font pas un mètre… il en faut dix fois plus de centimètres.",
      "Non : 1 m = 100 cm.",
    ),
    tags: ["ce2", "longueur", "relations", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_relations_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_relations",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de mètres dans 1 kilomètre ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "« Kilo » veut dire mille.",
    explanation: exp(
      "1 kilomètre vaut 1000 mètres.",
      "On lit le début du mot : « kilo » annonce mille.",
      "Un kilomètre, c'est mille mètres bout à bout. Marcher 1 km, c'est faire environ 1250 pas.",
      "1 km = 1000 m.",
    ),
    tags: ["ce2", "longueur", "relations", "remarquable"],
  },

  /* =========================================================
     CE2_LONGUEUR_MESURER — mesurer et tracer des segments
     Le piège d'ici : poser la règle n'importe où. Le zéro de
     la règle doit tomber sur le début du segment ; sinon il
     faut soustraire.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_mesurer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Pour mesurer un segment avec une règle graduée, où faut-il placer le début du segment ?",
    format: "qcm",
    choices: [
      "sur la graduation 0",
      "sur le bord de la règle",
      "sur la graduation 1",
      "n'importe où, cela ne change rien",
    ],
    expected: ["sur la graduation 0"],
    comparator: "mcq_exact",
    hint: "Le bord de la règle et le zéro ne sont pas toujours au même endroit.",
    explanation: exp(
      "Mesurer, c'est compter les graduations à partir de zéro.",
      "On cale le début du segment sur le 0, puis on lit le nombre à l'autre bout.",
      "Sur beaucoup de règles, le 0 est un peu après le bord en plastique. Si on part du bord, on compte des millimètres qui n'existent pas.",
      "On place le début du segment sur la graduation 0.",
    ),
    tags: ["ce2", "longueur", "mesurer", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_mesurer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_mesurer",
    difficulty: 3,
    theme: "neutral",
    text: "Léa a mal posé sa règle : le segment va du 2 au 9. Combien mesure-t-il, en cm ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Ne lis pas 9 : compte les graduations entre 2 et 9.",
    explanation: exp(
      "La mesure d'un segment, c'est l'écart entre les deux graduations, pas le nombre lu à l'arrivée.",
      "Quand la règle est décalée, on soustrait la graduation de départ de celle d'arrivée.",
      "9 - 2 = 7. Le segment mesure 7 cm, pas 9 cm : les deux premiers centimètres de la règle sont en dehors du segment.",
      "Le segment mesure 7 cm.",
    ),
    tags: ["ce2", "longueur", "mesurer", "piege"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_mesurer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer 8 cm, tu as marqué un point sur le 0 de ta règle. Que fais-tu ensuite ?",
    format: "qcm",
    choices: [
      "je marque un point sur la graduation 8 et je relie les deux points",
      "je compte 8 traits après le bord de la règle",
      "je trace un trait au hasard puis je le mesure",
      "je marque un point sur la graduation 9 pour être sûr",
    ],
    expected: ["je marque un point sur la graduation 8 et je relie les deux points"],
    comparator: "mcq_exact",
    hint: "Tracer, c'est mesurer à l'envers : on place les deux points d'abord.",
    explanation: exp(
      "Tracer un segment d'une longueur donnée, c'est placer deux points puis les relier.",
      "On pose le 0 de la règle sur le premier point, on repère la graduation voulue, on marque le second point.",
      "Le premier point est sur le 0, le second sur le 8 : entre les deux, il y a bien 8 centimètres. On relie ensuite les deux points en suivant la règle.",
      "On marque un point sur la graduation 8, puis on relie.",
    ),
    tags: ["ce2", "longueur", "mesurer", "methode", "qcm"],
  },

  /* =========================================================
     CE2_LONGUEUR_COMPARER — comparer des longueurs
     LE piège de la notion : comparer les nombres au lieu des
     longueurs. 90 cm contre 1 m, et l'élève choisit 90.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_comparer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus long : 1 m ou 90 cm ?",
    format: "qcm",
    choices: ["1 m", "90 cm", "c'est pareil", "on ne peut pas savoir"],
    expected: ["1 m"],
    comparator: "mcq_exact",
    hint: "Écris les deux longueurs dans la même unité avant de comparer.",
    explanation: exp(
      "On ne compare deux longueurs qu'après les avoir écrites dans la même unité.",
      "On choisit l'unité la plus petite des deux et on convertit.",
      "1 m = 100 cm. Or 100 cm est plus long que 90 cm. Le nombre 90 est plus grand que 1, mais il compte des centimètres, pas des mètres.",
      "1 m est plus long que 90 cm.",
    ),
    tags: ["ce2", "longueur", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_comparer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Léo dit : « 950 m, c'est plus long que 1 km, car 950 est plus grand que 1. » A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 km vaut 1000 m",
      "oui",
      "non, 1 km vaut 100 m",
      "on ne peut pas comparer des mètres et des kilomètres",
    ],
    expected: ["non, 1 km vaut 1000 m"],
    comparator: "mcq_exact",
    hint: "Mets tout en mètres, puis compare.",
    explanation: exp(
      "Un nombre sans son unité ne dit rien : 950 mètres et 1 kilomètre ne se comparent pas tels quels.",
      "On écrit les deux longueurs en mètres, puis on compare les nombres.",
      "1 km = 1000 m. Or 950 m est plus court que 1000 m. Il manque même 50 m pour atteindre le kilomètre.",
      "Non : 950 m est plus court que 1 km.",
    ),
    tags: ["ce2", "longueur", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_comparer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "Piton des Neiges : environ 3071 m. Piton de la Fournaise : environ 2632 m. Lequel est le plus haut ?",
    format: "qcm",
    choices: [
      "le Piton des Neiges",
      "le Piton de la Fournaise",
      "ils sont à la même hauteur",
      "on ne peut pas savoir",
    ],
    expected: ["le Piton des Neiges"],
    comparator: "mcq_exact",
    hint: "Les deux sont en mètres : compare directement les nombres.",
    explanation: exp(
      "Quand deux longueurs sont écrites dans la même unité, on compare directement les nombres.",
      "On regarde d'abord le chiffre des milliers.",
      "3071 et 2632 ont tous les deux quatre chiffres. Le chiffre des milliers est 3 pour le Piton des Neiges et 2 pour la Fournaise : 3071 > 2632.",
      "Le Piton des Neiges est le plus haut.",
    ),
    tags: ["ce2", "longueur", "comparer", "reunion", "qcm"],
  },

  /* =========================================================
     CE2_LONGUEUR_CHOISIR_UNITE — l'unité la mieux adaptée
     On choisit l'unité qui donne un nombre commode : ni un
     nombre à sept chiffres, ni une virgule.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_choisir_unite_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_choisir_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Avec quelle unité mesure-t-on la longueur d'un crayon ?",
    format: "qcm",
    choices: ["le centimètre", "le kilomètre", "le mètre", "le millimètre"],
    expected: ["le centimètre"],
    comparator: "mcq_exact",
    hint: "Un crayon tient dans la main : quelle unité donne un nombre facile ?",
    explanation: exp(
      "On choisit l'unité qui donne le nombre le plus simple à dire.",
      "On essaie chaque unité et on regarde le nombre qu'elle donne.",
      "Un crayon mesure environ 17 cm. En millimètres cela ferait 170 mm, plus long à dire, et en mètres il faudrait une virgule.",
      "On mesure un crayon en centimètres.",
    ),
    tags: ["ce2", "longueur", "choisir_unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_choisir_unite_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_choisir_unite",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « la porte de la classe mesure 2 cm de haut ». Quelle unité aurait-il dû écrire ?",
    format: "qcm",
    choices: ["le mètre", "le millimètre", "le kilomètre", "le décimètre"],
    expected: ["le mètre"],
    comparator: "mcq_exact",
    hint: "2 cm, c'est à peu près la largeur de ton pouce.",
    explanation: exp(
      "Une unité mal choisie rend la phrase absurde, même si le nombre est juste.",
      "On compare avec un objet connu : 2 cm, c'est la largeur d'un pouce.",
      "Une porte de classe fait environ 2 m, soit 200 cm. Le nombre 2 était bon, c'est l'unité qui manquait : des mètres, pas des centimètres.",
      "Il fallait écrire 2 m.",
    ),
    tags: ["ce2", "longueur", "choisir_unite", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_choisir_unite_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_choisir_unite",
    difficulty: 2,
    theme: "reunion",
    text: "Avec quelle unité mesure-t-on la distance entre Saint-Denis et Saint-Pierre ?",
    format: "qcm",
    choices: ["le kilomètre", "le mètre", "le centimètre", "le décimètre"],
    expected: ["le kilomètre"],
    comparator: "mcq_exact",
    hint: "C'est un trajet en voiture d'environ une heure et demie.",
    explanation: exp(
      "Pour les longues distances, on utilise le kilomètre.",
      "On imagine le nombre obtenu avec chaque unité, et on garde celle qui donne le plus court.",
      "Saint-Denis–Saint-Pierre fait environ 80 km. Ce serait 80 000 m, ou 8 000 000 cm : personne ne dit une distance comme ça.",
      "On mesure cette distance en kilomètres.",
    ),
    tags: ["ce2", "longueur", "choisir_unite", "reunion", "qcm"],
  },

  /* =========================================================
     CE2_LONGUEUR_ESTIMER — estimer à partir de références
     Estimer n'est pas deviner : c'est comparer à une longueur
     qu'on connaît par cœur.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_estimer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Environ combien mesure la hauteur d'une porte de salle de classe ?",
    format: "qcm",
    choices: ["2 m", "2 cm", "20 m", "2 km"],
    expected: ["2 m"],
    comparator: "mcq_exact",
    hint: "Un adulte passe dessous sans se baisser, mais de justesse.",
    explanation: exp(
      "Estimer, c'est comparer à une longueur qu'on connaît déjà.",
      "On prend une référence sûre : un adulte mesure à peu près 1 m 70.",
      "Une porte est un peu plus haute qu'un adulte, donc environ 2 m. 20 m, ce serait un immeuble de six étages.",
      "Une porte de classe mesure environ 2 m.",
    ),
    tags: ["ce2", "longueur", "estimer", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_estimer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que son doigt fait 1 m de large. Qu'aurait-il dû dire ?",
    format: "qcm",
    choices: ["1 cm", "1 mm", "1 dm", "1 km"],
    expected: ["1 cm"],
    comparator: "mcq_exact",
    hint: "Combien de doigts pour faire la largeur de ta main ?",
    explanation: exp(
      "Une bonne référence permet de repérer tout de suite une estimation absurde.",
      "On compare le doigt à un objet connu : une règle graduée.",
      "Un doigt d'enfant fait environ 1 cm de large : dix doigts côte à côte font 10 cm, la largeur d'une main. Un mètre, ce serait cent doigts.",
      "Il aurait dû dire 1 cm.",
    ),
    tags: ["ce2", "longueur", "estimer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_estimer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_estimer",
    difficulty: 3,
    theme: "reunion",
    text: "La route du Littoral relie Saint-Denis à La Possession. Elle mesure environ 12 ... ? Choisis l'unité.",
    format: "qcm",
    choices: ["km", "m", "cm", "mm"],
    expected: ["km"],
    comparator: "mcq_exact",
    hint: "On la parcourt en voiture en un quart d'heure.",
    explanation: exp(
      "Pour un trajet en voiture, la bonne unité est le kilomètre.",
      "On compare à une référence : marcher 1 km prend environ un quart d'heure.",
      "12 m, ce serait la longueur d'un bus. La route du Littoral longe toute la falaise : c'est bien 12 km, soit 12 000 m.",
      "Elle mesure environ 12 km.",
    ),
    tags: ["ce2", "longueur", "estimer", "reunion", "qcm"],
  },

  /* =========================================================
     CE2_LONGUEUR_PROBLEME — un problème de longueurs
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_probleme_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "Pour la fête, deux rubans : 3 m et 250 cm. Combien de centimètres en tout ?",
    format: "short",
    expected: ["550"],
    comparator: "number_equal",
    hint: "Mets les deux rouleaux en centimètres avant d'additionner.",
    explanation: exp(
      "On n'additionne des longueurs que si elles sont écrites dans la même unité.",
      "On convertit d'abord, on additionne ensuite.",
      "3 m = 300 cm. Puis 300 + 250 = 550.",
      "Il y a 550 cm de ruban en tout.",
    ),
    tags: ["ce2", "longueur", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_probleme_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Une corde mesure 2 m. On coupe 65 cm, puis 45 cm. Combien de centimètres reste-t-il ?",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "Additionne d'abord les deux morceaux coupés.",
    explanation: exp(
      "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
      "On convertit la corde en centimètres, on additionne les morceaux coupés, puis on soustrait.",
      "2 m = 200 cm. Les morceaux coupés font 65 + 45 = 110 cm. Il reste 200 - 110 = 90 cm.",
      "Il reste 90 cm de corde.",
    ),
    tags: ["ce2", "longueur", "probleme", "deux_etapes"],
  },

  /* =========================================================
     CE2_LONGUEUR_DEFI — les défis
     Ce qui ne s'obtient pas en appliquant une règle : les cas
     où plusieurs écritures disent la même longueur, et ceux
     où il faut décider si ça rentre.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour le même segment, Léa écrit 12 cm, Kevin 120 mm, Malia 1 dm 2 cm. Qui a raison ?",
    format: "qcm",
    choices: [
      "les trois : c'est la même longueur",
      "Léa seulement",
      "Kevin seulement",
      "Léa et Malia seulement",
    ],
    expected: ["les trois : c'est la même longueur"],
    comparator: "mcq_exact",
    hint: "Écris les trois mesures en centimètres.",
    explanation: exp(
      "Une même longueur peut s'écrire de plusieurs façons, avec des unités différentes.",
      "On ramène tout à la même unité, ici le centimètre.",
      "120 mm = 12 cm, car 10 mm font 1 cm. Et 1 dm 2 cm = 10 cm + 2 cm = 12 cm. Les trois écritures donnent 12 cm.",
      "Les trois ont raison.",
    ),
    tags: ["ce2", "longueur", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un ruban de 1 m. Tu coupes trois morceaux de 25 cm. Peux-tu en couper un quatrième ?",
    format: "qcm",
    choices: [
      "oui, tout juste",
      "non, il manque 25 cm",
      "oui, et il en restera encore",
      "non, il n'en reste rien",
    ],
    expected: ["oui, tout juste"],
    comparator: "mcq_exact",
    hint: "Combien font trois morceaux de 25 cm ? Compare au mètre.",
    explanation: exp(
      "Pour savoir si ça rentre, on compare ce qu'on a pris à ce qu'on avait au départ.",
      "On convertit le ruban en centimètres, puis on compte ce qui a déjà été coupé.",
      "1 m = 100 cm. Trois morceaux font 3 × 25 = 75 cm. Il reste 100 - 75 = 25 cm : exactement de quoi faire le quatrième.",
      "Oui, tout juste : quatre morceaux de 25 cm font pile 1 m.",
    ),
    tags: ["ce2", "longueur", "defi", "qcm"],
  },
];

/* =========================================================
   LES GABARITS (10/11/2026)
   ⛔ Avant : une phrase par gabarit, 5 à 28 squelettes par micro,
   10 à 18 répétitions sur 20, et 6 % des énoncés avec un dessin.
   Les familles communes aux trois grandeurs sont dans
   `grandeurs-ce2.ts` ; ici, la fiche de la longueur, la règle
   graduée et les problèmes.
   ⛔ Jamais le canvas `contenance` pour une longueur : des
   morceaux mis bout à bout (`schema_barre`), la règle
   (`number_line`) ou l'objet dessiné (`objets`).
========================================================= */

/** Des morceaux bout à bout. Les nombres ne vont DANS la barre que s'ils ont
 *  la même unité : le schéma les met à l'échelle, « 4 m » et « 33 cm » se
 *  dessineraient 4 contre 33. Sinon, ils vont dessous, à parts égales. */
function barre(parts: { label: string; value?: string; unknown?: boolean }[], total?: string): CanvasFigure {
  const unitesVues = new Set(parts.filter((p) => !p.unknown).map((p) => p.label.replace(/[\d\s]/g, "")));
  const memeUnite = unitesVues.size === 1 && parts.every((p) => /^\d+ \S+$/.test(p.label) || p.unknown);
  return {
    kind: "schema_barre",
    total,
    parts: parts.map((p) =>
      p.unknown ? { label: p.label, unknown: true } : memeUnite ? { label: "", value: p.label } : { label: p.label },
    ),
    display: { showTotal: !!total, showValues: true, showPartLabels: true },
  };
}

const LONGUEUR: Grandeur = {
  notionId: "longueur",
  mot: "longueur",
  laGrandeur: "une longueur",
  unites: [
    { sym: "mm", nom: "millimètre", le: "le millimètre", base: 1 },
    { sym: "cm", nom: "centimètre", le: "le centimètre", base: 10 },
    { sym: "dm", nom: "décimètre", le: "le décimètre", base: 100 },
    { sym: "m", nom: "mètre", le: "le mètre", base: 1000 },
    { sym: "km", nom: "kilomètre", le: "le kilomètre", base: 1000000 },
  ],
  instrument: "une règle graduée",
  verbe: "mesure",
  infinitif: "mesurer",
  avecQuelle: "Avec quelle unité mesure-t-on",
  sup: { m: "le plus long", f: "la plus longue" },
  questionPlus: "Qu'est-ce qui est le plus long",
  supports: [
    { le: "le ruban", un: "un ruban", grand: "m", petit: "cm", max: 5 },
    { le: "la ficelle", un: "une ficelle", f: true, grand: "m", petit: "cm", max: 4 },
    { le: "la corde à sauter", un: "une corde à sauter", f: true, grand: "m", petit: "cm", max: 3 },
    { le: "la guirlande", un: "une guirlande", f: true, grand: "m", petit: "cm", max: 9 },
    { le: "le tuyau d'arrosage", un: "un tuyau d'arrosage", grand: "m", petit: "cm", max: 9 },
    { le: "la bande de papier", un: "une bande de papier", f: true, grand: "m", petit: "cm", max: 3 },
    { le: "le serpentin", un: "un serpentin", grand: "m", petit: "cm", max: 5 },
    { le: "la planche", un: "une planche", f: true, grand: "m", petit: "cm", max: 4 },
    { le: "le crayon", un: "un crayon", grand: "cm", petit: "mm", max: 2 },
    { le: "la chenille", un: "une chenille", f: true, grand: "cm", petit: "mm", max: 5 },
    { le: "le chemin de randonnée", un: "un chemin de randonnée", grand: "km", petit: "m", max: 9 },
    { le: "la piste de vélo", un: "une piste de vélo", f: true, grand: "km", petit: "m", max: 5 },
    { le: "la tige de bambou", un: "une tige de bambou", f: true, grand: "m", petit: "dm", max: 3 },
    { le: "la queue du cerf-volant", un: "une queue de cerf-volant", f: true, grand: "m", petit: "dm", max: 4 },
  ],
  objets: [
    { nom: "un livre", quoi: "la longueur d'un livre", valeur: 25, unite: "cm", dessin: "livre" },
    { nom: "une voiture", quoi: "la longueur d'une voiture", valeur: 4, unite: "m", dessin: "voiture" },
    { nom: "un arbre", quoi: "la hauteur d'un grand arbre", valeur: 10, unite: "m", dessin: "arbre" },
    { nom: "une maison", quoi: "la hauteur d'une maison", valeur: 8, unite: "m", dessin: "maison" },
    { nom: "une clé", quoi: "la longueur d'une clé", valeur: 6, unite: "cm", dessin: "cle" },
    { nom: "un ballon de football", quoi: "la largeur d'un ballon de football", valeur: 22, unite: "cm", dessin: "ballon" },
    { nom: "un cartable", quoi: "la largeur d'un cartable", valeur: 40, unite: "cm", dessin: "cartable" },
    { nom: "une banane", quoi: "la longueur d'une banane", valeur: 18, unite: "cm", dessin: "banane" },
    { nom: "un poisson rouge", quoi: "la longueur d'un poisson rouge", valeur: 6, unite: "cm", dessin: "poisson" },
    { nom: "un papillon", quoi: "la largeur d'un papillon", valeur: 5, unite: "cm", dessin: "papillon" },
    { nom: "un bateau de pêche", quoi: "la longueur d'un bateau de pêche", valeur: 9, unite: "m", dessin: "bateau" },
    { nom: "une fourmi", quoi: "la longueur d'une fourmi", valeur: 4, unite: "mm" },
    { nom: "une coccinelle", quoi: "la longueur d'une coccinelle", valeur: 6, unite: "mm" },
    { nom: "la porte de la classe", quoi: "la hauteur de la porte de la classe", valeur: 2, unite: "m" },
    { nom: "une piscine", quoi: "la longueur d'une piscine", valeur: 25, unite: "m" },
    { nom: "une gomme", quoi: "la longueur d'une gomme", valeur: 4, unite: "cm" },
    { nom: "le chemin de l'école", quoi: "la distance entre la maison et l'école", valeur: 2, unite: "km" },
    { nom: "un lit", quoi: "la longueur d'un lit", valeur: 2, unite: "m" },
    { nom: "un crayon", quoi: "la longueur d'un crayon", valeur: 15, unite: "cm" },
    { nom: "un trajet en train", quoi: "la distance entre deux villes", valeur: 40, unite: "km" },
  ],
  barre,
  dessinObjet: (o) =>
    o.dessin ? { kind: "objets", elements: [{ quoi: o.dessin, label: o.nom.replace(/^(un |une |la |le )/, "") }], mode: "couleur" } : undefined,
};

/* ---------------------------------------------------------
   LA RÈGLE GRADUÉE
--------------------------------------------------------- */

const A_MESURER: readonly string[] = [
  "le crayon de Zoé",
  "la chenille",
  "la plume de Pic",
  "la clé du trésor",
  "la gomme de Téo",
  "le ver de terre",
  "la voiture de Ravi",
  "la fourchette",
  "le pinceau de Nina",
  "la feuille du marronnier",
  "la sauterelle",
  "le bâton de colle",
  "le coquillage",
  "la carte au trésor",
];

const regle = (min: number, max: number, debut: number, fin: number | null) =>
  numberLine({
    min,
    max,
    step: 1,
    minorStep: 0.5,
    points: [
      { value: debut, label: "début", color: "#2563eb" },
      ...(fin !== null ? [{ value: fin, label: "fin", color: "#ef4444" }] : []),
    ],
  });

function lireRegle(debutA0: boolean): Q {
  const quoi = pick(A_MESURER);
  const debut = debutA0 ? 0 : rint(1, 5);
  // la règle va de 0 à 12 : au-delà, ses nombres passent sur deux rangs (rendu du 10/11)
  const longueur = rint(2, debutA0 ? 11 : 11 - debut);
  const fin = debut + longueur;
  const bonne = `${longueur} cm`;
  const p = quelquun();
  return {
    text: debutA0
      ? `${pick([`${p.nom} mesure ${quoi} avec sa règle.`, `On pose ${quoi} sur la règle.`, `Voici ${quoi} posé${/^la /.test(quoi) ? "e" : ""} contre la règle.`])} ${pick([
          "Combien mesure-t-il, en centimètres ?",
          "Quelle est sa longueur ?",
          "Combien de centimètres mesure-t-il ?",
        ])}`.replace(/-t-il/, /^la /.test(quoi) ? "-t-elle" : "-t-il")
      : `${pick([
          `Règle mal posée : ${quoi} va de ${debut} à ${fin}.`,
          `Sur la règle, ${quoi} va du ${debut} au ${fin}.`,
        ])} ${pick(["Combien mesure-t-il vraiment ?", "Quelle est sa vraie longueur ?", "Combien de centimètres mesure-t-il ?"])}`.replace(
          /-t-il/,
          /^la /.test(quoi) ? "-t-elle" : "-t-il",
        ),
    format: "qcm",
    choices: choix(bonne, [`${fin} cm`, `${longueur + 1} cm`, `${longueur - 1} cm`, `${longueur} mm`, `${fin + debut} cm`, `${longueur + 2} cm`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Mesurer, c'est compter les centimètres entre le début et la fin.",
      debutA0 ? "Le début est sur le 0 : on lit la graduation de la fin." : "Le début n'est pas sur le 0 : on enlève la graduation du début à celle de la fin.",
      debutA0 ? `La fin est sur la graduation ${fin}.` : `${fin} − ${debut} = ${longueur}.`,
      `Il mesure ${bonne}.`,
    ),
    canvas: regle(0, 12, debut, fin),
  };
}

function tracer(depart: number): Q {
  const n = rint(3, 11 - Math.min(depart, 3));
  const fin = depart + n;
  const p = quelquun();
  const dessin = depart > 0 || Math.random() < 0.5;
  const objet = pick(["un segment", "le mât du bateau", "une tige de fleur", "le bord d'une carte", "la queue d'un dragon", "une ligne"]);
  return {
    text:
      depart === 0
        ? `${p.nom} trace ${objet} de ${n} cm à partir du 0. ${pick([`Où doit-${p.il} s'arrêter ?`, `Sur quelle graduation s'arrête-t-${p.il} ?`])}`
        : `Règle cassée : ${p.nom} trace ${objet} de ${n} cm à partir du ${depart}. ${pick([
            `Où s'arrête-t-${p.il} ?`,
            "Où finit le tracé ?",
          ])}`,
    format: "qcm",
    choices: choix(`sur le ${fin}`, [`sur le ${n}`, `sur le ${fin + 1}`, `sur le ${fin - 1}`, `sur le ${fin + 2}`, `sur le ${n - depart > 0 ? n - depart : fin + 3}`]),
    expected: [`sur le ${fin}`],
    comparator: "mcq_exact",
    explanation: exp(
      "Tracer n centimètres, c'est avancer de n graduations à partir du point de départ.",
      depart === 0 ? "On part du 0 : on s'arrête sur la graduation n." : "On ne part pas du 0 : on ajoute la longueur à la graduation de départ.",
      depart === 0 ? `0 + ${n} = ${n}.` : `${depart} + ${n} = ${fin}.`,
      `On s'arrête sur le ${fin}.`,
    ),
    canvas: dessin ? numberLine({ min: depart, max: depart + 12, step: 1, minorStep: 0.5, points: [{ value: depart, label: "départ", color: "#2563eb" }] }) : undefined,
  };
}

function lireMillimetres(): Q {
  const cm = rint(2, 9);
  const mm = rint(1, 9);
  const quoi = pick(A_MESURER);
  const enMm = Math.random() < 0.5;
  const bonne = enMm ? `${cm * 10 + mm} mm` : `${cm} cm ${mm} mm`;
  return {
    text: `On mesure ${quoi}. La fin est ${mm} petits traits après le ${cm}. ${
      enMm ? "Combien mesure-t-il en millimètres ?" : "Quelle est sa longueur ?"
    }`.replace("-t-il", /^la /.test(quoi) ? "-t-elle" : "-t-il"),
    format: "qcm",
    choices: choix(
      bonne,
      enMm
        ? [`${cm + mm} mm`, `${cm * 100 + mm} mm`, `${cm * 10 + mm + 10} mm`, `${cm}${mm}0 mm`]
        : [`${cm + 1} cm ${mm} mm`, `${cm} cm ${10 - mm} mm`, `${mm} cm ${cm} mm`, `${cm} cm ${mm + 1} mm`],
    ),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Sur la règle, 1 cm est partagé en 10 petits traits : ce sont les millimètres. 1 cm = 10 mm.",
      "On lit les centimètres entiers, puis on compte les petits traits.",
      enMm ? `${cm} cm ${mm} mm = ${cm} × 10 + ${mm} = ${cm * 10 + mm} mm.` : `${cm} centimètres entiers et ${mm} petits traits.`,
      `Il mesure ${bonne}.`,
    ),
    canvas: numberLine({ min: 0, max: 10, step: 1, minorStep: 0.1, points: [{ value: 0, label: "début", color: "#2563eb" }, { value: cm + mm / 10, label: "fin", color: "#ef4444" }] }),
  };
}

/* ---------------------------------------------------------
   PROBLÈMES DE LONGUEURS
--------------------------------------------------------- */

const BOUT_A_BOUT: readonly { qui: (p: string) => string; a: string; b: string }[] = [
  { qui: (p) => `${p} accroche deux guirlandes.`, a: "La dorée", b: "la rouge" },
  { qui: (p) => `${p} attache deux cordes.`, a: "La bleue", b: "la verte" },
  { qui: () => "Le jardinier relie deux tuyaux.", a: "Le premier", b: "le second" },
  { qui: (p) => `${p} colle deux bandes de papier.`, a: "La jaune", b: "l'orange" },
  { qui: () => "Les pirates nouent deux cordes.", a: "La rouge", b: "la noire" },
  { qui: (p) => `${p} noue deux rubans.`, a: "Le rose", b: "le violet" },
  { qui: () => "Au cirque, on attache deux fils.", a: "Le rouge", b: "le blanc" },
  { qui: (p) => `${p} relie deux fils.`, a: "Le doré", b: "l'argenté" },
  { qui: () => "La piste a deux morceaux.", a: "Le premier", b: "le second" },
  { qui: () => "La queue du dragon : deux morceaux.", a: "Le vert", b: "le jaune" },
];

function longueurTotale(e: Etoile): Q {
  const h = pick(BOUT_A_BOUT);
  const p = quelquun();
  const m = rint(1, e === 2 ? 3 : 5);
  const cm = e === 2 ? pick([10, 20, 25, 30, 40, 50, 60, 75, 80]) : rint(11, 95);
  const total = m * 100 + cm;
  const bonne = `${total} cm`;
  return {
    text: `${h.qui(p.nom)} ${pick([`${h.a} mesure ${m} m, ${h.b} ${cm} cm.`, `${h.a} fait ${m} m, ${h.b} ${cm} cm.`])} ${pick([
      "Combien de centimètres en tout ?",
      "Quelle longueur totale, en cm ?",
    ])}`,
    format: "qcm",
    choices: choix(bonne, [`${m + cm} cm`, `${Number(`${m}${cm}`)} cm`, `${m * 10 + cm} cm`, `${total + 100} cm`, `${total + 10} cm`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour additionner deux longueurs, on les écrit dans la même unité. 1 m = 100 cm.",
      "On change les mètres en centimètres, puis on ajoute.",
      `${m} m = ${m * 100} cm ; ${m * 100} + ${cm} = ${total}.`,
      `Bout à bout, cela fait ${bonne}.`,
    ),
    canvas: barre([{ label: `${m} m` }, { label: `${cm} cm` }], "? cm"),
  };
}

function combienDePlus(): Q {
  const [p, q] = deuxPersonnes();
  const s = pick(LONGUEUR.supports.filter((x) => x.grand === "m" && x.petit === "cm"));
  const m = rint(1, Math.min(4, s.max));
  const autre = m * 100 - pick([15, 20, 25, 30, 40, 45, 60, 75]);
  const ecart = m * 100 - autre;
  const bonne = `${ecart} cm`;
  return {
    text: `${maj(s.le)} de ${p.nom} mesure ${m} m, ${s.f ? "celle" : "celui"} de ${q.nom} ${autre} cm. ${pick([
      "Combien de centimètres d'écart ?",
      "Quel est l'écart, en cm ?",
      `Combien manque-t-il à ${q.nom} ?`,
    ])}`,
    format: "qcm",
    choices: choix(bonne, [`${Math.abs(autre - m)} cm`, `${ecart + 10} cm`, `${m * 100 + autre} cm`, `${ecart - 5} cm`, `${100 - (autre % 100)} cm`].filter((x) => x !== bonne)),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour trouver l'écart entre deux longueurs, on les écrit dans la même unité, puis on soustrait.",
      "1 m = 100 cm.",
      `${m} m = ${m * 100} cm ; ${m * 100} − ${autre} = ${ecart}.`,
      `L'écart est de ${bonne}.`,
    ),
    canvas: barre([{ label: `${autre} cm` }, { label: "?", unknown: true }], `${m} m`),
  };
}

const COUPES: readonly { tout: string; quoi: string }[] = [
  { tout: "une planche", quoi: "pour la cabane" },
  { tout: "une corde", quoi: "pour la balançoire" },
  { tout: "un ruban", quoi: "pour les paquets cadeaux" },
  { tout: "une bande de tissu", quoi: "pour les costumes du spectacle" },
  { tout: "un fil de laine", quoi: "pour les bracelets" },
  { tout: "une guirlande", quoi: "pour le sapin et la porte" },
  { tout: "un tuyau", quoi: "pour arroser les deux potagers" },
  { tout: "un rouleau de papier", quoi: "pour les dessins de dinosaures" },
];

function resteApresCoupes(): Q {
  const c = pick(COUPES);
  const m = rint(2, 5);
  const c1 = rint(15, 80);
  const c2 = rint(15, 80);
  const reste = m * 100 - c1 - c2;
  const p = quelquun();
  const bonne = `${reste} cm`;
  return {
    text: `${p.nom} a ${c.tout} de ${m} m. ${maj(p.il)} coupe ${c1} cm, puis ${c2} cm. ${pick([
      "Combien en reste-t-il ?",
      "Combien de centimètres reste-t-il ?",
    ])}`,
    format: "qcm",
    choices: choix(bonne, [`${m * 100 - c1} cm`, `${m * 10 - c1 - c2 > 0 ? m * 10 - c1 - c2 : reste + 20} cm`, `${reste + 10} cm`, `${c1 + c2} cm`, `${reste - 1} cm`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "1 m = 100 cm.",
      "On écrit la longueur de départ en centimètres, puis on enlève les morceaux coupés.",
      `${m} m = ${m * 100} cm ; ${m * 100} − ${c1} − ${c2} = ${reste}.`,
      `Il reste ${bonne}.`,
    ),
    canvas: barre([{ label: `${c1} cm` }, { label: `${c2} cm` }, { label: "?", unknown: true }], `${m} m`),
  };
}

function morceauxDans(): Q {
  const m = rint(2, 6);
  const piece = pick([20, 25, 40, 50]);
  const nb = (m * 100) / piece;
  if (!Number.isInteger(nb)) return morceauxDans();
  const quoi = pick(["un ruban", "un fil de fer", "une ficelle", "une corde", "une bande de papier", "une guirlande"]);
  return {
    text: `${pick([
      `Dans ${quoi} de ${m} m, on coupe des morceaux de ${piece} cm.`,
      `${quelquun().nom} coupe ${quoi} de ${m} m en morceaux de ${piece} cm.`,
      `On partage ${quoi} de ${m} m en morceaux de ${piece} cm.`,
    ])} ${"Combien de morceaux ?"}`,
    format: "qcm",
    choices: choix(pl(nb, "morceau", "morceaux"), [nb * 2, nb + 1, Math.max(1, nb - 2), (m * 10) / piece >= 1 ? (m * 10) / piece : m, m * piece].map((x) => pl(x, "morceau", "morceaux"))),
    expected: [pl(nb, "morceau", "morceaux")],
    comparator: "mcq_exact",
    explanation: exp(
      "1 m = 100 cm.",
      "On écrit la longueur en centimètres, puis on cherche combien de fois le morceau y tient.",
      `${m} m = ${m * 100} cm ; ${piece} × ${nb} = ${m * 100}.`,
      `On peut couper ${nb} morceaux.`,
    ),
    canvas: barre([{ label: `${piece} cm` }, { label: `${piece} cm` }, { label: "…", unknown: true }], `${m} m`),
  };
}

function deuxMorceauxPlus(): Q {
  const p = quelquun();
  const a = rint(35, 90);
  const ecart = rint(10, 30);
  const deMoins = Math.random() < 0.35;
  const b = deMoins ? a - ecart : a + ecart;
  const total = a + b;
  const quoi = pick([
    ["coupe deux bambous", "Le premier", "le second", "mis"],
    ["dessine deux serpents", "Le premier", "le second", "mis"],
    ["plante deux tournesols", "Le premier", "le second", "mis"],
    ["fait deux épées", "La première", "la seconde", "mises"],
    ["pose deux rails", "Le premier", "le second", "mis"],
    ["découpe deux dinosaures", "Le premier", "le second", "mis"],
    ["tresse deux bracelets", "Le premier", "le second", "mis"],
    ["peint deux bandes", "La première", "la seconde", "mises"],
    ["plie deux fusées", "La première", "la seconde", "mises"],
    ["coud deux écharpes", "La première", "la seconde", "mises"],
  ] as const);
  return {
    text: `${p.nom} ${quoi[0]}. ${quoi[1]} mesure ${a} cm, ${quoi[2]} ${ecart} cm de ${deMoins ? "moins" : "plus"}. ${pick([
      "Combien en tout ?",
      "Et bout à bout ?",
    ])}`,
    format: "qcm",
    choices: choix(`${total} cm`, [`${b} cm`, `${deMoins ? a + ecart : a - ecart} cm`, `${a + (deMoins ? a + ecart : a - ecart)} cm`, `${total + 10} cm`, `${2 * a} cm`, `${total - 1} cm`]),
    expected: [`${total} cm`],
    comparator: "mcq_exact",
    explanation: exp(
      deMoins ? "« De moins » : on enlève à la première longueur pour trouver la seconde." : "« De plus » : on ajoute à la première longueur pour trouver la seconde.",
      "On cherche d'abord la seconde longueur, puis on additionne les deux.",
      `${a} ${deMoins ? "−" : "+"} ${ecart} = ${b} ; ${a} + ${b} = ${total}.`,
      `Les deux font ${total} cm.`,
    ),
    canvas: barre([{ label: `${a} cm` }, { label: `${a} cm ${deMoins ? "−" : "+"} ${ecart} cm` }], "? cm"),
  };
}

function memeLongueur(): Q {
  const cm = rint(11, 39);
  const ecritures = [`${cm} cm`, `${cm * 10} mm`, `${Math.floor(cm / 10)} dm ${cm % 10} cm`];
  const [p, q, r] = troisPersonnes();
  const faux = Math.random() < 0.5;
  const ecr = [...ecritures];
  const k = rint(1, 2);
  if (faux) ecr[k] = k === 1 ? `${cm} mm` : `${Math.floor(cm / 10)} dm ${(cm % 10) + 1} cm`;
  const bonne = faux ? (k === 1 ? `${p.nom} et ${r.nom}` : `${p.nom} et ${q.nom}`) : "les trois";
  return {
    text: `Pour le même segment, ${p.nom} écrit ${ecr[0]}, ${q.nom} ${ecr[1]}, ${r.nom} ${ecr[2]}. Qui a raison ?`,
    format: "qcm",
    choices: choix(bonne, ["les trois", `${p.nom} seulement`, `${p.nom} et ${q.nom}`, `${p.nom} et ${r.nom}`]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Une même longueur peut s'écrire de plusieurs façons : 1 cm = 10 mm, 1 dm = 10 cm.",
      "On écrit toutes les mesures en millimètres pour les comparer.",
      `${cm} cm = ${cm * 10} mm = ${Math.floor(cm / 10)} dm ${cm % 10} cm.`,
      faux ? `${bonne} ont raison.` : "Les trois ont raison.",
    ),
  };
}

function combienDePas(): Q {
  const u = pick([
    { quoi: "Un pas de Ravi", cm: 50, sg: "pas", mot: "pas", total: "parcourir" },
    { quoi: "Une dalle du couloir", cm: 50, sg: "dalle", mot: "dalles", total: "couvrir" },
    { quoi: "Une marche du phare", cm: 20, sg: "marche", mot: "marches", total: "monter" },
    { quoi: "Un saut de grenouille", cm: 25, sg: "saut", mot: "sauts", total: "parcourir" },
    { quoi: "Un wagon", cm: 200, sg: "wagon", mot: "wagons", total: "faire un train de" },
    { quoi: "Une enjambée du géant", cm: 500, sg: "enjambée", mot: "enjambées", total: "parcourir" },
  ]);
  const m = u.cm >= 200 ? rint(2, 6) * (u.cm / 100) : rint(2, 9);
  const nb = (m * 100) / u.cm;
  if (!Number.isInteger(nb)) return combienDePas();
  return {
    text: `${u.quoi} mesure environ ${u.cm >= 100 ? `${u.cm / 100} m` : `${u.cm} cm`}. ${pick([
      `Combien de ${u.mot} pour ${u.total} ${m} m ?`,
      `Pour ${u.total} ${m} m, combien de ${u.mot} faut-il ?`,
    ])}`,
    format: "qcm",
    choices: choix(pl(nb, u.sg, u.mot), [nb * 2, nb + 1, m, Math.max(1, Math.round(nb / 2)), nb * 10].map((x) => pl(x, u.sg, u.mot))),
    expected: [pl(nb, u.sg, u.mot)],
    comparator: "mcq_exact",
    explanation: exp(
      "1 m = 100 cm.",
      "On écrit la distance en centimètres, puis on cherche combien de fois la petite longueur y tient.",
      `${m} m = ${m * 100} cm ; ${u.cm} × ${nb} = ${m * 100}.`,
      `Il en faut environ ${nb}.`,
    ),
    canvas: barre([{ label: u.cm >= 100 ? `${u.cm / 100} m` : `${u.cm} cm` }, { label: u.cm >= 100 ? `${u.cm / 100} m` : `${u.cm} cm` }, { label: "…", unknown: true }], `${m} m`),
  };
}

/* ---------------------------------------------------------
   LES GABARITS, micro par micro
--------------------------------------------------------- */

function gab(id: string, microId: string, difficulty: Etoile, hint: string, tags: string[], generate: () => Q) {
  return gabarit({ id, notionId: "longueur", microId, difficulty, hint, tags }, generate);
}

const L_UNI = "ce2_longueur_unites";
const L_REL = "ce2_longueur_relations";
const L_MES = "ce2_longueur_mesurer";
const L_CMP = "ce2_longueur_comparer";
const L_CHO = "ce2_longueur_choisir_unite";
const L_EST = "ce2_longueur_estimer";
const L_PRO = "ce2_longueur_probleme";
const L_DEF = "ce2_longueur_defi";

longueurBank.push(
  gab(`${L_UNI}_tpl_3`, L_UNI, 1, "Du plus petit au plus grand : mm, cm, dm, m, km. On mesure avec une règle.", ["unites"], () => unites(LONGUEUR, 1)),
  gab(`${L_UNI}_tpl_1`, L_UNI, 2, "mm = millimètre, cm = centimètre, dm = décimètre, m = mètre, km = kilomètre.", ["unites"], () => unites(LONGUEUR, 2)),
  gab(`${L_UNI}_tpl_2`, L_UNI, 3, "Du plus petit au plus grand : mm, cm, dm, m, km.", ["unites"], () => unites(LONGUEUR, 3)),

  gab(`${L_REL}_tpl_4`, L_REL, 1, "1 m = 100 cm ; 1 cm = 10 mm ; 1 km = 1000 m.", ["relations", "canvas"], () => relations(LONGUEUR, 1)),
  gab(`${L_REL}_tpl_1`, L_REL, 2, "Chaque mètre vaut 100 centimètres : on prend 100 autant de fois qu'il y a de mètres.", ["relations", "canvas"], () => relations(LONGUEUR, 2)),
  gab(`${L_REL}_tpl_2`, L_REL, 3, "Combien de fois 100 cm (ou 10 mm, ou 1000 m) dans ce nombre ?", ["relations"], () => relations(LONGUEUR, 3)),
  gab(`${L_REL}_tpl_3`, L_REL, 4, "4 m 5 cm, ce n'est pas 45 cm : 4 m = 400 cm, puis on ajoute 5.", ["relations", "piege", "canvas"], () => relations(LONGUEUR, 4)),

  gab(`${L_MES}_tpl_3`, L_MES, 1, "Le début sur le 0 : on lit la graduation de la fin.", ["mesurer", "canvas"], () => lireRegle(true)),
  gab(`${L_MES}_tpl_4`, L_MES, 2, "On part du 0 et on avance d'autant de centimètres qu'on veut tracer.", ["mesurer", "canvas"], () =>
    Math.random() < 0.5 ? tracer(0) : lireRegle(true),
  ),
  gab(`${L_MES}_tpl_1`, L_MES, 3, "Fin moins début : on compte les centimètres entre les deux.", ["mesurer", "canvas"], () => lireRegle(false)),
  gab(`${L_MES}_tpl_2`, L_MES, 4, "Règle cassée : on ajoute la longueur à la graduation de départ. Les petits traits sont les millimètres.", ["mesurer", "canvas"], () =>
    Math.random() < 0.55 ? tracer(rint(1, 4)) : lireMillimetres(),
  ),

  gab(`${L_CMP}_tpl_3`, L_CMP, 2, "Écris les deux longueurs dans la même unité avant de comparer.", ["comparer"], () => comparer(LONGUEUR, 2)),
  gab(`${L_CMP}_tpl_1`, L_CMP, 3, "1 m = 100 cm : compare les nombres seulement quand l'unité est la même.", ["comparer", "canvas"], () => comparer(LONGUEUR, 3)),
  gab(`${L_CMP}_tpl_2`, L_CMP, 4, "Écris toutes les longueurs dans la même unité, puis range-les.", ["comparer", "canvas"], () => comparer(LONGUEUR, 4)),

  gab(`${L_CHO}_tpl_3`, L_CHO, 1, "Petit comme un crayon : le centimètre. Grand comme une porte : le mètre.", ["choisir_unite", "canvas"], () => choisirUnite(LONGUEUR, 1)),
  gab(`${L_CHO}_tpl_1`, L_CHO, 2, "Choisis l'unité qui donne un nombre ni trop grand, ni trop petit.", ["choisir_unite", "canvas"], () => choisirUnite(LONGUEUR, 2)),
  gab(`${L_CHO}_tpl_2`, L_CHO, 3, "Imagine la mesure : est-ce possible ?", ["choisir_unite", "canvas"], () => choisirUnite(LONGUEUR, 3)),

  gab(`${L_EST}_tpl_3`, L_EST, 1, "Une porte mesure environ 2 m, un crayon environ 15 cm.", ["estimer", "canvas"], () => estimer(LONGUEUR, 1)),
  gab(`${L_EST}_tpl_1`, L_EST, 2, "Regarde d'abord l'unité : est-ce une petite ou une grande longueur ?", ["estimer", "canvas"], () => estimer(LONGUEUR, 2)),
  gab(`${L_EST}_tpl_4`, L_EST, 3, "Compare avec des objets que tu connais.", ["estimer", "canvas"], () => estimer(LONGUEUR, 3)),
  gab(`${L_EST}_tpl_2`, L_EST, 4, "Écris la distance en centimètres, puis cherche combien de fois la petite longueur y tient.", ["estimer"], combienDePas),

  gab(`${L_PRO}_tpl_3`, L_PRO, 2, "Écris tout en centimètres, puis additionne.", ["probleme", "canvas"], () =>
    Math.random() < 0.7 ? longueurTotale(2) : combienDePlus(),
  ),
  gab(`${L_PRO}_tpl_1`, L_PRO, 3, "1 m = 100 cm : change les mètres en centimètres, puis calcule.", ["probleme", "canvas"], () =>
    Math.random() < 0.6 ? longueurTotale(3) : combienDePlus(),
  ),
  gab(`${L_PRO}_tpl_2`, L_PRO, 4, "Écris tout en centimètres, puis enlève les morceaux coupés.", ["probleme", "canvas"], () =>
    Math.random() < 0.7 ? resteApresCoupes() : combienDePlus(),
  ),

  gab(`${L_DEF}_tpl_1`, L_DEF, 5, "Écris la longueur en centimètres, puis cherche combien de morceaux y tiennent.", ["defi"], () =>
    Math.random() < 0.6 ? morceauxDans() : memeLongueur(),
  ),
  gab(`${L_DEF}_tpl_2`, L_DEF, 5, "Cherche d'abord la seconde longueur, puis ajoute les deux.", ["defi", "deux_etapes", "canvas"], deuxMorceauxPlus),
);
