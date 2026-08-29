// ─── Fiche de cours : la morale, la poésie et le rapport aux autres (CM2) ─────
// SEPTIÈME FICHE DU CHANTIER CM2.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année ». Trois entrées :
// « Comprendre et interroger la morale », « Savourer le goût des mots, imaginer
// et créer en poésie », « Se découvrir, s'affirmer dans le rapport aux autres ».
//
// ⛔ UN SEUL RECOUVREMENT À SURVEILLER, ET IL EST RÉEL : le pool POESIE du cycle 3
// sert AUSSI la 6e (`6e_cult_poesie`, fiche `francais-6e-culture-poesie-theatre`).
// La séparation se fait sur les micros :
//   6e  → la FORME et les procédés nommés : vers, strophe, rime, image, écart.
//   CM2 → « savourer le GOÛT DES MOTS » et CRÉER : le plaisir du son et de ce
//         qu'ils évoquent, puis écrire « à la manière de ».
// ⚠️ Ne pas redescendre le vocabulaire technique de la 6e ici.
//
// ⭐⭐ LA DÉCOUVERTE QUI TIENT LES TROIS ENTRÉES : LA LITTÉRATURE DONNE DES MOTS
// LÀ OÙ ON N'EN AVAIT PAS. Le pool le dit d'un récit sur le harcèlement — il
// apporte « des mots pour comprendre une situation et pour en parler », et non
// des solutions toutes prêtes. Mais la formule vaut pour les trois : la morale
// donne des mots pour dire ce à quoi on tient, le conflit donne des mots pour
// dire ce à quoi tient l'autre, et la poésie donne le goût des mots eux-mêmes.
//
// ⭐⭐ ET LA PHRASE LA PLUS FORTE DU POOL, PARCE QU'ELLE DONNE UN DROIT :
// « INTERROGER LA MORALE », C'EST SE DEMANDER SI L'ON EST D'ACCORD, ET POURQUOI.
// Le BO demande d'interroger, PAS SEULEMENT de comprendre. C'est la seule entrée
// du programme où l'on autorise explicitement l'élève à n'être pas d'accord avec
// ce qu'un texte enseigne — à la condition de dire pourquoi. ⛔ Les trois leurres
// disent tous « comprendre » sous une forme ou une autre (chercher ce que
// l'auteur a voulu, l'apprendre par cœur, vérifier qu'elle découle du récit) : le
// pool oppose donc interroger à comprendre, délibérément.
//
// ⭐ ET LE DÉSACCORD EST UN RÉVÉLATEUR, PAS UN PROBLÈME À TRANCHER. Un conflit
// entre deux personnages ne sert pas à savoir lequel a raison : il sert à
// comprendre CE À QUOI CHACUN TIENT — c'est-à-dire ses valeurs. Interroger une
// morale et lire un conflit sont donc le même geste, l'un tourné vers soi,
// l'autre vers les personnages.
//
// ⭐ Deux formules courtes que le pool pose et qui valent d'être retenues telles
// quelles : « s'affirmer n'est pas s'imposer », et un personnage « se construit
// au fil de ses rencontres et de ses choix » — pas dès la première page.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools MORALE, POESIE et RAPPORT_AUTRES de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `culture_soi_et_les_autres`) :
// - cm2_cult_morale         → figure, propriétés 1 à 4, formule, méthode 1,
//                             usage 1, exemples 1 et 2
// - cm2_cult_poesie         → propriétés 5 et 6, méthode 2, usage 2, exemple 3
// - cm2_cult_rapport_autres → propriétés 7 à 9, méthodes 3 et 4, usages 3 et 4,
//                             exemples 4 et 5
// - cm2_cult_soi_defi       → propriété 10, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** Ce que change le fait d'avoir des mots. ⚠️ Cellules courtes : à la largeur
 *  d'un bloc, vingt signes tombent sous le plancher de 11 px. */
