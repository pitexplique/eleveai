// POLYGONES RÉGULIERS (05/11/2026).
//
// Micros partagées par le Québec, la Suisse, la Belgique et le Sénégal. Le programme
// français n'en fait pas une notion du cycle 4 (`docs/bo-maths-cycle4-recopie.md`) :
// notion masquée, voir `lib/tutor-v4/micros-masquees.ts`.
//
// ⛔ ★1-★2 : phrase courte, sans contexte. ⚠️ Un apothème n'est jamais tiré au hasard :
// il se CALCULE depuis le côté (`apotheme`), arrondi au dixième, et se dit « environ ».

import { figureConstruction, milieu, point, polygoneRegulier, type P } from "@/lib/canvas/construction";
import { cap, enDegres, entre, expliquer, fabriqueGabarits, fr, melange, mesure, qcm, un, UNITES } from "@/lib/tutor-v4/questionBank/outils-geometrie";

const tpl = fabriqueGabarits("5e", "polygones_reguliers", ["polygone_regulier", "canvas"]);

const NOM: Record<number, string> = { 3: "triangle équilatéral", 4: "carré", 5: "pentagone régulier", 6: "hexagone régulier", 8: "octogone régulier", 9: "ennéagone régulier", 10: "décagone régulier", 12: "dodécagone régulier" };
const N_COURANTS = [5, 6, 8, 9, 10, 12] as const;
const N_TOUS = [3, 4, 5, 6, 8, 9, 10, 12] as const;

/** Les n dont l'angle au centre est entier, pour les calculs d'angles. */
const N_ANGLES = [5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36] as const;

const DEF_REG = "un polygone régulier a tous ses côtés de même longueur et tous ses angles de même mesure.";
const DEF_ANGLES = "un polygone régulier à n côtés a un angle au centre de 360° ÷ n, et un angle intérieur de 180° moins cet angle au centre.";
const DEF_AIRE = "l’aire d’un polygone régulier est la somme de n triangles égaux, de base le côté et de hauteur l’apothème : périmètre × apothème ÷ 2.";

/** L'apothème d'un polygone régulier, arrondi au dixième. */
const apotheme = (n: number, c: number) => Math.round((c / (2 * Math.tan(Math.PI / n))) * 10) / 10;

const noms = (n: number): string[] => "ABCDEFGHJKLMNP".slice(0, n).split("");

/** Le polygone, ses sommets nommés seulement jusqu'à 8 côtés, le cercle et le centre en option. */
function figPolygone(n: number, opts: { centre?: boolean; rayons?: boolean; angleCentre?: string; angleInterieur?: string; texteCote?: string; apotheme?: string; cercle?: boolean; parts?: number } = {}) {
  const som = noms(n);
  const P_ = polygoneRegulier(n, 1, 90 - 180 / n);
  const pts: Record<string, P> = Object.fromEntries(som.map((id, i) => [id, P_[i]]));
  const sansNom = [...(n > 8 ? (opts.rayons ? som.slice(2) : som) : []), ...(opts.apotheme ? ["I"] : [])];
  const avecCentre = opts.parts || opts.centre || opts.rayons || opts.angleCentre || opts.apotheme || opts.cercle;
  if (avecCentre) pts["O"] = point(0, 0);
  if (opts.apotheme) pts["I"] = milieu(P_[0], P_[1]);
  return figureConstruction(
    pts,
    {
      polygones: [
        { sommets: som },
        ...(opts.parts ? som.slice(0, opts.parts).map((id, i) => ({ sommets: ["O", id, som[(i + 1) % n]], fond: "#fde68a" })) : []),
      ],
      cercles: opts.cercle ? [{ centre: "O", rayon: 1, pointille: true, couleur: "#64748b" }] : [],
      segments: [
        ...(opts.rayons || opts.angleCentre ? [{ a: "O", b: som[0], couleur: "#2563eb" }, { a: "O", b: som[1], couleur: "#2563eb" }] : []),
        ...(opts.parts ? som.map((id) => ({ a: "O", b: id, couleur: "#2563eb" })) : []),
        ...(opts.texteCote ? [{ a: som[0], b: som[1], couleur: "#dc2626", epais: true, texte: opts.texteCote }] : []),
        ...(opts.apotheme ? [{ a: "O", b: "I", couleur: "#059669", epais: true, texte: opts.apotheme }] : []),
      ],
      angles: [
        ...(opts.angleCentre ? [{ sommet: "O", de: som[0], vers: som[1], couleur: "#2563eb", texte: opts.angleCentre === "?" ? "?" : opts.angleCentre, rayon: 16, rayonTexte: 14 }] : []),
        ...(opts.angleInterieur ? [{ sommet: som[1], de: som[0], vers: som[2], couleur: "#c2410c", texte: opts.angleInterieur, rayon: 18, rayonTexte: 14 }] : []),
        ...(opts.apotheme ? [{ sommet: "I", de: "O", vers: som[1], droit: true, couleur: "#059669" }] : []),
      ],
      description: `Un polygone régulier à ${n} côtés`,
    },
    sansNom,
  );
}

