// ─── Fiche d'exercices : instructions et déplacements codés (CE1) — 20 exercices ─
//
// 17/11/2026 : la feuille interactive de la notion `algorithmique` du coach
// CE1 (4 micros). Sur la forme de `maths-cm1-masse.tsx` : 8 ★, 8 ★★, 4 ★★★, un
// rappel avant chaque niveau, corrigés à la première personne, étape par
// étape, avec le piège nommé. Alignée sur la banque
// `lib/tutor-v4/questionBank/ce1/maths/algorithmique.bank.ts` et sur le
// programme du cycle 2 : « avancer de deux cases », « tourner d'un quart de
// tour à droite / à gauche », coder un déplacement avec des flèches, une
// répétition simple (« répéter 3 fois »).
// ⛔ LIMITES DU CE1 : quinze instructions au plus, quatre virages au plus.
// Ni variable, ni « si », ni boucle dans une boucle. Des nombres < 20.
// ⛔ Aucune question à rédiger : la case d'arrivée (« C2 »), un nombre, un mot
// (« droite », « bas »), oui ou non, ou le QCM du bon code.
// Phrases de 16 mots au plus.
//
// LE QUADRILLAGE : les colonnes sont des lettres (A, B, C… de gauche à
// droite), les lignes des nombres (1 en bas). → fait passer à la lettre
// suivante, ↑ au nombre suivant. Le robot part du rond vert « R ».
//
// Les pièges nommés : lire les flèches dans le désordre (1, 7), compter les
// instructions au lieu des cases (2, 5, LE piège du programme : « tourner »
// ne fait pas avancer), passer à côté de la cible (3), lire la boucle une
// seule fois (4, 10, 16), tourner du mauvais côté (6, 13), inverser → et ↑
// (8), passer sur un rocher (9, 20), oublier une flèche (11, 14), refaire
// l'aller au lieu de l'inverser (12), compter 3 quarts de tour (15), oublier
// le recul (16), oublier le retour (17), oublier un colis (18), 12 ÷ 3 fait
// par essais (19), le chemin le plus court qui traverse un rocher (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (1, 3, 7), sport (2), robot de classe
// (4, 5, 6, 8, 13, 15), montagne (9), escalier (10), dessin (11), promenade
// (12), trésor (14), course (16), livraison (17), entrepôt (18),
// informatique (19), jardin (20). Métiers : livreur (17), magasinière (18),
// informaticienne (19), jardinière (20). Aucun contexte réunionnais.
//
// ⭐ FAITS RÉELS : aucun. Robots et drones sont des MODÈLES.
//
// ⭐ LES DESSINS (locaux) : `quadrillage` (repris de `maths-cm1-algorithmique.tsx` :
// cases lettre + nombre, rochers gris, objets, trajet du corrigé en orange),
// `bande` (une ligne de cases numérotées), `programme` (les instructions en
// cartes numérotées) et `orientation` (le robot et les quatre directions).
// Les trajets du corrigé sont `ecranSeulement`.
//
// Micro-compétences : ce1_algo_instruction (1, 2, 5, 6, 7, 13, 18),
// ce1_algo_deplacement (3, 8, 9, 12, 14, 17, 20), ce1_algo_repetition (4, 10,
// 11, 15, 16, 19), ce1_algo_defi (17, 18, 19, 20). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/* ── Le quadrillage (repris de maths-cm1-algorithmique.tsx) ──────────────── */

type Objet = { c: string; t: string; fond?: string };
type OptsQuadrillage = {
  /** La case de départ du robot (rond vert « R »). */
  depart?: string;
  /** Des objets posés dans des cases (texte court : 3 signes au plus). */
  objets?: Objet[];
  /** Les cases grises : le robot ne peut pas y aller. */
  rochers?: string[];
  /** Le trajet du corrigé, case par case (orange), arrivée entourée de rouge. */
  chemin?: string[];
};

