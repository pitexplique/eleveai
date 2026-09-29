// ─── Fiche d'exercices : les nombres relatifs (5e) — 20 exercices corrigés ─────
//
// ⭐ LA FEUILLE ÉTALON DU LOT DE 5e (29/09/2026). Frédéric : « je préfère
// compléter les fiches d'exercices pour tous les niveaux ». Les dix-sept autres
// feuilles de 5e suivent sa forme : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-nombres-relatifs.tsx` et sur
// la banque `lib/tutor-v4/questionBank/5e/maths/nombres-relatifs.bank.ts`,
// notionId relatif_nombre : lire, signe, comparer, placer, opposé, distance à
// zéro (valeur absolue), défis.
// ⛔ LIMITES DE LA 5e : ici on LIT, on PLACE et on COMPARE. Aucune opération
// écrite (c'est la notion relatif_operation) — les deux déplacements des
// exercices 18 et 19 de la fiche de cours se font en COMPTANT sur l'axe, comme
// dans son défi. Rien des produits de relatifs (4e).
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni −3 °C au volcan, ni
// −1 contre +6, ni A(−3), ni l'opposé de −7, ni |−5|, ni −4 contre −7.
//
// Les pièges nommés : oublier le signe moins (1), croire −0,5 positif parce
// qu'il est près de zéro (2), compter les graduations comme des unités (3, 11),
// placer −0,5 à droite de zéro (4), −6 < −9 « parce que 6 < 9 » (5, 20),
// l'opposé toujours négatif (6, 13), une distance négative (7), commencer par
// le négatif le plus proche de zéro (8, 9, 10), −3,05 contre −3,5 (15), oublier
// les bornes et zéro dans une liste d'entiers (16), le rez-de-chaussée oublié
// en comptant les étages (18), « comprise entre » lu avec les bornes (19).
//
// Les dates de l'exercice 14 sont celles des manuels d'histoire : premiers Jeux
// olympiques antiques en 776 av. J.-C. (date traditionnelle), Alésia en 52 av.
// J.-C., fin de l'Empire romain d'Occident en 476, couronnement de Charlemagne
// en 800. Tout le reste (températures, club de foot, golf, immeuble, île) est
// un MODÈLE, à l'ordre de grandeur réel.
//
// ⭐ LES DESSINS : une droite graduée horizontale (`droiteRel`, avec des arcs
// pour les distances et les déplacements) et un axe VERTICAL (`axeVertical`)
// pour ce qui monte et descend pour de vrai — étages, altitudes, classement.
// Aucun canvas du coach ne dessine un saut : ce sont les deux SVG de la feuille
// des relatifs de 4e, avec une graduation fine sans nombre (`nombres`).
// 14 dessins imprimés ; ceux qui redisent le corrigé mot pour mot sont
// `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je regarde le signe »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-relatif-nombre.mjs`.
//
// Micro-compétences : relatif_lire (1, 3, 9, 10, 11, 14, 17, 18, 20),
// relatif_signe (2, 9, 10, 20), relatif_comparer (5, 8, 9, 10, 13, 14, 15, 16,
// 17, 19, 20), relatif_placer (3, 4, 11, 16), relatif_oppose (6, 11, 12, 13,
// 17, 18, 20), relatif_valeur_absolue (7, 12, 13, 14, 17, 18, 19),
// relatif_defi (12, 13, 16, 18, 19, 20). 7/7.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, tableau } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

type Point = { value: number; label: string; color?: string };
type Saut = { de: number; vers: number; label: string };

