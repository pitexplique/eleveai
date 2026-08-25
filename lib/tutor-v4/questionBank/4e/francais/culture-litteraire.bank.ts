// lib/tutor-v4/questionBank/4e/francais/culture-litteraire.bank.ts
//
// LES QUATRE QUESTIONNEMENTS DE 4e, PLUS LE COMPLÉMENTAIRE — écrit le
// 16/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020, qui les nomme un par un :
//   1. Se chercher, se construire — Dire l'amour
//   2. Vivre en société, participer à la société — Individu et société :
//      confrontations de valeurs ?
//   3. Regarder le monde, inventer des mondes — La fiction pour interroger
//      le réel
//   4. Agir sur le monde — Informer, s'informer, déformer ?
//   + Questionnement complémentaire : La ville, lieu de tous les possibles ?
//
// ⏳ UN AN DE VIE, ET C'EST ASSUMÉ. Le BO n° 10 du 5 mars 2026 atteint la 4e à
// la rentrée 2027 et remplacera ces cinq entrées par quatre autres, déjà
// connues mot pour mot (« Sonder, explorer, anticiper : la fiction aux limites
// de notre monde », « Contempler, célébrer, veiller : habiter la terre en
// poète », « Obéir, désobéir, trahir ? Conflits de valeurs sur scène »,
// « Critiquer, dénoncer, penser : les Lumières en héritage »). La session du
// 13/08 avait écarté la 4e pour cette raison — un an, contre trois pour la 3e.
// Arbitrage de Frédéric le 16/08 : on les écrit quand même. Une année, c'est
// une cohorte entière, et la 4e était la SEULE classe du collège sans aucune
// entrée littéraire nommée — la 6e en a cinq, la 5e quatre, la 3e cinq.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE PRÉCISE. Les œuvres intégrales sont
// choisies par le professeur ; le coach n'a rien fait lire et ne peut pas
// demander ce qu'il y avait au chapitre 4. Ce qui s'interroge, c'est ce qui se
// transporte d'une œuvre à l'autre : les façons de dire l'amour, la nature
// d'un conflit de valeurs, ce qui sépare le fantastique du merveilleux, la
// différence entre un fait brut et une information, et les visages que prend
// la ville sous la plume.
//
// ⚠️ Les situations décrites ici sont écrites POUR ce fichier. Aucun texte
// d'auteur n'est reproduit, aucun titre n'est demandé.
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

function exp(
  definition: string,
  methode: string,
  exemple: string,
  conclusion: string,
) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

type Cas = { readonly gauche: string; readonly droite: string };

/* =============================================================================
   1. DIRE L'AMOUR
   ---------------------------------------------------------------------------
   Le programme demande de « découvrir des poèmes de différentes époques
   exprimant les variations du discours amoureux » et de « comprendre les
   nuances du sentiment amoureux ». Ce qui se transporte d'un siècle à l'autre,
   ce n'est pas le sentiment : ce sont les FAÇONS de le dire. Six, et elles se
   reconnaissent à qui parle, à qui, et dans quel état.
   ========================================================================== */

