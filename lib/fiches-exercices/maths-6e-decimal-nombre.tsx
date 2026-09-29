// ─── Fiche d'exercices : les nombres décimaux (6e) — 20 exercices corrigés ────
//
// Lot de 6e (30/09/2026), sur la forme de l'étalon de 5e
// `maths-5e-relatif-nombre.tsx` : aides de dessin locales, écrites EN CLAIR,
// relues par le script de recalcul.
//
// Alignée sur la fiche de cours `lib/fiches/maths-6e-decimaux.tsx` (même
// vocabulaire : partie entière, partie décimale, rangs, « j'ajoute des zéros »)
// et sur la banque `lib/tutor-v4/questionBank/6e/maths/decimaux.bank.ts`
// (notionId decimal_nombre) : lire et écrire, le rang d'un chiffre, comparer
// et ranger, arrondir (unité, dixième, centième, et π au centième, nommé par le
// BO), encadrer et intercaler, défis.
// ⛔ LIMITES DE LA 6e : aucun calcul ici (c'est la notion decimal_calcul) ;
// aucun nombre négatif ; trois chiffres après la virgule au plus.
// ⛔ Aucun exemple de la fiche de cours n'est repris (3,45 ; 12,764 ; 2,5 contre
// 2,45 ; 25/10 ; 7/10 ; 0,305 contre 0,35 ; 8,306 ; 0,5 = 0,50 ; 3,4 et 3,5 ;
// la grille de 45 carreaux), ni de la banque (5,83 ; 0,7 contre 0,65 ; 12,7 ;
// 4,382 ; 9,146 ; 3,96 ; 12,78 ; 7,38 ; 4,7 et 4,8 ; 2,5 et 2,6 ; 5,206 ; 3,9
// contre 3,10).
//
// Les pièges nommés : oublier le zéro qui garde un rang (1, 9, 18), 7 centièmes
// écrits 0,7 (2), lire les rangs depuis le début du nombre (3), « 79 > 8 donc
// 5,79 > 5,8 » (4, 8, 10, 16, 17), arrondir deux fois de suite (5), un
// encadrement au dixième quand on demande l'unité (6), une grille qui vaudrait
// 62 (7), le chiffre des dixièmes pris pour le nombre de dixièmes (9), 12,10
// après 12,9 (11, 15), « rien entre 1,3 et 1,4 » (12), le plus court cru le plus
// petit (13), la partie décimale lue « 35 » (14), un arrondi qui fait descendre
// (20), un candidat dont l'arrondi n'est pas le bon (19).
//
// Faits réels : π = 3,14159… (son écriture ne s'arrête pas). Tout le reste
// (lancers de poids, prix du gazole, compteur de vélo, 100 m, fruits, pluie)
// est un MODÈLE.
//
// ⭐ CONSIGNE DE FRÉDÉRIC (30/09) : des 6e qui ont parfois du mal à LIRE. Des
// phrases de 12 mots en moyenne, 20 au plus, une idée par phrase. Le script
// compte les mots de chaque phrase.
//
// ⭐ LES DESSINS :
//   · `numeration` — le TABLEAU DE NUMÉRATION prolongé après la virgule (comme
//     la fiche de cours), un chiffre par case, la virgule orange après les
//     unités, une colonne surlignée. Colonnes courtes (D, U, d, c, m) et leur
//     nom en légende : six colonnes au plus, rien ne défile à 375 px ;
//   · `demiDroite` — la demi-droite graduée (feuille de 6e voisine), pour
//     voir qu'un décimal est COINCÉ entre deux voisins : arrondir, encadrer ;
//   · `grille` — la grille de cent carreaux : un carreau = un centième, une
//     colonne = un dixième ;
//   · `tableau` de figures.tsx (vertical sur téléphone).
// SVG de viewBox 300, police 14, sans `min-w`. 13 dessins imprimés ; ceux qui
// redisent le corrigé sont `ecranSeulement` (PDF ≤ 12 pages).
//
// Les corrigés sont écrits à la première personne (« je compare… »).
//
// ⭐ Recalcul indépendant : `scripts/verifier-exercices-6e-decimal-nombre.mjs`.
//
// Micro-compétences : decimal_lire_ecrire (1, 2, 7, 9, 14), decimal_rang (3, 7,
// 9, 14, 18), decimal_comparer (4, 8, 10, 13, 16, 17, 18, 20), decimal_arrondir
// (5, 11, 13, 15, 17, 18, 19, 20), decimal_encadrer (6, 12, 15, 17, 20),
// decimal_defi (12, 16, 19). 6/6.

import type { ReactNode } from "react";
import type { FicheExercicesData } from "@/lib/fiches-exercices/types";
import { BLEU, tableau } from "@/lib/fiches-exercices/figures";

const ROUGE = "#dc2626";
const VERT = "#16a34a";
const NOIR = "#0f172a";

type Point = { value: number; label: string; color?: string };

/** 4,5 ; 12,05 : un nombre écrit comme au tableau (texte NU). */
const ecrit = (v: number) => {
  const [e, d] = String(v).split(".");
  return (v >= 10000 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : e) + (d ? "," + d : "");
};

