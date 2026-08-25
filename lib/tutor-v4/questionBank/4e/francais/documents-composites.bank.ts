// lib/tutor-v4/questionBank/4e/francais/documents-composites.bank.ts
//
// LIRE DES DOCUMENTS NON LITTÉRAIRES ET DES IMAGES, EN 4e — écrit le 13/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020 — celui qui s'applique encore à la
// 4e jusqu'en septembre 2027.
//
// ⛔ CE QUI MANQUAIT : une COMPÉTENCE TRAVAILLÉE ENTIÈRE. Le programme range
// « Lire des textes non littéraires, des images et des documents composites (y
// compris numériques) » au même rang que « Élaborer une interprétation de
// textes littéraires ». Elle n'existait nulle part en 4e — le coach ne savait
// lire que de la littérature.
//
// PÉRIMÈTRE : « Connaître les caractéristiques génériques des différents
// documents étudiés (articles de presse, textes documentaires, schémas,
// graphiques, tableaux, images fixes et mobiles) » ; « Identification de la
// nature, des sources et des caractéristiques des différents documents » ;
// « Recherche et mise en relation des informations données » ; « description et
// interprétation de dessins de presse, de caricatures ».
// Plus, sous l'étude de la langue : « paroles rapportées : discours direct,
// indirect, INDIRECT LIBRE » — que la terminologie exige et qui n'était nulle
// part.
//
// ⚠️ Aucun document réel n'est reproduit : chaque cas est décrit en une ligne.
// Un élève doit pouvoir répondre sans avoir le document sous les yeux, parce
// que ce qui s'interroge est la MÉTHODE de lecture, pas un document précis.
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
   1. LA NATURE DU DOCUMENT
   ---------------------------------------------------------------------------
   Chaque nature répond à un besoin différent, et se lit autrement. Un graphique
   montre une évolution, un tableau croise des données, un schéma explique un
   fonctionnement : ils ne sont pas interchangeables.
   ========================================================================== */

const NATURES: readonly Cas[] = [
  { gauche: "Une courbe montre la population de l'île année après année depuis 1960.", droite: "un graphique : il donne à voir une évolution dans le temps" },
  { gauche: "Des lignes et des colonnes croisent les communes et leur nombre d'habitants.", droite: "un tableau : il croise deux séries de données chiffrées" },
  { gauche: "Des flèches et des légendes expliquent comment se forme un cyclone.", droite: "un schéma : il explique un fonctionnement, étape par étape" },
  { gauche: "Un texte signé, daté, avec un titre accrocheur, raconte un fait de la semaine.", droite: "un article de presse : il informe sur un fait daté et signé" },
  { gauche: "Un dessin exagère les traits d'une personnalité pour la critiquer.", droite: "un dessin de presse : il commente l'actualité en image" },
  { gauche: "Une photographie montre une foule sur une place, prise le jour même.", droite: "une photographie de presse : elle témoigne d'un moment" },
  { gauche: "Un bâton par année compare les pluies tombées à Saint-Denis.", droite: "un graphique : il donne à voir une évolution dans le temps" },
  { gauche: "Un texte explique ce qu'est le corail, sans raconter d'histoire ni donner d'avis.", droite: "un texte documentaire : il fait connaitre un sujet précis" },
  { gauche: "Des cases numérotées croisent les classes et leurs effectifs.", droite: "un tableau : il croise deux séries de données chiffrées" },
  { gauche: "Un dessin légendé montre les couches d'un sol volcanique.", droite: "un schéma : il explique un fonctionnement, étape par étape" },
  { gauche: "Un texte du jour, avec le nom du journal et celui du journaliste.", droite: "un article de presse : il informe sur un fait daté et signé" },
  { gauche: "Une image dessinée représente un ministre en géant écrasant une école.", droite: "un dessin de presse : il commente l'actualité en image" },
  { gauche: "Un texte décrit le cycle de vie de la tortue verte, avec des chiffres.", droite: "un texte documentaire : il fait connaitre un sujet précis" },
  { gauche: "Un cliché montre un pêcheur sur sa barque, sans légende ni date.", droite: "une photographie de presse : elle témoigne d'un moment" },
];

