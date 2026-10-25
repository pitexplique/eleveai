// CM2 · fraction_lire — gabarits à phrases variées (25/10/2026, voir fractions-gabarits-outils.ts).
// Les ids des anciens gabarits figés sont repris : seule la phrase s'est élargie.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  OBJETS, PRENOMS, tirer, entre, il, Il, exp, qcm, gabarit, figure,
  fractionEnMots, ordinalFaux, nombreEnMots, aUnNom, pluriel, cadre,
} from "./fractions-gabarits-outils";

const DENS = [2, 3, 4, 5, 6, 8, 10];
const feminin = (le: string) => le.startsWith("la ");
const jai = (pc: string) => pc.replace(/^a /, "J’ai ");
const prises = (O: { egales: string }) => (O.egales === "égales" ? "prises" : "pris");

/** Une situation tirée : un prénom, un objet, une fraction n/d avec n < d. */
function situation(dens = DENS) {
  const P = tirer(PRENOMS), O = tirer(OBJETS), d = tirer(dens), n = entre(1, d - 1);
  return { P, O, d, n, f: `${n}/${d}` };
}

export const fractionsGabaritsLire: TutorBankItemV4[] = [
  gabarit("cm2_fraction_lire_tpl_1_numerateur", "fraction_lire", 1, "Le numérateur est le nombre du haut : il compte les parts prises.", ["lire", "numerateur"], () => {
    const { P, O, d, n, f } = situation([3, 4, 5, 6, 7, 8, 9, 10]);
    const text = tirer([
      cadre(P, `Dans la fraction ${f}, quel nombre est le numérateur ?`),
      `${P.p} écrit ${f} sur son ardoise. Quel est le numérateur de cette fraction ?`,
      `${P.p} ${O.pc} ${f} ${O.du}. Quel est le numérateur de cette fraction ?`,
      `${P.p} partage ${O.un} en ${d} ${O.parts} ${O.egales} et en ${O.verbe} ${n}. On écrit ${f}. Quel est le numérateur ?`,
      `${P.p} ${O.pc} ${f} ${O.du}. Quel nombre de la fraction compte les ${O.parts} ${prises(O)} ?`,
    ]);
    return qcm(text, String(n), [String(d), String(n + d), String(d - n), String(n + 1)],
      exp("Le numérateur est le nombre écrit au-dessus de la barre de fraction.", "Il compte les parts prises ; le dénominateur, en dessous, dit en combien de parts égales on a partagé.",
        `Dans ${f}, le nombre du haut est ${n}.`, `Le numérateur est ${n}.`),
      { canvas: figure(O.modele, n, d) as any });
  }),

  gabarit("cm2_fraction_lire_tpl_2_denominateur", "fraction_lire", 1, "Le dénominateur est le nombre du bas : il dit en combien de parts égales on a partagé.", ["lire", "denominateur"], () => {
    const { P, O, d, n, f } = situation([3, 4, 5, 6, 7, 8, 9, 10]);
    const partage = feminin(O.le) ? "partagée" : "partagé";
    const text = tirer([
      cadre(P, `Dans la fraction ${f}, quel nombre est le dénominateur ?`),
      `${P.p} lit ${f} dans son cahier. Quel est le dénominateur de cette fraction ?`,
      `${P.p} ${O.pc} ${f} ${O.du}. Quel nombre dit en combien de ${O.parts} ${O.egales} ${O.le} est ${partage} ?`,
      `${P.p} partage ${O.un} en ${d} ${O.parts} ${O.egales} et en ${O.verbe} ${n}. On écrit ${f}. Quel est le dénominateur ?`,
      `${P.p} ${O.pc} ${f} ${O.du}. Quel est le dénominateur de cette fraction ?`,
    ]);
    return qcm(text, String(d), [String(n), String(n + d), String(d - n), String(d + 1)],
      exp("Le dénominateur est le nombre écrit sous la barre de fraction.", "Il dit en combien de parts égales le tout est partagé.",
        `Dans ${f}, le nombre du bas est ${d}.`, `Le dénominateur est ${d}.`),
      { canvas: figure(O.modele, n, d) as any });
  }),

  gabarit("cm2_fraction_lire_tpl_6_en_mots", "fraction_lire", 1, "2 : demis, 3 : tiers, 4 : quarts ; ensuite cinquièmes, sixièmes…", ["lire", "mots"], () => {
    const { P, O, d, n, f } = situation();
    const bonne = fractionEnMots(n, d);
    const text = tirer([
      cadre(P, `Comment se lit la fraction ${f} ?`),
      `${P.p} lit à voix haute la fraction ${f}. Que dit-${il(P)} ?`,
      `${P.p} ${O.pc} ${f} ${O.du}. Comment dit-on cette fraction ?`,
      `Sur la recette, ${P.p} voit écrit ${f}. Comment lit-${il(P)} cette fraction ?`,
    ]);
    const leurres = [ordinalFaux(n, d), `${nombreEnMots(n)} ${nombreEnMots(d)}`];
    if (n >= 2 && aUnNom(n)) leurres.push(fractionEnMots(d, n));
    leurres.push(fractionEnMots(n + 1 < d ? n + 1 : n - 1 || 1, d));
    const autre = DENS.filter((x) => x !== d && x > n);
    if (autre.length) leurres.push(fractionEnMots(n, tirer(autre)));
    return qcm(text, bonne, leurres.filter((l) => l !== bonne),
      exp("Une fraction se lit : le numérateur, puis le nom du dénominateur.", "On dit demi pour 2, tiers pour 3, quart pour 4, puis cinquième, sixième… (jamais « quatrième » pour 4).",
        `${f} : ${nombreEnMots(n)}, puis le nom de ${d}.`, `${f} se lit « ${bonne} ».`));
  }),

  gabarit("cm2_fraction_lire_tpl_3_sens", "fraction_lire", 2, "Le bas dit en combien de parts égales on partage, le haut combien on en prend.", ["lire", "sens"], () => {
    const { P, O, d, n, f } = situation([3, 4, 5, 6, 8, 10]);
    const partage = feminin(O.le) ? "partagée" : "partagé";
    const leTout = O.le.charAt(0).toUpperCase() + O.le.slice(1);
    const parts = `${leTout} est ${partage} en`;
    const sur = tirer(["haut", "bas"] as const);
    const bonne = sur === "bas" ? `${parts} ${d} ${O.parts} ${O.egales}` : `${Il(P)} en ${O.pc} ${n}`;
    const leurres = sur === "bas"
      ? [`${Il(P)} en ${O.pc} ${d}`, `Il en reste ${d}`, ...(n > 1 ? [`${parts} ${n} ${O.parts} ${O.egales}`] : [`${Il(P)} en ${O.pc} ${d - 1}`])]
      : [`${Il(P)} en ${O.pc} ${d}`, ...(n > 1 ? [`${parts} ${n} ${O.parts} ${O.egales}`] : []), ...(2 * n !== d ? [`Il en reste ${n}`] : []), `Il en reste ${d}`];
    const x = sur === "bas" ? d : n;
    const text = tirer([
      `${P.p} ${O.pc} ${f} ${O.du}. Que veut dire le nombre ${x} du ${sur} ?`,
      `« ${jai(O.pc)} ${f} ${O.du} », dit ${P.p}. Que signifie le ${x} écrit en ${sur} ?`,
      `${P.p} ${O.pc} les ${f} ${O.du}. Dans cette fraction, que nous apprend le ${x} ?`,
    ]);
    return qcm(text, bonne, leurres,
      exp("Une fraction décrit un tout partagé en parts égales.", "Le dénominateur (en bas) dit en combien de parts égales ; le numérateur (en haut) dit combien on en prend.",
        `${f} : ${d} ${O.parts} ${O.egales}, ${n} ${O.parts} ${prises(O)}.`, `Le ${x} veut dire : ${bonne.charAt(0).toLowerCase()}${bonne.slice(1)}.`),
      { canvas: figure(O.modele, n, d) as any });
  }),

  gabarit("cm2_fraction_lire_tpl_7_dictee", "fraction_lire", 2, "Le nombre dit en premier va en haut ; le nom (tiers, quarts…) donne le bas.", ["lire", "ecrire"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS), d = tirer([2, 3, 4, 5, 6, 7, 8, 9, 10, 12]), n = entre(1, d - 1);
    const mots = fractionEnMots(n, d), bonne = `${n}/${d}`;
    const text = tirer([
      `${P.p} dit : « ${jai(O.pc)} ${mots} ${O.du}. » Quelle fraction écrit-on ?`,
      cadre(P, `Écris en chiffres la fraction « ${mots} ».`),
      `La maîtresse dicte « ${mots} ». Qu’écrit ${P.p} sur son ardoise ?`,
      `${P.p} ${O.pc} ${mots} ${O.du}. Quelle fraction ${O.du} a-t-${il(P)} ${O.pp} ?`,
    ]);
    return qcm(text, bonne, [`${d}/${n}`, `${n}/${d + 1}`, `${n + 1 < d ? n + 1 : n + 2}/${d}`, `${n}/${d * 10}`],
      exp("« Un tiers », « trois quarts », « cinq huitièmes » sont des fractions dites avec des mots.", "Le premier mot (le nombre) va en haut ; le nom (demis, tiers, quarts, cinquièmes…) donne le dénominateur.",
        `« ${mots} » : ${n} en haut, ${d} en bas.`, `On écrit ${bonne}.`));
  }),

  gabarit("cm2_fraction_lire_tpl_5_comparer_a_un", "fraction_lire", 3, "Compare le numérateur et le dénominateur : en haut plus petit, moins d’un tout.", ["lire", "comparer_un"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS), d = tirer([2, 3, 4, 5, 6, 8, 10]);
    const cas = tirer(["inf", "egal", "sup", "sup"] as const);
    const n = cas === "inf" ? entre(1, d - 1) : cas === "egal" ? d : d + entre(1, d);
    const f = `${n}/${d}`, nu = O.un.replace(/^une? /, ""), pm = O.pc.slice(2);
    if (Math.random() < 0.25) {
      const bonne = cas === "inf" ? "plus petite que 1" : cas === "egal" ? "égale à 1" : "plus grande que 1";
      return qcm(cadre(P, `La fraction ${f} est-elle plus petite que 1, égale à 1 ou plus grande que 1 ?`), bonne, ["plus petite que 1", "égale à 1", "plus grande que 1"],
        exp("Une fraction vaut 1 quand le haut et le bas sont égaux.", "On compare le numérateur au dénominateur.", `${n} et ${d} : on compare.`, `${f} est ${bonne}.`));
    }
    const moins = `moins d’${O.un}`, juste = `exactement ${O.un}`, plus = `plus d’${O.un}`;
    const bonne = cas === "inf" ? moins : cas === "egal" ? juste : plus;
    const text = tirer([
      `${P.p} ${O.pc} ${f} de ${nu}, avec des ${pluriel(O)} de même taille. A-t-${il(P)} ${pm} moins d’${O.un}, exactement ${O.un} ou plus d’${O.un} ?`,
      `${P.p} ${O.pc} ${f} de ${nu} (des ${pluriel(O)} de même taille). Combien en a-t-${il(P)} ${pm} ?`,
      `Pour la fête de l’école, ${P.p} ${O.pc} ${f} de ${nu} ; les ${pluriel(O)} sont de même taille. Qu’a-t-${il(P)} ${pm} ?`,
    ]);
    return qcm(text, bonne, [moins, juste, plus],
      exp(`${O.un.charAt(0).toUpperCase()}${O.un.slice(1)} entier${O.un.startsWith("une") ? "e" : ""} partagé${O.un.startsWith("une") ? "e" : ""} en ${d} ${O.parts}, c’est ${d}/${d}.`,
        "On compare le numérateur (les parts prises) au dénominateur (les parts d’un tout).",
        `${n} ${n < d ? "<" : n === d ? "=" : ">"} ${d}.`, `${P.p} ${O.pc} ${bonne}.`));
  }),

  gabarit("cm2_fraction_lire_tpl_8_unite", "fraction_lire", 3, "Le tout entier, c’est toutes les parts : d/d = 1.", ["lire", "unite", "complement"], () => {
    const P = tirer(PRENOMS), O = tirer(OBJETS), d = tirer([3, 4, 5, 6, 8, 10, 12]), n = entre(1, d - 1);
    const fem = feminin(O.le), tout = fem ? "toute" : "tout";
    if (Math.random() < 0.5) {
      const text = tirer([
        `${P.p} partage ${O.un} en ${d} ${O.parts} ${O.egales} et ${O.verbe} ${tout} ${O.le}. Quelle fraction ${O.du} a-t-${il(P)} ${O.pp} ?`,
        `${O.un.charAt(0).toUpperCase()}${O.un.slice(1)} est ${fem ? "partagée" : "partagé"} en ${d} ${O.parts} ${O.egales}. ${P.p} ${O.pc} ${tout} ${O.le}. Quelle fraction écrit-on ?`,
        `${P.p} ${O.pc} les ${d} ${O.parts} ${O.du}. Quelle fraction ${O.du} cela fait-il ?`,
      ]);
      return qcm(text, `${d}/${d}`, [`1/${d}`, `${d - 1}/${d}`, `${d}/1`, `${d + 1}/${d}`],
        exp("Le tout entier, ce sont toutes les parts.", `${d} ${O.parts} sur ${d} : le numérateur égale le dénominateur.`, `${d}/${d} = 1.`, `La fraction est ${d}/${d}.`),
        { canvas: figure(O.modele, d, d) as any });
    }
    const text = tirer([
      `${P.p} partage ${O.un} en ${d} ${O.parts} ${O.egales} et en ${O.verbe} ${n}. Quelle fraction ${O.du} reste-t-il ?`,
      `${P.p} ${O.pc} ${n}/${d} ${O.du}. Quelle fraction ${O.du} reste-t-il ?`,
      `${P.p} ${O.pc} ${n}/${d} ${O.du}. Quelle fraction lui reste-t-il pour finir ${O.le} ?`,
    ]);
    return qcm(text, `${d - n}/${d}`, [`${n}/${d}`, `${d}/${d - n}`, `${d - n}/${n}`, `1/${d}`, `${d - n}/${d + n}`],
      exp(`Le tout entier vaut ${d}/${d}.`, `On enlève les ${n} ${O.parts} prises aux ${d} ${O.parts}.`, `${d} − ${n} = ${d - n}, donc ${d}/${d} − ${n}/${d} = ${d - n}/${d}.`, `Il reste ${d - n}/${d} ${O.du}.`),
      { canvas: figure(O.modele, n, d) as any });
  }),
];
