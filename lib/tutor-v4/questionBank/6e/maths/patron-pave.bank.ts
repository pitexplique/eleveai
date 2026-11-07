// CONSTRUIRE LE PATRON D'UN PAVÉ DROIT : les dimensions de chaque face (06/11/2026).
//
// Suisse, Sénégal, Côte d'Ivoire. Visible en France : `6e/bo-objectifs.ts` (6e-G-espace-1) et le
// cycle 4 (`docs/bo-maths-cycle4-recopie.md` : « représentations de ces solides (…) patrons »).
// `solide_patron` (CM2) et `vision_representation` reconnaissent un patron de cube : ici, on
// le dimensionne. ⛔ ★1-★2 : phrase courte, sans contexte. Le dépliage se calcule, jamais saisi.

import { cotePiece, patronPave } from "@/lib/canvas/patron-solide";
import { entre, expliquer, fr, un } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { choix, comparer, court, fabriquePatrons, figure } from "@/lib/tutor-v4/questionBank/patrons-outils";

const tpl = fabriquePatrons("6e", "vision_espace", "patron_pave_dimensions");
const DEF = "le patron d'un pavé droit a 6 rectangles, égaux deux à deux : 2 faces longueur × largeur, 2 faces longueur × hauteur, 2 faces largeur × hauteur.";
const UNITE = ["cm", "cm", "cm", "dm", "m"] as const;

/** Trois dimensions bien différentes : les faces se distinguent à l'œil. */
function dims() {
  for (;;) {
    const L = entre(6, 14);
    const l = entre(2, L - 2);
    const h = entre(2, 12);
    if (h !== L && h !== l && Math.abs(h - l) >= 2 && Math.abs(h - L) >= 2) return { L, l, h, u: un(UNITE) };
  }
}
const seul = (L: number, l: number, h: number) => patronPave(L, l, h, { haut: un([0, 1] as const), bas: un([0, 1] as const) });
const DIRE = (L: number, l: number, h: number, u: string) => [
  `Un pavé droit mesure ${L} ${u} de long, ${l} ${u} de large et ${h} ${u} de haut.`,
  `Un pavé droit a pour longueur ${L} ${u}, pour largeur ${l} ${u} et pour hauteur ${h} ${u}.`,
  `Voici un pavé droit : longueur ${L} ${u}, largeur ${l} ${u}, hauteur ${h} ${u}.`,
  `Pavé droit de longueur ${L} ${u}, de largeur ${l} ${u} et de hauteur ${h} ${u}.`,
  `On dessine le patron d'un pavé droit de ${L} ${u} de long, ${l} ${u} de large et ${h} ${u} de haut.`,
  `Un pavé droit a pour dimensions ${L} ${u} (longueur), ${l} ${u} (largeur) et ${h} ${u} (hauteur).`,
];

// 07/11/2026 : ★1 à 12 mots et ★2 à 15 mots au plus (REGLES-6E) : les dimensions en
// liste, 9 mots, dans le style de vision-espace.bank.ts. Le mot « pavé » vient de la notion.
const DIRE_COURT = (L: number, l: number, h: number, u: string) => [
  `Longueur ${L} ${u}, largeur ${l} ${u}, hauteur ${h} ${u}.`,
  `Long : ${L} ${u}, large : ${l} ${u}, haut : ${h} ${u}.`,
  `L = ${L} ${u}, l = ${l} ${u}, h = ${h} ${u}.`,
];
/** Les faces : leur nom et leurs deux dimensions. */
const FACES = (L: number, l: number, h: number) => [
  { nom: "du dessus", a: L, b: l }, { nom: "du dessous", a: L, b: l }, { nom: "de devant", a: L, b: h }, { nom: "de derrière", a: L, b: h }, { nom: "de gauche", a: l, b: h }, { nom: "de droite", a: l, b: h },
];
const sur = (a: number, b: number, u: string) => `${a} ${u} sur ${b} ${u}`;

