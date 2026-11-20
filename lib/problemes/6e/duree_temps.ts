// Énigmes à projeter — 6e, notion duree_temps (heure de fin en passant par
// l'heure ronde, tableau d'horaires, convertir en minutes, heure à virgule,
// le piège de 1,5 h, le défi de minuit). 20/11/2026.
// ⛔ L'horloge est EXACTE : aiguilles calculées avec cos/sin.
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

/** Le point à la distance r de (cx, cy), dans la direction `deg` (0° = vers la
 *  droite, sens inverse des aiguilles d'une montre, y vers le bas en SVG). */
const P = (cx: number, cy: number, r: number, deg: number): [number, number] => {
  const a = (deg * Math.PI) / 180;
  return [+(cx + r * Math.cos(a)).toFixed(1), +(cy - r * Math.sin(a)).toFixed(1)];
};
const xy = (p: [number, number]) => `${p[0]} ${p[1]}`;

// La piscine : l'horloge à 9 h 45.
// Petite aiguille : 9 + 45/60 = 9,75 heures → 90 − 30 × 9,75 = −202,5°.
// Grande aiguille : 45 min → 90 − 6 × 45 = −180° (sur le 9).
const piscine = () => {
  const cx = 240, cy = 190;
  let s = "";
  for (let k = 1; k <= 12; k++) {
    const p = P(cx, cy, 118, 90 - 30 * k);
    s += `<text x="${p[0]}" y="${p[1] + 8}" fill="${C.craie}" font-size="22" text-anchor="middle">${k}</text>`;
    s += `<path d="M${xy(P(cx, cy, 136, 90 - 30 * k))} L${xy(P(cx, cy, 146, 90 - 30 * k))}" stroke="${C.craie}" stroke-width="3"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une horloge qui indique 9 heures 45">
  <circle cx="${cx}" cy="${cy}" r="146" fill="${C.bleu}" fill-opacity=".08" stroke="${C.craie}" stroke-width="4"/>
  ${s}
  <path d="M${cx} ${cy} L${xy(P(cx, cy, 72, 90 - 30 * 9.75))}" stroke="${C.rose}" stroke-width="9" stroke-linecap="round"/>
  <path d="M${cx} ${cy} L${xy(P(cx, cy, 100, 90 - 6 * 45))}" stroke="${C.bleu}" stroke-width="6" stroke-linecap="round"/>
  <circle cx="${cx}" cy="${cy}" r="7" fill="${C.craie}"/>
  <text x="240" y="380" fill="${C.craie}" font-size="26" text-anchor="middle">début de la séance 🏊</text>
  <text x="240" y="412" fill="${C.rose}" font-size="24" text-anchor="middle">durée${NB}: 50 min</text>
  </svg>`;
};

// Le bus : un tableau d'horaires à 4 arrêts.
const bus = () => {
  const lignes: [string, string][] = [["Gare", "8 h 50"], ["Marché", "9 h 20"], ["École", "10 h 05"], ["Plage", "11 h 15"]];
  let s = `<rect x="70" y="80" width="340" height="50" fill="${C.jaune}" fill-opacity=".2" stroke="${C.craie}" stroke-width="3"/>
  <path d="M250 80 L250 330" stroke="${C.craie}" stroke-width="3"/>
  <text x="160" y="114" fill="${C.craie}" font-size="24" text-anchor="middle">Arrêt</text>
  <text x="330" y="114" fill="${C.craie}" font-size="24" text-anchor="middle">Passage</text>`;
  lignes.forEach(([a, h], i) => {
    const y = 130 + 50 * i;
    const fort = i === 0 || i === 3;
    s += `<rect x="70" y="${y}" width="340" height="50" fill="none" stroke="${C.craie}" stroke-width="3"/>`;
    s += `<text x="160" y="${y + 35}" fill="${fort ? C.bleu : C.craie}" font-size="26" text-anchor="middle">${a}</text>`;
    s += `<text x="330" y="${y + 35}" fill="${fort ? C.bleu : C.craie}" font-size="26" text-anchor="middle">${h}</text>`;
  });
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Le tableau des horaires d'un bus à quatre arrêts">
  <text x="240" y="55" font-size="40" text-anchor="middle">🚌</text>
  ${s}
  <text x="240" y="385" fill="${C.rose}" font-size="24" text-anchor="middle">De la Gare à la Plage${NB}?</text>
  </svg>`;
};

// Le concert : 1 h 35 min, à l'échelle 4 px par minute (60 → 240 px, 35 → 140 px).
const concert = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une bande de temps : une heure, puis trente-cinq minutes">
  <text x="240" y="90" font-size="48" text-anchor="middle">🎻 🎺 🥁</text>
  <rect x="50" y="170" width="240" height="60" fill="${C.bleu}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3"/>
  <rect x="290" y="170" width="140" height="60" fill="${C.jaune}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3"/>
  <text x="170" y="155" fill="${C.bleu}" font-size="26" text-anchor="middle">1 h</text>
  <text x="360" y="155" fill="${C.jaune}" font-size="26" text-anchor="middle">35 min</text>
  <path d="M50 255 L50 275 L430 275 L430 255" stroke="${C.rose}" stroke-width="3" fill="none"/>
  <text x="240" y="315" fill="${C.rose}" font-size="28" text-anchor="middle">? min</text>
  <text x="240" y="385" fill="${C.craie}" font-size="26" text-anchor="middle">le concert${NB}: 1 h 35 min</text>
  </svg>`;

// La sieste du chat : le cadran d'une heure coupé en 4 parts égales, une part colorée.
const sieste = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un chat et le cadran d'une heure partagé en quatre parts égales">
  <text x="240" y="45" fill="${C.craie}" font-size="26" text-anchor="middle">1 h = 60 min</text>
  <path d="M320 200 L320 80 A120 120 0 0 1 440 200 Z" fill="${C.jaune}" fill-opacity=".4"/>
  <circle cx="320" cy="200" r="120" fill="none" stroke="${C.craie}" stroke-width="4"/>
  <path d="M320 80 L320 320 M200 200 L440 200" stroke="${C.pale}" stroke-width="3" stroke-dasharray="8 6"/>
  <circle cx="320" cy="200" r="6" fill="${C.craie}"/>
  <text x="110" y="225" font-size="80" text-anchor="middle">🐱</text>
  <text x="240" y="365" fill="${C.craie}" font-size="26" text-anchor="middle">sieste de 0,25 h</text>
  <text x="240" y="405" fill="${C.rose}" font-size="24" text-anchor="middle">combien de minutes${NB}?</text>
  </svg>`;

// Le piège : 1,5 h = 1 h + une demi-heure, à 4 px par minute (60 → 240 px, 30 → 120 px).
const echecs = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Une bande de temps : une heure, puis une demi-heure">
  <text x="240" y="80" font-size="48" text-anchor="middle">♟️</text>
  <rect x="60" y="170" width="240" height="60" fill="${C.bleu}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3"/>
  <rect x="300" y="170" width="120" height="60" fill="${C.jaune}" fill-opacity=".35" stroke="${C.craie}" stroke-width="3"/>
  <text x="180" y="155" fill="${C.bleu}" font-size="26" text-anchor="middle">1 h</text>
  <text x="360" y="155" fill="${C.jaune}" font-size="26" text-anchor="middle">0,5 h</text>
  <text x="180" y="270" fill="${C.bleu}" font-size="24" text-anchor="middle">60 min</text>
  <text x="360" y="270" fill="${C.rose}" font-size="24" text-anchor="middle">? min</text>
  <text x="240" y="345" fill="${C.craie}" font-size="26" text-anchor="middle">Zoé dit${NB}: 1 h 50 min</text>
  <text x="240" y="390" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-elle raison${NB}?</text>
  </svg>`;

// Le défi : une ligne du temps de 21 h à 3 h (6 h = 360 min sur 400 px).
// 21 h 40 → x = 40 + 40 × 400/360 ≈ 84,4 ; 2 h 15 = 315 min après 21 h → x = 40 + 350 = 390.
const etoiles = () => {
  const X = (min: number) => +(40 + (min * 400) / 360).toFixed(1);
  let s = "";
  ["21 h", "22 h", "23 h", "0 h", "1 h", "2 h", "3 h"].forEach((h, k) => {
    const x = X(60 * k);
    s += `<path d="M${x} 230 L${x} 250" stroke="${C.craie}" stroke-width="3"/>`;
    s += `<text x="${x}" y="280" fill="${k === 3 ? C.rose : C.craie}" font-size="20" text-anchor="middle">${h}</text>`;
  });
  const a = X(40), b = X(315);
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une ligne du temps de 21 heures à 3 heures du matin, qui passe par minuit">
  <text x="240" y="70" font-size="44" text-anchor="middle">🌙 🔭 ⭐</text>
  <path d="M40 240 L440 240" stroke="${C.craie}" stroke-width="3"/>
  <path d="M${a} 240 L${b} 240" stroke="${C.bleu}" stroke-width="10" stroke-linecap="round"/>
  ${s}
  <text x="${X(180)}" y="315" fill="${C.rose}" font-size="22" text-anchor="middle">minuit</text>
  <path d="M${a} 225 L${a} 190" stroke="${C.jaune}" stroke-width="3"/>
  <path d="M${b} 225 L${b} 190" stroke="${C.jaune}" stroke-width="3"/>
  <text x="${a + 10}" y="175" fill="${C.jaune}" font-size="24" text-anchor="middle">21 h 40</text>
  <text x="${b}" y="175" fill="${C.jaune}" font-size="24" text-anchor="middle">2 h 15</text>
  <text x="240" y="380" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de temps${NB}?</text>
  </svg>`;
};

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "duree_temps",
  titre: "Énigmes sur les durées",
  description: "La séance de piscine, le bus de la plage, le concert en minutes, la sieste du chat, le piège de la partie d'échecs, la nuit des étoiles.",
  problemes: [
    {
      tag: "Énigme 1 · À la piscine",
      titre: "La séance de natation",
      question: `La séance de natation commence à l'heure de l'horloge.<br>Elle dure <b>50 min</b>.<br><br>À <b>quelle heure</b> finit-elle ?`,
      reponse: `L'horloge indique 9 h 45.<br>On passe par l'heure ronde : de 9 h 45 à 10 h, il y a 15 min.<br>Il reste 50 − 15 = 35 min.<br>10 h + 35 min = <span class="big">10 h 35</span>.`,
      consigne: "La séance commence à 9 h 45 et dure 50 min. À quelle heure finit-elle ?",
      verification: { type: "courte", attendus: ["10h35", "10h35min", "10:35"] },
      dessin: piscine(),
    },
    {
      tag: "Énigme 2 · En bus",
      titre: "Le bus de la plage",
      question: `Voici les horaires d'un bus.<br>Inès monte à la <b>Gare</b>.<br>Elle descend à la <b>Plage</b>.<br><br>Combien de temps dure son <b>trajet</b> ?`,
      reponse: `Départ 8 h 50. Arrivée 11 h 15.<br>De 8 h 50 à 9 h : 10 min.<br>De 9 h à 11 h : 2 h. De 11 h à 11 h 15 : 15 min.<br>10 + 15 = 25 min. Le trajet dure <span class="big">2 h 25 min</span>.`,
      consigne: "Combien de temps dure le trajet de la Gare à la Plage ?",
      verification: { type: "qcm", choix: ["2 h 35 min", "3 h 25 min", "2 h 25 min"], bonne: 2 },
      dessin: bus(),
    },
    {
      tag: "Énigme 3 · En musique",
      titre: "Le concert",
      question: `Le concert de l'orchestre dure <b>1 h 35 min</b>.<br><br>Combien de <b>minutes</b> dure-t-il en tout ?`,
      reponse: `1 h, c'est 60 min.<br>On ajoute les 35 min : 60 + 35 = 95.<br>Le concert dure <span class="big">95 min</span>.`,
      consigne: "Le concert dure 1 h 35 min. Combien de minutes en tout ?",
      verification: { type: "courte", attendus: ["95"], unite: "min" },
      dessin: concert(),
    },
    {
      tag: "Énigme 4 · Chez le chat",
      titre: "La sieste de Moka",
      question: `Moka, le chat, fait une sieste de <b>0,25 h</b>.<br><br>Combien de <b>minutes</b> dure sa sieste ?`,
      reponse: `0,25, c'est 25 centièmes : le quart de 1.<br>0,25 h, c'est donc le quart d'une heure.<br>1 h = 60 min. 60 ÷ 4 = 15.<br>La sieste dure <span class="big">15 min</span>. Pas 25 min !`,
      consigne: "Une sieste de 0,25 h dure combien de minutes ?",
      verification: { type: "qcm", choix: ["25 min", "15 min", "4 min"], bonne: 1 },
      dessin: sieste(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La partie d'échecs",
      sorte: "piege",
      question: `Une partie d'échecs a duré <b>1,5 h</b>.<br>Zoé dit : « Elle a duré 1 h 50 min. »<br><br><b>A-t-elle raison ?</b>`,
      reponse: `Non ! Une heure n'a pas 100 minutes. Elle en a 60.<br>0,5 h, c'est la <b>moitié</b> d'une heure : 60 ÷ 2 = 30 min.<br>1,5 h = 1 h + 30 min.<br>La partie a duré <span class="big">1 h 30 min</span>.`,
      consigne: "Zoé dit : « 1,5 h = 1 h 50 min ». A-t-elle raison ?",
      verification: { type: "qcm", choix: ["Non : 1 h 30 min", "Oui : 1 h 50 min", "Non : 1 h 05 min"], bonne: 0 },
      dessin: echecs(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La nuit des étoiles",
      sorte: "defi",
      question: `Un club observe les étoiles.<br>Il commence à <b>21 h 40</b>.<br>Il finit à <b>2 h 15</b> du matin.<br><br>Combien de temps dure l'observation ?`,
      reponse: `On passe par les heures rondes.<br>21 h 40 → 22 h : 20 min. 22 h → minuit : 2 h.<br>Minuit → 2 h : 2 h. 2 h → 2 h 15 : 15 min.<br>2 h + 2 h = 4 h. 20 + 15 = 35 min.<br>L'observation dure <span class="big">4 h 35 min</span>.`,
      consigne: "De 21 h 40 à 2 h 15, combien de temps (en h et min) ?",
      verification: { type: "courte", attendus: ["4h35", "4h35min"] },
      dessin: etoiles(),
    },
  ],
};

export default problemes;
