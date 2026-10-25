// Générateurs CM1 : fraction supérieure à 1, droite graduée (25/10/2026).
// Voir fractions-gabarits-outils.ts pour le pourquoi (mesure des squelettes).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  choix, debut, deuxBarres, droite, e, ecrituresEgales, egaux, enfant, entier, exp, fr, gabarit, il, MAJ, nomParts,
  nomSeul, objet, rang, tIl, tirer, aliment, art,
} from "./fractions-gabarits-outils";

/** n/d dessiné en deux unités : la 1re pleine (ou partielle), la 2de avec le reste. */
const deuxUnites = (n: number, d: number) => deuxBarres([Math.min(n, d), d], [Math.max(n - d, 0), d], ["1re unité", "2e unité"]);
const PLURIELS = [
  { pl: "pizzas", fem: true, parts: "parts", egaux: "égales" }, { pl: "tartes", fem: true, parts: "parts", egaux: "égales" },
  { pl: "galettes", fem: true, parts: "parts", egaux: "égales" }, { pl: "gâteaux", fem: false, parts: "parts", egaux: "égales" },
  { pl: "crêpes", fem: true, parts: "parts", egaux: "égales" }, { pl: "tablettes de chocolat", fem: true, parts: "carrés", egaux: "égaux" },
  { pl: "baguettes", fem: true, parts: "morceaux", egaux: "égaux" }, { pl: "cakes", fem: false, parts: "tranches", egaux: "égales" },
];
const BOISSONS = ["de bouteille de jus", "de gourde d’eau", "de brique de lait", "de carafe de citronnade"];

