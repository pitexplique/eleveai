// CM2 · fraction_representer — gabarits à phrases variées (25/10/2026, voir fractions-gabarits-outils.ts).
// Leurres : l'inverse (8/3), « parts coloriées sur parts blanches » (3/5 pour 3/8),
// et en ★3 les erreurs de simplification de ses copies (ne diviser que le haut,
// enlever le même nombre en haut et en bas).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { OBJETS, PRENOMS, tirer, entre, il, exp, qcm, gabarit, figure, infinitif, accord, pgcd, deP, queP, cadre } from "./fractions-gabarits-outils";
import type { Objet } from "./fractions-gabarits-outils";

const feminin = (O: Objet) => O.le.startsWith("la ");
const colories = (O: Objet) => accord(O, "coloriées", "coloriés");
const blanches = (O: Objet) => accord(O, "blanches", "blancs");
const partage = (O: Objet) => (feminin(O) ? "partagée" : "partagé");
const RONDS = OBJETS.filter((O) => O.modele === "circle");
/** Les leurres d'une lecture de figure n/d. */
const leurresLecture = (n: number, d: number) => [`${d}/${n}`, `${n}/${d - n}`, `${d - n}/${d}`, `${n}/${d + 1}`, `${n + 1}/${d}`];

export const fractionsGabaritsRepresenter: TutorBankItemV4[] = [
  gabarit("cm2_fraction_representer_tpl_1_barre", "fraction_representer", 1, "Compte les parts coloriées (en haut), puis toutes les parts (en bas).", ["representer", "figure"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS), d = tirer([3, 4, 5, 6, 8, 10]), n = entre(1, d - 1);
    const text = tirer([
      `La partie coloriée montre ce ${queP(P)} ${O.pc} ${O.du}. Quelle fraction ${O.du} a-t-${il(P)} ${O.pp} ?`,
      `${P.p} ${O.pc} les ${O.parts} ${colories(O)}. Quelle fraction ${O.du} est-ce ?`,
      `Regarde ${O.le} ${deP(P)} : ${feminin(O) ? "elle" : "il"} est ${partage(O)} en ${O.parts} ${O.egales}. Quelle fraction ${O.du} est coloriée ?`,
      cadre(P, `Quelle fraction ${O.du} est coloriée sur la figure ?`),
    ]);
    return qcm(text, `${n}/${d}`, leurresLecture(n, d),
      exp("Une fraction compte des parts égales d’un tout.", "Le nombre de parts coloriées va en haut, le nombre total de parts en bas.",
        `${n} ${O.parts} ${colories(O)} sur ${d} ${O.parts} en tout.`, `La fraction est ${n}/${d}.`),
      { canvas: figure(O.modele, n, d) as any });
  }),

  gabarit("cm2_fraction_representer_tpl_7_combien", "fraction_representer", 1, "Le numérateur dit combien de parts on prend.", ["representer", "colorier"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS), d = tirer([3, 4, 5, 6, 8, 10, 12]), n = entre(1, d - 1);
    const text = tirer([
      `${O.un.charAt(0).toUpperCase()}${O.un.slice(1)} est ${partage(O)} en ${d} ${O.parts} ${O.egales}. Pour représenter ${n}/${d} ${O.du}, combien de ${O.parts} ${P.p} doit-${il(P)} colorier ?`,
      `${P.p} veut ${infinitif(O)} ${n}/${d} ${O.du}, ${partage(O)} en ${d} ${O.parts} ${O.egales}. Combien de ${O.parts} cela fait-il ?`,
      `Sur la figure, ${O.le} a ${d} ${O.parts} ${O.egales}. Combien faut-il en colorier pour montrer ${n}/${d} ?`,
    ]);
    return qcm(text, String(n), [String(d), String(d - n), String(n + d), String(n + 1)],
      exp("Le dénominateur dit en combien de parts égales on partage ; le numérateur, combien on en prend.", `Ici le tout a déjà ${d} ${O.parts} : on en prend autant que le numérateur.`,
        `${n}/${d} : ${n} ${O.parts} sur ${d}.`, `Il faut ${n} ${O.parts}.`),
      { canvas: figure(O.modele, 0, d) as any });
  }),

  gabarit("cm2_fraction_representer_tpl_2_cercle", "fraction_representer", 2, "Compte les secteurs coloriés, puis tous les secteurs.", ["representer", "cercle"], () => {
    const P = tirer(PRENOMS), O = tirer(RONDS), d = tirer([3, 4, 5, 6, 8, 10, 12]), n = entre(1, d - 1);
    const text = tirer([
      `${O.le.charAt(0).toUpperCase()}${O.le.slice(1)} ${deP(P)} est ${partage(O)} en parts égales. Les parts coloriées ont été mangées. Quelle fraction ${O.du} a été mangée ?`,
      `À la fête ${deP(P)}, chaque part coloriée ${O.du} a été mangée. Quelle fraction ${O.du} est partie ?`,
      `${P.p} a colorié les parts ${O.du} qu’${il(P)} a déjà servies. Quelle fraction ${O.du} a-t-${il(P)} servie ?`,
    ]);
    return qcm(text, `${n}/${d}`, leurresLecture(n, d),
      exp("Un disque partagé en parts égales représente un tout.", "Parts coloriées en haut, toutes les parts en bas.", `${n} parts coloriées sur ${d}.`, `La fraction est ${n}/${d}.`),
      { canvas: figure("circle", n, d) as any });
  }),

  gabarit("cm2_fraction_representer_tpl_3_grille", "fraction_representer", 2, "Dans une grille, le dénominateur est le nombre total de cases.", ["representer", "grille"], () => {
    const P = tirer(PRENOMS);
    const [rows, cols] = tirer([[2, 3], [2, 4], [2, 5], [3, 4], [2, 6], [3, 3], [4, 4], [3, 5]]);
    const total = rows * cols, n = entre(1, total - 1);
    const lieu = tirer([
      ["Dans la boîte d’œufs de", "pleines"], ["Sur le cahier quadrillé de", "coloriées"], ["Dans le potager de", "plantées"],
      ["Sur le carrelage de la cuisine de", "nettoyées"], ["Dans la boîte de chocolats de", "vides"], ["Sur la grille de bataille navale de", "touchées"],
      ["Dans le bac à glaçons de", "remplies"], ["Sur la mosaïque de", "posées"], ["Sur le calendrier de", "cochées"],
    ] as const);
    const text = tirer([
      `${lieu[0].replace(/ de$/, "")} ${deP(P)}, les cases coloriées sont ${lieu[1]}. Quelle fraction des cases est ${lieu[1].replace(/es$/, "e")} ?`,
      `${lieu[0].replace(/ de$/, "")} ${deP(P)}, on colorie les cases ${lieu[1]}. Quelle fraction de toutes les cases cela fait-il ?`,
    ]);
    return qcm(text, `${n}/${total}`, [`${total}/${n}`, `${n}/${total - n}`, `${total - n}/${total}`, `${n}/${rows}`, `${n}/${cols}`, `${n + 1}/${total}`],
      exp("Une grille de cases égales représente un tout.", "On compte les cases coloriées (en haut) et toutes les cases (en bas).",
        `${rows} × ${cols} = ${total} cases, dont ${n} coloriées.`, `La fraction est ${n}/${total}.`),
      { canvas: { kind: "fraction", model: "grid", grid: { rows, cols, shaded: n }, display: { showFraction: false } } as any });
  }),

  gabarit("cm2_fraction_representer_tpl_4_non_colorie", "fraction_representer", 2, "Les parts blanches : toutes les parts moins les parts coloriées.", ["representer", "complement"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS), d = tirer([3, 4, 5, 6, 8, 10]), n = entre(1, d - 1);
    const text = tirer([
      cadre(P, `Quelle fraction ${O.du} n’est PAS coloriée ?`),
      `${P.p} ${O.pc} les ${O.parts} ${colories(O)}. Quelle fraction ${O.du} reste-t-il ?`,
      `Sur la figure, ${P.p} ${O.pc} les ${O.parts} ${colories(O)}. Quelle fraction ${O.du} n’a-t-${il(P)} pas encore touchée ?`,
      `Il ne reste à ${P.p} que les ${O.parts} ${blanches(O)} ${O.du}. Quelle fraction ${O.du} est-ce ?`,
    ]);
    return qcm(text, `${d - n}/${d}`, [`${n}/${d}`, `${d - n}/${n}`, `${n}/${d - n}`, `${d}/${d - n}`, `${d - n + 1}/${d}`],
      exp("Le tout, ce sont toutes les parts.", "On compte les parts NON coloriées, sur le nombre total de parts.", `${d} − ${n} = ${d - n} ${O.parts} ${blanches(O)} sur ${d}.`, `La fraction est ${d - n}/${d}.`),
      { canvas: figure(O.modele, n, d) as any });
  }),

  gabarit("cm2_fraction_representer_tpl_8_bande_double", "fraction_representer", 3, "Cherche d’abord combien de parts fait 1/… du tout.", ["representer", "equivalence"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS), d = tirer([2, 3, 4, 5]), k = tirer(d === 5 ? [2, 3] : [2, 3, 4]), n = entre(1, d - 1);
    const D = d * k, N = n * k, Un = `${O.un.charAt(0).toUpperCase()}${O.un.slice(1)}`;
    const text = tirer([
      `${Un} est ${partage(O)} en ${D} ${O.parts} ${O.egales}. ${P.p} veut ${infinitif(O)} ${n}/${d} ${O.du}. Combien de ${O.parts} cela fait-il ?`,
      `${P.p} ${O.pc} ${n}/${d} ${O.du}, ${partage(O)} en ${D} ${O.parts} ${O.egales}. Combien de ${O.parts} cela représente-t-il ?`,
      `Sur la figure, ${O.le} a ${D} ${O.parts} ${O.egales}. Combien faut-il en colorier pour montrer ${n}/${d} ${O.du} ?`,
    ]);
    return qcm(text, String(N), [String(n), String(n + D - d), String(D - N), String(d), String(N + 1), String(N - 1)],
      exp(`1/${d} ${O.du}, c’est une part sur ${d} : il faut regrouper les ${D} ${O.parts} par paquets égaux.`, "On cherche combien de petites parts font 1/… du tout, puis on multiplie par le numérateur.",
        `${D} ÷ ${d} = ${k}, donc 1/${d} = ${k} ${O.parts} ; ${n} × ${k} = ${N}. Ainsi ${n}/${d} = ${N}/${D}.`, `Cela fait ${N} ${O.parts}.`),
      { canvas: figure(O.modele, 0, D) as any });
  }),

  gabarit("cm2_fraction_representer_tpl_9_plus_simple", "fraction_representer", 3, "Regroupe les parts par paquets égaux : on divise le haut ET le bas par le même nombre.", ["representer", "simplifier"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS);
    let d = 2, n = 1;
    do { d = tirer([2, 3, 4, 5, 6]); n = entre(1, d - 1); } while (pgcd(n, d) !== 1);
    const k = tirer(d >= 5 ? [2, 3] : [2, 3, 4]), D = d * k, N = n * k;
    const text = tirer([
      `${P.p} ${O.pc} ${N}/${D} ${O.du}. Quelle fraction plus simple dit la même chose ?`,
      `La partie coloriée vaut ${N}/${D} ${O.du}. Avec moins de ${O.parts}, quelle fraction lui est égale ?`,
      `${P.p} veut écrire ${N}/${D} avec des nombres plus petits. Quelle fraction est égale à ${N}/${D} ?`,
      `Sur la figure, ${P.p} regroupe les ${O.parts} par ${k}. Quelle fraction ${O.du} est coloriée ?`,
    ]);
    const leurres = [`${n}/${D}`, `${N}/${d}`, `${N - 1}/${D - 1}`, `${d}/${n}`];
    if (N > 2) leurres.push(`${N - 2}/${D - 2}`);
    return qcm(text, `${n}/${d}`, leurres,
      exp("Deux fractions sont égales quand elles représentent la même part du tout.", "On divise le numérateur ET le dénominateur par le même nombre (jamais en enlevant le même nombre en haut et en bas).",
        `${N} ÷ ${k} = ${n} et ${D} ÷ ${k} = ${d}, donc ${N}/${D} = ${n}/${d}.`, `La fraction plus simple est ${n}/${d}.`),
      { canvas: figure(O.modele, N, D) as any });
  }),
];
