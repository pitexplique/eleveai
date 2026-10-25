// Générateurs CM1 : comparer, fractions égales (25/10/2026).
// ⭐ Frédéric voit sur les copies que les élèves ne savent pas SIMPLIFIER : ici on
// le prépare sur FIGURE (regrouper les parts, 2/4 = 1/2), sans règle abstraite.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  aliment, choix, debut, deuxBarres, deuxEnfants, enfant, entier, exp, figure, fr, gabarit, grille, il, MAJ,
  nomParts, pgcd, tIl, tirer,
} from "./fractions-gabarits-outils";

const IDENTIQUES: [string, string][] = [
  ["d’une tarte", "a mangé"], ["d’une pizza", "a mangé"], ["d’un gâteau", "a mangé"], ["d’une tablette de chocolat", "a mangé"],
  ["d’un ruban", "a utilisé"], ["d’une bande de papier", "a colorié"], ["d’un livre", "a lu"], ["d’un puzzle", "a fait"],
  ["d’une frise", "a colorié"], ["d’un tour de piste", "a couru"], ["d’une gourde", "a bu"], ["d’une galette", "a pris"],
];

const comparer2: TutorBankItemV4[] = [
  gabarit("cm1_fraction_comparer_tpl_151_qui_plus", "fraction_comparer", 2, "Même dénominateur : les parts ont la même taille. Celui qui a le plus de parts a le plus.", ["comparer", "qcm", "canvas"], () => {
    const d = tirer([4, 5, 6, 8, 10]);
    let a = entier(1, d - 1);
    let b = entier(1, d - 1);
    while (b === a) b = entier(1, d - 1);
    const [x, y] = deuxEnfants();
    const [quoi, v] = tirer(IDENTIQUES);
    const tournures = [
      `${x.p} ${v} ${fr(a, d)} ${quoi}. ${y.p} ${v} ${fr(b, d)} ${quoi} identique. Qui en ${v.replace("a ", "a le plus ")} ?`,
      `${debut()}${x.p} ${v} ${fr(a, d)} ${quoi} et ${y.p} ${fr(b, d)} ${quoi} identique. Qui en a le plus ?`,
      `${x.p} ${v} ${fr(a, d)} ${quoi} ; ${y.p}, ${fr(b, d)} ${quoi.replace(/^d’une? /, (m) => (m === "d’une " ? "d’une autre " : "d’un autre "))} identique. Qui en a le plus ?`,
    ];
    const bon = a > b ? x.p : y.p;
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: [x.p, y.p, "Les deux en ont autant"],
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Quand deux fractions ont le même dénominateur, leurs parts ont la même taille.",
        "On compare les numérateurs : le nombre de parts.",
        `${Math.max(a, b)} parts > ${Math.min(a, b)} parts, donc ${fr(Math.max(a, b), d)} > ${fr(Math.min(a, b), d)}.`,
        `${bon} en a le plus.`,
      ),
      canvas: deuxBarres([a, d], [b, d], [x.p, y.p]),
    };
  }),

  gabarit("cm1_fraction_comparer_tpl_152_signe_figure", "fraction_comparer", 2, "Regarde les deux barres : laquelle est la plus coloriée ?", ["comparer", "qcm", "canvas"], () => {
    const d = tirer([3, 4, 5, 6, 8, 10]);
    const a = entier(1, d - 1);
    const b = Math.random() < 0.2 ? a : entier(1, d - 1);
    const x = enfant();
    const tournures = [
      `Complète avec <, > ou = : ${fr(a, d)} … ${fr(b, d)}`,
      `${x.p} compare ${fr(a, d)} et ${fr(b, d)} sur les barres. Quel signe écrit-${il(x)} : ${fr(a, d)} … ${fr(b, d)} ?`,
      `${debut()}${x.p} doit choisir le bon signe : ${fr(a, d)} … ${fr(b, d)}. Lequel ?`,
    ];
    const bon = a > b ? ">" : a < b ? "<" : "=";
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: ["<", ">", "="],
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Même dénominateur : on compare les numérateurs.",
        "La barre la plus coloriée montre la plus grande fraction.",
        a === b ? `${a} = ${b}.` : `${Math.max(a, b)} > ${Math.min(a, b)}.`,
        `${fr(a, d)} ${bon} ${fr(b, d)}.`,
      ),
      canvas: deuxBarres([a, d], [b, d], [fr(a, d), fr(b, d)]),
    };
  }),
];

