// Énigmes à projeter — 4e, notion fonction_dependance (les enclos des lapins :
// qu'est-ce qui détermine quoi, le robot et son programme de calcul, le
// congélateur lu à l'envers dans un tableau, la bougie lue sur un graphique,
// piège du ressort « dépendre n'est pas être proportionnel », défi des deux
// citernes qui se croisent).
// Le graphique de la bougie est exact : 36 px par heure, 15 px par cm.
// Les enclos sont au bon rapport (20 px par m). Pas de prix : la fiche parle
// d'euros, ici on reste sur des grandeurs physiques. 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";
const r1 = (v: number) => Math.round(v * 10) / 10;
const txt = (x: number, y: number, t: string, coul: string = C.craie, taille = 22, ancre = "middle") =>
  `<text x="${r1(x)}" y="${r1(y)}" fill="${coul}" font-size="${taille}" text-anchor="${ancre}">${t}</text>`;

// Deux enclos de lapins, 20 px par m : 8 m × 2 m et 6 m × 4 m.
const enclos = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux enclos rectangulaires de lapins : l'un de 8 m sur 2 m, l'autre de 6 m sur 4 m ; chacun a 20 m de grillage">
  <text x="240" y="70" font-size="48" text-anchor="middle">🐇</text>
  <rect x="60" y="130" width="160" height="40" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>
  ${txt(140, 118, "8 m", C.craie, 22)}
  ${txt(232, 158, "2 m", C.craie, 22, "start")}
  <rect x="290" y="110" width="120" height="80" fill="${C.bleu}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>
  ${txt(350, 98, "6 m", C.craie, 22)}
  ${txt(422, 158, "4 m", C.craie, 22, "start")}
  ${txt(240, 250, "grillage de chaque enclos", C.craie, 22)}
  ${txt(240, 285, "2 × 8 + 2 × 2 = 2 × 6 + 2 × 4", C.pale, 22)}
  ${txt(240, 345, "le grillage décide-t-il de l'aire ?".replace(" ?", `${NB}?`), C.rose, 24)}
  </svg>`;

// Le programme du robot, en trois cases.
const robot = () => {
  const cases = ["choisir un nombre", "le multiplier par 4", "ajouter 7"];
  const blocs = cases
    .map((c, i) => {
      const y = 100 + i * 85;
      return `<rect x="150" y="${y}" width="260" height="56" rx="12" fill="${C.bleu}" fill-opacity=".12" stroke="${C.craie}" stroke-width="3"/>` +
        txt(280, y + 36, c, C.craie, 22) +
        (i < 2 ? `<path d="M280 ${y + 58} L280 ${y + 82} M272 ${y + 74} L280 ${y + 82} L288 ${y + 74}" stroke="${C.pale}" stroke-width="3" fill="none"/>` : "");
    })
    .join("");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le programme du robot : choisir un nombre, le multiplier par 4, ajouter 7 ; on part de moins 3">
  <text x="70" y="130" font-size="56" text-anchor="middle">🤖</text>
  ${txt(70, 200, "départ", C.pale, 20)}
  ${txt(70, 232, "−3", C.jaune, 30)}
  ${blocs}
  <path d="M280 328 L280 352 M272 344 L280 352 L288 344" stroke="${C.pale}" stroke-width="3" fill="none"/>
  ${txt(280, 390, `résultat${NB}?`, C.rose, 26)}
  </svg>`;
};

