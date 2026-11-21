// Énigmes à projeter — première (sans spé maths), notion info_representations_croisees
// (les prêts de la médiathèque, les spectateurs du festival, l'agence
// immobilière, le petit-déjeuner au lycée, piège des deux clubs de sport,
// défi du conseil municipal). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r } from "../dessins-ecole";
import { repereXY, barre, secteur, dansSecteur } from "../dessins-1re";

const graduesY = (R: ReturnType<typeof repereXY>, de: number, a: number, pas: number, suffixe = "") => {
  let s = "";
  for (let v = de; v <= a; v += pas) s += l(R.X(0) - 6, R.Y(v), R.X(0) + 6, R.Y(v), C.craie, 2) + t(R.X(0) - 10, R.Y(v) + 6, v + suffixe, C.pale, 17, "end");
  return s;
};

const mediatheque = (() => {
  const R = repereXY(0, 9, 0, 140, { gx: 80, gy: 60, gl: 360, gh: 240, px: 9, py: 20, etiquettes: false });
  const cats: [string, number, number, number][] = [["livres", 0.5, 120, 80], ["BD", 3.5, 40, 100], ["DVD", 6.5, 60, 20]];
  let s = R.fond + graduesY(R, 20, 140, 20);
  for (const [nom, x, a, e] of cats)
    s += barre(R, x, 1, a, C.bleu) + barre(R, x + 1, 1, e, C.jaune) + t(R.X(x + 1), R.Y(0) + 26, nom, C.craie, 19);
  s += r(90, 18, 18, 18, C.bleu, 0.35, 2) + t(116, 33, "adultes", C.bleu, 18, "start") +
    r(230, 18, 18, 18, C.jaune, 0.35, 2) + t(256, 33, "enfants", C.jaune, 18, "start");
  return svg("Barres groupées des prêts d'une médiathèque : livres 120 adultes et 80 enfants, BD 40 et 100, DVD 60 et 20",
    s + t(240, 395, `combien de BD prêtées en tout${NB}?`, C.rose, 24));
})();

const festival = (() => {
  const cx = 240, cy = 185, ra = 140;
  const parts: [string, number, number, string, number][] = [["voiture", 0, 180, C.bleu, 70], ["train", 180, 270, C.jaune, 80], ["vélo", 270, 330, C.rose, 90], ["à pied", 330, 360, C.pale, 168]];
  let s = "";
  for (const [nom, a0, a1, c, d] of parts) {
    s += secteur(cx, cy, ra, a0, a1, c);
    const [x, y] = dansSecteur(cx, cy, d, a0, a1);
    s += t(x, y + 7, nom, nom === "à pied" ? C.pale : C.craie, 20);
  }
  return svg("Diagramme circulaire des spectateurs d'un festival : voiture 180°, train 90°, vélo 60°, à pied 30°",
    s + t(240, 395, `2 400 spectateurs${NB}: combien en train${NB}?`, C.rose, 24));
})();

const agence = (() => {
  let s = t(240, 40, "appartements et maisons dans 3 villes", C.pale, 19);
  // A : un seul disque
  s += secteur(85, 185, 62, 0, 230, C.bleu) + secteur(85, 185, 62, 230, 360, C.jaune);
  // B : une barre à 100 % par ville
  const hauts = [0.7, 0.45, 0.25];
  hauts.forEach((h, k) => {
    const x = 182 + k * 40, y0 = 115, H = 140;
    s += r(x, y0, 26, H * (1 - h), C.jaune, 0.35, 2) + r(x, y0 + H * (1 - h), 26, H * h, C.bleu, 0.35, 2);
  });
  // C : une courbe
  s += l(330, 255, 455, 255, C.craie, 2) + l(330, 255, 330, 115, C.craie, 2) +
    `<path d="M340 230 L380 170 L420 200 L450 140" fill="none" stroke="${C.rose}" stroke-width="4" stroke-linejoin="round"/>`;
  s += t(85, 300, "A", C.craie, 30) + t(234, 300, "B", C.craie, 30) + t(392, 300, "C", C.craie, 30);
  return svg("Trois représentations : A un seul disque, B une barre à 100 % par ville, C une courbe",
    s + t(240, 385, `laquelle compare les 3 villes${NB}?`, C.rose, 24));
})();

