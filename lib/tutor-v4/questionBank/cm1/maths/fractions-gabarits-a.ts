// Générateurs CM1 : lire, représenter une fraction, l'unité (25/10/2026).
// Voir fractions-gabarits-outils.ts pour le pourquoi (mesure des squelettes).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import {
  barre, choix, debut, deuxEnfants, e, ecrituresEgales, enfant, enLettres, entier, exp, fr, gabarit, grille,
  accordParts, aliment, figure, egaux, il, lire, MAJ, nomParts, objet, tIl, tirer,
} from "./fractions-gabarits-outils";

const DEN_SIMPLES = [2, 3, 4, 5, 6, 8, 10];
const fractionSimple = (dens = DEN_SIMPLES) => {
  const d = tirer(dens);
  return { n: entier(1, d - 1), d };
};
/** « trois quatrièmes » : l'erreur de l'élève qui ne connaît pas « quart ». */
const ORDINAUX_FAUX: Record<number, string> = { 2: "deuxième", 3: "troisième", 4: "quatrième" };
const RECETTES = ["tasse de farine", "litre de lait", "verre de sucre", "sachet de levure", "litre de jus d’orange", "kilo de mangues", "pot de yaourt"];

const lire1: TutorBankItemV4[] = [
  // ============================== FRACTION_LIRE ==============================
  gabarit("cm1_fraction_lire_tpl_101_mots", "fraction_lire", 1, "Le nombre du bas donne le nom des parts : quarts, tiers, cinquièmes…", ["lire", "qcm"], () => {
    const { n, d } = fractionSimple();
    const x = enfant();
    const f = fr(n, d);
    const bon = lire(n, d);
    const tournures = [
      `${x.p} écrit ${f} sur son ardoise. Comment lit-on cette fraction ?`,
      `Dans le carnet de recettes de ${x.p}, on lit « ${f} de ${tirer(RECETTES)} ». Comment se lit ${f} ?`,
      `Le maître montre la fraction ${f}. ${x.p} doit la lire à voix haute. Que dit-${il(x)} ?`,
      `${debut()}${x.p} a mangé ${f} ${objet().du}. Comment lit-on ${f} ?`,
      `Sur le tableau de la classe, il est écrit ${f}. Comment se lit cette fraction ?`,
      `${x.p} dicte une fraction à sa voisine : ${f}. Quels mots doit-${il(x)} dire ?`,
    ];
    const leurres = [
      `${enLettres(n)} et ${enLettres(d)}`,
      `${enLettres(n)} ${enLettres(d)}`,
      ...(ORDINAUX_FAUX[d] ? [`${enLettres(n)} ${ORDINAUX_FAUX[d]}${n > 1 ? "s" : ""}`] : []),
      ...(n >= 2 && [2, 3, 4, 5, 6, 8, 10].includes(n) && d <= 20 ? [lire(d, n)] : []),
      ...([3, 4, 5, 6, 8, 10].includes(d + 1) ? [lire(n, d + 1)] : []),
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, leurres),
      expected: [bon],
      comparator: "mcq_exact",
      canvas: figure(n, d),
      explanation: exp(
        "Le numérateur (en haut) dit combien de parts on prend ; le dénominateur (en bas) donne le nom des parts.",
        "On lit d’abord le nombre du haut, puis le nom des parts donné par le nombre du bas.",
        `Dans ${f}, ${d} donne des « ${nomParts(d, true)} », et on en prend ${n}.`,
        `${f} se lit « ${bon} ».`,
      ),
    };
  }),

  gabarit("cm1_fraction_lire_tpl_102_ecrire", "fraction_lire", 1, "Le nombre de parts prises va en haut, le nom des parts donne le nombre du bas.", ["lire", "short"], () => {
    const { n, d } = fractionSimple();
    const x = enfant();
    const mots = lire(n, d);
    const tournures = [
      `${x.p} entend « ${mots} ». Écris cette fraction avec des chiffres.`,
      `Dans une dictée de nombres, la maîtresse dit « ${mots} ». Écris la fraction que ${x.p} doit noter.`,
      `${debut()}${x.p} mange ${mots} ${objet().du}. Écris cette fraction avec des chiffres.`,
      `Écris en chiffres la fraction « ${mots} ».`,
      `Sur une affiche, ${x.p} lit « ${mots} du parcours ». Écris cette fraction avec des chiffres.`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [fr(n, d)],
      comparator: "exact_text",
      canvas: figure(n, d),
      explanation: exp(
        "Une fraction s’écrit numérateur / dénominateur.",
        "Le premier mot dit combien de parts ; le nom des parts donne le dénominateur.",
        `« ${mots} » : ${n} parts, des ${nomParts(d, true)} → ${n} en haut, ${d} en bas.`,
        `On écrit ${fr(n, d)}.`,
      ),
    };
  }),

  gabarit("cm1_fraction_lire_tpl_103_role", "fraction_lire", 1, "Le dénominateur (en bas) : en combien de parts égales on partage. Le numérateur (en haut) : combien on en prend.", ["lire", "short"], () => {
    const { n, d } = fractionSimple();
    const x = enfant();
    const ob = aliment();
    const f = fr(n, d);
    const demandeTotal = Math.random() < 0.5;
    const intro = tirer([
      `${debut()}${x.p} partage ${ob.un} en ${d} ${ob.parts} ${egaux(ob)} et en prend ${n}. On écrit ${f}.`,
      `${x.p} a colorié ${f} ${ob.du}.`,
      `Dans la fraction ${f} ${ob.du} mangée par ${x.p},`,
      `${x.p} écrit ${f} pour dire ce qu’${il(x)} a pris ${ob.du}.`,
    ]);
    const question = demandeTotal
      ? tirer([`Quel nombre de cette fraction donne le nombre de ${ob.parts} en tout ?`, `Quel est le dénominateur ?`, `Quel nombre est écrit en bas ?`])
      : tirer([`Quel nombre de cette fraction dit combien de ${ob.parts} on prend ?`, `Quel est le numérateur ?`, `Quel nombre est écrit en haut ?`]);
    const rep = demandeTotal ? d : n;
    return {
      text: `${intro} ${question}`.replace(", Q", ", q"),
      format: "short",
      expected: [String(rep)],
      comparator: "number_equal",
      canvas: barre(n, d, ob.rond),
      explanation: exp(
        "Le numérateur est en haut : les parts prises. Le dénominateur est en bas : les parts égales en tout.",
        demandeTotal ? "On regarde le nombre sous la barre de fraction." : "On regarde le nombre au-dessus de la barre de fraction.",
        `Dans ${f}, ${n} est en haut et ${d} est en bas.`,
        `La réponse est ${rep}.`,
      ),
    };
  }),
];

