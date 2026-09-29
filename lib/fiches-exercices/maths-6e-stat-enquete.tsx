// ─── Fiche d'exercices : mener une enquête (6e) — 20 exercices corrigés ─────────
//
// Lot de 6e du 30/09/2026, sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` et de la feuille voisine
// `maths-5e-stat-statistique.tsx` (aide `grille` reprise, mesurée à 375 px).
//
// Pas de fiche de cours de 6e pour cette notion (fichesCours: []). Alignée sur
// la banque `lib/tutor-v4/questionBank/6e/maths/donnees.bank.ts`, notionId
// stat_enquete : planifier une enquête (la question exacte, qui interroger, le
// biais d'échantillon), réaliser des mesures et les consigner (une ligne par
// objet, l'unité dans l'en-tête, une seule unité par colonne), construire un
// tableau d'effectifs (une ligne par réponse POSSIBLE, un trait par réponse,
// le total qui contrôle), lire un tableau.
// ⛔ LIMITES DE LA 6e, lues dans la banque : ni moyenne ni médiane (la banque
// ne cite « la moyenne » que comme mauvaise réponse), ni fréquence. Les
// conversions restent celles de la 6e : g et kg, mm et cm.
// ⛔ Aucun exemple de la banque repris tel quel (tailles de cinq camarades,
// feuilles 12 / 9 / 15, 1,2 kg et 800 g, 25 élèves football 9 / natation 6 /
// danse 7 / escalade 3, bus-vélo-marche de 10 élèves), ni de la feuille de 5e.
// ⭐ Phrases courtes (Frédéric, 30/09) : des 6e qui lisent parfois mal. Une
// idée par phrase, 12 mots en moyenne.
//
// Les pièges nommés : calculer avant d'avoir la question (1), interroger ceux
// qui ont déjà la réponse (2, 19), une question qui souffle la réponse (3),
// l'unité répétée ou oubliée (4), des unités mélangées (5, 18, 20), relire la
// liste une fois par catégorie (6, 13), recopier un effectif voisin (8),
// oublier la ligne du 0 (9, 16), un jour sans pluie n'est pas un jour oublié
// (10), trop peu de personnes, au mauvais moment (11), lire la mauvaise
// colonne (12), un animal compté deux fois (13), le plus rapide a le plus
// PETIT temps (14), le prix d'une entrée pris pour celui de la carte (15),
// généraliser à tous les enfants (17), un jour sans mesure n'est pas un 0 (20).
//
// Aucun fait réel : les tomates, les pommes, les saisons, le glacier, les
// instruments, les livres des vacances, la pluie, les clubs, la mare, le
// 50 m, la piscine, les animaux de la maison, le sommeil, le jardinier, les
// deux sondages et le pain jeté sont des MODÈLES, à des ordres de grandeur
// vraisemblables.
//
// ⭐ LES DESSINS : trois aides locales, sans largeur minimale — `grille`
// (tableau HTML de trois colonnes au plus, reprise de la 5e : le tableau EST
// l'objet de la notion), `etapes` (les étapes d'une enquête, des boîtes
// reliées par des flèches, viewBox 300, police 14) et `foule` (les élèves du
// collège en points, le groupe interrogé encadré : on VOIT qui n'a aucune
// chance d'être choisi). 14 dessins imprimés ; les schémas qui redisent le
// corrigé sont `ecranSeulement`, leurs données sont alors dans l'énoncé.
//
// Les corrigés sont écrits à la première personne (« je compte »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-stat-enquete.mjs` —
// les listes brutes recomptées réponse par réponse, les traits comptés, chaque
// total, écart, conversion et somme refaits depuis l'énoncé ou le tableau.
//
// Micro-compétences : stat_enquete_planifier (1, 2, 3, 11, 16, 17, 19),
// stat_enquete_mesurer (4, 5, 10, 13, 14, 18, 20), stat_construire_tableau (6,
// 8, 9, 13, 16, 17, 20), stat_donnee_lire_tableau (7, 12, 15, 18, 19). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * Un tableau HTML de plusieurs lignes (reprise de la 5e) : TROIS colonnes au
 * plus, textes courts — il tient dans 235 px sans défiler. La dernière ligne
 * en gras si `total`. ⛔ Texte NU dans les cases.
 */
