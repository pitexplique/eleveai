// ─── Fiche d'exercices : algorithmique et programmation (6e) — 20 exercices corrigés ─
//
// Lot de 6e (30/09/2026), sur le modèle de la feuille étalon de 5e
// `maths-5e-relatif-nombre.tsx` et de sa voisine `maths-5e-algo-programmation.tsx`
// (dont `scratch()` et `lutin()` sont repris tels quels).
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-algorithmique.tsx` (clé
// maths/6e/algo-programmation) et sur la banque
// `lib/tutor-v4/questionBank/6e/maths/algorithmique.bank.ts` (lue seulement),
// notionId algo_programmation : une suite d'instructions dans l'ordre, un
// déplacement (avancer, tourner), une répétition simple, lire et prévoir un
// programme, construire une figure (carré, rectangle, triangle), défis.
// ⛔ LIMITES DE LA 6e, lues dans la banque : les blocs « quand drapeau vert
// cliqué », « avancer », « tourner », « répéter … fois », « dire », « stylo en
// position d'écriture ». AUCUNE variable, aucun « demander », aucun « si »,
// aucune boucle dans une boucle (tout cela est en 5e). Angles de 90°, 120°,
// 60° et 72°, comme dans la banque.
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni « avancer 3, tourner,
// avancer 2 », ni « répéter 4 fois avancer de 10 », ni « 10 puis 3 fois 20 »,
// ni le carré de côté 50 à trois répétitions. Aucun de la feuille de 5e.
//
// PUBLIC DE 11 ANS (Frédéric, 30/09) : phrases courtes, une idée par phrase.
// Les programmes sont DESSINÉS en blocs de couleur, comme dans Scratch. Les
// corrigés disent « je ».
//
// Les pièges nommés : le drapeau compté comme une action (1), « tourner »
// qui ferait avancer (2, 5), le bloc de la boucle lu une fois (3, 8), un seul
// bloc mis dans la boucle (4), les mêmes blocs crus menant au même endroit
// (7), le deuxième « tourner » oublié (9, 14), « répéter 2 fois » qui ne
// tracerait que 2 côtés (10), l'angle du triangle au lieu de l'angle à
// tourner (11), le « tourner » oublié ou mis hors de la boucle (12), le stylo
// posé trop tard (13), le « tourner à droite » oublié (15), le périmètre pris
// pour un côté (16), blocs écrits comptés au lieu de blocs exécutés (17, 20),
// l'angle cru toujours de 90° (19).
//
// Aucun fait réel à vérifier : le robot semeur, la course d'orientation, la
// chasse au trésor sont des MODÈLES. Une alvéole de ruche est un hexagone :
// 6 côtés égaux.
//
// ⭐ LES DESSINS : 11 programmes en blocs et 3 trajets du lutin (7, 12, 14)
// sont imprimés : 14. Les autres trajets et blocs, qui redisent le corrigé,
// sont `ecranSeulement` (PDF ≤ 12 pages).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-algo-programmation.mjs`
// EXÉCUTE chaque programme dessiné avec un petit interprète de blocs, relit
// chaque trajet du lutin et le compare à l'exécution.
//
// Micro-compétences : algo_sequence (1, 5, 7, 13, 14), algo_deplacement (2, 7,
// 9, 14, 20), algo_repetition (3, 4, 8, 10, 15, 17, 18), algo_lire_programme
// (5, 8, 9, 12, 15, 17, 20), algo_figure (4, 6, 10, 11, 12, 16, 18, 19),
// algo_defi (11, 16, 17, 18, 19, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/* ── Les blocs Scratch, dessinés ─────────────────────────────────────────── */

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
 * pour le contenu d'un « répéter ». La boucle embrasse son contenu, comme dans
 * Scratch. `enCouleur` : le numéro de la ligne à entourer de rouge.
 * ⭐ Le script de recalcul relit ces lignes et les EXÉCUTE : les écrire en clair.
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

/**
 * Le TRAJET du lutin, à l'échelle, sur un quadrillage (un carreau = `grille`
 * pas, 10 par défaut). Un ou deux chemins (bleu, puis orange en pointillés),
 * leurs sommets dans l'ordre, y vers le haut. Rond vert au départ, rond rouge à
 * l'arrivée. `cotes` : le nombre de premiers côtés du premier chemin dont on
 * écrit la longueur. ⭐ Le script de recalcul relit ces sommets et les compare
 * à l'exécution du programme.
 */
