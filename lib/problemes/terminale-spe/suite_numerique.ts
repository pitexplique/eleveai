// Énigmes à projeter — terminale spé maths, notion suite_numerique
// (la levure du brasseur, les flamants roses de la lagune, la jeune start-up,
// la citerne de pluie, piège de la location de paddle, défi du médicament). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, l, r, fleche } from "../dessins-ecole";
import { tableau } from "../dessins-2de";
import { repereXY } from "../dessins-1re";
import { ind } from "../dessins-tle";

const levure = svg("Tableau : u0 = 2, u1 = 5, u2 = 14, u3 inconnu ; on passe d'un terme au suivant en multipliant par 3 puis en retirant 1",
  t(240, 60, `${ind("u", "n+1", " = 3")}${ind("u", "n", " − 1")}`, C.bleu, 28) +
    tableau(40, 110, [100, 85, 85, 85, 85], 64, [["n", 0, 1, 2, 3], [ind("u", "n"), 2, 5, 14, "?"]], (i, j) => (i === 1 && j === 4 ? C.rose : j === 0 ? C.pale : C.craie), 26) +
    t(240, 300, "en millions de levures", C.pale, 20) + t(240, 380, `${ind("u", 3)}${NB}?`, C.rose, 28));

const flamants = svg("Flamants roses : 1 000, puis 1 020, puis 1 040,4 ; chaque année on multiplie par 1,02",
  r(20, 150, 120, 60, C.craie, 0.08, 3, 8) + t(80, 190, "1 000", C.craie, 26) +
    r(180, 150, 120, 60, C.craie, 0.08, 3, 8) + t(240, 190, "1 020", C.craie, 26) +
    r(340, 150, 120, 60, C.craie, 0.08, 3, 8) + t(400, 190, "1 040,4", C.craie, 24) +
    fleche(110, 120, 210, 120, C.bleu, 3) + fleche(270, 120, 370, 120, C.bleu, 3) + t(160, 105, "× 1,02", C.bleu, 20) + t(320, 105, "× 1,02", C.bleu, 20) +
    t(240, 290, `${ind("u", "n+1", ` = 1,02 ×${NB}`)}${ind("u", "n")}`, C.bleu, 28) + t(240, 380, `quelle sorte de suite${NB}?`, C.rose, 24));

const startup = (() => {
  const R = repereXY(0, 7, -10, 8, { gx: 80, gy: 50, gl: 340, gh: 270, px: 1, py: 2, ex: 1, ey: 4 });
  const v = [0, -5, -8, -9, -8, -5, 0, 7];
  return svg("Nuage de points de la suite u(n) = n² − 6n pour n de 0 à 7 : 0, −5, −8, −9, −8, −5, 0, 7",
    R.fond + v.map((y, n) => R.point(n, y, C.bleu, 7)).join("") +
      t(R.X(0) + 12, 40, `${ind("u", "n", " = n² − 6n")}`, C.bleu, 22, "start") +
      t(240, 405, `croissante à partir de n = ${NB}?`, C.rose, 22));
})();

const citerne = (() => {
  const R = repereXY(0, 10, 0, 3.5, { gx: 80, gy: 50, gl: 340, gh: 270, px: 1, py: 0.5, ex: 2, ey: 1 });
  let s = R.fond + l(R.X(0), R.Y(3), R.X(10), R.Y(3), C.rose, 3, "8 6");
  for (let n = 0; n <= 10; n++) s += R.point(n, 3 - 1 / (n + 1), C.bleu, 6);
  return svg("Hauteur d'eau d'une citerne h(n) = 3 − 1 ÷ (n + 1) : les points montent vers la droite y = 3 sans l'atteindre",
    s + t(R.X(0) + 12, 40, `${ind("h", "n", " = 3 − 1 ÷ (n + 1)")}`, C.bleu, 22, "start") +
      t(240, 405, `majorée ou minorée${NB}?`, C.rose, 22));
})();

const paddle = svg("Tableau : u0 = 3, u1 = 5, u2 = 7, u3 = 9 ; Tom écrit u(n+1) = 2n + 4",
  t(240, 60, `${ind("u", "n", " = 2n + 3")}`, C.bleu, 30) +
    tableau(40, 100, [100, 85, 85, 85, 85], 64, [["n", 0, 1, 2, 3], [ind("u", "n"), 3, 5, 7, 9]], (i, j) => (j === 0 ? C.pale : C.craie), 26) +
    t(240, 290, `Tom${NB}: « ${ind("u", "n+1", " = 2n + 4")} »`, C.jaune, 24) + t(240, 380, `${ind("u", "n+1", " = ")}${NB}?`, C.rose, 28));