const AMOUR: readonly Cas[] = [
  { gauche: "Le poète s'adresse directement à celle qu'il aime et lui avoue, en face, ce qu'il n'osait pas dire.", droite: "la déclaration : on parle à l'être aimé pour dire ce qu'on éprouve" },
  { gauche: "Toute la lettre tend vers une phrase, retardée jusqu'à la fin : « je vous aime »." , droite: "la déclaration : on parle à l'être aimé pour dire ce qu'on éprouve" },
  { gauche: "Le personnage répète qu'il va se taire, et il parle pendant vingt vers pour dire son amour.", droite: "la déclaration : on parle à l'être aimé pour dire ce qu'on éprouve" },

  { gauche: "Le poème énumère les cheveux, le front, les yeux, la main, et célèbre chaque détail l'un après l'autre.", droite: "l'éloge : le texte célèbre la beauté de l'aimé, détail par détail" },
  { gauche: "Chaque strophe compare une partie du visage à une chose précieuse.", droite: "l'éloge : le texte célèbre la beauté de l'aimé, détail par détail" },
  { gauche: "Le texte ne raconte rien : il décrit celle qu'il aime, et rien d'autre.", droite: "l'éloge : le texte célèbre la beauté de l'aimé, détail par détail" },

  { gauche: "Le poète pleure celle qui est morte, et le poème entier tient dans ce deuil.", droite: "la plainte : le texte dit la douleur d'un amour perdu ou impossible" },
  { gauche: "Le texte revient sur un bonheur ancien, et chaque souvenir rend l'absence plus lourde.", droite: "la plainte : le texte dit la douleur d'un amour perdu ou impossible" },
  { gauche: "Le personnage sait que cet amour ne se réalisera jamais, et il le dit sans espoir.", droite: "la plainte : le texte dit la douleur d'un amour perdu ou impossible" },

  { gauche: "Le poète, éconduit, retourne son amour en reproche et accuse celle qui l'a quitté.", droite: "le dépit : l'amour blessé se retourne en reproche et en colère" },
  { gauche: "Le texte annonce qu'il ne parlera plus d'elle, puis lui reproche tout pendant trente vers.", droite: "le dépit : l'amour blessé se retourne en reproche et en colère" },
  { gauche: "Le personnage jure qu'il est guéri, et sa colère prouve le contraire.", droite: "le dépit : l'amour blessé se retourne en reproche et en colère" },

  { gauche: "L'aimé est parti ; le poème ne parle que de la chambre vide et du temps qui ne passe pas.", droite: "l'attente : c'est le manque, non l'aimé, que le texte met au centre" },
  { gauche: "Le texte compte les jours qui restent avant le retour, et ne dit presque rien de l'autre.", droite: "l'attente : c'est le manque, non l'aimé, que le texte met au centre" },
  { gauche: "Le personnage guette une lettre qui n'arrive pas, et c'est cette guette qui occupe tout le poème.", droite: "l'attente : c'est le manque, non l'aimé, que le texte met au centre" },

  { gauche: "Le poète se moque des comparaisons habituelles — les yeux comme des soleils — et dit qu'il aimera sans elles.", droite: "l'ironie : le texte se moque des façons convenues de dire l'amour" },
  { gauche: "Le texte reprend tous les compliments attendus pour montrer qu'ils ne veulent plus rien dire.", droite: "l'ironie : le texte se moque des façons convenues de dire l'amour" },
  { gauche: "Le personnage refuse le langage des amoureux et prétend parler « comme on parle ».", droite: "l'ironie : le texte se moque des façons convenues de dire l'amour" },
];

const TOUTES_FACONS: readonly string[] = [...new Set(AMOUR.map((c) => c.droite))];

/* =============================================================================
   2. INDIVIDU ET SOCIÉTÉ : CONFRONTATIONS DE VALEURS ?
   ---------------------------------------------------------------------------
   Le programme demande de « découvrir la confrontation des valeurs portées par
   les personnages » et de comprendre que « le dynamisme de l'action dramatique
   ou romanesque est lié aux conflits ». Ce qui s'interroge, ce n'est donc pas
   l'histoire : c'est ce qui S'OPPOSE À QUOI, et c'est cela qui fait avancer.
   ========================================================================== */