const TOUTES_NATURES: readonly string[] = [...new Set(NATURES.map((n) => n.droite))];

/* =============================================================================
   2. LA SOURCE, ET LE CROISEMENT DES DOCUMENTS
   ---------------------------------------------------------------------------
   « Identification de la nature, des SOURCES » ; « Recherche et MISE EN
   RELATION des informations données ». C'est le cœur de l'éducation aux médias
   que le programme place ici.
   ========================================================================== */

const SOURCES: readonly Cas[] = [
  { gauche: "Un document n'indique ni auteur ni date.", droite: "tu ne peux pas savoir s'il est à jour : cherche la source d'abord" },
  { gauche: "Deux journaux donnent deux chiffres différents pour la même manifestation.", droite: "tu cites les deux chiffres, et tu dis d'où vient chacun des deux" },
  { gauche: "Un texte est publié par l'entreprise dont il parle.", droite: "il peut être exact, mais pas neutre : celui qui parle a un intérêt" },
  { gauche: "Un chiffre circule sans qu'on sache qui l'a mesuré.", droite: "tu le traites comme une rumeur tant que la source n'est pas retrouvée" },
  { gauche: "Trois documents disent la même chose, mais reprennent tous le même communiqué.", droite: "ce n'est qu'une seule source : la répétition ne fait pas la confirmation" },
  { gauche: "Un article rapporte les propos d'un témoin sans les vérifier.", droite: "tu distingues ce que le témoin affirme de ce que le journal établit" },
  { gauche: "Un graphique n'indique pas l'unité de son axe vertical.", droite: "il ne prouve rien : sans unité, la courbe peut dire n'importe quoi" },
  { gauche: "Deux documents se contredisent, l'un daté de 2015, l'autre de cette année.", droite: "tu regardes les dates : le plus récent l'emporte, sauf raison contraire" },
  { gauche: "Un article commence par « selon une étude ».", droite: "tu cherches quelle étude : sans son nom, la formule ne prouve rien" },
  { gauche: "Une photographie est publiée sans dire où ni quand elle a été prise.", droite: "elle peut illustrer tout autre chose que ce qu'on veut lui faire dire" },
  { gauche: "Le même événement est raconté par un article et par un dessin de presse.", droite: "l'un rapporte, l'autre commente : tu ne leur demandes pas la même chose" },
  { gauche: "Un document numérique a été modifié depuis sa première publication.", droite: "tu regardes la date de mise à jour autant que celle de parution" },
  { gauche: "Un texte cite un chiffre exact au milieu d'une opinion.", droite: "tu sépares le fait brut, qui se vérifie, de l'avis, qui se discute" },
  { gauche: "Tu dois rendre compte de trois documents sur un même sujet.", droite: "tu cherches d'abord ce sur quoi ils s'accordent, puis ce qui les sépare" },
];

/* =============================================================================
   3. LIRE UNE IMAGE FIXE
   ---------------------------------------------------------------------------
   Le programme demande une lecture, pas une impression : le cadrage, le plan,
   l'angle et la lumière produisent du sens avant tout contenu.
   ========================================================================== */

