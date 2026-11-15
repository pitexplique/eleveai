// LE PATRON D'UNE PYRAMIDE RÉGULIÈRE (06/11/2026).
//
// Suisse, Sénégal, Côte d'Ivoire. Visible en France : cycle 4, « Reconnaître des solides (…
// pyramide …) » et « Construire (…) des représentations de ces solides (…) patrons »
// (`docs/bo-maths-cycle4-recopie.md`). ⛔ ★1-★2 : sans contexte.
// ⭐ La hauteur d'une face vient de Pythagore : des triplets, pour que les nombres tombent juste.

import { cotePiece, patronPyramide } from "@/lib/canvas/patron-solide";
import { entre, expliquer, un } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { choix, comparer, court, fabriquePatrons, figure } from "@/lib/tutor-v4/questionBank/patrons-outils";
import { auPave } from "./vision-espace-outils";

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
const tri = (a: number, b: number, c: number, u: string) => `${a} ${u}, ${b} ${u} et ${c} ${u}`;

// ⭐⭐ 15/11/2026 — ★1-★2 COURTS ET SANS CONTEXTE (mesuré avant : 91 % trop longs). Les
// données passent dans une phrase brève (« Pyramide à base carrée, arêtes latérales de 8 cm. »)
// ou sur la figure ; ⛔ « combien de triangles » ne se demande plus sur une base triangulaire
// (le patron en a alors n + 1, base comprise) : on dit « faces latérales » ou « autour de la base ».
/** L'adjectif de la base : « pyramide à base carrée ». */
const ADJ: Record<number, string> = { 3: "triangulaire", 4: "carrée", 5: "pentagonale", 6: "hexagonale" };
/** La base seule, dessinée (le nombre de côtés se compte sur la figure). */
const laBase = (n: number, c = 4) => figure([{ pieces: [patronPyramide(n, c, 2 * c).pieces[0]] }], "La base de la pyramide, seule");
/** Une face isocèle de base c et de hauteur a, posée sur sa base. */
const face = (c: number, a: number) => ({ points: [[0, 0], [c, 0], [c / 2, -a]] as [number, number][] });
/** La hauteur d'une face, du sommet au milieu de la base, comme une cote. */
const hauteurFace = (c: number, a: number, texte: string, inconnue = false) => ({ a: [c / 2, -a] as [number, number], b: [c / 2, 0] as [number, number], texte, centre: [c * 0.8, -a / 3] as [number, number], ...(inconnue ? { inconnue } : {}) });

