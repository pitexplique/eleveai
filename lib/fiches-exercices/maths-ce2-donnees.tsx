// ─── Fiche d'exercices : tableaux et diagrammes en barres (CE2) — 20 exercices ─
//
// 17/11/2026 : la feuille interactive de la notion `donnees` du coach CE2
// (« Tableaux et diagrammes en barres », 8 micros). Sur la forme de
// `maths-cm1-masse.tsx` et de `maths-ce1-donnees.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque
// `lib/tutor-v4/questionBank/ce2/maths/donnees.bank.ts` : lire un tableau, un
// tableau à double entrée, le compléter, lire un diagramme en barres, en
// produire un, interpréter, résoudre un problème.
// ⛔ LIMITES DU CE2 (BO n° 41 du 31/10/2024) : pas de moyenne, pas de
// pourcentage (cycle 3) ; on lit, on compare, on additionne, on soustrait.
// Des nombres < 1 000. Des diagrammes gradués de 2 en 2, de 3 en 3, de 5 en 5
// ou de 10 en 10 (LE piège de la banque : le carreau qui vaut plus que 1).
// Le diagramme n'écrit JAMAIS la valeur d'une barre qu'on doit lire.
// ⛔ Aucune question à rédiger : QCM, vrai ou faux, un nombre, un mot.
// ⛔ 8 ans : phrases de 18 mots au plus, une idée par phrase.
//
// Les pièges nommés : prendre le plus grand pour le plus petit (1), compter
// les carreaux au lieu de lire l'axe (2, 7, 9, 19), croiser la mauvaise ligne
// (3, 13), additionner sans aligner (4), oublier un vote (5), la barre de 14
// carreaux (6), lire la ligne voisine (8), la barre entre deux traits (9),
// prendre le total pour une case (10), « deux fois plus » lu à l'envers (11),
// 5 carreaux pour 30 (12), les places vendues au lieu des vides (14), « plus
// de 12 » avec 12 compris (15), oublier une case du total (16, 17), le double
// au lieu de « 2 de plus » (18), un carreau = 1 kg (19), mélanger filles et
// garçons (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : goûter (1), bibliothèque (2), école (3,
// 13, 17), boulangerie (4), animaux (5, 6, 11), sport (7, 8, 20), musée (9),
// glacier (10), verger (12), cinéma (14), ferme (15), arts plastiques (16),
// atelier de vélos (18), potager (19).
// Les métiers : boulangère (4), arboricultrice (12), mécanicien (18),
// maraîchère (19).
// Aucun contexte réunionnais sur cette feuille (la notion en a ailleurs).
//
// ⭐ FAITS RÉELS : aucun. Toutes les enquêtes sont des MODÈLES.
//
// ⭐ LES DESSINS : `barres`, `grille` et `croise` de `figures-donnees.tsx`
// (aucune largeur minimale : rien ne défile à 375 px) ; un axe vide
// (`axeVide`) pour produire, et des barres sur carreaux sans nombres
// (`barresCarreaux`) pour retrouver la graduation.
//
// Micro-compétences : ce2_donnees_lire_tableau (1, 8, 14), ce2_donnees_double_
// entree (3, 10, 13, 20), ce2_donnees_completer_tableau (4, 5, 10, 16, 17),
// ce2_donnees_lire_graphique (2, 7, 9, 16, 19), ce2_donnees_produire (6, 12),
// ce2_donnees_interpreter (1, 7, 9, 11, 13, 15, 18), ce2_donnees_probleme (14,
// 17, 18, 20), ce2_donnees_defi (17, 18, 19, 20). 8/8.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";
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

/**
 * Des barres posées sur un QUADRILLAGE, SANS AUCUN NOMBRE : chaque barre fait
 * un nombre entier de carreaux. On retrouve ce que vaut un carreau grâce à
 * l'énoncé. Texte NU.
 */