function grille(opts: {
  headers: string[];
  rows: { values: string[] }[];
  highlight?: { row?: number };
  caption?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        headers: opts.headers,
        rows: opts.rows,
        highlight: opts.highlight,
        caption: opts.caption,
        display: { compact: true, striped: true },
      }}
    />
  );
}

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Ce qui se dessine quand on reçoit des mots ───────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : interroger, et pas seulement comprendre.
const interrogerLaMorale = phrase({
  mots: [
    { texte: "comprendre" },
    { texte: "être d'accord ?", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "puis", type: "question" }],
  legende: "Le programme demande d'INTERROGER la morale — pas seulement de la comprendre.",
});

const donnerDesMots = phrase({
  mots: [
    { texte: "sans les mots" },
    { texte: "avec les mots", focus: true },
  ],
  legende: "La littérature donne des mots là où on n'en avait pas.",
});

const grilleDesMots = grille({
  headers: ["Sans les mots", "Avec les mots"],
  rows: [
    { values: ["on subit", "on comprend"] },
    { values: ["on se tait", "on en parle"] },
    { values: ["on croit unique", "on sait partagé"] },
    { values: ["on rumine", "on nomme"] },
  ],
  caption: "Ce que la lecture apporte n'est pas une solution : c'est un vocabulaire.",
});

// ── LA MORALE : ce qu'elle est, et le droit qu'on te donne.
const moralePasToujoursEcrite = phrase({
  mots: [
    { texte: "écrite à la fin" },
    { texte: "ou à déduire", focus: true },
  ],
  legende: "Ni toujours écrite, ni jamais : parfois il faut la chercher soi-même.",
});

const valeur = phrase({
  mots: [
    { texte: "la justice" },
    { texte: "la liberté" },
    { texte: "ce à quoi on tient", focus: true },
  ],
  liens: [
    { de: 0, vers: 2, label: "est", type: "question" },
    { de: 1, vers: 2, label: "aussi", type: "question" },
  ],
  legende: "Une valeur, c'est ce à quoi les personnages tiennent — et toi aussi.",
});

// ── LE RAPPORT AUX AUTRES : le désaccord révèle.
const conflitRevele = phrase({
  mots: [
    { texte: "qui a raison", barre: true },
    { texte: "à quoi ils tiennent", focus: true },
  ],
  legende: "Un conflit ne sert pas à trancher : il révèle les valeurs de chacun.",
});

const saffirmer = phrase({
  mots: [
    { texte: "s'imposer", barre: true },
    { texte: "s'affirmer", focus: true },
  ],
  legende: "Oser dire ce qu'on pense juste, même seul — ce n'est pas faire céder l'autre.",
});

const personnageSeConstruit = phrase({
  mots: [
    { texte: "dès la page 1", barre: true },
    { texte: "au fil des choix", focus: true },
  ],
  legende: "Un personnage se construit au fil de ses rencontres et de ses choix.",
});

const amitieTransforme = phrase({
  mots: [
    { texte: "une rencontre" },
    { texte: "il change", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "et", type: "question" }],
  legende: "L'amitié n'est pas là pour éviter le monologue : une rencontre transforme.",
});

// ── LA POÉSIE : le gout des mots, et créer.
const goutDesMots = phrase({
  mots: [
    { texte: "leur sens seul", barre: true },
    { texte: "leur son", focus: true },
  ],
  legende: "Savourer le gout des mots : leur son, leur rythme, ce qu'ils évoquent.",
});

