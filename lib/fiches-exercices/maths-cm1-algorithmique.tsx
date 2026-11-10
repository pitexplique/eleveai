// ─── Fiche d'exercices : programmer un déplacement (CM1) — 20 exercices corrigés ─
//
// 10/11/2026 : la première feuille d'algorithmique du CM1, pour la notion
// `algorithmique` du coach CM1 (6 micros). Sur la forme de
// `maths-cm1-fraction.tsx` : 8 ★, 8 ★★, 4 ★★★, un rappel avant chaque niveau,
// corrigés à la première personne, étape par étape, avec le piège nommé.
// Alignée sur la banque `lib/tutor-v4/questionBank/cm1/maths/algorithmique.bank.ts`
// et sur la carte mentale `cm1/algorithmique` (`lib/cartes/remplies/cm1.json`) :
// suivre des instructions dans l'ordre, compléter une suite logique, coder un
// déplacement sur quadrillage (→ ← ↑ ↓), lire un programme en blocs Scratch,
// une répétition simple, défis.
// ⛔ LIMITES DU CM1 : flèches d'une case, blocs « avancer », « tourner de 90° »,
// « répéter … fois », « stylo en position d'écriture ». Aucune variable, aucun
// « si », aucune boucle dans une boucle. Calculs : additions, soustractions,
// tables de multiplication.
// ⛔ Aucune question à rédiger : la case d'arrivée (« E3 »), un nombre de pas,
// un mot (« est »), oui ou non, ou le QCM du bon programme.
//
// LE QUADRILLAGE : les colonnes sont des lettres (A, B, C… de gauche à
// droite), les lignes des nombres (1 en bas). → fait passer à la lettre
// suivante, ↑ au nombre suivant. Le robot part de la case verte « R ».
//
// Les pièges nommés : faire les instructions dans le désordre (1, 13),
// ajouter toujours le même nombre (2, 12), compter une seule flèche pour
// plusieurs cases (3, 8), inverser le nombre de → et de ↑ (4), tourner du
// mauvais côté (5), croire que « tourner » fait avancer (6, 14), lire la
// boucle une seule fois (7, 11, 15, 20), oublier le dernier ↓ (8), passer sur
// un rocher (10), refaire l'aller au lieu de l'inverser (16), oublier la case
// de départ (17), repartir du mauvais point (19), remonter un programme à
// l'endroit (13, 18).
//
// ⭐ LES MATHS SONT TRANSVERSALES : jeux (1, 2, 8), jardin (3, 9, 17),
// exploration spatiale (5), dessin (6, 14, 15), course (7), bijoux (2),
// géométrie (12), fête de la science (13), livraison par drone (16),
// informatique (18), entrepôt (19), architecture (20).
// Les métiers des problèmes : jardinière (17), informaticienne (18),
// magasinier (19), architecte (20). Aucun décor réunionnais sur cette feuille.
//
// ⭐ FAITS RÉELS : aucun. Robots, drones et machines à nombres sont des MODÈLES.
//
// ⭐ LES DESSINS : `quadrillage` (SVG local, cases lettre + nombre, rochers
// gris, objets, trajet du corrigé en orange), `scratch` (repris de
// `maths-6e-algo-programmation.tsx`), `rose` (les quatre directions).
// Les trajets du corrigé sont `ecranSeulement`.
//
// Micro-compétences : algo_instruction (1, 5, 13, 18), algo_logique (2, 12),
// algo_deplacement (3, 4, 8, 9, 10, 16, 19), algo_programme (6, 10, 14, 15,
// 20), algo_repetition (7, 11, 15, 17, 18, 20), algo_defi (16, 17, 18, 19,
// 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/* ── Le quadrillage ──────────────────────────────────────────────────────── */

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

/**
 * Un QUADRILLAGE de `cols` colonnes (A, B, C…) et `rows` lignes (1 en bas).
 * Une case se nomme lettre + nombre : « C4 ». SVG local, texte NU, sans
 * largeur minimale (7 colonnes tiennent dans 282 de viewBox).
 */
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
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[13rem]">
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
          <polyline
            points={o.chemin.map((c) => centre(c).join(",")).join(" ")}
            fill="none"
            stroke={ORANGE}
            strokeWidth={4}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.85}
          />
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

/** La ROSE DES VENTS : nord en haut, est à droite, sud en bas, ouest à gauche. */
const rose = () => (
  <div className="mx-auto w-full max-w-[9rem] print:max-w-[7rem]">
    <svg viewBox="0 0 140 140" className="block h-auto w-full" role="img" aria-label="Rose des vents">
      <line x1="70" y1="28" x2="70" y2="112" stroke={NOIR} strokeWidth="2" />
      <line x1="28" y1="70" x2="112" y2="70" stroke={NOIR} strokeWidth="2" />
      <polygon points="70,22 64,36 76,36" fill={ROUGE} />
      <text x="70" y="16" textAnchor="middle" fontSize="15" fontWeight="900" fill={NOIR}>nord</text>
      <text x="70" y="132" textAnchor="middle" fontSize="15" fontWeight="900" fill={NOIR}>sud</text>
      <text x="116" y="75" textAnchor="start" fontSize="15" fontWeight="900" fill={NOIR}>est</text>
      <text x="24" y="75" textAnchor="end" fontSize="15" fontWeight="900" fill={NOIR}>ouest</text>
    </svg>
  </div>
);

/* ── Les blocs Scratch, dessinés (repris de maths-6e-algo-programmation.tsx) ── */

