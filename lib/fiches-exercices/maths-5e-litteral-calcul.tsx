// ─── Fiche d'exercices : le calcul littéral (5e) — 20 exercices corrigés ───────
//
// Feuille du lot de 5e (29/09/2026), sur la forme de l'étalon
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-5e-calcul-litteral.tsx` et sur
// la banque `lib/tutor-v4/questionBank/5e/maths/calcul-litteral.bank.ts`,
// notionId litteral_calcul : comprendre une expression, traduire une phrase,
// substituer, réduire, tester une égalité, développer k(a + b), défis.
// ⛔ LIMITES DE LA 5e : pas de résolution d'équation formelle (on TESTE des
// valeurs), pas de double distributivité, pas de carré réduit (x × x), pas de
// facteur négatif devant une parenthèse. ⛔ Aucune substitution d'un nombre
// NÉGATIF : dans la banque, elles passent par un produit de relatifs
// (2 × (−3)), qui est au programme de 4e.
// ⛔ Aucun exemple de la fiche de cours n'est repris (3x + 2, le double de x
// augmenté de 5, 3x − 2 pour x = 6, 3x + 2x, le triple de n diminué de 4,
// x + x + 3, l'âge de Léa, 4c, 7n, 60h), ni de la banque (3(x + 2), 4(x − 1),
// 5(x + 3), 2(3x + 4), 3x + 1 = 10, 2x − 3 = 7, 4x = 12, 2x + 5x, 4x − x), ni
// des feuilles de 4e (`maths-4e-expressions.tsx`, `maths-4e-distributivite.tsx`
// : 6(x + 2), 4(3x + 5), 8(x − 3), 6x + 9x, 7 − 2x…).
//
// Les pièges nommés : le nombre écrit après la lettre (1), la parenthèse
// oubliée (2, 9), 4x lu « 43 » (3), la lettre mélangée aux nombres (4, 7),
// un seul côté calculé (5), le second terme non multiplié (6, 13), un essai
// pris pour une preuve (7, 13, 18), 2L lu « 27 » (8), les carrés comptés
// séparés (10), la lettre perdue en réduisant (11, 15), 3x lu « 3 + x » (12),
// a + a réduit en a² (14), les deux prix échangés (16), la pelouse oubliée
// (17), l'abonnement oublié (19), une formule validée sans test (20).
//
// Pas de fait réel : tout (vélos, piscine, jardin, bassin, allumettes) est un
// MODÈLE.
//
// ⭐ LES DESSINS : des TUILES (une barre par lettre, un petit carré par unité :
// ce qui se regroupe se voit), un rectangle coupé en deux (`aire`, la
// distributivité), une BALANCE pour tester une égalité, une MACHINE (le
// programme de calcul, en colonne), une rangée d'ALLUMETTES, la BORDURE d'un
// bassin, le triangle du coach (commun) et des tableaux.
// 14 dessins imprimés ; ceux qui redisent le corrigé sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je remplace x par 3 »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-5e-litteral-calcul.mjs`.
//
// Micro-compétences : litteral_expression_comprendre (1, 7, 8, 20),
// litteral_traduire (2, 9, 10, 14, 16, 19, 20), litteral_substituer (3, 8, 9,
// 10, 14, 16, 17, 18, 19, 20), litteral_reduire (4, 7, 11, 14, 15, 18),
// litteral_tester (5, 10, 12, 13, 14, 15, 16, 17, 19, 20),
// litteral_distributivite (6, 9, 13, 15, 17, 18, 20), litteral_defi (7, 10,
// 13, 15, 18, 20). 7/7.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, tableau, triangle } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

/**
 * ⭐ LES TUILES : chaque rangée `[barres, carrés]` est un terme de l'expression
 * — une barre bleue par `lettre`, un petit carré orange par unité. Les barres
 * se regroupent entre elles, les carrés entre eux, JAMAIS les unes avec les
 * autres. Une rangée trop longue passe à la ligne. La légende dessous.
 */
