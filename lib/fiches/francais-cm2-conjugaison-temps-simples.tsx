// ─── Fiche de cours : les temps simples (CM2) ─────────────────────────────────
// PREMIÈRE FICHE DE CONJUGAISON DU CM2. La classe avait trois fiches de
// français, toutes de grammaire : ses DIX-SEPT micro-compétences de conjugaison
// n'en avaient aucune. Un élève de CM2 qui cliquait « présent », « imparfait »
// ou « futur » dans le coach ne trouvait rien à lire.
//
// ⭐ CE QUE LE BO DEMANDE AU CM2, ET QUI EST PLUS PRÉCIS QU'IL N'Y PARAÎT.
// « Conjugaisons à mémoriser et à maîtriser : […] des verbes être et avoir, des
// verbes des premier et deuxième groupes, des verbes irréguliers du troisième
// groupe : FAIRE, ALLER, DIRE, VENIR, POUVOIR, VOIR, VOULOIR, PRENDRE. » La
// liste est fermée : huit verbes irréguliers, pas neuf. La fiche s'y tient —
// faire, prendre — et prend ses réguliers dans la banque : finir, jouer.
//
// ⭐ POURQUOI LE MODE `tableau` PORTE CETTE FICHE-LÀ. Conjuguer, c'est voir ce
// qui bouge et ce qui ne bouge pas. Les six personnes empilées le montrent
// d'un coup d'œil : « jou- » identique sur six lignes, « finiss- » qui apparaît
// au pluriel, « faire » qui change trois fois. Une liste de formes écrite en
// ligne ne montrerait rien de tout cela.
//
// Alignée sur lib/tutor-v4/knowledge/francais/cm2/microSkills.ts
// (notionId `conjugaison_temps_simples`), sur les items cm2_fr_fixed_conj_1 à 4
// de lib/tutor-v4/questionBank/cm2/francais/fixed.bank.ts, et sur le moteur
// paramétrique conjugationEngine.ts (présent / imparfait / futur / infinitif).
//
// Micro-compétences couvertes (les 5 de la notion, défi compris) :
// - cm2_conj_infinitif_groupe → définition, figure, propriétés « L'infinitif »
//                               et « Les trois groupes », méthode 1, exemple 1
// - cm2_conj_present          → propriétés « Le présent » et « faire », usages,
//                               méthode 2, exemple 2, piège 1, entraînement 1
// - cm2_conj_imparfait        → propriété « L'imparfait », exemple 3,
//                               piège 2, entraînement 2
// - cm2_conj_futur            → propriété « Le futur », formule, méthode 3,
//                               exemple 4, piège 3, entraînement 3
// - cm2_conj_simples_defi     → le défi, dessiné (exemple 5), entraînements 4-5
//
// Les formes sont CELLES DE LA BANQUE : « Nous finissons notre travail »,
// « Nous faisons nos devoirs », « Nous jouions dans le jardin », « Demain, tu
// prendras tes clés », plus les verbes du moteur (punir, parler, grandir).
//
// ⚠️ Contrôle passé avant commit : REGLES.md § 2 quater — dessins rendus hors du
// site en 250 / 340 / 400 px, aucun texte sous 11 px, aucun texte hors cadre.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { ConjugaisonLigne, ConjugaisonSegment } from "@/lib/tutor-v4/types";

// Le helper commun aux fiches de conjugaison. Il n'écrit JAMAIS de couleur :
// `role: "personne"` suffit, et la palette du canvas fait le reste.
function train(opts: {
  infinitif?: string;
  pronom?: string;
  segments: ConjugaisonSegment[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "wagons",
        infinitif: opts.infinitif,
        pronom: opts.pronom,
        segments: opts.segments,
        legende: opts.legende,
      }}
    />
  );
}

function tableau(opts: { temps: string; lignes: ConjugaisonLigne[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "tableau",
        temps: opts.temps,
        lignes: opts.lignes,
        legende: opts.legende,
      }}
    />
  );
}

// Dans une carte, on EMPILE — jamais deux dessins côte à côte (REGLES § 2 ter).
function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les verbes de la banque, aux six personnes ───────────────────────────────

