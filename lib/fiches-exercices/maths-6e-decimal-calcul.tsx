// ─── Fiche d'exercices : calculer avec les nombres décimaux (6e) — 20 exercices ─
//
// Lot de 6e (30/09/2026), sur la forme de l'étalon de 5e
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la banque `lib/tutor-v4/questionBank/6e/maths/decimaux.bank.ts`
// (notionId decimal_calcul) : additionner et soustraire, multiplier (par un
// entier et par un décimal), multiplier par 0,1 · 0,01 · 0,001, diviser un
// décimal par un entier (en continuant après la virgule), défis (ordre de
// grandeur, « multiplier n'agrandit pas toujours », remonter un programme).
// Pas de fiche de cours de 6e pour cette notion (fichesCours vide) ; le
// vocabulaire est celui de `lib/fiches/maths-6e-decimaux.tsx` (« virgule sous
// virgule », « j'ajoute des zéros »).
// ⛔ LIMITES DE LA 6e : on ne divise que par un ENTIER (jamais par un décimal) ;
// aucun nombre négatif ; aucune lettre. Le « nombre mystère » (20) se résout en
// remontant le programme, sans équation, comme l'item de la banque.
// ⚠️ Le produit de DEUX décimaux (4, 16) : au programme de 6e ; la banque le
// touche (0,1 × 0,1 ; 3,7 × 2,9 en ordre de grandeur).
// ⛔ Aucun exemple de la fiche de cours (3,45 + 1,7 ; 12,4 + 3,75 ; 2,5 × 6 ;
// 9,6 ÷ 3) ni de la banque (1,2 + 0,5 ; 3,45 + 1,7 ; 0,75 + 2,8 ; 2,4 × 3 ;
// 0,25 × 4 ; 3,6 ÷ 2 ; 5,6 ÷ 4 ; 7,5 L en 5 ; 37 × 0,1 ; 5,2 × 0,01 ; 250 × 0,1 ;
// 4 × 0,001 ; 3,7 × 2,9 ; 10 % de 60).
//
// Les pièges nommés : aligner à droite sans regarder la virgule (1, 9, 14),
// « garder » les centièmes dans une soustraction (2), mal compter les chiffres
// après la virgule d'un produit (3, 4, 16), multiplier par 0,001 qui
// grandirait (5, 12, 18), oublier la virgule du quotient (6), s'arrêter au
// reste (7, 11, 17), les bons chiffres à la mauvaise place (8), ajouter au lieu
// de multiplier (10), « multiplier agrandit toujours » (13), une division qui
// tomberait toujours juste (15), 4 800 € pour un litre d'eau (19), défaire un
// programme dans le mauvais ordre (20).
//
// Faits réels : aucun. Prix, recette, relais, ficelle, sortie, tomates, douche
// et prix de l'eau sont des MODÈLES, à l'ordre de grandeur réel.
//
// ⭐ CONSIGNE DE FRÉDÉRIC (30/09) : des 6e qui ont parfois du mal à LIRE. Des
// phrases de 12 mots en moyenne, 20 au plus, une idée par phrase. Le script
// compte les mots de chaque phrase.
//
// ⭐ LES DESSINS :
//   · `posee` — l'opération POSÉE : un chiffre par colonne, les virgules
//     orange l'une sous l'autre pour + et −, le résultat en vert ; pour ×, les
//     nombres calés à droite et les produits partiels. Le canvas du coach
//     (`calcul_pose`) cale tout à droite et demande 322 px pour six chiffres :
//     trop large à 375 px, d'où ce SVG local ;
//   · `potence` — la division posée, en potence : le dividende, les restes
//     abaissés sous lui, le diviseur et le quotient à droite ;
//   · `numeration` — le tableau de numération (feuille des nombres décimaux) :
//     on VOIT les chiffres reculer d'un rang quand on multiplie par 0,1 ;
//   · `demiDroite`, `chaine` (un programme et son retour), `table`.
// SVG de viewBox 300, sans `min-w`. 14 dessins imprimés ; ceux qui redisent le
// corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je pose… »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-decimal-calcul.mjs`.
//
// Micro-compétences : decimal_additionner (1, 2, 9, 14, 17, 18, 19),
// decimal_multiplier (3, 4, 10, 13, 16, 17, 19), decimal_multiplier_par_01 (5,
// 12, 18, 19), decimal_diviser_par_entier (6, 7, 11, 15, 17, 18, 20),
// decimal_calcul_defi (8, 13, 15, 20). 5/5.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";
const GRIS = "#475569";

type Point = { value: number; label: string; color?: string };

