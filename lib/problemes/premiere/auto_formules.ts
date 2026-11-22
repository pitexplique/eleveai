// Énigmes à projeter — première (sans spé maths), notion auto_formules (le
// triangle de la banderole, le marathonien, l'IMC, le thermomètre américain,
// piège de la pizza au diamètre, défi du pan de toit en trapèze). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";

const banderole = svg("Un triangle de côtés x, x plus 2 et 2x moins 1",
  p("M80 300 L400 300 L180 90 Z", C.jaune, 4, 0.2) +
    t(240, 335, "2x − 1", C.craie, 24) + t(110, 190, "x", C.craie, 24, "end") + t(310, 185, "x + 2", C.craie, 24, "start") +
    t(240, 395, `le périmètre${NB}?`, C.rose, 28));

const marathon = svg("La formule v égale d sur t, et la question : t égale ?",
  r(120, 60, 240, 120, C.bleu, 0.15, 3, 12) + t(240, 135, "v = d ÷ t", C.craie, 40) +
    t(90, 240, "v : vitesse", C.pale, 20, "start") + t(90, 272, "d : distance", C.pale, 20, "start") + t(90, 304, "t : durée", C.pale, 20, "start") +
    t(240, 385, `t = ?`, C.rose, 32));

const imc = svg("Une personne de 1,80 mètre et 72 kilogrammes ; IMC égale m sur t au carré",
  o(130, 90, 26, C.bleu, 0.2, 4) + l(130, 116, 130, 230, C.bleu, 5) + l(130, 150, 90, 200, C.bleu, 4) + l(130, 150, 170, 200, C.bleu, 4) +
    l(130, 230, 100, 320, C.bleu, 4) + l(130, 230, 160, 320, C.bleu, 4) + l(200, 64, 200, 320, C.pale, 2, "6 6") + t(212, 200, "1,80 m", C.pale, 18, "start") +
    r(290, 110, 160, 110, C.jaune, 0.15, 3, 10) + t(370, 155, "72 kg", C.craie, 24) + t(370, 195, "IMC = m ÷ t²", C.jaune, 18) +
    t(240, 390, `son IMC${NB}?`, C.rose, 28));

const thermo = svg("Un thermomètre gradué en degrés Fahrenheit et Celsius : F égale 1,8 C plus 32",
  r(200, 50, 40, 250, C.craie, 0.05, 4, 20) + o(220, 320, 30, C.rose, 0.4, 4) + r(212, 160, 16, 150, C.rose, 0.4, 0) +
    t(180, 100, "°F", C.pale, 20, "end") + t(260, 100, "°C", C.pale, 20, "start") +
    t(240, 380, "F = 1,8C + 32", C.craie, 24) + t(400, 200, `C = ?`, C.rose, 30));

const pizza = svg("Une pizza de 30 centimètres de diamètre ; le rayon est la moitié",
  o(240, 190, 140, C.jaune, 0.3, 4) + o(190, 150, 16, C.rose, 0.4, 2) + o(290, 230, 16, C.rose, 0.4, 2) + o(270, 130, 14, C.rose, 0.4, 2) +
    l(100, 190, 380, 190, C.craie, 3) + t(240, 180, "30 cm", C.craie, 22) +
    t(240, 375, "A = π × r²", C.craie, 24) + t(240, 410, `l'aire${NB}?`, C.rose, 26));