/** Un polygone à n côtés NON régulier : mêmes angles au centre, rayons inégaux. */
function figIrreguliere(n: number) {
  const som = noms(n);
  const pts: Record<string, P> = {};
  const decal = [1, 0.72, 1.05, 0.8, 1.1, 0.75, 1, 0.85];
  polygoneRegulier(n, 1, 90 - 180 / n).forEach((p, i) => {
    const k = decal[i % decal.length];
    pts[som[i]] = point(p.x * k, p.y * k);
  });
  return figureConstruction(pts, { polygones: [{ sommets: som }], description: "Un polygone dont les côtés n’ont pas tous la même longueur" });
}

/** La figure dont on parle : plusieurs façons de la dire, le nombre étant un « # » pour l'élève. */
const sujet = (n: number) =>
  un([
    `un polygone régulier à ${n} côtés`,
    `un polygone régulier qui a ${n} côtés`,
    `un polygone à ${n} côtés, régulier`,
    `un polygone régulier convexe à ${n} côtés`,
    ...(NOM[n] ? [`un ${NOM[n]}`] : []),
  ]);
/** Sans figure : le centre peut porter n'importe quel nom. */
const avecCentreNomme = (t: string) => {
  const c = un(["", "", " de centre O", " de centre I", " de centre C", " de centre K", " de centre S", " de centre T"]);
  return t.replace(/polygone régulier/, `polygone régulier${c}`);
};

const OBJETS = [
  { n: 8, o: "Un panneau stop", u: "cm", c: [20, 40] },
  { n: 6, o: "Une alvéole de ruche", u: "mm", c: [2, 4] },
  { n: 6, o: "Un écrou", u: "mm", c: [5, 15] },
  { n: 5, o: "Un bâtiment à cinq façades égales", u: "m", c: [80, 280] },
  { n: 6, o: "Un carreau de sol hexagonal", u: "cm", c: [8, 20] },
  { n: 8, o: "Un kiosque à huit côtés égaux", u: "m", c: [2, 5] },
  { n: 12, o: "Une pièce à douze côtés égaux", u: "mm", c: [6, 12] },
  { n: 10, o: "Un ballon de décoration à dix côtés", u: "cm", c: [5, 15] },
  { n: 5, o: "Un fort à cinq côtés égaux", u: "m", c: [40, 150] },
  { n: 6, o: "Une table hexagonale", u: "cm", c: [40, 90] },
  { n: 8, o: "Un bassin octogonal", u: "m", c: [2, 6] },
  { n: 6, o: "Un flocon de neige dessiné dans un hexagone", u: "mm", c: [1, 5] },
];
const PAVAGES = [
  { o: "Une salle de bains", q: "carreaux" },
  { o: "Une ruche", q: "alvéoles" },
  { o: "Une terrasse", q: "dalles" },
  { o: "Un patchwork", q: "pièces de tissu" },
  { o: "Un sol de mosquée", q: "zelliges" },
  { o: "Une cuisine", q: "tomettes" },
];