const lire2: TutorBankItemV4[] = [
  gabarit("cm1_fraction_lire_tpl_104_vrai_faux", "fraction_lire", 2, "Le numérateur est en haut, le dénominateur en bas.", ["lire", "piege", "qcm"], () => {
    const { n, d } = fractionSimple([3, 4, 5, 6, 8, 10]);
    const x = enfant();
    const f = fr(n, d);
    const role = tirer(["numérateur", "dénominateur"] as const);
    const juste = Math.random() < 0.5;
    const vrai = role === "numérateur" ? n : d;
    const dit = juste ? vrai : role === "numérateur" ? d : n;
    const tournures = [
      `${x.p} affirme : « Dans ${f}, le ${role} est ${dit}. » A-${tIl(x)} raison ?`,
      `En classe, ${x.p} explique que le ${role} de ${f} est ${dit}. Est-ce juste ?`,
      `${debut()}${x.p} montre ${f} et dit : « ${dit}, c’est le ${role}. » A-${tIl(x)} raison ?`,
      `Sur sa fiche, ${x.p} a écrit : « ${f} : ${role} = ${dit} ». Est-ce juste ?`,
    ];
    const t = tirer(tournures);
    const oui = t.includes("Est-ce juste") ? "oui, c’est juste" : "oui";
    const non = t.includes("Est-ce juste") ? "non, c’est faux" : "non";
    return {
      text: t,
      format: "qcm",
      choices: [oui, non],
      expected: [juste ? oui : non],
      comparator: "mcq_exact",
      explanation: exp(
        "Le numérateur est le nombre du haut ; le dénominateur est le nombre du bas.",
        "On repère la place de chaque nombre dans la fraction.",
        `Dans ${f}, le numérateur est ${n} et le dénominateur est ${d}.`,
        juste ? `Oui : le ${role} est bien ${vrai}.` : `Non : le ${role} est ${vrai}, pas ${dit}.`,
      ),
    };
  }),

  gabarit("cm1_fraction_lire_tpl_105_mots_vers_chiffres", "fraction_lire", 2, "Le nom des parts (quarts, cinquièmes…) donne le nombre du bas.", ["lire", "qcm"], () => {
    const { n, d } = fractionSimple([3, 4, 5, 6, 8, 10]);
    const x = enfant();
    const mots = lire(n, d);
    const bon = fr(n, d);
    const tournures = [
      `Quelle fraction se lit « ${mots} » ?`,
      `À la radio, ${x.p} entend « ${mots} des élèves sont venus à vélo ». Quelle fraction est-ce ?`,
      `Au marché, la vendeuse dit à ${x.p} : « ${mots} du panier sont des litchis ». Quelle fraction a-t-elle dite ?`,
      `${x.p} doit écrire « ${mots} » en chiffres. Quelle écriture est la bonne ?`,
      `${debut()}${x.p} a lu ${mots} de son livre. Quelle fraction du livre a-${tIl(x)} lue ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, [fr(d, n), fr(n, d === 10 ? 100 : d + 1), fr(n, d * 10), fr(n + 1, d), fr(1, d)]),
      expected: [bon],
      comparator: "mcq_exact",
      canvas: figure(n, d),
      explanation: exp(
        "Le premier mot dit combien de parts on prend ; le nom des parts donne le dénominateur.",
        "On écrit le nombre de parts en haut, et le nombre de parts égales en bas.",
        `« ${mots} » : ${n} en haut, ${d} en bas (des ${nomParts(d, true)}).`,
        `La fraction est ${bon}.`,
      ),
    };
  }),

  gabarit("cm1_fraction_lire_tpl_106_devinette", "fraction_lire", 2, "Le numérateur va en haut, le dénominateur en bas.", ["lire", "short"], () => {
    const { n, d } = fractionSimple([3, 4, 5, 6, 7, 8, 9, 10]);
    const x = enfant();
    const tournures = [
      `${x.p} propose une devinette : « Mon numérateur est ${n} et mon dénominateur est ${d}. Qui suis-je ? » Écris la fraction.`,
      `Écris la fraction dont le dénominateur est ${d} et le numérateur est ${n}.`,
      `${x.p} cherche une fraction : en bas, il y a ${d} ; en haut, il y a ${n}. Écris cette fraction.`,
      `Une carte du jeu de ${x.p} dit : « numérateur ${n}, dénominateur ${d} ». Écris la fraction de la carte.`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [fr(n, d)],
      comparator: "exact_text",
      explanation: exp(
        "Dans une fraction, le numérateur est en haut et le dénominateur en bas.",
        "On place chaque nombre à sa place, de part et d’autre de la barre.",
        `Numérateur ${n} en haut, dénominateur ${d} en bas.`,
        `La fraction est ${fr(n, d)}.`,
      ),
    };
  }),
];

const GRILLES = [
  "le carrelage de la salle de bains", "le potager de l’école partagé en carrés", "le damier de jeu", "le tableau d’affichage",
  "la mosaïque de la cour", "le quadrillage du cahier", "le mur d’escalade partagé en carrés", "le tapis de gym",
];

const representer: TutorBankItemV4[] = [
  gabarit("cm1_fraction_representer_tpl_111_colorie", "fraction_representer", 1, "Compte les parts égales en tout (en bas), puis les parts coloriées (en haut).", ["representer", "qcm", "canvas"], () => {
    const ob = objet();
    const { n, d } = fractionSimple(ob.rond ? [2, 3, 4, 5, 6, 8] : DEN_SIMPLES);
    const x = enfant();
    const bon = fr(n, d);
    const tournures = [
      `${x.p} a colorié une partie ${ob.du}. Quelle fraction ${ob.du} est coloriée ?`,
      `${debut()}${x.p} a mangé les ${ob.parts} ${accordParts(ob, "colorié")} ${ob.du}. Quelle fraction ${ob.du} a-${tIl(x)} mangée ?`,
      `Regarde le dessin ${ob.du}. Quelle fraction est coloriée ?`,
      `Sur le dessin, les ${ob.parts} ${accordParts(ob, "colorié")} sont celles de ${x.p}. Quelle fraction ${ob.du} a-${tIl(x)} ?`,
      `Quelle fraction ${ob.du} la partie coloriée représente-t-elle ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, [fr(d, n), fr(n, d - n), fr(d - n, d), fr(n, d + 1)]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Une fraction compare les parts coloriées à toutes les parts égales.",
        "On compte toutes les parts égales (dénominateur), puis les parts coloriées (numérateur).",
        `Il y a ${d} ${ob.parts} en tout, dont ${n} coloriée${n > 1 ? "s" : ""}.`,
        `La partie coloriée représente ${bon}. ⚠️ ${fr(n, d - n)} serait « colorié sur non colorié » : ce n’est pas une fraction de l’objet.`,
      ),
      canvas: barre(n, d, ob.rond),
    };
  }),

  gabarit("cm1_fraction_representer_tpl_112_combien_colorier", "fraction_representer", 1, "Le dénominateur dit en combien de parts on partage ; le numérateur dit combien on en colorie.", ["representer", "short"], () => {
    const ob = objet();
    const { n, d } = fractionSimple();
    const x = enfant();
    const f = fr(n, d);
    const tournures = [
      `${x.p} partage ${ob.un} en ${d} ${ob.parts} ${egaux(ob)}. Combien de ${ob.parts} doit-${il(x)} colorier pour montrer ${f} ${ob.du} ?`,
      `${debut()}${x.p} veut prendre ${lire(n, d)} ${ob.du}, coupé${e(ob)} en ${d} ${ob.parts} ${egaux(ob)}. Combien de ${ob.parts} prend-${il(x)} ?`,
      `Pour représenter ${f}, ${x.p} dessine ${ob.un} de ${d} ${ob.parts} ${egaux(ob)}. Combien de ${ob.parts} colorie-t-${il(x)} ?`,
      `${ob.un.charAt(0).toUpperCase() + ob.un.slice(1)} est partagé${e(ob)} en ${d} ${ob.parts} ${egaux(ob)}. Combien de ${ob.parts} faut-il colorier pour avoir ${f} ?`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [String(n)],
      comparator: "number_equal",
      explanation: exp(
        `${f}, c’est ${n} parts sur ${d} parts égales.`,
        "Le dénominateur donne le nombre de parts en tout ; le numérateur, le nombre de parts à colorier.",
        `${d} ${ob.parts} en tout, on en colorie ${n}.`,
        `Il faut colorier ${n} ${ob.parts}.`,
      ),
    };
  }),

  gabarit("cm1_fraction_representer_tpl_113_non_colorie", "fraction_representer", 2, "Compte les parts qui ne sont PAS coloriées.", ["representer", "qcm", "canvas"], () => {
    const ob = objet();
    const { n, d } = fractionSimple(ob.rond ? [3, 4, 5, 6, 8] : [3, 4, 5, 6, 8, 10]);
    const x = enfant();
    const bon = fr(d - n, d);
    const tournures = [
      `Quelle fraction ${ob.du} n’est pas coloriée ?`,
      `${x.p} a déjà peint les ${ob.parts} ${accordParts(ob, "colorié")} ${ob.du}. Quelle fraction lui reste-t-il à peindre ?`,
      `${debut()}${x.p} a mangé les ${ob.parts} ${accordParts(ob, "colorié")} ${ob.du}. Quelle fraction ${ob.du} reste-t-il ?`,
      `Les ${ob.parts} ${ob.unePart.startsWith("une ") ? "blanches" : "blancs"} ${ob.du} sont pour ${x.p}. Quelle fraction ${ob.du} aura-${tIl(x)} ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, [fr(n, d), fr(d - n, n), fr(d, d - n), fr(d - n, d + 1)]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Une fraction compte des parts égales d’une même unité.",
        "On compte toutes les parts, puis celles qui ne sont pas coloriées.",
        `${d} parts en tout, ${n} coloriée${n > 1 ? "s" : ""}, donc ${d} − ${n} = ${d - n} non coloriée${d - n > 1 ? "s" : ""}.`,
        `La partie non coloriée représente ${bon}.`,
      ),
      canvas: barre(n, d, ob.rond),
    };
  }),

  gabarit("cm1_fraction_representer_tpl_114_ecrire_figure", "fraction_representer", 2, "En bas : toutes les parts égales. En haut : les parts coloriées.", ["representer", "short", "canvas"], () => {
    const ob = objet();
    const { n, d } = fractionSimple(ob.rond ? [3, 4, 5, 6, 8] : [3, 4, 5, 6, 8, 10]);
    const x = enfant();
    const tournures = [
      `Écris la fraction ${ob.du} qui est coloriée.`,
      `${x.p} a colorié une partie ${ob.du}. Écris la fraction coloriée.`,
      `${debut()}${x.p} a pris les ${ob.parts} ${accordParts(ob, "colorié")} ${ob.du}. Écris la fraction qu’${il(x)} a prise.`,
      `Quelle fraction ${ob.du} est coloriée ? Écris-la avec des chiffres.`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: ecrituresEgales(n, d),
      comparator: "exact_text",
      explanation: exp(
        "Une fraction : parts coloriées / parts égales en tout.",
        "On compte toutes les parts, puis les parts coloriées.",
        `${n} coloriée${n > 1 ? "s" : ""} sur ${d}.`,
        `La fraction coloriée est ${fr(n, d)}.`,
      ),
      canvas: barre(n, d, ob.rond),
    };
  }),
];

const UNITAIRES: { d: number; mot: string }[] = [
  { d: 2, mot: "la moitié" }, { d: 3, mot: "le tiers" }, { d: 4, mot: "le quart" }, { d: 5, mot: "un cinquième" }, { d: 10, mot: "un dixième" },
];

const representer3: TutorBankItemV4[] = [
  gabarit("cm1_fraction_representer_tpl_115_grille", "fraction_representer", 3, "Compte toutes les cases (lignes × colonnes), puis les cases coloriées.", ["representer", "qcm", "canvas", "grille"], () => {
    const rows = tirer([2, 3, 4]);
    const cols = tirer([3, 4, 5]);
    const total = rows * cols;
    const k = entier(1, total - 1);
    const x = enfant();
    const lieu = tirer(GRILLES);
    const bon = fr(k, total);
    const tournures = [
      `Voici ${lieu} : quelle fraction des cases est coloriée ?`,
      `${x.p} a colorié des cases sur ${lieu}. Quelle fraction des cases a-${tIl(x)} coloriée ?`,
      `Sur ${lieu}, les cases coloriées sont déjà nettoyées par ${x.p}. Quelle fraction des cases est nettoyée ?`,
      `${debut()}${x.p} observe ${lieu}. Quelle fraction des cases est coloriée ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, [fr(k, total - k), fr(total, k), fr(total - k, total), fr(k, rows + cols), fr(k, total + 1)]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Le dénominateur est le nombre total de cases égales ; le numérateur, le nombre de cases coloriées.",
        "On compte les cases : lignes × colonnes. Puis on compte les cases coloriées.",
        `${rows} × ${cols} = ${total} cases en tout, dont ${k} coloriée${k > 1 ? "s" : ""}.`,
        `La fraction coloriée est ${bon}.`,
      ),
      canvas: grille(rows, cols, k),
    };
  }),

  gabarit("cm1_fraction_representer_tpl_116_grande_figure", "fraction_representer", 3, "Partage d’abord toutes les parts en paquets égaux (autant de paquets que le dénominateur).", ["representer", "short", "egalite"], () => {
    const ob = objet(false);
    const u = tirer(UNITAIRES.filter((v) => v.d <= 5));
    const k = tirer([2, 3, 4]);
    const total = u.d * k;
    const n = u.d === 2 ? 1 : entier(1, u.d - 1);
    const x = enfant();
    const quoi = n === 1 ? u.mot : `${fr(n, u.d)}`;
    const tournures = [
      `${x.p} a ${ob.un} de ${total} ${ob.parts} ${egaux(ob)}. Combien de ${ob.parts} doit-${il(x)} colorier pour représenter ${quoi} ${ob.du} ?`,
      `${debut()}${x.p} veut prendre ${quoi} d’${ob.un} de ${total} ${ob.parts}. Combien de ${ob.parts} prend-${il(x)} ?`,
      `${ob.un.charAt(0).toUpperCase() + ob.un.slice(1)} compte ${total} ${ob.parts} ${egaux(ob)}. Combien de ${ob.parts} font ${quoi} ${ob.du} ?`,
    ];
    const rep = (total / u.d) * n;
    return {
      text: tirer(tournures),
      format: "short",
      expected: [String(rep)],
      comparator: "number_equal",
      explanation: exp(
        `${fr(n, u.d)}, c’est partager en ${u.d} paquets égaux et en prendre ${n}.`,
        `On fait ${u.d} paquets égaux avec les ${total} ${ob.parts}, puis on en prend ${n}.`,
        `${total} ÷ ${u.d} = ${total / u.d} ${ob.parts} par paquet ; ${n} paquet${n > 1 ? "s" : ""} : ${n} × ${total / u.d} = ${rep}.`,
        `Il faut ${rep} ${ob.parts}. On voit sur la figure que ${fr(n, u.d)} = ${fr(rep, total)}.`,
      ),
      canvas: barre(0, total),
    };
  }),
];