const comparer34: TutorBankItemV4[] = [
  gabarit("cm1_fraction_comparer_tpl_153_meme_numerateur", "fraction_comparer", 3, "Plus on partage en beaucoup de parts, plus chaque part est petite.", ["comparer", "qcm", "canvas"], () => {
    const [p, q] = [...new Set([tirer([2, 3, 4, 5]), tirer([6, 8, 10, 12])])];
    const n = tirer([1, 1, 2]);
    const [x, y] = deuxEnfants();
    const ob = aliment();
    const xPetit = Math.random() < 0.5;
    const dx = xPetit ? p : q;
    const dy = xPetit ? q : p;
    const tournures = [
      `${debut()}${x.p} reçoit ${fr(n, dx)} ${ob.du} et ${y.p} reçoit ${fr(n, dy)} ${ob.du}. Qui reçoit le plus ?`,
      `${x.p} prend ${fr(n, dx)} ${ob.du}, ${y.p} préfère ${fr(n, dy)} ${ob.du}. Qui a la plus grosse part ?`,
      `${MAJ(ob.le)} est pour ${x.p} et ${y.p}. ${x.p} en veut ${fr(n, dx)}, ${y.p} en veut ${fr(n, dy)}. Qui en aura le plus ?`,
    ];
    const bon = xPetit ? x.p : y.p;
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: [x.p, y.p, "Les deux en ont autant"],
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Même numérateur : on prend le même nombre de parts, mais pas de la même taille.",
        "Plus le dénominateur est grand, plus les parts sont petites.",
        `Des ${nomParts(p, true)} sont plus grands que des ${nomParts(q, true)} : ${fr(n, p)} > ${fr(n, q)}.`,
        `${bon} en a le plus. ⚠️ ${q} > ${p} ne veut pas dire que ${fr(n, q)} est plus grand.`,
      ),
      canvas: deuxBarres([n, dx], [n, dy], [x.p, y.p]),
    };
  }),

  gabarit("cm1_fraction_comparer_tpl_154_a_un", "fraction_comparer", 3, "Une unité entière, c’est quand le numérateur égale le dénominateur.", ["comparer", "qcm", "canvas"], () => {
    const d = tirer([3, 4, 5, 6, 8]);
    const n = tirer([entier(1, d - 1), d, entier(d + 1, 2 * d - 1)]);
    const x = enfant();
    const choixT = ["moins d’une unité", "exactement une unité", "plus d’une unité"];
    const bon = choixT[n < d ? 0 : n === d ? 1 : 2];
    const tournures = [
      `${x.p} a colorié ${fr(n, d)} (chaque barre est une unité). Cela fait :`,
      `${debut()}${x.p} a bu ${fr(n, d)} de gourde. C’est :`,
      `Compare ${fr(n, d)} à 1. La fraction ${fr(n, d)} fait :`,
      `${x.p} a peint ${fr(n, d)} de mur (les murs sont identiques). Cela fait :`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choixT,
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        `1 = ${fr(d, d)}.`,
        "On compare le numérateur au dénominateur.",
        `${n} ${n < d ? "<" : n === d ? "=" : ">"} ${d}.`,
        `${fr(n, d)} fait ${bon}.`,
      ),
      canvas: deuxBarres([Math.min(n, d), d], [Math.max(n - d, 0), d], ["1re unité", "2e unité"]),
    };
  }),

  gabarit("cm1_fraction_comparer_tpl_155_moitie", "fraction_comparer", 4, "Sur la figure, compare à la moitié : la moitié de d parts, c’est d ÷ 2 parts.", ["comparer", "qcm", "canvas", "egalite"], () => {
    const d = tirer([4, 6, 8, 10, 12]);
    const n = tirer([entier(1, d / 2 - 1), d / 2, entier(d / 2 + 1, d - 1)]);
    const x = enfant();
    const ob = aliment();
    const choixT = ["moins de la moitié", "exactement la moitié", "plus de la moitié"];
    const bon = choixT[n < d / 2 ? 0 : n === d / 2 ? 1 : 2];
    const tournures = [
      `${debut()}${x.p} mange ${fr(n, d)} ${ob.du}. A-${tIl(x)} mangé :`,
      `${x.p} colorie ${fr(n, d)} d’une bande. Compare à la moitié (1/2, en haut) : c’est`,
      `${fr(n, d)}, comparé à 1/2, c’est :`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choixT,
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        `La moitié de ${d} parts, c’est ${d} ÷ 2 = ${d / 2} parts : 1/2 = ${fr(d / 2, d)}.`,
        `On compare ${n} à ${d / 2}.`,
        `${n} ${n < d / 2 ? "<" : n === d / 2 ? "=" : ">"} ${d / 2}.`,
        `${fr(n, d)}, c’est ${bon}.`,
      ),
      canvas: deuxBarres([1, 2], [n, d], ["1/2", fr(n, d)]),
    };
  }),

  gabarit("cm1_fraction_comparer_tpl_156_ranger", "fraction_comparer", 4, "Même dénominateur : on range les numérateurs.", ["comparer", "qcm"], () => {
    const d = tirer([5, 6, 8, 10, 12]);
    const ns = new Set<number>();
    while (ns.size < 3) ns.add(entier(1, d - 1));
    const [a, b, c] = [...ns].sort((u, v) => u - v);
    const x = enfant();
    const croissant = Math.random() < 0.6;
    const s = (t: number[]) => t.map((v) => fr(v, d)).join(croissant ? " < " : " > ");
    const bonT = croissant ? [a, b, c] : [c, b, a];
    const bon = s(bonT);
    const leurres = [s([b, a, c]), s([a, c, b]), s([c, a, b]), s([b, c, a]), s(croissant ? [c, b, a] : [a, b, c])];
    const ordre = croissant ? "du plus petit au plus grand" : "du plus grand au plus petit";
    const tournures = [
      `Range ${ordre} : ${fr(b, d)}, ${fr(c, d)}, ${fr(a, d)}.`,
      `${x.p} a lu ${fr(b, d)}, ${fr(a, d)} et ${fr(c, d)} de trois livres identiques. Range ces fractions ${ordre}.`,
      `${debut()}${x.p} range les fractions ${fr(c, d)}, ${fr(a, d)}, ${fr(b, d)} ${ordre}. Quel est le bon rangement ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, leurres),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Même dénominateur : les parts ont la même taille.",
        "On range les numérateurs.",
        croissant ? `${a} < ${b} < ${c}.` : `${c} > ${b} > ${a}.`,
        `${bon}.`,
      ),
    };
  }),
];

/** a/b simple, et k pour l'agrandir (dénominateur ≤ 12, dessinable). */
function simpleEtFacteur() {
  const b = tirer([2, 3, 4, 5, 6]);
  const a = entier(1, b - 1);
  const k = tirer([2, 3, 4].filter((v) => v * b <= 12));
  return { a, b, k };
}

const equivalente: TutorBankItemV4[] = [
  gabarit("cm1_fraction_equivalente_tpl_161_barres", "fraction_equivalente", 3, "Deux fractions sont égales si la longueur coloriée est la même.", ["equivalente", "qcm", "canvas"], () => {
    const { a, b, k } = simpleEtFacteur();
    const cas = tirer(["egal", "egal", "ajoute", "decale"] as const);
    const d = b * k;
    let c = a * k;
    if (cas === "ajoute") c = a + (d - b);
    if (cas === "decale") c = a * k + 1 < d ? a * k + 1 : a * k - 1;
    const oui = c * b === a * d;
    const [x, y] = deuxEnfants();
    const tournures = [
      `Regarde les barres. ${fr(a, b)} et ${fr(c, d)} sont-elles égales ?`,
      `${x.p} colorie ${fr(a, b)} d’une bande, ${y.p} colorie ${fr(c, d)} d’une bande identique. Les deux longueurs coloriées sont-elles égales ?`,
      `${x.p} dit : « ${fr(a, b)} = ${fr(c, d)} ». Regarde les barres : a-${tIl(x)} raison ?`,
      `${debut()}${x.p} mange ${fr(a, b)} d’un cake et ${y.p} ${fr(c, d)} d’un cake pareil. Les deux quantités mangées sont-elles égales ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: ["oui", "non"],
      expected: [oui ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation: exp(
        "Deux fractions égales colorient la même longueur d’une même unité.",
        "On compare les longueurs coloriées des deux barres.",
        oui
          ? `Chaque part de ${fr(1, b)} est coupée en ${k} : ${a} parts deviennent ${c} parts sur ${d}.`
          : `Les longueurs coloriées ne sont pas les mêmes.${cas === "ajoute" ? " Ajouter le même nombre en haut et en bas ne donne pas une fraction égale." : ""}`,
        oui ? `Oui, ${fr(a, b)} = ${fr(c, d)}.` : `Non, ${fr(a, b)} et ${fr(c, d)} ne sont pas égales.`,
      ),
      canvas: deuxBarres([a, b], [c, d], [fr(a, b), fr(c, d)]),
    };
  }),

  gabarit("cm1_fraction_equivalente_tpl_162_trou_figure", "fraction_equivalente", 3, "Chaque part du haut est coupée en plusieurs petites parts : compte-les.", ["equivalente", "short", "canvas"], () => {
    const { a, b, k } = simpleEtFacteur();
    const d = b * k;
    const x = enfant();
    const tournures = [
      `Complète : ${fr(a, b)} = …/${d}. Quel nombre manque ?`,
      `${x.p} a colorié ${fr(a, b)} de la barre du haut. Combien de parts doit-${il(x)} colorier sur la barre du bas (${d} parts) pour la même longueur ?`,
      `${debut()}${x.p} veut écrire ${fr(a, b)} avec des ${nomParts(d, true)}. ${fr(a, b)} = …/${d} : quel est le numérateur ?`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [String(a * k)],
      comparator: "number_equal",
      explanation: exp(
        "Deux fractions égales représentent la même longueur.",
        `Chaque ${nomParts(b, false)} est coupé en ${k} : on multiplie le haut et le bas par ${k}.`,
        `${a} × ${k} = ${a * k} et ${b} × ${k} = ${d}.`,
        `${fr(a, b)} = ${fr(a * k, d)}.`,
      ),
      canvas: deuxBarres([a, b], [0, d], [fr(a, b), `…/${d}`]),
    };
  }),
];

