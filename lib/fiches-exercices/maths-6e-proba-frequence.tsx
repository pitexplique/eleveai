// ─── Fiche d'exercices : les fréquences observées (6e) — 20 exercices ──────────
//
// Lot de 6e du 30/09/2026, sur le modèle de la feuille étalon
// `maths-5e-relatif-nombre.tsx` et de la feuille voisine
// `maths-5e-proba-experience.tsx` (aides `roue` et `echelle` reprises,
// mesurées à 375 px).
//
// Pas de fiche de cours de 6e pour cette notion (fichesCours: []). Alignée sur
// la banque `lib/tutor-v4/questionBank/6e/maths/probabilites.bank.ts`, notionId
// proba_frequence (6e-D-probabilites-3, « l'approche fréquentiste ») :
// calculer une fréquence observée (fraction, décimal, pourcentage), comparer
// l'observé au calculé (le nombre de fois ATTENDU), répéter : l'écart se
// réduit, et le hasard n'a pas de mémoire.
// ⛔ LIMITES DE LA 6e, lues dans la banque : une seule épreuve, sauf les deux
// pièces lancées ensemble (PP, PF, FP, FF), que la banque pose elle-même.
// Le nombre attendu se calcule en PARTAGEANT : « un quart de 40, c'est
// 40 ÷ 4 » (la banque écrit « 60 × 1/6 », on garde le partage, geste de 6e).
// Les fréquences tombent sur des dixièmes, des centièmes ou des millièmes
// exacts ; 1/6 se dit « environ 0,17 ».
// ⛔ Aucun exemple de la banque repris tel quel (20 lancers de deux pièces et
// 6 « deux piles », 60 lancers de dé et 10 six, les fréquences 0,60 / 0,44 /
// 0,52 / 0,492, 5 piles de suite, 300 six sur 600).
// ⭐ Phrases courtes (Frédéric, 30/09) : des 6e qui lisent parfois mal. Une
// idée par phrase, 12 mots en moyenne.
//
// Les pièges nommés : relire la liste une fois par face (1), diviser dans le
// mauvais sens (2), oublier l'autre issue (3), croire que l'expérience DOIT
// donner l'attendu (4, 6, 11), croire la série courte (5), une fréquence
// plus grande que 1 (7), le hasard qui « rattrape » (8, 15), PF et FP comptés
// comme une seule issue (9, 19), une fréquence qui « monte toujours » (10),
// deviner la composition sans calcul (12), garder une seule classe (13), le
// sachet pris pour une promesse (14), confondre « une chance sur deux » et
// « la moitié des lancers » (16), croire toutes les issues équiprobables (17),
// juger un écart sans le nombre d'essais (18), l'écart qui se réduit pris
// pour un écart nul (20).
//
// Aucun fait réel : les lancers de Julie, de Tom, du bouchon, les classes, la
// punaise, les graines, le dé de Zoé et la roue du stand sont des MODÈLES. Seule
// idée générale : une punaise ne tombe pas « une fois sur deux » de chaque côté
// (sa forme n'est pas symétrique) — on ne donne aucune valeur réelle, seulement
// celle des lancers inventés.
//
// ⭐ LES DESSINS : `de` et `billes` de figures.tsx (sans largeur minimale), et,
// en SVG local sans largeur minimale : la ROUE et l'ÉCHELLE de 0 à 1 (reprises
// de la 5e), les BARRES et les POINTS RELIÉS (reprises de la feuille des données
// de 6e), la GRILLE (tableau HTML de trois colonnes au plus) et les PIÈCES (une
// suite de lancers, le prochain en « ? »). 14 dessins imprimés ; les schémas
// qui redisent le corrigé sont `ecranSeulement`, leurs données sont alors
// dans l'énoncé.
//
// Les corrigés sont écrits à la première personne (« je compte »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-proba-frequence.mjs`
// — les lancers recomptés un par un, chaque fréquence refaite en fraction
// EXACTE puis en décimal, chaque nombre attendu, écart et total refait depuis
// l'énoncé ou le dessin.
//
// Micro-compétences : proba_frequence_calculer (1, 2, 3, 7, 9, 10, 12, 13, 14,
// 17, 19, 20), proba_frequence_comparer (4, 6, 9, 11, 12, 14, 16, 18, 19, 20),
// proba_frequence_repeter (5, 8, 10, 13, 15, 17, 18, 19, 20). 3/3.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE, billes, de } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const JAUNE = "#eab308";
const VIOLET = "#7c3aed";
const GRIS = "#94a3b8";
const NOIR = "#0f172a";

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** 18.5 → « 18,5 » : le texte NU d'un dessin (SVG, pas de KaTeX). */
const fr = (x: number) => String(Math.round(x * 1000) / 1000).replace(".", ",").replace("-", "−");

const TEINTES_ROUE = [BLEU, ORANGE, VERT, JAUNE, VIOLET, ROUGE];

/**
 * La ROUE de loterie (reprise de la 5e), en SVG local : police 15 dans un
 * viewBox de 300, aucune largeur minimale. Secteurs à la vraie proportion de
 * leur `poids`, flèche en haut. ⛔ Texte NU. ⭐ Le script relit les secteurs.
 */
