// Énigmes à projeter — première spé maths, notion analyse_graphique_1s
// (l'écluse du canal, le vent du spot de kitesurf, la nuit au refuge, l'audience
// d'une radio, piège de la course de caisses à savon, défi de la trésorerie de
// la ludothèque). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l } from "../dessins-ecole";
import { repereXY, brisee } from "../dessins-1re";

const ecluse = (() => {
  const R = repereXY(0, 8, 0, 7, { gx: 90, gy: 30, gl: 320, gh: 320, px: 1, py: 1 });
  return svg("La hauteur d'eau dans une écluse, en mètres, selon l'heure t : elle passe par (0 ; 2), (2 ; 2), (4 ; 6), (6 ; 6) et (8 ; 2)",
    R.fond.replace(">0</text>", "></text>") + brisee(R, [[0, 2], [2, 2], [4, 6], [6, 6], [8, 2]], C.bleu, 5) +
      t(R.X(0.2), R.Y(6.4), "hauteur (m)", C.bleu, 20, "start") +
      t(240, 405, `hauteur à t = 3 h${NB}?`, C.rose, 26));
})();

const kite = (() => {
  const R = repereXY(0, 8, 0, 28, { gx: 90, gy: 30, gl: 320, gh: 320, px: 1, py: 4 });
  return svg("La vitesse du vent sur un spot de kitesurf, en km/h, selon l'heure t : une courbe en cloche qui vaut 8 à t = 0, 24 à t = 4 et 8 à t = 8 ; la droite v = 20 est en pointillés",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => 24 - (x - 4) * (x - 4), 0, 8, C.bleu, 4) +
      l(R.X(0), R.Y(20), R.X(8), R.Y(20), C.rose, 3, "8 8") +
      t(R.X(6.7), R.Y(21.5), "20 km/h", C.rose, 20, "start") +
      t(240, 405, `antécédents de 20${NB}?`, C.rose, 26));
})();

const refuge = (() => {
  const R = repereXY(0, 8, -3, 7, { gx: 90, gy: 30, gl: 320, gh: 320, px: 1, py: 1 });
  return svg("La température devant un refuge de montagne pendant la nuit, en degrés, h heures après 22 h : elle vaut 6 à h = 0, s'annule en h = 2 et h = 6, descend à −2 en h = 4, remonte à 6 en h = 8",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => ((x - 2) * (x - 6)) / 2, 0, 8, C.bleu, 4) +
      t(R.X(4), R.Y(4.6), "T(h) en °C", C.bleu, 22) +
      t(240, 405, `T(h) &lt; 0 pour h dans${NB}?`, C.rose, 26));
})();

const radio = (() => {
  const R = repereXY(0, 8, 0, 6, { gx: 90, gy: 30, gl: 320, gh: 320, px: 1, py: 1 });
  return svg("L'audience d'une radio, en millions d'auditeurs, selon l'heure : elle passe par (0 ; 1), (2 ; 5), (4 ; 2), (6 ; 4) et (8 ; 1) ; la droite y = 3 est en pointillés",
    R.fond.replace(">0</text>", "></text>") + brisee(R, [[0, 1], [2, 5], [4, 2], [6, 4], [8, 1]], C.bleu, 5) +
      l(R.X(0), R.Y(3), R.X(8), R.Y(3), C.rose, 3, "8 8") +
      t(R.X(5.6), R.Y(5.4), "millions", C.bleu, 20) +
      t(240, 405, `f(x) = 3 : combien de solutions${NB}?`, C.rose, 24));
})();

const caisses = (() => {
  const R = repereXY(-3, 5, -1, 4, { gx: 90, gy: 30, gl: 320, gh: 320, px: 1, py: 1, ey: 2 });
  return svg("Le profil d'une colline pour une course de caisses à savon : la courbe de f part de (−2 ; 0), passe par (0 ; 3), culmine vers x = 1 et redescend en (4 ; 0)",
    R.fond.replace(">0</text>", "></text>") + R.courbe((x) => (-3 / 8) * (x + 2) * (x - 4), -2, 4, C.bleu, 5) +
      t(R.X(3.6), R.Y(3.5), "profil f", C.bleu, 22) +
      t(240, 405, `image de 0 par f${NB}?`, C.rose, 26));
})();

