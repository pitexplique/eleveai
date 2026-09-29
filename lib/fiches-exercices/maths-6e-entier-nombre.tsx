// ─── Fiche d'exercices : les nombres entiers (6e) — 20 exercices corrigés ──────
//
// Feuille du lot de 6e (30/09/2026), sur la forme de l'étalon de 5e
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-entiers.tsx` et sur la
// banque `lib/tutor-v4/questionBank/6e/maths/entiers.bank.ts`, notionId
// entier_nombre : lire et écrire (chiffres et lettres), rang d'un chiffre,
// comparer et ranger, décomposer, encadrer, défis.
// ⛔ LIMITES DE LA 6e : des entiers seulement, jusqu'aux centaines de millions
// (neuf chiffres au plus). Aucune virgule, aucun relatif. L'arrondi se fait à la
// dizaine, la centaine ou le millier « le plus proche », comme dans la banque.
// ⛔ Aucun exemple de la fiche de cours n'est repris (4 273, 345 et 354, 98 et
// 1 042, 47 entre 40 et 50, 2 845, 2 035, 2 305 et 2 350, les chiffres 3-0-5-1,
// 352, 908 et 1 205, 304).
//
// ⭐ PUBLIC DE 11 ANS (Frédéric, 30/09) : « ils ont parfois du mal à LIRE ».
// Phrases de 12 mots en moyenne, 20 au plus, une idée par phrase.
//
// Les pièges nommés : les zéros des rangs vides (1, 10), le s de « cent » et de
// « vingt » devant mille (2, 17), « chiffre des » contre « nombre de » (3, 13,
// 16), le 0 des millions oublié (4), « il commence par 9 » (5, 11), la valeur
// d'un chiffre mal lue (6), deux dizaines qui ne se suivent pas (7), ranger au
// premier chiffre (8), un million à trois zéros (9), 12 centaines dans une seule
// colonne (10), le 0 en tête (14), la graduation prise pour 1 000 (15), le
// milieu mal placé (17), l'ordre des indices (18), milliers et dizaines de mille
// confondus (19), un nombre déjà dépassé (20).
//
// Les faits réels : ex. 9, distances moyennes au Soleil, arrondies au million
// de km comme dans les manuels (Mercure ≈ 58, Vénus ≈ 108, Terre ≈ 150, Mars ≈
// 228, Jupiter ≈ 778 millions de km ; la feuille dit « à peu près »). Tout le
// reste (stades, vélos, bouchons, voiture, oiseaux, compteur) est un MODÈLE.
//
// ⭐ LES DESSINS : le tableau de numération en SVG (`numeration`, les classes
// de trois colonnes, une colonne allumée), la droite graduée de l'étalon
// (`droiteRel`, pour comparer, lire et encadrer) et un tableau (`table`).
// 14 dessins imprimés ; ceux qui redisent le corrigé sont `ecranSeulement`.
//
// Les corrigés sont écrits à la première personne (« je lis la classe »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-entier-nombre.mjs`.
//
// Micro-compétences : entier_lire_ecrire (1, 2, 4, 9, 15, 17, 18, 19),
// entier_rang (3, 4, 9, 13, 16, 18, 19, 20), entier_comparer (5, 8, 9, 11, 12,
// 14, 16, 17, 19), entier_decomposer (6, 10, 13), entier_encadrer (7, 11, 12,
// 15, 17, 19, 20), entier_defi (10, 13, 14, 16, 18, 20). 6/6.

import type { ReactNode } from "react";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, ORANGE } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

type Point = { value: number; label: string; color?: string };
type Saut = { de: number; vers: number; label: string };