/** 4,5 ; 12,05 : un nombre écrit comme au tableau (texte NU). */
const ecrit = (v: number) => {
  const [e, d] = String(v).split(".");
  return (v >= 10000 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : e) + (d ? "," + d : "");
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/** Les chiffres d'un nombre écrit « 14,60 », rangés en colonnes : `unites` est la colonne du chiffre des unités. */
const enColonnes = (s: string, unites: number) => {
  const [ent, dec = ""] = s.split(",");
  return {
    chiffres: [...ent].map((ch, i) => ({ ch, col: unites - (ent.length - 1 - i) })).concat([...dec].map((ch, i) => ({ ch, col: unites + 1 + i }))),
    virgule: dec ? unites : null,
  };
};

/**
 * L'OPÉRATION POSÉE. Un chiffre par colonne (20 de large, corps 20). Pour + et
 * −, les nombres sont calés sur la VIRGULE : les virgules orange tombent l'une
 * sous l'autre (écrire les zéros utiles dans les chaînes : « 14,60 »). Pour ×,
 * ils sont calés à DROITE, avec les produits partiels (`partiels`) entre deux
 * traits. Le résultat est en vert.
 * ⭐ Le script refait l'opération à partir des chaînes et relit les partiels.
 */
const posee = (op: "+" | "−" | "×", nombres: string[], resultat: string, partiels: string[] = []) => {
  const cw = 20;
  const ligne = (s: string) => enColonnes(s, op === "×" ? -(s.split(",")[1] ?? "").length : 0);
  const haut = nombres.map(ligne);
  const milieu = partiels.map(ligne);
  const bas = ligne(resultat);
  const cols = [...haut, ...milieu, bas].flatMap((l) => l.chiffres.map((c) => c.col));
  const [c0, c1] = [Math.min(...cols) - 1, Math.max(...cols)];
  const x0 = 150 - ((c1 - c0 + 1) * cw) / 2;
  const x = (col: number) => x0 + (col - c0 + 0.5) * cw;
  const rangs: { l: ReturnType<typeof ligne>; y: number; couleur: string }[] = [];
  const traits: number[] = [];
  let y = 24;
  const poser = (l: ReturnType<typeof ligne>, couleur: string) => {
    rangs.push({ l, y, couleur });
    y += 28;
  };
  const tracer = () => {
    const ty = y - 28 + 9;
    traits.push(ty);
    y = ty + 25;
  };
  haut.forEach((l) => poser(l, NOIR));
  tracer();
  if (milieu.length) {
    milieu.forEach((l) => poser(l, GRIS));
    tracer();
  }
  poser(bas, VERT);
  const H = y - 28 + 12;
  const signe = rangs[haut.length - 1].y;
  return (
    <div className="mx-auto w-full max-w-[16rem] print:max-w-[11rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`${nombres.join(` ${op} `)} = ${resultat}`}>
        <text x={x(c0)} y={signe} textAnchor="middle" fontSize="20" fontWeight="800" fill={NOIR}>
          {op}
        </text>
        {rangs.map((r, i) => (
          <g key={i}>
            {r.l.chiffres.map((c, j) => (
              <text key={j} x={x(c.col)} y={r.y} textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="monospace" fill={r.couleur}>
                {c.ch}
              </text>
            ))}
            {r.l.virgule !== null ? (
              <text x={x(r.l.virgule) + cw / 2} y={r.y + 2} textAnchor="middle" fontSize="20" fontWeight="900" fill={ORANGE}>
                ,
              </text>
            ) : null}
          </g>
        ))}
        {traits.map((ty, i) => (
          <line key={i} x1={x(c0) - cw / 2} y1={ty} x2={x(c1) + cw / 2} y2={ty} stroke={NOIR} strokeWidth={2} />
        ))}
      </svg>
    </div>
  );
};

/**
 * LA DIVISION POSÉE, EN POTENCE. À gauche le dividende (un chiffre par
 * colonne, la virgule orange) et, dessous, chaque reste suivi du chiffre
 * abaissé (`etapes` : le texte et la colonne de son DERNIER chiffre, comptée
 * sur les chiffres du dividende sans la virgule). À droite le diviseur, un
 * trait, et le quotient en vert.
 * ⭐ Le script refait la division chiffre par chiffre et relit chaque étape.
 */
const potence = (dividende: string, diviseur: string, quotient: string, etapes: { texte: string; fin: number }[]) => {
  const cw = 20;
  const [ent, dec = ""] = dividende.split(",");
  const chiffres = [...(ent + dec)];
  const n = chiffres.length;
  const droite = Math.max(diviseur.length, quotient.length) * 13 + 16;
  const x0 = (300 - (n * cw + 12 + droite)) / 2;
  const x = (i: number) => x0 + (i + 0.5) * cw;
  const xb = x0 + n * cw + 6;
  const H = 24 + 28 * etapes.length + 12;
  return (
    <div className="mx-auto w-full max-w-[16rem] print:max-w-[11rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label={`${dividende} divisé par ${diviseur} : ${quotient}`}>
        {chiffres.map((ch, i) => (
          <text key={i} x={x(i)} y={24} textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="monospace" fill={NOIR}>
            {ch}
          </text>
        ))}
        {dec ? (
          <text x={x(ent.length - 1) + cw / 2} y={26} textAnchor="middle" fontSize="20" fontWeight="900" fill={ORANGE}>
            ,
          </text>
        ) : null}
        {etapes.map((et, k) =>
          [...et.texte].map((ch, j) => (
            <text key={`${k}-${j}`} x={x(et.fin - et.texte.length + 1 + j)} y={52 + 28 * k} textAnchor="middle" fontSize="20" fontWeight="800" fontFamily="monospace" fill={GRIS}>
              {ch}
            </text>
          )),
        )}
        <line x1={xb} y1={4} x2={xb} y2={H - 4} stroke={NOIR} strokeWidth={2} />
        <line x1={xb} y1={32} x2={xb + droite} y2={32} stroke={NOIR} strokeWidth={2} />
        <text x={xb + 8} y={24} fontSize="20" fontWeight="800" fontFamily="monospace" fill={NOIR}>
          {diviseur}
        </text>
        <text x={xb + 8} y={56} fontSize="20" fontWeight="800" fontFamily="monospace" fill={VERT}>
          {quotient}
        </text>
      </svg>
    </div>
  );
};

/**
 * LE TABLEAU DE NUMÉRATION (celui de la feuille des nombres décimaux) : un
 * chiffre par case, la virgule orange après les unités, `nom` dans une
 * première colonne. ⛔ Six colonnes de rangs au plus.
 */
const NOMS_RANGS: Record<string, string> = { C: "centaines", D: "dizaines", U: "unités", d: "dixièmes", c: "centièmes", m: "millièmes" };
type LigneNumeration = { chiffres: string[]; nom?: string };
const numeration = (colonnes: string[], lignes: LigneNumeration[]) => {
  const u = colonnes.indexOf("U");
  return (
    <div className="mx-auto w-full max-w-[20rem]">
      <table className="mx-auto border-collapse text-sm">
        <thead>
          <tr>
            <th className="border border-slate-400 bg-slate-100 px-1.5 py-1" />
            {colonnes.map((c) => (
              <th key={c} className="border border-slate-400 bg-slate-100 px-2 py-1 font-semibold text-slate-800">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lignes.map((li, i) => {
            const decimale = li.chiffres.slice(u + 1).some((x) => x !== "");
            return (
              <tr key={i}>
                <td className="border border-slate-400 px-1.5 py-1 text-center font-semibold text-slate-700">{li.nom ?? ""}</td>
                {li.chiffres.map((x, j) => (
                  <td key={j} className="border border-slate-400 px-2 py-1 text-center font-mono text-slate-900">
                    <span>{x || " "}</span>
                    {j === u && decimale ? <span className="font-bold text-orange-600">,</span> : null}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="mt-1 text-center text-xs font-semibold text-slate-600">{colonnes.map((c) => `${c} : ${NOMS_RANGS[c]}`).join(" · ")}</p>
    </div>
  );
};

/**
 * UNE DEMI-DROITE GRADUÉE (feuille de 6e de la demi-droite) : elle part de
 * l'origine 0 ; points nommés sous les nombres, une rangée de plus quand ils
 * se touchent. ⛔ Onze nombres écrits au plus.
 */
const demiDroite = (min: number, max: number, pas: number, points: Point[], opts: { nombres?: number } = {}) => {
  const nombres = opts.nombres ?? pas;
  const W = 300;
  const marge = 24;
  const x = (v: number) => marge + ((v - min) / (max - min)) * (W - 2 * marge);
  const Y = 26;
  const ticks: number[] = [];
  for (let k = 0; min + k * pas <= max + 1e-9; k++) ticks.push(Math.round((min + k * pas) * 1e6) / 1e6);
  const ecritIci = (t: number) => Math.abs(t / nombres - Math.round(t / nombres)) < 1e-6;
  const fins: number[] = [];
  const rangs = new Map<number, number>();
  const lx = new Map<number, number>();
  [...points]
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
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Demi-droite graduée">
        <line x1={x(min)} y1={Y - 9} x2={x(min)} y2={Y + 9} stroke={ROUGE} strokeWidth={3} strokeLinecap="round" />
        <line x1={x(min)} y1={Y} x2={W - marge + 12} y2={Y} stroke={NOIR} strokeWidth={2.2} strokeLinecap="round" />
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
        {points.map((p, i) => (
          <g key={`p${i}`}>
            <circle cx={x(p.value)} cy={Y} r={5} fill={p.color ?? BLEU} />
            <text x={lx.get(i) ?? x(p.value)} y={Y + 42 + 17 * (rangs.get(i) ?? 0)} textAnchor="middle" fontSize="14" fontWeight="900" fill={p.color ?? BLEU}>
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * UN PROGRAMME DE CALCUL ET SON RETOUR : les nombres dans des cases, l'une
 * sous l'autre. À droite, en vert, les flèches de l'aller (vers le bas) ; à
 * gauche, en orange, les flèches du retour (vers le haut), avec l'opération
 * inverse.
 */
const chaine = (valeurs: string[], aller: string[], retour: string[]) => {
  const [cx, bw, bh, gap] = [150, 84, 30, 38];
  const H = valeurs.length * bh + (valeurs.length - 1) * gap + 8;
  const haut = (i: number) => 4 + i * (bh + gap);
  return (
    <div className="mx-auto w-full max-w-[18rem] print:max-w-[12rem]">
      <svg viewBox={`0 0 300 ${H}`} className="block h-auto w-full" role="img" aria-label="Un programme de calcul et son retour">
        {valeurs.map((v, i) => (
          <g key={i}>
            <rect x={cx - bw / 2} y={haut(i)} width={bw} height={bh} rx={6} fill="#eff6ff" stroke={BLEU} strokeWidth={1.6} />
            <text x={cx} y={haut(i) + 21} textAnchor="middle" fontSize="16" fontWeight="800" fill={NOIR}>
              {v}
            </text>
          </g>
        ))}
        {aller.map((a, i) => {
          const [y1, y2] = [haut(i) + bh + 4, haut(i + 1) - 4];
          const xa = cx + 24;
          return (
            <g key={`a${i}`}>
              <line x1={xa} y1={y1} x2={xa} y2={y2} stroke={VERT} strokeWidth={2.4} />
              <path d={`M ${xa - 5} ${y2 - 8} L ${xa} ${y2} L ${xa + 5} ${y2 - 8}`} fill="none" stroke={VERT} strokeWidth={2.4} />
              <text x={xa + 10} y={(y1 + y2) / 2 + 5} fontSize="14" fontWeight="900" fill={VERT}>
                {a}
              </text>
            </g>
          );
        })}
        {retour.map((r, i) => {
          const [y1, y2] = [haut(i) + bh + 4, haut(i + 1) - 4];
          const xr = cx - 24;
          return (
            <g key={`r${i}`}>
              <line x1={xr} y1={y1} x2={xr} y2={y2} stroke={ORANGE} strokeWidth={2.4} />
              <path d={`M ${xr - 5} ${y1 + 8} L ${xr} ${y1} L ${xr + 5} ${y1 + 8}`} fill="none" stroke={ORANGE} strokeWidth={2.4} />
              <text x={xr - 10} y={(y1 + y2) / 2 + 5} textAnchor="end" fontSize="14" fontWeight="900" fill={ORANGE}>
                {r}
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

export const exercicesDecimalCalcul6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "decimal-calcul",
  titre: "Calculer avec les nombres décimaux",
  accroche:
    "Vingt exercices, du geste seul au problème : additionner et soustraire virgule sous virgule, multiplier, multiplier par 0,1, diviser par un entier en continuant après la virgule, contrôler avec un ordre de grandeur. Des courses au marché, une recette de crêpes, un relais, une ficelle, une sortie au parc, des tomates du potager, l'eau de la douche. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et l'opération posée dessinée.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/decimal-calcul", titre: "Calculer avec les décimaux" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Un calcul par question. Je regarde où va la virgule avant de calculer.",
      rappel: [
        "Additionner ou soustraire : virgule sous virgule. J'ajoute des zéros si besoin.",
        "Multiplier : je calcule sans les virgules. Puis je compte les chiffres après la virgule.",
        "Multiplier par $0{,}1$, c'est diviser par $10$.",
        "Diviser par un entier : je mets la virgule au quotient quand j'abaisse les dixièmes.",
      ],
      exercices: [
        {
          enonce: "Pose et calcule.\na) $14{,}6 + 3{,}85$\nb) $7{,}09 + 12{,}5$",
          correction:
            "Je pose virgule sous virgule. J'ajoute un zéro pour avoir autant de chiffres après la virgule.\na) $14{,}6$ devient $14{,}60$. Je calcule de droite à gauche.\n$0 + 5 = 5$. Puis $6 + 8 = 14$ : j'écris $4$, je retiens $1$.\n$4 + 3 + 1 = 8$. Puis la dizaine : $1$.\nDonc $14{,}6 + 3{,}85 = 18{,}45$.\nb) $12{,}5$ devient $12{,}50$. Donc $7{,}09 + 12{,}5 = 19{,}59$.\n⛔ Le piège : caler les chiffres à droite, sans regarder la virgule. Les centièmes tomberaient sous les dixièmes.\nRéponse : a) $18{,}45$ ; b) $19{,}59$.",
          schema: posee("+", ["14,60", "3,85"], "18,45"),
          micros: ["decimal_additionner"],
        },
        {
          enonce: "Pose et calcule.\na) $20 - 6{,}35$\nb) $9{,}4 - 2{,}75$",
          correction:
            "Je pose virgule sous virgule. J'écris les zéros qui manquent.\na) $20$ devient $20{,}00$. Donc $20 - 6{,}35 = 13{,}65$.\nContrôle : $13{,}65 + 6{,}35 = 20$.\nb) $9{,}4$ devient $9{,}40$. Donc $9{,}4 - 2{,}75 = 6{,}65$.\nContrôle : $6{,}65 + 2{,}75 = 9{,}4$.\n⛔ Le piège du a) : écrire $14{,}35$. On ne « garde » pas les $35$ centièmes : il faut les enlever aussi.\nRéponse : a) $13{,}65$ ; b) $6{,}65$.",
          schema: ecranSeulement(posee("−", ["20,00", "6,35"], "13,65")),
          micros: ["decimal_additionner"],
        },
        {
          enonce: "Calcule.\na) $3{,}26 \\times 4$\nb) $0{,}7 \\times 6$\nc) $1{,}05 \\times 3$",
          correction:
            "Je calcule sans la virgule. Puis je remets autant de chiffres après la virgule.\na) $326 \\times 4 = 1\\,304$. $3{,}26$ a $2$ chiffres après la virgule.\nDonc $3{,}26 \\times 4 = 13{,}04$.\nb) $7 \\times 6 = 42$. Un chiffre après la virgule : $0{,}7 \\times 6 = 4{,}2$.\nc) $105 \\times 3 = 315$. Deux chiffres après la virgule : $1{,}05 \\times 3 = 3{,}15$.\n⭐ Contrôle du a) : c'est environ $3 \\times 4 = 12$. $13{,}04$ est proche.\n⛔ Le piège du a) : écrire $130{,}4$ ou $1{,}304$. Je compte bien $2$ chiffres après la virgule.\nRéponse : a) $13{,}04$ ; b) $4{,}2$ ; c) $3{,}15$.",
          schema: posee("×", ["3,26", "4"], "13,04"),
          micros: ["decimal_multiplier"],
        },
        {
          enonce: "Calcule.\na) $2{,}5 \\times 1{,}4$\nb) $0{,}3 \\times 0{,}2$\nc) $1{,}2 \\times 1{,}2$",
          correction:
            "Je calcule sans les virgules. Puis je compte les chiffres après la virgule dans LES DEUX nombres.\na) $25 \\times 14 = 350$. $1 + 1 = 2$ chiffres après la virgule : $3{,}50$, soit $3{,}5$.\nb) $3 \\times 2 = 6$. Deux chiffres après la virgule : $0{,}06$.\nc) $12 \\times 12 = 144$. Deux chiffres après la virgule : $1{,}44$.\n⛔ Le piège du b) : écrire $0{,}6$. Il faut DEUX chiffres après la virgule, un par nombre.\n⭐ $0{,}3 \\times 0{,}2$ est plus petit que $0{,}3$ : multiplier par $0{,}2$ réduit.\nRéponse : a) $3{,}5$ ; b) $0{,}06$ ; c) $1{,}44$.",
          schema: posee("×", ["2,5", "1,4"], "3,50", ["100", "250"]),
          micros: ["decimal_multiplier"],
        },
        {
          enonce: "Calcule.\na) $480 \\times 0{,}1$\nb) $6{,}5 \\times 0{,}01$\nc) $2 \\times 0{,}001$\nd) $13{,}7 \\times 0{,}1$",
          correction:
            "Multiplier par $0{,}1$, c'est diviser par $10$. Par $0{,}01$, c'est diviser par $100$. Par $0{,}001$, c'est diviser par $1\\,000$.\nDans le tableau, chaque chiffre recule d'un rang vers la droite à chaque division par $10$.\na) $480 \\div 10 = 48$.\nb) $6{,}5 \\div 100 = 0{,}065$. J'écris des zéros devant.\nc) $2 \\div 1\\,000 = 0{,}002$.\nd) $13{,}7 \\div 10 = 1{,}37$.\n⛔ Le piège du c) : écrire $2\\,000$. Multiplier par $0{,}001$ rend le nombre PLUS PETIT.\nRéponse : a) $48$ ; b) $0{,}065$ ; c) $0{,}002$ ; d) $1{,}37$.",
          schema: ecranSeulement(
            numeration(["C", "D", "U", "d", "c", "m"], [
              { chiffres: ["4", "8", "0", "", "", ""], nom: "480" },
              { chiffres: ["", "4", "8", "", "", ""], nom: "48" },
              { chiffres: ["", "", "6", "5", "", ""], nom: "6,5" },
              { chiffres: ["", "", "0", "0", "6", "5"], nom: "0,065" },
            ]),
          ),
          micros: ["decimal_multiplier_par_01"],
        },
        {
          enonce: "Calcule.\na) $8{,}4 \\div 4$\nb) $13{,}5 \\div 5$\nc) $0{,}96 \\div 3$",
          correction:
            "a) $8{,}4$, ce sont $84$ dixièmes. $84 \\div 4 = 21$ dixièmes. Donc $8{,}4 \\div 4 = 2{,}1$.\nb) Je pose la division. $13 \\div 5 = 2$, il reste $3$.\nJ'abaisse le $5$ des dixièmes : je mets la virgule au quotient.\n$35 \\div 5 = 7$. Donc $13{,}5 \\div 5 = 2{,}7$.\nc) $0{,}96$, ce sont $96$ centièmes. $96 \\div 3 = 32$ centièmes. Donc $0{,}96 \\div 3 = 0{,}32$.\n⭐ Contrôle du b) : $2{,}7 \\times 5 = 13{,}5$.\n⛔ Le piège du b) : oublier la virgule et écrire $27$. Le quotient ne peut pas dépasser $13{,}5$.\nRéponse : a) $2{,}1$ ; b) $2{,}7$ ; c) $0{,}32$.",
          schema: potence("13,5", "5", "2,7", [
            { texte: "35", fin: 2 },
            { texte: "0", fin: 2 },
          ]),
          micros: ["decimal_diviser_par_entier"],
        },
        {
          enonce: "Calcule, en continuant après la virgule.\na) $7 \\div 4$\nb) $9 \\div 2$\nc) $3 \\div 8$",
          correction:
            "Quand il reste quelque chose, je continue. J'écris des zéros après la virgule : $7 = 7{,}00$.\na) $7 \\div 4 = 1$, il reste $3$. J'abaisse un $0$ : $30 \\div 4 = 7$, il reste $2$.\nJ'abaisse un $0$ : $20 \\div 4 = 5$, il reste $0$. Donc $7 \\div 4 = 1{,}75$.\nb) $9 \\div 2 = 4$, il reste $1$. $10 \\div 2 = 5$. Donc $9 \\div 2 = 4{,}5$.\nc) $3 \\div 8 = 0$ : j'écris $0$, puis la virgule.\n$30 \\div 8 = 3$, il reste $6$. $60 \\div 8 = 7$, il reste $4$. $40 \\div 8 = 5$, il reste $0$.\nDonc $3 \\div 8 = 0{,}375$.\n⛔ Le piège : s'arrêter au reste, « $1$ reste $3$ ». On demande un nombre décimal : je continue.\nRéponse : a) $1{,}75$ ; b) $4{,}5$ ; c) $0{,}375$.",
          schema: ecranSeulement(
            potence("7,00", "4", "1,75", [
              { texte: "30", fin: 1 },
              { texte: "20", fin: 2 },
              { texte: "0", fin: 2 },
            ]),
          ),
          micros: ["decimal_diviser_par_entier"],
        },
        {
          enonce: "Sans poser le calcul, choisis le bon résultat. Arrondis d'abord chaque nombre à l'unité.\na) $4{,}9 \\times 3{,}1$ : $1{,}519$ ou $15{,}19$ ou $151{,}9$ ?\nb) $19{,}8 \\div 4$ : $4{,}95$ ou $49{,}5$ ou $0{,}495$ ?\nc) $102{,}5 + 9{,}87$ : $112{,}37$ ou $201{,}2$ ou $11{,}237$ ?",
          correction:
            "J'arrondis, puis je calcule de tête. Le bon résultat est proche.\na) $4{,}9$ donne $5$ et $3{,}1$ donne $3$. $5 \\times 3 = 15$. Je choisis $15{,}19$.\nb) $19{,}8$ donne $20$. $20 \\div 4 = 5$. Je choisis $4{,}95$.\nc) $102{,}5$ donne $103$ et $9{,}87$ donne $10$. $103 + 10 = 113$. Je choisis $112{,}37$.\n⭐ Cet ordre de grandeur sert à contrôler la place de la virgule.\n⛔ Le piège : choisir les « bons chiffres » sans regarder la virgule. $151{,}9$ a les mêmes chiffres, mais il est dix fois trop grand.\nRéponse : a) $15{,}19$ ; b) $4{,}95$ ; c) $112{,}37$.",
          schema: ecranSeulement(
            table(["calcul", "environ", "résultat"], [
              ["4,9 × 3,1", "15", "15,19"],
              ["19,8 ÷ 4", "5", "4,95"],
              ["102,5 + 9,87", "113", "112,37"],
            ]),
          ),
          micros: ["decimal_calcul_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs calculs dans une même situation. Je pose, puis je contrôle avec un ordre de grandeur.",
      rappel: [
        "Pour ajouter ou enlever : virgule sous virgule, toujours.",
        "Un produit a autant de chiffres après la virgule que les deux nombres réunis.",
        "Pour contrôler : j'arrondis les nombres, je calcule de tête, je compare.",
      ],
      exercices: [
        {
          enonce: "Au marché, Nadia achète une baguette à $1{,}15$ €, du fromage à $4{,}8$ € et des pommes à $3{,}27$ €.\na) Combien paie-t-elle ?\nb) Elle donne un billet de $20$ €. Combien lui rend-on ?",
          correction:
            "a) Je pose virgule sous virgule. $4{,}8$ devient $4{,}80$.\n$1{,}15 + 4{,}80 + 3{,}27 = 9{,}22$. Elle paie $9{,}22$ €.\nb) $20$ devient $20{,}00$. $20 - 9{,}22 = 10{,}78$.\nOn lui rend $10{,}78$ €.\n⭐ Contrôle : $9{,}22 + 10{,}78 = 20$.\n⛔ Le piège : poser $4{,}8$ sous les centièmes, comme si c'était $0{,}48$.\nRéponse : a) $9{,}22$ € ; b) $10{,}78$ €.",
          schema: (
            <div className="grid grid-cols-1 min-w-0 gap-3">
              {posee("+", ["1,15", "4,80", "3,27"], "9,22")}
              {ecranSeulement(posee("−", ["20,00", "9,22"], "10,78"))}
            </div>
          ),
          micros: ["decimal_additionner"],
        },
        {
          enonce: "Une recette de crêpes pour $4$ personnes demande $0{,}75$ L de lait. Elle demande aussi $0{,}25$ kg de farine et $0{,}06$ kg de sucre. On veut des crêpes pour $12$ personnes.\na) Par combien faut-il multiplier les quantités ?\nb) Calcule chaque quantité pour $12$ personnes.",
          correction:
            "a) $12 \\div 4 = 3$. Il faut tout multiplier par $3$.\nb) Lait : $0{,}75 \\times 3 = 2{,}25$ L.\nFarine : $0{,}25 \\times 3 = 0{,}75$ kg.\nSucre : $0{,}06 \\times 3 = 0{,}18$ kg.\n⛔ Le piège : ajouter $3$ au lieu de multiplier par $3$. Trois fois plus de monde, trois fois plus de lait.\nRéponse : a) par $3$ ; b) $2{,}25$ L de lait, $0{,}75$ kg de farine, $0{,}18$ kg de sucre.",
          schema: ecranSeulement(
            table(["ingrédient", "pour 4", "pour 12"], [
              ["lait", "0,75 L", "2,25 L"],
              ["farine", "0,25 kg", "0,75 kg"],
              ["sucre", "0,06 kg", "0,18 kg"],
            ]),
          ),
          micros: ["decimal_multiplier"],
        },
        {
          enonce: "Quatre amis partagent l'addition du restaurant : $58{,}6$ €. Chacun paie la même somme.\na) Combien paie chacun ?\nb) Vérifie ton résultat avec une multiplication.",
          correction:
            "a) Je pose $58{,}6 \\div 4$. J'ajoute un zéro : $58{,}60$.\n$5 \\div 4 = 1$, il reste $1$. J'abaisse le $8$ : $18 \\div 4 = 4$, il reste $2$.\nJ'abaisse le $6$ des dixièmes : je mets la virgule. $26 \\div 4 = 6$, il reste $2$.\nJ'abaisse le $0$ : $20 \\div 4 = 5$, il reste $0$.\nChacun paie $14{,}65$ €.\nb) $14{,}65 \\times 4 = 58{,}6$. C'est bien l'addition.\n⛔ Le piège : s'arrêter à $14{,}6$ avec un reste. Pour payer au centime près, je continue.\nRéponse : a) $14{,}65$ € ; b) $14{,}65 \\times 4 = 58{,}6$.",
          schema: potence("58,60", "4", "14,65", [
            { texte: "18", fin: 1 },
            { texte: "26", fin: 2 },
            { texte: "20", fin: 3 },
            { texte: "0", fin: 3 },
          ]),
          micros: ["decimal_diviser_par_entier"],
        },
        {
          enonce: "On peut convertir en multipliant par $0{,}1$, $0{,}01$ ou $0{,}001$.\na) $1$ cm $= 0{,}01$ m. Combien de mètres font $175$ cm ?\nb) $1$ mm $= 0{,}1$ cm. Combien de centimètres font $8$ mm ?\nc) $1$ g $= 0{,}001$ kg. Combien de kilogrammes font $2\\,450$ g ?",
          correction:
            "a) $175 \\times 0{,}01$, c'est $175 \\div 100 = 1{,}75$. Cela fait $1{,}75$ m.\nb) $8 \\times 0{,}1$, c'est $8 \\div 10 = 0{,}8$. Cela fait $0{,}8$ cm.\nc) $2\\,450 \\times 0{,}001$, c'est $2\\,450 \\div 1\\,000 = 2{,}45$. Cela fait $2{,}45$ kg.\n⭐ Contrôle : $175$ cm, c'est moins de $2$ m. Le résultat $1{,}75$ m va bien.\n⛔ Le piège du c) : multiplier par $1\\,000$. Un kilogramme contient beaucoup de grammes : le nombre doit baisser.\nRéponse : a) $1{,}75$ m ; b) $0{,}8$ cm ; c) $2{,}45$ kg.",
          schema: numeration(["C", "D", "U", "d", "c"], [
            { chiffres: ["1", "7", "5", "", ""], nom: "175" },
            { chiffres: ["", "", "1", "7", "5"], nom: "1,75" },
          ]),
          micros: ["decimal_multiplier_par_01"],
        },
        {
          enonce: "Sans calculer, dis si le résultat est plus grand ou plus petit que $24$.\na) $24 \\times 1{,}5$\nb) $24 \\times 0{,}5$\nc) $24 \\times 0{,}1$\nd) $24 \\times 1$\nPuis calcule les quatre produits.",
          correction:
            "Multiplier par un nombre plus grand que $1$ agrandit. Par un nombre plus petit que $1$, cela réduit.\na) $1{,}5 > 1$ : plus grand. $24 \\times 1{,}5 = 36$.\nb) $0{,}5 < 1$ : plus petit. $24 \\times 0{,}5 = 12$, c'est la moitié.\nc) $0{,}1 < 1$ : plus petit. $24 \\times 0{,}1 = 2{,}4$.\nd) Multiplier par $1$ ne change rien : $24 \\times 1 = 24$.\n⛔ Le piège : croire qu'une multiplication agrandit toujours. C'est faux quand on multiplie par un nombre plus petit que $1$.\nRéponse : a) $36$ ; b) $12$ ; c) $2{,}4$ ; d) $24$.",
          schema: demiDroite(0, 40, 2, [
            { value: 2.4, label: "× 0,1", color: ROUGE },
            { value: 12, label: "× 0,5", color: ROUGE },
            { value: 24, label: "× 1" },
            { value: 36, label: "× 1,5", color: VERT },
          ], { nombres: 10 }),
          micros: ["decimal_calcul_defi", "decimal_multiplier"],
        },
        {
          enonce: "Au relais $4 \\times 100$ m, les quatre coureurs font $11{,}8$ s, puis $12{,}05$ s, puis $11{,}6$ s, puis $12{,}3$ s.\na) Quel est le temps de l'équipe ?\nb) Le record du collège est $48{,}2$ s. L'équipe l'a-t-elle battu ? De combien ?",
          correction:
            "a) Je pose virgule sous virgule, avec deux chiffres après la virgule.\n$11{,}80 + 12{,}05 = 23{,}85$. Puis $23{,}85 + 11{,}60 = 35{,}45$.\nPuis $35{,}45 + 12{,}30 = 47{,}75$. L'équipe court en $47{,}75$ s.\nb) Le plus petit temps gagne. $47{,}75 < 48{,}2$ : le record est battu.\n$48{,}20 - 47{,}75 = 0{,}45$ s.\n⛔ Le piège : poser $12{,}05$ décalé, avec le $5$ sous les dixièmes.\nRéponse : a) $47{,}75$ s ; b) oui, de $0{,}45$ s.",
          schema: ecranSeulement(posee("+", ["11,80", "12,05", "11,60", "12,30"], "47,75")),
          micros: ["decimal_additionner"],
        },
        {
          enonce: "Une ficelle de $10$ m est coupée en $8$ morceaux égaux.\na) Combien mesure chaque morceau ?\nb) Et si on la coupe en $3$ morceaux égaux ? Que remarques-tu ?\nc) Donne alors une valeur arrondie au centième.",
          correction:
            "a) Je pose $10 \\div 8$. Je continue après la virgule.\n$10 \\div 8 = 1$, il reste $2$. $20 \\div 8 = 2$, il reste $4$. $40 \\div 8 = 5$, il reste $0$.\nChaque morceau mesure $1{,}25$ m.\nb) $10 \\div 3 = 3$, il reste $1$. Puis encore $10 \\div 3 = 3$, il reste $1$. Et ainsi de suite.\nLe quotient s'écrit $3{,}333\\ldots$ : il ne s'arrête jamais.\nc) Au centième : je regarde les millièmes, $3$. Je garde $3{,}33$ m.\n⭐ Contrôle du a) : $8 \\times 1{,}25 = 10$.\n⛔ Le piège : croire qu'une division finit toujours par tomber juste. $10 \\div 3$ ne tombe jamais juste.\nRéponse : a) $1{,}25$ m ; b) le quotient ne s'arrête pas ; c) environ $3{,}33$ m.",
          schema: potence("10,00", "8", "1,25", [
            { texte: "20", fin: 2 },
            { texte: "40", fin: 3 },
            { texte: "0", fin: 3 },
          ]),
          micros: ["decimal_diviser_par_entier", "decimal_calcul_defi"],
        },
        {
          enonce: "Un tapis rectangulaire mesure $3{,}5$ m de long et $2{,}4$ m de large.\na) Son aire est la longueur multipliée par la largeur. Calcule-la.\nb) Vérifie avec un ordre de grandeur.",
          correction:
            "a) Je calcule sans les virgules : $35 \\times 24$.\n$35 \\times 4 = 140$ et $35 \\times 20 = 700$. Donc $35 \\times 24 = 840$.\nIl y a $1 + 1 = 2$ chiffres après la virgule : $8{,}40$.\nL'aire est $3{,}5 \\times 2{,}4 = 8{,}4$ m².\nb) $3{,}5$ donne $4$ et $2{,}4$ donne $2$. $4 \\times 2 = 8$ : c'est proche de $8{,}4$.\n⛔ Le piège : écrire $84$ m². Il faut remettre deux chiffres après la virgule.\nRéponse : a) $8{,}4$ m² ; b) environ $8$ m².",
          schema: posee("×", ["3,5", "2,4"], "8,40", ["140", "700"]),
          micros: ["decimal_multiplier"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs calculs. Je choisis l'opération, je pose, je contrôle, puis je réponds par une phrase.",
      rappel: [
        "Partager en parts égales : je divise. Plusieurs fois la même quantité : je multiplie.",
        "En euros, je continue la division jusqu'aux centimes.",
        "Je contrôle chaque résultat avec l'opération inverse.",
      ],
      exercices: [
        {
          titre: "La sortie au parc",
          enonce: "Une classe de $24$ élèves part au parc animalier. Le billet coûte $12{,}5$ € par élève. Le car coûte $450$ € pour toute la classe.\na) Combien coûtent les $24$ billets ?\nb) Le prix du car est partagé entre les $24$ élèves. Combien paie chaque élève pour le car ?\nc) Combien coûte la sortie pour un élève, billet et car compris ?\nd) Les familles donnent $30$ € par élève. Combien manque-t-il pour toute la classe ?",
          correction:
            "a) $12{,}5 \\times 24 = 300$. Les billets coûtent $300$ €.\nb) Je pose $450 \\div 24$. Je continue après la virgule.\n$45 \\div 24 = 1$, il reste $21$. $210 \\div 24 = 8$, il reste $18$.\nJ'abaisse un $0$ après la virgule : $180 \\div 24 = 7$, il reste $12$. Puis $120 \\div 24 = 5$.\nChaque élève paie $18{,}75$ € pour le car.\nc) $12{,}5 + 18{,}75 = 31{,}25$ €.\nd) Il manque $31{,}25 - 30 = 1{,}25$ € par élève.\nPour la classe : $1{,}25 \\times 24 = 30$ €.\n⭐ Contrôle : $18{,}75 \\times 24 = 450$.\n⛔ Le piège du b) : écrire « $18$ reste $18$ ». En euros, je continue jusqu'aux centimes.\nRéponse : a) $300$ € ; b) $18{,}75$ € ; c) $31{,}25$ € ; d) $30$ €.",
          schema: (
            <div className="grid grid-cols-1 min-w-0 gap-3">
              {table(["dépense", "classe", "un élève"], [
                ["billets", "300 €", "12,5 €"],
                ["car", "450 €", "18,75 €"],
                ["total", "750 €", "31,25 €"],
              ])}
              {ecranSeulement(
                potence("450,00", "24", "18,75", [
                  { texte: "210", fin: 2 },
                  { texte: "180", fin: 3 },
                  { texte: "120", fin: 4 },
                  { texte: "0", fin: 4 },
                ]),
              )}
            </div>
          ),
          micros: ["decimal_multiplier", "decimal_diviser_par_entier", "decimal_additionner"],
        },
        {
          titre: "Les tomates du potager",
          enonce: "Léo récolte des tomates pendant trois semaines : $2{,}8$ kg, puis $4{,}35$ kg, puis $2{,}85$ kg.\na) Quelle masse a-t-il récoltée en tout ?\nb) Il garde $0{,}1$ de la récolte pour faire de la confiture. Quelle masse est-ce ?\nc) Il partage le reste entre ses $4$ voisins, en parts égales. Combien reçoit chacun ?",
          correction:
            "a) Je pose virgule sous virgule. $2{,}80 + 4{,}35 = 7{,}15$. Puis $7{,}15 + 2{,}85 = 10$.\nIl a récolté $10$ kg.\nb) $10 \\times 0{,}1$, c'est $10 \\div 10 = 1$. Il garde $1$ kg pour la confiture.\nc) Il reste $10 - 1 = 9$ kg.\n$9 \\div 4 = 2$, il reste $1$. $10 \\div 4 = 2$, il reste $2$. $20 \\div 4 = 5$.\nChaque voisin reçoit $2{,}25$ kg.\n⭐ Contrôle : $2{,}25 \\times 4 = 9$.\n⛔ Le piège du b) : écrire $100$ kg. Multiplier par $0{,}1$, c'est prendre un dixième : le nombre baisse.\nRéponse : a) $10$ kg ; b) $1$ kg ; c) $2{,}25$ kg.",
          schema: potence("9,00", "4", "2,25", [
            { texte: "10", fin: 1 },
            { texte: "20", fin: 2 },
            { texte: "0", fin: 2 },
          ]),
          micros: ["decimal_additionner", "decimal_multiplier_par_01", "decimal_diviser_par_entier"],
        },
        {
          titre: "L'eau de la douche",
          enonce: "Dans cet exercice, une douche normale utilise $12{,}5$ L d'eau par minute. Avec un pommeau économe, elle utilise $7{,}5$ L par minute. Nora se douche $8$ minutes par jour.\na) Combien de litres utilise-t-elle avec la douche normale ? Avec le pommeau économe ?\nb) Combien de litres économise-t-elle par jour ?\nc) Et en $30$ jours ?\nd) $1\\,000$ L d'eau coûtent $4$ €. Combien coûte $1$ L ? Combien économise-t-elle en $30$ jours ?",
          correction:
            "a) Normale : $12{,}5 \\times 8 = 100$ L. Économe : $7{,}5 \\times 8 = 60$ L.\nb) $100 - 60 = 40$ L par jour.\nc) $40 \\times 30 = 1\\,200$ L en $30$ jours.\nd) $1$ L coûte $4 \\div 1\\,000$, soit $4 \\times 0{,}001 = 0{,}004$ €.\nPour $1\\,200$ L, je calcule $1\\,200 \\times 4 = 4\\,800$.\nTrois chiffres après la virgule : $4{,}800$, soit $4{,}8$ €.\n⭐ Contrôle : $1\\,200$ L, c'est un peu plus que $1\\,000$ L. Cela coûte un peu plus que $4$ €.\n⛔ Le piège du d) : écrire $4\\,800$ €. Un litre d'eau coûte bien moins qu'un centime.\nRéponse : a) $100$ L et $60$ L ; b) $40$ L ; c) $1\\,200$ L ; d) $0{,}004$ € par litre, et $4{,}8$ € en $30$ jours.",
          schema: table(["douche", "par minute", "en 8 min"], [
            ["normale", "12,5 L", "100 L"],
            ["économe", "7,5 L", "60 L"],
            ["économie", "5 L", "40 L"],
          ]),
          micros: ["decimal_multiplier", "decimal_multiplier_par_01", "decimal_additionner"],
        },
        {
          titre: "Le nombre mystère",
          enonce: "Je pense à un nombre. Je le multiplie par $4$. Puis j'ajoute $1{,}3$. J'obtiens $11{,}7$.\na) Avant d'ajouter $1{,}3$, quel nombre avais-je ?\nb) Quel est mon nombre de départ ?\nc) Vérifie en refaisant le programme.",
          correction:
            "Je remonte le programme avec les opérations inverses.\na) J'ai ajouté $1{,}3$. J'enlève donc $1{,}3$ : $11{,}7 - 1{,}3 = 10{,}4$.\nb) J'ai multiplié par $4$. Je divise donc par $4$ : $10{,}4 \\div 4 = 2{,}6$.\nc) $2{,}6 \\times 4 = 10{,}4$. Puis $10{,}4 + 1{,}3 = 11{,}7$. C'est bien ça.\n⛔ Le piège : défaire les étapes dans le mauvais ordre. Je défais d'abord la DERNIÈRE étape.\nRéponse : a) $10{,}4$ ; b) $2{,}6$.",
          schema: chaine(["2,6", "10,4", "11,7"], ["× 4", "+ 1,3"], ["÷ 4", "− 1,3"]),
          micros: ["decimal_calcul_defi", "decimal_diviser_par_entier"],
        },
      ],
    },
  ],
};