export const polygonesReguliersBank = [
  /* ===== RECONNAÎTRE, CÔTÉS, PÉRIMÈTRE ===== */

  tpl("polygone_regulier_reconnaitre", 1, 1, "Compte les côtés : 5 pentagone, 6 hexagone, 8 octogone, 10 décagone, 12 dodécagone.", () => {
    const n = un(N_COURANTS);
    const text = un([
      `Comment s’appelle un polygone régulier à ${n} côtés ?`,
      `Quel est le nom d’un polygone régulier qui a ${n} côtés ?`,
      `Un polygone régulier a ${n} côtés égaux. Comment le nomme-t-on ?`,
      `Ce polygone régulier a ${n} côtés. Quel est son nom ?`,
      `On trace un polygone régulier à ${n} côtés. Comment s’appelle-t-il ?`,
      `${n} côtés égaux et ${n} angles égaux : quel polygone est-ce ?`,
    ]);
    const juste = NOM[n];
    return { text, format: "qcm", choices: qcm(juste, N_COURANTS.filter((x) => x !== n).map((x) => NOM[x])), expected: [juste], comparator: "mcq_exact", canvas: figPolygone(n), explanation: expliquer(DEF_REG, "le nom dit le nombre de côtés.", `${n} côtés.`, `c’est un ${NOM[n]}.`) };
  }),

  tpl("polygone_regulier_reconnaitre", 2, 1, "Dans un polygone régulier, tous les côtés ont la même longueur.", () => {
    const n = un(N_TOUS);
    const u = un(UNITES);
    const c = entre(2, 40);
    const text = un([
      `Un ${NOM[n]} a un côté de ${c} ${u}. Combien mesure un autre côté ?`,
      `Un côté d’un ${NOM[n]} mesure ${c} ${u}. Que mesure le côté voisin ?`,
      `Dans un ${NOM[n]}, un côté fait ${c} ${u}. Quelle est la longueur des autres côtés ?`,
      `Ce ${NOM[n]} a un premier côté de ${c} ${u}. Donne la longueur d’un autre côté.`,
      `${cap(NOM[n])} : un côté de ${c} ${u}. Combien mesure chacun des autres côtés ?`,
    ]);
    return { text, format: "short", expected: mesure(c, u), comparator: "number_equal", canvas: figPolygone(n, { texteCote: `${c} ${u}` }), explanation: expliquer(DEF_REG, "tous les côtés sont égaux.", `chacun mesure ${c}.`, `un autre côté mesure ${c} ${u}.`) };
  }),

  tpl("polygone_regulier_reconnaitre", 3, 2, "Périmètre = nombre de côtés × longueur d’un côté.", () => {
    const n = un(N_TOUS);
    const u = un(UNITES);
    const c = entre(2, 30);
    const text = un([
      `Un ${NOM[n]} a un côté de ${c} ${u}. Quel est son périmètre ?`,
      `Calcule le périmètre d’un ${NOM[n]} de côté ${c} ${u}.`,
      `Un côté de ${c} ${u}, ${n} côtés égaux : quel est le périmètre de ce polygone ?`,
      `Quel est le périmètre d’un ${NOM[n]} dont le côté mesure ${c} ${u} ?`,
      `Ce ${NOM[n]} a des côtés de ${c} ${u}. Donne son périmètre.`,
      `${cap(NOM[n])} de côté ${c} ${u} : trouve son périmètre.`,
    ]);
    return { text, format: "short", expected: mesure(n * c, u), comparator: "number_equal", canvas: figPolygone(n, { texteCote: `${c} ${u}` }), explanation: expliquer(DEF_REG, "on multiplie le nombre de côtés par la longueur d’un côté.", `${n} × ${c} = ${n * c}.`, `le périmètre est ${n * c} ${u}.`) };
  }),

  tpl("polygone_regulier_reconnaitre", 4, 2, "Côtés égaux ET angles égaux : les deux conditions comptent.", () => {
    const n = un([5, 6, 8] as const);
    const regulier = Math.random() < 0.5;
    const text = un([
      `Ce polygone à ${n} côtés est-il régulier ?`,
      `Observe ce polygone à ${n} côtés. Est-il régulier ?`,
      `Voici une figure à ${n} côtés. Choisis ce qui est vrai.`,
      `Regarde ses côtés : ce polygone à ${n} côtés est-il régulier ?`,
      `Ce polygone a ${n} côtés. Peut-on dire qu’il est régulier ?`,
      `Voici un polygone à ${n} côtés. Est-il régulier ou non ?`,
      `On a tracé un polygone à ${n} côtés. Que peut-on dire de lui ?`,
      `Ce polygone a-t-il ${n} côtés égaux ? Est-il régulier ?`,
      `Que dire de ce polygone à ${n} côtés ?`,
      `Compare les côtés de ce polygone à ${n} côtés : est-il régulier ?`,
      `Ce polygone de ${n} côtés est-il un polygone régulier ?`,
      `La figure a ${n} côtés. Est-ce un polygone régulier ?`,
    ]);
    const oui = "Oui : ses côtés et ses angles sont égaux";
    const non = "Non : ses côtés n’ont pas tous la même longueur";
    return {
      text,
      format: "qcm",
      choices: melange([oui, non, `Oui : il a ${n} côtés, cela suffit`, "Non : il faudrait qu’il ait quatre côtés"]),
      expected: [regulier ? oui : non],
      comparator: "mcq_exact",
      canvas: regulier ? figPolygone(n) : figIrreguliere(n),
      explanation: expliquer(DEF_REG, "avoir n côtés ne suffit pas : il faut qu’ils soient tous égaux.", regulier ? "ici, ils le sont tous." : "ici, certains sont plus longs que d’autres.", regulier ? "il est régulier." : "il n’est pas régulier."),
    };
  }),

  tpl("polygone_regulier_reconnaitre", 5, 3, "On divise le périmètre par le nombre de côtés.", () => {
    const O = un(OBJETS);
    const c = entre(O.c[0], O.c[1]);
    const P_ = O.n * c;
    const text = un([
      `${O.o} a ${O.n} côtés égaux et un périmètre de ${P_} ${O.u}. Combien mesure un côté ?`,
      `Le tour de cette forme fait ${P_} ${O.u} : ${O.o.charAt(0).toLowerCase() + O.o.slice(1)}, à ${O.n} côtés égaux. Quelle est la longueur d’un côté ?`,
      `${O.o} est un polygone régulier à ${O.n} côtés, de périmètre ${P_} ${O.u}. Calcule la longueur de son côté.`,
    ]);
    return { text, format: "short", expected: mesure(c, O.u), comparator: "number_equal", explanation: expliquer(DEF_REG, "tous les côtés sont égaux : on divise le périmètre par leur nombre.", `${P_} ÷ ${O.n} = ${c}.`, `un côté mesure ${c} ${O.u}.`) };
  }),

  tpl("polygone_regulier_reconnaitre", 6, 3, "Multiplie le côté par le nombre de côtés.", () => {
    const O = un(OBJETS);
    const c = entre(O.c[0], O.c[1]);
    const text = un([
      `${O.o} a ${O.n} côtés égaux de ${c} ${O.u}. Quelle longueur de ruban faut-il pour en faire le tour ?`,
      `On pose une bordure autour de cette forme : ${O.o.charAt(0).toLowerCase() + O.o.slice(1)}, à ${O.n} côtés de ${c} ${O.u}. Quelle est sa longueur ?`,
      `${O.o} est un polygone régulier à ${O.n} côtés, chacun de ${c} ${O.u}. Quel est son périmètre ?`,
    ]);
    return { text, format: "short", expected: mesure(O.n * c, O.u), comparator: "number_equal", explanation: expliquer(DEF_REG, "périmètre = nombre de côtés × côté.", `${O.n} × ${c} = ${O.n * c}.`, `il faut ${O.n * c} ${O.u}.`) };
  }),

  tpl("polygone_regulier_reconnaitre", 7, 4, "Un polygone régulier à n côtés a n axes de symétrie.", () => {
    const n = un(N_TOUS);
    const text = un([
      `Combien d’axes de symétrie a un ${NOM[n]} ?`,
      `Un ${NOM[n]} possède combien d’axes de symétrie ?`,
      `Quel est le nombre d’axes de symétrie d’un ${NOM[n]} ?`,
      `On plie un ${NOM[n]} pour que les deux moitiés se superposent. Combien de plis différents sont possibles ?`,
      `Ce ${NOM[n]} a des axes de symétrie : combien en compte-t-il ?`,
    ]);
    return { text, format: "short", expected: [String(n)], comparator: "number_equal", canvas: figPolygone(n), explanation: expliquer(DEF_REG, "il y a autant d’axes de symétrie que de côtés.", `${n} côtés, ${n} axes.`, `il a ${n} axes de symétrie.`) };
  }),

  tpl("polygone_regulier_reconnaitre", 8, 4, "Dans un hexagone régulier, chaque triangle du centre est équilatéral : le côté égale le rayon.", () => {
    const u = un(UNITES);
    const r = entre(2, 30);
    const text = un([
      `Un hexagone régulier est inscrit dans un cercle de rayon ${r} ${u}. Quel est son périmètre ?`,
      `On trace un hexagone régulier dans un cercle de ${r} ${u} de rayon, sommets sur le cercle. Calcule son périmètre.`,
      `Cercle de rayon ${r} ${u}, hexagone régulier inscrit : que vaut son périmètre ?`,
      `Les sommets d’un hexagone régulier sont sur un cercle de rayon ${r} ${u}. Donne le périmètre de cet hexagone.`,
    ]);
    return { text, format: "short", expected: mesure(6 * r, u), comparator: "number_equal", canvas: figPolygone(6, { cercle: true, centre: true }), explanation: expliquer("dans un hexagone régulier, l’angle au centre vaut 60° : chaque triangle du centre est équilatéral, et le côté est égal au rayon.", "périmètre = 6 × rayon.", `6 × ${r} = ${6 * r}.`, `le périmètre est ${6 * r} ${u}.`) };
  }),

  /* ===== ANGLES ===== */

  tpl("polygone_regulier_angles", 1, 1, "Angle au centre = 360° ÷ nombre de côtés.", () => {
    const n = un(N_ANGLES);
    const S = sujet(n);
    const text = un([
      `Combien mesure l’angle au centre d’${S} ?`,
      `Calcule l’angle au centre d’${S}.`,
      `Quel est l’angle au centre d’${S} ?`,
      `On trace ${S}. Quelle est la mesure de son angle au centre ?`,
      `Voici ${S}. Donne son angle au centre.`,
      `Dans ${S}, combien vaut l’angle au centre ?`,
      `Trouve l’angle au centre d’${S}.`,
    ]);
    return { text, format: "short", expected: enDegres(360 / n), comparator: "number_equal", canvas: n <= 12 ? figPolygone(n, { angleCentre: "?" }) : undefined, explanation: expliquer(DEF_ANGLES, "le tour complet se partage en n angles égaux.", `360 ÷ ${n} = ${360 / n}.`, `l’angle au centre mesure ${360 / n}°.`) };
  }),

  tpl("polygone_regulier_angles", 2, 1, "Angle intérieur = 180° − angle au centre.", () => {
    const n = un(N_ANGLES);
    const c = 360 / n;
    const text = un([
      `Un polygone régulier a un angle au centre de ${c}°. Combien mesure son angle intérieur ?`,
      `Angle au centre : ${c}°. Calcule l’angle intérieur de ce polygone régulier.`,
      `L’angle au centre d’un polygone régulier vaut ${c}°. Que vaut son angle intérieur ?`,
      `Donne l’angle intérieur d’un polygone régulier dont l’angle au centre mesure ${c}°.`,
      `Polygone régulier, angle au centre ${c}° : quel est son angle intérieur ?`,
      `Quel angle intérieur a un polygone régulier d’angle au centre ${c}° ?`,
    ]);
    return { text: avecCentreNomme(text), format: "short", expected: enDegres(180 - c), comparator: "number_equal", explanation: expliquer(DEF_ANGLES, "on enlève l’angle au centre à 180°.", `180 − ${c} = ${180 - c}.`, `l’angle intérieur mesure ${180 - c}°.`) };
  }),

  tpl("polygone_regulier_angles", 3, 2, "Deux étapes : angle au centre, puis angle intérieur.", () => {
    const n = un(N_ANGLES);
    const c = 360 / n;
    const S = sujet(n);
    const text = un([
      `Combien mesure l’angle intérieur d’${S} ?`,
      `Calcule l’angle intérieur d’${S}.`,
      `Quel est l’angle intérieur d’${S} ?`,
      `On trace ${S}. Quelle est la mesure de chaque angle intérieur ?`,
      `Voici ${S}. Donne la mesure d’un de ses angles intérieurs.`,
      `Dans ${S}, combien vaut un angle intérieur ?`,
      `Trouve l’angle intérieur d’${S}.`,
    ]);
    return { text, format: "short", expected: enDegres(180 - c), comparator: "number_equal", canvas: n <= 12 ? figPolygone(n, { angleInterieur: "?" }) : undefined, explanation: expliquer(DEF_ANGLES, "on calcule l’angle au centre, puis on l’enlève à 180°.", `360 ÷ ${n} = ${c}, puis 180 − ${c} = ${180 - c}.`, `l’angle intérieur mesure ${180 - c}°.`) };
  }),

  tpl("polygone_regulier_angles", 4, 2, "Le tour complet (360°) divisé par le nombre de côtés.", () => {
    const n = un(N_ANGLES);
    const juste = `360 ÷ ${n}`;
    const S = sujet(n);
    const text = un([
      `Quel calcul donne l’angle au centre d’${S} ?`,
      `Voici ${S}. Choisis le calcul de son angle au centre.`,
      `Pour ${S}, quel calcul donne l’angle au centre ?`,
      `Parmi ces calculs, lequel donne l’angle au centre d’${S} ?`,
      `On trace ${S}. Quel calcul faut-il faire pour obtenir son angle au centre ?`,
    ]);
    return { text, format: "qcm", choices: qcm(juste, [`180 ÷ ${n}`, `360 × ${n}`, `${n} ÷ 360`, `360 − ${n}`]), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_ANGLES, "les rayons menés aux sommets partagent le tour complet en n angles égaux.", juste + ".", `le bon calcul est ${juste}.`) };
  }),

  tpl("polygone_regulier_angles", 5, 3, "Si 360° ÷ n donne l’angle, alors n = 360° ÷ angle.", () => {
    const n = un(N_ANGLES);
    const c = 360 / n;
    const Q = un(["Une rosace", "Une roue de loterie", "Un vitrail", "Une toupie", "Un manège", "Un cadran décoratif"]);
    const text = un([
      `${Q} a la forme d’un polygone régulier, d’angle au centre ${c}°. Combien a-t-${Q.startsWith("Une") ? "elle" : "il"} de côtés ?`,
      `On dessine ${Q.toLowerCase()} en polygone régulier. Son angle au centre mesure ${c}°. Combien faut-il tracer de côtés ?`,
      `L’angle au centre d’un polygone régulier est ${c}°. Combien de côtés a ce polygone, qui décore ${Q.toLowerCase()} ?`,
    ]);
    return { text, format: "short", expected: [String(n)], comparator: "number_equal", explanation: expliquer(DEF_ANGLES, "on divise 360° par l’angle au centre.", `360 ÷ ${c} = ${n}.`, `il y a ${n} côtés.`) };
  }),

  tpl("polygone_regulier_angles", 6, 3, "Autour d’un point, les angles font 360° en tout.", () => {
    const P_ = un(PAVAGES);
    const n = un([3, 4, 6] as const);
    const int = n === 3 ? 60 : n === 4 ? 90 : 120;
    const text = un([
      `${P_.o} est couverte de ${P_.q} en forme de ${NOM[n]}, d’angle intérieur ${int}°. Combien de ${P_.q} se touchent en un même sommet ?`,
      `Dans ${P_.o.charAt(0).toLowerCase() + P_.o.slice(1)}, chaque ${NOM[n]} a un angle intérieur de ${int}°. Combien de ${P_.q} se rejoignent autour d’un point, sans trou ?`,
      `On couvre le sol sans trou avec des ${P_.q} en forme de ${NOM[n]} (angle intérieur ${int}°) : ${P_.o.toLowerCase()}. Combien de ${P_.q} autour d’un sommet ?`,
    ]);
    return { text: text.replace(/^(Une? [^ ]+.*?) est couverte/, (m, a) => (a.startsWith("Un ") ? `${a} est couvert` : m)), format: "short", expected: [String(360 / int)], comparator: "number_equal", explanation: expliquer("autour d’un sommet, les angles se complètent pour faire 360°.", "on divise 360° par l’angle intérieur.", `360 ÷ ${int} = ${360 / int}.`, `il y a ${360 / int} ${P_.q} autour d’un sommet.`) };
  }),

  tpl("polygone_regulier_angles", 7, 4, "Angle au centre = 180° − angle intérieur, puis n = 360° ÷ angle au centre.", () => {
    const n = un(N_ANGLES);
    const int = 180 - 360 / n;
    const text = un([
      `Un polygone régulier a un angle intérieur de ${int}°. Combien a-t-il de côtés ?`,
      `L’angle intérieur d’un polygone régulier mesure ${int}°. Trouve son nombre de côtés.`,
      `Angle intérieur : ${int}°. Combien de côtés a ce polygone régulier ?`,
      `Quel est le nombre de côtés d’un polygone régulier d’angle intérieur ${int}° ?`,
      `Chaque angle d’un polygone régulier fait ${int}°. Combien compte-t-il de côtés ?`,
    ]);
    return { text: avecCentreNomme(text), format: "short", expected: [String(n)], comparator: "number_equal", explanation: expliquer(DEF_ANGLES, "on retrouve l’angle au centre, puis on divise 360° par cet angle.", `180 − ${int} = ${360 / n}, puis 360 ÷ ${360 / n} = ${n}.`, `il a ${n} côtés.`) };
  }),

  tpl("polygone_regulier_angles", 8, 4, "OAB est isocèle en O : ses angles à la base sont égaux.", () => {
    const n = un(N_ANGLES);
    const c = 360 / n;
    const base = (180 - c) / 2;
    const S = sujet(n);
    const text = un([
      `[AB] est un côté d’${S}, de centre O. Combien mesure l’angle OAB ?`,
      `Dans ${S}, O est le centre et [AB] un côté. Calcule l’angle OAB.`,
      `O est le centre d’${S}, et [AB] l’un de ses côtés. Que vaut l’angle OAB ?`,
      `Le triangle OAB relie le centre O à un côté [AB] d’${S}. Donne la mesure de l’angle OAB.`,
      `Pour ${S}, de centre O et de côté [AB], trouve la mesure de l’angle OAB.`,
      `Le centre O et le côté [AB] d’${S} forment un triangle. Combien mesure son angle en A ?`,
    ]);
    return { text, format: "short", expected: enDegres(base), comparator: "number_equal", canvas: n <= 12 ? figPolygone(n, { rayons: true }) : undefined, explanation: expliquer(DEF_ANGLES, "OA = OB : le triangle OAB est isocèle en O.", `360 ÷ ${n} = ${c}, puis (180 − ${c}) ÷ 2 = ${fr(base)}.`, `l’angle OAB mesure ${fr(base)}°.`) };
  }),

  /* ===== APOTHÈME ET AIRE ===== */

  tpl("polygone_regulier_aire", 1, 1, "L’aire d’un triangle du centre : côté × apothème ÷ 2.", () => {
    const n = un(N_COURANTS);
    const c = 2 * entre(2, 15);
    const u = un(UNITES);
    const a = apotheme(n, c);
    const A = (c * a) / 2;
    const text = un([
      `Un ${NOM[n]} a un côté de ${c} ${u} et un apothème d’environ ${fr(a)} ${u}. Quelle est l’aire d’un triangle du centre ?`,
      `Côté : ${c} ${u}. Apothème : environ ${fr(a)} ${u}. Calcule l’aire d’un triangle joignant le centre à un côté de ce ${NOM[n]}.`,
      `Dans un ${NOM[n]}, côté ${c} ${u}, apothème environ ${fr(a)} ${u}. Que vaut l’aire d’un des ${n} triangles égaux du centre ?`,
      `Ce ${NOM[n]} se découpe en ${n} triangles égaux. Son côté mesure ${c} ${u}, son apothème environ ${fr(a)} ${u}. Donne l’aire d’un triangle.`,
    ]);
    return { text, format: "short", expected: mesure(A, `${u}²`), comparator: "number_equal", canvas: figPolygone(n, { rayons: true, apotheme: `${fr(a)} ${u}`, texteCote: `${c} ${u}` }), explanation: expliquer(DEF_AIRE, "chaque triangle a pour base le côté et pour hauteur l’apothème.", `${c} × ${fr(a)} ÷ 2 = ${fr(A)}.`, `le triangle a une aire d’environ ${fr(A)} ${u}².`) };
  }),

  tpl("polygone_regulier_aire", 2, 1, "L’apothème va du centre au milieu d’un côté, perpendiculairement.", () => {
    const n = un(N_TOUS);
    const text = un([
      `Dans un ${NOM[n]}, qu’est-ce que l’apothème ?`,
      `Comment définir l’apothème d’un ${NOM[n]} ?`,
      `Quel segment est l’apothème d’un ${NOM[n]} ?`,
      `Pour un ${NOM[n]}, l’apothème relie quels points ?`,
      `Choisis la définition de l’apothème d’un ${NOM[n]}.`,
    ]);
    const juste = "Le segment du centre au milieu d’un côté";
    return { text, format: "qcm", choices: qcm(juste, ["Le segment du centre à un sommet", "Un côté du polygone", "Le segment joignant deux sommets opposés"]), expected: [juste], comparator: "mcq_exact", canvas: figPolygone(n, { centre: true }), explanation: expliquer("l’apothème est la distance du centre à un côté : il arrive au milieu du côté, en formant un angle droit.", "du centre à un sommet, c’est le rayon du cercle circonscrit.", "centre → milieu d’un côté.", "c’est le segment du centre au milieu d’un côté.") };
  }),

  tpl("polygone_regulier_aire", 3, 2, "Aire = périmètre × apothème ÷ 2.", () => {
    const n = un(N_COURANTS);
    const c = 2 * entre(2, 12);
    const u = un(UNITES);
    const a = apotheme(n, c);
    const A = (n * c * a) / 2;
    const text = un([
      `Un ${NOM[n]} a un côté de ${c} ${u} et un apothème d’environ ${fr(a)} ${u}. Calcule son aire.`,
      `Côté : ${c} ${u}. Apothème : environ ${fr(a)} ${u}. Quelle est l’aire de ce ${NOM[n]} ?`,
      `Quelle est l’aire d’un ${NOM[n]} de côté ${c} ${u} et d’apothème environ ${fr(a)} ${u} ?`,
      `${cap(NOM[n])}, côté ${c} ${u}, apothème environ ${fr(a)} ${u} : donne son aire.`,
    ]);
    return { text, format: "short", expected: mesure(A, `${u}²`), comparator: "number_equal", canvas: figPolygone(n, { apotheme: `${fr(a)} ${u}`, texteCote: `${c} ${u}` }), explanation: expliquer(DEF_AIRE, "on calcule le périmètre, puis on applique la formule.", `${n} × ${c} = ${n * c}, puis ${n * c} × ${fr(a)} ÷ 2 = ${fr(A)}.`, `l’aire est d’environ ${fr(A)} ${u}².`) };
  }),

  tpl("polygone_regulier_aire", 4, 2, "Le périmètre est déjà donné : il suffit de le multiplier par l’apothème, puis de diviser par 2.", () => {
    const n = un(N_COURANTS);
    const c = 2 * entre(2, 12);
    const u = un(UNITES);
    const P_ = n * c;
    const a = apotheme(n, c);
    const A = (P_ * a) / 2;
    const juste = `${P_} × ${fr(a)} ÷ 2`;
    const text = un([
      `Un ${NOM[n]} a un périmètre de ${P_} ${u} et un apothème d’environ ${fr(a)} ${u}. Quel calcul donne son aire ?`,
      `Périmètre : ${P_} ${u}. Apothème : environ ${fr(a)} ${u}. Choisis le calcul de l’aire de ce ${NOM[n]}.`,
      `Quel calcul donne l’aire d’un ${NOM[n]} de périmètre ${P_} ${u} et d’apothème environ ${fr(a)} ${u} ?`,
      `Parmi ces calculs, lequel donne l’aire d’un ${NOM[n]} de périmètre ${P_} ${u}, d’apothème environ ${fr(a)} ${u} ?`,
    ]);
    return { text, format: "qcm", choices: qcm(juste, [`${P_} × ${fr(a)}`, `${P_} + ${fr(a)}`, `${P_} ÷ ${fr(a)} × 2`, `${c} × ${fr(a)} × 2`]), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_AIRE, "périmètre × apothème ÷ 2.", juste + ".", `le bon calcul est ${juste} (environ ${fr(A)} ${u}²).`) };
  }),

  tpl("polygone_regulier_aire", 5, 3, "Calcule l’aire avec périmètre × apothème ÷ 2.", () => {
    const O = un(OBJETS.filter((x) => x.n !== 3));
    const c = 2 * entre(Math.ceil(O.c[0] / 2), Math.max(Math.ceil(O.c[0] / 2), Math.floor(O.c[1] / 2)));
    const a = apotheme(O.n, c);
    const A = (O.n * c * a) / 2;
    const text = un([
      `${O.o} est un polygone régulier à ${O.n} côtés de ${c} ${O.u}, avec un apothème d’environ ${fr(a)} ${O.u}. Calcule son aire.`,
      `On modélise cette forme, ${O.o.charAt(0).toLowerCase() + O.o.slice(1)}, par un polygone régulier à ${O.n} côtés : côté ${c} ${O.u}, apothème environ ${fr(a)} ${O.u}. Quelle surface occupe-t-elle ?`,
      `Quelle surface couvre cette forme : ${O.o.charAt(0).toLowerCase() + O.o.slice(1)}, ${O.n} côtés de ${c} ${O.u}, apothème environ ${fr(a)} ${O.u} ?`,
    ]);
    return { text, format: "short", expected: mesure(A, `${O.u}²`), comparator: "number_equal", explanation: expliquer(DEF_AIRE, "périmètre × apothème ÷ 2.", `${O.n} × ${c} = ${O.n * c}, puis ${O.n * c} × ${fr(a)} ÷ 2 = ${fr(A)}.`, `l’aire est d’environ ${fr(A)} ${O.u}².`) };
  }),

  tpl("polygone_regulier_aire", 6, 3, "Un carré : son apothème vaut la moitié du côté. Vérifie avec côté × côté.", () => {
    const u = "cm";
    const c = 2 * entre(5, 40);
    const objet = un(["Un carreau", "Une dalle", "Un napperon", "Une nappe carrée", "Un tapis carré", "Un panneau carré", "Un coussin", "Un miroir carré"]);
    const text = un([
      `${objet} est un carré de côté ${c} ${u}. Son apothème vaut la moitié du côté. Calcule son aire avec périmètre × apothème ÷ 2.`,
      `${objet} : carré de ${c} ${u} de côté, apothème égal à ${c / 2} ${u}. Applique périmètre × apothème ÷ 2 pour trouver son aire.`,
      `On vérifie la formule sur un carré : ${objet.toLowerCase()} de côté ${c} ${u}, d’apothème ${c / 2} ${u}. Quelle aire donne périmètre × apothème ÷ 2 ?`,
    ]);
    return { text, format: "short", expected: mesure(c * c, `${u}²`), comparator: "number_equal", explanation: expliquer(DEF_AIRE, "le périmètre vaut 4 × côté ; la formule redonne côté × côté.", `4 × ${c} = ${4 * c}, puis ${4 * c} × ${c / 2} ÷ 2 = ${c * c}.`, `l’aire est ${c * c} ${u}².`) };
  }),

  tpl("polygone_regulier_aire", 7, 4, "Aire = périmètre × apothème ÷ 2, donc apothème = 2 × aire ÷ périmètre.", () => {
    const n = un(N_COURANTS);
    const u = un(UNITES);
    const P_ = n * 2 * entre(2, 10);
    const c = P_ / n;
    // L'apothème doit être réaliste pour ce périmètre : on le recalcule puis on arrondit à l'entier.
    const vrai = Math.max(1, Math.round(apotheme(n, c)));
    const A = (P_ * vrai) / 2;
    const text = un([
      `Un ${NOM[n]} a une aire d’environ ${fr(A)} ${u}² et un périmètre de ${P_} ${u}. Quel est son apothème, à peu près ?`,
      `Aire : environ ${fr(A)} ${u}². Périmètre : ${P_} ${u}. Calcule l’apothème approché de ce ${NOM[n]}.`,
      `Quel apothème approché a un ${NOM[n]} d’aire environ ${fr(A)} ${u}² et de périmètre ${P_} ${u} ?`,
      `On connaît l’aire d’un ${NOM[n]}, environ ${fr(A)} ${u}², et son périmètre, ${P_} ${u}. Donne son apothème approché.`,
    ]);
    return { text, format: "short", expected: mesure(vrai, u), comparator: "number_equal", explanation: expliquer(DEF_AIRE, "on retourne la formule : apothème = 2 × aire ÷ périmètre.", `2 × ${fr(A)} ÷ ${P_} = ${vrai}.`, `l’apothème mesure environ ${vrai} ${u}.`) };
  }),

  tpl("polygone_regulier_aire", 8, 4, "Découpe l’hexagone en 6 triangles équilatéraux : on connaît le côté et leur hauteur.", () => {
    const u = un(UNITES);
    const c = 2 * entre(2, 12);
    const a = apotheme(6, c);
    const T = (c * a) / 2;
    const k = un([2, 3, 4, 5] as const);
    const text = un([
      `Un hexagone régulier a un côté de ${c} ${u} et un apothème d’environ ${fr(a)} ${u}. Quelle est l’aire de ${k} des 6 triangles égaux formés depuis le centre ?`,
      `On colorie ${k} des 6 triangles égaux d’un hexagone régulier (côté ${c} ${u}, apothème environ ${fr(a)} ${u}). Quelle aire est coloriée ?`,
      `Hexagone régulier, côté ${c} ${u}, apothème environ ${fr(a)} ${u}, découpé en 6 triangles depuis le centre : combien mesurent ${k} de ces triangles ?`,
    ]);
    return { text, format: "short", expected: mesure(k * T, `${u}²`), comparator: "number_equal", canvas: figPolygone(6, { parts: k }), explanation: expliquer(DEF_AIRE, "on calcule l’aire d’un triangle, puis on multiplie.", `${c} × ${fr(a)} ÷ 2 = ${fr(T)}, puis ${fr(T)} × ${k} = ${fr(k * T)}.`, `l’aire est d’environ ${fr(k * T)} ${u}².`) };
  }),
];
