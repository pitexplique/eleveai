// lib/tutor-v4/questionBank/3e/francais/culture-litteraire.bank.ts
//
// LES QUATRE QUESTIONNEMENTS DE 3e, PLUS LE COMPLÉMENTAIRE — écrit le
// 13/08/2026.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020, qui les nomme un par un :
//   1. Se raconter, se représenter
//   2. Dénoncer les travers de la société
//   3. Visions poétiques du monde
//   4. Agir dans la cité : individu et pouvoir
//   + Questionnement complémentaire : Progrès et rêves scientifiques
//
// ⚠️ Ils seront remplacés à la bascule de septembre 2028. Ils ont donc TROIS
// ANS de vie, pas un — contrairement à ceux de la 4e, que le nouveau texte
// atteint dès 2027 et qu'on a laissés de côté pour cette raison. Ici, ça valait
// le coup de les écrire.
//
// Le coach n'en nommait aucun : `culture_litteraire` ne portait que quatre
// gestes génériques — reconnaitre un genre, situer, mettre en réseau, garder
// une trace —, identiques de la 5e à la 3e.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE PRÉCISE. Les œuvres intégrales sont
// choisies par le professeur ; le coach n'a rien fait lire et ne peut pas
// demander ce qu'il y avait au chapitre 4. Ce qui s'interroge, c'est ce qui se
// transporte d'une œuvre à l'autre : le pacte que passe celui qui se raconte,
// les détours de la satire, ce qu'une image fait à un objet ordinaire, la
// différence entre un témoignage et une fiction appuyée sur l'histoire, les
// figures que la science-fiction reprend d'un livre à l'autre.
//
// ⚠️ Les vers de la table POESIE sont écrits ici, pour ce fichier. Aucun texte
// d'auteur n'est reproduit, et aucun titre n'est demandé.
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
   1. SE RACONTER, SE REPRÉSENTER
   ---------------------------------------------------------------------------
   Le programme demande de « percevoir l'écart entre réalité et écriture de
   soi ». Cet écart se lit d'abord dans le PACTE : ce que l'auteur annonce au
   lecteur, et ce qu'il ne lui annonce pas. Six façons d'écrire sur soi ou sur
   un autre, et rien de commun entre un journal et des mémoires.
   ========================================================================== */

const SE_RACONTER: readonly Cas[] = [
  { gauche: "L'auteur signe de son nom, dit « je », et annonce en tête qu'il va raconter sa vie telle qu'il s'en souvient.", droite: "une autobiographie : auteur, narrateur et personnage sont la même personne, et le pacte est annoncé" },
  { gauche: "Le narrateur porte le nom de l'auteur, et l'on suit son enfance depuis sa naissance.", droite: "une autobiographie : auteur, narrateur et personnage sont la même personne, et le pacte est annoncé" },
  { gauche: "L'auteur prévient qu'il dira tout, y compris ce qui le dessert, et il signe.", droite: "une autobiographie : auteur, narrateur et personnage sont la même personne, et le pacte est annoncé" },

  { gauche: "Le héros s'appelle autrement que l'auteur, mais il a le même métier, la même ville et la même blessure.", droite: "un roman autobiographique : l'auteur prête sa vie à un personnage qui porte un autre nom" },
  { gauche: "L'auteur reconnait en entretien qu'il a mis sa propre enfance dans ce personnage, sans l'avoir dit dans le livre.", droite: "un roman autobiographique : l'auteur prête sa vie à un personnage qui porte un autre nom" },
  { gauche: "Le livre est présenté comme un roman ; le lecteur y reconnait pourtant l'auteur ligne après ligne.", droite: "un roman autobiographique : l'auteur prête sa vie à un personnage qui porte un autre nom" },

  { gauche: "Un historien raconte la vie d'une résistante, d'après ses lettres et les témoignages de ses proches.", droite: "une biographie : quelqu'un raconte la vie d'un autre" },
  { gauche: "L'auteur écrit « il » et « elle » du début à la fin, et parle de quelqu'un qu'il n'a pas connu.", droite: "une biographie : quelqu'un raconte la vie d'un autre" },
  { gauche: "Le livre retrace la vie d'un peintre mort il y a un siècle.", droite: "une biographie : quelqu'un raconte la vie d'un autre" },

  { gauche: "Chaque page porte une date, et l'auteur ignore encore ce qui arrivera le lendemain.", droite: "un journal : on écrit au jour le jour, sans connaitre la suite" },
  { gauche: "On lit, jour après jour, ce qu'une adolescente pense de sa journée.", droite: "un journal : on écrit au jour le jour, sans connaitre la suite" },
  { gauche: "Le texte s'arrête au milieu d'une phrase, sans conclusion ni bilan.", droite: "un journal : on écrit au jour le jour, sans connaitre la suite" },

  { gauche: "Un ancien ministre raconte les négociations auxquelles il a participé, et parle très peu de lui.", droite: "des mémoires : on y raconte moins sa vie intérieure que les évènements auxquels on a pris part" },
  { gauche: "L'auteur raconte la guerre qu'il a faite, en donnant plus de place aux évènements qu'à ses sentiments.", droite: "des mémoires : on y raconte moins sa vie intérieure que les évènements auxquels on a pris part" },
  { gauche: "Un général écrit ce qu'il a vu de l'intérieur du pouvoir.", droite: "des mémoires : on y raconte moins sa vie intérieure que les évènements auxquels on a pris part" },

  { gauche: "L'auteur décrit son caractère, ses gouts et ses défauts, sans raconter le moindre épisode.", droite: "un autoportrait : on se peint tel qu'on est, sans raconter d'histoire" },
  { gauche: "Le texte dresse la liste de ce que l'auteur aime et de ce qu'il déteste, et rien d'autre.", droite: "un autoportrait : on se peint tel qu'on est, sans raconter d'histoire" },
  { gauche: "L'auteur se peint tel qu'il est aujourd'hui, sans dire comment il l'est devenu.", droite: "un autoportrait : on se peint tel qu'on est, sans raconter d'histoire" },
];

