// Énigmes à projeter — 3e, notion fonction_generalite (image par une
// formule, antécédents dans un tableau, le ballon lancé en l'air, le dé
// géant, piège image / antécédent, défi des poignées de main). 21/11/2026.
// ⛔ Ne reprend pas la 4e (lapins, robot, congélateur, bougie, ressort).
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

// La machine f : x ↦ x² − 3.
const machine = svg(
  "Une machine : on entre 4, la fonction f calcule x au carré moins 3",
  r(150, 130, 180, 140, C.bleu, 0.15, 4, 16) + t(240, 195, "f", C.bleu, 40) + t(240, 240, "x ↦ x² − 3", C.craie, 22) +
    p("M60 200 L140 200 M125 188 L140 200 L125 212", C.craie, 4) + t(80, 180, "4", C.craie, 34) +
    p("M340 200 L420 200 M405 188 L420 200 L405 212", C.rose, 4) + t(440, 210, "?", C.rose, 40)
);

// Le tableau de valeurs de f.
const tableau = () => {
  const xs = [-2, -1, 0, 1, 2, 3], fs = [5, 2, 1, 2, 5, 10];
  let s = r(30, 150, 420, 120, C.craie, 0, 3) + l(30, 210, 450, 210, C.craie, 3) + l(100, 150, 100, 270, C.craie, 3);
  s += t(65, 192, "x", C.craie, 24) + t(65, 252, "f(x)", C.craie, 20);
  xs.forEach((x, k) => { s += t(130 + 57 * k, 192, String(x).replace("-", "−"), C.craie, 24) + t(130 + 57 * k, 252, fs[k], C.bleu, 24) + (k ? l(101 + 57 * k, 150, 101 + 57 * k, 270, C.pale, 1.5) : ""); });
  return svg("Un tableau de valeurs de la fonction f pour x de moins 2 à 3", s + t(240, 350, `antécédents de 5${NB}?`, C.rose, 28));
};

// Le ballon : h(t) = −5t² + 20t, t de 0 à 4 s. 1 s = 80 px, 1 m = 13 px.
const ballon = () => {
  const X = (s: number) => 70 + 80 * s, Y = (h: number) => 360 - 13 * h;
  let d = "";
  for (let k = 0; k <= 40; k++) { const s = k / 10; d += `${k ? "L" : "M"}${X(s).toFixed(1)} ${Y(-5 * s * s + 20 * s).toFixed(1)} `; }
  let g = l(70, 360, 420, 360, C.craie, 3) + l(70, 360, 70, 60, C.craie, 3);
  for (let s = 1; s <= 4; s++) g += l(X(s), 354, X(s), 366, C.craie, 2) + t(X(s), 388, s, C.pale, 18);
  for (const h of [5, 10, 15, 20]) g += l(64, Y(h), 76, Y(h), C.craie, 2) + t(56, Y(h) + 6, h, C.pale, 18, "end");
  return svg("La courbe de la hauteur d'un ballon en fonction du temps : il monte à 20 m en 2 secondes puis retombe",
    g + p(d, C.bleu, 4) + `<circle cx="${X(2)}" cy="${Y(20)}" r="10" fill="${C.jaune}"/>` +
      t(420, 412, "temps (s)", C.pale, 16, "end") + t(80, 50, "hauteur (m)", C.pale, 16, "start") + t(380, 120, `retombe${NB}?`, C.rose, 24));
};

// Le dé géant : un cube en perspective.
const de = svg(
  "Un dé géant en carton en forme de cube d'arête a",
  p("M120 160 L280 160 L280 320 L120 320 Z", C.craie, 4, 0.06) + p("M120 160 L180 110 L340 110 L280 160 M340 110 L340 270 L280 320", C.craie, 4) +
    `<circle cx="160" cy="200" r="10" fill="${C.rose}"/><circle cx="200" cy="240" r="10" fill="${C.rose}"/><circle cx="240" cy="280" r="10" fill="${C.rose}"/>` +
    t(200, 355, "a", C.craie, 26) + t(400, 200, "V = a³", C.bleu, 28) + t(400, 250, "64 dm³", C.craie, 24) + t(400, 290, `a${NB}?`, C.rose, 28)
);

const piege = svg(
  "Au tableau : f de 3 égale 7, et trois phrases à trier",
  t(240, 170, "f(3) = 7", C.bleu, 64) + t(150, 260, "3 → ?", C.craie, 24).replace(" ?", `${NB}?`) + t(330, 260, "7 → ?", C.craie, 24).replace(" ?", `${NB}?`) +
    t(240, 340, "image ou antécédent", C.rose, 26)
);