const IMAGE: readonly Cas[] = [
  { gauche: "Le visage occupe toute l'image, on ne voit rien autour.", droite: "un gros plan : il impose l'émotion et supprime tout le décor" },
  { gauche: "On voit le personnage minuscule au milieu d'un paysage immense.", droite: "un plan large : il écrase le personnage sous ce qui l'entoure" },
  { gauche: "L'appareil regarde le personnage d'en bas.", droite: "une contre-plongée : elle grandit le sujet et le rend imposant" },
  { gauche: "L'appareil regarde le personnage d'en haut.", droite: "une plongée : elle écrase le sujet et le rend plus vulnérable" },
  { gauche: "Une seule zone est éclairée, tout le reste est dans l'ombre.", droite: "un éclairage contrasté : il désigne l'endroit où regarder" },
  { gauche: "Le personnage est décentré, avec du vide devant lui.", droite: "un cadrage décentré : le vide fait attendre quelque chose" },
  { gauche: "On ne voit que des mains, en très gros.", droite: "un gros plan : il impose l'émotion et supprime tout le décor" },
  { gauche: "La foule s'étend jusqu'à l'horizon et personne ne se distingue.", droite: "un plan large : il écrase le personnage sous ce qui l'entoure" },
  { gauche: "Le bâtiment est photographié depuis le trottoir, vers le ciel.", droite: "une contre-plongée : elle grandit le sujet et le rend imposant" },
  { gauche: "La scène est vue depuis un toit, très au-dessus des gens.", droite: "une plongée : elle écrase le sujet et le rend plus vulnérable" },
  { gauche: "Une lumière crue vient de côté et creuse tous les reliefs.", droite: "un éclairage contrasté : il désigne l'endroit où regarder" },
  { gauche: "Le sujet est placé tout à droite, l'espace libre est à gauche.", droite: "un cadrage décentré : le vide fait attendre quelque chose" },
  { gauche: "L'image ne montre qu'un œil et une partie du front.", droite: "un gros plan : il impose l'émotion et supprime tout le décor" },
  { gauche: "On voit la barque comme un point sur toute la surface de la mer.", droite: "un plan large : il écrase le personnage sous ce qui l'entoure" },
];

const TOUTES_IMAGES: readonly string[] = [...new Set(IMAGE.map((i) => i.droite))];

/* =============================================================================
   4. LE DESSIN DE PRESSE ET LA CARICATURE
   ---------------------------------------------------------------------------
   Un dessin de presse ne rapporte pas : il commente. Ses procédés se
   retrouvent d'un dessin à l'autre, et c'est cela qui s'apprend.
   ========================================================================== */

const DESSIN: readonly Cas[] = [
  { gauche: "Le nez et les oreilles du personnage sont dix fois trop grands.", droite: "l'exagération d'un trait : elle rend le personnage ridicule" },
  { gauche: "Une colombe tient un rameau dans son bec.", droite: "un symbole : un objet connu de tous remplace toute une idée" },
  { gauche: "D'un côté une table pleine, de l'autre une assiette vide.", droite: "le contraste : deux images côte à côte font voir l'injustice" },
  { gauche: "Une phrase sous le dessin change complètement ce qu'on croyait voir.", droite: "la légende : elle donne son sens au dessin, et parfois le retourne" },
  { gauche: "Un ministre est dessiné en géant, les citoyens en fourmis.", droite: "l'exagération d'un trait : elle rend le personnage ridicule" },
  { gauche: "Une balance apparait au-dessus d'un tribunal.", droite: "un symbole : un objet connu de tous remplace toute une idée" },
  { gauche: "À gauche un arbre en fleurs, à droite le même arbre mort.", droite: "le contraste : deux images côte à côte font voir l'injustice" },
  { gauche: "Le titre du dessin dit l'inverse de ce que la scène montre.", droite: "la légende : elle donne son sens au dessin, et parfois le retourne" },
  { gauche: "Un personnage a une bouche démesurée et des yeux minuscules.", droite: "l'exagération d'un trait : elle rend le personnage ridicule" },
  { gauche: "Une planète porte un pansement.", droite: "un symbole : un objet connu de tous remplace toute une idée" },
  { gauche: "Une file de voitures neuves passe devant un abribus effondré.", droite: "le contraste : deux images côte à côte font voir l'injustice" },
  { gauche: "Sans la phrase écrite dessous, on ne comprendrait pas de quoi il s'agit.", droite: "la légende : elle donne son sens au dessin, et parfois le retourne" },
  { gauche: "Un drapeau en lambeaux flotte au-dessus d'un bâtiment intact.", droite: "un symbole : un objet connu de tous remplace toute une idée" },
  { gauche: "Le personnage est reconnaissable à une seule mèche de cheveux, énorme.", droite: "l'exagération d'un trait : elle rend le personnage ridicule" },
];