const alaManiereDe = phrase({
  mots: [
    { texte: "copier le poème", barre: true },
    { texte: "reprendre la forme", focus: true },
  ],
  legende: "Écrire « à la manière de », c'est reprendre un procédé pour en faire un à soi.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCultureSoiEtLesAutresCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "culture-soi-et-les-autres",
  titre: "Morale, poésie et rapport aux autres en CM2 (2026-2027)",
  accroche:
    "Le programme te donne ici un droit rare : celui de NE PAS ÊTRE D'ACCORD. « Interroger la morale », c'est se demander si l'on est d'accord — et pourquoi. Pas seulement comprendre ce que la fable voulait dire : décider ce que TU en penses. Et pour cela il faut des mots ; c'est justement ce que la littérature donne, là où l'on n'en avait pas.",
  identite: [
    { label: "Mots clés", valeur: "Morale, valeur, conflit, s'affirmer, poésie" },
    { label: "Le secret", valeur: "La littérature donne des mots" },
    { label: "Outil", valeur: "Est-ce que je suis d'accord, et pourquoi ?" },
  ],
  definition: {
    texte:
      "LA MORALE d'une fable dit la leçon que l'histoire veut faire comprendre — elle condense en une phrase ce que le récit a montré. Elle n'est PAS toujours écrite : il faut parfois la déduire de ce qui arrive aux personnages. Et le programme demande davantage que de la comprendre : il demande de L'INTERROGER, c'est-à-dire de se demander si l'on est d'accord, et pourquoi. UNE VALEUR est ce à quoi les personnages tiennent — la justice, la tolérance, la liberté, le respect des différences. C'est pourquoi UN CONFLIT entre deux personnages ne sert pas à désigner celui qui a raison : il sert à comprendre ce à quoi chacun tient. S'AFFIRMER, pour un personnage, c'est oser dire ou faire ce qu'il pense juste, même seul — ce n'est pas imposer son avis. Et il ne se construit pas dès la première page : il se construit AU FIL DE SES RENCONTRES ET DE SES CHOIX. LA POÉSIE, enfin, apprend à SAVOURER LE GOÛT DES MOTS : prendre plaisir à leur son, à leur rythme, à ce qu'ils évoquent — puis à en écrire soi-même « à la manière de », en reprenant une forme pour en faire quelque chose de personnel.",
  },
  figure: {
    schema: pile(interrogerLaMorale, donnerDesMots),
    legende:
      "L'arc mène de « comprendre » à une question — et c'est un pas que l'école demande rarement aussi clairement. Comprendre une morale, c'est savoir ce que la fable a voulu dire ; l'interroger, c'est décider si tu es d'accord. Les trois mauvaises réponses du coach disent toutes « comprendre » sous une autre forme : chercher l'intention de l'auteur, l'apprendre par cœur, vérifier qu'elle découle du récit. Aucune ne te demande ton avis. En bas, ce qui rend ce droit utilisable : sans mots pour dire ce à quoi on tient, on ne peut ni être d'accord, ni ne pas l'être.",
  },
  proprietes: [
    {
      titre: "La morale dit la leçon que l'histoire a montrée",
      texte:
        "Elle condense en une phrase ce que le récit a mis en scène. Ce n'est ni un résumé, ni la suite, ni le nom de celui qui avait raison.",
      schema: moralePasToujoursEcrite,
      micros: ["cm2_cult_morale"],
    },
    {
      titre: "Elle n'est pas toujours écrite",
      texte:
        "Parfois il faut la déduire soi-même, en regardant ce qui arrive aux personnages. Ni toujours écrite, ni jamais : les deux existent.",
      schema: moralePasToujoursEcrite,
      micros: ["cm2_cult_morale"],
    },
    {
      titre: "Interroger, ce n'est pas comprendre",
      texte:
        "Se demander si l'on est d'accord, et pourquoi. Le programme demande ce pas-là, et il est rare qu'on te le demande aussi clairement.",
      schema: interrogerLaMorale,
      micros: ["cm2_cult_morale"],
    },
    {
      titre: "Une valeur est ce à quoi on tient",
      texte:
        "La justice, la tolérance, la liberté, le respect des différences. Ce n'est ni le prix du livre, ni le temps qu'il coute à lire.",
      schema: valeur,
      micros: ["cm2_cult_morale"],
    },
    {
      titre: "Savourer le gout des mots",
      texte:
        "Prendre plaisir à leur son, à leur rythme, à ce qu'ils évoquent — pas seulement chercher leur définition dans un dictionnaire.",
      schema: goutDesMots,
      micros: ["cm2_cult_poesie"],
    },
    {
      titre: "Écrire « à la manière de »",
      texte:
        "Reprendre la forme d'un poème ou son procédé, et y mettre son sujet à soi. Ce n'est pas copier : c'est ainsi qu'on apprend.",
      schema: alaManiereDe,
      micros: ["cm2_cult_poesie"],
    },
    {
      titre: "Un conflit révèle, il ne tranche pas",
      texte:
        "Il ne sert ni à savoir lequel a raison, ni à désigner le méchant : il sert à comprendre ce à quoi chacun tient.",
      schema: conflitRevele,
      micros: ["cm2_cult_rapport_autres"],
    },
    {
      titre: "S'affirmer n'est pas s'imposer",
      texte:
        "C'est oser dire ou faire ce qu'on pense juste, même seul. Ce n'est ni faire céder l'autre, ni prendre sa place.",
      schema: saffirmer,
      micros: ["cm2_cult_rapport_autres"],
    },
    {
      titre: "Un personnage se construit en chemin",
      texte:
        "Pas dès la première page, ni grâce au narrateur seul : au fil de ses rencontres et de ses choix. Une rencontre transforme.",
      schema: pile(personnageSeConstruit, amitieTransforme),
      micros: ["cm2_cult_rapport_autres"],
    },
    {
      titre: "Le défi : ce que la lecture apporte vraiment",
      texte:
        "Pas des solutions toutes prêtes, pas la certitude que cela n'arrive qu'aux autres : DES MOTS pour comprendre une situation et pour en parler.",
      schema: grilleDesMots,
      micros: ["cm2_cult_soi_defi"],
    },
  ],
  reel: {
    texte:
      "Tu as déjà eu à dire pourquoi tu n'étais pas d'accord, et tu as déjà senti la différence entre l'avoir sur le bout de la langue et pouvoir le dire. C'est exactement ce dont il s'agit ici. Quand tu dis « c'est pas juste », tu nommes une valeur — la justice — et à partir de là, on peut discuter. Sans ce mot, il ne reste que l'énervement, que personne ne peut examiner. Pareil pour un désaccord entre deux camarades : chercher qui a raison ne mène nulle part, mais demander à chacun ce qui compte pour lui débloque presque toujours. Et si tu as déjà lu un livre où quelqu'un vivait ce que tu vivais sans savoir le dire, tu sais ce que veut dire « la littérature donne des mots ».",
  },
  historique: {
    texte:
      "On voit très bien, sur un exemple récent, ce que « donner des mots » veut dire. Le harcèlement entre élèves a toujours existé, mais on ne l'appelait pas ainsi : on parlait d'histoires entre enfants, d'embêtements, de disputes qui passeraient. Le mot « harcèlement » ne s'est appliqué couramment à l'école en France qu'à partir des années 2010, et la loi en a fait un délit spécifique en 2022. Ce qui a changé n'est pas le fait — il était là avant — mais la possibilité de le nommer, donc de le signaler, donc d'agir. C'est ce que le programme attend d'un récit sur ce sujet : non pas des solutions toutes prêtes, mais des mots pour comprendre une situation et pour en parler.",
  },
  formule: {
    contexte: "La question que le programme demande de poser à toute morale.",
    expression: "est-ce que je suis d'accord, et pourquoi ?",
    legende:
      "Pas « qu'a voulu dire l'auteur » — cela s'appelle comprendre, et c'est l'étape d'avant. Interroger, c'est prendre position. Et le « pourquoi » est la moitié qui compte : un désaccord sans raison ne se discute pas, exactement comme un accord sans raison ne vaut rien.",
    schema: interrogerLaMorale,
  },
  methode: [
    {
      titre: "Chercher la morale, même si elle n'est pas écrite",
      texte:
        "Regarde ce qui arrive aux personnages à la fin, et qui l'a mérité selon le récit. La leçon est là, même sans phrase pour la dire.",
      schema: moralePasToujoursEcrite,
      micros: ["cm2_cult_morale"],
    },
    {
      titre: "Lire un poème à voix basse d'abord",
      texte:
        "Avant de chercher ce qu'il veut dire, écoute comment il sonne. C'est cela, savourer le gout des mots — et cela vient en premier.",
      schema: goutDesMots,
      micros: ["cm2_cult_poesie"],
    },
    {
      titre: "Demander à chacun ce qui compte pour lui",
      texte:
        "Devant un conflit, dans un texte ou dans la vie : pas « qui a raison » mais « à quoi tient chacun ». C'est la question qui débloque.",
      schema: conflitRevele,
      micros: ["cm2_cult_rapport_autres"],
    },
    {
      titre: "Comparer le personnage du début et celui de la fin",
      texte:
        "Ce qui a changé entre les deux vient de ses rencontres et de ses choix. C'est là que le récit dit quelque chose de lui.",
      schema: personnageSeConstruit,
      micros: ["cm2_cult_rapport_autres"],
    },
  ],
  usages: [
    {
      titre: "Pour discuter d'une fable en classe",
      detail:
        "Après avoir dit la morale, dis si tu es d'accord. C'est demandé, et c'est là que la discussion commence vraiment.",
      schema: interrogerLaMorale,
      micros: ["cm2_cult_morale"],
    },
    {
      titre: "Pour écrire un poème sans savoir par où commencer",
      detail:
        "Prends un poème que tu aimes, garde sa forme, change le sujet. « À la manière de » est une méthode, pas une triche.",
      schema: alaManiereDe,
      micros: ["cm2_cult_poesie"],
    },
    {
      titre: "Pour comprendre une dispute, dans un livre ou ailleurs",
      detail:
        "Chercher le coupable ne mène nulle part. Demander ce à quoi chacun tient fait apparaitre deux valeurs — et parfois elles sont compatibles.",
      schema: conflitRevele,
      micros: ["cm2_cult_rapport_autres"],
    },
    {
      titre: "Pour dire ce qu'un livre difficile t'a apporté",
      detail:
        "Souvent, ce n'est ni une leçon ni une solution : ce sont des mots pour une chose que tu ne savais pas nommer.",
      schema: grilleDesMots,
      micros: ["cm2_cult_soi_defi"],
    },
  ],
  exemples: [
    {
      titre: "Ce que dit une morale",
      donnees: "« À la fin d'une fable, la morale… »",
      schema: moralePasToujoursEcrite,
      question: "Que fait-elle ?",
      solution:
        "ELLE DIT LA LEÇON QUE L'HISTOIRE VEUT FAIRE COMPRENDRE. Ce n'est pas un résumé en deux vers, ce n'est pas ce qui arrivera ensuite aux personnages, et ce n'est pas le nom de celui qui avait raison. Elle condense en une phrase ce que le récit a MONTRÉ.",
      micros: ["cm2_cult_morale"],
    },
    {
      titre: "Interroger",
      donnees: "« Interroger la morale, cela veut dire… »",
      schema: interrogerLaMorale,
      question: "Cela veut dire quoi ?",
      solution:
        "SE DEMANDER SI L'ON EST D'ACCORD, ET POURQUOI. Regarde les trois autres réponses : chercher ce que l'auteur a voulu faire croire, l'apprendre par cœur, vérifier qu'elle découle de l'histoire. Toutes les trois sont des façons de COMPRENDRE — aucune ne te demande ton avis. Le programme demande le pas suivant.",
      micros: ["cm2_cult_morale"],
    },
    {
      titre: "Le gout des mots",
      donnees: "« Que veut dire savourer le gout des mots ? »",
      schema: goutDesMots,
      question: "Cela veut dire quoi ?",
      solution:
        "PRENDRE PLAISIR À LEUR SON, À LEUR RYTHME, À CE QU'ILS ÉVOQUENT. Pas apprendre leur définition exacte, pas en collectionner le plus possible, pas choisir toujours le mot le plus rare. C'est le titre même de cette entrée du programme, et c'est un plaisir avant d'être un savoir.",
      micros: ["cm2_cult_poesie"],
    },
    {
      titre: "Un conflit",
      donnees: "« Un conflit entre deux personnages permet… »",
      schema: conflitRevele,
      question: "Il permet quoi ?",
      solution:
        "DE COMPRENDRE CE À QUOI CHACUN TIENT. Pas de savoir lequel a raison, pas de désigner le méchant, pas de relancer le récit quand il ralentit. Le désaccord RÉVÈLE les valeurs de chacun — c'est même la manière la plus rapide de les découvrir.",
      micros: ["cm2_cult_rapport_autres"],
    },
    {
      titre: "S'affirmer",
      donnees: "« S'affirmer, pour un personnage, c'est… »",
      schema: saffirmer,
      question: "C'est quoi ?",
      solution:
        "OSER DIRE OU FAIRE CE QU'IL PENSE JUSTE, MÊME SEUL. Ce n'est ni imposer son avis jusqu'à ce que les autres cèdent, ni l'emporter sur celui qui lui tenait tête, ni prendre la place du chef. S'affirmer n'est pas s'imposer — et le « même seul » est la partie difficile.",
      micros: ["cm2_cult_rapport_autres"],
    },
    {
      titre: "Le défi",
      donnees: "« Que peut apporter la lecture d'un récit sur le harcèlement ? »",
      schema: grilleDesMots,
      question: "Qu'apporte-t-elle ?",
      solution:
        "DES MOTS POUR COMPRENDRE UNE SITUATION ET POUR EN PARLER. Pas des solutions toutes prêtes à appliquer, pas la certitude que cela n'arrive qu'aux autres, pas une liste de personnes à qui s'adresser. La littérature donne des mots là où l'on n'en avait pas — et avec des mots, on peut en parler.",
      micros: ["cm2_cult_soi_defi"],
    },
  ],
  pieges: [
    "Croire qu'une morale est toujours écrite : parfois il faut la déduire.",
    "Confondre comprendre une morale et l'interroger : le programme demande les deux.",
    "Donner son désaccord sans raison : c'est le « pourquoi » qui rend l'avis discutable.",
    "Chercher qui a raison dans un conflit : il révèle des valeurs, il ne tranche pas.",
    "Confondre s'affirmer et s'imposer : l'un ose, l'autre fait céder.",
    "Croire qu'un personnage est fixé dès la première page.",
    "Attendre d'un livre des solutions toutes prêtes : il donne des mots, c'est autre chose.",
  ],
  aRetenir: [
    "La littérature donne des mots là où on n'en avait pas.",
    "Interroger une morale, c'est se demander si l'on est d'accord — ET POURQUOI.",
    "Une valeur est ce à quoi on tient : justice, tolérance, liberté.",
    "Un conflit révèle les valeurs de chacun ; il ne dit pas qui a raison.",
    "S'affirmer n'est pas s'imposer, et un personnage se construit en chemin.",
  ],
  entrainement: [
    {
      question: "« La morale d'une fable est-elle toujours écrite ? »",
      correction: "Non : parfois il faut la déduire soi-même.",
      micros: ["cm2_cult_morale"],
    },
    {
      question: "« Une valeur, dans un récit, c'est… »",
      correction: "Ce à quoi les personnages tiennent : justice, tolérance, liberté.",
      micros: ["cm2_cult_morale"],
    },
    {
      question: "« Écrire un poème à la manière de, c'est… »",
      correction: "Reprendre sa forme ou son procédé pour en faire un à soi.",
      micros: ["cm2_cult_poesie"],
    },
    {
      question: "« Dans un récit, un personnage se construit surtout… »",
      correction: "Au fil de ses rencontres et de ses choix.",
      micros: ["cm2_cult_rapport_autres"],
    },
    {
      question: "« L'amitié, dans un roman, sert souvent à… »",
      correction: "Montrer comment un personnage change au contact d'un autre.",
      micros: ["cm2_cult_rapport_autres"],
    },
    {
      question: "Tu n'es pas d'accord avec la morale d'une fable. As-tu le droit ?",
      correction: "Oui — c'est même demandé, à condition de dire pourquoi.",
      micros: ["cm2_cult_soi_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesCultureSoiEtLesAutresCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Morale et rapport aux autres - CM2",
    section: {
      type: "objectif",
      phrase: "Tu as le droit de ne pas être d'accord",
      sousPhrase:
        "« Interroger la morale », c'est se demander si l'on est d'accord — et pourquoi.",
      encadre: {
        titre: "L'idée",
        texte: "Et pour cela il faut des mots : c'est ce que la littérature donne.",
      },
    },
  },
  {
    titre: "Comprendre, puis interroger",
    badge: "Morale et rapport aux autres - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Comprendre",
        contenu: "Savoir ce que la fable a voulu dire. C'est l'étape d'avant.",
      },
      droite: {
        titre: "Interroger",
        contenu: "Décider ce que TU en penses, et dire pourquoi. C'est ce qu'on demande.",
      },
    },
    schema: interrogerLaMorale,
  },
  {
    titre: "Le désaccord révèle",
    badge: "Morale et rapport aux autres - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Un conflit ne sert PAS à savoir lequel a raison.",
        "Il sert à comprendre CE À QUOI CHACUN TIENT.",
        "Et ce à quoi on tient s'appelle une VALEUR.",
        "Justice, tolérance, liberté, respect des différences.",
      ],
    },
    schema: conflitRevele,
  },
  {
    titre: "S'affirmer n'est pas s'imposer",
    badge: "Morale et rapport aux autres - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "S'affirmer", texte: "Oser dire ce qu'on pense juste, même seul." },
        { titre: "S'imposer", texte: "Faire céder l'autre. Ce n'est pas la même chose." },
        { titre: "Se construire", texte: "Au fil des rencontres et des choix, pas page 1." },
        { titre: "Une amitié", texte: "Une rencontre transforme celui qui la fait." },
      ],
    },
    schema: saffirmer,
  },
  {
    titre: "La poésie : le gout des mots",
    badge: "Morale et rapport aux autres - CM2",
    section: {
      type: "etapes",
      etapes: [
        "SAVOURER : leur son, leur rythme, ce qu'ils évoquent.",
        "Pas leur définition exacte, pas le mot le plus rare.",
        "Lis à voix basse AVANT de chercher ce que le poème veut dire.",
        "Puis écris « à la manière de » : garde la forme, change le sujet.",
      ],
    },
    schema: goutDesMots,
  },
  {
    titre: "À vous",
    badge: "Morale et rapport aux autres - CM2",
    section: {
      type: "exercice",
      enonce: "« Que peut apporter la lecture d'un récit sur le harcèlement ? »",
      question: "Qu'apporte-t-elle, et qu'est-ce qu'elle n'apporte pas ?",
      indice: "Ce n'est ni une solution, ni une garantie.",
      correction:
        "DES MOTS POUR COMPRENDRE UNE SITUATION ET POUR EN PARLER. Pas des solutions toutes prêtes, pas la certitude que cela n'arrive qu'aux autres. Avec des mots, on peut en parler — et sans, non.",
    },
    schema: grilleDesMots,
  },
];
