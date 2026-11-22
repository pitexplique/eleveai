// Énigmes à projeter — première (sans spé maths), notion auto_ordres_unites (la
// veste soldée, le cœur qui bat, l'appartement en cm², le guépard, piège du film
// de 2,4 h, défi de la pluie sur le toit). 21/11/2026.
import type { ProblemesNotion } from "../types";
import { C, NB, svg, t, r, l, p, o } from "../dessins-ecole";

const veste = svg("Une étiquette : veste à 60 euros, moins 25 %",
  p("M120 90 L200 60 L280 60 L360 90 L340 170 L310 160 L310 320 L170 320 L170 160 L140 170 Z", C.bleu, 4, 0.2) +
    r(300, 200, 140, 80, C.jaune, 0.25, 3, 10) + t(370, 235, "60 €", C.craie, 26) + t(370, 268, "− 25 %", C.rose, 24) +
    t(240, 385, `le prix soldé${NB}?`, C.rose, 28));

const coeur = svg("Un cœur qui bat 70 fois par minute, pendant 24 heures",
  p("M240 260 C140 190 120 110 180 95 C215 87 235 110 240 130 C245 110 265 87 300 95 C360 110 340 190 240 260 Z", C.rose, 4, 0.3) +
    t(240, 60, "70 battements par minute", C.craie, 22) + t(240, 305, "pendant 24 h", C.craie, 22) +
    t(240, 385, `l'ordre de grandeur${NB}?`, C.rose, 26));

const appart = (() => {
  const s = r(70, 60, 340, 240, C.craie, 0.05, 4) + l(70, 180, 240, 180, C.pale, 3) + l(240, 60, 240, 300, C.pale, 3) +
    r(280, 220, 40, 40, C.jaune, 0.3, 2) + t(300, 280, "1 m²", C.jaune, 16);
  return svg("Le plan d'un appartement de 75 mètres carrés",
    s + t(240, 340, "75 m²", C.craie, 28) + t(240, 395, `en cm²${NB}?`, C.rose, 28));
})();

const guepard = svg("Un guépard parcourt 30 mètres en une seconde",
  p("M90 200 Q130 160 200 165 L300 160 Q340 150 360 170 L390 165 L395 180 L365 190 L340 200 L320 240 M200 190 L180 245 M240 190 L250 245 M300 195 L290 245 M90 200 Q60 190 50 220", C.jaune, 4) +
    o(380, 172, 3, C.craie, 1, 0) + l(90, 280, 390, 280, C.craie, 3) + l(90, 270, 90, 290, C.craie, 3) + l(390, 270, 390, 290, C.craie, 3) +
    t(240, 310, "30 m en 1 s", C.craie, 22) + t(240, 390, `en km/h${NB}?`, C.rose, 28));

const film = svg("Un film de 2,4 heures : 2 heures pleines et 0,4 heure",
  r(40, 120, 160, 60, C.bleu, 0.3, 3) + r(200, 120, 160, 60, C.bleu, 0.3, 3) + r(360, 120, 64, 60, C.rose, 0.3, 3) +
    t(120, 158, "1 h", C.craie, 22) + t(280, 158, "1 h", C.craie, 22) + t(392, 158, "0,4", C.rose, 18) +
    t(240, 240, "2,4 h", C.craie, 30) + t(392, 220, "?", C.rose, 26) + t(240, 380, `en heures et minutes${NB}?`, C.rose, 26));

const pluie = (() => {
  let gouttes = "";
  for (let i = 0; i < 9; i++) gouttes += l(80 + i * 40, 50 + (i % 3) * 15, 70 + i * 40, 80 + (i % 3) * 15, C.bleu, 3);
  return svg("De la pluie, 10 millimètres d'eau, sur un toit de 100 mètres carrés",
    gouttes + p("M60 220 L240 120 L420 220 Z", C.pale, 4, 0.2) + r(100, 220, 280, 100, C.craie, 0.05, 4) +
      t(240, 200, "100 m²", C.craie, 24) + t(50, 150, "10 mm", C.bleu, 22, "start") +
      t(240, 390, `combien de litres${NB}?`, C.rose, 28));
})();