const barresCarreaux = (data: { label: string; carreaux: number }[], hauteur = 8) => {
  const c = 20;
  const [G, HAUT] = [12, 10];
  const slot = 4; // carreaux par barre : 1 vide, la barre (2 de large), 1 vide
  const col = data.length * slot;
  const W = G * 2 + col * c;
  const BAS = HAUT + hauteur * c;
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
      <svg viewBox={`0 0 ${W} ${BAS + 28}`} className="block h-auto w-full" role="img" aria-label="Diagramme en barres sur quadrillage, sans graduation">
        <rect x="0" y="0" width={W} height={BAS + 28} rx="10" fill="#fff" />
        {data.map((d, i) => (
          <rect key={`b${i}`} x={G + (1 + i * slot) * c} y={BAS - d.carreaux * c} width={2 * c} height={d.carreaux * c} fill={i % 2 ? "#fed7aa" : "#bfdbfe"} stroke={i % 2 ? ORANGE : BLEU} strokeWidth={2} />
        ))}
        {Array.from({ length: col + 1 }, (_, x) => (
          <line key={`v${x}`} x1={G + x * c} y1={HAUT} x2={G + x * c} y2={BAS} stroke="#cbd5e1" strokeWidth={0.8} />
        ))}
        {Array.from({ length: hauteur + 1 }, (_, y) => (
          <line key={`h${y}`} x1={G} y1={HAUT + y * c} x2={W - G} y2={HAUT + y * c} stroke="#cbd5e1" strokeWidth={0.8} />
        ))}
        <line x1={G} y1={BAS} x2={W - G} y2={BAS} stroke="#0f172a" strokeWidth={1.5} />
        {data.map((d, i) => (
          <text key={`t${i}`} x={G + (2 + i * slot) * c} y={BAS + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">
            {d.label}
          </text>
        ))}
      </svg>
    </div>
  );
};

