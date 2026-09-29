// ─── Fiche d'exercices : algorithmique et programmation (5e) — 20 exercices corrigés ─
//
// Feuille du 29/09/2026 (lot de 5e, forme de la feuille étalon
// `maths-5e-relatif-nombre.tsx`). Alignée sur la fiche de cours
// `lib/fiches/maths-5e-algorithmique.tsx` (« Algorithmique et programmation »)
// et sur la banque `lib/tutor-v4/questionBank/5e/maths/algorithmique.bank.ts`,
// partie algo_programmation : LIRE un programme — l'ordre des blocs, les
// entrées et les sorties, la valeur d'une expression, prévoir ce que dira le
// lutin, et des défis de lecture. (L'ÉCRIRE, c'est la notion algo_construire,
// feuille `maths-5e-algo-construire.tsx`.)
//
// ⛔ LIMITES DE LA 5e, lues dans la banque : des blocs Scratch, « mettre »,
// « ajouter », « demander », « dire », « répéter n fois », un « si … alors »
// avec une condition SIMPLE (>, <). Pas de « sinon » ici, pas de « répéter
// jusqu'à », pas de « et » / « ou » (4e et 3e), aucun nombre négatif à calculer.
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni x = 5 et 3x + 2, ni le
// score 15 et « Bravo », ni « répéter 4 fois avancer de 10 », ni le carré de
// côté 100, ni x = 4 et 2x + 3, ni 5 × 20) ; ni ceux des feuilles de 4e et de 3e
// (billes, échange, gourde, Fahrenheit, Ligue 1, glacier, podomètre…).
//
// ⭐ C'EST DU SCRATCH, PAS DU PYTHON : les programmes sont DESSINÉS en blocs de
// couleur (`scratch()`, SVG local) — jaune pour le drapeau, bleu pour le
// mouvement, violet pour « dire », bleu clair pour « demander », orange pour les
// variables, or pour les boucles et les tests, qui EMBRASSENT les blocs
// qu'ils contiennent. Le texte entre apostrophes s'affiche dans un trou blanc,
// comme dans Scratch. Les chemins du lutin sont tracés à l'échelle sur un
// quadrillage (`lutin()`), les variables suivies dans une trace (`trace()`).
// ⛔ Lignes de blocs courtes (300 de large) ; texte nu, signe moins « − ».
//
// Les pièges nommés : l'ordre des blocs échangé (1, 5, 14), la variable
// calculée prise pour une entrée (2, 9), les priorités (3, 4, 11, 13), défaire
// un calcul dans le mauvais ordre (7), « t / d » pour « d / t » (6), la boucle
// lue une seule fois (8, 16), le quart de tour qui change tous les pas suivants
// (10, 19), l'égalité au seuil avec > (12, 17), le bloc sous le « si » cru dans
// le « si » (12), la question posée une seule fois hors de la boucle (15),
// compter des jours au lieu d'additionner des millimètres (17), la valeur de
// DÉPART gardée en tête (18), un résultat final qui ne dépend pas du nombre
// choisi (20).
//
// Aucun fait réel à vérifier : la cycliste à 15 km/h, le train, la tablette,
// la recette, le site de carnets, le relevé de pluie, la tondeuse sont des
// MODÈLES, dits comme tels dans les énoncés. Un pliage double l'épaisseur
// d'une feuille : c'est la définition du pliage en deux.
//
// ⭐ LES DESSINS : 12 programmes en blocs dans les énoncés et 2 trajets du
// lutin (10, 19) sont imprimés : 14. Les traces qui redisent le corrigé sont
// `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je suis la variable »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-algo-programmation.mjs`
// EXÉCUTE chaque programme dessiné avec un petit interprète de blocs, relit les
// traces et les trajets du lutin, et les compare à l'exécution.
//
// Micro-compétences : algo_sequence (1, 5, 10, 12, 14, 18, 19),
// algo_entree_sortie (2, 9, 11, 15, 17), algo_expression_valeur (3, 4, 6, 11,
// 13, 18, 20), algo_prevoir_expression (4, 7, 9, 12, 13, 16, 17, 19, 20),
// algo_defi (8, 10, 15-20). 5/5.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, trace } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Deux dessins l'un sous l'autre. */
const pile = (...dessins: ReactNode[]) => (
  <div className="space-y-2">
    {dessins.map((d, i) => (
      <div key={i}>{d}</div>
    ))}
  </div>
);

/* ── Les blocs Scratch, dessinés ─────────────────────────────────────────── */

type Bloc = { t: string; i: number; corps?: Bloc[]; sinon?: Bloc[] };