const lutin = (chemins: [number, number][][], legende: string, opts: { cotes?: number; grille?: number } = {}) => {
  const tous = chemins.flat();
  const xs = tous.map((p) => p[0]);
  const ys = tous.map((p) => p[1]);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const k = Math.min(240 / Math.max(x1 - x0, 1), 180 / Math.max(y1 - y0, 1));
  const W = 300;
  const ox = (W - (x1 - x0) * k) / 2;
  const X = (x: number) => ox + (x - x0) * k;
  // ⛔ MESURÉ LE 30/09 À 375 PX (ex. 2 et 9) : une cote posée AU-DESSUS du côté le
  // plus haut sortait du cadre avec une marge de 24. Marge de 36, et cote bornée.
  const Y = (y: number) => 36 + (y1 - y) * k;
  const H = Y(y0) + 50;
  const pas = opts.grille ?? 10;
  const gx: number[] = [];
  for (let v = Math.ceil(x0 / pas) * pas; v <= x1 + 1e-9; v += pas) gx.push(v);
  const gy: number[] = [];
  for (let v = Math.ceil(y0 / pas) * pas; v <= y1 + 1e-9; v += pas) gy.push(v);
  const premier = chemins[0] ?? [];
  // Une cote qui en touche une déjà posée passe de l'autre côté de son segment.
  const posees: { x: number; y: number; t: string }[] = [];
  const touche = (a: { x: number; y: number; t: string }) =>
    posees.some((b) => Math.abs(a.x - b.x) < ((a.t.length + b.t.length) * 9) / 2 + 2 && Math.abs(a.y - b.y) < 16);
  const cotes = premier.slice(1, (opts.cotes ?? 0) + 1).map((q, j) => {
    const p = premier[j];
    const [dx, dy] = [q[0] - p[0], q[1] - p[1]];
    const L = Math.hypot(dx, dy) || 1;
    const [nx, ny] = [dy / L, -dx / L];
    const t = String(Math.round(L * 100) / 100).replace(".", ",");
    const place = (s: number) => ({ x: Math.min(Math.max(X((p[0] + q[0]) / 2) + s * nx * 15, 16), W - 16), y: Math.min(Math.max(Y((p[1] + q[1]) / 2) - s * ny * 15 + 5, 18), H - 30), t });
    const c = touche(place(1)) ? place(-1) : place(1);
    posees.push(c);
    return c;
  });
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={legende}>
        {gx.map((v) => (
          <line key={`x${v}`} x1={X(v)} y1={Y(y1)} x2={X(v)} y2={Y(y0)} stroke="#e2e8f0" strokeWidth={1} />
        ))}
        {gy.map((v) => (
          <line key={`y${v}`} x1={X(x0)} y1={Y(v)} x2={X(x1)} y2={Y(v)} stroke="#e2e8f0" strokeWidth={1} />
        ))}
        {chemins.map((c, i) => (
          <polyline
            key={`c${i}`}
            points={c.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")}
            fill="none"
            stroke={i % 2 ? ORANGE : BLEU}
            strokeWidth={3}
            strokeDasharray={i % 2 ? "7 5" : undefined}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}
        {cotes.map((c, j) => (
          <text key={`t${j}`} x={c.x} y={c.y} textAnchor="middle" fontSize="14" fontWeight="900" fill={NOIR} stroke="white" strokeWidth="3" paintOrder="stroke">
            {c.t}
          </text>
        ))}
        {chemins.map((c, i) => (
          <circle key={`d${i}`} cx={X(c[0][0])} cy={Y(c[0][1])} r={6} fill={VERT} />
        ))}
        {chemins.map((c, i) => (
          <circle key={`f${i}`} cx={X(c[c.length - 1][0])} cy={Y(c[c.length - 1][1])} r={4.5} fill={ROUGE} />
        ))}
        <text x={W / 2} y={H - 10} textAnchor="middle" fontSize="14" fontWeight="700" fill={NOIR}>
          {legende}
        </text>
      </svg>
    </div>
  );
};

export const exercicesAlgoProgrammation6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "algo-programmation",
  titre: "Algorithmique et programmation",
  accroche:
    "Vingt exercices en blocs Scratch, du bloc seul au petit problème : lire les blocs dans l'ordre, faire avancer et tourner le lutin, utiliser une boucle « répéter », tracer un carré, un rectangle, un triangle. Un robot qui sème, une course d'orientation, une ruche, une chasse au trésor. Un rappel avant chaque niveau. Cherche d'abord, puis ouvre la correction : étape par étape, avec le trajet du lutin et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/algo-programmation", titre: "Algorithmique et programmation" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un programme court. Je le lis bloc par bloc, de haut en bas.",
      rappel: [
        "Un programme se lit de haut en bas, un bloc après l'autre.",
        "« avancer » déplace le lutin. « tourner » change seulement sa direction.",
        "Les blocs DANS une boucle « répéter » sont refaits à chaque tour.",
      ],
      exercices: [
        {
          enonce: "Lis ce programme.\na) Combien de blocs y a-t-il sous le drapeau ?\nb) Quel est le 2e bloc ?\nc) De combien de pas le lutin avance-t-il en tout ?",
          figure: scratch(["quand drapeau vert cliqué", "avancer de 30", "dire 'Bonjour !'", "avancer de 20"]),
          correction:
            "Je lis les blocs de haut en bas.\na) Sous le drapeau, je compte $3$ blocs.\nb) Le 1er bloc fait avancer. Le 2e fait parler : « dire Bonjour ! ».\nc) J'additionne seulement les blocs « avancer » : $30 + 20 = 50$.\n⛔ Le piège : compter le drapeau comme une action. Il sert seulement à lancer le programme.\nRéponse : a) $3$ blocs ; b) « dire Bonjour ! » ; c) $50$ pas.",
          micros: ["algo_sequence"],
        },
        {
          enonce: "Le lutin part en regardant vers la droite.\na) Vers où regarde-t-il après le premier « tourner » ?\nb) Et après le deuxième ?\nc) De combien de pas avance-t-il en tout ?",
          figure: scratch(["quand drapeau vert cliqué", "avancer de 20", "tourner à gauche de 90°", "avancer de 20", "tourner à gauche de 90°", "avancer de 20"]),
          correction:
            "« tourner à gauche de 90° » fait un quart de tour vers la gauche.\na) Il regardait vers la droite. Après un quart de tour, il regarde vers le haut.\nb) Encore un quart de tour à gauche : il regarde vers la gauche.\nc) $20 + 20 + 20 = 60$ pas.\n⛔ Le piège : croire que « tourner » fait avancer. Il change seulement la direction.\nRéponse : a) vers le haut ; b) vers la gauche ; c) $60$ pas.",
          schema: ecranSeulement(lutin([[[0, 0], [20, 0], [20, 20], [0, 20]]], "départ vert, arrivée rouge", { cotes: 3 })),
          micros: ["algo_deplacement"],
        },
        {
          enonce: "Un programme répète $6$ fois le bloc « avancer de 15 ».\na) Combien de fois ce bloc est-il exécuté ?\nb) De combien de pas le lutin avance-t-il en tout ?",
          figure: ecranSeulement(scratch(["quand drapeau vert cliqué", "répéter 6 fois", "  avancer de 15"])),
          correction:
            "Le bloc est DANS la boucle « répéter 6 fois ».\na) Il est donc exécuté $6$ fois.\nb) À chaque fois, le lutin avance de $15$ pas.\n$6 \\times 15 = 90$.\n⛔ Le piège : lire le bloc une seule fois et répondre $15$.\nRéponse : a) $6$ fois ; b) $90$ pas.",
          micros: ["algo_repetition"],
        },
        {
          enonce: "Ce programme est long.\nRéécris-le avec un bloc « répéter ».\nQue trace-t-il si le stylo est posé ?",
          figure: scratch(["quand drapeau vert cliqué", "avancer de 25", "tourner à droite de 90°", "avancer de 25", "tourner à droite de 90°", "avancer de 25", "tourner à droite de 90°", "avancer de 25", "tourner à droite de 90°"]),
          correction:
            "Je cherche ce qui revient : « avancer de 25 », puis « tourner à droite de 90° ».\nCe groupe de deux blocs revient $4$ fois.\nJe le mets dans « répéter 4 fois ».\nLe programme passe de $8$ blocs à $3$ blocs.\nLe lutin fait $4$ côtés de $25$ pas, avec $4$ angles droits : c'est un carré.\n⛔ Le piège : mettre un seul bloc dans la boucle. Il faut les deux, dans le même ordre.\nRéponse : le programme ci-dessous. Il trace un carré.",
          schema: ecranSeulement(scratch(["quand drapeau vert cliqué", "répéter 4 fois", "  avancer de 25", "  tourner à droite de 90°"])),
          micros: ["algo_repetition", "algo_figure"],
        },
        {
          enonce: "Lis ce programme.\na) Quel est le premier message du lutin ?\nb) Parle-t-il avant ou après avoir avancé ?\nc) Combien de messages dit-il ?\nd) De combien de pas avance-t-il en tout ?",
          figure: scratch(["quand drapeau vert cliqué", "dire 'Je pars !'", "avancer de 40", "tourner à droite de 90°", "avancer de 10", "dire 'Arrivé !'"]),
          correction:
            "Je lis les blocs dans l'ordre, de haut en bas.\na) Le 1er bloc sous le drapeau est « dire Je pars ! ».\nb) Il dit « Je pars ! » avant d'avancer.\nIl dit « Arrivé ! » à la fin, après avoir avancé.\nc) Il y a deux blocs « dire » : $2$ messages.\nd) $40 + 10 = 50$ pas.\n⛔ Le piège : croire que « tourner à droite de 90° » fait avancer de $90$ pas.\nRéponse : a) « Je pars ! » ; b) avant, puis après ; c) $2$ ; d) $50$ pas.",
          micros: ["algo_lire_programme", "algo_sequence"],
        },
        {
          enonce: "Le stylo est posé : le lutin dessine en avançant.\nLe programme répète $4$ fois : « avancer de 40 », puis « tourner à gauche de 90° ».\na) Quelle figure trace-t-il ?\nb) Combien mesure un côté ?\nc) Quel est le périmètre de la figure ?",
          figure: ecranSeulement(scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 4 fois", "  avancer de 40", "  tourner à gauche de 90°"])),
          correction:
            "La boucle fait $4$ tours.\nÀ chaque tour : un côté de $40$ pas, puis un quart de tour.\na) $4$ côtés égaux et $4$ angles droits : c'est un carré.\nb) Un côté mesure $40$ pas.\nc) $4 \\times 40 = 160$ pas.\n⭐ Après $4$ quarts de tour, le lutin regarde de nouveau vers la droite.\nRéponse : a) un carré ; b) $40$ pas ; c) $160$ pas.",
          schema: ecranSeulement(lutin([[[0, 0], [40, 0], [40, 40], [0, 40], [0, 0]]], "un carré de côté 40", { cotes: 2 })),
          micros: ["algo_figure"],
        },
        {
          enonce: "Le lutin part en regardant vers la droite.\nProgramme A : avancer de 30 ; tourner à gauche de 90° ; avancer de 20.\nProgramme B : tourner à gauche de 90° ; avancer de 30 ; avancer de 20.\na) Les deux programmes ont-ils les mêmes blocs ?\nb) Où arrive le lutin avec chacun ?",
          correction:
            "a) Oui : deux « avancer » et un « tourner ». Seul l'ordre change.\nb) Programme A : il avance de $30$ vers la droite.\nPuis il tourne et regarde vers le haut. Il monte de $20$.\nIl arrive $30$ pas à droite et $20$ pas plus haut.\nProgramme B : il tourne d'abord. Il regarde vers le haut.\nIl monte de $30$, puis encore de $20$ : $50$ pas plus haut.\n⛔ Le piège : croire que les mêmes blocs mènent au même endroit. L'ordre compte.\nRéponse : A arrive $30$ pas à droite et $20$ plus haut ; B arrive $50$ pas plus haut.",
          schema: lutin([[[0, 0], [30, 0], [30, 20]], [[0, 0], [0, 30], [0, 50]]], "A en bleu, B en orange", { cotes: 2 }),
          micros: ["algo_sequence", "algo_deplacement"],
        },
        {
          enonce: "Un programme répète $5$ fois deux blocs : « avancer de 10 », puis « dire Hop ! ».\na) Combien de fois le lutin dit-il « Hop ! » ?\nb) De combien de pas avance-t-il en tout ?",
          figure: ecranSeulement(scratch(["quand drapeau vert cliqué", "répéter 5 fois", "  avancer de 10", "  dire 'Hop !'"])),
          correction:
            "Les deux blocs sont DANS la boucle.\nIls sont donc exécutés à chaque tour.\na) $5$ tours : le lutin dit « Hop ! » $5$ fois.\nb) $5 \\times 10 = 50$ pas.\n⛔ Le piège : croire que la boucle ne répète que le premier bloc.\nRéponse : a) $5$ fois ; b) $50$ pas.",
          micros: ["algo_repetition", "algo_lire_programme"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur un même programme. Je le suis au brouillon, bloc par bloc.",
      rappel: [
        "Je note à chaque bloc où est le lutin et vers où il regarde.",
        "Un quart de tour, c'est 90°. Un tour complet, c'est 360°.",
        "Pour tracer, le stylo doit être posé AVANT d'avancer.",
      ],
      exercices: [
        {
          enonce: "Le lutin part en regardant vers la droite.\na) Dessine son trajet sur ton cahier.\nb) De combien de pas avance-t-il en tout ?\nc) Où arrive-t-il par rapport à son départ ?",
          figure: scratch(["quand drapeau vert cliqué", "avancer de 60", "tourner à gauche de 90°", "avancer de 30", "tourner à gauche de 90°", "avancer de 60"]),
          correction:
            "a) Il avance de $60$ vers la droite.\nIl tourne à gauche : il regarde vers le haut. Il monte de $30$.\nIl tourne encore à gauche : il regarde vers la gauche. Il revient de $60$.\nb) $60 + 30 + 60 = 150$ pas.\nc) Il est allé $60$ pas à droite, puis revenu de $60$.\nIl est $30$ pas plus haut que son départ.\n⛔ Le piège : oublier que le 2e « tourner » le fait repartir vers la gauche.\nRéponse : b) $150$ pas ; c) $30$ pas au-dessus du départ.",
          schema: ecranSeulement(lutin([[[0, 0], [60, 0], [60, 30], [0, 30]]], "150 pas", { cotes: 3 })),
          micros: ["algo_lire_programme", "algo_deplacement"],
        },
        {
          enonce: "Le stylo est posé.\na) Quelle figure trace ce programme ?\nb) Donne ses deux longueurs.\nc) Calcule son périmètre.\nd) Combien de blocs « avancer » sont exécutés ?",
          figure: scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 2 fois", "  avancer de 80", "  tourner à gauche de 90°", "  avancer de 40", "  tourner à gauche de 90°"]),
          correction:
            "a) Un tour de boucle trace deux côtés : $80$ pas, puis $40$ pas.\nIl y a $2$ tours : $4$ côtés en tout.\nLes côtés d'en face sont égaux et les coins sont droits : c'est un rectangle.\nb) $80$ pas et $40$ pas.\nc) $80 + 40 + 80 + 40 = 240$ pas.\nd) $2$ blocs « avancer » par tour, et $2$ tours : $2 \\times 2 = 4$.\n⛔ Le piège : croire que « répéter 2 fois » trace seulement $2$ côtés.\nRéponse : a) un rectangle ; b) $80$ et $40$ pas ; c) $240$ pas ; d) $4$.",
          schema: ecranSeulement(lutin([[[0, 0], [80, 0], [80, 40], [0, 40], [0, 0]]], "un rectangle de 80 sur 40", { cotes: 2 })),
          micros: ["algo_figure", "algo_repetition"],
        },
        {
          enonce: "Le stylo est posé.\na) Quelle figure trace ce programme ?\nb) De combien de degrés le lutin tourne-t-il en tout ?\nc) Zoé met « tourner à gauche de 60° ». La figure se ferme-t-elle ?",
          figure: scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 3 fois", "  avancer de 60", "  tourner à gauche de 120°"]),
          correction:
            "a) $3$ tours : $3$ côtés de $60$ pas.\nLa figure se referme : c'est un triangle.\nSes $3$ côtés sont égaux : c'est un triangle équilatéral.\nb) $3 \\times 120 = 360$ degrés : un tour complet.\nc) Avec $60°$, le lutin tourne de $3 \\times 60 = 180$ degrés seulement.\nIl ne revient pas au départ : la figure reste ouverte.\n⛔ Le piège : mettre l'angle du triangle, $60°$. Le lutin doit tourner de $120°$.\nRéponse : a) un triangle équilatéral ; b) $360°$ ; c) non.",
          schema: ecranSeulement(lutin([[[0, 0], [60, 0], [30, 51.961524], [0, 0]], [[0, 0], [60, 0], [90, 51.961524], [60, 103.923048]]], "120° en bleu, 60° en orange", { cotes: 1 })),
          micros: ["algo_figure", "algo_defi"],
        },
        {
          enonce: "Nina veut tracer un carré de côté $30$.\nElle écrit : répéter 4 fois « avancer de 30 ».\na) Que trace son programme ?\nb) Quel bloc manque-t-il ? Où faut-il le mettre ?",
          correction:
            "a) Le lutin avance $4$ fois de $30$ pas, sans jamais tourner.\nIl trace un trait droit de $4 \\times 30 = 120$ pas.\nb) Il manque « tourner à gauche de 90° ».\nIl faut le mettre DANS la boucle, après « avancer de 30 ».\nAinsi, le lutin tourne à chaque coin.\n⛔ Le piège : mettre le « tourner » hors de la boucle. Il ne tournerait qu'une fois.\nRéponse : a) un trait de $120$ pas ; b) « tourner à gauche de 90° », dans la boucle.",
          schema: lutin([[[0, 0], [30, 0], [60, 0], [90, 0], [120, 0]], [[0, 0], [30, 0], [30, 30], [0, 30], [0, 0]]], "Nina en bleu, corrigé orange"),
          micros: ["algo_figure", "algo_lire_programme"],
        },
        {
          enonce: "Ces trois blocs sont mélangés.\nRange-les sous « quand drapeau vert cliqué ».\nLe lutin doit tracer un trait, puis dire « Fini ! ».\nPourquoi le stylo doit-il venir avant « avancer » ?",
          figure: scratch(["dire 'Fini !'", "avancer de 50", "stylo en position d'écriture"]),
          correction:
            "Le lutin trace seulement si le stylo est déjà posé.\nDonc « stylo en position d'écriture » vient en premier.\nPuis « avancer de 50 » : le lutin trace le trait.\nEnfin « dire Fini ! » : il parle quand le trait est fini.\n⛔ Le piège : poser le stylo après avoir avancé. Le trait ne serait pas tracé.\nRéponse : stylo, puis avancer de 50, puis dire « Fini ! ».",
          schema: ecranSeulement(scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "avancer de 50", "dire 'Fini !'"], 1)),
          micros: ["algo_sequence"],
        },
        {
          enonce: "Le lutin part du rond vert, en regardant vers la droite.\nUn carreau vaut $10$ pas.\nÉcris un programme pour qu'il fasse ce trajet.",
          figure: lutin([[[0, 0], [40, 0], [40, 30], [70, 30]]], "départ vert, arrivée rouge", { cotes: 3 }),
          correction:
            "Je suis le trajet, trait par trait.\nIl avance de $40$ vers la droite.\nIl doit monter : il tourne à gauche de $90°$. Il avance de $30$.\nIl doit repartir vers la droite : il tourne à droite de $90°$.\nIl avance de $30$.\n⛔ Le piège : tourner encore à gauche. Le lutin repartirait vers la gauche.\nRéponse : le programme ci-dessous, en $5$ blocs.",
          schema: ecranSeulement(scratch(["quand drapeau vert cliqué", "avancer de 40", "tourner à gauche de 90°", "avancer de 30", "tourner à droite de 90°", "avancer de 30"])),
          micros: ["algo_deplacement", "algo_sequence"],
        },
        {
          enonce: "Le lutin part en regardant vers la droite.\na) Combien de marches trace-t-il ?\nb) De combien de pas avance-t-il en tout ?\nc) Où arrive-t-il par rapport à son départ ?\nd) Vers où regarde-t-il à la fin ?",
          figure: scratch(["quand drapeau vert cliqué", "répéter 3 fois", "  avancer de 20", "  tourner à gauche de 90°", "  avancer de 20", "  tourner à droite de 90°"]),
          correction:
            "Un tour de boucle trace une marche.\nIl avance de $20$, tourne vers le haut, monte de $20$.\nPuis il tourne à droite : il regarde de nouveau vers la droite.\na) $3$ tours : $3$ marches.\nb) Un tour : $20 + 20 = 40$ pas. Trois tours : $3 \\times 40 = 120$ pas.\nc) Il va $3 \\times 20 = 60$ pas à droite et $60$ pas plus haut.\nd) Vers la droite, comme au départ.\n⛔ Le piège : oublier le « tourner à droite ». Le lutin continuerait à tourner vers la gauche.\nRéponse : a) $3$ ; b) $120$ pas ; c) $60$ pas à droite et $60$ plus haut ; d) vers la droite.",
          schema: ecranSeulement(lutin([[[0, 0], [20, 0], [20, 20], [40, 20], [40, 40], [60, 40], [60, 60]]], "3 marches, 120 pas", { cotes: 2 })),
          micros: ["algo_repetition", "algo_lire_programme"],
        },
        {
          enonce: "a) Écris un programme avec une boucle qui trace un carré de côté $35$.\nb) Quel nombre faut-il changer pour un carré de périmètre $200$ ?",
          correction:
            "a) Un carré a $4$ côtés égaux et $4$ angles droits.\nJe pose d'abord le stylo.\nPuis je répète $4$ fois : avancer de $35$, tourner à gauche de $90°$.\nb) Un carré de périmètre $200$ a des côtés de $200 \\div 4 = 50$.\nJe change « avancer de 35 » en « avancer de 50 ».\n⛔ Le piège au b) : écrire « avancer de 200 ». C'est le tour complet, pas un côté.\nRéponse : a) le programme ci-dessous ; b) je remplace $35$ par $50$.",
          schema: ecranSeulement(scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 4 fois", "  avancer de 35", "  tourner à gauche de 90°"])),
          micros: ["algo_figure", "algo_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un programme plus long, des questions qui s'enchaînent. Je suis le lutin au brouillon, puis je réponds par une phrase.",
      rappel: [
        "Je compte les blocs EXÉCUTÉS, pas seulement les blocs écrits.",
        "Pour fermer une figure, le lutin tourne de 360° en tout.",
        "Je note où est le lutin après chaque « avancer ».",
      ],
      exercices: [
        {
          titre: "Le robot du potager",
          enonce:
            "Un robot sème des graines dans un potager. Il part en regardant vers la droite.\na) Combien de graines sème-t-il ?\nb) De combien de pas avance-t-il en tout ?\nc) Combien de pas séparent les deux rangées ?\nd) Où finit-il par rapport à son départ ?",
          figure: scratch(["quand drapeau vert cliqué", "répéter 4 fois", "  avancer de 30", "  dire 'Graine !'", "tourner à gauche de 90°", "avancer de 20", "tourner à gauche de 90°", "répéter 4 fois", "  avancer de 30", "  dire 'Graine !'"]),
          correction:
            "a) La première boucle fait $4$ tours. À chaque tour, le robot dit « Graine ! ».\nLa seconde boucle aussi : $4 + 4 = 8$ graines.\nb) Première rangée : $4 \\times 30 = 120$ pas.\nPuis $20$ pas pour changer de rangée.\nSeconde rangée : encore $120$ pas.\n$120 + 20 + 120 = 260$ pas.\nc) Entre les deux « tourner », il avance de $20$ : les rangées sont à $20$ pas.\nd) Après deux quarts de tour à gauche, il revient vers la gauche.\nIl finit $20$ pas au-dessus de son départ.\n⛔ Le piège : compter les blocs « dire » écrits ($2$) au lieu des blocs exécutés ($8$).\nRéponse : a) $8$ ; b) $260$ pas ; c) $20$ pas ; d) $20$ pas au-dessus du départ.",
          schema: ecranSeulement(lutin([[[0, 0], [30, 0], [60, 0], [90, 0], [120, 0], [120, 20], [90, 20], [60, 20], [30, 20], [0, 20]]], "2 rangées de 4 graines")),
          micros: ["algo_repetition", "algo_lire_programme", "algo_defi"],
        },
        {
          titre: "La course d'orientation",
          enonce:
            "Sami court une course d'orientation. Un pas vaut $1$ m. Il part tout droit.\nIl avance de 50, puis tourne à droite de 90°.\nIl avance de 30, puis tourne à droite de 90°.\nIl avance de 50, puis tourne à droite de 90°.\nEnfin, il avance de 30.\na) Quelle figure trace-t-il ?\nb) Quelle distance court-il ?\nc) Réécris le programme avec « répéter 2 fois ».\nd) Il fait $3$ fois ce parcours. Quelle distance court-il ?",
          correction:
            "a) $4$ côtés : $50$, $30$, $50$, $30$. Et trois quarts de tour à droite.\nLes côtés d'en face sont égaux et les coins sont droits : c'est un rectangle.\nb) $50 + 30 + 50 + 30 = 160$ pas, soit $160$ m.\nc) Le groupe « avancer de 50, tourner, avancer de 30, tourner » revient $2$ fois.\nRépéter 2 fois : avancer de 50, tourner à droite de 90°, avancer de 30, tourner à droite de 90°.\nd) $3 \\times 160 = 480$ m.\n⭐ La boucle ajoute un dernier quart de tour : Sami regarde de nouveau devant lui.\nRéponse : a) un rectangle ; b) $160$ m ; d) $480$ m.",
          schema: ecranSeulement(lutin([[[0, 0], [50, 0], [50, -30], [0, -30], [0, 0]]], "un rectangle de 50 sur 30", { cotes: 2 })),
          micros: ["algo_figure", "algo_repetition", "algo_defi"],
        },
        {
          titre: "Le nid d'abeilles",
          enonce:
            "Une alvéole de ruche a $6$ côtés égaux.\nPour la tracer, le lutin répète $6$ fois : avancer de 30, puis tourner à gauche.\na) De combien de degrés doit-il tourner ?\nb) Quel est le périmètre de l'alvéole ?\nc) Avec « tourner à gauche de 72° », combien de tours faut-il pour fermer la figure ?",
          correction:
            "Pour fermer une figure, le lutin fait un tour complet : $360°$ en tout.\na) Il tourne $6$ fois : $360 \\div 6 = 60$. Il tourne de $60°$.\nb) $6 \\times 30 = 180$ pas.\nc) $360 \\div 72 = 5$ : il faut $5$ tours. La figure a $5$ côtés.\n⛔ Le piège : croire que l'angle est toujours $90°$. C'est vrai pour le carré et le rectangle.\nRéponse : a) $60°$ ; b) $180$ pas ; c) $5$ tours.",
          schema: ecranSeulement(lutin([[[0, 0], [30, 0], [45, 25.980762], [30, 51.961524], [0, 51.961524], [-15, 25.980762], [0, 0]]], "6 côtés de 30 pas")),
          micros: ["algo_figure", "algo_defi"],
        },
        {
          titre: "La chasse au trésor",
          enonce:
            "Le lutin cherche un trésor. Il part en regardant vers la droite.\nLe trésor est $40$ pas à droite et $40$ pas plus haut que le départ.\na) Dessine le trajet du lutin.\nb) De combien de pas avance-t-il en tout ?\nc) Trouve-t-il le trésor ?\nd) Combien de blocs « avancer » sont exécutés ?",
          figure: scratch(["quand drapeau vert cliqué", "avancer de 30", "tourner à gauche de 90°", "répéter 2 fois", "  avancer de 20", "tourner à droite de 90°", "avancer de 10", "dire 'Trésor !'"]),
          correction:
            "a) Il avance de $30$ vers la droite. Il tourne à gauche : il regarde vers le haut.\nLa boucle le fait monter $2$ fois de $20$ : $40$ pas.\nIl tourne à droite et avance de $10$ vers la droite.\nb) $30 + 20 + 20 + 10 = 80$ pas.\nc) Il est allé $30 + 10 = 40$ pas à droite et $40$ pas plus haut.\nC'est la place du trésor : il le trouve.\nd) $1$ bloc avant la boucle, $2$ dans la boucle, $1$ après : $4$.\n⛔ Le piège au d) : compter les blocs écrits ($3$) au lieu des blocs exécutés.\nRéponse : b) $80$ pas ; c) oui ; d) $4$.",
          schema: ecranSeulement(lutin([[[0, 0], [30, 0], [30, 20], [30, 40], [40, 40]]], "80 pas, trésor en rouge", { cotes: 4 })),
          micros: ["algo_lire_programme", "algo_deplacement", "algo_defi"],
        },
      ],
    },
  ],
};