const grille = (entetes: string[], lignes: string[][], total = false) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[14rem]">
    <table className="w-full border-collapse text-center text-[13px] print:text-[10px]">
      <thead>
        <tr>
          {entetes.map((e, i) => (
            <th key={i} className="border border-slate-300 bg-slate-100 px-1.5 py-1 font-bold text-slate-700">
              {e}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => (
          <tr key={i} className={total && i === lignes.length - 1 ? "bg-slate-50 font-bold" : ""}>
            {l.map((c, j) => (
              <td key={j} className="border border-slate-300 px-1.5 py-0.5 text-slate-800">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * Les ÉTAPES d'une enquête : une boîte par étape, reliées par des flèches, de
 * haut en bas. SVG local, viewBox 300, police 14, 44 d'écart entre deux
 * boîtes. ⛔ 30 signes au plus par étape (le script le vérifie).
 */
const etapes = (liste: string[]) => {
  const H = liste.length * 44 - 6;
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Étapes de l'enquête">
        {liste.map((texte, i) => {
          const y = i * 44;
          return (
            <g key={i}>
              <rect x="20" y={y + 1} width="260" height="30" rx="8" fill={i === 0 ? "#fed7aa" : "#dbeafe"} stroke={i === 0 ? ORANGE : BLEU} strokeWidth="1.5" />
              <text x="150" y={y + 21} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a">
                {texte}
              </text>
              {i < liste.length - 1 ? (
                <g>
                  <line x1="150" y1={y + 31} x2="150" y2={y + 39} stroke="#334155" strokeWidth="2" />
                  <path d={`M 144 ${y + 37} L 156 ${y + 37} L 150 ${y + 44} Z`} fill="#334155" />
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Une FOULE d'élèves : `total` points, dix par ligne. Les `groupe` premiers
 * (dix au plus) sont en orange et encadrés : ce sont les élèves interrogés.
 * Tous les autres, en gris, n'ont aucune chance d'être choisis. Légende en
 * dessous, deux lignes à 20 d'écart. SVG local, viewBox 300, police 14.
 */
const foule = (total: number, groupe: number, legende: string) => {
  const lignes = Math.ceil(total / 10);
  const [x0, y0, dx] = [33, 22, 26];
  const yLeg = y0 + (lignes - 1) * dx + 34;
  const H = yLeg + 30;
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Élèves du collège">
        <rect x="0" y="0" width="300" height={H} rx="10" fill="#fff" />
        {Array.from({ length: total }, (_, i) => (
          <circle key={i} cx={x0 + (i % 10) * dx} cy={y0 + Math.floor(i / 10) * dx} r="8" fill={i < groupe ? ORANGE : "#cbd5e1"} />
        ))}
        <rect x={x0 - 13} y={y0 - 13} width={(groupe - 1) * dx + 26} height="26" rx="8" fill="none" stroke={ORANGE} strokeWidth="2" strokeDasharray="5 3" />
        <circle cx="30" cy={yLeg - 5} r="7" fill={ORANGE} />
        <text x="44" y={yLeg} fontSize="14" fontWeight="800" fill="#0f172a">
          {legende}
        </text>
        <circle cx="30" cy={yLeg + 15} r="7" fill="#cbd5e1" />
        <text x="44" y={yLeg + 20} fontSize="14" fontWeight="700" fill="#334155">
          les autres élèves
        </text>
      </svg>
    </div>
  );
};

export const exercicesStatEnquete6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "stat-enquete",
  titre: "Mener une enquête",
  accroche:
    "Vingt exercices, du geste seul au problème. Choisir la bonne question et les bonnes personnes. Mesurer et noter dans un tableau, avec la bonne unité. Ranger une liste de réponses dans un tableau d'effectifs. Lire un tableau. Des tomates, des pommes, un glacier, une mare, la piscine, la cantine, le sommeil, deux sondages qui ne disent pas la même chose. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je choisis, je mesure ou je compte, puis je vérifie.",
      rappel: [
        "Une enquête commence par une question précise, posée aux bonnes personnes.",
        "Je note chaque réponse ou chaque mesure tout de suite, dans un tableau.",
        "L'unité s'écrit une seule fois, en haut de la colonne.",
        "Tableau d'effectifs : une ligne par réponse possible. L'effectif, c'est combien de fois elle apparaît.",
      ],
      exercices: [
        {
          enonce:
            "Tu veux savoir combien de livres les élèves de ta classe lisent par mois. Voici les étapes, dans le désordre.\nA : ranger les réponses dans un tableau.\nB : poser la question à chaque élève.\nC : écrire la question exacte.\nD : lire le tableau pour conclure.\nRemets les étapes dans l'ordre.",
          correction:
            "Je me demande : qu'est-ce qui doit être prêt avant chaque étape ?\nPour poser la question, il faut d'abord l'écrire : C vient en premier.\nEnsuite, je pose la question à chaque élève : B.\nPuis je range les réponses dans un tableau : A.\nEnfin, je lis le tableau pour conclure : D.\n⛔ Le piège : commencer par le tableau ou le calcul. Sans question précise, les réponses ne se comptent pas.\nRéponse : C, B, A, D.",
          schema: etapes(["1. écrire la question", "2. poser la question", "3. ranger dans un tableau", "4. lire et conclure"]),
          micros: ["stat_enquete_planifier"],
        },
        {
          enonce:
            "Inès veut savoir si les élèves du collège aiment nager. Elle interroge $8$ élèves à la sortie de la piscine.\na) Pourquoi son résultat sera-t-il faussé ?\nb) Qui devrait-elle interroger ?",
          correction:
            "a) À la sortie de la piscine, les élèves viennent de nager. Beaucoup aiment la natation.\nLes élèves qui ne vont jamais à la piscine n'ont aucune chance d'être interrogés.\nSon groupe ne ressemble pas à tout le collège : le résultat sera faussé.\nb) Des élèves tirés au sort dans toutes les classes.\nAinsi, chaque élève du collège a une chance d'être choisi.\n⛔ Le piège : interroger ceux qui ont déjà la réponse. Aucun calcul ne répare un mauvais choix de personnes.\nRéponse : a) elle n'interroge que des nageurs ; b) des élèves tirés au sort dans toutes les classes.",
          schema: foule(40, 8, "interrogés à la piscine"),
          micros: ["stat_enquete_planifier"],
        },
        {
          enonce:
            "Tu veux savoir comment les élèves viennent au collège. Quelle question choisir ? Explique.\nA : « Tu viens à pied, j'espère ? »\nB : « Comment viens-tu au collège : bus, vélo, à pied ou voiture ? »\nC : « Que penses-tu du bus ? »",
          correction:
            "Une bonne question donne des réponses courtes, qu'on peut compter.\nA souffle la réponse : « j'espère » pousse à dire « oui ».\nC donne une réponse différente pour chaque élève : impossible de les compter.\nB propose quatre réponses possibles. Chaque élève en choisit une.\nJe peux préparer mon tableau : une ligne par réponse.\n⛔ Le piège : une question qui oriente. Elle fausse toutes les réponses d'un coup.\nRéponse : la question B.",
          schema: ecranSeulement(
            grille(["réponse", "traits", "effectif"], [
              ["bus", "", ""],
              ["vélo", "", ""],
              ["à pied", "", ""],
              ["voiture", "", ""],
            ]),
          ),
          micros: ["stat_enquete_planifier"],
        },
        {
          enonce:
            "Tu mesures la hauteur de quatre plants de tomates. Plant $1$ : $18$ cm. Plant $2$ : $25$ cm. Plant $3$ : $12$ cm. Plant $4$ : $30$ cm.\na) Range ces mesures dans un tableau à deux colonnes.\nb) Où écris-tu l'unité ?\nc) Quel plant est le plus haut ?",
          correction:
            "a) Une colonne dit QUEL plant. L'autre colonne donne sa hauteur.\nJ'écris une ligne par plant.\nb) J'écris l'unité une seule fois, en haut : « hauteur (cm) ».\nDans les cases, je n'écris que les nombres.\nc) Le plus grand nombre est $30$ : c'est le plant $4$.\n⛔ Le piège : répéter « cm » dans chaque case, ou l'oublier partout. Sans unité, $30$ ne veut rien dire.\nRéponse : c) le plant $4$, avec $30$ cm.",
          schema: grille(["plant", "hauteur (cm)"], [
            ["1", "18"],
            ["2", "25"],
            ["3", "12"],
            ["4", "30"],
          ]),
          micros: ["stat_enquete_mesurer"],
        },
        {
          enonce:
            "Lou pèse quatre pommes. Elle note : $150$ g ; $0{,}2$ kg ; $180$ g ; $0{,}12$ kg.\na) Quel est le problème ?\nb) Écris toutes les masses en grammes.\nc) Quelle pomme est la plus lourde ?",
          correction:
            "a) Les masses ne sont pas dans la même unité : des grammes et des kilogrammes.\nOn ne peut pas les comparer comme ça.\nb) $1$ kg $= 1\\,000$ g.\n$0{,}2$ kg $= 200$ g. Et $0{,}12$ kg $= 120$ g.\nLes quatre masses : $150$ g, $200$ g, $180$ g, $120$ g.\nc) La plus grande est $200$ g : c'est la pomme $2$.\n⛔ Le piège : croire que $0{,}2$ est plus petit que $150$. Avant de comparer, je mets tout dans la même unité.\nRéponse : b) $150$ g, $200$ g, $180$ g, $120$ g ; c) la pomme $2$.",
          schema: ecranSeulement(
            grille(["pomme", "masse (g)"], [
              ["1", "150"],
              ["2", "200"],
              ["3", "180"],
              ["4", "120"],
            ]),
          ),
          micros: ["stat_enquete_mesurer"],
        },
        {
          enonce:
            "$16$ élèves disent leur saison préférée : E pour été, H pour hiver, P pour printemps, A pour automne. Voici leurs réponses :\nE H E P A E H E P E A E H P E E\na) Range ces réponses dans un tableau d'effectifs.\nb) Vérifie ton total.\nc) Quelle est la saison préférée ?",
          correction:
            "a) Je fais une ligne par saison. Je lis la liste une seule fois.\nPour chaque lettre, je fais un trait dans la bonne ligne.\nÉté : $8$. Hiver : $3$. Printemps : $3$. Automne : $2$.\nb) $8 + 3 + 3 + 2 = 16$. C'est le nombre d'élèves : personne n'est oublié.\nc) Le plus grand effectif est $8$ : l'été.\n⛔ Le piège : relire la liste une fois pour chaque lettre. On en saute facilement une.\nRéponse : été $8$, hiver $3$, printemps $3$, automne $2$ ; l'été.",
          schema: grille(["saison", "traits", "effectif"], [
            ["été", "||||| |||", "8"],
            ["hiver", "|||", "3"],
            ["printemps", "|||", "3"],
            ["automne", "||", "2"],
            ["total", "", "16"],
          ], true),
          micros: ["stat_construire_tableau"],
        },
        {
          enonce:
            "Un glacier note les cornets vendus un samedi.\na) Combien de cornets à la fraise ?\nb) Quel parfum a vendu $41$ cornets ?\nc) Quel parfum s'est le moins vendu ?\nd) Combien de cornets à la vanille de plus qu'au citron ?",
          figure: grille(["parfum", "cornets"], [
            ["vanille", "34"],
            ["chocolat", "41"],
            ["fraise", "27"],
            ["citron", "18"],
          ]),
          correction:
            "a) Je cherche la ligne « fraise », puis je lis la case : $27$.\nb) Je cherche $41$ dans la colonne des cornets. Il est sur la ligne « chocolat ».\nc) Le plus petit nombre est $18$ : le citron.\nd) $34 - 18 = 16$ cornets de plus.\n⛔ Le piège : lire la case de la ligne d'à côté. Je pose mon doigt sur la ligne.\nRéponse : a) $27$ ; b) le chocolat ; c) le citron ; d) $16$.",
          micros: ["stat_donnee_lire_tableau"],
        },
        {
          enonce:
            "On a interrogé $30$ élèves sur l'instrument qu'ils voudraient apprendre. Le tableau est presque complet. Trouve l'effectif du violon.",
          figure: grille(["instrument", "effectif"], [
            ["guitare", "11"],
            ["piano", "7"],
            ["batterie", "5"],
            ["violon", "?"],
            ["total", "30"],
          ], true),
          correction:
            "Chaque élève a donné une réponse. Donc la somme des effectifs fait $30$.\nJ'additionne ce que je connais : $11 + 7 + 5 = 23$.\nIl reste $30 - 23 = 7$ élèves pour le violon.\nContrôle : $11 + 7 + 5 + 7 = 30$.\n⛔ Le piège : recopier un nombre voisin, ou deviner. Je pars toujours du total.\nRéponse : $7$ élèves.",
          micros: ["stat_construire_tableau"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur la même enquête. Je range, je vérifie le total, puis je réponds.",
      rappel: [
        "Je lis la liste une seule fois, avec un trait par réponse.",
        "Contrôle : la somme des effectifs est égale au nombre de personnes interrogées.",
        "Dans une colonne, toutes les mesures sont dans la même unité.",
      ],
      exercices: [
        {
          enonce:
            "$25$ élèves disent combien de livres ils ont lus pendant les vacances :\n2 0 1 3 1 2 0 4 1 2 1 0 3 2 1 1 2 0 1 3 2 1 4 1 2\na) Range ces réponses dans un tableau d'effectifs, de $0$ à $4$ livres.\nb) Vérifie ton total.\nc) Combien d'élèves ont lu au moins $2$ livres ?\nd) Combien d'élèves n'ont lu aucun livre ?",
          correction:
            "a) Une ligne par réponse possible : $0$, $1$, $2$, $3$ et $4$ livres.\nJe lis la liste une fois, un trait par réponse.\n$0$ livre : $4$. $1$ livre : $9$. $2$ livres : $7$. $3$ livres : $3$. $4$ livres : $2$.\nb) $4 + 9 + 7 + 3 + 2 = 25$ : le compte est bon.\nc) « Au moins $2$ », c'est $2$, $3$ ou $4$ livres : $7 + 3 + 2 = 12$ élèves.\nd) C'est la ligne du $0$ : $4$ élèves.\n⛔ Le piège : oublier la ligne du $0$. Ces élèves ont répondu, ils comptent aussi.\nRéponse : c) $12$ élèves ; d) $4$ élèves.",
          schema: grille(["livres", "traits", "effectif"], [
            ["0", "||||", "4"],
            ["1", "||||| ||||", "9"],
            ["2", "||||| ||", "7"],
            ["3", "|||", "3"],
            ["4", "||", "2"],
            ["total", "", "25"],
          ], true),
          micros: ["stat_construire_tableau"],
        },
        {
          enonce:
            "Chaque matin, la classe lit le pluviomètre du collège. Lundi : $4$ mm. Mardi : $0$ mm. Mercredi : $12$ mm. Jeudi : $7$ mm. Vendredi : $0$ mm. Samedi : $3$ mm. Dimanche : $9$ mm.\na) Construis le tableau des relevés.\nb) Combien de jours sans pluie ?\nc) Combien de pluie est tombée dans la semaine ?\nd) Quel jour a été le plus pluvieux ?",
          correction:
            "a) Une colonne pour le jour, une colonne « pluie (mm) ». Une ligne par jour.\nb) Je compte les $0$ : mardi et vendredi. Cela fait $2$ jours.\nc) $4 + 0 + 12 + 7 + 0 + 3 + 9 = 35$ mm.\nd) Le plus grand nombre est $12$ : mercredi.\n⛔ Le piège : ne pas écrire les jours à $0$ mm. On a bien mesuré ces jours-là : il n'est rien tombé. Le $0$ est une vraie mesure.\nRéponse : b) $2$ jours ; c) $35$ mm ; d) mercredi.",
          schema: ecranSeulement(
            grille(["jour", "pluie (mm)"], [
              ["lundi", "4"],
              ["mardi", "0"],
              ["mercredi", "12"],
              ["jeudi", "7"],
              ["vendredi", "0"],
              ["samedi", "3"],
              ["dimanche", "9"],
            ]),
          ),
          micros: ["stat_enquete_mesurer"],
        },
        {
          enonce:
            "Un glacier veut savoir quel nouveau parfum proposer cet été. Un matin de janvier, il interroge $5$ clients.\na) Trouve deux défauts de son enquête.\nb) Propose une meilleure enquête.",
          correction:
            "a) Premier défaut : $5$ clients, c'est très peu. Le hasard peut tout changer.\nDeuxième défaut : en janvier, peu de gens achètent des glaces. Ce ne sont pas les clients de l'été.\nb) J'interroge beaucoup de clients, par exemple $100$.\nJe les interroge au printemps, à des heures différentes.\nJe pose une question précise : « Lequel de ces quatre parfums choisirais-tu ? »\nJe note chaque réponse dans un tableau.\n⛔ Le piège : croire qu'une petite enquête, faite n'importe quand, suffit.\nRéponse : a) trop peu de clients, au mauvais moment.",
          schema: ecranSeulement(etapes(["qui : beaucoup de clients", "quand : au printemps", "question : 4 parfums", "noter dans un tableau"])),
          micros: ["stat_enquete_planifier"],
        },
        {
          enonce:
            "Ce tableau donne le nombre d'élèves inscrits aux clubs du collège.\na) Combien d'élèves de 5e font de la robotique ?\nb) Combien d'élèves font du théâtre, en tout ?\nc) Combien d'élèves de 6e sont inscrits à un club ?\nd) Quel club a plus d'élèves de 5e que de 6e ?",
          figure: grille(["club", "6e", "5e"], [
            ["échecs", "8", "5"],
            ["théâtre", "12", "9"],
            ["robotique", "7", "11"],
          ]),
          correction:
            "Chaque case croise une ligne (le club) et une colonne (la classe).\na) Ligne « robotique », colonne « 5e » : $11$.\nb) Ligne « théâtre » : $12 + 9 = 21$ élèves.\nc) Toute la colonne « 6e » : $8 + 12 + 7 = 27$ élèves.\nd) Je compare les deux cases de chaque ligne. Robotique : $11$ en 5e, $7$ en 6e.\n⛔ Le piège au a) : lire la colonne « 6e » et répondre $7$.\nRéponse : a) $11$ ; b) $21$ ; c) $27$ ; d) la robotique.",
          micros: ["stat_donnee_lire_tableau"],
        },
        {
          enonce:
            "Pendant $10$ minutes, Nora observe une mare. Elle note chaque animal qu'elle voit : G pour grenouille, L pour libellule, C pour canard, T pour tortue.\nL G L C L G L T L G C L L G L C L G L L\na) Range ses notes dans un tableau d'effectifs.\nb) Vérifie ton total.\nc) Quel animal a-t-elle vu le plus souvent ?\nd) Nora a-t-elle vu $20$ animaux différents ?",
          correction:
            "a) Une ligne par animal. Un trait par lettre, en lisant la liste une fois.\nLibellule : $11$. Grenouille : $5$. Canard : $3$. Tortue : $1$.\nb) $11 + 5 + 3 + 1 = 20$ : il y a bien $20$ lettres.\nc) La libellule : $11$ fois.\nd) Pas forcément. Une même libellule peut passer plusieurs fois.\nNora a noté $20$ passages, pas $20$ animaux différents.\n⛔ Le piège : croire que chaque note est un nouvel animal. Je me demande toujours ce que je compte vraiment.\nRéponse : c) la libellule ; d) pas forcément.",
          schema: ecranSeulement(
            grille(["animal", "traits", "effectif"], [
              ["libellule", "||||| ||||| |", "11"],
              ["grenouille", "|||||", "5"],
              ["canard", "|||", "3"],
              ["tortue", "|", "1"],
              ["total", "", "20"],
            ], true),
          ),
          micros: ["stat_construire_tableau", "stat_enquete_mesurer"],
        },
        {
          enonce:
            "En sport, on chronomètre quatre élèves sur $50$ m. Ana : $9{,}2$ s. Bilel : $8{,}7$ s. Chloé : $10{,}1$ s. Dan : $9$ s.\na) Range ces temps dans un tableau.\nb) Classe les élèves du plus rapide au plus lent.\nc) Quel est l'écart entre le plus rapide et le plus lent ?",
          correction:
            "a) Une colonne « élève », une colonne « temps (s) ». J'écris $9$ s sous la forme $9{,}0$ : les nombres s'alignent mieux.\nb) Le plus rapide met le MOINS de temps.\nJe range les temps du plus petit au plus grand : $8{,}7$ ; $9{,}0$ ; $9{,}2$ ; $10{,}1$.\nL'ordre est : Bilel, Dan, Ana, Chloé.\nc) $10{,}1 - 8{,}7 = 1{,}4$ s.\n⛔ Le piège : croire que le plus grand temps gagne. En course, le plus petit temps gagne.\nRéponse : b) Bilel, Dan, Ana, Chloé ; c) $1{,}4$ s.",
          schema: ecranSeulement(
            grille(["élève", "temps (s)"], [
              ["Bilel", "8,7"],
              ["Dan", "9,0"],
              ["Ana", "9,2"],
              ["Chloé", "10,1"],
            ]),
          ),
          micros: ["stat_enquete_mesurer"],
        },
        {
          enonce:
            "Voici les tarifs d'une piscine.\na) Combien paie un adulte qui vient avec deux enfants ?\nb) Léo, $11$ ans, viendra $10$ fois cette année. Vaut-il mieux payer chaque entrée ou prendre la carte ?\nc) Combien Léo économise-t-il ?",
          figure: grille(["entrée", "prix (€)"], [
            ["enfant", "3"],
            ["adulte", "5"],
            ["carte enfant 10 entrées", "25"],
          ]),
          correction:
            "a) Je lis la ligne « adulte » : $5$ €. Puis la ligne « enfant » : $3$ €.\n$5 + 3 + 3 = 11$ €.\nb) Dix entrées payées une à une : $10 \\times 3 = 30$ €.\nLa carte coûte $25$ €. $25$ est plus petit que $30$ : la carte est moins chère.\nc) $30 - 25 = 5$ €.\n⛔ Le piège : comparer $25$ € à $3$ €. La carte vaut pour DIX entrées : je compare au prix de dix entrées.\nRéponse : a) $11$ € ; b) la carte ; c) $5$ €.",
          micros: ["stat_donnee_lire_tableau"],
        },
        {
          enonce:
            "Tu vas demander à $25$ élèves : « Combien d'animaux as-tu à la maison ? » Les réponses possibles sont $0$, $1$, $2$, ou « $3$ et plus ».\na) Combien de lignes de réponses aura ton tableau d'effectifs ?\nb) Faut-il une ligne pour « $0$ » ?\nc) Comment vérifier, à la fin, que tu n'as oublié personne ?",
          correction:
            "a) Une ligne par réponse possible, pas une par élève.\nIl y a $4$ réponses possibles : $4$ lignes, plus la ligne du total.\nb) Oui. Un élève sans animal donne la réponse « $0$ ». Il faut une ligne pour lui.\nc) J'additionne les effectifs. La somme doit faire $25$.\nSi je trouve $24$, j'ai oublié quelqu'un. Si je trouve $26$, j'ai compté quelqu'un deux fois.\n⛔ Le piège : faire $25$ lignes, une par élève. Le tableau ne recopie pas : il COMPTE.\nRéponse : a) $4$ lignes ; b) oui ; c) la somme doit faire $25$.",
          schema: grille(["animaux", "traits", "effectif"], [
            ["0", "", ""],
            ["1", "", ""],
            ["2", "", ""],
            ["3 et plus", "", ""],
            ["total", "", "25"],
          ], true),
          micros: ["stat_enquete_planifier", "stat_construire_tableau"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une vraie enquête, de la question à la conclusion. Je prépare, je range, je vérifie, puis je conclus avec prudence.",
      rappel: [
        "Les personnes interrogées doivent ressembler à tout le groupe étudié.",
        "Je vérifie toujours le total, et toujours les unités.",
        "Une petite enquête donne une conclusion prudente.",
      ],
      exercices: [
        {
          titre: "L'enquête sur le sommeil",
          enonce:
            "Ta classe veut savoir combien d'heures dorment les élèves, un soir d'école.\na) Écris une question précise à poser.\nb) Voici les réponses de $20$ élèves, en heures :\n9 10 9 8 9 10 11 9 8 9 10 9 9 10 8 9 11 10 9 9\nConstruis le tableau des effectifs.\nc) Vérifie ton total.\nd) Combien d'élèves dorment $10$ heures ou plus ?\ne) Peut-on dire : « Les enfants de $11$ ans dorment $9$ heures » ?",
          correction:
            "a) Par exemple : « Combien d'heures as-tu dormi hier soir, arrondi à l'heure ? »\nLa réponse est un nombre : je peux compter.\nb) Les réponses vont de $8$ à $11$ : quatre lignes.\n$8$ h : $3$. $9$ h : $10$. $10$ h : $5$. $11$ h : $2$.\nc) $3 + 10 + 5 + 2 = 20$ : le compte est bon.\nd) $10$ h ou plus : $5 + 2 = 7$ élèves.\ne) Non. On a interrogé $20$ élèves d'une seule classe, un seul soir.\nOn peut seulement dire : dans cette classe, ce soir-là, $9$ h est la réponse la plus fréquente.\n⛔ Le piège : parler de tous les enfants avec une petite enquête.\nRéponse : d) $7$ élèves ; e) non.",
          schema: grille(["sommeil (h)", "traits", "effectif"], [
            ["8", "|||", "3"],
            ["9", "||||| |||||", "10"],
            ["10", "|||||", "5"],
            ["11", "||", "2"],
            ["total", "", "20"],
          ], true),
          micros: ["stat_enquete_planifier", "stat_construire_tableau"],
        },
        {
          titre: "Le carnet du jardinier",
          enonce:
            "Un jardinier mesure deux plants chaque semaine. Il note tout dans ce tableau.\na) Une case pose problème. Laquelle ? Corrige-la.\nb) En semaine $3$, quel plant est le plus haut ?\nc) De combien le plant A a-t-il grandi entre la semaine $1$ et la semaine $4$ ?\nd) Et le plant B ?",
          figure: grille(["semaine", "plant A (cm)", "plant B (cm)"], [
            ["1", "4", "5"],
            ["2", "9", "8"],
            ["3", "15", "120 mm"],
            ["4", "20", "16"],
          ]),
          correction:
            "a) La colonne annonce des centimètres. Mais en semaine $3$, le plant B est noté en millimètres.\n$10$ mm $= 1$ cm. Donc $120$ mm $= 12$ cm.\nb) Semaine $3$ : A mesure $15$ cm, B mesure $12$ cm. Le plant A est le plus haut.\nc) Plant A : $20 - 4 = 16$ cm.\nd) Plant B : $16 - 5 = 11$ cm.\n⛔ Le piège au b) : voir « $120$ » et croire que B est bien plus haut. Je convertis avant de comparer.\nRéponse : a) $120$ mm $= 12$ cm ; b) le plant A ; c) $16$ cm ; d) $11$ cm.",
          micros: ["stat_enquete_mesurer", "stat_donnee_lire_tableau"],
        },
        {
          titre: "Deux sondages, deux résultats",
          enonce:
            "Sam et Lina veulent connaître le sport préféré des élèves du collège. Sam interroge $30$ élèves du club de foot. Lina tire au sort $30$ élèves dans toutes les classes.\na) Quel sport gagne chez Sam ? Et chez Lina ?\nb) Vérifie les deux totaux.\nc) Quel sondage faut-il croire ? Explique.\nd) Chez Lina, combien d'élèves n'ont pas choisi le foot ?",
          figure: grille(["sport", "Sam", "Lina"], [
            ["foot", "24", "9"],
            ["danse", "1", "7"],
            ["natation", "3", "8"],
            ["autres", "2", "6"],
          ]),
          correction:
            "a) Chez Sam, le foot gagne : $24$. Chez Lina aussi, le foot gagne, mais de peu : $9$, contre $8$ pour la natation.\nb) Sam : $24 + 1 + 3 + 2 = 30$. Lina : $9 + 7 + 8 + 6 = 30$. Les deux totaux sont justes.\nc) Celui de Lina. Tous les élèves du collège avaient une chance d'être choisis.\nSam n'a interrogé que des joueurs de foot : ils préfèrent le foot, bien sûr.\nd) $30 - 9 = 21$ élèves.\n⛔ Le piège : croire le sondage de Sam parce que ses calculs sont justes. Ses calculs sont justes, mais il a interrogé les mauvaises personnes.\nRéponse : a) le foot, les deux fois ; c) celui de Lina ; d) $21$ élèves.",
          micros: ["stat_enquete_planifier", "stat_donnee_lire_tableau"],
        },
        {
          titre: "La pesée du pain",
          enonce:
            "La cantine pèse le pain jeté chaque jour. Lundi : $2{,}5$ kg. Mardi : $1\\,800$ g. Jeudi : $3$ kg. Vendredi : $900$ g. Le mercredi, la cantine est fermée.\na) Écris toutes les masses en grammes.\nb) Construis le tableau des relevés.\nc) Combien de pain jeté dans la semaine ? Donne la réponse en g, puis en kg.\nd) Faut-il écrire « $0$ » pour le mercredi ?",
          correction:
            "a) $1$ kg $= 1\\,000$ g.\nLundi : $2{,}5$ kg $= 2\\,500$ g. Jeudi : $3$ kg $= 3\\,000$ g.\nMardi et vendredi sont déjà en grammes : $1\\,800$ g et $900$ g.\nb) Une colonne « jour », une colonne « pain jeté (g) ». Une ligne par jour de cantine.\nc) $2\\,500 + 1\\,800 + 3\\,000 + 900 = 8\\,200$ g.\n$8\\,200$ g $= 8{,}2$ kg.\nd) Non. Le mercredi, on n'a rien mesuré : il n'y a pas de repas.\nÉcrire $0$ ferait croire qu'on a pesé et trouvé $0$ g.\n⛔ Le piège : additionner $2{,}5 + 1\\,800 + 3 + 900$. Je convertis d'abord, puis j'additionne.\nRéponse : c) $8\\,200$ g, soit $8{,}2$ kg ; d) non.",
          schema: grille(["jour", "pain jeté (g)"], [
            ["lundi", "2 500"],
            ["mardi", "1 800"],
            ["jeudi", "3 000"],
            ["vendredi", "900"],
            ["total", "8 200"],
          ], true),
          micros: ["stat_enquete_mesurer", "stat_construire_tableau"],
        },
      ],
    },
  ],
};