const A_FINIR = [
  { de: "de son album de vignettes", verbe: "rempli" }, { de: "de son puzzle", verbe: "fait" }, { de: "du parcours du cross", verbe: "couru" },
  { de: "de sa frise", verbe: "colorié" }, { de: "du sentier de randonnée", verbe: "parcouru" }, { de: "de son livre", verbe: "lu" },
  { de: "de la chanson de la chorale", verbe: "appris" }, { de: "de la longueur du bassin", verbe: "nagé" }, { de: "de son potager", verbe: "arrosé" },
  { de: "du mur du préau", verbe: "peint" }, { de: "de sa bouteille d’eau", verbe: "bu" }, { de: "du film", verbe: "regardé" },
];

const unite: TutorBankItemV4[] = [
  gabarit("cm1_fraction_unite_tpl_121_entiere", "fraction_unite", 2, "L’unité entière, c’est toutes les parts : autant que le dénominateur.", ["unite", "qcm"], () => {
    const ob = objet();
    const d = tirer(ob.rond ? [3, 4, 5, 6, 8] : [3, 4, 5, 6, 8, 10]);
    const x = enfant();
    const bon = fr(d, d);
    const tournures = [
      `${MAJ(ob.un)} est coupé${e(ob)} en ${d} ${ob.parts} ${egaux(ob)}. Quelle fraction représente ${ob.entier} ?`,
      `${debut()}${x.p} mange toutes les ${ob.parts} ${ob.du}, coupé${e(ob)} en ${d}. Quelle fraction ${ob.du} a-${tIl(x)} mangée ?`,
      `${x.p} colorie les ${d} ${ob.parts} ${ob.du}. Quelle fraction ${ob.du} est coloriée ?`,
      `Quelle fraction est égale à ${ob.entier}, partagé${e(ob)} en ${d} ${ob.parts} ${egaux(ob)} ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, [fr(1, d), fr(d - 1, d), fr(d, 1), fr(d + 1, d)]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "L’unité, c’est l’objet entier.",
        "Quand on prend toutes les parts, le numérateur est égal au dénominateur.",
        `${d} ${ob.parts} sur ${d} : ${bon}.`,
        `${bon} = 1 : c’est ${ob.entier}.`,
      ),
      canvas: barre(d, d, ob.rond),
    };
  }),

  gabarit("cm1_fraction_unite_tpl_122_reste", "fraction_unite", 2, "L’unité entière fait toutes les parts. Enlève ce qui est pris.", ["unite", "qcm", "canvas"], () => {
    const ob = objet();
    const d = tirer(ob.rond ? [3, 4, 5, 6, 8] : [4, 5, 6, 8, 10]);
    const n = entier(1, d - 1);
    const x = enfant();
    const bon = fr(d - n, d);
    const tournures = [
      `${debut()}${x.p} mange ${fr(n, d)} ${ob.du}. Quelle fraction ${ob.du} reste-t-il ?`,
      `${x.p} a déjà pris ${fr(n, d)} ${ob.du}. Quelle fraction ${ob.du} reste pour les autres ?`,
      `On a utilisé ${fr(n, d)} ${ob.du} pour le spectacle de l’école. Quelle fraction en reste-t-il ?`,
      `${x.p} et ses amis ont pris ${fr(n, d)} ${ob.du}. Quelle fraction reste-t-il ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: choix(bon, [fr(n, d), fr(d - n, n), fr(1, d), fr(d, d - n)]),
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        `L’unité entière, c’est ${fr(d, d)}.`,
        "On enlève les parts prises à toutes les parts.",
        `${d} − ${n} = ${d - n} parts restent sur ${d}.`,
        `Il reste ${bon}.`,
      ),
      canvas: barre(n, d, ob.rond),
    };
  }),

  gabarit("cm1_fraction_unite_tpl_123_completer", "fraction_unite", 2, "Pour finir l’unité, il faut toutes les parts : autant que le dénominateur.", ["unite", "short"], () => {
    const t = tirer(A_FINIR);
    const d = tirer([3, 4, 5, 6, 8, 10]);
    const n = entier(1, d - 1);
    const x = enfant();
    const nom = nomParts(d, true);
    const tournures = [
      `${x.p} a ${t.verbe} ${fr(n, d)} ${t.de}. Combien de ${nom} lui manque-t-il pour terminer ?`,
      `${debut()}${x.p} a déjà ${t.verbe} ${fr(n, d)} ${t.de}. Combien de ${nom} reste-t-il pour arriver à l’unité ?`,
      `${fr(n, d)} ${t.de} : c’est ce que ${x.p} a ${t.verbe}. Combien de ${nom} faut-il encore pour tout finir ?`,
    ];
    return {
      text: tirer(tournures),
      format: "short",
      expected: [String(d - n), fr(d - n, d)],
      comparator: "number_equal",
      canvas: barre(n, d),
      explanation: exp(
        `L’unité entière, c’est ${fr(d, d)}.`,
        `On cherche ce qu’il faut ajouter à ${n} ${nom} pour avoir ${d} ${nom}.`,
        `${d} − ${n} = ${d - n}.`,
        `Il manque ${d - n} ${nomParts(d, d - n > 1)} : ${fr(n, d)} + ${fr(d - n, d)} = ${fr(d, d)} = 1.`,
      ),
    };
  }),
];

