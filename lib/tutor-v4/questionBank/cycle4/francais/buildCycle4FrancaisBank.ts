import type {
  ComparatorName,
  QuestionFormat,
  SchoolLevel,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

// ─── Banque du coach · Français cycle 4 (5e · 4e · 3e) ───────────────────────
// Générateur de questions du coach pour le collège cycle 4. Contrairement à
// l'ancienne version (pools minuscules, aveugle au micro et au niveau, formats
// « short » à risque d'accent), ce builder :
//   1. route par MICRO-compétence (pas seulement par notion) ;
//   2. DIFFÉRENCIE le contenu 5e ≠ 4e ≠ 3e (perspectives annuelles + exigence
//      croissante : 5e récit/phrase complexe ; 4e roman du XIXe, registres,
//      paroles rapportées ; 3e subordonnées, voix passive, argumentation) ;
//   3. n'émet QUE des QCM (comparateur mcq_exact) — AUCUN « short »/exact_text,
//      pour supprimer tout piège d'accent (le comparateur ne normalise pas les
//      accents, cf tutor-francais-cycle3-accents) ;
//   4. écrit tout le français avec des ACCENTS impeccables.
// Chaque (micro, niveau) tire un pool DISTINCT = socle commun accentué + items
// propres au niveau, pour une variété élevée (cible ≥ ~12-20 questions/micro).
// ⚠️ Ce builder ne sert QUE 5e/4e/3e (type Cycle4Level) → aucun risque pour
// cm1/cm2/6e (builder cycle 3, distinct).

type Cycle4Level = Extract<SchoolLevel, "5e" | "4e" | "3e">;

type Generated = TutorGeneratedQuestionV4 & {
  format: QuestionFormat;
  comparator: ComparatorName;
};

type QcmItem = {
  text: string;
  correct: string;
  wrongs: string[];
  methode?: string;
};

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes. Dédupliquer AVANT de couper à quatre laisse
  // aussi une chance aux distracteurs surnuméraires de prendre la place.
  // ⚠️ 04/08/2026 — la bonne réponse était jetée dans le même chapeau que les
  // pièges : à cinq pièges écrits, le mélange pouvait la laisser au fond et
  // le découpage à quatre l'emportait. L'élève voyait alors quatre pièges et
  // rien d'autre. On la met de côté, on tire trois distracteurs, on mélange.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(methode: string, exemple: string, conclusion: string) {
  return `Méthode : ${methode}\n\nExemple : ${exemple}\n\nConclusion : ${conclusion}`;
}

function pick<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function asQcm(item: QcmItem): Generated {
  return {
    text: item.text,
    format: "qcm",
    choices: makeChoices(item.correct, item.wrongs),
    expected: [item.correct],
    comparator: "mcq_exact",
    explanation: exp(
      item.methode ?? "On observe le texte et la phrase avec attention.",
      `La bonne réponse est : ${item.correct}.`,
      "On vérifie en relisant l'énoncé en entier."
    ),
  };
}

// Fusionne un socle commun (valable à tous les niveaux) et des items propres au
// niveau → chaque (micro, niveau) tire un pool DISTINCT et suffisamment large.
function byLevel(
  base: QcmItem[],
  perLevel: Partial<Record<Cycle4Level, QcmItem[]>>,
  level: Cycle4Level
): QcmItem[] {
  return [...base, ...(perLevel[level] ?? [])];
}

const perspectives: Record<Cycle4Level, string> = {
  "5e": "Découverte de soi, d'autrui et du monde",
  "4e": "Jugement, valeurs et vérité",
  "3e": "Engagement humaniste et émancipation",
};
void perspectives;

// ─────────────────────────────────────────────────────────────────────────────
// LECTURE — comprendre, interpréter, apprécier
// ─────────────────────────────────────────────────────────────────────────────

function comp_sens_global(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Lis : « Malgré la fatigue et le froid, Yanis termina sa course, porté par les cris de la foule. » De quoi parle surtout ce passage ?",
        correct: "de la persévérance de Yanis",
        wrongs: ["de la météo du jour", "d'un match de tennis", "d'un repas de fête"],
        methode: "Le sens global, c'est l'idée qui traverse tout le passage, pas un détail.",
      },
      {
        text: "Lis : « Le vieux phare, abandonné depuis des années, veillait encore sur la baie déserte. » Quelle impression domine ?",
        correct: "une impression de solitude et de calme",
        wrongs: ["une ambiance de fête", "une scène de bataille", "un moment comique"],
        methode: "On dégage l'atmosphère à partir des mots clés (« abandonné », « déserte »).",
      },
      {
        text: "Résumer un texte en une phrase, c'est en donner...",
        correct: "l'idée principale, sans s'arrêter à un détail",
        wrongs: ["le premier mot", "le nombre de paragraphes", "la couleur de la couverture"],
        methode: "Le résumé garde l'essentiel et laisse de côté les détails secondaires.",
      },
      {
        text: "Lis : « La classe entière retint son souffle : personne n'osait répondre au directeur. » Quelle impression se dégage ?",
        correct: "une impression de tension",
        wrongs: ["une impression de joie", "une scène de repas", "une leçon de calcul"],
        methode: "« retint son souffle » et « n'osait » traduisent la tension.",
      },
      {
        text: "Lis : « Chaque matin, elle repeignait le même mur, sans jamais se lasser. » Ce passage met surtout en avant...",
        correct: "la patience et la constance du personnage",
        wrongs: ["le prix de la peinture", "la couleur du mur", "l'heure du réveil"],
        methode: "On relie une action répétée à un trait de caractère.",
      },
      {
        text: "Pour trouver le thème d'un texte, la meilleure question à se poser est...",
        correct: "« de quoi parle surtout ce texte ? »",
        wrongs: ["« combien de lignes a-t-il ? »", "« qui l'a imprimé ? »", "« quelle est sa couleur ? »"],
        methode: "Le thème répond à « de quoi parle-t-on ? ».",
      },
      {
        text: "Lis : « Le marché grouillait de cris, de couleurs et d'odeurs d'épices. » L'auteur cherche surtout à...",
        correct: "faire ressentir l'animation du lieu",
        wrongs: ["donner une liste de courses", "expliquer une règle de grammaire", "raconter une dispute"],
        methode: "L'accumulation de sensations rend le lieu vivant.",
      },
    ],
    {
      "5e": [
        {
          text: "Lis : « Sindbad quitta son île natale pour explorer des terres inconnues, au-delà des mers. » Que met surtout en avant ce récit ?",
          correct: "le goût du voyage et de la découverte du monde",
          wrongs: ["la peur de sortir de chez soi", "une leçon de grammaire", "une recette de cuisine"],
          methode: "En 5e, on lit des récits de voyage : on repère la découverte de l'ailleurs.",
        },
        {
          text: "Lis : « Le jeune chevalier baissa les yeux : il avait promis, il ne pouvait plus reculer. » Quel thème apparaît ?",
          correct: "l'honneur et la parole donnée",
          wrongs: ["la gourmandise", "l'ennui à l'école", "la peur de l'eau"],
          methode: "On relie l'attitude du personnage à une valeur (tenir sa promesse).",
        },
        {
          text: "Lis : « Après trois jours de tempête, l'équipage aperçut enfin une côte verdoyante. » Ce passage exprime surtout...",
          correct: "le soulagement après l'épreuve",
          wrongs: ["la colère des marins", "une scène comique", "une dispute au port"],
          methode: "L'opposition tempête / côte verdoyante crée le soulagement.",
        },
        {
          text: "Lis : « Le héros partagea son pain avec l'inconnu affamé. » Ce geste illustre...",
          correct: "la générosité",
          wrongs: ["l'avarice", "la peur", "la paresse"],
          methode: "On associe l'action à une qualité morale (la générosité).",
        },
      ],
      "4e": [
        {
          text: "Lis : « Derrière ses habits élégants, l'homme cachait un cœur dur et calculateur. » Que cherche à montrer l'auteur ?",
          correct: "le contraste entre l'apparence et la vraie nature",
          wrongs: ["la mode du XIXe siècle", "une simple description de costume", "un problème d'argent réglé"],
          methode: "En 4e, on interroge le jugement : apparence trompeuse contre réalité.",
        },
        {
          text: "Lis : « La ville grondait de fumée et de bruit ; les ouvriers y entraient avant l'aube. » Ce passage d'un roman du XIXe siècle évoque surtout...",
          correct: "la dureté du monde du travail à l'époque industrielle",
          wrongs: ["une fête foraine", "un paysage de vacances", "un jour de neige tranquille"],
          methode: "On situe la scène dans son contexte (le roman réaliste peint la société).",
        },
        {
          text: "Lis : « On l'admirait pour sa fortune ; nul ne savait comment il l'avait gagnée. » L'auteur suggère...",
          correct: "un doute sur l'honnêteté du personnage",
          wrongs: ["une leçon d'histoire", "une scène de mariage heureux", "un simple inventaire"],
          methode: "En 4e, on lit le jugement porté par l'auteur sur ses personnages.",
        },
        {
          text: "Lis : « Elle rêvait d'une vie brillante, loin de son village gris. » Ce passage exprime surtout...",
          correct: "l'insatisfaction et le désir d'ailleurs",
          wrongs: ["le bonheur d'être chez soi", "une consigne de sécurité", "une recette de cuisine"],
          methode: "Le contraste rêve / village gris dit l'insatisfaction.",
        },
      ],
      "3e": [
        {
          text: "Lis : « Tant qu'un seul enfant sera privé d'école, notre combat ne sera pas terminé. » Quel est le sens profond de cette phrase ?",
          correct: "un appel à défendre le droit à l'éducation",
          wrongs: ["une information sur les horaires de l'école", "une critique des enfants", "une description d'un bâtiment"],
          methode: "En 3e, on lit des textes engagés : on dégage la thèse défendue.",
        },
        {
          text: "Lis : « Je me souviens du silence, ce matin-là, quand nous avons compris que tout allait changer. » Dans un récit de témoignage, cette phrase...",
          correct: "annonce un événement grave vécu par le narrateur",
          wrongs: ["décrit une journée ordinaire", "donne une consigne de sécurité", "explique une règle de jeu"],
          methode: "On perçoit l'implicite : le « silence » et « tout allait changer » pèsent lourd.",
        },
        {
          text: "Lis : « Nul homme n'est une île ; chacun est lié au sort des autres. » Ce texte défend surtout...",
          correct: "l'idée de solidarité entre les êtres humains",
          wrongs: ["une leçon de géographie", "une consigne de randonnée", "une règle de politesse à table"],
          methode: "On dégage la valeur humaniste défendue (la solidarité).",
        },
        {
          text: "Lis : « Ils avaient tout perdu, sauf le courage de recommencer. » Ce passage met en avant...",
          correct: "la force de l'espoir malgré l'épreuve",
          wrongs: ["une simple liste de pertes", "un bulletin météo", "une recette"],
          methode: "L'opposition « tout perdu / sauf le courage » porte l'espoir.",
        },
      ],
    },
    level
  );
}

function comp_indices(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Lis : « Elle répondit calmement, mais ses mains tremblaient sous la table. » Quel indice révèle son émotion ?",
        correct: "ses mains qui tremblent",
        wrongs: ["sa voix calme", "la table", "sa réponse polie"],
        methode: "L'indice, c'est le détail précis qui trahit ce qui n'est pas dit.",
      },
      {
        text: "Lis : « Les valises étaient prêtes près de la porte et les billets posés sur la table. » Quel indice montre qu'un départ se prépare ?",
        correct: "les valises et les billets",
        wrongs: ["la porte fermée", "la table en bois", "l'heure du dîner"],
        methode: "On relève les éléments concrets qui prouvent l'interprétation.",
      },
      {
        text: "Pour justifier une réponse de lecture, il faut...",
        correct: "citer le mot ou le passage exact du texte",
        wrongs: ["deviner au hasard", "donner son âge", "compter les lignes"],
        methode: "Justifier = s'appuyer sur une preuve prise dans le texte.",
      },
      {
        text: "Lis : « Le sol était jonché de feuilles mortes et l'air sentait la fumée. » Quels indices situent la saison ?",
        correct: "les feuilles mortes et l'odeur de fumée",
        wrongs: ["le nom du personnage", "la longueur de la phrase", "la couleur de l'encre"],
        methode: "Plusieurs indices convergent vers l'automne.",
      },
      {
        text: "Lis : « Sa chemise était trempée et il reprenait à peine son souffle. » Quel indice montre qu'il a couru ?",
        correct: "la chemise trempée et le souffle court",
        wrongs: ["la couleur de la chemise", "l'heure qu'il est", "le nom de la rue"],
        methode: "On relie les indices physiques à l'effort fourni.",
      },
      {
        text: "Un « indice » dans un texte, c'est...",
        correct: "un détail précis qui aide à comprendre le sens",
        wrongs: ["le titre du livre", "le nombre de pages", "le prix du livre"],
        methode: "L'indice est un détail qui éclaire l'interprétation.",
      },
    ],
    {
      "5e": [
        {
          text: "Lis : « Le sol tremblait, une odeur de soufre montait de la montagne fumante. » Quels indices annoncent un danger ?",
          correct: "le sol qui tremble et l'odeur de soufre",
          wrongs: ["la couleur du ciel", "le nom de la montagne", "l'heure de la journée"],
          methode: "On regroupe plusieurs indices qui vont dans le même sens.",
        },
        {
          text: "Lis : « L'armure rouillée et l'épée ébréchée témoignaient de mille combats. » Quels indices renseignent sur le passé du chevalier ?",
          correct: "l'armure rouillée et l'épée ébréchée",
          wrongs: ["le nom du château", "la date d'impression", "la couleur du parchemin"],
          methode: "Les objets décrits sont des indices du vécu du personnage.",
        },
      ],
      "4e": [
        {
          text: "Lis : « Il parlait de générosité, mais comptait chaque pièce avant de la donner. » Quel indice révèle son hypocrisie ?",
          correct: "il compte chaque pièce avant de donner",
          wrongs: ["il parle de générosité", "il possède des pièces", "il est présent dans la scène"],
          methode: "L'indice contredit les paroles : le geste dément le discours.",
        },
        {
          text: "Lis : « Ses ongles rongés et son regard fuyant le trahissaient. » Quels indices révèlent son inquiétude ?",
          correct: "les ongles rongés et le regard fuyant",
          wrongs: ["la couleur de sa veste", "son âge exact", "le nom de la ville"],
          methode: "On lit les indices du corps pour deviner l'émotion cachée.",
        },
      ],
      "3e": [
        {
          text: "Lis : « Les fenêtres restaient closes, mais derrière les rideaux, on devinait des regards. » Quel indice suggère une surveillance ?",
          correct: "les regards devinés derrière les rideaux",
          wrongs: ["les fenêtres closes seules", "la couleur des rideaux", "l'absence de bruit"],
          methode: "On repère l'indice qui crée une atmosphère de menace.",
        },
        {
          text: "Lis : « Le discours parlait de paix, mais les usines fabriquaient des armes. » Quel indice révèle la contradiction dénoncée ?",
          correct: "les usines qui fabriquent des armes",
          wrongs: ["le mot paix", "la longueur du discours", "la date du discours"],
          methode: "L'indice contredit le discours officiel : c'est une dénonciation.",
        },
      ],
    },
    level
  );
}

function comp_implicite(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Lis : « Quand le professeur rendit les copies, Malo glissa vite la sienne dans son sac, les joues rouges. » Qu'a probablement eu Malo ?",
        correct: "une mauvaise note",
        wrongs: ["la meilleure note", "un cadeau", "une bonne surprise"],
        methode: "L'implicite se déduit des indices : cacher sa copie et rougir.",
      },
      {
        text: "Comprendre l'implicite d'un texte, c'est comprendre...",
        correct: "ce que l'auteur laisse deviner sans l'écrire",
        wrongs: ["seulement les mots présents", "le nombre de phrases", "le titre uniquement"],
        methode: "L'implicite est le sens sous-entendu, à reconstruire.",
      },
      {
        text: "Lis : « — Bien sûr que je t'ai gardé une part, dit-il en évitant son regard. » Que comprend-on ?",
        correct: "qu'il a probablement mangé la part",
        wrongs: ["qu'il a vraiment gardé la part", "qu'il n'a pas faim", "qu'il déteste ce plat"],
        methode: "Le regard évité contredit la parole : c'est l'implicite.",
      },
      {
        text: "Lis : « La lumière de sa chambre resta allumée toute la nuit. » Qu'est-ce que cela laisse deviner ?",
        correct: "qu'il n'a pas dormi, préoccupé",
        wrongs: ["qu'il fait très beau dehors", "qu'il aime les lampes", "qu'il est en vacances"],
        methode: "On déduit un état d'esprit à partir d'un détail concret.",
      },
      {
        text: "Lis : « Elle rangea la photo dans un tiroir et n'en parla plus jamais. » Cela suggère...",
        correct: "un souvenir douloureux qu'elle veut oublier",
        wrongs: ["une envie de décorer", "un manque de place", "un simple ménage"],
        methode: "Le geste et le silence disent la douleur sans l'écrire.",
      },
    ],
    {
      "5e": [
        {
          text: "Lis : « — Encore toi ? soupira le marchand en croisant les bras. » Que ressent le marchand ?",
          correct: "de l'agacement",
          wrongs: ["de la joie", "de la peur", "de la surprise heureuse"],
          methode: "Le soupir et les bras croisés disent l'agacement sans l'écrire.",
        },
        {
          text: "Lis : « Le héros regarda une dernière fois son village, puis serra son baluchon. » Qu'est-ce que cela laisse deviner ?",
          correct: "qu'il s'apprête à partir pour longtemps",
          wrongs: ["qu'il va se coucher", "qu'il a faim", "qu'il déteste marcher"],
          methode: "Le « dernier regard » et le baluchon annoncent un départ.",
        },
      ],
      "4e": [
        {
          text: "Lis : « — Quel beau travail, dit-il en repoussant la copie du bout des doigts. » Que comprend-on de son jugement réel ?",
          correct: "il pense en fait le contraire (ironie)",
          wrongs: ["il est sincèrement admiratif", "il n'a pas lu la copie", "il félicite chaleureusement"],
          methode: "En 4e, on repère l'ironie : le ton et le geste contredisent les mots.",
        },
        {
          text: "Lis : « Sa générosité ne s'exerçait jamais sans témoins. » Que sous-entend l'auteur ?",
          correct: "qu'il aide surtout pour être vu et admiré",
          wrongs: ["qu'il est très timide", "qu'il déteste être aidé", "qu'il vit seul"],
          methode: "L'implicite critique un défaut caché derrière une belle apparence.",
        },
      ],
      "3e": [
        {
          text: "Lis : « On lui avait tout promis. On ne lui donna rien. » Que suggère cette opposition sèche ?",
          correct: "une dénonciation d'une injustice ou d'une trahison",
          wrongs: ["un simple oubli sans importance", "une scène joyeuse", "une liste de courses"],
          methode: "Le contraste souligne l'injustice : c'est l'implicite d'un texte engagé.",
        },
        {
          text: "Lis : « Les grands discours étaient finis ; restait à balayer les promesses par terre. » L'auteur sous-entend...",
          correct: "que les belles promesses n'ont pas été tenues",
          wrongs: ["qu'il faut nettoyer la salle", "qu'un discours a été applaudi", "qu'une fête commence"],
          methode: "L'image (« balayer les promesses ») dénonce des paroles vaines.",
        },
      ],
    },
    level
  );
}