const TOUS_RECITS: readonly string[] = [...new Set(SE_RACONTER.map((s) => s.droite))];

/* =============================================================================
   2. DÉNONCER LES TRAVERS DE LA SOCIÉTÉ
   ---------------------------------------------------------------------------
   Le programme oppose l'argumentation DIRECTE et INDIRECTE. L'indirecte prend
   des chemins qui reviennent d'un siècle à l'autre : le regard d'un étranger
   qui ne comprend pas nos usages, le monde renversé, l'animal qui tient le rôle
   de l'homme. Ce sont ces chemins qu'on interroge, jamais un texte précis.
   ========================================================================== */

const DENONCER: readonly Cas[] = [
  { gauche: "L'auteur écrit « je » et affirme que cette loi est injuste, dans un article qu'il signe.", droite: "l'argumentation directe : l'auteur dit lui-même ce qu'il pense, et l'assume" },
  { gauche: "Un discours prononcé devant l'assemblée demande l'abolition d'une pratique, sans détour.", droite: "l'argumentation directe : l'auteur dit lui-même ce qu'il pense, et l'assume" },
  { gauche: "Une lettre ouverte accuse nommément et argumente point par point.", droite: "l'argumentation directe : l'auteur dit lui-même ce qu'il pense, et l'assume" },

  { gauche: "Le lecteur suit un personnage qui subit l'injustice, et referme le livre révolté sans qu'on lui ait rien demandé.", droite: "l'argumentation indirecte par une histoire réaliste : rien ne signale la critique, le lecteur conclut seul" },
  { gauche: "Une pièce montre un maitre et son valet ; personne n'y explique la morale, chacun la tire.", droite: "l'argumentation indirecte par une histoire réaliste : rien ne signale la critique, le lecteur conclut seul" },
  { gauche: "Un roman suit la vie d'une ouvrière jour après jour, et ne conclut jamais à la place du lecteur.", droite: "l'argumentation indirecte par une histoire réaliste : rien ne signale la critique, le lecteur conclut seul" },

  { gauche: "Un visiteur venu de très loin s'étonne qu'on porte une perruque, et la perruque devient ridicule.", droite: "le détour par un regard étranger : un nouveau venu découvre nos usages et les rend absurdes" },
  { gauche: "Un personnage naïf demande pourquoi l'on juge un homme sur ses habits, et personne ne sait répondre.", droite: "le détour par un regard étranger : un nouveau venu découvre nos usages et les rend absurdes" },
  { gauche: "Le narrateur découvre nos usages sans les connaitre, et les décrit comme des rites incompréhensibles.", droite: "le détour par un regard étranger : un nouveau venu découvre nos usages et les rend absurdes" },

  { gauche: "Dans le pays décrit, on soigne d'abord les plus pauvres, et l'or ne sert qu'aux chaines des prisonniers.", droite: "le monde renversé : on montre l'inverse de ce qui est, pour faire voir ce qui est" },
  { gauche: "Sur cette île, les enfants gouvernent et les adultes obéissent ; on rit, puis on réfléchit.", droite: "le monde renversé : on montre l'inverse de ce qui est, pour faire voir ce qui est" },
  { gauche: "Le texte décrit une société parfaite, et l'on mesure au passage tout ce qui manque à la nôtre.", droite: "le monde renversé : on montre l'inverse de ce qui est, pour faire voir ce qui est" },

  { gauche: "Un loup et un agneau se rencontrent au bord d'une rivière ; personne n'ignore de qui l'on parle.", droite: "l'animal comme masque : des bêtes tiennent les rôles des hommes, et l'on reconnait qui est qui" },
  { gauche: "Le renard flatte, le corbeau tombe, et le lecteur reconnait aussitôt une scène qu'il a vécue.", droite: "l'animal comme masque : des bêtes tiennent les rôles des hommes, et l'on reconnait qui est qui" },
  { gauche: "Les bêtes d'une ferme tiennent conseil, et la fable dit ce qu'un article n'aurait pas pu dire.", droite: "l'animal comme masque : des bêtes tiennent les rôles des hommes, et l'on reconnait qui est qui" },
];

