// CM2 · fraction_decimale — fraction → DÉCIMAL → POURCENTAGE (25/10/2026, voir fractions-gabarits-outils.ts).
// ⛔ Ses copies : 3/4 écrit « 3,4 », 1/4 écrit « 4 % ». Ce sont les leurres.
// Figures : la bande de 10, le rectangle 2 × 5, la grille de 100 (1/4 = 25/100 = 0,25 = 25 %).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, tirer, entre, il, exp, qcm, gabarit, rectangle, virgule, deP, cadre } from "./fractions-gabarits-outils";

/** Les fractions usuelles du CM2 et leurs écritures. */
const USUELLES: [number, number][] = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10]];
const dixieme = (n: number) => (Math.random() < 0.5 ? rectangle(n, 10) : ({ kind: "fraction", model: "bar", fraction: { numerator: n, denominator: 10 }, display: { showFraction: false } } as const));
const cent = (n: number) => rectangle(n, 100);
const pc = (x: number) => `${virgule(x)} %`;

export const fractionsGabaritsDecimale: TutorBankItemV4[] = [
  gabarit("cm2_fraction_decimale_tpl_1_reconnaitre", "fraction_decimale", 1, "Une fraction décimale a pour dénominateur 10, 100 ou 1 000.", ["decimale", "reconnaitre"], () => {
    const P = tirer(PRENOMS), n = entre(1, 9), D = tirer([10, 100, 1000]), pas = Math.random() < 0.4;
    const autres = [3, 4, 6, 7, 8, 9, 12].map((x) => `${n}/${x}`);
    const text = pas
      ? tirer([cadre(P, "Laquelle de ces fractions n’est PAS une fraction décimale ?"), `${P.p} cherche l’intruse : laquelle n’est PAS une fraction décimale ?`])
      : tirer([cadre(P, "Laquelle de ces fractions est une fraction décimale ?"), `${P.p} doit entourer la fraction décimale. Laquelle ?`, `Sur sa fiche, ${P.p} cherche la seule fraction décimale. Laquelle est-ce ?`]);
    const decs = [10, 100, 1000].map((x) => `${n}/${x}`);
    const bonne = pas ? tirer(autres) : `${n}/${D}`;
    const leurres = pas ? decs : autres;
    return qcm(text, bonne, leurres,
      exp("Une fraction décimale est une fraction dont le dénominateur est 10, 100, 1 000…", "On regarde seulement le dénominateur.", `${bonne} a pour dénominateur ${bonne.split("/")[1]}.`, pas ? `${bonne} n’est pas une fraction décimale.` : `${bonne} est une fraction décimale.`));
  }),

  gabarit("cm2_fraction_decimale_tpl_2_dixiemes", "fraction_decimale", 1, "1/10, c’est 0,1 : un dixième, le premier chiffre après la virgule.", ["decimale", "dixiemes"], () => {
    const P = tirer(PRENOMS), n = entre(1, 9), sens = Math.random() < 0.6;
    const objet = tirer(["la bande", "la tablette de chocolat", "le mur de la cabane", "la frise", "le potager"]);
    if (sens) {
      const text = tirer([
        `${P.p} a colorié ${n}/10 de ${objet}. Écris ce nombre avec une virgule.`,
        cadre(P, `Quel nombre décimal est égal à ${n}/10 ?`),
        `Sur la figure, ${n} parts sur 10 sont coloriées. ${P.p} écrit cette fraction avec une virgule : que trouve-t-${il(P)} ?`,
      ]);
      return qcm(text, `0,${n}`, [`${n},10`, `0,0${n}`, `10,${n}`, `${n},1`],
        exp("1/10 = 0,1 : un dixième s’écrit au premier rang après la virgule.", "n dixièmes s’écrivent 0,n.", `${n}/10 = ${n} dixièmes = 0,${n}.`, `${n}/10 = 0,${n}.`),
        { canvas: dixieme(n) as any });
    }
    const text = tirer([cadre(P, `Le nombre 0,${n} s’écrit aussi :`), `${P.p} lit 0,${n} sur sa calculatrice. Quelle fraction est égale ?`, `Sur la figure, la partie coloriée vaut 0,${n}. Quelle fraction est-ce ?`]);
    return qcm(text, `${n}/10`, [`${n}/100`, `1/${n}`, `10/${n}`, `${n}/1000`],
      exp("Le chiffre juste après la virgule est celui des dixièmes.", `0,${n} = ${n} dixièmes.`, `0,${n} = ${n}/10.`, `0,${n} s’écrit ${n}/10.`),
      { canvas: dixieme(n) as any });
  }),

  gabarit("cm2_fraction_decimale_tpl_3_centiemes", "fraction_decimale", 2, "100 cases : 1 case = 1/100 = 0,01.", ["decimale", "centiemes", "grille"], () => {
    const P = tirer(PRENOMS); let N = 0;
    do N = entre(3, 97); while (N % 10 === 0);
    const bonne = virgule(N / 100), monnaie = Math.random() < 0.35;
    const text = monnaie
      ? tirer([`${P.p} a ${N} centimes dans sa tirelire, soit ${N}/100 d’euro. Combien d’euros cela fait-il ?`, `${P.p} achète une sucette à ${N}/100 d’euro. Combien coûte-t-elle en euros ?`])
      : tirer([`Dans la grille de 100 cases, ${P.p} colorie ${N} cases. Écris ${N}/100 avec une virgule.`, cadre(P, `Quel nombre décimal est égal à ${N}/100 ?`), `${P.p} a colorié ${N}/100 de la grille. Quel nombre décimal est-ce ?`]);
    const u = monnaie ? " €" : "";
    return qcm(text, bonne + u, [`${N},100${u}`, `${virgule(N / 10)}${u}`, `${virgule(N / 1000)}${u}`, `${N}${u}`],
      exp("1/100 = 0,01 : un centième, le deuxième chiffre après la virgule.", `${N} centièmes : ${Math.floor(N / 10)} dixième${N >= 20 ? "s" : ""} et ${N % 10} centième${N % 10 > 1 ? "s" : ""}.`,
        `${N}/100 = ${bonne}.`, `${N}/100 = ${bonne}${u}.`),
      { canvas: monnaie ? undefined : (cent(N) as any) });
  }),

  gabarit("cm2_fraction_decimale_tpl_4_usuelles", "fraction_decimale", 2, "Écris d’abord la fraction sur 10 ou sur 100 : 3/4 = 75/100.", ["decimale", "usuelles"], () => {
    const P = tirer(PRENOMS), [a, b] = tirer(USUELLES), v = a / b, bonne = virgule(v);
    const text = tirer([
      cadre(P, `Quel nombre décimal est égal à ${a}/${b} ?`),
      `${P.p} a bu ${a}/${b} de litre de jus. Combien de litres cela fait-il, avec une virgule ?`,
      `La recette demande ${a}/${b} de kilo de farine. ${P.p} veut l’écrire avec une virgule. Que doit-${il(P)} écrire ?`,
      `Sur la grille de 100 cases ${deP(P)}, ${a}/${b} est colorié. Quel nombre décimal est-ce ?`,
    ]);
    return qcm(text, bonne, [`${a},${b}`, `0,${a}${b}`, virgule(b / a), `0,${b}`, `${a}${b}`],
      exp("Une fraction est aussi un nombre décimal : on l’écrit sur 10 ou sur 100.", `${a}/${b} = ${Math.round(v * 100)}/100 (on multiplie le haut et le bas par ${100 / b}).`,
        `${Math.round(v * 100)}/100 = ${bonne}. Attention : ${a}/${b} ne s’écrit pas ${a},${b}.`, `${a}/${b} = ${bonne}.`),
      { canvas: cent(Math.round(v * 100)) as any });
  }),

  gabarit("cm2_fraction_decimale_tpl_5_vers_fraction", "fraction_decimale", 2, "0,25 = 25/100 ; cherche la fraction simple qui vaut autant.", ["decimale", "vers_fraction"], () => {
    const P = tirer(PRENOMS), [a, b] = tirer(USUELLES.filter(([, y]) => y !== 10)), v = a / b, dec = virgule(v);
    const text = tirer([
      cadre(P, `Quelle fraction est égale à ${dec} ?`),
      `La gourde ${deP(P)} contient ${dec} L d’eau. Quelle fraction de litre est-ce ?`,
      `${P.p} a couru ${dec} km. Quelle fraction de kilomètre a-t-${il(P)} courue ?`,
      `Le gâteau pèse ${dec} kg. ${P.p} veut l’écrire en fraction de kilo. Laquelle ?`,
    ]);
    const chiffres = dec.split(",")[1];
    return qcm(text, `${a}/${b}`, [`${chiffres}/10`, `${b}/${a}`, `1/${chiffres}`, `${a}/${b + 1}`, `${chiffres}/1000`],
      exp("Un nombre décimal s’écrit aussi en fraction décimale, qu’on peut simplifier.", `${dec} = ${Math.round(v * 100)}/100.`,
        `${Math.round(v * 100)}/100 = ${a}/${b}.`, `${dec} = ${a}/${b}.`));
  }),

  gabarit("cm2_fraction_decimale_tpl_6_pourcentage", "fraction_decimale", 3, "« Pour cent » veut dire « sur 100 » : écris la fraction sur 100.", ["decimale", "pourcentage"], () => {
    const P = tirer(PRENOMS), [a, b] = Math.random() < 0.8 ? tirer(USUELLES) : [entre(3, 97), 100], p = Math.round((a / b) * 100);
    const text = tirer([
      `${P.p} a lu les ${a}/${b} de son livre. Quel pourcentage du livre a-t-${il(P)} lu ?`,
      `La batterie de la tablette ${deP(P)} est chargée aux ${a}/${b}. Quel pourcentage s’affiche ?`,
      `Dans la classe ${deP(P)}, ${a}/${b} des élèves font du sport en club. Quel pourcentage des élèves cela fait-il ?`,
      `Le magasin de jouets fait à ${P.p} une remise de ${a}/${b} du prix. Quel pourcentage de remise est-ce ?`,
      `Le réservoir d’eau du jardin ${deP(P)} est rempli aux ${a}/${b}. À combien de pour cent est-il rempli ?`,
    ]);
    return qcm(text, pc(p), [pc(b), ...(b < 100 ? [pc(Number(`${a}${b}`))] : []), `${virgule(a / b)} %`, pc(a), pc(100 - p), pc(p / 10)],
      exp("Un pourcentage est une fraction sur 100 : 25 % = 25/100.", `On écrit ${a}/${b} avec le dénominateur 100${b === 100 ? "" : ` (× ${100 / b} en haut et en bas)`}.`,
        `${a}/${b} = ${p}/100 = ${pc(p)}. Attention : ${a}/${b} n’est pas ${pc(b)}.`, `${a}/${b} = ${pc(p)}.`),
      { canvas: cent(p) as any });
  }),

  gabarit("cm2_fraction_decimale_tpl_7_milliemes", "fraction_decimale", 3, "1/1 000 = 0,001 : le troisième chiffre après la virgule.", ["decimale", "milliemes"], () => {
    const P = tirer(PRENOMS), N = tirer([entre(1, 9), entre(11, 99), entre(101, 999)]);
    const bonne = virgule(N / 1000);
    const mm = Math.random() < 0.4;
    const text = mm
      ? tirer([`${P.p} mesure une fourmi : ${N} mm, soit ${N}/1000 de mètre. Écris cette longueur en mètres.`, `La vis que tient ${P.p} mesure ${N} mm, c’est-à-dire ${N}/1000 m. Combien de mètres est-ce ?`])
      : tirer([cadre(P, `Quel nombre décimal est égal à ${N}/1000 ?`), `${P.p} doit écrire ${N}/1000 avec une virgule. Que doit-${il(P)} écrire ?`]);
    const u = mm ? " m" : "";
    const fausses = [N / 100, N / 10, N / 10000, N].map((x) => virgule(x) + u);
    return qcm(text, bonne + u, fausses,
      exp("1/1 000 = 0,001 : un millième, au troisième rang après la virgule.", "Le dernier chiffre du numérateur va au rang des millièmes.", `${N}/1000 = ${bonne}.`, `${N}/1000 = ${virgule(N / 1000)}${u}.`));
  }),

  gabarit("cm2_fraction_decimale_tpl_8_chaine", "fraction_decimale", 3, "Fraction → sur 100 → nombre décimal → pourcentage.", ["decimale", "pourcentage", "chaine"], () => {
    const P = tirer(PRENOMS), [a, b] = tirer(USUELLES), p = Math.round((a / b) * 100);
    const sens = tirer(["frac", "pc", "dec"] as const);
    const text = sens === "frac"
      ? tirer([`${P.p} a mangé les ${a}/${b} du paquet de biscuits. Quelle écriture dit la même chose ?`, cadre(P, `Quelle écriture est égale à ${a}/${b} ?`)])
      : sens === "pc"
        ? tirer([`${pc(p)} des élèves de l’école ${deP(P)} mangent à la cantine. Quelle fraction des élèves est-ce ?`, cadre(P, `Quelle fraction est égale à ${pc(p)} ?`)])
        : tirer([`${P.p} a parcouru ${virgule(a / b)} de la course. Quel pourcentage de la course a-t-${il(P)} fait ?`, cadre(P, `Quel pourcentage est égal à ${virgule(a / b)} ?`)]);
    const bonne = sens === "pc" ? `${a}/${b}` : sens === "frac" ? tirer([virgule(a / b), pc(p)]) : pc(p);
    const leurres = sens === "pc" ? [`${p}/10`, `1/${p}`, `${b}/${a}`, `${Math.round(p / 10)}/100`] : [`${a},${b}`, pc(b), pc(Number(`${a}${b}`)), virgule(b / 100), `${virgule(a / b)} %`];
    return qcm(text, bonne, leurres.map(String),
      exp("Une même quantité s’écrit en fraction, en nombre décimal et en pourcentage.", `On passe par le dénominateur 100 : ${a}/${b} = ${p}/100.`,
        `${a}/${b} = ${p}/100 = ${virgule(a / b)} = ${pc(p)}.`, `La bonne écriture est ${bonne}.`),
      { canvas: cent(p) as any });
  }),
];
