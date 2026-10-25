// CM2 · fraction_defi — problèmes de la vie d'un enfant de 10 ans (25/10/2026, voir fractions-gabarits-outils.ts).
// Fraction d'une quantité (÷ puis ×), ce qui reste, et comparer une fraction à
// un pourcentage de la même quantité (1/4 de 20 € et 25 % de 20 €).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { OBJETS, PRENOMS, deuxPrenoms, tirer, entre, Il, exp, qcm, gabarit, figure, deP, pgcd } from "./fractions-gabarits-outils";

/** Une quantité partageable : [phrase avec N, unité de la réponse, ce que l'on en prend]. */
const QUANTITES: ((N: number, P: string) => [string, string, string])[] = [
  (N, P) => [`${P} a un sachet de ${N} bonbons.`, "bonbons", "en donne"],
  (N, P) => [`${P} a une collection de ${N} billes.`, "billes", "en perd"],
  (N, P) => [`${P} a une boîte de ${N} crayons de couleur.`, "crayons", "en taille"],
  (N, P) => [`Le livre ${deP(P)} a ${N} pages.`, "pages", "en lit"],
  (N, P) => [`${P} a ${N} € dans sa tirelire.`, "€", "en dépense"],
  (N, P) => [`L’album d’autocollants ${deP(P)} a ${N} cases.`, "cases", "en remplit"],
  (N, P) => [`Au club de foot, ${P} doit ranger ${N} ballons.`, "ballons", "en range"],
  (N, P) => [`${P} prépare ${N} crêpes pour la fête.`, "crêpes", "en garnit"],
  (N, P) => [`${P} a ${N} perles pour faire des bracelets.`, "perles", "en enfile"],
  (N, P) => [`${P} a un jeu de ${N} cartes.`, "cartes", "en distribue"],
  (N, P) => [`Dans son potager, ${P} a ${N} plants de tomates.`, "plants", "en arrose"],
  (N, P) => [`${P} a emprunté ${N} BD à la médiathèque.`, "BD", "en lit"],
];
const quantite = (N: number, P: string) => tirer(QUANTITES)(N, P);