const VALEURS: readonly Cas[] = [
  { gauche: "Le personnage aime quelqu'un que sa charge lui interdit d'épouser, et il doit choisir.", droite: "le devoir contre la passion : ce qu'on doit faire s'oppose à ce que l'on désire" },
  { gauche: "Un officier doit arrêter l'homme qu'il aime comme un frère.", droite: "le devoir contre la passion : ce qu'on doit faire s'oppose à ce que l'on désire" },
  { gauche: "L'héroïne renonce à partir parce qu'une promesse la retient.", droite: "le devoir contre la passion : ce qu'on doit faire s'oppose à ce que l'on désire" },

  { gauche: "Le jeune homme veut choisir son métier ; sa famille a décidé pour lui depuis toujours.", droite: "l'individu contre le groupe : une personne veut se décider seule, le milieu retient" },
  { gauche: "La jeune fille refuse le mariage arrangé, et tout le village le lui reproche.", droite: "l'individu contre le groupe : une personne veut se décider seule, le milieu retient" },
  { gauche: "Le personnage quitte sa province pour la capitale, contre l'avis de tous les siens.", droite: "l'individu contre le groupe : une personne veut se décider seule, le milieu retient" },

  { gauche: "Le personnage préfère mourir plutôt que d'accepter une réparation qui le déshonorerait.", droite: "l'honneur contre la vie sauve : on tient à sa réputation plus qu'à sa sécurité" },
  { gauche: "Un duel est refusé, et celui qui refuse perd tout aux yeux des autres.", droite: "l'honneur contre la vie sauve : on tient à sa réputation plus qu'à sa sécurité" },
  { gauche: "Le soldat reste sur la position, sachant qu'il n'en reviendra pas, pour ne pas passer pour un lâche.", droite: "l'honneur contre la vie sauve : on tient à sa réputation plus qu'à sa sécurité" },

  { gauche: "On ordonne au personnage quelque chose qu'il juge injuste, et il doit décider s'il obéit.", droite: "l'obéissance contre la conscience : un ordre s'oppose à ce que l'on croit juste" },
  { gauche: "Le serviteur reçoit une consigne qui va nuire à un innocent.", droite: "l'obéissance contre la conscience : un ordre s'oppose à ce que l'on croit juste" },
  { gauche: "Le personnage applique la règle, puis s'aperçoit qu'elle écrase quelqu'un.", droite: "l'obéissance contre la conscience : un ordre s'oppose à ce que l'on croit juste" },

  { gauche: "Le personnage peut s'élever socialement à condition de trahir celui qui l'a aidé.", droite: "l'ambition contre la fidélité : monter suppose de laisser quelqu'un derrière soi" },
  { gauche: "Une place est promise à qui acceptera de dénoncer un ancien ami.", droite: "l'ambition contre la fidélité : monter suppose de laisser quelqu'un derrière soi" },
  { gauche: "Le jeune arriviste renie ses origines pour être reçu dans un salon.", droite: "l'ambition contre la fidélité : monter suppose de laisser quelqu'un derrière soi" },

  { gauche: "La loi condamne un homme que tout le monde, dans le livre, sait innocent.", droite: "la justice contre la loi : ce qui est légal n'est pas toujours ce qui est juste" },
  { gauche: "Le personnage vole du pain pour nourrir un enfant, et le texte pose la question de sa faute.", droite: "la justice contre la loi : ce qui est légal n'est pas toujours ce qui est juste" },
  { gauche: "Un juge applique un texte dont il désapprouve les effets.", droite: "la justice contre la loi : ce qui est légal n'est pas toujours ce qui est juste" },
];

const TOUS_CONFLITS: readonly string[] = [...new Set(VALEURS.map((c) => c.droite))];

/* =============================================================================
   3. LA FICTION POUR INTERROGER LE RÉEL
   ---------------------------------------------------------------------------
   Le programme demande de comprendre « les ambitions du roman réaliste ou
   naturaliste au XIXe en matière de représentation de la société » et « comment
   le récit fantastique interroge le statut et les limites du réel ».
   ⚠️ LA FRONTIÈRE QUI COMPTE EST CELLE DU DOUTE : dans le fantastique il reste,
   dans le merveilleux il n'y en a jamais eu.
   ========================================================================== */

