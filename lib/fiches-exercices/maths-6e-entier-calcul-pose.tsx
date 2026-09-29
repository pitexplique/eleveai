// ─── Fiche d'exercices : le calcul posé (6e) — 20 exercices corrigés ───────────
//
// Feuille du lot de 6e (30/09/2026), sur la forme de l'étalon de 5e
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-calcul-pose.tsx` et sur la
// banque `lib/tutor-v4/questionBank/6e/maths/calcul-pose.bank.ts`, notionId
// entier_calcul_pose : poser une addition, une soustraction, une multiplication
// (par un nombre d'un ou deux chiffres), une division euclidienne (diviseur
// d'un ou deux chiffres), vérifier un calcul, défis.
// ⛔ LIMITES DE LA 6e : des entiers seulement (les décimaux posés sont la notion
// decimal_calcul). La soustraction se fait « en cassant » une dizaine, une
// centaine… comme dans la fiche de cours (« le 3 devient 2 ») : le chiffre
// cassé est barré, sa nouvelle valeur écrite au-dessus. Premier nombre toujours
// plus grand que le second (la banque le rappelle).
// ⛔ Aucun exemple de la fiche de cours n'est repris (475 + 286, 632 − 458,
// 267 × 4, 58 ÷ 7, 347 + 25, 168 + 47, 425 − 78, 348 + 275, 7 × 8 = 56).
//
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : « ils ont parfois du mal à LIRE ».
// Phrases de 12 mots en moyenne, 20 au plus, une idée par phrase.
//
// Les pièges nommés : aligner à gauche (1), retourner la soustraction d'une
// colonne (2), ajouter la retenue avant de multiplier (3), s'arrêter avant
// d'abaisser tous les chiffres (4), les zéros de 1 000 (5), une retenue de 2
// (6), le 0 de la deuxième ligne (7, 19), le 0 du quotient (8), oublier la
// livraison (9), la retenue oubliée dans un calcul à trous (10), additionner
// au lieu de multiplier (11), une égalité juste mais un reste trop grand (12),
// « 0 − 8 = 8 » (13), chercher 36 dans 9 (14), un zéro de trop (15), le
// quotient pris pour la réponse (16), diviser sans les aides (17), la retenue
// 4 oubliée (18), un reste égal au diviseur (20).
//
// Tout est un MODÈLE : bibliothèque, club de foot, forêt, pommes, sortie en
// car, classe de neige, apiculteur, perles.
//
// ⭐ LES DESSINS : l'opération POSÉE comme au cahier (`pose`, colonnes
// alignées sur les unités, retenues ou chiffres cassés en rouge au-dessus,
// lignes intermédiaires de la multiplication) et la division en POTENCE
// (`potence`, les produits soulignés, le quotient en vert, le reste en rouge).
// 14 dessins imprimés ; ceux qui redisent le corrigé sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« j'abaisse le 4 »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-entier-calcul-pose.mjs`.
//
// Micro-compétences : entier_addition_posee (1, 6, 9, 10, 17),
// entier_soustraction_posee (2, 5, 9, 13, 17, 18), entier_multiplication_posee
// (3, 7, 11, 15, 17, 18, 19), entier_division_posee (4, 8, 12, 14, 16, 17, 20),
// entier_calcul_verifier (5, 11, 12, 15, 19, 20), entier_calcul_pose_defi (9,
// 10, 16, 17, 18, 19, 20). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * ⭐ UNE OPÉRATION POSÉE, comme au cahier : un chiffre par colonne, tout aligné
 * sur les UNITÉS, le signe à gauche de la dernière ligne, un trait, puis le
 * résultat en vert. `dessus` s'écrit en petit, en rouge, au-dessus de la
 * première ligne, aligné sur les unités lui aussi ("" : rien) :
 *   · addition, multiplication : les RETENUES ;
 *   · soustraction : la nouvelle valeur d'un chiffre CASSÉ — le chiffre du
 *     haut est alors barré.
 * `partiels` : les lignes intermédiaires d'une multiplication par un nombre de
 * deux chiffres. Tout est écrit EN CLAIR : le script refait l'opération.
 */
