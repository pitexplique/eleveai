// Générateurs CM1 : fractions décimales et défis (25/10/2026).
// ⭐ Prépare fraction → décimal → pourcentage (ce que Frédéric voit manquer sur
// les copies) : 7/10 = 0,7 sur une barre de 10, 45/100 = 0,45 sur un carré de 100.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  aliment, barre, choix, debut, deuxBarres, deuxEnfants, droite, ecrituresEgales, enfant, entier, exp, figure, fr,
  gabarit, grille, il, MAJ, tIl, tirer, virgule,
} from "./fractions-gabarits-outils";

const MESURES = [
  (x: string, v: string) => `Le ruban de ${x} mesure ${v} m.`,
  (x: string, v: string) => `${x} a bu ${v} L de jus.`,
  (x: string, v: string) => `${x} a couru ${v} km au cross.`,
  (x: string, v: string) => `Le chiot de ${x} pèse ${v} kg à la naissance.`,
  (x: string, v: string) => `La plante de ${x} a poussé de ${v} m.`,
  (x: string, v: string) => `${x} a nagé ${v} km dans le lac.`,
  (x: string, v: string) => `Le sac de ${x} pèse ${v} kg.`,
  (x: string, v: string) => `${x} a versé ${v} L d’eau dans l’arrosoir.`,
];
const DECIMAUX_NON = [2, 3, 4, 5, 6, 8, 20, 50];

const decimale2: TutorBankItemV4[] = [
  gabarit("cm1_fraction_decimale_tpl_171_oui_non", "fraction_decimale", 2, "Une fraction décimale a pour dénominateur 10, 100 ou 1 000.", ["decimale", "qcm"], () => {
    const oui = Math.random() < 0.5;
    const d = oui ? tirer([10, 100, 1000]) : tirer(DECIMAUX_NON);
    const n = entier(1, oui && d === 10 ? 9 : 60);
    const x = enfant();
    const tournures = [
      `${x.p} trouve ${fr(n, d)} dans son cahier. Est-ce une fraction décimale ?`,
      `${x.p} affirme : « ${fr(n, d)} est une fraction décimale. » A-${tIl(x)} raison ?`,
      `${debut()}${x.p} écrit ${fr(n, d)} au tableau. Est-ce une fraction décimale ?`,
      `Sur une carte du jeu de ${x.p}, on lit ${fr(n, d)}. Est-ce une fraction décimale ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: ["oui", "non"],
      expected: [oui ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation: exp(
        "Une fraction décimale a un dénominateur égal à 10, 100, 1 000…",
        "On regarde seulement le dénominateur (le nombre du bas).",
        `Le dénominateur de ${fr(n, d)} est ${d}.`,
        oui ? `Oui, ${fr(n, d)} est une fraction décimale.` : `Non, ${d} n’est ni 10, ni 100, ni 1 000.`,
      ),
    };
  }),

  gabarit("cm1_fraction_decimale_tpl_172_dixiemes_figure", "fraction_decimale", 2, "La barre est partagée en 10 : chaque part est un dixième.", ["decimale", "qcm", "canvas"], () => {
    const a = entier(1, 9);
    const x = enfant();
    const bon = fr(a, 10);
    const tournures = [
      `La barre est partagée en 10 parts égales. Quelle fraction décimale est coloriée ?`,
      `${x.p} a colorié une partie de sa bande de 10 cases. Quelle fraction décimale a-${tIl(x)} coloriée ?`,
      `${debut()}${x.p} a mangé les morceaux coloriés d’une barre de 10 morceaux. Quelle fraction décimale de la barre a-${tIl(x)} mangée ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, [fr(a, 100), fr(10, a), fr(10 - a, 10), fr(a, 1000)]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Un dixième, c’est une part d’une unité partagée en 10.",
        "On compte les parts coloriées sur les 10.",
        `${a} part${a > 1 ? "s" : ""} sur 10.`,
        `La fraction coloriée est ${bon} (on écrit aussi 0,${a}).`,
      ),
      canvas: barre(a, 10),
    };
  }),
];

