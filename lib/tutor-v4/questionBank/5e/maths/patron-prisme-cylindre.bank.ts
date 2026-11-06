// LE PATRON D'UN PRISME DROIT ET D'UN CYLINDRE (06/11/2026).
//
// Suisse, Sénégal, Côte d'Ivoire. Visible en France : cycle 4, « Reconnaître des solides (pavé
// droit, cube, prisme, cylindre, pyramide, cône, boule) » et « Construire (…) des représentations
// de ces solides (…) patrons » (`docs/bo-maths-cycle4-recopie.md`).
// ⭐ Le cœur : la longueur du rectangle du cylindre est le périmètre du disque.
// ⛔ ★1-★2 : sans contexte. Le dépliage se calcule, jamais saisi.

import { cotePiece, patronCylindre, patronPrisme } from "@/lib/canvas/patron-solide";
import { entre, expliquer, fr, un } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { choix, comparer, court, fabriquePatrons, figure } from "@/lib/tutor-v4/questionBank/patrons-outils";

const tpl = fabriquePatrons("5e", "volume_solide", "patron_prisme_cylindre");
const DEF_C = "le patron d'un cylindre est un rectangle et deux disques. La largeur du rectangle est la hauteur du cylindre ; sa longueur est le périmètre du disque, 2 × π × rayon.";
const DEF_P = "le patron d'un prisme droit a deux bases superposables et un rectangle par côté de la base. Ces rectangles ont tous pour largeur la hauteur du prisme.";
const net2 = (x: number) => Math.round(x * 100) / 100;
const peri = (r: number) => net2(2 * 3.14 * r);
const PI = ["Prends π ≈ 3,14.", "Utilise π ≈ 3,14.", "On prend π ≈ 3,14.", "Calcule avec π ≈ 3,14."];

const dimsC = () => {
  const r = entre(2, 9);
  return { r, h: entre(r + 1, Math.max(r + 3, 3 * r)), u: un(["cm", "cm", "cm", "dm", "m"]) };
};
const TRIANGLES: [number, number, number][] = [[3, 4, 5], [5, 5, 6], [6, 8, 10], [4, 5, 6], [5, 6, 7], [6, 7, 8], [7, 8, 9], [4, 4, 4], [6, 6, 6], [5, 5, 8], [8, 8, 6], [7, 7, 4], [9, 9, 8]];
const dimsP = () => {
  const [a, b, c] = un(TRIANGLES);
  return { a, b, c, h: entre(4, 12), u: un(["cm", "cm", "cm", "dm", "m"]) };
};
const CYL = (r: number, h: number, u: string) => [`Un cylindre a pour rayon ${r} ${u} et pour hauteur ${h} ${u}.`, `Voici un cylindre de rayon ${r} ${u} et de hauteur ${h} ${u}.`, `Cylindre : rayon ${r} ${u}, hauteur ${h} ${u}.`, `On dessine le patron d'un cylindre de rayon ${r} ${u} et de hauteur ${h} ${u}.`, `Un cylindre mesure ${r} ${u} de rayon et ${h} ${u} de haut.`];
const PRI = (a: number, b: number, c: number, h: number, u: string) => [`La base d'un prisme droit est un triangle de côtés ${a} ${u}, ${b} ${u} et ${c} ${u}. Sa hauteur est ${h} ${u}.`, `Un prisme droit a une base triangulaire de côtés ${a} ${u}, ${b} ${u}, ${c} ${u} et une hauteur de ${h} ${u}.`, `Prisme droit : base de côtés ${a} ${u}, ${b} ${u}, ${c} ${u} ; hauteur ${h} ${u}.`, `On dessine le patron d'un prisme droit à base triangulaire (côtés ${a} ${u}, ${b} ${u}, ${c} ${u}), de hauteur ${h} ${u}.`, `Voici un prisme droit : un triangle de ${a} ${u}, ${b} ${u}, ${c} ${u} pour base, ${h} ${u} de hauteur.`];
const BASES = [{ n: 3, nom: "un triangle" }, { n: 4, nom: "un quadrilatère" }, { n: 5, nom: "un pentagone" }, { n: 6, nom: "un hexagone" }, { n: 8, nom: "un octogone" }];

