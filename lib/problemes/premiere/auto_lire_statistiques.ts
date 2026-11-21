// Énigmes à projeter — première (sans spé maths), notion auto_lire_statistiques
// (les déchets triés, le trajet des salariés, la route du Maïdo (974), les
// spectateurs du club de rugby, piège des sacs de café, défi des adhérents de
// l'association de randonnée). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repereXY, barre, secteur, dansSecteur } from "../dessins-1re";
import { frac } from "../outils";

const dechets = (() => {
  const parts: [string, number, number, string][] = [["verre", 0, 45, C.jaune], ["papier", 45, 180, C.bleu], ["plastique", 180, 270, C.rose], ["autres", 270, 360, C.pale]];
  let s = "";
  for (const [nom, a0, a1, c] of parts) {
    s += secteur(200, 190, 140, a0, a1, c, nom === "verre" ? 0.6 : 0.3);
    const [x, y] = dansSecteur(200, 190, nom === "verre" ? 175 : 85, a0, a1);
    s += t(x, y + 6, nom, C.craie, 18);
  }
  return svg("Un diagramme circulaire des 7 200 tonnes de déchets triés : le verre occupe un secteur de 45 degrés",
    s + t(330, 70, "45°", C.jaune, 20, "start") + t(240, 365, "7 200 tonnes en tout", C.craie, 22) +
      t(240, 405, `combien de tonnes de verre${NB}?`, C.rose, 24));
})();

const trajet = (() => {
  const R = repereXY(0, 60, 0, 35, { gx: 90, gy: 40, gl: 340, gh: 280, px: 15, ex: 15, py: 5, ey: 10 });
  const v: [number, number][] = [[0, 18], [15, 30], [30, 9], [45, 3]];
  let s = "";
  for (const [x, n] of v) s += barre(R, x, 15, n, x >= 30 ? C.jaune : C.bleu) + t(R.X(x + 7.5), R.Y(n) - 10, n, C.craie, 20);
  return svg("Un histogramme des temps de trajet de 60 salariés : 18 de 0 à 15 min, 30 de 15 à 30, 9 de 30 à 45, 3 de 45 à 60",
    R.fond + s + t(R.X(0) + 8, R.Y(35) + 20, "salariés", C.pale, 17, "start") + t(R.X(60), R.Y(0) + 46, "minutes", C.pale, 17, "end") +
      t(240, 405, `quelle part met 30 min ou plus${NB}?`, C.rose, 22));
})();

const maido = (() => {
  const R = repereXY(0, 2400, 0, 30, { gx: 90, gy: 40, gl: 340, gh: 280, px: 400, ex: 800, py: 5, ey: 10 });
  const pts: [number, number][] = [[0, 27], [400, 25], [800, 22], [1200, 20], [1600, 17], [2000, 14], [2200, 13]];
  return svg("Un nuage de points : la température relevée le long de la route du Maïdo, de 27 degrés au bord de mer à 13 degrés vers 2 200 m",
    R.fond + pts.map(([x, y]) => R.point(x, y, C.bleu, 8)).join("") +
      t(R.X(0) + 8, R.Y(30) + 20, "température (°C)", C.pale, 17, "start") + t(R.X(2400), R.Y(0) + 46, "altitude (m)", C.pale, 17, "end") +
      t(240, 405, `quelle tendance${NB}?`, C.rose, 26));
})();

const rugby = (() => {
  const R = repereXY(0, 4, 0, 2000, { gx: 100, gy: 40, gl: 330, gh: 280, px: 4, ex: 4, py: 250, ey: 500, etiquettes: true });
  const v = [1500, 1250, 1750, 1000];
  let s = "";
  v.forEach((n, i) => { s += barre(R, i + 0.2, 0.6, n, C.bleu) + t(R.X(i + 0.5), R.Y(0) + 24, `match ${i + 1}`, C.pale, 16); });
  return svg("Un diagramme en barres des spectateurs de 4 matchs de rugby : 1 500, 1 250, 1 750 et 1 000",
    R.fond.replace(/<text[^>]*>4<\/text>/, "") + s + t(R.X(0) + 8, R.Y(2000) + 20, "spectateurs", C.pale, 17, "start") +
      t(240, 405, `combien au total${NB}?`, C.rose, 26));
})();

const cafe = (() => {
  const sac = (x: number, y: number, k: number, c: string) =>
    r(x, y, 60 * k, 70 * k, c, 0.35, 3, 14 * k) + l(x + 12 * k, y + 10 * k, x + 48 * k, y + 10 * k, C.craie, 3);
  return svg("Deux sacs de café : celui de 2025 est deux fois plus haut et deux fois plus large que celui de 2020",
    l(60, 60, 60, 330, C.craie, 3) + l(60, 330, 450, 330, C.craie, 3) +
      l(54, 260, 66, 260, C.craie, 2) + t(48, 266, "2 t", C.pale, 17, "end") + l(54, 190, 66, 190, C.craie, 2) + t(48, 196, "4 t", C.pale, 17, "end") +
      l(60, 260, 140, 260, C.pale, 1.5, "5 5") + l(60, 190, 250, 190, C.pale, 1.5, "5 5") +
      sac(110, 260, 1, C.jaune) + sac(250, 190, 2, C.jaune) +
      t(140, 355, "2020", C.craie, 20) + t(310, 355, "2025", C.craie, 20) +
      t(250, 40, "« Une récolte record ! »", C.craie, 20) + t(240, 400, `multipliée par combien${NB}?`, C.rose, 24));
})();

