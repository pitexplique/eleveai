// ─── Fiche d'exercices : instructions et déplacements codés (CP) ──────────────
//
// 17/11/2026 : la feuille interactive de la notion `algorithmique` du coach
// CP, « Instructions et déplacements codés » (4 micros). Sur la forme de
// `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau,
// corrigés à la première personne, étape par étape, avec le piège nommé.
// Alignée sur la banque du coach
// (`lib/tutor-v4/questionBank/cp/maths/algorithmique.bank.ts`).
// ⛔ LIMITES DU CP (BO n° 41 du 31/10/2024) : des instructions en mots
// (avancer, reculer, tourner à droite, tourner à gauche) ou des flèches sur
// un quadrillage NU ; DIX instructions au plus, dont deux virages ; des
// suites de symboles qui se répètent (« ABAB… : la 19e lettre ? »). Pas de
// Scratch, aucune coordonnée.
// ⛔ Aucune question à rédiger : QCM par lettre, un nombre, un mot.
// ⛔ Phrases de 14 mots au plus, une idée par phrase.
//
// Les pièges nommés : compter la case de départ (1, 4), avancer au lieu de
// tourner (2), le motif mal repéré (3, 5, 11, 18), oublier une carte (6, 10),
// la flèche du mauvais sens (7, 12), la 7e lettre comptée à partir de 0 (8, 15),
// s'arrêter avant la fin du code (9, 19), l'ordre des instructions (13), lire
// le code voulu au lieu du code écrit (14), tourner du mauvais côté (16), le
// code le plus court qui touche un rocher (17), croire qu'un code différent
// mène ailleurs (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : robot de la classe (1, 2, 13, 16), jeux
// (3, 8, 15), animaux (4, 7, 9, 12), jardin (14, 19), livraison (17),
// bijoux (18), vacances (20). Les métiers : livreur (17), bijoutière (18),
// jardinier (19). AUCUN contexte réunionnais sur cette feuille (il est sur la
// feuille « monnaie » du même lot).
//
// ⭐ FAITS RÉELS : aucun. Les robots et les codes sont des MODÈLES.
//
// ⭐ LES DESSINS : le quadrillage NU (`grille` de dessins-cm1-geometrie :
// aucun nombre, aucune lettre), les objets au centre des cases, les flèches
// écrites dans l'énoncé. ⛔ Le chemin n'est jamais dessiné quand on demande où
// il mène. Des cartes d'instructions (`cartes`), des suites de formes
// (`suite`) dont l'élément cherché n'est JAMAIS dessiné, un robot et sa
// direction (`robot`).
//
// Micro-compétences : cp_algo_instruction (1, 2, 6, 10, 13, 14, 16),
// cp_algo_deplacement (1, 4, 7, 9, 12, 14, 17, 19, 20), cp_algo_suite_logique
// (3, 5, 8, 11, 15, 18), cp_algo_defi (17, 18, 19, 20). 4/4.

import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, ORANGE_CLAIR, grille, type Grille, type P2 } from "@/lib/fiches-exercices/dessins-cm1-geometrie";

const NOIR = "#0f172a";
const GRIS = "#64748b";
const ROUGE = "#dc2626";
const VERT = "#16a34a";
const JAUNE = "#facc15";
const GRIS_CLAIR = "#e2e8f0";

/**
 * Le quadrillage NU de dessins-cm1-geometrie, mais les dessins (emoji) des
 * cases sont écrits en GRAND (la case les limite à 16 px : illisible au
 * vidéoprojecteur). Les lettres et les prénoms restent dans leur case.
 */
const plan = (g: Grille) => {
  const u = Math.min(g.taille ?? 34, 280 / g.col, 230 / g.lig);
  const estDessin = (t?: string) => !!t && /\p{Extended_Pictographic}/u.test(t);
  return grille({
    ...g,
    cases: (g.cases ?? []).map((c) => (estDessin(c.texte) ? { ...c, texte: undefined } : c)),
    textes: [
      ...(g.textes ?? []),
      ...(g.cases ?? []).filter((c) => estDessin(c.texte)).map((c) => ({ en: [c.c + 0.5, c.l + 0.5] as P2, t: c.texte as string, taille: Math.round(u * 0.62) })),
    ],
  });
};