const roue = (segments: { label: string; poids: number; couleur?: string }[]) => {
  const total = segments.reduce((s, g) => s + g.poids, 0);
  const [cx, cy, r] = [150, 124, 100];
  const pt = (a: number, rr: number) => [cx + rr * Math.cos((a * Math.PI) / 180), cy + rr * Math.sin((a * Math.PI) / 180)];
  let a0 = -90;
  const parts = segments.map((g, i) => {
    const da = (g.poids / total) * 360;
    const [a, b] = [a0, a0 + da];
    a0 = b;
    const [x1, y1] = pt(a, r);
    const [x2, y2] = pt(b, r);
    const [lx, ly] = pt((a + b) / 2, r * 0.62);
    return {
      d: `M ${cx} ${cy} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${da > 180 ? 1 : 0} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`,
      lx,
      ly,
      couleur: g.couleur ?? TEINTES_ROUE[i % TEINTES_ROUE.length],
      label: g.label,
    };
  });
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[12rem]">
      <svg viewBox="0 0 300 232" className="block h-auto w-full" role="img" aria-label="Roue de loterie">
        {parts.map((p, i) => (
          <path key={i} d={p.d} fill={p.couleur} stroke="#ffffff" strokeWidth={2} />
        ))}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={NOIR} strokeWidth={2} />
        {parts.map((p, i) => (
          <text key={`t${i}`} x={p.lx} y={p.ly + 5} textAnchor="middle" fontSize="15" fontWeight="900" fill={NOIR} stroke="#ffffff" strokeWidth={3} paintOrder="stroke">
            {p.label}
          </text>
        ))}
        <path d={`M ${cx - 9} 4 L ${cx + 9} 4 L ${cx} 22 Z`} fill={NOIR} />
      </svg>
    </div>
  );
};

/**
 * L'ÉCHELLE de 0 à 1 (reprise de la 5e), graduée en dixièmes, et des points
 * nommés sur deux hauteurs alternées (20 d'écart). ⛔ Texte NU.
 * ⭐ Le script relit les `valeur`.
 */
