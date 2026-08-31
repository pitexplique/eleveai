// ─── Fiche de cours : dire pour être compris (6e) ─────────────────────────────
// DEUXIÈME FICHE DU DOMAINE DE L'ORAL EN 6e.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. Compétence « Dire pour être compris dans toutes les
// disciplines » (BO6EFRO).
//
// ⛔ PIÈGE DE CLASSE : la 5e (cycle 4) a `oral_dire_jouer` et
// `oral_prendre_parole`. Elles travaillent la mise en voix d'un texte et la
// prise de parole dans un échange. La 6e travaille la PRÉSENTATION organisée,
// l'INTERPRÉTATION d'une scène, l'ORAL RÉFLEXIF et l'explication SANS NOTES.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE, ET C'EST LA PLUS LIBÉRATRICE DE TOUT LE
// DOMAINE : L'ORAL SERT AUSSI À PENSER, PAS SEULEMENT À RESTITUER. Le fixed bank
// pose l'item en toutes lettres — « Je crois que… non, attends, en fait c'est
// plutôt… » montre que « l'élève se sert de la parole pour réfléchir », et le
// programme parle de « l'oral comme outil réflexif ». Autrement dit : HÉSITER À
// VOIX HAUTE N'EST PAS UN ÉCHEC, C'EST UN USAGE. Aucun élève ne l'a jamais
// entendu ; on lui a appris l'inverse, que bafouiller est une faute. Un élève
// qui croit devoir arriver avec sa pensée finie se tait — et ne pense pas.
//
// ⭐ ET DEUX FOIS, LE POOL ÉCARTE « PAR CŒUR » COMME UN LEURRE. Pour présenter :
// « apprendre son texte par cœur et le réciter » est faux. Pour le défi —
// expliquer une démarche sans notes — « avoir appris ton texte par cœur » est
// faux aussi, et la bonne réponse est « avoir en tête LES ÉTAPES, DANS L'ORDRE ».
// C'est contre-intuitif et c'est juste : le par cœur est le PIRE outil pour
// parler sans notes, parce qu'il casse au premier trou et ne se répare pas.
//
// ⭐ ET L'INTRODUCTION D'UN EXPOSÉ A UNE FONCTION PRÉCISE : annoncer le sujet ET
// LE PLAN — « l'auditoire sait où il va ». Ce n'est ni un remerciement, ni une
// conclusion anticipée.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Bande `nature` centrée sur son mot ; `number_line` centre
// aussi son étiquette sur la valeur — points en 1..3 dans un axe 0..4.
//
// Alignée sur le pool ORAL de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `6e_fr_fixed_dire_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `oral_dire`) :
// - 6e_oral_presenter  → propriétés 1 à 4, méthode 1, usages 1 et 2, exemples 1 et 2
// - 6e_oral_jouer      → propriétés 5 et 6, méthode 2, usage 3, exemple 3
// - 6e_oral_reflexif   → figure, propriétés 7 et 8, formule, méthode 3, exemple 4
// - 6e_oral_dire_defi  → propriétés 9 et 10, méthode 4, usage 4, exemples 5 et 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
  NumberLineCanvasPoint,
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

/** Les étapes d'une démarche. ⚠️ Points en 1..3 dans un axe 0..4 : jamais sur
 *  une borne, sinon l'étiquette déborde de la moitié de sa largeur. */
function axe(points: NumberLineCanvasPoint[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min: 0,
        max: 4,
        step: 1,
        points,
        size: { width: 235, height: 78 },
        display: { showTicks: false, showValues: false, showZero: false },
      }}
    />
  );
}