function comp_apprecier(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Quelle phrase donne un avis de lecteur JUSTIFIÉ ?",
        correct: "J'ai aimé ce roman car le héros affronte ses peurs jusqu'au bout.",
        wrongs: ["Ce roman existe.", "Il a trois cents pages.", "C'est un roman."],
        methode: "Une appréciation fondée donne un avis ET une raison tirée du texte.",
      },
      {
        text: "Pour dire pourquoi un passage m'a ému, je dois...",
        correct: "m'appuyer sur ce qui est écrit dans le texte",
        wrongs: ["parler d'un autre livre", "donner la date du jour", "recopier la couverture"],
        methode: "Un avis solide se justifie par des éléments précis du texte.",
      },
      {
        text: "Quel avis montre le mieux que le lecteur a compris le texte ?",
        correct: "La fin m'a surpris car rien ne laissait deviner la trahison.",
        wrongs: ["C'est nul.", "J'ai lu vite.", "Il y a des images."],
        methode: "Un avis justifié relie l'émotion à un élément du récit.",
      },
      // Définition de cours réécrite en reconnaissance (01/08).
      {
        text: "« Ce passage m'a plu : l'auteur ne dit jamais que le personnage a peur, il le montre en décrivant ses mains qui tremblent. » Pourquoi est-ce un bon avis de lecteur ?",
        correct: "il s'appuie sur un procédé précis du texte",
        wrongs: [
          "il dit clairement que le texte a plu",
          "il est écrit à la première personne",
          "il est court et facile à lire",
        ],
        methode:
          "Un avis vaut par ce qu'il montre dans le texte, pas par son enthousiasme.",
      },
    ],
    {
      "5e": [
        {
          text: "Quel avis de lecteur est le mieux justifié sur un récit d'aventure ?",
          correct: "J'ai été tenu en haleine car les dangers s'enchaînent sans répit.",
          wrongs: ["C'est bien.", "C'est un livre.", "Il y a des pages."],
          methode: "On relie son plaisir de lecture à un procédé (le rythme, le suspense).",
        },
        {
          text: "Comment donner un avis justifié sur un personnage de conte ?",
          correct: "J'ai admiré la ruse du héros, qui triomphe sans jamais se battre.",
          wrongs: ["Il est là.", "C'est vieux.", "Je ne sais pas."],
          methode: "On justifie son admiration par un trait précis du personnage.",
        },
      ],
      "4e": [
        {
          text: "Dans un débat sur un roman réaliste, quelle appréciation est la plus argumentée ?",
          correct: "Le personnage m'a semblé cruel, car il trahit son ami pour de l'argent.",
          wrongs: ["Je n'aime pas, c'est tout.", "C'est vieux.", "Il y a beaucoup de mots."],
          methode: "En 4e, on porte un jugement nuancé appuyé sur les actes du personnage.",
        },
        {
          text: "Quelle appréciation d'un récit fantastique est la plus fine ?",
          correct: "Le doute m'a plu : on ne sait jamais si le fantôme est réel.",
          wrongs: ["C'est bizarre.", "Trop long.", "Bof."],
          methode: "On apprécie le procédé propre au genre (l'hésitation fantastique).",
        },
      ],
      "3e": [
        {
          text: "Quelle appréciation d'un poème engagé est la plus nuancée ?",
          correct: "Le poème m'a touché : ses images fortes dénoncent la guerre sans crier.",
          wrongs: ["C'est triste.", "Je n'ai pas compté les vers.", "C'est un poème ancien."],
          methode: "On formule un jugement nuancé, appuyé sur les procédés du texte.",
        },
        {
          text: "Comment apprécier finement un récit autobiographique ?",
          correct: "J'ai été ému par la sincérité avec laquelle l'auteur avoue ses erreurs.",
          wrongs: ["C'est sa vie.", "Il parle de lui.", "Il y a « je »."],
          methode: "On relie l'émotion à une qualité du texte (la sincérité, l'aveu).",
        },
      ],
    },
    level
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LECTURE À VOIX HAUTE — mise en voix (vrai pool dédié, pas de l'oral)
// ─────────────────────────────────────────────────────────────────────────────

function voix_preparer(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Avant de lire un texte long à voix haute devant la classe, la meilleure préparation est de...",
        correct: "le lire d'abord en silence pour repérer les mots difficiles et le sens",
        wrongs: ["le lire une seule fois, très vite", "n'apprendre que le titre", "ne rien préparer"],
        methode: "Préparer une lecture orale : comprendre le texte et anticiper les obstacles.",
      },
      {
        text: "Pour préparer la mise en voix, il est utile de marquer sur son texte...",
        correct: "les pauses, les liaisons et les mots à mettre en relief",
        wrongs: ["la date de naissance de l'auteur", "le prix du livre", "le nombre de pages du livre"],
        methode: "On annote son texte : respirations, groupes de sens, mots importants.",
      },
      {
        text: "Pour bien prononcer un mot rare avant de lire tout haut, on peut...",
        correct: "le découper en syllabes et s'entraîner à le dire",
        wrongs: ["le sauter complètement", "le remplacer par un autre", "le lire les yeux fermés"],
        methode: "On anticipe les mots difficiles en s'entraînant à les articuler.",
      },
      {
        text: "Repérer les groupes de sens avant de lire sert à...",
        correct: "savoir où respirer sans couper les phrases",
        wrongs: ["colorier la marge", "compter les virgules pour rien", "changer le texte"],
        methode: "Les groupes de sens guident les respirations de la lecture.",
      },
      {
        text: "La meilleure façon de gagner en aisance avant une lecture publique est de...",
        correct: "s'entraîner plusieurs fois à voix haute",
        wrongs: ["ne lire qu'en silence", "apprendre le texte par cœur sans le dire", "improviser le jour même"],
        methode: "L'entraînement oral prépare vraiment la mise en voix.",
      },
    ],
    {
      "5e": [
        {
          text: "Pour préparer la lecture d'un récit d'aventure, quel repérage aide le plus la mise en voix ?",
          correct: "repérer les passages de dialogue et les moments de tension",
          wrongs: ["compter les virgules", "colorier la marge", "mesurer les lignes"],
          methode: "On distingue narration et dialogues pour varier la voix.",
        },
        {
          text: "Avant de lire une fable, il est utile de repérer d'abord...",
          correct: "les paroles des animaux et la morale à souligner",
          wrongs: ["le nombre exact de mots", "la couleur de la page", "le nom de l'imprimeur"],
          methode: "On repère ce qu'il faudra mettre en valeur (dialogues, morale).",
        },
      ],
      "4e": [
        {
          text: "Pour préparer la lecture d'une tirade de théâtre, il faut surtout...",
          correct: "comprendre l'émotion du personnage et repérer les phrases fortes",
          wrongs: ["apprendre le nom du décorateur", "compter les répliques des autres", "chercher la date d'impression"],
          methode: "Au théâtre, la mise en voix sert l'émotion du personnage.",
        },
        {
          text: "Avant de lire un passage ironique d'un roman du XIXe siècle, on repère...",
          correct: "les endroits où le ton doit démentir les mots",
          wrongs: ["la taille de la police", "le poids du livre", "le prix d'édition"],
          methode: "On prépare le ton qui fera entendre l'ironie.",
        },
      ],
      "3e": [
        {
          text: "Pour préparer la lecture d'un poème engagé, le meilleur repérage est...",
          correct: "les images fortes et le rythme des vers à faire entendre",
          wrongs: ["le nombre de strophes seulement", "la taille de la police", "la couleur du papier"],
          methode: "On met en voix ce qui porte le sens : images, répétitions, rythme.",
        },
        {
          text: "Avant de lire un discours argumenté, il est utile de repérer...",
          correct: "les mots clés et les phrases à marteler pour convaincre",
          wrongs: ["la marge de gauche", "le nombre de pages", "la date d'achat"],
          methode: "On prépare les accents d'insistance qui portent l'argumentation.",
        },
      ],
    },
    level
  );
}

function voix_expressive(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Pour lire « — Attends-moi ! » cria-t-elle, comment mettre le ton ?",
        correct: "en montant la voix, plus fort, comme un appel",
        wrongs: ["en chuchotant lentement", "sans changer de voix", "en riant"],
        methode: "Le point d'exclamation et « cria » demandent une voix forte.",
      },
      {
        text: "Pendant une lecture à voix haute, pour garder l'attention du public, il faut aussi...",
        correct: "lever les yeux vers l'auditoire de temps en temps",
        wrongs: ["garder les yeux baissés tout le temps", "tourner le dos", "lire les yeux fermés"],
        methode: "Le regard fait partie de la mise en voix : on relie le texte au public.",
      },
      {
        text: "La ponctuation guide la voix : au point d'interrogation, on...",
        correct: "fait monter la voix à la fin de la phrase",
        wrongs: ["baisse la voix comme à un point", "s'arrête définitivement", "chuchote toujours"],
        methode: "La question s'entend : l'intonation monte à la fin.",
      },
      {
        text: "Pour lire « Chut… écoute », le mieux est de...",
        correct: "baisser la voix, comme pour un secret",
        wrongs: ["crier très fort", "rire aux éclats", "parler très vite"],
        methode: "Le sens du texte commande le volume : ici, tout bas.",
      },
      {
        text: "À la virgule, une bonne lecture expressive marque...",
        correct: "une courte pause, sans s'arrêter comme à un point",
        wrongs: ["un arrêt complet et long", "une accélération", "un cri"],
        methode: "La virgule appelle une brève respiration.",
      },
      {
        text: "Pour lire un passage plein de suspense, on peut...",
        correct: "ralentir et ménager de courts silences",
        wrongs: ["lire le plus vite possible", "rire à chaque phrase", "sauter des mots"],
        methode: "Le rythme lent et les silences créent la tension.",
      },
    ],
    {
      "5e": [
        {
          text: "Dans un dialogue signalé par un tiret, une bonne lecture expressive consiste à...",
          correct: "changer de voix pour distinguer les personnages",
          wrongs: ["lire tout d'une seule voix plate", "sauter les répliques", "lire de plus en plus vite"],
          methode: "On donne une voix à chaque personnage pour la clarté.",
        },
      ],
      "4e": [
        {
          text: "Pour lire une réplique où un personnage feint la politesse tout en étant méprisant, il faut...",
          correct: "faire entendre l'ironie par le ton",
          wrongs: ["lire d'une voix neutre et rapide", "crier chaque mot", "murmurer sans expression"],
          methode: "Le ton peut faire entendre le double sens (l'ironie) d'une réplique.",
        },
      ],
      "3e": [
        {
          text: "Pour rendre puissant un poème de révolte, la lecture doit surtout...",
          correct: "marteler le rythme et mettre en relief les mots forts",
          wrongs: ["lire vite et sans pause", "réciter d'une voix monotone", "murmurer du début à la fin"],
          methode: "Le rythme et les accents d'intensité portent la force du texte engagé.",
        },
      ],
    },
    level
  );
}

function voix_reciter(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Pour bien réciter un texte appris par cœur, il vaut mieux...",
        correct: "respecter le rythme et bien articuler",
        wrongs: ["réciter le plus vite possible", "sauter les passages difficiles", "parler tout bas, sans expression"],
        methode: "Réciter, c'est dire le texte en le faisant vivre, pas le débiter.",
      },
      {
        text: "Si tu oublies un passage en récitant, le mieux est de...",
        correct: "rester calme, faire une courte pause et reprendre",
        wrongs: ["t'arrêter et abandonner", "parler très vite pour cacher l'oubli", "quitter la scène"],
        methode: "Un trou de mémoire se gère par une courte pause maîtrisée.",
      },
      {
        text: "Réciter avec expression, c'est...",
        correct: "mettre le ton, pas seulement dire les mots sans erreur",
        wrongs: ["aller le plus vite possible", "réciter sans jamais respirer", "regarder toujours ses pieds"],
        methode: "La récitation vise l'expression, pas la performance de vitesse.",
      },
      {
        text: "Pour retenir un texte à réciter, une bonne méthode est de...",
        correct: "le mémoriser peu à peu, en le disant à voix haute",
        wrongs: ["le lire une seule fois en silence", "l'apprendre à l'envers", "le recopier sans le dire"],
        methode: "On apprend un texte oral en le répétant à voix haute.",
      },
      {
        text: "Pour réciter sans réciter « comme un robot », il faut...",
        correct: "penser au sens des phrases et varier l'intonation",
        wrongs: ["dire tout sur le même ton", "aller le plus vite possible", "supprimer les pauses"],
        methode: "Réciter avec sens évite le débit monotone.",
      },
      {
        text: "Quand on récite devant la classe, une bonne posture est de...",
        correct: "se tenir droit et regarder l'auditoire",
        wrongs: ["fixer le plafond", "tourner le dos", "cacher son visage"],
        methode: "La posture et le regard font partie d'une bonne récitation.",
      },
    ],
    {
      "5e": [
        {
          text: "Pour réciter une fable, quelle attention est la plus utile ?",
          correct: "marquer une petite pause à la fin de chaque vers",
          wrongs: ["s'arrêter longuement à chaque mot", "lire sans aucune pause", "chuchoter la morale"],
          methode: "En poésie, la fin de vers demande une brève pause, sans casser le sens.",
        },
      ],
      "4e": [
        {
          text: "Pour réciter une tirade avec conviction, il faut...",
          correct: "varier le rythme selon les émotions du personnage",
          wrongs: ["dire tout sur le même ton", "réciter machinalement", "accélérer jusqu'à la fin"],
          methode: "La récitation d'un texte de théâtre suit les émotions du rôle.",
        },
      ],
      "3e": [
        {
          text: "Pour réciter un poème en vers libres, le récitant doit surtout...",
          correct: "suivre le sens et les images plutôt qu'une rime régulière",
          wrongs: ["chercher une rime à chaque fin", "compter les syllabes à voix haute", "réciter sans respirer"],
          methode: "En vers libres, c'est le sens et les images qui guident la voix.",
        },
      ],
    },
    level
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CULTURE LITTÉRAIRE — genres, contexte, réseaux, trace
// ─────────────────────────────────────────────────────────────────────────────

function culture_genres(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      // ⚠️ RECONNAÎTRE UN GENRE, C'EST LE RECONNAÎTRE SUR UN EXTRAIT (01/08).
      // Ces questions donnaient la définition et demandaient le nom — l'élève
      // pouvait répondre sans avoir jamais ouvert un livre. On donne donc
      // désormais quelques lignes, et c'est à lui de voir. Les extraits sont
      // écrits pour EleveAI : aucun ayant droit, et on choisit les indices.
      {
        text: "« Le vent se couche au creux des cannes / et la nuit sent le sucre chaud. » De quel genre relève ce texte ?",
        correct: "un poème",
        wrongs: ["un article de presse", "une recette", "une notice de montage"],
        methode:
          "Deux vers, un rythme, une image : la forme et le travail des sonorités signent le poème.",
      },
      {
        text: "« LE PÈRE. — Tu rentres bien tard.\nCLARA, posant son sac. — Le bus n'est jamais passé. » De quel genre relève ce texte ?",
        correct: "un texte de théâtre",
        wrongs: ["un roman", "un poème", "un mode d'emploi"],
        methode:
          "Les noms en tête de réplique et l'indication de jeu entre virgules — la didascalie — ne se trouvent qu'au théâtre.",
      },
      {
        text: "« Ulysse, que la déesse aux yeux clairs protégeait, aborda l'île au lever du jour. » De quel genre relève ce texte ?",
        correct: "un mythe (ou une épopée)",
        wrongs: ["un fait divers", "une notice de montage", "un bulletin météo"],
        methode:
          "Un héros nommé, une divinité qui intervient dans l'action : c'est le monde du mythe.",
      },
      {
        text: "« Trois ans plus tard, Camille n'avait toujours pas revendu la maison. Elle y montait chaque dimanche, sans jamais y entrer. » De quel genre relève ce texte ?",
        correct: "un roman",
        wrongs: ["un poème", "une pièce de théâtre", "un dictionnaire"],
        methode:
          "De la prose, un personnage suivi sur des années : le temps long est la marque du roman.",
      },
    ],
    {
      "5e": [
        {
          text: "« Le chevalier baissa sa lance et éperonna son cheval. Au bout du champ clos, son adversaire attendait sans bouger. » De quel genre relève ce texte ?",
          correct: "un roman de chevalerie",
          wrongs: [
            "un roman policier",
            "un documentaire scientifique",
            "une bande dessinée humoristique",
          ],
          methode:
            "La lance, le champ clos, le duel réglé : c'est le décor du récit de chevalerie.",
        },
        {
          text: "« Le Rat des villes reçut son cousin des champs. Le repas fut interrompu : mieux vaut peu de pain en paix qu'un festin dans la crainte. » De quel genre relève ce texte ?",
          correct: "une fable",
          wrongs: ["une tragédie", "un roman-fleuve", "un fait divers"],
          methode:
            "Des animaux qui agissent comme des hommes, et une leçon donnée à la fin : c'est la fable.",
        },
        {
          // ⚠️ PERSONNAGES INVENTÉS, ET C'EST VOULU. La première version mettait
          // ARGAN et TOINETTE sur des répliques que j'avais écrites : donner
          // des noms de Molière à un texte qui n'est pas de lui, c'est
          // apprendre une fausseté à l'élève. Quand on veut du Molière, on
          // cite Molière (voir 5e/francais/fixed.bank.ts).
          text: "« MADAME BRISSAC. — Je suis à l'agonie, je vous dis ! LÉONIE, sans lever les yeux de son ouvrage. — Alors mourez, madame, cela vous fera passer l'envie de vous plaindre. » De quel genre relève ce texte ?",
          correct: "une comédie",
          wrongs: ["une tragédie", "un poème lyrique", "un conte de fées"],
          methode:
            "Une servante qui répond à son maître et le ridiculise : le rire y corrige un défaut, l'imaginaire malade.",
        },
      ],
      "4e": [
        {
          text: "Un récit où d'étranges phénomènes font hésiter entre le réel et le surnaturel est...",
          correct: "un récit fantastique",
          wrongs: ["un récit de voyage", "une farce", "un article de journal"],
          methode: "En 4e, on étudie le fantastique : le doute entre réel et surnaturel.",
        },
        {
          text: "Un long récit en prose qui peint la société du XIXe siècle avec réalisme est...",
          correct: "un roman réaliste",
          wrongs: ["une épopée antique", "une fable", "un conte merveilleux"],
          methode: "Le roman réaliste dépeint fidèlement la société de son temps.",
        },
        {
          text: "Un poème qui chante les sentiments et les émotions du poète est...",
          correct: "un poème lyrique",
          wrongs: ["un mode d'emploi", "un compte rendu", "un règlement"],
          methode: "La poésie lyrique exprime les sentiments personnels.",
        },
      ],
      "3e": [
        {
          text: "Un texte où l'auteur raconte sa propre vie à la première personne est...",
          correct: "un récit autobiographique",
          wrongs: ["un roman de science-fiction", "une comédie", "un manuel scolaire"],
          methode: "En 3e, on lit l'autobiographie : l'auteur, le narrateur et le personnage ne font qu'un.",
        },
        {
          text: "Un poème qui dénonce la guerre ou l'injustice est un poème...",
          correct: "engagé",
          wrongs: ["de circonstance joyeuse", "purement décoratif", "sans aucun sens"],
          methode: "La poésie engagée met les mots au service d'une cause.",
        },
        {
          text: "Un texte où un témoin raconte ce qu'il a réellement vécu, par exemple une guerre, est...",
          correct: "un témoignage",
          wrongs: ["un conte merveilleux", "une farce", "une devinette"],
          methode: "Le témoignage rapporte une expérience réellement vécue.",
        },
      ],
    },
    level
  );
}

function culture_contexte(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Situer une œuvre dans son contexte, c'est se demander...",
        correct: "à quelle époque et dans quel pays elle a été écrite",
        wrongs: ["combien elle coûte", "qui l'a empruntée", "sa couleur de couverture"],
        methode: "Le contexte éclaire le sens d'une œuvre (époque, société).",
      },
      {
        text: "Connaître le contexte d'un texte aide surtout à...",
        correct: "mieux comprendre ce que l'auteur a voulu dire",
        wrongs: ["deviner son prix", "compter ses pages", "choisir sa reliure"],
        methode: "Le contexte donne les clés pour interpréter l'œuvre.",
      },
      {
        text: "Le « contexte historique » d'une œuvre, c'est...",
        correct: "l'époque et les événements au moment où elle a été écrite",
        wrongs: ["le nombre de ses chapitres", "le nom de son imprimeur", "son prix en librairie"],
        methode: "Le contexte historique situe l'œuvre dans son temps.",
      },
      {
        text: "Pour situer une œuvre, il est utile de repérer...",
        correct: "son auteur, son siècle et le genre auquel elle appartient",
        wrongs: ["sa couleur de couverture", "son poids exact", "le magasin qui la vend"],
        methode: "On situe une œuvre par son auteur, son époque et son genre.",
      },
      {
        text: "Savoir qu'un texte a été écrit pendant une guerre aide à...",
        correct: "comprendre pourquoi il parle de peur ou d'espoir",
        wrongs: ["connaître son prix", "compter ses pages", "choisir sa police"],
        methode: "Le contexte éclaire les thèmes du texte.",
      },
    ],
    {
      "5e": [
        {
          text: "Les récits de chevalerie que l'on étudie en 5e se situent surtout...",
          correct: "au Moyen Âge",
          wrongs: ["à la préhistoire", "au XXIe siècle", "sur une autre planète"],
          methode: "On rattache le genre à son époque (le Moyen Âge pour la chevalerie).",
        },
        {
          text: "L'Odyssée, qui raconte le retour d'Ulysse, a été composée...",
          correct: "dans l'Antiquité grecque",
          wrongs: ["au Moyen Âge en France", "au XIXe siècle", "l'an dernier"],
          methode: "On situe l'œuvre dans son temps (l'Antiquité pour les épopées grecques).",
        },
        {
          text: "Les comédies de Molière ont été écrites...",
          correct: "au XVIIe siècle",
          wrongs: ["à la préhistoire", "au XXIe siècle", "au Moyen Âge"],
          methode: "On relie l'auteur à son siècle (Molière au XVIIe siècle).",
        },
      ],
      "4e": [
        {
          text: "Les romans réalistes de Balzac ou Maupassant peignent surtout la société...",
          correct: "du XIXe siècle",
          wrongs: ["de l'Antiquité", "du Moyen Âge", "de l'an 2100"],
          methode: "En 4e, le roman réaliste éclaire la société du XIXe siècle.",
        },
        {
          text: "Le mouvement des Lumières, au XVIIIe siècle, défend surtout...",
          correct: "la raison, la tolérance et le savoir",
          wrongs: ["l'ignorance et la peur", "la guerre pour la guerre", "le silence des savants"],
          methode: "On relie une œuvre aux idées de son époque (les Lumières et la raison).",
        },
      ],
      "3e": [
        {
          text: "Les récits de témoignage sur les guerres du XXe siècle servent surtout à...",
          correct: "garder la mémoire et alerter les générations suivantes",
          wrongs: ["donner des recettes de cuisine", "apprendre à nager", "vendre des billets"],
          methode: "En 3e, on lit des témoignages pour comprendre l'Histoire et s'engager.",
        },
        {
          text: "La poésie de la Résistance a surtout été écrite pendant...",
          correct: "la Seconde Guerre mondiale",
          wrongs: ["l'Antiquité", "le Moyen Âge", "la préhistoire"],
          methode: "On situe la poésie engagée dans son contexte historique.",
        },
      ],
    },
    level
  );
}

