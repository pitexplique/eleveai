// Énigmes à projeter — 5e, notion relatif_nombre (repérer, comparer, ranger,
// distance à zéro, repère du plan). 20/11/2026.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

// Une droite graduée de min à max : x = x0 + pas × t ; étiquettes tous les `tous`.
const droite = (min: number, max: number, x0: number, pas: number, y: number, tous: number) => {
  let s = `<path d="M${x0 + pas * min - 15} ${y} L${x0 + pas * max + 15} ${y}" stroke="${C.craie}" stroke-width="3"/>`;
  for (let t = min; t <= max; t++) {
    const x = x0 + pas * t;
    const grand = t % tous === 0;
    s += `<path d="M${x} ${y - (grand ? 12 : 7)} L${x} ${y + (grand ? 12 : 7)}" stroke="${C.craie}" stroke-width="${grand ? 3 : 2}"/>`;
    if (grand) s += `<text x="${x}" y="${y + 40}" fill="${C.craie}" font-size="22" text-anchor="middle">${t < 0 ? "−" + -t : t}</text>`;
  }
  return s;
};

// Températures : x = 385 + 25t (de −13 à 3).
const villes = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une droite graduée avec quatre températures : −12, −8, −3 et 2 degrés">
  ${droite(-13, 3, 385, 25, 250, 5)}
  <circle cx="85" cy="250" r="8" fill="${C.bleu}"/><text x="85" y="210" fill="${C.bleu}" font-size="20" text-anchor="middle">Montréal</text><text x="85" y="180" fill="${C.bleu}" font-size="20" text-anchor="middle">−12</text>
  <circle cx="185" cy="250" r="8" fill="${C.rose}"/><text x="185" y="150" fill="${C.rose}" font-size="20" text-anchor="middle">Moscou</text><text x="185" y="120" fill="${C.rose}" font-size="20" text-anchor="middle">−8</text>
  <path d="M185 160 L185 238" stroke="${C.rose}" stroke-width="2" stroke-dasharray="4 4"/>
  <circle cx="310" cy="250" r="8" fill="${C.jaune}"/><text x="310" y="210" fill="${C.jaune}" font-size="20" text-anchor="middle">Oslo</text><text x="310" y="180" fill="${C.jaune}" font-size="20" text-anchor="middle">−3</text>
  <circle cx="435" cy="250" r="8" fill="${C.craie}"/><text x="435" y="150" fill="${C.craie}" font-size="20" text-anchor="middle">Paris</text><text x="435" y="120" fill="${C.craie}" font-size="20" text-anchor="middle">2</text>
  <path d="M435 160 L435 238" stroke="${C.craie}" stroke-width="2" stroke-dasharray="4 4"/>
  <text x="240" y="350" fill="${C.pale}" font-size="22" text-anchor="middle">en °C, un matin de janvier</text>
  </svg>`;

// Droite graduée de −3 à 3, un trait tous les 0,5 : x = 240 + 60t.
const lecture = () => {
  let s = `<path d="M45 220 L435 220" stroke="${C.craie}" stroke-width="3"/>`;
  for (let k = -6; k <= 6; k++) {
    const x = 240 + 30 * k;
    const entier = k % 2 === 0;
    s += `<path d="M${x} ${220 - (entier ? 14 : 8)} L${x} ${220 + (entier ? 14 : 8)}" stroke="${C.craie}" stroke-width="${entier ? 3 : 2}"/>`;
    if (entier) s += `<text x="${x}" y="265" fill="${C.craie}" font-size="22" text-anchor="middle">${k < 0 ? "−" + -k / 2 : k / 2}</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une droite graduée de −3 à 3 avec un trait tous les demis ; le point A est entre −2 et −1">
  ${s}
  <circle cx="150" cy="220" r="9" fill="${C.rose}"/>
  <text x="150" y="180" fill="${C.rose}" font-size="32" text-anchor="middle">A</text>
  <text x="240" y="350" fill="${C.pale}" font-size="22" text-anchor="middle">un petit trait tous les 0,5</text>
  </svg>`;
};

// Repère : origine (240 ; 200), 40 px par unité, de −4 à 4.
const repere = () => {
  let s = "";
  for (let k = -4; k <= 4; k++) {
    s += `<path d="M${240 + 40 * k} 40 L${240 + 40 * k} 360" stroke="${C.pale}" stroke-width="1"/>`;
    s += `<path d="M80 ${200 + 40 * k} L400 ${200 + 40 * k}" stroke="${C.pale}" stroke-width="1"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un repère avec trois points A, B et C">
  ${s}
  <path d="M70 200 L410 200 M240 30 L240 370" stroke="${C.craie}" stroke-width="3"/>
  <text x="252" y="224" fill="${C.craie}" font-size="18">0</text>
  <text x="280" y="224" fill="${C.craie}" font-size="18">1</text>
  <text x="248" y="166" fill="${C.craie}" font-size="18">1</text>
  <circle cx="160" cy="80" r="8" fill="${C.rose}"/><text x="172" y="72" fill="${C.rose}" font-size="26">A</text>
  <circle cx="360" cy="280" r="8" fill="${C.bleu}"/><text x="372" y="272" fill="${C.bleu}" font-size="26">B</text>
  <circle cx="120" cy="120" r="8" fill="${C.jaune}"/><text x="98" y="112" fill="${C.jaune}" font-size="26">C</text>
  <text x="240" y="400" fill="${C.pale}" font-size="20" text-anchor="middle">un carreau = 1</text>
  </svg>`;
};

// Distance à zéro : x = 240 + 25t, de −8 à 8.
const distance = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une droite graduée de −8 à 8 ; deux flèches de 7 unités partent de zéro">
  ${droite(-8, 8, 240, 25, 260, 5)}
  <path d="M240 240 Q152 150 65 240" stroke="${C.rose}" stroke-width="4" fill="none"/>
  <path d="M240 240 Q328 150 415 240" stroke="${C.bleu}" stroke-width="4" fill="none"/>
  <text x="152" y="170" fill="${C.rose}" font-size="26" text-anchor="middle">7</text>
  <text x="328" y="170" fill="${C.bleu}" font-size="26" text-anchor="middle">7</text>
  <circle cx="65" cy="260" r="8" fill="${C.rose}"/><circle cx="415" cy="260" r="8" fill="${C.bleu}"/>
  <text x="65" y="110" fill="${C.rose}" font-size="34" text-anchor="middle">?</text>
  <text x="415" y="110" fill="${C.bleu}" font-size="34" text-anchor="middle">?</text>
  </svg>`;