/** −1 000, 4,5 : un nombre écrit comme au tableau (texte NU, pas de KaTeX en SVG). */
const ecrit = (v: number) => {
  const [e, d] = String(Math.abs(v)).split(".");
  return (v < 0 ? "−" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * Une droite graduée HORIZONTALE : une graduation tous les `pas`, un nombre
 * tous les `nombres` (par défaut à chaque graduation), des points nommés SOUS
 * les nombres, et des arcs fléchés (`sauts`) : vert vers la droite, rouge vers
 * la gauche. Les étiquettes de points descendent d'une rangée quand elles se
 * touchent. ⛔ Onze nombres écrits au plus : 300 de large, lisibles à 375 px.
 */
const droiteRel = (min: number, max: number, pas: number, points: Point[], opts: { sauts?: Saut[]; nombres?: number } = {}) => {
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
    // Une étiquette ne sort pas du dessin : au bord, elle rentre (« Charlemagne » à 800 sur 1 000).
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
  return (
    <div className="mx-auto w-full max-w-[20rem] overflow-x-auto print:max-w-[14rem] print:overflow-visible">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Droite graduée">
        <line x1={marge - 12} y1={Y} x2={W - marge + 12} y2={Y} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
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
 * Un axe VERTICAL gradué : étages, altitudes, classement. Les nombres à
 * gauche, les points nommés à droite (écartés de 16 au moins), les flèches de
 * déplacement plus à droite encore, une colonne chacune.
 */
const axeVertical = (min: number, max: number, pas: number, points: Point[], fleches: Saut[] = []) => {
  const W = 290;
  const H = 250;
  const X = 64;
  const [haut, bas] = [16, 16];
  const y = (v: number) => haut + ((max - v) / (max - min)) * (H - haut - bas);
  const ticks: number[] = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) ticks.push(Math.round((min + k * pas) * 1e6) / 1e6);
  const ordre = points.map((p, i) => ({ i, ty: y(p.value) + 4 })).sort((a, b) => a.ty - b.ty);
  // ⛔ 18 d'écart en police 14 : à 16, les boîtes se touchaient de 3 px (mesuré le 29/09).
  ordre.forEach((o, k) => {
    if (k > 0) o.ty = Math.max(o.ty, ordre[k - 1].ty + 18);
  });
  const tyDe = new Map(ordre.map((o) => [o.i, o.ty]));
  // Les étiquettes poussées vers le bas agrandissent le dessin plutôt que d'en sortir.
  const Hsvg = Math.max(H, (ordre.length ? ordre[ordre.length - 1].ty : 0) + 8);
  return (
    <div className="mx-auto w-full max-w-[18rem] overflow-x-auto print:max-w-[13rem] print:overflow-visible">
      <svg viewBox={`0 0 ${W} ${Hsvg}`} className="block h-auto w-full" role="img" aria-label="Axe gradué vertical">
        <line x1={X} y1={H - 6} x2={X} y2={6} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
        <path d={`M ${X - 5} 14 L ${X} 6 L ${X + 5} 14`} fill="none" stroke={NOIR} strokeWidth={2} />
        {ticks.map((t) => (
          <g key={t}>
            <line x1={X - 6} y1={y(t)} x2={X + 6} y2={y(t)} stroke={NOIR} strokeWidth={1.8} />
            <text x={X - 10} y={y(t) + 4} textAnchor="end" fontSize="14" fontWeight="700" fill={t === 0 ? ROUGE : NOIR}>
              {ecrit(t)}
            </text>
          </g>
        ))}
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={X} cy={y(p.value)} r={5} fill={p.color ?? BLEU} />
            <line x1={X + 6} y1={y(p.value)} x2={X + 12} y2={(tyDe.get(i) ?? 0) - 4} stroke={p.color ?? BLEU} strokeWidth={1.2} />
            <text x={X + 14} y={tyDe.get(i)} fontSize="14" fontWeight="900" fill={p.color ?? BLEU}>
              {p.label}
            </text>
          </g>
        ))}
        {fleches.map((f, i) => {
          const fx = 216 + 38 * i;
          const [y1, y2] = [y(f.de), y(f.vers)];
          const c = f.vers >= f.de ? VERT : ROUGE;
          const s = y2 < y1 ? 1 : -1;
          return (
            <g key={`f${i}`}>
              <line x1={fx} y1={y1} x2={fx} y2={y2} stroke={c} strokeWidth={2.6} />
              <line x1={fx - 5} y1={y1} x2={fx + 5} y2={y1} stroke={c} strokeWidth={2} />
              <path d={`M ${fx - 5} ${y2 + 8 * s} L ${fx} ${y2} L ${fx + 5} ${y2 + 8 * s}`} fill="none" stroke={c} strokeWidth={2.4} />
              <text x={fx + 6} y={(y1 + y2) / 2 + 4} fontSize="14" fontWeight="900" fill={c} stroke="white" strokeWidth="3" paintOrder="stroke">
                {f.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

export const exercicesRelatifNombre5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "relatif-nombre",
  titre: "Les nombres relatifs",
  accroche:
    "Vingt exercices, du geste seul au problème : écrire un relatif, reconnaître son signe, le lire et le placer sur une droite graduée, comparer et ranger, trouver l'opposé et la distance à zéro. Des températures, un classement de football, une frise de l'Antiquité, un tournoi de golf, un ascenseur, la coupe d'une île. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et la droite graduée dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/relatif-nombre", titre: "Les nombres relatifs" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je regarde le signe avant tout le reste.",
      rappel: [
        "Un nombre relatif a un signe et une distance à zéro. Négatif : signe moins, à gauche de zéro. Positif : à droite, le signe plus peut s'écrire ou non.",
        "Zéro n'est ni positif ni négatif : c'est la frontière.",
        "Sur une droite graduée, le plus grand est le plus à droite. Entre deux négatifs, le plus grand est le plus proche de zéro.",
        "L'opposé d'un nombre : même distance à zéro, de l'autre côté. La distance à zéro (on dit aussi la valeur absolue) n'a jamais de signe moins.",
      ],
      exercices: [
        {
          enonce:
            "Écris chaque information avec un nombre relatif.\na) Une épave repose à $12$ m sous le niveau de la mer.\nb) Un club gagne $35$ € à sa tombola.\nc) Il fait $4{,}5$ degrés en dessous de zéro.\nd) L'ascenseur s'arrête au troisième étage.\ne) La voiture est garée au deuxième sous-sol.",
          correction:
            "Je cherche d'abord le signe : au-dessus, un gain, un étage, c'est positif ; au-dessous, une perte, un sous-sol, c'est négatif.\na) Sous le niveau de la mer : négatif. L'épave est à $-12$ m.\nb) Un gain : positif. Le club gagne $+35$ €.\nc) En dessous de zéro : négatif. Il fait $-4{,}5$ °C.\nd) Au-dessus du rez-de-chaussée : positif. C'est l'étage $+3$.\ne) Sous le rez-de-chaussée : négatif. C'est l'étage $-2$.\n⛔ Le piège : oublier le signe moins et écrire $4{,}5$ °C au c). Sans son signe, la température serait au-dessus de zéro : ce n'est plus le même temps.\nRéponse : a) $-12$ ; b) $+35$ ; c) $-4{,}5$ ; d) $+3$ ; e) $-2$.",
          schema: ecranSeulement(
            table(["l'information", "signe", "relatif"], [
              ["sous la mer", "−", "−12"],
              ["un gain", "+", "+35"],
              ["sous zéro", "−", "−4,5"],
              ["un étage", "+", "+3"],
              ["un sous-sol", "−", "−2"],
            ]),
          ),
          micros: ["relatif_lire"],
        },
        {
          enonce: "Pour chaque nombre, dis s'il est positif, négatif, ou ni l'un ni l'autre.\n$-7$ ; $3{,}2$ ; $0$ ; $-0{,}5$ ; $+8$ ; $-1$",
          correction:
            "Un nombre négatif porte le signe moins : il est à gauche de zéro.\nUn nombre positif est à droite de zéro. Son signe plus peut s'écrire ou non : $3{,}2$ et $+3{,}2$, c'est le même nombre.\nNégatifs : $-7$, $-0{,}5$ et $-1$.\nPositifs : $3{,}2$ et $+8$.\n$0$ n'est ni positif ni négatif : c'est la frontière entre les deux.\n⛔ Le piège : croire que $-0{,}5$ est positif parce qu'il est « tout près de zéro ». Il est à gauche de zéro : il est négatif.",
          schema: ecranSeulement(
            droiteRel(-8, 8, 1, [
              { value: -7, label: "−7", color: ROUGE },
              { value: -1, label: "−1", color: ROUGE },
              { value: -0.5, label: "−0,5", color: ROUGE },
              { value: 3.2, label: "3,2" },
              { value: 8, label: "+8" },
            ], { nombres: 2 }),
          ),
          micros: ["relatif_signe"],
        },
        {
          enonce: "Voici une droite graduée.\na) Combien vaut une graduation ?\nb) Lis l'abscisse des points A, B, C et D.",
          figure: droiteRel(-3, 3, 0.5, [
            { value: -2.5, label: "A" },
            { value: -1, label: "B" },
            { value: 0.5, label: "C" },
            { value: 2.5, label: "D" },
          ], { nombres: 1 }),
          correction:
            "a) Entre $0$ et $1$, il y a deux petits intervalles. Une graduation vaut donc $1 \\div 2 = 0{,}5$.\nb) Je pars de zéro et je compte les graduations, $0{,}5$ par $0{,}5$.\nA est à gauche de zéro, à cinq graduations : $5 \\times 0{,}5 = 2{,}5$. Donc A a pour abscisse $-2{,}5$.\nB est sur le nombre $-1$ : son abscisse est $-1$.\nC est à une graduation à droite de zéro : $0{,}5$.\nD est à cinq graduations à droite : $2{,}5$.\n⛔ Le piège : compter chaque graduation pour $1$ et lire $-5$ pour A. Je regarde toujours d'abord ce que vaut une graduation.\n⭐ A et D sont à la même distance de zéro, de part et d'autre : leurs abscisses sont opposées.\nRéponse : A$(-2{,}5)$, B$(-1)$, C$(0{,}5)$, D$(2{,}5)$.",
          micros: ["relatif_lire", "relatif_placer"],
        },
        {
          enonce: "Trace une droite graduée de $-4$ à $5$, en prenant deux carreaux pour une unité. Place les points $E(-3)$, $F(1{,}5)$, $G(-0{,}5)$ et $H(4)$.",
          correction:
            "Je place zéro, puis je gradue : deux carreaux pour une unité, donc un carreau pour $0{,}5$.\nE : $-3$ est négatif, je vais à gauche de zéro de $3$ unités, soit $6$ carreaux.\nF : $1{,}5$ est positif, je vais à droite d'une unité et demie, soit $3$ carreaux.\nG : $-0{,}5$ est négatif, je vais à gauche d'une demi-unité, soit $1$ carreau. G est entre $-1$ et $0$.\nH : $4$ unités à droite, soit $8$ carreaux.\n⛔ Le piège : placer G entre $0$ et $1$ en ne lisant que « $0{,}5$ ». Le signe moins l'envoie à gauche de zéro.",
          schema: droiteRel(-4, 5, 0.5, [
            { value: -3, label: "E", color: ROUGE },
            { value: -0.5, label: "G", color: ROUGE },
            { value: 1.5, label: "F" },
            { value: 4, label: "H" },
          ], { nombres: 1 }),
          micros: ["relatif_placer"],
        },
        {
          enonce: "Complète par $<$ ou $>$.\na) $-8$ … $3$\nb) $-6$ … $-9$\nc) $-2{,}5$ … $-2$\nd) $0$ … $-0{,}1$",
          correction:
            "Sur la droite graduée, le plus grand est le plus à droite.\na) Un négatif est toujours plus petit qu'un positif : $-8 < 3$.\nb) Deux négatifs : le plus grand est le plus proche de zéro. $-6$ est plus proche de zéro que $-9$, donc $-6 > -9$.\nc) $-2$ est plus proche de zéro que $-2{,}5$, donc $-2{,}5 < -2$.\nd) Tout négatif est plus petit que zéro : $0 > -0{,}1$.\n⛔ Le piège : écrire $-6 < -9$ au b), « parce que $6 < 9$ ». Chez les négatifs, c'est l'inverse : plus on s'éloigne de zéro vers la gauche, plus le nombre est petit.\nRéponse : a) $<$ ; b) $>$ ; c) $<$ ; d) $>$.",
          schema: ecranSeulement(
            droiteRel(-10, 0, 1, [
              { value: -9, label: "−9", color: ROUGE },
              { value: -6, label: "−6 le plus grand", color: VERT },
            ]),
          ),
          micros: ["relatif_comparer"],
        },
        {
          enonce: "Donne l'opposé de chaque nombre.\na) $-13$\nb) $7{,}2$\nc) $-0{,}6$\nd) $0$",
          correction:
            "L'opposé d'un nombre est à la même distance de zéro, de l'autre côté. Je change seulement le signe.\na) L'opposé de $-13$ est $13$.\nb) L'opposé de $7{,}2$ est $-7{,}2$.\nc) L'opposé de $-0{,}6$ est $0{,}6$.\nd) L'opposé de $0$ est $0$ : c'est le seul nombre qui est son propre opposé.\n⛔ Le piège : croire que l'opposé d'un nombre est toujours négatif. L'opposé de $-13$ est positif.\nRéponse : a) $13$ ; b) $-7{,}2$ ; c) $0{,}6$ ; d) $0$.",
          schema: ecranSeulement(
            droiteRel(-15, 15, 5, [
              { value: -13, label: "−13", color: ROUGE },
              { value: 13, label: "13" },
            ], { sauts: [{ de: 0, vers: -13, label: "13" }, { de: 0, vers: 13, label: "13" }] }),
          ),
          micros: ["relatif_oppose"],
        },
        {
          enonce: "Donne la distance à zéro de chaque nombre.\na) $-9$\nb) $4$\nc) $-3{,}5$\nd) $0$",
          correction:
            "La distance à zéro compte les unités entre le nombre et zéro. C'est une distance : elle n'a jamais de signe moins.\na) De $-9$ à $0$, il y a $9$ unités. La distance à zéro de $-9$ est $9$.\nb) De $0$ à $4$ : $4$.\nc) De $-3{,}5$ à $0$ : $3{,}5$.\nd) $0$ est sur zéro : sa distance à zéro est $0$.\n⛔ Le piège : répondre $-9$ au a). Une distance ne peut pas être négative, pas plus qu'une longueur.\n⭐ $-9$ et $9$ ont la même distance à zéro : ils sont opposés.\nRéponse : a) $9$ ; b) $4$ ; c) $3{,}5$ ; d) $0$.",
          schema: ecranSeulement(
            droiteRel(-10, 6, 1, [
              { value: -9, label: "−9", color: ROUGE },
              { value: -3.5, label: "−3,5", color: ROUGE },
              { value: 4, label: "4" },
            ], { nombres: 2, sauts: [{ de: 0, vers: -9, label: "9" }, { de: 0, vers: -3.5, label: "3,5" }, { de: 0, vers: 4, label: "4" }] }),
          ),
          micros: ["relatif_valeur_absolue"],
        },
        {
          enonce: "Range ces nombres dans l'ordre croissant.\n$2$ ; $-5$ ; $-1{,}5$ ; $0$ ; $-7$ ; $3{,}5$",
          correction:
            "Croissant : du plus petit au plus grand, donc de gauche à droite sur la droite graduée.\nD'abord les négatifs, du plus loin de zéro au plus proche : $-7$, puis $-5$, puis $-1{,}5$.\nPuis zéro, puis les positifs : $0$, $2$, $3{,}5$.\n⛔ Le piège : commencer par $-1{,}5$, le négatif le plus proche de zéro. Le plus petit de tous est le plus loin à gauche : $-7$.\nRéponse : $-7 < -5 < -1{,}5 < 0 < 2 < 3{,}5$.",
          schema: droiteRel(-8, 4, 1, [
            { value: -7, label: "−7", color: ROUGE },
            { value: -5, label: "−5", color: ROUGE },
            { value: -1.5, label: "−1,5", color: ROUGE },
            { value: 2, label: "2" },
            { value: 3.5, label: "3,5" },
          ], { nombres: 2 }),
          micros: ["relatif_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur une même situation. Je dessine la droite graduée au brouillon avant de répondre.",
      rappel: [
        "Ranger dans l'ordre croissant : du plus petit au plus grand. Décroissant : du plus grand au plus petit.",
        "Pour comparer deux négatifs, je compare leurs distances à zéro : le plus loin de zéro est le plus petit.",
        "Pour lire une abscisse, je cherche d'abord combien vaut UNE graduation.",
      ],
      exercices: [
        {
          enonce:
            "Voici les températures relevées à 8 h pendant une semaine de février, dans une ville de l'est de la France.\na) Quel jour a-t-il fait le plus froid ? Le plus chaud ?\nb) Quels jours la température était-elle en dessous de zéro ?\nc) Range les cinq températures dans l'ordre décroissant.",
          figure: tableau(["jour", "lun.", "mar.", "mer.", "jeu.", "ven."], ["°C", -3, 2, -6, 0, -1.5], true),
          correction:
            "Je place les cinq températures sur un axe vertical, comme un thermomètre : plus c'est haut, plus il fait chaud.\na) La plus basse est $-6$ °C : le mercredi est le jour le plus froid. La plus haute est $2$ °C : le mardi est le plus chaud.\nb) En dessous de zéro, ce sont les négatifs : lundi ($-3$ °C), mercredi ($-6$ °C) et vendredi ($-1{,}5$ °C). Jeudi, à $0$ °C, il ne faisait ni au-dessus ni en dessous de zéro.\nc) Décroissant : du plus grand au plus petit, du haut vers le bas du thermomètre.\n⛔ Le piège : écrire $-1{,}5$ avant $0$. Zéro est plus grand que tous les négatifs.\nRéponse : $2 > 0 > -1{,}5 > -3 > -6$.",
          schema: axeVertical(-7, 3, 1, [
            { value: 2, label: "mar. 2" },
            { value: 0, label: "jeu. 0", color: NOIR },
            { value: -1.5, label: "ven. −1,5", color: ROUGE },
            { value: -3, label: "lun. −3", color: ROUGE },
            { value: -6, label: "mer. −6", color: ROUGE },
          ]),
          micros: ["relatif_comparer", "relatif_lire", "relatif_signe"],
        },
        {
          enonce:
            "Au football, la « différence de buts » d'une équipe, c'est le nombre de buts marqués moins le nombre de buts encaissés. Voici celles de cinq équipes d'un championnat : les Aigles $+7$ ; les Loups $-3$ ; les Ours $0$ ; les Lynx $-11$ ; les Faucons $+2$.\na) Quelles équipes ont encaissé plus de buts qu'elles n'en ont marqué ?\nb) Range les équipes de la meilleure différence de buts à la moins bonne.\nc) Les Loups et les Lynx ont le même nombre de points. Au classement, c'est la meilleure différence de buts qui passe devant. Laquelle est devant ?",
          correction:
            "a) Une équipe qui encaisse plus qu'elle ne marque a une différence NÉGATIVE : ce sont les Loups ($-3$) et les Lynx ($-11$). Les Ours, à $0$, ont marqué autant qu'ils ont encaissé.\nb) La meilleure différence est la plus grande : je range dans l'ordre décroissant, du haut vers le bas de l'axe.\n$+7 > +2 > 0 > -3 > -11$ : les Aigles, les Faucons, les Ours, les Loups, les Lynx.\nc) Je compare $-3$ et $-11$ : deux négatifs, le plus proche de zéro est le plus grand. $-3 > -11$.\nRéponse : les Loups passent devant les Lynx.\n⛔ Le piège : croire que $-11$ est « meilleur » parce que $11$ est plus grand que $3$. Une différence de $-11$, c'est onze buts de plus encaissés que marqués.",
          schema: axeVertical(-12, 8, 2, [
            { value: 7, label: "Aigles +7" },
            { value: 2, label: "Faucons +2" },
            { value: 0, label: "Ours 0", color: NOIR },
            { value: -3, label: "Loups −3", color: ROUGE },
            { value: -11, label: "Lynx −11", color: ROUGE },
          ]),
          micros: ["relatif_comparer", "relatif_lire", "relatif_signe"],
        },
        {
          enonce: "Sur cette droite graduée, l'unité est partagée en cinq.\na) Combien vaut une graduation ?\nb) Lis l'abscisse des points K, L, M et N.\nc) Le point P a pour abscisse l'opposé de celle de L. Où est-il ?",
          figure: droiteRel(-1, 1, 0.2, [
            { value: -0.6, label: "K" },
            { value: -0.2, label: "M" },
            { value: 0.4, label: "L" },
            { value: 0.8, label: "N" },
          ], { nombres: 1 }),
          correction:
            "a) L'unité, de $0$ à $1$, est partagée en cinq : une graduation vaut $1 \\div 5 = 0{,}2$.\nb) Je compte les graduations depuis zéro, $0{,}2$ par $0{,}2$.\nK est à trois graduations à gauche de zéro : $3 \\times 0{,}2 = 0{,}6$, donc K a pour abscisse $-0{,}6$.\nM est à une graduation à gauche : $-0{,}2$.\nL est à deux graduations à droite : $0{,}4$.\nN est à quatre graduations à droite : $0{,}8$.\nc) L'opposé de $0{,}4$ est $-0{,}4$. P est à deux graduations à GAUCHE de zéro, entre K et M.\n⛔ Le piège : croire qu'une graduation vaut $0{,}1$, par habitude. Ici on compte cinq intervalles dans l'unité, pas dix.\nRéponse : K$(-0{,}6)$, M$(-0{,}2)$, L$(0{,}4)$, N$(0{,}8)$ et P$(-0{,}4)$.",
          micros: ["relatif_lire", "relatif_placer", "relatif_oppose"],
        },
        {
          enonce: "Recopie et complète le tableau. À la dernière ligne, il y a deux réponses possibles : trouve-les toutes les deux.",
          figure: table(["nombre", "son opposé", "sa distance à zéro"], [
            ["−4,2", "…", "…"],
            ["15", "…", "…"],
            ["…", "−8", "…"],
            ["…", "…", "6"],
          ]),
          correction:
            "L'opposé : je change le signe. La distance à zéro : je garde le nombre sans son signe.\nLigne 1 : l'opposé de $-4{,}2$ est $4{,}2$ ; sa distance à zéro est $4{,}2$.\nLigne 2 : l'opposé de $15$ est $-15$ ; sa distance à zéro est $15$.\nLigne 3 : le nombre dont l'opposé est $-8$, c'est $8$ ; sa distance à zéro est $8$.\nLigne 4 : deux nombres sont à $6$ unités de zéro : $6$ et $-6$. Si le nombre est $6$, son opposé est $-6$ ; si c'est $-6$, son opposé est $6$.\n⛔ Le piège : confondre l'opposé et la distance à zéro. L'opposé de $-4{,}2$ et sa distance à zéro valent tous les deux $4{,}2$ ; mais pour $15$, l'opposé est $-15$ et la distance $15$.\n⭐ Deux nombres opposés ont toujours la même distance à zéro.",
          micros: ["relatif_oppose", "relatif_valeur_absolue", "relatif_defi"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifie avec la droite graduée ou avec un exemple.\na) $-12 < -10$.\nb) Un nombre négatif est toujours plus petit qu'un nombre positif.\nc) L'opposé d'un nombre est toujours négatif.\nd) Deux nombres qui ont la même distance à zéro sont égaux.",
          correction:
            "a) Vrai. $-12$ est plus loin de zéro que $-10$, à gauche : il est plus petit.\nb) Vrai. Un négatif est à gauche de zéro, un positif à droite : le positif est toujours plus à droite.\nc) Faux. Contre-exemple : l'opposé de $-4$ est $4$, qui est positif.\nd) Faux. Contre-exemple : $5$ et $-5$ sont tous les deux à $5$ unités de zéro, mais ils ne sont pas égaux : ils sont opposés.\n⛔ Le piège du c) : croire que « opposé » veut dire « négatif ». L'opposé change le côté, dans un sens comme dans l'autre.\nRéponse : a) vrai ; b) vrai ; c) faux ; d) faux.",
          schema: ecranSeulement(
            droiteRel(-12, 6, 1, [
              { value: -12, label: "−12", color: ROUGE },
              { value: -10, label: "−10", color: ROUGE },
              { value: -5, label: "−5", color: ROUGE },
              { value: 5, label: "5" },
            ], { nombres: 3 }),
          ),
          micros: ["relatif_comparer", "relatif_oppose", "relatif_valeur_absolue", "relatif_defi"],
        },
        {
          enonce:
            "Sur une frise chronologique, on compte les années à partir de la naissance de Jésus-Christ. Une date « avant J.-C. » s'écrit avec un nombre négatif.\nPremiers Jeux olympiques antiques : $776$ av. J.-C.\nBataille d'Alésia : $52$ av. J.-C.\nFin de l'Empire romain d'Occident : $476$.\nCouronnement de Charlemagne : $800$.\na) Écris chaque date avec un nombre relatif.\nb) Range les quatre événements du plus ancien au plus récent.\nc) Quel événement est le plus proche de zéro sur la frise ?",
          correction:
            "a) Avant J.-C. : négatif. Les Jeux olympiques : $-776$. Alésia : $-52$. Après J.-C. : positif. Fin de l'Empire romain d'Occident : $476$. Charlemagne : $800$.\nb) Le plus ancien est le plus à gauche sur la frise, c'est-à-dire le plus petit nombre.\nEntre $-776$ et $-52$ : $-776$ est plus loin de zéro, il est plus petit. Les Jeux olympiques sont donc plus anciens qu'Alésia.\n$-776 < -52 < 476 < 800$.\nc) Je compare les distances à zéro : $776$ ; $52$ ; $476$ ; $800$. La plus petite est $52$.\n⛔ Le piège : ranger Alésia avant les Jeux olympiques parce que $52 < 776$. Avant J.-C., plus le nombre est grand, plus c'est ANCIEN.\nRéponse : b) les Jeux olympiques, Alésia, la fin de l'Empire romain, Charlemagne ; c) la bataille d'Alésia.",
          schema: droiteRel(-1000, 1000, 250, [
            { value: -776, label: "JO", color: ROUGE },
            { value: -52, label: "Alésia", color: ROUGE },
            { value: 476, label: "Rome" },
            { value: 800, label: "Charlemagne" },
          ], { nombres: 500 }),
          micros: ["relatif_lire", "relatif_comparer", "relatif_valeur_absolue"],
        },
        {
          enonce: "Range ces nombres dans l'ordre décroissant.\n$-3{,}05$ ; $-3{,}5$ ; $-3$ ; $-3{,}45$ ; $-3{,}4$",
          correction:
            "Ce sont cinq négatifs. Le plus grand est le plus proche de zéro : je compare leurs distances à zéro.\nLes distances : $3{,}05$ ; $3{,}5$ ; $3$ ; $3{,}45$ ; $3{,}4$.\nJe les range de la plus petite à la plus grande : $3 < 3{,}05 < 3{,}4 < 3{,}45 < 3{,}5$. Pour comparer $3{,}05$ et $3{,}5$, j'écris $3{,}50$ : $5$ centièmes contre $50$ centièmes.\nLa plus petite distance donne le plus grand nombre.\n⛔ Le piège : croire que $-3{,}05$ est plus petit que $-3{,}5$ parce qu'il « a plus de chiffres ». $-3{,}05$ est plus proche de zéro : il est plus grand.\nRéponse : $-3 > -3{,}05 > -3{,}4 > -3{,}45 > -3{,}5$.",
          schema: droiteRel(-3.6, -2.9, 0.05, [
            { value: -3.5, label: "", color: ROUGE },
            { value: -3.45, label: "−3,45", color: ROUGE },
            { value: -3.4, label: "", color: ROUGE },
            { value: -3.05, label: "−3,05", color: ROUGE },
            { value: -3, label: "", color: ROUGE },
          ], { nombres: 0.1 }),
          micros: ["relatif_comparer"],
        },
        {
          enonce:
            "a) Écris tous les nombres entiers relatifs compris entre $-4{,}5$ et $2{,}3$.\nb) Combien y en a-t-il ?\nc) Écris un nombre décimal compris entre $-1$ et $-0{,}9$.",
          correction:
            "a) Je place $-4{,}5$ et $2{,}3$ sur une droite graduée, puis je relève les entiers qui sont entre les deux.\n$-4{,}5$ est entre $-5$ et $-4$ : le premier entier à sa droite est $-4$.\n$2{,}3$ est entre $2$ et $3$ : le dernier entier à sa gauche est $2$.\nLes entiers : $-4$ ; $-3$ ; $-2$ ; $-1$ ; $0$ ; $1$ ; $2$.\nb) Il y en a $7$.\nc) Entre $-1$ et $-0{,}9$, j'écris les deux nombres avec deux chiffres après la virgule : $-1{,}00$ et $-0{,}90$. Le nombre $-0{,}95$ convient, et il y en a bien d'autres.\n⛔ Le piège : oublier $0$, ou commencer à $-5$. $-5$ est plus petit que $-4{,}5$ : il est en dehors.",
          schema: ecranSeulement(
            droiteRel(-5, 3, 1, [
              { value: -4.5, label: "−4,5", color: ROUGE },
              { value: -4, label: "" },
              { value: -3, label: "" },
              { value: -2, label: "" },
              { value: -1, label: "" },
              { value: 0, label: "" },
              { value: 1, label: "" },
              { value: 2, label: "" },
              { value: 2.3, label: "2,3", color: ROUGE },
            ]),
          ),
          micros: ["relatif_placer", "relatif_comparer", "relatif_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je dessine l'axe, puis je réponds par des phrases.",
      rappel: [
        "Je traduis chaque donnée par un relatif : au-dessus, en avance, un gain, c'est positif ; au-dessous, un retard, une perte, c'est négatif.",
        "« Le plus proche de zéro » : je compare les distances à zéro, sans regarder le signe.",
        "Je vérifie mon rangement en regardant l'axe : le plus petit est le plus bas, ou le plus à gauche.",
      ],
      exercices: [
        {
          titre: "Le tournoi de golf",
          enonce:
            "Au golf, on compte les coups par rapport au « par », le nombre de coups prévu. Un score de $-3$ veut dire trois coups de MOINS que prévu : c'est très bien. Le plus petit score gagne.\nVoici les scores de cinq joueuses à la fin d'un tournoi : Anna $-4$ ; Bérénice $+2$ ; Chloé $-1$ ; Daria $0$ ; Emma $-6$.\na) Classe les joueuses de la gagnante à la dernière.\nb) Quelle joueuse a joué exactement le nombre de coups prévu ?\nc) Parmi les autres, quelle joueuse est la plus proche du par ?\nd) Farah a un score opposé à celui de Bérénice. Écris son score, et dis à quelle place elle se glisse dans le classement.",
          correction:
            "a) Le plus petit score gagne : je range dans l'ordre croissant.\n$-6 < -4 < -1 < 0 < +2$ : Emma, Anna, Chloé, Daria, Bérénice.\nb) Le nombre de coups prévu, c'est un score de $0$ : c'est Daria.\nc) La plus proche du par a la plus petite distance à zéro, sans compter Daria : Emma $6$, Anna $4$, Chloé $1$, Bérénice $2$. C'est Chloé.\nd) L'opposé de $+2$ est $-2$. Or $-4 < -2 < -1$ : Farah se glisse entre Anna et Chloé, à la troisième place.\n⛔ Le piège du c) : répondre Bérénice parce que $+2$ est « le plus petit nombre sans moins ». On compare les distances à zéro : $1$ est plus petit que $2$.",
          schema: table(["joueuse", "score", "écart au par"], [
            ["1. Emma", "−6", "6"],
            ["2. Anna", "−4", "4"],
            ["3. Farah", "−2", "2"],
            ["4. Chloé", "−1", "1"],
            ["5. Daria", "0", "0"],
            ["6. Bérénice", "+2", "2"],
          ]),
          micros: ["relatif_comparer", "relatif_valeur_absolue", "relatif_oppose", "relatif_lire"],
        },
        {
          titre: "L'ascenseur",
          enonce:
            "Dans un immeuble, les étages vont du troisième sous-sol, l'étage $-3$, au huitième étage, l'étage $+8$. Le rez-de-chaussée est l'étage $0$.\nSamir prend l'ascenseur au deuxième sous-sol. Il monte de $6$ étages, puis il redescend de $7$ étages.\na) À quel étage arrive-t-il après la montée ? Et à la fin ?\nb) Son amie Inès habite à l'étage opposé à l'étage de départ de Samir. Quel est cet étage ?\nc) À la fin, qui est le plus loin du rez-de-chaussée : Samir ou Inès ?",
          correction:
            "a) Je compte les étages un par un sur l'axe, sans oublier le rez-de-chaussée.\nDépart : $-2$. Six étages vers le haut : $-1$, $0$, $1$, $2$, $3$, $4$. Après la montée, Samir est au quatrième étage, l'étage $4$.\nSept étages vers le bas depuis $4$ : $3$, $2$, $1$, $0$, $-1$, $-2$, $-3$. À la fin, il est au troisième sous-sol, l'étage $-3$.\nb) L'opposé de $-2$ est $2$ : Inès habite au deuxième étage.\nc) Samir est à $3$ étages du rez-de-chaussée, Inès à $2$ étages. Samir est le plus loin.\n⛔ Le piège : oublier le rez-de-chaussée en comptant, et arriver au troisième étage au lieu du quatrième. L'étage $0$ est un étage comme les autres.",
          schema: axeVertical(-3, 8, 1, [
            { value: 4, label: "montée : 4", color: VERT },
            { value: 2, label: "Inès : 2" },
            { value: -2, label: "départ : −2", color: NOIR },
            { value: -3, label: "fin : −3", color: ROUGE },
          ], [
            { de: -2, vers: 4, label: "6" },
            { de: 4, vers: -3, label: "7" },
          ]),
          micros: ["relatif_defi", "relatif_oppose", "relatif_valeur_absolue", "relatif_lire"],
        },
        {
          titre: "Le nombre mystère",
          enonce:
            "Je suis un nombre relatif écrit avec un seul chiffre après la virgule.\nIndice 1 : je suis négatif.\nIndice 2 : ma distance à zéro est strictement comprise entre $3$ et $4$.\nIndice 3 : je suis plus grand que $-3{,}3$.\nIndice 4 : mon chiffre des dixièmes est pair.\na) Écris tous les nombres qui respectent les indices 1 et 2.\nb) Garde ceux qui respectent aussi l'indice 3.\nc) Qui suis-je ?",
          correction:
            "a) Négatif, avec une distance à zéro entre $3$ et $4$ : je suis entre $-4$ et $-3$, sans être ni l'un ni l'autre. Avec un seul chiffre après la virgule : $-3{,}9$ ; $-3{,}8$ ; $-3{,}7$ ; $-3{,}6$ ; $-3{,}5$ ; $-3{,}4$ ; $-3{,}3$ ; $-3{,}2$ ; $-3{,}1$.\nb) Plus grand que $-3{,}3$ : plus à droite que $-3{,}3$ sur la droite graduée, donc plus proche de zéro. Il reste $-3{,}2$ et $-3{,}1$. ($-3{,}3$ lui-même n'est pas plus grand que $-3{,}3$.)\nc) Le chiffre des dixièmes de $-3{,}2$ est $2$, pair ; celui de $-3{,}1$ est $1$, impair.\nRéponse : je suis $-3{,}2$.\n⛔ Le piège : garder $-3{,}4$ au b) parce que « $4$ est plus grand que $3$ ». Pour des négatifs, plus grand veut dire plus proche de zéro.",
          schema: droiteRel(-4, -3, 0.1, [
            { value: -3.3, label: "−3,3", color: ROUGE },
            { value: -3.2, label: "−3,2", color: VERT },
            { value: -3.1, label: "" },
          ], { nombres: 0.5 }),
          micros: ["relatif_defi", "relatif_valeur_absolue", "relatif_comparer"],
        },
        {
          titre: "La coupe d'une île",
          enonce:
            "Voici une petite île vue en coupe : le sommet est à $320$ m au-dessus de la mer, le phare à $35$ m au-dessus, la plage au niveau de la mer, un récif à $8$ m sous la mer et une épave à $45$ m sous la mer.\na) Écris chaque altitude avec un nombre relatif.\nb) Range-les de la plus basse à la plus haute.\nc) Léo affirme : « $-45$ est plus grand que $-8$, puisque $45$ est plus grand que $8$. » Explique son erreur.\nd) Une plongeuse descend à une profondeur égale à la hauteur du phare. Écris son altitude. Est-elle plus bas que le récif ? Que l'épave ?",
          correction:
            "a) Au-dessus de la mer : positif ; au-dessous : négatif. Sommet $+320$ m ; phare $+35$ m ; plage $0$ m ; récif $-8$ m ; épave $-45$ m.\nb) De la plus basse à la plus haute, c'est l'ordre croissant : $-45 < -8 < 0 < 35 < 320$.\nc) Léo compare les distances à zéro, pas les nombres. L'épave, à $45$ m sous la mer, est plus BAS que le récif : $-45 < -8$. Pour des négatifs, le plus loin de zéro est le plus petit.\nd) Elle descend de $35$ m sous la mer : son altitude est $-35$ m, l'opposé de celle du phare.\n$-35 < -8$ : elle est plus bas que le récif. $-35 > -45$ : elle est moins bas que l'épave.\n⭐ Contrôle sur l'axe : la plongeuse est entre le récif et l'épave.",
          schema: axeVertical(-100, 350, 50, [
            { value: 320, label: "sommet +320" },
            { value: 35, label: "phare +35" },
            { value: 0, label: "plage 0", color: NOIR },
            { value: -8, label: "récif −8", color: ROUGE },
            { value: -35, label: "plongeuse −35", color: VERT },
            { value: -45, label: "épave −45", color: ROUGE },
          ]),
          micros: ["relatif_lire", "relatif_signe", "relatif_comparer", "relatif_oppose", "relatif_defi"],
        },
      ],
    },
  ],
};