const superieure: TutorBankItemV4[] = [
  gabarit("cm1_fraction_superieure_1_tpl_131_plus_ou_moins", "fraction_superieure_1", 2, "Compare le numérateur (parts prises) au dénominateur (parts dans UNE unité).", ["superieure_1", "qcm", "canvas"], () => {
    const ob = aliment();
    const d = tirer([3, 4, 5, 6, 8]);
    const n = tirer([entier(1, d - 1), d, entier(d + 1, 2 * d)]);
    const x = enfant();
    const nom = nomSeul(ob);
    const ent = e(ob) ? "entière" : "entier";
    const [plus, egal, moins] = [`plus d’${art(ob)} ${nom} ${ent}`, `exactement ${art(ob)} ${nom} ${ent}`, `moins d’${art(ob)} ${nom} ${ent}`];
    const bon = n > d ? plus : n === d ? egal : moins;
    const tournures = [
      `Chaque ${nom} est coupé${e(ob)} en ${d} ${ob.parts} ${egaux(ob)}. ${x.p} en mange ${n}, soit ${fr(n, d)} de ${nom}. A-${tIl(x)} mangé :`,
      `${debut()}${x.p} prend ${fr(n, d)} de ${nom} (chaque ${nom} a ${d} ${ob.parts}). Cela fait :`,
      `${x.p} a ${fr(n, d)} de ${nom}. Regarde la figure : est-ce plus, moins ou exactement ${art(ob)} ${nom} ${ent} ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: [moins, egal, plus],
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        `Une unité entière, c’est ${fr(d, d)}.`,
        "On compare le numérateur au dénominateur.",
        n > d ? `${n} > ${d} : on dépasse une unité.` : n === d ? `${n} = ${d} : c’est une unité pile.` : `${n} < ${d} : on n’atteint pas une unité.`,
        `${fr(n, d)}, c’est ${bon}.`,
      ),
      canvas: deuxUnites(n, d),
    };
  }),

  gabarit("cm1_fraction_superieure_1_tpl_132_laquelle", "fraction_superieure_1", 2, "Une fraction est plus grande que 1 quand le numérateur est plus grand que le dénominateur.", ["superieure_1", "qcm"], () => {
    const d = tirer([3, 4, 5, 6, 8, 10]);
    const bon = fr(d + entier(1, 4), d);
    const x = enfant();
    const tournures = [
      `${x.p} cherche la fraction qui dépasse 1. Laquelle est-ce ?`,
      `Sur les étiquettes du jeu de ${x.p}, une seule fraction est plus grande que 1. Laquelle ?`,
      `${debut()}${x.p} veut boire plus d’une gourde entière. Quelle fraction de gourde doit-${il(x)} boire ?`,
      `Quelle fraction est plus grande qu’une unité entière ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, [fr(d, d), fr(d - 1, d), fr(1, d), fr(entier(1, d - 2), d)]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        `Avec des ${nomParts(d, true)}, une unité entière fait ${fr(d, d)}.`,
        "On cherche le numérateur plus grand que le dénominateur.",
        `Dans ${bon}, le numérateur dépasse ${d}.`,
        `${bon} est plus grande que 1.`,
      ),
    };
  }),

  gabarit("cm1_fraction_superieure_1_tpl_133_decomposer", "fraction_superieure_1", 3, "Une unité entière, c’est d/d. Ce qui dépasse, ce sont les parts en plus.", ["superieure_1", "short", "canvas"], () => {
    const d = tirer([3, 4, 5, 6, 8]);
    const r = entier(1, d - 1);
    const n = d + r;
    const x = enfant();
    const ob = aliment();
    const tournures = [
      `Complète : ${fr(n, d)} = 1 + …/${d}. Quel nombre manque ?`,
      `${x.p} a ${fr(n, d)} de ${nomSeul(ob)}. Cela fait ${art(ob)} ${nomSeul(ob)} entier${e(ob)} et combien de ${nomParts(d, true)} en plus ?`,
      `${debut()}${x.p} a couru ${fr(n, d)} de tour de piste : 1 tour entier et combien de ${nomParts(d, true)} de tour ?`,
      `${x.p} écrit ${fr(n, d)} = 1 + …/${d}. Quel nombre doit-${il(x)} écrire à la place des points ?`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [String(r), fr(r, d)],
      comparator: "number_equal",
      explanation: exp(
        `1 = ${fr(d, d)}.`,
        `On enlève les ${d} parts d’une unité aux ${n} parts.`,
        `${n} − ${d} = ${r}, donc ${fr(n, d)} = ${fr(d, d)} + ${fr(r, d)} = 1 + ${fr(r, d)}.`,
        `Il manque ${r}.`,
      ),
      canvas: deuxUnites(n, d),
    };
  }),

  gabarit("cm1_fraction_superieure_1_tpl_134_droite", "fraction_superieure_1", 3, "Compte les petits intervalles depuis 0 : chaque unité en a autant que le dénominateur.", ["superieure_1", "qcm", "canvas", "droite"], () => {
    const d = tirer([2, 3, 4, 5]);
    const n = entier(d + 1, 2 * d - 1);
    const x = enfant();
    const bon = fr(n, d);
    const tournures = [
      `Sur la droite, chaque unité est partagée en ${d} parts égales. Quelle fraction correspond au point A ?`,
      `${x.p} a sauté jusqu’au point A sur la droite graduée. Quelle fraction est-ce ?`,
      `${debut()}${x.p} place le point A après 1. Quelle fraction représente A ?`,
      `La course de ${x.p} va de 0 à 2 ; ${il(x)} s’arrête au point A. Quelle fraction est-ce ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, [fr(n - d, d), fr(n, 2 * d), fr(d, n), fr(n + 1, d), fr(n - 1, d)]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        `Chaque unité est partagée en ${d} : on compte en ${nomParts(d, true)}.`,
        "On compte tous les petits intervalles de 0 jusqu’au point, même après 1.",
        `De 0 à A : ${n} intervalles de ${fr(1, d)}.`,
        `A correspond à ${bon}, plus grande que 1.`,
      ),
      canvas: droite(d, [{ n, label: "A" }], 2),
    };
  }),
];

const superieure4: TutorBankItemV4[] = [
  gabarit("cm1_fraction_superieure_1_tpl_135_entiers_en_parts", "fraction_superieure_1", 4, "Une unité, c’est autant de parts que le dénominateur. Deux unités, deux fois plus.", ["superieure_1", "short", "canvas"], () => {
    const ob = tirer(PLURIELS);
    const d = tirer([2, 3, 4, 5, 6, 8]);
    const k = tirer([2, 2, 3]);
    const x = enfant();
    const ee = ob.fem ? "e" : "";
    const tournures = [
      `${debut()}${x.p} a ${k} ${ob.pl} ${ob.fem ? "entières" : "entiers"}, chacun${ee} coupé${ee} en ${d} ${ob.parts} ${ob.egaux}. Combien de ${nomParts(d, true)} cela fait-il ?`,
      `Complète : ${k} = …/${d}. Quel nombre manque ?`,
      `Pour la fête, ${x.p} coupe ${k} ${ob.pl} pareil${ee}s en ${nomParts(d, true)}. Combien de ${nomParts(d, true)} obtient-${il(x)} ?`,
      `${x.p} veut écrire ${k} unités entières avec des ${nomParts(d, true)} : ${k} = …/${d}. Quel est le numérateur ?`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [String(k * d), fr(k * d, d)],
      comparator: "number_equal",
      explanation: exp(
        `1 unité = ${fr(d, d)}.`,
        `${k} unités, c’est ${k} fois ${d} parts.`,
        `${k} × ${d} = ${k * d}, donc ${k} = ${fr(k * d, d)}.`,
        `La réponse est ${k * d}.`,
      ),
      canvas: k === 2 ? deuxBarres([d, d], [d, d], ["1re unité", "2e unité"]) : undefined,
    };
  }),

  gabarit("cm1_fraction_superieure_1_tpl_136_encadrer", "fraction_superieure_1", 4, "Compte combien de fois le dénominateur « tient » dans le numérateur : ce sont les unités entières.", ["superieure_1", "qcm", "canvas", "droite"], () => {
    const d = tirer([2, 3, 4, 5]);
    let n = entier(1, 3 * d - 1);
    while (n % d === 0) n = entier(1, 3 * d - 1);
    const q = Math.floor(n / d);
    const x = enfant();
    const tranches = ["entre 0 et 1", "entre 1 et 2", "entre 2 et 3", "entre 3 et 4"];
    const bon = tranches[q];
    const tournures = [
      `Entre quels nombres entiers se trouve ${fr(n, d)} ?`,
      `${x.p} veut placer ${fr(n, d)} sur la droite graduée. Où va-t-${il(x)} le placer ?`,
      `${debut()}${x.p} a parcouru ${fr(n, d)} de kilomètre. Ce nombre est :`,
      `Sur cette droite, l’unité est partagée en ${d}. Où se trouve ${fr(n, d)} ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: tranches,
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        `Avec des ${nomParts(d, true)} : 1 = ${fr(d, d)}, 2 = ${fr(2 * d, d)}, 3 = ${fr(3 * d, d)}.`,
        "On cherche entre quels multiples du dénominateur se trouve le numérateur.",
        `${q * d} < ${n} < ${(q + 1) * d}, donc ${fr(q * d, d)} < ${fr(n, d)} < ${fr((q + 1) * d, d)}.`,
        `${fr(n, d)} est ${bon}.`,
      ),
      canvas: droite(d, [], 3),
    };
  }),
];

