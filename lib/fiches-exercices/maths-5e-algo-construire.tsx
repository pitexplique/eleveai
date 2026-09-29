// ─── Fiche d'exercices : construire un programme (5e) — 20 exercices corrigés ─────
//
// Feuille du 29/09/2026 (lot de 5e, forme de la feuille étalon
// `maths-5e-relatif-nombre.tsx`). Alignée sur la fiche de cours
// `lib/fiches/maths-5e-algo-construire.tsx` (« Construire un programme ») et sur
// la banque `lib/tutor-v4/questionBank/5e/maths/algorithmique.bank.ts`, partie
// algo_construire : ÉCRIRE un programme — traduire une formule en blocs, choisir
// une condition, analyser un programme et régler ses paramètres, poser une
// boucle « répéter n fois », et des défis d'écriture. (LIRE un programme, c'est
// la feuille sœur `maths-5e-algo-programmation.tsx` : aucun de ses exercices
// n'est repris ici.)
//
// ⛔ LIMITES DE LA 5e, lues dans la banque : « mettre », « ajouter »,
// « demander », « dire », « attendre », « répéter n fois », « si … alors » avec
// une condition SIMPLE (>, <), les blocs du lutin (avancer, tourner, stylo).
// Un seul « si … alors … sinon » (11) : le bloc existe dans Scratch et au
// canvas du coach. Pas de « répéter jusqu'à », pas de
// « et » / « ou », pas de boucle dans une boucle, aucun nombre négatif.
// ⛔ Aucun exemple de la fiche de cours n'est repris (ni x + 5 avec 3, ni le
// score 12 et « Gagné », ni le carré de côté 100 devenu triangle de côté 100, ni
// le carré sans boucle en 8 blocs, ni 2 × x, ni le carré de côté 40, ni le
// triangle de côté 50) ; ni ceux des feuilles de 4e et de 3e (rectangle 80 sur
// 30, carré de côté 50, escaliers de 3 × 20 et 5 × 12, hexagone de côté 40,
// octogone de côté 25, pH, thermostat, manège…).
//
// ⭐ LES DESSINS : les programmes sont DESSINÉS en blocs Scratch (`scratch()`,
// SVG local, les couleurs de Scratch 3, les boucles et les tests qui
// embrassent leur contenu) ; les tracés du lutin à l'échelle sur un quadrillage
// (`lutin()`), avec la longueur des côtés. Le script VÉRIFIE chaque tracé :
// sommets, longueurs, angles de rotation (somme de 360° pour une figure fermée),
// figure fermée ou non. 14 dessins imprimés : les programmes à lire ou à
// corriger des énoncés, et les programmes et tracés qui PORTENT la réponse ;
// les autres sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les pièges nommés : des parenthèses en trop (1) ou oubliées (15), × lu comme
// la lettre x (2), < et > confondus (3), le bloc SOUS le « si » cru dedans (4),
// changer le nombre de tours pour changer la taille (5), le sens du virage (6),
// la remise à zéro dans la boucle (7, 16), l'ordre des blocs dans la boucle
// (8, 13), l'ordre des étapes d'un programme de calcul (9), tourner de l'angle
// du triangle (10), le seuil exclu par > (11), une figure qui change avec UN
// seul paramètre (12), deux quarts de tour à gauche (14), le second « si »
// rangé dans le premier (18), les mètres pris pour des pas (19), le cycle qui
// s'allonge (20).
//
// Aucun fait réel à vérifier : le taxi, la vitesse du guépard (« environ
// 30 m/s », arrondie et dite comme telle), l'humidité du sol, les seuils de
// fièvre et de la serre, le potager, les durées du feu tricolore sont des
// MODÈLES, dits comme tels dans les énoncés.
//
// Les corrigés sont écrits à la première personne (« je range le bloc »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-algo-construire.mjs`
// EXÉCUTE chaque programme dessiné avec un petit interprète de blocs, relit les
// traces et les tracés du lutin et les compare à l'exécution.
//
// Micro-compétences : algo_formule_bloc (1, 2, 9, 15, 17, 19),
// algo_test_condition (3, 4, 11, 16, 18), algo_parametre (5, 6, 10, 11, 12, 17,
// 18, 19, 20), algo_boucle (7, 8, 10, 12, 13, 14, 16, 17, 19, 20),
// algo_construire_defi (10, 13, 14, 16-20). 5/5.

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
  const cotes = premier.slice(1, (opts.cotes ?? 0) + 1).map((q, j) => {
    const p = premier[j];
    const [dx, dy] = [q[0] - p[0], q[1] - p[1]];
    const L = Math.hypot(dx, dy) || 1;
    const [nx, ny] = [dy / L, -dx / L];
    return { x: Math.min(Math.max(X((p[0] + q[0]) / 2) + nx * 15, 16), W - 16), y: Y((p[1] + q[1]) / 2) - ny * 15 + 5, t: String(Math.round(L * 100) / 100).replace(".", ",") };
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

export const exercicesAlgoConstruire5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "algo-construire",
  titre: "Construire un programme",
  accroche:
    "Vingt exercices pour ÉCRIRE des programmes en blocs Scratch, du bloc seul au petit problème : traduire une formule en blocs, choisir une condition, régler les paramètres, poser une boucle « répéter ». Un taxi, un guépard, une plante à arroser, une fusée, un escalier, un thermomètre, une serre, un potager, un feu tricolore, et le lutin qui trace carrés, triangles et polygones. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : le programme en blocs, le tracé du lutin à l'échelle et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/algo-construire", titre: "Construire un programme" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un seul geste : je traduis une formule, je choisis une condition, je règle un nombre ou je pose une boucle.",
      rappel: [
        "Une formule devient des blocs : chaque opération devient un calcul, dans l'ordre. Dans Scratch, × s'écrit * et ÷ s'écrit /.",
        "« si … alors » n'exécute les blocs qu'il EMBRASSE que si la condition est vraie. « > » veut dire strictement plus grand, « < » strictement plus petit.",
        "Un paramètre est un nombre écrit dans un bloc : le changer change le résultat, pas la structure du programme.",
        "« répéter n fois » refait n fois, dans l'ordre, tous les blocs qu'il contient.",
      ],
      exercices: [
        {
          enonce:
            "Un taxi fait payer $4$ € de prise en charge, puis $2$ € par kilomètre (tarif choisi pour l'exercice). Le prix se calcule par la formule : prix = 4 + 2 × km.\na) Écris le programme : le lutin demande le nombre de km, puis dit le prix.\nb) Que dit-il pour un trajet de $7$ km ?\nc) Un élève a écrit « mettre prix à (4 + 2) * km ». Que dirait son programme pour $7$ km ?",
          correction:
            "a) Chaque morceau de la formule devient un bloc. L'entrée, le nombre de km, arrive par « demander » ; je la range dans la variable km. Puis je calcule le prix, et le lutin le dit.\nLe calcul s'écrit « mettre prix à 4 + 2 * km » : l'étoile * remplace le signe ×.\nb) La machine multiplie d'abord : $2 \\times 7 = 14$, puis $4 + 14 = 18$. Le lutin dit $18$ : le trajet coûte $18$ €.\nc) $(4 + 2) \\times 7 = 6 \\times 7 = 42$. Son programme ferait payer la prise en charge à chaque kilomètre.\n⛔ Le piège : des parenthèses en trop. La prise en charge se paie UNE fois : elle ne doit pas être multipliée.\nRéponse : b) $18$ € ; c) $42$ €, c'est faux.",
          schema: scratch(["quand drapeau vert cliqué", "demander 'Km ?'", "mettre km à réponse", "mettre prix à 4 + 2 * km", "dire prix"], 3),
          micros: ["algo_formule_bloc"],
        },
        {
          enonce:
            "Un guépard lancé court à environ $30$ mètres par seconde (valeur arrondie pour l'exercice). La distance parcourue se calcule par : distance = vitesse × durée. Dans un programme, la variable v vaut $30$ et t est la durée en secondes.\na) Quel bloc traduit la formule ?\n(1) « mettre d à v + t » ; (2) « mettre d à v * t » ; (3) « mettre d à v / t » ; (4) « mettre d à t − v ».\nb) Quelle distance le lutin dit-il quand t vaut $4$ ?\nc) Et avec le bloc (1) ?",
          correction:
            "a) Le signe × s'écrit * dans Scratch : la formule devient « mettre d à v * t ». C'est le bloc (2).\nb) $30 \\times 4 = 120$. Le lutin dit $120$ : en $4$ secondes, le guépard parcourt $120$ m.\nc) Avec le bloc (1) : $30 + 4 = 34$. Additionner une vitesse et une durée n'a pas de sens : ce ne sont pas des grandeurs de même nature.\n⛔ Le piège : lire le × de la formule comme la lettre x. Dans Scratch, la multiplication est l'étoile *.\nRéponse : a) le bloc (2) ; b) $120$ m ; c) $34$, qui ne veut rien dire.",
          schema: ecranSeulement(scratch(["quand drapeau vert cliqué", "mettre v à 30", "mettre t à 4", "mettre d à v * t", "dire d"], 3)),
          micros: ["algo_formule_bloc"],
        },
        {
          enonce:
            "Un capteur mesure l'humidité du sol d'une plante, en %. Il faut arroser quand l'humidité est inférieure à $30$ % (seuil choisi pour l'exercice). Le programme contient « si … alors », avec « dire 'Arrose' » dedans.\na) Quelle condition faut-il écrire : « humidité > 30 », « humidité < 30 » ou « humidité = 30 » ?\nb) Que dit le lutin quand l'humidité vaut $25$, $30$, puis $45$ ?",
          correction:
            "a) « Inférieure à $30$ » veut dire plus petite que $30$ : j'écris « humidité < 30 ».\n« humidité > 30 » ferait arroser un sol déjà humide ; « humidité = 30 » n'arroserait qu'à $30$ pile.\nb) $25 < 30$ est vrai : le lutin dit « Arrose ».\n$30 < 30$ est faux : le lutin ne dit rien. $45 < 30$ est faux : rien non plus.\n⛔ Le piège : confondre < et >. La pointe du signe montre le plus petit : dans « humidité < 30 », c'est l'humidité qui est la plus petite.\nRéponse : a) « humidité < 30 » ; b) « Arrose », rien, rien.",
          schema: ecranSeulement(trace(["humidité", "< 30 ?", "le lutin dit"], [[25, "vrai", "Arrose"], [30, "faux", "rien"], [45, "faux", "rien"]])),
          micros: ["algo_test_condition"],
        },
        {
          enonce:
            "Dans un jeu de course, le lutin doit dire « Bravo » puis « Médaille » seulement si le tour est bouclé en moins de $60$ secondes. Voici le programme d'Enzo.\na) Que dit le lutin pour $52$ s ? Pour $75$ s ?\nb) Où est l'erreur ? Corrige le programme.\nc) Que dit le programme corrigé pour $52$ s et pour $75$ s ?",
          figure: scratch(["quand drapeau vert cliqué", "demander 'Temps ?'", "si réponse < 60 alors", "  dire 'Bravo'", "dire 'Médaille'"]),
          correction:
            "a) $52 < 60$ est vrai : le lutin dit « Bravo », puis « Médaille ».\n$75 < 60$ est faux : « Bravo » est sauté, mais le lutin dit quand même « Médaille ».\nb) Le bloc « dire Médaille » est placé SOUS le « si », pas DEDANS : il s'exécute à chaque fois. Je le glisse dans le « si », juste sous « dire Bravo ».\nc) Avec $52$ : « Bravo », puis « Médaille ». Avec $75$ : le lutin ne dit rien.\n⛔ Le piège : croire qu'un bloc placé juste après le « si » en dépend. Seuls les blocs EMBRASSÉS par le « si » dépendent de la condition.\nRéponse : a) « Bravo » et « Médaille », puis « Médaille » seul ; c) « Bravo » et « Médaille », puis rien.",
          schema: ecranSeulement(scratch(["quand drapeau vert cliqué", "demander 'Temps ?'", "si réponse < 60 alors", "  dire 'Bravo'", "  dire 'Médaille'"], 4)),
          micros: ["algo_test_condition"],
        },
        {
          enonce:
            "Ce programme trace un carré.\na) Quelle est la longueur d'un côté ? Quel est le périmètre du carré ?\nb) Quel paramètre faut-il changer pour tracer un carré de côté $25$ ?\nc) On veut un carré dont le tour mesure $180$ pas. Quel nombre faut-il écrire, et dans quel bloc ?",
          figure: scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 4 fois", "  avancer de 60", "  tourner à gauche de 90°"]),
          correction:
            "a) Le bloc « avancer de 60 » trace un côté : un côté mesure $60$ pas. La boucle le répète $4$ fois : le périmètre est $4 \\times 60 = 240$ pas.\nb) Seule la longueur change : « avancer de 60 » devient « avancer de 25 ». L'angle reste $90$° et la boucle reste « répéter 4 fois ».\nc) Les $4$ côtés se partagent les $180$ pas : $180 \\div 4 = 45$. J'écris « avancer de 45 ».\n⛔ Le piège : changer le « 4 » de la boucle pour changer la taille. Le nombre de tours donne le nombre de côtés, pas leur longueur.\nRéponse : a) $60$ pas et $240$ pas ; b) « avancer de 25 » ; c) « avancer de 45 ».",
          schema: ecranSeulement(lutin([[[0, 0], [60, 0], [60, 60], [0, 60], [0, 0]], [[0, 0], [45, 0], [45, 45], [0, 45], [0, 0]]], "60 en bleu, 45 en orange", { cotes: 1 })),
          micros: ["algo_parametre"],
        },
        {
          enonce:
            "Le lutin part en regardant vers la droite. Le programme A répète $4$ fois « avancer de 30 » puis « tourner à gauche de 90° ». Dans le programme B, on a seulement remplacé « à gauche » par « à droite ».\na) Quelle figure trace chaque programme ?\nb) Où se trouve la figure de B par rapport à celle de A ?\nc) Le lutin revient-il à son point de départ dans les deux cas ?",
          correction:
            "a) Les deux programmes font $4$ côtés de $30$ pas et $4$ quarts de tour : chacun trace un carré de côté $30$.\nb) A tourne vers la gauche : après le premier côté, il monte. Son carré est au-dessus de la ligne de départ.\nB tourne vers la droite : il descend. Son carré est en dessous, comme le reflet de A dans un miroir.\nc) Oui : $4$ quarts de tour font $4 \\times 90 = 360$°, un tour complet, et $4$ côtés égaux ramènent le lutin à son départ.\n⛔ Le piège : croire que le sens du virage ne compte pas. Il ne change pas la forme, mais il change l'endroit où elle est tracée.\nRéponse : a) deux carrés de côté $30$ ; b) en dessous ; c) oui.",
          schema: ecranSeulement(lutin([[[0, 0], [30, 0], [30, 30], [0, 30], [0, 0]], [[0, 0], [30, 0], [30, -30], [0, -30], [0, 0]]], "A en bleu, B en orange")),
          micros: ["algo_parametre"],
        },
        {
          enonce:
            "Dans un jeu, chaque pièce ramassée rapporte $5$ points. Ce programme compte les points de $6$ pièces.\na) Que dit le lutin ?\nb) Réécris le programme avec une boucle « répéter ». Combien de blocs gagnes-tu ?\nc) Que faut-il changer pour $15$ pièces ?",
          figure: scratch(["quand drapeau vert cliqué", "mettre points à 0", "ajouter 5 à points", "ajouter 5 à points", "ajouter 5 à points", "ajouter 5 à points", "ajouter 5 à points", "ajouter 5 à points", "dire points"]),
          correction:
            "a) points part de $0$ et reçoit $5$ six fois : $6 \\times 5 = 30$. Le lutin dit $30$.\nb) Le bloc « ajouter 5 à points » revient $6$ fois de suite : je le range UNE fois dans « répéter 6 fois ».\nSous le drapeau : « mettre points à 0 », « répéter 6 fois » avec « ajouter 5 à points » dedans, puis « dire points ».\nSans boucle, il y avait $8$ blocs sous le drapeau ; avec la boucle, il en reste $4$. Je gagne $4$ blocs, et le lutin dit toujours $30$.\nc) Je change seulement le nombre de tours : « répéter 15 fois ». Le lutin dit alors $15 \\times 5 = 75$.\n⛔ Le piège : mettre « mettre points à 0 » DANS la boucle. Les points repartiraient de $0$ à chaque tour, et le lutin dirait $5$.\nRéponse : a) $30$ ; b) $4$ blocs de moins ; c) « répéter 15 fois », $75$ points.",
          schema: ecranSeulement(scratch(["quand drapeau vert cliqué", "mettre points à 0", "répéter 6 fois", "  ajouter 5 à points", "dire points"], 2)),
          micros: ["algo_boucle"],
        },
        {
          enonce:
            "Écris un programme qui fait dire au lutin la table de $7$ : $7$, $14$, $21$… jusqu'à $70$.\na) Quelle variable faut-il, et à quelle valeur commence-t-elle ?\nb) Combien de tours de boucle faut-il ? Écris le programme.\nc) Que dit le lutin si on range « dire n » AVANT « ajouter 7 à n » dans la boucle ?",
          correction:
            "a) Il faut une variable n qui grandit de $7$ à chaque tour. Elle commence à $0$ : après le premier ajout, elle vaut $7$.\nb) De $7$ à $70$, il y a $70 \\div 7 = 10$ nombres : il faut $10$ tours.\nLe programme : « mettre n à 0 », puis « répéter 10 fois » avec, dedans, « ajouter 7 à n » puis « dire n ».\nc) Le lutin parlerait AVANT d'ajouter : il dirait $0$, $7$, $14$… jusqu'à $63$. Il dirait $0$ en trop, et il manquerait $70$.\n⛔ Le piège : l'ordre des blocs DANS la boucle. Les mêmes blocs, dans l'autre ordre, décalent toute la liste.\nRéponse : a) n, qui commence à $0$ ; b) $10$ tours ; c) de $0$ à $63$.",
          schema: ecranSeulement(scratch(["quand drapeau vert cliqué", "mettre n à 0", "répéter 10 fois", "  ajouter 7 à n", "  dire n"], 2)),
          micros: ["algo_boucle"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "J'écris le programme en entier, puis je le teste sur les nombres de l'énoncé.",
      rappel: [
        "Ce qui se répète entre dans une boucle ; ce qui dépend d'une situation entre dans un « si ».",
        "Pour revenir à son point de départ, le lutin doit tourner d'un tour complet en tout : $360$°.",
        "Après avoir écrit un programme, je le teste sur un exemple dont je connais la réponse.",
      ],
      exercices: [
        {
          enonce:
            "Voici un programme de calcul : choisir un nombre, le multiplier par $4$, puis soustraire $3$ au résultat.\na) Écris-le en blocs : le lutin demande le nombre, puis dit le résultat.\nb) Que dit le lutin avec $5$ ? Avec $2{,}5$ ?\nc) Le lutin a dit $45$. Quel nombre avait-on choisi ?\nd) Écris le calcul avec la lettre $n$ pour le nombre choisi.",
          correction:
            "a) Chaque étape du programme de calcul devient un bloc, dans le même ordre : « demander », « mettre n à réponse », « mettre n à n * 4 », « mettre n à n − 3 », « dire n ».\nb) Avec $5$ : $5 \\times 4 = 20$, puis $20 - 3 = 17$. Le lutin dit $17$.\nAvec $2{,}5$ : $2{,}5 \\times 4 = 10$, puis $10 - 3 = 7$. Le lutin dit $7$.\nc) Je défais à l'envers : $45 + 3 = 48$, puis $48 \\div 4 = 12$. On avait choisi $12$.\n⭐ Contrôle : $12 \\times 4 - 3 = 48 - 3 = 45$.\nd) Le calcul s'écrit $4 \\times n - 3$.\n⛔ Le piège : écrire « mettre n à n − 3 » AVANT la multiplication. Le lutin calculerait $(5 - 3) \\times 4 = 8$.\nRéponse : b) $17$ et $7$ ; c) $12$ ; d) $4 \\times n - 3$.",
          schema: scratch(["quand drapeau vert cliqué", "demander 'Nombre ?'", "mettre n à réponse", "mettre n à n * 4", "mettre n à n − 3", "dire n"]),
          micros: ["algo_formule_bloc"],
        },
        {
          enonce:
            "On veut que le lutin trace un triangle équilatéral de côté $80$ : trois côtés égaux, et il revient à son point de départ.\na) Combien de fois faut-il répéter « avancer de 80 » puis « tourner à gauche » ?\nb) De combien de degrés le lutin doit-il tourner à chaque sommet ? Écris le programme.\nc) Tom a écrit « tourner à gauche de 60° ». Que trace son programme ?\nd) Quelle est la longueur du tracé ?",
          correction:
            "a) Un triangle a $3$ côtés : je répète $3$ fois « avancer de 80 » puis « tourner ».\nb) Pour revenir à son départ en regardant dans le même sens, le lutin doit faire un tour complet, $360$°, en $3$ virages égaux : $360 \\div 3 = 120$. Il tourne de $120$° à chaque sommet.\nLe programme : « stylo en position d'écriture », puis « répéter 3 fois » avec « avancer de 80 » et « tourner à gauche de 120° ».\nc) Avec $60$°, le lutin ne fait qu'un demi-tour en tout : $3 \\times 60 = 180$°. Il trace trois côtés d'un hexagone et ne revient pas à son départ : la figure reste ouverte.\nd) $3 \\times 80 = 240$ pas.\n⛔ Le piège : tourner de l'angle du triangle, $60$°. Le lutin tourne de l'angle qui lui fait CHANGER de direction, et ses trois virages doivent faire un tour complet.\nRéponse : a) $3$ fois ; b) $120$° ; c) une ligne ouverte ; d) $240$ pas.",
          schema: pile(
            lutin([[[0, 0], [80, 0], [40, 69.28], [0, 0]], [[0, 0], [80, 0], [120, 69.28], [80, 138.56]]], "120° en bleu, 60° en orange", { cotes: 3, grille: 20 }),
            ecranSeulement(scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 3 fois", "  avancer de 80", "  tourner à gauche de 120°"], 4)),
          ),
          micros: ["algo_boucle", "algo_parametre", "algo_construire_defi"],
        },
        {
          enonce:
            "Un thermomètre médical affiche la température au dixième. Le lutin doit dire « Fièvre » au-dessus de $38$ °C, et « Normal » sinon (seuil choisi pour l'exercice).\na) Écris le programme avec « si … alors … sinon ».\nb) Que dit-il pour $37{,}5$ ; $38$ ; $39{,}2$ ?\nc) Le médecin veut que $38$ °C pile compte comme de la fièvre. Quel paramètre changer ?",
          correction:
            "a) Deux messages, un seul à la fois : c'est « si … alors … sinon ». La condition est « réponse > 38 ».\nLe programme : « demander », puis « si réponse > 38 alors » avec « dire Fièvre » dedans, et « dire Normal » dans le « sinon ».\nb) $37{,}5 > 38$ est faux : « Normal ». $38 > 38$ est faux : « Normal ». $39{,}2 > 38$ est vrai : « Fièvre ».\nc) Pour que $38$ passe dans le « si », je baisse le seuil d'un dixième : « si réponse > 37.9 alors ». Scratch écrit la virgule avec un point.\nLe thermomètre affiche des dixièmes : $38$ est la plus petite température qui dépasse $37{,}9$.\n⛔ Le piège : le $38$ pile. « > 38 » l'exclut ; il suffit de changer le paramètre de la condition, pas le reste du programme.\nRéponse : b) « Normal », « Normal », « Fièvre » ; c) « réponse > 37.9 ».",
          schema: pile(
            scratch(["quand drapeau vert cliqué", "demander 'Degrés ?'", "si réponse > 38 alors", "  dire 'Fièvre'", "sinon", "  dire 'Normal'"], 2),
            ecranSeulement(trace(["°C", "> 38 ?", "le lutin dit"], [["37,5", "faux", "Normal"], [38, "faux", "Normal"], ["39,2", "vrai", "Fièvre"]])),
          ),
          micros: ["algo_test_condition", "algo_parametre"],
        },
        {
          enonce:
            "a) Quelle figure trace ce programme ? Le lutin revient-il à son point de départ ?\nb) Quelle est la longueur du tracé ?\nc) Modifie UN paramètre pour que chaque côté mesure $45$. Quelle longueur a alors le tracé ?\nd) Lina remplace « répéter 5 fois » par « répéter 4 fois », sans toucher à l'angle. Que se passe-t-il ?",
          figure: scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 5 fois", "  avancer de 30", "  tourner à gauche de 72°"]),
          correction:
            "a) La boucle fait $5$ côtés de $30$ pas. À chaque sommet, le lutin tourne de $72$° : en tout, $5 \\times 72 = 360$°, un tour complet. Il revient à son départ : c'est un pentagone régulier, $5$ côtés égaux.\nb) $5 \\times 30 = 150$ pas.\nc) Seul le paramètre de « avancer » change : « avancer de 45 ». Le tracé mesure alors $5 \\times 45 = 225$ pas.\nd) Avec $4$ tours, le lutin ne tourne que de $4 \\times 72 = 288$° en tout, et ne trace que $4$ côtés. Il manque le dernier côté : la figure reste ouverte.\n⛔ Le piège : croire qu'on change de figure en changeant UN seul nombre. Pour un carré, il faudrait changer les tours ET l'angle : « répéter 4 fois » et $90$°.\nRéponse : a) un pentagone régulier, oui ; b) $150$ pas ; c) « avancer de 45 », $225$ pas ; d) la figure reste ouverte.",
          schema: ecranSeulement(
            pile(
              lutin([[[0, 0], [30, 0], [39.27, 28.53], [15, 46.17], [-9.27, 28.53], [0, 0]]], "5 tours : fermé", { cotes: 1 }),
              lutin([[[0, 0], [30, 0], [39.27, 28.53], [15, 46.17], [-9.27, 28.53]]], "4 tours : ouvert"),
            ),
          ),
          micros: ["algo_parametre", "algo_boucle"],
        },
        {
          enonce:
            "Pour le lancement d'une fusée, le lutin doit dire $10$, $9$, $8$… jusqu'à $1$, puis « Décollage ».\na) Écris le programme avec une variable n et une boucle.\nb) Combien de tours de boucle faut-il ?\nc) Un élève range « mettre n à n − 1 » AVANT « dire n » dans la boucle. Que dit son lutin ?",
          correction:
            "a) n part de $10$. À chaque tour, le lutin dit n, puis n diminue de $1$. Après la boucle, il dit « Décollage ».\nLe programme : « mettre n à 10 », « répéter 10 fois » avec « dire n » puis « mettre n à n − 1 », et enfin « dire Décollage » sous la boucle.\nb) De $10$ à $1$, il y a $10$ nombres : $10$ tours.\nc) n diminue AVANT d'être dit : le lutin dit $9$, $8$… jusqu'à $0$, puis « Décollage ». Il ne dit jamais $10$.\n⛔ Le piège : placer « dire Décollage » DANS la boucle. Le lutin le dirait dix fois, après chaque nombre.\nRéponse : b) $10$ tours ; c) de $9$ à $0$, puis « Décollage ».",
          schema: ecranSeulement(scratch(["quand drapeau vert cliqué", "mettre n à 10", "répéter 10 fois", "  dire n", "  mettre n à n − 1", "dire 'Décollage'"], 5)),
          micros: ["algo_boucle", "algo_construire_defi"],
        },
        {
          enonce:
            "On veut que le lutin trace un escalier de $4$ marches qui monte vers la droite. Chaque marche a $25$ pas de large et $15$ pas de haut. Le lutin part en regardant vers la droite.\na) Écris les blocs d'une marche. Dans quel sens tourner après la montée ?\nb) Écris le programme complet avec une boucle.\nc) Quelle est la longueur du tracé ?\nd) Où arrive le lutin par rapport à son départ ?",
          correction:
            "a) Une marche : le lutin avance de $25$ (le plat), tourne à gauche de $90$° pour monter, avance de $15$ (la hauteur), puis tourne à DROITE de $90$° pour regarder de nouveau vers la droite.\nb) Le programme : « stylo en position d'écriture », puis « répéter 4 fois » avec les quatre blocs de la marche.\nc) Une marche mesure $25 + 15 = 40$ pas ; quatre marches : $4 \\times 40 = 160$ pas.\nd) Il arrive $4 \\times 25 = 100$ pas plus à droite et $4 \\times 15 = 60$ pas plus haut.\n⛔ Le piège : tourner deux fois à gauche. Le lutin repartirait vers la gauche et tracerait un rectangle de $25$ sur $15$, parcouru deux fois.\nRéponse : c) $160$ pas ; d) $100$ pas à droite et $60$ pas plus haut.",
          schema: pile(
            lutin([[[0, 0], [25, 0], [25, 15], [50, 15], [50, 30], [75, 30], [75, 45], [100, 45], [100, 60]]], "4 marches : 160 pas", { cotes: 2, grille: 5 }),
            ecranSeulement(scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 4 fois", "  avancer de 25", "  tourner à gauche de 90°", "  avancer de 15", "  tourner à droite de 90°"], 6)),
          ),
          micros: ["algo_boucle", "algo_construire_defi"],
        },
        {
          enonce:
            "Pour avoir la moyenne de deux notes a et b, on calcule : moyenne = (a + b) ÷ 2.\na) Écris le bloc « mettre moy à … » qui traduit la formule.\nb) Avec $12$ et $15$, que dit le lutin ?\nc) Samia a écrit « mettre moy à a + b / 2 ». Que dit son programme avec $12$ et $15$ ? Pourquoi ?",
          correction:
            "a) La formule additionne d'abord les deux notes, PUIS divise par $2$ : il faut des parenthèses. Je traduis ÷ par / : « mettre moy à (a + b) / 2 ».\nb) $(12 + 15) \\div 2 = 27 \\div 2 = 13{,}5$. Le lutin dit $13{,}5$.\nc) Sans parenthèses, la machine divise d'abord : $15 \\div 2 = 7{,}5$, puis $12 + 7{,}5 = 19{,}5$. Le lutin dirait $19{,}5$ : une moyenne plus grande que les deux notes !\n⛔ Le piège : oublier les parenthèses. Celles de la formule doivent passer dans le bloc.\n⭐ Contrôle : une moyenne est toujours entre la plus petite et la plus grande note.\nRéponse : a) « mettre moy à (a + b) / 2 » ; b) $13{,}5$ ; c) $19{,}5$.",
          schema: ecranSeulement(
            pile(
              scratch(["quand drapeau vert cliqué", "demander 'Note 1 ?'", "mettre a à réponse", "demander 'Note 2 ?'", "mettre b à réponse", "mettre moy à (a + b) / 2", "dire moy"], 5),
              trace(["bloc", "avec 12 et 15"], [["(a + b) / 2", "13,5"], ["a + b / 2", "19,5"]]),
            ),
          ),
          micros: ["algo_formule_bloc"],
        },
        {
          enonce:
            "Un jeu garde le meilleur score : le record. On joue $4$ parties, et le lutin dit le record à la fin. On propose ces blocs : « mettre record à 0 », « répéter 4 fois », « demander Score ? », « si réponse > record alors », « mettre record à réponse », « dire record ».\na) Range-les dans le bon ordre et emboîte-les.\nb) Les scores sont $120$, $95$, $180$ et $150$. Suis la variable record : que dit le lutin ?\nc) Pourquoi « mettre record à 0 » doit-il être AVANT la boucle ?",
          correction:
            "a) Je règle d'abord le record à $0$. Puis je répète $4$ fois : demander le score, et SI il dépasse le record, il devient le nouveau record. Le lutin ne dit le record qu'à la fin, sous la boucle.\nLe programme : « mettre record à 0 », « répéter 4 fois » avec dedans « demander » et « si réponse > record alors » (qui contient « mettre record à réponse »), puis « dire record ».\nb) $120 > 0$ : record vaut $120$. $95 > 120$ est faux : il reste $120$. $180 > 120$ : record vaut $180$. $150 > 180$ est faux : il reste $180$.\nLe lutin dit $180$.\nc) Dans la boucle, record repartirait de $0$ à chaque partie : le lutin dirait le dernier score, $150$, et plus le meilleur.\n⛔ Le piège : oublier la condition et écrire seulement « mettre record à réponse ». Là aussi, le lutin dirait le dernier score, $150$.\nRéponse : b) $180$ ; c) sinon, le lutin dirait $150$.",
          schema: ecranSeulement(
            pile(
              scratch(["quand drapeau vert cliqué", "mettre record à 0", "répéter 4 fois", "  demander 'Score ?'", "  si réponse > record alors", "    mettre record à réponse", "dire record"], 4),
              trace(["score", "> record ?", "record"], [[120, "oui", 120], [95, "non", 120], [180, "oui", 180], [150, "non", 180]]),
            ),
          ),
          micros: ["algo_test_condition", "algo_boucle", "algo_construire_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Un problème en plusieurs questions. J'écris le programme, je le fais tourner au brouillon, puis je le modifie.",
      rappel: [
        "Je découpe le problème : ce que le programme reçoit, ce qu'il calcule, ce qu'il décide, ce qu'il répète.",
        "Je change un paramètre à la fois, et je vérifie ce que ça change.",
        "Pour un tracé, je compte les pas et les degrés : un tour complet fait $360$°.",
      ],
      exercices: [
        {
          titre: "Le polygone à la demande",
          enonce:
            "Ce programme demande un nombre de côtés n, puis trace un polygone régulier.\na) De combien de degrés le lutin tourne-t-il à chaque sommet si on répond $3$ ? $4$ ? $6$ ?\nb) Quel nombre faut-il répondre pour que le lutin tourne de $40$° ?\nc) Pourquoi le lutin revient-il toujours à son point de départ ?\nd) On répond $36$. Quelle est la longueur du tracé ? À quoi ressemble la figure ?",
          figure: scratch(["quand drapeau vert cliqué", "demander 'Côtés ?'", "mettre n à réponse", "stylo en position d'écriture", "répéter n fois", "  avancer de 40", "  tourner à gauche de 360 / n"]),
          correction:
            "a) Pour revenir à son départ, le lutin doit faire un tour complet, $360$°, en n virages égaux : chaque virage vaut $360 \\div n$.\nAvec $3$ : $360 \\div 3 = 120$°. Avec $4$ : $360 \\div 4 = 90$°. Avec $6$ : $360 \\div 6 = 60$°.\nb) Je cherche n pour que $360 \\div n = 40$ : $360 \\div 40 = 9$. Il faut répondre $9$ : le lutin trace un polygone à $9$ côtés.\nc) La boucle fait n virages de $360 \\div n$ degrés : en tout, le lutin tourne de $360$°, un tour complet. Et comme tous les côtés et tous les virages sont égaux, il retombe sur son départ.\nd) $36$ côtés de $40$ pas : $36 \\times 40 = 1\\,440$ pas. Avec $36$ petits virages de $10$°, la figure ressemble à un cercle.\n⛔ Le piège : croire qu'il faut un programme par figure. Le nombre de côtés est ici une ENTRÉE : le même programme trace toutes les figures.\nRéponse : a) $120$°, $90$° et $60$° ; b) $9$ ; d) $1\\,440$ pas, presque un cercle.",
          schema: lutin([[[0, 0], [40, 0], [20, 34.64], [0, 0]], [[0, 0], [40, 0], [60, 34.64], [40, 69.28], [0, 69.28], [-20, 34.64], [0, 0]]], "3 en bleu, 6 en orange", { cotes: 1, grille: 20 }),
          micros: ["algo_boucle", "algo_parametre", "algo_formule_bloc", "algo_construire_defi"],
        },
        {
          titre: "La serre automatique",
          enonce:
            "Dans une serre, un capteur mesure la température. Le lutin doit dire « Ouvre » s'il fait plus de $28$ °C, et « Chauffe » s'il fait moins de $12$ °C. Sinon, il ne dit rien (seuils choisis pour l'exercice).\na) Écris le programme avec deux blocs « si … alors ».\nb) Que dit le lutin pour $31$ ; $20$ ; $8$ ; $28$ ?\nc) Pour des tomates, on veut ouvrir au-dessus de $26$ °C et chauffer sous $14$ °C. Quels blocs changes-tu ? Que dit alors le lutin pour $27$ et pour $13$ ?\nd) Peut-il arriver que le lutin dise les deux messages ? Pourquoi ?",
          correction:
            "a) Deux situations, deux conditions : un premier « si réponse > 28 alors » qui contient « dire Ouvre », puis, EN DESSOUS, un second « si réponse < 12 alors » qui contient « dire Chauffe ».\nb) $31 > 28$ : « Ouvre ». $20$ n'est ni plus grand que $28$, ni plus petit que $12$ : rien. $8 < 12$ : « Chauffe ». $28 > 28$ est faux, et $28 < 12$ aussi : rien.\nc) Seuls les paramètres des conditions changent : « si réponse > 26 alors » et « si réponse < 14 alors ». Pour $27$ : « Ouvre ». Pour $13$ : « Chauffe ».\nd) Non : une température ne peut pas être à la fois plus grande que $28$ et plus petite que $12$. Au plus une condition est vraie.\n⛔ Le piège : ranger le second « si » DANS le premier. Il ne serait testé que quand il fait plus de $28$ °C, et le lutin ne dirait jamais « Chauffe ».\nRéponse : b) « Ouvre », rien, « Chauffe », rien ; c) « Ouvre » et « Chauffe » ; d) non.",
          schema: pile(
            scratch(["quand drapeau vert cliqué", "demander 'Degrés ?'", "si réponse > 28 alors", "  dire 'Ouvre'", "si réponse < 12 alors", "  dire 'Chauffe'"]),
            ecranSeulement(trace(["°C", "le lutin dit"], [[31, "Ouvre"], [20, "rien"], [8, "Chauffe"], [28, "rien"]])),
          ),
          micros: ["algo_test_condition", "algo_parametre", "algo_construire_defi"],
        },
        {
          titre: "La clôture du potager",
          enonce:
            "Un potager rectangulaire mesure $12$ m sur $8$ m. Sur l'écran, $1$ m est représenté par $5$ pas du lutin.\na) Combien de pas pour chaque côté ? Écris un programme qui trace le potager avec « répéter 2 fois ».\nb) Quelle longueur de clôture faut-il, en pas puis en mètres ?\nc) On veut un potager CARRÉ avec la même longueur de clôture. Quel est son côté, en mètres puis en pas ? Écris le programme.\nd) Lequel des deux potagers a la plus grande aire ?",
          correction:
            "a) $12$ m font $12 \\times 5 = 60$ pas, et $8$ m font $8 \\times 5 = 40$ pas.\nUn rectangle, c'est deux fois la même chose : une longueur, un quart de tour, une largeur, un quart de tour. Le programme : « répéter 2 fois » avec « avancer de 60 », « tourner à gauche de 90° », « avancer de 40 », « tourner à gauche de 90° ».\nb) $2 \\times (60 + 40) = 2 \\times 100 = 200$ pas. En mètres : $200 \\div 5 = 40$ m, et on retrouve $2 \\times (12 + 8) = 40$ m.\nc) Même clôture, $4$ côtés égaux : $40 \\div 4 = 10$ m, soit $10 \\times 5 = 50$ pas. Le programme : « répéter 4 fois » avec « avancer de 50 » et « tourner à gauche de 90° ».\nd) Rectangle : $12 \\times 8 = 96$ m². Carré : $10 \\times 10 = 100$ m². Avec la même clôture, le carré est plus grand !\n⛔ Le piège : écrire $12$ et $8$ dans les blocs « avancer ». Le lutin compte en pas : je convertis d'abord les mètres.\nRéponse : b) $200$ pas, soit $40$ m ; c) $10$ m, soit $50$ pas ; d) le carré.",
          schema: pile(
            lutin([[[0, 0], [60, 0], [60, 40], [0, 40], [0, 0]], [[0, 0], [50, 0], [50, 50], [0, 50], [0, 0]]], "rectangle bleu, carré orange", { cotes: 2 }),
            ecranSeulement(
              pile(
                scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 2 fois", "  avancer de 60", "  tourner à gauche de 90°", "  avancer de 40", "  tourner à gauche de 90°"]),
                scratch(["quand drapeau vert cliqué", "stylo en position d'écriture", "répéter 4 fois", "  avancer de 50", "  tourner à gauche de 90°"]),
              ),
            ),
          ),
          micros: ["algo_formule_bloc", "algo_boucle", "algo_parametre", "algo_construire_defi"],
        },
        {
          titre: "Le feu tricolore",
          enonce:
            "Un feu tricolore suit ce programme (durées choisies pour l'exercice).\na) Combien de secondes dure un cycle vert, orange, rouge ?\nb) Combien de temps dure tout le programme ? Combien de fois le lutin dit-il « Orange » ?\nc) On veut que le programme tourne pendant une heure exactement. Quel paramètre changer, et quelle valeur écrire ?\nd) Aux heures de pointe, le vert doit durer $45$ secondes, et le cycle rester d'une minute. Quels paramètres changer ?",
          figure: scratch(["quand drapeau vert cliqué", "répéter 3 fois", "  dire 'Vert'", "  attendre 30 secondes", "  dire 'Orange'", "  attendre 3 secondes", "  dire 'Rouge'", "  attendre 27 secondes"]),
          correction:
            "a) Un tour de boucle, c'est un cycle : $30 + 3 + 27 = 60$ secondes, soit une minute.\nb) La boucle tourne $3$ fois : $3 \\times 60 = 180$ secondes, soit $3$ minutes. « Orange » est dit une fois par tour : $3$ fois.\nc) Une heure, c'est $60$ minutes, donc $60$ cycles d'une minute. Je change seulement le nombre de tours : « répéter 60 fois ».\nd) Le cycle doit garder $60$ secondes. Le vert ($45$ s) et l'orange ($3$ s) font $48$ s : il reste $60 - 48 = 12$ secondes de rouge. Je change « attendre 30 secondes » en « attendre 45 secondes », et « attendre 27 secondes » en « attendre 12 secondes ».\n⛔ Le piège : changer seulement le vert. Le cycle passerait à $45 + 3 + 27 = 75$ secondes, et les voitures de l'autre rue attendraient plus longtemps.\nRéponse : a) $60$ s ; b) $180$ s, et « Orange » $3$ fois ; c) « répéter 60 fois » ; d) $45$ s de vert et $12$ s de rouge.",
          schema: ecranSeulement(trace(["couleur", "durée (s)"], [["Vert", 30], ["Orange", 3], ["Rouge", 27], ["un cycle", 60]])),
          micros: ["algo_boucle", "algo_parametre", "algo_construire_defi"],
        },
      ],
    },
  ],
};