/** Une collection : l'unité est un GROUPE (la classe, le sachet…). */
const GROUPES = [
  (x: string) => ({ debut: `Dans la classe de ${x}, il y a`, chose: "élèves", fin: "viennent à l’école à vélo", question: "Combien d’élèves viennent à vélo ?" }),
  (x: string) => ({ debut: `Le sachet de ${x} contient`, chose: "billes", fin: "sont bleues", question: "Combien de billes sont bleues ?" }),
  (x: string) => ({ debut: `Le club de basket de ${x} compte`, chose: "joueurs", fin: "ont moins de 10 ans", question: "Combien de joueurs ont moins de 10 ans ?" }),
  (x: string) => ({ debut: `La bibliothèque de l’école de ${x} reçoit`, chose: "livres", fin: "sont des bandes dessinées", question: "Combien de bandes dessinées reçoit-elle ?" }),
  (x: string) => ({ debut: `Le car de la sortie de ${x} transporte`, chose: "enfants", fin: "descendent au premier arrêt", question: "Combien d’enfants descendent au premier arrêt ?" }),
  (x: string) => ({ debut: `Le verger du grand-père de ${x} a`, chose: "arbres", fin: "sont des manguiers", question: "Combien y a-t-il de manguiers ?" }),
  (x: string) => ({ debut: `L’album de ${x} a`, chose: "vignettes", fin: "sont déjà collées", question: "Combien de vignettes sont collées ?" }),
  (x: string) => ({ debut: `La chorale de l’école de ${x} réunit`, chose: "chanteurs", fin: "chantent la voix aiguë", question: "Combien de chanteurs chantent la voix aiguë ?" }),
  (x: string) => ({ debut: `Le refuge visité par ${x} accueille`, chose: "animaux", fin: "sont des chats", question: "Combien de chats y a-t-il ?" }),
  (x: string) => ({ debut: `La boîte de crayons de ${x} contient`, chose: "crayons", fin: "sont des feutres", question: "Combien de feutres y a-t-il ?" }),
  (x: string) => ({ debut: `Le tournoi de foot de ${x} réunit`, chose: "équipes", fin: "viennent d’une autre ville", question: "Combien d’équipes viennent d’une autre ville ?" }),
  (x: string) => ({ debut: `La ferme visitée par ${x} a`, chose: "poules", fin: "pondent un œuf ce matin", question: "Combien de poules pondent ce matin ?" }),
];
const PAIRES = [
  { grand: "une grande pizza", petit: "une petite pizza", objet: "pizza" }, { grand: "un long ruban", petit: "un ruban court", objet: "ruban" },
  { grand: "un grand gâteau", petit: "un petit gâteau", objet: "gâteau" }, { grand: "une grosse pastèque", petit: "une petite pastèque", objet: "pastèque" },
  { grand: "une grande bouteille de jus", petit: "une petite bouteille de jus", objet: "bouteille" }, { grand: "une grande tablette de chocolat", petit: "une petite tablette de chocolat", objet: "tablette" },
  { grand: "une grande galette", petit: "une petite galette", objet: "galette" }, { grand: "une longue baguette", petit: "une baguette courte", objet: "baguette" },
];