export const fractionsGabaritsDefi: TutorBankItemV4[] = [
  gabarit("cm2_fraction_defi_tpl_1_unitaire", "fraction_defi", 2, "Pour prendre 1/4 d’une quantité, on la partage en 4 parts égales : on divise par 4.", ["defi", "fraction_de"], () => {
    const P = tirer(PRENOMS), d = tirer([2, 3, 4, 5, 6, 8, 10]), q = entre(2, d <= 5 ? 9 : 6), N = d * q;
    const [pose, u, prend] = quantite(N, P.p);
    const text = tirer([
      `${pose} ${Il(P)} ${prend} 1/${d}. Combien de ${u === "€" ? "euros" : u} est-ce ?`,
      `${pose} ${Il(P)} ${prend} ${d === 2 ? "la moitié" : d === 3 ? "un tiers" : d === 4 ? "un quart" : `1/${d}`}. Combien cela fait-il ?`,
      `${pose} Combien font 1/${d} de ${N} ${u} ?`,
    ]);
    return qcm(text, `${q} ${u}`, [`${N * d} ${u}`, `${N - d} ${u}`, `${N + d} ${u}`, `${q + 1} ${u}`, `${d} ${u}`],
      exp(`Prendre 1/${d} d’une quantité, c’est la partager en ${d} parts égales et en garder une.`, `On divise par ${d}.`, `${N} ÷ ${d} = ${q}.`, `1/${d} de ${N} ${u}, c’est ${q} ${u}.`),
      { canvas: figure("bar", 1, d) as any });
  }),

  gabarit("cm2_fraction_defi_tpl_2_reste", "fraction_defi", 2, "Le tout, c’est toutes les parts : enlève les parts prises.", ["defi", "reste"], () => {
    const [P, Q] = deuxPrenoms(), O = tirer(OBJETS), d = tirer([6, 8, 10, 12]);
    const a = entre(1, d - 3), b = entre(1, d - a - 1), r = d - a - b;
    const text = tirer([
      `${P.p} et ${Q.p} partagent ${O.un} en ${d} ${O.parts} ${O.egales}. ${P.p} en ${O.verbe} ${a}, ${Q.p} ${b}. Quelle fraction ${O.du} reste-t-il ?`,
      `${P.p} ${O.pc} ${a}/${d} ${O.du} et ${Q.p} ${b}/${d}. Quelle fraction ${O.du} reste-t-il ?`,
      `Pour le goûter, ${P.p} ${O.pc} ${a}/${d} ${O.du}, puis ${Q.p} ${b}/${d}. Que reste-t-il ${O.du} ?`,
    ]);
    return qcm(text, `${r}/${d}`, [`${a + b}/${d}`, `${a + b}/${2 * d}`, `${r}/${2 * d}`, `${r + 1}/${d}`, `${d}/${r}`],
      exp(`Le tout entier, c’est ${d}/${d}.`, "On ajoute les parts prises (le dénominateur ne change pas), puis on les enlève du tout.",
        `${a}/${d} + ${b}/${d} = ${a + b}/${d} ; ${d} − ${a + b} = ${r}.`, `Il reste ${r}/${d} ${O.du}.`),
      { canvas: figure(O.modele, a + b, d) as any });
  }),

  gabarit("cm2_fraction_defi_tpl_3_n_sur_d", "fraction_defi", 3, "Divise par le dénominateur, puis multiplie par le numérateur.", ["defi", "fraction_de"], () => {
    const P = tirer(PRENOMS), d = tirer([3, 4, 5, 6, 8, 10]), q = entre(2, d <= 5 ? 9 : 5), N = d * q;
    let n = 2;
    do n = entre(2, d - 1); while (pgcd(n, d) !== 1);
    const [pose, u, prend] = quantite(N, P.p);
    const text = tirer([`${pose} ${Il(P)} ${prend} les ${n}/${d}. Combien cela fait-il ?`, `${pose} Combien font les ${n}/${d} de ${N} ${u} ?`, `${pose} ${Il(P)} ${prend} ${n}/${d}. Combien de ${u === "€" ? "euros" : u} est-ce ?`]);
    return qcm(text, `${q * n} ${u}`, [`${q} ${u}`, `${N - n} ${u}`, `${N * n} ${u}`, `${N - q * n} ${u}`, `${q * n + n} ${u}`],
      exp(`Prendre ${n}/${d}, c’est partager en ${d} parts égales et en prendre ${n}.`, `On divise par ${d}, puis on multiplie par ${n}.`, `${N} ÷ ${d} = ${q}, puis ${q} × ${n} = ${q * n}.`, `Les ${n}/${d} de ${N} ${u}, c’est ${q * n} ${u}.`),
      { canvas: figure("bar", n, d) as any });
  }),

  gabarit("cm2_fraction_defi_tpl_4_combien_reste", "fraction_defi", 3, "Calcule la part prise, puis enlève-la du tout.", ["defi", "reste"], () => {
    const P = tirer(PRENOMS), d = tirer([3, 4, 5, 6, 8, 10]), q = entre(2, d <= 5 ? 9 : 5), N = d * q;
    let n = 1;
    do n = entre(1, d - 1); while (pgcd(n, d) !== 1);
    const pris = q * n;
    const [pose, u, prend] = quantite(N, P.p);
    const text = tirer([`${pose} ${Il(P)} ${prend} les ${n}/${d}. Combien en reste-t-il ?`, `${pose} ${Il(P)} ${prend} ${n}/${d}. Combien lui en reste-t-il ?`]);
    return qcm(text, `${N - pris} ${u}`, [`${pris} ${u}`, `${N - n} ${u}`, `${q} ${u}`, `${N - q} ${u}`, `${N - pris + 1} ${u}`],
      exp("Ce qui reste = le tout − la part prise.", `${n}/${d} de ${N} : ${N} ÷ ${d} = ${q}, puis ${q} × ${n} = ${pris}.`, `${N} − ${pris} = ${N - pris}.`, `Il en reste ${N - pris} ${u}.`),
      { canvas: figure("bar", n, d) as any });
  }),

  gabarit("cm2_fraction_defi_tpl_5_fraction_ou_pourcentage", "fraction_defi", 3, "Calcule les deux quantités : 1/4 = 25/100 = 25 %.", ["defi", "pourcentage", "comparer"], () => {
    const [P, Q] = deuxPrenoms(), [a, b] = tirer([[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [1, 10], [3, 10]] as [number, number][]);
    const pcBon = Math.round((a / b) * 100), ecart = tirer([0, 0, 5, 10, -5, -10]), pct = Math.max(5, pcBon + ecart);
    const N = tirer([20, 40, 60, 80, 100]);
    const thing = tirer([["€ d’argent de poche", "dépense"], ["pages de BD", "lit"], ["billes", "donne"], ["autocollants", "colle"], ["bonbons", "mange"], ["photos", "imprime"]] as const);
    const vP = (N * a) / b, vQ = (N * pct) / 100;
    const bonne = vP === vQ ? "autant tous les deux" : vP > vQ ? P.p : Q.p;
    const text = tirer([
      `${P.p} et ${Q.p} ont chacun ${N} ${thing[0]}. ${P.p} en ${thing[1]} les ${a}/${b}, ${Q.p} en ${thing[1]} ${pct} %. Qui en ${thing[1]} le plus ?`,
      `Sur ${N} ${thing[0]} chacun, ${P.p} en ${thing[1]} ${a}/${b} et ${Q.p} ${pct} %. Qui en ${thing[1]} le plus ?`,
    ]);
    return qcm(text, bonne, [P.p, Q.p, "autant tous les deux", "on ne peut pas savoir"].filter((x) => x !== bonne),
      exp("Une fraction et un pourcentage se comparent en les écrivant sur 100.", `${a}/${b} = ${pcBon}/100 = ${pcBon} %.`,
        `${a}/${b} de ${N} = ${vP} ; ${pct} % de ${N} = ${vQ}.`, bonne === "autant tous les deux" ? "Ils en ont autant tous les deux." : `${bonne} en ${thing[1]} le plus.`));
  }),
];

