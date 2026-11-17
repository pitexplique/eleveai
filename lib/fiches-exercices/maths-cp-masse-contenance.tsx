// ─── Fiche d'exercices : les masses (CP) — 20 exercices corrigés ──────────────
//
// 17/11/2026 : la feuille interactive de la notion `masse_contenance` du coach
// CP (4 micros), qui s'appelle « Masses » (lib/tutor-v4/knowledge/maths/cp/
// notions.ts). Sur la forme des feuilles du CM1 (`maths-cm1-masse.tsx`) : 8 ★,
// 8 ★★, 4 ★★★, un rappel avant chaque niveau, corrigés à la première personne,
// étape par étape, avec le piège nommé. Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cp/maths/masse.bank.ts`).
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : le lexique lourd, léger ;
// comparer deux ou trois objets ; ranger. ⛔ AUCUNE UNITÉ : ni gramme ni
// kilogramme (ils arrivent au CE1), et AUCUN nombre de masse. ⛔ AUCUNE
// CONTENANCE : le BO laisse la ligne vide au CP (les litres arrivent au CE2),
// malgré l'identifiant historique `masse_contenance`.
// ⭐ Le piège que le BO construit lui-même : des objets « d'apparence identique
// mais de masses clairement différentes » (12), et son cousin, le gros objet
// léger (6, 8).
// ⛔ Aucune question à rédiger : un mot (lourd, léger, un nom, une couleur),
// une lettre, une liste rangée. Phrases de l'énoncé : 14 mots au plus.
//
// Les pièges nommés : le plus gros pris pour le plus lourd (1, 6, 8, 13), le
// plateau du haut pris pour le plus lourd (2, 4, 15), la balance droite lue
// comme « le plus gros gagne » (3), ranger dans le mauvais sens (7, 14), deux
// pesées lues séparément (9, 17, 18, 19), 3 pommes = 1 pomme (11), juger à
// l'œil deux boîtes pareilles (12), comparer la taille des sacs (16),
// demander une pesée de trop (19), le plus grand enfant pris pour le plus
// lourd (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : marché (2, 11, 17), jeux (3, 4), animaux
// (5, 14, 18), fête foraine (6), école (7, 13), maison (8), plage (12, sable),
// sacs à porter (16), boîtes mystère (19), parc (20). Métiers : le marchand de
// fruits (17), la vétérinaire (18).
// UN SEUL contexte réunionnais (17, letchi, mangue et ananas au marché de
// Saint-Pierre, MODÈLE).
// ⭐ FAITS RÉELS, en ordre de grandeur (sans aucun nombre pour l'élève) : un
// ananas pèse plus qu'une mangue, une mangue plus qu'un letchi ; une vache
// pèse plus qu'un chat, un chat plus qu'une souris. Des évidences de la vie
// courante, pas des mesures.
//
// ⭐ LES DESSINS : une balance à plateaux SANS AUCUNE masse écrite (le côté qui
// descend porte le plus lourd), deux pesées l'une sous l'autre, une bascule de
// parc (`dessins-cp-lot-a.tsx`).
//
// Micro-compétences : cp_masse_lexique (1, 5, 8, 16), cp_masse_comparer (2, 3,
// 4, 6, 8, 11, 12, 15, 16), cp_masse_contenance_estimer (7, 9, 13, 14, 17),
// cp_masse_contenance_defi (10, 17, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ecranSeulement } from "@/lib/fiches-exercices/dessins-cm1-nombres";
import { balance, bascule, pesees } from "@/lib/fiches-exercices/dessins-cp-lot-a";

const VRAI = ["vrai", "oui"];
const FAUX = ["faux", "non"];