type Bloc = { t: string; i: number; corps?: Bloc[] };

/** Les lignes indentées (2 espaces par niveau) → un arbre de blocs. */
const lireBlocs = (lignes: string[]): Bloc[] => {
  const L = lignes.map((t, i) => ({ niv: (t.match(/^ */)?.[0].length ?? 0) / 2, t: t.trim(), i }));
  let k = 0;
  const niveau = (niv: number): Bloc[] => {
    const out: Bloc[] = [];
    while (k < L.length && L[k].niv === niv) {
      const b: Bloc = { t: L[k].t, i: L[k].i };
      k++;
      if (/^répéter/.test(b.t)) b.corps = niveau(niv + 1);
      out.push(b);
    }
    return out;
  };
  return niveau(0);
};

/** Les couleurs de Scratch 3 : [fond, encre]. Encre foncée sur le jaune et l'or (lisible sur papier). */
const TEINTES: Record<string, [string, string]> = {
  evenement: ["#FFBF00", "#1e293b"],
  mouvement: ["#4C97FF", "#ffffff"],
  apparence: ["#9966FF", "#ffffff"],
  controle: ["#FFAB19", "#1e293b"],
  stylo: ["#0FBD8C", "#ffffff"],
};
const famille = (t: string) =>
  /^quand /.test(t) ? "evenement" : /^(avancer|tourner)/.test(t) ? "mouvement" : /^dire /.test(t) ? "apparence" : /^stylo/.test(t) ? "stylo" : "controle";

const largeurBloc = (t: string) => Math.max(56, 20 + t.length * 8);

/**
 * Un PROGRAMME SCRATCH dessiné : une ligne par bloc, deux espaces d'indentation
 * pour le contenu d'un « répéter ». La boucle embrasse son contenu, comme dans
 * Scratch.
 */
