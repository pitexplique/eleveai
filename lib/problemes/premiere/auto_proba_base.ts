// Énigmes à projeter — première (sans spé maths), notion auto_proba_base
// (l'appli météo, le distributeur de boissons, la machine à pinces, la playlist
// de maloya (974), piège de la grille 1-2-3-4-5, défi du bocal de billes).
// 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, o, l } from "../dessins-ecole";
import { frac } from "../outils";
import { secteur, dansSecteur } from "../dessins-1re";

const meteo = svg("Trois écrans d'une appli météo : pluie 0,97 ; pluie 1,3 ; pluie 0",
  [["lundi", "0,97", C.bleu], ["mardi", "1,3", C.rose], ["mercredi", "0", C.jaune]].map(([j, v, c], i) =>
    r(30 + i * 145, 90, 130, 170, c, 0.15, 3, 16) + t(95 + i * 145, 130, j, C.craie, 20) +
      t(95 + i * 145, 175, "pluie", C.pale, 18) + t(95 + i * 145, 225, v, c, 34)).join("") +
    t(240, 370, `lequel est impossible${NB}?`, C.rose, 26));

const distributeur = svg("Un distributeur de boissons ; la probabilité qu'il tombe en panne est 0,04",
  r(150, 40, 180, 260, C.bleu, 0.15, 4, 14) + r(175, 65, 130, 150, C.craie, 0.06, 3, 6) +
    [0, 1, 2].map((i) => r(190, 80 + i * 45, 100, 30, C.jaune, 0.35, 2, 6)).join("") +
    r(190, 240, 100, 40, C.craie, 0.1, 3, 6) + t(240, 345, "panne : 0,04", C.rose, 22) +
    t(240, 395, `il marche${NB}?`, C.rose, 26));

const pinces = (() => {
  const parts: [string, number, number, string][] = [["peluche 0,1", 0, 36, C.rose], ["porte-clés 0,25", 36, 126, C.jaune], ["bonbon 0,4", 126, 270, C.bleu], ["rien 0,25", 270, 360, C.pale]];
  let s = "";
  for (const [nom, a0, a1, c] of parts) {
    s += secteur(240, 180, 130, a0, a1, c, 0.3);
    const [x, y] = dansSecteur(240, 180, nom.startsWith("peluche") ? 150 : 72, a0, a1);
    s += t(x, y + 6, nom, C.craie, 16, nom.startsWith("peluche") ? "start" : "middle");
  }
  return svg("Les issues d'une machine à pinces : peluche 0,1, porte-clés 0,25, bonbon 0,4, rien 0,25",
    s + t(240, 370, `gagner quelque chose${NB}?`, C.rose, 26));
})();

const maloya = (() => {
  let s = "";
  for (let i = 0; i < 40; i++) {
    const x = 60 + (i % 10) * 40, y = 70 + Math.floor(i / 10) * 55;
    const m = i % 4 === 1;
    s += o(x, y, 15, m ? C.jaune : C.bleu, m ? 0.6 : 0.2, 3) + o(x, y, 4, C.craie, 1, 1);
  }
  return svg("Une playlist de 40 titres : 10 titres de maloya en jaune, 30 autres en bleu",
    s + t(240, 315, "40 titres, dont 10 de maloya", C.craie, 22) + t(240, 385, `lecture aléatoire${NB}: maloya${NB}?`, C.rose, 24));
})();

const loto = (() => {
  let s = "";
  for (let i = 0; i < 49; i++) {
    const x = 60 + (i % 7) * 46, y = 50 + Math.floor(i / 7) * 40;
    const coche = [1, 2, 3, 4, 5].includes(i + 1);
    s += r(x - 18, y - 16, 36, 32, coche ? C.rose : C.craie, coche ? 0.35 : 0.04, 2, 4) + t(x, y + 7, i + 1, C.craie, 15);
  }
  return svg("Une grille de loto de 49 numéros ; les cases 1, 2, 3, 4 et 5 sont cochées",
    s + t(240, 370, "1-2-3-4-5 : moins de chances ?", C.rose, 22));
})();