export const patronPaveBank = [
  tpl(1, "Dans un patron, deux segments qui se recollent ont la même longueur.", () => {
    const { L, l, h, u } = dims();
    const P = patronPave(L, l, h);
    const cible = un([[2, 0], [3, 0], [3, 1], [5, 3], [5, 1], [2, 2], [3, 2], [4, 1]] as const);
    const vrai = Math.hypot(P.pieces[cible[0]].points[cible[1]][0] - P.pieces[cible[0]].points[(cible[1] + 1) % 4][0], P.pieces[cible[0]].points[cible[1]][1] - P.pieces[cible[0]].points[(cible[1] + 1) % 4][1]);
    P.cotes = [cotePiece(P.pieces[5], 2, `${L} ${u}`), cotePiece(P.pieces[0], 0, `${l} ${u}`), cotePiece(P.pieces[0], 3, `${h} ${u}`), cotePiece(P.pieces[cible[0]], cible[1], "?", true)];
    return court(un([
      "Quelle longueur remplace le « ? » sur ce patron de pavé droit ?", "Sur ce patron, combien mesure le côté marqué « ? » ?", "Regarde ce patron de pavé droit. Que vaut « ? » ?", "Trouve la longueur marquée « ? » sur ce patron.",
      "Ce patron est celui d'un pavé droit. Quelle est la longueur « ? » ?", "Que mesure le segment « ? » de ce patron ?", "Donne la longueur du côté « ? » de ce patron.", "Sur ce patron de pavé droit, un côté porte « ? ». Combien mesure-t-il ?",
      "Complète ce patron : que mesure le côté « ? » ?", "Combien mesure « ? » dans ce patron de pavé droit ?",
    ]), vrai, u, expliquer(DEF, "les faces opposées sont égales, et deux côtés qui se recollent ont la même longueur.", `le côté « ? » mesure comme un côté déjà écrit : ${fr(vrai)} ${u}.`, `« ? » vaut ${fr(vrai)} ${u}.`), figure([P], "Le patron d'un pavé droit, trois longueurs écrites et un côté marqué d'un point d'interrogation"));
  }),
  tpl(1, "Le dessus : longueur et largeur. Devant : longueur et hauteur. Côté : largeur et hauteur.", () => {
    const { L, l, h, u } = dims();
    const F = un(FACES(L, l, h));
    const juste = sur(F.a, F.b, u);
    return choix(`${un(DIRE_COURT(L, l, h, u))} ${un([`Face ${F.nom} ?`, `Taille ${F.nom} ?`, `Rectangle ${F.nom} ?`, `Mesure ${F.nom} ?`])}`, juste, [sur(L, l, u), sur(L, h, u), sur(l, h, u), sur(L, L, u), sur(h, h, u), sur(l, l, u)], expliquer(DEF, "on repère les deux arêtes qui bordent cette face.", `la face ${F.nom} est bordée par ${F.a} ${u} et ${F.b} ${u}.`, `elle mesure ${juste}.`));
  }),
  tpl(1, "L'aire d'un rectangle : ses deux dimensions multipliées.", () => {
    const { L, l, h, u } = dims();
    const F = un(FACES(L, l, h));
    const A = F.a * F.b;
    return court(`${un(DIRE_COURT(L, l, h, u))} Aire ${F.nom} ?`, A, `${u}²`, expliquer(DEF, "on repère les deux dimensions de la face, puis on les multiplie.", `${F.a} × ${F.b} = ${A}.`, `l'aire est ${A} ${u}².`));
  }),
  tpl(1, "Lis les longueurs écrites autour de la face colorée.", () => {
    const { L, l, h, u } = dims();
    const P = patronPave(L, l, h);
    const i = un([0, 1, 2, 3, 4, 5] as const);
    P.pieces[i].fond = "#fde68a";
    P.cotes = [cotePiece(P.pieces[5], 2, `${L} ${u}`), cotePiece(P.pieces[0], 0, `${l} ${u}`), cotePiece(P.pieces[0], 3, `${h} ${u}`)];
    const dim = i === 4 || i === 5 ? [L, l] : i === 1 || i === 3 ? [L, h] : [l, h];
    const juste = sur(dim[0], dim[1], u);
    return choix(un([
      "Quelles sont les dimensions de la face colorée ?", "Sur ce patron, que mesure la face colorée ?", "Quelle est la taille du rectangle coloré ?", "Quel rectangle est coloré sur ce patron ?", "Ce patron a une face colorée. Quelles sont ses dimensions ?",
      "Lis ce patron. Quelle est la taille de la face colorée ?", "Regarde la face colorée de ce patron. Que mesure-t-elle ?", "Donne les dimensions de la face colorée.", "Choisis les dimensions du rectangle coloré.", "Combien mesure le rectangle coloré de ce patron ?",
    ]), juste, [sur(L, l, u), sur(L, h, u), sur(l, h, u), sur(L, L, u), sur(h, h, u)], expliquer(DEF, "on reporte les longueurs écrites sur les côtés qui se recollent.", `la face colorée a pour côtés ${dim[0]} ${u} et ${dim[1]} ${u}.`, `elle mesure ${juste}.`), figure([P], "Le patron d'un pavé droit, une face colorée"));
  }),

  tpl(2, "La bande fait le tour du pavé : deux longueurs et deux largeurs.", () => {
    const { L, l, h, u } = dims();
    const P = seul(L, l, h);
    for (const k of [0, 1, 2, 3]) P.pieces[k].fond = "#fde68a";
    P.cotes = [cotePiece(P.pieces[0], 3, `${h} ${u}`)];
    const B = 2 * (L + l);
    return court(`${un(DIRE_COURT(L, l, h, u))} ${un(["Longueur de la bande colorée ?", "Combien mesure la bande colorée ?", "Que mesure la bande colorée ?", "Calcule la longueur de cette bande.", "Bande colorée : quelle longueur ?"])}`, B, u, expliquer(DEF, "la bande met bout à bout les quatre faces du tour : longueur, largeur, longueur, largeur.", `${L} + ${l} + ${L} + ${l} = ${B}.`, `la bande mesure ${B} ${u}.`), figure([P], "Le patron d'un pavé droit, la bande de quatre faces colorée"));
  }),
  tpl(2, "Faces opposées égales, un couvercle de chaque côté de la bande, et les bords qui se recollent.", () => {
    // Pas plus haut que long : le couvercle trop large resterait seul à l'échelle, les autres dépliages seraient minuscules.
    let D = dims();
    while (D.h > D.L) D = dims();
    const { L, l, h, u } = D;
    const vrai = seul(L, l, h);
    const faux = [
      patronPave(L, l, h, { defaut: "deux_couvercles_meme_cote" }),
      patronPave(L, l, h, { defaut: "couvercle_trop_large" }),
      patronPave(L, l, h, { defaut: "face_manquante" }),
      patronPave(L, l, h, { defaut: "bande_desordonnee" }),
    ];
    return comparer(`${un(DIRE_COURT(L, l, h, u))} ${un(["Quel dépliage est son patron ?", "Quel dépliage donne ce pavé ?", "Quel est le bon patron ?", "Lequel se plie en ce pavé ?", "Quel dépliage referme ce pavé ?"])}`, vrai, faux, expliquer(DEF, "on vérifie : 6 faces, faces opposées égales, un couvercle de chaque côté de la bande.", "un seul dépliage respecte les trois conditions.", "c'est le seul qui se referme."), "Quatre dépliages, A, B, C et D, dont un seul est un patron du pavé");
  }),
  tpl(2, "Largeur totale : la bande. Hauteur totale : hauteur + deux fois la largeur.", () => {
    const { L, l, h, u } = dims();
    const X = 2 * (L + l);
    const Y = h + 2 * l;
    const juste = sur(X, Y, u);
    return choix(`${un(DIRE_COURT(L, l, h, u))} ${un(["Quel rectangle entoure ce patron ?", "Plus petit rectangle autour du patron ?", "Ce patron tient dans quel rectangle ?", "Rectangle minimal autour du patron ?"])}`, juste, [sur(X, h, u), sur(L + l, Y, u), sur(X, h + l, u), sur(2 * L + l, Y, u), sur(L, l, u)], expliquer(DEF, "d'un côté, la bande de quatre faces ; de l'autre, la hauteur et les deux couvercles.", `${L} + ${l} + ${L} + ${l} = ${X} ; ${l} + ${h} + ${l} = ${Y}.`, `le rectangle mesure ${juste}.`), figure([patronPave(L, l, h)], "Le patron en croix d'un pavé droit"));
  }),
  tpl(2, "Deux faces partagent une arête : retrouve les trois dimensions du pavé.", () => {
    const { L, l, h, u } = dims();
    const juste = sur(l, h, u);
    return choix(un([
      `Faces : ${sur(L, l, u)} et ${sur(L, h, u)}. Troisième face ?`,
      `Pavé : ${sur(L, l, u)} et ${sur(L, h, u)}. Quelle troisième face ?`,
      `Faces ${sur(L, l, u)} et ${sur(L, h, u)}. Et la dernière ?`,
      `${sur(L, l, u)} et ${sur(L, h, u)} : quelle troisième face ?`,
      `Patron : ${sur(L, l, u)} et ${sur(L, h, u)}. Quel rectangle manque ?`,
      `Déjà tracés : ${sur(L, l, u)} et ${sur(L, h, u)}. Que manque-t-il ?`,
    ]), juste, [sur(L, l, u), sur(L, h, u), sur(L, L, u), sur(l, l, u), sur(h, h, u), sur(L, l + h, u)], expliquer(DEF, `l'arête commune aux deux faces est ${L} ${u} : les deux autres dimensions sont ${l} ${u} et ${h} ${u}.`, "la troisième sorte de face utilise ces deux dimensions.", `elle mesure ${juste}.`));
  }),

  tpl(3, "Aire du patron : la somme des aires des 6 faces.", () => {
    const { L, l, h } = dims();
    const O = un(["une boîte à chaussures", "un coffret de jeu", "un carton de déménagement", "une boîte à outils", "une ruche d'exposition", "un aquarium", "une boîte à violon", "un écrin à bijoux", "une boîte à graines", "un coffre de plongée"]);
    const A = 2 * (L * l + L * h + l * h);
    return court(`Patron d'${O}, un pavé droit : long ${L} cm, large ${l} cm, haut ${h} cm. ${un(["Quelle surface de matériau faut-il ?", "Quelle est l'aire totale de son patron ?", "Quelle aire de carton faut-il ?", "Combien de cm² couvre ce patron ?"])}`, A, "cm²", expliquer(DEF, "on calcule les trois sortes de faces, chacune deux fois.", `2 × (${L} × ${l} + ${L} × ${h} + ${l} × ${h}) = ${A}.`, `il faut ${A} cm².`), figure([patronPave(L, l, h)], "Le patron de la boîte"));
  }),
  tpl(3, "Calcule le rectangle qui entoure le patron, puis compare à la feuille, dans les deux sens.", () => {
    const { L, l, h } = dims();
    const X = 2 * (L + l);
    const Y = h + 2 * l;
    const assez = Math.random() < 0.5;
    const a = assez ? Math.max(X, Y) + entre(0, 6) : Math.max(X, Y) - entre(1, 3);
    const b = assez ? Math.min(X, Y) + entre(0, 6) : Math.min(X, Y) + entre(0, 8);
    // La feuille peut se tourner : on juge dans les deux sens, jamais sur le tirage.
    const tient = (X <= a && Y <= b) || (X <= b && Y <= a);
    const O = un(["une boîte", "un coffret", "un carton", "un étui"]);
    const juste = tient ? "Oui, la feuille suffit" : "Non, la feuille est trop petite";
    return choix(`Patron en croix d'${O} : long ${L} cm, large ${l} cm, haut ${h} cm. Feuille de ${a} cm sur ${b} cm. ${un(["Le patron tient-il dessus ?", "Est-elle assez grande ?", "Peut-on le tracer dessus ?", "Cette feuille convient-elle ?"])}`, juste, [tient ? "Non, la feuille est trop petite" : "Oui, la feuille suffit", "Oui, mais seulement sans les couvercles", "On ne peut pas savoir"], expliquer(DEF, "le patron en croix tient dans un rectangle : la bande d'un côté, hauteur et couvercles de l'autre.", `${X} cm sur ${Y} cm, à comparer à ${a} cm sur ${b} cm.`, `${juste.toLowerCase()}.`));
  }),
  tpl(3, "Sans couvercle : on retire une face longueur × largeur.", () => {
    const { L, l, h } = dims();
    const O = un(["un bac à fleurs", "une jardinière", "un plateau de rangement", "un bac à sable", "un casier à bouteilles", "un bac de pêcheur", "une caisse à outils", "un bassin à poissons", "un présentoir de boulangerie", "un tiroir"]);
    const A = L * l + 2 * L * h + 2 * l * h;
    return court(`${O.charAt(0).toUpperCase() + O.slice(1)} en pavé droit, sans couvercle : long ${L} dm, large ${l} dm, haut ${h} dm. ${un(["Quelle est l'aire de son patron ?", "Quelle surface de matériau faut-il ?", "Quelle aire de plaque faut-il ?", "Combien de dm² couvre son patron ?"])}`, A, "dm²", expliquer(DEF, "il reste 5 faces : le fond et les 4 faces du tour.", `${L} × ${l} + 2 × ${L} × ${h} + 2 × ${l} × ${h} = ${A}.`, `il faut ${A} dm².`));
  }),
  tpl(3, "Longueur de la bande = 2 × (longueur + largeur).", () => {
    const { L, l } = dims();
    const B = 2 * (L + l);
    const O = un(["une boîte de bonbons", "une valise en carton", "un coffret à crayons", "une boîte de pizzas", "une boîte de thé", "un coffret de dés", "un carton à dessins", "une boîte de biscuits", "un étui à flûte", "un emballage de ballon"]);
    return court(`Le tour d'${O} en pavé droit est une bande de ${B} cm. Longueur : ${L} cm. ${un(["Quelle est sa largeur ?", "Combien mesure-t-il en largeur ?", "Que vaut sa largeur ?", "Quelle largeur tracer sur le patron ?"])}`, l, "cm", expliquer(DEF, "la bande vaut deux longueurs et deux largeurs.", `${B} ÷ 2 = ${L + l} ; ${L + l} − ${L} = ${l}.`, `la largeur est ${l} cm.`));
  }),
];