export const patronPyramideBank = [
  tpl(1, "Un triangle par côté de la base.", () => {
    const B = un(BASES);
    const tous = Math.random() < 0.5;
    const juste = tous ? B.n + 1 : B.n;
    const a = ADJ[B.n];
    const quoi = tous
      ? [`Pyramide à base ${a} : combien de faces en tout ?`, `Combien de faces a une pyramide à base ${a} ?`, `Patron d'une pyramide à base ${a} : combien de polygones ?`, "Voici la base d'une pyramide. Combien de faces en tout ?", `Pyramide à base ${a}. Combien de faces, base comprise ?`]
      : [`Pyramide à base ${a} : combien de faces latérales ?`, `Combien de faces latérales a une pyramide à base ${a} ?`, "Voici la base d'une pyramide. Combien de triangles autour ?", `Pyramide à base ${a}. Combien de triangles entourent la base ?`, "Voici la base d'une pyramide. Combien de faces latérales ?"];
    return auPave(court(un(quoi), juste, "", expliquer(DEF, "on compte les côtés de la base : un triangle latéral par côté.", `${B.n} côtés donc ${B.n} triangles${tous ? `, plus la base : ${juste}` : ""}.`, `la réponse est ${juste}.`), laBase(B.n)));
  }),
  tpl(1, "Deux arêtes qui se recollent ont la même longueur.", () => {
    const { B, c, s, u } = dims();
    const P = patronPyramide(B.n, c, s);
    const T = P.pieces;
    P.pieces[0].nom = `${c} ${u}`;
    P.cotes = [cotePiece(T[1], 1, `${s} ${u}`), cotePiece(T[Math.floor(B.n / 2) + 1], 2, "?", true)];
    return auPave(court(un([
      "Sur ce patron de pyramide régulière, que vaut « ? » ?", "Combien mesure le côté marqué « ? » ?", "Regarde ce patron. Quelle est la longueur « ? » ?", "Que mesure le segment « ? » de ce patron ?", "Trouve la longueur « ? » sur ce patron de pyramide.",
      "Arêtes latérales égales : que vaut « ? » ?", "Patron d'une pyramide régulière : combien mesure « ? » ?", "Donne la longueur du côté « ? ».", "Complète ce patron : que mesure « ? » ?", "Combien vaut « ? » dans ce patron ?",
    ]), s, u, expliquer(DEF, "dans une pyramide régulière, les arêtes latérales sont égales.", `elles mesurent toutes ${s} ${u}.`, `« ? » vaut ${s} ${u}.`), figure([P], "Le patron d'une pyramide régulière, la base au centre, un côté de triangle marqué d'un point d'interrogation")));
  }),
  tpl(1, "Le triangle a pour base un côté de la base, et pour côtés égaux l'arête latérale.", () => {
    // ⛔ 15/11/2026 : s ≠ c, sinon « c, s et s » valait « c, c et c » et le QCM tombait à 3 lignes.
    let d = dims();
    while (d.s === d.c) d = dims();
    const { B, c, s, u } = d;
    const juste = tri(c, s, s, u);
    const P = patronPyramide(B.n, c, s);
    P.cotes = [cotePiece(P.pieces[0], 0, `${c} ${u}`), cotePiece(P.pieces[Math.floor(B.n / 2) + 1], 1, `${s} ${u}`)];
    return choix(un(["Quels sont les côtés d'une face latérale de ce patron ?", "Quelles longueurs ont les côtés d'un triangle latéral ?", "Lis ce patron. Côtés d'un triangle latéral ?", "Quel triangle se dessine sur chaque côté de la base ?", "Donne les côtés d'une face latérale de ce patron.", "Ce patron est régulier. Côtés d'une face latérale ?"]), juste, [tri(c, c, s, u), tri(c, c, c, u), tri(s, s, s, u), tri(c, s, s + 1, u), tri(c + 1, s, s, u), tri(c, s - 1, s, u)], expliquer(DEF, "un côté du triangle touche la base ; les deux autres montent au sommet.", `base ${c} ${u}, côtés ${s} ${u}.`, `le triangle a pour côtés ${juste}.`), figure([P], "Le patron d'une pyramide régulière : un côté de la base et une arête latérale cotés"));
  }),
  tpl(1, "Toutes les arêtes qui montent au sommet : leur nombre est celui des côtés de la base.", () => {
    const { B, c, s, u } = dims();
    const total = B.n * s;
    const a = ADJ[B.n];
    return auPave(court(un([`Pyramide à base ${a}, arêtes latérales de ${s} ${u}. Leur somme ?`, `Base ${a}, arête latérale ${s} ${u}. Somme des arêtes latérales ?`, `Somme des arêtes latérales : base ${a}, arête ${s} ${u} ?`, `Pyramide à base ${a} : arêtes latérales de ${s} ${u}. Total ?`, `Arêtes latérales de ${s} ${u}, base ${a}. Leur longueur totale ?`]), total, u, expliquer(DEF, "il y a une arête latérale par côté de la base.", `${B.n} × ${s} = ${total}.`, `la somme est ${total} ${u}.`), laBase(B.n, c)));
  }),

  tpl(2, "La base a bien ses côtés, un triangle par côté, et les triangles doivent pouvoir se rejoindre.", () => {
    const { B, c, s, u } = dims();
    const vrai = patronPyramide(B.n, c, s);
    const faux = [
      patronPyramide(B.n, c, s, { defaut: "triangle_manquant" }),
      patronPyramide(B.n, c, s, { defaut: "triangles_trop_courts" }),
      patronPyramide(B.n, c, s, { defaut: "base_fausse" }),
    ];
    const a = ADJ[B.n];
    void u;
    return comparer(un([`Pyramide régulière à base ${a} : quel dépliage est son patron ?`, `Lequel de ces dépliages est le patron d'une pyramide à base ${a} ?`, `Pyramide régulière à base ${a} : quel dépliage se referme ?`, `Quel dépliage donne une pyramide régulière à base ${a} ?`, `Choisis le patron d'une pyramide régulière à base ${a}.`]), vrai, faux, expliquer(DEF, "on vérifie la base, le nombre de triangles et la longueur de leurs côtés égaux.", "un seul dépliage respecte tout.", "c'est le seul qui se referme."), "Quatre dépliages, A, B, C et D, dont un seul est le patron de la pyramide");
  }),
  tpl(2, "Le contour du patron : deux arêtes latérales par triangle.", () => {
    const { B, c, s, u } = dims();
    const C = 2 * B.n * s;
    const a = ADJ[B.n];
    return auPave(court(un([`Base ${a}, arêtes latérales de ${s} ${u}. Périmètre du patron en étoile ?`, `Pyramide à base ${a}, arêtes latérales de ${s} ${u}. Contour de son patron ?`, `Ce patron en étoile a des arêtes latérales de ${s} ${u}. Son périmètre ?`, `Patron en étoile, base ${a}, arêtes de ${s} ${u} : son périmètre ?`, `Arêtes latérales de ${s} ${u}. Quel est le tour de ce patron ?`]), C, u, expliquer(DEF, "le bord du patron passe par les deux côtés égaux de chaque triangle ; les côtés de la base sont à l'intérieur.", `${B.n} × 2 × ${s} = ${C}.`, `le contour mesure ${C} ${u}.`), figure([patronPyramide(B.n, c, s)], "Le patron en étoile de la pyramide")));
  }),
  tpl(2, "La hauteur du triangle coupe sa base en deux : applique Pythagore.", () => {
    const { c, a, s } = carre();
    const u = un(UNITE);
    const F = { pieces: [face(c, a)], cotes: [cotePiece(face(c, a), 0, `${c} ${u}`), cotePiece(face(c, a), 1, `${s} ${u}`), hauteurFace(c, a, "?", true)] };
    return auPave(court(un([`Base carrée de côté ${c} ${u}, arête latérale ${s} ${u}. Hauteur d'une face ?`, `Face d'une pyramide régulière : base ${c} ${u}, côtés ${s} ${u}. Sa hauteur ?`, `Triangle isocèle de base ${c} ${u} et de côtés ${s} ${u} : sa hauteur ?`, `Base carrée de ${c} ${u}, arêtes de ${s} ${u}. Hauteur d'une face triangulaire ?`, `Face latérale : base ${c} ${u}, côtés ${s} ${u}. Calcule sa hauteur.`]), a, u, expliquer(DEF, "dans un triangle isocèle, la hauteur issue du sommet coupe la base en deux. On applique le théorème de Pythagore.", `${s}² − ${c / 2}² = ${s * s} − ${(c * c) / 4} = ${a * a}, et ${a}² = ${a * a}.`, `la hauteur mesure ${a} ${u}.`), figure([F], "Une face latérale isocèle, sa base et un côté cotés, sa hauteur marquée d'un point d'interrogation")));
  }),
  tpl(2, "Aire d'un triangle = base × hauteur ÷ 2.", () => {
    const { c, a, s } = carre();
    const u = un(UNITE);
    const A = (c * a) / 2;
    const F = { pieces: [face(c, a)], cotes: [cotePiece(face(c, a), 0, `${c} ${u}`), hauteurFace(c, a, `${a} ${u}`)] };
    return auPave(court(un([`Une face triangulaire a pour base ${c} ${u} et hauteur ${a} ${u}. Son aire ?`, `Face d'une pyramide : base ${c} ${u}, hauteur ${a} ${u}. Calcule son aire.`, `Triangle du patron : base ${c} ${u}, hauteur ${a} ${u}. Son aire ?`, `Aire d'une face de base ${c} ${u} et de hauteur ${a} ${u} ?`, `Face latérale : base ${c} ${u}, hauteur ${a} ${u}. Quelle aire ?`]), A, `${u}²`, expliquer(DEF, "on applique la formule de l'aire d'un triangle.", `${c} × ${a} ÷ 2 = ${A}.`, `l'aire est ${A} ${u}².`) + `\n\nOn vérifie : l'arête latérale vaut ${s} ${u}.`, figure([F], "Une face latérale, sa base et sa hauteur cotées")));
  }),

  tpl(3, "Aire du patron = aire de la base + aires des 4 triangles.", () => {
    const { c, a } = carre();
    const O = un(["un toit de kiosque", "une lanterne de papier", "une tente de scout", "un chapeau de clown", "une boîte à bijoux", "une pyramide de décoration", "un clocher miniature", "une serre de jardin", "un abri à oiseaux", "une maquette de monument"]);
    const A = c * c + 2 * c * a;
    return auPave(court(`Patron d'${O} en pyramide à base carrée : côté ${c} cm, faces de ${a} cm de haut. ${un(["Aire totale du patron ?", "Quelle aire de carton faut-il, sans les chutes ?", "Quelle surface de matériau faut-il ?", "Combien de cm² couvre ce patron ?"])}`, A, "cm²", expliquer(DEF, "on ajoute le carré et les 4 triangles.", `${c} × ${c} + 4 × ${c} × ${a} ÷ 2 = ${c * c} + ${2 * c * a} = ${A}.`, `il faut ${A} cm².`), figure([patronPyramide(4, c, Math.hypot(c / 2, a))], "Le patron de la pyramide à base carrée")));
  }),
  tpl(3, "Le patron en croix : un côté et deux hauteurs de face.", () => {
    const { c, a } = carre();
    const W = un(["Une maquettiste", "Un boulanger", "Une architecte", "Un décorateur de théâtre", "Une fleuriste", "Un apiculteur", "Une couturière", "Un charpentier", "Une luthière", "Un pâtissier"]);
    return auPave(court(`${W} trace le patron en croix d'une pyramide à base carrée : côté ${c} cm, faces de ${a} cm de haut. ${un(["Côté minimal de la feuille carrée ?", "Quelle feuille carrée faut-il, au minimum ?", "Plus petit côté de feuille possible ?"])}`, c + 2 * a, "cm", expliquer(DEF, "de bout en bout : une hauteur de face, le côté de la base, une hauteur de face.", `${a} + ${c} + ${a} = ${c + 2 * a}.`, `il faut au moins ${c + 2 * a} cm.`), figure([patronPyramide(4, c, Math.hypot(c / 2, a))], "Le patron en croix de la pyramide")));
  }),
  tpl(3, "L'arête latérale : Pythagore dans la moitié d'une face.", () => {
    const { c, a, s } = carre();
    const O = un(["une tente", "un toit de cabane", "une lanterne", "un abri à vélos", "un kiosque", "une ruche décorative", "un monument de carton", "un sommet de phare", "une serre", "une verrière"]);
    const F = { pieces: [face(c, a)], cotes: [cotePiece(face(c, a), 0, `${c} dm`), hauteurFace(c, a, `${a} dm`), cotePiece(face(c, a), 1, "?", true)] };
    return auPave(court(`Pour ${O} en pyramide à base carrée, une face a ${c} dm de base et ${a} dm de haut. ${un(["Longueur d'une arête latérale ?", "Combien mesure chaque arête latérale ?", "Que mesure son côté oblique ?", "Quelle longueur de baguette par arête latérale ?"])}`, s, "dm", expliquer(DEF, "la hauteur coupe la base en deux : un triangle rectangle de côtés la moitié de la base et la hauteur.", `${c / 2}² + ${a}² = ${(c * c) / 4} + ${a * a} = ${s * s} = ${s}².`, `l'arête mesure ${s} dm.`), figure([F], "Une face latérale, sa base et sa hauteur cotées, un côté oblique marqué d'un point d'interrogation")));
  }),
  tpl(3, "Toutes les arêtes du solide : celles de la base, et celles qui montent au sommet.", () => {
    const { B, c, s } = dims();
    const O = un(["une sculpture en fil de fer", "une structure de lampe", "un cadre en bambou", "une maquette en baguettes", "une armature de tente", "une cage à oiseau", "un mobile de musée", "une structure en tiges de cuivre", "une balise de marin", "un décor de scène"]);
    const T = B.n * c + B.n * s;
    return auPave(court(`Pour ${O} en pyramide régulière, la base est ${B.nom} de côté ${c} cm et les arêtes latérales font ${s} cm. ${un(["Longueur totale des arêtes ?", "Quelle longueur pour toutes les arêtes ?", "Combien de centimètres pour toute l'armature ?", "Somme de toutes les arêtes ?"])}`, T, "cm", expliquer(DEF, "il y a autant d'arêtes à la base que d'arêtes qui montent au sommet.", `${B.n} × ${c} + ${B.n} × ${s} = ${T}.`, `il faut ${T} cm.`), laBase(B.n, c)));
  }),
];