// LA FIGURE DE RÉFÉRENCE. « Nous finissons notre travail » est l'item fixe du
// CM2 sur l'infinitif : l'élève y retrouvera exactement sa question.
const tableauFinir = tableau({
  temps: "finir, au présent",
  lignes: [
    { pronom: "je", radical: "fin", terminaison: "is" },
    { pronom: "tu", radical: "fin", terminaison: "is" },
    { pronom: "il", radical: "fin", terminaison: "it" },
    { pronom: "nous", radical: "finiss", terminaison: "ons", alerte: true },
    { pronom: "vous", radical: "finiss", terminaison: "ez", alerte: true },
    { pronom: "ils", radical: "finiss", terminaison: "ent", alerte: true },
  ],
  legende: "Le 2e groupe ajoute « -iss- » au pluriel.",
});

const trainFinissons = train({
  infinitif: "finir",
  pronom: "nous",
  segments: [
    { texte: "finiss", role: "radical", note: "radical" },
    { texte: "ons", role: "personne", note: "nous" },
  ],
  legende: "L'infinitif se cache dans le radical.",
});

// FAIRE : le verbe irrégulier que le BO nomme, et le plus piégeux des huit.
const tableauFaire = tableau({
  temps: "faire, au présent",
  lignes: [
    { pronom: "je", radical: "fai", terminaison: "s" },
    { pronom: "tu", radical: "fai", terminaison: "s" },
    { pronom: "il", radical: "fai", terminaison: "t" },
    { pronom: "nous", radical: "fais", terminaison: "ons", alerte: true },
    { pronom: "vous", radical: "fai", terminaison: "tes", alerte: true },
    { pronom: "ils", radical: "f", terminaison: "ont", alerte: true },
  ],
  legende: "Trois surprises : faisons, faites, font.",
});

// L'IMPARFAIT, où RIEN ne bouge : c'est le contraste qui l'enseigne.
const tableauJouer = tableau({
  temps: "jouer, à l'imparfait",
  lignes: [
    { pronom: "je", radical: "jou", terminaison: "ais" },
    { pronom: "tu", radical: "jou", terminaison: "ais" },
    { pronom: "il", radical: "jou", terminaison: "ait" },
    { pronom: "nous", radical: "jou", terminaison: "ions" },
    { pronom: "vous", radical: "jou", terminaison: "iez" },
    { pronom: "ils", radical: "jou", terminaison: "aient" },
  ],
  legende: "Le radical ne bouge pas d'une ligne.",
});

const tableauPrendre = tableau({
  temps: "prendre, au futur",
  lignes: [
    { pronom: "je", radical: "prendr", terminaison: "ai" },
    { pronom: "tu", radical: "prendr", terminaison: "as" },
    { pronom: "il", radical: "prendr", terminaison: "a" },
    { pronom: "nous", radical: "prendr", terminaison: "ons" },
    { pronom: "vous", radical: "prendr", terminaison: "ez" },
    { pronom: "ils", radical: "prendr", terminaison: "ont" },
  ],
  legende: "Le radical finit par « r ».",
});

