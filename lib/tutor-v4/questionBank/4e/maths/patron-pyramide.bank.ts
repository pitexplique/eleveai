// LE PATRON D'UNE PYRAMIDE RÉGULIÈRE (06/11/2026).
//
// Suisse, Sénégal, Côte d'Ivoire. Visible en France : cycle 4, « Reconnaître des solides (…
// pyramide …) » et « Construire (…) des représentations de ces solides (…) patrons »
// (`docs/bo-maths-cycle4-recopie.md`). ⛔ ★1-★2 : sans contexte.
// ⭐ La hauteur d'une face vient de Pythagore : des triplets, pour que les nombres tombent juste.

import { cotePiece, patronPyramide } from "@/lib/canvas/patron-solide";
import { entre, expliquer, un } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { choix, comparer, court, fabriquePatrons, figure } from "@/lib/tutor-v4/questionBank/patrons-outils";

const tpl = fabriquePatrons("4e", "vision_espace", "patron_pyramide");
const DEF = "le patron d'une pyramide régulière a une base et un triangle isocèle par côté de la base. Chaque triangle a pour base un côté de la base, et pour côtés égaux l'arête qui monte au sommet.";
const BASES = [{ n: 3, nom: "un triangle équilatéral" }, { n: 4, nom: "un carré" }, { n: 5, nom: "un pentagone régulier" }, { n: 6, nom: "un hexagone régulier" }];
const UNITE = ["cm", "cm", "cm", "dm", "m"];
const arete = (n: number, c: number) => {
  // L'arête doit dépasser le rayon de la base, sinon le sommet ne se referme pas.
  const R = c / (2 * Math.sin(Math.PI / n));
  return Math.ceil(R + 1) + entre(1, 4);
};
const dims = () => {
  const B = un(BASES);
  const c = entre(3, 10);
  return { B, c, s: arete(B.n, c), u: un(UNITE) };
};
/** Base carrée de côté c = 2x, hauteur de face a, arête s : un triplet de Pythagore. ⚠️ a > x, sinon la pyramide ne se referme pas. */
const carre = () => {
  const [x, a, s] = un([[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20], [7, 24, 25], [15, 20, 25], [10, 24, 26], [9, 40, 41]] as number[][]);
  return { c: 2 * x, a, s };
};
const DIRE = (nom: string, c: number, s: number, u: string) => [
  `Une pyramide régulière a pour base ${nom} de côté ${c} ${u}. Ses arêtes latérales mesurent ${s} ${u}.`,
  `La base d'une pyramide régulière est ${nom} de côté ${c} ${u}, et ses arêtes latérales font ${s} ${u}.`,
  `Pyramide régulière : la base est ${nom} de côté ${c} ${u}, arêtes latérales de ${s} ${u}.`,
  `On dessine le patron d'une pyramide régulière : la base est ${nom} de côté ${c} ${u}, arêtes latérales de ${s} ${u}.`,
  `Voici une pyramide régulière dont la base est ${nom} de côté ${c} ${u} et dont les arêtes latérales valent ${s} ${u}.`,
];
const tri = (a: number, b: number, c: number, u: string) => `${a} ${u}, ${b} ${u} et ${c} ${u}`;

