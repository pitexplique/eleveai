// ─── Fiche d'exercices : tableaux et graphiques simples (CE1) — 20 exercices ───
//
// 17/11/2026 : la feuille interactive de la notion `donnees` du coach CE1 (7
// micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel
// avant chaque niveau, corrigés à la première personne, étape par étape, avec
// le piège nommé. Alignée sur la banque
// `lib/tutor-v4/questionBank/ce1/maths/donnees.bank.ts` : lire un tableau, un
// tableau à double entrée, un diagramme en barres ; compléter un tableau (les
// traits d'une enquête, une case effacée) ; produire un diagramme (combien de
// barres, jusqu'où monte une barre) ; interpréter (le plus, le moins, de plus).
// ⛔ LIMITES DU CE1 : des nombres < 100, additions et soustractions seulement.
// Le diagramme n'écrit JAMAIS la valeur d'une barre qu'on doit lire (axe
// gradué, comme `stat_graph` sans `showValues` au coach).
// ⛔ Aucune question à rédiger : QCM par lettre, un nombre, un mot.
// Phrases de 16 mots au plus.
//
// Les pièges nommés : lire la mauvaise ligne (1, 4), compter les carreaux au
// lieu de lire l'axe (2, 9, 18, LE piège du programme), oublier un trait (3),
// lire la ligne au lieu de la colonne (4, 11), le mot qui n'est pas un
// nombre (5, 8), prendre le total pour une case (6, 13), une barre par
// élève (7), confondre le plus et le moins (8), « de plus » qui n'est pas une
// addition (10, 18), oublier une case dans le total (12, 17), compter les
// absents dans l'enquête (14), compter les traits depuis 1 (15), « plus »
// parce que deux barres battent une (16), le jour le plus long au lieu du
// plus vendu (19), la moitié confondue avec le double (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : alimentation (1, 7), ferme (2), sport (3,
// 10), école (4, 6, 11, 12, 14), transport (5, 20), météo (8), bibliothèque
// (9), animaux (13), marché (16, 19), boulangerie (17), santé animale (18).
// Métiers : boulangère (17), vétérinaire (18), marchande (19), agent de la
// circulation (20). UN SEUL contexte réunionnais (19, letchis au marché de
// Saint-Paul, nombres MODÈLES).
//
// ⭐ FAITS RÉELS : aucun. Toutes les enquêtes sont des MODÈLES.
//
// ⭐ LES DESSINS : `barres`, `grille` et `croise` de `figures-donnees.tsx`
// (aucune largeur minimale : rien ne défile à 375 px).
//
// Micro-compétences : ce1_donnees_lire_tableau (1, 8, 12), ce1_donnees_double_
// entree (4, 11, 17), ce1_donnees_lire_graphique (2, 5, 9, 10, 18),
// ce1_donnees_interpreter (1, 2, 5, 8, 10, 14, 16, 18, 19),
// ce1_donnees_completer_tableau (3, 6, 13, 17), ce1_donnees_produire (7, 15,
// 20), ce1_donnees_defi (17, 18, 19, 20). 7/7.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { barres, croise, grille } from "@/lib/fiches-exercices/figures-donnees";

/**
 * Un AXE VIDE, gradué de `pas` en `pas` jusqu'à `max`, avec le nom des barres
 * à tracer en dessous : le diagramme que l'élève va PRODUIRE. Aucune barre.
 * Mêmes mesures que `barres` (viewBox 300, police 14). Texte NU.
 */
