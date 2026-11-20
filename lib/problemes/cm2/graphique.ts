// Énigmes à projeter — CM2, notion graphique (le diagramme des fruits préférés :
// lire une barre, le total ; la courbe de température ; le diagramme circulaire
// des trajets ; le piège de l'axe qui ne part pas de 0 ; le défi des 6 votes en
// plus). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";

// Barres : 1 élève = 25 px, base y = 330.
const FRUITS: [string, number, string][] = [["🍎", 8, C.rose], ["🍌", 5, C.jaune], ["🥭", 7, C.jaune], ["🍓", 10, C.rose]];
const barres = (titre: string) => {
  let s = l(70, 330, 450, 330, C.craie, 3) + l(70, 330, 70, 60, C.craie, 3);
  for (let v = 2; v <= 10; v += 2) s += l(70, 330 - v * 25, 450, 330 - v * 25, C.pale, 1, "4 6") + t(60, 337 - v * 25, v, C.pale, 18, "end");
  FRUITS.forEach(([e, v, c], i) => (s += r(100 + i * 90, 330 - v * 25, 60, v * 25, c, 0.35, 3) + t(130 + i * 90, 365, e, C.craie, 30)));
  return svg("Un diagramme en barres des fruits préférés : pomme 8, banane 5, mangue 7, fraise 10", s + t(240, 40, "fruit préféré (nombre d'élèves)", C.craie, 20) + t(240, 405, titre, C.rose, 22));
};

// La courbe : 8 h → 16 h (40 px par heure), 0 → 30 °C (8 px par degré).
const TEMP: [number, number][] = [[8, 12], [10, 16], [12, 22], [14, 25], [16, 21]];
const X = (h: number) => 80 + (h - 8) * 40, Y = (d: number) => 330 - d * 8;
const courbe = () => {
  let s = l(80, 330, 420, 330, C.craie, 3) + l(80, 330, 80, 70, C.craie, 3);
  for (let d = 5; d <= 30; d += 5) s += l(80, Y(d), 420, Y(d), C.pale, 1, "4 6") + t(70, Y(d) + 7, d, C.pale, 18, "end");
  TEMP.forEach(([h]) => (s += t(X(h), 360, `${h} h`, C.craie, 18)));
  s += p("M" + TEMP.map(([h, d]) => `${X(h)} ${Y(d)}`).join(" L"), C.rose, 4) + TEMP.map(([h, d]) => o(X(h), Y(d), 6, C.rose, 1, 2)).join("");
  return svg("Une courbe de température : 12 °C à 8 h, 16 °C à 10 h, 22 °C à 12 h, 25 °C à 14 h, 21 °C à 16 h", s + t(90, 55, "°C", C.pale, 20, "start") + t(240, 400, `l'heure la plus chaude${NB}?`, C.rose, 22));
};

const camembert = svg(
  "Un diagramme circulaire : la moitié des 40 élèves vient à vélo, un quart en bus, un quart à pied",
  `<path d="M200 70 A130 130 0 0 1 200 330 Z" fill="${C.jaune}" fill-opacity=".45" stroke="${C.craie}" stroke-width="3"/>` +
    `<path d="M200 200 L200 330 A130 130 0 0 1 70 200 Z" fill="${C.bleu}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3"/>` +
    `<path d="M200 200 L70 200 A130 130 0 0 1 200 70 Z" fill="${C.rose}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3"/>` +
    t(265, 210, "🚲", C.craie, 40) + t(150, 270, "🚌", C.craie, 32) + t(150, 160, "🚶", C.craie, 32) +
    t(350, 120, "40 élèves", C.craie, 22, "start") + t(350, 300, `à vélo${NB}?`, C.rose, 24, "start")
);

// L'axe trompeur : il part de 97 (40 px par vente).
const trompeur = () => {
  let s = l(90, 330, 400, 330, C.craie, 3) + l(90, 330, 90, 70, C.craie, 3);
  for (let v = 97; v <= 103; v++) s += l(84, 330 - (v - 97) * 40, 96, 330 - (v - 97) * 40, C.craie, 2) + t(78, 337 - (v - 97) * 40, v, C.pale, 18, "end");
  s += r(140, 330 - 40, 80, 40, C.bleu, 0.35, 3) + t(180, 360, "magasin A", C.craie, 18) + r(270, 330 - 200, 80, 200, C.jaune, 0.35, 3) + t(310, 360, "magasin B", C.craie, 18);
  return svg("Un diagramme des ventes : magasin A 98, magasin B 102, l'axe commence à 97", s + t(240, 50, "vélos vendus", C.craie, 22) + t(240, 400, `«${NB}B vend 5 fois plus${NB}!${NB}»`, C.rose, 22));
};

