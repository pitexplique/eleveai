// CM2 · fraction_droite — gabarits à phrases variées (25/10/2026, voir fractions-gabarits-outils.ts).
// Leurres : compter les TRAITS au lieu des intervalles (3/5 lu 3/6), oublier
// l'unité déjà passée (7/4 lu 3/4), et « 7/4 est entre 7 et 8 ».

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, deuxPrenoms, tirer, entre, il, exp, qcm, gabarit, droite, deP, cadre } from "./fractions-gabarits-outils";
import type { Prenom } from "./fractions-gabarits-outils";

const e = (k: number) => (k === 1 ? "1er" : `${k}e`);
/** Un trajet de 0 à 1 : la phrase qui le pose, puis « du trajet ». */
const TRAJETS: ((P: Prenom, d: number) => [string, string])[] = [
  (P, d) => [`Le chemin de l’école ${deP(P)} va de la maison (0) à l’école (1). Il est partagé en ${d} parts égales.`, "du chemin"],
  (P, d) => [`Le sentier de randonnée ${deP(P)} va du parking (0) au sommet (1), partagé en ${d} parts égales.`, "du sentier"],
  (P, d) => [`La course ${deP(P)} va du départ (0) à l’arrivée (1), partagée en ${d} parts égales.`, "de la course"],
  (P, d) => [`La piste cyclable que prend ${P.p} va de la mairie (0) au parc (1), partagée en ${d} parts égales.`, "de la piste"],
  (P, d) => [`${P.p} nage une longueur de bassin, d’un bord (0) à l’autre (1). Le bassin est partagé en ${d} parts égales.`, "de la longueur"],
  (P, d) => [`La tyrolienne du parc d’aventure va de la plateforme de départ (0) à l’arrivée (1). ${P.p} la voit partagée en ${d} parts égales.`, "de la tyrolienne"],
  (P, d) => [`Le trajet en bus ${deP(P)} va de l’arrêt du village (0) à la piscine (1), partagé en ${d} parts égales.`, "du trajet"],
  (P, d) => [`La frise de la classe ${deP(P)} va de 0 à 1 et elle est partagée en ${d} parts égales.`, "de la frise"],
  (P, d) => [`Sur la droite graduée du cahier ${deP(P)}, l’unité (de 0 à 1) est partagée en ${d} parts égales.`, "de l’unité"],
  (P, d) => [`Le parcours du cross ${deP(P)} va du gymnase (0) au stade (1), partagé en ${d} parts égales.`, "du parcours"],
];
const trajet = (P: Prenom, d: number) => tirer(TRAJETS)(P, d);
const leurresPoint = (n: number, d: number) => [`${n}/${d + 1}`, `${n + 1}/${d}`, `${d}/${n}`, `${n}/${d - 1}`, `${n - 1 || n + 2}/${d}`];
const TOURS = [["tour de piste", "tours de piste", "couru"], ["longueur de bassin", "longueurs de bassin", "nagé"], ["kilomètre", "kilomètres", "marché"], ["tour de cour", "tours de cour", "fait à vélo"]] as const;