const FICTION: readonly Cas[] = [
  { gauche: "Le roman décrit minutieusement un quartier, un métier, des salaires, sans rien embellir.", droite: "le réalisme : montrer la société telle qu'elle est, jusque dans ses détails" },
  { gauche: "L'auteur s'est documenté sur place avant d'écrire, et cela se voit à chaque page.", droite: "le réalisme : montrer la société telle qu'elle est, jusque dans ses détails" },
  { gauche: "Le récit suit une vie ordinaire, sans héros ni exploit.", droite: "le réalisme : montrer la société telle qu'elle est, jusque dans ses détails" },

  { gauche: "Le personnage semble condamné d'avance par son milieu et par ce qu'il tient de ses parents.", droite: "le naturalisme : expliquer l'homme par son milieu et son hérédité, comme un cas" },
  { gauche: "Le roman se présente comme l'étude d'une famille sur plusieurs générations.", droite: "le naturalisme : expliquer l'homme par son milieu et son hérédité, comme un cas" },
  { gauche: "L'auteur observe son personnage comme un savant observerait un cas.", droite: "le naturalisme : expliquer l'homme par son milieu et son hérédité, comme un cas" },

  { gauche: "Tout est ordinaire, sauf une chose ; à la fin, on ne sait toujours pas si le narrateur a rêvé.", droite: "le fantastique : une seule chose inexplicable, et le doute reste jusqu'au bout" },
  { gauche: "Le personnage hésite entre la folie et le surnaturel, et le texte se garde de trancher.", droite: "le fantastique : une seule chose inexplicable, et le doute reste jusqu'au bout" },
  { gauche: "Un objet familier se met à se comporter autrement, et personne ne peut l'expliquer.", droite: "le fantastique : une seule chose inexplicable, et le doute reste jusqu'au bout" },

  { gauche: "Dès la première phrase, les animaux parlent, et cela n'étonne aucun personnage.", droite: "le merveilleux : le surnaturel est admis dès le départ, personne ne s'en étonne" },
  { gauche: "Le récit commence par « il était une fois » et l'on entre dans un monde où la magie va de soi.", droite: "le merveilleux : le surnaturel est admis dès le départ, personne ne s'en étonne" },
  { gauche: "Une fée intervient, et le héros la remercie comme il remercierait un voisin.", droite: "le merveilleux : le surnaturel est admis dès le départ, personne ne s'en étonne" },

  { gauche: "Le récit imagine ce que deviendrait le monde si une machine découverte aujourd'hui allait jusqu'au bout.", droite: "l'anticipation : un monde possible, tiré d'une science poussée bien plus loin" },
  { gauche: "L'histoire se passe dans un siècle, et tout y découle d'une invention expliquée au lecteur.", droite: "l'anticipation : un monde possible, tiré d'une science poussée bien plus loin" },
  { gauche: "Le voyage décrit un engin qui n'existe pas encore, mais dont le fonctionnement est raisonné.", droite: "l'anticipation : un monde possible, tiré d'une science poussée bien plus loin" },

  { gauche: "Le livre décrit une société parfaitement organisée pour montrer ce qui cloche dans la nôtre.", droite: "la société imaginée : on invente un monde entier pour faire voir le monde réel" },
  { gauche: "Les habitants de cette cité sont heureux et surveillés, et le lecteur comprend de quoi on lui parle.", droite: "la société imaginée : on invente un monde entier pour faire voir le monde réel" },
  { gauche: "Un voyageur découvre un peuple dont les usages sont l'exact envers des nôtres.", droite: "la société imaginée : on invente un monde entier pour faire voir le monde réel" },
];

const TOUTES_FICTIONS: readonly string[] = [...new Set(FICTION.map((c) => c.droite))];

/* =============================================================================
   4. INFORMER, S'INFORMER, DÉFORMER ?
   ---------------------------------------------------------------------------
   Le programme nomme précisément ce qui s'y apprend : « le recoupement des
   sources, la différence entre fait brut et information, les effets de la
   rédaction, de la citation réduite et du montage ».
   ⭐ Ce sont ces cinq-là qu'on interroge, plus l'opinion — parce que la
   confondre avec l'information est l'erreur la plus fréquente.
   ========================================================================== */