const unite3: TutorBankItemV4[] = [
  gabarit("cm1_fraction_unite_tpl_124_groupe", "fraction_unite", 3, "L’unité, c’est tout le groupe. Partage-le en parts égales : c’est une division.", ["unite", "short", "quantite"], () => {
    const u = tirer(UNITAIRES);
    const total = u.d * entier(2, u.d === 10 ? 5 : 8);
    const x = enfant();
    const g = tirer(GROUPES)(x.p);
    const rep = total / u.d;
    return {
      text: `${g.debut} ${total} ${g.chose}. ${MAJ(u.mot)} des ${g.chose} (${fr(1, u.d)}) ${g.fin}. ${g.question}`,
      format: "short",
      expected: [String(rep)],
      comparator: "number_equal",
      // Le groupe dessiné : une case par élément, rien de colorié (l'élève fait les paquets).
      canvas: total <= 40 ? grille(u.d, total / u.d, 0) : undefined,
      explanation: exp(
        `Ici, l’unité n’est pas un objet : c’est le groupe des ${total} ${g.chose}.`,
        `Prendre ${fr(1, u.d)} du groupe, c’est le partager en ${u.d} parts égales et en prendre une.`,
        `${total} ÷ ${u.d} = ${rep}.`,
        `La réponse est ${rep}.`,
      ),
    };
  }),

  gabarit("cm1_fraction_unite_tpl_125_unites_differentes", "fraction_unite", 3, "Une fraction dépend de l’unité : le quart d’un grand objet est plus grand que le quart d’un petit.", ["unite", "qcm"], () => {
    const p = tirer(PAIRES);
    const u = tirer([{ n: 1, d: 2 }, { n: 1, d: 4 }, { n: 1, d: 3 }, { n: 3, d: 4 }, { n: 2, d: 3 }]);
    const [x, y] = deuxEnfants();
    const pareil = Math.random() < 0.25;
    const xGrand = Math.random() < 0.5;
    const objX = pareil ? p.grand : xGrand ? p.grand : p.petit;
    const objY = pareil ? p.grand.replace(/^(une?) /, "$1 autre ") : xGrand ? p.petit : p.grand;
    const f = fr(u.n, u.d);
    const autant = "Les deux ont la même quantité";
    const bon = pareil ? autant : xGrand ? x.p : y.p;
    const tournures = [
      `${x.p} prend ${f} d’${objX}. ${y.p} prend ${f} d’${objY}${pareil ? " de la même taille" : ""}. Qui a la plus grande quantité ?`,
      `${debut()}${x.p} reçoit ${f} d’${objX} et ${y.p} reçoit ${f} d’${objY}${pareil ? ", de la même taille" : ""}. Qui en a le plus ?`,
    ];
    return {
      text: tirer(tournures),
      format: "qcm",
      choices: [x.p, y.p, autant],
      expected: [bon],
      comparator: "mcq_exact",
      explanation: exp(
        "Une fraction se prend toujours D’UNE unité : la même fraction de deux unités différentes ne donne pas la même quantité.",
        "On regarde d’abord si les deux unités sont de la même taille.",
        pareil ? `Les deux objets sont identiques : ${f} de chacun, c’est la même quantité.` : `Même fraction ${f}, mais pas la même unité : ${f} du plus grand objet est plus grand.`,
        `La bonne réponse : ${bon}.`,
      ),
    };
  }),
];

export const fractionsGabaritsA: TutorBankItemV4[] = [...lire1, ...lire2, ...representer, ...representer3, ...unite, ...unite3];
