// Énigmes à projeter — 6e, notion vision_espace (vue de face lue sur un plan
// coté, compter les cubes d'un podium cachés compris, les arêtes cachées d'un
// pavé en perspective, les dimensions d'une face du patron d'un pavé, le piège
// « la vue de dessus compte les cubes », défi du patron de dé). 20/11/2026.
// Niveau de la fiche 6e (lib/fiches/maths-6e-vision-espace.tsx) : quatre
// vues, compter par étages, pointillés pour les arêtes cachées, patron.
// Perspective cavalière : fuyantes à 45°, coefficient 0,5 (une unité de
// profondeur = 0,354 × a en x et en y). Le podium est tracé face par face :
// seules les parties vues sont dessinées (pas de transparence qui trahit).
// Patron du pavé au bon rapport : 20 px pour 1 cm.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const K = 0.5 * Math.SQRT1_2;
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;
const poly = (pts: [number, number][], coul: string, op: string) =>
  `<polygon points="${pts.map(([x, y]) => `${r1(x)},${r1(y)}`).join(" ")}" fill="${coul}" fill-opacity="${op}" stroke="${C.craie}" stroke-width="3" stroke-linejoin="round"/>`;
const trait = (d: string) => `<path d="${d}" stroke="${C.craie}" stroke-width="2" fill="none"/>`;
const M = (x: number, y: number) => `M${r1(x)} ${r1(y)}`;
const L = (x: number, y: number) => ` L${r1(x)} ${r1(y)} `;

/** Une rangée de colonnes de cubes, toutes de profondeur D, hauteurs h[i].
 *  (X ; Y) = coin avant gauche du bas, a = côté d'un cube en px.
 *  Chaque face n'est tracée que sur sa partie vue (valable si D × a × K < a). */
const rangee = (X: number, Y: number, a: number, D: number, h: number[], coul: string) => {
  const u = a * K, Du = D * u;
  let s = "";
  h.forEach((hi, i) => {
    const xL = X + i * a, xR = xL + a, Yt = Y - hi * a;
    const hn = i + 1 < h.length ? h[i + 1] : 0;
    // devant
    s += poly([[xL, Y], [xR, Y], [xR, Yt], [xL, Yt]], coul, ".3");
    let g = "";
    for (let z = 1; z < hi; z++) g += M(xL, Y - z * a) + L(xR, Y - z * a);
    // dessus (coupé à droite si la colonne suivante est plus haute)
    const coupe = hn > hi;
    s += poly(coupe
      ? [[xL, Yt], [xR, Yt], [xR, Yt - Du], [xL + Du, Yt - Du]]
      : [[xL, Yt], [xR, Yt], [xR + Du, Yt - Du], [xL + Du, Yt - Du]], coul, ".5");
    for (let d = 1; d < D; d++) g += M(xL + d * u, Yt - d * u) + L(coupe ? xR : xR + d * u, Yt - d * u);
    // côté droit, au-dessus de la colonne suivante
    if (hi > hn) {
      const yb = Y - hn * a;
      s += poly([[xR, yb], [xR + Du, yb - Du], [xR + Du, Yt - Du], [xR, Yt]], coul, ".15");
      for (let z = hn + 1; z < hi; z++) g += M(xR, Y - z * a) + L(xR + Du, Y - z * a - Du);
      for (let d = 1; d < D; d++) g += M(xR + d * u, yb - d * u) + L(xR + d * u, Yt - d * u);
    }
    if (g) s += trait(g);
  });
  return s;
};

/** Une vue plate : colonnes de carrés de côté c, base en y, hauteurs h. */
const vue = (x: number, y: number, c: number, h: number[], coul: string) => {
  let s = "";
  h.forEach((hi, i) => {
    for (let z = 0; z < hi; z++)
      s += `<rect x="${x + i * c}" y="${y - (z + 1) * c}" width="${c}" height="${c}" fill="${coul}" fill-opacity=".3" stroke="${C.craie}" stroke-width="2"/>`;
  });
  return s;
};