/** Des cartes d'instructions, l'une sous l'autre, numérotées dans l'ordre. */
const cartes = (lignes: string[], titre?: string) => (
  <div className="mx-auto w-full max-w-[15rem] print:max-w-[11rem]">
    <svg viewBox={`0 0 240 ${lignes.length * 44 + (titre ? 30 : 6)}`} className="block h-auto w-full" role="img" aria-label="Cartes d'instructions">
      {titre ? (
        <text x={120} y={20} textAnchor="middle" fontSize="15" fontWeight="800" fill={GRIS}>
          {titre}
        </text>
      ) : null}
      {lignes.map((l, i) => {
        const y = (titre ? 30 : 6) + i * 44;
        return (
          <g key={i}>
            <rect x={6} y={y} width={228} height={36} rx={10} fill={ORANGE_CLAIR} stroke={ORANGE} strokeWidth={2} />
            <circle cx={26} cy={y + 18} r={11} fill={ORANGE} />
            <text x={26} y={y + 23} textAnchor="middle" fontSize="13" fontWeight="900" fill="#ffffff">
              {i + 1}
            </text>
            <text x={46} y={y + 23} fontSize="14" fontWeight="700" fill={NOIR}>
              {l}
            </text>
          </g>
        );
      })}
    </svg>
  </div>
);

type Symbole = { f: "rond" | "carre" | "triangle" | "perle" | "texte"; c?: string; t?: string };

