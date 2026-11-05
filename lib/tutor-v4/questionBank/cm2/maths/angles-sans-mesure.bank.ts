// LES ANGLES SANS MESURE (05/11/2026). Trous du programme de CM2 : cm2-G-angles-2
// (nommer un angle), -3 (comparer sans mesurer), -4 (somme, multiple).
// Aucune mesure : le repère est l'angle droit. Le pliage (angles-5) n'est pas évaluable.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { entre, exp, gabarits, melange, qcm, qcmN, un, v } from "./trous-outils";

const ch = (s: string) => `$\\widehat{${s}}$`;
const LETTRES = "ABCDEFGHJKLMNPRSTUVW".split("");
const troisLettres = () => melange(LETTRES).slice(0, 3);
const OUVRE = ["", "Regarde la lettre du milieu.", "Le sommet est au milieu.", "Lis bien les trois lettres."];

/* ───────────────────────── angle_notation ───────────────────────── */
const no = gabarits("angle_notation", "angle", ["notation"]);
const expNom = (x: string, y: string, z: string) => exp("un angle s'écrit avec trois lettres et un chapeau.", "la lettre du milieu est toujours le sommet ; les deux autres sont sur les côtés.", `dans ${ch(x + y + z)}, le sommet est ${y}, les côtés sont [${y}${x}) et [${y}${z}).`, `${ch(x + y + z)} a pour sommet ${y}.`);
const fauxNoms = (x: string, y: string, z: string) => [ch(y + x + z), ch(x + z + y), ch(y + z + x), ch(z + x + y)];
const figureAngle = (x: string, y: string, z: string, deg: number): CanvasFigure => ({ kind: "angle", angle: { angleDeg: deg, labels: { vertex: y, left: x, right: z }, display: { showLabels: true, showMeasure: false, showArc: true } } } as CanvasFigure);
const angleNotation: TutorBankItemV4[] = [
  no(1, "La lettre du milieu est le sommet.", () => {
    const [x, y, z] = troisLettres();
    return qcm(y, [x, z, un(LETTRES.filter((l) => ![x, y, z].includes(l)))], expNom(x, y, z), v(OUVRE, [`Quel est le sommet de l'angle ${ch(x + y + z)} ?`, `L'angle ${ch(x + y + z)} a pour sommet quel point ?`, `Quel point est le sommet de ${ch(x + y + z)} ?`, `Dans ${ch(x + y + z)}, quel point est le sommet ?`]));
  }),
  no(1, "Le sommet s'écrit au milieu.", () => {
    const [x, y, z] = troisLettres();
    return qcm(ch(x + y + z), fauxNoms(x, y, z), expNom(x, y, z), v(OUVRE, [`Comment écrire l'angle de sommet ${y}, avec ${x} et ${z} sur ses côtés ?`, `L'angle a pour sommet ${y}, et ses côtés passent par ${x} et ${z}. Comment l'écrire ?`, `Quelle écriture donne l'angle de sommet ${y}, de côtés [${y}${x}) et [${y}${z}) ?`]));
  }),
  no(1, "Cherche le point où les deux traits se rejoignent : c'est le sommet.", () => {
    const [x, y, z] = troisLettres();
    return qcm(ch(x + y + z), fauxNoms(x, y, z), expNom(x, y, z), v(["Regarde la figure.", "Voici un angle.", "Observe ce dessin.", "Ce dessin montre un angle."], ["Comment s'écrit cet angle ?", "Quel est le nom de cet angle ?", "Comment nommer cet angle ?", "Quelle écriture convient ?", "Quel est son nom ?"]), figureAngle(x, y, z, un([30, 40, 50, 60, 70, 110, 120, 130])));
  }),
  no(2, "On peut lire l'angle dans les deux sens : le sommet reste au milieu.", () => {
    const [x, y, z] = troisLettres();
    return qcm(ch(z + y + x), [ch(y + x + z), ch(x + z + y), ch(y + z + x)], exp("un angle peut se lire dans les deux sens.", "le sommet reste au milieu, on échange seulement les deux autres lettres.", `${ch(x + y + z)} et ${ch(z + y + x)} sont le même angle.`, `${ch(z + y + x)} est le même angle.`), v(OUVRE, [`Quel angle est le même que ${ch(x + y + z)} ?`, `${ch(x + y + z)} peut aussi s'écrire :`, `Quelle autre écriture désigne ${ch(x + y + z)} ?`, `Quelle écriture est la même que ${ch(x + y + z)} ?`]));
  }),
  no(2, "Trouve le sommet demandé, et écris-le au milieu.", () => {
    const [x, y, z] = troisLettres();
    const figure: CanvasFigure = { kind: "triangle", points: { A: { x: 40, y: 170 }, B: { x: 260, y: 170 }, C: { x: 120, y: 40 } }, labels: { A: x, B: y, C: z }, display: { showLabels: true, showPoints: true, showSides: false, showAngles: false } } as CanvasFigure;
    const som = un([x, y, z]);
    const aut = [x, y, z].filter((l) => l !== som);
    return qcm(ch(aut[0] + som + aut[1]), [ch(som + aut[0] + aut[1]), ch(aut[0] + aut[1] + som), ch(aut[1] + aut[0] + som), ch(som + aut[1] + aut[0])], exp("la lettre du milieu est le sommet.", `ici le sommet est ${som} : on l'écrit au milieu, avec les deux autres lettres de chaque côté.`, `${ch(aut[0] + som + aut[1])}.`, `l'angle de sommet ${som} est ${ch(aut[0] + som + aut[1])}.`), v(["Voici un triangle.", "Regarde ce triangle.", "Observe ce triangle."], [`Quel est l'angle de sommet ${som} ?`, `Comment écrire l'angle de sommet ${som} ?`, `Quelle écriture donne l'angle en ${som} ?`, `Comment s'écrit l'angle en ${som} ?`]), figure);
  }),
  no(2, "Les côtés partent tous les deux du sommet.", () => {
    const [x, y, z] = troisLettres();
    return qcm(`[${y}${x}) et [${y}${z})`, [`[${x}${y}) et [${x}${z})`, `[${z}${x}) et [${z}${y})`, `[${y}${x}) et [${x}${z})`, `[${x}${z}) et [${z}${y})`], expNom(x, y, z), v(OUVRE, [`Quels sont les côtés de l'angle ${ch(x + y + z)} ?`, `L'angle ${ch(x + y + z)} a pour côtés :`, `Quelles demi-droites forment ${ch(x + y + z)} ?`, `Choisis les côtés de ${ch(x + y + z)}.`]));
  }),
  no(3, "Le sommet demandé va au milieu : ses deux voisins sont de chaque côté.", () => {
    const [a, b, c, d] = melange(LETTRES).slice(0, 4);
    const k = entre(0, 3);
    const t = [a, b, c, d];
    const s = t[k];
    const pr = t[(k + 3) % 4];
    const su = t[(k + 1) % 4];
    const op = t[(k + 2) % 4];
    const lieu = un(["Une chambre", "Un terrain de foot", "Un potager", "Une cour", "Un tableau", "Un drapeau", "Un tapis", "Une piscine", "Une scène", "Un champ"]);
    const figure: CanvasFigure = { kind: "quadrilatere", points: { A: { x: 50, y: 170 }, B: { x: 250, y: 170 }, C: { x: 250, y: 50 }, D: { x: 50, y: 50 } }, labels: { A: a, B: b, C: c, D: d }, marks: { rightAnglesAt: ["A", "B", "C", "D"] }, display: { showLabels: true, showPoints: true, showSides: false, showAngles: false } } as CanvasFigure;
    return qcm(ch(pr + s + su), [ch(s + pr + su), ch(pr + su + s), ch(op + pr + s), ch(s + op + pr)], exp("dans un rectangle, chaque sommet a deux voisins.", `l'angle en ${s} a ses côtés qui vont vers ses deux voisins, ${pr} et ${su}.`, `${ch(pr + s + su)}.`, `l'angle en ${s} s'écrit ${ch(pr + s + su)}.`), `${lieu} ${v(["a la forme du rectangle", "est dessiné comme le rectangle", "suit le rectangle"])} ${a}${b}${c}${d}. ${v(["Comment s'écrit l'angle en", "Comment nommer l'angle en", "Quelle écriture donne l'angle en"])} ${s} ?`, figure);
  }),
  no(3, "Cherche la lettre du milieu.", () => {
    const [x, y, z] = troisLettres();
    const lieu = un(["La voile d'un bateau", "Un panneau de danger", "Le toit d'un chalet", "Une part de tarte", "Un coin de jardin", "Une équerre de maçon", "Un cerf-volant plat", "La pointe d'une flèche", "Une tente vue de face", "Une pyramide vue de face"]);
    return qcm(y, [x, z, un(LETTRES.filter((l) => ![x, y, z].includes(l)))], expNom(x, y, z), `${lieu} forme le triangle ${x}${z}${y}. ${v(["Une architecte", "Un dessinateur", "Une élève", "Un charpentier"])} ${v(["mesure", "regarde", "note"])} l'angle ${ch(x + y + z)}. ${v(["En quel point est son sommet ?", "Quel point est le sommet ?", "Où est le sommet de cet angle ?"])}`);
  }),
  no(3, "L'angle droit a son sommet au milieu de l'écriture.", () => {
    const [x, y, z] = troisLettres();
    const lieu = un(["Sur un plan de maison", "Sur une carte", "Sur le plan du collège", "Sur un schéma de charpente", "Sur le plan du port", "Sur un dessin d'architecte", "Sur la carte au trésor", "Sur un plan de ville"]);
    return qcm(ch(x + y + z), fauxNoms(x, y, z), expNom(x, y, z), `${lieu}, deux rues se croisent en ${y} à angle droit. L'une passe par ${x}, l'autre par ${z}. ${v(["Comment écrire cet angle droit ?", "Quelle écriture donne cet angle ?", "Comment nommer cet angle ?"])}`);
  }),
];