const pose = (signe: "+" | "−" | "×", nombres: string[], resultat: string, opts: { dessus?: string[]; partiels?: string[] } = {}) => {
  const dessus = opts.dessus ?? [];
  const partiels = opts.partiels ?? [];
  const larg = Math.max(...[...nombres, ...partiels, resultat].map((s) => s.length), dessus.length) + 1;
  const cw = 24;
  const W = Math.max(168, larg * cw + 24);
  const xd = (W + larg * cw) / 2;
  // c = rang compté depuis la droite (0 = unités).
  const X = (c: number) => xd - c * cw - cw / 2;
  const hl = 28;
  const y1 = dessus.length ? 42 : 24;
  const yN = (i: number) => y1 + i * hl;
  const trait1 = yN(nombres.length - 1) + 9;
  const yP = (i: number) => trait1 + 22 + i * hl;
  const trait2 = partiels.length ? yP(partiels.length - 1) + 9 : trait1;
  const yR = trait2 + 22;
  const H = yR + 10;
  const chiffres = (s: string, y: number, couleur: string, cle: string) =>
    s.split("").map((ch, j) => (
      <text key={`${cle}${j}`} x={X(s.length - 1 - j)} y={y} textAnchor="middle" fontSize="19" fontWeight="800" fill={couleur}>
        {ch}
      </text>
    ));
  return (
    <div className="mx-auto w-full max-w-[13rem] print:max-w-[9rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`${nombres.join(` ${signe} `)} = ${resultat}, posé en colonnes`}>
        {dessus.map((d, j) => {
          const c = dessus.length - 1 - j;
          if (!d.trim()) return null;
          return (
            <g key={`d${j}`}>
              <text x={X(c)} y={18} textAnchor="middle" fontSize="13" fontWeight="800" fill={ROUGE}>
                {d}
              </text>
              {signe === "−" && c < nombres[0].length ? <line x1={X(c) - 7} y1={y1 + 2} x2={X(c) + 7} y2={y1 - 15} stroke={ROUGE} strokeWidth={1.8} /> : null}
            </g>
          );
        })}
        {nombres.map((n, i) => chiffres(n, yN(i), NOIR, `n${i}`))}
        <text x={X(larg - 1)} y={yN(nombres.length - 1)} textAnchor="middle" fontSize="19" fontWeight="800" fill={BLEU}>
          {signe}
        </text>
        <line x1={X(larg - 1) - cw / 2} y1={trait1} x2={xd + 4} y2={trait1} stroke={NOIR} strokeWidth={2} />
        {partiels.map((p, i) => chiffres(p, yP(i), "#475569", `p${i}`))}
        {partiels.length ? <line x1={X(larg - 1) - cw / 2} y1={trait2} x2={xd + 4} y2={trait2} stroke={NOIR} strokeWidth={2} /> : null}
        {chiffres(resultat, yR, VERT, "r")}
      </svg>
    </div>
  );
};

/**
 * ⭐ LA DIVISION EN POTENCE, comme au cahier. À gauche, le dividende, puis les
 * lignes du calcul : `lignes` = [texte, colonne de son dernier chiffre], les
 * colonnes comptées depuis la GAUCHE du dividende (0 = son premier chiffre).
 * Une ligne qui commence par « − » est un produit à soustraire : elle est
 * soulignée. La dernière ligne est le reste, en rouge. À droite, le diviseur,
 * la barre, et le quotient en vert. Le script refait la division pas à pas.
 */
