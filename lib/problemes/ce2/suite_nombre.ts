// Énigmes à projeter — CE2, notion suites de nombres (les bornes de la route,
// le kangourou, les drapeaux de la fête, le réservoir, le piège du compteur,
// le défi de Léa et Noé). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p } from "../dessins-ecole";

const bornes = svg(
  "Des bornes : 2 300, 2 400, 2 500, puis une borne vide",
  l(20, 300, 460, 300, C.pale, 4) +
    ["2 300", "2 400", "2 500", "?"].map((v, i) =>
      p(`M${40 + i * 110} 300 L${40 + i * 110} 180 Q${85 + i * 110} 140 ${130 + i * 110} 180 L${130 + i * 110} 300 Z`, i === 3 ? C.rose : C.craie, 4, 0.08) +
      t(85 + i * 110, 245, v, i === 3 ? C.rose : C.craie, i === 3 ? 44 : 24)).join("") +
    t(240, 90, "de 100 en 100", C.bleu, 30)
);

const kangourou = svg(
  "Le kangourou saute de 4 en 4 : 4, 8, 12, 16, 20, puis ?",
  l(20, 300, 460, 300, C.craie, 3) +
    [0, 4, 8, 12, 16, 20, 24].map((v, i) => l(30 + i * 68, 290, 30 + i * 68, 310, C.craie, 3) + t(30 + i * 68, 345, i === 6 ? "?" : v, i === 6 ? C.rose : C.craie, 24)).join("") +
    [0, 1, 2, 3, 4].map((i) => p(`M${30 + i * 68} 285 Q${64 + i * 68} 225 ${98 + i * 68} 285`, C.jaune, 3)).join("") +
    t(370, 270, "🦘", C.craie, 56) + t(240, 110, `Après 20${NB}?`, C.rose, 30)
);

const drapeaux = svg(
  "Une guirlande : jaune, rose, bleu, jaune, rose, bleu, et ainsi de suite",
  p("M20 110 Q240 170 460 110", C.pale, 3) +
    [0, 1, 2, 3, 4, 5, 6].map((i) => {
      const x = 40 + i * 66, y = 112 + Math.round(26 * Math.sin((Math.PI * i) / 6));
      const c = [C.jaune, C.rose, C.bleu][i % 3];
      return p(`M${x - 20} ${y} L${x + 20} ${y} L${x} ${y + 60} Z`, c, 3, 0.5) + t(x, y + 90, i + 1, C.craie, 20);
    }).join("") +
    t(240, 330, `… et le 10e drapeau${NB}?`, C.rose, 30)
);

const reservoir = svg(
  "Le réservoir chaque jour : 50 L, 45 L, 40 L, 35 L",
  ["50", "45", "40", "35"].map((v, i) => {
    const h = Number(v) * 3;
    return r(30 + i * 115, 90, 80, 160, C.craie, 0, 4, 6) + r(30 + i * 115, 250 - h, 80, h, C.bleu, 0.35, 0) + t(70 + i * 115, 300, `${v} L`, C.craie, 26) + t(70 + i * 115, 340, `jour ${i + 1}`, C.pale, 20);
  }).join("") + t(240, 395, `Quelle est la règle${NB}?`, C.rose, 28)
);

const compteur = svg(
  "Le compteur de la voiture : 1 970, 1 980, 1 990, puis ?",
  r(60, 80, 360, 120, C.craie, 0.05, 5, 16) + t(240, 160, "1 990 km", C.bleu, 56) +
    t(240, 260, "1 970 → 1 980 → 1 990 → ?", C.craie, 26) + t(240, 320, "de 10 en 10", C.pale, 24) + t(240, 380, `le nombre suivant${NB}?`, C.rose, 28)
);

const deux = svg(
  "Léa compte de 3 en 3 : 3, 6, 9, et la suite. Noé compte de 4 en 4 : 4, 8, et la suite",
  t(50, 140, "Léa", C.rose, 28, "start") + ["3", "6", "9", "?", "?"].map((v, i) => t(170 + i * 60, 140, v, i < 3 ? C.craie : C.pale, 30)).join("") +
    t(50, 240, "Noé", C.bleu, 28, "start") + ["4", "8", "?", "?"].map((v, i) => t(170 + i * 60, 240, v, i < 2 ? C.craie : C.pale, 30)).join("") +
    t(240, 340, `Le 1er nombre dit par les deux${NB}?`, C.rose, 28)
);

