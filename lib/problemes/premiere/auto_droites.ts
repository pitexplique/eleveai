// Énigmes à projeter — première (sans spé maths), notion auto_droites
// (les étagères du menuisier, la randonnée depuis Cilaos (974), la bougie, la
// trottinette en location, piège du chiot et des axes, défi des poteaux de la
// palissade). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l } from "../dessins-ecole";
import { repereXY } from "../dessins-1re";

const etageres = svg("Trois formules du menuisier pour une étagère carrée de côté x : P = 4x, B = 30x², F = 25x + 60",
  r(40, 40, 400, 70, C.bleu, 0.12, 3, 12) + t(240, 85, "le bord : P = 4x", C.craie, 26) +
    r(40, 130, 400, 70, C.jaune, 0.12, 3, 12) + t(240, 175, "le bois : B = 30x²", C.craie, 26) +
    r(40, 220, 400, 70, C.rose, 0.12, 3, 12) + t(240, 265, "la facture : F = 25x + 60", C.craie, 26) +
    t(240, 370, `laquelle n'est pas une droite${NB}?`, C.rose, 24));

const cilaos = (() => {
  const R = repereXY(0, 4, 1000, 2600, { gx: 110, gy: 40, gl: 320, gh: 280, px: 0.5, ex: 1, py: 200, ey: 400 });
  return svg("L'altitude d'un randonneur parti de 1 200 m qui monte de 300 m par heure : une droite qui part de 1 200",
    R.fond + l(R.X(0), R.Y(1200), R.X(4), R.Y(2400), C.bleu, 5) + R.point(0, 1200, C.rose, 8) +
      l(R.X(1), R.Y(1500), R.X(2), R.Y(1500), C.jaune, 3, "6 5") + l(R.X(2), R.Y(1500), R.X(2), R.Y(1800), C.jaune, 3, "6 5") +
      t(R.X(2) + 8, R.Y(1650) + 6, "+ 300", C.jaune, 18, "start") + t(R.X(1.5), R.Y(1500) + 24, "1 h", C.jaune, 17) +
      t(R.X(0) + 8, R.Y(2600) + 20, "altitude (m)", C.pale, 17, "start") + t(R.X(4), R.Y(1000) + 46, "heures", C.pale, 17, "end") +
      t(240, 405, `l'altitude après 2 h 30${NB}?`, C.rose, 24));
})();

const bougie = (() => {
  const R = repereXY(0, 6, 0, 24, { gx: 100, gy: 40, gl: 330, gh: 280, px: 1, ex: 1, py: 2, ey: 4 });
  return svg("La hauteur d'une bougie qui brûle : une droite qui part de 20 cm et touche 0 à 5 heures",
    R.fond + l(R.X(0), R.Y(20), R.X(5), R.Y(0), C.jaune, 5) + R.point(0, 20, C.rose, 7) + R.point(5, 0, C.rose, 7) +
      t(R.X(0) + 8, R.Y(24) + 20, "hauteur (cm)", C.pale, 17, "start") + t(R.X(6), R.Y(0) + 46, "heures", C.pale, 17, "end") +
      t(240, 405, `quelle équation${NB}?`, C.rose, 26));
})();

