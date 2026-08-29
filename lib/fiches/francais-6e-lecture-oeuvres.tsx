// ─── Fiche de cours : lire une œuvre et se l'approprier (6e) ──────────────────
// CINQUIÈME FICHE DE LECTURE DE LA 6e — ET ELLE FERME LE DOMAINE : fluence,
// voix haute, compréhension, reprises, documents, œuvres. Les six notions de
// lecture du BO6EFRL ont désormais leur fiche.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. ⛔ LA 6e FERME LE CYCLE 3 — elle ne suit PAS le cycle 4. Le
// texte chiffre lui-même la 6e : « trois œuvres du patrimoine en LECTURE
// INTÉGRALE et trois œuvres complètes en LECTURE CURSIVE ».
//
// ⛔ FRONTIÈRE VÉRIFIÉE AVANT D'ÉCRIRE, ET ELLE N'EST PAS OÙ ON L'ATTEND : LE
// CARNET DE LECTURE N'EST PAS ICI. `6e_culture_trace` appartient à
// `culture_reperes` (« Genres, contexte et carnet de lecture »), pas à
// `lecture_oeuvres`. Les deux notions tirent pourtant du MÊME pool OEUVRE, et
// ce pool contient des items de carnet : les prendre ici ferait deux fois la
// même fiche. Ce qui est ici : suivre une œuvre longue, la relier à soi, fonder
// une interprétation, en débattre.
//
// ⛔ ET LA NOTION VOISINE DE 5e, À NE PAS TRANSPOSER :
// `lecture_oeuvre_contextes` (cycle 4) travaille le PARCOURS du personnage, la
// comparaison des langages et le contexte de production. Rien de tout cela n'est
// au cycle 3.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE : C'EST LA SEULE NOTION DU PROGRAMME OÙ L'ON
// TE DEMANDE CE QUE TU RESSENS — ET IL Y A UNE SEULE CONDITION. Ici, « j'ai eu
// peur quand le loup est apparu » est une bonne réponse ; relier un récit d'exil
// au départ d'un proche est demandé par le texte officiel ; et deux élèves qui
// ne comprennent pas la fin de la même façon ont raison tous les deux. La
// condition, unique et non négociable : POUVOIR MONTRER LE PASSAGE. « Ce livre
// est nul » ne se discute pas ; « le héros a peur : au chapitre 3, il refuse
// d'entrer dans la grotte » se discute — et c'est exactement ce qui sépare un
// avis d'une humeur.
//
// ⭐ LE DÉSACCORD EST NORMAL, ET C'EST CE QUI REND LE DÉBAT POSSIBLE. Le pool le
// pose en toutes lettres : deux lectures différentes de la même fin, « normal :
// on en débat en s'appuyant sur le texte ». Un élève de 6e croit qu'il y a une
// réponse et qu'il l'a ratée. Dessiné par DEUX arcs qui partent de deux lectures
// et tombent sur le même passage.
//
// ⭐ ET LA TROISIÈME IDÉE, QUE PERSONNE NE DIT AUX ÉLÈVES : PERDRE LE FIL D'UNE
// ŒUVRE LONGUE EST UN PROBLÈME DE MÉMOIRE, PAS DE COURAGE. Vingt chapitres en
// trois semaines dépassent ce qu'on retient sans trace. Les remèdes du pool sont
// donc techniques et non moraux : une phrase par chapitre, un peu chaque jour,
// noter qui est ami, ennemi ou famille. ⛔ Et le pool donne aussi le faux
// remède — « lire la fin d'abord, pour savoir où l'on va » —, qui détruit
// exactement ce qu'on cherchait à sauver.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Et la bande `nature` est CENTRÉE SUR SON MOT : chaque mot
// doit être au moins aussi large que son étiquette (mesuré le 29/08).
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE : aucun titre, aucun auteur dans ce qui est
// demandé à l'élève — les œuvres sont choisies par le professeur, et un élève
// qui n'a pas lu celle-là doit pouvoir répondre.
//
// Alignée sur le pool OEUVRE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `6e_fr_fixed_oeuv_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `lecture_oeuvres`) :
// - 6e_oeuvre_integrale → propriétés 1 à 3, méthode 1, usage 1, exemples 1 et 2
// - 6e_oeuvre_relier    → propriétés 4 et 5, méthode 2, usage 2, exemple 3
// - 6e_oeuvre_fonder    → figure, propriétés 6 et 7, formule, méthode 3, usage 3,
//                         exemple 4
// - 6e_oeuvre_debattre  → propriétés 8 et 9, méthode 4, usage 4, exemple 5
// - 6e_oeuvre_defi      → propriété 10, exemple 6

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

