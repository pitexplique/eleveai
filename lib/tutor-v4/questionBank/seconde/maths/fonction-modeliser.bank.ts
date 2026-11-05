// MODÉLISER PAR UNE FONCTION, PROGRAMME 2026 DE SECONDE (05/11/2026) : écrire la formule,
// choisir un intervalle qui a du sens, calculer, lire sur la courbe, comparer deux formules.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { court, de, entre, expl, fabrique, qcm, un } from "../../lycee-commun";

const tpl = fabrique("seconde", "fonction_vocabulaire_2de", "2de_");

type Tarif = { qui: string; fixe: string; par: string; n: string };
const TARIFS: Tarif[] = [
  { qui: "Une salle de sport", fixe: "un abonnement", par: "par séance", n: "séances" },
  { qui: "Un service de location de vélos", fixe: "une inscription", par: "par heure", n: "heures" },
  { qui: "Une plateforme de cours", fixe: "un forfait", par: "par cours", n: "cours" },
  { qui: "Un cinéma", fixe: "une carte", par: "par film", n: "films" },
  { qui: "Un plombier", fixe: "un déplacement", par: "par heure de travail", n: "heures de travail" },
  { qui: "Un imprimeur", fixe: "une mise en route", par: "par affiche", n: "affiches" },
  { qui: "Un loueur de voitures", fixe: "une prise en charge", par: "par jour", n: "jours" },
  { qui: "Une piscine", fixe: "une carte", par: "par entrée", n: "entrées" },
  { qui: "Un club d'escalade", fixe: "une adhésion", par: "par séance", n: "séances" },
  { qui: "Un laboratoire", fixe: "un dossier", par: "par analyse", n: "analyses" },
];
const ENONCE_T = (t: Tarif, F: number, U: number) => `${t.qui} facture ${t.fixe} de ${F} €, plus ${U} € ${t.par}.`;
const DEF_T = "une fonction associe à chaque valeur de $x$ une seule valeur $f(x)$ ; ici, $f(x)$ est le coût pour $x$ unités.";

type Rect = { s: string };
const RECTS: Rect[] = [
  { s: "Une éleveuse dispose de $P$ m de grillage pour faire un enclos rectangulaire." },
  { s: "Un jardinier pose $P$ m de bordure autour d'un potager rectangulaire." },
  { s: "Une architecte dessine un jardin d'hiver rectangulaire de périmètre $P$ m." },
  { s: "Une commune entoure un terrain de jeux rectangulaire avec $P$ m de barrière." },
  { s: "Un décorateur borde un tapis rectangulaire avec $P$ m de ruban." },
  { s: "Un maçon coffre une terrasse rectangulaire de périmètre $P$ m." },
];
const INTRO_R = (P: number) => `${un(RECTS).s.replace("$P$", `$${P}$`)} ${un(["On note $x$ la longueur d'un côté, en m.", "Soit $x$ la longueur d'un côté, en m.", "Un côté mesure $x$ m."])}`;
const DEF_R = "l'aire d'un rectangle est le produit de ses deux côtés ; la somme des deux côtés vaut la moitié du périmètre.";

const parabole = (P: number): CanvasFigure => {
  const d = P / 2;
  const n = 40;
  return {
    kind: "fonctionGraphique",
    size: { width: 340, height: 260 },
    xmin: -1,
    xmax: d + 1,
    ymin: -2,
    ymax: (d * d) / 4 + 3,
    grille: true,
    courbes: [{ id: "A", type: "points", couleur: "#2563eb", points: Array.from({ length: n + 1 }, (_, i) => ({ x: (d * i) / n, y: (d * i * (d - (d * i) / n)) / n })) }],
  } as CanvasFigure;
};