const decimale3: TutorBankItemV4[] = [
  gabarit("cm1_fraction_decimale_tpl_173_vers_virgule", "fraction_decimale", 3, "a/10, c’est a dixièmes : 0 unité et a au rang des dixièmes.", ["decimale", "short", "canvas"], () => {
    const a = entier(1, 9);
    const x = enfant();
    const q = tirer([
      `Écris ${fr(a, 10)} avec une virgule.`,
      `${x.p} a colorié ${fr(a, 10)} de la barre. Écris ce nombre avec une virgule.`,
      `${debut()}${x.p} a couru ${fr(a, 10)} de kilomètre. Écris ce nombre de kilomètres avec une virgule.`,
      `Le ruban de ${x.p} mesure ${fr(a, 10)} de mètre. Écris cette longueur avec une virgule.`,
    ]);
    return {
      text: q,
      format: "short",
      expected: [`0,${a}`],
      comparator: "number_equal",
      explanation: exp(
        "Le premier chiffre après la virgule est celui des dixièmes.",
        `${fr(a, 10)}, c’est ${a} dixième${a > 1 ? "s" : ""} et 0 unité.`,
        `${fr(a, 10)} = 0,${a}.`,
        `On écrit 0,${a}.`,
      ),
      canvas: barre(a, 10),
    };
  }),

  gabarit("cm1_fraction_decimale_tpl_174_depuis_virgule", "fraction_decimale", 3, "Le chiffre juste après la virgule compte les dixièmes.", ["decimale", "short", "canvas"], () => {
    const a = entier(1, 9);
    const x = enfant();
    const m = tirer(MESURES)(x.p, `0,${a}`);
    const q = tirer([
      `${m} Complète : 0,${a} = …/10.`,
      `Complète : 0,${a} = …/10. Quel est le numérateur ?`,
      `${m} Combien de dixièmes cela fait-il ? 0,${a} = …/10`,
    ]);
    return {
      text: q,
      format: "short",
      expected: [String(a), fr(a, 10)],
      comparator: "number_equal",
      explanation: exp(
        "Le premier chiffre après la virgule est le chiffre des dixièmes.",
        `Dans 0,${a}, il y a ${a} dixième${a > 1 ? "s" : ""}.`,
        `0,${a} = ${fr(a, 10)}.`,
        `Le nombre qui manque est ${a}.`,
      ),
      canvas: barre(a, 10),
    };
  }),
];