const TRAJETS = [
  (x: string) => `La piste de course de ${x} va de 0 (départ) à 1 (arrivée).`,
  (x: string) => `Le sentier vers la cascade, pour ${x}, va de 0 à 1.`,
  (x: string) => `Le trajet du bus de ${x}, de la maison (0) à l’école (1), est gradué.`,
  (x: string) => `${x} trace une droite graduée de 0 à 1 dans son cahier.`,
  (x: string) => `La ficelle de ${x} est graduée de 0 à 1.`,
  (x: string) => `Le bassin de la piscine de ${x} va d’un bord (0) à l’autre (1).`,
  (x: string) => `Sur la règle de ${x}, l’unité va de 0 à 1.`,
  (x: string) => `Le parcours du cross de ${x} va de 0 à 1.`,
];

const droite2: TutorBankItemV4[] = [
  gabarit("cm1_fraction_droite_tpl_141_lire_point", "fraction_droite", 2, "Compte les parts égales entre 0 et 1 (dénominateur), puis les bonds de 0 jusqu’au point (numérateur).", ["droite", "qcm", "canvas"], () => {
    const d = tirer([3, 4, 5, 6, 8, 10]);
    const n = entier(1, d - 1);
    const x = enfant();
    const bon = fr(n, d);
    const lettre = tirer(["A", "B", "M", "P"]);
    const question = tirer([
      `Quelle fraction correspond au point ${lettre} ?`,
      `${x.p} est au point ${lettre}. Quelle fraction du trajet a-${tIl(x)} faite ?`,
      `Quelle fraction ${x.p} doit-${il(x)} écrire sous le point ${lettre} ?`,
    ]);
    return {
      text: `${tirer(TRAJETS)(x.p)} ${question}`,
      format: "qcm",
      choices: choix(bon, [fr(n + 1, d), fr(n - 1, d), fr(n, d + 1), fr(d, n), fr(d - n, d)].filter((c) => !c.startsWith("0/"))),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Sur une droite graduée, l’unité (de 0 à 1) est partagée en parts égales.",
        "Le dénominateur est le nombre de parts entre 0 et 1 ; le numérateur, le nombre de bonds depuis 0.",
        `Ici, ${d} parts entre 0 et 1, et ${lettre} est à ${n} bond${n > 1 ? "s" : ""} de 0.`,
        `${lettre} correspond à ${bon}.`,
      ),
      canvas: droite(d, [{ n, label: lettre }]),
    };
  }),

  gabarit("cm1_fraction_droite_tpl_142_compter", "fraction_droite", 2, "Compte les petits intervalles, pas les traits.", ["droite", "short", "canvas"], () => {
    const d = tirer([3, 4, 5, 6, 8, 10]);
    const n = entier(1, d - 1);
    const x = enfant();
    const demandeD = Math.random() < 0.5;
    const question = demandeD
      ? tirer([`En combien de parts égales l’unité est-elle partagée ?`, `Quel est le dénominateur des fractions de cette droite ?`, `Combien de petits intervalles y a-t-il entre 0 et 1 ?`])
      : tirer([`Combien de petits bonds faut-il faire de 0 jusqu’au point A ?`, `Quel est le numérateur de la fraction du point A ?`, `${x.p} va de 0 au point A : combien de petits intervalles franchit-${il(x)} ?`]);
    const rep = demandeD ? d : n;
    return {
      text: `${tirer(TRAJETS)(x.p)} ${question}`,
      format: "short",
      expected: [String(rep)],
      comparator: "number_equal",
      explanation: exp(
        "Entre 0 et 1, on compte les petits intervalles égaux : c’est le dénominateur.",
        "De 0 au point, on compte les bonds : c’est le numérateur.",
        `${d} intervalles entre 0 et 1 ; ${n} de 0 à A, donc A = ${fr(n, d)}.`,
        `La réponse est ${rep}.`,
      ),
      canvas: droite(d, [{ n, label: "A" }]),
    };
  }),
];