/** Une fraction à simplifier (dessinable) : n/d = a/b avec k = n/a. */
function aSimplifier() {
  const { a, b, k } = simpleEtFacteur();
  return { a, b, k, n: a * k, d: b * k };
}

const equivalente45: TutorBankItemV4[] = [
  gabarit("cm1_fraction_equivalente_tpl_163_regrouper", "fraction_equivalente", 4, "Regroupe les parts par paquets égaux : compte les paquets coloriés et les paquets en tout.", ["equivalente", "qcm", "canvas", "simplifier"], () => {
    const { a, b, k, n, d } = aSimplifier();
    const x = enfant();
    const bon = fr(a, b);
    const tournures = [
      `Sur la figure, ${fr(n, d)} est colorié. Regroupe les parts ${k} par ${k}. Quelle fraction obtiens-tu ?`,
      `${x.p} a colorié ${fr(n, d)}. ${MAJ(il(x))} regroupe les parts par ${k}. Quelle fraction plus simple trouve-t-${il(x)} ?`,
      `${debut()}${x.p} veut écrire ${fr(n, d)} avec moins de parts, en les groupant par ${k}. Quelle fraction obtient-${il(x)} ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, [fr(n - (n - a), d - (n - a)), fr(a, d), fr(n, b), fr(b, a), fr(a + 1, b)].filter((c) => !/\/0$|^0\//.test(c))),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Deux fractions sont égales si elles représentent la même quantité.",
        `On fait des paquets de ${k} parts : on divise le haut ET le bas par ${k}.`,
        `${n} ÷ ${k} = ${a} paquets coloriés ; ${d} ÷ ${k} = ${b} paquets en tout.`,
        `${fr(n, d)} = ${bon}. ⚠️ Enlever le même nombre en haut et en bas ne donne pas une fraction égale.`,
      ),
      canvas: figure(n, d),
    };
  }),

  gabarit("cm1_fraction_equivalente_tpl_164_trou_diviser", "fraction_equivalente", 4, "Divise le haut et le bas par le même nombre.", ["equivalente", "short", "canvas", "simplifier"], () => {
    const { a, b, k, n, d } = aSimplifier();
    const x = enfant();
    const enBas = Math.random() < 0.5;
    const tournures = enBas
      ? [`Complète : ${fr(n, d)} = ${a}/…  Quel nombre manque ?`, `${x.p} simplifie ${fr(n, d)} et trouve ${a}/…  Quel dénominateur doit-${il(x)} écrire ?`]
      : [`Complète : ${fr(n, d)} = …/${b}. Quel nombre manque ?`, `${debut()}${x.p} écrit ${fr(n, d)} = …/${b}. Quel numérateur doit-${il(x)} écrire ?`];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [String(enBas ? b : a)],
      comparator: "number_equal",
      explanation: exp(
        "On obtient une fraction égale en divisant le haut et le bas par le même nombre.",
        enBas ? `On passe de ${n} à ${a} : on divise par ${k}.` : `On passe de ${d} à ${b} : on divise par ${k}.`,
        `${n} ÷ ${k} = ${a} et ${d} ÷ ${k} = ${b}.`,
        `${fr(n, d)} = ${fr(a, b)}.`,
      ),
      canvas: deuxBarres([n, d], [0, b], [fr(n, d), enBas ? `${a}/…` : `…/${b}`]),
    };
  }),

  gabarit("cm1_fraction_equivalente_tpl_165_dixiemes_centiemes", "fraction_equivalente", 5, "1 dixième = 10 centièmes : une colonne de 10 petits carrés.", ["equivalente", "short", "canvas", "decimale"], () => {
    const a = entier(1, 9);
    const x = enfant();
    const versCentiemes = Math.random() < 0.6;
    const tournures = versCentiemes
      ? [`Complète : ${fr(a, 10)} = …/100. Quel nombre manque ?`, `${x.p} a colorié ${fr(a, 10)} du grand carré. Combien de centièmes cela fait-il ? ${fr(a, 10)} = …/100`, `${debut()}${x.p} écrit ${fr(a, 10)} en centièmes : ${fr(a, 10)} = …/100. Quel est le numérateur ?`]
      : [`Complète : ${fr(10 * a, 100)} = …/10. Quel nombre manque ?`, `${x.p} a colorié ${fr(10 * a, 100)} du grand carré. Combien de dixièmes cela fait-il ? ${fr(10 * a, 100)} = …/10`];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [String(versCentiemes ? 10 * a : a)],
      comparator: "number_equal",
      explanation: exp(
        "Le grand carré est l’unité : 10 colonnes (dixièmes), 100 petits carrés (centièmes).",
        "Une colonne = 1 dixième = 10 centièmes.",
        `${a} colonne${a > 1 ? "s" : ""} = ${10 * a} petits carrés.`,
        `${fr(a, 10)} = ${fr(10 * a, 100)}. On l’écrit aussi 0,${a}.`,
      ),
      canvas: grille(10, 10, 10 * a),
    };
  }),

  gabarit("cm1_fraction_equivalente_tpl_166_rectangle", "fraction_equivalente", 5, "Partage d’abord le rectangle en autant de paquets égaux que le dénominateur.", ["equivalente", "short", "canvas"], () => {
    const [r, c] = tirer([[2, 4], [3, 4], [2, 6], [2, 5], [4, 5], [3, 3], [4, 4]] as [number, number][]);
    const total = r * c;
    const dens = [2, 3, 4, 5].filter((v) => total % v === 0 && v < total);
    const b = tirer(dens);
    const a = b === 2 ? 1 : entier(1, b - 1);
    const rep = (total / b) * a;
    const x = enfant();
    const tournures = [
      `Le rectangle a ${total} cases égales (${r} × ${c}). Combien de cases faut-il colorier pour représenter ${fr(a, b)} ?`,
      `${x.p} veut colorier ${fr(a, b)} de son rectangle de ${r} × ${c} cases. Combien de cases colorie-t-${il(x)} ?`,
      `${debut()}${x.p} carrelle un mur de ${r} × ${c} carreaux ; ${fr(a, b)} doivent être bleus. Combien de carreaux bleus ?`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [String(rep)],
      comparator: "number_equal",
      explanation: exp(
        `${fr(a, b)} : on partage en ${b} paquets égaux et on en prend ${a}.`,
        `${r} × ${c} = ${total} cases ; ${total} ÷ ${b} = ${total / b} cases par paquet.`,
        `${a} × ${total / b} = ${rep}.`,
        `Il faut ${rep} cases : ${fr(a, b)} = ${fr(rep, total)}.`,
      ),
      canvas: grille(r, c, 0),
    };
  }),
];

export const fractionsGabaritsC: TutorBankItemV4[] = [...comparer2, ...comparer34, ...equivalente, ...equivalente45];