const rando = (() => {
  let s = secteur(200, 185, 140, 0, 81, C.jaune, 0.6) + secteur(200, 185, 140, 81, 360, C.bleu, 0.2);
  const [x, y] = dansSecteur(200, 185, 85, 0, 81);
  const [x2, y2] = dansSecteur(200, 185, 70, 81, 360);
  s += t(x, y - 4, "54", C.craie, 22) + t(x, y + 18, "81°", C.craie, 16) + t(x2, y2 + 8, "?", C.craie, 30);
  return svg("Un diagramme circulaire : les moins de 30 ans font un secteur de 81 degrés, soit 54 adhérents",
    s + t(310, 45, "moins de 30 ans", C.jaune, 18, "start") + t(240, 370, "54 adhérents ↔ 81°", C.craie, 22) +
      t(240, 405, `combien d'adhérents en tout${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_lire_statistiques",
  titre: "Énigmes pour lire des statistiques",
  description: "Les déchets triés, le trajet des salariés, la route du Maïdo, les spectateurs du club de rugby, le piège des sacs de café, le défi de l'association de randonnée : lire un diagramme circulaire, un histogramme, un nuage de points, des barres, et se méfier des images.",
  problemes: [
    {
      tag: "Énigme 1 · Les déchets triés",
      titre: "Lire un secteur",
      question: `Une communauté de communes a trié <b>7 200 tonnes</b> de déchets cette année. Dans le diagramme circulaire, le verre occupe un secteur de <b>45°</b>.<br><br><b>Combien de tonnes</b> de verre a-t-on triées ?`,
      reponse: `Le disque entier fait 360°, donc le verre fait 45 ÷ 360 = ${frac(1, 8)} du total.<br>7 200 ÷ 8 = <span class="big">900 tonnes</span>.`,
      consigne: "Secteur de 45° sur 7 200 tonnes : combien de tonnes de verre ?",
      verification: { type: "courte", attendus: ["900"], unite: "tonnes" },
      dessin: dechets,
    },
    {
      tag: "Énigme 2 · Le trajet des salariés",
      titre: "Lire un histogramme",
      question: `Une entreprise de 60 salariés a mesuré leur temps de trajet du matin.<br><br><b>Quelle part</b> des salariés met 30 minutes ou plus ?`,
      reponse: `30 minutes ou plus : les deux barres de droite, 9 + 3 = 12 salariés.<br>12 ÷ 60 = 0,2 : <span class="big">20 %</span> des salariés.`,
      consigne: "9 + 3 salariés sur 60 mettent 30 min ou plus : quelle part, en % ?",
      verification: { type: "qcm", choix: ["20 %", "12 %", "15 %"], bonne: 0 },
      dessin: trajet,
    },
    {
      tag: "Énigme 3 · La route du Maïdo",
      titre: "Lire un nuage de points",
      question: `En montant en voiture du bord de mer jusqu'au Maïdo, une classe a relevé la température à plusieurs altitudes.<br><br><b>Que montre le nuage de points</b> ?`,
      reponse: `Les points descendent de gauche à droite : de 27 °C à 0 m jusqu'à 13 °C vers 2 200 m.<br><span class="big">Plus on monte, plus il fait frais</span> : environ 0,6 °C de moins tous les 100 m.`,
      consigne: "Les points descendent quand l'altitude augmente : que montre le nuage ?",
      verification: { type: "qcm", choix: ["La température monte avec l'altitude", "Plus on monte, plus il fait frais", "Il n'y a aucun lien"], bonne: 1 },
      dessin: maido,
    },
    {
      tag: "Énigme 4 · Le club de rugby",
      titre: "Du graphique aux données",
      question: `Le diagramme donne le nombre de spectateurs aux 4 premiers matchs d'un club de rugby.<br><br><b>Combien de spectateurs</b> en tout sur ces 4 matchs ?`,
      reponse: `On lit chaque barre : 1 500, 1 250, 1 750 et 1 000.<br>1 500 + 1 250 + 1 750 + 1 000 = <span class="big">5 500 spectateurs</span>.`,
      consigne: "Les barres montent à 1 500, 1 250, 1 750 et 1 000 : combien de spectateurs en tout ?",
      verification: { type: "courte", attendus: ["5500"], unite: "spectateurs" },
      dessin: rugby,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les sacs de café",
      sorte: "piege",
      question: `Une coopérative de café montre sa récolte sur une affiche. Le sac de 2025 est deux fois plus haut <b>et</b> deux fois plus large que celui de 2020.<br><br>Lis la hauteur des sacs. <b>Par combien</b> la récolte a-t-elle été multipliée ?`,
      reponse: `Les hauteurs se lisent sur l'axe : 2 t puis 4 t, donc <span class="big">× 2</span>.<br>Mais l'image du grand sac a une aire 2 × 2 = 4 fois plus grande : l'œil croit à × 4 !`,
      consigne: "Les sacs montent à 2 t puis 4 t : par combien la récolte a-t-elle été multipliée ?",
      verification: { type: "qcm", choix: ["× 4", "× 8", "× 2"], bonne: 2 },
      dessin: cafe,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "L'association de randonnée",
      sorte: "defi",
      question: `Dans le diagramme circulaire des adhérents d'une association de randonnée, les moins de 30 ans sont <b>54</b>. Leur secteur mesure <b>81°</b>.<br><br><b>Combien</b> l'association a-t-elle d'adhérents en tout ?`,
      reponse: `81° représentent 54 personnes, donc 1° représente 54 ÷ 81 = ${frac(2, 3)} de personne.<br>360 × 54 ÷ 81 = <span class="big">240 adhérents</span>.`,
      consigne: "54 adhérents pour un secteur de 81° : combien d'adhérents pour 360° ?",
      verification: { type: "courte", attendus: ["240"], unite: "adhérents" },
      dessin: rando,
    },
  ],
};

export default problemes;