const TOUS_PROCEDES: readonly string[] = [...new Set(DESSIN.map((d) => d.droite))];

/* =============================================================================
   5. LE DISCOURS INDIRECT LIBRE
   ---------------------------------------------------------------------------
   La terminologie du programme exige les trois : direct, indirect, indirect
   libre. Le troisième n'a ni guillemets ni subordonnée : les paroles passent
   dans le récit, et l'on entend deux voix à la fois.
   ⚠️ Les lignes vont PAR TRIOS : les mêmes paroles dans les trois formes.
   ========================================================================== */

const RAPPORTEES: readonly Cas[] = [
  { gauche: "Il pensa : « Je ne pourrai jamais y arriver. »", droite: "le discours direct : les paroles sont citées entre guillemets" },
  { gauche: "Il pensa qu'il ne pourrait jamais y arriver.", droite: "le discours indirect : les paroles passent dans une subordonnée" },
  { gauche: "Il s'arrêta net. Il ne pourrait jamais y arriver.", droite: "le discours indirect libre : ni guillemets ni mot subordonnant" },
  { gauche: "Elle se demanda : « Où sont-ils passés ? »", droite: "le discours direct : les paroles sont citées entre guillemets" },
  { gauche: "Elle se demanda où ils étaient passés.", droite: "le discours indirect : les paroles passent dans une subordonnée" },
  { gauche: "Elle scruta la cour vide. Où étaient-ils donc passés ?", droite: "le discours indirect libre : ni guillemets ni mot subordonnant" },
  { gauche: "Il murmura : « C'est fini pour cette année. »", droite: "le discours direct : les paroles sont citées entre guillemets" },
  { gauche: "Il murmura que c'était fini pour cette année.", droite: "le discours indirect : les paroles passent dans une subordonnée" },
  { gauche: "Il referma le cahier. C'était fini pour cette année.", droite: "le discours indirect libre : ni guillemets ni mot subordonnant" },
  { gauche: "Elle songea : « Demain, tout sera différent. »", droite: "le discours direct : les paroles sont citées entre guillemets" },
  { gauche: "Elle songea que le lendemain, tout serait différent.", droite: "le discours indirect : les paroles passent dans une subordonnée" },
  { gauche: "Elle éteignit la lampe. Le lendemain, tout serait différent.", droite: "le discours indirect libre : ni guillemets ni mot subordonnant" },
  { gauche: "Il grommela : « Personne ne m'écoute jamais. »", droite: "le discours direct : les paroles sont citées entre guillemets" },
  { gauche: "Il baissa les yeux. Personne ne l'écoutait jamais.", droite: "le discours indirect libre : ni guillemets ni mot subordonnant" },
  // ⚠️ QUATRIÈME FORME, ajoutée après mesure : la table n'en comptait que
  // trois, et le QCM ne sortait donc que trois propositions — une chance sur
  // trois au hasard au lieu d'une sur quatre. Le récit de paroles en est bien
  // une : on dit QU'IL a parlé, sans rapporter un seul de ses mots.
  { gauche: "Il annonça son départ à toute la classe.", droite: "le récit de paroles : on dit qu'il a parlé, sans citer ses mots" },
  { gauche: "Elle raconta longuement sa journée.", droite: "le récit de paroles : on dit qu'il a parlé, sans citer ses mots" },
  { gauche: "Ils discutèrent du voyage pendant une heure.", droite: "le récit de paroles : on dit qu'il a parlé, sans citer ses mots" },
];

const TOUTES_RAPPORTEES: readonly string[] = [...new Set(RAPPORTEES.map((r) => r.droite))];

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
    niveau: "4e",
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