const bocal = svg("Un bocal de billes : 3 rouges sur 8 ; on ajoute 4 billes rouges et on a 1 rouge sur 2",
  l(80, 60, 80, 300, C.craie, 4) + l(80, 300, 220, 300, C.craie, 4) + l(220, 300, 220, 60, C.craie, 4) +
    [0, 1, 2, 3, 4, 5, 6, 7].map((i) => o(105 + (i % 4) * 30, 270 - Math.floor(i / 4) * 30, 12, i < 3 ? C.rose : C.bleu, 0.5, 2)).join("") +
    t(150, 200, "…", C.craie, 30) + t(150, 340, "P(rouge) = 3/8", C.craie, 18) +
    t(300, 170, "+ 4 rouges", C.rose, 22) + l(260, 200, 320, 200, C.rose, 4) + l(310, 190, 320, 200, C.rose, 4) + l(310, 210, 320, 200, C.rose, 4) +
    t(360, 250, "P(rouge) = 1/2", C.craie, 22) + t(240, 395, `combien de billes au départ${NB}?`, C.rose, 24));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_proba_base",
  titre: "Énigmes des probabilités : les bases",
  description: "L'appli météo, le distributeur de boissons, la machine à pinces, la playlist de maloya, le piège de la grille 1-2-3-4-5, le défi du bocal de billes : une probabilité entre 0 et 1, l'évènement contraire, la somme des issues, l'équiprobabilité.",
  problemes: [
    {
      tag: "Énigme 1 · L'appli météo",
      titre: "Entre 0 et 1",
      question: `Une appli météo affiche la probabilité qu'il pleuve pour trois jours : <b>0,97</b>, <b>1,3</b> et <b>0</b>.<br><br><b>Laquelle</b> est forcément une erreur ?`,
      reponse: `Une probabilité est toujours comprise entre 0 (impossible) et 1 (certain).<br><span class="big">1,3</span> est impossible. 0,97 veut dire « presque sûr », 0 veut dire « aucun risque ».`,
      consigne: "Pluie : 0,97 ; 1,3 ; 0. Laquelle ne peut pas être une probabilité ?",
      verification: { type: "qcm", choix: ["0,97", "1,3", "0"], bonne: 1 },
      dessin: meteo,
    },
    {
      tag: "Énigme 2 · Le distributeur",
      titre: "L'évènement contraire",
      question: `Un distributeur de boissons tombe en panne avec une probabilité de <b>0,04</b> à chaque utilisation.<br><br><b>Quelle est la probabilité</b> qu'il fonctionne ?`,
      reponse: `« Il fonctionne » est le contraire de « il tombe en panne ».<br>P = 1 − 0,04 = <span class="big">0,96</span>.`,
      consigne: "La probabilité de panne est 0,04 : quelle est la probabilité qu'il fonctionne ?",
      verification: { type: "courte", attendus: ["0,96"] },
      dessin: distributeur,
    },
    {
      tag: "Énigme 3 · La machine à pinces",
      titre: "Additionner les issues",
      question: `Une machine à pinces donne une peluche (0,1), un porte-clés (0,25), un bonbon (0,4) ou rien (0,25).<br><br><b>Quelle est la probabilité</b> de gagner quelque chose ?`,
      reponse: `On ajoute les issues gagnantes : 0,1 + 0,25 + 0,4 = <span class="big">0,75</span>.<br>Plus vite : 1 − 0,25 = 0,75.`,
      consigne: "Peluche 0,1, porte-clés 0,25, bonbon 0,4, rien 0,25 : probabilité de gagner quelque chose ?",
      verification: { type: "qcm", choix: ["0,75", "0,25", "0,35"], bonne: 0 },
      dessin: pinces,
    },
    {
      tag: "Énigme 4 · La playlist",
      titre: "Des cas tous égaux",
      question: `Une playlist compte <b>40</b> titres, dont <b>10</b> de maloya. On lance la lecture aléatoire.<br><br><b>Quelle est la probabilité</b> que le premier titre soit un maloya ?`,
      reponse: `Chaque titre a la même chance : P = ${frac(10, 40)} = ${frac(1, 4)} = <span class="big">0,25</span>.`,
      consigne: "10 maloyas sur 40 titres, au hasard : probabilité de tomber sur un maloya ?",
      verification: { type: "courte", attendus: ["0,25", "1/4"] },
      dessin: maloya,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La grille 1-2-3-4-5",
      sorte: "piege",
      question: `Au loto, on coche 5 numéros parmi 49. Léa coche 1, 2, 3, 4, 5. Son oncle lui dit : « Tu n'as aucune chance, ça ne sort jamais ! »<br><br>Sa grille a-t-elle <b>moins de chances</b> qu'une autre ?`,
      reponse: `Chaque grille de 5 numéros a exactement la même probabilité de sortir.<br>1-2-3-4-5 est <span class="big">aussi probable</span> que 7-18-23-31-44. Elle nous paraît « rare » parce qu'elle a l'air rangée.`,
      consigne: "Au loto, la grille 1-2-3-4-5 a-t-elle moins de chances qu'une autre grille ?",
      verification: { type: "qcm", choix: ["Oui, moins de chances", "Non, plus de chances", "Non, autant de chances"], bonne: 2 },
      dessin: loto,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le bocal de billes",
      sorte: "defi",
      question: `Dans un bocal, la probabilité de tirer une bille rouge est ${frac(3, 8)}. On ajoute <b>4</b> billes rouges : la probabilité devient ${frac(1, 2)}.<br><br><b>Combien de billes</b> y avait-il au départ ?`,
      reponse: `Avec n billes : ${frac("3n", 8)} rouges. Après : ${frac("3n", 8)} + 4 = ${frac("n + 4", 2)}, donc 3n + 32 = 4n + 16.<br><span class="big">n = 16</span> : 6 rouges sur 16, puis 10 rouges sur 20.`,
      consigne: "P(rouge) = 3/8 ; avec 4 rouges de plus, P(rouge) = 1/2 : combien de billes au départ ?",
      verification: { type: "courte", attendus: ["16"], unite: "billes" },
      dessin: bocal,
    },
  ],
};

export default problemes;