const dejeuner = (() => {
  const R = repereXY(0, 9, 0, 100, { gx: 90, gy: 40, gl: 300, gh: 260, px: 9, py: 20, etiquettes: false });
  const cl: [string, number, number][] = [["2de", 1, 80], ["1re", 4, 70], ["Tle", 7, 55]];
  let s = R.fond + graduesY(R, 20, 100, 20, " %");
  for (const [nom, x, v] of cl)
    s += barre(R, x, 1.6, v, C.bleu) + barre(R, x, 1.6, 100, C.jaune, v) + t(R.X(x + 0.8), R.Y(v / 2) + 7, v + " %", C.craie, 18) + t(R.X(x + 0.8), R.Y(0) + 26, nom, C.craie, 20);
  s += r(400, 70, 18, 18, C.bleu, 0.35, 2) + t(400, 112, "mange", C.bleu, 16, "start") + r(400, 150, 18, 18, C.jaune, 0.35, 2) + t(400, 192, "rien", C.jaune, 16, "start");
  return svg("Barres à 100 % : part des lycéens qui prennent un petit-déjeuner, 80 % en 2de, 70 % en 1re, 55 % en terminale",
    s + t(240, 395, `que dit ce graphique${NB}?`, C.rose, 24));
})();

const clubs = (() => {
  const s = t(125, 50, "judo", C.craie, 24) + t(125, 78, "200 membres", C.pale, 18) +
    t(355, 50, "natation", C.craie, 24) + t(355, 78, "50 membres", C.pale, 18) +
    secteur(125, 205, 95, 0, 144, C.rose) + secteur(125, 205, 95, 144, 360, C.pale, 0.15) +
    secteur(355, 205, 95, 0, 216, C.rose) + secteur(355, 205, 95, 216, 360, C.pale, 0.15) +
    t(dansSecteur(125, 205, 55, 0, 144)[0], dansSecteur(125, 205, 55, 0, 144)[1] + 8, "40 %", C.craie, 22) +
    t(dansSecteur(355, 205, 55, 0, 216)[0], dansSecteur(355, 205, 55, 0, 216)[1] + 8, "60 %", C.craie, 22) +
    t(240, 335, "en rose : les filles", C.rose, 18);
  return svg("Deux disques de même taille : au judo (200 membres) 40 % de filles, à la natation (50 membres) 60 % de filles",
    s + t(240, 390, `quel club a le plus de filles${NB}?`, C.rose, 24));
})();