export const documentsComposites4eBank: TutorBankItemV4[] = [
  gabarit(
    "4e_lect_documents_types_tpl_1",
    "4e_lect_documents_types",
    "lecture_comprehension",
    NATURES,
    TOUTES_NATURES,
    "De quelle nature ce document est-il ?",
    2,
    "Demande-toi à quelle question le document répond.",
    "Chaque nature de document répond à un besoin et se lit autrement : le graphique montre une évolution, le tableau croise des données, le schéma explique un fonctionnement, l'article informe sur un fait daté, le documentaire fait connaitre un sujet, le dessin de presse commente.",
    "Ne regarde pas le sujet, regarde la forme et le but. Un même sujet peut être traité par les six.",
    ["4e", "lecture", "documents", "template"],
  ),
  gabarit(
    "4e_lect_sources_croiser_tpl_1",
    "4e_lect_sources_croiser",
    "lecture_comprehension",
    SOURCES,
    SOURCES.map((s) => s.droite),
    "Que fais-tu, ou qu'est-ce que cela implique ?",
    3,
    "Un document sans source n'est pas une information : c'est une affirmation.",
    "Lire un document, c'est d'abord savoir qui parle, quand, et pourquoi. Croiser plusieurs documents, ce n'est pas les additionner : c'est chercher où ils s'accordent et où ils divergent — et vérifier qu'ils ne répètent pas tous la même source.",
    "Pose trois questions à tout document : qui l'a produit, quand, et avec quel intérêt. Puis sépare le fait brut, qui se vérifie, de l'avis, qui se discute.",
    ["4e", "lecture", "sources", "medias", "template"],
  ),
  gabarit(
    "4e_lect_image_fixe_tpl_1",
    "4e_lect_image_fixe",
    "lecture_comprehension",
    IMAGE,
    TOUTES_IMAGES,
    "Quel choix de l'image produit du sens ici ?",
    3,
    "Le sens vient d'abord d'où l'on s'est placé et de ce qu'on a coupé.",
    "Une image ne se contente pas de montrer : elle choisit. Le plan décide de la distance, l'angle décide du rapport de force, la lumière décide de ce qu'on regarde, et le cadre décide surtout de ce qu'on ne verra pas.",
    "Demande-toi où était celui qui a pris l'image, et ce qu'il a laissé hors du cadre. Ce sont ses deux décisions les plus fortes.",
    ["4e", "lecture", "image", "template"],
  ),
  gabarit(
    "4e_lect_dessin_presse_tpl_1",
    "4e_lect_dessin_presse",
    "lecture_comprehension",
    DESSIN,
    TOUS_PROCEDES,
    "Quel procédé le dessinateur emploie-t-il ?",
    3,
    "Un dessin de presse ne rapporte pas un fait : il en donne un avis.",
    "Le dessin de presse commente l'actualité par des procédés qui reviennent : l'exagération d'un trait, le symbole que tout le monde reconnait, le contraste entre deux images, et la légende, qui peut retourner ce qu'on croyait voir.",
    "Cherche ce qui n'est pas réaliste dans le dessin : c'est là que se trouve l'opinion. Puis lis la légende, et regarde si elle confirme ou renverse.",
    ["4e", "lecture", "dessin-de-presse", "caricature", "template"],
  ),
  gabarit(
    "4e_discours_indirect_libre_tpl_1",
    "4e_discours_indirect_libre",
    "analyse_discours",
    RAPPORTEES,
    TOUTES_RAPPORTEES,
    "Comment les paroles ou les pensées sont-elles rapportées ?",
    3,
    "Ni guillemets, ni « que » : et pourtant ce n'est plus le narrateur qui pense.",
    "Le programme exige les trois formes. Le discours direct cite entre guillemets. Le discours indirect fait passer les paroles dans une subordonnée. Le discours indirect libre n'a ni l'un ni l'autre : les paroles gardent leur mouvement propre — questions, exclamations — mais prennent les temps et les personnes du récit. On entend alors deux voix en même temps.",
    "S'il n'y a ni guillemets ni « que », mais qu'une phrase du récit sonne comme si le personnage la pensait — avec sa question, son ton, son « donc » —, c'est du discours indirect libre.",
    ["4e", "discours", "indirect-libre", "template"],
  ),
];
