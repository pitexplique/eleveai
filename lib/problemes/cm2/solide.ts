// Énigmes à projeter — CM2, notion solide (les arêtes du dé, la boîte de
// céréales, les faces de la pyramide, le bon patron du cube, le piège des
// « sommets » du cylindre, le défi du grand cube peint). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, o, p } from "../dessins-ecole";

/** Un pavé en perspective cavalière : coin avant bas-gauche (x, y), largeur, hauteur, fuite. */
const pave = (x: number, y: number, L: number, H: number, f: number, c: string = C.bleu, op = 0.15) =>
  p(`M${x} ${y} L${x + L} ${y} L${x + L} ${y - H} L${x} ${y - H} Z`, c, 4, op) +
  p(`M${x} ${y - H} L${x + f} ${y - H - f} L${x + L + f} ${y - H - f} L${x + L} ${y - H} M${x + L + f} ${y - H - f} L${x + L + f} ${y - f} L${x + L} ${y}`, c, 4) +
  p(`M${x} ${y} L${x + f} ${y - f} L${x + L + f} ${y - f} M${x + f} ${y - f} L${x + f} ${y - H - f}`, c, 2).replace("/>", ' stroke-dasharray="6 6"/>');

const de = svg(
  "Un dé à jouer en forme de cube",
  pave(130, 320, 200, 200, 70, C.craie, 0.05) + o(230, 220, 14, C.rose, 1, 0) + o(180, 170, 12, C.craie, 1, 0) + o(280, 270, 12, C.craie, 1, 0) +
    t(240, 395, `combien d'arêtes${NB}?`, C.rose, 26)
);

const cereales = svg(
  "Une boîte de céréales",
  pave(150, 350, 160, 260, 50, C.jaune, 0.2) + t(230, 220, "🥣", C.craie, 60) + t(230, 280, "CÉRÉALES", C.craie, 22)
);

const pyramide = svg(
  "Une pyramide à base carrée",
  p("M100 300 L320 300 L380 250 L160 250 Z", C.jaune, 3, 0.15).replace(/L380 250 L160 250 Z/, "L380 250") + l(100, 300, 160, 250, C.jaune, 2, "6 6") + l(160, 250, 380, 250, C.jaune, 2, "6 6") +
    p("M100 300 L240 60 L320 300 M240 60 L380 250", C.jaune, 4) + l(240, 60, 160, 250, C.jaune, 2, "6 6") + t(240, 370, `combien de faces${NB}?`, C.rose, 26)
);

const patrons = () => {
  const carre = (x: number, y: number, k: number) => r(x, y, k, k, C.bleu, 0.2, 3);
  const A = [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3]].map(([i, j]) => carre(45 + i * 30, 90 + j * 30, 30)).join("");
  const B = [0, 1, 2, 3, 4, 5].map((i) => carre(170 + i * 24, 150, 24)).join("");
  const Cc = [[0, 0], [1, 0], [2, 0], [0, 1], [1, 1], [2, 1]].map(([i, j]) => carre(345 + i * 32, 130 + j * 32, 32)).join("");
  return svg(
    "Trois dessins de 6 carrés : A en forme de croix, B en ligne, C en bloc de 2 sur 3",
    A + B + Cc + t(90, 250, "A", C.craie, 30) + t(242, 250, "B", C.craie, 30) + t(393, 250, "C", C.craie, 30) + t(240, 340, `Lequel se plie en cube${NB}?`, C.rose, 24)
  );
};

const conserve = svg(
  "Une boîte de conserve en forme de cylindre",
  `<ellipse cx="240" cy="90" rx="110" ry="30" fill="${C.pale}" fill-opacity=".2" stroke="${C.craie}" stroke-width="4"/>` +
    l(130, 90, 130, 300, C.craie, 4) + l(350, 90, 350, 300, C.craie, 4) + `<path d="M130 300 A110 30 0 0 0 350 300" fill="none" stroke="${C.craie}" stroke-width="4"/>` +
    r(130, 150, 220, 90, C.rose, 0.15, 0) + t(240, 205, "TOMATES", C.craie, 22) + t(240, 380, `«${NB}il a 2 sommets${NB}», dit Tom`, C.craie, 22)
);