export const patronPyramideBank = [
  tpl(1, "Un triangle par côté de la base.", () => {
    const B = un(BASES);
    const tous = Math.random() < 0.5;
    const juste = tous ? B.n + 1 : B.n;
    const quoi = tous ? ["Combien de faces compte son patron, base comprise ?", "Combien de polygones dessine-t-on pour son patron ?", "Son patron a combien de morceaux, base comprise ?", "Combien de faces faut-il tracer en tout ?"] : ["Combien de triangles compte son patron ?", "Combien de triangles dessine-t-on autour de la base ?", "Son patron a combien de faces triangulaires ?", "Combien de triangles faut-il tracer ?"];
    const debut = un([`La base d'une pyramide régulière est ${B.nom}.`, `Une pyramide régulière a pour base ${B.nom}.`, `Voici une pyramide dont la base est ${B.nom}.`, `On veut le patron d'une pyramide à base régulière : ${B.nom}.`]);
    return court(`${debut} ${un(quoi)}`, juste, "", expliquer(DEF, "on compte les côtés de la base.", `${B.n} côtés donc ${B.n} triangles${tous ? `, plus la base : ${juste}` : ""}.`, `la réponse est ${juste}.`));
  }),
  tpl(1, "Deux arêtes qui se recollent ont la même longueur.", () => {
    const { B, c, s, u } = dims();
    const P = patronPyramide(B.n, c, s);
    const T = P.pieces;
    P.pieces[0].nom = `${c} ${u}`;
    P.cotes = [cotePiece(T[1], 1, `${s} ${u}`), cotePiece(T[Math.floor(B.n / 2) + 1], 2, "?", true)];
    return court(un([
      "Sur ce patron de pyramide régulière, que vaut « ? » ?", "Combien mesure le côté marqué « ? » ?", "Regarde ce patron. Quelle est la longueur « ? » ?", "Que mesure le segment « ? » de ce patron ?", "Trouve la longueur « ? » sur ce patron de pyramide.",
      "Toutes les arêtes qui montent au sommet sont égales. Que vaut « ? » ?", "Ce patron est celui d'une pyramide régulière. Combien mesure « ? » ?", "Donne la longueur du côté « ? ».", "Complète ce patron : que mesure « ? » ?", "Combien vaut « ? » dans ce patron ?",
    ]), s, u, expliquer(DEF, "dans une pyramide régulière, les arêtes latérales sont égales.", `elles mesurent toutes ${s} ${u}.`, `« ? » vaut ${s} ${u}.`), figure([P], "Le patron d'une pyramide régulière, la base au centre, un côté de triangle marqué d'un point d'interrogation"));
  }),
  tpl(1, "Le triangle a pour base un côté de la base, et pour côtés égaux l'arête latérale.", () => {
    const { B, c, s, u } = dims();
    const juste = tri(c, s, s, u);
    return choix(`${un(DIRE(B.nom, c, s, u))} ${un(["Quelles sont les longueurs des côtés d'un triangle de son patron ?", "Quel triangle dessine-t-on sur chaque côté de la base ?", "Quels sont les côtés d'une face triangulaire ?", "Quel triangle du patron correspond à cette pyramide ?", "Quelles longueurs a une face triangulaire ?"])}`, juste, [tri(c, c, s, u), tri(c, c, c, u), tri(s, s, s, u), tri(c, s, s + 1, u), tri(c + 1, s, s, u)], expliquer(DEF, "un côté du triangle touche la base ; les deux autres montent au sommet.", `base ${c} ${u}, côtés ${s} ${u}.`, `le triangle a pour côtés ${juste}.`));
  }),
  tpl(1, "Toutes les arêtes qui montent au sommet : leur nombre est celui des côtés de la base.", () => {
    const { B, c, s, u } = dims();
    const total = B.n * s;
    return court(`${un(DIRE(B.nom, c, s, u))} ${un(["Combien mesurent, ensemble, toutes ses arêtes latérales ?", "Quelle est la longueur totale de ses arêtes latérales ?", "Calcule la somme de ses arêtes latérales.", "Mises bout à bout, que mesurent ses arêtes latérales ?", "Que vaut la somme des arêtes qui montent au sommet ?"])}`, total, u, expliquer(DEF, "il y a une arête latérale par côté de la base.", `${B.n} × ${s} = ${total}.`, `la somme est ${total} ${u}.`));
  }),

  tpl(2, "La base a bien ses côtés, un triangle par côté, et les triangles doivent pouvoir se rejoindre.", () => {
    const { B, c, s, u } = dims();
    const vrai = patronPyramide(B.n, c, s);
    const faux = [
      patronPyramide(B.n, c, s, { defaut: "triangle_manquant" }),
      patronPyramide(B.n, c, s, { defaut: "triangles_trop_courts" }),
      patronPyramide(B.n, c, s, { defaut: "base_fausse" }),
    ];
    return comparer(`${un(DIRE(B.nom, c, s, u))} ${un(["Lequel de ces dépliages est son patron ?", "Quel dépliage donne cette pyramide une fois plié ?", "Quel est le bon patron ?", "Lequel se plie pour former cette pyramide ?", "Choisis le dépliage qui se referme."])}`, vrai, faux, expliquer(DEF, "on vérifie la base, le nombre de triangles et la longueur de leurs côtés égaux.", "un seul dépliage respecte tout.", "c'est le seul qui se referme."), "Quatre dépliages, A, B, C et D, dont un seul est le patron de la pyramide");
  }),
  tpl(2, "Le contour du patron : deux arêtes latérales par triangle.", () => {
    const { B, c, s, u } = dims();
    const C = 2 * B.n * s;
    return court(`${un(DIRE(B.nom, c, s, u))} ${un(["Quel est le périmètre de son patron en étoile ?", "Quelle est la longueur du contour de son patron en étoile ?", "Si l'on découpe son patron en étoile, quelle longueur de ciseaux parcourt-on ?", "Calcule le tour de son patron en étoile.", "Combien mesure le bord de ce patron en étoile ?"])}`, C, u, expliquer(DEF, "le bord du patron passe par les deux côtés égaux de chaque triangle ; les côtés de la base sont à l'intérieur.", `${B.n} × 2 × ${s} = ${C}.`, `le contour mesure ${C} ${u}.`), figure([patronPyramide(B.n, c, s)], "Le patron en étoile de la pyramide"));
  }),
  tpl(2, "La hauteur du triangle coupe sa base en deux : applique Pythagore.", () => {
    const { c, a, s } = carre();
    const u = un(UNITE);
    return court(`${un(DIRE("un carré", c, s, u))} ${un(["Quelle est la hauteur d'une face triangulaire, menée du sommet ?", "Que mesure la hauteur de chaque triangle du patron, menée du sommet ?", "Calcule la hauteur d'un triangle du patron, issue du sommet.", "Combien mesure la hauteur d'une face, issue du sommet ?", "Trouve la hauteur issue du sommet d'une face triangulaire."])}`, a, u, expliquer(DEF, "dans un triangle isocèle, la hauteur issue du sommet coupe la base en deux. On applique le théorème de Pythagore.", `${s}² − ${c / 2}² = ${s * s} − ${(c * c) / 4} = ${a * a}, et ${a}² = ${a * a}.`, `la hauteur mesure ${a} ${u}.`));
  }),
  tpl(2, "Aire d'un triangle = base × hauteur ÷ 2.", () => {
    const { c, a, s } = carre();
    const u = un(UNITE);
    const A = (c * a) / 2;
    return court(`${un([`Une face d'une pyramide régulière a pour base ${c} ${u} et pour hauteur ${a} ${u}.`, `Sur le patron d'une pyramide, un triangle a une base de ${c} ${u} et une hauteur de ${a} ${u}.`, `Patron de pyramide régulière : triangle de base ${c} ${u}, de hauteur ${a} ${u}.`, `Un triangle du patron d'une pyramide mesure ${c} ${u} de base et ${a} ${u} de hauteur.`, `Dans le patron d'une pyramide, une face a ${c} ${u} de base et ${a} ${u} de haut.`])} ${un(["Quelle est son aire ?", "Calcule l'aire de cette face.", "Que vaut l'aire de ce triangle ?", "Quelle aire occupe-t-il sur le patron ?", "Combien vaut son aire ?"])}`, A, `${u}²`, expliquer(DEF, "on applique la formule de l'aire d'un triangle.", `${c} × ${a} ÷ 2 = ${A}.`, `l'aire est ${A} ${u}².`) + `\n\nOn vérifie : l'arête latérale vaut ${s} ${u}.`);
  }),

  tpl(3, "Aire du patron = aire de la base + aires des 4 triangles.", () => {
    const { c, a } = carre();
    const O = un(["un toit de kiosque", "une lanterne de papier", "une tente de scout", "un chapeau de clown", "une boîte à bijoux", "une pyramide de décoration", "un clocher miniature", "une serre de jardin", "un abri à oiseaux", "une maquette de monument"]);
    const A = c * c + 2 * c * a;
    return court(`On découpe le patron d'${O} en forme de pyramide à base carrée : côté ${c} cm, hauteur de chaque face ${a} cm. ${un(["Quelle surface de matériau faut-il, sans les chutes ?", "Quelle est l'aire totale de son patron ?", "Quelle aire de carton faut-il sans les chutes ?", "Combien de cm² couvre ce patron ?"])}`, A, "cm²", expliquer(DEF, "on ajoute le carré et les 4 triangles.", `${c} × ${c} + 4 × ${c} × ${a} ÷ 2 = ${c * c} + ${2 * c * a} = ${A}.`, `il faut ${A} cm².`), figure([patronPyramide(4, c, Math.hypot(c / 2, a))], "Le patron de la pyramide à base carrée"));
  }),
  tpl(3, "Le patron en croix : un côté et deux hauteurs de face.", () => {
    const { c, a } = carre();
    const W = un(["Une maquettiste", "Un boulanger", "Une architecte", "Un décorateur de théâtre", "Une fleuriste", "Un apiculteur", "Une couturière", "Un charpentier", "Une luthière", "Un pâtissier"]);
    return court(`${W} découpe, dans une feuille carrée, le patron en croix d'une pyramide à base carrée : côté ${c} cm, hauteur de chaque face ${a} cm. ${un(["Quel côté minimal doit avoir la feuille ?", "Quelle taille minimale de feuille carrée faut-il ?", "Quel est le plus petit côté de feuille possible, avec ce tracé ?", "Combien doit mesurer, au moins, le côté de la feuille ?"])}`, c + 2 * a, "cm", expliquer(DEF, "de bout en bout : une hauteur de face, le côté de la base, une hauteur de face.", `${a} + ${c} + ${a} = ${c + 2 * a}.`, `il faut au moins ${c + 2 * a} cm.`), figure([patronPyramide(4, c, Math.hypot(c / 2, a))], "Le patron en croix de la pyramide"));
  }),
  tpl(3, "L'arête latérale : Pythagore dans la moitié d'une face.", () => {
    const { c, a, s } = carre();
    const O = un(["une tente", "un toit de cabane", "une lanterne", "un abri à vélos", "un kiosque", "une ruche décorative", "un monument de carton", "un sommet de phare", "une serre", "une verrière"]);
    return court(`Pour ${O} en forme de pyramide à base carrée, on trace sur le patron un triangle de base ${c} dm et de hauteur ${a} dm. ${un(["Quelle longueur doit avoir son côté oblique ?", "Combien mesure chaque arête latérale ?", "Que mesure chacun des deux côtés égaux de ce triangle ?", "Quelle longueur de baguette faut-il pour une arête latérale ?"])}`, s, "dm", expliquer(DEF, "la hauteur coupe la base en deux : un triangle rectangle de côtés la moitié de la base et la hauteur.", `${c / 2}² + ${a}² = ${(c * c) / 4} + ${a * a} = ${s * s} = ${s}².`, `l'arête mesure ${s} dm.`));
  }),
  tpl(3, "Toutes les arêtes du solide : celles de la base, et celles qui montent au sommet.", () => {
    const { B, c, s } = dims();
    const O = un(["une sculpture en fil de fer", "une structure de lampe", "un cadre en bambou", "une maquette en baguettes", "une armature de tente", "une cage à oiseau", "un mobile de musée", "une structure en tiges de cuivre", "une balise de marin", "un décor de scène"]);
    const T = B.n * c + B.n * s;
    return court(`Pour ${O} en forme de pyramide régulière, la base est ${B.nom} de côté ${c} cm, et les arêtes latérales font ${s} cm. ${un(["Quelle longueur totale de matériau faut-il pour toutes les arêtes ?", "Quelle longueur faut-il pour réaliser toutes ses arêtes ?", "Combien de centimètres faut-il pour toute l'armature ?", "Quelle est la somme de toutes les arêtes ?"])}`, T, "cm", expliquer(DEF, "il y a autant d'arêtes à la base que d'arêtes qui montent au sommet.", `${B.n} × ${c} + ${B.n} × ${s} = ${T}.`, `il faut ${T} cm.`));
  }),
];