function culture_reseau(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Mettre deux œuvres « en réseau », c'est...",
        correct: "les rapprocher parce qu'elles partagent un thème ou un procédé",
        wrongs: ["les ranger par ordre de prix", "compter leurs pages", "les lire le même jour"],
        methode: "Le réseau relie des œuvres autour d'une idée commune.",
      },
      {
        text: "Relier un livre au film qui en est tiré, c'est...",
        correct: "mettre les deux œuvres en réseau pour les comparer",
        wrongs: ["choisir la moins chère", "abandonner la lecture", "ignorer les différences"],
        methode: "Comparer des œuvres d'un même sujet, c'est les mettre en réseau.",
      },
      {
        text: "Deux textes qui traitent du même thème peuvent être...",
        correct: "mis en réseau pour comparer leurs points de vue",
        wrongs: ["classés par taille", "notés sur vingt", "rangés par couleur"],
        methode: "Le réseau relie des œuvres par le thème.",
      },
      {
        text: "Comparer un tableau et un poème sur la mer, c'est...",
        correct: "relier deux arts autour d'un même sujet",
        wrongs: ["choisir le plus récent", "peindre le poème", "réciter le tableau"],
        methode: "On met en réseau des œuvres de formes différentes.",
      },
      {
        text: "Mettre en réseau aide surtout à...",
        correct: "mieux comprendre une œuvre en la comparant à d'autres",
        wrongs: ["gagner du temps de lecture", "éviter de lire", "compter les pages"],
        methode: "La comparaison éclaire chaque œuvre.",
      },
    ],
    {
      "5e": [
        {
          text: "La ruse d'Ulysse face au cyclope peut être rapprochée...",
          correct: "de la ruse du Petit Poucet face à l'ogre",
          wrongs: ["d'une leçon de calcul", "d'une carte de géographie", "d'une liste de verbes"],
          methode: "On relie deux héros rusés : c'est mettre les récits en réseau.",
        },
        {
          text: "Un roman de chevalerie et une légende du roi Arthur se rejoignent par...",
          correct: "le thème de la quête et de l'honneur",
          wrongs: ["le nombre de pages", "la couleur des couvertures", "la date d'achat"],
          methode: "On met en réseau des récits qui partagent des valeurs communes.",
        },
      ],
      "4e": [
        {
          text: "Un roman réaliste sur la misère ouvrière fait écho...",
          correct: "à un tableau du XIXe siècle représentant des ouvriers",
          wrongs: ["à une publicité moderne pour un jeu", "à une recette de dessert", "à un bulletin météo"],
          methode: "On met en réseau un texte et une œuvre d'art de la même époque.",
        },
        {
          text: "Deux récits fantastiques se rejoignent souvent par...",
          correct: "le doute entre explication réelle et surnaturelle",
          wrongs: ["leur nombre de chapitres", "leur prix", "leur reliure"],
          methode: "On relie les œuvres par le procédé de genre qu'elles partagent.",
        },
      ],
      "3e": [
        {
          text: "Un poème dénonçant la guerre peut être mis en réseau avec...",
          correct: "une affiche ou une chanson engagées sur le même thème",
          wrongs: ["un catalogue de meubles", "un horaire de bus", "une notice de montage"],
          methode: "On relie des œuvres engagées de formes différentes autour d'une même cause.",
        },
        {
          text: "Deux témoignages sur un même événement historique se comparent surtout par...",
          correct: "les points de vue et les émotions qu'ils transmettent",
          wrongs: ["le poids des livres", "la taille des lettres", "le prix d'achat"],
          methode: "On met en réseau des témoignages pour croiser les regards.",
        },
      ],
    },
    level
  );
}

function culture_trace(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Pour garder une trace personnelle de tes lectures, tu peux tenir...",
        correct: "un carnet de lecture avec titres, extraits et impressions",
        wrongs: ["un cahier de mathématiques", "une liste de courses", "rien du tout"],
        methode: "Le carnet de lecture garde la mémoire de ce qu'on a lu et ressenti.",
      },
      {
        text: "Dans un carnet de lecture, la trace la plus utile est...",
        correct: "un passage aimé accompagné de la raison qui l'a marqué",
        wrongs: ["seulement le nombre de pages", "la couleur de la couverture", "le prix du livre"],
        methode: "On garde ce qui nourrit la réflexion : un extrait et un avis justifié.",
      },
      {
        text: "Recopier une citation qui t'a plu dans ton carnet permet de...",
        correct: "te souvenir de ce qui t'a touché et pourquoi",
        wrongs: ["remplir des pages sans but", "gagner un concours", "cacher le livre"],
        methode: "La citation gardée fixe un moment fort de la lecture.",
      },
      {
        text: "Dans un carnet de lecture, noter le genre de l'œuvre aide à...",
        correct: "relier ses lectures et repérer ce qu'on aime",
        wrongs: ["remplir la page", "oublier le livre", "compter les mots"],
        methode: "Classer par genre organise sa mémoire de lecteur.",
      },
      {
        text: "Une bonne fiche de lecture contient au moins...",
        correct: "le titre, l'auteur, le genre et un avis personnel",
        wrongs: ["seulement le prix", "la couleur de la couverture", "le poids du livre"],
        methode: "La fiche garde les informations utiles et un avis.",
      },
    ],
    {
      "5e": [
        {
          text: "Après un récit d'aventure, une bonne trace dans le carnet est...",
          correct: "le passage le plus palpitant et ce qu'il m'a fait ressentir",
          wrongs: ["le nombre de chapitres seulement", "la date d'impression", "le nom de l'imprimeur"],
          methode: "On garde ce qui a marqué la lecture, avec son ressenti.",
        },
      ],
      "4e": [
        {
          text: "Pour comparer deux personnages de romans dans son carnet, on note surtout...",
          correct: "leurs actes, leurs valeurs et ce qu'ils révèlent",
          wrongs: ["la longueur de leur nom", "la date d'impression", "le poids du livre"],
          methode: "On compare les personnages sur ce qui compte : leurs choix et leurs valeurs.",
        },
      ],
      "3e": [
        {
          text: "Après une lecture engagée, une trace pertinente dans le carnet est...",
          correct: "la cause défendue et l'effet que le texte a produit sur moi",
          wrongs: ["la marque du stylo utilisé", "le nombre de virgules", "l'heure de la lecture"],
          methode: "On garde le sens du combat du texte et sa résonance personnelle.",
        },
      ],
    },
    level
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ÉCRITURE — écrire pour apprendre, inventer, réfléchir, réviser
// ─────────────────────────────────────────────────────────────────────────────

function ecrit_notes(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Écrire pour mémoriser une leçon, c'est surtout...",
        correct: "reformuler les idées importantes avec ses propres mots",
        wrongs: ["recopier tout le manuel mot à mot", "n'écrire que la date", "dessiner la couverture"],
        methode: "Écrire pour apprendre, c'est reformuler, pas recopier.",
      },
      {
        text: "Pour garder une trace utile d'un cours, on écrit...",
        correct: "les mots clés et l'essentiel, de façon organisée",
        wrongs: ["chaque mot prononcé", "seulement des dessins", "rien, on retient tout"],
        methode: "La prise de notes sélectionne et organise l'information.",
      },
      {
        text: "Un brouillon sert surtout à...",
        correct: "organiser ses idées avant de rédiger au propre",
        wrongs: ["rendre le devoir tel quel", "faire de beaux dessins", "compter les lignes"],
        methode: "Le brouillon prépare l'écrit : on y pose et on y trie les idées.",
      },
      {
        text: "Pour retenir une idée compliquée, il est efficace de...",
        correct: "la réécrire simplement, avec un exemple à soi",
        wrongs: ["la recopier trois fois sans réfléchir", "l'ignorer", "la surligner en entier"],
        methode: "Reformuler avec un exemple personnel ancre la compréhension.",
      },
      {
        text: "Écrire un résumé de leçon, c'est surtout...",
        correct: "garder les idées essentielles en peu de mots",
        wrongs: ["tout recopier sans trier", "n'écrire que le titre", "ajouter des détails inutiles"],
        methode: "Le résumé sélectionne l'essentiel.",
      },
      {
        text: "Pour apprendre en écrivant, il vaut mieux...",
        correct: "faire une carte mentale ou un schéma des idées",
        wrongs: ["recopier passivement dix fois", "écrire les yeux fermés", "ne rien organiser"],
        methode: "Organiser les idées (schéma, carte) aide à mémoriser.",
      },
    ],
    {
      "5e": [
        {
          text: "Pour prendre des notes pendant la lecture d'un récit, on note surtout...",
          correct: "les personnages, les lieux et les grandes étapes",
          wrongs: ["chaque phrase entière", "la couleur des pages", "le prix du livre"],
          methode: "On note ce qui aide à suivre l'histoire.",
        },
      ],
      "4e": [
        {
          text: "En écoutant un cours sur un roman du XIXe siècle, une prise de notes efficace garde...",
          correct: "les idées clés et un exemple pour chacune",
          wrongs: ["tout le discours du professeur", "seulement la date", "les bavardages autour"],
          methode: "On sélectionne l'essentiel et on l'illustre.",
        },
      ],
      "3e": [
        {
          text: "Pour préparer un écrit de réflexion au brevet, un brouillon efficace...",
          correct: "liste les idées et les exemples avant de rédiger",
          wrongs: ["est déjà le texte au propre", "n'existe pas", "se limite au titre"],
          methode: "Le brouillon organise la pensée avant la rédaction.",
        },
      ],
    },
    level
  );
}

function ecrit_invention(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Pour écrire un récit cohérent, il faut au moins...",
        correct: "un personnage, un problème et un dénouement",
        wrongs: ["seulement une liste de mots", "beaucoup de fautes", "aucun personnage"],
        methode: "Un récit tient par sa structure : situation, péripéties, fin.",
      },
      {
        text: "Pour montrer qu'une action se passe APRÈS une autre, on écrit...",
        correct: "« ensuite » ou « plus tard »",
        wrongs: ["« en même temps »", "« pendant ce temps »", "« au même moment »"],
        methode: "Les connecteurs de temps marquent la succession des actions.",
      },
      {
        text: "Pour rendre une description vivante, on choisit surtout...",
        correct: "des détails précis qui font voir la scène",
        wrongs: ["des mots au hasard", "seulement des chiffres", "aucun adjectif"],
        methode: "Une description forte s'appuie sur des sensations précises.",
      },
      {
        text: "Dans un dialogue de récit, chaque nouvelle réplique se marque par...",
        correct: "un tiret et un retour à la ligne",
        wrongs: ["un point d'exclamation obligatoire", "une majuscule au milieu du mot", "aucune ponctuation"],
        methode: "Le dialogue s'écrit avec tirets et retours à la ligne.",
      },
    ],
    {
      "5e": [
        {
          text: "Pour écrire la suite d'un récit d'aventure, il faut surtout...",
          correct: "respecter le personnage et prolonger l'histoire sans se contredire",
          wrongs: ["changer tous les noms", "oublier ce qui précède", "recommencer une autre histoire"],
          methode: "Écrire une suite, c'est rester cohérent avec le texte de départ.",
        },
        {
          text: "Pour écrire un récit de voyage imaginaire, on peut surtout...",
          correct: "décrire des lieux inconnus et les émotions du voyageur",
          wrongs: ["donner une liste de prix", "réciter une leçon de grammaire", "copier une recette"],
          methode: "Le récit de voyage fait découvrir des lieux et des sensations.",
        },
      ],
      "4e": [
        {
          text: "Pour écrire un récit fantastique, le procédé le plus adapté est...",
          correct: "installer le doute entre explication réelle et surnaturelle",
          wrongs: ["tout expliquer dès la première ligne", "ne mettre aucun mystère", "donner la fin d'abord"],
          methode: "Le fantastique repose sur l'hésitation entre réel et surnaturel.",
        },
        {
          text: "Pour rendre un personnage inquiétant dans un récit, on peut...",
          correct: "distiller des détails troublants au fil du texte",
          wrongs: ["dire aussitôt qu'il est méchant", "l'oublier après une ligne", "ne rien décrire"],
          methode: "On crée l'inquiétude par petites touches, pas d'un coup.",
        },
      ],
      "3e": [
        {
          text: "Pour écrire un texte à partir d'un souvenir, à la manière autobiographique, on emploie surtout...",
          correct: "la première personne et le temps du passé",
          wrongs: ["la troisième personne d'un inconnu", "seulement le futur", "aucun pronom"],
          methode: "Le récit de soi se dit à la première personne, au passé.",
        },
        {
          text: "Pour écrire un poème ou un texte engagé, un bon moyen de toucher le lecteur est...",
          correct: "employer des images fortes au service d'une idée",
          wrongs: ["aligner des chiffres", "recopier une notice", "éviter toute émotion"],
          methode: "Le texte engagé met les images au service d'une cause.",
        },
      ],
    },
    level
  );
}

function ecrit_reflexion(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Pour répondre à « As-tu aimé ce texte ? » dans un paragraphe construit, on écrit...",
        correct: "son avis, puis une raison, puis un exemple du texte",
        wrongs: ["seulement « oui »", "le résumé complet", "le prix du livre"],
        methode: "Un paragraphe de réflexion : avis + argument + exemple.",
      },
      {
        text: "Dans un paragraphe argumenté, l'exemple sert à...",
        correct: "illustrer et rendre concret l'argument",
        wrongs: ["remplacer l'idée", "allonger le texte pour rien", "changer de sujet"],
        methode: "L'exemple appuie l'argument en le rendant concret.",
      },
      {
        text: "Pour organiser un paragraphe de réflexion, l'ordre le plus clair est...",
        correct: "une idée, un argument, un exemple, une petite conclusion",
        wrongs: ["des idées mélangées sans lien", "seulement des exemples", "une seule phrase floue"],
        methode: "Un paragraphe clair suit un ordre logique.",
      },
      {
        text: "Pour introduire un exemple dans un paragraphe, on peut écrire...",
        correct: "« par exemple » ou « ainsi »",
        wrongs: ["« au revoir »", "« c'est tout »", "« point final »"],
        methode: "Les mots « par exemple », « ainsi » annoncent un exemple.",
      },
      {
        text: "Un paragraphe de réflexion réussi se termine par...",
        correct: "une phrase qui résume ou nuance l'idée",
        wrongs: ["un dessin", "une question sans lien", "le prix du livre"],
        methode: "On conclut un paragraphe par une phrase de bilan.",
      },
    ],
    {
      "5e": [
        {
          text: "Pour donner son avis sur un héros de récit, on écrit...",
          correct: "ce qu'on pense de lui, avec une action qui le prouve",
          wrongs: ["seulement « il est bien »", "le nombre de pages", "la couleur du livre"],
          methode: "On appuie son avis sur un acte précis du personnage.",
        },
      ],
      "4e": [
        {
          text: "Pour défendre une opinion dans un paragraphe argumenté, l'ordre le plus clair est...",
          correct: "thèse, puis argument, puis exemple qui l'illustre",
          wrongs: ["exemple seul, sans idée", "opinion répétée trois fois", "questions sans réponse"],
          methode: "On argumente en enchaînant thèse, argument et exemple.",
        },
      ],
      "3e": [
        {
          text: "Dans un texte d'opinion, pour répondre à une objection, on utilise...",
          correct: "un connecteur d'opposition comme « cependant » ou « pourtant »",
          wrongs: ["un connecteur d'addition comme « et »", "aucun connecteur", "seulement « donc »"],
          methode: "On nuance en tenant compte de l'avis contraire.",
        },
      ],
    },
    level
  );
}

function ecrit_reviser(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Réviser son texte, c'est...",
        correct: "le relire pour corriger les fautes et améliorer les phrases",
        wrongs: ["le recopier sans le lire", "compter les lignes", "changer de cahier"],
        methode: "Réviser améliore le fond et la langue, ce n'est pas recopier.",
      },
      {
        text: "Quelle révision rend un écrit plus solide au cycle 4 ?",
        correct: "vérifier la cohérence, enrichir le lexique et corriger les accords",
        wrongs: ["changer seulement la couleur du stylo", "supprimer tous les connecteurs", "ne garder que la première phrase"],
        methode: "On contrôle l'organisation, le vocabulaire, la syntaxe et l'orthographe.",
      },
      {
        text: "En te relisant, une bonne vérification de la ponctuation consiste à...",
        correct: "contrôler majuscules, points et virgules",
        wrongs: ["effacer toute la ponctuation", "ajouter des points au hasard", "n'écrire qu'en majuscules"],
        methode: "La relecture vérifie aussi la ponctuation.",
      },
      {
        text: "Pour éviter les répétitions en te relisant, tu peux...",
        correct: "remplacer un mot répété par un synonyme ou un pronom",
        wrongs: ["répéter le mot encore plus", "supprimer la phrase entière", "écrire en gras"],
        methode: "On enrichit le texte en variant le vocabulaire.",
      },
      {
        text: "La toute dernière étape avant de rendre un texte est de...",
        correct: "le relire une dernière fois pour traquer les fautes",
        wrongs: ["le plier soigneusement", "compter les mots", "changer de stylo"],
        methode: "La relecture finale est indispensable.",
      },
      {
        text: "Pour vérifier qu'un texte est clair, on peut...",
        correct: "le relire à voix basse pour entendre ce qui coince",
        wrongs: ["le lire à l'envers", "ne pas le relire", "le recopier sans le lire"],
        methode: "La relecture à voix basse repère les phrases maladroites.",
      },
    ],
    {
      "4e": [
        {
          text: "Pour vérifier un accord dans le groupe nominal, on contrôle...",
          correct: "le genre et le nombre du déterminant, du nom et de l'adjectif",
          wrongs: ["la couleur de l'encre", "le nombre de lignes", "la marge de droite"],
          methode: "L'accord dans le GN porte sur le genre et le nombre.",
        },
      ],
      "3e": [
        {
          text: "Pour vérifier l'accord d'un participe passé employé avec « avoir », on regarde...",
          correct: "si un complément d'objet direct est placé avant le verbe",
          wrongs: ["la couleur de l'encre", "le nombre de lignes", "la marge de droite"],
          methode: "Avec « avoir », le participe s'accorde avec le COD antéposé.",
        },
      ],
    },
    level
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ORAL — écouter, présenter, argumenter, jouer
// ─────────────────────────────────────────────────────────────────────────────