/* ───────────────────────── angle_comparer_sans_mesure ───────────────────────── */
const co = gabarits("angle_comparer_sans_mesure", "angle", ["comparer"]);
const NOMS = ["A", "B", "C", "D"];
/** Des ouvertures bien séparées : on les voit à l'œil. */
const tireDeg = (n: number) => {
  const pas = melange([25, 35, 45, 60, 75, 95, 110, 130, 150]);
  for (;;) {
    const l = melange(pas).slice(0, n);
    if (l.every((a, i) => l.every((b, j) => i === j || Math.abs(a - b) >= 20))) return l;
  }
};
const dessinA = (degs: number[], noms = NOMS, longueurs?: number[]): CanvasFigure => ({
  kind: "deux_angles",
  mode: "cote_a_cote",
  angles: degs.map((deg, i) => ({ deg, nom: noms[i], rotation: un([0, 10, 20, 340, 350, 30]), longueur: longueurs?.[i] ?? entre(60, 95) })),
});
const expCmp = (texte: string) => exp("un angle se compare à son ouverture.", "on regarde l'écart entre les deux côtés, pas leur longueur.", texte, "plus les côtés sont écartés, plus l'angle est grand.");
const LEQUEL = (mot: string) => [`Quel angle est le plus ${mot} ?`, `Lequel est le plus ${mot} ?`, `Quel est l'angle le plus ${mot} ?`, `Choisis l'angle le plus ${mot}.`, `Lequel de ces angles est le plus ${mot} ?`];
const VOIS = ["", "Regarde l'ouverture.", "Regarde l'écart entre les côtés.", "Sans mesurer.", "Pense au calque."];
const angleComparer: TutorBankItemV4[] = [
  co(1, "Regarde l'écart entre les deux côtés.", () => {
    const degs = tireDeg(2);
    const g = degs[0] > degs[1] ? 0 : 1;
    return qcm(`L'angle ${NOMS[g]}`, [`L'angle ${NOMS[1 - g]}`, "Ils sont égaux"], expCmp(`l'angle ${NOMS[g]} est le plus ouvert.`), v(VOIS, LEQUEL("grand")), dessinA(degs));
  }),
  co(1, "Le plus petit est le moins ouvert.", () => {
    const degs = tireDeg(3);
    const m = degs.indexOf(Math.min(...degs));
    return qcm(`L'angle ${NOMS[m]}`, NOMS.slice(0, 3).filter((_, i) => i !== m).map((n) => `L'angle ${n}`), expCmp(`l'angle ${NOMS[m]} est le moins ouvert.`), v(VOIS, LEQUEL("petit")), dessinA(degs));
  }),
  co(1, "La longueur des côtés ne compte pas : regarde seulement l'écart.", () => {
    const degs = tireDeg(2).sort((a, b) => a - b);
    // Le plus petit angle reçoit les côtés les plus longs : c'est le piège.
    const ordre = un([[0, 1], [1, 0]]);
    const figure = dessinA(ordre.map((i) => degs[i]), NOMS, ordre.map((i) => (i === 0 ? 100 : 50)));
    const g = ordre[0] === 1 ? 0 : 1;
    return qcm(`L'angle ${NOMS[g]}`, [`L'angle ${NOMS[1 - g]}`, "Ils sont égaux"], expCmp(`l'angle ${NOMS[g]} a des côtés plus courts, mais il est plus ouvert.`), v(["Attention, regarde bien.", "Ne te fais pas piéger.", "Attention au piège.", "Les côtés n'ont pas la même longueur."], LEQUEL("grand")), figure);
  }),
  co(2, "L'angle droit a un petit carré. Compare l'autre angle à celui-là.", () => {
    const d = un([35, 45, 55, 65, 115, 125, 135, 150]);
    const petit = d < 90;
    const j = petit ? "Plus petit que l'angle droit" : "Plus grand que l'angle droit";
    return qcm(j, [petit ? "Plus grand que l'angle droit" : "Plus petit que l'angle droit", "Égal à l'angle droit"], expCmp(`l'angle B est ${petit ? "moins" : "plus"} ouvert que l'angle droit.`), v(["L'angle A est droit.", "A est un angle droit.", "Le petit carré marque l'angle droit A."], ["Comment est l'angle B ?", "Que dire de l'angle B ?", "Comment est B par rapport à A ?", "Que peut-on dire de B ?"]), { kind: "deux_angles", mode: "cote_a_cote", angles: [{ deg: 90, nom: "A", rotation: 0, longueur: 80 }, { deg: d, nom: "B", rotation: un([0, 15, 345]), longueur: 80 }] });
  }),
  co(2, "Trouve le plus petit, puis le plus grand : le dernier est au milieu.", () => {
    const degs = tireDeg(3);
    const tri = [0, 1, 2].sort((a, b) => degs[a] - degs[b]).map((i) => NOMS[i]);
    const j = tri.join(", ");
    const inv = [...tri].reverse().join(", ");
    const f = [inv, [tri[1], tri[0], tri[2]].join(", "), [tri[0], tri[2], tri[1]].join(", "), [tri[2], tri[0], tri[1]].join(", ")];
    return qcm(j, f, expCmp(`du moins ouvert au plus ouvert : ${j}.`), v(VOIS, ["Range du plus petit au plus grand.", "Quel est le bon ordre, du plus petit au plus grand ?", "Du plus petit au plus grand, quel est l'ordre ?", "Dans quel ordre, du plus petit au plus grand ?"]), dessinA(degs));
  }),
  co(2, "Si l'autre côté tombe dedans, l'angle posé dessus est plus petit.", () => {
    const [x, y] = melange(NOMS).slice(0, 2);
    const dedans = Math.random() < 0.5;
    const grand = dedans ? y : x;
    return qcm(`L'angle ${grand}`, [`L'angle ${dedans ? x : y}`, "Ils sont égaux"], exp("on compare avec un calque.", "on pose le sommet sur le sommet et un côté sur un côté, puis on regarde l'autre côté.", dedans ? `l'autre côté de ${x} tombe à l'intérieur de ${y} : ${x} est plus petit.` : `l'autre côté de ${x} tombe à l'extérieur de ${y} : ${x} est plus grand.`, `l'angle ${grand} est le plus grand.`), `${v(["On décalque l'angle", "On reproduit sur un calque l'angle"])} ${x}. ${v(["On le pose sur l'angle", "On le place sur l'angle"])} ${y} : sommet sur sommet, un côté sur un côté. ${v(["L'autre côté tombe", "Son deuxième côté tombe"])} ${dedans ? "à l'intérieur" : "à l'extérieur"} de ${y}. ${v(["Quel angle est le plus grand ?", "Lequel est le plus grand ?", "Quel est le plus grand ?"])}`);
  }),
  co(3, "Le plus ouvert a le plus grand angle, même avec de petites branches.", () => {
    const O = un(["Paire de ciseaux", "Compas", "Porte", "Éventail", "Livre ouvert", "Paire de pinces", "Parasol", "Grue", "Pelle", "Rampe"]);
    const degs = tireDeg(2);
    const g = degs[0] > degs[1] ? 0 : 1;
    const noms = ["1", "2"];
    return qcm(`${O} ${noms[g]}`, [`${O} ${noms[1 - g]}`, "Autant l'un que l'autre"], expCmp(`le numéro ${noms[g]} est le plus ouvert.`), `${v(["Voici deux dessins :", "On compare deux objets :", "Deux objets sont dessinés :"])} ${O.toLowerCase()} 1 et ${O.toLowerCase()} 2. ${v(["Lequel est le plus ouvert ?", "Quel objet forme le plus grand angle ?", "Quel angle est le plus grand ?"])}`, dessinA(degs, noms));
  }),
  co(3, "Du moins ouvert au plus ouvert.", () => {
    const O = un(["toboggans", "rampes de skate", "toits", "pistes de ski", "pistes de luge", "escaliers", "ponts-levis", "échelles", "bras de grue", "routes de montagne"]);
    const degs = [un([20, 25, 30]), un([50, 55, 60]), un([80, 75, 85])];
    const m = melange([0, 1, 2]);
    const d = m.map((i) => degs[i]);
    const g = d.indexOf(Math.max(...d));
    return qcm(`L'angle ${NOMS[g]}`, NOMS.slice(0, 3).filter((_, i) => i !== g).map((n) => `L'angle ${n}`), expCmp(`l'angle ${NOMS[g]} est le plus ouvert : c'est le plus raide.`), `${v(["Ces angles montrent la pente de trois", "Voici la pente de trois", "Ces dessins montrent la pente de trois"])} ${O}. ${v(["Quel angle est le plus raide ?", "Quel angle est le plus grand ?", "Quel est le plus raide ?"])}`, { kind: "deux_angles", mode: "cote_a_cote", angles: d.map((deg, i) => ({ deg, nom: NOMS[i], rotation: 0, longueur: 85 })) });
  }),
  co(3, "Compare les deux à l'angle droit : un coin de feuille suffit.", () => {
    const O = un(["une équipe de menuisiers", "une maçonne", "un charpentier", "une élève", "un dessinateur", "une couturière", "un carreleur", "une jardinière"]);
    const d = un([35, 50, 65, 115, 130, 145]);
    const petit = d < 90;
    return qcm(petit ? "Non, il est trop fermé" : "Non, il est trop ouvert", ["Oui, il est droit", petit ? "Non, il est trop ouvert" : "Non, il est trop fermé"], expCmp(`on pose un coin de feuille : l'angle est ${petit ? "plus fermé" : "plus ouvert"} que l'angle droit.`), `${cap(O)} vérifie un coin avec une équerre. ${v(["Le coin dessiné est-il droit ?", "Ce coin forme-t-il un angle droit ?", "Cet angle est-il droit ?"])}`, { kind: "deux_angles", mode: "cote_a_cote", angles: [{ deg: d, rotation: un([0, 12, 348]), longueur: 90 }] });
  }),
];
function cap(t: string) { return t.charAt(0).toUpperCase() + t.slice(1); }