/** Ce qui fait tenir une lecture longue. ⚠️ Cellules courtes : à la largeur d'un
 *  bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand un avis devient discutable ───────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : l'avis, et le passage qui le rend discutable.
const fonderSurUnPassage = phrase({
  mots: [
    { texte: "le héros a peur" },
    { texte: "chapitre 3", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "montré au", type: "question" }],
  legende: "Il refuse d'entrer dans la grotte : voilà ce qui rend l'avis discutable.",
});

const avisSansPassage = phrase({
  mots: [
    { texte: "« c'est nul »", barre: true },
    { texte: "un passage", focus: true },
  ],
  legende: "Un avis sans passage n'est pas un avis : c'est une humeur.",
});

// ⭐ LE DÉBAT DESSINÉ : deux lectures tombent sur le même passage.
const deuxLectures = phrase({
  mots: [
    { texte: "une lecture" },
    { texte: "la fin", focus: true },
    { texte: "une autre" },
  ],
  liens: [
    { de: 0, vers: 1, label: "s'appuie sur", type: "question" },
    { de: 2, vers: 1, label: "aussi", type: "question" },
  ],
  legende: "Deux élèves, deux lectures — et toutes deux montrent le même texte.",
});

// ⛔ « je ne suis pas d'accord » faisait vingt-trois signes, et le dessin
// tombait à 9,7 px dans une carte de méthode. Le plafond est bien de vingt.
const debattreEnMontrant = phrase({
  mots: [
    { texte: "pas d'accord" },
    { texte: "où le vois-tu ?", focus: true },
  ],
  legende: "La seule question qui fait avancer un débat sur un livre.",
});

// ── L'ŒUVRE LONGUE : un problème de mémoire, pas de courage.
const memoirePasCourage = phrase({
  mots: [
    { texte: "vingt chapitres" },
    { texte: "trois semaines" },
  ],
  legende: "Perdre le fil n'est pas un manque de volonté : c'est trop pour la mémoire.",
});

const grilleTenirLeFil = grille({
  headers: ["Ce que tu fais", "Ce que ça donne"],
  rows: [
    { values: ["une phrase", "le fil tient"] },
    { values: ["un peu par jour", "tu avances"] },
    { values: ["qui est qui", "tu t'y retrouves"] },
    { values: ["la fin d'abord", "tout est perdu"] },
  ],
  caption: "Trois remèdes, et un faux remède qui détruit la lecture.",
});

const grilleFauxRemede = grille({
  headers: ["Ce que tu fais", "Ce que ça donne"],
  rows: [
    { values: ["une phrase", "le fil tient"] },
    { values: ["un peu par jour", "tu avances"] },
    { values: ["qui est qui", "tu t'y retrouves"] },
    { values: ["la fin d'abord", "tout est perdu"] },
  ],
  highlight: { row: 3 },
  caption: "Lire la fin d'abord tue exactement ce qu'on voulait sauver.",
});

const integraleEtCursive = phrase({
  mots: [
    { texte: "intégrale", focus: true },
    { texte: "cursive", focus: true },
  ],
  legende: "Trois œuvres étudiées en entier, trois lues pour soi : le programme le chiffre.",
});

// ── RELIER : ce que tu as vécu éclaire ce que vit le personnage.
const relierASoi = phrase({
  mots: [
    { texte: "un récit d'exil" },
    { texte: "ce que tu as vécu", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "éclaire", type: "question" }],
  legende: "Le rapprochement ne prouve pas que le livre est vrai : il te fait entrer dedans.",
});

const evenementOuAvis = phrase({
  mots: [
    { texte: "le dragon s'envola", nature: "un évènement" },
    { texte: "j'ai adoré ce passage", nature: "un avis" },
  ],
  legende: "Les deux ont leur place — mais ce ne sont pas les mêmes phrases.",
});

// ── LE DÉFI : dire de mémoire ce qui a marqué.
const evocationSpontanee = phrase({
  mots: [
    { texte: "de mémoire", focus: true },
    { texte: "ce qui t'a marqué", focus: true },
  ],
  legende: "Ni la quatrième de couverture, ni le résumé : ce qui t'est resté.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureOeuvres6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "lecture-oeuvres",
  titre: "Lire une œuvre et se l'approprier en 6e (2026-2027)",
  accroche:
    "C'est le seul endroit du programme où l'on te demande ce que TU ressens. « J'ai eu peur quand le loup est apparu » est une bonne réponse. Relier un livre à ce que tu as vécu est demandé, pas toléré. Et deux élèves qui ne comprennent pas la fin de la même façon ont raison tous les deux. À une seule condition, la même partout : pouvoir montrer le passage.",
  identite: [
    { label: "Mots clés", valeur: "Intégrale, relier, fonder, débattre" },
    { label: "Le secret", valeur: "Ton avis compte si tu montres le passage" },
    { label: "Outil", valeur: "Où est-ce que tu le vois ?" },
  ],
  definition: {
    texte:
      "Le programme de 6e chiffre lui-même ce qu'il demande : TROIS ŒUVRES DU PATRIMOINE EN LECTURE INTÉGRALE — lues en entier et étudiées en classe — et TROIS ŒUVRES COMPLÈTES EN LECTURE CURSIVE, lues pour soi. Suivre une œuvre longue est d'abord un problème de MÉMOIRE : vingt chapitres en trois semaines dépassent ce qu'on retient, et l'on tient le fil en résumant chaque chapitre en une phrase, en lisant un peu chaque jour, en notant qui est ami, ennemi ou de la famille. Ensuite viennent trois gestes que cette notion est seule à demander. RELIER l'œuvre à ce qu'on a vécu et à ce qu'on sait : un récit d'exil éclairé par le départ d'un proche, ce n'est pas un hors-sujet, c'est ce qui donne accès aux émotions du personnage. FONDER son interprétation sur un passage précis : « le héros a peur » ne vaut rien seul, « au chapitre 3 il refuse d'entrer dans la grotte » vaut tout. DÉBATTRE enfin : plusieurs lectures d'une même fin sont possibles, et le désaccord est normal — à condition que chacun montre le texte.",
  },
  figure: {
    schema: pile(fonderSurUnPassage, avisSansPassage),
    legende:
      "L'arc part de ce qu'on affirme et pointe vers l'endroit du livre qui le montre. « Le héros a peur » n'est pas encore une interprétation : c'est une impression. Elle le devient au moment où l'on ajoute « au chapitre 3, il refuse d'entrer dans la grotte » — parce qu'à partir de là, quelqu'un peut être d'accord ou pas, et le dire. En bas, ce qui n'a pas d'arc : « c'est nul » ne se discute pas, ne se réfute pas, et ne s'améliore pas. Ce n'est pas un avis interdit, c'est un avis inutilisable.",
  },
  proprietes: [
    {
      titre: "Lire en entier : le programme le chiffre",
      texte:
        "Trois œuvres du patrimoine en lecture intégrale, trois œuvres complètes en lecture cursive. Intégrale veut dire en entier, pas le premier chapitre.",
      schema: integraleEtCursive,
      micros: ["6e_oeuvre_integrale"],
    },
    {
      titre: "Perdre le fil n'est pas un manque de courage",
      texte:
        "C'est un problème de mémoire. Vingt chapitres en trois semaines dépassent ce qu'on retient sans rien noter — et cela n'a rien à voir avec la volonté.",
      schema: memoirePasCourage,
      micros: ["6e_oeuvre_integrale"],
    },
    {
      titre: "Trois remèdes, et un faux",
      texte:
        "Une phrase par chapitre, un peu chaque jour, noter qui est qui. Lire la fin d'abord détruit exactement ce qu'on cherchait à sauver.",
      schema: grilleFauxRemede,
      micros: ["6e_oeuvre_integrale"],
    },
    {
      titre: "Relier le livre à ce que tu as vécu",
      texte:
        "Un récit d'exil et le départ d'un proche : le rapprochement t'aide à comprendre ce que vit le personnage. Le programme le demande.",
      schema: relierASoi,
      micros: ["6e_oeuvre_relier"],
    },
    {
      titre: "Mais cela ne prouve pas que le livre est vrai",
      texte:
        "Relier n'est pas confondre. Le rapprochement donne accès aux émotions ; il ne transforme pas une fiction en témoignage.",
      schema: evenementOuAvis,
      micros: ["6e_oeuvre_relier"],
    },
    {
      titre: "Un avis devient discutable quand il montre un passage",
      texte:
        "« Ce livre est nul » ne se discute pas. « Le héros a peur : au chapitre 3 il refuse d'entrer dans la grotte » se discute, et c'est là tout l'écart.",
      schema: fonderSurUnPassage,
      micros: ["6e_oeuvre_fonder"],
    },
    {
      titre: "Un évènement et un avis ne sont pas la même phrase",
      texte:
        "« Le dragon s'envola » raconte. « J'ai adoré ce passage » ressent. Les deux ont leur place, et il faut savoir laquelle on écrit.",
      schema: evenementOuAvis,
      micros: ["6e_oeuvre_fonder"],
    },
    {
      titre: "Deux lectures de la même fin sont possibles",
      texte:
        "Ce n'est ni impossible, ni la preuve que le livre est mal écrit : c'est normal, et l'on en débat en s'appuyant sur le texte.",
      schema: deuxLectures,
      micros: ["6e_oeuvre_debattre"],
    },
    {
      titre: "La question qui fait avancer un débat",
      texte:
        "« Où est-ce que tu le vois ? » Elle n'attaque personne, elle ramène au livre — et c'est la seule qui déplace vraiment un désaccord.",
      schema: debattreEnMontrant,
      micros: ["6e_oeuvre_debattre"],
    },
    {
      titre: "Le défi : dire de mémoire ce qui t'a marqué",
      texte:
        "Une évocation spontanée n'est ni la quatrième de couverture, ni le résumé, ni le nom de l'éditeur. C'est ce qui t'est resté.",
      schema: evocationSpontanee,
      micros: ["6e_oeuvre_defi"],
    },
  ],
  reel: {
    texte:
      "Tu tiens déjà ces débats, et exactement dans ces règles. Quand quelqu'un dit d'une série qu'elle est nulle, tu réponds « pourquoi ? » — tu réclames le passage. Quand deux personnes se disputent sur la fin d'un film et que l'une dit « mais non, il l'a dit au début », c'est un débat fondé : elle montre. Et quand tu abandonnes une série de vingt épisodes commencée il y a trois mois, ce n'est pas parce que tu manques de volonté : c'est que tu ne sais plus qui est qui. C'est le même problème de mémoire, et il a le même remède. La seule chose que l'école ajoute, c'est l'obligation de dire OÙ — page, chapitre, réplique. Ce n'est pas une formalité : c'est ce qui transforme une impression en quelque chose dont on peut parler à deux.",
  },
  historique: {
    texte:
      "Lire seul un livre de trois cents pages est une situation récente. Pendant des siècles, un roman se lisait à voix haute, le soir, devant plusieurs personnes — dans les veillées, les ateliers, les familles. Un chapitre par soirée, parfois moins, avec quelqu'un qui reprenait à voix haute où l'on en était resté et des auditeurs qui rappelaient qui était qui. Le groupe faisait la mémoire, et personne ne perdait le fil tout seul. Quand la lecture est devenue silencieuse et solitaire, ce travail est retombé sur un seul lecteur — et rien ne l'a remplacé. Ce que le programme demande aujourd'hui, résumer chaque chapitre en une phrase, n'est donc pas une corvée en plus : c'est la reconstitution, par écrit, de ce que faisait autrefois la personne assise à côté.",
  },
  formule: {
    contexte: "La question à se poser avant d'écrire un avis, et à poser à celui qui en donne un.",
    expression: "où est-ce que tu le vois ?",
    legende:
      "S'il y a un chapitre, une page, une réplique — ton avis tient, et quelqu'un peut te répondre. S'il n'y en a pas, tu n'as pas encore d'avis : tu as une impression, et une impression ne se partage pas. La même question vaut pour toi et pour celui qui te contredit.",
    schema: fonderSurUnPassage,
  },
  methode: [
    {
      titre: "Une phrase par chapitre, tout de suite",
      texte:
        "Pas à la fin du livre — en fermant le chapitre. Vingt phrases au bout du compte, et l'œuvre entière tient sur une page.",
      schema: grilleTenirLeFil,
      micros: ["6e_oeuvre_integrale"],
    },
    {
      titre: "Se demander ce que ça te rappelle",
      texte:
        "Un départ, une injustice, une peur : cherche ce que tu connais de semblable. C'est la porte d'entrée dans les émotions du personnage.",
      schema: relierASoi,
      micros: ["6e_oeuvre_relier"],
    },
    {
      titre: "Ajouter le « au chapitre… » avant de rendre",
      texte:
        "Relis chacune de tes phrases d'avis. Si aucune ne cite d'endroit, aucune ne vaut de point — et la réparation prend dix secondes.",
      schema: avisSansPassage,
      micros: ["6e_oeuvre_fonder"],
    },
    {
      titre: "Répondre à un désaccord par une question",
      texte:
        "« Où est-ce que tu le vois ? » plutôt que « tu as tort ». On revient au livre, et l'un des deux trouve — parfois l'autre.",
      schema: debattreEnMontrant,
      micros: ["6e_oeuvre_debattre"],
    },
  ],
  usages: [
    {
      titre: "Pour finir un livre long sans abandonner",
      detail:
        "Un peu chaque jour vaut mieux qu'une longue séance le dimanche : ce qui tue une lecture longue, c'est l'écart entre deux séances, pas leur durée.",
      schema: memoirePasCourage,
      micros: ["6e_oeuvre_integrale"],
    },
    {
      titre: "Pour entrer dans un personnage qui te semble loin",
      detail:
        "Cherche l'émotion, pas la situation. Tu n'as jamais quitté ton pays — tu as déjà quitté quelque chose, et c'est par là qu'on entre.",
      schema: relierASoi,
      micros: ["6e_oeuvre_relier"],
    },
    {
      titre: "Pour écrire un avis qui rapporte des points",
      detail:
        "Une phrase d'avis, une phrase de preuve. C'est le rythme le plus simple, et il fonctionne du CM2 au lycée.",
      schema: fonderSurUnPassage,
      micros: ["6e_oeuvre_fonder"],
    },
    {
      titre: "Pour un débat de classe sur une œuvre",
      detail:
        "Personne n'a à convaincre : chacun montre son passage. À la fin, on n'est pas forcément d'accord, et le livre est mieux compris.",
      schema: deuxLectures,
      micros: ["6e_oeuvre_debattre"],
    },
  ],
  exemples: [
    {
      titre: "Lire en entier",
      donnees: "« Lire une œuvre en lecture intégrale, c'est… »",
      schema: integraleEtCursive,
      question: "Que veut dire « intégrale » ?",
      solution:
        "LIRE L'ŒUVRE ENTIÈRE. Ni le premier chapitre, ni le résumé, ni l'adaptation en film. Le programme en demande trois par an, plus trois œuvres en lecture cursive — celles qu'on lit pour soi, sans les étudier en classe.",
      micros: ["6e_oeuvre_integrale"],
    },
    {
      titre: "Ne pas perdre le fil",
      donnees: "« Pour ne pas perdre le fil d'une histoire longue, on peut… »",
      schema: grilleFauxRemede,
      question: "Que fais-tu ?",
      solution:
        "RÉSUMER CHAQUE CHAPITRE EN UNE PHRASE. Relire le chapitre précédent avant chaque séance coute trop cher pour ce que ça rapporte ; noter tous les noms produit une liste qu'on ne relit pas. Et lire la fin d'abord supprime justement ce qu'on voulait garder : l'envie de continuer.",
      micros: ["6e_oeuvre_integrale"],
    },
    {
      titre: "Relier à soi",
      donnees: "« Tu lis un récit d'exil et tu penses au départ d'un proche. »",
      schema: relierASoi,
      question: "Ce rapprochement, qu'est-ce qu'il apporte ?",
      solution:
        "IL T'AIDE À COMPRENDRE CE QUE VIT LE PERSONNAGE. Ce n'est ni un hors-sujet, ni une preuve que le livre est vrai, ni un remplacement de la lecture : c'est une porte d'entrée dans une émotion que tu connais déjà. Le programme le demande explicitement.",
      micros: ["6e_oeuvre_relier"],
    },
    {
      titre: "Une interprétation fondée",
      donnees: "« Laquelle de ces phrases FONDE une interprétation sur l'œuvre ? »",
      schema: fonderSurUnPassage,
      question: "Laquelle ?",
      solution:
        "« LE HÉROS A PEUR : AU CHAPITRE 3, IL REFUSE D'ENTRER DANS LA GROTTE. » « Ce livre est nul » ne montre rien ; « ma sœur l'a lu aussi » et « il y a 210 pages » sont vrais et ne disent rien du livre. Fonder, c'est appuyer sur un passage qu'on peut montrer.",
      micros: ["6e_oeuvre_fonder"],
    },
    {
      titre: "Un désaccord",
      donnees: "« Deux élèves n'ont pas compris la fin du roman de la même façon. »",
      schema: deuxLectures,
      question: "Qu'est-ce que cela veut dire ?",
      solution:
        "C'EST NORMAL : ON EN DÉBAT EN S'APPUYANT SUR LE TEXTE. Ce n'est pas impossible — une fin peut se lire de plusieurs façons ; ce n'est pas la preuve que le livre est mal écrit — c'est souvent le contraire. Le programme demande de « confronter ses jugements », pas de trouver LA réponse.",
      micros: ["6e_oeuvre_debattre"],
    },
    {
      titre: "Le défi",
      donnees: "« On te demande une évocation spontanée d'un livre lu. »",
      schema: evocationSpontanee,
      question: "Que fais-tu ?",
      solution:
        "TU RACONTES DE MÉMOIRE CE QUI T'A MARQUÉ. Pas la quatrième de couverture, pas le premier chapitre lu à voix haute, pas le nom de l'éditeur. Ce qui t'est resté trois semaines après — et le fait que ce soit court n'est pas un problème : c'est le signe que c'est vraiment resté.",
      micros: ["6e_oeuvre_defi"],
    },
  ],
  pieges: [
    "Croire qu'abandonner un livre long est un manque de volonté : c'est un problème de mémoire, et il a des remèdes.",
    "Lire la fin d'abord pour savoir où l'on va : cela supprime l'envie de continuer.",
    "Croire que relier un livre à sa vie est un hors-sujet : le programme le demande.",
    "Confondre relier et confondre : un rapprochement ne rend pas une fiction vraie.",
    "Donner un avis sans montrer de passage : « c'est nul » ne se discute pas.",
    "Croire qu'un désaccord sur une fin veut dire que l'un des deux s'est trompé.",
    "Réciter la quatrième de couverture au lieu de dire ce qui t'a marqué.",
  ],
  aRetenir: [
    "Trois œuvres en lecture intégrale, trois en lecture cursive : le programme le chiffre.",
    "Perdre le fil est un problème de mémoire — une phrase par chapitre y suffit.",
    "Relier le livre à ce que tu as vécu est demandé, pas toléré.",
    "Un avis ne vaut que s'il montre un passage : « où est-ce que tu le vois ? »",
    "Deux lectures d'une même fin sont normales, et l'on en débat par le texte.",
  ],
  entrainement: [
    {
      question: "« Pour s'engager dans une lecture longue, le mieux est de… »",
      correction: "Lire un peu chaque jour et garder le fil.",
      micros: ["6e_oeuvre_integrale"],
    },
    {
      question: "« Pour comprendre les liens entre les personnages, il est utile de… »",
      correction: "Noter qui est ami, ennemi ou de la famille.",
      micros: ["6e_oeuvre_integrale"],
    },
    {
      question: "« Quelle phrase exprime une réaction personnelle de lecteur ? »",
      correction: "« J'ai eu peur quand le loup est apparu. »",
      micros: ["6e_oeuvre_relier"],
    },
    {
      question: "« Quelle phrase raconte un évènement de l'histoire, et non un avis ? »",
      correction: "« Le dragon s'envola au-dessus du château. »",
      micros: ["6e_oeuvre_fonder"],
    },
    {
      question: "« Pour partager un livre qu'on a aimé, une bonne idée est de… »",
      correction: "Le conseiller à un camarade en disant pourquoi.",
      micros: ["6e_oeuvre_debattre"],
    },
    {
      question: "« Pour comparer deux personnages, on peut noter… »",
      correction: "Ce qu'ils font et ce qu'ils ressentent.",
      micros: ["6e_oeuvre_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesLectureOeuvres6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire une œuvre - 6e",
    section: {
      type: "objectif",
      phrase: "Ton avis compte si tu montres le passage",
      sousPhrase:
        "C'est le seul endroit du programme où l'on te demande ce que TU ressens.",
      encadre: {
        titre: "L'idée",
        texte: "« C'est nul » ne se discute pas. « Au chapitre 3, il refuse d'entrer » se discute.",
      },
    },
  },
  {
    titre: "Une œuvre longue : un problème de mémoire",
    badge: "Lire une œuvre - 6e",
    section: {
      type: "etapes",
      etapes: [
        "Vingt chapitres en trois semaines dépassent ce qu'on retient.",
        "UNE PHRASE PAR CHAPITRE, écrite en le fermant.",
        "UN PEU CHAQUE JOUR : l'écart entre deux séances tue la lecture.",
        "QUI EST QUI : ami, ennemi, ou de la famille.",
      ],
    },
    schema: grilleTenirLeFil,
  },
  {
    titre: "Relier le livre à toi",
    badge: "Lire une œuvre - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que ça fait",
        contenu: "Un récit d'exil, le départ d'un proche : tu entres dans l'émotion.",
      },
      droite: {
        titre: "Ce que ça ne fait pas",
        contenu: "Cela ne prouve pas que le livre est vrai. Relier n'est pas confondre.",
      },
    },
    schema: relierASoi,
  },
  {
    titre: "Fonder un avis",
    badge: "Lire une œuvre - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Une impression", texte: "« Le héros a peur. » Personne ne peut te répondre." },
        { titre: "Une interprétation", texte: "« Au chapitre 3, il refuse d'entrer dans la grotte. »" },
        { titre: "Un évènement", texte: "« Le dragon s'envola. » Cela raconte." },
        { titre: "Un avis", texte: "« J'ai adoré ce passage. » Cela ressent — et c'est permis." },
      ],
    },
    schema: fonderSurUnPassage,
  },
  {
    titre: "Le désaccord est normal",
    badge: "Lire une œuvre - 6e",
    section: {
      type: "etapes",
      etapes: [
        "Deux élèves comprennent la fin autrement : ce n'est pas une erreur.",
        "Ce n'est pas non plus la preuve que le livre est mal écrit.",
        "On en débat EN S'APPUYANT SUR LE TEXTE.",
        "Et la seule question qui fasse avancer : « où est-ce que tu le vois ? »",
      ],
    },
    schema: deuxLectures,
  },
  {
    titre: "À vous",
    badge: "Lire une œuvre - 6e",
    section: {
      type: "exercice",
      enonce: "Un camarade écrit : « La fin est décevante. »",
      question: "Que lui réponds-tu, et pourquoi ?",
      indice: "Ne dis pas s'il a tort. Demande-lui quelque chose.",
      correction:
        "« OÙ EST-CE QUE TU LE VOIS ? » Tant qu'il n'a pas montré de passage, il n'y a rien à discuter — ni pour lui donner raison, ni pour le contredire. Avec un chapitre, le débat commence.",
    },
    schema: debattreEnMontrant,
  },
];
