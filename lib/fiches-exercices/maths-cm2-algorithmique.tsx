// ─── Fiche d'exercices : l'algorithmique (CM2) — 20 exercices corrigés ────────
//
// 10/11/2026 (session fiches-cm2), sur le modèle des feuilles CM2 du tableau et
// du graphique (texte simple, sans KaTeX) et de la feuille de 6e
// `maths-6e-algo-programmation.tsx`, dont l'aide `scratch()` est reprise telle
// quelle.
//
// Alignée sur la fiche de cours `lib/fiches/maths-cm2-algorithmique`
// (« L'algorithmique »), sur la banque `lib/tutor-v4/questionBank/cm2/maths/
// algorithmique.bank.ts` et sur la carte mentale remplie (`cm2/algorithmique`),
// notionId algorithmique : suivre une suite d'instructions dans l'ordre,
// compléter une suite logique, coder un déplacement sur quadrillage, lire ou
// compléter un programme Scratch, utiliser « répéter », défis.
// ⛔ LIMITES DU CM2, lues dans la banque : blocs « quand drapeau vert cliqué »,
// « avancer de … », « tourner d'un quart de tour », « dire … », « répéter …
// fois », « stylo en position d'écriture ». Aucune variable, aucun « si ».
// ⛔ CM2 = AUCUNE question ouverte : la réponse est une CASE du quadrillage
// (« D5 » : la lettre de la colonne, puis le numéro de la ligne), un nombre,
// un mot, ou une lettre de QCM. On ne demande jamais d'écrire un programme : on
// choisit le bon parmi trois.
// ⛔ Aucun exemple de la carte mentale n'est repris (5 + 3 puis × 2 ; 3, 7,
// 11, 15 ; 2, 4, 8 ; → → → ↑ ↑ ; 10 + 10 ; le carré de 50 ; 2 → 4 → 8 → 16).
//
// Les pièges nommés : changer l'ordre des instructions (1, 12), une flèche
// oubliée (2), ajouter au lieu de doubler (3), « tourner » qui ferait avancer
// (4), le bloc de la boucle lu une fois (5, 15), tourner du mauvais côté (6),
// un code qui arrive au même endroit par un autre chemin (7), la boucle
// comptée comme un seul pas (8), le « ? » lu comme le total (9), le premier
// rocher sur le chemin (10), une règle vérifiée sur un seul exemple (11),
// « répéter 3 fois » qui ferait un carré (13), revenir avec les mêmes
// flèches (14), la case de départ arrosée (16), compter le départ comme une
// répétition (17), essayer une flèche sans suivre tout le programme (18),
// le rectangle tracé en 2 côtés (19), compter les cases au lieu des flèches
// (20).
//
// ⭐ LES MATHS SONT TRANSVERSALES : machine à nombres (1), robot aspirateur
// (2), bijouterie (3, bracelet de perles), jeu vidéo (4, 5), robot de
// l'entrepôt (6), course d'orientation (7), escalier du jeu (8), atelier de
// code (9), chasse au trésor (10), machine mystère (11), tour de magie (12),
// dessin au stylo (13), drone (14), danse (15), robot jardinier (16),
// biologie (17), labyrinthe (18), terrain de sport (19), livraison à vélo
// (20). Aucun décor de La Réunion sur cette feuille.
// Les métiers : magasinier (6), magicienne (12), pilote de drone (14),
// chorégraphe (15), jardinière (16), biologiste (17), livreuse (20).
// Tout est un MODÈLE (ex. 17 : des bactéries qui doublent, un modèle de
// biologiste, pas une mesure).
//
// ⭐ LES DESSINS : deux aides locales. `scratch()` (reprise de la 6e) dessine
// les blocs en couleurs Scratch ; `quadrillage` trace la grille (colonnes A,
// B, C… en bas, lignes 1, 2, 3… à gauche, la ligne 1 en bas), le départ
// (rond vert), l'arrivée (drapeau rouge), les rochers, les cases teintées et le chemin. Les cases
// sont écrites EN CLAIR : le script de contrôle (scratchpad) EXÉCUTE chaque
// programme de flèches et de blocs et compare l'arrivée au corrigé.
//
// Micro-compétences : algo_instruction (1, 6, 12), algo_logique (3, 11, 17),
// algo_deplacement (2, 6, 7, 10, 14, 18, 20), algo_programme (4, 9, 13, 15,
// 19), algo_repetition (5, 8, 13, 15, 16, 17, 19), algo_defi (16, 17, 18, 19,
// 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const BLEU = "#2563eb";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas. */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/* ── Les blocs Scratch, dessinés (repris de maths-6e-algo-programmation) ── */

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

