// ─── Fiche d'exercices : résoudre une équation (4e) — 20 exercices corrigés ────
//
// Alignée sur la fiche de cours `lib/fiches/maths-4e-equations.tsx` et sur les
// huit micros du coach de 4e (notionId equation_resolution). On reste dans le
// programme de 4e : le PREMIER DEGRÉ seulement — reconnaître une équation,
// traduire une phrase, résoudre en un geste puis en deux, réduire, développer
// une parenthèse, des x des deux côtés, vérifier une solution, mettre un
// problème en équation.
// ⛔ Ni équation produit nul, ni x² = a : c'est la 3e (`maths-3e-equations.tsx`).
// ⛔ Aucun exemple de la fiche de cours n'est repris : ni x + 4 = 9, x − 3 = 8,
// 3x = 15, 3x = 9, 3x = 0, 5x = 8, 2x + 3 = 11, 2x + 3x = 15, 2(x + 3) = 14,
// 3(x − 1) = 12, x + 5 = 17, 3x = 21 (les mangues), ni « le double de x est égal
// à 14 ». ⛔ Ni ceux de la feuille de 3e : ni les loueurs de vélos, ni le
// triathlon, ni la chandelle, ni l'échappée du Tour, ni x + 9 = 4, 6x = 42,
// 5x − 8 = 27, 7x + 2 = 3x + 22, 3(2x − 5) = 4x + 7, ni les programmes 4x − 7 et
// 3(x + 2).
//
// Les pièges nommés : 13 − 6 au lieu de 6 − 13 (3), diviser avant d'enlever ce
// qui est ajouté (4), le x tout seul compté pour 0 (5), développer à moitié (6),
// zéro qui « ne compterait pas » (7), faire la même opération que celle qu'on
// voit au lieu de la contraire (8), « faire passer » sans changer le signe (9),
// le moins devant la parenthèse (10), −2(x + 1) = −2x + 2 (11), un seul essai
// réussi pris pour une preuve (12), les parenthèses oubliées d'un programme
// (13), un seul côté égal dans un isocèle (14), 2(x + 4) = 2x + 4 et ses 4,8
// paniers (15), doubler l'âge d'aujourd'hui seulement (16), le demi-périmètre
// (17), x compté en km au lieu de milliers de km (18), arrondir 10,4 au-dessous
// (19), « deux relais du double » écrit 2x au lieu de 4x (20).
//
// Les chiffres du monde, et d'où ils viennent :
// - terrain de football : 105 m × 68 m, dimensions recommandées par la FIFA
//   (Football Stadiums, Technical Recommendations and Requirements, 5e éd.,
//   2011 ; les Lois du jeu de l'IFAB permettent 100 à 110 m sur 64 à 75 m en
//   match international) — ex. 17 ;
// - voitures (ex. 18) : prix d'achat IMAGINÉS, à l'ordre de grandeur réel ;
//   40 € d'électricité pour 1 000 km (environ 16 kWh aux 100 km à 0,25 €/kWh)
//   et 110 € d'essence (environ 6 L aux 100 km à 1,85 €/L) sont des ordres de
//   grandeur arrondis ; environ 12 000 km par an et par voiture en France est
//   l'ordre de grandeur du kilométrage annuel moyen (SDES, bilan annuel de la
//   circulation) ;
// - CO₂ : moyenne annuelle 2024 à Mauna Loa ≈ 424,6 ppm, hausse moyenne
//   d'environ 2,5 ppm par an sur 2014–2024 (NOAA, Global Monitoring Laboratory,
//   « Trends in Atmospheric Carbon Dioxide ») ; ≈ 280 ppm vers 1750 (GIEC, AR6,
//   groupe I : 278 ppm en 1750) ; mesures à Mauna Loa depuis 1958 (C. D.
//   Keeling) — ex. 19 ;
// - ekiden : marathon (42,195 km) couru en relais par six, en 5 km, 10 km,
//   5 km, 10 km, 5 km et 7,195 km (World Athletics, ex-IAAF, championnats du
//   monde de relais sur route) — ex. 20.
// Tout le reste (Sami, Inès, Lucas, Maël, Emma, la joueuse de basket, le
// triangle) est inventé.
//
// ⭐ LA BALANCE (seize corrigés) : chaque ligne est un état de la balance, et
// l'opération qui y mène est écrite au-dessus, « des deux côtés ». Le script de
// recalcul RELIT chaque ligne : il vérifie que l'opération annoncée transforme
// bien un plateau en l'autre, et que la solution finale équilibre CHAQUE ligne.
// Et les tableaux (classement, essais, âges, coûts, CO₂), le triangle isocèle à
// l'échelle, le terrain à l'échelle, les relais à l'échelle : les vingt
// corrigés sont dessinés. ⭐ Tout est écrit EN CLAIR dans les appels.
//
// ⛔ LISIBLE À 375 PX : la balance est dessinée sur 300 de large avec une police
// de 13, dans un conteneur de 16,5rem au moins qui défile sur téléphone ; un
// plateau trop long est resserré (`textLength`) au lieu de déborder.
//
// Les corrigés sont écrits à la première personne (« je retire »), comme les
// feuilles de 3e.
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-equations-4e.mjs`.
//
// Micro-compétences : equation_reconnaitre (1), equation_traduire (2, 13, 14,
// 16, 17, 19, 20), equation_resoudre_simple (2, 3, 4, 8),
// equation_resoudre_reduction (5, 9, 10, 11, 12, 14, 15, 18, 20),
// equation_resoudre_distributivite (6, 10, 11, 13, 15, 16, 17),
// equation_verifier (1, 7, 8, 12, 16), equation_probleme (14 à 20),
// equation_defi (8, 19, 20). 8/8.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { ORANGE, tableau, tableauProba, triangle } from "@/lib/fiches-exercices/figures";

const NOIR = "#0f172a";
const VERT = "#16a34a";

/** Un conteneur qui défile sur téléphone, jamais sur papier. */
const DEFILE = "mx-auto w-full overflow-x-auto print:overflow-visible";
const SVG_LARGE = "block h-auto w-full min-w-[16.5rem] print:min-w-0";

/** Deux dessins côte à côte à partir de `sm` et sur papier, l'un sous l'autre sur téléphone. */
const deux = (a: ReactNode, b: ReactNode) => (
  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:grid-cols-2">
    {a}
    {b}
  </div>
);
/** Deux dessins l'un sous l'autre, partout (un tableau large et une balance). */
const pile = (a: ReactNode, b: ReactNode) => (
  <div className="grid gap-3">
    {a}
    {b}
  </div>
);

// ⭐ Texte NU dans les SVG (pas de `$`) : la donnée s'écrit « - », « . » et
// « 30000 », l'écran montre « − », « , » et « 30 000 ».
const affiche = (s: string) =>
  s
    .replace(/\d{4,}/g, (n) => n.replace(/\B(?=(\d{3})+(?!\d))/g, " "))
    .replace(/-/g, "−")
    .replace(/\./g, ",");

/** « −3x » → « − 3x des deux côtés » ; « ÷−70 » → « ÷ (−70) des deux côtés » ;
 *  « je développe » reste tel quel. */
const operation = (op: string) => {
  const m = /^([−+÷×])\s*(.+)$/.exec(op);
  if (!m) return op;
  const n = affiche(m[2]);
  return `${m[1]} ${n.startsWith("−") ? `(${n})` : n} des deux côtés`;
};

/**
 * ⭐ LA BALANCE : une ligne par état, les deux plateaux à l'équilibre, et
 * l'opération faite DES DEUX CÔTÉS écrite en orange au-dessus. La dernière
 * ligne, « x = … », est en vert.
 * ⛔ 300 de large, police 13, dans 16,5rem au moins : 11,4 px à 375 (mesure de
 * la consigne du lot 1). Un plateau de plus de 17 signes est resserré.
 * ⭐ Le script de recalcul relit `g`, `d` et `op` : les écrire en clair.
 */
const balance = (etapes: { g: string; d: string; op?: string }[]) => {
  const H = 64;
  const W = 300;
  const plateau = (x: number, y: number, t: string, fond: string, trait: string) => {
    const texte = affiche(t);
    const serre = texte.length * 7.4 > 126;
    return (
      <g>
        <rect x={x} y={y + 18} width={136} height={24} rx={5} fill={fond} stroke={trait} strokeWidth={1.3} />
        <text
          x={x + 68}
          y={y + 35}
          textAnchor="middle"
          fontSize={13}
          fill={NOIR}
          {...(serre ? { textLength: 126, lengthAdjust: "spacingAndGlyphs" as const } : {})}
        >
          {texte}
        </text>
      </g>
    );
  };
  return (
    <div className={`${DEFILE} max-w-[18rem] print:max-w-[13rem]`}>
      <svg
        viewBox={`0 0 ${W} ${etapes.length * H + 4}`}
        role="img"
        aria-label={etapes.map((e) => `${e.op ? `${operation(e.op)}, ` : ""}${affiche(e.g)} = ${affiche(e.d)}`).join(" ; ")}
        className={SVG_LARGE}
      >
        {etapes.map((e, i) => {
          const y = i * H;
          const fin = i === etapes.length - 1;
          const fond = fin ? "#dcfce7" : "#dbeafe";
          const trait = fin ? VERT : "#2563eb";
          return (
            <g key={i}>
              {e.op && (
                <text x={W / 2} y={y + 13} textAnchor="middle" fontSize={13} fontWeight={700} fill={ORANGE}>
                  ↓ {operation(e.op)}
                </text>
              )}
              {plateau(6, y, e.g, fond, trait)}
              {plateau(158, y, e.d, fond, trait)}
              <line x1={34} y1={y + 46} x2={266} y2={y + 46} stroke="#475569" strokeWidth={2.4} />
              <polygon points={`150,${y + 46} 141,${y + 61} 159,${y + 61}`} fill="#94a3b8" />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Le TERRAIN à l'échelle (exercice 17) : le rectangle, la ligne médiane et le
 * rond central (9,15 m de rayon, Lois du jeu). ⭐ Le script relit `longueur`
 * et `largeur` et les compare aux étiquettes.
 */
const terrain = (longueur: number, largeur: number, bas: string, cote: string) => {
  const s = Math.min(230 / longueur, 150 / largeur);
  const [w, h, x0, y0] = [longueur * s, largeur * s, 24, 12];
  return (
    <div className={`${DEFILE} max-w-[20rem] print:max-w-[14rem]`}>
      <svg viewBox="0 0 300 200" role="img" aria-label={`Terrain de ${longueur} m sur ${largeur} m`} className={SVG_LARGE}>
        <rect x={x0} y={y0} width={w} height={h} fill="#dcfce7" stroke={VERT} strokeWidth={2} />
        <line x1={x0 + w / 2} y1={y0} x2={x0 + w / 2} y2={y0 + h} stroke={VERT} strokeWidth={1.5} />
        <circle cx={x0 + w / 2} cy={y0 + h / 2} r={9.15 * s} fill="none" stroke={VERT} strokeWidth={1.5} />
        <text x={x0 + w / 2} y={y0 + h + 22} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
          {bas}
        </text>
        <text transform={`translate(${x0 + w + 16} ${y0 + h / 2}) rotate(90)`} textAnchor="middle" fontSize={14} fontWeight={700} fill={NOIR}>
          {cote}
        </text>
      </svg>
    </div>
  );
};

/**
 * Les RELAIS à l'échelle (exercice 20) : une bande, un morceau par relayeur,
 * sa distance au-dessus, son nom (« x », « 2x ») dedans.
 * ⭐ Le script relit les distances : leur somme doit faire le marathon.
 */
const relais = (etapes: { km: number; nom: string }[]) => {
  const total = etapes.reduce((s, e) => s + e.km, 0);
  const s = 280 / total;
  let x = 10;
  return (
    <div className={`${DEFILE} max-w-[20rem] print:max-w-[14rem]`}>
      <svg viewBox="0 0 300 92" role="img" aria-label={`Six relais : ${etapes.map((e) => affiche(String(e.km))).join(", ")} km`} className={SVG_LARGE}>
        {etapes.map((e, i) => {
          const debut = x;
          x += e.km * s;
          return (
            <g key={i}>
              <rect x={debut} y={30} width={e.km * s} height={26} fill={i % 2 ? "#fed7aa" : "#dbeafe"} stroke="#fff" strokeWidth={2} />
              <text x={debut + (e.km * s) / 2} y={22} textAnchor="middle" fontSize={13} fontWeight={700} fill={NOIR}>
                {affiche(String(e.km))}
              </text>
              <text x={debut + (e.km * s) / 2} y={48} textAnchor="middle" fontSize={13} fill={NOIR}>
                {e.nom}
              </text>
            </g>
          );
        })}
        <text x={150} y={80} textAnchor="middle" fontSize={13} fontWeight={700} fill={VERT}>
          {`${affiche(String(+total.toFixed(3)))} km au total`}
        </text>
      </svg>
    </div>
  );
};

export const exercicesEquations4e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "equation-resolution",
  titre: "Résoudre une équation",
  accroche:
    "Vingt exercices, du geste seul au problème : reconnaître une équation, traduire une phrase, résoudre en un geste puis en plusieurs, réduire, développer une parenthèse, regrouper les x d'un côté, vérifier une solution, et mettre un problème en équation. Un terrain de football, deux voitures, le CO₂ de l'air, un marathon en relais. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : elle est écrite étape par étape, avec la balance dessinée, le pourquoi de chaque étape et le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/4e/equation-resolution", titre: "Les équations" }],
  coachHref: "/coach-ia/maths?classe=4e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je fais la même opération des deux côtés, et je vérifie.",
      rappel: [
        "Une ÉQUATION est une égalité qui contient une lettre inconnue. La RÉSOUDRE, c'est trouver la valeur de la lettre qui rend l'égalité vraie.",
        "LA BALANCE : je fais la MÊME opération des deux côtés, et l'égalité reste vraie.",
        "Pour défaire, l'opération CONTRAIRE : ce qui s'ajoute se retire, ce qui multiplie se divise. D'abord ce qui s'ajoute, ensuite ce qui multiplie.",
        "Je VÉRIFIE en remplaçant la lettre par ma solution dans chaque membre : les deux calculs doivent donner le même nombre.",
      ],
      exercices: [
        {
          enonce:
            "Voici cinq écritures.\n① $4x - 1 = 11$ ② $6 + 5 = 11$ ③ $7x + 2$ ④ $15 = 2y + 3$ ⑤ $5x - 8 = 2x$\na) Lesquelles sont des équations ?\nb) Dans ④, quelle est l'inconnue ? Quel est le premier membre, et le second membre ?\nc) Le nombre $3$ est-il solution de ① ?",
          correction:
            "Une équation a DEUX choses à la fois : un signe $=$ et une lettre inconnue.\na) ①, ④ et ⑤ ont les deux : ce sont des équations. ② a un signe $=$ mais aucune lettre : c'est un calcul, tout y est connu. ③ a une lettre mais pas de signe $=$ : c'est une expression.\nb) Dans $15 = 2y + 3$, l'inconnue est $y$ : une équation n'utilise pas toujours $x$. Le premier membre est à gauche du signe $=$, c'est $15$ ; le second membre est à droite, c'est $2y + 3$.\nc) Je remplace $x$ par $3$ dans ① : $4 \\times 3 - 1 = 12 - 1 = 11$. J'obtiens bien $11$ : $3$ est solution.\n⛔ Le piège : croire que l'inconnue est toujours $x$, et toujours à gauche. Dans ④, elle s'appelle $y$ et elle est à droite.\nRéponse : ①, ④ et ⑤ sont des équations ; l'inconnue de ④ est $y$ ; $3$ est solution de ①.",
          schema: tableauProba(
            ["écriture", "signe = ?", "lettre ?", "c'est"],
            [
              ["4x − 1 = 11", "oui", "oui", "une équation"],
              ["6 + 5 = 11", "oui", "non", "un calcul"],
              ["7x + 2", "non", "oui", "une expression"],
              ["15 = 2y + 3", "oui", "oui", "une équation"],
              ["5x − 8 = 2x", "oui", "oui", "une équation"],
            ],
          ),
          micros: ["equation_reconnaitre", "equation_verifier"],
        },
        {
          enonce:
            "Traduire chaque phrase par une équation, en appelant $x$ le nombre cherché, puis la résoudre.\na) Un nombre diminué de $7$ vaut $12$.\nb) Le quadruple d'un nombre est égal à $44$.\nc) Le triple d'un nombre, augmenté de $5$, donne $32$.\nd) La moitié d'un nombre vaut $9$.",
          correction:
            "Je traduis mot à mot : « diminué de » donne $-$, « le quadruple » donne $4x$, « la moitié » donne $\\dfrac{x}{2}$, et « vaut », « est égal à », « donne » donnent le signe $=$.\na) $x - 7 = 12$. J'ajoute $7$ des deux côtés : $x = 19$.\nb) $4x = 44$. Je divise par $4$ : $x = 11$.\nc) $3x + 5 = 32$. Je retire $5$ : $3x = 27$. Je divise par $3$ : $x = 9$.\nd) $\\dfrac{x}{2} = 9$. Je multiplie par $2$ : $x = 18$.\n⭐ Je vérifie le c) : $3 \\times 9 + 5 = 27 + 5 = 32$. ✓\n⛔ Le piège au c) : écrire $3(x + 5) = 32$. La phrase prend d'abord le triple, PUIS ajoute $5$ : pas de parenthèses.\nRéponse : $x = 19$ ; $x = 11$ ; $x = 9$ ; $x = 18$.",
          schema: balance([
            { g: "3x + 5", d: "32" },
            { g: "3x", d: "27", op: "−5" },
            { g: "x", d: "9", op: "÷3" },
          ]),
          micros: ["equation_traduire", "equation_resoudre_simple"],
        },
        {
          enonce: "Résoudre.\na) $x + 13 = 6$\nb) $x - 8 = -3$\nc) $7x = 91$\nd) $-5x = 35$",
          correction:
            "Un seul geste : je fais l'opération CONTRAIRE de celle que subit $x$, des deux côtés.\na) On ajoute $13$ à $x$ : je retire $13$ des deux côtés. $x = 6 - 13$, donc $x = -7$.\nb) On retire $8$ à $x$ : j'ajoute $8$ des deux côtés. $x = -3 + 8$, donc $x = 5$.\nc) On multiplie $x$ par $7$ : je divise par $7$. $x = 91 \\div 7$, donc $x = 13$.\nd) On multiplie $x$ par $-5$ : je divise par $-5$. $x = 35 \\div (-5)$, donc $x = -7$.\n⭐ Je vérifie le a) : $-7 + 13 = 6$. ✓\n⛔ Le piège au a) : calculer $13 - 6 = 7$ et répondre $x = 7$. Je vérifie : $7 + 13 = 20$, pas $6$. Le bon calcul est $6 - 13$, et il est négatif.\nRéponse : $x = -7$ ; $x = 5$ ; $x = 13$ ; $x = -7$.",
          schema: deux(
            balance([
              { g: "x + 13", d: "6" },
              { g: "x", d: "-7", op: "−13" },
            ]),
            balance([
              { g: "7x", d: "91" },
              { g: "x", d: "13", op: "÷7" },
            ]),
          ),
          micros: ["equation_resoudre_simple"],
        },
        {
          enonce: "Résoudre en deux gestes.\na) $4x + 7 = 31$\nb) $9 - 2x = 1$\nc) $6x - 5 = -23$",
          correction:
            "Deux gestes : d'abord j'enlève le nombre ajouté ou retiré, ensuite je divise par le nombre qui multiplie $x$.\na) Je retire $7$ des deux côtés : $4x = 24$. Je divise par $4$ : $x = 6$.\nb) Je retire $9$ des deux côtés : $-2x = -8$. Je divise par $-2$ : $x = 4$.\nc) J'ajoute $5$ des deux côtés : $6x = -18$. Je divise par $6$ : $x = -3$.\n⭐ Je vérifie le b) : $9 - 2 \\times 4 = 9 - 8 = 1$. ✓\n⛔ Le piège au a) : diviser d'abord et écrire $x + 7 = 31 \\div 4$. Diviser le membre de gauche par $4$ divise AUSSI le $7$. J'enlève d'abord ce qui est ajouté : c'est plus simple et plus sûr.\nRéponse : $x = 6$ ; $x = 4$ ; $x = -3$.",
          schema: balance([
            { g: "4x + 7", d: "31" },
            { g: "4x", d: "24", op: "−7" },
            { g: "x", d: "6", op: "÷4" },
          ]),
          micros: ["equation_resoudre_simple"],
        },
        {
          enonce: "Réduire, puis résoudre.\na) $6x - 2x + x = 40$\nb) $3x + 4 + 2x - 9 = 20$\nc) $7x - 10x = 12$",
          correction:
            "Tant que $x$ apparaît plusieurs fois du même côté, il n'y a rien à isoler. Je RÉDUIS d'abord : les termes en $x$ entre eux, les nombres entre eux.\na) $6x - 2x + x = 5x$, car $6 - 2 + 1 = 5$. L'équation devient $5x = 40$, donc $x = 8$.\nb) Les $x$ : $3x + 2x = 5x$. Les nombres : $4 - 9 = -5$. L'équation devient $5x - 5 = 20$. J'ajoute $5$ : $5x = 25$. Donc $x = 5$.\nc) $7x - 10x = -3x$. L'équation devient $-3x = 12$. Je divise par $-3$ : $x = -4$.\n⭐ Je vérifie le a) : $6 \\times 8 - 2 \\times 8 + 8 = 48 - 16 + 8 = 40$. ✓\n⛔ Le piège au a) : oublier le $x$ tout seul, ou le compter pour $0$, et écrire $4x = 40$. Un $x$ seul, c'est $1x$.\nRéponse : $x = 8$ ; $x = 5$ ; $x = -4$.",
          schema: balance([
            { g: "3x + 4 + 2x - 9", d: "20" },
            { g: "5x - 5", d: "20", op: "je réduis" },
            { g: "5x", d: "25", op: "+5" },
            { g: "x", d: "5", op: "÷5" },
          ]),
          micros: ["equation_resoudre_reduction"],
        },
        {
          enonce:
            "Résoudre de deux façons : en divisant d'abord, puis en développant d'abord.\na) $5(x - 2) = 35$\nb) $4(2x + 1) = 44$\nc) Résoudre $-3(x + 4) = 6$ par la méthode de ton choix.",
          correction:
            "Une parenthèse multipliée par un nombre : deux chemins justes.\na) En divisant d'abord : je divise les deux membres par $5$, $x - 2 = 7$, puis j'ajoute $2$ : $x = 9$.\nEn développant d'abord : $5(x - 2) = 5x - 10$. L'équation devient $5x - 10 = 35$. J'ajoute $10$ : $5x = 45$. Je divise par $5$ : $x = 9$.\nb) En divisant d'abord par $4$ : $2x + 1 = 11$, puis $2x = 10$, donc $x = 5$.\nEn développant d'abord : $8x + 4 = 44$, puis $8x = 40$, donc $x = 5$.\nc) Je divise les deux membres par $-3$ : $x + 4 = -2$. Je retire $4$ : $x = -6$.\n⭐ Je vérifie le c) : $-3 \\times (-6 + 4) = -3 \\times (-2) = 6$. ✓\n⛔ Le piège : développer à moitié, $5(x - 2) = 5x - 2$. Le $5$ multiplie TOUT ce qui est dans la parenthèse, le $2$ aussi.\nRéponse : $x = 9$ ; $x = 5$ ; $x = -6$.",
          schema: deux(
            balance([
              { g: "5(x - 2)", d: "35" },
              { g: "x - 2", d: "7", op: "÷5" },
              { g: "x", d: "9", op: "+2" },
            ]),
            balance([
              { g: "5(x - 2)", d: "35" },
              { g: "5x - 10", d: "35", op: "je développe" },
              { g: "5x", d: "45", op: "+10" },
              { g: "x", d: "9", op: "÷5" },
            ]),
          ),
          micros: ["equation_resoudre_distributivite"],
        },
        {
          enonce:
            "Sans résoudre, dire si le nombre proposé est solution.\na) $-2$ est-il solution de $3x + 11 = 5$ ?\nb) $4$ est-il solution de $2x - 3 = x + 2$ ?\nc) $0$ est-il solution de $7x + 4 = 4 - 2x$ ?\nd) $1{,}5$ est-il solution de $4x = 2x + 3$ ?",
          correction:
            "Je remplace $x$ par le nombre dans CHAQUE membre, je calcule les deux côtés séparément, puis je compare.\na) À gauche : $3 \\times (-2) + 11 = -6 + 11 = 5$. À droite : $5$. Égaux : $-2$ est solution.\nb) À gauche : $2 \\times 4 - 3 = 5$. À droite : $4 + 2 = 6$. Différents : $4$ n'est pas solution.\nc) À gauche : $7 \\times 0 + 4 = 4$. À droite : $4 - 2 \\times 0 = 4$. Égaux : $0$ est solution.\nd) À gauche : $4 \\times 1{,}5 = 6$. À droite : $2 \\times 1{,}5 + 3 = 6$. Égaux : $1{,}5$ est solution.\n⛔ Le piège au c) : penser que $0$ « ne compte pas ». Zéro est un nombre comme les autres ; ici, il rend l'égalité vraie.\nRéponse : oui ; non ; oui ; oui.",
          schema: tableauProba(
            ["", "gauche", "droite", "solution ?"],
            [
              ["a) x = −2", "5", "5", "oui"],
              ["b) x = 4", "5", "6", "non"],
              ["c) x = 0", "4", "4", "oui"],
              ["d) x = 1,5", "6", "6", "oui"],
            ],
          ),
          micros: ["equation_verifier"],
        },
        {
          enonce:
            "Trois élèves se sont trompés. Trouver l'erreur de chacun, puis corriger.\na) Sami : « $5x + 3 = 18$, donc $5x = 18 + 3 = 21$, donc $x = 4{,}2$. »\nb) Inès : « $6x = 54$, donc $x = 54 - 6 = 48$. »\nc) Lucas : « $x - 4 = 10$, donc $x = 10 - 4 = 6$. »",
          correction:
            "Pour chaque élève, je teste d'abord sa réponse dans l'équation : c'est le plus rapide pour voir qu'elle est fausse.\na) $5 \\times 4{,}2 + 3 = 21 + 3 = 24$, pas $18$. Sami a AJOUTÉ $3$ au lieu de le retirer. Je retire $3$ des deux côtés : $5x = 15$, donc $x = 3$.\nb) $6 \\times 48 = 288$, pas $54$. Inès a soustrait $6$, alors que $6x$ veut dire « $6$ fois $x$ ». Je divise par $6$ : $x = 9$.\nc) $6 - 4 = 2$, pas $10$. Lucas a retiré $4$, alors que $x$ perdait déjà $4$. J'ajoute $4$ des deux côtés : $x = 14$.\n⭐ Je vérifie les trois : $5 \\times 3 + 3 = 18$ ; $6 \\times 9 = 54$ ; $14 - 4 = 10$. ✓\n⛔ Le piège : refaire l'opération qu'on voit dans l'équation. Pour défaire, on fait l'opération CONTRAIRE.\nRéponse : $x = 3$ ; $x = 9$ ; $x = 14$.",
          schema: balance([
            { g: "5x + 3", d: "18" },
            { g: "5x", d: "15", op: "−3" },
            { g: "x", d: "3", op: "÷5" },
          ]),
          micros: ["equation_defi", "equation_verifier", "equation_resoudre_simple"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs étapes. Je développe et je réduis d'abord, je regroupe les x d'un seul côté, je vérifie à la fin.",
      rappel: [
        "Des $x$ des DEUX côtés ? Je retire le même nombre de $x$ des deux côtés, pour qu'il n'en reste que d'un côté.",
        "Une parenthèse ? Je DÉVELOPPE : $k(a + b) = ka + kb$. Un moins devant la parenthèse change TOUS les signes : $-(a - b) = -a + b$.",
        "Je RÉDUIS chaque membre avant de résoudre : $3x + 2 - x = 2x + 2$.",
      ],
      exercices: [
        {
          enonce: "Résoudre.\na) $8x - 5 = 3x + 20$\nb) $3x + 10 = 7x - 6$",
          correction:
            "Il y a des $x$ des deux côtés. Je les regroupe d'abord d'un seul côté, en RETIRANT le même nombre de $x$ des deux côtés.\na) Je retire $3x$ des deux côtés : $5x - 5 = 20$. J'ajoute $5$ : $5x = 25$. Je divise par $5$ : $x = 5$.\nb) Je retire $7x$ des deux côtés : $-4x + 10 = -6$. Je retire $10$ : $-4x = -16$. Je divise par $-4$ : $x = 4$.\n⭐ Au b), je peux aussi retirer $3x$ : $10 = 4x - 6$, puis $16 = 4x$, et encore $x = 4$. Le chemin est libre ; l'équilibre, lui, est obligatoire.\n⭐ Je vérifie le b) : $3 \\times 4 + 10 = 22$ et $7 \\times 4 - 6 = 22$. ✓\n⛔ Le piège : « faire passer » $3x$ à gauche sans changer son signe, et écrire $11x - 5 = 20$. Sur la balance, rien ne « passe » : on RETIRE $3x$ des deux plateaux.\nRéponse : $x = 5$ ; $x = 4$.",
          schema: balance([
            { g: "8x - 5", d: "3x + 20" },
            { g: "5x - 5", d: "20", op: "−3x" },
            { g: "5x", d: "25", op: "+5" },
            { g: "x", d: "5", op: "÷5" },
          ]),
          micros: ["equation_resoudre_reduction"],
        },
        {
          enonce: "Développer, puis résoudre.\na) $3(x + 5) = 2x + 19$\nb) $7 - (x - 3) = 2x + 1$",
          correction:
            "Je développe d'abord, pour retrouver une équation comme au niveau 1.\na) $3(x + 5) = 3x + 15$. L'équation devient $3x + 15 = 2x + 19$. Je retire $2x$ : $x + 15 = 19$. Je retire $15$ : $x = 4$.\nb) Le moins devant la parenthèse change les DEUX signes : $-(x - 3) = -x + 3$. Donc $7 - (x - 3) = 7 - x + 3 = 10 - x$. L'équation devient $10 - x = 2x + 1$. Je retire $2x$ : $10 - 3x = 1$. Je retire $10$ : $-3x = -9$. Je divise par $-3$ : $x = 3$.\n⭐ Je vérifie le b) : $7 - (3 - 3) = 7$ et $2 \\times 3 + 1 = 7$. ✓\n⛔ Le piège au b) : écrire $-(x - 3) = -x - 3$. Le moins s'applique aussi au $-3$, qui devient $+3$. Avec l'erreur, on trouve $x = 1$ ; or $7 - (1 - 3) = 9$ alors que $2 \\times 1 + 1 = 3$.\nRéponse : $x = 4$ ; $x = 3$.",
          schema: balance([
            { g: "7 - (x - 3)", d: "2x + 1" },
            { g: "10 - x", d: "2x + 1", op: "je développe" },
            { g: "10 - 3x", d: "1", op: "−2x" },
            { g: "-3x", d: "-9", op: "−10" },
            { g: "x", d: "3", op: "÷−3" },
          ]),
          micros: ["equation_resoudre_distributivite", "equation_resoudre_reduction"],
        },
        {
          enonce: "Résoudre.\na) $4(x - 1) = 2(x + 6)$\nb) $6(x + 2) - 2(x + 1) = 34$",
          correction:
            "Deux parenthèses : je développe chacune, je réduis, puis je résous.\na) $4(x - 1) = 4x - 4$ et $2(x + 6) = 2x + 12$. L'équation devient $4x - 4 = 2x + 12$. Je retire $2x$ : $2x - 4 = 12$. J'ajoute $4$ : $2x = 16$. Donc $x = 8$.\nb) $6(x + 2) = 6x + 12$ et $-2(x + 1) = -2x - 2$. L'équation devient $6x + 12 - 2x - 2 = 34$. Je réduis : $4x + 10 = 34$. Je retire $10$ : $4x = 24$. Donc $x = 6$.\n⭐ Je vérifie le b) : $6 \\times (6 + 2) - 2 \\times (6 + 1) = 48 - 14 = 34$. ✓\n⛔ Le piège au b) : écrire $-2(x + 1) = -2x + 2$. Le $-2$ multiplie aussi le $1$ : $-2 \\times 1 = -2$.\nRéponse : $x = 8$ ; $x = 6$.",
          schema: balance([
            { g: "6(x + 2) - 2(x + 1)", d: "34" },
            { g: "6x + 12 - 2x - 2", d: "34", op: "je développe" },
            { g: "4x + 10", d: "34", op: "je réduis" },
            { g: "4x", d: "24", op: "−10" },
            { g: "x", d: "6", op: "÷4" },
          ]),
          micros: ["equation_resoudre_distributivite", "equation_resoudre_reduction"],
        },
        {
          enonce:
            "Maël affirme que $2{,}5$ est solution de $6x - 4 = 2x + 6$.\na) Vérifier son affirmation.\nb) Résoudre l'équation. Y a-t-il une autre solution ?\nc) Calculer les deux membres pour $x = 1$, $x = 2$ et $x = 3$. Que remarque-t-on ?",
          correction:
            "a) Je remplace $x$ par $2{,}5$ dans chaque membre. À gauche : $6 \\times 2{,}5 - 4 = 15 - 4 = 11$. À droite : $2 \\times 2{,}5 + 6 = 5 + 6 = 11$. Égaux : Maël a raison, $2{,}5$ est solution.\nb) Je retire $2x$ des deux côtés : $4x - 4 = 6$. J'ajoute $4$ : $4x = 10$. Je divise par $4$ : $x = 2{,}5$. La résolution ne mène qu'à UNE valeur : il n'y a pas d'autre solution.\nc) Pour $x = 1$ : $2$ et $8$. Pour $x = 2$ : $8$ et $10$. Pour $x = 3$ : $14$ et $12$.\n⭐ Le tableau le montre : quand $x$ augmente de $1$, le membre de gauche gagne $6$, celui de droite seulement $2$. La gauche, d'abord plus petite, rattrape la droite puis la dépasse : elles ne sont égales qu'une fois, en $2{,}5$.\n⛔ Le piège : conclure d'un seul essai réussi. L'essai VÉRIFIE que $2{,}5$ marche ; c'est la résolution qui PROUVE qu'il est le seul.\nRéponse : $2{,}5$ est solution, et c'est la seule.",
          schema: tableauProba(
            ["x", "1", "2", "2,5", "3"],
            [
              ["6x − 4", "2", "8", "11", "14"],
              ["2x + 6", "8", "10", "11", "12"],
            ],
          ),
          micros: ["equation_verifier", "equation_resoudre_reduction"],
        },
        {
          enonce:
            "Deux programmes de calcul.\nProgramme A : choisir un nombre, lui ajouter $6$, puis multiplier le résultat par $4$.\nProgramme B : choisir un nombre, le multiplier par $4$, puis ajouter $6$.\na) Avec le programme A, on obtient $52$. Écrire une équation et trouver le nombre de départ.\nb) Même question avec le programme B.\nc) Pourquoi les deux réponses sont-elles différentes ?",
          correction:
            "a) Programme A : j'ajoute $6$, PUIS je multiplie le tout par $4$. Il donne $(x + 6) \\times 4$, soit $4(x + 6)$. Je résous $4(x + 6) = 52$. Je divise par $4$ : $x + 6 = 13$. Je retire $6$ : $x = 7$.\nb) Programme B : je multiplie d'abord, j'ajoute ensuite. Il donne $4x + 6$. Je résous $4x + 6 = 52$. Je retire $6$ : $4x = 46$. Je divise par $4$ : $x = 11{,}5$.\n⭐ Je vérifie : A donne $(7 + 6) \\times 4 = 52$ et B donne $4 \\times 11{,}5 + 6 = 46 + 6 = 52$. ✓\nc) Les deux programmes font les mêmes opérations, mais pas dans le même ordre. Dans A, le $6$ est multiplié par $4$ ; dans B, il ne l'est pas.\n⛔ Le piège au a) : écrire $x + 6 \\times 4$. Sans parenthèses, on ne multiplierait que le $6$ : c'est une autre expression.\nRéponse : $7$ avec le programme A ; $11{,}5$ avec le programme B.",
          schema: balance([
            { g: "4(x + 6)", d: "52" },
            { g: "x + 6", d: "13", op: "÷4" },
            { g: "x", d: "7", op: "−6" },
          ]),
          micros: ["equation_traduire", "equation_resoudre_distributivite"],
        },
        {
          enonce:
            "Un triangle isocèle $ABC$ a pour base $[AB]$. Ses deux côtés égaux mesurent chacun $3$ cm de plus que la base. Son périmètre est de $36$ cm.\na) On note $x$ la longueur de la base, en cm. Exprimer $AC$ et $BC$ en fonction de $x$.\nb) Écrire une équation traduisant le périmètre, puis la résoudre.\nc) Donner les longueurs des trois côtés.",
          correction:
            "a) Chaque côté égal mesure $3$ cm de plus que la base : $AC = BC = x + 3$.\nb) Le périmètre est la somme des TROIS côtés : $x + (x + 3) + (x + 3) = 36$. Je réduis : $3x + 6 = 36$. Je retire $6$ : $3x = 30$. Donc $x = 10$.\nc) La base mesure $10$ cm, et chaque côté égal $10 + 3 = 13$ cm.\n⭐ Je vérifie dans l'énoncé : $10 + 13 + 13 = 36$ cm. ✓ Le dessin est à l'échelle : les deux côtés de $13$ cm se rejoignent bien au-dessus du milieu de la base.\n⛔ Le piège : n'écrire qu'un seul côté égal, $x + (x + 3) = 36$. Un triangle isocèle a DEUX côtés égaux : il y a trois côtés à additionner.\nRéponse : la base mesure $10$ cm, les deux autres côtés $13$ cm chacun.",
          schema: triangle({ A: [0, 0], B: [10, 0], C: [5, 12] }, { cotes: { AB: "base x = 10 cm", BC: "x + 3 = 13 cm", CA: "x + 3 = 13 cm" } }),
          micros: ["equation_traduire", "equation_resoudre_reduction", "equation_probleme"],
        },
        {
          enonce:
            "Au basket, un panier réussi vaut $2$ ou $3$ points (on laisse de côté les lancers francs). Une joueuse marque $28$ points. Elle a réussi $4$ paniers à $2$ points de plus que de paniers à $3$ points.\na) On note $x$ le nombre de paniers à $3$ points. Exprimer le nombre de paniers à $2$ points.\nb) Expliquer pourquoi $3x + 2(x + 4) = 28$.\nc) Résoudre cette équation, puis donner le détail de ses points.",
          correction:
            "a) Elle a réussi $4$ paniers à $2$ points de plus : $x + 4$ paniers à $2$ points.\nb) Les paniers à $3$ points rapportent $3 \\times x = 3x$ points ; les paniers à $2$ points, $2 \\times (x + 4) = 2(x + 4)$ points. En tout, $28$ points : $3x + 2(x + 4) = 28$.\nc) Je développe : $3x + 2x + 8 = 28$. Je réduis : $5x + 8 = 28$. Je retire $8$ : $5x = 20$. Donc $x = 4$.\nElle a réussi $4$ paniers à $3$ points ($12$ points) et $4 + 4 = 8$ paniers à $2$ points ($16$ points).\n⭐ Je vérifie dans l'énoncé : $12 + 16 = 28$ points ✓, et $8$ paniers, c'est bien $4$ de plus que $4$. ✓\n⛔ Le piège : développer $2(x + 4)$ en $2x + 4$. On trouve $5x = 24$, soit $4{,}8$ paniers : un nombre de paniers à virgule, c'est le signal d'une erreur.\nRéponse : $4$ paniers à $3$ points et $8$ paniers à $2$ points.",
          schema: balance([
            { g: "3x + 2(x + 4)", d: "28" },
            { g: "3x + 2x + 8", d: "28", op: "je développe" },
            { g: "5x + 8", d: "28", op: "je réduis" },
            { g: "5x", d: "20", op: "−8" },
            { g: "x", d: "4", op: "÷5" },
          ]),
          micros: ["equation_probleme", "equation_resoudre_distributivite", "equation_resoudre_reduction"],
        },
        {
          enonce:
            "Emma a $12$ ans et sa mère a $40$ ans.\na) Quel âge auront-elles dans $x$ années ?\nb) Dans combien d'années la mère aura-t-elle exactement le double de l'âge d'Emma ? Écrire une équation et la résoudre.\nc) Vérifier avec les âges trouvés.",
          correction:
            "a) Dans $x$ années, Emma aura $12 + x$ ans et sa mère $40 + x$ ans : le temps passe pour les deux.\nb) Le double de l'âge d'Emma sera $2(12 + x)$. Je cherche $x$ tel que $2(12 + x) = 40 + x$.\nJe développe : $24 + 2x = 40 + x$. Je retire $x$ des deux côtés : $24 + x = 40$. Je retire $24$ : $x = 16$.\nc) Dans $16$ ans, Emma aura $12 + 16 = 28$ ans et sa mère $40 + 16 = 56$ ans. Et $2 \\times 28 = 56$. ✓\n⭐ Le tableau le montre : l'écart entre la mère et Emma reste de $28$ ans, et c'est quand Emma a elle-même $28$ ans que sa mère a le double de son âge.\n⛔ Le piège : doubler seulement l'âge d'aujourd'hui et écrire $2 \\times 12 + x = 40 + x$. Il n'y a alors aucune solution. C'est TOUT l'âge futur d'Emma qui est doublé, parenthèse comprise.\nRéponse : dans $16$ ans, quand Emma aura $28$ ans et sa mère $56$ ans.",
          schema: pile(
            tableauProba(
              ["dans … ans", "0", "8", "16"],
              [
                ["Emma", "12", "20", "28"],
                ["sa mère", "40", "48", "56"],
                ["double d'Emma", "24", "40", "56"],
              ],
            ),
            balance([
              { g: "2(12 + x)", d: "40 + x" },
              { g: "24 + 2x", d: "40 + x", op: "je développe" },
              { g: "24 + x", d: "40", op: "−x" },
              { g: "x", d: "16", op: "−24" },
            ]),
          ),
          micros: ["equation_traduire", "equation_resoudre_distributivite", "equation_verifier", "equation_probleme"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Des situations réelles. Je nomme l'inconnue, j'écris l'équation, je résous, puis je réponds par une phrase.",
      rappel: [
        "METTRE EN ÉQUATION : je choisis l'inconnue et je l'écris (« soit $x$ la largeur, en m »), je traduis l'énoncé par une égalité, puis je résous.",
        "Je VÉRIFIE dans l'énoncé, pas seulement dans l'équation, et je réponds par une phrase, avec l'unité.",
        "Une réponse absurde (un terrain plus large que long, un nombre de coureurs à virgule) est le signal d'une erreur : je relis ma traduction.",
      ],
      exercices: [
        {
          titre: "Le terrain de football",
          enonce:
            "Pour les grands matchs, la FIFA recommande un terrain de football rectangulaire dont la longueur dépasse la largeur de $37$ m. Le tour complet du terrain mesure alors $346$ m.\na) On note $x$ la largeur du terrain, en m. Exprimer sa longueur, puis son périmètre, en fonction de $x$.\nb) Écrire une équation et la résoudre.\nc) Donner les dimensions du terrain, puis son aire.\nd) Pour s'échauffer, un arbitre fait $3$ fois le tour du terrain. Parcourt-il plus d'un kilomètre ?",
          correction:
            "a) La longueur mesure $x + 37$. Le périmètre est deux fois la somme de la longueur et de la largeur : $2(x + x + 37) = 2(2x + 37)$.\nb) $2(2x + 37) = 346$. Je développe : $4x + 74 = 346$. Je retire $74$ : $4x = 272$. Je divise par $4$ : $x = 68$.\nc) La largeur mesure $68$ m et la longueur $68 + 37 = 105$ m. L'aire vaut $105 \\times 68 = 7\\,140$ m².\n⭐ Je vérifie dans l'énoncé : $2 \\times (105 + 68) = 2 \\times 173 = 346$ m. ✓ Ce sont bien les dimensions recommandées par la FIFA.\nd) $3 \\times 346 = 1\\,038$ m : oui, un peu plus d'un kilomètre.\n⛔ Le piège : prendre $x + (x + 37)$ pour le périmètre. Ce n'est que la MOITIÉ du tour : on trouverait un terrain de $154{,}5$ m de large, plus large que long.\nRéponse : le terrain mesure $105$ m sur $68$ m, son aire est de $7\\,140$ m², et trois tours font $1\\,038$ m.",
          schema: deux(
            terrain(105, 68, "longueur x + 37 = 105 m", "largeur x = 68 m"),
            balance([
              { g: "2(2x + 37)", d: "346" },
              { g: "4x + 74", d: "346", op: "je développe" },
              { g: "4x", d: "272", op: "−74" },
              { g: "x", d: "68", op: "÷4" },
            ]),
          ),
          micros: ["equation_traduire", "equation_resoudre_distributivite", "equation_probleme"],
        },
        {
          titre: "Électrique ou essence ?",
          enonce:
            "Une famille hésite entre deux voitures neuves.\n• Électrique : $30\\,000$ € à l'achat, puis environ $40$ € d'électricité tous les $1\\,000$ km.\n• Essence : $23\\,000$ € à l'achat, puis environ $110$ € de carburant tous les $1\\,000$ km.\nOn note $x$ le nombre de MILLIERS de kilomètres parcourus.\na) Calculer le coût total, achat compris, de chaque voiture après $50\\,000$ km, c'est-à-dire pour $x = 50$.\nb) Exprimer le coût total de chaque voiture en fonction de $x$.\nc) Au bout de combien de kilomètres les deux coûts sont-ils égaux ? Quel est alors ce coût ?\nd) En France, une voiture roule en moyenne environ $12\\,000$ km par an. Au bout de combien d'années l'électrique devient-elle la moins chère ?",
          correction:
            "a) Pour $x = 50$ : électrique $30\\,000 + 40 \\times 50 = 32\\,000$ € ; essence $23\\,000 + 110 \\times 50 = 28\\,500$ €. À $50\\,000$ km, l'essence coûte encore moins cher.\nb) Électrique : $30\\,000 + 40x$. Essence : $23\\,000 + 110x$.\nc) Je cherche $x$ tel que $30\\,000 + 40x = 23\\,000 + 110x$. Je retire $110x$ des deux côtés : $30\\,000 - 70x = 23\\,000$. Je retire $30\\,000$ : $-70x = -7\\,000$. Je divise par $-70$ : $x = 100$.\n$x$ compte des MILLIERS de km : les coûts sont égaux au bout de $100\\,000$ km. Ils valent alors $30\\,000 + 40 \\times 100 = 34\\,000$ €, et $23\\,000 + 110 \\times 100 = 34\\,000$ €. ✓\nd) $100\\,000 \\div 12\\,000 \\approx 8{,}3$ : au bout d'un peu plus de $8$ ans, l'électrique devient la moins chère.\n⭐ Le tableau le montre : l'écart de départ, $7\\,000$ €, fond de $3\\,500$ € tous les $50\\,000$ km, et s'annule à $100\\,000$ km.\n⛔ Le piège : répondre « $100$ km ». L'inconnue compte des milliers de kilomètres : je relis ce que $x$ représente avant d'écrire la phrase.\nRéponse : les deux voitures coûtent autant, $34\\,000$ €, au bout de $100\\,000$ km, soit un peu plus de $8$ ans de route.",
          schema: pile(
            tableauProba(
              ["km", "0", "50 000", "100 000", "150 000"],
              [
                ["électrique (€)", "30 000", "32 000", "34 000", "36 000"],
                ["essence (€)", "23 000", "28 500", "34 000", "39 500"],
              ],
            ),
            balance([
              { g: "30000 + 40x", d: "23000 + 110x" },
              { g: "30000 - 70x", d: "23000", op: "−110x" },
              { g: "-70x", d: "-7000", op: "−30000" },
              { g: "x", d: "100", op: "÷−70" },
            ]),
          ),
          micros: ["equation_probleme", "equation_resoudre_reduction"],
        },
        {
          titre: "Le CO₂ de l'air",
          enonce:
            "À l'observatoire de Mauna Loa, à Hawaï, on mesure le dioxyde de carbone (CO₂) de l'air depuis 1958. En 2024, sa concentration moyenne était d'environ $424$ ppm (parties par million). Depuis dix ans, elle augmente d'environ $2{,}5$ ppm par an.\na) Si la hausse continue à ce rythme, quelle serait la concentration $x$ années après 2024 ?\nb) Écrire une équation pour savoir au bout de combien d'années on atteindrait $450$ ppm, puis la résoudre.\nc) En quelle année dépasserait-on $450$ ppm pour la première fois ?\nd) Vers 1750, avant l'ère industrielle, l'air contenait environ $280$ ppm. Au rythme de $2{,}5$ ppm par an, combien d'années aurait-il fallu pour passer de $280$ à $424$ ppm ? Comparer avec la réalité.",
          correction:
            "a) Chaque année ajoute $2{,}5$ ppm : $x$ années après 2024, la concentration serait de $424 + 2{,}5x$ ppm.\nb) Je cherche $x$ tel que $424 + 2{,}5x = 450$. Je retire $424$ : $2{,}5x = 26$. Je divise par $2{,}5$ : $x = 10{,}4$.\nc) $x$ compte des années entières. Au bout de $10$ ans, en 2034 : $424 + 2{,}5 \\times 10 = 449$ ppm, pas encore $450$. Au bout de $11$ ans, en 2035 : $424 + 2{,}5 \\times 11 = 451{,}5$ ppm. On dépasserait $450$ ppm en 2035.\nd) Je résous $280 + 2{,}5x = 424$ : $2{,}5x = 144$, donc $x = 57{,}6$. Au rythme d'aujourd'hui, il aurait fallu moins de $60$ ans ; il en a fallu environ $270$, de 1750 à 2024. La hausse était bien plus lente autrefois : elle s'est ACCÉLÉRÉE.\n⛔ Le piège au c) : arrondir $10{,}4$ à $10$ et répondre 2034. En 2034, on n'est qu'à $449$ ppm : pour DÉPASSER $450$, il faut arrondir au-dessus.\nRéponse : au rythme actuel, on dépasserait $450$ ppm en 2035.",
          schema: pile(
            tableau(["année", "2024", "2030", "2034", "2035"], ["CO₂ (ppm)", 424, 439, 449, 451.5]),
            balance([
              { g: "424 + 2.5x", d: "450" },
              { g: "2.5x", d: "26", op: "−424" },
              { g: "x", d: "10.4", op: "÷2.5" },
            ]),
          ),
          micros: ["equation_probleme", "equation_traduire", "equation_defi"],
        },
        {
          titre: "Le marathon en relais",
          enonce:
            "Un ekiden est un marathon couru en relais par une équipe de six coureurs : $42{,}195$ km au total. Trois relayeurs courent chacun la même distance, $x$ km ; deux autres courent chacun le double ; le dernier court $7{,}195$ km.\na) Montrer que la distance totale s'écrit $3x + 2 \\times 2x + 7{,}195$, puis réduire cette expression.\nb) Écrire une équation, la résoudre, et donner la distance de chaque relais.\nc) Un élève a écrit $3x + 2x + 7{,}195 = 42{,}195$. Quelle est son erreur ? Que trouve-t-il, et comment voir que c'est faux ?",
          correction:
            "a) Trois relais de $x$ km : $3x$. Deux relais du double, $2x$ CHACUN : $2 \\times 2x = 4x$. Plus le dernier, $7{,}195$ km. En tout : $3x + 2 \\times 2x + 7{,}195 = 3x + 4x + 7{,}195 = 7x + 7{,}195$.\nb) La distance totale est celle du marathon : $7x + 7{,}195 = 42{,}195$. Je retire $7{,}195$ : $7x = 35$. Je divise par $7$ : $x = 5$.\nLes relais mesurent $5$ km, $10$ km, $5$ km, $10$ km, $5$ km et $7{,}195$ km.\n⭐ Je vérifie dans l'énoncé : $5 + 10 + 5 + 10 + 5 + 7{,}195 = 42{,}195$ km. ✓ Ce sont les distances officielles de l'ekiden.\nc) L'élève a compté les deux relais doubles pour $2x$ en tout, au lieu de $2x$ chacun. Il trouve $5x = 35$, donc $x = 7$, et des relais de $7$ km et $14$ km. Mais alors $3 \\times 7 + 2 \\times 14 + 7{,}195 = 56{,}195$ km : bien plus qu'un marathon.\n⛔ Le piège : « deux relais du double » ne fait pas $2x$, mais $2 \\times 2x = 4x$. Je vérifie TOUJOURS dans l'énoncé : c'est là que l'erreur saute aux yeux.\nRéponse : trois relais de $5$ km, deux de $10$ km, et un dernier de $7{,}195$ km.",
          schema: pile(
            relais([
              { km: 5, nom: "x" },
              { km: 10, nom: "2x" },
              { km: 5, nom: "x" },
              { km: 10, nom: "2x" },
              { km: 5, nom: "x" },
              { km: 7.195, nom: "fin" },
            ]),
            balance([
              { g: "3x + 4x + 7.195", d: "42.195" },
              { g: "7x + 7.195", d: "42.195", op: "je réduis" },
              { g: "7x", d: "35", op: "−7.195" },
              { g: "x", d: "5", op: "÷7" },
            ]),
          ),
          micros: ["equation_probleme", "equation_traduire", "equation_resoudre_reduction", "equation_defi"],
        },
      ],
    },
  ],
};