// Les poignées de main : 6 points sur un cercle, tous reliés (15 segments).
const poignees = () => {
  const P = [...Array(6)].map((_, k) => [240 + 120 * Math.cos((Math.PI * 2 * k) / 6 - Math.PI / 2), 200 + 120 * Math.sin((Math.PI * 2 * k) / 6 - Math.PI / 2)]);
  let s = "";
  for (let i = 0; i < 6; i++) for (let j = i + 1; j < 6; j++) s += l(+P[i][0].toFixed(1), +P[i][1].toFixed(1), +P[j][0].toFixed(1), +P[j][1].toFixed(1), C.pale, 2);
  for (const [x, y] of P) s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="13" fill="${C.jaune}"/>`;
  return svg("Six personnes sur un cercle, chacune reliée à toutes les autres : 15 poignées de main", s + t(240, 375, "6 personnes : 15 poignées", C.craie, 22) + t(240, 410, `190 poignées${NB}: combien de personnes${NB}?`, C.rose, 20));
};

const problemes: ProblemesNotion = {
  classe: "3e",
  notionId: "fonction_generalite",
  titre: "Énigmes des fonctions",
  description: "La machine à calculer, le tableau de valeurs, le ballon lancé en l'air, le dé géant, le piège image ou antécédent, le défi des poignées de main : calculer une image, chercher un antécédent, lire une courbe.",
  problemes: [
    {
      tag: "Énigme 1 · Une image",
      titre: "La machine f",
      question: `La fonction f est définie par <b>f(x) = x² − 3</b>.<br><br><b>Quelle est l'image</b> de 4 par f ?`,
      reponse: `On remplace x par 4 : f(4) = 4² − 3 = 16 − 3 = <span class="big">13</span>.<br>L'image de 4 par f est 13.`,
      consigne: "Quelle est l'image de 4 par f(x) = x² − 3 ?",
      verification: {"type":"courte","attendus":["13"]},
      dessin: machine,
    },
    {
      tag: "Énigme 2 · Des antécédents",
      titre: "Le tableau de valeurs",
      question: `Voici un tableau de valeurs de la fonction f.<br><br><b>Quels sont</b> les antécédents de 5 par f dans ce tableau ?`,
      reponse: `On cherche 5 dans la ligne <b>f(x)</b>, puis on lit x au-dessus.<br>f(−2) = 5 et f(2) = 5 : les antécédents de 5 sont <span class="big">−2 et 2</span>.<br>Un nombre peut avoir plusieurs antécédents, mais une seule image.`,
      consigne: "Quels sont les antécédents de 5 dans le tableau ?",
      verification: {"type":"qcm","choix":["−2 et 2","10","2 seulement"],"bonne":0},
      dessin: tableau(),
    },
    {
      tag: "Énigme 3 · Le ballon",
      titre: "Il monte, il retombe",
      question: `Un ballon est lancé vers le haut. Sa hauteur, en mètres, après t secondes, vaut <b>h(t) = −5t² + 20t</b>.<br><br><b>Au bout de combien de secondes</b> retombe-t-il au sol ?`,
      reponse: `Au sol, la hauteur vaut 0 : −5t² + 20t = 0, soit 5t(4 − t) = 0.<br>t = 0 (le départ) ou t = <span class="big">4 secondes</span>.<br>Sur la courbe : il monte à 20 m en 2 s, puis redescend.`,
      consigne: "Au bout de combien de secondes le ballon retombe-t-il ?",
      verification: {"type":"courte","attendus":["4"],"unite":"s"},
      dessin: ballon(),
    },
    {
      tag: "Énigme 4 · Le dé géant",
      titre: "Le cube de 64 dm³",
      question: `Le volume d'un cube d'arête a vaut <b>V(a) = a³</b>.<br>Pour la kermesse, on fabrique un dé géant de <b>64 dm³</b>.<br><br><b>Quelle est son arête</b> ? (C'est un antécédent de 64 par V.)`,
      reponse: `On cherche a tel que a³ = 64. Or 4 × 4 × 4 = 64.<br>L'arête mesure <span class="big">4 dm</span>, soit 40 cm.`,
      consigne: "Quelle est l'arête du dé de 64 dm³ ?",
      verification: {"type":"courte","attendus":["4"],"unite":"dm"},
      dessin: de,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Image ou antécédent ?",
      sorte: "piege",
      question: `On sait que <b>f(3) = 7</b>.<br><br><b>Quelle phrase est juste</b> ?<br>A. L'image de 7 est 3. B. 3 est un antécédent de 7. C. 7 est un antécédent de 3.`,
      reponse: `On part de x = 3 et la fonction donne 7 : <b>7 est l'image de 3</b>.<br>À l'envers : <span class="big">3 est un antécédent de 7</span>.<br>Repère : l'antécédent entre dans la machine, l'image en sort.`,
      consigne: "f(3) = 7 : quelle phrase est juste ?",
      verification: {"type":"qcm","choix":["L'image de 7 est 3","3 est un antécédent de 7","7 est un antécédent de 3"],"bonne":1},
      dessin: piege,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les poignées de main",
      sorte: "defi",
      question: `Dans un groupe de n personnes, chacun serre la main de tous les autres une seule fois. Le nombre de poignées de main vaut <b>P(n) = n(n − 1) ÷ 2</b>.<br>À une réunion, on compte <b>190</b> poignées de main.<br><br><b>Combien de personnes</b> y avait-il ?`,
      reponse: `On cherche n tel que n(n − 1) = 380 : deux entiers qui se suivent et dont le produit fait 380.<br>20 × 19 = 380. Il y avait <span class="big">20 personnes</span>.<br>Vérif : P(6) = 6 × 5 ÷ 2 = 15, comme sur le dessin.`,
      consigne: "Combien de personnes pour 190 poignées de main ?",
      verification: {"type":"courte","attendus":["20"],"unite":"personnes"},
      dessin: poignees(),
    },
  ],
};

export default problemes;