const echelle = (points: { label: string; valeur: number }[]) => {
  const x = (v: number) => 24 + v * 252;
  const tries = [...points].sort((a, b) => a.valeur - b.valeur);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox="0 0 300 104" className="block h-auto w-full" role="img" aria-label="Échelle de 0 à 1">
        <rect x={x(0)} y="60" width={x(1) - x(0)} height="8" fill="#bbf7d0" />
        <line x1={x(0) - 10} y1="64" x2={x(1) + 10} y2="64" stroke="#334155" strokeWidth="2" />
        {Array.from({ length: 11 }, (_, k) => (
          <line key={k} x1={x(k / 10)} y1={k % 5 ? 59 : 55} x2={x(k / 10)} y2={k % 5 ? 69 : 73} stroke="#334155" strokeWidth={k % 5 ? 1.2 : 2} />
        ))}
        {["0", "0,5", "1"].map((t, k) => (
          <text key={t} x={x(k / 2)} y="94" textAnchor="middle" fontSize="14" fontWeight="900" fill="#334155">
            {t}
          </text>
        ))}
        {tries.map((p, i) => {
          const haut = i % 2 === 0 ? 20 : 40;
          return (
            <g key={p.label}>
              <line x1={x(p.valeur)} y1={haut + 4} x2={x(p.valeur)} y2="64" stroke={BLEU} strokeWidth="1.5" strokeDasharray="3 2" />
              <circle cx={x(p.valeur)} cy="64" r="5" fill={BLEU} />
              <text x={x(p.valeur)} y={haut} textAnchor="middle" fontSize="15" fontWeight="900" fill={BLEU}>
                {p.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

type Barre = { label: string; value: number };

/**
 * Un diagramme en BARRES (reprise de la feuille des données de 6e) : viewBox
 * 300, police 14, la valeur au-dessus de chaque barre, aucune largeur
 * minimale. ⭐ Le script relit `{ label, value }`.
 */
const barres = (data: Barre[]) => {
  const [W, G, D, HAUT, BAS] = [300, 16, 10, 28, 150];
  const vmax = Math.max(1, ...data.map((d) => d.value));
  const y = (v: number) => BAS - (v / vmax) * (BAS - HAUT);
  const slot = (W - G - D) / data.length;
  const bw = Math.min(40, slot * 0.6);
  const H = BAS + 30;
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Diagramme en barres">
        <rect x="0" y="0" width={W} height={H} rx="10" fill="#fff" />
        <line x1={G - 4} y1={HAUT - 14} x2={G - 4} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={G - 4} y1={BAS} x2={W - D} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        {data.map((d, i) => {
          const x = G + i * slot + (slot - bw) / 2;
          return (
            <g key={i}>
              <rect x={x} y={y(d.value)} width={bw} height={BAS - y(d.value)} rx="3" fill="#bfdbfe" stroke={BLEU} strokeWidth="1.5" />
              <text x={x + bw / 2} y={y(d.value) - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a" stroke="#fff" strokeWidth="3" paintOrder="stroke">
                {fr(d.value)}
              </text>
              <text x={x + bw / 2} y={BAS + 20} textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

/**
 * Des POINTS RELIÉS (reprise de la 5e), viewBox 300 × 204, police 14, la
 * valeur au-dessus de chaque point. ⭐ Le script relit etiquettes, valeurs, pas.
 */
const pointsRelies = (etiquettes: string[], valeurs: number[], pas: number) => {
  const [G, D, HAUT, BAS] = [44, 14, 26, 168];
  const W = 300;
  const vmax = Math.ceil(Math.max(...valeurs) / pas) * pas;
  const y = (v: number) => BAS - (v / vmax) * (BAS - HAUT);
  const slot = (W - G - D) / etiquettes.length;
  const x = (i: number) => G + slot * (i + 0.5);
  const graduations = Array.from({ length: vmax / pas + 1 }, (_, k) => k * pas);
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} 204`} className="block h-auto w-full" role="img" aria-label="Points reliés">
        <rect x="0" y="0" width={W} height="204" rx="10" fill="#fff" />
        {graduations.map((g) => (
          <g key={g}>
            <line x1={G} y1={y(g)} x2={W - D} y2={y(g)} stroke="#e2e8f0" strokeWidth="1" />
            <text x={G - 6} y={y(g) + 5} textAnchor="end" fontSize="14" fontWeight="700" fill="#334155">
              {fr(g)}
            </text>
          </g>
        ))}
        <line x1={G} y1={HAUT - 12} x2={G} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <line x1={G} y1={BAS} x2={W - D} y2={BAS} stroke="#0f172a" strokeWidth="1.5" />
        <polyline points={valeurs.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")} fill="none" stroke={BLEU} strokeWidth="2.5" strokeLinejoin="round" />
        {valeurs.map((v, i) => (
          <g key={i}>
            <circle cx={x(i)} cy={y(v)} r="4.5" fill={ROUGE} />
            <text x={x(i)} y={y(v) - 9} textAnchor="middle" fontSize="14" fontWeight="800" fill="#0f172a" stroke="#fff" strokeWidth="3" paintOrder="stroke">
              {fr(v)}
            </text>
            <text x={x(i)} y={BAS + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill="#334155">
              {etiquettes[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Un tableau HTML (reprise de la 5e) : TROIS colonnes au plus, textes courts.
 * La dernière ligne en gras si `total`. ⛔ Texte NU dans les cases.
 */
const grille = (entetes: string[], lignes: string[][], total = false) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[14rem]">
    <table className="w-full border-collapse text-center text-[13px] print:text-[10px]">
      <thead>
        <tr>
          {entetes.map((e, i) => (
            <th key={i} className="border border-slate-300 bg-slate-100 px-1.5 py-1 font-bold text-slate-700">
              {e}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {lignes.map((l, i) => (
          <tr key={i} className={total && i === lignes.length - 1 ? "bg-slate-50 font-bold" : ""}>
            {l.map((c, j) => (
              <td key={j} className="border border-slate-300 px-1.5 py-0.5 text-slate-800">
                {c}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

/**
 * Une suite de LANCERS de pièce : un disque par lancer, P ou F dedans, le
 * prochain lancer en « ? » orange. SVG local, viewBox 300, cinq pièces au plus.
 * ⭐ Le script relit les faces.
 */
const pieces = (faces: string[]) => (
  <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
    <svg viewBox="0 0 300 64" className="block h-auto w-full" role="img" aria-label="Lancers de pièce">
      {faces.map((f, i) => {
        const cx = 46 + i * 52;
        const inconnu = f === "?";
        return (
          <g key={i}>
            <circle cx={cx} cy="32" r="22" fill={inconnu ? "#fed7aa" : "#fde68a"} stroke={inconnu ? ORANGE : "#a16207"} strokeWidth="2.5" strokeDasharray={inconnu ? "5 3" : undefined} />
            <text x={cx} y="39" textAnchor="middle" fontSize="20" fontWeight="900" fill={NOIR}>
              {f}
            </text>
          </g>
        );
      })}
    </svg>
  </div>
);

export const exercicesProbaFrequence6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "proba-frequence",
  titre: "Fréquences observées",
  accroche:
    "Vingt exercices, du geste seul au problème. Lancer, compter ce qui est sorti, calculer une fréquence observée. La comparer à la probabilité, et au nombre de fois attendu. Voir l'écart se réduire quand on répète. Des pièces, des dés, des roues, un sac de billes, une punaise, des graines, toute une classe qui réunit ses lancers. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon. Puis ouvre la correction : étape par étape, avec le piège nommé.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/proba-frequence", titre: "La fréquence : lancer pour de vrai" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un seul geste : je compte ce qui est sorti, je divise par le nombre d'essais, puis je compare.",
      rappel: [
        "Fréquence observée = nombre de fois obtenu ÷ nombre d'essais.",
        "La fréquence se lit APRÈS avoir lancé. La probabilité se calcule AVANT.",
        "Une fréquence est toujours entre 0 et 1.",
        "Je peux l'écrire en fraction, en nombre décimal ou en pourcentage.",
      ],
      exercices: [
        {
          enonce:
            "Julie lance une pièce $20$ fois. Elle note P pour pile et F pour face :\nF P P F P P P F P F P P F P F P P F P P\na) Combien de fois pile est-il sorti ?\nb) Quelle est la fréquence observée de pile ? Écris-la en fraction, puis en nombre décimal.",
          correction:
            "a) Je lis la liste une seule fois. Un trait par lettre, dans la bonne ligne.\nPile : $13$ fois. Face : $7$ fois.\nContrôle : $13 + 7 = 20$ lancers.\nb) Pile est sorti $13$ fois sur $20$ lancers : $\\dfrac{13}{20}$.\n$\\dfrac{13}{20} = \\dfrac{65}{100} = 0{,}65$.\n⛔ Le piège : relire la liste pour chaque lettre. On saute vite une lettre. Le total $20$ contrôle tout.\nRéponse : a) $13$ fois ; b) $\\dfrac{13}{20}$, soit $0{,}65$.",
          schema: grille(["face", "traits", "effectif"], [
            ["pile", "||||| ||||| |||", "13"],
            ["face", "||||| ||", "7"],
            ["total", "", "20"],
          ], true),
          micros: ["proba_frequence_calculer"],
        },
        {
          enonce:
            "Tom lance un dé $60$ fois. Le diagramme montre combien de fois chaque face est sortie.\na) Vérifie qu'il y a bien $60$ lancers.\nb) Combien de fois le $4$ est-il sorti ?\nc) Quelle est la fréquence observée du $4$ ? Écris-la en fraction, puis en nombre décimal.",
          figure: barres([
            { label: "1", value: 8 },
            { label: "2", value: 11 },
            { label: "3", value: 9 },
            { label: "4", value: 12 },
            { label: "5", value: 10 },
            { label: "6", value: 10 },
          ]),
          correction:
            "a) J'additionne toutes les barres : $8 + 11 + 9 + 12 + 10 + 10 = 60$.\nb) La barre du $4$ porte $12$.\nc) Le $4$ est sorti $12$ fois sur $60$ : $\\dfrac{12}{60}$.\n$12 \\div 60 = 0{,}2$.\n⛔ Le piège : diviser dans le mauvais sens, $60 \\div 12 = 5$. Une fréquence ne dépasse jamais $1$.\nRéponse : b) $12$ fois ; c) $\\dfrac{12}{60}$, soit $0{,}2$.",
          micros: ["proba_frequence_calculer"],
        },
        {
          enonce:
            "On lance un bouchon de bouteille $100$ fois. Il tombe $64$ fois à l'endroit. Les autres fois, il tombe à l'envers.\na) Quelle est la fréquence de « à l'endroit » ? Écris-la en fraction, en décimal, puis en pourcentage.\nb) Combien de fois « à l'envers » ? Quelle est sa fréquence ?",
          correction:
            "a) $64$ fois sur $100$ : $\\dfrac{64}{100} = 0{,}64$, soit $64$ %.\nb) $100 - 64 = 36$ fois à l'envers.\n$\\dfrac{36}{100} = 0{,}36$, soit $36$ %.\n⭐ Contrôle : $64 + 36 = 100$ %.\n⛔ Le piège : oublier l'autre issue. Les deux fréquences font $1$ à elles deux.\nRéponse : a) $0{,}64$, soit $64$ % ; b) $36$ fois, $0{,}36$.",
          schema: ecranSeulement(barres([{ label: "endroit", value: 64 }, { label: "envers", value: 36 }])),
          micros: ["proba_frequence_calculer"],
        },
        {
          enonce:
            "Une roue a $4$ secteurs égaux : bleu, orange, vert, jaune. On la fait tourner $40$ fois.\na) Quelle est la probabilité d'obtenir le vert ?\nb) Combien de verts peut-on attendre, à peu près ?\nc) Obtiendra-t-on forcément ce nombre ?",
          correction:
            "a) $1$ secteur vert sur $4$ secteurs égaux : $1$ chance sur $4$, soit $\\dfrac{1}{4}$.\nb) Un quart des tours : $40 \\div 4 = 10$ verts, à peu près.\nc) Non. C'est un ordre de grandeur. On obtiendra peut-être $8$, $11$ ou $13$ verts.\n⛔ Le piège : croire que l'expérience DOIT donner $10$. Le hasard fait varier le résultat.\nRéponse : a) $\\dfrac{1}{4}$ ; b) environ $10$ ; c) non.",
          schema: roue([{ label: "B", poids: 1, couleur: BLEU }, { label: "O", poids: 1, couleur: ORANGE }, { label: "V", poids: 1, couleur: VERT }, { label: "J", poids: 1, couleur: JAUNE }]),
          micros: ["proba_frequence_comparer"],
        },
        {
          enonce:
            "La probabilité d'obtenir pile est $0{,}5$. Amir lance une pièce $10$ fois : il trouve une fréquence de pile de $0{,}7$. Bella la lance $1\\,000$ fois : elle trouve $0{,}51$.\na) Calcule l'écart entre chaque fréquence et $0{,}5$.\nb) Quelle série est la plus fiable ? Pourquoi ?",
          correction:
            "a) Amir : $0{,}7 - 0{,}5 = 0{,}2$.\nBella : $0{,}51 - 0{,}5 = 0{,}01$.\nb) La série de Bella : $1\\,000$ lancers, contre $10$.\nSur $10$ lancers, le hasard a beaucoup de place. Sur $1\\,000$, beaucoup moins.\nSa fréquence est presque collée à $0{,}5$.\n⛔ Le piège : croire la série courte parce qu'elle « surprend ». Plus on lance, plus la fréquence est fiable.\nRéponse : a) $0{,}2$ et $0{,}01$ ; b) celle de Bella.",
          schema: echelle([{ label: "Amir", valeur: 0.7 }, { label: "Bella", valeur: 0.51 }]),
          micros: ["proba_frequence_repeter"],
        },
        {
          enonce:
            "Un sac contient $1$ bille rouge et $4$ billes bleues. On tire une bille, on note sa couleur, puis on la remet. On fait cela $50$ fois. On obtient $13$ fois rouge.\na) Quelle est la probabilité de tirer rouge ?\nb) Quelle est la fréquence observée de rouge ?\nc) Combien de rouges pouvait-on attendre sur $50$ tirages ?\nd) L'écart est-il inquiétant ?",
          correction:
            "a) $1$ bille rouge sur $5$ billes : $\\dfrac{1}{5}$, soit $0{,}2$.\nb) $13$ fois sur $50$ : $\\dfrac{13}{50} = \\dfrac{26}{100} = 0{,}26$.\nc) Un cinquième des tirages : $50 \\div 5 = 10$ rouges, à peu près.\nd) On attendait environ $10$ rouges. On en a eu $13$ : $3$ de plus.\nSur $50$ tirages seulement, c'est un écart normal.\n⛔ Le piège : conclure que le sac est « faux ». Une probabilité ne promet pas un résultat exact.\nRéponse : a) $0{,}2$ ; b) $0{,}26$ ; c) environ $10$ ; d) non.",
          schema: ecranSeulement(billes([{ couleur: ROUGE }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }, { couleur: BLEU }])),
          micros: ["proba_frequence_comparer"],
        },
        {
          enonce:
            "Des élèves ont écrit ces fréquences. Lesquelles sont impossibles ? Explique.\na) $0{,}4$\nb) $1{,}3$\nc) $0$\nd) $1$\ne) $\\dfrac{25}{20}$",
          correction:
            "Une fréquence, c'est un nombre de fois divisé par un nombre d'essais.\nUn résultat ne peut pas sortir plus souvent qu'on n'a lancé. Donc une fréquence ne dépasse jamais $1$.\na) $0{,}4$ est entre $0$ et $1$ : possible.\nb) $1{,}3$ est plus grand que $1$ : impossible.\nc) $0$ : le résultat n'est jamais sorti. Possible.\nd) $1$ : le résultat est sorti à chaque fois. Possible.\ne) $25$ fois sur $20$ essais ? Impossible : $25$ est plus grand que $20$.\n⛔ Le piège : croire qu'une fréquence peut valoir plus que $1$ « si ça sort très souvent ».\nRéponse : impossibles : b) et e).",
          schema: ecranSeulement(echelle([{ label: "a", valeur: 0.4 }, { label: "c", valeur: 0 }, { label: "d", valeur: 1 }])),
          micros: ["proba_frequence_calculer"],
        },
        {
          enonce:
            "Une pièce bien équilibrée tombe $4$ fois de suite sur pile. Chloé dit : « Au prochain lancer, face a plus de chances de sortir. » A-t-elle raison ?",
          correction:
            "La pièce n'a pas de mémoire. Elle ne sait pas ce qui est sorti avant.\nAu prochain lancer, pile et face ont chacun $1$ chance sur $2$, comme au premier lancer.\nChloé a tort : face n'a pas plus de chances.\n⛔ Le piège : croire que le hasard « rattrape ». Rien ne compense les $4$ piles.\nRéponse : non, face a toujours $1$ chance sur $2$.",
          schema: pieces(["P", "P", "P", "P", "?"]),
          micros: ["proba_frequence_repeter"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Comme en devoir : je calcule la fréquence, puis le nombre attendu, puis je juge l'écart.",
      rappel: [
        "Nombre attendu : je partage les essais. Un cinquième de 30, c'est 30 ÷ 5 = 6.",
        "L'observé est rarement égal à l'attendu. Un petit écart est normal.",
        "Plus on répète, plus la fréquence se rapproche de la probabilité.",
      ],
      exercices: [
        {
          enonce:
            "On lance deux pièces en même temps.\na) Écris toutes les issues. Utilise P pour pile et F pour face.\nb) Quelle est la probabilité d'obtenir « deux piles » ?\nc) Une classe lance les deux pièces $40$ fois. Elle obtient « deux piles » $12$ fois. Quelle est la fréquence observée ?\nd) Combien de « deux piles » pouvait-on attendre ? L'écart est-il normal ?",
          correction:
            "a) Pièce $1$, puis pièce $2$ : PP, PF, FP, FF. Il y a $4$ issues.\nb) Une seule issue donne « deux piles » : PP. Probabilité : $\\dfrac{1}{4}$, soit $0{,}25$.\nc) $12$ fois sur $40$ : $\\dfrac{12}{40} = \\dfrac{3}{10} = 0{,}3$.\nd) Un quart des lancers : $40 \\div 4 = 10$. On a eu $12$ : $2$ de plus. C'est normal.\n⛔ Le piège au a) : oublier FP. « Pile puis face » et « face puis pile » sont deux issues différentes. Sinon, on trouve $\\dfrac{1}{3}$ au lieu de $\\dfrac{1}{4}$.\nRéponse : b) $\\dfrac{1}{4}$ ; c) $0{,}3$ ; d) environ $10$, l'écart est normal.",
          schema: grille(["pièce 1", "pièce 2", "deux piles ?"], [
            ["P", "P", "oui"],
            ["P", "F", "non"],
            ["F", "P", "non"],
            ["F", "F", "non"],
          ]),
          micros: ["proba_frequence_calculer", "proba_frequence_comparer"],
        },
        {
          enonce:
            "On lance une pièce de plus en plus de fois. Le tableau donne le nombre de piles.\na) Calcule la fréquence de pile pour chaque ligne.\nb) Calcule l'écart entre chaque fréquence et $0{,}5$.\nc) Que remarques-tu ?\nd) La fréquence monte-t-elle toujours ?",
          figure: grille(["lancers", "piles"], [
            ["10", "7"],
            ["50", "21"],
            ["200", "106"],
            ["1 000", "510"],
          ]),
          correction:
            "a) $\\dfrac{7}{10} = 0{,}7$. Puis $\\dfrac{21}{50} = \\dfrac{42}{100} = 0{,}42$.\nPuis $\\dfrac{106}{200} = \\dfrac{53}{100} = 0{,}53$. Puis $\\dfrac{510}{1\\,000} = 0{,}51$.\nb) Les écarts à $0{,}5$ : $0{,}2$, puis $0{,}08$, puis $0{,}03$, puis $0{,}01$.\nc) L'écart devient de plus en plus petit. La fréquence se rapproche de $0{,}5$.\nd) Non. Elle descend à $0{,}42$, puis remonte à $0{,}53$. Elle oscille autour de $0{,}5$.\n⛔ Le piège : croire que la fréquence monte toujours. C'est l'ÉCART qui diminue.\nRéponse : c) l'écart se réduit ; d) non.",
          schema: ecranSeulement(pointsRelies(["10", "50", "200", "1000"], [70, 42, 53, 51], 10)),
          micros: ["proba_frequence_repeter", "proba_frequence_calculer"],
        },
        {
          enonce:
            "Une roue a $5$ secteurs égaux, dont $1$ vert. On la fait tourner $100$ fois. Le vert sort $23$ fois.\na) Quelle est la probabilité du vert ?\nb) Combien de verts pouvait-on attendre ?\nc) Sam dit : « La roue est truquée ! » Qu'en penses-tu ?",
          correction:
            "a) $1$ secteur sur $5$ : $\\dfrac{1}{5}$, soit $0{,}2$.\nb) Un cinquième des tours : $100 \\div 5 = 20$ verts, à peu près.\nc) On attendait environ $20$ verts. On en a eu $23$ : $3$ de plus.\nC'est un petit écart, normal avec le hasard. Sam n'a pas de raison de crier au truquage.\n⛔ Le piège : croire que $23$ au lieu de $20$ prouve une triche. L'attendu est un ordre de grandeur.\nRéponse : a) $0{,}2$ ; b) environ $20$ ; c) l'écart est normal.",
          schema: ecranSeulement(roue([{ label: "V", poids: 1, couleur: VERT }, { label: "", poids: 1, couleur: GRIS }, { label: "", poids: 1, couleur: GRIS }, { label: "", poids: 1, couleur: GRIS }, { label: "", poids: 1, couleur: GRIS }])),
          micros: ["proba_frequence_comparer"],
        },
        {
          enonce:
            "Un sac contient $10$ billes, rouges ou bleues. On ne peut pas regarder dedans. On tire une bille, on note sa couleur, on la remet. Voici les résultats de $50$ tirages.\na) Calcule la fréquence de rouge et celle de bleu.\nb) Combien de billes rouges le sac contient-il, sans doute ?",
          figure: barres([{ label: "rouge", value: 31 }, { label: "bleu", value: 19 }]),
          correction:
            "a) Contrôle : $31 + 19 = 50$ tirages.\nRouge : $\\dfrac{31}{50} = \\dfrac{62}{100} = 0{,}62$.\nBleu : $\\dfrac{19}{50} = \\dfrac{38}{100} = 0{,}38$.\nb) La fréquence de rouge est proche de $0{,}6$.\nAvec $10$ billes, $0{,}6$ correspond à $6$ billes rouges sur $10$.\nLe sac contient sans doute $6$ billes rouges et $4$ bleues.\n⛔ Le piège : dire « sûrement $6$ ». Les tirages donnent une bonne idée, pas une certitude.\nRéponse : a) $0{,}62$ et $0{,}38$ ; b) sans doute $6$ rouges.",
          micros: ["proba_frequence_calculer", "proba_frequence_comparer"],
        },
        {
          enonce:
            "Deux classes lancent un dé $20$ fois chacune. Elles comptent les $6$.\na) Calcule la fréquence du $6$ dans chaque classe.\nb) La probabilité du $6$ est $\\dfrac{1}{6}$, environ $0{,}17$. Quelle classe en est la plus proche ?\nc) Réunis les deux classes. Quelle fréquence obtiens-tu ?\nd) Est-elle plus proche de $0{,}17$ ?",
          figure: grille(["classe", "lancers", "nombre de 6"], [
            ["6e A", "20", "5"],
            ["6e B", "20", "2"],
          ]),
          correction:
            "a) 6e A : $\\dfrac{5}{20} = 0{,}25$. 6e B : $\\dfrac{2}{20} = 0{,}1$.\nb) Écart de la 6e A : $0{,}25 - 0{,}17 = 0{,}08$. Écart de la 6e B : $0{,}17 - 0{,}1 = 0{,}07$.\nLa 6e B est un peu plus proche.\nc) Ensemble : $5 + 2 = 7$ six, en $20 + 20 = 40$ lancers.\n$7 \\div 40 = 0{,}175$.\nd) Oui : $0{,}175$ est tout près de $0{,}17$. Les deux séries se compensent.\n⛔ Le piège : garder une seule classe. En réunissant les lancers, on en a plus : la fréquence est plus fiable.\nRéponse : a) $0{,}25$ et $0{,}1$ ; c) $0{,}175$ ; d) oui.",
          micros: ["proba_frequence_repeter", "proba_frequence_calculer"],
        },
        {
          enonce:
            "Un jardinier sème $200$ graines. $170$ graines germent.\na) Quelle est la fréquence de germination ? Écris-la en pourcentage.\nb) Le sachet annonce : « $9$ graines sur $10$ germent. » Quel pourcentage est-ce ?\nc) Le résultat du jardinier est-il proche de l'annonce ?",
          correction:
            "a) $170$ graines sur $200$ : $\\dfrac{170}{200} = \\dfrac{85}{100} = 0{,}85$, soit $85$ %.\nb) $9$ sur $10$ : $\\dfrac{9}{10} = \\dfrac{90}{100}$, soit $90$ %.\nc) $90 - 85 = 5$. L'écart est de $5$ points : c'est assez proche.\nUn seul semis peut varier : la terre, l'eau, le hasard.\n⛔ Le piège : croire que le sachet promet exactement $180$ graines. « $9$ sur $10$ » est un ordre de grandeur, pas une promesse.\nRéponse : a) $85$ % ; b) $90$ % ; c) oui, assez proche.",
          schema: echelle([{ label: "semis", valeur: 0.85 }, { label: "sachet", valeur: 0.9 }]),
          micros: ["proba_frequence_calculer", "proba_frequence_comparer"],
        },
        {
          enonce:
            "Maé joue aux petits chevaux. Il lui faut un $6$ pour sortir. Le $6$ n'est pas sorti depuis $15$ lancers. Elle dit : « Maintenant, il va forcément sortir ! »\na) Quelle est la probabilité d'obtenir $6$ au prochain lancer ?\nb) Maé a-t-elle raison ?",
          correction:
            "a) Le dé a $6$ faces, et une seule porte le $6$ : $1$ chance sur $6$.\nb) Non. Le dé n'a pas de mémoire.\nLes $15$ lancers d'avant ne changent rien au prochain. Il reste $1$ chance sur $6$.\n⛔ Le piège : croire que le $6$ est « en retard » et va rattraper. Le hasard ne rattrape rien.\nRéponse : a) $1$ chance sur $6$ ; b) non.",
          schema: ecranSeulement(de([6])),
          micros: ["proba_frequence_repeter"],
        },
        {
          enonce:
            "On lance un dé équilibré $300$ fois.\na) Combien de nombres pairs peut-on attendre, à peu près ?\nb) Combien de $1$ peut-on attendre ?\nc) On a obtenu $43$ fois le $1$. Est-ce normal ?",
          correction:
            "a) Les faces paires : $2$, $4$, $6$. C'est $3$ faces sur $6$, la moitié.\nLa moitié de $300$ : $300 \\div 2 = 150$ nombres pairs, à peu près.\nb) Le $1$ : $1$ face sur $6$. Un sixième de $300$ : $300 \\div 6 = 50$.\nc) On attendait environ $50$. On a eu $43$ : $7$ de moins.\nSur $300$ lancers, c'est un petit écart : c'est normal.\n⛔ Le piège : attendre exactement $50$. On obtient presque toujours un peu plus ou un peu moins.\nRéponse : a) environ $150$ ; b) environ $50$ ; c) oui, c'est normal.",
          schema: ecranSeulement(grille(["résultat", "attendu"], [["pair", "150"], ["1", "50"]])),
          micros: ["proba_frequence_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "De vraies expériences. Je calcule les fréquences, je réunis les résultats, puis je conclus avec prudence.",
      rappel: [
        "Je réunis les résultats pour avoir beaucoup d'essais.",
        "Un grand écart, sur beaucoup d'essais : là, on peut se méfier.",
        "Le hasard n'a pas de mémoire.",
      ],
      exercices: [
        {
          titre: "La punaise",
          enonce:
            "Une punaise tombe soit pointe en l'air, soit pointe en bas. Quatre groupes la lancent $25$ fois chacun. Le diagramme donne les « pointe en l'air » de chaque groupe.\na) Calcule la fréquence de chaque groupe.\nb) Réunis les quatre groupes. Quelle fréquence obtiens-tu ?\nc) Peut-on trouver la probabilité en comptant les issues, comme pour une pièce ? Pourquoi ?\nd) Quelle valeur proposer pour la probabilité de « pointe en l'air » ?",
          figure: barres([{ label: "G1", value: 16 }, { label: "G2", value: 14 }, { label: "G3", value: 17 }, { label: "G4", value: 13 }]),
          correction:
            "a) Sur $25$ lancers, je multiplie par $4$ pour avoir des centièmes.\nG1 : $\\dfrac{16}{25} = \\dfrac{64}{100} = 0{,}64$. G2 : $\\dfrac{14}{25} = 0{,}56$.\nG3 : $\\dfrac{17}{25} = 0{,}68$. G4 : $\\dfrac{13}{25} = 0{,}52$.\nb) Ensemble : $16 + 14 + 17 + 13 = 60$, sur $4 \\times 25 = 100$ lancers. Fréquence : $0{,}6$.\nc) Non. Les deux issues n'ont pas la même chance : la punaise n'est pas symétrique.\nSeule l'expérience peut nous renseigner.\nd) Environ $0{,}6$ : c'est la fréquence sur le plus grand nombre de lancers.\n⛔ Le piège : dire « deux issues, donc une chance sur deux ». Ce n'est vrai que si les issues ont la même chance.\nRéponse : b) $0{,}6$ ; c) non ; d) environ $0{,}6$.",
          micros: ["proba_frequence_calculer", "proba_frequence_repeter"],
        },
        {
          titre: "Le dé de Zoé est-il truqué ?",
          enonce:
            "Zoé se méfie de son dé. Elle fait deux séries de lancers et compte les $6$.\na) Calcule la fréquence du $6$ dans chaque série.\nb) Combien de $6$ pouvait-on attendre dans chaque série ?\nc) Quelle série doit inquiéter Zoé ? Explique.",
          figure: grille(["série", "lancers", "nombre de 6"], [
            ["série 1", "6", "2"],
            ["série 2", "600", "180"],
          ]),
          correction:
            "a) Série 1 : $2$ six sur $6$ lancers, soit $\\dfrac{2}{6}$ : $1$ chance sur $3$.\nSérie 2 : $\\dfrac{180}{600} = \\dfrac{30}{100} = 0{,}3$.\nb) Le $6$ a $1$ chance sur $6$. Série 1 : $6 \\div 6 = 1$ six attendu. Série 2 : $600 \\div 6 = 100$ six attendus.\nc) Série 1 : $2$ au lieu de $1$. Sur $6$ lancers, le hasard fait ça très souvent.\nSérie 2 : $180$ au lieu de $100$, soit $80$ de trop. Sur $600$ lancers, le hasard ne suffit plus.\nC'est la série 2 qui doit inquiéter Zoé : le dé est peut-être truqué.\n⛔ Le piège : juger un écart sans regarder le nombre de lancers.\nRéponse : c) la série 2.",
          micros: ["proba_frequence_comparer", "proba_frequence_repeter"],
        },
        {
          titre: "Toute la classe lance deux pièces",
          enonce:
            "Chacun des $25$ élèves d'une classe lance deux pièces $20$ fois. La classe réunit ses résultats.\na) Combien de lancers en tout ?\nb) La classe obtient « deux piles » $131$ fois. Quelle est la fréquence observée ?\nc) La probabilité de « deux piles » est $\\dfrac{1}{4}$. Combien pouvait-on attendre ?\nd) Léo, seul, a obtenu $8$ « deux piles » sur $20$. Quelle est sa fréquence ?\ne) Quelle fréquence est la plus proche de $0{,}25$ ? Pourquoi ?",
          correction:
            "a) $25 \\times 20 = 500$ lancers.\nb) $\\dfrac{131}{500} = \\dfrac{262}{1\\,000} = 0{,}262$.\nc) Un quart de $500$ : $500 \\div 4 = 125$. On a eu $131$ : $6$ de plus seulement.\nd) $\\dfrac{8}{20} = \\dfrac{4}{10} = 0{,}4$.\ne) Celle de la classe : $0{,}262$ est tout près de $0{,}25$. Celle de Léo, $0{,}4$, en est loin.\nLa classe a fait $500$ lancers, Léo seulement $20$.\n⛔ Le piège : croire que Léo s'est trompé. Sur $20$ lancers, un tel écart arrive. C'est pour cela qu'on réunit les résultats.\nRéponse : a) $500$ ; b) $0{,}262$ ; c) $125$ ; d) $0{,}4$ ; e) celle de la classe.",
          schema: echelle([{ label: "classe", valeur: 0.262 }, { label: "Léo", valeur: 0.4 }]),
          micros: ["proba_frequence_calculer", "proba_frequence_comparer", "proba_frequence_repeter"],
        },
        {
          titre: "La roue du stand",
          enonce:
            "Une roue a $8$ secteurs égaux. $2$ secteurs sont gagnants.\na) Quelle est la probabilité de gagner ?\nb) Après $80$ tours, on a gagné $26$ fois. Combien de gains pouvait-on attendre ? Quelle est la fréquence observée ?\nc) Après $800$ tours, on a gagné $204$ fois. Quelle est la fréquence observée ?\nd) Que remarques-tu ?",
          correction:
            "a) $2$ secteurs sur $8$ : $\\dfrac{2}{8} = \\dfrac{1}{4}$, soit $0{,}25$.\nb) Un quart de $80$ : $80 \\div 4 = 20$ gains attendus.\nFréquence : $26 \\div 80 = 0{,}325$.\nc) $204 \\div 800 = 0{,}255$.\nd) Écart après $80$ tours : $0{,}325 - 0{,}25 = 0{,}075$.\nÉcart après $800$ tours : $0{,}255 - 0{,}25 = 0{,}005$.\nAvec plus de tours, la fréquence se rapproche de la probabilité.\n⛔ Le piège : croire que l'écart finira à $0$. Il devient tout petit, mais le hasard reste là.\nRéponse : a) $0{,}25$ ; b) $20$, et $0{,}325$ ; c) $0{,}255$ ; d) l'écart se réduit.",
          schema: roue([{ label: "G", poids: 1, couleur: VERT }, { label: "", poids: 1, couleur: GRIS }, { label: "", poids: 1, couleur: GRIS }, { label: "", poids: 1, couleur: GRIS }, { label: "G", poids: 1, couleur: VERT }, { label: "", poids: 1, couleur: GRIS }, { label: "", poids: 1, couleur: GRIS }, { label: "", poids: 1, couleur: GRIS }]),
          micros: ["proba_frequence_comparer", "proba_frequence_repeter", "proba_frequence_calculer"],
        },
      ],
    },
  ],
};