const quadrillage = (cols: number, rows: number, o: OptsQuadrillage = {}) => {
  const T = 36;
  const G = 24;
  const HAUT = 6;
  const W = G + cols * T + 6;
  const H = HAUT + rows * T + 24;
  const centre = (c: string): [number, number] => {
    const col = c.charCodeAt(0) - 65;
    const row = Number(c.slice(1));
    return [G + col * T + T / 2, HAUT + (rows - row) * T + T / 2];
  };
  const fin = o.chemin?.length ? centre(o.chemin[o.chemin.length - 1]) : null;
  return (
    <div className="mx-auto w-full max-w-[17rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Quadrillage">
        <rect x="0" y="0" width={W} height={H} rx="8" fill="#ffffff" />
        {(o.rochers ?? []).map((c) => {
          const [x, y] = centre(c);
          return <rect key={`r${c}`} x={x - T / 2} y={y - T / 2} width={T} height={T} fill="#94a3b8" />;
        })}
        {Array.from({ length: cols + 1 }, (_, i) => (
          <line key={`v${i}`} x1={G + i * T} y1={HAUT} x2={G + i * T} y2={HAUT + rows * T} stroke="#64748b" strokeWidth={1} />
        ))}
        {Array.from({ length: rows + 1 }, (_, j) => (
          <line key={`h${j}`} x1={G} y1={HAUT + j * T} x2={G + cols * T} y2={HAUT + j * T} stroke="#64748b" strokeWidth={1} />
        ))}
        {Array.from({ length: cols }, (_, i) => (
          <text key={`l${i}`} x={G + i * T + T / 2} y={HAUT + rows * T + 18} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
            {String.fromCharCode(65 + i)}
          </text>
        ))}
        {Array.from({ length: rows }, (_, j) => (
          <text key={`n${j}`} x={G - 8} y={HAUT + (rows - 1 - j) * T + T / 2 + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
            {j + 1}
          </text>
        ))}
        {(o.objets ?? []).map((b) => {
          const [x, y] = centre(b.c);
          return (
            <g key={`o${b.c}`}>
              <rect x={x - 14} y={y - 12} width={28} height={24} rx={6} fill={b.fond ?? "#fde68a"} stroke={NOIR} strokeWidth={1} />
              <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="900" fill={NOIR}>
                {b.t}
              </text>
            </g>
          );
        })}
        {o.chemin?.length ? (
          <polyline points={o.chemin.map((c) => centre(c).join(",")).join(" ")} fill="none" stroke={ORANGE} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" opacity={0.85} />
        ) : null}
        {fin ? <circle cx={fin[0]} cy={fin[1]} r={13} fill="none" stroke={ROUGE} strokeWidth={3} /> : null}
        {o.depart
          ? (() => {
              const [x, y] = centre(o.depart);
              return (
                <g>
                  <circle cx={x} cy={y} r={11} fill={VERT} />
                  <text x={x} y={y + 5} textAnchor="middle" fontSize="13" fontWeight="900" fill="#ffffff">
                    R
                  </text>
                </g>
              );
            })()
          : null}
      </svg>
    </div>
  );
};

/** Une BANDE de cases numérotées de 0 à `n`, le robot sur la case `robot`. */
const bande = (n: number, robot = 0) => {
  const T = Math.min(30, 288 / (n + 1));
  const W = (n + 1) * T + 12;
  return (
    <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
      <svg viewBox={`0 0 ${W} 74`} className="block h-auto w-full" role="img" aria-label={`Une bande de cases numérotées de 0 à ${n}`}>
        {Array.from({ length: n + 1 }, (_, i) => (
          <g key={i}>
            <rect x={6 + i * T} y={10} width={T} height={T} fill="#ffffff" stroke="#64748b" strokeWidth={1} />
            <text x={6 + i * T + T / 2} y={10 + T + 18} textAnchor="middle" fontSize="13" fontWeight="800" fill={NOIR}>
              {i}
            </text>
          </g>
        ))}
        <circle cx={6 + robot * T + T / 2} cy={10 + T / 2} r={T * 0.32} fill={VERT} />
        <text x={6 + robot * T + T / 2} y={10 + T / 2 + 4.5} textAnchor="middle" fontSize="12" fontWeight="900" fill="#ffffff">
          R
        </text>
      </svg>
    </div>
  );
};

/** Un PROGRAMME : une carte par instruction, numérotée. */
const programme = (lignes: string[]) => (
  <ol className="mx-auto flex w-full max-w-[20rem] flex-col gap-1 print:max-w-[14rem]">
    {lignes.map((l, i) => (
      <li key={i} className="flex items-center gap-2 rounded-lg border border-sky-300 bg-sky-50 px-2 py-1 text-[14px] font-bold text-slate-800 print:text-[10px]">
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sky-600 text-[12px] font-black text-white">{i + 1}</span>
        <span className="break-words">{l}</span>
      </li>
    ))}
  </ol>
);

/** Le robot vu de dessus, qui REGARDE vers le haut, et les quatre directions. */
const orientation = () => (
  <div className="mx-auto w-full max-w-[10rem] print:max-w-[8rem]">
    <svg viewBox="0 0 160 160" className="block h-auto w-full" role="img" aria-label="Un robot qui regarde vers le haut">
      <circle cx="80" cy="80" r="24" fill={VERT} />
      <polygon points="80,40 70,58 90,58" fill={ROUGE} />
      <text x="80" y="86" textAnchor="middle" fontSize="15" fontWeight="900" fill="#ffffff">R</text>
      <text x="80" y="20" textAnchor="middle" fontSize="15" fontWeight="900" fill={NOIR}>haut</text>
      <text x="80" y="150" textAnchor="middle" fontSize="15" fontWeight="900" fill={NOIR}>bas</text>
      <text x="152" y="85" textAnchor="end" fontSize="15" fontWeight="900" fill={NOIR}>droite</text>
      <text x="8" y="85" textAnchor="start" fontSize="15" fontWeight="900" fill={NOIR}>gauche</text>
    </svg>
  </div>
);

const ETOILE = "★";
const OUI = ["oui", "vrai"];

export const exercicesAlgorithmiqueCe1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "ce1",
  notion: "algorithmique",
  titre: "Instructions et déplacements codés",
  accroche:
    "Vingt exercices, du geste seul au problème. Suivre des flèches sur un quadrillage. Écrire le code d'un chemin. Tourner d'un quart de tour sans avancer. Utiliser « répéter ». Un drone livreur, un robot d'entrepôt, une informaticienne et une tondeuse qui évite les fleurs. Un rappel avant chaque niveau. Cherche d'abord avec ton doigt sur le quadrillage. Puis ouvre la correction : étape par étape, avec le trajet dessiné.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=ce1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un geste par exercice. Je suis les instructions une par une, dans l'ordre.",
      rappel: [
        "Une flèche = une case. → à droite, ← à gauche, ↑ en haut, ↓ en bas.",
        "Une case se nomme par sa lettre, puis son nombre : C2.",
        "Tourner d'un quart de tour change la direction. Le robot ne bouge pas de sa case.",
      ],
      exercices: [
        {
          enonce: "Le robot R suit ce code : → → ↑\nSur quelle case arrive-t-il ?",
          figure: quadrillage(5, 4, { depart: "A1" }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", chemin: ["A1", "B1", "C1", "C2"] })),
          correction:
            "Je pars de A1 et je suis les flèches dans l'ordre.\n→ : j'avance d'une case à droite, en B1.\n→ : encore une, en C1.\n↑ : je monte d'une case, en C2.\n⛔ Le piège : faire la flèche ↑ en premier. L'ordre compte : je lis de gauche à droite.\nRéponse : C2.",
          micros: ["ce1_algo_instruction"],
          reponses: [{ attendu: ["C2", "la case C2"] }],
        },
        {
          enonce: "Le robot est sur la case 0.\nIl avance de 2 cases, puis de 3 cases.\nSur quelle case est-il ?",
          figure: bande(8),
          correction:
            "Il avance de 2 cases : de 0, il va en 2.\nPuis il avance de 3 cases : de 2, il va en 5.\nJe vérifie : 2 + 3 = 5.\n⛔ Le piège : répondre 2, le nombre d'instructions. Je compte les cases, pas les ordres.\nRéponse : 5.",
          micros: ["ce1_algo_instruction"],
          reponses: [{ attendu: ["5", "cinq", "la case 5"] }],
        },
        {
          enonce: "Quel code mène le robot R jusqu'à l'étoile ?\nA) → → ↑ ↑   B) → ↑ ↑   C) ↑ ↑ ↑ → →",
          figure: quadrillage(5, 4, { depart: "A1", objets: [{ c: "C3", t: ETOILE }] }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", objets: [{ c: "C3", t: ETOILE }], chemin: ["A1", "B1", "C1", "C2", "C3"] })),
          correction:
            "J'essaie chaque code avec mon doigt, depuis A1.\nA) → B1, → C1, ↑ C2, ↑ C3. J'arrive sur l'étoile.\nB) → B1, ↑ B2, ↑ B3. Je suis à côté de l'étoile.\nC) ↑ A2, ↑ A3, ↑ A4, → B4, → C4. Je suis au-dessus.\n⛔ Le piège : choisir B. Il faut 2 flèches → pour aller de A à C.\nRéponse : A.",
          micros: ["ce1_algo_deplacement"],
          reponses: [{ attendu: ["A", "A) → → ↑ ↑"] }],
        },
        {
          enonce: "Le robot est sur la case 0.\nSon programme : répéter 3 fois « avancer de 2 cases ».\nSur quelle case s'arrête-t-il ?",
          figure: bande(8),
          correction:
            "« Répéter 3 fois », c'est faire l'instruction 3 fois de suite.\n1re fois : de 0 à 2. 2e fois : de 2 à 4. 3e fois : de 4 à 6.\nJe vérifie : 2 + 2 + 2 = 6.\n⛔ Le piège : avancer une seule fois de 2, ou de 3. L'instruction est faite 3 fois.\nRéponse : 6.",
          micros: ["ce1_algo_repetition"],
          reponses: [{ attendu: ["6", "six", "la case 6"] }],
        },
        {
          enonce: "Lis le programme du robot.\na) De combien de cases avance-t-il en tout ?\nb) Combien d'instructions y a-t-il ?",
          figure: programme(["avancer de 2 cases", "tourner d'un quart de tour à droite", "avancer de 1 case", "tourner d'un quart de tour à gauche", "avancer de 1 case"]),
          correction:
            "a) Je garde seulement les « avancer » : 2, puis 1, puis 1.\n2 + 1 + 1 = 4 cases. Tourner ne fait pas avancer.\nb) Je compte les cartes : 1, 2, 3, 4, 5. Il y a 5 instructions.\n⛔ Le piège : a) répondre 5. Les deux quarts de tour changent la direction, pas la case.\nRéponse : a) 4 ; b) 5.",
          micros: ["ce1_algo_instruction"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["5", "cinq"] },
          ],
        },
        {
          enonce: "Le robot regarde vers le haut.\na) Il tourne d'un quart de tour à droite. Où regarde-t-il ?\nb) Il tourne encore d'un quart de tour à droite. Où regarde-t-il ?\nÉcris : haut, bas, gauche ou droite.",
          figure: orientation(),
          correction:
            "Je tourne sur place, comme le robot, dans le sens des aiguilles d'une montre.\na) Du haut, un quart de tour à droite : je regarde à droite.\nb) De la droite, encore un quart de tour à droite : je regarde en bas.\n⛔ Le piège : b) répondre « gauche ». À droite, puis encore à droite : je me retrouve dos au haut.\nRéponse : a) droite ; b) bas.",
          micros: ["ce1_algo_instruction"],
          reponses: [
            { question: "a)", attendu: ["droite", "à droite", "vers la droite"] },
            { question: "b)", attendu: ["bas", "en bas", "vers le bas"] },
          ],
        },
        {
          enonce: "Le robot R suit ce code : ← ← ↓\nSur quelle case arrive-t-il ?",
          figure: quadrillage(5, 4, { depart: "D3" }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "D3", chemin: ["D3", "C3", "B3", "B2"] })),
          correction:
            "Je pars de D3.\n← : une case à gauche, en C3.\n← : encore une, en B3.\n↓ : je descends d'une case, en B2.\n⛔ Le piège : aller vers la droite pour ←. La pointe de la flèche montre où aller.\nRéponse : B2.",
          micros: ["ce1_algo_instruction"],
          reponses: [{ attendu: ["B2", "la case B2"] }],
        },
        {
          enonce: "Je veux aller de R à l'étoile, avec des → et des ↑.\na) Combien de flèches → ?\nb) Combien de flèches ↑ ?",
          figure: quadrillage(5, 4, { depart: "A1", objets: [{ c: "D3", t: ETOILE }] }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", objets: [{ c: "D3", t: ETOILE }], chemin: ["A1", "B1", "C1", "D1", "D2", "D3"] })),
          correction:
            "L'étoile est en D3. Le robot est en A1.\na) De A à D, je passe par B, C, D : 3 colonnes. 3 flèches →.\nb) De 1 à 3, je passe par 2, 3 : 2 lignes. 2 flèches ↑.\nUn code possible : → → → ↑ ↑.\n⛔ Le piège : inverser, 2 → et 3 ↑. Les lettres comptent les →, les nombres comptent les ↑.\nRéponse : a) 3 ; b) 2.",
          micros: ["ce1_algo_deplacement"],
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
      consigne: "Plusieurs instructions. Je suis le chemin avec mon doigt, case par case.",
      rappel: [
        "Le robot ne passe jamais sur un rocher gris.",
        "« Répéter 4 fois » : je fais tout le bloc, 4 fois de suite.",
        "Pour revenir, je fais le chemin à l'envers : les flèches inversées, dans l'ordre inverse.",
      ],
      exercices: [
        {
          enonce: "Les cases grises sont des rochers.\nQuel code mène R à l'étoile sans toucher un rocher ?\nA) → →   B) ↑ ↑ → → ↓ ↓   C) ↑ → → ↓",
          figure: quadrillage(5, 4, { depart: "A1", rochers: ["B1", "B2"], objets: [{ c: "C1", t: ETOILE }] }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", rochers: ["B1", "B2"], objets: [{ c: "C1", t: ETOILE }], chemin: ["A1", "A2", "A3", "B3", "C3", "C2", "C1"] })),
          correction:
            "J'essaie chaque code, et je regarde chaque case.\nA) → : B1, c'est un rocher. Raté.\nC) ↑ A2, puis → B2 : un rocher. Raté.\nB) ↑ A2, ↑ A3, → B3, → C3, ↓ C2, ↓ C1. Aucun rocher, j'arrive sur l'étoile.\n⛔ Le piège : choisir A, le plus court. Le plus court traverse un rocher.\nRéponse : B.",
          micros: ["ce1_algo_deplacement"],
          reponses: [{ attendu: ["B", "B) ↑ ↑ → → ↓ ↓"] }],
        },
        {
          enonce: "Le robot R suit ce programme :\nrépéter 4 fois « → ↑ »\nSur quelle case arrive-t-il ?",
          figure: quadrillage(5, 5, { depart: "A1" }),
          schema: ecranSeulement(quadrillage(5, 5, { depart: "A1", chemin: ["A1", "B1", "B2", "C2", "C3", "D3", "D4", "E4", "E5"] })),
          correction:
            "Un bloc « → ↑ » fait une case à droite, puis une case en haut. C'est une marche d'escalier.\n1re fois : B2. 2e fois : C3. 3e fois : D4. 4e fois : E5.\n⛔ Le piège : faire le bloc une seule fois, et répondre B2. Il est répété 4 fois.\nRéponse : E5.",
          micros: ["ce1_algo_repetition"],
          reponses: [{ attendu: ["E5", "la case E5"] }],
        },
        {
          enonce: "Lou a écrit ce code : → → → → ↑ ↑ ↑\nElle veut l'écrire plus court.\na) répéter … fois → . Combien de fois ?\nb) répéter … fois ↑ . Combien de fois ?",
          correction:
            "Je compte les flèches pareilles, en les touchant.\na) → : 1, 2, 3, 4. J'écris « répéter 4 fois → ».\nb) ↑ : 1, 2, 3. J'écris « répéter 3 fois ↑ ».\nLe chemin ne change pas. Le code est plus court à lire.\n⛔ Le piège : sauter une flèche quand elles sont serrées. Je les compte une par une.\nRéponse : a) 4 ; b) 3.",
          micros: ["ce1_algo_repetition"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "Pour aller de R à l'étoile, Sacha a fait : → → ↑\nQuel code le ramène en R ?\nA) ↓ ← ←   B) → → ↑   C) ↑ ← ←",
          figure: quadrillage(5, 3, { depart: "A1", objets: [{ c: "C2", t: ETOILE }] }),
          correction:
            "Pour revenir, je fais le chemin à l'envers.\nLa dernière flèche de l'aller était ↑ : je commence par son contraire, ↓.\nPuis les deux → deviennent ← ←.\nJe vérifie depuis C2 : ↓ C1, ← B1, ← A1. Je suis revenu.\n⛔ Le piège : B, refaire l'aller. Le robot s'éloignerait encore plus.\nRéponse : A.",
          micros: ["ce1_algo_deplacement"],
          reponses: [{ attendu: ["A", "A) ↓ ← ←"] }],
        },
        {
          enonce: "Le robot est en A1. Il regarde vers la droite.\nIl avance de 3 cases, tourne d'un quart de tour à gauche, avance de 2 cases.\nSur quelle case arrive-t-il ?",
          figure: quadrillage(5, 4, { depart: "A1" }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", chemin: ["A1", "B1", "C1", "D1", "D2", "D3"] })),
          correction:
            "Il regarde à droite. Il avance de 3 cases : B1, C1, D1.\nIl tourne d'un quart de tour à gauche. Il regardait à droite : maintenant, il regarde en haut.\nIl avance de 2 cases vers le haut : D2, D3.\n⛔ Le piège : tourner vers le bas. Quand je regarde à droite, ma gauche est vers le haut.\nRéponse : D3.",
          micros: ["ce1_algo_instruction"],
          reponses: [{ attendu: ["D3", "la case D3"] }],
        },
        {
          enonce: "Le trésor est en D2. Léo écrit : → → ↑ ↑\na) Sur quelle case arrive-t-il ?\nb) Pour le trésor, combien de flèches → fallait-il ?",
          figure: quadrillage(5, 4, { depart: "A1", objets: [{ c: "D2", t: ETOILE }] }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", objets: [{ c: "D2", t: ETOILE }], chemin: ["A1", "B1", "C1", "C2", "C3"] })),
          correction:
            "a) Je suis le code de Léo : → B1, → C1, ↑ C2, ↑ C3. Il arrive en C3.\nb) De A à D : B, C, D. Il fallait 3 flèches →, et une seule ↑.\nLe bon code : → → → ↑.\n⛔ Le piège : a) répondre D2, la case du trésor. Je suis le code écrit, même s'il est faux.\nRéponse : a) C3 ; b) 3.",
          micros: ["ce1_algo_deplacement"],
          reponses: [
            { question: "a)", attendu: ["C3", "la case C3"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
        {
          enonce: "Le robot suit ce programme :\nrépéter 4 fois « avancer de 2 cases, tourner d'un quart de tour à droite »\na) De combien de cases avance-t-il en tout ?\nb) Combien de quarts de tour fait-il ?\nc) Revient-il sur sa case de départ ?",
          correction:
            "Chaque bloc fait un côté de carré, puis un virage.\na) 4 fois 2 cases : 2 + 2 + 2 + 2 = 8 cases.\nb) Un quart de tour par bloc : 4 quarts de tour.\nc) Il trace les 4 côtés d'un carré : il revient à son départ. Oui.\n⛔ Le piège : b) répondre 3, parce qu'un carré a l'air fini après 3 virages. Le bloc est fait 4 fois.\nRéponse : a) 8 ; b) 4 ; c) oui.",
          micros: ["ce1_algo_repetition"],
          reponses: [
            { question: "a)", attendu: ["8", "huit"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: OUI },
          ],
        },
        {
          enonce: "Le robot est sur la case 0.\nIl répète 4 fois « avancer de 3 cases ». Puis il recule de 2 cases.\na) Sur quelle case est-il après la répétition ?\nb) Sur quelle case finit-il ?",
          figure: bande(14),
          correction:
            "a) 4 fois 3 cases : 3, 6, 9, 12. Il est sur la case 12.\nb) Il recule de 2 cases : 12 − 2 = 10. Il finit sur la case 10.\n⛔ Le piège : b) avancer de 2 au lieu de reculer, et répondre 14. Reculer, c'est revenir en arrière.\nRéponse : a) 12 ; b) 10.",
          micros: ["ce1_algo_repetition"],
          reponses: [
            { question: "a)", attendu: ["12", "douze", "la case 12"] },
            { question: "b)", attendu: ["10", "dix", "la case 10"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Je lis tout le problème. Je teste mon code avec le doigt avant de répondre.",
      rappel: [
        "Je compte les colonnes pour les → et les lignes pour les ↑.",
        "Aller-retour : je compte l'aller, puis le retour.",
        "Pour le chemin le plus court, je cherche le moins de flèches possible.",
      ],
      exercices: [
        {
          titre: "Le drone du livreur",
          enonce: "Un livreur programme un drone. Il part de la boulangerie R. Il livre la maison M.\na) Combien de flèches → et ↑ faut-il en tout pour l'aller ?\nb) Il revient à la boulangerie. Combien de cases pour l'aller-retour ?",
          figure: quadrillage(5, 5, { depart: "A1", objets: [{ c: "D4", t: "M" }] }),
          schema: ecranSeulement(quadrillage(5, 5, { depart: "A1", objets: [{ c: "D4", t: "M" }], chemin: ["A1", "B1", "C1", "D1", "D2", "D3", "D4"] })),
          correction:
            "a) De A à D : 3 flèches →. De 1 à 4 : 3 flèches ↑.\n3 + 3 = 6 flèches. Par exemple : → → → ↑ ↑ ↑.\nb) L'aller fait 6 cases. Le retour, aussi : ↓ ↓ ↓ ← ← ←.\n6 + 6 = 12 cases.\n⛔ Le piège : b) oublier le retour, et répondre 6. Aller-retour, c'est deux trajets.\nRéponse : a) 6 ; b) 12.",
          micros: ["ce1_algo_deplacement", "ce1_algo_defi"],
          reponses: [
            { question: "a)", attendu: ["6", "six"] },
            { question: "b)", attendu: ["12", "douze"] },
          ],
        },
        {
          titre: "Le robot de la magasinière",
          enonce: "Une magasinière programme un robot. Il ramasse les colis 1 et 2.\nSon code : → → ↑ ↑\na) Quel colis ramasse-t-il en premier ?\nb) Combien de cases parcourt-il en tout ?\nc) Combien de flèches, au moins, pour revenir en R ?",
          figure: quadrillage(4, 4, { depart: "A1", objets: [{ c: "C1", t: "1" }, { c: "C3", t: "2" }] }),
          schema: ecranSeulement(quadrillage(4, 4, { depart: "A1", objets: [{ c: "C1", t: "1" }, { c: "C3", t: "2" }], chemin: ["A1", "B1", "C1", "C2", "C3"] })),
          correction:
            "a) → B1, → C1 : le robot arrive sur le colis 1 en premier.\nb) Puis ↑ C2, ↑ C3 : le colis 2. En tout : 2 + 2 = 4 cases.\nc) De C3 à A1 : 2 flèches ↓ et 2 flèches ←. 2 + 2 = 4 flèches.\n⛔ Le piège : a) répondre 2, le plus grand numéro. Le robot touche d'abord le colis 1.\nRéponse : a) 1 ; b) 4 ; c) 4.",
          micros: ["ce1_algo_instruction", "ce1_algo_defi"],
          reponses: [
            { question: "a)", attendu: ["1", "le colis 1", "un"] },
            { question: "b)", attendu: ["4", "quatre"] },
            { question: "c)", attendu: ["4", "quatre"] },
          ],
        },
        {
          titre: "Le programme de l'informaticienne",
          enonce: "Une informaticienne veut faire avancer un robot de 12 cases. Elle écrit : répéter … fois « avancer de 3 cases ».\na) Combien de fois faut-il répéter ?\nb) Et avec « avancer de 2 cases » ?\nc) Et avec « avancer de 4 cases » ?",
          figure: bande(12),
          correction:
            "Je compte par bonds jusqu'à 12.\na) De 3 en 3 : 3, 6, 9, 12. J'ai fait 4 bonds : répéter 4 fois.\nb) De 2 en 2 : 2, 4, 6, 8, 10, 12. 6 bonds : répéter 6 fois.\nc) De 4 en 4 : 4, 8, 12. 3 bonds : répéter 3 fois.\n⛔ Le piège : a) répondre 3, le nombre de cases d'un bond. Je compte les bonds, pas leur taille.\nRéponse : a) 4 ; b) 6 ; c) 3.",
          micros: ["ce1_algo_repetition", "ce1_algo_defi"],
          reponses: [
            { question: "a)", attendu: ["4", "quatre"] },
            { question: "b)", attendu: ["6", "six"] },
            { question: "c)", attendu: ["3", "trois"] },
          ],
        },
        {
          titre: "La tondeuse de la jardinière",
          enonce: "Une jardinière programme une tondeuse robot. Les cases grises sont des fleurs, interdites.\na) Combien de cases, au moins, pour aller de R à l'étoile ?\nb) Dans ce chemin, combien de flèches ↑ ?",
          figure: quadrillage(5, 4, { depart: "A1", rochers: ["C1", "C2", "C3"], objets: [{ c: "E1", t: ETOILE }] }),
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", rochers: ["C1", "C2", "C3"], objets: [{ c: "E1", t: ETOILE }], chemin: ["A1", "A2", "A3", "A4", "B4", "C4", "D4", "E4", "E3", "E2", "E1"] })),
          correction:
            "Les fleurs bouchent la colonne C, sauf en haut : C4 est libre.\nJe dois passer par C4. Je monte : ↑ ↑ ↑, jusqu'en A4.\nJe vais à droite : → → → →, jusqu'en E4. Je descends : ↓ ↓ ↓, jusqu'en E1.\na) 3 + 4 + 3 = 10 cases.\nb) 3 flèches ↑.\n⛔ Le piège : a) répondre 4, en filant tout droit. La tondeuse passerait sur les fleurs.\nRéponse : a) 10 ; b) 3.",
          micros: ["ce1_algo_deplacement", "ce1_algo_defi"],
          reponses: [
            { question: "a)", attendu: ["10", "dix"] },
            { question: "b)", attendu: ["3", "trois"] },
          ],
        },
      ],
    },
  ],
};