const TOUS_DETOURS: readonly string[] = [...new Set(DENONCER.map((d) => d.droite))];

/* =============================================================================
   3. VISIONS POÉTIQUES DU MONDE
   ---------------------------------------------------------------------------
   « Comprendre les liens entre les images et les mots » : ce n'est pas le sujet
   du poème qui fait la vision, c'est ce que la langue fait au monde ordinaire.
   ⚠️ Vers écrits pour ce fichier. Aucun texte d'auteur.
   ========================================================================== */

const POESIE: readonly Cas[] = [
  { gauche: "Le vieux mur porte une écharpe de lichen", droite: "l'image transforme : un objet ordinaire devient autre chose que lui-même" },
  { gauche: "La rue, ce matin, est un couloir d'aquarium", droite: "l'image transforme : un objet ordinaire devient autre chose que lui-même" },
  { gauche: "Les grues du port sont des hérons de fer", droite: "l'image transforme : un objet ordinaire devient autre chose que lui-même" },

  { gauche: "Un bleu qui sonne comme une cloche lointaine", droite: "les correspondances : une sensation en appelle une autre, la couleur devient son, l'odeur devient souvenir" },
  { gauche: "L'odeur du vétiver a le gout de mes huit ans", droite: "les correspondances : une sensation en appelle une autre, la couleur devient son, l'odeur devient souvenir" },
  { gauche: "Le silence, ici, a la couleur du sable mouillé", droite: "les correspondances : une sensation en appelle une autre, la couleur devient son, l'odeur devient souvenir" },

  { gauche: "Il marche. Il marche. Il marche encore. Et la crête ne vient pas.", droite: "le rythme fait le sens : la coupe et la répétition disent ce que les mots ne disent pas" },
  { gauche: "La mer — puis rien — puis la mer — puis rien encore", droite: "le rythme fait le sens : la coupe et la répétition disent ce que les mots ne disent pas" },
  { gauche: "Un vers qui s'étire et n'en finit pas de s'étirer, puis trois mots.", droite: "le rythme fait le sens : la coupe et la répétition disent ce que les mots ne disent pas" },

  { gauche: "Bleue est l'heure où la ville se tait", droite: "l'ordre des mots est bousculé : l'inversion met en avant ce qui compte" },
  { gauche: "Sur la crête, longtemps, seul, il attendit", droite: "l'ordre des mots est bousculé : l'inversion met en avant ce qui compte" },
  { gauche: "De ce voyage, rien ne me reste que le vent", droite: "l'ordre des mots est bousculé : l'inversion met en avant ce qui compte" },

  { gauche: "Le poème n'a ni rime ni mètre régulier, et les lignes s'arrêtent où le souffle s'arrête.", droite: "la forme libérée : ni rime ni mètre, et la poésie tient quand même" },
  { gauche: "Le texte est écrit d'un seul bloc, comme un paragraphe, et pourtant chaque mot y pèse.", droite: "la forme libérée : ni rime ni mètre, et la poésie tient quand même" },
  { gauche: "Les vers n'ont pas la même longueur, aucun ne rime, et rien ne manque.", droite: "la forme libérée : ni rime ni mètre, et la poésie tient quand même" },
];

const TOUTES_VISIONS: readonly string[] = [...new Set(POESIE.map((p) => p.droite))];