const grandCube = () => {
  // 3 × 3 × 3 en cavalière : face avant 3 × 3 cases de 60 px, fuite 30 px par case.
  let s = "";
  const x0 = 110, y0 = 350, k = 60, f = 30;
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) s += r(x0 + i * k, y0 - (j + 1) * k, k, k, C.rose, 0.3, 3);
  for (let i = 0; i <= 3; i++) s += l(x0 + i * k, y0 - 3 * k, x0 + i * k + 3 * f, y0 - 3 * k - 3 * f, C.rose, 3);
  for (let j = 1; j <= 3; j++) s += l(x0 + j * f, y0 - 3 * k - j * f, x0 + 3 * k + j * f, y0 - 3 * k - j * f, C.rose, 3);
  for (let j = 0; j <= 3; j++) s += l(x0 + 3 * k, y0 - j * k, x0 + 3 * k + 3 * f, y0 - j * k - 3 * f, C.rose, 3);
  for (let i = 1; i <= 3; i++) s += l(x0 + 3 * k + i * f, y0 - i * f, x0 + 3 * k + i * f, y0 - 3 * k - i * f, C.rose, 3);
  return svg("Un grand cube fait de 3 × 3 × 3 petits cubes, peint en rouge à l'extérieur", s + t(240, 400, `3 faces peintes${NB}?`, C.craie, 24));
};

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "solide",
  titre: "Énigmes sur les solides",
  description: "Les arêtes du dé, la boîte de céréales, les faces de la pyramide, le bon patron du cube, le piège de la boîte de conserve, le défi du grand cube peint.",
  problemes: [
    {
      tag: "Énigme 1 · Le jeu de dés",
      titre: "Les arêtes du dé",
      question: `Un dé est un <b>cube</b>.<br>Une arête, c'est un bord où deux faces se touchent.<br><br><b>Combien d'arêtes</b> a un cube ?`,
      reponse: `4 arêtes en haut, 4 en bas, 4 debout.<br>4 + 4 + 4 = <span class="big">12 arêtes</span>.`,
      consigne: "Combien d'arêtes a un cube ?",
      verification: { type: "courte", attendus: ["12"], unite: "arêtes" },
      dessin: de,
    },
    {
      tag: "Énigme 2 · Au petit-déjeuner",
      titre: "La boîte de céréales",
      question: `Regarde la boîte de céréales.<br>Ses faces sont des rectangles.<br><br><b>Quel solide</b> est-ce ?`,
      reponse: `6 faces rectangulaires, pas toutes carrées.<br>C'est un <span class="big">pavé droit</span>.`,
      consigne: "La boîte de céréales est :",
      verification: { type: "qcm", choix: ["un cube", "un pavé droit", "une pyramide"], bonne: 1 },
      dessin: cereales,
    },
    {
      tag: "Énigme 3 · Au musée",
      titre: "La pyramide",
      question: `Une pyramide a une <b>base carrée</b>.<br><br><b>Combien de faces</b> a-t-elle en tout ?`,
      reponse: `1 face carrée en bas.<br>4 faces triangulaires, une par côté du carré.<br>1 + 4 = <span class="big">5 faces</span>.`,
      consigne: "Combien de faces a une pyramide à base carrée ?",
      verification: { type: "courte", attendus: ["5"], unite: "faces" },
      dessin: pyramide,
    },
    {
      tag: "Énigme 4 · Le bricolage",
      titre: "Le bon patron",
      question: `On découpe ces formes de 6 carrés, puis on les plie.<br><br><b>Laquelle</b> donne un cube ?`,
      reponse: `B : en ligne, les faces s'enroulent, il n'y a pas de dessus ni de dessous.<br>C : en bloc, les carrés se chevauchent.<br><span class="big">A</span> se plie en cube : la croix.`,
      consigne: "Quel dessin est un patron de cube ?",
      verification: { type: "qcm", choix: ["A", "B", "C"], bonne: 0 },
      dessin: patrons(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La boîte de conserve",
      sorte: "piege",
      question: `Une boîte de conserve est un <b>cylindre</b>.<br>Tom dit : « Elle a 2 sommets, un en haut et un en bas. »<br><br><b>Combien de sommets</b> a un cylindre ?`,
      reponse: `Un sommet, c'est une pointe où des arêtes se rencontrent.<br>Le cylindre n'a que des bords ronds, aucune pointe.<br>Il a <span class="big">0 sommet</span>.`,
      consigne: "Combien de sommets a un cylindre ?",
      verification: { type: "qcm", choix: ["2", "4", "0"], bonne: 2 },
      dessin: conserve,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le grand cube peint",
      sorte: "defi",
      question: `On colle <b>27 petits cubes</b> : un grand cube de 3 sur 3 sur 3.<br>On le peint en rouge, à l'extérieur.<br><br>Combien de petits cubes ont <b>3 faces peintes</b> ?`,
      reponse: `3 faces peintes : il faut être dans un coin.<br>Un cube a 8 coins.<br>Il y en a <span class="big">8</span>.`,
      consigne: "Combien de petits cubes ont 3 faces peintes ?",
      verification: { type: "courte", attendus: ["8"], unite: "cubes" },
      dessin: grandCube(),
    },
  ],
};

export default problemes;
