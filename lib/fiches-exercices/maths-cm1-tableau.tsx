// ─── Fiche d'exercices : lire et compléter un tableau (CM1) — 20 exercices ─────
//
// 21/10/2026 : une des PREMIÈRES feuilles d'exercices de maths du CM, sur le
// modèle de `maths-6e-stat-donnee.tsx` (aides de dessin locales, sans largeur
// minimale, mesurées pour 375 px).
//
// Pas de fiche de cours de CM1 (fichesCours: []). L'esprit est celui de la
// fiche de CM2 `lib/fiches/maths-cm2-tableaux.tsx`, en plus simple. Alignée sur
// la banque `lib/tutor-v4/questionBank/cm1/maths/tableaux.bank.ts`, notionId
// tableau : lire une case (une ligne, puis le croisement d'une ligne et d'une
// colonne), compléter (la case total, la case vide à partir du total),
// interpréter (le plus, le moins, l'écart, le total d'une ligne ou d'une
// colonne), défis (total général, objectif à atteindre, comparer des totaux).
// ⛔ LIMITES DU CM1 : des nombres entiers, pas de moyenne, pas de pourcentage,
// pas de nombre négatif. Additions, soustractions, une multiplication simple.
// ⛔ Aucun exemple de la fiche de cours de CM2 (ananas 18 / 24 / 20, bananes
// 30 / 28 / 35, mangues 12 / 15 / 18, les fruits par jour de la semaine).
// ⭐ Des élèves qui lisent difficilement : phrases de 10 mots en moyenne, une
// idée par phrase, du texte simple (pas de KaTeX), « − » pour la soustraction,
// « × » pour la multiplication, l'espace insécable des milliers (1 800).
//
// Les pièges nommés : la case voisine (1), la ligne pour la colonne (2, 9, 13),
// oublier une ligne dans le total (3), le total moins une seule case (4),
// comparer les premiers chiffres au lieu des nombres (5), soustraire à
// l'envers (6), oublier qu'un match se joue à deux équipes (7), croire un total
// sans le vérifier (8), deux cases égales (9), la case total prise pour un
// groupe de plus (10), « deux fois plus » à l'œil (11), répondre ce qui est
// gagné au lieu de ce qui manque (12), la plus grande valeur prise pour la
// seule (14), ajouter le total aux autres cases (15), additionner les animaux
// au lieu des pattes (16), un total qui monte ne dit pas que chaque case monte
// (17), les matchs gagnés pris pour les points (18), les passagers montés pris
// pour ceux qui sont dans le bus (19), croire un gros titre sans calculer (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : musique (1, 15), sport (2, 7, 18), apiculture
// (3), ferme pédagogique (4), cinéma (5), lecture (6), boulangerie (8),
// transports (9, 19), cantine (10), météo (11), sortie scolaire (12), danse et
// judo (13), histoire (14), sciences de la vie (16), biologie marine (17,
// le seul décor de La Réunion), festival de musique (20).
// Les métiers des problèmes : biologiste marine (17), entraîneuse (18),
// chauffeur de bus (19), organisatrice de festival (20).
//
// ⭐ DEUX FAITS RÉELS, et leurs sources :
//   · ex. 7 — les joueurs d'une équipe sur le terrain : football 11 (Lois du
//     jeu de l'IFAB, loi 3), rugby à XV 15 (World Rugby, règle 3), handball 7
//     (règles de l'IHF, règle 4), basket 5 (règles officielles de la FIBA, art. 4) ;
//   · ex. 16 — un insecte a 6 pattes, une araignée en a 8 (classification des
//     arthropodes : insectes hexapodes, arachnides à quatre paires de pattes).
// Tout le reste est un MODÈLE, à des ordres de grandeur vraisemblables.
//
// ⭐ LES DESSINS : une aide locale, `grille` (tableau HTML, QUATRE colonnes au
// plus, textes courts : il tient dans 235 px sans défiler). Elle peut surligner
// une case (`case`), une ligne (`ligne`), une colonne (`colonne`), et mettre en
// gras la dernière ligne (`total`). Une case « ? » est la case à trouver.
// 14 dessins imprimés ; les schémas du corrigé (la case trouvée, le tableau
// complété) sont `ecranSeulement`, et les données sont alors dans l'énoncé.
//
// Les corrigés sont écrits à la première personne (« je lis », « je pose le
// doigt »), étape par étape, avec le pourquoi et le piège nommé.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-cm1-tableau.mjs` —
// chaque case relue dans la grille ou dans l'énoncé, chaque total, écart, case
// manquante et produit refait, et cherché dans le corrigé.
//
// Micro-compétences : tableau_lire (1, 2, 9, 14, 16, 17, 18, 19),
// tableau_completer (3, 4, 8, 10, 13, 15, 19, 20), tableau_interpreter (5, 6,
// 9, 10, 11, 14, 15, 17, 18, 19, 20), tableau_defi (7, 8, 12, 16, 17, 18, 19,
// 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

