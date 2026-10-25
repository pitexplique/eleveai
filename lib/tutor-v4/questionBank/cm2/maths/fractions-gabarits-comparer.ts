// CM2 · fraction_comparer — gabarits à phrases variées (25/10/2026, voir fractions-gabarits-outils.ts).
// Leurres : « plus le dénominateur est grand, plus c'est grand » (1/6 > 1/4),
// et en ★3 comparer 3/4 et 5/8 sans passer par 6/8.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { OBJETS, PRENOMS, deuxPrenoms, tirer, entre, il, exp, qcm, gabarit, figure, deuxBarres, pluriel, nom, melanger, virgule, cadre } from "./fractions-gabarits-outils";

const AUTANT = "autant tous les deux";
const SAIT_PAS = "on ne peut pas savoir";
const deuxDifferents = (max: number): [number, number] => {
  const a = entre(1, max);
  let b = entre(1, max);
  while (b === a) b = entre(1, max);
  return [a, b];
};

export const fractionsGabaritsComparer: TutorBankItemV4[] = [
  gabarit("cm2_fraction_comparer_tpl_1_meme_den", "fraction_comparer", 1, "Même dénominateur : les parts ont la même taille, on compare le nombre de parts.", ["comparer", "meme_denominateur"], () => {
    const [P, Q] = deuxPrenoms(), O = tirer(OBJETS), d = tirer([4, 5, 6, 8, 10, 12]);
    const [a, b] = deuxDifferents(d - 1);
    const plus = Math.random() < 0.7;
    const gagnant = (a > b) === plus ? P : Q;
    const text = tirer([
      `${P.p} ${O.pc} ${a}/${d} de ${O.le.startsWith("la") ? "sa" : "son"} ${nom(O)}, ${Q.p} ${b}/${d} de ${O.le.startsWith("la") ? "la sienne" : "le sien"}, de même taille. Qui en a ${O.pc.slice(2)} le ${plus ? "plus" : "moins"} ?`,
      `Deux ${pluriel(O)} identiques : ${P.p} en ${O.pc} ${a}/${d}, ${Q.p} ${b}/${d}. Qui en a ${O.pc.slice(2)} le ${plus ? "plus" : "moins"} ?`,
      `Pour la kermesse, ${P.p} et ${Q.p} ont chacun ${O.un}. ${P.p} en ${O.pc} ${a}/${d} et ${Q.p} ${b}/${d}. Qui en a ${O.pc.slice(2)} le ${plus ? "plus" : "moins"} ?`,
    ]);
    return qcm(text, gagnant.p, [gagnant === P ? Q.p : P.p, AUTANT, SAIT_PAS],
      exp("Deux fractions de même dénominateur parlent de parts de même taille.", "On compare les numérateurs : le plus grand donne la plus grande fraction.",
        `${a}/${d} et ${b}/${d} : ${Math.max(a, b)} > ${Math.min(a, b)}.`, `C’est ${gagnant.p} qui en a ${O.pc.slice(2)} le ${plus ? "plus" : "moins"}.`),
      { canvas: deuxBarres([a, d, P.p], [b, d, Q.p]) });
  }),

  gabarit("cm2_fraction_comparer_tpl_2_signe", "fraction_comparer", 1, "Même dénominateur : compare les numérateurs.", ["comparer", "signe"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS), d = tirer([3, 4, 5, 6, 7, 8, 9, 10]);
    const [a, b] = deuxDifferents(d + 2);
    const bonne = a < b ? "<" : ">";
    const text = tirer([
      cadre(P, `Quel signe mettre entre ${a}/${d} et ${b}/${d} ?`),
      `${P.p} compare ${a}/${d} ${O.du} et ${b}/${d} ${O.du}. Quel signe écrit-${il(P)} entre les deux ?`,
      cadre(P, `Complète : ${a}/${d} … ${b}/${d}. Quel signe va à la place des points ?`),
    ]);
    return qcm(text, bonne, ["<", ">", "="],
      exp("< veut dire « plus petit que », > « plus grand que ».", "Même dénominateur : on compare les numérateurs.", `${a} ${bonne} ${b}.`, `${a}/${d} ${bonne} ${b}/${d}.`),
      { canvas: a <= d && b <= d ? deuxBarres([a, d, `${a}/${d}`], [b, d, `${b}/${d}`]) : undefined });
  }),

  gabarit("cm2_fraction_comparer_tpl_3_meme_num", "fraction_comparer", 2, "Même nombre de parts prises : plus on partage, plus les parts sont petites.", ["comparer", "meme_numerateur"], () => {
    const [P, Q] = deuxPrenoms(), O = tirer(OBJETS), n = tirer([1, 1, 2, 3]);
    let [d1, d2] = [0, 0];
    do [d1, d2] = [tirer([3, 4, 5, 6, 8, 10]), tirer([3, 4, 5, 6, 8, 10])]; while (d1 === d2 || n >= Math.min(d1, d2));
    const gagnant = d1 < d2 ? P : Q;
    const text = tirer([
      `${P.p} partage ${O.un} en ${d1} ${O.parts} ${O.egales}, ${Q.p} ${O.un} identique en ${d2}. Chacun en ${O.verbe} ${n}. Qui en a ${O.pc.slice(2)} le plus ?`,
      `${P.p} ${O.pc} ${n}/${d1} ${O.du}, ${Q.p} ${n}/${d2} d’${O.un} identique. Qui en a ${O.pc.slice(2)} le plus ?`,
      `Qui a la plus grosse part : ${P.p} avec ${n}/${d1} ${O.du}, ou ${Q.p} avec ${n}/${d2} d’${O.un} pareil${O.un.startsWith("une") ? "le" : ""} ?`,
    ]);
    return qcm(text, gagnant.p, [gagnant === P ? Q.p : P.p, AUTANT, SAIT_PAS],
      exp("Plus on partage un tout en parts nombreuses, plus chaque part est petite.", "Même numérateur : la fraction la plus grande a le plus PETIT dénominateur.",
        `${n}/${Math.min(d1, d2)} > ${n}/${Math.max(d1, d2)}, car ${Math.min(d1, d2)} < ${Math.max(d1, d2)}.`, `${gagnant.p} en a ${O.pc.slice(2)} le plus.`),
      { canvas: deuxBarres([n, d1, P.p], [n, d2, Q.p]) });
  }),

  gabarit("cm2_fraction_comparer_tpl_4_moitie", "fraction_comparer", 2, "La moitié, c’est la moitié des parts : compare le numérateur à la moitié du dénominateur.", ["comparer", "moitie"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS), d = tirer([4, 5, 6, 8, 10, 12]);
    const n = entre(1, d - 1);
    const bonne = 2 * n < d ? "moins de la moitié" : 2 * n === d ? "exactement la moitié" : "plus de la moitié";
    const text = tirer([
      `${P.p} ${O.pc} ${n}/${d} ${O.du}. Est-ce moins de la moitié, exactement la moitié ou plus de la moitié ?`,
      `${P.p} dit : « J’ai déjà ${O.pp.replace(/e$/, "")} ${n}/${d} ${O.du} ! » Quelle part ${O.du} est-ce ?`,
      `${O.un.charAt(0).toUpperCase()}${O.un.slice(1)} a ${d} ${O.parts} ${O.egales} et ${P.p} en ${O.verbe} ${n}. Par rapport à la moitié ${O.du}, est-ce moins, autant ou plus ?`,
    ]);
    return qcm(text, bonne, ["moins de la moitié", "exactement la moitié", "plus de la moitié"],
      exp(`La moitié d’un tout de ${d} ${O.parts}, c’est ${d} ÷ 2 = ${virgule(d / 2)} ${O.parts}.`, "On compare le numérateur à cette moitié.",
        `${n} ${2 * n < d ? "<" : 2 * n === d ? "=" : ">"} ${virgule(d / 2)}.`, `${n}/${d}, c’est ${bonne}.`),
      { canvas: figure(O.modele, n, d) as any });
  }),

  gabarit("cm2_fraction_comparer_tpl_5_la_plus", "fraction_comparer", 2, "Même dénominateur : regarde le haut. Même numérateur : le plus petit bas gagne.", ["comparer", "liste"], () => {
    const P = tirer(PRENOMS), meme = tirer(["den", "num"] as const), plus = Math.random() < 0.6;
    let fr: [number, number][];
    if (meme === "den") { const d = tirer([7, 8, 9, 10, 12]); fr = melanger([1, 2, 3, 4, 5, 6].filter((x) => x < d)).slice(0, 4).map((x) => [x, d]); }
    else { const n = tirer([1, 2, 3]); fr = melanger([4, 5, 6, 7, 8, 9, 10]).slice(0, 4).map((x) => [n, x]); }
    const tri = [...fr].sort((x, y) => x[0] / x[1] - y[0] / y[1]);
    const [bn, bd] = plus ? tri[3] : tri[0];
    const text = tirer([
      cadre(P, `Quelle est la ${plus ? "plus grande" : "plus petite"} de ces fractions ?`),
      `${P.p} cherche la fraction la ${plus ? "plus grande" : "plus petite"}. Laquelle choisir ?`,
      `Au jeu des fractions, ${P.p} doit prendre la carte la ${plus ? "plus grande" : "plus petite"}. Laquelle ?`,
    ]);
    return qcm(text, `${bn}/${bd}`, fr.filter(([x, y]) => x !== bn || y !== bd).map(([x, y]) => `${x}/${y}`),
      exp("On compare des fractions plus facilement quand elles ont le même dénominateur ou le même numérateur.", meme === "den" ? "Même dénominateur : la plus grande a le plus grand numérateur." : "Même numérateur : la plus grande a le plus petit dénominateur.",
        tri.map(([x, y]) => `${x}/${y}`).join(" < "), `La ${plus ? "plus grande" : "plus petite"} est ${bn}/${bd}.`));
  }),

  gabarit("cm2_fraction_comparer_tpl_6_ranger", "fraction_comparer", 3, "Même dénominateur : range les numérateurs.", ["comparer", "ranger"], () => {
    const [P, Q] = deuxPrenoms();
    let R = tirer(PRENOMS);
    while (R.p === P.p || R.p === Q.p) R = tirer(PRENOMS);
    const d = tirer([6, 8, 10, 12]), nums = melanger([1, 2, 3, 4, 5].filter((x) => x < d)).slice(0, 3);
    const gens = [P, Q, R].map((x, i) => ({ x, n: nums[i] }));
    const croissant = Math.random() < 0.5;
    const ordre = [...gens].sort((u, v) => (croissant ? u.n - v.n : v.n - u.n)).map((g) => g.x.p);
    const quoi = tirer([
      ["ont bu", "de leur gourde", "a bu"], ["ont lu", "de leur livre", "a lu"], ["ont colorié", "de leur dessin", "a colorié"],
      ["ont fait", "du tour du lac", "a fait"], ["ont rempli", "de leur album d’autocollants", "a rempli"], ["ont mangé", "de leur paquet de gâteaux", "a mangé"],
    ] as const);
    const liste = gens.map((g) => `${g.x.p} ${g.n}/${d}`).join(", ");
    const text = tirer([
      `Trois amis ${quoi[0]} une partie ${quoi[1]} : ${liste}. Range-les de celui qui en ${quoi[2]} le ${croissant ? "moins" : "plus"} à celui qui en ${quoi[2]} le ${croissant ? "plus" : "moins"}.`,
      `${liste} : voilà ce que ces enfants ${quoi[0]} ${quoi[1]}. Dans quel ordre, du ${croissant ? "plus petit au plus grand" : "plus grand au plus petit"} ?`,
    ]);
    const perm = (t: string[]) => t.join(", ");
    const leurres = [perm([...ordre].reverse()), perm([ordre[1], ordre[0], ordre[2]]), perm([ordre[0], ordre[2], ordre[1]]), perm([ordre[2], ordre[0], ordre[1]])];
    return qcm(text, perm(ordre), leurres,
      exp("Pour ranger des fractions de même dénominateur, on range leurs numérateurs.", `Les trois fractions ont le dénominateur ${d} : on compare ${nums.join(", ")}.`,
        gens.sort((u, v) => u.n - v.n).map((g) => `${g.n}/${d}`).join(" < "), `L’ordre est : ${perm(ordre)}.`));
  }),

  gabarit("cm2_fraction_comparer_tpl_7_den_double", "fraction_comparer", 3, "Écris les deux fractions avec le même dénominateur : 3/4 = 6/8.", ["comparer", "equivalence"], () => {
    const [P, Q] = deuxPrenoms(), O = tirer(OBJETS), d = tirer([2, 3, 4, 5]), k = tirer([2, 3]), D = d * k;
    const a = entre(1, d - 1), b = entre(1, D - 1), A = a * k;
    const gagnant = A === b ? AUTANT : A > b ? P.p : Q.p;
    const text = tirer([
      `${P.p} ${O.pc} ${a}/${d} ${O.du}, ${Q.p} ${b}/${D} d’${O.un} identique. Qui en a ${O.pc.slice(2)} le plus ?`,
      `Deux ${pluriel(O)} pareilles : ${P.p} en ${O.pc} ${a}/${d}, ${Q.p} ${b}/${D}. Qui en a ${O.pc.slice(2)} le plus ?`.replace("pareilles", O.un.startsWith("une") ? "pareilles" : "pareils"),
    ]);
    return qcm(text, gagnant, [P.p, Q.p, AUTANT, SAIT_PAS].filter((x) => x !== gagnant),
      exp("Pour comparer, on écrit les deux fractions avec le même dénominateur.", `On multiplie le haut ET le bas de ${a}/${d} par ${k}.`,
        `${a}/${d} = ${A}/${D}, à comparer avec ${b}/${D}.`, gagnant === AUTANT ? "Ils en ont autant tous les deux." : `${gagnant} en a ${O.pc.slice(2)} le plus.`),
      { canvas: deuxBarres([a, d, P.p], [b, D, Q.p]) });
  }),
];