const droite3: TutorBankItemV4[] = [
  gabarit("cm1_fraction_droite_tpl_143_avancer", "fraction_droite", 3, "Chaque graduation ajoute une part : le dénominateur ne change pas.", ["droite", "short", "canvas"], () => {
    const d = tirer([5, 6, 8, 10]);
    const n = entier(1, d - 3);
    const k = entier(1, d - n - 1);
    const x = enfant();
    const tournures = [
      `${x.p} est au point A. ${MAJ(il(x))} avance encore de ${k} graduation${k > 1 ? "s" : ""}. Où arrive-t-${il(x)} ? Écris la fraction.`,
      `${debut()}${x.p} part du point A et fait ${k} petit${k > 1 ? "s" : ""} bond${k > 1 ? "s" : ""} vers 1. Quelle fraction atteint-${il(x)} ?`,
      `Le point B est ${k} graduation${k > 1 ? "s" : ""} après le point A. Quelle fraction correspond à B ?`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: ecrituresEgales(n + k, d),
      comparator: "exact_text",
      explanation: exp(
        `L’unité est partagée en ${d} : chaque graduation vaut ${fr(1, d)}.`,
        "On lit A, puis on ajoute les graduations.",
        `A = ${fr(n, d)} ; ${n} + ${k} = ${n + k}.`,
        `On arrive à ${fr(n + k, d)}.`,
      ),
      canvas: droite(d, [{ n, label: "A" }]),
    };
  }),

  gabarit("cm1_fraction_droite_tpl_144_placer", "fraction_droite", 3, "Le numérateur dit à quel trait s’arrêter en partant de 0.", ["droite", "qcm", "canvas"], () => {
    const d = tirer([4, 5, 6, 8, 10]);
    const n = entier(1, d - 1);
    const x = enfant();
    const lettres = ["A", "B", "C", "D"];
    const ns = [...new Set([n, n + 1 < d ? n + 1 : n - 2, n - 1 > 0 ? n - 1 : n + 2, d - n !== n ? d - n : n + 3])].filter((v) => v > 0 && v < d).slice(0, 4);
    const melange = [...ns].sort(() => Math.random() - 0.5);
    const pts = melange.map((v, i) => ({ n: v, label: lettres[i] }));
    const bon = pts.find((p) => p.n === n)!.label;
    const tournures = [
      `Quel point représente ${fr(n, d)} ?`,
      `${x.p} a collé l’étiquette ${fr(n, d)} sur un des points. Lequel ?`,
      `${debut()}${x.p} cherche ${fr(n, d)} sur la droite. Quel point doit-${il(x)} choisir ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: pts.map((p) => p.label).sort(),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        `L’unité est partagée en ${d} parts égales.`,
        `On part de 0 et on compte ${n} intervalle${n > 1 ? "s" : ""}.`,
        `${n} bond${n > 1 ? "s" : ""} depuis 0 : c’est le point ${bon}.`,
        `${fr(n, d)} est au point ${bon}.`,
      ),
      canvas: droite(d, pts),
    };
  }),
];

const droite4: TutorBankItemV4[] = [
  gabarit("cm1_fraction_droite_tpl_145_moitie", "fraction_droite", 4, "La moitié de l’unité est au milieu entre 0 et 1 : la moitié des intervalles.", ["droite", "short", "canvas", "egalite"], () => {
    const d = tirer([4, 6, 8, 10]);
    const u = tirer([{ q: 2, mot: "la moitié", f: "1/2" }, ...(d % 4 === 0 ? [{ q: 4, mot: "le quart", f: "1/4" }] : [])]);
    const x = enfant();
    const rep = d / u.q;
    const tournures = [
      `L’unité est partagée en ${d} parts égales. À quel trait après 0 se trouve ${u.f} ?`,
      `${tirer(TRAJETS)(x.p)} ${x.p} s’arrête à ${u.mot} du trajet. À quel trait après 0 est-${il(x)} ?`,
      `${debut()}${x.p} veut placer ${u.f} sur cette droite partagée en ${d}. Combien d’intervalles compte-t-${il(x)} depuis 0 ?`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [String(rep)],
      comparator: "number_equal",
      explanation: exp(
        `${u.f}, c’est l’unité partagée en ${u.q} parts égales : une de ces parts.`,
        `On partage les ${d} intervalles en ${u.q} paquets égaux.`,
        `${d} ÷ ${u.q} = ${rep}, donc ${u.f} = ${fr(rep, d)}.`,
        `${u.f} est au ${rang(rep)} trait après 0.`,
      ),
      canvas: droite(d, []),
    };
  }),

  gabarit("cm1_fraction_droite_tpl_146_au_dela_de_1", "fraction_droite", 4, "Continue à compter les intervalles après 1 : le dénominateur ne change pas.", ["droite", "short", "canvas", "superieure_1"], () => {
    const d = tirer([2, 3, 4]);
    let n = entier(d + 1, 3 * d - 1);
    while (n % d === 0) n = entier(d + 1, 3 * d - 1);
    const x = enfant();
    const tournures = [
      `Quelle fraction correspond au point A ? Écris-la.`,
      `${x.p} fait plusieurs tours de piste ; chaque tour est partagé en ${d}. ${MAJ(il(x))} s’arrête en A. Écris la fraction de tour parcourue.`,
      `${debut()}${x.p} a placé le point A après 1. Écris la fraction qui correspond à A.`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: ecrituresEgales(n, d),
      comparator: "exact_text",
      explanation: exp(
        `Chaque unité est partagée en ${d} parts égales.`,
        "On compte tous les intervalles de 0 jusqu’à A.",
        `${n} intervalles de ${fr(1, d)}.`,
        `A correspond à ${fr(n, d)}.`,
      ),
      canvas: droite(d, [{ n, label: "A" }], 3),
    };
  }),
];

export const fractionsGabaritsB: TutorBankItemV4[] = [...superieure, ...superieure4, ...droite2, ...droite3, ...droite4];
