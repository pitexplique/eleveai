// ─── Fiche d'exercices : la demi-droite graduée (6e) — 20 exercices corrigés ──
//
// Lot de 6e (30/09/2026), sur la forme de l'étalon de 5e
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/6e/maths/demi-droite.bank.ts`
// (notionId demi_droite_graduee) : lire une abscisse, placer un décimal,
// repérer et placer une fraction, graduer un segment de longueur donnée.
// Pas de fiche de cours de 6e pour cette notion (fichesCours vide).
// ⛔ LIMITES DE LA 6e : AUCUN nombre négatif — c'est une DEMI-droite, elle part
// de l'origine 0. Un morceau qui commence plus loin (frise, thermomètre, zoom)
// garde un pointillé à gauche, vers l'origine qu'on ne voit pas. Fractions
// simples (demis, tiers, quarts, cinquièmes, huitièmes, dixièmes), plus grandes
// que 1 comprises, comme le demande le BO. Aucune division par un décimal.
// ⛔ Aucun exemple de la banque n'est repris (A à 0,5 sur 0-1 par 0,2 ; B à 3,7 ;
// C à 0,3 ; D à 2,5 sur 0-5 ; 2,3 ; 4,2 entre 4 et 4,5 ; 3/4 et 1/4 sur les
// quarts ; 3/2 ; 7/4 ; 12 cm en quarts ; 10 cm en cinquièmes ; 15 cm en tiers ;
// 5/4 de l'ouverte).
//
// Les pièges nommés : une graduation qui vaudrait l'écart des nombres écrits (1),
// le numéro du trait pris pour l'abscisse (2, 3, 13), compter les traits au lieu
// des intervalles (4, 5), 1,2 placé après 1,5 (6), une graduation qui vaudrait
// toujours 1 (7, 10), 5/4 cherché vers 5 (8), une graduation prise pour un
// dixième (9, 11, 17), l'unité qui ne mesure pas 1 cm (12), deux écritures
// crues deux points (14), un nombre qui devrait tomber sur un trait (15), un
// piquet de moins (16), une marque de trop (18), le nombre le plus long cru le
// plus grand (19), un indice mal lu (20).
//
// Faits réels : les trois dates de l'exercice 10 (1914, début de la Première
// Guerre mondiale ; 1945, fin de la Seconde ; 1969, premiers pas sur la Lune) et
// le seuil habituel de la fièvre, 38 °C (exercice 17). Tout le reste (sentier,
// balance, clôture, ruban, sauts, températures) est un MODÈLE.
//
// ⭐ CONSIGNE DE FRÉDÉRIC (30/09) : des 6e qui ont parfois du mal à LIRE. Des
// phrases de 12 mots en moyenne, 20 au plus, une idée par phrase. Le script
// compte les mots de chaque phrase.
//
// ⭐ LES DESSINS :
//   · `demiDroite` — la droite graduée de l'étalon, SANS négatifs : elle part
//     de l'origine 0 (trait épais, 0 en rouge). Un morceau qui commence plus
//     loin a un pointillé à gauche. Points nommés sous les nombres, arcs fléchés
//     (`sauts`) pour une distance ;
//   · `segmentGradue` — un segment à l'échelle, sa longueur cotée au-dessus,
//     ses graduations et leurs noms dessous, des points marqués au-dessus :
//     pour GRADUER (micro abscisse_graduer).
// SVG de viewBox 300, police 14, sans `min-w`. 14 dessins imprimés : les
// figures des énoncés d'abord (on les lit sur papier) ; ceux qui redisent le
// corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je compte… »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-demi-droite-graduee.mjs`.
//
// Micro-compétences : abscisse_lire (1, 2, 7, 9, 11, 13, 15, 17, 19, 20),
// abscisse_placer (3, 6, 8, 10, 12, 13, 14, 15, 17, 19), abscisse_fraction (4,
// 8, 9, 11, 14, 18, 20), abscisse_graduer (5, 12, 16, 18). 4/4.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

type Point = { value: number; label: string; color?: string };
type Saut = { de: number; vers: number; label: string };

/** 4,5 ; 1914 ; 12 500 : un nombre écrit comme au tableau (texte NU). Pas
 *  d'espace dans un nombre de quatre chiffres : une année s'écrit 1914. */