const trottinette = (() => {
  const R = repereXY(0, 40, 0, 10, { gx: 100, gy: 40, gl: 330, gh: 280, px: 5, ex: 10, py: 1, ey: 2 });
  return svg("Le prix d'une trottinette en location : 3,50 € pour 10 minutes, 7,50 € pour 30 minutes",
    R.fond + l(R.X(0), R.Y(1.5), R.X(40), R.Y(9.5), C.bleu, 4) + R.point(10, 3.5) + R.point(30, 7.5) +
      l(R.X(10), R.Y(0), R.X(10), R.Y(3.5), C.rose, 2.5, "6 5") + l(R.X(0), R.Y(3.5), R.X(10), R.Y(3.5), C.rose, 2.5, "6 5") +
      l(R.X(30), R.Y(0), R.X(30), R.Y(7.5), C.rose, 2.5, "6 5") + l(R.X(0), R.Y(7.5), R.X(30), R.Y(7.5), C.rose, 2.5, "6 5") +
      t(R.X(10) + 10, R.Y(3.5) + 26, "3,50 €", C.rose, 18, "start") + t(R.X(30) + 10, R.Y(7.5) + 26, "7,50 €", C.rose, 18, "start") +
      t(R.X(0) + 8, R.Y(10) + 20, "prix (€)", C.pale, 17, "start") + t(R.X(40), R.Y(0) + 46, "minutes", C.pale, 17, "end") +
      t(240, 405, `combien par minute${NB}?`, C.rose, 24));
})();

const chiot = (() => {
  const R = repereXY(0, 60, 0, 8, { gx: 150, gy: 30, gl: 210, gh: 280, px: 10, ex: 10, py: 1, ey: 1 });
  return svg("Le poids d'un chiot : une droite de 1 kg au jour 0 à 7 kg au jour 60, qui semble monter à 45 degrés car les carreaux sont carrés",
    R.fond + l(R.X(0), R.Y(1), R.X(60), R.Y(7), C.jaune, 5) +
      t(R.X(0) - 40, R.Y(8) + 4, "kg", C.pale, 17, "end") + t(R.X(60), R.Y(0) + 46, "jours", C.pale, 17, "end") +
      t(R.X(60) + 8, R.Y(7) + 6, "45° ?", C.craie, 18, "start") + t(240, 410, `le coefficient directeur${NB}?`, C.rose, 24));
})();