// Piège : x = 330 + 30t, de −9 à 3.
const piege = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Sur la droite graduée, −8 est à gauche de −3">
  <text x="240" y="90" fill="${C.rose}" font-size="38" text-anchor="middle">« −8 &gt; −3 car 8 &gt; 3 »</text>
  ${droite(-9, 3, 330, 30, 230, 5)}
  <circle cx="90" cy="230" r="8" fill="${C.rose}"/><text x="90" y="200" fill="${C.rose}" font-size="24" text-anchor="middle">−8</text>
  <circle cx="240" cy="230" r="8" fill="${C.bleu}"/><text x="240" y="200" fill="${C.bleu}" font-size="24" text-anchor="middle">−3</text>
  <path d="M100 330 L420 330 M405 320 L420 330 L405 340" stroke="${C.jaune}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <text x="260" y="370" fill="${C.jaune}" font-size="22" text-anchor="middle">de plus en plus grand</text>
  </svg>`;

// Défi : x = 280 + 40t, de −6 à 3. Bornes exclues : ronds vides.
const defi = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une droite graduée de −6 à 3, avec −5 et 2 entourés et exclus">
  ${droite(-6, 3, 280, 40, 230, 1)}
  <circle cx="80" cy="230" r="11" fill="none" stroke="${C.rose}" stroke-width="4"/>
  <circle cx="360" cy="230" r="11" fill="none" stroke="${C.rose}" stroke-width="4"/>
  <path d="M95 190 L345 190" stroke="${C.bleu}" stroke-width="4" stroke-dasharray="10 8"/>
  <text x="220" y="160" fill="${C.bleu}" font-size="28" text-anchor="middle">combien d'entiers ici ?</text>
  <text x="240" y="340" fill="${C.pale}" font-size="22" text-anchor="middle">−5 et 2 ne comptent pas</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "5e",
  notionId: "relatif_nombre",
  titre: "Énigmes sur les nombres relatifs",
  description: "Nombres relatifs 5e : températures du monde, droite graduée, repère du plan, distance à zéro, piège du −8, entiers cachés. Questions flash à projeter.",
  problemes: [
    {
      tag: "Énigme 1 · La météo du monde",
      titre: "La ville la plus froide",
      question: `Un matin de janvier, il fait <b>−8 °C</b> à Moscou, <b>−3 °C</b> à Oslo, <b>2 °C</b> à Paris et <b>−12 °C</b> à Montréal.<br><br><b>Quelle ville a le plus froid ?</b>`,
      reponse: `Le plus froid, c'est le nombre le plus petit : le plus à gauche sur la droite.<br>−12 &lt; −8 &lt; −3 &lt; 2. C'est <span class="big">Montréal</span>.`,
      consigne: "Quelle ville a le plus froid ?",
      verification: { type: "qcm", choix: ["Moscou", "Oslo", "Montréal"], bonne: 2 },
      dessin: villes(),
    },
    {
      tag: "Énigme 2 · Lire une droite",
      titre: "Où est le point A ?",
      question: `Sur la droite graduée, un petit trait vaut <b>0,5</b>.<br><br><b>Quelle est l'abscisse du point A ?</b>`,
      reponse: `A est entre −2 et −1, juste au milieu.<br>Son abscisse est <span class="big">−1,5</span>.`,
      consigne: "Quelle est l'abscisse du point A ?",
      verification: { type: "courte", attendus: ["-1,5", "−1,5", "-1.5"] },
      dessin: lecture(),
    },
    {
      tag: "Énigme 3 · La carte au trésor",
      titre: "Le bon point",
      question: `Le trésor est caché au point de coordonnées <b>(−2 ; 3)</b>.<br><br><b>Quel point est le trésor : A, B ou C ?</b>`,
      reponse: `D'abord l'abscisse : 2 carreaux vers la gauche. Puis l'ordonnée : 3 carreaux vers le haut.<br>Le trésor est en <span class="big">A</span>. (C est en (−3 ; 2) : on a inversé.)`,
      consigne: "Quel point a pour coordonnées (−2 ; 3) ?",
      verification: { type: "qcm", choix: ["B", "A", "C"], bonne: 1 },
      dessin: repere(),
    },
    {
      tag: "Énigme 4 · À égale distance",
      titre: "Deux nombres à 7 de zéro",
      question: `Sur la droite graduée, deux nombres sont à <b>7 unités de zéro</b>.<br><br><b>Quels sont ces deux nombres ?</b>`,
      reponse: `Un à droite de zéro, un à gauche : <span class="big">7 et −7</span>.<br>Ce sont deux nombres opposés.`,
      consigne: "Quels sont les deux nombres à 7 unités de zéro ?",
      verification: { type: "qcm", choix: ["−7 et 7", "0 et 7", "−7 et −14"], bonne: 0 },
      dessin: distance(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le raisonnement de Lina",
      sorte: "piege",
      question: `Lina dit : « −8 est plus grand que −3, car 8 est plus grand que 3. »<br><br><b>A-t-elle raison ?</b> Quel est le plus grand des deux ?`,
      reponse: `Non ! −8 est plus à gauche que −3.<br>−8 °C, c'est plus froid que −3 °C. Le plus grand est <span class="big">−3</span>.`,
      consigne: "Quel est le plus grand : −8 ou −3 ?",
      verification: { type: "qcm", choix: ["−8", "Ils sont égaux", "−3"], bonne: 2 },
      dessin: piege(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Les entiers cachés",
      sorte: "defi",
      question: `Je pense à un nombre <b>entier</b>.<br>Il est plus grand que <b>−5</b> et plus petit que <b>2</b>.<br><br><b>Combien de nombres</b> sont possibles ?`,
      reponse: `On les écrit tous : −4, −3, −2, −1, 0, 1.<br>Il y en a <span class="big">6</span>. (−5 et 2 ne comptent pas.)`,
      consigne: "Combien d'entiers sont entre −5 et 2 (exclus) ?",
      verification: { type: "courte", attendus: ["6"] },
      dessin: defi(),
    },
  ],
};

export default problemes;