/** Les lignes indentées (2 espaces par niveau) → un arbre de blocs. */
const lireBlocs = (lignes: string[]): Bloc[] => {
  const L = lignes.map((t, i) => ({ niv: (t.match(/^ */)?.[0].length ?? 0) / 2, t: t.trim(), i }));
  let k = 0;
  const niveau = (niv: number): Bloc[] => {
    const out: Bloc[] = [];
    while (k < L.length && L[k].niv === niv) {
      const b: Bloc = { t: L[k].t, i: L[k].i };
      k++;
      if (/^(répéter|si )/.test(b.t)) {
        b.corps = niveau(niv + 1);
        if (/^si /.test(b.t) && k < L.length && L[k].niv === niv && L[k].t === "sinon") {
          k++;
          b.sinon = niveau(niv + 1);
        }
      }
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
  capteur: ["#5CB1D6", "#ffffff"],
  variable: ["#FF8C1A", "#ffffff"],
  controle: ["#FFAB19", "#1e293b"],
  stylo: ["#0FBD8C", "#ffffff"],
};
const famille = (t: string) =>
  /^quand /.test(t)
    ? "evenement"
    : /^(avancer|tourner)/.test(t)
      ? "mouvement"
      : /^dire /.test(t)
        ? "apparence"
        : /^demander /.test(t)
          ? "capteur"
          : /^(mettre|ajouter) /.test(t)
            ? "variable"
            : /^stylo/.test(t)
              ? "stylo"
              : "controle";

type Morceau = { trou: boolean; s: string };
/** Le texte d'un bloc, coupé en morceaux : ce qui est entre apostrophes va dans un trou blanc. */
const morceaux = (t: string): Morceau[] =>
  (/^demander /.test(t) ? `${t} et attendre` : t)
    .split(/('[^']*')/)
    .map((m) => m.trim())
    .filter(Boolean)
    .map((m) => (m.startsWith("'") ? { trou: true, s: m.slice(1, -1) } : { trou: false, s: m }));
const largeurMorceau = (m: Morceau) => (m.trou ? m.s.length * 7.6 + 18 : m.s.length * 8);
const largeurBloc = (t: string) => Math.max(56, 20 + morceaux(t).reduce((w, m, j) => w + largeurMorceau(m) + (j ? 6 : 0), 0));

/**
 * Un PROGRAMME SCRATCH dessiné : une ligne par bloc, deux espaces d'indentation
 * par niveau (le contenu d'un « répéter » ou d'un « si »). Les blocs de contrôle
 * embrassent leur contenu, comme dans Scratch. `enCouleur` : le numéro de la
 * ligne à entourer de rouge. ⭐ Le script de recalcul relit ces lignes et les
 * EXÉCUTE : les écrire en clair.
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
        let bas = y2;
        if (b.sinon) {
          barre("sinon", x, y2, wc, 24, fond, encre, false);
          bas = Math.max(pose(b.sinon, x + BRAS, y2 + 24 + JEU), y2 + 24 + 14);
          bras(x, y2 + 23, bas + 1, fond);
        }
        barre("", x, bas, wc, PIED, fond, encre, false);
        y = bas + PIED + JEU;
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
 * écrit la longueur (à droite du sens de la marche). ⭐ Le script de recalcul
 * relit ces sommets et les compare à l'exécution du programme.
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
  const Y = (y: number) => 24 + (y1 - y) * k;
  const H = Y(y0) + 50;
  const pas = opts.grille ?? 10;
  const gx: number[] = [];
  for (let v = Math.ceil(x0 / pas) * pas; v <= x1 + 1e-9; v += pas) gx.push(v);
  const gy: number[] = [];
  for (let v = Math.ceil(y0 / pas) * pas; v <= y1 + 1e-9; v += pas) gy.push(v);
  const premier = chemins[0] ?? [];
  // ⛔ MESURÉ LE 29/09 (ex. 10) : deux cotes « 10 » de part et d'autre d'un coin se
  // chevauchaient. Une cote qui en touche une déjà posée passe de l'autre côté de son segment.
  const posees: { x: number; y: number; t: string }[] = [];
  const touche = (a: { x: number; y: number; t: string }) =>
    posees.some((b) => Math.abs(a.x - b.x) < ((a.t.length + b.t.length) * 9) / 2 + 2 && Math.abs(a.y - b.y) < 16);
  const cotes = premier.slice(1, (opts.cotes ?? 0) + 1).map((q, j) => {
    const p = premier[j];
    const [dx, dy] = [q[0] - p[0], q[1] - p[1]];
    const L = Math.hypot(dx, dy) || 1;
    const [nx, ny] = [dy / L, -dx / L];
    const t = String(Math.round(L * 100) / 100).replace(".", ",");
    const place = (s: number) => ({ x: Math.min(Math.max(X((p[0] + q[0]) / 2) + s * nx * 15, 16), W - 16), y: Y((p[1] + q[1]) / 2) - s * ny * 15 + 5, t });
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

export const exercicesAlgoProgrammation5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "algo-programmation",
  titre: "Algorithmique et programmation",
  accroche:
    "Vingt exercices en blocs Scratch, du bloc seul au petit problème : lire les blocs dans l'ordre, repérer les entrées et les sorties, calculer la valeur d'une expression, prévoir ce que dira le lutin avant de lancer le programme. Des fléchettes, un trajet à vélo, une pâte à crêpes, un robot aspirateur, une station météo, un cadenas, une tondeuse robot, un tour de magie. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le tableau de suivi des variables et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/algo-programmation", titre: "Algorithmique et programmation" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un programme court. Je le suis bloc par bloc, en notant la valeur de chaque variable.",
      rappel: [
        "Un programme s'exécute dans l'ordre, de haut en bas, un bloc après l'autre.",
        "Une variable est une case qui porte un nom. « mettre x à 5 » remplace ce qu'elle contient ; « ajouter 5 à x » part de l'ancienne valeur et lui ajoute $5$.",
        "L'entrée, c'est ce que le programme reçoit : la réponse tapée après un bloc « demander ». La sortie, c'est ce qu'il montre : le bloc « dire ».",
        "Dans Scratch, * veut dire × et / veut dire ÷. La machine respecte les priorités, comme sur une copie.",
      ],
      exercices: [
        {
          enonce:
            "Dans un jeu de fléchettes sur tablette, un bonus final double le score.\na) Que dit le lutin à la fin ?\nb) Un élève échange les blocs « ajouter 6 à score » et « mettre score à score * 2 ». Que dit alors le lutin ?\nc) L'ordre des blocs compte-t-il ?",
          figure: scratch(["quand drapeau vert cliqué", "mettre score à 4", "ajouter 6 à score", "mettre score à score * 2", "dire score"]),
          correction:
            "Je lis les blocs de haut en bas, et je note la valeur de score après chaque bloc.\na) score vaut $4$, puis $4 + 6 = 10$, puis $10 \\times 2 = 20$. Le lutin dit $20$.\nb) Avec les deux blocs échangés : score vaut $4$, puis $4 \\times 2 = 8$, puis $8 + 6 = 14$. Le lutin dit $14$.\nc) Mêmes blocs, autre ordre, autre résultat : l'ordre compte.\n⛔ Le piège : croire qu'on peut ranger les blocs comme on veut. La machine les exécute dans l'ordre, de haut en bas, comme les étapes d'une recette.\nRéponse : a) $20$ ; b) $14$ ; c) oui, l'ordre compte.",
          schema: ecranSeulement(trace(["après le bloc", "score", "blocs échangés"], [["1er", 4, 4], ["2e", 10, 8], ["3e", 20, 14]])),
          micros: ["algo_sequence"],
        },
        {
          enonce:
            "Une cycliste roule à $15$ km/h : elle met $4$ minutes pour faire $1$ km (vitesse choisie pour l'exercice). Ce programme calcule la durée d'un trajet, quand on tape la distance en km.\na) Quelle est l'entrée du programme ? Quelle est sa sortie ?\nb) On répond $12$. Que dit le lutin ?\nc) Le lutin a dit $30$. Quelle distance avait-on tapée ?",
          figure: scratch(["quand drapeau vert cliqué", "demander 'Distance ?'", "mettre km à réponse", "mettre minutes à km * 4", "dire minutes"]),
          correction:
            "a) L'entrée, c'est ce que le programme REÇOIT : la distance tapée au clavier, en km. Elle arrive dans « réponse » grâce au bloc « demander ».\nLa sortie, c'est ce qu'il MONTRE : le nombre que dit le lutin, la durée du trajet en minutes.\nb) km vaut $12$, puis minutes vaut $12 \\times 4 = 48$. Le lutin dit $48$ : $48$ minutes de vélo.\nc) Je remonte le programme : le lutin dit $4$ fois la distance. La distance est donc $30 \\div 4 = 7{,}5$.\n⭐ Contrôle : $7{,}5 \\times 4 = 30$.\n⛔ Le piège : prendre la variable minutes pour une entrée. Elle est calculée PAR le programme : personne ne la tape.\nRéponse : b) $48$ ; c) on avait tapé $7{,}5$ km.",
          schema: ecranSeulement(trace(["distance tapée (km)", "le lutin dit (min)"], [[12, 48], ["7,5", 30]])),
          micros: ["algo_entree_sortie"],
        },
        {
          enonce:
            "Dans un programme, la variable x vaut $7$. Quelle valeur donne chaque bloc opérateur ?\na) « x * 4 − 9 »\nb) « (x + 3) * 2 »\nc) « x * x − 10 »\nd) « 3 * x + x »",
          correction:
            "Je remplace x par $7$, puis je calcule comme en maths : d'abord les parenthèses, puis * et /, puis + et −.\na) $7 \\times 4 - 9 = 28 - 9 = 19$.\nb) $(7 + 3) \\times 2 = 10 \\times 2 = 20$.\nc) $7 \\times 7 - 10 = 49 - 10 = 39$.\nd) $3 \\times 7 + 7 = 21 + 7 = 28$.\n⛔ Le piège du a) : calculer $4 - 9$ d'abord. La machine respecte les priorités : la multiplication passe avant la soustraction.\n⭐ Dans Scratch, l'étoile * est le signe ×.\nRéponse : a) $19$ ; b) $20$ ; c) $39$ ; d) $28$.",
          schema: ecranSeulement(trace(["bloc", "avec x = 7"], [["x * 4 − 9", 19], ["(x + 3) * 2", 20], ["x * x − 10", 39], ["3 * x + x", 28]])),
          micros: ["algo_expression_valeur"],
        },
        {
          enonce:
            "a) Prévois ce que dit le lutin si on répond $2$, puis si on répond $10$.\nb) Écris en une seule ligne le calcul fait avec $2$.\nc) Léa écrit $2 + 5 \\times 3$. Que trouve-t-elle ? Pourquoi est-ce faux ?",
          figure: scratch(["quand drapeau vert cliqué", "demander 'Nombre ?'", "mettre n à réponse", "mettre n à n + 5", "mettre n à n * 3", "dire n"]),
          correction:
            "Je suis la variable n, bloc après bloc. Chaque calcul s'applique au résultat du bloc d'avant.\na) Avec $2$ : n vaut $2$, puis $2 + 5 = 7$, puis $7 \\times 3 = 21$. Le lutin dit $21$.\nAvec $10$ : $10 + 5 = 15$, puis $15 \\times 3 = 45$. Le lutin dit $45$.\nb) Le $+ 5$ est fait AVANT le $\\times 3$ : en une ligne, il faut des parenthèses. $(2 + 5) \\times 3 = 21$.\nc) Léa trouve $2 + 5 \\times 3 = 2 + 15 = 17$. Sans parenthèses, la multiplication passe d'abord : ce n'est plus l'ordre du programme.\n⛔ Le piège : écrire le calcul en une ligne sans parenthèses. Le programme, lui, fait les blocs dans l'ordre.\nRéponse : a) $21$ et $45$ ; b) $(2 + 5) \\times 3$ ; c) $17$, c'est faux.",
          schema: ecranSeulement(trace(["réponse", "n + 5", "n * 3"], [[2, 7, 21], [10, 15, 45]])),
          micros: ["algo_prevoir_expression", "algo_expression_valeur"],
        },
        {
          enonce:
            "Le lutin part en regardant vers la droite. « tourner à gauche de 90° » lui fait faire un quart de tour vers la gauche.\nProgramme A : avancer de 40 ; tourner à gauche de 90° ; avancer de 30.\nProgramme B : tourner à gauche de 90° ; avancer de 40 ; avancer de 30.\na) Les deux programmes ont-ils les mêmes blocs ?\nb) Où arrive le lutin avec chaque programme ?\nc) Combien de pas fait-il en tout, à chaque fois ?",
          correction:
            "a) Oui : les mêmes trois blocs, deux « avancer » et un « tourner ». Seul l'ordre change.\nb) Programme A : le lutin avance de $40$ pas vers la droite, puis fait un quart de tour à gauche : il regarde vers le haut. Il avance de $30$ pas vers le haut.\nIl arrive $40$ pas à droite et $30$ pas plus haut que son départ.\nProgramme B : il tourne d'abord, et regarde vers le haut. Puis il avance de $40$, puis de $30$, toujours vers le haut.\nIl arrive $70$ pas plus haut, et pas du tout à droite.\nc) Dans les deux cas, il avance de $40 + 30 = 70$ pas.\n⛔ Le piège : croire que les mêmes blocs mènent au même endroit. Tourner AVANT d'avancer change la direction de tous les pas qui suivent.\nRéponse : b) A : $40$ pas à droite et $30$ en haut ; B : $70$ pas en haut ; c) $70$ pas à chaque fois.",
          schema: ecranSeulement(lutin([[[0, 0], [40, 0], [40, 30]], [[0, 0], [0, 40], [0, 70]]], "A en bleu, B en orange", { cotes: 2 })),
          micros: ["algo_sequence"],
        },
        {
          enonce:
            "Un train parcourt $240$ km en $3$ heures. Dans un programme, la variable d vaut $240$ et la variable t vaut $3$.\na) Que vaut le bloc « d / t » ? Que représente ce nombre ?\nb) Que vaut « t / d » ? Est-ce la vitesse du train ?\nc) On range « d / t » dans une variable v. Que vaut « d + v * 2 » ? Que représente ce nombre ?",
          correction:
            "Je remplace chaque variable par sa valeur : d par $240$, t par $3$.\na) $240 \\div 3 = 80$. Le train fait $80$ km en une heure : c'est sa vitesse, $80$ km/h.\nb) $3 \\div 240 = 0{,}0125$. Ce n'est pas la vitesse : c'est le temps, en heures, pour faire un seul kilomètre.\nc) v vaut $80$. La multiplication passe d'abord : $240 + 80 \\times 2 = 240 + 160 = 400$. C'est la distance parcourue si le train roule encore $2$ heures : $400$ km en tout.\n⛔ Le piège du b) : croire que « d / t » et « t / d » donnent la même chose. Dans une division, l'ordre compte : $240 \\div 3$ n'est pas $3 \\div 240$.\nRéponse : a) $80$ km/h ; b) $0{,}0125$, ce n'est pas la vitesse ; c) $400$ km.",
          schema: ecranSeulement(trace(["bloc", "valeur"], [["d / t", 80], ["t / d", "0,0125"], ["d + v * 2", 400]])),
          micros: ["algo_expression_valeur"],
        },
        {
          enonce:
            "Un programme range un nombre dans x, puis le lutin dit la valeur de « x * 10 + 1 ». Réponds sans lancer le programme.\na) Que dit le lutin si x vaut $4$ ?\nb) Si x augmente de $1$, de combien augmente ce que dit le lutin ?\nc) Le lutin a dit $91$. Que valait x ?",
          correction:
            "a) Je remplace x par $4$ : $4 \\times 10 + 1 = 40 + 1 = 41$. Le lutin dit $41$.\nb) Si x passe de $4$ à $5$ : $5 \\times 10 + 1 = 51$. Le résultat augmente de $10$ : x est multiplié par $10$, donc chaque unité de plus en donne $10$ de plus.\nc) Je remonte. Le lutin a dit $91$ : j'enlève d'abord le $1$ ajouté en dernier, il reste $90$. Puis je divise par $10$ : $9$.\n⭐ Contrôle : $9 \\times 10 + 1 = 91$.\n⛔ Le piège du c) : défaire les calculs dans le même ordre, en divisant $91$ par $10$ d'abord. Pour remonter, on défait à l'ENVERS : le dernier calcul en premier.\nRéponse : a) $41$ ; b) de $10$ ; c) x valait $9$.",
          schema: ecranSeulement(trace(["x", "x * 10 + 1"], [[4, 41], [5, 51], [9, 91]])),
          micros: ["algo_prevoir_expression"],
        },
        {
          enonce:
            "Une tablette chargée à $100$ % perd $15$ % de batterie par heure de vidéo (modèle choisi pour l'exercice). Le programme range $100$ dans la variable batterie, puis répète $3$ fois le bloc « mettre batterie à batterie − 15 », puis dit batterie.\na) Que dit le lutin ?\nb) Combien de fois le bloc placé dans la boucle est-il exécuté ?\nc) Combien de tours de boucle faudrait-il pour que le lutin dise $10$ ?",
          correction:
            "a) La boucle refait $3$ fois le bloc qu'elle contient. Je suis la variable à chaque tour.\nTour 1 : $100 - 15 = 85$. Tour 2 : $85 - 15 = 70$. Tour 3 : $70 - 15 = 55$.\nLe lutin dit $55$ : il reste $55$ % de batterie après $3$ heures.\nb) $3$ fois : une fois par tour de boucle.\nc) La batterie doit perdre $100 - 10 = 90$ %, par paquets de $15$ : $90 \\div 15 = 6$. Il faudrait $6$ tours.\n⛔ Le piège : lire le bloc de la boucle une seule fois et répondre $85$. « répéter 3 fois » refait TOUT ce qu'il contient, trois fois.\nRéponse : a) $55$ ; b) $3$ fois ; c) $6$ tours.",
          schema: ecranSeulement(
            pile(
              scratch(["quand drapeau vert cliqué", "mettre batterie à 100", "répéter 3 fois", "  mettre batterie à batterie − 15", "dire batterie"]),
              trace(["heure", "batterie (%)"], [["départ", 100], [1, 85], [2, 70], [3, 55]]),
            ),
          ),
          micros: ["algo_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur un même programme. Je le fais tourner au brouillon avant de répondre.",
      rappel: [
        "Pour suivre un programme, je fais un tableau : une colonne par variable, une ligne par bloc ou par tour de boucle.",
        "Un bloc utilise la valeur qu'a la variable AU MOMENT où il s'exécute, pas celle du départ.",
        "Pour remonter de la sortie à l'entrée, je défais les calculs à l'envers : le dernier en premier.",
      ],
      exercices: [
        {
          enonce:
            "Pour une pâte à crêpes, on compte $60$ g de farine par personne (recette choisie pour l'exercice).\na) Quelle est l'entrée du programme ? Quelle est sa sortie ?\nb) Que dit le lutin pour $4$ personnes ? Pour $9$ personnes ?\nc) Le lutin a dit $420$. Pour combien de personnes est la recette ?",
          figure: scratch(["quand drapeau vert cliqué", "demander 'Personnes ?'", "mettre farine à réponse * 60", "dire farine"]),
          correction:
            "a) L'entrée est le nombre de personnes, tapé au clavier en réponse à la question. La sortie est ce que dit le lutin : la masse de farine, en grammes.\nb) Pour $4$ personnes : $4 \\times 60 = 240$. Le lutin dit $240$.\nPour $9$ personnes : $9 \\times 60 = 540$. Le lutin dit $540$.\nc) Je remonte : le lutin dit $60$ fois le nombre de personnes. $420 \\div 60 = 7$.\n⭐ Contrôle : $7 \\times 60 = 420$.\n⛔ Le piège : répondre « farine » pour l'entrée. farine est une variable calculée par le programme : c'est la sortie qu'il prépare, pas ce qu'on lui donne.\nRéponse : b) $240$ g et $540$ g ; c) pour $7$ personnes.",
          schema: ecranSeulement(trace(["personnes", "farine (g)"], [[4, 240], [9, 540], [7, 420]])),
          micros: ["algo_entree_sortie", "algo_prevoir_expression"],
        },
        {
          enonce:
            "Un robot aspirateur part d'un coin de la pièce en regardant vers la droite. Un pas vaut $10$ cm. Il exécute dans l'ordre : avancer de 30 ; tourner à gauche de 90° ; avancer de 20 ; tourner à gauche de 90° ; avancer de 10 ; tourner à droite de 90° ; avancer de 10.\na) Dessine son trajet sur du papier quadrillé, un carreau pour $10$ pas.\nb) Quelle distance a-t-il parcourue, en pas, puis en mètres ?\nc) À la fin, est-il plus à droite ou plus à gauche que son départ ? De combien de pas ?\nd) Vers où regarde-t-il à la fin ?",
          correction:
            "a) Je suis le robot bloc par bloc, en notant vers où il regarde.\nIl avance de $30$ vers la droite. Un quart de tour à gauche : il regarde vers le haut. Il avance de $20$.\nEncore un quart de tour à gauche : il regarde vers la gauche. Il avance de $10$.\nUn quart de tour à DROITE : il regarde de nouveau vers le haut. Il avance de $10$.\nb) $30 + 20 + 10 + 10 = 70$ pas. Un pas vaut $10$ cm : $70 \\times 10 = 700$ cm, soit $7$ m.\nc) Il est allé $30$ pas vers la droite, puis il est revenu de $10$ pas vers la gauche : $30 - 10 = 20$. Il est $20$ pas plus à droite que son départ.\nd) À la fin, il regarde vers le haut.\n⛔ Le piège : oublier qu'un « tourner » change la direction de TOUS les pas suivants. Après deux quarts de tour à gauche, « avancer » le fait revenir vers la gauche.\nRéponse : b) $70$ pas, soit $7$ m ; c) $20$ pas plus à droite ; d) vers le haut.",
          schema: lutin([[[0, 0], [30, 0], [30, 20], [20, 20], [20, 30]]], "70 pas, arrivée en rouge", { cotes: 4 }),
          micros: ["algo_sequence", "algo_defi"],
        },
        {
          enonce:
            "Un site vend des carnets. Ce programme calcule le prix d'une commande, avec $3$ € de frais d'envoi (prix choisis pour l'exercice).\na) Combien ce programme a-t-il d'entrées ? De sorties ?\nb) On tape $5$ (le prix d'un carnet), puis $4$ (la quantité). Que dit le lutin ?\nc) Un élève a écrit « mettre total à p * (q + 3) ». Que dirait son programme ? Pourquoi est-ce faux ?",
          figure: scratch(["quand drapeau vert cliqué", "demander 'Prix ?'", "mettre p à réponse", "demander 'Quantité ?'", "mettre q à réponse", "mettre total à p * q + 3", "dire total"]),
          correction:
            "a) Il y a deux blocs « demander » : deux entrées, le prix d'un carnet et la quantité. Il y a un seul bloc « dire » : une sortie, le prix à payer.\nb) p vaut $5$ et q vaut $4$. La machine multiplie d'abord : $5 \\times 4 = 20$, puis $20 + 3 = 23$.\nLe lutin dit $23$ : on paie $23$ €.\nc) Avec les parenthèses : $5 \\times (4 + 3) = 5 \\times 7 = 35$.\nSon programme ferait payer les $3$ € de frais comme $3$ carnets de plus, à $5$ € chacun.\n⛔ Le piège : les parenthèses. « p * (q + 3) » multiplie AUSSI les frais d'envoi par le prix d'un carnet.\nRéponse : a) deux entrées, une sortie ; b) $23$ ; c) $35$, c'est faux.",
          schema: ecranSeulement(trace(["p et q", "p * q + 3", "p * (q + 3)"], [["5 et 4", 23, 35]])),
          micros: ["algo_entree_sortie", "algo_expression_valeur"],
        },
        {
          enonce:
            "Une appli météo donne des conseils en été. On tape la température du jour, en degrés.\nCombien de messages dit le lutin, et lesquels, si on répond $25$ ? $30$ ? $34$ ?",
          figure: scratch(["quand drapeau vert cliqué", "demander 'Degrés ?'", "dire 'Bonjour'", "si réponse > 30 alors", "  dire 'Bois souvent'", "dire 'Bonne journée'"]),
          correction:
            "Je lis les blocs dans l'ordre. « Bonjour » et « Bonne journée » sont EN DEHORS du « si » : ils sont dits à chaque fois. « Bois souvent » n'est dit que si la condition est vraie.\nAvec $25$ : $25 > 30$ est faux. Le lutin dit « Bonjour » puis « Bonne journée » : $2$ messages.\nAvec $30$ : $30 > 30$ est faux, car $30$ n'est pas STRICTEMENT plus grand que $30$. Encore $2$ messages.\nAvec $34$ : $34 > 30$ est vrai. Le lutin dit « Bonjour », « Bois souvent », puis « Bonne journée » : $3$ messages.\n⛔ Le piège : le $30$ pile. Avec « > », la valeur du seuil ne déclenche pas le conseil.\n⚠️ Autre piège : croire que « Bonne journée » n'est dit que si la condition est fausse. Il est SOUS le « si », pas dedans : il est dit à chaque fois.\nRéponse : $2$, $2$ et $3$ messages.",
          schema: ecranSeulement(trace(["degrés", "réponse > 30", "messages"], [[25, "faux", 2], [30, "faux", 2], [34, "vrai", 3]])),
          micros: ["algo_prevoir_expression", "algo_sequence"],
        },
        {
          enonce:
            "Quatre programmes rangent un nombre dans x, puis le lutin dit la valeur d'un bloc.\nA : « x * 2 + x » ; B : « x * 3 » ; C : « x + 2 * x » ; D : « (x + 2) * x ».\na) Que dit chaque programme quand x vaut $4$ ? Quand x vaut $10$ ?\nb) Lesquels disent toujours la même chose ? Explique sans essayer d'autres nombres.",
          correction:
            "a) Je remplace x par $4$ dans chaque bloc, en respectant les priorités.\nA : $4 \\times 2 + 4 = 8 + 4 = 12$. B : $4 \\times 3 = 12$. C : $4 + 2 \\times 4 = 4 + 8 = 12$. D : $(4 + 2) \\times 4 = 6 \\times 4 = 24$.\nAvec $10$ : A dit $30$, B dit $30$, C dit $30$ et D dit $120$.\nb) A prend $2$ fois x, puis encore une fois x : cela fait $3$ fois x. C prend x, puis $2$ fois x : encore $3$ fois x. C'est exactement ce que calcule B.\nD, lui, multiplie x par x + 2, un nombre qui change avec x : avec $4$ et avec $10$, il ne dit pas $3$ fois x.\n⭐ Avec x égal à $1$, D dit $(1 + 2) \\times 1 = 3$, comme les autres ! Un essai qui marche ne prouve rien : il faut une explication.\n⛔ Le piège : lire C de gauche à droite, comme $(4 + 2) \\times 4$. Sans parenthèses, la multiplication passe d'abord.\nRéponse : A, B et C disent toujours la même chose ; D non.",
          schema: ecranSeulement(trace(["x", "A, B et C", "D"], [[4, 12, 24], [10, 30, 120], [1, 3, 3]])),
          micros: ["algo_prevoir_expression", "algo_expression_valeur"],
        },
        {
          enonce:
            "Ces quatre blocs doivent faire dire au lutin le périmètre d'un terrain rectangulaire de $8$ m sur $5$ m. Ils ont été mélangés.\na) Remets-les dans le bon ordre, sous « quand drapeau vert cliqué ».\nb) Que dit alors le lutin ?\nc) Dans ton programme rangé, peut-on échanger les deux premiers blocs ?",
          figure: scratch(["dire p", "mettre long à 8", "mettre p à 2 * (long + larg)", "mettre larg à 5"]),
          correction:
            "a) Un bloc ne peut se servir d'une variable que si elle a déjà reçu sa valeur. Je range donc d'abord les deux mesures, puis le calcul, puis la sortie.\nL'ordre : « mettre long à 8 », « mettre larg à 5 », « mettre p à 2 * (long + larg) », « dire p ».\nb) p vaut $2 \\times (8 + 5) = 2 \\times 13 = 26$. Le lutin dit $26$ : le périmètre est $26$ m.\nc) Oui : les deux premiers blocs rangent des valeurs dans deux cases différentes, et l'un ne se sert pas de l'autre. Le lutin dit encore $26$.\n⛔ Le piège : laisser « dire p » en premier, parce qu'il est en haut du tas. Le lutin parlerait avant que p soit calculé.\nRéponse : b) $26$ ; c) oui.",
          schema: ecranSeulement(scratch(["quand drapeau vert cliqué", "mettre long à 8", "mettre larg à 5", "mettre p à 2 * (long + larg)", "dire p"], 3)),
          micros: ["algo_sequence"],
        },
        {
          enonce:
            "Sacha a déjà $20$ € dans sa tirelire. Chaque semaine, pendant $4$ semaines, il y met la même somme.\na) Combien de fois le lutin pose-t-il sa question ?\nb) On répond $15$. Que dit le lutin ?\nc) Le lutin a dit $60$. Qu'avait-on répondu ?",
          figure: scratch(["quand drapeau vert cliqué", "mettre tirelire à 20", "demander 'Somme ?'", "répéter 4 fois", "  ajouter réponse à tirelire", "dire tirelire"]),
          correction:
            "a) Le bloc « demander » est AU-DESSUS de la boucle : il n'est exécuté qu'une fois. Le lutin pose sa question une seule fois.\nb) tirelire vaut $20$. La boucle ajoute $15$ quatre fois : $35$, $50$, $65$, puis $80$. Le lutin dit $80$.\nc) Je remonte : la tirelire a reçu $60 - 20 = 40$ € en $4$ semaines, soit $40 \\div 4 = 10$ € par semaine.\n⭐ Contrôle : $20 + 4 \\times 10 = 60$.\n⛔ Le piège : croire que le lutin pose sa question à chaque tour. Seuls les blocs rangés DANS la boucle sont répétés ; « réponse » garde la même valeur pendant les quatre tours.\nRéponse : a) une fois ; b) $80$ ; c) $10$ € par semaine.",
          schema: ecranSeulement(trace(["semaine", "tirelire (€)"], [["départ", 20], [1, 35], [2, 50], [3, 65], [4, 80]])),
          micros: ["algo_entree_sortie", "algo_defi"],
        },
        {
          enonce:
            "Une feuille de papier a une épaisseur de $0{,}1$ mm. Chaque pliage en deux double l'épaisseur. Un programme range $0{,}1$ dans la variable e, répète $5$ fois le bloc « mettre e à e * 2 », puis dit e.\na) Que dit le lutin ?\nb) Que dirait-il si la boucle répétait $7$ fois ?\nc) Tom annonce : « $0{,}1 \\times 2 \\times 5 = 1$ mm ». Où est son erreur ?",
          correction:
            "a) À chaque tour, e est remplacé par son double. Je suis e tour après tour.\n$0{,}1$, puis $0{,}2$, $0{,}4$, $0{,}8$, $1{,}6$ et $3{,}2$. Le lutin dit $3{,}2$ : la feuille pliée $5$ fois fait $3{,}2$ mm.\nb) Deux tours de plus : $3{,}2 \\times 2 = 6{,}4$, puis $6{,}4 \\times 2 = 12{,}8$. Le lutin dirait $12{,}8$ mm.\nc) Tom double une seule fois, puis il multiplie par $5$. La boucle, elle, double $5$ fois de suite, et chaque tour repart du résultat du tour d'avant : $0{,}1 \\times 2 \\times 2 \\times 2 \\times 2 \\times 2$.\n⛔ Le piège : confondre « répéter 5 fois : doubler » avec « multiplier par $2$, puis par $5$ ».\nRéponse : a) $3{,}2$ mm ; b) $12{,}8$ mm.",
          schema: ecranSeulement(trace(["pliage", "épaisseur (mm)"], [["départ", "0,1"], [1, "0,2"], [2, "0,4"], [3, "0,8"], [4, "1,6"], [5, "3,2"]])),
          micros: ["algo_defi", "algo_prevoir_expression"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un programme plus long, des questions qui s'enchaînent. Je fais un tableau de suivi, puis je réponds par des phrases.",
      rappel: [
        "Je repère d'abord les entrées (les blocs « demander ») et les sorties (les blocs « dire »).",
        "Seuls les blocs rangés DANS une boucle sont répétés ; seuls ceux rangés DANS un « si » dépendent de la condition.",
        "Pour un lutin qui se déplace, je note à chaque bloc où il est et vers où il regarde.",
      ],
      exercices: [
        {
          titre: "Le pluviomètre",
          enonce:
            "Une station météo relève la pluie tombée chaque jour d'une semaine (relevé imaginé pour l'exercice) : $0$ ; $12$ ; $5$ ; $8$ ; $0$ ; $3$ ; $21$ mm. On tape ces sept nombres dans l'ordre.\na) Combien le programme a-t-il d'entrées ? Quelle est sa sortie ?\nb) Que dit le lutin ? Que compte-t-il ?\nc) Le jour à $5$ mm est-il compté ? Pourquoi ?\nd) Quelle est la pluie totale de la semaine ? Le programme la donne-t-il ?",
          figure: scratch(["quand drapeau vert cliqué", "mettre jours à 0", "répéter 7 fois", "  demander 'Pluie ?'", "  si réponse > 5 alors", "    ajouter 1 à jours", "dire jours"]),
          correction:
            "a) Le bloc « demander » est DANS la boucle : il est exécuté $7$ fois. Il y a $7$ entrées, une pluie par jour. La sortie est le nombre que dit le lutin à la fin.\nb) jours part de $0$. Chaque jour, je teste « réponse > 5 ».\n$0$ : non. $12$ : oui, jours vaut $1$. $5$ : non. $8$ : oui, $2$. $0$ : non. $3$ : non. $21$ : oui, $3$.\nLe lutin dit $3$ : c'est le nombre de jours où il est tombé plus de $5$ mm.\nc) Non : $5 > 5$ est faux. Un jour à $5$ mm pile n'est pas compté.\nd) $0 + 12 + 5 + 8 + 0 + 3 + 21 = 49$ mm. Le programme ne la donne pas : il COMPTE des jours, il n'additionne pas des millimètres.\n⛔ Le piège : croire que le lutin dit la pluie. jours augmente de $1$, pas de la réponse tapée.\nRéponse : b) $3$ jours ; c) non ; d) $49$ mm, que le programme ne donne pas.",
          schema: ecranSeulement(trace(["pluie (mm)", "> 5 ?", "jours"], [[0, "non", 0], [12, "oui", 1], [5, "non", 1], [8, "oui", 2], [0, "non", 2], [3, "non", 2], [21, "oui", 3]])),
          micros: ["algo_entree_sortie", "algo_prevoir_expression", "algo_defi"],
        },
        {
          titre: "Le code du cadenas",
          enonce:
            "Pour ouvrir un cadenas, il faut lire ce programme. Le code s'écrit avec les deux nombres dits par le lutin, l'un après l'autre.\na) Que dit le lutin ?\nb) Quel est le code du cadenas ?\nc) On remplace « mettre a à 3 » par « mettre a à 5 ». Quel est le nouveau code ?\nd) Un élève affirme qu'au bloc « mettre b à a * 2 », a vaut encore $3$. A-t-il raison ?",
          figure: scratch(["quand drapeau vert cliqué", "mettre a à 3", "mettre b à 7", "mettre a à a + b", "mettre b à a * 2", "mettre a à b − a", "dire a", "dire b"]),
          correction:
            "a) Je suis les deux variables, bloc après bloc. Chaque bloc utilise les valeurs du MOMENT.\na vaut $3$, b vaut $7$.\n« mettre a à a + b » : a vaut $3 + 7 = 10$.\n« mettre b à a * 2 » : a vaut maintenant $10$, donc b vaut $10 \\times 2 = 20$.\n« mettre a à b − a » : a vaut $20 - 10 = 10$.\nLe lutin dit $10$, puis $20$.\nb) Le code est $1020$.\nc) Avec a à $5$ : a vaut $5 + 7 = 12$, b vaut $12 \\times 2 = 24$, puis a vaut $24 - 12 = 12$. Le lutin dit $12$, puis $24$ : le code devient $1224$.\nd) Non : quand ce bloc s'exécute, a ne vaut plus $3$. Le bloc d'avant l'a remplacé par $10$.\n⛔ Le piège : garder en tête les valeurs du départ. Une variable ne garde que sa DERNIÈRE valeur.\nRéponse : a) $10$ puis $20$ ; b) $1020$ ; c) $1224$ ; d) non.",
          schema: ecranSeulement(trace(["bloc", "a", "b"], [["a à 3", 3, "—"], ["b à 7", 3, 7], ["a à a + b", 10, 7], ["b à a * 2", 10, 20], ["a à b − a", 10, 20]])),
          micros: ["algo_defi", "algo_expression_valeur", "algo_sequence"],
        },
        {
          titre: "La tondeuse robot",
          enonce:
            "Une tondeuse robot tond une pelouse en allers et retours. Elle part en regardant vers la droite, et un pas vaut $10$ cm.\na) Suis le premier tour de boucle et dessine le trajet.\nb) Quelle longueur la tondeuse parcourt-elle en tout ? Donne-la en pas, puis en mètres.\nc) Où arrive-t-elle par rapport à son point de départ ?\nd) Combien de tours de boucle faudrait-il pour qu'elle monte de $100$ pas ?",
          figure: scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 2 fois", "  avancer de 60", "  tourner à gauche de 90°", "  avancer de 10", "  tourner à gauche de 90°", "  avancer de 60", "  tourner à droite de 90°", "  avancer de 10", "  tourner à droite de 90°"]),
          correction:
            "a) Premier tour : la tondeuse avance de $60$ vers la droite, tourne à gauche (elle regarde vers le haut) et avance de $10$.\nElle tourne encore à gauche (elle regarde vers la gauche) et revient de $60$.\nPuis elle tourne à droite (vers le haut), avance de $10$, et tourne encore à droite : elle regarde de nouveau vers la droite.\nUn tour de boucle trace un aller, une petite montée, un retour, une petite montée.\nb) Un tour : $60 + 10 + 60 + 10 = 140$ pas. Deux tours : $2 \\times 140 = 280$ pas.\nUn pas vaut $10$ cm : $280 \\times 10 = 2\\,800$ cm, soit $28$ m.\nc) Chaque retour annule l'aller : elle revient à la verticale de son départ. Chaque tour la fait monter de $10 + 10 = 20$ pas : elle arrive $40$ pas plus haut que son départ.\nd) Pour monter de $100$ pas, il faut $100 \\div 20 = 5$ tours : on remplace « répéter 2 fois » par « répéter 5 fois ».\n⛔ Le piège : oublier les deux « tourner à droite ». Avec quatre quarts de tour à gauche, la tondeuse tournerait en rond sur un rectangle de $60$ pas sur $10$.\nRéponse : b) $280$ pas, soit $28$ m ; c) $40$ pas plus haut ; d) $5$ tours.",
          schema: lutin([[[0, 0], [60, 0], [60, 10], [0, 10], [0, 20], [60, 20], [60, 30], [0, 30], [0, 40]]], "2 tours : 280 pas", { cotes: 4 }),
          micros: ["algo_sequence", "algo_defi", "algo_prevoir_expression"],
        },
        {
          titre: "Le nombre magique",
          enonce:
            "Un magicien fait tourner ce programme devant le public.\na) Que dit le lutin si on répond $3$ ? $8$ ? $100$ ?\nb) Que remarques-tu ?\nc) Explique pourquoi, sans essayer d'autre nombre.\nd) Quel bloc faut-il changer pour que le lutin dise toujours $7$ ?",
          figure: scratch(["quand drapeau vert cliqué", "demander 'Nombre ?'", "mettre x à réponse * 2", "ajouter 10 à x", "mettre x à x / 2", "mettre x à x − réponse", "dire x"]),
          correction:
            "a) Avec $3$ : x vaut $3 \\times 2 = 6$, puis $6 + 10 = 16$, puis $16 \\div 2 = 8$, puis $8 - 3 = 5$. Le lutin dit $5$.\nAvec $8$ : $16$, $26$, $13$, puis $13 - 8 = 5$. Avec $100$ : $200$, $210$, $105$, puis $105 - 100 = 5$.\nb) Le lutin dit toujours $5$, quel que soit le nombre choisi.\nc) Doubler puis prendre la moitié, c'est revenir au nombre de départ. Mais entre les deux, on a ajouté $10$, et la moitié de $10$ est $5$. Après « mettre x à x / 2 », x vaut donc le nombre de départ plus $5$.\nLe dernier calcul enlève le nombre de départ : il reste $5$.\nd) Pour qu'il reste $7$, il faut ajouter le double de $7$, soit $14$ : on change « ajouter 10 à x » en « ajouter 14 à x ».\n⛔ Le piège : croire que le résultat dépend du nombre choisi, parce que les calculs du milieu changent. Seul le résultat final compte, et c'est toujours $5$.\nRéponse : a) $5$ à chaque fois ; b) toujours $5$ ; d) « ajouter 14 à x ».",
          schema: ecranSeulement(trace(["réponse", "après / 2", "le lutin dit"], [[3, 8, 5], [8, 13, 5], [100, 105, 5]])),
          micros: ["algo_defi", "algo_prevoir_expression", "algo_expression_valeur"],
        },
      ],
    },
  ],
};