/* =============================================================================
   4. AGIR DANS LA CITÉ : INDIVIDU ET POUVOIR
   ---------------------------------------------------------------------------
   Le programme demande de « comprendre les moyens d'un engagement ». Le premier
   de ces moyens est le statut de ce qu'on lit : un témoignage n'engage pas la
   même chose qu'un roman, et une archive n'a pas été écrite pour nous.
   ========================================================================== */

const AGIR: readonly Cas[] = [
  { gauche: "Un survivant raconte, cinquante ans après, ce qu'il a vu de ses yeux et rien d'autre.", droite: "un témoignage : quelqu'un qui y était rapporte ce qu'il a vu, et engage sa parole" },
  { gauche: "Une infirmière décrit les journées qu'elle a passées dans cet hôpital, en disant « je ».", droite: "un témoignage : quelqu'un qui y était rapporte ce qu'il a vu, et engage sa parole" },
  { gauche: "Un ancien déporté accepte enfin de parler devant une classe.", droite: "un témoignage : quelqu'un qui y était rapporte ce qu'il a vu, et engage sa parole" },

  { gauche: "Les personnages sont inventés, mais la ville, la date et le siège ne le sont pas.", droite: "une fiction appuyée sur l'histoire : les personnages sont inventés, les évènements ne le sont pas" },
  { gauche: "Le roman suit une famille imaginaire à travers des évènements que les manuels racontent.", droite: "une fiction appuyée sur l'histoire : les personnages sont inventés, les évènements ne le sont pas" },
  { gauche: "L'auteur invente un enfant, et lui fait traverser une guerre qui a eu lieu.", droite: "une fiction appuyée sur l'histoire : les personnages sont inventés, les évènements ne le sont pas" },

  { gauche: "Une lettre écrite depuis le front, retrouvée dans un grenier, jamais destinée à être publiée.", droite: "un document d'archive : une trace produite à l'époque, qui n'a pas été écrite pour être lue plus tard" },
  { gauche: "Un registre d'entrée, tenu à la main, où figurent des noms et des dates.", droite: "un document d'archive : une trace produite à l'époque, qui n'a pas été écrite pour être lue plus tard" },
  { gauche: "Une affiche placardée à l'époque sur les murs de la ville.", droite: "un document d'archive : une trace produite à l'époque, qui n'a pas été écrite pour être lue plus tard" },

  { gauche: "L'auteur prend parti, signe, et sait ce que sa signature lui coutera.", droite: "l'écriture de l'engagement : l'auteur prend parti et met son écriture au service d'une cause" },
  { gauche: "Un poème est écrit pour être appris par cœur et récité clandestinement.", droite: "l'écriture de l'engagement : l'auteur prend parti et met son écriture au service d'une cause" },
  { gauche: "Un écrivain met sa notoriété dans la balance pour défendre un homme qu'il ne connait pas.", droite: "l'écriture de l'engagement : l'auteur prend parti et met son écriture au service d'une cause" },

  { gauche: "La petite-fille reprend l'histoire de sa grand-mère, qu'elle n'a pas vécue, pour qu'elle ne disparaisse pas.", droite: "la transmission : quelqu'un reprend une histoire qu'il n'a pas vécue, pour qu'elle ne se perde pas" },
  { gauche: "Un fils écrit ce que son père n'a jamais pu raconter.", droite: "la transmission : quelqu'un reprend une histoire qu'il n'a pas vécue, pour qu'elle ne se perde pas" },
  { gauche: "Une classe recueille les récits des anciens du quartier avant qu'il ne reste plus personne.", droite: "la transmission : quelqu'un reprend une histoire qu'il n'a pas vécue, pour qu'elle ne se perde pas" },
];

const TOUS_ENGAGEMENTS: readonly string[] = [...new Set(AGIR.map((a) => a.droite))];

/* =============================================================================
   5. PROGRÈS ET RÊVES SCIENTIFIQUES — le questionnement complémentaire
   ---------------------------------------------------------------------------
   « Interroger le rapport de l'être humain à la science » : les récits qui le
   font reprennent, d'un siècle à l'autre, les mêmes figures. Le savant qui ne
   sait plus arrêter ce qu'il a lancé, la créature qui revient demander des
   comptes, le monde parfait où l'on étouffe — et, plus rare, l'émerveillement
   pur devant ce qui vient d'être découvert.
   ========================================================================== */