const conseil = (() => {
  const cx = 240, cy = 300, ra = 190;
  const parts: [string, number, number, string][] = [["A", -90, 10, C.bleu], ["B", 10, 70, C.jaune], ["C", 70, 90, C.rose]];
  let s = "";
  for (const [nom, a0, a1, c] of parts) s += secteur(cx, cy, ra, a0, a1, c);
  const [xa, ya] = dansSecteur(cx, cy, 115, -90, 10), [xb, yb] = dansSecteur(cx, cy, 120, 10, 70), [xc, yc] = dansSecteur(cx, cy, 155, 70, 90);
  s += t(xa, ya, "liste A", C.craie, 20) + t(xa, ya + 26, "100°", C.craie, 20) +
    t(xb, yb, "B", C.craie, 22) + t(xb, yb + 26, "60°", C.craie, 20) + t(xc, yc + 8, "C", C.craie, 20) +
    t(240, 340, "45 sièges en tout", C.pale, 20);
  return svg("Diagramme semi-circulaire d'un conseil municipal de 45 sièges : liste A 100°, liste B 60°, liste C le reste",
    s + t(240, 395, `combien de sièges pour C${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "info_representations_croisees",
  titre: "Énigmes des représentations croisées",
  description: "Les prêts de la médiathèque, les spectateurs du festival, l'agence immobilière, le petit-déjeuner au lycée, le piège des deux clubs de sport, le défi du conseil municipal : lire des barres croisées et des diagrammes circulaires, choisir et commenter une représentation.",
  problemes: [
    {
      tag: "Énigme 1 · La médiathèque",
      titre: "Des barres groupées",
      question: `Le diagramme donne les prêts d'une médiathèque en une semaine, pour les adultes et pour les enfants.<br><br><b>Combien de BD</b> ont été prêtées en tout ?`,
      reponse: `On additionne les deux barres « BD » : 40 pour les adultes et 100 pour les enfants.<br>40 + 100 = <span class="big">140 BD</span>. Les enfants en empruntent plus du double des adultes.`,
      consigne: "40 BD pour les adultes, 100 pour les enfants : combien de BD prêtées en tout ?",
      verification: { type: "courte", attendus: ["140"], unite: "BD" },
      dessin: mediatheque,
    },
    {
      tag: "Énigme 2 · Le festival",
      titre: "Un diagramme circulaire",
      question: `Un festival de musique a accueilli 2 400 spectateurs. Le disque montre comment ils sont venus.<br><br><b>Combien</b> sont venus en train ?`,
      reponse: `Le secteur « train » mesure 90°, soit un quart du disque (90 ÷ 360 = 0,25).<br>2 400 × 0,25 = <span class="big">600 spectateurs</span>.`,
      consigne: "Le secteur du train mesure 90° sur 360° : combien des 2 400 spectateurs sont venus en train ?",
      verification: { type: "courte", attendus: ["600"], unite: "spectateurs" },
      dessin: festival,
    },
    {
      tag: "Énigme 3 · L'agence immobilière",
      titre: "Choisir la représentation",
      question: `Une agence veut comparer, dans trois villes, la part des appartements et celle des maisons.<br><br><b>Quelle représentation</b> choisir ?`,
      reponse: `Un seul disque mélange les trois villes, et une courbe sert à suivre une évolution dans le temps.<br>Il faut <span class="big">le graphique B</span> : une barre à 100 % par ville, et on compare les hauteurs d'un coup d'œil.`,
      consigne: "Pour comparer la part des appartements dans trois villes, quel graphique choisir ?",
      verification: { type: "qcm", choix: ["Le graphique A : un seul disque", "Le graphique B : une barre à 100 % par ville", "Le graphique C : une courbe"], bonne: 1 },
      dessin: agence,
    },
    {
      tag: "Énigme 4 · Le petit-déjeuner",
      titre: "Commenter un graphique",
      question: `Une enquête demande aux lycéens s'ils prennent un petit-déjeuner. Le graphique donne les résultats par classe.<br><br><b>Quelle phrase</b> est juste ?`,
      reponse: `Les barres donnent des <b>parts</b> (des pourcentages), pas des effectifs : on ne sait pas combien il y a d'élèves.<br>On peut dire : <span class="big">la part de ceux qui mangent baisse de la 2de à la terminale</span> (80 %, 70 %, 55 %).`,
      consigne: "80 % en 2de, 70 % en 1re, 55 % en terminale : quelle phrase est juste ?",
      verification: { type: "qcm", choix: ["La part de ceux qui mangent baisse de la 2de à la terminale", "Il y a moins d'élèves en terminale", "En terminale, 55 élèves mangent le matin"], bonne: 0 },
      dessin: dejeuner,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les deux clubs",
      sorte: "piege",
      question: `Au club de judo (200 membres), il y a 40 % de filles. Au club de natation (50 membres), 60 %.<br><br><b>Quel club</b> compte le plus de filles ?`,
      reponse: `Deux disques de même taille cachent des effectifs très différents !<br>Judo : 40 % de 200 = 80 filles. Natation : 60 % de 50 = 30 filles. <span class="big">Le judo</span> en a le plus.`,
      consigne: "40 % de 200 membres au judo, 60 % de 50 membres à la natation : quel club a le plus de filles ?",
      verification: { type: "qcm", choix: ["La natation", "Autant dans les deux", "Le judo"], bonne: 2 },
      dessin: clubs,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le conseil municipal",
      sorte: "defi",
      question: `Le demi-disque montre les 45 sièges d'un conseil municipal. La liste A a un secteur de 100°, la liste B de 60°.<br><br><b>Combien de sièges</b> a la liste C ?`,
      reponse: `Un demi-disque fait 180° : la liste C a 180 − 100 − 60 = 20°.<br>Un siège vaut 180 ÷ 45 = 4°, donc C a 20 ÷ 4 = <span class="big">5 sièges</span> (A en a 25, B en a 15).`,
      consigne: "Le demi-disque fait 180° pour 45 sièges ; A a 100°, B a 60° : combien de sièges pour C ?",
      verification: { type: "courte", attendus: ["5"], unite: "sièges" },
      dessin: conseil,
    },
  ],
};

export default problemes;