/* ───────────────────────── angle_somme_multiple ───────────────────────── */
const so = gabarits("angle_somme_multiple", "angle", ["somme"]);
const eventail = (n: number, d: number): CanvasFigure => ({ kind: "deux_angles", mode: "juxtaposes", angles: Array.from({ length: n }, () => ({ deg: d })) });
const expFois = (k: number, n: number, nom: string) => exp(`${k} petits angles égaux remplissent un angle droit.`, `on multiplie par le nombre d'angles droits.`, `${k} × ${n} = ${k * n}.`, `il faut ${k * n} petits angles pour ${nom}.`);
const POUR_DROIT = [2, 3, 5, 6, 9];
const ORDRE = ["", "Sans mesurer.", "Pense à l'angle droit.", "Regarde bien."];
const angleSommeMultiple: TutorBankItemV4[] = [
  so(1, "Deux angles droits collés font un angle plat.", () => {
    const k = entre(2, 4);
    return qcmSansEspace(k);
  }),
  so(1, "Compte combien de fois le petit angle tient dans le grand.", () => {
    const n = un(POUR_DROIT.filter((x) => x <= 6));
    const d = 90 / n;
    return qcmN(n, [n + 1, n - 1, n + 2, n * 2].filter((f) => f !== n && f > 0), exp("les petits angles sont tous égaux.", "on compte combien de petits angles remplissent le grand angle.", `on en voit ${n}.`, `le petit angle tient ${n} fois dans l'angle droit.`), v(["Ces petits angles égaux forment un angle droit.", "Ensemble, ces angles égaux font un angle droit.", "Collés, ces angles égaux remplissent un angle droit."], ["Combien de fois le petit angle tient-il dans l'angle droit ?", "Le petit angle tient combien de fois dans l'angle droit ?", "Combien de petits angles faut-il pour l'angle droit ?", "Combien de fois le petit angle y entre-t-il ?"]), eventail(n, d));
  }),
  so(1, "Un angle plat, c'est deux angles droits.", () => {
    const C = un([
      { q: "Combien d'angles droits font un angle plat ?", r: 2 }, { q: "Un angle plat, c'est combien d'angles droits ?", r: 2 }, { q: "Combien d'angles droits pour un demi-tour ?", r: 2 }, { q: "Combien d'angles droits font un tour complet ?", r: 4 }, { q: "Un tour complet, c'est combien d'angles droits ?", r: 4 },
      { q: "Combien d'angles plats font un tour complet ?", r: 2 }, { q: "Un tour complet, c'est combien d'angles plats ?", r: 2 }, { q: "Combien d'angles droits pour trois quarts de tour ?", r: 3 }, { q: "Combien d'angles droits pour un quart de tour ?", r: 1 }, { q: "Un quart de tour, c'est combien d'angles droits ?", r: 1 },
    ]);
    return qcmN(C.r, [1, 2, 3, 4, 6, 8].filter((f) => f !== C.r), exp("un quart de tour = un angle droit.", "un angle plat, c'est un demi-tour ; un tour, c'est quatre quarts de tour.", "plat = 2 droits ; tour complet = 4 droits.", `la réponse est ${C.r}.`), `${v(ORDRE)} ${C.q}`.trim());
  }),
  so(2, "Imagine les deux angles collés : le total dépasse-t-il le coin d'une feuille ?", () => {
    let a = 0;
    let b = 0;
    do { a = un([20, 30, 40, 50, 60, 70]); b = un([20, 30, 40, 50, 60, 70]); } while (Math.abs(a + b - 90) < 15 && a + b !== 90);
    const j = a + b === 90 ? "Un angle droit" : a + b < 90 ? "Plus petit qu'un angle droit" : "Plus grand qu'un angle droit";
    const t = ["Un angle droit", "Plus petit qu'un angle droit", "Plus grand qu'un angle droit"];
    return qcm(j, t.filter((x) => x !== j), exp("on colle deux angles par un côté.", "on compare le grand angle obtenu à un angle droit.", "on regarde le coin formé.", `le total est ${j.toLowerCase()}.`), v(["Ces deux angles sont collés.", "On a collé deux angles.", "Voici deux angles collés par un côté."], ["Que forme leur somme ?", "Que font-ils ensemble ?", "Quel angle forment-ils ?", "Que peut-on dire du total ?"]), { kind: "deux_angles", mode: "juxtaposes", angles: [{ deg: a, nom: "A" }, { deg: b, nom: "B" }] });
  }),
  so(2, "Deux angles droits, donc deux fois plus de petits angles.", () => {
    const k = un(POUR_DROIT);
    return qcmN(k * 2, [k, k + 2, k * 4, k * 3, k * 2 + 1].filter((f) => f !== k * 2), expFois(k, 2, "un angle plat"), `${v(["Il faut", "On a besoin de"])} ${k} ${v(["angles égaux", "petits angles égaux"])} pour faire un angle droit. ${v(["Combien en faut-il pour un angle plat ?", "Combien pour un angle plat ?", "Et pour un angle plat ?", "Combien en faut-il pour deux angles droits ?"])}`);
  }),
  so(2, "Un tour complet : quatre angles droits.", () => {
    const k = un(POUR_DROIT);
    return qcmN(k * 4, [k, k * 2, k + 4, k * 3, k * 4 + 1].filter((f) => f !== k * 4), expFois(k, 4, "un tour complet"), `${v(["Il faut", "On a besoin de"])} ${k} ${v(["angles égaux", "petits angles égaux"])} pour faire un angle droit. ${v(["Combien en faut-il pour un tour complet ?", "Combien pour un tour complet ?", "Et pour un tour complet ?", "Combien en faut-il pour quatre angles droits ?"])}`);
  }),
  so(3, "Le centre fait un tour complet : quatre angles droits. Partage le nombre de parts par 4.", () => {
    const n = un([4, 8, 12, 16, 20, 24]);
    const C = un(["Une pizza est coupée", "Un gâteau est coupé", "Une tarte est coupée", "Une roue est partagée par ses rayons", "Un parasol est partagé par ses baleines", "Une rosace de vitrail est partagée", "Une table ronde est partagée", "Un manège est partagé"]);
    return qcmN(n / 4, [n / 2, n, n / 4 + 1, 4, n / 4 + 2].filter((f) => f !== n / 4), exp("au centre, on a un tour complet, soit 4 angles droits.", "on partage le nombre de parts en 4 groupes égaux.", `${n} ÷ 4 = ${n / 4}.`, `${n / 4} parts forment un angle droit.`), `${C} en ${n} parts égales. ${v(["Combien de parts forment un angle droit au centre ?", "Combien de parts faut-il pour un angle droit au centre ?", "Au centre, combien de parts font un angle droit ?"])}`);
  }),
  so(3, "Un angle plat, c'est deux angles droits : prends la moitié.", () => {
    const n = un([4, 6, 8, 10, 12, 14, 16, 18]);
    const C = un(["Un éventail a", "Un compas de marine a", "Un paravent a", "Un demi-cercle de jardin a", "Une roue de paon a", "Une vitre en demi-cercle a", "Une scène en demi-cercle a", "Un arc de lumière a"]);
    return qcmN(n / 2, [n, n * 2, n / 2 + 1, n / 2 + 2, 2].filter((f) => f !== n / 2), exp("un angle plat vaut deux angles droits.", "on prend la moitié du nombre de parts.", `${n} ÷ 2 = ${n / 2}.`, `${n / 2} parts forment un angle droit.`), `${C} ${n} parts égales, ouvertes en angle plat. ${v(["Combien de parts forment un angle droit ?", "Combien de parts faut-il pour un angle droit ?", "Combien de parts font un angle droit ?"])}`);
  }),
  so(3, "Chaque virage est un quart de tour.", () => {
    const k = entre(1, 4);
    const t: Record<number, string> = { 1: "Un quart de tour", 2: "Un demi-tour", 3: "Trois quarts de tour", 4: "Un tour complet" };
    const O = un(["Un robot", "Une danseuse", "Un drone", "Une tortue de programme", "Un patineur", "Une voiture téléguidée", "Un gymnaste", "Une toupie"]);
    return qcm(t[k], Object.values(t).filter((x) => x !== t[k]), exp("chaque angle droit est un quart de tour.", "on compte les quarts de tour.", `${k} × un quart de tour.`, `${O.toLowerCase()} a fait : ${t[k].toLowerCase()}.`), `${O} ${v(["tourne d'un angle droit", "fait un angle droit"])}, ${k} fois de suite, toujours du même côté. ${v(["Quel tour a-t-on fait ?", "Quelle rotation cela fait-il ?", "Cela fait quel tour ?"])}`);
  }),
];
/** Sans degrés : k angles droits collés, c'est un angle plat, trois quarts de tour ou un tour complet. */
const NOM_COLLES: Record<number, string> = { 2: "Un angle plat", 3: "Trois quarts de tour", 4: "Un tour complet" };
function qcmSansEspace(k: number) {
  const r = NOM_COLLES[k];
  return qcm(r, ["Un angle plat", "Trois quarts de tour", "Un tour complet", "Un angle aigu", "Un angle obtus"], exp("un angle droit, c'est un quart de tour.", "on compte les quarts de tour.", `${k} angles droits, c'est ${k} quarts de tour.`, `cela fait : ${r.toLowerCase()}.`), v(ORDRE, [`On colle ${k} angles droits. Qu'obtient-on ?`, `${k} angles droits collés forment :`, `Que forment ${k} angles droits collés ?`, `On met côte à côte ${k} angles droits. Cela fait :`]));
}

export const anglesSansMesureBank: TutorBankItemV4[] = [
  ...angleNotation,
  ...angleComparer,
  ...angleSommeMultiple,
];