const axeVide = (max: number, pas: number, noms: string[]) => {
  const [W, G, D, HAUT, BAS] = [300, 44, 10, 24, 154];
  const y = (v: number) => BAS - (v / max) * (BAS - HAUT);
  const slot = (W - G - D) / noms.length;
  const graduations = Array.from({ length: Math.round(max / pas) + 1 }, (_, k) => k * pas);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${BAS + 30}`} className="block h-auto w-full" role="img" aria-label="Un axe gradué, sans barre">
        <rect x="0" y="0" width={W} height={BAS + 30} rx="10" fill="#fff" />
        {graduations.map((g) => (
          <g key={g}>
            <line x1={G - 4} y1={y(g)} x2={W - D} y2={y(g)} stroke="#cbd5e1" strokeWidth="1" />
            <text x={G - 8} y={y(g) + 5} textAnchor="end" fontSize="14" fontWeight="700" fill="#334155">
              {g}
            </text>
          </g>
        ))}
        <line x1={G - 4} y1={HAUT - 8} x2={G - 4} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={G - 4} y1={BAS} x2={W - D} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        {noms.map((n, i) => (
          <text key={n} x={G + i * slot + slot / 2} y={BAS + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">
            {n}
          </text>
        ))}
      </svg>
    </div>
  );
};

export const exercicesDonneesCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "donnees",
  titre: "Tableaux et graphiques simples",
  accroche:
    "Vingt exercices, du geste seul au problème. Lire un tableau, et un tableau à double entrée. Lire la hauteur d'une barre sur l'axe. Compléter un tableau avec les traits d'une enquête. Préparer un diagramme. Une boulangère, une vétérinaire, une marchande de letchis et des voitures à compter. Un rappel avant chaque niveau. Cherche d'abord avec ton doigt sur le tableau. Puis ouvre la correction : étape par étape, avec le piège.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je pose mon doigt sur la bonne case.",
      rappel: [
        "Dans un tableau, je trouve la bonne ligne, puis je lis le nombre.",
        "Sur un diagramme, je suis le haut de la barre jusqu'à l'axe. Je lis le nombre.",
        "La barre la plus haute montre le plus grand nombre.",
      ],
      exercices: [
        {
          enonce: "Les élèves ont choisi leur fruit préféré.\na) Combien d'élèves ont choisi la banane ?\nb) Quel fruit a été le plus choisi ?",
          figure: grille(["Fruit", "Nombre d'élèves"], [["pomme", 8], ["banane", 5], ["mangue", 7], ["fraise", 4]]),
          correction:
            "a) Je cherche la ligne « banane ». J'avance jusqu'à la colonne des nombres : 5.\nb) Je compare les nombres : 8, 5, 7, 4. Le plus grand est 8.\n8, c'est la ligne « pomme ».\n⛔ Le piège : a) lire le nombre de la ligne du dessus ou du dessous. Je garde mon doigt sur la ligne.\nRéponse : a) 5 ; b) la pomme.",
          micros: ["ce1_donnees_lire_tableau", "ce1_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["pomme", "la pomme"] },
          ],
        },
        {
          enonce: "Ce diagramme montre les animaux d'une ferme.\na) Combien y a-t-il de moutons ?\nb) Quel animal est le moins nombreux ?",
          figure: barres(
            [
              { label: "poules", value: 6 },
              { label: "vaches", value: 3 },
              { label: "moutons", value: 5 },
              { label: "canards", value: 4 },
            ],
            { pas: 1 },
          ),
          correction:
            "a) Je pars du haut de la barre « moutons ». Je suis le trait jusqu'à l'axe : 5.\nb) La barre la plus basse est celle des vaches. Elle s'arrête à 3.\nLes vaches sont les moins nombreuses.\n⛔ Le piège : b) choisir la barre la plus haute. « Le moins » : je cherche la plus basse.\nRéponse : a) 5 ; b) les vaches.",
          micros: ["ce1_donnees_lire_graphique", "ce1_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["vaches", "les vaches", "vache", "la vache"] },
          ],
        },
        {
          enonce: "Inès a fait un trait par réponse.\nCompte les traits. Écris le nombre de chaque sport.\na) foot\nb) judo\nc) danse",
          figure: grille(["Sport", "Traits", "Nombre"], [["foot", "IIIII II", "…"], ["judo", "IIII", "…"], ["danse", "IIIII I", "…"]]),
          correction:
            "Je compte les traits un par un, en les touchant du doigt.\na) foot : 5 traits, puis 2 traits. 5 + 2 = 7.\nb) judo : 4 traits.\nc) danse : 5 traits, puis 1 trait. 5 + 1 = 6.\n⛔ Le piège : sauter un trait quand ils sont serrés. Je les groupe par 5 pour ne rien oublier.\nRéponse : a) 7 ; b) 4 ; c) 6.",
          micros: ["ce1_donnees_completer_tableau"],
          reponses: [
            { question: "a)", attendu: ["7", "sept"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["6", "six"] },
          ],
        },
        {
          enonce: "Ce tableau donne les élèves de deux classes.\na) Combien de filles en CE1 B ?\nb) Combien de garçons en CE1 A ?",
          figure: croise(["Classe", "Filles", "Garçons"], [["CE1 A", 12, 10], ["CE1 B", 11, 13]]),
          correction:
            "Je cherche la ligne de la classe, puis la colonne. Le nombre est là où elles se croisent.\na) Ligne « CE1 B », colonne « Filles » : 11.\nb) Ligne « CE1 A », colonne « Garçons » : 10.\n⛔ Le piège : a) lire 13, la case d'à côté. Je garde un doigt sur la ligne, un doigt sur la colonne.\nRéponse : a) 11 ; b) 10.",
          micros: ["ce1_donnees_double_entree"],
          reponses: [
            { question: "a)", attendu: ["11", "onze"] },
            { question: "b)", attendu: ["10", "dix"] },
          ],
        },
        {
          enonce: "Comment les élèves viennent-ils à l'école ?\na) Combien viennent en bus ?\nb) Quelle barre est la plus haute ?",
          figure: barres(
            [
              { label: "à pied", value: 7 },
              { label: "voiture", value: 4 },
              { label: "bus", value: 6 },
              { label: "vélo", value: 2 },
            ],
            { pas: 1 },
          ),
          correction:
            "a) Je suis le haut de la barre « bus » jusqu'à l'axe : 6. Six élèves viennent en bus.\nb) La barre la plus haute s'arrête à 7. C'est la barre « à pied ».\nLa plupart des élèves viennent à pied.\n⛔ Le piège : b) écrire 7. On demande le nom de la barre, pas son nombre.\nRéponse : a) 6 ; b) à pied.",
          micros: ["ce1_donnees_lire_graphique", "ce1_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["à pied", "a pied", "pied", "la barre à pied"] },
          ],
        },
        {
          enonce: "Dans le sac de Malo, il y a 12 billes en tout.\nUne case est effacée.\nCombien y a-t-il de billes vertes ?",
          figure: grille(["Billes", "Nombre"], [["rouges", 5], ["bleues", 3], ["vertes", "?"], ["Total", 12]], { total: true }),
          correction:
            "Les rouges et les bleues ensemble : 5 + 3 = 8.\nIl y a 12 billes en tout. Je cherche ce qui manque de 8 à 12.\n8 + 4 = 12. Il y a 4 billes vertes.\n⛔ Le piège : répondre 12. 12, c'est le total de toutes les billes.\nRéponse : 4.",
          micros: ["ce1_donnees_completer_tableau"],
          reponses: [{ attendu: ["4", "quatre"] }],
        },
        {
          enonce: "Je veux dessiner le diagramme de ce tableau.\na) Combien de barres vais-je tracer ?\nb) Quelle barre sera la plus haute ?",
          figure: grille(["Légume", "Nombre d'élèves"], [["carotte", 9], ["tomate", 6], ["haricot", 3], ["salade", 5]]),
          correction:
            "a) Une barre pour chaque légume du tableau. Il y a 4 légumes : 4 barres.\nb) Le plus grand nombre est 9. La barre de la carotte sera la plus haute.\n⛔ Le piège : a) tracer une barre par élève. Une barre montre un légume ; sa hauteur montre le nombre d'élèves.\nRéponse : a) 4 ; b) la carotte.",
          micros: ["ce1_donnees_produire"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["carotte", "la carotte"] },
          ],
        },
        {
          enonce: "Voici le temps de la semaine.\na) Combien de jours de pluie ?\nb) Combien de jours de soleil ?",
          figure: grille(["Jour", "Temps"], [["lundi", "soleil"], ["mardi", "pluie"], ["mercredi", "soleil"], ["jeudi", "nuages"], ["vendredi", "pluie"], ["samedi", "pluie"], ["dimanche", "nuages"]], { compact: true }),
          correction:
            "Je lis la colonne « Temps » de haut en bas.\na) pluie : mardi, vendredi, samedi. 3 jours.\nb) soleil : lundi, mercredi. 2 jours.\nJe vérifie : 3 jours de pluie, 2 de soleil, 2 de nuages. 3 + 2 + 2 = 7 jours.\n⛔ Le piège : compter les nuages avec le soleil. Je ne compte que le mot demandé.\nRéponse : a) 3 ; b) 2.",
          micros: ["ce1_donnees_lire_tableau", "ce1_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je lis bien l'axe, puis je calcule.",
      rappel: [
        "Je regarde d'abord les nombres de l'axe. Ils vont de 1 en 1, de 2 en 2 ou de 5 en 5.",
        "Le total, c'est la somme de toutes les cases.",
        "« Combien de plus » : je fais une soustraction, le grand moins le petit.",
      ],
      exercices: [
        {
          enonce: "Ce diagramme montre les livres prêtés par la bibliothèque.\nL'axe va de 5 en 5.\na) Combien de BD ?\nb) Combien de contes ?",
          figure: barres(
            [
              { label: "contes", value: 15 },
              { label: "BD", value: 25 },
              { label: "animaux", value: 10 },
            ],
            { pas: 5, unite: "livres" },
          ),
          correction:
            "Je lis les nombres de l'axe : 0, 5, 10, 15, 20, 25.\na) La barre « BD » s'arrête au trait 25 : 25 BD.\nb) La barre « contes » s'arrête au trait 15 : 15 contes.\n⛔ Le piège : a) compter les carreaux, et répondre 5. Chaque carreau vaut 5 livres, pas 1.\nRéponse : a) 25 ; b) 15.",
          micros: ["ce1_donnees_lire_graphique"],
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "15" },
          ],
        },
        {
          enonce: "Ce diagramme montre le sport de chaque enfant du club.\na) Combien d'enfants font de la danse ?\nb) Combien d'enfants de plus font du foot que du judo ?",
          figure: barres(
            [
              { label: "foot", value: 10 },
              { label: "natation", value: 6 },
              { label: "danse", value: 8 },
              { label: "judo", value: 4 },
            ],
            { pas: 2, unite: "enfants" },
          ),
          correction:
            "L'axe va de 2 en 2 : 0, 2, 4, 6, 8, 10.\na) La barre « danse » s'arrête à 8 : 8 enfants.\nb) Foot : 10. Judo : 4. Je cherche l'écart : 10 − 4 = 6.\nJe vérifie : 4 + 6 = 10.\n⛔ Le piège : b) additionner, 10 + 4 = 14. « De plus » demande l'écart entre les deux.\nRéponse : a) 8 ; b) 6.",
          micros: ["ce1_donnees_lire_graphique", "ce1_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["6", "six"] },
          ],
        },
        {
          enonce: "Ce tableau donne les élèves qui mangent à la cantine.\na) Combien de CE2 mangent le jeudi ?\nb) Combien de repas pour les CE1, sur les trois jours ?",
          figure: croise(["Classe", "lundi", "mardi", "jeudi"], [["CE1", 20, 18, 22], ["CE2", 15, 17, 16]]),
          correction:
            "a) Ligne « CE2 », colonne « jeudi » : 16.\nb) Je lis toute la ligne « CE1 » : 20, 18 et 22.\nJ'additionne : 20 + 18 = 38, puis 38 + 22 = 60.\n⛔ Le piège : a) lire la colonne « jeudi » sur la ligne CE1, 22. Je vérifie la ligne ET la colonne.\nRéponse : a) 16 ; b) 60.",
          micros: ["ce1_donnees_double_entree", "ce1_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: "16" },
            { question: "b)", attendu: "60" },
          ],
        },
        {
          enonce: "Chaque élève a donné sa couleur préférée.\nCombien d'élèves ont répondu en tout ?",
          figure: grille(["Couleur", "Nombre d'élèves"], [["bleu", 9], ["rouge", 7], ["vert", 6], ["jaune", 3]]),
          correction:
            "Le total, c'est la somme de toutes les cases.\nJ'additionne deux par deux : 9 + 7 = 16, puis 6 + 3 = 9.\n16 + 9 = 25 élèves.\n⛔ Le piège : oublier la dernière ligne, le jaune. Je coche chaque case quand je l'ajoute.\nRéponse : 25.",
          micros: ["ce1_donnees_lire_tableau", "ce1_donnees_interpreter"],
          reponses: [{ attendu: "25" }],
        },
        {
          enonce: "24 élèves ont dit leur animal préféré. Une case est effacée.\nCombien ont choisi le chien ?",
          figure: grille(["Animal", "Nombre"], [["chat", 9], ["chien", "?"], ["poisson", 5], ["Total", 24]], { total: true }),
          correction:
            "Je connais le chat et le poisson : 9 + 5 = 14.\nIl y a 24 élèves en tout. Je cherche ce qui manque de 14 à 24.\n14 + 10 = 24. Le chien a 10 voix.\nJe vérifie : 9 + 10 + 5 = 24.\n⛔ Le piège : additionner tout, 9 + 5 + 24. Le total est déjà la somme : je ne l'ajoute pas.\nRéponse : 10.",
          micros: ["ce1_donnees_completer_tableau"],
          reponses: [{ attendu: ["10", "dix"] }],
        },
        {
          enonce: "La classe a 26 élèves. Certains étaient absents le jour de l'enquête.\na) Combien d'élèves ont répondu ?\nb) Combien étaient absents ?",
          figure: grille(["Jeu préféré", "Nombre d'élèves"], [["billes", 8], ["corde", 6], ["ballon", 9]]),
          correction:
            "a) J'additionne les réponses : 8 + 6 = 14, puis 14 + 9 = 23 élèves.\nb) La classe a 26 élèves. 23 ont répondu.\n26 − 23 = 3 élèves absents.\n⛔ Le piège : a) répondre 26. Les absents n'ont pas répondu : ils ne sont pas dans le tableau.\nRéponse : a) 23 ; b) 3.",
          micros: ["ce1_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: "23" },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "Lundi, 12 enfants sont venus au club. Mardi, 8 enfants.\nJe trace leurs barres. Mon axe va de 2 en 2.\na) La barre de lundi monte de combien de traits ?\nb) Et la barre de mardi ?",
          figure: axeVide(14, 2, ["lundi", "mardi"]),
          correction:
            "Chaque trait vaut 2 de plus. Je compte les traits de 2 en 2.\na) Lundi, 12 : 2, 4, 6, 8, 10, 12. J'ai compté 6 traits.\nb) Mardi, 8 : 2, 4, 6, 8. J'ai compté 4 traits.\n⛔ Le piège : a) monter jusqu'au 12e trait. Un trait ne vaut pas 1, il vaut 2.\nRéponse : a) 6 ; b) 4.",
          micros: ["ce1_donnees_produire"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Une maraîchère note les paniers vendus.\na) Combien de paniers lundi et mardi ensemble ?\nb) Comparé à mercredi, c'est : A) plus   B) moins   C) autant",
          figure: grille(["Jour", "Paniers"], [["lundi", 6], ["mardi", 5], ["mercredi", 11]]),
          correction:
            "a) 6 + 5 = 11 paniers lundi et mardi.\nb) Mercredi, elle a vendu 11 paniers. 11 et 11 : c'est autant. Réponse C.\n⛔ Le piège : b) choisir A, parce que deux jours, c'est plus qu'un. Je compare les nombres, pas les jours.\nRéponse : a) 11 ; b) C.",
          micros: ["ce1_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: ["11", "onze"] },
            { question: "b)", attendu: ["C", "C) autant", "autant"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je cherche les nombres dans le tableau ou le diagramme.",
      rappel: [
        "Je lis d'abord le titre des lignes et des colonnes.",
        "Je regarde l'axe avant de lire une barre.",
        "Je relis la question : un nombre, ou un nom ?",
      ],
      exercices: [
        {
          titre: "Les ventes de la boulangère",
          enonce: "Une boulangère note ses ventes du matin et du soir.\na) Combien de croissants dans la journée ?\nb) Combien de pains dans la journée ?\nc) Le soir, combien de pains de plus que de croissants ?",
          figure: croise(["Vente", "matin", "soir", "Total"], [["croissants", 30, 12, "?"], ["pains", 25, 20, "?"]]),
          correction:
            "a) Ligne « croissants » : 30 le matin, 12 le soir. 30 + 12 = 42.\nb) Ligne « pains » : 25 + 20 = 45.\nc) Colonne « soir » : 20 pains et 12 croissants. 20 − 12 = 8.\nJe vérifie : 12 + 8 = 20.\n⛔ Le piège : c) prendre les nombres du matin. Je lis seulement la colonne « soir ».\nRéponse : a) 42 ; b) 45 ; c) 8.",
          micros: ["ce1_donnees_double_entree", "ce1_donnees_completer_tableau", "ce1_donnees_defi"],
          reponses: [
            { question: "a)", attendu: "42" },
            { question: "b)", attendu: "45" },
            { question: "c)", attendu: ["8", "huit"] },
          ],
        },
        {
          titre: "Les patients de la vétérinaire",
          enonce: "Ce diagramme montre les animaux soignés par une vétérinaire ce mois-ci.\na) Combien de chats ?\nb) Combien d'animaux en tout ?\nc) Combien de chiens de plus que de lapins ?",
          figure: barres(
            [
              { label: "chiens", value: 20 },
              { label: "chats", value: 15 },
              { label: "lapins", value: 5 },
              { label: "oiseaux", value: 10 },
            ],
            { pas: 5, unite: "animaux" },
          ),
          correction:
            "L'axe va de 5 en 5. Je lis : chiens 20, chats 15, lapins 5, oiseaux 10.\na) 15 chats.\nb) 20 + 15 = 35, puis 5 + 10 = 15. 35 + 15 = 50 animaux.\nc) 20 − 5 = 15 chiens de plus.\n⛔ Le piège : lire 3 pour les chats, en comptant les carreaux. Un carreau vaut 5.\nRéponse : a) 15 ; b) 50 ; c) 15.",
          micros: ["ce1_donnees_lire_graphique", "ce1_donnees_interpreter", "ce1_donnees_defi"],
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: "50" },
            { question: "c)", attendu: "15" },
          ],
        },
        {
          titre: "Les letchis du marché",
          enonce: "Au marché de Saint-Paul, une marchande vend des barquettes de letchis.\na) Quel jour en a-t-elle vendu le plus ?\nb) Combien de barquettes en trois jours ?\nc) Combien de plus le samedi que le vendredi ?",
          figure: grille(["Jour", "Barquettes"], [["vendredi", 14], ["samedi", 25], ["dimanche", 18]]),
          correction:
            "a) Je compare 14, 25 et 18. Le plus grand est 25 : le samedi.\nb) 14 + 25 = 39, puis 39 + 18 = 57 barquettes.\nc) Samedi 25, vendredi 14. 25 − 14 = 11.\nJe vérifie : 14 + 11 = 25.\n⛔ Le piège : a) choisir vendredi, le premier jour, ou dimanche, le plus long mot. Je compare les nombres.\nRéponse : a) samedi ; b) 57 ; c) 11.",
          micros: ["ce1_donnees_interpreter", "ce1_donnees_defi"],
          reponses: [
            { question: "a)", attendu: ["samedi", "le samedi"] },
            { question: "b)", attendu: "57" },
            { question: "c)", attendu: ["11", "onze"] },
          ],
        },
        {
          titre: "Les voitures de la rue",
          enonce: "Un agent compte les voitures : 8 rouges, 12 blanches et 6 noires.\nIl trace un diagramme. L'axe va de 2 en 2.\na) La barre des blanches monte de combien de traits ?\nb) Quelle barre est la moitié de celle des blanches ?",
          figure: axeVide(14, 2, ["rouges", "blanches", "noires"]),
          correction:
            "a) Je compte de 2 en 2 jusqu'à 12 : 2, 4, 6, 8, 10, 12. La barre monte de 6 traits.\nb) La moitié de 12, c'est 6, car 6 + 6 = 12.\nLes noires sont 6 : leur barre est la moitié de celle des blanches.\n⛔ Le piège : b) choisir les rouges. 8, ce n'est pas la moitié de 12.\nRéponse : a) 6 ; b) les noires.",
          micros: ["ce1_donnees_produire", "ce1_donnees_defi"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["noires", "les noires", "noire", "la noire", "la barre des noires"] },
          ],
        },
      ],
    },
  ],
};
