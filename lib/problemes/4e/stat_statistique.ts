// Énigmes à projeter — 4e, notion stat_statistique (moyenne simple,
// médiane d'une série à ranger, étendue lue sur un diagramme en barres,
// moyenne pondérée d'un tableau, piège de la moyenne de deux moyennes,
// défi de la note manquante). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const S = `stroke="${C.craie}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const NB = " ";

// La météo : 7 cases (largeur 58, pas 64, de x = 16 à x = 458).
const meteo = () => {
  const jours = ["L", "M", "M", "J", "V", "S", "D"];
  const temp = [18, 21, 19, 24, 23, 20, 22];
  let cases = "";
  for (let k = 0; k < 7; k++) {
    const x = 16 + 64 * k;
    cases += `<rect x="${x}" y="150" width="58" height="120" rx="10" ${S}/>`;
    cases += `<text x="${x + 29}" y="188" fill="${C.pale}" font-size="22" text-anchor="middle">${jours[k]}</text>`;
    cases += `<text x="${x + 29}" y="245" fill="${C.craie}" font-size="24" text-anchor="middle">${temp[k]}°</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Les températures à midi pendant une semaine : 18, 21, 19, 24, 23, 20 et 22 degrés">
  <text x="240" y="95" font-size="44" text-anchor="middle">☀️</text>
  ${cases}
  <text x="240" y="340" fill="${C.pale}" font-size="22" text-anchor="middle">températures à midi, en °C</text>
  </svg>`;
};

// Les trajets en bus : 7 tickets, dans l'ordre où Hugo les a notés.
const trajets = () => {
  const t = [25, 12, 30, 18, 40, 15, 22];
  const pos: [number, number][] = [
    [30, 120], [140, 120], [250, 120], [360, 120],
    [85, 220], [195, 220], [305, 220],
  ];
  const tickets = pos
    .map(([x, y], k) =>
      `<rect x="${x}" y="${y}" width="90" height="62" rx="8" stroke="${C.bleu}" stroke-width="3" fill="${C.bleu}" fill-opacity=".12"/>` +
      `<text x="${x + 45}" y="${y + 40}" fill="${C.craie}" font-size="24" text-anchor="middle">${t[k]} min</text>`)
    .join("");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Sept durées de trajet notées dans le désordre : 25, 12, 30, 18, 40, 15 et 22 minutes">
  <text x="240" y="80" font-size="40" text-anchor="middle">🚌</text>
  ${tickets}
  <text x="240" y="345" fill="${C.pale}" font-size="22" text-anchor="middle">7 trajets, notés dans l'ordre des jours</text>
  </svg>`;
};

// Les oiseaux : diagramme en barres EXACT. Axe y0 = 350, 1 oiseau = 16 px.
// Lun 12 (y 158), Mar 8 (y 222), Mer 15 (y 110), Jeu 6 (y 254), Ven 10 (y 190).
const oiseaux = () => {
  const val = [12, 8, 15, 6, 10];
  const jours = ["Lun", "Mar", "Mer", "Jeu", "Ven"];
  let grille = "";
  for (let v = 0; v <= 16; v++) {
    const y = 350 - 16 * v;
    grille += `<path d="M85 ${y} L440 ${y}" stroke="${C.pale}" stroke-width="${v % 2 === 0 ? 1.5 : 0.7}" stroke-opacity="${v % 2 === 0 ? 0.7 : 0.4}"/>`;
    if (v % 2 === 0)
      grille += `<text x="72" y="${y + 7}" fill="${C.pale}" font-size="20" text-anchor="end">${v}</text>`;
  }
  let barres = "";
  for (let k = 0; k < 5; k++) {
    const cx = 125 + 70 * k;
    const h = 16 * val[k];
    barres += `<rect x="${cx - 22}" y="${350 - h}" width="44" height="${h}" fill="${C.bleu}" fill-opacity=".45" stroke="${C.bleu}" stroke-width="3"/>`;
    barres += `<text x="${cx}" y="382" fill="${C.craie}" font-size="20" text-anchor="middle">${jours[k]}</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Diagramme en barres : oiseaux comptés du lundi au vendredi">
  <text x="260" y="45" fill="${C.craie}" font-size="24" text-anchor="middle">🐦 oiseaux comptés</text>
  ${grille}
  <path d="M85 350 L85 82" stroke="${C.craie}" stroke-width="3"/>
  <path d="M85 350 L445 350" stroke="${C.craie}" stroke-width="3"/>
  ${barres}
  </svg>`;
};

// Les fratries : tableau valeur / effectif. Colonne des titres 30 → 200,
// puis 4 colonnes de 62,5.
const fratries = () => {
  const vals = ["0", "1", "2", "3"];
  const eff = ["4", "10", "8", "3"];
  let cells = "";
  for (let k = 0; k < 4; k++) {
    const cx = 200 + 62.5 * k + 31.25;
    cells += `<text x="${cx}" y="155" fill="${C.jaune}" font-size="28" text-anchor="middle">${vals[k]}</text>`;
    cells += `<text x="${cx}" y="227" fill="${C.craie}" font-size="28" text-anchor="middle">${eff[k]}</text>`;
  }
  let traits = "";
  for (let k = 0; k <= 3; k++) {
    const x = 200 + 62.5 * k;
    traits += `<path d="M${x} 110 L${x} 250" stroke="${C.craie}" stroke-width="3"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Tableau : nombre de frères et sœurs et nombre d'élèves">
  <text x="240" y="75" font-size="40" text-anchor="middle">👨‍👩‍👧‍👦</text>
  <rect x="30" y="110" width="420" height="140" rx="6" ${S}/>
  <path d="M30 180 L450 180" stroke="${C.craie}" stroke-width="3"/>
  ${traits}
  <text x="115" y="153" fill="${C.jaune}" font-size="20" text-anchor="middle">frères et sœurs</text>
  <text x="115" y="225" fill="${C.craie}" font-size="20" text-anchor="middle">élèves</text>
  ${cells}
  <text x="240" y="320" fill="${C.pale}" font-size="22" text-anchor="middle">une classe de 4e</text>
  </svg>`;
};

// Les deux groupes : 10 points à gauche, 30 à droite.
const groupes = () => {
  let a = "";
  for (let j = 0; j < 2; j++)
    for (let i = 0; i < 5; i++)
      a += `<circle cx="${60 + 30 * i}" cy="${185 + 30 * j}" r="10" fill="${C.jaune}" fill-opacity=".7"/>`;
  let b = "";
  for (let j = 0; j < 5; j++)
    for (let i = 0; i < 6; i++)
      b += `<circle cx="${280 + 30 * i}" cy="${140 + 30 * j}" r="10" fill="${C.bleu}" fill-opacity=".6"/>`;
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Groupe A : 10 élèves, moyenne 16. Groupe B : 30 élèves, moyenne 8">
  <text x="120" y="75" fill="${C.jaune}" font-size="26" text-anchor="middle">groupe A</text>
  <text x="120" y="105" fill="${C.craie}" font-size="20" text-anchor="middle">10 élèves</text>
  <text x="355" y="75" fill="${C.bleu}" font-size="26" text-anchor="middle">groupe B</text>
  <text x="355" y="105" fill="${C.craie}" font-size="20" text-anchor="middle">30 élèves</text>
  ${a}
  ${b}
  <text x="120" y="315" fill="${C.jaune}" font-size="22" text-anchor="middle">moyenne 16</text>
  <text x="355" y="315" fill="${C.bleu}" font-size="22" text-anchor="middle">moyenne 8</text>
  <text x="240" y="385" fill="${C.rose}" font-size="22" text-anchor="middle">Léo${NB}: «${NB}(16 + 8) ÷ 2 = 12${NB}»</text>
  </svg>`;
};

// Les fléchettes : cible (150, 200), rayons 110, 75, 40 ; les scores à droite.
const flechettes = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une cible de fléchettes et quatre scores : 35, 42, 28, 39, puis une cinquième partie inconnue">
  <circle cx="150" cy="200" r="110" stroke="${C.craie}" stroke-width="4" fill="${C.rose}" fill-opacity=".15"/>
  <circle cx="150" cy="200" r="75" stroke="${C.craie}" stroke-width="4" fill="${C.pale}" fill-opacity=".15"/>
  <circle cx="150" cy="200" r="40" stroke="${C.craie}" stroke-width="4" fill="${C.jaune}" fill-opacity=".35"/>
  <circle cx="150" cy="200" r="8" fill="${C.rose}"/>
  <text x="360" y="95" fill="${C.pale}" font-size="20" text-anchor="middle">parties</text>
  <text x="360" y="135" fill="${C.craie}" font-size="26" text-anchor="middle">1re${NB}: 35</text>
  <text x="360" y="175" fill="${C.craie}" font-size="26" text-anchor="middle">2e${NB}: 42</text>
  <text x="360" y="215" fill="${C.craie}" font-size="26" text-anchor="middle">3e${NB}: 28</text>
  <text x="360" y="255" fill="${C.craie}" font-size="26" text-anchor="middle">4e${NB}: 39</text>
  <text x="360" y="295" fill="${C.rose}" font-size="26" text-anchor="middle">5e${NB}: ?</text>
  <text x="240" y="385" fill="${C.jaune}" font-size="22" text-anchor="middle">🎯 moyenne visée${NB}: 38 points</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "stat_statistique",
  titre: "Énigmes sur les statistiques",
  description: "La météo de la semaine, les trajets en bus, les oiseaux du jardin, les fratries de la classe, le piège des deux groupes, le défi des fléchettes : moyenne, médiane, étendue.",
  problemes: [
    {
      tag: "Énigme 1 · La météo",
      titre: "La semaine au soleil",
      question: `Chaque midi, Anaïs relève la température.<br>Sur une semaine, elle note : 18, 21, 19, 24, 23, 20 et 22 °C.<br><br>Quelle est la <b>température moyenne</b> de la semaine ?`,
      reponse: `On additionne : 18 + 21 + 19 + 24 + 23 + 20 + 22 = 147.<br>Il y a 7 valeurs.<br>Moyenne : 147 ÷ 7 = <span class="big">21 °C</span>.<br>Contrôle : 21 est bien entre 18 et 24.`,
      consigne: "Quelle est la température moyenne de la semaine ?",
      verification: { type: "courte", attendus: ["21"], unite: "°C" },
      dessin: meteo(),
    },
    {
      tag: "Énigme 2 · Le bus du matin",
      titre: "Le trajet du milieu",
      question: `Hugo note la durée de son trajet en bus, 7 jours de suite.<br>Dans l'ordre : 25, 12, 30, 18, 40, 15 et 22 minutes.<br><br>Quelle est la <b>médiane</b> de cette série ?`,
      reponse: `D'abord, on <b>range</b> la série : 12 ; 15 ; 18 ; 22 ; 25 ; 30 ; 40.<br>Il y a 7 valeurs : la médiane est la 4e.<br>Médiane : <span class="big">22 min</span>.<br>3 trajets durent moins, 3 durent plus.<br>⚠️ Sans ranger, on aurait pris 18 : faux !`,
      consigne: "Quelle est la médiane des durées de trajet ?",
      verification: { type: "qcm", choix: ["18 min", "22 min", "23 min"], bonne: 1 },
      dessin: trajets(),
    },
    {
      tag: "Énigme 3 · Les oiseaux du jardin",
      titre: "L'écart de la semaine",
      question: `Nour compte les oiseaux de son jardin chaque jour.<br>Le diagramme montre ses relevés.<br><br>Quelle est l'<b>étendue</b> de cette série ?`,
      reponse: `On lit le diagramme : 12, 8, 15, 6 et 10 oiseaux.<br>Le plus grand : 15 (mercredi). Le plus petit : 6 (jeudi).<br>Étendue : 15 − 6 = <span class="big">9 oiseaux</span>.`,
      consigne: "Quelle est l'étendue de la série ?",
      verification: { type: "courte", attendus: ["9"], unite: "oiseaux" },
      dessin: oiseaux(),
    },
    {
      tag: "Énigme 4 · Frères et sœurs",
      titre: "La moyenne du tableau",
      question: `Dans une classe, chaque élève dit combien il a de frères et sœurs.<br>Le tableau donne les résultats.<br><br>Quel est le <b>nombre moyen</b> de frères et sœurs ?`,
      reponse: `On multiplie chaque valeur par son effectif :<br>0 × 4 = 0 ; 1 × 10 = 10 ; 2 × 8 = 16 ; 3 × 3 = 9.<br>Somme : 0 + 10 + 16 + 9 = 35.<br>Effectif total : 4 + 10 + 8 + 3 = 25 élèves.<br>Moyenne : 35 ÷ 25 = <span class="big">1,4</span>.<br>⚠️ On divise par 25 élèves, pas par 4 colonnes.`,
      consigne: "Quel est le nombre moyen de frères et sœurs ?",
      verification: { type: "qcm", choix: ["8,75", "1,5", "1,4"], bonne: 2 },
      dessin: fratries(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le quiz du planétarium",
      sorte: "piege",
      question: `Au planétarium, deux groupes passent un quiz.<br>Groupe A : 10 élèves, moyenne 16.<br>Groupe B : 30 élèves, moyenne 8.<br>Léo dit : « La moyenne des 40 élèves, c'est (16 + 8) ÷ 2 = 12. »<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Les groupes n'ont pas la même taille.<br>Points du groupe A : 10 × 16 = 160.<br>Points du groupe B : 30 × 8 = 240.<br>Total : 160 + 240 = 400 points pour 40 élèves.<br>Moyenne : 400 ÷ 40 = <span class="big">10</span>.<br>Le grand groupe pèse plus lourd.`,
      consigne: "Quelle est la moyenne des 40 élèves ?",
      verification: { type: "qcm", choix: ["10", "12", "14"], bonne: 0 },
      dessin: groupes(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La dernière fléchette",
      sorte: "defi",
      question: `Inès joue aux fléchettes.<br>Ses 4 premières parties : 35, 42, 28 et 39 points.<br>Elle veut <b>38 points de moyenne</b> sur 5 parties.<br><br>Combien doit-elle marquer à la 5e partie ?`,
      reponse: `Pour une moyenne de 38 sur 5 parties, il faut 38 × 5 = 190 points.<br>Elle en a déjà 35 + 42 + 28 + 39 = 144.<br>Il manque 190 − 144 = <span class="big">46 points</span>.<br>Contrôle : 144 + 46 = 190, et 190 ÷ 5 = 38.`,
      consigne: "Combien de points Inès doit-elle marquer à la 5e partie ?",
      verification: { type: "courte", attendus: ["46"], unite: "points" },
      dessin: flechettes(),
    },
  ],
};

export default problemes;