/** 3 684 : un nombre écrit comme au tableau (texte NU, pas de KaTeX en SVG). */
const ecrit = (v: number) => {
  const [e, d] = String(Math.abs(v)).split(".");
  return (v < 0 ? "−" : "") + e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : "");
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * ⭐ LE TABLEAU DE NUMÉRATION : une colonne par rang, groupées par classes de
 * trois (unités, milliers, millions), une ligne par nombre, les chiffres
 * alignés sur les unités. `surligne` allume une colonne (0 = unités, 1 =
 * dizaines, 2 = centaines…). `noms` : une étiquette courte à gauche de chaque
 * ligne. ⛔ Neuf colonnes au plus (jusqu'à 999 999 999). Texte NU.
 */
const numeration = (nombres: string[], opts: { surligne?: number; noms?: string[] } = {}) => {
  const W = 300;
  const larg = Math.max(...nombres.map((n) => n.length));
  const cols = Math.max(1, Math.ceil(larg / 3)) * 3;
  const gauche = opts.noms ? 84 : 6;
  const cw = Math.min(32, (W - gauche - 6) / cols);
  const x0 = gauche + (W - gauche - 6 - cols * cw) / 2;
  // c = rang compté depuis la droite (0 = unités).
  const X = (c: number) => x0 + (cols - 1 - c) * cw + cw / 2;
  const [haut, hl] = [48, 26];
  const H = haut + nombres.length * hl + 6;
  const classes = ["unités", "milliers", "millions"];
  const lettres = ["u", "d", "c"];
  return (
    <div className="mx-auto w-full max-w-[20rem] print:max-w-[14rem]">
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="Tableau de numération">
        {opts.surligne !== undefined ? <rect x={X(opts.surligne) - cw / 2} y={24} width={cw} height={H - 26} fill="#ffedd5" /> : null}
        {Array.from({ length: cols / 3 }, (_, k) => (
          <text key={`cl${k}`} x={X(3 * k + 1)} y={16} textAnchor="middle" fontSize="12" fontWeight="700" fill="#475569">
            {classes[k]}
          </text>
        ))}
        {Array.from({ length: cols }, (_, c) => (
          <text key={`l${c}`} x={X(c)} y={40} textAnchor="middle" fontSize="12" fontWeight="700" fill={c === opts.surligne ? ORANGE : "#64748b"}>
            {lettres[c % 3]}
          </text>
        ))}
        {Array.from({ length: cols + 1 }, (_, i) => (
          <line key={`v${i}`} x1={x0 + i * cw} y1={i % 3 === 0 ? 4 : 24} x2={x0 + i * cw} y2={H - 2} stroke={i % 3 === 0 ? NOIR : "#cbd5e1"} strokeWidth={i % 3 === 0 ? 1.8 : 1} />
        ))}
        <line x1={x0} y1={24} x2={x0 + cols * cw} y2={24} stroke="#cbd5e1" strokeWidth={1} />
        <line x1={x0} y1={haut - 2} x2={x0 + cols * cw} y2={haut - 2} stroke={NOIR} strokeWidth={1.4} />
        {nombres.map((n, i) => (
          <g key={`n${i}`}>
            {opts.noms ? (
              <text x={x0 - 6} y={haut + i * hl + 18} textAnchor="end" fontSize="13" fontWeight="800" fill={BLEU}>
                {opts.noms[i]}
              </text>
            ) : null}
            {n.split("").map((ch, j) => {
              const c = n.length - 1 - j;
              return (
                <text key={j} x={X(c)} y={haut + i * hl + 18} textAnchor="middle" fontSize="16" fontWeight="800" fill={c === opts.surligne ? ORANGE : NOIR}>
                  {ch}
                </text>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
};

/**
 * Une droite graduée HORIZONTALE (celle de l'étalon de 5e) : une graduation
 * tous les `pas`, un nombre tous les `nombres`, des points nommés SOUS les
 * nombres, et des arcs fléchés (`sauts`). Les étiquettes de points descendent
 * d'une rangée quand elles se touchent. ⛔ Cinq nombres à cinq chiffres au plus.
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
              <text x={x(t)} y={Y + 22} textAnchor="middle" fontSize="14" fontWeight="700" fill={NOIR}>
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

/** Un tableau à plusieurs lignes (le `tableau()` commun n'en a qu'une). */
const table = (entete: string[], lignes: string[][]) => (
  <div className="mx-auto w-full max-w-[22rem] print:max-w-[15rem]">
    <CanvasRenderer figure={{ kind: "tableau_donnees", headers: entete, rows: lignes.map((values) => ({ values })), display: { compact: true, striped: true } }} />
  </div>
);

export const exercicesEntierNombre6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "entier-nombre",
  titre: "Les nombres entiers",
  accroche:
    "Vingt exercices, du geste seul au problème : écrire un nombre en chiffres et en lettres, trouver le rang d'un chiffre, comparer et ranger, décomposer, encadrer. Des planètes, des stades de rugby, des vélos, des bouchons à recycler, un chèque, des oiseaux à compter, un compteur de voiture. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et le tableau de numération dessiné.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/entier-nombre", titre: "Les nombres entiers" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une règle par exercice. Je range les chiffres dans le tableau avant de répondre.",
      rappel: [
        "Un grand nombre s'écrit par classes de trois chiffres : les unités, les milliers, les millions.",
        "Dans chaque classe : centaines, dizaines, unités. Dans $740$, le $4$ vaut $40$.",
        "Pour comparer : le plus de chiffres gagne. Sinon, je compare depuis la gauche.",
        "Encadrer, c'est placer un nombre entre deux nombres ronds qui se suivent.",
      ],
      exercices: [
        {
          enonce: "Écris chaque nombre en chiffres.\na) trois mille six cent huit\nb) quarante-sept mille vingt\nc) deux millions cinq cent mille\nd) six cent mille neuf",
          correction:
            "Je coupe le nombre aux mots « millions » et « mille ».\nChaque morceau remplit une classe de trois chiffres.\na) « trois » mille, puis « six cent huit » : $3\\,608$.\nb) « quarante-sept » mille, puis « vingt ». Vingt s'écrit $020$ dans sa classe. Donc $47\\,020$.\nc) « deux » millions, « cinq cent » mille, puis rien. Donc $2\\,500\\,000$.\nd) « six cent » mille, puis « neuf ». Neuf s'écrit $009$. Donc $600\\,009$.\n⛔ Le piège : oublier les zéros et écrire $6\\,009$ au d). Après « mille », il faut toujours trois chiffres.\nRéponse : a) $3\\,608$ ; b) $47\\,020$ ; c) $2\\,500\\,000$ ; d) $600\\,009$.",
          schema: numeration(["3608", "47020", "2500000", "600009"], { noms: ["a)", "b)", "c)", "d)"] }),
          micros: ["entier_lire_ecrire"],
        },
        {
          enonce: "Écris chaque nombre en lettres.\na) $1\\,700$\nb) $80\\,000$\nc) $3\\,091$\nd) $200\\,300$",
          correction:
            "Je lis d'abord la classe des mille, puis le reste.\na) « mille », puis « sept cents » : mille sept cents.\nb) « quatre-vingt » mille : quatre-vingt mille.\nc) « trois mille », puis « quatre-vingt-onze » : trois mille quatre-vingt-onze.\nd) « deux cent » mille, puis « trois cents » : deux cent mille trois cents.\n⚠️ « Cent » et « vingt » prennent un s s'ils sont multipliés et finissent le nombre.\nDevant « mille », pas de s : deux cent mille. « Mille » ne prend jamais de s.\n⛔ Le piège : écrire « quatre-vingts mille » au b).\n⭐ On peut aussi mettre des traits d'union partout. Les deux écritures sont justes.\nRéponse : a) mille sept cents ; b) quatre-vingt mille ; c) trois mille quatre-vingt-onze ; d) deux cent mille trois cents.",
          schema: ecranSeulement(
            table(["en chiffres", "en lettres"], [
              ["1 700", "mille sept cents"],
              ["80 000", "quatre-vingt mille"],
              ["3 091", "trois mille quatre-vingt-onze"],
              ["200 300", "deux cent mille trois cents"],
            ]),
          ),
          micros: ["entier_lire_ecrire"],
        },
        {
          enonce: "Dans le nombre $27\\,486$ :\na) quel est le chiffre des centaines ?\nb) quel est le nombre de centaines ?\nc) quel est le chiffre des dizaines ?\nd) quel est le nombre de dizaines ?",
          correction:
            "Je range le nombre dans le tableau, les unités à droite.\na) Le chiffre des centaines est dans la colonne des centaines : $4$.\nb) Le nombre de centaines : je lis depuis la gauche jusqu'à cette colonne. C'est $274$.\nEn effet, $274 \\times 100 = 27\\,400$.\nc) Le chiffre des dizaines est $8$.\nd) Le nombre de dizaines : je lis jusqu'à la colonne des dizaines. C'est $2\\,748$.\n⛔ Le piège : confondre « chiffre des » et « nombre de ».\nLe chiffre est seul dans sa colonne. Le nombre prend tout ce qui est à gauche.\nRéponse : a) $4$ ; b) $274$ ; c) $8$ ; d) $2\\,748$.",
          schema: numeration(["27486"], { surligne: 2 }),
          micros: ["entier_rang"],
        },
        {
          enonce: "Voici un nombre : $30\\,915\\,624$.\na) Quel est le chiffre des millions ?\nb) Quel est le chiffre des dizaines de mille ?\nc) À quel rang est le chiffre $9$ ?\nd) Que vaut le chiffre $3$ ?",
          correction:
            "Je coupe le nombre en classes de trois, depuis la droite : $30$, $915$ et $624$.\na) La classe des millions contient $30$. Le chiffre des millions est $0$.\nb) La classe des mille contient $915$ : $9$ centaines, $1$ dizaine, $5$ unités de mille.\nLe chiffre des dizaines de mille est $1$.\nc) Le $9$ est au rang des centaines de mille.\nd) Le $3$ est au rang des dizaines de millions. Il vaut $30\\,000\\,000$ : trente millions.\n⛔ Le piège : oublier le $0$ et croire que $3$ est le chiffre des millions. Le $0$ occupe ce rang.\nRéponse : a) $0$ ; b) $1$ ; c) les centaines de mille ; d) $30\\,000\\,000$.",
          schema: numeration(["30915624"], { surligne: 6 }),
          micros: ["entier_rang", "entier_lire_ecrire"],
        },
        {
          enonce: "Complète par $<$ ou $>$.\na) $9\\,870$ … $10\\,002$\nb) $45\\,390$ … $45\\,309$\nc) $700\\,070$ … $700\\,700$\nd) $1\\,000\\,000$ … $999\\,999$",
          correction:
            "Je compte d'abord les chiffres. Le nombre qui en a le plus est le plus grand.\nS'ils en ont autant, je compare chiffre par chiffre depuis la gauche.\na) $4$ chiffres contre $5$ : $9\\,870 < 10\\,002$.\nb) Même longueur. Aux dizaines, $9 > 0$ : $45\\,390 > 45\\,309$.\nc) Même longueur. Aux centaines, $0 < 7$ : $700\\,070 < 700\\,700$.\nd) $7$ chiffres contre $6$ : $1\\,000\\,000 > 999\\,999$.\n⛔ Le piège : croire que $9\\,870$ gagne parce qu'il commence par $9$. Je compte les chiffres d'abord.\nRéponse : a) $<$ ; b) $>$ ; c) $<$ ; d) $>$.",
          schema: ecranSeulement(numeration(["45390", "45309"], { surligne: 1, noms: ["b) 1er", "b) 2e"] })),
          micros: ["entier_comparer"],
        },
        {
          enonce: "Décompose chaque nombre de deux façons : avec une somme, puis avec des produits par $10$, $100$, $1\\,000$…\na) $6\\,042$\nb) $50\\,708$",
          correction:
            "Je lis la valeur de chaque chiffre dans le tableau. Un $0$ ne donne rien.\na) $6$ milliers, $0$ centaine, $4$ dizaines, $2$ unités.\n$6\\,042 = 6\\,000 + 40 + 2$\n$6\\,042 = 6 \\times 1\\,000 + 4 \\times 10 + 2$\nb) $5$ dizaines de mille, $7$ centaines, $8$ unités.\n$50\\,708 = 50\\,000 + 700 + 8$\n$50\\,708 = 5 \\times 10\\,000 + 7 \\times 100 + 8$\n⛔ Le piège : écrire $400$ au lieu de $40$ au a). Le $4$ est au rang des dizaines.\n⭐ Contrôle : je refais la somme, et je retrouve bien le nombre.",
          schema: ecranSeulement(numeration(["6042", "50708"], { noms: ["a)", "b)"] })),
          micros: ["entier_decomposer"],
        },
        {
          enonce: "Encadre $3\\,684$ :\na) entre deux dizaines qui se suivent ;\nb) entre deux centaines qui se suivent ;\nc) entre deux milliers qui se suivent.",
          correction:
            "Encadrer, c'est trouver le nombre rond juste avant et celui juste après.\na) Je mets un $0$ aux unités : $3\\,680$. La dizaine suivante est $3\\,690$.\n$3\\,680 < 3\\,684 < 3\\,690$\nb) Je mets des $0$ aux dizaines et aux unités : $3\\,600$, puis $3\\,700$.\n$3\\,600 < 3\\,684 < 3\\,700$\nc) Les milliers : $3\\,000$, puis $4\\,000$.\n$3\\,000 < 3\\,684 < 4\\,000$\n⛔ Le piège : écrire $3\\,680 < 3\\,684 < 3\\,700$ au a). Les deux dizaines doivent se suivre.\n⭐ Sur la droite, $3\\,684$ est plus près de $3\\,700$ que de $3\\,600$.",
          schema: droiteRel(3600, 3700, 10, [{ value: 3684, label: "3 684", color: VERT }], { nombres: 50 }),
          micros: ["entier_encadrer"],
        },
        {
          enonce: "Range ces nombres dans l'ordre croissant.\n$12\\,050$ ; $1\\,250$ ; $12\\,500$ ; $120\\,500$ ; $1\\,205$",
          correction:
            "Croissant veut dire : du plus petit au plus grand.\nJe groupe d'abord les nombres par nombre de chiffres.\n$4$ chiffres : $1\\,250$ et $1\\,205$. $5$ chiffres : $12\\,050$ et $12\\,500$. $6$ chiffres : $120\\,500$.\nDans chaque groupe, je compare depuis la gauche.\n$1\\,205 < 1\\,250$ : aux dizaines, $0 < 5$.\n$12\\,050 < 12\\,500$ : aux centaines, $0 < 5$.\n⛔ Le piège : ranger d'après le premier chiffre. Ici, ils commencent tous par $1$.\nRéponse : $1\\,205 < 1\\,250 < 12\\,050 < 12\\,500 < 120\\,500$.",
          schema: numeration(["1205", "1250", "12050", "12500", "120500"]),
          micros: ["entier_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur une même situation. Je dessine le tableau ou la droite au brouillon.",
      rappel: [
        "Le chiffre des centaines est un seul chiffre. Le nombre de centaines se lit jusqu'à sa colonne.",
        "Un rang vide garde un $0$. Sinon, tous les chiffres glissent.",
        "Sur une droite graduée, je cherche d'abord ce que vaut une graduation.",
      ],
      exercices: [
        {
          enonce:
            "Voici, à peu près, la distance au Soleil de cinq planètes, en kilomètres.\nMars : deux cent vingt-huit millions.\nMercure : cinquante-huit millions.\nJupiter : sept cent soixante-dix-huit millions.\nLa Terre : cent cinquante millions.\nVénus : cent huit millions.\na) Écris la distance de la Terre et celle de Jupiter en chiffres.\nb) Range les planètes de la plus proche du Soleil à la plus lointaine.\nc) Écris la distance de Mars en chiffres. Quel est son chiffre des dizaines de millions ?",
          correction:
            "a) « cent cinquante » millions : la classe des millions vaut $150$. Puis deux classes de zéros.\nLa Terre est à $150\\,000\\,000$ km. Jupiter est à $778\\,000\\,000$ km.\nb) Toutes les distances sont des millions. Je compare donc $228$, $58$, $778$, $150$ et $108$.\n$58 < 108 < 150 < 228 < 778$.\nL'ordre : Mercure, Vénus, la Terre, Mars, Jupiter.\nc) Mars est à $228\\,000\\,000$ km.\nLa classe des millions est $228$. Le chiffre des dizaines de millions est $2$.\n⛔ Le piège : écrire $150\\,000$ pour « cent cinquante millions ». Un million a six zéros.\n⭐ Sur la droite, une graduation vaut $100$ millions de km.",
          schema: droiteRel(0, 800, 100, [
            { value: 58, label: "Mercure" },
            { value: 108, label: "Vénus" },
            { value: 150, label: "Terre", color: VERT },
            { value: 228, label: "Mars", color: ROUGE },
            { value: 778, label: "Jupiter", color: ORANGE },
          ], { nombres: 200 }),
          micros: ["entier_lire_ecrire", "entier_comparer", "entier_rang"],
        },
        {
          enonce: "Écris chaque nombre en chiffres.\na) $5 \\times 10\\,000 + 3 \\times 100 + 8$\nb) $7$ milliers, $12$ centaines et $5$ unités\nc) $4 \\times 1\\,000\\,000 + 6 \\times 1\\,000$\nd) $9$ dizaines de mille et $9$ unités",
          correction:
            "Je calcule la valeur de chaque morceau, puis j'additionne.\na) $50\\,000 + 300 + 8 = 50\\,308$. Les rangs vides reçoivent un $0$.\nb) $12$ centaines, c'est $1\\,200$ : un millier et deux centaines.\nDonc $7\\,000 + 1\\,200 + 5 = 8\\,205$.\nc) $4\\,000\\,000 + 6\\,000 = 4\\,006\\,000$.\nd) $90\\,000 + 9 = 90\\,009$.\n⛔ Le piège du b) : écrire $7\\,125$. Une colonne ne contient qu'un seul chiffre.\nRéponse : a) $50\\,308$ ; b) $8\\,205$ ; c) $4\\,006\\,000$ ; d) $90\\,009$.",
          schema: numeration(["50308", "8205", "4006000", "90009"], { noms: ["a)", "b)", "c)", "d)"] }),
          micros: ["entier_decomposer", "entier_defi"],
        },
        {
          enonce:
            "Voici le nombre de spectateurs de quatre matchs de rugby.\nStade A : $42\\,715$ ; stade B : $42\\,157$ ; stade C : $41\\,999$ ; stade D : $42\\,571$.\na) Range les stades, du plus de spectateurs au moins de spectateurs.\nb) Quels stades ont eu plus de $42\\,500$ spectateurs ?\nc) Encadre le nombre du stade C entre deux milliers qui se suivent.",
          correction:
            "a) Les quatre nombres ont $5$ chiffres. Je compare depuis la gauche.\n$41\\,999$ commence par $41$, les autres par $42$ : C est le plus petit.\nPour A, B et D, je regarde les centaines : $7$, $1$ et $5$.\n$42\\,715 > 42\\,571 > 42\\,157 > 41\\,999$ : A, D, B, puis C.\nb) Plus de $42\\,500$ : $42\\,715$ et $42\\,571$. Ce sont les stades A et D.\nc) $41\\,000 < 41\\,999 < 42\\,000$.\n⛔ Le piège : croire que C gagne avec ses trois $9$. Il a moins de milliers que les autres.\n⭐ Sur la droite, C est collé à $42\\,000$, juste avant.",
          schema: droiteRel(41500, 43000, 100, [
            { value: 42715, label: "A" },
            { value: 42157, label: "B" },
            { value: 41999, label: "C", color: ROUGE },
            { value: 42571, label: "D" },
          ], { nombres: 500 }),
          micros: ["entier_comparer", "entier_encadrer"],
        },
        {
          enonce: "Au magasin, un vélo électrique coûte $1\\,486$ €. Un autre coûte $1\\,468$ €.\na) Encadre le prix du premier vélo entre deux centaines qui se suivent.\nb) De quelle centaine ce prix est-il le plus proche ?\nc) Encadre ce prix entre deux dizaines qui se suivent.\nd) Quel vélo est le moins cher ?",
          correction:
            "a) $1\\,400 < 1\\,486 < 1\\,500$.\nb) De $1\\,486$ à $1\\,500$, il y a $14$. De $1\\,400$ à $1\\,486$, il y a $86$.\nLe prix est plus proche de $1\\,500$. Le vélo coûte environ $1\\,500$ €.\nc) $1\\,480 < 1\\,486 < 1\\,490$.\nd) Mêmes milliers, mêmes centaines. Aux dizaines, $6 < 8$.\nDonc $1\\,468 < 1\\,486$ : le second vélo est le moins cher.\n⛔ Le piège : confondre $1\\,486$ et $1\\,468$. Mêmes chiffres, mais pas aux mêmes rangs.\nRéponse : a) entre $1\\,400$ et $1\\,500$ ; b) $1\\,500$ ; c) entre $1\\,480$ et $1\\,490$ ; d) le second.",
          schema: droiteRel(1400, 1500, 10, [
            { value: 1486, label: "vélo 1", color: VERT },
            { value: 1468, label: "vélo 2" },
          ], { nombres: 50 }),
          micros: ["entier_encadrer", "entier_comparer"],
        },
        {
          enonce:
            "Une association a récolté $36\\,572$ bouchons en plastique pour les recycler.\na) Elle les met dans des sacs de $100$ bouchons. Combien de sacs pleins ? Combien de bouchons restent ?\nb) Les bouchons vont ensuite dans des cartons de $1\\,000$. Combien de cartons pleins ?\nc) Combien de bouchons manque-t-il pour remplir un carton de plus ?",
          correction:
            "a) Un sac de $100$ bouchons, c'est une centaine.\nJe cherche le nombre de centaines de $36\\,572$. Je lis jusqu'aux centaines : $365$.\nElle remplit $365$ sacs. Il reste $72$ bouchons.\nb) Un carton, c'est un millier. Le nombre de milliers est $36$ : $36$ cartons pleins.\nc) Après les cartons, il reste $572$ bouchons. Or $572 + 428 = 1\\,000$.\nIl manque $428$ bouchons.\n⛔ Le piège : répondre $5$ sacs au a). C'est le chiffre des centaines, pas leur nombre.\nRéponse : a) $365$ sacs, reste $72$ ; b) $36$ cartons ; c) $428$ bouchons.",
          schema: ecranSeulement(numeration(["36572"], { surligne: 2 })),
          micros: ["entier_rang", "entier_decomposer", "entier_defi"],
        },
        {
          enonce: "On a les cinq chiffres $6$, $0$, $8$, $3$ et $1$. On les utilise tous, une seule fois chacun.\na) Écris le plus grand nombre possible.\nb) Écris le plus petit nombre possible.\nc) Écris le plus petit nombre impair possible.",
          correction:
            "a) Je mets les plus grands chiffres à gauche : ce sont les rangs qui valent le plus.\nLe plus grand est $86\\,310$.\nb) Je mets les plus petits à gauche. Mais un nombre ne commence pas par $0$.\nJe place d'abord $1$, puis $0$, $3$, $6$ et $8$ : $10\\,368$.\nc) Un nombre impair finit par $1$ ou par $3$.\nS'il finit par $1$, il commence par $3$ : $30\\,681$.\nS'il finit par $3$, il commence par $1$ : $10\\,683$.\nLe plus petit des deux est $10\\,683$.\n⛔ Le piège : écrire $01\\,368$ au b). Avec un $0$ devant, il n'a que quatre chiffres.\nRéponse : a) $86\\,310$ ; b) $10\\,368$ ; c) $10\\,683$.",
          schema: ecranSeulement(numeration(["86310", "10368", "10683"], { noms: ["a)", "b)", "c)"] })),
          micros: ["entier_defi", "entier_comparer"],
        },
        {
          enonce: "Voici une droite graduée.\na) Combien vaut une graduation ?\nb) Lis les nombres des points A, B, C et D.\nc) Le nombre $21\\,000$ n'est pas sur une graduation. Entre quelles graduations se trouve-t-il ?",
          figure: droiteRel(0, 40000, 2000, [
            { value: 6000, label: "A" },
            { value: 14000, label: "B" },
            { value: 28000, label: "C" },
            { value: 36000, label: "D" },
          ], { nombres: 10000 }),
          correction:
            "a) Entre $0$ et $10\\,000$, je compte $5$ intervalles.\nUne graduation vaut $10\\,000 \\div 5 = 2\\,000$.\nb) Je compte de $2\\,000$ en $2\\,000$, depuis le nombre écrit juste avant.\nA : $3$ graduations après $0$, donc $6\\,000$.\nB : $2$ graduations après $10\\,000$, donc $14\\,000$.\nC : $4$ graduations après $20\\,000$, donc $28\\,000$.\nD : $3$ graduations après $30\\,000$, donc $36\\,000$.\nc) $20\\,000 < 21\\,000 < 22\\,000$. Il est pile au milieu.\n⛔ Le piège : prendre une graduation pour $1\\,000$. Je cherche toujours d'abord sa valeur.\nRéponse : A $6\\,000$ ; B $14\\,000$ ; C $28\\,000$ ; D $36\\,000$.",
          micros: ["entier_lire_ecrire", "entier_encadrer"],
        },
        {
          enonce:
            "Vrai ou faux ? Justifie.\na) Un nombre de $5$ chiffres est toujours plus grand qu'un nombre de $4$ chiffres.\nb) Dans $60\\,500$, le chiffre des centaines est $5$.\nc) $3$ dizaines de mille, c'est $300$ centaines.\nd) Le nombre de dizaines de $4\\,580$ est $8$.",
          correction:
            "a) Vrai. Le plus petit nombre de $5$ chiffres est $10\\,000$.\nLe plus grand de $4$ chiffres est $9\\,999$. Et $9\\,999 < 10\\,000$.\nb) Vrai. De droite à gauche : $0$ unité, $0$ dizaine, $5$ centaines.\nc) Vrai. $3$ dizaines de mille valent $30\\,000$. Et $300 \\times 100 = 30\\,000$.\nd) Faux. $8$ est le chiffre des dizaines.\nLe nombre de dizaines se lit jusqu'à sa colonne : $458$.\n⛔ Le piège du d) : confondre encore « chiffre des » et « nombre de ».\nRéponse : a) vrai ; b) vrai ; c) vrai ; d) faux.",
          schema: ecranSeulement(numeration(["60500", "4580"], { surligne: 1 })),
          micros: ["entier_comparer", "entier_rang", "entier_defi"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions qui s'enchaînent. Je range les chiffres, puis je réponds par une phrase.",
      rappel: [
        "Je lis tout l'énoncé. Puis je traduis chaque phrase : un rang, une comparaison, un encadrement.",
        "Je vérifie ma réponse avec chaque indice.",
      ],
      exercices: [
        {
          titre: "Le chèque",
          enonce:
            "La famille Martin achète une voiture d'occasion à $12\\,480$ €.\nElle paie par chèque. Sur un chèque, on écrit le prix en chiffres et en lettres.\na) Écris le prix en lettres.\nb) Deux autres voitures coûtaient $12\\,408$ € et $12\\,840$ €. Range les trois prix dans l'ordre croissant.\nc) La famille ne voulait pas dépasser $12\\,500$ €. Quelles voitures pouvait-elle acheter ?\nd) De quel millier le prix de sa voiture est-il le plus proche ?",
          correction:
            "a) $12\\,480$ : « douze » mille, puis « quatre cent quatre-vingts ».\nLe prix s'écrit : douze mille quatre cent quatre-vingts euros.\n⚠️ Quatre-vingts prend un s : il est multiplié et il finit le nombre.\nb) Les trois prix commencent par $12$. Je compare les centaines : $4$, $4$ et $8$.\nPuis, entre $12\\,480$ et $12\\,408$, les dizaines : $8 > 0$.\n$12\\,408 < 12\\,480 < 12\\,840$.\nc) Il faut un prix plus petit que $12\\,500$ : $12\\,408$ € et $12\\,480$ €.\nLa voiture à $12\\,840$ € est trop chère.\nd) $12\\,480$ est entre $12\\,000$ et $13\\,000$.\nLe milieu est $12\\,500$. $12\\,480$ est juste avant : il est plus proche de $12\\,000$.\n⛔ Le piège du d) : répondre $13\\,000$ parce que $480$, « c'est beaucoup ».\nRéponse : a) douze mille quatre cent quatre-vingts euros ; b) $12\\,408 < 12\\,480 < 12\\,840$ ; c) celles à $12\\,408$ € et à $12\\,480$ € ; d) $12\\,000$.",
          schema: droiteRel(12000, 13000, 100, [
            { value: 12408, label: "12 408" },
            { value: 12480, label: "12 480", color: VERT },
            { value: 12840, label: "12 840", color: ROUGE },
          ], { nombres: 500 }),
          micros: ["entier_lire_ecrire", "entier_comparer", "entier_encadrer"],
        },
        {
          titre: "Le nombre mystère",
          enonce:
            "Je suis un nombre entier de cinq chiffres.\nIndice 1 : je suis entre $45\\,000$ et $46\\,000$.\nIndice 2 : mon chiffre des centaines est le double de mon chiffre des dizaines de mille.\nIndice 3 : mon chiffre des unités est $1$ de moins que mon chiffre des centaines.\nIndice 4 : la somme de mes cinq chiffres est $25$.\na) Que t'apprend l'indice 1 ?\nb) Trouve mes autres chiffres, un par un.\nc) Qui suis-je ? Écris-moi en chiffres, puis en lettres.",
          correction:
            "a) Entre $45\\,000$ et $46\\,000$ : je commence par $45$.\nMon chiffre des dizaines de mille est $4$. Mon chiffre des milliers est $5$.\nb) Indice 2 : le double de $4$ est $8$. Mon chiffre des centaines est $8$.\nIndice 3 : $1$ de moins que $8$, c'est $7$. Mon chiffre des unités est $7$.\nIndice 4 : $4 + 5 + 8 + 7 = 24$. Il manque $1$ pour faire $25$.\nMon chiffre des dizaines est $1$.\nc) Je suis $45\\,817$ : quarante-cinq mille huit cent dix-sept.\n⭐ Contrôle : $4 + 5 + 8 + 1 + 7 = 25$.\n⛔ Le piège : écrire les chiffres dans l'ordre où on les trouve. Chacun va dans SA colonne.",
          schema: numeration(["45817"]),
          micros: ["entier_defi", "entier_rang", "entier_lire_ecrire"],
        },
        {
          titre: "Le comptage des oiseaux",
          enonce:
            "Un week-end, des bénévoles comptent les oiseaux d'une réserve naturelle.\nÉtourneaux : $125\\,400$ ; mouettes : $12\\,540$ ; grues : $1\\,254$.\na) Écris le nombre de mouettes en lettres.\nb) Range les trois espèces, de la plus nombreuse à la moins nombreuse.\nc) Encadre le nombre d'étourneaux entre deux dizaines de mille qui se suivent.\nd) Combien y a-t-il de centaines dans $125\\,400$ ? Compare avec le nombre de grues.",
          correction:
            "a) $12\\,540$ : « douze » mille, puis « cinq cent quarante ».\nOn écrit : douze mille cinq cent quarante.\nb) $125\\,400$ a $6$ chiffres, $12\\,540$ en a $5$, et $1\\,254$ en a $4$.\n$125\\,400 > 12\\,540 > 1\\,254$ : les étourneaux, les mouettes, puis les grues.\nc) $120\\,000 < 125\\,400 < 130\\,000$.\nd) Je lis jusqu'à la colonne des centaines : $1\\,254$ centaines.\nC'est le nombre de grues ! Il y a $100$ fois plus d'étourneaux que de grues.\n⭐ Dans le tableau, les chiffres $1$, $2$, $5$, $4$ glissent d'un rang à chaque ligne.\n⛔ Le piège du c) : encadrer entre $125\\,000$ et $126\\,000$. Ce sont des milliers.",
          schema: numeration(["125400", "12540", "1254"], { noms: ["étourneaux", "mouettes", "grues"] }),
          micros: ["entier_comparer", "entier_encadrer", "entier_rang", "entier_lire_ecrire"],
        },
        {
          titre: "Le compteur de la voiture",
          enonce:
            "Le compteur d'une voiture affiche $28\\,997$ km.\na) Écris les cinq nombres qu'il va afficher ensuite, kilomètre après kilomètre.\nb) Quand il passe de $28\\,999$ à $29\\,000$, combien de chiffres changent ?\nc) Encadre $28\\,997$ entre deux milliers qui se suivent. Duquel est-il le plus proche ?\nd) Quel est le prochain nombre affiché qui a cinq chiffres identiques ?",
          correction:
            "a) J'ajoute $1$ à chaque fois : $28\\,998$, $28\\,999$, $29\\,000$, $29\\,001$, $29\\,002$.\nb) Les unités, les dizaines et les centaines passent de $9$ à $0$.\nLes milliers passent de $8$ à $9$. Quatre chiffres changent.\nc) $28\\,000 < 28\\,997 < 29\\,000$. Il est à $3$ km de $29\\,000$ : il en est le plus proche.\nd) Les nombres à cinq chiffres identiques : $11\\,111$, $22\\,222$, $33\\,333$…\nLe premier après $28\\,997$ est $33\\,333$.\n⛔ Le piège du d) : répondre $22\\,222$. Le compteur l'a déjà dépassé.\nRéponse : a) de $28\\,998$ à $29\\,002$ ; b) quatre ; c) $29\\,000$ ; d) $33\\,333$.",
          schema: droiteRel(28995, 29005, 1, [
            { value: 28997, label: "départ", color: NOIR },
            { value: 29002, label: "après", color: VERT },
          ], { nombres: 5, sauts: [{ de: 28997, vers: 29002, label: "+5 km" }] }),
          micros: ["entier_defi", "entier_encadrer", "entier_rang"],
        },
      ],
    },
  ],
};