// Le plan coté : rangée arrière 3 1 2, rangée avant 2 1 1. Vue de face = [3, 1, 2].
const plan = () => {
  const cases = [[3, 1, 2], [2, 1, 1]];
  let s = "";
  cases.forEach((ligne, l) =>
    ligne.forEach((n, c) => {
      s += `<rect x="${150 + 60 * c}" y="${44 + 60 * l}" width="60" height="60" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3"/>`;
      s += txt(180 + 60 * c, 86 + 60 * l, `${n}`, C.craie, 30);
    })
  );
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Plan vu de dessus : rangée du fond 3, 1, 2 cubes ; rangée de devant 2, 1, 1 cubes. Trois vues A, B, C">
  ${txt(240, 30, "plan vu de dessus", C.pale, 20)}
  ${s}
  <path d="M240 210 L240 178 M228 190 L240 178 L252 190" stroke="${C.rose}" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  ${txt(262, 206, "on regarde de face", C.rose, 20, "start")}
  ${vue(54, 320, 24, [2, 1, 1], C.jaune)}
  ${vue(204, 320, 24, [2, 1, 3], C.jaune)}
  ${vue(354, 320, 24, [3, 1, 2], C.jaune)}
  ${txt(90, 356, "A", C.craie, 26)}
  ${txt(240, 356, "B", C.craie, 26)}
  ${txt(390, 356, "C", C.craie, 26)}
  ${txt(240, 396, `Quelle vue de face${NB}?`, C.rose, 26)}
  </svg>`;
};

// Le podium : colonnes de 2, 3, 1 cubes, 2 cubes de profondeur, cubes de 60 px.
const podium = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un podium plein en cubes : trois marches de 2, 3 et 1 cubes de haut, sur 2 cubes de profondeur">
  ${rangee(110, 330, 60, 2, [2, 3, 1], C.jaune)}
  ${txt(410, 90, "🏆", C.craie, 44)}
  ${txt(240, 390, `Combien de cubes${NB}?`, C.rose, 28)}
  </svg>`;

// La boîte à chaussures : pavé 5 × 3 × 2 unités de 50 px, arêtes vues seulement.
const boite = () => {
  const X = 100, Y = 300, Lp = 250, Hp = 100, Du = 3 * 50 * K;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une boîte à chaussures dessinée en perspective cavalière, avec seulement les arêtes qu'on voit">
  ${poly([[X, Y], [X + Lp, Y], [X + Lp, Y - Hp], [X, Y - Hp]], C.jaune, ".3")}
  ${poly([[X, Y - Hp], [X + Lp, Y - Hp], [X + Lp + Du, Y - Hp - Du], [X + Du, Y - Hp - Du]], C.jaune, ".5")}
  ${poly([[X + Lp, Y], [X + Lp + Du, Y - Du], [X + Lp + Du, Y - Hp - Du], [X + Lp, Y - Hp]], C.jaune, ".15")}
  ${txt(410, 70, "👟", C.craie, 40)}
  ${txt(240, 350, "Il manque les arêtes cachées.", C.pale, 22)}
  ${txt(240, 395, `Combien en pointillés${NB}?`, C.rose, 28)}
  </svg>`;
};

// Le patron de la boîte de nougat : 6 × 4 × 2 cm, 20 px pour 1 cm.
const patron = () => {
  const f = (x: number, y: number, l: number, h: number, op: string) =>
    `<rect x="${x}" y="${y}" width="${l}" height="${h}" fill="${C.bleu}" fill-opacity="${op}" stroke="${C.craie}" stroke-width="3"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le patron d'une boîte en pavé : quatre rectangles en colonne et deux petits rectangles sur les côtés, l'un marqué d'un point d'interrogation">
  ${f(170, 50, 120, 80, ".12")}
  ${f(170, 130, 120, 40, ".25")}
  ${f(170, 170, 120, 80, ".12")}
  ${f(170, 250, 120, 40, ".25")}
  ${f(130, 170, 40, 80, ".25")}
  ${f(290, 170, 40, 80, ".25")}
  ${txt(230, 40, "6 cm", C.craie, 22)}
  ${txt(160, 98, "4 cm", C.craie, 22, "end")}
  ${txt(160, 158, "2 cm", C.craie, 22, "end")}
  ${txt(310, 220, "?", C.rose, 34)}
  ${txt(230, 218, "fond", C.craie, 22)}
  ${txt(240, 392, `Les dimensions de «${NB}?${NB}»${NB}?`, C.rose, 26)}
  </svg>`;
};

// Le piège : vue de dessus (1 rangée de 4) et vue de face (1, 3, 2, 1).
const deuxVues = () => {
  let dessus = "";
  for (let i = 0; i < 4; i++)
    dessus += `<rect x="${160 + 40 * i}" y="${66}" width="40" height="40" fill="${C.bleu}" fill-opacity=".3" stroke="${C.craie}" stroke-width="2"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Deux vues d'une construction : de dessus, une rangée de 4 carreaux ; de face, des colonnes de 1, 3, 2 et 1 carreaux">
  ${txt(240, 50, "vue de dessus", C.pale, 20)}
  ${dessus}
  ${txt(240, 160, "vue de face", C.pale, 20)}
  ${vue(160, 300, 40, [1, 3, 2, 1], C.jaune)}
  ${txt(240, 345, `Sami${NB}: «${NB}4 carreaux, donc 4 cubes.${NB}»`, C.craie, 22)}
  ${txt(240, 392, `A-t-il raison${NB}?`, C.rose, 30)}
  </svg>`;
};

// Le patron du dé : 4 carrés en ligne, un au-dessus du 2e, un sous le 3e. Carrés de 70 px.
const de = () => {
  const c = (x: number, y: number, t: string, coul: string = C.craie) =>
    `<rect x="${x}" y="${y}" width="70" height="70" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>` +
    (t ? txt(x + 35, y + 48, t, coul, 38) : "");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le patron d'un dé : une ligne de 4 carrés avec 1 et 2, le 3 au-dessus du 2, une case vide, et la case point d'interrogation sous le troisième carré">
  ${c(100, 170, "1")}
  ${c(170, 170, "2")}
  ${c(240, 170, "")}
  ${c(310, 170, "")}
  ${c(170, 100, "3")}
  ${c(240, 240, "?", C.rose)}
  ${txt(240, 50, `🎲 faces opposées${NB}: 7`, C.craie, 24)}
  ${txt(240, 385, `Quel nombre sur «${NB}?${NB}»${NB}?`, C.rose, 28)}
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "vision_espace",
  titre: "Énigmes sur la vision dans l'espace",
  description: "Défis maths à projeter en 6e : la maquette de l'architecte, les cubes du podium, les arêtes cachées de la boîte, le patron de la boîte de nougat, le piège des deux vues, le patron du dé.",
  problemes: [
    {
      tag: "Énigme 1 · Chez l'architecte",
      titre: "La maquette du quartier",
      question: `Une architecte fait une maquette en cubes.<br>Sur son plan, chaque case dit <b>combien de cubes</b> sont empilés.<br>On regarde la maquette <b>de face</b>.<br><br>Quelle vue voit-on : A, B ou C ?`,
      reponse: `De face, chaque colonne du plan montre <b>sa pile la plus haute</b>.<br>À gauche : 3 et 2, on voit 3. Au milieu : 1 et 1, on voit 1.<br>À droite : 2 et 1, on voit 2.<br>La vue de face est 3, 1, 2 : <span class="big">la vue C</span>.<br>A ne montre que la rangée de devant. B est vue de derrière.`,
      consigne: "Quelle vue de face voit-on : A, B ou C ?",
      verification: { type: "qcm", choix: ["La vue A", "La vue B", "La vue C"], bonne: 2 },
      dessin: plan(),
    },
    {
      tag: "Énigme 2 · Au podium",
      titre: "Les cubes du podium",
      question: `Le podium est fait de cubes.<br>Il est <b>plein</b>, sans trou.<br>Chaque marche a <b>2 cubes</b> de profondeur.<br><br>Combien de cubes en tout ?`,
      reponse: `On compte étage par étage.<br>En bas : 3 colonnes × 2 = 6 cubes. Au milieu : 2 × 2 = 4 cubes. En haut : 2 cubes.<br>6 + 4 + 2 = <span class="big">12 cubes</span>.<br>Autre façon, par marches : (2 + 3 + 1) × 2 = 12 ✓. Beaucoup sont cachés !`,
      consigne: "Combien de cubes forment le podium ?",
      verification: { type: "courte", attendus: ["12"], unite: "cubes" },
      dessin: podium(),
    },
    {
      tag: "Énigme 3 · Chez le cordonnier",
      titre: "La boîte à chaussures",
      question: `Mila dessine une boîte à chaussures en perspective.<br>Elle a tracé les arêtes <b>qu'on voit</b>.<br>Les arêtes cachées se tracent en pointillés.<br><br>Combien d'arêtes doit-elle tracer <b>en pointillés</b> ?`,
      reponse: `Une boîte (un pavé) a <b>12 arêtes</b>.<br>Sur le dessin, on en compte 9 : 4 devant, 3 en plus dessus, 2 en plus à droite.<br>12 − 9 = <span class="big">3 arêtes en pointillés</span>.<br>Elles partent du coin caché, en bas à gauche, au fond.`,
      consigne: "Combien d'arêtes cachées Mila doit-elle tracer en pointillés ?",
      verification: { type: "courte", attendus: ["3"], unite: "arêtes" },
      dessin: boite(),
    },
    {
      tag: "Énigme 4 · Chez le confiseur",
      titre: "Le patron de la boîte de nougat",
      question: `Une boîte de nougat est un pavé.<br>Elle mesure <b>6 cm</b> de long, <b>4 cm</b> de large et <b>2 cm</b> de haut.<br>Voici son patron.<br><br>Quelles sont les dimensions de la face marquée « ? » ?`,
      reponse: `La face « ? » est un côté de la boîte.<br>Elle touche le fond par un bord de <b>4 cm</b>.<br>Elle se replie pour monter de la hauteur de la boîte : <b>2 cm</b>.<br>C'est un rectangle de <span class="big">4 cm sur 2 cm</span>.`,
      consigne: "Quelles sont les dimensions de la face marquée « ? » ?",
      verification: { type: "qcm", choix: ["4 cm sur 2 cm", "6 cm sur 2 cm", "6 cm sur 4 cm"], bonne: 0 },
      dessin: patron(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux vues de Sami",
      sorte: "piege",
      question: `Sami a fait une construction en cubes.<br>Voici sa vue de dessus et sa vue de face.<br>Il dit : « De dessus, je vois 4 carreaux. Il y a 4 cubes. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! De dessus, les cubes d'une colonne se cachent entre eux.<br>La vue de dessus compte les <b>colonnes</b>, pas les cubes.<br>De face : 1, 3, 2 et 1 cubes. Et il n'y a qu'une rangée.<br>1 + 3 + 2 + 1 = <span class="big">7 cubes</span>.`,
      consigne: "Sami dit qu'il y a 4 cubes. A-t-il raison ?",
      verification: { type: "qcm", choix: ["Oui, il y a 4 cubes", "Non : il y a 7 cubes", "Non : il y a 8 cubes"], bonne: 1 },
      dessin: deuxVues(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le patron du dé",
      sorte: "defi",
      question: `Sur un dé, deux faces <b>opposées</b> font toujours <b>7</b>.<br>(1 et 6, 2 et 5, 3 et 4.)<br>Voici le patron d'un dé.<br><br>Quel nombre faut-il écrire sur la case « ? » ?`,
      reponse: `On plie : le 2 devant. Le 1 se plie à gauche, la case vide à droite, la dernière derrière.<br>Le 3 se plie dessus.<br>La case « ? » se plie <b>dessous</b> : elle est opposée au 3.<br>7 − 3 = <span class="big">4</span>.`,
      consigne: "Quel nombre faut-il écrire sur la case « ? » du patron ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: de(),
    },
  ],
};

export default problemes;