const scratch = (lignes: string[]) => {
  const H = 28;
  const BRAS = 16;
  const JEU = 3;
  const PIED = 14;
  const dessins: ReactNode[] = [];
  let droite = 0;
  const barre = (t: string, x: number, y: number, w: number, h: number, fond: string, encre: string) => {
    droite = Math.max(droite, x + w);
    dessins.push(
      <g key={dessins.length}>
        <rect x={x} y={y} width={w} height={h} rx={6} fill={fond} />
        {t ? (
          <text x={x + 10} y={y + 19} fontSize="14" fontWeight="700" fill={encre}>
            {t}
          </text>
        ) : null}
      </g>,
    );
  };
  const bras = (x: number, y1: number, y2: number, fond: string) => dessins.push(<rect key={dessins.length} x={x} y={y1} width={BRAS} height={y2 - y1} fill={fond} />);
  const pose = (liste: Bloc[], x: number, y0: number): number => {
    let y = y0;
    for (const b of liste) {
      const [fond, encre] = TEINTES[famille(b.t)];
      const w = largeurBloc(b.t);
      if (famille(b.t) === "evenement") {
        dessins.push(<ellipse key={dessins.length} cx={x + 34} cy={y + 10} rx={34} ry={10} fill={fond} />);
        barre(b.t, x, y + 8, w, H, fond, encre);
        y += 8 + H + JEU;
      } else if (b.corps) {
        const wc = Math.max(w, 96);
        barre(b.t, x, y, wc, H, fond, encre);
        const y2 = Math.max(pose(b.corps, x + BRAS, y + H + JEU), y + H + 14);
        bras(x, y + H - 1, y2 + 1, fond);
        barre("", x, y2, wc, PIED, fond, encre);
        y = y2 + PIED + JEU;
      } else {
        barre(b.t, x, y, w, H, fond, encre);
        y += H + JEU;
      }
    }
    return y;
  };
  const fin = pose(lireBlocs(lignes), 4, 4);
  const W = Math.max(300, Math.ceil(droite + 6));
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${fin + 2}`} className="block h-auto w-full" role="img" aria-label="Programme en blocs Scratch">
        {dessins}
      </svg>
    </div>
  );
};

const LEGENDE_GRILLE = "Une case se nomme par sa lettre puis son nombre : C4.";

export const exercicesAlgorithmiqueCm1: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm1",
  notion: "algorithmique",
  titre: "Programmer un déplacement",
  accroche:
    "Vingt exercices, du geste seul au problème. Suivre des instructions dans l'ordre. Trouver la suite d'une suite logique. Faire avancer un robot sur un quadrillage avec des flèches. Lire un programme en blocs Scratch. Utiliser « répéter ». Un robot jardinier, un explorateur sur Mars, un drone livreur, une tondeuse, un entrepôt et un plan d'architecte. Un rappel de cours avant chaque niveau. Cherche d'abord avec ton doigt sur le quadrillage. Puis ouvre la correction : étape par étape, avec le trajet dessiné et le piège nommé.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=cm1",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un programme court. Je fais les instructions une par une, avec mon doigt.",
      rappel: [
        "Un programme se lit dans l'ordre, une instruction après l'autre.",
        "Une flèche fait avancer d'UNE case : → droite, ← gauche, ↑ haut, ↓ bas.",
        "Une case se nomme par sa lettre, puis son nombre : C4.",
        "Dans Scratch, « tourner » change la direction, sans avancer.",
      ],
      exercices: [
        {
          enonce:
            "Mila joue à la machine à calculer. Le programme dit : « Pars de 5. Ajoute 3. Puis multiplie par 2. »\na) Quel nombre obtient-elle après la première instruction ?\nb) Quel nombre obtient-elle à la fin ?\nc) Léo fait les instructions dans l'autre ordre : d'abord × 2, puis + 3. Trouve-t-il le même nombre ? Réponds par oui ou non.",
          correction:
            "Je fais les instructions dans l'ordre, une par une.\na) Je pars de 5 et j'ajoute 3 : 5 + 3 = 8.\nb) Je multiplie ce résultat par 2 : 8 × 2 = 16.\nc) Léo : 5 × 2 = 10, puis 10 + 3 = 13. Il trouve 13, pas 16 : non.\n⛔ Le piège : croire que l'ordre ne compte pas. Dans un programme, changer l'ordre change le résultat.\nRéponse : a) 8 ; b) 16 ; c) non, il trouve 13.",
          reponses: [
            { question: "a)", attendu: "8" },
            { question: "b)", attendu: "16" },
            { question: "c)", attendu: ["non", "faux", "non, il trouve 13"] },
          ],
          micros: ["algo_instruction"],
        },
        {
          enonce:
            "Trouve le nombre suivant de chaque suite.\na) 3, 6, 9, 12, …\nb) 40, 35, 30, 25, …\nc) 1, 2, 4, 8, …\nd) Ava enfile des perles : rond, carré, carré, rond, carré, carré… La 7e perle est-elle un rond ou un carré ?",
          correction:
            "Je cherche ce qui change d'un nombre au suivant, puis je continue.\na) On ajoute 3 à chaque fois : 12 + 3 = 15.\nb) On enlève 5 à chaque fois : 25 − 5 = 20.\nc) On double à chaque fois : 1, 2, 4, 8. Puis 8 × 2 = 16.\nd) Le motif « rond, carré, carré » a 3 perles. Il recommence aux perles 4 et 7.\nPerles : 1 rond, 2 carré, 3 carré, 4 rond, 5 carré, 6 carré, 7 rond.\n⛔ Le piège du c) : répondre 10, en ajoutant 2. Les écarts grandissent : 1, puis 2, puis 4. On double.\nRéponse : a) 15 ; b) 20 ; c) 16 ; d) un rond.",
          reponses: [
            { question: "a)", attendu: "15" },
            { question: "b)", attendu: "20" },
            { question: "c)", attendu: "16" },
            { question: "d)", attendu: ["rond", "un rond"] },
          ],
          micros: ["algo_logique"],
        },
        {
          enonce:
            `Le robot jardinier part de la case verte R. Il suit le programme : → → → ↑\n${LEGENDE_GRILLE}\na) Sur quelle case arrive-t-il ?\nb) Combien de cases a-t-il parcourues ?`,
          figure: quadrillage(6, 5, { depart: "B2" }),
          correction:
            "Le robot part de la case B2.\nJe pose mon doigt sur B2. Chaque flèche fait avancer d'une case.\n→ : C2. → : D2. → : E2. ↑ : E3.\na) Il arrive sur la case E3.\nb) Il y a 4 flèches : il a parcouru 4 cases.\n⛔ Le piège : lire « → → → » comme une seule case. Trois flèches, ce sont trois cases.\nRéponse : a) E3 ; b) 4 cases.",
          reponses: [
            { question: "a)", attendu: ["E3", "case E3", "la case E3"] },
            { question: "b)", attendu: ["4", "4 cases"] },
          ],
          schema: ecranSeulement(quadrillage(6, 5, { depart: "B2", chemin: ["B2", "C2", "D2", "E2", "E3"] })),
          micros: ["algo_deplacement"],
        },
        {
          enonce:
            "Le robot part de la case verte R. Il doit aller sur l'étoile.\nQuel programme le mène sur l'étoile ?\nA) → → ↑ ↑ ↑\nB) ↑ ↑ → → → →\nC) → → → ↑ ↑",
          figure: quadrillage(5, 4, { depart: "A1", objets: [{ c: "D3", t: "★" }] }),
          correction:
            "Le robot est en A1. L'étoile est en D3.\nDe A à D, il faut 3 cases vers la droite : → → →.\nDe 1 à 3, il faut 2 cases vers le haut : ↑ ↑.\nJe teste chaque programme.\nA) → → : C1, puis ↑ ↑ ↑ : C4. Raté.\nB) ↑ ↑ : A3, puis → → → → : E3. Raté.\nC) → → → : D1, puis ↑ ↑ : D3. C'est l'étoile !\n⛔ Le piège : inverser le nombre de → et de ↑. Je compte d'abord les colonnes, puis les lignes.\nRéponse : C.",
          reponses: [{ attendu: ["C", "c) → → → ↑ ↑", "→ → → ↑ ↑", "programme C"] }],
          schema: ecranSeulement(quadrillage(5, 4, { depart: "A1", objets: [{ c: "D3", t: "★" }], chemin: ["A1", "B1", "C1", "D1", "D2", "D3"] })),
          micros: ["algo_deplacement"],
        },
        {
          enonce:
            "Un robot explore la planète Mars. Il regarde vers le nord.\na) Il fait un quart de tour à droite. Vers où regarde-t-il ?\nb) Il fait encore un quart de tour à droite. Vers où regarde-t-il ?\nc) Puis il fait un demi-tour. Vers où regarde-t-il ?",
          figure: rose(),
          correction:
            "Tourner à droite, c'est tourner comme les aiguilles d'une montre : nord, est, sud, ouest.\na) Du nord, un quart de tour à droite : il regarde vers l'est.\nb) De l'est, encore un quart de tour à droite : il regarde vers le sud.\nc) Un demi-tour, ce sont deux quarts de tour. Il regarde à l'opposé du sud : le nord.\n⛔ Le piège : tourner du mauvais côté et répondre « ouest » au a). Sur la rose, l'est est à DROITE du nord.\nRéponse : a) l'est ; b) le sud ; c) le nord.",
          reponses: [
            { question: "a)", attendu: ["est", "l'est", "vers l'est"] },
            { question: "b)", attendu: ["sud", "le sud", "vers le sud"] },
            { question: "c)", attendu: ["nord", "le nord", "vers le nord"] },
          ],
          micros: ["algo_instruction"],
        },
        {
          enonce:
            "Lis ce programme Scratch.\na) Combien de blocs y a-t-il sous le drapeau ?\nb) De combien de pas le lutin avance-t-il en tout ?\nc) Le bloc « tourner » fait-il avancer le lutin ? Réponds par oui ou non.",
          figure: scratch(["quand drapeau vert cliqué", "avancer de 25 pas", "tourner à droite de 90°", "avancer de 25 pas"]),
          correction:
            "Je lis les blocs de haut en bas.\na) Sous le drapeau, je compte 3 blocs : avancer, tourner, avancer.\nb) J'additionne seulement les blocs « avancer » : 25 + 25 = 50 pas.\nc) « tourner » change seulement la direction du lutin. Il ne bouge pas de place : non.\n⛔ Le piège : croire que « tourner de 90° » fait avancer de 90 pas. 90°, c'est un angle, pas des pas.\nRéponse : a) 3 blocs ; b) 50 pas ; c) non.",
          reponses: [
            { question: "a)", attendu: ["3", "3 blocs"] },
            { question: "b)", attendu: ["50", "50 pas"] },
            { question: "c)", attendu: ["non", "faux"] },
          ],
          micros: ["algo_programme"],
        },
        {
          enonce:
            "Sur une piste de course, le lutin suit ce programme.\na) Combien de fois le bloc « avancer de 20 pas » est-il exécuté ?\nb) De combien de pas le lutin avance-t-il en tout ?\nc) Pour avancer de 100 pas avec ce même bloc, combien de répétitions faut-il ?",
          figure: scratch(["quand drapeau vert cliqué", "répéter 3 fois", "  avancer de 20 pas"]),
          correction:
            "Le bloc « avancer » est DANS la boucle « répéter 3 fois ».\na) Il est donc exécuté 3 fois.\nb) À chaque fois, le lutin avance de 20 pas : 3 × 20 = 60 pas.\nc) Je cherche combien de fois 20 dans 100 : 20, 40, 60, 80, 100. Cela fait 5 fois. C'est aussi 5 × 20 = 100.\n⛔ Le piège : lire le bloc une seule fois, et répondre 20 au b). La boucle le refait 3 fois.\nRéponse : a) 3 fois ; b) 60 pas ; c) 5 répétitions.",
          reponses: [
            { question: "a)", attendu: ["3", "3 fois"] },
            { question: "b)", attendu: ["60", "60 pas"] },
            { question: "c)", attendu: ["5", "5 fois", "5 répétitions"] },
          ],
          micros: ["algo_repetition"],
        },
        {
          enonce:
            `Dans un jeu de plateau, Noé déplace son pion. Il part de la case verte R et suit : ↑ ↑ ← ← ← ↓\n${LEGENDE_GRILLE}\na) Combien de flèches a le programme ?\nb) Sur quelle case arrive le pion ?`,
          figure: quadrillage(6, 5, { depart: "E2" }),
          correction:
            "Le pion part de la case E2.\na) Je compte les flèches : ↑ ↑ ← ← ← ↓. Il y en a 6.\nb) Je suis le programme avec mon doigt.\n↑ : E3. ↑ : E4.\n← : D4. ← : C4. ← : B4.\n↓ : B3.\nLe pion arrive sur la case B3.\n⛔ Le piège : oublier la dernière flèche ↓ et répondre B4. Je coche chaque flèche quand je l'ai jouée.\nRéponse : a) 6 flèches ; b) B3.",
          reponses: [
            { question: "a)", attendu: ["6", "6 flèches"] },
            { question: "b)", attendu: ["B3", "case B3", "la case B3"] },
          ],
          schema: ecranSeulement(quadrillage(6, 5, { depart: "E2", chemin: ["E2", "E3", "E4", "D4", "C4", "B4", "B3"] })),
          micros: ["algo_deplacement"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Des programmes plus longs. Je joue chaque instruction avec mon doigt, et je note où j'en suis.",
      rappel: [
        "Le robot ne peut pas aller sur une case grise : c'est un rocher.",
        "« Répéter 3 fois » refait les mêmes instructions 3 fois de suite.",
        "Pour revenir au départ, je joue le chemin à l'envers : la dernière flèche d'abord, et chaque flèche retournée.",
      ],
      exercices: [
        {
          enonce:
            "Le robot de la serre part de la case verte R. Il suit : → → ↑ ↑ → → ↑\nLes cases grises sont des rochers.\na) Sur quelle case arrive-t-il ?\nb) Passe-t-il par la case C2 ? Réponds par oui ou non.\nc) Combien de cases a-t-il parcourues ?\nd) La tomate T est une case plus à droite. Quelle flèche faut-il ajouter à la fin ?",
          figure: quadrillage(6, 5, { depart: "A1", rochers: ["B2", "D2", "D4", "F2"], objets: [{ c: "F4", t: "T", fond: "#fca5a5" }] }),
          correction:
            "Le robot part de la case A1. Je note chaque case.\n→ : B1. → : C1.\n↑ : C2. ↑ : C3.\n→ : D3. → : E3.\n↑ : E4.\na) Il arrive sur la case E4.\nb) Oui : la 3e flèche l'amène en C2.\nc) 7 flèches : il a parcouru 7 cases.\nd) La tomate est en F4, juste à droite de E4. Il faut ajouter une flèche → (vers la droite).\n⛔ Le piège : sauter une flèche dans le milieu. Je note la case après CHAQUE flèche.\nRéponse : a) E4 ; b) oui ; c) 7 cases ; d) →.",
          reponses: [
            { question: "a)", attendu: ["E4", "case E4", "la case E4"] },
            { question: "b)", attendu: ["oui", "vrai"] },
            { question: "c)", attendu: ["7", "7 cases"] },
            { question: "d)", attendu: ["→", "droite", "à droite", "vers la droite", "flèche droite"] },
          ],
          schema: ecranSeulement(
            quadrillage(6, 5, {
              depart: "A1",
              rochers: ["B2", "D2", "D4", "F2"],
              objets: [{ c: "F4", t: "T", fond: "#fca5a5" }],
              chemin: ["A1", "B1", "C1", "C2", "C3", "D3", "E3", "E4"],
            }),
          ),
          micros: ["algo_deplacement"],
        },
        {
          enonce:
            "Le robot part de la case verte R. Il doit aller sur l'étoile, sans passer sur un rocher gris.\na) Quel programme marche ?\nA) ↑ ↑ → → →\nB) → → → ↑ ↑\nC) ↑ → → → ↑\nb) Combien de cases parcourt le bon programme ?\nc) Le programme B se cogne sur un rocher. Sur quelle case ?",
          figure: quadrillage(5, 4, { depart: "B1", rochers: ["C1", "D2"], objets: [{ c: "E3", t: "★", fond: "#bbf7d0" }] }),
          correction:
            "Le robot est en B1. L'étoile est en E3. Les rochers sont en C1 et D2.\na) Je teste chaque programme.\nA) ↑ ↑ : B2, B3. → → → : C3, D3, E3. Aucun rocher, et il arrive sur l'étoile. Il marche !\nB) Le premier → l'envoie en C1 : c'est un rocher.\nC) ↑ : B2. → : C2. → : D2, c'est un rocher.\nb) Le programme A a 5 flèches : 5 cases.\nc) Le programme B se cogne en C1.\n⛔ Le piège : choisir B parce qu'il a le bon nombre de flèches. B a bien 3 → et 2 ↑, mais il passe sur un rocher. Je vérifie chaque case.\nRéponse : a) A ; b) 5 cases ; c) C1.",
          reponses: [
            { question: "a)", attendu: ["A", "a) ↑ ↑ → → →", "↑ ↑ → → →", "programme A"] },
            { question: "b)", attendu: ["5", "5 cases"] },
            { question: "c)", attendu: ["C1", "case C1", "la case C1"] },
          ],
          schema: ecranSeulement(
            quadrillage(5, 4, { depart: "B1", rochers: ["C1", "D2"], objets: [{ c: "E3", t: "★", fond: "#bbf7d0" }], chemin: ["B1", "B2", "B3", "C3", "D3", "E3"] }),
          ),
          micros: ["algo_deplacement", "algo_programme"],
        },
        {
          enonce:
            "Un robot monte un escalier. Il part de la case verte R. Son programme : répéter 3 fois ( → ↑ ).\na) Écrit sans « répéter », combien de flèches a le programme ?\nb) Sur quelle case arrive le robot ?\nc) Combien de flèches → a-t-il jouées en tout ?",
          figure: quadrillage(5, 5, { depart: "A1" }),
          correction:
            "« Répéter 3 fois ( → ↑ ) », c'est : → ↑ → ↑ → ↑.\na) 3 fois 2 flèches : 3 × 2 = 6 flèches.\nb) Je joue les flèches depuis A1.\n→ : B1. ↑ : B2.\n→ : C2. ↑ : C3.\n→ : D3. ↑ : D4.\nIl arrive sur la case D4.\nc) Une flèche → à chaque tour, et 3 tours : 3 flèches →.\n⛔ Le piège : jouer → ↑ une seule fois, et répondre B2. La boucle refait les deux flèches 3 fois.\nRéponse : a) 6 flèches ; b) D4 ; c) 3.",
          reponses: [
            { question: "a)", attendu: ["6", "6 flèches"] },
            { question: "b)", attendu: ["D4", "case D4", "la case D4"] },
            { question: "c)", attendu: ["3", "3 flèches"] },
          ],
          schema: ecranSeulement(quadrillage(5, 5, { depart: "A1", chemin: ["A1", "B1", "B2", "C2", "C3", "D3", "D4"] })),
          micros: ["algo_repetition"],
        },
        {
          enonce:
            "Trouve la règle, puis réponds.\na) Quel nombre vient après : 2, 5, 8, 11, … ?\nb) Dans cette même suite, quel est le 6e nombre ?\nc) Quel nombre vient après : 64, 32, 16, … ?\nd) Avec des bâtonnets, Rayan fait une frise de triangles collés. 1 triangle : 3 bâtonnets. 2 triangles : 5 bâtonnets. 3 triangles : 7 bâtonnets. Combien de bâtonnets pour 5 triangles ?",
          correction:
            "a) On ajoute 3 à chaque fois : 11 + 3 = 14.\nb) Je continue : 2, 5, 8, 11, 14, puis 14 + 3 = 17. Le 6e nombre est 17.\nc) Chaque nombre est la moitié du précédent : la moitié de 16, c'est 8.\nd) À chaque triangle de plus, il faut 2 bâtonnets de plus : 3, 5, 7…\n4 triangles : 7 + 2 = 9. 5 triangles : 9 + 2 = 11 bâtonnets.\n⛔ Le piège du d) : faire 5 × 3 = 15. Les triangles sont collés : ils partagent un bâtonnet.\nRéponse : a) 14 ; b) 17 ; c) 8 ; d) 11 bâtonnets.",
          reponses: [
            { question: "a)", attendu: "14" },
            { question: "b)", attendu: "17" },
            { question: "c)", attendu: "8" },
            { question: "d)", attendu: ["11", "11 bâtonnets"] },
          ],
          micros: ["algo_logique"],
        },
        {
          enonce:
            "À la fête de la science, une machine transforme les nombres. Elle fait : × 4, puis − 3.\na) On entre 5. Quel nombre sort ?\nb) On entre 10. Quel nombre sort ?\nc) Il sort 9. Quel nombre est entré ?",
          correction:
            "La machine fait toujours les deux étapes, dans l'ordre : d'abord × 4, puis − 3.\na) 5 × 4 = 20, puis 20 − 3 = 17.\nb) 10 × 4 = 40, puis 40 − 3 = 37.\nc) Je remonte la machine à l'envers. La dernière étape était − 3 : je fais + 3. 9 + 3 = 12.\nL'étape d'avant était × 4 : je fais ÷ 4. 12 ÷ 4 = 3.\nJe vérifie : 3 × 4 = 12, puis 12 − 3 = 9.\n⛔ Le piège du c) : refaire la machine à l'endroit avec 9 (9 × 4 − 3 = 33). Pour trouver l'entrée, je défais les étapes, en partant de la fin.\nRéponse : a) 17 ; b) 37 ; c) 3.",
          reponses: [
            { question: "a)", attendu: "17" },
            { question: "b)", attendu: "37" },
            { question: "c)", attendu: "3" },
          ],
          micros: ["algo_instruction"],
        },
        {
          enonce:
            "Le lutin trace avec son stylo. Lis le programme.\na) Combien de traits trace-t-il ?\nb) De combien de pas avance-t-il en tout ?\nc) Combien de blocs « tourner » y a-t-il ?\nd) Pour fermer un carré, combien de blocs « avancer de 50 pas » faut-il en tout ?",
          figure: scratch([
            "quand drapeau vert cliqué",
            "stylo en position d'écriture",
            "avancer de 50 pas",
            "tourner à droite de 90°",
            "avancer de 50 pas",
            "tourner à droite de 90°",
            "avancer de 50 pas",
          ]),
          correction:
            "Le stylo est posé : chaque bloc « avancer » trace un trait.\na) Je compte les blocs « avancer » : 3 traits.\nb) 50 + 50 + 50 = 150 pas. C'est aussi 3 × 50 = 150.\nc) Je compte les blocs « tourner » : 2.\nd) Un carré a 4 côtés. Il faut 4 blocs « avancer de 50 pas ». Il en manque un, après un 3e « tourner ».\n⛔ Le piège : compter les « tourner » comme des traits, et trouver 5 au a). Tourner ne trace rien : le lutin change seulement de direction.\nRéponse : a) 3 traits ; b) 150 pas ; c) 2 ; d) 4 blocs.",
          reponses: [
            { question: "a)", attendu: ["3", "3 traits"] },
            { question: "b)", attendu: ["150", "150 pas"] },
            { question: "c)", attendu: ["2", "2 blocs"] },
            { question: "d)", attendu: ["4", "4 blocs"] },
          ],
          micros: ["algo_programme"],
        },
        {
          enonce:
            "Le stylo du lutin est posé. Lis le programme.\na) Quelle figure trace le lutin ? A) un triangle B) une ligne droite C) un carré\nb) Combien de pas mesure un côté ?\nc) De combien de pas avance-t-il en tout ?\nd) On remplace « répéter 4 fois » par « répéter 3 fois ». Combien de côtés sont tracés ?",
          figure: scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 4 fois", "  avancer de 30 pas", "  tourner à droite de 90°"]),
          correction:
            "La boucle refait 4 fois : un trait de 30 pas, puis un quart de tour.\na) 4 traits égaux, avec 4 quarts de tour : c'est un carré. Réponse C.\nb) Chaque côté mesure 30 pas, le nombre du bloc « avancer ».\nc) 4 × 30 = 120 pas.\nd) Avec « répéter 3 fois », le lutin trace seulement 3 côtés. Le carré n'est pas fermé.\n⛔ Le piège : lire la boucle une seule fois, et répondre 30 au c). Les blocs DANS la boucle sont refaits à chaque tour.\nRéponse : a) C, un carré ; b) 30 pas ; c) 120 pas ; d) 3 côtés.",
          reponses: [
            { question: "a)", attendu: ["C", "c) un carré", "un carré", "carré"] },
            { question: "b)", attendu: ["30", "30 pas"] },
            { question: "c)", attendu: ["120", "120 pas"] },
            { question: "d)", attendu: ["3", "3 côtés"] },
          ],
          micros: ["algo_repetition", "algo_programme"],
        },
        {
          enonce:
            "Un drone livre un colis. Il part de la case verte R et suit : → → → ↑ ↑\na) Sur quelle case pose-t-il le colis ?\nb) Quel programme le ramène à la case verte R ?\nA) → → → ↑ ↑\nB) ↓ ↓ ← ← ←\nC) ← ← ← ↑ ↑\nc) Combien de cases parcourt-il en tout, aller et retour ?",
          figure: quadrillage(6, 4, { depart: "B1" }),
          correction:
            "Le drone part de B1.\na) → → → : C1, D1, E1. ↑ ↑ : E2, E3. Il pose le colis en E3.\nb) Pour revenir, je retourne chaque flèche et je commence par la dernière.\nL'aller finit par ↑ ↑ : le retour commence par ↓ ↓. Puis → → → devient ← ← ←.\nLe programme B : ↓ ↓ ← ← ←. Je vérifie : E2, E1, puis D1, C1, B1.\nc) L'aller fait 5 cases, le retour aussi : 5 + 5 = 10 cases.\n⛔ Le piège : rejouer l'aller (programme A). Le drone repartirait encore plus loin.\nRéponse : a) E3 ; b) B ; c) 10 cases.",
          reponses: [
            { question: "a)", attendu: ["E3", "case E3", "la case E3"] },
            { question: "b)", attendu: ["B", "b) ↓ ↓ ← ← ←", "↓ ↓ ← ← ←", "programme B"] },
            { question: "c)", attendu: ["10", "10 cases"] },
          ],
          schema: ecranSeulement(quadrillage(6, 4, { depart: "B1", chemin: ["B1", "C1", "D1", "E1", "E2", "E3"] })),
          micros: ["algo_deplacement", "algo_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un métier, un programme plus long. Je le joue pas à pas et j'écris la case après chaque étape.",
      rappel: [
        "Je joue le programme avec mon doigt, une instruction après l'autre.",
        "Une boucle « répéter » : je compte les tours, puis ce qui se passe dans un tour.",
        "Pour trouver le départ d'un programme de calcul, je défais les étapes en partant de la fin.",
      ],
      exercices: [
        {
          titre: "La tondeuse de la jardinière",
          enonce:
            "Jade est jardinière. Sa tondeuse robot part de la case verte R. Elle tond chaque case où elle passe.\nSon programme : répéter 2 fois ( → → → → ↑ ← ← ← ← ↑ ).\na) Sur quelle case arrive la tondeuse ?\nb) Combien de cases parcourt-elle en tout ?\nc) Combien de cases sont tondues, départ compris ?\nd) La ligne 5 n'est pas tondue, sauf A5. Combien de flèches → faut-il encore ajouter ?",
          figure: quadrillage(5, 5, { depart: "A1" }),
          correction:
            "Un tour de boucle : 4 cases à droite, 1 en haut, 4 à gauche, 1 en haut.\n1er tour : A1 → E1, ↑ E2, ← A2, ↑ A3.\n2e tour : A3 → E3, ↑ E4, ← A4, ↑ A5.\na) La tondeuse arrive sur la case A5.\nb) Un tour a 10 flèches. 2 tours : 2 × 10 = 20 cases parcourues.\nc) Elle tond la case de départ, puis une case par flèche : 1 + 20 = 21 cases.\nJe vérifie : les lignes 1, 2, 3 et 4 ont 5 cases chacune, 4 × 5 = 20, plus A5 : 21.\nd) Sur la ligne 5, il reste B5, C5, D5 et E5 : 4 flèches →.\n⛔ Le piège du c) : oublier la case de départ et répondre 20. La tondeuse tond aussi la case où elle démarre.\nRéponse : a) A5 ; b) 20 cases ; c) 21 cases ; d) 4 flèches.",
          reponses: [
            { question: "a)", attendu: ["A5", "case A5", "la case A5"] },
            { question: "b)", attendu: ["20", "20 cases"] },
            { question: "c)", attendu: ["21", "21 cases"] },
            { question: "d)", attendu: ["4", "4 flèches"] },
          ],
          schema: ecranSeulement(
            quadrillage(5, 5, { depart: "A1", chemin: ["A1", "E1", "E2", "A2", "A3", "E3", "E4", "A4", "A5"] }),
          ),
          micros: ["algo_repetition", "algo_defi"],
        },
        {
          titre: "Le code de l'informaticienne",
          enonce:
            "Clara est informaticienne. Elle écrit ce programme : « Pars d'un nombre. Répète 3 fois : ajoute 4. Puis multiplie par 2. »\na) Elle part de 10. Quel nombre obtient-elle ?\nb) Elle part de 0. Quel nombre obtient-elle ?\nc) Elle obtient 30. De quel nombre est-elle partie ?\nd) Quel programme donne toujours le même résultat que le sien ? A) multiplie par 2, puis ajoute 4 B) ajoute 12, puis multiplie par 2 C) ajoute 4, puis multiplie par 6",
          correction:
            "« Répète 3 fois : ajoute 4 », c'est ajouter 4 + 4 + 4 = 12.\na) 10 + 4 + 4 + 4 = 22. Puis 22 × 2 = 44.\nb) 0 + 12 = 12. Puis 12 × 2 = 24.\nc) Je défais les étapes en partant de la fin. Elle a multiplié par 2 : je divise. 30 ÷ 2 = 15.\nElle a ajouté 12 : j'enlève 12. 15 − 12 = 3.\nJe vérifie : 3 + 12 = 15, puis 15 × 2 = 30.\nd) Ajouter 4 trois fois, c'est ajouter 12. Puis on multiplie par 2 : c'est le programme B.\nJe teste avec 10 : B donne 10 + 12 = 22, puis 22 × 2 = 44, comme au a). A donne 10 × 2 + 4 = 24 : raté.\n⛔ Le piège : ajouter 4 une seule fois. La boucle ajoute 4 TROIS fois.\nRéponse : a) 44 ; b) 24 ; c) 3 ; d) B.",
          reponses: [
            { question: "a)", attendu: "44" },
            { question: "b)", attendu: "24" },
            { question: "c)", attendu: "3" },
            { question: "d)", attendu: ["B", "b) ajoute 12, puis multiplie par 2", "ajoute 12, puis multiplie par 2"] },
          ],
          micros: ["algo_instruction", "algo_repetition", "algo_defi"],
        },
        {
          titre: "Le robot du magasinier",
          enonce:
            "Paul est magasinier. Son robot part de la case verte R. Il va chercher le colis ★, puis l'apporte au quai Q. Les cases grises sont des étagères.\nProgramme 1 : ↑ ↑ ↑ → → →\nProgramme 2 : → → ↓ ↓ ↓\na) Après le programme 1, sur quelle case est le robot ?\nb) Après le programme 2, sur quelle case est-il ?\nc) Combien de cases a-t-il parcourues en tout ?\nd) Sans colis, combien de cases faudrait-il pour aller tout droit de la case verte R au quai ?",
          figure: quadrillage(6, 4, {
            depart: "A1",
            rochers: ["B2", "B3", "C2", "C3", "E2", "E3"],
            objets: [
              { c: "D4", t: "★", fond: "#fde68a" },
              { c: "F1", t: "Q", fond: "#bfdbfe" },
            ],
          }),
          correction:
            "Le robot part de A1.\na) Programme 1. ↑ ↑ ↑ : A2, A3, A4. → → → : B4, C4, D4. Il est sur la case D4, celle du colis.\nb) Programme 2. Il repart de D4, pas de A1. → → : E4, F4. ↓ ↓ ↓ : F3, F2, F1. Il est sur la case F1, le quai.\nc) Programme 1 : 6 flèches. Programme 2 : 5 flèches. 6 + 5 = 11 cases.\nd) De A1 à F1, la ligne 1 est libre : 5 cases vers la droite, → → → → →. Il faut 5 cases.\n⛔ Le piège du b) : rejouer le programme 2 depuis A1. Le robot continue depuis là où il s'est arrêté : D4.\nRéponse : a) D4 ; b) F1 ; c) 11 cases ; d) 5 cases.",
          reponses: [
            { question: "a)", attendu: ["D4", "case D4", "la case D4"] },
            { question: "b)", attendu: ["F1", "case F1", "la case F1"] },
            { question: "c)", attendu: ["11", "11 cases"] },
            { question: "d)", attendu: ["5", "5 cases"] },
          ],
          schema: ecranSeulement(
            quadrillage(6, 4, {
              depart: "A1",
              rochers: ["B2", "B3", "C2", "C3", "E2", "E3"],
              objets: [
                { c: "D4", t: "★", fond: "#fde68a" },
                { c: "F1", t: "Q", fond: "#bfdbfe" },
              ],
              chemin: ["A1", "A2", "A3", "A4", "B4", "C4", "D4", "E4", "F4", "F3", "F2", "F1"],
            }),
          ),
          micros: ["algo_deplacement", "algo_defi"],
        },
        {
          titre: "Le plan de l'architecte",
          enonce:
            "Samir est architecte. Il fait tracer le contour d'une pièce par le lutin. Le stylo est posé.\na) Combien de traits le lutin trace-t-il ?\nb) De combien de pas avance-t-il en tout ?\nc) La pièce est un rectangle. Quelle est sa longueur ? Et sa largeur ?\nd) Samir remplace « répéter 2 fois » par « répéter 4 fois ». De combien de pas le lutin avance-t-il alors ?",
          figure: scratch([
            "quand drapeau vert cliqué",
            "stylo en position d'écriture",
            "répéter 2 fois",
            "  avancer de 80 pas",
            "  tourner à droite de 90°",
            "  avancer de 40 pas",
            "  tourner à droite de 90°",
          ]),
          correction:
            "Dans un tour de boucle : un trait de 80 pas, un quart de tour, un trait de 40 pas, un quart de tour.\na) 2 traits par tour, 2 tours : 2 × 2 = 4 traits.\nb) Un tour : 80 + 40 = 120 pas. Deux tours : 2 × 120 = 240 pas.\nc) Les côtés de 80 pas sont les longueurs, ceux de 40 pas les largeurs. Longueur : 80 pas. Largeur : 40 pas.\nd) 4 tours : 4 × 120 = 480 pas. Le lutin repasse deux fois sur le même rectangle.\n⛔ Le piège : lire la boucle une seule fois, et trouver 120 au b). Les 4 blocs DANS la boucle sont refaits 2 fois.\nRéponse : a) 4 traits ; b) 240 pas ; c) 80 pas et 40 pas ; d) 480 pas.",
          reponses: [
            { question: "a)", attendu: ["4", "4 traits"] },
            { question: "b)", attendu: ["240", "240 pas"] },
            { question: "c) longueur", attendu: ["80", "80 pas"] },
            { question: "c) largeur", attendu: ["40", "40 pas"] },
            { question: "d)", attendu: ["480", "480 pas"] },
          ],
          micros: ["algo_programme", "algo_repetition", "algo_defi"],
        },
      ],
    },
  ],
};