const INFO: readonly Cas[] = [
  { gauche: "« Un train est arrivé à 8 h 12 en gare de Saint-Denis. » Rien de plus.", droite: "un fait brut : ce qui s'est passé, vérifiable, sans aucune mise en forme" },
  { gauche: "« Le vote a recueilli 143 voix pour et 96 contre. »", droite: "un fait brut : ce qui s'est passé, vérifiable, sans aucune mise en forme" },
  { gauche: "« La température relevée hier à midi était de 31 degrés. »", droite: "un fait brut : ce qui s'est passé, vérifiable, sans aucune mise en forme" },

  { gauche: "Le journaliste choisit ce fait parmi cent autres, le situe, l'explique et le destine à ses lecteurs.", droite: "une information : un fait choisi, situé et mis en forme pour un public" },
  { gauche: "L'article rappelle ce qui s'est passé l'an dernier pour que le chiffre du jour ait un sens.", droite: "une information : un fait choisi, situé et mis en forme pour un public" },
  { gauche: "Le reportage explique pourquoi cet évènement concerne ceux qui l'écoutent.", droite: "une information : un fait choisi, situé et mis en forme pour un public" },

  { gauche: "« À mon avis, cette décision est une erreur. »", droite: "une opinion : ce que quelqu'un pense du fait, et qui ne se vérifie pas" },
  { gauche: "L'éditorial explique pourquoi le journal désapprouve la mesure.", droite: "une opinion : ce que quelqu'un pense du fait, et qui ne se vérifie pas" },
  { gauche: "Le chroniqueur trouve le film médiocre et le dit.", droite: "une opinion : ce que quelqu'un pense du fait, et qui ne se vérifie pas" },

  { gauche: "Avant de publier, le journaliste vérifie l'information auprès de trois personnes qui ne se connaissent pas.", droite: "le recoupement des sources : on ne publie pas ce qu'un seul témoin soutient" },
  { gauche: "La rédaction refuse une révélation tant qu'un second document ne la confirme pas.", droite: "le recoupement des sources : on ne publie pas ce qu'un seul témoin soutient" },
  { gauche: "L'article précise que deux services distincts ont confirmé le chiffre.", droite: "le recoupement des sources : on ne publie pas ce qu'un seul témoin soutient" },

  { gauche: "La personne avait dit : « ce projet est utile, mais mal financé » ; le titre retient « ce projet est utile ».", droite: "la citation réduite : on coupe une phrase, et ce qui reste dit autre chose" },
  { gauche: "Trois mots sont mis entre guillemets, et la condition qui les suivait a disparu.", droite: "la citation réduite : on coupe une phrase, et ce qui reste dit autre chose" },
  { gauche: "L'extrait s'arrête juste avant le « cependant » qui changeait tout.", droite: "la citation réduite : on coupe une phrase, et ce qui reste dit autre chose" },

  { gauche: "Les images sont vraies, mais leur ordre laisse croire que la seconde est la conséquence de la première.", droite: "le montage : chaque élément est exact, et leur assemblage suggère le faux" },
  { gauche: "Le reportage place la réponse avant la question, et le ton du témoin en paraît changé.", droite: "le montage : chaque élément est exact, et leur assemblage suggère le faux" },
  { gauche: "Deux séquences filmées à des mois d'intervalle se suivent sans que rien ne le signale.", droite: "le montage : chaque élément est exact, et leur assemblage suggère le faux" },
];

const TOUS_TRAITEMENTS: readonly string[] = [...new Set(INFO.map((c) => c.droite))];

/* =============================================================================
   5. LA VILLE, LIEU DE TOUS LES POSSIBLES ? (questionnement complémentaire)
   ---------------------------------------------------------------------------
   Le programme demande de « montrer comment la ville inspire les écrivains et
   les artistes qui la représentent dans sa diversité, sa complexité et ses
   contradictions », et il nomme les deux versants : « lieu de découvertes, mais
   aussi lieu de perdition, de solitude, de désillusion, de peurs ».
   Le point d'interrogation du titre est tout le sujet : la ville promet, et ne
   tient pas toujours.
   ========================================================================== */