const potence = (dividende: string, diviseur: string, quotient: string, lignes: [string, number][]) => {
  const [cw, hl, xg, y0] = [20, 25, 30, 24];
  const X = (i: number) => xg + i * cw + cw / 2;
  const xb = xg + dividende.length * cw + 10;
  const nq = Math.max(diviseur.length, quotient.length);
  const W = Math.max(190, xb + nq * cw + 26);
  const H = y0 + lignes.length * hl + 12;
  const ecrire = (s: string, fin: number, y: number, couleur: string, cle: string) =>
    s.split("").map((ch, j) => (
      <text key={`${cle}${j}`} x={X(fin - (s.length - 1 - j))} y={y} textAnchor="middle" fontSize="17" fontWeight="800" fill={couleur}>
        {ch}
      </text>
    ));
  return (
    <div className="mx-auto w-full max-w-[14rem] print:max-w-[10rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Division de ${dividende} par ${diviseur}, posée`}>
        {ecrire(dividende, dividende.length - 1, y0, NOIR, "dd")}
        <line x1={xb} y1={4} x2={xb} y2={y0 + hl + 8} stroke={NOIR} strokeWidth={2} />
        <line x1={xb} y1={y0 + 8} x2={W - 8} y2={y0 + 8} stroke={NOIR} strokeWidth={2} />
        {diviseur.split("").map((ch, j) => (
          <text key={`dv${j}`} x={xb + 10 + j * cw + cw / 2} y={y0} textAnchor="middle" fontSize="17" fontWeight="800" fill={BLEU}>
            {ch}
          </text>
        ))}
        {quotient.split("").map((ch, j) => (
          <text key={`q${j}`} x={xb + 10 + j * cw + cw / 2} y={y0 + hl} textAnchor="middle" fontSize="17" fontWeight="900" fill={VERT}>
            {ch}
          </text>
        ))}
        {lignes.map(([s, fin], k) => {
          const y = y0 + (k + 1) * hl;
          const moins = s.startsWith("−");
          const chif = moins ? s.slice(1) : s;
          const premier = fin - chif.length + 1;
          const derniere = k === lignes.length - 1;
          return (
            <g key={`l${k}`}>
              {moins ? (
                <>
                  <text x={X(premier) - 16} y={y} textAnchor="middle" fontSize="17" fontWeight="800" fill="#475569">
                    −
                  </text>
                  <line x1={X(premier) - cw / 2 - 12} y1={y + 6} x2={X(fin) + cw / 2} y2={y + 6} stroke={NOIR} strokeWidth={1.4} />
                </>
              ) : null}
              {ecrire(chif, fin, y, derniere ? ROUGE : moins ? "#475569" : NOIR, `c${k}`)}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export const exercicesEntierCalculPose6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "entier-calcul-pose",
  titre: "Le calcul posé",
  accroche:
    "Vingt exercices, du geste seul au problème : poser une addition, une soustraction, une multiplication et une division, gérer les retenues, vérifier avec l'opération inverse et l'ordre de grandeur. Une bibliothèque, un club de foot, une forêt après la tempête, des cagettes de pommes, une classe de neige, un apiculteur, les perles de Mia. Un rappel de cours avant chaque niveau. Pose d'abord au brouillon, puis ouvre la correction : colonne par colonne, avec le piège nommé et l'opération posée dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/entier-calcul-pose", titre: "Le calcul posé" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une opération par exercice. Je pose, un chiffre par carreau, unités alignées.",
      rappel: [
        "J'aligne les chiffres de même rang : unités sous unités.",
        "Je calcule colonne par colonne, de droite à gauche, avec les retenues.",
        "Dans une division, le reste est plus petit que le diviseur.",
      ],
      exercices: [
        {
          enonce: "Pose et calcule $3\\,587 + 649$.",
          correction:
            "J'aligne les unités. $649$ a un chiffre de moins : il commence plus à droite.\nUnités : $7 + 9 = 16$. J'écris $6$, je retiens $1$.\nDizaines : $8 + 4 + 1 = 13$. J'écris $3$, je retiens $1$.\nCentaines : $5 + 6 + 1 = 12$. J'écris $2$, je retiens $1$.\nMilliers : $3 + 1 = 4$.\n⛔ Le piège : aligner à gauche, et mettre le $6$ sous le $3$. On aligne toujours sur les unités.\n⭐ Ordre de grandeur : $3\\,600 + 600 = 4\\,200$. Le résultat est proche.\nRéponse : $3\\,587 + 649 = 4\\,236$.",
          schema: pose("+", ["3587", "649"], "4236", { dessus: ["1", "1", "1", ""] }),
          micros: ["entier_addition_posee"],
        },
        {
          enonce: "Pose et calcule $7\\,352 - 2\\,486$.",
          correction:
            "Le plus grand nombre est en haut. J'aligne les unités.\nUnités : $2 - 6$ est impossible.\nJe casse une dizaine : le $5$ devient $4$. J'ai $12$ unités, et $12 - 6 = 6$.\nDizaines : $4 - 8$ est impossible.\nJe casse une centaine : le $3$ devient $2$. J'ai $14$ dizaines, et $14 - 8 = 6$.\nCentaines : $2 - 4$ est impossible.\nJe casse un millier : le $7$ devient $6$. J'ai $12$ centaines, et $12 - 4 = 8$.\nMilliers : $6 - 2 = 4$.\n⛔ Le piège : faire $6 - 2$ aux unités, en retournant le calcul. On enlève toujours le chiffre du BAS.\n⭐ Contrôle : $4\\,866 + 2\\,486 = 7\\,352$.\nRéponse : $7\\,352 - 2\\,486 = 4\\,866$.",
          schema: pose("−", ["7352", "2486"], "4866", { dessus: ["6", "12", "14", "12"] }),
          micros: ["entier_soustraction_posee"],
        },
        {
          enonce: "Pose et calcule $1\\,238 \\times 7$.",
          correction:
            "Je multiplie chaque chiffre par $7$, en partant des unités.\n$8 \\times 7 = 56$. J'écris $6$, je retiens $5$.\n$3 \\times 7 = 21$, plus $5$ : $26$. J'écris $6$, je retiens $2$.\n$2 \\times 7 = 14$, plus $2$ : $16$. J'écris $6$, je retiens $1$.\n$1 \\times 7 = 7$, plus $1$ : $8$.\n⛔ Le piège : ajouter la retenue avant de multiplier. Je multiplie d'abord, puis j'ajoute la retenue.\n⭐ Ordre de grandeur : $1\\,200 \\times 7 = 8\\,400$. Le résultat est proche.\nRéponse : $1\\,238 \\times 7 = 8\\,666$.",
          schema: pose("×", ["1238", "7"], "8666", { dessus: ["1", "2", "5", ""] }),
          micros: ["entier_multiplication_posee"],
        },
        {
          enonce: "Pose la division de $847$ par $6$. Donne le quotient et le reste.",
          correction:
            "Je commence à gauche. Dans $8$, combien de fois $6$ ? $1$ fois. Et $8 - 6 = 2$.\nJ'abaisse le $4$ : j'ai $24$. Dans $24$, $6$ va $4$ fois. Reste $0$.\nJ'abaisse le $7$ : j'ai $7$. Dans $7$, $6$ va $1$ fois. Et $7 - 6 = 1$.\nLe quotient est $141$, le reste est $1$.\n⭐ Le reste $1$ est plus petit que $6$ : c'est juste.\n⭐ Contrôle : $6 \\times 141 + 1 = 847$.\n⛔ Le piège : s'arrêter trop tôt. J'abaisse tous les chiffres, un par un.\nRéponse : $847 = 6 \\times 141 + 1$.",
          schema: potence("847", "6", "141", [["−6", 0], ["24", 1], ["−24", 1], ["07", 2], ["−6", 2], ["1", 2]]),
          micros: ["entier_division_posee"],
        },
        {
          enonce: "Vérifie chaque soustraction avec une addition. Corrige si c'est faux.\na) $900 - 347 = 553$\nb) $1\\,000 - 486 = 624$",
          correction:
            "Pour vérifier, j'ajoute le résultat et le nombre enlevé. Je dois retrouver le nombre de départ.\na) $553 + 347 = 900$. Je retrouve $900$ : c'est juste.\nb) $624 + 486 = 1\\,110$. Je ne retrouve pas $1\\,000$ : c'est faux.\nLe bon résultat est $514$. Contrôle : $514 + 486 = 1\\,000$.\n⛔ Le piège au b) : oublier de casser les zéros de $1\\,000$.\nRéponse : a) juste ; b) faux, c'est $514$.",
          schema: ecranSeulement(pose("+", ["514", "486"], "1000", { dessus: ["1", "1", ""] })),
          micros: ["entier_calcul_verifier", "entier_soustraction_posee"],
        },
        {
          enonce: "Pose et calcule $408 + 1\\,796 + 57$.",
          correction:
            "J'écris les trois nombres l'un sous l'autre, unités alignées.\nUnités : $8 + 6 + 7 = 21$. J'écris $1$, je retiens $2$.\nDizaines : $0 + 9 + 5 + 2 = 16$. J'écris $6$, je retiens $1$.\nCentaines : $4 + 7 + 1 = 12$. J'écris $2$, je retiens $1$.\nMilliers : $1 + 1 = 2$.\n⛔ Le piège : retenir $1$ au lieu de $2$ aux unités. Avec $21$, la retenue est $2$.\nRéponse : $408 + 1\\,796 + 57 = 2\\,261$.",
          schema: ecranSeulement(pose("+", ["408", "1796", "57"], "2261", { dessus: ["1", "1", "2", ""] })),
          micros: ["entier_addition_posee"],
        },
        {
          enonce: "Pose et calcule $346 \\times 27$.",
          correction:
            "Je multiplie par $7$, puis par $20$. Puis j'additionne les deux lignes.\nPremière ligne : $346 \\times 7 = 2\\,422$.\nDeuxième ligne : $346 \\times 20$. J'écris d'abord un $0$ aux unités.\nPuis je multiplie par $2$ : la ligne vaut $6\\,920$.\nJ'additionne : $2\\,422 + 6\\,920 = 9\\,342$.\n⛔ Le piège : oublier le $0$ de la deuxième ligne. On multiplie par $20$, pas par $2$.\n⭐ Ordre de grandeur : $300 \\times 30 = 9\\,000$. Le résultat est proche.\nRéponse : $346 \\times 27 = 9\\,342$.",
          schema: pose("×", ["346", "27"], "9342", { partiels: ["2422", "6920"] }),
          micros: ["entier_multiplication_posee"],
        },
        {
          enonce: "Pose la division de $1\\,842$ par $6$.",
          correction:
            "Dans $1$, pas de $6$ : je prends $18$. Et $18 \\div 6 = 3$, reste $0$.\nJ'abaisse le $4$ : j'ai $4$. Dans $4$, $6$ va $0$ fois. J'écris $0$ au quotient !\nJ'abaisse le $2$ : j'ai $42$. Et $6 \\times 7 = 42$, reste $0$.\nLe quotient est $307$, le reste est $0$.\n⛔ Le piège : oublier le $0$ du quotient, et écrire $37$.\n⭐ Contrôle : $6 \\times 307 = 1\\,842$. La division tombe juste.\nRéponse : $1\\,842 \\div 6 = 307$.",
          schema: potence("1842", "6", "307", [["−18", 1], ["04", 2], ["−0", 2], ["42", 3], ["−42", 3], ["0", 3]]),
          micros: ["entier_division_posee"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Je choisis l'opération, je la pose, puis je vérifie mon résultat.",
      rappel: [
        "Je vérifie une soustraction par une addition, une division par une multiplication.",
        "Ordre de grandeur : j'arrondis les nombres, puis je calcule de tête.",
        "Si le premier chiffre est trop petit pour le diviseur, je prends deux chiffres.",
      ],
      exercices: [
        {
          enonce: "Une bibliothèque a $2\\,460$ livres. Elle en reçoit $875$. Puis elle en prête $1\\,390$.\na) Combien de livres a-t-elle après la livraison ?\nb) Combien en reste-t-il après les prêts ?",
          correction:
            "a) Elle reçoit des livres : j'ajoute. Je pose $2\\,460 + 875$.\n$0 + 5 = 5$. Puis $6 + 7 = 13$ : je retiens $1$.\nPuis $4 + 8 + 1 = 13$ : je retiens $1$. Enfin $2 + 1 = 3$.\nElle a $3\\,335$ livres.\nb) Elle prête des livres : j'enlève. Je pose $3\\,335 - 1\\,390$.\n$5 - 0 = 5$. Puis $3 - 9$ est impossible : je casse une centaine, et $13 - 9 = 4$.\nPuis $2 - 3$ est impossible : je casse un millier, et $12 - 3 = 9$. Enfin $2 - 1 = 1$.\nIl reste $1\\,945$ livres.\n⭐ Contrôle : $1\\,945 + 1\\,390 = 3\\,335$.\n⛔ Le piège : enlever $1\\,390$ à $2\\,460$, en oubliant la livraison.\nRéponse : a) $3\\,335$ livres ; b) $1\\,945$ livres.",
          schema: pose("−", ["3335", "1390"], "1945", { dessus: ["2", "12", "13", ""] }),
          micros: ["entier_addition_posee", "entier_soustraction_posee", "entier_calcul_pose_defi"],
        },
        {
          enonce: "Chaque carré cache un chiffre. Retrouve-les.\n$4\\square7 + \\square58 = 61\\square$",
          correction:
            "Je pose l'addition. Je remplis colonne par colonne, depuis les unités.\nUnités : $7 + 8 = 15$. J'écris $5$, je retiens $1$. Le carré du résultat cache $5$.\nDizaines : le carré, plus $5$, plus $1$, doit finir par $1$.\nAvec $5$ : $5 + 5 + 1 = 11$. J'écris $1$, je retiens $1$.\nCentaines : $4 + 1 + 1 = 6$. Le carré du bas cache $1$.\nL'addition est $457 + 158 = 615$.\n⭐ Contrôle : je repose $457 + 158$, et je trouve bien $615$.\n⛔ Le piège : oublier la retenue, et chercher $4 + \\square = 6$.",
          schema: ecranSeulement(pose("+", ["457", "158"], "615", { dessus: ["1", "1", ""] })),
          micros: ["entier_addition_posee", "entier_calcul_pose_defi"],
        },
        {
          enonce: "Un club de foot achète $38$ maillots à $24$ € l'un.\na) Pose la multiplication. Combien paie le club ?\nb) Vérifie avec un ordre de grandeur.",
          correction:
            "a) $38$ maillots à $24$ € : je pose $38 \\times 24$.\nPar $4$ : $38 \\times 4 = 152$.\nPar $20$ : j'écris un $0$, puis $38 \\times 2 = 76$. La ligne vaut $760$.\nJ'additionne : $152 + 760 = 912$. Le club paie $912$ €.\nb) $38$ est proche de $40$, et $24$ de $25$. Or $40 \\times 25 = 1\\,000$.\n$912$ est proche de $1\\,000$ : le résultat est cohérent.\n⛔ Le piège : poser $38 + 24$. Plusieurs fois le même prix, c'est une multiplication.\nRéponse : le club paie $912$ €.",
          schema: pose("×", ["38", "24"], "912", { partiels: ["152", "760"] }),
          micros: ["entier_multiplication_posee", "entier_calcul_verifier"],
        },
        {
          enonce: "Sam a posé la division de $1\\,254$ par $7$. Il annonce : quotient $178$, reste $8$.\na) Vérifie l'égalité $7 \\times 178 + 8 = 1\\,254$.\nb) Pourquoi sa division est-elle quand même fausse ?\nc) Corrige-la.",
          correction:
            "a) $7 \\times 178 = 1\\,246$, et $1\\,246 + 8 = 1\\,254$. L'égalité est juste.\nb) Mais le reste $8$ est plus grand que $7$. On peut encore mettre $7$ dans $8$ !\nLe reste doit toujours être plus petit que le diviseur.\nc) J'ajoute $1$ au quotient : $179$. Il reste $8 - 7 = 1$.\nContrôle : $7 \\times 179 + 1 = 1\\,254$, et $1$ est plus petit que $7$.\n⛔ Le piège : croire qu'une égalité juste suffit. Il faut aussi un reste plus petit que le diviseur.\nRéponse : quotient $179$, reste $1$.",
          schema: potence("1254", "7", "179", [["−7", 1], ["55", 2], ["−49", 2], ["64", 3], ["−63", 3], ["1", 3]]),
          micros: ["entier_calcul_verifier", "entier_division_posee"],
        },
        {
          enonce: "Une forêt compte $10\\,000$ arbres. Une tempête en abat $3\\,648$.\nPose la soustraction. Combien d'arbres restent debout ?",
          correction:
            "Je pose $10\\,000 - 3\\,648$, unités alignées.\nUnités : $0 - 8$ est impossible. Les dizaines, centaines et milliers valent $0$ : rien à casser.\nJe casse donc la dizaine de mille. Elle vaut $10$ milliers.\nDe proche en proche, j'obtiens : $9$ milliers, $9$ centaines, $9$ dizaines et $10$ unités.\nPuis : $10 - 8 = 2$ ; $9 - 4 = 5$ ; $9 - 6 = 3$ ; $9 - 3 = 6$.\nIl reste $6\\,352$ arbres.\n⭐ Contrôle : $6\\,352 + 3\\,648 = 10\\,000$.\n⛔ Le piège : retourner le calcul, faire $8 - 0$ et écrire $8$. On ne peut pas enlever $8$ à $0$ : il faut casser.\nRéponse : $6\\,352$ arbres.",
          schema: ecranSeulement(pose("−", ["10000", "3648"], "6352", { dessus: ["0", "9", "9", "9", "10"] })),
          micros: ["entier_soustraction_posee"],
        },
        {
          enonce: "Un producteur range $972$ pommes dans des cagettes de $36$ pommes.\nPose la division. Combien de cagettes remplit-il ?",
          correction:
            "Je cherche combien de fois $36$ dans $972$. Je pose $972 \\div 36$.\nDans $9$, pas de $36$ : je prends $97$.\n$36 \\times 2 = 72$ et $36 \\times 3 = 108$. Donc $2$ fois. Et $97 - 72 = 25$.\nJ'abaisse le $2$ : $252$. J'essaie $7$ : $36 \\times 7 = 252$. Reste $0$.\nLe quotient est $27$, le reste est $0$. Il remplit $27$ cagettes.\n⭐ Contrôle : $36 \\times 27 = 972$.\n⛔ Le piège : chercher $36$ dans $9$. Si le premier chiffre est trop petit, je prends deux chiffres.\nRéponse : $27$ cagettes.",
          schema: potence("972", "36", "27", [["−72", 1], ["252", 2], ["−252", 2], ["0", 2]]),
          micros: ["entier_division_posee"],
        },
        {
          enonce: "Sans poser, trouve le bon résultat de $612 \\times 48$ parmi : $2\\,938$ ; $29\\,376$ ; $293\\,760$.\nPuis vérifie en posant l'opération.",
          correction:
            "J'arrondis : $612$ est proche de $600$, et $48$ proche de $50$.\n$600 \\times 50 = 30\\,000$. Le résultat est proche de $30\\,000$ : c'est $29\\,376$.\nJe vérifie en posant : $612 \\times 8 = 4\\,896$ et $612 \\times 40 = 24\\,480$.\n$4\\,896 + 24\\,480 = 29\\,376$. C'est bien ça.\n⛔ Le piège : choisir $2\\,938$ parce qu'il « ressemble ». Un chiffre de plus ou de moins change tout.\nRéponse : $612 \\times 48 = 29\\,376$.",
          schema: ecranSeulement(pose("×", ["612", "48"], "29376", { partiels: ["4896", "24480"] })),
          micros: ["entier_calcul_verifier", "entier_multiplication_posee"],
        },
        {
          enonce: "$158$ personnes partent en sortie. Un car a $45$ places.\na) Pose la division de $158$ par $45$.\nb) Combien de cars faut-il réserver ?",
          correction:
            "a) Dans $1$ et dans $15$, pas de $45$ : je prends $158$.\n$45 \\times 3 = 135$ et $45 \\times 4 = 180$. Donc $3$ fois.\nEt $158 - 135 = 23$. Le quotient est $3$, le reste est $23$.\nb) $3$ cars emmènent $135$ personnes. Il en reste $23$ sur le trottoir !\nIl faut un car de plus : $4$ cars.\n⛔ Le piège : répondre $3$ cars, le quotient. Ici, le reste compte aussi.\nRéponse : $158 = 45 \\times 3 + 23$ ; il faut $4$ cars.",
          schema: ecranSeulement(potence("158", "45", "3", [["−135", 2], ["23", 2]])),
          micros: ["entier_division_posee", "entier_calcul_pose_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je pose chaque opération, puis je réponds par une phrase.",
      rappel: [
        "Je choisis l'opération : ajouter, enlever, répéter ou partager.",
        "Je pose, je vérifie, puis j'écris une phrase de réponse.",
      ],
      exercices: [
        {
          titre: "La classe de neige",
          enonce:
            "$24$ élèves partent en classe de neige. Le séjour coûte $385$ € par élève.\na) Combien coûte le séjour de toute la classe ? Pose une multiplication.\nb) Le collège donne $2\\,500$ €. Une association donne $1\\,220$ €. Combien reste-t-il à payer ?\nc) Les familles partagent ce reste en parts égales. Combien paie chaque famille ?",
          correction:
            "a) $24$ fois $385$ € : je pose $385 \\times 24$.\nPar $4$ : $385 \\times 4 = 1\\,540$. Par $20$ : $385 \\times 20 = 7\\,700$.\nPuis $1\\,540 + 7\\,700 = 9\\,240$. Le séjour coûte $9\\,240$ €.\nb) Les aides : $2\\,500 + 1\\,220 = 3\\,720$ €.\nReste à payer : $9\\,240 - 3\\,720 = 5\\,520$ €.\nc) Je partage $5\\,520$ en $24$ : je pose $5\\,520 \\div 24$.\nJe trouve $230$, reste $0$. Chaque famille paie $230$ €.\n⭐ Contrôle : $24 \\times 230 = 5\\,520$.\n⛔ Le piège au c) : diviser $9\\,240$, en oubliant les aides.\nRéponse : a) $9\\,240$ € ; b) $5\\,520$ € ; c) $230$ €.",
          schema: (
            <div className="grid grid-cols-1 min-w-0 gap-3">
              {pose("×", ["385", "24"], "9240", { partiels: ["1540", "7700"] })}
              {ecranSeulement(potence("5520", "24", "230", [["−48", 1], ["72", 2], ["−72", 2], ["00", 3], ["−0", 3], ["0", 3]]))}
            </div>
          ),
          micros: ["entier_multiplication_posee", "entier_addition_posee", "entier_soustraction_posee", "entier_division_posee", "entier_calcul_pose_defi"],
        },
        {
          titre: "Le miel de l'apiculteur",
          enonce:
            "Un apiculteur a $14$ ruches. Chaque ruche donne $18$ kg de miel dans l'année.\na) Combien de kilos de miel récolte-t-il ?\nb) Il met le miel en pots de $1$ kg. Il vend chaque pot $9$ €. Combien gagne-t-il en tout ?\nc) Il a dépensé $1\\,395$ € pour son matériel. Que lui reste-t-il ?",
          correction:
            "a) $14$ ruches de $18$ kg : $14 \\times 18$.\n$14 \\times 8 = 112$ et $14 \\times 10 = 140$. Donc $112 + 140 = 252$ kg.\nb) $252$ pots à $9$ € : je pose $252 \\times 9$.\n$2 \\times 9 = 18$ : j'écris $8$, je retiens $1$.\n$5 \\times 9 = 45$, plus $1$ : $46$. J'écris $6$, je retiens $4$.\n$2 \\times 9 = 18$, plus $4$ : $22$. J'écris $22$.\nIl gagne $2\\,268$ €.\nc) Je pose $2\\,268 - 1\\,395 = 873$. Il lui reste $873$ €.\n⭐ Contrôle : $873 + 1\\,395 = 2\\,268$.\n⛔ Le piège au b) : oublier la retenue $4$, et trouver $1\\,868$.\nRéponse : a) $252$ kg ; b) $2\\,268$ € ; c) $873$ €.",
          schema: pose("×", ["252", "9"], "2268", { dessus: ["4", "1", ""] }),
          micros: ["entier_multiplication_posee", "entier_soustraction_posee", "entier_calcul_pose_defi"],
        },
        {
          titre: "L'erreur de Noé",
          enonce:
            "Noé a posé $4\\,305 \\times 26$. Ses deux lignes sont $25\\,830$ et $8\\,610$. Il trouve $34\\,440$.\na) Avec un ordre de grandeur, montre que son résultat est faux.\nb) Trouve son erreur.\nc) Corrige le calcul.",
          correction:
            "a) $4\\,305$ est proche de $4\\,000$, et $26$ de $30$. Or $4\\,000 \\times 30 = 120\\,000$.\n$34\\,440$ est bien trop petit : il y a une erreur.\nb) Première ligne : $4\\,305 \\times 6 = 25\\,830$. Elle est juste.\nDeuxième ligne : Noé a calculé $4\\,305 \\times 2 = 8\\,610$. Mais le $2$ de $26$ vaut $20$ !\nIl a oublié le $0$. La ligne vaut $86\\,100$.\nc) $25\\,830 + 86\\,100 = 111\\,930$.\n⛔ Le piège : c'est celui de Noé. La deuxième ligne commence toujours par un $0$.\nRéponse : $4\\,305 \\times 26 = 111\\,930$.",
          schema: pose("×", ["4305", "26"], "111930", { partiels: ["25830", "86100"] }),
          micros: ["entier_calcul_verifier", "entier_multiplication_posee", "entier_calcul_pose_defi"],
        },
        {
          titre: "Les perles de Mia",
          enonce:
            "Mia range ses perles dans des sachets de $13$. Elle remplit $47$ sachets. Il lui reste $9$ perles.\na) Combien de perles avait-elle ?\nb) Vérifie en posant la division de ce nombre par $13$.\nc) Quel est le plus grand reste possible dans une division par $13$ ?",
          correction:
            "a) $47$ sachets de $13$ : $13 \\times 47 = 611$. Plus les $9$ perles : $611 + 9 = 620$.\nElle avait $620$ perles.\nb) Je pose $620 \\div 13$. Dans $6$, pas de $13$ : je prends $62$.\n$13 \\times 4 = 52$, et $62 - 52 = 10$. J'abaisse le $0$ : $100$.\n$13 \\times 7 = 91$, et $100 - 91 = 9$. Quotient $47$, reste $9$ : c'est bien ça.\nc) Le reste est plus petit que $13$. Le plus grand reste possible est $12$.\n⭐ Avec $12$ perles de reste, elle en aurait eu $611 + 12 = 623$.\n⛔ Le piège au c) : répondre $13$. Avec $13$ perles, on remplit un sachet de plus.\nRéponse : a) $620$ perles ; c) $12$.",
          schema: potence("620", "13", "47", [["−52", 1], ["100", 2], ["−91", 2], ["9", 2]]),
          micros: ["entier_division_posee", "entier_calcul_verifier", "entier_calcul_pose_defi"],
        },
      ],
    },
  ],
};