const medicament = (() => {
  const R = repereXY(0, 6, 0, 5, { gx: 80, gy: 50, gl: 340, gh: 270, px: 1, py: 1, ex: 1, ey: 1 });
  let s = R.fond + l(R.X(0), R.Y(4), R.X(6), R.Y(4), C.rose, 3, "8 6");
  let u = 0;
  for (let n = 0; n <= 6; n++) { s += R.point(n, u, C.bleu, 7); u = 0.5 * u + 2; }
  return svg("Quantité de médicament u(n) : 0, 2, 3, 3,5, 3,75… les points montent vers une droite en pointillés",
    s + t(R.X(0) + 12, 40, `${ind("u", "n+1", " = 0,5")}${ind("u", "n", " + 2")}`, C.bleu, 22, "start") + t(R.X(0.5), R.Y(4) - 10, "?", C.rose, 24) +
      t(240, 405, `quel plafond${NB}?`, C.rose, 24));
})();

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "suite_numerique",
  titre: "Énigmes des suites numériques",
  description: "La levure du brasseur, les flamants roses de la lagune, la jeune start-up, la citerne de pluie, le piège de la location de paddle, le défi du médicament : premiers termes, type de suite, variations, suite majorée, récurrence.",
  problemes: [
    {
      tag: "Énigme 1 · La levure du brasseur",
      titre: "Les premiers termes",
      question: `Un brasseur a 2 millions de levures. Chaque heure, leur nombre triple, puis il en retire 1 million : u<sub>0</sub> = 2 et u<sub>n+1</sub> = 3u<sub>n</sub> − 1.<br><br><b>Combien de millions</b> de levures après 3 heures ?`,
      reponse: `u<sub>1</sub> = 3 × 2 − 1 = 5, u<sub>2</sub> = 3 × 5 − 1 = 14, u<sub>3</sub> = 3 × 14 − 1 = 41.<br>Il y a <span class="big">41 millions</span> de levures.`,
      consigne: "u(0) = 2 et u(n + 1) = 3u(n) − 1 : combien vaut u(3) ?",
      verification: { type: "courte", attendus: ["41"], unite: "millions" },
      dessin: levure,
    },
    {
      tag: "Énigme 2 · Les flamants roses de la lagune",
      titre: "Reconnaître une suite",
      question: `Une lagune compte 1 000 flamants roses. Leur nombre augmente de 2 % par an : u<sub>n+1</sub> = 1,02 × u<sub>n</sub>.<br><br><b>Quelle sorte de suite</b> est (u<sub>n</sub>) ?`,
      reponse: `On passe d'un terme au suivant en <b>multipliant</b> toujours par le même nombre.<br>(u<sub>n</sub>) est <span class="big">géométrique de raison 1,02</span>.`,
      consigne: "u(n + 1) = 1,02 × u(n) : quelle sorte de suite ?",
      verification: { type: "qcm", choix: ["Arithmétique de raison 1,02", "Géométrique de raison 1,02", "Ni arithmétique ni géométrique"], bonne: 1 },
      dessin: flamants,
    },
    {
      tag: "Énigme 3 · La jeune start-up",
      titre: "Les variations",
      question: `Le résultat d'une jeune start-up, en k€, au mois n, est u<sub>n</sub> = n² − 6n.<br><br><b>À partir de quel rang</b> n la suite est-elle croissante ?`,
      reponse: `u<sub>n+1</sub> − u<sub>n</sub> = (n + 1)² − 6(n + 1) − n² + 6n = 2n − 5.<br>2n − 5 ≥ 0 dès que n ≥ 2,5 : la suite croît à partir de <span class="big">n = 3</span> (u<sub>3</sub> = −9, puis −8, −5…).`,
      consigne: "u(n) = n² − 6n : à partir de quel rang n la suite est-elle croissante ?",
      verification: { type: "courte", attendus: ["3", "n = 3", "n=3"] },
      dessin: startup,
    },
    {
      tag: "Énigme 4 · La citerne de pluie",
      titre: "Une suite majorée",
      question: `La hauteur d'eau d'une citerne, en m, au jour n, est h<sub>n</sub> = 3 − 1 ÷ (n + 1).<br><br><b>Que peut-on dire</b> de la suite (h<sub>n</sub>) ?`,
      reponse: `1 ÷ (n + 1) > 0, donc h<sub>n</sub> &lt; 3 pour tout n.<br>La suite est <span class="big">majorée par 3</span> : l'eau monte vers 3 m sans jamais les atteindre.`,
      consigne: "h(n) = 3 − 1 ÷ (n + 1) : que peut-on dire de la suite ?",
      verification: { type: "qcm", choix: ["Elle est majorée par 3", "Elle est minorée par 3", "Elle n'est ni majorée ni minorée"], bonne: 0 },
      dessin: citerne,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La location de paddle",
      sorte: "piege",
      question: `Louer un paddle coûte u<sub>n</sub> = 2n + 3 euros pour n heures.<br>Tom écrit : « u<sub>n+1</sub> = 2n + 3 + 1 = 2n + 4. »<br><br><b>Que vaut</b> u<sub>n+1</sub> ?`,
      reponse: `On remplace n par n + 1 <b>partout</b> : u<sub>n+1</sub> = 2(n + 1) + 3.<br>u<sub>n+1</sub> = <span class="big">2n + 5</span>. Le tableau le confirme : de 7 à 9, on ajoute 2.`,
      consigne: "u(n) = 2n + 3 : que vaut u(n + 1) ?",
      verification: { type: "qcm", choix: ["2n + 4", "2n + 6", "2n + 5"], bonne: 2 },
      dessin: paddle,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le médicament",
      sorte: "defi",
      question: `Chaque jour, le corps élimine la moitié d'un médicament, puis on en reprend 2 mg : u<sub>0</sub> = 0 et u<sub>n+1</sub> = 0,5u<sub>n</sub> + 2.<br><br><b>Quel nombre</b> la quantité ne dépasse-t-elle jamais ? Montre-le par récurrence.`,
      reponse: `u<sub>0</sub> = 0 ≤ 4. Si u<sub>n</sub> ≤ 4, alors 0,5u<sub>n</sub> + 2 ≤ 0,5 × 4 + 2 = 4 : u<sub>n+1</sub> ≤ 4.<br>Par récurrence, u<sub>n</sub> ≤ <span class="big">4 mg</span> pour tout n.`,
      consigne: "u(0) = 0 et u(n + 1) = 0,5u(n) + 2 : quel nombre la suite ne dépasse-t-elle jamais ?",
      verification: { type: "courte", attendus: ["4"], unite: "mg" },
      dessin: medicament,
    },
  ],
};

export default problemes;