const decimale4: TutorBankItemV4[] = [
  gabarit("cm1_fraction_decimale_tpl_175_centiemes", "fraction_decimale", 4, "Deux chiffres après la virgule : dixièmes puis centièmes. 7/100 = 0,07.", ["decimale", "qcm", "canvas", "piege"], () => {
    const c = tirer([entier(1, 9), entier(11, 99), entier(11, 99)]);
    const x = enfant();
    const bon = virgule(c / 100);
    const leurres = c < 10 ? [`0,${c}`, `${c}`, `0,00${c}`, `${c},0`] : [virgule(c / 10), `${c}`, virgule(c / 1000), `0,${String(c).split("").reverse().join("")}`];
    const tournures = [
      `Quelle écriture à virgule est égale à ${fr(c, 100)} ?`,
      `Le grand carré a 100 petits carrés ; ${c} sont colorié${c > 1 ? "s" : ""}. Quel nombre décimal est colorié ?`,
      `${debut()}${x.p} écrit ${fr(c, 100)} avec une virgule. Quelle écriture est la bonne ?`,
      `${x.p} a parcouru ${fr(c, 100)} de kilomètre à vélo. Quelle écriture à virgule correspond à ${fr(c, 100)} ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, leurres),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Un centième, c’est une part d’une unité partagée en 100 : 0,01.",
        "Le 2e chiffre après la virgule est celui des centièmes.",
        `${fr(c, 100)} = ${c} centième${c > 1 ? "s" : ""} = ${bon}.`,
        `${fr(c, 100)} = ${bon}.${c < 10 ? ` ⚠️ 0,${c} serait ${c} dixièmes.` : ""}`,
      ),
      canvas: grille(10, 10, c),
    };
  }),

  gabarit("cm1_fraction_decimale_tpl_176_pour_cent", "fraction_decimale", 4, "1 dixième = 10 centièmes ; « sur 100 » se dit aussi « pour cent ».", ["decimale", "short", "canvas", "pourcentage"], () => {
    const a = entier(1, 9);
    const x = enfant();
    const tournures = [
      `${x.p} a colorié ${fr(a, 10)} du grand carré. ${fr(a, 10)} = …/100. Quel nombre manque ?`,
      `Dans la classe de ${x.p}, ${fr(a, 10)} des élèves font du judo. Combien est-ce sur 100 ? ${fr(a, 10)} = …/100`,
      `${debut()}${x.p} lit « 0,${a} » sur un écran. Combien de centièmes cela fait-il ? 0,${a} = …/100`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [String(10 * a), fr(10 * a, 100)],
      comparator: "number_equal",
      explanation: exp(
        "Une colonne du grand carré = 1 dixième = 10 petits carrés = 10 centièmes.",
        `On compte ${a} colonne${a > 1 ? "s" : ""} de 10 petits carrés.`,
        `${a} × 10 = ${10 * a}, donc ${fr(a, 10)} = ${fr(10 * a, 100)} = 0,${a}.`,
        `${fr(10 * a, 100)} se dit aussi « ${10 * a} pour cent » (${10 * a} %).`,
      ),
      canvas: grille(10, 10, 10 * a),
    };
  }),

  gabarit("cm1_fraction_decimale_tpl_177_plus_de_un", "fraction_decimale", 4, "10 dixièmes font 1 unité : ce qui dépasse 10 reste en dixièmes.", ["decimale", "short", "canvas", "superieure_1"], () => {
    const n = entier(11, 29);
    const u = Math.floor(n / 10);
    const r = n % 10;
    const x = enfant();
    const m = tirer(MESURES)(x.p, `${fr(n, 10)}`);
    const tournures = [
      `Écris ${fr(n, 10)} avec une virgule.`,
      `${m.replace(/ (m|L|km|kg)\./, (_t, u: string) => ` de ${({ m: "mètre", L: "litre", km: "kilomètre", kg: "kilo" } as Record<string, string>)[u]}.`)} Écris ce nombre avec une virgule.`,
      `${debut()}${x.p} colorie ${fr(n, 10)} : des barres de 10 parts. Écris ce nombre avec une virgule.`,
    ];
    const rep = r === 0 ? String(u) : `${u},${r}`;
    return {
      text: tirer(tournures),
      format: "short",
      expected: [rep],
      comparator: "number_equal",
      explanation: exp(
        "10 dixièmes = 1 unité.",
        `On fait des paquets de 10 dixièmes dans ${n} dixièmes.`,
        `${n} = ${u * 10} + ${r} : ${u} unité${u > 1 ? "s" : ""} et ${r} dixième${r > 1 ? "s" : ""}.`,
        `${fr(n, 10)} = ${rep}.`,
      ),
      canvas: n <= 20 ? deuxBarres([10, 10], [n - 10, 10], ["1re unité", "2e unité"]) : undefined,
    };
  }),
];

const defi: TutorBankItemV4[] = [
  gabarit("cm1_fraction_defi_tpl_181_reste_a_deux", "fraction_defi", 4, "Additionne les parts prises, puis enlève-les de toutes les parts.", ["defi", "short", "canvas"], () => {
    const ob = aliment();
    const d = tirer([6, 8, 10, 12]);
    const a = entier(1, d - 3);
    const b = entier(1, d - a - 1);
    const [x, y] = deuxEnfants();
    const r = d - a - b;
    const tournures = [
      `${debut()}${MAJ(ob.le)} est coupé${ob.un.startsWith("une ") ? "e" : ""} en ${d} ${ob.parts}. ${x.p} en prend ${a}, ${y.p} en prend ${b}. Quelle fraction ${ob.du} reste-t-il ?`,
      `${x.p} et ${y.p} partagent ${ob.un} de ${d} ${ob.parts} : ${a} pour ${x.p}, ${b} pour ${y.p}. Quelle fraction ${ob.du} reste-t-il ?`,
      `Il y avait ${ob.un} de ${d} ${ob.parts}. Après le passage de ${x.p} (${a}) et de ${y.p} (${b}), quelle fraction ${ob.du} reste-t-il ?`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: ecrituresEgales(r, d),
      comparator: "exact_text",
      explanation: exp(
        `L’unité entière, c’est ${fr(d, d)}.`,
        "On compte les parts prises, puis celles qui restent.",
        `${a} + ${b} = ${a + b} parts prises ; ${d} − ${a + b} = ${r}.`,
        `Il reste ${fr(r, d)}.`,
      ),
      canvas: figure(a + b, d, ob.rond ? ["disque"] : ["barre", "rectangle"]),
    };
  }),

  gabarit("cm1_fraction_defi_tpl_182_devinette", "fraction_defi", 4, "Place les deux fractions sur la droite : la fraction cherchée est juste entre les deux.", ["defi", "short", "canvas", "droite"], () => {
    const d = tirer([5, 6, 8, 10]);
    const a = entier(1, d - 3);
    const x = enfant();
    const tournures = [
      `${x.p} propose une énigme : « Mon dénominateur est ${d}. Je suis plus grande que ${fr(a, d)} et plus petite que ${fr(a + 2, d)}. » Quelle fraction est-ce ?`,
      `Je suis une fraction en ${d}e. Je suis entre ${fr(a, d)} et ${fr(a + 2, d)} sur la droite. Qui suis-je ?`,
      `${debut()}${x.p} cache une fraction de dénominateur ${d}, entre A (${fr(a, d)}) et B (${fr(a + 2, d)}). Laquelle ?`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: ecrituresEgales(a + 1, d),
      comparator: "exact_text",
      explanation: exp(
        "Avec le même dénominateur, on compare les numérateurs.",
        `Entre ${a} et ${a + 2}, il n’y a qu’un nombre entier.`,
        `${a} < ${a + 1} < ${a + 2}.`,
        `La fraction est ${fr(a + 1, d)}.`,
      ),
      canvas: droite(d, [{ n: a, label: "A" }, { n: a + 2, label: "B" }]),
    };
  }),

  gabarit("cm1_fraction_defi_tpl_183_vers_decimal", "fraction_defi", 5, "Écris d’abord la fraction en dixièmes (barre de 10), puis avec une virgule.", ["defi", "short", "canvas", "decimale"], () => {
    const b = tirer([2, 5]);
    const a = b === 2 ? 1 : entier(1, 4);
    const k = 10 / b;
    const x = enfant();
    const ob = aliment(false);
    const tournures = [
      `${x.p} a mangé ${fr(a, b)} ${ob.du}. Écris ce nombre avec une virgule (aide : ${fr(a, b)} = …/10).`,
      `${debut()}${x.p} a bu ${fr(a, b)} litre de jus. Combien de litres avec une virgule ?`,
      `Regarde les barres : ${fr(a, b)} = …/10. Écris ${fr(a, b)} avec une virgule.`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [virgule(a / b)],
      comparator: "number_equal",
      explanation: exp(
        `Une barre partagée en ${b} est aussi partagée en 10 : chaque ${b === 2 ? "demi" : "cinquième"} fait ${k} dixièmes.`,
        `On multiplie le haut et le bas par ${k}.`,
        `${fr(a, b)} = ${fr(a * k, 10)} = ${virgule(a / b)}.`,
        `${fr(a, b)} = ${virgule(a / b)}.`,
      ),
      canvas: deuxBarres([a, b], [a * k, 10], [fr(a, b), `${fr(a * k, 10)}`]),
    };
  }),

  gabarit("cm1_fraction_defi_tpl_184_qui_plus_moitie", "fraction_defi", 5, "Écris les deux fractions avec le même dénominateur, puis compare.", ["defi", "qcm", "canvas", "egalite"], () => {
    const b = tirer([2, 3, 4, 5]);
    const a = entier(1, b - 1);
    const k = tirer([2, 3].filter((v) => v * b <= 12));
    const d = b * k;
    const c = tirer([a * k - 1, a * k, a * k + 1].filter((v) => v > 0 && v < d));
    const [x, y] = deuxEnfants();
    const ob = aliment();
    const autant = "Les deux en ont autant";
    const bon = c > a * k ? y.p : c < a * k ? x.p : autant;
    const tournures = [
      `${x.p} prend ${fr(a, b)} ${ob.du}, ${y.p} prend ${fr(c, d)} ${ob.du}. Qui en a le plus ?`,
      `${debut()}${x.p} a ${fr(a, b)} ${ob.du} et ${y.p} ${fr(c, d)} ${ob.du} identique. Qui en a le plus ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: [x.p, y.p, autant],
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Pour comparer, on écrit les deux fractions avec le même dénominateur.",
        `On multiplie le haut et le bas de ${fr(a, b)} par ${k}.`,
        `${fr(a, b)} = ${fr(a * k, d)}, à comparer avec ${fr(c, d)}.`,
        `${bon === autant ? "Les deux en ont autant" : `${bon} en a le plus`}.`,
      ),
      canvas: deuxBarres([a, b], [c, d], [x.p, y.p]),
    };
  }),

  gabarit("cm1_fraction_defi_tpl_185_tours", "fraction_defi", 5, "Une unité = d/d. Compte combien d’unités entières tiennent dans la fraction.", ["defi", "short", "canvas", "superieure_1"], () => {
    const d = tirer([2, 3, 4]);
    let n = entier(d + 1, 3 * d - 1);
    while (n % d === 0) n = entier(d + 1, 3 * d - 1);
    const x = enfant();
    const t = tirer([
      { sing: "tour de piste", pl: "tours de piste", verbe: "a couru", fem: false }, { sing: "longueur de bassin", pl: "longueurs de bassin", verbe: "a nagé", fem: true },
      { sing: "tour du stade à vélo", pl: "tours du stade à vélo", verbe: "a fait", fem: false }, { sing: "tour du parc en roller", pl: "tours du parc en roller", verbe: "a fait", fem: false },
      { sing: "boucle du sentier", pl: "boucles du sentier", verbe: "a marché", fem: true },
    ]);
    const ent = t.fem ? "entières" : "entiers";
    const tournures = [
      `${x.p} ${t.verbe} ${fr(n, d)} de ${t.sing}. Combien de ${t.pl} ${ent} a-${tIl(x)} terminé${t.fem ? "es" : "s"} ?`,
      `${debut()}${x.p} ${t.verbe} ${fr(n, d)} de ${t.sing}. Combien de ${t.pl} ${ent} cela fait-il ?`,
    ];
    const rep = Math.floor(n / d);
    return {
      text: tirer(tournures),
      format: "short",
      expected: [String(rep)],
      comparator: "number_equal",
      explanation: exp(
        `Une unité = ${fr(d, d)}.`,
        `On fait des paquets de ${d} dans ${n}.`,
        `${n} = ${rep} × ${d} + ${n - rep * d}.`,
        `${rep} complet${rep > 1 ? "s" : ""}, et encore ${fr(n - rep * d, d)}.`,
      ),
      canvas: droite(d, [{ n, label: il(x) === "elle" ? "Elle" : "Lui" }], 3),
    };
  }),
];

export const fractionsGabaritsD: TutorBankItemV4[] = [...decimale2, ...decimale3, ...decimale4, ...defi];