type OptionsGrille = {
  /** La dernière ligne est la ligne « total » : en gras. */
  total?: boolean;
  /** La case trouvée : [ligne, colonne], comptées à partir de 0 (l'en-tête n'est pas une ligne). */
  case?: [number, number];
  /** Une ligne suivie du doigt (fond bleu clair). */
  ligne?: number;
  /** Une colonne suivie du doigt (fond bleu clair). */
  colonne?: number;
};

/**
 * Un TABLEAU HTML : l'en-tête, puis les lignes. QUATRE colonnes au plus, textes
 * courts (le script vérifie : 7 signes par case à 4 colonnes, 10 à 3, 16 à 2).
 * Une case « ? » est en orange : c'est la case à trouver. La case surlignée
 * (`case`) est orange, la ligne ou la colonne suivie est bleu clair.
 * ⛔ Texte NU dans les cases. ⭐ Le script relit les arguments : les écrire en clair.
 */
const grille = (entetes: string[], lignes: string[][], opts: OptionsGrille = {}) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[14rem]">
    <table className="w-full border-collapse text-center text-[14px] print:text-[10px]">
      <thead>
        <tr>
          {entetes.map((e, j) => (
            <th
              key={j}
              className={`border border-slate-400 px-1 py-1 font-bold text-slate-800 ${opts.colonne === j ? "bg-sky-200" : "bg-slate-100"}`}
            >
              {e}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => (
          <tr key={i} className={opts.total && i === lignes.length - 1 ? "font-bold" : ""}>
            {l.map((c, j) => {
              const trouvee = opts.case !== undefined && opts.case[0] === i && opts.case[1] === j;
              const suivie = opts.ligne === i || opts.colonne === j;
              const inconnue = c === "?";
              const fond = trouvee ? "bg-orange-200" : inconnue ? "bg-orange-50" : suivie ? "bg-sky-100" : j === 0 ? "bg-slate-50" : "bg-white";
              return (
                <td
                  key={j}
                  className={`border border-slate-400 px-1 py-1 text-slate-900 ${fond} ${trouvee || inconnue ? "font-black text-orange-700" : j === 0 ? "font-semibold" : ""}`}
                >
                  {c}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export const exercicesTableauCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "tableau",
  titre: "Lire et compléter un tableau",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire une case. Trouver une ligne et une colonne. Calculer un total, une case vide, un écart. Vérifier qu'un total est juste. De la musique, du sport, des abeilles, un cinéma, des tortues, un bus et un festival. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je lis le titre, puis je cherche la bonne case.",
      rappel: [
        "Un tableau range des nombres en lignes et en colonnes.",
        "Pour lire une case, je pose le doigt sur la ligne. Je le glisse jusqu'à la colonne.",
        "Le total, c'est la somme de toutes les cases.",
      ],
      exercices: [
        {
          enonce:
            "Une école de musique compte ses élèves. Le tableau donne le nombre d'élèves par instrument.\na) Combien d'élèves jouent du piano ?\nb) Quel instrument a 11 élèves ?\nc) Quel instrument a le plus d'élèves ?\nd) Quel instrument a le moins d'élèves ?",
          figure: grille(["instrument", "élèves"], [
            ["guitare", "14"],
            ["piano", "9"],
            ["violon", "6"],
            ["batterie", "11"],
          ]),
          correction:
            "a) Je cherche la ligne « piano ». Je glisse le doigt vers la droite. Je lis 9.\nb) Je cherche 11 dans la colonne « élèves ». Il est sur la ligne « batterie ».\nc) Le plus grand nombre est 14 : c'est la guitare.\nd) Le plus petit nombre est 6 : c'est le violon.\n⛔ Le piège : lire la case d'à côté. Juste en dessous du 9, il y a le 6 du violon. Je garde le doigt sur la bonne ligne.\nRéponse : a) 9 élèves ; b) la batterie ; c) la guitare ; d) le violon.",
          schema: ecranSeulement(
            grille(["instrument", "élèves"], [
              ["guitare", "14"],
              ["piano", "9"],
              ["violon", "6"],
              ["batterie", "11"],
            ], { ligne: 1, case: [1, 1] }),
          ),
          micros: ["tableau_lire"],
        },
        {
          enonce:
            "Une piscine compte ses entrées pendant trois jours.\na) Combien d'adultes le mercredi ?\nb) Combien d'enfants le samedi ?\nc) Combien d'enfants le lundi ?\nd) Dans quelle case lis-tu 75 ?",
          figure: grille(["jour", "enfants", "adultes"], [
            ["lundi", "35", "62"],
            ["mercredi", "84", "40"],
            ["samedi", "96", "75"],
          ]),
          correction:
            "Une case est au croisement d'une ligne et d'une colonne.\na) Je pose le doigt sur la ligne « mercredi ». Je le glisse jusqu'à la colonne « adultes ». Je lis 40.\nb) Ligne « samedi », colonne « enfants » : je lis 96.\nc) Ligne « lundi », colonne « enfants » : je lis 35.\nd) Le 75 est sur la ligne « samedi », dans la colonne « adultes ». Ce sont les adultes du samedi.\n⛔ Le piège : prendre la bonne ligne, mais la mauvaise colonne. Au a), la case des enfants donne 84, pas 40.\nRéponse : a) 40 adultes ; b) 96 enfants ; c) 35 enfants ; d) les adultes du samedi.",
          schema: ecranSeulement(
            grille(["jour", "enfants", "adultes"], [
              ["lundi", "35", "62"],
              ["mercredi", "84", "40"],
              ["samedi", "96", "75"],
            ], { ligne: 1, colonne: 2, case: [1, 2] }),
          ),
          micros: ["tableau_lire"],
        },
        {
          enonce:
            "Un apiculteur a trois ruchers. Il pèse le miel récolté cet été. Rucher du bois : 18 kg. Rucher du pré : 25 kg. Rucher du verger : 12 kg.\na) Combien de kilos de miel en tout ?\nb) Vérifie ton total : additionne dans un autre ordre.",
          correction:
            "a) Le total, c'est la somme de toutes les cases.\nJ'additionne les trois ruchers : 18 + 25 + 12 = 55 kg.\nb) Je change l'ordre : 12 + 18 = 30, puis 30 + 25 = 55.\nJe retrouve 55 kg : mon total est juste.\n⛔ Le piège : oublier une ligne. Je coche chaque rucher quand je l'ajoute.\nRéponse : a) 55 kg de miel ; b) je retrouve 55.",
          schema: ecranSeulement(
            grille(["rucher", "miel (kg)"], [
              ["bois", "18"],
              ["pré", "25"],
              ["verger", "12"],
              ["total", "55"],
            ], { total: true, case: [3, 1] }),
          ),
          micros: ["tableau_completer"],
        },
        {
          enonce:
            "Une ferme pédagogique accueille les classes. Elle a 40 animaux en tout. Le tableau donne le nombre de chaque animal.\na) Combien y a-t-il de chèvres ?\nb) Vérifie : les trois animaux ensemble doivent faire 40.",
          figure: grille(["animal", "nombre"], [
            ["poules", "17"],
            ["lapins", "9"],
            ["chèvres", "?"],
            ["total", "40"],
          ], { total: true }),
          correction:
            "a) Le total est 40. J'additionne d'abord les animaux connus : 17 + 9 = 26.\nLes chèvres, c'est ce qui reste : 40 − 26 = 14 chèvres.\nb) Je vérifie : 17 + 9 + 14 = 40. Le compte est bon.\n⛔ Le piège : faire 40 − 17 = 23 et s'arrêter. J'enlève TOUTES les cases connues, pas une seule.\nRéponse : a) 14 chèvres ; b) 17 + 9 + 14 = 40.",
          schema: ecranSeulement(
            grille(["animal", "nombre"], [
              ["poules", "17"],
              ["lapins", "9"],
              ["chèvres", "14"],
              ["total", "40"],
            ], { total: true, case: [2, 1] }),
          ),
          micros: ["tableau_completer"],
        },
        {
          enonce:
            "Un cinéma compte les entrées de quatre films, un samedi.\na) Quel film a eu le plus d'entrées ?\nb) Quel film a eu le moins d'entrées ?\nc) Range les films, du plus vu au moins vu.",
          figure: grille(["film", "entrées"], [
            ["dessin animé", "124"],
            ["aventure", "98"],
            ["comédie", "131"],
            ["documentaire", "47"],
          ]),
          correction:
            "a) Je compare les nombres. 131 est le plus grand : c'est la comédie.\nb) 47 est le plus petit : c'est le documentaire.\nc) Je range : 131, puis 124, puis 98, puis 47.\nL'ordre est : comédie, dessin animé, aventure, documentaire.\n⛔ Le piège : croire que 98 est grand, à cause de son 9. 98 a deux chiffres : il est plus petit que 124, qui en a trois.\nRéponse : a) la comédie ; b) le documentaire ; c) comédie, dessin animé, aventure, documentaire.",
          micros: ["tableau_interpreter"],
        },
        {
          enonce:
            "Trois amis notent les pages lues cette semaine. Inès : 74 pages. Tom : 58 pages. Sacha : 91 pages.\na) Combien de pages Inès a-t-elle lues de plus que Tom ?\nb) Combien de pages Sacha a-t-il lues de plus qu'Inès ?\nc) Combien de pages Sacha a-t-il lues de plus que Tom ?",
          correction:
            "Pour « combien de plus », je fais une soustraction : le grand moins le petit.\na) 74 − 58 = 16 pages de plus.\nb) 91 − 74 = 17 pages de plus.\nc) 91 − 58 = 33 pages de plus.\nJe vérifie : 16 + 17 = 33. Les trois réponses vont ensemble.\n⛔ Le piège : écrire 58 − 74. Je pose toujours le grand nombre en premier.\nRéponse : a) 16 pages ; b) 17 pages ; c) 33 pages.",
          schema: ecranSeulement(
            grille(["lecteur", "pages"], [
              ["Inès", "74"],
              ["Tom", "58"],
              ["Sacha", "91"],
            ]),
          ),
          micros: ["tableau_interpreter"],
        },
        {
          enonce:
            "Le tableau donne le nombre de joueurs d'UNE équipe sur le terrain. Ces nombres sont vrais : ce sont les règles de chaque sport. Un match oppose deux équipes.\na) Combien de joueurs sur le terrain pendant un match de football ?\nb) Et pendant un match de rugby à XV ?\nc) Et pendant un match de basket ?",
          figure: grille(["sport", "joueurs"], [
            ["football", "11"],
            ["rugby à XV", "15"],
            ["handball", "7"],
            ["basket", "5"],
          ]),
          correction:
            "Un match se joue à deux équipes. Je double le nombre du tableau.\na) Football : 11 + 11 = 22 joueurs. C'est aussi 2 × 11 = 22.\nb) Rugby à XV : 2 × 15 = 30 joueurs.\nc) Basket : 2 × 5 = 10 joueurs.\n⛔ Le piège : répondre 11 pour le football. Le tableau compte UNE équipe, et le match en a deux.\nRéponse : a) 22 joueurs ; b) 30 joueurs ; c) 10 joueurs.",
          micros: ["tableau_defi"],
        },
        {
          enonce:
            "Un boulanger note ses ventes du matin. Il a écrit le total en bas du tableau.\na) Additionne les trois produits.\nb) Le total du boulanger est-il juste ?\nc) Quel total faut-il écrire ?",
          figure: grille(["produit", "vendus"], [
            ["baguettes", "85"],
            ["croissants", "40"],
            ["brioches", "35"],
            ["total", "150"],
          ], { total: true }),
          correction:
            "a) 85 + 40 + 35 = 160.\nJe vérifie dans un autre ordre : 40 + 35 = 75, puis 75 + 85 = 160.\nb) Le boulanger a écrit 150. Ce n'est pas 160 : son total est faux.\nc) Il faut écrire 160. Il manquait 160 − 150 = 10 produits.\n⛔ Le piège : croire le total écrit sans le vérifier. Un total se vérifie toujours par l'addition.\nRéponse : a) 160 ; b) non, il est faux ; c) 160.",
          schema: ecranSeulement(
            grille(["produit", "vendus"], [
              ["baguettes", "85"],
              ["croissants", "40"],
              ["brioches", "35"],
              ["total", "160"],
            ], { total: true, case: [3, 1] }),
          ),
          micros: ["tableau_completer", "tableau_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur le même tableau. Je lis, je calcule, puis je réponds par une phrase.",
      rappel: [
        "Le total d'une ligne : j'additionne les cases de cette ligne.",
        "Une case vide : le total moins les cases connues.",
        "« Combien de plus » : le grand nombre moins le petit.",
      ],
      exercices: [
        {
          enonce:
            "Un compteur note les véhicules qui passent dans une rue. Il compte le matin, puis le soir.\na) Combien de voitures le soir ?\nb) Les bus passent-ils plus le matin ou le soir ?\nc) Combien de vélos en tout dans la journée ?\nd) Combien de véhicules le matin ?",
          figure: grille(["véhicule", "matin", "soir"], [
            ["vélos", "46", "58"],
            ["voitures", "120", "134"],
            ["bus", "12", "12"],
          ]),
          correction:
            "a) Ligne « voitures », colonne « soir » : je lis 134.\nb) Ligne « bus » : 12 le matin, 12 le soir. C'est autant : ni plus le matin, ni plus le soir.\nc) Ligne « vélos » : 46 + 58 = 104 vélos.\nd) Colonne « matin » : 46 + 120 + 12 = 178 véhicules.\n⛔ Le piège au a) : lire 120, la case du matin. Je glisse le doigt jusqu'à la bonne colonne.\n⛔ Le piège au b) : répondre trop vite. Deux cases peuvent être égales.\nRéponse : a) 134 voitures ; b) autant le matin que le soir ; c) 104 vélos ; d) 178 véhicules.",
          micros: ["tableau_lire", "tableau_interpreter"],
        },
        {
          enonce:
            "La cantine compte les élèves qui mangent, deux jours de suite. Deux cases sont vides.\na) Combien de garçons le lundi ?\nb) Combien d'élèves en tout le mardi ?\nc) Le mardi, qui est le plus nombreux : les filles ou les garçons ? De combien ?",
          figure: grille(["jour", "filles", "garçons", "total"], [
            ["lundi", "64", "?", "131"],
            ["mardi", "58", "70", "?"],
          ]),
          correction:
            "Sur chaque ligne : filles + garçons = total.\na) Lundi : le total est 131, les filles sont 64. Garçons : 131 − 64 = 67.\nJe vérifie : 64 + 67 = 131.\nb) Mardi : 58 + 70 = 128 élèves.\nc) Mardi : 70 garçons et 58 filles. Les garçons sont plus nombreux : 70 − 58 = 12 de plus.\n⛔ Le piège : prendre la case « total » pour une case comme les autres. Le total n'est pas un groupe de plus : il réunit filles et garçons.\nRéponse : a) 67 garçons ; b) 128 élèves ; c) les garçons, 12 de plus.",
          schema: ecranSeulement(
            grille(["jour", "filles", "garçons", "total"], [
              ["lundi", "64", "67", "131"],
              ["mardi", "58", "70", "128"],
            ]),
          ),
          micros: ["tableau_completer", "tableau_interpreter"],
        },
        {
          enonce:
            "Une station météo note les jours de pluie de quatre mois. Janvier : 12 jours. Avril : 8 jours. Juillet : 4 jours. Octobre : 11 jours.\nVrai ou faux ? Explique avec les nombres.\na) « Juillet est le mois le plus pluvieux. »\nb) « Il a plu deux fois plus de jours en avril qu'en juillet. »\nc) « Sur les quatre mois, il a plu 36 jours. »\nd) « Janvier a un jour de pluie de plus qu'octobre. »",
          correction:
            "a) Faux. Le plus grand nombre est 12 : c'est janvier. Juillet est le MOINS pluvieux, avec 4 jours.\nb) Deux fois juillet : 2 × 4 = 8. Avril a bien 8 jours : vrai.\nc) 12 + 8 + 4 + 11 = 35 jours, pas 36 : faux.\nd) 12 − 11 = 1 : vrai.\n⛔ Le piège au b) : juger « deux fois plus » à l'œil. Je fais toujours le calcul.\nRéponse : a) faux ; b) vrai ; c) faux ; d) vrai.",
          schema: ecranSeulement(
            grille(["mois", "jours de pluie"], [
              ["janvier", "12"],
              ["avril", "8"],
              ["juillet", "4"],
              ["octobre", "11"],
            ]),
          ),
          micros: ["tableau_interpreter"],
        },
        {
          enonce:
            "Une classe vend des gâteaux pour payer une sortie au zoo. Il faut 200 € en tout. Lundi : 45 €. Mardi : 38 €. Jeudi : 52 €. Vendredi : 29 €.\na) Combien d'euros la classe a-t-elle gagnés en tout ?\nb) L'objectif de 200 € est-il atteint ?\nc) Combien d'euros manque-t-il ?",
          correction:
            "a) J'additionne les quatre jours : 45 + 38 + 52 + 29 = 164 €.\nJe vérifie par paires : 45 + 38 = 83, 52 + 29 = 81, puis 83 + 81 = 164.\nb) 164 est plus petit que 200 : l'objectif n'est pas atteint.\nc) Ce qui manque : 200 − 164 = 36 €.\n⛔ Le piège au c) : répondre 164. La question demande ce qui MANQUE, pas ce qui est gagné.\nRéponse : a) 164 € ; b) non ; c) 36 €.",
          schema: ecranSeulement(
            grille(["jour", "euros"], [
              ["lundi", "45"],
              ["mardi", "38"],
              ["jeudi", "52"],
              ["vendredi", "29"],
              ["total", "164"],
            ], { total: true, case: [4, 1] }),
          ),
          micros: ["tableau_defi"],
        },
        {
          enonce:
            "Dans une école, 26 élèves font du judo. Parmi eux, 11 sont des filles. 21 élèves font de la danse. Parmi eux, 17 sont des filles. Chaque élève fait un seul sport.\na) Combien de garçons font du judo ? Et de la danse ?\nb) Combien de filles en tout ?\nc) Combien de garçons en tout ?\nd) Combien d'élèves en tout ? Complète la ligne « total ».",
          figure: grille(["sport", "filles", "garçons", "total"], [
            ["judo", "11", "?", "26"],
            ["danse", "17", "?", "21"],
            ["total", "?", "?", "?"],
          ], { total: true }),
          correction:
            "Sur chaque ligne : filles + garçons = total.\na) Judo : 26 − 11 = 15 garçons. Danse : 21 − 17 = 4 garçons.\nb) Colonne « filles » : 11 + 17 = 28 filles.\nc) Colonne « garçons » : 15 + 4 = 19 garçons.\nd) Colonne « total » : 26 + 21 = 47 élèves.\nJe vérifie : 28 filles + 19 garçons = 47. Le tableau est juste.\n⛔ Le piège : mélanger les lignes et les colonnes. Une ligne, c'est un sport. Une colonne, c'est les filles ou les garçons.\nRéponse : a) 15 au judo, 4 à la danse ; b) 28 filles ; c) 19 garçons ; d) 47 élèves.",
          schema: ecranSeulement(
            grille(["sport", "filles", "garçons", "total"], [
              ["judo", "11", "15", "26"],
              ["danse", "17", "4", "21"],
              ["total", "28", "19", "47"],
            ], { total: true }),
          ),
          micros: ["tableau_completer"],
        },
        {
          enonce:
            "Un musée d'histoire compte ses visiteurs dans chaque salle, un dimanche.\na) Quelle salle a eu le plus de visiteurs ?\nb) Combien de visiteurs de plus pour l'Égypte que pour les Romains ?\nc) Combien de visiteurs dans les quatre salles ?\nd) Range les salles, de la plus visitée à la moins visitée.",
          figure: grille(["salle", "visiteurs"], [
            ["Grecs", "85"],
            ["Égypte", "120"],
            ["Vikings", "120"],
            ["Romains", "64"],
          ]),
          correction:
            "a) Le plus grand nombre est 120. Il est écrit DEUX fois : l'Égypte et les Vikings.\nLes deux salles sont à égalité.\nb) 120 − 64 = 56 visiteurs de plus.\nc) 85 + 120 + 120 + 64 = 389 visiteurs.\nd) Je range : 120, 120, puis 85, puis 64.\nL'ordre : l'Égypte et les Vikings, puis les Grecs, puis les Romains.\n⛔ Le piège au a) : s'arrêter au premier 120. Je relis toute la colonne avant de répondre.\nRéponse : a) l'Égypte et les Vikings ; b) 56 visiteurs ; c) 389 visiteurs ; d) Égypte et Vikings, Grecs, Romains.",
          micros: ["tableau_lire", "tableau_interpreter"],
        },
        {
          enonce:
            "Une chorale prépare un concert. Elle a 34 chanteurs en tout. Il y a 9 altos, 7 ténors et 6 basses. Les autres sont des sopranos.\na) Combien y a-t-il de sopranos ?\nb) Les sopranos et les altos chantent aigu. Combien de voix aiguës ?\nc) Les ténors et les basses chantent grave. Combien de voix graves ?\nd) Combien de voix aiguës de plus que de voix graves ?",
          correction:
            "a) J'additionne les voix connues : 9 + 7 + 6 = 22.\nSopranos : 34 − 22 = 12.\nb) 12 + 9 = 21 voix aiguës.\nc) 7 + 6 = 13 voix graves.\nd) 21 − 13 = 8 voix aiguës de plus.\nJe vérifie : 21 + 13 = 34. Tous les chanteurs sont comptés.\n⛔ Le piège au a) : ajouter 34 aux autres nombres. 34 est le total : il contient déjà toutes les voix.\nRéponse : a) 12 sopranos ; b) 21 voix aiguës ; c) 13 voix graves ; d) 8 de plus.",
          schema: ecranSeulement(
            grille(["voix", "chanteurs"], [
              ["sopranos", "12"],
              ["altos", "9"],
              ["ténors", "7"],
              ["basses", "6"],
              ["total", "34"],
            ], { total: true, case: [0, 1] }),
          ),
          micros: ["tableau_completer", "tableau_interpreter"],
        },
        {
          enonce:
            "Un terrarium de la classe abrite 3 araignées et 5 phasmes. Un phasme est un insecte : il a 6 pattes. Une araignée a 8 pattes. Ces nombres sont vrais.\na) Combien de pattes ont les 3 araignées ?\nb) Combien de pattes ont les 5 phasmes ?\nc) Combien de pattes en tout dans le terrarium ?\nd) Léa dit : « Il y a 8 animaux, donc 8 pattes. » A-t-elle raison ?",
          correction:
            "Je range les nombres dans un tableau : l'animal, combien il y en a, leurs pattes.\na) Une araignée a 8 pattes. 3 araignées : 3 × 8 = 24 pattes.\nb) Un phasme a 6 pattes. 5 phasmes : 5 × 6 = 30 pattes.\nc) 24 + 30 = 54 pattes en tout.\nd) Non. 3 + 5 = 8, c'est le nombre d'ANIMAUX. Chaque animal a plusieurs pattes : il y en a 54.\n⛔ Le piège : additionner les animaux au lieu des pattes. Je lis bien le titre de chaque colonne.\nRéponse : a) 24 pattes ; b) 30 pattes ; c) 54 pattes ; d) non.",
          schema: ecranSeulement(
            grille(["animal", "nombre", "pattes"], [
              ["araignées", "3", "24"],
              ["phasmes", "5", "30"],
              ["total", "8", "54"],
            ], { total: true, case: [2, 2] }),
          ),
          micros: ["tableau_lire", "tableau_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des données du monde réel. Je lis, je calcule, puis je réponds par une phrase qui cite les nombres.",
      rappel: [
        "Je lis le titre de chaque ligne et de chaque colonne.",
        "Je vérifie un total : j'additionne dans un autre ordre.",
        "Pour dire « vrai » ou « faux », je montre le calcul.",
      ],
      exercices: [
        {
          titre: "Les tortues de la biologiste",
          enonce:
            "Une biologiste marine étudie les tortues de La Réunion. En plongée, elle compte les tortues vues devant trois plages.\na) Combien de tortues devant Saint-Leu en avril ?\nb) Combien de tortues en tout en mars ? Et en avril ?\nc) Devant quelle plage a-t-elle vu moins de tortues en avril qu'en mars ?\nd) Vrai ou faux : « En avril, il y a plus de tortues devant chaque plage. »",
          figure: grille(["plage", "mars", "avril"], [
            ["Saint-Leu", "23", "31"],
            ["Étang-Salé", "14", "9"],
            ["Grand Bois", "8", "15"],
          ]),
          correction:
            "a) Ligne « Saint-Leu », colonne « avril » : je lis 31.\nb) Mars : 23 + 14 + 8 = 45 tortues. Avril : 31 + 9 + 15 = 55 tortues.\nc) Je compare les deux cases de chaque ligne.\nSaint-Leu : 23 puis 31, c'est plus. Grand Bois : 8 puis 15, c'est plus. Étang-Salé : 14 puis 9, c'est moins.\nC'est devant l'Étang-Salé : 14 − 9 = 5 tortues de moins.\nd) Faux. Le total monte, de 45 à 55. Mais devant l'Étang-Salé, le nombre baisse.\n⛔ Le piège au d) : regarder seulement le total. Un total qui monte ne dit pas que chaque case monte.\nRéponse : a) 31 tortues ; b) 45 en mars, 55 en avril ; c) l'Étang-Salé ; d) faux.",
          micros: ["tableau_lire", "tableau_interpreter", "tableau_defi"],
        },
        {
          titre: "Le classement de l'entraîneuse",
          enonce:
            "Une entraîneuse de football prépare le classement d'un tournoi. Un match gagné rapporte 3 points. Un match nul rapporte 1 point. Un match perdu rapporte 0 point.\na) Chaque équipe a-t-elle joué 6 matchs ?\nb) Combien de points pour chaque équipe ?\nc) Quelle équipe est première ?\nd) Vrai ou faux : « Les Loups ont gagné autant de matchs que les Lions, donc ils ont autant de points. »",
          figure: grille(["équipe", "gagnés", "nuls", "perdus"], [
            ["Lions", "4", "1", "1"],
            ["Aigles", "3", "3", "0"],
            ["Loups", "4", "0", "2"],
          ]),
          correction:
            "a) J'additionne chaque ligne. Lions : 4 + 1 + 1 = 6. Aigles : 3 + 3 + 0 = 6. Loups : 4 + 0 + 2 = 6.\nOui : chaque équipe a joué 6 matchs.\nb) Lions : 4 × 3 = 12, plus 1 nul : 12 + 1 = 13 points.\nAigles : 3 × 3 = 9, plus 3 nuls : 9 + 3 = 12 points.\nLoups : 4 × 3 = 12, et aucun nul : 12 points.\nc) Les Lions sont premiers, avec 13 points. Les Aigles et les Loups sont à égalité, avec 12 points.\nd) Faux. Les deux équipes ont 4 victoires. Mais les Lions ont 1 match nul en plus : 13 points contre 12.\n⛔ Le piège : compter les matchs gagnés à la place des points. Je multiplie d'abord, puis j'ajoute les nuls.\nRéponse : a) oui ; b) Lions 13, Aigles 12, Loups 12 ; c) les Lions ; d) faux.",
          micros: ["tableau_lire", "tableau_interpreter", "tableau_defi"],
        },
        {
          titre: "Le carnet du chauffeur",
          enonce:
            "Un chauffeur de bus part vide du dépôt. À chaque arrêt, il note les passagers qui montent et ceux qui descendent. Après le marché, le bus arrive au terminus.\na) Combien de passagers sont montés en tout ?\nb) Combien de passagers sont dans le bus après la mairie ?\nc) Après quel arrêt le bus est-il le plus rempli ?\nd) Au terminus, tout le monde descend. Combien de passagers descendent ?",
          figure: grille(["arrêt", "montent", "descendent"], [
            ["gare", "18", "0"],
            ["mairie", "7", "5"],
            ["école", "3", "12"],
            ["marché", "6", "9"],
          ]),
          correction:
            "a) Colonne « montent » : 18 + 7 + 3 + 6 = 34 passagers.\nb) Je suis le bus, arrêt par arrêt. Après la gare : 0 + 18 − 0 = 18 passagers.\nAprès la mairie : 18 + 7 − 5 = 20 passagers.\nc) Après l'école : 20 + 3 − 12 = 11. Après le marché : 11 + 6 − 9 = 8.\nLe plus grand nombre est 20 : c'est après la mairie.\nd) Il reste 8 passagers : 8 descendent au terminus.\nJe vérifie. Descendus aux arrêts : 0 + 5 + 12 + 9 = 26. Et 26 + 8 = 34, autant que les passagers montés.\n⛔ Le piège au b) : répondre 25, tous ceux qui sont montés. Ceux qui descendent ne sont plus dans le bus.\nRéponse : a) 34 passagers ; b) 20 passagers ; c) après la mairie ; d) 8 passagers.",
          schema: ecranSeulement(
            grille(["arrêt", "dans le bus"], [
              ["gare", "18"],
              ["mairie", "20"],
              ["école", "11"],
              ["marché", "8"],
            ], { case: [1, 1] }),
          ),
          micros: ["tableau_lire", "tableau_completer", "tableau_interpreter", "tableau_defi"],
        },
        {
          titre: "Les billets du festival",
          enonce:
            "L'organisatrice d'un festival de musique compte les billets vendus. Il y a des billets enfants et des billets adultes.\na) Combien de billets vendus le samedi ?\nb) Combien de billets enfants en tout ? Et de billets adultes ?\nc) Combien de billets en tout, sur les trois jours ?\nd) Un journal écrit : « Plus de 2 000 billets vendus ! » A-t-il raison ?",
          figure: grille(["jour", "enfants", "adultes"], [
            ["vendredi", "120", "340"],
            ["samedi", "210", "480"],
            ["dimanche", "260", "390"],
          ]),
          correction:
            "a) Ligne « samedi » : 210 + 480 = 690 billets.\nb) Colonne « enfants » : 120 + 210 + 260 = 590 billets enfants.\nColonne « adultes » : 340 + 480 + 390 = 1 210 billets adultes.\nc) 590 + 1 210 = 1 800 billets.\nJe vérifie par les jours. Vendredi : 120 + 340 = 460. Samedi : 690. Dimanche : 260 + 390 = 650.\nEt 460 + 690 + 650 = 1 800. Je retrouve le même total.\nd) Non. 1 800 est plus petit que 2 000. Il manque 2 000 − 1 800 = 200 billets.\n⛔ Le piège : croire le journal sans calculer. Un grand nombre se vérifie, case par case.\nRéponse : a) 690 billets ; b) 590 enfants, 1 210 adultes ; c) 1 800 billets ; d) non.",
          micros: ["tableau_completer", "tableau_interpreter", "tableau_defi"],
        },
      ],
    },
  ],
};