const VILLE: readonly Cas[] = [
  { gauche: "Le jeune homme arrive de sa province et regarde les vitrines comme on regarde un avenir.", droite: "la ville comme promesse : tout semble possible à celui qui vient d'arriver" },
  { gauche: "Le texte énumère les métiers, les théâtres, les journaux : tout ce qu'on ne trouvait pas au village.", droite: "la ville comme promesse : tout semble possible à celui qui vient d'arriver" },
  { gauche: "Le personnage se dit qu'ici, personne ne sait d'où il vient, et que tout peut recommencer.", droite: "la ville comme promesse : tout semble possible à celui qui vient d'arriver" },

  { gauche: "Les rues se ressemblent, le personnage tourne, revient sur ses pas et ne reconnait plus rien.", droite: "la ville comme labyrinthe : on s'y perd, et le texte fait sentir cette perte" },
  { gauche: "Le narrateur décrit un dédale de ruelles où l'on entre plus facilement qu'on n'en sort.", droite: "la ville comme labyrinthe : on s'y perd, et le texte fait sentir cette perte" },
  { gauche: "Le plan que tient le personnage ne correspond plus à ce qu'il a sous les yeux.", droite: "la ville comme labyrinthe : on s'y perd, et le texte fait sentir cette perte" },

  { gauche: "Le personnage croise mille visages en une heure et n'échange pas un mot.", droite: "la solitude dans la foule : jamais autant de monde autour, jamais si seul" },
  { gauche: "Le texte insiste sur les fenêtres allumées, et sur celui qui les regarde d'en bas.", droite: "la solitude dans la foule : jamais autant de monde autour, jamais si seul" },
  { gauche: "Personne ne s'arrête quand l'homme tombe sur le trottoir.", droite: "la solitude dans la foule : jamais autant de monde autour, jamais si seul" },

  { gauche: "Les ouvriers entrent à l'aube et ressortent à la nuit, usés, et cela recommence.", droite: "la ville qui broie : le travail et la misère y consument ceux qui y vivent" },
  { gauche: "Le quartier décrit est celui des logements humides et des enfants malades.", droite: "la ville qui broie : le travail et la misère y consument ceux qui y vivent" },
  { gauche: "Le personnage arrivé plein d'espoir finit par accepter n'importe quel travail.", droite: "la ville qui broie : le travail et la misère y consument ceux qui y vivent" },

  { gauche: "La ville respire, avale les passants, et le texte lui prête un corps.", droite: "la ville comme être vivant : elle devient un personnage, parfois un monstre" },
  { gauche: "Les cheminées sont des gueules et les rues des artères.", droite: "la ville comme être vivant : elle devient un personnage, parfois un monstre" },
  { gauche: "Le narrateur écrit que la ville « attend » et qu'elle « choisit » ceux qu'elle garde.", droite: "la ville comme être vivant : elle devient un personnage, parfois un monstre" },

  { gauche: "Les travaux ont fait disparaitre la rue où le narrateur avait grandi.", droite: "la ville qui change : elle efface un monde en même temps qu'elle en bâtit" },
  { gauche: "Le texte compare ce qu'on voyait il y a vingt ans et ce qu'on voit aujourd'hui.", droite: "la ville qui change : elle efface un monde en même temps qu'elle en bâtit" },
  { gauche: "Une avenue neuve traverse le quartier ancien, et le narrateur ne sait pas s'il faut s'en réjouir.", droite: "la ville qui change : elle efface un monde en même temps qu'elle en bâtit" },
];

const TOUTES_VILLES: readonly string[] = [...new Set(VILLE.map((c) => c.droite))];

function gabarit(
  id: string,
  microId: string,
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
    notionId: "culture_litteraire",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: [...tags],
    generate: () => {
      const c = randomChoice(table);
      return {
        text: `« ${c.gauche} »\n\n${question}`,
        format: "qcm" as const,
        choices: makeChoices(c.droite, pool),
        expected: [c.droite],
        comparator: "mcq_exact" as const,
        explanation: exp(
          definition,
          methode,
          `« ${c.gauche} » → ${c.droite}.`,
          `${c.droite.charAt(0).toUpperCase()}${c.droite.slice(1)}.`,
        ),
      };
    },
  };
}

