// Énigmes à projeter — terminale spé maths, notion concentration_echantillonnage
// (les flacons de shampoing, le bateau-mouche, les huîtres de l'ostréicultrice,
// le jeu de l'oie de mamie, piège de la roulette du casino, défi du sondage
// sur les endives). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o, ell } from "../dessins-ecole";
import { frac } from "../outils";

const shampoing = svg("Un flacon de shampoing : le volume X d'un flacon a un écart-type de 4 mL ; M est la moyenne de 64 flacons",
  r(200, 80, 80, 140, C.bleu, 0.2, 3, 16) + r(224, 48, 32, 32, C.bleu, 0.35, 3, 4) + t(240, 160, "X", C.bleu, 30) +
    t(240, 270, "σ(X) = 4 mL par flacon", C.craie, 24) + t(240, 310, "M = moyenne de 64 flacons", C.craie, 22) +
    t(240, 385, `σ(M)${NB}?`, C.rose, 28));

const bateau = svg("Un bateau-mouche : le nombre X de passagers d'un tour a une espérance de 200 et une variance de 100",
  r(160, 125, 160, 45, C.jaune, 0.2, 3, 6) + p("M80 170 L400 170 L370 210 L110 210 Z", C.bleu, 3, 0.3) +
    p("M40 230 Q70 215 100 230 T160 230 T220 230 T280 230 T340 230 T400 230 T440 230", C.bleu, 3) +
    t(240, 275, "X = passagers d'un tour", C.craie, 22) + t(240, 315, "E(X) = 200 · V(X) = 100", C.craie, 24) +
    t(240, 385, `P(|X − 200| ≥ 20) ≤${NB}?`, C.rose, 26));

const huitres = svg("Trois huîtres : la masse X d'une huître a une variance de 9 grammes carrés ; M est la masse moyenne de 100 huîtres",
  [140, 240, 340].map((x) => ell(x, 120, 42, 28, C.pale, 0.2, 3) + p(`M${x - 25} 120 Q${x} 105 ${x + 25} 120`, C.pale, 2)).join("") +
    t(240, 210, "V(X) = 9 g² par huître", C.craie, 24) + t(240, 250, "M = moyenne de 100 huîtres", C.craie, 22) +
    t(240, 290, "μ = E(X)", C.pale, 20) + t(240, 380, `P(|M − μ| ≥ 1) ≤${NB}?`, C.rose, 26));

const oie = (() => {
  let d = "";
  for (let x = 66; x <= 442; x += 4) {
    const u = x - 60;
    d += `${x === 66 ? "M" : "L"}${x} ${(220 - 100 * Math.exp(-u / 70) * Math.cos(u / 18)).toFixed(1)} `;
  }
  return svg("La fréquence des 6 en fonction du nombre n de lancers : elle oscille beaucoup au début, puis de moins en moins autour de la droite en pointillés 1/6",
    l(60, 300, 450, 300, C.craie, 3) + l(60, 300, 60, 55, C.craie, 3) + l(60, 220, 445, 220, C.rose, 3, "8 6") +
      p(d.trim(), C.bleu, 4) + t(50, 226, "1/6", C.rose, 18, "end") + t(72, 48, "fréquence des 6", C.pale, 18, "start") +
      t(445, 326, "n lancers", C.pale, 18, "end") + t(240, 390, `quand n grandit${NB}?`, C.rose, 26));
})();

const roulette = svg("Huit cases noires de suite à la roulette ; la roue a 18 cases rouges, 18 noires et un zéro ; Sam dit que le rouge va compenser",
  [65, 115, 165, 215, 265, 315, 365, 415].map((x) => o(x, 90, 20, C.craie, 0.15, 3) + t(x, 98, "N", C.craie, 20)).join("") +
    t(240, 165, "8 noirs de suite", C.craie, 24) + t(240, 205, "18 rouges · 18 noirs · 1 zéro", C.pale, 20) +
    t(240, 265, "Sam : « le rouge va compenser ! »", C.bleu, 22) + t(240, 380, `P(rouge au prochain tour)${NB}?`, C.rose, 24));