const ludo = (() => {
  const R = repereXY(0, 8, -3, 5, { gx: 90, gy: 30, gl: 320, gh: 320, px: 1, py: 1 });
  return svg("La trésorerie d'une ludothèque, en centaines d'euros, au mois x : elle passe par (0 ; −2), (2 ; 3), (5 ; −1) et (8 ; 4)",
    R.fond.replace(">0</text>", "></text>") + brisee(R, [[0, -2], [2, 3], [5, -1], [8, 4]], C.bleu, 5) +
      t(240, 405, `k entier, exactement 2 solutions${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "premiere-spe",
  notionId: "analyse_graphique_1s",
  titre: "Énigmes de l'analyse graphique",
  description: "L'écluse du canal, le vent du spot de kitesurf, la nuit au refuge, l'audience d'une radio, le piège des caisses à savon, le défi de la trésorerie de la ludothèque : image, antécédents, signe, équations f(x) = k lues sur la courbe.",
  problemes: [
    {
      tag: "Énigme 1 · L'écluse du canal",
      titre: "Lire une image",
      question: `La courbe donne la hauteur d'eau f(t) dans une écluse, en mètres, t heures après l'ouverture.<br><br><b>Que vaut f(3)</b> ?`,
      reponse: `On part de t = 3 sur l'axe horizontal, on monte jusqu'à la courbe et on lit la hauteur.<br>Entre (2 ; 2) et (4 ; 6), la montée est régulière : <span class="big">f(3) = 4 m</span>.`,
      consigne: "Sur la courbe de la hauteur d'eau, que vaut f(3) ?",
      verification: { type: "courte", attendus: ["4"], unite: "m" },
      dessin: ecluse,
    },
    {
      tag: "Énigme 2 · Le spot de kitesurf",
      titre: "Lire des antécédents",
      question: `La courbe donne la vitesse du vent v(t), en km/h, sur un spot de kitesurf, t heures après 10 h.<br><br><b>Quels sont les antécédents de 20</b> par v ?`,
      reponse: `On part de 20 sur l'axe vertical, on suit la droite en pointillés et on lit les abscisses des points de la courbe.<br><span class="big">t = 2 et t = 6</span> : le vent souffle à 20 km/h à midi et à 16 h.`,
      consigne: "Sur la courbe du vent, quels sont les antécédents de 20 ?",
      verification: { type: "qcm", choix: ["20", "2 et 6", "4"], bonne: 1 },
      dessin: kite,
    },
    {
      tag: "Énigme 3 · La nuit au refuge",
      titre: "Lire le signe d'une fonction",
      question: `La courbe donne la température T(h), en °C, devant un refuge de montagne, h heures après 22 h (h entre 0 et 8).<br><br><b>Pour quelles valeurs de h a-t-on T(h) &lt; 0</b> ?`,
      reponse: `On cherche où la courbe est sous l'axe horizontal : entre ses deux points de contact, h = 2 et h = 6.<br><span class="big">h ∈ ]2 ; 6[</span> : il gèle de minuit à 4 h du matin.`,
      consigne: "Sur la courbe, pour quels h a-t-on T(h) < 0 ?",
      verification: { type: "qcm", choix: ["]2 ; 6[", "[0 ; 2[ et ]6 ; 8]", "]−2 ; 6["], bonne: 0 },
      dessin: refuge,
    },
    {
      tag: "Énigme 4 · L'audience de la radio",
      titre: "Résoudre f(x) = k",
      question: `La courbe donne l'audience f(x) d'une radio, en millions d'auditeurs, x heures après 6 h.<br><br><b>Combien de solutions a l'équation f(x) = 3</b> ?`,
      reponse: `On compte les points où la droite y = 3 coupe la courbe : un sur chacun des quatre segments.<br><span class="big">4 solutions</span>.`,
      consigne: "Sur la courbe de l'audience, combien de solutions a f(x) = 3 ?",
      verification: { type: "courte", attendus: ["4"] },
      dessin: radio,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La course de caisses à savon",
      sorte: "piege",
      question: `La courbe de f donne le profil d'une colline pour une course de caisses à savon.<br>Léo : « L'image de 0, c'est là où la courbe touche l'axe : −2 et 4. »<br><br><b>Quelle est l'image de 0 par f</b> ?`,
      reponse: `−2 et 4 sont les antécédents de 0 : là où f(x) = 0. L'image de 0, c'est f(0) : on part de x = 0.<br>La courbe coupe l'axe vertical en 3 : <span class="big">f(0) = 3</span>.`,
      consigne: "Sur la courbe, quelle est l'image de 0 par f ?",
      verification: { type: "qcm", choix: ["−2 et 4", "0", "3"], bonne: 2 },
      dessin: caisses,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La trésorerie de la ludothèque",
      sorte: "defi",
      question: `La courbe de f donne la trésorerie d'une ludothèque, en centaines d'euros, au mois x (x entre 0 et 8).<br><br><b>Pour combien d'entiers k</b> l'équation f(x) = k a-t-elle exactement 2 solutions ?`,
      reponse: `On fait glisser une droite horizontale y = k. Entre −1 et 3, elle coupe 3 fois ; au-dessus de 3 ou sous −1, une fois au plus.<br>Pile 2 fois en k = −1 (le creux) et en k = 3 (le sommet) : <span class="big">2 entiers</span>.`,
      consigne: "Pour combien d'entiers k l'équation f(x) = k a-t-elle exactement 2 solutions ?",
      verification: { type: "courte", attendus: ["2"] },
      dessin: ludo,
    },
  ],
};

export default problemes;