const ecrit = (v: number) => {
  const [e, d] = String(v).split(".");
  return (v >= 10000 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : e) + (d ? "," + d : "");
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * UNE DEMI-DROITE GRADUÉE (la `droiteRel` de l'étalon de 5e, sans négatifs) :
 * une graduation tous les `pas`, un nombre tous les `nombres`, des points
 * nommés SOUS les nombres, et des arcs fléchés (`sauts`).
 * Elle part de l'origine 0 : trait épais, rien à gauche. Un morceau qui
 * commence plus loin (`min` > 0) garde un pointillé à gauche.
 * Les étiquettes de points descendent d'une rangée quand elles se touchent.
 * ⛔ Onze nombres écrits au plus : 300 de large, lisibles à 375 px.
 */
const demiDroite = (min: number, max: number, pas: number, points: Point[], opts: { sauts?: Saut[]; nombres?: number } = {}) => {
  const sauts = opts.sauts ?? [];
  const nombres = opts.nombres ?? pas;
  const W = 300;
  const marge = 24;
  const x = (v: number) => marge + ((v - min) / (max - min)) * (W - 2 * marge);
  const hauteurs = sauts.map((_, i) => 22 + 17 * i);
  const Y = (hauteurs.length ? hauteurs[hauteurs.length - 1] : 0) + 26;
  const ticks: number[] = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) ticks.push(Math.round((min + k * pas) * 1e6) / 1e6);
  const ecritIci = (t: number) => Math.abs(t / nombres - Math.round(t / nombres)) < 1e-6;
  const fins: number[] = [];
  const rangs = new Map<number, number>();
  const lx = new Map<number, number>();
  [...points]
    // Une étiquette ne sort pas du dessin : au bord, elle rentre.
    .map((p, i) => {
      const demi = (p.label.length * 8.6) / 2 + 4;
      return { i, cx: Math.min(Math.max(x(p.value), demi), W - demi), demi };
    })
    .sort((a, b) => a.cx - b.cx)
    .forEach(({ i, cx, demi }) => {
      let r = 0;
      while (fins[r] !== undefined && cx - demi < fins[r]) r++;
      fins[r] = cx + demi;
      rangs.set(i, r);
      lx.set(i, cx);
    });
  const H = Y + 44 + 17 * Math.max(fins.length - 1, 0) + 6;
  const depart = min === 0 ? x(0) : marge - 8;
  return (
    <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[14rem] print:overflow-visible">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Demi-droite graduée">
        {min === 0 ? (
          <line x1={x(0)} y1={Y - 9} x2={x(0)} y2={Y + 9} stroke={ROUGE} strokeWidth={3} strokeLinecap="round" />
        ) : (
          <line x1={2} y1={Y} x2={depart} y2={Y} stroke={NOIR} strokeWidth={2} strokeDasharray="3 3" />
        )}
        <line x1={depart} y1={Y} x2={W - marge + 12} y2={Y} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${W - marge + 4} ${Y - 5} L ${W - marge + 12} ${Y} L ${W - marge + 4} ${Y + 5}`} fill="none" stroke={NOIR} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={x(t)} y1={Y - (ecritIci(t) ? 6 : 4)} x2={x(t)} y2={Y + (ecritIci(t) ? 6 : 4)} stroke={NOIR} strokeWidth={ecritIci(t) ? 1.8 : 1.2} />
            {ecritIci(t) ? (
              <text x={x(t)} y={Y + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill={t === 0 ? ROUGE : NOIR}>
                {ecrit(t)}
              </text>
            ) : null}
          </g>
        ))}
        {sauts.map((s, i) => {
          const [x1, x2, h] = [x(s.de), x(s.vers), hauteurs[i]];
          const c = s.vers >= s.de ? VERT : ROUGE;
          const y0 = Y - 4;
          const [tx, ty] = [(x2 - x1) / 2, 2 * h];
          const L = Math.hypot(tx, ty) || 1;
          const [ux, uy] = [tx / L, ty / L];
          const barbe = (a: number) => `${(x2 - 8 * (ux * Math.cos(a) - uy * Math.sin(a))).toFixed(1)} ${(y0 - 8 * (ux * Math.sin(a) + uy * Math.cos(a))).toFixed(1)}`;
          return (
            <g key={i}>
              <path d={`M ${x1} ${y0} Q ${(x1 + x2) / 2} ${y0 - 2 * h} ${x2} ${y0}`} fill="none" stroke={c} strokeWidth={2.4} />
              <path d={`M ${barbe(0.45)} L ${x2} ${y0} L ${barbe(-0.45)}`} fill="none" stroke={c} strokeWidth={2.4} strokeLinejoin="round" />
              <text x={(x1 + x2) / 2} y={y0 - h - 4} textAnchor="middle" fontSize="14" fontWeight="900" fill={c} stroke="white" strokeWidth="3" paintOrder="stroke">
                {s.label}
              </text>
            </g>
          );
        })}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={x(p.value)} cy={Y} r={5} fill={p.color ?? BLEU} />
            {p.label ? (
              <text x={lx.get(i) ?? x(p.value)} y={Y + 42 + 17 * (rangs.get(i) ?? 0)} textAnchor="middle" fontSize="14" fontWeight="900" fill={p.color ?? BLEU}>
                {p.label}
              </text>
            ) : null}
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * UN SEGMENT À GRADUER, à l'échelle : sa longueur cotée au-dessus (en
 * orange), `parts` parts égales marquées d'un trait, le nom de chaque trait
 * dessous (`bas`, un par trait, "" pour rien), et des points marqués au-dessus
 * (position `cm` dans l'unité de la cote).
 * ⭐ Le script vérifie qu'une étiquette ne touche pas sa voisine (8,6 par signe).
 */
const segmentGradue = (longueur: number, parts: number, bas: string[], points: { cm: number; label: string }[] = [], unite = "cm") => {
  const [x0, L] = [22, 256];
  const x = (v: number) => x0 + (v / longueur) * L;
  const borne = (cx: number, s: string) => {
    const demi = (s.length * 8.6) / 2 + 2;
    return Math.min(Math.max(cx, demi), 300 - demi);
  };
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 92" className="block h-auto w-full" role="img" aria-label={`Un segment de ${ecrit(longueur)} ${unite} partagé en ${parts} parts égales`}>
        <text x={150} y={14} textAnchor="middle" fontSize="14" fontWeight="700" fill={ORANGE}>
          {`${ecrit(longueur)} ${unite}`}
        </text>
        <line x1={x0} y1={22} x2={x0 + L} y2={22} stroke={ORANGE} strokeWidth={1.4} />
        <line x1={x0} y1={18} x2={x0} y2={26} stroke={ORANGE} strokeWidth={1.4} />
        <line x1={x0 + L} y1={18} x2={x0 + L} y2={26} stroke={ORANGE} strokeWidth={1.4} />
        <line x1={x0} y1={60} x2={x0 + L} y2={60} stroke={NOIR} strokeWidth={2.6} strokeLinecap="round" />
        {Array.from({ length: parts + 1 }, (_, k) => {
          const bout = k === 0 || k === parts;
          const xk = x0 + (k * L) / parts;
          return (
            <g key={k}>
              <line x1={xk} y1={bout ? 49 : 52} x2={xk} y2={bout ? 71 : 68} stroke={NOIR} strokeWidth={bout ? 2.4 : 1.6} />
              {bas[k] ? (
                <text x={borne(xk, bas[k])} y={86} textAnchor="middle" fontSize="14" fontWeight="700" fill={NOIR}>
                  {bas[k]}
                </text>
              ) : null}
            </g>
          );
        })}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={x(p.cm)} cy={60} r={5} fill={BLEU} />
            <text x={borne(x(p.cm), p.label)} y={44} textAnchor="middle" fontSize="14" fontWeight="900" fill={BLEU}>
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

export const exercicesDemiDroiteGraduee6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "demi-droite-graduee",
  titre: "La demi-droite graduée",
  accroche:
    "Vingt exercices, du geste seul au problème : lire l'abscisse d'un point, placer un nombre décimal, placer une fraction, graduer un segment. Un sentier de randonnée, une frise du XXe siècle, une balance de cuisine, une clôture, un thermomètre, un ruban, un saut en longueur. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et la demi-droite dessinée.",

  fichesCours: [],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je cherche d'abord ce que vaut une graduation.",
      rappel: [
        "Une demi-droite graduée part de l'origine $0$. Chaque point a un nombre : son abscisse.",
        "Une graduation vaut : l'écart entre deux nombres écrits, divisé par le nombre de cases entre eux.",
        "Je compte les cases, pas les traits.",
        "Pour $\\dfrac{3}{4}$ : je coupe l'unité en $4$ cases. Je compte $3$ cases depuis $0$.",
      ],
      exercices: [
        {
          enonce: "Voici une demi-droite graduée.\na) Combien vaut une graduation ?\nb) Lis l'abscisse des points A, B et C.",
          figure: demiDroite(0, 10, 1, [
            { value: 3, label: "A" },
            { value: 7, label: "B" },
            { value: 9, label: "C" },
          ], { nombres: 2 }),
          correction:
            "a) Les nombres écrits vont de $2$ en $2$.\nEntre $0$ et $2$, je compte $2$ cases.\nUne graduation vaut donc $2 \\div 2 = 1$.\nb) A est une graduation après $2$ : $2 + 1 = 3$.\nB est une graduation après $6$ : $6 + 1 = 7$.\nC est une graduation après $8$ : $8 + 1 = 9$.\n⛔ Le piège : croire qu'une graduation vaut $2$. Les nombres vont de $2$ en $2$, pas les traits.\nRéponse : A$(3)$, B$(7)$, C$(9)$.",
          micros: ["abscisse_lire"],
        },
        {
          enonce: "Voici une demi-droite graduée de $0$ à $1$.\na) Combien vaut une graduation ?\nb) Lis l'abscisse des points D, E et F.",
          figure: demiDroite(0, 1, 0.1, [
            { value: 0.2, label: "D" },
            { value: 0.7, label: "E" },
            { value: 0.9, label: "F" },
          ], { nombres: 0.5 }),
          correction:
            "a) Entre $0$ et $1$, je compte $10$ cases.\nUne graduation vaut $1 \\div 10 = 0{,}1$. C'est un dixième.\nb) D est à $2$ graduations de l'origine : $2 \\times 0{,}1 = 0{,}2$.\nE est à $2$ graduations après $0{,}5$ : $0{,}5 + 0{,}2 = 0{,}7$.\nF est à $1$ graduation avant $1$ : $0{,}9$.\n⛔ Le piège : dire que D a pour abscisse $2$, car il est sur le 2e trait. Le numéro du trait n'est pas l'abscisse.\nRéponse : D$(0{,}2)$, E$(0{,}7)$, F$(0{,}9)$.",
          micros: ["abscisse_lire"],
        },
        {
          enonce: "Trace une demi-droite graduée de $0$ à $5$. Prends $2$ carreaux pour une unité.\nPlace les points G$(1{,}5)$, H$(4)$ et K$(2{,}5)$.",
          correction:
            "Deux carreaux font une unité. Un carreau vaut donc $0{,}5$ : une demi-unité.\nG : $1{,}5$, c'est $1$ et encore une demi-unité. G est au milieu de $1$ et $2$.\nH : $4$ est écrit sous la droite. H est dessus.\nK : $2{,}5$ est au milieu de $2$ et $3$.\n⭐ Pour placer, je cherche d'abord entre quels nombres écrits il tombe.\n⛔ Le piège : compter les traits en disant $1$, $2$, $3$. Le 3e trait n'est pas $3$ : c'est $1{,}5$.",
          schema: demiDroite(0, 5, 0.5, [
            { value: 1.5, label: "G" },
            { value: 2.5, label: "K" },
            { value: 4, label: "H" },
          ], { nombres: 1 }),
          micros: ["abscisse_placer"],
        },
        {
          enonce: "Sur cette demi-droite, l'unité est partagée en trois parts égales.\na) Quelle fraction de l'unité vaut une graduation ?\nb) Écris l'abscisse de L, M et N avec une fraction.",
          figure: demiDroite(0, 2, 1 / 3, [
            { value: 2 / 3, label: "L" },
            { value: 4 / 3, label: "M" },
            { value: 5 / 3, label: "N" },
          ], { nombres: 1 }),
          correction:
            "a) De $0$ à $1$, il y a $3$ cases égales. Une graduation vaut un tiers : $\\dfrac{1}{3}$.\nb) Je compte les tiers depuis l'origine.\nL est à $2$ graduations : $\\dfrac{2}{3}$.\nM est à $4$ graduations : $\\dfrac{4}{3}$. C'est $1$ et encore un tiers.\nN est à $5$ graduations : $\\dfrac{5}{3}$.\n⛔ Le piège : compter les traits de $0$ à $1$. Il y en a $4$, et on écrirait des quarts. Je compte les cases : il y en a $3$.\n⭐ $\\dfrac{4}{3}$ et $\\dfrac{5}{3}$ dépassent $1$ : la demi-droite continue après $1$.\nRéponse : L : $\\dfrac{2}{3}$ ; M : $\\dfrac{4}{3}$ ; N : $\\dfrac{5}{3}$.",
          micros: ["abscisse_fraction"],
        },
        {
          enonce: "On veut partager un segment de $15$ cm en $5$ parts égales.\na) Combien mesure chaque part ?\nb) À combien de centimètres de l'origine trace-t-on les traits ?\nc) Combien de traits faut-il tracer à l'intérieur du segment ?",
          correction:
            "a) Je partage la longueur en $5$ : $15 \\div 5 = 3$ cm.\nb) Je pars de $0$. J'ajoute $3$ cm à chaque fois : $3$ cm, $6$ cm, $9$ cm, $12$ cm.\nLe bout du segment est à $15$ cm.\nc) Les deux bouts sont déjà là. À l'intérieur, il faut $4$ traits.\n⛔ Le piège : tracer $5$ traits pour $5$ parts. À l'intérieur, il y a un trait de moins que de parts.\nRéponse : a) $3$ cm ; b) à $3$, $6$, $9$ et $12$ cm ; c) $4$ traits.",
          schema: ecranSeulement(segmentGradue(15, 5, ["0", "3 cm", "6 cm", "9 cm", "12 cm", "15 cm"])),
          micros: ["abscisse_graduer"],
        },
        {
          enonce: "Sur une demi-droite graduée de $0{,}5$ en $0{,}5$, entre quelles graduations se place chaque nombre ?\na) $1{,}2$\nb) $3{,}8$\nc) $0{,}4$\nd) $2{,}5$",
          correction:
            "Les graduations sont $0$ ; $0{,}5$ ; $1$ ; $1{,}5$ ; $2$…\nJe regarde la partie entière. Puis je compare les dixièmes à $5$ dixièmes.\na) $1{,}2$ : $2$ dixièmes, c'est moins que $5$. Il est entre $1$ et $1{,}5$.\nb) $3{,}8$ : $8$ dixièmes, c'est plus que $5$. Il est entre $3{,}5$ et $4$.\nc) $0{,}4$ est entre $0$ et $0{,}5$, tout près de $0{,}5$.\nd) $2{,}5$ tombe pile sur une graduation.\n⛔ Le piège : placer $1{,}2$ après $1{,}5$. Or $1{,}2$ est plus petit que $1{,}5$.\nRéponse : a) entre $1$ et $1{,}5$ ; b) entre $3{,}5$ et $4$ ; c) entre $0$ et $0{,}5$ ; d) sur $2{,}5$.",
          schema: ecranSeulement(
            demiDroite(0, 4, 0.5, [
              { value: 0.4, label: "0,4" },
              { value: 1.2, label: "1,2" },
              { value: 2.5, label: "2,5", color: VERT },
              { value: 3.8, label: "3,8" },
            ], { nombres: 1 }),
          ),
          micros: ["abscisse_placer"],
        },
        {
          enonce: "Voici une autre demi-droite graduée.\na) Combien vaut une graduation ?\nb) Lis l'abscisse des points P, Q et R.",
          figure: demiDroite(0, 200, 20, [
            { value: 40, label: "P" },
            { value: 120, label: "Q" },
            { value: 180, label: "R" },
          ], { nombres: 100 }),
          correction:
            "a) Entre $0$ et $100$, je compte $5$ cases.\nUne graduation vaut $100 \\div 5 = 20$.\nb) P est à $2$ graduations de l'origine : $2 \\times 20 = 40$.\nQ est à $1$ graduation après $100$ : $100 + 20 = 120$.\nR est à $1$ graduation avant $200$ : $200 - 20 = 180$.\n⛔ Le piège : croire qu'une graduation vaut toujours $1$. Ici, elle vaut $20$. Je la calcule à chaque nouvelle droite.\nRéponse : P$(40)$, Q$(120)$, R$(180)$.",
          micros: ["abscisse_lire"],
        },
        {
          enonce: "L'unité est partagée en quatre.\nPlace le point A d'abscisse $\\dfrac{5}{4}$, B d'abscisse $\\dfrac{2}{4}$, C d'abscisse $\\dfrac{7}{4}$ et D d'abscisse $\\dfrac{8}{4}$.",
          correction:
            "Une graduation vaut un quart : $\\dfrac{1}{4}$. Je compte les quarts depuis l'origine.\nB : $2$ quarts. B est au milieu de $0$ et $1$.\nA : $5$ quarts. Les $4$ premiers m'amènent à $1$. Puis encore $1$ quart.\nC : $7$ quarts. C'est $1$ et $3$ quarts : C est juste avant $2$.\nD : $8$ quarts, c'est $2$ unités. D est sur $2$.\n⛔ Le piège : chercher $\\dfrac{5}{4}$ vers $5$. Le $5$ compte des QUARTS, pas des unités.",
          schema: ecranSeulement(
            demiDroite(0, 2, 0.25, [
              { value: 0.5, label: "B" },
              { value: 1.25, label: "A" },
              { value: 1.75, label: "C" },
              { value: 2, label: "D" },
            ], { nombres: 1 }),
          ),
          micros: ["abscisse_fraction", "abscisse_placer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur un même dessin. Je lis l'échelle avant de répondre.",
      rappel: [
        "Placer un nombre : je cherche entre quels nombres écrits il tombe. Puis je compte les graduations.",
        "Après $1$, les fractions continuent : $\\dfrac{5}{4}$, c'est $1$ et encore $\\dfrac{1}{4}$.",
        "Graduer un segment : je divise sa longueur par le nombre de parts.",
      ],
      exercices: [
        {
          enonce: "Un sentier de $5$ km est dessiné comme une demi-droite graduée. Le départ est à l'origine. Chaque kilomètre est partagé en quatre.\na) Combien vaut une graduation, en km ? Écris-le en fraction, puis en décimal.\nb) À quelle distance du départ est le refuge ? Et la cascade ?\nc) Écris la distance du refuge avec une fraction.\nd) Quelle distance sépare le refuge de la cascade ?",
          figure: demiDroite(0, 5, 0.25, [
            { value: 1.75, label: "refuge" },
            { value: 3.5, label: "cascade" },
          ], { nombres: 1 }),
          correction:
            "a) Chaque kilomètre est coupé en $4$. Une graduation vaut $\\dfrac{1}{4}$ km, soit $0{,}25$ km.\nb) Le refuge est $3$ graduations après $1$ : $1 + 3 \\times 0{,}25 = 1{,}75$ km.\nLa cascade est au milieu de $3$ et $4$ : $3{,}5$ km.\nc) De l'origine au refuge, je compte $7$ quarts : $\\dfrac{7}{4}$ km.\nd) Du refuge à la cascade, je compte $7$ graduations : $7 \\times 0{,}25 = 1{,}75$ km.\n⛔ Le piège : lire $1{,}3$ km pour le refuge. Une graduation vaut un quart, pas un dixième.\nRéponse : a) $\\dfrac{1}{4}$ km $= 0{,}25$ km ; b) $1{,}75$ km et $3{,}5$ km ; c) $\\dfrac{7}{4}$ km ; d) $1{,}75$ km.",
          schema: ecranSeulement(
            demiDroite(0, 5, 0.25, [
              { value: 1.75, label: "refuge" },
              { value: 3.5, label: "cascade" },
            ], { nombres: 1, sauts: [{ de: 1.75, vers: 3.5, label: "1,75 km" }] }),
          ),
          micros: ["abscisse_lire", "abscisse_fraction"],
        },
        {
          enonce: "Sur une frise, les années sont placées sur une demi-droite graduée. Trace un morceau de frise de $1900$ à $2000$ : une graduation tous les $10$ ans.\na) Place ces trois dates : $1914$, début de la Première Guerre mondiale ; $1945$, fin de la Seconde Guerre mondiale ; $1969$, premiers pas sur la Lune.\nb) Laquelle est la plus proche de $1950$ ?",
          correction:
            "a) Une graduation vaut $10$ ans. Je cherche la dizaine de chaque date.\n$1914$ est entre $1910$ et $1920$. Il est $4$ ans après $1910$.\n$1945$ est au milieu de $1940$ et $1950$.\n$1969$ est juste avant $1970$, à $1$ an.\nb) De $1945$ à $1950$, il y a $5$ ans.\nDe $1950$ à $1969$, il y a $19$ ans.\n⛔ Le piège : poser $1914$ sur un trait. Un trait vaut $10$ ans : $1914$ est ENTRE deux traits.\nRéponse : b) $1945$, la fin de la Seconde Guerre mondiale.",
          schema: demiDroite(1900, 2000, 10, [
            { value: 1914, label: "1914" },
            { value: 1945, label: "1945" },
            { value: 1969, label: "1969" },
          ], { nombres: 20 }),
          micros: ["abscisse_placer"],
        },
        {
          enonce: "Sur cette demi-droite, l'unité est partagée en cinq parts égales.\na) Que vaut une graduation ? Donne une fraction et un décimal.\nb) Écris l'abscisse de A, B et C avec une fraction.\nc) Lesquelles sont plus grandes que $1$ ?\nd) Écris l'abscisse de C en décimal.",
          figure: demiDroite(0, 2, 0.2, [
            { value: 0.4, label: "A" },
            { value: 1.2, label: "B" },
            { value: 1.8, label: "C" },
          ], { nombres: 1 }),
          correction:
            "a) L'unité est coupée en $5$. Une graduation vaut $\\dfrac{1}{5}$.\nEt $1 \\div 5 = 0{,}2$.\nb) Je compte les cinquièmes depuis l'origine.\nA : $2$ graduations, donc $\\dfrac{2}{5}$.\nB : $6$ graduations, donc $\\dfrac{6}{5}$.\nC : $9$ graduations, donc $\\dfrac{9}{5}$.\nc) $\\dfrac{5}{5} = 1$. $\\dfrac{6}{5}$ et $\\dfrac{9}{5}$ ont plus de $5$ cinquièmes : ils dépassent $1$.\nd) $9 \\times 0{,}2 = 1{,}8$. Donc $\\dfrac{9}{5} = 1{,}8$.\n⛔ Le piège : lire $0{,}9$ pour C. Ici, l'unité n'a que $5$ cases, pas $10$.\nRéponse : A : $\\dfrac{2}{5}$ ; B : $\\dfrac{6}{5}$ ; C : $\\dfrac{9}{5} = 1{,}8$.",
          micros: ["abscisse_fraction", "abscisse_lire"],
        },
        {
          enonce: "Maëlle trace un segment de $12$ cm. Elle en fait une demi-droite graduée de $0$ à $3$. L'origine $0$ est à gauche, le nombre $3$ au bout.\na) Combien de centimètres mesure une unité ?\nb) À combien de centimètres de l'origine sont $1$ et $2$ ?\nc) Elle place A$(0{,}5)$, B$(1{,}5)$ et C$(2{,}25)$. À combien de centimètres de l'origine sont-ils ?",
          correction:
            "a) De $0$ à $3$, il y a $3$ unités dans $12$ cm.\nUne unité mesure $12 \\div 3 = 4$ cm.\nb) $1$ est à $4$ cm de l'origine. $2$ est à $2 \\times 4 = 8$ cm.\nc) Une demi-unité mesure $4 \\div 2 = 2$ cm. A est à $2$ cm.\nB : $1{,}5$ unité, c'est $4 + 2 = 6$ cm.\nC : un quart d'unité mesure $4 \\div 4 = 1$ cm. C est à $8 + 1 = 9$ cm.\n⛔ Le piège : placer A à $0{,}5$ cm. Ici, l'unité ne mesure pas $1$ cm, mais $4$ cm.\nRéponse : a) $4$ cm ; b) $4$ cm et $8$ cm ; c) A à $2$ cm, B à $6$ cm, C à $9$ cm.",
          schema: segmentGradue(12, 12, ["0", "", "", "", "1", "", "", "", "2", "", "", "", "3"], [
            { cm: 2, label: "A" },
            { cm: 6, label: "B" },
            { cm: 9, label: "C" },
          ]),
          micros: ["abscisse_graduer", "abscisse_placer"],
        },
        {
          enonce: "Tom lit cette demi-droite. Il dit : « A a pour abscisse $3$, car il est sur le 3e trait. Et B a pour abscisse $6$. »\na) Explique son erreur.\nb) Donne les vraies abscisses de A et de B.\nc) Place le point C d'abscisse $1{,}25$.",
          figure: demiDroite(0, 2, 0.25, [
            { value: 0.75, label: "A" },
            { value: 1.5, label: "B" },
          ], { nombres: 1 }),
          correction:
            "a) Tom compte les traits. Il donne le NUMÉRO du trait, pas sa valeur.\nb) De $0$ à $1$, il y a $4$ cases. Une graduation vaut $1 \\div 4 = 0{,}25$.\nA est sur le 3e trait : $3 \\times 0{,}25 = 0{,}75$.\nB est sur le 6e trait : $6 \\times 0{,}25 = 1{,}5$.\nc) $1{,}25 = 1 + 0{,}25$. C est une graduation après $1$.\n⭐ Contrôle : A est avant $1$. Son abscisse est plus petite que $1$. « $3$ » ne pouvait pas aller.\nRéponse : A$(0{,}75)$ ; B$(1{,}5)$ ; C est une graduation après $1$.",
          schema: ecranSeulement(
            demiDroite(0, 2, 0.25, [
              { value: 0.75, label: "A" },
              { value: 1.25, label: "C", color: VERT },
              { value: 1.5, label: "B" },
            ], { nombres: 1 }),
          ),
          micros: ["abscisse_lire", "abscisse_placer"],
        },
        {
          enonce: "L'unité est partagée en quatre.\na) Place A d'abscisse $\\dfrac{3}{4}$, B d'abscisse $\\dfrac{1}{2}$, C d'abscisse $\\dfrac{6}{4}$ et D d'abscisse $\\dfrac{5}{4}$.\nb) Quel point a pour abscisse $1{,}5$ ?\nc) Range les quatre abscisses dans l'ordre croissant.",
          correction:
            "a) Une graduation vaut $\\dfrac{1}{4}$.\n$\\dfrac{1}{2}$, c'est la moitié de l'unité, soit $\\dfrac{2}{4}$. B est à $2$ graduations.\nA est à $3$ graduations. D est à $5$ graduations. C est à $6$ graduations.\nb) $1{,}5$, c'est $1$ et une demi-unité. Cela fait $4 + 2 = 6$ quarts : c'est C.\nc) De gauche à droite, je lis B, A, D, C.\n⛔ Le piège : croire que $\\dfrac{1}{2}$ et $\\dfrac{2}{4}$ sont deux points. C'est le même point : la moitié de l'unité.\nRéponse : $\\dfrac{1}{2} < \\dfrac{3}{4} < \\dfrac{5}{4} < \\dfrac{6}{4}$.",
          schema: ecranSeulement(
            demiDroite(0, 2, 0.25, [
              { value: 0.5, label: "B" },
              { value: 0.75, label: "A" },
              { value: 1.25, label: "D" },
              { value: 1.5, label: "C" },
            ], { nombres: 1 }),
          ),
          micros: ["abscisse_fraction", "abscisse_placer"],
        },
        {
          enonce: "Voici le cadran d'une balance de cuisine. Il est dessiné comme une demi-droite graduée en grammes.\na) Combien de grammes vaut une graduation ?\nb) Combien pèse la farine ?\nc) On pèse ensuite $250$ g de sucre, puis $125$ g de beurre. Où s'arrête l'aiguille à chaque fois ?",
          figure: demiDroite(0, 1000, 50, [{ value: 650, label: "farine" }], { nombres: 200 }),
          correction:
            "a) Entre $0$ et $200$, je compte $4$ cases. Une graduation vaut $200 \\div 4 = 50$ g.\nb) La farine est $1$ graduation après $600$ : $600 + 50 = 650$ g.\nc) $250 = 200 + 50$. L'aiguille s'arrête sur la graduation juste après $200$.\n$125$ est au milieu de $100$ et $150$. L'aiguille s'arrête entre deux graduations.\n⛔ Le piège : croire qu'un nombre tombe toujours sur un trait. $125$ n'a pas de trait à lui.\nRéponse : a) $50$ g ; b) $650$ g ; c) sur la graduation $250$, puis entre $100$ et $150$.",
          schema: ecranSeulement(
            demiDroite(0, 1000, 50, [
              { value: 125, label: "beurre" },
              { value: 250, label: "sucre" },
              { value: 650, label: "farine" },
            ], { nombres: 200 }),
          ),
          micros: ["abscisse_lire", "abscisse_placer"],
        },
        {
          enonce: "Un jardinier pose une clôture droite de $20$ m. Il plante un piquet au début et un à la fin. Il en plante d'autres entre les deux, tous les $4$ m.\na) En combien de parts égales la clôture est-elle partagée ?\nb) Combien de piquets plante-t-il en tout ?\nc) Il préfère un piquet tous les $2$ m. Combien de parts ? Combien de piquets ?",
          correction:
            "a) Je divise la longueur par l'écart : $20 \\div 4 = 5$ parts.\nb) Les piquets sont les traits : à $0$, $4$, $8$, $12$, $16$ et $20$ m.\nCela fait $6$ piquets : un de plus que de parts.\nc) $20 \\div 2 = 10$ parts. Donc $10 + 1 = 11$ piquets.\n⛔ Le piège : répondre $5$ piquets pour $5$ parts. Avec les deux bouts, il y a un piquet de plus que de parts.\nRéponse : a) $5$ parts ; b) $6$ piquets ; c) $10$ parts et $11$ piquets.",
          schema: ecranSeulement(segmentGradue(20, 5, ["0", "4", "8", "12", "16", "20"], [], "m")),
          micros: ["abscisse_graduer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. Je lis le dessin, puis je réponds par une phrase.",
      rappel: [
        "D'abord l'échelle : où est l'origine ? Que vaut une graduation ?",
        "Je réponds avec l'unité : km, °C, cm, m.",
        "Je contrôle sur le dessin : le plus grand nombre est le plus à droite.",
      ],
      exercices: [
        {
          titre: "Le thermomètre",
          enonce: "Voici un morceau de thermomètre médical, couché. Il commence à $36$ °C.\na) Combien vaut une graduation ?\nb) Quelle est la température de Léo ?\nc) Sa sœur Jade a $37{,}2$ °C. Son père a $39{,}5$ °C. Place-les.\nd) On parle de fièvre au-dessus de $38$ °C. Qui a de la fièvre ?\ne) Le lendemain, Léo a $1{,}3$ °C de moins. Quelle est sa température ?",
          figure: demiDroite(36, 40, 0.1, [{ value: 38.6, label: "Léo" }], { nombres: 1 }),
          correction:
            "a) Entre $36$ et $37$, je compte $10$ cases. Une graduation vaut $0{,}1$ °C : un dixième de degré.\nb) Léo est $6$ graduations après $38$ : $38{,}6$ °C.\nc) Jade est $2$ graduations après $37$. Le père est au milieu de $39$ et $40$.\nd) $38{,}6 > 38$ et $39{,}5 > 38$ : Léo et son père ont de la fièvre.\nJade, à $37{,}2$ °C, n'a pas de fièvre.\ne) $1{,}3$ °C, c'est $13$ graduations. Je recule de $13$ graduations depuis $38{,}6$.\n$10$ graduations m'amènent à $37{,}6$. Encore $3$ : $37{,}3$ °C.\n⛔ Le piège : lire $38{,}06$ pour Léo. $6$ graduations, ce sont $6$ DIXIÈMES : $38{,}6$.\nRéponse : a) $0{,}1$ °C ; b) $38{,}6$ °C ; d) Léo et son père ; e) $37{,}3$ °C.",
          schema: ecranSeulement(
            demiDroite(36, 40, 0.1, [
              { value: 37.2, label: "Jade" },
              { value: 38.6, label: "Léo" },
              { value: 39.5, label: "père", color: ORANGE },
            ], { nombres: 1, sauts: [{ de: 38.6, vers: 37.3, label: "−1,3" }] }),
          ),
          micros: ["abscisse_lire", "abscisse_placer"],
        },
        {
          titre: "Le ruban de la couturière",
          enonce: "Samia a un ruban de $1$ m, soit $100$ cm. Elle veut le couper en $8$ morceaux égaux.\na) Combien mesure chaque morceau ?\nb) Elle marque chaque coupe au crayon. Combien de marques fait-elle ?\nc) À combien de centimètres du bout est la marque des $\\dfrac{3}{8}$ du ruban ? Et celle de la moitié ?\nd) Elle coupe $3$ morceaux. Quelle fraction du ruban reste-t-il ?",
          correction:
            "a) Je divise la longueur par $8$ : $100 \\div 8 = 12{,}5$ cm.\nJe vérifie : $8 \\times 12{,}5 = 100$.\nb) Les deux bouts ne se coupent pas. Il faut $8 - 1 = 7$ marques.\nc) $\\dfrac{3}{8}$, ce sont $3$ morceaux : $3 \\times 12{,}5 = 37{,}5$ cm.\nLa moitié, c'est $\\dfrac{4}{8}$ : $4 \\times 12{,}5 = 50$ cm.\nd) Il reste $8 - 3 = 5$ morceaux. C'est $\\dfrac{5}{8}$ du ruban.\n⛔ Le piège : faire $8$ marques pour $8$ morceaux. Il y a une marque de moins que de morceaux.\nRéponse : a) $12{,}5$ cm ; b) $7$ marques ; c) $37{,}5$ cm et $50$ cm ; d) $\\dfrac{5}{8}$.",
          schema: ecranSeulement(segmentGradue(100, 8, ["0", "", "", "3/8", "4/8", "", "", "", "1"], [{ cm: 37.5, label: "37,5 cm" }])),
          micros: ["abscisse_graduer", "abscisse_fraction"],
        },
        {
          titre: "Le saut en longueur",
          enonce: "Au saut en longueur, on mesure les sauts en mètres. Voici un morceau de demi-droite graduée, de $4$ m à $6$ m.\na) Combien vaut une graduation ? Écris-le en m, puis en cm.\nb) Lis la longueur des sauts de Nina et de Kylian.\nc) Sofia saute $5{,}05$ m. Entre quelles graduations se place-t-elle ?\nd) Range les trois sauts, du plus long au plus court.\ne) Kylian vise $5{,}5$ m. Combien de centimètres lui manque-t-il ?",
          figure: demiDroite(4, 6, 0.1, [
            { value: 4.8, label: "Nina" },
            { value: 5.3, label: "Kylian" },
          ], { nombres: 0.5 }),
          correction:
            "a) Entre $4$ et $4{,}5$, je compte $5$ cases. Une graduation vaut $0{,}5 \\div 5 = 0{,}1$ m, soit $10$ cm.\nb) Nina est $3$ graduations après $4{,}5$ : $4{,}8$ m.\nKylian est $3$ graduations après $5$ : $5{,}3$ m.\nc) $5{,}05$ est entre $5$ et $5{,}1$, au milieu. Il n'a pas de trait à lui.\nd) Le plus à droite est le plus long : $5{,}3 > 5{,}05 > 4{,}8$.\ne) De $5{,}3$ à $5{,}5$, je compte $2$ graduations : $2 \\times 10 = 20$ cm.\n⛔ Le piège : croire que $5{,}05$ bat $5{,}3$ parce qu'il a plus de chiffres. Sur la droite, Sofia est avant Kylian.\nRéponse : a) $0{,}1$ m $= 10$ cm ; b) $4{,}8$ m et $5{,}3$ m ; c) entre $5$ et $5{,}1$ ; d) Kylian, Sofia, Nina ; e) $20$ cm.",
          schema: ecranSeulement(
            demiDroite(4, 6, 0.1, [
              { value: 4.8, label: "Nina" },
              { value: 5.05, label: "Sofia", color: VERT },
              { value: 5.3, label: "Kylian" },
            ], { nombres: 0.5, sauts: [{ de: 5.3, vers: 5.5, label: "20 cm" }] }),
          ),
          micros: ["abscisse_lire", "abscisse_placer"],
        },
        {
          titre: "Le nombre mystère",
          enonce: "Je suis l'abscisse d'un point de cette demi-droite. Je tombe sur une graduation.\nIndice 1 : je suis entre $2$ et $3$.\nIndice 2 : je suis plus près de $3$ que de $2$.\nIndice 3 : mon chiffre des dixièmes est pair.\nIndice 4 : entre moi et $3$, il y a une seule graduation.\na) Quels nombres respectent les indices 1 et 2 ?\nb) Lesquels respectent aussi l'indice 3 ?\nc) Qui suis-je ? Écris-moi en décimal, puis en fraction.",
          figure: demiDroite(2, 3, 0.1, [], { nombres: 0.5 }),
          correction:
            "Entre $2$ et $2{,}5$, il y a $5$ cases. Une graduation vaut $0{,}1$.\na) Plus près de $3$ que de $2$ : après le milieu, $2{,}5$. Il reste $2{,}6$ ; $2{,}7$ ; $2{,}8$ ; $2{,}9$.\nb) Dixièmes pairs : $2{,}6$ et $2{,}8$.\nc) Entre $2{,}6$ et $3$, il y a trois graduations : $2{,}7$, $2{,}8$, $2{,}9$.\nEntre $2{,}8$ et $3$, il y en a une seule : $2{,}9$.\nJe suis $2{,}8$. C'est $28$ dixièmes : $\\dfrac{28}{10}$.\n⛔ Le piège : garder $2{,}5$ au a). Au milieu, on est aussi près de $2$ que de $3$.\nRéponse : je suis $2{,}8 = \\dfrac{28}{10}$.",
          schema: ecranSeulement(
            demiDroite(2, 3, 0.1, [
              { value: 2.6, label: "2,6", color: ROUGE },
              { value: 2.8, label: "2,8", color: VERT },
            ], { nombres: 0.5 }),
          ),
          micros: ["abscisse_lire", "abscisse_fraction"],
        },
      ],
    },
  ],
};