type Morceau = { trou: boolean; s: string };
/** Le texte d'un bloc, coupé en morceaux : ce qui est entre apostrophes va dans un trou blanc. */
const morceaux = (t: string): Morceau[] =>
  t
    .split(/('[^']*')/)
    .map((m) => m.trim())
    .filter(Boolean)
    .map((m) => (m.startsWith("'") ? { trou: true, s: m.slice(1, -1) } : { trou: false, s: m }));
const largeurMorceau = (m: Morceau) => (m.trou ? m.s.length * 7.6 + 18 : m.s.length * 8);
const largeurBloc = (t: string) => Math.max(56, 20 + morceaux(t).reduce((w, m, j) => w + largeurMorceau(m) + (j ? 6 : 0), 0));

/**
 * Un PROGRAMME SCRATCH dessiné : une ligne par bloc, deux espaces d'indentation
 * pour le contenu d'un « répéter ». ⭐ Le script de contrôle relit ces lignes
 * et les EXÉCUTE : les écrire en clair.
 */
const scratch = (lignes: string[], enCouleur?: number) => {
  const H = 28;
  const BRAS = 16;
  const JEU = 3;
  const PIED = 14;
  const dessins: ReactNode[] = [];
  let droite = 0;
  const etiquette = (t: string, x: number, y: number, encre: string) => {
    let cx = x + 10;
    return morceaux(t).map((m, j) => {
      const w = largeurMorceau(m);
      const x0 = cx + (j ? 6 : 0);
      cx = x0 + w;
      return m.trou ? (
        <g key={j}>
          <rect x={x0} y={y + 4} width={w} height={20} rx={10} fill="#ffffff" />
          <text x={x0 + 9} y={y + 19} fontSize="14" fontWeight="700" fill="#334155">
            {m.s}
          </text>
        </g>
      ) : (
        <text key={j} x={x0} y={y + 19} fontSize="14" fontWeight="700" fill={encre}>
          {m.s}
        </text>
      );
    });
  };
  const barre = (t: string, x: number, y: number, w: number, h: number, fond: string, encre: string, entoure: boolean) => {
    droite = Math.max(droite, x + w);
    dessins.push(
      <g key={dessins.length}>
        <rect x={x} y={y} width={w} height={h} rx={6} fill={fond} />
        {t ? etiquette(t, x, y, encre) : null}
        {entoure ? <rect x={x - 2} y={y - 2} width={w + 4} height={h + 4} rx={8} fill="none" stroke={ROUGE} strokeWidth={3} /> : null}
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
        barre(b.t, x, y + 8, w, H, fond, encre, b.i === enCouleur);
        y += 8 + H + JEU;
      } else if (b.corps) {
        const wc = Math.max(w, 96);
        barre(b.t, x, y, wc, H, fond, encre, b.i === enCouleur);
        const y2 = Math.max(pose(b.corps, x + BRAS, y + H + JEU), y + H + 14);
        bras(x, y + H - 1, y2 + 1, fond);
        barre("", x, y2, wc, PIED, fond, encre, false);
        y = y2 + PIED + JEU;
      } else {
        barre(b.t, x, y, w, H, fond, encre, b.i === enCouleur);
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

/* ── Le quadrillage ──────────────────────────────────────────────────────── */

type Quad = {
  cols: number;
  rows: number;
  /** La case de départ (rond vert), ex. « B2 ». */
  depart?: string;
  /** Où regarde le robot au départ. */
  regard?: "haut" | "droite" | "bas" | "gauche";
  /** La case d'arrivée (drapeau rouge). */
  arrivee?: string;
  rochers?: string[];
  /** Des cases teintées en vert (les cases arrosées). */
  colorees?: string[];
  /** Le chemin, case par case, à partir du départ. */
  chemin?: string[];
  label: string;
};

/**
 * Un QUADRILLAGE : colonnes A, B, C… (en bas), lignes 1, 2, 3… (à gauche, la
 * ligne 1 en bas). Une case se nomme lettre puis chiffre : « C4 ».
 * ⭐ Le script de contrôle relit les cases : les écrire en clair.
 */
const quadrillage = (q: Quad) => {
  const a = Math.min(38, Math.floor(262 / q.cols), Math.floor(230 / q.rows));
  const x0 = Math.round((300 - a * q.cols) / 2 + 10);
  const y0 = 8;
  const H = y0 + a * q.rows + 30;
  const centre = (c: string): [number, number] => {
    const col = c.charCodeAt(0) - 65;
    const row = Number(c.slice(1));
    return [x0 + (col + 0.5) * a, y0 + (q.rows - row + 0.5) * a];
  };
  const LETTRES = "ABCDEFGHIJ";
  const dir = { haut: [0, -1], droite: [1, 0], bas: [0, 1], gauche: [-1, 0] } as const;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={q.label}>
        <rect x="0" y="0" width="300" height={H} rx="10" fill="#fff" />
        {Array.from({ length: q.cols + 1 }, (_, i) => (
          <line key={`v${i}`} x1={x0 + i * a} y1={y0} x2={x0 + i * a} y2={y0 + q.rows * a} stroke="#94a3b8" strokeWidth={1.2} />
        ))}
        {Array.from({ length: q.rows + 1 }, (_, i) => (
          <line key={`h${i}`} x1={x0} y1={y0 + i * a} x2={x0 + q.cols * a} y2={y0 + i * a} stroke="#94a3b8" strokeWidth={1.2} />
        ))}
        {Array.from({ length: q.cols }, (_, i) => (
          <text key={`l${i}`} x={x0 + (i + 0.5) * a} y={y0 + q.rows * a + 20} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
            {LETTRES[i]}
          </text>
        ))}
        {Array.from({ length: q.rows }, (_, i) => (
          <text key={`n${i}`} x={x0 - 10} y={y0 + (q.rows - i - 0.5) * a + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
            {i + 1}
          </text>
        ))}
        {(q.colorees ?? []).map((c) => {
          const [x, y] = centre(c);
          return <rect key={`v${c}`} x={x - a / 2 + 1} y={y - a / 2 + 1} width={a - 2} height={a - 2} fill="#bbf7d0" />;
        })}
        {(q.rochers ?? []).map((c) => {
          const [x, y] = centre(c);
          return <rect key={`r${c}`} x={x - a * 0.36} y={y - a * 0.36} width={a * 0.72} height={a * 0.72} rx={6} fill="#78716c" stroke="#44403c" strokeWidth={1.5} />;
        })}
        {q.chemin && q.depart ? (
          <polyline
            points={[q.depart, ...q.chemin].map((c) => centre(c).join(",")).join(" ")}
            fill="none"
            stroke={BLEU}
            strokeWidth={3.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ) : null}
        {q.arrivee
          ? (() => {
              const [x, y] = centre(q.arrivee);
              return (
                <g>
                  <line x1={x - a * 0.18} y1={y + a * 0.32} x2={x - a * 0.18} y2={y - a * 0.32} stroke={NOIR} strokeWidth={2} />
                  <polygon points={`${x - a * 0.18},${y - a * 0.32} ${x + a * 0.28},${y - a * 0.17} ${x - a * 0.18},${y - a * 0.02}`} fill={ROUGE} />
                </g>
              );
            })()
          : null}
        {q.depart
          ? (() => {
              const [x, y] = centre(q.depart);
              const d = q.regard ? dir[q.regard] : null;
              return (
                <g>
                  <circle cx={x} cy={y} r={a * 0.3} fill={VERT} stroke="#14532d" strokeWidth={1.5} />
                  {d ? (
                    <polygon
                      points={[
                        [x + d[0] * a * 0.42, y + d[1] * a * 0.42],
                        [x + d[0] * a * 0.12 - d[1] * a * 0.16, y + d[1] * a * 0.12 + d[0] * a * 0.16],
                        [x + d[0] * a * 0.12 + d[1] * a * 0.16, y + d[1] * a * 0.12 - d[0] * a * 0.16],
                      ]
                        .map((p) => p.map((v) => Math.round(v * 10) / 10).join(","))
                        .join(" ")}
                      fill="#ffffff"
                      stroke="#14532d"
                      strokeWidth={1}
                    />
                  ) : null}
                </g>
              );
            })()
          : null}
      </svg>
    </div>
  );
};

export const exercicesAlgorithmiqueCm2: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "algorithmique",
  titre: "L'algorithmique",
  accroche:
    "Vingt exercices, du geste seul au problème. Suivre des instructions dans l'ordre. Trouver la règle d'une suite. Coder un déplacement avec des flèches sur un quadrillage. Lire un programme Scratch, compter les pas, utiliser « répéter ». Un robot aspirateur, une chasse au trésor, un tour de magie, un drone, un robot jardinier, une livreuse à vélo. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/cm2/algorithmique", titre: "L'algorithmique" }],
  coachHref: "/coach-ia/maths?classe=cm2",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je suis les instructions une par une, dans l'ordre.",
      rappel: [
        "On fait les instructions une par une, dans l'ordre, sans en sauter.",
        "Une flèche = une case : → à droite, ← à gauche, ↑ en haut, ↓ en bas.",
        "Une case se nomme par sa lettre (la colonne), puis son chiffre (la ligne) : C4.",
        "« répéter 3 fois » refait 3 fois les blocs qui sont dedans.",
      ],
      exercices: [
        {
          enonce:
            "Voici la machine à nombres : « Pars de 6. Ajoute 4. Puis multiplie par 3. »\na) Quel nombre sort de la machine ?\nb) Lucas multiplie d'abord par 3, puis ajoute 4. Quel nombre trouve-t-il ?\nc) Les deux résultats sont-ils égaux ? Réponds oui ou non.",
          correction:
            "Je fais les instructions dans l'ordre écrit.\na) 6 + 4 = 10. Puis 10 × 3 = 30. Il sort 30.\nb) Lucas : 6 × 3 = 18. Puis 18 + 4 = 22.\nc) 30 et 22 ne sont pas égaux. Non.\n⛔ Le piège : changer l'ordre des instructions. Le résultat change aussi.\nRéponse : a) 30 ; b) 22 ; c) non.",
          micros: ["algo_instruction"],
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: "22" },
            { question: "c)", attendu: "non" },
          ],
        },
        {
          enonce:
            "Un robot aspirateur part de la case B2 (rond vert). Il suit ce code : → → ↑ ↑ ↑\na) Sur quelle case arrive-t-il ?\nb) Combien de flèches y a-t-il dans le code ?",
          figure: quadrillage({ cols: 6, rows: 6, depart: "B2", label: "Un quadrillage de A à F et de 1 à 6, départ en B2" }),
          correction:
            "Je suis les flèches une par une, en partant de B2.\n→ : C2. → : D2.\n↑ : D3. ↑ : D4. ↑ : D5.\na) Le robot arrive en D5.\nb) Je compte : 2 flèches → et 3 flèches ↑. 2 + 3 = 5 flèches.\n⛔ Le piège : oublier une flèche. Je pose le doigt sur chaque flèche, l'une après l'autre.\nRéponse : a) D5 ; b) 5.",
          schema: ecranSeulement(quadrillage({ cols: 6, rows: 6, depart: "B2", arrivee: "D5", chemin: ["C2", "D2", "D3", "D4", "D5"], label: "Le chemin du robot, de B2 à D5" })),
          micros: ["algo_deplacement"],
          reponses: [
            { question: "a)", attendu: "D5" },
            { question: "b)", attendu: ["5", "5 flèches"] },
          ],
        },
        {
          enonce:
            "Trouve la règle, puis continue la suite.\na) 5, 9, 13, 17, … Quel nombre vient ensuite ?\nb) 3, 6, 12, 24, … Quel nombre vient ensuite ?\nc) Une bijoutière enfile des perles : rouge, bleu, bleu, rouge, bleu, bleu… De quelle couleur est la 10e perle ?",
          correction:
            "Je cherche ce qui change d'un terme au suivant.\na) 5 → 9 → 13 → 17 : on ajoute 4 à chaque fois. 17 + 4 = 21.\nb) 3 → 6 → 12 → 24 : on double à chaque fois. 24 × 2 = 48.\nc) Le motif « rouge, bleu, bleu » a 3 perles. Il recommence aux perles 1, 4, 7, 10.\nLa 10e perle commence un motif : elle est rouge.\n⛔ Le piège : au b), ajouter 12 (24 + 12 = 36). La règle n'est pas « ajouter » : c'est « doubler ».\nRéponse : a) 21 ; b) 48 ; c) rouge.",
          micros: ["algo_logique"],
          reponses: [
            { question: "a)", attendu: "21" },
            { question: "b)", attendu: "48" },
            { question: "c)", attendu: ["rouge", "une perle rouge"] },
          ],
        },
        {
          enonce:
            "Dans un jeu vidéo, le lutin suit ce programme.\na) De combien de pas avance-t-il en tout ?\nb) Que dit le lutin à la fin ?\nc) Combien de blocs « avancer » y a-t-il ?",
          figure: scratch(["quand drapeau vert cliqué", "avancer de 10", "tourner d'un quart de tour", "avancer de 20", "dire 'Coucou !'"]),
          correction:
            "Je lis les blocs de haut en bas.\na) Les blocs « avancer » : 10 pas, puis 20 pas. 10 + 20 = 30 pas.\nLe bloc « tourner » ne fait pas avancer : il change seulement la direction.\nb) Le dernier bloc fait parler le lutin : il dit « Coucou ! ».\nc) Il y a 2 blocs « avancer ».\n⛔ Le piège : croire que « tourner » fait avancer. Seuls les blocs « avancer » comptent pour les pas.\nRéponse : a) 30 pas ; b) Coucou ! ; c) 2.",
          micros: ["algo_programme"],
          reponses: [
            { question: "a)", attendu: ["30", "30 pas"] },
            { question: "b)", attendu: ["Coucou", "Coucou !", "il dit Coucou"] },
            { question: "c)", attendu: ["2", "2 blocs"] },
          ],
        },
        {
          enonce:
            "Dans le même jeu, voici un autre programme.\na) Combien de fois le bloc « avancer de 15 » est-il exécuté ?\nb) De combien de pas le lutin avance-t-il en tout ?",
          figure: scratch(["quand drapeau vert cliqué", "répéter 4 fois", "  avancer de 15"]),
          correction:
            "Le bloc « avancer de 15 » est DANS la boucle « répéter 4 fois ».\na) Il est exécuté 4 fois.\nb) 4 fois 15 pas : 4 × 15 = 60 pas.\n⛔ Le piège : lire le bloc une seule fois et répondre 15. La boucle le refait 4 fois.\nRéponse : a) 4 fois ; b) 60 pas.",
          micros: ["algo_repetition"],
          reponses: [
            { question: "a)", attendu: ["4", "4 fois"] },
            { question: "b)", attendu: ["60", "60 pas"] },
          ],
        },
        {
          enonce:
            "Un magasinier pilote un robot dans l'entrepôt. Le robot est en A1 et regarde vers le haut (petite flèche blanche).\nIl suit : « Avance de 2 cases. Tourne à droite. Avance de 3 cases. »\na) Sur quelle case arrive-t-il ?\nb) Vers où regarde-t-il à la fin ? A : vers la droite ; B : vers le haut ; C : vers le bas. Réponds A, B ou C.",
          figure: quadrillage({ cols: 5, rows: 5, depart: "A1", regard: "haut", label: "Un quadrillage de A à E et de 1 à 5, le robot en A1 regarde vers le haut" }),
          correction:
            "Je suis les instructions dans l'ordre, en gardant la direction du robot.\n« Avance de 2 cases » vers le haut : A2, puis A3.\n« Tourne à droite » : le robot regardait vers le haut, il regarde maintenant vers la droite. Il ne bouge pas.\n« Avance de 3 cases » vers la droite : B3, C3, D3.\na) Il arrive en D3.\nb) Après avoir tourné, il regarde vers la droite. Réponse A.\n⛔ Le piège : tourner du mauvais côté. Je tourne mon propre corps comme le robot pour vérifier.\nRéponse : a) D3 ; b) A.",
          schema: ecranSeulement(quadrillage({ cols: 5, rows: 5, depart: "A1", arrivee: "D3", chemin: ["A2", "A3", "B3", "C3", "D3"], label: "Le chemin du robot, de A1 à D3" })),
          micros: ["algo_instruction", "algo_deplacement"],
          reponses: [
            { question: "a)", attendu: "D3" },
            { question: "b)", attendu: "A" },
          ],
        },
        {
          enonce:
            "Course d'orientation : le chemin bleu va du départ (rond vert) au drapeau.\na) Quel code suit exactement ce chemin ?\nA : → → ↑ ↑\nB : ↑ ↑ → → →\nC : → → → ↑ ↑\nRéponds A, B ou C.\nb) Combien de flèches ↑ y a-t-il dans le bon code ?",
          figure: quadrillage({ cols: 5, rows: 4, depart: "A1", arrivee: "D3", chemin: ["B1", "C1", "D1", "D2", "D3"], label: "Un chemin de A1 à D3 : trois cases à droite, puis deux vers le haut" }),
          correction:
            "Je suis le chemin bleu depuis le départ A1.\nIl va d'abord à droite : B1, C1, D1. Cela fait 3 flèches →.\nPuis il monte : D2, D3. Cela fait 2 flèches ↑.\nLe code est : → → → ↑ ↑.\na) Code A : seulement 2 flèches →. Il arrive en C3 : faux.\nCode B : il monte d'abord. Il arrive bien en D3, mais par un autre chemin : faux.\nCode C : c'est le chemin bleu. Réponse C.\nb) 2 flèches ↑.\n⛔ Le piège : choisir B parce qu'il arrive au drapeau. On demande le code qui suit CE chemin.\nRéponse : a) C ; b) 2.",
          micros: ["algo_deplacement"],
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: ["2", "2 flèches"] },
          ],
        },
        {
          enonce:
            "Dans un jeu d'escalier, le pion part de A1. Il suit ce code : « Répète 3 fois : → ↑ »\na) Sur quelle case arrive-t-il ?\nb) Combien de flèches a-t-il faites en tout ?",
          figure: quadrillage({ cols: 5, rows: 5, depart: "A1", label: "Un quadrillage de A à E et de 1 à 5, départ en A1" }),
          correction:
            "« Répète 3 fois : → ↑ » veut dire : → ↑, puis → ↑, puis → ↑.\n1re fois : B1, puis B2.\n2e fois : C2, puis C3.\n3e fois : D3, puis D4.\na) Le pion arrive en D4.\nb) 2 flèches à chaque fois, 3 fois : 3 × 2 = 6 flèches.\n⛔ Le piège : faire le motif une seule fois et répondre B2. La boucle le refait 3 fois.\nRéponse : a) D4 ; b) 6.",
          schema: ecranSeulement(quadrillage({ cols: 5, rows: 5, depart: "A1", arrivee: "D4", chemin: ["B1", "B2", "C2", "C3", "D3", "D4"], label: "L'escalier du pion, de A1 à D4" })),
          micros: ["algo_repetition", "algo_deplacement"],
          reponses: [
            { question: "a)", attendu: "D4" },
            { question: "b)", attendu: ["6", "6 flèches"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Deux ou trois étapes. Je fais tourner le programme sur mon brouillon.",
      rappel: [
        "Je note où est le robot après CHAQUE instruction.",
        "Un rocher bloque la case : le robot ne peut pas y aller.",
        "Dans une boucle, je compte : (ce qui est dedans) × (le nombre de tours).",
        "Pour une suite ou une machine, je vérifie ma règle sur TOUS les exemples.",
      ],
      exercices: [
        {
          enonce:
            "À l'atelier de code, Jade veut que son lutin avance de 50 pas en tout. Il manque un nombre dans son programme.\na) Quel nombre faut-il écrire à la place du « ? » ?\nb) Combien de blocs « avancer » sont exécutés en tout ?",
          figure: scratch(["quand drapeau vert cliqué", "répéter 2 fois", "  avancer de 10", "avancer de '?'"]),
          correction:
            "Je calcule ce que fait déjà le programme.\nLa boucle refait 2 fois « avancer de 10 » : 2 × 10 = 20 pas.\na) Il faut 50 pas en tout. 50 − 20 = 30. J'écris 30.\nVérification : 10 + 10 + 30 = 50.\nb) 2 fois dans la boucle, puis 1 fois après : 2 + 1 = 3 blocs exécutés.\n⛔ Le piège : écrire 50 dans le trou. Le lutin a déjà fait 20 pas avant.\nRéponse : a) 30 ; b) 3.",
          micros: ["algo_programme", "algo_repetition"],
          reponses: [
            { question: "a)", attendu: "30" },
            { question: "b)", attendu: ["3", "3 blocs"] },
          ],
        },
        {
          enonce:
            "Chasse au trésor : le pirate part de A1 et veut le trésor en D4 (drapeau). Les cases grises sont des rochers : il ne peut pas y aller.\na) Quel code l'amène au trésor sans toucher de rocher ?\nA : → → → ↑ ↑ ↑\nB : ↑ ↑ ↑ → → →\nC : → ↑ ↑ → → ↑\nRéponds A, B ou C.\nb) Avec le code A, sur quelle case est le premier rocher qu'il rencontre ?",
          figure: quadrillage({ cols: 5, rows: 5, depart: "A1", arrivee: "D4", rochers: ["C1", "B3", "D2"], label: "Départ A1, trésor D4, rochers en C1, B3 et D2" }),
          correction:
            "Je suis chaque code case par case, en regardant les rochers (C1, B3, D2).\nCode A : → B1, → C1. C1 est un rocher : bloqué.\nCode B : ↑ A2, ↑ A3, ↑ A4, puis → B4, → C4, → D4. Aucun rocher : il arrive au trésor.\nCode C : → B1, ↑ B2, ↑ B3. B3 est un rocher : bloqué.\na) Le code B.\nb) Avec le code A, le premier rocher est en C1.\n⛔ Le piège : ne regarder que la case d'arrivée. Il faut vérifier TOUTES les cases du chemin.\nRéponse : a) B ; b) C1.",
          schema: ecranSeulement(quadrillage({ cols: 5, rows: 5, depart: "A1", arrivee: "D4", rochers: ["C1", "B3", "D2"], chemin: ["A2", "A3", "A4", "B4", "C4", "D4"], label: "Le chemin du code B, de A1 à D4" })),
          micros: ["algo_deplacement"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "C1" },
          ],
        },
        {
          enonce:
            "Une machine mystère transforme les nombres.\nQuand on entre 2, il sort 7. Quand on entre 3, il sort 9. Quand on entre 5, il sort 13.\na) Quelle est la règle ? A : ajouter 5 ; B : multiplier par 2, puis ajouter 3 ; C : multiplier par 3, puis ajouter 1. Réponds A, B ou C.\nb) Quel nombre sort si on entre 10 ?\nc) Il est sorti 17. Quel nombre a-t-on entré ?",
          correction:
            "Je teste chaque règle sur TOUS les exemples.\nRègle A : 2 + 5 = 7, oui. Mais 3 + 5 = 8, pas 9 : fausse.\nRègle C : 2 × 3 + 1 = 7, oui. Mais 3 × 3 + 1 = 10, pas 9 : fausse.\nRègle B : 2 × 2 + 3 = 7 ; 3 × 2 + 3 = 9 ; 5 × 2 + 3 = 13. Elle marche toujours.\na) Réponse B.\nb) 10 × 2 = 20, puis 20 + 3 = 23.\nc) Je remonte la machine à l'envers : 17 − 3 = 14, puis 14 ÷ 2 = 7.\nVérification : 7 × 2 + 3 = 17.\n⛔ Le piège : vérifier la règle sur un seul exemple. La règle A marche pour 2, mais pas pour 3.\nRéponse : a) B ; b) 23 ; c) 7.",
          micros: ["algo_logique"],
          reponses: [
            { question: "a)", attendu: "B" },
            { question: "b)", attendu: "23" },
            { question: "c)", attendu: "7" },
          ],
        },
        {
          enonce:
            "Une magicienne fait un tour : « Choisis un nombre. Ajoute 5. Multiplie par 2. Enlève 10. »\na) Quel nombre trouve-t-on en partant de 7 ?\nb) En partant de 3 ?\nc) En partant de 20 ?",
          correction:
            "Je fais les 3 instructions dans l'ordre, à chaque fois.\na) 7 + 5 = 12. 12 × 2 = 24. 24 − 10 = 14.\nb) 3 + 5 = 8. 8 × 2 = 16. 16 − 10 = 6.\nc) 20 + 5 = 25. 25 × 2 = 50. 50 − 10 = 40.\nLe secret du tour : on retrouve toujours le double du nombre choisi.\n⛔ Le piège : changer l'ordre et faire « × 2 » avant « + 5 ». Pour 7, on trouverait 9, pas 14.\nRéponse : a) 14 ; b) 6 ; c) 40.",
          micros: ["algo_instruction"],
          reponses: [
            { question: "a)", attendu: "14" },
            { question: "b)", attendu: "6" },
            { question: "c)", attendu: "40" },
          ],
        },
        {
          enonce:
            "Le lutin a un stylo. Il trace en avançant.\na) Quelle figure trace-t-il ?\nb) Quelle longueur de trait trace-t-il en tout, en pas ?\nc) On remplace « répéter 4 fois » par « répéter 3 fois ». Combien de côtés sont tracés ?",
          figure: scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 4 fois", "  avancer de 30", "  tourner d'un quart de tour"]),
          correction:
            "Dans la boucle : avancer de 30, puis tourner d'un quart de tour.\nÀ chaque tour, le lutin trace un côté de 30 pas, puis tourne d'un angle droit.\na) 4 côtés de 30 pas et 4 angles droits : c'est un carré.\nb) 4 × 30 = 120 pas.\nc) Avec 3 tours, il trace seulement 3 côtés. Le carré n'est pas fermé.\n⛔ Le piège : croire que « répéter 3 fois » trace encore un carré. Il manque le 4e côté.\nRéponse : a) un carré ; b) 120 pas ; c) 3.",
          micros: ["algo_programme", "algo_repetition"],
          reponses: [
            { question: "a)", attendu: ["carré", "un carré"] },
            { question: "b)", attendu: ["120", "120 pas"] },
            { question: "c)", attendu: ["3", "3 côtés"] },
          ],
        },
        {
          enonce:
            "Un pilote de drone part de E5. Le drone suit ce code : ← ← ↓ ↓ ↓\na) Sur quelle case arrive le drone ?\nb) Quel code le ramène en E5 ?\nA : → → ↑ ↑ ↑\nB : ← ← ↑ ↑ ↑\nC : ↑ ↑ → → →\nRéponds A, B ou C.",
          figure: quadrillage({ cols: 6, rows: 6, depart: "E5", label: "Un quadrillage de A à F et de 1 à 6, départ en E5" }),
          correction:
            "a) Je pars de E5.\n← : D5. ← : C5. ↓ : C4. ↓ : C3. ↓ : C2.\nLe drone arrive en C2.\nb) Pour revenir, je fais le chemin à l'envers : chaque flèche dans l'autre sens.\nIl est allé 2 fois à gauche : il revient 2 fois à droite, → →.\nIl est descendu 3 fois : il remonte 3 fois, ↑ ↑ ↑.\nCode A : → → ↑ ↑ ↑ : D2, E2, E3, E4, E5. Réponse A.\nCode B va encore à gauche. Code C finit en F4.\n⛔ Le piège : refaire les mêmes flèches que l'aller. Pour revenir, chaque flèche change de sens.\nRéponse : a) C2 ; b) A.",
          schema: ecranSeulement(quadrillage({ cols: 6, rows: 6, depart: "E5", arrivee: "C2", chemin: ["D5", "C5", "C4", "C3", "C2"], label: "L'aller du drone, de E5 à C2" })),
          micros: ["algo_deplacement"],
          reponses: [
            { question: "a)", attendu: "C2" },
            { question: "b)", attendu: "A" },
          ],
        },
        {
          enonce:
            "Une chorégraphe programme un danseur virtuel.\na) De combien de pas avance-t-il en tout ?\nb) Combien de fois dit-il « Hop ! » ?",
          figure: scratch(["quand drapeau vert cliqué", "répéter 3 fois", "  avancer de 10", "  dire 'Hop !'", "avancer de 5"]),
          correction:
            "Je regarde ce qui est DANS la boucle, et ce qui est après.\nDans la boucle : « avancer de 10 » et « dire Hop ! », refaits 3 fois.\nAprès la boucle : « avancer de 5 », une seule fois.\na) 3 × 10 = 30 pas dans la boucle. Puis 5 pas. 30 + 5 = 35 pas.\nb) « Hop ! » est dans la boucle : il le dit 3 fois.\n⛔ Le piège : mettre « avancer de 5 » dans la boucle. Il est en dessous, hors de la pince orange : il ne se fait qu'une fois.\nRéponse : a) 35 pas ; b) 3 fois.",
          micros: ["algo_programme", "algo_repetition"],
          reponses: [
            { question: "a)", attendu: ["35", "35 pas"] },
            { question: "b)", attendu: ["3", "3 fois"] },
          ],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème en plusieurs étapes. Je fais tourner le programme pas à pas, sur papier.",
      rappel: [
        "Je fais tourner le programme pas à pas, et je note chaque étape.",
        "Dans une boucle, je compte les tours : 1er, 2e, 3e…",
        "La case de départ n'est pas une étape : on part de là.",
        "Je vérifie ma réponse en refaisant le chemin.",
      ],
      exercices: [
        {
          titre: "Le robot jardinier",
          enonce:
            "Une jardinière programme un robot. Il part de A3 et suit : « Répète 3 fois : avance de 2 cases vers la droite, puis arrose. »\na) Quelle est la première case arrosée ?\nb) Quelle est la dernière case arrosée ?\nc) Combien de cases sont arrosées ?",
          figure: quadrillage({ cols: 7, rows: 4, depart: "A3", label: "Un quadrillage de A à G et de 1 à 4, départ en A3" }),
          correction:
            "Je fais tourner la boucle, tour par tour. Le robot part de A3.\n1er tour : il avance de 2 cases, B3 puis C3. Il arrose C3.\n2e tour : D3 puis E3. Il arrose E3.\n3e tour : F3 puis G3. Il arrose G3.\na) La première case arrosée est C3.\nb) La dernière est G3.\nc) Une case arrosée par tour, 3 tours : 3 cases.\n⛔ Le piège : arroser la case de départ A3. Le robot avance d'abord, puis il arrose.\nRéponse : a) C3 ; b) G3 ; c) 3.",
          schema: ecranSeulement(
            quadrillage({
              cols: 7,
              rows: 4,
              depart: "A3",
              chemin: ["B3", "C3", "D3", "E3", "F3", "G3"],
              colorees: ["C3", "E3", "G3"],
              label: "Le robot va de A3 à G3 et arrose C3, E3 et G3 (cases en vert)",
            }),
          ),
          micros: ["algo_defi", "algo_repetition", "algo_deplacement"],
          reponses: [
            { question: "a)", attendu: "C3" },
            { question: "b)", attendu: "G3" },
            { question: "c)", attendu: ["3", "3 cases"] },
          ],
        },
        {
          titre: "Les bactéries qui doublent",
          enonce:
            "Dans le modèle d'une biologiste, des bactéries doublent à chaque étape. Elle part de 3 bactéries.\nSon programme : « Pars de 3. Répète 4 fois : double. »\na) Combien de bactéries y a-t-il à la fin ?\nb) Combien de fois faut-il doubler, en partant de 3, pour dépasser 100 ?",
          correction:
            "Je fais tourner la boucle et j'écris le nombre après chaque tour.\nDépart : 3.\n1er tour : 3 × 2 = 6. 2e tour : 6 × 2 = 12. 3e tour : 12 × 2 = 24. 4e tour : 24 × 2 = 48.\na) Après 4 tours : 48 bactéries.\nb) Je continue : 5e tour : 48 × 2 = 96. Ce n'est pas encore plus que 100.\n6e tour : 96 × 2 = 192. Cette fois, c'est plus que 100.\nIl faut doubler 6 fois.\n⛔ Le piège : compter le départ comme un tour, et s'arrêter à 24. Le 3 du départ n'est pas un tour.\nRéponse : a) 48 ; b) 6.",
          micros: ["algo_defi", "algo_logique", "algo_repetition"],
          reponses: [
            { question: "a)", attendu: ["48", "48 bactéries"] },
            { question: "b)", attendu: ["6", "6 fois"] },
          ],
        },
        {
          titre: "La flèche effacée",
          enonce:
            "Dans un labyrinthe, Ali part de A1 et doit arriver au drapeau en D4. Une flèche de son code est effacée : → → ↑ ? ↑ →\na) Quelle flèche faut-il mettre à la place du « ? » ? A : → ; B : ← ; C : ↑. Réponds A, B ou C.\nb) Avec la flèche A (→), sur quelle case arriverait-il ?",
          figure: quadrillage({ cols: 5, rows: 5, depart: "A1", arrivee: "D4", label: "Départ A1, arrivée D4" }),
          correction:
            "Je suis le code jusqu'au « ? » : → B1, → C1, ↑ C2. Ali est en C2.\nIl reste : ? ↑ →. Je teste chaque flèche jusqu'au bout.\nA (→) : D2, puis ↑ D3, puis → E3. Pas le drapeau.\nB (←) : B2, puis ↑ B3, puis → C3. Pas le drapeau.\nC (↑) : C3, puis ↑ C4, puis → D4. C'est le drapeau !\na) Réponse C.\nb) Avec → , il arriverait en E3.\n⛔ Le piège : choisir la flèche qui « va vers le drapeau » sans suivre tout le code. Je fais tourner le code jusqu'au bout.\nRéponse : a) C ; b) E3.",
          schema: ecranSeulement(quadrillage({ cols: 5, rows: 5, depart: "A1", arrivee: "D4", chemin: ["B1", "C1", "C2", "C3", "C4", "D4"], label: "Le chemin avec la flèche ↑, de A1 à D4" })),
          micros: ["algo_defi", "algo_deplacement"],
          reponses: [
            { question: "a)", attendu: "C" },
            { question: "b)", attendu: "E3" },
          ],
        },
        {
          titre: "Le terrain de sport",
          enonce:
            "Pour tracer un terrain, le lutin suit ce programme. Il a un stylo.\na) Quelle figure trace-t-il ?\nb) Quelle longueur de trait trace-t-il en tout, en pas ?\nc) Combien de blocs « avancer » sont exécutés ?",
          figure: scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 2 fois", "  avancer de 60", "  tourner d'un quart de tour", "  avancer de 30", "  tourner d'un quart de tour"]),
          correction:
            "Je fais tourner la boucle sur mon brouillon.\n1er tour : un trait de 60, un angle droit, un trait de 30, un angle droit.\n2e tour : encore 60, un angle droit, 30, un angle droit.\na) 4 côtés : 60, 30, 60, 30, avec 4 angles droits. C'est un rectangle.\nb) 60 + 30 + 60 + 30 = 180 pas.\nc) 2 blocs « avancer » dans la boucle, refaits 2 fois : 2 × 2 = 4 blocs.\n⛔ Le piège : lire la boucle une seule fois. On n'aurait que 2 côtés, pas un rectangle.\nRéponse : a) un rectangle ; b) 180 pas ; c) 4.",
          micros: ["algo_defi", "algo_programme", "algo_repetition"],
          reponses: [
            { question: "a)", attendu: ["rectangle", "un rectangle"] },
            { question: "b)", attendu: ["180", "180 pas"] },
            { question: "c)", attendu: ["4", "4 blocs"] },
          ],
        },
        {
          titre: "La livreuse à vélo",
          enonce:
            "Une livreuse à vélo part de B1. Elle suit ce code : → → → ↑ ↑ →. Elle met 2 minutes pour chaque case.\na) Sur quelle case livre-t-elle ?\nb) Combien de cases parcourt-elle ?\nc) Combien de minutes dure le trajet ?",
          figure: quadrillage({ cols: 6, rows: 4, depart: "B1", label: "Un quadrillage de A à F et de 1 à 4, départ en B1" }),
          correction:
            "Je suis le code case par case, depuis B1.\n→ C1, → D1, → E1, ↑ E2, ↑ E3, → F3.\na) Elle livre en F3.\nb) Une flèche = une case. 6 flèches : 6 cases.\nc) 2 minutes par case : 6 × 2 = 12 minutes.\n⛔ Le piège : compter la case de départ et trouver 7 cases. On compte les flèches, pas les cases touchées.\nRéponse : a) F3 ; b) 6 ; c) 12 minutes.",
          schema: ecranSeulement(quadrillage({ cols: 6, rows: 4, depart: "B1", arrivee: "F3", chemin: ["C1", "D1", "E1", "E2", "E3", "F3"], label: "Le trajet de la livreuse, de B1 à F3" })),
          micros: ["algo_defi", "algo_deplacement"],
          reponses: [
            { question: "a)", attendu: "F3" },
            { question: "b)", attendu: ["6", "6 cases"] },
            { question: "c)", attendu: ["12", "12 minutes", "12 min"] },
          ],
        },
      ],
    },
  ],
};