const toit = svg("Un pan de toit en trapèze : grande base 7 mètres, petite base inconnue, hauteur 5 mètres, aire 30 mètres carrés",
  p("M60 300 L420 300 L330 90 L150 90 Z", C.bleu, 4, 0.2) + l(150, 90, 150, 300, C.pale, 2, "6 6") +
    t(240, 335, "B = 7 m", C.craie, 22) + t(240, 78, "b = ?", C.rose, 24) + t(160, 200, "h = 5 m", C.pale, 20, "start") +
    t(290, 220, "30 m²", C.craie, 26) + t(240, 395, "A = (B + b) × h ÷ 2", C.craie, 22));

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_formules",
  titre: "Énigmes des formules littérales",
  description: "Le triangle de la banderole, le marathonien, l'IMC, le thermomètre américain, le piège de la pizza, le défi du toit en trapèze : calcul littéral, isoler une variable, appliquer une formule.",
  problemes: [
    {
      tag: "Énigme 1 · La banderole",
      titre: "Réduire une somme",
      question: `Pour la fête du lycée, une banderole triangulaire a pour côtés <b>x</b>, <b>x + 2</b> et <b>2x − 1</b> (en mètres).<br><br><b>Écris son périmètre</b> le plus simplement possible.`,
      reponse: `x + (x + 2) + (2x − 1) = x + x + 2x + 2 − 1 = <span class="big">4x + 1</span>.`,
      consigne: "Réduis x + (x + 2) + (2x − 1).",
      verification: { type: "courte", attendus: ["4x+1", "1+4x"] },
      dessin: banderole,
    },
    {
      tag: "Énigme 2 · Le marathonien",
      titre: "Isoler la durée",
      question: `Pour un coureur, la vitesse est v = d ÷ t (d : distance, t : durée).<br><br><b>Quelle formule</b> donne la durée t ?`,
      reponse: `v = d ÷ t, donc v × t = d, puis on divise par v.<br><span class="big">t = d ÷ v</span>. Exemple : 42 km à 12 km/h, t = 3,5 h.`,
      consigne: "v = d ÷ t : quelle formule donne t ?",
      verification: { type: "qcm", choix: ["t = d × v", "t = v ÷ d", "t = d ÷ v"], bonne: 2 },
      dessin: marathon,
    },
    {
      tag: "Énigme 3 · L'IMC",
      titre: "Appliquer une formule",
      question: `L'indice de masse corporelle est IMC = m ÷ t², avec m en kg et t en mètres.<br><br>Pour <b>72 kg</b> et <b>1,80 m</b>, <b>quel est l'IMC</b>, arrondi au dixième ?`,
      reponse: `t² = 1,80 × 1,80 = 3,24.<br>IMC = 72 ÷ 3,24 ≈ <span class="big">22,2</span>. On calcule le carré d'abord.`,
      consigne: "IMC = m ÷ t² avec m = 72 et t = 1,80 : l'IMC arrondi au dixième ?",
      verification: { type: "courte", attendus: ["22,2"] },
      dessin: imc,
    },
    {
      tag: "Énigme 4 · Le thermomètre américain",
      titre: "Isoler en deux étapes",
      question: `Aux États-Unis, on mesure en degrés Fahrenheit : F = 1,8C + 32 (C : degrés Celsius).<br><br><b>Quelle formule</b> donne C à partir de F ?`,
      reponse: `On enlève 32, puis on divise par 1,8 :<br><span class="big">C = (F − 32) ÷ 1,8</span>. Exemple : 77 °F donne 45 ÷ 1,8 = 25 °C.`,
      consigne: "F = 1,8C + 32 : quelle formule donne C ?",
      verification: { type: "qcm", choix: ["C = (F − 32) ÷ 1,8", "C = F ÷ 1,8 − 32", "C = 1,8F + 32"], bonne: 0 },
      dessin: thermo,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "La pizza au diamètre",
      sorte: "piege",
      question: `Une pizza mesure <b>30 cm</b> de diamètre. Son aire est A = π × r².<br><br><b>Quelle est son aire</b>, arrondie au cm² ?`,
      reponse: `r est le rayon, pas le diamètre : r = 15 cm !<br>A = π × 15² = 225π ≈ <span class="big">707 cm²</span> (et non π × 30² ≈ 2 827 cm²).`,
      consigne: "Une pizza de 30 cm de diamètre, A = π × r² : quelle aire ?",
      verification: { type: "qcm", choix: ["2 827 cm²", "707 cm²", "94 cm²"], bonne: 1 },
      dessin: pizza,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "Le toit en trapèze",
      sorte: "defi",
      question: `Un pan de toit a la forme d'un trapèze. Son aire est A = (B + b) × h ÷ 2.<br>A = <b>30 m²</b>, B = <b>7 m</b>, h = <b>5 m</b>.<br><br><b>Combien mesure</b> la petite base b ?`,
      reponse: `30 = (7 + b) × 5 ÷ 2, donc (7 + b) × 5 = 60, puis 7 + b = 12.<br><span class="big">b = 5 m</span>.`,
      consigne: "30 = (7 + b) × 5 ÷ 2 : que vaut b, en m ?",
      verification: { type: "courte", attendus: ["5"], unite: "m" },
      dessin: toit,
    },
  ],
};

export default problemes;