export const exercicesMasseContenanceCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "masse-contenance",
  titre: "Les masses",
  accroche:
    "Vingt exercices, du geste seul au problème. Dire lourd ou léger. Lire une balance : le côté le plus lourd descend. Comparer deux objets, ranger trois objets. Se méfier des yeux : le plus gros n'est pas toujours le plus lourd. Un marché, des boîtes de sable, des chiots, des boîtes mystère et une bascule au parc. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je regarde bien la balance.",
      rappel: [
        "Lourd : difficile à porter. Léger : facile à porter.",
        "Sur la balance, le côté le plus lourd descend.",
        "Si la balance est droite, les deux côtés sont aussi lourds.",
      ],
      exercices: [
        {
          enonce: "Choisis. Écris la lettre.\na) Le plus lourd : A) une plume B) un livre\nb) Le plus léger : A) une pomme B) une pastèque\nc) Le plus lourd : A) une voiture B) un vélo",
          correction:
            "Je pense à ce que je sens dans mes bras quand je porte l'objet.\na) Une plume ne pèse presque rien. Un livre pèse plus. Réponse B.\nb) Une pastèque est dure à porter. Une pomme tient dans la main. Réponse A.\nc) Un enfant soulève un vélo, pas une voiture. Réponse A.\n⛔ Le piège : répondre au hasard sans relire « lourd » ou « léger ». Le b) demande le plus LÉGER.\nRéponse : a) B ; b) A ; c) A.",
          micros: ["cp_masse_lexique"],
          reponses: [
            { question: "a)", attendu: ["B", "B) un livre", "un livre", "livre"] },
            { question: "b)", attendu: ["A", "A) une pomme", "une pomme", "pomme"] },
            { question: "c)", attendu: ["A", "A) une voiture", "une voiture", "voiture"] },
          ],
        },
        {
          enonce: "Au marché, on pèse un ananas et une pomme.\nQuel fruit est le plus lourd ?",
          figure: balance(["ananas"], ["pomme"], "gauche"),
          correction:
            "Je regarde le côté qui descend.\nLe plateau de l'ananas est en bas. Le plateau de la pomme est en haut.\nLe côté le plus lourd descend : l'ananas est le plus lourd.\n⛔ Le piège : croire que le plateau du haut « gagne ». C'est le lourd qui tire vers le bas.\nRéponse : l'ananas.",
          micros: ["cp_masse_comparer"],
          reponses: [{ attendu: ["ananas", "l'ananas", "un ananas"] }],
        },
        {
          enonce: "La balance est droite.\nChoisis. Écris la lettre.\nA) Le ballon est plus lourd.\nB) La poupée est plus lourde.\nC) Ils sont aussi lourds.",
          figure: balance(["ballon"], ["poupée"], "egal"),
          correction:
            "Les deux plateaux sont à la même hauteur. Aucun ne descend.\nAucun objet n'est plus lourd que l'autre : ils sont aussi lourds.\nRéponse C.\n⛔ Le piège : choisir le ballon parce qu'il est plus gros. La balance est droite : c'est égal.\nRéponse : C.",
          micros: ["cp_masse_comparer"],
          reponses: [{ attendu: ["C", "C) Ils sont aussi lourds.", "aussi lourds"] }],
        },
        {
          enonce: "On pèse un camion et une toupie.\nQuel jouet est le plus léger ?",
          figure: balance(["camion"], ["toupie"], "gauche"),
          correction:
            "Le plateau du camion descend. Le camion est le plus lourd.\nLe plateau de la toupie monte. La toupie est la plus légère.\n⛔ Le piège : donner le plus lourd. La question demande le plus LÉGER : c'est le côté qui monte.\nRéponse : la toupie.",
          micros: ["cp_masse_comparer"],
          reponses: [{ attendu: ["toupie", "la toupie"] }],
        },
        {
          enonce: "Écris lourd ou léger.\na) un éléphant\nb) une feuille d'arbre\nc) un piano\nd) un papillon",
          correction:
            "Je me demande : est-ce facile ou difficile à porter ?\na) Personne ne peut porter un éléphant : lourd.\nb) Une feuille s'envole avec le vent : léger.\nc) Il faut plusieurs adultes pour bouger un piano : lourd.\nd) Un papillon se pose sur une fleur sans la plier : léger.\n⛔ Le piège : confondre les deux mots. Lourd : dur à porter. Léger : facile à porter.\nRéponse : a) lourd ; b) léger ; c) lourd ; d) léger.",
          micros: ["cp_masse_lexique"],
          reponses: [
            { question: "a)", attendu: ["lourd"] },
            { question: "b)", attendu: ["léger", "legere", "légère"] },
            { question: "c)", attendu: ["lourd"] },
            { question: "d)", attendu: ["léger", "legere", "légère"] },
          ],
        },
        {
          enonce: "À la fête foraine, Nina tient un gros ballon de baudruche.\nSam tient une petite bille en fer.\nQui tient l'objet le plus lourd ?",
          schema: ecranSeulement(balance(["ballon"], ["bille en fer"], "droite")),
          correction:
            "Le ballon est gros, mais il est rempli d'air. Il flotte presque.\nLa bille est petite, mais elle est en fer. Elle tombe tout de suite.\nSur une balance, le côté de la bille descendrait.\nC'est Sam qui tient l'objet le plus lourd.\n⛔ Le piège : croire que le plus gros est le plus lourd. La taille ne dit pas la masse.\nRéponse : Sam.",
          micros: ["cp_masse_comparer"],
          reponses: [{ attendu: ["Sam", "la bille", "la bille en fer"] }],
        },
        {
          enonce: "Range du plus léger au plus lourd :\nA) une chaise\nB) une gomme\nC) un cartable\nÉcris les lettres, séparées par « ; ».",
          correction:
            "Je compare deux par deux.\nUne gomme est plus légère qu'un cartable : un cartable porte des livres.\nUn cartable est plus léger qu'une chaise : la chaise est plus dure à soulever.\nDonc : la gomme, puis le cartable, puis la chaise.\n⛔ Le piège : ranger du plus lourd au plus léger. Je relis : le plus LÉGER d'abord.\nRéponse : B ; C ; A.",
          micros: ["cp_masse_contenance_estimer"],
          reponses: [{ attendu: ["B ; C ; A", "B < C < A"], ordre: true }],
        },
        {
          enonce: "Vrai ou faux ?\na) Le plus gros objet est toujours le plus lourd.\nb) Sur la balance, le plateau du bas porte le plus lourd.\nc) Une plume est plus légère qu'un caillou.",
          correction:
            "a) Un gros oreiller est plus léger qu'une petite pierre. Le plus gros n'est pas toujours le plus lourd. Faux.\nb) Le côté le plus lourd descend. Vrai.\nc) Une plume ne pèse presque rien. Un caillou pèse plus. Vrai.\n⛔ Le piège du a) : croire ses yeux. Pour savoir, je soupèse ou je pèse.\nRéponse : a) faux ; b) vrai ; c) vrai.",
          micros: ["cp_masse_lexique", "cp_masse_comparer"],
          reponses: [
            { question: "a)", attendu: FAUX },
            { question: "b)", attendu: VRAI },
            { question: "c)", attendu: VRAI },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je compare deux par deux, puis je range.",
      rappel: [
        "Pour ranger 3 objets, je les compare deux par deux.",
        "Si A est plus lourd que B, et B plus lourd que C, alors A est le plus lourd.",
        "Les yeux se trompent : je soupèse, ou je pèse.",
      ],
      exercices: [
        {
          enonce: "Regarde les deux pesées.\nRange les fruits du plus léger au plus lourd.\nSépare-les par « ; ».",
          figure: pesees(balance(["pomme"], ["citron"], "gauche", "Pesée 1"), balance(["citron"], ["cerise"], "gauche", "Pesée 2")),
          correction:
            "Pesée 1 : le côté de la pomme descend. La pomme est plus lourde que le citron.\nPesée 2 : le côté du citron descend. Le citron est plus lourd que la cerise.\nLa cerise est la plus légère. La pomme est la plus lourde. Le citron est entre les deux.\nJe range : cerise, citron, pomme.\n⛔ Le piège : lire une seule pesée. Il faut les deux pour ranger les trois fruits.\nRéponse : cerise ; citron ; pomme.",
          micros: ["cp_masse_contenance_estimer", "cp_masse_comparer"],
          reponses: [{ attendu: ["cerise ; citron ; pomme", "cerise < citron < pomme"], ordre: true }],
        },
        {
          enonce: "Le sac rouge est plus lourd que le sac bleu.\nLe sac bleu est plus lourd que le sac vert.\na) Quel sac est le plus lourd ?\nb) Quel sac est le plus léger ?",
          correction:
            "Je range les sacs : le rouge est au-dessus du bleu, le bleu au-dessus du vert.\nDu plus lourd au plus léger : rouge, bleu, vert.\na) Le plus lourd est le rouge.\nb) Le plus léger est le vert.\n⛔ Le piège : répondre bleu, le sac cité deux fois. Il est entre les deux.\nRéponse : a) rouge ; b) vert.",
          micros: ["cp_masse_contenance_defi"],
          reponses: [
            { question: "a)", attendu: ["rouge", "le rouge", "le sac rouge"] },
            { question: "b)", attendu: ["vert", "le vert", "le sac vert"] },
          ],
        },
        {
          enonce: "Au marché, la balance est droite.\nUn melon est à gauche. Trois pommes sont à droite.\nChoisis. Écris la lettre.\nA) Le melon est plus lourd qu'une pomme.\nB) Le melon est plus léger qu'une pomme.\nC) Le melon est aussi lourd qu'une pomme.",
          figure: balance(["melon"], ["pomme", "pomme", "pomme"], "egal"),
          correction:
            "La balance est droite : le melon est aussi lourd que les trois pommes ENSEMBLE.\nUne seule pomme est donc plus légère que le melon.\nLe melon est plus lourd qu'une pomme. Réponse A.\n⛔ Le piège : choisir C. Le melon est aussi lourd que trois pommes, pas qu'une seule.\nRéponse : A.",
          micros: ["cp_masse_comparer"],
          reponses: [{ attendu: ["A", "A) Le melon est plus lourd qu'une pomme."] }],
        },
        {
          enonce: "À la plage, Léo a deux boîtes pareilles.\nUne est pleine de sable. L'autre est vide.\nQuelle boîte est pleine de sable : A ou B ?",
          figure: balance(["boîte A"], ["boîte B"], "gauche"),
          correction:
            "Les deux boîtes se ressemblent : mes yeux ne peuvent pas savoir.\nLa balance, elle, sait. Le côté de la boîte A descend.\nLa boîte A est la plus lourde : c'est elle qui est pleine de sable.\n⛔ Le piège : choisir au hasard parce qu'elles sont pareilles. Je lis la balance.\nRéponse : A.",
          micros: ["cp_masse_comparer"],
          reponses: [{ attendu: ["A", "la boîte A", "boîte A"] }],
        },
        {
          enonce: "Quel objet est plus lourd qu'un cartable ? Écris la lettre.\nA) une gomme\nB) un vélo\nC) un crayon",
          correction:
            "Je compare chaque objet au cartable.\nA) Une gomme est bien plus légère qu'un cartable.\nB) Un vélo est plus dur à porter qu'un cartable : il est plus lourd.\nC) Un crayon est très léger.\nRéponse B.\n⛔ Le piège : choisir un objet qu'on met DANS le cartable. Ce qu'on met dedans est plus léger que lui.\nRéponse : B.",
          micros: ["cp_masse_contenance_estimer"],
          reponses: [{ attendu: ["B", "B) un vélo", "un vélo", "vélo"] }],
        },
        {
          enonce: "Range du plus lourd au plus léger :\nune vache, une souris, un chat.\nSépare les animaux par « ; ».",
          correction:
            "Je compare deux par deux.\nUne vache est plus lourde qu'un chat : on ne porte pas une vache.\nUn chat est plus lourd qu'une souris : la souris tient dans la main.\nDu plus lourd au plus léger : vache, chat, souris.\n⛔ Le piège : ranger du plus léger au plus lourd. Ici, on commence par le plus LOURD.\nRéponse : vache ; chat ; souris.",
          micros: ["cp_masse_contenance_estimer"],
          reponses: [{ attendu: ["vache ; chat ; souris", "une vache ; un chat ; une souris", "vache > chat > souris"], ordre: true }],
        },
        {
          enonce: "La balance penche du côté de la boîte bleue.\nQuelle boîte est la plus légère : la rouge ou la bleue ?",
          figure: balance(["boîte rouge"], ["boîte bleue"], "droite"),
          correction:
            "Le côté de la boîte bleue descend : la bleue est la plus lourde.\nLe côté de la boîte rouge monte : la rouge est la plus légère.\n⛔ Le piège : lire « penche du côté de la bleue » et répondre bleue. Pencher, c'est descendre : c'est le côté lourd.\nRéponse : la rouge.",
          micros: ["cp_masse_comparer"],
          reponses: [{ attendu: ["rouge", "la rouge", "la boîte rouge"] }],
        },
        {
          enonce: "Mila porte un sac de plumes. Sam porte un sac de cailloux.\nLes deux sacs ont la même taille.\na) Qui porte le sac le plus lourd ?\nb) Le sac de plumes est-il lourd ou léger ?",
          correction:
            "Les sacs ont la même taille. Ce qui compte, c'est ce qu'il y a dedans.\na) Des cailloux pèsent bien plus que des plumes. Sam porte le sac le plus lourd.\nb) Des plumes ne pèsent presque rien : le sac de plumes est léger.\n⛔ Le piège : dire « pareil » parce que les sacs ont la même taille. Même taille ne veut pas dire même masse.\nRéponse : a) Sam ; b) léger.",
          micros: ["cp_masse_lexique", "cp_masse_comparer"],
          reponses: [
            { question: "a)", attendu: ["Sam"] },
            { question: "b)", attendu: ["léger", "legere", "légère"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis chaque pesée. Je range, puis je vérifie.",
      rappel: [
        "Chaque pesée compare deux objets seulement.",
        "Je mets les pesées bout à bout pour ranger.",
        "Je vérifie : mon rangement respecte toutes les pesées.",
      ],
      exercices: [
        {
          titre: "Les fruits du marchand",
          enonce: "Au marché de Saint-Pierre, le marchand pèse trois fruits.\nLa mangue est plus lourde que le letchi.\nL'ananas est plus lourd que la mangue.\na) Quel fruit est le plus lourd ?\nb) Quel fruit est le plus léger ?\nc) Range-les du plus léger au plus lourd, séparés par « ; ».",
          correction:
            "Je mets les deux phrases bout à bout.\nLe letchi est plus léger que la mangue. La mangue est plus légère que l'ananas.\na) L'ananas est plus lourd que la mangue, donc aussi que le letchi. Le plus lourd : l'ananas.\nb) Le plus léger : le letchi.\nc) Du plus léger au plus lourd : letchi, mangue, ananas.\n⛔ Le piège : ranger dans l'ordre des phrases. Je dois remettre les fruits dans le bon ordre.\nRéponse : a) l'ananas ; b) le letchi ; c) letchi ; mangue ; ananas.",
          micros: ["cp_masse_contenance_defi", "cp_masse_contenance_estimer"],
          reponses: [
            { question: "a)", attendu: ["ananas", "l'ananas"] },
            { question: "b)", attendu: ["letchi", "le letchi", "litchi"] },
            { question: "c)", attendu: ["letchi ; mangue ; ananas", "letchi < mangue < ananas", "litchi ; mangue ; ananas"], ordre: true },
          ],
        },
        {
          titre: "Les chiots de la vétérinaire",
          enonce: "La vétérinaire pèse trois chiots : Rex, Pif et Bob.\na) Choisis pour Pif et Bob. Écris la lettre.\nA) Pif est plus lourd.\nB) Bob est plus lourd.\nC) Ils sont aussi lourds.\nb) Quel chiot est le plus lourd ?",
          figure: pesees(balance(["Rex"], ["Pif"], "gauche", "Pesée 1"), balance(["Pif"], ["Bob"], "egal", "Pesée 2")),
          correction:
            "Pesée 1 : le côté de Rex descend. Rex est plus lourd que Pif.\nPesée 2 : la balance est droite. Pif et Bob sont aussi lourds.\na) Réponse C : aussi lourds.\nb) Rex est plus lourd que Pif. Pif est aussi lourd que Bob. Donc Rex est aussi plus lourd que Bob.\nLe plus lourd est Rex.\n⛔ Le piège : dire qu'on ne sait rien de Bob. Bob est aussi lourd que Pif : il est donc plus léger que Rex.\nRéponse : a) C ; b) Rex.",
          micros: ["cp_masse_contenance_defi", "cp_masse_comparer"],
          reponses: [
            { question: "a)", attendu: ["C", "C) Ils sont aussi lourds.", "aussi lourds"] },
            { question: "b)", attendu: ["Rex"] },
          ],
        },
        {
          titre: "Les boîtes mystère",
          enonce: "Trois boîtes mystère se ressemblent : A, B et C.\nOn fait deux pesées.\na) Range-les de la plus légère à la plus lourde, séparées par « ; ».\nb) Faut-il une 3e pesée pour comparer B et C ? Oui ou non ?",
          figure: pesees(balance(["boîte A"], ["boîte C"], "gauche", "Pesée 1"), balance(["boîte B"], ["boîte A"], "gauche", "Pesée 2")),
          correction:
            "Pesée 1 : le côté de A descend. A est plus lourde que C.\nPesée 2 : le côté de B descend. B est plus lourde que A.\nB est plus lourde que A, et A plus lourde que C.\na) De la plus légère à la plus lourde : C, puis A, puis B.\nb) B est plus lourde que A, qui est plus lourde que C. Donc B est plus lourde que C. Pas besoin d'une 3e pesée : non.\n⛔ Le piège : lire les boîtes dans l'ordre de l'alphabet, A, B, C. Je suis les pesées.\nRéponse : a) C ; A ; B ; b) non.",
          micros: ["cp_masse_contenance_defi", "cp_masse_contenance_estimer"],
          reponses: [
            { question: "a)", attendu: ["C ; A ; B", "C < A < B"], ordre: true },
            { question: "b)", attendu: FAUX },
          ],
        },
        {
          titre: "La bascule du parc",
          enonce: "Au parc, Tom monte sur la bascule avec Léa. Le côté de Tom descend.\nPuis Léa monte avec Zoé. Le côté de Léa descend.\na) Qui est le plus lourd des trois ?\nb) Qui est le plus léger ?",
          figure: pesees(bascule("Tom", "Léa", "gauche"), bascule("Léa", "Zoé", "gauche")),
          correction:
            "Sur une bascule, le côté du plus lourd descend, comme sur une balance.\n1re fois : le côté de Tom descend. Tom est plus lourd que Léa.\n2e fois : le côté de Léa descend. Léa est plus lourde que Zoé.\nJe range : Tom, puis Léa, puis Zoé.\na) Le plus lourd est Tom.\nb) La plus légère est Zoé.\n⛔ Le piège : choisir l'enfant le plus grand. Être grand ne veut pas dire être lourd : je regarde la bascule.\nRéponse : a) Tom ; b) Zoé.",
          micros: ["cp_masse_contenance_defi"],
          reponses: [
            { question: "a)", attendu: ["Tom"] },
            { question: "b)", attendu: ["Zoé", "Zoe"] },
          ],
        },
      ],
    },
  ],
};
