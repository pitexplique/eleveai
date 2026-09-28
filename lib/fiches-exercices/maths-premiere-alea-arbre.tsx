// ─── Fiche d'exercices : arbre pondéré, lire et construire (1re) ──────────────
//                              20 exercices corrigés
//
// Chapitre « Phénomènes aléatoires » (BOP1AL) de première SANS spécialité,
// 28/09/2026, sur l'étalon `maths-premiere-auto-comparer.tsx`.
// Alignée sur `lib/tutor-v4/questionBank/premiere/maths/arbres-ponderes.bank.ts`
// (notionId alea_arbre) : LIRE ce que porte une branche, COMPLÉTER un arbre
// (somme 1 à chaque nœud), CONSTRUIRE l'arbre d'un énoncé. Aux sujets de juin
// 2026, l'arbre est à compléter aux Antilles et à lire aux Centres étrangers.
// ⛔ Les calculs de chemins (produits, sommes) sont la notion suivante,
// `alea_arbre_calcul` : ici, l'arbre se LIT et se DESSINE, il ne se calcule
// pas. Les arbres à compléter portent des « ? » ; le corrigé montre l'arbre
// complet.
//
// ⭐⭐ LE FIL : UNE BRANCHE DU DEUXIÈME NIVEAU PORTE UNE PROBABILITÉ SACHANT
// LE NŒUD D'OÙ ELLE PART. Et à chaque nœud, les branches font 1.
// ⛔ LE PIÈGE CENTRAL : lire le 0,4 d'une branche du deuxième niveau comme
// P(B) ou P(A ∩ B) (exercices 3, 6, 14, 17).
//
// ⭐ Frédéric, 28/09 : un arbre dans presque chaque exercice, et des
// contextes d'économie, d'écologie, de sport, de nature, de PHYSIQUE (signal
// binaire, exercice 10 ; contrôle de lentilles, exercice 17) et
// d'HISTOIRE-GÉO (migrations internes, exercice 11 ; émigration européenne du
// XIXᵉ siècle, exercice 18). Les chiffres sont des MODÈLES arrondis, jamais
// présentés comme des données officielles.
// ⭐ PDF ≤ 12 pages : les arbres complétés qui redisent le corrigé sont
// `ecranSeulement`.
//
// ⭐ Recalcul : `scripts/verifier-exercices-premiere-alea-arbre.mjs`.
//
// Micro-compétences : alea_arbre_lire (1, 3, 6, 8, 10, 12, 14, 16, 17, 18, 19,
// 20), alea_arbre_completer (2, 5, 8, 12, 16, 18, 19), alea_arbre_construire
// (4, 7, 9, 10, 11, 13, 15, 17, 18, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { arbre } from "@/lib/fiches-exercices/figures";