const trainPrendras = train({
  infinitif: "prendre",
  pronom: "tu",
  segments: [
    { texte: "prendr", role: "radical", note: "futur" },
    { texte: "as", role: "personne", note: "tu" },
  ],
  legende: "« Demain, tu prendras tes clés. »",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2), et il dit la méthode : au futur, on
// part de l'infinitif ENTIER — « punir » + « ai ».
const trainDefi = train({
  infinitif: "punir",
  pronom: "je",
  segments: [
    { texte: "punir", role: "radical", note: "infinitif" },
    { texte: "ai", role: "personne", note: "je" },
  ],
  legende: "Au futur, on part de l'infinitif entier.",
});

const pieges = [
  "Écrire « nous faisez » ou « vous faisez » : le verbe faire fait « nous faisons » et « vous faites ». C'est l'un des trois seuls verbes du français dont le « vous » se termine par « -tes ».",
  "Oublier le « i » de l'imparfait avec « nous » et « vous » : on écrit « nous jouions », « vous jouiez », même si on l'entend à peine. Au présent ce serait « nous jouons ».",
  "Croire que le futur s'écrit sans « r » : il en porte toujours un, juste avant la terminaison. « tu prendras », « je finirai », « nous jouerons ». Sans lui, on retombe au présent.",
  "Chercher le radical dans le pronom : dans « nous finissons », le radical est « finiss- », pas « nous » ni « -ons ». Le radical, c'est ce qu'on retrouve dans l'infinitif.",
];

const aRetenir = [
  "Un verbe conjugué se coupe en deux : le radical, qu'on retrouve dans l'infinitif, et la terminaison, qui change avec la personne.",
  "Au présent, les verbes du 2e groupe ajoutent « -iss- » au pluriel : nous finissons, vous finissez, ils finissent.",
  "Le futur porte toujours un « r » avant sa terminaison, et l'imparfait un « -ai- » ou un « -i- ».",
];

export const ficheConjugaisonTempsSimplesCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "conjugaison-temps-simples",
  titre: "Conjuguer au présent, à l'imparfait et au futur",
  accroche:
    "Regarde le verbe « jouer » à l'imparfait, aux six personnes : « jou- » revient six fois, à l'identique. Seule la fin change. Conjuguer, ce n'est pas apprendre six mots — c'est apprendre une fin, et savoir où la coller.",
  identite: [
    { label: "Mots clés", valeur: "Infinitif, groupe, radical, terminaison, présent, imparfait, futur" },
    { label: "Le secret", valeur: "Trouver ce qui ne bouge pas avant d'écrire ce qui change" },
    { label: "Outil", valeur: "Poser les six personnes l'une sous l'autre" },
  ],
  definition: {
    texte:
      "Conjuguer un verbe, c'est lui donner une forme qui dit QUAND l'action se passe et QUI la fait. On part de l'infinitif — la forme du dictionnaire, « finir », « jouer », « prendre » — et on le coupe en deux : le radical, qui porte le sens et qu'on retrouve dans l'infinitif, et la terminaison, qui change avec le temps et la personne. Les verbes se rangent en trois groupes : ceux en -er (1er groupe), ceux en -ir qui font « -issons » avec nous (2e groupe), et tous les autres (3e groupe).",
  },
  figure: {
    schema: tableauFinir,
    legende:
      "« finir » au présent, aux six personnes. Le radical est « fin- » au singulier, et « finiss- » au pluriel : c'est la marque du 2e groupe, et c'est même ainsi qu'on le reconnaît — un verbe en -ir qui fait « nous finissons » est du 2e groupe ; « nous partons » n'en est pas.",
  },
  proprietes: [
    {
      titre: "L'infinitif est la forme de départ",
      texte: "C'est le verbe non conjugué, celui du dictionnaire : finir, jouer, prendre.",
      schema: trainFinissons,
    },
    {
      titre: "Trois groupes, et un test",
      texte: "1er : en -er. 2e : en -ir qui fait « nous finissons ». 3e : tous les autres.",
      schema: tableauFinir,
    },
    {
      titre: "Le présent dit ce qui se passe maintenant",
      texte: "Il n'a pas de marque de temps : après le radical vient directement la personne.",
      schema: trainFinissons,
    },
    {
      titre: "Les irréguliers s'apprennent par cœur",
      texte: "Faire, aller, dire, venir, pouvoir, voir, vouloir, prendre : huit verbes à connaître.",
      schema: tableauFaire,
    },
    {
      titre: "L'imparfait dit ce qui durait",
      texte: "Son « -ai- » ou son « -i- » se glisse entre le radical et la personne, à toutes les lignes.",
      schema: tableauJouer,
    },
    {
      titre: "Le futur porte un « r »",
      texte: "Toujours, et dans tous les verbes : je finirai, tu prendras, nous jouerons.",
      schema: pile(tableauPrendre, trainPrendras),
    },
  ],
  reel: {
    texte:
      "Ces trois temps couvrent presque tout ce qu'on écrit dans une journée. Un message pour dire où l'on est : présent. Un souvenir de vacances : imparfait. Un projet pour samedi : futur. Le CM2 est l'année où l'on cesse de les deviner à l'oreille pour les écrire juste — et c'est ce qui change tout dans une rédaction, parce qu'une histoire dont les temps se mélangent devient illisible même quand elle est bien racontée.",
  },
  historique: {
    texte:
      "Sur les milliers de verbes du français, presque neuf sur dix appartiennent au 1er groupe, celui des verbes en -er. Et c'est le seul groupe qui grandisse encore : chaque fois qu'un mot nouveau devient un verbe, il y entre. « zapper », « scanner », « liker », « télétravailler » — aucun n'est allé rejoindre « prendre » ou « pouvoir ». Le 3e groupe, lui, ne recrute plus depuis des siècles : c'est un musée, et c'est pour cela qu'il est irrégulier.",
  },
  formule: {
    contexte: "Les trois temps simples, en une ligne.",
    expression: "radical + (marque de temps) + marque de personne",
    legende:
      "Au présent, il n'y a pas de marque de temps : « fin- » + « -is ». À l'imparfait, un « -ai- » ou un « -i- » s'intercale : « jou- » + « -ai- » + « -s ». Au futur, c'est un « r » : « prendr- » + « -as ». La marque de personne, elle, ferme toujours le mot.",
    schema: pile(tableauJouer, trainPrendras),
  },
  methode: [
    {
      titre: "Je cherche l'infinitif",
      texte: "Je dis « il faut… » devant le verbe : « il faut finir ». C'est là que je lis le groupe.",
      schema: trainFinissons,
    },
    {
      titre: "Je repère le radical",
      texte: "C'est le morceau qui revient d'une personne à l'autre. J'écris les six pour le voir.",
      schema: tableauJouer,
    },
    {
      titre: "J'ajoute la terminaison du temps",
      texte: "Un « r » pour le futur, un « -ai- » ou « -i- » pour l'imparfait, rien pour le présent.",
      schema: tableauPrendre,
    },
  ],
  usages: [
    {
      titre: "Le présent",
      detail: "« Nous faisons nos devoirs. » Ce qui se passe maintenant, ou ce qui est toujours vrai.",
      schema: tableauFaire,
    },
    {
      titre: "L'imparfait",
      detail: "« Nous jouions dans le jardin. » Ce qui durait, ou ce qui se répétait.",
      schema: tableauJouer,
    },
    {
      titre: "Le futur",
      detail: "« Demain, tu prendras tes clés. » Ce qui n'a pas encore eu lieu.",
      schema: trainPrendras,
    },
  ],
  exemples: [
    {
      titre: "Trouver l'infinitif et le groupe",
      donnees: "« Nous finissons notre travail. »",
      schema: pile(trainFinissons, tableauFinir),
      question: "Quel est l'infinitif du verbe, et à quel groupe appartient-il ?",
      solution:
        "L'infinitif est « finir ». C'est un verbe en -ir, et il fait « nous finissons » avec le « -iss- » : c'est donc le 2e groupe. Attention, tous les verbes en -ir n'en sont pas : « partir » fait « nous partons », sans « -iss- », et il est du 3e groupe.",
    },
    {
      titre: "Un irrégulier au présent",
      donnees: "« Nous ___ nos devoirs. » (faire, au présent)",
      schema: tableauFaire,
      question: "Écrit-on « faisons » ou « faisez » ?",
      solution:
        "« nous faisons ». Le verbe faire réserve trois surprises : « nous faisons », « vous faites » et « ils font ». Aucune ne suit la règle ordinaire — c'est pour cela qu'il est dans les huit verbes que le programme demande de mémoriser.",
    },
    {
      titre: "Le « i » de l'imparfait",
      donnees: "« Nous ___ dans le jardin. » (jouer, à l'imparfait)",
      schema: tableauJouer,
      question: "Écrit-on « jouons » ou « jouions » ?",
      solution:
        "« nous jouions ». Le radical est « jou- » et la terminaison de l'imparfait avec « nous » est « -ions ». Le « i » ne s'entend presque pas, mais il est la marque du temps : sans lui, « nous jouons » serait du présent. C'est le même « i » qui donne « vous jouiez ».",
    },
    {
      titre: "Le « r » du futur",
      donnees: "« Demain, tu ___ tes clés. » (prendre, au futur)",
      schema: pile(tableauPrendre, trainPrendras),
      question: "Quelle forme faut-il ?",
      solution:
        "« tu prendras ». Le mot « demain » annonce le futur, et le futur porte un « r » : le radical est « prendr- », la terminaison « -as » pour « tu ». « tu prends » serait le présent, « tu prenais » l'imparfait — ni l'un ni l'autre ne va avec « demain ».",
    },
    {
      titre: "Le défi",
      donnees: "« punir » au futur, avec « je »",
      schema: trainDefi,
      question: "Comment fabriquer la forme, sans l'avoir apprise ?",
      solution:
        "« je punirai ». Au futur, pour les verbes du 1er et du 2e groupe, le radical est l'INFINITIF ENTIER : « punir » + « -ai ». Le « r » est déjà là, il fait partie de l'infinitif. Même chose pour « je finirai », « tu joueras », « nous grandirons ».",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Nous ___ nos devoirs. » (faire, au présent)",
      correction:
        "« faisons ». Le verbe faire est irrégulier : nous faisons, vous faites, ils font. Ni « faisez », ni « faison ».",
    },
    {
      question: "« Nous ___ dans le jardin. » (jouer, à l'imparfait)",
      correction:
        "« jouions ». À l'imparfait avec « nous », la terminaison est « -ions ». Le « i » ne s'entend presque pas mais il est la marque du temps.",
    },
    {
      question: "« Demain, tu ___ tes clés. » (prendre, au futur)",
      correction:
        "« prendras ». Au futur, le radical « prendr- » porte le « r », et « -as » va avec « tu ».",
    },
    {
      question: "Quel est l'infinitif du verbe dans « Nous finissons notre travail » ?",
      correction:
        "« finir ». C'est la forme non conjuguée, celle du dictionnaire. Le « -iss- » du pluriel n'appartient pas à l'infinitif : il apparaît quand on conjugue.",
    },
    {
      question: "« grandir » au futur avec « ils » — quelle forme ?",
      correction:
        "« ils grandiront ». Au futur, le radical est l'infinitif entier : « grandir » + « -ont ». Le « r » est déjà dans l'infinitif, on n'en ajoute pas un second.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesConjugaisonTempsSimplesCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les temps simples - CM2",
    section: {
      type: "objectif",
      phrase: "Trouver ce qui ne bouge pas",
      sousPhrase:
        "Le radical revient d'une personne à l'autre ; seule la terminaison change. Conjuguer, c'est savoir laquelle coller.",
      encadre: {
        titre: "L'idée",
        texte: "On n'apprend pas six mots : on apprend une fin, et où la mettre.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Un message pour dire où l'on est : présent. Un souvenir de vacances : imparfait. Un projet pour samedi : futur. Une histoire dont les temps se mélangent devient illisible même quand elle est bien racontée.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Presque neuf verbes sur dix sont du 1er groupe, et c'est le seul groupe qui grandisse encore : « zapper », « scanner », « liker » y sont entrés. Le 3e groupe ne recrute plus depuis des siècles — c'est un musée, et c'est pour cela qu'il est irrégulier.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheConjugaisonTempsSimplesCm2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Le 2e groupe se reconnaît au pluriel",
    badge: "Les groupes",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on croit",
        contenu:
          "« Un verbe en -ir, c'est le 2e groupe. » Alors « partir », « venir » et « voir » y seraient — or ils n'y sont pas.",
      },
      droite: {
        variante: "ok",
        titre: "Le vrai test",
        contenu:
          "On met « nous ». « nous finissons » avec le « -iss- » → 2e groupe. « nous partons », sans lui → 3e groupe.",
      },
    },
  },
  {
    titre: "Chaque temps a sa marque",
    badge: "Présent, imparfait, futur",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Ce qui s'intercale",
        contenu:
          "Présent : rien. Imparfait : un « -ai- » ou un « -i- ». Futur : un « r ». La marque se glisse entre le radical et la personne.",
      },
      droite: {
        variante: "ok",
        titre: "Le « i » qu'on n'entend pas",
        contenu:
          "« nous jouions » à l'imparfait, « nous jouons » au présent. Un seul « i » sépare les deux, et il ne s'entend presque pas.",
      },
    },
  },
  {
    titre: "Fabriquer un futur",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« punir » au futur, avec « je »",
      question: "Comment fabriquer la forme sans l'avoir apprise ?",
      correction:
        "« je punirai ». Au futur, le radical est l'INFINITIF ENTIER : « punir » + « -ai ». Le « r » y est déjà, on n'en ajoute pas un second.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "Le défi",
    badge: "À toi de jouer",
    section: {
      type: "exercice",
      enonce: "« Demain, tu ___ tes clés. » (prendre)",
      question: "Quelle forme faut-il ?",
      indice: "« Demain » annonce quel temps ? Et ce temps porte quelle lettre ?",
      correction:
        "« tu prendras ». Le futur porte un « r » : radical « prendr- », terminaison « -as » pour « tu ».",
    },
  },
];