const palissade = (() => {
  const R = repereXY(0, 12, 0, 24, { gx: 90, gy: 40, gl: 340, gh: 280, px: 1, ex: 2, py: 2, ey: 4 });
  return svg("Deux poteaux A(1 ; 3) et B(4 ; 9), et un trait vertical à x = 10 où chercher le troisième poteau",
    R.fond + l(R.X(10), R.Y(0), R.X(10), R.Y(24), C.rose, 3, "8 6") + R.point(1, 3, C.bleu, 8) + R.point(4, 9, C.bleu, 8) +
      t(R.X(1) + 12, R.Y(3) - 10, "A(1 ; 3)", C.bleu, 18, "start") + t(R.X(4) + 12, R.Y(9) - 10, "B(4 ; 9)", C.bleu, 18, "start") +
      t(R.X(10) - 10, R.Y(22), "C(10 ; ?)", C.rose, 18, "end") + t(240, 405, `où planter C${NB}?`, C.rose, 26));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_droites",
  titre: "Énigmes des droites et du coefficient directeur",
  description: "Les étagères du menuisier, la randonnée depuis Cilaos, la bougie, la trottinette en location, le piège du chiot et des axes, le défi des poteaux de la palissade : reconnaître une fonction affine, lire et calculer un coefficient directeur, lire une équation réduite.",
  problemes: [
    {
      tag: "Énigme 1 · Le menuisier",
      titre: "Droite ou pas droite ?",
      question: `Un menuisier fabrique des étagères carrées de côté x mètres. Il a trois formules : le bord P = 4x, le prix du bois B = 30x², la facture F = 25x + 60.<br><br><b>Laquelle</b> n'est pas représentée par une droite ?`,
      reponse: `4x est linéaire et 25x + 60 est affine : ce sont des droites.<br>Mais <span class="big">B = 30x²</span> contient x² : sa courbe est une parabole.`,
      consigne: "P = 4x, B = 30x², F = 25x + 60 : laquelle n'est pas représentée par une droite ?",
      verification: { type: "qcm", choix: ["P = 4x", "B = 30x²", "F = 25x + 60"], bonne: 1 },
      dessin: etageres,
    },
    {
      tag: "Énigme 2 · La randonnée",
      titre: "Un point et une pente",
      question: `Une randonneuse part de Cilaos, vers <b>1 200 m</b> d'altitude. Elle monte régulièrement de <b>300 m par heure</b>.<br><br><b>À quelle altitude</b> est-elle après 2 h 30 ?`,
      reponse: `L'altitude est A(t) = 300t + 1 200 : ordonnée à l'origine 1 200, coefficient directeur 300.<br>A(2,5) = 750 + 1 200 = <span class="big">1 950 m</span>.`,
      consigne: "A(t) = 300t + 1 200 : quelle altitude après 2,5 heures ?",
      verification: { type: "courte", attendus: ["1950"], unite: "m" },
      dessin: cilaos,
    },
    {
      tag: "Énigme 3 · La bougie",
      titre: "Lire l'équation réduite",
      question: `La droite donne la hauteur d'une bougie qui brûle, en centimètres, selon le temps en heures.<br><br><b>Quelle est son équation réduite</b> ?`,
      reponse: `Ordonnée à l'origine : 20 (la bougie neuve). Elle perd 20 cm en 5 h : coefficient directeur −20 ÷ 5 = −4.<br>Donc <span class="big">h = −4t + 20</span>.`,
      consigne: "La droite passe par (0 ; 20) et (5 ; 0) : quelle est son équation réduite ?",
      verification: { type: "qcm", choix: ["h = 4t + 20", "h = 20t − 4", "h = −4t + 20"], bonne: 2 },
      dessin: bougie,
    },
    {
      tag: "Énigme 4 · La trottinette",
      titre: "Le coefficient par deux points",
      question: `Une trottinette en location coûte <b>3,50 €</b> pour 10 minutes et <b>7,50 €</b> pour 30 minutes. Le prix est une fonction affine de la durée.<br><br><b>Combien coûte chaque minute</b> ?`,
      reponse: `a = (7,50 − 3,50) ÷ (30 − 10) = 4 ÷ 20 = <span class="big">0,20 €</span> par minute.<br>Et le déblocage : 3,50 − 10 × 0,20 = 1,50 €.`,
      consigne: "3,50 € pour 10 min, 7,50 € pour 30 min : combien d'euros coûte chaque minute ?",
      verification: { type: "courte", attendus: ["0,2", "0,20"], unite: "€" },
      dessin: trottinette,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le chiot qui grandit",
      sorte: "piege",
      question: `La droite donne le poids d'un chiot, de sa naissance au 60e jour. Sur ce quadrillage, elle semble monter « à 45° ».<br><br><b>Quel est son coefficient directeur</b> ?`,
      reponse: `Attention aux graduations : un carreau vaut 10 jours en largeur, mais 1 kg en hauteur !<br>De (0 ; 1) à (60 ; 7) : 6 ÷ 60 = <span class="big">0,1</span>. Le chiot prend 0,1 kg (100 g) par jour.`,
      consigne: "La droite passe par (0 ; 1) et (60 ; 7) : quel est son coefficient directeur ?",
      verification: { type: "qcm", choix: ["0,1", "1", "10"], bonne: 0 },
      dessin: chiot,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les poteaux de la palissade",
      sorte: "defi",
      question: `Pour une palissade bien droite, on a planté deux poteaux en A(1 ; 3) et B(4 ; 9), en mètres.<br><br>Le troisième poteau C est à l'abscisse 10. <b>Quelle doit être son ordonnée</b> pour qu'il soit aligné ?`,
      reponse: `Coefficient directeur de (AB) : (9 − 3) ÷ (4 − 1) = 2. Donc y = 2x + b, et 3 = 2 + b : b = 1.<br>Pour x = 10 : y = 2 × 10 + 1 = <span class="big">21</span>.`,
      consigne: "A(1 ; 3), B(4 ; 9) : quelle ordonnée pour C d'abscisse 10, aligné avec A et B ?",
      verification: { type: "courte", attendus: ["21"] },
      dessin: palissade,
    },
  ],
};

export default problemes;