export const fractionsGabaritsDroite: TutorBankItemV4[] = [
  gabarit("cm2_fraction_droite_tpl_1_unite", "fraction_droite", 1, "Le dénominateur dit en combien de parts on partage l’unité ; le numérateur, combien de parts on avance.", ["droite", "placer"], () => {
    const P = tirer(PRENOMS), d = tirer([2, 3, 4, 5, 6, 8, 10]), n = entre(1, d - 1);
    const [pose, du] = trajet(P, d);
    const q = tirer([`${P.p} s’arrête aux ${n}/${d} ${du}. À quel trait est-${il(P)} ?`, `À quel trait se place ${n}/${d} ?`, `${P.p} veut marquer ${n}/${d} ${du}. Sur quel trait le met-${il(P)} ?`]);
    return qcm(cadre(P, `${pose} ${q}`), `au ${e(n)} trait après 0`, [`au ${e(d)} trait après 0`, `au ${e(d - n)} trait après 0`, `au ${e(n + 1)} trait après 0`, "sur 0"].filter((x) => x !== `au ${e(n)} trait après 0`),
      exp("Pour placer une fraction entre 0 et 1, on partage l’unité en parts égales.", "Le dénominateur donne le nombre de parts, le numérateur le nombre de parts dont on avance depuis 0.",
        `${n}/${d} : on avance de ${n} part${n > 1 ? "s" : ""} sur ${d}.`, `${n}/${d} est au ${e(n)} trait après 0.`),
      { canvas: droite(d, 1, []) as any });
  }),

  gabarit("cm2_fraction_droite_tpl_7_lire_point", "fraction_droite", 1, "Compte les PARTS (les espaces) entre 0 et 1, pas les traits.", ["droite", "lire"], () => {
    const P = tirer(PRENOMS), d = tirer([2, 3, 4, 5]), n = entre(1, d - 1);
    const [pose, du] = trajet(P, d);
    const q = tirer([`Le point rouge montre où est ${P.p}. Quelle fraction ${du} a-t-${il(P)} faite ?`, `Quelle fraction marque le point rouge ?`, `${P.p} a posé un point rouge. Quelle fraction ${du} montre-t-il ?`]);
    return qcm(cadre(P, `${pose} ${q}`), `${n}/${d}`, leurresPoint(n, d),
      exp("Un point de la droite graduée peut représenter une fraction.", "On compte les parts égales de 0 à 1 (le bas), puis les parts de 0 au point (le haut).",
        `${d} parts dans l’unité, le point est à ${n} part${n > 1 ? "s" : ""} de 0.`, `Le point marque ${n}/${d}.`),
      { canvas: droite(d, 1, [{ value: n / d, label: "?" }]) as any });
  }),

  gabarit("cm2_fraction_droite_tpl_2_valeur_position", "fraction_droite", 2, "Compte les parts égales entre 0 et 1, puis celles de 0 au point.", ["droite", "lire"], () => {
    const P = tirer(PRENOMS), d = tirer([4, 5, 6, 8, 10, 12]), n = entre(1, d - 1);
    const [pose, du] = trajet(P, d);
    const q = tirer([
      `Le point rouge montre où ${P.p} s’est arrêté${P.f ? "e" : ""}. Quelle fraction ${du} a-t-${il(P)} parcourue ?`,
      `${P.p} est au ${e(n)} trait après 0. Quelle fraction ${du} a-t-${il(P)} faite ?`,
      `Quelle fraction ${du} le point rouge représente-t-il ?`,
    ]);
    return qcm(cadre(P, `${pose} ${q}`), `${n}/${d}`, leurresPoint(n, d),
      exp("Un point de la droite graduée peut représenter une fraction.", "Le bas : le nombre de parts égales de l’unité. Le haut : le nombre de parts de 0 au point.",
        `${d} parts, le point est à ${n} part${n > 1 ? "s" : ""} de 0.`, `C’est ${n}/${d}.`),
      { canvas: droite(d, 1, [{ value: n / d, label: "?" }]) as any });
  }),

  gabarit("cm2_fraction_droite_tpl_8_milieu", "fraction_droite", 2, "Le milieu de 0 et 1, c’est la moitié des parts.", ["droite", "milieu", "equivalence"], () => {
    const [P, Q] = deuxPrenoms(), d = tirer([4, 6, 8, 10, 12]), m = d / 2;
    const [pose, du] = trajet(P, d);
    const q = tirer([
      `${P.p} s’arrête pile au milieu ${du}. Quelle fraction ${du} a-t-${il(P)} faite ?`,
      `${Q.p} attend ${P.p} à mi-chemin. Quelle fraction ${du} marque cet endroit ?`,
      `Quelle fraction se place exactement au milieu entre 0 et 1 ?`,
    ]);
    return qcm(cadre(P, `${pose} ${q}`), `${m}/${d}`, [`1/${d}`, `2/${d}`, `${m + 1}/${d}`, `${m}/${d + 1}`, `${d}/${m}`],
      exp("Le milieu entre 0 et 1, c’est la moitié de l’unité.", `L’unité a ${d} parts égales : la moitié, c’est ${d} ÷ 2 = ${m} parts.`,
        `${m}/${d}, c’est aussi 1/2.`, `Au milieu, on lit ${m}/${d}.`),
      { canvas: droite(d, 1, [{ value: 0.5, label: "?" }]) as any });
  }),

  gabarit("cm2_fraction_droite_tpl_3_superieur_un", "fraction_droite", 3, "Compte toutes les parts depuis 0, même après 1.", ["droite", "superieur_un"], () => {
    const P = tirer(PRENOMS), d = tirer([2, 3, 4, 5]), max = tirer([2, 3]);
    let n = 0;
    do n = entre(d + 1, max * d - 1); while (n % d === 0);
    const [un, des, fait] = tirer(TOURS);
    const text = tirer([
      `${P.p} a ${fait} jusqu’au point rouge. Chaque ${un} est partagé en ${d} parts égales. Combien de ${des} a-t-${il(P)} ${fait.split(" ")[0]} ?`,
      cadre(P, `Sur cette droite, chaque unité est partagée en ${d} parts égales. Quelle fraction marque le point rouge ?`),
      `L’entraîneur note où s’arrête ${P.p} : le point rouge. L’unité est 1 ${un}, partagé en ${d} parts égales. Quelle fraction lit-il ?`,
    ]);
    return qcm(text, `${n}/${d}`, [`${n - d}/${d}`, `${n}/${d + 1}`, `${n + 1}/${d}`, `${d}/${n}`, `${n - 1}/${d}`],
      exp("Une fraction peut être plus grande que 1 : on continue de compter les parts après 1.", `Chaque unité a ${d} parts : à 1 on en a déjà ${d}, à 2 on en a ${2 * d}.`,
        `Du 0 au point rouge, on compte ${n} parts de 1/${d}.`, `Le point marque ${n}/${d}.`),
      { canvas: droite(d, max, [{ value: n / d, label: "?" }]) as any });
  }),

  gabarit("cm2_fraction_droite_tpl_9_avant_apres_un", "fraction_droite", 3, "Compare le numérateur au dénominateur.", ["droite", "comparer_un"], () => {
    const P = tirer(PRENOMS), d = tirer([2, 3, 4, 5, 6, 8]);
    const cas = tirer(["avant", "sur", "apres", "apres"] as const);
    const n = cas === "avant" ? entre(1, d - 1) : cas === "sur" ? d : d + entre(1, d - 1);
    const [un, , fait] = tirer(TOURS);
    const bonne = cas === "avant" ? "avant 1" : cas === "sur" ? "sur 1" : "après 1";
    const text = tirer([
      cadre(P, `La fraction ${n}/${d} se place-t-elle avant 1, sur 1 ou après 1 ?`),
      `${P.p} a ${fait} ${n}/${d} de ${un}. Sur la droite graduée, où se place ce point ?`,
      `${P.p} doit placer ${n}/${d} sur une droite où chaque unité a ${d} parts égales. Où va le point ?`,
    ]);
    return qcm(text, bonne, ["avant 1", "sur 1", "après 1", "sur 0"],
      exp("1 = " + `${d}/${d}` + " : toutes les parts d’une unité.", "Numérateur plus petit que le dénominateur : avant 1 ; égal : sur 1 ; plus grand : après 1.",
        `${n} ${n < d ? "<" : n === d ? "=" : ">"} ${d}.`, `${n}/${d} se place ${bonne}.`),
      { canvas: droite(d, 2, []) as any });
  }),

  gabarit("cm2_fraction_droite_tpl_5_entre_entiers", "fraction_droite", 4, "Combien de fois le dénominateur tient-il dans le numérateur ?", ["droite", "entre_entiers"], () => {
    const P = tirer(PRENOMS), d = tirer([2, 3, 4, 5, 6]);
    let n = 0;
    do n = entre(d + 1, 4 * d - 1); while (n % d === 0);
    const q = Math.floor(n / d);
    const [un, des, fait] = tirer(TOURS);
    const bonne = `entre ${q} et ${q + 1}`;
    const text = tirer([
      cadre(P, `Entre quels nombres entiers se place la fraction ${n}/${d} ?`),
      `${P.p} a ${fait} ${n}/${d} de ${un}. Entre combien de ${des} entiers est-${il(P)} ?`,
      `Sur la droite graduée ${deP(P)}, chaque unité a ${d} parts égales. Entre quels entiers se trouve ${n}/${d} ?`,
    ]);
    return qcm(text, bonne, [`entre ${n} et ${n + 1}`, `entre ${q - 1} et ${q}`, `entre ${q + 1} et ${q + 2}`, `entre ${d} et ${d + 1}`].filter((x) => x !== bonne),
      exp("Chaque entier est une fraction : 1 = " + `${d}/${d}, 2 = ${2 * d}/${d}, 3 = ${3 * d}/${d}.`, "On cherche entre quels multiples du dénominateur tombe le numérateur.",
        `${q * d} < ${n} < ${(q + 1) * d}, donc ${q} < ${n}/${d} < ${q + 1}.`, `${n}/${d} est ${bonne}.`),
      { canvas: droite(d, q + 1 <= 3 ? 4 : q + 1, []) as any });
  }),

  gabarit("cm2_fraction_droite_tpl_6_piege_mauvais_partage", "fraction_droite", 4, "Le dénominateur dit en combien de parts égales partager CHAQUE unité.", ["droite", "piege"], () => {
    const [P, Q] = deuxPrenoms(), d = tirer([3, 4, 5, 6, 8]);
    let n = 0;
    do n = entre(1, 2 * d - 1); while (n === d);
    if (Math.random() < 0.5) {
      const text = tirer([
        `${P.p} veut placer ${n}/${d} sur une droite graduée. En combien de parts égales doit-${il(P)} partager chaque unité ?`,
        `Pour placer ${n}/${d}, ${P.p} prépare sa droite. Combien de parts égales met-${il(P)} entre 0 et 1 ?`,
      ]);
      return qcm(text, String(d), [String(n), String(n + d), String(d + 1), String(10)],
        exp("Pour placer une fraction, on partage chaque unité en autant de parts que le dénominateur.", "Le numérateur dit ensuite combien de parts on avance depuis 0.", `${n}/${d} : ${d} parts par unité, on avance de ${n}.`, `Il faut ${d} parts égales.`),
        { canvas: droite(1, 2, []) as any });
    }
    const text = tirer([
      `Pour placer ${n}/${d}, ${P.p} partage l’unité en ${n} parts égales. ${Q.p} n’est pas d’accord. Qui a raison ?`,
      `${P.p} place ${n}/${d} en partageant chaque unité en ${n} parts. ${Q.p} dit qu’il faut ${d} parts. Qui a raison ?`,
    ]);
    return qcm(text, `${Q.p}, il faut ${d} parts`, [`${P.p}, il faut ${n} parts`, `${Q.p}, il faut ${n + d} parts`, `${P.p}, il faut ${d + 1} parts`],
      exp("Le dénominateur donne le partage de chaque unité.", `${n}/${d} : on partage en ${d} parts égales, pas en ${n}.`, `On avance ensuite de ${n} parts de 1/${d}.`, `${Q.p} a raison : il faut ${d} parts.`),
      { canvas: droite(d, 2, [{ value: n / d, label: `${n}/${d}` }]) as any });
  }),
];