const PROGRES: readonly Cas[] = [
  { gauche: "Le récit se passe en 2090 ; tout ce qu'on y voit existe déjà, en plus poussé.", droite: "l'anticipation : le récit se passe demain, et prolonge une tendance d'aujourd'hui" },
  { gauche: "L'auteur prend une habitude d'aujourd'hui et la pousse à son terme, trente ans plus tard.", droite: "l'anticipation : le récit se passe demain, et prolonge une tendance d'aujourd'hui" },
  { gauche: "L'histoire décrit une ville où tout ce qui se prépare aujourd'hui a été mené jusqu'au bout.", droite: "l'anticipation : le récit se passe demain, et prolonge une tendance d'aujourd'hui" },

  { gauche: "Tout le monde est nourri, soigné, distrait — et personne n'a le droit de se taire.", droite: "la dystopie : le progrès a tout amélioré, et l'on y étouffe" },
  { gauche: "La société décrite n'a plus ni maladie ni pauvreté, et plus personne n'y choisit rien.", droite: "la dystopie : le progrès a tout amélioré, et l'on y étouffe" },
  { gauche: "Le confort y est parfait, et c'est exactement cela qui fait peur.", droite: "la dystopie : le progrès a tout amélioré, et l'on y étouffe" },

  { gauche: "Le savant réussit son expérience, et comprend trop tard qu'il ne peut plus l'arrêter.", droite: "l'apprenti sorcier : c'est le PROCESSUS qui échappe, et le savant ne sait plus l'arrêter" },
  { gauche: "La découverte est un succès complet ; ce sont ses conséquences qui échappent à tous.", droite: "l'apprenti sorcier : c'est le PROCESSUS qui échappe, et le savant ne sait plus l'arrêter" },
  { gauche: "Il a passé dix ans à obtenir ce résultat, et il passera le reste à tenter de le défaire.", droite: "l'apprenti sorcier : c'est le PROCESSUS qui échappe, et le savant ne sait plus l'arrêter" },

  { gauche: "L'être fabriqué revient trouver celui qui l'a fait, et lui demande pourquoi.", droite: "la créature qui échappe : l'être fabriqué se retourne vers son fabricant, lui désobéit ou lui demande des comptes" },
  { gauche: "La machine qu'on a rendue intelligente refuse la tâche qu'on lui donne.", droite: "la créature qui échappe : l'être fabriqué se retourne vers son fabricant, lui désobéit ou lui demande des comptes" },
  { gauche: "Un homme construit son double, et le double lui reproche son existence.", droite: "la créature qui échappe : l'être fabriqué se retourne vers son fabricant, lui désobéit ou lui demande des comptes" },

  { gauche: "Le récit raconte une première descente en scaphandre, et l'on partage la stupeur du narrateur.", droite: "l'émerveillement : la science ouvre un monde, et le récit s'en réjouit" },
  { gauche: "Le personnage voit pour la première fois ce qu'un microscope révèle, et le texte s'émerveille.", droite: "l'émerveillement : la science ouvre un monde, et le récit s'en réjouit" },
  { gauche: "Le voyage vers un monde inconnu est raconté comme une fête de l'intelligence.", droite: "l'émerveillement : la science ouvre un monde, et le récit s'en réjouit" },
];

const TOUS_PROGRES: readonly string[] = [...new Set(PROGRES.map((p) => p.droite))];

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
    niveau: "3e",
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
        explanation: exp(definition, methode, `« ${c.gauche} » → ${c.droite}.`, `${c.droite.charAt(0).toUpperCase()}${c.droite.slice(1)}.`),
      };
    },
  };
}