const problemes: ProblemesNotion = {
  classe: "cm2",
  notionId: "graphique",
  titre: "Énigmes sur les graphiques et diagrammes",
  description: "Le diagramme des fruits préférés (une barre, le total), la courbe de température, le diagramme circulaire des trajets, le piège de l'axe trompeur, le défi des votes en plus.",
  problemes: [
    {
      tag: "Énigme 1 · Le sondage de la classe",
      titre: "La mangue",
      question: `Chaque élève a choisi son fruit préféré.<br><br><b>Combien d'élèves</b> préfèrent la mangue 🥭 ?`,
      reponse: `On suit le haut de la barre de la mangue jusqu'à l'axe.<br>Elle s'arrête entre 6 et 8, au milieu : <span class="big">7 élèves</span>.`,
      consigne: "Combien d'élèves préfèrent la mangue ?",
      verification: { type: "courte", attendus: ["7"], unite: "élèves" },
      dessin: barres(`la mangue${NB}?`),
    },
    {
      tag: "Énigme 2 · Le sondage de la classe",
      titre: "Combien ont répondu ?",
      question: `Chaque élève a voté <b>une seule fois</b>.<br><br><b>Combien d'élèves</b> ont répondu au sondage ?`,
      reponse: `On lit les quatre barres : 8, 5, 7 et 10.<br>8 + 5 + 7 + 10 = <span class="big">30 élèves</span>.`,
      consigne: "Combien d'élèves ont répondu ?",
      verification: { type: "courte", attendus: ["30"], unite: "élèves" },
      dessin: barres(`en tout${NB}?`),
    },
    {
      tag: "Énigme 3 · La météo",
      titre: "La courbe de température",
      question: `La courbe montre la température pendant la journée.<br><br><b>À quelle heure</b> fait-il le plus chaud ?`,
      reponse: `Le point le plus haut de la courbe est à 14 h : 25 °C.<br>Il fait le plus chaud à <span class="big">14 h</span>.`,
      consigne: "À quelle heure fait-il le plus chaud ?",
      verification: { type: "qcm", choix: ["12 h", "16 h", "14 h"], bonne: 2 },
      dessin: courbe(),
    },
    {
      tag: "Énigme 4 · Le chemin de l'école",
      titre: "Le diagramme circulaire",
      question: `<b>40 élèves</b> disent comment ils viennent à l'école.<br>La part jaune, c'est le vélo.<br><br><b>Combien</b> viennent à vélo ?`,
      reponse: `La part jaune est la moitié du disque.<br>La moitié de 40 : <span class="big">20 élèves</span>.`,
      consigne: "Combien d'élèves viennent à vélo ?",
      verification: { type: "courte", attendus: ["20"], unite: "élèves" },
      dessin: camembert,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "L'axe trompeur",
      sorte: "piege",
      question: `Le magasin A a vendu <b>98 vélos</b>, le magasin B <b>102</b>.<br>La barre de B est 5 fois plus haute.<br>Alex dit : « B vend 5 fois plus ! »<br><br><b>A-t-il raison</b> ?`,
      reponse: `Regarde l'axe : il commence à 97, pas à 0 !<br>102 − 98 = 4. B vend seulement <span class="big">4 vélos de plus</span>.`,
      consigne: "Le magasin B vend-il 5 fois plus que le magasin A ?",
      verification: { type: "qcm", choix: ["Oui, sa barre est 5 fois plus haute", "Non, seulement 4 vélos de plus", "On ne peut rien lire"], bonne: 1 },
      dessin: trompeur(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les nouveaux votes",
      sorte: "defi",
      question: `6 élèves d'une autre classe votent aussi.<br>Ils choisissent <b>tous la banane</b> 🍌.<br><br><b>Quel fruit</b> devient alors le préféré ?`,
      reponse: `La banane avait 5 votes : 5 + 6 = 11.<br>La fraise reste à 10.<br>11 est plus que 10 : <span class="big">la banane</span> devient le fruit préféré.`,
      consigne: "Quel fruit devient le préféré ?",
      verification: { type: "qcm", choix: ["La fraise", "La banane", "Égalité entre les deux"], bonne: 1 },
      dessin: barres(`+ 6 votes pour 🍌${NB}?`),
    },
  ],
};

export default problemes;