function oral_ecouter(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Pour bien comprendre un exposé oral, il faut...",
        correct: "écouter attentivement et repérer les idées importantes",
        wrongs: ["parler avec son voisin", "penser à autre chose", "regarder par la fenêtre"],
        methode: "Écouter pour comprendre : se concentrer et retenir l'essentiel.",
      },
      {
        text: "Reformuler ce qu'on vient d'entendre, c'est le redire...",
        correct: "avec ses propres mots pour montrer qu'on a compris",
        wrongs: ["exactement pareil sans comprendre", "beaucoup plus fort", "en changeant de sujet"],
        methode: "La reformulation prouve la compréhension.",
      },
      {
        text: "Quand on écoute un camarade, une bonne attitude est de...",
        correct: "le laisser finir avant de réagir",
        wrongs: ["l'interrompre sans cesse", "parler en même temps", "quitter la salle"],
        methode: "Écouter, c'est respecter la parole de l'autre.",
      },
      {
        text: "Poser une question après un exposé sert à...",
        correct: "mieux comprendre ou approfondir un point",
        wrongs: ["déranger celui qui a parlé", "montrer qu'on n'a rien écouté", "changer de sujet"],
        methode: "Une bonne question prolonge l'écoute active.",
      },
      {
        text: "Pour montrer qu'on écoute vraiment quelqu'un, on peut...",
        correct: "le regarder et reformuler ensuite ses idées",
        wrongs: ["regarder son téléphone", "penser à autre chose", "parler en même temps"],
        methode: "L'écoute active se voit à l'attention et à la reformulation.",
      },
    ],
    {
      "4e": [
        {
          text: "En écoutant un débat, prendre des notes utiles, c'est noter...",
          correct: "les arguments principaux de chaque intervenant",
          wrongs: ["chaque mot dit", "la couleur des vêtements", "l'heure exacte"],
          methode: "On garde la trace des arguments, pas de tout le discours.",
        },
      ],
      "3e": [
        {
          text: "Pour rendre compte d'un exposé écouté, on garde surtout...",
          correct: "la thèse défendue et les arguments clés",
          wrongs: ["le nombre de mots employés", "la taille de l'orateur", "l'heure de la fin"],
          methode: "On retient l'essentiel du propos : thèse et arguments.",
        },
      ],
    },
    level
  );
}

function oral_presenter(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Pour présenter clairement un exposé devant la classe, il vaut mieux...",
        correct: "parler fort, articuler et suivre un plan",
        wrongs: ["lire ses notes à toute vitesse, tête baissée", "chuchoter", "improviser sans idée"],
        methode: "Une présentation claire est audible, articulée et organisée.",
      },
      {
        text: "Pour bien commencer un exposé, on...",
        correct: "annonce le sujet et le plan de la présentation",
        wrongs: ["lit la conclusion d'abord", "reste silencieux", "parle d'un autre sujet"],
        methode: "On oriente l'auditoire dès l'introduction.",
      },
      {
        text: "Pendant un exposé, regarder son public sert à...",
        correct: "garder son attention et vérifier qu'il suit",
        wrongs: ["perdre le fil", "gagner du temps", "cacher ses notes"],
        methode: "Le regard maintient le lien avec l'auditoire.",
      },
      {
        text: "Un bon support d'exposé (affiche, diaporama) doit surtout...",
        correct: "rester clair et lisible, avec peu de texte",
        wrongs: ["contenir tout le discours écrit", "être illisible", "changer à chaque phrase"],
        methode: "Le support appuie la parole sans la remplacer.",
      },
      {
        text: "Pour bien conclure un exposé, on...",
        correct: "résume l'essentiel et remercie l'auditoire",
        wrongs: ["part sans rien dire", "commence un nouveau sujet", "lit une liste de mots"],
        methode: "La conclusion récapitule et referme la présentation.",
      },
    ],
    {
      "3e": [
        {
          text: "Pour présenter un objet d'étude à l'oral du brevet, un bon appui est...",
          correct: "un support clair et des exemples précis",
          wrongs: ["un texte lu mot à mot sans lever les yeux", "aucune préparation", "une lecture très rapide"],
          methode: "À l'oral, on s'appuie sur un support et des exemples pour convaincre.",
        },
      ],
    },
    level
  );
}

function oral_argumenter(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Dans un débat interprétatif, quelle prise de parole est la plus attendue ?",
        correct: "Je pense que ce personnage hésite, car le texte dit que sa voix tremble.",
        wrongs: ["Je n'aime pas, c'est tout.", "Tout le monde a tort sauf moi.", "Je change de sujet."],
        methode: "Une parole argumentée donne une idée ET une justification.",
      },
      {
        text: "Pour justifier ton point de vue à l'oral, tu dois...",
        correct: "donner ton avis ET une raison qui l'explique",
        wrongs: ["répéter « parce que » sans expliquer", "parler plus fort que les autres", "changer d'avis à chaque phrase"],
        methode: "Justifier, c'est appuyer son avis sur une raison claire.",
      },
      {
        text: "Dans une discussion, un bon argument est...",
        correct: "une raison qui soutient clairement l'idée défendue",
        wrongs: ["une moquerie", "un cri plus fort", "une phrase sans rapport"],
        methode: "L'argument justifie la thèse, il ne l'impose pas par la force.",
      },
      {
        text: "Pour bien participer à un débat, avant de répondre, il faut...",
        correct: "écouter l'argument de l'autre jusqu'au bout",
        wrongs: ["l'interrompre aussitôt", "parler plus fort que lui", "répéter sa propre phrase"],
        methode: "On argumente en écoutant vraiment l'autre d'abord.",
      },
      {
        text: "Quelle formule ouvre le mieux un désaccord poli ?",
        correct: "« Je ne suis pas d'accord, car... »",
        wrongs: ["« Tu dis n'importe quoi. »", "« C'est faux, tais-toi. »", "« Tout le monde le sait. »"],
        methode: "On exprime un désaccord en donnant une raison, poliment.",
      },
    ],
    {
      "4e": [
        {
          text: "Quand un camarade défend l'avis contraire, la meilleure réponse est de...",
          correct: "reconnaître son point, puis répondre avec un argument",
          wrongs: ["se moquer de lui", "hausser le ton", "refuser de l'écouter"],
          methode: "On argumente en tenant compte de l'avis adverse, sans agressivité.",
        },
      ],
      "3e": [
        {
          text: "Pour rendre un argument plus fort à l'oral, on peut...",
          correct: "l'appuyer sur un exemple précis et vérifiable",
          wrongs: ["répéter la même phrase trois fois", "parler très vite", "affirmer sans preuve"],
          methode: "Un exemple concret renforce l'argument.",
        },
      ],
    },
    level
  );
}

function oral_jouer(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Pour bien JOUER une scène de théâtre, il faut...",
        correct: "mettre le ton et les gestes selon le personnage",
        wrongs: ["lire d'une voix plate, sans bouger", "parler très bas", "tourner le dos au public"],
        methode: "Jouer un texte, c'est l'interpréter : voix, ton et gestes du rôle.",
      },
      {
        text: "Pour dire un poème devant la classe, il vaut mieux...",
        correct: "soigner le rythme, les pauses et l'expression",
        wrongs: ["réciter le plus vite possible", "parler sans aucune émotion", "regarder ses pieds"],
        methode: "Dire un texte, c'est le faire vivre par la voix.",
      },
      {
        text: "Pour jouer un dialogue à deux personnages, il faut surtout...",
        correct: "distinguer les deux voix et écouter la réplique de l'autre",
        wrongs: ["parler en même temps que l'autre", "réciter sans écouter", "tourner le dos à son partenaire"],
        methode: "Jouer une scène, c'est aussi réagir à son partenaire.",
      },
      {
        text: "Pour mettre en scène une dispute au théâtre, on peut...",
        correct: "hausser le ton et marquer les gestes de la colère",
        wrongs: ["parler tout bas sans bouger", "sourire calmement", "lire d'une voix plate"],
        methode: "Le jeu adapte voix et gestes à l'émotion de la scène.",
      },
      {
        text: "Avant de jouer une scène, la meilleure préparation est de...",
        correct: "comprendre l'intention du personnage et répéter à voix haute",
        wrongs: ["apprendre seulement la dernière phrase", "improviser sans rien lire", "compter les répliques des autres"],
        methode: "On prépare le jeu en comprenant le rôle et en répétant.",
      },
    ],
    {
      "5e": [
        {
          text: "Pour jouer une farce (une scène comique), on doit surtout...",
          correct: "exagérer les gestes et le ton pour faire rire",
          wrongs: ["rester immobile et sérieux", "parler sans expression", "murmurer chaque mot"],
          methode: "La farce joue sur l'exagération comique.",
        },
      ],
      "4e": [
        {
          text: "Pour interpréter une réplique ironique, le comédien doit...",
          correct: "faire entendre le contraire de ce que disent les mots",
          wrongs: ["dire la réplique sans nuance", "crier la phrase", "l'oublier"],
          methode: "L'ironie se joue par un décalage entre les mots et le ton.",
        },
      ],
      "3e": [
        {
          text: "Pour jouer un monologue chargé d'émotion, l'acteur doit surtout...",
          correct: "varier le rythme et les silences pour porter l'émotion",
          wrongs: ["débiter tout à la même vitesse", "rire sans raison", "lire mécaniquement"],
          methode: "Les silences et le rythme donnent sa force à un monologue.",
        },
      ],
    },
    level
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VOCABULAIRE — contexte, relations, formation, réemploi, orthographe
// ─────────────────────────────────────────────────────────────────────────────

function voc_contexte(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Dans « Le sentier serpentait entre les arbres », que veut dire « serpentait » ?",
        correct: "faisait des courbes, des virages",
        wrongs: ["montait tout droit", "descendait très vite", "s'arrêtait net"],
        methode: "Le contexte (un sentier entre les arbres) éclaire le mot.",
      },
      {
        text: "Dans « Il resta impassible malgré les cris », « impassible » veut dire...",
        correct: "sans montrer d'émotion",
        wrongs: ["très agité", "terrifié", "hilare"],
        methode: "On infère le sens grâce au contraste avec « les cris ».",
      },
      {
        text: "Dans « La foule était compacte, on ne pouvait plus avancer », « compacte » veut dire...",
        correct: "très serrée",
        wrongs: ["très clairsemée", "silencieuse", "joyeuse"],
        methode: "Le contexte « on ne pouvait plus avancer » donne le sens.",
      },
      {
        text: "Dans « Son récit était limpide, tout le monde comprit », « limpide » veut dire...",
        correct: "très clair",
        wrongs: ["confus", "ennuyeux", "trop long"],
        methode: "Le contexte « tout le monde comprit » oriente le sens.",
      },
    ],
    {
      "5e": [
        {
          text: "Dans « Le désert était aride, sans une goutte d'eau », « aride » veut dire...",
          correct: "très sec",
          wrongs: ["très humide", "très froid", "très vert"],
          methode: "Le contexte « sans eau » donne le sens.",
        },
        {
          text: "Dans « Le chevalier, intrépide, fonça sur le dragon », « intrépide » veut dire...",
          correct: "qui n'a pas peur",
          wrongs: ["très prudent", "endormi", "malade"],
          methode: "On devine le sens grâce à l'action (foncer sur le dragon).",
        },
        {
          text: "Dans « Le voyageur, harassé, s'endormit aussitôt », « harassé » veut dire...",
          correct: "épuisé",
          wrongs: ["reposé", "affamé", "furieux"],
          methode: "Le contexte (s'endormir aussitôt) indique la fatigue.",
        },
      ],
      "4e": [
        {
          text: "Dans « Il affichait une mine hautaine et méprisante », « hautaine » veut dire...",
          correct: "qui se croit supérieur aux autres",
          wrongs: ["très joyeuse", "timide et effacée", "amicale"],
          methode: "Le contexte « méprisante » oriente le sens.",
        },
        {
          text: "Dans « Sa fortune était un mirage, elle s'évanouit en un jour », « mirage » désigne...",
          correct: "une illusion trompeuse",
          wrongs: ["une somme réelle", "un objet solide", "un lieu précis"],
          methode: "Le contexte (elle « s'évanouit ») montre qu'il s'agit d'une illusion.",
        },
        {
          text: "Dans « Il tenait des propos fallacieux pour tromper son monde », « fallacieux » veut dire...",
          correct: "trompeurs",
          wrongs: ["sincères", "amusants", "polis"],
          methode: "Le contexte « pour tromper » donne le sens.",
        },
      ],
      "3e": [
        {
          text: "Dans « L'orateur dénonça avec véhémence l'injustice », « véhémence » veut dire...",
          correct: "une force passionnée",
          wrongs: ["une grande douceur", "une totale indifférence", "un profond silence"],
          methode: "Le contexte (« dénonça ») indique une parole forte et passionnée.",
        },
        {
          text: "Dans « Ce discours prône la tolérance entre les peuples », « prône » veut dire...",
          correct: "recommande, défend avec force",
          wrongs: ["interdit", "ignore", "moque"],
          methode: "Le sens se déduit du thème défendu (la tolérance).",
        },
        {
          text: "Dans « Sa lutte fut opiniâtre, il ne renonça jamais », « opiniâtre » veut dire...",
          correct: "acharnée, tenace",
          wrongs: ["molle", "brève", "joyeuse"],
          methode: "Le contexte « il ne renonça jamais » donne le sens.",
        },
      ],
    },
    level
  );
}

function voc_relations(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Quel est un synonyme de « rapide » ?",
        correct: "vif",
        wrongs: ["lent", "lourd", "calme"],
        methode: "Un synonyme a un sens proche.",
      },
      {
        text: "Quel est le contraire de « courage » ?",
        correct: "lâcheté",
        wrongs: ["bravoure", "vaillance", "audace"],
        methode: "Un antonyme a le sens opposé.",
      },
      {
        text: "Quels mots appartiennent au même champ lexical que « la mer » ?",
        correct: "vague, marée, rivage",
        wrongs: ["four, casserole, plat", "école, cahier, stylo", "moteur, roue, volant"],
        methode: "Un champ lexical réunit les mots d'un même thème.",
      },
      {
        text: "Quel est un synonyme de « peur » ?",
        correct: "crainte",
        wrongs: ["joie", "courage", "colère"],
        methode: "On choisit un mot de sens proche.",
      },
      {
        text: "Quel est le contraire de « clair » (pour un texte) ?",
        correct: "obscur",
        wrongs: ["net", "limpide", "précis"],
        methode: "L'antonyme dit le sens opposé.",
      },
      {
        text: "Quel est un synonyme de « riche » (pour un vocabulaire) ?",
        correct: "varié",
        wrongs: ["pauvre", "petit", "vide"],
        methode: "On choisit un mot de sens proche.",
      },
      {
        text: "Quels mots appartiennent au même champ lexical que « la peur » ?",
        correct: "frayeur, terreur, angoisse",
        wrongs: ["joie, sourire, fête", "table, chaise, lampe", "vitesse, moteur, route"],
        methode: "Le champ lexical réunit les mots d'un même thème.",
      },
    ],
    {
      "4e": [
        {
          text: "Quels mots appartiennent au champ lexical du jugement ?",
          correct: "valeur, mérite, faute",
          wrongs: ["fenêtre, mur, toit", "vitesse, moteur, route", "sable, dune, oasis"],
          methode: "En 4e, on travaille le lexique du jugement et des valeurs.",
        },
        {
          text: "Quel mot est le plus précis pour remplacer « très triste » ?",
          correct: "accablé",
          wrongs: ["content", "rapide", "visible"],
          methode: "On choisit un synonyme précis, plus expressif.",
        },
      ],
      "3e": [
        {
          text: "Quels mots appartiennent au champ lexical de l'engagement ?",
          correct: "combat, cause, liberté",
          wrongs: ["assiette, verre, nappe", "crayon, gomme, règle", "nuage, pluie, vent"],
          methode: "En 3e, on repère le lexique de l'engagement et de la révolte.",
        },
        {
          text: "Quel mot est le plus précis pour remplacer « défendre une cause » ?",
          correct: "militer",
          wrongs: ["dormir", "hésiter", "ignorer"],
          methode: "On choisit le verbe exact pour l'idée d'engagement.",
        },
      ],
    },
    level
  );
}

function voc_formation(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Dans le mot « refroidir », quel est le préfixe ?",
        correct: "re-",
        wrongs: ["-ir", "froid", "-dir"],
        methode: "Le préfixe se place devant le radical.",
      },
      {
        text: "Le suffixe « -eur » dans « nageur » sert à désigner...",
        correct: "la personne qui fait l'action",
        wrongs: ["le contraire du mot", "un lieu", "un petit objet"],
        methode: "Le suffixe « -eur » forme un nom d'agent (celui qui agit).",
      },
      {
        text: "Quel préfixe marque souvent l'opposition ou la négation ?",
        correct: "in-",
        wrongs: ["re-", "pré-", "trans-"],
        methode: "« in- » nie ou inverse le sens (in-juste, in-connu).",
      },
      {
        text: "Dans le mot « déplacer », le préfixe « dé- » marque...",
        correct: "le contraire ou l'éloignement",
        wrongs: ["la répétition", "la personne", "le lieu"],
        methode: "« dé- » inverse ou éloigne (dé-faire, dé-placer).",
      },
      {
        text: "Le préfixe « pré- » dans « prévenir » signifie...",
        correct: "avant",
        wrongs: ["après", "contre", "sans"],
        methode: "« pré- » indique ce qui vient avant.",
      },
      {
        text: "Le suffixe « -able » dans « lavable » signifie...",
        correct: "qui peut être fait",
        wrongs: ["le contraire", "un lieu", "une personne"],
        methode: "« -able » veut dire « qui peut être » (lavable = qui peut être lavé).",
      },
      {
        text: "Le suffixe « -iste » dans « journaliste » désigne...",
        correct: "une personne qui exerce un métier",
        wrongs: ["un lieu", "une action passée", "un petit objet"],
        methode: "« -iste » forme des noms de métier ou de partisan.",
      },
    ],
    {
      "4e": [
        {
          text: "Le suffixe « -tion » dans « libération » sert à former...",
          correct: "un nom qui désigne une action ou son résultat",
          wrongs: ["un verbe à l'infinitif", "un adjectif de couleur", "un adverbe de lieu"],
          methode: "Le suffixe « -tion » transforme un verbe en nom d'action.",
        },
      ],
      "3e": [
        {
          text: "Le préfixe « anti- » dans « antiesclavagiste » signifie...",
          correct: "contre, opposé à",
          wrongs: ["après", "avec", "petit"],
          methode: "« anti- » marque l'opposition (contre quelque chose).",
        },
      ],
    },
    level
  );
}

function voc_reemploi(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Quelle phrase emploie correctement l'adverbe « fièrement » ?",
        correct: "Le champion brandit fièrement sa médaille.",
        wrongs: ["Le fièrement est posé sur la table.", "Il mange un fièrement.", "Fièrement bleu la maison."],
        methode: "L'adverbe accompagne un verbe et garde du sens dans la phrase.",
      },
      {
        text: "Quelle phrase emploie correctement l'adjectif « courageux » ?",
        correct: "Le pompier courageux entra dans les flammes.",
        wrongs: ["Le courageux roule vite.", "Il boit un courageux.", "Courageux la porte s'ouvre."],
        methode: "L'adjectif qualifie un nom et convient au sens.",
      },
      {
        text: "Quelle phrase emploie correctement le verbe « affronter » ?",
        correct: "Le héros doit affronter mille dangers.",
        wrongs: ["Il affronte sur la table.", "Un affronter dans le tiroir.", "Affronter bleu la maison."],
        methode: "On réemploie le verbe dans une phrase qui a du sens.",
      },
      {
        text: "Quelle phrase emploie correctement le nom « épreuve » ?",
        correct: "Il a surmonté cette épreuve avec courage.",
        wrongs: ["Il épreuve la porte.", "Une épreuve bleue mange.", "Épreuve vite le mur."],
        methode: "Le nom s'emploie dans une phrase qui a du sens.",
      },
      {
        text: "Quelle phrase emploie correctement l'adverbe « prudemment » ?",
        correct: "Elle traversa la rue prudemment.",
        wrongs: ["Le prudemment est cassé.", "Il boit un prudemment.", "Prudemment rouge la maison."],
        methode: "L'adverbe accompagne un verbe.",
      },
    ],
    {
      "4e": [
        {
          text: "Quelle phrase emploie correctement l'adjectif « méprisant » ?",
          correct: "Il lança un regard méprisant à son adversaire.",
          wrongs: ["Le méprisant roule sur la route.", "Il boit un méprisant.", "Méprisant vite la porte."],
          methode: "L'adjectif qualifie un nom et convient au sens de la phrase.",
        },
      ],
      "3e": [
        {
          text: "Quelle phrase emploie correctement le nom « injustice » ?",
          correct: "Le texte dénonce l'injustice faite aux plus faibles.",
          wrongs: ["Il court injustice le matin.", "L'injustice bleue mange une pomme.", "Injustice sur la table."],
          methode: "On réemploie le mot dans une phrase qui a du sens.",
        },
      ],
    },
    level
  );
}