export const cultureLitteraire3eBank: TutorBankItemV4[] = [
  gabarit(
    "3e_cult_se_raconter_tpl_1",
    "3e_cult_se_raconter",
    SE_RACONTER,
    TOUS_RECITS,
    "De quelle forme d'écriture de soi — ou de l'autre — s'agit-il ?",
    3,
    "Trois questions : qui dit « je » ? l'auteur l'annonce-t-il ? et sait-il déjà la suite ?",
    "Écrire sur soi se fait de plusieurs façons, et le lecteur n'attend pas la même chose de chacune. L'autobiographie annonce son pacte : l'auteur, le narrateur et le personnage sont une seule personne. Le roman autobiographique ne l'annonce pas. Le journal s'écrit sans connaitre la suite. Les mémoires racontent des évènements plus qu'une vie intérieure. L'autoportrait ne raconte rien : il décrit. Et la biographie parle d'un autre.",
    "Cherche d'abord si l'auteur et le personnage portent le même nom, et si le livre le dit. Puis regarde si le texte RACONTE, ou s'il DÉCRIT. Enfin, demande-toi si celui qui écrit connaissait déjà la fin de l'histoire.",
    ["3e", "culture", "se-raconter", "autobiographie", "template"],
  ),
  gabarit(
    "3e_cult_denoncer_tpl_1",
    "3e_cult_denoncer",
    DENONCER,
    TOUS_DETOURS,
    "Par quel moyen la critique passe-t-elle ?",
    3,
    "L'auteur assume-t-il lui-même le propos, ou le fait-il porter par quelqu'un ?",
    "On peut dénoncer directement — en son nom, dans un discours, un article, une lettre ouverte — ou indirectement, en laissant le lecteur conclure. L'argumentation indirecte prend des chemins qui reviennent d'un siècle à l'autre : le regard d'un étranger qui trouve nos usages absurdes, le monde renversé qui montre l'inverse pour faire voir, et l'animal qui tient le rôle de l'homme.",
    "Demande-toi si quelqu'un, dans le texte, dit ce qu'il faut penser. Si oui, l'argumentation est directe. Si personne ne le dit et que le lecteur le pense quand même, cherche le détour employé.",
    ["3e", "culture", "denoncer", "satire", "argumentation", "template"],
  ),
  gabarit(
    "3e_cult_visions_poetiques_tpl_1",
    "3e_cult_visions_poetiques",
    POESIE,
    TOUTES_VISIONS,
    "Qu'est-ce qui, ici, fait la vision poétique ?",
    3,
    "Ce n'est pas le sujet qui fait le poème : c'est ce que la langue fait au sujet.",
    "Un poème ne parle pas d'autre chose que le reste du monde : il en parle autrement. L'image transforme un objet ordinaire en autre chose. Les correspondances font passer d'un sens à l'autre — une couleur qui sonne, une odeur qui a un gout. Le rythme, par ses coupes et ses reprises, dit ce que les mots ne disent pas. L'inversion met en tête ce qui compte. Et la forme libre montre qu'on peut tout retirer — rime, mètre — sans que la poésie s'en aille.",
    "Relis en te demandant ce que tu aurais écrit, toi, pour dire la même chose. L'écart entre ta phrase et la sienne est exactement le procédé qu'il faut nommer.",
    ["3e", "culture", "poesie", "visions", "template"],
  ),
  gabarit(
    "3e_cult_agir_cite_tpl_1",
    "3e_cult_agir_cite",
    AGIR,
    TOUS_ENGAGEMENTS,
    "De quelle sorte de texte s'agit-il ?",
    3,
    "Demande-toi pour qui le texte a été écrit — et si son auteur y était.",
    "Devant l'histoire, tous les textes n'ont pas le même statut, et c'est cela qu'il faut savoir avant de les lire. Le témoignage vient de quelqu'un qui y était et qui engage sa parole. La fiction invente ses personnages sans inventer les évènements. L'archive n'a pas été écrite pour nous : elle a été produite sur le moment, pour autre chose. L'écriture engagée prend parti et le paie parfois. Et la transmission reprend une histoire qu'on n'a pas vécue, pour qu'elle ne disparaisse pas.",
    "Trois questions suffisent : l'auteur y était-il ? le texte a-t-il été écrit pour être lu plus tard ? et les personnes nommées ont-elles existé ?",
    ["3e", "culture", "agir-dans-la-cite", "engagement", "template"],
  ),
  gabarit(
    "3e_cult_progres_reves_tpl_1",
    "3e_cult_progres_reves",
    PROGRES,
    TOUS_PROGRES,
    "Quelle figure du rapport à la science reconnait-on ici ?",
    3,
    "Le progrès y est presque toujours réussi. C'est ce qui vient après qui fait le récit.",
    "Les récits qui interrogent la science reprennent les mêmes figures d'un siècle à l'autre. L'anticipation prolonge une tendance d'aujourd'hui. La dystopie décrit un monde où tout a été amélioré et où l'on étouffe. L'apprenti sorcier réussit son expérience et ne sait plus l'arrêter. La créature fabriquée revient demander des comptes. Et quelques récits, plus rares, s'émerveillent simplement de ce que la science vient d'ouvrir.",
    "Regarde ce qui échappe, et à qui. Si c'est au savant, c'est l'apprenti sorcier. Si c'est la créature elle-même, c'est l'autre figure. Si rien n'échappe et que tout est parfait, méfie-toi : c'est souvent la dystopie.",
    ["3e", "culture", "progres", "science-fiction", "template"],
  ),
];