/** Le cylindre dessiné : le rayon dans les disques, une ou deux cotes sur le rectangle. */
function figCylindre(r: number, h: number, u: string, inconnue: "longueur" | "largeur" | null) {
  // « ? » sur le grand côté du bas : le disque se pousse, pour laisser la place au texte.
  const P = patronCylindre(r, h, inconnue === "longueur" ? { decalageBas: 0 } : {});
  P.disques = (P.disques ?? []).map((d, i) => (i === 0 ? { ...d, nom: `r = ${r} ${u}` } : d));
  const rect = P.pieces[0];
  P.cotes = [
    ...(inconnue === "longueur" ? [cotePiece(rect, 2, "?", true), cotePiece(rect, 3, `${h} ${u}`)] : []),
    ...(inconnue === "largeur" ? [cotePiece(rect, 3, "?", true)] : []),
  ];
  return figure([P], "Le patron d'un cylindre : un rectangle et deux disques");
}

export const patronPrismeCylindreBank = [
  tpl(1, "La longueur du rectangle s'enroule autour du disque : c'est son périmètre.", () => {
    const { r, h, u } = dimsC();
    const L = peri(r);
    return court(`${un(CYL(r, h, u))} ${un(PI)} ${un(["Quelle est la longueur « ? » du rectangle de son patron ?", "Combien mesure le côté « ? » du rectangle ?", "Que vaut le côté marqué « ? » ?", "Quelle est la grande dimension de ce rectangle ?", "Calcule la longueur « ? » de ce patron."])}`, L, u, expliquer(DEF_C, "on calcule le périmètre du disque.", `2 × 3,14 × ${r} = ${fr(L)}.`, `le rectangle mesure ${fr(L)} ${u} de long.`), figCylindre(r, h, u, "longueur"));
  }),
  tpl(1, "La largeur du rectangle du patron est la hauteur du cylindre.", () => {
    const { r, h, u } = dimsC();
    return court(`${un(CYL(r, h, u))} ${un(["Combien mesure le côté « ? » du rectangle de son patron ?", "Que vaut « ? » sur ce patron ?", "Quelle est la longueur marquée « ? » ?", "Quelle largeur « ? » a ce rectangle ?", "Trouve le côté « ? » de ce patron."])}`, h, u, expliquer(DEF_C, "ce côté monte de disque en disque : c'est la hauteur.", `la hauteur vaut ${h} ${u}.`, `« ? » vaut ${h} ${u}.`), figCylindre(r, h, u, "largeur"));
  }),
  tpl(1, "Les rectangles mis bout à bout font le tour de la base : le périmètre.", () => {
    const { a, b, c, h, u } = dimsP();
    const P = patronPrisme(a, b, c, h);
    for (const k of [0, 1, 2]) P.pieces[k].fond = "#fde68a";
    P.cotes = [cotePiece(P.pieces[0], 3, `${h} ${u}`)];
    return court(`${un(PRI(a, b, c, h, u))} ${un(["Quelle est la longueur totale de la bande colorée de son patron ?", "Combien mesure la bande colorée, d'un bout à l'autre ?", "Que mesure la bande colorée dans le sens de la longueur ?", "Calcule la longueur de la bande colorée.", "La bande colorée fait le tour de la base. Quelle est sa longueur ?"])}`, a + b + c, u, expliquer(DEF_P, "la bande met bout à bout un rectangle par côté de la base.", `${a} + ${b} + ${c} = ${a + b + c}.`, `la bande mesure ${a + b + c} ${u}.`), figure([P], "Le patron d'un prisme droit, sa bande de rectangles colorée"));
  }),
  tpl(1, "Un rectangle par côté de la base, plus les deux bases.", () => {
    const B = un(BASES);
    const faces = Math.random() < 0.5;
    const juste = faces ? B.n + 2 : B.n;
    const quoi = faces ? ["Combien de faces a son patron ?", "Combien de morceaux compte son patron, bases comprises ?", "Combien de polygones dessine-t-on pour son patron ?", "Combien de faces faut-il dessiner sur le patron ?"] : ["Combien de rectangles a son patron ?", "Combien de rectangles dessine-t-on sur son patron ?", "Son patron compte combien de faces rectangulaires ?", "Combien de rectangles faut-il tracer pour son patron ?"];
    return court(`${un([`La base d'un prisme droit est ${B.nom}.`, `Un prisme droit a pour base ${B.nom}.`, `Voici un prisme droit dont la base est ${B.nom}.`, `Prisme droit à base : ${B.nom}.`])} ${un(quoi)}`.replace("base : un ", "base : ").replace("base : une ", "base : "), juste, "", expliquer(DEF_P, "on compte un rectangle par côté de la base, puis les deux bases si on veut toutes les faces.", `${B.n} côtés, donc ${B.n} rectangles${faces ? ` et 2 bases : ${B.n} + 2 = ${juste}` : ""}.`, `la réponse est ${juste}.`));
  }),

  tpl(2, "Longueur du rectangle = 2 × π × rayon : divise pour remonter au rayon.", () => {
    const { r, h, u } = dimsC();
    const L = peri(r);
    const dia = Math.random() < 0.5;
    const quoi = dia ? "diamètre" : "rayon";
    return court(`${un([`Le rectangle du patron d'un cylindre a une longueur de ${fr(L)} ${u} et une largeur de ${h} ${u}.`, `Sur le patron d'un cylindre, le rectangle a pour longueur ${fr(L)} ${u} et pour largeur ${h} ${u}.`, `Patron d'un cylindre : un rectangle de longueur ${fr(L)} ${u} et de largeur ${h} ${u}.`, `Le côté du rectangle qui s'enroule autour du disque mesure ${fr(L)} ${u}, l'autre ${h} ${u}.`])} ${un(PI)} ${un([`Quel est le ${quoi} des disques ?`, `Que vaut le ${quoi} du disque ?`, `Quel ${quoi} faut-il donner aux disques ?`, `Trouve le ${quoi} du disque.`])}`, dia ? 2 * r : r, u, expliquer(DEF_C, "la longueur est 2 × 3,14 × rayon : on divise par 6,28.", `${fr(L)} ÷ 6,28 = ${r}${dia ? ` ; 2 × ${r} = ${2 * r}` : ""}.`, `le ${quoi} vaut ${dia ? 2 * r : r} ${u}.`));
  }),
  tpl(2, "Le rectangle doit s'enrouler juste autour du disque, et un disque de chaque côté.", () => {
    const { r, h, u } = dimsC();
    const vrai = patronCylindre(r, h, { decalageHaut: un([0, 0.5, 1]), decalageBas: un([0, 0.5, 1]) });
    const faux = [
      patronCylindre(r, h, { defaut: "rectangle_diametre" }), patronCylindre(r, h, { defaut: "rectangle_demi_perimetre" }), patronCylindre(r, h, { defaut: "disques_meme_cote" }),
      patronCylindre(r, h, { defaut: "disque_trop_grand" }), patronCylindre(r, h, { defaut: "disque_manquant" }),
    ];
    return comparer(`${un(CYL(r, h, u))} ${un(["Lequel de ces dépliages est son patron ?", "Quel dépliage donne ce cylindre une fois plié ?", "Quel est le bon patron ?", "Lequel se plie pour former ce cylindre ?", "Choisis le dépliage qui se referme."])}`, vrai, faux, expliquer(DEF_C, "on vérifie : deux disques, un de chaque côté, et une longueur égale au périmètre, soit plus de 6 fois le rayon.", "un seul dépliage respecte tout.", "c'est le seul qui se referme."), "Quatre dépliages, A, B, C et D, dont un seul est le patron du cylindre");
  }),
  tpl(2, "Trois rectangles de largeurs égales aux côtés, un triangle de chaque côté de la bande.", () => {
    const { a, b, c, h, u } = dimsP();
    const vrai = patronPrisme(a, b, c, h);
    const faux = [patronPrisme(a, b, c, h, { defaut: "deux_triangles_meme_cote" }), patronPrisme(a, b, c, h, { defaut: "rectangle_manquant" }), patronPrisme(a, b, c, h, { defaut: "rectangle_trop_large" }), patronPrisme(a, b, c, h, { defaut: "triangle_faux" })];
    return comparer(`${un(PRI(a, b, c, h, u))} ${un(["Lequel de ces dépliages est son patron ?", "Quel dépliage donne ce prisme une fois plié ?", "Quel est le bon patron ?", "Lequel se plie pour former ce prisme ?", "Choisis le dépliage qui se referme."])}`, vrai, faux, expliquer(DEF_P, "on vérifie : 3 rectangles de la bonne largeur, et un triangle de chaque côté de la bande.", "un seul dépliage respecte tout.", "c'est le seul qui se referme."), "Quatre dépliages, A, B, C et D, dont un seul est le patron du prisme");
  }),
  tpl(2, "La bande vaut le périmètre de la base : enlève les côtés connus.", () => {
    const { a, b, c, h, u } = dimsP();
    return court(un([
      `La bande de rectangles du patron d'un prisme droit mesure ${a + b + c} ${u} de long. Deux côtés du triangle de base mesurent ${a} ${u} et ${b} ${u}. Que mesure le troisième ?`,
      `Patron d'un prisme droit : bande de ${a + b + c} ${u}, hauteur ${h} ${u}. La base a deux côtés de ${a} ${u} et ${b} ${u}. Quel est le troisième ?`,
      `La longueur de la bande d'un patron de prisme droit est ${a + b + c} ${u}. Sa base triangulaire a deux côtés de ${a} ${u} et ${b} ${u}. Trouve l'autre côté.`,
      `Sur le patron d'un prisme droit, la bande fait ${a + b + c} ${u}. Les côtés de sa base sont ${a} ${u}, ${b} ${u} et un autre. Combien mesure-t-il ?`,
      `Une bande de ${a + b + c} ${u} sert de tour à un prisme droit. Le triangle de base a déjà deux côtés de ${a} ${u} et ${b} ${u}. Que mesure le troisième côté ?`,
    ]), c, u, expliquer(DEF_P, "la bande vaut la somme des trois côtés.", `${a + b + c} − ${a} − ${b} = ${c}.`, `le troisième côté mesure ${c} ${u}.`));
  }),

  tpl(3, "L'étiquette fait le tour : périmètre du disque, plus le recouvrement.", () => {
    const r = entre(2, 7);
    const plus = entre(1, 3);
    const O = un(["une boîte de conserve", "une bouteille de jus", "un pot de miel", "un bocal de cornichons", "un tube de rangement", "une canette", "une boîte de thé ronde", "un pot de peinture", "un flacon de pharmacie", "une bouée de marquage"]);
    const L = net2(peri(r) + plus);
    return court(`On colle une étiquette autour d'${O} de rayon ${r} cm, avec ${plus} cm de recouvrement pour le collage. Prends π ≈ 3,14. ${un(["Quelle longueur d'étiquette faut-il ?", "Quelle est la longueur de l'étiquette ?", "Combien doit mesurer l'étiquette en longueur ?", "Quelle longueur faut-il découper ?"])}`, L, "cm", expliquer(DEF_C, "l'étiquette est le rectangle du patron : on calcule le périmètre, puis on ajoute le recouvrement.", `2 × 3,14 × ${r} = ${fr(peri(r))} ; ${fr(peri(r))} + ${plus} = ${fr(L)}.`, `il faut ${fr(L)} cm.`));
  }),
  tpl(3, "L'aire du rectangle : périmètre du disque × hauteur.", () => {
    const r = un([1, 2, 3, 5, 10]);
    const h = entre(2, 12);
    const O = un(["une citerne", "un silo à grains", "un phare miniature", "un tambour", "un réservoir d'eau", "une colonne de théâtre", "un ballon d'eau chaude", "une ruche ronde", "un four à pain", "une tour de télescope"]);
    const A = net2(peri(r) * h);
    return court(`On veut peindre le tour d'${O} en forme de cylindre, de rayon ${r} m et de hauteur ${h} m, sans les disques. Prends π ≈ 3,14. ${un(["Quelle aire faut-il peindre ?", "Quelle est l'aire du rectangle de son patron ?", "Quelle surface couvre la peinture ?", "Combien de m² de peinture faut-il prévoir ?"])}`, A, "m²", expliquer(DEF_C, "le tour se déplie en un rectangle : longueur × largeur.", `2 × 3,14 × ${r} = ${fr(peri(r))} ; ${fr(peri(r))} × ${h} = ${fr(A)}.`, `il faut peindre ${fr(A)} m².`));
  }),
  tpl(3, "Aire des rectangles = périmètre de la base × hauteur.", () => {
    const { a, b, c } = dimsP();
    const h = entre(2, 9);
    const O = un(["une tente", "un toit de cabane", "un présentoir de plage", "un abri de jardin", "une boîte à fromage", "un paquet de chocolat", "une serre", "un auvent de marché", "un abri à vélos", "une niche"]);
    const A = (a + b + c) * h;
    return court(`${un([`On recouvre de toile ${O} en forme de prisme droit.`, `On habille ${O} en forme de prisme droit.`])} Sa base est un triangle de côtés ${a} dm, ${b} dm et ${c} dm ; sa longueur est ${h} dm. ${un(["Quelle aire ont les trois rectangles de son patron ?", "Quelle surface couvrent les trois faces rectangulaires ?", "Quelle est l'aire totale des rectangles, sans les triangles ?", "Combien de dm² de toile faut-il pour les rectangles ?"])}`, A, "dm²", expliquer(DEF_P, "les trois rectangles forment une bande : périmètre de la base × longueur du prisme.", `(${a} + ${b} + ${c}) × ${h} = ${A}.`, `il faut ${A} dm².`));
  }),
  tpl(3, "Le patron demande : périmètre du disque × (hauteur + 2 diamètres).", () => {
    const r = entre(2, 6);
    const h = entre(5, 15);
    const X = peri(r);
    const Y = h + 4 * r;
    const tient = Math.random() < 0.5;
    const a = tient ? Math.ceil(X) + entre(0, 4) : Math.floor(X) - entre(1, 2);
    const b = tient ? Y + entre(0, 5) : Y + entre(0, 5);
    const W = un(["Une maquettiste", "Un élève de 5e", "Un chaudronnier", "Une couturière", "Un fabricant de lampes", "Une architecte", "Un pâtissier", "Une décoratrice", "Un plombier", "Une ingénieure"]);
    const juste = tient ? "Oui, la feuille suffit" : "Non, la longueur manque";
    return choix(`${W} trace le patron d'un cylindre de rayon ${r} cm et de hauteur ${h} cm, les disques posés au-dessus et au-dessous du rectangle. Sa feuille fait ${a} cm de large sur ${b} cm de haut, et le rectangle est posé à l'horizontale. Prends π ≈ 3,14. ${un(["Le patron tient-il ?", "La feuille est-elle assez grande ?", "Peut-on le tracer sur cette feuille ?", "Cette feuille convient-elle ?"])}`, juste, [tient ? "Non, la longueur manque" : "Oui, la feuille suffit", "Non, la hauteur manque", "On ne peut pas savoir"], expliquer(DEF_C, "on calcule la longueur du rectangle, et la hauteur totale : un diamètre, la hauteur, un diamètre.", `longueur ${fr(X)} cm ; hauteur ${h} + ${4 * r} = ${Y} cm ; feuille ${a} cm sur ${b} cm.`, `${juste.toLowerCase()}.`));
  }),
];