// ⚠️ CHAQUE ÉNONCÉ PORTE SA PHRASE (corrigé le 01/08). Les huit items de ce
// pool partageaient l'intitulé « Quelle est l'orthographe correcte ? ». Or le
// tirage des épreuves blanches déduplique sur le TEXTE de la question :
// mesuré, ces huit items ne rendaient qu'UNE question tirable, et la
// micro-compétence plafonnait à 7 énoncés distincts là où les autres en
// comptaient 12 à 15. Replacer le mot dans une phrase règle le tirage — et
// teste au passage quelque chose de plus juste : un mot ne s'écrit pas dans
// le vide, il s'écrit dans un texte.
function voc_orthographe(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      { text: "« La musique impose son … . » Quelle orthographe convient ?", correct: "rythme", wrongs: ["rytme", "rithme", "rhytme"], methode: "On mémorise l'orthographe des mots étudiés." },
      { text: "« Nous partons … , comme prévu. » Comment s'écrit ce mot ?", correct: "aujourd'hui", wrongs: ["aujourdhui", "aujour'dui", "aujourd'huit"], methode: "On retient l'orthographe des mots fréquents." },
      { text: "« Elle a attendu … devant la porte. » Quelle orthographe convient ?", correct: "longtemps", wrongs: ["longtan", "lontemps", "longtemp"], methode: "On mémorise les lettres muettes." },
      { text: "« … arrivé, il repartit sans un mot. » Quelle orthographe convient ?", correct: "aussitôt", wrongs: ["aussitot", "aussitôts", "aussi tôt"], methode: "On soigne l'accent circonflexe et la soudure." },
      { text: "« Il se glissa … les invités. » Comment s'écrit ce mot ?", correct: "parmi", wrongs: ["parmis", "parmit", "par mi"], methode: "« parmi » ne prend jamais de « s »." },
      { text: "« Il lui arrive … de mentir. » Quelle orthographe convient ?", correct: "quelquefois", wrongs: ["quelque fois", "quelquesfois", "quelquefoi"], methode: "« quelquefois » (parfois) s'écrit en un seul mot." },
    ],
    {
      "4e": [
        { text: "« Son explication n'a rien de … . » Quelle orthographe convient ?", correct: "vraisemblable", wrongs: ["vraissemblable", "vraisemblabe", "vraisamblable"], methode: "On mémorise l'orthographe des mots savants." },
        { text: "« Il faudrait y réfléchir … . » Comment s'écrit ce mot ?", correct: "davantage", wrongs: ["d'avantage", "davantâge", "daventage"], methode: "« davantage » (plus) s'écrit en un mot, sans apostrophe." },
      ],
      "3e": [
        { text: "« Le texte défend l'… des peuples colonisés. » Quelle orthographe convient ?", correct: "émancipation", wrongs: ["émencipation", "émancipasion", "emancipation"], methode: "On soigne accents et terminaisons des mots abstraits." },
        { text: "« Il a soudain pris … du danger. » Comment s'écrit ce mot ?", correct: "conscience", wrongs: ["consience", "conciense", "conscence"], methode: "On mémorise le « sc » de « conscience »." },
      ],
    },
    level
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GRAMMAIRE — constituants, fonctions, accords, oral/écrit
// ─────────────────────────────────────────────────────────────────────────────

function gram_constituants(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Combien de verbes conjugués dans « Le vent se leva et les feuilles tombèrent » ?",
        correct: "2",
        wrongs: ["1", "0", "3"],
        methode: "On compte les verbes conjugués pour distinguer simple et complexe.",
      },
      // ⚠️ CES DEUX QUESTIONS ÉTAIENT DES DÉFINITIONS DE COURS (« Une phrase
      // simple contient… »). Réécrites le 01/08 : l'évaluation nationale ne
      // demande jamais de réciter une leçon, elle demande de RECONNAÎTRE sur
      // un énoncé. Le cahier officiel de 5ᵉ ne pose que des questions de ce
      // type-là.
      {
        text: "« Le chat dort sur le mur tiède. » Pourquoi est-ce une phrase simple ?",
        correct: "elle ne contient qu'un seul verbe conjugué",
        wrongs: [
          "elle est courte",
          "elle ne contient aucun complément",
          "elle se termine par un point",
        ],
        methode:
          "C'est le nombre de verbes conjugués qui décide, jamais la longueur.",
      },
      {
        text: "« Quand la pluie s'arrêta, les enfants sortirent. » Pourquoi est-ce une phrase complexe ?",
        correct: "elle contient deux verbes conjugués",
        wrongs: [
          "elle est longue",
          "elle commence par « Quand »",
          "elle contient une virgule",
        ],
        methode:
          "« s'arrêta » et « sortirent » : deux verbes conjugués, donc deux propositions.",
      },
    ],
    {
      "5e": [
        {
          text: "Dans « Il pleuvait, donc nous sommes rentrés », les deux propositions sont reliées par...",
          correct: "la coordination (« donc »)",
          wrongs: ["une subordination", "une juxtaposition sans mot", "une seule proposition"],
          methode: "En 5e, on distingue juxtaposition et coordination.",
        },
        {
          text: "Dans « Le soleil brillait ; les oiseaux chantaient », les propositions sont...",
          correct: "juxtaposées (séparées par un point-virgule)",
          wrongs: ["coordonnées par « et »", "subordonnées", "réduites à une seule"],
          methode: "La juxtaposition relie les propositions par une ponctuation.",
        },
        {
          text: "Dans « Range ta chambre et sors le chien », les propositions sont reliées par...",
          correct: "la coordination (« et »)",
          wrongs: ["une subordination", "un pronom relatif", "une seule proposition"],
          methode: "« et » coordonne deux propositions.",
        },
      ],
      "4e": [
        {
          text: "Dans « Je sais que tu viendras », la proposition « que tu viendras » est...",
          correct: "une subordonnée conjonctive",
          wrongs: ["une proposition indépendante", "un groupe nominal sujet", "une proposition coordonnée"],
          methode: "En 4e, on identifie les subordonnées introduites par « que ».",
        },
        {
          text: "Dans « Le livre que je lis est passionnant », « que je lis » est...",
          correct: "une proposition subordonnée relative",
          wrongs: ["une proposition principale", "un complément circonstanciel", "un groupe adjectival"],
          methode: "La relative, introduite par un pronom relatif, complète un nom.",
        },
        {
          text: "Dans « La maison où j'ai grandi a été vendue », « où j'ai grandi » est...",
          correct: "une proposition subordonnée relative",
          wrongs: ["une proposition principale", "une subordonnée de temps", "un groupe nominal"],
          methode: "« où » est ici un pronom relatif qui introduit une relative.",
        },
      ],
      "3e": [
        {
          text: "Dans « Bien qu'il soit tard, il continue de travailler », la subordonnée exprime...",
          correct: "l'opposition ou la concession",
          wrongs: ["la cause", "le but", "la comparaison"],
          methode: "En 3e, on reconnaît les subordonnées circonstancielles et leur sens.",
        },
        {
          text: "Dans « Il partit avant que la nuit tombe », la subordonnée exprime...",
          correct: "le temps",
          wrongs: ["la conséquence", "la condition", "le lieu"],
          methode: "« avant que » introduit une subordonnée de temps.",
        },
        {
          text: "Dans « Il travaille pour qu'on le respecte », la subordonnée exprime...",
          correct: "le but",
          wrongs: ["la cause", "le temps", "l'opposition"],
          methode: "« pour que » introduit une subordonnée de but.",
        },
      ],
    },
    level
  );
}

function gram_fonctions(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Dans « Sous le pont coule la rivière », quel est le sujet du verbe « coule » ?",
        correct: "la rivière",
        wrongs: ["le pont", "coule", "sous"],
        methode: "On pose « qu'est-ce qui coule ? » : le sujet peut suivre le verbe.",
      },
      {
        text: "Dans « Le jardinier plante des fleurs au printemps », quel groupe est complément d'objet ?",
        correct: "des fleurs",
        wrongs: ["au printemps", "le jardinier", "plante"],
        methode: "Le COD répond à « plante quoi ? » : des fleurs.",
      },
      {
        text: "Dans « Chaque soir, les enfants rentrent à la maison », quel est le complément circonstanciel de temps ?",
        correct: "Chaque soir",
        wrongs: ["les enfants", "rentrent", "à la maison"],
        methode: "Le CC de temps répond à « quand ? ».",
      },
      {
        text: "Dans « Les enfants jouent dans la cour », quel est le complément circonstanciel de lieu ?",
        correct: "dans la cour",
        wrongs: ["Les enfants", "jouent", "les"],
        methode: "Le CC de lieu répond à « où ? ».",
      },
    ],
    {
      "5e": [
        {
          text: "Dans « Elle offre un cadeau à son frère », quelle est la fonction de « à son frère » ?",
          correct: "complément d'objet indirect (COI)",
          wrongs: ["complément d'objet direct", "sujet", "complément circonstanciel de lieu"],
          methode: "Le COI répond à « à qui ? » et se construit avec une préposition.",
        },
        {
          text: "Dans « Les témoins racontent leur histoire avec émotion », quelle est la fonction de « Les témoins » ?",
          correct: "sujet du verbe « racontent »",
          wrongs: ["complément d'objet", "complément de phrase", "adjectif"],
          methode: "On identifie le sujet en posant « qui est-ce qui raconte ? ».",
        },
      ],
      "4e": [
        {
          text: "Dans « la maison de mes grands-parents », quelle est la fonction de « de mes grands-parents » ?",
          correct: "complément du nom « maison »",
          wrongs: ["sujet", "complément d'objet direct", "attribut du sujet"],
          methode: "En 4e, on étudie les expansions du nom (dont le complément du nom).",
        },
        {
          text: "Dans « Ce voyageur semblait épuisé », quelle est la fonction de « épuisé » ?",
          correct: "attribut du sujet",
          wrongs: ["complément d'objet direct", "complément circonstanciel", "sujet"],
          methode: "Après « semblait » (verbe d'état), l'adjectif est attribut du sujet.",
        },
      ],
      "3e": [
        {
          text: "Dans « Le coupable fut arrêté par la police », quel est le complément d'agent ?",
          correct: "par la police",
          wrongs: ["le coupable", "fut arrêté", "aucun"],
          methode: "À la voix passive, le complément d'agent (introduit par « par ») fait l'action.",
        },
        {
          text: "Dans « Il obtint ce poste parce qu'il travaillait dur », quelle est la fonction de « parce qu'il travaillait dur » ?",
          correct: "complément circonstanciel de cause",
          wrongs: ["complément d'objet direct", "sujet", "attribut"],
          methode: "« parce que » introduit une subordonnée de cause.",
        },
      ],
    },
    level
  );
}

function gram_accords(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Quel groupe nominal est correctement accordé ?",
        correct: "des histoires merveilleuses",
        wrongs: ["des histoire merveilleuses", "des histoires merveilleuse", "des histoires merveilleux"],
        methode: "Au féminin pluriel, nom et adjectif prennent la marque du pluriel.",
      },
      {
        text: "Choisis la forme correcte : « La bande de pirates ___ à l'abordage. »",
        correct: "se lance",
        wrongs: ["se lancent", "se lances", "se lancer"],
        methode: "Le sujet est « la bande » (singulier), malgré « de pirates ».",
      },
      {
        text: "Choisis la forme correcte : « Les enfants ___ dans le jardin. » (jouer, présent)",
        correct: "jouent",
        wrongs: ["joue", "joues", "jouer"],
        methode: "Le verbe s'accorde avec le sujet pluriel « les enfants ».",
      },
      {
        text: "Quel groupe nominal est correctement accordé ?",
        correct: "les nouveaux élèves",
        wrongs: ["les nouveau élèves", "les nouveaux élève", "le nouveaux élèves"],
        methode: "Déterminant, adjectif et nom s'accordent au masculin pluriel.",
      },
    ],
    {
      "5e": [
        {
          text: "Choisis la forme correcte : « Les élèves de la classe ___ en silence. »",
          correct: "travaillent",
          wrongs: ["travaille", "travailles", "travailler"],
          methode: "Le sujet est « les élèves » : on accorde malgré le mot « classe ».",
        },
        {
          text: "Quel groupe nominal est correctement accordé ?",
          correct: "de vieux châteaux abandonnés",
          wrongs: ["de vieux château abandonnés", "de vieux châteaux abandonné", "de vieil châteaux abandonnés"],
          methode: "Le nom et l'adjectif s'accordent au masculin pluriel.",
        },
      ],
      "4e": [
        {
          text: "Choisis la forme correcte : « Les lettres qu'elle a ___ sont émouvantes. » (écrire)",
          correct: "écrites",
          wrongs: ["écrit", "écris", "écrient"],
          methode: "Avec « avoir », le participe s'accorde avec le COD « qu' » (les lettres) placé avant.",
        },
        {
          text: "Choisis la forme correcte : « Cette histoire, je l'ai ___ hier. » (finir)",
          correct: "finie",
          wrongs: ["fini", "finis", "finit"],
          methode: "Le COD « l' » (l'histoire, féminin) est avant : le participe s'accorde.",
        },
      ],
      "3e": [
        {
          text: "Choisis la forme correcte : « Les décisions qui ont été ___ changeront tout. » (prendre)",
          correct: "prises",
          wrongs: ["pris", "prise", "prit"],
          methode: "À la voix passive, le participe s'accorde avec le sujet (les décisions).",
        },
        {
          text: "Choisis la forme correcte : « Les fleurs se sont ___ vers le soleil. » (tourner)",
          correct: "tournées",
          wrongs: ["tourné", "tourner", "tournés"],
          methode: "Avec un verbe pronominal réfléchi, le participe s'accorde avec le sujet.",
        },
      ],
    },
    level
  );
}

function gram_oral_ecrit(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "À l'écrit soigné, « Y'a pas de souci » s'écrit correctement...",
        correct: "Il n'y a pas de souci.",
        wrongs: ["Ya pas de souci.", "Il ya pas de souci.", "Y a pas d'souci."],
        methode: "À l'écrit, on rétablit la négation complète « ne... pas ».",
      },
      {
        text: "Quelle phrase relève d'un usage soigné de l'écrit ?",
        correct: "Je ne comprends pas cette consigne.",
        wrongs: ["Je comprends pas.", "J'comprends rien.", "Comprends pas là."],
        methode: "À l'écrit, la négation « ne... pas » n'est pas supprimée.",
      },
      {
        text: "À l'écrit, la forme correcte est...",
        correct: "Nous n'avons rien vu.",
        wrongs: ["On a rien vu.", "Nous avons rien vu.", "On n'a rien vu, nous."],
        methode: "On rétablit « ne » de la négation à l'écrit soigné.",
      },
      {
        text: "À l'écrit soigné, « J'sais pas » s'écrit...",
        correct: "Je ne sais pas.",
        wrongs: ["J'sais pas.", "Je sais pas.", "Chais pas."],
        methode: "On rétablit « ne » et on n'élide pas « je » à l'écrit.",
      },
      {
        text: "Quelle phrase relève de l'écrit soigné ?",
        correct: "Cela ne me dérange pas du tout.",
        wrongs: ["Ça me dérange pas.", "Ça m'dérange pas.", "Pas grave, ça va."],
        methode: "L'écrit soigné évite « ça » relâché et rétablit la négation.",
      },
    ],
    {
      "4e": [
        {
          text: "Dans un écrit soutenu, « Qu'est-ce que tu veux ? » devient...",
          correct: "Que veux-tu ?",
          wrongs: ["Tu veux quoi ?", "C'est quoi que tu veux ?", "Tu veux ça comment ?"],
          methode: "L'interrogation soutenue inverse le sujet et le verbe.",
        },
      ],
      "3e": [
        {
          text: "Dans un débat écrit argumenté, on préfère la formule...",
          correct: "« Il me semble que cette idée est contestable. »",
          wrongs: ["« C'est nul, ton truc. »", "« N'importe quoi. »", "« Bof, on verra. »"],
          methode: "L'écrit argumenté choisit un registre courant à soutenu, poli et précis.",
        },
      ],
    },
    level
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANALYSE DU DISCOURS — registres, paroles rapportées, argumentation
// ─────────────────────────────────────────────────────────────────────────────

function discours_registres(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Quelle phrase relève du registre soutenu ?",
        correct: "Je vous prie de bien vouloir patienter un instant.",
        wrongs: ["Attends deux secondes.", "Bouge pas.", "Patiente, c'est bon."],
        methode: "Le registre soutenu emploie un vocabulaire choisi et des tournures polies.",
      },
      {
        text: "« Ce type est vachement sympa » relève du registre...",
        correct: "familier",
        wrongs: ["soutenu", "courant", "poétique"],
        methode: "Le registre familier emploie un vocabulaire relâché (« type », « vachement »).",
      },
      {
        text: "Le registre courant est celui que l'on emploie...",
        correct: "dans la vie de tous les jours, poliment",
        wrongs: ["seulement en poésie", "uniquement entre amis très proches", "dans les textes de loi"],
        methode: "Le registre courant est neutre : ni relâché, ni très soutenu.",
      },
      {
        text: "« Veuillez agréer mes salutations distinguées » appartient au registre...",
        correct: "soutenu",
        wrongs: ["familier", "argotique", "enfantin"],
        methode: "Cette formule de politesse relève du registre soutenu.",
      },
      {
        text: "« Salut, ça roule ? » appartient au registre...",
        correct: "familier",
        wrongs: ["soutenu", "courant", "littéraire"],
        methode: "Cette salutation relâchée relève du registre familier.",
      },
      {
        text: "Adapter son registre, c'est choisir son langage selon...",
        correct: "la personne à qui l'on parle et la situation",
        wrongs: ["la couleur de ses vêtements", "l'heure exacte", "le nombre de mots"],
        methode: "On adapte le registre à l'interlocuteur et au contexte.",
      },
    ],
    {
      "4e": [
        {
          text: "Pour transformer « File-moi ça ! » en registre soutenu, on écrit...",
          correct: "Pourriez-vous me donner cela ?",
          wrongs: ["Donne ça vite.", "Passe-moi le truc.", "File, allez !"],
          methode: "On passe du familier au soutenu en changeant vocabulaire et tournure.",
        },
      ],
      "3e": [
        {
          text: "Un discours qui veut convaincre un large public choisit le plus souvent un registre...",
          correct: "courant à soutenu, clair et digne",
          wrongs: ["familier et relâché", "argotique", "incompréhensible"],
          methode: "Le registre s'adapte à la situation : un discours public reste soigné.",
        },
      ],
    },
    level
  );
}

function discours_rapportees(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Quelle phrase contient des paroles rapportées DIRECTEMENT ?",
        correct: "Elle murmura : « Je reviendrai demain. »",
        wrongs: ["Elle dit qu'elle reviendrait.", "Elle reviendra demain.", "Demain, elle revient."],
        methode: "Le discours direct cite les paroles entre guillemets, telles quelles.",
      },
      {
        text: "« Il annonça qu'il partirait le lendemain. » Ces paroles sont rapportées...",
        correct: "au discours indirect",
        wrongs: ["au discours direct", "sans aucun rapport de paroles", "en vers"],
        methode: "Le discours indirect intègre les paroles dans une subordonnée, sans guillemets.",
      },
      {
        // Définition réécrite en reconnaissance (01/08).
        text: "« Elle murmura : “Je n'ai rien vu.” » À quoi reconnaît-on ici le discours direct ?",
        correct: "aux deux points et aux guillemets qui encadrent les paroles",
        wrongs: [
          "au verbe conjugué au passé simple",
          "à la brièveté de la phrase",
          "à la présence d'une négation",
        ],
        methode:
          "Le discours direct rapporte les mots tels qu'ils ont été dits : la ponctuation le montre.",
      },
      {
        text: "Quel verbe introduit des paroles rapportées ?",
        correct: "déclarer",
        wrongs: ["marcher", "dormir", "peindre"],
        methode: "Les verbes de parole (dire, déclarer, murmurer) introduisent le discours rapporté.",
      },
      {
        text: "« Elle demanda si nous venions. » Ces paroles sont...",
        correct: "au discours indirect (une question rapportée)",
        wrongs: ["au discours direct", "sans rapport de paroles", "un ordre à l'impératif"],
        methode: "La question rapportée sans guillemets est du discours indirect.",
      },
    ],
    {
      "4e": [
        {
          text: "Transforme au discours indirect : Il dit : « Je suis fatigué. »",
          correct: "Il dit qu'il était fatigué.",
          wrongs: ["Il dit : je suis fatigué.", "Il dit que je suis fatigué.", "Il dit être « fatigué »."],
          methode: "Au discours indirect, on change le pronom et le temps, sans guillemets.",
        },
        {
          text: "Quel verbe introducteur convient pour rapporter une question ?",
          correct: "demander",
          wrongs: ["affirmer", "conclure", "nier"],
          methode: "On choisit le verbe introducteur selon l'intention (demander pour une question).",
        },
      ],
      "3e": [
        {
          text: "Dans « Elle hésitait : partirait-elle vraiment ? », les pensées sont rapportées...",
          correct: "au discours indirect libre",
          wrongs: ["au discours direct avec guillemets", "sans aucune parole", "sous forme de dialogue"],
          methode: "Le discours indirect libre mêle la voix du personnage au récit, sans « qu' » ni guillemets.",
        },
      ],
    },
    level
  );
}