const problemes: ProblemesNotion = {
  classe: "ce2",
  notionId: "suite_nombre",
  titre: "Énigmes sur les suites de nombres",
  description: "Les bornes de 100 en 100, le kangourou qui saute de 4 en 4, les drapeaux de la fête, la règle du réservoir, le piège du compteur après 1 990, le défi des deux suites.",
  problemes: [
    {
      tag: "Énigme 1 · La route",
      titre: "Les bornes",
      question: `Les bornes vont de <b>100 en 100</b>.<br>2 300, 2 400, 2 500…<br><br>Quel nombre sur la borne suivante ?`,
      reponse: `On ajoute 100 : 2 500 + 100 = <span class="big">2 600</span>.<br>Seul le chiffre des centaines change.`,
      consigne: "Quel nombre vient après 2 500 ?",
      verification: { type: "courte", attendus: ["2600"] },
      dessin: bornes,
    },
    {
      tag: "Énigme 2 · Au zoo",
      titre: "Le kangourou",
      question: `Le kangourou saute de <b>4 en 4</b>.<br>4, 8, 12, 16, 20…<br><br>Quel nombre après 20 ?`,
      reponse: `20 + 4 = <span class="big">24</span>.<br>C'est la table de 4.`,
      consigne: "Quel nombre vient après 20 ?",
      verification: { type: "courte", attendus: ["24"] },
      dessin: kangourou,
    },
    {
      tag: "Énigme 3 · La fête",
      titre: "Les drapeaux",
      question: `Les drapeaux vont par trois :<br><b>jaune, rose, bleu</b>, puis on recommence.<br><br>De quelle couleur est le <b>10e</b> drapeau ?`,
      reponse: `Bleu aux places 3, 6, 9.<br>Le 10e recommence le motif : <span class="big">jaune</span>.`,
      consigne: "De quelle couleur est le 10e drapeau ?",
      verification: { type: "qcm", choix: ["rose", "jaune", "bleu"], bonne: 1 },
      dessin: drapeaux,
    },
    {
      tag: "Énigme 4 · Le réservoir",
      titre: "La règle de la suite",
      question: `Chaque jour, on lit le réservoir.<br><b>50 L, 45 L, 40 L, 35 L</b>.<br><br>Quelle est la règle ?`,
      reponse: `50 → 45 → 40 → 35 : ça baisse.<br>Chaque jour, <span class="big">on enlève 5 L</span>.`,
      consigne: "Quelle est la règle de la suite 50, 45, 40, 35 ?",
      verification: { type: "qcm", choix: ["On ajoute 5", "On enlève 10", "On enlève 5"], bonne: 2 },
      dessin: reservoir,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le compteur de Papy",
      sorte: "piege",
      question: `Le compteur avance de <b>10 en 10</b>.<br>1 970, 1 980, 1 990…<br><br>Quel nombre vient ensuite ?`,
      reponse: `Le piège : écrire « 1 9100 ».<br>199 dizaines + 1 dizaine = 200 dizaines.<br>1 990 + 10 = <span class="big">2 000</span>.`,
      consigne: "Quel nombre vient après 1 990, de 10 en 10 ?",
      verification: { type: "qcm", choix: ["2 000", "1 9100", "1 900"], bonne: 0 },
      dessin: compteur,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Léa et Noé",
      sorte: "defi",
      question: `Léa compte de <b>3 en 3</b> : 3, 6, 9…<br>Noé compte de <b>4 en 4</b> : 4, 8…<br><br>Quel est le <b>premier nombre</b> dit par les deux ?`,
      reponse: `Léa : 3, 6, 9, <b>12</b>, 15…<br>Noé : 4, 8, <b>12</b>, 16…<br>Le premier nombre commun : <span class="big">12</span>.`,
      consigne: "Quel est le premier nombre dit par Léa et par Noé ?",
      verification: { type: "courte", attendus: ["12"] },
      dessin: deux,
    },
  ],
};

export default problemes;