const endives = svg("Un sondage par oui ou non sur les endives : p est la proportion inconnue de oui, F la fréquence des oui sur n personnes ; on veut P(|F − p| ≥ 0,05) au plus 0,05",
  r(130, 50, 100, 60, C.bleu, 0.2, 3, 10) + t(180, 90, "oui", C.bleu, 26) + r(250, 50, 100, 60, C.jaune, 0.2, 3, 10) + t(300, 90, "non", C.jaune, 26) +
    t(240, 170, "p = proportion de « oui » (inconnue)", C.craie, 20) + t(240, 210, "F = fréquence sur n personnes", C.craie, 20) +
    t(240, 270, "on veut P(|F − p| ≥ 0,05) ≤ 0,05", C.bleu, 22) + t(240, 380, `n minimal${NB}?`, C.rose, 28));

const problemes: ProblemesNotion = {
  classe: "terminale-spe",
  notionId: "concentration_echantillonnage",
  titre: "Énigmes de la concentration et de la loi des grands nombres",
  description: "Les flacons de shampoing, le bateau-mouche, les huîtres de l'ostréicultrice, le jeu de l'oie de mamie, le piège de la roulette du casino, le défi du sondage sur les endives : moyenne d'un échantillon, inégalité de Bienaymé-Tchebychev, inégalité de concentration, loi des grands nombres, taille d'échantillon.",
  problemes: [
    {
      tag: "Énigme 1 · Les flacons de shampoing",
      titre: "La moyenne d'un échantillon",
      question: `Une machine remplit des flacons de shampoing. Le volume X d'un flacon a un écart-type de 4 mL. M est le volume moyen de 64 flacons (indépendants).<br><br><b>Que vaut l'écart-type σ(M)</b> ?`,
      reponse: `V(M) = ${frac("V(X)", "n")} = ${frac(16, 64)} = 0,25, donc σ(M) = ${frac("σ(X)", "√n")} = ${frac(4, 8)}.<br>σ(M) = <span class="big">0,5 mL</span> : la moyenne de 64 flacons varie 8 fois moins qu'un seul flacon.`,
      consigne: "σ(X) = 4 mL, M = moyenne de 64 flacons : que vaut σ(M) ?",
      verification: { type: "qcm", choix: ["0,5 mL", "0,25 mL", "0,0625 mL"], bonne: 0 },
      dessin: shampoing,
    },
    {
      tag: "Énigme 2 · Le bateau-mouche",
      titre: "L'inégalité de Bienaymé-Tchebychev",
      question: `Le nombre X de passagers d'un tour de bateau-mouche a une espérance de 200 et une variance de 100.<br><br><b>Quel majorant de P(|X − 200| ≥ 20)</b> donne l'inégalité de Bienaymé-Tchebychev ?`,
      reponse: `P(|X − E(X)| ≥ δ) ≤ ${frac("V(X)", "δ²")}, avec δ = 20.<br>P(|X − 200| ≥ 20) ≤ ${frac(100, 400)} = <span class="big">0,25</span> : au moins 3 tours sur 4 ont entre 181 et 219 passagers.`,
      consigne: "E(X) = 200, V(X) = 100 : quel majorant de P(|X − 200| ≥ 20) donne Bienaymé-Tchebychev ?",
      verification: { type: "courte", attendus: ["0,25", "0.25", "1/4", "25%"] },
      dessin: bateau,
    },
    {
      tag: "Énigme 3 · Les huîtres de l'ostréicultrice",
      titre: "L'inégalité de concentration",
      question: `La masse X d'une huître a une espérance μ et une variance de 9 g². Une ostréicultrice pèse 100 huîtres (indépendantes) et calcule leur masse moyenne M.<br><br><b>Quel majorant de P(|M − μ| ≥ 1)</b> donne l'inégalité de concentration ?`,
      reponse: `P(|M − μ| ≥ δ) ≤ ${frac("V(X)", "n δ²")}, avec n = 100 et δ = 1 g.<br>P(|M − μ| ≥ 1) ≤ ${frac(9, "100 × 1²")} = <span class="big">0,09</span> : la moyenne est à moins de 1 g de μ avec une probabilité d'au moins 0,91.`,
      consigne: "V(X) = 9, n = 100 : quel majorant de P(|M − μ| ≥ 1) donne l'inégalité de concentration ?",
      verification: { type: "courte", attendus: ["0,09", "0.09", "9/100", "9%"] },
      dessin: huitres,
    },
    {
      tag: "Énigme 4 · Le jeu de l'oie de mamie",
      titre: "La loi des grands nombres",
      question: `On lance n fois le dé équilibré du jeu de l'oie de mamie. F<sub>n</sub> est la fréquence des 6 obtenus.<br><br><b>Que fait F<sub>n</sub> quand n devient très grand</b> ?`,
      reponse: `La loi des grands nombres : la probabilité que F<sub>n</sub> s'écarte de ${frac(1, 6)} d'au moins δ tend vers 0, pour tout δ > 0.<br>F<sub>n</sub> <span class="big">se rapproche de ${frac(1, 6)}</span>, sans jamais être obligée de valoir ${frac(1, 6)} pile.`,
      consigne: "On lance n fois un dé équilibré. Que fait la fréquence des 6 quand n devient très grand ?",
      verification: { type: "qcm", choix: ["elle vaut 1/6 à chaque instant", "elle se rapproche de 1/6", "elle finit par valoir 0"], bonne: 1 },
      dessin: oie,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La roulette du casino",
      sorte: "piege",
      question: `Une roulette a 37 cases : 18 rouges, 18 noires et un zéro. Le noir vient de sortir 8 fois de suite.<br>Sam : « Le rouge est plus probable au prochain tour : la loi des grands nombres va compenser. »<br><br><b>Quelle est la probabilité du rouge</b> au prochain tour ?`,
      reponse: `Les tours sont indépendants : la roulette n'a pas de mémoire. P(rouge) = <span class="big">${frac(18, 37)}</span>, comme à chaque tour.<br>La loi des grands nombres ne « compense » pas : les 8 noirs pèsent de moins en moins dans la fréquence, noyés dans des milliers de tours.`,
      consigne: "Le noir est sorti 8 fois de suite. Quelle est la probabilité du rouge au prochain tour ?",
      verification: { type: "qcm", choix: ["plus que 18/37", "moins que 18/37", "18/37, comme avant"], bonne: 2 },
      dessin: roulette,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le sondage sur les endives",
      sorte: "defi",
      question: `Un institut demande à n personnes : « Aimez-vous les endives ? ». p est la proportion inconnue de « oui », F la fréquence des « oui » obtenue.<br><br><b>Quel n minimal</b> garantit P(|F − p| ≥ 0,05) ≤ 0,05 par l'inégalité de concentration, quel que soit p ?`,
      reponse: `Chaque réponse suit une loi de Bernoulli : V = p(1 − p) ≤ ${frac(1, 4)}. Donc P(|F − p| ≥ 0,05) ≤ ${frac("p(1 − p)", "n × 0,05²")} ≤ ${frac("0,25", "0,0025 n")} = ${frac(100, "n")}.<br>${frac(100, "n")} ≤ 0,05 ⟺ <span class="big">n ≥ 2 000 personnes</span>.`,
      consigne: "V ≤ 1/4, δ = 0,05 : quel n minimal donne P(|F − p| ≥ 0,05) ≤ 0,05 ?",
      verification: { type: "courte", attendus: ["2000", "2 000"], unite: "personnes" },
      dessin: endives,
    },
  ],
};

export default problemes;