function discours_argumentatif(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Dans un texte argumentatif, la « thèse » est...",
        correct: "l'opinion principale que l'auteur défend",
        wrongs: ["un exemple précis", "une simple description", "la date de rédaction"],
        methode: "La thèse est le point de vue soutenu ; les arguments la justifient.",
      },
      {
        text: "Dans « Il faut protéger la forêt, car elle abrite mille espèces », quel est l'argument ?",
        correct: "elle abrite mille espèces",
        wrongs: ["il faut protéger la forêt", "la forêt est belle", "on aime se promener"],
        methode: "L'argument est la raison donnée pour soutenir la thèse.",
      },
      {
        text: "Dans une argumentation, un exemple sert à...",
        correct: "illustrer et rendre concret un argument",
        wrongs: ["contredire la thèse", "remplacer la conclusion", "compter les lignes"],
        methode: "L'exemple appuie l'argument en le rendant concret.",
      },
      {
        text: "Le connecteur « donc » sert à introduire...",
        correct: "une conséquence",
        wrongs: ["un exemple", "une opposition", "une cause"],
        methode: "« donc » relie une cause à sa conséquence.",
      },
      {
        text: "Le connecteur « car » sert à introduire...",
        correct: "une cause (une raison)",
        wrongs: ["une conséquence", "un exemple", "une opposition"],
        methode: "« car » donne la raison qui soutient l'argument.",
      },
    ],
    {
      "4e": [
        {
          text: "Quel connecteur logique introduit une opposition ?",
          correct: "cependant",
          wrongs: ["par exemple", "donc", "d'abord"],
          methode: "« cependant » oppose deux idées dans l'argumentation.",
        },
      ],
      "3e": [
        {
          text: "Dans un discours engagé, la question rhétorique (« Qui oserait accepter cela ? ») sert à...",
          correct: "faire réagir et emporter l'adhésion sans attendre de réponse",
          wrongs: ["demander une vraie information", "changer de sujet", "donner une consigne"],
          methode: "La question rhétorique est un procédé qui renforce l'argumentation.",
        },
        {
          text: "Pour réfuter la thèse adverse, on peut employer...",
          correct: "un argument opposé introduit par « pourtant » ou « au contraire »",
          wrongs: ["un simple « et »", "aucun connecteur", "une répétition du même mot"],
          methode: "On réfute en opposant un argument à celui de l'adversaire.",
        },
      ],
    },
    level
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONJUGAISON — identifier, composer, employer
// ─────────────────────────────────────────────────────────────────────────────

function conj_identifier(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Dans « Nous chanterons à la fête », à quel temps est le verbe ?",
        correct: "au futur",
        wrongs: ["au présent", "à l'imparfait", "au passé composé"],
        methode: "La marque « -r- » (chante-r-ons) signale le futur.",
      },
      {
        text: "Dans « vous finissiez », quel est le temps ?",
        correct: "l'imparfait",
        wrongs: ["le présent", "le futur", "le passé simple"],
        methode: "Les terminaisons « -iez » ici marquent l'imparfait.",
      },
      {
        text: "Dans « j'ai terminé mon travail », quel est le temps ?",
        correct: "le passé composé",
        wrongs: ["le présent", "l'imparfait", "le futur"],
        methode: "« ai + participe passé » forme le passé composé.",
      },
    ],
    {
      "5e": [
        {
          text: "Dans « il courut vers la sortie », à quel temps est le verbe ?",
          correct: "au passé simple",
          wrongs: ["à l'imparfait", "au présent", "au futur"],
          methode: "En 5e, on reconnaît le passé simple, temps du récit.",
        },
        {
          text: "Dans « Range ta chambre ! », à quel mode est le verbe ?",
          correct: "à l'impératif",
          wrongs: ["à l'indicatif", "au subjonctif", "au conditionnel"],
          methode: "L'impératif donne un ordre, sans sujet exprimé.",
        },
      ],
      "4e": [
        {
          text: "Dans « Il avait déjà compris avant qu'on parle », quel temps est « avait compris » ?",
          correct: "le plus-que-parfait",
          wrongs: ["le passé composé", "le présent", "le futur"],
          methode: "Le plus-que-parfait exprime une action antérieure à une autre action passée.",
        },
        {
          text: "Dans « Je voudrais te parler », quel est le mode et le temps de « voudrais » ?",
          correct: "le conditionnel présent",
          wrongs: ["l'indicatif futur", "l'impératif présent", "le subjonctif présent"],
          methode: "Le conditionnel présent exprime ici une demande polie.",
        },
      ],
      "3e": [
        {
          text: "Dans « Il faut que tu viennes », quel est le mode de « viennes » ?",
          correct: "le subjonctif",
          wrongs: ["l'indicatif", "le conditionnel", "l'impératif"],
          methode: "Après « il faut que », le verbe se met au subjonctif.",
        },
        {
          text: "Dans « J'aurais aimé rester », quel est le temps de « aurais aimé » ?",
          correct: "le conditionnel passé",
          wrongs: ["le plus-que-parfait", "le futur antérieur", "le passé composé"],
          methode: "Le conditionnel passé exprime un regret ou une action non réalisée.",
        },
      ],
    },
    level
  );
}

function conj_composer(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Choisis la forme correcte : « Autrefois, les chevaliers ___ dans des châteaux. » (imparfait de vivre)",
        correct: "vivaient",
        wrongs: ["vivent", "vivront", "vécurent"],
        methode: "À l'imparfait, « ils » donne « -aient » : vivaient.",
      },
      {
        text: "Choisis la forme correcte : « Elles ___ dans la forêt. » (passé composé de partir)",
        correct: "sont parties",
        wrongs: ["sont parti", "ont parties", "sont partir"],
        methode: "Avec « être », le participe s'accorde avec le sujet : parties.",
      },
      {
        text: "Choisis la forme correcte : « Demain, nous ___ à la mer. » (futur de aller)",
        correct: "irons",
        wrongs: ["allons", "allions", "irions"],
        methode: "Le futur de « aller » avec « nous » est « irons ».",
      },
      {
        text: "Choisis la forme correcte : « Hier, tu ___ ton exercice. » (passé composé de finir)",
        correct: "as fini",
        wrongs: ["a fini", "as finis", "es fini"],
        methode: "Passé composé avec « avoir » : « tu as fini ».",
      },
      {
        text: "Choisis la forme correcte : « Chaque matin, il ___ à l'aube. » (présent de se lever)",
        correct: "se lève",
        wrongs: ["se leve", "se lèves", "se lever"],
        methode: "Au présent, avec « il » : « il se lève » (accent grave).",
      },
    ],
    {
      "5e": [
        {
          text: "Choisis la forme correcte : « Soudain, il ___ la porte et sortit. » (passé simple d'ouvrir)",
          correct: "ouvrit",
          wrongs: ["ouvrait", "ouvre", "ouvrira"],
          methode: "Le passé simple raconte l'action soudaine : « il ouvrit ».",
        },
      ],
      "4e": [
        {
          text: "Choisis la forme correcte : « Quand il arriva, elle ___ déjà. » (plus-que-parfait de partir)",
          correct: "était déjà partie",
          wrongs: ["est déjà partie", "partait déjà", "partira déjà"],
          methode: "Le plus-que-parfait (« était partie ») marque l'action antérieure.",
        },
        {
          text: "Choisis la forme correcte : « Si j'avais le temps, je ___ ce livre. » (conditionnel présent de lire)",
          correct: "lirais",
          wrongs: ["lirai", "lisais", "lus"],
          methode: "Après « si + imparfait », la principale se met au conditionnel présent.",
        },
      ],
      "3e": [
        {
          text: "Choisis la forme correcte : « Je souhaite que tu ___ heureux. » (subjonctif présent d'être)",
          correct: "sois",
          wrongs: ["es", "seras", "serais"],
          methode: "Après « je souhaite que », on emploie le subjonctif : « que tu sois ».",
        },
        {
          text: "Choisis la forme correcte à la voix passive : « Le coupable ___ par la police. » (arrêter, passé composé)",
          correct: "a été arrêté",
          wrongs: ["a arrêté", "arrêtait", "arrêtera"],
          methode: "La voix passive se forme avec « être » conjugué + participe passé.",
        },
      ],
    },
    level
  );
}

function conj_employer(level: Cycle4Level): QcmItem[] {
  return byLevel(
    [
      {
        text: "Dans un récit au passé : « Il marchait tranquillement lorsqu'un cri ___. » Quelle forme convient ?",
        correct: "retentit (passé simple)",
        wrongs: ["retentira", "retentissait toujours", "retentit demain"],
        methode: "L'imparfait pose le décor, le passé simple dit l'action soudaine.",
      },
      {
        text: "Pour une vérité générale — « L'eau ___ à 100 degrés » — quel temps choisir ?",
        correct: "bout (présent)",
        wrongs: ["bouillait (imparfait)", "bouillira (futur)", "a bouilli (passé composé)"],
        methode: "Une vérité générale s'exprime au présent.",
      },
      // ⚠️ LA VALEUR DES TEMPS SE DEMANDE SUR UNE PHRASE, PAS DANS L'ABSTRAIT
      // (01/08). Ces trois questions demandaient « pour exprimer X, on
      // emploie… » — la leçon récitée à l'envers. Le cahier officiel de 5ᵉ
      // procède toujours autrement : il donne l'énoncé et demande ce que la
      // forme verbale VEUT DIRE.
      {
        text: "« Pourriez-vous fermer la fenêtre ? » Ici, le conditionnel sert à...",
        correct: "adoucir une demande",
        wrongs: [
          "situer l'action dans le passé",
          "annoncer un fait certain",
          "exprimer une impossibilité",
        ],
        methode:
          "Comparez avec « Fermez la fenêtre » : c'est le même ordre, rendu poli.",
      },
      {
        text: "« La nuit tombait doucement. Soudain, un cri déchira le silence. » Quel verbe marque l'action brusque ?",
        correct: "« déchira », au passé simple",
        wrongs: [
          "« tombait », à l'imparfait",
          "les deux à égalité",
          "aucun des deux : rien n'est brusque",
        ],
        methode:
          "L'imparfait installe le décor qui dure ; le passé simple fait surgir l'événement.",
      },
      {
        text: "« Demain, il pleuvra sur toute l'île. » Que dit ce temps du fait annoncé ?",
        correct: "il est présenté comme certain",
        wrongs: [
          "il est présenté comme douteux",
          "il a déjà eu lieu",
          "il dépend d'une condition",
        ],
        methode:
          "Le futur de l'indicatif affirme ; « il pleuvrait » laisserait planer un doute.",
      },
    ],
    {
      "5e": [
        {
          text: "« Le sentier montait entre les fougères. Les nuages s'accrochaient au sommet. » Pourquoi l'imparfait, ici ?",
          correct: "il installe un décor qui dure",
          wrongs: [
            "il marque une action brusque",
            "il annonce un fait à venir",
            "il donne un ordre",
          ],
          methode: "L'imparfait étire ; le passé simple découpe.",
        },
      ],
      "4e": [
        {
          text: "Pour exprimer un fait imaginaire soumis à une condition (« Si j'étais riche... »), on emploie ensuite...",
          correct: "le conditionnel présent",
          wrongs: ["l'impératif", "le passé simple", "le subjonctif imparfait"],
          methode: "« Si + imparfait » appelle le conditionnel présent dans la principale.",
        },
      ],
      "3e": [
        {
          text: "Après « Il est essentiel que... », on emploie...",
          correct: "le subjonctif",
          wrongs: ["l'indicatif futur", "le conditionnel", "l'impératif"],
          methode: "Une nécessité ou un souhait (« il est essentiel que ») commande le subjonctif.",
        },
        {
          text: "Pour mettre en avant l'action subie plutôt que celui qui la fait, on emploie...",
          correct: "la voix passive",
          wrongs: ["la voix active seule", "l'impératif", "le gérondif"],
          methode: "La voix passive met le sujet en position de subir l'action.",
        },
      ],
    },
    level
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Routage MICRO → pool, avec repli par notion
// ─────────────────────────────────────────────────────────────────────────────

const POOLS: Record<string, (level: Cycle4Level) => QcmItem[]> = {
  comp_sens_global,
  comp_indices,
  comp_implicite,
  comp_apprecier,
  voix_preparer,
  voix_expressive,
  voix_reciter,
  culture_genres,
  culture_contexte,
  culture_reseau,
  culture_trace,
  ecrit_notes,
  ecrit_invention,
  ecrit_reflexion,
  ecrit_reviser,
  oral_ecouter,
  oral_presenter,
  oral_argumenter,
  oral_jouer,
  voc_contexte,
  voc_relations,
  voc_formation,
  voc_reemploi,
  voc_orthographe,
  gram_constituants,
  gram_fonctions,
  gram_accords,
  gram_oral_ecrit,
  // La chaîne anaphorique (15/08). Sans ces trois lignes, les micros tombent
  // sur le repli `gram_fonctions` : des questions de fonction grammaticale
  // sous une étiquette d'anaphore, valides et hors sujet.
  gram_anaphore_pronom,
  gram_reprise_nominale,
  gram_chaine_reference,
  // Les quinze pools manquants (15/08, seconde passe) — mêmes raisons, même
  // panne muette. ⛔ Ne PAS ajouter `gram_cod_coi` ni `gram_attribut` : pour
  // elles, une question de fonction grammaticale est légitime.
  gram_ponctuation,
  gram_types_formes,
  gram_simple_complexe,
  gram_juxta_coord,
  gram_coordonnants,
  gram_gn_etendu,
  gram_prepositions,
  gram_determinant_pronom,
  gram_pronoms,
  orth_chaine_gn,
  orth_accord_attribut,
  orth_sujet_verbe_complexe,
  orth_participe_etre,
  orth_participe_avoir,
  orth_cod_coi_antepose,
  discours_registres,
  discours_rapportees,
  discours_argumentatif,
  conj_identifier,
  conj_composer,
  conj_employer,
};

/* ═════════════════════════════════════════════════════════════════════════
   LES QUINZE POOLS MANQUANTS (15/08/2026, seconde passe)
   ---------------------------------------------------------------------------
   ⛔ LE DÉFAUT, MESURÉ. Les douze micro-compétences de grammaire ouvertes le
   12/08 pour le nouveau BO, et les six d'orthographe grammaticale, n'avaient
   AUCUNE entrée dans `POOLS`. Elles recevaient donc le repli `gram_fonctions`
   sur environ la moitié de leurs tirages : « Dans « … », quelle est la
   fonction de ce groupe ? » posé sous « Expliquer le rôle d'un signe de
   ponctuation », sous « Accorder le participe passé employé avec être »…
   Des questions justes, hors sujet, et qu'aucun vérificateur ne sait voir.
   Relevé avant correction : `gram_simple_complexe` 60 %, `juxta_coord` 52 %,
   `coordonnants` 51 %, `ponctuation` 50 %, `pronoms` 50 %, `gn_etendu` 48 %,
   `prepositions` 47 %, `determinant_pronom` 46 %, `types_formes` 44 %, et les
   six orthographiques entre 46 et 54 %.

   ⛔ NE PAS AJOUTER `gram_fonctions`, `gram_cod_coi` NI `gram_attribut` ICI :
   pour elles, une question de fonction grammaticale est LÉGITIME. Le repli
   tombe juste, il n'y a rien à corriger. Mon premier relevé annonçait 19
   micros touchées en confondant les deux cas — vérifier le SENS, pas
   seulement la forme de l'énoncé.

   ⚠️ Ces pools servent aussi la 4ᵉ et la 3ᵉ si les mêmes micros y sont un
   jour déclarées (la clé est l'id SANS le préfixe de niveau). Le contenu est
   donc écrit pour rester juste au-delà de la 5ᵉ.
   ═══════════════════════════════════════════════════════════════════════ */

function gram_ponctuation(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "« Mon oncle, qui vit à Cilaos, arrive demain. »\n\nQue font les deux virgules ?",
      correct: "elles détachent un groupe qui donne une précision sur l'oncle",
      wrongs: [
        "elles séparent deux actions successives",
        "elles marquent une pause pour respirer",
        "elles annoncent une énumération",
      ],
      methode:
        "Retire le groupe encadré : la phrase tient encore debout. C'est le signe d'un détachement.",
    },
    {
      text: "« Il n'a pas répondu : il n'avait rien à dire. »\n\nQue fait le deux-points ?",
      correct: "il annonce l'explication de ce qui précède",
      wrongs: [
        "il annonce une énumération",
        "il introduit une parole rapportée",
        "il sépare deux phrases sans lien",
      ],
      methode:
        "Le deux-points fait trois choses : annoncer une liste, ouvrir une parole, ou expliquer. Ici on peut le remplacer par « car ».",
    },
    {
      text: "« Le vent se leva. Les volets claquèrent. »\n\nQuel effet produit le point entre les deux ?",
      correct: "il détache les deux faits et accélère le récit",
      wrongs: [
        "il montre que le second fait cause le premier",
        "il marque une hésitation du narrateur",
        "il indique que les faits sont simultanés",
      ],
      methode:
        "Comparer avec « Le vent se leva et les volets claquèrent » : le point coupe, la conjonction lie.",
    },
    {
      text: "« Elle prit son sac (celui du marché), ses clés et sortit. »\n\nQue font les parenthèses ?",
      correct: "elles ajoutent une précision secondaire",
      wrongs: [
        "elles rapportent des paroles",
        "elles indiquent une hésitation",
        "elles remplacent un mot oublié",
      ],
      methode:
        "Ce que contiennent les parenthèses peut disparaître sans que la phrase perde son sens principal.",
    },
    {
      text: "« Attention — le sol est glissant. »\n\nQue fait le tiret ?",
      correct: "il met en relief ce qui suit",
      wrongs: [
        "il indique un dialogue",
        "il sépare deux sujets différents",
        "il remplace une virgule sans rien changer",
      ],
      methode:
        "Le tiret unique jette la lumière sur la suite. Deux tirets, eux, encadrent comme des parenthèses.",
    },
    {
      text: "« Tu viens ? »\n\nQue nous apprend le point d'interrogation sur cette phrase ?",
      correct: "qu'elle est une question, alors que sa forme ressemble à une affirmation",
      wrongs: [
        "qu'elle exprime la surprise",
        "qu'elle donne un ordre",
        "qu'elle est incomplète",
      ],
      methode:
        "Sans le signe, « Tu viens » serait une déclaration. Ici la ponctuation change le type de la phrase à elle seule.",
    },
  ];
}

function gram_types_formes(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "« Ferme la fenêtre, s'il te plaît. »\n\nDe quel type est cette phrase ?",
      correct: "injonctive : elle donne un ordre ou une consigne",
      wrongs: [
        "déclarative : elle raconte un fait",
        "interrogative : elle pose une question",
        "exclamative : elle exprime un sentiment",
      ],
      methode:
        "« S'il te plaît » adoucit l'ordre, il ne le supprime pas : le verbe reste à l'impératif.",
    },
    {
      text: "« Quelle chaleur aujourd'hui ! »\n\nQuelle forme prend cette phrase ?",
      correct: "la forme exclamative",
      wrongs: [
        "la forme négative",
        "la forme interrogative",
        "la forme passive",
      ],
      methode:
        "Le type dit ce que fait la phrase, la forme dit comment elle le fait. Ici, l'exclamation.",
    },
    {
      text: "« Personne n'a rien vu. »\n\nQue peut-on dire de cette phrase ?",
      correct: "elle est déclarative et de forme négative",
      wrongs: [
        "elle est interrogative et négative",
        "elle est injonctive et négative",
        "elle est déclarative et affirmative",
      ],
      methode:
        "Une phrase a toujours UN type et peut prendre plusieurs formes. Le type ici est déclaratif.",
    },
    {
      text: "« Est-ce que tu ne viens pas ? »\n\nCette phrase est...",
      correct: "interrogative et négative à la fois",
      wrongs: [
        "interrogative seulement",
        "négative seulement",
        "injonctive et négative",
      ],
      methode:
        "Type et forme se cumulent : « est-ce que » donne le type, « ne… pas » la forme.",
    },
    {
      text: "« Comme il court vite ! »\n\nQu'exprime cette phrase ?",
      correct: "l'admiration ou la surprise, par une exclamation",
      wrongs: [
        "une question sur sa vitesse",
        "un ordre de courir",
        "une simple constatation neutre",
      ],
      methode:
        "« Comme » suivi d'un point d'exclamation n'introduit pas une comparaison : il exprime l'intensité.",
    },
    {
      text: "« N'oublie pas ton parapluie. »\n\nDe quel type et de quelle forme est cette phrase ?",
      correct: "injonctive et négative",
      wrongs: [
        "déclarative et négative",
        "interrogative et négative",
        "exclamative et affirmative",
      ],
      methode:
        "Le verbe est à l'impératif — donc injonctive — et encadré par « n'… pas » — donc négative.",
    },
  ];
}