const problemes: ProblemesNotion = {
  classe: "premiere",
  notionId: "auto_ordres_unites",
  titre: "Énigmes des ordres de grandeur et des unités",
  description: "La veste soldée, le cœur qui bat, l'appartement en cm², le guépard, le piège du film de 2,4 h, le défi de la pluie sur le toit : calcul mental, ordre de grandeur, vraisemblance, conversions d'aires, de durées, de vitesses, de volumes.",
  problemes: [
    {
      tag: "Énigme 1 · Les soldes",
      titre: "Un quart de moins",
      question: `Une veste coûte <b>60 €</b>. Elle est soldée à <b>− 25 %</b>.<br><br><b>Combien coûte-t-elle</b> maintenant ?`,
      reponse: `25 %, c'est un quart : 60 ÷ 4 = 15 €.<br>60 − 15 = <span class="big">45 €</span>.`,
      consigne: "Une veste à 60 € soldée à − 25 % : quel est le nouveau prix ?",
      verification: { type: "courte", attendus: ["45"], unite: "€" },
      dessin: veste,
    },
    {
      tag: "Énigme 2 · Le cœur qui bat",
      titre: "Un ordre de grandeur",
      question: `Un cœur bat environ <b>70</b> fois par minute.<br><br><b>Quel ordre de grandeur</b> pour le nombre de battements en une journée ?`,
      reponse: `70 × 60 × 24 ≈ 70 × 1 500 ≈ 100 000.<br>C'est de l'ordre de <span class="big">10<sup>5</sup></span> battements par jour (100 800 exactement).`,
      consigne: "70 battements par minute : ordre de grandeur en une journée ?",
      verification: { type: "qcm", choix: ["10⁵", "10³", "10⁸"], bonne: 0 },
      dessin: coeur,
    },
    {
      tag: "Énigme 3 · L'appartement",
      titre: "Des m² en cm²",
      question: `Un appartement mesure <b>75 m²</b>.<br><br><b>Combien de cm²</b> cela fait-il ?`,
      reponse: `1 m = 100 cm, donc 1 m² = 100 × 100 = 10 000 cm².<br>75 × 10 000 = <span class="big">750 000 cm²</span>.`,
      consigne: "75 m², combien de cm² ?",
      verification: { type: "qcm", choix: ["7 500 cm²", "750 000 cm²", "75 000 cm²"], bonne: 1 },
      dessin: appart,
    },
    {
      tag: "Énigme 4 · Le guépard",
      titre: "Des m/s en km/h",
      question: `Un guépard court à <b>30 m/s</b> : 30 mètres chaque seconde.<br><br><b>Quelle est sa vitesse</b> en km/h ?`,
      reponse: `En 1 h = 3 600 s, il parcourt 30 × 3 600 = 108 000 m = 108 km.<br>Sa vitesse est <span class="big">108 km/h</span> (on multiplie par 3,6).`,
      consigne: "30 m/s, combien de km/h ?",
      verification: { type: "courte", attendus: ["108"], unite: "km/h" },
      dessin: guepard,
    },
    {
      tag: "Énigme 5 · Attention au piège",
      titre: "Le film de 2,4 heures",
      sorte: "piege",
      question: `Un film dure <b>2,4 h</b>.<br><br><b>Combien de temps</b> dure-t-il, en heures et minutes ?`,
      reponse: `Une heure n'a pas 100 minutes, mais 60 !<br>0,4 h = 0,4 × 60 = 24 min. Le film dure <span class="big">2 h 24 min</span>.`,
      consigne: "2,4 h en heures et minutes ?",
      verification: { type: "qcm", choix: ["2 h 40 min", "2 h 04 min", "2 h 24 min"], bonne: 2 },
      dessin: film,
    },
    {
      tag: "Énigme 6 · Le défi des curieux",
      titre: "La pluie sur le toit",
      sorte: "defi",
      question: `Il tombe <b>10 mm</b> de pluie sur un toit de <b>100 m²</b>. Toute l'eau va dans une cuve.<br><br><b>Combien de litres</b> recueille-t-on ?`,
      reponse: `10 mm = 0,01 m. Volume : 100 × 0,01 = 1 m³.<br>1 m³ = 1 000 L : on recueille <span class="big">1 000 L</span>.`,
      consigne: "10 mm de pluie sur 100 m² : combien de litres ?",
      verification: { type: "courte", attendus: ["1000"], unite: "L" },
      dessin: pluie,
    },
  ],
};

export default problemes;