// Le tableau du congélateur : température selon le temps.
const congelateur = () => {
  const temps = ["0", "10", "20", "30", "40", "50"];
  const temp = ["8", "2", "−4", "−9", "−12", "−14"];
  let cases = "";
  for (let k = 0; k < 6; k++) {
    const x = 150 + k * 52;
    cases += `<rect x="${x}" y="150" width="52" height="60" fill="${C.bleu}" fill-opacity=".1" stroke="${C.craie}" stroke-width="2"/>` +
      `<rect x="${x}" y="210" width="52" height="60" fill="none" stroke="${C.craie}" stroke-width="2"/>` +
      txt(x + 26, 188, temps[k], C.craie, 22) +
      txt(x + 26, 248, temp[k], C.craie, 22);
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tableau : à 0, 10, 20, 30, 40 et 50 minutes, la température du congélateur vaut 8, 2, moins 4, moins 9, moins 12 et moins 14 degrés">
  <text x="240" y="100" font-size="56" text-anchor="middle">❄️</text>
  <rect x="18" y="150" width="132" height="60" fill="${C.bleu}" fill-opacity=".1" stroke="${C.craie}" stroke-width="2"/>
  <rect x="18" y="210" width="132" height="60" fill="none" stroke="${C.craie}" stroke-width="2"/>
  ${txt(84, 188, "temps (min)", C.craie, 20)}
  ${txt(84, 248, "temp. (°C)", C.craie, 20)}
  ${cases}
  ${txt(240, 330, "on connaît la température", C.pale, 22)}
  ${txt(240, 365, `−9 °C${NB}: au bout de combien de minutes${NB}?`, C.rose, 22)}
  </svg>`;
};

// La bougie : origine (80 ; 350), 36 px par heure (0 à 10 h), 15 px par cm
// (0 à 20 cm). Hauteur = 20 − 2 × temps : (0 ; 20) → (80 ; 50), (10 ; 0) → (440 ; 350).
const bougie = () => {
  const X = (t: number) => 80 + 36 * t;
  const Y = (h: number) => 350 - 15 * h;
  let grille = "";
  for (let t = 1; t <= 10; t++) grille += `M${X(t)} ${Y(0)} L${X(t)} ${Y(20)} `;
  for (let h = 2; h <= 20; h += 2) grille += `M${X(0)} ${Y(h)} L${X(10)} ${Y(h)} `;
  let etiquettes = "";
  for (let t = 0; t <= 10; t += 2) etiquettes += txt(X(t), 376, String(t), C.craie, 20);
  for (let h = 4; h <= 20; h += 4) etiquettes += txt(70, Y(h) + 7, String(h), C.craie, 20, "end");
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Graphique : la hauteur de la bougie en centimètres selon le temps en heures ; une droite qui part de 20 cm à 0 h et arrive à 0 cm à 10 h">
  <path d="${grille}" stroke="${C.pale}" stroke-width="1" stroke-opacity=".5" fill="none"/>
  <path d="M${X(0)} ${Y(0)} L${X(10) + 12} ${Y(0)} M${X(0)} ${Y(0)} L${X(0)} ${Y(20) - 14}" stroke="${C.craie}" stroke-width="3" fill="none"/>
  ${etiquettes}
  ${txt(64, Y(0) + 7, "0", C.craie, 20, "end")}
  ${txt(18, 30, "hauteur (cm)", C.craie, 20, "start")}
  ${txt(462, 408, "temps (h)", C.craie, 20, "end")}
  <path d="M${X(0)} ${Y(20)} L${X(10)} ${Y(0)}" stroke="${C.rose}" stroke-width="4" fill="none"/>
  <text x="400" y="110" font-size="48" text-anchor="middle">🕯️</text>
  </svg>`;
};

// Le ressort : 12 cm à vide, 2 cm de plus par 100 g. Petit tableau à droite.
const ressort = () => {
  let zig = "M110 60 L110 90";
  for (let k = 0; k < 8; k++) zig += ` L${k % 2 === 0 ? 85 : 135} ${100 + k * 18}`;
  zig += " L110 244 L110 262";
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un ressort accroché au plafond avec une masse ; tableau : 0 g donne 12 cm, 100 g donne 14 cm, 200 g donne 16 cm ; Zoé pense que 400 g donnent 32 cm">
  <path d="M60 60 L160 60" stroke="${C.craie}" stroke-width="4" fill="none"/>
  <path d="${zig}" stroke="${C.bleu}" stroke-width="3" fill="none" stroke-linejoin="round"/>
  <rect x="80" y="262" width="60" height="44" rx="6" fill="${C.jaune}" fill-opacity=".4" stroke="${C.craie}" stroke-width="3"/>
  ${txt(110, 292, "200 g", C.craie, 20)}
  <rect x="190" y="70" width="270" height="140" rx="10" fill="${C.bleu}" fill-opacity=".08" stroke="${C.craie}" stroke-width="2"/>
  ${txt(325, 105, "masse (g)", C.pale, 20)}
  ${[0, 100, 200].map((m, k) => txt(250 + k * 75, 135, String(m), C.craie, 22)).join("")}
  ${txt(325, 170, "longueur (cm)", C.pale, 20)}
  ${[12, 14, 16].map((l, k) => txt(250 + k * 75, 198, String(l), C.craie, 22)).join("")}
  <rect x="40" y="330" width="400" height="60" rx="16" fill="${C.rose}" fill-opacity=".12" stroke="${C.rose}" stroke-width="3"/>
  ${txt(240, 368, `Zoé${NB}: « 400 g → 32 cm${NB}»`, C.rose, 24)}
  </svg>`;
};

// Les deux citernes : A part de 300 L et perd 20 L par minute, B part de
// 60 L et gagne 40 L par minute. Eau au bon rapport : 0,5 px par litre.
const citernes = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Deux citernes : A contient 300 litres et se vide de 20 litres par minute ; B contient 60 litres et se remplit de 40 litres par minute">
  <rect x="60" y="90" width="140" height="200" rx="10" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <rect x="63" y="137" width="134" height="150" fill="${C.bleu}" fill-opacity=".3"/>
  ${txt(130, 70, "citerne A", C.craie, 22)}
  ${txt(130, 200, "300 L", C.craie, 26)}
  ${txt(130, 325, "− 20 L par min", C.rose, 22)}
  <rect x="280" y="90" width="140" height="200" rx="10" fill="none" stroke="${C.craie}" stroke-width="3"/>
  <rect x="283" y="257" width="134" height="30" fill="${C.bleu}" fill-opacity=".3"/>
  ${txt(350, 70, "citerne B", C.craie, 22)}
  ${txt(350, 235, "60 L", C.craie, 26)}
  ${txt(350, 325, "+ 40 L par min", C.bleu, 22)}
  ${txt(240, 385, `même volume${NB}: quand${NB}?`, C.rose, 24)}
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "4e",
  notionId: "fonction_dependance",
  titre: "Énigmes sur la dépendance entre deux grandeurs",
  description: "Les enclos des lapins, le programme du robot, le tableau du congélateur, le graphique de la bougie, le piège du ressort, le défi des deux citernes : reconnaître qu'une grandeur en détermine une autre, suivre un programme de calcul, lire un tableau et un graphique dans les deux sens, et comprendre que dépendre n'est pas être proportionnel.",
  problemes: [
    {
      tag: "Énigme 1 · Les lapins",
      titre: "Qui décide de quoi ?",
      question: `Inès construit des enclos pour ses lapins.<br>Dans quel cas la première grandeur <b>détermine</b>-t-elle la seconde ?<br>A. Le côté d'un enclos carré → la longueur de grillage.<br>B. La longueur de grillage d'un enclos rectangle → son aire.<br>C. L'âge d'un lapin → sa masse.`,
      reponse: `Déterminer, c'est : une valeur de départ donne <b>une seule</b> valeur d'arrivée.<br>A : grillage = 4 × côté. Un côté donne une seule longueur : oui.<br>B : 8 m × 2 m et 6 m × 4 m ont 20 m de grillage tous les deux.<br>Mais leurs aires sont 16 m² et 24 m² : non.<br>C : deux lapins du même âge n'ont pas toujours la même masse : non.<br>C'est le cas <span class="big">A</span>.`,
      consigne: "Dans quel cas la première grandeur détermine-t-elle la seconde ?",
      verification: { type: "qcm", choix: ["Côté du carré → grillage", "Grillage du rectangle → aire", "Âge du lapin → masse"], bonne: 0 },
      dessin: enclos(),
    },
    {
      tag: "Énigme 2 · Le robot",
      titre: "Le programme du robot",
      question: `Le robot de la classe de technologie suit ce programme :<br>choisir un nombre, le multiplier par 4, puis ajouter 7.<br>Nora lui donne le nombre −3.<br><br>Quel résultat le robot affiche-t-il ?`,
      reponse: `On suit les étapes dans l'ordre.<br>On part de −3.<br>On multiplie par 4 : (−3) × 4 = −12.<br>On ajoute 7 : −12 + 7 = −5.<br>Le robot affiche <span class="big">−5</span>.<br>Contrôle : 4 × (−3) + 7 = −12 + 7 = −5.`,
      consigne: "Quel résultat le robot affiche-t-il quand on lui donne −3 ?",
      verification: { type: "courte", attendus: ["-5", "−5"] },
      dessin: robot(),
    },
    {
      tag: "Énigme 3 · Le congélateur",
      titre: "Le froid qui descend",
      question: `On branche un congélateur à 0 min.<br>Le tableau donne sa température toutes les 10 minutes.<br><br>Au bout de combien de minutes la température est-elle de −9 °C ?`,
      reponse: `Ici, on connaît la température : on lit le tableau <b>à l'envers</b>.<br>On cherche −9 dans la ligne des températures.<br>Il est dans la colonne de 30 min.<br>La température vaut −9 °C au bout de <span class="big">30 minutes</span>.<br>Attention : −9 n'est pas une durée, c'est la valeur d'arrivée.`,
      consigne: "Au bout de combien de minutes la température est-elle de −9 °C ?",
      verification: { type: "courte", attendus: ["30"], unite: "min" },
      dessin: congelateur(),
    },
    {
      tag: "Énigme 4 · La bougie",
      titre: "La bougie qui fond",
      question: `Le graphique montre la hauteur d'une bougie allumée, selon le temps.<br>Elle mesure 20 cm au début.<br><br>Au bout de combien d'heures ne mesure-t-elle plus que 8 cm ?`,
      reponse: `On connaît la hauteur : on part de l'axe vertical.<br>On se place à 8 cm, entre 4 et 12.<br>On va à l'horizontale jusqu'à la droite rose.<br>On descend jusqu'à l'axe du temps : on lit 6.<br>La bougie mesure 8 cm au bout de <span class="big">6 heures</span>.<br>Contrôle : elle perd 2 cm par heure, et 20 − 2 × 6 = 8.`,
      consigne: "Au bout de combien d'heures la bougie mesure-t-elle 8 cm ?",
      verification: { type: "courte", attendus: ["6"], unite: "h" },
      dessin: bougie(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le ressort du labo",
      sorte: "piege",
      question: `En sciences, on accroche des masses à un ressort.<br>Sans masse, il mesure 12 cm. Avec 100 g, 14 cm. Avec 200 g, 16 cm.<br>Zoé dit : « Avec 200 g, c'est 16 cm. Avec deux fois plus, 400 g, ce sera deux fois plus : 32 cm. »<br><br><b>Combien mesure vraiment le ressort avec 400 g ?</b>`,
      reponse: `Zoé s'est trompée ! La longueur dépend de la masse, mais elle n'est pas proportionnelle.<br>Sans masse, le ressort mesure déjà 12 cm : ce n'est pas 0.<br>Chaque 100 g ajoute 2 cm.<br>400 g, c'est 4 fois 100 g : 4 × 2 = 8 cm de plus.<br>12 + 8 = 20 : le ressort mesure <span class="big">20 cm</span>.<br>Dépendre n'est pas être proportionnel.`,
      consigne: "Combien mesure le ressort avec 400 g ?",
      verification: { type: "qcm", choix: ["32 cm", "24 cm", "20 cm"], bonne: 2 },
      dessin: ressort(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les deux citernes",
      sorte: "defi",
      question: `La citerne A contient 300 L. Elle se vide de 20 L chaque minute.<br>La citerne B contient 60 L. Elle se remplit de 40 L chaque minute.<br>Les deux robinets s'ouvrent en même temps.<br><br>Au bout de combien de minutes les deux citernes contiennent-elles le même volume ?`,
      reponse: `On fait un tableau, minute par minute.<br>A : 300, 280, 260, 240, 220.<br>B : 60, 100, 140, 180, 220.<br>À 4 minutes, les deux contiennent 220 L.<br>Autre façon : l'écart vaut 300 − 60 = 240 L, et il diminue de 20 + 40 = 60 L par minute ; 240 ÷ 60 = 4.<br>Elles ont le même volume au bout de <span class="big">4 minutes</span>.`,
      consigne: "Au bout de combien de minutes les deux citernes contiennent-elles le même volume ?",
      verification: { type: "courte", attendus: ["4"], unite: "min" },
      dessin: citernes(),
    },
  ],
};

export default problemes;