export const exercicesDonneesCe2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce2",
  notion: "donnees",
  titre: "Tableaux et diagrammes en barres",
  accroche:
    "Vingt exercices, du plus simple au problème. Lire un tableau, et un tableau à double entrée. Compléter un tableau. Lire un diagramme en barres, même quand un carreau vaut 2, 5 ou 10. Tracer une barre. Comparer, additionner, résoudre un problème. Un goûter, un musée, un glacier, un verger, un cinéma, une ferme et une tombola. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction, étape par étape.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. J'écris un nombre ou un mot.",
      rappel: [
        "Dans un tableau, un doigt sur la ligne, un autre sur la colonne. La réponse est là où ils se croisent.",
        "Dans un diagramme, je lis le nombre sur l'axe, au niveau du haut de la barre.",
        "Je regarde d'abord de combien en combien va l'axe : de 1 en 1, de 2 en 2…",
      ],
      exercices: [
        {
          enonce: "Au goûter, la classe compte les fruits.\na) Combien y a-t-il de poires ?\nb) Quel fruit est le moins nombreux ?",
          figure: grille(["Fruit", "Nombre"], [["pommes", 12], ["bananes", 8], ["poires", 15], ["kiwis", 6]]),
          correction:
            "a) Je trouve la ligne « poires », puis je lis la case à côté : 15.\nb) Je compare les nombres : 12, 8, 15, 6. Le plus petit est 6.\nCe sont les kiwis.\n⛔ Le piège du b) : choisir les poires, le plus grand nombre. « Le moins » : je cherche le plus petit.\nRéponse : a) 15 ; b) les kiwis.",
          micros: ["ce2_donnees_lire_tableau", "ce2_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: ["kiwis", "les kiwis", "kiwi", "le kiwi"] },
          ],
        },
        {
          enonce: "Ce diagramme montre les livres empruntés à la bibliothèque.\na) Combien de livres le mardi ?\nb) Quel jour a-t-on emprunté le moins de livres ?",
          figure: barres(
            [
              { label: "lundi", value: 6 },
              { label: "mardi", value: 10 },
              { label: "mercredi", value: 4 },
              { label: "jeudi", value: 8 },
            ],
            { pas: 2, unite: "livres" },
          ),
          correction:
            "L'axe va de 2 en 2.\na) Je suis le haut de la barre « mardi » jusqu'à l'axe : 10.\nb) La barre la plus basse est celle du mercredi. Elle s'arrête à 4.\n⛔ Le piège du a) : compter les carreaux de la barre, et dire 5. Ici, un carreau vaut 2 livres.\nRéponse : a) 10 ; b) mercredi.",
          micros: ["ce2_donnees_lire_graphique"],
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: ["mercredi", "le mercredi"] },
          ],
        },
        {
          enonce: "Ce tableau donne les élèves des deux classes de CE2.\na) Combien de garçons en CE2 B ?\nb) Combien de filles en CE2 A ?",
          figure: croise(["", "filles", "garçons"], [["CE2 A", 12, 13], ["CE2 B", 14, 11]]),
          correction:
            "Je pose un doigt sur la ligne, un autre sur la colonne.\na) Ligne « CE2 B », colonne « garçons » : 11.\nb) Ligne « CE2 A », colonne « filles » : 12.\n⛔ Le piège : lire la case voisine, par exemple 13 au a). Je fais bien se rejoindre mes deux doigts.\nRéponse : a) 11 ; b) 12.",
          micros: ["ce2_donnees_double_entree"],
          reponses: [
            { question: "a)", attendu: "11" },
            { question: "b)", attendu: "12" },
          ],
        },
        {
          enonce: "La boulangère note les pains vendus.\nCombien de pains a-t-elle vendus en tout ? Complète la case du total.",
          figure: grille(["Jour", "Pains vendus"], [["lundi", 120], ["mardi", 95], ["Total", "?"]], { total: true }),
          correction:
            "Le total, c'est la somme des cases au-dessus.\n$120 + 95$ : je fais $120 + 80 = 200$, puis $200 + 15 = 215$.\nElle a vendu 215 pains.\n⛔ Le piège : poser 120 + 95 sans aligner les unités. Unités sous unités, dizaines sous dizaines.\nRéponse : 215.",
          micros: ["ce2_donnees_completer_tableau"],
          reponses: [{ attendu: "215" }],
        },
        {
          enonce: "La classe vote pour son animal préféré.\nVoici les votes : chat, chien, chat, lapin, chien, chat, poisson, chat, chien, lapin, chat, chien.\na) Combien de votes pour le chat ?\nb) Combien de votes pour le chien ?",
          figure: grille(["Animal", "Votes"], [["chat", "?"], ["chien", "?"], ["lapin", 2], ["poisson", 1]]),
          correction:
            "Je lis la liste et je barre chaque vote compté.\na) Les « chat » : le 1er, le 3e, le 6e, le 8e et le 11e. Cela fait 5 votes.\nb) Les « chien » : le 2e, le 5e, le 9e et le 12e. Cela fait 4 votes.\nJe vérifie : $5 + 4 + 2 + 1 = 12$. Il y a bien 12 votes.\n⛔ Le piège : oublier un vote. Je barre au fur et à mesure.\nRéponse : a) 5 ; b) 4.",
          micros: ["ce2_donnees_completer_tableau"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"] },
            { question: "b)", attendu: ["4", "quatre"] },
          ],
        },
        {
          enonce: "Tu traces le diagramme des animaux de la classe. Il y a 14 chiens.\na) La barre des chiens monte jusqu'à quel nombre de l'axe ?\nb) Un carreau vaut 2. Combien de carreaux de haut fait la barre ?",
          figure: axeVide(20, 2, ["chats", "chiens", "lapins"]),
          correction:
            "a) La barre s'arrête au nombre de chiens : 14.\nb) Chaque carreau vaut 2. Je compte de 2 en 2 jusqu'à 14 : 2, 4, 6, 8, 10, 12, 14.\nCela fait 7 carreaux. Ou bien : $7 \\times 2 = 14$.\n⛔ Le piège du b) : tracer 14 carreaux. La barre dépasserait le haut de l'axe.\nRéponse : a) 14 ; b) 7.",
          micros: ["ce2_donnees_produire"],
          reponses: [
            { question: "a)", attendu: "14" },
            { question: "b)", attendu: ["7", "sept"] },
          ],
        },
        {
          enonce: "Les enfants du centre de loisirs choisissent un sport.\na) Quel sport est le plus choisi ?\nb) Combien d'enfants ont choisi le foot ?",
          figure: barres(
            [
              { label: "foot", value: 9 },
              { label: "danse", value: 6 },
              { label: "judo", value: 3 },
              { label: "natation", value: 12 },
            ],
            { pas: 3, unite: "enfants" },
          ),
          correction:
            "L'axe va de 3 en 3.\na) La barre la plus haute est celle de la natation.\nb) Je suis le haut de la barre « foot » jusqu'à l'axe : 9.\n⛔ Le piège du b) : compter 3 carreaux, et dire 3. Un carreau vaut 3 enfants : $3 + 3 + 3 = 9$.\nRéponse : a) la natation ; b) 9.",
          micros: ["ce2_donnees_lire_graphique", "ce2_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: ["natation", "la natation"] },
            { question: "b)", attendu: "9" },
          ],
        },
        {
          enonce: "Au club de natation, l'entraîneuse note les longueurs nagées.\na) Qui a nagé le plus de longueurs ?\nb) Combien de longueurs Noé a-t-il nagées ?",
          figure: grille(["Nageur", "Longueurs"], [["Léa", 18], ["Sam", 24], ["Noé", 15]]),
          correction:
            "a) Je compare : 18, 24 et 15. Le plus grand est 24 : c'est Sam.\nb) Je trouve la ligne « Noé » : 15 longueurs.\n⛔ Le piège du b) : lire la ligne au-dessus, celle de Sam. Je garde le doigt sur le bon prénom.\nRéponse : a) Sam ; b) 15.",
          micros: ["ce2_donnees_lire_tableau"],
          reponses: [
            { question: "a)", attendu: ["Sam"] },
            { question: "b)", attendu: "15" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux étapes. Je lis les nombres, puis je calcule.",
      rappel: [
        "Une barre qui s'arrête entre deux traits vaut le nombre du milieu : entre 20 et 30, c'est 25.",
        "« Combien de plus » : je soustrais le plus petit du plus grand.",
        "Le total, c'est la somme de toutes les cases de la ligne ou de la colonne.",
      ],
      exercices: [
        {
          enonce: "Ce diagramme montre les visiteurs d'un musée.\na) Combien de visiteurs le mardi ?\nb) Combien de visiteurs le lundi et le mercredi, ensemble ?",
          figure: barres(
            [
              { label: "lundi", value: 40 },
              { label: "mardi", value: 25 },
              { label: "mercredi", value: 60 },
              { label: "jeudi", value: 35 },
            ],
            { pas: 10, unite: "visiteurs" },
          ),
          correction:
            "L'axe va de 10 en 10.\na) La barre du mardi s'arrête au milieu, entre 20 et 30 : 25 visiteurs.\nb) Lundi : 40. Mercredi : 60.\n$40 + 60 = 100$ visiteurs.\n⛔ Le piège du a) : lire 20 ou 30. La barre s'arrête juste au milieu des deux traits.\nRéponse : a) 25 ; b) 100.",
          micros: ["ce2_donnees_lire_graphique", "ce2_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: "25" },
            { question: "b)", attendu: "100" },
          ],
        },
        {
          enonce: "Le glacier note les glaces vendues. Complète le tableau.\na) Combien de glaces à la vanille en tout ?\nb) Combien de glaces au chocolat l'après-midi ?",
          figure: croise(["", "matin", "après-midi", "Total"], [["vanille", 18, 27, "?"], ["chocolat", 22, "?", 50]]),
          correction:
            "a) Ligne « vanille » : le matin 18, l'après-midi 27.\n$18 + 27 = 45$ glaces.\nb) Ligne « chocolat » : le total est 50, le matin 22.\nL'après-midi : $50 - 22 = 28$ glaces.\nJe vérifie : $22 + 28 = 50$.\n⛔ Le piège du b) : additionner 22 et 50. Le 50 est déjà le total.\nRéponse : a) 45 ; b) 28.",
          micros: ["ce2_donnees_completer_tableau", "ce2_donnees_double_entree"],
          reponses: [
            { question: "a)", attendu: "45" },
            { question: "b)", attendu: "28" },
          ],
        },
        {
          enonce: "Ce diagramme montre les animaux des élèves de la classe.\nVrai ou faux ?\na) Il y a deux fois plus de chiens que de poissons.\nb) Il y a 4 lapins de plus que de chats.",
          figure: barres(
            [
              { label: "chats", value: 8 },
              { label: "chiens", value: 12 },
              { label: "lapins", value: 4 },
              { label: "poissons", value: 6 },
            ],
            { pas: 2, unite: "animaux" },
          ),
          correction:
            "L'axe va de 2 en 2. Je lis : chats 8, chiens 12, lapins 4, poissons 6.\na) Le double de 6 : $6 + 6 = 12$. Il y a bien 12 chiens. Vrai.\nb) Lapins 4, chats 8 : $8 - 4 = 4$. Il y a 4 lapins de MOINS que de chats. Faux.\n⛔ Le piège du b) : voir l'écart de 4 et dire vrai, sans regarder qui est le plus grand.\nRéponse : a) vrai ; b) faux.",
          micros: ["ce2_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: ["vrai", "oui"] },
            { question: "b)", attendu: ["faux", "non"] },
          ],
        },
        {
          enonce: "L'arboricultrice a cueilli 30 pommes, 15 poires et 45 prunes.\nElle trace un diagramme. Un carreau vaut 5 fruits.\nCombien de carreaux de haut fait chaque barre ?\na) pommes b) poires c) prunes",
          figure: axeVide(50, 5, ["pommes", "poires", "prunes"]),
          correction:
            "Un carreau vaut 5. Je cherche combien de fois 5 dans chaque nombre.\na) $6 \\times 5 = 30$ : 6 carreaux.\nb) $3 \\times 5 = 15$ : 3 carreaux.\nc) $9 \\times 5 = 45$ : 9 carreaux.\n⛔ Le piège : tracer 30 carreaux pour les pommes. La barre sortirait de la feuille.\nRéponse : a) 6 ; b) 3 ; c) 9.",
          micros: ["ce2_donnees_produire"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: ["9", "neuf"] },
          ],
        },
        {
          enonce: "Ce tableau dit comment les élèves viennent à l'école.\na) Combien de CM1 viennent en bus ?\nb) Combien d'élèves viennent à pied, CE2 et CM1 ensemble ?",
          figure: croise(["", "à pied", "bus", "voiture"], [["CE2", 9, 6, 10], ["CM1", 7, 12, 5]]),
          correction:
            "a) Ligne « CM1 », colonne « bus » : 12.\nb) Colonne « à pied » : CE2 9, CM1 7.\n$9 + 7 = 16$ élèves.\n⛔ Le piège du a) : lire la ligne CE2, et dire 6. Je garde le doigt sur la ligne CM1.\nRéponse : a) 12 ; b) 16.",
          micros: ["ce2_donnees_double_entree", "ce2_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: "12" },
            { question: "b)", attendu: "16" },
          ],
        },
        {
          enonce: "Au cinéma, la salle a 150 places. Le tableau donne les places vendues.\na) Combien de places sont restées vides à 17 h ?\nb) Combien de places vendues en tout ?",
          figure: grille(["Séance", "Places vendues"], [["14 h", 85], ["17 h", 120], ["20 h", 145]]),
          correction:
            "a) À 17 h : 120 places vendues, sur 150.\nPlaces vides : $150 - 120 = 30$.\nb) J'additionne les trois séances.\n$85 + 120 = 205$, puis $205 + 145 = 350$ places.\n⛔ Le piège du a) : répondre 120. Ce sont les places vendues, pas les places vides.\nRéponse : a) 30 ; b) 350.",
          micros: ["ce2_donnees_probleme", "ce2_donnees_lire_tableau"],
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "350" },
          ],
        },
        {
          enonce: "À la ferme, on compte les œufs ramassés.\na) Combien d'œufs de plus le mercredi que le mardi ?\nb) Quels jours a-t-on ramassé plus de 12 œufs ? Écris les jours séparés par « ; ».",
          figure: barres(
            [
              { label: "lundi", value: 14 },
              { label: "mardi", value: 8 },
              { label: "mercredi", value: 18 },
              { label: "jeudi", value: 10 },
            ],
            { pas: 2, unite: "œufs" },
          ),
          correction:
            "L'axe va de 2 en 2. Je lis : lundi 14, mardi 8, mercredi 18, jeudi 10.\na) $18 - 8 = 10$ œufs de plus.\nb) Plus de 12 : 14 et 18. Ce sont le lundi et le mercredi.\n⛔ Le piège du a) : additionner $18 + 8$. « De plus » demande l'écart, donc une soustraction.\nRéponse : a) 10 ; b) lundi ; mercredi.",
          micros: ["ce2_donnees_interpreter"],
          reponses: [
            { question: "a)", attendu: "10" },
            { question: "b)", attendu: ["lundi ; mercredi", "lundi et mercredi"] },
          ],
        },
        {
          enonce: "En arts plastiques, chaque élève vote pour une couleur. Lis le diagramme, puis complète le tableau.\na) Combien de votes pour le bleu ?\nb) Combien de votes pour le vert ?\nc) Combien de votes en tout ?",
          figure: (
            <div className="grid gap-2">
              {barres(
                [
                  { label: "rouge", value: 6 },
                  { label: "bleu", value: 9 },
                  { label: "vert", value: 3 },
                ],
                { pas: 3, unite: "votes" },
              )}
              {grille(["Couleur", "Votes"], [["rouge", 6], ["bleu", "?"], ["vert", "?"], ["Total", "?"]], { total: true })}
            </div>
          ),
          correction:
            "L'axe va de 3 en 3.\na) La barre « bleu » s'arrête à 9.\nb) La barre « vert » s'arrête à 3.\nc) $6 + 9 + 3 = 18$ votes.\n⛔ Le piège du c) : oublier le rouge, déjà écrit dans le tableau. Le total compte toutes les cases.\nRéponse : a) 9 ; b) 3 ; c) 18.",
          micros: ["ce2_donnees_completer_tableau", "ce2_donnees_lire_graphique"],
          reponses: [
            { question: "a)", attendu: "9" },
            { question: "b)", attendu: ["3", "trois"] },
            { question: "c)", attendu: "18" },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je cherche les nombres utiles, puis je calcule.",
      rappel: [
        "Une case qui manque : le total moins les cases connues.",
        "Deux fois plus : le double. Deux de plus : on ajoute 2.",
        "Sans graduation, je trouve d'abord ce que vaut un carreau.",
      ],
      exercices: [
        {
          titre: "La tombola de l'école",
          enonce: "Les classes vendent des tickets de tombola. Une case du tableau est effacée.\na) Combien de tickets le CE2 a-t-il vendus ?\nb) Un ticket coûte 2 €. Combien d'euros le CE2 a-t-il gagnés ?",
          figure: grille(["Classe", "Tickets vendus"], [["CP", 45], ["CE1", 60], ["CE2", "?"], ["Total", 200]], { total: true }),
          correction:
            "a) Le CP et le CE1 ensemble : $45 + 60 = 105$ tickets.\nLe CE2 : $200 - 105 = 95$ tickets.\nJe vérifie : $45 + 60 + 95 = 200$.\nb) 95 tickets à 2 € : le double de 95.\n$95 + 95 = 190$ €.\n⛔ Le piège du a) : retirer une seule classe du total. Il faut retirer le CP ET le CE1.\nRéponse : a) 95 ; b) 190.",
          micros: ["ce2_donnees_probleme", "ce2_donnees_completer_tableau", "ce2_donnees_defi"],
          reponses: [
            { question: "a)", attendu: "95" },
            { question: "b)", attendu: "190" },
          ],
        },
        {
          titre: "L'atelier de vélos",
          enonce: "Le mécanicien note les vélos réparés chaque jour, du lundi au vendredi.\na) Combien de vélos a-t-il réparés dans la semaine ?\nb) Quel jour a-t-il réparé deux fois plus de vélos que le mardi ?",
          figure: barres(
            [
              { label: "lun.", value: 15 },
              { label: "mar.", value: 10 },
              { label: "mer.", value: 25 },
              { label: "jeu.", value: 20 },
              { label: "ven.", value: 30 },
            ],
            { pas: 5, unite: "vélos" },
          ),
          correction:
            "L'axe va de 5 en 5. Je lis : lundi 15, mardi 10, mercredi 25, jeudi 20, vendredi 30.\na) $15 + 10 = 25$. $25 + 25 = 50$. $50 + 20 = 70$. $70 + 30 = 100$ vélos.\nb) Le double du mardi : $10 + 10 = 20$. C'est le jeudi.\n⛔ Le piège du b) : chercher 2 de plus, 12. Deux fois plus, c'est le double.\nRéponse : a) 100 ; b) jeudi.",
          micros: ["ce2_donnees_probleme", "ce2_donnees_interpreter", "ce2_donnees_defi"],
          reponses: [
            { question: "a)", attendu: "100" },
            { question: "b)", attendu: ["jeudi", "le jeudi"] },
          ],
        },
        {
          titre: "La récolte du potager",
          enonce: "Le diagramme de la maraîchère a perdu ses nombres.\nLa barre des tomates fait 4 carreaux, et elle vaut 20 kg.\na) Combien de kilogrammes vaut un carreau ?\nb) Combien de kilogrammes de courgettes a-t-elle récoltés ?",
          figure: barresCarreaux([
            { label: "tomates", carreaux: 4 },
            { label: "courgettes", carreaux: 7 },
            { label: "salades", carreaux: 2 },
          ]),
          correction:
            "a) 4 carreaux valent 20 kg. Je cherche le nombre qui, 4 fois, fait 20.\n$4 \\times 5 = 20$. Un carreau vaut 5 kg.\nb) Je compte la barre des courgettes : 7 carreaux.\n$7 \\times 5 = 35$ kg.\n⛔ Le piège du b) : répondre 7 kg. Un carreau vaut 5 kg, pas 1 kg.\nRéponse : a) 5 ; b) 35.",
          micros: ["ce2_donnees_defi", "ce2_donnees_lire_graphique"],
          reponses: [
            { question: "a)", attendu: ["5", "cinq"], unite: "kg" },
            { question: "b)", attendu: "35", unite: "kg" },
          ],
        },
        {
          titre: "Le club de sport",
          enonce: "Au club, 30 enfants font du foot ou de la danse. Il y a 14 filles.\nRetrouve les cases effacées.\na) Combien de garçons font du foot ?\nb) Combien de garçons y a-t-il en tout ?\nc) Combien de garçons font de la danse ?",
          figure: croise(["", "foot", "danse", "Total"], [["filles", 10, "?", 14], ["garçons", "?", "?", "?"], ["Total", 18, "?", 30]]),
          correction:
            "a) Colonne « foot » : 18 enfants, dont 10 filles.\nGarçons au foot : $18 - 10 = 8$.\nb) Colonne « Total » : 30 enfants, dont 14 filles.\nGarçons : $30 - 14 = 16$.\nc) 16 garçons, dont 8 au foot.\nGarçons à la danse : $16 - 8 = 8$.\n⛔ Le piège : mélanger les lignes. Je reste sur la ligne « garçons » pour finir.\nRéponse : a) 8 ; b) 16 ; c) 8.",
          micros: ["ce2_donnees_defi", "ce2_donnees_double_entree", "ce2_donnees_probleme"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: "16" },
            { question: "c)", attendu: ["8", "huit"] },
          ],
        },
      ],
    },
  ],
};
