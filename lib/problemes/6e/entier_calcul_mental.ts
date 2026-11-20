// Énigmes à projeter — 6e, notion entier_calcul_mental (passer par la dizaine,
// le complément à 100, × 25 par 25 × 4 = 100, diviser avec une table,
// le piège de « arrondir puis corriger » dans le mauvais sens, le défi du × 11).
// 20/11/2026. Questions flash pour le minuteur. Phrases courtes (6e).
import type { ProblemesNotion } from "../types";
import { COULEURS as C } from "../types";

const NB = " ";

// Le bowling : deux parties, 58 et 37 points.
const bowling = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Des quilles de bowling et deux scores : 58 et 37">
  <text x="240" y="85" font-size="60" text-anchor="middle">🎳</text>
  <rect x="50" y="140" width="150" height="100" rx="12" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="4"/>
  <text x="125" y="130" fill="${C.pale}" font-size="22" text-anchor="middle">partie 1</text>
  <text x="125" y="208" fill="${C.craie}" font-size="48" text-anchor="middle">58</text>
  <text x="240" y="208" fill="${C.craie}" font-size="44" text-anchor="middle">+</text>
  <rect x="280" y="140" width="150" height="100" rx="12" fill="${C.jaune}" fill-opacity=".2" stroke="${C.jaune}" stroke-width="4"/>
  <text x="355" y="130" fill="${C.pale}" font-size="22" text-anchor="middle">partie 2</text>
  <text x="355" y="208" fill="${C.craie}" font-size="48" text-anchor="middle">37</text>
  <text x="240" y="300" fill="${C.pale}" font-size="22" text-anchor="middle">astuce${NB}: passe par 60</text>
  <text x="240" y="360" fill="${C.rose}" font-size="26" text-anchor="middle">Combien de points en tout${NB}?</text>
  </svg>`;

// L'album de timbres : 100 cases (10 sur 10), 63 remplies.
const timbres = () => {
  let s = "";
  for (let k = 0; k < 100; k++) {
    const x = 130 + 22 * (k % 10);
    const y = 70 + 22 * Math.floor(k / 10);
    const plein = k < 63;
    s += `<rect x="${x}" y="${y}" width="20" height="20" fill="${plein ? C.rose : "none"}" fill-opacity=".45" stroke="${C.craie}" stroke-width="1.5"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un album de 100 cases rangées en 10 lignes de 10, dont 63 cases ont un timbre">
  <text x="240" y="50" fill="${C.craie}" font-size="24" text-anchor="middle">100 cases ✉️</text>
  ${s}
  <rect x="300" y="325" width="22" height="22" fill="${C.rose}" fill-opacity=".45" stroke="${C.craie}" stroke-width="1.5"/>
  <text x="290" y="343" fill="${C.craie}" font-size="22" text-anchor="end">63 timbres${NB}:</text>
  <text x="240" y="395" fill="${C.rose}" font-size="24" text-anchor="middle">Combien de cases vides${NB}?</text>
  </svg>`;
};

// La salle de cinéma : 12 rangées de 25 fauteuils (schéma, pas à l'échelle).
const cinema = () => {
  let s = "";
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 10; c++)
      s += `<rect x="${95 + 26 * c}" y="${130 + 40 * r}" width="20" height="22" rx="4" fill="${C.bleu}" fill-opacity=".3" stroke="${C.bleu}" stroke-width="1.5"/>`;
    s += `<text x="368" y="${148 + 40 * r}" fill="${C.pale}" font-size="22">…</text>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Une salle de cinéma : 12 rangées de 25 fauteuils">
  <rect x="90" y="50" width="300" height="40" fill="${C.jaune}" fill-opacity=".3" stroke="${C.craie}" stroke-width="3"/>
  <text x="240" y="78" fill="${C.craie}" font-size="22" text-anchor="middle">🎬 écran</text>
  ${s}
  <text x="240" y="315" fill="${C.pale}" font-size="22" text-anchor="middle">⋮ (pas à l'échelle)</text>
  <text x="240" y="355" fill="${C.craie}" font-size="24" text-anchor="middle">12 rangées de 25 fauteuils</text>
  <text x="240" y="398" fill="${C.rose}" font-size="24" text-anchor="middle">Combien de fauteuils${NB}?</text>
  </svg>`;
};

// Le partage des letchis : 72 fruits, 8 assiettes vides.
const letchis = () => {
  let s = "";
  for (let k = 0; k < 18; k++) {
    const x = 150 + 22 * (k % 9);
    const y = 90 + 22 * Math.floor(k / 9);
    s += `<circle cx="${x}" cy="${y}" r="10" fill="${C.rose}" fill-opacity=".55" stroke="${C.craie}" stroke-width="1.5"/>`;
  }
  for (let i = 0; i < 8; i++) {
    const x = 75 + 110 * (i % 4);
    const y = 220 + 80 * Math.floor(i / 4);
    s += `<ellipse cx="${x}" cy="${y}" rx="42" ry="24" fill="none" stroke="${C.bleu}" stroke-width="3"/>`;
  }
  return `<svg viewBox="0 0 480 420" role="img" aria-label="Un tas de letchis et huit assiettes vides">
  <text x="240" y="50" fill="${C.craie}" font-size="26" text-anchor="middle">72 letchis</text>
  ${s}
  <text x="240" y="155" fill="${C.pale}" font-size="20" text-anchor="middle">…</text>
  <text x="240" y="390" fill="${C.rose}" font-size="24" text-anchor="middle">8 amis${NB}: combien chacun${NB}?</text>
  </svg>`;
};

// Le train : 83 passagers, 19 descendent ; le calcul de Tom.
const train = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un train, 83 passagers, 19 descendent, et le calcul de Tom">
  <text x="240" y="80" font-size="60" text-anchor="middle">🚆</text>
  <text x="240" y="135" fill="${C.craie}" font-size="26" text-anchor="middle">83 passagers, 19 descendent</text>
  <rect x="90" y="165" width="300" height="130" rx="12" fill="${C.jaune}" fill-opacity=".15" stroke="${C.craie}" stroke-width="3"/>
  <text x="240" y="195" fill="${C.pale}" font-size="22" text-anchor="middle">le calcul de Tom</text>
  <text x="240" y="235" fill="${C.bleu}" font-size="28" text-anchor="middle">83 − 20 = 63</text>
  <text x="240" y="275" fill="${C.bleu}" font-size="28" text-anchor="middle">63 − 1 = 62</text>
  <text x="240" y="360" fill="${C.rose}" font-size="26" text-anchor="middle">A-t-il raison${NB}?</text>
  </svg>`;

// Le tournoi de foot : 45 équipes de 11 joueurs.
const foot = () => `<svg viewBox="0 0 480 420" role="img" aria-label="Un ballon de foot, 45 équipes de 11 joueurs">
  <text x="240" y="90" font-size="64" text-anchor="middle">⚽</text>
  <text x="240" y="160" fill="${C.craie}" font-size="28" text-anchor="middle">45 équipes</text>
  <text x="240" y="205" fill="${C.craie}" font-size="28" text-anchor="middle">11 joueurs par équipe</text>
  <rect x="130" y="240" width="220" height="70" rx="12" fill="${C.bleu}" fill-opacity=".15" stroke="${C.bleu}" stroke-width="4"/>
  <text x="240" y="288" fill="${C.craie}" font-size="34" text-anchor="middle">45 × 11 = ?</text>
  <text x="240" y="365" fill="${C.pale}" font-size="22" text-anchor="middle">11, c'est 10 + 1</text>
  </svg>`;

const problemes: ProblemesNotion = {
  classe: "6e",
  notionId: "entier_calcul_mental",
  titre: "Énigmes de calcul mental",
  description: "Les points du bowling, l'album de timbres, les fauteuils du cinéma, le partage des letchis, le piège des passagers du train, le défi du tournoi de foot. Des questions flash à faire de tête, avec le minuteur.",
  problemes: [
    {
      tag: "Énigme 1 · Au bowling",
      titre: "Les deux parties",
      question: `Clara joue deux parties de bowling.<br>Elle marque <b>58</b> points, puis <b>37</b> points.<br><br>Combien de points <b>en tout</b> ?<br>Calcule <b>de tête</b>.`,
      reponse: `On passe par la dizaine.<br>58 + 2 = 60. Il reste 37 − 2 = 35 à ajouter.<br>60 + 35 = 95.<br>Clara a <span class="big">95 points</span>.`,
      consigne: "Calcule de tête : 58 + 37.",
      verification: { type: "courte", attendus: ["95"], unite: "points" },
      dessin: bowling(),
    },
    {
      tag: "Énigme 2 · Les timbres",
      titre: "L'album de Zoé",
      question: `L'album de Zoé a <b>100 cases</b>.<br>Elle a déjà collé <b>63 timbres</b>.<br><br>Combien de cases sont encore <b>vides</b> ?`,
      reponse: `On cherche le complément à 100 : 63 + ? = 100.<br>63 + 7 = 70. Puis 70 + 30 = 100.<br>7 + 30 = 37.<br>Vérifie : 63 + 37 = 100.<br>Il reste <span class="big">37 cases vides</span>.`,
      consigne: "Calcule de tête : 100 − 63.",
      verification: { type: "qcm", choix: ["47", "37", "43"], bonne: 1 },
      dessin: timbres(),
    },
    {
      tag: "Énigme 3 · Au cinéma",
      titre: "Les fauteuils",
      question: `Une salle de cinéma a <b>12 rangées</b>.<br>Chaque rangée a <b>25 fauteuils</b>.<br><br>Combien de fauteuils en tout ?<br>Astuce : 25 × 4 = 100.`,
      reponse: `On calcule 25 × 12.<br>12, c'est 4 × 3.<br>25 × 4 = 100. Puis 100 × 3 = 300.<br>La salle a <span class="big">300 fauteuils</span>.`,
      consigne: "Calcule de tête : 25 × 12.",
      verification: { type: "courte", attendus: ["300"], unite: "fauteuils" },
      dessin: cinema(),
    },
    {
      tag: "Énigme 4 · Le goûter",
      titre: "Le partage des letchis",
      question: `Mamie Josée a cueilli <b>72 letchis</b>.<br>Elle les partage entre <b>8 amis</b>.<br>Chacun en a autant.<br><br>Combien de letchis pour chacun ?`,
      reponse: `On calcule 72 ÷ 8.<br>On récite la table de 8 : … 8 × 8 = 64, 8 × 9 = 72.<br>Donc 72 ÷ 8 = 9.<br>Chacun reçoit <span class="big">9 letchis</span>.`,
      consigne: "Calcule de tête : 72 ÷ 8.",
      verification: { type: "qcm", choix: ["9 letchis", "8 letchis", "7 letchis"], bonne: 0 },
      dessin: letchis(),
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Les passagers du train",
      sorte: "piege",
      question: `Un train transporte <b>83 passagers</b>.<br>À la gare, <b>19</b> descendent.<br>Tom calcule : 83 − 20 = 63, puis 63 − 1 = 62.<br><br><b>A-t-il raison ?</b>`,
      reponse: `Non ! Tom a enlevé 20 au lieu de 19.<br>Il a donc enlevé <b>1 de trop</b>.<br>Il faut le <b>rendre</b> : 63 + 1 = 64.<br>Vérifie : 64 + 19 = 83.<br>Il reste <span class="big">64 passagers</span>.`,
      consigne: "Calcule de tête : 83 − 19.",
      verification: { type: "qcm", choix: ["62 passagers", "63 passagers", "64 passagers"], bonne: 2 },
      dessin: train(),
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le tournoi de foot",
      sorte: "defi",
      question: `Un grand tournoi réunit <b>45 équipes</b>.<br>Chaque équipe a <b>11 joueurs</b>.<br><br>Combien de joueurs en tout ?<br>Trouve-le <b>de tête</b>, en moins d'une minute.`,
      reponse: `11, c'est 10 + 1.<br>45 × 10 = 450.<br>45 × 1 = 45.<br>450 + 45 = 495.<br>Il y a <span class="big">495 joueurs</span>.`,
      consigne: "Calcule de tête : 45 × 11.",
      verification: { type: "courte", attendus: ["495"], unite: "joueurs" },
      dessin: foot(),
    },
  ],
};

export default problemes;