const tuiles = (lettre: string, rangees: [number, number][], legende: string) => {
  const W = 300;
  const formes: { t: "b" | "c"; x: number; y: number }[] = [];
  let y = 8;
  for (const [nb, nc] of rangees) {
    let x = 8;
    const place = (t: "b" | "c", w: number) => {
      if (x + w > W - 8) {
        x = 8;
        y += 28;
      }
      formes.push({ t, x, y });
      x += w + 5;
    };
    for (let i = 0; i < nb; i++) place("b", 34);
    for (let i = 0; i < nc; i++) place("c", 16);
    y += 36;
  }
  const H = y + 14;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Tuiles : ${legende}`}>
        {formes.map((f, i) =>
          f.t === "b" ? (
            <g key={i}>
              <rect x={f.x} y={f.y} width={34} height={20} rx={3} fill={BLEU} stroke={NOIR} strokeWidth={1.2} />
              <text x={f.x + 17} y={f.y + 15} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff">
                {lettre}
              </text>
            </g>
          ) : (
            <rect key={i} x={f.x} y={f.y + 2} width={16} height={16} rx={2} fill={ORANGE} stroke={NOIR} strokeWidth={1.2} />
          ),
        )}
        <text x={W / 2} y={H - 8} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
          {legende}
        </text>
      </svg>
    </div>
  );
};

/**
 * LA DISTRIBUTIVITÉ EN AIRE : un rectangle de hauteur `k` coupé en deux, de
 * largeurs `parts[0]` et `parts[1]` ; dans chaque morceau, son aire `aires[i]`.
 * L'aire totale se lit k(a + b), ou morceau par morceau, ka + kb.
 */
const aire = (k: string, parts: [string, string], aires: [string, string]) => {
  const [x0, y0, h, w1, w2] = [44, 30, 88, 140, 96];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 130" className="block h-auto w-full" role="img" aria-label={`Rectangle de hauteur ${k}, largeurs ${parts[0]} et ${parts[1]}`}>
        <rect x={x0} y={y0} width={w1} height={h} fill="#dbeafe" stroke={NOIR} strokeWidth={2} />
        <rect x={x0 + w1} y={y0} width={w2} height={h} fill="#ffedd5" stroke={NOIR} strokeWidth={2} />
        <text x={x0 + w1 / 2} y={y0 - 10} textAnchor="middle" fontSize="15" fontWeight="800" fill={BLEU}>
          {parts[0]}
        </text>
        <text x={x0 + w1 + w2 / 2} y={y0 - 10} textAnchor="middle" fontSize="15" fontWeight="800" fill={ORANGE}>
          {parts[1]}
        </text>
        <text x={x0 - 10} y={y0 + h / 2 + 5} textAnchor="end" fontSize="15" fontWeight="800" fill={NOIR}>
          {k}
        </text>
        <text x={x0 + w1 / 2} y={y0 + h / 2 + 6} textAnchor="middle" fontSize="18" fontWeight="900" fill={BLEU}>
          {aires[0]}
        </text>
        <text x={x0 + w1 + w2 / 2} y={y0 + h / 2 + 6} textAnchor="middle" fontSize="18" fontWeight="900" fill={ORANGE}>
          {aires[1]}
        </text>
      </svg>
    </div>
  );
};

/** UNE BALANCE : chaque plateau porte le calcul d'un côté de l'égalité ; à
 *  l'équilibre si l'égalité est vraie, penchée à gauche sinon. */
const balance = (titre: string, gauche: string, droite: string, equilibre: boolean) => {
  const d = equilibre ? 0 : 14;
  const [yg, yd] = [70 + d, 70 - d];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 180" className="block h-auto w-full" role="img" aria-label={`Balance : ${gauche} et ${droite}`}>
        <text x={150} y={20} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
          {titre}
        </text>
        <line x1={150} y1={70} x2={150} y2={160} stroke={NOIR} strokeWidth={4} />
        <path d="M 120 168 L 180 168 L 150 150 Z" fill="#475569" />
        <line x1={40} y1={yg} x2={260} y2={yd} stroke={NOIR} strokeWidth={4} strokeLinecap="round" />
        <circle cx={150} cy={70} r={5} fill={NOIR} />
        {[
          [75, yg + (yd - yg) * (35 / 220), gauche],
          [225, yg + (yd - yg) * (185 / 220), droite],
        ].map(([x, y, t], i) => (
          <g key={i}>
            <line x1={Number(x) - 40} y1={Number(y) + 30} x2={Number(x)} y2={Number(y)} stroke="#64748b" strokeWidth={1.5} />
            <line x1={Number(x) + 40} y1={Number(y) + 30} x2={Number(x)} y2={Number(y)} stroke="#64748b" strokeWidth={1.5} />
            <path d={`M ${Number(x) - 48} ${Number(y) + 30} Q ${x} ${Number(y) + 46} ${Number(x) + 48} ${Number(y) + 30} Z`} fill={equilibre ? "#dcfce7" : "#fee2e2"} stroke={equilibre ? VERT : ROUGE} strokeWidth={2} />
            <text x={x} y={Number(y) + 22} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
              {t}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/** UNE MACHINE À CALCULER, en colonne : le nombre de départ en haut, chaque
 *  opération sur une flèche, des cases « … » à remplir, la dernière en rouge. */
const machine = (etapes: string[]) => {
  const H = 34 + (etapes.length - 1) * 62;
  const boite = (y: number, texte: string, derniere: boolean) => (
    <g key={`b${y}`}>
      <rect x={95} y={y} width={110} height={30} rx={8} fill={derniere ? "#fee2e2" : "#eff6ff"} stroke={derniere ? ROUGE : BLEU} strokeWidth={2} />
      <text x={150} y={y + 20} textAnchor="middle" fontSize="15" fontWeight="800" fill={NOIR}>
        {texte}
      </text>
    </g>
  );
  return (
    <div className="mx-auto w-full max-w-[16rem] print:max-w-[11rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`Programme de calcul : ${etapes.join(", ")}`}>
        {boite(2, etapes[0], false)}
        {etapes.slice(1).map((op, i) => {
          const y = 2 + i * 62;
          return (
            <g key={i}>
              <line x1={150} y1={y + 32} x2={150} y2={y + 60} stroke={NOIR} strokeWidth={2} />
              <path d={`M 144 ${y + 53} L 150 ${y + 61} L 156 ${y + 53}`} fill="none" stroke={NOIR} strokeWidth={2} />
              <text x={162} y={y + 51} fontSize="15" fontWeight="900" fill={ORANGE}>
                {op}
              </text>
              {boite(y + 62, "…", i === etapes.length - 2)}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/** UNE RANGÉE DE `n` CARRÉS EN ALLUMETTES, collés : deux voisins partagent une
 *  allumette. La légende (calculée) compte les allumettes du dessin. */
const allumettes = (n: number) => {
  const c = Math.min(52, 260 / n);
  const x0 = (300 - n * c) / 2;
  const [y0, W] = [14, 300];
  const baton = (x1: number, y1: number, x2: number, y2: number, k: string) => (
    <g key={k}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#b45309" strokeWidth={5} strokeLinecap="round" />
      <circle cx={x2} cy={y2} r={4} fill={ROUGE} />
    </g>
  );
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${y0 + c + 40}`} className="block h-auto w-full" role="img" aria-label={`${n} carrés en allumettes`}>
        {Array.from({ length: n + 1 }, (_, i) => baton(x0 + i * c, y0 + c - 4, x0 + i * c, y0 + 4, `v${i}`))}
        {Array.from({ length: n }, (_, i) => baton(x0 + i * c + 4, y0, x0 + (i + 1) * c - 4, y0, `h${i}`))}
        {Array.from({ length: n }, (_, i) => baton(x0 + i * c + 4, y0 + c, x0 + (i + 1) * c - 4, y0 + c, `b${i}`))}
        <text x={W / 2} y={y0 + c + 30} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
          {`${n} carrés : ${3 * n + 1} allumettes`}
        </text>
      </svg>
    </div>
  );
};