export const cultureLitteraire4eBank: TutorBankItemV4[] = [
  gabarit(
    "4e_cult_dire_amour_tpl_1",
    "4e_cult_dire_amour",
    AMOUR,
    TOUTES_FACONS,
    "De quelle façon de dire l'amour s'agit-il ?",
    2,
    "Trois questions : à qui parle-t-on ? l'aimé est-il là ? et le poème célèbre-t-il, ou souffre-t-il ?",
    "Le sentiment amoureux se dit de plusieurs façons, et elles traversent les siècles. La déclaration s'adresse à l'être aimé. L'éloge le célèbre, détail par détail, sans rien raconter. La plainte dit une perte. Le dépit retourne l'amour en reproche. L'attente met le manque au centre plutôt que l'autre. Et l'ironie se moque des mots convenus de l'amour.",
    "Regarde d'abord à qui le texte s'adresse : à l'aimé, ou à personne. Puis demande-toi si l'aimé est présent, absent ou perdu. Enfin, écoute le ton : célébrer, se plaindre, reprocher ou se moquer ne se ressemblent pas.",
    ["4e", "culture", "dire-amour", "poesie", "template"],
  ),
  gabarit(
    "4e_cult_individu_societe_tpl_1",
    "4e_cult_individu_societe",
    VALEURS,
    TOUS_CONFLITS,
    "Quelles valeurs s'affrontent ici ?",
    3,
    "Un conflit de valeurs, ce n'est pas un méchant contre un gentil : ce sont deux choses justes qui ne peuvent pas tenir ensemble.",
    "Dans un roman comme au théâtre, l'action avance parce que deux exigences s'opposent. Le devoir contre la passion oppose ce qu'on doit à ce qu'on désire. L'individu contre le groupe oppose une décision personnelle à un milieu. L'honneur contre la vie sauve fait préférer sa réputation à sa sécurité. L'obéissance contre la conscience oppose un ordre au sens du juste. L'ambition contre la fidélité fait monter au prix d'une trahison. La justice contre la loi rappelle que le légal et le juste ne coïncident pas toujours.",
    "Nomme d'abord ce que le personnage veut, puis ce qui l'en empêche. Si les deux sont défendables, tu tiens le conflit de valeurs. S'il n'y en a qu'un de défendable, ce n'est pas un conflit de valeurs : c'est un obstacle.",
    ["4e", "culture", "individu-societe", "conflit", "template"],
  ),
  gabarit(
    "4e_cult_fiction_reel_tpl_1",
    "4e_cult_fiction_reel",
    FICTION,
    TOUTES_FICTIONS,
    "Comment cette fiction interroge-t-elle le réel ?",
    3,
    "La question qui tranche : reste-t-il un doute à la fin, et le monde du récit est-il le nôtre ?",
    "La fiction ne s'oppose pas au réel : elle s'en sert. Le réalisme montre la société telle qu'elle est. Le naturalisme va plus loin et explique l'homme par son milieu, comme on mène une expérience. Le fantastique introduit UNE chose inexplicable dans un monde ordinaire, et laisse le doute. Le merveilleux, lui, n'a jamais de doute : le surnaturel y est admis dès la première ligne. L'anticipation tire un monde possible d'une science poussée plus loin. Et la société imaginée en invente une de toutes pièces pour faire voir la nôtre.",
    "Demande-toi d'abord si les personnages s'étonnent. S'ils s'étonnent et qu'on ne tranche pas, c'est fantastique ; s'ils ne s'étonnent pas, c'est merveilleux. S'il ne se passe rien d'impossible, cherche ce que le texte veut montrer de la société.",
    ["4e", "culture", "fiction-reel", "fantastique", "realisme", "template"],
  ),
  gabarit(
    "4e_cult_informer_deformer_tpl_1",
    "4e_cult_informer_deformer",
    INFO,
    TOUS_TRAITEMENTS,
    "De quoi s'agit-il exactement ?",
    3,
    "Déformer ne veut pas dire mentir : on peut tromper avec des éléments tous exacts.",
    "Un fait brut est ce qui s'est passé, vérifiable et sans mise en forme. Une information est un fait choisi, situé et destiné à quelqu'un — ce n'est déjà plus la même chose. Une opinion ne se vérifie pas. Le recoupement des sources est ce qui autorise à publier. La citation réduite coupe une phrase et lui fait dire autre chose. Le montage assemble des éléments tous exacts pour suggérer ce qui est faux.",
    "Demande-toi si l'énoncé peut être vérifié. Si oui, c'est un fait ou une information — cherche alors s'il a été choisi et mis en forme. Si non, c'est une opinion. Et si tout est exact mais que le sens dérape, regarde ce qu'on a coupé ou dans quel ordre on a placé les choses.",
    ["4e", "culture", "informer", "emi", "sources", "template"],
  ),
  gabarit(
    "4e_cult_ville_tpl_1",
    "4e_cult_ville",
    VILLE,
    TOUTES_VILLES,
    "Quel visage de la ville ce passage donne-t-il ?",
    2,
    "Le titre du questionnement porte un point d'interrogation : la ville promet, et ne tient pas toujours.",
    "La ville n'a pas un seul visage en littérature, elle en a plusieurs et souvent contradictoires. Elle est une promesse pour qui arrive. Elle est un labyrinthe où l'on se perd. Elle laisse seul au milieu de la foule. Elle broie ceux qui y travaillent. Elle devient parfois un être vivant, voire un monstre. Et elle change, effaçant un monde pendant qu'elle en bâtit un autre.",
    "Cherche ce que la ville FAIT au personnage : elle l'attire, elle l'égare, elle l'isole, elle l'use, elle l'inquiète, ou elle lui retire ce qu'il connaissait. C'est cet effet, et non le décor, qui donne le visage.",
    ["4e", "culture", "ville", "questionnement-complementaire", "template"],
  ),
];