function gram_simple_complexe(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "« Le facteur a sonné puis il est reparti. »\n\nCette phrase est...",
      correct: "complexe : elle contient deux verbes conjugués",
      wrongs: [
        "simple : elle ne raconte qu'un événement",
        "non verbale : elle n'a pas de verbe principal",
        "simple : « puis » n'est pas un verbe",
      ],
      methode:
        "On compte les verbes CONJUGUÉS, pas les actions ni les mots de liaison. Deux verbes, deux propositions.",
    },
    {
      text: "« Défense d'entrer. »\n\nComment appelle-t-on cette phrase ?",
      correct: "une phrase non verbale",
      wrongs: [
        "une phrase simple",
        "une phrase complexe",
        "une proposition subordonnée",
      ],
      methode:
        "Aucun verbe conjugué : la phrase existe pourtant, elle est simplement construite autour d'un nom.",
    },
    {
      text: "« Les élèves qui avaient terminé sont sortis. »\n\nCombien de propositions cette phrase contient-elle ?",
      correct: "deux",
      wrongs: ["une", "trois", "aucune"],
      methode:
        "« Avaient terminé » et « sont sortis » sont deux verbes conjugués : deux propositions.",
    },
    {
      text: "« Malgré la pluie, le match a eu lieu. »\n\nCette phrase est...",
      correct: "simple : elle n'a qu'un verbe conjugué",
      wrongs: [
        "complexe : elle contient deux idées",
        "complexe : « malgré » introduit une proposition",
        "non verbale",
      ],
      methode:
        "« Malgré la pluie » est un groupe, pas une proposition : il n'y a pas de verbe conjugué dedans.",
    },
    {
      text: "« Il pleut, la route est glissante, les voitures ralentissent. »\n\nCette phrase est complexe. Combien de propositions ?",
      correct: "trois",
      wrongs: ["une", "deux", "quatre"],
      methode:
        "Trois verbes conjugués — pleut, est, ralentissent — donc trois propositions, ici juxtaposées.",
    },
    {
      text: "« Quel silence dans la cour ! »\n\nCette phrase est...",
      correct: "non verbale, malgré son point d'exclamation",
      wrongs: [
        "simple, car elle contient un verbe sous-entendu",
        "complexe, car elle contient deux groupes",
        "interrogative",
      ],
      methode:
        "La ponctuation donne le type, pas la structure. Sans verbe conjugué, la phrase est non verbale.",
    },
  ];
}

function gram_juxta_coord(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "« Il ouvrit la porte, la referma aussitôt. »\n\nQu'exprime la juxtaposition par la virgule ?",
      correct: "la rapidité de l'enchaînement",
      wrongs: [
        "une opposition entre les deux gestes",
        "une cause et sa conséquence",
        "un choix entre deux possibilités",
      ],
      methode:
        "Comparer avec « puis il la referma » : la virgule seule serre les deux gestes l'un contre l'autre.",
    },
    {
      text: "« Il a plu toute la nuit, donc la rivière est haute. »\n\nQuel rapport la coordination établit-elle ?",
      correct: "une conséquence",
      wrongs: ["une opposition", "un choix", "une addition simple"],
      methode:
        "« Donc » relie une cause à son effet. C'est le mot coordonnant qui porte le rapport, pas les propositions.",
    },
    {
      text: "« Elle est fatiguée mais elle continue. »\n\nQuel rapport « mais » établit-il ?",
      correct: "une opposition",
      wrongs: ["une conséquence", "une cause", "une addition"],
      methode:
        "« Mais » annonce que la suite va contre ce qu'on attendait après la première proposition.",
    },
    {
      text: "« Le vent tombe : la mer se calme. »\n\nQu'exprime ici le deux-points entre deux propositions ?",
      correct: "une conséquence, sans mot de liaison",
      wrongs: [
        "une opposition",
        "une simple succession dans le temps",
        "une énumération",
      ],
      methode:
        "La juxtaposition peut porter un rapport logique : c'est au lecteur de le reconstituer.",
    },
    {
      text: "« Prends ton imperméable ou tu seras trempé. »\n\nQuel rapport « ou » établit-il ici ?",
      correct: "une alternative dont la seconde branche est une menace",
      wrongs: [
        "une addition de deux conseils",
        "une opposition entre deux avis",
        "une cause",
      ],
      methode:
        "« Ou » n'offre pas toujours un vrai choix : ici la seconde possibilité sert à convaincre.",
    },
    {
      text: "« Il travaille, il révise, il recommence. »\n\nQuel effet produit cette juxtaposition répétée ?",
      correct: "elle donne une impression d'accumulation et d'obstination",
      wrongs: [
        "elle marque une opposition entre les trois actions",
        "elle indique que les actions sont simultanées",
        "elle montre une hésitation",
      ],
      methode:
        "Trois propositions de même construction, sans liaison : le rythme lui-même produit le sens.",
    },
  ];
}

function gram_coordonnants(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "« Je n'ai pas répondu car je n'avais rien à dire. »\n\nQuel rapport « car » établit-il ?",
      correct: "une cause",
      wrongs: ["une conséquence", "une opposition", "un but"],
      methode:
        "« Car » introduit la raison de ce qui précède. « Donc » ferait l'inverse.",
    },
    {
      text: "« Il pleut, or le match est maintenu. »\n\nQuel rapport « or » établit-il ?",
      correct: "une opposition, en introduisant un fait inattendu",
      wrongs: ["une cause", "une conséquence", "une addition"],
      methode:
        "« Or » signale un élément qui contrarie ce qu'on attendait. Il est plus fort que « et », moins net que « mais ».",
    },
    {
      text: "« Elle chante et elle danse. »\n\nQuel rapport « et » établit-il ici ?",
      correct: "une addition",
      wrongs: ["une opposition", "une cause", "un choix"],
      methode:
        "« Et » ajoute. C'est le plus neutre des coordonnants — d'où l'intérêt de repérer quand un auteur en choisit un autre.",
    },
    {
      text: "« Il n'a ni téléphoné ni écrit. »\n\nQue fait « ni… ni » ?",
      correct: "il coordonne deux éléments en les niant tous les deux",
      wrongs: [
        "il exprime un choix entre deux actions",
        "il oppose deux comportements",
        "il indique une conséquence",
      ],
      methode:
        "« Ni » est le « et » de la phrase négative : il additionne des absences.",
    },
    {
      text: "Dans « Il est parti, cependant il reviendra », quel mot pourrait remplacer « cependant » sans changer le rapport ?",
      correct: "mais",
      wrongs: ["donc", "car", "et"],
      methode:
        "Tester le remplacement est la méthode la plus sûre : seul un coordonnant d'opposition convient.",
    },
    {
      text: "« Le colis est arrivé, donc la commande est complète. »\n\nSi l'on remplace « donc » par « car », que devient la phrase ?",
      correct: "le rapport s'inverse : la cause devient la conséquence",
      wrongs: [
        "la phrase garde exactement le même sens",
        "la phrase devient interrogative",
        "la phrase devient négative",
      ],
      methode:
        "Le coordonnant ne décore pas : changer de mot change ce que la phrase affirme.",
    },
  ];
}

function gram_gn_etendu(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "« la vieille case créole du bord de mer »\n\nQuel est le nom noyau de ce groupe nominal ?",
      correct: "case",
      wrongs: ["vieille", "créole", "mer"],
      methode:
        "Supprime tout ce qui peut disparaître : ce qui reste avec le déterminant est le noyau.",
    },
    {
      text: "« un chemin bordé de filaos »\n\nQuelle expansion complète le nom ?",
      correct: "« bordé de filaos », un participe employé comme adjectif",
      wrongs: [
        "« un », le déterminant",
        "« de filaos » seulement",
        "il n'y a pas d'expansion",
      ],
      methode:
        "L'expansion est tout ce qui s'ajoute au noyau. Ici elle est construite autour d'un participe passé.",
    },
    {
      text: "« le livre de ma sœur »\n\nDe quelle nature est l'expansion « de ma sœur » ?",
      correct: "un complément du nom",
      wrongs: [
        "un adjectif épithète",
        "une proposition relative",
        "un complément circonstanciel",
      ],
      methode:
        "Introduite par une préposition et construite autour d'un nom : c'est la marque du complément du nom.",
    },
    {
      text: "« les élèves qui ont terminé »\n\nQuelle est la nature de l'expansion ?",
      correct: "une proposition subordonnée relative",
      wrongs: [
        "un complément du nom",
        "un adjectif épithète",
        "un groupe nominal apposé",
      ],
      methode:
        "Un pronom relatif — qui, que, dont, où — et un verbe conjugué : c'est une relative.",
    },
    {
      text: "« des mangues »\n\nCe groupe nominal est-il minimal ou étendu ?",
      correct: "minimal : un déterminant et un nom, rien d'autre",
      wrongs: [
        "étendu, car « des » est une expansion",
        "étendu, car le nom est au pluriel",
        "ce n'est pas un groupe nominal",
      ],
      methode:
        "Le déterminant fait partie du groupe minimal ; il n'est pas une expansion.",
    },
    {
      text: "« un vieux volcan endormi depuis des siècles »\n\nCombien d'expansions le nom reçoit-il ?",
      correct: "trois : « vieux », « endormi », « depuis des siècles »",
      wrongs: [
        "une seule : « vieux »",
        "deux : « vieux » et « endormi »",
        "aucune",
      ],
      methode:
        "Chaque groupe supprimable sans détruire la phrase compte pour une expansion.",
    },
  ];
}

function gram_prepositions(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "« Il est parti sans son sac. »\n\nÀ quelle classe appartient « sans » ?",
      correct: "une préposition",
      wrongs: ["un adverbe", "une conjonction de coordination", "un déterminant"],
      methode:
        "Une préposition ne varie jamais et introduit toujours un groupe. Elle ne peut pas rester seule.",
    },
    {
      text: "« Elle marche lentement. »\n\nÀ quelle classe appartient « lentement » ?",
      correct: "un adverbe",
      wrongs: ["une préposition", "un adjectif", "un pronom"],
      methode:
        "L'adverbe modifie le verbe et se suffit à lui-même : rien ne le suit obligatoirement.",
    },
    {
      text: "« Je crois qu'il viendra. »\n\nQuel est le rôle de « que » ici ?",
      correct: "il subordonne : il rattache une proposition à une autre",
      wrongs: [
        "il coordonne deux propositions de même niveau",
        "il introduit un groupe nominal",
        "c'est un adverbe d'intensité",
      ],
      methode:
        "Un mot subordonnant crée une dépendance : la proposition qu'il introduit ne peut pas vivre seule.",
    },
    {
      text: "Dans « il est passé devant la mairie », quelle est la classe de « devant » ?",
      correct: "une préposition, car un groupe la suit",
      wrongs: [
        "un adverbe, car elle indique un lieu",
        "une conjonction",
        "un déterminant",
      ],
      methode:
        "Certains mots changent de classe selon l'emploi : « il est passé devant » sans suite serait un adverbe.",
    },
    {
      text: "« Il travaille pour réussir. »\n\nQue fait « pour » ?",
      correct: "il introduit un groupe qui exprime le but",
      wrongs: [
        "il coordonne deux verbes",
        "il exprime la cause",
        "il remplace un pronom",
      ],
      methode:
        "La préposition apporte le rapport de sens : « pour » le but, « à cause de » la cause, « malgré » l'opposition.",
    },
    {
      text: "Parmi ces mots, lequel n'est PAS une préposition ?",
      correct: "pourtant",
      wrongs: ["chez", "parmi", "malgré"],
      methode:
        "« Pourtant » ne peut pas introduire de groupe : c'est un adverbe qui relie des idées.",
    },
  ];
}

function gram_determinant_pronom(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "« Cette histoire m'a plu. J'ai aimé celle-là aussi. »\n\nQuel mot est un pronom ?",
      correct: "celle-là",
      wrongs: ["cette", "histoire", "aussi"],
      methode:
        "Le déterminant accompagne un nom, le pronom le remplace. « Cette » est suivi de « histoire », « celle-là » ne l'est pas.",
    },
    {
      text: "« Mon vélo est cassé, prends le mien. »\n\nQuelle est la classe de « mien » précédé de « le » ?",
      correct: "un pronom possessif",
      wrongs: [
        "un déterminant possessif",
        "un adjectif qualificatif",
        "un nom commun",
      ],
      methode:
        "« Mon » accompagne « vélo » : déterminant. « Le mien » remplace « mon vélo » : pronom.",
    },
    {
      text: "« Je les ai vus. »\n\nQuelle est la classe de « les » ?",
      correct: "un pronom personnel",
      wrongs: [
        "un déterminant défini",
        "un adverbe",
        "une préposition",
      ],
      methode:
        "Aucun nom ne suit : « les » remplace ici un groupe déjà nommé. Devant un nom, il serait déterminant.",
    },
    {
      text: "Dans « Quel livre lis-tu ? » et « Quel est ton avis ? », le mot « quel » est-il de la même classe ?",
      correct: "non : déterminant dans la première, pronom dans la seconde",
      wrongs: [
        "oui, déterminant dans les deux",
        "oui, pronom dans les deux",
        "non : adverbe puis déterminant",
      ],
      methode:
        "Un même mot change de classe selon qu'un nom le suit ou non. C'est l'emploi qui décide.",
    },
    {
      text: "« Plusieurs élèves sont absents. Plusieurs reviendront demain. »\n\nDans la seconde phrase, « plusieurs » est...",
      correct: "un pronom, car il ne s'appuie sur aucun nom exprimé",
      wrongs: [
        "un déterminant, comme dans la première phrase",
        "un adverbe de quantité",
        "un adjectif",
      ],
      methode:
        "Le test est toujours le même : cherche le nom. S'il n'y en a pas, le mot le remplace.",
    },
    {
      text: "« Ce sac est lourd. »\n\nQuelle est la classe de « ce » ?",
      correct: "un déterminant démonstratif",
      wrongs: [
        "un pronom démonstratif",
        "un pronom personnel",
        "une préposition",
      ],
      methode:
        "« Ce » précède « sac » : il l'accompagne. « Ceci », « celui-là » le remplaceraient.",
    },
  ];
}

function gram_pronoms(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "« Elle le lui a rendu. »\n\nCombien de pronoms personnels cette phrase contient-elle ?",
      correct: "trois",
      wrongs: ["un", "deux", "quatre"],
      methode:
        "« Elle », « le » et « lui » remplacent chacun un groupe : trois pronoms, trois éléments déjà connus.",
    },
    {
      text: "« Prends celui-ci, il est plus solide. »\n\nDe quelle sorte est le pronom « celui-ci » ?",
      correct: "démonstratif",
      wrongs: ["personnel", "possessif", "indéfini"],
      methode:
        "Les démonstratifs — celui, celle, ceci, cela — désignent en montrant, souvent le plus proche.",
    },
    {
      text: "« Chacun a rendu sa copie. »\n\nDe quelle sorte est « chacun » ?",
      correct: "indéfini",
      wrongs: ["personnel", "démonstratif", "possessif"],
      methode:
        "L'indéfini ne désigne personne en particulier : quelqu'un, chacun, tous, personne, rien.",
    },
    {
      text: "« Rien ne bougeait dans la cour. »\n\nQuelle est la fonction du pronom « rien » ?",
      correct: "sujet du verbe « bougeait »",
      wrongs: [
        "complément d'objet direct",
        "complément circonstanciel",
        "attribut du sujet",
      ],
      methode:
        "Un pronom occupe une fonction comme un nom. « Qui est-ce qui bougeait ? » — rien.",
    },
    {
      text: "« Nous nous sommes trompés. »\n\nQuel est le rôle du second « nous » ?",
      correct: "il est le pronom réfléchi du verbe pronominal",
      wrongs: [
        "il répète le sujet pour insister",
        "il est complément circonstanciel",
        "c'est une erreur de répétition",
      ],
      methode:
        "Dans un verbe pronominal, le second pronom fait corps avec le verbe : se tromper, nous nous trompons.",
    },
    {
      text: "« Les tiens sont rangés dans l'armoire. »\n\nDe quelle sorte est « les tiens » ?",
      correct: "possessif",
      wrongs: ["démonstratif", "indéfini", "relatif"],
      methode:
        "Le pronom possessif remplace un nom en indiquant à qui il appartient : le mien, le tien, les nôtres.",
    },
  ];
}

/* ═════════════════════════════════════════════════════════════════════════
   LA CHAÎNE ANAPHORIQUE (15/08/2026) — pools des trois micro-compétences
   ouvertes en 5ᵉ. Elles vivent ICI parce que `POOLS` est la seule table que
   `questionForMicro` consulte : une micro absente de cette table reçoit le
   repli `gram_fonctions`, c'est-à-dire des questions de fonction grammaticale
   sous une étiquette d'anaphore.
   ⚠️ MESURÉ AVANT CORRECTION : 540 questions sur 900 tombaient hors sujet.
   Les gabarits écrits à la main dans `5e/francais/anaphore.bank.ts` ne
   suffisent pas — le builder en produit trois de plus par micro, quoi qu'on
   fasse, et ce sont eux qui déraillaient.
   ⚠️ Les distracteurs sont TOUS des noms présents dans le passage : un piège
   pris hors du texte se repère sans le lire, et on mesurerait le hasard.
   ═══════════════════════════════════════════════════════════════════════ */

function gram_anaphore_pronom(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "« Le marchand rencontra un voyageur sur la route de Cilaos. Celui-ci portait un sac trop lourd pour lui. »\n\nQue reprend « Celui-ci » ?",
      correct: "le voyageur",
      wrongs: ["le marchand", "le sac", "la route"],
      methode:
        "« Celui-ci » désigne le plus proche des deux, celui qui vient d'être nommé.",
    },
    {
      text: "« Maëva tendit la lettre à sa grand-mère. Elle l'avait écrite la veille, sans rien dire à personne. »\n\nQue reprend « Elle » ?",
      correct: "Maëva",
      wrongs: ["sa grand-mère", "la lettre", "la veille"],
      methode:
        "« Sans rien dire à personne » ne peut se rapporter qu'à celle qui a écrit.",
    },
    {
      text: "« Les pêcheurs remontèrent les filets. Ils étaient déchirés en trois endroits. »\n\nQue reprend « Ils » ?",
      correct: "les filets",
      wrongs: ["les pêcheurs", "les endroits", "les bateaux"],
      methode:
        "Les deux candidats sont masculins pluriels : c'est le sens qui tranche, pas l'accord.",
    },
    {
      text: "« Le cyclone a traversé l'île en une nuit. Il a arraché les tôles du hangar. »\n\nQue reprend « Il » ?",
      correct: "le cyclone",
      wrongs: ["le hangar", "l'île", "la nuit"],
      methode: "Seul le cyclone peut arracher des tôles.",
    },
    {
      text: "« Ludovic prêta sa canne à son cousin. Il la lui rendit cassée le lendemain. »\n\nQue reprend « lui » ?",
      correct: "Ludovic",
      wrongs: ["son cousin", "la canne", "le lendemain"],
      methode:
        "« Il » est celui qui rend, « lui » celui à qui l'on rend : le propriétaire.",
    },
    {
      text: "« La directrice reçut les parents dans son bureau. Elle leur expliqua la décision du conseil. »\n\nQue reprend « leur » ?",
      correct: "les parents",
      wrongs: ["la directrice", "le bureau", "le conseil"],
      methode: "« Elle » parle, « leur » désigne ceux à qui elle parle.",
    },
    {
      text: "« Sarah a rangé les livres et les cahiers. Elle les a posés sur l'étagère du haut. »\n\nQue reprend « les » ?",
      correct: "les livres et les cahiers",
      wrongs: ["les livres seulement", "les cahiers seulement", "les étagères"],
      methode:
        "Rien dans la phrase ne sépare les deux : le pronom reprend l'ensemble.",
    },
  ];
}