/** UN BASSIN CARRÉ de `n` carreaux de côté (en bleu), entouré de sa bordure
 *  de carreaux gris. */
const bordure = (n: number) => {
  const c = Math.min(30, 200 / (n + 2));
  const x0 = (300 - (n + 2) * c) / 2;
  return (
    <div className="mx-auto w-full max-w-[16rem] print:max-w-[11rem]">
      <svg viewBox={`0 0 300 ${(n + 2) * c + 36}`} className="block h-auto w-full" role="img" aria-label={`Bassin de ${n} sur ${n} et sa bordure`}>
        {Array.from({ length: (n + 2) * (n + 2) }, (_, i) => {
          const [l, k] = [Math.floor(i / (n + 2)), i % (n + 2)];
          const bord = l === 0 || k === 0 || l === n + 1 || k === n + 1;
          return <rect key={i} x={x0 + k * c} y={6 + l * c} width={c} height={c} fill={bord ? "#94a3b8" : "#bfdbfe"} stroke="#334155" strokeWidth={1} />;
        })}
        <text x={150} y={(n + 2) * c + 28} textAnchor="middle" fontSize="14" fontWeight="800" fill={NOIR}>
          {`bassin de ${n} carreaux de côté`}
        </text>
      </svg>
    </div>
  );
};