/** Le début d'une suite qui se répète, puis une case « ? ». */
const suite = (liste: Symbole[], avecQuestion = true) => {
  const n = liste.length + (avecQuestion ? 1 : 0);
  const pas = 44;
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 ${n * pas + 8} 56`} className="block h-auto w-full" role="img" aria-label="Le début d'une suite">
        {liste.map((s, i) => {
          const [cx, cy] = [4 + pas / 2 + i * pas, 28];
          const c = s.c ?? BLEU;
          if (s.f === "rond") return <circle key={i} cx={cx} cy={cy} r={15} fill={c} />;
          if (s.f === "perle") return <circle key={i} cx={cx} cy={cy} r={13} fill={c} stroke={NOIR} strokeWidth={1.5} />;
          if (s.f === "carre") return <rect key={i} x={cx - 14} y={cy - 14} width={28} height={28} rx={2} fill={c} />;
          if (s.f === "triangle") return <polygon key={i} points={`${cx},${cy - 16} ${cx + 16},${cy + 13} ${cx - 16},${cy + 13}`} fill={c} />;
          return (
            <g key={i}>
              <rect x={cx - 17} y={cy - 18} width={34} height={36} rx={6} fill="#f8fafc" stroke="#cbd5e1" strokeWidth={1.5} />
              <text x={cx} y={cy + 7} textAnchor="middle" fontSize="20" fontWeight="900" fill={NOIR}>
                {s.t}
              </text>
            </g>
          );
        })}
        {avecQuestion ? (
          <g>
            <rect x={4 + liste.length * pas + 5} y={10} width={34} height={36} rx={6} fill="#fff7ed" stroke={ORANGE} strokeWidth={2} strokeDasharray="4 3" />
            <text x={4 + liste.length * pas + 22} y={36} textAnchor="middle" fontSize="20" fontWeight="900" fill={ORANGE}>
              ?
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
};

/** Le robot de la classe et la flèche de sa direction (vers la droite). */
const robot = () => (
  <div className="mx-auto w-full max-w-[10rem] print:max-w-[8rem]">
    <svg viewBox="0 0 160 90" className="block h-auto w-full" role="img" aria-label="Un robot qui regarde vers la droite">
      <text x={44} y={60} textAnchor="middle" fontSize="40">
        🤖
      </text>
      <line x1={76} y1={46} x2={140} y2={46} stroke={ORANGE} strokeWidth={5} strokeLinecap="round" />
      <polygon points="152,46 136,36 136,56" fill={ORANGE} />
    </svg>
  </div>
);

export const exercicesAlgorithmiqueCp: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cp",
  notion: "algorithmique",
  titre: "Instructions et déplacements codés",
  accroche:
    "Vingt exercices pour suivre et écrire un code. Des flèches sur un quadrillage, des cartes pour le robot de la classe. Des suites de formes qui se répètent : qui vient ensuite ? Un livreur, une bijoutière et un jardinier. Un rappel avant chaque niveau. Cherche d'abord. Puis ouvre la correction.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cp",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Je suis le code avec le doigt, une case à la fois.",
      rappel: [
        "Une flèche fait avancer d'une case : → à droite, ← à gauche, ↑ en haut, ↓ en bas.",
        "Je ne compte pas la case de départ.",
        "Dans une suite qui se répète, je cherche d'abord le motif.",
      ],
      exercices: [
        {
          enonce: "Le robot suit les flèches : → → →\nSur quoi s'arrête-t-il ?",
          figure: plan({
            col: 6,
            lig: 1,
            cases: [
              { c: 0, l: 0, texte: "🤖" },
              { c: 1, l: 0, texte: "🌸" },
              { c: 2, l: 0, texte: "🍄" },
              { c: 3, l: 0, texte: "🍎" },
              { c: 4, l: 0, texte: "⭐" },
              { c: 5, l: 0, texte: "🎁" },
            ],
          }),
          correction:
            "Je pose le doigt sur le robot. Je ne compte pas sa case.\n1re flèche : la fleur. 2e flèche : le champignon. 3e flèche : la pomme.\nLe robot s'arrête sur la pomme.\n⛔ Le piège : compter la case du robot comme la 1re. On s'arrête alors sur le champignon.\nRéponse : la pomme.",
          micros: ["cp_algo_deplacement", "cp_algo_instruction"],
          reponses: [{ attendu: ["pomme", "la pomme", "une pomme"] }],
        },
        {
          enonce: "Le robot lit la carte « tourner à droite ».\nQue fait-il ? Écris la lettre.\nA) il avance d'une case\nB) il tourne sur place, vers sa droite\nC) il recule d'une case",
          figure: cartes(["tourner à droite"]),
          correction:
            "La carte dit « tourner ». Elle ne dit pas « avancer ».\nLe robot reste sur sa case. Il change seulement de direction, vers sa droite.\n⛔ Le piège : croire qu'il avance vers la droite. Pour avancer, il faut une autre carte.\nRéponse : B.",
          micros: ["cp_algo_instruction"],
          reponses: [{ attendu: ["B", "B) il tourne sur place, vers sa droite"] }],
        },
        {
          enonce: "Voici le début d'un jeu de jetons.\nQuelle couleur vient à la place du « ? » ?",
          figure: suite([
            { f: "rond", c: ROUGE },
            { f: "rond", c: BLEU },
            { f: "rond", c: ROUGE },
            { f: "rond", c: BLEU },
            { f: "rond", c: ROUGE },
          ]),
          correction:
            "Je cherche le motif qui se répète : rouge, bleu.\nRouge, bleu, rouge, bleu, rouge… Après le rouge vient le bleu.\n⛔ Le piège : répondre rouge, la couleur la plus nombreuse. Je suis le motif.\nRéponse : bleu.",
          micros: ["cp_algo_suite_logique"],
          reponses: [{ attendu: ["bleu", "le bleu", "un bleu"] }],
        },
        {
          enonce: "La tortue veut manger la salade. Elle va tout droit.\nCombien de flèches → faut-il écrire ?",
          figure: plan({
            col: 7,
            lig: 1,
            cases: [
              { c: 0, l: 0, texte: "🐢" },
              { c: 5, l: 0, texte: "🥬" },
            ],
          }),
          correction:
            "Une flèche → fait avancer d'une case vers la droite.\nJe compte les cases depuis la tortue, sans compter la sienne : 1, 2, 3, 4, 5.\nLa salade est sur la 5e case. Il faut 5 flèches.\n⛔ Le piège : compter aussi la case de la tortue, et écrire 6.\nRéponse : 5.",
          micros: ["cp_algo_deplacement"],
          reponses: [{ attendu: ["5", "cinq"] }],
        },
        {
          enonce: "Voici une suite de formes.\nQuelle forme vient à la place du « ? » ?\nÉcris : triangle, rond ou carré.",
          figure: suite([
            { f: "triangle", c: VERT },
            { f: "rond", c: ORANGE },
            { f: "carre", c: BLEU },
            { f: "triangle", c: VERT },
            { f: "rond", c: ORANGE },
            { f: "carre", c: BLEU },
            { f: "triangle", c: VERT },
          ]),
          correction:
            "Je cherche le motif : triangle, rond, carré. Il a 3 formes.\nIl revient : triangle, rond, carré, puis triangle…\nAprès le triangle vient le rond.\n⛔ Le piège : croire que le motif a 2 formes. Je regarde jusqu'à ce que le triangle revienne.\nRéponse : rond.",
          micros: ["cp_algo_suite_logique"],
          reponses: [{ attendu: ["rond", "un rond", "le rond", "cercle", "disque"] }],
        },
        {
          enonce: "Lou est le robot du jeu. Il suit ces cartes dans l'ordre.\nDe combien de cases avance-t-il en tout ?",
          figure: cartes(["avancer de 2 cases", "avancer de 1 case"]),
          correction:
            "Je lis les cartes dans l'ordre.\nCarte 1 : il avance de 2 cases.\nCarte 2 : il avance encore de 1 case.\n2 + 1 = 3. Il avance de 3 cases en tout.\n⛔ Le piège : lire une seule carte, et répondre 2.\nRéponse : 3.",
          micros: ["cp_algo_instruction"],
          reponses: [{ attendu: ["3", "trois"] }],
        },
        {
          enonce: "Le chat veut attraper la souris.\nQuelle flèche doit-il suivre ? Écris la lettre.\nA) → B) ↑ C) ← D) ↓",
          figure: plan({
            col: 3,
            lig: 3,
            cases: [
              { c: 1, l: 0, texte: "🐱" },
              { c: 1, l: 1, texte: "🐭" },
            ],
          }),
          correction:
            "Je regarde où est la souris par rapport au chat.\nLa souris est dans la case juste au-dessus du chat.\nPour monter d'une case, c'est la flèche ↑.\n⛔ Le piège : choisir ↓. Cette flèche descend, et la souris est en haut.\nRéponse : B.",
          micros: ["cp_algo_deplacement"],
          reponses: [{ attendu: ["B", "B) ↑", "↑"] }],
        },
        {
          enonce: "Voici une suite de lettres : A B A B A B…\nQuelle est la 7e lettre ?",
          figure: suite([
            { f: "texte", t: "A" },
            { f: "texte", t: "B" },
            { f: "texte", t: "A" },
            { f: "texte", t: "B" },
            { f: "texte", t: "A" },
            { f: "texte", t: "B" },
          ]),
          correction:
            "Le motif est A, B. Il se répète.\nJe compte sur mes doigts : 1 A, 2 B, 3 A, 4 B, 5 A, 6 B, 7 A.\nLa 7e lettre est A.\n⛔ Le piège : s'arrêter à la dernière lettre dessinée, B. La 7e n'est pas encore dessinée.\nRéponse : A.",
          micros: ["cp_algo_suite_logique"],
          reponses: [{ attendu: ["A"] }],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux petites étapes. Je suis tout le code, jusqu'à la dernière flèche.",
      rappel: [
        "Je suis les flèches dans l'ordre, de gauche à droite.",
        "Reculer, c'est revenir en arrière : j'enlève des cases.",
        "Tourner ne fait pas changer de case.",
      ],
      exercices: [
        {
          enonce: "Le chien suit ce code : → → ↑ ↑\nOù arrive-t-il ?",
          figure: plan({
            col: 5,
            lig: 4,
            cases: [
              { c: 0, l: 0, texte: "🐶" },
              { c: 2, l: 0, texte: "⚽" },
              { c: 2, l: 1, texte: "🥣" },
              { c: 2, l: 2, texte: "🦴" },
              { c: 0, l: 2, texte: "🏠" },
            ],
          }),
          correction:
            "Je suis les flèches une par une, avec le doigt.\n→ → : 2 cases vers la droite. J'arrive sur le ballon.\n↑ ↑ : 2 cases vers le haut. Je passe sur la gamelle, puis j'arrive sur l'os.\nLe chien arrive sur l'os.\n⛔ Le piège : s'arrêter avant la fin du code, sur le ballon ou la gamelle.\nRéponse : l'os.",
          micros: ["cp_algo_deplacement"],
          reponses: [{ attendu: ["os", "l'os", "un os"] }],
        },
        {
          enonce: "Le robot suit ces cartes dans l'ordre.\nÀ combien de cases du départ s'arrête-t-il ?",
          figure: cartes(["avancer de 3 cases", "reculer de 1 case", "avancer de 2 cases"]),
          correction:
            "Je lis les cartes une par une.\nCarte 1 : il avance de 3. Il est à 3 cases du départ.\nCarte 2 : il recule de 1. 3 − 1 = 2.\nCarte 3 : il avance de 2. 2 + 2 = 4.\nIl s'arrête à 4 cases du départ.\n⛔ Le piège : ajouter toutes les cartes, 3 + 1 + 2 = 6. Reculer enlève une case.\nRéponse : 4.",
          micros: ["cp_algo_instruction"],
          reponses: [{ attendu: ["4", "quatre"] }],
        },
        {
          enonce: "Voici le début d'une frise.\nQuel sera le 9e dessin ? Écris : carré ou triangle.",
          figure: suite(
            [
              { f: "carre", c: BLEU },
              { f: "carre", c: BLEU },
              { f: "triangle", c: ORANGE },
              { f: "carre", c: BLEU },
              { f: "carre", c: BLEU },
              { f: "triangle", c: ORANGE },
            ],
            false,
          ),
          correction:
            "Je cherche le motif : carré, carré, triangle. Il a 3 dessins.\nJe continue en comptant : 7 carré, 8 carré, 9 triangle.\nLe 9e dessin est un triangle.\n⛔ Le piège : croire que le motif est carré, triangle. Il y a DEUX carrés avant chaque triangle.\nRéponse : triangle.",
          micros: ["cp_algo_suite_logique"],
          reponses: [{ attendu: ["triangle", "un triangle", "le triangle"] }],
        },
        {
          enonce: "La tortue va jusqu'à la salade. Elle va d'abord à droite, puis en haut.\na) Combien de flèches → faut-il ?\nb) Combien de flèches ↑ faut-il ?",
          figure: plan({
            col: 5,
            lig: 4,
            cases: [
              { c: 0, l: 0, texte: "🐢" },
              { c: 3, l: 2, texte: "🥬" },
            ],
          }),
          correction:
            "Je fais le chemin avec le doigt.\na) Vers la droite, jusqu'à la colonne de la salade : 1, 2, 3. Il faut 3 flèches →.\nb) Puis vers le haut, jusqu'à la salade : 1, 2. Il faut 2 flèches ↑.\nLe code est → → → ↑ ↑.\n⛔ Le piège : mélanger les deux sens, et compter 5 flèches →.\nRéponse : a) 3 ; b) 2.",
          micros: ["cp_algo_deplacement"],
          reponses: [
            { question: "a)", attendu: ["3", "trois"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Deux robots partent de la même case. Ils regardent dans le même sens.\nArrivent-ils au même endroit ? Écris oui ou non.",
          figure: (
            <div className="grid grid-cols-2 gap-2">
              {cartes(["avancer de 2 cases", "tourner à droite"], "Robot A")}
              {cartes(["tourner à droite", "avancer de 2 cases"], "Robot B")}
            </div>
          ),
          correction:
            "Je joue les deux codes, l'un après l'autre.\nRobot A : il avance de 2 cases tout droit. Puis il tourne, sans bouger de case.\nRobot B : il tourne d'abord. Puis il avance de 2 cases vers sa droite.\nA est devant le départ, B est à droite du départ. Non.\n⛔ Le piège : croire que l'ordre ne compte pas. Les mêmes cartes, dans un autre ordre, mènent ailleurs.\nRéponse : non.",
          micros: ["cp_algo_instruction"],
          reponses: [{ attendu: ["non", "faux"] }],
        },
        {
          enonce: "Mia voulait aller à la fleur. Elle a écrit : → ↑ ↑\na) Où arrive Mia avec son code ?\nb) Combien de flèches → fallait-il pour la fleur ?",
          figure: plan({
            col: 4,
            lig: 4,
            cases: [
              { c: 0, l: 0, texte: "👧" },
              { c: 2, l: 1, texte: "🌸" },
              { c: 1, l: 2, texte: "🐝" },
            ],
          }),
          correction:
            "a) Je suis le code écrit, pas le code voulu.\n→ : 1 case à droite. ↑ ↑ : 2 cases en haut. Mia arrive sur l'abeille.\nb) La fleur est à 2 cases à droite, puis 1 case en haut.\nIl fallait 2 flèches →. Le bon code était → → ↑.\n⛔ Le piège du a) : répondre « la fleur ». Le code de Mia a une erreur : il la mène ailleurs.\nRéponse : a) l'abeille ; b) 2.",
          micros: ["cp_algo_deplacement", "cp_algo_instruction"],
          reponses: [
            { question: "a)", attendu: ["abeille", "l'abeille", "une abeille"] },
            { question: "b)", attendu: ["2", "deux"] },
          ],
        },
        {
          enonce: "Voici une suite de nombres : 1 2 3 1 2 3 1…\nQuel est le 10e nombre ?",
          figure: suite([
            { f: "texte", t: "1" },
            { f: "texte", t: "2" },
            { f: "texte", t: "3" },
            { f: "texte", t: "1" },
            { f: "texte", t: "2" },
            { f: "texte", t: "3" },
            { f: "texte", t: "1" },
          ], false),
          correction:
            "Le motif est 1, 2, 3. Il a 3 nombres.\nJe continue : 8e : 2. 9e : 3. 10e : 1.\nLe 10e nombre est 1.\n⛔ Le piège : répondre 10. On demande le nombre écrit à la 10e place, pas la place.\nRéponse : 1.",
          micros: ["cp_algo_suite_logique"],
          reponses: [{ attendu: ["1", "un"] }],
        },
        {
          enonce: "Le robot regarde vers la droite.\nIl tourne d'un quart de tour à gauche.\nVers où regarde-t-il ? Écris la lettre.\nA) vers le haut B) vers le bas C) vers la gauche",
          figure: robot(),
          correction:
            "Je me mets à la place du robot. Je tends le bras vers la droite.\nUn quart de tour à gauche : mon bras tourne vers le haut de la feuille.\nLe robot regarde vers le haut.\n⛔ Le piège : choisir « vers la gauche ». Pour regarder à gauche, il faut un demi-tour.\nRéponse : A.",
          micros: ["cp_algo_instruction"],
          reponses: [{ attendu: ["A", "A) vers le haut", "vers le haut", "en haut"] }],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le défi. Je teste chaque code avec le doigt, case par case.",
      rappel: [
        "Un bon code mène au but, sans passer sur un obstacle.",
        "Pour trouver le 10e dessin, je répète le motif en comptant.",
        "Deux codes différents peuvent mener au même endroit.",
      ],
      exercices: [
        {
          titre: "Le robot livreur",
          enonce: "Le robot livreur doit porter le colis. Il ne peut pas passer sur un rocher.\na) Quel code est le bon ?\nA) → → → ↑ ↑\nB) ↑ ↑ → → →\nC) ↑ → → → ↑\nb) Combien de flèches a le bon code ?",
          figure: plan({
            col: 5,
            lig: 4,
            cases: [
              { c: 0, l: 0, texte: "🤖" },
              { c: 1, l: 0, couleur: GRIS_CLAIR, texte: "🪨" },
              { c: 2, l: 2, couleur: GRIS_CLAIR, texte: "🪨" },
              { c: 3, l: 2, texte: "📦" },
            ],
          }),
          correction:
            "Je teste chaque code, case par case.\nA : la 1re flèche → mène sur un rocher. Non.\nB : ↑ ↑, puis → : bien. Mais la 2e flèche → mène sur l'autre rocher. Non.\nC : ↑, puis → → → passe sous le rocher du haut. Puis ↑ : le colis. Oui.\na) C'est le code C.\nb) Je compte ses flèches : 1, 2, 3, 4, 5.\n⛔ Le piège : choisir A, le code le plus simple. Il passe sur un rocher.\nRéponse : a) C ; b) 5.",
          micros: ["cp_algo_deplacement", "cp_algo_defi"],
          reponses: [
            { question: "a)", attendu: ["C"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          titre: "Le collier de la bijoutière",
          enonce: "Une bijoutière enfile des perles. Elle répète toujours le même motif.\na) Quelle couleur aura la 8e perle ?\nb) Quelle couleur aura la 10e perle ?",
          figure: suite(
            [
              { f: "perle", c: BLEU },
              { f: "perle", c: BLEU },
              { f: "perle", c: ROUGE },
              { f: "perle", c: JAUNE },
              { f: "perle", c: BLEU },
              { f: "perle", c: BLEU },
            ],
            false,
          ),
          correction:
            "Je cherche le motif : bleu, bleu, rouge, jaune. Il a 4 perles.\nJe continue en comptant : 7e rouge, 8e jaune, 9e bleu, 10e bleu.\na) La 8e perle est jaune.\nb) La 10e perle est bleue.\n⛔ Le piège : croire que le motif est bleu, rouge. Il y a DEUX bleues, puis une rouge, puis une jaune.\nRéponse : a) jaune ; b) bleu.",
          micros: ["cp_algo_suite_logique", "cp_algo_defi"],
          reponses: [
            { question: "a)", attendu: ["jaune", "une jaune"] },
            { question: "b)", attendu: ["bleu", "bleue", "une bleue"] },
          ],
        },
        {
          titre: "Le chemin du jardinier",
          enonce: "Le jardinier part de la cabane. Il suit ce code : → → → ↑ ↑ ←\na) Combien d'instructions a ce code ?\nb) Où arrive-t-il ?",
          figure: plan({
            col: 5,
            lig: 4,
            cases: [
              { c: 0, l: 0, texte: "🛖" },
              { c: 2, l: 2, texte: "🌻" },
              { c: 3, l: 2, texte: "🥕" },
              { c: 3, l: 0, texte: "🍅" },
            ],
          }),
          correction:
            "a) Je compte les flèches : 1, 2, 3, 4, 5, 6. Le code a 6 instructions.\nb) Je le suis avec le doigt.\n→ → → : 3 cases à droite, j'arrive sur la tomate.\n↑ ↑ : 2 cases en haut, j'arrive sur la carotte.\n← : 1 case à gauche, j'arrive sur le tournesol.\n⛔ Le piège : oublier la dernière flèche ←, et répondre « la carotte ».\nRéponse : a) 6 ; b) le tournesol.",
          micros: ["cp_algo_deplacement", "cp_algo_defi"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["tournesol", "le tournesol", "la fleur", "fleur"] },
          ],
        },
        {
          titre: "Le chemin de la plage",
          enonce: "Sami et Léa partent de la maison pour la plage.\nSami écrit : → ↑ → ↑ → ↑\nLéa écrit : → → → ↑ ↑ ↑\na) Arrivent-ils au même endroit ? Écris oui ou non.\nb) Combien de flèches a chaque code ?",
          figure: plan({
            col: 5,
            lig: 5,
            cases: [
              { c: 0, l: 0, texte: "🏠" },
              { c: 3, l: 3, texte: "🏖️" },
            ],
          }),
          correction:
            "Je suis chaque code avec le doigt.\nSami : 1 à droite, 1 en haut, 3 fois. Il arrive sur la plage.\nLéa : 3 à droite, puis 3 en haut. Elle arrive aussi sur la plage.\na) Oui, ils arrivent au même endroit.\nb) Chaque code a 3 flèches → et 3 flèches ↑ : 3 + 3 = 6 flèches.\n⛔ Le piège : croire qu'un code différent mène forcément ailleurs. Ici, les deux mènent à la plage.\nRéponse : a) oui ; b) 6.",
          micros: ["cp_algo_deplacement", "cp_algo_defi"],
          reponses: [
            { question: "a)", attendu: ["oui", "vrai"] },
            { question: "b)", attendu: ["6", "six"] },
          ],
        },
      ],
    },
  ],
};