/** Ce que demande une présentation. ⚠️ Cellules courtes : à la largeur d'un
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

// ─── Ce qui se dessine quand on parle ─────────────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : hésiter à voix haute est un usage.
const hesiterEstUnUsage = phrase({
  mots: [
    { texte: "« non, attends… »", nature: "il cherche" },
    { texte: "« en fait c'est… »", nature: "il trouve" },
  ],
  legende: "Ce n'est pas un raté : c'est quelqu'un qui pense en parlant.",
});

const parlerPourPenser = phrase({
  mots: [
    { texte: "la pensée finie", barre: true },
    { texte: "elle se forme", focus: true },
  ],
  legende: "Attendre d'avoir tout compris pour parler, c'est se taire et ne pas comprendre.",
});

// ── PRÉSENTER : audible, articulé, organisé.
const grillePresenter = grille({
  headers: ["Ce qu'on attend", "Ce qu'on croit"],
  rows: [
    { values: ["parler fort", "parler vite"] },
    { values: ["articuler", "tout dire"] },
    { values: ["suivre un plan", "par cœur"] },
    { values: ["regarder", "lire ses notes"] },
  ],
  caption: "Quatre attentes, et quatre erreurs qui leur ressemblent.",
});

const grillePresenterPlan = grille({
  headers: ["Ce qu'on attend", "Ce qu'on croit"],
  rows: [
    { values: ["parler fort", "parler vite"] },
    { values: ["articuler", "tout dire"] },
    { values: ["suivre un plan", "par cœur"] },
    { values: ["regarder", "lire ses notes"] },
  ],
  highlight: { row: 2 },
  caption: "Le plan tient quand le par cœur casse.",
});

const introductionAnnonce = phrase({
  mots: [
    { texte: "le sujet" },
    { texte: "le plan", focus: true },
  ],
  legende: "L'introduction annonce les deux : l'auditoire sait alors où il va.",
});

const regarderLaClasse = phrase({
  mots: [
    { texte: "tes notes", barre: true },
    { texte: "la classe", focus: true },
  ],
  legende: "Lire tête baissée, c'est parler à sa feuille — elle a déjà tout compris.",
});

// ── JOUER : interpréter, pas lire.
const jouerCestInterpreter = phrase({
  mots: [
    { texte: "le ton" },
    { texte: "les gestes" },
    { texte: "le personnage", focus: true },
  ],
  legende: "Jouer un texte, c'est l'interpréter : le ton et les gestes viennent du rôle.",
});

const voixPlate = phrase({
  mots: [
    { texte: "une voix plate", barre: true },
    { texte: "selon le rôle", focus: true },
  ],
  legende: "Lire sans bouger n'est pas jouer : c'est lire debout.",
});

// ── LE DÉFI : sans notes, on tient par l'ordre.
const etapesDansLordre = axe([
  { value: 1, label: "d'abord" },
  { value: 2, label: "ensuite" },
  { value: 3, label: "enfin" },
]);

const parCoeurCasse = phrase({
  mots: [
    { texte: "par cœur", barre: true },
    { texte: "les étapes", focus: true },
  ],
  legende: "Le par cœur casse au premier trou. Un ordre se rattrape.",
});

const raconterDansLordre = phrase({
  mots: [
    { texte: "clairement" },
    { texte: "dans l'ordre", focus: true },
  ],
  legende: "L'ordre aide à se faire comprendre — plus que la quantité de détails.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOralDire6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "oral-dire",
  titre: `Dire pour être compris en 6e (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Je crois que… non, attends, en fait c'est plutôt… » — cette phrase-là n'est pas un raté. C'est quelqu'un qui PENSE EN PARLANT, et le programme lui donne un nom : l'oral réflexif. Hésiter à voix haute est un usage de la parole, pas un échec. Un élève qui croit devoir arriver avec sa pensée finie se tait — et il ne pense pas non plus.",
  identite: [
    { label: "Mots clés", valeur: "Présenter, plan, interpréter, étapes" },
    { label: "Le secret", valeur: "Hésiter à voix haute est un usage" },
    { label: "Outil", valeur: "Retenir l'ordre, pas les mots" },
  ],
  definition: {
    texte:
      "DIRE POUR ÊTRE COMPRIS recouvre trois choses très différentes. PRÉSENTER un travail devant la classe demande de parler assez fort, d'ARTICULER, de SUIVRE UN PLAN et de REGARDER son auditoire — et non de lire ses notes tête baissée, ni de réciter par cœur, ni de parler vite pour tenir dans le temps. L'INTRODUCTION y a une fonction précise : annoncer le SUJET et le PLAN, pour que l'auditoire sache où il va. JOUER un texte, c'est l'INTERPRÉTER : le ton et les gestes correspondent au personnage — lire d'une voix plate sans bouger n'est pas jouer. Enfin, l'ORAL RÉFLEXIF : on peut se servir de la parole POUR RÉFLÉCHIR, en cherchant à voix haute, en se reprenant, en ajustant au fur et à mesure. C'est un usage reconnu, et non un défaut. Quand il faut expliquer une démarche SANS SES NOTES, ce qui aide n'est pas d'avoir appris un texte par cœur : c'est d'avoir en tête LES ÉTAPES, DANS L'ORDRE.",
  },
  figure: {
    schema: pile(hesiterEstUnUsage, parlerPourPenser),
    legende:
      "La bande grise dit ce qui se passe dans la tête pendant que la bouche parle : « il cherche », puis « il trouve ». Entre les deux, une hésitation — et c'est elle qu'on prend d'ordinaire pour une faute. Le programme dit le contraire : la parole sert aussi à réfléchir, et pas seulement à restituer une pensée déjà faite. En bas, ce que produit la croyance inverse : celui qui attend d'avoir tout compris pour parler se tait, et il ne comprend pas davantage — parce qu'il se prive justement de l'outil qui l'aurait aidé.",
  },
  proprietes: [
    {
      titre: "Présenter, c'est être audible et organisé",
      texte:
        "Parler assez fort, articuler, suivre un plan, regarder la classe. Quatre choses, et aucune ne demande de bien connaitre le sujet par cœur.",
      schema: grillePresenter,
      micros: ["6e_oral_presenter"],
    },
    {
      titre: "Quatre erreurs ressemblent aux quatre attentes",
      texte:
        "Parler vite au lieu de parler fort, tout dire au lieu d'articuler, réciter au lieu de suivre un plan, lire ses notes au lieu de regarder.",
      schema: grillePresenterPlan,
      micros: ["6e_oral_presenter"],
    },
    {
      titre: "L'introduction annonce le sujet et le plan",
      texte:
        "Elle ne remercie pas, elle ne donne pas la conclusion, elle ne lit pas la bibliographie. Elle dit de quoi on parle et dans quel ordre.",
      schema: introductionAnnonce,
      micros: ["6e_oral_presenter"],
    },
    {
      titre: "Regarder, ce n'est pas un supplément",
      texte:
        "Lire tête baissée, c'est parler à sa feuille — et elle a déjà tout compris. Lever les yeux régulièrement fait partie de l'exercice.",
      schema: regarderLaClasse,
      micros: ["6e_oral_presenter"],
    },
    {
      titre: "Jouer, c'est interpréter",
      texte:
        "Le ton et les gestes viennent du personnage. Une scène lue d'une voix plate, sans bouger, n'est pas jouée : c'est de la lecture debout.",
      schema: jouerCestInterpreter,
      micros: ["6e_oral_jouer"],
    },
    {
      titre: "Le corps fait partie du texte",
      texte:
        "Tourner le dos, parler très bas, rester immobile : trois façons de retirer au texte ce que la scène devait lui ajouter.",
      schema: voixPlate,
      micros: ["6e_oral_jouer"],
    },
    {
      titre: "On peut parler pour réfléchir",
      texte:
        "« Je crois que… non, attends… » : la parole sert aussi à chercher. Le programme appelle cela l'oral réflexif, et c'est un usage, pas un raté.",
      schema: hesiterEstUnUsage,
      micros: ["6e_oral_reflexif"],
    },
    {
      titre: "Attendre d'avoir fini de penser, c'est se taire",
      texte:
        "Et se taire n'aide pas à penser. Beaucoup d'élèves silencieux ne manquent pas d'idées : ils croient qu'on ne parle que pour restituer.",
      schema: parlerPourPenser,
      micros: ["6e_oral_reflexif"],
    },
    {
      titre: "Sans notes, on tient par l'ordre",
      texte:
        "Avoir en tête les étapes, dans l'ordre. Pas un texte appris : le par cœur casse au premier trou, et un ordre se rattrape.",
      schema: parCoeurCasse,
      micros: ["6e_oral_dire_defi"],
    },
    {
      titre: "Raconter, c'est aussi une question d'ordre",
      texte:
        "Clairement, dans l'ordre des évènements. Ni le plus de détails possible, ni en commençant par la fin, ni vite pour ne pas ennuyer.",
      schema: pile(etapesDansLordre, raconterDansLordre),
      micros: ["6e_oral_dire_defi"],
    },
  ],
  reel: {
    texte:
      "Tu penses en parlant tous les jours, et tu le fais bien. Quand tu expliques un problème à quelqu'un et qu'au milieu de ta phrase tu dis « ah mais en fait je sais », tu viens de trouver la solution EN LA DISANT — pas avant. C'est exactement ce que le programme appelle l'oral réflexif, et c'est pour cela que des adultes entiers parlent tout seuls en travaillant. Ce qui bloque à l'école, c'est la croyance qu'il faut lever la main seulement quand on est sûr. Personne n'est sûr avant d'avoir formulé. Et pour le reste : quand tu racontes un match à quelqu'un qui ne l'a pas vu, tu suis l'ordre sans y penser — c'est la même compétence que d'expliquer une démarche sans notes, et tu l'as déjà.",
  },
  historique: {
    texte:
      "Un écrivain allemand, Heinrich von Kleist, a consacré en 1805 un texte entier à ce phénomène, sous un titre qui dit tout : « De l'élaboration progressive des pensées par la parole ». Il y raconte que lorsqu'il ne comprend pas quelque chose, il se met à en parler à sa sœur — non pour qu'elle réponde, elle n'a même pas besoin d'écouter vraiment —, et que l'idée lui vient en cours de phrase, alors qu'il ignorait comment il allait la finir. Il ajoute que commencer une phrase sans savoir où elle va n'est pas de l'imprudence : c'est la méthode. Deux siècles plus tard, un programme scolaire dit la même chose en trois mots — l'oral comme outil réflexif.",
  },
  formule: {
    contexte: "Ce qu'il faut avoir en tête pour parler sans ses notes.",
    expression: "retenir l'ordre, pas les mots",
    legende:
      "Un texte appris par cœur casse au premier trou, et il ne se répare pas : les mots suivants ne viennent que par les précédents. Une suite d'étapes, elle, se rattrape — si tu oublies la troisième, tu la retrouves par la deuxième. C'est la même différence qu'entre un chemin et une liste de virages appris.",
    schema: parCoeurCasse,
  },
  methode: [
    {
      titre: "Écrire son plan, pas son texte",
      texte:
        "Quatre ou cinq mots dans l'ordre, sur une seule ligne. Tu les regardes, tu ne les lis pas — et cela suffit à ne rien oublier.",
      schema: grillePresenterPlan,
      micros: ["6e_oral_presenter"],
    },
    {
      titre: "Décider le ton avant de se lever",
      texte:
        "Pour chaque réplique : qui parle, et comment. Le ton se prépare comme le texte, sinon il sort plat par défaut.",
      schema: jouerCestInterpreter,
      micros: ["6e_oral_jouer"],
    },
    {
      titre: "Commencer même sans être sûr",
      texte:
        "« Je crois que… » est une entrée en matière parfaitement valable. La suite se trouve en parlant, et personne n'attend une pensée finie.",
      schema: hesiterEstUnUsage,
      micros: ["6e_oral_reflexif"],
    },
    {
      titre: "Compter ses étapes sur ses doigts",
      texte:
        "Trois ou quatre, pas plus. Si tu perds le fil, tu reprends au doigt suivant — ce qu'un texte appris ne permet jamais.",
      schema: etapesDansLordre,
      micros: ["6e_oral_dire_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour un exposé qu'on écoute jusqu'au bout",
      detail:
        "Une introduction qui annonce le plan, et l'auditoire sait où il va. Sans elle, il attend la fin sans savoir combien il en reste.",
      schema: introductionAnnonce,
      micros: ["6e_oral_presenter"],
    },
    {
      titre: "Pour ne pas parler à sa feuille",
      detail:
        "Regarde la classe une phrase sur deux. Cela suffit, et cela change tout — ceux qui écoutent savent qu'on s'adresse à eux.",
      schema: regarderLaClasse,
      micros: ["6e_oral_presenter"],
    },
    {
      titre: "Pour jouer une scène en classe",
      detail:
        "Le ton et le geste selon le personnage. Ce n'est pas du théâtre professionnel qu'on attend : c'est que le rôle s'entende.",
      schema: voixPlate,
      micros: ["6e_oral_jouer"],
    },
    {
      titre: "Pour expliquer au tableau sans notes",
      detail:
        "Les étapes dans l'ordre, comptées sur les doigts. Tu peux hésiter sur les mots — l'ordre, lui, tient tout seul.",
      schema: parCoeurCasse,
      micros: ["6e_oral_dire_defi"],
    },
  ],
  exemples: [
    {
      titre: "Présenter un exposé",
      donnees: "« Pour présenter clairement un exposé devant la classe, il vaut mieux… »",
      schema: grillePresenter,
      question: "Il vaut mieux quoi ?",
      solution:
        "PARLER FORT, ARTICULER ET SUIVRE UN PLAN. Pas lire ses notes à toute vitesse tête baissée, pas chuchoter, pas improviser sans idée. Une présentation claire est audible, articulée et ORGANISÉE — et l'organisation se voit autant qu'elle s'entend.",
      micros: ["6e_oral_presenter"],
    },
    {
      titre: "L'introduction",
      donnees: "« Dans un exposé, à quoi sert l'introduction ? »",
      schema: introductionAnnonce,
      question: "À quoi sert-elle ?",
      solution:
        "À ANNONCER LE SUJET ET LE PLAN. Pas à donner la conclusion, pas à remercier la classe, pas à lire la bibliographie. Elle dit de quoi on va parler et dans quel ordre : à partir de là, l'auditoire sait où il va, et il peut suivre.",
      micros: ["6e_oral_presenter"],
    },
    {
      titre: "Jouer une scène",
      donnees: "« Pour bien JOUER une scène de théâtre, il faut… »",
      schema: jouerCestInterpreter,
      question: "Il faut quoi ?",
      solution:
        "METTRE LE TON ET LES GESTES SELON LE PERSONNAGE. Lire d'une voix plate sans bouger, parler très bas, tourner le dos : ce sont trois façons de lire un texte de théâtre sans le jouer. Jouer, c'est INTERPRÉTER — le ton vient du rôle.",
      micros: ["6e_oral_jouer"],
    },
    {
      titre: "Une hésitation",
      donnees: "« Je crois que… non, attends, en fait c'est plutôt… »",
      schema: hesiterEstUnUsage,
      question: "Qu'est-ce que cela montre ?",
      solution:
        "QUE L'ÉLÈVE SE SERT DE LA PAROLE POUR RÉFLÉCHIR. Pas qu'il ne sait rien, pas qu'il devrait se taire, pas qu'il récite. Le programme parle de « l'oral comme outil réflexif » : on pense en parlant, et l'on ajuste au fur et à mesure. C'est permis, et c'est efficace.",
      micros: ["6e_oral_reflexif"],
    },
    {
      titre: "Expliquer sans notes",
      donnees: "« Tu dois expliquer une démarche sans tes notes. »",
      schema: parCoeurCasse,
      question: "Qu'est-ce qui t'aide le plus ?",
      solution:
        "AVOIR EN TÊTE LES ÉTAPES, DANS L'ORDRE. Pas d'avoir appris ton texte par cœur — c'est le pire outil : il casse au premier trou et les mots suivants ne viennent que par les précédents. Une suite d'étapes, elle, se rattrape par celle d'avant.",
      micros: ["6e_oral_dire_defi"],
    },
    {
      titre: "Raconter un souvenir",
      donnees: "« Pour raconter un souvenir à l'oral, on parle… »",
      schema: raconterDansLordre,
      question: "Comment ?",
      solution:
        "CLAIREMENT, DANS L'ORDRE DES ÉVÈNEMENTS. Ni en donnant le plus de détails possible sans trier — cela noie l'histoire —, ni en commençant par la fin, ni vite pour ne pas ennuyer : c'est l'ORDRE qui aide à se faire comprendre, pas la vitesse.",
      micros: ["6e_oral_dire_defi"],
    },
  ],
  pieges: [
    "Croire qu'hésiter à voix haute est un échec : c'est un usage de la parole.",
    "Attendre d'avoir tout compris pour lever la main : on comprend souvent en parlant.",
    "Apprendre son exposé par cœur : il casse au premier trou et ne se répare pas.",
    "Lire ses notes tête baissée : c'est parler à sa feuille.",
    "Parler vite pour tenir dans le temps : on perd tout le monde, et on ne gagne rien.",
    "Lire une scène de théâtre d'une voix plate : lire debout n'est pas jouer.",
    "Raconter en donnant tous les détails : c'est l'ordre qui fait comprendre.",
  ],
  aRetenir: [
    "L'oral sert aussi à penser : hésiter à voix haute est permis, et utile.",
    "Présenter : parler fort, articuler, suivre un plan, regarder la classe.",
    "L'introduction annonce le sujet ET le plan.",
    "Jouer, c'est interpréter : le ton et les gestes viennent du personnage.",
    "Sans notes, on retient l'ORDRE des étapes — jamais les mots.",
  ],
  entrainement: [
    {
      question: "« Pour présenter un exposé, il vaut mieux… »",
      correction: "Parler assez fort et regarder la classe.",
      micros: ["6e_oral_presenter"],
    },
    {
      question: "« Pour être bien compris à l'oral, il faut surtout… »",
      correction: "Articuler et parler à un bon rythme.",
      micros: ["6e_oral_presenter"],
    },
    {
      question: "« Pour bien présenter un livre à la classe, il vaut mieux… »",
      correction: "Parler clairement et regarder son public.",
      micros: ["6e_oral_jouer"],
    },
    {
      question: "Une scène lue sans bouger et d'une voix égale : est-ce jouer ?",
      correction: "Non : c'est lire debout. Jouer, c'est interpréter selon le personnage.",
      micros: ["6e_oral_jouer"],
    },
    {
      question: "Tu commences une phrase sans savoir comment la finir. Est-ce une faute ?",
      correction: "Non : c'est l'oral réflexif — on pense en parlant, et on ajuste.",
      micros: ["6e_oral_reflexif"],
    },
    {
      question: "« Pour raconter un souvenir à l'oral, on parle… »",
      correction: "Clairement, dans l'ordre des évènements.",
      micros: ["6e_oral_dire_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesOralDire6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Dire pour être compris - 6e",
    section: {
      type: "objectif",
      phrase: "Hésiter à voix haute est un usage",
      sousPhrase:
        "« Je crois que… non, attends, en fait c'est plutôt… » — cette phrase n'est pas un raté.",
      encadre: {
        titre: "L'idée",
        texte: "Le programme l'appelle l'oral réflexif : on pense EN parlant.",
      },
    },
  },
  {
    titre: "Présenter : quatre attentes",
    badge: "Dire pour être compris - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Parler fort", texte: "Et non parler vite pour tenir le temps." },
        { titre: "Articuler", texte: "Et non vouloir tout dire." },
        { titre: "Suivre un plan", texte: "Et non réciter par cœur." },
        { titre: "Regarder", texte: "Et non lire ses notes tête baissée." },
      ],
    },
    schema: grillePresenter,
  },
  {
    titre: "L'introduction dit où l'on va",
    badge: "Dire pour être compris - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce qu'elle fait",
        contenu: "Elle annonce le sujet ET le plan. L'auditoire sait alors où il va.",
      },
      droite: {
        titre: "Ce qu'elle ne fait pas",
        contenu: "Ni remercier, ni donner la conclusion, ni lire la bibliographie.",
      },
    },
    schema: introductionAnnonce,
  },
  {
    titre: "Jouer, c'est interpréter",
    badge: "Dire pour être compris - 6e",
    section: {
      type: "etapes",
      etapes: [
        "LE TON vient du personnage, pas du texte seul.",
        "LES GESTES aussi : le corps fait partie de la scène.",
        "Lire d'une voix plate sans bouger, c'est lire DEBOUT.",
        "Et le ton se décide avant de se lever — sinon il sort plat.",
      ],
    },
    schema: jouerCestInterpreter,
  },
  {
    titre: "Sans notes : l'ordre, pas les mots",
    badge: "Dire pour être compris - 6e",
    section: {
      type: "etapes",
      etapes: [
        "LE PAR CŒUR casse au premier trou — et ne se répare pas.",
        "LES ÉTAPES, elles, se rattrapent : la troisième vient par la deuxième.",
        "Trois ou quatre étapes, comptées sur les doigts.",
        "Tu peux hésiter sur les mots : l'ordre tient tout seul.",
      ],
    },
    schema: etapesDansLordre,
  },
  {
    titre: "À vous",
    badge: "Dire pour être compris - 6e",
    section: {
      type: "exercice",
      enonce: "Tu lèves la main, et au milieu de ta phrase tu dis : « ah non, attends, en fait… »",
      question: "Est-ce que tu viens de rater quelque chose ?",
      indice: "Demande-toi à quoi sert la parole, à ce moment précis.",
      correction:
        "NON — tu viens de te servir de la parole pour RÉFLÉCHIR. C'est l'oral réflexif, et c'est reconnu par le programme. Attendre d'avoir une pensée finie, c'est se taire — et se taire n'aide pas à penser.",
    },
    schema: hesiterEstUnUsage,
  },
];