export const exercicesLitteralCalcul5e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "litteral-calcul",
  titre: "Le calcul littéral",
  accroche:
    "Vingt exercices, du geste seul au problème : lire une expression, traduire une phrase avec des lettres, remplacer une lettre par un nombre, réduire, tester une égalité, développer k(a + b). Des tuiles, une balance, des programmes de calcul, des allumettes, une location de vélo, les tarifs d'une piscine, un potager et la bordure d'un bassin. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le pourquoi, le piège nommé, et le dessin.",

  fichesCours: [{ href: "/fiches-cours/maths/5e/litteral-calcul", titre: "Le calcul littéral" }],
  coachHref: "/coach-ia/maths?classe=5e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je remets le signe fois caché avant de calculer.",
      rappel: [
        "Une lettre représente un nombre. $3x$ veut dire $3 \\times x$ : le $3$ est le coefficient.",
        "Substituer : je remplace la lettre par sa valeur, puis je calcule, multiplication d'abord.",
        "Réduire : je regroupe les termes qui ont la même lettre. $2x + 3$ ne se réduit pas.",
        "Développer : $k(a + b) = ka + kb$. Le $k$ multiplie CHAQUE terme de la parenthèse.",
      ],
      exercices: [
        {
          enonce: "On considère l'expression $5y + 8$.\na) Quelle lettre contient-elle ? Que représente cette lettre ?\nb) Quel est le coefficient de $y$ ? Quel est le terme constant ?\nc) Écris sans le signe $\\times$ : $7 \\times a$ ; $b \\times 4$ ; $2 \\times x + 3 \\times y$.",
          correction:
            "a) La lettre est $y$. Elle représente un nombre qu'on ne connaît pas, ou qui peut changer.\nb) $5y$ veut dire $5 \\times y$ : le nombre collé à la lettre, $5$, est le coefficient. Le nombre seul, $8$, est le terme constant.\nc) Devant une lettre, on n'écrit pas le signe $\\times$, et on met le nombre en premier : $7 \\times a = 7a$ ; $b \\times 4 = 4b$ ; $2 \\times x + 3 \\times y = 2x + 3y$.\n⛔ Le piège : écrire « $b4$ ». Le nombre s'écrit toujours AVANT la lettre.\n⭐ Sur le dessin, chaque barre vaut $y$ et chaque petit carré vaut $1$ : $5$ barres et $8$ carrés.\nRéponse : a) $y$ ; b) coefficient $5$, terme constant $8$ ; c) $7a$ ; $4b$ ; $2x + 3y$.",
          schema: tuiles("y", [[5, 8]], "5y + 8"),
          micros: ["litteral_expression_comprendre"],
        },
        {
          enonce: "Traduis chaque phrase par une expression littérale.\na) Le triple d'un nombre $a$.\nb) Le nombre $b$ diminué de $6$.\nc) $10$ de moins que le double de $t$.\nd) La somme de $x$ et de $9$, multipliée par $2$.",
          correction:
            "Je repère les mots de calcul : « triple » veut dire $\\times 3$, « diminué de » veut dire $-$, « somme » veut dire $+$.\na) Le triple de $a$ : $3 \\times a$, qui s'écrit $3a$.\nb) $b$ diminué de $6$ : $b - 6$.\nc) Le double de $t$ est $2t$ ; $10$ de moins : $2t - 10$.\nd) D'abord la somme, $x + 9$, puis on multiplie TOUTE la somme par $2$ : il faut des parenthèses, $2(x + 9)$.\n⛔ Le piège du d) : écrire $x + 9 \\times 2$, c'est-à-dire $x + 18$. Sans parenthèses, seul le $9$ serait multiplié.\nRéponse : a) $3a$ ; b) $b - 6$ ; c) $2t - 10$ ; d) $2(x + 9)$.",
          schema: ecranSeulement(
            table(["la phrase", "l'expression"], [
              ["le triple de a", "3a"],
              ["b diminué de 6", "b − 6"],
              ["10 de moins que 2t", "2t − 10"],
              ["(x + 9) fois 2", "2(x + 9)"],
            ]),
          ),
          micros: ["litteral_traduire"],
        },
        {
          enonce: "On donne l'expression $A = 4x + 7$. Calcule $A$ pour :\na) $x = 3$\nb) $x = 0$\nc) $x = 2{,}5$",
          correction:
            "Substituer, c'est remplacer la lettre par le nombre, puis calculer. Je remets le signe $\\times$ qui était caché.\na) $A = 4 \\times 3 + 7 = 12 + 7 = 19$.\nb) $A = 4 \\times 0 + 7 = 0 + 7 = 7$.\nc) $A = 4 \\times 2{,}5 + 7 = 10 + 7 = 17$.\n⛔ Le piège du a) : remplacer $4x$ par « $43$ », en collant les chiffres. $4x$ veut dire $4 \\times x$ : c'est $4 \\times 3 = 12$.\n⭐ La multiplication passe avant l'addition : je calcule $4 \\times x$ d'abord.\nRéponse : a) $19$ ; b) $7$ ; c) $17$.",
          schema: tableau(["x", "3", "0", "2,5"], ["4x + 7", "19", "7", "17"], true),
          micros: ["litteral_substituer"],
        },
        {
          enonce: "Réduis chaque expression quand c'est possible.\na) $6a + 4a$\nb) $9y - 2y$\nc) $t + t + t + t + t$\nd) $3x + 5 + 2x$\ne) $7m + 2$",
          correction:
            "Réduire, c'est regrouper les termes semblables : ceux qui ont la même lettre. J'additionne (ou je soustrais) leurs coefficients, la lettre ne change pas.\na) $6a + 4a = 10a$, car $6 + 4 = 10$.\nb) $9y - 2y = 7y$, car $9 - 2 = 7$.\nc) $t$, c'est $1t$ : cinq fois $1t$, c'est $5t$. $t + t + t + t + t = 5t$.\nd) Je regroupe les $x$ : $3x + 2x = 5x$. Le $5$ reste seul : $3x + 5 + 2x = 5x + 5$.\ne) $7m$ et $2$ ne sont pas semblables : $7m + 2$ ne se réduit pas.\n⛔ Le piège du d) : écrire $10x$ en ajoutant aussi le $5$. Un nombre sans lettre ne se mélange pas avec des $x$ : sur le dessin, les barres et les petits carrés restent séparés.\nRéponse : a) $10a$ ; b) $7y$ ; c) $5t$ ; d) $5x + 5$ ; e) $7m + 2$.",
          schema: tuiles("x", [[3, 5], [2, 0]], "3x + 5 + 2x = 5x + 5"),
          micros: ["litteral_reduire"],
        },
        {
          enonce: "L'égalité $5x - 4 = 3x + 6$ est-elle vraie pour $x = 2$ ? Et pour $x = 5$ ?",
          correction:
            "Pour tester une égalité, je calcule SÉPARÉMENT chaque côté avec la valeur donnée, puis je compare.\nPour $x = 2$ : à gauche, $5 \\times 2 - 4 = 10 - 4 = 6$ ; à droite, $3 \\times 2 + 6 = 6 + 6 = 12$. $6$ n'est pas égal à $12$ : l'égalité est fausse pour $x = 2$.\nPour $x = 5$ : à gauche, $5 \\times 5 - 4 = 25 - 4 = 21$ ; à droite, $3 \\times 5 + 6 = 15 + 6 = 21$. Les deux côtés valent $21$ : l'égalité est vraie pour $x = 5$.\n⛔ Le piège : ne calculer qu'un côté, ou croire qu'une égalité vraie pour une valeur l'est pour toutes. Elle est vraie pour $5$, fausse pour $2$.\nRéponse : fausse pour $x = 2$, vraie pour $x = 5$.",
          schema: balance("pour x = 5", "5x − 4 = 21", "3x + 6 = 21", true),
          micros: ["litteral_tester"],
        },
        {
          enonce: "Développe.\na) $5(x + 4)$\nb) $3(2a + 1)$\nc) $7(y - 2)$\nd) $2(4 + 3t)$",
          correction:
            "Développer $k(a + b)$, c'est multiplier $k$ par CHAQUE terme de la parenthèse : $k(a + b) = ka + kb$.\na) $5(x + 4) = 5 \\times x + 5 \\times 4 = 5x + 20$. Le dessin le montre : un rectangle de hauteur $5$ coupé en deux morceaux, d'aires $5x$ et $20$.\nb) $3(2a + 1) = 3 \\times 2a + 3 \\times 1 = 6a + 3$.\nc) $7(y - 2) = 7 \\times y - 7 \\times 2 = 7y - 14$.\nd) $2(4 + 3t) = 2 \\times 4 + 2 \\times 3t = 8 + 6t$.\n⛔ Le piège : ne multiplier que le premier terme, et écrire $5(x + 4) = 5x + 4$. Le $5$ multiplie aussi le $4$.\nRéponse : a) $5x + 20$ ; b) $6a + 3$ ; c) $7y - 14$ ; d) $8 + 6t$.",
          schema: aire("5", ["x", "4"], ["5x", "20"]),
          micros: ["litteral_distributivite"],
        },
        {
          enonce: "Vrai ou faux ? Justifie.\na) $4x$ veut dire $4 + x$.\nb) $3 \\times a \\times b$ s'écrit $3ab$.\nc) $2x + 3 = 5x$ pour tous les nombres $x$.\nd) $a + a + a = 3a$.",
          correction:
            "a) Faux. $4x$ veut dire $4 \\times x$. Pour $x = 10$ : $4x = 40$, alors que $4 + x = 14$.\nb) Vrai. On supprime le signe $\\times$ entre un nombre et une lettre, et entre deux lettres.\nc) Faux. $2x$ et $3$ ne sont pas semblables : on ne peut pas les regrouper. Pour $x = 1$, les deux côtés valent $5$ ; mais pour $x = 2$, $2x + 3 = 7$ alors que $5x = 10$.\nd) Vrai. Trois fois le même nombre $a$, c'est $3 \\times a = 3a$.\n⛔ Le piège du c) : conclure « vrai » après un seul essai. Pour $x = 1$ les deux côtés sont égaux, et pourtant l'égalité est fausse pour $x = 2$.\nRéponse : a) faux ; b) vrai ; c) faux ; d) vrai.",
          schema: ecranSeulement(tuiles("x", [[2, 3]], "2x + 3 : rien à regrouper")),
          micros: ["litteral_expression_comprendre", "litteral_reduire", "litteral_defi"],
        },
        {
          enonce: "Le périmètre d'un rectangle de longueur $L$ et de largeur $l$ est $P = 2L + 2l$.\na) Que signifie $2L$ ?\nb) Calcule $P$ pour $L = 7$ et $l = 4{,}5$ (en cm).\nc) Calcule $P$ pour $L = 12$ et $l = 12$. Que remarques-tu ?",
          correction:
            "a) $2L$ veut dire $2 \\times L$ : deux longueurs, car un rectangle a deux grands côtés.\nb) Je remplace chaque lettre par sa valeur : $P = 2 \\times 7 + 2 \\times 4{,}5 = 14 + 9 = 23$. Le périmètre est $23$ cm.\nc) $P = 2 \\times 12 + 2 \\times 12 = 24 + 24 = 48$. Les quatre côtés mesurent $12$ cm : c'est un carré, et $4 \\times 12 = 48$ aussi.\n⛔ Le piège : lire $2L$ comme le nombre « $27$ » quand $L = 7$. $2L$, c'est $2 \\times 7 = 14$.\nRéponse : a) $2 \\times L$ ; b) $23$ cm ; c) $48$ cm, c'est un carré.",
          schema: ecranSeulement(
            table(["L", "l", "P = 2L + 2l"], [
              ["7", "4,5", "23"],
              ["12", "12", "48"],
            ]),
          ),
          micros: ["litteral_substituer", "litteral_expression_comprendre"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. J'écris l'expression, je la transforme, puis je vérifie avec un nombre.",
      rappel: [
        "Un programme de calcul se traduit étape par étape ; une multiplication de TOUT le résultat demande des parenthèses.",
        "Pour montrer que deux expressions sont égales, je réduis ou je développe. Pour montrer qu'elles ne le sont pas, un seul contre-exemple suffit.",
        "Tester une égalité : je calcule chaque côté, puis je compare.",
      ],
      exercices: [
        {
          enonce: "Voici un programme de calcul : choisir un nombre ; le multiplier par $4$ ; ajouter $6$ ; multiplier le résultat par $2$.\na) Applique le programme au nombre $3$.\nb) On choisit un nombre $x$. Écris le résultat du programme en fonction de $x$.\nc) Développe cette expression.\nd) Vérifie ta réponse du c) avec le nombre $3$.",
          figure: machine(["x", "× 4", "+ 6", "× 2"]),
          correction:
            "a) $3 \\times 4 = 12$, puis $12 + 6 = 18$, puis $18 \\times 2 = 36$. Le résultat est $36$.\nb) $x$ multiplié par $4$ : $4x$. Ajouter $6$ : $4x + 6$. Multiplier TOUT le résultat par $2$ : $2(4x + 6)$.\nc) $2(4x + 6) = 2 \\times 4x + 2 \\times 6 = 8x + 12$.\nd) Pour $x = 3$ : $8 \\times 3 + 12 = 24 + 12 = 36$. C'est bien le résultat du a).\n⛔ Le piège du b) : écrire $4x + 6 \\times 2$. Sans parenthèses, seul le $6$ serait multiplié par $2$ : pour $3$, cela donnerait $24$, pas $36$.\nRéponse : a) $36$ ; b) $2(4x + 6)$ ; c) $8x + 12$.",
          micros: ["litteral_traduire", "litteral_substituer", "litteral_distributivite"],
        },
        {
          enonce: "Avec des allumettes, on forme une rangée de carrés collés. Il faut $4$ allumettes pour $1$ carré, $7$ pour $2$ carrés, $10$ pour $3$ carrés.\na) Combien faut-il d'allumettes pour $4$ carrés ?\nb) Explique pourquoi il faut $3n + 1$ allumettes pour $n$ carrés.\nc) Combien en faut-il pour $50$ carrés ?\nd) Tom a $100$ allumettes. Teste $n = 33$ : peut-il former $33$ carrés ? Lui reste-t-il des allumettes ?",
          correction:
            "a) Chaque nouveau carré ajoute $3$ allumettes, car il réutilise le côté du carré d'avant : $10 + 3 = 13$ allumettes.\nb) La première allumette, à gauche, ferme le début de la rangée. Puis chaque carré ajoute $3$ allumettes : pour $n$ carrés, $3 \\times n$. En tout : $3n + 1$.\nContrôle : pour $n = 4$, $3 \\times 4 + 1 = 13$, comme au a).\nc) $3 \\times 50 + 1 = 150 + 1 = 151$ allumettes.\nd) $3 \\times 33 + 1 = 99 + 1 = 100$ : il utilise exactement ses $100$ allumettes, il ne lui en reste aucune.\n⛔ Le piège du c) : calculer $4 \\times 50 = 200$, comme si les carrés étaient séparés. Deux carrés voisins partagent une allumette.\nRéponse : a) $13$ ; c) $151$ ; d) oui, $33$ carrés, et il ne lui reste rien.",
          schema: allumettes(4),
          micros: ["litteral_traduire", "litteral_substituer", "litteral_tester", "litteral_defi"],
        },
        {
          enonce: "Réduis chaque expression.\na) $5a + 3 + 2a + 8$\nb) $10x - 4x + 1$\nc) $2y + 7 - y - 3$\nd) $4 + 6t - t$",
          correction:
            "Je regroupe les termes avec la lettre d'un côté, les nombres seuls de l'autre. Chaque terme garde le signe écrit devant lui.\na) Les $a$ : $5a + 2a = 7a$. Les nombres : $3 + 8 = 11$. Donc $5a + 3 + 2a + 8 = 7a + 11$.\nb) $10x - 4x = 6x$, et le $1$ reste seul : $10x - 4x + 1 = 6x + 1$.\nc) $2y - y = y$ (car $y$, c'est $1y$) et $7 - 3 = 4$ : $2y + 7 - y - 3 = y + 4$.\nd) $6t - t = 5t$, et le $4$ reste : $4 + 6t - t = 5t + 4$.\n⛔ Le piège du c) : écrire $2y - y = 2$, en oubliant la lettre. On enlève un $y$ à deux $y$ : il reste un $y$.\nRéponse : a) $7a + 11$ ; b) $6x + 1$ ; c) $y + 4$ ; d) $5t + 4$.",
          schema: ecranSeulement(tuiles("a", [[5, 3], [2, 8]], "5a + 3 + 2a + 8 = 7a + 11")),
          micros: ["litteral_reduire"],
        },
        {
          enonce: "Parmi les nombres $0$, $1$, $2$, $3$ et $4$, lesquels vérifient l'égalité $x + 8 = 3x$ ?",
          correction:
            "Je teste chaque nombre : je calcule les deux côtés, puis je compare.\nPour $x = 0$ : $0 + 8 = 8$ et $3 \\times 0 = 0$. Non.\nPour $x = 1$ : $1 + 8 = 9$ et $3 \\times 1 = 3$. Non.\nPour $x = 2$ : $2 + 8 = 10$ et $3 \\times 2 = 6$. Non.\nPour $x = 3$ : $3 + 8 = 11$ et $3 \\times 3 = 9$. Non.\nPour $x = 4$ : $4 + 8 = 12$ et $3 \\times 4 = 12$. Oui.\n⭐ L'écart entre les deux côtés diminue de $2$ à chaque essai : $8$, $6$, $4$, $2$, puis $0$.\n⛔ Le piège : lire $3x$ comme « $3$ plus $x$ ». $3x = 3 \\times x$.\nRéponse : seul $x = 4$ vérifie l'égalité.",
          schema: table(["x", "x + 8", "3x"], [
            ["0", "8", "0"],
            ["1", "9", "3"],
            ["2", "10", "6"],
            ["3", "11", "9"],
            ["4", "12", "12"],
          ]),
          micros: ["litteral_tester"],
        },
        {
          enonce: "Deux élèves développent. Trouve chaque erreur et corrige.\na) Nora écrit : $4(x + 5) = 4x + 5$.\nb) Tim écrit : $5(2y + 3) = 7y + 15$.\nc) Teste les deux écritures de Nora avec $x = 1$ pour prouver qu'elle s'est trompée.",
          correction:
            "a) Nora n'a multiplié que le $x$ par $4$. Le $4$ multiplie aussi le $5$ : $4(x + 5) = 4x + 20$.\nb) Tim a AJOUTÉ $5$ et $2$ au lieu de les multiplier. $5 \\times 2y = 10y$ : $5(2y + 3) = 10y + 15$.\nc) Pour $x = 1$ : $4(x + 5) = 4 \\times 6 = 24$, mais $4x + 5 = 4 + 5 = 9$. Les résultats sont différents : l'égalité de Nora est fausse. Avec la bonne réponse : $4x + 20 = 4 + 20 = 24$.\n⛔ Le piège : croire qu'une seule valeur peut PROUVER qu'une égalité est vraie. Elle peut seulement prouver qu'elle est fausse : un seul contre-exemple suffit.\nRéponse : a) $4x + 20$ ; b) $10y + 15$ ; c) $24$ contre $9$.",
          schema: ecranSeulement(aire("4", ["x", "5"], ["4x", "20"])),
          micros: ["litteral_distributivite", "litteral_defi", "litteral_tester"],
        },
        {
          enonce: "Un triangle isocèle a deux côtés de longueur $a$ (en cm) et un troisième côté de $5$ cm.\na) Écris son périmètre en fonction de $a$, puis réduis l'expression.\nb) Calcule le périmètre pour $a = 6{,}5$.\nc) Pour quelle valeur de $a$, parmi $4$, $5$ et $6$, le périmètre vaut-il $17$ cm ?",
          figure: triangle({ A: [2.5, 6], B: [0, 0], C: [5, 0] }, { cotes: { AB: "a", CA: "a", BC: "5 cm" } }),
          correction:
            "a) Le périmètre est la somme des trois côtés : $a + a + 5$. Je réduis : $a + a = 2a$, donc le périmètre est $2a + 5$.\nb) Pour $a = 6{,}5$ : $2 \\times 6{,}5 + 5 = 13 + 5 = 18$. Le périmètre est $18$ cm.\nc) Je teste : pour $a = 4$, $2 \\times 4 + 5 = 13$ ; pour $a = 5$, $2 \\times 5 + 5 = 15$ ; pour $a = 6$, $2 \\times 6 + 5 = 17$. C'est $a = 6$.\n⛔ Le piège du a) : réduire $a + a + 5$ en $7a$, ou écrire $a + a = a^2$. $a + a$, c'est deux fois $a$ : $2a$.\nRéponse : a) $2a + 5$ ; b) $18$ cm ; c) $a = 6$.",
          micros: ["litteral_traduire", "litteral_reduire", "litteral_substituer", "litteral_tester"],
        },
        {
          enonce: "Pour chaque paire, dis si les deux expressions sont égales pour TOUTES les valeurs de $x$.\na) $A = 2x + 3x + 1$ et $B = 5x + 1$\nb) $C = 2(x + 4)$ et $D = 2x + 4$\nc) $E = 3x - x$ et $F = 3$",
          correction:
            "a) Je réduis $A$ : $2x + 3x = 5x$, donc $A = 5x + 1$, c'est $B$. Égales pour toutes les valeurs.\nb) Je développe $C$ : $2(x + 4) = 2x + 8$. Ce n'est pas $2x + 4$. Contre-exemple avec $x = 0$ : $C = 2 \\times 4 = 8$ et $D = 4$.\nc) $3x - x = 2x$, et $2x$ n'est pas toujours $3$. Contre-exemple avec $x = 0$ : $E = 0$ et $F = 3$.\n⭐ Pour montrer que deux expressions sont égales, je réduis ou je développe. Pour montrer qu'elles ne le sont pas, un seul contre-exemple suffit.\n⛔ Le piège du c) : écrire $3x - x = 3$, en faisant disparaître la lettre. On enlève UN $x$ à trois $x$ : il en reste deux.\nRéponse : a) égales ; b) pas égales ; c) pas égales.",
          schema: ecranSeulement(
            table(["paire", "pour x = 0", "pour x = 1"], [
              ["A et B", "1 et 1", "6 et 6"],
              ["C et D", "8 et 4", "10 et 6"],
              ["E et F", "0 et 3", "2 et 3"],
            ]),
          ),
          micros: ["litteral_reduire", "litteral_distributivite", "litteral_tester", "litteral_defi"],
        },
        {
          enonce: "Une location de vélo coûte $3$ € de prise en charge, puis $2$ € par heure.\na) Écris le prix $P$, en euros, pour $h$ heures de location.\nb) Calcule $P$ pour $4$ heures, puis pour $1{,}5$ heure.\nc) Lina a $15$ €. Teste $h = 5$, $h = 6$ et $h = 7$ : combien d'heures peut-elle louer avec ses $15$ € ?",
          correction:
            "a) Les heures coûtent $2 \\times h = 2h$ euros, et on ajoute les $3$ € de prise en charge : $P = 2h + 3$.\nb) Pour $h = 4$ : $P = 2 \\times 4 + 3 = 8 + 3 = 11$ €. Pour $h = 1{,}5$ : $P = 2 \\times 1{,}5 + 3 = 3 + 3 = 6$ €.\nc) Pour $h = 5$ : $2 \\times 5 + 3 = 13$ €. Pour $h = 6$ : $2 \\times 6 + 3 = 15$ €. Pour $h = 7$ : $2 \\times 7 + 3 = 17$ €, trop cher. Elle peut louer $6$ heures.\n⛔ Le piège du a) : écrire $P = 3h + 2$, en échangeant les deux nombres. Le prix qui revient à chaque heure, c'est $2$ € : c'est lui qui multiplie $h$.\nRéponse : a) $P = 2h + 3$ ; b) $11$ € et $6$ € ; c) $6$ heures.",
          schema: tableau(["h", "1,5", "4", "5", "6", "7"], ["P (€)", "6", "11", "13", "15", "17"], true),
          micros: ["litteral_traduire", "litteral_substituer", "litteral_tester"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. J'écris l'expression avec une lettre, je la transforme, puis je teste des valeurs.",
      rappel: [
        "Je choisis ce que représente la lettre, et je l'écris dans une phrase.",
        "Deux façons de compter la même chose donnent deux expressions égales : je le montre en développant.",
        "Des essais donnent une idée ; seul le calcul avec la lettre prouve une règle pour tous les nombres.",
      ],
      exercices: [
        {
          titre: "Le potager et la pelouse",
          enonce:
            "Un jardin rectangulaire a une largeur de $6$ m. Sa longueur est coupée en deux : un potager de $x$ m de long et une pelouse de $10$ m de long.\na) Écris l'aire du potager, puis celle de la pelouse.\nb) Écris l'aire du jardin entier de deux façons : avec des parenthèses, puis sans.\nc) Calcule l'aire du jardin pour $x = 8$, avec chacune des deux écritures.\nd) Le potager doit avoir une aire de $42$ m². Teste $x = 6$, $x = 7$ et $x = 8$.",
          correction:
            "a) Un rectangle a pour aire longueur $\\times$ largeur. Le potager : $6 \\times x = 6x$ m². La pelouse : $6 \\times 10 = 60$ m².\nb) Le jardin entier a pour longueur $x + 10$ : son aire est $6(x + 10)$. C'est aussi la somme des deux morceaux : $6x + 60$. Donc $6(x + 10) = 6x + 60$ : c'est la distributivité.\nc) Avec parenthèses : $6 \\times (8 + 10) = 6 \\times 18 = 108$. Sans : $6 \\times 8 + 60 = 48 + 60 = 108$. Les deux donnent $108$ m².\nd) $6 \\times 6 = 36$ ; $6 \\times 7 = 42$ ; $6 \\times 8 = 48$. C'est $x = 7$ : un potager de $7$ m de long.\n⛔ Le piège du b) : écrire $6x + 10$, en oubliant de multiplier la pelouse par la largeur. La pelouse est un rectangle de $6$ m sur $10$ m : $60$ m².\nRéponse : a) $6x$ et $60$ ; b) $6(x + 10) = 6x + 60$ ; c) $108$ m² ; d) $x = 7$.",
          schema: aire("6", ["x", "10"], ["6x", "60"]),
          micros: ["litteral_distributivite", "litteral_substituer", "litteral_tester"],
        },
        {
          titre: "Le programme mystère",
          enonce:
            "Programme : choisir un nombre ; lui ajouter $3$ ; multiplier le résultat par $4$ ; enlever $12$.\na) Applique le programme à $5$, puis à $2{,}5$.\nb) Que remarques-tu ?\nc) Écris le résultat pour un nombre $x$, développe et réduis. Explique ta remarque.",
          figure: machine(["x", "+ 3", "× 4", "− 12"]),
          correction:
            "a) Avec $5$ : $5 + 3 = 8$, puis $8 \\times 4 = 32$, puis $32 - 12 = 20$.\nAvec $2{,}5$ : $2{,}5 + 3 = 5{,}5$, puis $5{,}5 \\times 4 = 22$, puis $22 - 12 = 10$.\nb) $20 = 4 \\times 5$ et $10 = 4 \\times 2{,}5$ : le programme semble donner le quadruple du nombre choisi.\nc) Avec $x$ : $x + 3$, puis $4(x + 3)$, puis $4(x + 3) - 12$.\nJe développe : $4(x + 3) = 4x + 12$. Donc le résultat est $4x + 12 - 12 = 4x$.\nPour TOUT nombre $x$, le programme donne $4x$, le quadruple : la remarque est prouvée.\n⛔ Le piège : croire que deux essais suffisent à prouver la remarque. Les essais donnent une idée ; seul le calcul avec $x$ la prouve pour tous les nombres.\nRéponse : a) $20$ et $10$ ; c) $4(x + 3) - 12 = 4x$.",
          micros: ["litteral_distributivite", "litteral_reduire", "litteral_substituer", "litteral_defi"],
        },
        {
          titre: "Les tarifs de la piscine",
          enonce:
            "Tarif A : $4$ € l'entrée. Tarif B : un abonnement de $18$ € pour l'année, puis $2{,}50$ € l'entrée.\na) Écris le prix payé pour $n$ entrées avec chaque tarif.\nb) Calcule les deux prix pour $10$ entrées, puis pour $15$ entrées.\nc) Teste $n = 12$. Que remarques-tu ?\nd) À partir de combien d'entrées le tarif B est-il le moins cher ?",
          correction:
            "a) Tarif A : $4 \\times n = 4n$. Tarif B : $18 + 2{,}5 \\times n = 18 + 2{,}5n$.\nb) Pour $n = 10$ : A coûte $4 \\times 10 = 40$ € ; B coûte $18 + 2{,}5 \\times 10 = 18 + 25 = 43$ €. A est moins cher.\nPour $n = 15$ : A coûte $4 \\times 15 = 60$ € ; B coûte $18 + 2{,}5 \\times 15 = 18 + 37{,}5 = 55{,}5$ €. B est moins cher.\nc) Pour $n = 12$ : A coûte $4 \\times 12 = 48$ € ; B coûte $18 + 2{,}5 \\times 12 = 18 + 30 = 48$ €. Les deux tarifs sont égaux : l'égalité $4n = 18 + 2{,}5n$ est vraie pour $n = 12$.\nd) Chaque entrée coûte $1{,}50$ € de moins avec B : après $12$ entrées, B prend l'avantage. Pour $n = 13$ : A coûte $4 \\times 13 = 52$ € ; B coûte $18 + 2{,}5 \\times 13 = 18 + 32{,}5 = 50{,}5$ €. À partir de $13$ entrées, B est le moins cher.\n⛔ Le piège : choisir B tout de suite parce que l'entrée y coûte moins. Il faut d'abord « rembourser » les $18$ € de l'abonnement.\nRéponse : a) $4n$ et $18 + 2{,}5n$ ; b) $40$ € et $43$ €, puis $60$ € et $55{,}5$ € ; c) les deux coûtent $48$ € ; d) à partir de $13$ entrées.",
          schema: table(["entrées", "tarif A", "tarif B"], [
            ["10", "40", "43"],
            ["12", "48", "48"],
            ["13", "52", "50,5"],
            ["15", "60", "55,5"],
          ]),
          micros: ["litteral_traduire", "litteral_substituer", "litteral_tester"],
        },
        {
          titre: "La bordure du bassin",
          enonce:
            "Un bassin carré de $n$ carreaux de côté est entouré d'une bordure de carreaux gris, comme sur le dessin (ici $n = 3$).\na) Compte les carreaux gris pour $n = 3$.\nb) Léo propose $4n + 4$ carreaux gris, Zoé propose $4(n + 1)$, Hugo propose $4n$. Teste les trois formules pour $n = 3$.\nc) Montre que les formules de Léo et de Zoé sont égales pour tout $n$.\nd) Combien faut-il de carreaux gris pour un bassin de $10$ carreaux de côté ?",
          figure: bordure(3),
          correction:
            "a) Sur le dessin : $5$ carreaux en haut, $5$ en bas, et $3$ de chaque côté entre les deux. $5 + 5 + 3 + 3 = 16$ carreaux gris.\nb) Léo : $4 \\times 3 + 4 = 12 + 4 = 16$. Zoé : $4 \\times (3 + 1) = 4 \\times 4 = 16$. Hugo : $4 \\times 3 = 12$. Hugo a oublié les $4$ carreaux des coins.\nc) Je développe la formule de Zoé : $4(n + 1) = 4n + 4$. C'est celle de Léo : elles sont égales pour tout $n$.\nd) $4 \\times 10 + 4 = 40 + 4 = 44$ carreaux gris.\n⭐ Léo compte $4$ côtés de $n$ carreaux, plus les $4$ coins ; Zoé compte $4$ bandes de $n + 1$ carreaux qui tournent autour du bassin. Deux façons de voir, une seule quantité.\n⛔ Le piège : valider la formule de Hugo sans la tester. Pour $n = 3$, elle donne $12$, pas $16$.\nRéponse : a) $16$ ; b) Léo et Zoé : $16$, Hugo : $12$ ; c) $4(n + 1) = 4n + 4$ ; d) $44$.",
          micros: ["litteral_expression_comprendre", "litteral_traduire", "litteral_tester", "litteral_distributivite", "litteral_substituer", "litteral_defi"],
        },
      ],
    },
  ],
};