function gram_reprise_nominale(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "« Un margouillat s'était glissé sous l'armoire. Le petit lézard ne bougeait plus. »\n\nQue désigne « Le petit lézard » ?",
      correct: "le margouillat",
      wrongs: ["l'armoire", "un autre animal", "la maison"],
      methode:
        "Le nom change, la bête non : un margouillat EST un lézard. C'est une reprise.",
    },
    {
      text: "« Le Piton de la Fournaise est entré en éruption mardi. Le volcan a rejeté de la lave pendant douze heures. »\n\nQue désigne « Le volcan » ?",
      correct: "le Piton de la Fournaise",
      wrongs: ["la lave", "un autre volcan", "l'éruption"],
      methode: "On reprend un nom propre par le nom commun qui dit ce qu'il est.",
    },
    {
      text: "« Madame Lucie soigne les plantes du quartier depuis quarante ans. La vieille dame connaît chaque feuille. »\n\nQue désigne « La vieille dame » ?",
      correct: "Madame Lucie",
      wrongs: ["une voisine", "les plantes", "le quartier"],
      methode:
        "La reprise ajoute une information — l'âge — sans changer de personne.",
    },
    {
      text: "« Un vieux camion s'est arrêté devant l'école. Le véhicule bloquait toute la rue. »\n\nQue désigne « Le véhicule » ?",
      correct: "le vieux camion",
      wrongs: ["l'école", "la rue", "un autre camion"],
      methode:
        "« Véhicule » est plus général que « camion » : la reprise la plus fréquente, et la moins vue.",
    },
    {
      text: "« Naïla a trouvé une carapace de tortue sur la plage. L'objet était plus léger qu'elle ne pensait. »\n\nQue désigne « L'objet » ?",
      correct: "la carapace",
      wrongs: ["la tortue", "la plage", "Naïla"],
      methode:
        "Une reprise très générale désigne le dernier élément dont on parlait.",
    },
    {
      text: "« Une odeur de vanille montait de la cuisine. Ce parfum réveilla toute la maison. »\n\nQue désigne « Ce parfum » ?",
      correct: "l'odeur de vanille",
      wrongs: ["la cuisine", "la maison", "la vanille seule"],
      methode:
        "Le déterminant démonstratif « ce » signale à lui seul qu'on reprend.",
    },
    {
      text: "« Les élèves ont préparé une exposition sur les baleines. Le travail a duré trois semaines. »\n\nQue désigne « Le travail » ?",
      correct: "la préparation de l'exposition",
      wrongs: ["les élèves", "les baleines", "les trois semaines"],
      methode:
        "Une reprise peut désigner une ACTION déjà racontée, pas seulement une chose.",
    },
  ];
}

function gram_chaine_reference(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "« Tante Aline a rapporté un poisson du marché. Elle l'a posé sur la table, puis elle est repartie. Quand elle est revenue, il avait disparu. Le chat dormait sous la véranda, l'air très satisfait. »\n\nDans « il avait disparu », de quoi parle-t-on ?",
      correct: "du poisson",
      wrongs: ["de tante Aline", "du chat", "du marché"],
      methode:
        "Le poisson est le seul masculin singulier repris depuis le début de la chaîne.",
    },
    {
      text: "« Le facteur a déposé un colis devant la porte. Le paquet est resté là toute la journée. Personne ne l'a vu, sauf le voisin, qui n'a rien dit. »\n\nCombien de mots différents désignent le colis ?",
      correct: "trois : « un colis », « le paquet », « l' »",
      wrongs: [
        "deux : « un colis » et « le paquet »",
        "un seul : « un colis »",
        "quatre, en comptant « le voisin »",
      ],
      methode:
        "Une chaîne se compte : le nom qui introduit, les reprises nominales, les pronoms.",
    },
    {
      text: "« Mon grand-père gardait une vieille montre dans un tiroir. L'objet ne marchait plus depuis longtemps. Il ne voulait pourtant pas s'en séparer. »\n\nQui est « il », et que désigne « en » ?",
      correct: "« il » = le grand-père, « en » = la montre",
      wrongs: [
        "« il » = la montre, « en » = le tiroir",
        "« il » = le tiroir, « en » = la montre",
        "« il » = le grand-père, « en » = le tiroir",
      ],
      methode:
        "Deux chaînes courent en parallèle. Seul un être humain peut « vouloir ».",
    },
    {
      text: "« Les pompiers sont arrivés les premiers. Ces hommes travaillaient depuis douze heures. Ils ont pourtant tenu jusqu'au matin. »\n\n« Ces hommes » et « Ils » désignent-ils la même chose ?",
      correct: "oui, les deux désignent les pompiers",
      wrongs: [
        "non, « ils » désigne d'autres secours",
        "non, « ces hommes » désigne des habitants",
        "on ne peut pas le savoir",
      ],
      methode:
        "Tant qu'aucun nouveau nom n'est introduit, la chaîne continue.",
    },
    {
      text: "« Sarah et Maëva ont monté la tente. Celle-ci s'est effondrée pendant la nuit. Elles ont dormi dans la voiture. »\n\nDans « Celle-ci s'est effondrée », de quoi parle-t-on ?",
      correct: "de la tente",
      wrongs: ["de Sarah", "de Maëva", "de la voiture"],
      methode:
        "« Celle-ci » est au singulier : il ne peut pas reprendre « Sarah et Maëva ».",
    },
    {
      text: "« Le boulanger prépare le pain dès quatre heures. Cet artisan travaille pendant que le quartier dort. Ses clients ne le voient jamais à l'œuvre. »\n\nQuelle expression NE désigne PAS le boulanger ?",
      correct: "« ses clients »",
      wrongs: ["« cet artisan »", "« le »", "« ses »"],
      methode:
        "« Ses » et « le » renvoient au boulanger, « cet artisan » le reprend.",
    },
  ];
}

/* ── ORTHOGRAPHE GRAMMATICALE : les six pools manquants ────────────────────
   ⛔ AUCUN ITEM NE DEMANDE DE RÉCITER UNE RÈGLE. On donne la phrase, l'élève
   choisit la forme et l'explication tient dans la méthode. C'est la
   différence entre savoir la règle et savoir accorder. */

function orth_chaine_gn(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "Choisis la forme correcte : « des histoires anciennes et ___ »",
      correct: "merveilleuses",
      wrongs: ["merveilleuse", "merveilleux", "merveilleuses-là"],
      methode:
        "Les deux adjectifs se rapportent au même nom féminin pluriel : ils prennent la même marque.",
    },
    {
      text: "Choisis la forme correcte : « les vieux murs ___ de la case »",
      correct: "blanchis",
      wrongs: ["blanchi", "blanchie", "blanchies"],
      methode:
        "Le participe employé comme adjectif s'accorde avec le nom : « murs » est masculin pluriel.",
    },
    {
      text: "Quel groupe nominal est correctement accordé ?",
      correct: "de longues journées ensoleillées",
      wrongs: [
        "de longue journées ensoleillées",
        "de longues journée ensoleillées",
        "de longues journées ensoleillée",
      ],
      methode:
        "La marque du pluriel court sur toute la chaîne : déterminant, adjectif, nom, second adjectif.",
    },
    {
      text: "Choisis la forme correcte : « une paire de gants ___ »",
      correct: "neufs",
      wrongs: ["neuf", "neuve", "neuves"],
      methode:
        "L'adjectif s'accorde avec ce qu'il qualifie vraiment : ce sont les gants qui sont neufs, pas la paire.",
    },
    {
      text: "Choisis la forme correcte : « des cheveux châtain ___ »",
      correct: "clair",
      wrongs: ["clairs", "claire", "claires"],
      methode:
        "Quand deux adjectifs de couleur se suivent pour n'en former qu'un, l'ensemble reste invariable.",
    },
    {
      text: "Choisis la forme correcte : « ces trois ___ chemins de montagne »",
      correct: "étroits",
      wrongs: ["étroit", "étroite", "étroites"],
      methode:
        "L'adjectif placé avant le nom s'accorde exactement comme celui placé après.",
    },
  ];
}

function orth_accord_attribut(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "Choisis la forme correcte : « Ces mangues semblent ___ »",
      correct: "mûres",
      wrongs: ["mûr", "mûre", "mûrs"],
      methode:
        "Après un verbe d'état — sembler, paraître, devenir — l'attribut s'accorde avec le sujet.",
    },
    {
      text: "Choisis la forme correcte : « Les élèves sont ___ de leur travail. »",
      correct: "fiers",
      wrongs: ["fier", "fière", "fières"],
      methode:
        "« Être » relie le sujet à son attribut : masculin pluriel, donc « fiers ».",
    },
    {
      text: "Dans « La nuit paraissait interminable », quel mot est attribut du sujet ?",
      correct: "interminable",
      wrongs: ["nuit", "paraissait", "la"],
      methode:
        "L'attribut dit ce qu'EST le sujet, à travers un verbe d'état. Il ne peut pas se déplacer.",
    },
    {
      text: "Choisis la forme correcte : « Cette histoire et ce film sont ___ »",
      correct: "passionnants",
      wrongs: ["passionnante", "passionnantes", "passionnant"],
      methode:
        "Deux sujets dont l'un est masculin : l'attribut se met au masculin pluriel.",
    },
    {
      text: "Choisis la forme correcte : « Elles sont restées ___ toute la soirée. »",
      correct: "silencieuses",
      wrongs: ["silencieux", "silencieuse", "silencieusement"],
      methode:
        "« Rester » est un verbe d'état : ce qui suit s'accorde. « Silencieusement » serait un adverbe, invariable.",
    },
    {
      text: "Pourquoi écrit-on « Ils ont l'air heureux » et non « heureuse » ?",
      correct: "parce que l'attribut s'accorde avec le sujet « ils »",
      wrongs: [
        "parce que « air » est masculin singulier",
        "parce que l'attribut est toujours invariable",
        "parce que « avoir » n'accorde jamais",
      ],
      methode:
        "« Avoir l'air » fonctionne comme « sembler » : l'accord se fait avec celui dont on parle.",
    },
  ];
}

function orth_sujet_verbe_complexe(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "Choisis la forme correcte : « Le panier de mangues ___ sur la table. »",
      correct: "est posé",
      wrongs: ["sont posés", "sont posé", "est posés"],
      methode:
        "Le sujet est « le panier », pas « mangues ». Le complément du nom n'accorde jamais le verbe.",
    },
    {
      text: "Choisis la forme correcte : « Sous les arbres ___ des bancs de bois. »",
      correct: "se trouvent",
      wrongs: ["se trouve", "se trouvait", "se trouvant"],
      methode:
        "Le sujet est inversé : cherche QUI fait l'action. Ce sont les bancs qui se trouvent.",
    },
    {
      text: "Choisis la forme correcte : « Ni Sarah ni Maëva n'___ répondu. »",
      correct: "ont",
      wrongs: ["a", "avaient répondues", "ont répondues"],
      methode:
        "Deux sujets coordonnés, même par « ni… ni » : le verbe se met au pluriel.",
    },
    {
      text: "Choisis la forme correcte : « La plupart des élèves ___ terminé. »",
      correct: "ont",
      wrongs: ["a", "avaient", "ayant"],
      methode:
        "Avec « la plupart de », l'accord se fait avec le complément : ce sont les élèves qui ont terminé.",
    },
    {
      text: "Choisis la forme correcte : « Les livres que tu m'as prêtés ___ passionnants. »",
      correct: "sont",
      wrongs: ["est", "était", "étant"],
      methode:
        "Une relative sépare le sujet de son verbe : retire-la pour retrouver « les livres… sont ».",
    },
    {
      text: "Choisis la forme correcte : « Toi et moi ___ raison. »",
      correct: "avons",
      wrongs: ["ont", "as", "a"],
      methode:
        "« Toi et moi » vaut « nous » : le verbe se met à la première personne du pluriel.",
    },
  ];
}

function orth_participe_etre(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "Choisis la forme correcte : « Elles sont ___ tôt ce matin. »",
      correct: "parties",
      wrongs: ["parti", "partis", "partie"],
      methode:
        "Avec « être », le participe passé s'accorde avec le sujet : féminin pluriel.",
    },
    {
      text: "Choisis la forme correcte : « Les volets ont été ___ par le vent. »",
      correct: "arrachés",
      wrongs: ["arraché", "arrachée", "arrachées"],
      methode:
        "Même à la voix passive, l'auxiliaire est « être » : l'accord se fait avec le sujet.",
    },
    {
      text: "Choisis la forme correcte : « Ma sœur et moi sommes ___ au marché. »",
      correct: "allés",
      wrongs: ["allé", "allée", "allées"],
      methode:
        "« Ma sœur et moi » vaut « nous ». Si le groupe comprend un masculin, l'accord est masculin pluriel.",
    },
    {
      text: "Choisis la forme correcte : « La lettre est ___ hier. »",
      correct: "arrivée",
      wrongs: ["arrivé", "arrivés", "arrivées"],
      methode:
        "Le sujet « la lettre » est féminin singulier : le participe prend un -e.",
    },
    {
      text: "Pourquoi écrit-on « Les fleurs sont fanées » avec un -s ?",
      correct: "parce que le participe s'accorde avec le sujet « les fleurs »",
      wrongs: [
        "parce que le verbe est au passé",
        "parce que « fanées » est un adjectif",
        "parce qu'il y a plusieurs verbes",
      ],
      methode:
        "Avec « être », on cherche le sujet, jamais le complément. La question est « qui est fané ? ».",
    },
    {
      text: "Choisis la forme correcte : « Nous nous sommes ___ à l'entrée. »",
      correct: "retrouvés",
      wrongs: ["retrouvé", "retrouvée", "retrouver"],
      methode:
        "Verbe pronominal construit avec « être » : l'accord se fait avec le sujet « nous ».",
    },
  ];
}

function orth_participe_avoir(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "Choisis la forme correcte : « Les photos que j'ai ___ sont floues. »",
      correct: "prises",
      wrongs: ["pris", "prise", "prit"],
      methode:
        "Avec « avoir », le participe s'accorde si le COD est placé AVANT. Ici « que » remplace « les photos ».",
    },
    {
      text: "Choisis la forme correcte : « J'ai ___ les photos hier. »",
      correct: "pris",
      wrongs: ["prises", "prise", "prit"],
      methode:
        "Même verbe, même COD — mais placé APRÈS le participe : pas d'accord.",
    },
    {
      text: "Choisis la forme correcte : « Cette chanson, je l'ai ___ cent fois. »",
      correct: "écoutée",
      wrongs: ["écouté", "écoutés", "écoutées"],
      methode:
        "Le pronom « l' » reprend « cette chanson » et se trouve avant le verbe : accord au féminin singulier.",
    },
    {
      text: "Choisis la forme correcte : « Les efforts qu'ils ont ___ ont payé. »",
      correct: "fournis",
      wrongs: ["fourni", "fournie", "fournies"],
      methode:
        "« Qu' » reprend « les efforts », masculin pluriel, et il précède le participe.",
    },
    {
      text: "Pourquoi écrit-on « Elle a mangé des mangues » sans accord ?",
      correct: "parce que le COD « des mangues » est placé après le participe",
      wrongs: [
        "parce que le sujet est féminin singulier",
        "parce que « manger » ne s'accorde jamais",
        "parce que « des » est un article indéfini",
      ],
      methode:
        "Avec « avoir », la position du COD décide seule. Le sujet n'entre jamais en compte.",
    },
    {
      text: "Choisis la forme correcte : « Quelle décision avez-vous ___ ? »",
      correct: "prise",
      wrongs: ["pris", "prises", "prendre"],
      methode:
        "« Quelle décision » est le COD, et la question le place avant le verbe : accord féminin singulier.",
    },
  ];
}

function orth_cod_coi_antepose(_level: Cycle4Level): QcmItem[] {
  return [
    {
      text: "Choisis la forme correcte : « Ces amies, je leur ai ___ hier. »",
      correct: "téléphoné",
      wrongs: ["téléphonées", "téléphonée", "téléphonés"],
      methode:
        "On téléphone À quelqu'un : « leur » est un COI, et un COI n'accorde jamais le participe.",
    },
    {
      text: "Choisis la forme correcte : « Les lettres que je lui ai ___ sont arrivées. »",
      correct: "écrites",
      wrongs: ["écrit", "écrite", "écrits"],
      methode:
        "Deux pronoms : « lui » est COI, mais « que » reprend « les lettres », qui est le COD antéposé. C'est lui qui commande.",
    },
    {
      text: "Pourquoi n'écrit-on pas « Je leur ai parlées » ?",
      correct: "parce que « leur » est un COI, et qu'un COI n'entraîne pas d'accord",
      wrongs: [
        "parce que « parler » est un verbe d'état",
        "parce que le sujet est masculin",
        "parce que le participe suit l'auxiliaire",
      ],
      methode:
        "Le test : peut-on dire « parler quelqu'un » ? Non — on parle À quelqu'un. Donc COI, donc pas d'accord.",
    },
    {
      text: "Choisis la forme correcte : « Ses parents, il les a ___ à la gare. »",
      correct: "attendus",
      wrongs: ["attendu", "attendue", "attendues"],
      methode:
        "On attend quelqu'un, sans préposition : « les » est un COD antéposé, l'accord se fait.",
    },
    {
      text: "Choisis la forme correcte : « Ces élèves, je leur ai ___ le devoir. »",
      correct: "rendu",
      wrongs: ["rendus", "rendue", "rendues"],
      methode:
        "Le COD est « le devoir », placé après. « Leur » n'est que le COI : aucun accord.",
    },
    {
      text: "Dans « Les nouvelles que je leur ai annoncées », avec quoi le participe s'accorde-t-il ?",
      correct: "avec « que », qui reprend « les nouvelles » et qui est COD",
      wrongs: [
        "avec « leur », qui est placé avant",
        "avec « je », le sujet",
        "avec rien : il reste invariable",
      ],
      methode:
        "Quand un COD et un COI précèdent tous deux le verbe, seul le COD compte.",
    },
  ];
}

// Repli par notion si un microId inattendu apparaît : on garde toujours un pool
// on-topic pour la notion (jamais de contenu hors sujet).
function poolForNotion(notionId: string, level: Cycle4Level): QcmItem[] {
  if (notionId.includes("lecture_voix")) return voix_expressive(level);
  if (notionId.includes("lecture_comprehension")) return comp_sens_global(level);
  if (notionId.includes("culture")) return culture_genres(level);
  if (notionId.includes("ecriture")) return ecrit_invention(level);
  if (notionId.includes("oral")) return oral_argumenter(level);
  if (notionId.includes("vocabulaire")) return voc_contexte(level);
  if (notionId.includes("analyse_discours")) return discours_registres(level);
  if (notionId.includes("conjugaison")) return conj_identifier(level);
  return gram_fonctions(level);
}

function questionForMicro(
  level: Cycle4Level,
  notionId: string,
  microId: string
): Generated {
  const key = microId.replace(/^(5e|4e|3e)_/, "");
  const build = POOLS[key];
  const pool = build ? build(level) : poolForNotion(notionId, level);
  return asQcm(pick(pool));
}

function makeTemplate(
  level: Cycle4Level,
  micro: MicroSkillSource,
  variant: 0 | 1
): TutorBankItemV4 {
  return {
    kind: "template",
    id: `${level}_${micro.id}_fr_cycle4_tpl_${variant + 1}`,
    niveau: level,
    matiere: "francais",
    notionId: micro.notionId,
    microId: micro.id,
    difficulty: variant === 0 ? 3 : 4,
    theme: "neutral",
    hint: micro.label,
    tags: [level, micro.notionId, micro.id, "cycle4", "francais", "template"],
    generate: () => questionForMicro(level, micro.notionId, micro.id),
  };
}

export function buildCycle4FrancaisBank(
  level: Cycle4Level,
  microSkills: readonly MicroSkillSource[]
): TutorBankItemV4[] {
  return microSkills.flatMap((micro) => [
    makeTemplate(level, micro, 0),
    makeTemplate(level, micro, 1),
    {
      ...makeTemplate(level, micro, 1),
      id: `${level}_${micro.id}_fr_cycle4_tpl_3_defi`,
      difficulty: 5,
      tags: [level, micro.notionId, micro.id, "cycle4", "francais", "template", "defi"],
    },
  ]);
}