/** Sur l'écran seulement : le dessin qui redit le corrigé ne s'imprime pas (PDF ≤ 12 pages). */
const ecranSeulement = (dessin: ReactNode) => <div className="print:hidden">{dessin}</div>;

/**
 * LE TABLEAU DE NUMÉRATION, prolongé après la virgule. Une colonne par rang
 * (C, D, U, d, c, m), un chiffre par case ("" pour rien), la virgule orange
 * après les unités quand la ligne a une partie décimale. `nom` : le nombre ou
 * l'objet de la ligne, dans une première colonne. `surligne` : le rang
 * regardé, en jaune.
 * ⭐ Le script relit chaque ligne chiffre par chiffre : quand `nom` est un
 * nombre, les chiffres doivent l'écrire.
 * ⛔ Six colonnes de rangs au plus : le tableau de conversion de 5e en a
 * mesuré le seuil à 375 px.
 */
const NOMS_RANGS: Record<string, string> = { C: "centaines", D: "dizaines", U: "unités", d: "dixièmes", c: "centièmes", m: "millièmes" };
type LigneNumeration = { chiffres: string[]; nom?: string };
const numeration = (colonnes: string[], lignes: LigneNumeration[], surligne?: string) => {
  const avecNom = lignes.some((l) => l.nom);
  const u = colonnes.indexOf("U");
  return (
    <div className="mx-auto w-full max-w-[20rem]">
      <table className="mx-auto border-collapse text-sm">
        <thead>
          <tr>
            {avecNom ? <th className="border border-slate-400 bg-slate-100 px-1.5 py-1" /> : null}
            {colonnes.map((c) => (
              <th key={c} className={`border border-slate-400 px-2 py-1 font-semibold text-slate-800 ${c === surligne ? "bg-yellow-200" : "bg-slate-100"}`}>
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
                {avecNom ? <td className="border border-slate-400 px-1.5 py-1 text-center font-semibold text-slate-700">{li.nom ?? ""}</td> : null}
                {li.chiffres.map((x, j) => (
                  <td key={j} className={`border border-slate-400 px-2 py-1 text-center font-mono text-slate-900 ${colonnes[j] === surligne ? "bg-yellow-100" : ""}`}>
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
 * UNE DEMI-DROITE GRADUÉE (celle de la feuille de 6e de la demi-droite) : un
 * morceau qui commence après 0 garde un pointillé à gauche. Points nommés sous
 * les nombres ; ils descendent d'une rangée quand ils se touchent.
 * ⛔ Onze nombres écrits au plus.
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
 * LA GRILLE DE CENT CARREAUX : l'unité coupée en 100. Les `n` premiers
 * carreaux sont coloriés COLONNE PAR COLONNE : une colonne pleine = un
 * dixième, un carreau = un centième. Aucun texte dans le dessin.
 */
const grille = (n: number) => (
  <div className="mx-auto w-full max-w-[14rem] print:max-w-[10rem]">
    <svg viewBox="0 0 300 232" className="block h-auto w-full" role="img" aria-label={`Une unité coupée en 100 carreaux, ${n} coloriés`}>
      {Array.from({ length: 100 }, (_, i) => {
        const [col, lig] = [Math.floor(i / 10), i % 10];
        return <rect key={i} x={40 + col * 22} y={6 + lig * 22} width={22} height={22} fill={i < n ? BLEU : "#f1f5f9"} stroke="#475569" strokeWidth={0.8} />;
      })}
      <rect x={40} y={6} width={220} height={220} fill="none" stroke={NOIR} strokeWidth={2} />
    </svg>
  </div>
);

export const exercicesDecimalNombre6e: FicheExercicesData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "decimal-nombre",
  titre: "Les nombres décimaux",
  accroche:
    "Vingt exercices, du geste seul au problème : lire et écrire un nombre décimal, trouver le rang d'un chiffre, comparer et ranger, arrondir, encadrer et intercaler. Un lancer de poids, le prix du gazole, un compteur de vélo, une course de 100 m, des fruits sur la balance, la pluie de la semaine. Un rappel de cours avant chaque niveau. Cherche d'abord au brouillon, puis ouvre la correction : étape par étape, avec le piège nommé et le tableau de numération dessiné.",

  fichesCours: [{ href: "/fiches-cours/maths/6e/decimal-nombre", titre: "Les nombres décimaux" }],
  coachHref: "/coach-ia/maths?classe=6e",

  series: [
    /* ───────────────────────── ★ Un seul geste ───────────────────────── */
    {
      niveau: 1,
      titre: "Un seul geste",
      consigne: "Une question, un geste. Je regarde le rang de chaque chiffre.",
      rappel: [
        "La virgule sépare la partie entière et la partie décimale.",
        "Après la virgule : les dixièmes, puis les centièmes, puis les millièmes.",
        "Pour comparer : d'abord les parties entières, puis rang par rang.",
        "Arrondir à l'unité : je prends l'entier le plus proche. Je regarde le chiffre des dixièmes.",
      ],
      exercices: [
        {
          enonce: "Écris chaque nombre en chiffres.\na) Trois unités et sept dixièmes.\nb) Douze unités et quatre centièmes.\nc) Deux cent six millièmes.\nd) Quarante unités et cinq dixièmes.",
          correction:
            "Je place chaque chiffre à son rang.\na) $3$ unités et $7$ dixièmes : $3{,}7$.\nb) $12$ unités. Les centièmes sont au 2e rang après la virgule.\nIl n'y a pas de dixièmes : j'écris $0$. Cela donne $12{,}04$.\nc) $206$ millièmes : le $6$ va au rang des millièmes. Cela donne $0{,}206$.\nd) $40$ unités et $5$ dixièmes : $40{,}5$.\n⛔ Le piège du b) : écrire $12{,}4$. Ce serait $4$ DIXIÈMES. Le zéro garde la place des dixièmes.\nRéponse : a) $3{,}7$ ; b) $12{,}04$ ; c) $0{,}206$ ; d) $40{,}5$.",
          schema: numeration(["D", "U", "d", "c", "m"], [
            { chiffres: ["", "3", "7", "", ""], nom: "3,7" },
            { chiffres: ["1", "2", "0", "4", ""], nom: "12,04" },
            { chiffres: ["", "0", "2", "0", "6"], nom: "0,206" },
            { chiffres: ["4", "0", "5", "", ""], nom: "40,5" },
          ]),
          micros: ["decimal_lire_ecrire"],
        },
        {
          enonce: "Écris chaque fraction avec un nombre décimal.\na) $\\dfrac{43}{10}$\nb) $\\dfrac{7}{100}$\nc) $\\dfrac{1\\,250}{100}$\nd) $\\dfrac{38}{1\\,000}$",
          correction:
            "Le dénominateur dit le rang du dernier chiffre.\na) $43$ dixièmes. $40$ dixièmes font $4$ unités. Il reste $3$ dixièmes : $4{,}3$.\nb) $7$ centièmes : le $7$ va au 2e rang après la virgule. Cela donne $0{,}07$.\nc) $1\\,250$ centièmes. $1\\,200$ centièmes font $12$ unités.\nIl reste $50$ centièmes, soit $5$ dixièmes : $12{,}5$.\nd) $38$ millièmes : le $8$ va au 3e rang après la virgule. Cela donne $0{,}038$.\n⛔ Le piège du b) : écrire $0{,}7$. Ce serait $7$ dixièmes, dix fois plus.\nRéponse : a) $4{,}3$ ; b) $0{,}07$ ; c) $12{,}5$ ; d) $0{,}038$.",
          schema: ecranSeulement(
            numeration(["D", "U", "d", "c", "m"], [
              { chiffres: ["", "4", "3", "", ""], nom: "4,3" },
              { chiffres: ["", "0", "0", "7", ""], nom: "0,07" },
              { chiffres: ["1", "2", "5", "0", ""], nom: "12,5" },
              { chiffres: ["", "0", "0", "3", "8"], nom: "0,038" },
            ]),
          ),
          micros: ["decimal_lire_ecrire"],
        },
        {
          enonce: "Voici le nombre $48{,}375$.\na) Quel est son chiffre des dixièmes ?\nb) Son chiffre des centièmes ?\nc) Son chiffre des millièmes ?\nd) Son chiffre des dizaines ?",
          correction:
            "Je compte les rangs à partir de la virgule.\na) Le 1er chiffre après la virgule est celui des dixièmes : $3$.\nb) Le 2e chiffre après la virgule est celui des centièmes : $7$.\nc) Le 3e est celui des millièmes : $5$.\nd) Avant la virgule, je lis de droite à gauche : $8$ unités, $4$ dizaines.\n⛔ Le piège : compter les rangs depuis le début du nombre. Après la virgule, je pars toujours de la virgule.\nRéponse : a) $3$ ; b) $7$ ; c) $5$ ; d) $4$.",
          schema: numeration(["D", "U", "d", "c", "m"], [{ chiffres: ["4", "8", "3", "7", "5"], nom: "48,375" }], "d"),
          micros: ["decimal_rang"],
        },
        {
          enonce: "Complète par $<$, $>$ ou $=$.\na) $5{,}8$ … $5{,}79$\nb) $0{,}6$ … $0{,}06$\nc) $9{,}85$ … $12{,}3$\nd) $3{,}40$ … $3{,}4$",
          correction:
            "Je compare d'abord les parties entières. Si elles sont égales, je compare rang par rang.\na) Même partie entière, $5$. Dixièmes : $8$ contre $7$. Donc $5{,}8 > 5{,}79$.\nb) Même partie entière, $0$. Dixièmes : $6$ contre $0$. Donc $0{,}6 > 0{,}06$.\nc) Parties entières : $9$ contre $12$. Donc $9{,}85 < 12{,}3$.\nd) Le zéro de droite ne change rien. $3{,}40 = 3{,}4$.\n⛔ Le piège du a) : croire que $5{,}79$ gagne, car $79 > 8$. J'écris $5{,}80$ : $80$ centièmes battent $79$ centièmes.\nRéponse : a) $>$ ; b) $>$ ; c) $<$ ; d) $=$.",
          schema: ecranSeulement(
            numeration(["U", "d", "c"], [
              { chiffres: ["5", "8", "0"], nom: "5,80" },
              { chiffres: ["5", "7", "9"], nom: "5,79" },
            ], "d"),
          ),
          micros: ["decimal_comparer"],
        },
        {
          enonce: "Donne l'arrondi à l'unité de chaque nombre.\na) $7{,}6$\nb) $13{,}28$\nc) $9{,}5$\nd) $4{,}49$",
          correction:
            "Arrondir à l'unité, c'est prendre l'entier le plus proche. Je regarde le chiffre des dixièmes.\nDe $0$ à $4$, je garde l'entier. De $5$ à $9$, je passe à l'entier suivant.\na) $7{,}6$ : $6$ dixièmes. J'arrondis à $8$.\nb) $13{,}28$ : $2$ dixièmes. J'arrondis à $13$.\nc) $9{,}5$ : $5$ dixièmes. J'arrondis à $10$.\nd) $4{,}49$ : $4$ dixièmes. J'arrondis à $4$.\n⛔ Le piège du d) : arrondir $4{,}49$ à $4{,}5$, puis à $5$. Je regarde UN seul chiffre : celui des dixièmes.\nRéponse : a) $8$ ; b) $13$ ; c) $10$ ; d) $4$.",
          schema: demiDroite(13, 14, 0.1, [{ value: 13.28, label: "13,28" }], { nombres: 0.5 }),
          micros: ["decimal_arrondir"],
        },
        {
          enonce: "Encadre chaque nombre entre deux entiers qui se suivent.\na) $6{,}3$\nb) $0{,}85$\nc) $19{,}02$\nd) Encadre $4{,}57$ entre deux nombres à un chiffre après la virgule.",
          correction:
            "Encadrer à l'unité : l'entier juste avant, et l'entier juste après.\na) $6 < 6{,}3 < 7$.\nb) $0 < 0{,}85 < 1$.\nc) $19 < 19{,}02 < 20$.\nd) Je cherche les dixièmes juste avant et juste après : $4{,}5 < 4{,}57 < 4{,}6$.\n⛔ Le piège du c) : écrire $19 < 19{,}02 < 19{,}1$. On demande deux ENTIERS : $19$ et $20$.\nRéponse : a) $6$ et $7$ ; b) $0$ et $1$ ; c) $19$ et $20$ ; d) $4{,}5$ et $4{,}6$.",
          schema: ecranSeulement(demiDroite(4.5, 4.6, 0.01, [{ value: 4.57, label: "4,57" }], { nombres: 0.05 })),
          micros: ["decimal_encadrer"],
        },
        {
          enonce: "Le grand carré est une unité. Il est coupé en $100$ petits carreaux.\na) Quelle fraction de l'unité est coloriée ?\nb) Écris ce nombre en décimal.\nc) Combien de colonnes pleines vois-tu ? Que vaut une colonne ?",
          figure: grille(62),
          correction:
            "a) $62$ carreaux sur $100$ sont coloriés : $\\dfrac{62}{100}$.\nb) $62$ centièmes s'écrivent $0{,}62$.\nc) Je vois $6$ colonnes pleines. Une colonne fait $10$ carreaux : c'est un dixième.\nDonc $0{,}62$, c'est $6$ dixièmes et $2$ centièmes.\n⛔ Le piège : écrire $62$ ou $6{,}2$. Le carré entier vaut $1$. La partie coloriée est plus petite que $1$.\nRéponse : a) $\\dfrac{62}{100}$ ; b) $0{,}62$ ; c) $6$ colonnes, une colonne vaut un dixième.",
          micros: ["decimal_lire_ecrire", "decimal_rang"],
        },
        {
          enonce: "Range ces nombres dans l'ordre croissant.\n$2{,}1$ ; $2{,}09$ ; $2{,}19$ ; $2{,}901$ ; $2{,}9$",
          correction:
            "Ils ont tous la même partie entière : $2$.\nJ'écris tout avec trois chiffres après la virgule : $2{,}100$ ; $2{,}090$ ; $2{,}190$ ; $2{,}901$ ; $2{,}900$.\nJe compare les millièmes : $90 < 100 < 190 < 900 < 901$.\n⛔ Le piège : croire que $2{,}09$ bat $2{,}1$, car $9 > 1$. En millièmes, c'est $90$ contre $100$.\nRéponse : $2{,}09 < 2{,}1 < 2{,}19 < 2{,}9 < 2{,}901$.",
          schema: numeration(["U", "d", "c", "m"], [
            { chiffres: ["2", "0", "9", "0"], nom: "2,09" },
            { chiffres: ["2", "1", "0", "0"], nom: "2,1" },
            { chiffres: ["2", "1", "9", "0"], nom: "2,19" },
            { chiffres: ["2", "9", "0", "0"], nom: "2,9" },
            { chiffres: ["2", "9", "0", "1"], nom: "2,901" },
          ]),
          micros: ["decimal_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★ Type devoir ───────────────────────── */
    {
      niveau: 2,
      titre: "Type devoir",
      consigne: "Plusieurs questions sur un même nombre. J'écris tous les nombres avec autant de chiffres après la virgule.",
      rappel: [
        "Un nombre a plusieurs écritures : $3{,}25 = \\dfrac{325}{100}$, et $3{,}25 = 3 + \\dfrac{2}{10} + \\dfrac{5}{100}$.",
        "Arrondir au dixième : je regarde les centièmes. Arrondir au centième : je regarde les millièmes.",
        "Entre deux décimaux, il y a toujours d'autres décimaux. J'ajoute un zéro pour les voir.",
      ],
      exercices: [
        {
          enonce: "a) Décompose $30{,}48$ : dizaines, unités, dixièmes, centièmes.\nb) Écris en chiffres : $6 + \\dfrac{5}{10} + \\dfrac{9}{1\\,000}$.\nc) Combien y a-t-il de dixièmes en tout dans $30{,}48$ ?",
          correction:
            "a) $30{,}48$ : $3$ dizaines, $0$ unité, $4$ dixièmes, $8$ centièmes.\nDonc $30{,}48 = 30 + \\dfrac{4}{10} + \\dfrac{8}{100}$.\nb) $6$ unités, $5$ dixièmes, $0$ centième, $9$ millièmes : $6{,}509$.\nc) Je lis le nombre jusqu'au rang des dixièmes : $304$. Il y a $304$ dixièmes en tout.\n⛔ Le piège du b) : écrire $6{,}59$. Il n'y a pas de centièmes : le zéro garde leur place.\n⛔ Le piège du c) : répondre $4$. $4$ est le CHIFFRE des dixièmes. Le NOMBRE de dixièmes compte aussi les unités et les dizaines.\nRéponse : a) $3$ dizaines, $0$ unité, $4$ dixièmes, $8$ centièmes ; b) $6{,}509$ ; c) $304$ dixièmes.",
          schema: numeration(["D", "U", "d", "c", "m"], [
            { chiffres: ["3", "0", "4", "8", ""], nom: "30,48" },
            { chiffres: ["", "6", "5", "0", "9"], nom: "6,509" },
          ], "d"),
          micros: ["decimal_rang", "decimal_lire_ecrire"],
        },
        {
          enonce: "Quatre élèves lancent le poids. Aya : $7{,}85$ m. Bilal : $7{,}9$ m. Chris : $7{,}58$ m. Dina : $7{,}8$ m.\na) Qui a lancé le plus loin ?\nb) Range les lancers, du plus long au plus court.\nc) Qui monte sur le podium ?",
          correction:
            "Toutes les longueurs ont $7$ unités. Je compare les dixièmes, puis les centièmes.\nJ'écris tout avec deux chiffres après la virgule : $7{,}85$ ; $7{,}90$ ; $7{,}58$ ; $7{,}80$.\na) Le plus grand est $7{,}90$ : c'est Bilal.\nb) $7{,}9 > 7{,}85 > 7{,}8 > 7{,}58$.\nc) Les trois premiers : Bilal, Aya et Dina.\n⛔ Le piège : croire que $7{,}85$ bat $7{,}9$, car $85 > 9$. En centièmes, c'est $85$ contre $90$.\nRéponse : a) Bilal ; b) Bilal, Aya, Dina, Chris ; c) Bilal, Aya et Dina.",
          schema: demiDroite(7.5, 8, 0.05, [
            { value: 7.58, label: "Chris" },
            { value: 7.8, label: "Dina" },
            { value: 7.85, label: "Aya" },
            { value: 7.9, label: "Bilal", color: VERT },
          ], { nombres: 0.1 }),
          micros: ["decimal_comparer"],
        },
        {
          enonce: "Le nombre π s'écrit $3{,}14159\\ldots$ Son écriture ne s'arrête jamais.\na) Donne son arrondi à l'unité.\nb) Son arrondi au dixième.\nc) Son arrondi au centième.\nd) Arrondis $12{,}96$ au dixième.",
          correction:
            "Pour arrondir, je regarde le chiffre juste après le rang demandé.\na) À l'unité : je regarde les dixièmes, $1$. Je garde $3$.\nb) Au dixième : je regarde les centièmes, $4$. Je garde $3{,}1$.\nc) Au centième : je regarde les millièmes, $1$. Je garde $3{,}14$.\nd) Je regarde les centièmes, $6$. Je monte au dixième suivant.\nAprès $12{,}9$ vient $13{,}0$. L'arrondi est $13{,}0$, soit $13$.\n⛔ Le piège du d) : écrire $12{,}10$. Dix dixièmes font une unité : je passe à $13$.\nRéponse : a) $3$ ; b) $3{,}1$ ; c) $3{,}14$ ; d) $13{,}0$.",
          schema: ecranSeulement(demiDroite(12.9, 13, 0.01, [{ value: 12.96, label: "12,96" }], { nombres: 0.05 })),
          micros: ["decimal_arrondir"],
        },
        {
          enonce: "a) Écris trois nombres décimaux compris entre $1{,}3$ et $1{,}4$.\nb) Écris un nombre compris entre $5$ et $5{,}1$.\nc) Écris un nombre compris entre $0{,}99$ et $1$.\nd) Léa dit : « Entre $1{,}3$ et $1{,}4$, il n'y a aucun nombre. » A-t-elle raison ?",
          correction:
            "a) J'ajoute un zéro : $1{,}30$ et $1{,}40$. Entre les deux : $1{,}32$ ; $1{,}35$ ; $1{,}38$, par exemple.\nb) $5 = 5{,}00$ et $5{,}1 = 5{,}10$. Par exemple : $5{,}05$.\nc) $0{,}99 = 0{,}990$ et $1 = 1{,}000$. Par exemple : $0{,}995$.\nd) Non. Il y a $1{,}31$, $1{,}32$, et bien d'autres. On peut toujours ajouter un rang.\n⛔ Le piège : chercher avec un seul chiffre après la virgule. Avec deux ou trois chiffres, il y a de la place.\nRéponse : a) par exemple $1{,}32$ ; $1{,}35$ ; $1{,}38$ ; b) $5{,}05$ ; c) $0{,}995$ ; d) non.",
          schema: demiDroite(1.3, 1.4, 0.01, [
            { value: 1.32, label: "1,32" },
            { value: 1.35, label: "1,35" },
            { value: 1.38, label: "1,38" },
          ], { nombres: 0.05 }),
          micros: ["decimal_encadrer", "decimal_defi"],
        },
        {
          enonce: "Trois stations affichent le prix d'un litre de gazole. Station A : $1{,}859$ €. Station B : $1{,}86$ €. Station C : $1{,}849$ €. Ce sont des prix d'exemple.\na) Quelle station est la moins chère ?\nb) Range les prix, du plus petit au plus grand.\nc) Arrondis le prix de la station A au centième. Que remarques-tu ?",
          correction:
            "J'écris les trois prix avec trois chiffres après la virgule : $1{,}859$ ; $1{,}860$ ; $1{,}849$.\na) Les dixièmes sont égaux. Je compare les centièmes : $5$, $6$ et $4$. La moins chère est la station C.\nb) $1{,}849 < 1{,}859 < 1{,}86$.\nc) Au centième : je regarde les millièmes, $9$. Je monte : $1{,}86$ €.\nL'arrondi de A est égal au prix de B. Pourtant, A est un peu moins chère.\n⛔ Le piège : croire que $1{,}86$ est plus petit que $1{,}859$, car il a moins de chiffres.\nRéponse : a) la station C ; b) C, A, B ; c) $1{,}86$ €.",
          schema: numeration(["U", "d", "c", "m"], [
            { chiffres: ["1", "8", "4", "9"], nom: "C" },
            { chiffres: ["1", "8", "5", "9"], nom: "A" },
            { chiffres: ["1", "8", "6", "0"], nom: "B" },
          ], "c"),
          micros: ["decimal_comparer", "decimal_arrondir"],
        },
        {
          enonce: "Le compteur d'un vélo affiche $17{,}35$ km.\na) Quelle est la partie entière ? La partie décimale ?\nb) Quel est le chiffre des dixièmes ? Celui des centièmes ?\nc) Écris ce nombre avec une fraction de dénominateur $100$.\nd) Décompose-le : unités, dixièmes, centièmes.",
          correction:
            "a) La partie entière est $17$. La partie décimale vaut $35$ centièmes, soit $0{,}35$.\nb) Le chiffre des dixièmes est $3$. Celui des centièmes est $5$.\nc) $17{,}35$, c'est $1\\,735$ centièmes : $\\dfrac{1\\,735}{100}$.\nd) $17{,}35 = 17 + \\dfrac{3}{10} + \\dfrac{5}{100}$.\n⛔ Le piège du a) : dire que la partie décimale est $35$. Ce sont $35$ CENTIÈMES : $0{,}35$.\n⭐ Sur la demi-droite, $17{,}35$ est entre $17$ et $18$ : sa partie entière est $17$.\nRéponse : a) $17$ et $0{,}35$ ; b) $3$ et $5$ ; c) $\\dfrac{1\\,735}{100}$ ; d) $17 + \\dfrac{3}{10} + \\dfrac{5}{100}$.",
          schema: ecranSeulement(demiDroite(17, 18, 0.05, [{ value: 17.35, label: "17,35 km" }], { nombres: 0.5 })),
          micros: ["decimal_lire_ecrire", "decimal_rang"],
        },
        {
          enonce: "a) Encadre $8{,}63$ au dixième : entre deux nombres à un chiffre après la virgule.\nb) Duquel des deux est-il le plus proche ? Donne son arrondi au dixième.\nc) Même travail pour $0{,}952$ : encadre-le au dixième, puis arrondis-le au dixième.",
          correction:
            "a) $8{,}63$ est entre $8{,}6$ et $8{,}7$ : $8{,}6 < 8{,}63 < 8{,}7$.\nb) Le milieu est $8{,}65$. $8{,}63$ est avant le milieu : il est plus près de $8{,}6$.\nSon arrondi au dixième est $8{,}6$.\nc) $0{,}952$ est entre $0{,}9$ et $1$ : $0{,}9 < 0{,}952 < 1$.\nLe chiffre des centièmes est $5$ : je monte. L'arrondi au dixième est $1{,}0$.\n⛔ Le piège du c) : écrire $0{,}10$ après $0{,}9$. Dix dixièmes font $1$.\nRéponse : a) $8{,}6 < 8{,}63 < 8{,}7$ ; b) $8{,}6$ ; c) $0{,}9 < 0{,}952 < 1$, arrondi $1{,}0$.",
          schema: ecranSeulement(
            demiDroite(8.6, 8.7, 0.01, [
              { value: 8.63, label: "8,63" },
              { value: 8.65, label: "milieu", color: ROUGE },
            ], { nombres: 0.1 }),
          ),
          micros: ["decimal_encadrer", "decimal_arrondir"],
        },
        {
          enonce: "Vrai ou faux ? Justifie.\na) $3{,}5 = 3{,}50$.\nb) $0{,}8 < 0{,}75$.\nc) Entre $2$ et $3$, il n'y a que $9$ nombres décimaux.\nd) $4{,}099 < 4{,}1$.\ne) $5$ est aussi un nombre décimal.",
          correction:
            "a) Vrai. Un zéro à droite de la partie décimale ne change rien.\nb) Faux. $0{,}8 = 0{,}80$, et $80$ centièmes battent $75$ centièmes.\nc) Faux. Il y a $2{,}1$ et $2{,}2$, mais aussi $2{,}15$ ou $2{,}151$. On n'a jamais fini.\nd) Vrai. $4{,}1 = 4{,}100$, et $99$ millièmes, c'est moins que $100$ millièmes.\ne) Vrai. $5 = 5{,}0$ : sa partie décimale vaut zéro.\n⛔ Le piège du b) : croire que $0{,}75$ gagne, car $75 > 8$.\nRéponse : a) vrai ; b) faux ; c) faux ; d) vrai ; e) vrai.",
          schema: ecranSeulement(
            numeration(["U", "d", "c", "m"], [
              { chiffres: ["0", "8", "0", "0"], nom: "0,8" },
              { chiffres: ["0", "7", "5", "0"], nom: "0,75" },
              { chiffres: ["4", "0", "9", "9"], nom: "4,099" },
              { chiffres: ["4", "1", "0", "0"], nom: "4,1" },
            ]),
          ),
          micros: ["decimal_defi", "decimal_comparer"],
        },
      ],
    },

    /* ───────────────────────── ★★★ Problèmes ───────────────────────── */
    {
      niveau: 3,
      titre: "Problèmes",
      consigne: "Une situation, plusieurs questions. Je range, j'arrondis, puis je réponds par une phrase.",
      rappel: [
        "Pour ranger, j'écris tous les nombres avec autant de chiffres après la virgule.",
        "Un arrondi est proche du nombre, mais pas égal. Il peut cacher des écarts.",
        "Je réponds avec l'unité : m, s, kg, mm.",
      ],
      exercices: [
        {
          titre: "Le 100 mètres",
          enonce: "Quatre filles courent le $100$ m. Leurs temps, en secondes : Inès $14{,}4$ ; Léna $14{,}38$ ; Maya $14{,}09$ ; Zoé $14{,}42$.\na) Le plus petit temps gagne. Range les coureuses, de la 1re à la 4e.\nb) Arrondis chaque temps au dixième.\nc) Avec les arrondis, qui semble à égalité ?\nd) Encadre le temps de Léna au dixième.",
          correction:
            "a) Même partie entière, $14$. J'écris tout avec deux chiffres après la virgule : $14{,}40$ ; $14{,}38$ ; $14{,}09$ ; $14{,}42$.\nDu plus petit au plus grand : $14{,}09 < 14{,}38 < 14{,}4 < 14{,}42$.\nMaya gagne. Puis viennent Léna, Inès et Zoé.\nb) Je regarde les centièmes. Inès : $14{,}4$.\nLéna : $8$ centièmes, je monte à $14{,}4$.\nMaya : $9$ centièmes, je monte à $14{,}1$.\nZoé : $2$ centièmes, je garde $14{,}4$.\nc) Inès, Léna et Zoé ont toutes $14{,}4$. L'arrondi cache leurs écarts.\nd) $14{,}3 < 14{,}38 < 14{,}4$.\n⛔ Le piège : croire que Maya est la plus lente, car $09$ ressemble à $9$. $14{,}09$, c'est moins que $14{,}4$.\nRéponse : a) Maya, Léna, Inès, Zoé ; b) $14{,}4$ ; $14{,}4$ ; $14{,}1$ ; $14{,}4$ ; c) Inès, Léna et Zoé ; d) $14{,}3 < 14{,}38 < 14{,}4$.",
          schema: demiDroite(14, 14.5, 0.05, [
            { value: 14.09, label: "Maya", color: VERT },
            { value: 14.38, label: "Léna" },
            { value: 14.4, label: "Inès" },
            { value: 14.42, label: "Zoé" },
          ], { nombres: 0.1 }),
          micros: ["decimal_comparer", "decimal_arrondir", "decimal_encadrer"],
        },
        {
          titre: "Les fruits sur la balance",
          enonce: "Au marché, on pèse quatre fruits. La pomme : $0{,}185$ kg. La poire : $0{,}2$ kg. L'orange : $0{,}19$ kg. Le kiwi : $0{,}08$ kg.\na) Quel est le chiffre des centièmes de la masse de la pomme ?\nb) Range les fruits, du plus léger au plus lourd.\nc) Arrondis la masse de la pomme au centième.\nd) Tom dit : « Le kiwi pèse $0{,}8$ kg. » Explique son erreur.",
          correction:
            "a) Dans $0{,}185$ : $1$ dixième, $8$ centièmes, $5$ millièmes. Le chiffre des centièmes est $8$.\nb) J'écris tout avec trois chiffres après la virgule : $0{,}185$ ; $0{,}200$ ; $0{,}190$ ; $0{,}080$.\n$80 < 185 < 190 < 200$ : le kiwi, la pomme, l'orange, la poire.\nc) Au centième : je regarde les millièmes, $5$. Je monte : $0{,}19$ kg.\nd) $0{,}8$, ce sont $8$ dixièmes. $0{,}08$, ce sont $8$ centièmes : dix fois moins.\nLe kiwi ne pèse pas $0{,}8$ kg. Il pèse $0{,}08$ kg.\n⛔ Le piège : oublier le zéro des dixièmes. Il change tout.\nRéponse : a) $8$ ; b) kiwi, pomme, orange, poire ; c) $0{,}19$ kg ; d) il a oublié le zéro des dixièmes.",
          schema: numeration(["U", "d", "c", "m"], [
            { chiffres: ["0", "0", "8", "0"], nom: "kiwi" },
            { chiffres: ["0", "1", "8", "5"], nom: "pomme" },
            { chiffres: ["0", "1", "9", "0"], nom: "orange" },
            { chiffres: ["0", "2", "0", "0"], nom: "poire" },
          ], "c"),
          micros: ["decimal_rang", "decimal_comparer", "decimal_arrondir"],
        },
        {
          titre: "Le nombre mystère",
          enonce: "Je suis un nombre décimal avec deux chiffres après la virgule.\nIndice 1 : mon arrondi à l'unité est $5$.\nIndice 2 : je suis plus grand que $5$.\nIndice 3 : mon chiffre des centièmes est $7$.\nIndice 4 : mon chiffre des dixièmes est impair et plus grand que $2$.\na) Entre quels nombres suis-je, d'après les indices 1 et 2 ?\nb) Qui suis-je ?",
          correction:
            "a) Mon arrondi à l'unité est $5$ : je suis entre $4{,}5$ et $5{,}5$.\nJe suis plus grand que $5$ : je suis entre $5$ et $5{,}5$.\nb) Avec $7$ centièmes, il reste $5{,}07$ ; $5{,}17$ ; $5{,}27$ ; $5{,}37$ ; $5{,}47$.\nMon chiffre des dixièmes est impair : $1$ ou $3$.\nIl est plus grand que $2$ : c'est $3$.\n⛔ Le piège : garder $5{,}57$. Son arrondi à l'unité est $6$, pas $5$.\n⭐ Contrôle : $5{,}37$ a bien $3$ dixièmes et $7$ centièmes.\nRéponse : je suis $5{,}37$.",
          schema: demiDroite(5, 5.5, 0.05, [
            { value: 5.07, label: "5,07", color: ROUGE },
            { value: 5.17, label: "5,17", color: ROUGE },
            { value: 5.27, label: "5,27", color: ROUGE },
            { value: 5.37, label: "5,37", color: VERT },
            { value: 5.47, label: "5,47", color: ROUGE },
          ], { nombres: 0.1 }),
          micros: ["decimal_defi", "decimal_arrondir", "decimal_encadrer"],
        },
        {
          titre: "La pluie de la semaine",
          enonce: "Une station météo mesure la pluie tombée chaque jour, en millimètres (mm).\na) Quel jour a-t-il le plus plu ?\nb) Range les jours, du moins pluvieux au plus pluvieux.\nc) Arrondis la pluie de mardi au dixième.\nd) Samedi, il tombe plus que mercredi, mais moins que lundi. Propose une valeur avec deux chiffres après la virgule.",
          figure: tableau(["jour", "lun.", "mar.", "mer.", "jeu.", "ven."], ["mm", 2.5, 12.05, 0.8, 12.5, 0], true),
          correction:
            "a) Mardi et jeudi ont $12$ mm et quelque chose. Je compare $12{,}05$ et $12{,}50$ : jeudi gagne.\nb) $0 < 0{,}8 < 2{,}5 < 12{,}05 < 12{,}5$ : vendredi, mercredi, lundi, mardi, jeudi.\nc) Au dixième : je regarde les centièmes de $12{,}05$, $5$. Je monte : $12{,}1$ mm.\nd) Je cherche entre $0{,}8$ et $2{,}5$. Par exemple : $1{,}25$ mm. Toute valeur entre les deux convient.\n⛔ Le piège du c) : écrire $12{,}0$. Le chiffre des centièmes, $5$, fait monter.\nRéponse : a) jeudi ; b) vendredi, mercredi, lundi, mardi, jeudi ; c) $12{,}1$ mm ; d) par exemple $1{,}25$ mm.",
          micros: ["decimal_comparer", "decimal_arrondir", "decimal_encadrer"],
        },
      ],
    },
  ],
};