/** Un dessin d'appoint, montré à l'écran et pas sur papier (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

export const exercicesAleaArbrePremiere: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "premiere",
  notion: "alea-arbre",
  titre: "Arbre pondéré : lire et construire",
  accroche:
    "Vingt exercices pour lire ce que porte chaque branche d'un arbre pondéré, compléter un arbre (à chaque nœud, les branches font 1) et construire l'arbre d'un énoncé. Tri des bouteilles, signal transmis, migrations, rugby, glands de chêne, achats en ligne, contrôle de lentilles, émigration du XIXᵉ siècle, tirs au but, déchets du littoral. Un rappel de cours avant chaque niveau, et une correction écrite étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=premiere",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Lire une branche, compléter un nœud, ou dessiner un arbre.",
      rappel: [
        "Le premier niveau porte $P(A)$ et $P(\\overline{A})$.",
        "Une branche du deuxième niveau porte une probabilité CONDITIONNELLE : celle qui part de $A$ vers $B$ porte $P_A(B)$.",
        "À chaque nœud, la somme des probabilités des branches qui en partent vaut $1$.",
      ],
      exercices: [
        {
          enonce:
            "Pour un jour d'école choisi au hasard, $A$ : « Tom prend le bus » (sinon, il vient à vélo) et $B$ : « il arrive avant $8$ h ». Lire sur l'arbre : $P(A)$, $P(\\overline{A})$, $P_A(B)$ et $P_{\\overline{A}}(\\overline{B})$.",
          figure: arbre([
            { label: "A", proba: "0,7", enfants: [{ label: "B", proba: "0,4" }, { label: "non B", proba: "0,6" }] },
            { label: "non A", proba: "0,3", enfants: [{ label: "B", proba: "0,9" }, { label: "non B", proba: "0,1" }] },
          ]),
          correction:
            "Premier niveau : $P(A) = 0{,}7$ et $P(\\overline{A}) = 0{,}3$.\nLa branche de $A$ vers $B$ : $P_A(B) = 0{,}4$. En bus, Tom arrive avant $8$ h $4$ fois sur $10$.\nLa branche de $\\overline{A}$ vers $\\overline{B}$ : $P_{\\overline{A}}(\\overline{B}) = 0{,}1$. À vélo, il n'arrive après $8$ h qu'une fois sur dix.\n⭐ Le nœud d'où part la branche donne l'INDICE.",
          micros: ["alea_arbre_lire"],
        },
        {
          enonce: "Compléter l'arbre : remplacer chaque « ? » par la bonne probabilité.",
          figure: arbre([
            { label: "A", proba: "0,35", enfants: [{ label: "B", proba: "0,2" }, { label: "non B", proba: "?" }] },
            { label: "non A", proba: "?", enfants: [{ label: "B", proba: "?" }, { label: "non B", proba: "0,45" }] },
          ]),
          correction:
            "Au départ, les deux branches font $1$ : $P(\\overline{A}) = 1 - 0{,}35 = 0{,}65$.\nAu nœud $A$ : $P_A(\\overline{B}) = 1 - 0{,}2 = 0{,}8$.\nAu nœud $\\overline{A}$ : $P_{\\overline{A}}(B) = 1 - 0{,}45 = 0{,}55$.\n⚠️ Le piège : faire $1 - 0{,}2$ pour la branche $\\overline{A} \\to B$. On complète NŒUD PAR NŒUD, avec les branches qui partent du même point.",
          schema: ecranSeulement(
            arbre([
              { label: "A", proba: "0,35", enfants: [{ label: "B", proba: "0,2" }, { label: "non B", proba: "0,8" }] },
              { label: "non A", proba: "0,65", enfants: [{ label: "B", proba: "0,55" }, { label: "non B", proba: "0,45" }] },
            ]),
          ),
          micros: ["alea_arbre_completer"],
        },
        {
          enonce:
            "Sur l'arbre de l'exercice 1, la branche qui va de $A$ vers $B$ porte $0{,}4$. Ce nombre est-il $P(B)$, $P(A \\cap B)$ ou $P_A(B)$ ? Expliquer.",
          correction:
            "La branche part du nœud $A$ : on est déjà dans le cas « Tom a pris le bus ».\nLe nombre $0{,}4$ est donc $P_A(B)$ : la probabilité d'arriver avant $8$ h SACHANT qu'il a pris le bus.\nCe n'est pas $P(B)$ : $P(B)$ mélange les jours de bus et les jours de vélo.\nCe n'est pas $P(A \\cap B)$ : cette probabilité correspond à tout le CHEMIN $A$ puis $B$, pas à une seule branche.\n⛔ Une branche du deuxième niveau ne porte jamais $P(B)$.",
          schema: ecranSeulement(arbre([{ label: "A", proba: "0,7", enfants: [{ label: "B : P_A(B)", proba: "0,4" }, { label: "non B", proba: "0,6" }] }, { label: "non A", proba: "0,3", enfants: [{ label: "B", proba: "0,9" }, { label: "non B", proba: "0,1" }] }])),
          micros: ["alea_arbre_lire"],
        },
        {
          enonce:
            "Un club de voile note $R$ : « la mer est agitée » et $S$ : « la sortie est annulée ». On sait que $P(R) = 0{,}25$, que $P_R(S) = 0{,}8$ et que $P_{\\overline{R}}(S) = 0{,}1$. Construire l'arbre pondéré.",
          correction:
            "Le premier niveau porte ce qu'on apprend en premier, l'état de la mer : $R$ avec $0{,}25$, et $\\overline{R}$ avec $1 - 0{,}25 = 0{,}75$.\nDerrière $R$ : $S$ avec $0{,}8$ et $\\overline{S}$ avec $0{,}2$.\nDerrière $\\overline{R}$ : $S$ avec $0{,}1$ et $\\overline{S}$ avec $0{,}9$.\n⭐ L'indice d'une probabilité conditionnelle dit derrière QUEL nœud on l'écrit : $P_R(S)$ va derrière $R$.",
          schema: ecranSeulement(
            arbre([
              { label: "R", proba: "0,25", enfants: [{ label: "S", proba: "0,8" }, { label: "non S", proba: "0,2" }] },
              { label: "non R", proba: "0,75", enfants: [{ label: "S", proba: "0,1" }, { label: "non S", proba: "0,9" }] },
            ]),
          ),
          micros: ["alea_arbre_construire"],
        },
        {
          enonce:
            "À une fête, on tire un jeton rouge, bleu ou vert, puis on gagne ($G$) ou on perd. Compléter l'arbre.",
          figure: arbre([
            { label: "Rouge", proba: "0,5", enfants: [{ label: "G", proba: "0,1" }, { label: "non G", proba: "?" }] },
            { label: "Bleu", proba: "0,3", enfants: [{ label: "G", proba: "?" }, { label: "non G", proba: "0,6" }] },
            { label: "Vert", proba: "?", enfants: [{ label: "G", proba: "0,7" }, { label: "non G", proba: "?" }] },
          ]),
          correction:
            "Au départ, TROIS branches, qui font $1$ : $P(\\text{Vert}) = 1 - 0{,}5 - 0{,}3 = 0{,}2$.\nDerrière Rouge : $1 - 0{,}1 = 0{,}9$.\nDerrière Bleu : $1 - 0{,}6 = 0{,}4$.\nDerrière Vert : $1 - 0{,}7 = 0{,}3$.\n⭐ Un nœud peut avoir plus de deux branches : la règle reste la même, leur somme vaut $1$.",
          micros: ["alea_arbre_completer"],
        },
        {
          enonce:
            "Le car scolaire d'un village. Pour un jour choisi au hasard, $P$ : « il pleut », $R$ : « le car est en retard ». Écrire par une phrase ce que signifient les nombres $0{,}3$ et $0{,}95$ de l'arbre.",
          figure: arbre([
            { label: "P", proba: "0,2", enfants: [{ label: "R", proba: "0,3" }, { label: "non R", proba: "0,7" }] },
            { label: "non P", proba: "0,8", enfants: [{ label: "R", proba: "0,05" }, { label: "non R", proba: "0,95" }] },
          ]),
          correction:
            "$0{,}3$ est sur la branche de $P$ vers $R$ : $P_P(R) = 0{,}3$.\n« Les jours de pluie, le car est en retard $3$ fois sur $10$. »\n$0{,}95$ est sur la branche de $\\overline{P}$ vers $\\overline{R}$ : $P_{\\overline{P}}(\\overline{R}) = 0{,}95$.\n« Les jours sans pluie, le car est à l'heure $95$ fois sur $100$. »\n⭐ Pour lire une branche : « quand [nœud de départ], alors [bout de la branche] avec cette probabilité ».",
          micros: ["alea_arbre_lire"],
        },
        {
          enonce:
            "Dans une salle de sport, $40$ % des adhérents sont des femmes ($F$). Parmi les femmes, $15$ % viennent le matin ($M$) ; parmi les hommes, $25$ %. Construire l'arbre pondéré.",
          correction:
            "Premier niveau : $F$ avec $0{,}4$, $\\overline{F}$ (les hommes) avec $0{,}6$.\n« Parmi les femmes, $15$ % » : derrière $F$, $M$ avec $0{,}15$ et $\\overline{M}$ avec $0{,}85$.\n« Parmi les hommes, $25$ % » : derrière $\\overline{F}$, $M$ avec $0{,}25$ et $\\overline{M}$ avec $0{,}75$.\n⭐ Chaque « parmi » de l'énoncé devient une branche du deuxième niveau.",
          schema: ecranSeulement(
            arbre([
              { label: "F", proba: "0,4", enfants: [{ label: "M", proba: "0,15" }, { label: "non M", proba: "0,85" }] },
              { label: "non F", proba: "0,6", enfants: [{ label: "M", proba: "0,25" }, { label: "non M", proba: "0,75" }] },
            ]),
          ),
          micros: ["alea_arbre_construire"],
        },
        {
          enonce:
            "L'énoncé dit : « $30$ % des élèves sont demi-pensionnaires ($A$) ; parmi eux, $40$ % mangent à la cantine le mercredi ($B$) ; parmi les autres, $20$ % ». Léa a écrit sur son arbre : $A$ : $0{,}3$ ; $\\overline{A}$ : $0{,}7$ ; derrière $A$ : $B$ : $0{,}3$ et $\\overline{B}$ : $0{,}6$ ; derrière $\\overline{A}$ : $B$ : $0{,}2$ et $\\overline{B}$ : $0{,}8$. Trouver son erreur et la corriger.",
          correction:
            "On vérifie chaque nœud. Au départ : $0{,}3 + 0{,}7 = 1$. Juste.\nDerrière $A$ : $0{,}3 + 0{,}6 = 0{,}9$. Ce n'est pas $1$ : il y a une erreur.\nDerrière $\\overline{A}$ : $0{,}2 + 0{,}8 = 1$. Juste.\nL'énoncé dit « parmi eux, $40$ % » : la branche $A \\to B$ porte $0{,}4$, et non $0{,}3$. Léa a recopié $P(A)$.\n⭐ La règle « somme $1$ à chaque nœud » est un contrôle gratuit : on la vérifie toujours.",
          schema: ecranSeulement(
            arbre([
              { label: "A", proba: "0,3", enfants: [{ label: "B", proba: "0,4" }, { label: "non B", proba: "0,6" }] },
              { label: "non A", proba: "0,7", enfants: [{ label: "B", proba: "0,2" }, { label: "non B", proba: "0,8" }] },
            ]),
          ),
          micros: ["alea_arbre_lire", "alea_arbre_completer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Traduire l'énoncé en arbre, puis lire l'arbre par des phrases.",
      rappel: [
        "On met au PREMIER niveau ce qui se passe (ou se sait) en premier, au deuxième ce qui en dépend.",
        "Chaque pourcentage « parmi les $A$ » va sur une branche qui part de $A$.",
        "Une issue qui s'arrête (un gland mangé, un client qui part) peut n'avoir aucune branche après elle.",
      ],
      exercices: [
        {
          titre: "Le centre de tri",
          enonce:
            "Un centre de tri reçoit des bouteilles : $70$ % en plastique ($P$), les autres en verre. Parmi les bouteilles en plastique, $90$ % sont bien triées par les habitants ($T$) ; parmi celles en verre, $95$ %.\na) Construire l'arbre pondéré.\nb) Lire $P_{\\overline{P}}(\\overline{T})$ et l'écrire par une phrase.",
          correction:
            "a) Premier niveau : $P$ avec $0{,}7$, $\\overline{P}$ (verre) avec $0{,}3$.\nDerrière $P$ : $T$ avec $0{,}9$, $\\overline{T}$ avec $0{,}1$. Derrière $\\overline{P}$ : $T$ avec $0{,}95$, $\\overline{T}$ avec $0{,}05$.\nb) $P_{\\overline{P}}(\\overline{T}) = 0{,}05$ : « parmi les bouteilles en verre, $5$ % sont mal triées ».\n⚠️ Ce n'est pas « $5$ % des bouteilles sont du verre mal trié » : ce serait tout un chemin, pas une branche.",
          schema: ecranSeulement(
            arbre([
              { label: "P", proba: "0,7", enfants: [{ label: "T", proba: "0,9" }, { label: "non T", proba: "0,1" }] },
              { label: "non P", proba: "0,3", enfants: [{ label: "T", proba: "0,95" }, { label: "non T", proba: "0,05" }] },
            ]),
          ),
          micros: ["alea_arbre_construire"],
        },
        {
          titre: "Le signal binaire",
          enonce:
            "Un émetteur envoie des bits dans un câble : $60$ % de « $1$ », $40$ % de « $0$ ». À cause du bruit électrique, un « $1$ » est bien reçu comme « $1$ » avec la probabilité $0{,}95$, et un « $0$ » est bien reçu comme « $0$ » avec la probabilité $0{,}9$.\na) Construire l'arbre : bit émis, puis bit reçu.\nb) Quelles branches représentent une ERREUR de transmission ? Quelles probabilités portent-elles ?\nc) Écrire par une phrase la probabilité portée par la branche « Émis 0 » vers « Reçu 1 ».",
          correction:
            "a) Premier niveau : « Émis 1 » avec $0{,}6$, « Émis 0 » avec $0{,}4$.\nDerrière « Émis 1 » : « Reçu 1 » avec $0{,}95$, « Reçu 0 » avec $1 - 0{,}95 = 0{,}05$.\nDerrière « Émis 0 » : « Reçu 0 » avec $0{,}9$, « Reçu 1 » avec $0{,}1$.\nb) Une erreur, c'est recevoir l'autre bit : « Émis 1 » vers « Reçu 0 » ($0{,}05$), et « Émis 0 » vers « Reçu 1 » ($0{,}1$).\nc) « Quand l'émetteur envoie un $0$, il est reçu comme un $1$ une fois sur dix. »\n⭐ Les ingénieurs ajoutent des bits de contrôle pour repérer ces erreurs : c'est ce qui rend nos échanges numériques fiables.",
          schema: arbre([
            { label: "Émis 1", proba: "0,6", enfants: [{ label: "Reçu 1", proba: "0,95" }, { label: "Reçu 0", proba: "0,05" }] },
            { label: "Émis 0", proba: "0,4", enfants: [{ label: "Reçu 1", proba: "0,1" }, { label: "Reçu 0", proba: "0,9" }] },
          ]),
          micros: ["alea_arbre_construire", "alea_arbre_lire"],
        },
        {
          titre: "D'où viennent les habitants ?",
          enonce:
            "Dans une région (modèle), $60$ % des habitants y sont nés, $30$ % viennent d'une autre région de France et $10$ % de l'étranger. Parmi les natifs, $50$ % vivent en ville ($V$) ; parmi ceux venus d'une autre région, $80$ % ; parmi ceux venus de l'étranger, $90$ %.\na) Construire l'arbre pondéré, avec trois branches au premier niveau.\nb) Que remarque-t-on sur les nouveaux arrivants ?",
          correction:
            "a) Premier niveau : « Région » $0{,}6$, « Autre région » $0{,}3$, « Étranger » $0{,}1$. Vérification : $0{,}6 + 0{,}3 + 0{,}1 = 1$.\nDerrière chacun, $V$ et $\\overline{V}$ : $0{,}5$ et $0{,}5$ ; $0{,}8$ et $0{,}2$ ; $0{,}9$ et $0{,}1$.\nb) Les habitants venus d'ailleurs vivent bien plus souvent en ville que les natifs : $80$ % et $90$ %, contre $50$ %.\n⭐ En géographie, on dit que les villes concentrent les migrants : c'est là que sont les emplois et les logements.",
          schema: arbre([
            { label: "Région", proba: "0,6", enfants: [{ label: "V", proba: "0,5" }, { label: "non V", proba: "0,5" }] },
            { label: "Autre région", proba: "0,3", enfants: [{ label: "V", proba: "0,8" }, { label: "non V", proba: "0,2" }] },
            { label: "Étranger", proba: "0,1", enfants: [{ label: "V", proba: "0,9" }, { label: "non V", proba: "0,1" }] },
          ]),
          micros: ["alea_arbre_construire"],
        },
        {
          titre: "Les pénalités au rugby",
          enonce:
            "Un buteur de rugby tente des pénalités de près ou de loin, puis les réussit ($R$) ou non. Compléter l'arbre, puis dire en une phrase ce que signifie le $0{,}5$ de l'arbre.",
          figure: arbre([
            { label: "Près", proba: "0,55", enfants: [{ label: "R", proba: "0,9" }, { label: "non R", proba: "?" }] },
            { label: "Loin", proba: "?", enfants: [{ label: "R", proba: "?" }, { label: "non R", proba: "0,5" }] },
          ]),
          correction:
            "Au départ : $P(\\text{Loin}) = 1 - 0{,}55 = 0{,}45$.\nDerrière « Près » : $P_{\\text{Près}}(\\overline{R}) = 1 - 0{,}9 = 0{,}1$.\nDerrière « Loin » : $P_{\\text{Loin}}(R) = 1 - 0{,}5 = 0{,}5$.\nLe $0{,}5$ de l'énoncé est $P_{\\text{Loin}}(\\overline{R})$ : « de loin, le buteur manque une pénalité sur deux ».\n⚠️ Ce n'est pas « la moitié des pénalités sont des échecs de loin » : la branche ne parle que des tirs de loin.",
          schema: ecranSeulement(
            arbre([
              { label: "Près", proba: "0,55", enfants: [{ label: "R", proba: "0,9" }, { label: "non R", proba: "0,1" }] },
              { label: "Loin", proba: "0,45", enfants: [{ label: "R", proba: "0,5" }, { label: "non R", proba: "0,5" }] },
            ]),
          ),
          micros: ["alea_arbre_completer", "alea_arbre_lire"],
        },
        {
          titre: "Le gland et le chêne",
          enonce:
            "Un gland tombe d'un chêne. Il est mangé par un animal (geai, écureuil, sanglier…) avec la probabilité $0{,}7$ ($M$). S'il n'est pas mangé, il germe ($G$) avec la probabilité $0{,}4$ (modèle).\na) Construire l'arbre pondéré.\nb) Pourquoi la branche $M$ n'a-t-elle pas de suite ?",
          correction:
            "a) Premier niveau : $M$ avec $0{,}7$, $\\overline{M}$ avec $0{,}3$.\nDerrière $\\overline{M}$ : $G$ avec $0{,}4$, $\\overline{G}$ avec $0{,}6$.\nb) Un gland mangé ne peut plus germer : l'expérience s'arrête là. Rien à écrire derrière $M$.\n⭐ Un arbre n'a pas besoin d'être symétrique : il suit l'histoire racontée par l'énoncé.\n⭐ Le geai, qui enterre des glands pour l'hiver et en oublie, plante aussi des chênes.",
          schema: ecranSeulement(
            arbre([
              { label: "M", proba: "0,7" },
              { label: "non M", proba: "0,3", enfants: [{ label: "G", proba: "0,4" }, { label: "non G", proba: "0,6" }] },
            ]),
          ),
          micros: ["alea_arbre_construire"],
        },
        {
          titre: "Le panier du site marchand",
          enonce:
            "Sur un site marchand (modèle), un visiteur met un article dans son panier, puis achète ou non. L'arbre décrit un visiteur choisi au hasard.\na) Lire la probabilité qu'un visiteur mette un article dans son panier.\nb) Lire la probabilité qu'un visiteur achète, sachant qu'il a rempli son panier. L'écrire par une phrase.\nc) Pourquoi la branche « non Panier » n'a-t-elle pas de suite ?",
          figure: arbre([
            { label: "Panier", proba: "0,2", enfants: [{ label: "Achat", proba: "0,4" }, { label: "non Achat", proba: "0,6" }] },
            { label: "non Panier", proba: "0,8" },
          ]),
          correction:
            "a) Premier niveau : $P(\\text{Panier}) = 0{,}2$. Un visiteur sur cinq remplit un panier.\nb) La branche de « Panier » vers « Achat » : $P_{\\text{Panier}}(\\text{Achat}) = 0{,}4$.\n« Parmi les visiteurs qui ont rempli un panier, $40$ % achètent. »\nc) Sans panier, pas d'achat : l'histoire s'arrête.\n⚠️ $0{,}4$ n'est pas la part des visiteurs qui achètent : c'est leur part PARMI ceux qui ont rempli un panier. Les $60$ % d'abandons s'appellent, dans le commerce en ligne, des « paniers abandonnés ».",
          micros: ["alea_arbre_lire"],
        },
        {
          titre: "La grippe et le vaccin",
          enonce:
            "Dans une entreprise (modèle), $40$ % des salariés se sont fait vacciner contre la grippe ($V$). Pendant l'hiver, $5$ % des vaccinés attrapent la grippe ($G$), contre $20$ % des non-vaccinés.\na) Construire l'arbre pondéré.\nb) Écrire par une phrase la probabilité portée par la branche $\\overline{V} \\to \\overline{G}$.",
          correction:
            "a) Premier niveau : $V$ avec $0{,}4$, $\\overline{V}$ avec $0{,}6$.\nDerrière $V$ : $G$ avec $0{,}05$, $\\overline{G}$ avec $0{,}95$.\nDerrière $\\overline{V}$ : $G$ avec $0{,}2$, $\\overline{G}$ avec $0{,}8$.\nb) $P_{\\overline{V}}(\\overline{G}) = 0{,}8$ : « parmi les salariés non vaccinés, $80$ % n'attrapent pas la grippe ».\n⭐ Le premier niveau est ce qui vient AVANT dans le temps : on se vaccine à l'automne, la grippe arrive l'hiver.",
          schema: ecranSeulement(
            arbre([
              { label: "V", proba: "0,4", enfants: [{ label: "G", proba: "0,05" }, { label: "non G", proba: "0,95" }] },
              { label: "non V", proba: "0,6", enfants: [{ label: "G", proba: "0,2" }, { label: "non G", proba: "0,8" }] },
            ]),
          ),
          micros: ["alea_arbre_construire"],
        },
        {
          titre: "Le parc national",
          enonce:
            "Les visiteurs d'un parc national arrivent à pied, à vélo ou en voiture, puis restent la journée ($J$) ou non. Compléter l'arbre, puis dire quel moyen d'arrivée va le plus souvent avec une visite d'une journée.",
          figure: arbre([
            { label: "Pied", proba: "0,25", enfants: [{ label: "J", proba: "0,8" }, { label: "non J", proba: "?" }] },
            { label: "Vélo", proba: "0,15", enfants: [{ label: "J", proba: "?" }, { label: "non J", proba: "0,4" }] },
            { label: "Voiture", proba: "?", enfants: [{ label: "J", proba: "0,3" }, { label: "non J", proba: "?" }] },
          ]),
          correction:
            "Au départ : $P(\\text{Voiture}) = 1 - 0{,}25 - 0{,}15 = 0{,}6$.\nDerrière « Pied » : $1 - 0{,}8 = 0{,}2$. Derrière « Vélo » : $1 - 0{,}4 = 0{,}6$. Derrière « Voiture » : $1 - 0{,}3 = 0{,}7$.\nOn compare les branches qui vont vers $J$ : $0{,}8$ à pied, $0{,}6$ à vélo, $0{,}3$ en voiture.\nCe sont les visiteurs à pied qui restent le plus souvent la journée.\n⚠️ On compare des probabilités SACHANT le moyen d'arrivée, pas les nombres de visiteurs : les automobilistes sont les plus nombreux.",
          schema: ecranSeulement(
            arbre([
              { label: "Pied", proba: "0,25", enfants: [{ label: "J", proba: "0,8" }, { label: "non J", proba: "0,2" }] },
              { label: "Vélo", proba: "0,15", enfants: [{ label: "J", proba: "0,6" }, { label: "non J", proba: "0,4" }] },
              { label: "Voiture", proba: "0,6", enfants: [{ label: "J", proba: "0,3" }, { label: "non J", proba: "0,7" }] },
            ]),
          ),
          micros: ["alea_arbre_completer", "alea_arbre_lire"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Construire l'arbre d'une situation, le vérifier, puis le lire par des phrases.",
      rappel: [
        "On repère d'abord les deux étapes de l'expérience, dans l'ordre du temps.",
        "On vérifie l'arbre : à chaque nœud, la somme vaut $1$.",
        "Un arbre donne $P_A(B)$, jamais directement $P_B(A)$ : pour « retourner », il faudra calculer.",
      ],
      exercices: [
        {
          titre: "Le contrôle des lentilles",
          enonce:
            "Un atelier d'optique contrôle des lentilles. Premier test, la distance focale : $90$ % des lentilles le réussissent ($F$). Une lentille qui réussit ce test est ensuite acceptée ($C$) avec la probabilité $0{,}95$ (contrôle des rayures). Une lentille qui échoue est repolie, puis acceptée avec la probabilité $0{,}6$.\na) Construire l'arbre pondéré.\nb) Écrire par une phrase la probabilité $P_{\\overline{F}}(C)$.\nc) Peut-on LIRE sur l'arbre la probabilité qu'une lentille acceptée ait réussi le premier test ?",
          correction:
            "a) Premier niveau : $F$ avec $0{,}9$, $\\overline{F}$ avec $0{,}1$.\nDerrière $F$ : $C$ avec $0{,}95$, $\\overline{C}$ avec $0{,}05$.\nDerrière $\\overline{F}$ : $C$ avec $0{,}6$, $\\overline{C}$ avec $0{,}4$.\nb) $P_{\\overline{F}}(C) = 0{,}6$ : « parmi les lentilles qui ont échoué au premier test, $60$ % sont acceptées après polissage ».\nc) Non. Cette probabilité est $P_C(F)$ : on SAIT que la lentille est acceptée. L'arbre ne porte que des probabilités « sachant $F$ » ou « sachant $\\overline{F}$ ».\n⛔ $P_C(F)$ n'est pas $P_F(C) = 0{,}95$. Il faudra la calculer (chapitre suivant).",
          schema: arbre([
            { label: "F", proba: "0,9", enfants: [{ label: "C", proba: "0,95" }, { label: "non C", proba: "0,05" }] },
            { label: "non F", proba: "0,1", enfants: [{ label: "C", proba: "0,6" }, { label: "non C", proba: "0,4" }] },
          ]),
          micros: ["alea_arbre_construire", "alea_arbre_lire"],
        },
        {
          titre: "L'émigration vers les Amériques",
          enonce:
            "Au XIXᵉ siècle, des millions d'Européens émigrent vers les Amériques. On imagine un émigrant choisi au hasard dans un registre (modèle). Il embarque au Havre avec la probabilité $0{,}5$, à Brême avec la probabilité $0{,}3$, dans un autre port sinon. Parmi ceux du Havre, $90$ % vont aux États-Unis ($E$) ; parmi ceux de Brême, $80$ % ; parmi les autres, $60$ %. Les autres vont ailleurs en Amérique.\na) Construire l'arbre pondéré.\nb) Vérifier l'arbre nœud par nœud.\nc) Écrire par une phrase le nombre porté par la branche « Autre » vers « non E ».",
          correction:
            "a) Premier niveau : « Le Havre » $0{,}5$, « Brême » $0{,}3$, « Autre » $1 - 0{,}5 - 0{,}3 = 0{,}2$.\nDerrière chacun : $E$ et $\\overline{E}$, avec $0{,}9$ et $0{,}1$ ; $0{,}8$ et $0{,}2$ ; $0{,}6$ et $0{,}4$.\nb) $0{,}5 + 0{,}3 + 0{,}2 = 1$, puis $0{,}9 + 0{,}1 = 1$, $0{,}8 + 0{,}2 = 1$, $0{,}6 + 0{,}4 = 1$. L'arbre est cohérent.\nc) $P_{\\text{Autre}}(\\overline{E}) = 0{,}4$ : « parmi les émigrants partis d'un autre port, $40$ % vont ailleurs qu'aux États-Unis ».\n⭐ Trois branches au premier niveau, deux au second : l'arbre suit les étapes du voyage, le port puis la destination.",
          schema: arbre([
            { label: "Le Havre", proba: "0,5", enfants: [{ label: "E", proba: "0,9" }, { label: "non E", proba: "0,1" }] },
            { label: "Brême", proba: "0,3", enfants: [{ label: "E", proba: "0,8" }, { label: "non E", proba: "0,2" }] },
            { label: "Autre", proba: "0,2", enfants: [{ label: "E", proba: "0,6" }, { label: "non E", proba: "0,4" }] },
          ]),
          micros: ["alea_arbre_construire", "alea_arbre_completer", "alea_arbre_lire"],
        },
        {
          titre: "Les tirs au but",
          enonce:
            "Un attaquant tire ses penalties à gauche, au centre ou à droite, puis le gardien arrête le tir ($A$) ou non. L'arbre vient des statistiques d'une saison (modèle).\na) Compléter l'arbre.\nb) De quel côté l'attaquant a-t-il le plus de chances de marquer ?\nc) Un supporter dit : « il tire le moins souvent au centre, donc c'est là qu'il marque le moins ». Que penser de ce raisonnement ?",
          figure: arbre([
            { label: "Gauche", proba: "0,4", enfants: [{ label: "A", proba: "0,3" }, { label: "non A", proba: "?" }] },
            { label: "Centre", proba: "?", enfants: [{ label: "A", proba: "?" }, { label: "non A", proba: "0,6" }] },
            { label: "Droite", proba: "0,45", enfants: [{ label: "A", proba: "0,25" }, { label: "non A", proba: "?" }] },
          ]),
          correction:
            "a) Au départ : $P(\\text{Centre}) = 1 - 0{,}4 - 0{,}45 = 0{,}15$.\nDerrière « Gauche » : $1 - 0{,}3 = 0{,}7$. Derrière « Centre » : $1 - 0{,}6 = 0{,}4$. Derrière « Droite » : $1 - 0{,}25 = 0{,}75$.\nb) Marquer, c'est « non $A$ ». On lit : $0{,}7$ à gauche, $0{,}6$ au centre, $0{,}75$ à droite. C'est à droite qu'il marque le plus souvent.\nc) Le raisonnement mélange deux choses. $0{,}15$ dit combien de fois il tire au centre ; $0{,}6$ dit comment le tir finit, SACHANT qu'il est au centre.\nC'est vrai ici, il marque moins souvent au centre, mais pour une autre raison : $0{,}6$ est la plus petite des trois branches « non $A$ ».",
          schema: ecranSeulement(
            arbre([
              { label: "Gauche", proba: "0,4", enfants: [{ label: "A", proba: "0,3" }, { label: "non A", proba: "0,7" }] },
              { label: "Centre", proba: "0,15", enfants: [{ label: "A", proba: "0,4" }, { label: "non A", proba: "0,6" }] },
              { label: "Droite", proba: "0,45", enfants: [{ label: "A", proba: "0,25" }, { label: "non A", proba: "0,75" }] },
            ]),
          ),
          micros: ["alea_arbre_completer", "alea_arbre_lire"],
        },
        {
          titre: "Les déchets du littoral",
          enonce:
            "Lors d'un ramassage sur une plage (modèle), on classe chaque déchet : plastique ($60$ %), verre ($10$ %) ou autre. Puis on regarde s'il est recyclable ($R$) : c'est le cas de la moitié des plastiques, de $90$ % du verre et de $20$ % des autres déchets.\na) Construire l'arbre pondéré.\nb) Écrire par une phrase la probabilité portée par la branche « Plastique » vers « non R ».\nc) Quelle famille de déchets est la mieux recyclable ? La plus présente ?",
          correction:
            "a) Premier niveau : « Plastique » $0{,}6$, « Verre » $0{,}1$, « Autre » $1 - 0{,}6 - 0{,}1 = 0{,}3$.\nDerrière chacun, $R$ et $\\overline{R}$ : $0{,}5$ et $0{,}5$ ; $0{,}9$ et $0{,}1$ ; $0{,}2$ et $0{,}8$.\nb) $P_{\\text{Plastique}}(\\overline{R}) = 0{,}5$ : « parmi les déchets en plastique, la moitié ne sont pas recyclables ».\nc) Le mieux recyclable : le verre, avec $0{,}9$ sur sa branche $R$. Le plus présent : le plastique, avec $0{,}6$ au premier niveau.\n⭐ Les deux questions se lisent à deux niveaux différents de l'arbre : le premier dit « combien », le second dit « comment ».",
          schema: arbre([
            { label: "Plastique", proba: "0,6", enfants: [{ label: "R", proba: "0,5" }, { label: "non R", proba: "0,5" }] },
            { label: "Verre", proba: "0,1", enfants: [{ label: "R", proba: "0,9" }, { label: "non R", proba: "0,1" }] },
            { label: "Autre", proba: "0,3", enfants: [{ label: "R", proba: "0,2" }, { label: "non R", proba: "0,8" }] },
          ]),
          micros: ["alea_arbre_construire", "alea_arbre_lire"],
        },
      ],
    },
  ],
};