export const fonctionModeliserBank: TutorBankItemV4[] = [
  tpl("fonction_modeliser", 1, 1, "Ce qui est payé une fois reste seul ; ce qui est payé à l'unité est multiplié par x.", () => {
    const t = un(TARIFS);
    const F = entre(5, 60);
    let U = entre(2, 15);
    if (U === F) U++;
    return qcm(`${ENONCE_T(t, F, U)} ${un([`Quelle fonction donne le coût pour $x$ ${t.n} ?`, `On note $f(x)$ le coût pour $x$ ${t.n}. Quelle est la bonne formule ?`, `Quelle formule modélise le coût de $x$ ${t.n} ?`])}`, `$f(x) = ${F} + ${U}x$`, [`$f(x) = ${F}x + ${U}$`, `$f(x) = ${F + U}x$`, `$f(x) = ${F} - ${U}x$`, `$f(x) = ${F}x - ${U}$`], expl(DEF_T, "le montant fixe s'ajoute une fois ; le prix unitaire se multiplie par $x$.", `fixe : $${F}$ ; à l'unité : $${U}x$.`, `$f(x) = ${F} + ${U}x$.`));
  }),
  tpl("fonction_modeliser", 2, 1, "Écris la formule, puis remplace x par la valeur donnée.", () => {
    const t = un(TARIFS);
    const F = entre(5, 60);
    const U = entre(2, 15);
    const x = entre(2, 20);
    const r = F + U * x;
    return court(`${ENONCE_T(t, F, U)} ${un([`Combien coûtent ${x} ${t.n}, en € ?`, `Quel est le coût total pour ${x} ${t.n}, en € ?`, `Calcule le coût, en €, de ${x} ${t.n}.`])}`, r, expl(DEF_T, `on remplace $x$ par $${x}$ dans $f(x) = ${F} + ${U}x$.`, `$${F} + ${U} \\times ${x} = ${r}$.`, `le coût est de $${r}$ €.`));
  }),
  tpl("fonction_modeliser", 3, 2, "Trouve d'abord l'autre côté : le demi-périmètre moins x.", () => {
    const P = 2 * entre(5, 30);
    const d = P / 2;
    return qcm(`${INTRO_R(P)} ${un(["Quelle fonction donne l'aire du rectangle, en m² ?", "On note $A(x)$ l'aire, en m². Quelle est la bonne formule ?", "Quelle formule modélise l'aire en fonction de $x$ ?"])}`, `$A(x) = x(${d} - x)$`, [`$A(x) = x(${P} - x)$`, `$A(x) = 2x(${d} - x)$`, `$A(x) = ${P} - 2x$`, `$A(x) = x^{2} + ${d}$`], expl(DEF_R, "on exprime le second côté en fonction de $x$.", `$${P} \\div 2 = ${d}$, donc l'autre côté vaut $${d} - x$.`, `$A(x) = x(${d} - x)$.`));
  }),
  tpl("fonction_modeliser", 4, 2, "Un côté ne peut être ni négatif, ni plus grand que le demi-périmètre.", () => {
    const P = 4 * entre(3, 15);
    const d = P / 2;
    const I = (a: number, b: number) => `$[${a}\\,;${b}]$`;
    return qcm(`${INTRO_R(P)} ${un(["Sur quel intervalle $x$ peut-il varier ?", "Quel intervalle a du sens pour $x$ ?", "Quel est l'intervalle de définition adapté à la situation ?"])}`, I(0, d), [I(0, P), I(d, P), I(0, d / 2), I(-d, d)], expl("l'intervalle de définition d'un modèle ne garde que les valeurs qui ont du sens.", "un côté est positif, et l'autre côté, égal à $" + d + " - x$, aussi.", `$x \\geq 0$ et $${d} - x \\geq 0$.`, `$x$ varie sur ${I(0, d)}.`));
  }),
  tpl("fonction_modeliser", 5, 3, "Le sommet de la courbe donne l'aire la plus grande : lis-le sur la grille.", () => {
    const P = un([8, 12, 16, 20]);
    const m = P / 4;
    const y = m * m;
    const lire = un(["abscisse", "ordonnee", "image"] as const);
    const fin = lire === "abscisse" ? un(["Pour quelle valeur de $x$ l'aire est-elle la plus grande ?", "Lis la valeur de $x$ qui donne l'aire maximale."]) : lire === "ordonnee" ? un(["Quelle est l'aire maximale, en m² ?", "Lis l'aire la plus grande possible, en m²."]) : "";
    if (lire === "image") {
      const x = entre(1, P / 2 - 1);
      const r = x * (P / 2 - x);
      return court(`${INTRO_R(P)} La courbe donne l'aire $A(x)$, en m². ${un([`Lis $A(${x})$.`, `Quelle est l'aire, en m², pour $x = ${x}$ ?`])}`, r, expl("l'image de $x$ se lit sur l'axe vertical.", `on part de $x = ${x}$, on monte jusqu'à la courbe.`, `$${x} \\times (${P / 2} - ${x}) = ${r}$.`, `$A(${x}) = ${r}$.`), parabole(P));
    }
    return court(`${INTRO_R(P)} La courbe donne l'aire $A(x)$, en m². ${fin}`, lire === "abscisse" ? m : y, expl("le maximum d'une fonction est l'ordonnée du point le plus haut de sa courbe.", "on repère le sommet de la courbe, puis on lit ses coordonnées.", `le sommet a pour coordonnées $(${m}\\,;${y})$.`, lire === "abscisse" ? `l'aire est maximale pour $x = ${m}$ : le rectangle est alors un carré.` : `l'aire maximale est $${y}$ m².`), parabole(P));
  }),
  tpl("fonction_modeliser", 6, 3, "Écris les deux fonctions, puis résous f(x) = g(x).", () => {
    const t = un(TARIFS);
    const U2 = entre(4, 20);
    const U1 = entre(2, U2 - 2);
    const x = entre(2, 25);
    const F = (U2 - U1) * x;
    return court(`${t.qui} propose deux formules. Formule A : ${t.fixe} de ${F} €, plus ${U1} € ${t.par}. Formule B : ${U2} € ${t.par}, sans frais fixes. ${un([`Pour combien ${de(t.n)} les deux formules coûtent-elles le même prix ?`, `Pour quel nombre ${de(t.n)} les deux formules reviennent-elles au même ?`, `Combien ${de(t.n)} faut-il pour que les deux formules aient le même coût ?`])}`, x, expl("deux fonctions ont la même valeur quand $f(x) = g(x)$.", "on écrit $f(x)$ et $g(x)$, puis on résout l'équation.", `$${F} + ${U1}x = ${U2}x$ donne $${F} = ${U2 - U1}x$, donc $x = ${x}$.`, `les deux formules coûtent autant pour $${x}$ ${t.n}.`));
  }),
];
